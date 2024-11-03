async function fetchData() {
  const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo');
  const data = await response.json();
  const timeSeries = data['Time Series (Daily)'];
  const dates = Object.keys(timeSeries).slice(0, 30).reverse();
  const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

  renderChart(dates, prices);
}

function renderChart(dates, prices) {
  var options = {
    chart: { type: 'line' },
    series: [{ name: 'IBM Closing Price', data: prices }],
    xaxis: { categories: dates }
  };
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

fetchData();
