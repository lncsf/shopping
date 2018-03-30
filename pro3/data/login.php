<?php
$uname=$_REQUEST["uname"];
$upwd=$_REQUEST["upwd"];

require("init.php");
$sql="select *from user where uname='$uname' and upwd='$upwd'";
$result=mysqli_query($conn,$sql);
if($result==false){
  echo "SQL执行失败"; 
}else{
  $row=mysqli_fetch_row($result);
  if($row==null){
    echo "用户名或者密码错误";
  }else{
    echo "登录成功";
  
  }
}











?>