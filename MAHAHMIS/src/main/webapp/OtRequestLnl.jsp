<%@page import="org.springframework.web.servlet.ModelAndView"%>
<%@page import="org.springframework.web.bind.annotation.RequestMethod"%>
<%@page import="org.springframework.web.bind.annotation.RequestMapping"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Laundry</title>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />

<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
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

 <script src="js/ExtraJs/inventory_Material_Request_Note.js"></script> 
<!-- <script src="js/ExtraJs/inventory_Material_Receipt.js"> -->

<script type="text/javascript" src="js/CommonTemplate.js"></script>

<script type="text/javascript" src="js/Admin.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script src="js/ExtraJs/inventory_Material_Request_Note_List.js"></script>
<!-- <script type="text/javascript" src="js/LaundryLinonManagement.js"></script>
<script type="text/javascript" src="js/LaundryLinenTemplate.js"></script> -->

<script type="text/javascript" src="js/LaundryManagement.js"></script>
<script type="text/javascript" src="js/LaundryLinenTemplate.js"></script>

<!-- <script type="text/javascript" src="js/CsdManagement2.js"></script>
<script type="text/javascript" src="js/CSDTemplate2.js"></script> -->

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<script src="js/script.js"></script>
<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>

<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("111"); //Set current page
		App.init(); //Initialise plugins and elements
	});
	/********window should not disappear when clicking outside***husen*************/
	$(document).ready(function() {
		$('#MRNForm').click(function() {
			$.braviPopUp();
		});
		/********window should reset form clicking on close***husen********/
		$("#closeBtn").click(function() {
			/* Single line Reset function executes on click of Reset Button */
			$("#inventoryMRNForm")[0].reset();
			//added by Rohit on 28-12-2020
			window.location.reload("inv_subinventory.jsp");
			//window.location.reload("inventory_Materail_Request_Note.jsp");
			// alert("reset");
		});

	});
</script>

<script type="text/javascript">
	onload = function() {
		onloadindentLnl();
		getlist();
		
		getNextMaterialRequestNoteIdInLIstLaundry();
/* 		autoSuggestionForLocationLnl("txtMRNLocationName","onload");*/
		//autoSuggestionForLocationInListLnl("txtMRNLocationNameInList","onload"); 
		autoSuggestionForLaundryDep("txtMRNLocationNameInList","onload");
		
		
		//getlistforReturnItems("OT");
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
			//target:"txtMRNDateInList",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange:[1920,2099],
			limitToToday:false,
			/* cellColorScheme:"beige", */
			dateFormat : "%d/%m/%Y",
			imgPath:"../img/",
			weekStartDay:1,
		});

	}

	$('#MRNForm').on('hidden', function() {
		alert("Hi hidden");
		location.reload();
	})
</script>
</head>
<body style="background: white ! important;">
	<section id="page">
		<!-- HEADER -->
		<div id="outer" class="container-main" style="width: 100%;">

			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
				<%@include file="left_menu_otmanagement.jsp"%>
				
			</header>

			<!-- /**********************************get page session********************************************/ -->
			<%
				Object sessionOBJ = session.getAttribute("moduleName");
			 
				 Object CurrentuserName = session.getAttribute("userName");
				 session.setAttribute("CurrentuserName", CurrentuserName);
				 System.out.println("Your Current NAme is ************* "+CurrentuserName);
				/* HttpSession sessionPageValue=request.getSession();
				String value=""; */
				if (sessionOBJ == "opd") {
					/* value="opd";
					sessionPageValue.setAttribute("opdmodule", value);
					System.out.println("session value is======"+value); */
			%>
			<%@include file="menu_HelpDesk.jsp"%>
			<%
				}
			%>
			


			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
						"dd/MM/yyyy");
				String todays_date = formatter.format(currentDate.getTime());
			%>

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 6px 10px; margin-top: 1px;">
											<li>Date :<span id="todayDate"><%=todays_date%></span></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="inventory_Dashboard.jsp">Inventory</a></li>
											<li><a href="OtRequestLnl.jsp">LNL</a></li>
											<!-- <li>View Database</li> -->
										</ul>

									</div>
								</div>
							</div>

							<form name="mysearchForm">
								<div style="width: 100%; height: 99%;">
									<div id="rightContActual">
										<!-- Start Tab UI -->
										<div class="col-md-12-1"
											style="margin-top: 0px; margin-left: 0px;">
											<!-- search sub inventory -->
											<!-- <div style="margin-top: -15px;" id="divtxtwardName"	
												class="typeahead">
												<label for="exampleInputEmail1" class="TextFont">
													Enter Subinventory </label> <input class="typeahead" maxlength="40" style="text-align: left;" onkeypress="autoSuggestionForLocation(this.id, 'onchange');"
													name="txtwardName" id="txtwardName" type="text"
													placeholder="Enter sub inventory name"   autocomplete="off" />
												<input type="button" value="search"	class="typeahead btn btn-xs btn-primary" onclick="fetchStockDetailsByWardName($('#txtwardName').val())" />
												<div style="display:inline-block;margin-left: 20px;"><span>Inventory</span>&nbsp;&nbsp;Main<input type="radio" name="listItem" onclick="fetchStockDetailsByWardName($('#txtwardName').val())" checked="checked" id="mainInvList">&nbsp;&nbsp;
												L&L<input type="radio"  name="listItem" onclick="fetchStockDetailsByWardName($('#txtwardName').val())" id="laundryList">&nbsp;&nbsp;
												CSSD<input type="radio"  name="listItem" onclick="fetchStockDetailsByWardName($('#txtwardName').val())" id="CssdList">&nbsp;&nbsp;
												<input type = "hidden" value ='0' id='subInventoryId'/></div>
											</div> -->
											<!-- End search sub inventory -->

											<!-- Start BOX  //SUFIYAN-->
											<div class="box border col-md-12-1"
												style="margin-top: 5px; "
												id="showhideMrnMaintabs" >
												<div class="divide-10"></div>
												<div class="tabbable col-md-12-1">
													<ul class="nav nav-tabs">
														<!-- <li><a data-toggle="tab" href="#OPD_OLD"><span
																class="hidden-inline-mobile">OPD_OLD</span></a></li> -->
														<li class="active"><a data-toggle="tab"
															href="#Indent" id="indent" onclick="onindentLnl(),getlist();"><span
																class="hidden-inline-mobile">Request</span></a></li>
														
											<!-- 			<li><a data-toggle="tab" href="#MRN" id="mrn"
															onclick="onmrn();"><span class="hidden-inline-mobile">MRN</span></a></li> -->
															
															<li><a data-toggle="tab" href="#Approved" id="approved"
															onclick="onapprovedLnl();"><span class="hidden-inline-mobile">Approved</span></a></li>
														
											<!-- 			<li><a data-toggle="tab" href="#Recieved"
															id="recieved" onclick="onrecieved();"><span
																class="hidden-inline-mobile">Received</span></a></li> -->
																
														<!-- <li><a data-toggle="tab" href="#ConsumptionBY"
															id="consumptionBY" onclick="onConsumptionBY();"><span
																class="hidden-inline-mobile">Consumption</span></a></li> -->
																
														<!-- <li><a data-toggle="tab" href="#Stock" id="stock" onclick="onstock();"><span class="hidden-inline-mobile">Stock</span></a></li> -->
														<!-- <li><a data-toggle="tab" href="#AvailableStock"
															id="availablestock" onclick="onAvailableonstock();"><span
																class="hidden-inline-mobile">Stock</span></a></li> -->
																
														<!--ADD mrn return tab @author:paras suryawanshi @Date:21nov   -->		
																
													<!-- 		<li><a data-toggle="tab" href="#MrnReturn"
															id="mrnReturn" onclick="onmrnReturn();"><span
																class="hidden-inline-mobile">MrnReturn</span></a></li> -->
																
																	
														<!-- added by Tarique Aaalam -->		
														<li><a data-toggle="tab"
															href="#LnlReturn" id="lnlRet" onclick="LnlReturn(),getlistforReturnItems('OT');"><span
																class="hidden-inline-mobile">LnL Recieve</span></a></li>	

													</ul>
													<div class="divide-10"></div>
													<div class="tab-content">
														<div class="divide-20"></div>


														<!-- ***********************************************new code**Indent************************************************ -->
														<div id="Indent" class="tab-pane fade in active">
															<div class="col-md-12-1" style="text-align: left;">
															</div>



															<div style="margin-top: 5px;" class="col-md-12-1">
																<button class="btn btn-xs btn-success" type='button'
																	data-toggle="modal" data-target="#NewMRNForm"
																	onclick="setclearPOPONAddLaundry();">Add New
																	Cleaning Request</button>
																<div class="pull-right">
																	<div class="dataTables_filter" id="datatable1_filters">
																		<label id="searchlabel"><input
																			aria-controls="datatable1"
																			placeholder="Search By MRN Id"
																			onkeyup="autosugetionLaundryList(this.id)"
																			id="byName" class="form-control input-sm" type="text"></label>
																	</div>
																</div>

															</div>
															<!-- add avilable @author:paras @Date:21nov-->
																<div class="col-md-12-1" style="margin-top: 10px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;">
																<!-- <div class="col-md-12-1"> -->
																<div id="MRNcontentAvailableStock">

																	<table class="table table-hover cf "
																		style="Width: 100%; margin-top: 5px;">
																		<thead class="cf" style="background: white;">
																			<tr>
																				<th style="height: 21.5px;" class="col-md-1"><div>#</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>MRN
																						Id</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>MRN
																						Date</div></th>
																				<!-- <th style="height: 21.5px;" class="col-md-2"><div>MRN Remark</div></th> -->

																				<th style="height: 21.5px;" class="col-md-1"><div>Sub Department
																						Name</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>
																						Raised By</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>Edit</div></th>

																				<th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th>
																				
																				<th style="height: 21.5px;" class="col-md-1"><div>Status</div></th>
																				<!-- <th style="height: 21.5px;" class="col-md-1"><div>Purchase Request</div></th> -->

																			</tr>
																		</thead>

																		<tbody id="divlandlList">

																		</tbody>
																	</table>
																</div>
																<div id="MRNAjaxRespAvailableStock"
																	style="display: none; position: fixed;"></div>
																<!-- </div> -->
															</div>
														<!--END add avilable @author:paras @Date:21nov-->
														</div>
														

														
														<!-- ***********************************************new code******MRN******************************************** -->
														<div id="MRN" class="tab-pane fade in">
															<div class="col-md-12-1">

																<div id="SearchContent" class="col-md-12-1"
																	style="margin-left: 220px;">
																	<div class='col-md-1-1'>Search By:</div>
																	<div class='col-md-1-1'>Mrn Id</div>
																	<div class='col-md-2-1'>
																		<input name="byName" id="byMrnId" type="text"
																			maxlength="5" />
																	</div>
																	<div class='col-md-2-1'>
																		<input type="button" value="search"
																			class="btn btn-xs btn-primary"
																			onclick="fetchMRNDetailByIdNoteList($('#byMrnId').val())" />
																	</div>
																</div>
															</div>

															<div class='col-md-12-1'
																style='margin-top: 10px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;'>
																<div id="MRNcontent"></div>
																<div id="MRNAjaxResp"
																	style="display: none; position: fixed;"></div>
																<!-- <div id="MRNItemAjaxResp" style="visibility: hidden;"></div> -->
															</div>

														</div>
													 
													<!-- ***********************************************new code***Approved Mrn*********************************************** -->
														<div id="Approved" class="tab-pane fade in ">
															<!-- Page Search Header -->
															<div class="col-md-12-1">

															</div>
															<!-- end Page Search Header -->

															<div class='col-md-12-1'
																style='margin-top: 10px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;'>
																<div id="MRNcontentApproved">
																
																	<table class="table table-hover cf "
																		style="Width: 100%; margin-top: 5px;">
																		<thead class="cf" style="background: white;">
																			<tr>
																				<th style="height: 21.5px;" class="col-md-1"><div>#</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>MRN
																						Id</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>MRN
																						Date</div></th>
																		
																				<th style="height: 21.5px;" class="col-md-1"><div>Approved
																						Date</div></th>

																				<th style="height: 21.5px;" class="col-md-1"><div>Sub Department
																						Name</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>
																						Raised By</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>View
																						</div></th>

																				<!-- <th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th> -->
																				<!-- <th style="height: 21.5px;" class="col-md-1"><div>Purchase Request</div></th> -->

																			</tr>
																		</thead>

																		<tbody id="divlandlListApproved">

																		</tbody>
																	</table>
																
																</div>
																<div id="MRNAjaxRespApproved"
																	style="display: none; position: fixed;"></div>
																<!-- <div id="MRNItemAjaxRespRecieved" style="visibility: hidden;"></div> -->
															</div>
														</div>
														
														
														
													
														<!-- ***********************************************new code***Recieved*********************************************** -->
														<div id="Recieved" class="tab-pane fade in ">
															<!-- Page Search Header -->
															<div class="col-md-12-1">
																<div id="SearchContentRecieved" class="col-md-12-1"
																	style="margin-left: 220px;">
																	<div class='col-md-1-1'>Search By:</div>
																	<div class='col-md-1-1'>Mrn Id</div>
																	<div class='col-md-2-1'>

																		<input name="byName" id="byMrnIdRecieved" type="text"
																			maxlength="5"
																			onkeypress="return validateNumbers(event)" />

																	</div>
																	<div class='col-md-2-1'>

																		<input type="button" value="search"
																			class="btn btn-xs btn-primary" class="edit"
																			onclick="fetchMRNDetailByIdReceipt($('#byMrnIdRecieved').val())" />

																	</div>
																</div>
															</div>
															<!-- end Page Search Header -->

															<div class='col-md-12-1'
																style='margin-top: 10px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;'>
																<div id="MRNcontentRecieved"></div>
																<div id="MRNAjaxRespRecieved"
																	style="display: none; position: fixed;"></div>
																<!-- <div id="MRNItemAjaxRespRecieved" style="visibility: hidden;"></div> -->
															</div>
														</div>


														<!-- ***********************************************new code**Consumed By************************************************ -->
														<div id="ConsumptionBY" class="tab-pane fade in ">
															<!-- <div class="col-md-12-1"> -->

															<div class="col-md-12-1" style="margin-left: 220px;">

																<div class='col-md-3-1'>Consumption Type:</div>
																<div class='col-md-1-1'>
																	<select id="sclConsumptionBY"
																		class="form-control input-SmallText col-md-12-1 margin-1"
																		onchange="setConsumptionBYDiv()">
																		<option value="select">-select-</option>
																		<option value="Individual">Individual</option>
																		<option value="Patient">Patient</option>
																	</select>
																</div>
															</div>
															<br>
															<!--  selection  for consumption  particular  Records related to ipd opd Entire database and Indidual  -->
															<div class="form-group col-sm-12"
																style='margin-top: 0px; height: 300px; max-height: auto; border: 1px solid #dddddd;'>
																<div id="searchbyAllOption" class="form-group"
																	style="margin-top: 12px;">
																	<div class="form-group col-sm-1-1"
																		style="margin-right: 2px;">Date :</div>
																	<div class=" form-group col-sm-2-1">
																		<input type="text"
																			class="form-control input-SmallText"
																			placeholder="Date" id="popup_container3"
																			name="popup_container3" value="<%=todays_date%>"
																			onchange="featchConsumtionMasterDetails();"
																			readonly="readonly"
																			onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
																			id="popup_container3">
																		<!-- <input class="form-group"  type="text" name="txtDispencedSearchDate" id="txtDispencedSearchDate" placeholder="Date"  onfocus="featchConsumtionMasterDetails();" readonly="readonly"/> -->
																	</div>
																	<div class="form-group col-md-8-1"
																		id="AlloptionBtnforShow" style="margin-right: 9px;">
																		<div class="col-md-2-1">
																			<label class="checkbox input-SmallText"> <input
																				id="OPDchkC"
																				onchange="featchConsumtionMasterDetails();"
																				type="radio" value="opd" name="typeOfpatientSearch"
																				style="margin-top: 0px !important;"> OPD
																			</label>
																		</div>
																		<div class="col-md-2-1">
																			<label class="checkbox input-SmallText"> <input
																				id="IPDchkC" type="radio"
																				onchange="featchConsumtionMasterDetails();"
																				value="ipd" name="typeOfpatientSearch"
																				style="margin-top: 0px !important;"> IPD
																			</label>
																		</div>
																		<div class="col-md-3-1">
																			<label class="checkbox input-SmallText "> <input
																				id="chkEntireDatabaseC"
																				onchange="featchConsumtionMasterDetails();"
																				type="radio" value="diagnosis"
																				name="typeOfpatientSearch"
																				style="margin-top: 0px !important;"> Entire
																				Database
																			</label>
																		</div>

																		<div class="col-md-2-1">
																			<label class="checkbox input-SmallText "> <input
																				id="chkEIndividual" type="radio" value="Individual"
																				onchange="featchConsumtionMasterDetails();"
																				name="typeOfpatientSearch"
																				style="margin-top: 0px !important;">
																				Individual
																			</label>
																		</div>

																	</div>
																</div>
																<div class="form-group col-sm-12"
																	style='margin-top: 0px; overflow-y: scroll; height: 250px; max-height: auto;'>
																	<div id="MRNcontentConsumption"></div>
																	<div id="MRNAjaxRespConsumption"
																		style="display: none; position: fixed;"></div>
																</div>
																<!-- <div id="MRNItemAjaxRespRecieved" style="visibility: hidden;"></div> -->
															</div>

															<!--   End selection  for consumption  particular  Records related to ipd opd Entire database and Indidual  -->
														</div>


														<!-- ***********************************************new code******Stock******************************************** -->
														<!-- <div id="Stock" class="tab-pane fade in ">
															Page Search Header
															 <h1 style="text-align: center;color: scrollbar;"></h1>
															<h1 style="color: blue;text-align: center;"></h1>
														<div class="col-md-12-1">
														
															<div id="SearchContentStock" class="col-md-12-1" style="margin-left:150px;">
																<div class='col-md-4-1'>Search By Item Name :</div>
																	
														<div class="col-md-1-1"  id ="divtxtItemnameStock" style="text-align: left;">
													      <input class=" typeahead form-control input-SmallText"  
														   name="txtItemnameStock" id="txtItemnameStock" onkeyup="autoSuggestForStock(this.id,onchange);" 
														 maxlength="40"  placeholder="Item name">
														<input type="button" style="margin-left: 110px;margin-top: -35px;" value="search" class="btn btn-xs btn-primary" class="edit"
															onclick="fetchMrnItemNameSearchForStockAvaialable($('#txtItemnameStock').val())" />
												     </div>
																	<div class='col-md-2-1'>
								
																		<input name="byName" id="byMrnIdStock" type="text" 
																			onkeypress="return validateNumbers(event)" />
								
																	</div>
																	<div class='col-md-2-1'>
								 
																		<input type="button" value="search" class="btn btn-xs btn-primary" class="edit"
																			onclick="fetchMrnItemNameSearchForStockAvaialable($('#byMrnIdStock').val())" />
								
																	</div>
																</div>
															</div>

															<div class="col-md-12-1"
																style='margin-top: 2px; overflow-y:scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;'>
																<div id="MRNcontentStock"></div>
																<div id="MRNcontentStock" style="visibility: hidden;"></div>
																<div id="MRNAjaxRespStock" style="visibility: hidden;position: fixed;;"></div>
															</div>
													</div> -->
														<!-- ***********************************************end 4 tabs************************************************** -->

		

														<!-- ***********************************************new code******Stock******************************************** -->
														<div id="AvailableStock" class="tab-pane fade in ">
															<!-- Page Search Header -->
															<!-- <h1 style="text-align: center;color: scrollbar;"></h1>
															<h1 style="color: blue;text-align: center;"></h1> -->
															<!-- <div class="col-md-12-1"> -->
															<!-- <div id="SearchContentStock" class="col-md-12-1" style="margin-left:150px;">
																<div class='col-md-4-1'>Search By Item Name :</div>
																	
														<div class="col-md-1-1"  id ="divtxtItemnameStock" style="text-align: left;">
													      <input class=" typeahead form-control input-SmallText"  
														   name="txtItemnameStock" id="txtItemnameStock" onkeyup="autoSuggestForStock(this.id,onchange);" 
														 maxlength="40"  placeholder="Item name">
														<input type="button" style="margin-left: 110px;margin-top: -35px;" value="search" class="btn btn-xs btn-primary" class="edit"
															onclick="fetchMrnItemNameSearchForStockAvaialable($('#txtItemnameStock').val())" />
												     </div>
																	<div class='col-md-2-1'>
								
																		<input name="byName" id="byMrnIdStock" type="text" 
																			onkeypress="return validateNumbers(event)" />
								
																	</div>
																	<div class='col-md-2-1'>
								 
																		<input type="button" value="search" class="btn btn-xs btn-primary" class="edit"
																			onclick="fetchMrnItemNameSearchForStockAvaialable($('#byMrnIdStock').val())" />
								
																	</div>
																</div> -->

															<div class="col-md-12-1"
																style="margin-top: 10px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;">
																<!-- <div class="col-md-12-1"> -->
															<!-- 	<div id="MRNcontentAvailableStock"></div>
																<div id="MRNAjaxRespAvailableStock"
																	style="display: none; position: fixed;"></div> -->
																<!-- </div> -->
															</div>
														</div>
														<!--*********************add MRNReturn tab ***by paras suryawanshi****************************  -->

														<div id="MrnReturn" class="tab-pane fade in ">
															<div class="col-md-12-1" style="text-align: left;"> </div>
															<div class="col-md-12-1" style="margin-top: 5px; border: 0px solid #dddddd;">
															<div class="col-md-1-1" style="font-weight: bold;">
																	<button class="btn btn-xs btn-primary" type='button'
																		data-toggle="modal" onclick="mrnReturnRefresh();"
																		data-target="#MrnReturnForm">MrnReturn</button>

																</div>
															</div>
															
															
														</div>
														
														
														
																								<!-- ***********************************************new code**Indent************************************************ -->
														<div id="LnlReturn" class="tab-pane fade in">
															<div class="col-md-12-1" style="text-align: left;">
															</div>

					
															<!-- add avilable @author:paras @Date:21nov-->
															<div class="col-md-12-1"
																style="margin-top: 10px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;">
																<!-- <div class="col-md-12-1"> -->
																
														<div style="margin-top: 5px;" class="col-md-12-1">
													
															<div class="pull-right">
																	<div class="dataTables_filter" id="datatable1_filters">
																		<label id="searchlabelReturn"><input
																			aria-controls="datatable1"
																			placeholder="Search By MRN Id"
																			onkeyup="autosugetionLaundryListForReturnitems(this.id)"
																			id="byNameReturn" class="form-control input-sm" type="text"></label>
																	</div>
															</div>

															</div>
																<div id="ContentReturn" >

																	<table class="table table-hover cf "
																		style="Width: 100%; margin-top: 5px;">
																		<thead class="cf" style="background: white;">
																			<tr>
																				<th style="height: 21.5px;" class="col-md-1"><div>#</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>MRN
																						Id</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>MRN
																						Date</div></th>
																						
																				<th style="height: 21.5px;" class="col-md-1"><div>Return
																						Date</div></th>	
																						
																				<th style="height: 21.5px;" class="col-md-1"><div>Recieved
																						Date</div></th>	
																																																	
																				<!-- <th style="height: 21.5px;" class="col-md-2"><div>MRN Remark</div></th> -->

																				<th style="height: 21.5px;" class="col-md-1"><div>Sub Department
																						Name</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>
																						Raised By</div></th>
																				<th style="height: 21.5px;" class="col-md-1"><div>View
																						And Accept</div></th>

																				<!-- <th style="height: 21.5px;" class="col-md-1"><div>Delete</div></th> -->
																				<!-- <th style="height: 21.5px;" class="col-md-1"><div>Purchase Request</div></th> -->

																			</tr>
																		</thead>

																		<tbody id="divlandlListReturn">

																		</tbody>
																	</table>
																</div>
																<div id="ContentReturnStock"
																	style="display: none; position: fixed;"></div>
																<!-- </div> -->
															</div>
															<!--END add avilable @author:paras @Date:21nov-->
														</div>

														<!--*********************add MRNReturn tab ***by paras suryawanshi****************************  -->
														
														<!-- ***********************************************end 4 tabs************************************************** -->

														<!-- ***********************************************new code******Stock******************************************** -->
														<!-- old <div id="Stock" class="tab-pane fade in ">
															Page Search Header
															 <h1 style="text-align: center;color: scrollbar;"></h1>
															<h1 style="color: blue;text-align: center;"></h1>
															<div class="col-md-12-1">
																<div id="SearchContentRecieved" class="col-md-12-1" style="margin-left:280px;">
																	<div class='col-md-1-1'>Search By:</div>
																	<div class='col-md-1-1'>Mrn Id</div>
																	<div class='col-md-2-1'>
								
																		<input name="byName" id="byMrnIdRecieved" type="text" 
																			onkeypress="return validateNumbers(event)" />
								
																	</div>
																	<div class='col-md-2-1'>
								 
																		<input type="button" value="search" class="btn btn-xs btn-primary" class="edit"
																			onclick="fetchMRNDetailByIdReceipt($('#byMrnIdRecieved').val())" />
								
																	</div>
																</div>
															</div>
															end Page Search Header

															<div class='col-md-12-1'
																style='margin-top: 22px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #dddddd;'>
																<div id="MRNcontentRecieved"></div>
																<div id="MRNAjaxRespRecieved" style="visibility: hidden;"></div>
																<div id="MRNItemAjaxRespRecieved" style="visibility: hidden;"></div>
															</div>
													</div> -->
														<!-- ***********************************************end 4 tabs************************************************** -->


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
			</div>
		</div>

		<!-- /************************************************for edit***************************************************/ -->


				<!--************************* new mrn request************************************************* -->
				
				<div id="NewMRNForm" class="modal fade in" tabindex="-1">
							<div class="modal-dialog" style="width:93%;">
								<div class="modal-content" class="col-md-12">
									<div class="modal-header">
										<div class="box-title">
											<h4>
												<i class="fa fa-calendar"></i>Cleaning Request  
												<a href="" data-dismiss="modal" style="margin-left: 950px;color: gray;" title="Close" id="closeonclick" onclick="javascript:window.location.reload()">X</a>
											</h4>
										</div>
									</div>
									<div class="modal-body">
										<div class="col-md-12">
											<form class="form-horizontal  col-md-12-1" method="get" id="inventoryMRNForm">

												<div class="form-group col-sm-1-1" style="margin-right: 1%;">
													<label for="exampleInputEmail1" class="TextFont">Mrn
														Id </label><input type="text" class="form-control input-SmallText"
														required name="txtDocNo" id="txtmaterialReqaestNoteDocIdInList"
														placeholder="Doc No" readonly/>
														<input type="hidden" id="mrnid" value="0">
												</div>
												
												<div class="form-group col-sm-1-1" style="margin-right: 2%;">
													<label for="exampleInputEmail1" class="TextFont">Mrn Date<b style="color: red;">*</b>
														</label><input class="form-control input-SmallText"
														required name="txtMRNDateInList" id="txtMRNDateInList"
														placeholder="Mrn Date" readonly/>
												</div>
												
												<div class="form-group col-sm-2" style="margin-left: -2%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="TextFont"> Sub Department Name<b style="color: red;">*</b>
														</label><input class=" typeahead form-control input-SmallText"
														required name="txtMRNLocationNameInList" id="txtMRNLocationNameInList" onkeyup="autoSuggestionForLaundryDep(this.id, 'onchange');" 
														onkeypress="return validateAlphaNumberic(event);" placeholder=" SubInventory name" readonly/>
														<input type = "hidden" value ='0' id='subInventoryId' />
												</div>
												
								

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
																									<th class="col-md-2-2 center">Available Quantity</th>
																									<th class="col-md-2-2 center">Cleaning Quantity</th>

																									
																									<!-- <th class="col-md-2-2 center">UoM</th> -->
																								</tr>
																							</thead>
																							<tbody id="ItemInfoList"
																								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
								
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
									<!-- 	<div class="form-group col-sm-1-1" style="margin-left: 2%;text-align: left;">
											<label style="margin-left: 1%;" for="exampleInputEmail1" class="TextFont">Total
												Item Qty </label><input type="text" readonly="readonly"
												class="form-control input-SmallText" required="true"
												name="firstName" id="txtMRNTotalInList" placeholder="Total Item Qty"/>
										</div>
										<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
											<label for="exampleInputEmail1" style="margin-left: 6%;" class="TextFont">Remark
											</label><input type="text" class="form-control input-SmallText"
												style="float: right;" name="firstName" id="txtMRNRemarkInList"
												  placeholder="Remark"/>
										</div> -->
										
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
												
											
										</div>
									</div>
								</div>
							</div>
							<input type="hidden" id="CurrentuserName"  value="<%=session.getAttribute("userName")%>"/>
						</div>
						
						
						
						<!-- ********************************************************** start div edit and issue mrn on edit **********************************************************-->			
					
					<div id="MaterialRequestNoteList" class="modal fade in" tabindex="-1">
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
													 <input type="hidden" id="deptIdUpdate" value=''>
												</div>
												
											
											<div class="form-group col-sm-2-1" style="margin-right: 2%;" id ="divtxtRaisedBy">
													<label for="exampleInputEmail1" class="  TextFont"> Raised By<b style="color: red;">*</b>
														</label><input class=" typeahead form-control input-SmallText"
														required name="raisedByUpdate" id="raisedByUpdate" onkeyup="autoSuggestionForLocation('txtMRNLocationName','onchange');" 
													 readonly="readonly"	onkeypress="return validateAlphaNumberic(event);" placeholder="Inventory name"/>
												</div>
												
												<!-- 		<div class="form-group col-sm-2-1" style="margin-right: 2%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont"> Sub Department Name<b style="color: red;">*</b>
														</label><input class=" typeahead form-control input-SmallText"
														required name="txtMRNLocationName" id="txtMRNLocationName" onkeyup="autoSuggestionForLocation('txtMRNLocationName','onchange');" 
													 readonly="readonly"	onkeypress="return validateAlphaNumberic(event);" placeholder="Inventory name"/>
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

																								<th class="col-md-2-2 center">Available Quantity</th>
																								<th class="col-md-2-2 center">Cleaning Quantity</th>
																								<!-- <th class="col-md-2-2 center">Pending Quantity</th> -->
																																									
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
									</div> -->
									
									<!-- <div class="form-group col-sm-2-1" style="margin-left: 2%; text-align: left;">
										<label style="margin-left: 6%;" for="exampleInputEmail1" class="TextFont">Carrier Name 
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtReceiverName" id="txtReceiverName"
											placeholder="Carrier Name ">
									</div> -->
									
									
								<!-- div for save and approved on issue mrn i store -->	
							<div class="form-group col-md-9-1" id="approvedHideBtns" style="margin-left: 280px;">
						 <button type="button" id="updateRecods" name="ApprovedByIncharge" value="level-III"   onclick="UpdateCleaningRequest()" class="btn btn-primary">Update</button> 
						<button type="button" class="btn btn-default"  data-dismiss="modal" onclick="setSessionvalue();">Cancel</button>
						<input type="hidden" value="0" id="levelValue" />
						</div>
								
									<!-- End save on issue mrn i store -->
								</div>
							</div>
						</div>
					</div>
					
					<!-- End****************************  div on mrnlist on edit view *********************************************************************--> 
					
							<!-- ********************************************************** start div edit and issue mrn on edit **********************************************************-->			
					
					<div id="MaterialRequestNoteListReturn" class="modal fade in" tabindex="-1">
						<div class="modal-dialog" style="width:93%;">
							<div class="modal-content" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i>Cleaning Return  List
											<!-- <a href="" data-dismiss="modal" style="margin-left: 950px;color: gray;" title="Close" onchange="javascript:window.location.reload()">X</a> -->
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12">
										<form class="form-horizontal  col-md-12-1" method="get">

											<div class="form-group col-sm-1-1" style="margin-right: 5%;">
												<label for="exampleInputEmail1" class="TextFont">Mrn
													Id </label><!-- <input type="text" class="form-control input-SmallText"
													required="true" name="txtDocNo"
													id="txtmaterialReqaestNoteListDocId" placeholder="Doc No" readonly/> -->
													<input type="text"  id="txtmaterialReqaestNoteListDocIdReturn" value="" readonly/>
											</div>
											<div class="form-group col-sm-2-1" style="margin-right: 5%;width:100px;">
												<label class="TextFont">Mrn
													Date <b style="color: red;">*</b></label><!-- <input type="text" id="txtmaterialReqaestNoteDocDateReturn"
													    readonly/> -->
													    <input type="text"  id="txtmaterialReqaestNoteDocDateReturn" value="" readonly/>
													    <input type="hidden"  id="recievedDate" value="" readonly/>
													    <input type="hidden"  id="reutrnDate" value="" readonly/>
											</div>
											
											<div class="form-group col-sm-2-1" style="margin-right: -3%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont"> Sub Department Name<b style="color: red;">*</b>
														</label>
														<input type="text"  id="txtMRNLocationNameReturn" value="" readonly/>
													 <input id="deptId" value='0' type="hidden" >
											</div>
												
												
										<!-- 		<div class="form-group col-sm-2-1" style="margin-right: 2%;"
													id="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont">
														Raised By<b style="color: red;">*</b>
													</label><input class=" typeahead form-control input-SmallText"
														required name="raisedBy" id="raisedBy"
														readonly="readonly"
														placeholder="Raised By" />
														
														
												</div> -->
												
												<div class="form-group col-sm-2-1" style="margin-right: 2%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont"> Raised By<b style="color: red;">*</b>
														</label>
														<input type="text"  id="raisedBy" value="" readonly/>
													
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
																					
																
																					<table id="ItemInfoTable2" cellpadding="0"
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
																								
																								
																						<!-- 		<th class="col-md-2-2 center">Pending Quantity</th>
																								<th class="col-md-2-2 center">Discard Quantity</th>
																								<th class="col-md-2-2 center">Narration</th> -->
																								
																								<th class="col-md-2-2 center">Lnl Pending Quantity</th>
																								<th class="col-md-2-2 center">Remaining Quantity</th>
																								
																								
																								
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
						<button type="button" id="ApprovedByIncharge3" name="ApprovedByIncharge" value="level-III"  onclick="AcceptItemsFromLaundry()" class="btn btn-primary">Accept </button>
						<button type="button" class="btn btn-default"  data-dismiss="modal" onclick="setreloadvalue();">Cancel</button>
						<input type="hidden" value="0" id="levelValue" />
						</div>
								
									<!-- End save on issue mrn i store -->
								</div>
							</div>
						</div>
					</div>

							

		<!-- /************************************************for edit***************************************************/ -->
					
				
				
				
		<!-- ********************************************************** start div edit and issue mrn on edit **********************************************************-->			
					
					<div id="MaterialRequestNoteListApproved" class="modal fade in" tabindex="-1">
						<div class="modal-dialog" style="width:93%;">
							<div class="modal-content" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4>
											<i class="fa fa-calendar"></i>Cleaning Return  List
											<!-- <a href="" data-dismiss="modal" style="margin-left: 950px;color: gray;" title="Close" onchange="javascript:window.location.reload()">X</a> -->
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12">
										<form class="form-horizontal  col-md-12-1" method="get">

											<div class="form-group col-sm-1-1" style="margin-right: 5%;">
												<label for="exampleInputEmail1" class="TextFont">Mrn
													Id </label><!-- <input type="text" class="form-control input-SmallText"
													required="true" name="txtDocNo"
													id="txtmaterialReqaestNoteListDocId" placeholder="Doc No" readonly/> -->
													<input type="text"  id="txtmaterialReqaestNoteListDocIdApproved" value="" readonly/>
											</div>
											<div class="form-group col-sm-2-1" style="margin-right: 5%;width:100px;">
												<label class="TextFont">Mrn
													Date <b style="color: red;">*</b></label><!-- <input type="text" id="txtmaterialReqaestNoteDocDateReturn"
													    readonly/> -->
													    <input type="text"  id="txtmaterialReqaestNoteDocDateApproved" value="" readonly/>
											</div>
											
											<div class="form-group col-sm-2-1" style="margin-right: -3%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont"> Sub Department Name<b style="color: red;">*</b>
														</label>
														<input type="text"  id="txtMRNLocationNameApproved" value="" readonly/>
													 <input id="deptIdApproved" value='0' type="hidden" >
											</div>
												
												
										<!-- 		<div class="form-group col-sm-2-1" style="margin-right: 2%;"
													id="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont">
														Raised By<b style="color: red;">*</b>
													</label><input class=" typeahead form-control input-SmallText"
														required name="raisedByApproved" id="raisedByApproved"
														readonly="readonly"
														placeholder="Raised By" />
														
														
												</div> -->
												
											<div class="form-group col-sm-2-1" style="margin-right: 2%;" id ="divtxtMRNLocationName">
													<label for="exampleInputEmail1" class="  TextFont"> Raised By<b style="color: red;">*</b>
														</label>
														<input type="text"  id="raisedByApproved" value="" readonly/>
													
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
						<!-- <button type="button" id="ApprovedByIncharge3" name="ApprovedByIncharge" value="level-III"  onclick="AcceptItemsFromLaundry()" class="btn btn-primary">Accept </button> -->
						<button type="button" class="btn btn-default"  data-dismiss="modal" onclick="setreloadvalue();">Cancel</button>
						<input type="hidden" value="0" id="levelValue" />
						</div>
								
									<!-- End save on issue mrn i store -->
								</div>
							</div>
						</div>
					</div>	
						



		<!-- ************************************ Consumed By Individual or Patient div *******************************************-->

		<div id="ConsumptionIndividualForm" class="modal fade in"
			tabindex="-1">
			<div class="modal-dialog" style="width: 93%;">
				<div class="modal-content" class="col-md-12">
					<div class="modal-header">
						<div class="box-title">
							<h4>
								<i class="fa fa-calendar"></i>Consumption <a href="#"
									style="margin-left: 950px; color: gray;" id="ConsumptionClose"
									title="Close" onclick="hideConsumptionDiv();">X</a>
							</h4>

						</div>
					</div>

					<div class="modal-body">
						<div class="row">
							<form class="form-horizontal col-md-6" role="form">
								<div class="form-group">
									<label for="firstname" class="col-sm-3">Consumed Id</label>
									<div class="col-sm-5">
										<input type="text" class="form-control input-SmallText"
											name="txtConsumedId" id="txtConsumedId"
											placeholder="Consumed Id" readonly />
									</div>
								</div>

								<div class="form-group">
									<label for="firstname" class="col-sm-3">Consumed By</label>
									<div class="col-sm-5">
										<input type="text" class="form-control input-SmallText"
											name="txtConsumedBy" id="txtConsumedBy"
											placeholder="Consumed By" readonly />
									</div>
								</div>


								<div class="form-group">
									<label for="firstname" class="col-sm-3">Dispensed Date<b
										style="color: red;">*</b></label>
									<div class="col-sm-5">
										<input type="text" class="form-group"
											onkeypress="return checkDate(event)"
											name="txtMRNDispencedDate" id="txtMRNDispencedDate"
											placeholder="Dispensed Date" value="<%=todays_date%>"	readonly />
									</div>
								</div>


								<div class="form-group" id="divtxtMRNDispensedto" style="margin-top:-13px;">
									<label for="firstname" class="col-sm-3">Dispensed To<b
										style="color: red;">*</b></label>
									<div class="col-sm-5">
										<input type="text"
											class="typeahead form-control input-SmallText"
											onkeypress="return validateOnlyName(event)"
											onkeyup="autoSuggestionForDispensedto('this.id', 'onchange');"
											placeholder="Dispensed To" name="txtMRNDispensedto"
											id="txtMRNDispensedto" /> <input type="hidden"
											class="form-control input-SmallText"
											placeholder="Dispensed To id" name="txtMRNDispensedtoId"
											id="txtMRNDispensedtoId" value="0" />
									</div>
								</div>

							</form>



							<form class="form-horizontal col-md-6" role="form">
								<div class="form-group" id="divtxtMRNDispensedtoOthers">
									<label for="firstname" class="col-sm-3">Other
										<div class="col-sm-5">
											<input id="chkOther" type="checkbox"
												onclick="addDispensedtoOthersName()" class="col-sm-1-1"
												value="" style="margin-top: 11px; margin-left: 11px;">
									</label>
									<!-- <label for="firstname"class="col-sm-3"> Dispensed Name</label><input class="typeahead form-control input-SmallText"  name="txtMRNDispensedtoOthers" style="display:none;" id="txtMRNDispensedtoOthers"  placeholder="Dispensed to Name"> -->
								</div>
						</div>

						<div class="form-group" style="display: none;"
							id="divDispensedName">
							<label for="firstname" class="col-sm-3"> Dispensed Name</label>
							<div class="col-sm-5">
								<input class="typeahead form-control input-SmallText"
									name="txtMRNDispensedtoOthers" id="txtMRNDispensedtoOthers"
									placeholder="Dispensed to Name">
							</div>
						</div>

						<div class="form-group col-md-12" id="AlloptionBtn">
							<!-- <label for="firstname" class="col-sm-3">OPD</label> -->

							<div class="col-md-2-1">
								<label class="checkbox input-SmallText"> <input
									id="OPDchk" type="radio" value="opd" name="typeOfpatient"
									onclick="showPateintNameandID()"
									style="margin-top: 0px !important;"> OPD
								</label>
							</div>
							<div class="col-md-2-1">
								<label class="checkbox input-SmallText"> <input
									id="IPDchk" type="radio" value="ipd" name="typeOfpatient"
									onclick="showPateintNameandID()"
									style="margin-top: 0px !important;"> IPD
								</label>
							</div>
							<div class="col-md-4-1">
								<label class="checkbox input-SmallText "> <input
									id="chkEntireDatabase" type="radio" value="diagnosis"
									name="typeOfpatient" onclick="showPateintNameandID()"
									style="margin-top: 0px !important;"> Entire Database
								</label>
							</div>

						</div>

						<div class="form-group "
							style="margin-right: 2%; margin-top: 0%; visibility: none"
							id="divtxtPatientName">
							<label for="exampleInputEmail1" class="TextFont col-sm-2">
								Patient Name </label>
							<div class="col-sm-5">
								<input class=" typeahead form-control input-SmallText" required
									name="txtPatientName" id="txtPatientName"
									placeholder="Patient Name"
									onkeypress="return validateOnlyName(event)"
									onkeyup="autoSuggestionForPateintName('txtPatientName', 'onchange');">
							</div>

						</div>
						<div class="form-group "
							style="margin-right: 2%; margin-top: -0%; visibility: none"
							id="divtxtPatientId">
							<label for="exampleInputEmail1" class="TextFont col-sm-2">
								Patient Id</label>
							<div class="col-sm-5">
								<input class="typeahead form-control input-SmallText"
									name="txtPatientId" id="txtPatientId" value="0"
									placeholder="Patient ID"> <input type="hidden"
									id="txtPatientTreatmentId" value="0"> <input
									type="hidden" id="referedTo">
							</div>
						</div>


						</form>

					</div>

					<div class="modal-body">
						<div class="col-md-12">
							<form class="form-horizontal  col-md-12-1" method="get"
								id="inventoryMRNForm">


								<div style="margin-top: 0px; margin-left: 2px;"
									class="col-md-12-1">

									<div class="box border col-md-12-1" style="margin-top: 0px;">

										<div class="tabbable col-md-12-1">
											<ul class="nav nav-tabs">
												<li class="active"><a data-toggle="tab"
													href="#ItemInfo"><i class="fa fa-user"></i> <span
														class="hidden-inline-mobile">Item Info</span></a></li>

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
																		<button onclick="createDivforConsumption()"
																			class="btn btn-xs btn-success" type='button'
																			id="btnAddNewConsumption" value="+">+</button>
																		<button type='button' id="btnRemoveConsumption"
																			onclick="toRemovesetItemInfotrMRN('tblSubContractingCountRow')"
																			style="margin: 7px;" class="btn btn-xs btn-success"
																			value="-">-</button>

																		<!-- <button onclick="setMaterialRequestInfo()"
																							class="btn btn-xs btn-success" type='button'>Add
																							New</button> -->
																		<table id="ItemInfoTableforConsumption"
																			cellpadding="0" cellspacing="0" border="1"
																			class="table table-bordered table-striped table-condensed">
																			<thead>
																				<tr>
																					<th class="col-md-2-2 center">select</th>
																					<th class="col-md-2-2 center">Sr No</th>
																					<th class="col-md-2-2 center">Item Name</th>
																					<th class="col-md-2-2 center">Required Quantity</th>
																					<th class="col-md-2-2 center">Available Quantity</th>
																					<th class="col-md-2-2 center">UOM</th>
																					<th class="col-md-2-2 center">Status</th>
																					<th class="col-md-2-2 center">Accept</th>

																				</tr>
																			</thead>
																			<tbody id="ItemInfoList"
																				style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																			</tbody>
																		</table>

																	</div>
																	<!-- <input type="hidden" id="txtMRNID"></input>
																					<input type="hidden" id="totalRow"></input> -->

																</div>
															</div>
														</div>
													</div>
												</div>
											</form>

										</div>
									</div>

								</div>
							</form>
						</div>

					</div>




				</div>


				<div class="modal-footer">
					<div class="form-group col-sm-1-1"
						style="margin-left: 3%; text-align: left;">
						<label for="exampleInputEmail1" class="TextFont">Total
							Item Qty </label><input type="text" class="form-control input-SmallText"
							readonly="readonly" name="firstName" id="txtConsumptionTDocQty"
							placeholder="Total Doc Qty">
					</div>
					<div class="form-group col-sm-2-1"
						style="margin-left: 3%; text-align: left;">
						<label for="exampleInputEmail1" class="TextFont">Remark </label><input
							type="text" class="form-control input-SmallText" name="firstName"
							id="txtConsumptionRemark" placeholder="Remark">
					</div>
					<div class="form-group col-md-9-1" id="iToHideBtnsConsumption"
						style="margin-left: 280px; display: none;">
						<button type="button" class="btn btn-primary"
							onclick="saveConsumptionDetails()">Save</button>
						<button type="button" class="btn btn-default"
							onclick="hideConsumptionDiv()">Cancel</button>

					</div>
				</div>
			</div>
		</div>
		</div>

		<!-- ************************************  End Div Consumed By Individual or Patient div *******************************************-->

		<!-- /*******************************************modal on click check***************************************************/ -->
		<div id="MRNDispensedList" class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content col-md-7"
					style="margin-top: 50px; margin-left: 140px;">
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
									<td><input type='text' id="totalItemQty"
										readonly="readonly" class='form-control input-SmallText' /> <input
										type='hidden' id="txtinventoryMaterailRequestNoteItemcode"
										class='form-control input-SmallText' /></td>
									<input type="hidden" id="hiddenCount" value="0" />
									<!-- <td><input type='text' id="requiredItemQty" onclick="validateQuantity()"
																	onkeyup="calculateRamainingQty(this.id,'totalItemQty')"
																class='form-control input-SmallText'/></td>	 -->
									<td><input type='text' id="requiredQty"
										class='form-control input-SmallText' /></td>
								</tr>
							</tbody>
						</table>
						<div class="modal-footer" style="margin-left: -180px;">
							<div class="form-group col-md-9-1">

								<button type="button" class="btn btn-primary"
									onclick="issueQtyAssign()">ok</button>
								<button type="button" class="btn btn-default"
									id="closeDispecedpopup" onclick="hideDispecedpopup();">Close</button>
									<input type="hidden" id="isEditUpdate"  value="0"/> 
									<input type="hidden" id="CurrentuserName"  value="<%= session.getAttribute("userName")%>"/>
									<!--add currentUserID @author paras suryawanshi @Date:19nov  -->
									<input type="hidden" id="CurrentuserId"  value="<%= session.getAttribute("userId")%>"/>
									


							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- /******************************************* End modal on click check***************************************************/ -->

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
			
			
			
			
			<!--*******Div for MRN Return @author paras suryawanshi @Date 3nov 2016 *********************************************************  -->	
		
					<div id="MrnReturnForm" class="modal fade in" tabindex="-1">
						<div class="modal-dialog" style="width:93%;">
							<div class="modal-content" class="col-md-12">
								<div class="modal-header">
									<div class="box-title">
										<h4 >
											<i class="fa fa-calendar">  <font color="red"> Mrn Return </font> </i> 
											
											
														
                                      <div class="form-group pull-right" id="iHidePurQtnBtn" style="display: block; padding-right: 5px;">
										<button type="button" class="btn btn-primary" onclick="saveMRNReturn()" id="SaveMrnReturn">Save</button>
										<button type="button" class="btn btn-default" data-dismiss="modal" onchange="javascript:window.location.reload()">Cancel</button>
										<input type="hidden" value="0" id="levelValue" />

									</div>
											
										</h4>
									</div>
								</div>
								<div class="modal-body">
									<div class="col-md-12">
										<form class="form-horizontal  col-md-12-1" method="get">

										
										            <div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Return
													To <b style="color: red;">*</b></label>
											<select class="form-control input-SmallText" id="txtMRNReturnTo" onchange="viewMRNReturnDetails(this.value);" style="width: 100px; margin-left: 0px;"><!-- <option value="Select">-Select-</option><option value="205">205</option><option value="202">202</option><option value="189">189</option><option value="188">188</option><option value="187">187</option><option value="186">186</option><option value="185">185</option><option value="174">174</option><option value="171">171</option><option value="170">170</option><option value="169">169</option><option value="164">164</option><option value="161">161</option><option value="160">160</option><option value="158">158</option><option value="157">157</option><option value="155">155</option><option value="148">148</option><option value="146">146</option><option value="143">143</option><option value="131">131</option><option value="129">129</option><option value="118">118</option><option value="114">114</option><option value="112">112</option><option value="111">111</option><option value="110">110</option><option value="106">106</option><option value="104">104</option><option value="103">103</option><option value="102">102</option><option value="100">100</option><option value="90">90</option><option value="85">85</option><option value="83">83</option><option value="81">81</option><option value="80">80</option><option value="74">74</option><option value="73">73</option><option value="66">66</option><option value="63">63</option><option value="56">56</option><option value="54">54</option><option value="52">52</option><option value="51">51</option><option value="42">42</option><option value="39">39</option><option value="36">36</option><option value="33">33</option><option value="32">32</option><option value="31">31</option><option value="27">27</option><option value="23">23</option><option value="20">20</option><option value="18">18</option><option value="17">17</option><option value="16">16</option><option value="10">10</option><option value="8">8</option><option value="5">5</option> --></select>
                                                                         
											</div>
										   	<div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Mrn
													Id </label><input type="text" class="form-control input-SmallText"
													required="true" name="txtDocNo" readonly="readonly"
													id="txtmrnreturnDocId" placeholder="Doc No"/>
											</div>
											<div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Mrn
													Date <b style="color: red;">*</b></label>
													<input id='txtMaterialReqaestNoteDate' readonly="readonly"
													   placeholder="date" name="txtMRNDate"
													class='form-control input-SmallText'/>
											</div>
											
											
											<div class="form-group col-sm-2-1" style="margin-right: 2%;"
												id="divtxtMRNLocationName">
												<label for="exampleInputEmail1" class="TextFont">
													Subinventory Name </label><input class=" typeahead form-control input-SmallText"
													required name="txtMRNReturnName" id="txtMRNReturnName" readonly="readonly"
													placeholder=" Name"/>
													<input type = "hidden" value ='0' id='subInventoryId'/>
											</div>

												<div class="form-group col-sm-1-1" style="margin-right: 2%;">
												<label for="exampleInputEmail1" class="TextFont">
												  Return Date <b style="color: red;">*</b></label>
													<input id='txtMRNReturnDate' readonly="readonly"   onclick="displayCalendar(document.getElementById('txtMRNReturnDate'),'dd/mm/yyyy',this)"
													   placeholder="date" name="txtMRNReturnDate"
													  class='form-control input-SmallText'/>
											</div>
											

											<div style="margin-top: -23px; margin-left: 2px;"
												class="col-md-12-1">
												<!-- BOX -->

												<div class="box border col-md-12-1">

													<div class="tabbable col-md-12-1">
														<ul class="nav nav-tabs">
															<li class="active"><a data-toggle="tab"
																href="#ItemInfo"><i class="fa fa-user"></i> <span
																	class="hidden-inline-mobile">Item Info(F2)</span></a></li>

            <!--                                                        <div class="li pull-right">

																<button onclick="toCreateDiv()" class="btn btn-xs btn-success" type="button" id="btnAddNew" value="+">+</button>
																<button type="button" onclick="toRemoveDivStock('RowCount')" style="margin: 7px;" class="btn btn-xs btn-success" value="_">-</button>
															</div> -->
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
																					<table id="ItemInfoTableMRN" cellpadding="0"
																						cellspacing="0" border="1"
																						class="table table-bordered table-striped table-condensed">
																						<thead>
																							<tr>
																								<th class="col-md-2-2 center">Select</th>
																								<th class="col-md-2-2 center">SrNo</th>
																								<th class="col-md-2-2 center">Item Name</th>
																							
																								<th class="col-md-2-2 center">Actual Quantity</th>
																							
																								<th class="col-md-2-2 center">UoM</th>
																								<th class="col-md-2-2 center">Return Quantity</th>
																								<th class="col-md-2-2 center">Recived  Quantity</th>
																					
																								<th class="col-md-2-2 center">Consume Quantity</th>
																							</tr>
																						</thead>
																						<tbody id="ItemInfoList"
																							style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																							<tr>
																								
																						</tbody>
																					</table>

																				</div>
													<input type="hidden" id="txtMRNReturnID"></input>
													<input type="hidden" id="totalRowMRN"></input>

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
					           					<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
										<label style="margin-left: 6%; for="exampleInputEmail1"  class="TextFont">Remark
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="firstName"
											id="txtMRNRemark" placeholder="Remark">
									</div>
																
																
																
																<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
										<label style="margin-left: 6%; for="exampleInputEmail1"  class="TextFont">Return By
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtReturnBy"
											id="txtReturnBy" placeholder="Name" >
									</div>
											
											
											
																	
																<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
										<label style="margin-left: 6%; for="exampleInputEmail1"  class="TextFont">Total Quantity:
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txttotalquantity"
											 readonly  id="txttotalquantity"  >
									</div>
											
											
																<div class="form-group col-sm-2-1" style="margin-left: 2%;text-align: left;">
										<label style="margin-left: 6%; for="exampleInputEmail1"  class="TextFont">Total Return Quantity:
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txttotalReturnqty"
											 readonly  id="txttotalReturnqty"  >
									</div>
											
											
											
								</div>
							</div>
						</div>
					</div>
	
	
	
		
	<!--*******Div for MRN Return @author paras suryawanshi @Date 3nov 2016 *********************************************************  -->	
			
			
			
			
			
			
			<!-- /***  **for MRN Partial Receive Author sudhir @sinces 3 feb 2016 :* ****/ -->
		<div id="MRNPartialReceive" class="modal fade in" tabindex="-1">
			<div class="modal-dialog" style="width: 93%;">
				<div class="modal-content" class="col-md-12">
					<div class="modal-header">
						<div class="box-title">
							<h4>
								<i class="fa fa-calendar"></i>Material Request Note <!-- <a style="margin-left: 950px; color: gray;" title="Close"  id="closeBtnm" onclick ="hideMrnGenratorDiv();">X</a> -->
								 	 
							</h4>

						</div>
					</div>
					<div class="modal-body">
						<div class="col-md-12">
							<form class="form-horizontal  col-md-12-1" method="get"
								id="inventoryMRNForm">

								<div class="form-group col-sm-1-1" style="margin-right: 2%;">
									<label for="exampleInputEmail1" class="TextFont">Mrn Id
									</label><input type="text" class="form-control input-SmallText"
										required name="txtDocNo" id="txtmaterialReqaestNoteDocIdParReceive"
										placeholder="Doc No" readonly="readonly">
								</div>
								<div class="form-group col-sm-2" style="margin-right: 2%;">
									<label for="exampleInputEmail1" class="TextFont">Mrn
										Date<b style="color: red;">*</b>
									</label><input class="form-group" required name="txtMRNDateParReceive"
										id="txtMRNDateParReceive" onkeypress="return checkDate(event)"
										placeholder="Mrn Date" readonly="readonly">
								</div>

								<div class=" typeahead form-group col-sm-1-1" style="margin-left: -4%;" id="divtxtMRNLocationNameParReceive" >
									<label for="exampleInputEmail1" class="TextFont"> Subinventory </label><input
										class="form-control input-SmallText"readonly="readonly" name="txtMRNLocationNameParReceive" id="txtMRNLocationNameParReceive" placeholder="Inventory name">
								</div>

								<div style="margin-top: 0px; margin-left: 2px;"
									class="col-md-12-1">
									<!-- BOX -->

									<div class="box border col-md-12-1">

										<div class="tabbable col-md-12-1">
											<ul class="nav nav-tabs">
												<li class="active"><a data-toggle="tab"
													href="#ItemInfo"><i class="fa fa-user"></i> <span
														class="hidden-inline-mobile">Item Info</span></a></li>


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
																		<!-- <button onclick="setMaterialRequestInfo()"
																			class="btn btn-xs btn-success" type='button'
																			id="btnAddNew" value="+">+</button> -->
																		<!-- <button type='button'
																			onclick="toRemovesetItemInfotrMRN('tblSubContractingCountRow')"
																			style="margin: 7px;" class="btn btn-xs btn-success"
																			value="-">-</button> -->

																		<!-- <button onclick="setMaterialRequestInfo()"
																							class="btn btn-xs btn-success" type='button'>Add
																							New</button> -->
																		<table id="ItemInfoTableParReceive" cellpadding="0"
																			cellspacing="0" border="1"
																			class="table table-bordered table-striped table-condensed">
																			<thead>
																				<tr>
																					<!-- <th class="col-md-2-2 center">select</th> -->
																					<th class="col-md-2-2 center">Sr No</th>
																					<th class="col-md-2-2 center">Item Name</th>

																					<th class="col-md-2-2 center">Mrn Quantity</th>
																					<th class="col-md-2-2 center">UOM</th>
																					<th class="col-md-2-2 center">Received Quantity</th>
																					<th id="acceptonViewandApproved"  class="col-md-2-2 center" style="display:none;">Accept</th>
																					<!-- 	<th class="col-md-2-2 center">Current Sub-InventoryStock</th> -->
                                                                                     <th class="col-md-2-2 center" id="Return" style="display:none;" >Return Quantity</th>   
																				</tr>
																			</thead>
																			<tbody id="ItemInfoListParReceive"
																				style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																			</tbody>
																		</table>

																	</div>
																	<!-- <input type="hidden" id="txtMRNID"></input> <input
																		type="hidden" id="totalRow"></input> -->

																</div>
															</div>
														</div>
													</div>
												</div>
											</form>
											<!--/husen  -->
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
						<div class="form-group col-sm-1-1"
							style="margin-left: 3%; text-align: left;">
							<label for="exampleInputEmail1" class="TextFont">Total
								Item Qty </label><input type="text" class="form-control input-SmallText"
								readonly="readonly" name="firstName" id="txtMRNTotalParReceive"
								placeholder="Total Doc Qty">
						</div>
						<div class="form-group col-sm-2-1"
							style="margin-left: 3%; text-align: left;">
							<label for="exampleInputEmail1" class="TextFont">Remark </label><input
								type="text" class="form-control input-SmallText"
								name="firstName" id="txtMRNRemarkParReceive" placeholder="Remark">
						</div>
						
						<!-- <div class="form-group col-sm-2-1" style="margin-left: 3%; text-align: left; display: none" >
							<label for="exampleInputEmail1" class="TextFont">Remark </label><input
								type="hidden" class="form-control input-SmallText"
								name="txtReceiverName" id="txtReceiverNameParReceive" placeholder="Receiver Name" value='  '/>
						</div> -->
						<div class="form-group col-sm-2-1" style="margin-left: 2%; text-align: left;">
										<label style="margin-left: 6%;" for="exampleInputEmail1" class="TextFont">Carrier Name 
										</label><input type="text" class="form-control input-SmallText"
											style="float: right;" name="txtReceiverNameParReceive" id="txtReceiverNameParReceive"
											placeholder="Carrier Name ">
									</div>
						
						<!-- <div class="form-group col-md-9-1" id="approvedHideBtns"
							style="margin-left: 280px; display: none;">
						<button type="button" id="ApprovedByIncharge1" name="ApprovedByIncharge"  value="level-I" data-target="#userNameandpasswordPopUp" data-toggle="modal"  onclick="chklevlval($('#ApprovedByIncharge1').val())" class="btn btn-primary">Approved level 1 </button>
						<button type="button" id="ApprovedByIncharge2" name="ApprovedByIncharge"  value="level-II" data-target="#userNameandpasswordPopUp" data-toggle="modal"  onclick="chklevlval($('#ApprovedByIncharge2').val())" class="btn btn-info">Approved level 2</button>
						<button type="button" class="btn btn-default" data-dismiss="modal" onchange="javascript:window.location.reload()">Cancel</button>
						<input type="hidden" value="0" id="levelValue" />
						</div> -->
						<div class="form-group col-md-9-1" id="iToHideBtnsParReceive"
							style="margin-left: 280px;">
							
							<!-- <button type="button" class="btn btn-primary"
								onclick="saveMaterialRequestNote()" id='SaveMrnDetailParReceive'>Save</button> -->
							<button type="button" class="btn btn-default"
								data-dismiss="modal"
								onchange="javascript:window.location.reload()">Close</button>

						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- /*** *****End Div for MRN Partial Receive Author sudhir @sinces 3 feb 2016 :*****/ -->	
			
			
					

		<%@include file="Footer.jsp"%>

	</section>
	<input type="hidden" id="callfrom" value="OT">
</body>
</html>