// ui/shared.js

const getUrl = () => {
  if (window.location.host.indexOf('localhost') > -1) {
    return 'http://localhost:5000/';
  }
  return 'https://mealbuka.herokuapp.com/';
};

const apiUrl = getUrl();
