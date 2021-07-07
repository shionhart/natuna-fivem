import config from "../configuration.json";

class Module {
    client: Koi["Client"];

    constructor(client) {
        this.client = client;

        this.client.addClientEventHandler("playerSpawned", () => this.client.triggerSharedEvent("character:requestPlayerData"));
        this.client.addClientEventHandler(["baseevents:onPlayerKilled", "baseevents:onPlayerDied"], this.updateCharacterLocation);
        this.client.addSharedEventHandler("character:playerLeft", this.updateCharacterLocation);
    }

    updateCharacterLocation = () => {
        this.client.triggerSharedEvent("character:updateCharacterLocation", String(this.client.game.player.getCoords(PlayerId())));
    };
}

const _handler = (client) => new Module(client);
export { _handler };
