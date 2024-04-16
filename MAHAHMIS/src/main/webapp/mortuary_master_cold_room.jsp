
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ColdRoom Martuary</title>

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

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!---------------------------- Added by vinod ----------------------------------------->

<!-- for table auto complete-->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<script type="text/javascript"
	src="ehat-design/js/select2/select2.min.js"></script>
<script type="text/javascript"
	src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
<script type="text/javascript"
	src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

<!---------------------------- /Added by vinod ----------------------------------------->

<!-- for Developers  -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>

<script type="text/javascript" src="js/ehat_master_cold_room.js"></script>
<script type="text/javascript" src="js/mortuary_Beds_cold_Room.js"></script>
<script type="text/javascript" src="js/ehat_register_mortuary.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript">
	onload = function() {
		$("#ipdman").addClass("anchorActive");
		$(document).ready(function() {
			App.setPage("wizards_validations"); // Set current page
			App.init(); // Initialise plugins and elements
			FormWizard.init();
		});
		fetchcoldroommaster();

	}
</script>
</head>
<body style="background: white ! important;">
	<section id="page">
		<c:if test="${ sessionScope.userType != null }">
			<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
			<div id="outer" class="container-main">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%></header>
				<!--/HEADER -->

				<%@include file="left_menu_mortuary.jsp"%>
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
												<li><a href="ehat_mortuary.jsp">Mortuary</a></li>
												<li><a href="ehat_master_cold_room.jsp">ColdRoom</a></li>
												<div class="li pull-right">
													<!-- <button class="btn btn-xs btn-success editUserAccess"
														data-toggle="tooltip" data-placement="left"
														title="Save Complaints Template"
														onclick="saveComplaints()">
														<i class=" fa fa-save"></i>
													</button> -->
												</div>
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common Code-->

								<div class="panel panel-default" style="height: 50%;">
									<div class="panel-body" style="">

										<div id="AddComplaintTemplate"
										style=""
											class='col-sm-4-1'>




											<!-- ---Add Complaint Template (Start)---- -->

											<div class="col-md-12-1 ">
												<div class="from-group">
												<div class="divide-40"></div>
												<h4 id="title"><label>Cold Room:</label></h4>
												<div class="divide-20"></div>
											</div>

											<input type="hidden" name="" id="coldroomid" value="">
											<div class="from-group">
											<div class="form-group Remove-Padding col-md-12-1" style="">
												<div class="divide-20"></div>
												<div class="col-md-4-1">
													Cold Room<b style="color: red;">*</b>:
												</div>
												<div class="col-md-5-1" style="width: 65%; margin-top: -3%;">
													<input type="text" id="coldroomname" name="" style=""
														maxlength="450" />
												</div>
											</div>
											</div>
											<div class="from-group">
											<div class="form-group Remove-Padding col-md-12-1"
												style="padding-top: 3%;">
												<div class="divide-20"></div>
												<div class="col-md-4-1">
													Quantity Of Beds<b style="color: red; ">*</b>:
												</div>
												<div class="col-md-5-1" style="margin-top: -4%;">
													<input type="text" id="quantityofbeds" name="" style=""
													onkeypress="return validateNumOnly(event)" 
														maxlength="450" />
												</div>
											</div>
											</div>
												<div class="from-group" >
											<div class="form-group Remove-Padding col-md-7-1 center" style="margin-top: 3%;" >
										
												<button class="pull-right btn btn-xs btn-success"
													onclick="setColdroomMaster()"
													>Save</button>
											</div>
											</div>
											<!-- ---Add Complaint Template (End)---- -->

										</div>
										</div>

										<div id="PrevComplaintListBox"
											style="margin-top:0%; "
											class='col-sm-8-1'>

											<div class='col-md-12-1' style='margin-top: 3%;'>
												<div class="col-md-12-1" style="margin-top: 9px;">
													<!--Start Table Heading -->
													<div class="col-sm-12-1">
														<div class="col-md-1-2 pull-right">
															
														</div>
														<table class="table table-condensed">
															
														</table>

													</div>
													<!--End Table Heading -->
													<!--Start Table Body -->
													<div class="col-md-11-1"
														style="width:100%; padding-left: 14%;">
														<div class="col-sm-12-1"
															style="border: 1px solid #ddd; overflow: auto;height: 450px; margin-top:  ">
															<table class="table table-striped table-bordered header-fixed cf"  >
																<tbody id="masterModuleBodycoldroom">

																</tbody>
															</table>
														</div>
														<input type='hidden' value='0' id='addRowCount' /> <input
															type='hidden' value='0' id='RowCount' />
														<!--End Table Body -->

													</div>
												</div>

											</div>
											<!-- /PrevListBox -->
										</div>
										<!-- /panel-body -->
									</div>
									<!-- /panel -->
								</div>
								<!-- /content -->
							</div>
							<!-- /row -->
						</div>

					</div>

					<input type="hidden" id="ehat_hallId" value="0"> <input
						type="hidden" value="<%=session.getAttribute("userLoginName")%>"
						id="userNameLogIn" /> <input type="hidden" id="unitId"
						value="<%=session.getAttribute("uId")%>">
					<div style="display: none;" id="hallDetailDiv"></div>
					<%@include file="Footer.jsp"%>
				</div>
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
</html>