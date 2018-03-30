<?php
//data/products/getProductByLid.php
header("Content-Type:application/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
//@$tast=$_REQUEST["tast"];
#@$lid=$_REQUEST["lid"];
$output=[
	//"product"=>{ lid,title,taste，pack ...},
///////"specs"=>[ {lid:1, spec:xxx}, {lid:2, spec:xxx}, ...],
   //"tastes"=>[ {lid:1, taste:xxx}, {lid:2, spec:xxx}, ...],
   //"packs"=>[ {lid:1, pack:xxx}, {lid:2, pack:xxx}, ...],
   //"band_name"=[{lid,band_name}]
    //"category_name"=[{lid,category_name}]

];
if($lid){
	$sql="SELECT * FROM product where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$product=mysqli_fetch_all($result,1)[0];
	$output["product"]=$product;

    $band_id=$product["band_id"];
	$category_id=$product["category_id"];
	$sql="select lid,band_id,category_id,taste_name,p.taste_id from product p,taste t WHERE p.taste_id=t.taste_id and band_id=$band_id and category_id=$category_id group by taste_name ORDER BY t.taste_id;";
	$result=mysqli_query($conn,$sql);
	$output["tastes"]=mysqli_fetch_all($result,1);//口味种类
  // echo json_encode($output["tastes"]);
	$band_id=$product["band_id"];
    $category_id=$product["category_id"];
    $sql="select lid,band_id,category_id,pack_name,p.pack_id from product p,pack t WHERE p.pack_id=t.pack_id and band_id=$band_id and category_id=$category_id group by pack_name ORDER BY t.pack_id;";
    $result=mysqli_query($conn,$sql);
    $output["packs"]=mysqli_fetch_all($result,1);//包装种类
  //  echo json_encode($output["packs"]);

    $band_id=$product["band_id"];
    $sql="SELECT band_name FROM  band where band_id=$band_id";
    $result=mysqli_query($conn,$sql);
    $output["band_name"]=mysqli_fetch_all($result,1)[0];//品牌名称

    $category_id=$product["category_id"];
    $sql="SELECT category_name FROM category where category_id=$category_id";
    $result=mysqli_query($conn,$sql);
    $output["category_name"]=mysqli_fetch_all($result,1)[0];//种类名称


}
echo json_encode($output);