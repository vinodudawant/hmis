<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>

<html lang="en">
<head>
<title>Create Report</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">


<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- MARKDOWN -->
<script type="text/javascript"
	src="js/bootstrap-markdown/js/markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/to-markdown.js"></script>
<script type="text/javascript"
	src="js/bootstrap-markdown/js/bootstrap-markdown.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- BOOTSTRAP WYSIWYG -->
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/jquery.hotkeys.min.js"></script>
<script type="text/javascript"
	src="js/bootstrap-wysiwyg/bootstrap-wysiwyg.min.js"></script>
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
<!-- COOKIE -->
<script type="text/javascript"
	src="js/jQuery-Cookie/jquery.cookie.min.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- for Developers  -->
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/ehat_patient.js"></script>
<script type="text/javascript" src="js/pop_up.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<style>
#draggable {
	width: 150px;
	height: 150px;
	padding: 0.5em;
}
</style>
<script>
	/* $(function() {
		$(".move").draggable();
	}); */
</script>

<script>
	jQuery(document).ready(function() {
		App.setPage("CustomizeTemplate"); //Set current page
		App.init(); //Initialise plugins and elements
		
		
		var pageType = getUrlParameter("pageType");
		if(pageType=="Nuclear"){
			$("#nuclearDiv").show();
		}
		
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#customizeTemplate").addClass("anchorActive");
		getPatientDataByTidris(<%=request.getParameter("Tid")%>);
		getConsultantDrName(<%=request.getParameter("Tid")%>);
		//fetchRisTest("RadioGroup", "RisCr");
		setTemplateFunc();
	
		settempViewRis();
		
		/* Vikas Godse */
		getRisTestGroup();
		
		var check=<%=request.getParameter("check")%>;
		//alert("check :: " + check); 
		/* if(check != 1){
 			//fetchRisReportList();
			getTestRadilogyReports(check); //commented 11/11/2020
		} */
	}
</script>
</head>

<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_pathologyNew.jsp"%>
				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
												<li><a href="Ris.jsp">RIS</a></li>
												<li>Create Report</li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i>
												</li>
												<!-- <li style="margin-left: 94%;"><button
														class="btn btn-xs btn-success" onclick="ShowDivUpdateReason1()">Save</button>
												</li> --> 
												<li style="margin-left: 94%;"><button
														class="btn btn-xs btn-success" onclick="saveCreatedRISReport()">Save</button>
												</li>
													<!-- saveCrtReportTemp() -->

											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->


								<div style="margin-top: 9px;" class="col-md-12-1">
									<!-- <div class="well bottom-padding col-md-12-1" id="RisPBar"
										style="margin-left: -10px; margin-top: -30px;"></div> -->

                              <div class="alert alert-block alert-info fade in" style="margin-top:-32px;margin-left:-16px;margin-bottom:29px">

												<div class="row">
													<div class="col-md-1" style="margin-top: -4px">
														<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
															class="img-responsive">
													</div>
					
													<div class="col-md-11">
					
														<div class="col-md-12" style="margin-top: 20px">
					
															<div class="col-md-2">
																<div class="form-group">
					
																	<label class="control-label lblBold">Patient Id :</label> <label
																		class="control-label" id="patientId"> </label>
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">Age :</label> <label
																		class="control-label" id="age"> </label>
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
<!-- 																	<label id="ipdlabel" class="control-label lblBold">Diagnostic No :</label> <label -->
<!-- 																		class="control-label" id="ipdNo"> -->
														<label id="" class="control-label lblBold">Diagnostic No :</label> <label
																		class="control-label" id="ipdNo">	
																		IPD/00002017/553-D</label>
					
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">BillNo: </label> <label
																		class="control-label" id="billNo">01-D</label>
					
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">Gender :</label> <label
																		class="control-label" id="sex"> Male(D) </label>
					
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">Bill Categoty :</label>
																	<label class="control-label" id="billCategoty">
																		 </label>
					
																</div>
															</div>
					
															<div class="col-md-3">
																<div class="form-group">
																	<label class="control-label lblBold">Consulting
																		Doctor :</label> <label class="control-label" id="consultingDoctorr"></label>
					
																</div>
															</div>
					
															<div class="col-md-3">
																<div class="form-group">
																	<label class="control-label lblBold">Corporate :</label> <label
																		class="control-label" id="corporate"> </label>
					
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">DOA:</label> <label
																		class="control-label" id="doa"> 2017-05-12-D</label>
					
																</div>
															</div>
					
															<!-- <div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">DOD :</label> <label
																		class="control-label" id=""> 2017-05-12-D</label>
					
																</div>
															</div> -->
					
															<div class="col-md-3">
																<div class="form-group">
																	<label class="control-label lblBold">Treatment Id :</label>
																	<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
																	</label>
					
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
									<div class="col-md-5-1" style="margin-top: 10px;">
										<div class="col-md-2-1 form-group">Template Type</div>
										<div class="col-md-4-1">
											<select id="selRisCrTempList1" name="selRisCrTempList"
												style="margin-top: 0px;"
												class="col-md-11-1 form-control input-SmallText ">
												<option onclick="setNewCustomizeTemp()" value="0"></option>
											</select> <input type="hidden" name="idTempMast" value="0"
												id="idTempMast">
										</div>

										<div class="col-md-2-1 form-group">Template List</div>
										<div class="col-md-4-1">
											<select id="risTemplateList" name="risTemplateList"
												style="margin-top: 0px;"
												class="col-md-11-1 form-control input-SmallText ">

											</select> <input type="hidden" name="idTempMast" value="0"
												id="idTempMast">
										</div>

									</div>
							</div>


								<div class="panel panel-default col-md-12-1"
									style="margin-top: 0px;">
									<div class="panel-body">
										<div id="move" style="width: 100%; display: none;"
											class="ui-resizable ui-draggable ui-draggable-handle">
											<textarea class="ckeditor ui-widget-content "
												name="Riseditor1" title="Rich Text Editor, Riseditor1"
												placeholder="Content" id="Riseditor1"></textarea>
										</div>
										<div ID="ckviewEditor" class="tab-pane fade in hidden">
										<textarea class="ckeditor ui-widget-content "
											name="viewckeditor1"
												title="Rich Text Editor, RiseditorSubjective"
												placeholder="Content" id="viewckeditor1"></textarea>
										</div>

									</div>
								</div>
								
								<div id="nuclearDiv" class="panel panel-default col-md-12-1"
									style="margin-top: 0px;display:none;">
											<div class="tab-content">
												<div ID="Subjective1" class="tab-pane fade in active">
													<textarea class="ckeditor ui-widget-content "
														name="RiseditorSubjective1"
														title="Rich Text Editor, RiseditorSubjective1"
														placeholder="Content" id="RiseditorSubjective1"></textarea>
												</div>
										</div>
									</div>
								
								
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- <div style="width: 100%;color: #333; background-color: #EEEEEE; padding: 1%;">
										<textarea name="content" id="editor1" style="width: 100%;"></textarea> -->
										<div id="divDetailsForm" class="modal fade in"
																		tabindex="-1">
																		<div class="modal-dialog">
																			<div class="modal-content col-md-8-1"
																				style="margin-top: 123px; margin-left: 200px;">
																				<div class="modal-header">
																					<button class="btn btn-xs btn-danger" aria-label="Close"
																						data-dismiss="modal" type="button"
																						style="margin-top: -5px;; margin-left: 530px"
																						onclick="setHideTestProcess()">
																						<i class="fa fa-times"></i>
																					</button>
																					<button class="btn btn-xs btn-success" title="Save"
																						style="margin-top: -37px; margin-left: 500px"
																						data-original-title="Save" data-toggle="tooltip"
																						data-placement="left" onclick="saveTestDetails(),fetchTestDetails('0')">
																						<i class="fa fa-save"></i>
																					</button>
																				</div>
																				<div class="modal-body">
																					<div class="col-md-12-1" style="height: 70px;">
																						<div class="col-md-3-1">
																							<label>Clinical Correlation : </label>
																						</div>
																						<div class="col-md-3-1">
																							  <input type="radio" value="Yes" onchange="hideTxtComment1()" name="refByRadio1" id="chkCoRelationY">Yes
																							  <input type="radio" value="No" onchange="showTxtComment1()" id="chkCoRelationN" name="refByRadio1">No
																						</div>
																						<div class="col-md-6-1">
																							<textarea rows="2" cols="50" id="txtComment1"
																								name="txtComment1"></textarea>
																						</div>
																						<div class="divide-40"></div>
																					</div>
																					<div class="col-md-12-1" style="height: 70px;">
																						<div class="col-md-3-1">
																							<label>Redo Scan : </label>
																						</div>
																						<div class="col-md-3-1">
																							  <input type="radio" value="Yes" onchange="showTxtComment2()" name="refByRadio2" id="chkRedoY">Yes
																							  <input type="radio" value="No" onchange="hideTxtComment2()" name="refByRadio2" id="chkRedoN">No
																						</div>
																						<div class="col-md-6-1">
																							<textarea rows="2" cols="50" id="txtComment2"
																								name="txtComment2"></textarea>
																						</div>
																						<div class="divide-40"></div>
																					</div>
																					<div class="col-md-12-1" style="height: 70px;">
																						<div class="col-md-3-1">
																							<label>Contrast Related Reaction : </label>
																						</div>
																						<div class="col-md-3-1">
																							  <input type="radio" value="Yes" onchange="showTxtComment3()" name="refByRadio3" id="chkRelatedReactionY">Yes
																							  <input type="radio" value="No" onchange="hideTxtComment3()" name="refByRadio3" id="chkRelatedReactionN">No
																						</div>
																						<div class="col-md-6-1">
																							<textarea rows="2" cols="50" id="txtComment3"
																								name="txtComment3"></textarea>
																						</div>
																						<div class="divide-40"></div>
																					</div>
																					<div class="col-md-12-1" style="height: 70px;">
																						<div class="col-md-3-1">
																							<label>Incident : </label>
																						</div>
																						<div class="col-md-3-1">
																							  <input type="radio" value="Yes" onchange="showTxtComment4()" name="refByRadio4" id="chkErrorY">Yes
																							  <input type="radio" value="No" onchange="hideTxtComment4()" name="refByRadio4" id="chkErrorN">No
																						</div>
																						<div class="col-md-6-1">
																							<textarea rows="2" cols="50" id="txtComment4"
																								name="txtComment4"></textarea>
																						</div>
																						<div class="divide-40"></div>
																					</div>
																					<div class="col-md-12-1" style="height: 70px;">
																						<div class="col-md-3-1">
																							<label>History : </label>
																						</div>
																						<div class="col-md-9-1">
																							<textarea rows="3" cols="70" id="txtComment5"
																								name="txtComment5"></textarea>
																						</div>
																						<div class="divide-40"></div>
																					</div>
																					<div class="divide-40"></div>
																				</div>
																			</div>
																		</div>
					</div>

			<%@include file="Footer.jsp"%>
			<input type="hidden" id="queryType" value="insert">
			<input type="hidden" id="updateTempId" value="0">
			<input type="hidden" id="pageName" value="Admin">
			<div id="customizeTemplateDiv" style="display: none;"></div>
			<div id="divDocSpec" style="display: none;"></div>
			<div id="rislistobject" style="display: none;"></div>
		</c:if>
	</section>
		 <input type="hidden" id="Invidrd" value="<%=request.getParameter("idInv")%>">
	    <div id="patdet" style="display: none;" ><%=request.getParameter("risObj")%></div>
		<div id="TID" style="display: none;" ><%=request.getParameter("Tid")%></div>
		<div id="TestID" style="display: none;" ><%=request.getParameter("TestID")%></div>
		<div id="TempID" style="display: none;" ></div>
		<div id="Pid" style="display: none;" ><%=request.getParameter("Pid")%></div>
		<div id="radiologyTestId" style="display: none;" ><%=request.getParameter("idradTestName")%></div>
		<input type="hidden"  id="createUpdateReportId" value="<%=request.getParameter("idRadiologyTestReport")%>"> <!-- CRUD of ris report template -->
		<input type="hidden"  id="patientsId" value="<%=request.getParameter("Pid")%>"> <!-- patient ID , aniket 31 JAN 22-->
		
		<%-- <div id="radiologyTestId1" style="display: none;" ><%=request.getParameter("radiologyTestId")%>
		<div id="TestID1" style="display: none;" ><%=request.getParameter("testId")%> --%>
		
</body>
</html>