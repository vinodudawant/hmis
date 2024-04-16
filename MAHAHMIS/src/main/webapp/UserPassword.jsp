<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Change User Password</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />


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

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		$("#profile").addClass("anchorActive");
		//defaultViewUser('UserManagement');
		$("#oldpassword").val("");
		$("#newpassword").val("");
		$("#newpassword1").val("");

	}
</script>
</head>
<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_home.jsp"%>
				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-11-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="UserPassword.jsp">User Profile</a></li>
											</ul>
											<button class="pull-right btn btn-xs btn-success"
												onclick='savechangedUserPassword()' style="margin-top: 5px">Save</button>
										</div>
									</div>
								</div>
								<!-- /Common -->
								<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>
					<div
						style="width: 20%; float: right; padding-left: 15%; padding-top: 2%;">
						<div
							style="width: 92%; float: right; padding-top: 3%; padding-right: 8%">
							<div style="padding-right: 2%; width: 30%;" id="savebtn"></div>

						</div>
					</div>
				</div>
			</div> -->

								<form name="AdmiFrm" action="#">
									<div class='col-md-7-1' style="border: 1px solid #436a9d;"
										id="infoDiv">
										<div class='col-md-12-1'
											style='padding-top: 2.5%; padding-left: 10%'>
											<div class='col-md-12-1 center'>
												<h3>Change Password</h3>
											</div>

											<div class='col-md-12-1 ' style='padding-top: 2.5%;'>
												<div class='divide-10'></div>
												<div class='divide-20'></div>
												<div class='col-md-3-1'>Name:</div>
												<div class='col-md-7-1' style='color: red;'>
													<input id='fullName' class='col-md-10-1' name=''
														type='text' maxlength='150'
														value='${sessionScope.userName}'
														onkeypress='return validatealphabetic(event)' /> <b>
														*</b>
												</div>
											</div>
											<div class='col-md-12-1' style='padding-top: 5%;'>
												<div class='col-md-3-1'>User Name:</div>
												<div class='col-md-7-1' style='color: red;'>
													<input id='userNm' class='col-md-10-1' name='' type='text'
														maxlength='44' value='${sessionScope.userLoginName}' /><b>
														*</b>
												</div>
											</div>
											<div class='col-md-12-1' style='padding-top: 5%;'>
												<div class='col-md-3-1'>Enter Old Password:</div>
												<div class='col-md-7-1' style='color: red;'>
													<input class='col-md-10-1' type='password' id='oldpassword'
														name='oldpassword' maxlength='12' onblur='stringlength()' />
													<b> *</b>
												</div>
											</div>
											<div class='col-md-12-1' style='padding-top: 5%;'>
												<div class='col-md-3-1'>Enter New Password:</div>
												<div class='col-md-7-1' style='color: red;'>
													<input class='col-md-10-1' type='password' id='newpassword'
														name='newpassword' maxlength='12' onblur='stringlength()' />
													<b> *</b>
												</div>
											</div>
											<div class='col-md-12-1' style='padding-top: 5%;'>
												<div class='col-md-3-1'>Re-Enter New Password:</div>
												<div class='col-md-7-1' style='color: red;'>
													<input class='col-md-10-1' type='password'
														id='newpassword1' name='newpassword1' maxlength='12'
														onblur='stringlength()' /> <b> *</b>
												</div>
											</div>
											<!-- <div class='col-md-7-1'
												style='text-align: center; padding-top: 6%;'>
												<input type='button' value='Save'
													onclick='savechangedUserPassword()' />
											</div> -->
										</div>
									</div>
								</form>

								<form id="myform" name="myform">
									<div id="userMangTemp" class='col-md-7-1'
										style="height: 370px; margin-left: 20px;"></div>
								</form>
							</div>
						</div>
					</div>

					<%@include file="Footer.jsp"%></div>
				<input type="hidden" value="${sessionScope.userId}" id="txtUserId" />
				<%-- 			<input type="hidden" value="${sessionScope.userPass}" id="txtUserPass" /> --%>
				<input type="hidden" value="update" id="queryType" name="queryType" />

			</div>

			<div id="userObj" style="display: none;"></div>
		</c:if>
	</section>
</body>
</html>