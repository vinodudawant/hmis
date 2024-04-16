<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Hospital Holiday</title>
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
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
	<script type="text/javascript" src="js/hospitalDetailAdministrator.js"></script>
</head>
<body>
<script type="text/javascript">
jQuery(document).ready(function() {	
	fetchHospitalHoliday();			 
	getFetchHospitalOwnerDetail();
	App.setPage("wizards_validations");  //Set current page 
	App.init(); //Initialise plugins and elements  
	$(function() {
		$('[data-toggle="tooltip"]').tooltip();
	});	
	
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp
			.getDate(), 0, 0, 0, 0);
	var checkin = $('#dpd1').datepicker({
		onRender : function(date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {

		if (ev.date.valueOf() > checkout.date.valueOf()) {
			var newDate = new Date(ev.date);
			newDate.setDate(newDate.getDate() + 1);
			checkout.setValue(newDate);
		}
		checkin.hide();
		$('#dpd2')[0].focus();
	}).data('datepicker');

	var checkout = $('#dpd2').datepicker({
		onRender : function(date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {
		checkout.hide();
	}).data('datepicker');
	
	$('#date').datepicker({
		autoclose : true,
		 dateFormat: 'dd/mm/yy'
	});
	
			//below line to set current date on datepicker
			//$('#startDateId').datepicker('setDate', 'now');
			
			
			
			
	//below line to set current date on datepicker
	//$('#startDateId').datepicker('setDate', 'now');

});
</script>
<body style="background: white ! important;">
	<c:if test="${ sessionScope.userType != null }">
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="left_menu_admin.jsp"%>

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
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
									<li><i class="fa fa-home"></i> <a href="UserManagement.jsp">Administrator</a>
										</li>	
										<li><i class="fa fa-home"></i> <a href="admin_hospital_holiday.jsp">Hospital Holiday</a>
										</li>	
										<li class="pull-right">
										<button class="btn btn-xs btn-info pull-right" type="button" onclick="toggleForm('holidayForm')">
											<i class="fa fa-plus"></i> Hospital Holiday
										</button>
										</li>
									
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-md-4">
										
									</div>															
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
								
									<div class="panel panel-default">
									<div class="form-group col-md-2-1" style="width: 10%;margin-left: 1%">							
										<label class="TextFont">Year</label> 
										<select onclick="fetchHospitalHoliday()" id="selYear" class="form-control input-SmallText">
												<option value="2020">2020</option>
											</select>
											</div>
										<div class="panel-body" >
									
											<div class="row">
												<div class="col-md-12" id="holidayForm" style="display: none;">
													<div class="container">
														<div class="panel panel-primary">
										
															<div class="panel-heading" id="divEhatContent">Hospital Holiday</div>
																<div class="box-body big" id="divEhatContent">
													
																	<div class="row">
																		<div class="col-md-12" style="padding: 10px;">
																		
																				<form class="form-horizontal col-md-4" role="form">
																				<div class="form-group">
																					<label class="col-sm-4 control-label">Date</label>
																					<div class="col-sm-8">
																						<input type="text" id=date placeholder="Select Date " name="date" class="form-control tip-focus"  title="Please Select Date" >															
																					</div>
																				</div>
																			</form>
												
																			
																			<form class="form-horizontal col-md-4" role="form">
																				<div class="form-group">
																					<label class="col-sm-4 control-label">Reason<b style="color: red;">*</b></label> 
																					<div class="col-sm-8">
																						<input type="text" id="reason" placeholder="Enter Reason " name="reason" class="form-control tip-focus"  title="Please Enter Reason" >															
																					</div>
																				</div>
																			</form>
																			
																							
																		</div>
																		<form class="form-horizontal col-md-4" role="form">													
																			<div class="form-group" style="margin-left: 132px">
																				<button type="button" class="btn btn-success" onclick="saveHospitalHolidayMaster()">Save</button>
																				<button type="button" class="btn btn-warning" onclick="resetHospitalHolidayForm()">Clear</button>
																			</div>
																			
																		</form>
																	</div>
	                                                			</div> 
														</div>
													</div>
												</div>
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 5px">
															<div class="col-md-12">
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">Hospital Holiday</div>
																	<div class="panel-body" style="overflow:auto;height:300px;">
																		<table id="hospitalHolidayTable" class="datatable table table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																				
																					<th class="col-md-1 center">#No</th>
																					<th class="col-md-1 center">Date</th>
																					<th class="col-md-1 center">Reason</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="hospitalHolidayBody" style="height:65px;">
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
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

		<!-- JAVASCRIPTS -->
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->


	<input type="hidden" id="idHospitalHolidays" value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
	
</body>
</html>
