function populateCityDropdown() {
  const dropDownMenu = document.querySelector("#drop-down-menu");
  const momentTimezones = moment.tz.names();

  const uniqueCities = new Set();

  const sortedTimezones = momentTimezones
    .filter((tz) => tz.includes("/") && !tz.startsWith("Etc/"))
    .filter((tz) => {
      const parts = tz.split("/");

      if (parts.length > 1) {
        const cityKey = parts[0] + "/" + parts[1];
        if (!uniqueCities.has(cityKey)) {
          uniqueCities.add(cityKey);
          return true;
        }
      }
      return false;
    })
    .sort((a, b) => a.split("/")[1].localeCompare(b.split("/")[1]));

  sortedTimezones.forEach((timezone) => {
    const cityName = timezone.split("/")[1].replace(/_/g, " ");
    const option = document.createElement("option");
    option.value = timezone;
    option.textContent = cityName;
    dropDownMenu.appendChild(option);
  });
}

function updateCities(event) {
  let cityTimeZone = event.target.value;
  if (cityTimeZone) {
    let cityName = cityTimeZone.replace("_", " ").split("/")[1];
    let cityCurrentTime = moment().tz(cityTimeZone);
    let citiesContainer = document.querySelector(".cities-container");

    citiesContainer.innerHTML = "";

    const cityDiv = document.createElement("div");
    cityDiv.classList.add("city-info");
    cityDiv.innerHTML = `
            <div>
                <h2 class="city-name">${cityName}</h2>
                <div class="date">${cityCurrentTime.format(
                  "MMMM Do YYYY"
                )}</div>
            </div>
            <div class="time">${cityCurrentTime.format(
              "h:mm:ss [<small>]A[</small>]"
            )}</div>
        `;
    citiesContainer.appendChild(cityDiv);

    addUserLocation();
  }
}

function addUserLocation() {
  const citiesContainer = document.querySelector(".cities-container");

  let userLocationDiv = document.querySelector(".user-location");

  if (!userLocationDiv) {
    userLocationDiv = document.createElement("div");
    userLocationDiv.classList.add("city", "user-location");
    citiesContainer.appendChild(userLocationDiv);
  }

  const userTimeZone = moment.tz.guess();
  const userTime = moment.tz(userTimeZone);
  let currentCity = userTimeZone.replace("_", " ").split("/")[1];
  userLocationDiv.innerHTML = `
        <div>
            <h2 class="city-name">${currentCity}</h2>
            <div class="date">${userTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${userTime.format(
          "h:mm:ss [<small>]A[</small>]"
        )}</div>
    `;
}

function updateAllTimezones() {
  const userLocationDiv = document.querySelector(".user-location .time");
  if (userLocationDiv) {
    const userTimeZone = moment.tz.guess();
    const userTime = moment.tz(userTimeZone);
    userLocationDiv.innerHTML = userTime.format("h:mm:ss [<small>]A[</small>]");
  }

  const selectedCityDiv = document.querySelector(".city-info .time");
  if (selectedCityDiv) {
    const dropDownMenu = document.querySelector("#drop-down-menu");
    const selectedTimeZone = dropDownMenu.value;

    if (selectedTimeZone) {
      const selectedTime = moment().tz(selectedTimeZone);
      selectedCityDiv.innerHTML = selectedTime.format(
        "h:mm:ss [<small>]A[</small>]"
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateCityDropdown();
  addUserLocation();
  setInterval(updateAllTimezones, 1000);
});

let dropDownMenu = document.querySelector("#drop-down-menu");
dropDownMenu.addEventListener("change", updateCities);
