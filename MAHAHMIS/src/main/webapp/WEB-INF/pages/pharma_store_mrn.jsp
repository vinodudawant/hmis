<%@page import="java.text.SimpleDateFormat"%>
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
<title>Store Management | Pharmacy</title>
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


<!-- Alertify -->
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
	
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	

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

<!-- 	app_js -->
<%-- <script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_store_mrn.js"/>"></script> --%>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.base.css"/>">

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/js/jqx-widgets/jqx.energyblue.css"/>"
	type="text/css" />

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
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxlistbox.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/demos.js"/>"></script>


<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>



<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>
	<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_store_mrn.js"/>"></script>
<%-- <%@include file="pharma_header.jsp"%> --%>

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
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('../../pharmacy/resources/images/ajax_loader_blue_64.gif')
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
			/* $("#store_pop_up").show(); */
			$("#box_tab4").hide();
			
		});
</script>
<script type="text/javascript">
	onload = function() {
		
		 $("#HSTDivForReceive").hide(); 
		var inputs = [];
		checkSession();
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
		$('#tab3').addClass('active');
					
		return setValuesToAutocompleteProduct(null);
	};

	
	shortcut.add("Ctrl+s",function() {
	/* 	validateData(); */
		saveMRN();
		
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
	
	function checkSession()
	{
		<%if (session.getAttribute("pharmacyStoreId") == null) {%>
			alert("please select store");
			$("#store_pop_up").dialog({ title: "Store Details",modal: true});
			
		<%} else {%>
		$("#mrnStoreId").val(<%=session.getAttribute("pharmacyStoreId")%>);
		var storeName="<%=session.getAttribute("pharmacyStoreName")%>";
		$("#txtMrnStoreName").val(storeName);
		$("#titleStoreName").html(storeName);
		
		var storeUsers="<%=session.getAttribute("pharmacyStoreUsers")%>";
		$("#storeUsers").val(storeUsers);
		
		var loginUserId="<%=session.getAttribute("userId1")%>";
		$("#loginUser").val(loginUserId);
		
		
		<%}%>
		
	}
	function refresh1() {
		window.location.reload(true);
	}

</script>
<script>
function validateData() 
{
	if($('#txtOrderNo').val()!=null && $('#txtOrderNo').val()!="")
		{ 	
			if($('#popup_container2').val()!=null && $('#popup_container2').val()!="")
			   { 
				
					if($('#textProductName1').val()!=null && $('#textProductName1').val()!="")
					   { 
						if($('#hiddenMRNId').val()!=null && $('#hiddenMRNId').val()!="")
							{ 
								alert("Record Updated Successfully!");	
								$('#mrnForm').submit();
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
							    $('#mrnForm').submit();
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
					 $('#popup_container2').focus();
				  }	
				
		   
		
	}
	else
	  {
		alert("Enter Order No");
		 $('#txtOrderNo').focus();
	  }	
	
}
function showAlert()
{
	
	alert("Please Fill All the Details!");
}

function invalidateSession()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "../../pharmacy/mrn/invalidateSesion",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			alertify.success("Main Store Selected");
		}
	});
}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());

	java.text.SimpleDateFormat dateFormat = new SimpleDateFormat(
	"HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time = dateFormat.format(cal.getTime());
%>
<body style="background: white ! important;">
	<section id="page">

		<c:set scope="session" value="${fn:length(mrn.mrnSlaves)}"
			var="slaveCount"></c:set>


		<%-- <c:set scope="session" value="${sessionScope.pharmacyStoreUsers}"
			var="storeUsers"></c:set> --%>


		<input type='hidden' id='storeUsers'> <input type='hidden'
			id='loginUser'>



		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="pharma_store_mrn_product_pop_up.jsp"%>
			<%@include file="pharma_store_mrn_store_pop_up.jsp"%>
			<%@include file="pharma_store_mrn_authentication.jsp"%>
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
											<li>Store Management</li>
											<li><span style="background-color: red" class="badge"
												id='storeTitle'> <%
 	if(session.getAttribute("pharmacyStoreName")!=null)
    									{
 %> <%=session.getAttribute("pharmacyStoreName")%> Store <%
 	}
    									else
    									{
 %> No Store Selected <%
 	}
 %>
											</span></li>

											<%
												if(session.getAttribute("pharmacyStoreName")!=null)
																																						{
											%>
											<li><a onclick="invalidateSession()"><span
													style="background-color: red" class="badge" id='storeTitle'><i
														class="fa fa-hospital-o"></i>return to Main store <%
												}
											%> </span></a></li>

											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" style="margin-left: 9px;">
												<a class="btn btn-xs btn-info" onclick="openStorePopUp()">Select
													Store</a> <a class="btn btn-xs btn-info"
													onclick="openStorePopUp1()">Select Main Store</a><a
													class="btn btn-xs btn-info"
													href="../../pharmacy/mrn/view">Back to List</a>
												<button class="btn btn-xs btn-success" type="button"
													id="saveBtn" onclick="saveMRN()">Save and
													Print(Ctrl+S)</button>
												<!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> -->
											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->

							<div class="row">
								<!-- BOX -->
								<div class="box border red" id='tabs'>
									<div class="box-title">
										<h4>
											<i class="fa fa-columns"></i><span id="titleStoreName"></span><span
												class="hidden-inline-mobile"> Store MRN </span>
										</h4>
									</div>
									<div class="box-body">
										<div class="tabbable header-tabs">
											<ul class="nav nav-tabs">

												<li class="" id='tab4'><a data-toggle="tab"
													href="#box_tab4" onclick="fetchStock();"><i
														class="fa fa-circle-o"></i> <span
														class="hidden-inline-mobile">Stock</span></a></li>
												<li class="" id='tab1'><a data-toggle="tab"
													href="#box_tab3" onclick="setApproval();"><i
														class="fa fa-circle-o"></i> <span
														class="hidden-inline-mobile">More</span></a></li>
												<li class="" id='tab2'><a data-toggle="tab"
													href="#box_tab2" onclick="checkStatus();"><i
														class="fa fa-laptop"></i> <span
														class="hidden-inline-mobile">Status</span></a></li>
												<li class="" id='tab5'><a data-toggle="tab"
													href="#box_tab5" onclick="receiveMrnList();"><i
														class="fa fa-laptop"></i> <span
														class="hidden-inline-mobile">Receive</span></a></li>
												<li class="" id='tab3' onclick="refresh1();"><a data-toggle="tab"
													href="#box_tab1"><i class="fa fa-calendar-o"></i> <span
														class="hidden-inline-mobile">New MRN</span></a></li>



											</ul>
											<div class="tab-content">
												<div id="box_tab1" class="tab-pane fade active in">

													<!-- <div class="divide-40"></div> -->
													<!-- <div class="col-md-12-1">
														<b id="title">MRN</b>
													</div> -->
													<div class="row">
														<form:form commandName="mrn" id="mrnForm"
															action="../../pharmacy/mrn/save" method="post">

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
																					<b> MRN No </b>
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
																							<form:input path="mrnId" type="text"
																								id="txtOrderNo" readonly="true"
																								name="txtOrderNo1"
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
																					<form:input path="mrnDocId" type="text"
																						id="txtOrderNo" readonly="true" name="txtOrderNo"
																						class="form-control input-SmallText"
																						placeholder="Vou No" required="true" />
																					<div class='col-md-1-1 center'
																						style='margin-top: -11px; margin-left: 183px; color: red;'>
																						<b> *</b>
																					</div>
																				</div>
																			</div>
																			<%-- <div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-5-1" style="margin-top: 0px;">
															<b> Vendor Name</b>
														</div>
														<div class="col-md-5-1" style="margin-top: 0px;">

															

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
															<form:input path="vendorMaster.vendorName" type="text"
																id="txtPartyName" name="txtPartyName"
																class="form-control input-SmallText"
																placeholder=" Vendor Name"  required="true"
																onblur="splitVendorContentPo($('#txtPartyName').val())" />
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
																													+ r[i].vendorId;
																										}
																										response(availableTags);
																									}
																								});
																					}
																				});
															</script>
														</div>

													</div> --%>
																		</div>

																		<div class="col-md-6-1 " style="margin-top: 9px;">
																			<div class="col-md-12-1" style="margin-top: 0px;">
																				<div class="col-md-5-1" style="margin-top: 0px;">
																					<b> Order Date</b>
																				</div>
																				<div class="col-md-3-1" style="margin-top: 0px;">

																					<%-- <c:when test="${slaveCount ==0}">
															</c:when> --%>
																					<c:choose>
																						<c:when test="${slaveCount ==0}">
																							<%-- <form:input path="mrnDate" type="text"
																								id="txtBillDate" name="txtBillDate"
																								class="form-control input-SmallText"
																								readonly="true" placeholder="Order Date"
																								required="true" value="<%=todays_date%>"
																								onfocus="displayCalendar(document.getElementById('txtBillDate'),'dd/mm/yyyy',this)"
																								onfucsout="closeCalendar();" /> --%>

																							<form:input path="mrnDate" type="text"
																								id="popup_container2" name="txtBillDate"
																								class="form-control input-SmallText"
																								readonly="true" placeholder="Bill Date"
																								required="true" value="<%=todays_date%>"
																								onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)" />

																							<div
																								style="margin-top: -11px; margin-left: 203px; color: red;"
																								class="col-md-1-1 center">
																								<b> *</b>
																							</div>
																						</c:when>
																						<c:when test="${slaveCount !=0}">
																							<form:input path="poDate" type="text"
																								id="txtBillDate" name="txtBillDate"
																								class="form-control input-SmallText"
																								readonly="true" placeholder="Order Date"
																								required="true"
																								onfocus="displayCalendar(document.getElementById('txtBillDate'),'dd/mm/yyyy',this)"
																								onfucsout="closeCalendar();" />
																							<div
																								style="margin-top: -11px; margin-left: 203px; color: red;"
																								class="col-md-1-1 center">
																								<b> *</b>
																							</div>
																						</c:when>
																					</c:choose>
																				</div>

																				<div class="col-md-3-1" style="margin-top: 0px;">
																					<form:input path="mrnTime" id="txtTime"
																						class="form-control input-SmallText" type="text"
																						name="txtTime" readonly="true" value="<%=time%>" />
																				</div>

																			</div>

																			<div class="col-md-12-1" style="margin-top: 0px;">
																				<div class="col-md-5-1" style="margin-top: 0px;">
																					<b>Store Name</b>
																				</div>
																				<div style="margin-top: 0px;" class="col-md-5-1">
																					<form:input path="mrnStoreName" type="text"
																						id="txtMrnStoreName" readonly="true"
																						name="txtMrnStoreName"
																						class="form-control input-SmallText"
																						placeholder="Store Name" required="true" />
																					<div
																						style="margin-top: -11px; margin-left: 223px; color: red;"
																						class="col-md-1-1 center">
																						<b> *</b>
																					</div>
																				</div>
																			</div>

																			<div>

																				<form:hidden path="mrnStoreId" id="mrnStoreId" />
																				<form:hidden path="mrnId" id="hiddenMrnId" />

																				<form:hidden path="MrnApproved" id="mrnApproved" />
																			</div>
																			<%-- <div class="col-md-12-1 panel" style="margin-top: 9px;">
														<div class="col-md-12-1" style="margin-top: 0px;">
															Shortage Based
															<form:radiobutton path="mrn" value="0"
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
														<!-- </div> -->
													</div> --%>

																		</div>
																	</div>


																</div>

															</div>

															<div class="divide-20"></div>

															<div id="HSTDiv"
																style="height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d; margin-left: 19px; margin-right: 15px">
																<div class="col-md-12-1">
																	<input type="button" value="-"
																		class="btn btn-xs btn-success"
																		style="margin: 7px; float: right"
																		onclick="deleteRow();">
																</div>
																<table id="ItemInfoTable" cellpadding="0"
																	cellspacing="0" border="1"
																	class="table table-bordered table-striped table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1 center">Sr.</th>
																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																					class='TextFont'>Product Name</div></th>
																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Unit</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Pack</div></th>

																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																					class='TextFont'>Comp</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Qty</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Select</div></th>

																		</tr>
																	</thead>


																	<tbody id="DRRDiv"
																		style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">

																		<c:choose>
																			<c:when test="${mrn.mrnProductCount>=1}">
																				<c:forEach items="${mrn.mrnSlaves}" var="row"
																					varStatus="count">
																					<tr id="remove${count.index+1}">
																						<td><center>${count.index+1}</center></td>
																						<td><input type='hidden'
																							id='hiddenCurrentRow' value='${count.index+1}' />
																							<form:hidden
																								path="mrnSlaves[${count.index}].mrnSlaveId" />
																							<form:hidden
																								path="mrnSlaves[${count.index}].productMaster.productId"
																								id="hiddenProductId${count.index+1}" /> <form:input
																								path="mrnSlaves[${count.index }].productMaster.productName"
																								type='text' class='form-control input-SmallText'
																								id="textProductName${count.index+1 }"
																								data-toggle="modal" data-target="#Po_Pop_Up"
																								onclick="loadPopUp(${count.index+1})" /></td>
																						<td><form:input
																								path="mrnSlaves[${count.index}].productMaster.productUnit"
																								type='text' class='form-control input-SmallText'
																								id="textUnit${count.index+1 }" readonly="true"
																								tabindex="-1" /></td>
																						<td><form:input
																								path="mrnSlaves[${count.index}].productMaster.packingMaster.packType"
																								type='text' class='form-control input-SmallText'
																								id="textPack${count.index+1 }" readonly="true"
																								tabindex="-1" /></td>
																						<td><form:input
																								path="mrnSlaves[${count.index}].productMaster.companyMaster.compName"
																								type='text' class='form-control input-SmallText'
																								id="textComp${count.index+1 }" readonly="true"
																								tabindex="-1" /></td>
																						<%-- <td><form:input
																		path="mrnSlaves[${count.index}].poSlaveMrp"
																		type='text' class='form-control input-SmallText'
																		id="textMRP${count.index+1 }"
																		onchange="isFloatingPoint('textMRP${count.index+1}');"
																		tabindex="-1" /></td> --%>
																						<td><form:input
																								path="mrnSlaves[${count.index}].poSlaveQty"
																								readonly="true" type='text'
																								class='form-control input-SmallText'
																								id="textQty${count.index+1 }" /></td>

																						<%-- <td><form:input
																		path="ltPOslave[${count.index}].poSlaveScheme"
																		type='text' class='form-control input-SmallText'
																		readonly="true" id="textScm${count.index+1 }" /></td> --%>
																						<%-- <td><form:input
																		path="ltPOslave[${count.index}].poSlaveRate"
																		type='text' class='form-control input-SmallText'
																		id="textPurRate${count.index+1 }" readonly="true"
																		tabindex="-1" /></td> --%>

																						<%-- <td><form:input
																		path="ltPOslave[${count.index}].poSlaveVat"
																		type='text' class='form-control input-SmallText'
																		id="textVat${count.index+1}" readonly="true"
																		tabindex="-1" /></td> --%>

																						<%-- <td>
																	<form:input
																		type='text'
																		path="ltPOslave[${count.index}].poSlaveAmt"
																		readonly="true" class='form-control input-SmallText'
																		id="textAmount${count.index+1 }" tabindex="-1" />
																</td> --%>
																						<form:hidden
																							path="mrnSlaves[${count.index}].productMaster.shelfMaster.shelfName"
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
																							path="mrnSlaves[${slaveCount}].mrnSlaveId" /> <form:hidden
																							path="mrnSlaves[${slaveCount}].productMaster.productId"
																							id="hiddenProductId${slaveCount+1}" /> <form:input
																							path="mrnSlaves[${slaveCount}].productMaster.productName"
																							type='text' class='form-control input-SmallText'
																							id="textProductName${slaveCount+1}"
																							data-toggle="modal" data-target="#Po_Pop_Up"
																							onclick="loadPopUp(${slaveCount+1})" /></td>
																					<td><form:input
																							path="mrnSlaves[${slaveCount}].productMaster.productUnit"
																							type='text' class='form-control input-SmallText'
																							id="textUnit${slaveCount+1}" readonly="true"
																							tabindex="-1" /></td>
																					<td><form:input
																							path="mrnSlaves[${slaveCount}].productMaster.packingMaster.packType"
																							type='text' class='form-control input-SmallText'
																							id="textPack${slaveCount+1}" readonly="true"
																							tabindex="-1" /></td>
																					<td><form:input
																							path="mrnSlaves[${slaveCount}].productMaster.companyMaster.compName"
																							type='text' class='form-control input-SmallText'
																							id="textComp${slaveCount+1}" readonly="true"
																							tabindex="-1" /></td>
																					<%-- <td><form:input
																	path="mrnSlaves[${slaveCount}].poSlaveMrp" type='text'
																	class='form-control input-SmallText'
																	id="textMRP${slaveCount+1}"
																	onchange="isFloatingPoint('textMRP${slaveCount+1}');"
																	tabindex="-1" /></td> --%>
																					<td><form:input
																							path="mrnSlaves[${slaveCount}].poSlaveQty"
																							type='text' class='form-control input-SmallText'
																							readonly="true" id="textQty${slaveCount+1}" /></td>
																					<%-- <td><form:input
																	path="mrnSlaves[${slaveCount}].poSlaveScheme"
																	type='text' class='form-control input-SmallText'
																	readonly="true" id="textScm${slaveCount+1}" /></td>
															<td><form:input
																	path="mrnSlaves[${slaveCount}].poSlaveRate" type='text'
																	class='form-control input-SmallText'
																	id="textPurRate${slaveCount+1}" readonly="true"
																	tabindex="-1" /></td>


															<td><form:input
																	path="ltPOslave[${slaveCount}].poSlaveVat" type='text'
																	class='form-control input-SmallText'
																	id="textVat${slaveCount+1}" readonly="true"
																	tabindex="-1" /></td> --%>


																					<td><form:input type='text' readonly="true"
																							path="mrnSlaves[${slaveCount}].poSlaveAmt"
																							class='form-control input-SmallText'
																							id="textAmount${slaveCount+1}" tabindex="-1" /></td>

																					<form:hidden
																						path="mrnSlaves[${slaveCount}].productMaster.shelfMaster.shelfName"
																						id="textShelf${slaveCount+1}" />

																					<td><input type="checkbox" name="deleteGroup"
																						value="${slaveCount+1}"
																						id="deleteGroup${slaveCount+1}"></td>
																				</tr>
																			</c:when>

																			<c:otherwise>
																				<input type='hidden' id='hiddenCurrentRow' value='1' />
																				<tr id="remove1">
																					<td><center>1</center></td>
																					<td><form:hidden
																							path="mrnSlaves[0].productMaster.productId"
																							id="hiddenProductId1" /> <form:input
																							path="mrnSlaves[0].productMaster.productName"
																							type='text' class='form-control input-SmallText'
																							id="textProductName1" data-toggle="modal"
																							data-target="#Po_Pop_Up"
																							onclick="loadPopUp(1,${count.index+1})" /> <form:hidden
																							path="mrnSlaves[0].mrnSlaveId" id="mrnSlaveId1" />

																					</td>
																					<td><form:input
																							path="mrnSlaves[0].productMaster.productUnit"
																							type='text' class='form-control input-SmallText'
																							id="textUnit1" readonly="true" tabindex="-1" /></td>
																					<td><form:input
																							path="mrnSlaves[0].productMaster.packingMaster.packType"
																							type='text' class='form-control input-SmallText'
																							id="textPack1" readonly="true" tabindex="-1" /></td>
																					<td><form:input
																							path="mrnSlaves[0].productMaster.companyMaster.compName"
																							type='text' class='form-control input-SmallText'
																							id="textComp1" readonly="true" tabindex="-1" /></td>


																					<%-- <td>
																<form:input path="ltPOslave[0].poSlaveMrp"
																	onchange="isFloatingPoint('textMRP1');" type='text'
																	class='form-control input-SmallText' id="textMRP1"
																	tabindex="-1" />
															</td> --%>

																					<td><form:input
																							path="mrnSlaves[0].mrnSlaveQty" readonly="true"
																							type='text' class='form-control input-SmallText'
																							id="textQty1" /></td>
																					<%-- <td><form:input path="ltPOslave[0].poSlaveScheme"
																	type='text' class='form-control input-SmallText'
																	readonly="true" id="textScm1" /></td>
															<td><form:input path="ltPOslave[0].poSlaveRate"
																	type='text' class='form-control input-SmallText'
																	id="textPurRate1" readonly="true" tabindex="-1" /></td>

															<td><form:input path="ltPOslave[0].poSlaveVat"
																	type='text' class='form-control input-SmallText'
																	id="textVat1" readonly="true" tabindex="-1" /></td>

															<td><form:input type='text' readonly="true"
																	path="ltPOslave[0].poSlaveAmt"
																	class='form-control input-SmallText' id="textAmount1"
																	tabindex="-1" /></td> --%>

																					<!-- <td style='display: none;'><input name="shelf"
																type="text" class="form-control input-SmallText"
																id="textShelf1" readonly></td> -->


																					<form:hidden
																						path="mrnSlaves[0].productMaster.shelfMaster.shelfName"
																						id="textShelf1" />

																					<td style="display: none;"><input name="clStk"
																						type="text" class="form-control input-SmallText"
																						id="textClStk1" readonly></td>

																					<td><center>
																							<input type="checkbox" name="deleteGroup"
																								value="1" id="deleteGroup1">
																						</center></td>

																				</tr>

																			</c:otherwise>
																		</c:choose>


																	</tbody>
																</table>
															</div>

															<div id="HSTDivForReceive"
																style="height: 200Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d; margin-left: 19px; margin-right: 15px">
																<div class="col-md-12-1">
																	<input type="button" value="Receive"
																		class="btn btn-xs btn-success"
																		style="margin: 7px; float: right"
																		onclick="receiveMrn();">
																</div>
																<table id="ItemInfoTable" cellpadding="0"
																	cellspacing="0" border="1"
																	class="table table-bordered table-striped table-condensed">
																	<thead>
																		<tr>
																			<th class="col-md-1-1 center">Sr.</th>
																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																					class='TextFont'>Product Name</div></th>
																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Unit</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Pack</div></th>

																			<th class='col-md-1-1 center' style='height: 21.5px;'><div
																					class='TextFont'>Comp</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Issue
																					Qty</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Qty</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Batch
																					code</div></th>

																			<th class=' col-md-1-1 center'
																				style='height: 21.5px;'><div class='TextFont'>Select</div></th>

																		</tr>
																	</thead>


																	<tbody id="DRRDivForReceive"
																		style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																	</tbody>
																</table>
															</div>

															<div class="divide-20"></div>
															<div id="last" class="col-md-12-1 "
																style="margin-top: 9px; margin-left: 15px; margin-right: 15px">
																<div class="col-md-6-1 ">
																	<b>Remark</b>
																</div>
																<div class="col-md-7-1 " style="margin-top: 9px;">
																	<form:textarea path="mrnRemark" name="textSuppliedBy"
																		placeholder="Remark" class="col-md-7-1"></form:textarea>
																</div>


																<div class="col-md-8-1 " style="margin-top: 9px;">
																	<%-- <div class="col-md-1-1 " style="margin-top: 9px;">
												<b>Total</b>
											</div>
											<div class="col-md-3-1 " style="margin-top: 9px;">
												<form:input path="mrnTotalAmt" type="text" id="txtTotal"
													class="col-md-7-1" readonly="true" value=""
													placeholder="Total" />
											</div> --%>

																	<div class="col-md-1-1 " style="margin-top: 9px;">
																		<b>Count</b>
																	</div>
																	<div class="col-md-3-1 " style="margin-top: 9px;">
																		<form:input path="mrnProductCount" type="text"
																			id="txtCount" class="col-md-7-1" readonly="true"
																			value="" placeholder="Count" />
																	</div>


																</div>
															</div>
															<%-- <div id="last" class="col-md-12-1 " style="margin-top: 18px;">
										<div class="col-md-6-1 ">
											<b>Total Vat</b>
										</div>
										<div class="col-md-3-1 "
											style="margin-top: -11px; margin-left: -518px">

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

									</div> --%>
															<%-- <div id="" class="col-md-12-1 " style="margin-top: 19px;">
										<div class="col-md-6-1 ">
											<b>Net Total</b>
										</div>
										<div class="col-md-3-1 "
											style="margin-top: -11px; margin-left: -518px">

										 <c:choose>
												<c:when test="${slaveCount ==0}">  
													<form:input type="text" id='textNetTotal'
														name='textNetTotal' placeholder="Net total"
														path="poNetTotal" value='0'
														class="ui-autocomplete-input form-control input-SmallText" />

												 </c:when>
												<c:when test="${slaveCount !=0}">
													<form:input type="text" id='textNetTotal'
														name='textNetTotal' placeholder="Net total" path="poNetTotal"
														readonly="true"
														class="ui-autocomplete-input form-control input-SmallText"
														value="${poNetTotal}" />
												</c:when>
											</c:choose> 

										</div>

									</div> --%>

															<div
																style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
														</form:form>

													</div>
												</div>
												<div id="box_tab2" class="tab-pane fade">
													<div class="row"
														style="height: 5%; max-height: auto; margin-left: 1%; margin-right: 1%">
														<div class="container-main col-md-7-1"
															style="overflow-y: scroll; height: 450px; maxheight: auto; border: 1px solid #b8b8b8;">

															<div id="SearchContent" class="col-md-12-1"
																style="margin-top: 20px;">
																<div class='col-md-1-1'>Search By:</div>
																<div class='col-md-1-1'>MRN No</div>
																<div class="form-group col-md-2-1" id="divbyName">
																	<input name="txtMRNIssueNo" type="text"
																		id="txtMRNIssueNo"
																		class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1 "
																		id="txtStoreName"
																		onblur="splitMRNData($('#txtMRNIssueNo').val())" /> <input
																		type="hidden" id="hiddenMRNIssueId" />

																	<script type="text/javascript">
																	$("#txtMRNIssueNo").autocomplete({
																		 source : function(request, response) {
																		 
																				var findingName = $("#txtMRNIssueNo").val();
																				var inputs = [];
																				inputs.push('letter=' + findingName);
																				var str = inputs.join('&');
							
																				jQuery.ajax({
																					async : true,
																					type : "GET",
																					data : str + "&reqType=AJAX",
																					url : "../../pharmacy/mrn/autoSuggestionMRNIssueNumber",
																					timeout : 1000 * 60 * 5,
																					catche : false,
																					error : function() {
																						/* alert('error'); */
																					},
																					success : function(r) {
																						var availableTags = [];
																						
																						if(r.length>0)
																						{
																							for(var i=0;i<r.length;i++)
																							{
																								availableTags[i] = r[i].mrnIssueId+ "";
																							}																
																							response(availableTags);
																						}
																						else
																						{
																							availableTags[0] = "No Record Found";
																							response(availableTags);
																						}	
																						
																					}
																				});
																		 }																						
																	});	
																	</script>
																</div>
																<div class='col-md-1-1'
																	style="margin-left: 9px; margin-top: -10px;">
																	<input id='' type='button' value='Search' class='edit'
																		onclick='searchMRNIssueByMRNId($("#hiddenMRNIssueId").val());' />
																	<div class='col-md-2-1'
																		style="margin-left: 9px; margin-top: -10px;"></div>
																</div>

																<div class='col-md-1-1'>Search By:</div>
																<div class='col-md-1-1'>Store Name</div>
																<div class="form-group col-md-2-1" id="divbyName">
																	<input name="txtStoreName" type="text"
																		id="txtStoreName"
																		class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1 "
																		id="txtStoreName"
																		onblur="splitStoreDetail($('#txtStoreName').val())" />
																	<input type="hidden" id="hiddenStoreId" />

																	<script type="text/javascript">
										$("#txtStoreName").autocomplete({
											 source : function(request, response) {
											 
													var findingName = $("#txtStoreName").val();
													var inputs = [];
													inputs.push('letter=' + findingName);
													var str = inputs.join('&');

													jQuery.ajax({
														async : true,
														type : "GET",
														data : str + "&reqType=AJAX",
														url : "../../pharmacy/store/autoSuggestionStore",
														timeout : 1000 * 60 * 5,
														catche : false,
														error : function() {
															/* alert('error'); */
														},
														success : function(r) {
															var availableTags = [];
															for(var i=0;i<r.length;i++)
															{
																availableTags[i] = r[i].storeName+ "-"+r[i].storeId;
															}																
															response(availableTags);
														}
													});
											 }																						
										});	
										</script>
																</div>
																<div class='col-md-1-1'
																	style="margin-left: 9px; margin-top: -10px;">
																	<input id='' type='button' value='Search' class='edit'
																		onclick='searchMRNIssueByStore($("#hiddenStoreId").val());' />
																	<div class='col-md-2-1'
																		style="margin-left: 9px; margin-top: -10px;"></div>
																</div>
															</div>

															<table
																class="table table-striped table-bordered header-fixed cf "
																style="width: 100%;">
																<thead class="cf" style="background: white;">
																	<tr>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Mrn
																				No</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Vou
																				No</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Bill
																				Date</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Status</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Approval
																				Status</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
																	</tr>
																</thead>

																<tbody id="divMRNList">
																</tbody>
															</table>
														</div>
													</div>

												</div>
												<div id="box_tab3" class="tab-pane fade ">
													<!-- <div class="alert alert-info">
														<strong>Hello!</strong> I'm a cool tabbed box.
													</div> -->
													<div class='row' style='margin-right: 1%'>
														<a href="#" onclick="setApprovalDetails()"
															class="btn btn-xs btn-info" style='float: right'>Approval</a>
													</div>
													<table
														class="table table-striped table-bordered header-fixed cf "
														style="width: 100%;">
														<thead class="cf" style="background: white;">
															<tr>
																<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Mrn
																		No</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Vou
																		No</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Bill
																		Date</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Status</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Approve
																		Status</div></th>
																<th style="height: 21.5px;" class="col-md-1 center"><div>Select</div></th>
															</tr>
														</thead>

														<tbody id="divPendingApprovalList">
														</tbody>
													</table>
												</div>


												<div id="box_tab5" class="tab-pane fade ">
													<div class="row"
														style="height: 5%; max-height: auto; margin-left: 1%; margin-right: 1%">
														<div class="container-main col-md-7-1"
															style="overflow-y: scroll; height: 450px; maxheight: auto; border: 1px solid #b8b8b8;">

															<table
																class="table table-striped table-bordered header-fixed cf "
																style="width: 100%;">
																<thead class="cf" style="background: white;">
																	<tr>
																		<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Mrn
																				Issue No</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Mrn
																				Receive No</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>MRN
																				Generated Date</div></th>
																		<th style="height: 21.5px;" class="col-md-2 center"><div>Receive</div></th>
																	</tr>
																</thead>

																<tbody id="divIssueMrnListForReceive">
																</tbody>
															</table>
														</div>
													</div>
												</div>
												<div class="tab-pane fade" id="box_tab4">
													<!-- <table
														class="table table-striped table-bordered header-fixed cf "
														style="width: 100%;">
														<thead class="cf" style="background: white;">
															<tr>
																<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Product
																		Name</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Batch
																		Code</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Batch
																		Exp</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Current
																		Stock</div></th>

															</tr>
														</thead>

														<tbody > -->
													<div id='jqxWidget'>

														<div id="divStockList"></div>

														<div id="jqxwindow">
															<div>Find Record</div>
															<div style="overflow: hidden;">
																<div>Find what:</div>
																<div style='margin-top: 5px;'>
																	<input id='inputField' type="text" class="jqx-input"
																		style="width: 200px; height: 23px;" />
																</div>
																<div style="margin-top: 7px; clear: both;">Look
																	in:</div>
																<div style='margin-top: 5px;'>
																	<div id='dropdownlist' style="background: #a4bed4"></div>
																</div>
																<div>
																	<input type="button"
																		style='margin-top: 15px; margin-left: 50px; float: left;'
																		value="Find" id="findButton" /> <input type="button"
																		style='margin-left: 5px; margin-top: 15px; float: left;'
																		value="Clear" id="clearButton" />
																</div>
															</div>
														</div>
													</div>

													<!-- </tbody>
													</table> -->
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- /BOX -->
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
	</section>
</body>
</html>