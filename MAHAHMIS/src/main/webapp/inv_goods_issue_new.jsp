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
                                       type="search" class="typeahead form-control input-SmallText" autocomplete="off"
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
                                       <div class="pull-right" style="margin-right: 15px;">
                                          <button type="button" class="btn btn-primary editUserAccess"
                                             onclick="saveGoodsIssue()">Save</button>
                                          <button type="button" class="btn btn-primary btn-danger"
                                             onclick="onCloseGoodsIssueModal();"
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
                                                            <input type="hidden" id="totalPendingQtyIdIssueMrn" />
                                                            <input type="hidden" id="finalTotalPendingQtyIdIssueMrn" />
                                                            <input type="hidden" id="finalTotalCanceledQtyIdIssueMrn"  value="0"/>
                                                            <div class="form-row">
                                                               <div class="form-group col-md-2">
                                                               <input type="hidden" id="generatedMRNId" />
                                                                  <button class="btn btn-xs btn-info editUserAccess" data-target="#getMRNData" data-toggle="modal" onclick="getGeneratedMrnData()"  type="button">GET MRN</button>
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
                                                               <div class="col-md-6 pull-left">
																<div class="form-group col-md-6 pull-left">																																									
																	<button type="button"	onclick="removeRowFromTableGoodsIssue('generateGoodsIssueInfoTable','chkGoodsIssueItem')" class="btn btn-xs btn-success"	value="_">-</button>
																</div>																					

															</div>
                                                            </div>
                                                         </form>
                                                         <form id="generalFormId">
                                                            <div class="row">
                                                               <div class="col-md-12">
                                                                  <div>
                                                                     <div class="form-group col-md-3 pull-right">
                                                                        <div class="form-group col-md-8">
                                                                        </div>
                                                                     </div>
                                                                     <div style="overflow: auto" class="col-md-12">
                                                                        <table
                                                                           class='table table-striped table-bordered header-fixed cf'
                                                                           id="generateGoodsIssueInfoTable">
                                                                           <thead class='cf' style='background: white;'>
                                                                              <tr>
                                                                                 <th class='col-md-1 center'>Sr.No</th>
                                                                                 <th class='col-md-2 center'>Item Name</th>
                                                                                 <th class='col-md-1 center'>UOM Unit</th>
                                                                                 <th class='col-md-1 center'>Get Batch Details</th>
                                                                                 <th class='col-md-1 center'>Required Quantity</th>
                                                                                 <th class='col-md-1 center'>Issue Quantity</th>
                                                                                 <th class='col-md-1 center'>Cancel Quantity</th>
                                                                                 <th class='col-md-1 center'>Pending Quantity</th>
                                                                                 <th class='col-md-1 center'>Batch Code</th>
                                                                                 <th class='col-md-2 center'>Batch Exp Date</th>
                                                                                 <!-- <th class='col-md-2 center'>Current SubInv Stock(Batch Wise)</th> -->
                                                                                 <th class='col-md-2 center'>Current Inv Stock</th>
                                                                                 <th class='col-md-3 center'>Sub Remark MRN</th>
																				 <th class='col-md-3 center'>Sub Remark</th>
                                                                                 <th class='col-md-2 center'>Add Another Batch</th>
                                                                                 <th class='col-md-1 center'>Select(For Remove Row)</th>
                                                                                 <th class='col-md-1 center' style="display: none">Select For</th>
                                                                                 <th class='col-md-1 center' style="display: none"></th>
                                                                                 <th class='col-md-1 center' style="display: none"></th>
                                                                                 <th class='col-md-1 center' style="display: none"></th>
                                                                                 <th class='col-md-1 center' style="display: none"></th>
                                                                                 <th class='col-md-1 center' style="display: none"></th>
                                                                              </tr>
                                                                           </thead>
                                                                           <tbody id="generateGoodsIssueTableBodyId" style="height: 100px">
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
                                       </div>
                                    </div>
                                 </div>
                                 <div class="modal-footer"></div>
                              </div>
                           </div>
                        </div>
                        <!-- batch wise goods issue modal starts here -->
                        <div id="batchWiseGoodsIssueModal" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                           <div class="modal-dialog" role="document" style="width: 50%;">
                              <div class="modal-content">
                                 <div class="modal-header">
                                    <h5 class="modal-title">Item Batch Wise Details 
                                    <div class="pull-right" style="margin-right: 15px;">
                                       <button type="button" class="btn btn-primary"
                                          onclick="setModalInfoToTableOnGoodsIssue()">Get Details</button>
                                       <button type="button" class="btn btn-secondary"
                                          onclick="closeGoodsIssueBatchModal()">Close</button>
                                    </div>
                                    </h5>
                                   
                                 </div>
                                 <div class="modal-body">
                                    <div class="form-group col-md-4">
                                       <label for="parent">Issue Quantity<b
                                          style="color: red;">*</b></label> <input type="text"
                                          class="form-control tip-focus"
                                          id="issueQuantityGoodsIssue" onkeyup="calculationIssueQty()"
                                          placeholder="Enter Issue Quantity">
                                    </div>
                                    <div class="form-group col-md-4">
                                       <label for="parent">Canceled Quantity<b
                                          style="color: red;">*</b></label> <input type="text"
                                          class="form-control tip-focus"
                                          id="canceledQuantityGoodsIssue" onkeyup="calculationCancelQty()"
                                          placeholder="Enter Canceled Quantity">
                                    </div>
                                    <div class="form-group col-md-4">
                                       <label for="parent">Pending Quantity<b
                                          style="color: red;">*</b></label> <input type="text"
                                          class="form-control tip-focus"
                                          id="pendingQuantityGoodsIssue" readonly="readonly"
                                          placeholder="Enter Issue Pending">
                                    </div>
                                    <div class="form-group col-md-4" style="display: none">
                                       <label for="parent">Requested Quantity<b
                                          style="color: red;">*</b></label> <input type="text"
                                          class="form-control tip-focus"
                                          id="requestedQuantityGoodsIssue" readonly="readonly"
                                          placeholder="Received Quantity">
                                    </div>
                                    <table id="batchWiseGoodsIssueTableId" cellpadding="0"
                                       cellspacing="0" border="0"
                                       class="table table-striped table-bordered">
                                       <thead id="ehatTHead">
                                          <tr>
                                             <th class="col-md-1 center">#</th>
                                             <th class="col-md-1 center">Item Name</th>
                                             <th class="col-md-1 center" style="display: none">Item ID</th>
                                             <th class="col-md-1 center">Item Batch Code</th>
                                             <th class="col-md-1 center">Item Batch Exp Date</th>
                                             <!-- <th class="col-md-1 center">Current SubInventory Stock</th> -->
                                             <th class="col-md-1 center">Main Inventory Stock</th>
                                          </tr>
                                       </thead>
                                       <tbody id="batchWiseGoodsIssueTbody">
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <!-- batch wise consumption modal ends here -->
                        <!-- get mrn data modal starts here -->
                        <div class="modal fade" id="getMRNData" tabindex="-1"
                           data-backdrop="static" data-keyboard="false" role="dialog"
                           aria-labelledby="getMRNData"
                           aria-hidden="true">
                           <div class="modal-dialog modal-dialog-centered" role="document"
                              style="width: 50%;">
                              <div class="modal-content">
                                 <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">
                                       Generated MRN Data
                                       <div class="pull-right" style="margin-right: 15px;">
                                          <button type="button" class="btn btn-primary"
                                             onclick="getMRNDetailsByMrnId()">Get Details</button>
                                          <button type="button" class="btn btn-primary btn-danger"
                                             onclick="closeGetMrnDataModal();"
                                             data-dismiss="modal">Close</button>
                                       </div>
                                    </h5>
                                 </div>
                                 <div class="modal-body">
			                           <div class="row">
			                           <div class="col-md-12">
			                              <div class="col-md-6">
			                                 <div class="input-group" id="goodIssueDiv">
			                                    <input type="hidden" id="subInventoryId" /> 
			                                    <input type="search" placeholder="Search By Store Name" autocomplete="off" class="typeahead form-control input-SmallText" id="searchByStoreNameId" onkeyup="getAutoSubInventoryNameOnGoodsIssueModal(this.id);" /> 
			                                    <span class="input-group-btn">
			                                    <button class="btn btn-primary"  style="height: 25px; margin-bottom: 10px" type="button" onclick="searchAllGeneratedMRNRequestData()">
			                                    <span class="fa fa-search" aria-hidden="true" > </span>
			                                    Search!
			                                    </button>
			                                    </span>
			                                 </div>
			                              </div>
			                           </div>
			                        </div>
                                    <div class="row">
                                       <div class="col-md-12">
                                          <div class="container">
                                             <div class="tab-content">
                                                <!-- general tab starts here -->
                                                <div id="itemInfo" class="tab-pane fade in active">
                                                   <div class="panel panel-primary">
                                                      <div class="panel-body">
                                                         <form id="getMrnDataFormId">
                                                            <div class="row">
                                                               <div class="col-md-12">
                                                                  <div>
                                                                     <div class="form-group col-md-3 pull-right">
                                                                        <div class="form-group col-md-8">
                                                                        </div>
                                                                     </div>
                                                                     <div style="overflow: auto" class="col-md-12">
                                                                        <table
                                                                           class='table table-striped table-bordered header-fixed cf'
                                                                           id="getMrnDataInfoTable">
                                                                           <thead class='cf' style='background: white;'>
                                                                              <tr>
                                                                                 <th class='col-md-1 center'>Select</th>
                                                                                 <th class='col-md-1 center'>Sr.No</th>
                                                                                 <th class='col-md-3 center'>MRN Generated Date</th>
                                                                                 <th class='col-md-3 center'>MRN ID</th>
                                                                                 <th class='col-md-1 center'>SubInventory Name</th>
                                                                                 <th class='col-md-1 center'>MRN Status</th>
                                                                              </tr>
                                                                           </thead>
                                                                           <tbody id="getMrnDataTableBodyId" style="height: 100px">
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
                                          <!--    Starting pagination    -->
											<div style="margin-top: -2%;">
												<div class="pull-right">
													<ul class="pagination pagination-blue margin-bottom-10"
														id="goodsIssueMrnRecordModalPagination">
													</ul>
												</div>
												<div class="row">
													<div class="col-md-4 col-md-offset-8">
														<div class="pull-right">
															<ul
																class="pagination pagination-blue margin-bottom-10"
																id="totalNumberOfPagesModalGoodsIssue">
															</ul>
														</div>
													</div>
												</div>
											</div>
											<!--   Ending  pagination -->
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <!-- get mrn data modal ends here -->
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
                                                               Issue Details
                                                            </div>
                                                            <div class="panel-body">
                                                               <table id="ehatTable" cellpadding="0"
                                                                  cellspacing="0" border="0"
                                                                  class="datatable table table-striped table-bordered">
                                                                  <thead id="ehatTHead">
                                                                     <tr>
                                                                        <th class="col-md-2 center">#</th>
                                                                        <th class="col-md-2 center">MRN Id</th>
                                                                        <th class="col-md-2 center">MRN Date</th>
                                                                        <th class="col-md-2 center">MRN Dispatch Date</th>
                                                                        <th class="col-md-2 center">SubInventory Name</th>
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
                                          <!--    Starting pagination    -->
											<div style="margin-top: -2%;">
												<div class="pull-right">
													<ul class="pagination pagination-blue margin-bottom-10" id="goodsIssueListPagination">
													</ul>
												</div>
												<div class="row">
													<div class="col-md-4 col-md-offset-8">
														<div class="pull-right">
															<ul class="pagination pagination-blue margin-bottom-10" id="totalNumberOfPagesGoodsIssueList">
															</ul>
														</div>
													</div>
												</div>
											</div>
											<!--   Ending  pagination -->
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
                                                      ID
                                                   </th>
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
                                                      Unit 1
                                                   </th>
                                                   <th class="col-md-1 center" style="display: none">UOM
                                                      Unit 2
                                                   </th>
                                                   <th class="col-md-1 center" style="display: none">UOM
                                                      Unit 3
                                                   </th>
                                                   <th class="col-md-1 center" style="display: none">UOM
                                                      Unit 4
                                                   </th>
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
            	// this is commented because contactDateofbirth id not used on this page so it has commented by Vishnu
            	/* new JsDatePick({
            		useMode : 2,
            		target : "contactDateofbirth",
            		//dateFormat:"%d-%M-%Y", 
            		yearsRange : [ 1920, 2099 ],
            		limitToToday : false,
            		//cellColorScheme:"beige",
            		dateFormat : "%d/%m/%Y",
            		imgPath : "../img/",
            		weekStartDay : 1,
            	});
            
            	$('#mrnDate').datepicker({
            		autoclose : true
            	}); */
            
            });
         </script>
         <script>
            onload = function() {
            	getAllGoodIssue();
            }
         </script>
         <input type="hidden" id="goodsIssueId" value="0" />
         <!-- <input type="text" id="mrnItemSlaveId" value="0" /> -->
         <input type="hidden" id="mrnrejectId" value="0">
         <input type="hidden" id="subInvId" value="0" />
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
      <script type="text/javascript" src="js/ehat_inv_pagination.js"></script>
      <script type="text/javascript" src="js/ehat_inv_subInventory.js"></script>
      <script type="text/javascript" src="js/ehat_inv_goods_issue_new.js"></script>
   </body>
</html>

