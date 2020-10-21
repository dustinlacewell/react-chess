import Offsetter from "./offsetter";
import { knightOffsets } from "../consts";


const offsetter = new Offsetter(knightOffsets);

export default function knightMoves(board, player, position) {
    return offsetter.calculateMoves(board, player, position);
}

