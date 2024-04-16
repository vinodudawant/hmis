<%@page import="java.util.ArrayList"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.ResourceBundle"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>RIS Previous Records</title>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

<!-- bootstrap datepicker new added  csss-->
<link href="ehat-design/js/select2/select2.min.css" type="text/css" rel="stylesheet">
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<script src="jquery/jquery-2.1.1.js"></script>
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<script type="text/javascript" src="js/radiology.js"></script>
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script src="js/ExtraJs/inventory_Material_Request_Note.js"></script>


<script type="text/javascript" src="js/CommonTemplate.js"></script>

<script type="text/javascript" src="js/Admin.js"></script>
<!-- <script type="text/javascript" src="js/ehat_patient.js"></script>-->
<script type="text/javascript" src="js/ehat_patient.js"></script>
<script type="text/javascript" src="js/ehat_viewRis_modified.js"></script> <!-- aniket/28/OCT2020  -->

<script src="js/validate.js" type="text/javascript"></script>
<script src="js/script.js"></script>
<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>

<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script src="js/jquery.ajaxfileupload.js"></script>


<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	
<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>

<style type="text/css">
#idProcess {
  display: idProcess;
  width: 80%;
  border: none;
  background-color: #5e87b0;
  color: white;
  padding: 2px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  margin-top: -6px;
}

#idProcess:hover {
  background-color: #ddd;
  color: black;
}

#btnCreReport {
  display: btnCreRepo;
  width: 90%;
  border: none;
  background-color: #5e87b0;
  color: white;
  padding: 8px 28px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
}

#btnCreReport:hover {
  background-color: #ddd;
  color: black;
}

#btnEditReport {
  display: btnEditRepo;
  width: 90%;
  border: none;
  background-color: #5e87b0;
  color: white;
  padding: 8px 28px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
}

#btnEditReport:hover {
  background-color: #ddd;
  color: black;
}

#btnViewReports {
  display: btnEditRepo;
  width: 90%;
  border: none;
  background-color: #5e87b0;
  color: white;
  padding: 8px 28px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
}

#btnViewReports:hover {
  background-color: #ddd;
  color: black;
}

#saveRisRecordss {
  display: btnEditRepo;
  width: 90%;
  border: none;
  background-color: #5e87b0;
  color: white;
  padding: 8px 28px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
}

#saveRisRecordss:hover {
  background-color: #ddd;
  color: black;
}


#saveImage {
	display: saveImage;
  width: 90%;
  border: none;
  background-color: #5e87b0;
  color: white;
  padding: 8px 28px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
}

#saveImage:hover {
  background-color: #ddd;
  color: black;
}

  /* #fileUp {
  display: none;
  width: 90%;
  border: none;
  background-color: #ddd;
  color: white;
  padding: 8px 28px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
} */

/* #fileUp:hover {
  background-color: #ddd;
  color: black;
}  */

/* #fileUp {
    display: none;
} */
/* .custom-file-upload {
	width: 90%;
	font-size: 10px;
	background-color: #ddd;
    border: 1px solid #ccc;
    display: inline-block;
    padding: 9px 28px;
    cursor: pointer;
} */

}
</style>

<script lang="Javascript">

/* $(document).click(function() {
    $('input[type="file"]').ajaxfileupload({
        'action' : 'UploadRisDocsServlet'
    });
}); */

$(document).click(function() {
	$('input[type="file"]').ajaxfileupload({
	'action' : 'UploadRisDocsServlet',
});
});
</script>
<script type="text/javascript">
	onload = function() {
		 getConsultantDrName(<%=request.getParameter("Tid")%>); 
		 
		
		App.setPage("ItemManagement");
		App.init();
		getPatientDataByTidris(<%=request.getParameter("Tid")%>);
		//getRisPatInfo();
		//setTemplateRis("view");
		
		setTemplateRis3(); //test comment //10/11/2020
		settempViewRis(); //test comment //10/11/2020
		//changeButton(); //test comment //10/11/2020
		
		fetchRadiologyTest(<%=request.getParameter("idradTestName")%>);
		//getTestRadilogyReports(); //commented //kept for reference.
		if(<%=request.getParameter("Idradiology")%> == "" || <%=request.getParameter("Idradiology")%> == null){
			//fetchRadiologyTest(<%=request.getParameter("TestID")%>);
			fetchImage(<%=request.getParameter("TestID")%>);
		}else{
			
			fetchImage(<%=request.getParameter("Idradiology")%>);
		}
		var pageType = getUrlParameter("pageType");
		if(pageType=="Nuclear"){
			$("#ckviewEditor1").show();
		}
		//Added by sanjay for privious tab in RIS disable editreport button.
		if((<%=request.getParameter("page")%>)=="0"){
			
			setTimeout(function(){
				$('#btnEditRepo').attr("disabled", true);
				$('#btnCreRepo').attr("disabled", true);
			},100);
		}
		//Sanjay Kumar Shah for Clinical and Indtruction 
		clinicalInstructionNote();
		
		getRadiologistList(); //aniket/28/10/2020
		
		getTakenArrivalDateTime(<%=request.getParameter("idradTestName")%> , <%=request.getParameter("Idradiology")%>); //aniket_kanse/04/11/2020
		<%-- fetchRisReportRecordByPatientId(<%=request.getParameter("Pid")%>); --%>	//aniket_kanse/07/11/2020
		fetchRisReportRecordByPatientId(<%=request.getParameter("idradTestName")%>);	//aniket_kanse/07/11/2020
		
	}
</script>

</head>
<body style="background: white ! important;">
<%
	//aniket_kanse // 10/10/2020
	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String fromMail = (String) resourceBundle.getObject("noReplyEmailIdOfCenter").toString();
	//System.out.println("--RADIOLOGY JSP -- FROM EMAIL --" + fromMail);
%>
	<c:if test="${ sessionScope.userType != null }">
		<section id="page">
			<!-- HEADER -->
			<div id="outer" class="container-main" style="width: 100%;">

				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
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
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="Inventory.jsp">RIS</a></li>
											</ul>
										</div>
									</div>
								</div>
								<!-- <form action='UploadServlet' id='fileUploadfrm'
									name='fileUploadfrm' enctype="multipart/form-data"
									method="post">
 -->
								<div class="col-md-12-1 panel-body">

									<div class="panel-body" style="border: 1px; margin-top: -30px;">
									<div class="alert alert-block alert-info fade in" style="margin-top:-13px;margin-left:-31px;margin-bottom:23px">

												<div class="row">
													<div class="col-md-1" style="margin-top: -4px">
														<img id="patImg" style="width: 100%;height: 45px" src="ehat-design/img/profile/avatar.jpg"
															class="img-responsive">
													</div>
					
													<div class="col-md-11">
					
														<div class="col-md-12" style="margin-top: 20px">
					
															<div class="col-md-2">
																<div class="form-group">
					
																	<label class="control-label lblBold">UHID :</label> <label
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
					
															<div class="col-md-4">
																<div class="form-group">
																	<label id = "ipdlabel" class="control-label lblBold">Diagnostics No :</label> <label
																		class="control-label" id="ipdNo"></label>
					
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">BillNo: </label> <label
																		class="control-label" id="billNo"></label>
					
																</div>
															</div>
					
															<div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">Gender :</label> <label
																		class="control-label" id="sex"></label>
					
																</div>
															</div>
					
															<!-- <div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">Bill Categoty :</label>
																	<label class="control-label" id="billCategoty"></label>
					
																</div>
															</div> -->
					
															<div class="col-md-4">
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
																		class="control-label" id="doa"></label>
					
																</div>
															</div>
					
															<!-- <div class="col-md-2">
																<div class="form-group">
																	<label class="control-label lblBold">DOD :</label> <label
																		class="control-label" id="dod"></label>
					
																</div>
															</div> -->
					
															<div class="col-md-4">
																<div class="form-group">
																	<label class="control-label lblBold">Treatment Id :</label>
																	<label class="control-label" id=treatmentId> <%=request.getParameter("treatmentId")%>
																	</label>
					
																</div>
															</div>
															
															<!-- <div class="col-md-4">
                                                        		<div class="form-group">
                                                            		<label class="control-label lblBold">Ref Dr:</label> <label id="refDoctor" class="control-label"> </label>                                                      
																</div>
                                                    	 	 </div> -->
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
											<!-- <div class="well bottom-padding col-md-12-1" id="RisPBar"
												style="margin-left: -25px;"></div> -->
										</div>
										
								<!-- --START-- aniket/test/new_view_RIS -->	
								
							<div class="box border col-md-12"> <!-- START tabbale div -->
								<div class="tabbable col-md-12">
								<div class="divide-10"></div>
									<ul class="nav nav-tabs">
	
											<li id="reportTabButton" class="active"><a data-toggle="tab" href="#reportTab" onclick="somefunction2();"><span
											class="hidden-inline-mobile">Reports</span></a></li>
																										
											<li id="uploadDocTabButton"><a data-toggle="tab" href="#uploadDocTab" onclick="somefunction2();">
											<span class="hidden-inline-mobile">Upload Documents</span></a></li>
	
									</ul>
								<div class="divide-10"></div>
									
							<div class="tab-content">
								<div id="reportTab" class="tab-pane fade in active">
							
								<div class="panel panel-default" style="width: 100%;">
									<div class="panel-body">
										
									<div class="col-md-12">
										<div class="divide-20"></div>
										<div class="col-md-3">
														<!-- <div class="form-group" align="center">
															<label class="control-label" style="margin-right: 110px;"> Arrival Date </label>
															
																		<input type="text" class="form-control input-sm" style="width: 90%;"
																			id="arrivalDate" readonly/>
														</div> -->
														
												<div class="form-group Remove-Padding col-md-4-1"
														style="margin-top: 1px;">
														<label class="TextFont">Arrival Date</label>
													</div>
													 <div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: 1px;"></div> 
													<div class="form-group Remove-Padding col-md-6-1"
														style="margin-top: 1px;">
														<input id="arrivalDate" name="arrivalDate" value=""
															class="form-control input-SmallText" readonly/>
													</div>
											</div>
											
										<div class="col-md-3">
														<!-- <div class="form-group" align="center">
															<label class="control-label" style="margin-right: 110px;"> Arrival Time </label>
															
																		<input type="text" class="form-control input-sm" style="width: 90%;"
																			id="arrivalTime" readonly/>
														</div> -->
														
														<div class="form-group Remove-Padding col-md-4-1"
														style="margin-top: 1px;">
														<label class="TextFont">Arrival Time</label>
													</div>
													 <div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: 1px;"></div> 
													<div class="form-group Remove-Padding col-md-6-1"
														style="margin-top: 1px;">
														<input id="arrivalTime" name="arrivalTime" value=""
															class="form-control input-SmallText" readonly/>
													</div>
											</div>
											
										<div class="col-md-3">
														<!-- <div class="form-group" align="center">
															<label class="control-label" style="margin-right: 110px;"> Taken Date </label>
															
																		<input type="text" class="form-control input-sm" style="width: 90%;"
																			id="takenDate" readonly/>
														</div> -->
														
														<div class="form-group Remove-Padding col-md-4-1"
														style="margin-top: 1px;">
														<label class="TextFont">Taken Date</label>
													</div>
													 <div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: 1px;"></div> 
													<div class="form-group Remove-Padding col-md-6-1"
														style="margin-top: 1px;">
														<input id="takenDate" name="takenDate" value=""
															class="form-control input-SmallText" readonly/>
													</div>
											</div>
											
											<div class="col-md-3">
														<!-- <div class="form-group" align="center">
															<label class="control-label" style="margin-right: 110px;"> Taken Time </label>
															
																		<input type="text" class="form-control input-sm" style="width: 90%;"
																			id="takenTime" readonly/>
														</div> -->
														
														<div class="form-group Remove-Padding col-md-4-1"
														style="margin-top: 1px;">
														<label class="TextFont">Taken Time</label>
													</div>
													 <div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: 1px;"></div> 
													<div class="form-group Remove-Padding col-md-6-1"
														style="margin-top: 1px;">
														<input id="takenTime" name="takenTime" value=""
															class="form-control input-SmallText" readonly/>
													</div>
											</div>
											
											<div class="col-md-3" id="divIdProcess">
															<div class="form-group" align="center" style="margin-top: -10px;">
																 <label class="control-label" style="margin-right: 150px;"></label> 
																		<button class="btn btn-xs btn-primary" id="idProcess" 
																		title="Q-Indicators" onclick="setViewTestProcess(),fetchTestDetails(0)" type="button"> <b> Q-Indicators </b> </button>
																
															</div>
													</div>
										
										</div>
									
										<div class="col-md-12">
										<div class="divide-20"></div>
										
											 <div class="col-sm-3">
														<div class="form-group" align="center">
															<label class="control-label" style="margin-right: 150px;"> Investigation </label>
															
																		<input type="text" class="form-control" style="width: 90%;"
																			id="investigationName" readonly/>
														</div>
											</div>
											
											<div class="col-sm-3">
															<div class="" align="center">
																<label class="control-label" style="margin-right: 165px;">Instruction</label>
																			
																			<textarea class="form-control" rows="1" cols="20" 
																			style="width: 90%; padding: 1px 15px;" name="instruction" 
																			id="instruction" placeholder="Instruction"></textarea>
															</div>
													</div>
													
											<div class="col-sm-3">
															<div class="form-group" align="center">
																<label class="control-label" style="margin-right: 150px;">Clinical Notes</label>
																			
																			<textarea class="form-control" rows="1" cols="20" 
																			style="width: 90%; padding: 1px 15px;" name="clinicalNotes" 
																			id="clinicalNotes" placeholder="Clinical Notes"></textarea>
															</div>
													</div>
													
											<div class="col-sm-3" id="divId">
															<div class="form-group" align="center">
																<label class="control-label" style="margin-right: 160px;">Radiologist/Cardiologist 
																	<span class="required text-danger">*</span>
																</label> 
																<select class="form-control" style="width: 90%;" id="radiologist" name=""></select>	
															</div>
													</div>
													
											
													
										</div>
										
										<div class="col-md-12"> <!-- 2nd row start -->
											<div class="divide-20"></div>
											
											<div class="col-sm-3" id="divIdProcess" >
															<div class="form-group" align="center">
																 <label class="control-label" style="margin-right: 150px;"></label> 
																		<button class="btn btn-xs btn-primary" disabled id="btnCreReport" 
																		title="Create Report" onclick="riscreaterep(1)" type="button"> <b> Create Report </b> </button>
															</div>
													</div>
													
											<!-- <div class="col-sm-3" id="divIdProcess" >
															<div class="form-group" align="center">
																 <label class="control-label" style="margin-right: 150px;"></label> 
																		<button class="btn btn-xs btn-primary" id="btnEditReport" 
																		title="Edit Report" onclick="editRISReport(0)" type="button"> <b> Edit Report </b> </button>
																		
															</div>
												</div> -->
												
											
											<!-- <div class="col-sm-3" id="divIdProcess">
													<div class="form-group" align="center">
														<label class="control-label" style="margin-right: 150px;"></label> 
														
															<button class="btn btn-xs btn-primary" id="btnViewReports" data-toggle="modal" data-target="#RisPopUp"
															title="View Report" type="button"> <b> View Report </b> </button>
													</div>

											</div> -->
											
											<div class="col-sm-3" id="divIdProcess" >
															<div class="form-group" align="center">
																 <label class="control-label" style="margin-right: 150px;"></label> 
																		<button class="btn btn-xs btn-primary" disabled id="saveRisRecordss" 
																		title="Save RIS record" onclick="saveRisReportRecords()" type="button"> <b> Save </b> </button>
																		
															</div>
												</div>
												

												
												
												
										</div><!-- 2nd row end -->
									</div>
								</div> <!-- details section END --> 
								
								<!-- table section start -->
								<!-- <div class="divide-20"></div> -->
								<div class="panel panel-default" style="width: 100%;">
									<div class="panel-body">
										<div class="col-md-12">
											<div style="overflow: auto;height: 250px;" id="sTable">
												<table id="fixed_header"
													class="datatable table  table-bordered">
														<thead id="risRecTableHead" class="fixedheaderdemo">
															<tr>
																<th class="col-md-1 center">Sr. No</th>
																<th class="col-md-1 center">Radiologist</th>
																<!-- <th class="col-md-1 center">View Report</th> -->
																<th class="col-md-1 center">Verify</th>
																<th class="col-md-1 center">Post</th>
																<th class="col-md-1 center">Veiw / Print Report</th>
																<th class="col-md-1 center">Send Report</th>
																<th class="col-md-1 center">Auth. Sign</th>
																<th class="col-md-1 center">Date & Time</th>
																<th class="col-md-1 center">Edit</th>
																<th class="col-md-1 center">Edit Report</th>
																<th class="col-md-1 center">Delete</th>
																									
															</tr>
														</thead>
														<tbody id="risRecTableBody" style="height: 96px;">
														</tbody>
												</table>
											</div>
										
										</div>
									</div>
								</div>
								<!-- table section END -->
								
								<!-- --END-- aniket/test/new_view_RIS -->
										</div>		<!-- close reports tab div here -->
											
								<div id="uploadDocTab" class="tab-pane fade in">
											
											<!-- S -->
									<div class="panel panel-default" style="width: 100%;">
										<div class="panel-body">
										
											<div class="col-md-12">
												<div class="divide-20"></div>
												
													<div class="col-sm-3">
														<div class="form-group" align="center">
															<label class="control-label" style="margin-right: 130px;"> Document Name <span class="required text-danger">*</span></label>
															
																		<input type="text" class="form-control" style="width: 90%;"
																			id="risDocName" placeholder = "Document Name"/>
														</div>
													</div>
													
													<div class="col-sm-3">
														<div class="form-group" align="center">
															 <label class="control-label" style="margin-right: 90px;">  </label> 
															
																<!-- <label class="custom-file-upload">
																	    <input type="file" id="fileUp" onchange="readURL(this)"/>
																	    <i class="fa fa-cloud-upload"></i> Document Upload
																</label> -->
																<input
																style="width: 120%;" type="file" name="photo"
																id="fileUp" onchange="readURL(this)" />
														</div>
													</div>
													
													
													<div class="col-sm-3">
														<div class="form-group" align="center">
															<label class="control-label" style="margin-right: 160px;"> Comment </label>
															
																		<input type="text" class="form-control" style="width: 90%;"
																			id="risDocComment" placeholder = "comment"/>
														</div>
													</div>
													
													<div class="col-sm-3" id="divIdProcess" >
															<div class="form-group" align="center">
																 <label class="control-label" style="margin-right: 150px;"></label> 
																		<button class="btn btn-xs btn-primary" id="saveImage" 
																		title="Save Image" onclick="savePhoto()" type="button"> <b> Save </b> </button>
																		
															</div>
													</div>
											</div>
											

										</div>
									</div>
										
										
																					<!-- imglist -->
											
									<div class="panel panel-default" style="width: 100%;">
										<div class="panel-body">
											<div class="col-md-12">
											
												<div id="imageList" class="col-md-12" style="margin-top: 20px; margin-bottom: 15px;">
													<table class="table table-striped table-bordered">
														<thead class="cf" style="background: white;">
															<tr>
																<th style="height: 21.5px;" class="col-md-1 center">Sr. No.</th>
																<th style="height: 21.5px;" class="col-md-3 center">Document Name</th>
																<th style="height: 21.5px;" class="col-md-3 center">Comment</th>
																<th style="height: 21.5px;" class="col-md-1 center">View Document</th>
																<th style="height: 21.5px;" class="col-md-1 center">Authorised Signatory</th>
																<th style="height: 21.5px;" class="col-md-1 center">Date & Time</th>
																<th style="height: 21.5px;" class="col-md-1 center">Delete</th>
																
															</tr>
														</thead>
														<tbody id="listImg" style="height: 96px;">
														</tbody>
													</table>
													<!-- <div id="listImg" style="margin-top: -21px; height: 255px; max-height: auto;">

													</div> -->
												</div>
											
											</div>
										</div>
									</div>	
											
											<!-- / imglist -->
										
											<!-- S -->
										</div> <!-- close upload document tab div here -->
											
											
										</div>	<!-- END -- <div class="tab-content"> -->
								</div>
							</div>	<!-- END tabbale divs -->

								
							</div>
						</div>
					</div>
				</div>
				<div class="divide-20"></div>
			</div>
			
			
			<!-- START --- SEND Email manual modal 10/NOV/2020 -->
			<div class="modal fade" id="sendRisEmailPopUp"
															tabindex="-1">
															<div class="modal-dialog modal-dialog-centered"
																style="width: 50%;">
																<div class="modal-content">
																	<div class="modal-header">
																		<h3 class="left">
																			<b>Send Report</b>
																		</h3>
																		<!-- <h5 class="left">
																			<b>Patient Name:</b> <label class="control-label"
																				id="patientNameemail"></label>
																		</h5> -->
																	</div>

																	<div class="modal-body">
																		<div class="row">
																			<div class="col-md-12">
																				<div class="container">
																					<div class="panel panel-primary">
																						<div class="panel-heading" id="divEhatContent"></div>
																						<div class="panel-body">
																							<input id="treatmentID" type="hidden" value="0">
																							<input id="masterIdd" type="hidden" value="0">
																							<input id="patientgander1" type="hidden"
																								value="0"> <input id="labrequestId1"
																								type="hidden" value="0">
																							<div class="form-group col-md-6">
																								<label for="exampleInputEmail1">TO: </label> <input
																									type="text" id="emailTo" class="form-control"
																									onchange="validateEmail(this.id)"
																									placeholder="E-Mail">
																							</div>
																							<div class="form-group col-md-6">
																								<label for="exampleInputEmail1">CC: </label> <input
																									type="text" id="emailCC" class="form-control"
																									onchange="validateEmail(this.id)"
																									placeholder="CC">
																							</div>

																							<div class="form-group col-md-4">
																								<label for="exampleInputEmail1">Message
																								</label>
																								<textarea id="mailBodyId" class="form-control"
																									rows="3" style="width: 350px; height: 69px;"
																									placeholder="Message"></textarea>
																							</div>

																							<div class="pull-right" style="margin-top: 8%">
																								<button type="button" class="btn btn-primary"
																									onclick="sendRisReportEmail()">Send
																									Email</button>
																								<button type="button" class="btn btn-warning"
																									onclick="closeSendRisEmailPopup()">Close</button>
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
			
			<!-- END --- SEND Email manual modal -->
			
			<!-- START View Document Modal -->
			
			<div class="modal fade bs-example-modal-lg"
											id="viewDocModal123" tabindex="-1" role="dialog"
											aria-labelledby="myLargeModalLabel" aria-hidden="true">
											<div class="modal-dialog modal-dialog modal-lg">
												<div class="modal-content">
													<div class="modal-header">
														<button type="button" class="close" data-dismiss="modal"
															aria-label="Close">
															<span aria-hidden="true">&times;</span>
														</button>
														<div class="row">
															<div class="col-md-4 col-xs-11">
																<h3 class="modal-title" id="myModalLabel">View
																	document</h3>
															</div>
															<br> <br>
															<div class="col-md-6 col-xs-11">
																<h5></h5>
																<h6 id="documentComment"></h6>
															</div>
														</div>
													</div>
													<div class="modal-body">
														<iframe id="ViewDocumemnt123" width="100%" height="330px"></iframe>
													</div>
												</div>
											</div>
										</div>
			
			<!-- END View Document Modal -->

			<div id="RisPopUp" class="modal fade in" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content" class="col-md-9">
						<div class="modal-header">
							<div class="box-title" style="margin-left: 380px;">
								<h4>
									<i class="fa fa-calendar"></i>Report
								</h4>
								<div style="margin-left:450px;">
						<a style="cursor:pointer;">
							<!-- <button class="btn btn-xs btn-success editUserAccess" style="margin-top:-30px;" value="Print" onclick="risReportPrint()">
							<i id="btnServWise2" class="fa fa-print"></i>
							</button> -->
						</a>
						</div>
							</div>
						</div>
						<div class="modal-body">

							<div ID="ckviewEditor" class="tab-pane fade in active">
								<textarea class="ckeditor ui-widget-content "
									name="viewckeditor1"
									title="Rich Text Editor, RiseditorSubjective"
									placeholder="Content" id="viewckeditor1"></textarea>
							</div>
							
							<div ID="ckviewEditor1" class="tab-pane fade in active" style="display:none;">
								<textarea class="ckeditor ui-widget-content "
									name="viewckeditor2"
									title="Rich Text Editor, RiseditorSubjective"
									placeholder="Content" id="viewckeditor2"></textarea>
							</div>
							<div id="move" style="width: 100%; display: none;"
											class="ui-resizable ui-draggable ui-draggable-handle">
											<textarea class="ckeditor ui-widget-content "
												name="Riseditor1" title="Rich Text Editor, Riseditor1"
												placeholder="Content" id="Riseditor1"></textarea>
										</div>




							<div class="modal-footer">
								<label id="draftlab" style="margin-right: 567px;"></label>
								<button type="button" class="btn btn-primary"
									data-dismiss="modal">Close</button>

							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Sanjay Kr Shah ; code for Q-indicator on 09-03-2018 -->

			<!-- container-main -->

			<div id="divDetailsForm" class="modal fade in" tabindex="-1">

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
								" data-original-title="Save" data-toggle="tooltip"
								data-placement="left" onclick="saveTestDetails()">

								<i class="fa fa-save"></i>

							</button>

						</div>

						<div class="modal-body">

							<div class="col-md-12-1" style="height: 70px;">

								<div class="col-md-3-1">

									<label>Clinical Correlation : </label>

								</div>

								<div class="col-md-3-1">

									<!-- <input type="radio" value="Yes" onchange="hideTxtComment1()"
										name="refByRadio1" id="chkCoRelationY">Yes <input
										type="radio" value="No" onchange="showTxtComment1()"
										id="chkCoRelationN" name="refByRadio1">No -->
										
										<input type="radio" value="Y" name="clinicalCorrelation" id="chkCoRelationY">Yes 
										<input type="radio" value="N" name="clinicalCorrelation" id="chkCoRelationN">No

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

									<!-- <input type="radio" value="Yes" onchange="showTxtComment2()"
										name="refByRadio2" id="chkRedoY">Yes <input
										type="radio" value="No" onchange="hideTxtComment2()"
										name="refByRadio2" id="chkRedoN">No -->
										
										<input type="radio" value="Y" name="redoScan" id="chkRedoY">Yes 
										<input type="radio" value="N" name="redoScan" id="chkRedoN">No

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

									<input type="radio" value="Y" name="contrastReaction" id="chkRelatedReactionY">Yes 
									<input type="radio" value="N" name="contrastReaction" id="chkRelatedReactionN">No

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

									<!-- <input type="radio" value="Yes" onchange="showTxtComment4()"
										name="refByRadio4" id="chkErrorY">Yes <input
										type="radio" value="No" onchange="hideTxtComment4()"
										name="refByRadio4" id="chkErrorN">No -->
										
										<input type="radio" value="Y" name="incident" id="chkErrorY">Yes 
										<input type="radio" value="N"  name="incident" id="chkErrorN">No

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
			</div>
		</section>


	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<select style="display:none;" class="form-control input-SmallText TextFont" id="viewtest" name=""></select>
	<input type="hidden"  id="idInv" value="0">
	<div id="patdet" style="display: none;"><%=request.getParameter("risObjhtm")%></div>
	<div id="viewtypedata" style="display: none;"><%=request.getParameter("typeDetail")%></div>
	<div id="Idradiology" style="display: none;"><%=request.getParameter("idradTestName")%></div>
	<div id="TID" style="display: none;"><%=request.getParameter("Tid")%></div>
	<div id="PID"  style="display: none;"><%=request.getParameter("Pid")%></div>
	<div id="TestID" style="display: none;"><%=request.getParameter("TestID")%></div>
	<div id="idradTestName"  style="display: none;"><%=request.getParameter("idradTestName")%></div>
	<div id="lengthCount"  style="display: none;"></div>

	<input type="hidden"  id="testReportId" value="<%=request.getParameter("testReportId")%>"> <!-- aniket_kanse//primary key of test report in table "ehat_radiology_test_report" -->
	<input type="hidden"  id="centerSpecificFromEmail" value="<%=fromMail%>"> <!-- aniket_kanse// setting from email value to hidden field from Ehatconfiguration properties file -->
	<input type="hidden"  id="reportIdForMail" value="0">
	<input type="hidden"  id="emailRISCallFrom" value="">
	<input type="hidden"  id="patientsEmailId" value="">
	<input type="hidden"  id="createUpdateReportId" value="0"> <!-- CRUD of ris report template -->
	<input type="hidden"  id="viewRISReportId" value="0"> <!-- CRUD of ris record -->
	
	<input type="hidden"  id="pkViewRisRecordsDTO" value="0"> <!-- aniket kanse / 17 DEC 2020 -->
	 <div id="risReportsList" style="display: none;"></div> <!-- onloadList of all ris records -->
	<!-- <input type="hidden"  id="risReportsList" value=""> -->
	
	<div id="pageType"  style="display: none;"><%=request.getParameter("pageType")%></div>
	<div id="idTestRadiology"  style="display: none;"><%=request.getParameter("Idradiology")%></div>
	<div id="page"  style="display: none;"><%=request.getParameter("page")%></div>
	<%
		System.err.print("Vikas "+request.getParameter("idradTestName"));
		request.setAttribute("TID", request.getParameter("Tid"));
	%>

</body>
</html>