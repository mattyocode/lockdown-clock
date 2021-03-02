function typingEffect(){
  const texts = ['Fewer Zoom Meetings', 'End of Lockdown', 'The Actual Pub', 'Seeing Your Pals', 'Seeing Your Fam', 'Proper Holidays'];
  let count = 0;
  let charIndex = 0;
  let currentText = '';
  let letter = '';

  (function type(){

    if(count === texts.length){
      count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++charIndex);

    document.querySelector('.typing').textContent = letter;
    if(letter.length === currentText.length){
      count++;
      charIndex = 0;
    }

    let interval = Math.floor(Math.random() * 200) + 100

    setTimeout(type, interval);

  }());

}


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
      deadline.innerHTML = `<h4 class="expired">milestone passed!</h4>`
    }
  };

  // countdown
  let countdown = setInterval(getRemainingTime, 1000);
  getRemainingTime();
};

typingEffect();

// set first clock
let stepOneDate = new Date(2021,2,8,0,0,1);
setCountdown("step-one", stepOneDate);

// set second clock
let stepTwoDate = new Date(2021,2,29,0,0,1);
setCountdown("step-two", stepTwoDate);

// set third clock
let stepThreeDate = new Date(2021,3,12,0,0,1);
setCountdown("step-three", stepThreeDate);

// set fourth clock
let stepFourDate = new Date(2021,4,17,0,0,1);
setCountdown("step-four", stepFourDate);

// set final clock
let finalDate = new Date(2021,5,21,0,0,1);
setCountdown("final-step", finalDate);