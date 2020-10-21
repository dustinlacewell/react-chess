import Raycaster from "./raycaster";
import { diagonals } from "../consts";


const raycaster = new Raycaster(diagonals);

export default function bishopMoves(board, player, position) {
    return raycaster.calculateMoves(board, player, position);
}
