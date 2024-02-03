'use client'
import Image from "next/image";
import styles from './page.module.scss'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { allowedNodeEnvironmentFlags } from "process";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLabel } from 'victory';
function Home()  {
  const [data, setData] = useState([{
    id: null,
    name: null,
    type: null,
    gender: null,
    state: null
  }]);

  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  // Function to handle column change
  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
    setSelectedValue(''); // Reset selected value when column changes
  };

  // Function to handle value selection
  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Filter data based on selected column and value
  const filteredData = data.filter(item => (
    selectedValue === '' || item[selectedColumn] === selectedValue
  ));

  //constraint for pie chart
  const groupedData = data.reduce((result, item) => {
    const groupKey = item[selectedColumn];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});

  // Prepare data for pie chart
  const pieChartData = Object.keys(groupedData).map(groupKey => ({
    x: groupKey || 'Unknown',
    y: groupedData[groupKey].length,
  }));
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
  
  const preferences = {
    age: null,
    size: null,
    type: null,
    gender: null,
    state: null
  };


  return (
    <div> <h1 className={styles.myHeading}>PETS AVAILABLE FOR ADOPTION</h1>
      <div className={styles.mySelector}>
        <label>Select Your Future Pet! :</label>
        <select value={selectedColumn} onChange={handleColumnChange}>
          <option value="">-- Select Pet Preference --</option>
          {Object.keys(preferences).map(column => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
      </div>
      {selectedColumn && (
        <div className={styles.mySelector}>
          <label>Select Value:</label>
          <select value={selectedValue} onChange={handleValueChange}>
            <option value="">-- Select Value --</option>
            {[...new Set(data.map(item => item[selectedColumn]))].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      )}
      <div className={styles.mySelector}>
        <ul>
          {filteredData.map(dataItem => (
            <li key={dataItem.id}>
              {dataItem.name}, {dataItem.type}, {dataItem.gender}, {dataItem.state}
            </li>
          ))}
        </ul>
        {/* <h2>Pie Chart</h2> */}
        <div className={styles.PieChart}>
          <h2 className={styles.myHeading2}>Pet Pie Chart</h2>
            <VictoryPie
              data={pieChartData}
              colorScale="qualitative"
              labelComponent={<VictoryLabel angle={0}/>}
              height={500}
              width={800}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              style={{
                data: {
                  fillOpacity: 0.9, stroke: "black", strokeWidth: 1
              },
                labels: {
                fontSize: 10, fill: "black"
              }
            }}
            theme={VictoryTheme.material}
            VictoryPie/>
          </div>
      </div>
      </div>

  );
};


export default Home;
