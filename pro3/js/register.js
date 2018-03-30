$(()=>{ 
      $("#register").validate({
				submitHandler(form){
					$.ajax({
						type:"post",
						url:"data/users/submit.php",
						data:$(form).serialize()
					}).then(text=>{
						console.log(typeof(text)+text);

                        if(text==='1'){
                            alert("注册成功")
                             location="login.html";
                        }      
                        else{
                            alert("注册失败")
                        }
					})
				},
				rules:{
                    uname:{
						required:true,
						minlength:2,
						remote:"data/users/vali.php"
					},
					upwd1:{
						required:true,
						minlength:6,
						maxlength:8,
						digits:true
					},
					upwd2:{
						required:true,
						equalTo:"#upwd1"
					},
                    agree:{
                       required:"#readerMe:checked"
                    }
				},
				messages:{
					uname:{
						remote:"用户名已被占用"
					},
					upwd2:{
						equalTo:"两次密码输入不一致"
					}
                  
				}
			})


})












