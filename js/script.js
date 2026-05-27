// script.js — funcionalidades principais

(function () {
  'use strict';

  // Seletores principais
  const selectors = {
    hero: '#hero',
    catalog: '#catalog',
    cardsGrid: '.cards-grid'
  };

  // Estado da aplicação
  const state = {
    items: []
  };

  // Cache de elementos
  let ui = {};

  function cacheUI() {
    ui.hero = document.querySelector(selectors.hero);
    ui.catalog = document.querySelector(selectors.catalog);
    ui.cardsGrid = document.querySelector(selectors.cardsGrid);
  }

  // Eventos
  function bindEvents() {
    initCardTrailers();
  }

  // Sistema de trailers
  function initCardTrailers() {

    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {

      const trailerElement = card.querySelector('.card-trailer');

      let hoverTimeout = null;

      card.addEventListener('mouseenter', () => {

        hoverTimeout = setTimeout(() => {

          if (trailerElement) {

            trailerElement.load();

            trailerElement.play().catch((e) => {
              console.warn('Erro ao reproduzir trailer:', e);
            });

            trailerElement.classList.add('visible');

          }

        }, 3000);

      });

      card.addEventListener('mouseleave', () => {

        clearTimeout(hoverTimeout);

        if (trailerElement) {

          trailerElement.pause();
          trailerElement.currentTime = 0;
          trailerElement.classList.remove('visible');

        }

      });

    });

  }

  // Inicialização
  function init() {
    cacheUI();
    bindEvents();
  }

  // Exposição global
  window.StreamUI = {
    init
  };

  // Inicializa automaticamente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
