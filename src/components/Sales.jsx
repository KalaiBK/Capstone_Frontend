import React from 'react'
import NavBar from './NavBar'
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { chartSetting, dataset, valueFormatter } from './BarChartData';
import { years, Apparels, Footwares, Cosmetics } from './LineChartData';
import { data, size } from './PieChartData';
import { scatterData } from './ScatterChartData';

function Sales() {
    return (
        <div >
            {/* Displaying Navbar component*/}
            <NavBar name="sales" />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 col-sm-12 col-lg-6 mx-auto'>
                        {/* Displaying Bar Chart */}
                        <BarChart
                            dataset={dataset}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                            series={[
                                { dataKey: 'Apparels', label: 'Apparels', valueFormatter },
                                { dataKey: 'Footwares', label: 'Footwares', valueFormatter },
                                { dataKey: 'Cosmetics', label: 'Cosmetics', valueFormatter },
                            ]}
                            {...chartSetting}
                        />
                    </div>
                    <div className='col-md-12 col-sm-12 col-lg-6 mx-auto'>
                        {/* Displaying Line Chart */}
                        <LineChart
                            xAxis={[
                                {
                                    id: 'Years',
                                    data: years,
                                    scaleType: 'time',
                                    valueFormatter: (date) => date.getFullYear().toString(),
                                },
                            ]}
                            series={[
                                {
                                    id: 'France',
                                    label: 'Apparels',
                                    data: Apparels,
                                    stack: 'total',
                                    area: true,
                                    showMark: false,
                                },
                                {
                                    id: 'Germany',
                                    label: 'Footwares',
                                    data: Footwares,
                                    stack: 'total',
                                    area: true,
                                    showMark: false,
                                },
                                {
                                    id: 'United Kingdom',
                                    label: 'Cosmetics',
                                    data: Cosmetics,
                                    stack: 'total',
                                    area: true,
                                    showMark: false,
                                },
                            ]}
                            width={600}
                            height={400}
                            margin={{ left: 70 }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12 col-lg-6 mx-auto'>
                        <div className='h-100'>
                            {/* Displaying Pie Chart */}
                            <PieChart
                                series={[
                                    {
                                        arcLabel: (item) => `${item.label} (${item.value})`,
                                        arcLabelMinAngle: 45,
                                        data,
                                    },
                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: 'white',
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-md-12 col-sm-12 col-lg-6 mx-auto'>
                        {/* Displaying Scatter Chart */}
                        <ScatterChart
                            width={600}
                            height={300}
                            series={[
                                {
                                    label: 'Apparels',
                                    data: scatterData.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                                },
                                {
                                    label: 'Footwares',
                                    data: scatterData.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                                },
                                {
                                    label: 'Cosmetics',
                                    data: scatterData.map((v) => ({ x: v.x3, y: v.y3, id: v.id })),
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sales