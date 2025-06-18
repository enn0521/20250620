document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.endsWith("shop.html")) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    console.log("type:", type);

    const subtype = params.get("subtype");

    const h1 = document.querySelector("#type-h1-text h1");
    if (h1) {
      if (type && type !== "All") {
        h1.innerHTML = type;
      } else {
        h1.innerHTML = "";
      }
    }

    const subTypeMap = {
      上身類: ["短袖", "長袖", "休閒外套"],
      下身類: ["短褲", "長褲", "裙子"],
      配件: ["包包", "眼鏡", "帽子", "項鍊", "圍巾", "鞋子", "襪子", "領帶"],
      其他: ["口罩", "雨傘", "內褲"],
    };

    const subtypes = subTypeMap[type] || [];
    const container = document.getElementById("type-list-container");
    container.innerHTML = "";

    if (subtypes.length > 0) {
      if (window.innerWidth >= 900) {
        for (let i = 0; i < subtypes.length; i += 10) {
          const row = document.createElement("div");
          row.className = "row";
          subtypes.slice(i, i + 10).forEach((sub) => {
            const btn = document.createElement("div");
            btn.className = "type-btn";
            btn.textContent = sub;
            btn.onclick = () => {
              window.location.href = `products.html?type=${encodeURIComponent(
                type
              )}&subtype=${encodeURIComponent(sub)}`;
            };
            row.appendChild(btn);
          });
          container.appendChild(row);
        }
      } else {
        const row = document.createElement("div");
        row.className = "row";
        subtypes.forEach((sub) => {
          const btn = document.createElement("div");
          btn.className = "type-btn";
          btn.textContent = sub;
          btn.onclick = () => {
            window.location.href = `products.html?type=${encodeURIComponent(
              type
            )}&subtype=${encodeURIComponent(sub)}`;
          };
          row.appendChild(btn);
        });
        container.appendChild(row);
      }
    }
    return;
  }

  if (path.endsWith("products.html")) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const subtype = params.get("subtype");

    const h1 = document.querySelector("#product-h1-text h1");
    if (h1) {
      if (!type || type === "All") {
        h1.textContent = "All";
      } else if (subtype) {
        h1.textContent = `${subtype}`;
      } else if (type) {
        h1.textContent = type;
      }
    }

    let apiUrl = "http://localhost:3000/api/products?table=products";
    if (type && type !== "全部") {
      apiUrl += `&type=${encodeURIComponent(type)}`;
      if (subtype) {
        apiUrl += `&subtype=${encodeURIComponent(subtype)}`;
      }
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((products) => {
        let favoriteIds = [];
        const userId = localStorage.getItem("userId");
        function fetchFavorites() {
          if (!userId) return Promise.resolve([]);
          return fetch(
            `http://localhost:3000/api/favorites?userId=${encodeURIComponent(
              userId
            )}`
          )
            .then((res) => res.json())
            .then((list) =>
              Array.isArray(list) ? list.map((item) => item.id) : []
            );
        }

        fetchFavorites().then((ids) => {
          favoriteIds = ids;

          const container = document.getElementById("product-list-container");
          const resultCount = document.getElementById("result-count");
          if (resultCount) {
            resultCount.innerHTML = "";
          }

          const itemsPerPage = 20;
          let currentPage = 1;
          const totalPages = Math.ceil(products.length / itemsPerPage);

          const modal = document.getElementById("modal");
          const modalContent = modal.querySelector(".modal__content");
          const modalClose = modal.querySelector(".modal__close");
          const modalTitle = modalContent.querySelector("h3");
          const favoriteBtn = modalContent.querySelector(".favorite-btn");
          const cartBtn = modalContent.querySelector(".cart-btn");
          let currentProductId = null;

          function renderPage(page) {
            container.innerHTML = "";
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageItems = products.slice(start, end);
            pageItems.forEach((product, idx) => {
              const isFav = favoriteIds.includes(product.id);
              container.innerHTML += `
                <div class="product-item" data-id="${product.id}" data-name="${
                product.name
              }" data-img="${product.img}" data-price="${product.price}">
                  <div class="img-container">
                    <img src="${product.img}"/>
                  </div>
                  <div class="product-header">
                    <h3 class="product-name" title="${product.name}">${
                product.name
              }</h3>
                    <i class="fi fi-rr-star${isFav ? " favorite" : ""}"></i>
                  </div>
                  <div class="product-footer">
                    <p class="product-price">NT$ ${product.price}</p>
                    <i class="fi fi-rr-shopping-cart-add"></i>
                  </div>
                </div>
              `;
            });
            renderPagination();
            container.querySelectorAll(".product-item").forEach((item, idx) => {
              item.addEventListener("click", function (e) {
                if (
                  e.target.classList.contains("fi-rr-star") ||
                  e.target.classList.contains("fi-rr-shopping-cart-add")
                ) {
                  return;
                }
                modal.classList.add("show");
                document.body.style.overflow = "hidden";
                modalTitle.textContent = this.dataset.name;
                currentProductId =
                  products[(currentPage - 1) * itemsPerPage + idx].id;

                if (favoriteBtn) {
                  favoriteBtn.classList.remove("favorite");
                  if (favoriteIds.includes(currentProductId)) {
                    favoriteBtn.classList.add("favorite");
                    favoriteBtn.textContent = "取消收藏";
                  } else {
                    favoriteBtn.textContent = "加入收藏";
                  }
                }
              });
            });
          }

          function renderPagination() {
            let pagination = document.getElementById("pagination");
            if (!pagination) {
              pagination = document.createElement("div");
              pagination.id = "pagination";
              pagination.style.textAlign = "center";
              pagination.style.margin = "20px 0";
              container.parentNode.appendChild(pagination);
            }
            pagination.innerHTML = "";
            for (let i = 1; i <= totalPages; i++) {
              const btn = document.createElement("button");
              btn.textContent = i;
              btn.className =
                "page-button" + (i === currentPage ? " active" : "");
              btn.onclick = () => {
                currentPage = i;
                renderPage(currentPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              };
              pagination.appendChild(btn);
            }
          }

          if (cartBtn) {
            cartBtn.addEventListener("click", function () {
              const userId = localStorage.getItem("userId");
              if (!userId) {
                alert("請先登入會員");
                return;
              }
              if (!currentProductId) {
                alert("找不到商品資訊");
                return;
              }
              fetch("http://localhost:3000/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId: currentProductId }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    if (typeof loadCartItems === "function") loadCartItems();
                    alert("已加入購物車！");
                    closeModalWithFade(true);
                  } else {
                    alert(data.msg || data.error || "加入失敗");
                  }
                })
                .catch(() => {
                  alert("伺服器錯誤，請稍後再試");
                });
            });
          }

          if (favoriteBtn) {
            favoriteBtn.addEventListener("click", function () {
              const userId = localStorage.getItem("userId");
              if (!userId) {
                alert("請先登入會員");
                return;
              }
              if (!currentProductId) {
                alert("找不到商品資訊");
                return;
              }

              const isRemoving = favoriteBtn.classList.contains("favorite");

              const method = isRemoving ? "DELETE" : "POST";

              fetch("http://localhost:3000/api/favorites", {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId: currentProductId }),
              })
                .then((res) => res.json())
                .then((data) => {
                  favoriteBtn.disabled = false;
                  if (isRemoving) {
                    favoriteBtn.classList.remove("favorite");
                    favoriteBtn.textContent = "加入收藏";
                    const index = favoriteIds.indexOf(currentProductId);
                    if (index > -1) {
                      favoriteIds.splice(index, 1);
                    }
                  } else {
                    favoriteBtn.classList.add("favorite");
                    favoriteBtn.textContent = "取消收藏";
                    if (!favoriteIds.includes(currentProductId)) {
                      favoriteIds.push(currentProductId);
                    }
                  }

                  document
                    .querySelectorAll(
                      `.product-item[data-id="${currentProductId}"] .fi-rr-star`
                    )
                    .forEach((i) => {
                      if (isRemoving) {
                        i.classList.remove("favorite");
                      } else {
                        i.classList.add("favorite");
                      }
                    });
                })
                .catch(() => {
                  alert("伺服器錯誤，請稍後再試");
                });
            });
          }

          function closeModalWithFade(scrollTop = false) {
            modal.classList.add("hide");
            setTimeout(() => {
              modal.classList.remove("show", "hide");
              document.body.style.overflow = "";
              if (scrollTop) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }, 500);
          }

          modalClose.onclick = function () {
            closeModalWithFade(false);
          };
          modal.onclick = function (e) {
            if (e.target === modal) closeModalWithFade(false);
          };
          modalContent.onclick = function (e) {
            e.stopPropagation();
          };

          renderPage(currentPage);
        });
      });
    return;
  }

  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("page-button")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});

let allProducts = [];

if (window.location.pathname.endsWith("favorites.php")) {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/products?table=products")
      .then((res) => res.json())
      .then((data) => {
        allProducts = data;
        renderFavoritesList();
      });
  });
}

function renderFavoritesList() {
  let userId = localStorage.getItem("userId");
  const container = document.getElementById("favorites-list-container");
  if (!container) return;
  if (!userId || !/^\d+$/.test(userId)) {
    container.innerHTML = "<p>請先登入會員才能查看收藏清單。</p>";
    console.log("userId not found or invalid in localStorage:", userId);
    return;
  }
  const url =
    "http://localhost:3000/api/favorites?userId=" + encodeURIComponent(userId);
  console.log("fetching favorites from:", url);
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("HTTP status " + res.status);
      }
      return res.json();
    })
    .then((list) => {
      console.log("favorites list:", list);
      container.innerHTML = "";
      if (!Array.isArray(list) || list.length === 0) {
        container.innerHTML = "";
        return;
      }
      list.forEach((item) => {
        const div = document.createElement("div");
        div.className = "favorite-item";
        div.innerHTML = `
          <div class="favorite-item-left">
            <img src="${item.img}" alt="" />
          </div>
          <div class="favorite-item-right">
            <div class="favorite-item-info">
              <p>${item.name}</p>
            </div>
            <div class="removed-favorite-item">
              <button type="button" data-id="${item.id}">
                <i class="fi fi-rr-cross-small"></i>
              </button>
            </div>
          </div>
        `;
        div.addEventListener("click", function (e) {
          if (
            e.target.closest(".removed-favorite-item") ||
            e.target.tagName === "BUTTON" ||
            e.target.tagName === "I"
          ) {
            return;
          }
          const product = allProducts.find(
            (p) => String(p.id) === String(item.id)
          );
          if (product && product.type && product.subtype) {
            window.location.href = `products.html?type=${encodeURIComponent(
              product.type
            )}&subtype=${encodeURIComponent(product.subtype)}#product-${
              item.id
            }`;
          } else if (product && product.type) {
            window.location.href = `products.html?type=${encodeURIComponent(
              product.type
            )}#product-${item.id}`;
          } else {
            window.location.href = `products.html`;
          }
        });
        container.appendChild(div);
      });
      container
        .querySelectorAll(".removed-favorite-item button")
        .forEach((btn) => {
          btn.addEventListener("click", function (event) {
            event.stopPropagation();
            const productId = this.getAttribute("data-id");
            const itemDiv = this.closest(".favorite-item");
            fetch("http://localhost:3000/api/favorites", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId, productId }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  itemDiv.classList.add("fade-out");
                  setTimeout(() => {
                    itemDiv.remove();
                  }, 900);
                }
              });
          });
        });
    })
    .catch((err) => {
      container.innerHTML = `<p>載入失敗，請稍後再試。<br>${err}</p>`;
      console.error("fetch favorites error:", err);
    });
}

if (window.location.pathname.endsWith("favorites.php")) {
  document.addEventListener("DOMContentLoaded", renderFavoritesList);
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const loading = document.getElementById("loading-screen");
    if (loading) loading.classList.add("fade-out");
  }, 500);
});

function login() {
  document.getElementById("not-login-content").classList.add("hidden");
  document.getElementById("member-content").classList.remove("hidden");
}

function logout() {
  document.getElementById("member-content").classList.add("hidden");
  document.getElementById("not-login-content").classList.remove("hidden");
}

document.getElementById("upd-btn")?.addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const birth = document.getElementById("birth").value.trim();
  if (!name || !email) {
    alert("請填寫完整資訊");
    return;
  }
  fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      action: "update",
      name,
      email,
      password,
      birth,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      if (data.success) location.reload();
    });
});

document.getElementById("del-btn")?.addEventListener("click", function () {
  if (!confirm("確定是否刪除帳號？")) return;
  fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ action: "delete" }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      if (data.success) {
        localStorage.removeItem("userId");
        window.location.href = "login.php";
      }
    });
});

fetch("footer.html")
  .then((res) => res.text())
  .then(
    (html) => (document.getElementById("footer-container").innerHTML = html)
  );

document.getElementById("search-button").addEventListener("click", () => {
  window.location.href = "#";
});

document.getElementById("login-button").addEventListener("click", () => {
  window.location.href = "login.php";
});

document.getElementById("favorites-button").addEventListener("click", () => {
  window.location.href = "favorites.php";
});
