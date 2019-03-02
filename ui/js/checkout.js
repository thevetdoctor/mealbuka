// ui/myOrders.js

const rows = document.querySelector('.rows');
const user = document.querySelector('#user');

const username = JSON.parse(localStorage.getItem('user')).name;
user.innerHTML = username;

// console.log(myOrders);
