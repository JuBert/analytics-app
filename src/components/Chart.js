import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

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

  //   console.log(covidData);

  let getDates = [];
  let getData = [];

  if (covidData) {
    for (const [key, value] of Object.entries(covidData.dates)) {
      //   console.log(`${key}: ${value}`);
      //   console.log(value.countries.Spain.today_new_recovered);
      getDates.push(key);
      getData.push(value.countries.Spain.today_new_recovered);
    }
  }

  const data = {
    options: {
      chart: {
        id: 'apexchart-covidData',
      },
      xaxis: {
        categories: getDates,
      },
    },
    series: [
      {
        name: 'series-1',
        data: getData,
      },
    ],
  };
  return (
    <>
      <DatePicker />
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width={500}
        height={320}
      />
    </>
  );
};

export default ChartHome;
