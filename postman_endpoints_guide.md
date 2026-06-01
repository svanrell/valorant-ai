# Guía Práctica de Endpoints de Valorant para Postman

Esta guía contiene la explicación paso a paso de cómo configurar Postman y todas las rutas (locales y remotas) disponibles del cliente de Valorant para inspeccionar la información del juego en tiempo real.

---

## 1. Configuración Inicial Obligatoria en Postman

Dado que el cliente local de Valorant utiliza un certificado SSL auto-firmado, debes desactivar su validación en Postman:
1. Abre Postman y haz clic en el icono de **Configuración** (rueda dentada ⚙️ en la barra superior derecha).
2. Selecciona **Settings**.
3. En la pestaña **General**, busca la opción **SSL certificate verification** y ponla en **OFF**.

---

## 2. Bloque A: Peticiones Locales (LCU API)
Estas peticiones consultan el servidor web local que levanta el propio cliente de Valorant en tu PC.

### Autenticación Común para todas las peticiones del Bloque A:
* En la pestaña **Authorization** (abajo de la barra de URL):
  * **Type**: `Basic Auth`
  * **Username**: `riot`
  * **Password**: *La contraseña dinámica de tu `lockfile`*
* **Base URL**: `https://127.0.0.1:{{puerto_del_lockfile}}` *(ej. `https://127.0.0.1:54755`)*

---

### 1. Obtener Sesión de Chat y PUUID
* **Método**: `GET`
* **Ruta**: `/chat/v1/session`
* **URL Completa**: `https://127.0.0.1:{{puerto}}/chat/v1/session`
* **Explicación**: Devuelve los detalles de tu login local, incluyendo tu `puuid` (ID único de jugador), tu nombre en el juego y tag.
* **Respuesta clave a buscar**: `"puuid": "tu-identificador-unico"`

### 2. Obtener Lista de Presencias (Estado de Amigos y Propio)
* **Método**: `GET`
* **Ruta**: `/chat/v4/presences`
* **URL Completa**: `https://127.0.0.1:{{puerto}}/chat/v4/presences`
* **Explicación**: Devuelve la presencia (actividad, modo de juego, estado del lobby, etc.) de todos tus amigos conectados y la tuya propia.
* **Respuesta clave a buscar**: Busca el objeto con tu `puuid` y decodifica el campo `"private"` de Base64 a JSON para ver tus datos de partida.

### 3. Obtener Tokens de Acceso Remoto
* **Método**: `GET`
* **Ruta**: `/entitlements/v1/token`
* **URL Completa**: `https://127.0.0.1:{{puerto}}/entitlements/v1/token`
* **Explicación**: Te devuelve las credenciales temporales necesarias para consultar la API oficial remota de Riot.
* **Respuesta clave a guardar**:
  * `"accessToken"`: Token largo de autorización.
  * `"token"`: Token largo de habilitación (`entitlements`).

---

## 3. Bloque B: Peticiones Remotas de Juego (GLZ API)
Estas peticiones consultan los servidores en la nube de Riot Games. Requieren los tokens obtenidos en la **Petición 3 (Ruta 3)** del bloque anterior.

### Cabeceras Comunes en Postman (Pestaña "Headers"):
Debes configurar las siguientes cabeceras manualmente:
1. `Authorization`: `Bearer {{tu_accessToken}}` *(ej. `Bearer eyJ...`)*
2. `X-Riot-Entitlements-JWT`: `{{tu_entitlementsToken}}` *(ej. `eyJ...`)*
3. `X-Riot-ClientVersion`: Consúltalo en `https://valorant-api.com/v1/version` en el campo `data.riotClientVersion` *(ej. `release-09.00-shipping-1-123456`)*
4. `X-Riot-ClientPlatform`: `ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9`

*Nota: Deja la pestaña **Authorization** de Postman en **"No Auth"** para este bloque.*

---

### 4. Obtener MatchID de Selección de Agente (`PREGAME`)
* **Método**: `GET`
* **Ruta**: `/pregame/v1/players/{{tu_puuid}}`
* **URL Completa**: `https://glz-eu-1.eu.a.pvp.net/pregame/v1/players/{{tu_puuid}}`
* **Explicación**: Si estás en la pantalla de selección de personaje, te devuelve tu estado de pregame y el ID de ese lobby.
* **Respuesta clave a buscar**: `"MatchID": "id-del-pregame-match"`

### 5. Obtener Selección de Personajes en Tiempo Real
* **Método**: `GET`
* **Ruta**: `/pregame/v1/matches/{{MatchID_obtenido_en_Ruta_4}}`
* **URL Completa**: `https://glz-eu-1.eu.a.pvp.net/pregame/v1/matches/{{MatchID}}`
* **Explicación**: Devuelve la lista completa de tus aliados en el lobby de selección, qué agente tiene marcado cada uno (`CharacterID`), si lo ha bloqueado (`CharacterSelectionState` = `locked`), y sus niveles de cuenta.

### 6. Obtener MatchID de Partida Activa (`INGAME`)
* **Método**: `GET`
* **Ruta**: `/core-game/v1/players/{{tu_puuid}}`
* **URL Completa**: `https://glz-eu-1.eu.a.pvp.net/core-game/v1/players/{{tu_puuid}}`
* **Explicación**: Si la partida ya ha cargado, te devuelve el ID de la partida en curso.
* **Respuesta clave a buscar**: `"MatchID": "id-de-la-partida-activa"`

### 7. Obtener Estado en Vivo de la Partida Activa
* **Método**: `GET`
* **Ruta**: `/core-game/v1/matches/{{MatchID_obtenido_en_Ruta_6}}`
* **URL Completa**: `https://glz-eu-1.eu.a.pvp.net/core-game/v1/matches/{{MatchID}}`
* **Explicación**: Muestra en tiempo real los 10 agentes bloqueados en juego (tanto aliados como enemigos), sus niveles, tarjetas de carga y rangos competitivos en vivo.

---

## 4. Bloque C: Historial de Partidas Oficial (Riot Web API)
Estas peticiones consultan las estadísticas históricas grabadas. Requieren tu API Key secreta de desarrollo (`RGAPI-...`).

### Autenticación:
* Agrega un Header llamado `X-Riot-Token` con el valor de tu `VALORANT_API_KEY` (del archivo `.env`).

---

### 8. Obtener Detalles Completos de una Partida Finalizada
* **Método**: `GET`
* **URL Completa**: `https://eu.api.riotgames.com/val/match/v1/matches/{{matchId}}`
* **Explicación**: Devuelve todo el resumen de la partida: marcadores por ronda, muertes, compras económicas detalladas y estadísticas de combate final. Es el JSON que procesamos en el backend para guardarlo en tus archivos CSV de `/infoApi/`.
