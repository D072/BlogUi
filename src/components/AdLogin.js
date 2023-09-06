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

const AdLogin = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
      return history.push('/login')
    }
  const [userName, setuserName] = useState('')
  const [pass, setPass] = useState('')

  function handleUserName(e) {
      setuserName(e.target.value)
  }
  function handlePass(e) {
      setPass(e.target.value)
  }
  const history = useHistory()
  
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
          const res = await axios.post("http://localhost:3000/admin/login", OBJ)
          localStorage.setItem('ADtoken', res.data.token)
          localStorage.removeItem('token')
          return history.push('/admin/home')
              
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
            <p className="text-center">Not a member? 
            <button className="rButton" onClick={handleJustifyClick}>Register</button></p>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer> 
    </div>
  )
}

export default AdLogin
