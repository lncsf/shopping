
$(()=>{
    var LIWIDTH=760, 
			timer=null, 
			moved=0, 
			duration=500, 
			wait=3000;
    $.ajax({
    url: 'data/product/index.php',
    success: function (data) {
       // console.log(data)
      //1.加载轮播广告项
      var adHtml = '';
		  for (var i = 0; i < data.carouselItems.length; i++) {
            var c = data.carouselItems[i];
            adHtml += `
                    <li >
                        <a href="${c.href}"><img src="${c.img}"></a>
                    </li>
                    `; 
          }
		var p0=data.carouselItems[0];
		adHtml+=`<li><a href="${p0.href}" title="${p0.title}">
				<img src="${p0.img}">
		</a></li>`		
		var $ul=$("[data-load=bannerImgs]")
		$ul.html( adHtml).css("width",LIWIDTH*(data.length+1));
		setInterval(()=>{
			moved++;
		     $ul.animate({
				left:-LIWIDTH*moved
			},duration,function(){
				if(moved==4){
					moved=0;
					$ul.css("left",0);
				}	
			})
		},wait+duration)
    }
})
})
//console.log(5);

$(()=>{
	$(window).scroll(()=>{
		var scrollTop=$(window).scrollTop();
		var offsetTop=$(".floor:first").offset().top;
       // console.log(scrollTop+':'+offsetTop)

		if(offsetTop<=scrollTop+innerHeight/2){
			$("#lift").show();
		}else{
			$("#lift").hide();
		}
		var $floors=$(".floor");
		for(var i=0;i<$floors.length;i++){
			var $f=$($floors[i]);
			if($f.offset().top>scrollTop+innerHeight/2){
				break;
			}
		}
	//	console.log(i);
		$(`#lift>ul>li:eq(${i-1})`)
			.addClass("lift_item_on")
			.siblings().removeClass("lift_item_on")
	})
	$("#lift>ul").on("click","a.lift_btn",function(){
		var $a=$(this);
		var i=$a.parent().index();
      
		var offsetTop=$(`.floor:eq(${i})`).offset().top;
		$("html").stop(true).animate({
			scrollTop:offsetTop-50
		},500)
	})
})



















