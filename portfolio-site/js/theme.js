// Controle de tema claro / escuro e sidebar mobile

const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalCloseBtn = document.getElementById('modal-close');

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Inicializa tema salvo no localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Toggle tema quando o botão for clicado
themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Toggle sidebar mobile
sidebarToggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Fecha sidebar clicando fora (mobile)
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// PORTFÓLIO - abrir modal com dados da imagem clicada
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    openModal(item);
  });
  item.addEventListener('keypress', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(item);
    }
  });
});

function openModal(item) {
  const title = item.getAttribute('data-title');
  const desc = item.getAttribute('data-desc');
  const imgSrc = item.getAttribute('data-img');

  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalImg.src = imgSrc;
  modalImg.alt = title;

  modal.classList.add('show');
  modalCloseBtn.focus();
}

// Fecha modal ao clicar no X ou fora do conteúdo
modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// Fecha modal com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
  }
});

// FORMULÁRIO - validação simples
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!form.checkValidity()) {
    formMessage.textContent = 'Por favor, preencha todos os campos corretamente.';
    formMessage.style.color = 'red';
    return;
  }

  // Aqui você pode enviar os dados via AJAX, API, ou outro método
  formMessage.textContent = 'Mensagem enviada com sucesso! Obrigado.';
  formMessage.style.color = 'green';
  form.reset();
});
