import React from "react";

import DraggablePiece from "@client/DraggablePiece";

import css from "./index.module";

export default function Score({ name, info }) {
    const { score, captures } = info;
    return (
        <div className={css.score}>
            <div className={css.captures}>
                {captures.map((piece, index) => (
                    <DraggablePiece key={index} piece={piece} position={index} />
                ))}
            </div>
        </div>
    );
}
