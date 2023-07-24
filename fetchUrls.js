/*
Instructions:

1. Asynchronously fetch data from different URLs and store the data in the `dataArray`.
2. Filter the data based on the city name.
3. Display the data for the city of Lisbon by manipulating the DOM

*/
(async function fetchData(dataArray = []) {
    // Performs a fetch request with the passed URL and returns the data as text asynchronously
    const makeRequest = async function (url) {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    };
  
    const addLisbonDataToDocument = (data, dataArr = []) => {
      data = JSON.parse(data);
      if (data.name !== 'Lisbon') {
        data = null;
      }
      let arrayLengthDiv = document.createElement('div');
      arrayLengthDiv.innerHTML = `<div id="array-length-div">Data Items:${dataArr.length}</div>`;
      document.body.appendChild(arrayLengthDiv);
  
      let lisbonDiv = document.createElement('div');
      lisbonDiv.innerHTML = `<div id="lisbon-data-div">Weather:${JSON.stringify(data)}</div>`;
      document.body.appendChild(lisbonDiv);
    };
  
    const urlArray = [
      'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4ae5cd9cf6fa94e1d4538323136840a3',
      'https://api.openweathermap.org/data/2.5/weather?q=Houston&APPID=4ae5cd9cf6fa94e1d4538323136840a3',
      'https://api.openweathermap.org/data/2.5/weather?q=Lisbon&APPID=4ae5cd9cf6fa94e1d4538323136840a3',
      'https://api.openweathermap.org/data/2.5/weather?q=Budapest&APPID=4ae5cd9cf6fa94e1d4538323136840a3',
    ];
  
    urlArray.forEach(async (url) => {
      const result = await makeRequest(url);
      dataArray.push(result);
  
      if (dataArray.length == urlArray.length) {
        dataArray.forEach(itemInDataArray => {
          if (JSON.parse(itemInDataArray).name == "Lisbon") {
            addLisbonDataToDocument(itemInDataArray, dataArray);
          }
        });
      }
    });
  })();
  
  //don't change this code
  if (typeof module !== 'undefined') {
    module.exports = { fetchData };
  }