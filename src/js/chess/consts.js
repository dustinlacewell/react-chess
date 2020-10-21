export const types = [
    "rook", "knight", "bishop", "king", "queen", "bishop", "knight", "rook"
];

export const directions = {
    white: 1,
    black: -1,
}

export const pawnRanks = {
    white: 1,
    black: 6,
}

export const orthogonals = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
]

export const diagonals = [
    [-1, -1], [-1, 1], [1, -1], [1, 1],
]

export const knightOffsets = [
    [-2, -1], [-2, 1],
    [-1, -2], [-1, 2],
    [1, -2], [1, 2],
    [2, -1], [2, 1],
]
