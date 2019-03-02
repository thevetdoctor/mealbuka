// login.js

const login = document.querySelector('#login');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const greeting = document.querySelector('#greeting');
const loginUrl = `${apiUrl}auth/users/login`;

// const display = document.querySelector('.display');
// const form = document.querySelector('form');


const logIn = (e, _url, user) => {
  e.preventDefault();

  greeting.style.color = 'red';

  if (loginEmail === '' && loginPassword === '') {
    greeting.innerHTML = 'Please enter your details';
    return;
  }
  // eslint-disable-next-line no-param-reassign
  user = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  fetch(loginUrl, {
    method: 'POST',
    // mode: 'no-cors',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      // console.log(response);
      greeting.innerHTML = response.message;
      window.localStorage.setItem('user', JSON.stringify(user));
      window.localStorage.setItem('token', response.token);
      if (response.message === 'Login successful' && user.isAdmin === true) {
        window.location.href = './meals.html';
      } else if (response.message === 'Login successful') {
        window.location.href = './user.html';
      }
    })
    .catch((error) => {
      // console.log(error);
      if (error) {
        greeting.innerHTML = `${error}`;
      }
    });
};

login.addEventListener('click', logIn);
