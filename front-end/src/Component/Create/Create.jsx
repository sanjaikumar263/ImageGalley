import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import emptyImage from '../../assets/empty.jpg'

import "./Create.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navegate = useNavigate()
    const [img , setImg] = useState(false)

    const handlfileChange = (e)=>{
        const chgefile = e.target.files[0];
        setImg(chgefile)
    }
    const handlupload = ()=>{
      const formData = new FormData()
      formData.append('image',img)
      axios.post("http://localhost:4000/upload",formData)
      .then(res => (res.data))
      .catch(err => console.log(err))
      navegate("/view")
    }
  return (
    <div className='create-img' >
      <form action="" className='form' onSubmit={handlupload}>
        <label htmlFor="create" className='label' ><IoMdAdd />
        Create</label>
        <input type="file" id='create' onChange={handlfileChange}  hidden />
        <img src={img?URL.createObjectURL(img):emptyImage}   name="images" className='img' alt="" />
        <button className='uplbtn' type='submit'>Upload</button>
      </form>
    </div>
  )
}

export default Create
