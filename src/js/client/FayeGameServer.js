import faye from 'faye';

export default class GameServer {
    constructor(game, gamekey) {
        this.game = game;
        this.gamekey = gamekey;
        this.socket = new faye.Client('http://ldlework.com:8001/')

        this.socket.subscribe(this.key("reset"), (msg) => {
            this.log("Reset requested.");
            this.game.reset();
            this.refresh();
        });

        this.socket.subscribe(this.key("move"), (msg) => {
            this.log("Move requested.");
            this.game.move(...msg);
            this.refresh();
        });

        this.socket.subscribe(this.key("restore"), (msg) => {
            this.log("Restore requested.");
            this.game.restore(...msg);
            this.refresh();
        });

        this.socket.subscribe(this.key("refresh"), (msg) => {
            this.log("Refresh requested.");
            this.refresh();
        })
    }

    key(name) {
        const key = `/${this.gamekey}/${name}`;
        return key;
    }

    log(msg) {
        console.log(`GameServer | ${msg}`);
    }

    refresh() {
        this.log("Refreshing.")
        this.socket.publish(this.key("state"), this.game.dump());
    }
}
