import React,{Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import '../App.css';
import {Outlet} from 'react-router-dom'

import Nuovo from './Nuovo';
import Nav from './Nav';
import List from './List';
const { Header, Content, Footer } = Layout;

class Dashboard extends Component{
  
    render(){
        
        return(
            <Layout className="layout">
                <Header className="header">    
                    <Nav/>

                </Header>
                <Content className="container">
                  
                   <Outlet/>
                </Content>
                <Footer className="footer">
                   2022 | Powered By <a href='https://www.grandalab.com' target='_blank'>Grandalab</a>
                </Footer>
          </Layout>
        )
    }

}

export default Dashboard