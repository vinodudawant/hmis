<%@page import="com.hms.dto.InventoryBatchStockDTO"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Cssd Department</title>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="css/ExtraCss/inventory_Sales_Quotation.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
	<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css" href="css/inventoryDatepicker/css/jsDatePick_ltr.css"/>
<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js" type="text/javascript"></script>
 
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
<!-- <script type="text/javascript" src="js/Admin.js"></script> -->
<script src="js/validate.js" type="text/javascript"></script>
<!-- coustom js -->
<script src="js/ExtraJs/inventory_Material_Request_Note_List.js"></script>
<script type="text/javascript" src="js/LaundryLinonManagement.js"></script>

<script type="text/javascript" src="js/LaundryManagement.js"></script>
<script type="text/javascript" src="js/LaundryLinenTemplate.js"></script>
<script type="text/javascript" src="js/CSSD.js"></script>
<!-- <script src="js/ExtraJs/inventory_Material_Request_Note.js"></script> -->

<!-- Js for Autosuggestion -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("111"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		//fetchMaterialRequestNoteListDetailsInListLnl();
		//getlistforLLDept();
		getlistforCsdDept();
		
	//	getNextMaterialRequestNoteIdInLIstLaundry();
		autoSuggestionForLocationLnl("txtMRNLocationName","onload");
		autoSuggestionForLocationInListLnl("txtMRNLocationNameInList","onload");
		
	
		new JsDatePick({
			useMode:2,
			target:"txtmaterialReqaestNoteDocDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange:[1920,2099],
			limitToToday:false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath:"../img/",
			weekStartDay:1,
		});
		
		
		new JsDatePick({
			useMode:2,
			target:"txtMRNDateInList",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange:[1920,2099],
			limitToToday:false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath:"../img/",
			weekStartDay:1,
		});

	}
	
</script>


</head>
<body style="background: white ! important;">
	<section id="page"> <!-- HEADER --> <header
		class="navbar clearfix" id="header"> <%@include
		file="Menu_Header.jsp"%></header> <%@include
		file="left_menu_LinenLaundry.jsp"%> <!-- /SIDEBAR -->
		
		<% 
		 Object CurrentuserName = session.getAttribute("userName");
		 session.setAttribute("CurrentuserName", CurrentuserName);
		 System.out.println("Your Name In list ************* "+CurrentuserName); %>
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
									<li><a href="cssdDepartment.jsp">  Cleaning Material Request List</a></li>
									
								</ul>

							</div>
						</div>
					</div>
					
					
				<!-- 	<div id="SearchContent" class="col-md-12-1" style="margin-left:280px;">
									<div class='col-md-1-1'>Search By:</div>
									<div class='col-md-1-1'>Mrn Id</div>
									<div class='col-md-2-1'>

										<input name="byName" id="byMrnId" type="text" 
											onkeypress="return validateNumbers(event)" />

									</div>
									<div class='col-md-2-1'>
 
										<input type="button" value="Search" class="btn btn-xs btn-primary" class="edit"
											onclick="fetchMRNDetailByIdNoteListLnl($('#byMrnId').val())" />

									</div>
									
									New Mrn form Request
									<div style="font-weight: bold;" class="col-md-1-1">
							  
						</div>
								</div> -->
								
					<!-- ********************************************************** start div edit and issue mrn on edit **********************************************************-->			
					
					<div id="MaterialRequestNoteList" class="modal fade in" tabindex="-1">
						<div class="modal-dialog" style="width:93%;">
							<div class="modal-content" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i>Cleaning Request  List
											<!-- <a href="" data-dismiss="modal" style="margin-left: 950px;color: gray;" title="Close" onchange="javascript:window.location.reload()">X</a> -->
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12">
										<form class="form-horizontal  col-md-12-1" method="get">

											<div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Mrn
													Id </label><input type="text" class="form-control input-SmallText"
													required="true" name="txtDocNo"
													id="txtmaterialReqaestNoteListDocId" placeholder="Doc No" readonly/>
											</div>
											<div class="form-group col-sm-2-1" style="margin-right: 2%;width:100px;">
												<label class="TextFont">Mrn
													Date <b style="color: red;">*</b></label><input id="txtmaterialReqaestNoteDocDate"
													   placeholder="date" name="txtmaterialReqaestNoteDocDate"
													class='form-control input-SmallText' readonly/>
											</div>
											<div class="form-group col-sm-2-1" style="margin-right: 2%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont"> Sub Department Name<b style="color: red;">*</b>
														</label><input class=" typeahead form-control input-SmallText"
														required name="txtMRNLocationName" id="txtMRNLocationName" onkeyup="autoSuggestionForLocation('txtMRNLocationName','onchange');" 
													 readonly="readonly"	onkeypress="return validateAlphaNumberic(event);" placeholder="Inventory name"/>
													 <input id="deptId" value='0' type="hidden" >
												</div>
												
												
													<div class="form-group col-sm-2-1" style="margin-right: 2%;"
													id="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont">
														Raised By<b style="color: red;">*</b>
													</label><input class=" typeahead form-control input-SmallText"
														required name="raisedBy" id="raisedBy"
														readonly="readonly"
														placeholder="Raised By" />
														
														
												</div>
												
											
											
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
																<div id="ItemInfo" class="tab-pane fade in active ">

																	<div class="panel-body col-md-12-1">
																		<div style="padding-left: 12px;" class="col-sm-12-1">
																			<div style="height: 85%; margin-left: 2%;">
																				<div
																					style='width: 95%; font-weight: bold; height: 240Px; overflow-y: scroll; border: 1px solid #436a9d;'>
																					
																
																					<table id="ItemInfoTable" cellpadding="0"
																						cellspacing="0" border="1"
																						class="table table-bordered table-striped table-condensed">
																						<thead>
																							<tr>
																								<th class="col-md-2-2 center">select</th>
																								<!-- <th class="col-md-2-2 center">Sr No</th> -->
																								<th class="col-md-2-2 center">Item Name</th>

																								<th class="col-md-2-2 center">Sent Quantity</th>
																								<th class="col-md-2-2 center">Recieved Quantity</th>
																								<!-- <th class="col-md-2-2 center">Factor 1Quantity</th>
																								<th class="col-md-2-2 center">Factor 2</th>
																								<th class="col-md-2-2 center">Factor 3</th>
																								<th class="col-md-2-2 center">Factor 4</th> -->
																								<!-- <th class="col-md-2-2 center">UoM</th> -->
																								<th class="col-md-2-2 center">Pending Quantity</th>
																								<th class="col-md-2-2 center">Discard Quantity</th>
																								<th class="col-md-2-2 center">Narration</th>
																								<!-- <th class="col-md-2-2 center">Current-Inventory-Stock</th> -->
																								<!-- <th class="col-md-2-2 center">Check Availability</th> -->
																								<!-- <th class="col-md-2-2 center">Accept</th> -->																							
																							</tr>
																						</thead>
																						<tbody id="ItemInfoList"
																							style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																							
																						</tbody>
																					</table>

																				</div>
																				
																				<input type="hidden" id="txtMRNID"></input>
																				<input type="hidden" id="totalRow"></input>
																				<input type="hidden" id="hiddenCount" value="0"/>
																				<input type="hidden" id="recieveHidden" value=""/>

																			</div>
																		</div>
																	</div>
																</div>
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
							<!-- 		<div class="form-group col-sm-1-1" style="margin-left: 2%; text-align: left;">
										<label  style="margin-left: 1%; for="exampleInputEmail1" class="TextFont">Total
											item Qty </label><input type="text"
											class="form-control input-SmallText" required="true" readonly="readonly"
											name="firstName" id="txtMRNTotal" placeholder="Total item Qty">
									</div>
									<div class="form-group col-sm-2-1" style="margin-left: 2%; text-align: left;">
										<label style="margin-left: 6%;" for="exampleInputEmail1" class="TextFont">Remark
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="firstName" id="txtMRNRemark"
											placeholder="Remark">
									</div>
									
									<div class="form-group col-sm-2-1" style="margin-left: 2%; text-align: left;">
										<label style="margin-left: 6%;" for="exampleInputEmail1" class="TextFont">Carrier Name 
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtReceiverName" id="txtReceiverName"
											placeholder="Carrier Name ">
									</div> -->
									
									
								<!-- div for save and approved on issue mrn i store -->	
							<div class="form-group col-md-9-1" id="approvedHideBtns" style="margin-left: 280px;">
						<button type="button" id="ApprovedByLnl" name="ApprovedByIncharge" value="level-III"  onclick="ApproveRequestCsd()" class="btn btn-primary"   >Approved and Save</button>
						<button type="button" class="btn btn-default"  data-dismiss="modal" onclick="setreloadvalue();">Cancel</button>
						<input type="hidden" value="0" id="levelValue" />
						</div>
								
									<!-- End save on issue mrn i store -->
								</div>
							</div>
						</div>
					</div>
					
					
					
				<!-- ********************************************************** start div Return  and issue mrn on return **********************************************************-->			
					
					<div id="MaterialRequestReturnList" class="modal fade in" tabindex="-1">
						<div class="modal-dialog" style="width:93%;">
							<div class="modal-content" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i> Cleaning Request List
											<!-- <a href="" data-dismiss="modal" style="margin-left: 950px;color: gray;" title="Close" onchange="javascript:window.location.reload()">X</a> -->
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12">
										<form class="form-horizontal  col-md-12-1" method="get">

											<div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Mrn
													Id </label><input type="text" class="form-control input-SmallText"
													required="true" name="txtDocNo"
													id="reurnMrnId" placeholder="Doc No" readonly/>
											</div>
											<div class="form-group col-sm-2-1" style="margin-right: 2%;width:100px;">
												<label class="TextFont">Mrn
													Date <b style="color: red;">*</b></label><input id="returnDate"
													   placeholder="date" name="txtmaterialReqaestNoteDocDate"
													class='form-control input-SmallText' readonly/>
											</div>
											<div class="form-group col-sm-2-1" style="margin-right: 2%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont"> Sub Department Name<b style="color: red;">*</b>
														</label><input class=" typeahead form-control input-SmallText"
														required name="txtMRNLocationName" id="returndeptName" onkeyup="autoSuggestionForLocation('txtMRNLocationName','onchange');" 
													 readonly="readonly"	onkeypress="return validateAlphaNumberic(event);" placeholder="Inventory name"/>
													 <input id="returndeptId" value='0' type="hidden" >
												</div>
												
												
												<div class="form-group col-sm-2-1" style="margin-right: 2%;"
													id="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont">
														Raised By<b style="color: red;">*</b>
													</label><input class=" typeahead form-control input-SmallText"
														required name="raisedBy" id="raisedByReturn"
														readonly="readonly"
														placeholder="Raised By" />
														<input id="receivedByReturn"  type="hidden" >
													
														
												</div>
												
												<div class="form-group col-sm-2-1" style="margin-right: 2%;display:none;" id ="HideenFields">
												
													 <input id="recievedDate"  type="hidden" >
													 <input id="processingDate" type="hidden" >
													 <input id="machineId"  type="hidden" >
													 <input id="machineName"  type="hidden" >
													 <input id="processingId"  type="hidden" >
													 <input id="processingName"  type="hidden" >
													 <input id="conductedBy"  type="hidden" >
													 
												</div>
												
											
											
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
																<div id="ItemInfo" class="tab-pane fade in active ">

																	<div class="panel-body col-md-12-1">
																		<div style="padding-left: 12px;" class="col-sm-12-1">
																			<div style="height: 85%; margin-left: 2%;">
																				<div
																					style='width: 95%; font-weight: bold; height: 240Px; overflow-y: scroll; border: 1px solid #436a9d;'>
																					
																
																					<table id="ItemInfoTableReturn" cellpadding="0"
																						cellspacing="0" border="1"
																						class="table table-bordered table-striped table-condensed">
																						<thead>
																							<tr>
																								<th class="col-md-2-2 center">select</th>
																								<!-- <th class="col-md-2-2 center">Sr No</th> -->
																								<th class="col-md-2-2 center">Item Name</th>

																								<th class="col-md-2-2 center">Sent Quantity</th>
																								<th class="col-md-2-2 center">Recieved Quantity</th>
																								<th class="col-md-2-2 center">Return Quantity</th>
																								<!-- <th class="col-md-2-2 center">Factor 1Quantity</th>
																								<th class="col-md-2-2 center">Factor 2</th>
																								<th class="col-md-2-2 center">Factor 3</th>
																								<th class="col-md-2-2 center">Factor 4</th> -->
																								<!-- <th class="col-md-2-2 center">UoM</th> -->
																								<th class="col-md-2-2 center">Pending Quantity</th>
																								<th class="col-md-2-2 center">Discard Quantity</th>
																								<th class="col-md-2-2 center">Narration</th>
																								<!-- <th class="col-md-2-2 center">Current-Inventory-Stock</th> -->
																								<!-- <th class="col-md-2-2 center">Check Availability</th> -->
																								<!-- <th class="col-md-2-2 center">Accept</th> -->																							
																							</tr>
																						</thead>
																						<tbody id="ItemInfoList"
																							style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																							
																						</tbody>
																					</table>

																				</div>
																				
																				<input type="hidden" id="txtMRNID"></input>
																				<input type="hidden" id="totalRow"></input>
																				<input type="hidden" id="hiddenCount" value="0"/>
																				<input type="hidden" id="recieveHidden" value=""/>

																			</div>
																		</div>
																	</div>
																</div>
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
							<!-- 		<div class="form-group col-sm-1-1" style="margin-left: 2%; text-align: left;">
										<label  style="margin-left: 1%; for="exampleInputEmail1" class="TextFont">Total
											item Qty </label><input type="text"
											class="form-control input-SmallText" required="true" readonly="readonly"
											name="firstName" id="txtMRNTotal" placeholder="Total item Qty">
									</div>
									<div class="form-group col-sm-2-1" style="margin-left: 2%; text-align: left;">
										<label style="margin-left: 6%;" for="exampleInputEmail1" class="TextFont">Remark
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="firstName" id="txtMRNRemark"
											placeholder="Remark">
									</div>
									
									<div class="form-group col-sm-2-1" style="margin-left: 2%; text-align: left;">
										<label style="margin-left: 6%;" for="exampleInputEmail1" class="TextFont">Carrier Name 
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtReceiverName" id="txtReceiverName"
											placeholder="Carrier Name ">
									</div> -->
									
									
								<!-- div for save and approved on issue mrn i store -->	
							<div class="form-group col-md-9-1" id="approvedHideBtns" style="margin-left: 280px;">
						<button type="button" id="returnItemsToSub" name="ApprovedByIncharge" value="level-III"  onclick="returnRequestCsd()" class="btn btn-primary">Return Request</button>
						<button type="button" class="btn btn-default"  data-dismiss="modal" onclick="setreloadvalue();">Cancel</button>
						<input type="hidden" value="0" id="levelValue" />
						</div>
								
									<!-- End save on issue mrn i store -->
								</div>
							</div>
						</div>
					</div>
					
					<!-- End****************************  div on mrnlist on edit view *********************************************************************--> 

					


					<!-- <div
						style="width: 99.80%; height: 450Px; margin-top:-50px; overflow-y: scroll;"
						id="patientcontainer">
						<div id="MRNcontent">
						
						</div>
						
						
						<div id="MRNAjaxResp" style="visibility: hidden;"></div>
						<div id="MRNItemAjaxResp" style="visibility: hidden;"></div>
					</div> -->



						<div id="landlList" class="col-md-12-1  panel body"
							style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto; ">

							<div class="tab-content">
								<div style="margin-top: 10px;" class="col-md-12-1">
					<!-- 				 <button class="btn btn-xs btn-success" type='button'
								data-toggle="modal" data-target="#NewMRNForm" onclick="setclearPOPONAddLaundry();" >Add New MRN
								Request</button> --> 
									<div class="pull-right">
										<div class="dataTables_filter" id="datatable1_filters">
											<label id="searchlabel"><input
												aria-controls="datatable1" placeholder="Search By MRN Id"
												onkeyup="autosugetionCsdDept(this.id)" id="byName"
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
												<th style="height: 21.5px;" class="col-md-1"><div>MRN Date</div></th>
												<!-- <th style="height: 21.5px;" class="col-md-2"><div>MRN Remark</div></th> -->

												<th style="height: 21.5px;" class="col-md-1"><div>Sub Department Name</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Raised By</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Edit and Accept</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Return</div></th>
												
												<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
												<th style="height: 21.5px;" class="col-md-1"><div>Status</div></th>
												<!-- <th style="height: 21.5px;" class="col-md-1"><div>Purchase Request</div></th> -->

											</tr>
										</thead>

										<tbody id="divlandlList">

										</tbody>
									</table>
								</div>
							</div>
						</div>


						<div class=" col-md-12-1" style="margin-top: 12px; float: right;">
						
					</div>

				</div>
			</div>

		</div>
	</div>

	<div style="display: none;" id="hallDetailDiv"></div>
	<%@include file="Footer.jsp"%>
	<div id="pathologyAllPatInfo" style="display: none;"></div>
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
									<div class="modal-footer" style="margin-left: -150px;">
								    	<div class="form-group col-md-9-1">
											<!-- <button type="" class="btn btn-primary"
												onclick="updateBatchStockQty()">Save</button> -->
												<button type="button" class="btn btn-primary" onclick = "issueQtyAssign()">Save</button>
											<button type="button" class="btn btn-default" data-dismiss="modal" id="closeBtn"  >Cancel</button>
											

										</div>
									</div>
							</div>
						</div>
					</div>
				</div>
				
				
				<!--************************* new mrn request************************************************* -->
				
				<div id="NewMRNForm" class="modal fade in" tabindex="-1">
							<div class="modal-dialog" style="width:93%;">
								<div class="modal-content" class="col-md-12">
									<div class="modal-header">
										<div class="box-title">
											<h4>
												<i class="fa fa-calendar"></i>Material Request Note 
												<a href="" data-dismiss="modal" style="margin-left: 950px;color: gray;" title="Close" id="closeonclick" onclick="javascript:window.location.reload()">X</a>
											</h4>
										</div>
									</div>
									<div class="modal-body">
										<div class="col-md-12">
											<form class="form-horizontal  col-md-12-1" method="get" id="inventoryMRNForm">

												<div class="form-group col-sm-1-1" style="margin-right: 2%;">
													<label for="exampleInputEmail1" class="TextFont">Mrn
														Id </label><input type="text" class="form-control input-SmallText"
														required name="txtDocNo" id="txtmaterialReqaestNoteDocIdInList"
														placeholder="Doc No" readonly/>
														<input type="hidden" id="mrnid" value="0">
												</div>
												<div class="form-group col-sm-1-1" style="margin-right: 2%;">
													<label for="exampleInputEmail1" class="TextFont">Mrn Date<b style="color: red;">*</b>
														</label><input class="form-group"
														required name="txtMRNDateInList" id="txtMRNDateInList"
														placeholder="Mrn Date" readonly/>
												</div>
												
												<div class="form-group col-sm-2" style="margin-left: 2%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="TextFont"> Subinventory Name<b style="color: red;">*</b>
														</label><input class=" typeahead form-control input-SmallText"
														required name="txtMRNLocationNameInList" id="txtMRNLocationNameInList" onkeyup="autoSuggestionForLocationInList(this.id, 'onchange');" 
														onkeypress="return validateAlphaNumberic(event);" placeholder=" SubInventory name"/>
														<input type = "hidden" value ='0' id='subInventoryId'/>
												</div>
												
											<!-- 	<div class="form-group col-sm-1-1" style="margin-right: 2%;">
													<label for="exampleInputEmail1" class="TextFont"> Location
														</label><select class="form-control input-SmallText TextFont" 
														id="sclMRNLocationInList"
														Style="margin-left: -18px;">
														<option>Select</option>
														<option value="Open">Open</option>
														<option value="Closed">Closed</option>
														<option value="Hold">Hold</option>
														<option value="Cancelled">Cancelled</option>
													</select>
												</div> -->
												
												<!-- 
												<div class="form-group col-sm-1-1" style="margin-right: 2%;">
													<label for="exampleInputEmail1" class="TextFont"> Location
														</label><input class="form-control input-SmallText"
														required name="txtMRNLocation" id="txtMRNLocation"
														placeholder="Mrn Location">
												</div> -->
												
												
												
												<!-- <div class="form-group col-sm-2-1" style="margin-right: 2%;">
													<div class="form-group  col-md-12-1"
													style="margin-right: 2%; margin-left: 2%;margin-top: 20px;">

													<label for="exampleInputEmail1" class="TextFont">MRN Date</label>																				 
													<input
														id="txtMRNDate"
														name="txtMRNDate" required
														placeholder="Date" readonly="readonly"> 
												</div>												
												</div> -->

												<div style="margin-top: 0px; margin-left: 2px;"
													class="col-md-12-1">
													<!-- BOX -->

													<div class="box border col-md-12-1" style="margin-top:0px;">

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
																	<div id="ItemInfo" class="tab-pane fade in active ">

																		<div class="panel-body col-md-12-1">
																			<div style="padding-left: 12px;" class="col-sm-12-1">
																				<div style="height: 85%; margin-left: 2%;">
																					<div
																						style='width: 95%; font-weight: bold; height: 200Px; overflow-y: scroll; border: 1px solid #436a9d;'>
																						<button
																						onclick="setMaterialRequestInfoInListLaundry();"
																						class="btn btn-xs btn-success" type='button' id="btnAddNew" value="+" > + </button>
																						<button type="button" onclick="toRemovesetItemInfotrMRNInListLaundry('tblSubContractingCountRow')"style="margin: 7px;"class="btn btn-xs btn-success"  value="-" > - </button>
																						
																						<!-- <button onclick="setMaterialRequestInfo()"
																							class="btn btn-xs btn-success" type='button'>Add
																							New</button> -->
																						<table id="ItemInfoTableinLiST" cellpadding="0"
																							cellspacing="0" border="1"
																							class="table table-bordered table-striped table-condensed">
																							<thead>
																								<tr>
																								    <th class="col-md-2-2 center">select</th>
																									<!-- <th class="col-md-2-2 center">Sr No</th> -->
																									<th class="col-md-2-2 center">Item Name</th>

																									<th class="col-md-2-2 center">Mrn Quantity</th>

																									
																									<!-- <th class="col-md-2-2 center">UoM</th> -->
																								</tr>
																							</thead>
																							<tbody id="ItemInfoList"
																								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																								<!-- <tr>
																									<td><input type='text' id="txtMRNSlaveId1"
																										class='form-control input-SmallText' "></td>
																									<td><input type='text'
																										id="txtMRNItemName1"
																										class='form-control input-SmallText'></td>


																									<td><input type='text'
																										id="txtMRNDocQuantity1"
																										class='form-control input-SmallText'></td>
																									<td><input type='text' id="txtfactor11"
																										class='form-control input-SmallText'></td>
																									<td><input type='text' id="txtfactor21"
																										class='form-control input-SmallText'></td>
																									<td><input type='text' id="txtfactor31"
																										class='form-control input-SmallText'></td>
																									<td><input type='text' id="txtfactor41"
																										class='form-control input-SmallText'></td> -->
																							</tbody>
																						</table>

																					</div>
																					<input type="hidden" id="txtMRNIDInList"></input>
																					<input type="hidden" id="totalRowInList"></input>

																				</div>
																			</div>
																		</div>
																	</div>
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
										<div class="form-group col-sm-1-1" style="margin-left: 2%;text-align: left;">
											<label style="margin-left: 1%;" for="exampleInputEmail1" class="TextFont">Total
												Item Qty </label><input type="text" readonly="readonly"
												class="form-control input-SmallText" required="true"
												name="firstName" id="txtMRNTotalInList" placeholder="Total Item Qty"/>
										</div>
									<!-- 	<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
											<label for="exampleInputEmail1" style="margin-left: 6%;" class="TextFont">Remark
											</label><input type="text" class="form-control input-SmallText"
												style="float: right;" name="firstName" id="txtMRNRemarkInList"
												  placeholder="Remark"/>
										</div>
										
										<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left; display:none;">
											<label for="exampleInputEmail1" style="margin-left: 6%;" class="TextFont">Receiver Name
											</label><input type="hidden" class="form-control input-SmallText"
												style="float: right;" name="txtReceiverName1" id="txtReceiverName1"
												  placeholder="Receiver Name"/>
										</div>
										
										<div class="form-group col-md-9-1" id="iToHideBtns" style="margin-left: 280px;display: none;">
											<button type="button" class="btn btn-primary"
												onclick="saveMaterialRequestNoteInListLaundry()">Save</button>
											<button type="button" class="btn btn-default"
												data-dismiss="modal" id="closeBtn" onclick="javascript:window.location.reload()">Close</button>
												
											
										</div> -->
									</div>
								</div>
							</div>
							<input type="hidden" id="CurrentuserName"  value="<%=session.getAttribute("userName")%>"/>
						</div>
						
			<!-- *******************	finish mrn request div***********************************************8 -->
			
			
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
									onclick="checkUserNameandPasswordLnl()" />
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ENd  User Name and password for Approve Incharge  Date 18 jan 2016   Author:sudhir -->
			
			
			<!-- set dynamically accepted item values while issuing item select item and close the popup @Date 5:feb:2016 -->
	
<!--End set dynamically accepted item values while issuing item select item and close the popup @Date 5:feb:2016 -->	
	
</body>
</html>