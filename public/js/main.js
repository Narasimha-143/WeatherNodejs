const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById("cityName");
const temp = document.getElementById("t");
const temp_status = document.getElementById("temp_status");

const day = document.getElementById("day");
const today_date = document.getElementById("today_date");


const currentDate = new Date();


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


const currentDay = daysOfWeek[currentDate.getDay()];
const currentMonth = monthsOfYear[currentDate.getMonth()];
const currentDayOfMonth = currentDate.getDate();


day.textContent = currentDay;
today_date.textContent = `${currentDayOfMonth} ${currentMonth}`;





const getInfo = async (event) =>{
    event.preventDefault();
    let cityval = cityName.value;

    if(cityval === ""){
        document.getElementById("city_name").innerText = "Please write the name before you search";
    }
    else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=84c73cbda4e21931e51c29f630422e78`
            const response = await fetch(url);
            const data = await response.json();

            document.getElementById("city_name").innerHTML = `<b>${data.name}</b>,${data.sys.country}`;

            temp.innerText = (Number(data.main.temp)-Number(273.15)).toFixed(2);

            const temp_mood = data.weather[0].main;
            console.log(temp_mood);

            if(temp_mood =="Clear")
            {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:red;'></i>"
            }
            else if(temp_mood == "Clouds")
            {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#0097e6;'></i>"
            }
            else if(temp_mood == "Rain")
            {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>"
            }
            else{
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:red;'></i>"
            }
        }
        catch{
            document.getElementById("city_name").innerText = "Please enter the city name properly";
            temp.innerText = "NA";
        }
    }
  

}
submitBtn.addEventListener('click',getInfo);