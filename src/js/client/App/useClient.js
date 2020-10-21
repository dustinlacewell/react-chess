import { useRef, useEffect, useState } from "react";

import ChessGame from "@chess";
import LocalClient from "@client/LocalClient";
import useFayeClient from "@client/Faye";


function useLocalClient(clientRef, gamekey, setState) {
    useEffect(() => {
        if (gamekey == "local") {
            const game = new ChessGame();
            clientRef.current = new LocalClient(game, () => setState(game.dump()));
            setState(game.dump());
        }
    }, [gamekey]);
}

export default function useClient({gamekey, hosting}) {
    const [state, setState] = useState(null);
    const [status, setStatus] = useState("initialized");
    const clientRef = useRef(null);
    useLocalClient(clientRef, gamekey, setState);
    useFayeClient(clientRef, gamekey, hosting, setState, setStatus);
    return [state, clientRef.current, status];
}

