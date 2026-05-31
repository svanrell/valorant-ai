import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ValorantGateway } from './valorant.gateway';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { firstValueFrom } from 'rxjs';

const MAPS_MAP: Record<string, string> = {
    '/Game/Maps/Ascent/Ascent': 'Ascent',
    '/Game/Maps/Bonsai/Bonsai': 'Split',
    '/Game/Maps/Canyon/Canyon': 'Fracture',
    '/Game/Maps/Duality/Duality': 'Bind',
    '/Game/Maps/Foxtrot/Foxtrot': 'Breeze',
    '/Game/Maps/Jam/Jam': 'Lotus',
    '/Game/Maps/Jamboree/Jamboree': 'Abyss',
    '/Game/Maps/Pitt/Pitt': 'Pearl',
    '/Game/Maps/Port/Port': 'Icebox',
    '/Game/Maps/Rook/Rook': 'Sunset',
    '/Game/Maps/Triad/Triad': 'Haven',
};

const QUEUES_MAP: Record<string, string> = {
    'unrated': 'No Clasificatoria',
    'competitive': 'Competitivo',
    'swiftplay': 'Swiftplay',
    'spikerush': 'Fiebre de la Spike',
    'deathmatch': 'Deathmatch',
    'ggteam': 'Carrera de Armas',
};

@Injectable()
export class ValorantLocalService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(ValorantLocalService.name);
    private readonly lockfilePath: string;
    private readonly httpsAgent: https.Agent;
    private estadoActual: string = 'CERRADO';
    private datosExtraActual: any = {};
    private intervalId: NodeJS.Timeout;
    private scoreAliado: number = -1;
    private scoreEnemigo: number = -1;
    private buyPhaseSecondsRemaining: number = 0;
    private buyPhaseInterval: NodeJS.Timeout | null = null;

    constructor(
        private readonly httpService: HttpService,
        private readonly gateway: ValorantGateway,
    ) {
        this.lockfilePath = path.join(
            process.env.LOCALAPPDATA || '',
            'Riot Games',
            'Riot Client',
            'Config',
            'lockfile',
        );
        this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }

    onModuleInit() {
        this.logger.log('Iniciando radar de Valorant...');
        this.intervalId = setInterval(() => this.comprobarEstado(), 2000);
    }

    onModuleDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.logger.log('Radar de Valorant detenido.');
        }
        if (this.buyPhaseInterval) {
            clearInterval(this.buyPhaseInterval);
        }
    }

    private obtenerCredenciales() {
        if (!fs.existsSync(this.lockfilePath)) return null;

        const contenido = fs.readFileSync(this.lockfilePath, 'utf8');
        const [, , port, password, protocol] = contenido.split(':');
        const authBase64 = Buffer.from(`riot:${password}`).toString('base64');

        return {
            url: `${protocol}://127.0.0.1:${port}`,
            token: `Basic ${authBase64}`,
        };
    }

    private async comprobarEstado() {
        const credenciales = this.obtenerCredenciales();

        if (!credenciales) {
            this.actualizarEstado('CERRADO');
            return;
        }

        const config = {
            headers: { Authorization: credenciales.token },
            httpsAgent: this.httpsAgent,
        };

        try {
            const sesion = await firstValueFrom(
                this.httpService.get(`${credenciales.url}/chat/v1/session`, config)
            );
            const puuid = sesion.data.puuid;

            const presencias = await firstValueFrom(
                this.httpService.get(`${credenciales.url}/chat/v4/presences`, config)
            );

            const miPresencia = presencias.data.presences?.find((p: any) => p.puuid === puuid);

            if (miPresencia && miPresencia.private) {
                const decodedJson = Buffer.from(miPresencia.private, 'base64').toString('utf8');
                const privateData = JSON.parse(decodedJson);

                const loopState =
                    privateData.matchPresenceData?.sessionLoopState ||
                    privateData.partyPresenceData?.partyOwnerSessionLoopState ||
                    privateData.sessionLoopState;

                if (loopState === 'PREGAME') {
                    this.limpiarFaseCompra();
                    const matchId = privateData.partyId || 'PRESENCE_LOBBY';
                    this.actualizarEstado('PREGAME', { matchId });
                } else if (loopState === 'INGAME') {
                    const mapPath = privateData.matchPresenceData?.matchMap || '';
                    const queueId = privateData.matchPresenceData?.queueId || '';
                    const mapa = MAPS_MAP[mapPath] || 'Mapa Desconocido';
                    const modo = QUEUES_MAP[queueId] || 'Modo Desconocido';
                    this.actualizarEstado('INGAME', { mapa, modo });

                    const scoreAlly = privateData.partyOwnerMatchScoreAllyTeam ?? privateData.partyPresenceData?.partyOwnerMatchScoreAllyTeam ?? 0;
                    const scoreEnemy = privateData.partyOwnerMatchScoreEnemyTeam ?? privateData.partyPresenceData?.partyOwnerMatchScoreEnemyTeam ?? 0;

                    if (this.scoreAliado === -1 && this.scoreEnemigo === -1) {
                        this.scoreAliado = scoreAlly;
                        this.scoreEnemigo = scoreEnemy;
                        this.iniciarFaseCompra(scoreAlly, scoreEnemy);
                    } else if (this.scoreAliado !== scoreAlly || this.scoreEnemigo !== scoreEnemy) {
                        this.scoreAliado = scoreAlly;
                        this.scoreEnemigo = scoreEnemy;
                        this.iniciarFaseCompra(scoreAlly, scoreEnemy);
                    }
                } else {
                    this.limpiarFaseCompra();
                    this.actualizarEstado('MENU');
                }
            } else {
                this.limpiarFaseCompra();
                this.actualizarEstado('MENU');
            }

        } catch (error: any) {
            this.limpiarFaseCompra();
            this.actualizarEstado('CERRADO');
        }
    }

    private actualizarEstado(nuevoEstado: string, datosExtra: any = {}) {
        const estadoCambiado = this.estadoActual !== nuevoEstado;
        const datosCambiados = JSON.stringify(this.datosExtraActual) !== JSON.stringify(datosExtra);

        if (estadoCambiado || datosCambiados) {
            this.estadoActual = nuevoEstado;
            this.datosExtraActual = datosExtra;
            this.logger.log(`Cambio de estado o detalles: ${nuevoEstado} ${JSON.stringify(datosExtra)}`);

            this.gateway.actualizarEstado(nuevoEstado, datosExtra);
        }
    }

    private iniciarFaseCompra(scoreAlly: number, scoreEnemy: number) {
        if (this.buyPhaseInterval) {
            clearInterval(this.buyPhaseInterval);
            this.buyPhaseInterval = null;
        }

        const ronda = scoreAlly + scoreEnemy + 1;
        const esRondaEspecial = (ronda === 1 || ronda === 13 || ronda >= 25);
        this.buyPhaseSecondsRemaining = esRondaEspecial ? 45 : 30;

        this.logger.log(`¡Nueva ronda detectada! Ronda: ${ronda}. Iniciando fase de compra de ${this.buyPhaseSecondsRemaining} segundos.`);
        this.gateway.emitirCompraEstado(true, this.buyPhaseSecondsRemaining, ronda);

        this.buyPhaseInterval = setInterval(() => {
            this.buyPhaseSecondsRemaining--;
            if (this.buyPhaseSecondsRemaining <= 0) {
                this.logger.log(`Fase de compra terminada para la ronda ${ronda}.`);
                this.gateway.emitirCompraEstado(false, 0, ronda);
                if (this.buyPhaseInterval) {
                    clearInterval(this.buyPhaseInterval);
                    this.buyPhaseInterval = null;
                }
            } else {
                this.gateway.emitirCompraEstado(true, this.buyPhaseSecondsRemaining, ronda);
            }
        }, 1000);
    }

    private limpiarFaseCompra() {
        this.scoreAliado = -1;
        this.scoreEnemigo = -1;
        if (this.buyPhaseInterval) {
            clearInterval(this.buyPhaseInterval);
            this.buyPhaseInterval = null;
            this.gateway.emitirCompraEstado(false, 0, 0);
        }
    }
}