/**
 * 购物车列表页
 */
    function myloadcart() {
        $.get("data/users/islogin.php").then(data=> {
            if (data.ok == 0) {
                location = "login.html?back=" + location.href;
            } else {
                $.ajax({
                    type: "get",
                    url: "data/cart/getCart.php",
                    dataType: "json"
                }).then(output=> {
                    // console.log(output);
                    // console.log(typeof(output))
                    //  console.log(output.length);
                    //  console.log(output[0].pack_name);
                    var html = "",sum=0,quantity=0,checkAll=true;
                    if(output.length==0){ checkAll=false;
                    }else {
                        for (var i = 0; i < output.length; i++) {
                            var title = output[i].title;
                            var count = output[i].count;
                            var iid = output[i].iid;
                            var lid = output[i].lid;
                            var pack_name = output[i].pack_name;
                            var taste_name = output[i].taste_name;
                            var price = parseFloat(output[i].price).toFixed(2);
                            var sales = parseFloat(output[i].sales).toFixed(2);
                            //console.log(title);
                            var total = parseFloat(sales * count).toFixed(2);
                            var isCheck = output[i].isCheck;

                            html += `<ul class="item-content clearfix" data-toggle="${lid}">`;
                            html += `<li class="td td-chk">
                                    <div class="cart-checkbox ">
                                        <input  type="checkbox" data-iid="${iid}" class=${isCheck == 1 ? 'checked' : ''}  ${isCheck == 1 ? 'checked' : ''}/>
                                    </div>
                                </li>
                                <li class="td td-item">
                                    <div class="item-pic">
                                        <a href="#" target="_blank" data-title="${title}" class="J_MakePoint" data-point="tbcart.8.12">
                                            <img src="images/kouhong.jpg_80x80.jpg" class="itempic J_ItemImg"></a>
                                    </div>
                                    <div class="item-info">
                                        <div class="item-basic-info">
                                            <a href="#" target="_blank" title="${title}" class="item-title J_MakePoint" data-point="tbcart.8.11">${title}</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-info">
                                    <div class="item-props item-props-can">
                                        <span class="sku-line">口味：${taste_name}</span>
                                        <span class="sku-line">包装：${pack_name}</span>
                                        <span tabindex="0" class="btn-edit-sku theme-login">修改</span>
                                        <i class="theme-login am-icon-sort-desc"></i>
                                    </div>
                                </li>
                                <li class="td td-price">
                                    <div class="item-price price-promo-promo">
                                        <div class="price-content">
                                            <div class="price-line">
                                                <em class="price-original">${price}</em>
                                            </div>
                                            <div class="price-line">
                                                <em class="J_Price price-now" tabindex="0" >${sales}</em>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-amount">
                                    <div class="amount-wrapper ">
                                        <div class="item-amount ">
                                            <div class="sl" data-iid="${iid}">
                                                <input class="min am-btn" name="" type="button" value="-">
                                                <input class="text_box" name="" type="text" value="${count}" style="width:30px;">
                                                <input class="add am-btn" name="" type="button" value="+">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="td td-sum">
                                    <div class="td-inner">
                                        <em tabindex="0" class="J_ItemSum number" id="total">${total}</em>
                                    </div>
                                </li>
                                <li class="td td-op">
                                    <div class="td-inner">
                                        <a title="移入收藏夹" class="btn-fav" href="#">
                                            移入收藏夹</a>
                                        <a href="javascript:;" data-iid="${iid}" class="delete" data-title="${title}" data-pack="${pack_name}" data-taste="${taste_name}">
                                            删除</a>
                                    </div>
                                </li>`
                            html += ` </ul>`;
                            $("#cartlist").html(html);
                            if (isCheck == 1) {
                                sum += sales * count;
                                quantity += 1;
                            } else {
                               // console.log(checkAll)
                                checkAll = false;
                            }
                        }
                        $("#J_SelectedItemsCount").html(quantity)
                        $("#J_Total").html(parseFloat(sum).toFixed(2))
                    }
                   //console.log(checkAll)
                    if(checkAll) {
                        $("#J_SelectAllCbx2").attr("checked",true);
                    }else{
                        $("#J_SelectAllCbx2").attr("checked",false);
                    }

                })
            }
        })
    }

$(()=>{
    myloadcart();
})
$(()=>{
   // console.log(1)
    $(".concent").on("click",".min,.add",e=>{
        e.preventDefault()
        var $tar=$(e.target);
        var count=$tar.parent().children(":eq(1)").val();
        if($tar.is(".add"))
            count++;
        else
            count--;
        var iid=$tar.parent().data("iid");
       // console.log(iid)
        $.get("data/cart/updateCount.php",{iid,count})
            .then(myloadcart);
    }).on("click",".td-inner>.delete",e=>{
        e.preventDefault()
        var $tar=$(e.target);
        var iid=$tar.data("iid");
        var title=$tar.data("title")
        var taste=$tar.data("taste")
        var pack=$tar.data("pack")
        var titles=title+"--"+"口味:"+taste+"  包装:"+pack
        if(confirm("是否继续删除 "+titles+" 吗?"))
            $.get("data/cart/deleteItem.php",{iid})
                .then(myloadcart)
    }).on("click",".cart-checkbox >input",e=>{
        e.preventDefault()
        var $tar=$(e.target);
        var iid=$tar.data("iid");
       // console.log(iid)

        if($tar.hasClass("checked")){
            $tar.removeClass("checked")
            var isCheck=0;
        }
        else{
            $tar.addClass("checked")
            var isCheck=1;
        }
       // console.log(isCheck)
        $.get("data/cart/checkItem.php",{iid,isCheck})
            .then(myloadcart);
    })

    $("#J_SelectAllCbx2").click(e=>{
        e.preventDefault()
        var check_all=$(e.target).is(".checked")?1:0;
       // console.log(check_all)
       $.get("data/cart/checkAll.php",{check_all})
            .then(myloadcart);
    })
    //点击结算按钮更新product表的商品数量
    $.get("data/users/islogin.php").then(data=> {
        if (data.ok == 0) {
            location = "login.html?back=" + location.href;
        } else {
            $("#J_Go").click(e=> {
                e.preventDefault()
                // console.log(111)
                $.get("data/cart/account.php")
                    .then((result)=> {
                        // console.log(typeof(result))
                        // console.log(result)
                        //  console.log(result.length==0)
                        if (result.length != 0) {
                            // console.log(2222)   //更新product表的商品数量
                            var lid = 0, count, sold_count,iid;
                            for (var i = 0; i < result.length; i++) {
                                lid = result[i].lid
                                count = result[i].count
                                iid=result[i].iid
                               // console.log(lid + ":" + count)
                                $.get("data/product/getProductByLid.php", {lid})
                                    .then((result)=> {
                                       // console.log(result.product.sold_count)
                                        sold_count = result.product.sold_count - count
                                      //  console.log(sold_count+"--"+lid)
                                        $.get("data/cart/updateProduct.php", {lid, sold_count}).then()
                                    })
                                $.get("data/cart/deleteItem.php",{iid})
                                    .then(()=>{
                                        //   console.log("购物车更新成功")
                                        location="success.html"
                                    })
                            }
                        } else {
                            alert("请先选择商品")
                            //console.log("")
                        }
                    })
            })
        }
})
})
























