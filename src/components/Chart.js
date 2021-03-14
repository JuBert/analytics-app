import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const ChartHome = () => {
  const [covidData, setCovidData] = useState(null);

  useEffect(() => {
    async function fetchAPI() {
      let response = await axios.get(
        'https://api.covid19tracking.narrativa.com/api/country/spain?date_from=2020-03-20&date_to=2020-03-22'
      );
      setCovidData(response.data);
    }
    fetchAPI();
  }, []);

  let getDates = [];
  let getData = [];

  for (const [key, value] of Object.entries(covidData.dates)) {
    console.log(`${key}: ${value}`);
    getDates.push(key);
  }

  console.log(covidData.dates);

  const data = {
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: getDates,
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  };
  return (
    <Chart
      options={data.options}
      series={data.series}
      type="bar"
      width={500}
      height={320}
    />
  );
};

export default ChartHome;
