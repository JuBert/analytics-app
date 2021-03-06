import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
//Components
import DateSelector from './RangePicker';
import RadioButtons from './RadioButtons';

const ChartHome = () => {
  const [covidData, setCovidData] = useState(null);
  const [dateRange, setDateRange] = useState(['2021-01-01', '2021-02-28']);
  const [dataSeries, setDataSeries] = useState('confirmed');

  let getDates = [];
  let getData = [];

  useEffect(() => {
    async function fetchAPI() {
      let response = await axios.get(
        `https://api.covid19tracking.narrativa.com/api/country/spain?date_from=${dateRange[0]}&date_to=${dateRange[1]}`
      );
      setCovidData(response.data);
    }
    fetchAPI();
  }, [dateRange]);

  if (covidData && dataSeries === 'confirmed') {
    for (const [key, value] of Object.entries(covidData.dates)) {
      getDates.push(key);
      getData.push(value.countries.Spain.today_new_confirmed);
    }
  } else if (covidData && dataSeries === 'deaths') {
    for (const [key, value] of Object.entries(covidData.dates)) {
      getDates.push(key);
      getData.push(value.countries.Spain.today_new_deaths);
    }
  } else if (covidData && dataSeries === 'recovered') {
    for (const [key, value] of Object.entries(covidData.dates)) {
      getDates.push(key);
      getData.push(value.countries.Spain.today_new_recovered);
    }
  }

  const handleDateChange = (date, dateString) => {
    setDateRange(dateString);
  };

  const handleDataSeriesChange = (e) => {
    setDataSeries(e.target.value);
  };

  const data = {
    options: {
      chart: {
        id: 'apexchart-covidData',
      },
      xaxis: {
        categories: getDates,
      },
      dataLabels: {
        enabled: false,
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
      <div className="chart-title">
        <h1>Covid Tracker</h1>
      </div>
      <DateSelector onChange={handleDateChange} />
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width={500}
        height={320}
      />
      <RadioButtons value={dataSeries} onChange={handleDataSeriesChange} />
    </>
  );
};

export default ChartHome;
