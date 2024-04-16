<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Canteen</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>


<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />

<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">

<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />

<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
	<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>

<script src="js/ehat_canteen.js"></script>

   <%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
		String todays_date = formatter.format(currentDate.getTime());
	%>


</head>
<body>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="left_menu_canteen.jsp"%>

		<!-- /SIDEBAR -->
		<div id="main-content">

			<div class="container ">
				<div class="row">
				
			
				
					<div id="content" class="col-lg-12  panel body">
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
										<li>Canteen Management system</li>
										<li class="li pull-right">
											<div class="col-sm-1">
												<input type="button" value="Save(Ctrl + S)"
													onclick="savecanteen()" class="btn btn-success">
											</div>
										</li>
										<li class="li pull-right">
											<div style="" class="col-sm-1 ">
												<button onclick="hideCanteenDiv();"
													class="btn btn-xs btn-info">View List(Ctrl + v)</button>
											</div>
										</li>
										<li class="li pull-right">
											<div style="" class="col-sm-1 ">
												<button onclick="viewDiet();"
													class="btn btn-xs btn-info">View Diet(Ctrl + z)</button>
											</div>
										</li> 
									</ul>

								</div>
							</div>
						</div>


<div id="canteendetails" class="col-md-12-1"
								>
						<div class="row">
							<!-- NEW ORDERS -->





							<div style="margin-top: -30px"
								class="container box border green panel">

								<div id="canteendiv" class="box-body big ">
									<div style="width: 18%;" class="form-group col-md-3 ">
										<label class="control-label">Table No</label><input
											type="text" maxlength="150" placeholder="Table No"
											id="tableno" title="" value="1" onblur="changeDineNo();">
										
									</div>

									<div style="width: 25%;" class="form-group col-md-3 ">
										<label class="control-label">Customer Name</label><input
											type="text" placeholder="Customer Name" id="patientName"
											title="">
									</div>

										

										

									</div>

							</div>
							
							

								<div id="HSTDiv" class="panel body col-md-12 "
									style=" height: 300Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">

									<div class="col-md-12-1">
										<input type="button" onclick="deleteRow();"
											style="margin: 7px; float: right"
											class="btn btn-xs btn-success" value="-">
									</div>
									<div class="col-md-12-1">
										<table border="1"
											class="table table-bordered table-striped table-condensed"
											id="ItemInfoTable">
											<thead>
												<tr id="h">
													<th class="col-md-1 center">Table No</th>
													<th style="height: 21.5px;" class="col-md-1 center"><div
															class="TextFont">Sev Code</div></th>
													<th style="height: 21.5px;" class="col-md-2 center"><div
															class="TextFont">Item Name</div></th>

													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Rate</div></th>

													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Quantity</div></th>
													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Amount</div></th>

													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Select</div></th>
												</tr>
											</thead>
											<tbody
												style="height: 87%; overflow-y: scroll; border: 1px solid;"
												id="DRRDiv">

												<tr id="remove1">
													<td ><input type="text" maxlength="3"
														value="1" readonly="readonly"
														class="form-control input-SmallText # deleteGroup1 # textNoDelete"
														name="tableNo1" id="tableNo1" tabindex="-1">
														<input type="hidden" id="canteenslaveId1" value="0">
														</td>

													<td><input type="text" autocomplete="off" value=""
														class="form-control input-SmallText # deleteGroup1 # textNo"
														name="codeName1" id="codeName1"
														></td>
<!-- onblur="getcateenservicesbycodes(this.id,1)" -->
													<td><input type="text" autocomplete="off" value=""
														class="form-control input-SmallText typeheadCounterPo1"
														name="subservice1" id="subservice1"
														onkeyup="getcateenservices(this.id,1),toCreateRow();"
														></td>



													<td><input type="text" value="0" autocomplete="off"
														class="form-control input-SmallText # deleteGroup1 # textNo"
														name="charges1" id="charges1"></td>



													<td><input type="text" value="1" autocomplete="off"
														class="form-control input-SmallText # deleteGroup1 # textNo"
														name="textQty1" id="textQty1" onkeyup=" calculateAmt(1);"></td>


													<td><input type="text" value="0" readonly="readonly"
														class="form-control input-SmallText # deleteGroup1 # textNo amtclass"
														tabindex="-1" name="textAmount1" id="textAmount1">

														<input type="hidden" id="serviceid1" value="0"> <input
														type="hidden" id="subId1" value="0"> 
														<input type="hidden" value="0" id="billdetailsid1">
														</td>


													<td><input type="checkbox" id="deleteGroups1" value="1"
														 name="deleteGroups"
														class=""></td>




												</tr>




											</tbody>
										</table>
									</div>
								</div>

								<div id="DietDiv" class="panel body col-md-6 "
									style="height: 300Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d; display: none">
										
										<h5 id="dietData"></h5>
										
								</div>
								
								<!-- /NEW ORDERS -->

								<div class="divide-20"></div>
								<div class="divide-20"></div>
							</div>
							<div style="margin-top: -30px"
								class="container box border green panel">

								<div id="canteendiv" class="box-body big ">

									<div style="width: 18%;" class="form-group col-md-3 ">
										<label class="control-label">Gross Amount</label><input
											type="text" maxlength="150" id="totalamount" title=""
											value="0" readonly="readonly">

									</div>
									<div style="width: 18%;" class="form-group col-md-3 ">
										<label class="control-label">GST% </label><input type="text"
											value="0" id="gstper" title="" onkeyup="calculategst();">
									</div>

									<div style="width: 18%;" class="form-group col-md-3 ">
										<label class="control-label">GST Amt </label><input
											type="text" value="0" id="gstamt" readonly="readonly">
									</div>



									<div style="width: 18%;" class="form-group col-md-3 ">
										<label class="control-label">Net Amount</label><input
											type="text" value="0" id="totalAMountgst" readonly="readonly">
									</div>
                                 
                            
									

                                  <div style="width: 18%; " class="form-group col-md-3 " id="rem">
										<label class="control-label">Paid Amount</label><input
											type="text" value="0" id="paidamt" readonly="readonly">
								  </div>

								</div>
								
								
								
								
								<div id="canteendiv" class="box-body big ">


                                   <div style="width: 18%;" class="form-group col-md-3 ">
										<label class="control-label">IPD Effect</label><input
											id="ipdeffect" value="1" 
											name="del"
											class="" onclick="setIpdeffect();"
											type="checkbox">
									</div>
									<div  style="width: 18%;" class="form-group col-md-5 ">

                                             <input
												value="1" style="" onclick="myFunction(1)"
												name="purTransType" id="rdoCash" type="radio" checked="checked"> <b>Cash</b>
											<input value="2" onclick="myFunction(2)" name="purTransType"
												id="rdoCashCredit" type="radio"> <b>Credit</b> 
											<input value="3" style=""
												onclick="myFunction(3)" name="purTransType" id="rdoCard"
												type="radio"> <b>Card </b>




						          </div>
									<div style="width: 18%; display: none;" id="cardnodiv"
											class="form-group col-md-3 ">
											<label class="control-label">Card No</label><input
												type="text" placeholder="card no" id="cardno" title="">
										</div>



										<div style="width: 18%; display: none;" id="batchnodiv"
											class="form-group col-md-3 ">
											<label class="control-label">Batch No</label><input
												type="text" placeholder="batchno" id="batchno" title="">
										</div> 
										

								</div>

							</div>


						</div>
						
	<div id="canteenList" class="col-md-12-1  panel body"
			style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto; display: none;">

			<div class="tab-content">
				<div style="margin-top: 10px;" class="col-md-12-1">
					<button onclick="showcanteenDiv();"
						class="btn btn-xs btn-info">Add New(Clt + c)</button>



									<div class="pull-right">
										<div class="dataTables_filter" id="datatable1_filters">
											<label id="searchlabel"><input
												aria-controls="datatable1" placeholder="Search By Bill No"
												onkeyup="autosugetioncanteenList(this.id)" id="byName"
												class="form-control input-sm" type="text"></label>
										</div>
									</div>

								</div>
				<div id="canteenDiv" class="tab-pane fade in active">



					<table class="table table-hover cf "
						style="Width: 100%; margin-top: 5px;">
						<thead class="cf" style="background: white;">
							<tr>
								<th style="height: 21.5px;" class="col-md-1"><div>Sr
										No</div></th>
								<th style="height: 21.5px;" class="col-md-2"><div>Bill No
										</div></th>
								<th style="height: 21.5px;" class="col-md-2"><div>Customer Name
										</div></th>
								<th style="height: 21.5px;" class="col-md-2"><div>Total Amt
										</div></th>

								<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>
								<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
								<th style="height: 21.5px;" class="col-md-1"><div>Print</div></th>
								
							</tr>
						</thead>

						<tbody id="divcanteenList">

						</tbody>
					</table>
				</div>
			</div>
		</div>
						
						
						


					</div>


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


        <input type="hidden" id="canteenIds" value="0">
		<input type="hidden" id="count" value="0">
		<input type="hidden" id="currentrowcount" value="1">

		<input type="hidden" id="rowcount" value="1">


		<input type="hidden" id="billId" value="0">
		<input type="hidden" id="patientId" value="0">
		<input type="hidden" id="treatmentId" value="0">
		
		<input type="hidden" id="treatmentId" value="0">
		<div id="customizeTemplateDiv" style="display: none;"></div>


<div id="year_Pop_Up" class="modal fade in" style="height:500px;">
	<div class="modal-dialog" style="width:;">
		<form action="">
			<div class="modal-content center" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i>Patient Wise Diet
						</h4>
					</div>
				</div>
							
				<div class="modal-body" style="margin-top:9px;">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 0px;"></div>
						
						<div class="row">

                                    <div class="col-sm-12">
										
										 <div class="col-sm-2" style="margin-top: -24px;" >
										<h6><label for="inlineFold" class="control-label">Search
											By  </label></h6>
									       </div>
									       <!-- <div class="pull-right"> -->
											<div class="col-sm-4">
											    <select id="selCustomizeTemp" name="selCustomizeTemp" style="margin-top: -20px; width: 145%;" class="col-md-11-1 form-control input-SmallText ">
											     <option onclick="setPatientWiseDietList()" value="0">NewTemplate</option>
											      </select> <input type="hidden" name="byTemplateName" value="0" id="byTemplateName">
										     </div>
										     
										    <div class="col-md-3" style="margin-top: -20px;margin-left: 55px;">
										
									</div>

									<div class="col-md-3" style="margin-top: -20px;margin-left: 15px;">
									</div>	
									<div class="col-sm-2">
														</div>
								
									</div>
									
									 <div class="col-sm-12" style="margin-top: 30px;">
										 
										    <div class="col-md-3" style="margin-top: -20px;">
										<div class="col-md-2">
											<label>From</label>
										</div>
										<div class="col-md-16">
										    <input id="fromDate" class="form-control input-SmallText"
												type="text"
												onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>">
										</div>
									</div>

									<div class="col-md-3" style="margin-top: -20px;">
										<div class="col-md-2">
											<label>To</label>
										</div>
										<div class="col-md-16">
											<input id="toDate" class="form-control input-SmallText"
												type="text"
												onclick="displayCalendar(document.getElementById('toDate'),'yyyy-mm-dd',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>">
										</div>
									</div>	
									
																						
														<div class="col-md-1" style="margin-top: -1px;">
										<input type="button" onclick="setDateWisePatientDietList();"
											class="btn btn-xs btn-primary" value="Show">
									</div>
									
									<div class="col-sm-2" style="margin-top: -1px;">
															<input type="button" onclick="printPatientWiseDietList('print');"
											class="btn btn-xs btn-warning" value="Print">
																
														</div>
														
														<div class="col-sm-2" style="margin-top: -1px; margin-left:-25px;">
															<input type="button" onclick="printPatientWiseDietList('sticker');"
											class="btn btn-xs btn-warning" value="Print Sticker">
																
														</div>
												
										<!-- </div> -->

									</div>
								
							</div>
						
					</div>

					<div class="col-md-12-1"
						style="height: 100%; width: 100%; padding-left: 0px; margin-top: 10px">
						<table id="dinfo" border="1"
							class="table table-bordered table-striped table-condensed"
							style="height: 100%; width: 100%;">
							<thead>
								<tr>
								<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>select</div></th>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>#</div></th>
									<th class=' col-md-2-1 center' style='height: 21.5px;'><div
											class='TextFont'>Patient Nmae</div></th>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Patient Id</div></th>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Bed No</div></th>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Ward Name</div></th>
									<th class=' col-md-2-1 center' style='height: 21.5px;'><div
											class='TextFont'>Temp Name</div></th>
									<th class=' col-md-2-1 center' style='height: 21.5px;'><div
											class='TextFont'>fromDate</div></th>
									<th class=' col-md-2-1 center' style='height: 21.5px;'><div
											class='TextFont'>toDate</div></th>

								</tr>
							</thead>

							<tbody id="yearData"
								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
							</tbody>
						</table>
					</div>
					
				</div>
				
				<div class="modal-footer">
					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<!-- <button type="submit" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave"
							onclick="setTr(1)" data-dismiss="modal">OK</button> -->
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<div style="display: none;" id="divTp"></div>
		<%@include file="footer_nobel.jsp"%>
	</section>
	<!--/PAGE -->

	<!-- JAVASCRIPTS -->

	<script
		src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
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

	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
			
			
		});
	</script>
	<script type="text/javascript">
		shortcut.add("Ctrl+s", function() {

			savecanteen();
		});
		shortcut.add("Ctrl+v", function() {

			hideCanteenDiv();
		});
		
		shortcut.add("Ctrl+c", function() {

			showcanteenDiv();
		});
		
		shortcut.add("Ctrl+z", function() {

			viewDiet();
		});
	</script>

</body>
</html>