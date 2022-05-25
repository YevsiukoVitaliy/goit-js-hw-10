import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};
console.dir(refs.textarea);
console.dir(refs.email);
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputForm, 500));

const feedbackFormState = localStorage.getItem('feedbackFormState')
  ? JSON.parse(localStorage.getItem('feedbackFormState'))
  : {};

onSavedTextareaInput();

function onInputForm(evt) {
  feedbackFormState[evt.target.name] = evt.target.value;
  console.log(feedbackFormState);
  localStorage.setItem('feedbackFormState', JSON.stringify(feedbackFormState));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem('feedbackFormState');
}

function onSavedTextareaInput(evt) {
  if (!localStorage.getItem('feedbackFormState')) {
    return;
  }
  const savedMessage = JSON.parse(localStorage.getItem('feedbackFormState'));

  if (savedMessage) {
    if (savedMessage.email) {
      refs.email.value = savedMessage.email;
    }

    if (savedMessage.message) {
      refs.textarea.value = savedMessage.message;
    }
  }
}