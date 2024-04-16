<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<%-- <link rel="stylesheet" type="text/css"
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

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

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
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script> --%>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_cash_paid_entry.js"/>"></script>
<%-- <script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>


<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script> --%>
	
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<%-- <script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script> --%>
<!-- /for Developers  -->
<%@include file="pharma_header.jsp"%>
<!-- CUSTOM SCRIPT -->

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
		url('../.././pharma-resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
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

<script>
		jQuery(document).ready(function() {		
			App.setPage("Pharma_Cash_Paid_Entry");  //Set current page
			App.init(); //Initialise plugins and elements
			
			jQuery(document).ajaxStart(function() {
				//alert("hi ajax start");
				$("body").addClass("loading");
			});

			jQuery(document).ajaxStop(function() {
				$("body").removeClass("loading");
				//alert("hi ajax stop");
			});
		});
</script>
<script type="text/javascript">
	onload = function() {
		var inputs = [];

		//doc id 1 = purchase order
		inputs.push('docId=2');

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/common/getDocNo",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#txtVouNo').val(r);
			}
		});
	}
	shortcut.add("Ctrl+s",function() {
		validateData();
		
	});
	
	shortcut.add("Ctrl+l",function() {
		backToList('cashPaidEntry');
	});
	
</script>
<script>
function validateData() 
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
		{ 
		if($('#vendorId').val()!=null && $('#vendorId').val()!="")
		{ 
	/* 	if($('#txtAddress').val()!=null && $('#txtAddress').val()!="")
		   { 	
			if($('#txtPhone').val()!=null && $('#txtPhone').val()!="")
			   {  */
				if($('#txtVouDate').val()!=null && $('#txtVouDate').val()!="")
				   {
					if($('#txtAmount').val()!=null && $('#txtAmount').val()!="")
				         { 
						if($('#txtVouNo').val()!=null && $('#txtVouNo').val()!="")
				         { 
						if($('#txtAmount').val()!=null && $('#txtAmount').val()!="" && $('#txtAmount').val()!=0)
						{ 	 
						if($('#cashPaidId').val()!=null && $('#cashPaidId').val()!="")
							{ 
								alert("Record Updated successfully!");	
								$('#cashPaidEntryForm').submit();
								/* window
								.open("/EhatEnterprise/pharmacy/cashPaidEntry/view-frm"); */
							 }
							else
							{  
								alert("Record Saved successfully!");
							    $('#cashPaidEntryForm').submit();
							 /*    window
								.open("/EhatEnterprise/pharmacy/cashPaidEntry/view-frm"); */
								 	    
						    }
					}
						else {
							alert("Select pending bill");
							
						  }	
				         }
						else {
							alert("Enter Vou No");
							 $('#txtVouNo').focus();
						  }	
				         }
					else {
						alert("select Amount");
						 $('#txtAmount').focus();
					  }	
				   }
					else {
							alert("Enter Vou Date");
							 $('#txtVouDate').focus();
						  }	
			   } 
				else
				  {
					alert("Enter Vendor Phone");
					 $('#txtPhone').focus();
				  }	
				}
			
			/* else
			  {
				alert("Enter Vendor Address");
				 $('#txtAddress').focus();
			  }	
		   }
		else
		  {
			alert("Record not found");
			$('#searchBox').val('');
			 $('#searchBox').focus();
		  }	
		
	} */
	else
	  {
		alert("Enter Vendor Name");
		 $('#searchBox').focus();
	  }	
	
}

</script>
</head>
<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd/MM/yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>


<body style="background: white ! important;">
	<section id="page">
		<c:set scope="session"
			value="${fn:length(cashPaidEntry.cashPaidSlaves)}" var="slaveCount"></c:set>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
				<%@include file="HelpMenu.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<form:form commandName="cashPaidEntry" id="cashPaidEntryForm"
							action="save" method="post">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="../../Dashboard.jsp">Home</a></li>
												<li><a href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Cash Paid Entry</li>
											<!-- 	<li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li> -->
												<div class="li pull-right" style="margin-left: 9px;"><button type="button"
														class="btn btn-xs btn-success"
														onclick="validateData();">Save and Print(Ctrl+S)</button> <!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> --></div>
												<div class="li pull-right" style="margin-left: 9px;"><a
													class="btn btn-xs btn-info"
													href="../../pharmacy/cashPaidEntry/view">Back
														to List</a></div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
								<div id="SearchContent" class="col-md-12-1">
									<!-- <div class='col-md-1-1'>Search By:</div>
					<div class='col-md-1-1'>Drug Name</div>
					<div class='col-md-2-1'>
					<input id='strValue' name='strValue' name='strValue' type='text' />
					</div>
					<div class='col-md-2-1'>
					<input id='searchDrug' type='button' value='Search'
					class='edit' onclick='searchDrug()' />
					</div> -->
								</div>
								<!-- <div class="divide-40"></div> -->
								<div class="col-md-12-1">
									<b>Cash Paid Entry</b>
								</div>
								<div class="row">
									<div class="panel-body col-md-12-1">
										<div class="panel-body">
											<div id="chequePaid" class="col-md-4-1"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">

														<div class="col-md-3-1" style="margin-top: 0px;">
															<b>Vendor Name </b>
														</div>

														<div class="col-md-7-1" style="margin-top: 0px;">

															<form:hidden id="vendorId" path="vendorMaster.vendorId" value='0' />
															<form:hidden path="cashPaidId" id="cashPaidId" />

															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<input type="text" id='searchBox' name='searchBox'
																		placeholder="Name"
																		class="ui-autocomplete-input form-control input-SmallText margin-1"
																		onblur="splitCashPaidEntryContent($('#searchBox').val()),setAmt();" />
                                                                  <!-- ,isAlphaWithSpace('searchBox',0,200) -->
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<input type="text" id='searchBox1' name='searchBox1'
																		placeholder="Name"
																		class="ui-autocomplete-input form-control input-SmallText"
																		value="${cashPaidEntry.vendorMaster.vendorName}" />
																</c:when>
															</c:choose>

															<script type="text/javascript">
																$("#searchBox")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#searchBox")
																								.val();
																						var inputs = [];
																						inputs
																								.push('letter='
																										+ findingName);
																						var str = inputs
																								.join('&');

																						jQuery
																								.ajax({
																									async : true,
																									type : "GET",
																									data : str
																											+ "&reqType=AJAX",
																									url : "../../pharmacy/vendor/autoSuggestionVendor",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert(error);
																									},
																									success : function(
																											r) {
																										//alert("REach");
																										var availableTags = [];
																										for ( var i = 0; i < r.length; i++) {
																											availableTags[i] = r[i].vendorName
																													+ "-"
																													+ r[i].vendorId
																													+ "-"
																													+ r[i].vendorAddress
																													+ "-"
																													+ r[i].vendorMobileNumber;

																										}
																										response(availableTags);
																									}

																								});
																					}
																				});
															</script>
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>

													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">

															<c:choose>
																<c:when test="${slaveCount !=0}">
																	<textarea id="txtAddress" disabled name="txtAddress"
																		class="form-control input-SmallText"
																		placeholder="Address"
																		${cashPaidEntry.vendorMaster.vendorAddress}
																		 required>${cashPaidEntry.vendorMaster.vendorAddress}</textarea>
																</c:when>
																<c:when test="${slaveCount ==0}">
																	<form:textarea path="" id="txtAddress" disabled="true"
																		name="txtAddress" class="form-control input-SmallText"
																		placeholder="Address"  required="true" />
																</c:when>
															</c:choose>
                                                     <!--  <div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div> -->
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> phone </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="" type="text" id="txtPhone"
																		disabled="true" name="txtPhone"
																		class="form-control input-SmallText"
																		placeholder="Phone"  required="true" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<input type="text" id="txtPhone" disabled
																		name="txtPhone" class="form-control input-SmallText"
																		placeholder="Phone"  required
																		value="${cashPaidEntry.vendorMaster.vendorMobileNumber}">
																</c:when>
															</c:choose>
                                                   <!--  <div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div> -->
														</div>

													</div>
												</div>


												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Vou Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">

															<c:choose>
																<c:when test="${slaveCount==0}">
																	<form:input path="cashPaidDate" id="txtVouDate"
																		class="form-control input-SmallText" type="text"
																		readonly="true" name="txtVouDate" value="<%=todays_date%>"
																		placeholder="vou date"  required="true"
																		onclick="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)" />
																</c:when>
																<c:otherwise>
																	<c:set var="vouDate" value="${cashPaidEntry.cashPaidDate}" />
																	<fmt:formatDate value="${vouDate}"
																		var="parsedVouDate" pattern="dd/MM/yyyy" />
																	<form:input path="cashPaidDate" id="txtVouDate"
																		class="form-control input-SmallText" type="text"
																		readonly="true" name="txtVouDate"
																		value="${parsedVouDate}"
																		placeholder="vou date"  required="true"
																		onclick="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)" />
																</c:otherwise>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Amount </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashPaidAmt" id="txtAmount"
																class="form-control input-SmallText" type="text"
																placeholder="Enter Amt"  required="true" value='0'
																readonly="true" name="txtAmount" onblur="isFloatingPoint('txtAmount');"/>
															<br>
														</div>
														<div class='col-md-1-1 center'
																style='margin-top: -26px; margin-left: 323px; color: red;'>
																<b> *</b>
															</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">

														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> Narration </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashPaidNarration" id="txtNarration "
																class="form-control input-SmallText" type="text"
																name="txtNarration" placeholder="Enter narration "
																 required="true"  
																 />
																 <!-- onblur="isAlphaWithDigitSpace('txtNarration',0,500)" -->
															<br>
														</div>


													</div>
												</div>

												<div class="col-md-4-1 center" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="cashPaidDocId" id="txtVouNo"
																class="form-control input-SmallText" type="text"
																name="txtVouNo" readonly="true" placeholder="Vou No"
																 required="true" />
															<br>
															<div class='col-md-1-1 center'
																style='margin-top: -25px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>

								<div id="HSTDiv"
									style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
									<table id="ItemInfoTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr>
												<th class="col-md-1 center" style="height: 21.5px;"><label
													class='TextFont'>#</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Vou.No </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Bill.No</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Bill.Date </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> vat% </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Bill.Amt </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Balance </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Amount </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Discount</label></th>
											</tr>
										</thead>
										<tbody id="CashpaidEntryDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<c:choose>
												<c:when test="${slaveCount==0}">
													<tr>
														<td class="col-md-1" style="height: 21.5px;"><label
															class='input-SmallText'
															style='margin-top: 8px; padding: 0px 4px 0px 4px;'>
																1 </label></td>
														<!-- <td class="col-md-1 " style="height: 21.5px;"><input
															type='text' class='form-control input-SmallText'
															id='itn0' name='itn0' maxlength='150'></td> -->

														<td style="height: 21.5px;" class="col-md-1-1"><input
															type='text' class='form-control input-SmallText' id='ip0'
															name='ip0' 
															onkeypress='return validateNumbers(event)'></td>

														<td class="col-md-1-1" style="height: 21.5px;"><input
															type='text' class='form-control input-SmallText' id='aq0'
															name='aq0' 
															onkeypress='return validateNumbers(event)'
															class="col-md-1-1 center"></td>

														<td style="height: 21.5px;" class="col-md-1-1 "><input
															type='text' class='form-control input-SmallText' id='mq0'
															name='mq0' 
															onkeypress='return validateNumbers(event)'></td>

														<td style="height: 21.5px;" class="col-md-1-1"><input
															type='text' class='form-control input-SmallText'
															id='msq0' name='msq0' 
															onkeypress='return validateNumbers(event)'></td>
														<td style="height: 21.5px;" class="col-md-1-1"><input
															type='text' class='form-control input-SmallText' id='md0'
															name='md0' readonly="true"
															onkeypress='return validateNumbers(event)'></td>

														<td style="height: 21.5px;" class="col-md-1-1 "><input
															type='text' class='form-control input-SmallText' id='mv0'
															name='mv0'  readonly="true"
															onkeypress='return validateNumbers(event)'></td>

														<td style="height: 21.5px;" class="col-md-1-1"><input
															type='text' class='form-control input-SmallText' id='mg0'
															name='mg0'  readonly="true"
															onkeypress='return validateNumbers(event)'></td>

														<td style="height: 21.5px;" class="col-md-1-1"><input
															type='text' class='form-control input-SmallText'
															id='mmk0' name='mmk0'  readonly="true"
															onblur="toCreateCashPaidDiv('RowCount','1')"><input
															type='hidden' class='form-control input-SmallText'
															style='margin-top: 8px;' id='id0'></td>
													</tr>
												</c:when>
												<c:when test="${slaveCount!=0}">
													<input type="hidden" id="cashPaidEntryVendor"
														value="${cashPaidEntry.vendorMaster.vendorId}">
													<script>
														var number = $(
																"#cashPaidEntryVendor")
																.val();
														displayBillRecords(number);
													</script>
												</c:when>
											</c:choose>
										</tbody>
									</table>
								</div>

								<div class="col-md-12-1" style="margin-top: 9px;">
									<div class="col-md-9-1" style="margin-top: 9px;">
										<div class="col-md-1-1" style="margin-top: 5px;">
											<b> Entry Made by </b>
										</div>
										<div class="col-md-6-1" style="margin-top: 9px;">
											<form:input path="cashPaidMadeBy" id="txtNameMadeBY"
												class="col-md-10-1 form-control input-SmallText" type="text"
												name="txtNameMadeBY" placeholder="Entry made by"
												 onblur="isAlphaWithSpace('txtNameMadeBY',0,100);"/>
											<br>
										</div>
									</div>
								</div>
							</div>
							<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
							<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
							<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>

						</form:form>
					</div>
				</div>
			</div>
			
			<input type="hidden" value="1" id="RowCount">
			<%@include file="Pharma_Footer.jsp"%></div>

		<input type='hidden' value='0' id='addRowCount' />


		<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
		<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>
	</section>
	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>