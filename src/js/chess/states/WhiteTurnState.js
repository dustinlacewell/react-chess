import { TurnState } from "./TurnState.js";

export class WhiteTurnState extends TurnState {
    constructor(context) {
        super(context, context.white, 'black-turn');
    }

    onEnter(ctx) {
        ctx.white.player.pieces.map(p => p.dom.draggable("enable"));
    }

    onExit(ctx) {
        ctx.white.player.pieces.map(p => p.dom.draggable("disable"));
    }
}

