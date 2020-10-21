

export default class Game {
    constructor() {
        this.reset();
    }

    reset() {
        throw new TypeError('`Game` subclass must implement `reset`.');
    }

    move(x1, y1, x2, y2) {
        throw new TypeError('`Game` subclass must implement `move`.');
    }

    restore(player, name, x, y) {
        throw new TypeError('`Game` subclass must implement `restore`.');
    }

    dump() {
        throw new TypeError('`Game` subclass must implement `dump`.')
    }

}
