<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Stock Return Approval Master</title>
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

	<!-- include js for development -->
	
	<script type="text/javascript" src="js/ehat_inv_subInventory.js"></script>
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
<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
					//	System.out.print("todays_date :::"+todays_date );

					Date date = new Date();
					java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
							"dd/MM/yyyy h:mm:ss a");
					String formattedDate = sdf.format(date);
					System.out.println(formattedDate); // 12/01/2011 4:48:16 PM
			%>
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
												href="inv_stock_return_approval.jsp">Stock Return Approval</a></li>

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
										<div class="input-group" id="stockReturnDiv">
											<input class="form-control"
												title="Please enter document name" id="search_sub_name"
												type="text" placeholder="Enter Store Name OR Store ID"
												onkeyup="subInventoryAutoSuggestion(this.id)">
											<span class="input-group-btn">
												<button class="btn btn-primary editUserAccess"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="getStockReturnDetailsBySubInventoryId()">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search
												</button>
											</span>
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
														<div class="row">
																<div class="panel panel-primary">
																	<div class="panel-heading" id="divEhatContent">Stock Return Approval</div>
																	<div class="panel-body" style="overflow: auto;height: 300px">
																		<table class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Returned Date</th>
																					<th class="col-md-1 center">Status</th>
																					<th class="col-md-1 center">Store Name</th>
																					<th class="col-md-1 center">Edit</th>
																					<th class="col-md-1 center">View</th>
																					<th class="col-md-1 center">Delete</th>
																				</tr>
																			</thead>
																			<tbody id="stockReturnApprovalBody">
																			</tbody>
																		</table>																		
																	</div>
																</div>
														</div>
												</div>
												
											</div>

										</div>
									</div>
									
									<!-- mrn return request modal starts here -->
							<div class="modal fade" data-backdrop="static" data-keyboard="false" id="generateMrnReturnRequestModal" tabindex="-1" role="dialog" aria-labelledby="mrnReturnModalLabel" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document" style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Stock Return Request</h5>
										<div class="row">
								         <div class="pull-right" style="margin-right: 15px;">
								         	<button type="button"  id="saveStockReturn" class="btn btn-primary editUserAccess"
											onclick="updateBatchStockAfterStockReturnRequest()">Save</button>
											<button type="button" class="btn btn-primary btn-danger"
											onclick="refreshStockReturnAfterSaveAndClose();"
											data-dismiss="modal">Close</button>
								         </div>
								         </div>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
													<div class="col-md-12">
																<form id="mrnFormID" onsubmit="return false">
																<input type="hidden" id="subInventoryIdInsideModal"/>
																	<div class="form-row">
																		<div class="form-group col-md-2">
																			<label for="mrnReturnDate">Stock Return Date</label> 
																				<input id="mrnReturnDateId"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="mrnReturnDate" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>
																		<div class="form-group col-md-6">
																					<label for="name" class="col-lg-6">Remark</label>
																					<div class="col-lg-8">
																						<textarea class="form-control"
																							required="true" id="mrnReturnRemark"
																							placeholder="Remark"></textarea>
																					</div>
																		</div>
																	</div>
																</form>
														</div>
														
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"	href="#itemInfo">Item Info</a></li>
															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																					<div class="col-md-12">
																						<div>
																							<div style="overflow:auto" class="col-md-12">
																							
																								<table class='table table-striped table-bordered header-fixed cf' id="mrnReturnRequestTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																										<th class='col-md-1 center'>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-1 center'>Sr.No</th>
																											<th class='col-md-2 center' style="display: none;">Item Id</th>
																											<th class='col-md-2 center'>Item Name</th>
																											<th class='col-md-1 center'>Item Batch Code</th>
																											<th class='col-md-1 center'>Item Batch Exp Date</th>
																											<th class='col-md-1 center'>UOM Unit</th>
																											<th class='col-md-1 center'>Return Quantity</th>
																											<th class='col-md-1 center'>SubInv Quantity</th>
																											<!-- <th class='col-md-1 center'>Main Inventory Quantity</th> -->
																											<th class='col-md-2 center'>Narration</th>
																											<th class='col-md-1 center' style="width:80px;">Stock Return Reason</th>
																											</tr>
																									</thead>																						
																									<tbody id="mrnReturnRequestTableBodyId" style="height: 200px">
																									
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
																
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!-- new modal starts here -->
									<div class="modal-footer">
									
									</div>
									</div>
								</div>
							</div>
							<!-- mrn return request modal ends here -->
							
									
									
									
									
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
		});
	</script>
	<input type="hidden" id=doc_id value="0">
	<input type="hidden" id="mrnReturnId" value="0" />
	<input type="hidden" id="subInventoryNameId" value="NA" />
	<input type="hidden" id="subInventoryId" value="0" />
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>