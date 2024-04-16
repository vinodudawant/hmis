<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Goods Issue</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>
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
												href="inv_goods_issue.jsp">Goods Issue</a></li>
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
										<div class="input-group" id="goodIssueDiv">
											<input type="hidden" id="subInventoryId" /> <input
												type="search" class="typeahead form-control input-SmallText"
												id="generateMRNSearchId" onkeyup="setAutoSubInventoryNameForGoodIssue(this.id)" /> <span class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button" onclick="getGoodIssueById()">
													<span class="fa fa-search" aria-hidden="true" > </span>
													Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4" id="generateMRNButtonId">
										<button class="btn btn-xs btn-info pull-left" type='button'
											data-toggle="modal" data-target="#generateGoodsIssue">
											<i class="fa fa-plus"></i> Generate Goods Issue
										</button>
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="generateGoodsIssue" tabindex="-1" data-backdrop="static" data-keyboard="false"
								role="dialog" aria-labelledby="generateGoodsIssueModalLable"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">
												Goods Issue Note
												<!-- <button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button> -->
												<div class="pull-right" style="margin-right: 15px;">
													<button type="button" class="btn btn-primary"
														onclick="saveGoodsIssue()">Save</button>
													<button type="button" class="btn btn-primary btn-danger"
														onclick="onCloseBtnRefrshPage('inv_goods_issue.jsp');"
														data-dismiss="modal">Close</button>
												</div>
											</h5>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
														<div class="container">
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo" class="tab-pane fade in active">
																	<div class="panel panel-primary">
																		<div class="panel-body">
																			<form id="mrnFormID" onsubmit="return false">
																				<input type="hidden" id="subInventoryIdInsideModal" />
																				<div class="form-row">
																					<div class="form-group col-md-2">
																						<label for="QuatationDate">Issue To<b
																							style="color: red;">*</b></label> <select
																							class="form-control" id="generatedMRNId"
																							onchange="getGoodsIssueDetailsByMRNId(this.value)">
																							<option value="">--Select Status--</option>
																						</select>
																					</div>
																					<div class="form-group col-md-2">
																						<label for="QuatationDate">MRN Date<b
																							style="color: red;">*</b></label> <input id="mrnDate"
																							class="form-control input-SmallText" type="text"
																							readonly="readonly" name="date" placeholder="Date"
																							value="<%=todays_date%>" />
																					</div>
																					<div class="form-group col-md-2"
																						id="partyMasterByName">
																						<label for="parent">SubInventory Name<b
																							style="color: red;">*</b></label> <input type="text"
																							class="form-control tip-focus"
																							id="subInventoryNameId"
																							placeholder="Enter Sub-Inventory Name  "
																							title="Please enter center name"
																							name="subInventoryName" readonly="readonly"
																							data-name="subInventoryName">
																					</div>
																					<div class="form-group col-md-2">
																						<input type="hidden" class="form-control tip-focus" id="hiddenIdForValidation" value="0" />
																					</div>
																				</div>
																			</form>
																			<form id="generalFormId">
																				<div class="row">
																					<div class="col-md-12">
																						<div>
																							<div class="form-group col-md-3 pull-right">
																								<div class="form-group col-md-8">
																									<!-- <button type="button" class="btn btn-success btn-number" onclick="addNewRowInTable('generateGoodsIssueInfoTable','addGoodsIssueRequest')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" onclick="removeRowFromTable('generateGoodsIssueInfoTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button> -->
																								</div>
																							</div>
																							<div style="overflow: auto" class="col-md-12">

																								<table
																									class='table table-striped table-bordered header-fixed cf'
																									id="generateGoodsIssueInfoTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																											<th class='col-md-1 center'>Select <input
																												type="checkbox" id="chkAllCheck"
																												onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-1 center'>Sr.No</th>
																											<th class='col-md-3 center'>Item Name</th>
																											<th class='col-md-2 center' style="display: none;">Item Id</th>
																											<th class='col-md-1 center'>Pending Req Item Quantity</th>
																											<th class='col-md-1 center'>Requested Item Quntity</th>
																											<th class='col-md-2 center'>UOM Unit</th>
																											<th class='col-md-1 center'>Issued Quantity</th>
																											<th class='col-md-1 center'>Current Sub-Inv Stock</th>
																											<th class='col-md-2 center'>Current Inv Stock</th>
																											<th class='col-md-1 center'>Item Batch Code</th>
																											<th class='col-md-1 center'>Batch Expiry Date</th>
																											<th class='col-md-1 center'>Sub Remark MRN</th>
																											<th class='col-md-1 center'>Sub Remark</th>
																											<th class='col-md-2 center'>Accept</th>
																										</tr>
																									</thead>
																									<tbody id="generateGoodsIssueTableBodyId"
																										style="height: 100px">

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
										<!-- new modal starts here -->

										<div class="row">
											<div class="col-md-12">
												<div class="container">
													<input type="hidden" value="OPEN" id="mrnStatusId" />
													<div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Remark</label>
																<div class="col-lg-8">
																	<textarea class="form-control" required="true"
																		id="remark" placeholder="Remark"></textarea>
																</div>
															</div>
														</div>
													</div>
													<!-- <div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Total Item Quantity</label>
																<div class="col-lg-8">
																	<input class="form-control" name="totalItemQuantity" id="totalItemQuantityId"
																		type="text"
																		readonly="readonly" value="0">
																</div>
															</div>
														</div>


													</div> -->
												</div>
											</div>
										</div>
										<div class="modal-footer"></div>
									</div>

								</div>

							</div>
							<!-- modal ends here -->
							<!-- new modal ends here -->
							<!-- new modal starts here -->
							<div id="purchaserequestRejectionModalId" class="modal"
								tabindex="-1" role="dialog">
								<div class="modal-dialog" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title">Mrn Rejection Details</h5>
											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body" style="width: 100%; height: 100px;">
											<div class="col-sm-4">
												<div class="row">
													<div class="form-group">
														<label>Please enter rejection remark:</label> <input
															class="form-control" name="name" id="mrnrejectremark"
															type="text" placeholder="mrn reject remark"
															style="width: 300px">

													</div>
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-primary"
													onclick="setPartyModalInfoToTableOnPurchaseQuotation()">Save
													changes</button>
												<button type="button" class="btn btn-secondary"
													onclick="closemrnRejectionModal()">Close</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- new modal ends here -->
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div>
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab"
												href="#GoodsIssue" id="indentTab">Goods Issue</a></li>
										</ul>
									</div>
									<div class="tab-content">
										<div class="tab-pane fade in active" id="GoodsIssue">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="row">
														<div class="col-md-12">
															<div class="tabbable header-tabs">
																<div class="row" style="margin-top: 10px">
																	<div class="col-md-12">
																		<div class="col-sm-12">
																			<div class="pull-right">
																				<div id="datatable1_filter"
																					class="dataTables_filter">
																					<label id="searchlabel"> </label>
																				</div>
																			</div>
																		</div>
																		<div class="panel panel-primary"
																			style="margin-top: 20px">
																			<div class="panel-heading" id="divEhatContent">Goods
																				Issue Details</div>
																			<div class="panel-body"
																				style="overflow: auto; height: 300px">
																				<table id="ehatTable" cellpadding="0"
																					cellspacing="0" border="0"
																					class="datatable table table-striped table-bordered">
																					<thead id="ehatTHead">
																						<tr>
																							<th class="col-md-2 center">#</th>
																							<th class="col-md-2 center">MRN Id</th>
																							<th class="col-md-2 center">MRN Date</th>
																							<th class="col-md-2 center">MRN Dispatch
																								Date</th>
																							<!-- <th class="col-md-2 center">MRN Remark</th> -->
																							<th class="col-md-2 center">SunInventory
																								Name</th>
																							<th class="col-md-2 center">Status</th>
																						</tr>
																					</thead>
																					<tbody id="goodissueInfoList">
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
										<!-----------------Close Request Div End ------------------->
									</div>
									<!-- new modal starts here -->
									<div id="generateMRNModalId" class="modal" tabindex="-1"
										role="dialog">
										<div class="modal-dialog" role="document">
											<div class="modal-content">
												<div class="modal-header">
													<h5 class="modal-title">Item Master Details</h5>
													<button type="button" class="close" data-dismiss="modal"
														aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div class="modal-body">
													<table id="itemMasterSlaveTableId" cellpadding="0"
														cellspacing="0" border="0"
														class="table table-striped table-bordered">
														<thead id="ehatTHead">
															<tr>
																<th class="col-md-1 center">#</th>
																<th class="col-md-1 center">Item Name</th>
																<th class="col-md-1 center" style="display: none">Item
																	ID</th>
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
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 1</th>
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 2</th>
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 3</th>
																<th class="col-md-1 center" style="display: none">UOM
																	Unit 4</th>
															</tr>
														</thead>
														<tbody id="itemMasterSlaveRecordListOnMRNGenerate">
														</tbody>
													</table>
												</div>
												<div class="modal-footer">
													<button type="button" class="btn btn-primary"
														onclick="setModalInfoToTableOnGenerateMRN()">Save
														changes</button>
													<button type="button" class="btn btn-secondary"
														onclick="closeItemPurchaseDetailsModal()">Close</button>
												</div>
											</div>
										</div>
									</div>
									<!-- new modal ends here -->
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
		<%@include file="inv_footer.jsp"%>
		<!--/PAGE -->

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

				new JsDatePick({
					useMode : 2,
					target : "contactDateofbirth",
					/* dateFormat:"%d-%M-%Y", */
					yearsRange : [ 1920, 2099 ],
					limitToToday : false,
					/* cellColorScheme:"beige", */
					dateFormat : "%d/%m/%Y",
					imgPath : "../img/",
					weekStartDay : 1,
				});

				$('#mrnDate').datepicker({
					autoclose : true
				});

			});
		</script>
		<script>
			onload = function() {
				/* addNewRowInTable('generateGoodsIssueInfoTable','addGoodsIssueRequest'); */
				getGeneratedMRNID();
				getAllGoodIssue();
				//getAllPurchaseRequestMaster("open");
			}
		</script>
		<input type="text" id="goodsIssueId" value="0" />
		<!-- <input type="text" id="mrnItemSlaveId" value="0" /> -->
		<input type="hidden" id="mrnrejectId" value="0">
		<input type="text" id="subInvId" value="0" />

		<input type="hidden" id="hiddenpartyMasterId" value="0" />
		<input type="hidden" id="RowCount" value="0" />
		<input type="hidden" id="totaltblsize" value="0" />
		<input type="hidden" id="callFrom" value="fromnew" />
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>" />
		<input type="hidden" id="userNameId"
			value="<%=session.getAttribute("userName")%>" />
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="hiddenRadioButtonIndex" />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/ehat_inv_purchase_order.js"></script>
	<script type="text/javascript" src="js/ehat_inv_subInventory.js"></script>
	<script type="text/javascript" src="js/ehat_inv_goods_issue.js"></script>

</body>
</html>
