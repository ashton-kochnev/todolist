import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title={'What to learn'}/>
            <Todolist title={"What's up"}/>
            <Todolist title={'i see you'}/>
        </div>
    );
}

export default App;
