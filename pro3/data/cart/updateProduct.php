<?php
//data/cart/getCart.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$count=$_REQUEST["sold_count"];
@$lid=$_REQUEST["lid"];
$sql="update product set sold_count=$count where lid=$lid";
mysqli_query($conn,$sql);








