import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const ChartHome = () => {
  const [covidData, setCovidData] = useState(null);
  const [dateRange, setDateRange] = useState(['2021-01-01', '2021-02-28']);

  const handleChange = (date, dateString) => {
    setDateRange(dateString);
  };

  //   console.log('State Start ' + dateRange[0]);
  //   console.log('State End ' + dateRange[1]);

  useEffect(() => {
    async function fetchAPI() {
      let response = await axios.get(
        `https://api.covid19tracking.narrativa.com/api/country/spain?date_from=${dateRange[0]}&date_to=${dateRange[1]}`
      );
      setCovidData(response.data);
    }
    fetchAPI();
  }, [dateRange]);

  let getDates = [];
  let getData = [];

  if (covidData) {
    for (const [key, value] of Object.entries(covidData.dates)) {
      //   console.log(`${key}: ${value}`);
      //   console.log(value.countries.Spain.today_new_confirmed);
      getDates.push(key);
      getData.push(value.countries.Spain.today_new_confirmed);
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
      <RangePicker format={dateFormat} onChange={handleChange} />
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
