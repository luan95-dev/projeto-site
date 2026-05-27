// script.js — ponto de entrada para funcionalidades futuras
// Código organizado para evitar poluição do escopo global

(function () {
  'use strict';

  // Seletores principais centralizados
  const selectors = {
    hero: '#hero',
    catalog: '#catalog',
    cardsGrid: '.cards-grid'
  };

  // Estado da aplicação (placeholder para futuro)
  const state = {
    items: [] // lista de filmes/séries
  };

  // Inicialização: executa quando o DOM estiver pronto
  function init() {
    cacheUI();
    bindEvents();
    // Carregar dados iniciais (placeholder)
    // fetchCatalog();
  }

  // Cacheia elementos do DOM que serão frequentemente usados
  let ui = {};
  function cacheUI() {
    ui.hero = document.querySelector(selectors.hero);
    ui.catalog = document.querySelector(selectors.catalog);
    ui.cardsGrid = document.querySelector(selectors.cardsGrid);
  }

  // Aceita futuras ligações de eventos (busca, filtros, etc.)
  function bindEvents() {
    // Inicializa sistema de trailers nos cards
    initCardTrailers();
    // exemplo:
    // document.querySelector('.search-btn')?.addEventListener('click', onSearchClick);
  }

  // Sistema de exibição de trailers com delay de 3 segundos (estilo Netflix)
  function initCardTrailers() {
    const cards = document.querySelectorAll('.card');
    const trailerState = new Map(); // controla estado de cada card

    cards.forEach((card) => {
      const trailerElement = card.querySelector('.card-trailer');
      let hoverTimeout = null;

      card.addEventListener('mouseenter', () => {
        // Aguarda 3 segundos antes de mostrar o trailer
        hoverTimeout = setTimeout(() => {
          if (trailerElement && trailerElement.src) {
            // Garante que o vídeo toca em mute e modo automático
            trailerElement.play().catch((e) => console.warn('Erro ao reproduzir trailer:', e));
            trailerElement.classList.add('visible');
            trailerState.set(card, true);
          }
        }, 2000); // 2 segundos
      });

      card.addEventListener('mouseleave', () => {
        // Cancela timeout se mouse sair antes de 2 segundos
        clearTimeout(hoverTimeout);

        // Para o trailer e remove a visibilidade
        if (trailerElement) {
          trailerElement.pause();
          trailerElement.currentTime = 0;
          trailerElement.classList.remove('visible');
          trailerState.set(card, false);
        }
      });
    });
  }

  // Função para adicionar trailers manualmente (chamada após definir URLs no HTML)
  window.StreamUI.setTrailer = function (cardIndex, trailerUrl, fileFormat = 'mp4') {
    const cards = document.querySelectorAll('.card');
    if (!cards[cardIndex]) return console.error('Card não encontrado');
    const video = cards[cardIndex].querySelector('.card-trailer');
    if (video) {
      video.src = trailerUrl;
      video.type = `video/${fileFormat}`;
    }
  };

  // Exemplo de função assíncrona preparada para buscar catálogo
  async function fetchCatalog() {
    try {
      // placeholder: buscar de uma API ou arquivo local
      // const res = await fetch('/api/catalog');
      // state.items = await res.json();
      renderCatalog();
    } catch (err) {
      // tratar erro de forma elegante
      console.error('Erro ao carregar catálogo', err);
    }
  }

  // Render básico do catálogo a partir do estado
  function renderCatalog() {
    if (!ui.cardsGrid) return;
    ui.cardsGrid.innerHTML = state.items.map(itemToCard).join('');
  }

  // Converte um item de dados em HTML (evitar XSS ao inserir conteúdo real)
  function itemToCard(item) {
    return `
      <article class="card">
        <img class="card-image" src="${item.image || 'assets/images/card-1.jpg'}" alt="${escapeHtml(item.title)}">
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-meta">${escapeHtml(item.year)} • ${escapeHtml(item.type)}</p>
        </div>
      </article>
    `;
  }

  // Função simples para escapar HTML ao inserir strings
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (s) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[s];
    });
  }

  // Expõe apenas init (se futuro módulo quiser chamar)
  window.StreamUI = {
    init,
    setTrailer: function () {} // placeholder (será definido em initCardTrailers)
  };

  // Inicializa automaticamente quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
