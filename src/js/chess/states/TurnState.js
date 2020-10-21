import { Score } from "../../lib/score.js";
import { DefaultState } from "../../lib/controller.js"

export class TurnState extends DefaultState {

    constructor(context, player, nextState) {
        super(context);
        this.player = player;
        this.nextState = nextState;
    }

    shouldAcceptCapture(ctx, dstPlace, ele) {
        if (dstPlace.piece == undefined) {
            return true;
        }

        return false;
    }

    shouldAccept(ctx, dstPlace, ele) {
        const {place, piece, player} = ele.data();

        // holding a capture
        if (place instanceof Score) {
            return this.shouldAcceptCapture(ctx, dstPlace, ele);
        }

        if (!piece.moves.includes(dstPlace)) {
            return false;
        }

        const dstPiece = dstPlace.piece;

        // fine if place is empty
        if (dstPiece == undefined) {
            return true;
        }

        // fine if target is enemy
        if (player != dstPiece.data.player) {
            return true;
        }

        // otherwise reject
        return false;
    }

    setPiece(ctx, piece, dstPlace) {
        setTimeout(() => {
            dstPlace.piece = piece;
            ctx.record.push(ctx.dump());
            ctx.state.to(this.nextState);
        });

    }

    captureDropped(ctx, place, piece, player, dstPlace) {
        this.setPiece(ctx, piece, dstPlace);
    }

    pieceDropped(ctx, dstPlace, event, ui) {
        const {place, piece, player} = ui.helper.data();

        // if (place instanceof Score) {
        //     this.captureDropped(ctx, place, piece, player, dstPlace);
        // }

        if (dstPlace.piece) {
            this.player.score.add(dstPlace.piece);
        }

        this.setPiece(ctx, piece, dstPlace);
    }
}
