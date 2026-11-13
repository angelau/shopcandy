
document.addEventListener("DOMContentLoaded", async () => {

  updateCartBadge();

  
  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
   
    let allProducts = await ShopCandyData.getProducts();
    let visibleProducts = allProducts.filter(p => !p.hidden);
    renderProducts(visibleProducts);

   
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");

    async function filterProducts() {
      const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
      const category = categoryFilter ? categoryFilter.value : "All";

  
      let freshProducts = await ShopCandyData.getProducts();
      let filtered = freshProducts.filter(p => !p.hidden);

      // Filter by Category
      if (category !== "All") {
        filtered = filtered.filter(p => p.category === category);
      }

      // Filter by Search query (Name or Description)
      if (query) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query)
        );
      }

      renderProducts(filtered);
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterProducts);
    }
    if (categoryFilter) {
      categoryFilter.addEventListener("change", filterProducts);
    }
  }
});

// Render Product Grid HTML
function renderProducts(products) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--border-color);"></i>
        <p>No preorder products found matching your search.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => `
    <div class="product-card" onclick="viewProduct('${product.id}')" style="cursor: pointer;">
      <span class="badge">${product.badge || 'Preorder'}</span>
      <img src="${product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'}" alt="${product.name}" class="product-thumb" loading="lazy">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">${ShopCandyData.formatNaira(product.price)}</div>
        <button class="btn btn-primary" style="min-height: 38px; padding: 0.4rem 1rem; font-size: 0.85rem;" onclick="event.stopPropagation(); viewProduct('${product.id}')">View Preorder</button>
      </div>
    </div>
  `).join("");
}


function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}


function updateCartBadge() {
  const cartBadge = document.getElementById("cart-count");
  if (!cartBadge) return;
  const cart = ShopCandyData.getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalCount;
}