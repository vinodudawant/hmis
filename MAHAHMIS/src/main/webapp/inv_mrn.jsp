<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Material Request Note</title>
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
<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css" href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css" href="ehat-design/css/responsive.css">
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
<!-- include js for development -->
<!-- <script type="text/javascript" src="js/ehat_inventory.js"></script> -->
<!-- <script type="text/javascript" src="js/ehat_inventory.js"></script> -->
<script type="text/javascript" src="js/inv_mrn.js"></script>
<!-- bootstrap datepicker -->
<link rel="stylesheet" href="ehat-design/datepicker/datepicker3.css">

<style>
.panel-default {
	border-color: #a8bc7b;
}

table,th {
	text-align: center;
}
</style>
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
			<%@include file="inv_left_menu.jsp"%>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="inv_mrn.jsp">MRN</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">
									<div class="col-sm-1">
										<label for="inlineFold" class="control-label">Search
											By</label>
									</div>
									<div class="col-md-4">
										<div class="input-group" id="partyMasterByName">
											<input type="search" placeholder="MRN Id" class="typeahead form-control input-SmallText"
												id="seachPartyMaster" onkeyup="getAutoPartyMaster(this.id)" />
											<span class="input-group-btn">
												<button class="btn btn-primary" style="height: 25px; margin-bottom: 10px" type="button">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left" type='button'
											data-toggle="modal" data-target="#MrnModal" onclick="addNewRowInTableForMrn('mrnItemInfoTable','MRNG')">
											<i class="fa fa-plus"></i> Add New MRN Request
										</button>
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="MrnModal" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">MRN Request
											<!-- <button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button> -->
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button" class="btn btn-primary" onclick="saveMrnMasterDetail();">Save</button>
													<button type="button" class="btn btn-primary btn-danger" onclick="refershMrnMaster('inv_mrn.jsp');" data-dismiss="modal">Close</button>
												</div>
											</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
														<div class="container">
															<div class="tab-content">
																<!-- Item Info tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																					
																					<div class="col-md-12">
																						<div class="row">
																							<div class="form-group col-md-2">
																								<label for="partyName">MRN Date<b
																									style="color: red;">*</b></label> <input type="text"
																									class="form-control tip-focus" id="mrnDate"
																									placeholder="Select Mrn Date"
																									title="Please Select Mrn Date" name="mrnDate">
																							</div>
																							<div class="form-group col-md-2" id="searchSubInventoryDivId">
																								<label for="partyName">Subinventory Name<b
																									style="color: red;">*</b></label> 
																								<input type="text" class="typeahead form-control tip-focus" id="subInvNameId" onkeyup="setAutoSubInventoryName(this.id)" 
																								placeholder="Enter SubInventory name" title="Enter SubInventory name" name="subInvNameId" data-original-title="Enter SubInventory name" onkeyup="setAutoSubInventoryName(this.id)">
																							</div>	
																							<div class="form-group col-md-3 pull-right">
																								<div class="form-group col-md-8">
																									<button type="button" class="btn btn-success btn-number" onclick="addNewRowInTableForMrn('mrnItemInfoTable','MRNG')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" onclick="removeRowFromTableForMrn('mrnItemInfoTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button>																					              	
																							   </div>
																							</div>
																							<div style="overflow:auto" class="col-md-12">
																								<table class='table table-striped table-bordered header-fixed cf' id="mrnItemInfoTable"  style="width: 1000px;height:150px">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th class='col-md-1 center'><div>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></div></th>
																											<th class='col-md-1 center'><div>Sr No</div></th>
																											<th class='col-md-3 center'><div>Item Name</div></th>
																											<th class='col-md-2 center'><div>Mrn Quantity </div></th>
																											<th class='col-md-1 center'><div>UOM</div></th>
																											<th class='col-md-1 center'><div>Current SubInventory Stock</div></th>
																										</tr>
																									</thead>																						
																									<tbody id="mrnItemInfoTableBody">
																									
																									</tbody>
																								</table>
																							</div>
																						</div>
																					
																					</div>
																				</div>
																			</form>
																		</div>
																	</div>
																</div>
																<!-- Item info tab ends here -->
																
															</div>
														</div>
												</div>
											</div>
										</div>
										
										<!-- new modal starts here -->

										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Remark</label>
																<div class="col-lg-8">
																	<textarea type="text" class="form-control"
																		required="true" id="remark"
																		placeholder="Remark"></textarea>
																</div>
															</div>
														</div>
													</div>
													

												
												</div>
											</div>
										</div>
										<div class="modal-footer">
											
										</div>
									</div>
								</div>
							</div>
							<!-- modal ends here -->
							
							<!-- item master modal start  here -->
								<div id="generateMRNModalForMrn" class="modal" tabindex="-1" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title">Item Master Details</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body">
										       <table id="itemMasterSlaveTableId" cellpadding="0" cellspacing="0"
												border="0"
												class="table table-striped table-bordered" >
												<thead id="ehatTHead">
													<tr>
														<th class="col-md-1 center">#</th>
														<th class="col-md-1 center">Item Name</th>
														<th class="col-md-1 center" style="display: none">Item ID</th>
														<th class="col-md-1 center">Item Quantity</th>
														<th class="col-md-1 center">unit Price</th>
														<!-- <th class="col-md-1 center">GST/IGST</th> -->
														<th class="col-md-1 center">CGST Rate</th>
														<th class="col-md-1 center">SGST Rate</th>
														<th class="col-md-1 center">Tax Name</th>
														<th class="col-md-1 center">Tax Rate</th>
														<th class="col-md-1 center">Fact 1</th>
														<th class="col-md-1 center">Fact 2</th>
														<th class="col-md-1 center">Fact 3</th>
														<th class="col-md-1 center">Fact 4</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 1</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 2</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 3</th>
														<th class="col-md-1 center" style="display: none">UOM Unit 4</th>
													</tr>
												</thead>
												<tbody id="itemMasterSlaveRecordListOnMRNGenerate">
												</tbody>
											 </table>
										      </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-primary" onclick="setModalInfoToGenerateMRNItemSalve()" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closeItemMasterPopUpModal()">Close</button>
										      </div>
										    </div>
										  </div>
										</div>
							<!-- item master modal End  here -->

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
																	<div class="panel-heading" id="divEhatContent">Mrn Master Table</div>
																	<div class="panel-body">
																		<table id="ehatTable" class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Mrn ID</th>
																					<th class="col-md-1 center">Mrn Date</th>
																					<th class="col-md-1 center">Mrn Remark</th>
																					<th class="col-md-1 center">Subinventory Name </th>
																					<th class="col-md-1 center">Mrn Raised By </th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">Delete</th>
																					<th class="col-md-1 center">Purchase Request </th>
																				</tr>
																			</thead>
																			<tbody id="mrnMasterInfoList">
																			</tbody>
																		</table>
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


		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<!-- Auto-Suggestion 8/1/2015-->
		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
		<!-- bootstrap datepicker -->
		<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		
		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
		<script>
			/*
			 * @author: Rohit Sandbhor
			 * @date:- 23-10-2019
			 * @codeFor:- below js function to call the getAllWarehouseMasterRecords() on ready
			 */
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});

				$('#mrnDate').datepicker({
					autoclose : true
				});

			});
		</script>
		<script>
			onload = function() {
				getAllMrnMaster();
				getNextItemMasterIdNew();
				
			}
		</script>
		<input type="hidden" id="mrnId" value="0">
		<input type="hidden" id="hiddenSubInvId" value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>
