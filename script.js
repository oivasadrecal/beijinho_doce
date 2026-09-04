/* ==========================================================================
   ATELIER DOCE & BOLO - JAVASCRIPT LOGIC
   Carrosséis Dinâmicos, Carrinho de Compras & Checkout WhatsApp
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Database de Produtos (Mapeamento de Imagens)
     -------------------------------------------------------------------------- */
  const PRODUCTS = [
    // === BOLOS ===
    {
      id: 'bolo-01',
      name: 'Bolo Caseiro Especiais de Ninho',
      category: 'bolos',
      price: 85.00,
      badge: 'Mais Pedido',
      image: 'bolos_img/WhatsApp Image 2026-09-01 at 15.49.39 (2).jpeg',
      description: 'Massa super fofinha com recheio cremoso de Leite Ninho, cobertura aveludada e toque especial da casa.'
    },
    {
      id: 'bolo-02',
      name: 'Bolo Festivo Red Velvet & Ninho',
      category: 'bolos',
      price: 120.00,
      badge: 'Lançamento',
      image: 'bolos_img/bolo01.png',
      description: 'Clássica massa Red Velvet com veludo vermelho, recheada com cream cheese e Ninho refinado.'
    },
    {
      id: 'bolo-03',
      name: 'Bolo Gourmet Chocolate Supremo',
      category: 'bolos',
      price: 110.00,
      badge: 'Chocolatudo',
      image: 'bolos_img/bolo02.jpeg',
      description: 'Bolo triplo recheio de brigadeiro gourmet 50% cacau, coberto com ganache nobre e raspas.'
    },
    {
      id: 'bolo-04',
      name: 'Bolo Aniversário Frutas Vermelhas',
      category: 'bolos',
      price: 135.00,
      badge: 'Edição Especial',
      image: 'bolos_img/bolo03.jpeg',
      description: 'Massa de pão de ló de baunilha, recheio de creme patissière e geleia artesanal de frutas frescas.'
    },
    {
      id: 'bolo-05',
      name: 'Bolo Tentação de Nutella & Ferrero',
      category: 'bolos',
      price: 145.00,
      badge: 'Gourmet',
      image: 'bolos_img/bolo04.jpeg',
      description: 'Recheio generoso de Nutella original, pedaços de bombom Ferrero Rocher e avelãs tostadas.'
    },

    // === DOCES FINOS ===
    {
      id: 'doce-01',
      name: 'Caixa Brigadeiros Gourmet (12 un)',
      category: 'doces',
      price: 38.00,
      badge: 'Favorito',
      image: 'doces_img/doce01.png',
      description: 'Caixa presenteável com brigadeiro tradicional, Ninho com Nutella, churros e pistache.'
    },
    {
      id: 'doce-02',
      name: 'Doces Finos para Casamento (20 un)',
      category: 'doces',
      price: 65.00,
      badge: 'Festa & Eventos',
      image: 'doces_img/doce02.png',
      description: 'Seleção requintada de doces banhados, copinhos com physalis e hóstias de amêndoas.'
    },
    {
      id: 'doce-03',
      name: 'Bombons Trufados Recheados',
      category: 'doces',
      price: 45.00,
      badge: 'Artesanal',
      image: 'doces_img/doce03.png',
      description: 'Bombons de chocolate belga recheados com maracujá, licor e caramelo salgado.'
    },
    {
      id: 'doce-04',
      name: 'Mini Tarteletes de Frutas & Limão',
      category: 'doces',
      price: 42.00,
      badge: 'Refrescante',
      image: 'doces_img/doce04.png',
      description: 'Massa sablée crocante com creme de limão siciliano ou morango fresco.'
    },
    {
      id: 'doce-05',
      name: 'Cupcakes Decorados Gourmet (4 un)',
      category: 'gourmet',
      price: 36.00,
      badge: 'Delicado',
      image: 'doces_img/doce05.png',
      description: 'Cupcakes com massa fofinha e topo trabalhado em buttercream cremoso.'
    },
    {
      id: 'doce-06',
      name: 'Macarons Franceses Sortidos (6 un)',
      category: 'gourmet',
      price: 48.00,
      badge: 'Premium',
      image: 'doces_img/doce06.png',
      description: 'Macarons com farinha de amêndoas pura. Sabores: framboesa, pistache, baunilha e cacau.'
    },
    {
      id: 'doce-07',
      name: 'Copinhos Gourmet de Colher (10 un)',
      category: 'doces',
      price: 52.00,
      badge: 'Sucesso',
      image: 'doces_img/doce07.png',
      description: 'Verrines individuais de mousse de maracujá, travessa de brigadeiro e cheesecake.'
    },
    {
      id: 'doce-08',
      name: 'Beijinhos & Surpresas de Morango',
      category: 'doces',
      price: 40.00,
      badge: 'Tradição',
      image: 'doces_img/doce08.png',
      description: 'Beijinho de coco queimado e morangos inteiros envoltos em brigadeiro branco.'
    },
    {
      id: 'doce-09',
      name: 'Kit Degustação Especial Atelier',
      category: 'gourmet',
      price: 89.00,
      badge: 'Kit Completo',
      image: 'doces_img/doce09.png',
      description: 'Uma caixinha dos sonhos contendo fatia de bolo, mini tartes, brigadeiros e macarons.'
    }
  ];

  /* --------------------------------------------------------------------------
     2. Estado do Carrinho (Cart State Management)
     -------------------------------------------------------------------------- */
  let cart = [];

  // Carregar do localStorage se existir
  try {
    const savedCart = localStorage.getItem('atelier_doce_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error('Erro ao carregar carrinho:', e);
  }

  function saveCart() {
    try {
      localStorage.setItem('atelier_doce_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Erro ao salvar carrinho:', e);
    }
  }

  function formatCurrency(val) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  }

  /* --------------------------------------------------------------------------
     3. Renderização dos Carrosséis (Bolos & Doces)
     -------------------------------------------------------------------------- */
  function renderCarousels() {
    const bolosTrack = document.getElementById('bolos-carousel-track');
    const docesTrack = document.getElementById('doces-carousel-track');

    if (bolosTrack) {
      const bolosList = PRODUCTS.filter(p => p.category === 'bolos');
      bolosTrack.innerHTML = bolosList.map(product => createProductCardHTML(product)).join('');
    }

    if (docesTrack) {
      const docesList = PRODUCTS.filter(p => p.category === 'doces' || p.category === 'gourmet');
      docesTrack.innerHTML = docesList.map(product => createProductCardHTML(product)).join('');
    }
  }

  /* --------------------------------------------------------------------------
     4. Renderização do Cardápio Completo (Catalog Grid)
     -------------------------------------------------------------------------- */
  function renderCatalog(filterCategory = 'todos', searchQuery = '') {
    const catalogGrid = document.getElementById('product-catalog-grid');
    if (!catalogGrid) return;

    let filtered = PRODUCTS;

    if (filterCategory !== 'todos') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--color-text-muted);">
          <i class="fa-solid fa-cookie-bite" style="font-size: 3rem; color: var(--color-border); margin-bottom: 12px;"></i>
          <h3>Nenhum doce encontrado</h3>
          <p>Tente buscar por outro termo ou selecione uma categoria diferente.</p>
        </div>
      `;
      return;
    }

    catalogGrid.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
  }

  function createProductCardHTML(product) {
    return `
      <div class="product-card" data-id="${product.id}">
        <span class="card-badge">${product.badge}</span>
        <div class="card-img-wrapper" onclick="openLightbox('${product.image}', '${product.name}')">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="card-zoom-overlay">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
          </div>
        </div>
        <div class="card-body">
          <span class="card-category">${product.category === 'bolos' ? '🎂 Bolo Artesanal' : '🍬 Doce Fine'}</span>
          <h3 class="card-title">${product.name}</h3>
          <p class="card-desc">${product.description}</p>
          <div class="card-footer">
            <div class="price-tag">${formatCurrency(product.price)}</div>
            <button class="add-cart-card-btn" onclick="addToCart('${product.id}')">
              <i class="fa-solid fa-plus"></i> Adicionar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     5. Lógica Interativa dos Carrosséis (Swipe, Arrows & Dots)
     -------------------------------------------------------------------------- */
  function initCarousel(wrapperId, trackId, prevBtnId, nextBtnId, dotsId) {
    const wrapper = document.getElementById(wrapperId);
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsId);

    if (!track) return;

    let currentIndex = 0;
    let cards = track.children;
    let cardWidth = 0;
    let cardsPerView = 1;
    let autoPlayTimer = null;

    function updateMetrics() {
      cards = track.children;
      if (cards.length === 0) return;

      const windowWidth = window.innerWidth;
      if (windowWidth >= 1025) {
        cardsPerView = 3;
      } else if (windowWidth >= 768) {
        cardsPerView = 2;
      } else {
        cardsPerView = 1;
      }

      const firstCard = cards[0];
      const gap = 24;
      cardWidth = firstCard.offsetWidth + gap;

      createDots();
      moveToIndex(currentIndex);
    }

    function createDots() {
      if (!dotsContainer) return;
      const totalPages = Math.max(1, cards.length - cardsPerView + 1);
      dotsContainer.innerHTML = '';

      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => moveToIndex(i));
        dotsContainer.appendChild(dot);
      }
    }

    function moveToIndex(index) {
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (index < 0) index = maxIndex;
      if (index > maxIndex) index = 0;

      currentIndex = index;
      const translateX = -(currentIndex * cardWidth);
      track.style.transform = `translateX(${translateX}px)`;

      // Atualizar Dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    // Botões Próximo e Anterior
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        moveToIndex(currentIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        moveToIndex(currentIndex + 1);
        resetAutoPlay();
      });
    }

    // Autoplay
    function startAutoPlay() {
      autoPlayTimer = setInterval(() => {
        moveToIndex(currentIndex + 1);
      }, 4500);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    }

    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
      wrapper.addEventListener('mouseleave', () => startAutoPlay());
    }

    // Eventos Touch / Drag para mobile
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          moveToIndex(currentIndex + 1);
        } else {
          moveToIndex(currentIndex - 1);
        }
      }
      isDragging = false;
    });

    window.addEventListener('resize', updateMetrics);
    setTimeout(updateMetrics, 100);
    startAutoPlay();
  }

  /* --------------------------------------------------------------------------
     6. Gerenciamento de Ações do Carrinho
     -------------------------------------------------------------------------- */
  window.addToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`"<strong>${product.name}</strong>" adicionado ao carrinho!`);
  };

  window.updateItemQty = function(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }

    saveCart();
    updateCartUI();
  };

  window.removeFromCart = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
  };

  function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Tem certeza que deseja limpar todos os itens do seu carrinho?')) {
      cart = [];
      saveCart();
      updateCartUI();
      showToast('Carrinho limpo.');
    }
  }

  function updateCartUI() {
    const badgeCount = document.getElementById('cart-badge-count');
    const floatingBadge = document.getElementById('floating-cart-badge');
    const headerItemCount = document.getElementById('cart-drawer-item-count');
    const drawerBody = document.getElementById('cart-drawer-body');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-total-val');

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (badgeCount) badgeCount.textContent = totalQuantity;
    if (floatingBadge) floatingBadge.textContent = totalQuantity;
    if (headerItemCount) headerItemCount.textContent = `(${totalQuantity} ${totalQuantity === 1 ? 'item' : 'itens'})`;

    if (subtotalEl) subtotalEl.textContent = formatCurrency(totalPrice);
    if (totalEl) totalEl.textContent = formatCurrency(totalPrice);

    if (!drawerBody) return;

    if (cart.length === 0) {
      drawerBody.innerHTML = `
        <div class="empty-cart-view">
          <div class="empty-cart-icon"><i class="fa-solid fa-basket-shopping"></i></div>
          <h4>Seu carrinho está vazio</h4>
          <p>Que tal explorar nossos bolos recheados e brigadeiros gourmet?</p>
          <a href="#cardapio-section" class="btn btn-primary" onclick="toggleCartDrawer(false)">
            <i class="fa-solid fa-utensils"></i> Ver Cardápio
          </a>
        </div>
      `;
    } else {
      drawerBody.innerHTML = `
        <div class="cart-items-list">
          ${cart.map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onclick="openLightbox('${item.image}', '${item.name}')" title="Clique para ampliar">
              <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatCurrency(item.price)} un.</div>
                <div class="cart-item-controls">
                  <button class="qty-btn" onclick="updateItemQty('${item.id}', -1)" aria-label="Diminuir quantidade">-</button>
                  <span class="qty-val">${item.quantity}</span>
                  <button class="qty-btn" onclick="updateItemQty('${item.id}', 1)" aria-label="Aumentar quantidade">+</button>
                </div>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remover item do carrinho" aria-label="Remover item">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  /* --------------------------------------------------------------------------
     7. Abrir & Fechar Carrinho (Drawer Modal)
     -------------------------------------------------------------------------- */
  function toggleCartDrawer(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');

    if (open) {
      drawer?.classList.add('active');
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      drawer?.classList.remove('active');
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.getElementById('open-cart-btn')?.addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('floating-cart-btn')?.addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('close-cart-btn')?.addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('cart-drawer-overlay')?.addEventListener('click', () => toggleCartDrawer(false));
  document.getElementById('clear-cart-btn')?.addEventListener('click', clearCart);

  /* --------------------------------------------------------------------------
     8. Finalizar Pedido no WhatsApp
     -------------------------------------------------------------------------- */
  document.getElementById('checkout-whatsapp-btn')?.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio! Adicione algum produto antes de finalizar.');
      return;
    }

    const customerName = document.getElementById('customer-name-cart')?.value.trim() || 'Cliente Especial';
    const whatsappNum = '5521973435115';

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    let message = `🎂 *NOVO PEDIDO - ATELIER DOCE & BOLO* 🎂\n`;
    message += `----------------------------------------\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `----------------------------------------\n\n`;
    message += `🛒 *ITENS DO PEDIDO:*\n`;

    cart.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      message += `• ${item.quantity}x ${item.name} (${formatCurrency(itemSubtotal)})\n`;
    });

    message += `\n----------------------------------------\n`;
    message += `💰 *TOTAL ESTIMADO:* ${formatCurrency(totalPrice)}\n`;
    message += `----------------------------------------\n`;
    message += `*Aguardando confirmação e disponibilidade de entrega!*`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNum}&text=${encodedMsg}`;

    window.open(whatsappURL, '_blank');
  });

  /* --------------------------------------------------------------------------
     9. Formulário de Contato Direto via WhatsApp
     -------------------------------------------------------------------------- */
  document.getElementById('direct-contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const date = document.getElementById('contact-date').value;
    const msg = document.getElementById('contact-msg').value.trim();
    const whatsappNum = '5521973435115';

    let text = `💌 *MENSAGEM DE CONTATO - ATELIER DOCE & BOLO*\n\n`;
    text += `👤 *Nome:* ${name}\n`;
    if (date) text += `📅 *Data do Evento:* ${date}\n`;
    text += `💬 *Mensagem:* ${msg}`;

    window.open(`https://api.whatsapp.com/send?phone=${whatsappNum}&text=${encodeURIComponent(text)}`, '_blank');
  });

  /* --------------------------------------------------------------------------
     10. Filtros & Busca do Cardápio
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      const searchVal = document.getElementById('catalog-search-input')?.value || '';
      renderCatalog(filterVal, searchVal);
    });
  });

  // Expandable Search
  const searchTrigger = document.getElementById('search-trigger-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const closeSearch = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('catalog-search-input');

  searchTrigger?.addEventListener('click', () => {
    searchOverlay?.classList.add('active');
    searchInput?.focus();
  });

  closeSearch?.addEventListener('click', () => {
    searchOverlay?.classList.remove('active');
  });

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value;
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'todos';
    renderCatalog(activeFilter, query);
  });

  /* --------------------------------------------------------------------------
     11. Lightbox de Imagens
     -------------------------------------------------------------------------- */
  window.openLightbox = function(imageSrc, captionText) {
    const modal = document.getElementById('image-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    if (!modal || !img) return;

    img.src = imageSrc;
    if (caption) caption.textContent = captionText;
    modal.classList.add('active');
  };

  document.getElementById('lightbox-close-btn')?.addEventListener('click', () => {
    document.getElementById('image-lightbox-modal')?.classList.remove('active');
  });

  document.getElementById('image-lightbox-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'image-lightbox-modal') {
      e.target.classList.remove('active');
    }
  });

  /* --------------------------------------------------------------------------
     12. Menu Mobile Drawer
     -------------------------------------------------------------------------- */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });

  // Fechar menu mobile ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });

  /* --------------------------------------------------------------------------
     13. Sistema de Notificação Toast
     -------------------------------------------------------------------------- */
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     14. Inicialização Inicial
     -------------------------------------------------------------------------- */
  renderCarousels();
  renderCatalog();
  updateCartUI();

  // Inicializar Carrosséis com delay para garantir que o DOM leu dimensões
  setTimeout(() => {
    initCarousel('bolos-carousel-wrapper', 'bolos-carousel-track', 'bolos-prev-btn', 'bolos-next-btn', 'bolos-carousel-dots');
    initCarousel('doces-carousel-wrapper', 'doces-carousel-track', 'doces-prev-btn', 'doces-next-btn', 'doces-carousel-dots');
  }, 200);

});
