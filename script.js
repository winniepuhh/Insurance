


// Footer



const form = document.querySelector('footer form');
const messageField = form.querySelector('textarea[name="message"]');
const emailField = form.querySelector('input[name="email"]');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const message = messageField.value;
  const email = emailField.value;
  
  messageField.value = '';
  emailField.value = '';
  
  alert('Ваше повідомлення було успішно надіслано!');
}); 


// counter







window.addEventListener("load", windowLoad);

function windowLoad() {
  function digitsCountersInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
    if (digitsCounters) {
      digitsCounters.forEach(digitsCounter => {
        digitsCountersAnimate(digitsCounter);
      });
    }
  }

  function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 3000;
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  digitsCountersInit();
}



window.addEventListener("load", windowLoad);

function windowLoad() {
  function digitsCountersInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
    if (digitsCounters) {
      digitsCounters.forEach(digitsCounter => {
        digitsCountersAnimate(digitsCounter);
      });
    }
  }

  function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 3000;
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
 //digitsCountersInit();
  
  
  let options = {
    threshold: 0.3
  }
  
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targerElement = entry.target;
        const digitsCountersItems = targerElement.querySelectorAll("[data-digits-counter]");
        if (digitsCountersItems.length) {
          digitsCountersInit(digitsCountersItems);
        }
      }
    });
  }, options);
  
  let sections = document.querySelectorAll('.stat');
  if (sections.length) {
    sections.forEach(section => {
      observer.observe(section);
    });
  }
}







//Form

const forma = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const tourism = document.getElementById('tourism').value;
  const days = document.getElementById('days').value;
  const trips = document.getElementById('trips').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const destination = document.getElementById('destination').value;

});



function handleUserIcon(){
  const user = localStorage.getItem('user');
  if(user){
    const userIcon = document.getElementById('userIcon');
    userIcon.innerHTML=`<a class="nav-list-link" href="/" onClick="signout()">Вітаємо, ${user}</a>`
  }
}

function handleOrderButton(){
    const user = localStorage.getItem("user");
    if (!user) {
      const orderButton = document.getElementById("orderButton");
      orderButton.style.display = 'none';
    }
}

function signout(){
  localStorage.clear();
}


document.addEventListener("DOMContentLoaded", () => {handleUserIcon(); handleOrderButton()});


function callMeAvto(){
  const phone = document.getElementById("callMePhone").value;
  fetch('http://localhost:3001/callMe', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      phone: phone,
      reason: 'avto'
    })
  })
  .then(function(){
    alert('Вашу заявку прийнято!');
    location.href = '/';
  })
  .catch(err => {
    console.log(err);
  });
}

function callMeMaino(){
  const phone = document.getElementById("callMePhone").value;
  fetch('http://localhost:3001/callMe', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      phone: phone,
      reason: 'maino'
    })
  })
  .then(function(){
    alert('Вашу заявку прийнято!');
    location.href = '/';
  })
  .catch(err => {
    console.log(err);
  });
}

function callMeMedicine(){
  const phone = document.getElementById("callMePhone").value;
  fetch('http://localhost:3001/callMe', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      phone: phone,
      reason: 'medicine'
    })
  })
  .then(function(){
    alert('Вашу заявку прийнято!');
    location.href = '/';
  })
  .catch(err => {
    console.log(err);
  });
}





const isUserLog = smth
if (isUserLog){
  alert('You are logged in')
}