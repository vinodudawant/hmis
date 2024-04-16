<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>OPD QUEUE</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<link rel="stylesheet" type="text/css" href="ehat-design/datepicker/datepicker3.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />
<!-- TYPEAHEAD -->

<%@include file="inv_header.jsp"%>

<style>
.chosen-container-single .chosen-single {
	height: 26px;
	line-height: 25px;
}
.notActive{
    color: #3276B1
;
    background-color: #fff;
}
</style>
<!-- include js for development -->
<!-- <script type="text/javascript" src="js/UserAccess.js"></script> -->
<!-- <script type="text/javascript" src="js/opd_queue.js"></script> -->
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/doctor.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/markvisit.js"></script>
<script type="text/javascript" src="js/opd_queue.js"></script>
<script type="text/javascript" src="js/patient_search.js"></script>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	
	ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String multipleConsultationFlow=resource.getString("multipleConsultationFlow");
	
	ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");   
 	String meeshaFlow = resourceBundle.getObject("meesha").toString();

%>
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
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="opd_queue.jsp">Opd Queue</a></li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
						
							<div class="row">
										
								<!-- NEW ORDERS -->
								<div class="row">
									<!-- NEW ORDERS -->
									<div class="col-md-12">
										<div class="tab-content">
											<div class="tab-pane fade in active" id="OPD">
												<div class="panel panel-default">
													<div class="panel-body">
														<div class="row">
															<div class="col-md-12">
																<div class="tabbable header-tabs">
																	<div class="row" style="margin-top: 2px">
																		<div class="col-sm-12">
																			<div class="form-group col-md-1">
																				<label for="">Search By:</label>
																			</div>
																			
																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<select name="drDeptId" id="drDeptId" class="col-md-12 full-width-fix"
																						onchange="getDoctorBySpecialization('speciality','doctorName'),disableDocNameInMultiSelect(),fetchOpdQueuePatient(0,'-','-',1)"
																						style="width: 95%;">
																					</select>
																				</div>
																			</div>
																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<div>
																						<select id="doctorName" name="doctorName" onchange="fetchOpdQueuePatient(0,'-','-',1)" class="col-md-12" style="width: 98%;">	</select>
																					</div>
																				</div>
																			</div>
																			
																			<div class="form-group col-md-3">
																				<select class="input-group form-control" onchange="setPatientSearchType()"
																					title="Patient Name" id="selectsearchopd"
																					style="width: 100%">
																					<option value="1">Patient UHID</option>
																					<option value="5">Legacy UHID</option>
																					<option value="2">Patient Name</option>
																					<option value="3">Patient Mobile</option>
																					<option value="4">Patient Aadhaar</option>
																					
																				</select>
																			</div>
																			<!-- <div class="form-group col-md-3" id="divpatientopd">
																				<input class="typeahead form-control input-SmallText"
																					title="Patient Id" type="text" id="patientopd"
																					name="patientopd" onkeyup="setAutoPatientName(this.id,'opd',event);"
																					placeholder="Search" style="width: 100%">
																			</div> -->
																			<div class="form-group col-md-3" id="divpatientopd">
																				<input class="typeahead form-control input-SmallText"
																					title="Patient Id" type="text" id="patientopd"
																					name="patientopd" onkeyup="getPatientAutoByOPD(this.id,'opd',event);"
																					placeholder="Search" style="width: 100%">
																			</div>
																			 <div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<div class="input-group-addon">
																						 <a style="margin-left: 50px;margin-right: 40px" target="_blank" onclick="opdLEDScreen()" class="btn btn-xs btn-primary">Display LED</a>
																					</div>
																				</div>
																			</div>
																			<!-- <div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<input type="text" class="form-control"
																						id="fromopdDate" placeholder="From Date">
																					<div class="input-group-addon">
																						<i class="fa fa-calendar"></i>
																					</div>
																				</div>
																			</div>
																			<div class="col-md-2">
																				<div class="input-group date col-md-12">
																					<input type="text" class="form-control"
																						id="toopdDate" placeholder="To Date">
																					<div class="input-group-addon">
																						<i class="fa fa-calendar"></i>
																					</div>
																				</div>
																			</div> -->
																			<!-- <div class="col-sm-1">
																				<input type="button" class="btn btn-xs btn-primary"
																					value="search"
																					onclick="fetchOpdQueuePatient();">
																			</div> -->
																		</div>


																		<div class="col-md-12">
																			<!-- <div class="col-sm-12">
																				<div class="pull-right">
																					<div id="datatable1_filter"
																						class="dataTables_filter">
																						<label id="searchlabel"> </label>
																					</div>
																				</div>
																			</div> -->
																			<div class="panel panel-primary">
																				<div class="panel-heading" id="divEhatContent">
																					OPD QUEUE</div>
																				<div class="panel-body"	style="overflow: auto; height: 550px">
																					<table id="opdlistpage"
																						class="datatable table table-striped table-bordered">
																						<thead id="ehatTHead">
																							<tr style="background-color: #EEEEEE; height: 30px;">
																								<th style="width: 5px;">#</th>
																								<th style="width: 95px;" >Patient Name</th>
																								<!-- <th class='col-md-1 hidden'>Patient ID</th> -->
																								<th style="width: 5px;" id="thCenterPatientId">Patient ID</th>
																								<th style="width: 10px;" >Mobile No</th>																
																								<th style="width: 10px;" >App.Date</th>
																								<th style="width: 10px;" >Token</th>
																								<th style="width: 10px;" >OPD No</th>
																								<th style="width: 10px;" >Speciality</th>
																								<th style="width: 15px;" >Dr Name</th>
																								<th style="width: 10px;">Send</th>
																								<th style="width: 10px;">Case Paper</th>
																								<th style="width: 10px;" >Bill</th>
																								<th style="width: 50px;" >Cancel</th>															
																							</tr>
																						</thead>
																						<tbody id="tbodyOpdQueuePatient">
																						</tbody>
																					</table>
																					<div class="pull-right" >
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
			<!--Start #showSubModulesPopup Popup -->
			</div>

			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>
		<script type="text/javascript" src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<script src="js/chosen.jquery.js"></script>
		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		
		<script type="text/javascript">

			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});

				getSpecialization("reg","drDeptId");
				fetchOpdQueuePatient(0,'-','-',1);
				//getBillPrefix("",1);				
				//getAllPatient();	
				
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
				<div class="modal-content col-md-8"
					style="margin: 150px; height: 150px;">
					<div class="modal-header">
						<button class="btn btn-xs btn-danger pull-right" aria-label="Close"
							data-dismiss="modal" type="button"
							onclick="closeCasePaperPrintPopup()">
							<i class="fa fa-times"></i>
						</button>
						<button class="btn btn-xs btn-warning pull-right" title="Print"
							data-original-title="savepass " data-toggle="tooltip"
							data-placement="left" onclick="openCasePaperPrint();" style="margin-right: 5px">
							<i class="fa fa-print"></i>
						</button>
						<input type="hidden" value="0" id="hiddenId"/>
						<input type="hidden" value="0" id="hiddenTratId"/>
						<input type="hidden" value="True" id="sndPatientLimit"/>
						<h4 id="testHead">
							<i class="fa fa-print"></i> Print Case Paper :
						</h4>
					</div>
					<div class="modal-body" style="background-color: #ccffeb;">
						<div class="col-md-12">
							<div class="col-md-4">
								<input id="idPrintCasePaperWithHeader" type="radio" value="Standard"
									name="printType"> <b>Standard</b>
							</div>&nbsp&nbsp&nbsp
							<!-- <div class="col-md-2-1">
								<input id="idPrintCasePaperWithoutHeader" type="radio" value="Custom"
									name="printType"> <b>Custom</b>
							</div> -->
							<div class="col-md-7">
								<input id="idPrintCasePaperStandardWithPhoto" type="radio" value="standardWithPhoto"
									name="printType"> <b>Standard With Photo</b>
							</div>
						<!-- 	<div class="col-md-4-1">
								<input id="idPrintCasePaperWithPhoto" type="radio" value="customWithPhoto"
									name="printType"> <b>Custom With Photo</b>
							</div> -->
							<!-- <div class="divide-40"></div> -->
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
				<input type="hidden" id="tokenNoForPrint" value="0">
				<input type="hidden" id="docDepartmentForPrint" value="0">
				<input type="hidden" id="meeshaFlow" value="<%=meeshaFlow%>">
				
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>