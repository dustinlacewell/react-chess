import React, { useState, useContext } from "react";

import GameContext from '@client/GameContext';
import NetworkConfig from "@client/NetworkConfig";


import css from "./index.module";


function Status({current}) {
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
            <span className={css.status}
                  style={{color}}
                  title={current}
            >⚫</span>
        </div>
    );
}


export default function Menu({status}) {
    const { state, client, hosting, gamekey, setHosting, setGamekey } = useContext(GameContext);
    const [visible, setVisible] = useState(false);
    const [_hosting, _setHosting] = useState(hosting);
    const [_gamekey, _setGamekey] = useState(gamekey);

    const classNames = `${css.menu} ${visible ? css.visible : css.invisible}`;

    const doClick = () => {
        // if (!_hosting && _gamekey == "") {
        //     return;
        // }

        setVisible(!visible);
        if (visible) {
            if (_hosting != hosting) {
                setHosting(_hosting);
            }
            if (_gamekey != gamekey) {
                setGamekey(_gamekey.toUpperCase());
            }
        }
    }

    return (
        <div className={classNames}>
            <div className={css.menuContainer}>
                <div className={css.menuBackground}></div>
                <div className={css.menuContent}>
                    <div>
                        <span className={css.title}>Chess</span>
                    </div>
                    <div className={css.madewith}>
                        <div>Made with&nbsp;<span>ReactJS</span></div>
                        <div>
                            <i>&nbsp;..and a bunch of other stuff!</i>
                        </div>
                    </div>
                    <NetworkConfig setHosting={_setHosting} setGamekey={_setGamekey} />
                </div>
            </div>
            <div className={css.sidebar}>
                <div className={css.tab} onClick={doClick}></div>
            </div>
        </div>
    );
}
