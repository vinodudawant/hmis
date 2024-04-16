<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Document master</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<style>
#folderTree {
  list-style-type: none;
}

#folderTree {
  margin: 0;
  padding: 0;
}

.drop {
  cursor: pointer;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.drop::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.drop-down::before {
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari */'
  transform: rotate(90deg);  
}

.nested {
  display: none;
}

.active {
  display: block;
}
</style>
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
	<script type="text/javascript" src="js/document_master.js"></script>
</head>

<body>
<c:if test="${ sessionScope.userType != null }">
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
									<li><i class="fa fa-home"></i> <a href="ehat_document_master.jsp">Document Master</a></li>
										
									<div class="li pull-right">
										<div class="form-group">
											<div class="col-md-12">
												<div id="input-type" class="row">

													<div class="col-sm-4">
														<label class="radio-inline">
															<button type="button" id="viewDoc"
																class="pull-right btn btn-xs btn-success btn-table-add-row editUserAccess"
																data-toggle="tooltip" data-placement="left" title="view Recent Document"
																onclick="showRecentDoc()">
																<i id="lblButton">View Recent Upload</i>
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
								<div style="font-weight: bold;" class="col-md-1">UHID</div>
									
								<div style="font-weight: bold;" class="col-md-2">
									<select id="patSearchType" style="width: 100%" class="form-control input-SmallText" onchange="setPatientSearchType1()">
										<option value="1">UHID</option>
										<option value="2">Patient Name</option>
										<option value="3">Patient Mobile</option>
									</select>
								</div>					
									
								<div class="col-md-3 TextFont" id="divbyName">
									<input type="text" placeholder="UHID" class="typeahead form-control input-SmallText" name="search" id="byName" onkeyup="setAutoPatientName1(this.id,'reg')">
								</div>
	
								<div class="col-md-3">
									<label>Reg. Type </label> 
									<input type="radio" class="custom-control-input" name="rdDept" value="0" id="opdId" checked> All
									<input type="radio" class="custom-control-input" name="rdDept" value="1"> OPD 
									<input type="radio"	class="custom-control-input" name="rdDept" value="2"> IPD
								</div>
								
								<!-- <div class="col-md-2">
									<input class="btn btn-xs btn-primary" type="button" value="search" onclick="">
								</div> -->								
							</div>

							<div class="col-md-5 TextFont" id="fromToDt" style="display: none;">
								<label> From</label> 
								<input id="fromDate" type="text" onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
									readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>" /> 
								<label> To</label> 
								<input id="toDate" type="text" onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)"
									readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>" /> 
								<input class="btn btn-xs btn-primary" type="button" value="search" onclick="getPatientDocumentDetails('recent')">
							
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
											<h3 style="font-size: 20px; text-transform: capitalize;">DMS Folder</h3>
											<div class="price green" id="refresh">
												<div class="price_figure" style="padding: 8px">
													<form class="form-horizontal " action="#">
														<div class="col-md-12" style="margin: 0px;">
															<table class="table table-condensed cf table-bordered">
																<thead class='cf'>
																	<tr style="font-weight: bold;">
																		<th class='center TextFont' id="thCenterPatientId"
																			style="width: 5%; color: white; font-size: 12px;">aa</th>
																		<th class='TextFont'
																			style="width: 5%; color: white; font-size: 12px;">Patient Name</th>
																	</tr>
																</thead>																
															</table>
														</div>
													</form>
												</div>
											</div>
											<ul class="features" id="units" style="height: 365px">
												<table class="table table-condensed cf table-bordered">
													<tbody id="contain">
														<tr>
															<td class='center TextFont hidden' style="font-size: 12px;"><label id="patId"></label></td>
															<td class='center TextFont' style="font-size: 12px;"><label id="centerPatientId"></label></td>
															<td class='center TextFont' style="font-size: 12px;"><label id="patName"></label></td>
														</tr>
													</tbody>
												</table>
												<div id="sidebarTree" class="sidebar" style="text-align: left;">												
													<ul id="folderTree" style="line-height: 100%">
													  
													</ul> 
												</div>
												
											</ul>
											<div class="footer">
											
											</div>
										</li>
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Files Found</h3>
											<div class="price green">
												<div class="price_figure" style="padding: 8px">
													<form class="form-horizontal">
														<div class="col-md-12" style="margin: 0px;">
															<table class="table table-condensed cf table-bordered">
																<thead class='cf'>
																	<tr style="font-weight: bold;">
																		<th class='center TextFont'
																			style="width: 5%; color: white; font-size: 12px;"> File</th>
																		<th class='TextFont'
																			style="width: 5%; color: white; font-size: 12px;"> Date</th>
																	</tr>
																</thead>																
															</table>
														</div>
													</form>
												</div>
											</div>
											<ul class="features" id="depts" style="height: 365px">
												<table class="table table-condensed cf table-bordered">
													<tbody id="showDocByTeratment">
														
													</tbody>
												</table>
											</ul>
											<div class="footer">

											</div>
										</li>
										<li class="price_block col-md-4 col-xs-11">
											<h3 style="font-size: 20px; text-transform: capitalize;">Preview</h3>
											<div class="price green">
												<div class="price_figure" style="padding: 8px">
													<form class="form-horizontal " action="#">
														<div>
															<!-- <button type="button" class="btn btn-primary">Transper</button>
															<button type="button" class="btn btn-primary">Delete</button>
															<button type="button" class="btn btn-primary">Next</button>
															<button type="button" class="btn btn-primary">Previous</button>
															<button type="button" class="btn btn-primary">Zoom	In +</button>
															<button type="button" class="btn btn-primary">Zoom Out -</button> -->
															<table class="table table-condensed cf table-bordered">
																<thead class='cf'>
																	<tr style="font-weight: bold;">
																		<th class='center TextFont'
																			style="width: 5%; color: white; font-size: 12px;"> Document Preview</th>																
																	</tr>
																</thead>																
															</table>
														</div>
													</form>
												</div>
											</div>
											<ul class="features" id="services" style="height: 365px">
												<iframe id="preview" style="width: 100%;height: 100%;border: none;" src="file:///C:/DMS/Registration/healing.jpg">
													
												</iframe>
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
												<th class="col-md-3 center" id="thCenterPatientId1">Patient ID</th>
												<th class="col-md-4">Patient Name</th>																		
												<!-- <th class="col-md-1 center">Created Date</th> -->
												<th class="col-md-3 center">Document Name</th>
												<th class="col-md-2 center">Delete</th>
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
													<!-- <th class='TextFont'
														style="width: 5%; color: white; font-size: 15px;">View</th> -->
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
										<form id="dcfileUploadfrm" name="dcfileUploadfrm" enctype="multipart/form-data" method="post">
											<div class="col-md-4">
												<input type="file" name="ifile" id="ifile" multiple="multiple" onchange="uploadFile()"/>
											</div>
										</form>
										
										<div class="col-md-4">
											<button type="button" class="btn btn-primary" onclick="savePatientDocument()">Upload Document</button>
										</div>
									</div>
									
									<div class="progress progress-striped" style="margin-top: 50px">
										<div class="progress-bar progress-bar-success" role="progressbar" id="prgBar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">
											<span class="sr-only">0% Complete</span>
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
	<!-- NESTABLE LISTS -->
	<script type="text/javascript" src="ehat-design/js/nestable/jquery.nestable.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- FUELUX TREE -->
	<script type="text/javascript" src="js/fuelux-tree/fuelux.tree-sampledata.js"></script>
	<script type="text/javascript" src="js/fuelux-tree/fuelux.tree.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("DMS");  //Set current page 
			App.init(); //Initialise plugins and elements 
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			//$('.dd').nestable('collapseAll');			
		});
	</script>
		
	<!-- /JAVASCRIPTS -->	
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">	
	<input type="hidden" id="hdPatientId" value="0">
	<input type="hidden" id="hdTreatmentId" value="0">
	<input type="hidden" id="hdFolderId" value="0">
	<input type="hidden" id="hdFolderName" value="">
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>