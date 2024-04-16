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
<!-- <script type="text/javascript" src="js/ipd_bed_mgt.js"></script> -->
<script type="text/javascript" src="js/ipd_bed_MIS.js"></script>

<style type="text/css">

headerwidth{
width: 19%;
}

.lblBold {
	font-weight: 600;
	/* color: #518e2e; */
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

			<%@include file="menu_HelpDesk.jsp"%>

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
														style='width: 100%' onchange="getWardTypeList(1)">
														<option value="0">----Ward Type----</option>
													</select>
												</div>

												<div class="form-group col-md-3">
													<label>Select Ward Name:</label> <select
														name='listmstr' class="input-group" id="wardName"
														style='width: 100%' onchange="getPatientBedDetails()">
														<option value="0">-- Ward Name --</option>
													</select>
												</div>

												<div class="form-group col-md-3">
													<label for="">Select View :</label>
													<select class="input-group"
														id="viewInfo" style='width: 100%' onchange="getPatientBedDetails(this.value);">
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
		

			var callFromVal = <%=callFromBed%>;
			getWardTypeList();
			getPatientBedDetails('onload');
			
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
			
		//	getAdminChargesIpdForBed();
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