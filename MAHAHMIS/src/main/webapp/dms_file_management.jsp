<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>File Management </title>
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
	<script type="text/javascript" src="js/validate.js"></script>
	
</head>

<body>
<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
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
									<li><i class="fa fa-home"></i> <a href="dms_file_management.jsp">File Management</a></li>
										
									<div class="li pull-right">
										<div class="form-group">
											<div class="col-md-12">
												<div id="input-type" class="row">

													<div class="col-md-8">
														<label class="radio-inline">
															<button type="button" id="viewDoc"
																class="pull-right btn btn-xs btn-success btn-table-add-row editUserAccess"
																data-toggle="tooltip" data-placement="left" title="view Recent Files"
																onclick="showRecentFiles()">
																<i id="lblButton">View Recent Files</i>
															</button>													
														</label>
													</div>
													
													<div class="col-md-4">
														<label class="radio-inline">
															<button type="button" id="saveFile"
																class="btn btn-xs btn-success btn-table-add-row editUserAccess"
																data-toggle="tooltip" data-placement="left" title="Save File"
																onclick="getTreatMentCount()">
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
							<div id="patSearch">
								<div style="font-weight: bold;" class="col-md-1">Patient Id:</div>
									
								<div style="font-weight: bold;" class="col-md-2">
									<select id="patSearchType" style="width: 100%" class="form-control input-SmallText" onchange="setPatientSearchTypeFM()">
										<option value="1">UHID</option>
										<option value="2">Patient Name</option>
										<option value="3">Patient Mobile</option>
									</select>
								</div>					
									
								<div class="col-md-3 TextFont" id="divbyName">
									<input type="text" placeholder="UHID" class="typeahead form-control input-SmallText" name="search" id="byName" onkeyup="setAutoPatientNameFM(this.id,'reg')">
								</div>
	
								<div class="col-md-3">
									<label>Reg. Type </label> 
									<input type="radio" class="custom-control-input" name="rdDept" value="0" id="opdId" checked> All
									<input type="radio" class="custom-control-input" name="rdDept" value="1"> OPD 
									<input type="radio"	class="custom-control-input" name="rdDept" value="2"> IPD
								</div>								
								 
							</div>

							<div class="col-md-5 TextFont" id="fromToDt" style="display: none;">
								<label> From</label> 
								<input id="fromDate" type="text" onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
									readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>" /> 
								<label> To</label> 
								<input id="toDate" type="text" onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)"
									readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>" /> 
								<input class="btn btn-xs btn-primary" type="button" value="search" onclick="getAllPatientDocumentDetails()">
								
								<div class="col-md-4-1">
								<div style="font-weight: bold;" >Search	By:</div>
								
								<div class="col-md-5 TextFont" id="divbyName">
																		
									<select id="patSearchType1" class="form-control input-SmallText" onchange="setPatientSearchType()">
										<option value="0">Select</option>
										<option value="1">UHID</option>
										<option value="2">Patient Name</option>
									</select>
									
								</div>

								<div class="col-md-5 TextFont" id="divbyName">
									<input name="byName1" type="text" id="byName1" class="form-control input-SmallText"
										onkeyup="setAutoPatientMrd(this.id,'prevIpd',event)" placeholder="Patient Id,Name" autocomplete="off"/>																		
								<br>
								</div>								
							</div>
								
							</div>
	                      	
	                      	<!-- <hr style="border-top: 1px solid lightgray;margin-top: 30px">  -->
                                   
							<!-- BOX -->
							<div class="box" id="mainDiv">
							
								<div class="box-body">
									<ul class="pricing_table row">
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Shelf</h3>
											<div class="price green" id="refresh" style="height: 20px">
												<div class="price_figure" style="padding: 8px">
													<form class="form-horizontal " action="#">
														<div class="col-md-12" style="margin: 0px;">
															
														</div>
													</form>
												</div>
											</div>
											<ul class="features" id="units" style="height: 400px">
												<table class="table table-condensed cf table-bordered">
													<tbody id="contain">
														<tr>															
															<th class='center TextFont' style="font-size: 12px;" id="thCenterPatientId"></th>
															<th class='center TextFont' style="font-size: 12px;">Patient Name</th>
														</tr>
														<tr>
															<td class='center TextFont hidden' style="font-size: 12px;"><label id="patId"></label></td>
															<td class='center TextFont' style="font-size: 12px;"><label id="centerPatientId"></label></td>
															<td class='center TextFont' style="font-size: 12px;"><label id="patName"></label></td>
														</tr>
													</tbody>
												</table>
												
												<table class="table table-condensed cf table-bordered">
													<tbody id="contain1">
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Barcode</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><input class="form-control tip-focus" title="Barcode" id="barcodeId" type="text" readonly="readonly" placeholder="Barcode"> </td>
															<td class='center TextFont' style="font-size: 12px;"><button class="btn btn-xs btn-success" type="button" id="barcodeId" onclick="mrdBarcodePopUp()"><i class="fa fa-barcode"></i></button></td>
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
															<td class='center TextFont' style="font-size: 12px;"><select onchange="createStoreLocation()" name="shelfDetail" id="shelfID" class="col-md-12 full-width-fix form-control" style="width: 95%;">
																	<option value="0">--Select--</option>
																	
																</select></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Storage Location</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><input class="form-control tip-focus" title="Store Location" id="storeLocId" type="text" placeholder="Storage Location"></td>
														</tr>
														
														<tr>
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> File Type</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><select name="filetype" id="filetype" class="col-md-12 full-width-fix form-control" style="width: 95%;">
																	<option value="0">--Select--</option>
																	<option value="1">Regular</option>
																	<option value="2">MLC</option>
																	
																</select></td>
														</tr>
														
														<tr class="hide">
															<td class='center TextFont' style="font-size: 12px;"><label class="control-label"> Duration</label></label></td>
															<td class='center TextFont' style="font-size: 12px;"><input class="form-control tip-focus" title="duration" id="duration" value="0" type="text" placeholder="Duration"></td>
														</tr>
														
													</tbody>
												</table>
												
											</ul>
											<div class="footer">
											</div>
										</li>
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Treatments</h3>
											<div class="price green" style="height: 20px">
												<div class="price_figure" style="padding: 8px">
													<form class="form-horizontal">
														<div class="col-md-12" style="margin: 0px;">
															
														</div>
													</form>
												</div>
											</div>
											<ul class="features" id="depts" style="height: 400px">
												<table class="table table-condensed cf table-bordered">
													
													<thead id="ehatTHead">
														<tr>
															<th class='center TextFont'>#</th>
															<th class='center TextFont'>Treatment</th>
															<th class='center TextFont'>Select</th>
															<th class='center TextFont'>File Status</th>
														</tr>
													</thead>													
													
													<tbody id="showDocByTeratment">													
														
													</tbody>
												</table>
												
											</ul>
											<div class="footer">

											</div>
										</li>
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Document List</h3>
											<div class="price green" style="height: 20px">
												
											</div>
											<ul class="features" id="services" style="height: 400px">
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
										<i class="fa fa-table"></i>Recent Files
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
												<th class="col-md-1 center hidden" >Patient ID</th>
												<th class="col-md-1 center" id="thCenterPatientId1">Patient ID</th>
												<!-- <th class="col-md-1 center">Treatment  ID</th> -->
												<th class="col-md-2">Patient Name</th>																		
												<th class="col-md-1 center">Created Date</th>
												<th class="col-md-1 center">Action</th>
												<th class="col-md-1 center">Delete</th>
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

					<div class="modal fade" id="myModal">
						<div class="modal-dialog">
							<div class="modal-content">

								<!-- Modal Header -->
								<div class="modal-header">
									<h4 class="modal-title" style="background: blue; color: white">Document List</h4>									
								</div>

								<!-- Modal body -->
								<div class="modal-body">

									<div class="" style="margin: 0px;">
										<table class="table table-condensed cf table-bordered"
											style="margin-top: 10px;">
											<thead class='cf' style="background: blue">
												<tr style="font-weight: bold;">
													<th class='center TextFont'
														style="width: 5%; color: white; font-size: 15px;">#</th>
													<th class='center TextFont'
														style="width: 5%; color: white; font-size: 15px;">File</th>
													<th class='TextFont'
														style="width: 5%; color: white; font-size: 15px;">View</th>
													<th class='TextFont'
														style="width: 5%; color: white; font-size: 15px;">Remove</th>
												</tr>
											</thead>
											<tbody id="viewDoctratment">
												
											</tbody>
										</table>
									</div>
									<br> <br> <br>
									<div class="col-md-12">
										<div class="col-md-4">
											<label> Attach File</label>
										</div>

										<div class="col-md-4">
											<input type="file" name="file" id="ifile" multiple="multiple" onclick="uploadFile()"/>
										</div>
										
										<div class="col-md-4">
											<button type="button" class="btn btn-primary" onclick="savePatientDocument()">Upload Document</button>
										</div>
									</div>
								</div>

								<!-- Modal footer -->
								<div class="modal-footer">
									<!-- <button type="button" class="btn btn-primary">Save</button> -->
									<button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
					<!---------------------- Modal  for document End --------- -->	
					
					
					<!--*****************Barcode Print ***************-->

		<!--*****************Barcode Print ***************-->

		<!-- <div id="iPopUp2" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-8-1"
					style="margin-top: 123px; margin-left: 213px;">
					<div class="modal-header">
						<button class="btn btn-xs btn-danger" title="Close" aria-label="Close"
							data-dismiss="modal" type="button"
							style="margin-top: 3px;; margin-left: 347px"
							onclick="closePrintBarcodePopUp()">
							<i class="fa fa-times"></i>
						</button>
						
						<button class="btn btn-xs btn-warning" title="Print" 
							type="button"
							style="margin-top:-20px;; margin-left: 310px"
							onclick="barcodePrintCard()">
							<i class="fa fa-print"></i>
						</button>
						<button class="btn btn-xs btn-warning" title="Print"
							style="margin-top: -39px; margin-left: 312px"
							data-original-title="savepass "
							data-toggle="tooltip" data-placement="left"
							onclick="barcodePrintCard('hori');">
							<i class="fa fa-print"></i>
						</button>
						
						<button class="btn btn-xs btn-warning" title="Print Vertical"
							style="margin-top: -67px; margin-left: 277px"
							data-original-title="savepass "
							data-toggle="tooltip" data-placement="left"
							onclick="barcodePrintCard('ver');">
							<i class="fa fa-print"></i>
						</button>
						
						<input type="hidden" value="0" id="pid11" /> <input type="hidden"
							value="0" id="pName11" />
						<h4 id="testHead" style="margin-top: -36px;">
							<i class="fa fa-print"></i> Print:
						</h4>
					</div>

					<div class="modal-body" style="background-color: #ccffeb;">
						<div class="col-md-12-1">


							<div class="col-md-10">
								<b>Enter No Of Barcode :</b><input id="noOfBarCode" type="text"  onkeypress="return validateNumOnly(event)"	> 
							</div>
							<div class="col-md-4">
								<input id="idPrintCard" type="radio" value="printCard"
									name="printType"> <b>Print Card</b>
							</div>

							<div class="col-md-4">
								<input id="idPrintDetails" type="radio" value="printDetails"
									name="printType"> <b>Print Details</b>
							</div>

							<div class="divide-40"></div>
						</div>

					</div> -->
					
					
					
					<!-- Modal -->
					<div id="iPopUp2" class="modal fade" role="dialog">
						<div class="modal-dialog">
					
					    <!-- Modal content-->
					    <div class="modal-content">
							<div class="modal-header">
					      	<button class="btn btn-xs btn-danger pull-right" title="Close" aria-label="Close"
								data-dismiss="modal" type="button" onclick="closePrintBarcodePopUp()">
								<i class="fa fa-times"></i>
						  	</button> &nbsp&nbsp
							<button class="btn btn-xs btn-warning pull-right" title="Print" type="button" onclick="barcodePrintCard()">
								<i class="fa fa-print"></i>
							</button>
												        <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
					        <h4 class="modal-title">Barcode Print</h4>
					        
					      </div>
					      <div class="modal-body">
					        <div class="col-md-10">
								<b>Enter No Of Barcode :</b><input id="noOfBarCode" type="text"  onkeypress="return validateNumOnly(event)"	> 
							</div>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					      </div>
					    </div>
					
					  </div>
					</div>
					
					
					
				</div>
			</div>
		</div>
		<!--*****************End Print card***************-->
		
		
					

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
			$("#rackId").select2();
			$("#shelfID").select2();
			$("#filetype").select2();
			
			var callFrom = <%=request.getParameter("callFrom")%>;
			if(callFrom == "edit"){
				
				showRecentFiles();
			}		
		});
	</script>
		
	<!-- /JAVASCRIPTS -->	
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="treatmentId" value="0">
		<input type="hidden" id="patientId" value="0">
		<input type="hidden" id="patientName" >
		<input type="hidden" id="patientDocId"value="0" >
	
	
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">	
	<input type="hidden" id="hdPatientId" value="0">
	<input type="hidden" id="hdTreatmentId" value="0">
	<input type="hidden" id="hdFolderId" value="0">
	<input type="hidden" id="hdFolderName" value="">
</body>
</html>