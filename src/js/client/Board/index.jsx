import React, { useContext } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Score from "@client/Score";
import GameContext from '@client/GameContext';
import PiecePreview from '@client/PiecePreview';

import renderSquare from "./renderSquare";

import css from "./index.module";


export default function Board() {
    const { state } = useContext(GameContext);
    const playerNames = Object.keys(state.players);
    const firstTurn = playerNames[0];
    const firstPlayer = state.players[firstTurn];
    const secondTurn = playerNames[1];
    const secondPlayer = state.players[secondTurn];

    const squares = [];
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            squares.push(renderSquare(x, y));
        }
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <div id={css.board}>
                <Score key={1} name={firstTurn} info={firstPlayer} />
                <div id={css.squares}>{squares}</div>
                <Score key={2} name={secondTurn} info={secondPlayer} />
            </div>
            <PiecePreview />
        </DndProvider>
    );
}
