(function () {
  const form = document.getElementById('reviewForm');
  const grid = document.getElementById('reviewsGrid');
  const status = document.getElementById('reviewStatus');
  const consentError = document.getElementById('reviewConsentError');
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
  form.dataset.readyAt = String(Date.now());

  function setError(field, message = '') {
    field.classList.toggle('invalid', Boolean(message));
    const error = field.closest('label')?.querySelector('.field-error');
    if (error) error.textContent = message;
  }

  function createReviewCard(review) {
    const card = document.createElement('article');
    card.className = 'review-card review-card--pending';

    const pending = document.createElement('div');
    pending.className = 'review-card__pending';
    pending.textContent = 'Ожидает модерации';

    const stars = document.createElement('div');
    stars.className = 'review-card__stars';
    stars.setAttribute('aria-label', `Оценка ${review.rating} из 5`);
    stars.textContent = '★'.repeat(Number(review.rating)) + '☆'.repeat(5 - Number(review.rating));

    const quote = document.createElement('blockquote');
    quote.textContent = `«${review.text}»`;

    const footer = document.createElement('footer');
    const name = document.createElement('strong');
    name.textContent = review.name;
    const meta = document.createElement('span');
    meta.textContent = 'Новый отзыв';
    footer.append(name, meta);
    card.append(pending, stars, quote, footer);
    return card;
  }

  function loadSavedReviews() {
    const reviews = JSON.parse(localStorage.getItem('novatechReviews') || '[]');
    reviews.forEach((review) => grid.appendChild(createReviewCard(review)));
  }

  function validate() {
    const fields = form.elements;
    const checks = [
      [fields.name, fields.name.value.trim().length >= 2 ? '' : 'Введите имя — минимум 2 символа.'],
      [fields.email, isValidEmail(fields.email.value) ? '' : 'Введите корректный email.'],
      [fields.rating, fields.rating.value ? '' : 'Выберите оценку.'],
      [fields.review, fields.review.value.trim().length >= 20 ? '' : 'Отзыв должен содержать минимум 20 символов.'],
    ];
    let valid = true;
    checks.forEach(([field, message]) => {
      setError(field, message);
      if (message) valid = false;
    });
    consentError.textContent = fields.consent.checked ? '' : 'Необходимо согласие на обработку данных.';
    if (!fields.consent.checked) valid = false;
    return valid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.elements.website?.value) return;
    if (Date.now() - Number(form.dataset.readyAt) < 700) {
      status.textContent = 'Форма заполнена слишком быстро. Повторите отправку.';
      return;
    }
    const lastSubmit = Number(localStorage.getItem('novatechLastSubmit:review') || 0);
    if (Date.now() - lastSubmit < 30000) {
      status.textContent = 'Повторный отзыв можно отправить через 30 секунд.';
      return;
    }
    if (!validate()) {
      form.querySelector('.invalid')?.focus();
      return;
    }

    const data = new FormData(form);
    const review = {
      id: `REV-${Date.now()}`,
      name: data.get('name'),
      email: data.get('email'),
      rating: data.get('rating'),
      text: data.get('review'),
      createdAt: new Date().toISOString(),
    };
    const saved = JSON.parse(localStorage.getItem('novatechReviews') || '[]');
    saved.push(review);
    localStorage.setItem('novatechReviews', JSON.stringify(saved.slice(-20)));
    localStorage.setItem('novatechLastSubmit:review', String(Date.now()));
    grid.appendChild(createReviewCard(review));
    form.reset();
    form.dataset.readyAt = String(Date.now());
    status.textContent = 'Спасибо! Отзыв сохранён и ожидает модерации.';
    grid.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  loadSavedReviews();
})();
