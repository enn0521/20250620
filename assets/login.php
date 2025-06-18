<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
    header('Content-Type: application/json');
    if ($_POST['action'] === 'update' && isset($_SESSION['member'])) {
        $id = $_SESSION['member']['id'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $birth = $_POST['birth'];
        $password = $_POST['password'];

        if ($password) {
            $stmt = $conn->prepare("UPDATE members SET name=?, email=?, password=?, birth=? WHERE id=?");
            $stmt->bind_param("ssssi", $name, $email, $password, $birth, $id);
        } else {
            $stmt = $conn->prepare("UPDATE members SET name=?, email=?, birth=? WHERE id=?");
            $stmt->bind_param("sssi", $name, $email, $birth, $id);
        }
        if ($stmt->execute()) {
            $_SESSION['member']['name'] = $name;
            $_SESSION['member']['email'] = $email;
            $_SESSION['member']['birth'] = $birth;
            echo json_encode(['success' => true, 'message' => '更新成功']);
        } else {
            echo json_encode(['success' => false, 'message' => '更新失敗']);
        }
        exit;
    }

    if ($_POST['action'] === 'delete' && isset($_SESSION['member'])) {
        $id = $_SESSION['member']['id'];
        $stmt = $conn->prepare("DELETE FROM members WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            session_unset();
            session_destroy();
            echo json_encode(['success' => true, 'message' => '帳號已刪除']);
        } else {
            echo json_encode(['success' => false, 'message' => '刪除失敗']);
        }
        exit;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM members WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && $password === $user['password']) {
        $_SESSION['id'] = $user['id'];
        $_SESSION['name'] = $user['name'];
        $_SESSION['member'] = [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'birth' => $user['birth'] 
        ];
        echo "<script>
            localStorage.setItem('userId', '{$user['id']}');
            window.location.href = 'index.html';
        </script>";
        exit;
    } else {
        echo "<script>alert('帳號或密碼錯誤');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <title>登入</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="icon" href="icon/web_icon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="icon/web_icon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css" />
  </head>
  <body>
    <div id="loading-screen">
      <div class="spinner"></div>
    </div>

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
        <?php if (isset($_SESSION['member'])): ?>
          <div id="member-login-content">
            <div id="member-top-content">
              <p>個人主頁</p>
              <a href="logout.php"><button type="button">登出</button></a>
            </div>
            
            <div id="member-bottom-content">
              <div class="member-infor-block">
                <div class="block-left">
                  <p>使用者名稱</p>
                </div>
                <div class="block-right">
                  <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($_SESSION['member']['name']); ?>" />
                </div>
              </div>

              <div class="member-infor-block">
                <div class="block-left">
                  <p>更改電子郵件</p>
                </div>
                <div class="block-right">
                  <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($_SESSION['member']['email']); ?>" />
                </div>
              </div>

              <div class="member-infor-block">
                <div class="block-left">
                  <p>更改密碼</p>
                </div>
                <div class="block-right">
                  <input type="text" id="password" name="password"/>
                </div>
              </div>

              
              <div class="member-infor-block">
                <div class="block-left">
                  <p>更改生日</p>
                </div>
                <div class="block-right">
                  <input type="text" id="birth" name="birth"
                    value="<?php echo isset($_SESSION['member']['birth']) ? htmlspecialchars($_SESSION['member']['birth']) : ''; ?>"
                    placeholder="YYYY-MM-DD" />
                </div>
              </div>

              <div id="infor-delete-update-btn">
                <button type="button" id="del-btn">刪除帳號</button>
                <button type="button" id="upd-btn">更新</button>
              </div>
            </div>

          </div>
        <?php else: ?>
          <div id="login-container">
            <h1>帳戶</h1>
            <div id="login-register">
              <div id="bar-active">
                <a href="login.php">登入</a>
              </div>
              <div id="bar-not-active">
                <a href="register.php">註冊</a>
              </div>
            </div>
            <form action="login.php" method="post">
              <div class="input-container">
                <input type="text" id="email" name="email" placeholder="輸入電子郵件" required />
              </div>
              <div class="input-container">
                <input type="password" id="password" name="password" placeholder="輸入密碼" required />
              </div>
              <button type="submit" name="login">登入</button>
            </form>
          </div>
        <?php endif; ?>
      </div>
    </main>

    <script src="script.js"></script>
    <script src="cart.js"></script>
  </body>
</html>
