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
<title>Purchase Order | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<link
	href="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css"/>"
	rel="stylesheet" media="screen">
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!-- JQUERY -->
<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-jtemplates.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<!-- 	app_js -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_po.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxmenu.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/morphext.min.js"/>"></script>
<%-- <%@include file="pharma_header.jsp"%> --%>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_po.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>
</head>
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
	z-index: 100000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/pharma-resources/images/ajax_loader_blue_64.gif')
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
			App.setPage("Pharma_Purchase_Order");  //Set current page
			App.init(); //Initialise plugins and elements
		});
</script>
<script type="text/javascript">
	onload = function() {
		var inputs = [];
		getNextAutoIncrement();
		//if update request 
		if ($('#txtOrderNo').val() == "") {
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
					$('#txtOrderNo').val(r);
				}
			});
		}
		
		$('#txtPartyName').focus();
		
		/* $("#saveBtn").click(function(event) {

			$("#frmPurchaseOrderForm").submit();
			window.open("/EhatEnterprise/pharmacy/po/view-frm");

			reset();
			alertify.success("Record Saved Succesfully");
		}); */
		
		//return setValuesToAutocomplete(null);
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
	
	/* jQuery(document).ajaxStart(function() {
		
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		
	}); */

</script>
<script>
function validateData() 
{
	if($('#txtOrderNo').val()!=null && $('#txtOrderNo').val()!="")
		{ 	
		if($('#txtPartyName').val()!=null && $('#txtPartyName').val()!="")
		{ 	
		if($('#hiddenVendorId').val()!=null && $('#hiddenVendorId').val()!="" && $('#hiddenVendorId').val()!=0)
		   { 	
			if($('#txtOrdeDate').val()!=null && $('#txtOrdeDate').val()!="")
			   { 
				
					if($('#textProductName1').val()!=null && $('#textProductName1').val()!="")
					   { 
						if($('#hiddenPOId').val()!=null && $('#hiddenPOId').val()!="")
							{ 
								alert("Record Updated Successfully!");	
								$('#frmPurchaseOrderForm').submit();
								window.open("../../pharmacy/po/view-frm");
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
							    $('#frmPurchaseOrderForm').submit();
							    window.open("../../pharmacy/po/view-frm");
								}
								else
								{
									showAlert();
								} 	    
						    }
					}
					else {
						alert("Enter Product Name");
						 $('#textProductName1').focus();
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
				alert("Data not found");
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
	$('#textVat'+$('#hiddenCurrentRow').val()).val();
}
function showAlert()
{
	
	alert("Please Fill All the Details!");
}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
<body style="background: white ! important;">
	<section id="page">

		<c:set scope="session" value="${fn:length(po.ltPOslave)}"
			var="slaveCount"></c:set>
			
			

		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_Po_Product_PopUp.jsp"%>
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
											<li>Date :<%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="../../Dashboard.jsp">Home</a></li>
											<li><a
												href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
											<li>Purchase Order</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<a class="btn btn-xs btn-info"
													href="../../pharmacy/po/view">Back to List</a>
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
								<b id="title">Purchase Order</b>
							</div>
							<div class="row">
								<form:form commandName="po" id="frmPurchaseOrderForm"
									action="../../pharmacy/po/save" method="post">

									<!-- 									check data present or not in poMaster -->
									<%-- <c:choose>
										<c:when test="${not empty po}">
											<c:set value="" ></c:set>
										</c:when>
										
									</c:choose> --%>

									<div class="panel-body col-md-12-1">
										<div class="panel-body">
											<div id="purchaseOrder" class="col-md-4-1 center"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-5-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> PO No </b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="" type="text" id="txtOrderNo1"
																		readonly="true" name="txtOrderNo1"
																		class="form-control input-SmallText"
																		placeholder="Order No" required="true" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -11px; margin-left: 183px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input path="" type="text" id="txtOrderNo"
																		readonly="true" name="txtOrderNo1"
																		value="${po.poYear}"
																		class="form-control input-SmallText"
																		placeholder="Order No" required="true" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -11px; margin-left: 183px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>
															</c:choose>
														</div>
													</div>

													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Vou No </b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">
															<form:input path="podocId" type="text" id="txtOrderNo"
																readonly="true" name="txtOrderNo"
																class="form-control input-SmallText"
																placeholder="Vou No" required="true" />
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 183px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Vendor Name</b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">

															<form:hidden path="poId" id="hiddenPOId" />

															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:hidden path="vendorMaster.vendorId"
																		id="hiddenVendorId" value='0' />
																	<form:hidden path="vendoradd.vendorAddressId"
																		id="hiddenVendorAddId"
																		value="0" />
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:hidden path="vendorMaster.vendorId"
																		id="hiddenVendorId"
																		value="${po.vendorMaster.vendorId}" />
																		<form:hidden path="vendoradd.vendorAddressId"
																		id="hiddenVendorAddId"
																		value="${po.vendoradd.vendorAddressId}" />

																	<form:hidden path="poCreatedBy" id="hiddenCreatedBy"
																		value='${po.poCreatedBy}' />

																	<form:hidden path="ipAddress" id="hiddenIpAddress"
																		value='${po.ipAddress}' />
																</c:when>
															</c:choose>
															<form:hidden value="po" id="po" path="" />
															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input type="text" id='txtPartyName'
																		name='txtPartyName' placeholder="Vendor Name"
																		path="vendorMaster.vendorName"
																		class="ui-autocomplete-input form-control input-SmallText"
																		onblur="splitVendorContentPo($('#txtPartyName').val())" />
																	<!--  ,isAlphaWithSpace('searchBox',0,200) -->
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input type="text" id='txtPartyName'
																		name='txtPartyName' placeholder="Name"
																		path="vendorMaster.vendorName" readonly="true"
																		class="ui-autocomplete-input form-control input-SmallText"
																		value="${po.vendorMaster.vendorName}" />
																		
																		
																</c:when>
															</c:choose>
															<%-- <form:input path="vendorMaster.vendorName" type="text"
																id="txtPartyName" name="txtPartyName"
																class="form-control input-SmallText"
																placeholder=" Vendor Name"  required="true"
																onblur="splitVendorContentPo($('#txtPartyName').val())" /> --%>
															<div class='col-md-1-1 center'
																style='margin-top: -11px; margin-left: 183px; color: red;'>
																<b> *</b>
															</div>

															<!-- ,isAlphaWithSpace('txtPartyName',0,200); -->
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
																									url : "../../pharmacy/vendor/autoSuggestionVendor",
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
																													+ r[i].vendorId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
														</div>

													</div>
													
													<div class="col-md-12-1"
														style="margin-top: 9px; margin-bottom: 10px;">

														<div class="col-md-4-1" style="margin-top: 0px;">
															<b> State </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px; margin-left: 32px">
															<c:choose>
																<c:when test="${slaveCount ==0}">
																

																	<select id="vendorState" onclick="changeVendorAdd()" class="col-md-8-1">
																		<option value="${purchase.vendoradd.vendorAddressId}" selected>${purchase.vendoradd.state}</option>
																		
																	</select>
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<select id="vendorState" onclick="changeVendorAdd()" class="col-md-8-1">
																		<option value="${po.vendoradd.vendorAddressId}" selected>${po.vendoradd.state}</option>
																		
																	</select>
																</c:when>
															</c:choose>
															<!-- <div class='col-md-1-1 center'
																style='margin-top: -14px; margin-left: 130px; color: red;'>
																<b> *</b>
															</div> -->
														</div>
													</div>
												</div>

												<div class="col-md-6-1 " style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Order Date</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">

															<%-- <c:when test="${slaveCount ==0}">
																
															</c:when> --%>

															<c:choose>
																<c:when test="${slaveCount ==0}">
																	<form:input path="poDate" type="text" id="txtOrdeDate"
																		name="txtOrdeDate"
																		class="form-control input-SmallText" readonly="true"
																		placeholder="Order Date" required="true"
																		value="<%=todays_date%>"
																		onfocus="displayCalendar(document.getElementById('txtOrdeDate'),'dd/mm/yyyy',this)"
																		onfucsout="closeCalendar();" tabindex="-1" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -11px; margin-left: 304px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>
																<c:when test="${slaveCount !=0}">
																	<form:input path="poDate" type="text" id="txtOrdeDate"
																		name="txtOrdeDate"
																		class="form-control input-SmallText" readonly="true"
																		placeholder="Order Date" required="true"
																		onfocus="displayCalendar(document.getElementById('txtOrdeDate'),'dd/mm/yyyy',this)"
																		onfucsout="closeCalendar();" tabindex="-1" />
																	<div class='col-md-1-1 center'
																		style='margin-top: -11px; margin-left: 304px; color: red;'>
																		<b> *</b>
																	</div>
																</c:when>
															</c:choose>
														</div>
																
																
													</div>
													<%-- <div class="col-md-12-1 panel" style="margin-top: 9px;">
														<div class="col-md-12-1" style="margin-top: 0px;">
															Shortage Based
															<form:radiobutton path="poType" value="0"
																id="radioPurchaseShortage" checked="true"
																name="radioPurchase" />
															Sale Based
															<form:radiobutton path="poType" value="1"
																id="radioSaleBased" name="radioPurchase" />
															Shortage+SaleBased
															<form:radiobutton path="poType" value="2"
																id="radioShortageSale" name="radioPurchase" />
															Required Quantity
															<form:radiobutton path="poType" value="3"
																id="radioRequiredQuantity" name="radioPurchase" />
														</div>
														
													</div> --%>

													 <div class="form-group">
														<label for="product">Last Purchase From</label>
													</div> 
													 <div style="height: 100%; width: 100%; padding-left: 0px;"
														class="col-md-12-1">
														<table border="1" style="height: 100%; width: 100%;"
															class="table table-bordered table-striped table-condensed"
															id="ItemInfoTable">
															<thead>
																<tr>
																	<th style="height: 21.5px;" class="col-md-1-1 center"><div
																			class="TextFont">Party's Name</div></th>
																	<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																			class="TextFont">Qty</div></th>

																	<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																			class="TextFont">Scheme</div></th>

																	<th style="height: 21.5px;" class="col-md-1-1 center"><div
																			class="TextFont">MRP</div></th>

                                                                    <th style="height: 21.5px;" class="col-md-1-1 center"><div
																			class="TextFont">Pur.Rate</div></th>
																			
																  <th style="height: 21.5px;" class="col-md-1-1 center"><div
																			class="TextFont">Pur.Rate GST</div></th>
																			
																	<th style="height: 21.5px;" class=" col-md-1-1 center"><div
																			class="TextFont">T.rate</div></th>

																	
																</tr>
															</thead>

															<tbody
																style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;"
																id="">
																<tr>
																	<td><input type="text" tabindex="-1"
																		id="textLastPartyName"
																		class="form-control input-SmallText" readonly="readonly"></td>
																	<td><input type="text" tabindex="-1"
																		id="textLastQty" class="form-control input-SmallText" readonly="readonly"> </td>

																	<td><input type="text" tabindex="-1"
																		id="textLastSchm" class="form-control input-SmallText" readonly="readonly"></td>

																	<td><input type="text" tabindex="-1"
																		id="textLastMRP" class="form-control input-SmallText" readonly="readonly"></td>

																	

																	<td><input type="text" tabindex="-1"
																		id="textLastPurRate1"
																		class="form-control input-SmallText" readonly="readonly"></td>
																		
																	<td><input type="text" tabindex="-1"
																		id="textLastPurRate"
																		class="form-control input-SmallText" readonly="readonly"></td>
																		
																	<td><input type="text" tabindex="-1"
																		id="textLastTrate"
																		class="form-control input-SmallText" readonly="readonly"></td>
																</tr>
															</tbody>
														</table>
													</div> 
													
												</div>
												
												
											</div>


										</div>

									</div>

									<div class="divide-20"></div>

									<div id="HSTDiv"
										style="width: 100%; height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">
										<div class="col-md-12-1">
											<input type="button" value="-" class="btn btn-xs btn-success"
												style="margin: 7px; float: right" onclick="deleteRow();">
										</div>
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
															class='TextFont'>HSN</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>GST</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>IGST</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>CESS</div></th>
													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Amount</div></th>

													<th class=' col-md-1-1 center' style='height: 21.5px;'><div
															class='TextFont'>Select</div></th>

												</tr>
											</thead>


											<tbody id="DRRDiv"
												style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">

												<c:choose>
													<c:when test="${po.poProductCount>=1}">
														<c:forEach items="${po.ltPOslave}" var="row"
															varStatus="count">
															<tr id="remove${count.index+1}">
																<td><label class='input-SmallText'>${count.index+1}</label></td>
																<td><input type='hidden' id='hiddenCurrentRow'
																	value='${count.index+1}' /> <form:hidden
																		path="ltPOslave[${count.index}].poSlaveId" />
																		
																		
																		
																		<form:hidden
																		path="ltPOslave[${count.index}].productMaster.productId"
																		id="hiddenProductId${count.index+1}" /> <form:input
																		path="ltPOslave[${count.index }].productMaster.productName"
																		type='text' class='form-control input-SmallText'
																		id="textProductName${count.index+1 }"
																		autocomplete="off"
																		onkeypress="setValuesToAutocomplete(event,${count.index+1})"  /></td>
																		<!-- data-toggle="modal" data-target="#Po_Pop_Up" -->
																<td><form:input
																		path="ltPOslave[${count.index}].productMaster.productUnit"
																		type='text' class='form-control input-SmallText'
																		id="textUnit${count.index+1 }" readonly="true"
																		tabindex="-1" /></td>
																<td><form:input
																		path="ltPOslave[${count.index}].productMaster.packingMaster.packType"
																		type='text' class='form-control input-SmallText'
																		id="textPack${count.index+1 }" readonly="true"
																		tabindex="-1" /></td>
																<td><form:input
																		path="ltPOslave[${count.index}].productMaster.companyMaster.compName"
																		type='text' class='form-control input-SmallText'
																		id="textComp${count.index+1 }" readonly="true"
																		tabindex="-1" /></td>
																<td><form:input
																		path="ltPOslave[${count.index}].poSlaveMrp"
																		type='text' class='form-control input-SmallText'
																		id="textMRP${count.index+1 }" autocomplete="off"
																		onchange="isFloatingPoint('textMRP${count.index+1}');"
																		 /></td>
																<td><form:input
																		path="ltPOslave[${count.index}].poSlaveQty"
																		 type='text'
																		class='form-control input-SmallText' autocomplete="off"
																		id="textQty${count.index+1 }"  onkeyup="calculateAmt(${count.index+1 })"/></td>

																<td><form:input
																		path="ltPOslave[${count.index}].poSlaveScheme"
																		type='text' class='form-control input-SmallText'
																		 id="textScm${count.index+1 }" /></td>
																<td><form:input
																		path="ltPOslave[${count.index}].poSlaveRate"
																		type='text' class='form-control input-SmallText'
																		id="textPurRate${count.index+1 }"  autocomplete="off"
																		 onkeyup="calculateAmt(${count.index+1 })"/></td>

																<td><form:input
																		path="ltPOslave[${count.index}].hsn" type='text'
																		class='form-control input-SmallText'
																		id="txtHsn${count.index+1 }" readonly="true"
																		tabindex="-1" /></td>


																<td><form:input
																		path="ltPOslave[${count.index}].poSlaveVat"
																		type='text' class='form-control input-SmallText'
																		id="textVat${count.index+1}" readonly="true"
																		tabindex="-1" /></td>

																
																<td><form:input
																		path="ltPOslave[${count.index}].poIgst"
																		type='text' class='form-control input-SmallText'
																		id="txtIgst${count.index+1}" readonly="true"
																		tabindex="-1" /></td>

																
																<td><form:input
																		path="ltPOslave[${count.index}].poCess"
																		type='text' class='form-control input-SmallText'
																		id="txtCess${count.index+1}" readonly="true"
																		tabindex="-1" /></td>

																<td>
																
																 <form:input
																		type='text'
																		path="ltPOslave[${count.index}].poSlaveAmt"
																		readonly="true" class='form-control input-SmallText'
																		id="textAmount${count.index+1 }" tabindex="-1" />
																</td>

																<form:hidden
																	path="ltPOslave[${count.index}].productMaster.shelfMaster.shelfName"
																	id="textShelf${count.index+1 }" />

																<td><input type="checkbox" name="deleteGroup"
																	value="${count.index+1}"
																	id="deleteGroup${count.index+1}"></td>
															</tr>

														</c:forEach>
														<tr id="remove${slaveCount+1}">
															<td><label class='input-SmallText'>${slaveCount+1}</label></td>
															<td><input type='hidden' id='hiddenCurrentRow'
																value='${slaveCount+1}' /> <form:hidden
																	path="ltPOslave[${slaveCount}].poSlaveId" /> 
																	
																	<form:hidden
																	path="ltPOslave[${slaveCount}].productMaster.productId"
																	id="hiddenProductId${slaveCount+1}" /> <form:input
																	path="ltPOslave[${slaveCount}].productMaster.productName"
																	type='text' class='form-control input-SmallText'
																	id="textProductName${slaveCount+1}" 
																	 onkeypress="setValuesToAutocomplete(event,${slaveCount+1})"  autocomplete="off"/></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].productMaster.productUnit"
																	type='text' class='form-control input-SmallText'
																	id="textUnit${slaveCount+1}" readonly="true"
																	tabindex="-1" /></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].productMaster.packingMaster.packType"
																	type='text' class='form-control input-SmallText'
																	id="textPack${slaveCount+1}" readonly="true"
																	tabindex="-1" /></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].productMaster.companyMaster.compName"
																	type='text' class='form-control input-SmallText'
																	id="textComp${slaveCount+1}" readonly="true"
																	tabindex="-1" /></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveMrp" type='text'
																	class='form-control input-SmallText'
																	id="textMRP${slaveCount+1}"
																	onchange="isFloatingPoint('textMRP${slaveCount+1}');"
																	 autocomplete="off" /></td>
															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveQty" type='text'
																	class='form-control input-SmallText' autocomplete="off"
																	id="textQty${slaveCount+1}"  onkeyup="calculateAmt(${slaveCount+1 })"/></td>
															
															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveScheme"
																	type='text' class='form-control input-SmallText'
																	 id="textScm${slaveCount+1}" /></td>
															
															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveRate" type='text'
																	class='form-control input-SmallText'
																	id="textPurRate${slaveCount+1}" 
																	 onkeyup="calculateAmt(${count.index+1 })" autocomplete="off" /></td>

															<td><form:input path="ltPOslave[${slaveCount}].hsn"
																	type='text' class='form-control input-SmallText'
																	id="txtHsn${slaveCount+1 }" readonly="true"
																	tabindex="-1" /></td>


															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveVat" type='text'
																	class='form-control input-SmallText'
																	id="textVat${slaveCount+1}" readonly="true"
																	tabindex="-1" /></td>


	                                                       <td><form:input path="ltPOslave[${slaveCount}].poIgst"
																	type='text' class='form-control input-SmallText'
																	id="txtIgst${slaveCount+1 }" readonly="true"
																	tabindex="-1" /></td>
	                                                       
	                                                       <td><form:input path="ltPOslave[${slaveCount}].poCess"
																	type='text' class='form-control input-SmallText'
																	id="txtCess${slaveCount+1 }" readonly="true"
																	tabindex="-1" /></td>


															<td>
															<form:input type='text' readonly="true"
																	path="ltPOslave[${slaveCount}].poSlaveAmt"
																	class='form-control input-SmallText'
																	id="textAmount${slaveCount+1}" tabindex="-1" />
															</td>

															<form:hidden
																path="ltPOslave[${slaveCount}].productMaster.shelfMaster.shelfName"
																id="textShelf${slaveCount+1}" />

															<td><input type="checkbox" name="deleteGroup"
																value="${slaveCount+1}" id="deleteGroup${slaveCount+1}"></td>
														</tr>
													</c:when>

													<c:otherwise>
														<tr id="remove1">
															<td><label class='input-SmallText'>1</label></td>
															<td><input type='hidden' id='hiddenCurrentRow'
																value='1' /> <form:hidden
																	path="ltPOslave[0].productMaster.productId"
																	id="hiddenProductId1" /> <form:input
																	path="ltPOslave[0].productMaster.productName"
																	type='text' class='form-control input-SmallText'
																	id="textProductName1" autocomplete="off"  onkeypress="setValuesToAutocomplete(event,1)"
																	 /></td>
																	<!-- data-toggle="modal" ${count.index+1}
																	data-target="#Po_Pop_Up"onclick="loadPopUp(1,${count.index+1})" -->
															<td><form:input
																	path="ltPOslave[0].productMaster.productUnit"
																	type='text' class='form-control input-SmallText'
																	id="textUnit1" readonly="true" tabindex="-1" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.packingMaster.packType"
																	type='text' class='form-control input-SmallText'
																	id="textPack1" readonly="true" tabindex="-1" /></td>
															<td><form:input
																	path="ltPOslave[0].productMaster.companyMaster.compName"
																	type='text' class='form-control input-SmallText'
																	id="textComp1" readonly="true" tabindex="-1" /></td>


															<td>
																<%-- <c:set var="mrp"
																	value="${ltPOslave[0].productMaster.productLastMRP}"></c:set> --%>
																<form:input path="ltPOslave[0].poSlaveMrp"
																	onchange="isFloatingPoint('textMRP1');" type='text'
																	class='form-control input-SmallText' id="textMRP1"
																	 autocomplete="off"/>
															</td>

															<td><form:input path="ltPOslave[0].poSlaveQty"
																	 type='text'
																	class='form-control input-SmallText'  id="textQty1" onkeyup="calculateAmt(1)" autocomplete="off"/></td>
															
															<td><form:input path="ltPOslave[0].poSlaveScheme"
																	type='text' class='form-control input-SmallText'
																	 id="textScm1" /></td>
															
															<td><form:input path="ltPOslave[0].poSlaveRate"
																	type='text' class='form-control input-SmallText'
																	id="textPurRate1" onkeyup="calculateAmt(1)"  autocomplete="off"/></td>



															<td><form:input path="ltPOslave[0].hsn" type='text'
																	class='form-control input-SmallText' id="txtHsn1"
																	readonly="true" tabindex="-1" /></td>

													
															<td><form:input path="ltPOslave[0].poSlaveVat"
																	type='text' class='form-control input-SmallText'
																	id="textVat1" readonly="true" tabindex="-1" /></td>

															<td><form:input path="ltPOslave[0].poIgst" type='text'
																	class='form-control input-SmallText' id="txtIgst1"
																	readonly="true"  /></td>


															<td><form:input path="ltPOslave[0].poCess" type='text'
																	class='form-control input-SmallText' id="txtCess1"
																	readonly="true" tabindex="-1" /></td>
														
														
															<td><form:input type='text' readonly="true"
																	path="ltPOslave[0].poSlaveAmt"
																	class='form-control input-SmallText'  id="textAmount1"
																	tabindex="-1"  /></td>

															<form:hidden
																path="ltPOslave[0].productMaster.shelfMaster.shelfName"
																id="textShelf1" />

															<td style="display: none;"><input name="clStk"
																type="text" class="form-control input-SmallText"
																id="textClStk1" readonly></td>

															<td><input type="checkbox" name="deleteGroup"
																value="1" id="deleteGroup1"></td>

														</tr>

													</c:otherwise>
												</c:choose>

											</tbody>
										</table>
									</div>
									<div class="divide-20"></div>
									<div id="last" class="col-md-12-1 panel-body"
										style="margin-top: -24px;">
										<div class="col-md-8-1" style="margin-top: 0px;">
											<div class="col-md-12-1" style="margin-top: 9px;">
												<div class="col-md-6-1 ">
													<b>Remark</b>
												</div>
												<div class="col-md-7-1 " style="margin-top: 9px;">
													<form:textarea path="poRemark" name="textSuppliedBy"
														placeholder="Remark" class="col-md-7-1"></form:textarea>
												</div>

											</div>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<div id="last" class="col-md-12-1 " style="margin-top: 21px;">
												<div class="col-md-2-1">
													<b>Total GST</b>
												</div>
												<div class="col-md-3-1 ">

													<c:choose>
														<c:when test="${slaveCount ==0}">
															<form:input type="text" id='textVatTotal'
																name='textVatTotal' placeholder="Total Vat"
																path="poTotalVat" value='0'
																class="ui-autocomplete-input form-control input-SmallText" />

														</c:when>
														<c:when test="${slaveCount !=0}">
															<form:input type="text" id='textVatTotal'
																name='textVatTotal' placeholder="Name" path="poTotalVat"
																readonly="true"
																class="ui-autocomplete-input form-control input-SmallText"
																value="${poTotalVat}" />
														</c:when>
													</c:choose>

												</div>

											</div>
										</div>
										
										
										
										<div class="col-md-4-1" style="margin-top: 0px;">
											<div id="" class="col-md-12-1 " style="margin-top: 19px;">
												<div class="col-md-6-1 " style="margin-top: -9px;">
													<div class="col-md-2-1 "
														style="margin-top: 6px; margin-left: 19px;">
														<b>Total</b>
													</div>
													<div class="col-md-7-1 "
														style="margin-top: 9px; margin-left: 12px;">
														<form:input path="poTotalAmt" type="text" id="txtTotal"
															class="col-md-7-1" readonly="true" value=""
															placeholder="Total" />
													</div>
												</div>
												<div class="col-md-6-1 "
													style="margin-top: -10px; margin-left: -12px;">
													<div class="col-md-2-1 "
														style="margin-top: 7px; margin-left: 13px;">
														<b>Count</b>
													</div>
													<div class="col-md-5-1 "
														style="margin-top: 10px; margin-left: 19px">
														<form:input path="poProductCount" type="text"
															id="txtCount" class="col-md-7-1" readonly="true" value=""
															placeholder="Count" />
													</div>
												</div>
											</div>
										</div>
										
										<div class="col-md-4-1" style="margin-top: 0px; float: right;">
											<div id="" class="col-md-12-1 " style="margin-top: 19px;">
												<div class="col-md-2-1 ">
													<b>Net Total</b>
												</div>
												<div class="col-md-3-1 ">

													<c:choose>
														<c:when test="${slaveCount ==0}">
															<form:input type="text" id='textNetTotal'
																name='textNetTotal' placeholder="Net total"
																path="poNetTotal" value='0'
																class="ui-autocomplete-input form-control input-SmallText" />

														</c:when>
														<c:when test="${slaveCount !=0}">
															<form:input type="text" id='textNetTotal'
																name='textNetTotal' placeholder="Net total"
																path="poNetTotal" readonly="true"
																class="ui-autocomplete-input form-control input-SmallText"
																value="${poNetTotal}" />
														</c:when>
													</c:choose>

												</div>
											</div>
										</div>
									</div>
									<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
								</form:form>

							</div>
						</div>
					</div>
					<input type='hidden' value='1' id='addRowCount' />
					<c:choose>
						<c:when test="${slaveCount ==0}">
							<input type="hidden" value="1" id="RowCount">
						</c:when>
						<c:when test="${slaveCount !=0}">
							<input type="hidden" value="${slaveCount+1}" id="RowCount">
						</c:when>
					</c:choose><%@include file="Pharma_Footer.jsp"%></div>
			</div>

		</div>

		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
       <input type="hidden" id="stateIds" value="<%=session.getAttribute("hospStateId")%>">

	</section>
</body>
</html>