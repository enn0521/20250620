<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <title>註冊</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="icon" href="icon/web_icon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="icon/web_icon.ico" type="image/x-icon"/>
    <link
      rel="stylesheet"
      href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
    />
  </head>
  <body>
    <div id="loading-screen">
      <div class="spinner"></div>
    </div>
    <?php
        session_start();
        include 'db.php';

        if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register'])) {
            $username = $_POST['name'];
            $email = $_POST['email'];
            $password_raw = $_POST['password']; 
            $birthday = $_POST['birth'];

            $check = $conn->prepare("SELECT id FROM members WHERE email = ? OR name = ?");
            $check->bind_param("ss", $email, $username);
            $check->execute();
            $check->store_result();

            if ($check->num_rows > 0) {
                echo "<script>alert('帳號或 Email 已存在');</script>";
            } else {
                $stmt = $conn->prepare("INSERT INTO members (name, email, password, birth) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssss", $username, $email, $password_raw, $birthday);

                if ($stmt->execute()) {
                    echo "<script>alert('註冊成功，請登入'); window.location.href='login.php';</script>";
                } else {
                    echo "<script>alert('註冊失敗');</script>";
                }

                $stmt->close();
            }

            $check->close();  
            $conn->close();
        }
    ?>
    
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

      <div id="cart-panel"></div>
      
    </nav>

    <main>
      <div id="login-content-bg">
        <div id="login-container">
          <h1>帳戶</h1>
          <div id="login-register">
            <div id="bar-not-active">
              <a href="login.php">登入</a>
            </div>
            <div id="bar-active">
              <a href="register.php">註冊</a>
            </div>
          </div>

          <form action="register.php" method="post">
            <div class="input-container">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="名稱"
                required
              />
            </div>

            <div class="input-container">
              <input
                type="text"
                id="birth"
                name="birth"
                placeholder="生日 YYYY-MM-DD"
                required
              />
            </div>

            <div class="input-container">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="電子郵件"
                required
              />
            </div>
            <div class="input-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="自訂密碼"
                required
              />
            </div>
            <button type="submit" name="register">註冊</button>
          </form>
        </div>
      </div>
    </main>

    <script src="script.js"></script>
    <script src="cart.js"></script>
  </body>
</html>
