<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>IPD BedWard GridView</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<link href="css/pop_up.css" rel="stylesheet" type="text/css" />

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>

<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<script src="js/jquery.datePicker-min.js" type="text/javascript"></script>

<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/bed.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<!-- loading -->
<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 100000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/EhatEnterprise/pharmacy/resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>

<script>
	jQuery(document).ready(function() {
		App.setPage("IPD_BedWardDashboard"); //Set current page
		App.init(); //Initialise plugins and elements
	});
	/* //loading */
	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
</script>
<script type="text/javascript">
	onload = function() {
		getHallAndBed(0);
		
	};
</script>

</head>

<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
			</div>
		</c:if>
		
		<%
			String moduleName = (String) session.getAttribute("moduleName");
				if (moduleName.equals("ipd")) {
		%>
		<%@include file="left_menu_IPDMain.jsp"%>
		<%
			} else {
		%>
		<%@include file="menu_HelpDesk.jsp"%>
		<%
			}
		%>
		
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					"dd-MM-yyyy");
			String todays_date = formatter.format(currentDate.getTime());
		%>
		<div id="main-content">
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">

						<!-- Page Date Print Discards Common Path info -->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									<ul class="breadcrumb col-md-12-1"
										style="padding: 6px 10px; margin-top: 1px;">
										<li>Date : <%=todays_date%></li>
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li><a href="IPD_OPD_Database.jsp">Help Desk</a></li>
										<li>IPD BedWard Grid View</li>
									</ul>
								</div>
							</div>

							<div class="divide-40"></div>

							<!-- Select Info type Header -->
							
									 <div id="allhallsBeds">
										
									</div> 
							


							
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="allHallAndBed" style="display: none;"></div>
			
			<input id="hallDetailDiv" type="hidden" /> <input id="allBedObj"
				type="hidden" />
		</div>
		
		<!-- //loading -->
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
		<!-- //loading -->
	</section>
</body>
</html>