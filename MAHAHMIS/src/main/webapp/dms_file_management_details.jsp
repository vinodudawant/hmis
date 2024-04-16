<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>File Management Details </title>
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
		<script src="jquery/jquery.ajaxfileupload.js" ></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="timepeacker/jquery.datetimepicker.css" />
	<link rel="stylesheet" type="text/css"	href="js/fullcalendar/fullcalendar.min.css" />	
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
	<!-- FUELUX TREE -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/fuelux-tree/fuelux.min.css" />	
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
	<!-- Auto-Suggestion 8/1/2015-->
	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- FONTS -->
	<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
	
	<!-- include js for development -->
	<script type="text/javascript" src="js/mrd_mgt.js"></script>
	
</head>


<script>
function uploadFile() {
	
	var folderName = $("#hdFolderName").val();
	$('input[type="file"]').ajaxfileupload({
		'action' : 'UplodDocMasterServlet',
		 params : {'folderName':folderName},
	});
}
</script>

<body>
<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
			String todays_date = formatter.format(currentDate.getTime());
		%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page"> <!-- SIDEBAR --> 
		<%@include file="left_menu_dms.jsp"%> <!-- /SIDEBAR -->
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
									<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
									</li>
									<li><i class="fa fa-home"></i> <a href="dms_file_management_details.jsp">File Management Details</a></li>
										
									<div class="li pull-right">
										<div class="form-group">
											<div class="col-md-12">
												<div id="input-type" class="row">

													<div class="col-md-4">
														<label class="radio-inline">
															<button type="button" id="saveFile"
																class="btn btn-xs btn-success btn-table-add-row editUserAccess"
																data-toggle="tooltip" data-placement="left" title="Save"
																onclick="viewFileUpdation()">
																<i id="lblButton">Save File</i>
															</button>														
														</label>
													</div>
												</div>
											</div>
										</div>
									</div> 
								</ul>
								
								<!-- /BREADCRUMBS -->
                             
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-md-12">
							<!-- <div id="patSearch">
								<div style="font-weight: bold;" class="col-md-1">Patient Id:</div>
									
								<div style="font-weight: bold;" class="col-md-2">
									<select id="patSearchType" style="width: 100%" class="form-control input-SmallText" onchange="setPatientSearchType1()">
										<option value="1">Patient Id</option>
										<option value="2">Patient Name</option>
										<option value="3">Patient Mobile</option>
									</select>
								</div>					
									
								<div class="col-md-3 TextFont" id="divbyName">
									<input type="text" placeholder="patient id" class="typeahead form-control input-SmallText" name="search" id="byName" onkeyup="setAutoPatientNameFM(this.id,'reg')">
								</div>
	
								<div class="col-md-3">
									<label>Reg. Type </label> 
									<input type="radio" class="custom-control-input" name="rdDept" value="0" id="opdId" checked> All
									<input type="radio" class="custom-control-input" name="rdDept" value="1"> OPD 
									<input type="radio"	class="custom-control-input" name="rdDept" value="2"> IPD
								</div>
								
								<br><br>
								 <div class="col-md-2">
									<input class="btn btn-success" type="button" value="Save" onclick="savePatientDoc()" style="margin-left: 900px">
								</div> 							
						      
							</div> -->

							<%-- <div class="col-md-5 TextFont" id="fromToDt" style="display: none;">
								<label> From</label> 
								<input id="fromDate" type="text" onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)"
									readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>" /> 
								<label> To</label> 
								<input id="toDate" type="text" onclick="displayCalendar(document.getElementById('fromDate1'),'yyyy-mm-dd',this)"
									readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>" /> 
								<input class="btn btn-xs btn-primary" type="button" value="search" onclick="getPatientDocumentDetails('recent')">
							</div> --%>
	                      	
	                      	<hr style="border-top: 1px solid lightgray;margin-top: 30px"> 
                                   
							<!-- BOX -->
							<div class="box" id="mainDiv">
							
								<div class="box-body">
									<ul class="pricing_table row">
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Shelf</h3>
											<div class="price green" id="refresh" style="height:20px">
												<div class="price_figure" style="padding: 8px">
													<form class="form-horizontal " action="#">
														<div class="col-md-12" style="margin: 0px;">
															<!-- <table class="table table-condensed cf table-bordered">
																<thead class='cf'>
																	<tr style="font-weight: bold;">
																		<th class='center TextFont'
																			style="width: 5%; color: white; font-size: 12px;">Pat Id</th>
																		<th class='TextFont'
																			style="width: 5%; color: white; font-size: 12px;">Patient Name</th>
																	</tr>
																</thead>																
															</table> -->
														</div>
													</form>
												</div>
											</div>
											<ul class="features" id="units" style="height: 365px">
												<table class="table table-condensed cf table-bordered">
													<tbody id="contain">
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label id="patId"></label></td>
															<td class='center TextFont' style="font-size: 12px;"><label id="patName"></label></td>
														</tr>
													</tbody>
												</table>
												
												<table class="table table-condensed cf table-bordered">
													<tbody id="contain1">
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Patient Id</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><input class="form-control tip-focus" title="patientId" id="patientId" type="text" placeholder="patientId" readonly="readonly"></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Patient Name</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><input class="form-control tip-focus" title="patientName" id="patientName" type="text" placeholder=" Patient Name" readonly="readonly"></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Barcode</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><input class="form-control tip-focus" title="Barcode" id="barcodeId" type="text" placeholder="Barcode" readonly="readonly"></td>
														</tr>
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Room Name</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><select onchange="getAllRackByRoomId()" name="roomdetails" id="roomID" class="col-md-12 full-width-fix form-control" style="width: 95%; ">
																	<option value="0">--Select--</option>
																	
																</select></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Rack Name</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><select onchange="getAllShelfByRackId()" name="rackdetail" id="rackId" class="col-md-12 full-width-fix form-control" style="width: 95%;">
																	<option value="0">--Select--</option>
																	
																</select></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Shelf  Name</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><select name="shelfDetail" id="shelfID" class="col-md-12 full-width-fix form-control" style="width: 95%;">
																	<option value="0">--Select--</option>
																	
																</select></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> File Type</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><select name="filetype" id="filetype" class="col-md-12 full-width-fix form-control" style="width: 95%;">
																	<option value="0">--Select--</option>
																	<option value="1">Regular</option>
																	<option value="2">MLC</option>
																	
																</select></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Duration</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><input class="form-control tip-focus" title="duration" id="duration" type="text" placeholder="Duration"></td>
														</tr>
														
														
														
													</tbody>
												</table>
												
												<!-- <div id="sidebarTree" class="sidebar" style="text-align: left;">
												
												</div> -->
											</ul>
											<div class="footer">
											</div>
										</li>
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Treatments</h3>
											<div class="price green" style="height:20px">
												<div class="price_figure" style="padding: 8px">
													<form class="form-horizontal">
														<div class="col-md-12" style="margin: 0px;">
															<!-- <table class="table table-condensed cf table-bordered">
																<thead class='cf'>
																	<tr style="font-weight: bold;">
																		<th class='center TextFont'
																			style="width: 5%; color: white; font-size: 12px;"> File</th>
																		<th class='TextFont'
																			style="width: 5%; color: white; font-size: 12px;"> Date</th>
																	</tr>
																</thead>																
															</table> -->
														</div>
													</form>
												</div>
											</div>
											<ul class="features" id="depts" style="height: 365px">
												<table class="table table-condensed cf table-bordered">
													
													<thead id="ehatTHead">
														<tr>
															<th>#</th>
															<th class='center TextFont'>Treatment</th>
															<th  class='center TextFont'>Date</th>
															<th  class='center TextFont'>Select</th>
														</tr>
													</thead>													
													
													<tbody id="showDocByTeratment">
													
														
													</tbody>
												</table>
												
												<!-- <div id="sidebarTree"  style="text-align: left;">
																						
												</div> -->
											</ul>
											<div class="footer">

											</div>
										</li>
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Document List</h3>
											
											<div class="price green" style="height:20px">
												
											</div>
											<ul class="features" id="services" style="height: 365px">
												<table id="ehatTable1" cellpadding="0" cellspacing="0"
													border="0" class="datatable table table-striped table-bordered table-hover">
													<thead id="ehatTHead">
														<tr>
															<th class="col-md-1 center">#</th>
															<th class="col-md-1 center"><input type="checkbox" id="chkAll" onclick="checkAll()"></th>
															<th class="col-md-1 center">Doc ID</th>
															<th class="col-md-1 center">Doc Name</th>
														</tr>
													</thead>

													<tbody id="patientDocDetails">

													</tbody>
												</table>
											</ul>
											<div class="footer">
												
											</div>
										</li>
									</ul>
								</div>
							</div>
							<!-- /BOX -->
													
							<!---------------------- Start Div For View Recent Document--------- -->
							<div class="box border green" id="listDiv" style="display: none;">
								<div class="box-title">
									<h4>
										<i class="fa fa-table"></i>Recent Uploads
									</h4>
									
								</div>
								<div class="box-body" id="divEhatList" style="height: 400px;overflow: auto;">
									<!-- <div class="row"> -->
										<div class="col-sm-12">
											<div class="pull-right">
												<div id="datatable1_filter" class="dataTables_filter">
													<label id="searchlabel"> <!-- <input class="form-control input-sm"
														type="text" aria-controls="datatable1"
														placeholder="Search"> -->
													</label>
												</div>
											</div>	
										</div>
									<!-- </div> -->
								
									<table id="ehatTable" class="datatable table table-striped table-bordered table-hover" cellspacing="0" cellpadding="0" border="0">
										<thead id="ehatTHead">																	
											<tr>
												<th class="col-md-1 center">#</th>
												<th class="col-md-1 center">Patient ID</th>
												<th class="col-md-1">Patient Name</th>																		
												<th class="col-md-1 center">Created Date</th>
												<th class="col-md-1">Document Name</th>
											</tr>
										</thead>
										
										<tbody id="viewDocDetails">

										</tbody>										
									</table>
								</div>
							</div>
							<!---------------------- End Div For View Recent Document- --------- -->		
						</div>
					</div>

					<!---------------------- Modal  for document start --------- -->

					<div class="modal fade" id="fileUpdationDetails">
						<div class="modal-dialog">
							<div class="modal-content">

								<!-- Modal Header -->
								<div class="modal-header">
									<h4 class="modal-title" style="background: blue; color: white">File Updation Details</h4>									
								</div>

								<!-- Modal body -->
								<!-- <div class="modal-body">

									<div class="">
									<div >
									<label>Requested By:  </label>
									<input type"text" id="requestedBy">
									
										
																	
									</div>
									
									<br>
									 <div >
									<label>Hander Over To:*</label>
									<input type"text" id="handoverTo">									
									</div> 
									
									<br>
									<div>
									<label  >Notes:* </label>
									<textarea id="note" class="col-md-11-1" requird="true" name="txtDoctorAddress" placeholder="Enter Note" style="width:60%;"></textarea>								
									</div>										
									 <br>
								     <div>								     
								     <button type="button" class="btn btn-primary" onclick="savePatientDoc()">Save</button>
								     
								     </div>		
										
									</div>
									
									</div> -->
									
									
									<ul class="features" id="units" style="padding: 10px 86px; height: 300px;">
												
												<table class="table table-condensed cf table-bordered">
													<tbody id="contain1">
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label>Requested By:  </label></td>
															<td class='center TextFont' style="font-size: 12px;"><input type"text" id="requestedBy"></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label>Hander Over To:*</label></td>
															<td class='center TextFont' style="font-size: 12px;"><input type"text" id="handoverTo"></td>
														</tr>
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label  >Notes:* </label></td>
															<td class='center TextFont' style="font-size: 12px;"><textarea id="note" class="col-md-11-1" requird="true" name="txtDoctorAddress" placeholder="Enter Note" style=""></textarea></td>
														</tr>
														<tr>
															<td class='center TextFont' style="font-size: 12px;"></td>
															<td class='center TextFont' style="font-size: 12px;"><button type="button" class="btn btn-primary" onclick="savePatientDoc()">Save</button></td>
														</tr>
																												
													</tbody>
												</table>
												
												<!-- <div id="sidebarTree" class="sidebar" style="text-align: left;">
												
												</div> -->
											</ul>

								<!-- Modal footer -->
								<div class="modal-footer">
									<!-- <button type="button" class="btn btn-primary">Save</button> -->
									<button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
					<!---------------------- Modal  for document End --------- -->					

					<div class="footer-tools">
						<span class="go-top"> <i class="fa fa-chevron-up"></i> Top </span>
					</div>
				</div>
				<!-- /CONTENT-->
			</div>
		</div>	
	</div>
	
	<%@include file="footer_nobel.jsp"%> </section>
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
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	<!-- FUELUX TREE -->
	<script type="text/javascript" src="ehat-design/js/fuelux-tree/fuelux.tree-sampledata.js"></script>
	<script type="text/javascript" src="ehat-design/js/fuelux-tree/fuelux.tree.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("DMS");  //Set current page 
			App.init(); //Initialise plugins and elements 
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});	
			getAllRoomMasterDoc();
			$("#roomID").select2();
			$("#rackId").select2();
			$("#shelfID").select2();
			$("#filetype").select2();
			var patientId=$("#hdPatientId").val();			
			var CallFrom=$("#CallFrom").val();
			if(patientId>0){
				 
				 viewPatientDocDetails(patientId,CallFrom);
			}
		});
	</script>
		
	<!-- /JAVASCRIPTS -->
	<input type="hidden" id=hdPatientId value="<%=request.getParameter("patientId")%>">
	<input type="hidden" id=CallFrom value="<%=request.getParameter("CallFrom")%>">			
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<!--  <input type="hidden" id="treatmentId" value="0">
		<input type="hidden" id="patientId" value="0">
		<input type="hidden" id="patientName" >
	  -->
	   <input type="hidden" id="patientDocId" value="0">
	
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">	
<!-- 	<input type="hidden" id="hdPatientId" value="0">
 -->	<input type="hidden" id="hdTreatmentId" value="0">
	<input type="hidden" id="hdFolderId" value="0">
	<input type="hidden" id="hdFolderName" value="">
</body>
</html>