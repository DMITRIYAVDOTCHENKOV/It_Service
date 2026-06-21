(function () {
  const toast = document.getElementById('siteToast');
  let timer;

  function showToast(message) {
    if (!toast) return;
    clearTimeout(timer);
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');
    timer = setTimeout(() => {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 5000);
  }

  document.querySelectorAll('[data-messenger]').forEach((button) => {
    button.addEventListener('click', () => {
      showToast(`${button.dataset.messenger}: канал связи находится в разработке.`);
    });
  });
})();
