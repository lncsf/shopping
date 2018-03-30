<?php
header("Content-Type:application/json");
require_once("init.php");   ///////////////点击包装加载口味类型

@$band_id = $_REQUEST["band_id"];//当前的品牌
@$category_id = $_REQUEST["category_id"];//当前的种类
@$taste_id = $_REQUEST["taste_id"];//点击生成的口味id


$output=[
 //$pack
];
$sql="SELECT * FROM product p,pack t WHERE taste_id=$taste_id and category_id=$category_id and band_id=$band_id and p.pack_id=t.pack_id group by pack_name ORDER BY t.pack_id";//查询满足条件的
//echo $sql;
$result = mysqli_query($conn,$sql);
$pack = mysqli_fetch_all($result,1);

$output =
 [
  "pack"=>$pack,
 ];

echo json_encode($output);

?>