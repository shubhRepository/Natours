/*eslint-disable*/
import '@babel/polyfill';
import FormData from 'form-data';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';
import { signup } from './signup';
//get locations not from database or api query but using the data that was brought to pug file by passing in data attribute
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.formL');
const signupForm = document.querySelector('.formS');
const logoutbutton = document.querySelector('.nav__el--logout');
const dataUpdateForm = document.querySelector('.form-user-data');
const passwordUpdateForm = document.querySelector('.form-user-password');
const bookbtn = document.getElementById('book-tour');
//values

if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cnfpassword = document.getElementById('cnfpassword').value;
    signup(name, email, password, cnfpassword);
  });
}
if (dataUpdateForm) {
  dataUpdateForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}
if (passwordUpdateForm) {
  passwordUpdateForm.addEventListener('submit', async e => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    document.querySelector('.btn--status').textContent = 'updating..';
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--status').textContent = 'save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logoutbutton) logoutbutton.addEventListener('click', logout);

if (bookbtn)
  bookbtn.addEventListener('click', e => {
    e.target.textContent = 'processing...';
    const tourId = e.target.dataset.tourId;
    bookTour(tourId);
  });

const alert = document.querySelector('body').dataset.alert;
if (alert) showAlert('success', alert);
