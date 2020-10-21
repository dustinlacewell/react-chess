export class BoardState {
    constructor(context) {
        this.context = context;
    }
}

export class DefaultState extends BoardState {
    shouldAccept(ctx, place, ele) {
        if (place.piece == undefined) {
            return true;
        }

        return false;
    }

    pieceDropped(ctx, place, event, ui) {
        const oldPlace = ui.helper.data().place;
        place.piece = oldPlace.piece;
    }
}

export class Controller {
    constructor(states) {
        this.states = states;
    }

    to(name) {
        const state = this.states[name];
        if (state) {
            this.emit('onExit');
            this.state = state;
            this.emit('onEnter');
        }
    }

    emit(name, ...args) {
        if (this.state) {
            const handler = this.state[name];
            if (handler) {
                return handler.apply(this.state, [this.state.context, ...args]);
            }
        }
    }

    delegate(name, ...args) {
        return (...cbargs) => this.emit(name, ...args, ...cbargs);
    }
}

