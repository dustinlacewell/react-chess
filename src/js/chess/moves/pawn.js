import { directions, pawnRanks } from "@chess/consts";


const advanceOffset = (direction) => [direction, 0];
const doubleAdvanceOffset = (direction) => [direction * 2, 0];
const calculateAdvance = (board, player, position) => {
    const moves = [];
    const direction = directions[player];

    const advancePosition = position.vecSum(advanceOffset(direction));
    const advancePiece = board.get(...advancePosition);

    if (!advancePiece) {
        moves.push(advancePosition);
    }

    if (position[0] != pawnRanks[player]) {
        return moves;
    }

    const doubleAdvancePosition = position.vecSum(doubleAdvanceOffset(direction));
    const doubleAdvancePiece = board.get(...doubleAdvancePosition);

    if (!doubleAdvancePiece) {
        moves.push(doubleAdvancePosition)
    }

    return moves;
};

const attackOffsets = (direction) => [
    advanceOffset(direction).vecSum([0, -1]),
    advanceOffset(direction).vecSum([0, +1]),
];

const getAttackPositions = (board, position, direction) =>
    attackOffsets(direction).map((o) => position.vecSum(o));

const calculateAttacks = (board, player, position) => {
    const moves = [];
    const direction = directions[player];
    const attackPositions = getAttackPositions(board, position, direction);
    for (let attackPosition of attackPositions) {
        const attackPiece = board.get(...attackPosition);

        if (!attackPiece) {
            continue;
        }

        if (!!attackPiece && !!attackPiece.player != player) {
            moves.push(attackPosition);
        }
    }
    return moves;
};

export default function pawnMoves(board, player, position) {
    return [
        ...calculateAdvance(board, player, position),
        ...calculateAttacks(board, player, position),
    ];
}
