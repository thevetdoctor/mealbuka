// ui/shared.js

const getUrl = () => {
	if(window.location.host.indexOf('localhost') > -1){
		return 'http://localhost:5000/';
	} else {
		return 'https://mealbuka.herokuapp.com/';
	}
}

const apiUrl = getUrl();