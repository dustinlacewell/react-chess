import { TurnState } from "./TurnState.js";

export class BlackTurnState extends TurnState {
    constructor(context) {
        super(context, context.black, 'white-turn');
    }

    onEnter(ctx) {
        ctx.black.player.pieces.map(p => p.dom.draggable("enable"));
    }

    onExit(ctx) {
        ctx.black.player.pieces.map(p => p.dom.draggable("disable"));
    }
}

