

export default class GameServer {
    constructor(game, apikey, gamekey) {
        this.game = game;
        this.apikey = apikey;
        this.gamekey = gamekey;
        this.socket = new Ably.Realtime({ key: apikey });
        this.channel = this.socket.channels.get(gamekey);

        this.channel.subscribe('reset', (msg) => {
            this.log("Reset requested.");
            this.game.reset();
            this.refresh();
        });

        this.channel.subscribe('move', (msg) => {
            this.log("Move requested.");
            this.game.move(...msg.data);
            this.refresh();
        });

        this.channel.subscribe('restore', (msg) => {
            this.log("Restore requested.");
            this.game.restore(...msg.data);
            this.refresh();
        });

        this.channel.subscribe('refresh', (msg) => {
            this.log("Refresh requested.");
            this.refresh();
        })
    }

    log(msg) {
        console.log(`GameServer | ${msg}`);
    }

    refresh() {
        this.log("Refreshing.")
        this.channel.publish('state', this.game.dump());
    }
}
