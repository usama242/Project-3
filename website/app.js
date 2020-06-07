// Base URL and API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const units = "&units=metric";
const apiKey = "&appid=b6232ab2c87965900584ea9de4086de9";

//Get the date
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener
document.getElementById("generate").addEventListener("click", (e) => {
  e.preventDefault();
  const newZip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  getWeather(baseURL, newZip, units, apiKey)
    .then((userData) => {
      postData("/add", { date: newDate, temp: userData.main.temp, content });
    })
    .then(function (newData) {
      updateUI();
    });
});

/* Web API function*/
const getWeather = async (baseURL, newZip, units, apiKey) => {
  const res = await fetch(baseURL + newZip + units + apiKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
