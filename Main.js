let locationSearchِData;
let btnSearch = document.getElementById("btnSearch");
let InputSearch = document.getElementById("InputSearch");
let containerShowMore = document.querySelector(".containerShowMore");
let TitleOfMainCityName = document.querySelector(".TitleOfMainCityName");
let mainTemp = document.querySelector(".mainTemp");
let titleMainHumidity = document.querySelector(".titleMainHumidity");
let speedWindMainTitle = document.querySelector(".speedWindMainTitle");
let degreeWindMainTItle = document.querySelector(".degreeWindMainTItle");
let powerWindMainTitle = document.querySelector(".powerWindMainTitle");
let descriptionWeatherMain = document.querySelector(".descriptionWeatherMain");
let titleMainSeaLevel = document.querySelector(".titleMainSeaLevel");
let iconMain = document.querySelector(".iconMain");
let containerMoreData = document.querySelector(".containerMoreData");
let iconOpenModal = document.getElementById("iconOpenModal");
let dateMain = document.querySelector(".dateMain");
let array5DayData = [];
let isOpenModal = false;
const weeksDay = [
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];
window.addEventListener("load", () => {
  getLoactionByCityName("tehran", setElementsByData);
});

async function getLoactionByCityName(
  city = "تهران",
  setElementsByData = () => {}
) {
  let apiKey = "cf013256ab04ade09456a5a873be15e3";
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=fa&appid=${apiKey}&units=metric`
  );
  res = await res.json();
  locationSearchِData = await res;
  setElementsByData();
}

function setElementsByData() {
  if (locationSearchِData && locationSearchِData.cod == 200) {
    let dateJalali = getDateJalali(locationSearchِData.list[0].dt_txt);
    const date = new Date();
    const toDay = date.getDay();
    // const day = new Date(locationSearchِData.list[0].dt_txt);
    // let dayJalali = new Intl.DateTimeFormat("fa-IR", {
    //   dateStyle: "full",
    //   timeStyle: "long",
    // }).format(day);
    // let fianalDay = dayJalali.split(",")[1].split("، ساعت")[0];

    containerMoreData.innerHTML = "";
    array5DayData = [];
    TitleOfMainCityName.innerHTML = locationSearchِData.city.name;
    mainTemp.innerHTML = locationSearchِData.list[0].main.temp + ` C° `;
    titleMainHumidity.innerHTML =
      ` رطوبت ` + locationSearchِData.list[0].main.humidity;
    speedWindMainTitle.innerHTML = ` سرعت وزش باد ${locationSearchِData.list[0].wind.speed} m/s`;
    degreeWindMainTItle.innerHTML = ` زاویه وزش باد °${locationSearchِData.list[0].wind.deg} `;
    powerWindMainTitle.innerHTML = `  تغییرات احتمالی ${locationSearchِData.list[0].wind.gust} m/s `;
    titleMainSeaLevel.innerHTML = `فشار هوا ${locationSearchِData.list[0].main.sea_level} mBar `;
    descriptionWeatherMain.innerHTML = ` ${locationSearchِData.list[0].weather[0].description} `;
    iconMain.src = `https://openweathermap.org/img/wn/${locationSearchِData.list[0].weather[0].icon}@2x.png`;
    dateMain.innerHTML = dateJalali + " " + weeksDay[toDay];
    // -----------------
    for (let index = 1; index < 40; ) {
      index = index + 8;
      if (index <= 38) {
        array5DayData.push(locationSearchِData.list[index - 1]);
      }
    }
    array5DayData = array5DayData.reverse();
    array5DayData.map((item) => {
      let dateJalali = getDateJalali(item.dt_txt);
      const date = new Date(item.dt_txt);
      const weeksDayName = date.getDay();
      // const day = new Date(item.dt_txt);
      // let dayJalali = new Intl.DateTimeFormat("fa-IR", {
      //   dateStyle: "full",
      //   timeStyle: "long",
      // }).format(day);
      // let fianalDay = dayJalali.split(",")[1].split("، ساعت")[0];

      containerMoreData.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="col-12 border-1 border-white border-bottom mt-3">
      <div
        class="d-flex justify-content-evenly align-items-start flex-wrap"
      >
      <div
      class="d-flex text-center px-sm-4 px-2 justify-content-between align-items-center col-12"
    >
        <div><p class="fontMd mt-2">${dateJalali}</p></div>
        <div class="d-flex align-items-center justify-content-center">

          <div>
            <p class="fontMd">${item.main.temp} C° </p>
          </div>
          &nbsp;
          <div>
            <h1 class="fontMd">${weeksDay[weeksDayName]}</h1>
          </div>
        </div>
        </div>

        <div
          class="d-flex flex-wrap mt-2 align-items-center gap-3 justify-content-evenly col-12"
        >
          <div
            class="col-sm-5 col-12 d-flex align-items-center justify-content-center flex-column"
          >
            <p dir="rtl" class="fontSm w-100 text-end">
              <i class="bi bi-compass"></i>
              زاویه وزش باد °${item.wind.deg}</p>
          
             <p dir="rtl" class="fontSm text-end w-100">
             <i class="bi bi-droplet-half"></i>
             رطوبت  ${item.main.humidity}           </p>
          </div>
          <div
            class="col-sm-5 col-12 d-flex align-items-center justify-content-center flex-column"
          >
            <p dir="rtl" class="fontSm text-end w-100">
              <i class="bi bi-speedometer"></i>
              سرعت وزش باد ${item.wind.speed} m/s            </p>
              <p dir="rtl" class="fontSm w-100 text-end">
              <i class="bi bi-wind"></i>
             تغییرات احتمالی ${item.wind.gust} m/s</p>
              <p dir="rtl" class="fontSm text-end w-100">
              <i class="bi bi-cloudy-fill"></i>
              <span class="titleMainSeaLevel">  فشار هوا ${item.main.sea_level} mBar </span>
            </p>
          </div>
        </div>

        <div class="d-flex col-12 justify-content-end align-items-center">
          <div>
            <p class="mb-0 pb-0 text-center fontMd">
${item.weather[0].description}            
            </p>
          </div>
          <div>
            <img
              class="w-100"
              src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
            />
          </div>
        </div>
      </div>
    </div> 
        
        `
      );
    });
  } else {
    console.clear();
    alert("شهر یافت نشد");
    InputSearch.value = "";
  }
}
btnSearch.addEventListener("click", () => {
  if (InputSearch.value) {
    getLoactionByCityName(InputSearch.value.trim(), setElementsByData);
  }
});
InputSearch.addEventListener("keyup", (e) => {
  if (InputSearch.value && e.keyCode == 13) {
    getLoactionByCityName(InputSearch.value.trim(), setElementsByData);
  }
});
containerShowMore.addEventListener("click", () => {
  if (array5DayData) {
    if (!isOpenModal) {
      isOpenModal = !isOpenModal;
      containerMoreData.classList.add("openContainerMoreData");
      containerMoreData.classList.remove("closeContainerMoreData");
      iconOpenModal.className = "bi bi-caret-down-fill";
    } else {
      isOpenModal = !isOpenModal;
      containerMoreData.classList.add("closeContainerMoreData");
      containerMoreData.classList.remove("openContainerMoreData");
      iconOpenModal.className = "bi bi-caret-up-fill";
    }
  }
});
function getDateJalali(dateEur) {
  let date_text = dateEur;
  date_text = date_text.split(" ");
  date_text = date_text[0];
  let date = moment(date_text, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");
  return date;
}
