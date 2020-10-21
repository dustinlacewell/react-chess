import { useState, useEffect } from 'react';


export function useRemoteClient(apikey, gamekey) {
    const [state, setState] = useState(null);
    const client = new RemoteClient(apikey, gamekey, setState);
    useEffect(() => client.refresh(), []);
    return [state, client];
}

export default class RemoteClient {
    constructor(apikey, gamekey, update) {
        this.apikey = apikey;
        this.gamekey = gamekey;
        this.socket = new Ably.Realtime({key: apikey});
        this.channel = this.socket.channels.get(gamekey);
        this.update = update;
        this.channel.subscribe('state', (msg) => {
            update(msg.data);
        });
    }

    log(msg) {
        console.log(`RemoteClient | ${msg}`);
    }

    refresh() {
        this.log("Refreshing...");
        this.channel.publish('refresh', null);
    }

    reset() {
        this.log("Resetting...");
        this.channel.publish('reset', null);
    }

    move(x1, y1, x2, y2) {
        this.log(`Moving ${[x1, y1]} to ${[x2, y2]}...`);
        this.channel.publish('move', [x1, y1, x2, y2]);
    }

    restore(player, name, x, y) {
        this.log(`Restoring ${name} for ${player} to ${[x, y]}...`);
        this.channel.publish('restore', [player, name, x, y]);
    }

    get(state, x, y) {
        return state.board.find(p => p.x == x && p.y == y);
    }
}
