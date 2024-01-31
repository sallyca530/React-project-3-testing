'use client'
import Image from "next/image";
import styles from './page.module.scss'
import axios from 'axios'
import {useState, useEffect} from 'react'

function Home()  {

  const [data, setData] = useState([{
    id: null,
    name: null,
    type: null,
    gender: null,
    state: null
  }]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/check_mongodb")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(data) 
  return (
    <div className={styles.Container}>
      <ul>
      {data.map(data => (
          <li key={data.id}>{data.name},{data.type},
          {data.gender},{data.state} </li>
      ))}
      </ul>
      
    </div>
    
  )
}
export default Home;
