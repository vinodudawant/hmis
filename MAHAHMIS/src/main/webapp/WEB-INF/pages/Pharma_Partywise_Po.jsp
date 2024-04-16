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
<meta name="author" content="">
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
<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- 	app_js -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Partywise_Po.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>


</head>
<script>
function reset () {
	$("#toggleCSS").attr("href", "<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>");
	alertify.set({
		notifier:{
	        // auto-dismiss wait time (in seconds)  
	        delay:5,
	        // default position
	        position:'top-right'
	    },	
	labels : {
	ok     : "OK",
	cancel : "Cancel"
	
	},
	delay : 5000,
	buttonReverse : false,
	buttonFocus   : "ok"
	
	});
	
}
</script>
<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
		});
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
	</script>
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
		url('/EhatEnterprise/pharmacy/resources/images/ajax_loader_blue_64.gif')
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

<script type="text/javascript">
	onload = function() {
		var inputs = [];
		$('#NewPartywisePoDiv').hide();
		//if update request 
		if ($('#txtOrderNo').val() == "") {
			//doc id 1 = purchase order
			inputs.push('docId=2');

			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/common/getDocNo",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$('#txtOrderNo').val(r);
				}
			});
		}
		$('#txtPartyName').focus();
		return setValuesToAutocomplete(null);
	};

	
	shortcut.add("Ctrl+s",function() {
		validateData();
	});
	
	shortcut.add("Ctrl+l",function() {
		backToList('po');
	});
	
	shortcut.add("Ctrl+w",function() {
		removeSlaveFocus('frmPurchaseOrderForm');
	});
	
	

</script>
<script>
function validateData() 
{
	if($('#txtOrderNo').val()!=null && $('#txtOrderNo').val()!="")
		{ 	
		if($('#txtPartyName').val()!=null && $('#txtPartyName').val()!="")
		{ 	
		if($('#hiddenVendorId').val()!=null && $('#hiddenVendorId').val()!=""  && $('#hiddenVendorId').val()!=0)
		   { 	
			if($('#txtOrdeDate').val()!=null && $('#txtOrdeDate').val()!="")
			   { 
				if($('#txtTotal').val()!=null && $('#txtTotal').val()!="" && $('#txtTotal').val()!=0)
				   { 	 
						if($('#hiddenPOId').val()!=null && $('#hiddenPOId').val()!="")
							{ 
								alert("Record Updated Successfully!");	
								$('#frmPartywisePurchaseOrderForm').submit();
								window.open("/EhatEnterprise/pharmacy/partywisePo/view-frm");
							 }
							else
							{  
								alert("Record Saved Successfully!");
							    $('#frmPartywisePurchaseOrderForm').submit();
							    window.open("/EhatEnterprise/pharmacy/partywisePo/view-frm");
								 	    
						    }
					}
							
				else
				  {
					alert("Select product name");
					 $('#txtTotal').focus();
				  }	
				}
			
				else
				  {
					alert("Select date");
					 $('#txtOrdeDate').focus();
				  }	
				}
			
			else
			  {
				alert("record not found");
				 $('#txtPartyName').val('');
				 $('#txtPartyName').focus();
			  }	
		   }
		else
		  {
			alert("Enter Vendor Name");
			 $('#txtPartyName').val('');
			 $('#txtPartyName').focus();
		  }	
		
	}
	else
	  {
		alert("Enter Order No");
		 $('#txtOrderNo').focus();
	  }	
	
}

</script>
<%
	java.util.Calendar currentDate = java.util.Calendar
					.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					"dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
%>
<body style="background: white ! important;">
	<section id="page">

		<c:set scope="session" value="${fn:length(partywisePo.ltPOslave)}"
			var="slaveCount"></c:set>

		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_Partywise_Po_Product_PopUp.jsp"%>
			<%@include file="HelpMenu.jsp"%>


			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="/EhatEnterprise/Dashboard.jsp">Home</a></li>
											<li><a
												href="/EhatEnterprise/pharmacy/pharmacy/transaction">Pharmacy</a></li>
											<li>Partywise Purchase Order</li>
											<!-- 	<li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<a class="btn btn-xs btn-info"
													href="/EhatEnterprise/pharmacy/partywisePo/view">Back
													to List</a>
												<button class="btn btn-xs btn-success" type="button"
													id="saveBtn" onclick="validateData();">Save and
													Print(Ctrl+S)</button>


												<!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> -->
											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->
							<div id="SearchContent" class="col-md-12-1"></div>
							<!-- <div class="divide-40"></div> -->
							<div class="col-md-12-1">
								<b id="title">Partywise Purchase Order</b>
							</div>
							<div class="row">
								<form:form commandName="partywisePo"
									id="frmPartywisePurchaseOrderForm"
									action="/EhatEnterprise/pharmacy/partywisePo/save"
									method="post">


									<div class="panel-body col-md-12-1">
										<div class="panel-body">
											<div id="purchaseOrder" class="col-md-4-1 center"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-5-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Order No </b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">
															<form:input path="podocId" type="text" id="txtOrderNo"
																readonly="true" name="txtOrderNo"
																class="form-control input-SmallText"
																placeholder="Order No" maxlength="10" required="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 183px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b>Vendor Name</b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">

															<form:hidden path="poId" id="hiddenPOId" />
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:hidden path="vendorMaster.vendorId"
																		id="hiddenVendorId" value='0' />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:hidden path="vendorMaster.vendorId"
																		id="hiddenVendorId"
																		value="${po.vendorMaster.vendorId}" />
																</c:when>
															</c:choose>
															<form:hidden value="partywisePo" id="partywisePo" path="" />
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input type="text" id='txtPartyName'
																		name='txtPartyName' placeholder=" Vendor Name"
																		path="vendorMaster.vendorName"
																		class="ui-autocomplete-input form-control input-SmallText"
																		onblur="splitVendorContents($('#txtPartyName').val())" />
																	<!--  ,isAlphaWithSpace('searchBox',0,200) -->
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input type="text" id='txtPartyName'
																		name='txtPartyName' placeholder=" Vendor Name"
																		path="vendorMaster.vendorName" readonly="true"
																		class="ui-autocomplete-input form-control input-SmallText"
																		value="${po.vendorMaster.vendorName}" />

																	<form:hidden path="poCreatedBy" id="hiddenCreatedBy"
																		value='${po.poCreatedBy}' />

																	<form:hidden path="ipAddress" id="hiddenIpAddress"
																		value='${po.ipAddress}' />
																</c:when>
															</c:choose>

															<%-- 	<form:input path="vendorMaster.vendorName" type="text"
																id="txtPartyName" name="txtPartyName"
																class="form-control input-SmallText"
																placeholder=" Vendor Name" maxlength="25" required="true"
																onblur="splitVendorContents($('#txtPartyName').val())" />
 --%>

															<script type="text/javascript">
																$(
																		"#txtPartyName")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#txtPartyName")
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
																									url : "/EhatEnterprise/pharmacy/vendor/autoSuggestionVendor",
																									timeout : 1000 * 60 * 5,
																									catche : false,
																									error : function() {
																										alert('error');
																									},
																									success : function(
																											r) {
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
																style='margin-top: -11px; margin-left: 183px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>


													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Address </b>
														</div>
														<div class="col-md-5-1" style="margin-top: -1px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:textarea path="vendorMaster.vendorAddress"
																		id="txtAddress" disabled="true" name="txtAddress"
																		class="form-control input-SmallText"
																		placeholder="Address" maxlength="50" required="true" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:textarea path="vendorMaster.vendorAddress"
																		id="txtAddress" disabled="true" name="txtAddress"
																		class="form-control input-SmallText"
																		value="${po.vendorMaster.vendorName}"
																		placeholder="Address" maxlength="50" required="true" />
																</c:when>
															</c:choose>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> phone </b>
														</div>
														<div class="col-md-5-1"
															style="margin-top: 0px; margin-bottom: 9px;">
															<form:input path="vendorMaster.vendorMobileNumber"
																type="text" id="txtPhone" disabled="true"
																name="txtPhone" class="form-control input-SmallText"
																placeholder="Phone" maxlength="10" required="true" />
														</div>

													</div>
												</div>

												<div class="col-md-6-1 " style="margin-top: 9px;">
                                                       <div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Order Date</b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="poDate" type="text" id="txtOrdeDate"
																		name="txtOrdeDate"
																		class="form-control input-SmallText" readonly="true"
																		placeholder="Order Date" required="true"
																		value="<%=todays_date%>"
																		onfocus="displayCalendar(document.getElementById('txtOrdeDate'),'dd/mm/yyyy',this)"
																		onfucsout="closeCalendar();" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:textarea path="poYear"
																		id="txtOrdeDate" disabled="true" name="txtOrdeDate"
																		class="form-control input-SmallText"
																		value="${po.poYear}"
																		placeholder="Order Date" maxlength="50" required="true" />
																</c:when>
															</c:choose>
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 304px; color: red;'>
																<b> *</b>
															</div>
														</div>

													</div>
													<div class="col-md-12-1 panel" style="margin-top: 9px;">
														<div class="col-md-12-1" style="margin-top: 0px;">
																<%-- <div class="col-md-6-1 ">
																<b>Show Previous Data</b>
															</div>
														<div class="col-md-6-1 "
																style="margin-top: 0px; margin-left: 9px">
																<form:radiobutton path="poType" value="1" id="radioYes"
																	checked="true" name="radioYes" onclick="changeFocus();" />
																Yes
																<form:radiobutton path="poType" value="2" id="radioNo"
																	name="radioNo" onclick="changeFocus();" />
																No
															</div> --%>
														</div>

														<!-- </div> -->
													</div>
													


												</div>
											</div>


										</div>

									</div>

									<div class="divide-20"></div>

									<div id="HSTDiv"
										style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
										<table id="ItemInfoTable" cellpadding="0" cellspacing="0"
											border="1"
											class="table table-bordered table-striped table-condensed">
											<thead>
												<tr>
													<th class="col-md-1-1 center">Sr.</th>
													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Product Name</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Unit</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Pack</div></th>

													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Comp</div></th>

													<th class='col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>MRP</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Qty</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Scm</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Pur.Rate</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Amount</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Total Stock</div></th>

													<!--   <th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Select</div></th> -->

												</tr>
											</thead>


											<tbody id="PartywisePoDiv"
												style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">

												<c:choose>
													<c:when test="${slaveCount==0}">
														<%-- <tr>
															
															<td><label class='input-SmallText'>1</label></td>
															<td>
																<input type='hidden' id='hiddenCurrentRow'
																value='1' /> <form:hidden
																	path="ltPOslave[0].productMaster.productId"
																	id="hiddenProductId1" /> <form:input
																	path="ltPOslave[0].productMaster.productName"
																	type='text' class='form-control input-SmallText'
																	id="textProductName1" data-toggle="modal"
																	data-target="#Partywise_Po_Pop_Up"
																	onkeypress="loadPopUp(${count.index+1})" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.productUnit"
																	type='text' class='form-control input-SmallText'
																	id="textUnit1" readonly="true" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.packingMaster.packType"
																	type='text' class='form-control input-SmallText'
																	id="textPack1" readonly="true" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.companyMaster.compName"
																	type='text' class='form-control input-SmallText'
																	id="textComp1" readonly="true" /></td>

															<td><form:input path="ltPOslave[0].poSlaveMrp"
																	type='text' class='form-control input-SmallText'
																	id="textMRP1" readonly="true" /></td>

															<td><form:input path="ltPOslave[0].poSlaveQty"
																	type='text' class='form-control input-SmallText'
																	id="textQty1" /></td>

															<td><form:input path="ltPOslave[0].poSlaveScheme"
																	type='text' class='form-control input-SmallText'
																	id="textScm1" /></td>

															<td><form:input path="ltPOslave[0].poSlaveRate"
																	type='text' class='form-control input-SmallText'
																	id="textPurRate1" readonly="true" /></td>

															<td><form:input type='text'
																	path="ltPOslave[0].poSlaveAmt"
																	class='form-control input-SmallText' id="textAmount1" />

															</td>


															<td style='display: none;'><input name="shelf"
																type="text" class="form-control input-SmallText"
																id="textShelf1"></td>

															<td style="display: none;"><input name="clStk"
																type="text" class="form-control input-SmallText"
																id="textClStk1"></td>

														</tr> --%>
													</c:when>
													<%-- <c:when test="${slaveCount!=0}">
													<input type="hidden" id="partywisePoVendor"
														value="${partywisePo.vendorMaster.vendorId}">
													<script>
														var number = $(
																"#partywisePoVendor")
																.val();
														displayPartywisePoRecords(number);
													</script>
												</c:when> --%>
													<c:when test="${slaveCount !=0}">
														<c:forEach items="${partywisePo.ltPOslave}" var="row"
															varStatus="count">
															<tr>
																<td><label class='input-SmallText'>${(count.index)+1}</label>
																	<input type='hidden' id='hiddenCurrentRow'
																	value='${count.index+1}' /></td>

																<td><form:hidden id="purSlaveId${count.index+1}"
																		path="ltPOslave[${(count.index)}].poSlaveId" /> <form:hidden
																		path="ltPOslave[${(count.index)}].productMaster.productId"
																		id="hiddenProductId${count.index+1 }" /> <form:input
																		path="ltPOslave[${(count.index)}].productMaster.productName"
																		type='text' class='form-control input-SmallText'
																		id="particulars${count.index+1 }" data-toggle="modal"
																		data-target="#Partywise_Po_Pop_Up"
																		onclick="loadPopUp(${count.index+1})" /></td>
																<td><form:input
																		path="ltPOslave[${(count.index)}].productMaster.productUnit"
																		type='text' class='form-control input-SmallText'
																		id="txtUnit${count.index+1 }" readonly="true" /></td>
																<td><form:input
																		path="ltPOslave[${(count.index)}].productMaster.packingMaster.packType"
																		type='text' class='form-control input-SmallText'
																		id="txtPack${count.index+1 }" readonly="true" /></td>
																<td><form:input
																		path="ltPOslave[${(count.index)}].productMaster.companyMaster.compName"
																		type='text' class='form-control input-SmallText'
																		id="txtComp${count.index+1 }" readonly="true" /></td>

																<td><form:input
																		path="ltPOslave[${(count.index)}].poSlaveMrp"
																		type='text' class='form-control input-SmallText'
																		id="textMRP${count.index+1 }" readonly="true" /></td>

																<td><form:input
																		path="ltPOslave[${(count.index)}].poSlaveQty"
																		type='text' class='form-control input-SmallText'
																		id="txtQty${count.index+1 }" readonly="true" /></td>

																<td><form:input
																		path="ltPOslave[${(count.index)}].poSlaveScheme"
																		type='text' class='form-control input-SmallText'
																		id="txtScheme${count.index+1 }" readonly="true" /></td>

																<td><form:input
																		path="ltPOslave[${(count.index)}].poSlaveRate"
																		type='text' class='form-control input-SmallText'
																		id="txtPurRate${count.index+1 }" readonly="true" /></td>

																<td><form:input type='text'
																		path="ltPOslave[${(count.index)}].poSlaveAmt"
																		class='form-control input-SmallText'
																		id="billAmt${count.index+1}" readonly="true" /></td>

																<td><form:input type='text'
																		path="ltPOslave[${(count.index)}].totalstockQty"
																		class='form-control input-SmallText'
																		id="textStock${count.index+1}" readonly="true" /></td>

																<%-- <td class='col-md-1' style='height: 21.5px;'><input
																	type='checkbox' id='selected${count.index+1}'
																	name='selectedValues'
																	onclick='calculate1("${count.index+1}")'
																	value='${count.index+1}'></td> --%>


																<c:set var="purchaseId"
																	value="${row.partywisePoPurId}"></c:set>

																<c:choose>
																	<c:when test="${not empty purchaseId }">
																		<%-- <form:input type='hidden' id='purchaseMaster${count.index+1}' path='ltPOslave[${(count.index)}].poPurchaseId' value=" " /> --%>
																	<%-- 	<form:input type='hidden'
																			id='purchaseMaster${count.index+1}'
																			path='ltPOslave[${(count.index)}].purchaseMaster.purId' /> --%>
																	</c:when>
																	<c:otherwise>

																	</c:otherwise>
																</c:choose>



																<%-- <c:otherwise>
																	<form:input type='hidden' id='purchaseMaster${count.index+1}' path='ltPOslave[${(count.index)}].purchaseMaster.purId'  />
																</c:otherwise> --%>


																<%-- <form:input type='hidden' id='purchaseSlave${count.index+1}' path='ltPOslave[${(count.index)}].purSlaveId'  /> --%>

																<td style='display: none;'><input name="shelf"
																	type="text" class="form-control input-SmallText"
																	id="textShelf${count.index+1 }"></td>

																<td style="display: none;"><input name="clStk"
																	type="text" class="form-control input-SmallText"
																	id="textClStk${count.index+1 }"></td>

															</tr>
														</c:forEach>
														<tr>
															<td><label class='input-SmallText'>${slaveCount+1}</label>
																<input type='hidden' id='hiddenCurrentRow'
																value='${slaveCount+1}' /></td>

															<td><form:hidden
																	path="ltPOslave[${slaveCount}].productMaster.productId"
																	id="hiddenProductId${slaveCount+1}" /> <form:input
																	path="ltPOslave[${slaveCount}].productMaster.productName"
																	type='text' class='form-control input-SmallText'
																	id="particulars${slaveCount+1}" data-toggle="modal"
																	data-target="#Partywise_Po_Pop_Up"
																	onclick="loadPopUp(${slaveCount+1})" /></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].productMaster.productUnit"
																	type='text' class='form-control input-SmallText'
																	id="txtUnit${slaveCount+1}" readonly="true" /></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].productMaster.packingMaster.packType"
																	type='text' class='form-control input-SmallText'
																	id="txtPack${slaveCount+1}" readonly="true" /></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].productMaster.companyMaster.compName"
																	type='text' class='form-control input-SmallText'
																	id="txtComp${slaveCount+1}" readonly="true" /></td>

															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveMrp" type='text'
																	class='form-control input-SmallText'
																	id="textMRP${slaveCount+1}" readonly="true" /></td>

															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveQty" type='text'
																	class='form-control input-SmallText'
																	id="txtQty${slaveCount+1}" readonly="true" /></td>

															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveScheme"
																	type='text' class='form-control input-SmallText'
																	id="txtScheme${slaveCount+1}" readonly="true" /></td>

															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveRate" type='text'
																	class='form-control input-SmallText'
																	id="txtPurRate${slaveCount+1}" readonly="true" /></td>

															<td><form:input type='text'
																	path="ltPOslave[${slaveCount}].poSlaveAmt"
																	class='form-control input-SmallText'
																	id="billAmt${slaveCount+1}" readonly="true" /></td>

															<td><form:input type='text'
																	path="ltPOslave[${slaveCount}].totalstockQty"
																	class='form-control input-SmallText'
																	id="textStock${slaveCount+1}" readonly="true" /></td>

															<%-- <form:input type='hidden' id='purchaseMaster${slaveCount+1}' path='ltPOslave[${slaveCount}].purchaseMaster.purId'  value="0"/> --%>

															<%-- <td class='col-md-1' style='height: 21.5px;'><input
															type='checkbox' id='selected${slaveCount+1}'
															name='selectedValues'
															onclick='calculate1("${slaveCount+1}")'
															value='${slaveCount+1}'></td> --%>

															<td style='display: none;'><input name="shelf"
																type="text" class="form-control input-SmallText"
																id="textShelf${slaveCount+1}"></td>

															<td style="display: none;"><input name="clStk"
																type="text" class="form-control input-SmallText"
																id="textClStk${slaveCount+1}"></td>

														</tr>
													</c:when>



												</c:choose>


											</tbody>
											<%-- <tbody id="NewPartywisePoDiv"
												style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
												<tr>
													<td><label class='input-SmallText'>1</label></td>
													<td><input type='hidden' id='hiddenCurrentRow'
														value='1' /> <form:hidden
															path="ltPOslave[0].productMaster.productId"
															id="hiddenProductId1" /> <form:input
															path="ltPOslave[0].productMaster.productName" type='text'
															class='form-control input-SmallText'
															id="textProductName1" data-toggle="modal"
															data-target="#Partywise_Po_Pop_Up"
															onkeypress="loadPopUp(1)" /></td>
													<td><form:input
															path="ltPOslave[0].productMaster.productUnit" type='text'
															class='form-control input-SmallText' id="textUnit1"
															readonly="true" /></td>
													<td><form:input
															path="ltPOslave[0].productMaster.packingMaster.packType"
															type='text' class='form-control input-SmallText'
															id="textPack1" readonly="true" /></td>
													<td><form:input
															path="ltPOslave[0].productMaster.companyMaster.compName"
															type='text' class='form-control input-SmallText'
															id="textComp1" readonly="true" /></td>
													<td><form:input path="ltPOslave[0].poSlaveMrp"
															type='text' class='form-control input-SmallText'
															id="textMRP1" readonly="true" /></td>

													<td><form:input path="ltPOslave[0].poSlaveQty"
															type='text' class='form-control input-SmallText'
															id="textQty1" /></td>

													<td><form:input path="ltPOslave[0].poSlaveScheme"
															type='text' class='form-control input-SmallText'
															id="textScm1" /></td>
													<td><form:input path="ltPOslave[0].poSlaveRate"
															type='text' class='form-control input-SmallText'
															id="textPurRate1" readonly="true" /></td>

													<td><form:input type='text'
															path="ltPOslave[0].poSlaveAmt"
															class='form-control input-SmallText' id="textAmount1" /></td>

													<td style='display: none;'><input name="shelf"
														type="text" class="form-control input-SmallText"
														id="textShelf1"></td>

													<td style="display: none;"><input name="clStk"
														type="text" class="form-control input-SmallText"
														id="textClStk1"></td>

												</tr>
												
												<tr>
															<td><label class='input-SmallText'>1</label></td>
															<td><input type='hidden' id='hiddenCurrentRow'
																value='1' /> <form:hidden
																	path="ltPOslave[0].productMaster.productId"
																	id="hiddenProductId1" /> <form:input
																	path="ltPOslave[0].productMaster.productName"
																	type='text' class='form-control input-SmallText'
																	id="textProductName1" data-toggle="modal"
																	data-target="#Partywise_Po_Pop_Up"
																	onkeypress="loadPopUp(${count.index+1})" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.productUnit"
																	type='text' class='form-control input-SmallText'
																	id="textUnit1" readonly="true" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.packingMaster.packType"
																	type='text' class='form-control input-SmallText'
																	id="textPack1" readonly="true" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.companyMaster.compName"
																	type='text' class='form-control input-SmallText'
																	id="textComp1" readonly="true" /></td>

															<td><form:input path="ltPOslave[0].poSlaveMrp"
																	type='text' class='form-control input-SmallText'
																	id="textMRP1" readonly="true" /></td>

															<td><form:input path="ltPOslave[0].poSlaveQty"
																	type='text' class='form-control input-SmallText'
																	id="textQty1" /></td>

															<td><form:input path="ltPOslave[0].poSlaveScheme"
																	type='text' class='form-control input-SmallText'
																	id="textScm1" /></td>

															<td><form:input path="ltPOslave[0].poSlaveRate"
																	type='text' class='form-control input-SmallText'
																	id="textPurRate1" readonly="true" /></td>

															<td><form:input type='text'
																	path="ltPOslave[0].poSlaveAmt"
																	class='form-control input-SmallText' id="billAmt1" />

																<!-- <input type="hidden" name="no" id="simplePo" value="0"> -->
															</td>


															<td style='display: none;'><input name="shelf"
																type="text" class="form-control input-SmallText"
																id="textShelf1"></td>

															<td style="display: none;"><input name="clStk"
																type="text" class="form-control input-SmallText"
																id="textClStk1"></td>

														</tr>


											</tbody> --%>
										</table>
									</div>
									<div class="divide-20"></div>
									<div id="last" class="col-md-12-1 "
										style="margin-top: 9px; margin-left: 900px;">

										<div class="col-md-8-1 " style="margin-top: 9px;">
											<div class="col-md-1-1 " style="margin-top: 9px;">
												<b>Total</b>
											</div>
											<div class="col-md-3-1 " style="margin-top: 9px;">
												<form:input path="poTotalAmt" type="text" id="txtTotal"
													class="col-md-7-1" readonly="true" value=""
													placeholder="Total" />
											</div>
										</div>
									</div>
									<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
								</form:form>

							</div>
						</div>
					</div>
					<c:choose>
						<c:when test="${slaveCount ==0}">
							<input type="hidden" value="1" id="RowCount">
						</c:when>
						<c:when test="${slaveCount !=0}">
							<input type="hidden" value="${slaveCount+1}" id="RowCount">
						</c:when>
					</c:choose>

					<%@include file="Pharma_Footer.jsp"%></div>
				<input type='hidden' value='1' id='addRowCount' />

			</div>

		</div>

		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>


	</section>
</body>
</html>