(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const faqItems = document.querySelectorAll('.faq-item');
  const contactForm = document.getElementById('contactForm');
  const serviceModal = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalLead = document.getElementById('modalLead');
  const modalBody = document.getElementById('modalBody');
  const modalMeta = document.getElementById('modalMeta');
  const modalIcon = document.getElementById('modalIcon');
  const modalImage = document.getElementById('modalImage');
  const modalCta = document.getElementById('modalCta');
  const contactStatus = document.getElementById('contactStatus');
  const chatLauncher = document.getElementById('chatLauncher');
  const leadChat = document.getElementById('leadChat');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatQuick = document.getElementById('chatQuick');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const leadEndpoint = document.querySelector('meta[name="lead-endpoint"]')?.content.trim();
  const leadModal = document.getElementById('leadModal');
  const leadPopupForm = document.getElementById('leadPopupForm');
  const leadFormView = document.getElementById('leadFormView');
  const leadSuccess = document.getElementById('leadSuccess');
  const leadRequestNumber = document.getElementById('leadRequestNumber');
  const siteToast = document.getElementById('siteToast');
  let toastTimer;

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
  const isValidPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  };
  const isValidContact = (value) => isValidEmail(value) || isValidPhone(value) || /^@[a-zA-Z0-9_]{5,}$/.test(value.trim());

  function generateRequestNumber(prefix = 'NT') {
    const date = new Date();
    const day = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${day}-${random}`;
  }

  function saveDemoEntry(key, entry) {
    const entries = JSON.parse(localStorage.getItem(key) || '[]');
    entries.push(entry);
    localStorage.setItem(key, JSON.stringify(entries.slice(-50)));
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    siteToast.textContent = message;
    siteToast.classList.add('show');
    siteToast.setAttribute('aria-hidden', 'false');
    toastTimer = setTimeout(() => {
      siteToast.classList.remove('show');
      siteToast.setAttribute('aria-hidden', 'true');
    }, 5000);
  }

  function prepareProtectedForm(form) {
    if (form) form.dataset.readyAt = String(Date.now());
  }

  function canSubmit(form, key, showError) {
    if (form.elements.website?.value) return false;
    if (Date.now() - Number(form.dataset.readyAt || 0) < 700) { showError('????? ????????? ??????? ??????. ????????? ?????? ? ????????? ????????.'); return false; }
    const last = Number(localStorage.getItem(`novatechLastSubmit:${key}`) || 0);
    if (Date.now() - last < 30000) { showError('????????? ?????? ????? ????????? ????? 30 ??????.'); return false; }
    return true;
  }

  function markSubmitted(key) { localStorage.setItem(`novatechLastSubmit:${key}`, String(Date.now())); }

  prepareProtectedForm(contactForm);

  async function submitLead(lead) {
    if (leadEndpoint) {
      const response = await fetch(leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, page: window.location.href, createdAt: new Date().toISOString() }),
      });

      if (!response.ok) throw new Error('Не удалось отправить заявку');
      return { delivered: true };
    }

    saveDemoEntry('novatechLeads', { ...lead, createdAt: new Date().toISOString() });
    return { delivered: true, demo: true };
  }

  const serviceIcons = {
    web: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    business: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>',
    system: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    development: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  };

  const services = {
    web: {
      title: 'Web-анализ',
      image: 'img/service-web.webp',
      imageAlt: 'Web-анализ и аудит сайта',
      lead: 'Комплексный аудит вашего сайта: от технического состояния до пользовательского опыта и поисковой видимости.',
      meta: 'Срок: 5–10 рабочих дней',
      cta: 'Заказать web-анализ',
      body: `
        <p>Web-анализ помогает понять, почему сайт не приносит ожидаемых результатов и что нужно изменить для роста трафика и конверсии. Мы изучаем продукт с точки зрения пользователя, технологий и маркетинга.</p>
        <h4>Что входит в услугу</h4>
        <ul>
          <li>Технический аудит: скорость загрузки, мобильная адаптация, ошибки в коде и разметке</li>
          <li>UX/UI-анализ: удобство навигации, читаемость, путь пользователя до целевого действия</li>
          <li>SEO-диагностика: индексация, мета-теги, структура заголовков, внутренняя перелинковка</li>
          <li>Анализ конкурентов и сравнение с лучшими практиками отрасли</li>
          <li>Аналитика поведения: точки выхода, воронка, проблемные страницы</li>
        </ul>
        <h4>Этапы работы</h4>
        <div class="modal__steps">
          <div class="modal__step"><span class="modal__step-num">1</span><span class="modal__step-text">Сбор данных: доступы, цели, текущая аналитика</span></div>
          <div class="modal__step"><span class="modal__step-num">2</span><span class="modal__step-text">Аудит по 40+ параметрам с помощью профессиональных инструментов</span></div>
          <div class="modal__step"><span class="modal__step-num">3</span><span class="modal__step-text">Формирование отчёта с приоритетами: что исправить в первую очередь</span></div>
        </div>
        <p>На выходе вы получаете структурированный документ с конкретными рекомендациями и оценкой потенциала роста.</p>
      `,
    },
    business: {
      title: 'Бизнес-анализ',
      image: 'img/service-business.webp',
      imageAlt: 'Бизнес-анализ и моделирование процессов',
      lead: 'Переводим бизнес-задачи в понятные IT-требования: выявляем потребности, описываем процессы и формируем roadmap проекта.',
      meta: 'Срок: 1–3 недели',
      cta: 'Заказать бизнес-анализ',
      body: `
        <p>Бизнес-анализ — фундамент любого успешного IT-проекта. Мы помогаем заказчику и команде разработки говорить на одном языке, чтобы продукт решал реальные задачи бизнеса, а не просто «был красивым».</p>
        <h4>Что входит в услугу</h4>
        <ul>
          <li>Интервью с ключевыми стейкхолдерами и сбор бизнес-требований</li>
          <li>Описание текущих (As-Is) и целевых (To-Be) бизнес-процессов</li>
          <li>Формирование user stories и use cases</li>
          <li>Приоритизация функционала по методу MoSCoW или WSJF</li>
          <li>Подготовка технического задания и backlog для разработки</li>
        </ul>
        <h4>Этапы работы</h4>
        <div class="modal__steps">
          <div class="modal__step"><span class="modal__step-num">1</span><span class="modal__step-text">Discovery-сессии: цели, аудитория, ограничения, KPI</span></div>
          <div class="modal__step"><span class="modal__step-num">2</span><span class="modal__step-text">Моделирование процессов и прототипирование ключевых сценариев</span></div>
          <div class="modal__step"><span class="modal__step-num">3</span><span class="modal__step-text">Согласование ТЗ, roadmap и оценка бюджета проекта</span></div>
        </div>
        <p>Результат — документ, по которому можно сразу начинать проектирование и разработку без доработок «на ходу».</p>
      `,
    },
    system: {
      title: 'Системный анализ',
      image: 'img/service-system.webp',
      imageAlt: 'Системный анализ и архитектура IT',
      lead: 'Проектируем надёжную архитектуру IT-решений: интеграции, API, базы данных и документация для масштабируемых систем.',
      meta: 'Срок: 2–4 недели',
      cta: 'Заказать системный анализ',
      body: `
        <p>Системный анализ необходим, когда проект включает несколько модулей, внешние сервисы или высокие требования к производительности и безопасности. Мы проектируем решение так, чтобы оно выдерживало рост нагрузки и изменения бизнес-логики.</p>
        <h4>Что входит в услугу</h4>
        <ul>
          <li>Проектирование архитектуры: монолит, микросервисы, serverless — под задачу</li>
          <li>Описание интеграций с CRM, ERP, платёжными системами и сторонними API</li>
          <li>Проектирование REST/GraphQL API и схем баз данных</li>
          <li>Нефункциональные требования: безопасность, отказоустойчивость, SLA</li>
          <li>Техническая документация для команды разработки и DevOps</li>
        </ul>
        <h4>Этапы работы</h4>
        <div class="modal__steps">
          <div class="modal__step"><span class="modal__step-num">1</span><span class="modal__step-text">Анализ контекста: системы, пользователи, объёмы данных, интеграции</span></div>
          <div class="modal__step"><span class="modal__step-num">2</span><span class="modal__step-text">Архитектурные диаграммы (C4, UML, sequence diagrams)</span></div>
          <div class="modal__step"><span class="modal__step-num">3</span><span class="modal__step-text">Спецификация API, модель данных и план поэтапного внедрения</span></div>
        </div>
        <p>Вы получаете полный комплект документации для старта разработки с минимальными архитектурными рисками.</p>
      `,
    },
    development: {
      title: 'Создание сайтов',
      image: 'img/service-development.webp',
      imageAlt: 'Разработка сайтов и веб-приложений',
      lead: 'Разрабатываем сайты и веб-приложения любой сложности — от лендингов до корпоративных порталов с личными кабинетами и интеграциями.',
      meta: 'Срок: от 2 недель до 3+ месяцев',
      cta: 'Обсудить проект',
      body: `
        <p>Мы создаём цифровые продукты под ключ: дизайн, frontend, backend, тестирование и запуск. Работаем с проектами любой сложности — от простого лендинга до многомодульной платформы.</p>
        <h4>Типы проектов</h4>
        <ul>
          <li>Лендинги и промо-сайты с высокой конверсией</li>
          <li>Корпоративные сайты и многостраничные порталы</li>
          <li>Интернет-магазины и каталоги с корзиной и оплатой</li>
          <li>Веб-приложения: личные кабинеты, SaaS, админ-панели</li>
        </ul>
        <h4>Что входит в услугу</h4>
        <ul>
          <li>UI/UX-дизайн и адаптивная вёрстка под все устройства</li>
          <li>Frontend-разработка (React, Vue или чистый HTML/CSS/JS)</li>
          <li>Backend, CMS, база данных и интеграции по необходимости</li>
          <li>SEO-базовая настройка, аналитика, деплой на хостинг</li>
          <li>Гарантийная поддержка и сопровождение после запуска</li>
        </ul>
        <h4>Этапы работы</h4>
        <div class="modal__steps">
          <div class="modal__step"><span class="modal__step-num">1</span><span class="modal__step-text">Бриф и прототип: согласование структуры и дизайн-концепции</span></div>
          <div class="modal__step"><span class="modal__step-num">2</span><span class="modal__step-text">Разработка спринтами с еженедельными демо</span></div>
          <div class="modal__step"><span class="modal__step-num">3</span><span class="modal__step-text">Тестирование, запуск и передача проекта с документацией</span></div>
        </div>
        <p>Каждый проект сопровождается менеджером, который держит вас в курсе прогресса и сроков на каждом этапе.</p>
      `,
    },
  };

  function openModal(serviceId) {
    const data = services[serviceId];
    if (!data) return;

    modalIcon.innerHTML = serviceIcons[serviceId];
    modalImage.innerHTML = `<img src="${data.image}" alt="${data.imageAlt}">`;
    modalTitle.textContent = data.title;
    modalLead.textContent = data.lead;
    modalBody.innerHTML = data.body;
    modalMeta.textContent = data.meta;
    modalCta.textContent = data.cta;
    modalCta.dataset.serviceName = data.title;

    serviceModal.classList.add('open');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    serviceModal.classList.remove('open');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-service]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.service));
  });

  serviceModal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('open')) {
      closeModal();
    }
  });

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  });

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-item__question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const data = new FormData(contactForm);
    if (!canSubmit(contactForm, 'contact', (message) => { contactStatus.textContent = message; })) return;
    const contact = String(data.get('contact') || '');
    if (!isValidContact(contact)) {
      contactStatus.textContent = 'Укажите корректный телефон, email или Telegram в формате @username.';
      contactForm.elements.contact.focus();
      return;
    }
    const requestNumber = generateRequestNumber();
    btn.textContent = 'Отправляем…';
    btn.disabled = true;

    try {
      const result = await submitLead({
        source: 'contact-form',
        requestNumber,
        name: data.get('name'),
        contact,
        message: data.get('message'),
      });
      contactStatus.textContent = result.delivered
        ? `Спасибо! Заявка ${requestNumber} принята. Скоро с вами свяжемся.`
        : 'Не удалось отправить заявку.';
      contactForm.reset();
      markSubmitted('contact');
      prepareProtectedForm(contactForm);
    } catch (error) {
      contactStatus.textContent = 'Не получилось отправить заявку. Напишите нам на hello@novatech.ru.';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });

  function setFieldError(field, message = '') {
    const error = field.closest('label')?.querySelector('.field-error');
    field.classList.toggle('invalid', Boolean(message));
    if (error) error.textContent = message;
  }

  function validatePopupForm() {
    const fields = leadPopupForm.elements;
    let valid = true;
    const checks = [
      [fields.service, fields.service.value ? '' : 'Выберите услугу.'],
      [fields.name, fields.name.value.trim().length >= 2 ? '' : 'Введите имя — минимум 2 символа.'],
      [fields.phone, isValidPhone(fields.phone.value) ? '' : 'Введите телефон: от 10 до 15 цифр.'],
      [fields.email, isValidEmail(fields.email.value) ? '' : 'Введите корректный email.'],
      [fields.message, fields.message.value.trim().length >= 10 ? '' : 'Опишите задачу — минимум 10 символов.'],
    ];
    checks.forEach(([field, message]) => {
      setFieldError(field, message);
      if (message) valid = false;
    });
    const consentError = document.getElementById('popupConsentError');
    consentError.textContent = fields.consent.checked ? '' : 'Необходимо согласие на обработку данных.';
    if (!fields.consent.checked) valid = false;
    return valid;
  }

  function openLeadModal(service = '') {
    leadPopupForm.reset();
    leadPopupForm.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
    leadPopupForm.querySelectorAll('.invalid').forEach((field) => field.classList.remove('invalid'));
    leadFormView.hidden = false;
    leadSuccess.hidden = true;
    if (service) leadPopupForm.elements.service.value = service;
    prepareProtectedForm(leadPopupForm);
    leadModal.classList.add('open');
    leadModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lead-modal-open');
    setTimeout(() => leadPopupForm.elements.name.focus(), 50);
  }

  function closeLeadModal() {
    leadModal.classList.remove('open');
    leadModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lead-modal-open');
  }

  document.querySelectorAll('[data-lead-open]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openLeadModal(trigger.dataset.serviceName || '');
    });
  });

  leadModal.querySelectorAll('[data-lead-close]').forEach((element) => element.addEventListener('click', closeLeadModal));

  leadPopupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!canSubmit(leadPopupForm, 'popup', showToast)) return;
    if (!validatePopupForm()) {
      leadPopupForm.querySelector('.invalid')?.focus();
      return;
    }
    const button = leadPopupForm.querySelector('button[type="submit"]');
    const data = new FormData(leadPopupForm);
    const requestNumber = generateRequestNumber();
    button.disabled = true;
    button.textContent = 'Отправляем…';
    try {
      await submitLead({
        source: 'popup',
        requestNumber,
        service: data.get('service'),
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        contact: `${data.get('phone')} / ${data.get('email')}`,
        message: data.get('message'),
      });
      leadRequestNumber.textContent = requestNumber;
      leadFormView.hidden = true;
      leadSuccess.hidden = false;
      leadSuccess.querySelector('button').focus();
      markSubmitted('popup');
    } catch (error) {
      showToast('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам на почту.');
    } finally {
      button.disabled = false;
      button.textContent = 'Отправить заявку';
    }
  });

  document.querySelectorAll('[data-messenger]').forEach((button) => {
    button.addEventListener('click', () => showToast(`${button.dataset.messenger}: канал связи находится в разработке.`));
  });

  const chatLead = { source: 'chat', service: '', name: '', contact: '', message: '' };
  let chatStep = 'service';
  let chatStarted = false;

  function addChatMessage(text, type = 'bot') {
    const message = document.createElement('div');
    message.className = `chat-message${type === 'user' ? ' chat-message--user' : ''}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function setQuickReplies(items = []) {
    chatQuick.replaceChildren();
    items.forEach((label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', () => handleChatAnswer(label));
      chatQuick.appendChild(button);
    });
  }

  function askChatQuestion() {
    const questions = {
      service: 'Что вас интересует?',
      name: 'Как к вам обращаться?',
      contact: 'Оставьте телефон, email или Telegram для связи.',
      message: 'Коротко расскажите о задаче и желаемых сроках.',
    };
    const placeholders = {
      name: 'Ваше имя',
      contact: '+7 999 000-00-00 или @telegram',
      message: 'Опишите задачу',
    };
    addChatMessage(questions[chatStep]);
    chatInput.placeholder = placeholders[chatStep] || 'Введите ответ';
    chatForm.hidden = chatStep === 'service';
    setQuickReplies(chatStep === 'service'
      ? ['Создание сайта', 'Web-аудит', 'Бизнес-анализ', 'Системный анализ', 'Другое']
      : []);
  }

  async function finishChat() {
    chatForm.hidden = true;
    setQuickReplies();
    addChatMessage('Спасибо! Передаю данные оператору…');

    try {
      const result = await submitLead(chatLead);
      addChatMessage(result.delivered
        ? 'Готово! Мы получили заявку и скоро свяжемся с вами.'
        : 'Я подготовил письмо с заявкой. Отправьте его в открывшемся почтовом приложении — и оператор скоро свяжется с вами.');
    } catch (error) {
      addChatMessage('Не удалось отправить данные. Напишите нам на hello@novatech.ru — мы обязательно ответим.');
    }

    setQuickReplies(['Начать заново']);
    chatStep = 'done';
  }

  function handleChatAnswer(value) {
    const answer = value.trim();
    if (!answer) return;

    if (chatStep === 'contact' && !isValidContact(answer)) {
      addChatMessage('Проверьте контакт: укажите телефон от 10 цифр, корректный email или Telegram в формате @username.');
      chatInput.focus();
      return;
    }

    if (chatStep === 'done') {
      Object.assign(chatLead, { service: '', name: '', contact: '', message: '' });
      chatMessages.replaceChildren();
      chatStep = 'service';
      addChatMessage('Здравствуйте! Я виртуальный помощник NovaTech. Помогу передать заявку специалисту.');
      askChatQuestion();
      return;
    }

    addChatMessage(answer, 'user');
    if (chatStep === 'service') {
      chatLead.service = answer;
      chatStep = 'name';
    } else if (chatStep === 'name') {
      chatLead.name = answer;
      chatStep = 'contact';
    } else if (chatStep === 'contact') {
      chatLead.contact = answer;
      chatStep = 'message';
    } else if (chatStep === 'message') {
      chatLead.message = answer;
      finishChat();
      return;
    }
    askChatQuestion();
    chatInput.focus();
  }

  function openChat() {
    leadChat.classList.add('open');
    leadChat.setAttribute('aria-hidden', 'false');
    chatLauncher.setAttribute('aria-expanded', 'true');
    if (!chatStarted) {
      chatStarted = true;
      addChatMessage('Здравствуйте! Я виртуальный помощник NovaTech. Помогу передать заявку специалисту.');
      askChatQuestion();
    }
    (chatForm.hidden ? chatClose : chatInput).focus();
  }

  function closeChat() {
    leadChat.classList.remove('open');
    leadChat.setAttribute('aria-hidden', 'true');
    chatLauncher.setAttribute('aria-expanded', 'false');
    chatLauncher.focus();
  }

  chatLauncher.addEventListener('click', openChat);
  chatClose.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = chatInput.value;
    chatInput.value = '';
    handleChatAnswer(value);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && leadChat.classList.contains('open')) closeChat();
    if (event.key === 'Escape' && leadModal.classList.contains('open')) closeLeadModal();
  });
})();
