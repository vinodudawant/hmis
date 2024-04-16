<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IPD Bed_Ward</title>
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
<!-- <script type="text/javascript" src="js/ehat_ipd_bed.js"></script> -->
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ipd_bed_mgt.js"></script>

<style type="text/css">

headerwidth{
width: 19%;
}

.lblBold {
	font-weight: 600;
	/* color: #518e2e; */
}

.ui-dialog {
  
  max-width: 220px;
  max-height: 220px;
  padding: 10px;
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

			<%@include file="left_menu_IPDMain.jsp"%>
			<%-- <%@include file="menu_HelpDesk.jsp"%> --%>

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

							<div class="alert alert-block alert-info fade in" style="height: 0%;">

								<div class="row">
									<div class="col-md-1">
										<img id="patImg" style="width: 100%; height: 45px"
											src="ehat-design/img/profile/avatar.jpg"
											class="img-responsive">
									</div>
	
									<div class="col-md-11">
	
										<div class="col-md-12 form-row">
	
											<div class="col-md-3" style="width: 22%">
												<div class="form-group">
													<label class="control-label lblBold" id="lblCenterPatientId">UHID
														:</label> <label class="control-label" id="patientId"
														style="display: none;"> </label> <label
														class="control-label" style="display: none" id="prnId">
													</label> <label class="control-label" id="centerPatientId">
													</label>
												</div>
											</div>
											
											<div class="col-md-5" style="width: 33%">
												<div class="form-group">
													<label class="control-label lblBold">Patient Name :</label>
													<label class="control-label" id="patientName"> </label>
	
												</div>
											</div>
											
											<div class="col-md-3" style="width: 22%">
												<div class="form-group">
													<label class="control-label lblBold">Treatment Id :</label>
													<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
													</label>
	
												</div>
											</div>
											
											<div class="col-md-3">
												<div class="form-group">
													<input type="hidden" id="deptid" value="0"> <label
														id=billipdlable class="control-label lblBold">Ipd
														No :</label> <label class="control-label" id="ipdNo">
														IPD/00002017/553-D</label>
												</div>
											</div>
											
											<div class="col-md-3" style="width: 22%">
												<div class="form-group">
													<label class="control-label lblBold">Age :</label> <label
														class="control-label" id="age"> </label>
												</div>
											</div>
											
											<div class="col-md-5" style="width: 33%">
												<div class="form-group">
													<label class="control-label lblBold">Ref Dr:</label> <label
														id="refDoctor" class="control-label"></label>
												</div>
											</div>
											
											<div class="col-md-3" style="width: 22%">
												<div class="form-group">
													<label class="control-label lblBold">Gender :</label> <label
														class="control-label" id="sex"> Male(D) </label>
	
												</div>
											</div>
											
											<div class="col-md-3">
												<div class="form-group">
													<label class="control-label lblBold">Bill No : </label> <label
														class="control-label" id="consultingDoctor"
														style="display: none;">Vinod-D</label> <label
														class="control-label" id="preBillId">0</label>
												</div>
											</div>
											
											<div class="col-md-3"  style="display: none;">
												<div class="form-group">
													<label class="control-label lblBold">Ref.BNo: </label> <label
														class="control-label" id="billNo">01-D</label>
	
												</div>
											</div>
											
										</div>
										
										<div class="col-md-12 form-row">
											
											<div class="col-md-3" style="width: 22%">
												<div class="form-group">
													<label class="control-label lblBold">DOA:</label> <label
														class="control-label" id="doa"> 2017-05-12-D</label>
	
												</div>
											</div>
											
											<div class="col-md-5" style="width: 33%">
												<div class="form-group">
													<label class="control-label lblBold">Consulting Dr:</label>
													<label id="consultingDoctorr" class="control-label"></label>
												</div>
											</div>
											
											<div class="col-md-3" style="width: 22%">
												<div class="form-group">
													<label class="control-label lblBold">Bill Category :</label>
													<label class="control-label" id="billCategoty"> </label>
	
												</div>
											</div>
											
											<div class="col-md-3">
												<div class="form-group">
													<label class="control-label lblBold">DOD :</label> <label
														class="control-label" id="dod"></label>
	
												</div>
											</div>
											
										</div>
										<div class="col-md-12 form-row">
											
											<div class="col-md-3" style="width: 22%">
												<div class="form-group">
													<label class="control-label lblBold">Hall Name :</label>
													<label class="control-label" id="hallName"> </label>
	
												</div>
											</div>	
											
											<div class="col-md-5" style="width: 33%">
												<div class="form-group">
													<label class="control-label lblBold">Corporate :</label> <label
														class="control-label" id="corporate"> </label>
	
												</div>
											</div>
											
										</div>
										<div class="col-md-12 form-row">
											
											
											<div class="col-md-3 hide">
												<div class="form-group">
													<input type="hidden" id="uId" value="<%=session.getAttribute("uId")%>" /> 
													<input type="hidden" id="prePostPaid" value="0" />
													<input type="hidden" id="customerType" value="0" /> 
													<input type="hidden" id="customerId" value="0" />
													<input type="hidden" id="businessType" value="2" />
													<input type="hidden" id="registeredAt" value="other" />
													<input type="hidden" id="depdocdeskid" value="0" />
													<input type="hidden" id="sourceTypeId" value="0" /> 
													<input type="hidden" id="subserviceid" value="0" /> 
													<input type="hidden" id="pId" value="0" /> 
													<input type="hidden" id="tId" value="0" />
													<input type="hidden" id="bNo" value="0" /> 
													<input type="hidden" id="bNo" value="0" /> 
													<input type="hidden" id="serviceid" value="0" /> 
													<input type="hidden" id="editPerticularType" value="0" /> 
													<input type="hidden" id="editPerticularId" value="0" /> 
													<input type="hidden" id="treatId" value=<%=request.getParameter("treatmentId")%> /> 
													<input type="hidden" id="generalId" value="0" />
													<input type="hidden" id="pHeight" value="0" />
													<input type="hidden" id="pWeight" value="0" />
													<input type="hidden" id="uvCount" value="0" />
													<input type="hidden" id="lmpDate" value="" />
													<input type="hidden" id="mobileNo" value="0" />
													<input type="hidden" id="hallTypeId" value="0" />
													<input type="hidden" id="hallId" value="0" />
													<input type="hidden" id="bedId" value="0" />
													<input type="hidden" id="treatBedsId" value="0" />
													<!-- <input type="hidden" id = "depdocdeskid" value = "0" /> -->
													<%-- <input type="hidden" id = "patientId" value = <%=request.getParameter("patientId")%> /> --%>
												</div>
											</div>
											
										</div>
										
									</div>
								</div>
							</div>
						
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<!-- <div class="col-md-5">
													<div class="row">
														<div class="form-group">
		
															<div class="col-md-5">
																<select name="listmstr" id="listmstr_select_Hall"  class="col-md-12"
																	onchange="setDyanamicDivForCharges2('dynamicItems2',this.id)">
																	<option id="firstElmts2">--- Select Ward Type ---</option>
																</select>
															</div>
														
															<div class="col-md-7 select2-container select2-container-multi ">
																<ul id="dynamicItems2" class="select2-choices"	style="overflow-y: scroll;height: 40px"></ul>
															</div>
														
														</div>
													</div>
												</div> -->
													
												<div class="form-group col-md-3">
													<label>Select Ward Type:</label> <select
														name='listmstr' class="input-group" id="wardTypeHall"
														style='width: 100%' onchange="getWardTypeList()">
														<option value="0">----Ward Type----</option>
													</select>
												</div>

												<div class="form-group col-md-3">
													<label>Select Ward Name:</label> <select
														name='listmstr' class="input-group" id="wardName"
														style='width: 100%' onchange="getPatientBedDetails(<%=request.getParameter("callFrom")%>)">
														<option value="0">-- Ward Name --</option>
													</select>
												</div>

												<div class="form-group col-md-3">
													<label for="">Select View :</label>
													<select class="input-group"
														id="viewInfo" style='width: 100%' onchange="getPatientBedDetails(<%=request.getParameter("callFrom")%>)">														
														<option value="1">Graphical View</option>
														<option value="2">List View</option>
													</select>
												</div>
												
												<div class="form-group col-md-4">
													<table>
														<tr>
															<td class="col-md-2">
																<label style="color: red">Total :</label> 
																<label id="totalBeds">0</label>
															</td>
															<td class="col-md-2">
																<label style="color: red">Allocated :</label> 
																<label id="allocatesBeds">0</label>
															</td>
														</tr>
														
														<tr>
															<td class="col-md-2">
																<label style="color: red">Available :</label> 
																<label id="AvailableBeds">0</label>
															</td>
															<td class="col-md-2">
																<label style="color: red">Cleaning :</label> 
																<label id="cleaningBeds">0</label>
															</td>
														</tr>
													</table>
												</div>
												
												<div class="form-group col-md-1">
													<label style="color: Blue">Isolation</label> 
													<input type="checkbox" id="chkIsolation" value="0"/>
												</div>

												<div class="row">
													<div class="col-md-12" id="graPicalBedInfo">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Grapical Info</div>
															<div id="allbeds" style="overflow-x: scroll; max-width: auto; height: 390px;"></div>
														</div>
													</div>

													<div class="col-md-12" id="listBedInfo" style="display: none">
														<div class="panel panel-primary"
															style="margin-top: 20px">
															<div class="panel-heading" id="divEhatContent">List View Info
																</div>
															<div class="panel-body"
																style="overflow: auto; height: 300px">
																<table id="ehatTable"
																	class="datatable table table-striped table-bordered">
																	<thead id="ehatTHead">
																		<tr>
																			<th class='col-md-1 center'>#</th>
																			<th class='col-md-1 center'>Ward</th>
																			<th class='col-md-1 center'>Bed No.</th>
																			<th class='col-md-1 center'>Status</th>
																			<th class='col-md-1 center'>Patient Name</th>
																			<th class='col-md-1 center'>MR No.</th>
																			<th class='col-md-1 center'>Age / Gender</th>
																			<th class='col-md-1 center'>Bed Alloc. Date</th>
																			<th class='col-md-1 center'>Discharge Date</th>
																			<th class='col-md-1 center'>Pay Type</th>
																			<th class='col-md-1 center'>Action</th>
																		</tr>
																	</thead>

																	<tbody id="allbedsListViewTemp">
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													
													<div class="modal fade" id="bedAllocationPopUp" style="margin-top: 90px" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
													  <div class="modal-dialog modal-dialog-centered" role="document">
													    <div class="modal-content">
													      <div class="modal-header">
													        <h4 class="modal-title" id="exampleModalLongTitle">Billable Bed Tariff</h4>
													        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
													          <span aria-hidden="true">&times;</span>
													        </button>
													        <input id="bedIDPop" type="hidden">
															<input id="htPop" type="hidden"> 
															<input id="patientTypePop" type="hidden">
													        
													      </div>
													      <div class="modal-body">
													       	<form class="form-horizontal row">
																<!--Panel Body-->
																<div class="form-group col-md-6" style="text-align: center;">
																	<label> 
																		<input onclick="allocateBed()" name="radBillableBed"
																		type="radio" id="radBillableBed1" value="sameBed"> Selected Bed
																	</label>
																</div>
																<div class="form-group col-md-6" style="text-align: center;">
																	<label> 
																		<input onclick="setBillableBed()" name="radBillableBed"
																		type="radio" id="radBillableBed2" value="differentBed"> Select Bed Type
																	</label>
																</div>
																
																<div id="divWardType" class="col-md-12" style="display: none;margin-left: 40px">
																	<div class="divide-20"></div>
																	<div class="form-group col-md-5">
																		<label>Select Ward Type:</label> <select
																			name='listmstr' class="input-group" id="wardTypeSelectIDBB"
																			style='width: 80%' onchange="getWardTypeListForBillableBed()">
																			<option value="0">----Ward Type----</option>
																		</select>
																	</div>
					
																	<div class="form-group col-md-5">
																		<label>Select Ward Name:</label> <select
																			name='listmstr' class="input-group" id="hallTypeSelectIDBB"
																			style='width: 80%' onchange="getBillableBedCharges()">
																			<option value="0">-- Ward Name --</option>
																		</select>
																	</div>
																
																	<!-- <div class="form-group col-md-2">
																		<label class='TextFont'>Ward Type</label>
																	</div>
																	<div id="wardTypeSelectIDBB"
																		class="form-group col-md-4"
																		style="padding: 0px 5px;"></div>

																	<div class="col-md-4" style="padding-top: 9px;">
																		<div class="form-group col-md-3">
																			<label class='TextFont'>Hall</label>
																		</div>
																		<div class="form-group col-md-9">
																			<select id="hallTypeSelectIDBB"
																				class="form-control input-SmallText">
																			</select>
																		</div>
																	</div> -->
																	<div class="form-group col-md-2" style="text-align: center;">
																		<button type="button" class="btn btn-primary"
																			onclick="allocateBed('billableBed')"
																			style="line-height: 0.6;margin-top: 15px">
																			<i class="fa fa-save"></i> Save
																		</button>
																	</div>
																	
																</div>
	
															</form>
													      </div>
													      <div class="modal-footer">
													        <button type="button" class="btn btn-secondary" onclick="closebedAllocationPopUp()" data-dismiss="modal">Close</button>
													        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
													      </div>
													    </div>
													  </div>
													<!-- </div> -->
													
													<!--Billable bed popup -->
													<!-- <div id="bedAllocationPopUp1" class="popup modal fade in"
														tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
														<div class="modal-dialog col-md-6">
															<div class="modal-content">
		
																<div class="modal-header">
																	<div class="box-title col-md-6">
																		<h4>Billable Bed Tariff</h4>
																	</div>
																	<div class="col-md-6">
																		<button type="button" class="btn btn-xs btn-danger exit pull-right"
																			data-dismiss="modal" onclick="closebedAllocationPopUp()">
																			<i class="fa fa-arrows"></i> Close
																		</button>
																		<input id="bedIDPop" type="hidden">
																		<input id="htPop" type="hidden"> 
																		<input id="patientTypePop" type="hidden">
																	</div>
																</div>
		
																<div class="modal-body">
																	<div class="col-md-12">
																		<form class="form-horizontal col-md-12">
																			Panel Body
																			<div class="form-group col-md-6">
																				<label class="checkbox-inline input-SmallText"> 
																					<input onclick="allocateBed()" name="radBillableBed"
																					type="radio" id="radBillableBed1" value="sameBed">Selected Bed
																				</label>
																			</div>
																			<div class="form-group col-md-6">
																				<label class="checkbox-inline input-SmallText"> 
																					<input onclick="setBillableBed()" name="radBillableBed"
																					type="radio" id="radBillableBed2" value="differentBed"> Select Bed Type
																				</label>
																			</div>
		
																		</form>
																	</div>
																	/BOX
																</div>
																/BODY
																
																<div class="modal-footer">
																	<div class="divide-20">
																</div>
																
															</div>
														</div>
														</div>
													</div> -->
													<!--/Billable bed popup -->

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
		<!-- <script src="js/demoConfiguration2.js"></script> -->
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
			getIpdPatientHeaderInfo(<%=request.getParameter("treatId")%>);

			var callFromVal = <%=callFromBed%>;
			getWardTypeList();
			
			if(callFromVal == "shiftBed"){

				getPatientBedDetails(callFromVal);
				var hallTypeId = $("#hallTypeId").val();
				var hallId = $("#hallId").val();
				
				$("#wardTypeHall").select2('val',hallTypeId);
				getWardTypeList();
				$("#wardName").select2('val',hallId);
			}else{
				
				$("#wardTypeHall").val($('#wardTypeHall option:eq(1)').val()).trigger('change');
				$("#wardName").val($('#wardName option:eq(1)').val()).trigger('change');
			}
			
			getAdminChargesIpdForBed();
		});
	</script>
		<input type="hidden"  id="pt_Id" value="<%=request.getParameter("pid")%>">
		<input type="hidden"  id="tr_Id" value="<%=request.getParameter("treatId")%>">
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
		
		<div id="divBillableBedChargesHiddenFields">
		</div>		
		<%
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int servId = Integer.parseInt(resourceBundle.getObject("adminServId").toString());
			int subServId = Integer.parseInt(resourceBundle.getObject("adminSubServId").toString());
		%>
		<input type="hidden" id="adminServId" value=<%=servId%>>	
		<input type="hidden" id="adminSubServId" value=<%=subServId%>>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>