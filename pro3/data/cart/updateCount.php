<?php
//data/cart/updateCount.php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$count=$_REQUEST["count"];
if($iid!=null&&$count!=null){
	if($count==0)
		$sql="delete from shoppingcart_item where iid=$iid";
	else
		$sql="update shoppingcart_item set count=$count where iid=$iid";
	mysqli_query($conn,$sql);
}