import React from 'react'
import { axisClasses } from '@mui/x-charts/ChartsAxis';

// Bar chart data
export const chartSetting = {
    yAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };
  export const dataset = [
    {
      Apparels: 59,
      Footwares: 57,
      Cosmetics: 86,
      month: 'Jan',
    },
    {
      Apparels: 50,
      Footwares: 52,
      Cosmetics: 78,
      month: 'Fev',
    },
    {
      Apparels: 47,
      Footwares: 53,
      Cosmetics: 106,
      month: 'Mar',
    },
    {
      Apparels: 54,
      Footwares: 56,
      Cosmetics: 92,
      month: 'Apr',
    },
    {
      Apparels: 57,
      Footwares: 69,
      Cosmetics: 92,
      month: 'May',
    },
    {
      Apparels: 60,
      Footwares: 63,
      Cosmetics: 103,
      month: 'June',
    },
    {
      Apparels: 59,
      Footwares: 60,
      Cosmetics: 105,
      month: 'July',
    },
    {
      Apparels: 65,
      Footwares: 60,
      Cosmetics: 106,
      month: 'Aug',
    },
    {
      Apparels: 51,
      Footwares: 51,
      Cosmetics: 95,
      month: 'Sept',
    },
    {
      Apparels: 60,
      Footwares: 65,
      Cosmetics: 97,
      month: 'Oct',
    },
    {
      Apparels: 67,
      Footwares: 64,
      Cosmetics: 76,
      month: 'Nov',
    },
    {
      Apparels: 61,
      Footwares: 70,
      Cosmetics: 103,
      month: 'Dec',
    },
  ];
  
  export const valueFormatter = (value) => `${value}mm`;