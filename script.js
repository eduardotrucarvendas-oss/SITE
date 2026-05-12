const WHATSAPP_NUMBER = '5548988337910';

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealElements.forEach((el) => observer.observe(el));

const whatsLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsLinks.forEach((link) => {
  const currentUrl = new URL(link.href);
  currentUrl.pathname = `/${WHATSAPP_NUMBER}`;

  const customMessage = link.dataset.whatsappMessage;
  if (customMessage) {
    currentUrl.searchParams.set('text', customMessage);
  }

  link.href = currentUrl.toString();
});

const form = document.getElementById('leadForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const text = `Olá! Me chamo ${nome}.\nEmpresa: ${empresa}\nTelefone: ${telefone}\nMensagem: ${mensagem || 'Gostaria de solicitar um orçamento.'}`;
    const url = buildWhatsAppLink(text);

    window.open(url, '_blank');
    form.reset();
  });
}
