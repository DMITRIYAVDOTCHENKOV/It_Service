(function () {
  const form = document.getElementById('projectPageForm');
  const success = document.getElementById('projectSuccess');
  const requestNumber = document.getElementById('projectRequestNumber');
  const consentError = document.getElementById('projectConsentError');
  if (!form) return;
  form.dataset.readyAt = String(Date.now());

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
  const isPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  };

  function setError(field, message = '') {
    field.classList.toggle('invalid', Boolean(message));
    const error = field.closest('label')?.querySelector('.field-error');
    if (error) error.textContent = message;
  }

  function validate() {
    const fields = form.elements;
    const checks = [
      [fields.service, fields.service.value ? '' : 'Выберите услугу.'],
      [fields.name, fields.name.value.trim().length >= 2 ? '' : 'Введите имя — минимум 2 символа.'],
      [fields.phone, isPhone(fields.phone.value) ? '' : 'Введите телефон: от 10 до 15 цифр.'],
      [fields.email, isEmail(fields.email.value) ? '' : 'Введите корректный email.'],
      [fields.message, fields.message.value.trim().length >= 20 ? '' : 'Опишите задачу — минимум 20 символов.'],
    ];
    let valid = true;
    checks.forEach(([field, message]) => {
      setError(field, message);
      if (message) valid = false;
    });
    consentError.textContent = fields.consent.checked ? '' : 'Необходимо согласие на обработку данных.';
    return valid && fields.consent.checked;
  }

  const service = new URLSearchParams(location.search).get('service')?.replaceAll('-', ' ');
  if (service) form.elements.service.value = service;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.elements.website?.value) return;
    if (Date.now() - Number(form.dataset.readyAt) < 700) {
      consentError.textContent = 'Форма заполнена слишком быстро. Повторите отправку.';
      return;
    }
    const lastSubmit = Number(localStorage.getItem('novatechLastSubmit:project') || 0);
    if (Date.now() - lastSubmit < 30000) {
      consentError.textContent = 'Повторную заявку можно отправить через 30 секунд.';
      return;
    }
    if (!validate()) {
      form.querySelector('.invalid')?.focus();
      return;
    }
    const date = new Date();
    const day = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const number = `NT-${day}-${Math.floor(1000 + Math.random() * 9000)}`;
    const data = Object.fromEntries(new FormData(form));
    const leads = JSON.parse(localStorage.getItem('novatechLeads') || '[]');
    leads.push({ ...data, requestNumber: number, source: 'project-page', createdAt: new Date().toISOString() });
    localStorage.setItem('novatechLeads', JSON.stringify(leads.slice(-50)));
    localStorage.setItem('novatechLastSubmit:project', String(Date.now()));
    requestNumber.textContent = number;
    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
