<!DOCTYPE html>
<html lang="en">
<head>
	<title>HMIS LOGIN</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="login/images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="login/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="login/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="login/fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="login/vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="login/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="login/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="login/vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="login/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="login/css/util.css">
	<link rel="stylesheet" type="text/css" href="login/css/main.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100" style="background-image: url('login/images/login_back.jpg');">
			<div class="wrap-login100">
				<div class="row">
					<div class="col-md-6">
						<form class="login100-form validate-form" style="margin-top: 85px">
						
							<span class="login100-form-logo" style="height: 220px;width: 350px;">
								<!-- <i class="zmdi zmdi-landscape"></i> -->
								<img src="images/Hospital/logo.png" style="height: 155px;width: 250px">
							</span>
						</form>
					</div>
					<div class="col-md-6">
						<form class="login100-form validate-form">
						
							<!-- <span class="login100-form-logo" style="height: 100px;width: 150px">
								<i class="zmdi zmdi-landscape"></i>
								<img src="images/Hospital/logo.png" style="height: 90px;width: 140px">
							</span> -->
		
							<span class="login100-form-title p-b-34 p-t-27">
								HMIS Login
							</span>
		
							<div class="wrap-input100 validate-input" data-validate = "select unit"> 
								<select id="uId" class="input100 form-control">
								</select>						
							</div>
							
							<div class="wrap-input100 validate-input" data-validate = "Enter username">
								<input class="input100" type="text" id="userName" name="username" placeholder="Username" autocomplete="off">
								<span class="focus-input100" data-placeholder="&#xf207;"></span>
							</div>
		
							<div class="wrap-input100 validate-input" data-validate="Enter password">
								<input class="input100" type="password" id="password" name="pass" placeholder="Password">
								<span class="focus-input100" data-placeholder="&#xf191;"></span>
							</div>
							
							<!-- <div class="contact100-form-checkbox">						
								
							</div> -->
							
							<div class="validate-input">
								<label class="label100" id="failMsg" style="text-align: center;color: white;"></label>
							</div>
							
							<div class="container-login100-form-btn">
								<button id="btnLogin" type="button" class="login100-form-btn" onclick="checkUserLogin()">
									Login
								</button>
							</div>									
							
							<!-- <div class="text-center p-t-90">
								<a class="txt1" href="#">
									Forgot Password?
								</a>
							</div> -->
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>	
	
<!--===============================================================================================-->
	<script src="login/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="login/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="login/vendor/bootstrap/js/popper.js"></script>
	<script src="login/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="login/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="login/vendor/daterangepicker/moment.min.js"></script>
	<script src="login/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="login/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="login/js/main.js"></script>
	
	<script src="js/users.js"></script>
	
	<script>

		$(window).keypress(function (e) {
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
		    $('#btnLogin').click();
		    return false;  
		  }
		});   
		
		jQuery(document).ready(function() {
			
			jQuery.ajax({
				async : true,
				type : "POST",
				url : "ehat/unit/fetchUnitList",
				success : function(r) {
					
					var htm = "";
					for ( var i = 0; i < r.lstUnit.length; i++) {
						
						htm = htm + "<option value='"+r.lstUnit[i].unitId+"'>"+r.lstUnit[i].unitName+"</option>";
					}
					$("#uId").html(htm);
				}
			});
		});
	</script>

</body>
</html>