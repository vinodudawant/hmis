<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
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
<title>Correction Rate | Pharmacy</title>
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

<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

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
<!-- /for Developers  -->

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>



<!-- Application js -->

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_purchase.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/moments.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_correction_in_rate.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>--%>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script> 
<%@include file="pharma_header.jsp"%>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase_batch_popup.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_correction_in_rate.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase.js"/>"></script>
<script>
	jQuery(document).ready(function() {
		//App.setPage("widgets_box");  //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>


<script type="text/javascript">
	onload = function() {
		//$("#ipdman").addClass("anchorActive");
		//defaultViewHallType();
		/* return setValuesToAutocomplete(null); */

		 shortcut.add("Ctrl+l",function() {
			backToList('correctionRateList');
		}); 
	};

	function validateData() {
		if ($('#txtProductName').val() != null
				&& $('#txtProductName').val() != "") {
			if ($('#hiddenProductId').val() != null
					&& $('#hiddenProductId').val() != "") {
				if ($('#txtBatchNo').val() != null
						&& $('#txtBatchNo').val() != "") {
					if ($('#txtExpiry').val() != null
							&& $('#txtExpiry').val() != "") {
						if ($('#txtMrp').val() != null
								&& $('#txtMrp').val() != "") {
							/* if ($('#hiddenPurchaseId').val() != null
									&& $('#hiddenPurchaseId').val() != "") {

								alert("Record Saved succeesfully!");
								$('#correctionInRateForm').submit();
							}

							else {
								alert("Record not found");
								$('#txtProductName').focus();
							} */
							if ($('#txtBillRate').val() != null
									&& $('#txtBillRate').val() != "") {
								if ($('#txtPRate').val() != null
										&& $('#txtPRate').val() != "") {
							alert("Record Saved successfully!");
							$('#correctionInRateForm').submit();
						}
						else {
							alert("Enter T.Rate");
							$('#txtBillRate').focus();
						}
					}
					else {
						alert("Enter PurRate");
						$('#txtPRate').focus();
					}
				}

						else {
							alert("Enter Mrp");
							$('#txtMrp').focus();
						}
					}

					else {
						alert("Enter Expiry");
						$('#txtExpiry').focus();
					}
				} else {
					alert("Enter Batch Number");
					$('#txtBatchNo').focus();
				}

			} else {
				alert("Record not found");
				$('#txtProductName').val('');
				$('#txtProductName').focus();
			}

		} else {
			alert("Enter Product Name");
			$('#txtProductName').focus();

		}

	}
	shortcut.add("Ctrl+s",function() {
		$('#correctionInRateForm').submit();
		
	});
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body style="background: white ! important;">
	<section id="page">

		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
             <%@include file="HelpMenu.jsp"%>
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@ include file="pharma_purchase_batch_PopUp.jsp"%>

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<div class="row">

								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="../../Dashboard.jsp">Home</a></li>
											<li><a
												href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
											<li>Correction In Rate</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<div class="li pull-right" >
												<button class="btn btn-xs btn-success"
													style='cursor: pointer;' type='button' value='Save Now'
													onclick="validateData();">Save(Ctrl+S)</button>

											</div>
											<div class="li pull-right" style="margin-left: 9px;">
														<a class="btn btn-xs btn-info"
															href="../../pharmacy/correctionRate/view-Firm">Back to List(Ctrl+L)</a>
													</div>																										
											
										</ul>

									</div>
								</div>
							</div>


							<div class="divide-20"></div>
							<div class="col-md-8">
								<div class="box border blue">
									<div class="box-title">
										<h4>
											<i class="fa fa-edit"></i><b>Correction In Rate</b>
										</h4>
										<!-- <div class="tools">
											<a class="config" data-toggle="modal" href="#box-config">
												<i class="fa fa-cog"></i> </a> <a class="reload" href="javascript:;"> <i
												class="fa fa-refresh"></i>
											</a> <a class="collapse" href="javascript:;"> <i
												class="fa fa-chevron-up"></i>
											</a> <a class="remove" href="javascript:;"> <i
												class="fa fa-times"></i>
											</a>
										</div> -->
									</div>
									<div class="box-body big">
										<div class="box-body">
											<div class="">
												<div class="panel-body">
													<div id="correctionInRatet" class="col-md-12-1"
														style="height: 100%; margin-top: 1%; padding-left: 20px; border: 1px solid">
														<form:form commandName="correctionRate"
															id="correctionInRateForm"
															action="../../pharmacy/correctionRate/save"
															method="post">

															<div class="col-md-12-1" style="margin-top: 5px;">
																<div class="col-md-3-1" style="margin-top: 0px;">
																	<div class="form-group">
																		<!-- <label for="product">Product</label> -->
																			<label for="product"  >Product <b style="color: red; ">*</b></label>	
																		<input type="text" id='txtProductName'
																			name='txtProductName' placeholder="Product Name"
																			class="ui-autocomplete-input form-control input-SmallText"
																			onblur="displayResultCorrectionRate($('#txtProductName').val());" />
																			<script type="text/javascript">
																			$(
																					"#txtProductName")
																					.autocomplete(
																							{
																								source : function(
																										request,
																										response) {

																									var findingName = $(
																											"#txtProductName")
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
																												url : "../../pharmacy/product/autoSuggestionProduct",
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
																														availableTags[i] = r[i].productName
																																+ '$$'
																																+ r[i].productId
																																+ '$$'
																																+ r[i].productUnit
																																+ '$$'
																																+ r[i].packingMaster.packType
																																+ '$$'
																																+ r[i].companyMaster.compName
																																+ '$$'
																																+ r[i].shelfMaster.shelfName;

																													}
																													response(availableTags);
																												}

																											});
																								}
																							});
																		</script>

																		<form:hidden id="hiddenPurchaseId"
																			path="purchaseMaster.purId" />

																		<form:hidden id="hiddenProductId"
																			path="purchaseMaster.ltPurSlave[0].productMaster.productId" />

																		<form:hidden id="hiddenPurchaseSlaveId"
																			path="purchaseMaster.ltPurSlave[0].purSlaveId" />
																	</div>
																</div>


																<div class="col-md-2-1" style="margin-top: 0px;">
																	<div class="form-group">
																		<label for="product">Unit</label>
																		<form:input type="text" id="txtUnit" name="txtUnit"
																			path="" class="form-control input-SmallText"
																			placeholder="unit" readonly="true" />
																	</div>
																</div>

																<div class="col-md-2-1" style="margin-top: 0px;">
																	<div class="form-group">
																		<label for="product">Pack</label>
																		<form:input type="text" id="txtPack" name="txtPack"
																			path="" class="form-control input-SmallText"
																			placeholder="pack" readonly="true" />
																	</div>
																</div>

																<div class="col-md-2-1" style="margin-top: 0px;">
																	<div class="form-group">
																		<label for="product">Comp</label>
																		<form:input type="text" id="txtComp" name="txtComp"
																			path="" class="form-control input-SmallText"
																			placeholder="comp" readonly="true" />
																	</div>
																</div>

																<div class="col-md-2-1" style="margin-top: 0px;">
																	<div class="form-group">
																		<label for="product">Shelf</label>
																		<form:input path="" type="text" id="txtShelf"
																			name="txtShelf" class="form-control input-SmallText "
																			placeholder="shelf" readonly="true" />
																	</div>
																</div>

															</div>

															<div class='col-md-12-1' style='margin-top: 9px;'>
																<div class='col-md-3-1' style='margin-top: 9px;'>
																<label  >Batch No <b style="color: red; ">*</b></label>	
																<!-- 	<b>Batch No</b> -->
																</div>
																<div class='col-md-4-1' style='margin-top: 9px;'>

																	<form:input type='text' id='txtBatchNo'
																		name='txtBatchNo' class='form-control input-SmallText'
																		maxlength='150' placeholder="Batch No" requird="true"
																		path="batchCode" onfocus="loadBatchPopUpForCorrection()" />
																	<%-- onblur="checkBatchAvailability(this.value)" --%>

																</div>
																<div class='col-md-3-1' style='margin-top: 9px;'>
																	<button type="button" onclick="addNewBatch()">
																		Add New Batch <span
																			class="glyphicon glyphicon-forward"
																			aria-hidden="true"></span>
																	</button>
																</div>

																<div class='col-md-3-1' style='margin-top: 9px;'
																	id="newBatch"></div>
																<form:hidden path="batchId" id="batchId" />
																<input type="hidden" name="oldMrp" id="oldMrp">
																<input type="hidden" name="oldBatch" id="oldBatch">
																<input type="hidden" name="oldBillRate" id="oldBillRate">
																<input type="hidden" name="oldRate" id="oldRate">
																<input type="hidden" name="oldPurRate" id="oldPurRate">

																<div class='col-md-1-1 center'
																	style='margin-top: -11px; margin-left: 377px; '>
																	<!-- <b> *</b> -->
																</div>
															</div>

															<div class='col-md-12-1' style='margin-top: 9px;'>
																<div class='col-md-3-1' style='margin-top: 9px;'>
																<label  >Expiry <b style="color: red; ">*</b></label>	
																
																</div>
																<div class='col-md-4-1' style='margin-top: 9px;'>

																	<form:input type='text' id='txtExpiry' name='txtExpiry'
																		onkeypress='' class='form-control input-SmallText'
																		maxlength='30' placeholder="Expiry" requird="true"
																		path="expiry" onblur="isExpiryDate('txtExpiry');" />

																</div>
																<div class='col-md-1-1 center'
																	style='margin-top: -11px; margin-left: 377px; '>
																	<!-- <b> *</b> -->
																</div>
																<div class='col-md-3-1'
																	style='margin-top: 0px; margin-left: 1px; color: red;'>
																	<b>(mm/yy)</b>
																</div>
															</div>

															<div class='col-md-12-1' style='margin-top: 9px;'>
																<div class='col-md-3-1' style='margin-top: 9px;'>
																<label >T.Rate<b style="color: red; ">*</b></label>	
																</div>
																<div class='col-md-4-1' style='margin-top: 9px;'>

																	<form:input type='text' id='txtBillRate'
																		placeholder="T.Rate" requird="true" name='txtBillRate'
																		onkeypress='' class='form-control input-SmallText'
																		maxlength='20' path="tRate" />

																</div>

															</div>

															<div class='col-md-12-1' style='margin-top: 9px;'>
																<div class='col-md-3-1' style='margin-top: 9px;'>
																<label >Pur.Rate<b style="color: red; ">*</b></label>																	
																</div>
																<div class='col-md-4-1' style='margin-top: 9px;'>

																	<form:input type='text' id='txtPRate' name='txtPRate'
																		placeholder="Pur.Rate" requird="true" onkeypress=''
																		class='form-control input-SmallText' maxlength='20'
																		path="purRate" />

																</div>

															</div>

															<div class='col-md-12-1' style='margin-top: 9px;'>
																<div class='col-md-3-1' style='margin-top: 9px;'>
																<label  >M.R.P <b style="color: red; ">*</b></label>	

																</div>
																<div class='col-md-4-1' style='margin-top: 9px;'>

																	<form:input type='text' id='txtMrp' name='txtMrp'
																		onkeypress='' placeholder="M.R.P" requird="true"
																		class='form-control input-SmallText' maxlength='30'
																		path="mrp" />

																</div>
																<div class='col-md-1-1 center'
																	style='margin-top: -11px; margin-left: 377px; '>
																	<!-- <b> *</b> -->
																</div>
															</div>

															<div class='col-md-12-1'
																style='margin-top: 9px; margin-bottom: 10px;'>
																<div class='col-md-3-1' style='margin-top: 9px;'>
																	<b> Closing Stock</b>
																</div>
																<div class='col-md-4-1' style='margin-top: 9px;'>

																	<form:input type='text' id='txtClosingStk'
																		name='txtClosingStk' onkeypress=''
																		placeholder="Closing Stk" requird="true"
																		class='form-control input-SmallText' maxlength='22'
																		path="closingStock" readonly="true" />

																</div>

															</div>
														</form:form>
													</div>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				<%@include file="Pharma_Footer.jsp"%>
			</div>
		</div>
	</section>
</body>
</html>
