import css from "./index.module";

import React, { useContext } from 'react';

import GameContext from '@client/GameContext';
import Square from '@client/Square';
import DraggablePiece from '@client/DraggablePiece';

function renderSquare(x, y) {
    const { state, client } = useContext(GameContext);
    const type = (x + y) % 2 == 0 ? "white" : "black" ;
    const piece = state ? client.get(state, x, y) : null;
    return (
        <Square type={type} x={x} y={y}>
            {piece ? <DraggablePiece piece={piece} position={[x, y]}  /> : null}
        </Square>
    );
}

export default function Board() {
    const squares = [];
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            squares.push(renderSquare(x, y));
        }
    }
    return (
        <div id={css.board}>
            {squares}
        </div>
    );
}
