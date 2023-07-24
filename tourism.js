const sendForm = document.getElementById('sendForm');

function handleTourismOrderButton(){
  const user = localStorage.getItem('user');

  if(!user){
    location.href = '/login.html';
  }
  else{
    location.href = '/form.html'
  }
}

function sendTourismForm(){
  const tourism = document.getElementById('tourism').value;
  const days = document.getElementById('days').value;
  const trips = document.getElementById('trips').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const destination = document.getElementById('destination').value;
  const userEmail = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  fetch('http://localhost:3001/tourism', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      tourism: tourism,
      amountOfDays: days,
      amountOfTrips: trips,
      startDay: startDate,
      endDay: endDate,
      goal: destination,
      userEmail: userEmail,
      token: token
    })
  })
  .then(function(){
    alert('Вашу заявку прийнято!');
    location.href = '/';
  })
  .catch(err => {
    console.log(err);
  })
}

sendForm.addEventListener('click', sendTourismForm);





  // Використовуйте ці змінні для відправлення даних на сервер, наприклад, за допомогою fetch або XMLHttpRequest

/*   // Нижче наведено приклад використання fetch API для відправки даних на сервер
  fetch('url/for/form/handler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tourism: tourism,
      days: days,
      trips: trips,
      startDate: startDate,
      endDate: endDate,
      destination: destination
    })
  })
  .then(response => {
    if (response.ok) {
      // Виконати дії, якщо відповідь від сервера успішна
    } else {
      throw new Error('Помилка при відправленні даних форми');
    }
  })
  .catch(error => {
      console.error(error);
  });
}); */


// Footer









