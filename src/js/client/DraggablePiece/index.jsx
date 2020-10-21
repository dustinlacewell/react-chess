import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';

import GameContext from '@client/GameContext';
import Piece from '@client/Piece';


export default function DraggablePiece({piece, position}) {
    const [{isDragging}, drag, preview] = useDrag({
        item: { type: "piece", piece, position },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => { preview(getEmptyImage()); }, []);

    const styles = {
        opacity: isDragging ? 0.4 : 1,
    }

    return (
        <div style={styles} ref={drag}>
            <Piece {...piece} />
        </div>
    );
}
