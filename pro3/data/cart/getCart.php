<?php
//data/cart/getCart.php
header("Content-Type:application/json");
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$sql="select iid,s.lid,s.count,s.isCheck,p.price,p.title,p.sales,t.taste_name,k.pack_name from shoppingcart_item s,product p,taste t,pack k where s.lid=p.lid and p.taste_id=t.taste_id and p.pack_id=k.pack_id and uid=$uid order by p.lid";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));


