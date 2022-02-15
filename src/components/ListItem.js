import React, {useRef} from 'react';
import {Row,Col,Collapse, Button} from 'antd'
import ReactToPrint from 'react-to-print';
import {Link} from 'react-router-dom'




const ListItem = (props)=>{
    const componentRef=useRef(null);
    const {Panel} = Collapse;
   const {cerchi, onRemove} = props
    

   
    
    return(
        
        <Row className='list-item'>
            <Col span={24}>
               
                <Collapse accordion>
          
                <Panel header={ `Codice Deposito ${props.numero} `} extra={ <Button type='default' onClick={()=>onRemove(props.numero)}> Cancella</Button>    } key="1">
                <div ref={componentRef}>
                    <Row>
                        <Col span={12} className='list-item-col-sx'>
                            
                            <h3 style={{padding:'16px 0 0 8px'}}>Anagrafica cliente:</h3>
                            <ul style={{padding:'0px 0 0 8px'}}>
                                <li><b>Codice Deposito:</b> {props.numero}</li>
                                <li><b>Nome:</b> {props.nome}</li>
                                <li><b>Cognome:</b> {props.cognome}</li>
                                <li><b>Nome Azienda:</b> {props.nomeAzienda}</li>
                                <li><b>Telefono:</b> {props.telefono}</li>
                                <li><b>Email:</b> {props.mail}</li>
                                <li><b>Modello Auto :</b>{props.modello}</li>
                                <li><b>Targa Auto:</b>{props.targa}</li>
                            </ul>
                            
                        </Col>
                        <Col span={12} className='list-item-col-dx'>
                            <h3 style={{padding:'16px 0 0 8px'}}>Lavorazione:</h3>
                            <ul style={{padding:'0px 0 0 8px'}} >
                                <li> <b>Quantità:</b> {props.quantità}</li>
                                <li> <b>Misura:</b> {props.misura}</li>
                                <li><b>Marca:</b> {props.marca}</li>
                                <li><b>Cerchi:</b> {cerchi }</li>
                                
                            </ul>
                            <Button type='primary' style={{margin:'8px'}}>Modifica</Button>
                            <Link to={'/lavorazione?id=' + props.numero}>Stampa</Link>
                            
                        </Col>
                    </Row>
                    </div>
                    </Panel>
                   
                </Collapse>
                
            </Col>
        </Row>
    )
}

export default ListItem;