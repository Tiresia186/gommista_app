import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import { useContext } from 'react';

import Dashboard from './components/Dashboard';
import List from './components/List';
import Nuovo from './components/Nuovo';
import AuthForm from './components/Auth/AuthForm';
import AuthContext from './store/auth-context';
import ItemView from './components/ItemView';

function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
   
    <div className="App">
      
       
      <Routes>
        <Route path="/" element={<Dashboard />} >
         {authCtx.isLoggedIn && (<Route path="/" element={<List/>}/>)} 
         {authCtx.isLoggedIn && (<Route path="/new" element={<Nuovo/>}/>)} 
         {authCtx.isLoggedIn && (<Route path="/lavorazione" element={<ItemView/>}/>)} 

        {!authCtx.isLoggedIn && (<Route path='/' element={<AuthForm/>}/>)}
        <Route path='*' element={<AuthForm/>}/>
        </Route>
    
      </Routes>
       
    
      
    </div>
    
  );
}

export default App;
