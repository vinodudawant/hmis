<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
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
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>


<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_transfer_from_godown_to_shop.js"/>"></script>
<!-- /for Developers  -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_ProductByBatchPopUp.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>

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
			url : "/EhatEnterprise/pharmacy/common/getDocNo",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#txtVouNo').val(r);
			}
		});
		return setValuesToAutocomplete(null);
	},
	
	jQuery(document).ready(function() {		
		
		App.init(); //Initialise plugins and elements
	});
	
	shortcut.add("Ctrl+s",function() {
		$('#transferFromGodownToShopForm').submit();
	});
	
	/* shortcut.add("Ctrl+l",function() {
		backToList('creditNote');
	}); */
</script>
<%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
			"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
%>

</head>
<body style="background: white ! important;">
	<section id="page">


		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
				<%@include file="Pharma_transfer_from_godown_to_shop_pop_up.jsp"%>
				<%@include file="HelpMenu.jsp"%>

			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<form:form commandName="transferFromGodownToShop" id="transferFromGodownToShopForm"
								action="/EhatEnterprise/pharmacy/transferFromGodownToShop/save"
								method="post">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : 11 Aug 2014</li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_OPD_Database.jsp">Administrator</a></li>
												<li>Store Items</li>
												<li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li>
												<li class="pull-right">
													<button class="btn btn-xs btn-success" id="saveBtn">Save</button>
												
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->
								<!-- <div class="divide-20"></div> -->


								<div class="col-md-12-1">
									<b>Transfer From Godown To Shop </b>
								</div>
								<div class="row">
									<div class="panel-body col-md-12-1">
										<div class="panel-body">
											<div id="CreiditNoteAmt" class="col-md-4-1"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													
													
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">

																									
												</div>

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input id="txtVouNo" path=""
																class="form-control input-SmallText" type="text"
																readonly="true" placeholder="Vou No" required="true"
																name="txtVouNo" />
															<br>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 0px;">
														<div class="col-md-3-1" style="margin-top: 0px;">
															<b> Vou Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 0px;">
															<form:input path="" id="txtVouDate"
																class="form-control input-SmallText" type="text"
																readonly="true" name="txtVouDate" placeholder="Vou Date"
																value="<%=date%>"
																onclick="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)" />
															<br>
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
													class='TextFont'>Sr.</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Product </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Unit </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> pack</label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Qty </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Batch No </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Expiry </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> M.R.P </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Rate </label></th>
												<th class="col-md-1-1 center" style="height: 21.5px;"><label
													class='TextFont'> Amount</label></th>
											</tr>
										</thead>

										<tbody id='DRRDiv'>
											<tr>
												<td><label class='input-SmallText'>1</label>
												<td class="col-md-1 center" style="height: 21.5px;"><form:hidden
														id="creditSlaveId0"
														path="" /> <form:hidden
														id="hiddenProductId1"
														path="" /> <form:hidden
														id="hiddenPurchaseSlaveId1"
														path="" /> <input
													type='hidden' id='hiddenCurrentRow' value='1' /> <form:input
														path=""
														type='text' class='form-control input-SmallText'
														id='textProductName1' name='textProductName1'
														maxlength='150' data-toggle="modal"
														data-target="#TransferFromGodownToShop_PopUp_Form" onclick="load(1,1)" /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText'
														readonly="true" id='textUnit1' name='textUnit1'
														path=""
														maxlength='8' /></td>

												<td class="col-md-1-1" style="height: 21.5px;"><form:input
														type='text' class='form-control input-SmallText'
														readonly="true"
														path=""
														id='textPack1' name='textPack1' maxlength='6' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText'
														path="" readonly="true"
														id='txtQty1' name='txtQty1' maxlength='6' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText' path=""
														readonly="true" id='txtBatchNo1' name='txtBatchNo1'
														maxlength='6' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText' path=""
														id='txtExpiry1' name='txtExpiry1' readonly="true"
														maxlength='6' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText' path=""
														readonly="true" id='txtMRP1' name='txtMRP1' maxlength='6' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText' path=""
														readonly="true" id='txtRate1' name='txtRate1'
														maxlength='6' /></td>

												<td style="height: 21.5px;" class="col-md-1-1 center"><form:input
														type='text' class='form-control input-SmallText'
														path="" id='txtAmt1'
														name='txtAmt1' value='0' maxlength='6' readonly="true" /></td>

												
											</tr>
										</tbody>
									</table>
								</div>
								<div class="divide-40"></div>
								<div class="col-md-3-1 center pull-right"
										style="margin-top: 9px;">
																													
										<div class="col-md-12-1" style="margin-top: 9px;">
											<div class="col-md-5-1" style="margin-top: 0px;">
												<b>Net Amount</b>
											</div>
											<div class="col-md-7-1" style="margin-top: 0px;">
												<form:input path="" id="txtNetAmt"
													type="text" readonly="true"
													class="form-control input-SmallText" maxlength='20'
													value='0' requird="true" placeholder="Net Amount"
													name="txtNetAmt" />
											</div>
										</div>
									</div>
									</form:form>
								</div>
								
							
						</div>
					</div>
				</div>

				<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
				<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
				<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>


			</div>
		


		<!-- <div>
						<label> Naration </label><input type="text" id="txtnaration"
							name="">
					</div> -->

		<%@include file="Pharma_Footer.jsp"%>


		<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
		<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>
		<input type='hidden' value='0' id='addRowCount' /> <input
			type='hidden' value='1' id='RowCount' />
	</section>
</body>
