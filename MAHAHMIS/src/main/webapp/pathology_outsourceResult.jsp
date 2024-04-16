
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Test Phlebotomy</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"	href="ehat-design/alertify/alertify.default.css" />
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css"href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"rel="stylesheet">
<link rel="stylesheet" type="text/css"	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<link rel="stylesheet" type="text/css"href="ehat-design/js/select2/select2.min.css" />
<link rel="stylesheet" type="text/css"href="ehat-design/js/typeahead/typeahead.css" />
<link rel="stylesheet" type="text/css"href="ehat-design/js/uniform/css/uniform.default.min.css" />
<link rel="stylesheet" type="text/css"href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<link type="text/css" rel="stylesheet"href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"media="screen"></link>
<script type="text/javascript"src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<!-- include js for development -->
<script type="text/javascript" src="js/OutsourceMaster.js"></script>
<script type="text/javascript" src="js/ehat_pathology_outsource.js"></script>
<style type="text/css">
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
		<c:if test="${sessionScope.userType != null }">
			<div id="outer" class="container-main" style="width: 100%;">
				<header class="navbar clearfix" id="header">

					<%@include file="Menu_Header_Nobel.jsp"%>

					<%
						java.util.Calendar currentDate = java.util.Calendar
										.getInstance();
								java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
										"dd-MM-yyyy");
								String todays_date = formatter
										.format(currentDate.getTime());

								java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat(
										"dd/MM/yyyy");
								String todays_datee = formatterr.format(currentDate
										.getTime());

								java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat(
										"hh:mm");
								String todays_time = formatterrr.format(currentDate
										.getTime());
					%>

				</header>
				<!--/HEADER -->

				<!-- PAGE -->
				<section id="page">
					<!-- SIDEBAR -->
					<%@include file="left_menu_pathologyNew.jsp"%>
					<!-- /SIDEBAR -->
					<div id="main-content">
						<div class="container">
							<div class="row">
								<div id="content" class="col-lg-12">
									<!-- PAGE HEADER-->
									<div class="row">
										<div class="col-sm-12">
											<div class="page-header">

												<ul class="breadcrumb col-md-12">
													<li>Date : <%=todays_date%></li>
													<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
													<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
													<li>Lab Test Result</li>
													<div class="li pull-right">							
														<button 
															class="btn btn-primary btn-xs" id="saveautoriseBtn"
															onclick="saveoutSourceRoutineValueResult(<%=request.getParameter("id")%>,<%=request.getParameter("outmasteId")%>)">SaveAndPrint</button>
														
													</div>
												</ul>
											</div>
										</div>
									</div>
									<!-- /Common -->

									<div class="alert alert-block alert-info fade in"
										style="height: 0%;">

										<div class="row">
											<div class="col-md-1">
												<img id="patImg" style="width: 100%; height: 60px"
													src="ehat-design/img/profile/avatar.jpg"
													class="img-responsive">
											</div>
											<div class="col-md-11">

												<div class="col-md-12" style="margin-top: 1%;">


													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient Name
																:</label> <label class="control-label" id="patientName">
															</label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">

															<label class="control-label lblBold">Patient Id :</label>
															<label class="control-label" id="patientId"> </label>
														</div>
													</div>



													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Age :</label> <label
																class="control-label" id="age"> </label>
														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Corporate :</label>
															<label class="control-label" id="corporateid"> </label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Ref.BNo: </label> <label
																class="control-label" id="billNo"></label>

														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Diagonstic
																No :</label> <label class="control-label" id="digNo"></label>

														</div>

													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Gender :</label> <label
																class="control-label" id="sex"></label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Bill No: </label> <label
																class="control-label" id="consultingDoctor">
																Vinod-D</label>

														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Treatment Id
																:</label> <label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
															</label>

														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">DOA:</label> <label
																class="control-label" id="doa"></label>

														</div>
													</div>

													<div class="col-md-4">
														<div class="form-group">
															<label class="control-label lblBold">Patient
																Address :</label> <label class="control-label" id="addressNew">
															</label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Dispatch 
																Date :</label> <label class="control-label" id="collectionDate"></label>

														</div>
													</div>

													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Dispatch
																Time :</label> <label class="control-label" id="collectiontime"></label>

														</div>
													</div>													

												</div>
											</div>
										</div>
									</div>

									<div class="panel panel-default">
										<div class="panel-body">										
											<div class="divide-20"></div>
											<div class="row">
												<div class="col-md-4" style="width: 100%">
													<div class="panel panel-primary">
														<div class="panel-heading panel-secondary" id="divEhatContent">Test Name</div>
														 <div class="panel-body" style="overflow: auto; height: 350px;">
															<table
																class="datatable table table-bordered table-striped table-condensed cf">
																<thead id="ehatTHead">
																	<tr>
																		<th class="col-md-3 center">Profile Name</th>
																		<th class="col-sm-3 center">Test Name</th>
																		<th class="ccol-md-2 center">Test Result</th>
																		<th class="col-md-2 center">Normal Values</th>
																		<th class="col-md-2 center">Method</th>
																	</tr>
																</thead>
																<tbody id="itemMasterRecordsList">

																</tbody>

															</table>
															<input type="hidden" id=flag value="0"> 
															<input type="hidden" value="0" id="id" /> 
															<input type="hidden" value="0" id="phlebotomyprofileid" /> 
															<input type="hidden" value="0" id="phlebotomyprofiletestid" />
														</div>
													</div>
												</div>
												
												      <input type="hidden" id="patientgander" value="0">
                                                      <input type="hidden" id=flag value="0">                                                    
                                                      <input type="hidden" id="barcodeId" value="<%=request.getParameter("id")%>">
                                                      <input type="hidden" id="labrequestID" value="<%=request.getParameter("testmasterId")%>">
                                                      <input type="hidden" id="treatmentID" value="<%=request.getParameter("treatmentId")%>">
                                                      <input type="hidden" id="outmasteId" value="<%=request.getParameter("outmasteId")%>">
                                                      

											</div>

										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
					<%@include file="Footer.jsp"%>
			</div>

		</c:if>
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
		<!-- CUSTOM SCRIPT -->

		<script>
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
		});
			jQuery(document).ajaxStart(function() {
				$("body").addClass("loading");
			});

		</script>
		<script type="text/javascript">
			onload = function() {
				
				setTempateOnPatientinformation(<%=request.getParameter("treatmentId")%>);	
		        setTimeout(function() {
		        	getRoutinevalueOutSourceResut(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>,<%=request.getParameter("outmasteId")%>);
				}, 1000);
					 				
			};
	</script>

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>