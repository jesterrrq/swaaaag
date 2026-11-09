const body = document.body;
const cart = [];
const count = document.querySelector('#cart-count');
const items = document.querySelector('#cart-items');
const total = document.querySelector('#cart-total');

function formatPrice(value) { return value.toLocaleString('ru-RU') + ' ₽'; }
function renderCart() {
  count.textContent = cart.length;
  if (!cart.length) {
    items.innerHTML = '<p class="empty-cart">Здесь пока пусто.<br>Самое время это исправить.</p>';
    total.textContent = '0 ₽';
    return;
  }
  items.innerHTML = cart.map((item, index) => `<div class="cart-row"><div>${item.name}<small>1 × ${formatPrice(item.price)}</small></div><button data-remove="${index}" aria-label="Удалить">×</button></div>`).join('');
  total.textContent = formatPrice(cart.reduce((sum, item) => sum + item.price, 0));
  items.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { cart.splice(Number(button.dataset.remove), 1); renderCart(); }));
}
document.querySelector('.bag-button').addEventListener('click', () => body.classList.add('cart-open'));
document.querySelector('.cart-close').addEventListener('click', () => body.classList.remove('cart-open'));
document.querySelector('.cart-overlay').addEventListener('click', () => body.classList.remove('cart-open'));
document.querySelectorAll('.add-button').forEach(button => button.addEventListener('click', event => {
  const card = event.currentTarget.closest('.product-card');
  cart.push({ name: card.dataset.name, price: Number(card.dataset.price) });
  renderCart();
  body.classList.add('cart-open');
}));
document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => { document.querySelectorAll('.filter').forEach(item => item.classList.remove('active')); filter.classList.add('active'); const category = filter.dataset.filter; document.querySelectorAll('.product-card').forEach(card => card.classList.toggle('is-hidden', category !== 'all' && card.dataset.category !== category)); }));
document.querySelector('.newsletter form').addEventListener('submit', event => { event.preventDefault(); event.currentTarget.innerHTML = '<p style="font:12px DM Mono;padding:15px 0;margin:0">Спасибо. Вы в списке NOVA.</p>'; });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
