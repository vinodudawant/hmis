<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Consent Request</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
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
<script type="text/javascript" src="js/admin_state.js"></script>
<script type="text/javascript" src="js/abdm_sandbox.js"></script>

<!-- Added by vishant -->


<script>
    window.onload = function() {

    	
    	<%-- var somestr = "<%= (String) (request.getAttribute("patientName")) %>";
    	$("#patientApId").val(<%=request.getParameter("patientName")%>);
    	var patientName2 =<%=request.getAttribute("patientName")%>;
    	alert("-------------p-------------===="+somestr) --%>
    	
    	//demoTest();
        getConsentData();
    	temForSentConsentRequest(this.id);
    }
</script>
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

			<%@include file="sandbox_left_menu.jsp"%>

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
											<li><a href="abdm_consent.jsp">New Consent Request</a></li>
											
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
						<!-- /PAGE HEADER -->


						<!-- SAMPLE -->
						<div class="row">


							<div class="col-sm-12">

							

								<div class="col-md-9" id="getPatDiv">

								
									<div class="box-body form">

										<form id="wizForm"  class="form-horizontal">
										<!-- <form method="post" enctype="multipart/form-data" name="fileUploadfrm" id="fileUploadfrm" action="UploadDoctordeskServlet"> -->

											<!-- <div class="wizard-form" id="tabs">
												<div class="wizard-content" id="tabs">
													
													<div class="tab-content"> -->
														

													
															<!--Health Id Information Start  on 16-Sep-2022 -->
														
															<div class="row">

																<!--For Single Sponser-->
																<div class="col-md-12">
																	<div class="panel panel-primary"
																		style="height: 675px; width: 107%;">
																		<div class="panel-heading" id="divEhatContent">New Consent Request
															</div>
															<div class="panel-body">
																			
																			<div class="col-md-6">

																					<div class="form-group">
																						<label style="margin-right: 14px;"
																							class="control-label ">Patient Identifier<span
																							class="required text-danger">*</span></label>

																						
																						<div class="input-group " style="width: 70%;">

																							<input type="search" class="form-control" id="health" 
																							>
																							
																							<div class="input-group-addon">
																								@sbx
																								
																							</div>
																							
																							<button class="input-group-addon" onMouseOver="this.style.color='#000000'"  onMouseOut="this.style.color='#00F'" title="search"   style="border:none; background: white;"  type="button" onclick="searchByHealthId()"><i class="fa fa-search "></i></button>
																						<!-- <button class="input-group-addon" onMouseOver="this.style.color='#000000'"  onMouseOut="this.style.color='#00F'" title="search"  style="border:none; background: white;" type="submit" onclick="searchByHealthId()"><i class="fa fa-search "></i></button> -->
																						</div>
																						
																						
																		
																					</div>
																					<div class="form-group">
																						<label class="control-label ">Name</label>
																						<div class="" style="width: 90%;">
																							<input type="text" class="form-control "
																								id="patientName2" placeholder="Patient Name" disabled/>
																						</div>
																					</div>
																					<!-- <div class="input-group " style="width: 70%;">
																								<input type="text" id="patientName2" class="form-control">
																					</div> -->
																					
																				</div>
																				
																				<!-- <div class="col-md-6">

																					<div class="form-group">
																						<label style="margin-right: 14px;"
																							class="control-label ">Requester Name<span
																							class="required text-danger">*</span></label>

																						
																						<div class="input-group " style="width: 90%;">

																							<input type="text" class="form-control"  name="doctorName" id="doctorName">
												
																						</div>
																						
																		
																					</div>
																					
																				</div> -->
																			
																							
																			<!-- <div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Patient Identifier</label>
																					<div class="" style="width: 90%;">
																						<input type="text" class="form-control"
																							name="visa" id="aadharNumber"
																							placeholder="Aadhaar Number" />

																					</div>
																				</div>
																			</div> -->
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Health info from</label>
																					<div class="" style="width: 90%;">
																					<input type="date" class="form-control input-SmallText"  name="date" id="formDate">
																						
																					</div>
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Health info to</label>
																					<div class="" style="width: 90%;">
																						<input type="date" class="form-control input-SmallText"  name="date" id="toDate" />

																					</div>
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">

																					<label class="control-label ">Consent Expiry<span
																						class="required"></span></label>
																					<div class="" style="width: 90%;">
																						<input type="datetime-local" class="form-control input-SmallText" name="date" id="consentExpiryDate" disabled>
																						<span class="error-span"></span>
																					</div>
																				</div>
																			</div>
																			
																			<div class="col-md-6">
																				<div class="form-group">
																					<label class="control-label ">Health info type</label>
																					<div class=""  style="width: 90%;">
																					<label><input type="checkbox" name="prescription"value="Prescription" id="prescription">Prescription<br></label>	
																					<label><input style="margin-left: 10px;"  type="checkbox" name="diagnosticReport"value="DiagnosticReport" id="diagnosticReport">DiagnosticReport<br></label>					
																					<label><input style="margin-left: 10px;"  type="checkbox" name="dischargeSummary"value="DischargeSummary" id="dischargeSummary">DischargeSummary<br></label>
																					<div id="col7" class="col-sm-2-1" style="margin-top: 10px;  margin-bottom: -40px; z-index: 1000;"><div class=divide-5></div>
																					<label><input type="checkbox" name="opConsultation" value="OPConsultation" id="opConsultation" >OPConsultation </label>	
																					<label><input type="checkbox" name="ImmunizationRecord" value="ImmunizationRecord" id="immunizationRecord" >Immunization Record </label>
																					<label><input type="checkbox" name="WellnessRecord" value="WellnessRecord" id="WellnessRecord" >Wellness Record </label>
																					<label><input type="checkbox" name="HealthDocumentRecord" value="HealthDocumentRecord" id="HealthDocumentRecord" >Health Document Record </label>	</div>					
																				</div>
																				</div>
																			</div>
																			
																			<div class="col-md-6 ">
																			
																				<div class="form-group">
																			<label class="control-label ">Purpose Of Request</label>	
																			<div class="" style="width: 90%;">
																			<select class="form-control input-SmallText" id="reqType" name="purposeOfReq">
																						<option value="Self Request">Self Request</option>
																						<option value="Care Management">Care Management</option>
																						
																						</select>
																				</div>
																				
																				</div>
																			</div>
																			
																			
																			<div class="col-md-12 text center">
																			
																				<div class="form-group">
																				
																			<div class="" style="width: 90%;">
																				<div style="margin-top: 50px;" class="col-sm-3-1" id="col10">		
																					<div style="margin-top: 50px;" class="col-sm-3-1" id="col10"><div class="btn-group">
																					<button id="saveeditassesment1" type="button" onclick="saveConsent();" class="btn btn-xs btn-success">Save</button>
																												</div></div></div>	
																				</div>
																				
																				</div>
																			</div>
																
																
																				<div class="panel-body"
																					style="overflow: auto; height: 300px">
																<table class="table table-hover table-striped table-bordered">
																	<thead><tr><th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont" >#</div></th>
																	<th class="col-md-1-1" style="height: 21.5px; padding-left: 50px;">
																	<div class="TextFont">Name</div></th>
																	<th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;">
																	<div class="TextFont">ABHA Address</div></th>
																	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
																	<div class="TextFont">Request Status</div></th>
																	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
																	<div class="TextFont">Consent created on</div></th>
																	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
																	<div class="TextFont">Consent granted on</div></th>
																	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
																	<div class="TextFont">Consent expiry on</div></th>
																	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;">
																	<div class="TextFont">View</div></th>
																	</tr></thead><tbody  id="docDispTable1"><tr>
																	<td colspan="5">No Record Found</td></tr></tbody>
																	
																	
																	</table>
																
																</div>
																
																		</div>
																	</div>
																	
																	
																</div>
															</div>
															
														
														<!--Health Id Information End-->
																			
														
																</form>
																
																
															</div>
														</div>
													
												</div>
												
												
												
											</div>
										<!-- </form> -->

									</div>
									<!-- </div> -->

								</div>
								<!-- /BOX -->
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
			
		});
	</script>
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userName" value="<%=session.getAttribute("userName")%>">
	<input type="hidden" id="patientName2" value="<%=session.getAttribute("patientName")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
	<div class="modal fade bd-example-modal-lg" id="viewVersionTrends"
												tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 80%;">
													<div class="modal-content">
														<div class="row">
															<div class="col-md-12">
																<!-- <div class="container"> -->
																	<div class="panel-body">
																		
																		<div class="left-close-button" style="margin: 0 0 10px">
																			<button class="btn btn-danger" onclick="closeViewTrendsModal()" style="float: right">
																				Close
																			</button>
																			<div class="clearfix"></div>
																		</div>

																		<div class="panel panel-default">
																			<div class="panel-heading" id="divEhatContent"
																				style="background: #FFE0C2">Consent Data</div>
																			<div class="panel-body"
																				style="overflow: auto; height: 600px;">
				<div style="background-color:#C5C5C5; height: 30px;">
					<h6  style="margin-left: 9px;padding-top: 6px;">Consent List / Health Data</h6>
				</div>															
				
				<div class="col-md-12" style="margin: 20px 0 0">
					<p>Patient Name: <span id="spname"></span> </p>
					<hr>
					
					
					<div class="col-md-12" style="text-align: center">
						<button type="button" class="btn" onclick="displayConsentBlocks('diagnostic_report')" style="background: #f5f5f5;color: red">
							<
						</button>
						<span id="Cdate" style="padding: 8px;background: #f5f5f5"></span>
						<button type="button" class="btn" onclick="displayConsentBlocks('medication')" style="background: #f5f5f5;color: red">
							>
						</button>
					</div>
					
					<div style="margin: 15px 0 0">
						<h3 style="font-size: 16px;">Hospital Name</h3>
						<hr>
						
						<!-- Main block -->
						<div id="mainBlock">
							<div class="row">
								<div class="col-md-6">
									<label>Document: </label>
									<p> Diagnostic Report Document </p>
								</div>
								<div class="col-md-6" >
									<div class="form-group">
										<label>Author:</label>
										<input type="text" class="form-control" value="0" id="author" disabled="disabled">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Status:</label>
										<input type="text" class="form-control" value="0" id="statusid" disabled="disabled">
									</div>
								</div>
								<div class="col-md-6 offset-md-6">
									<div class="form-group">
										<label>Date:</label>
										<input type="text" class="form-control" value="0" id="dateT" disabled="disabled">
									</div>
								</div>
							</div>
						
							<h3 style="font-size: 14px;">Encounter :</h3>
							<hr>
							
							<div class="row">
								<div class="form-group col-md-6">
									<input type="text" class="form-control" value="0" id="pstatus" disabled="disabled">
								</div>
								<div class="form-group col-md-6">
									<input type="text" class="form-control" value="0" id="digno" disabled="disabled">
								</div>
							</div>
						
							
							<h3 style="font-size: 14px;">Diagonstic Report : #Diagonstic Report</h3>
							<hr>
							
							<div class="row">
								<div class="form-group col-md-6">
									<label>Date :</label>
									<input type="text" class="form-control" value="0" id="DRdate" disabled="disabled">
								</div>
								<div class="form-group col-md-6">
									<label>Status :</label>
									<input type="text" class="form-control" value="0" id="DRstatus" disabled="disabled">
								</div>
								<div class="form-group col-md-6">
									<label>Performer :</label>
									<p>Performer Details</p>
								</div>
							</div>
						</div>
						<!-- ======================== -->
						
						<!-- Second block -->
						<div id="secondBlock" style="display: none">
							<div class="row">
								<div class="col-md-6">
									<label>Document: </label>
									<p> Prescription </p>
								</div>
								<div class="col-md-6" >
									<div class="form-group">
										<label>Author:</label>
										<input type="text" class="form-control" value="0" id="Mauthor" disabled="disabled">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Status:</label>
										<input type="text" class="form-control" value="0" id="Mstatusid" disabled="disabled">
									</div>
								</div>
								<div class="col-md-6 offset-md-6">
									<div class="form-group">
										<label>Date:</label>
										<input type="text" class="form-control" value="0" id="MdateT" disabled="disabled">
									</div>
								</div>
							</div>
							
							<p>
							#Prescription record : OPD prescription
							</p>
							
							<h3 style="font-size: 14px;">MEDICATION</h3>
							<hr>
							
							<table class="table table-bordered table-striped" style="margin: 20px 0 0;">
								<thead>
									<th>Date</th>
									<th>Medication</th>
									<th>Dosing Instructions</th>
									<th>Additional Info</th>
								</thead>
								<tbody id="medicationTabledata">
								</tbody>
							</table>
							
						</div>
						<!-- ======================== -->

					</div>
				</div>					
																			</div>
																		</div>
																			
																	</div>
																<!-- </div> -->
															</div>
														</div>
													</div>
												</div>
											</div>
											
				
				<!--  Medication pop up-->
				
				
				
				<div class="modal fade bd-example-modal-lg" id="viewVersionTrendsMedication"
												tabindex="-1">
												<div class="modal-dialog modal-dialog-centered"
													style="width: 80%;">
													<div class="modal-content">
														<div class="row">
															<div class="col-md-12">
																<!-- <div class="container"> -->
																	<div class="panel-body">
																		
																		<div class="left-close-button" style="margin: 0 0 10px">
																			<button class="btn btn-danger" onclick="closeViewTrendsModal()" style="float: right">
																				Close
																			</button>
																			<div class="clearfix"></div>
																		</div>

																		<div class="panel panel-default">
																			<div class="panel-heading" id="divEhatContent"
																				style="background: #FFE0C2">Consent Data</div>
																			<div class="panel-body"
																				style="overflow: auto; height: 600px;">
				<div style="background-color:#C5C5C5; height: 30px;">
					<h6  style="margin-left: 9px;padding-top: 6px;">Consent List / Health Data</h6>
				</div>															
				
				<div class="col-md-12" style="margin: 20px 0 0">
					<p>Patient Name: <span id="pname1"></span> </p>
					<hr>
					
					<div class="center">
					<nav aria-label="Page navigation example">
		  <ul class="pagination">
		    <li class="page-item">
		      <a class="page-link" href="#viewVersionTrends" aria-label="Previous">
		        <span aria-hidden="true">&laquo;</span>
		        <span class="sr-only">Previous</span>
		      </a>
		    </li>
		    <li class="page-item"><span id="Cdate"></span></li>
		    <li class="page-item">
		      <a class="page-link" href="#" aria-label="Next">
		        <span aria-hidden="true">&raquo;</span>
		        <span class="sr-only">Next</span>
		      </a>
		    </li>
		  </ul>
		</nav>
		</div>
					
					<div style="margin: 15px 0 0">
						<h3 style="font-size: 16px;">Hospital Name</h3>
						<hr>
						
						<div class="row">
							<div class="col-md-6">
								<label>Document: </label>
								<p> Prescription </p>
							</div>
							<div class="col-md-6 offset-md-6" >
								<div class="form-group">
									<label>Author:</label>
									<input type="text" class="form-control" value="0" id="Mauthor" disabled="disabled">
								</div>
							</div>
							<div class="col-md-6 offset-md-6">
								<div class="form-group">
									<label>Status:</label>
									<input type="text" class="form-control" value="0" id="Mstatusid" disabled="disabled">
								</div>
							</div>
							<div class="col-md-6 offset-md-6">
								<div class="form-group">
									<label>Date:</label>
									<input type="text" class="form-control" value="0" id="MdateT" disabled="disabled">
								</div>
							</div>
						</div>
											
						  <hr>
						  <div class="row">
							<div class="col-md-6">
								<label> #Prescription record : OPD Prescription </label>
								
							</div>
							</div>
						  
						<div class="row" style="background-color:#C5C5C5; height: 30px;">
						<h6  style="margin-left: 9px;padding-top: 6px;">Medication</h6>
					</div>
					<hr>
					
					</div>
				</div>					
																			</div>
																		</div>
																			
																	</div>
																<!-- </div> -->
															</div>
														</div>
													</div>
												</div>
											</div>
</body>
</html>