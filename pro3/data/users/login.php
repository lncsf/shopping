<?php
//data/users/login.php
require_once("../init.php");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
if($uname&&$upwd){
	$sql="select uid from user where uname='$uname' and binary upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row){
		session_start();
		$_SESSION["uid"]=$row[0];
		echo "1";//登录成功
	}else{
		echo "0";//登录不成功
	}
}else{
	echo "0";
}