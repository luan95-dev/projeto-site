// login.js — script leve para redirecionar após login
(function () {
  'use strict';

  function init() {
    const form = document.querySelector('.login-form');
    if (!form) return;

    form.addEventListener('submit', handleSubmit);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // redireciona para a página principal após o envio do formulário
    window.location.href = 'index.html';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
