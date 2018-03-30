/**
 * Created by web-01 on 2006/1/14.
 */

//地址栏传数据---用于index.html的a查看更多---调用load加载商品-页码

$(()=> {
     console.log(location.search)
    if(location.search===""){    //地址自动拼接
       // console.log(location.search)
        var stateObject={band_id:0,category_id:0}
        var title ="product_list.html?band_id="+0+"&category_id="+0
        var newUrl='product_list.html?band_id='+0+"&category_id="+0
        history.pushState(stateObject,title,newUrl)
        loadProductListByPno(1,0,0,0)
    }else{        //关键字查询
        var pageSize=12;//拼查询字符串
        var pno=1;
	   var query={pno,pageSize};
       var search=location.search;//?kw=mac i7
       query.kw=decodeURI(search.split("=")[1]);
       $.get("data/product/getProductsByKw.php",query)
		.then(result=>{
		var {pno, pageCount, data}=result
		var html="";
        if(data!==null) {
                if(data.length==undefined) {
                   // console.log('duixiang')
                    html += `<li><a href="product_details.html?lid=${data.lid}">
                         <div class="i-pic limit">
                           <img src="images/imgsearch1.jpg">
                            <p class="title fl">${data.title}</p>
                             <p class="price fl">
                                 <b>¥</b>
                                 <strong>${data.price}</strong>
                             </p>
                            <p class="number fl">
                                销量<span>${data.sold_count}</span>
                            </p>
                         </div></a>
                     </li>`;
                }else {
                   // console.log('shuzu')
                    for(var item of data){
                        //  console.log(item.lid);
                        html += `<li><a href="product_details.html?lid=${item.lid}">
                         <div class="i-pic limit">
                           <img src="images/imgsearch1.jpg">
                            <p class="title fl">${item.title}</p>
                             <p class="price fl">
                                 <b>¥</b>
                                 <strong>${item.price}</strong>
                             </p>
                            <p class="number fl">
                                销量<span>${item.sold_count}</span>
                            </p>
                         </div></a>
                     </li>`;
                    }
                }
            }else{
                console.log('no data')
            }


            // 6: 保存 #product_list 标签中间
            $("#product_list").html(html);
              //7:拼接分页条
            //console.log(pno);   //当前页码
            //console.log(pageCount);//总页数
            pno = parseInt(pno);
            pageCount = parseInt(pageCount);
            var html="";
            //8:创建变量保存分页条字符串
            html += `<li class="am-disabled"><a href="#">«</a></li>`;
            //上上一页
            if(pno-2>0){
                html += `<li><a href="#">${pno-2}</a></li>`;
            }
            //上一页
            if(pno-1>0){
                html += `<li><a href="#">${pno-1}</a></li>`;
            }
            //当前页
            html += `<li class="am-active"><a href="#">${pno}</a></li>`;
            //下一页
            if(pno+1<=pageCount) {
                html += `<li><a href="#">${pno+1}</a></li>`;
            }
            //下下一页
            if(pno+2<=pageCount){
                html += `<li><a href="#">${pno+2}</a></li>`;
            }
            html += `<li><a href="#">»</a></li>`;
            //9:将拼接字符串保存
            $("#pagination").html(html);
		
	})
    }
});
//分页
function  loadProductListByPno(pno,pageSize,band_id,category_id){
    //1：发送ajax请求 data/04_product_list.php
    $.ajax({
        type:"GET",
        url:"data/product_list3.php",
        data:{pno:pno,pageSize:pageSize,band_id:band_id,category_id:category_id},
        success:function(data){
            //  console.log(data);
            var data=data;
            var html = "";
            // 5: 拼接当前页内
           // console.log(data)
            if(data.data!==null) {
                if(data.data.length==undefined) {
                   // console.log('duixiang')
                    html += `<li><a href="product_details.html?lid=${data.data.lid}">
                         <div class="i-pic limit">
                           <img src="images/imgsearch1.jpg">
                            <p class="title fl">${data.data.title}</p>
                             <p class="price fl">
                                 <b>¥</b>
                                 <strong>${data.data.price}</strong>
                             </p>
                            <p class="number fl">
                                销量<span>${data.data.sold_count}</span>
                            </p>
                         </div></a>
                     </li>`;
                }else {
                   // console.log('shuzu')
                    for(var item of data.data){
                        //  console.log(item.lid);
                        html += `<li><a href="product_details.html?lid=${item.lid}">
                         <div class="i-pic limit">
                           <img src="images/imgsearch1.jpg">
                            <p class="title fl">${item.title}</p>
                             <p class="price fl">
                                 <b>¥</b>
                                 <strong>${item.price}</strong>
                             </p>
                            <p class="number fl">
                                销量<span>${item.sold_count}</span>
                            </p>
                         </div></a>
                     </li>`;
                    }
                }
            }else{
                console.log('no data')
            }
            // 6: 保存 #product_list 标签中间
            $("#product_list").html(html);

            //7:拼接分页条
            //console.log(data.pno);   //当前页码
            //console.log(data.pageCount);//总页数
            data.pno = parseInt(data.pno);
            data.pageCount = parseInt(data.pageCount);
            var html="";
            //8:创建变量保存分页条字符串
            html += `<li class="am-disabled"><a href="#">«</a></li>`;
            //上上一页
            if(data.pno-2>0){
                html += `<li><a href="#">${data.pno-2}</a></li>`;
            }
            //上一页
            if(data.pno-1>0){
                html += `<li><a href="#">${data.pno-1}</a></li>`;
            }
            //当前页
            html += `<li class="am-active"><a href="#">${data.pno}</a></li>`;
            //下一页
            if(data.pno+1<=data.pageCount) {
                html += `<li><a href="#">${data.pno+1}</a></li>`;
            }
            //下下一页
            if(data.pno+2<=data.pageCount){
                html += `<li><a href="#">${data.pno+2}</a></li>`;
            }
            html += `<li><a href="#">»</a></li>`;
            //9:将拼接字符串保存
            $("#pagination").html(html);

        },
        error:function(){
            console.log(3);
            alert("网络故障请检查");
        }
    });
}

$(()=>{
    //var url=location.search.split("=")[0];
    var category_id=0,band_id=0;
    $.ajax({
        type: "GET",
        url: "data/product-list1.php"
        //data: {lid: lid}
    }).then(data=>{
        var html = `<dd class="select-all selected"><a href="0">全部</a></dd>`;
        for(var band of data.bands){
            //console.log(band.band_id);
            html+=`<dd><a href="${band.band_id}">${band.band_name}</a></dd>`;
        }
        $("#select1 .dd-conent").html(html);
        var html = `<dd class="select-all selected"><a href="0">全部</a></dd>`;
        for(var category of data.categorys){
            //console.log(1);
            html+=`<dd><a href="${category.category_id}">${category.category_name}</a></dd>`;
        }
        $("#select2 .dd-conent").html(html);
        //为品牌绑定单击事件
        $("#select1").on("click","dd>a",function(e){//品牌
            e.preventDefault();
            $tar=$(e.target);
            var myvalue=$tar.attr("href");
            //	console.log(myvalue);
            $tar.parent().addClass("selected").siblings().removeClass("selected");
            if ($tar.parent().hasClass("select-all")) {
                $("#selectA>a").remove();
            } else {
                var $copyThisA = $tar.clone();
                if($("#selectA").length > 0){
                    // $(".select-result  .select-all").remove();
                    $("#selectA ").html($copyThisA);
                }else{
                    //  $(".select-result  .select-all").remove();
                    $(".select-result dl #selectA").append($copyThisA);
                    //console.log($("#selectA").length);
                }
            }
            // console.log($tar.attr("href"));
            band_id=$tar.attr("href");
          // console.log($("#selectA"))
          //  console.log($("#selectB")[0].firstChild)
            if($("#selectB")[0].firstChild !==null){
                category_id=$($("#selectB")[0].firstChild).attr("href")
               // console.log(category_id);
                var stateObject={band_id:band_id,category_id:category_id}
                var title ="product_list.html?band_id="+band_id+"&category_id="+category_id
                var newUrl='product_list.html?band_id='+band_id+'&category_id='+category_id
                history.pushState(stateObject,title,newUrl)
                // console.log("B"+band_id);
                // console.log("B"+category_id);
                loadProductListByPno(1,0,band_id,category_id)

            }else{
                var stateObject={band_id:band_id}
                var title ="product_list.html?band_id="+band_id+"&category_id="+category_id
                var newUrl='product_list.html?band_id='+band_id+'&category_id='+category_id
                history.pushState(stateObject,title,newUrl)
                // console.log("A"+band_id);
               // console.log("A"+category_id);
                loadProductListByPno(1,0,band_id,category_id)
            }
        })
        //种类点击事件
        $("#select2").on("click","dd>a",function(e){//种类
            e.preventDefault();
            $tar=$(e.target);
            var myvalue=$tar.attr("href");
            //console.log(myvalue);
            $tar.parent().addClass("selected").siblings().removeClass("selected");
            if ($tar.parent().hasClass("select-all")) {
                $("#selectB>a").remove();
            } else {
                var $copyThisB = $tar.clone();
                if($("#selectB").length > 0){
                    //   $(".select-result  .select-all").remove();
                    $("#selectB").html($copyThisB);
                }else{
                    //   $(".select-result  .select-all").remove();
                    $(".select-result dl #selectB").append($copyThisB);
                }
            }

            // console.log($tar.attr("href"));
            category_id=$tar.attr("href")
            if($("#selectA")[0].firstChild !==null){
                band_id=$($("#selectA")[0].firstChild).attr("href")
                // console.log(band_id);
                var stateObject={band_id:band_id,category_id:category_id}
                var title ="product_list.html?band_id="+band_id+"&category_id="+category_id
                var newUrl='product_list.html?band_id='+band_id+'&category_id='+category_id
                history.pushState(stateObject,title,newUrl)
                loadProductListByPno(1,0,band_id,category_id)
            }else{
                var stateObject={category_id:category_id}// var stateObject={band_id:band_id}
                var title ="product_list.html?band_id="+band_id+"&category_id="+category_id
                var newUrl='product_list.html?band_id='+band_id+'&category_id='+category_id
                history.pushState(stateObject,title,newUrl)
                loadProductListByPno(1,0,band_id,category_id)
            }
        });

        $("#select3").on("click","dd>a",function(e){
            e.preventDefault();
            $tar=$(e.target);
            var myvalue=$tar.attr("href");
            //console.log(myvalue);
            $tar.parent().addClass("selected").siblings().removeClass("selected");
            if ($tar.parent().hasClass("select-all")) {
                $("#selectC>a").remove();
            } else {
                var $copyThisC = $tar.clone();
                if($("#selectC").length > 0){
                    //  $(".select-result  .select-all").remove();
                    $("#selectC").html($copyThisC);
                }else{
                    //   $(".select-result  .select-all").remove();
                    $(".select-result dl #selectC").append($copyThisC);
                    //console.log($("#selectC").length);
                }
            }
        });
        $("#selectA").on("click","dd>a", function(e) {
            e.preventDefault();
            $tar=$(e.target);
            $tar.remove();
            $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");

        });
        $("#selectB").on("click","dd>a", function(e) {
            e.preventDefault();
            $tar=$(e.target);
            $tar.remove();
            $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
            var category_id=0;
            var stateObject={category_id:category_id}
            var title ="product_list.html?band_id="+band_id+"&category_id="+category_id
            var newUrl='product_list.html?band_id='+band_id+'&category_id='+category_id
            history.pushState(stateObject,title,newUrl)
            loadProductListByPno(1,0,band_id,category_id)
        });
        $("#selectC").on("click","dd>a", function(e) {
            e.preventDefault();
            $tar=$(e.target);
            $tar.remove();
            $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");

        });
        $(".select-result dd").on("click","a", function(e){  //已选
            e.preventDefault();
            $tar=$(e.target);
            var myid=$tar.parent().data();
            var mid=myid.toggle;
            //  console.log(mid)//select1为品牌 或者 select2为种类
            $tar.remove();
            $("#"+mid+" .select-all").addClass("selected").siblings().removeClass("selected");
            // console.log($("#"+mid+" .select-all"))
            if(mid=="select1"){
                band_id=$("#"+mid+" .select-all").children().attr("href")
                //console.log( band_id)
                var stateObject={band_id:band_id}
                var title ="product_list.html?band_id="+band_id+"&category_id="+category_id
                var newUrl='product_list.html?band_id='+band_id+'&category_id='+category_id
                history.pushState(stateObject,title,newUrl)
                ////console.log(band_id);
                loadProductListByPno(1,0,band_id,category_id)
            }
            if(mid=="select2"){
                category_id=$("#"+mid+" .select-all").children().attr("href")
                //console.log( band_id)
                var stateObject={category_id:category_id}
                var title ="product_list.html?band_id="+band_id+"&category_id="+category_id
                var newUrl='product_list.html?band_id='+band_id+'&category_id='+category_id
                history.pushState(stateObject,title,newUrl)
                ////console.log(band_id);
                loadProductListByPno(1,0,band_id,category_id)
            }
        });
    })
})

//清除功能
$(".eliminateCriteria").on("click", function() {
    $("#selectA>a").remove();
    $("#selectB>a").remove();
    $("#selectC>a").remove();
    $(".select-all").addClass("selected").siblings().removeClass("selected");
    var stateObject={band_id:0,category_id:0}
    var title ="product_list.html?band_id="+0+"&category_id="+0
    var newUrl='product_list.html?band_id='+0+"&category_id="+0
    history.pushState(stateObject,title,newUrl)
    loadProductListByPno(1,0,0,0)
})
//为按钮绑定点击事件:由于元素动态添加
$("#pagination").on("click","li a",
    function(e){
        //1:阻止事件默认行为  a button submit
        e.preventDefault();
        //2:获取当前页码
        var pno = parseInt($(this).text());
        //3:调用上面分页函数
        loadProductListByPno(pno,12,0,0);
    });
























