// ui/sales.js

const orders = document.querySelector('.orders');
// eslint-disable-next-line no-undef
const salesUrl = `${apiUrl}api/v1/orders`;

const user = document.querySelector('#user');

const username = JSON.parse(localStorage.getItem('user'));
user.innerHTML = `${username.name}, `;


// < !-- < div > Rice / Chicken < br > <span> Quantity : ${qauntity} Value : ${amount}</span></div >


// eslint-disable-next-line no-unused-vars
const listOrders = (url) => {
  const token = localStorage.getItem('token');

  fetch(salesUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())
    .then((response) => {
      console.log(response);
      orders.innerHTML = `<h2> ${response.rows} </h2>`;
    // eslint-disable-next-line no-unused-vars
    })
    .catch((error) => {
    // console.log(error);
      orders.innerHTML = '<h2> No orders listed </h2>';
    });
};

listOrders();
