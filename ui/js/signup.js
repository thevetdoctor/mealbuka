// ui/app.js

const signup = document.querySelector('#signup');
const greeting = document.querySelector('#greeting');
const signupName = document.querySelector('#signupName');
const signupEmail = document.querySelector('#signupEmail');
const signupPassword = document.querySelector('#signupPassword');
const confirmPassword = document.querySelector('#confirm-password');
// eslint-disable-next-line no-undef
const signupUrl = `${apiUrl}auth/users/signup`;


const signUp = (e, _url, user) => {
  e.preventDefault();

  greeting.style.color = 'red';

  if (signupPassword.value !== confirmPassword.value) {
    greeting.innerHTML = 'Please confirm your password';
    return;
  }
  // eslint-disable-next-line no-param-reassign
  user = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  fetch(signupUrl, {
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
      window.localStorage.setItem('user', JSON.stringify(response.newUser));
      window.localStorage.setItem('token', response.token);
      if (response.message === 'New User created' && user.isAdmin === true) {
        window.location.href = './meals.html';
      } else if (response.message === 'New User created') {
        window.location.href = './user.html';
      }
    })
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      greeting.innerHTML = 'Signup Failed';
    });
};

signup.addEventListener('click', signUp);
