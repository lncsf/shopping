<?php
//data/cart/checkItem.php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$isCheck=$_REQUEST["isCheck"];
$sql="update shoppingcart_item set isCheck=$isCheck where iid=$iid";
mysqli_query($conn,$sql);