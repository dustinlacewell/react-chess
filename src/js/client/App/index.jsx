import { hot } from "react-hot-loader";
import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import GameContext from "@client/GameContext";
import GameServer from "@client/FayeGameServer";
import Menu from "@client/Menu";
import Board from "@client/Board";
import Score from "@client/Score";
import PiecePreview from "@client/PiecePreview";
import { useLocalClient } from "@client/LocalClient"
import FayeRemoteClient from "@client/FayeRemoteClient"

import getAppContext from "./context";

import css from "./index.module";


export default function App(props) {
    const context = getAppContext();

    if (context.state == null) return null;

    const playerNames = Object.keys(context.state.players);
    const firstTurn = playerNames[0];
    const firstPlayer = context.state.players[firstTurn];
    const secondTurn = playerNames[1];
    const secondPlayer = context.state.players[secondTurn];

    return (
        <GameContext.Provider value={context}>
            <DndProvider backend={HTML5Backend}>
                <div id={css.app}>
                    <Score name={firstTurn} info={firstPlayer} />
                    <Board />
                    <Menu status={context.status} />
                    <div id={css.shadow}></div>
                    <Score name={secondTurn} info={secondPlayer} />
                </div>
                <PiecePreview />
            </DndProvider>
        </GameContext.Provider>
    );
}

