<?php
header("Content-Type:application/json");
require_once("init.php");   ///////////////点击品牌和种类重新查找lid

@$band_id = $_REQUEST["band_id"];//当前的品牌
@$category_id = $_REQUEST["category_id"];//当前的种类
@$taste_id = $_REQUEST["taste_id"];//点击生成的口味id
@$pack_id = $_REQUEST["pack_id"];//点击生成的包装id

$output=[
 //$lid
];
$sql="SELECT lid FROM `product`where taste_id=$taste_id and pack_id=$pack_id and category_id=$category_id and band_id=$band_id";//查询满足条件的lid
$result = mysqli_query($conn,$sql);
$lid = mysqli_fetch_all($result,1);
$output =
 [
  "lid"=>$lid,
 ];
echo json_encode($output);

?>