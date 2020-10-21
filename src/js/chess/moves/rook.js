import Raycaster from "./raycaster";
import { directions, pawnRanks, orthogonals } from "../consts";


const raycaster = new Raycaster(orthogonals);

export default function calculateMoves(board, player, position) {
    return raycaster.calculateMoves(board, player, position);
}
