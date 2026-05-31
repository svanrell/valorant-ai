import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { firstValueFrom } from "rxjs";
import { ContentService } from "../valorant_api/content/content.service";
import { AgentsService } from "../valorant_api/agents/agents.service";
import { MapsService } from "../valorant_api/maps/maps.service";
import { WeaponsService } from "../valorant_api/weapons/weapons.service";

@WebSocketGateway({
    cors: {
        origin: "*",
    },
})
export class ValorantGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    private estadoActual: string = 'CERRADO';
    private datosExtra: any = {};
    private compraEstado: any = { disponible: false, tiempo: 0, ronda: 0 };

    constructor(
        private readonly contentService: ContentService,
        private readonly agentsService: AgentsService,
        private readonly mapsService: MapsService,
        private readonly weaponsService: WeaponsService,
    ) { }

    handleConnection(client: Socket) {
        client.emit('estado_valorant', {
            estado: this.estadoActual,
            ...this.datosExtra
        });
        client.emit('fase_compra', this.compraEstado);
    }

    actualizarEstado(estado: string, datos: any = {}) {
        this.estadoActual = estado;
        this.datosExtra = datos;
        if (this.server) {
            this.server.emit('estado_valorant', {
                estado,
                ...datos
            });
        }
    }

    emitirCompraEstado(disponible: boolean, tiempo: number, ronda: number) {
        this.compraEstado = { disponible, tiempo, ronda };
        if (this.server) {
            this.server.emit('fase_compra', this.compraEstado);
        }
    }

    @SubscribeMessage("load_all")
    async handleLoadAll() {
        try {
            this.server.emit("loading_progress", { phase: "Loading content...", progress: 10 });
            const content = await firstValueFrom(this.contentService.loadContent());
            this.server.emit("loading_progress", { phase: "Content loaded", progress: 20 });

            this.server.emit("loading_progress", { phase: "Loading agents...", progress: 30 });
            const agents = await firstValueFrom(this.agentsService.loadAgents());
            this.server.emit("loading_progress", { phase: "Agents loaded", progress: 50 });

            this.server.emit("loading_progress", { phase: "Loading maps...", progress: 60 });
            const maps = await firstValueFrom(this.mapsService.loadMaps());
            this.server.emit("loading_progress", { phase: "Maps loaded", progress: 75 });

            this.server.emit("loading_progress", { phase: "Loading weapons...", progress: 80 });
            const weapons = await firstValueFrom(this.weaponsService.loadWeapons());
            this.server.emit("loading_progress", { phase: "Weapons loaded", progress: 100 });

            this.server.emit("data_loaded", {
                content,
                agents,
                maps,
                weapons,
                message: "All data loaded successfully",
            });
        } catch (error) {
            this.server.emit("load_error", {
                message: "Failed to load data",
                error: error.message,
            });
        }
    }

    @SubscribeMessage("load_content")
    async handleLoadContent() {
        try {
            const content = await firstValueFrom(this.contentService.loadContent());
            this.server.emit("content_loaded", content);
        } catch (error) {
            this.server.emit("load_error", { message: "Failed to load content", error: error.message });
        }
    }

    @SubscribeMessage("load_agents")
    async handleLoadAgents() {
        try {
            const agents = await firstValueFrom(this.agentsService.loadAgents());
            this.server.emit("agents_loaded", agents);
        } catch (error) {
            this.server.emit("load_error", { message: "Failed to load agents", error: error.message });
        }
    }

    @SubscribeMessage("load_maps")
    async handleLoadMaps() {
        try {
            const maps = await firstValueFrom(this.mapsService.loadMaps());
            this.server.emit("maps_loaded", maps);
        } catch (error) {
            this.server.emit("load_error", { message: "Failed to load maps", error: error.message });
        }
    }

    @SubscribeMessage("load_weapons")
    async handleLoadWeapons() {
        try {
            const weapons = await firstValueFrom(this.weaponsService.loadWeapons());
            this.server.emit("weapons_loaded", weapons);
        } catch (error) {
            this.server.emit("load_error", { message: "Failed to load weapons", error: error.message });
        }
    }
}