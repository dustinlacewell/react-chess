import { usePreview } from "react-dnd-preview";

import Piece from "@client/Piece";

import css from "./index.module";



export default function PiecePreview() {
    const { display, itemType, item, style } = usePreview();
    if (!display) return null;
    const { piece } = item;
    return (
        <div className={css.preview} style={style}>
            <Piece {...piece} />
        </div>
    );
};

