import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './comps/layout/Navbar';
import Home from './comps/pages/Home';
import Member from './comps/pages/Member';

class App extends Component {
    render() {
        return ( <
            Router >
            <
            div className = "App" >
            <
            Navbar / >
            <
            div class = "container" >
            <
            Route path = "/"
            exact = { true }
            component = { Home }
            /> <
            Route path = "/member"
            exact = { true }
            component = { Member }
            /> <
            /div> <
            /div> <
            /Router>
        );
    }
}

export default App;