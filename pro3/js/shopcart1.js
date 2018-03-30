/**
 * 购物车列表页
 */
$(()=>{
    $.ajax({
        type:"get",
        url:"data/cart/getCart.php",
        dataType:"json"
    }).then(output=> {
    // console.log(output);
      // console.log(typeof(output))
      //  console.log(output.length);
      //  console.log(output[0].pack_name);
        var html="";
        for(var i=0;i<output.length;i++){
            var title=output[i].title;
            var count=output[i].count;
            var iid=output[i].iid;
            var lid=output[i].lid;
            var pack_name=output[i].pack_name;
            var taste_name=output[i].taste_name;
            var price=parseFloat(output[i].price).toFixed(2);
            var sales=parseFloat(output[i].sales).toFixed(2);
            //console.log(title);
            var total=parseFloat(sales*count).toFixed(2);
             html +=`<ul class="item-content clearfix" >`;
           html+=`<li class="td td-chk">
                        <div class="cart-checkbox ">
                            <input class="check" id="J_CheckBox_170037950254" name="items[]" value="170037950254" type="checkbox">
                            <label for="J_CheckBox_170037950254"></label>
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
                                    <em class="J_Price price-now" tabindex="0">${sales}</em>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="td td-amount">
                        <div class="amount-wrapper ">
                            <div class="item-amount ">
                                <div class="sl">
                                    <input class="min am-btn" name="" type="button" value="-">
                                    <input class="text_box" name="" type="text" value="${count}" style="width:30px;">
                                    <input class="add am-btn" name="" type="button" value="+">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="td td-sum">
                        <div class="td-inner">
                            <em tabindex="0" class="J_ItemSum number">${total}</em>
                        </div>
                    </li>
                    <li class="td td-op">
                        <div class="td-inner">
                            <a title="移入收藏夹" class="btn-fav" href="#">
                                移入收藏夹</a>
                            <a href="javascript:;" data-point-url="#" class="delete">
                                删除</a>
                        </div>
                    </li>`
            html+=` </ul>`;
            $("#cartlist").html(html);
        }

    })








})


















