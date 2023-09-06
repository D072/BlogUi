import React from 'react'
import HomeData from './HomeData';
import {
    MDBContainer,
} from 'mdb-react-ui-kit';

const Home = () => {
  return (
   <>
      <MDBContainer className='mt-5'>
        <h1 className='text-center mb-7'>My Blog</h1>
        <div className='d-flex flex-wrap'>
            <HomeData />
        </div>
      </MDBContainer>
   </>
  )
}

export default Home;
