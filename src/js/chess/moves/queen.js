import Raycaster from "./raycaster";
import { diagonals, orthogonals } from "../consts";


const raycaster = new Raycaster([...diagonals, ...orthogonals]);

export default function queenMoves(board, player, position) {
    return raycaster.calculateMoves(board, player, position);
}
