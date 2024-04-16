<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Laundry  Report </title>
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
	<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />
	<!-- FONTS -->
	<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'> -->
		
	<script type="text/javascript" src="js/ehat_billing.js"></script>
	<script type="text/javascript" src="js/inventoryNew.js"></script>
	<script type="text/javascript" src="js/LaundryManagement.js"></script>
	
	<!-- <script type="text/javascript" src="js/demoConfiguration2.js"></script> -->
	
	<!--calender Files  -->
	<script type="text/javascript"
		src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet"
		href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
		media="screen"></link>
	
	
<!-- include js for development -->

<script>
	jQuery(document).ready(function() {
		
		// added by vinod 
		unitMasterList();
		//getAllDept();		
		getBillPrefix("",2);
		//getBulkReceiptDetails("credit");
		//getAllChargesMasterOpd();		
		//getAllChargesl();
		//setDyanamicDivForChargesinfo('dynamicItemsinfo','listmstr_select_chargesinfo');
		// added by vinod 
		//getAllPayments();
		//getWardWisePatientsDetails();
	});
	
</script>

</head>
<body>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>
		
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
			String todays_date = formatter.format(currentDate.getTime());
		%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="left_menu_LinenLaundry.jsp"%>

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
										<li>Reports</li>
										<li>Laundry Reports</li>
										
										<div class="li pull-right">
											<div class="form-group"> 
												<div class="col-md-12"> 													
													<div id="input-type" class="row"> 
														
														 <div class="col-sm-4"> 
														<button id="btnPrint12" class="btn btn-xs btn-warning"
													value="" onclick="printLnlReport()" title="" 
													data-toggle="tooltip" data-original-title="Print">Print</button>
															</div> 															
																																	
														<div class="col-sm-4"> 
														<button id="btnPrint" class="btn btn-xs btn-danger"
													value="" onclick="" title="" data-placement="left"
													data-toggle="tooltip" data-original-title="Print">Export
													To Excel</button> </div> 	
													 <script type="text/javascript">
														$("[id$=btnPrint]")
																.click(
																		function(
																				e) {
																			window
																					.open('data:application/vnd.ms-excel,'
																							+ encodeURIComponent($(
																									'div[id$=printDiv]')
																									.html()));
																			e
																					.preventDefault();
																		});
													</script> 


													</div> 
												</div> 
											</div> 
										</div> 
										
									</ul>
									<!-- /BREADCRUMBS -->

								</div>
							</div>
						</div>

						<div class="row">
							<!-- NEW ORDERS -->
							<div class="col-md-12">
								<div class="box border">
									<div class="box-title">
										<h4>
											<i class="fa fa-colum"></i> <span
												class="hidden-inline-mobi"></span>					
												
										</h4>
								<!-- 		<div id="divbyName" class="col-md-12 TextFont"style="top: -6px;width: 211px;">
											<input type="text"
												onkeyup="getWardWisePatientsDetails()"
												placeholder="Search by-Patient Name"
												class="typeahead form-control input-SmallText ui-autocomplete-input"
												id="byName" name="byName" autocomplete="off" >
										</div> -->
										
										
									
									
									</div>
									<div class="box-body" style="min-height: 600px">
										
										<form name="mysearchForm">
											<div style="width: 100%; height: 99%;">
												<div id="rightContActual">
			
													<!-- Start Tab UI -->
													<div class="col-md-12"
														style="margin-top: 5px; margin-left: 0px;">
														<!-- Start BOX -->
														<div class="box col-md-12">
												
															
															<div class="tabbable col-md-12">
															
										             			<input type="hidden" id="depdoctordesk" value="1">	
																
																<div class="tab-content">
			
																	<!-- START Code for OPD_NEW GUI -->
																	<div id="OPD" class="tab-pane fade in active">
																		<div class="col-md-12 box border" style="padding: 5px">
																			<!-- <div style="font-weight: bold;" class="col-md-2">Search By:</div> -->
																			
																			<!-- <div class="col-md-3 TextFont"> -->
																				
																				<div class="col-md-2">
																																				
																				 	<div class="col-md-2" style="margin-top: 5px;"><label>From</label></div>
																				 	<div class="col-md-13" style="margin-top: 5px;">
																					 	<input id="fromDate" class="form-control input-SmallText" type="text"													
																						onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)"
																						readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
																					</div>
																					
																					
																				</div>										 

																			<!-- </div> -->
			
																			<!-- <div class="col-md-3 TextFont"> -->
																				
																				<div class="col-md-2">
																																
																					<div class="col-md-2" style="margin-top: 5px"><label>To</label></div>
																					<div class="col-md-13" style="margin-top: 5px">
																					 	<input id="lastDate" class="form-control input-SmallText" type="text"													
																						onclick="displayCalendar(document.getElementById('lastDate'),'yyyy-mm-dd',this)"
																						readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
																					</div>
																					
																					
																				</div>	
																				
<!-- 																				<div class="col-md-3">
																																
																					<div class="col-md-8" style="margin-top: 5px"><label>Ward Type:</label></div>
																					<div class="col-md-13" style="margin-top: 5px">
																						<select id='wardType5' 
																						class='form-control input-SmallText'
																						onchange='' value="0">
																					</select>
																					</div>
																					
																				
																				</div> -->	
																				
																				<div class="col-md-3" style="display:none;">
																																
																					<div class="col-md-8" style="margin-top: 5px"><label>Admitted Under</label></div>
																					<div class="col-md-13" style="margin-top: 5px">
																					 	<select id='docListBedWise'
																						class='form-control input-SmallText'
																						onchange='' value="0">
																					</select>
																					</div>
																					
																					
																				</div>	
																				<div class="col-md-2">
																																
																					<div class="col-md-12" style="margin-top: 11px"><label> </label></div>
																					<div class="col-md-8"> 
															 <input type="button" class="btn btn-xs btn-warning"
																value="show" onclick="getLnlReport();" />
														</div> 
																					
																					
																				</div>
																				

																			<!-- </div> -->
																			
																		</div>
																		
																		
																		
																		
								<div class="box border">
								<div class="box-title">
									<h4>
										<i class="fa fa-colum"></i> <span class="hidden-inline-mobi"></span>
									</h4>
								</div>
								<div class="box-body">
									<div class="tabbable header-tabs">
										
										<div class="panel panel-default"
											style="border: none; margin-top: -9px">
											<div class="panel-body">

												<div id="printDiv" class="col-md-12" style="margin-top: 5px">

													<div id="divLine2" class=" box border col-md-12" style="overflow: auto;">
														<form class="form-horizontal col-md-12"
															style="margin-top: 10px">

															<br>
															
															<div>													
																<table class="datatable table table-bordered table-striped table-condensed cf" id="hisabTbl"
																	style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;">
																	<thead class="cf">
																		<tr>
		<th class='center TextFont' style="width: 5%;">SR NO.</th>
																						<th class='center TextFont' style="width: 5%;">Date</th>
																																							
																						<th class='center TextFont' style="width: 23%;">Description of Linen</th>
																																												
																						<th class='center TextFont' style="width: 7%;">Qty Given</th>
																						<th class='center TextFont' style="width: 10%;">Sign Ward</th>
																					<!-- 	<th class='center TextFont' style="width: 15%;">Autoclave/ETO </th> -->
																					
																						<th class='center TextFont' style="width: 7%;">Qty Received</th>	
																						<th class='center TextFont' style="width: 10%;">Sign Laundry</th>
																						
																						<th class='center TextFont' style="width: 7%;">Qty Received</th>	
																						<th class='center TextFont' style="width: 10%;">Sign Ward</th>
																						
																							<th class='center TextFont' style="width: 7%;">Balance Qty</th>	
																						<th class='center TextFont' style="width: 10%;">Sign Laundry</th>
																						
																						<th class='center TextFont' style="width: 7%;">Balance Received</th>	
																						<th class='center TextFont' style="width: 10%;">Sign Ward</th>
																																													
																		</tr>
																	</thead>
																	
																	<!-- <tbody id="container">
	
																	</tbody> -->
																</table>
															</div>
														
															<div
																style="overflow: auto; margin-top: -7px; height: 350px;"
																class="col-md-12-1 box border">
																<table class="table table-bordered table-striped table-condensed cf">
																	<tbody id="hallWiseData">

																	</tbody>
																</table>
															</div>

														</form>
													</div>

												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																		
																	<!-- 	
																		<div class="divide-20"></div>
																		<div id="printDiv">
																		<div>
																			<table class="table table-condensed cf" style="margin-top: 10px;">
																				<thead class='cf' style="background: #dbdbdb">
																					<tr>
																						<th class='center TextFont' style="width: 5%;">#</th>
																						<th class='center TextFont' style="width: 6%;">Adm No.</th>
																						<th class='center TextFont' style="width: 6%;">Reg No.</th>																						
																						<th class='center TextFont' style="width: 15%;">Patient Name</th>																						
																						<th class='center TextFont' style="width: 15%;">Bed</th>
																						<th class='center TextFont' style="width: 7%;">Admitted Under</th>
																						<th class='center TextFont' style="width: 12%;">Company </th>
																						<th class='center TextFont' style="width: 7%;">Patient Type</th>
																						<th class='center TextFont' style="width: 7%;">Self /Mediclaim</th>	
																						<th class='center TextFont' style="width: 7%;">Total Days</th>		
																					</tr>
																				</thead>
																			</table>
																		</div>
																		
																		<div class='col-md-12'
																			style='margin-top: -8px;margin-bottom:8px; overflow-y: scroll; height: 340px; max-height: auto; border: 1px solid #dddddd;'>
																			<table class='table table-condensed cf' id="bulkTbl">
																				<tbody id="hallWiseData" class="cf">
																				</tbody>
																			</table>
																		</div>
																		</div> -->
																		
																		
																	<!-- 	<div class="col-md-12">
																			
																		
																			
																			 <form class="form-inline">
																			 
																			 	<div class="col-md-3">
																					
																					<div class="form-group col-md-12">
																						<label class="control-label col-md-5">Payee</label>
																						<div class="col-md-7">
																							<select class="form-control" id="payee" style="width: 100%" onchange="showSponsor()">
																								<option value="1">Patient</option>
																								<option value="2">Sponsor</option>													
																							</select>
																						</div>
																					</div>
																			
																					<div id="trSpon" class="form-group col-md-12" style="display:none; ">
																						<div class="col-md-12">  
																							<select class="col-md-8" name="listmstr" id="listmstr_select_payee" 
																								style="width: 145px" 
																								onchange="setDyanamicDivForChargesinfo2('dynamicItemsinfo2',this.id)"> 
																								<option id="firstElmts2">--- Select Payee ---</option> 
																							</select> 
																							<div class="col-md-12 select2-container select2-container-multi " 
																								style="margin-top: 2%; width: 145px"> 
																								<ul id="dynamicItemsinfo2" class="select2-choices" 
																									style="overflow-y: scroll; min-height: 30px"> 
																								</ul>
																							</div> 
																						</div> 
																					</div>
																				
																					<div class="col-md-12 select2-container select2-container-multi">
																						<ul id="dynamicItems" class="select2-choices"
																							style="overflow-y: scroll;">
									
																						</ul>
																					</div>
																																													
																				</div>																
																					
																			   <div class="col-md-3">
																					<div class="form-group col-md-12">
																						<label class="control-label col-md-6">Total Due</label>
																						<div class="col-md-6">
																							<input type="text" class="form-control" id="payable" value="0" readonly/> <span
																								class="error-span"></span>
																						</div>
																					</div>
																					
																					<div class="form-group col-md-12">
																						<label class="control-label col-md-6">Pay Mode</label>
																						<div class="col-md-6">
																							<select class="form-control" onchange="BankOnSelect()" id="payMode">
																					
																							</select>
																						</div>																					 
																					</div>																					
																					
																				</div>
																				
																				<div class="col-md-3">
																					<div class="form-group col-md-12">
																						<label class="control-label col-md-5">Total</label>
																						<div class="col-md-7">
																							<input type="text" class="form-control"	id="gotPay" value="0" onkeyup="distributeConTds(this.id)"/> <span
																								class="error-span"></span>
																						</div>
																					</div>
																					
																					<div class="form-group col-md-12">
																						<label class="control-label col-md-5"></label>
																						<div class="col-md-7">
																							<button type="submit" onclick="saveBulkDetails('btn')" class="btn btn-primary">Save</button>
																						</div>																					 
																					</div>
																				</div>
																				
																			  	<div class="col-md-3">
																					<div class="form-group">
																						<label class="control-label col-md-6">Total Payable</label>
																						<div class="col-md-6">
																							<input type="text" class="form-control"	id="payNow" value="0" /> <span
																								class="error-span"></span>
																						</div>
																					</div>
																				</div>																			
																				
																			 
																			</form> 																		
																			
			
																		</div> -->
																		<!-- END Code for OPD_NEW GUI -->
			
																	
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</form>
										
										
										
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
		<!-- Modal For Multiple Payments Start -->

	<div class="md-modal md-effect-11" id="modal-11"
		style="border-radius: 10px">
		<div class="md-content">

			<div class="modal-header"
				style="background: #FFE0C2; height: 10px; border-bottom: 1px solid orange; border-top: 1px solid orange;">
				<!-- <button type="button" style="font-size: 1.5em; color: red" 
					class="md-close close" data-dismiss="modal">&times;</button> -->
				<center>
					<h4 class="modal-title">
						<b>Multiple Payment Modes</b>
					</h4>
				</center>				

			</div>
			<div class="modal-body">


				<div style="margin-top: 12px;" class="box border col-md-12">

					<div class="tabbable col-md-12">
						<ul class="nav nav-tabs" style="padding: 0px">						
							
							<div class="li pull-right" style="width: 100px">
								<button value="+" id="btnAddNew" type="button" style="margin: 7px;float: left;margin-left: 40px"
									class="btn btn-xs btn-success" onclick="toCreateTr()">+</button>
								<button value="_" id="btnDelete" type="button" style="margin: 7px;" 
									class="btn btn-xs btn-success" onclick="toRemoveTr('RowCount')">-</button>
							</div>

						</ul>
						<div class="divide-10"></div>
						
						<div class="tab-content col-md-12">
							<div style="overflow-x: auto;" class="tab-pane fade in active "
								id="ItemInfoPO">

								<div class="panel-body col-md-12">
									<div class="col-sm-12-1" style="padding-left: 0px;">
										<div style="height: auto;">
											
											<div style="width: 100%;; font-weight: bold; height: 150Px;">
												
												<table border="1" class="table table-bordered table-striped table-condensed"
													id="multiPayTable">
													<thead>
														<tr>
															<th class="col-md-2-2 center">Select</th>
															<th class="col-md-2-1 center">Pay Mode</th>	
															<th class="col-md-2-2 center">Amount</th>														
															<th class="col-md-2-1 center">Bank</th>
															<th class="col-md-2-2 center">Bank No.</th>
															<th class="col-md-2-2 center">Acc No.</th>
															
														</tr>
													</thead>
													<tbody	style="overflow-y: scroll; border: 1px solid #436a9d;" id="multiPayTbody">
																							
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

				<!-- </div> -->
				<div class="modal-footer" style="text-align: left;">

					<form class="form-inline col-md-12">

						<div class="form-group col-md-3">
							<label for="email">Payable:</label> <input type="text"
								class="form-control" id="multiPayable" value="0"
								readonly="readonly">
						</div>
						
						<div class="form-group col-md-3">
							<label for="pwd">Pay Now :</label> <input type="text"
								class="form-control" id="multiPayNow" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd">Remain :</label> <input type="text"
								class="form-control" id="multiRemain" value="0"
								readonly="readonly">
						</div>

						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							<button type="button" class="form-control btn btn-primary md-close"
								id="idForClose"	onclick="setMultiPayNowBulk()" data-dismiss="modal">Submit</button>							
						</div>
						
						<div class="form-group col-md-2">
							<label for="pwd"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
							
							<button type="button" class="form-control btn btn-primary md-close"
								onclick="closeBulkPopup()" data-dismiss="modal">Cancel</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>
 
	<!-- Modal For Multiple Payments End   -->
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
	
	<script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
			/* setNewTemp("unitMaster"); 
			getUnitCount();//count of total unit
			getDeptCount();//count of total dept
			getServiceCount();//count of total service
			getSubServiceCount();//count of subservice
			getChargesMasterCount();//count of charges
			getSubChargesCount();//count of sub charges */
		});
	</script>
		
<!-- /JAVASCRIPTS -->
<input type="hidden" id="sourceType" value="1">
<input type="hidden" value="<%=session.getAttribute("userType")%>" id="userName" />
<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
<input type="hidden" id="hdnTotRemain" value="0">
<input type="hidden" id="hdnTotDisc" value="0">
<input type="hidden" id="patPrefix" value="0">
<input type="hidden" id="patMiddle" value="0">
<input type="hidden" id="patSufix" value="0">
</body>
</html>