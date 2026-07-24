// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Contact form -> Formspree
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      var data = new FormData(form);

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          status.textContent = 'Thanks — your inquiry has been sent. We\'ll get back to you shortly.';
          status.className = 'form-status show ok';
          form.reset();
        } else {
          status.textContent = 'Something went wrong sending your message. Please email info@mailworks.com directly.';
          status.className = 'form-status show err';
        }
      }).catch(function () {
        status.textContent = 'Something went wrong sending your message. Please email info@mailworks.com directly.';
        status.className = 'form-status show err';
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send inquiry';
      });
    });
  }
});
