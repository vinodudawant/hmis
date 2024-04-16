<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="aIndent No.uthor" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/responsive.css"/>">
<link
	href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<link
	href="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/css/morphext.css"/>">
<!-- JQUERY -->
<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- Application js -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_hospital_sales_bill.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_patient_batch_popup.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/js/morphext.min.js"/>"></script>

<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/EhatEnterprise/pharmacy/resources/images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
<script type="text/javascript">
	onload = function() {
		$("#txtRatePerUnit").css('background', 'yellow');
		$("#js-rotating").Morphext({
			// The [in] animation type. Refer to Animate.css for a list of available animations.
			animation : "flash",
			// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
			separator : ".",
			// The delay between the changing of each phrase in milliseconds.
			speed : 500,
			complete : function() {
				// Called after the entrance animation is executed.
			}
		});

	},
	
	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});

	jQuery(document).ready(function() {
		App.setPage("Pharma_Hospital_Sales"); //Set current page
		setValuesToAutocomplete(null);
		App.init(); //Initialise plugins and elements

		var inputs = [];
		inputs.push('docId=2');

		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/common/getDocNo",
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#txtBillNo').val(r);
			}
		});

		/* $("#submitForm").click(function(event) {

			$("#hospitalSalesBill").submit();
			window.open("/EhatEnterprise/pharmacy/hospitalSalesBill/view-frm");

			reset();
			alertify.success("Record Saved Succesfully");
		}); */

		setInterval(function() {
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/common/getDocNo",
				catche : false,
				error : function() {
					
				},
				success : function(r) {
					$('#txtBillNo').val(r);
				}
			});
		}, 10000); //50 seconds

	});

	shortcut.add("Ctrl+s", function() {
		validateData();
		
	});
	
	shortcut.add("Ctrl+l",function() {
		backToList('hospitalSale');
	});
</script>
<script>
	function validateData() {
		if ($('#txtInwardNo').val() != null && $('#txtInwardNo').val() != "") 
		{
			if ($('#txtPatient').val() != null && $('#txtPatient').val() != "")
			{
				if ($('#popup_container2').val() != null && $('#popup_container2').val() != "")
                {
				if ($('#txtWard').val() != null && $('#txtWard').val() != "")
                {
				if ($('#txtBillNo').val() != null && $('#txtBillNo').val() != "")
					{
					if ($('#txtGrossAmt').val() != null && $('#txtGrossAmt').val() != 0)
	                   {
							if ($('#hiddenHospitalSalesBillId').val() != null && $('#hiddenHospitalSalesBillId').val() != "") 
									{
										alert("Record Updated Successfully!");
										$('#hospitalSalesBill').submit();
										window
										.open("/EhatEnterprise/pharmacy/hospitalSalesBill/view-frm");
									} 
									else
									{
										var totalFillRow=0;
										for(var i=1;i<$('#RowCount').val();i++)
										{
											if($('#hiddenProductId'+i).val()!='' && $('#hiddenProductId'+i).val()!=null)
											{
												totalFillRow++;
											}
											
										}
										if(totalFillRow>0)
										{	
										alert("Record Saved Successfully!");
										$('#hospitalSalesBill').submit();
										window
										.open("/EhatEnterprise/pharmacy/hospitalSalesBill/view-frm");
																	
										}
										else
										{
											showAlert();
										}
									}
								} 
					else {
						alert("Enter Proper Product Name");
						
					}
				} 
								
						 else {
						alert("Enter Bill No");
						$('#txtBillNo').focus();
					}
				}
					else {
					alert("Enter Patient Ward");
					$('#txtWard').focus();
				}
			}
				else {
					alert("Select Date");
					$('#popup_container2').focus();
				}
			}
				else {
				alert("Record not found");
				$('#txtInwardNo').val('');
			}

		} else {
			alert("Enter Inward No");
			$('#txtInwardNo').focus();
		}

	}
	function showAlert()
	{
		
		alert("Please Fill All the Details!");
	}
	
</script>
<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
</head>

<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_hospital_sales_pop_up.jsp"%>
			<%@include file="HelpMenu.jsp"%>

			<div id="main-content">
				<div class="container">
					<c:set scope="session"
						value="${fn:length(hospitalSalesBill.hospitalSaleBillSlaves)}" var="slaveCount"></c:set>
						
					<%-- <form:form commandName="hospitalSalesBill" id="hospitalSalesBill"
						action="/EhatEnterprise/pharmacy/common/saleType"
						method="post"> --%>
						<!-- 10 June 20  -->
						<form:form commandName="hospitalSalesBill" id="hospitalSalesBill"
						action="/EhatEnterprise/pharmacy/hospitalSalesBill/save"
						method="post">
						
						<input type="hidden" name="saleFrom" value="hospitalSale">
						<div class="row">
							<div id="content" class="col-lg-12">
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date :<%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="href="/EhatEnterprise/Dashboard.jsp">Home</a>
												</li>
												<li><a href="/EhatEnterprise/pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Hospital Sales Bill Entry</li>
												<!-- <li><i class="fa fa"></i></li>
												<li><a href="IPD_OPD_Database.jsp">Document SetUp</a></li> -->
												<div class="li pull-right" style="margin-left: 9px;"><a
													href="/EhatEnterprise/pharmacy/hospitalSalesBill/view"
													class="btn btn-xs btn-info">Back to List</a>
													<button class="btn btn-xs btn-success" type="button"
														id="saveBtn" onclick="validateData();">Save and Print(Ctrl+S)</button></div>
												<!-- <button class="btn btn-xs btn-warning">Print</button>
													<button class="btn btn-xs btn-danger">Discard</button> -->
												
											</ul>
										</div>
									</div>
								</div>
							<%-- 	<c:choose>
									<c:when test="${slaveCount !=0}">
										<input type="hidden" id='HospitalBillId' name='HospitalBillId'
											value="${hospitalSalesBill.hospitalBillId}" />
                                          <script type="text/javascript">
											generatePrint();
										</script>
										
									</c:when>
								</c:choose> --%>
								
								
								<%-- 	<c:if test="${not empty success}">
									<div class="alert alert-success" id="msgDiv">${success}</div>
								</c:if>
								<c:if test="${not empty error}">
									<div class="alert alter-danger" id="msgDiv">${error}</div>
								</c:if> --%>

								<div class="col-md-12-1">
									<b>Hospital Sales Bill Entry</b>
								</div>
								<div class="row">
									<div class="col-md-12-1 panel-body">
										<div class="panel-body">

											<div id="vendorMaster" class="col-md-12-1"
												style="height: 100%; margin-top: 0%; padding-left: 20px; border: 1px solid #b8b8b8;">


												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Inward No.</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="hospitalBillInwardNo" type="text"
																id="txtInwardNo" name="txtInwardNo"
																class="form-control input-SmallText"
																placeholder="Inward No"  required="true"
																onblur="splitHospitalContent($('#txtInwardNo').val()),isNumber('txtInwardNo');" />

															<form:hidden path="hospitalBillId"
																id="hiddenHospitalSalesBillId" />

															<input type="hidden" id="products"> <input
																type="hidden" id="productsQuantity">

															<script type="text/javascript">
																$(
																		"#txtInwardNo")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#txtInwardNo")
																								.val();
																						var inputs = [];
																						inputs
																								.push('inwardNo='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "POST",
																									data : str
																											+ "&reqType=AJAX",
																									url : "/EhatEnterprise/pharmacy/hospitalSalesBill/getDetailsByInward",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										/* alert('error'); */
																									},
																									success : function(
																											r) {
																										if (r.length > 0) {
																											var inwardNo = r[0].inwardNo;
																											var availableTags = [];
																											count = 0;
																											var arr1 = [];
																											var productQuantity = [];
																											for ( var i = 0; i < r.length; i++) {

																												if (r[i].inwardNo == inwardNo
																														&& count <= 0) {
																													inwardNo = r[i].inwardNo;
																													availableTags[i] = r[i].inwardNo
																															+ "&&"
																															+ r[i].patientName
																															+ "&&"
																															+ r[i].patientAddress
																															+ "&&"
																															+ r[i].doctorName
																															+ "&&"
																															+ r[i].doctorAddress
																															+ "&&"
																															+ r[i].wardName
																															+ "&&"
																															+ r[i].patientId
																															+ "&&"
																															+ r[i].doctorId
																															+ "&&"
																															+ r[i].patientMobileNumber;
																												}
																												count++;
																												arr1
																														.push(r[i].productId);
																												productQuantity
																														.push(r[i].productQuantity);
																											}
																											$(
																													"#products")
																													.val(
																															arr1);
																											$(
																													"#productsQuantity")
																													.val(
																															productQuantity);
																											response(availableTags);
																										}
																									}
																								});
																					}
																				});
															</script>
															<div class='col-md-1-1 center'
																style='margin-top: -9px; margin-left: 206px; color: red;'>
																<b> *</b>
															</div>

														</div>

													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Patient Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input type="text" path="patientName"
																id="txtPatient" class="form-control input-SmallText"
																placeholder="Patient Name" 
																required="true" readonly="true"
																onblur="splitPatientContent($('#txtPatient').val());" />
                                                               <!-- ,isAlphaWithSpace('txtPatient',0,200); -->
															<form:input type="hidden" path="patientMaster"
																id="hiddenPatientId" />
															<div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 207px; color: red;'>
																<b> *</b>
															</div>

														</div>
													</div>
													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<input type="text" id="txtPatientAddress"
																name="txtPatientAddress"
																class="form-control input-SmallText" readonly
																placeholder="Address"  required />

														</div>
													</div>
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>Phone Number</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="patientMobile" type="text"
																id="txtMobileNumber"
																class="form-control input-SmallText" readonly="true"
																placeholder="Phone Number" 
																required="true" />
															
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>Date</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="hospitalBillDate" id="popup_container2"
																class="form-control input-SmallText" type="text"
																readonly="true" name="txtDate" placeholder="Date"
																 required="true" value="<%=todays_date%>"
																onclick="displayCalendar(document.getElementById('txtDate'),'dd/mm/yyyy',this)" />
																<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 206px; color: red;'>
																<b> *</b>
															</div>
																
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1 center" style="margin-top: 0px;">
															<b>Ward</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="hospitalBillWard" type="text"
																id="txtWard" name="txtWard"
																class="form-control input-SmallText" placeholder="Ward"
																readonly="true"  required="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 206px; color: red;'>
																<b> *</b>
															</div>

														</div>
													</div>


													<%-- <div class="center col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-12-1 center" style="margin-top: 9px;">
															<form:radiobutton path="transactionType" value="0"
																id="radioCash" name="radioCashCredit" />
															Cash
															<form:radiobutton path="transactionType" value="1"
																id="radioCredit" name="radioCashCredit" />
															Credit
														</div>
													</div> --%>
												</div>

												<div class="col-md-4" style="margin-top: 9px;">

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1 " style="margin-top: 0px;">
															<b>Bill No</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 0px;">
															<form:input path="hospitalBillDocNo" type="text"
																id="txtBillNo" class="form-control input-SmallText"
																name="txtBillNo" placeholder="Bill No" 
																required="true" readonly="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -12px; margin-left: 215px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Doctor</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 0px;">
															<form:input path="doctorName" type="text" id="txtDoctor"
																class="form-control input-SmallText"
																placeholder="Doctor Name"  required="true"
																readonly="true"
																onblur="splitDoctorContent($('#txtDoctor').val());" />
                                                             <!-- ,isAlphaWithSpace('txtPatient',0,200) -->
															<form:input type="hidden" path="doctorMaster"
																id="hiddenDoctorId" />
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 272px; color: red;'>
																<b> *</b>
															</div>
														</div>

													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Address</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 0px;">
															<input type="text" id="txtDoctorAddress"
																name="txtDoctorAddress"
																class="form-control input-SmallText" readonly
																placeholder="Address"  required />
														</div>
													</div>

													<%-- <div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b>Indent No.</b>
														</div>
														<div class="col-md-8-1" style="margin-top: 0px;">
															<form:input path="hospitalBillIndentNo" type="text"
																id="txtIndentNo" class="form-control input-SmallText"
																name="txtIndentNo" placeholder="Indent No."
																maxlength="25" required="true" />
														</div>
													</div> --%>
													<!-- <div class="col-md-12-1 center" style="margin-top: 7px;margin-bottom: 10px;">
															<input type="radio" id="radioCash" name="transactionType" value="0">
															Cash
															<input type="radio" id="radioCredit" name="transactionType" value="1">
															Credit
														</div> -->
												</div>
											</div>
										</div>
									</div>
								</div>

								<div id=""
									style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<div class="col-md-12-1">
										<input type="button" value="-" class="btn btn-xs btn-success"
											style="margin: 7px; float: right" onclick="deleteRow();">
									</div>
									<table id="purchaseTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md center">Sr.</th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Product Name</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Unit</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Pack</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Comp</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Vat %</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Batch No</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Expiry</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Shelf No</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>M.R.P</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Dis %</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Quantity</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Rate</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Amount</div></th>
														
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>		
											</tr>
										</thead>
										<tbody id="HSTDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<%-- <tr>
												<td><label class='input-SmallText'>1</label></td>
												<td><input type='hidden' id='hiddenCurrentRow'
													value='1' /> <form:hidden id="hospitalSlaveId0"
														path="hospitalSaleBillSlaves[0].hospitalSlaveId" /> <form:hidden
														id="hiddenProductId1"
														path="hospitalSaleBillSlaves[0].productMaster.productId" />
													<form:input
														path="hospitalSaleBillSlaves[0].productMaster.productName"
														type="text" id="textProductName1" name="textProductName1"
														class='form-control input-SmallText' data-toggle="modal"
														data-target="#Hospital_Sales_Form" onclick="load(1,1)" /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.productUnit"
														type="text" id="textUnit1" name="textUnit1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.packingMaster.packType"
														type="text" id="textPack1" name="textPack1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].productMaster.companyMaster.compShortName"
														type="text" id="textComp1" name="textComp1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td style="display: none;">
													<form:hidden path="debitNoteSlaves[0].productMaster.batchMaster[0].batchCode" id="" />
													<form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].batchId"
														type="text" id="textBatchId1" name="textBatchId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].stockMaster.stockId"
														type="text" id="textStockId1" name="textStockId1"
														class='form-control input-SmallText' readonly="true" /> <form:input
														path="hospitalSaleBillSlaves[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
														type="text" id="textStockQtyInHand1"
														name="textStockQtyInHand1"
														class='form-control input-SmallText' readonly="true" /> <input
													type="text" id="textClStk1" value=""><input
													type="text" id="textTotalStk1" value=""> <input
													type="text" id="textPurchaseRate1" value="">
												</td>

												<td><form:input path="" type="text" id="txtVat"
														readonly='true' name="txtVat"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveBatchCode"
														type="text" id="txtBatchNo" name="txtBatchNo"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveBatchExpiry"
														type="text" id="txtExpiry" readonly='true'
														name="txtExpiry" class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="txtShelfNo"
														readonly='true' name="txtShelfNo"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveMrp"
														type="text" id="textMRP1" readonly='true' name="textMRP1"
														class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="txtDisc"
														readonly='true' name="txtDisc"
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveQty"
														type="text" id="textQty1" name="textQty1" readonly='true'
														class='form-control input-SmallText' /></td>

												<td><form:input
														path="hospitalSaleBillSlaves[0].hospitalSlaveRate"
														type="text" id="textRate1" name="textRate1"
														readonly='true' class='form-control input-SmallText' /></td>

												<td><form:input path="" type="text" id="textAmount1"
														readonly='true' name="textAmount1"
														class='form-control input-SmallText' /></td>
														
												<td><input type="checkbox" name="deleteGroup"
															value="1" id="deleteGroup1"></td>		
											</tr> --%>

										</tbody>
									</table>
								</div>
								<div class="divide-20"></div>
								<div class="col-md-12-1 " style="margin-top: 0px;">
									<div class="col-md-12-1" style="margin-top: 9px;">
										<div class="form-group  col-md-10-1"
											style="margin-right: 0%; margin-left: 0%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-1-1" style="margin-top: 9px;">
													<b>Naration</b>
												</div>
												<div class="col-md-7-1"
													style="margin-top: 5px; margin-right: 0%;">
													<form:input path="hospitalBillNarration" type="text"
														id="txtNaration" name="txtNaration"
														class="form-control input-SmallText"
														placeholder="Naration"  required="true"
														 />
														<!--  onblur="isAlphaWithDigitSpace('txtNaration',0,500)" -->
												</div>

											</div>
										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 1%; margin-left: 1%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>C.N.</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillCN"
														class="form-control input-SmallText" type="text"
														id="txtCN" name="txtCN" placeholder="C.N." 
														required="true" onblur="isFloatingPoint('txtCN');" />
												</div>
											</div>
											<div class="form-group col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b> C.D.%</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input class="form-control input-SmallText"
														path="hospitalBillCD" type="text" id="txtCD" name="txtCD"
														placeholder="C.D.%"  required="true"
														onblur="isFloatingPoint('txtCD'),calculatecdAmt(),CheckDis();" />
												</div>
											</div>

										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 1%; margin-left: 1%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>Special Disc</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillSpecialDisc" type="text"
														id="txtSpecialDisc" class="form-control input-SmallText"
													name="txtSpecialDisc" placeholder="Special Disc"
														 required="true" value='0'  
														onblur="isFloatingPoint('txtSpecialDisc'),validateSpeDisc(),calculateDiscount();" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>C.N.Amt</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillCnAmt" type="text"
														id="txtCNAmt" class="form-control input-SmallText"
														name="txtCNAmt" placeholder="C.N.Amt" 
														required="true" onblur="isFloatingPoint('txtCNAmt');" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<b>C.D.Amt</b>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillCdAmt" type="text"
														readonly="true" id="txtCDAmt"
														class="form-control input-SmallText" name="txtCDAmt"
														placeholder="C.D.Amt"  required="true" onblur="isFloatingPoint('txtCDAmt');"/>
												</div>

											</div>

										</div>
										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%;">
											<div class="panel panel-default">
												<div class="panel-body">
													<div class="form-group  col-md-12-1"
														style="margin-right: 2%; margin-left: 2%;">
														<div class="col-md-5-1"
															style="margin-top: 5px; margin-right: 2%;">
															<b>Surcharge</b>
														</div>
														<div class="col-md-5-1"
															style="margin-top: 5px; margin-right: 2%;">
															<form:input path="hospitalBillSurcharges" type="text"
																id="txtSurcharge" name="txtSurcharge"
																class="form-control input-SmallText"
																placeholder="Surcharge"  required="true"
																onblur="isFloatingPoint('txtSurcharge'),calculateSurchargeHos();" />
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%; margin-top: -5%;">

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-bottom: 2%;">

												<label class="TextFont"></label>

											</div>
											<div class="form-group  col-md-7-1"
												style="margin-right: 2%; margin-left: 2%;">

												<label class="TextFont"><b>Amount Received</b></label>


												<form:input path="hospitalBillAmountReceived" type="text"
													id="txtAmtRec" class="form-control input-SmallText"
													name="txtAmtRec" placeholder="Amount Received"
													 required="true"
													onblur="isFloatingPoint('txtAmtRec');" />

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">

												<label class="TextFont"><b>Amount Balance</b></label>


												<form:input path="hospitalBillTotalBalance" type="text"
													id="txtAmtBal" class="form-control input-SmallText"
													name="txtAmtBal" placeholder="Amount Balance"
													 required="true"
													onblur="isFloatingPoint('txtAmtBal');" />

											</div>
										</div>

										<div class="form-group  col-md-2-1"
											style="margin-right: 2%; margin-left: 2%; float: right; margin-top: -4%;">
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Gross Amt</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillGrossAmt" type="text"
														value='0' id="txtGrossAmt"
														class="form-control input-SmallText" name="txtGrossAmt"
														placeholder="Gross Amt"  required="true"
														readonly="true" />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Less</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillLess" type="text"
														id="txtLess" name="txtLess" value='0' readonly="true"
														class="form-control input-SmallText" placeholder="Less"
														 required="true"
														onblur="calculateNetAmount('less')" />
												</div>

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Add</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillAdd" type="text" id="txtAdd"
														name="txtAdd" class="form-control input-SmallText"
														value='0' readonly="true" placeholder="Add" 
														required="true" onblur="calculateNetAmount('add')" />
												</div>

											</div>

											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Round</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillRound" type="text" value='0'
														id="txtRount" class="form-control input-SmallText"
														name="txtRount" placeholder="Round"  />
												</div>

											</div>
											<div class="form-group  col-md-12-1"
												style="margin-right: 2%; margin-left: 2%;">
												<div class="col-md-5-1"
													style="margin-top: 5px; margin-right: 2%;">
													<label class="TextFont"><b>Net Amt.</b></label>
												</div>
												<div class="col-md-6-1"
													style="margin-top: 5px; margin-right: 2%;">
													<form:input path="hospitalBillNetAmt" type="text"
														readonly="true" id="txtNetAmt"
														class="form-control input-SmallText" name="txtNetAmt"
														placeholder="Net Amt." required="true" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form:form>
				</div>
				
				<%@include file="Pharma_Footer.jsp"%>
			</div>
		</div>
		<input type='hidden' value='0' id='addRowCount' />
			<c:choose>
				<c:when test="${slaveCount ==0}">
					<input type="hidden" value="1" id="RowCount">
				</c:when>
				<c:when test="${slaveCount !=0}">
					<input type="hidden" value="${slaveCount}" id="RowCount">
					<script type="text/javascript">
					
					</script>
				</c:when>
			</c:choose>
		
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</section>
</body>
</html>