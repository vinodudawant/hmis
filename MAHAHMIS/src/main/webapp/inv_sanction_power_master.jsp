<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Sanction Master</title>
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
<script type="text/javascript" src="js/ehat_inventory.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
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
			<%@include file="inv_left_menu.jsp"%>
			<!-- /SIDEBAR -->
			<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			//	System.out.print("todays_date :::"+todays_date );

			Date date = new Date();
			java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy h:mm:ss a");
			String formattedDate = sdf.format(date);
			System.out.println(formattedDate); // 12/01/2011 4:48:16 PM
			//	Date dtHMS = new Date();

			//	System.out.print(datewithHMS.getHours()+":"+datewithHMS.getMinutes()+":"+datewithHMS.getSeconds());
			//	String Time = dtHMS.getHours() + ":" + dtHMS.getMinutes() + ":"	+ dtHMS.getSeconds();
			//System.out.print("aaaaaa :" + Time);
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
											<li><i class="fa fa-home"></i> <a href="inv_sanction_power_master.jsp">Sanction Master</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							
							<div class="row">
							
								<div class="col-md-12">
											<div class="col-sm-1">
                     							<label for="inlineFold" class="control-label">Search By</label>
               								</div>
											<div class="col-md-4">											
												<div class="input-group" >												
													<input type="search" placeholder="sanction no" class="form-control" id="searchsactionId"> <span
														class="input-group-btn">
														<button class="btn btn-primary" style="height: 25px;margin-bottom: 10px"  type="button" onclick="fetchSactionMasterById();">
															<span class="fa fa-search" aria-hidden="true">
															</span> Search!
														</button>
													</span>
												</div>
											</div>
											<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left editUserAccess" type="button" onclick="toggleEntryDiv('divForEntry')">
											<i class="fa fa-plus"></i> Add New Saction
										</button>
									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
										<div class="row">
											<div class="col-md-12" id="divForEntry" style="display: none;">
												<div class="container">
													<div class="panel panel-primary" style="margin-top: 20px">
														<div class="panel-heading" id="divEhatContent">Saction Power Form</div>
														<div class="panel-body">
															<form id="financialFormId" onsubmit="return false">
																<div class="form-row">
																	<div class="form-group col-md-3">
																		<label for="inputEmail4"> Date</label> <input
																			type="text" class="form-control" id="sanDate"
																			placeholder="sanction Date" name="sanDate">
																	</div>
																
																</div>
																<div class="form-group col-md-3" id="documentByName">
																	<label for="inputAddress2">Financial Year</label> 
																	<select name="stateName" id="financialYear"  style="width: 100%;">
																					<option value="0">--Select--</option>				
																				</select>
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputAddress2">Emp Name.<b style="color: red;">*</b></label> <input
																		type="text" class="form-control tip-focus" id="empName"
																		placeholder="Enter Emp Name" title="Please enter emp name" name="empName"> 
																</div>
																
																<div class="form-group col-md-3">
																	<label for="inputAddress2">Emp Sanction Amt.<b style="color: red;">*</b></label> <input
																		type="text" class="form-control tip-focus" id="empSanAmt" onkeypress="return validateNumOnly(event)"
																		placeholder="Enter Emp San Amount" title="Please enter emp name" name="empSanAmt"> 
																</div>
																
																	<div class="form-group col-md-3" id="partyMasterByName">
																	<label for="inputAddress2">Supplier Name.<b style="color: red;">*</b></label> <input
																		type="text" class="form-control tip-focus" id="supplierId"
																		placeholder="Enter Supplier Name"   onkeyup="inventoryPartyMasterAutoSuggestion(this.id)"       title="Please enter emp name" name="empName"> 
																</div>
																
																
																<button type="button" class="btn btn-success editUserAccess" onclick="saveSanctionMaster()" style="margin-top: 15px;">Save</button>
																<button type="button" class="btn btn-warning" onclick="refreshSactionMaster()" style="margin-top: 15px;">Clear</button>
															</form>
														</div>

													</div>

												</div>
											</div>
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
															<div class="panel panel-primary" style="margin-top: 20px">
																<div class="panel-heading" id="divEhatContent">Saction Power Form</div>
																<div class="panel-body" style="overflow: auto;height: 300px">
																	<table id="ehatTable" class="datatable table table-striped table-bordered" >
																		<thead id="ehatTHead">
																			<tr>
																				<th class="col-md-1 center">#</th>
																				<th class="col-md-1 center"> Date</th>																				
																				<th class="col-md-1 center">Financial Year</th>
																				<th class="col-md-1 center">Emp Name</th>
																				<th class="col-md-1 center">Emp Sanction Amt</th>
																				<th class="col-md-1 center">Supplier Name</th>
																				<th class="col-md-1 center">Edit</th>
																				<th class="col-md-1 center">Delete</th>
																			</tr>
																		</thead>
																		<tbody id="sanctionMasterDetails">
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
	<!-- bootstrap datepicker -->
		<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<!-- bootstrap datepicker new added  js-->
		<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
			type="text/javascript"></script>
		<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
			type="text/javascript"></script>	
		<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
		
		<script>
		/*
		 * @author: Rohit Sandbhor
		 * @date:- 23-10-2019
		 * @codeFor:- below js function to call the getAllFinancialMasterRecords() on ready
		 */
		jQuery(document).ready(function() {		
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
			
			$('#startDateId').datepicker({
				autoclose : true
			});
			//below line to set current date on datepicker
			//$('#startDateId').datepicker('setDate', 'now');
			$('#sanDate').datepicker({
				autoclose : true
			});
			
			getAllSanctionMaster();
			getAllFinancialMaster();
		});
		</script>
		<input type="hidden" id="sanctionId" value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="hiddenpartyname" value="0">
		<input type="hidden" id="hiddenyearname" value="0">
		<input type="hidden" id="hiddenPartyId" value="0">
		<input type="hidden" id="hiddenYearId" value="0">
		
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>
