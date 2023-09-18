import {React, useState} from 'react'
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox
  }from 'mdb-react-ui-kit';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import api from '../Services';

const Login = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
      setJustifyActive(value);
    }

  const [fname, setFname] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setuserName] = useState('')
  const [pass, setPass] = useState('')

  function handleFname(e) {
    setFname(e.target.value)
  }
  function handleEmail(e) {
      setEmail(e.target.value)
  }
  function handleUserName(e) {
      setuserName(e.target.value)
  }
  function handlePass(e) {
      setPass(e.target.value)
  }
  const history = useHistory()
  const handleSubmit = async() =>{
      try {
          let OBJ =   {
            fname : fname,
            email : email,
            username : userName,
            password : pass
          }
          const res = await axios.post(api + "/register", OBJ)            
          localStorage.setItem('token', res.data.token)
          setFname('')
          setEmail('')
          setPass('')
          setuserName('')
          setJustifyActive('tab1')
      } catch (err) {
          console.log(err);
      }
  }
  
  const [loguserName, setLoguserName] = useState('')
  const [logpass, setLogpass] = useState('')

  function handleloguserName(e) {
      setLoguserName(e.target.value)
    }
  function handlelogpass(e) {
      setLogpass(e.target.value)
  }
  
  const handleSend = async () =>{
      try {
          let OBJ =   {
              username : loguserName,
              password : logpass
          }
          const res = await axios.post(api + "/login", OBJ)
          
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('fname', res.data.data.fname)
          localStorage.removeItem('ADtoken')
          
          return history.push('/')
              
          } catch (err) {
              alert("User not found")
              console.log(err);
      }    
  }
  return (
    <div>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>

          <MDBTabsPane show={justifyActive === 'tab1'}>

            <MDBInput wrapperClass='mb-4' name='username' label='Username' id='form1' type='Username' onChange={handleloguserName}/>
            <MDBInput wrapperClass='mb-4' name='password' label='Password' id='form2' type='password' onChange={handlelogpass}/>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="/">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" onClick={handleSend}>Sign in</MDBBtn>
            <p className="text-center">Not a member? <button className="rButton" onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>Register</button></p>
            <p className='text-center'>Login as <a href='/admin/login'>Admin</a></p>


          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>

            <MDBInput wrapperClass='mb-4' name='fname' label='Name' id='form1' type='text'  onChange={handleFname}/>
            <MDBInput wrapperClass='mb-4' name='email' label='Email' id='form1' type='mail' onChange={handleEmail}/>
            <MDBInput wrapperClass='mb-4' name='username' label='Username' id='form1' type='username' onChange={handleUserName}/>
            <MDBInput wrapperClass='mb-4' name='password' label='Password' id='form1' type='password' onChange={handlePass}/>

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>Sign up</MDBBtn>

          </MDBTabsPane>

        </MDBTabsContent>

      </MDBContainer> 
    </div>
  )
}

export default Login
