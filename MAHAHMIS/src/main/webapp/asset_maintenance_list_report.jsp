<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Item Asset Maintenance</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<!-- include js for development -->
<script type="text/javascript" src="js/ehat_inventory.js"></script>
<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
<script type="text/javascript" src="js/inv_item_asset_maintenance.js"></script>
<script type="text/javascript" src="js/ehat_inv_complaints.js"></script>
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<!-- BOOTSTRAP SWITCH -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />
<style>
</style>
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
			<%@include file="inv_maintenance_left_menu.jsp"%>
			<!-- /SIDEBAR -->
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"yyyy-MM-dd");
					String todays_date = formatter.format(currentDate.getTime());
					Date date = new Date();
					java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
							"dd/MM/yyyy h:mm:ss a");
					String formattedDate = sdf.format(date);
					System.out.println(formattedDate); // 12/01/2011 4:48:16 PM
			%>
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
											<li><i class="fa fa-home"></i> <a
												href="inv_item_maintenace.jsp">Asset Maintenance List Reports</a></li>
											<li class="pull-right"><button id="btnExportReport" class="btn btn-xs btn-warning"
												value="Excel" title="" data-placement="left"
												data-toggle="tooltip" data-original-title="Excel"
												style="margin-left: 10px;margin-bottom: 10px;">
												Export To Excel
											</button></li>
										</ul>
										
										<script type="text/javascript">
												$("[id$=btnExportReport]")
														.click(
																function(e) {
																	 //getting values of current time for generating the file name
															        var dt = new Date();
															        var day = dt.getDate();
															        var month = dt.getMonth() + 1;
															        var year = dt.getFullYear();
															      
															        var postfix = day + "." + month + "." + year;
															        //creating a temporary HTML link element (they support setting file names)
															        var a = document.createElement('a');
															        //getting data from our div that contains the HTML table
															        var data_type = 'data:application/vnd.ms-excel';
															        var table_div = document.getElementById('assetItemMaintenanceReports');
															        var table_html = table_div.outerHTML.replace(/ /g, '%20');
															        a.href = data_type + ', ' + table_html;
															        //setting the file name
															        a.download = 'Asset_Maintenance_List_Report_' + postfix + '.xls';
															        //triggering the function
															        a.click();
															        //just in case, prevent default behaviour
															        e.preventDefault();		
																			
																});
											</script>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
								<div class="container-fluid">
								<div class="panel panel-primary">
								<div class="panel-heading" id="divEhatContent">Asset Maintenance Search</div>
								<div class="panel-body">
								<!-- <div class="form-group col-md-2 col-sm-2 col-xs-12">
								<div class="form-check form-check-inline">
								  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="labEquipmentSearchId" onclick="getLabEquipmentOrAssetItems(this.value)"  value="LABEQUIPMENT">
								  <label class="form-check-label" for="lab equipment">Lab Equipments</label>
								</div>
								<div class="form-check form-check-inline">
								  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="assetSearchId" onclick="getLabEquipmentOrAssetItems(this.value)" value="OTHER">
								  <label class="form-check-label" for="asset item">Asset Item</label>
								</div>

							</div> -->
							<div class="form-group col-md-2">
							<label for="from date">From Date</label>
								<input type="text" autocomplete="off"	class="form-control tip-focus"	id="fromDateMaintenanceSearchId"
								placeholder="please enter from date"
								name="supplier">
							</div>
							<div class="form-group col-md-2">
							<label for="to date">To Date</label>
								<input type="text"	autocomplete="off" class="form-control tip-focus"	id="toDateMaintenanceSearchId"
								placeholder="please enter to date"
								name="supplier">
							</div>
							<div class="form-group col-md-2">
							<label for="product category search">Product Category</label>
								<select class="" onchange="getCategoryWiseAssetName(this.value)" id="productCategoryMaintenanceSearchId">
								<option value="0">--Select Category--</option>
							</select>
							</div>
							<div class="form-group col-md-4">
							<label for="asset name search">Asset Name</label>
								<select class="form-control" onchange="getAssetWiseSerialNumber(this.value)" id="assetNameMaintenanceSearchId">
								<option value="0">--Select Asset Name--</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="serial number search">Serial No.</label>
								<select class="form-control" id="serialNoMaintenanceSearchId">
								<option value="0">--Select Serial No.--</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="serial number search">Department</label>
								<select class="form-control" id="assetMaintenanceMasterDepartmentId">
								<option value="NA">--Select Department--</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="serial number search">Hospital Dept</label>
							<select class="form-control" id="assetMaintenanceMasterHospitalDeptId">
								<option value="NA">--Select Hospital Dept--</option>
							</select>
							</div>
							<div class="form-group col-md-2">
							<label for="asset name search"></label>
							<button class="btn btn-xs btn-primary" style="margin-top: 20px;"  onclick="universalSearchAssetMaintenanceRepoerts();"
									type="button" onclick="">
									<span class="fa fa-search" aria-hidden="true"> </span>
									Search!
								</button>
							</div>
								
							</div>
							</div>
							</div>
							</div>
							</div>
							<!-- modal starts here -->
							<!-- style="overflow:hidden;" -->
							<div class="modal fade" id="assetModal"  data-backdrop="static" 
							data-keyboard="false" role="dialog" aria-labelledby="itemMasterModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
										</div>
										<div class="modal-body" style="padding: 0px !important;">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Item Asset Maintenance</div>
															<div class="panel-body">
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab" id="descInfoTabId"  href="#descriptionTab">Description</a></li>
															</ul>
															<div class="tab-content">
																<!-- Asset details tab starts here -->
																 <div id="detailsInfoTab" class="tab-pane fade">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																		</div>
																	</div>
																</div>
																<!-- Asset details tab ends here -->
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer"></div>
									</div>
								</div>
							</div>
							<!-- modal ends here -->

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12" style="margin-top: 5px;">
								<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#ProcessdQuotation" id="processdQuotation"><span
													class="hidden-inline-mobile">Item Asset Maintenance</span></a></li>
										</ul>
									</div>
									
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
												<div class="pull-right" style="margin-bottom: 5px;">
													<button title="Color Indication" data-placement="left" class="btn btn-xs btn-danger">
													Lab Equipment</button>
													
													<button title="Color Indication" data-placement="left" class="btn btn-xs btn-warning">
													Asset Item</button>
											</div>
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
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">Item Asset Maintenance</div>
																	<div class="panel-body" id="assetItemMaintenanceReports"
																		style="height: 400px;overflow-y: scroll; overflow-x: scroll; border: 1px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0" border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">Sr. No.</th>
																					<th class="col-md-1 center">Asset Id</th>
																					<th class="col-md-3 center">Asset Name</th>
																					<th class="col-md-3 center">Serial No</th>
																					<th class="col-md-2 center">Asset Category</th>
																					<th class="col-md-1 center">Department</th>
																					<th class="col-md-3 center">Hospital Department</th>
																					<th class="col-md-3 center">Org FAR No</th>
																					<th class="col-md-3 center">Unit Price (W/O GST)</th>
																					<th class="col-md-3 center">MFR Name</th>
																					<th class="col-md-3 center">Purchase Ref No</th>
																					<th class="col-md-2 center">Purchase Date</th>
																					<th class="col-md-2 center">Party Name</th>
																					<th class="col-md-2 center">Installation Date</th>
																					<th class="col-md-2 center">Warranty From Date</th>
																					<th class="col-md-2 center">Warranty To Date</th>
																					<th class="col-md-2 center">Status</th>
																					<th class="col-md-2 center">Last Updated Date And Time</th>
																					<th class="col-md-2 center">Last Updated By</th>
																				</tr>
																			</thead>
																			<tbody id="assetMaintenanceReports">
																			
																			</tbody>
																		</table>
																	</div>
																	<!--For Draft  -->
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
		<!-- Auto-Suggestion 8/1/2015-->
		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
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
		<!-- bootstrap datepicker -->
		<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<!-- bootstrap datepicker new added  js-->
		<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
			type="text/javascript"></script>
		<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
			type="text/javascript"></script>

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
		<script type="text/javascript" src="js/validate.js"></script>
		<!-- BOOTSTRAP SWITCH -->
		<script type="text/javascript" src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>
		<script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
		<script type="text/javascript" src="js/inv_item_asset_maintenance.js"></script>

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
			});
			onload = function() {
				getAllItemAssetMaintenanceReports();
				//to load all patholody departments on details tab 
				getPathologyDepartments();
				getAllReagentNames();
				getAllAssetCategory();
				// this is added by Vishnu for dept and hospital dept
				getAllDepartment();
				getAllHospitalDepartment();
				new JsDatePick({
					useMode : 2,
					target : "fromDateMaintenanceSearchId",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				new JsDatePick({
					useMode : 2,
					target : "toDateMaintenanceSearchId",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				new JsDatePick({
					useMode : 2,
					target : "purchaseDate",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
				
				new JsDatePick({
					useMode : 2,
					target : "installationDateId",
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					dateFormat : "%Y-%m-%d",
					imgPath : "../img/",
					weekStartDay : 1,
				});
			};
		</script>
		<input type="hidden" id="hiddenAssetItemId" value="0">
		<input type="hidden" id="hiddenAssetCategoryId" value="NA">
		<input type="hidden" id="hiddenMasterId" value="0">
		<input type="hidden" id="hiddenAssetMaintenanceDocUploadId" value="0">
		<input type="hidden" id="hiddenPartyId" value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="totaltblsize" value="0">
		<input type="hidden" id="RowCount" value="0">
		<input type="hidden" id="hiddenItemIndex" value="0">
		<input type="hidden" id="hiddenVenderState" value="0">
		<input type="hidden" id="recordTypeId" value="1">
		<input type="hidden" id="hiddenAssetType" value="">
		<input type="hidden" id="hiddeAssetLocationId" value="0">
		<input type="hidden" id="hiddeAssetDetailsId" value="0">
		<input type="hidden" id="userState" value="<%=session.getAttribute("userState")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>
