<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Opd Queue</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
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

<!--DEVELOPERS JS -->
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/doctor.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/markvisit.js"></script>

<!-- <script type="text/javascript" src="path_to/jquery.js"></script> 
<script type="text/javascript" src="path_to/jquery.simplePagination.js"></script>
<link type="text/css" rel="stylesheet" href="path_to/simplePagination.css"/> -->

</head>

<%@ page language="java" import="java.util.*" %> 
<%@ page import = "java.util.ResourceBundle" %>
<% ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
  String multipleConsultationFlow=resource.getString("multipleConsultationFlow"); %>

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
									<div class="page-header" style="height: 92%;">
										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="dd_opdDashBoard.jsp">Home</a></li>
											<li><a href="patientRecordsDetails2.jsp">OPD Queue</a></li>											
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row form-group">

								<div class="col-md-12 form-group">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>

									<div class="col-md-2 form-group">
										<!-- <input name="byName" type="text" id="byName" class="typeahead form-control" placeholder="Patient Name/Mob.no/OPD.No"
										 onkeyup= "AutosuggestionForOPDque1(this.id,'auto'),clerpi()"/> -->
										 <select id="patSearchType" class="form-control input-SmallText" onchange="setPatientSearchType()">
											<option value="1">UHID Id</option>
											<option value="2">Patient Name</option>
											<option value="3">Patient Mobile</option>
											<option value="4">Patient AddharNo</option>
										</select>
									</div>
									
									<div class="col-md-2 form-group">
										<!-- <input name="byId" type="text" id="byId" class="form-control"  placeholder=" Patient ID"
									     onkeypress="return SearchPatientIdOnEnter(event,'OPDQueueNew'),clerpn()" /> -->
									    <input name="byName" type="text" id="byName" class="form-control input-SmallText"
											onkeyup="setAutoPatientName(this.id,'reg',event)" placeholder="Patient Id,Name,Mobileno"/>
									</div>

									<!-- <div class="col-md-1 form-group">
										<input type="button" value="search" class="btn btn-xs btn-primary" class="btn btn-xs btn-primary"
										 onclick="AutosuggestionForOPDque1(this.id,'search')" />
									</div> -->
									
								</div>
							</div>

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-primary">
										<div class="panel-heading" id="divEhatContent">OPD QUEUE</div>
										<div class="panel-body">
											<div style="overflow: auto;height: 500;width: 1255px;">
												<table id="myTable" class='' >
													<thead class='cf'>
														<tr style="background-color: #EEEEEE; height: 30px;">
															<th style="width: 5px;">#</th>
															<th class='col-md-1' >Patient Name</th>
															<th class='col-md-1 hidden'>Patient ID</th>
															<th class='col-md-1 ' id="thCenterPatientId">Patient ID</th>
															<th class='col-md-1' >Mobile No</th>																
															<th class='col-md-1' >App.Date</th>
															<th class='col-md-1' >Token No</th>
															<th class='col-md-1' >OPD No</th>
															<th class ='col-md-1' >Dr Name</th>
															<th class ='col-md-1'>Send</th>
															<th class ='col-md-1'>CasePaper</th>
															<th class ='col-md-1' >Bill</th>
															<th class ='col-md-2' >cancel</th>															
														</tr>
													</thead>
														<tbody id="container12"></tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> <button class="btn btn-info" style="font: bold; display: inline-block;float : right;" onclick="getAllPatient12()"><i class="fa fa-chevron-down" style="font-size:18px;"></i></button>
							</span>
							<input type="hidden" id="invcount" />
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

		<script type="text/javascript">

			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				
				getBillPrefix("",1);				
				getAllPatient();	
				
				//setDocNameForOPD();
				//$("#helpDesk").addClass("menuActive");
				//$("#opd").addClass("anchorActive");
				$("#byName").val("");
				$("#byId").val("");
				
				//setDocNameForEhatRegistration();
			});

			jQuery(document).ajaxStart(function() {		
				
				$("#pleaseWait").show();
			});
			
			jQuery(document).ajaxStop(function() {
				
				$("#pleaseWait").hide();
			});
			
		</script>
		<!--*****************Print case paper***************-->
		<div id="iPopUpForPrintCasePaper" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
					style="margin-top: 123px; margin-left: 213px;">
					<div class="modal-header">
						<button class="btn btn-xs btn-danger" aria-label="Close"
							data-dismiss="modal" type="button"
							style="margin-top: -5px;; margin-left: 530px"
							onclick="closeCasePaperPrintPopup()">
							<i class="fa fa-times"></i>
						</button>
						<button class="btn btn-xs btn-warning" title="Print"
							style="margin-top: -37px; margin-left: 500px"
							" data-original-title="savepass " data-toggle="tooltip"
							data-placement="left" onclick="openCasePaperPrint();">
							<i class="fa fa-print"></i>
						</button>
						<input type="hidden" value="0" id="hiddenId"/>
						<input type="hidden" value="0" id="hiddenTratId"/>
						<input type="hidden" value="True" id="sndPatientLimit"/>
						<h4 id="testHead" style="margin-top: -36px;">
							<i class="fa fa-print"></i> Print Case Paper :
						</h4>
					</div>
					<div class="modal-body" style="background-color: #ccffeb;">
						<div class="col-md-12-1">
							<div class="col-md-6-1">
								<input id="idPrintCasePaperWithHeader" type="radio" value="Standard"
									name="printType"> <b>Standard</b>
							</div>
							<!-- <div class="col-md-2-1">
								<input id="idPrintCasePaperWithoutHeader" type="radio" value="Custom"
									name="printType"> <b>Custom</b>
							</div> -->
							<div class="col-md-6-1">
								<input id="idPrintCasePaperStandardWithPhoto" type="radio" value="standardWithPhoto"
									name="printType"> <b>Standard With Photo</b>
							</div>
						<!-- 	<div class="col-md-4-1">
								<input id="idPrintCasePaperWithPhoto" type="radio" value="customWithPhoto"
									name="printType"> <b>Custom With Photo</b>
							</div> -->
							<div class="divide-40"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
			
			
			
			
		<!-- <div id="AdvSearchPop" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-7"
				style="margin-top: 13%; margin-left: 13%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-search"></i> Advanced Search
						</h4>
						<div class="form-group col-md-4-1" style="float: right;">
							<button class="btn btn-xs btn-primary"
								onclick="searchDoctorWise();">
								<i class="fa fa-search"></i> Search
							</button>&nbsp;&nbsp;
							<button class="btn btn-xs btn-danger"
								onclick="hideAdvSearch();">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-4-1">
						<label class="input-SmallText">Doctor: 
						 <select id="igetDoc" onchange="setSpecilizationAndDepart()" name="getDoc" style="width: 98%; font-size: 11px; margin-top:10px;">
						 </select>
						</label>
					</div>

					<div class="col-md-4-1">
						<label class="input-SmallText">Specialization: 
						 <select id="igetSpec" name="getSpec" style="width: 98%; font-size: 11px; margin-top:10px;">
						 </select>
						</label>
					</div>

					<div class="col-md-4-1">
						<label class="input-SmallText">Department: 
						 <select id="igetDept" onchange="setDoctorsForDepart()" name="getDept" style="width: 98%; font-size: 11px; margin-top:10px;">
						 </select>
						</label>
					</div>
				</div>
			</div>
		</div>
	</div> -->
	
	<!-- ********************************** Advance Search ****************************************** -->

	<div id="AdvSearchPop" class="modal fade in" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content col-md-12"
				style="margin-top: 13%; margin-left: 00%;">
				<div class="modal-header">
					<div class="box-title">
						<h4 class="col-md-8-1">
							<i class="fa fa-search"></i> Advanced Search
						</h4>
						<div class="form-group col-md-3-1" style="float: right;">
							<button class="btn btn-xs btn-primary"
								onclick="AdvanceSearchForOPDque1(this.id,'advanceSerach')">
								<i class="fa fa-search"></i> Search
							</button>&nbsp;&nbsp;
							<button class="btn btn-xs btn-danger"
								onclick="hideAdvSearch();">
								<i class="fa fa-arrows"></i> Close
							</button>
						</div>
					</div>
				</div>

				<div class="modal-body col-md-12-1">
					<div class="col-md-3-1">
						<label class="input-SmallText">Doctor: 
						 <select id="iAdvanceConsDoc" onchange="setSpecilizationAndDepartmentForAdvanceSearch(0)" style="width: 98%; font-size: 11px;"></select>
						</label>
					</div>
					<div class="col-md-3-1">
						<label class="input-SmallText">Specialization: 
						 <select id="iAdvanceConsSpec" onkeypress="" style="width: 98%; font-size: 11px;"></select>
						</label>
					</div>
					<div class="col-md-3-1">
						<label class="input-SmallText">Department: 
						<select id="iAdvanceConsDept" onkeypress="" style="width: 98%; font-size: 11px;"></select>
						</label>
					</div>
					<div class="col-md-3-1">
						<label class="input-SmallText">Age: 
						 <input id="iSrchAge" onchange="" name="" style="width: 150px; font-size: 11px; margin-top:10px;">
						</label>
					</div>
					<div class="col-md-3-1">
						<label class="input-SmallText">Gender: 
						 <select id="iSrchGender" onchange="" name="" style="width: 150px; font-size: 11px; margin-top:10px;">
						 	<option value="0">-Select Gender-</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						 </select>
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- ********************************** END ************************* -->

		<div style="display: none;" id="divDocId"></div>
		<div style="display: none;" id="appointedpatientDiv"></div>
		<div style="display: none;" id="treatmentDonePatientDiv"></div>
		<div style="display: none;" id="docListDiv"></div>
		<%-- 	<div  style="display: none;" id="userRole">${sessionScope.userType}</div> --%>
		<div style="display: none;" id="doctorObject"></div>
		<div style="display: none;" id="specObject"></div>
		<div style="display: none;" id="deptObject"></div>	
		<div style="display: none;" id="cathConsTrolleyDiv"></div>
		<input style="display: none;" id="userRoleopd" value="${sessionScope.userType}" /> 
		<input style="display: none;" id="userRoleName" value="${ sessionScope.userName }" />
		<div style="display: none;" id="pageType">opd</div>
		<input type='hidden' id="pageName" value='OPDOldPatientDatabase' />
		<input type="hidden" id="fetchPatientRecord" value="load" />
		<input type="hidden" id="pName" value="0" />
		<input type="hidden" id="pID" value="0" />
		<input type='hidden' id="count" value='0' />
		<input type='hidden' id="trId" value='0' />
		<input type='hidden' id="hiddenradiovalue" value='0' />  
		
		<input type='hidden' id="paid" value='0' />
		<input type='hidden' id="preDocId" value='0' />
		<input type='hidden' id="doctorId" value='0' />
		<input type='hidden' id="splId" value='0' />
		<input type='hidden' id="depId" value='0' />
		<input type='hidden' id="patIDLoad" value='' />
		<input type='hidden' id="patNameLoad" value='' />
		<div style="display: none;" id="conDocsList"></div>
		<input type="hidden" id="multipleConsultationFlow" value="<%=multipleConsultationFlow %>" />
		

		<!--Cancel opd queue narration pop up-->
		<div id="narrationModal" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-6-1"
					style="margin-top: 123px; margin-left: 213px;">
					<div class="modal-header">
						<button class="btn btn-xs" aria-label="Close" data-dismiss="modal"
							type="button" style="margin-top: -5px;; margin-left: 388px">
							<i class="fa fa-undo"></i>
						</button>
						<button id="saveNarration" class="btn btn-xs btn-save" title="Save"
							style="margin-top: -37px; margin-left: 360px"
							data-original-title="Save" data-toggle="tooltip"
							data-placement="left">
							<i class="fa fa-save"></i>
						</button>
						<h4 style="margin-top: -36px;">Narration:</h4>
					</div>
					<div class="modal-body">
						<div class="col-md-12-1">
							<div class="col-md-6-1" style="background-color: #ccffeb;">
								<textarea rows="3" cols="64" id="cancelNarration" type="textarea"
									name="txtNarration"></textarea>
							</div>
							<div class="divide-40"></div>
						</div>
						<div class="divide-40"></div>
					</div>
				</div>
			</div>
		</div>
		<!--********End of cancel opd queue narration pop up*******-->
		<!--Consultation Docter pop up-->
		<div id="divConsDoc" class="modal fade in" tabindex="-1"
				data-backdrop="static">
				<div class="modal-dialog">
					<div class="modal-content col-md-12-1"
						style="margin-top: 10px; margin-left: 50px;">
						<div class="modal-header">
							<div class="box-title">
								<h4> Consultation Details
									<div class="pull-right">
										<button id="iSaveConsultationDoctor" class="btn btn-success editUserAccess"
											onclick="saveConsultationDoctor()" value="insert">
											<i class='fa fa-save'></i>
										</button>
										<button class="btn btn-danger"
											onclick="closeConsultationPopUP();">
											<i class='fa fa-times'></i>
										</button>
									</div>
								</h4>

							</div>
						</div>

						<div class="modal-body">
							<table border="1"
								class="table table-bordered table-striped table-condensed">
								<thead>
									<tr style="background-color: transparent;">
									<th colspan="4">Patient ID:<span id="patIDSpan"></span></th>
									<!-- <th colspan="2">Patient Name:<span id="patNamSpan"></span></th> -->
                    				</tr>
									<tr>
										<th>Date</th>
										<!-- <th>Time</th> -->
										<th>Doctor</th>
										<th>Specialization</th>
										<th>Department</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><input type="text" id="iDate" name="iDate" readonly="readonly" class="form-control input-SmallText" onchange="checkFutureDate('multipleConsDoc')"/></td>
									<!-- 	<td><input type="text" id="iTime" readonly="readonly" class="form-control input-SmallText"/></td> -->
										<td><select id="iConsDoc" onchange="setSpecilizationAndDepartment(0)" style="width: 98%; font-size: 11px;"></select></td>
										<td><select id="iConsSpec" onkeypress="" style="width: 98%; font-size: 11px;"></select></td>	
										<td><select id="iConsDept" onkeypress="" style="width: 98%; font-size: 11px;"></select></td>
									</tr>
								</tbody>
							</table>

							<div class="title col-md-12-1"
								style="background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; margin-bottom: 1%; margin-top: 1%;">
								<label style="padding-top: 0px; margin-bottom: 0px; margin-right: 20px; margin-left: 20px; font-size: 10px;"
									 class="editUserAccess btn" onclick="addNewConsDoc()">
									<i class='fa fa-plus'></i> New Consultation Doctor</label> 
							
							</div>

							<div class="" id="consDocDiv" style="height: 300px; max-height: auto; margin-top: 8.3%; border: 1px solid #ddd;">
							<table border="1" class="table table-bordered table-striped table-condensed">
								<thead>
									<tr>
										<th>#</th>
										<th>Doctor Name</th>
										<th>Specialization</th>
										<th>Department</th>
										<th>App.Date</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody id="iConsDocTable">
									
								</tbody>
							</table>
							
							</div>

							<div class="modal-footer">
								<div class="form-group col-md-12-1 center"></div>
								<input type='hidden' id="commonAd_patId" value='0' />
								<input type='hidden' id="commonAd_treatId" value='0' />
								<input type='hidden' id="commonAd_receipt_type" value='advance' />
								<input type='hidden' id="sridname" value='N' />
								
								<input type='hidden' id="doctorNamehidden" value='Dr.' />
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--********End Consultation Docter pop up*******-->
			
			<audio id="audio" src="images/doorbell-1.wav" autostart="false" ></audio>
			
				<input type="hidden" id="billPrefix" value="">
				<input type="hidden" id="billMiddle" value="">
				<input type="hidden" id="billSufix" value="">
				
				<input type="hidden" id="patPrefix" value="">
				<input type="hidden" id="patMiddle" value="">
				<input type="hidden" id="patSufix" value="">
				
				<input type="hidden" id="recPrefix" value="">
				<input type="hidden" id="recMiddle" value="">
				<input type="hidden" id="recSufix" value="">
				
				<label id="patientId">0</label>
				<label id="treatmentId">0</label>
				<label id="patIDSpan">0</label>
				<input type="hidden" id="docQueryType" value="insert">
				<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
				
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>