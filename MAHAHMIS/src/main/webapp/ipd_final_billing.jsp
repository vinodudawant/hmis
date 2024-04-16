<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Ipd Final Bill</title>
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
 <script type="text/javascript" src="js/ehat_ipd_bed.js"></script> 
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ipd_bed_mgt.js"></script>
<!-- <script type="text/javascript" src="js/ehat_physical_discharge.js"></script> -->
<script type="text/javascript" src="js/ehat_ipdbill.js"></script>
<script type="text/javascript" src="js/ipd_genfinal_bill.js"></script>
<script type="text/javascript" src="js/patient_search.js"></script>

<style type="text/css">

headerwidth{
width: 19%;
}
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a
												href="ehat_IPD_BedWardDashBoard.jsp">IPD Queue</a></li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
								
									<div>
										<ul class="nav nav-tabs">
											<li class="activeLink active"><a data-toggle="tab" href="#General" id="ipdfinalbillpat" onclick="getIpdBillPatientsFinalBillNew('onload',0,'1');"
												id="generalTab">Final Patients</a></li>
											<li class="activeLink1 "><a data-toggle="tab" href="#physalDischarge" id="ipdfinalphydispat" onclick="getIpdBillFinalBillPhyDis('onload',0,'1');">
													Physical Discharge Patients	</a></li>
											
										</ul>
									</div>
								
									<div class="tab-content">
										<div class="tab-pane fade in active" id="General">
											<div class="panel panel-default">
												<div class="panel-body">
		
													<div class="row">
														<div class="col-md-12">
														
															<div style="font-weight: bold;" class="col-md-1">Search	By:</div>
															<div class="col-md-2">
																<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
																	<option value="1">UHID</option>
																	<option value="5">Legacy UHID</option>
																	<option value="2">Patient Name</option>
																	<option value="3">Patient Mobile</option>
																	<!-- <option value="4">Patient AddharNo</option> -->
																</select>
															</div>
						
															<!-- <div style="" class="col-md-2 TextFont" id="divbyName">
																<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
																	onkeyup="getHitOnEnterFinalBill(this.id,event)" autocomplete="off"/>
															</div> -->
															
															 <div style="" class="col-md-2 TextFont" id="divbyName">
																<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
																	onkeyup="getIPDFinalAutoDetails(this.id,event)" autocomplete="off"/>
															</div>
															
															<div class="form-group col-md-3">
																<select	name='listmstr' class="input-group" id="wardTypeHall"
																	style='width: 100%' onchange="getWardTypeList()">
																	<option value="0">----Ward Type----</option>
																</select>
															</div>
		
															<div class="form-group col-md-3">
		
																 <select name='listmstr' class="input-group" id="wardName"
																	style='width: 100%' onchange="getIpdBillPatientsFinalBillNew('onload',0,'1')">
																	<option value="0">-- Ward Name --</option>
																</select>
		
															</div>
		
														</div>
		
														
														<div class="row">
															
															<div class="col-md-12">

																<div class="divide-20"></div>
																<div class="panel panel-default">
																	<div class="panel-body" id="ipdBillPatients" style='overflow-y: scroll; height: 430px; max-height: auto;'>
																		<!-- <table class='table table-condensed cf '
																			style="width: 1090px;">
																			<thead class='cf'>
																				<tr>
																					<th class='col-md-1-1'><label class='TextFont'>#</label></th>
																					<th class='col-md-4-1' style="padding-left: 10px;"><label
																						class='TextFont' style="padding-left: 10px;">Patient
																							Name</label></th>
																					<th class='col-md-1-1'><label class='TextFont'
																						style="padding-left: 10px;">Patient ID</label></th>
																					<th class='col-md-1-1'><label class='TextFont'
																						style="padding-left: 10px;">Admission No</label></th>
																					<th class='col-md-1-1' style="padding-left: 28px;"><label
																						class='TextFont'>View Bill</label></th>
																				</tr>
																			</thead>
																		</table> -->
																		<!-- <div id="BillContainer" class='col-sm-12-1'
																			style="overflow-y: scroll; height: 425px; maxheight: auto; margin-top: -22px; border: 1px solid #ddd;">
																		</div> -->
																	</div>

																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									
									
										<div class="tab-pane fade" id="physalDischarge">
											<div class="panel panel-default">
												<div class="panel-body">
		
													<div class="row">
														<div class="col-md-12">
														
															<div style="font-weight: bold;" class="col-md-1">Search	By:</div>
															<div class="col-md-2">
																<select id="patSearchType11" class="form-control input-SmallText" onchange="setPatientSearchType11()">
																	<option value="1">UHID</option>
																	<option value="2">Patient Name</option>
																	<option value="3">Patient Mobile</option>
																	<!-- <option value="4">Patient AddharNo</option> -->
																</select>
															</div>
						
															<div style="" class="col-md-2 TextFont" id="divbyName">
																<input name="byName" type="text" id="byName1" class="typeahead form-control input-SmallText"
																	onkeyup="FinalBillPhyDisPatients(this.id,event)" />
															</div>
															
															<div class="form-group col-md-3">
																<select	name='listmstr' class="input-group" id="wardTypeHall1"
																	style='width: 100%' onchange="getWardTypeListForPhyDischarge()">
																	<option value="0">----Ward Type----</option>
																</select>
															</div>
		
															<div class="form-group col-md-3">
		
																 <select name='listmstr' class="input-group" id="wardName1"
																	style='width: 100%' onchange="getIpdBillFinalBillPhyDis('onload',0,'1')">
																	<option value="0">-- Ward Name --</option>
																</select>
		
															</div>
		
														</div>
		
														
														<div class="row">
															
															<div class="col-md-12" id="listBedInfo">
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">Final Ipd Queue
																		</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 450px">
																		<table id="ehatTable"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<!-- <tr>
																					<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>
																					<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>
																					<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Sponsor Name</label></th>
																					<th class='col-md-1-1  hidden' ><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>
																					<th class='col-md-1-1 ' style='' ><label id='thCenterPatientId' class='TextFont' style='padding-left: 20px;' >Patient ID</label></th>
																					<th class='col-md-2-1 ' style=''><label class='TextFont' style='padding-left: 20px;'>Mobile No</label></th>
																					<th class='col-md-2-1 ' style=''><label class='TextFont' style='padding-left: 20px;'>MRN No</label></th>
																					<th class='col-md-2-1 left' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>
																					<th class='col-md-2-1 right' style=''><label class='TextFont' style='padding-left: 20px;'>View Bill</label></th>
																					<th class='col-md-2-1 right' style=''><label class='TextFont' style='padding-left: 20px;'>Prints</label></th>
																				</tr> -->
																			</thead>
		
																			<tbody id="ipdBill">
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
									    <div class="pull-right">
											<ul class="pagination" id="opdpagenation"></ul>
										</div>
										<div class="col-md-4 col-md-offset-8">
											<div class="pull-right">
												<ul class="pagination pagination-blue margin-bottom-10"
													id="totalNumberOfPagesOpd"></ul>
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

		<script src="login/vendor/daterangepicker/moment.js"></script>
		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<!-- <script src="js/demoConfiguration2.js"></script> -->
		<!-- <script type="text/javascript" src="js/IpdQueue.js"></script> -->
		<script type="text/javascript" src="js/ehat_ipdbill.js"></script>
		<script type="text/javascript" src="js/ipd_genfinal_bill.js"></script>
		
		<!-- CUSTOM SCRIPT -->
		
		<%
			String callFromBed = request.getParameter("callFrom");
			if(callFromBed == null){
				callFromBed = "onload";
			}
		%>

		<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#wardTypeHall").select2();
			$("#wardName").select2();
			$("#ipdView").select2();
			$("#viewInfo").select2();
			$("#libillipd").addClass("anchorActive");

			$("#wardTypeHall1").select2();
			$("#wardName1").select2();

			setPatientSearchType11();
			getWardTypeList();
		//	getIpdBillPatients("onload",0);
			setPatientSearchType();
		//	setAutoPatientName("byName", "onload", "IPD_Bill_PatientDatabase");
			getIpdBillPatientsFinalBillNew("onload",0,'1');
			getWardTypeListForPhyDischarge();
			//getBedAva('allBed');
		});
	</script>
		<input type="hidden" id=stateId value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="BedAllocStatus" value="new" />
		<input type="hidden" id="DallocBedId" value="0"	/>
		<input type="hidden" id="chargesSlaveId" value="0">
		
		<input type="hidden" id="normalBedCharges" value="0">	
		<input type="hidden" id="isolationBedCharges" value="0">	
		<input type="hidden" id="normalNursingCharges" value="0">	
		<input type="hidden" id="isolationNursingCharges" value="0">
		
		<input type="hidden" id="sponsorBedCharges"	value="0">	
		<input type="hidden" id="sponsorIsolationBedCharges" value="0">	
		<input type="hidden" id="sponsorNursingCharges"	value="0">	
		<input type="hidden" id="sponsorIsolationNursingCharges" value="0">
		<input type="hidden" id="isBedAllocationScreen"	value="Y">	
		<input type="hidden" id="adminChargesIpd" value="0">	
		
		<%
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int servId = Integer.parseInt(resourceBundle.getObject("adminServId").toString());
			int subServId = Integer.parseInt(resourceBundle.getObject("adminSubServId").toString());
		%>
		<input type="hidden" id="adminServId" value=<%=servId%>>	
		<input type="hidden" id="adminSubServId" value=<%=subServId%>>
		<input id="hallDetailDiv" type="hidden" /> <input id="allBedObj" type="hidden" />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>