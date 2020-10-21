import { useState } from "react";

export default function useConfig() {
    const [hosting, setHosting] = useState(true);
    const [gamekey, setGamekey] = useState("local");
    return {hosting, setHosting, gamekey, setGamekey};
}

