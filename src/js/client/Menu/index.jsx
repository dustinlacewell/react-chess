import React, { useState, useContext } from "react";

import GameContext from "@client/GameContext";
import NetworkConfig from "@client/NetworkConfig";

import MenuContext from "./MenuContext";
import css from "./index.module";

function Status({ current }) {
    let color = "red";

    switch (current) {
        case "initialized":
        case "closing":
        case "closed":
            color = "black";
            break;
        case "connecting":
            color = "cyan";
            break;
        case "connected":
            color = "green";
            break;
        default:
    }

    return (
        <div>
            <span className={css.status} style={{ color }} title={current}>
                ⚫
            </span>
        </div>
    );
}

export default function Menu() {
    const { config, state, status, client } = useContext(GameContext);
    const [visible, setVisible] = useState(false);
    const [_hosting, _setHosting] = useState(config.hosting);
    const [_gamekey, _setGamekey] = useState(config.gamekey);

    const classNames = `${css.menu} ${visible ? css.visible : css.invisible}`;

    const confirm = () => {
        if (!_hosting && _gamekey == "") {
            return;
        }

        setVisible(!visible);
        if (visible) {
            if (_hosting != config.hosting) {
                config.setHosting(_hosting);
            }
            if (_gamekey != config.gamekey) {
                config.setGamekey(_gamekey.toUpperCase());
            }
        }
    };

    const context = {
        confirm,
        setHosting: _setHosting,
        setGamekey: _setGamekey,
    };

    const madeWith = (
        <div className={css.madewith}>
            <div>
                Made with&nbsp;<span>ReactJS</span>
            </div>
            <div>
                <i>&nbsp;..and a bunch of other stuff!</i>
            </div>
        </div>
    );

    return (
        <MenuContext.Provider value={context}>
            <div className={classNames}>
                <div className={css.menuContainer}>
                    <div className={css.menuBackground}></div>
                    <div className={css.menuContent}>
                        <div>
                            <span className={css.title}>Chess</span>
                        </div>
                        {madeWith}
                        <NetworkConfig />
                    </div>
                </div>
                <div className={css.sidebar}>
                    <div className={css.tab} onClick={confirm}></div>
                </div>
            </div>
        </MenuContext.Provider>
    );
}
