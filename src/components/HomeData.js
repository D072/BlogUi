import { React, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCol
} from 'mdb-react-ui-kit';
import { SearchData } from './SearchContext';

const HomeData = () => {
  // const [data , setData] = useState([])
  let token = localStorage.getItem("token")
  let data = useContext(SearchData)

  const getData = () => {
    axios.get('http://localhost:3000/blog/allData', { headers: { token: token } })
      .then(function (response) {
        console.log("response", response.data.data);
        data.setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      {
        data.data.map((el, index) => {
          return (
            <MDBCol className='col-md-4 p-2'>
              <Link exact to={'/detail/' + el.id}>
                <MDBCard>
                  <MDBCardImage src={'http://localhost:3000/blog/' + el.blogImage} position='top' alt='...' />
                  <MDBCardBody>
                    <MDBCardTitle>{el.title}</MDBCardTitle>
                    <span className='cateGory'>{el.category.category}</span>
                    <MDBCardText>
                      {el.description}
                    </MDBCardText>
                    <MDBBtn href='#'>Know More...</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </Link>
            </MDBCol>
          )
        })
      }
    </>
  )
}

export default HomeData
