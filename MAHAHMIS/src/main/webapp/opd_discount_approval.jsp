<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>OPD Discount Approval</title>
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
<!-- <script type="text/javascript" src="js/ehat_ipd_queue.js"></script> -->
<script type="text/javascript" src="js/ehat_billing.js"></script>
<!-- <script type="text/javascript" src="js/ehat_ipdbill1.js"></script> -->

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
									<div class="page-header">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="opd_discount_approval.jsp">Discount Approval</a></li>

										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
							
							<div class="row">
							<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="box border">
										<div class="box-title">
											<h4>
												<i class="fa fa-colum"></i> <span
													class="hidden-inline-mobi"></span>
											</h4>
										</div>
										<div class="box-body">
											<div class="tabbable header-tabs">
												<ul class="nav nav-tabs">
													<li class="ehatList" style="float: left;" id="subChrgsMaster" onclick="fetchOpdbilDiscount('Hospital');"><a data-toggle="tab" href="#Hospital_Discount"><i
														class="fa fa-bookmark"></i> <span class="hidden-inline-mobile">Hospital Discount</span>
														<!-- <span class="badge badge-blue font-11" id="hospCount"> 0</span> -->
														</a>
													</li>
													
													<li class="ehatList" style="float: left;" id="chrgsMaster" onclick="fetchOpdbilDiscount('ApprovedDiscount');"><a data-toggle="tab" href="#Approved_Discount"><i
														class="fa fa-bookmark"></i> <span class="hidden-inline-mobile">Approved Discount</span>
														<!-- <span class="badge badge-blue font-11" id="surgnCount"> 0</span> -->
														</a>
													</li>
											
													<!-- <li class="ehatList" style="float: left;" id="chrgsMaster" onclick="fetchIpdbilDiscount('Surgeon');"><a data-toggle="tab" href="#Surgeon_Discount"><i
														class="fa fa-bookmark"></i> <span class="hidden-inline-mobile">Surgeon Discount</span>
														<span class="badge badge-blue font-11" id="surgnCount"> 0</span>
														</a>
													</li> -->
												</ul>
												
												<div class="tab-content">
													<div id="Hospital_Discount" class="tab-pane fade in active">
														<div class="panel-default">
															
															<div class="col-md-12">
																<div class="col-md-1"><label>Search By:</label></div>
																
																<div id="divbyName" class="col-md-2 TextFont">
																	<input type="text" onkeyup="autosuggesstionDiscApprovelOPD(this.id,'Hospital')" id="byName" name="byName" 
																	class="typeahead form-control input-SmallText ui-autocomplete-input" autocomplete="off">
																</div>
																
																<div class="col-md-1" style="text-align: center;">
																	<input type="button" value="search"	class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
																		onclick="autosuggesstionDiscApprovelOPD(this.id,'Hospital')" />
																</div>
															</div>
															
															<div class="panel-body" style="overflow-y: auto; height: 425px; maxheight: auto;">
																<table class='table table-bordered'>
																	<thead class='cf' style="background: #dbdbdb;border: 1px solid #c4c4c4">
																		<tr>
																			<th class='col-md-1'><label class='TextFont'>#</label></th>
																			<th class='col-md-2'><label class='TextFont'>Patient Name</label></th>
																			<th class='col-md-1 hidden'><label class='TextFont' >Patient ID</label></th>													
																			<th class='col-md-1'><label class='TextFont' id="thCenterPatientId">Patient ID</label></th>
																			<!-- <th class='col-md-1-1'><label class='TextFont'>Admission No</label></th> -->
																			<!-- <th class='col-md-2-1'><label class='TextFont'>Hall Name (ward)</label></th> -->
																			<th class='col-md-1'><label class='TextFont'>Total Payable</label></th>
																			<th class='col-md-1'><label class='TextFont'>Discount</label></th>
																			<th class='col-md-1'><label class='TextFont'>Approved</label></th>
																			<th class='col-md-1'><label class='TextFont'>Remark</label></th>
																			<!-- <th class='col-md-1'><label class='TextFont'>Authorized by</label></th> -->
																			<th class='col-md-1'><label class='TextFont'>Requested by</label></th>
																			<th class='col-md-1'><label class='TextFont'>Comment</label></th>
																			<th class='col-md-2 center'><label class='TextFont'>Action</label></th>
																		</tr>
																	</thead>
																	
																	<tbody id="BillContainer">
																	
																	</tbody>
																	
																</table>
															</div>
														</div>
													</div>
													
													<div id="Approved_Discount" class="tab-pane fade in">
														<div class="panel-default">
															
															<div class="col-md-12">
																<div class="col-md-1"><label>Search By:</label></div>
																
																<div id="divbyName" class="col-md-2 TextFont">
																	<input type="text" onkeyup="autosuggesstionDiscApprovedOPD(this.id,'ApprovedDiscount')" id="byName2" name="byName2" 
																	class="typeahead form-control input-SmallText ui-autocomplete-input" autocomplete="off">
																</div>
																
																<div class="col-md-1" style="text-align: center;">
																	<input type="button" value="search"	class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
																		onclick="autosuggesstionDiscApprovelOPD(this.id,'ApprovedDiscount')" />
																</div>
															</div>
															
															<div class="panel-body" style="overflow-y: auto; height: 425px; maxheight: auto;">
																<table class='table table-bordered'>
																	<thead class='cf' style="background: #dbdbdb;border: 1px solid #c4c4c4">
																		<tr>
																			<th class='col-md-1'><label class='TextFont'>#</label></th>
																			<th class='col-md-2'><label class='TextFont'>Patient Name</label></th>
																			<th class='col-md-1 hidden'><label class='TextFont' >Patient ID</label></th>													
																			<th class='col-md-1'><label class='TextFont' id="thCenterPatientId">Patient ID</label></th>
																			<!-- <th class='col-md-1-1'><label class='TextFont'>Admission No</label></th> -->
																			<!-- <th class='col-md-2-1'><label class='TextFont'>Hall Name (ward)</label></th> -->
																			<th class='col-md-1'><label class='TextFont'>Total Payable</label></th>
																			<th class='col-md-1'><label class='TextFont'>Discount</label></th>
																			<th class='col-md-1'><label class='TextFont'>Approved</label></th>
																			<th class='col-md-1'><label class='TextFont'>Remark</label></th>
																			<!-- <th class='col-md-1'><label class='TextFont'>Authorized by</label></th> -->
																			<th class='col-md-1'><label class='TextFont'>Requested by</label></th>
																			<th class='col-md-1'><label class='TextFont'>Comment</label></th>
																			<!-- <th class='col-md-2 center'><label class='TextFont'>Action</label></th> -->
																		</tr>
																	</thead>
																	
																	<tbody id="ApprovedDiscountBill">
																	
																	</tbody>
																	
																</table>
															</div>
														</div>
													</div>
													
													<div id="Surgeon_Discount" class="tab-pane fade in">
														<div class="panel-default">
															
															<div class="col-md-12">
																<div class="col-md-1"><label>Search By:</label></div>
																
																<div id="divbyName" class="col-md-2 TextFont">
																	<input type="text" onkeyup="autosuggesstionDiscApprovel(this.id,'auto')" id="byName" name="byName" 
																	class="typeahead form-control input-SmallText ui-autocomplete-input" autocomplete="off">
																</div>
																
																<div class="col-md-1" style="text-align: center;">
																	<input type="button" value="search"	class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
																		onclick="discountApprovalSearch('search','Hospital')" />
																</div>
															</div>
															
															<div class="panel-body" style="overflow-y: auto; height: 425px; maxheight: auto;">
																<table class='table table-bordered'>
																	<thead class='cf' style="background: #dbdbdb;border: 1px solid #c4c4c4">
																		<tr>
																			<th class='col-md-1'><label class='TextFont'>#</label></th>
																			<th class='col-md-2'><label class='TextFont'>Patient Name</label></th>
																			<th class='col-md-1 hidden'><label class='TextFont' >Patient ID</label></th>													
																			<th class='col-md-1'><label class='TextFont' id="thCenterPatientId">UHID</label></th>
																			<!-- <th class='col-md-1-1'><label class='TextFont'>Admission No</label></th> -->
																			<!-- <th class='col-md-2-1'><label class='TextFont'>Hall Name (ward)</label></th> -->
																			<th class='col-md-1'><label class='TextFont'>Total Payable</label></th>
																			<th class='col-md-1'><label class='TextFont'>Discount</label></th>
																			<th class='col-md-1'><label class='TextFont'>Approved</label></th>
																			<th class='col-md-1'><label class='TextFont'>Remark</label></th>
																			<th class='col-md-1'><label class='TextFont'>Requested by</label></th>
																			<th class='col-md-1'><label class='TextFont'>Comment</label></th>
																			<th class='col-md-2 center'><label class='TextFont'>Action</label></th>
																		</tr>
																	</thead>
																	
																	<tbody id="BillContainerSurgeon">
																	
																	</tbody>
																	
																</table>
															</div>
														</div>
													</div>
													
													<!-- Start Code for Surgeon_Discount GUI -->
														<!-- <div id="Surgeon_Discount" class="tab-pane fade in">
															<div class="divide-20"></div>
														
														<div class="col-md-12-1">
														<div style="font-weight: bold;" class="col-md-1">Search
															By:</div>
														<div class="col-md-1-1">
															<label class="TextFont"
																style="margin-left: 10%; margin-top: 3%;">Patient
																Name:</label>
														</div>
					
														<div style="" class="col-md-2-1 TextFont" id="divbyNameSearchForSurgeon">
															<input name="byNameSearchForSurgeon" type="text" id="byNameSearchForSurgeon"
																class="form-control input-SmallText"
																onkeypress="return SearchPatientNameOnEnter(event,'Surgeon')" />
														</div>
														<div class="col-md-1-1" style="margin-left: 0%;">
															<label class="TextFont"
																style="margin-left: 30%; margin-top: 3%;">Patient ID:</label>
														</div>
					
														<div style="padding-left: 0%;" class="col-md-2-1 ">
															<input name="byIdForSurgeon" type="text" id="byIdSearchForSurgeon"
																class="form-control input-SmallText"
																onkeypress="return SearchPatientIdOnEnter(event,'Surgeon')" />
														</div>
														<div class="col-md-1-1" style="text-align: center;">
															<input type="button" value="search"
																class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
																onclick="discountApprovalSearch('search' , 'Surgeon')" />
														</div>
													</div>
					
													<div class="divide-20"></div>
													<div class="panel panel-default">
														<div class="panel-body">
															<table class='table table-condensed cf table-bordered'
																style="background: #E0FFFF;">
																<thead class='cf'>
																	<tr>
																		<th class='col-md-1-1' style="width: 5%;"><label class='TextFont'>#</label></th>
																		<th class='col-md-2-1'><label class='TextFont'>Patient Name</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Patient ID</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Admission No</label></th>
																		<th class='col-md-2-1'><label class='TextFont' >Hall Name (ward)</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Total Payable</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Discount</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Approved Discount</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Remark</label></th>
																		<th class='col-md-2-1 center'><label class='TextFont'>Action</label></th>
																	</tr>
																</thead>
															</table>
															<div id="BillContainerForSurgeon" class='col-sm-12-1'
																style="overflow-y: auto;  maxheight: auto; margin-top: -22px; border: 1px solid #ddd;">
															</div>
														</div>
													</div>
																			
													</div> -->
													
													
													<!-- <div id="Surgeon_Discount" class="tab-pane fade in active">
															<div class="divide-20"></div>
													<div class="col-md-12-1">
														<div style="font-weight: bold;" class="col-md-1">Search
															By:</div>
														<div class="col-md-1-1">
															<label class="TextFont"
																style="margin-left: 10%; margin-top: 3%;">Patient
																Name:</label>
														</div>
					
														<div style="" class="col-md-2-1 TextFont" id="divbyNameSearch">
															<input name="byNameSearch" type="text" id="byNameSearch"
																class="form-control input-SmallText"
																onkeypress="autosuggesstionIpdBillPatTemp()" />
																
															<input type="text" onkeypress="autosuggesstionIpdBillPatTemp(this.id,'auto')" 
															class="typeahead form-control input-SmallText" id="byName" name="byName">
														</div>
														
														<div id="divbyName" class="col-md-2-1 TextFont" style="">
															<input type="text" onkeypress="autosuggesstionIpdBillPatTemp(this.id,'auto')" class="typeahead form-control input-SmallText ui-autocomplete-input" id="byName" name="byName" autocomplete="off">
														</div>
														
														
														<div class="col-md-1-1" style="margin-left: 0%;">
															<label class="TextFont"
																style="margin-left: 30%; margin-top: 3%;">Patient ID:</label>
														</div>
					
														<div style="padding-left: 0%;" class="col-md-2-1 ">
															<input name="byId" type="text" id="byIdSearch"
																class="form-control input-SmallText"
																onkeypress="return SearchPatientIdOnEnter(event,'Hospital')" />
														</div>
														<div class="col-md-1-1" style="text-align: center;">
															<input type="button" value="search"
																class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
																onclick="discountApprovalSearch('search','Hospital')" />
														</div>
													</div>
					
													<div class="divide-20"></div>
													<div class="panel panel-default">
														<div class="panel-body" style="overflow-y: auto; height: 425px; maxheight: auto;">
															<table class='table table-bordered'>
																<thead class='cf' style="background: #dbdbdb;border: 1px solid #c4c4c4">
																	<tr>
																		<th class='col-md-1-1'><label class='TextFont'>#</label></th>
																		<th class='col-md-2-1'><label class='TextFont'>Patient Name</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Patient ID</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Admission No</label></th>
																		<th class='col-md-2-1'><label class='TextFont'>Hall Name (ward)</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Total Payable</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Discount</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Approved Discount</label></th>
																		<th class='col-md-1-1'><label class='TextFont'>Remark</label></th>
																		<th class='col-md-2-1 center'><label class='TextFont'>Action</label></th>
																	</tr>
																</thead>
																
																<tbody id="BillContainer">
																
																</tbody>
																
															</table>
															<div id="BillContainer" class='col-sm-12-1'
																style="overflow-y: auto; height: 425px; maxheight: auto; margin-top: -22px; border: 1px solid #ddd;">
															</div>
														</div>
													</div>
													</div> -->
													
													
													
												</div>
												
											</div>
										</div>
									</div>
								</div>
							</div>
						
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
			fetchOpdbilDiscount("Hospital");
		});
	</script>
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id=treatmentId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<%-- <input type="hidden" id="unit_id" value="<%=session.getAttribute("unit_id")%>"> --%>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>