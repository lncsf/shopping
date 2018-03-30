<?php
//data/cart/checkAll.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$check_all=$_REQUEST["check_all"];
$sql="update shoppingcart_item set isCheck=$check_all where uid=$uid";
mysqli_query($conn,$sql);