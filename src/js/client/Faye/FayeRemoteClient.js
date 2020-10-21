import { useState, useEffect } from 'react';
import faye from 'faye';


export default class RemoteClient {
    constructor(gamekey, update) {
        this.gamekey = gamekey;
        this.update = update;
        this.socket = new faye.Client('http://ldlework.com:8001/');
        this.socket.subscribe(this.key("state"), update);
    }

    key(name) {
        return `/${this.gamekey}/${name}`;
    }

    log(msg) {
        console.log(`RemoteClient | ${msg}`);
    }

    delegate(msg) {
        const action = msg.action;
        if (action == "refresh") {
            this.refresh();
        } else if (action == "reset") {
            this.reset();
        } else if (action == "move") {
            this.move(...msg);
        } else if (action == "restore") {
            this.restore(...msg);
        }
    }

    refresh() {
        this.log("Refreshing...");
        this.socket.publish(this.key("refresh"), null);
    }

    reset() {
        this.log("Resetting...");
        this.socket.publish(this.key("reset"), null);
    }

    move(x1, y1, x2, y2) {
        this.log(`Moving ${[x1, y1]} to ${[x2, y2]}...`);
        this.socket.publish(this.key("move"), [x1, y1, x2, y2]);
    }

    restore(player, name, x, y) {
        this.log(`Restoring ${name} for ${player} to ${[x, y]}...`);
        this.socket.publish(this.key("restore"), [player, name, x, y]);
    }

    get(state, x, y) {
        return state.board.find(p => p.x == x && p.y == y);
    }
}
