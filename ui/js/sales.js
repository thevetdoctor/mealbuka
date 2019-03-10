// ui/sales.js

const orderList = document.querySelector('.order-list');
// eslint-disable-next-line no-undef
const salesUrl = `${apiUrl}api/v1/orders`;

const user = document.querySelector('#user');
const totalHandle = document.querySelector('.total');
const total = document.querySelector('.total-value');
const username = JSON.parse(localStorage.getItem('user'));
user.innerHTML = `${username.name}, `;

orderList.innerHTML = '<div class="meal-class">S/NO <span>Meal</span><span>Price</span><span>Customer</span>';

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
    .then((response1) => {
      if (response1.data === null) {
        return;
      }
      console.log(response1);
      // eslint-disable-next-line no-undef
      fetch(`${apiUrl}api/v1/meals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then((response2) => {
          // eslint-disable-next-line no-undef
          fetch(`${apiUrl}auth/users/admin`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => res.json())
            .then((response3) => {
              // console.log(response1);
              // console.log(response2);
              // console.log(response3);
              const orders = response1.data;
              const meals = response2.data;
              const users = response3.list;
              let totalValue = 0;
              if (orders === undefined) {
                totalHandle.style.display = 'none';
                orderList.innerHTML = 'No order available';
                return;
              }
              orders.forEach((order) => {
                orderList.innerHTML += `<div class="meal-class"> ${order.id} <span>${meals[order.mealId - 1].name}</span><span> N${meals[order.mealId - 1].price}</span><span>: ${users[order.userId - 1].name}</span> </div>`;
                totalValue += parseInt(meals[order.mealId - 1].price, 10);
                total.innerText = `N${totalValue}.00`;
              });
            });
        });
    // eslint-disable-next-line no-unused-vars
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      orderList.innerHTML = '<h2> No orders listed </h2>';
    });
};

listOrders();
