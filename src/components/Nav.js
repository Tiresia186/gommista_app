import React, {useContext, useState, useEffect} from 'react';
import {Row, Col, Menu, Dropdown} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import '../App.css';
import {Link} from 'react-router-dom'
import AuthContext from '../store/auth-context';
import logo from '../asset/logo_trasp.png';


const Nav =(props) =>{
    const authCtx = useContext(AuthContext);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint= 600;
    useEffect(()=>{
        const handleResizeWindow = ()=>setWidth(window.innerWidth);
        window.addEventListener('resize', handleResizeWindow);
        return()=>{
            window.removeEventListener('resize',handleResizeWindow)
        }
    }, [])

    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () => {
        authCtx.logout();
    }        
  let menu;
    if(width < breakpoint ){
         menu = ( <div className='dropdown'>
        <span>MENU</span>
        <div className='dropdown-content'>
         <ul>
             <li>
             <Link to="/?sort=name" style={{color:'white', padding:'32px'}}>Lavorazioni</Link>
             </li>
             <li>
             <Link to="/new" style={{color:'white', padding:'32px'}}>Nuovo</Link>

             </li>
         </ul>
         
        </div>
    </div>)
    }else{
      menu =(  <ul className='menu-items'>
        <li>
        <Link to="/?sort=name" style={{color:'white', padding:'32px'}}>Lavorazioni</Link>
        </li>
        <li>
        <Link to="/new" style={{color:'white', padding:'32px'}}>Nuovo</Link>

        </li>
    </ul>)
    }
                    
    console.log('[NAV-isLoggedIn]', isLoggedIn)
    return(
        <div className='nav-container'>
            <Row justify='center' className='row-nav'>
                <Col span={6} style={{ textAlign: 'center' }}>
                    <img src={logo} className='logo'></img>
                </Col>
                {isLoggedIn && 
                <Col span={12} style={{textAlign:'center'}}>
                {menu}
                </Col>
                }
                <Col span={6} style={{ textAlign: 'center' }}>
                <ul className='menu-items'>
                    {isLoggedIn  && <a onClick={logoutHandler} style={{color:'white', paddingLeft:'16px'}}>LOGOUT</a>}
                       
                        
                    </ul>
                </Col>
                
            </Row>
        </div>
    )
}

export default Nav
