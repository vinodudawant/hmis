<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Bill comparison servicewiseIpd</title>
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

<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />

<!-- STYLESHEETS -->
<!--[if lt IE 9]><script src="js/flot/excanvas.min.js"></script><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
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

<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">

<!-- BOOTSTRAP SWITCH -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-switch/bootstrap-switch.min.css" />

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- WIZARD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-wizard/wizard.css" />
<!-- FONTS -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->
<!-- <script type="text/javascript" src="js/ehatMaster.js"></script>
	<script type="text/javascript" src="js/dept.js"></script>
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script type="text/javascript" src="js/serviceMaster.js"></script> -->
		<script src="js/chargesMasterSlave.js"></script>
	
<script type="text/javascript" src="js/registration.js"></script>
<!--   <script type="text/javascript" src="js/billNoble.js"></script>  
 -->
  <script type="text/javascript" src="js/ehat_ipdbill.js"></script>
  <script type="text/javascript" src="js/ehat_ipdbill1.js"></script>

<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>
<script type="text/javascript" src="js/sendToLab.js"></script>
<script type="text/javascript" src="js/ehat_comparison.js"></script>
<!-- <script src="js/demoConfiguration2.js"></script> -->
<script type="text/javascript" src="js/ehat_newQuotation.js"></script>

<!-- <script type="text/javascript" src="js/ehat_billing.js"></script> -->

<!-- include js for development -->



<script>
	jQuery(document).ready(function() {
		/* App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements */

		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
		
		getPatientDataByTreatmentId(<%=request.getParameter("treatmentId")%>); 
		getServicesOnBillingIPD();
		getPatientBillById(<%=request.getParameter("treatmentId")%>);
		setQuotationNameRunTime();
		
		var c=$("#pageFromm").val(); 
		if(c=="Quotations"){ 
			$("#generalHideForIpd").hide(); 
			$("#quotationCompID").hide();
			
		}else{ 
			$("#generalShowForIpd").hide();
			$("#Saveqtn").hide();
			$("#Saveqtnnn").hide();
			$("#printTbl1").hide();
			
			getPatientBillAmountIpdForComparison(<%=request.getParameter("treatmentId")%>,"general");
		} 
		
		fetchAllService();
		getAllChargesMaster();
		getAllChargesMaster2();
		
		fetchAllServicecom();
		
	});
	
</script>

<style>
.lblBold {
	font-weight: 600;
}
</style>

</head>
<body>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">
	
		<%@include file="Menu_Header_Nobel.jsp"%>


		<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
						java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
								"dd/MM/yyyy");
						String current_date = formatter1.format(currentDate.getTime());
		%>
	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">

		<!-- SIDEBAR -->
		<%@include file="left_menu_bill.jsp"%>
		<!-- /SIDEBAR -->
				
		<div id="main-content">
			<div class="container">
				<div class="row">
					<div id="content" class="col-lg-12">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header" style="margin-bottom: 5px">
									<!-- STYLER -->

									<!-- /STYLER -->
									<!-- BREADCRUMBS -->
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li>Billing</li>
										
										<li id="requestToIPD"></li>
										
										<div class="li pull-right">
											<div class="form-group col-md-9">
												<select id="qutName" onchange="getBillQuotationsDetailsRunT()" name="partyName" style="top: 0px"
												class="form-control col-md-12"></select>
											</div> 
												
											<div class="col-sm-3"style="top: 0px;"> 															
												<input type="button" id="showData"class="btn btn-xs btn-primary"
												 name="showData" value="Show" >										  				
											</div>													 											 
										</div>
																			
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>
						<!-- /PAGE HEADER -->
						<!-- SAMPLE -->

						<div class="alert alert-block alert-info fade in" style="height: auto">

							<div class="row">
								<div class="col-md-1">
									<img alt="" src="ehat-design/img/profile/avatar.jpg"
										class="img-responsive">
								</div>

								<div class="col-md-11">

									<div class="col-md-12">

										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold" id="lblCenterPatientId" >Patient Id :</label> <label
													class="control-label" id="patientId"> </label>
											</div>
										</div>
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Patient Name :</label>
												<label class="control-label" id="patientName"> </label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Treatment Id :</label>
												<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
												</label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Ipd No :</label> <label
													class="control-label" id="ipdNo">
													IPD/00002017/553-D</label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Age :</label> <label
													class="control-label" id="age"> </label>
											</div>
										</div>

										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Ref.BNo: </label> <label
													class="control-label" id="billNo">01-D</label>

											</div>
										</div>

										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Gender :</label> <label
													class="control-label" id="sex"> Male(D) </label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Bill No:
													</label> <label class="control-label" id="consultingDoctor">
													Vinod-D</label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">DOA:</label> <label
													class="control-label" id="doa"> 2017-05-12-D</label>

											</div>
										</div>	
										
										<div class="col-md-4">
											<div class="form-group">
												<label class="control-label lblBold">Corporate :</label> <label
													class="control-label" id="corporate"> </label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">Bill Category :</label>
												<label class="control-label" id="billCategoty">
													 </label>

											</div>
										</div>
										
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label
													class="control-label" id="dod"> 2017-05-12-D</label>

											</div>
										</div>
										

										<div class="col-md-3">
											<div class="form-group">
												<input type="hidden" id="uId"
													value="<%=session.getAttribute("uId")%>" /> <input
													type="hidden" id="depdocdeskid" value="0" /> <input
													type="hidden" id="sourceTypeId" value="0" /> <input
													type="hidden" id="subserviceid" value="0" /> <input
													type="hidden" id="pId" value="0" /> <input type="hidden"
													id="tId" value="0" /> <input type="hidden" id="bNo"
													value="0" /> <input type="hidden" id="bNo" value="0" /> <input
													type="hidden" id="serviceid" value="0" /> <input
													type="hidden" id="editPerticularType" value="0" /> <input
													type="hidden" id="editPerticularId" value="0" /> <input
													type="hidden" id="treatId"
													value=<%=request.getParameter("treatmentId")%> /> <input
													type="hidden" id="generalId" value="0" />
												<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
												<%-- <input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> /> --%>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						
						<!-- -----------------------Start Char Config--------------- -->
						
						<div id="divLine1" class=" col-md-12"
												style="margin-left: 0%; margin-top: -2%;">

												<form class="form-horizontal col-md-12">

													<div class="divide-20"></div>
													<div class="col-md-4">
														<div class="row">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: -1px;">Select
																Charges</label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: -10%; height: 80px; width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">
																	<div class="col-md-8">
																		<select name="listmstr" id="listmstr_select_service"
																			style="width: 200px"
																			onchange="setDyanamicDivForCharges('dynamicItems',this.id)">
																			<option id="firstElmts" value="0">--- Select Charges
																				---</option>
																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItems" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
														</div>
														<div class="divide-20"></div>
													</div>
													<div class="col-md-4">
														<div class="row">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: -1px;">Select
																Hall Charges</label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: -10%; height: 80px; width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstr" id="listmstr_select_Hall"
																			style="width: 200px"
																			onchange="setDyanamicDivForCharges2('dynamicItems2',this.id)">
																			<option id="firstElmts2">--- Select Hall wise Charges
																				---</option>
																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItems2" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
														</div>
														<div class="divide-20"></div>
													</div>


													<div class="col-md-4">
														<div class="row">
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
															<label class="TextFont" style="margin-bottom: -1px;">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: -10%; height: 80px; width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstrcom" id="listmstr_select_combination"
																			style="width: 200px"
																			onclick="setDyanamicDivcom('dynamicItemcom',this.id)">
																			<option id="firstElmtcom" value="0">--- Select Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItemcom" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
														<!-- 	---------Touheed Plugin Multi select Plugin-------------- -->

														</div>
														<div class="divide-20"></div>
													</div>

                                                <!--  <div class="col-md-4">
														<div class="row">
															---------Touheed Plugin Multi select Plugin--------------
															<label class="TextFont" style="margin-bottom: -1px;">Select Combination
																Services </label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: -10%; height: 80px; width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">

																	<div class="col-md-8">
																		<select name="listmstr" id="listmstr_select_combination"
																			style="width: 200px"
																			onchange="setDyanamicDiv('dynamicItem',this.id)">
																			<option id="firstElmt" value="0">--- Select Combination Services
																				---</option>

																		</select>
																	</div>
																</div>

																<div
																	class="col-md-12 select2-container select2-container-multi "
																	style="margin-top: -1%;">
																	<ul id="dynamicItem" class="select2-choices"
																		style="overflow-y: scroll;">

																	</ul>
																</div>

															</div>
															---------Touheed Plugin Multi select Plugin--------------

														</div>
														<div class="divide-20"></div>
													</div> -->



												</form>
											</div>
						
						<!-- -----------------------End Char Config--------------- -->
						

						<div class="row">

							<div class="col-md-12">

								<div class="col-md-6 ">
									<!-- BOX -->
									<div class="box border">
										<div class="box-title">
											<h4>
												<i class="fa fa-column"></i><span
													class="hidden-inline-mobile"></span>
											</h4>
										</div>
										<div class="box-body" id="mainBillDeatils">
											<div class="tabbable header-tabs">
												<ul class="nav nav-tabs">
												
												<!--  <li><a href="#box_tab7" data-toggle="tab"><i
															class="fa fa-desktop" ></i>
															 <span
															class="hidden-inline-mobile" > Bill Estimate</span></a></li> -->
													
												
													<!-- <li><a href="#box_tab6" data-toggle="tab" ><i
															class="fa fa-desktop" ></i>
															 <span
															class="hidden-inline-mobile" onclick="resetAllIpd('cghs')"> CGHS Bill</span></a></li>
													
													<li><a href="#box_tab5" data-toggle="tab" style="display: none;" id="sponsorHideForIpd"><i
															class="fa fa-flask"></i> <span id="ipdSponsor"
															
															class="hidden-inline-mobile" onclick="resetAllIpd('IpdSponsor')">Sponsor Bill</span></a></li>
													
													 -->
													<li	 class="form-group col-md-2" style="padding-left: 0px;padding-top: 5px;">
																	<input type="button"
																		class="form-control btn btn-primary" value="Print Services"
																		id="printTbl1" onclick="PrintQuotationPatientWise(<%=request.getParameter("treatmentId")%>)" name="FetchServices" style="padding: 0px"
																		>
																</li>
																
																<li	 class="form-group col-md-2" style="padding-left: 0px;padding-top: 5px;">
																	<input type="button"
																		class="form-control btn btn-danger" value="Clear"
																		id="Clear" name="Clear" style="padding: 0px"
																		onclick="clearTable()">
																</li>
													
													<li class="active"><a href="#box_tab4" id="generalHideForIpd"
														data-toggle="tab"><i class="fa fa-home"></i> <span id="ipdGeneral"
															class="hidden-inline-mobile" onclick="getPatientBillAmountIpdForComparison(<%=request.getParameter("treatmentId")%>,'general')">Services</span><!-- <span
														class="badge badge-blue font-11">3</span> --></a></li>
														
												
												<%-- <li class="active"><a href="#box_tab4"
														data-toggle="tab" id="generalHideForIpdPrevBill"><i class="fa fa-home"></i> <span
															class="hidden-inline-mobile" onclick="getPatientPreviousBillAmountForGenIpd(<%=request.getParameter("treatmentId")%>,'general')">General Bill</span> </a></li>
												 --%>
												
												<li	 class="form-group col-md-3" style="padding-left: 0px;padding-top: 5px;">
																	<input type="button"
																		class="form-control btn btn-primary" value="Fetch Services"
																		id="Saveqtn" name="FetchServices" style="padding: 0px"
																		onclick="getBillQuotationsDetails(<%=request.getParameter("treatmentId")%>)">
																</li>
												<li class="active"><a href="#box_tab4" id="generalShowForIpd"
														data-toggle="tab"><i class="fa fa-home"></i> <span id="ipdGeneral"
															class="hidden-inline-mobile" onclick="">Services</span> <!-- <span
														class="badge badge-blue font-11">3</span> --></a></li>
												
												
												</ul>
												<div class="tab-content">
												
												
														<div class="tab-pane fade" id="box_tab7">
														<div class="row">

															<form>

																<input type="hidden" class="form-control"
																	id="estimation" value="0" />

																<%-- <div class="form-group col-md-2" style="padding:0 0 0 16px">
																	<label class="TextFont" for="exampleInputPassword1">From Date</label>
																	<input type="text" id="dob"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'yyyy/mm/dd',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeOpdSponsorStart" value="" />
																</div> --%>
																
																<div class="form-group col-md-3" style="padding:0 0 0 16px;padding-top: 20px;">
																						<label style="margin-right: 14px;" class="control-label col-md-1">From Date<span
																							class="required"></span></label>

																						<div class="input-group date" style="width: -1%;">

																							<input type="text" class="form-control"
																								id="dob">

																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>	
																
																<%-- <div class="form-group col-md-2" style="padding:0 0 0 17px">
																	<label class="TextFont" for="exampleInputPassword1">To Date</label>
																	<input type="text" id="dob1"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'yyyy/mm/dd',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeOpdSponsorEnd" value="" />
																</div> --%>
																
																<div class="form-group col-md-3" style="padding:0 0 0 16px;padding-top: 20px;">
																						<label style="margin-right: 14px;" class="control-label col-md-1">To Date<span
																							class="required"></span></label>

																						<div class="input-group date" style="width: -1%;">

																							<input type="text" class="form-control"
																								id="dob1">

																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>	

																<%-- <div id="prevCalfromdiv" class="form-group col-md-3" style="padding-left: 35px;padding-top: 5px;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Get Estimate"
																		id="saveBillOpdSponsor" name="saveBillOpdSponsor" style="padding: 0px"
																		onclick="getPatientBillAmountIpdForEstimation(<%=request.getParameter("treatmentId")%>,'prev')">
																</div>
																<div id="currentCalfromdiv"  class="form-group col-md-3" style="padding-left: 35px;padding-top: 5px;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Get Estimate"
																		id="saveBillOpdSponsor" name="saveBillOpdSponsor" style="padding: 0px"
																		onclick="getPatientBillAmountIpdForEstimation(<%=request.getParameter("treatmentId")%>,'current')">
																</div> --%>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />
															

															</form>
														</div>
														
																<div>

															<div
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																class="title col-md-12-1">
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New" onclick="crearAllFields()">
																	<i class="fa fa-plus-square"></i> New
																</label>
																
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabell" value="delete"
																	onclick="">
																	<i class="fa fa-trash-o"></i> Delete
																</label> <!-- <label
																	style="cursor: pointer;"padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="canclePerticularLabell" value="Delete"
																	onclick="" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->
																 <input	type="hidden" id="cancleType" value="N" />
															</div>

														</div>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="max-height: 350px; overflow: auto;">
															<div class="panel-body">

																<div class="row">

																	


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		
																		
																		
																		
																		<tbody id="ipdEstimation">

													<!-- Dynamic Tem added -->
													
													
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtysEstimate"> <i class="fa fa-at-o"></i>
																Totlal Qty:
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmtsEstimate"> <i class="fa fa-inr"></i>
															</label>
														</div>
														<!-- /ORDER DETAILS -->
													</div>
												
												
												
													<div class="tab-pane fade in active" id="box_tab4">

														 <div class="row">

															<form>

																<input type="hidden" class="form-control"
																	id="billDetailsId" value="0" />

																<!-- <div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="setallservautocompleteOnBilling(this.id),calculatePerticularTotal1();">
																</div> -->
																<div class="form-group col-md-3" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="setallservautocompleteForQuotationNew(this.id);">
																</div>
																<!-- <div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="autosuggetionForDefaultForIPD(this.id),calculatePerticularTotal1();">
																</div> -->
																<div class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servId" name="ServName" style="padding: 0px"
																		class="form-control col-md-12" onclick=""></select>
																</div>


																<div class="form-group col-md-2" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorName" value='null' name="doctorName"
																		class="col-md-12 form-control" onchange=""></select>
																</div>



																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="finalDate"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTime" value="" />
																</div>

																<div class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="numeric">Rate:</label> <input type="text"
																		class="form-control" value="0" id="rate" name="rate"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal1()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="email">Qty:</label> <input type="text"
																		class="form-control" value="1" id="qty" name="qty"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal1()">
																</div>

																

																<div class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="Amount">Amount:</label> <input type="text"
																		class="form-control"
																		onkeyup="calculatePerticularPay1()" value="0"
																		id="amount" name="amount">
																</div>
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Per %:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdPer"
																		name="concessionIpdPer"
																		onkeypress="return validatePrice(event)"
																		onkeyup="concessionOnPercentageIpd(),calculatePerticularTotal1();">
																</div>
																 
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Concsn:</label> <input type="text"
																		class="form-control" value="0" id="concession"
																		name="concession"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal1()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Pay:</label> <input type="text"
																		class="form-control" value="0" id="pay" name="pay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay1()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">C-Pay:</label> <input type="text"
																		class="form-control" value="0" id="coPay" name="coPay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay1()">
																</div>

																<div class="form-group col-md-1" style="padding-left: 0px;padding-top: 19px;">
																	<input type="button"
																		class="form-control btn btn-primary" value="add"
																		id="Add" name="addBill" style="padding: 0px"
																		onclick="addBillQuotations()">
																</div>
																
																<div class="form-group col-md-1" style="padding-left: 0px;padding-top: 19px;">
																	<input type="button"
																		class="form-control btn btn-success" value="save"
																		id="Saveqtnnn" name="saveBill" style="padding: 0px"
																		onclick="saveQuotations()">
																</div>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />
															</form>

														</div> 


													 <%--	<div>

															<div
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																class="title col-md-12-1">
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New" onclick="crearAllFields()">
																	<i class="fa fa-plus-square"></i> New
																</label>
																<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"
																	onclick="onClickEdit(this.id)"> <i
																	class="fa fa-edit"></i> Edit
																</label> -->
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabels" value="delete"
																	onclick="deleteServiceToPatient(this.id)">
																	<i class="fa fa-trash-o"></i> Delete
																</label> <!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabels" value="Delete"
																	onclick="cancleOnClick(this.id)" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->
																
																<i class="fa fa-plus" id="exploreServ"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="exploreOnClick('open')">	Open All																
																</label>
																
																<i class="fa fa-plus" id="convertToPackipd2"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="convertToPackipd" data-toggle="modal" data-target="#packToConv" 
																	onclick="convertToPackageipd('open',<%=request.getParameter("treatmentId")%>)">	Convert To Pack																
																</label>
																
																<label style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;" onclick="sendToLab(2)">
																	<i class="fa fa-arrow-circle-right"></i>
																			Send To Lab
																</label>
																
																 <input	type="hidden" id="cancleType" value="N" />	
															</div>

														</div> --%>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="height: 320px; overflow: auto;" id="billPanel">
															<div class="panel-body">

																<div class="row">

																	<!-- <div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="newPerticular()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticular" value="Edit"
																			onclick="onClickEdit(this.id)"> <i
																			class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label> <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label>
																	</div> -->


																	<table class='table table-hover' id="tableOne">

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		<tbody id="billDetails">

																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												
																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												
																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->

														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtyN"> <i class="fa fa-at-o"></i>
																0
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmtN"> 0.00
															</label>
														</div>


														<!-- /ORDER DETAILS -->
													</div>
													
													
													<div class="tab-pane fade" id="box_tab5">
														<div class="row">

															<form>


																<input type="hidden" class="form-control"
																	id="billDetailsId" value="0" />

																
																<div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticularIpdSponsor"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="setallchargesConfigOnBilling(this.id);">
																</div>
																
																<div class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servIdIpdSponsor" name="ServName" style="padding: 0px"
																		class="form-control col-md-12" onclick=""></select>
																</div>


																<div class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorNameIpdSponsor" value='null' name="doctorNameIpdSponsor"
																		class="col-md-12" onchange=""></select>
																</div>



																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="finalDate"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeIpdSponsor" value="" />
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="numeric">Rate:</label> <input type="text"
																		class="form-control" value="0" id="rateIpdSponsor" name="rate"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotalIpdSponsor()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="email">Qty:</label> <input type="text"
																		class="form-control" value="1" id="qtyIpdSponsor" name="qty"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotalIpdSponsor()">
																</div>

																

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="Amount">Amount:</label> <input type="text"
																		class="form-control"
																		onkeyup="calculatePerticularPaySponsor()" value="0"
																		id="amountIpdSponsor" name="amount">
																</div>
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Per %:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdSponsorPer"
																		name="concessionIpdSponsorPer"
																		onkeypress="return validatePrice(event)"
																		onkeyup="concessionOnPercentageIpdSponsor(),calculatePerticularTotalIpdSponsor();">
																</div>
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Concsn:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdSponsor"
																		name="concession"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotalIpdSponsor()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="email">Pay:</label> <input type="text"
																		class="form-control" value="0" id="payIpdSponsor" name="pay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPaySponsor()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">C-Pay:</label> <input type="text"
																		class="form-control" value="0" id="coPayIpdSponsor" name="coPay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPaySponsor()">
																</div>

																<div class="form-group col-md-1" style="padding-left: 4px;padding-top: 0px;">
																	<label for="email">(Shft + S)</label> <input type="button"
																		class="form-control btn btn-primary" value="save"
																		id="saveBill1" name="saveBill" style="padding: 0px"
																		onclick="saveServiceToSponsorPatient(this.id)">
																</div>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />



															</form>

														</div>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="max-height: 350px; overflow: auto; " id="ipdsponsortab">
															<div class="panel-body">

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="edit" value="Edit" onclick="editPerticular()">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabell" onclick="deleteServiceToPatient(this.id)" value="Delete">
																			<i class="fa fa-trash-o"></i> Delete
																		</label> <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label>
																	</div>


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		
																		
																		
																		
																		<tbody id="sponsorIpd">

																			<!-- Added Dynamic Temp From JS  -->
																			
																			
																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQttty"> <i class="fa fa-at-o"></i>
																Totlal Qty:
															</label> 
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label>
																<label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmmmt"> <i class="fa fa-inr"></i>
															</label>
														</div>
														
														<!-- /ORDER DETAILS -->
														
													</div>
													<div class="tab-pane fade" id="box_tab6">
													

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="height: 259px; overflow: auto;">
															<div class="panel-body">

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticularLabel" value="Edit">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label>  <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="SaveCghs" value="Save"
																			onclick="saveIpdCghs()"> <i
																			class="fa fa-save"></i> Save Cghs
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="printCghs" value="printCghs"
																			onclick="cghsIpdPrint()"> <i
																			class="fa fa-print"></i> Print Cghs
																		</label> 
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="printRemainCghs" value="printRemainCghs"
																			onclick="cghsRemainIpdPrint()"> <i
																			class="fa fa-print"></i> Print Diff.Cghs Detail
																		</label><label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="PrintDiffCghsAmount" value="PrintDiffCghsAmount"
																			onclick="PrintDiffCghsAmount()"> <i
																			class="fa fa-print"></i> Print Diff.Cghs Amount
																		</label>
																		<!-- <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label> -->
																	</div>


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		
																		<tbody id="cghsBill">


																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtty"> <i class="fa fa-at-o"></i>
																Totlal Qty:
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmmt"> <i class="fa fa-inr"></i>
															</label>
														</div>
														
														<!-- /ORDER DETAILS -->
														
														
															<div class="panel panel-default"
															style="height: 260px; overflow: auto;">
															<div class="panel-body">
																<div class="row">

															<form>

																<div class="form-group col-md-2">
																	<label for="email">Perticular:</label> <input
																		type="text" class="form-control" id="perManual"
																		placeholder="Enter Perticular" name="email"
																		onkeyup="setallTempAutocompleteOnIpdBilling(this.id)">
																</div>
																
																<div class="form-group col-md-2">
																	<label for="email">Pack Code:</label> <input
																		type="text" class="form-control" id="packManual"
																		placeholder="Enter Code" name="email"	>
																</div>

																<div class="form-group col-md-2">
																	<label for="email">Date:</label> <input type="email"
																		class="form-control" id="dateManual" value="<%=current_date%>""
																		readonly="readonly" name="email">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Rate:</label> <input type="email"
																		class="form-control" id="rateManual" name="email"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Qty:</label> <input type="email"
																		class="form-control" id="qtyManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Disc:</label> <input type="email"
																		class="form-control" id="concessionManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Amount:</label> <input type="email"
																		class="form-control" id="amountManual" name="email" 
																		onkeyup="calculatePerticularPay2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Pay:</label> <input type="email"
																		class="form-control" id="payManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Copay:</label> <input type="email"
																		class="form-control" id="coPayManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay2()">
																</div>

																<div class="form-group col-md-2" id="divSaveEditButton">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Save"
																		id="addService" name="email" onclick="setTemplateForTemp(this.id)">
																</div>

															</form>

														</div>

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticularLabel" value="Edit">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label> 
																		<!-- <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label> -->
																	</div>


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				<!-- <th>Item</th> -->
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Code</div>
																				</th>
																				<th>
																					<div class='text-center'>Date</div>
																				</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Qty</div>
																				</th>
																				<th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<!-- <th>
																					<div class='text-right'>Total Price</div>
																				</th> -->
																			</tr>
																		</thead>
																		
																		<tbody id="cghsBillManual">


																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>





																<!-- 	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Date</div>
																				</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Qty</div>
																				</th>
																				<th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th>
																			</tr>
																		</thead>
															
																
																
																		<tbody id="cghsBillManualChange">







																		</tbody>
																	</table> -->
																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														
														
														<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Service:</label> <input
																		type="text" class="form-control" id="SerManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;' style="padding:0 0 0 4px">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="dateManualRemains"
																		value="<%=current_date%>" readonly="readonly"
																		class="form-control input-SmallText">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Amount:</label> <input
																		type="text" class="form-control" id="amountManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label class='TextFont col-md-4-1' for="email">Pay:</label> <input
																		type="text" class="form-control" id="payManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label class='TextFont col-md-4-1' for="email">Total Remains:</label> <input
																		type="text" class="form-control" id="totalManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" id="divSaveEditButton">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Add"
																		id="addService" name="email" onclick="setTemplateForTempRemains(this.id)">
																</div>
															
														
													
													
													
													
																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Date</div>
																				</th>
																				<th>
																					<div class='text-center'>Amount</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<!-- <th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th> -->
																			</tr>
																		</thead>
															
																
																
																		<tbody id="cghsBillManualChangeRemains">







																		</tbody>
																	</table>
														
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- /BOX -->
								
								</div>






								<!--<div class="col-md-12 box">

									 <div class="panel panel-default">
										<div class="panel-body">
											<div class="tabbable">
												<ul class="nav nav-tabs">
													<li class="active">
														<a onclick="getBillReceiptDetailsIpd('all')" data-toggle="tab"><i class="fa fa-user-md"></i>
															All Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetailsIpd('cash')" data-toggle="tab"><i class="fa fa-user-md"></i>
															Cash Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetailsIpd('credit')" data-toggle="tab"><i class="fa fa-ambulance"></i> 
															Credit Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetails('refund')" data-toggle="tab"><i class="fa fa-stethoscope"></i> 
															Refund Receipts</a></li>													
												</ul>
												<div class="tab-content">
													<div class="tab-pane fade in active" id="cashReceipts">

													</div>													
												</div>
											</div>
										</div>
									</div> -->
									
								<!-- 	<div class="panel panel-default" id="refundBillDetails" style="height: 182px;overflow: auto;">
										<div class="panel-body">
											<div class="tabbable">
												<ul class="nav nav-tabs">
													<li class="active" id="allReceipt">
														<a onclick="getBillReceiptDetailsIpd('all')" data-toggle="tab"><i class="fa fa-user-md"></i>
															All Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetailsIpd('cash')" data-toggle="tab"><i class="fa fa-user-md"></i>
															Cash Receipts</a></li>
													<li>
														<a onclick="getBillReceiptDetailsIpd('credit')" data-toggle="tab"><i class="fa fa-ambulance"></i> 
															Credit Receipts</a></li>													
													<li>
														<a onclick="getBillReceiptDetailsIpd('refundable')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Refundable</a></li>	
													<li>
														<a onclick="getBillRefundDetailsIpd('refund')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Refunded</a></li>
															
													<li id="deletedReceipt">
														<a onclick="getBillReceiptDetailsIpd('deleted')" data-toggle="tab"><i class="fa fa-credit-card"></i> 
															Deleted</a></li>		
													
													<li style="float: right;">
														<a id="hidebilldet" onclick="hideBillDetails()"><b><label id="billText">  Show Receipts View   </label> <i id="shBillView" class="fa fa-chevron-up"></i> 
															</b></a></li>													
												</ul>
												<div class="tab-content">
													<div class="tab-pane fade in active" id="cashReceipts">

													</div>													
												</div>
											</div>
										</div>
									</div>
 
								</div>

<!-- -----------------------------Comparison----------------------------------------- -->


								<div class="col-md-6 ">
									<!-- BOX -->
									<div class="box border">
										<div class="box-title">
											<h4>
												<i class="fa fa-column"></i><span
													class="hidden-inline-mobile"></span>
											</h4>
										</div>
										<div class="box-body" id="mainBillDeatilsComparison">
											<div class="tabbable header-tabs">
												<ul class="nav nav-tabs">
												
												<li	 class="form-group col-md-2" style="padding-left: 0px;padding-top: 5px;">
																	<input type="button"
																		class="form-control btn btn-primary" value="Quotation"
																		id="quotationCompID" name="Quotation" style="padding: 0px"
																		onclick="getBillQuotationsCompareToBill(<%=request.getParameter("treatmentId")%>)">
																</li>
												
													<li class="active"><a href="#box_tab4" id="generalHideForIpd"
														data-toggle="tab"><i class="fa fa-home"></i> <span id="ipdGeneral"
															class="hidden-inline-mobile" onclick="getIpdComparisonPatients()">Compare Services</span> <!-- <span
														class="badge badge-blue font-11">3</span> --></a></li>
												
												
												<%-- <li class="active"><a href="#box_tab4"
														data-toggle="tab" id="generalHideForIpdPrevBill"><i class="fa fa-home"></i> <span
															class="hidden-inline-mobile" onclick="getPatientPreviousBillAmountForGenIpd(<%=request.getParameter("treatmentId")%>,'general')">General Bill</span> </a></li>
												 --%>
												
												
												
												
												
												</ul>
												<div class="tab-content">
												
												
														<div class="tab-pane fade" id="box_tab7">
														<div class="row">

															<form>

																<input type="hidden" class="form-control"
																	id="estimation" value="0" />

																<%-- <div class="form-group col-md-2" style="padding:0 0 0 16px">
																	<label class="TextFont" for="exampleInputPassword1">From Date</label>
																	<input type="text" id="dob"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'yyyy/mm/dd',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeOpdSponsorStart" value="" />
																</div> --%>
																
																<div class="form-group col-md-3" style="padding:0 0 0 16px;padding-top: 20px;">
																						<label style="margin-right: 14px;" class="control-label col-md-1">From Date<span
																							class="required"></span></label>

																						<div class="input-group date" style="width: -1%;">

																							<input type="text" class="form-control"
																								id="dob">

																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>	
																
																<%-- <div class="form-group col-md-2" style="padding:0 0 0 17px">
																	<label class="TextFont" for="exampleInputPassword1">To Date</label>
																	<input type="text" id="dob1"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'yyyy/mm/dd',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeOpdSponsorEnd" value="" />
																</div> --%>
																
																<div class="form-group col-md-3" style="padding:0 0 0 16px;padding-top: 20px;">
																						<label style="margin-right: 14px;" class="control-label col-md-1">To Date<span
																							class="required"></span></label>

																						<div class="input-group date" style="width: -1%;">

																							<input type="text" class="form-control"
																								id="dob1">

																							<div class="input-group-addon">
																								<i class="fa fa-calendar"></i>
																							</div>
																						</div>
																					</div>	

																<%-- <div id="prevCalfromdiv" class="form-group col-md-3" style="padding-left: 35px;padding-top: 5px;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Get Estimate"
																		id="saveBillOpdSponsor" name="saveBillOpdSponsor" style="padding: 0px"
																		onclick="getPatientBillAmountIpdForEstimation(<%=request.getParameter("treatmentId")%>,'prev')">
																</div>
																<div id="currentCalfromdiv"  class="form-group col-md-3" style="padding-left: 35px;padding-top: 5px;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Get Estimate"
																		id="saveBillOpdSponsor" name="saveBillOpdSponsor" style="padding: 0px"
																		onclick="getPatientBillAmountIpdForEstimation(<%=request.getParameter("treatmentId")%>,'current')">
																</div> --%>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />
															

															</form>
														</div>
														
																<div>

															<div
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																class="title col-md-12-1">
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New" onclick="crearAllFields()">
																	<i class="fa fa-plus-square"></i> New
																</label>
																
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabell" value="delete"
																	onclick="">
																	<i class="fa fa-trash-o"></i> Delete
																</label> <!-- <label
																	style="cursor: pointer;"padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="canclePerticularLabell" value="Delete"
																	onclick="" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->
																 <input	type="hidden" id="cancleType" value="N" />
															</div>

														</div>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														
														
														
														<div class="panel panel-default"
															style="max-height: 350px; overflow: auto;">
															<div class="panel-body">

																<div class="row">

																	


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		
																		
																		
																		
																		<tbody id="ipdEstimation">

													<!-- Dynamic Tem added -->
													
													
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtysComp"> <i class="fa fa-at-o"></i>
																Totlal Qty:
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmtsComp"> <i class="fa fa-inr"></i>
															</label>
														</div>
														<!-- /ORDER DETAILS -->
													</div>
												
												
												
													<div class="tab-pane fade in active" id="box_tab4">

														 <div class="row">

															<form>

																<input type="hidden" class="form-control"
																	id="billDetailsId" value="0" />

																<!-- <div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="setallservautocompleteOnBilling(this.id),calculatePerticularTotal1();">
																</div> -->
																<div class="form-group col-md-2" style="padding-top: 28px;">
																	<label for="email">    </label> <!-- <input
																		type="" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup=";"> -->
																</div>
																<!-- <div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticular"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="autosuggetionForDefaultForIPD(this.id),calculatePerticularTotal1();">
																</div> -->
																<div class="form-group col-md-2" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servId" name="ServName" style="padding: 0px"
																		class="form-control col-md-12" onclick=""></select>
																</div>


																<div class="form-group col-md-2" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorName" value='null' name="doctorName"
																		class="col-md-12 form-control" onchange=""></select>
																</div>



																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="finalDate"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTime" value="" />
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="numeric">Rate:</label> <input type="text"
																		class="form-control" value="0" id="rate" name="rate"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal1()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Qty:</label> <input type="text"
																		class="form-control" value="1" id="qty" name="qty"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal1()">
																</div>

																

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="Amount">Amount:</label> <input type="text"
																		class="form-control"
																		onkeyup="calculatePerticularPay1()" value="0"
																		id="amount" name="amount">
																</div>
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Per %:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdPer"
																		name="concessionIpdPer"
																		onkeypress="return validatePrice(event)"
																		onkeyup="concessionOnPercentageIpd(),calculatePerticularTotal1();">
																</div>
																 
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Concsn:</label> <input type="text"
																		class="form-control" value="0" id="concession"
																		name="concession"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal1()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">Pay:</label> <input type="text"
																		class="form-control" value="0" id="pay" name="pay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay1()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">C-Pay:</label> <input type="text"
																		class="form-control" value="0" id="coPay" name="coPay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay1()">
																</div>

																<div class="form-group col-md-1" style="padding-left: 4px;display: none;">
																	<label for="email">(Shft + P)</label><input type="button"
																		class="form-control btn btn-primary" value="save"
																		id="saveBill" name="saveBill" style="padding: 0px"
																		onclick="saveServiceToPatient()">
																</div>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />
															</form>

														</div> 


													 	<%--<div>

															<div
																style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																class="title col-md-12-1">
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New" onclick="crearAllFields()">
																	<i class="fa fa-plus-square"></i> New
																</label>
																<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"
																	onclick="onClickEdit(this.id)"> <i
																	class="fa fa-edit"></i> Edit
																</label> -->
																<label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabels" value="delete"
																	onclick="deleteServiceToPatient(this.id)">
																	<i class="fa fa-trash-o"></i> Delete
																</label> <!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="deletePerticularLabels" value="Delete"
																	onclick="cancleOnClick(this.id)" value="cancle">
																	<i class="fa fa-times"></i> Cancel
																</label> -->
																
																<i class="fa fa-plus" id="exploreServ"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="expPerticularLabels" onclick="exploreOnClick('open')">	Open All																
																</label>
																
																<i class="fa fa-plus" id="convertToPackipd2"></i> 
																<label
																	style="cursor: pointer;padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="convertToPackipd" data-toggle="modal" data-target="#packToConv" 
																	onclick="convertToPackageipd('open',<%=request.getParameter("treatmentId")%>)">	Convert To Pack																
																</label>
																
																<label style="cursor: pointer; margin-bottom: 0px; margin-left: 20px;" onclick="sendToLab(2)">
																	<i class="fa fa-arrow-circle-right"></i>
																			Send To Lab
																</label>
																
																 <input	type="hidden" id="cancleType" value="N" />	
															</div>

														</div> --%>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="height: 320px; overflow: auto;" id="billPanel">
															<div class="panel-body">

																<div class="row">

																	<!-- <div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="newPerticular()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticular" value="Edit"
																			onclick="onClickEdit(this.id)"> <i
																			class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label> <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label>
																	</div> -->


																	<table class='table table-hover' id="tableTwo">

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		<tbody id="billDetailsComparision">

																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												
																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input type='checkbox'>
																													</td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												
																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->

														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtyComparison"> <i class="fa fa-at-o"></i>
																0
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmtComparison"> 0.00
															</label>
														</div>


														<!-- /ORDER DETAILS -->
													</div>
													
													
													<div class="tab-pane fade" id="box_tab5">
														<div class="row">

															<form>


																<input type="hidden" class="form-control"
																	id="billDetailsId" value="0" />

																
																<div class="form-group col-md-2" style="padding-right: 4px;">
																	<label for="email">Particular:</label> <input
																		type="text" class="form-control" id="perticularIpdSponsor"
																		placeholder="Enter Perticular" name="perticular"
																		onkeyup="setallchargesConfigOnBilling(this.id);">
																</div>
																
																<div class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servIdIpdSponsor" name="ServName" style="padding: 0px"
																		class="form-control col-md-12" onclick=""></select>
																</div>


																<div class="form-group col-md-2" style="padding:0 0 0 4px">
																	<label for="email">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorNameIpdSponsor" value='null' name="doctorNameIpdSponsor"
																		class="col-md-12" onchange=""></select>
																</div>



																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="finalDate"
																		value="<%=current_date%>" readonly="readonly"
																		onclick="displayCalendar(document.getElementById('finalDate'),'dd/mm/yyyy',this)"
																		class="form-control input-SmallText"> <input
																		type="hidden" id="finalTimeIpdSponsor" value="" />
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="numeric">Rate:</label> <input type="text"
																		class="form-control" value="0" id="rateIpdSponsor" name="rate"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotalIpdSponsor()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="email">Qty:</label> <input type="text"
																		class="form-control" value="1" id="qtyIpdSponsor" name="qty"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotalIpdSponsor()">
																</div>

																

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="Amount">Amount:</label> <input type="text"
																		class="form-control"
																		onkeyup="calculatePerticularPaySponsor()" value="0"
																		id="amountIpdSponsor" name="amount">
																</div>
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Per %:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdSponsorPer"
																		name="concessionIpdSponsorPer"
																		onkeypress="return validatePrice(event)"
																		onkeyup="concessionOnPercentageIpdSponsor(),calculatePerticularTotalIpdSponsor();">
																</div>
																
																<div class="form-group col-md-1" style="padding:0 0 0 4px;display:none;">
																	<label for="email">Concsn:</label> <input type="text"
																		class="form-control" value="0" id="concessionIpdSponsor"
																		name="concession"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotalIpdSponsor()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px">
																	<label for="email">Pay:</label> <input type="text"
																		class="form-control" value="0" id="payIpdSponsor" name="pay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPaySponsor()">
																</div>

																<div class="form-group col-md-1" style="padding:0 0 0 4px;display: none;">
																	<label for="email">C-Pay:</label> <input type="text"
																		class="form-control" value="0" id="coPayIpdSponsor" name="coPay"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPaySponsor()">
																</div>

																<div class="form-group col-md-1" style="padding-left: 4px;padding-top: 0px;">
																	<label for="email">(Shft + S)</label> <input type="button"
																		class="form-control btn btn-primary" value="save"
																		id="saveBill1" name="saveBill" style="padding: 0px"
																		onclick="saveServiceToSponsorPatient(this.id)">
																</div>
																<input type="hidden" id="SpecialDisc" /> <input
																	type="hidden" id="queryType" value="insert" />



															</form>

														</div>

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="max-height: 350px; overflow: auto; " id="ipdsponsortab">
															<div class="panel-body">

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="edit" value="Edit" onclick="editPerticular()">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabell" onclick="deleteServiceToPatient(this.id)" value="Delete">
																			<i class="fa fa-trash-o"></i> Delete
																		</label> <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label>
																	</div>


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		
																		
																		
																		
																		<tbody id="sponsorIpd">

																			<!-- Added Dynamic Temp From JS  -->
																			
																			
																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQttty"> <i class="fa fa-at-o"></i>
																Totlal Qty:
															</label> 
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label>
																<label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmmmt"> <i class="fa fa-inr"></i>
															</label>
														</div>
														
														<!-- /ORDER DETAILS -->
														
													</div>
													<div class="tab-pane fade" id="box_tab6">
													

														<!-- ORDER DETAILS -->
														<!-- <div class="col-md-8"> -->
														<div class="panel panel-default"
															style="height: 259px; overflow: auto;">
															<div class="panel-body">

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticularLabel" value="Edit">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label>  <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="SaveCghs" value="Save"
																			onclick="saveIpdCghs()"> <i
																			class="fa fa-save"></i> Save Cghs
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="printCghs" value="printCghs"
																			onclick="cghsIpdPrint()"> <i
																			class="fa fa-print"></i> Print Cghs
																		</label> 
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="printRemainCghs" value="printRemainCghs"
																			onclick="cghsRemainIpdPrint()"> <i
																			class="fa fa-print"></i> Print Diff.Cghs Detail
																		</label><label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="PrintDiffCghsAmount" value="PrintDiffCghsAmount"
																			onclick="PrintDiffCghsAmount()"> <i
																			class="fa fa-print"></i> Print Diff.Cghs Amount
																		</label>
																		<!-- <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label> -->
																	</div>


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='only-checkbox'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Quantity</div>
																				</th>
																				<th>
																					<div class='text-right'>Amount</div>
																				</th>
																			</tr>
																		</thead>
																		
																		<tbody id="cghsBill">


																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>

																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														<!-- </div> -->
														<!-- /Billing Calculations -->
														<div
															style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
															class="title col-md-12-1">
															<!-- <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																	id="newPerticularLabel" value="New"
																	> <i
																	class="fa fa-plus-square"></i> New
																</label>  <label
																	style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																	id="editPerticular" value="Edit"> <iclass="fa fa-edit"></i> Edit
																</label>  -->
															<label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class=""></i>&nbsp;&nbsp;Total
																Qty:</label>																
															<label
																style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalQtty"> <i class="fa fa-at-o"></i>
																Totlal Qty:
															</label> <label
																style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;"
																> <i class="fa fa-inr"></i>&nbsp;&nbsp;Total
																Amount:</label><label
																style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																id="totalAmmt"> <i class="fa fa-inr"></i>
															</label>
														</div>
														
														<!-- /ORDER DETAILS -->
														
														
															<div class="panel panel-default"
															style="height: 260px; overflow: auto;">
															<div class="panel-body">
																<div class="row">

															<form>

																<div class="form-group col-md-2">
																	<label for="email">Perticular:</label> <input
																		type="text" class="form-control" id="perManual"
																		placeholder="Enter Perticular" name="email"
																		onkeyup="setallTempAutocompleteOnIpdBilling(this.id)">
																</div>
																
																<div class="form-group col-md-2">
																	<label for="email">Pack Code:</label> <input
																		type="text" class="form-control" id="packManual"
																		placeholder="Enter Code" name="email"	>
																</div>

																<div class="form-group col-md-2">
																	<label for="email">Date:</label> <input type="email"
																		class="form-control" id="dateManual" value="<%=current_date%>""
																		readonly="readonly" name="email">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Rate:</label> <input type="email"
																		class="form-control" id="rateManual" name="email"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Qty:</label> <input type="email"
																		class="form-control" id="qtyManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Disc:</label> <input type="email"
																		class="form-control" id="concessionManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Amount:</label> <input type="email"
																		class="form-control" id="amountManual" name="email" 
																		onkeyup="calculatePerticularPay2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Pay:</label> <input type="email"
																		class="form-control" id="payManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay2()">
																</div>

																<div class="form-group col-md-1">
																	<label for="email">Copay:</label> <input type="email"
																		class="form-control" id="coPayManual" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay2()">
																</div>

																<div class="form-group col-md-2" id="divSaveEditButton">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Save"
																		id="addService" name="email" onclick="setTemplateForTemp(this.id)">
																</div>

															</form>

														</div>

																<div class="row">

																	<div
																		style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;"
																		class="title col-md-12-1">
																		<label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"
																			id="newPerticularLabel" value="New"
																			onclick="crearAllFields()"> <i
																			class="fa fa-plus-square"></i> New
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="editPerticularLabel" value="Edit">
																			<i class="fa fa-edit"></i> Edit
																		</label> <label
																			style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			id="deletePerticularLabel" value="Delete"
																			onclick="deletePerticular()"> <i
																			class="fa fa-trash-o"></i> Delete
																		</label> 
																		<!-- <label
																			style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"
																			onclick="showbedchangepopup()" value="bedChange">
																			<i class="fa fa-fw"><img width="17px;"
																				height="17px;" style="margin-right: 20px;"
																				src="images/bedmis.png"></i>&nbsp;&nbsp;Bed Change
																		</label> -->
																	</div>


																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				<!-- <th>Item</th> -->
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Code</div>
																				</th>
																				<th>
																					<div class='text-center'>Date</div>
																				</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Qty</div>
																				</th>
																				<th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<!-- <th>
																					<div class='text-right'>Total Price</div>
																				</th> -->
																			</tr>
																		</thead>
																		
																		<tbody id="cghsBillManual">


																			<!-- <tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion" href="#collapseOne">

																											<div class="row">
																												<div class="col-md-10">Beds</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseOne"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr>

																			<tr>
																				<td class='only-checkbox'><input
																					type='checkbox'></td>
																				<td>
																					<div class='text-left'>
																						<div class="panel-group" id="accordion1">
																							<div class="panel">
																								
																								<div class="panel-heading">
																									<h3 class="panel-title">

																										<a class="accordion-toggle"
																											data-toggle="collapse"
																											data-parent="#accordion1" href="#collapseTwo">

																											<div class="row">
																												<div class="col-md-10">Pathology</div>
																												<div class="col-md-1">
																													<i class='fa fa-chevron-down'></i>
																												</div>
																											</div>


																										</a>
																									</h3>
																								</div>
																								
																								<div id="collapseTwo"
																									class="panel-collapse collapse">
																									<div class="panel-body">

																										<table class='table table-hover'>
																											<thead>
																												<tr>
																													<th class='only-checkbox'>#</th>
																													<th>Pay Mode</th>
																													<th>
																														<div class='text-center'>Amount</div>
																													</th>
																													<th>
																														<div class='text-right'>Date</div>
																													</th>
																												</tr>
																											</thead>
																											<tbody>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>
																												<tr>
																													<td class='only-checkbox'><input
																														type='checkbox'></td>
																													<td>Cash</td>
																													<td>
																														<div class='text-center'>999.00</div>
																													</td>
																													<td>
																														<div class='text-right'>25-05-2017</div>
																													</td>
																												</tr>

																											</tbody>
																										</table>

																									</div>
																								</div>
																							</div>
																						</div>

																					</div>

																				</td>
																				<td><div class='text-center'>1</div></td>
																				<td><div class='text-right'>999.00</div></td>
																			</tr> -->

																		</tbody>
																	</table>





																<!-- 	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				<th>Item</th>
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Date</div>
																				</th>
																				<th>
																					<div class='text-center'>Rate</div>
																				</th>
																				<th>
																					<div class='text-center'>Qty</div>
																				</th>
																				<th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th>
																			</tr>
																		</thead>
															
																
																
																		<tbody id="cghsBillManualChange">







																		</tbody>
																	</table> -->
																</div>
																<!-- /TABLE -->

															</div>
															<!-- /PANEL BODY -->

														</div>
														
														
														<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Service:</label> <input
																		type="text" class="form-control" id="SerManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;' style="padding:0 0 0 4px">
																	<label class="TextFont" for="exampleInputPassword1">Date</label>
																	<input type="text" id="dateManualRemains"
																		value="<%=current_date%>" readonly="readonly"
																		class="form-control input-SmallText">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label for="email">Amount:</label> <input
																		type="text" class="form-control" id="amountManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label class='TextFont col-md-4-1' for="email">Pay:</label> <input
																		type="text" class="form-control" id="payManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" class='form-group Remove-Padding col-md-2-1'style='padding-right: 8px; margin-top: 13px;'>
																	<label class='TextFont col-md-4-1' for="email">Total Remains:</label> <input
																		type="text" class="form-control" id="totalManualRemains"
																		placeholder="Enter Perticular" name="email">
																</div>
																<div class="form-group col-md-2" id="divSaveEditButton">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Add"
																		id="addService" name="email" onclick="setTemplateForTempRemains(this.id)">
																</div>
															
														
													
													
													
													
																	<table class='table table-hover'>

																		<thead>
																			<tr>
																				<th class='text-center'>#</th>
																				
																				<th>
																					<div class='text-center'>Service</div>
																				</th>
																				<th>
																					<div class='text-center'>Date</div>
																				</th>
																				<th>
																					<div class='text-center'>Amount</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<!-- <th>
																					<div class='text-center'>Disc</div>
																				</th>
																				<th>
																					<div class='text-center'>Total</div>
																				</th>
																				<th>
																					<div class='text-center'>Pay</div>
																				</th>
																				<th>
																					<div class='text-center'>CoPay</div>
																				</th>
																				
																				<th>
																					<div class='text-right'>Total Price</div>
																				</th> -->
																			</tr>
																		</thead>
															
																
																
																		<tbody id="cghsBillManualChangeRemains">







																		</tbody>
																	</table>
														
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- /BOX -->
								</div>



<!-- --------------------------------------------------------------------------- -->




							</div>

							<!-- <div class="col-md-3">

								BOX
								<div class="box border">
									<div class="box-title">
										<h4>
											<i class="fa fa-colum"></i><span class="hidden-inline-mobile"></span>
										</h4>
									</div>
									<div class="box-body" style="min-height: 430px">
										
										<table class="table table-condensed  bottomLine">
											<tbody>
												<tr>
													<th class="col-md-5 center"><div class="TextFont"><button id="btnRefund" class="btn btn-xs btn-primary" onclick="saveRefundBillDetailsIpd('refund')" disabled="disabled">Refund</button></div></th>
													<th class="col-md-4 center"><div class="TextFont"><button class="btn btn-xs btn-warning">Receipt</button></div></th>
													<th class="numeric col-md-3 center"><div class="TextFont"><button class="btn btn-xs btn-info">Manage</button></div></th>

												</tr>
												<tr>
													<th class="col-md-3 center"><div class="TextFont"><button id="btnRefund" class="btn btn-xs btn-primary" onclick="saveRefundBillDetailsIpd('refund')" disabled="disabled">Refund</button></div></th>
													<th class="col-md-4 center"><div class="TextFont"><button class="btn btn-xs btn-warning" onclick="receiptBillPrint('receiptIpd',-5);">Receipt</button></div></th>
													<th class="col-md-4 center"><div class="TextFont"><button class="btn btn-xs btn-warning">Receipt</button></div></th> 
													<th class="numeric col-md-3 center"><div class="TextFont"><button class="btn btn-xs btn-info">Manage</button></div></th>
													<th class="col-md-3 center"><div class="TextFont"><button id="btnDisc" class="btn btn-xs btn-warning" onclick="manageDiscountIpd()">Manage</button></div></th>
													<th class="col-md-3 center"><div class="TextFont"><button id="btnDisc" class="btn btn-xs btn-warning" onclick="showManagePopUp('save')">Manage</button></div></th>
												</tr>												
											</tbody>
										</table>
															
										<table id="headerTable">	
										
											<tr>
												<td style="width: 50%"><label>payMode</label></td>
												<td>
													<select id="payMode" style="width: 100%" onchange="BankOnSelect2()" class="form-control">
														<option value="1">Cash</option>
														<option value="2">Card</option>
														<option value="3">Cheque</option>
														<option value="4">CAdvance</option>
														<option value="5">Multiple</option>
													</select>
												</td>	
												
												<td>
													<button id="btnMultiple" style="display: none;" class="md-trigger" data-modal="modal-11">Multi</button>
												</td>																
												
											</tr>	
											<tr class="member">
												<td><label>Bank</label></td>
												<td>
													<select id="bankID" class="form-control" style="width: 100%">
														<option value="1">ICICI</option>
														<option value="2">HDFC</option>
														<option value="3">YES BANK</option>
														<option value="4">IDBI</option>
													</select>
												</td>											
												
											</tr>	
											<tr class="member2">
												<td><label>Batch</label></td>
												<td><input type="text" id="batchnumber"></td>
												
											</tr>
											
											
											
											<tr>
												<td><label>BankName</label></td>
												<td><input type="text" id="bName"></td>
												
											</tr>
																								
											<tr>
												<td><label>payable</label></td>
												<td><input type="text" id="payable" readonly></td>
												
											</tr>
											
											<tr id="trDisc">
												<td><label>Discount</label></td>
												<td><input type="text" id="discount" value="0" onkeyup="calDiscountIpd()" readonly></td>
												
											</tr>
											
											<tr>
												<td><label>Now pay</label></td>
												<td><input type="text" id="payNow" value="0"></td>
												
											</tr>	
											
											<tr>
												
												<td><label>Payee</label></td>
												<td>
													<select class="form-control" style="width: 100%" id="payee" onchange="showSponsorIpd()">
														<option value="1">Patient</option>
														<option value="2">Sponsor</option>													
													</select>
												</td>		
											
											</tr>														
											
											<tr>
												<td></td>
												<td align="right"><input id="btnPayNow" type="button" onclick="saveBillDetailsIpd('cash')" class="btn btn-xs btn-primary" value="Pay Now"></td>
												
											</tr>	
											
											<tr>
												<td></td>
												<td></td>
											</tr>
											
											<tr>
												<td></td>
												<td></td>
											</tr>	
																																		
										</table>
										
										<table class="table table-condensed  bottomLine">
										
										<tr id="trSpon" style="display: none;">
												
												<td>
												
													<div class="form-group">
														<div>
															<select name="listmstr" id="listmstr_select_service" style="width: 100%"
																onchange="setDyanamicDivForCharges('dynamicItems',this.id)">
																<option id="firstElmts">--- Select Sponsor
																	---</option>
															</select>
														</div>
													</div>
												
												</td>
											
												<td>												
	
													<div class="col-md-12 select2-container select2-container-multi">
														<ul id="dynamicItems" class="select2-choices"
															style="overflow-y: scroll;">
	
														</ul>
													</div>
												</td>
											
											</tr>														
											
											<tr>
												<td></td>
												<td align="right"><input id="btnPayNow" type="button" onclick="saveBillDetailsIpd('cash')" class="btn btn-xs btn-primary" value="Pay Now"></td>
												
											</tr>
										
										
										</table>
										
										
										
										
										<table class="table table-condensed ">

												<tbody>
													<tr class="divide-10"></tr>
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Total</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalBillTotal" class="col-md-4-1">550.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<tr>
														<td style="padding: 1px;" id="idCategoryDiscount" class="col-md-7-1">Category Disc(0.0%)</td>
														<td style="color: #5CAFE6; padding: 1px; font-weight: bold;text-align: right;" id="categoryDiscount" class="col-md-4-1">0.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr> 
													<tr>
														<td style="padding: 1px;" class="col-md-7-1">Grand Total</td>
														<td style="padding: 1px; font-weight: bold;text-align: right;" id="grandTotal" class="col-md-4-1">550.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>

													</tr>
													for 1
													<tr>
														<td style="padding: 1px;" class="col-md-7-1">Discount</td>
														<td style="color: orange; padding: 1px; font-weight: bold;text-align: right;" id="finalDiscount" class="col-md-4-1">0.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													/ 1
													<tr>
														<td style="padding: 1px;" id="totalServicTaxText" class="col-md-7-1">Total+Tax(0%)</td>
														<td style="padding: 1px; font-weight: bold;text-align: right;" id="finalBillTotalServiceTax" class="col-md-4-1">550.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<tr>
														<td style="border-top:; padding: 1px;" class="col-md-7-1">Payable</td>
														<td style="color :#DC143C; padding: 1px;text-align: right;" id="finalPayable" class="col-md-4-1">550.00</td>
														<td style="border-top:; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Advance/Paid</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalAdvancePaid" class="col-md-4-1">0.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Pharmacy/Paid</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="PharmacyAdvancePaid" class="col-md-4-1">0.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<tr>
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Pharmacy Return</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="PharmacyCashReturn" class="col-md-4-1">0.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"></td>
													</tr>
													<tr class="divide-10"></tr>
													<tr style="color: green;">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Refund</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalRefund" class="col-md-4-1">0.00</td>
														<td style="border-top: none; padding: 1px;" class="col-md-1-1"><input type="checkbox" id="refundChekbox" onclick="showRefundReceipt('finalrefund')" class="editUserAccess">
														</td>
													</tr>
													<tr style="color: blue;">
														<td style="border-top: none; padding: 1px;" class="col-md-7-1">Outstanding</td>
														<td style="border-top: none; padding: 1px;text-align: right;" id="finalOutstanding" class="col-md-4-1">550.00</td>
														<td style="border-top: none; padding: 0px;" class="col-md-1-1"><input type="checkbox" id="outstandingCheckbox" class="editUserAccess" onclick="showOutstandingReceipt()"></td>
													</tr>
												</tbody>
											</table>
										
										
															
										<div class="divide-20"></div>
															
										<table>
										
											<tr>
												<td style="color: red">Previous Pending Amount : 0</td>
												
											</tr>
											
											<tr>
												
												<td style="color: blue">Common Advance Amount : 0</td>
											</tr>
																					
										</table>	
										
										<table>
										
											<tr>												
												<td style="color: blue">Common Advc Amount : <label id="commnAdvc">0</label></td>
												
											</tr>
											
											<tr>												
												<td style="color: blue">Discount Amount : <label id="discAmt">0</label></td>
												
											</tr>
										
											<tr>
												<td style="color: red">Previous Refunded Amount : <label id="prevRefunded">0</label></td>
												<td></td>
												
											</tr>
											
											<tr>
												
												<td style="color: blue">Refundable Amount : <label id="nowRefunded">0</label></td>
												<td><button class="btn btn-xs btn-primary" onclick="setRefundable()">Pay</button></td>
											</tr>
																					
										</table>
														
														
										<div class="divide-10"></div>

										<div class="col-md-12 center bottomLine">
											<p>Final Billing</p>
										</div>
										<div class="col-md-12-1">
											
											<table>															
												<tr>
													<td><label></label></td>
													<td></td>
													
												</tr>
																									
											</table>															
											
										</div>													
													
									</div>
								</div>
								/BOX
							</div>
 -->
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

		<%@include file="footer_nobel.jsp"%>

	</section>
	<!--/PAGE -->
	
	<!------------- Modal for pay bill end---------------->
	
		
			<div class="modal fade" id="packIpd" role="dialog" >
				<div class="modal-dialog" style="width:90%">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title">Details</h4>
						</div>
						<div class="modal-body">

							<form class="form-horizontal col-md-12" style="margin-top: 0%;">
							
												<div class="col-md-12 box">

									<div class="panel panel-default"
															>
															<div class="panel-body">
																<div class="row">

															<form>

																<div class="form-group col-md-2">
																	<label for="email">Perticular:</label> <input
																		type="text" class="form-control" id="perManualPackageIpd"
																		placeholder="Enter Perticular" name="email"
																		onkeyup="autoSuggetionPackageIPD(this.id)">
																</div>
																	<div class="form-group col-md-2" style="margin-left: -1%;">
																	<label for="email">Service:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="servIdPackageIpd" name="ServNamePackageIpd" style="padding: 0px"
																		class="form-control col-md-12" onclick=""></select>
																</div>


																<div class="form-group col-md-2" style="margin-left: -1%;">
																	<label for="Doctor">Doctor:</label>
																	<!-- <div class="col-md-8"> -->
																	<select id="doctorNamePackageIpd" value='null' name="doctorNamePackageIpd"
																		class="form-control col-md-12" onchange=""></select>
																</div>
																<div class="form-group col-md-2"style="margin-left: -1%;">
																	<label for="email">Date:</label> <input type="email"
																		class="form-control" id="datePackageIpd" value="<%=current_date%>"
																		readonly="readonly" name="email">
																</div>

																<div class="form-group col-md-2"style="margin-left: -1%;">
																	<label for="email">Rate:</label> <input type="email"
																		class="form-control" id="ratePackageIpd" name="email"
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePackageForIpd()">
																</div>

																<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Qty:</label> <input type="email"
																		class="form-control" id="qtyPackageIpd" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePackageForIpd()" value="1">
																</div>

															<!-- 	<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Disc:</label> <input type="email"
																		class="form-control" id="concessionPackage" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularTotal2()">
																</div> -->

																<div class="form-group col-md-2"style="margin-left: -1%;">
																	<label for="email">Amount:</label> <input type="email"
																		class="form-control" id="amountPackageIpd" name="email" 
																		onkeyup="calculatePackageForIpd()"">
																</div>

											<!-- 					<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Pay:</label> <input type="email"
																		class="form-control" id="payPackage" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularCoPay2()">
																</div>

																<div class="form-group col-md-1"style="margin-left: -1%;">
																	<label for="email">Copay:</label> <input type="email"
																		class="form-control" id="coPayPackage" name="email" 
																		onkeypress="return validatePrice(event)"
																		onkeyup="calculatePerticularPay2()">
																</div> -->
																
																<div class="form-group col-md-1" id="divSaveEditButton"style="margin-left: -1%;">
																	<label for="email"></label> <input type="button"
																		class="form-control btn btn-primary" value="Save"
																		id="addServicePackageOT" name="email" onclick="savePackageBillingIPD('OT')">
																		
																		<input type="button"
																		class="form-control btn btn-primary" value="Save"
																		id="addServicePackage" name="email" onclick="savePackageBillingIPD('pack')">
																</div>
																
																
																

															</form>
															

														</div>
														</div>
									</div>
									
								</div>
												<!--  -->
								<div class="divide-20"></div>
								<div class="col-md-12">
									<div class="row">
										<div class="form-group col-md-12-1"
											style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
											<div class="box border blue">
												<div class="box-title">
													<h4 id="">
														<i class="fa fa-table"></i>Package Details

													</h4>
													<div class="pull-right"></div>
												</div>
												
												<div class="box-body" style="height: 320px; overflow-y: scroll; border: 1px solid #ddd;">
													<div class='col-sm-12-1' style="margin-top: 1%;">
														<table class='table table-bordered' style='width: 100%;' id='packageIpdDiv' >
															<!-- <thead class='cf' id='popupheader'>
																<tr>
                                                                 
                                                                 <th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>#</div></th>
																			
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Pack Service</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Doc Name</div></th>

																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Rate</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Qty</div></th>
																			
																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Disc</div></th>

																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Amount</div></th>
																			
																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Pay</div></th>
																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Co-Pay</div></th>
																	
																	<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Date</div></th>
																			
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Edit</div></th>
																	<th class='col-md-1-1 center' style='height: 21.5px;'><div
																			class='TextFont'>Delete</div></th>
																			<th class='col-md-2-1 center' style='height: 21.5px;'><div
																			class='TextFont'>chB</div></th>
																</tr>
															</thead> -->
															
														</table>
													</div>

													<!-- <div class='col-sm-12-1'
														style='height: 250px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

														<table class='table table-striped table-condensed cf'>
															<tbody id="packageIpdDiv" >



															</tbody>
														</table>
													</div> -->
													
                                           
											
												</div>
												
												 <div class="title col-md-12-1"
												style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; width: 100%;">
												<label
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class=""></i> Total Qty:
												</label> <label id="totalQtyPackageIPD"
													style="cursor: pointer; padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
												<label
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class="fa fa-inr"></i> Total Amount:
												</label> <label id="totalAmtPackageIPD"
													style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
													
													
													<label
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class="fa fa-inr"></i> Package Amount:
												</label> <label id="totalPackageAmountIPD"
													style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
													<label
													style="padding-top: 0px; margin-right: 5px; margin-bottom: 0px;">
													<i class="fa fa-inr"></i> Remaining Amount:
												</label> <label id="totalRemainingPackIPD"
													style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"></label>
													
													<label id="includeRemainingPack"
													style="cursor:pointer; padding-top: 0px; margin-right: 5px; margin-bottom: 0px;" onclick="includeAmountInPackipd()">
													<i class="fa fa-plus"></i> Include In Package
												</label> 
												
												<label id="convertToBillingipd"
													style="cursor:pointer; padding-top: 0px; margin-right: 5px; margin-bottom: 0px;" 
													onclick="convertToBillingipd('open',<%=request.getParameter("treatmentId")%>)">
													<i class="fa fa-plus"></i> Convert To Billing
												</label> 
											</div>
											</div>
										</div>
									</div>
								</div>

							</form>
							<!-- 	</div> -->

						</div>
						<div class="modal-footer">
							<!-- <button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button> -->
						</div>
					</div>

				</div>
			</div>
	
	
	<!------------- Modal for pay bill start---------------->
	<div id="payBill" class="modal fade" role="dialog">
	  <div class="modal-dialog">
	
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">Pay Bill</h4>
	      </div>
	      <div class="modal-body">
	        <p></p>
	        
	        <div>
	        
	        	<div class="form-group">

					<label class="control-label col-sm-4 lblBold">Total Amount :</label> <label
						class="control-label" id="patientId"> </label>
						
					<input type="text" id="totAmt" value="0">
				</div>
				
	        	<div class="form-group">

					<label class="control-label col-sm-4 lblBold">Pay Amount :</label> <label
						class="control-label" id="patientId"> </label>
						
					<input type="text" id="payNow" value="0">
				</div>
	        </div>
	        
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	
	  </div>
	</div>
	<!------------- Modal for pay bill end---------------->
	
	 <!-- convert service to package  -->

	<div class="modal fade" id="packToConv" role="dialog">
		<div class="modal-dialog" style="width: 50%">

			<!-- Modal content-->
			<div class="modal-content ">
				

					<form class="form-horizontal col-md-12" style="margin-top: 0%;">


						<div class="divide-20"></div>
						<div class="col-md-12">
							<div class="row">
								<div class="form-group col-md-12-1"
									style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
									<div class="box border blue">
										<div class="box-title">
											<h4 id="">
												<i class="fa fa-table"></i>Package Details
                                                
											</h4>
											<button type="button" class="close" data-dismiss="modal">&times;</button>
											<div class="pull-right"></div>
										</div>

										<div class="box-body" style="height: 320px;">
											<div class='col-sm-12-1' style="margin-top: 1%;">
												<table class='table table-bordered' style='width: 100%;'>
													<thead class='cf'>
														<tr>

															<th class='col-md-4-1 center' style='height: 21.5px;'><div
																	class='TextFont'>#</div></th>

															<th class='col-md-4-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Pack Name</div></th>

															
															<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Amount</div></th>
															
															<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Chk</div></th>
														</tr>
													</thead>

												</table>
											</div>

											<div class='col-sm-12-1'
												style='height: 250px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>

												<table class='table table-striped table-condensed cf'>
													<tbody id="packageDivToConvert">



													</tbody>
												</table>
											</div>



										</div>
									</div>
								</div>
							</div>
						</div>

					</form>

				<!-- </div> -->
			</div>

		</div>
	</div>

	<!-- convert service to package  -->
	
	
	
	<!-- Modal For Multiple Payments Start -->

	<!-- <div class="md-modal md-effect-11" id="modal-11" style="border-radius:10px">
		<div class="md-content">

			<div class="modal-header" style="background: #FFE0C2;height: 10px; 
					border-bottom: 1px solid orange; border-top: 1px solid orange;">
				<button type="button" style="font-size: 1.5em; color: red" 
					class="md-close close" data-dismiss="modal">&times;</button>
				<center>
					<h4 class="modal-title"><b>Multiple Payment Modes</b></h4>
				</center>
			</div>
			<div class="modal-body">

				<div class="row">
				
					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">CASH</label> 
									
							</div>
							
							<div class="form-group">
								<label for="email">Bank Name :</label> <input type="text"
									class="form-control" id="email">
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="pwd">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="cashAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							<div class="checkbox">
								<label><input type="checkbox"> Remember me</label>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>

					</div>
				
					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">CREDIT</label> 
									
							</div>
						
							<div class="form-group">
								<label for="email">Bank Name :</label> 
								<select class="form-control" id="bankIdCredit" style="width: 100%">
									
								</select>	
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="creditBNum">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="creditAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							
						</form>

					</div>

					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">CHEQUE</label> 
									
							</div>
							
							<div class="form-group">
								<label for="email">Bank Name :</label> 
								<select class="form-control" id="bankIdCheque" style="width: 100%">
									
								</select>	
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="chequeBNum">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="chequeAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							
						</form>

					</div>

					<div class="col-md-3 border">

						<form class="form-inline">
						
							<div class="form-group">
								<label for="email" style="color: red">RTGS</label> 
									
							</div>
						
							<div class="form-group">
								<label for="email">Bank Name :</label> 
								<select class="form-control" id="bankIdRtgs" style="width: 100%">
									
								</select>	
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="rtgsBNum">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="rtgsAmt" value="0" onkeyup="calMultiPayNow(this.id)">
							</div>
							
						</form>

					</div>

					<div class="col-md-3 border">

						<form class="form-inline">
							<div class="form-group">
								<label for="email">Bank Name :</label> <input type="text"
									class="form-control" id="email">
							</div>
							<div class="form-group">
								<label for="pwd">Bank Number :</label> <input type="text"
									class="form-control" id="pwd">
							</div>							
							<div class="form-group">
								<label for="pwd">Amount :</label> <input type="text"
									class="form-control" id="pwd">
							</div>
							<div class="checkbox">
								<label><input type="checkbox"> Remember me</label>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>

					</div>
				</div>

				 </div>
		      <div class="modal-footer">
		      
		      	<form class="form-inline col-md-12">
					
					<div class="form-group col-md-3">
						<label for="email">Payable:</label> 
						<input type="text"
							class="form-control" id="multiPayable" value="0" readonly="readonly">						
					</div>
					<div class="form-group col-md-3">
						<label for="pwd">Pay Now :</label> <input type="text"
							class="form-control" id="multiPayNow" value="0" readonly="readonly">
					</div>	
					
					<div class="form-group col-md-3">
						<label for="pwd">Remain :</label> <input type="text"
							class="form-control" id="multiRemain" value="0" readonly="readonly">
					</div>	
										
					<div class="form-group col-md-3">
						<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
						<button type="button" class="form-control btn btn-primary md-close" 
						onclick="setMultiPayNow()" data-dismiss="modal">Submit</button>
					</div>							
					
				</form>		      
		        
		      </div>

			</div>
		</div>
	</div> -->
	
	<div class="md-modal md-effect-11" id="modal-11"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">
				<!-- <button type="button" style="font-size: 1.5em; color: red" 
					class="md-close close" data-dismiss="modal">&times;</button> -->
				<center>
					<h4 class="modal-title">
						<b>Multiple Payment Modes</b>
					</h4>
				</center>				

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">						
							
							<div class="li pull-right" style="width: 100px">
								<button value="+" id="btnAddNew" type="button" style="margin: 7px;float: left;margin-left: 60px"
									class="btn btn-xs btn-success" onclick="toCreateTr()">+</button>
								<button value="_" id="btnDelete" type="button" style="margin: 7px;" 
									class="btn btn-xs btn-success" onclick="toRemoveTr('RowCount')">-</button>
							</div>

						</ul>
						<div class="divide-10"></div>
						
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">
											
											<div style="width: 100%;; font-weight: bold; height: 150Px;">
												
												<table border="1" class="table table-bordered table-striped table-condensed"
													id="multiPayTable">
													<thead>
														<tr>
															<th class="col-md-2-2 center">Select</th>
															<th class="col-md-2-1 center">Pay Mode</th>															
															<th class="col-md-2-1 center">Bank</th>
															<th class="col-md-2-2 center">Bank No.</th>
															<th class="col-md-2-2 center">Acc No.</th>
															<th class="col-md-2-2 center">Amount</th>
														</tr>
													</thead>
													<tbody	style="overflow-y: scroll; border: 1px solid #436a9d;" id="multiPayTbody">
																							
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

				<!-- </div> -->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-3">
							<label for="email">Payable:</label> <input type="text"
								class="form-control" id="multiPayable" value="0"
								readonly="readonly">
						</div>
						
						<div class="form-group col-md-3">
							<label for="pwd">Pay Now :</label> <input type="text"
								class="form-control" id="multiPayNow" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd">Remain :</label> <input type="text"
								class="form-control" id="multiRemain" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button" class="form-control btn btn-primary md-close"
								id="idForClose"	onclick="setMultiPayNow()" data-dismiss="modal">Submit</button>							
						</div>
						
						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							
							<button type="button" class="form-control btn btn-primary md-close"
								onclick="closePopup()" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>

	<!-- Modal For Multiple Payments End   -->
	
	
	<!--Manage Discount-->
	<!--Time click Popup modal-->

	<div style="display: none;" class="popup modal fade in" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" class="col-md-9">
				<div class="modal-header">
					<div class="box-title left">
						<h4 class="form-horizontal  col-md-4">Manage Discount</h4>
					</div>
					<div class="box-title right">
						<label style="color: green">Total Discount</label> 
						<input type="text"	readonly="readonly" class="form-horizontal  col-md-2" id="overalldisount" value="0"/>
						<button type="button" title="Close" class="close" style="color: red;"
							onclick="closeManagePopUp()" data-dismiss="modal">&times;</button>
					</div>
					
				</div>
				<div class="modal-body">
					<div id="MainTabs" class="tab-content">
						
						<div class="panel panel-default" id="hosdiscdiv">
							<div class="panel-body" style="padding: 4px">
								<form class="form-horizontal  col-md-12">
									<table class="form-horizontal  col-md-12">
										
										<tr>
											<td class="col-md-3" colspan="4"><h5>Hospital
													Discount</h5></td>
										</tr>
										<tr>
											<td class="center col-md-3">Narration</td>
											<td class="center col-md-2">Amount</td>
											<td class="center col-md-2">Payable</td>
											<td class="center col-md-2">Discount(Rs)</td>
											<td class="center col-md-2">Discount(%)</td>
											<!-- <td class="center col-md-1">Patient</td>
											<td class="center col-md-1">Sponsor</td> -->
										</tr>
										<tr>
											<td class="center col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="dNarration" /></td>
											<td class="center  col-md-2"><input id="dTotal"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="dPayable"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="dDiscount"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												onKeyup="setManagePayable('Hospital');" /></td>

											<td class="center  col-md-2"><input
												id="dDiscountInPercentage" style="text-align: right;"
												type="text" class="form-control input-SmallText TextFont"
												onKeyup="setPayableForPercentageDiscnt('Hospital');" /></td>


											<!-- <td class="center  col-md-2"><input id="disconCoPay"
												value="P" name="disc" type="radio"
												class="form-control input-SmallText TextFont" /></td>
											<td class="center  col-md-1"><input id="disconPay"
												value="S" name="disc" type="radio"
												class="form-control input-SmallText TextFont" /></td> -->
										</tr>
										<tr id="IdHeaderApprovedDisc">
											<td class="col-md-3" colspan="4" style="padding-top: 20px;"><h5>Approved
													Discount</h5></td>
										</tr>
										<tr id="idApprovedDiscountTr">
											<td class="center  col-md-3" >  Narration</td>
											<td class="center  col-md-2" > Discount</td>
											<td class="center  col-md-3" >  Date & Time</td>
										</tr>
										<tr id="idApprovedDiscountTextTr">
											<td class="center  col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="approvalDiscNarration" readonly="readonly"/></td>
											<td class="center  col-md-2"><input id="approvalDisc"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="approvalDiscDtTm"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
										</tr>
									</table>
								</form>
								
								<div class="col-md-12"
									style="margin-top: 20px; margin-left: 5px;">
									<div class="col-md-2">
										<label class=""> <input type="radio"
											style="margin-top: 0px !important;" name="disc" value="P"
											id="disconCoPay"> Patient
										</label>
									</div>
									<div class="col-md-6">
										<label class=""> <input type="radio"
											style="margin-top: 0px !important;" name="disc" value="S"
											id="disconPay"> Sponsor
										</label>
									</div>
									<div class="col-md-4">
										<button type="button" class="submitFrom btn btn-primary editUserAccess" style="margin-left: 62px"
											onclick="saveEditIPDDiscount()" disabled="disabled">Save Discount</button>
										<input type="hidden" value="save" id="discountSaveEditType">
									</div>
								</div>
								
								<button type="button" class="submitFrom btn btn-primary"
									style="margin-top: 15px; float: right;display: none;"
									onclick="saveEditIPDDiscount()">Save Discount</button>
							</div>
						</div>

						<div class="panel panel-default" id="docdiscdiv"
							style='margin-top: 4px;'>
							<div class="panel-body" style="padding: 4px">
								<form class="form-horizontal  col-md-12">
									<table class="form-horizontal  col-md-12">
										<!-- <tr class="">
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
										</tr> -->
										<tr class="">
											<td class="col-md-3-1" colspan="4"><h5>Surgeon
													Discount</h5></td>
										</tr>
										<tr class="">
											<td class="center  col-md-3">Surgeon</td>
											<td class="center  col-md-3">Narration</td>
											<td class="center  col-md-3">Amount</td>
											<td class="center  col-md-3">Payable</td>
											<td class="center  col-md-3">Discount(Rs)</td>
											<td class="center  col-md-3">Discount(%)</td>
										</tr>
										<tr class="" style="padding-top: 20px;">
											<td class="center  col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="sargonName" /></td>
											<td class="center  col-md-2"><input type="text"
												class="form-control input-SmallText TextFont"
												id="sNarration" /></td>
											<td class="center  col-md-2"><input id="sTotal"
												value="0" type="text" style="text-align: right;"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="sPayable"
												value="0" type="text" style="text-align: right;"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="sDiscount"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												onKeyup="setManagePayable('Doctor');" /></td>

											<td class="center  col-md-2"><input
												id="sDiscountInPercentage" style="text-align: right;"
												type="text" class="form-control input-SmallText TextFont"
												onKeyup="setPayableForPercentageDiscnt('Doctor');" /></td>
										</tr>
										<!-- <tr class="">
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
											<td class="center  col-md-3"></td>
										</tr> -->
										
										<tr class="" id="IdHeaderApprovedSurgeonDisc">
											<td class="col-md-3" colspan="4" style="padding-top: 20px;"><h5>Approved
													Discount</h5></td>
										</tr>
										<tr id="idApprovedSurgeonDiscountTr">
											<td class="center  col-md-3" >  Narration</td>
											<td class="center  col-md-2" > Discount</td>
											<td class="center  col-md-3" >  Date & Time</td>
										</tr>
										<tr id="idApprovedSurgeonDiscountTextTr">
											<td class="center  col-md-3"><input type="text"
												class="form-control input-SmallText TextFont"
												id="approvalSurgeonDiscNarration" readonly="readonly"/></td>
											<td class="center  col-md-2"><input id="approvalSurgeonDisc"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
											<td class="center  col-md-2"><input id="approvalSurgeonDiscDtTm"
												style="text-align: right;" type="text"
												class="form-control input-SmallText TextFont"
												readonly="readonly" /></td>
										</tr>
										
									</table>
								</form>
								<div class="col-md-12"
									style="margin-top: 20px; margin-left: 5px;">
									<div class="col-md-2">
										<label class=""> <input type="radio"
											style="margin-top: 0px !important;" name="disc" value="P"
											id="docdisconCoPay"> Patient
										</label>
									</div>
									<div class="col-md-6">
										<label class=""> <input type="radio"
											style="margin-top: 0px !important;" name="disc" value="S"
											id="docdisconPay"> Sponsor
										</label>
									</div>
									<div class="col-md-4">
										<button type="button" class="submitFrom btn btn-primary editUserAccess" style="margin-left: 62px"
											onclick="saveDoctorDiscount()" disabled="disabled">Save Discount</button>
										<input type="hidden" value="save" id="discountSaveEditType">
									</div>
								</div>
							</div>
						</div>

						<div class="panel panel-default" id="pharmadiscdiv"
							style='margin-top: 4px;'>
							<div class="panel-body" style="padding: 4px">
								<span style="font-size: 14px;">Pharmacy Discount</span>
								<div class="col-md-12"
									style="height: 110px; margin-bottom: 0px;">
									<input type="text" style="margin-bottom: 2px;float: right;"									
										readonly="readonly" class="form-horizontal  col-md-2"
										id="pharmacydiscount"/>
									<div style="height: 150px; margin-left: 0%;">
										<div
											style='width: 99%; padding: 1%; margin-top: 10px; font-weight: normal; height: 50%; overflow-y: scroll; border: 1px solid #436a9d;'>
											<div id="PharmaInfoTable"></div>

										</div>
									</div>
									<div id="PharmaInfoTableAjax" style="visibility: hidden;"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="modal-footer" style="margin-top: -35px;">
					<button type="button" class="btn btn-danger"
						data-dismiss="modal" onclick="closeManagePopUp()">Close</button>
				</div> -->
			</div>
		</div>
	</div>

	<!--/Time click Popup modal-->
	<!--/Manage Discount-->
	
	
	

	<!-- JAVASCRIPTS -->
	<!-- Placed at the end of the document so the pages load faster -->

	<!-- DATE RANGE PICKER -->
	<script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>

	<script
		src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>

	<!-- bootstrap datepicker -->
	<script src="ehat-design/datepicker/bootstrap-datepicker-by-kishor.js"></script>

	<!-- SLIMSCROLL -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/billing_select2.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- WIZARD -->

	<!-- BOOTSTRAP SWITCH -->
	<script type="text/javascript"
		src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>

	<script
		src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
	<!-- WIZARD -->
	<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<!-- BOOTBOX -->
	<script type="text/javascript"
		src="ehat-design/js/bootbox/bootbox.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
	
	<div class="md-overlay"></div>
	
	<script src="ehat-design/modal/js/classie.js"></script>
	<script src="ehat-design/modal/js/modalEffects.js"></script>
	
	<script>
		//Date picker
		$('#dob').datepicker({
			autoclose : true
		});

		$('#dob1').datepicker({
			autoclose : true
		});

		/* jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page
			App.init(); //Initialise plugins and elements
			FormWizard.init();
			
		}); */
	</script>
	<!-- /JAVASCRIPTS -->
	<input type="hidden" id="pageFromm" value=<%=request.getParameter("pageFrom")%>>
	<input type="hidden" id="preIpdId" value=<%=request.getParameter("treatcloseForIpd")%>>
	<input id="finalbillis" type="hidden" value=<%=request.getParameter("finalbillIs")%> />
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input id="SponsorsourceTypeId" type="hidden" value="" />
    <input id="chargesSlaveId" type="hidden" value="" />
    <input id="saveServiceCallFrom" type="hidden" value="N" />
    <input id="receiptSlaveIdIPD" type="hidden" value="0" />
    <input id="receiptMasterId" type="hidden" value="0" />
	<input id="recId" type="hidden" value="0" />
	<input id="callFromForSave" type="hidden" value="" />
	<input id="prevPaid" type="hidden" value="0" />
	
	<input id="chargesfromConfIpd" type="hidden" value="0" />
	<input id="defchargesfromConfIpd" type="hidden" value="0" />
	
	<input id="iscombinationIpd" type="hidden" value="N" />
	
	<input id="iscombinationsponsorIpd" type="hidden" value="N" />
	
	<input id="otherBillDetailsIdIpd" type="hidden" value="0" />
	<input id="childsubServiceIDIpd" type="hidden" value="0" />
	<input id="billDetailsIdIpd" type="hidden" value="0" />
	
	<input id="subServiceIdIpd" type="hidden" value="0" />
	<input id="servIdPackageIpd2" type="hidden" value="0" />
	
	<input id="hallTypeId" type="hidden" value="<%=request.getParameter("hallTypeId")%>"
				style="display: none;" />	
				
   <input id="ehathallTypeId" type="hidden" value="0"
				style="display: none;" />
				
    <input id="billDetailsIdIPD" type="hidden" value="0" />
    <input id="otProcedureId" type="hidden" value="0" />
    
    <input id="receiptOf" type="hidden" value="general" />	
	
	<input id="categoryidsipd" type="hidden" value="0" />
	
	<input id="ehathallidd" type="hidden" value="0" />
	<input id="hallIDD" type="hidden" value="0" />
	<input id="idHallTypee" type="hidden" value="0" />
	<input id="ehatHalltypeIdd" type="hidden" value="0" />
	
	<input id="otServId" type="hidden" value="0" />
	
	<!-- <input id="subServiceIdIPD" type="hidden" value="0" />
	<input id="servIdPackageIPD" type="hidden" value="0" /> -->
	
	<input id="ehatHallIdFromUI" type="hidden" value="0" />
	
	<input id="toDate" type="hidden" value="0" />
	
	<input id="amountpack" type="hidden" value="0" />
	
	<input id="concessionpack" type="hidden" value="0" />
	
	<input id="rategeneral" type="hidden" value="0" />
	<input id="counterIpdCghs" type="hidden" value="0" />
	<input id="editHidden" type="hidden" value=0 />
	<input id="editHiddenR" type="hidden" value=0 />
	<input id="genInvoiceFlag" type="hidden" value=0 />
	<input id="finalbill" type="hidden" value="<%=request.getParameter("finalbillIs")%>" />
	<input type="hidden" value="<%=session.getAttribute("userType")%>" id="userName" />
	<input id="bedRate" type="hidden" value=0 />
	<input id="nursingRate" type="hidden" value=0 />
	
	<!-- //tk -->
			<table id='tkt' class='table table-hover' style="display:none;">
					<tbody id="tkb">
					</tbody>
			</table>
			<table id='tktR' class='table table-hover' style="display:none;">
					<tbody id="tkbR">
					</tbody>
			</table>
	
	
</body>
</html>