import { useState, useRef, useEffect } from "react";

import ChessGame from "@chess";
import GameServer from "@client/FayeGameServer";
import RemoteClient from "@client/FayeRemoteClient";
import LocalClient from "@client/LocalClient";


export default function getAppContext() {
    const [hosting, setHosting] = useState(true);
    const [gamekey, setGamekey] = useState("local");
    const [state, setState] = useState(null);
    const [status, setStatus] = useState("initialized");
    const clientRef = useRef(null);

    useEffect(() => {
        if (gamekey == "local") {
            const game = new ChessGame();
            clientRef.current = new LocalClient(game, () => setState(game.dump()));
            setState(game.dump());
        } else {

            if (hosting) {
                new GameServer(new ChessGame(), gamekey);
            }

            clientRef.current = new RemoteClient(gamekey, setState);
            clientRef.current.refresh();

            clientRef.current.socket.on('transport:down', () => {
                setStatus("disconnected");
            });

            clientRef.current.socket.on('transport:up', () => {
                setStatus("connected");
            });
        }
        return () => {
            if (!clientRef?.current?.socket) return;
            clientRef.current.socket.disconnect();
            clientRef.current = null;
        };
    }, [gamekey, hosting]);

    return {
        state, status, gamekey, hosting, setGamekey, setHosting,
        client: clientRef.current,
    };
}
