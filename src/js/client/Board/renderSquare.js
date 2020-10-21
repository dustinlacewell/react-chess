import React, { useContext } from 'react';

import GameContext from '@client/GameContext';
import Square from '@client/Square';
import DraggablePiece from '@client/DraggablePiece';


export default function renderSquare(x, y) {
    const { state, client } = useContext(GameContext);
    const type = (x + y) % 2 == 0 ? "white" : "black" ;
    const piece = state ? client.get(state, x, y) : null;
    return (
        <Square key={`${x}-${y}`} type={type} x={x} y={y}>
            {piece ? <DraggablePiece piece={piece} position={[x, y]}  /> : null}
        </Square>
    );
}

