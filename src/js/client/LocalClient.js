import React, { useState, useEffect } from 'react';


export function useLocalClient(game) {
    const [state, setState] = useState(null);
    const dump = () => {
        return setState(game.dump());
    }
    const client = new LocalClient(game, dump);
    useEffect(dump, game);
    return [state, client];
}

export default class LocalClient {
    constructor(game, update) {
        this.game = game;
        this.update = update;
    }

    reset() {
        this.game.reset();
        this.update();
    }

    move(...args) {
        this.game.move(...args);
        this.update();
    }

    restore(...args) {
        this.game.restore(...args);
        this.update();
    }

    get(state, x, y) {
        return state.board.find(p => p.x == x && p.y == y);
    }
}
