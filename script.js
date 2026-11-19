const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('open', !isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    siteNav.classList.remove('open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const filterButtons = [...document.querySelectorAll('.filter-button')];
const projectCards = [...document.querySelectorAll('.project-card')];
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

const quoteForm = document.querySelector('#quote-form');
const briefOutput = document.querySelector('#brief-output');
const briefText = document.querySelector('#brief-text');
const copyStatus = document.querySelector('.copy-status');

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) {
    quoteForm.querySelector(':invalid')?.focus();
    return;
  }
  const data = new FormData(quoteForm);
  const value = (key) => String(data.get(key) || '').trim() || 'Not provided';
  const brief = [
    'SECURITY ENQUIRY BRIEF',
    `Name: ${value('name')}`,
    `Organisation: ${value('organisation')}`,
    `Email: ${value('email')}`,
    `Phone: ${value('phone')}`,
    `Service: ${value('service')}`,
    `Event city: ${value('location')}`,
    `Event date: ${value('date')}`,
    `Expected attendance: ${value('attendance')}`,
    `Requirements: ${value('details')}`
  ].join('\n');
  briefText.textContent = brief;
  briefOutput.hidden = false;
  copyStatus.textContent = 'Review this brief, then copy it to share with the agency.';
  briefOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.querySelector('#copy-brief').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(briefText.textContent);
    copyStatus.textContent = 'Brief copied to clipboard.';
  } catch {
    const selection = document.createRange();
    selection.selectNodeContents(briefText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(selection);
    copyStatus.textContent = 'Select and copy the highlighted brief.';
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("article, section > div");
  elements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach((el) => observer.observe(el));
});document.documentElement.classList.add('js-motion');
const motionTargets = document.querySelectorAll('.section-heading, .human-photo, .human-copy, .capability-card, .approach-copy, .steps-card, .industry-grid span, .location-panel, .quote-intro, .inquiry-form, .faq-list details');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('motion-reveal', 'is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  motionTargets.forEach((element, index) => {
    element.style.setProperty('--motion-delay', `${Math.min(index % 4, 3) * 75}ms`);
    element.classList.add('motion-reveal');
    motionObserver.observe(element);
  });
}


