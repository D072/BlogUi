import {React, useContext, useState} from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBBreadcrumb,
    MDBBtn,
    MDBInputGroup,
    MDBBreadcrumbItem,
  } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from "./SideBar";
import { SearchData } from './SearchContext';

const Navbar = () => {
    let data = useContext(SearchData)
    const [search, setSearch] = useState("")
    let token = localStorage.getItem("token")
    let ad = localStorage.getItem("token")
  
    const getData = () => {
      axios.get('http://localhost:3000/blog/allData', { headers: { token: token } })
          .then(function (response) {
              data.setData(response.data.data);
          })
          .catch(function (error) {
              console.log(error);
          })
    }
    const handelSub = async(values) => {
      setSearch(values)
  
      if(values){
        await axios.get('http://localhost:3000/searchData?search='+values)
        .then(function (response) {
          console.log(response);
          data.setData(response.data.data)
        })
        .catch(function (error) {
          console.log(error);
        })
      } else {
        getData()
      }
    }
  return (
    <>
      <MDBNavbar light bgColor="light">
        <MDBContainer>
          <div className="d-flex">
            <SideBar className="ms-3" />
            <MDBNavbarBrand href="/">
              <img
                src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp"
                height="30"
                alt=""
                loading="lazy"
              />
            </MDBNavbarBrand>
          </div>
          <div>
          <Link exact to='/login'>
            <MDBBtn className="me-2">Log In</MDBBtn>
          </Link>
          <Link exact to='/login'>
            <MDBBtn>Sign Up</MDBBtn>
          </Link>
          </div>
        </MDBContainer>
      </MDBNavbar>
      <MDBNavbar expand="lg" dark bgColor="dark">
        <MDBContainer>
          <nav aria-label="breadcrumb">
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </nav>
          <MDBInputGroup className="d-flex w-auto">
            <input className="form-control" placeholder="Search here" aria-label="Search" type="Search" onChange={(e) => handelSub(e.target.value)}
            />
            <MDBBtn className='ms-1'outline onClick={handelSub}>Search</MDBBtn>
          </MDBInputGroup>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Navbar
