/**
 * Created by web-01 on 2006/1/24.
 */
$(()=>{
    var $form=$(".login-form>form");
    console.log($form);
    $("[data-toggle=log]").click(()=>{//登录按钮绑定事件
        $.post("data/users/login.php",$form.serialize())
            .then(text=>{
                console.log(text);
                if(text==0){
                    $form[0].reset();
                    alert("用户名或密码不正确!")
                }else{
                    alert("登录成功!");
                    if(location.search!==""){
                        var back=location.search.slice(6);
                        location=back;
                    }else{
                        location="index.html";
                    }
                }
            })
    });
    $(window).keyup(e=>{
        if(e.keyCode==13) $("[data-toggle=log]").click();
    })
});