

function addData(data){
    return{
        type:ADD_DATA,
        data,  
    }
}

function removeData(id){
    return{
        type:REMOVE_DATA,
        id,
    }
}

export function handleAddData(name, cb){

    return(dispatch) =>{
        return API.saveData(name)
        .then((data)=>{
            dispatch(addData(data));
            cb();
        })
        .catch(()=>{
            alert("[HANDLE_ADD_DATA]Ops, something went wrong")
        })
    }
}




