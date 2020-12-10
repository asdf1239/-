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

$stmt = $conn->prepare("SELECT count(0) as count FROM movie_info");

$state = $stmt ->execute();

$result = $stmt->get_result();

$total = 0;

if ($row = $result->fetch_assoc()){
    $total = $row['count'];
}



$stmt = $conn->prepare("SELECT * FROM movie_info limit ?,?");

$param = ($payload["pageNum"]-1) * $payload["pageSize"];

$stmt->bind_param("ii", $param, $payload["pageSize"]);
// 执行语句
$state = $stmt ->execute();

$result = $stmt->get_result();

$list = array();

while ($row = $result->fetch_assoc())
{
    $movie= array('movie_name'=>$row["movie_name"],
        'duration'=>$row['duration'],
        'director'=>$row['director'],
        'actor'=>$row['actor'],
        'id'=>$row['id'],
        'country'=>$row['country'],
        'company'=>$row['company']
    );
    array_push($list,$movie);
}
// 关闭连接
$stmt -> close();

// 返回json
header('content-type:application/json;charset=utf8');

$arr = array('executeState'=>$state,'affectedRows'=>$conn->affected_rows,
    'pageNum'=>$payload["pageNum"],'pageSize'=>$payload["pageSize"],
    'list'=>$list,'total'=>$total
);
exit(json_encode($arr));
?>