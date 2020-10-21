export default class Raycaster {
    constructor(directions) {
        this.directions = directions;
    }

    calculateDirection(board, player, position, direction) {
        const moves = [];

        for (let i = 0; i < 8; i++) {
            position = position.vecSum(direction);
            const targetPiece = board.get(...position);

            // own piece
            if (targetPiece?.player == player) {
                break;
            }

            moves.push(position);

            // enemy piece
            if (targetPiece) {
                break;
            }
        }

        return moves;
    }

    calculateMoves(board, player, position) {
        let moves = [];

        for (let direction of this.directions) {
            moves = [
                ...moves,
                ...this.calculateDirection(board, player, position, direction),
            ];
        }

        return moves;
    }
}
