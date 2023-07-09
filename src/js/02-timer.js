import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePickerEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let currentDate = new Date();
let selectedDate = null;
let deltaTime = null;
let intervalId = null;

buttonEl.setAttribute('disabled', 'true');
buttonEl.addEventListener('click', onStartTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose: (selectedDates) => {
    selectedDate = selectedDates[0];
    deltaTime = selectedDate - currentDate;

    if (selectedDate <= currentDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    buttonEl.removeAttribute('disabled');
  },
};

const flatpickrInstance = flatpickr(datePickerEl, options);

const pad = (value) => String(value).padStart(2, '0');

const convertMs = (milliseconds) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(milliseconds / day));
  const hours = pad(Math.floor((milliseconds % day) / hour));
  const minutes = pad(Math.floor(((milliseconds % day) % hour) / minute));
  const seconds = pad(Math.floor((((milliseconds % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

const startTimer = () => {
  intervalId = setInterval(() => {
    stopTimer();

    deltaTime -= 1000;
    convertMs(deltaTime);
    updateTimerComponents(convertMs(deltaTime));
  }, 1000);
};

const stopTimer = () => {
  if (
    daysEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    secondsEl.textContent === '01'
  ) {
    clearInterval(intervalId);
  }
};

const updateTimerComponents = ({ days, hours, minutes, seconds }) => {
  daysEl.textContent = days.toString();
  hoursEl.textContent = hours.toString();
  minutesEl.textContent = minutes.toString();
  secondsEl.textContent = seconds.toString();
};

function onStartTimer(event) {
  updateTimerComponents(convertMs(deltaTime));
  startTimer();
  buttonEl.setAttribute('disabled', 'true');
  datePickerEl.setAttribute('disabled', 'true');
};






