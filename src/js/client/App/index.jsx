import { hot } from "react-hot-loader";
import React, { useState, useEffect, useRef } from "react";

import Menu from "@client/Menu";
import Board from "@client/Board";
import GameContext from "@client/GameContext";

import useConfig from "./useConfig";
import useClient from "./useClient";

import css from "./index.module";


export default function App(props) {
    const config = useConfig();
    const [state, client, status] = useClient(config);
    const context = {config, state, client, status};

    if (state == null) return null;

    return (
        <GameContext.Provider value={context}>
            <div id={css.app}>
                <Board />
                <Menu />
                <div id={css.shadow}></div>
            </div>
        </GameContext.Provider>
    );
}

