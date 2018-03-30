<?php
/**
* 向首页提供必需的数据，包括轮播广告、首页推荐、最新上架、热销单品
* 返回数据形如：
  {
    carouselItems: [ ],
  }
*/
header('Content-Type: application/json;charset=UTF-8');

$output = [];

require_once('../init.php');

//1.获取轮播广告项
$sql = "SELECT cid,img,title,href FROM carousel";
$result = mysqli_query($conn, $sql);
$output['carouselItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);




echo json_encode($output);