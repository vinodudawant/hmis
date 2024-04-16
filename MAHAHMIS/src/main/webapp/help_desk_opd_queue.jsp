<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

<!-- JQUERY -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
<!--DEVELOPERS JS -->
<script type="text/javascript" src="js/help_desk_opd_queue.js"></script>
<script type="text/javascript" src="js/registration.js"></script>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Token Management</title>

<script>
jQuery(document).ready(function() {

	getAllSpecialityMaster();
	displayLED();
	//setInterval( function(){ displayLED(); }, 15000);
	fetchAdvertisementImgNames();
});

</script>

</head>
<body>

	<input type="hidden" id="tokenLimitIn" value="0">
	<input type="hidden" id="tokenLimitNext" value="0">
	<input type="hidden" id="tokenLimitWait" value="0">
	
	<div class="row" style="margin-top: 25px;">
		<div class="col-md-12" id="divMain">
		<div class="panel" style="font-size: x-large">&nbsp&nbsp&nbsp Speciality Name : <%=request.getParameter("specialityName") %></div>
		<div class="col-md-12" id="divTokenNumber">
			<table class="table table-bordered table-condensed"
				style="font-size: 25px;">
				<thead>
					<tr>
						<th	class="col-md-2" style="background-color: rgb(80, 235, 210); text-align: center;line-height:53px;">Room</th>
						<th	class="col-md-1" style="background-color: rgb(80, 235, 210); text-align: center;line-height:53px;">DocName</th>
						<th	colspan="3" class="col-md-8" style="background-color: rgb(0, 191, 255); text-align: center;">Token</th>
					</tr>
					
					<tr>
						<th	class="col-md-2" style="background-color: rgb(80, 235, 210); text-align: center;line-height:53px;"></th>
						<th	class="col-md-1" style="background-color: rgb(80, 235, 210); text-align: center;line-height:53px;"></th>
						<th class="col-md-3">	
							<div class="col-md-12" style=''>
							<input title='' class='btn btn-success ' type='button' style='font-size: 18px; width:1%;color: black;margin-left: 10px !important;border: 1px solid black;'/>
							   <label for="IN" style="font-size: 16px">- IN</label>
							</div>
						</th>
						<th class="col-md-3">
							<div class="col-md-12" style='' >
							<input title='' class='btn btn-warning ' type='button' style='font-size: 18px; width:1%;color: black;margin-left: 10px !important;border: 1px solid black;'/>
							 <label for="IN" style="font-size: 16px">- NEXT</label>
							</div>
						</th>
						<th class="col-md-3">
							<div class="col-md-12" style=''>
							<input title='' class='btn btn-danger ' type='button' style='font-size: 18px; width:1%;color: black;margin-left: 10px !important;border: 1px solid black;'/>
							 <label for="IN" style="font-size: 16px">- WAITING</label>
							</div>
							
						</th>
					</tr>
					
				</thead>
				<tbody id="displayLEDBody">
				</tbody>
			</table></div>
			<div class="col-md-6 hide" id="divMarquee">
				
				<!-- <marquee id="advertisementMarquee" class="col-md-12" behavior="scroll" Height="600px" direction="up"
					scrollamount="5" onmouseover="this.setAttribute('scrollamount',0);" onmouseout="this.setAttribute('scrollamount',5);">
						<img src='images/Advertisement/add1.jpg' width='100%' height='300'alt='No Add' >
							<img src='images/Advertisement/add2.jpg' width='100%' height='300'alt='No Add' >
							<img src='images/Advertisement/add3.jpg' width='100%' height='300'alt='No Add' >
							<img src='images/Advertisement/add4.jpg' width='100%' height='300'alt='No Add' >
							<img src='images/Advertisement/IRFAN_KHAN.jpg' width='100%' height='300'alt='No Add' >
				</marquee> -->
			</div>
		</div>		
	</div>
	<input type="hidden" id="specialityId" value="<%=request.getParameter("specialityId")%>">
	<input type="hidden" id="specialityName" value="<%=request.getParameter("specialityName")%>">
</body>
</html>