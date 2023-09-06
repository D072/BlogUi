import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const AdminOnly = () => {
    const [showNav, setShowNav] = useState(false);
  return (
    <>
        <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>

            <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
            <MDBNavbarToggler
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNav(!showNav)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav>
                <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                    Home
                </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <Link to='/blog/cateCreate'>
                    <MDBNavbarLink>Category</MDBNavbarLink>
                </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                <Link to='/blog/blogCreate'>
                    <MDBNavbarLink>Blog</MDBNavbarLink>
                </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                </MDBNavbarItem>
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar> 
    </>
  )
}

export default AdminOnly
