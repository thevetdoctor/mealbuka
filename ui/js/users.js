/* eslint-disable no-param-reassign */
// ui/users.js

const userList = document.querySelector('.user-list');
const thisUser = document.querySelector('#user');
// eslint-disable-next-line no-undef
const adminUrl = `${apiUrl}auth/users/admin`;

const username = JSON.parse(localStorage.getItem('user'));
thisUser.innerHTML = `${username.name}, `;

userList.innerHTML = '<div class="user-class"> <span>ID</span><span> Name </span><span> Email</span> <span> Admin Status</span>';

const listUsers = () => {
  const token = localStorage.getItem('token');

  fetch(`${adminUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
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
    });
};

listUsers();
