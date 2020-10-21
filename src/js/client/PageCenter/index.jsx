import React from "react";

import css from "./index.module";


export default function PageCenter({children}) {
    return (
        <div className={css.pageCenter}>
            {children}
        </div>
    );
}
