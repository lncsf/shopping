<?php
header("Content-Type:application/json");
require_once("init.php");   ///////////////点击口味重新加载包装类型

@$band_id = $_REQUEST["band_id"];//当前的品牌
@$category_id = $_REQUEST["category_id"];//当前的种类
@$pack_id = $_REQUEST["pack_id"];//点击生成的包装id

$output=[
 //$taste
];
$sql="SELECT * FROM product p,taste t WHERE pack_id=$pack_id and category_id=$category_id and band_id=$band_id and p.taste_id=t.taste_id group by taste_name ORDER BY t.taste_id";//查询满足条件的
//echo $sql;
$result = mysqli_query($conn,$sql);
$taste = mysqli_fetch_all($result,1);
$output =
 [
  "taste"=>$taste,
 ];
echo json_encode($output);

?>