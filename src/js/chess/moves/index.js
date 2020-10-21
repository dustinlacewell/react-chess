import kingMoves from "./king";
import queenMoves from "./queen";
import bishopMoves from "./bishop";
import rookMoves from "./rook";
import knightMoves from "./knight";
import pawnMoves from "./pawn";


export default function calculateMoves(board, piece, position) {
    return ({
        "king": kingMoves,
        "queen": queenMoves,
        "bishop": bishopMoves,
        "rook": rookMoves,
        "knight": knightMoves,
        "pawn": pawnMoves,
    })[piece.name](board, piece.player, position);
}
