$(()=>{
    //登录状态
  //  console.log(1);
    $("#header").load(
        "header.html",
        () => {
          function isLogin(){
            $.get("data/users/islogin.php")
            .then(data=>{
                 console.log(data);
                if(data.ok==0){
                    $("[data-toggle=loginList]").show()
                        .next().hide();
                    $("#J_MiniCartNum").html(0);
                }else{
                    $("[data-toggle=loginList]").hide()
                        .next().show()
                        .find("[data-name=uname]")
                        .html(data.uname);
                         loadCart();
                }
            })
          }
    isLogin();
    $(document.body).on(//为登录按钮绑定事件
        "click",
        "[data-toggle=loginList]>a:first-child",
        e=>{
            var $tar=$(e.target);
            location="login.html?back="+location.href;
        }
    );
    $(document.body).on(
        "click",
        "[data-toggle=welcomeList]>a:last-child",
        e=>{

            $.get("data/users/logout.php").then(isLogin);
        }
    );
           // console.log($("#mc-menu-hd"))
        //    console.log($("#mc-menu-hd"))
            //点击购物车跳转到购物车列表页面
            $("#mc-menu-hd").click(e=>{
                e.preventDefault();
                var $tar=$(e.target);
                console.log($tar);
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
                    }
                })
            });

        //设置搜索帮助
			$(document.body).on(
				"click",
				"[data-trigger=search]",
				function(){
					var $a=$(this);
					var $txtSearch=$a.parent().prev();
                     // console.log($txtSearch.val().trim())
					  if($txtSearch.val().trim()!=="")
					  	location="product_list.html?kw="+$txtSearch.val().trim();
					  else
					  	location="product_list.html";
				}
			);
            var search=location.search;//?kw=mac i7 256g
			if(search.indexOf("kw")!=-1)
				$(".txtSearch").val(
					decodeURI(search.split("=")[1])
                  
				);  
               // console.log($(".txtSearch").val())

})
});
function loadCart(){
    $.get("data/users/islogin.php").then(data=>{
       if(data.ok==1){
           $.get("data/cart/getCart.php")
               .then(items=>{
               //  console.log(items)
               //    console.log(items.length)
                   var total=items.length
                $("#J_MiniCartNum").html(total)
              });
       }
  })
}
//loadCart();








