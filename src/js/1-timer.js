// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true; // Початково кнопка неактивна

let userSelectedDate = null;

let timerId = null;

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  locale: 'uk',
  theme: 'material_blue',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);

    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Помилка',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 10000,
      });
      refs.startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate; // Зберігаємо дату у глобальну змінну

      refs.startBtn.disabled = false; // Активуємо кнопку, якщо дата валідна

      console.log('Обрана дата:', userSelectedDate); // Перевіряємо у консолі
    }
  },
};

// Викликаємо flatpickr після того, як змінна options уже визначена
flatpickr('#datetime-picker', options);

// Запуск таймера при натисканні кнопки
refs.startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  // Блокуємо інпут і кнопку
  refs.dateInput.disabled = true;
  refs.startBtn.disabled = true;

  timerId = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      updateTimerUI(0);
      refs.dateInput.disabled = false; // Розблоковуємо інпут
      return;
    }

    updateTimerUI(timeLeft);
  }, 1000);
});

// Функція для оновлення таймера в інтерфейсі
function updateTimerUI(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція додавання 0 перед числами менше 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
