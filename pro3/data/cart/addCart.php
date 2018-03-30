<?php
//data/cart/addCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
//$uid=1;
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
$sql="select * from shoppingcart_item where uid=$uid and lid=$lid";
//echo $sql;
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
//var_dump($row);
if($row==null){
	$sql="insert into shoppingcart_item (uid, lid, count) values ($uid,$lid,$count)";
}else{
	$sql="update shoppingcart_item set count=count+$count where uid=$uid and lid=$lid";
}
//echo $sql;
mysqli_query($conn,$sql);





