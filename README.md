# 🎂 Atelier Doce & Bolo - Confeitaria Artesanal

Um site moderno, elegante e responsivo desenvolvido para uma confeitaria artesanal, trazendo um catálogo interativo de bolos gourmet e doces finos, carrinho de compras em tempo real e checkout direto integrado ao WhatsApp.

---

## 🌟 Demonstração das Funcionalidades

- **🎨 Design System & Estética Premium**: Visual refinado utilizando tons de dourado, chocolate e creme aveludado, com tipografia sofisticada (*Playfair Display* e *Montserrat*).
- **🎠 Carrosséis Dinâmicos Interativos**: Exibição em carrossel para *Bolos Artesanais* e *Doces Finos*, com suporte a arrastar/deslizar (touch/swipe) em dispositivos móveis, navegação por setas e transição automática.
- **🔍 Cardápio Completo com Filtros & Busca**:
  - Filtre produtos por categorias (*Bolos*, *Doces Finos*, *Especiais & Kits*).
  - Busca instantânea por termo de pesquisa (pesquise por recheio, nome do doce ou ingrediente).
- **🛒 Carrinho de Compras ("Seu Pedido")**:
  - Gaveta lateral (*side drawer*) ampla e fluida.
  - Adicione, aumente, diminua ou remova itens com cálculo automático de subtotal e total estimado.
  - Miniaturas ampliadas dos produtos com suporte a ampliação de imagem em modal (Lightbox).
- **📲 Checkout Integrado ao WhatsApp**: Finalize a encomenda enviando uma mensagem formatada contendo a lista completa de produtos e valores diretamente para o WhatsApp oficial da confeitaria: `(21) 97343-5115`.
- **🖼️ Visualizador Lightbox**: Clique em qualquer foto de produto para visualizá-la ampliada em alta resolução.
- **📱 100% Responsivo**: Adaptado para smartphones, tablets, notebooks e monitores ultrawide.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica com otimização para SEO.
- **CSS3 (Vanilla CSS)**: Design system baseado em Variáveis CSS (*Custom Properties*), Flexbox, CSS Grid e media queries responsivas.
- **JavaScript (ES6+)**: Lógica pura para gerenciamento do carrinho (com persistência via `localStorage`), filtro do cardápio, carrosséis e formatação de texto para o WhatsApp.
- **FontAwesome 6**: Ícones modernos para interface.
- **Google Fonts**: Fontes *Playfair Display* e *Montserrat*.

---

## 📁 Estrutura de Arquivos

```
site_doce_bolo/
├── index.html        # Página principal e estrutura HTML5
├── style.css         # Estilização completa, variáveis de design e media queries
├── script.js         # Lógica do carrinho, carrosséis, busca e WhatsApp
├── README.md         # Documentação e guia do projeto
├── logo_img/         # Logo e marca do Atelier
├── bolos_img/        # Imagens dos bolos artesanais
└── doces_img/        # Imagens dos doces finos, brigadeiros e sobremesas
```

---

## 🚀 Como Executar o Projeto

1. Clone ou baixe este repositório para o seu computador.
2. Abra o arquivo `index.html` em qualquer navegador de sua preferência (Chrome, Edge, Firefox, Safari).
3. *(Opcional)* Se desejar rodar em um servidor local:
   ```bash
   # Exemplo com Python
   python -m http.server 8080
   ```
   Em seguida, acesse `http://localhost:8080` no navegador.

---

## ✒️ Créditos & Autoria

Desenvolvido por **oivasadrecal**.
