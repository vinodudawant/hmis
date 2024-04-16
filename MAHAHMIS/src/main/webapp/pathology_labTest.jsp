<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Test</title>
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
	
	<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
<link href="css/bootstrap-toggle.min.css" rel="stylesheet">


<!-- include js for development -->
<script src="js/bootstrap-toggle.min.js"></script>
	
<!-- CKEDITOR -->
<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
	<!-- include js for development -->
	<script type="text/javascript" src="js/pathology_labTest.js"></script>
	<!-- <script type="text/javascript" src="js/pathology_labs_tests.js"></script> -->
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
											<li>Lab Test</li>
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
										<div class="input-group" id="documentByName">
											<input class="form-control"
												title="Please enter test name" id="searchId" type="text"
												placeholder="Test  Name" onkeyup="searchTestByName(this.value)">
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px; margin-bottom: 10px" type="button" onclick="">
													<span class="fa fa-search" aria-hidden="true"> </span>Search
												</button>
											</span>
										</div>
									</div> 

									<button class="btn btn-xs btn-info pull-left editUserAccess" type='button'
										data-toggle="modal" data-target="#labTestModal" onclick="resetTestForm()">
										<i class="fa fa-plus"></i> Add New Test
									</button>

								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="labTestModal"
								role="dialog" aria-labelledby="labTestModal" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 80%;">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class=" center" id="exampleModalLabel">Add Test
												Master</h4>
											<div class="row">
												<div class="pull-right" style="margin-right: 15px;">
													
														<button type="button" class="btn btn-primary editUserAccess" onclick="saveLabTestMaster()">Save</button>
														<button type="button" data-dismiss="modal"class="btn btn-danger" onclick="resetTestForm();">Close</button>
													
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
																<li  class="active"><a id="labTestLi" data-toggle="tab" href="#labTestTab" onclick=""><b>Lab Test</b></a></li>
																<li><a data-toggle="tab" href="#regentTab"><b>Reagent & Consumables</b></a></li>
																<li><a data-toggle="tab" href="#normalRangeTab" onclick="getAllMachine()"><b>Normal Range</b></a></li>
																<li><a data-toggle="tab" href="#prerequisiteTab" onclick=""><b>Prerequisite</b></a></li>
																<li><a data-toggle="tab" href="#outlabTab" onclick="hideOutlab()"><b>Outlab</b></a></li>
																</ul>
															</div>
															<div class="panel-body">
																<div class="tab-content">
																	
																	<div id="normalRangeTab" class="tab-pane fade in">
																		<div class="form-inline col-md-12">
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label>Report Type:</label><b style="color: red;">*</b>
																			</div>

																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="radio" id="reportType"
																					name="reportType" value="byParameter" checked
																					onclick="getReportTypeValue(),displayGeneralDiv(),getMachineNameWithTestId();">Parameter
																					Wise</label>
																			</div>
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="radio" id="reportType"
																					name="reportType" value="byTemplate"
																					onclick="getReportTypeValue()">Template
																					Wise </label>
																			</div> 
																		</div>
																		
																		<div id="normalValuesDiv"
																			class="form-inline col-md-12">
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label>Normal Values:</label><b style="color: red;">*</b>
																			</div>

																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="radio" id="normalValues"
																					checked name="normalValues" value="individual"
																					onclick="displayGeneralDiv()">Individual</label>
																			</div>
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="radio" id="normalValues"
																					name="normalValues" value="general"
																					onclick="displayGeneralDiv()">General </label>
																			</div>
																			
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="checkbox" id="textValues"
																					name="textValues" value="textValues"
																					>Text </label>
																			</div>
																			
																		</div>
																		
																		
																		
																		<!-- <div class="form-group col-md-3" id="machineIdDiv">
																			<label>Machine Type</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="machineId">
																				<option value="-1">Select</option>
																			</select>
																		</div> -->


																		<div class="col-md-12" style="margin-top: 1%" id="machineDiv">

																			<div class="col-md-2" style="margin-top: 0%">
																				<h6>
																					Machine Name <b style="color: red;">*</b>
																				</h6>
																			</div>
																			
																			<div id="selectmachineDiv"
																				class="form-inline col-md-3">
																				<select style="width: 100%" id="machineId">
																					<option value="-1">Select</option>
																				</select>
																			</div>
																			
																			<div id="addmachineName" class="form-inline col-md-3">
																				<button class="btn btn-primary" name="add"
																					onclick="addMachineValues();">Add Machine</button>
																			</div>
                                                                          
                                                                           <div class="divide-20"></div>
                                                                           
																			<div class="col-md-12" style="font-weight: bold; overflow: auto;margin-top: 1%">
																				<table id="machineNametable" style="overflow: auto; border-style: solid;"
																					class="table table-bordered table-hover table-responsive">
																					<thead id="ehatTHead" class="fixedheaderdemo">
																						<tr style="background-color: lightblue">
																							<th class="col-md-2 center">Machine ID</th>
																							<th class="col-md-1 center" >Machine Name</th>
																							<th class="col-md-1 center" >Default</th>
																							<th class="col-md-1 center" >Delete</th>
																							<th class="col-md-1 center" >View</th>
																							
																						</tr>

																					</thead>
																					<tbody id="machineNametableBody"
																						style="overflow-y: scroll; border: 1px solid #436a9d;">
																					</tbody>
																				</table>
																			</div>
																		</div>



																		<div id="addRemoveButton"
																			class="form-inline col-md-12">
																			<input type="button" value="+" onclick="createRows()" />
																			<input type="button" value="-" onclick="removeRow()" />
																		</div>


                                                                        
																		<div class="col-md-12"
																			style="font-weight: bold; overflow: auto;">
																			<table id="unitToAgeTable"
																				style="overflow: auto; border-style: solid;"
																				class="table table-bordered table-hover table-responsive">
																		<!-- 		<thead id="ehatTHead" class="fixedheaderdemo">

																					<tr>
																						<th class="col-md-1 center" style="background-color: #A0B0E0;">#</th>
																						<th class="col-md-2 center" colspan="2" style="background-color: #FFF0F0;">Age</th>
																						<th class="col-md-6 center" colspan="7" style="background-color: #E0E8F0;">Normal Values</th>
																						<th class="col-md-1 center" id="exression_th1" style="background-color: #F0FFF0;">Expression</th>
																						<th class="col-md-2 center" style="background-color: #FFF0F0;">Gender</th>
																						<th class="col-md-2 center" style="background-color: #E0E8F0;">Unit</th>
																						<th class="col-md-2 center" style="background-color: #F0FFF0;">Special Case</th>
																					</tr>
																					<tr>																			     
																						<th class="col-md-1 center" style="background-color: #A0B0E0;"><input type="button" value="+" onclick="createRows()" />
																			            <input type="button" value="-" onclick="removeRow()" /></th>
																						<th class="col-md-1 center" style="background-color: #FFF0F0;">FAge</th>
																						<th class="col-md-1 center" style="background-color: #FFF0F0;">TAge</th>
																						<th class="col-md-1 center" style="background-color: #E0E8F0;">Non Existant Low <input type="checkbox" id ="nel" checked="checked"/> </th>
																						<th class="col-md-1 center" style="background-color: #E0E8F0;">CL <input type="checkbox" id ="cl" checked="checked"/></th>
																						<th class="col-md-1 center" style="background-color: #E0E8F0;">Low <input type="checkbox" id ="low" checked="checked"/></th>
																						<th class="col-md-1 center" style="background-color: #E0E8F0;">Default <input type="checkbox" id ="default" checked="checked"/></th>
																						<th class="col-md-1 center" style="background-color: #E0E8F0;">High <input type="checkbox" id ="high" checked="checked"/></th>
																						<th class="col-md-1 center" style="background-color: #E0E8F0;">CH <input type="checkbox" id ="ch" checked="checked"/></th>
																						<th class="col-md-1 center" style="background-color: #E0E8F0;">Non Existant High <input type="checkbox" id ="neh" checked="checked"/></th>
																						<th class="col-md-1 center" id="exression_th2" style="background-color: #F0FFF0;"></th>
																						<th class="col-md-2 center" style="background-color: #FFF0F0;"></th>
																						<th class="col-md-2 center" style="background-color: #E0E8F0;"></th>
																						<th class="col-md-2 center" style="background-color: #F0FFF0;"></th>

																					</tr>
																				</thead> -->
																				<!-- <tbody id="tableBody" style="overflow-x: scroll; border: 1px solid #436a9d;"></tbody> -->
																			</table>
																		</div>
																		
																		<div id="templateDiv" class="form-group col-md-12" style="display: none;">
																			<button type="button" id="templateBtn"
																				class="btn btn-primary"
																				onclick="createTemplateForLabTest()">Create
																				Template</button>
																		</div>
																		
																		<div id="generalDiv" class="form-group col-md-9" style="display: none;">
																			<div>
																				<label>General</label><b style="color: red;">*</b>
																			</div>
																			
																			<div id="" class="col-md-5">
																				<textarea class="form-control" id="general"
																				Style="resize: none;" id="general" rows="11" cols="4"
																				placeholder="General"></textarea>
																			</div>
																			
																			<div class="col-md-6">
																				<label for="generalType">General Type</label> 
																				<select class="form-control" id="generalType">
																			      <option value="">--Select Type--</option>
																			      <option value="0">Normal</option>
																			      <option value="1">Abnormal</option>
																			    </select>
																			</div>
																				
																			<div id="" class="col-md-1" style="margin-top: 70px;">
																				<button name="add" onclick="addGeneralValues();">add</button>
																			</div>
																				
																			<div class="col-md-6"
																				style="font-weight: bold; overflow: auto;">
																				<table id="generalValuesTable"
																					style="overflow: auto; border-style: solid;"
																					class="table table-bordered table-hover table-responsive">
																					<thead id="ehatTHead" class="fixedheaderdemo">
																						<tr>
																						<th class="col-md-1 center">#</th>
																						<th class="col-md-2 center" colspan="2">General Value</th>
																						<th class="col-md-1 center"><button>-</button></th>
																						</tr>
																						
																					</thead>
																					<tbody id="generalValuesTableBody"
																						style="overflow-y: scroll; border: 1px solid #436a9d;">
																					</tbody>
																				</table>
																			</div>
																		</div>

                                                                        <div class="form-group col-md-3" id="labUnitIdGeneralDiv">
																			<label>Unit Type</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="labUnitIdGeneral">
																				<option value="-1">Select</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-3" id="biologicalReferenceWithGeneralDiv">
																			<label>Biological Reference</label>
																			<textarea class="form-control" style="resize: none;"
																				id="biologicalReferenceWithGeneral" rows="4" cols="4" placeholder="Biological Reference"></textarea>
																		</div>
																	
																		<div id="noteDiv" class="form-group col-md-12">
																			<label>Note</label>
																			<textarea class="form-control" style="resize: none;"
																				id="note" rows="2" cols="4" placeholder="Note"></textarea>
																		</div>

																		<div id="clinicalUseDiv" class="form-group col-md-12">
																			<label>Clinical Use</label>
																			<textarea class="form-control" id="clinicalUse"
																				style="resize: none;" rows="2" cols="4"
																				placeholder="Clinical Use"></textarea>
																		</div>

																		<div id="increasedLevelDiv"
																			class="form-group col-md-12">
																			<label>Increased Level</label>
																			<textarea class="form-control" id="increasedLevel"
																				style="resize: none;" rows="2" cols="4"
																				placeholder="Increased Level"></textarea>
																		</div>

																		<div id="interpretationDiv"
																			class="form-group col-md-12">
																			<label>Interpretation</label>
																			<textarea class="form-control" id="interpretation"
																				style="resize: none;" rows="2" cols="4"
																				placeholder="Interpretation"></textarea>
																		</div>

																		<div id="commentsDiv" class="form-group col-md-12">
																			<label>Comments</label>
																			<textarea class="form-control" id="comments"
																				style="resize: none;" id="note" rows="2" cols="4"
																				placeholder="Comments"></textarea>
																		</div>
																		
																	</div>


																	<div id="prerequisiteTab" class="tab-pane fade in">
																		<div class="form-group col-md-12">
																			
																			<div class="form-group col-md-1">
																				<label>Height </label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="heightPrerequisite">
																			</div>
																			
																			<div class="form-group col-md-1">
																				<label>Weight</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="weightPrerequisite">
																			</div>
																			
																			<div class="form-group col-md-1">
																				<label>LMP</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="lmpStatus">
																			</div>
																			
																			<div class="form-group col-md-2">
																				<label>Urine Volume</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="urineVolume">
																			</div>
																			
																			 <div class="form-group col-md-2">
																				<label>Drug Sensitive </label>
																			</div> 
																			
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="drugSensitivity">
																			</div> 
																			
																		</div>
																	</div>


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
																					name="reagentType" value="Reagent" onclick="getReagentList('reagent');">  Reagent</label>
																			</div>
																			<div class="col-md-2" style="margin-top: 0%;">
																				<label><input type="radio" checked="checked"
																					name="reagentType" value="Consumable" onclick="getReagentList('consumable');">  Consumable
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
																		
																		<div class="form-group col-md-2">
																		<input type="button" class="btn btn-primary" value="Add" onclick="addRowsForReagentTable()" style="margin-top: 15px;">
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
																							<!-- <th class="col-md-1 center">Machine Name</th> -->
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

																	<div id="labTestTab" class="tab-pane fade in active">

																		<div class="form-group col-md-3">
																			<label>Test Name</label><b style="color: red;">*</b>
																			<input type="text" class="form-control" id="testName"
																				placeholder="Test Name" onblur="validateTest();">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Alias Name</label><b style="color: red;">*</b>
																			<input type="text" class="form-control" id="aliesName"
																				placeholder="Alies Name">
																		</div>

																		<div class="form-group col-md-3">
																			<label>Test Code</label><b style="color: red;">*</b>
																			<input type="text" class="form-control" id="testCode"
																				placeholder="Test Code" onblur="validateTest();">
																		</div>

																		<div class="form-group col-md-3">
																			<label>Heading Name</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="headingId">
																				<option value="-1">Select</option>
																			</select>
																		</div>

																		<div class="form-group col-md-3">
																			<label>Test Method</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="testMethodId">
																				<option value="-1">Select Test Method</option>
																			</select>
																		</div>
																		
																		<!-- <div class="form-group col-md-3">
																			<label>Machine Name</label><b style="color: red;">*</b>
																			<select class="form-control" id="machineNameId">
																				<option value="-1">Select</option>
																			</select>
																		</div> -->

																		<div class="form-group col-md-3">
																			<label>Sample Type</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="sampleId">
																				<option value="-1">Select</option>
																			</select>
																		</div>

																		<div class="form-group col-md-3">
																			<label>Container</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="containerId">
																				<option value="-1">Select</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Unit Type</label><b style="color: red;">*</b>
																			<select style="width: 100%" id="labUnitId">
																				<option value="-1">Select</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Reporting Provision</label> <select class="form-control" id="idProvison" onchange="validateNormalValues();">
																				<option value="0">Select</option>
																				<option value="1">Numeric</option>																			
																				<option value="2">Numeric And AlphaNumeric</option>
																				<option value="3">Alphabet</option>
																			</select>
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Volume</label>
																			<input type="text" class="form-control" id="volumeName"
																				onkeypress="return validateDecimal(event)" placeholder="Volume Name">
																		</div>
																		
																		<div class="form-group col-md-3">
																			<label>Fasting (hrs)</label>
																			<input type="text" class="form-control" id="fasting"
																				placeholder="Fasting" onkeypress="return validateNumber(event)">
																				
																		</div>

																			<div class="form-group col-md-3">
																				<label>TAT (hrs)</label> <input type="text"
																					class="form-control" id="tat" onkeypress="return validateNumber(event)"
																					placeholder="Turn around Time">
																			</div>

																		<div class="divide-20"></div>
																		
																		<!-- <div class="form-group col-md-3">
																			<label>Reporting Decimal</label>
																			<input type="text" class="form-control" id="decimalRoundOff"
																				onkeypress="return validateNumber(event)" placeholder="Decimal Round Off">
																		</div> -->
																		
																		<div class="form-group col-md-12">
																			<div class=" col-md-2">
																				<label>Micro-Organism</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="microorganism"
																					placeholder="microorganism"
																					onclick="isCheckMicroorganism(); checkAlternate('microorganism');">
																			</div>

																			<div id="microorganismDiv" style="display: none">
																			<div class="col-md-4">
																				<div class="col-md-3">
																					<label>count</label>
																				</div>
																				<div class=" col-md-1">
																					<input type="text" class="form-group"
																						id="microorganismCount" onkeypress="return validateNumber(event)"
																						placeholder="microorganism limit">

																				</div>
																			</div>
																			</div>
																		</div>
																		
																		<div class="form-group col-md-12">
																			<div class=" col-md-2">
																				<label>Reporting Decimal</label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="reportingDecimal"
																					placeholder="Temprature Sensitive"
																					onclick="isCheckReportingDecimal()">
																			</div>

																			<div id="reportingDiv" style="display: none">
																			<div class="col-md-4">
																				<div class="col-md-3">
																					<label>Decimals</label>
																				</div>
																				<div class=" col-md-1">
																					<input type="text" class="form-group"
																						id="reportingDecimalValue" onkeypress="return validateNumber(event)"
																						placeholder="Reporting Decimal">

																				</div>
																			</div>
																			</div>
																		</div>
																		
																		<div class="form-group col-md-12">
																			<div class=" col-md-2">
																				<label>Temperature Sensitive </label>
																			</div>
																			<div class=" col-md-1">
																				<input type="checkbox" class="form-group"
																					id="tempratureSensitive"
																					placeholder="Temprature Sensitive"
																					onclick="isCheckTempratureSesitive()">
																			</div>

																			<div id="tempDiv" style="display: none">
																			<div class="col-md-4">
																				<div class="col-md-3">
																					<label>MinTemp (&#8451;)</label>
																				</div>
																				<div class=" col-md-1">
																					<input type="text" class="form-group"
																						id="minTempratureSensitive" onkeypress="return validateNumber(event)"
																						placeholder="Temprature Sensitive">

																				</div>
																			</div>

																			<div class="col-md-4">
																				<div class="col-md-3">
																					<label>MaxTemp (&#8451;)</label>
																				</div>
																				<div class=" col-md-1">
																					<input type="text" class="form-group"
																						id="maxTempratureSensitive" onkeypress="return validateNumber(event)"
																						placeholder="Temprature Sensitive">
																				</div>
																			</div>
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<div class="form-group col-md-2">
																				<label>Time Sensitive(hrs) </label>
																			</div>
																			<div class=" col-md-2" >
																				<input type="checkbox" class="form-group" id="timeSensitive"
																					placeholder="Time Sensitive" onclick="isCheckTimeSensitive()">
																			</div>
																			
																			<div class=" col-md-2" id="timeDiv" style="display: none; margin-left: 1%">
																				<input type="text" class="form-group" id="timeSensitivevalue"
																					placeholder="Time Sensitive">
																			</div>
																		</div>

																		<div class="form-group col-md-12">
																			<!-- <div class="form-group col-md-2">
																				<label>Drug Sensitive </label>
																			</div> 
																			
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="drugSensitivity">
																			</div> -->
																			
																			<div class="form-group col-md-2">
																				<label>NABL(Accreditation)</label>
																			</div>
																			
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="nabl">
																			</div>
																			
																			<div class="form-group col-md-2">
																				<label>Processed at Outlab</label>
																			</div>
																			
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="processTestoutlab">
																			</div>
																			
																			<div class="form-group col-md-2">
																				<label>Prerequisite</label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="prerequisite">
																			</div>
																			
																		</div>
																		<div class="form-group col-md-12">
																			<div class="form-group col-md-2">
																				<label>Trend Analysis</label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="trendanalysisId">
																			</div>
																			
																			<div class="form-group col-md-2">
																				<label>Test Re-run</label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="testRerun">
																			</div>
																			
																			<div class="form-group col-md-2">
																				<label>Qualitative</label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="quantitative" onclick="checkAlternate('quantitative');">
																			</div>
																			
																			</div>
																			
																			<div class="form-group col-md-12">
																			<div class="form-group col-md-2">
																				<label>Biological Reference(Report Reflection)</label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="biologicalReferenceChk">
																			</div>
																			
																			<div class="form-group col-md-2">
																				<label>Sample Type (Report Reflection)</label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="sampleTypeChk">
																			</div>
																			
																			<div class="form-group col-md-2">
																				<label>Test Method (Report Reflection)</label>
																			</div>
																			<div class=" col-md-2">
																				<input type="checkbox" class="form-group"
																					id="testMethodChk">
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

							<div class="row">
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row">
															<div class="col-md-12">																
																<div class="panel panel-primary" style="margin-top: 5px; height: 500px; overflow: scroll;">
																	<div class="panel-heading" id="divEhatContent">Lab Test
																		Table</div>
																	<div class="panel-body">
																		<table id="fixed_header" class="table table-striped table-bordered">
																			<thead id="ehatTHead" class="fixedheaderdemo">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-2 center">Test Name</th>
																					<th class="col-md-2 center">Test Code</th>
																					<th class="col-md-2 center">Edit</th>
																					<th class="col-md-2 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="testTableBody">
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
						</div>
						
							<!-- Test Template Modal -->
							<div class="modal fade" id="viewLabTestTemplate" tabindex="-1"
								role="dialog" aria-labelledby="labTestModal" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 50%;">
									<div class="modal-content">
										<div class="modal-header">
										<h4 class="center"><b>Test Template</b></h4>
										<div class="row">
											<div class="form-group col-md-6">
												<label>Template List</label> <select class="form-control"
													id="templateId" onchange="getTemplateForLabTest(this.value)">
													<option value="-1">New Template</option>
													
												</select>
											</div>

											<div class="form-group col-md-4">
												<label>Template Name</label> <input type="text"
													class="form-control" id="labTestTemplateName" placeholder="Template Name">
											</div>
											<div class="pull-right" style="margin-right: 15px;">
												<button type="button" class="btn btn-primary" onclick="saveTest()">Save</button>
												<button type="button" class="btn btn-warning"
													data-dismiss="modal">Close</button>
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

															<div id="impressionDiv" class="form-group col-md-4">
																<label>Impressions</label>
																<textarea class="form-control" rows="4" cols="20" id="iImpression"
																	placeholder="Impressions "></textarea>
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

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
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

	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#testMethodId").select2();
			$("#reagentTestMethodId").select2();
			$("#headingId").select2();
			$("#labUnitId").select2();
			$("#containerId").select2();
			$("#sampleId").select2();
			$("#labUnitIdGeneral").select2();
		
			getAllTestMethod();
			getAllHeadingList();
			getAllSpecialCase();
			getAllUnitList();
			getAllSampleContainerList();
			getAllLabSampleList();
			
			setTimeout(function() {
				setDropDownUnitList('labUnitId');
			}, 5000);
			getAllSpecialCase();
			getReagentList("consumable");
			getAllLabTest(1);
			hidenormalvalue();
			getMachineList();
			getAllTestMethodNormalValue();
			getAllUnitListGeneral();
			//getAllReagentByTest();
            //getAllUnitListNormalValue(); 
			 //displayGeneralDiv();
			
			//getAllMachine();
		});
	</script>
	<input type="hidden" id=doc_id value="0"> 
	<!-- <input type="hidden" id="idLabReagentDetails" value="0">
	<input type="hidden" id=idOutlab value="0"> -->
	<input type="hidden" id="specialCaseList" value="">
	<input type="hidden" id="unitList" value=""> 
	<input type="hidden" id="unitListNormal" value=""> 
	<input type="hidden" id="methodIdNormalList" value=""> 
	<input type="hidden" id="idLabTest" value="0">
	<input type="hidden" id="labUnitIdHidden" value="0"> 
	<input type="hidden" id="machinIdListHidden" value="0">
	<input type="hidden" id="fromageListHidden" value="0">
	<input type="hidden" id="quantitativeMachineId" value="N">
	<input type="hidden" id="editResponseSetTestId" value="">
	<input type="hidden" id=pathologyId value="<%=pathologyId%>">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>