import React from 'react';
import ReactDOM from 'react-dom';

// prototype extensions
import "./extensions.js";

// global styles
import "@css/index";

// components
import Root from "@client/Root";

// js imports
$(() => {
    const root = document.getElementById("root");
    ReactDOM.render(<Root />, root);
});
