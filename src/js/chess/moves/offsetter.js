export default class Offsetter {
    constructor(offsets) {
        this.offsets = offsets;
    }

    calculateMoves(board, player, position) {
        const moves = [];

        for (let offset of this.offsets) {
            const offsetPosition = position.vecSum(offset);
            const targetPiece = board.get(...offsetPosition);
            if (targetPiece?.player == player) {
                continue;
            }
            moves.push(offsetPosition);
        }

        return moves;
    }
}
