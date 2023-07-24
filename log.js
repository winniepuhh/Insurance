const signInBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');
const signInButt = document.getElementById('signin');
const signUpButt = document.getElementById('signup');
const formBox = document.querySelector('.form-box');
const body = document.body

signUpBtn.addEventListener('click', function (){
  formBox.classList.add('active');
  body.classList.add('active');
});

signInBtn.addEventListener('click', function (){
  formBox.classList.remove('active');
  body.classList.remove('active');
});

signUpButt.addEventListener('click', async function(){
  const firstName = document.getElementById('signup-name').value;
  const lastName = document.getElementById('signup-lastname').value;
  const email = document.getElementById('signup-email').value;
  const gender = document.getElementById('signup-gender').value;
  const birth = document.getElementById('signup-birth').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;

  await fetch('http://localhost:3001/signup', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        birth: birth,
        phone: phone,
        password: password
      }
    )
  })
  .then(function(response){
    if(response.status === 200){
      response
        .json()
        .then(data =>{
          localStorage.setItem('token', JSON.stringify(data.data));
          localStorage.setItem('user', email);
        });
      
      window.location.href = '/';
    }
    else{
      alert(response.statusText);
    }
    })
  .catch(err => {
    console.log(err);
  })
})

signInButt.addEventListener('click', async function(){
  const email = document.getElementById('signInEmail').value;
  const password = document.getElementById('signInPassword').value;

  await fetch('http://localhost:3001/signin', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email: email, password: password })
  })
  .then(function(response){
    if(response.status === 200){
      response
        .json()
        .then(data =>{
          localStorage.setItem('user', email);
          localStorage.setItem('token', JSON.stringify(data.data));
          
        });

      window.location.href = '/';
    }
    else{
      alert(response.statusText);
    }
    })
  .catch(err => {
    console.log(err);
  })
})

