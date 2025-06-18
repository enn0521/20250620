<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['member'])) {
    echo json_encode(['success' => false, 'msg' => '未登入']);
    exit;
}
$user_id = $_SESSION['member']['id'];
$product_id = intval($_POST['product_id'] ?? 0);
if (!$product_id) {
    echo json_encode(['success' => false, 'msg' => '缺少商品']);
    exit;
}
require_once __DIR__ . '/db.php'; 

$stmt = $conn->prepare("INSERT INTO `cart-items` (user_id, product_id, added_at) VALUES (?, ?, NOW())");
$stmt->bind_param("ii", $user_id, $product_id);
$stmt->execute();

echo json_encode(['success' => true]);