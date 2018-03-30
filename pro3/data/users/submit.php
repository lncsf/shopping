<?php
header("Content-Type:text/plain");
require_once("../init.php");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd1"];
$sql="INSERT INTO user(uname,upwd) VALUES('$uname','$upwd')";
$result=mysqli_query($conn,$sql);
 if($result)
   echo '1';//注册成功
 else
   echo '0';//注册失败


