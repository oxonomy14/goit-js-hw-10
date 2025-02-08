// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = document.querySelector('input[name="delay"]').value;
  const btnCheckValue = document.querySelector(
    'input[name="state"]:checked'
  ).value;

  function createPromise(delay, btnCheckValue) {
    const formPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (btnCheckValue === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    return formPromise;
  }
  const promise = createPromise(delay, btnCheckValue);

  promise
    .then(delay => {
      console.log(onFulfilled(delay));
    })
    .catch(delay => {
      console.log(onRejected(delay));
    });
});

function onFulfilled(delay) {
  //return `✅ Fulfilled promise in ${delay}ms`;

  return iziToast.success({
    title: 'Success',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
    timeout: 10000,
  });
}

function onRejected(delay) {
  //return `❌ Rejected promise in ${delay}ms`;

  return iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
    timeout: 10000,
  });
}
