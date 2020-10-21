import Fixed2DArray from "fixed-2d-array";

import Game from '@lib/Game';
import calculateMoves from "./moves";
import { types } from "./consts";


export default class ChessGame extends Game {
    _resetPlayer(player, pawnRank, othersRank) {
        for (let i = 0; i < 8; i++) {
            const name = "pawn";
            const piece = {name, player}
            // this.capture(piece);
            this.set(pawnRank, i, piece);
        }
        for (let i = 0; i < 8; i++) {
            const name = types[i];
            const piece = {name, player};
            // this.capture(piece);
            this.set(othersRank, i, piece);
        }
    }

    reset() {
        this.turn = 0;
        this.board = new Fixed2DArray(8, 8, undefined);
        this.players = {
            white: {
                score: 0,
                captures: [],
            },
            black: {
                score: 0,
                captures: [],
            }
        };
        this.turns = Object.keys(this.players);
        this._resetPlayer("white", 1, 0);
        this._resetPlayer("black", 6, 7);
        this._calcMoves();
    }

    _nextTurn() {
        this.players.rotate();
        this.turn += 1;
    }

    _calcMoves() {
        const empties = [];
        this.board.forEach((p, {x, y}, a) => {
            if (p) {
                p.moves = calculateMoves(this, p, [x, y]);
            } else {
                empties.push([x, y]);
            }
        }, this);
        for (let name of this.turns) {
            const player = this.players[name];
            for (let piece of player.captures) {
                piece.moves = empties;
            }
        }
    }

    get(x, y) {
        try {
            return this.board.get(x, y);
        } catch (error) {
            return undefined;
        }
    }

    set(x, y, piece) {
        this.board.set(x, y, piece);
        this._calcMoves();
    }

    capture(piece) {
        const playerName = this.turns.find(n => n != piece.player);
        piece.position
        this.players[playerName].captures.push(piece);
    }

    restore(playerName, index, x, y) {
        const player = this.players[playerName];
        const captures = player.captures;
        const capture = captures[index];
        const head = captures.slice(0, index)
        const tail = captures.slice(index + 1, captures.length);
        player.captures = head.concat(tail);
        this.set(x, y, capture);
    }

    dump() {
        this._calcMoves();
        const board = [];
        this.board.forEach((p, {x, y}, a) => {
            if (p) {
                board.push({...p, x, y});
            }
        }, this);

        return {
            board,
            move: this.move,
            players: this.players,
            turn: this.turns[0],
        }
    }

    move(x1, y1, x2, y2) {
        const srcPiece = this.get(x1, y1);

        if (-1 == srcPiece.moves.findIndex(m => m[0] == x2 && m[1] == y2)) {
            return;
        }

        const dstPiece = this.get(x2, y2);

        if (dstPiece) {
            this.capture(dstPiece);
        }

        this.set(x1, y1, undefined);
        this.set(x2, y2, srcPiece);
    }
}
