import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import NavBar from './NavBar';
import '../CSS/Dashboard.css'

function Dashboard() {
    const [isFetching, setIsFetching] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartX, setBarChartX] = useState([]);
    const [barChartSeries, setBarChartSeries] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Handling click on the list
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        setPieChartData(data[index].pieChartData)
        setBarChartX(data[index].barChartXAxis)
        setBarChartSeries(data[index].barChartSeries)
    };
    useEffect(() => {
        if (isFetching) {
            // Fetching Customer Details from API
            fetch('https://capstone-backend-lcsf.onrender.com/customer/get', {
                method: "GET",
            })
                .then(response => response.json())
                .then(data => {
                    // Assiging the retrieved data to a state variable
                    setData(data);
                    // Set selected index for list
                    setSelectedIndex(0);
                    if (data && data.length > 0) {
                        setPieChartData(data[0].pieChartData)
                        setBarChartX(data[0].barChartXAxis)
                        setBarChartSeries(data[0].barChartSeries)
                    }
                })
                .catch(error => {
                    // Consoling the error received on fetch
                    setError(error);
                });
        }
        setIsFetching(false);
    }, [isFetching, pieChartData, barChartX, barChartSeries]);
    return (
        <div>
            {/* Displaying Navbar component*/}
            <NavBar name="dashboard" />
            <div className='container-fluid vh-100'>
                <div className='row h-100'>
                    <div className='col-3'>
                        <h5 className='p-2'>Customers List</h5>
                        {/* Creating List based on response from API */}
                        {data && data.length > 0 ? <List
                            sx={{
                                width: '100%',
                                maxWidth: 360,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: '90vh',
                                '& ul': { padding: 0 },
                            }}
                        >
                            {data.map((customer, index) => (
                                <ListItem button key={customer._id} selected={selectedIndex === index}
                                    onClick={() => handleListItemClick(index)}
                                    className={selectedIndex === index ? 'list-background' : 'list'}>
                                    <ListItemText primary={customer.name} />
                                </ListItem>
                            ))}
                        </List> : <h6>No Customer data</h6>}

                    </div>
                    <div className='col-9 align-items-center vertical-line'>
                        <div className='h-50 pb-5'>
                            {/* Creating Pie Chart */}
                            <PieChart
                                series={[
                                    {
                                        data: pieChartData,
                                    },
                                ]}
                            />
                        </div>
                        <div className='h-50'>
                            {/* Creating Bar Chart */}
                            <BarChart
                                xAxis={barChartX}
                                series={barChartSeries}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard