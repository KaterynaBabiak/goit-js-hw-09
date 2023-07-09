import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if(shouldResolve){
        resolve ({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  })

}

const form = document.querySelector ('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  const delayInput = evt.target.elements.delay;
  const stepInput = evt.target.elements.step;
  const amountInput = evt.target.elements.amount;

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount= Number(amountInput.value);

  for (let i = 1; i <= amount; i++){
    createPromise(i, delay +(i - 1) * step)
    .then(({position, delay}) => {
      Notiflix.Notify.success(`Promise ${position} resolved after ${delay} ms`);
    })
    .catch (({position, delay}) => {
      Notiflix.Notify.failure(`Promise ${position} rejected after ${delay} ms`);
    })
  }
}
