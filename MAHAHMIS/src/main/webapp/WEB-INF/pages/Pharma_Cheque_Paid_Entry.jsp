<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Vendor Payment | Pharmacy</title>
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

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

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
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-migrate-1.2.1.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-jtemplates.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_cheque_paid_entry.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>


<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script> 
<!-- /for Developers  -->

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
		//App.setPage("widgets_box");  //Set current page
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
		
	};
	shortcut.add("Ctrl+s",function() {
		validateData();
		
	});
	shortcut.add("Ctrl+l",function() {
		backToList('chequePaidEntry');
	});
	   

</script>
<script type="text/javascript">
	onload = function() {
		var inputs = [];
		$("#DivBank").hide();
		$("#divChk").hide();
		$("#divChkDate").hide();
				
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
</script>
<script>
	function validateData() 
	{
		
		if ($('#searchBox').val() != null && $('#searchBox').val() != "") 
		{
			if ($('#vendorId').val() != null && $('#vendorId').val() != "") 
			{
					if ($('#txtVouDate').val() != null && $('#txtVouDate').val() != "")
					{
						if ($('#txtAmount').val() != null && $('#txtAmount').val() != "")
							{
						   	    if ($('#txtVouNo').val() != null && $('#txtVouNo').val() != "")
							     {
							    	if($('#txtAmount').val()!=null && $('#txtAmount').val()!="" && $('#txtAmount').val()!=0)
									{ 	 
									if ($('#chequePaidId').val() != null && $('#chequePaidId').val() != "") 
									{
										alert("Record Updated successfully!");
									    $('#chequePaidEntryForm').submit();
									
								    }
                                 else {
                                	 if ($('#bankId').val() != null && $('#bankId').val() != "" && $('#bankId').val() != 0)
         							{
									alert("Record Saved successfully!");
									$('#chequePaidEntryForm').submit();
         							}
             						else {
             							
             						$('#bankId').val(0);
             						$('#searchBank').val(0);
             						$('#txtChequeNo').val(0);
             					  	alert("Record Saved successfully!");
									$('#chequePaidEntryForm').submit();
             						
             					}
							
									
								  }
							} 
							    	else {
										alert("Select pending bill");
										 $('#txtVouNo').focus();
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
				
			else {
			alert("Record not found");
			$('#searchBox').val('');
			$('#searchBox').focus();
		}

	}
			else {
			alert("Enter Vendor Name");
			$('#searchBox').focus();
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
</head>


<body style="background: white ! important;">
	<section id="page">


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
						<div id="content" class="col-lg-12">
							<form:form commandName="chequePaidEntry" id="chequePaidEntryForm"
								action="save" method="post">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="./Dashboard.jsp">Home</a></li>
												<li><a href="../../pharmacy/pharmacy/transaction">Pharmacy</a></li>
												<li>Vendor payment</li>
												<!-- <li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li> -->

													<div class="li pull-right" style="margin-left: 9px;"><button type="button"
														class="btn btn-xs btn-success" onclick="validateData();">Save and Print(Ctrl+S)</button>
													<!-- <button class="btn btn-xs btn-warning">Print</button>
									<button class="btn btn-xs btn-danger">Discard</button> --></div>
													<div class="li pull-right" style="margin-left: 9px;"><a
													class="btn btn-xs btn-info"
													href="../../pharmacy/chequePaidEntry/view">Back
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
									<font color="tomato" style="font-size: 19px"> Vendor payment</font>
								</div>
								<div class="row">
									<div class="panel-body col-md-12-1">
										<div class="panel-body">
											<div id="chequePaid" class="col-md-4-1"
												style="height: 100%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">

												<div class="col-md-4-1" style="margin-top: 9px;">
													<div class="col-md-12-1" style="">
														<!-- <div class="col-md-7-1" style="margin-top: 9px;"> -->
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Vendor Name </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<input type="text" id='searchBox' name='searchBox'
																placeholder="Vendor Name"
																class="ui-autocomplete-input form-control input-SmallText"
																onblur="splitChequePaidEntryContent($('#searchBox').val());" />
															<form:hidden id="vendorId" path="vendorMaster.vendorId" value='0'/>
															<form:hidden path="chequePaidId" id="chequePaidId"   />
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
																													/* + r[i].vendorAddress
																													+ "-"
																													+ r[i].vendorMobileNumber */;

																										}
																										response(availableTags);
																									}

																								});
																					}
																				});
															</script>
															<!-- ,isAlphaWithSpace('searchBox',0,200) -->
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>
														<!-- </div> -->
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<!-- <div class="col-md-7-1" style="margin-top: 9px;"> -->
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Address</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="" type="text" id="txtAddress1"
																name="txtAddress1" class="form-control input-SmallText"
																placeholder="Address"  readonly="true"
																required="true" />
														</div>
														<!-- <div class='col-md-1-1 center'
															style='margin-top: -10px; margin-left: 273px; color: red;'>
															<b> *</b>
														</div> -->
														<!-- </div> -->
													</div>

													<div class="col-md-12-1" style="margin-top: 9px;">
														<!-- <div class="col-md-7-1" style="margin-top: 9px;"> -->
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Phone </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<form:input path="" type="text" id="txtPhone"
																name="txtPhone" class="form-control input-SmallText"
																placeholder="Phone"  readonly="true"
																required="true" />
														</div>
														<!-- <div class='col-md-1-1 center'
															style='margin-top: -10px; margin-left: 273px; color: red;'>
															<b> *</b>
														</div> -->
														<!-- </div> -->
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;">
														<!-- <div class="col-md-7-1" style="margin-top: 9px;"> -->
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Naration </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">

															<form:textarea path="chequePaidNarration"
																id="txtNaration" name="txtNaration" class="col-md-11-1"
																placeholder="Naration"  style="width:97%;"
																 />
																<!--  onblur="isAlphaWithDigitSpace('txtNaration',0,100)" -->
														</div>

														<!-- </div> -->
													</div>
												</div>

												<div class="col-md-4-1 " style="margin-top: 9px;">
													<div class="col-md-12-1" style="">
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Vou Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<form:input path="chequePaidDate" id="txtVouDate"
																class="form-control input-SmallText" type="text"
																readonly="true" name="txtVouDate" placeholder="vou date"
																 required="true" value="<%=todays_date%>"
																onclick="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)" />
														</div>
														<div class='col-md-1-1 center'
															style='margin-top: -10px; margin-left: 273px; color: red;'>
															<b> *</b>
														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;" id="DivBank2">
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Bank </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<!-- <input type="text" id="txtBank"
																	class="form-control input-SmallText" name="txtBank"> -->

															<input type="text" id='searchBank' name='searchBank'
																placeholder="Bank Name" 
																class="ui-autocomplete-input form-control input-SmallText"
																onblur="splitChequePaidEntryBankContent($('#searchBank').val())" />
															<form:hidden id="bankId" path="bankMaster.bankId"  value='0'/>
															<!-- ,isAlphaWithSpace('searchBank',0,200); -->
															<script type="text/javascript">
																$("#searchBank")
																		.autocomplete(
																				{
																					source : function(
																							request,
																							response) {

																						var findingName = $(
																								"#searchBank")
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
																									url : "../../pharmacy/bank/autoSuggestionBankNames",
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
																											availableTags[i] = r[i].bankName
																													+ "-"
																													+ r[i].bankId;

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
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Amount </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<!-- <input type="text" id="txtBank"
																	class="form-control input-SmallText" name="txtBank"> -->
															<form:input path="chequePaidAmt" type="text"
																id="txtAmount" name="txtAmount"
																class="form-control input-SmallText"
																placeholder="Amount"  readonly="true"
																onblur="isFloatingPoint('txtAmount');" />
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>

														</div>
													</div>
													<div class="col-md-12-1" style="margin-top: 9px;"  id="divChk">
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Cheque No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<!-- <input type="text" id="txtChequeNo"
																	class="form-control input-SmallText" name="txtChequeNo"> -->

															<form:input path="chequePaidChequeNum" type="text"
																id="txtChequeNo" name="txtChequeNo"
																class="form-control input-SmallText"
																placeholder="Cheque No" 
																 />
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
																<!-- onblur="isNumber('txtChequeNo');" -->
															</div>
														</div>
													</div>
													<div class="col-md-12-1" id="divChkDate"
														style="margin-top: 9px; margin-bottom: 10px;">
														<div class="col-md-3-1" style="margin-top: 9px;">
															<b> Cheque Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 9px;">
															<!-- <input id="popup_container"
																	class="form-control input-SmallText" type="text"
																	placeholder="Date" name="dob1" readonly="readonly"
																	onclick="displayCalendar(document.getElementById('popup_container'),'dd/mm/yyyy',this)"> -->
															<form:input path="chequePaidChequeDate"
																id="txtChequeDate" class="form-control input-SmallText"
																type="text" readonly="true" name="txtChequeDate"
																placeholder="Cheque date"  required="true" value="<%=todays_date%>"
																onclick="displayCalendar(document.getElementById('txtChequeDate'),'dd/mm/yyyy',this)" />
															<div class='col-md-1-1 center'
																style='margin-top: -10px; margin-left: 205px; color: red;'>
																<b> *</b>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-4-1 " style="margin-top: 9px;">
													<div class="col-md-12-1"
														style="margin-top: 9px; margin-left: 4%;">
													<div class="col-md-3-1" style="margin-top: 0px;">
														<b> Vou No </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:input path="chequePaidDocId" id="txtVouNo"
															class="col-md-10-1 form-control input-SmallText"
															type="text" name="txtVouNo" readonly="true"
															placeholder="Vou No"  required="true" />
														<div class='col-md-1-1 center'
															style='margin-top: -10px; margin-left: 177px; color: red;'>
															<b> *</b>
														</div>
													</div>
												       </div>    
                                              <div class="col-md-12-1 center" style="margin-top: 9px;">
														<!-- <div class="col-md-12-1 panel panel-default" style="margin-top: 0px;"> -->
														<form:radiobutton path="chequeTransType" name="theme"
															checked="true" value='0' id="rdoCashCredit"
															onclick="myFunction(0);" />
														<b>Cash</b>
														<form:radiobutton style="margin-left:2%;"
															path="chequeTransType" value='1' name="theme" id="rdoCash"
															onclick="myFunction(1);" />
														<b>Cheque</b>
																											
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
												<th class="col-md-1-1 center">Sr.</th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Vou.No</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Bill.No</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Bill.Date</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>vat%</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Bill.Amt</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Balance</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Amount</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Discount</div></th>
											</tr>
										</thead>
										<tbody id="ChquePaidEntryDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
											<tr>
												<td><label class='input-SmallText'>1</label></td>
												<td><input type='text'
													class='form-control input-SmallText' id="textVouType0"></td>

												<td><input type='text'
													class='form-control input-SmallText' id="textVouNo0"></td>
												<td><input type='text'
													class='form-control input-SmallText' id="textBillNo0"></td>
												<td><input type='text'
													class='form-control input-SmallText' id="textBillDate0"></td>

												<td><input type='text' readonly="true"
													class='form-control input-SmallText' id="textBillAmount0"></td>
												<td><input type='text' readonly="true"
													class='form-control input-SmallText' id="textBalance0"></td>

												<td><input type='text' readonly="true"
													class='form-control input-SmallText' id="textAmount0"></td>
												<td><input type='text' readonly="true"
													class='form-control input-SmallText' id="textDiscount0"
													onblur="toCreateChequeDiv('RowCount','1')"></td>
										</tbody>
									</table>
								</div>
								<div class="col-md-12-1" style="margin-top: 9px;">
									<div class="col-md-9-1" style="margin-top: 9px;">
										<div class="col-md-1-1" style="margin-top: 5px;">
											<b> Entry Made by </b>
										</div>
										<div class="col-md-6-1" style="margin-top: 9px;">
											<form:input path="chequePaidMadeBy" id="txtNameMadeBY"
												class="col-md-10-1 form-control input-SmallText" type="text"
												name="txtNameMadeBY" placeholder="Entry made by"
												onblur="isAlphaWithSpace('txtNameMadeBY',1,100);" />
											<br>
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


			<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
			<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>


		</div>
	</section>
	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>