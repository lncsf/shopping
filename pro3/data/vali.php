<?php
header("Content-Type:application/json");
require_once("init.php");
@$uname=$_REQUEST["uname"];
$sql="select *from user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row)
echo "false";
else
echo "true";






?>