<%@page import="java.util.Date"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Stock Receive</title>
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
										<div class="input-group" id="searchSubInventoryDivId">
											<input type="search"
												class="typeahead form-control input-SmallText"
												id="searcyPRequestId"
												onkeyup="setAutoSubInventoryName(this.id)" /> <span
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
											data-toggle="modal" data-target="#itemMasterModalForSO">
											<i class="fa fa-plus"></i>Stock Receive
										</button>
									</div>
								</div>
							</div>

						
							
							
							
							<!-- modal Start for sto processing here -->
							
							
							<div class="modal fade" id="itemMasterModalForSO" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Stock Receive Processing </h5>

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
															<div class="panel-heading" id="divEhatContent">Stock Receive </div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<div class="form-group col-md-2">
																		<label for="partyId">MRN ID</label> <input type="text"
																			placeholder="MRN ID" class="form-control tip-focus"
																			id="mrnIdSO" readonly="true" name="MRN ID">
																	</div>
																	
																	<div class="form-group col-md-2">
																		<label for="partyId">Stock Id</label> 
																		<select name="stock id" id="stockId"	onchange="getStockTransperDetailsByStockId()" class="col-md-4"
																		style="width: 100%;">
																		<option value="0">--Select--</option>

																		</select>
	
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
																			<label for="remarkso">Stock Transfer Request From <b
																				style="color: red;">*</b></label> 
																				<input id="stockSubInvName"	class="form-control input-SmallText" type="text"
																				 name="date" placeholder="Sub Inv Name"	 />
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
																							
																								<table class='table table-striped table-bordered header-fixed cf' id="stocktransperInfoTable">
																									<thead class='cf' style='background: white;'>
																										<tr>
																										<th class='col-md-2 center'>Select <input type="checkbox" id="chkAllCheck" 
																										onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-2 center'>Sr.No</th>
																											<th class='col-md-2 center'>Item	Name</th>
																											<th class='col-md-2 center'>Issue Qty</th>
																											<th class='col-md-2 center'>Batch</th>																											
																											<th class='col-md-2 center'>Expiray Date</th>																											
																											<th class='col-md-2 center'>Remain Qty</th>
																											<th class='col-md-2 center'>Receive Qty</th>																											
																											<th class='col-md-2 center'>Accept</th>
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
									<!-- <button type="button" class="btn btn-primary"
										onclick="savestockTransperMaster()">Save</button> -->
									<button type="button" class="btn btn-secondary"
										onclick="onCloseBtnRefrshPage('inv_stock_transper.jsp');"
										data-dismiss="modal">Close</button>
								</div>
									</div>
									
								</div>
								
							</div>
							
							
							<!-- modal end for sto processing here -->
							
							<!-- modal Start for sto view here -->
							
							<div class="modal fade" id="stoMasterModalForView" tabindex="-1"
								role="dialog" aria-labelledby="itemMasterModalLabel"
								aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document"
									style="width: 90%;">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLabel">Stock Receive Info </h5>

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
															<div class="panel-heading" id="divEhatContent">Stock Receive </div>
															<div class="panel-body">
																<form id="mrnFormID" onsubmit="return false">
																	<div class="form-group col-md-2">
																		<label for="partyId">Stock ID</label> <input type="text"
																			placeholder="Stock ID" class="form-control tip-focus"
																			id="sIdForView" readonly="true" name="Stock ID">
																	</div>
																	
																	

																	<div class="form-row">



																		<div class="form-group col-md-2">
																			<label for="OrderDate">Stock Date<b
																				style="color: red;">*</b></label> 
																				<input id="stockDateForView" class="form-control input-SmallText" type="text"
																				readonly="readonly" name="date" placeholder="Date"
																				value="" />
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
																									<button type="button" class="btn btn-success btn-number" style="display:none" onclick="addNewRowInTable('stocktransperInfoTable','so')">
																			                  			<span class="glyphicon glyphicon-plus"></span>
																			                 	  	</button>
																									<button type="button" class="btn btn-danger btn-number" style="display: none"      onclick="removeRowFromTable('stocktransperInfoTable','chkMrnItem')">
																						                <span class="glyphicon glyphicon-minus"></span>
																					              	</button>																					              	
																							   </div>
																							</div>
																							<div style="overflow:auto" class="col-md-12">
																								<table class='table table-striped table-bordered header-fixed cf' id="stocktransperInfoTableForView" style="width: 3000px">
																									<thead class='cf' style='background: white;'>
																										<tr>
																										<th class='col-md-2 center'>Select <input type="checkbox" id="chkAllCheck" onclick="checkUncheckAll('chkAllCheck','chkMrnItem')"></th>
																											<!-- <th class='col-md-2 center'><div>Select</div></th> -->
																											<th class='col-md-2 center'>Sr.No</th>
																											<th class='col-md-2 center'>Item	Name</th>
																											<th class='col-md-2 center'>Received Qty</th>
																											<th class='col-md-2 center'>Pending Qty</th>																											
																											</tr>
																									</thead>																						
																									<tbody id="stocktransperInfoTableBodyForView" style="height: 200px">
																									
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
									<!-- <button type="button" class="btn btn-primary"
										onclick="savestockTransperMaster()">Save</button> -->
									<button type="button" class="btn btn-secondary"
										onclick="onCloseBtnRefrshPage('inv_stock_transper.jsp');"
										data-dismiss="modal">Close</button>
								</div>
									</div>
									
								</div>
								
							</div>
							<!-- modal End for sto view here -->
							
							
							
							<!-- new modal ends here -->
												
							
							
							

							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div>
										<ul class="nav nav-tabs">
											
											<li class="active"><a data-toggle="tab" href="#stoproceesing" onclick="getAllPurchaseRequestMaster('so');"> Stock Receive</a></li>
											<!-- <li><a data-toggle="tab" href="#poclosed" onclick="getAllPurchaseRequestMaster('poclose');"> Po Closed</a></li> -->			
										</ul>
									</div>
									<div class="tab-content">
                                   
											<!-----------------STO Processing  Div Start ------------------->
											
											<div class="tab-pane fade in active" id="stoproceesing">
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
																		<table id="stocktransperInfoTable" cellpadding="0" cellspacing="0"
																			border="0"
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th class="col-md-1 center">#</th>
																					<th class="col-md-1 center">Stock Id</th>
																					<th class="col-md-1 center">Transfer SubInventory Name</th>																					
																					<th class="col-md-1 center">Date</th>																					
																					<th class="col-md-1 center">View </th>																					
																					
																				</tr>
																			</thead>
																			<tbody id="soprocessingInfoListForView">
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
				
				addNewRowInTable("stocktransperInfoTable","so");
				//getAllPurchaseRequestMaster("so");
				//getAllStockId();
				getAllStockMasterForView();
			}
		</script>
		
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="hiddenRadioButtonIndex" />
		<input type="hidden" id="stoSubInvId" />
		<input type="hidden" id="subInvIdForStockId" />
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<script type="text/javascript" src="js/inv_stock_receive.js"></script>
	

</body>
</html>

