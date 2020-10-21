import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import PageCenter from "@client/PageCenter";
import App from "@client/App";

function Root(props) {
    return (
        <PageCenter>
            <App />
        </PageCenter>
    );
}

export default hot(module)(Root);
