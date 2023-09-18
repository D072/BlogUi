import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MDBContainer } from 'mdb-react-ui-kit';
import api  from '../Services';


const BlogData = () => {
    const [data , setData] = useState([])
    const [title , setTitle] = useState([])
    const [description , setDescription] = useState([])
    const [category, setCategory] = useState('')
    const [cate, setCate] = useState([])
    const [id, setID] = useState("")
    const [blogImage, setBlogImage] = useState("")  

    let token = localStorage.getItem("ADtoken")

    const getData = () => {
    let token = localStorage.getItem("ADtoken")

      axios.get(api + '/blog/allData', { headers: { token: token } })
          .then(function (response) {
              setData(response.data.data);
          })
          .catch(function (error) {
              console.log(error);
          })
  }
  useEffect(() => {
    getData()
    axios.get(api + '/category/allCategory', { headers: { token: token } })
        .then(function (response) {
            let copyArray = []
            for (let i = 0; i < response.data.data.length; i++) {
                copyArray.push(response.data.data[i])
            }
            setCate(copyArray);
            setCategory(copyArray[0]._id)
        })
        .catch(function (error) {
            console.log(error);
        })
}, []);

  function handleTitle(e) {
    setTitle(e.target.value)
  }
  function handleDesc(e){
    setDescription(e.target.value)
  }
  function handleDrop(e) {
    setCategory(e.target.value)
  }

  const handleSubmit = () => {

    const formData = new FormData();
    
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('blogImage', blogImage)

    if (id) {
        try {
            axios.patch(api + "/blog/update?id="+id, formData, { headers: { token: token } })
                .then(function (response) {
                    console.log(response);
                    getData()
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    }else{
        try {
            axios.post(api + "/blog/create", formData, { headers: { token: token } })
                .then(function (response) {
                    getData()
                })
                .catch(function (error) {
                    console.log(error);
                });
            } 
        catch (err) {
            console.log(err);
        }
    }
    setTitle("")
    setDescription("")
    setCategory("")
    setID("")
}
const handleDelete = (index, id) => {
  axios.delete(api + "/blog/delete?id=" + id, { headers: { token: token } })
      .then(function (response) {
          getData()
      })
      .catch(function (error) {
          console.log(error);
      });
}
const handleEdit = (index, id) => {
  let copyArray  = [...data]
  setTitle(copyArray[index].title)
  setDescription(copyArray[index].description)
  setCategory(copyArray[index].category._id)
  setID(id)
};
  return (
    <>
        <div className='blogMain'>
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Title :</th>
                <td><input type='text' value={title} onChange={handleTitle}></input></td>
              </tr>
              <tr>
                <th>Description :</th>
                <td><input type='text' value={description} onChange={handleDesc}></input></td>
              </tr>
              <tr>
                <th>Category :</th>
                <td>
                  <section>
                  <select onChange={handleDrop}>
                      {
                          cate.map((el) => {
                              return (
                                  <>
                                      <option selected={el._id === category} value={el._id}>{el.category}</option>
                                  </>
                              )
                          })
                      }
                  </select>
                  </section>
                </td>
              </tr>
              <tr>
                <th>Image :</th>
                <td>
                  <input type='file' name='image' onChange={((e) => setBlogImage(e.target.files[0]))}></input>
                </td>
              </tr>
              <tr>
                <td colSpan={3} className='text-center'>
                  <button onClick={handleSubmit}>Submit</button>
                </td>
              </tr>
            </thead>
          </table>
        </div> 
        <MDBContainer>
          <div className='d-flex mt-5 flex-wrap justify-content-center'>
            {
                data.map((el,index) =>{
                  return(
                    <>
                        <Card sx={{ maxWidth: 400 }} className='col-md-4 p-2'>
                          <CardMedia
                            sx={{ height: 240 }}
                            image={api + '/blog/' + el.blogImage}
                            title="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {el.title}
                            </Typography>
                            <span>{el.category.category}</span>
                            <Typography variant="body2" color="text.secondary">
                              {el.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small"  onClick={() => handleEdit(index, el._id)}>Edit</Button>
                            <Button size="small" onClick={() => handleDelete(index, el._id)}>Delete</Button>
                          </CardActions>
                        </Card>
                    </>
                  )
              })
            }
          </div> 
        </MDBContainer>
    </>
  )
}

export default BlogData
