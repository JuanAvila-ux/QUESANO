(() => {
  const products = F;
  const cart = new Map();
  const drawer = document.getElementById('drawer');
  const panel = drawer.querySelector('.drawer-panel');
  const items = document.getElementById('items');
  const count = document.getElementById('cnt');
  const total = document.getElementById('ctot');
  const cartLink = document.getElementById('cwa');
  const cartButton = document.getElementById('fabCart');

  function getItems() {
    return [...cart.entries()].map(([index, quantity]) => ({
      index,
      quantity,
      product: products[index]
    }));
  }

  function getTotal() {
    return getItems().reduce((sum, item) => sum + item.quantity * P, 0);
  }

  function render() {
    const cartItems = getItems();
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = getTotal();

    count.textContent = itemCount;
    total.textContent = fmt(cartTotal);
    items.replaceChildren();

    if (!cartItems.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.setAttribute('role', 'status');

      const message = document.createElement('p');
      message.textContent = 'Tu canasta está vacía. Agrega un producto para comenzar.';

      const catalogLink = document.createElement('a');
      catalogLink.className = 'btn';
      catalogLink.href = '#catalogo';
      catalogLink.textContent = 'Agregar producto';

      empty.append(message, catalogLink);
      items.append(empty);
      return;
    }

    for (const item of cartItems) {
      const row = document.createElement('div');
      row.className = 'it';

      const description = document.createElement('div');
      const name = document.createElement('b');
      name.textContent = item.product.full;
      const details = document.createElement('small');
      details.textContent = `${fmt(P)} por unidad · 500 g`;
      description.append(name, details);

      const quantity = document.createElement('div');
      quantity.className = 'q';

      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.dataset.cartAction = 'remove';
      removeButton.dataset.product = item.index;
      removeButton.setAttribute('aria-label', `Quitar ${item.product.full}`);
      removeButton.textContent = '−';

      const amount = document.createElement('b');
      amount.textContent = item.quantity;

      const addButton = document.createElement('button');
      addButton.type = 'button';
      addButton.dataset.cartAction = 'add';
      addButton.dataset.product = item.index;
      addButton.setAttribute('aria-label', `Agregar ${item.product.full}`);
      addButton.textContent = '+';

      quantity.append(removeButton, amount, addButton);
      row.append(description, quantity);
      items.append(row);
    }

    cartLink.href = '#pedido';
  }

  function add(productIndex, amount = 1) {
    if (!Number.isInteger(productIndex) || !products[productIndex] || !Number.isInteger(amount)) {
      return;
    }

    const quantity = (cart.get(productIndex) || 0) + amount;
    if (quantity > 0) {
      cart.set(productIndex, quantity);
    } else {
      cart.delete(productIndex);
    }
    render();
  }

  function open(force = !drawer.classList.contains('open')) {
    drawer.classList.toggle('open', force);
    drawer.setAttribute('aria-hidden', String(!force));
    cartButton.setAttribute('aria-expanded', String(force));
    if (force) panel.focus();
  }

  items.addEventListener('click', event => {
    if (event.target.closest('.empty-state a')) {
      open(false);
      return;
    }

    const button = event.target.closest('button[data-cart-action]');
    if (!button) return;

    const productIndex = Number(button.dataset.product);
    add(productIndex, button.dataset.cartAction === 'add' ? 1 : -1);
  });

  cartButton.addEventListener('click', () => open());
  cartLink.addEventListener('click', () => open(false));
  drawer.addEventListener('click', event => {
    if (event.target === drawer) open(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('open')) open(false);
  });

  window.quesanoCart = { add, getItems, getTotal, open };
  drawer.setAttribute('aria-hidden', 'true');
  render();
})();
