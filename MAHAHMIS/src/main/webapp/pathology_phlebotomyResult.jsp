<%-- <%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Result</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<script src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript"src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"media="screen"></link>
<link rel="stylesheet" type="text/css"href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script type="text/javascript"src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"media="screen"></link>
<script src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<script type="text/javascript"src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<script type="text/javascript" src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<script type="text/javascript" src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script src="js/script.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<script type="text/javascript" src="ehat-design/js/select2/billing_select2.js"></script>
<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript"src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/OutsourceMaster.js"></script>
<script type="text/javascript" src="js/ehat_pathology_outsource.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("labTestresult"); //Set current page
		App.init(); //Initialise plugins and elements
	});

	jQuery(document).ajaxStart(function() {
		$("body").addClass("loading");
	});

</script>
<script type="text/javascript">
	onload = function() {
		
		setTempateOnPatientinformation(<%=request.getParameter("treatmentId")%>);		
		getsampleRecord(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>);
		
		
		setTimeout(function() {
			getRoutinevalueResutl(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>);
			btnhideShow();
		}, 1000);
		
 		
		getpathologistname();
 		
		$('#collectionTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:5
			 }); 
		$('#reportDueTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:5
			 }); 
		$('#collTimeOut').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:5
			 }); 
		
		$("#idLabResult").val(0);
		
		
	};

	
</script>




<!-- Touheed  for laoding loop-->
<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
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
						java.text.SimpleDateFormat formatter1 = new java.text.SimpleDateFormat(
								"dd/MM/yyyy");
						String current_date = formatter1.format(currentDate.getTime());
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
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
												<li><a href="labTestPatientDashboard.jsp">Lab Test
														Result</a></li>
												<div class="li pull-right">
													<button style="display: none;" class="btn btn-xs btn-success" id="saveBtn"	onclick="saveLabTestRoutineValueResult('save',<%=request.getParameter("id")%>,'U')">Save</button>
													<button style="display: none;" class="btn btn-xs btn-info" id="backtocurrentBtn" onclick="changeStatusOfLabReport('backtocurrent',<%=request.getParameter("id")%>)">Back To Current</button>
													<button style="display: none;" class="btn btn-primary btn-xs" id="saveautoriseBtn" onclick="saveLabTestRoutineValueResult('saveandauthorise',<%=request.getParameter("id")%>,'A')">Save and Authorize</button>
													<button style="display: none;" class="btn btn-xs btn-warning" id="phfBtn" title="Print with Footer and Header" onclick="printRoutineValueResult()">Print(H/F)</button>
													<button style="display: none;" class="btn btn-xs btn-warning" id="prtBtn" title="Print" onclick="printRoutineValueResultW()">Print</button>
													<button style="display: none;" class="btn btn-xs btn-primary" id="postBtn" onclick="changeStatusOfLabReport('post',<%=request.getParameter("id")%>)">Post</button>									
													<button style="display: none;" class="btn btn-xs btn-success" id="authoriseBtn" onclick="changeStatusOfLabReport('authorise',<%=request.getParameter("id")%>)">Authenticate</button>
													<button style="display: none;" class="btn btn-xs btn-danger" id="holdBtn" onclick="changeStatusOfLabReport('hold',<%=request.getParameter("id")%>)">Hold</button>
													<button style="display: none;" class="btn btn-xs btn-danger" id="recallBtn" onclick="changeStatusOfLabReport('recall',<%=request.getParameter("id")%>)">Recall</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div style="margin-top: -10px;">
									<h4 style="padding-left: 2%;">Lab Test Result</h4>
								</div>
								<div class="panel panel-default">
									<div class="panel-body">

										<div class="panel panel-default">
											<div class="panel-body">


												<div class="col-sm-12-1" style="margin-top: 0%;">

													<div class="col-sm-6-1">
														<div class="divide-10"></div>

														<div class="col-sm-12-1">
  														    <div class="form-group Remove-Padding col-md-5-1">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Name :</label> <input type="text" id="patientname"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>

															<div class="form-group Remove-Padding col-md-3-1"
																style="margin-left: 0%;">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Gender :</label> <input type="text" id="patientsex"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>

															<div class="form-group Remove-Padding col-md-3-1"
																style="margin-left: 0%;">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Age :</label> <input type="text" id="patientAge"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>



															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="divide-10"></div>


															<div class="form-group Remove-Padding col-md-7-1">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Address :</label> <input type="text" id="address"
																	class="form-control input-SmallText"  readonly="readonly"/>
															</div>

								
															<div class="form-group Remove-Padding col-md-5-1">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	type :</label> <input type="text" id="patienttype"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>

															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="divide-10"></div>

															<div class="form-group Remove-Padding col-md-12-1">
																<div class="divide-10"></div>
																<label class="TextFont" for="Advice">Advice :</label>
																<div class="divide-10"></div>
																<textarea rows="1" cols="25" id="txtReportNote"
																	maxlength="440" class=" col-md-12-1"></textarea>
															</div>


														</div>

													</div>


													<div class="col-sm-3-1">
												
														<div class="form-group Remove-Padding col-md-10-1"
															style="margin-left: 6%;">
															<div class="divide-10"></div>
															<label class="TextFont" for="TechnicianName">Technician
																:</label> <input type="text" id="TechnicianName"
																value="${sessionScope.userName}"
																class="form-control input-SmallText" readonly="readonly" />

														</div>



														<div class="form-group Remove-Padding col-md-10-1"
															style="margin-left: 6%; margin-top: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont" for="Pathologist">Pathologist
																:</label> <select id="IdPathologist" name="select"
																class="form-control input-SmallText"
																style="margin-top: 0px;">
															</select>
														</div>

													</div>

													<div class="col-sm-3-1">
														<div class="divide-10"></div>
														<div class="col-md-5-1" style="margin-left: 0%; margin-top: -5%;">
															<div class="divide-10"></div>
															<label class="TextFont">Collection Date :</label>
															 <input type="text" id="collectionDate" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div>

														<div class="col-md-5-1" style="margin-left: 0%;  margin-top: -5%;">
															<div class="divide-10"></div>
															<label class="TextFont">Collection Time :</label>
															 <input type="text" id="collectiontime" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div>
                                                       <div class="divide-10"></div>
                                                       <div class="divide-10"></div>
														<div class="col-md-5-1" style="margin-left: 0%;  margin-top: 0%;">
															<div class="divide-10"></div>
															<label class="TextFont">Accepted Date :</label>
															 <input type="text" id="accepteddate" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div>
														<div class="col-md-5-1" style="margin-left: 0%; margin-top: 0%;;">
															<div class="divide-10"></div>
															<label class="TextFont">Accepted Time :</label>
															 <input type="text" id="acceptedtime" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div>
                                                      <input type="hidden" id="patientgander" value="0">
                                                      <input type="hidden" id=flag value="0">                                                    
                                                      <input type="hidden" id="barcodeId" value="<%=request.getParameter("id")%>">
                                                      <input type="hidden" id="treatmentID" value="<%=request.getParameter("treatmentId")%>">
                                                      <input type="hidden" id="labrequestID" value="<%=request.getParameter("testmasterId")%>">
													</div>



												</div>

											</div>



										</div>
										
										
										    <div class="row">
									<div class="col-md-4" style="width:100%">
										<div class="panel panel-primary">
											<div class="panel-heading panel-secondary" id="divEhatContent" >Test Name</div>
												<div class="panel-body" style="overflow: auto;height: 300px;">
												<table class="datatable table table-bordered table-striped table-condensed cf">
													<thead id="ehatTHead">
														<tr>
															<th class="col-md-3 center">Profile Name</th>
															<th class="col-sm-3 center">Test Name</th>
															<th class="ccol-md-2 center">Test Result</th>
														    <th class="col-md-2 center">Normal Values</th>
														    <th class="col-md-2 center">Method</th>
														</tr>
													</thead>
														<tbody id="itemMasterRecordsList" >
														
													</tbody>
													
												</table>
				        <input type="hidden" id=flag value="0">
						<input type="hidden" value="0" id="id" />
						<input type="hidden" value="0" id="phlebotomyprofileid" />
						<input type="hidden" value="0" id="phlebotomyprofiletestid" />
										</div>
									</div>
								</div>
		
				
							</div>

									</div>
								</div>
							</div>
						</div>



						<input type="hidden" value="0" id="idLabResult" /> <input
							type="hidden" value="0" id="btnIdLab" /> <input type="hidden"
							value="0" id="rowNum" /> <input type="hidden" id="idlabtest"
							value="0" />
						<%@include file="Footer.jsp"%>
						<input type="hidden" id="doctor" value="0"> <input
							type="hidden" id="user" value="${sessionScope.userName}" /> <input
							type="hidden" id="userType" value="${sessionScope.userType}" />
						<input type="hidden" id="technician" value="${ sessionScope.userId}" />
						 <input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>"> <input
							type="hidden" id="userId"
							value="<%=session.getAttribute("userId1")%>"> <input
							type="hidden" id="labResultId" value="">

						<div id="patientId" style="display: none;"><%=request.getParameter("patientId")%></div>
						<div id="testDetails" style="display: none;"><%=request.getParameter("myobj")%></div>
						<div id="patientdetails" style="display: none;"><%=request.getParameter("patientdetails")%></div>
						<div id="testmasterId" style="display: none;"><%=request.getParameter("testmasterId")%></div>
						<div id="refDocName" style="display: none;"><%=request.getParameter("refDocName")%></div>
						<div id="treatmentId" style="display: none;"><%=request.getParameter("treatmentId")%></div>
						<div id="userObj" style="display: none;"></div>

					</div>
				</div>
			</div>



		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
	</section>
</body>
</html> --%>


<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Test Phlebotomy</title>
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

<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>	
	<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>


<!-- include js for development -->
<script type="text/javascript" src="js/OutsourceMaster.js"></script>
<script type="text/javascript" src="js/ehat_pathology_outsource.js"></script>


<!-- Touheed  for laoding loop-->
<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
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
				String todays_date = formatter.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterr = new java.text.SimpleDateFormat(
						"dd/MM/yyyy");
				String todays_datee = formatterr.format(currentDate.getTime());
				
				java.text.SimpleDateFormat formatterrr = new java.text.SimpleDateFormat(
						"hh:mm");
				String todays_time = formatterrr.format(currentDate.getTime());
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
													<button style="display: none;" class="btn btn-xs btn-success" id="saveBtn"	onclick="saveLabTestRoutineValueResult('save',<%=request.getParameter("id")%>,'U')">Save</button>
													<button style="display: none;" class="btn btn-xs btn-info" id="backtocurrentBtn" onclick="changeStatusOfLabReport('backtocurrent',<%=request.getParameter("id")%>)">Back To Current</button>
													<button style="display: none;" class="btn btn-primary btn-xs" id="saveautoriseBtn" onclick="saveLabTestRoutineValueResult('saveandauthorise',<%=request.getParameter("id")%>,'A')">Save and Authorize</button>
													<button style="display: none;" class="btn btn-xs btn-warning" id="phfBtn" title="Print with Footer and Header" onclick="printRoutineValueResult()">Print(H/F)</button>
													<button style="display: none;" class="btn btn-xs btn-warning" id="prtBtn" title="Print" onclick="printRoutineValueResultW()">Print</button>
													<button style="display: none;" class="btn btn-xs btn-primary" id="postBtn" onclick="changeStatusOfLabReport('post',<%=request.getParameter("id")%>)">Post</button>									
													<button style="display: none;" class="btn btn-xs btn-success" id="authoriseBtn" onclick="changeStatusOfLabReport('authorise',<%=request.getParameter("id")%>)">Authenticate</button>
													<button style="display: none;" class="btn btn-xs btn-danger" id="holdBtn" onclick="changeStatusOfLabReport('hold',<%=request.getParameter("id")%>)">Hold</button>
													<button style="display: none;" class="btn btn-xs btn-danger" id="recallBtn" onclick="changeStatusOfLabReport('recall',<%=request.getParameter("id")%>)">Recall</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
								
								<div class="alert alert-block alert-info fade in" style="height:0%;">

										<div class="row">
											<div class="col-md-1">
												<img id="patImg" style="width: 100%; height: 60px"
													src="ehat-design/img/profile/avatar.jpg"
													class="img-responsive">
											</div>
											<div class="col-md-11" >

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
															<label class="control-label lblBold">Patient Address
																:</label> <label class="control-label" id="addressNew">
															</label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Collection Date :</label> <label
																class="control-label" id="collectionDate"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Collection Time :</label> <label
																class="control-label" id="collectiontime"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Accepted Date :</label> <label
																class="control-label" id="accepteddate"></label>

														</div>
													</div>
													
													<div class="col-md-2">
														<div class="form-group">
															<label class="control-label lblBold">Accepted Time :</label> <label
																class="control-label" id="acceptedtime"></label>

														</div>
													</div>
													<!-- <div class="col-md-2">
											<div class="form-group">
												<label class="control-label lblBold">DOD :</label> <label
													class="control-label" id="dod"></label>

											</div>
										</div>			 -->
												</div>
											</div>
										</div>
									</div>

								<!-- <div style="margin-top: -10px;">
									<h4 style="padding-left: 2%;">Lab Test Result</h4>
								</div> -->
								<div class="panel panel-default">
									<div class="panel-body">

										<div class="panel panel-default">
											<div class="panel-body">


												<div class="col-sm-12" style="margin-top: 0%;">

														<div class="col-sm-12 form-group">

															<div class="col-md-6 form-group">
																<div class="divide-10"></div>
																<label class="TextFont" for="Advice">Advice :</label>
																<!-- <div class="divide-10"></div> -->
																<textarea rows="1" cols="25" id="txtReportNote"
																	maxlength="440" class=" col-md-12"></textarea>
															</div>

															<div class="col-md-4 form-group">
																<div class="divide-10"></div>
																<label class="TextFont" for="Pathologist">Pathologist
																	:</label>
																<div class="divide-10"></div>
																<select id="IdPathologist" name="select"
																	class="col-md-12 input-SmallText"
																	style="margin-top: 0px;">
																</select>
															</div>

														</div>

														<!-- <div class="col-sm-6">
														<div class="divide-10"></div>

														<div class="col-sm-12">
  														    <div class="form-group Remove-Padding col-md-5">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Name :</label> <input type="text" id="patientname"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>

															<div class="form-group Remove-Padding col-md-3"
																style="margin-left: 0%;">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Gender :</label> <input type="text" id="patientsex"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>

															<div class="form-group Remove-Padding col-md-3"
																style="margin-left: 0%;">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Age :</label> <input type="text" id="patientAge"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>



															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="divide-10"></div>


															<div class="form-group Remove-Padding col-md-7">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	Address :</label> <input type="text" id="address"
																	class="form-control input-SmallText"  readonly="readonly"/>
															</div>

								
															<div class="form-group Remove-Padding col-md-5">
																<div class="divide-10"></div>
																<label class="TextFont" for="Patient Address">Patient
																	type :</label> <input type="text" id="patienttype"
																	class="form-control input-SmallText" readonly="readonly" />
															</div>

															<div class="divide-20"></div>
															<div class="divide-20"></div>
															<div class="divide-10"></div>

															<div class="form-group Remove-Padding col-md-12">
																<div class="divide-10"></div>
																<label class="TextFont" for="Advice">Advice :</label>
																<div class="divide-10"></div>
																<textarea rows="1" cols="25" id="txtReportNote"
																	maxlength="440" class=" col-md-12"></textarea>
															</div>


														</div>

													</div> -->


													<%-- <div class="col-sm-3">
												
														<div class="form-group Remove-Padding col-md-10"
															style="margin-left: 6%;">
															<div class="divide-10"></div>
															<label class="TextFont" for="TechnicianName">Technician
																:</label> <input type="text" id="TechnicianName"
																value="${sessionScope.userName}"
																class="form-control input-SmallText" readonly="readonly" />

														</div>



														<div class="form-group Remove-Padding col-md-10"
															style="margin-left: 6%; margin-top: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont" for="Pathologist">Pathologist
																:</label> <select id="IdPathologist" name="select"
																class="form-control input-SmallText"
																style="margin-top: 0px;">
															</select>
														</div>

													</div> --%>

													<div class="col-sm-3">
														<!-- <div class="divide-10"></div>
														<div class="col-md-5" style="margin-left: 0%; margin-top: -5%;">
															<div class="divide-10"></div>
															<label class="TextFont">Collection Date :</label>
															 <input type="text" id="collectionDate" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div>

														<div class="col-md-5" style="margin-left: 0%;  margin-top: -5%;">
															<div class="divide-10"></div>
															<label class="TextFont">Collection Time :</label>
															 <input type="text" id="collectiontime" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div>
                                                       <div class="divide-10"></div>
                                                       <div class="divide-10"></div>
														<div class="col-md-5" style="margin-left: 0%;  margin-top: 0%;">
															<div class="divide-10"></div>
															<label class="TextFont">Accepted Date :</label>
															 <input type="text" id="accepteddate" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div>
														<div class="col-md-5" style="margin-left: 0%; margin-top: 0%;;">
															<div class="divide-10"></div>
															<label class="TextFont">Accepted Time :</label>
															 <input type="text" id="acceptedtime" value="" readonly="readonly"
																class="form-control input-SmallText" />
														</div> -->
                                                      <input type="hidden" id="patientgander" value="0">
                                                      <input type="hidden" id=flag value="0">                                                    
                                                      <input type="hidden" id="barcodeId" value="<%=request.getParameter("id")%>">
                                                      <input type="hidden" id="treatmentID" value="<%=request.getParameter("treatmentId")%>">
                                                      <input type="hidden" id="labrequestID" value="<%=request.getParameter("testmasterId")%>">
													</div>



												</div>

											</div>



										</div>
										<div class="divide-20"></div>
										
										    <div class="row">
									<div class="col-md-4" style="width:100%">
										<div class="panel panel-primary">
											<div class="panel-heading panel-secondary" id="divEhatContent" >Test Name</div>
												<div class="panel-body" style="overflow: auto;height: 350px;">
												<table class="datatable table table-bordered table-striped table-condensed cf">
													<thead id="ehatTHead">
														<tr>
															<th class="col-md-3 center">Profile Name</th>
															<th class="col-sm-3 center">Test Name</th>
															<th class="ccol-md-2 center">Test Result</th>
														    <th class="col-md-2 center">Normal Values</th>
														    <th class="col-md-2 center">Method</th>
														</tr>
													</thead>
														<tbody id="itemMasterRecordsList" >
														
													</tbody>
													
												</table>
				        <input type="hidden" id=flag value="0">
						<input type="hidden" value="0" id="id" />
						<input type="hidden" value="0" id="phlebotomyprofileid" />
						<input type="hidden" value="0" id="phlebotomyprofiletestid" />
										</div>
									</div>
								</div>
		
				
							</div>

									</div>
								</div>
							</div>
						</div>



							<input type="hidden" value="0" id="idLabResult" /> <input
								type="hidden" value="0" id="btnIdLab" /> <input type="hidden"
								value="0" id="rowNum" /> <input type="hidden" id="idlabtest"
								value="0" />
							<%@include file="Footer.jsp"%>
							<input type="hidden" id="doctor" value="0"> 
							<input type="hidden" id="user" value="${sessionScope.userName}" /> 
							<input type="hidden" id="userType" value="${sessionScope.userType}" />
							<input type="hidden" id="technician" value="${ sessionScope.userId}" />
							<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
							<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>"> 
							<input type="hidden" id="labResultId" value="">

							<div id="patientId" style="display: none;"><%=request.getParameter("patientId")%></div>
							<div id="testDetails" style="display: none;"><%=request.getParameter("myobj")%></div>
							<div id="patientdetails" style="display: none;"><%=request.getParameter("patientdetails")%></div>
							<div id="testmasterId" style="display: none;"><%=request.getParameter("testmasterId")%></div>
							<div id="refDocName" style="display: none;"><%=request.getParameter("refDocName")%></div>
							<div id="treatmentId" style="display: none;"><%=request.getParameter("treatmentId")%></div>
							<div id="userObj" style="display: none;"></div>

						</div>
				</div>
						<%@include file="Footer.jsp"%>
					</div>
					
	</c:if>
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
		});
			jQuery(document).ajaxStart(function() {
				$("body").addClass("loading");
			});

		</script>
		<script type="text/javascript">
			onload = function() {
				
				setTempateOnPatientinformation(<%=request.getParameter("treatmentId")%>);	
				getpathologistname();
				getsampleRecord(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>);
				
				setTimeout(function() {
					getRoutinevalueResutl(<%=request.getParameter("id")%>,<%=request.getParameter("testmasterId")%>,<%=request.getParameter("treatmentId")%>);
					btnhideShow();
				}, 1000);
				
		 		
				
		 		
				$('#collectionTime').datetimepicker({
					 datepicker:false,
					 format:'H:i',
					 step:5
					 }); 
				$('#reportDueTime').datetimepicker({
					 datepicker:false,
					 format:'H:i',
					 step:5
					 }); 
				$('#collTimeOut').datetimepicker({
					 datepicker:false,
					 format:'H:i',
					 step:5
					 }); 
				
				$("#idLabResult").val(0);
				
				
			};
	</script>
	
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>