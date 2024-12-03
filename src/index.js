function updateTime() {
  let lisbonElement = document.querySelector("#lisbon");
  let lisbonDateElement = lisbonElement.querySelector(".date");
  let lisbonTimeElement = lisbonElement.querySelector(".time");
  let lisbonTime = moment().tz("Europe/Lisbon");

  lisbonDateElement.innerHTML = lisbonTime.format("MMMM Do YYYY");
  lisbonTimeElement.innerHTML = `${lisbonTime.format(
    "h:mm:ss [<small>]A[</small>]"
  )}`;

  let saoPauloElement = document.querySelector("#sao-paulo");
  let saoPauloDateElement = saoPauloElement.querySelector(".date");
  let saoPauloTimeElement = saoPauloElement.querySelector(".time");
  let saoPauloTime = moment().tz("America/Sao_Paulo");

  saoPauloDateElement.innerHTML = saoPauloTime.format("MMMM Do YYYY");
  saoPauloTimeElement.innerHTML = `${saoPauloTime.format(
    "h:mm:ss [<small>]A[</small>]"
  )}`;
}

setInterval(updateTime, 1000);
