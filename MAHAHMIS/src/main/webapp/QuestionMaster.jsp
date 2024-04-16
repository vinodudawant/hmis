<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Question Master</title>
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

<!-- JQUERY -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
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
<script type="text/javascript" src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>


<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("QuestionMasterDetails"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		defaultQueListView('QuestionMasterDetails','onload');
		defaulthraListView('QuestionMasterDetails','onload');
		getQueMAxID();
		/* setAutoPatientName("byName", "onload", "UserMgmt_Database"); */
	};

</script>


</head>
<body style="background: white ! important;">
	<section id="page">

		<%-- <c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if> --%>
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

				<%@include file="left_menu_admin.jsp"%>
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

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="QuestionMaster.jsp">Question Master</a></li>
												<div class="pull-right" id="savebtn">
													<button class="btn btn-xs btn-success"
														data-toggle="tooltip" data-placement="left"
														title="Save Question"
														onclick="InsertQue('insert','admin')">
														<i class="fa fa-save"></i>
													</button>
												</div>
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->
								<div class="col-md-12-1">
									<div style="font-weight: bold;" class="col-md-1-1">Search
										By:</div>
									<div class="col-md-2-1" style="padding-left: 2%;">Question :</div>
									<div style="margin-top: 0px;" class="col-md-2-1 TextFont"
										id="divbyName">
										<input class="typeahead form-control input-SmallText col-md-12-1" name="byName" type="text"
											 id="byName" 
											onkeypress="(this.id,'onload','QuestionMasterDetails')"/>
									</div>
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" class="edit"
											onclick="defaultQueListView('QuestionMasterDetails','search')" />
									</div>
								</div>

								<input type="hidden" id="txtUserID" value="" />

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body" class="col-md-12-1">
										<div class="divide-10"></div>
								<div id="infoDiv" class="col-md-4-1" style="border: 1px solid #b8b8b8; height: 460px;">
								<div id="" style="width: 100%; border: 1px solid #ddd; height: 460px;" class="col-md-13-1">
								<div style="width: 100%; padding-top: 2.5%; padding-left: 10%">
									<div id="headerTag" style="width: 100%;">
										<h3>Add Question</h3>
									</div>
									
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont">Question ID:</label> 
												<input type="text" class="form-control input-SmallText" disabled="disabled" value="" name="txtQueID" id="txtQueID">													
									</div>
									<div class="form-group col-md-9-1">
											<div class="divide-10"></div>
											<label class="TextFont">HRA Type:</label> 
											<select id="txthraType" class="form-control input-SmallText TextFont">
											</select>										
									</div>
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont">Question:</label> 
												<input type="text" class="form-control input-SmallText" name="txtQue" id="txtQue">													
									</div>
									
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont">Question Type:</label>
											<select onchange="showQueTypeDiv()" id="txtQueType" class="form-control input-SmallText TextFont">
											<option value="select">-Select Question Type-</option>
											<option value="text">Text</option>
											<option value="radio">Radio</option>
											<option value="checkbox">Checkbox</option>
											</select>												
									</div>
									
									<div id="idText" class="form-group col-md-9-1" style="">
									</div>
									<div id="idRadio" class="form-group col-md-9-1" style="">
									</div>
									<div id="idCheckbox" class="form-group col-md-9-1" style="">
									</div>
									
								</div>
								</div>
							</div>
							
										<div class="divide-10"></div>
										<div id="listQueTemp" class="col-md-7-1"
											style="margin-left: 4%;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="userID" />
				<input type="hidden" id="querytype" />
				<input type="hidden" id="count" value="0"/>
				<input type="hidden" id="txtQueType" value="0"/>
				<input type="hidden" id="dynaCountt" value="0"/>
			</div>
			<div><%@include file="Footer.jsp"%></div>
			<div id="userObj" style="display: none;"></div>
			<div id="objQue" style="display: none;"></div>
		</c:if>
	</section>
</body>
</html>