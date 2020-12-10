<?php
// 跨域配置
header("Access-Control-Allow-Origin:*");
// 头部设置
header('Access-Control-Allow-Headers:x-requested-with,content-type');
// 获取传入参数
$payload = json_decode(file_get_contents('php://input'), true);

// 数据库操作
$servername = "localhost";
// 用户名
$username = "root";
// 密码
$password = "root";
// 数据库名
$dbname = "cinema";
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO movie_info(movie_name, duration,
                        director,actor,country,company) VALUES(?,?,?,?,?,?)");
// 指定参数
$stmt -> bind_param("ssssss",
    $payload["movie_name"],
    $payload["duration"],
    $payload["director"],
    $payload["actor"],
    $payload["country"],
    $payload["company"]);
// 执行语句
$state = $stmt ->execute();

$affected_rows = $conn->affected_rows;
// 关闭连接
$stmt -> close();

// 返回json
header('content-type:application/json;charset=utf8');

$arr = array('executeState'=>$state,'affectedRows'=>$affected_rows);
exit(json_encode($arr));
?>