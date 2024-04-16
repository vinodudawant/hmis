<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>OPD MIS REPORT</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<link rel="stylesheet" type="text/css"
	href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />
<!-- TYPEAHEAD -->


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
<script type="text/javascript" src="js/ExtraJs/opd_mis_report.js"></script>
<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript">
	onload = function() {
		fetchOPDMisReport();
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
											<li><i class="fa fa-home"></i> <a href="opd_mis_report.jsp">OPD MIS Report</a></li>
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button> <script
													type="text/javascript">
												$("[id$=btnExport]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-excel,'
																					+ encodeURIComponent($(
																							'div[id$=idmisopdreport]')
																							.html()));
																	e
																			.preventDefault();
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
										<!-- <div>
											<ul class="nav nav-tabs">
												<li class="active"><a data-toggle="tab"
													id="indentTab">MIS REPORT<span
														class="badge badge-blue font-11" style="margin-left: 4px"></span></a></li>
												
												<li><a data-toggle="tab" href="#consumption"
												id="consumptionTab"> Consumption</a></li>
												<li><a data-toggle="tab" href="#mrnreturn" id="mrnreturnTab"> MRN Return</a></li>
											</ul>
										</div> -->
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
																			
																			<div class="col-md-3" id="specialityDiv">
																							<div class="form-group">
																								<!-- <label class="control-label ">Speciality</label> -->
																								<div class="">
																									<select name="drDeptId" id="specialityId" value="0"
																										class="col-md-12 full-width-fix"
																										onchange="getDoctorBySpecialization('speciality','doctorName')"
																										style="width: 95%;"> 
																									<!-- <option value="0">-Select Speciality-</option> -->	

																									</select>
																								</div>
																							</div>
																				</div>
																		<div class="col-md-3" id="docConsultingDiv">

																							<div class="form-group">
																								<!-- <label class=" control-label" for="doctorName">Doc/Consultant</label> -->
																								<div>
																									<!-- <select id="doctorName" name="doctorName" class="col-md-12" style="width: 98%;" onchange="setSpecilizationAndDepartmentForRegistration()">	</select> -->
																									<select id="doctorName" name="doctorName" class="col-md-12" style="width: 98%;" onchange="getSpecilizationByDoctorId()">
																									<option value="0">-Select Doctor-</option>
																										</select>
																								</div>
																							</div>

																		</div>		
																			
																			<!-- <div class="form-group col-md-3">
																				<select class="input-group form-control"
																					id="searchByMisReport" name=""
																					style="width: 100%">
																					<option value="0">--select--</option>
																					<option value="1">Specaility Wise</option>
																					<option value="2">Ward Wise</option>
																					<option value="3">Surgery Wise</option>
								
																				</select>
																			</div> --> 
																			<div class="col-sm-1">
																				<input type="button" class="btn btn-xs btn-primary"
																					value="search"
																					onclick="fetchOPDMisReport();">
																			</div>
																		</div>


																		<div id="idmisopdreport" class="col-md-12">
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
																					OPD MIS REPORT</div>
																				<div class="panel-body"
																					style="overflow: auto; height: 550px">
																					<table id="opdlistpage"
																						class="datatable table table-striped table-bordered">
																						<thead id="ehatTHead">
																							<tr>
																								<th class="col-md-1 center" >#</th>
																								<!-- <th class="col-md-2 center" style='width:15%;'> Name</th> -->
																								<th class="col-md-2 center" style='width:5%;'>From</th>
																								<th class="col-md-2 center" style='width:5%;'>To</th>
																								<th class="col-md-2 center" style='width:3%;'>Speciality</th>
																								<th class="col-md-1 center" style='width:8%;'>Doctor</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Patient</th>
																								<th class="col-md-1 center" style='width:5%;'>Amount</th>
																								<!-- <th class="col-md-1 center" style='width:5%;'>Total Ref Patient</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Self Amount</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Ref Amount</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Self Disc</th>
																								<th class="col-md-1 center" style='width:5%;'>Total Ref Disc</th> -->
																								<!-- <th class="col-md-1 center" style='width:5%;'>Action</th>
																								<th id="sandboxOPD" class="col-md-1 center" style='width:5%;'>Add Care Context</th>
 -->
																							</tr>
																						</thead>
																						<tbody id="setopdmisreportdata">
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

				
				 $('#specialityId').select2();

				 getSpecialization("reg","specialityId");
				
			});

			$('#toopdDate').datepicker({
				autoclose : true,
				//format : 'yyyy-mm-dd',
				format : 'dd/mm/yyyy',		
				});
			$('#fromopdDate').datepicker({
				autoclose : true,
				//format : 'yyyy-mm-dd',	
				format : 'dd/mm/yyyy',	
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
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
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