# Guía de Sintaxis, Lógica y Explicación Línea por Línea de la carpeta `gateway`

Este documento contiene una explicación exhaustiva y pormenorizada de cada línea de código de los dos archivos de la carpeta `src/gateway/`, además de un desglose didáctico de toda la sintaxis avanzada de TypeScript, JavaScript y NestJS que se utiliza en ellos.

---

## 1. Explicación Línea por Línea de `src/gateway/valorant.gateway.ts`

Este archivo implementa el **servidor WebSocket** usando Socket.io en NestJS para la comunicación bidireccional en tiempo real con el navegador.

```typescript
1: import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection } from "@nestjs/websockets";
```
* **Explicación:** Importa los decoradores y la interfaz de NestJS necesarios para crear servidores de WebSockets (`WebSocketGateway`), inyectar el servidor nativo (`WebSocketServer`), registrar eventos entrantes (`SubscribeMessage`) y manejar conexiones de clientes (`OnGatewayConnection`).

```typescript
2: import { Server, Socket } from "socket.io";
```
* **Explicación:** Importa los tipos `Server` y `Socket` de la librería `socket.io` para tener autocompletado y tipado estricto de TypeScript sobre el servidor y los clientes conectados.

```typescript
3: import { firstValueFrom } from "rxjs";
```
* **Explicación:** Importa la función `firstValueFrom` de RxJS, que convierte un flujo reactivo (Observable) en una Promesa de JavaScript estándar (permitiéndonos usar `await`).

```typescript
4: import { ContentService } from "../valorant_api/content/content.service";
5: import { AgentsService } from "../valorant_api/agents/agents.service";
6: import { MapsService } from "../valorant_api/maps/maps.service";
7: import { WeaponsService } from "../valorant_api/weapons/weapons.service";
```
* **Explicación:** Importa las clases de servicio de la carpeta `valorant_api` para poder invocar la carga de datos del API oficial de Valorant desde el WebSocket.

```typescript
9: @WebSocketGateway({
10:     cors: {
11:         origin: "*",
12:     },
13: })
```
* **Explicación:** `@WebSocketGateway` es un decorador de NestJS que convierte la clase de abajo en un WebSocket. El objeto de configuración de CORS (`cors: { origin: "*" }`) le indica al servidor que acepte solicitudes desde cualquier navegador y puerto (comodín `*`), lo que previene bloqueos de seguridad del navegador al abrir archivos locales.

```typescript
14: export class ValorantGateway implements OnGatewayConnection {
```
* **Explicación:** Declara y exporta la clase `ValorantGateway`. Al usar `implements OnGatewayConnection`, prometemos a TypeScript que implementaremos el método `handleConnection`, el cual NestJS ejecutará automáticamente cada vez que un cliente se conecte.

```typescript
15:     @WebSocketServer()
16:     server: Server;
```
* **Explicación:** El decorador `@WebSocketServer()` le indica a NestJS que inyecte la instancia activa del servidor Socket.io en la variable `server`. Gracias a esto, podemos emitir mensajes a todo el mundo con `this.server.emit()`.

```typescript
18:     private estadoActual: string = 'CERRADO';
19:     private datosExtra: any = {};
20:     private compraEstado: any = { disponible: false, tiempo: 0, ronda: 0 };
```
* **Explicación:** Propiedades de la clase (caché de estado) con alcance `private` (solo accesibles dentro de esta clase) encargadas de almacenar el estado actual del juego, los metadatos de partida y el segundero de compra para evitar que las nuevas conexiones vean la web vacía.

```typescript
22:     constructor(
23:         private readonly contentService: ContentService,
24:         private readonly agentsService: AgentsService,
25:         private readonly mapsService: MapsService,
26:         private readonly weaponsService: WeaponsService,
27:     ) { }
```
* **Explicación:** El constructor de la clase. Utiliza la sintaxis corta de TypeScript para declarar e inyectar automáticamente los cuatro servicios de API de Valorant como variables privadas de solo lectura (`private readonly`).

```typescript
29:     handleConnection(client: Socket) {
30:         client.emit('estado_valorant', {
31:             estado: this.estadoActual,
32:             ...this.datosExtra
33:         });
34:         client.emit('fase_compra', this.compraEstado);
35:     }
```
* **Explicación:** Método que se dispara cada vez que un navegador abre el WebSocket. Envía dos mensajes específicos al cliente que acaba de conectarse (`client.emit`):
  * `'estado_valorant'`: El estado del juego (ej: `INGAME`) fusionado con sus metadatos (ej: mapa y modo) mediante el operador de propagación (`...`).
  * `'fase_compra'`: El estado del temporizador de la fase de compra.

```typescript
37:     actualizarEstado(estado: string, datos: any = {}) {
38:         this.estadoActual = estado;
39:         this.datosExtra = datos;
40:         if (this.server) {
41:             this.server.emit('estado_valorant', {
42:                 estado,
43:                 ...datos
44:             });
45:         }
46:     }
```
* **Explicación:** Método expuesto para que el `ValorantLocalService` lo invoque. Guarda los nuevos estados en la caché local (`this.estadoActual`, `this.datosExtra`) y, si el servidor está listo, retransmite el evento `'estado_valorant'` a todos los clientes web conectados.

```typescript
48:     emitirCompraEstado(disponible: boolean, tiempo: number, ronda: number) {
49:         this.compraEstado = { disponible, tiempo, ronda };
50:         if (this.server) {
51:             this.server.emit('fase_compra', this.compraEstado);
52:         }
53:     }
```
* **Explicación:** Método que recibe el estado de compra actual, lo guarda en la caché (`this.compraEstado`) y retransmite a través de WebSockets el evento `'fase_compra'`.

```typescript
55:     @SubscribeMessage("load_all")
56:     async handleLoadAll() {
57:         try {
```
* **Explicación:** El decorador `@SubscribeMessage("load_all")` hace que la función escuche los mensajes enviados por el cliente web bajo la etiqueta `"load_all"`. Es una función asíncrona (`async`) envuelta en un bloque `try/catch` para capturar cualquier error.

```typescript
58:             this.server.emit("loading_progress", { phase: "Loading content...", progress: 10 });
59:             const content = await firstValueFrom(this.contentService.loadContent());
60:             this.server.emit("loading_progress", { phase: "Content loaded", progress: 20 });
```
* **Explicación:** Emite un evento de progreso al cliente (10%). Llama de manera asíncrona a `loadContent()` del API oficial y espera a que termine (`await firstValueFrom(...)`), para luego actualizar el progreso al 20%.

```typescript
61:             this.server.emit("loading_progress", { phase: "Loading agents...", progress: 30 });
62:             const agents = await firstValueFrom(this.agentsService.loadAgents());
63:             this.server.emit("loading_progress", { phase: "Agents loaded", progress: 50 });
```
* **Explicación:** Repite el mismo flujo asíncrono para descargar y almacenar los agentes del juego, emitiendo actualizaciones de carga al navegador.

```typescript
64:             this.server.emit("loading_progress", { phase: "Loading maps...", progress: 60 });
65:             const maps = await firstValueFrom(this.mapsService.loadMaps());
66:             this.server.emit("loading_progress", { phase: "Maps loaded", progress: 75 });
```
* **Explicación:** Ejecuta la carga y la obtención asíncrona de los mapas oficiales de Valorant.

```typescript
67:             this.server.emit("loading_progress", { phase: "Loading weapons...", progress: 80 });
68:             const weapons = await firstValueFrom(this.weaponsService.loadWeapons());
69:             this.server.emit("loading_progress", { phase: "Weapons loaded", progress: 100 });
```
* **Explicación:** Ejecuta la carga de las armas oficiales del juego, alcanzando el 100% de la carga de contenidos.

```typescript
70:             this.server.emit("data_loaded", {
71:                 content,
72:                 agents,
73:                 maps,
74:                 weapons,
75:                 message: "All data loaded successfully",
76:             });
```
* **Explicación:** Envía al frontend el evento `'data_loaded'` con un JSON que contiene toda la información oficial recolectada de la API de Valorant.

```typescript
77:         } catch (error) {
78:             this.server.emit("load_error", {
79:                 message: "Failed to load data",
80:                 error: error.message,
81:             });
82:         }
83:     }
```
* **Explicación:** Si cualquiera de las peticiones HTTP oficiales falla, la ejecución salta a este bloque `catch` y emite `'load_error'` al frontend con el mensaje del error.

*(Nota: Las líneas 85 a 128 repiten esta misma estructura asíncrona de `try/catch` y `firstValueFrom` pero de forma modular para endpoints individuales: `/load_content`, `/load_agents`, `/load_maps` y `/load_weapons`)*

---

## 2. Explicación Línea por Línea de `src/gateway/valorant-local.service.ts`

Este servicio gestiona la lectura del archivo de Riot Client y las peticiones continuas al juego en segundo plano.

```typescript
1: import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
```
* **Explicación:** Importa elementos clave del núcleo de NestJS:
  * `@Injectable()`: Habilita a NestJS a inyectar este servicio en otras partes de la app.
  * `OnModuleInit` y `OnModuleDestroy`: Ciclos de vida para inicializar o apagar servicios.
  * `Logger`: Imprime mensajes formateados en la terminal del backend.

```typescript
2: import { HttpService } from '@nestjs/axios';
```
* **Explicación:** Importa el cliente HTTP reactivo de NestJS para realizar peticiones locales a la API de Valorant.

```typescript
3: import { ValorantGateway } from './valorant.gateway';
```
* **Explicación:** Importa la clase de nuestro Gateway de WebSockets para poder llamarlo y notificar cambios de estado o fases de compra.

```typescript
4: import * as fs from 'fs';
5: import * as path from 'path';
6: import * as https from 'https';
```
* **Explicación:** Importa módulos integrados de Node.js:
  * `fs`: Sistema de archivos para verificar y leer el archivo `lockfile`.
  * `path`: Utilidades para manejar de forma segura rutas de archivos en el sistema operativo.
  * `https`: Configuración de red para ignorar errores SSL locales.

```typescript
7: import { firstValueFrom } from 'rxjs';
```
* **Explicación:** Importa el convertidor de observables de RxJS a promesas de TypeScript.

```typescript
9: const MAPS_MAP: Record<string, string> = {
10:     '/Game/Maps/Ascent/Ascent': 'Ascent',
...
21: };
```
* **Explicación:** Diccionario estático que define un mapa asociativo de TypeScript (`Record<string, string>`). Convierte las rutas internas del juego en nombres de mapas legibles por un humano.

```typescript
23: const QUEUES_MAP: Record<string, string> = {
24:     'unrated': 'No Clasificatoria',
...
30: };
```
* **Explicación:** Diccionario que traduce las identificaciones de las colas de emparejamiento de Valorant a nombres legibles en español.

```typescript
32: @Injectable()
33: export class ValorantLocalService implements OnModuleInit, OnModuleDestroy {
```
* **Explicación:** Decoramos la clase como `@Injectable()`. La interfaz `OnModuleInit` nos obliga a definir el método `onModuleInit()` y `OnModuleDestroy` nos obliga a definir `onModuleDestroy()`.

```typescript
34:     private readonly logger = new Logger(ValorantLocalService.name);
```
* **Explicación:** Instancia del logger de NestJS, configurado con el nombre de esta clase para que la consola muestre de dónde proceden los mensajes.

```typescript
35:     private readonly lockfilePath: string;
36:     private readonly httpsAgent: https.Agent;
```
* **Explicación:** Propiedades de solo lectura de la clase. `lockfilePath` almacena la ruta absoluta al archivo `lockfile`, y `httpsAgent` controla la conexión HTTPS del cliente de Axios.

```typescript
37:     private estadoActual: string = 'CERRADO';
38:     private datosExtraActual: any = {};
39:     private intervalId: NodeJS.Timeout;
40:     private scoreAliado: number = -1;
41:     private scoreEnemigo: number = -1;
42:     private buyPhaseSecondsRemaining: number = 0;
43:     private buyPhaseInterval: NodeJS.Timeout | null = null;
```
* **Explicación:** Propiedades de estado interno:
  * `estadoActual` e `datosExtraActual`: Estado en caché del radar de juego.
  * `intervalId`: Almacena el bucle principal de comprobación (2s).
  * `scoreAliado` y `scoreEnemigo`: Estado de rondas. Inicializados en `-1` para forzar la detección del primer cambio.
  * `buyPhaseSecondsRemaining` y `buyPhaseInterval`: Controlan la cuenta atrás de la fase de compra.

```typescript
45:     constructor(
46:         private readonly httpService: HttpService,
47:         private readonly gateway: ValorantGateway,
48:     ) {
```
* **Explicación:** Constructor de la clase. Inyecta el cliente HTTP y el WebSocket Gateway.

```typescript
49:         this.lockfilePath = path.join(
50:             process.env.LOCALAPPDATA || '',
51:             'Riot Games',
52:             'Riot Client',
53:             'Config',
54:             'lockfile',
55:         );
```
* **Explicación:** Define la ruta del `lockfile` combinando de manera segura el directorio local de datos de aplicaciones de Windows (`%LocalAppData%`) con las carpetas específicas del cliente de Riot.

```typescript
56:         this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
57:     }
```
* **Explicación:** Crea un agente HTTPS configurando `rejectUnauthorized: false`. Esto es **fundamental** porque el juego local de Valorant levanta un servidor HTTPS propio con un certificado SSL no firmado por entidades oficiales. Si no desactivamos esta validación, Node.js rechazará todas las peticiones HTTPS locales.

```typescript
59:     onModuleInit() {
60:         this.logger.log('Iniciando radar de Valorant...');
61:         this.intervalId = setInterval(() => this.comprobarEstado(), 2000);
62:     }
```
* **Explicación:** Método de inicio de NestJS. Imprime un log e inicia el escaneo del estado del juego cada 2000ms (2 segundos).

```typescript
64:     onModuleDestroy() {
65:         if (this.intervalId) {
66:             clearInterval(this.intervalId);
67:             this.logger.log('Radar de Valorant detenido.');
68:         }
69:         if (this.buyPhaseInterval) {
70:             clearInterval(this.buyPhaseInterval);
71:         }
72:     }
```
* **Explicación:** Limpia los intervalos activos si el servidor se detiene para prevenir cuelgues o hilos fantasma.

```typescript
74:     private obtenerCredenciales() {
75:         if (!fs.existsSync(this.lockfilePath)) return null;
```
* **Explicación:** Comprueba mediante el sistema de archivos (`fs`) si existe el archivo de lockfile en el disco duro. Si no existe, significa que Valorant/Riot Client está apagado y retorna `null`.

```typescript
77:         const contenido = fs.readFileSync(this.lockfilePath, 'utf8');
78:         const [, , port, password, protocol] = contenido.split(':');
79:         const authBase64 = Buffer.from(`riot:${password}`).toString('base64');
```
* **Explicación:**
  1. Lee el contenido del archivo como texto codificado en UTF-8.
  2. Divide la cadena de texto usando los dos puntos `:` (el formato del lockfile es `nombre:PID:puerto:password:protocolo`). Usamos desestructuración omitiendo el nombre y el PID.
  3. Convierte las credenciales de formato `riot:contraseña` en un token Base64 requerido para la autenticación básica HTTPS de la LCU.

```typescript
81:         return {
82:             url: `${protocol}://127.0.0.1:${port}`,
83:             token: `Basic ${authBase64}`,
84:         };
85:     }
```
* **Explicación:** Devuelve un objeto JSON con la URL local configurada con el puerto dinámico del juego y la cabecera del token de autenticación.

```typescript
87:     private async comprobarEstado() {
88:         const credenciales = this.obtenerCredenciales();
```
* **Explicación:** Función asíncrona principal. Intenta recuperar las credenciales activas del lockfile.

```typescript
90:         if (!credenciales) {
91:             this.actualizarEstado('CERRADO');
92:             return;
93:         }
```
* **Explicación:** Si no hay credenciales (el archivo no existe), marca el estado como `CERRADO` y finaliza la iteración.

```typescript
95:         const config = {
96:             headers: { Authorization: credenciales.token },
97:             httpsAgent: this.httpsAgent,
98:         };
```
* **Explicación:** Configuración de Axios con el token Base64 y el agente HTTPS con el SSL inseguro.

```typescript
99:         try {
100:             const sesion = await firstValueFrom(
101:                 this.httpService.get(`${credenciales.url}/chat/v1/session`, config)
102:             );
103:             const puuid = sesion.data.puuid;
```
* **Explicación:** Pide la sesión del cliente local para obtener el identificador único (`puuid`) del jugador actual.

```typescript
105:             const presencias = await firstValueFrom(
106:                 this.httpService.get(`${credenciales.url}/chat/v4/presences`, config)
107:             );
```
* **Explicación:** Pide al cliente la lista completa de presencias locales en la API del chat.

```typescript
109:             const miPresencia = presencias.data.presences?.find((p: any) => p.puuid === puuid);
```
* **Explicación:** Busca en la lista de presencias aquella cuya propiedad `puuid` coincida con el identificador del jugador logueado.

```typescript
111:             if (miPresencia && miPresencia.private) {
112:                 const decodedJson = Buffer.from(miPresencia.private, 'base64').toString('utf8');
113:                 const privateData = JSON.parse(decodedJson);
```
* **Explicación:** Si localizamos nuestra presencia y tiene datos privados:
  1. Decodificamos el Base64 que contiene la información cifrada.
  2. Parseamos el JSON resultante en un objeto accesible `privateData`.

```typescript
115:                 const loopState = 
116:                     privateData.matchPresenceData?.sessionLoopState || 
117:                     privateData.partyPresenceData?.partyOwnerSessionLoopState || 
118:                     privateData.sessionLoopState;
```
* **Explicación:** Busca de manera jerárquica en los campos de presencia el bucle del juego (`sessionLoopState`).

```typescript
120:                 if (loopState === 'PREGAME') {
121:                     this.limpiarFaseCompra();
122:                     const matchId = privateData.partyId || 'PRESENCE_LOBBY';
123:                     this.actualizarEstado('PREGAME', { matchId });
```
* **Explicación:** Si está en selección de personaje (`PREGAME`), cancela cualquier cuenta atrás de compra en ejecución y actualiza la web.

```typescript
124:                 } else if (loopState === 'INGAME') {
125:                     const mapPath = privateData.matchPresenceData?.matchMap || '';
126:                     const queueId = privateData.matchPresenceData?.queueId || '';
127:                     const mapa = MAPS_MAP[mapPath] || 'Mapa Desconocido';
128:                     const modo = QUEUES_MAP[queueId] || 'Modo Desconocido';
129:                     this.actualizarEstado('INGAME', { mapa, modo });
```
* **Explicación:** Si está jugando (`INGAME`):
  1. Lee el path del mapa e ID de la cola.
  2. Los traduce usando los diccionarios estáticos.
  3. Actualiza el estado global de la web.

```typescript
131:                     const scoreAlly = privateData.partyOwnerMatchScoreAllyTeam ?? privateData.partyPresenceData?.partyOwnerMatchScoreAllyTeam ?? 0;
132:                     const scoreEnemy = privateData.partyOwnerMatchScoreEnemyTeam ?? privateData.partyPresenceData?.partyOwnerMatchScoreEnemyTeam ?? 0;
```
* **Explicación:** Extrae las rondas ganadas de tu equipo y del enemigo desde los datos de presencia decodificados.

```typescript
134:                     if (this.scoreAliado === -1 && this.scoreEnemigo === -1) {
135:                         this.scoreAliado = scoreAlly;
136:                         this.scoreEnemigo = scoreEnemy;
137:                         this.iniciarFaseCompra(scoreAlly, scoreEnemy);
138:                     } else if (this.scoreAliado !== scoreAlly || this.scoreEnemigo !== scoreEnemy) {
139:                         this.scoreAliado = scoreAlly;
140:                         this.scoreEnemigo = scoreEnemy;
141:                         this.iniciarFaseCompra(scoreAlly, scoreEnemy);
142:                     }
```
* **Explicación:** Si es la primera vez que se cargan los marcadores o si el marcador cambia (lo que significa el inicio de una ronda), guarda los nuevos valores e inicia el temporizador de la fase de compra.

```typescript
143:                 } else {
144:                     this.limpiarFaseCompra();
145:                     this.actualizarEstado('MENU');
146:                 }
147:             } else {
148:                 this.limpiarFaseCompra();
149:                 this.actualizarEstado('MENU');
150:             }
```
* **Explicación:** Si el bucle es `MENUS`, reinicia los estados de compra y actualiza la web al estado `MENU`.

```typescript
152:         } catch (error: any) {
153:             this.limpiarFaseCompra();
154:             this.actualizarEstado('CERRADO');
155:         }
156:     }
```
* **Explicación:** Captura cualquier error de conexión a la API de Riot (ej: al cerrar el juego), limpia la fase de compra y marca el estado como `CERRADO`.

```typescript
158:     private actualizarEstado(nuevoEstado: string, datosExtra: any = {}) {
159:         const estadoCambiado = this.estadoActual !== nuevoEstado;
160:         const datosCambiados = JSON.stringify(this.datosExtraActual) !== JSON.stringify(datosExtra);
```
* **Explicación:** Compara si el estado principal cambió (`estadoCambiado`) o si cambiaron los datos internos (`datosCambiados`), convirtiendo estos últimos a cadenas JSON para compararlos de forma rápida.

```typescript
162:         if (estadoCambiado || datosCambiados) {
163:             this.estadoActual = nuevoEstado;
164:             this.datosExtraActual = datosExtra;
165:             this.logger.log(`Cambio de estado o detalles: ${nuevoEstado} ${JSON.stringify(datosExtra)}`);
166: 
167:             this.gateway.actualizarEstado(nuevoEstado, datosExtra);
168:         }
169:     }
```
* **Explicación:** Si hay cambios reales, los guarda en el servicio local y actualiza los clientes web llamando al Gateway de WebSockets.

```typescript
171:     private iniciarFaseCompra(scoreAlly: number, scoreEnemy: number) {
172:         if (this.buyPhaseInterval) {
173:             clearInterval(this.buyPhaseInterval);
174:             this.buyPhaseInterval = null;
175:         }
```
* **Explicación:** Detiene el temporizador de la ronda anterior (si es que había uno activo) antes de empezar el de la nueva ronda.

```typescript
177:         const ronda = scoreAlly + scoreEnemy + 1;
178:         const esRondaEspecial = (ronda === 1 || ronda === 13 || ronda >= 25);
179:         this.buyPhaseSecondsRemaining = esRondaEspecial ? 45 : 30;
```
* **Explicación:**
  1. Calcula el número de la ronda actual (`rondasGanadasTotales + 1`).
  2. Define la fase de compra en **45 segundos** para rondas especiales (ronda 1, ronda 13 de cambio de bando y prórrogas) y en **30 segundos** para el resto.

```typescript
181:         this.logger.log(`¡Nueva ronda detectada! Ronda: ${ronda}. Iniciando fase de compra de ${this.buyPhaseSecondsRemaining} segundos.`);
182:         this.gateway.emitirCompraEstado(true, this.buyPhaseSecondsRemaining, ronda);
```
* **Explicación:** Registra el inicio de la fase de compra e indica de inmediato al Gateway que notifique al navegador web (`disponible: true`).

```typescript
184:         this.buyPhaseInterval = setInterval(() => {
185:             this.buyPhaseSecondsRemaining--;
```
* **Explicación:** Inicia un temporizador que descuenta `1` segundo de la cuenta atrás de forma repetitiva cada 1000 milisegundos (1 segundo).

```typescript
186:             if (this.buyPhaseSecondsRemaining <= 0) {
187:                 this.logger.log(`Fase de compra terminada para la ronda ${ronda}.`);
188:                 this.gateway.emitirCompraEstado(false, 0, ronda);
189:                 if (this.buyPhaseInterval) {
190:                     clearInterval(this.buyPhaseInterval);
191:                     this.buyPhaseInterval = null;
192:                 }
```
* **Explicación:** Si el temporizador llega a cero:
  1. Notifica al Gateway que la fase de compra ha cerrado (`disponible: false`).
  2. Apaga y limpia la referencia del intervalo (`clearInterval`).

```typescript
193:             } else {
194:                 this.gateway.emitirCompraEstado(true, this.buyPhaseSecondsRemaining, ronda);
195:             }
196:         }, 1000);
197:     }
```
* **Explicación:** Si los segundos restantes son superiores a 0, simplemente envía los segundos actualizados al Gateway para mover la barra de progreso en el HTML.

```typescript
199:     private limpiarFaseCompra() {
200:         this.scoreAliado = -1;
201:         this.scoreEnemigo = -1;
202:         if (this.buyPhaseInterval) {
203:             clearInterval(this.buyPhaseInterval);
204:             this.buyPhaseInterval = null;
205:             this.gateway.emitirCompraEstado(false, 0, 0);
206:         }
207:     }
208: }
```
* **Explicación:** Método de seguridad para apagar cualquier bucle de segundero de compra en curso y resetear los contadores a `-1` cuando el usuario sale de una partida o cierra el juego.

---

## 3. Desglose Detallado de Sintaxis del Lenguaje (JavaScript/TypeScript)

A continuación se detallan los operadores lógicos y funciones utilizados para realizar el análisis de datos de presencia:

### A. Operador de Coalescencia Nula (`??`)
* **Uso en el código:** `scoreAlly = privateData.partyOwnerMatchScoreAllyTeam ?? 0;`
* **Explicación:** Devuelve el valor del lado izquierdo si **no es** `null` ni `undefined`. Si es `null` o `undefined`, devuelve el valor del lado derecho (`0`). A diferencia del operador lógico `||` (OR), el operador `??` no se activa si el valor es un cero `0` o un string vacío `""` (que son evaluados como falsos en JS pero son datos válidos).

### B. Operador OR Lógico (`||`)
* **Uso en el código:** `loopState = privateData.matchPresenceData?.sessionLoopState || privateData.sessionLoopState;`
* **Explicación:** Devuelve el valor izquierdo si es un valor "verdadero" (Truthy). Si el valor izquierdo es `undefined`, `null`, `0`, `""` o `false`, evalúa y devuelve el operando derecho. Lo usamos para encadenar búsquedas alternativas de propiedades.

### C. Operador de Encadenamiento Opcional (`?.`)
* **Uso en el código:** `miPresencia.private?.partyPresenceData`
* **Explicación:** Permite leer el valor de una propiedad ubicada en lo profundo de una cadena de objetos conectados sin tener que validar manualmente si cada objeto intermedio existe. Si `miPresencia` o `miPresencia.private` es `null` o `undefined`, la expresión detiene su evaluación y devuelve `undefined` inmediatamente en lugar de lanzar un error crítico (`Cannot read property of undefined`) que tiraría abajo el servidor NestJS.

### D. Comparación rápida con `JSON.stringify(obj1) !== JSON.stringify(obj2)`
* **Uso en el código:** `const datosCambiados = JSON.stringify(this.datosExtraActual) !== JSON.stringify(datosExtra);`
* **Explicación:** En JavaScript, si comparas dos objetos usando `obj1 !== obj2`, la comparación dará `true` (diferente) incluso si tienen exactamente las mismas claves y valores, debido a que apuntan a posiciones de memoria distintas. Al transformarlos en cadenas JSON de texto plano (`JSON.stringify`), podemos realizar una comparación de valores rápida y segura.
