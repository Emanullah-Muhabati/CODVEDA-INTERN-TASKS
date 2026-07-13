const navLinks = document.querySelector('.nav-links');
const form = document.getElementById('signup-form');
const successMessage = document.getElementById('form-success');
const links = document.querySelectorAll('a[href^="#"]');


links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks?.classList.remove('open');
    }
  });
});

const fields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  password: document.getElementById('password')
};

function setError(fieldName, message) {
  const errorEl = document.getElementById(`${fieldName}-error`);
  if (errorEl) errorEl.textContent = message;
}

function validateField(fieldName) {
  const input = fields[fieldName];
  const value = input?.value.trim() || '';

  switch (fieldName) {
    case 'name':
      if (!value) {
        setError(fieldName, 'Name is required.');
        return false;
      }
      if (value.length < 2) {
        setError(fieldName, 'Name must be at least 2 characters.');
        return false;
      }
      setError(fieldName, '');
      return true;

    case 'email': {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        setError(fieldName, 'Email is required.');
        return false;
      }
      if (!emailPattern.test(value)) {
        setError(fieldName, 'Please enter a valid email address.');
        return false;
      }
      setError(fieldName, '');
      return true;
    }

    case 'phone': {
      const phonePattern = /^\+?[0-9\s()-]{7,15}$/;
      if (!value) {
        setError(fieldName, 'Phone number is required.');
        return false;
      }
      if (!phonePattern.test(value)) {
        setError(fieldName, 'Please enter a valid phone number.');
        return false;
      }
      setError(fieldName, '');
      return true;
    }

    case 'password': {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
      if (!value) {
        setError(fieldName, 'Password is required.');
        return false;
      }
      if (!passwordPattern.test(value)) {
        setError(fieldName, 'Password must be 8+ characters with upper/lowercase, number, and symbol.');
        return false;
      }
      setError(fieldName, '');
      return true;
    }

    default:
      return true;
  }
}

Object.entries(fields).forEach(([fieldName, input]) => {
  input.addEventListener('input', () => validateField(fieldName));
  input.addEventListener('blur', () => validateField(fieldName));
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.textContent = '';

  const isValid = Object.keys(fields).every((fieldName) => validateField(fieldName));

  if (isValid) {
    successMessage.textContent = 'Success! Your account has been created.';
    Object.keys(fields).forEach((fieldName) => setError(fieldName, ''));
    form.reset();
  }
});

let count = 0;
const counterDisplay = document.getElementById('counter-display');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');

function updateCounter() {
  counterDisplay.textContent = count;
  decrementBtn.disabled = count <= 0;
}

incrementBtn?.addEventListener('click', () => {
  count += 1;
  updateCounter();
});

decrementBtn?.addEventListener('click', () => {
  if (count > 0) {
    count -= 1;
  }
  updateCounter();
});

resetBtn?.addEventListener('click', () => {
  count = 0;
  updateCounter();
});

updateCounter();
