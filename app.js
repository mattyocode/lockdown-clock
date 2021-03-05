function responsiveCarousel(){

  const carouselSlide = document.querySelector('.carousel-slide');
  const carouselContent = document.querySelectorAll('.full-bleed');

  // Buttons
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  // Counter
  let counter = 0;
  let width = carouselContent[0].clientWidth;

  window.addEventListener('resize', () => {
      width = carouselContent[counter].clientWidth;
      // carouselContent.forEach((item)=>{
      //     item.style.width = width;
      // })
      carouselSlide.style.transform = 'translateX(' + (-width * counter) + 'px)';
  });



  carouselSlide.style.transform = 'translateX(' + (-width * counter) + 'px)';

  // Button listeners

  function counterInRange(){
      return (counter <= 0 || counter >= carouselContent.length - 1);
  };

  function checkBtnDisplay(){
      if(counter <= 0){
          prevBtn.classList.add('hide');
          nextBtn.classList.remove('hide');
      } else if(counter >= carouselContent.length - 1){
          prevBtn.classList.remove('hide');
          nextBtn.classList.add('hide');
      } else {
          nextBtn.classList.remove('hide');
          prevBtn.classList.remove('hide');
      };
  };        


  nextBtn.addEventListener('click', () => {
      if(counter >= carouselContent.length - 1) return;
      carouselSlide.style.transition = 'transform 0.4s ease-in-out';
      counter++;
      carouselSlide.style.transform = 'translateX(' + (-width * counter) + 'px)';
  });

  prevBtn.addEventListener('click', () => {
      if(counter <= 0) return;
      carouselSlide.style.transition = 'transform 0.4s ease-in-out';
      counter--;
      carouselSlide.style.transform = 'translateX(' + (-width * counter) + 'px)';
  });

  window.addEventListener('DOMContentLoaded', () => {
      checkBtnDisplay();
  });

  carouselSlide.addEventListener('transitionend', () => {
      checkBtnDisplay();
  });
};

responsiveCarousel();

function setCountdown(countdownId, futureDate){
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const countdownSection = document.getElementById(`${countdownId}`)

  const deadline = countdownSection.querySelector(".deadline");
  const giveaway = countdownSection.querySelector(".giveaway");
  const items = countdownSection.querySelectorAll(".deadline-format h4");

  const year = futureDate.getFullYear();
  const hours = futureDate.getHours();
  const mins = futureDate.getMinutes();

  const month = months[futureDate.getMonth()];
  const date = futureDate.getDate();

  let weekday = futureDate.getDay();
  weekday = weekdays[weekday];

  giveaway.textContent = `${weekday} ${date} ${month} ${year}`

  // future time in ms
  const futureTime = futureDate.getTime();


  function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;

    // calculate milliseconds per day, hour, min 
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMin = 60*1000;
    
    // calculate days
    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMin);
    let seconds = Math.floor((t % oneMin) / 1000);

    // set values array
    const values = [days,hours,minutes,seconds]

    function format(item){
      if(item < 10){
        return item = `0${item}`;
      }
      return item;
    };

    items.forEach(function(item,index){
      item.innerHTML = format(values[index]);
    })
    if(t<0){
      clearInterval(countdown);
      deadline.innerHTML = `<h4 class="expired">Milestone passed!</h4>`
    }
  };

  // countdown
  let countdown = setInterval(getRemainingTime, 1000);
  getRemainingTime();
};

function setTempInfo(countdownId, futureDate){

  window.addEventListener('load', () => {

    const averageUKTemps = 
      [7.5,
      7.7,
      10.5,
      13.2,
      16.7,
      19.6,
      22,
      21.8,
      18.9,
      14.8,
      10.7,
      7.9]; 

    const countdownSection = document.getElementById(`${countdownId}`);

    let long;
    let lat;
    let temperatureDescription = countdownSection.querySelector(".temp-info");
    // let temperatureDegree = countdownSection.querySelector(".temp-degree");

    let temp = averageUKTemps[futureDate.getMonth()];
            
    // set DOM elements 
    temperatureDescription.textContent = `Avg. high temp: ${temp} ºC`;

    }
  );
};

function setSunsetInfo(countdownId, futureDate){

  window.addEventListener('load', () => {

    const countdownSection = document.getElementById(`${countdownId}`);
    let sunsetInfo = countdownSection.querySelector('.sunset-info');

    let long;
    let lat;
    let month = (futureDate.getMonth() + 1);
    let date = futureDate.getDate();

    let monthString = month < 10 ? `0${month}` : `${month}`;
    let dayString = date < 10 ? `0${date}` : `${date}`;

    let dateString = futureDate.getFullYear() + '-' + monthString + '-' + dayString;
    
    const geoOptions = {timeout: 4000};

    function geoError(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      let api = `https://api.sunrise-sunset.org/json?lat=52.3963&lng=-0.7302&date=${dateString}`;

      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        sunsetInfo.innerHTML = `<a href="https://sunrise-sunset.org/">Sunset at ${data.results.sunset.slice(0,4)} PM (avg.)</a>`;

      });
    };

    if(navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {

        long = position.coords.longitude;
        lat = position.coords.latitude;

        let api = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${dateString}`;

        fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          sunsetInfo.innerHTML = `<a href="https://sunrise-sunset.org/">Sunset at ${data.results.sunset.slice(0,4)} PM <br><span class="small-copy">(based on your location)</span></a>`;

        })

      }, geoError, geoOptions);

  };

});

};

// set first clock
let stepOneDate = new Date(2021,2,8,0,0,1);
setCountdown("step-one", stepOneDate);
setTempInfo("step-one", stepOneDate);
setSunsetInfo("step-one", stepOneDate);

// set second clock
let stepTwoDate = new Date(2021,2,29,0,0,1);
setCountdown("step-two", stepTwoDate);
setTempInfo("step-two", stepTwoDate);
setSunsetInfo("step-two", stepTwoDate);

// set third clock
let stepThreeDate = new Date(2021,3,12,0,0,1);
setCountdown("step-three", stepThreeDate);
setTempInfo("step-three", stepThreeDate);
setSunsetInfo("step-three", stepThreeDate);

// set fourth clock
let stepFourDate = new Date(2021,4,17,0,0,1);
setCountdown("step-four", stepFourDate);
setTempInfo("step-four", stepFourDate);
setSunsetInfo("step-four", stepFourDate);

// set final clock
let finalDate = new Date(2021,5,21,0,0,1);
setCountdown("final-step", finalDate);
setTempInfo("final-step", finalDate);
setSunsetInfo("final-step", finalDate);