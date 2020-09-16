import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoggedInProvider } from './LoggedInContext'
import ProtectedRoute from './ProtectedRoute'

import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import EditUsers from './EditUsers'

export default function MainRouter() {

    return (
        <LoggedInProvider>
        <Router>
            <Switch>
                <Route path='/signup' component={ Signup }></Route>
                <Route path='/Login' component={ Login }></Route>
                <Route path='/ForgotPassword' component={ ForgotPassword }></Route>
                <ProtectedRoute path='/admin' component={ EditUsers }></ProtectedRoute>

                <Route path='/' component={ Home }></Route>
            </Switch>
        </Router>
        </LoggedInProvider>
    )
}