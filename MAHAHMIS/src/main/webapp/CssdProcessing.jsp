<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="com.hms.dto.InventoryBatchStockDTO"%>
<%@page import="java.util.List"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Processing</title>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<!-- <link href="css/ExtraCss/Sales_Quotation.css" rel="stylesheet"
	media="screen" /> -->
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css" href="css/inventoryDatepicker/css/jsDatePick_ltr.css"/>
<!-- bootstrap datepicker new added  js-->

<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js" type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js" type="text/javascript"></script>
<script src="jquery/jquery-2.1.1.js"></script>

<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>

<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/CSSD.js"></script>
<script type="text/javascript"
	src="js/ExtraJs/inventory_Document_SetUp.js"></script>

<script src="js/script.js"></script>

<!-- Js for Autosuggestion -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!--  developer coustom file -->

<script src="js/ExtraJs/inventory_Goods_Issue.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("111"); //Set current page
		App.init(); //Initialise plugins and elements
	});
	  
</script>


<script type="text/javascript">
	onload = function() {
		//$("#patEntry").addClass("anchorActive");
		//getSalesQuotationDashboard('onload');
// 		getIssueToMRN();
		//fetchMaterialRequestNoteDetailsInGoodsIssue();
		getIdsForProceesingCsd();
		getProseccmasterListForSelectionCsd();
	//	fetchMachineItemDetailsCsd();
		getlistforProcessing();

		getMatchine();
		
		//fetchMaterialRequestNoteListDetailsInGoodsIssue();
		/*********************new date picker added* husen********************************************/
	/* 	 new JsDatePick({
			useMode:2,
			target:"txtGoodsIssueDate",
			yearsRange:[1920,2099],
			limitToToday:false,
			dateFormat:"%d-%m-%Y",
			imgPath:"../img/",
			weekStartDay:1,
		});   */

	}
</script>
</head>
<body style="background: white ! important;">
	<section id="page"> <!-- HEADER --> <header
		class="navbar clearfix" id="header"> <%@include
		file="Menu_Header.jsp"%></header> <%@include
		file="left_menu_LinenLaundry.jsp"%> <!-- /SIDEBAR -->
	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
				"dd-MM-yyyy");
		String todays_date = formatter.format(currentDate.getTime());
	%>
	<div id="main-content">
		<div class="container">
			<div class="row">
				<div id="content" class="col-lg-12">
					<div class="row">
						<div class="col-sm-12">
							<div class="page-header">

								<ul class="breadcrumb col-md-12-1"
									style="padding: 4px 10px; margin-top: 1px;">
									<li>Date : <%=todays_date%></li>
									<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
									</li>
									<li><i class="fa fa-home"></i> <a href="lnl_Dashboard.jsp">Ancillaries</a></li>
									<li><a href="CssdProcessing.jsp"> Processing</a></li>
									<!-- <li class="pull-right">
										<button class="btn btn-xs btn-success" type='button'
											value='Save Now'>Save</button>
										<button class="btn btn-xs btn-warning">Print</button>
										<button class="btn btn-xs btn-danger">Discard</button>
									</li> -->
								</ul>

							</div>
						</div>
					</div>
					<!-- <div style="font-weight: bold;" class="col-md-1-1">
						<button class="btn btn-xs btn-success" type='button'
							 data-toggle="modal"
							data-target="#Goods_Issue"> Issue Goods </button>
					</div> -->
					<div id="SearchContent" class="col-md-12-1" style="margin-left:280px;">
							<!-- 		<div class='col-md-1-1'>Search By:</div>
									<div class='col-md-1-1'>Mrn Id</div>
									<div class='col-md-2-1'>

										<input name="byName" id="byMrnId" type="text" 
											onkeypress="return validateNumbers(event)" />

									</div>
									<div class='col-md-2-1'>
 
										<input type="button" value="Search" class="btn btn-xs btn-primary" class="edit"
											onclick="fetchMRNDetailByIdNoteListInGoodsIssue($('#byMrnId').val())" />

									</div> -->
									
									
			<!-- 		<div style="font-weight: bold;" class="col-md-1-1">
						<button class="btn btn-xs btn-success" type='button'
							 data-toggle="modal" onclick="goodsIssueRefreshCsd();"
							data-target="#Goods_Issue"> Add To Process </button>
					</div> -->
									</div>
									
					
					<div class='divide-20'></div>
				<!-- 	<div class='divide-40'></div> -->

					<!-- <div
						style="width: 99.80%; height: 300Px; overflow-y: scroll; border: 1px solid #436a9d;"
						id="patientcontainer"></div> -->
		<!-- 				<div class="col-md-11-1"
							style="height: 5%; max-height: auto; margin-left: 4%;">


							<div style="margin-top: 15px; padding-left: 0%;">

								<div class="container-main col-md-7-1"
									style="overflow-y: scroll; height: 450px; margin-top:-50px; maxheight: auto; border: 1px solid #b8b8b8;">

									<div id="MRNcontent"></div>
									<div id="MRNAjaxResp" style="visibility: hidden;"></div>
									<div id="MRNItemAjaxResp" style="visibility: hidden;"></div>
								</div>
							</div>


						</div> -->
						
								<div id="landlList" class="col-md-12-1  panel body"
							style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto; ">

							<div class="tab-content">
								<div style="margin-top: 10px;" class="col-md-12-1">
					<!-- 				 <button class="btn btn-xs btn-success" type='button'
								data-toggle="modal" data-target="#NewMRNForm" onclick="setclearPOPONAddLaundry();" >Add New MRN
								Request</button> --> 
								
					<div style="font-weight: bold;" class="col-md-1-1">
						<button class="btn btn-xs btn-success" type='button'
							 data-toggle="modal" onclick="goodsIssueRefreshCsd();"
							data-target="#Goods_Issue"> Add To Process </button>
					</div>
					
									<div class="pull-right">
										<div class="dataTables_filter" id="datatable1_filters">
											<label id="searchlabel"><input
												aria-controls="datatable1" placeholder="Search By MRN Id"
												onkeyup="autosugetionForProcessing(this.id)" id="byName"
												class="form-control input-sm" type="text"></label>
										</div>
									</div>

								</div>
								<div id="landlDiv" class="tab-pane fade in active">



									<table class="table table-hover cf "
										style="Width: 100%; margin-top: 5px;">
										<thead class="cf" style="background: white;">
											<tr>
												<th style="height: 21.5px;" class="col-md-1"><div>#</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>MRN Id</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Process Date</div></th>
												<!-- <th style="height: 21.5px;" class="col-md-2"><div>MRN Remark</div></th> -->

												<th style="height: 21.5px;" class="col-md-1"><div>Sub Department Name</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Conducted By</div></th>
										<!-- 		<th style="height: 21.5px;" class="col-md-1"><div>Edit and Accept</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Return</div></th>
												
												<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Status</div></th> -->
												<!-- <th style="height: 21.5px;" class="col-md-1"><div>Purchase Request</div></th> -->

											</tr>
										</thead>

										<tbody id="divlandlList">

										</tbody>
									</table>
								</div>
							</div>
						</div>
						

					<div id="Goods_Issue" class="modal fade in" tabindex="-1">
						<div class="modal-dialog" style="width:93%;">
							<div class="modal-content" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i> Processing
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12">
										<form class="form-horizontal  col-md-12-1" method="get">

										

											<div class="form-group col-sm-1-1" style="margin-right: 1%;margin-left: 1%">
												<label for="exampleInputEmail1" class="TextFont">Issue
													To <b style="color: red;">*</b></label>
												<select class="form-control input-SmallText"
													id="processId"
													onchange="viewProcessingDetails(this.value)"
													style="width: 100px; margin-left: -9px;">
												</select>

											</div>
												<div class="form-group col-sm-1-1" style="margin-right: 2%; display:none;">
												<label for="exampleInputEmail1" class="TextFont">Mrn
													Id <b style="color: red;">*</b></label><input type="text" class="form-control input-SmallText"
													required="true" name="txtGoodsIssueDocNo" readonly="readonly"
													id="txtGoodsIssueDocNo" placeholder="Doc No"/>
											</div>
											
											<div class="form-group col-sm-1-1" style="margin-right: 1%;">
												<label for="exampleInputEmail1" class="TextFont">Process
													Date <b style="color: red;">*</b></label>
													<input id='processDate' readonly="readonly"
													   placeholder="date" name="processDate" value="<%=todays_date%>"
													class='form-control input-SmallText'/>
													
													<input id='mrnDate' type='hidden'  />
													<input id='recievedDate' type='hidden'  />
											</div>
											
										
											
											
											<div class="form-group col-sm-2-1" style="margin-right: 2%;"
												id="divtxtMRNLocationName">
												<label for="exampleInputEmail1" class="TextFont">
													Sub Department  Name<b style="color: red;">*</b> </label><input class=" typeahead form-control input-SmallText"
													required name="txtMRNLocationName" id="txtMRNLocationName" readonly="readonly"
													placeholder=" Name"/>
													<input type = "hidden" value ='0' id='subInventoryId'/>
													<input type = "hidden"  id='raisedBy'/>
													<input id='receivedBy' type='hidden'  />
											</div>
											
											<div class="form-group col-sm-2" style="margin-left: -3%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="TextFont"> Conducted By<b style="color: red;">*</b>
														</label><input class="form-control input-SmallText"
														required name="txtMRNLocationNameInList" id="condby"  
														onkeypress="return validateAlphaNumberic(event);" type="text" placeholder=" "/>
											</div>
											
											
											<div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Process
													Name <b style="color: red;">*</b></label>
												<select class="form-control input-SmallText"
													id="peocessName"
													style="width: 100px; margin-left: -9px;">
												</select>

											</div>
											
											
											<div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Machine
												Name <b style="color: red;">*</b></label>
												<select class="form-control input-SmallText"
													id="machineName"
													style="width: 100px; margin-left: -9px;">
												<option value="0">-- Select --</option>	
												</select>

											</div>
											
											
											
											
											
											
											<!-- <div class="form-group col-sm-2-1" style="margin-left: -2%;">
													<label class="TextFont" for="exampleInputEmail1">Process
													Name</label> <b style="color: red;">*</b> <select id="peocessName"
													value='0' name="doctorName"></select>
											</div>
											
											
											<div class="form-group col-sm-2-1" style="margin-left: -7%;">
												<label class="TextFont" for="exampleInputEmail1">Machine
												Name </label> <b style="color: red;">*</b> <select id="machineName"
												value='0' name="doctorName"></select>
											</div> -->

											<!-- <div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">
													Location </label><select
													class="form-control input-SmallText TextFont"
													id="sclMRNLocation" Style="margin-left: -18px;">
													<option>Select</option>
													<option value="Open">Open</option>
														<option value="Closed">Closed</option>
														<option value="Hold">Hold</option>
														<option value="Cancelled">Cancelled</option>
												</select>
											</div> -->
											
											
											<!-- <div class="form-group col-sm-4-1"
												style="margin-top: 2%; margin-left: 2%;">
												<input type="checkbox" style="margin-bottom: 1%;"
													id="chkGoodsIssueAutoUpdateInventory" /> <label
													class="TextFont">Auto Update Inventory </label>
											</div> -->

											<!-- <div class="form-group col-sm-2-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Item
													Short Code</label> <input type="text"
													class="form-control input-SmallText"
													name="txtGoodsIssueItemShortCode"
													id="txtGoodsIssueItemShortCode"
													placeholder="Item Short Code"></input>
											</div> -->

											<div style="margin-top: 0px; margin-left: 2px;"
												class="col-md-12-1">
												<!-- BOX -->

												<div class="box border col-md-12-1">

													<div class="tabbable col-md-12-1">
														<ul class="nav nav-tabs">
															<li class="active"><a data-toggle="tab"
																href="#ItemInfo"><i class="fa fa-user"></i> <span
																	class="hidden-inline-mobile">Item Info(F2)</span></a></li>


														</ul>
														<div class="divide-10"></div>
														<div class="divide-10"></div>
														<div class="divide-10"></div>
														<form>
															<div class="tab-content col-md-12-1">
																<div id="ItemInfo" class="tab-pane fade in active "
																	style="overflow-x: auto;">

																	<div class="panel-body col-md-12-1">
																		<div style="padding-left: 12px;" class="col-sm-12-1">
																			<div style="height: 85%; margin-left: 2%;">
																				<div
																					style='width: 95%; font-weight: bold; height: 200Px; overflow-y: scroll; border: 1px solid #436a9d;'>
																					 <!-- <button
																						onclick="setMaterialRequestInfo()"
																						class="btn btn-xs btn-success" type='button' id="btnAddNew" value="+" > + </button> -->
																						<!-- <button type="button" onclick="toRemovesetItemInfotrMRN('tblSubContractingCountRow')"style="margin: 7px;"class="btn btn-xs btn-success"  value="-" > - </button> -->
																					<table id="ItemInfoTable" cellpadding="0"
																						cellspacing="0" border="1"
																						class="table table-bordered table-striped table-condensed">
																						<thead>
																							<tr>
																								<th class="col-md-2-2 center">select</th>
																								<!-- <th class="col-md-2-2 center">SrNo</th> -->
																								<th class="col-md-2-2 center">Item Name</th>
																								<th class="col-md-2-2 center">Quantity</th>
																						
													
																							</tr>
																						</thead>
																						<tbody id="ItemInfoList"
																							style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																							<tr>
				
																						</tbody>
																					</table>

																				</div>
													<input type="hidden" id="txtMRNID"></input>
													<input type="hidden" id="totalRow"></input>

																			</div>
																		</div>
																	</div>
																</div>

												<!-- 				<div class="form-group col-sm-1-1"
																	style="margin-left: 2%;text-align: left;">
																	<label for="exampleInputEmail1" class="TextFont">Total
																		item Qty </label><input type="text" readonly="readonly"
																		class="form-control input-SmallText" 
																		name="firstName" id="txtGoodsIssueTotalDocQty"
																		placeholder="Total Doc Qty">
																</div> -->
					<!-- 											<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
										<label style="margin-left: 6%; for="exampleInputEmail1"  class="TextFont">Remark
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtGoodsIssueRemark"
											id="txtGoodsIssueRemark" placeholder="Remark">
									</div> -->
																
																
																
<!-- 																<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
										<label style="margin-left: 6%; for="exampleInputEmail1"  class="TextFont">Carrier Name
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtReceiverName"
											id="txtReceiverName" placeholder="Carrier Name" >
									</div> -->
																
																
															</div>
														</form>
														<!--/nikhil  -->
													</div>

												</div>
												<!-- /BOX -->
											</div>



										</form>
									</div>
									<!-- /BOX-->
								</div>
								<!-- /BODY-->
								<div class="modal-footer">
									<!-- <div class="form-group col-sm-2-1" style="margin-left: 2%;">
										<label for="exampleInputEmail1" class="TextFont">Remark
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtGoodsIssueRemark"
											id="txtGoodsIssueRemark" placeholder="Remark">
									</div> -->
									<div class="form-group col-md-9-1" style="margin-left: 300px;">
										<button type="button"  id="sendProcessButton" value="level-III" class="btn btn-primary"  onclick="sendToProcess()"  >Approved and Save</button>
										<button type="button" class="btn btn-default"
												data-dismiss="modal" id=""  onclick="setSessionvalue();">Close</button>
										<input type="hidden" value="0" id="levelValue" />

									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
	
	<div id="MRNAjaxResp" style="visibility: hidden;"></div>
	<div id="MRNItemAjaxResp" style="visibility: hidden;"></div>
	<%@include file="Footer.jsp"%>

	</div>
	</section>
	
	<!-- /*******************************************modal on click check***************************************************/ -->
						<div id="MRNFormList" class="modal fade in" tabindex="-1">
							<div class="modal-dialog">
								<div class="modal-content col-md-7" style="margin-top: 50px;margin-left: 140px;">
									<div class="modal-header">
										<div class="box-title">
											<h4>
												<i class="fa fa-calendar"></i>Available Items
											</h4>
										</div>
									</div>
									<div class="modal-body">
											<table id="" cellpadding="0" cellspacing="0" border="1"
													class="table table-bordered table-striped table-condensed">
													<thead>
														<tr>
															<th>Available Items</th>
															<!--   <th>Required</th> -->
															<th>Required Items</th>  
														</tr>
													</thead>
													<tbody id="">
														<tr>
															<td><input type='text' id="totalItemQty" readonly="readonly"
																class='form-control input-SmallText'/>
																<input type='hidden' id="txtinventoryMaterailRequestNoteItemcode" 
																class='form-control input-SmallText'/>
																</td>	
																<input type="hidden" id="hiddenCount" value="0"/>	
																	<!-- <td><input type='text' id="requiredItemQty" onclick="validateQuantity()"
																	onkeyup="calculateRamainingQty(this.id,'totalItemQty')"
																class='form-control input-SmallText'/></td>	 -->	
																		<td><input type='text' id="requiredQty" 
																class='form-control input-SmallText'/></td>									
		                                                  </tr>		
		                                                </tbody>
												</table>
									<div class="modal-footer" style="margin-left: -180px;">
								    	<div class="form-group col-md-9-1">
											<!-- <button type="" class="btn btn-primary"
												onclick="updateBatchStockQty()">Save</button> -->
												<button type="button" class="btn btn-primary" onclick = "issueQtyAssign()">ok</button>
											<button type="button" class="btn btn-default" data-dismiss="modal" id="closeBtn"  >Close</button>
											

										</div>
									</div>
							</div>
						</div>
					</div>
				</div>
				<!-- User Name and password for Approve Incharge  Date 18 jan 2016   Author:sudhir -->
			<div id="userNameandpasswordPopUp" class="modal fade in" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog" style="width: 500px;">
					<div class="modal-content">
						<div class="modal-header">
							<div class="box-title">
								<h4>
									Password Verification
								</h4>
							</div>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-md-12">
									<!-- BOX -->
									<div class="box-body">

										<!--Panel Body-->
										
										<div class="col-xs-12 col-md-12">
											<div class="col-xs-4 col-md-12">
											<div class="divide-20"></div>
												<label for="exampleInputEmail1" style="color: red;">Please
													Enter User Name !!</label> <input type="text"
													id="userName" class="form-control"
													placeholder="User Name">
											</div>
										</div>

										<div class="col-xs-12 col-md-12">
											<div class="col-xs-4 col-md-12">
											<div class="divide-20"></div>
												<label for="exampleInputEmail1" style="color: red;">Please
													Enter Your Password !!</label> <input type="password"
													id="userPassword" class="form-control"
													placeholder="Password">
											</div>
										</div>
										 
										<!-- /BOX-->
									</div>
								</div>
							</div>
							<!-- /BODY-->
							<div class="modal-footer">
							<input type="button" value="Submit" class="btn btn-primary"
									onclick="checkUserNameandPassword()" />
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ENd  User Name and password for Approve Incharge  Date 18 jan 2016   Author:sudhir -->
					
			<!-- set dynamically accepted item values while issuing item select item and close the popup @Date 5:feb:2016 -->
	<script>
function checkSession()
{
	<%List<InventoryBatchStockDTO> ltBatchStockDTOsval=(List<InventoryBatchStockDTO>)session.getAttribute("ltBatchStockDTOs"); 
	 
	if(ltBatchStockDTOsval == null) 
	 
	{%>
	//alert("please insert values");
	<%}  
	  else
	  {  
	
		 for(int i=0;i<ltBatchStockDTOsval.size();i++)  
		 {%>
				<%-- alert("dfdg"+<%=ltBatchStockDTOsval.get(i).getInv_mrn_id()%>); --%>
			var MrnId1 = <%=ltBatchStockDTOsval.get(i).getInv_mrn_id()%>;
				var MrnId = $("#txtGoodsIssueDocNo").val();
				console.log(MrnId);
				
				  var txtMRNID=0;
				if(parseInt(MrnId1) ===parseInt(MrnId))
					{
					var slaveId =<%=ltBatchStockDTOsval.get(i).getInv_mrn_item_info_slave_id()%>;
					
					var txtIssuedQty =<%=ltBatchStockDTOsval.get(i).getInv_issue_qty()%>;
			 		<%-- txtMRNID = <%=ltBatchStockDTOsval.get(i).getInv_item_code()%>; --%>  
					  var itemQuantity = <%=ltBatchStockDTOsval.get(i).getInv_mrn_item_info_issue_slave_pending_item_qty()%>; 
						 
						<% for(int k = 0; k <= ltBatchStockDTOsval.get(0).getInv_item_code(); k++)
								{ %>
								 var txtinventoryMaterailRequestNote =$("#txtinventoryMaterailRequestNote"+<%= k %>).val();
							 	 	if(parseInt(txtinventoryMaterailRequestNote) === parseInt(slaveId))
									 {  // alert(itemQuantity);
										 document.getElementById("chkbox"+ <%=k%>).checked = true;
										 <%-- document.getElementById("chkbox"+ <%=k%>).disabled = true; --%>
										 <%-- document.getElementById("accept" + <%=k%>).disabled = true; --%>
										 
									 	 $("#accept"+ <%=k%>).css('background-color','#ffc34d');
										 $("#txtIssuedQty" + <%=k%>).val(txtIssuedQty);
										 $("#txtinventoryMaterailRequestNoteDocQuantity"+ <%=k%>).val(itemQuantity);
										 document.getElementById("txtIssuedQty" +<%=k%>).disabled = true;
									 
									 }	
							 	<% } %>  
						}
		<%}%> 
		 
	 <%}%>  
 
}
  
</script>	
<!--End set dynamically accepted item values while issuing item select item and close the popup @Date 5:feb:2016 -->	
				
	
</body>
</html>