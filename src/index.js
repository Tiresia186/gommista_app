import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import List from './components/List';
import Nuovo from './components/Nuovo';
import AuthForm from './components/Auth/AuthForm';
import {AuthContextProvider} from './store/auth-context';

ReactDOM.render(
  
  <AuthContextProvider>
  <BrowserRouter>
  <App/>
</BrowserRouter>
</AuthContextProvider>,
  document.getElementById('root')
);





