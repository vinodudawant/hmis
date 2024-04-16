<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Purchase Request Master</title>
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
					//	Date dtHMS = new Date();

					//	System.out.print(datewithHMS.getHours()+":"+datewithHMS.getMinutes()+":"+datewithHMS.getSeconds());
					//	String Time = dtHMS.getHours() + ":" + dtHMS.getMinutes() + ":"	+ dtHMS.getSeconds();
					//System.out.print("aaaaaa :" + Time);
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
												href="inv_purchase_request_master.jsp">Purchase Request</a></li>
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
										<div class="input-group" id="purchaseRequestByName">
											<input type="search"
												class="typeahead form-control input-SmallText"
												id="searcyPRequestId"
												onkeyup="getPurchaseRequestMaster(this.id)" /> <span
												class="input-group-btn">
												<button class="btn btn-primary"
													style="height: 25px; margin-bottom: 10px" type="button"
													onclick="getPurchaseRequestMasterById()">
													<span class="fa fa-search" aria-hidden="true"> </span>
													Search!
												</button>
											</span>
										</div>
									</div>
									<div class="col-md-4">
										<button class="btn btn-xs btn-info pull-left" type='button'
											data-toggle="modal" data-target="#itemMasterModal">
											<i class="fa fa-plus"></i> Add New Request
										</button>
									</div>
								</div>
							</div>

							<!-- modal starts here -->
							<div class="modal fade" id="itemMasterModal" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Review MRN </h5>

											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Review MRN </div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<div class="form-group col-md-2">
																		<label for="partyId">MRN ID</label> <input type="text"
																			placeholder="MRN ID" class="form-control tip-focus"
																			id="mrnNo" readonly="true" name="MRN ID">
																	</div>

																	<div class="form-row">



																		<div class="form-group col-md-2">
																			<label for="QuatationDate">MRN Date<b
																				style="color: red;">*</b></label> 
																				<input id="mrnDate"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>



																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="parent">SubInventory Name<b
																				style="color: red;">*</b></label> <input type="text"
																			readonly="readonly"	class="form-control tip-focus" id="subInvNameId"
																				placeholder="Enter Sub Inv Name  "
																				title="Please enter center name" name="Sub Inv Name"
																				data-name="centerName">
																		</div>







																	</div>
																	<!-- <span class="badge badge-primary">Item No</span> -->

																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"	href="#itemInfo">Item Info(F2)</a></li>



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
																							<div class="form-group col-md-3 pull-right">
																								<div class="form-group col-md-8">
																									<button type="button" class="btn btn-success btn-number" onclick="addNewRowInTable('purchaserequestInfoTable','purchaserequest')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" onclick="removeRowFromTable('purchaserequestInfoTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button>																					              	
																							   </div>
																							</div>
																							<div style="height: 180px ;overflow-y: scroll" class="col-md-12">
																							
																								<table class='table table-responsive table-striped table-bordered header-fixed cf' id="purchaserequestInfoTable" >
																									<thead class='cf' style='background: white;width: 10000px'>
																										
																											
																										<tr>
																										<th class='col-md-2 center'>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-1 center'>Sr.No</th>
																											<th class='col-md-3 center'>Item	Name</th>
																											<th class='col-md-1 center'>Item	Quantity</th>
																											<th class='col-md-1 center'>Reviewed Quantity</th>
																											<th class='col-md-1 center'>Purchase Request Qty</th>
																											<th class='col-md-1 center'>Last PO Quantity</th>
																											<th class='col-md-1 center'>Last PO Number</th>
																											<th class='col-md-1 center'>Last GRN Number</th>
																											<th class='col-md-1 center'>Last Consumption(2 Months)	</th>
																											<th class='col-md-1 center'>UoM</th>
																											<th class='col-md-1 center'>Status</th>
																											<th class='col-md-1 center'>PO</th>
																											<th class='col-md-1 center'>PO Qty</th>
																											<th class='col-md-1 center'>STO</th>
																											<th class='col-md-1 center'>STO Qty</th>
																											 <th class='col-md-2 center'>SubInventory Name</th> 
																											<th class='col-md-1 center'>Available Qty</th>
																											<th class='col-md-1 center'>Current Lab Stock</th>
																											</tr>
																									</thead>																						
																									<tbody id="purchaserequestInfoTableBody">
																									
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
													<div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Note</label>
																<div class="col-lg-8">
																	<textarea type="text" class="form-control"
																		required="true"		id="Note"
																		placeholder="note"></textarea>
																</div>
															</div>
														</div>


													</div>

													<div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label for="name" class="col-lg-4">Current User
																	Name</label>
																<div class="col-lg-8">
																	<input class="form-control" name="name" id="mrncurrentusername"
																		type="text" placeholder="Net Amount"
																		readonly="readonly" value="0.0">
																</div>
															</div>
														</div>


													</div>
												</div>
											</div>
										</div>
									<div class="modal-footer">
									<button type="button" class="btn btn-primary"
										onclick="savePurchaseRequestMaster()" id="savePurchase">Save</button>
									<button type="button" class="btn btn-secondary"
										onclick="refershMrnPurchaseRequest('inv_purchase_request_master.jsp');"
										data-dismiss="modal">Close</button>
								</div>
									</div>
									
								</div>
								
							</div>
							<!-- modal ends here -->
							
							<!-- modal start for po processing here -->
							
							<div class="modal fade" id="itemMasterModalForPO" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Purchase Order Processing </h5>

											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Purchase Order </div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<div class="form-group col-md-2">
																		<label for="partyId">MRN ID</label> <input type="text"
																			placeholder="MRN ID" class="form-control tip-focus"
																			id="mrnIdForPO" readonly="true" name="MRN ID">
																	</div>

																	<div class="form-row">



																		<div class="form-group col-md-2">
																			<label for="OrderDate">Order Date<b
																				style="color: red;">*</b></label> 
																				<input id="orderDate"
																				class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>



																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="deliveryDate">Delivery Date <b
																				style="color: red;">*</b></label> <input type="text"
																				class="form-control tip-focus" id="deliveryDate"
																				placeholder="Enter center Name  "
																				title="Please enter center name" name="supplier"
																				 value="<%=todays_date%>" data-name="centerName">
																		</div>







																	</div>
																	<!-- <span class="badge badge-primary">Item No</span> -->

																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"	href="#itemInfo1">Item Info(F2)</a></li>



															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo1" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																					
																					<div class="col-md-12">
																						<div>
																							<div class="form-group col-md-3 pull-right">
																								<div class="form-group col-md-8">
																									<button type="button" class="btn btn-success btn-number" onclick="addNewRowInTable('purchaserequestPOInfoTable','po')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" onclick="removeRowFromTable('purchaserequestPOInfoTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button>																					              	
																							   </div>
																							</div>
																							<div style="overflow:auto" class="col-md-12">
																							
																								<table class='table table-striped table-bordered header-fixed cf' id="purchaserequestPOInfoTable" style="width: 3000px">
																									<thead class='cf' style='background: white;'>
																										
																											
																										<tr>
																										<th class='col-md-2 center'>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-2 center'>Sr.No</th>
																											<th class='col-md-2 center'>Item	Name</th>
																											<th class='col-md-2 center'>Item	Quantity</th>																											
																											<th class='col-md-2 center'>Purchase Request Qty</th>
																											<th class='col-md-2 center'>Processed Quantity</th>
																											<th class='col-md-2 center'>Purchase Type</th>
																											<th class='col-md-2 center'>Quantity</th>
																											<th class='col-md-2 center'>Supplier Name</th>
																											<th class='col-md-2 center'>Unit Price</th>
																											<th class='col-md-2 center'>Disc(%)</th>
																											<th class='col-md-2 center'>Disc(Rs)</th>
																											<th class='col-md-2 center'>Disc(Amt)</th>
																											<th class='col-md-2 center'>Base Amount</th>
																											<th class='col-md-2 center'>Tax Code</th>
																											<th class='col-md-2 center'>Tax Amount(%)</th>
																											<th class='col-md-2 center'>Tax Amount(Rs) 	</th>
																											<th class='col-md-2 center'>Total Amount</th>
																											<th class='col-md-2 center'>Ordered Quantity</th>
																											<th class='col-md-2 center'>Pending Quantity</th>
																											<th class='col-md-2 center'>Temperature</th>
																											</tr>
																									</thead>																						
																									<tbody id="purchaserequestPoInfoTableBody" style="height: 200px">
																									
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
									<button type="button" class="btn btn-primary"
										onclick="saveProcessPurchaseOrderMaster()">Save</button>
									<button type="button" class="btn btn-secondary"
										onclick="closePurchaseRequestPOModal('inv_purchase_request_master.jsp');"
										data-dismiss="modal">Close</button>
								</div>
									</div>
									
								</div>
								
							</div>
							<!-- modal end for po processing here -->
							
							<!-- modal Start for sto processing here -->
							
							
							<div class="modal fade" id="itemMasterModalForSO" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Stock Transper Processing </h5>

											<button type="button" class="close" data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<div class="row">
												<div class="col-md-12">
													<div class="container">
														<div class="panel panel-primary">
															<div class="panel-heading" id="divEhatContent">Stock Transper </div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<div class="form-group col-md-2">
																		<label for="partyId">MRN ID</label> <input type="text"
																			placeholder="MRN ID" class="form-control tip-focus"
																			id="mrnIdSO" readonly="true" name="MRN ID">
																	</div>

																	<div class="form-row">



																		<div class="form-group col-md-2">
																			<label for="OrderDate">Stock Date<b
																				style="color: red;">*</b></label> 
																				<input id="stockDate"	class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="<%=todays_date%>" />
																		</div>



																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="remarkso">Remark <b
																				style="color: red;">*</b></label> 
																				<textarea type="text" class="form-control"	required="true" id="remarksto"
																		placeholder="Remark"></textarea>
																		</div>
																		
																		
																		<div class="form-group col-md-2"
																			id="partyMasterByName">
																			<label for="remarkso">Stock Transper From <b
																				style="color: red;">*</b></label> 
																				<input id="subInvName"	class="form-control input-SmallText" type="text"
																				 name="date" placeholder="Sub Inv Name"
																				 />
																		</div>







																	</div>
																	<!-- <span class="badge badge-primary">Item No</span> -->

																</form>
															</div>
														</div>
														<div class="container" style="margin-top: 2%;">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"	href="#itemInfo1">Item Info(F2)</a></li>



															</ul>
															<div class="tab-content">
																<!-- general tab starts here -->
																<div id="itemInfo1" class="tab-pane fade in active">
																	<div class="panel panel-primary"
																		style="margin-top: 20px">
																		<div class="panel-body">
																			<form id="generalFormId">
																				<div class="row">
																					
																					<div class="col-md-12">
																						<div>
																							<div class="form-group col-md-3 pull-right">
																								<div class="form-group col-md-8">
																									<button type="button" class="btn btn-success btn-number" onclick="addNewRowInTable('stocktransperInfoTable','so')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" onclick="removeRowFromTable('stocktransperInfoTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button>																					              	
																							   </div>
																							</div>
																							<div style="overflow:auto" class="col-md-12">
																							
																								<table class='table table-striped table-bordered header-fixed cf' id="stocktransperInfoTable" style="width: 3000px">
																									<thead class='cf' style='background: white;'>
																										
																											
																										<tr>
																										<th class='col-md-2 center'>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-2 center'>Sr.No</th>
																											<th class='col-md-2 center'>Item	Name</th>
																											<th class='col-md-2 center'>Batch</th>																											
																											<th class='col-md-2 center'>Expiray Date</th>
																											<th class='col-md-2 center'>Available Quantity</th>
																											<th class='col-md-2 center'>Transper Quantity</th>
																											<th class='col-md-2 center'>Transper  Request Quantity</th>
																											<th class='col-md-2 center'>SubInventory Name</th>
																											
																											</tr>
																									</thead>																						
																									<tbody id="stocktransperInfoTableBody" style="height: 200px">
																									
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
									<button type="button" class="btn btn-primary"
										onclick="savestockTransperMaster()">Save</button>
									<button type="button" class="btn btn-secondary"
										onclick="closePurchaseRequestStOModal('inv_purchase_request_master.jsp');"
										data-dismiss="modal">Close</button>
								</div>
									</div>
									
								</div>
								
							</div>
							
							
							<!-- modal end for sto processing here -->
							
							
							
							<!-- new modal ends here -->
													<!-- new modal starts here -->
										<div id="purchaserequestRejectionModalId" class="modal" tabindex="-1" role="dialog">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title">Mrn Rejection Details</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body" style="width:100%; height:100px;">
										     <div class="col-sm-4">
														<div class="row">
															<div class="form-group">
																<label >Please enter rejection remark:</label>
																
																<input class="form-control" name="name" id="mrnrejectremark" type="text" placeholder="mrn reject remark" style="width: 300px">
																
															</div>
														</div>


													</div>
											 
										      <div class="modal-footer">
										        <button type="button" class="btn btn-primary" onclick="rejectMrnRequest()" >Save changes</button>
										        <button type="button" class="btn btn-secondary" onclick="closemrnRejectionModal()">Close</button>
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
											<li class="active"><a data-toggle="tab" href="#openRequest" onclick="getAllPurchaseRequestMaster('open');" > Open Request</a></li>
											<li><a data-toggle="tab" href="#closeRequest" onclick="getAllPurchaseRequestMaster('close')"> Close Request</a></li>
											<li><a data-toggle="tab" href="#mrnRejection" onclick="getAllPurchaseRequestMaster('rejection');"> MRN Reject</a></li>
											<li><a data-toggle="tab" href="#poproceesing" onclick="getAllPurchaseRequestMaster('po');"> Po Processing</a></li>
											<li><a data-toggle="tab" href="#stoproceesing" onclick="getAllPurchaseRequestMaster('so');"> Stock Transper Processing</a></li>
											<!-- <li><a data-toggle="tab" href="#poclosed" onclick="getAllPurchaseRequestMaster('poclose');"> Po Closed</a></li> -->			
										</ul>
									</div>
									<div class="tab-content">
                                    <div class="tab-pane fade in active" id="openRequest">
									<div class="panel panel-default" >
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
																	<div class="panel-heading" id="divEhatContent">Open Request Table</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-2 center">#</th>
																					<th class="col-md-2 center">MRN Id</th>
																					<th class="col-md-2 center">MRN Date</th>
																					<th class="col-md-2 center">MRN Remark</th>
																					<th class="col-md-2 center">SubInventory Name</th>
																					<th class="col-md-2 center">Review</th>
																					<th class="col-md-2 center">Hold</th>
																					<th class="col-md-2 center">MRN Rejection</th>
																				</tr>
																			</thead>
																			<tbody id="openrequestInfoList">
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
									<!-----------------Close Request Div Start ------------------->
									<div class="tab-pane fade" id="closeRequest">
										<div class="panel panel-default" >
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
																	<div class="panel-heading" id="divEhatContent">Close Request Table</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">MRN Id</th>
																					<th class="col-md-1 center">MRN Date</th>
																					<th class="col-md-1 center">MRN Remark</th>
																					<th class="col-md-1 center">SubInventory Name</th>
																					<th class="col-md-1 center">View</th>
																					
																				</tr>
																			</thead>
																			<tbody id="closerequestInfoList">
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
										
										<!-----------------Mrn Rejection Div Start ------------------->
										<div class="tab-pane fade" id="mrnRejection">
										<div class="panel panel-default" >
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
																	<div class="panel-heading" id="divEhatContent">Mrn Reject Table</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">MRN Id</th>
																					<th class="col-md-1 center">MRN Date</th>
																					<th class="col-md-1 center">Rejection Date</th>
																					<th class="col-md-1 center">MRN Remark</th>
																					<th class="col-md-1 center">MRN Reject Remark</th>
																					<th class="col-md-1 center">SubInventory Name</th>
																					<th class="col-md-1 center">View</th>
																					
																				</tr>
																			</thead>
																			<tbody id="mrnrejectionInfoList">
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
										
											<!-----------------Mrn Rejection Div End ------------------->
											
											
											
											<!-----------------Po Processing  Div Start ------------------->
										<div class="tab-pane fade" id="poproceesing">
										<div class="panel panel-default" >
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
																	<div class="panel-heading" id="divEhatContent">Po Processing Table</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">MRN Id</th>
																					<th class="col-md-1 center">MRN Date</th>																					
																					<th class="col-md-1 center">MRN Remark</th>																					
																					<th class="col-md-1 center">SubInventory Name</th>
																					<th class="col-md-1 center">PO Processing</th>
																					<th class="col-md-1 center">Rejection Mrn</th>
																					
																				</tr>
																			</thead>
																			<tbody id="poprocessingInfoList">
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
										
											<!-----------------Po Processing  Div End ------------------->
											
											
											<!-----------------STO Processing  Div Start ------------------->
											
											<div class="tab-pane fade" id="stoproceesing">
										<div class="panel panel-default" >
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
																	<div class="panel-heading" id="divEhatContent">STO Processing Table</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 300px">
																		<table id="ehatTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">MRN Id</th>
																					<th class="col-md-1 center">MRN Date</th>																					
																					<th class="col-md-1 center">MRN Remark</th>																					
																					<th class="col-md-1 center">SubInventory Name</th>
																					<th class="col-md-1 center">STO Processing</th>
																					<!-- <th class="col-md-1 center">Rejection Mrn</th> -->
																					
																				</tr>
																			</thead>
																			<tbody id="soprocessingInfoList">
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
											
											<!-----------------STO Processing  Div End ------------------->
											
											
											
											
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
				
				$('#orderDate').datepicker({
					autoclose : true
				});
				
				$('#deliveryDate').datepicker({
					autoclose : true
				});

			});
		</script>
		<script>
			onload = function() {
				
				addNewRowInTable("purchaserequestInfoTable","purchaserequest");
				getAllPurchaseRequestMaster("open");
			}
		</script>
		<input type="hidden" id="mrnId" value="0">
		<input type="hidden" id="processId" value="0">
		<input type="hidden" id="stockId" value="0">
		
		<input type="hidden" id="mrnrejectId" value="0">
		<input type="hidden" id="hiddenSubInvId" value="0">
		<input type="hidden" id="subInvIdForStock" value="0">
		<input type="hidden" id="subInvIdForPO" value="0">
		<input type="hidden" id="subInvNameForPO" value="0">
		
		
		<input type="hidden" id="hiddenpartyMasterId" value="0">
		<input type="hidden" id="RowCount" value="0">
		<input type="hidden" id="totaltblsize" value="0">
		<input type="hidden" id="callFrom" value="fromnew">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="hiddenRadioButtonIndex" />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/inv_purchase_request.js"></script>

</body>
</html>

