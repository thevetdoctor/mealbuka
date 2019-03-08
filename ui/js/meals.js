// meals.js

const display = document.querySelector('.display');
const displayTop = document.querySelector('.display-top');
const mealName = document.querySelector('#meal-name');
const mealPrice = document.querySelector('#meal-price');
const addMealBtn = document.querySelector('#addMeal');
const user = document.querySelector('#user');
// eslint-disable-next-line no-undef
const mealsUrl = `${apiUrl}api/v1/meals`;

const username = JSON.parse(localStorage.getItem('user'));
user.innerHTML = `${username.name}, `;

const update = () => {
  display.innerHTML = '';
  const token = localStorage.getItem('token');
  fetch(mealsUrl, {
    method: 'GET',
    headers: {
      'COntent-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
    //   console.log(response);
      if (response.status === 200) {
        const meals = response.data;
        let count = 0;

        meals.forEach((meal) => {
          count += 1;
          display.innerHTML += `<div class="meal-class">${count} - ${meal.name} - N${meal.price}<div><button id="${meal.id}" class="edit">Edit</button><button id="${meal.id}" class="delete">Delete</button></div></div>`;
        //   console.log('id', count);
        });
      } else {
        display.innerHTML = `${response.error}`;
      }
    }).catch((error) => {
      console.log(error);
    });
};

update();


const addMeal = () => {
  const newMeal = { name: mealName.value, price: mealPrice.value };
  const token = localStorage.getItem('token');
  displayTop.style.color = 'red';

  if (newMeal.name === '' || newMeal.price === '') {
    displayTop.innerHTML = '<h4>Please supply meal details</h4>';
  } else {
    newMeal.price += '.00';

    return fetch(mealsUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: newMeal.name,
        price: newMeal.price,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      // eslint-disable-next-line no-console
      .then((response) => {
        if (response.message === undefined) {
          display.innerHTML = '<h4>Error, Please refresh page</h4>';
        } else {
          display.innerHTML = `<h4>${response.message}, please refresh page</h4>`;
        }
        update();
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }

  update();
};


const getId = (e) => {
  if (!e) {
    e = window.event;
  }
};


const deleteMeal = (e) => {
  getId(e);
  const token = localStorage.getItem('token');

  let btnId = e.target.getAttribute('id');
  const btnClass = e.target.getAttribute('class');
  btnId = parseInt(btnId, 10);

  if (btnClass === 'edit' || btnClass === 'edit update') {
    return;
  }
  // eslint-disable-next-line no-undef
  fetch(`${apiUrl}api/v1/meals/${btnId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      console.log(response.data[0].message);
    })
    .catch((error) => {
      console.log(error);
    });
  update();
};

const editMeal = (e) => {
  e.preventDefault();
  getId(e);
  if (e.target.parentNode === null || e.target.parentNode.parentNode === null) {
    console.log('This is an input tag');
    return;
  }
  const btnId = e.target.getAttribute('id');
  const mealHandle = e.target.parentNode.parentNode;
  const text = mealHandle.innerText;
  // console.log(mealHandle);
  // console.log(btnId);
  const id = text.split('-')[0];
  const meal = text.split('-')[1];
  const price = text.split('\n')[0].slice(-5);
  // console.log(meal);
  // console.log(price);
  mealHandle.innerHTML = `${id} - <input value="${meal}"> - N<input value="${price}"><div><button class="delete cancel">Cancel</button><button id="${btnId}" class="edit update">Update</button></div>`;
};


const modifyMeal = (e) => {
  getId(e);
  const token = localStorage.getItem('token');

  let btnId = e.target.getAttribute('id');
  console.log(btnId);
  const btnClass = e.target.getAttribute('class');
  btnId = parseInt(btnId, 10);

  if (btnClass === 'delete') {
    console.log(`delete ${btnId}`);
    return;
  }

  console.log(`update ${btnId}`);
  // eslint-disable-next-line no-undef
  fetch(`${apiUrl}api/v1/meals/${btnId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((response) => {
      console.log(response.data[0].message);
    })
    .catch((error) => {
      // console.log(error);
    });
  // update();
};

addMealBtn.addEventListener('click', addMeal);

display.addEventListener('click', deleteMeal);

display.addEventListener('click', editMeal);

display.addEventListener('click', modifyMeal);
