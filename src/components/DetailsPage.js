import { MDBContainer } from 'mdb-react-ui-kit';
import {React,useState,useEffect} from 'react'
import axios from 'axios';
import {useParams } from 'react-router-dom';

const DetailsPage = () => {
    const [data , setData] = useState({})
    let token = localStorage.getItem("token")
    const params = useParams()  
    const getData = () => {
      axios.get('http://localhost:3000/blog/detailData?id='+params.blogid, { headers: { token: token } })
          .then(function (response) {
            setData(response.data.data);
          })
          .catch(function (error) {
              console.log(error);
          })
    }
    useEffect(() =>{
      getData();
    },[])
  return (
   <>
   <MDBContainer className='mt-5'>
                <div className='d-flex justify-content-center'>
                    <div className='img-wrapper'>
                        <img src={'http://localhost:3000/blog/' + data.blogImage}alt='...'></img>
                    </div>
                </div>
                <div className='d-flex justify-content-center w-25 m-auto'>
                    <div className='name ms-3 mt-3'>
                        <h4 className='text-black'>{data.title}</h4>
                        <span className='text-secondary'>{data.category ? data.category.category : ""}</span>
                        <p className='desc text-dark'>
                           {data.description}
                        </p>
                    </div>
                </div>
            </MDBContainer>
   </>
  )
}

export default DetailsPage;
