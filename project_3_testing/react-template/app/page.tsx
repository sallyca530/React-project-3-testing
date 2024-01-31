'use client'
import Image from "next/image";
import styles from './page.module.scss'
import axios from 'axios'
import {useState, useEffect} from 'react'
// import React, { useEffect, useState } from "react";


// const API = axios.create({ baseURL: 'http://127.0.0.1:5000'})
// export const fetchData = () => API.get(`/check_mongodb`);
// export default API;



function Home()  {
  // const API = axios.create({baseURL: "http://127.0.0.1:5000/check_mongodb"})
  // const url = 'http://127.0.0.1:5000/check_mongodb';
  const [data, setData] = useState([{
    id: null,
    name: null,
    type: null
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
  // useEffect(() => { axios.get(url)
  //   .then(response => console.log(response.data));
  console.log(data) 
  return (
    <div className={styles.Container}>
      Hello World
      <ul>
      {data.map(data => (
          <li key={data.id}>{data.name},{data.type} </li>
      ))}
      </ul>
      
    </div>
    
  )
}
export default Home;
// // src/components/DataComponent.js
// import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// const DataComponent = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/check_mongodb');
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Data from Flask API:</h1>
//       {data && <p>{data.message}</p>}
//     </div>
//   );
// };

// export default DataComponent;