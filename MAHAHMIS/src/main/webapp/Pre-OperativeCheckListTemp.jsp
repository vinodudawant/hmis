<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Pre-Operative Check List</title>
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
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/operation.js"></script>


<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("PreOperativeCheckListMasterDetails"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		fetchTempTopicList('pre-op');
		/* setAutoPatientName("byName", "onload", "UserMgmt_Database"); */
	});
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
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_otmanagement.jsp"%>
				<%
					java.util.Calendar currentDate = java.util.Calendar.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
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
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="operationTypeManagement.jsp">Operation
														Management</a></li>
												<li><a href="Pre-OperativeCheckListTemp.jsp">Pre-Operative
														Check List Temp</a></li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
														data-toggle="tooltip" data-placement="left"
														title="Save/Update Template"
														id="btnSave" value="Save Now"
														onclick="saveTemplate('pre-op')">
														<i class="fa fa-save"></i>
													</button>
														<button class="btn btn-xs btn-danger deleteUserAccess"
														data-toggle="tooltip" data-placement="left"
														title="Delete Template"
														id="btnDelete"
														onclick="deleteTempTopic('pre-op')">
														<i class="fa fa-trash-o"></i>
														</button>
												</div>
												
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="row">
									<div class="col-md-12">
										<div class="panel panel-default">

											<div class="box-title" style="margin-left:1%; margin-bottom: 4%">
												<h4>
													Add Update Pre-Operative Check List Template
												</h4>
											</div>
											<div class="row">
												<div class="col-md-12" >
														
													<div class="col-md-4">
													<label>Select Group Name</label>
														<select id="chkTopicList"
															class="form-control input-SmallText TextFont"
															onchange="setGender('demo')">
														</select>
													</div>
														
													<div class="col-md-4">
													<label>Name</label>
													<input type="text" id="txtTempName" class="col-md-12" style="margin-top:-0.5%;"/>
														
													</div>

												</div>

											</div>
											<hr>
											<div class="row">
											<div class="col-md-12" style="margin-top: -10px;">
												<!--Start Table Heading -->
												<div class="col-md-12">
													<table class="table table-condensed">
														<thead>
															<tr>
																<th><div class="col-md-1 ">#</div></th>
																<th class="col-md-8 center" style="height: 21.5px;"><div
																		class="TextFont">Pre-Operative List Name</div></th>
																<th class="col-md-2 center" style="height: 21.5px;"><div
																		class="TextFont">Remark</div></th>
																<th class="col-md-1 center" style="height: 21.5px;"><input
																	type="button" onclick="addRowPOCLTemp()"
																	value="+" id="btnAdd" /> <input type="button"
																	onclick="removeRowPOCLTemp('RowCount')"
																	value="-" /></th>
															</tr>
														</thead>
													</table>
												</div>
												<!--End Table Heading -->
												<!--Start Table Body -->
												<div class="col-md-12"
													style="overflow-y: scroll; height: 345px; maxheight: auto; margin-top: -20px;">
													<table class="table table-striped table-condensed cf">
														<tbody id="TableBodyPCAdminInstructionTempName">
														</tbody>
													</table>
												</div>
												<input type='hidden' value='0' id='addRowCount' /><input
													type='hidden' value='0' id='RowCount' />
												<!--End Table Body -->
											</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="userID" /> <input type="hidden"
					id="querytype" />
			</div>
			<div><%@include file="footer_nobel.jsp"%></div>
			<div id="userObj" style="display: none;"></div>
			<div id="divPreopCheckList" style="display: none;"></div>
			
            <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		</c:if>
	</section>
</body>
</html>