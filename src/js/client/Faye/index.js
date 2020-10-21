import { useEffect } from "react";

import ChessGame from "@chess";
import GameServer from "./FayeGameServer.js";
import RemoteClient from "./FayeRemoteClient.js";

export default function useFayeClient(clientRef, gamekey, hosting, setState, setStatus) {
    let game;

    useEffect(() => {
        if (gamekey != "local") {
            if (hosting) {
                game = new GameServer(new ChessGame(), gamekey);
            }

            const client = new RemoteClient(gamekey, setState);

            client.socket.on('transport:down', () => {
                setStatus("disconnected");
            });

            client.socket.on('transport:up', () => {
                setStatus("connected");
            });

            client.refresh();

            clientRef.current = client;

            return () => {
                client.socket.disconnect();
                clientRef.current = null;
            };
        }
    }, [gamekey, hosting]);
}
