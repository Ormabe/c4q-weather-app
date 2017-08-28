import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from './src/input.js';
import Image from './src/image.js';


import './favicon.ico';
import './app.scss';

class App extends Component {
    render () {
        return (
            <div>
                
                <h1 id='title'>7-Day Weather Forcast</h1>
                <Input />
            </div> 
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))