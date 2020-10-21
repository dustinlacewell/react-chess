import React, { useState, useContext } from "react";

import MenuContext from "@client/Menu/MenuContext";

import css from "./index.module";

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c,
    ) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default function NetworkConfig() {
    const { confirm, setHosting, setGamekey } = useContext(MenuContext);
    const [mode, setMode] = useState("local");
    const [joinkey, setJoinkey] = useState("");
    const [hostkey, setHostkey] = useState("global");

    const onLocal = () => {
        setMode("local");
        setHosting(true);
        setGamekey("local");
    };

    const onJoin = () => {
        setMode("join");
        setHosting(false);
        setGamekey(joinkey);
    };

    const onHost = () => {
        setMode("host");
        setHosting(true);
        const uuid = uuidv4();
        setHostkey(uuid);
        setGamekey(uuid);
    };

    const onJoinChange = (e) => {
        const key = e.target.value.replace(" ", "");
        setJoinkey(key);
        setGamekey(key);
    };

    const onKeyDown = (e) => {
        if (e.key == "Enter") {
            confirm();
        }
    };

    return (
        <div className={css.networkConfig}>
            <div>
                <label>
                    <input
                        type="radio"
                        id="local"
                        checked={mode == "local"}
                        onChange={onLocal}
                    />
                    Local Hotseat
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="radio"
                        id="join"
                        checked={mode == "join"}
                        onChange={onJoin}
                    />
                    Join
                </label>
                <input
                    className={css.expander}
                    type="text"
                    name="gamekey"
                    onChange={onJoinChange}
                    value={mode == "join" ? joinkey : ""}
                    disabled={mode != "join"}
                    onKeyDown={onKeyDown}
                />
            </div>

            <div>
                <label>
                    <input
                        type="radio"
                        id="host"
                        checked={mode == "host"}
                        onChange={onHost}
                    />
                    Host
                </label>
                <input
                    className={css.expander}
                    type="text"
                    name="gamekey"
                    disabled={true}
                    value={hostkey}
                />
            </div>
        </div>
    );
}
