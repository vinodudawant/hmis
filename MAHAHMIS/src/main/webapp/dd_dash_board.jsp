<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Doctor Desk Dashboard</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<link rel="stylesheet" type="text/css"
	href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />
<!-- TYPEAHEAD -->

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />



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
<script type="text/javascript" src="js/dd_dashboard.js"></script>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
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
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="dd_menu_DoctorDesk.jsp"%>

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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="">Dashboard</a></li>
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
										<div>
											<ul class="nav nav-tabs">
												<li class="active"><a data-toggle="tab" href="#OPD" onclick="fetchDoctorDeskDeshboard('OPDLIST','1');"
													id="indentTab">OPD<span
														class="badge badge-blue font-11" style="margin-left: 4px"><font
															color="black" id="unitCountOpd">1</font></span></a></li>
												<li><a data-toggle="tab" href="#IPD" id="mrnTab" onclick="fetchDoctorDeskDeshboard('IPDLIST','1');">
														IPD<span class="badge badge-blue font-11"
														style="margin-left: 4px"><font color="black"
															id="unitCountIpd">2</font></span>
												</a></li>
												<li><a data-toggle="tab" href="#ER" id="approvedTab" onclick="fetchDoctorDeskDeshboard('ERLIST','1');">
														ER<span class="badge badge-blue font-11"
														style="margin-left: 4px"><font color="black"
															id="unitCountEr">3</font></span>
												</a></li>
												<li><a data-toggle="tab" href="#CLOSED" onclick="fetchDoctorDeskDeshboard('CLOSEDLIST','1');"
													id="receivedTab"> CLOSED<span
														class="badge badge-blue font-11" style="margin-left: 4px"><font
															color="black" id="unitCountClosed">4</font></span>
												</a></li>
												<!-- <li><a data-toggle="tab" href="#consumption"
												id="consumptionTab"> Consumption</a></li> -->
												<!--<li><a data-toggle="tab" href="#mrnreturn" id="mrnreturnTab"> MRN Return</a></li> -->
											</ul>
										</div>
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
																			<div class="form-group col-md-3">
																				<select class="input-group" onchange="refreshDataQuque(this.id);"
																					title="Patient Name" id="selectsearchopd" name=""
																					style="width: 100%">
																					<option value="0">--select--</option>
																					<option value="1">Patient UHID</option>
																					<option value="2">Patient Name</option>
																					<option value="3">Patient Mobile</option>
																					<option value="4">Age is</option>
																					<option value="5">Age is less then</option>
																					<option value="6">Age is more then</option>
																				</select>
																			</div>
																			<div class="form-group col-md-3" id="divpatientopd">
																				<input class="form-control input-SmallText"
																					title="Patient Id" type="text" id="patientopd"
																					name="patientopd"
																					onkeypress="serachDoctorDeskDeshboard(this.id,'OPDLIST');"
																					placeholder="Search" style="width: 100%">
																			</div>
																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<!--Added by Annapurna -->
																					 <input type="text" class="form-control"
																					onclick=displayCalendar(document.getElementById(this.id),"dd/mm/yyyy\",this) value= "fromopdDate"	  
																						id="fromopdDate" placeholder="Date"> 
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
																					<!--//Added by Annapurna -->
																					<input type="text" class="form-control"
																					 onclick=displayCalendar(document.getElementById(this.id),"dd/mm/yyyy\",this) value= "toopdDate"	  
																						id="toopdDate" placeholder="Date"> 
																						<!-- <input type="text" class="form-control input-SmallText"
																						 onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)" 
																						 readonly="readonly" id="txtTdate" placeholder="Date"> -->
																					<div class="input-group-addon">
																						<i class="fa fa-calendar"></i>
																					</div>
																				</div>
																			</div>
																			<div class="col-sm-1">
																				<input type="button" class="btn btn-xs btn-primary"
																					value="search"
																					onclick="serachDateWiseQuque('OPDLIST');">
																			</div>
																		</div>


																		<div class="col-md-12">
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
																					OPD LIST</div>
																				<div class="panel-body"
																					style="overflow: auto; height: 550px">
																					<table id="opdlistpage"
																						class="datatable table table-striped table-bordered">
																						<thead id="ehatTHead">
																							<tr>
																								<th class="col-md-1 center" >#</th>
																								<th class="col-md-2 center" style='width:8%;'>UHID</th>
																								<th class="col-md-2 center" style='width:20%;'>Patient Name</th>
																								<th class="col-md-2 center" style='width:10%;'>Age/Gender</th>
																								<th class="col-md-2 center" style='width:10%;'>App.Date</th>
																								<th class="col-md-1 center" style='width:8%;'>Token No</th>
																								<th class="col-md-1 center" style='width:5%;'>MLC</th>
																								<th class="col-md-1 center" style='width:5%;'>Action</th>
																								<th id="sandboxOPD" class="col-md-1 center" style='width:5%;'>Add Care Context</th>

																							</tr>
																						</thead>
																						<tbody id="setopddoctordeskdeshboard">
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
											<div class="tab-pane fade" id="IPD">
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
																		<div class="form-group col-md-3">
																				<select class="input-group" onchange="refreshDataQuque(this.id)"
																					title="Patient Name" id="selectsearchipd" name=""
																					style="width: 100%">
																					<option value="0">--select--</option>
																					<option value="1">Patient UHID</option>
																					<option value="2">Patient Name</option>
																					<option value="3">Patient Mobile</option>
																					<option value="4">Age is</option>
																					<option value="5">Age is less then</option>
																					<option value="6">Age is more then</option>
																				</select>
																			</div>
																			<div class="form-group col-md-3" id="divpatientipd">
																				<input class="input-group form-control"
																					title="Patient Id" type="text" id="patientipd"
																					name="" placeholder="Search"
																					onkeypress="serachDoctorDeskDeshboard(this.id,'IPDLIST');"
																					style="width: 100%">
																			</div>
																			<div class="col-md-2">
																			<div class="input-group date col-md-12 ">
																				<input type="text" class="form-control" id="ipdfromDate"
																					placeholder="From Date"
																				>
																				<div class="input-group-addon">
																					<i class="fa fa-calendar"></i>
																				</div>
																			</div>
																			</div>			
																		
																		<div class="col-md-2">
																		<div class="input-group date col-md-12">
																				<input type="text" class="form-control" id="ipdtoDate"
																					placeholder="To Date"
																				>
																				<div class="input-group-addon">
																					<i class="fa fa-calendar"></i>
																				</div>
																			</div>
																			</div>
																		<div class="col-sm-1">
																			<input type="button" class="btn btn-xs btn-primary"
																				value="search" onclick="serachDateWiseQuque('IPDLIST','1');">
																		</div>
																		</div>
																		<div class="col-md-12">
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
																				<div class="panel-heading" id="divEhatContent">IPD
																					LIST</div>
																				<div class="panel-body"
																					style="overflow: auto; height: 550px">
																					<table id="ehatTable"
																						class="datatable table table-striped table-bordered">
																						<thead id="ehatTHead">
																							<tr>
																								<th class="col-md-1 center" >#</th>
																								<th class="col-md-2 center" style='width:8%;'>UHID</th>
																								<th class="col-md-2 center" style='width:20%;'>Patient Name</th>
																								<th class="col-md-2 center" style='width:10%;'>Age/Gender</th>
																								<th class="col-md-2 center" style='width:10%;'>App.Date</th>
																								<!-- <th class="col-md-1 center" style='width:8%;'>Token No</th> -->
																								<th class="col-md-1 center" style='width:5%;'>MLC</th>
																								<th class="col-md-1 center" style='width:5%;'>Action</th>
																								<th id ="sandboxFlow" class="col-md-1 center" style='width:5%;'>Add Care Context</th>
																							</tr>
																						</thead>
																						<tbody id="setipddoctordeskdeshboard">
																						</tbody>
																					</table>
																					<div class="pull-right" >
																						<ul class="pagination" id="ipdpagenation">
																							
																						</ul>
																					</div>
																					<div class="col-md-4 col-md-offset-8">
																						<div class="pull-right">
																							<ul
																								class="pagination pagination-blue margin-bottom-10"
																								id="totalNumberOfPagesipd">
																							
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
											<!-----------------Close Request Div End ------------------->

											<!-----------------Mrn Approved Status List Table Start Here------------------->
											<div class="tab-pane fade" id="ER">
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
																			<div class="form-group col-md-3">
																				<select class="input-group" onchange="refreshDataQuque(this.id)"
																					title="Patient Name" id="selectsearcher" name=""
																					style="width: 100%">
																					<option value="0">--select--</option>
																					<option value="1">Patient UHID</option>
																					<option value="2">Patient Name</option>
																					<option value="3">Patient Mobile</option>
																					<option value="4">Age is</option>
																					<option value="5">Age is less then</option>
																					<option value="6">Age is more then</option>
																				</select>
																			</div>
																			<div class="form-group col-md-3" id="divpatienter">
																				<input class="input-group form-control"
																					title="Patient Id" type="text" id="patienter"
																					name="" placeholder="Search"
																					onkeypress="serachDoctorDeskDeshboard(this.id,'ERLIST');"
																					style="width: 100%">
																			</div>
																			<div class="col-md-2">
																			<div class="input-group date col-md-12">
																				<input type="text" class="form-control" id="fromerDate"
																					placeholder="From Date"
																					>
																				<div class="input-group-addon">
																					<i class="fa fa-calendar"></i>
																				</div>
																			</div>
																			</div>
																			<div class="col-md-2">
																			<div class="input-group date col-md-12">
																				<input type="text" class="form-control" id="toerDate"
																					placeholder="To Date"
																					>
																				<div class="input-group-addon">
																					<i class="fa fa-calendar"></i>
																				</div>
																			</div>
																			</div>
																		<div class="col-sm-1">
																			<input type="button" class="btn btn-xs btn-primary"
																				value="search" onclick="serachDateWiseQuque('ERLIST');">
																		</div>
																		</div>
																		
																		<div class="col-md-12">
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
																				<div class="panel-heading" id="divEhatContent">ER
																					LIST</div>
																				<div class="panel-body"
																					style="overflow: auto; height: 550px">
																					<table id="ehatTable"
																						class="datatable table table-striped table-bordered">
																						<thead id="ehatTHead">
																							<tr>
																								<th class="col-md-1 center" >#</th>
																								<th class="col-md-2 center" style='width:8%;'>UHID</th>
																								<th class="col-md-2 center" style='width:20%;'>Patient Name</th>
																								<th class="col-md-2 center" style='width:10%;'>Age/Gender</th>
																								<th class="col-md-2 center" style='width:10%;'>App.Date</th>
																								<th class="col-md-1 center" style='width:8%;'>Token No</th>
																								<th class="col-md-1 center" style='width:5%;'>MLC</th>
																								<th class="col-md-1 center" style='width:5%;'>Action</th>

																							</tr>
																						</thead>
																						<tbody id="seterdoctordeskdeshboard">
																						</tbody>
																					</table>
																					<div class="pull-right" >
																						<ul class="pagination" id="erpagenation">
																							
																						</ul>
																					</div>
																					<div class="col-md-4 col-md-offset-8">
																						<div class="pull-right">
																							<ul
																								class="pagination pagination-blue margin-bottom-10"
																								id="totalNumberOfPageser">
																							
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
											<!-----------------Mrn Approved Status List Table Ends Here------------------->
											<!-----------------Mrn Received Status List Table Starts Here------------------->
											<div class="tab-pane fade" id="CLOSED">
												<div class="panel panel-default">
													<div class="panel-body">
														<div class="row">
															<div class="col-md-12">
																<div class="tabbable header-tabs">
																	<div class="row" style="margin-top: 10px">
																		<div class="col-md-12">

																			<div class="form-group col-md-1">
																				<label for="">Search By:</label>

																			</div>
																			<div class="form-group col-md-3">
																				<select class="input-group form-control" onchange="refreshDataQuque(this.id);"
																					title="Patient Name" id="selectsearchclosed" name=""
																					style="width: 100%">
																					<option value="0">--select--</option>
																					<option value="1">Patient UHID</option>
																					<option value="2">Patient Name</option>
																					<option value="3">Patient Mobile</option>
																					<option value="4">Age is</option>
																					<option value="5">Age is less then</option>
																					<option value="6">Age is more then</option>
																				</select>
																			</div>
																			<div class="form-group col-md-3" id="divpatientclosed">
																				<input class="input-group form-control"
																					title="Patient Id" type="text" id="patientclosed"
																					onkeypress="serachDoctorDeskDeshboard(this.id,'CLOSEDLIST');"
																					placeholder="Search" name="" style="width: 100%">
																			</div>

																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<input type="text" class="form-control"
																						id="FormDate" placeholder="From Date"
																						>
																					<div class="input-group-addon">
																						<i class="fa fa-calendar"></i>
																					</div>
																				</div>
																			</div>
																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<input type="text" class="form-control" id="ToDate"
																						placeholder="To Date"
																						>
																					<div class="input-group-addon">
																						<i class="fa fa-calendar"></i>
																					</div>
																				</div>
																			</div>



																			<div class="col-sm-1">
																				<input type="button" class="btn btn-xs btn-primary"
																					value="search" onclick="serachDateWiseQuque('CLOSEDLIST');">
																			</div>
																		</div>
																		<div class="col-md-12">
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
																				<div class="panel-heading" id="divEhatContent">CLOSED
																					LIST</div>
																				<div class="panel-body"
																					style="overflow: auto; height: 550px">
																					<table id="closedlistpage"
																						class="datatable table table-striped table-bordered">
																						<thead id="ehatTHead">
																							<tr>
																							<th class="col-md-1 center" >#</th>
																								<th class="col-md-2 center" style='width:8%;'>UHID</th>
																								<th class="col-md-2 center" style='width:20%;'>Patient Name</th>
																								<th class="col-md-2 center" style='width:10%;'>Age/Gender</th>
																								<th class="col-md-2 center" style='width:10%;'>App.Date</th>
																								<th class="col-md-1 center" style='width:8%;'>Token No</th>
																								<th class="col-md-1 center" style='width:5%;'>MLC</th>
																								<th class="col-md-1 center" style='width:5%;'>Action</th>

																							</tr>
																						</thead>
																						<tbody id="seterdoctordeskdeshboardclosed">
																						</tbody>
																					</table>
																					<div class="pull-right" >
																						<ul class="pagination" id="closedpagenation">
																							
																						</ul>
																					</div>
																					<div class="col-md-4 col-md-offset-8">
																						<div class="pull-right">
																							<ul
																								class="pagination pagination-blue margin-bottom-10"
																								id="totalNumberOfPagesClosed">
																							
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
											<!-----------------Mrn Received Status List Table Ends Here------------------->
										</div>

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
				fetchDoctorDeskDeshboard('OPDLIST','1');
				
				
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

				$("#selectsearchopd").select2();
				$("#selectsearchipd").select2();
				$("#selectsearcher").select2();
				
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