<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>OT | Pharmacy Indent</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/pharma_patient.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/Channeling.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script src="js/ExtraJs/inventory_Material_Request_Note.js"></script>
<script type="text/javascript" src="js/ipd_nurshing_station.js"></script>

<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!-- /for Developers  -->
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>

	jQuery(document).ready(function() {
		App.setPage("IPD_OPD_Database"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>

<script type="text/javascript">
	onload = function() {
		$("#patEntry").addClass("anchorActive");
		getIndentTemplateDetails('indent');
		getStoreDetails();
		getSalesQuotationDashboard('onload');
		
		
		
		new JsDatePick({
			useMode : 2,
			target : "allergyDate",
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath : "../img/",
			weekStartDay : 1,
		});	
		
		setAutoPatientName("byName", "onload", "IPD_OPD_PatientDatabase");
	}
	
	function getStoreDetails() {

		var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			//data : {storeName:'ot'},
			//url : "/EhatEnterprise/pharmacy/mrn/getStoreDetailsByStoreName",
			url : "pharmacy/store/SubStoreList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				
				//var parseData=jQuery.parseJSON(r); 
				setIndentStoreDropDown(r);

			}
		});
	}
	
	function setIndentStoreDropDown(result)
	{
		var content="";
		for(var i=0;i<result.lstSubStore.length;i++)
		{
			content = content+"<option value='"+result.lstSubStore[i].storeId+"'>"+result.lstSubStore[i].storeName+"</option>";
		}	
		$("#pharmaStoreId").append(content);
	}
	
	
/* 	function loadIndentPopUp() {
		if ($('#stockSelection').is(":checked")) {
			$('#Po_Pop_Up').modal('show');
			$('#orderFormContent1').html("");
		}
	}; */
</script>
</head>
<body style="background: white ! important;">
	<section id="page">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%></header>
		<%@include file="PharmacyIndentPopUp.jsp"%>
		<%@include file="left_menu_otmanagement.jsp"%>
		<!-- /SIDEBAR -->
		<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
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
										style="padding: 7px 10px; margin-top: 1px;">
										<li>Date : <%=todays_date%></li>
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li><a href="OTScheduler.jsp">OTScheduler</a></li>
										<li><a href="inventory_Indent.jsp">Indent</a></li>
										<!-- 	<li class="pull-right">
										<button class="btn btn-xs btn-success" type='button'
											value='Save Now'>Save</button>
										<button class="btn btn-xs btn-warning">Print</button>
										<button class="btn btn-xs btn-danger">Discard</button>
									</li> -->
									</ul>

								</div>
							</div>
						</div>

						<div class="col-md-12-1">
							<div class="col-md-2-1">
								<table style="background-color: #669999; color: white;"
									class="table table-bordered table-striped table-condensed">
									<thead>
										<tr class="col-md-2-2">
											<th width="200" style="text-align: center;">Select
												Patient</th>
											<th width="20" style="text-align: center;"><input
												id="chkEntireDatabase" type="radio" value="diagnosis"
												name="typeOfpatient" onclick="showPateintNameandID()"
												onchange="showPatDiv()" style="margin-top: -10px;"></th>
										</tr>
									</thead>
								</table>

								<!-- <table border="1">
								 <tr><th><label class="checkbox input-SmallText ">Select Patient</label></th>
								 <th><input
									id="chkEntireDatabase" type="radio" value="diagnosis"
									name="typeOfpatient" onclick="showPateintNameandID()"
									onchange="showPatDiv()" style="margin-top: -10px;"></th></tr>
								</table> -->
								<!-- <label class="checkbox input-SmallText ">Select Patient</label> -->
							</div>
						</div>
						<div id="showPatDiv" class="col-md-12-1"
							style="margin-left: 20%; margin-top: -3%; display: none;">
							<div class="col-md-1-1">
								<label class="TextFont"
									style="margin-left: 10%; margin-top: 3%;">Patient Name:</label>
							</div>


							<div style="" class="col-md-2-1 TextFont" id="divtxtPatientName">
								<input class=" typeahead form-control input-SmallText" required
									name="txtPatientName" id="txtPatientName"
									placeholder="Patient Name"
									
									onkeyup="autoSuggestionForPateintNameForOt('txtPatientName', 'onchange');">
									<!--onkeypress="return validateOnlyName(event)"  -->
							</div>
							<div class="col-md-1-1" style="margin-left: 0%;">
								<label class="TextFont"
									style="margin-left: 30%; margin-top: 3%;" id="lblCenterPatientId">Patient ID:</label>
							</div>
							<div class="col-md-1-1" style="text-align: center;">
								<input class="typeahead form-control input-SmallText"
									name="txtPatientId" id="txtPatientId" value="0"
									placeholder="UHID" readonly="readonly"> <input
									type="hidden" id="txtPatientTreatmentId" value="0">
								<!-- <input
									type="hidden" id="referedTo"> -->
							</div>
							<div class="col-md-1-1" style="margin-left: 0%;">
								<button style="margin-left: 30%; margin-top: 0%;"
									class="btn btn-xs btn-primary" type='button' value='setID'
									onclick="showIndentDiv(); toCreateManualIndent();">OK</button>
							</div>
						</div>
						<div class="col-md-12-1"
							style="margin-top: 25px; margin-left: 0px;">
							<!-- Start BOX -->
							<div id="IndentDiv" style="display: none;">
								<div class="box border col-md-12-1">
									<div class="divide-10"></div>
									<div class="tabbable col-md-12-1">
										<ul class="nav nav-tabs">
											<li class="active"><a data-toggle="tab" href="#INDENT"><span
													class="hidden-inline-mobile">Indent</span></a></li>
										</ul>
										<div class="divide-10"></div>
										<!-- START INDENT GUI -->
										<div ID="INDENT" class="tab-pane fade in active">
											<form class="form-horizontal  col-md-12-1" method="get">

												<div class="form-group col-sm-1-1" style="margin-left: 6px;">
													<label for="exampleInputEmail1" class="TextFont">Doc
														No </label><input type="text" class="form-control input-SmallText"
														required="true" name="first" id="first"
														placeholder="Doc No">
												</div>
												<div class="form-group col-sm-1-1" style="margin-right: 4%;">
													<label for="exampleInputEmail1" class="TextFont">Doc
														Date </label><input id='popup_container2'
														onclick="displayCalendar(document.getElementById('popup_container2'),'dd-mm-yyyy',this)"
														readonly='readonly' name='dob' type='text'
														placeholder='Date' value=""
														class='form-control input-SmallText'> <input
														type="hidden" name="receivedFrom" value="OT"
														id="receivedFrom">
												</div>

												<div class="form-group col-sm-1-1" style="margin-right: 2%;">
													<label for="exampleInputEmail1" class="TextFont">Item
														Short Code</label> <input type="text"
														class="form-control input-SmallText" name="emailID"
														id="email" placeholder="Code"></input>
												</div>
												<div style="margin-top: 0px; margin-left: 2px;"
													class="col-md-12-1">
													<!-- BOX -->

													<div class="box border col-md-12-1">

														<div class="tabbable col-md-12-1">
															<ul class="nav nav-tabs">
																<li class="active"><a data-toggle="tab"
																	href="#ItemInfo"><i class="fa fa-user"></i> <span
																		class="hidden-inline-mobile">New Indent</span></a></li>

																<li class=""><a data-toggle="tab"
																	href="#prevIndent"><i class="fa fa-user"></i> <span
																		class="hidden-inline-mobile"
																		onclick="previousIndentByTreatmentId()">Prev
																			Indent</span></a></li>

															</ul>
															<div class="divide-10"></div>
															<div class="divide-10"></div>
															<div class="divide-20"></div>
															<form>
																<div class="tab-content col-md-12-1">
																	<div id="ItemInfo" class="tab-pane fade in active "
																		style="">

																		<div class="panel-body col-md-12-1">
																			<div style="padding-left: 12px;" class="col-sm-12-1">
																				<div style="height: 85%;margin-right: -43px;">
																					<div
																						style='width: 95%; font-weight: bold; height: 300Px; overflow-y: scroll; border: 1px solid #436a9d;'>
																						
																						<div class="col-md-12-1" style="margin-top: 15px;margin-left:0%;margin-bottom: 15px;">
																									<div class="col-md-3-1">Select Indent
																										Template</div>

																									<div class="col-md-9-1" id="selectIndentTemplateDiv"></div>
																								</div>
																						
																						<button onclick="toCreateManualIndent()"
																							class="btn btn-xs btn-success" type='button'>Add
																							New</button>

																						<button value="_" class="btn btn-xs btn-danger"
																							style="margin: 7px;" onclick="toRemoveRow()"
																							type="button">-</button>
																						<table id="ItemInfoTable" cellpadding="0"
																							cellspacing="0" border="1"
																							class="table table-bordered table-striped table-condensed">
																							<thead>
																								<tr>
																									<th class="col-md-2-2 center">select</th>
																									<th class="col-md-2-2 center">#</th>
																									<th class="col-md-2-2 center">Product Name</th>
																									<th class="col-md-2-2 center">Required
																										Quantity</th>
																									<th class="col-md-2-2 center">Total
																										Quantity</th>

																									<!-- 	<th class="col-md-2-2 center">Factor 1</th>
																											<th class="col-md-2-2 center">Factor 2</th>
																											<th class="col-md-2-2 center">Factor 3</th>
																											<th class="col-md-2-2 center">Factor 4</th> -->
																								</tr>
																							</thead>
																							<tbody id="ItemInfoList"
																								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">

																							</tbody>
																						</table>

																					</div>


																				</div>
																			</div>
																		</div>
																		
																		<div class="form-group col-sm-2-1"
																		style="margin-left: 2%;">
																		<label for="exampleInputEmail1" class="TextFont">Total
																			Doc Qty </label><input type="text"
																			class="form-control input-SmallText"
																			name="totalDocQty" id="totalDocQty"
																			placeholder="Total Doc Qty">
																	</div>

																	<div class="form-group col-sm-2-1"
																		style="margin-left: 2%;">
																		<label for="exampleInputEmail1" class="TextFont">Select
																			Store </label> <select id='pharmaStoreId'
																			class='form-control input-SmallText'><option
																				value="0">Main Store</option></select>
																	</div>

																	<div class=" col-sm-2-1"
																		style="margin-left: 2%; margin-top: 2%">
																		<input type="button" onclick="savePharmacyIndent()"
																			class="btn btn-xs btn-success"
																			value="Generate Indent">
																	</div>
																	</div>

																	

																	<div id="prevIndent" class="tab-pane fade"
																		style="overflow-x: auto;">
																		<table style="margin-top: 10px; width: 100%;"
																			class="table table-striped table-bordered header-fixed cf ">
																			<thead style="background: white;" class="cf">
																				<tr>
																					<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>
																					<th class="col-md-2 center" style="height: 21.5px;"><div>Indent
																							Date</div></th>

																					<th class="col-md-2 center" style="height: 21.5px;"><div>Status</div></th>

																					<th class="col-md-2 center" style="height: 21.5px;"><div>Generated
																							From</div></th>

																					<th class="col-md-2 center" style="height: 21.5px;"><div>Store
																							Name</div></th>

																					<th class="col-md-1 center" style="height: 21.5px;"><div>View</div></th>
																					<th class="col-md-1 center" style="height: 21.5px;"><div>Cancel</div></th>
																				</tr>
																			</thead>
																			<tbody id='preIndentData'>

																			</tbody>
																		</table>

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
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Suraj Code For Prev Indent Information-->
			<div id="prevIndentPopUp" class="modal fade in">
				<div class="modal-dialog" style="width: 1120px;">

					<div class="modal-content" class="col-md-12">
						<div class="modal-header">
							<div class="">
								<h4>
									<i class="fa fa-calendar"></i>Indent Information
								</h4>
							</div>

						</div>
						<div class="modal-body">

							<div style="margin-top: 00px;" class="box border primary">
								<div class="box-title">
									<h4>
										<i class="fa fa-table"></i>Generated Indent Information
									</h4>
									<div class="tools">
										<a class="config" data-toggle="modal" href="#box-config">
											<i class="fa fa-cog"></i>
										</a> <a class="reload" href="javascript:;"> <i
											class="fa fa-refresh"></i>
										</a> <a class="collapse" href="javascript:;"> <i
											class="fa fa-chevron-up"></i>
										</a> <a class="remove" href="javascript:;"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body">
									<div class="col-md-12-1" style="margin-top: 10px;">
										<div class='col-md-4-1'>
											<i class="fa fa-star"></i><b>Indent No -<span
												id='divIndentNo'></span>
										</div>
										<div class='col-md-4-1'>
											<i class="fa fa-calendar"></i>Indent Date -</b> <span
												id='divIndentDate'></span>
										</div>
										<div class='col-md-4-1'>
											<i class="fa fa-home"></i>Generated From -</b> <span
												id='divIndentGenerateFrom'></span>
										</div>
									</div>
									<table class="table table-striped" style="margin-top: 40px;"">
										<thead style="background: white;" class="cf">
											<tr>
												<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>
												<th class="col-md-2 center" style="height: 21.5px;"><div>Product
														Name</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Required
														Qty</div></th>

											</tr>
										</thead>
										<tbody id='preIndentDataById'>

										</tbody>
									</table>
								</div>
							</div>



							<div style="margin-top: 00px;" class="box border primary">
								<div class="box-title">
									<h4>
										<i class="fa fa-table"></i>Received Indent Information

									</h4>
									<div class="tools">
										<a class="config" data-toggle="modal" href="#box-config">
											<i class="fa fa-cog"></i>
										</a> <a class="reload" href="javascript:;"> <i
											class="fa fa-refresh"></i>
										</a> <a class="collapse" href="javascript:;"> <i
											class="fa fa-chevron-up"></i>
										</a> <a class="remove" href="javascript:;"> <i
											class="fa fa-times"></i>
										</a>
									</div>
								</div>
								<div class="box-body">
									<div class="col-md-12-1" style="margin-top: 10px;">
										<div class='col-md-4-1'>
											<i class="fa fa-star"></i><b>Indent Sale No -<span
												id='divIndentSaleNo'></span>
										</div>
										<div class='col-md-4-1'>
											<i class="fa fa-calendar"></i>Indent Received Date -</b> <span
												id='divIndentReceiveDate'></span>
										</div>

									</div>
									<table class="table table-striped" style="margin-top: 40px;">
										<thead style="background: white;" class="cf">
											<tr>
												<th class="col-md-1 center" style="height: 21.5px;"><div>Sr.</div></th>
												<th class="col-md-2 center" style="height: 21.5px;"><div>Product
														Name</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Batch
														Code</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Batch
														Expiry</div></th>

												<th class="col-md-2 center" style="height: 21.5px;"><div>Qty</div></th>

											</tr>
										</thead>
										<tbody id='preIndentSaleDataById'>

										</tbody>
									</table>
								</div>
							</div>



						</div>
						<!-- /BODY-->
						<div class="modal-footer">

							<div class="form-group col-md-7-1" style="margin-top: 15px;">
								<button type="button" class="btn btn-primary"
									id="btnSubContractingMaterialIssueSave"
									name="btnSubContractingMaterialIssueSave"
									onclick="setIndentDetails()">Ok</button>
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Cancel</button>
							</div>
						</div>
					</div>

				</div>
			</div>



			<input type="hidden" name="indentRowCount" id="indentRowCount"
				value="1"> <input id="treatmentId" type="hidden" value="0" />

			<div id="patobject" style="display: none;"></div>
			<%@include file="footer_nobel.jsp"%>
			<div id="pathologyAllPatInfo" style="display: none;"></div>
		</div>
	</section>
</body>
</html>