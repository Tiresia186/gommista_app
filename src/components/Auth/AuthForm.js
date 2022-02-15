import React, {useState, useRef, useCallback, useContext} from 'react';
import {Alert,  Row, Col} from 'antd';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../../store/auth-context';


const AuthForm = (props,ref)=>{
    const [isLogin, setIsLoggin] = useState(true);
    const [isLoading,setIsLoading]=useState(false);
    const [error, setError]= useState(null)
    const emailInputRef= useRef();
    const passwordInputRef= useRef();
   const authCtx= useContext(AuthContext);
   const navigate =useNavigate();
   
  

   
    const loginHandler= useCallback(async (e)=> {
        e.preventDefault();
        setError(false);

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        setIsLoading(true);
        
      
        try{
          
              const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRRR_GB097EK6ScVPwfcFe_p5caCS1FLA',{
                  method:'POST',
                  body: JSON.stringify({
                    email:enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                  }),
                headers:{
                    'Content-Type': 'application-json'
                }
              });
              const data = await response.json();
              setIsLoading(false);
              
              console.log('[POST-AUTH]', data)
              authCtx.login(data.idToken)
              console.log('[form-isLoggedIn]',authCtx.isLoggedIn)
            navigate('/')
         
           
              
              let errorMessage;
              if(data && data.error && data.error.message){
                  errorMessage=data.error.message
                  setError(data.error.message)
                
              }
            
       
        }catch(error){
            console.log('[error]',error) //this in not working idk
        }

    });
    
   
    console.log('[is_login]', isLogin)
     
    
    return(
       
         <section className='auth-container'> 
            <h1>{isLogin ? 'Login' : 'Registrati'}</h1>
            <Row justify='center'>
                <Col span={18}>
                <form onSubmit={loginHandler}>
                <div className='auth'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' required ref={emailInputRef} />

                </div>
                <div className='auth'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' required ref={passwordInputRef}/>
                
                </div>
                
               { !isLoading ? <button type="primary" className='submit-btn' >
               Entra
                </button> : <p>Loading...</p>}
                {error ? <Alert
                            message="Autenticazione fallita:"
                            description={error}
                            type="error"
                            closable
                            
                            />  : null}
            </form>
            
             
                </Col>
            </Row>
           
        
              
                
           
          
            
        </section>
    )
}

export default AuthForm;