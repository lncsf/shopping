<?php
header("Content-Type:application/json");
require_once("init.php");   ///////////////动态加载品牌和种类
$output=[
 //$bands[{}]
 //$categorys[{}]
];
$sql="SELECT * FROM `band`";//查询所有品牌
$result = mysqli_query($conn,$sql);
$bands = mysqli_fetch_all($result,1);

$sql="SELECT * FROM `category`";//查询所有种类
$result = mysqli_query($conn,$sql);
$categorys = mysqli_fetch_all($result,1);

$output =
 [
  "bands"=>$bands,
  "categorys"=>$categorys,
 ];
echo json_encode($output);



?>