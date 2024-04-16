<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Dashboard</title>
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
	
	<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<script type="text/javascript" src="js/covid.js"></script>
	
	</head>
<body>
<%-- 	<c:if test="${ sessionScope.userType != null }">
 --%>		<!-- HEADER -->
		<header class="navbar clearfix" id="header">

			<%@include file="Menu_Header_Nobel.jsp"%>

		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="ehat_finance_leftmenu.jsp"%>
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
												<li><a></a></li>
												<li><a></a></li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									<div class="col-md-2">
										<!-- <span class="input-group-btn"> <label for="inlineFold"
											class="control-label">From Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('txtFdate'),'yyyy-mm-dd',this)"
											readonly="readonly" id="txtFdate" placeholder="From Date">
										</span> -->
									</div>
									<div class="col-md-2">
										<!-- <span class="input-group-btn"> <label for="inlineFold"
											class="control-label">To Date : </label> <input type="text"
											class="form-control input-SmallText"
											onclick="displayCalendar(document.getElementById('txtTdate'),'yyyy-mm-dd',this)"
											readonly="readonly" id="txtTdate" placeholder="To Date">
										</span> -->
									</div>
									<div class=" col-md-1 ">
										<!-- <input type="button" value="Search"
											class="btn btn-xs btn-primary"
											onclick="getLabCounts('search')"
											style="margin-top: 20px;" /> -->
									</div>

								</div>
							</div>
							
							<div class="divide-20"></div>
							
							<div class="col-md-12">
									<div class="row">
										<div class="form-group col-md-12-1"
											style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
											<div class="box border blue">
												<div class="box-title">
													<h4 id="">
														<i class="fa fa-table"></i>Floorwise Details
                    
													</h4>
													
												</div>
												<!-- <div ></div> -->
												<div class="box-body" style="height: 320px;">
													<div class='col-sm-12-1'
														style='height: 298px; overflow-y: scroll; border: 0px solid #ddd; margin-top: -1px;'>
														<table  id="popupDiv" class="datatable table table-bordered " >
														</table>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
								
								
					<div class="divide-20"></div>
							
							<!-- <div class="col-md-12">
									<div class="row">
										<div class="form-group col-md-12-1"
											style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
											<div class="box border blue">
												<div class="box-title">
													<h4 id="">
														<i class="fa fa-table"></i>CategoryWise Details
                                                    </h4>
											 	</div>
												<div ></div>
												<div class="box-body" style="height: 320px;">
													<div class='col-sm-12-1'
														style='height: 298px; overflow-y: scroll; border: 0px solid #ddd; margin-top: -1px;'>
														<table  id="CategoryWisepopupDiv" class="datatable table table-bordered " >
														</table>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div> -->
							
							<!--  <div class="row">

								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
														<div class="box-body" style="height: 320px;">>
															<div class="col-sm-12-1"
																style="overflow: auto; height: 250px">
																<table id="covidPatientLabCountTable" class="datatable table table-bordered " >
																	<thead >
																		<tr>
																			<th class="col-md-2 center" colspan="2">IPD</th>
																			 <th class="col-md-2 center" colspan="2">Radiology</th>
																			<th class="col-md-2 center" colspan="2">Lab</th>
																		
																		
												<tr id="">
													<td class="col-md-3 text-center" height="100"><div
															style="font-family: Courier New;">Bed
															Ward</div></td>
											       <td id="bedAccupiedPer1" class="col-md-3 text-center" height="100"><div
															style="font-family: Courier New;"></div></td>
												</tr>
												
												<tr id="">
													<td class="col-md-3 text-center" height="100"><div
															style="font-family: Courier New;">Total Beds</div></td>
															
											       <td id="bedTotals1" class="col-md-3 text-center" height="100"><div
															style="font-family: Courier New;"></div></td>
												</tr>
												
												<tr id="">
													<td class="col-md-3 text-center" height="100"><div
															style="font-family: Courier New;">Occupied Beds</div></td>
															
											       <td id="bedOccuppieds1" class="col-md-3 text-center" height="100"><div
															style="font-family: Courier New;"></div></td>
												</tr>
												
												<tr id="" style="background: #85D6FF;" style="height: 25px;">
													<td class="col-md-3">Total Beds</td>
												</tr>
												<tr id="" style="color: red;">
													<td class="col-md-3">Occupied Beds</td>
												</tr>
												<tr id="" style="background: #85D6FF;">
													<td class="col-md-3">Vacant but unavailable</td>
												</tr>
												<tr id="" style="color: red;">
													<td class="col-md-3">Total Unavailable</td>
												</tr>
												<tr id="" style="background: #85D6FF; color: green;">
													<td class="col-md-3">Available With Waiting</td>
												</tr>
												<tr id="" style="color: green;">
													<td class="col-md-3">Total Available Beds</td>
												</tr>
												<tr id="" style="background: #dddddd; height: 11px;">
													<td class="col-md-3-1"></td>
												</tr>
												</tr>
												</tr>
												</thead>
													<tbody>
													
													
																	</tbody>
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
							</div>  -->
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

	<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getPatientBedDetailsCounts('onload');
			//getPatientBedCategoryWiseDetailsCounts('onload')
			//get();
		});
	</script>
	<input type="hidden" id=unitId value="0">
		<!-- /JAVASCRIPTS -->
	<%-- </c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if> --%>




</body>
</html>