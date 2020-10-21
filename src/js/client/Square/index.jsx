import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'

import GameContext from '@client/GameContext';

import css from "./index.module";


export default function Square({ type, x, y, children }) {
    const { state, client } = useContext(GameContext);

    const isValid = (item, monitor) => {
        return item.piece.moves.find(m => m[0] == x && m[1] == y) != undefined;
    };

    const doDrop = (item, monitor) => {
        if (Array.isArray(item.position)){
            const [ox, oy] = item.position;
            client.move(ox, oy, x, y);
        } else {
            const otherPlayer = Object.keys(state.players).find(n => n != item.piece.player);
            client.restore(otherPlayer, item.position, x, y);
        }
    };

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "piece",
        canDrop: isValid,
        drop: doDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;

    if (isActive) {
        type = `${type}-drop-hover`
    } else if (canDrop) {
        type = `${type}-drop-active`;
    }

    return <div ref={drop} className={`${css.square} ${css[type]}`}>
               {children}
           </div>
}
