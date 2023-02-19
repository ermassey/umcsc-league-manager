import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

import Main from "./components/Main"

import PlayerList from './logic/PlayerList'
import {Week} from './logic/Week';
import {getPlayerJSON} from './logic/FileHandler';
import {HashRouter as Router,} from "react-router-dom"

declare global {
    interface Window {
        filesys? : any
    }
}

getPlayerJSON()
.then(jsonData => {
    if (jsonData !== null) {
        return new PlayerList(jsonData)
    } else {
        throw new Error("Something went wrong when generating the player list");
    }})
.then(pl => renderMain(pl))


function renderMain(pl: PlayerList) {
    var week = new Week(pl); 

    const container = document.getElementById('root');
    if (container !== null) {
        const root = createRoot(container);

        root.render(
            <React.StrictMode>
                <Router>
                    <Main inweek={week}/>        
                </Router>
            </React.StrictMode>,
        );
    } else {
        console.log("Error: Root container is undefined.")
    }
    
}
