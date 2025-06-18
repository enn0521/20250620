document.addEventListener("DOMContentLoaded", () => {
  const cartPanel = document.getElementById("cart-panel");
  const cartButton = document.getElementById("cart-button");

  function loadCartContent() {
    fetch("cart.html")
      .then((res) => res.text())
      .then((html) => {
        cartPanel.innerHTML = html;
        const closeBtn = cartPanel.querySelector("#close-cart");
        if (closeBtn) {
          closeBtn.onclick = closeCart;
        }
        loadCartItems();
      });
  }

  function openCart() {
    loadCartContent();
    cartPanel.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartPanel.classList.remove("open");
    document.body.style.overflow = "";
  }

  function openCartPanel() {
    document.getElementById("cart-panel").classList.add("open");
    loadCartItems();
  }

  function closeCartPanel() {
    document.getElementById("cart-panel").classList.remove("open");
  }

  function loadCartItems() {
    const userId = localStorage.getItem("userId");
    const container = document.querySelector(".cart-items-container");
    if (!container) return;
    if (!userId) {
      container.innerHTML = "<p>購物車內無商品。</p>";
      return;
    }
    fetch(`http://localhost:3000/api/cart?userId=${encodeURIComponent(userId)}`)
      .then((res) => res.json())
      .then((items) => {
        if (!items.length) {
          container.innerHTML = "<p>購物車內無商品。</p>";
          return;
        }
        container.innerHTML = items
          .map(
            (item) => `
              <div class="cart-item">
                <div class="cart-item-left">
                  <img src="${item.img}" alt="${item.name}" />
                </div>
                <div class="cart-item-right">
                  <div class="cart-item-info">
                    <div>${item.name}</div>
                  </div>
                  <div class="removed-favorite-item">
                    <button class="remove-cart-btn" data-id="${item.id}" title="移除">
                      <i class="fi fi-rr-cross-small"></i>
                    </button>
                  </div>
                </div>
              </div>
            `
          )
          .join("");
        container.querySelectorAll(".remove-cart-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            const cartItem = this.closest(".cart-item");
            cartItem.classList.add("fade-out");
            fetch("http://localhost:3000/api/cart", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId, productId }),
            })
              .then((res) => res.json())
              .then(() => {
                setTimeout(() => {
                  cartItem.remove();
                  if (!container.querySelector(".cart-item")) {
                    loadCartItems();
                  }
                }, 900);
              });
          });
        });
      });
  }

  cartButton.addEventListener("click", (e) => {
    e.stopPropagation();
    openCart();
  });

  document.addEventListener("click", (e) => {
    if (
      cartPanel.classList.contains("open") &&
      !cartPanel.contains(e.target) &&
      e.target !== cartButton
    ) {
      closeCart();
    }
  });

  cartPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
