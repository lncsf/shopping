<?php
header("Content-Type:application/json");
require_once("init.php");   //////////////

@$pno = $_REQUEST["pno"];//当前页码
@$pageSize = $_REQUEST["pageSize"];//页大小
@$band_id = $_REQUEST["band_id"];//当前选中的品牌
@$category_id = $_REQUEST["category_id"];//当前选中的种类

if($pno<1){
 $pno = 1;
}
if($pageSize<1){
 $pageSize = 12;
}
$offset = ($pno-1)*$pageSize;
//查询所有品牌和种类的产品
if($band_id==0&$category_id==0){
   //获取品牌编号
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
  /******* $offset = ($pno-1)*$pageSize;*/

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
   $rows = mysqli_fetch_all($result,1);$offset = ($pno-1)*$pageSize;
   //echo json_encode( $rows);

}else if($band_id==0 && $category_id!==0){ //获取种类数据
    $sql="SELECT * FROM `product` WHERE category_id=$category_id group by band_id ORDER BY lid  LIMIT  $offset,$pageSize";
     $result = mysqli_query($conn,$sql);
     $rows=mysqli_fetch_all($result,1);//获取当前页所有关联数据数组
     $arr=json_encode($rows);
     //echo $arr;
     $arr=json_decode($arr,true);
     //echo count($arr);//获取数组的长度，就是获取所有品牌不同种类的产品数量
     $pageCount = ceil(count($arr)/$pageSize);//计算出总页数
     #echo $pageCount;

}else if($band_id!=0 && $category_id==0){//获取品牌数据
    $sql="SELECT * FROM `product` WHERE band_id=$band_id group by category_id ORDER BY lid  LIMIT  $offset,$pageSize";
    $result = mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,1);//获取当前页所有关联数据数组
    $arr=json_encode($rows);
    //echo $arr;
    $arr=json_decode($arr,true);
    //echo count($arr);//获取数组的长度，就是获取所有品牌不同种类的产品数量
    $pageCount = ceil(count($arr)/$pageSize);//计算出总页数
    #echo $pageCount;
}else{
   $sql="SELECT * FROM `product` WHERE  band_id=$band_id  and category_id=$category_id  LIMIT  $offset,$pageSize";
       $result = mysqli_query($conn,$sql);
       //$rows=mysqli_fetch_all($result,1); //获取当前页所有关联数据数组
       $rows=mysqli_fetch_assoc($result);  //$row=mysqli_fetch_assoc($result);获取当前页一条关联数据数组
       $arr=json_encode($rows);
       //echo $arr;
       $arr=json_decode($arr,true);
       //echo count($arr);//获取数组的长度，就是获取所有品牌不同种类的产品数量
       $pageCount = ceil(count($arr)/$pageSize);//计算出总页数
       #echo $pageCount;
}

$output =
 [
  "pno"=>$pno,
  "pageSize"=>$pageSize,
  "pageCount"=>$pageCount,
  "data"=>$rows,

 ];
echo json_encode($output);















