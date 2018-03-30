/**
 * Created by web-01 on 2006/1/25.
 */
//页面初始化
//测试记得在地址栏输入lid

$(()=>{
    var lid=location.search.split("=")[1];//"?lid=1"
   // console.log(lid);
    function myload(){
    $.ajax({
        type:"get",
        url:"data/product/getProductByLid.php",
        data:{lid:lid},
        dataType:"json"
    }).then(output=> {
       // console.log(output);
       var {product, band_name, category_name} = output;
        var {title, sales, price} = product;
      //  console.log(output);
         var {band_name} = band_name;
         var {category_name} = category_name;
        // // 导航条
         $(".am-breadcrumb.am-breadcrumb-slash").find(".categorys").html(category_name);
         $(".am-breadcrumb.am-breadcrumb-slash").find(".bands").html(band_name);
        // // 商品介绍
         $(".tb-detail-hd").children().html(title);
        // // console.log(3);
         $(".tb-detail-price>.iteminfo_price>dd>b").html(sales);
         $(".tb-detail-price>.iteminfo_mktprice>dd>b").html(price);
        // //商品详情
         var {material, yield, burdening, spec, expire, standard, licence, reserve, edible} = product;
         var html = "";
                 html += ` <li>原料产地:&nbsp;${material}</li>
                                     <li>产地:&nbsp;${yield}</li>
                                     <li>配料表:&nbsp;${burdening}</li>
                                     <li>产品规格:&nbsp;${spec}</li>
                                     <li >保质期:&nbsp;${expire}</li>
                                     <li>产品标准号:&nbsp;${standard}</li>
                                     <li>生产许可证编号：&nbsp;${licence}</li>
                                     <li>储存方法：&nbsp;${reserve}</li>
                                     <li>食用方法：&nbsp;${edible}</li>`;
             $(".J_Brand #J_AttrUL").html(html);
        //库存数量
            var {inventory} = product;
              $("#Stock>i").html(inventory)
        // //根据包装类型加载口味类型
        //console.log(product.taste_id);
        $.ajax({
            type: "get",
            url: "data/taste.php",
            data: {band_id: product.band_id, category_id: product.category_id,pack_id:product.pack_id},
            dataType: "json"
        }).then(output=> {
            // console.log(typeof(output));
            //  console.log(output);
            var {taste}=output;
            //  console.log(taste);//数组
            // console.log(product);//对象
            var html = "";
            for (var t = 0; t < taste.length; t++) {
                if (taste[t].taste_id == product.taste_id) {
                    html += `<li><a href="${taste[t].taste_id}"
			   	      class="sku-line selected" data-band="${product.band_id}" data-category="${product.category_id}" data-pack="${product.pack_id}">
                      ${taste[t].taste_name}</a></li>`;
                } else {
                    html += `<li><a href="${taste[t].taste_id}"
			   	      class="sku-line" data-band="${product.band_id}" data-category="${product.category_id}" data-pack="${product.pack_id}">
                      ${taste[t].taste_name}</a></li>`;
                }
                $(".cart-title+ul").html(html);
                //根据口味类型加载包装类型
                $.ajax({
                    type: "get",
                    url: "data/pack.php",
                    data: {band_id: product.band_id, category_id: product.category_id,taste_id:product.taste_id},
                    dataType: "json"
                }).then(output=> {
                    // console.log(typeof(output));
                    //  console.log(output);
                    var {pack}=output;
                    // console.log(pack.length);
                    var html = "";
                    for (var p=0;p<pack.length;p++) {
                        //    console.log(pack[p].pack_name);
                        if(pack[p].pack_id==product.pack_id){
                            html += `<li><a href="${pack[p].pack_id}"
			   	      class="sku-line selected" data-band="${product.band_id}" data-category="${product.category_id}" data-taste="${product.taste_id}">
                      ${pack[p].pack_name}</a></li>`;
                        }else{
                            html += `<li><a href="${pack[p].pack_id}"
			   	     class="sku-line" data-band="${product.band_id}" data-category="${product.category_id}" data-taste="${product.taste_id}">
                      ${pack[p].pack_name}</a></li>`;
                        }
                        $(".cart-title.packs+ul").html(html);
                    }
                })



            }
        });


      })
    }
    myload()
});
//点击口味和包装后加载页面
function loadpage(taste_id,pack_id,band_id,category_id){
    console.log('口味'+taste_id)
    console.log('包装'+pack_id)
    console.log('品牌'+band_id)
    console.log('种类'+category_id)
    $.ajax({
        type: "get",
        url: "data/taste_pack.php",
        data: {taste_id: taste_id, pack_id: pack_id, band_id: band_id, category_id: category_id},
        dataType: "json"
    }).then(output=> {
        // console.log(output);
        var {lid}=output;
        // console.log(lid);//数组
        // console.log(lid[0].lid)
        var lid=lid[0].lid;
       // console.log(lid);
        location='product_details.html?lid='+lid
    })
}
 //口味
  $(".theme-options .tastes").on("click","li>a",function(e) {
      e.preventDefault();
      $tar = $(e.target);
      $tar.addClass("selected").parent().siblings().children().removeClass("selected");
      taste = $tar.html();
      //获取口味编号，包装编号，品牌编号，种类编号
      var taste_id = $tar.attr('href'), pack_id = $tar.data('pack'), band_id = $tar.data('band'), category_id = $tar.data('category')
     // loadpack(taste_id,category_id,band_id);//动态加载所选口味对应的包装类型
     // console.log($tar);

      loadpage(taste_id,pack_id,band_id,category_id);//根据选项动态加载页面
   });

 //  //包装
   $(".theme-options .packs").on("click","li>a",function(e){
      $tar=$(e.target);
       e.preventDefault();
     //  console.log($tar.attr('href'));
       $tar.addClass("selected").parent().siblings().children().removeClass("selected");
       pack= $tar.html();
       var pack_id = $tar.attr('href'), taste_id = $tar.data('taste'), band_id = $tar.data('band'), category_id = $tar.data('category')
      // console.log($tar);
       //console.log('口味'+taste_id)
       //console.log('包装'+pack_id)
       //console.log('品牌'+band_id)
       //console.log('种类'+category_id)
    loadpage(taste_id,pack_id,band_id,category_id);
     //  loadtaste(pack_id,category_id,band_id);//动态加载所选包装对应的口味类型
   });


$(document).ready(function() {
  //  小图的切换
    $("#thumblist li a").click(function() {
        $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
        $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
        $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
    });
//标签切换
    $(".am-avg-sm-3.am-tabs-nav.am-nav.am-nav-tabs>li").click(function(e) {
        e.preventDefault();
        $(this).addClass("am-active").siblings().removeClass("am-active");
        //console.log($(this).data().toggle);
        $id=$(this).data().toggle;
       // console.log($id);
       $($id).addClass("am-in am-active").siblings().removeClass("am-in am-active");
       $($id).css("display","block").siblings().css("display","none")
    });


});
//数量
$("#min").click(e=>{
    var $tar=$(e.target);
    var n=parseInt($tar.next().val());
    var m=parseInt($("#Stock>i").html());
    if(n>1){
        n--; m++;
    }
    $tar.next().val(n);
    $("#Stock>i").html(m);
});
$("#add").click(e=>{
    var $tar=$(e.target);
    var n=parseInt($tar.prev().val());
    var m=parseInt($("#Stock>i").html());
    if(m>1) {
        n++;m--;
    }
    $tar.prev().val(n);
    $("#Stock>i").html(m);
});


//放大镜
(()=>{
    var ul=document.getElementById("thumblist");
   // console.log(ul);
    var LIWIDTH=62,OFFSET=20,moved=0;
    var mImg=document.getElementById("mImg"),
        largeDiv=document.getElementById("largeDiv"),
        mask=document.getElementById("mask"),
        superMask=document.getElementById("superMask");
    ul.onclick=e=>{
        //console.log(e);
        e.preventDefault();
        if(e.target.nodeName=="IMG"){
            mImg.src=e.target.dataset.md;
            largeDiv.style.backgroundImage=
                `url(${e.target.dataset.lg})`
        }
    }
    superMask.onmouseover=()=>{
        mask.style.display=largeDiv.style.display="block";
    }
    superMask.onmouseout=()=>{
        mask.style.display=largeDiv.style.display="none";
    }
    var MAX=175;
    superMask.onmousemove=e=>{
       // console.log(e);
        var offsetX=e.offsetX, offsetY=e.offsetY;
        var top=offsetY-175/2,
            left=offsetX-175/2;
        top=top<0?0:top>175?175:top;
        left=left<0?0:left>175?175:left;
        mask.style.top=top+"px";
        mask.style.left=left+"px";
        largeDiv.style.backgroundPosition=
            -left*16/7+"px "+(-top*16/7)+"px";
    }
})();
//点击加入购物车的功能
$("body").on('click', "#LikBasket", function (e) {
  //  console.log(1)
    e.preventDefault();
    var $tar=$(e.target);
   console.log($tar);
    $.ajax({
        type:"get",
        url:"data/users/islogin.php",
        dataType:"json"
    }).then(output=>{
     //   console.log(output);
        if(output.ok==0){
            location="login.html?back="+location.href
        }else{
            var lid=location.search.split("=")[1];
           // console.log(lid);
           // console.log($("#text_box"))
            var count=$("#text_box").val();
           // console.log(count);
            $.post("data/cart/addCart.php",{lid,count})
                .then(loadCart);
        }
    })
});

//点击立即购买跳转到购物车列表页
$("body").on('click', "#LikBuy", function (e) {
    e.preventDefault();
    var $tar=$(e.target);
    // console.log($tar);
    $.ajax({
        type:"get",
        url:"data/users/islogin.php",
        dataType:"json"
    }).then(output=>{
         console.log(output);
        if(output.ok==0){
            location="login.html?back="+location.href
        }else{
            location="shopcart.html?back="+location.href
            var lid=location.search.split("=")[1];
            var count=$("#text_box").val();
            $.post("data/cart/addCart.php",{lid,count})
                .then(loadCart);
        }
    })
});




































