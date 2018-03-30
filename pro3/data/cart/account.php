<?php
//data/cart/getCart.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql="select lid,count,iid from shoppingcart_item  where isCheck=1";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));
