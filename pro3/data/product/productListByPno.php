<?php
//data/products/getProductByLid.php
header("Content-Type:application/json");
require_once("../init.php");
@$band_id=$_REQUEST["band_id"];
@$category_id=$_REQUEST["category_id"];
$pno = $_REQUEST["pno"];//当前页码
$pageSize = $_REQUEST["pageSize"];//页大小
$output=[
	//"product"=>{ lid,title,taste，pack ...},
///////"specs"=>[ {lid:1, spec:xxx}, {lid:2, spec:xxx}, ...],
];
if($pno<1){
 $pno = 1;
}
if($pageSize<1){
 $pageSize = 12;
}
if($band_id && $category_id){//同时输入$band_id && $category_id执行
      $offset = ($pno-1)*$pageSize;//获取当前页产品内容
      $sql="SELECT * FROM product where category_id=$category_id and band_id=$band_id  LIMIT  $offset,$pageSize";
      $result=mysqli_query($conn,$sql);
      $product=mysqli_fetch_row($result);
     // var_dump($product);
      $arr=json_encode($product);
      $arr=json_decode($arr,true);
      //echo count($arr);
      $pageCount = ceil(count($product)/$pageSize);//计算出总页数
      $output =
              [
               "pno"=>$pno,
               "pageSize"=>$pageSize,
               "pageCount"=>$pageCount,
               "data"=>$product,
              ];
}else if($band_id){
    $offset = ($pno-1)*$pageSize;//获取当前页产品内容
	$sql="SELECT * FROM product where band_id=$band_id group by category_id  LIMIT  $offset,$pageSize";
	$result=mysqli_query($conn,$sql);
	$product=mysqli_fetch_all($result,1);
	#var_dump($product);
	$arr=json_encode($product);
	$arr=json_decode($arr,true);
	#echo count($arr);
	$pageCount = ceil(count($arr)/$pageSize);//计算出总页数
	$output =
     [
      "pno"=>$pno,
      "pageSize"=>$pageSize,
      "pageCount"=>$pageCount,
      "data"=>$product,
     ];

}else if($category_id){
    $offset = ($pno-1)*$pageSize;//获取当前页产品内容
    $sql="SELECT * FROM product where category_id=$category_id group by band_id  LIMIT  $offset,$pageSize";
    $result=mysqli_query($conn,$sql);
    $product=mysqli_fetch_all($result,1);
    #var_dump($product);
    $arr=json_encode($product);
    $arr=json_decode($arr,true);
    #echo count($arr);
    $pageCount = ceil(count($arr)/$pageSize);//计算出总页数
    $output =
         [
          "pno"=>$pno,
          "pageSize"=>$pageSize,
          "pageCount"=>$pageCount,
          "data"=>$product,
         ];
}else{
//不输入band_id和category_id时执行
$sql="select band_id FROM band";
$res=mysqli_query($conn,$sql);
$row = mysqli_fetch_all($res,1);
$arr=json_encode($row);
#echo $arr;
$arr=json_decode($arr,true);
#echo $arr;
#echo count($arr);
$sql="SELECT * FROM `product` WHERE band_id=1 group by category_id";
for($i=1;$i<count($arr);$i++){
   #echo $arr[0]["band_id"];//运用品牌编号进行查询所有品牌不同种类的产品
   $sql.="  union SELECT * FROM `product` WHERE band_id=".$arr[$i]['band_id']."  group by category_id";
//SELECT * FROM `product` WHERE band_id=1 group by category_id union
//SELECT * FROM `product` WHERE band_id=2 group by category_id union
//SELECT * FROM `product` WHERE band_id=3 group by category_id union
//SELECT * FROM `product` WHERE band_id=4 group by category_id union
//SELECT * FROM `product` WHERE band_id=5 group by category_id
};
//echo $sql;
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,1);//获取所有数据数组
//echo $row;
//var_dump($row);
$arr=json_encode($row);
//echo $arr;
$arr=json_decode($arr,true);
//echo count($arr);//获取数组的长度，就是获取所有品牌不同种类的产品数量
$pageCount = ceil(count($arr)/$pageSize);//计算出总页数
//echo $pageCount;
//获取当前页产品内容    lid,title,price
$offset = ($pno-1)*$pageSize;
$sql="select band_id FROM band";
$res=mysqli_query($conn,$sql);
$row = mysqli_fetch_all($res,1);
$arr=json_encode($row);
$arr=json_decode($arr,true);
$sql="SELECT * FROM `product` WHERE band_id=1 group by category_id";
for($i=1;$i<count($arr);$i++){
   #echo $arr[0]["band_id"];//运用品牌编号进行查询所有品牌不同种类的产品
$sql.="  union SELECT * FROM `product` WHERE band_id=".$arr[$i]['band_id']."  group by category_id";
};
$sql.="  ORDER BY lid  LIMIT  $offset,$pageSize";
//echo $sql;
$result = mysqli_query($conn,$sql);
$rows = mysqli_fetch_all($result,1);//当前页的所有数据
//echo json_encode( $rows);
$output =
 [
  "pno"=>$pno,
  "pageSize"=>$pageSize,
  "pageCount"=>$pageCount,
  "data"=>$rows,
 ];
}
echo json_encode($output);