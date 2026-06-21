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

    const subject = encodeURIComponent(`Новая заявка NovaTech — ${lead.service || 'с сайта'}`);
    const body = encodeURIComponent([
      `Имя: ${lead.name}`,
      `Контакт: ${lead.contact}`,
      `Услуга: ${lead.service || 'Не указана'}`,
      `Задача: ${lead.message}`,
    ].join('\n'));
    window.location.href = `mailto:hello@novatech.ru?subject=${subject}&body=${body}`;
    return { delivered: false };
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
      image: 'img/service-web.jpg',
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
      image: 'img/service-business.jpg',
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
      image: 'img/service-system.jpg',
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
      image: 'img/service-development.jpg',
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
    btn.textContent = 'Отправляем…';
    btn.disabled = true;

    try {
      const result = await submitLead({
        source: 'contact-form',
        name: data.get('name'),
        contact: data.get('contact'),
        message: data.get('message'),
      });
      contactStatus.textContent = result.delivered
        ? 'Спасибо! Заявка отправлена. Скоро с вами свяжемся.'
        : 'Открылось письмо с заявкой — отправьте его, чтобы оператор получил данные.';
      contactForm.reset();
    } catch (error) {
      contactStatus.textContent = 'Не получилось отправить заявку. Напишите нам на hello@novatech.ru.';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
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
  });
})();
