<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>MIS REPORT</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<link rel="stylesheet" type="text/css"
	href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />
<!-- TYPEAHEAD -->
<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- BOOTSTRAP SWITCH -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-wizard/wizard.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />
<!-- FONTS -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>

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
	<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />
	<!-- FONTS -->

<%@include file="inv_header.jsp"%>

<style>
.chosen-container-single .chosen-single {
	height: 26px;
	line-height: 25px;
}
.notActive{
    color: #3276B1
;
    background-color: #fff;
}
</style>
<!-- include js for development -->
<!-- <script type="text/javascript" src="js/UserAccess.js"></script> -->
<script type="text/javascript" src="js/ExtraJs/ipd_mis_report.js"></script>
<script type="text/javascript">
	onload = function() {
		fetchIPDMisReport();
	};
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String abdmFlow = resourceBundleEha.getObject("abdmFlowOnOff").toString();
%>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
			<%-- <%@include file="Menu_Header.jsp"%> --%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="menu_report.jsp"%>

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
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="reports_dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="reports_dashboard.jsp">Dashboard</a></li>
											<li><i class="fa fa-home"></i> <a href="ipd_mis_report.jsp">MIS Report</a></li>
											
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button> 
													
												<script type="text/javascript">

													$(document).on('click', '#btnExport', function (e) {
														var clonedContent = $('div[id$=idmisreport]').clone();
	
													    clonedContent.find('th').css({
													        'background-color': '#CCFF66',
													        'border': '1px solid black', // Add border to heading cells
													        	 'text-align': 'center',
													        	 'vertical-align': 'middle'
													    });
	
													    clonedContent.find('td').css({
													    	 'background-color': '#d3d3d3', 
													        'border': '1px solid black',
													        //'width': '100px', // Adjust width as per your requirement
													        	 'text-align': 'center',
													        	 'vertical-align': 'middle'
													    });
													    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
													    var link = document.createElement("a");
													    document.body.appendChild(link);
													    link.download = "MIS Report.xls";
													    link.href = result;
													    link.click();
													});
											</script>
											</li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
						
							<div class="row">
										
								<!-- NEW ORDERS -->
								<div class="row">
									<!-- NEW ORDERS -->
									<div class="col-md-12">
										
										<div class="tab-content">
											<div class="tab-pane fade in active" id="OPD">
												<div class="panel panel-default">
													<div class="panel-body">
														<div class="row">
															<div class="col-md-12">
																<div class="tabbable header-tabs">
																	<div class="row" style="margin-top: 10px">
																		<div class="col-sm-12">
																			<div class="form-group col-md-1">
																				<label for="">Search By:</label>

																			</div>
																			
																			
																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					
																					 <input type="text" class="form-control"
																					onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"  
																						id="fromDate" placeholder="Date" value="<%=todays_date%>"> 
																					<!-- <input type="text" class="form-control input-SmallText" 
																					onclick="displayCalendar(document.getElementById('txtFdate'),'dd/mm/yyyy',this)" 
																					readonly="readonly" id="txtFdate" placeholder="Date" > -->
																					<div class="input-group-addon">
																						<i class="fa fa-calendar"></i>
																					</div>
																				</div>
																			</div>
																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					
																					<input type="text" class="form-control"
																					 onclick="displayCalendar(document.getElementById(this.id),'dd/mm/yyyy',this)"	  
																						id="toDate" placeholder="Date" value="<%=todays_date%>"> 
																						<!-- <input type="text" class="form-control input-SmallText"
																						 onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)" 
																						 readonly="readonly" id="txtTdate" placeholder="Date"> -->
																					<div class="input-group-addon">
																						<i class="fa fa-calendar"></i>
																					</div>
																				</div>
																			</div>
																			
																			<div class="form-group col-md-3">
																				<select class="input-group form-control"
																					id="searchByMisReport" name=""
																					style="width: 100%">
																					<option value="0">--select--</option>
																					<option value="1">Specaility Wise</option>
																					<option value="2">Ward Wise</option>
																					<option value="3">Surgery Wise</option>
								
																				</select>
																			</div> 
																			<div class="col-sm-1">
																				<input type="button" class="btn btn-xs btn-primary"
																					value="search"
																					onclick="fetchIPDMisReport();">
																			</div>
																		</div>


																		<div id="idmisreport" class="col-md-12">
																			<div class="col-sm-12">
																				<div class="pull-right">
																					<div id="datatable1_filter"
																						class="dataTables_filter">
																						<label id="searchlabel"> </label>
																					</div>
																				</div>
																			</div>
																			<div class="panel panel-primary"
																				style="margin-top: 20px">
																				<div class="panel-heading" id="divEhatContent">
																					MIS REPORT</div>
																				<div class="panel-body"
																					style="overflow: auto; height: 550px">
																					<table id="opdlistpage"
																						class="datatable table table-striped table-bordered">
																						<thead id="ehatTHead">
																							<tr>
																								<th class="col-md-1 center" >#</th>
																								<th class="col-md-2 center" style='width:15%;'> Name</th>
																								<th class="col-md-2 center" style='width:5%;'>From</th>
																								<th class="col-md-2 center" style='width:5%;'>To</th>
																								<th class="col-md-2 center" style='width:5%;'>Total Patient</th>
																								<th class="col-md-1 center" style='width:8%;'>Total Disc</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Amount</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Self Patient</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Ref Patient</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Self Amount</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Ref Amount</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Self Disc</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Ref Disc</th>
																								<!-- <th class="col-md-1 center" style='width:5%;'>Action</th>
																								<th id="sandboxOPD" class="col-md-1 center" style='width:5%;'>Add Care Context</th>
 -->
																							</tr>
																						</thead>
																						<tbody id="setmisreportdata">
																						</tbody>
																					</table>
																					<div class="pull-right" >
																						<ul class="pagination" id="opdpagenation">
																							
																						</ul>
																					</div>
																					<div class="col-md-4 col-md-offset-8">
																						<div class="pull-right">
																							<ul
																								class="pagination pagination-blue margin-bottom-10"
																								id="totalNumberOfPagesOpd">
																							
																							</ul>
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
											</div>
											<!-----------------Close Request Div Start ------------------->
											
									
										<!-- new modal ends here -->
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
			<!--Start #showSubModulesPopup Popup -->

			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>
		<script type="text/javascript"
			src="ehat-design/datepicker/bootstrap-datepicker.js">
		</script>
		
		<script src="js/chosen.jquery.js"></script>
		
		<script>
			jQuery(document).ready(function() {
				
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				//getAllUser();
				 setCurrantDate();
				//doctorDeskPatientCount();
				//fetchDoctorDeskDeshboard('OPDLIST','1');
				
				
				//getLoginHistory("0", "0");

				var abdmFlow = $('#abdmFLow').val();
				if(abdmFlow=='off'){
					$('#sandboxFlow').hide();
					$('#sandboxOPD').hide();
					
				}
				else {
					$('#sandboxFlow').show();
					$('#sandboxOPD').show();
					
				}
				
			});

			$('#toopdDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',		
				});
			$('#fromopdDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',		
				});
			$('#ipdtoDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',
			});
			$('#ipdfromDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',
			});

			$('#fromerDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',
			});
			$('#toerDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',
			});
			$('#FormDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',
			});
			$('#ToDate').datepicker({
				autoclose : true,
				format : 'yyyy-mm-dd',
			});
		</script>
		
		<input id="masterModuleId" class="hidden">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
			<input type="hidden" id="countopdpage"
			value="">
			<input type="hidden" id="countipdpage"
			value="">
			<input type="hidden" id="counterpage"
			value="">
			<input type="hidden" id="countclosedpage"
			value="">
			
		<input type="hidden" id="abdmFLow" value="<%=abdmFlow%>">	
			
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>