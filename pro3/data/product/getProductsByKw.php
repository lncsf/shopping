<?php
//data/products/getProductsByKw.php
header("Content-Type:application/json");
require_once("../init.php");
@$kw=$_REQUEST["kw"];
$sql="select *from product";
if($kw){
	//将$kw按空格切开为数组$kws
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++){//遍历$kws
		//将$kws中当前位置的关键词替换为title like '%...%'
		$kws[$i]=" title like '%$kws[$i]%' ";
	}
	//将$kws用" and "连接为一个条件字符串$where
	$where=implode(" and ",$kws);
	//$sql=$sql." where ".$where
	$sql.=" where $where   group by band_id";
	
}
//echo $sql;
$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
$count=count($data);
@$pageNo=$_REQUEST["pno"];
if($pageNo==null) $pageNo=1;
@$pageSize=$_REQUEST["pageSize"];
if($pageSize==null) $pageSize=12;
$sql.=" limit ".($pageNo-1)*$pageSize.",$pageSize ";
$result=mysqli_query($conn,$sql);
$data=mysqli_fetch_all($result,1);
$pageCount=ceil(($count/$pageSize));
$output=[
	"pno"=>$pageNo,
	"pageSize"=>$pageSize,
	"count"=>$count,
	"pageCount"=>$pageCount,
	"data"=>$data
];
echo json_encode($output);



