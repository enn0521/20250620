<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>收藏清單</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="icon" href="icon/web_icon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="icon/web_icon.ico" type="image/x-icon" />
    <link
      rel="stylesheet"
      href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
    />
  </head>

  <body>
    <div id="loading-screen">
      <div class="spinner"></div>
    </div>

    <?php session_start(); ?>
    <nav>
      <div id="nav-news"></div>
      <div id="nav-bar">
        <div class="nav-mobile-left">
          <a href="#"><i class="fi-rr-search"></i></a>
        </div>
        <div id="logo-container">
          <a href="index.html">SHOP</a>
        </div>
        <div class="nav-mobile-right">
          <a href="login.php"><i class="fi-rr-user"></i></a>
        </div>
        <div id="nav-links">
          <button id="search-button"><i class="fi-rr-search"></i></button>
          <button id="login-button"><i class="fi-rr-user"></i></button>
          <button id="favorites-button"><i class="fi-rr-star"></i></button>
          <button id="cart-button">
            <i class="fi fi-rr-shopping-bag"></i>
          </button>
        </div>
      </div>
      <div id="type-menu">
        <a href="products.html?type=全部"><button class="type">全部</button></a>
        <a href="shop.html?type=上身類"><button class="type">上身類</button></a>
        <a href="shop.html?type=下身類"><button class="type">下身類</button></a>
        <a href="shop.html?type=配件"><button class="type">配件</button></a>
        <a href="shop.html?type=其他"><button class="type">其他</button></a>
      </div>

      <div id="cart-panel"></div>
      
    </nav>

    <main>
      <div id="favorites-content-bg">
        <?php if (isset($_SESSION['member'])): ?>
        <div id="member-content">
          <div id="favorites-h1-text">
            <h1>您的收藏清單</h1>
          </div>
          <div id="favorites-list-container"></div>
        </div>
        <?php else: ?>
        <div id="not-login-content">
          <h1>建立您的收藏清單</h1>
          <p>
            再一步
            <a href="login.php"><button type="button">立即註冊</button></a>
            收藏喜愛服飾。
          </p>
        </div>
        <?php endif; ?>
      </div>
    </main>

    <footer>
      <div id="footer-container"></div>
    </footer>

    <div id="modal-click-container"></div>

    <script src="script.js"></script> 
    <script src="cart.js"></script>
  </body>
</html>
