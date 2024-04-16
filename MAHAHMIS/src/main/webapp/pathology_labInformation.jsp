<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Information</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />


<!-- include js for development -->
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/pathology_labinformation.js"></script>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="left_menu_pathologyNew.jsp"%>

		<!-- /SIDEBAR -->
		<div id="main-content">
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									<!-- STYLER -->

									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
										<li><a href="pathology_dashboard.jsp">LIS</a></li>
										<li><a href="NewPathologyOwnLab.jsp">Lab Information</a></li>
										<div class="li pull-right">
											<button class="btn btn-xs btn-success editUserAccess" onclick="saveOwnLabDetails();" 
											title="" data-placement="left" data-toggle="tooltip" 
											data-original-title="Save Lab Info">
											<i class="fa fa-save"></i>
											</button>
										</div>
									</ul>
									<!-- /BREADCRUMBS -->
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="col-md-12">
							<div class="container">
							<div class="panel panel-primary">
							<div class="panel-heading" id="divEhatContent">Own Lab Details 
							</div>
						<div class="panel-body">
								<div class="col-md-6">
									<div class="col-md-6">
									<div class="form-group col-m-4">
										<label for="LabName">Name<b
											style="color: red;">*</b></label> <input id="txtLabName"
											class="form-control input-SmallText" type="text"
											name="txtLabName" placeholder="lab name" value="">
									</div>
									<div class="form-group col-m-4">
										<label for="LabAddress">Address</label> 
											<textarea id="txtAddress" class="form-control" placeholder="address" required="true" 
											type="text"></textarea>
									</div>
									<div class="form-group col-m-4">
										<label for="parent">Email</label> 
										<input type="text" class="form-control tip-focus"
											id="email" placeholder="enter email "
											title="Please enter email" name="email"
											data-name="email">
									</div>
									<div class="form-group col-m-4">
										<label for="telephoneNo">Telephone No<b style="color: red;">*</b></label>
										<input type="text" class="form-control tip-focus"
											id="txtTelephone" placeholder="Enter Telephone No"
											title="Please Enter Telephone No" name="txtTelephone">
									</div>

									<div class="form-group col-m-4">
										<label for="type">Lab Code</label>
										<input type="text" class="form-control tip-focus"
											id="txtLabCode" placeholder="Enter Lab Code"
											title="Please Enter Lab Code No" name="txtLabCode">
									</div>
									
									<div class="form-group col-m-4">
										<input type="hidden" class="form-control tip-focus"
											id="hiddenMainLabId" value="0" name="hiddenMainLabId">
									</div>
									
									</div>
								</div>
								<div class="col-md-6">
								<div class="col-sm-6">
									<div class="form-group col-m-4">
										<label>Pathologist<b
											style="color: red;">*</b></label> <input type="text"
											class="form-control tip-focus" id="txtPathologist"
											placeholder="Enter Pathologist"
											title="Please enter Pathologist" name="txtPathologist">
									</div>
									<div class="form-group col-m-4">
										<label for="Degree">Degree</label>
										<input type="text"
											class="form-control tip-focus" id="txtDegree"
											placeholder="Enter Degree"
											title="Please enter Degree" name="txtDegree">
									</div>
									<div class="form-group col-m-4">
										<label for="Opening Time">Opening Time</label>
										<input type="text" class="form-control tip-focus" id="txtOpeningTime"
											placeholder="Choose Opening Time"
											title="Please choose opening time" name="txtOpeningTime">
									</div>
									<div class="form-group col-m-4">
										<label for="Lunch Time">Lunch Time</label> 
										<input type="text" class="form-control tip-focus" id="txtLunchTime"
											placeholder="Choose Lunch Time"
											title="Please chhose lunch time" name="txtLunchTime">
									</div>
									<div class="form-group col-m-4">
										<label for="Closing Time">Closing Time</label> 
										<input type="text" class="form-control tip-focus" id="txtClosingTime"
											placeholder="Choose Closing Time"
											title="Please choose closing time" name="txtClosingTime">
									</div>
									<div class="form-group col-m-4">
										<label for="challan number">Closed Day</label>
										<select id="selClosedDay" class="form-control">
											<option value="NO">--Select Day--</option>
											<option value="SUNDAY">SUNDAY</option>
											<option value="MONDAY">MONDAY</option>
											<option value="TUESDAY">TUESDAY</option>
											<option value="WEDNESDAY">WEDNESDAY</option>
											<option value="THURSDAYS">THURSDAYS</option>
											<option value="FRIDAY">FRIDAY</option>
											<option value="SATURDAY">SATURDAY</option>
										</select>
									</div>
								</div>
								</div>
						</div>
					</div>
					</div>
					</div>
					</div>

					<div class="footer-tools">
						<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
						</span>
					</div>
				</div>
				</div>
				<!-- /CONTENT-->
			</div>
		</div>
		<div id="pleaseWait" style="text-align: center; display: none;">
			<img style="margin-top: 250px;" height="43px"
				src="images/loading_black.gif" />
			<div style="margin-top: 10px; color: white">
				<b>Please wait...</b>
			</div>
		</div>
		<%@include file="footer_nobel.jsp"%>
	</section>
	<!--/PAGE -->
	<%@include file="footer_nobel.jsp"%>
	<!-- JAVASCRIPTS -->

	<script
		src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

	<!-- BLOCK UI -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript"
		src="ehat-design/js/typeahead/typeahead.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- DATA TABLES -->
	<script type="text/javascript"
		src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->

	<!--TIMEPEACKER -->
	<link rel="stylesheet" type="text/css"
		href="timepeacker/jquery.datetimepicker.css" />
	<script src="timepeacker/jquery.datetimepicker.js"></script>
	<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
		});
	</script>
	
	<script type="text/javascript">
	onload = function() {
		fetchOwnLabDetails('LabForm');
		$("#pathManagement").addClass("anchorActive");

		$('#txtOpeningTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:15
			 }); 
		$('#txtLunchTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:15
			 }); 
		$('#txtClosingTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:15
			 }); 
	}
</script>
	
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id="userId"
		value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId"
		value="<%=session.getAttribute("uId")%>">
	<!-- /JAVASCRIPTS -->
	 </c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>
</html>