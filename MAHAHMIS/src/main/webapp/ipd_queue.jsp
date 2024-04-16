<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IPD Queue</title>
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
<script type="text/javascript" src="js/IpdQueue.js"></script>
<script type="text/javascript" src="js/patient_search.js"></script>


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
											<li><i class="fa fa-home"></i> <a href="ehat_IPD_BedWardDashboard.jsp">IPD Queue</a></li>

										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12" style="margin: 0 0 10px">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label" style="padding: 3px 0 0">Search By :</label>
									</div>
									<!-- <div class="col-md-4">
										<div class="input-group" id="documentByName">
											<input class="form-control" 	title="Please enter State name" id="searchId"
												type="text" placeholder="Patient Name" onkeyup="setAutoPatientName(this.id)">
											<span class="input-group-btn">
												<button class="btn btn-primary"	style="height: 25px; margin-bottom: 10px" type="button"  onclick="centerStateMasterSearchById();">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
										</div>
									</div>  -->
									<div class="col-md-3 TextFont" id="divbyName">
																		
										<select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
											<option value="1">UHID</option>
											<option value="5">Legacy UHID</option>
											<option value="2">Patient Name</option>
											<option value="3">Patient Mobile</option>
											<!-- <option value="4">Patient AddharNo</option> -->
										</select>
										
									</div>
									
									<!-- <div class="col-md-4 TextFont" id="documentByName">
										<input name="byName" type="text"  autocomplete="off" id="byName" class="form-control input-SmallText"
											onkeyup="getHitOnEnter(this.id,event)" placeholder="Patient Id,Name,Mobileno"/>																		
									</div> -->
									<div class="col-md-4 TextFont" id="documentByName">
										<input name="byName" type="text"  autocomplete="off" id="byName" class="form-control input-SmallText"
											onkeyup="getIPDAutoDetails(this.id,event)" placeholder="Patient Id,Name,Mobileno"/>																		
									</div>
									
									<div class="col-md-3 TextFont">
																		
										<select id="patSearchType1" class="form-control input-SmallText" onchange="getIpdQueue('search',1)">
											<option value="0">All</option>
											<option value="2">Ipd</option>
											<option value="4">Casualty</option>
											<!-- <option value="4">Patient AddharNo</option> -->
										</select>
										
									</div>
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">

											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">IPD Queue Details</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 400px">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Patient Name</th>
																					<th class="col-md-1 center">Mobile No</th>
																					<th class="col-md-1 center">MRN No</th>
																					<th class="col-md-1 center">UHID</th>
																					<th class="col-md-1 center">Admission  No</th>
																					<th class="col-md-1 center">Allot Bed</th>
																					<th class="col-md-1 center">Cancel Admission</th>
																				</tr>
																			</thead>

																			<tbody id="ipdQuepatientDeatilsDetails">
																			</tbody>
																		</table>
																	</div>
																</div>
																<div class="pull-right">
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
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
				<div id="cancellAdmissionPopUp" class="popup modal fade in" tabindex="-1"
					role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog" style="width: 500px;">
						<div class="modal-content">
							<div class="modal-header">
								<div class="box-title">
									<h4>Narration </h4>
								</div>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										<!-- BOX -->
										<div class="box-body">
											<!--Panel Body-->
											<div class="col-xs-12 col-md-12">
												<div class="col-xs-4 col-md-12">
													<div class="divide-20"></div>
													<label>Reason to cancel Admission</label>
													<textarea id="narrationid" name="addressText" cols="46" rows="2"></textarea>
												</div>
											</div>
										</div>
									</div>
									<!-- /BOX-->
								</div>
							</div>
							<div class="modal-footer">
								<input type="button" value="submit" class="btn btn-primary"
									onclick="cancelAdmission()" />
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
							</div>
						</div>
						<!-- /BODY-->
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
			<div id="patobject" style="display: none;"></div>
			<div id="trid" style="display: none;"></div>
			<div id="pid" style="display: none;"></div>
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
			getIpdQueue("All",1);
			setPatientSearchType();
		});
	</script>
	<input type="hidden" id="countopdpage" value="">
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type='hidden' id="count" value='0' />
	<%-- <input type="hidden" id="unit_id" value="<%=session.getAttribute("unit_id")%>"> --%>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>