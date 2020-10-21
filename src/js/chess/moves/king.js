import Offsetter from "./offsetter";
import { orthogonals, diagonals } from "../consts";


const offsetter = new Offsetter([...orthogonals, ...diagonals]);

export default function kingMoves(board, player, position) {
    return offsetter.calculateMoves(board, player, position);
}
