/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
// ui/users.js

const userList = document.querySelector('.user-list');
const thisUser = document.querySelector('#user');
const mailBtn = document.querySelector('#send-mail');
const display = document.querySelector('.display');
// eslint-disable-next-line no-undef
const url = `${apiUrl}`;

const username = JSON.parse(localStorage.getItem('user'));
thisUser.innerHTML = `${username.name}, `;

userList.innerHTML = '<div class="user-class"> <span>ID</span><span> Name </span><span> Email</span> <span> Admin Status</span>';

const listUsers = () => {
  const token = localStorage.getItem('token');

  fetch(`${url}auth/users/admin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response === undefined) {
        return;
      }
      const users = response.list;
      let count = 0;
      users.forEach((user) => {
        count += 1;
        // eslint-disable-next-line no-unused-expressions
        user.isAdmin ? user.isAdmin = 'User is Admin' : user.isAdmin = 'User is NOT Admin';
        userList.innerHTML += `<div class="user-class"><span> ${count} </span> <span>${user.name} </span><span> ${user.email} </span><span> ${user.isAdmin}</span>`;
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      userList.innerHTML = 'Not authorised';
    });
};

listUsers();


const sendMail = () => {
  const token = localStorage.getItem('token');

  fetch(`${url}sendMail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'applications/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      console.log(response);
      dispatchEvent.innerHTML = `${response.data.message}`;
    })
    .catch((error) => {
      console.log(error);
      display.innerHTML = `Error : ${error}`;
    });
};


mailBtn.addEventListener('click', sendMail);
