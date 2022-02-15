import {useRef, useEffect, useState} from 'react';
import {Row,Col, Button} from 'antd'
import ReactToPrint from 'react-to-print';
import {useSearchParams} from 'react-router-dom';
import { getDatabase, ref, child, get, remove } from "firebase/database";

import logo from '../asset/logo_trasp.png';


const ItemView = (props)=>{

    const [data,setData]=useState({});
    const [searchParams,setSearchParams]=useSearchParams()
    const dbRef =ref(getDatabase());
    const componentRef = useRef(null)

   

    useEffect(() =>get(child(dbRef,'lavorazione/' + searchParams.get('id'))).then((snapshot)=>{
        if(snapshot.exists()){
            setData(snapshot.val())
            console.log('[CONVERTED-DATA]',snapshot.val(), '[stato]', data);
        }else{
            console.log('[GET] NO data available')
        }
    }).catch((error)=>{
        console.log(error)
    })
     , [])

    return(
        <div className='view-container' ref={componentRef}>
            <div className='intestazione'>
              <Row justify='center' align='baseline'>
                  <Col span={12} style={{textAlign:'center'}}>
                  <img src={logo} style={{maxWidth:'100px', maxHeight:'100px', margin:'50px'}}></img>

                  </Col>
                  <Col span={12}>
                      <p style={{margin:'90px 0 100px 0'}}>Allasia gomme s.r.l </p>
                  </Col>
              </Row>
            </div>   
                        <Row>
                            
                        <Col span={24} className='list-item-col-sx'  style={{marginLeft:'100px'}}>
                            
                            <h3 style={{padding:'16px 0 0 8px'}}>Anagrafica cliente:</h3>
                            <ul style={{listStyleType:'none', padding:'0px 0 0 8px'}}>
                                <li><b>Codice Deposito:</b> {data.numero}</li>
                                <li><b>Nome:</b> {data.nome}</li>
                                <li><b>Cognome:</b> {data.cognome}</li>
                                <li><b>Nome Azienda:</b> {data.nomeAzienda}</li>
                                <li><b>Telefono:</b> {data.telefono}</li>
                                <li><b>Email:</b> {data.mail}</li>
                                <li><b>Modello Auto :</b>{data.modello}</li>
                                <li><b>Targa Auto:</b>{data.targa}</li>                             
                            </ul>
                            
                        </Col>
                        <Col span={24} className='list-item-col-dx' style={{ marginLeft:' 100px',padding:'0px'}}>
                            <h3 style={{padding:'16px 0 0 8px'}}>Lavorazione:</h3>
                            <ul style={{listStyleType:'none', padding:'0px 0 0 8px'}}>
                            <li> <b>Quantità:</b> {data.quantità}</li>
                                <li> <b>Misura:</b> {data.misura}</li>
                                <li><b>Marca:</b> {data.marca}</li>
                                <li><b>Cerchi:</b> {data.cerchi }</li>
                                <br></br>
                                <li style={{marginTop:'30px'}}>Firma: ____________________________</li>
                            </ul>
                        </Col>
                      
                        
                    </Row>
                       
                    <ReactToPrint
                                        trigger={()=> <Button type='primary' className='no-print' style={{margin:'8px'}}>Stampa</Button>}
                                        content={()=> componentRef.current}
                                    /> 

              
                
            

        </div>
    )
}

export default ItemView