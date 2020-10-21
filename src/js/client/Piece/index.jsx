import React from 'react'

import css from './index.module';


export default function Piece({name, player}) {
    return (
        <div className={css.piece}>
            <i className={`${css[player]} ${css[name]}`}></i>
        </div>
    );
}
