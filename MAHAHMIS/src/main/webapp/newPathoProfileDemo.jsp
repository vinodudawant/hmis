<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Profile</title>
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
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css">
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher">
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css">
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css"/>
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css"/>
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css"/>
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css"/>
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css"/>
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css"/>
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css"/>

<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>

<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
<!-- include js for development -->
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/pathology_labProfile.js"></script>
<!-- <script type="text/javascript" src="js/pathology_labTest.js"></script> -->
<script type="text/javascript" src="js/pathology_groupmaster.js"></script>
</head>
<body>
	<%
	ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");
	String pathologyId = (String) resourceBundle.getObject("pathologyId").toString();
	%>

	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
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
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="pathology_dashboard.jsp">LIS</a></li>
											<!-- <li><a href="PathologyGroups.jsp">Pathology Management</a></li> -->
											<li><a href="newPathoProfileDemo.jsp">Lab Profile</a></li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12">
									 <div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search By</label>
									</div> 
									 <div class="col-md-4">
										<div class="input-group" id="divbyName">
											<input type="search"
												class="typeahead form-control input-SmallText" placeholder="Search Profile Name"
												id="byName" onkeyup="labProfileAutoSuggestion(this.id,'searchProfile');" autocomplete="off"/>
											<span class="input-group-btn">
												<button class="btn btn-primary" onclick="getProfiles('searchBtn')"
													style="height: 25px; margin-bottom: 10px" type="button">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search!
												</button>
											</span>
										</div>
									</div> 

									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left editUserAccess" type='button' onclick="getRequiredData();"
											data-toggle="modal" data-target="#popProfile">
											<i class="fa fa-plus"></i> Add New Profile
										</button>
									</div>

								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="popProfile" tabindex="-1"
								role="dialog" aria-labelledby="popProfile" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 80%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class=" center" id="exampleModalLabel">Add Profile</h5>
											<div class="row">
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button" class="btn btn-primary editUserAccess"
														onclick="saveLabProfile();">Save</button>
													<button type="button" class="btn btn-warning"
														onclick="closePopupBox();" data-dismiss="modal">Close</button>
												</div>
											</div>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
 													<div class="container">
														<div class="panel panel-default">
															<div class="panel-heading" id="divEhatContent">
																<ul class="nav nav-tabs">
																<li class="active"><a id="labProfileLi" data-toggle="tab" href="#labProfileTab" onclick="createTemplateForLabTest()"><b>Lab Profile</b></a></li>
																<li><a data-toggle="tab" href="#regentTab" onclick=""><b>Reagent & Consumables</b></a></li>
																<li><a data-toggle="tab" href="#outlabTab" onclick="hideOutlab()"><b>Outlab</b></a></li>
																<li><a data-toggle="tab" href="#templateTab" onclick=""><b>Template</b></a></li>
																<!-- <li><a data-toggle="tab" href="templatetab" onclick="createTemplateForLabTest()"><b>Create Template</b></a></li> -->
																<!-- <li><a data-toggle="tab" href="#organismTab" onclick="setHideShowSaveBtn('organism')"><b>Organism</b></a></li> -->
																</ul>
															</div>
															<div class="panel-body">
																<div class="tab-content">
																	
																	<div id="outlabTab" class="tab-pane fade in">
																		<div class="col-md-12">
																			<div style="font-weight: bold; overflow: auto;">
																				<table border="1"
																					class="table table-bordered table-hover table-responsive"
																					id="outlabTable" style="overflow: auto;">
																					<thead>
																						<tr>
																							<th class="col-md-1 center">#</th>
																							<th class="col-md-1 center">Type</th>
																							<th class="col-md-1 center">Name</th>
																							<th class="col-md-2 center">Active</th>
																							<th class="col-md-2 center"><input
																								type="button" value="+"
																								onclick="addOutlabRow()" /> <input
																								type="button" value="-"
																								onclick="removeOutlabRow()" /></th>
																						</tr>
																					</thead>
																					<tbody
																						style="overflow-x: scroll; border: 1px solid #436a9d;"
																						id="outlabTableBody"></tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																	
																	<div id="regentTab" class="tab-pane fade in">
																		<div class="form-inline col-md-12">
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="radio"
																					name="reagentType" value="Reagent" onclick="getReagentList('reagent');">Reagent</label>
																			</div>
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="radio"
																					name="reagentType" value="Consumable" checked="checked" onclick="getReagentList('consumable');">Consumable
																				</label>
																			</div>
																		</div>
																		<div class="divide-40"></div>
																		<div class="form-group col-md-3">
																			<label>Item Name</label><b style="color: red;">*</b>
																			<select class="form-control" id="reagentId"
																				onchange="getReagentValues(this.value)">
																				<option value="-1">Select</option>
																			</select>
																		</div>


																		<div class="form-group col-md-3">
																			<label>Quantity</label> <input class="form-control"
																				id="quantity" type="text"/>
																		</div>

																		<div class="form-group col-md-3">
																			<label>Unit Name</label> <input class="form-control"
																				id="unitName" type="text" disabled="disabled" />
																		</div>


																		<!-- <div class="form-group col-md-3">
																			<label>Machine Name</label><b style="color: red;">*</b>
																			<select class="form-control" id="machineName">
																				<option value="-1">Select</option>
																			</select>
																		</div> -->

																		<div class="form-group col-md-3">
																			<label>Test Method</label><b style="color: red;">*</b>
																			<select style="width:100%" id="reagentTestMethodId">
																				<option value="-1">Select</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-2" style="margin-right: 10%">
																		<input type="button" class="btn btn-primary" value="Add" onclick="addRowsForReagentTable()">
																		</div>

																		
																		<div class="row">
																		<div class="divide-40"></div>
																			<div class="col-md-12"
																				style="font-weight: bold; overflow: auto;">
																				<table id="reagentTable" style="overflow: auto;"
																					class="table table-bordered table-hover table-responsive">
																					<thead id="ehatTHead" class="fixedheaderdemo">

																						<tr>
																							<th class="col-md-1 center">#</th>
																							<th class="col-md-1 center">Item</th>
																							<th class="col-md-1 center">Reagent/Consumable</th>
																							<th class="col-md-1 center">Quantity</th>
																							<th class="col-md-1 center">Unit</th>
<!-- 																							<th class="col-md-1 center">Machine Name</th> -->
																							<th class="col-md-1 center">Test Method</th>
																							<th class="col-md-1 center">Delete</th>
																						</tr>
																					</thead>
																					<tbody id="reagentTableBody"
																						style="overflow-x: scroll; border: 1px solid #436a9d;"></tbody>
																				</table>
																			</div>

																		</div>
																	</div>
																	<!----------- Start Template Tab  --------- -->
																	<div id="templateTab" class="tab-pane fade in">
																		<div class="form-group col-md-12">
																			
																				
																					<h4 class="center">
																						<b>Test Template</b>
																					</h4>
																					<div class="row">
																						<div class="form-group col-md-6">
																							<label>Template List</label> <select
																								class="form-control" id="templateId"
																								onchange="getPathologyTemplateById()">
																								<option value="0">New Template</option>


																							</select>
																						</div>

																						<div class="form-group col-md-4">
																							<label>Template Name</label> <input type="text"
																								class="form-control" id="labTestTemplateName"
																								placeholder="Template Name">
																						</div>

																						<div class=" col-md-2">
																							<label>Default</label>
																						</div>
																						<div class=" col-md-1">
																							<input type="checkbox" class="form-group"
																								id="templatedefault">
																						</div>


																						<div class="pull-right"
																							style="margin-right: 15px;">
																							<button type="button" class="btn btn-primary"
																								onclick="savePathologyTemplate()">Save</button>
																							<!-- <button type="button" class="btn btn-warning"
																								onclick="closeTemplatePopUp()"
																								data-dismiss="modal">Close</button> -->
																							<button type="button" class="btn btn-danger"
																								onclick="deletePathologyTemplate()">Delete</button>
																						</div>
																					</div>
																					
																					<br> <br> 
																																								
																					<div class="row">
																						<div class="col-md-12">
																							<div class="container">
																								<div class="panel panel-primary">
																									<div class="panel-heading" id="divEhatContent"></div>
																									<div class="panel-body">

																										<div id="move"
																											style="width: 100%; display: none;"
																											class="ui-resizable ui-draggable ui-draggable-handle">
																											<textarea class="ckeditor ui-widget-content "
																												name="editor1"
																												title="Rich Text Editor, editor1"
																												placeholder="Content" id="editor1"></textarea>
																										</div>
																										<div id="historyTemp" style="width: 100%;"
																											class="tabbable ui-resizable ui-draggable ui-draggable-handle">
																											<div class="divide-10"></div>
																											<div class="tab-content">
																												<div ID="testTemplate"
																													class="tab-pane fade in active">
																													<textarea
																														class="ckeditor ui-widget-content "
																														name="txtEditorTestTemplate"
																														title="Rich Text Editor, editorTestTemplate"
																														placeholder="Content"
																														id="iEditorTestTemplate"></textarea>
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
																	<!----------  End template Tab-------------->
										<div id="labProfileTab" class="tab-pane fade in active">
											<!-- <div class="modal-body">
											<div class="row"> -->
												<div class="col-md-12">
													<div class="container">
														<div class="panel">
															<div class="panel-body">
																<form id="labProfileFormId" onsubmit="return false">
																	<div class="form-row">
																		<div class="form-group col-md-12">
																			<div class="form-group col-md-4">
																				<div class="input-group" id="divbyName">
																					<label for="profileName">Profile Name <b
																						style="color: red;">*</b>
																					</label> 
																					<input type="text" placeholder="Profile Name"
																						class="form-control tip-focus" id="proNm"
																						name="proNm" 
																						onkeyup="subServiceAutoSuggestion(this.id);">
																					<input type="hidden" id="idPro" value="0">
																				</div>
																			</div>

																			<div class="form-group col-md-7">
																				<div class=" col-md-2">
																					<label style="margin-top: 20px;">Is Test</label>
																				</div>
																				<div class=" col-md-1">
																					<input type="checkbox" class="form-group"
																						id="istest" style="margin-top: 20px;">
																				</div>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-4">
																				<label for="type">Heading Name<b style="color: red;">*</b></label> 
																					<select	class="form-control" id="heading"
																							onchange="featchTeastUnderHeading();">
																					<option value="0">--Select Status--</option>
																					
																				</select>
																			</div>
																			<div class="form-group col-md-4">
																				<label for="type">Group Name<b style="color: red;">*</b></label> 
																					<select	class="form-control" id="heading1" onchange="();">
																					<option value="0">--Select Status--</option>
																				</select>
																			</div>
																			
																			
																			<!-- <div class="form-group col-md-10">
																			<div class="form-group col-md-4">
																				<label for="type">Group Name<b style="color: red;">*</b></label> 
																					<select	class="form-control" id="heading"
																							onchange="();">
																					<option value="0">--Select Status--</option>
																				</select>
																			</div>  -->
																			
																			
																			
																			
																			<!-- <div class="form-group col-md-4">
																				<label for="Interpretation">Interpretation</label>
																				<textarea class="form-control"
																					id="txtInterpretation" placeholder="Interpretation"></textarea>
																			</div>
																			<div class="form-group col-md-4">
																				<label for="Comments">Comments</label>
																				<textarea class="form-control" id="txtComments"
																					placeholder="Comments"></textarea>
																			</div> -->
																		</div>

																		<!-- <div class="form-group col-md-12">
																			<div class="form-group col-md-6">
																				<label for="Interpretation">Interpretation</label>
																				<textarea class="form-control"
																					id="txtInterpretation" placeholder="Interpretation"></textarea>
																			</div>
																			<div class="form-group col-md-6">
																				<label for="Comments">Comments</label>
																				<textarea class="form-control" id="txtComments"
																					placeholder="Comments"></textarea>
																			</div>
																		</div> -->

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-1">
																				<label for="Interpretation">Interpretation</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" id="interpretationcheck">
																			</div>
																			<div class="form-group col-md-10" id="interpretation-block" style="display: none">
																				<textarea class="ckeditor ui-widget-content "
																				name="editorObjective"
																				title="Rich Text Editor, editorObjective"
																				placeholder="Content" id="txtInterpretation"></textarea>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-1">
																				<label for="Comment">Comments</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" id="commentcheck">
																			</div>
																			<div class="form-group col-md-10" id="comment-block" style="display: none">
																				<textarea class="ckeditor ui-widget-content "
																				name="editorObjective"
																				title="Rich Text Editor, editorObjective"
																				placeholder="Content" id="txtComments"></textarea>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-1">
																				<label for="Disclaimer">Disclaimer</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" id="disclaimercheck">
																			</div>
																			<div class="form-group col-md-10" id="disclaimer-block" style="display: none">
																				<textarea class="ckeditor ui-widget-content "
																				name="editorObjective"
																				title="Rich Text Editor, editorObjective"
																				placeholder="Content" id="disclaimertxt"></textarea>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-4">
																				<label for="type">Sample Type<b style="color: red;">*</b></label> 
																					<select	class="form-control" id="sampleId">
																						<option value="0">--Select--</option>
																					</select>
																			</div>
																			<div class="form-group col-md-4">
																				<label for="type">Container<b style="color: red;">*</b></label> 
																					<select	class="form-control" id="containerId">
																						<option value="0">--Select--</option>
																				</select>
																			</div>
																			<div class="form-group col-md-4">
																				<label for="type">Unit Type<b style="color: red;">*</b></label> 
																					<select	class="form-control" id="labUnitId">
																						<option value="0">--Select--</option>
																				</select>
																			</div>
																		</div>
																		
																		<div class="form-group col-md-12">
																			<div class="form-group col-md-4">
																				<label>Volume</label> <input type="text"
																					class="form-control" id="volumeName"
																					onkeypress="return validateNumber(event)"
																					placeholder="Volume Name">
																			</div>
																			<div class="form-group col-md-4">
																				<label>Fasting (hrs)</label> <input type="text"
																					class="form-control" id="fasting"
																					placeholder="Fasting"
																					onkeypress="return validateNumber(event)">
																			</div>
																			<div class="form-group col-md-4">
																				<label>TAT (hrs)</label> <input type="text"
																					class="form-control" id="tat"
																					onkeypress="return validateNumber(event)"
																					placeholder="Turn around Time">
																			</div>
																		</div>

																		<div class="divide-20"></div>
																		<div class="form-group col-md-12">
																			<div class=" col-md-2">
																				<label>Temperature Sensitive </label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="tempratureSensitive"
																					placeholder="Temprature Sensitive"
																					onclick="isCheckTempratureSesitive(this.id)">
																			</div>

																			<div id="tempDiv" style="display: none">
																				<div class="col-md-4">
																					<div class="col-md-3">
																						<label>MinTemp (&#8451;)</label>
																					</div>
																					<div class=" col-md-1">
																						<input type="text" class="form-group"
																							id="minTempratureSensitive"
																							onkeypress="return validateNumber(event)"
																							placeholder="Temprature Sensitive">

																					</div>
																				</div>

																				<div class="col-md-4">
																					<div class="col-md-3">
																						<label>MaxTemp (&#8451;)</label>
																					</div>
																					<div class=" col-md-1">
																						<input type="text" class="form-group"
																							id="maxTempratureSensitive"
																							onkeypress="return validateNumber(event)"
																							placeholder="Temprature Sensitive">
																					</div>
																				</div>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-2">
																				<label>Time Sensitive(hrs) </label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="timeSensitive" placeholder="Time Sensitive"
																					onclick="isCheckTimeSensitive()">
																			</div>

																			<div class=" col-md-2" id="timeDiv"
																				style="display: none; margin-left: 1%">
																				<input type="text" class="form-group"
																					id="timeSensitivevalue"
																					placeholder="Time Sensitive">
																			</div>
																		</div>
																		<div class="form-group col-md-12">
																			<div class="form-group col-md-2">
																				<label>Drug Sensitive </label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="drugSensitivity">
																			</div>
																			<div class="form-group col-md-2">
																				<label>NABL(Accradation)</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group" id="nabl">
																			</div>

																			<div class="form-group col-md-2">
																				<label>Processed at Outlab</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" onclick="" class="form-group"
																					id="processTestoutlab" >
																			</div>
																			<div class=" col-md-2" id = "showoutLab">
																				
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-2">
																				<label>Apply Formula</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																							id="applyFormula">
																			</div>

																				<div class="form-group col-md-2">
																					<label>Histopath Lab</label>
																				</div>
																				<div class=" col-md-1">
																					<input type="checkbox" class="form-group"
																						id="histopathLab">
																				</div>
																				
																				<div class="form-group col-md-2">
																					<label>Histopath Wise </label>
																				</div>
																				<div class=" col-md-1">
																					<input type="checkbox" class="form-group" id="chkHistopathwise" onclick="hideShowTestDiv()">
																				</div>
																				
																				<!-- <div class="form-group col-md-2">
																					<label>Organism </label>
																				</div>
																				<div class=" col-md-1">
																					<input type="checkbox" class="form-group" id="chkOrganism" onclick="setProfileOganism()">
																				</div> -->
																				
																			</div>	
																				
																																			
																</div>
																</form>

															<!-- Drag and drop start  -->
															<div class="col-md-12" id="divProfileTestDrag">
																<div class="col-md-6">
																	<div class="box border primary">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-medkit"></i> Test Name (Drag From
																				Here)
																			</h4>
																		</div>
																		<div class="box-body">
																			<div class="col-md-12-1" style="margin-top: 0%;">
																				<table class="table table-bordered"
																					style="width: 100%;">
																					<thead class="cf">
																						<tr>
																							<th class="col-md-1 center"
																								style="height: 21.5px;">
																								<div class="TextFont">#</div>
																							</th>
																							<th class="col-md-11 center"
																								style="height: 21.5px;">
																								<div class="TextFont">Test Name 
																									<input class="form-control"
																										title="Please enter test name"
																										id="searchId" type="text"
																										placeholder="Search test."
																										onkeyup="searchTestByName(this.value)">
																								</div>
																							</th>
																						</tr>
																					</thead>
																				</table>
																			</div>

																			<div class="col-md-12-1"
																				style="margin-top: 0px; margin-bottom: 10px; border: 1px solid #ddd; height: 175px; overflow-y: scroll; width: 100%;">
																				<table id='table-draggable2'
																					class='table table-striped table-condensed cf'>
																					<tbody class="connectedSortable" id="tb1">
																						<tr>
																							<th></th>
																						</tr>
																					</tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>

																<div class="col-md-6">
																	<div class="box border blue">
																		<div class="box-title">
																			<h4>
																				<i class="fa fa-medkit"></i> Test Name (Drop Here)
																			</h4>
																			<div class="pull-right">
																				<label id="newVitals" style="cursor: pointer;"
																					onclick="addHeadingPopup()"> <i
																					class="fa fa-plus-square"></i> Add Heading
																				</label>
																			</div>
																		</div>

																		<div class="box-body">
																			<div class="col-md-12-1" style="margin-top: 0%;">
																				<table class="table table-bordered"
																					style="width: 100%;">
																					<thead class="cf">
																						<tr>
																							<th class="col-md-1 center"
																								style="height: 21.5px;">
																								<div class="TextFont">#</div>
																							</th>
																							<th class="col-md-11 center"
																								style="height: 21.5px;">
																								<div class="TextFont">Test Name</div>
																							</th>
																						</tr>
																					</thead>
																				</table>
																			</div>
																			<div class="col-md-12-1"  id="dropDiv"
																				style="margin-top: 0px; margin-bottom: 10px; border: 1px solid #ddd; height: 200px; overflow-y: scroll; width: 100%;">
																				<table id='table-draggable2'
																					class='table table-striped table-condensed cf'>
																					<tbody class="connectedSortable" id="tb2">
																						<tr>
																							<th></th>
																						</tr>
																					</tbody>
																				</table>
																			</div>
																		</div>
																	</div>
																</div>
															</div> 
															<!-- Drag and drop code End -->
														</div>
															<div id="ipopHead" class="modal fade in" tabindex="-1">
																<div class="modal-dialog">
																	<div class="modal-content col-md-5-1"
																		style="margin-top: 547px; margin-left: 150px;margin-right: 90px;">
																		<div class="modal-header">
																			<div class='col-md-9-1 '>
																				<h4 id="testHead" style="margin-top: 0px;">Please
																					Enter Heading Name:</h4>
																			</div>

																			<div class='col-md-3-1 '>
																				<div class="pull-right">
																					<button class="btn btn-xs btn-success"
																						style="margin-top: -11px; margin-left: 0px;"
																						data-placement="left" title="Add Heading"
																						onclick="addHeadingAsRow('profile');">
																						<i class="fa fa-plus-square"></i>
																					</button>
																					<button class="btn btn-xs btn-danger"
																						data-toggle="tooltip" title="Close"
																						data-dismiss="modal" type="button"
																						style="margin-top: -11px;; margin-left: 0px"
																						onclick="addHeadingPopupHide()">
																						<i class="fa  fa-times"></i>
																					</button>


																				</div>
																			</div>
																		</div>

																		<div class="modal-body">
																			<div class='col-md-4-1 '>
																				<label class="TextFont">Heading Name:</label>
																			</div>
																			<div class='col-md-6-1 center'>
																				<input type='text' style="width: 100%;"
																					name='headingNamePck' id='headingNamePck'
																					maxlength='200' placeholder="Heading Name" />
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														<!-- Add Heading Pop-Up End -->
															<!-- Out Lab Modal start -->
															<div class="modal fade" id="outLab" tabindex="-1"
																role="dialog" aria-labelledby="purchaseOrderModuleModal"
																aria-hidden="true">
																<div class="modal-dialog modal-dialog-centered"
																	role="document" style="width: 90%;margin-top: 20%;">
																	<div class="modal-content">
																		<div class="modal-header">
																			<h5 class="modal-title center" id="exampleModalLabel">Out Lab Details</h5>
																			<div class="row">
																				<div class="pull-right" style="margin-right: 15px;">
																					<button type="button" class="btn btn-primary"
																						onclick="hideOutlab();">Add</button>
																					<button type="button" class="btn btn-warning"
																						onclick="closeOutlab();">Close</button>
																				</div>
																			</div>
																		</div>
																		<div class="modal-body">
																			<div class="row">
																				<div class="col-md-12">
																					<div class="container">
																						<div class="panel">
																							<div class="panel-body">
																								<form id="labProfileFormId"
																									onsubmit="return false">
																									<div id="outlabTab" class="tab-pane fade in">
																										<div class="col-md-12">
																											<div
																												style="font-weight: bold; overflow: auto;">
																												<table border="1"
																													class="table table-bordered table-hover table-responsive"
																													id="outlabTable" style="overflow: auto;">
																													<thead>
																														<tr>
																															<th class="col-md-1 center">#</th>
																															<th class="col-md-1 center">Type</th>
																															<th class="col-md-1 center">Name</th>
																															<th class="col-md-1 center">Active</th>
																															<th class="col-md-1 center"><input
																																type="button" value="+"
																																onclick="addOutlabRow()" /> <input
																																type="button" value="-"
																																onclick="removeOutlabRow()" /></th>
																														</tr>
																													</thead>
																													<tbody
																														style="overflow-x: scroll; border: 1px solid #436a9d;"
																														id="outlabTableBody"></tbody>
																												</table>
																											</div>
																										</div>
																									</div>
																								</form>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!-- Out Lab Modal End -->
														</div>
													</div>
												</div>
											<!-- </div>
										</div> -->
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

							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">					
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary"
																	style="margin-top: 20px">
																	<div class="panel-heading" id="userMangTempDemo">Lab Profiles Details</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 500px">
																		<table id="labProfileTableId" cellpadding="0" cellspacing="0"
																			border="0"
																			class="table table-striped table-bordered">
																			<thead id="labProfileTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">ID</th>
																					<th class="col-md-1 center">Profile Name</th>
																					<th class="col-md-1 center">Code</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="labProfileTableBodyId">
																			</tbody>
																		</table>

																		<div class="pull-right">
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
							<!-- /NEW ORDERS -->
						</div>
						</div>
						
						
													<!-- Test Template Modal -->
							<div class="modal fade" id="viewLabTestTemplate" tabindex="-1"
								role="dialog" aria-labelledby="labTestModal" aria-hidden="true" style="display: none">
								<div class="modal-dialog modal-dialog-centered" role="document"	style="width: 80%;">
									<!-- <div class="modal-content">
										<div class="modal-header">
										<h4 class="center"><b>Test Template</b></h4>
										<div class="row">
											<div class="form-group col-md-6">
												<label>Template List</label> <select class="form-control"
													id="templateId" onchange="getPathologyTemplateById()">
													<option value="0">New Template</option>
													
													
												</select>
											</div>

											<div class="form-group col-md-4">
												<label>Template Name</label> <input type="text"
													class="form-control" id="labTestTemplateName" placeholder="Template Name">
											</div>

											<div class=" col-md-2">
												<label>Default</label>
											</div>
											<div class=" col-md-1">
												<input type="checkbox" class="form-group" id="templatedefault">
											</div>


											<div class="pull-right" style="margin-right: 15px;">
												<button type="button" class="btn btn-primary" onclick="savePathologyTemplate()">Save</button>
												<button type="button" class="btn btn-warning" onclick="closeTemplatePopUp()"	 data-dismiss="modal">Close</button>
											<button type="button" class="btn btn-danger" onclick="deletePathologyTemplate()" >Delete</button>
											</div>
										</div>
									</div>
									<div class="modal-body">
										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<div class="panel panel-primary">
														<div class="panel-heading" id="divEhatContent"></div>
														<div class="panel-body">

															<div id="move" style="width: 100%; display: none;"
																class="ui-resizable ui-draggable ui-draggable-handle">
																<textarea class="ckeditor ui-widget-content "
																	name="editor1" title="Rich Text Editor, editor1"
																	placeholder="Content" id="editor1"></textarea>
															</div>
															<div id="historyTemp" style="width: 100%;"
																class="tabbable ui-resizable ui-draggable ui-draggable-handle">
																<div class="divide-10"></div>
																<div class="tab-content">
																	<div ID="testTemplate" class="tab-pane fade in active">
																		<textarea class="ckeditor ui-widget-content "
																			name="txtEditorTestTemplate"
																			title="Rich Text Editor, editorTestTemplate"
																			placeholder="Content" id="iEditorTestTemplate"></textarea>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div> -->
								</div>
							</div>
							<!-- Test Template End -->
						
						
						

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
<!-- 			</div> -->
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
		
		<!-- Drag and drop code  -->
		<script type="text/javascript">
			$(document).ready(function() {
				var $tabs = $('#table-draggable2')
				$("tbody.connectedSortable").sortable({
					connectWith : ".connectedSortable",
					//items: "> tr:not(:first)",
					appendTo : $tabs,
					helper : "clone",
					zIndex : 999990
				}).disableSelection();

				var $tab_items = $(".nav-tabs > li", $tabs).droppable({
					accept : ".connectedSortable tr",
					hoverClass : "ui-state-hover",
					drop : function(event, ui) {
						return false;
					}
				});

			});
		</script>

		<!-- Drag and drop code  -->
		<script>
			$(document)
					.ready(
							function() {

								$(
										"#table1 .childgrid tr, #table2 .childgrid tr")
										.draggable(
												{
													helper : function() {
														var selected = $('.childgrid tr.selectedRow');
														if (selected.length === 0) {
															selected = $(this)
																	.addClass(
																			'selectedRow');
														}
														var container = $(
																'_$tag_')
																.attr('id',
																		'draggingContainer');
														container
																.append(selected
																		.clone()
																		.removeClass(
																				"selectedRow"));
														return container;
													}
												});

								$("#table1 .childgrid, #table2 .childgrid")
										.droppable(
												{
													drop : function(event, ui) {
														$(this)
																.append(
																		ui.helper
																				.children());
														$('.selectedRow')
																.remove();
													}
												});

								$(document).on("click", ".childgrid tr",
										function() {
											$(this).toggleClass("selectedRow");
										});

							});
		</script>

		<!-- Code for drag and drop -->
		<script>
			jQuery(document).ready(function() {
				App.setPage("pathologyProfileDemo"); //Set current page
				App.init(); //Initialise plugins and elements
				$(function () {
					  $('[data-toggle="tooltip"]').tooltip();
				});
			});
		</script>

		<script type="text/javascript">
			onload = function() {
				$("#pathManagement").addClass("anchorActive");
				getProfiles("onload",1);
				ViewGroupMasterList("onload");
			}
		</script>
		
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

		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="treatId" value=<%=request.getParameter("treatmentId")%> /> 
		<input type="hidden" id="depdocdeskid" value="0" />
		<input type="hidden" id="sourceTypeId" value="0" /> 
		<input type="hidden" id="serviceid" value="0" />  
		<input type="hidden" id="subserviceid" value="0" /> 
		<input type="hidden" id="pId" value="0" /> 
		<input type="hidden" id="tId" value="0" /> 
		<input type="hidden" id="bNo" value="0" /> 
		<input type="hidden" id="bNo" value="0" /> 
		<input type="hidden" id=pathologyId value="<%=pathologyId%>">
		<input type="hidden" id="editPerticularType" value="0" /> 
		<input type="hidden" id="editPerticularId" value="0" /> 
		<input type="hidden" id="generalId" value="0" />
		<input type="hidden" id="categorycharges" value="0"/>
		<input type="hidden" id="proCode" value=""/>
		<input id="edit" type="hidden" value="0">
		<input id="outLabCallFrom" type="hidden" value="save">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>