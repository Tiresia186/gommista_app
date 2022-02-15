import React, {useState, useEffect, useCallback,} from 'react';
import {Row,Col, Button, Input} from 'antd';
import ListItem from './ListItem';
import {useSearchParams} from 'react-router-dom';
import { getDatabase, ref, child, get, remove } from "firebase/database";
const List = (props)=>{
    const [data, setData] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams]= useSearchParams({});
    const dbRef =ref(getDatabase());

        useEffect(() =>get(child(dbRef,'lavorazione/')).then((snapshot)=>{
            if(snapshot.exists()){
                const convertedData = Object.values(snapshot.val())
                setData(convertedData)
                console.log('[CONVERTED-DATA]',convertedData);
            }else{
                console.log('[GET] NO data available')
            }
        }).catch((error)=>{
            console.log(error)
        })
         , [])

    console.log('[STATE_DATA]', data)


    //SEARCH 
   

    const NameSortHandler = (e) =>{
        setSearchParams({nome:e.target.value.toLowerCase()})
    }
    const TargaSortHandler = (e) =>{
        setSearchParams({targa:e.target.value.toLowerCase()})
    }
    
    const currentParams=Object.fromEntries([...searchParams]);

    useEffect(()=>{
        const currentParams=Object.fromEntries([...searchParams]);
        console.log('QUERY',currentParams);
       
    },[searchParams])
    

 //DELETE ITEMS

 const deleteItemHandler=(item)=>{
     
    const db =getDatabase();
    remove(ref(db,'lavorazione/'+ item ))
    console.log('[DELETE]')
    const newList =data.filter(d =>d.numero !== item)
    setData(newList)

}
 

    return(
        
        <Row >
            <Col span={24}>
                <Row style={{paddingBottom:'16px'}} className='no-print'>
                    <Col span={24} className='filter'>
                        <h1>Elenco Lavorazioni</h1>
                        <h3>Cerca per Nome</h3>
                        <Input 
                        placeholder='cerca per nome'
                        type='text'
                        value={searchParams.get('nome')}
                        onChange={NameSortHandler}/>
                        <h3>Cerca per Targa</h3>
                        <Input 
                        
                        placeholder='cerca per Targa'
                        type='text'
                        value={searchParams.get('targa')}
                        onChange={TargaSortHandler}/>


                        
                    </Col>
                </Row>
               

              <ul style={{padding:'0 16px 0px 0px'}} className='accordion'>
                  {!IsLoading &&  data.length > 0 && data.filter(d =>d.nome.toLowerCase().includes(currentParams.nome || '') && d.targa.toLowerCase().includes(currentParams.targa || '') ).map((d)=>(
                      <ListItem 
                        key={d.numero}
                        numero={d.numero}
                        data={d.date}
                        nome={d.nome}
                        cognome={d.cognome}
                        nomeAzienda={d.nomeAzienda}
                        modello={d.modello}
                        targa={d.targa}
                        telefono={d.telefono}
                        mail={d.mail}
                        quantità={d.quantità}
                        misura={d.misura}
                        battistrada={d.battistrada}
                        marca={d.marca}
                        cerchi={d.cerchi}
                        onRemove={deleteItemHandler}
                        

                      />
                  ))}
                  {!IsLoading && data.length === 0 && !error && <p>No data found...</p>}
                  {IsLoading && <p>Caricamento...</p>}
                  {!IsLoading && error && <p>{error}</p>}
              </ul>
            </Col>
        </Row>
    )
}

export default List;