document.addEventListener("DOMContentLoaded", () => {
  const inputbox = document.querySelector(".input_box");
  const weatherbtn = document.querySelector(".getweatherbtn");
  const weatherdisplay = document.querySelector(".weatherinfo");
  const citydisplay = document.querySelector(".city_display");
  const tempdisplay = document.querySelector(".temp_display");
  const descdisplay = document.querySelector(".desc_display");
  const errordisplay = document.querySelector(".error_display");
  const API_key = "9d4267c317cb0dcd0c95e9ddccedaed8";

  weatherbtn.addEventListener("click", async () => {
    const cityname = inputbox.value.trim();
    if (!cityname) return;
    try {
      const weather_data = await fetchwheather(cityname);
      displaywheather(weather_data);
    } catch (error) {
      errordis();
    }
  });
  async function fetchwheather(cityname) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${API_key}`;
    const response = await fetch(url);
    console.log(response);
    console.log(typeof response); //here response.ok is due to the reason tht ok is present in every api that if there is ok in the response that means api is responded
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    const data = await response.json();
    return data;
  }
  function displaywheather(data) {
    console.log(data);
    const { name, main, weather } = data;
    citydisplay.textContent = name;
    tempdisplay.textContent = `Temperature: ${main.temp}`;
    descdisplay.textContent = `Weather: ${weather[0].description}`;

    weatherdisplay.classList.remove("hidden");
    errordisplay.classList.add("hidden");
  }
  function errordis() {
    errordisplay.classList.remove("hidden");
    weatherdisplay.classList.add("hidden");
  }
});
