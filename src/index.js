function updateTime() {
  let lisbonElement = document.querySelector(".city-info");
  if (lisbonElement) {
    let lisbonDateElement = lisbonElement.querySelector(".city-info .date");
    let lisbonTimeElement = lisbonElement.querySelector(".city-info .time");
    let lisbonTime = moment().tz("Europe/Lisbon");

    lisbonDateElement.innerHTML = lisbonTime.format("MMMM Do YYYY");
    lisbonTimeElement.innerHTML = `${lisbonTime.format(
      "h:mm:ss [<small>]A[</small>]"
    )}`;
  }
  let saoPauloElement = document.querySelector(".city");
  if (saoPauloElement) {
    let saoPauloDateElement = saoPauloElement.querySelector(".city .date");
    let saoPauloTimeElement = saoPauloElement.querySelector(".city .time");
    let saoPauloTime = moment().tz("America/Sao_Paulo");

    saoPauloDateElement.innerHTML = saoPauloTime.format("MMMM Do YYYY");
    saoPauloTimeElement.innerHTML = `${saoPauloTime.format(
      "h:mm:ss [<small>]A[</small>]"
    )}`;
  }
}

function updateCities(event) {
  let cityTimeZone = event.target.value;
  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityCurrentTime = moment().tz(cityTimeZone);
  let cityInfo = document.querySelector(".cities-container");
  cityInfo.innerHTML = `
  <div class="cities-container">
          <div class="city-info">
            <div>
              <h2 class="city-name">${cityName}</h2>
              <div class="date">${cityCurrentTime.format("MMMM Do YYYY")}</div>
            </div>
            <div class="time"${cityCurrentTime.format(
              "h:mm:ss [<small>]A[</small>]"
            )}></div>
          </div>
          `;
}

setInterval(updateTime, 1000);

let dropDownMenu = document.querySelector("#drop-down-menu");
dropDownMenu.addEventListener("change", updateCities);

let userCurrentTime = document.querySelector(".user-current-time");
let userTimeZone = moment.tz.guess();
userCurrentTime.innerHTML = moment.tz(userTimeZone).format("MMM Do, h:mm a");
