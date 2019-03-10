// user.js

const meals = document.querySelector('.row');
const thisUser = document.querySelector('#user');
// eslint-disable-next-line no-undef
const url = `${apiUrl}api/v1/`;
let menu = [];
const user = JSON.parse(localStorage.getItem('user'));
thisUser.innerHTML = user.name;


const getId = (e) => {
  if (!e) {
    // eslint-disable-next-line no-param-reassign
    e = window.event;
  }
};

// eslint-disable-next-line no-shadow
const fetchMeals = () => {
  // let user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  fetch(`${url}meals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      // console.log(response);
      if (response.status === 200) {
        menu = response.data;
        menu.forEach((meal) => {
          meals.innerHTML += `<div id="${meal.id}" class="section">
                                <img src="../images/meal2.jpg" alt="Food Image">
                                 ${meal.name} <br> N${meal.price} <br>
                                <span class="btn">Pick me</span>
                                </div>`;
        });
      } else {
        meals.innerHTML = `${response.error}`;
      }
    });
};

fetchMeals();


// let count = 0;
const pickMeal = (e) => {
  getId(e);
  const token = localStorage.getItem('token');
  const order = {
    mealId: parseInt(e.target.parentNode.getAttribute('id'), 10),
    userId: user.id,
  };
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(order.mealId)) {
    return;
  }
  // eslint-disable-next-line no-console
  console.log(e.target);
  // eslint-disable-next-line no-console
  console.log(order);

  fetch(`${url}orders`, {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
    })
    .catch((error) => {
    // eslint-disable-next-line no-console
      console.log(error);
    });
  // if (e.innerText !== 'Click to choose') {
  //   const innerText = e.innerText.split(' ');
  //   // console.log(innerText);
  //   let value = innerText[innerText.length - 1];
  //   //   console.log(parseInt(value , 10));
  //   value += 1;
  //   e.innerText = `Added ${value}`;
  //   //   console.log(e.parentNode);

  //   // myOrders.push({name: })
  // } else {
  //   count += 1;
  //   e.innerText = `Added ${count}`;
  // }
};

meals.addEventListener('click', pickMeal);
