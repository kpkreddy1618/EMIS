import React from 'react';
import {useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import { yellow } from '@mui/material/colors';
const url='http://localhost:1337/api';
const AllVideos = () => {
  const {id,type}=useParams();
    const [videos,setVideos]=useState([]);
    useEffect(()=>{
      async function getVid(){
      try{
     let response= await axios.get(`${url}/uploadedVideos/${type}/${id}`);
     setVideos(response.data);
     console.log(response);
      }
      catch(error){
        console.log("error while getting all videos",error.message);
      }
    }
    getVid();
    },[]);
    return (<>
    <Dashboard/>
    <div>

      <b>All videos</b><br></br>
      </div>
      <br></br>
    <div style={{display:'grid'
    ,gridTemplateColumns:'repeat(3,1fr)',
    gridTemplateRows:'1fr 1fr 1fr',
    height:'400px',
    gridGap:'10px',}}>
    {videos.map((vid)=>{
    return (<div style={{
        border: '1px solid black',
        boxShadow:'0 0 5px black',
        borderRadius:'5px',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'orange',
        alignItems:'center',
        justifyContent:'center'}}>
       <Link to={`http://localhost:3000/displayvideo/${type}/${vid._id}`} > <img width="100%" height="200px" src={`http://localhost:1337/${vid.imageUrl}`}/></Link>
        <div>{vid.title}</div>
        <div>{vid.description}</div>
        
    </div>);})} 
    </div></>)
}
export default AllVideos;