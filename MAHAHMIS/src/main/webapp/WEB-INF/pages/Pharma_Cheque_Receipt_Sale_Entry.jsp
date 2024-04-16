<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
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
	<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>

<!-- Application js -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_patient.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Cheque_Receipt_Sale_Entry.js"/>"></script>
	<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>
	
<script>
var requestCount = 0;
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
		});
		
		
		function setValuesOfBranch(key) {
			
			var findingName = $("#txtBranch").val();
			var bankName = $("#searchBox2").val();
               
			if (bankName != "" || requestCount == 0) {
				requestCount++;
				var inputs = [];
				inputs.push('letter=' + findingName);

				jQuery
						.ajax({
							async : true,
							type : "GET",
							data : {
								letter : findingName,
								bankName : bankName,
							},
							url : "/EhatEnterprise/pharmacy/chequeReceiptPatientSale/autoSuggestionByBranch",
							timeout : 1000 * 60 * 15,
							cache : false,
							error : function() {
								alert('error');
							},
							success : function(r) {
								var availableTags = [];
								var resultData = [];

								/* alert("Hi1"); */
								
									for ( var i = 0; i <r.length; i++) 
									{
										/* for(var j=0;j<r[i].branchMasters.length;j++)
										{	 
											  */
											availableTags[i] = r[i].branchMasters[i].branchName
												+ '_'
												+ r[i].branchMasters[i].branchId ;
										 /*  } */ 	
									}

								var template = "";
								for ( var j = 0; j < availableTags.length; j++) {
									var arrValue = (availableTags[j]).split("_");
									var idValue = (arrValue[1]);
									resultData.push({
										ID : idValue,
										Name : arrValue[0]
									});

									template = template + '<li data-value="'
											+ (arrValue[1])
											+ '" class=""><a href="#">'
											+ arrValue[0] + '</a></li>';

								}
								/* $(".typeahead").html(template);
								$(".typeahead").show(); */

								setTimeout(function() {
									$("#div" + key + " .typeahead").html(template);
									$("#div" + key + " .typeahead").show();
									$('#txtBranch').typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true

									});

								}, 500);
							}
						});
			} else {

			}

		}	
		function displayResult(item) {
			var content = item.value.split("-");
			$('#ourBranchId').val(content[0]);
			
		}
		
		</script>
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
shortcut.add("Ctrl+s",function() {
	validateData(); 
});
</script>
<script>
		var requestCount1 = 0;<!-- onblur="isAlphaWithSpace('txtEntryMadeBY',0,100);" -->
function setValuesOfNextBranch1(key) {
			
			var findingName1 = $("#txtNextBranch1").val();
			var bankName1 = $("#searchBox3").val();
               
			if (bankName1 != "" || requestCount1 == 0) {
				requestCount1++;
				var inputs = [];
				inputs.push('letter=' + findingName1);

				jQuery
						.ajax({
							async : true,
							type : "GET",
							data : {
								letter : findingName1,
								bankName : bankName1,
							},
							url : "/EhatEnterprise/pharmacy/chequeReceiptPatientSale/autoSuggestionByBranch",
							timeout : 1000 * 60 * 15,
							cache : false,
							error : function() {
								alert('error');
							},
							success : function(r) {
								var availableTags = [];
								var resultData1 = [];

								/* alert("Hi1"); */
								
									for ( var i = 0; i <r.length; i++) 
									{
										for(var j=0;j<r[i].branchMasters.length;j++)
										{	 
											 
											availableTags[i] = r[i].branchMasters[i].branchName
												+ '_'
												+ r[i].branchMasters[i].branchId ;
										  } 	
									}

								var template1 = "";
								for ( var j = 0; j < availableTags.length; j++) {
									var arrValue = (availableTags[j]).split("_");
									var idValue = (arrValue[1]);
									resultData1.push({
										ID : idValue,
										Name : arrValue[0]
									});

									template1 = template1 + '<li data-value="'
											+ (arrValue[1])
											+ '" class=""><a href="#">'
											+ arrValue[0] + '</a></li>';

								}
								/* $(".typeahead").html(template1);
								$(".typeahead").show();
 */
								setTimeout(function() {
									$("#div" + key + " .typeahead").html(template1);
									$("#div" + key + " .typeahead").show();
									$('#txtNextBranch1').typeahead({
										source : resultData1,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult1,
										scrollBar : true

									});

								}, 600);
							}
						});
			} else {

			}

		}	
		
		function displayResult1(item) {
			var content1 = item.value.split("-");
			$('#branchId1').val(content1[0]);
			
		}
</script>
</head>

<%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
			"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
%>
<script>
function validateData() 
{
	if($('#searchBox1').val()!=null && $('#searchBox1').val()!="")
		{ 	
		if($('#patientId').val()!=null && $('#patientId').val()!="")
		{ 	
		 /*   if($('#txtAddress').val()!=null && $('#txtAddress').val()!="")
		   { 	
			   if($('#txtPhone').val()!=null && $('#txtPhone').val()!="")
			   {  */
				  if($('#searchBox2').val()!=null && $('#searchBox2').val()!="")
				   { 
					  if($('#bankId').val()!=null && $('#bankId').val()!="")
					   { 
					if($('#txtBranch').val()!=null && $('#txtBranch').val()!="")
					   { 
						if($('#ourBranchId').val()!=null && $('#ourBranchId').val()!="")
						   { 
						if($('#searchBox3').val()!=null && $('#searchBox3').val()!="")
						   { 
							if($('#bankId1').val()!=null && $('#bankId1').val()!="")
							   { 
							if($('#txtNextBranch1').val()!=null && $('#txtNextBranch1').val()!="")
							   { 
								if($('#branchId1').val()!=null && $('#branchId1').val()!="")
								   { 
								if($('#txtAmount').val()!=null && $('#txtAmount').val()!="")
								   { 
									if($('#txtChequeNo').val()!=null && $('#txtChequeNo').val()!="")
									   { 
								         if($('#chequeReceiptSaleId').val()!=null && $('#chequeReceiptSaleId').val()!="")
								         { 
									       alert("Record Updated Successfully!");	
									       $('#ChequeReceiptSaleMasterForm').submit();
									       window
											.open("/EhatEnterprise/pharmacy/chequeReceiptPatientSale/view"); 
								   }
								else
								  {     alert("Record Saved Successfully!");
								       $('#ChequeReceiptSaleMasterForm').submit();
								       window
										.open("/EhatEnterprise/pharmacy/chequeReceiptPatientSale/view"); 
								 	   		 	    
								  }
							   }
									else
									  {
										alert("Enter Cheque Number");
										 $('#txtChequeNo').focus();
									  }	
								   }
								else
								  {
									alert("Enter Amount");
									 $('#txtAmount').focus();
								  }	
							   }
								else
								  {
									alert("Pharmacy branch is not available");
									$('#txtNextBranch1').val('');
									 $('#txtNextBranch1').focus();
								  }	
							   }
							else
							  {
								alert("Enter pharmacy branch");
								 $('#txtNextBranch1').focus();
							  }	
						   }
							else
							  {
								alert("Pharmacy bank is not available");
								$('#searchBox3').val('');
								 $('#searchBox3').focus();
							  }	
						   }
						else
						  {
							alert("Enter pharmacy bank");
							 $('#searchBox3').focus();
						  }	
					   }
						else
						  {
							alert("Patient branch is not available");
							$('#txtBranch').val('');
							 $('#txtBranch').focus();
						  }	
					 }
					else
						  {
							alert("Enter patient Branch");
							 $('#txtBranch').focus();
						  }	
					 }
					else
					  {
						alert("Patient bank is not available");
						$('#searchBox2').val('');
						 $('#searchBox2').focus();
					  }	
					}
				
				
				else
				  {
					alert("Enter Patient Bank");
					 $('#searchBox2').focus();
				  }	
				}
			
			/* else
			  {
				alert("Enter Patient Phone");
				 $('#txtPhone').focus();
			  }	
		   }
		else
		  {
			alert("Enter Patient Address");
			 $('#txtAddress').focus();
		  }	
		
		} */
		else
		  {
			alert("Patient name is not available");
			$('#searchBox1').val('');
			 $('#searchBox1').focus();
		  }	
		
	}
	else
	  {
		alert("Enter Patient Name");
		 $('#searchBox1').focus();
	  }	
	
}
function validateSearch()
{
	if($('#searchBox').val()!=null && $('#searchBox').val()!="")
	{ 
		searchCheque($("#patientIdSearch").val());
	}
	else
	{	
		alert("Enter Patient Name in Search Box");
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
<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
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
											<li><i class="fa fa-home"></i> <a href="/EhatEnterprise/Dashboard.jsp">Home</a></li>
											<li><a href="/EhatEnterprise/pharmacy/pharmacy/transaction">Pharmacy</a></li>
											<li>Cheque Receipt Patient Sale Entry</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
												<div class="li pull-right" style="margin-left: 9px;">
												<button class="btn btn-xs btn-success" id="saveBtn"
													onclick="validateData();">Save and Print(Ctrl+S)</button>

											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->
							<div class="col-md-12-1">
								<div class='col-md-1-1'>Search By:</div>
								<div class='col-md-1-1'>Patient Name</div>
								<div class='col-md-2-1'>
									<input type="text" id='searchBox' name='searchBox'
										placeholder="Name"
										class="ui-autocomplete-input form-control input-SmallText col-md-12-1 margin-1"
										onblur="splitCheque($('#searchBox').val())" /> <input
										type="hidden" id="patientIdSearch">
								</div>

								<div class='col-md-2-1' style="margin-left: 9px;margin-top:-11px;">
									<input type="button" value="Search" class="edit"
										onclick='validateSearch();'>
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
																									url : "/EhatEnterprise/pharmacy/patient/autoSuggestionPatient",
																									
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
																											availableTags[i] = r[i].patName
																													+ "-"
																													+ r[i].patId
																													+ "-"
																													+ r[i].patAddress
																													+ "-"
																													+ r[i].patPhone;

																										}
																										response(availableTags);
																									}

																								});
																					}
																				});
															</script>

                                 

								</div>
							</div>
							<div class="row">
								<div class="panel-body col-md-12-1"></div>
								<div class="panel-body">
									<div id="chequeReceiptEntry" class="col-md-4-1"
										style="height: 150%; width: 100%; padding-left: 20px; border: 1px solid #b8b8b8;">
										<form:form commandName="chequeReceiptPatientSale"
											id="ChequeReceiptSaleMasterForm"
											action="/EhatEnterprise/pharmacy/chequeReceiptPatientSale/save"
											method="post">

											<div class="col-md-12-1" style="margin-top: 9px">
												<h4>Cheque Receipt Patient Sale Entry</h4>
											</div>

											<div class="col-md-4-1" style="margin-top: 9px;">
												<div class="col-md-12-1" style="margin-top: 0px;">
													<div class="col-md-2-1"
														style="margin-top: 4px; margin-bottom: 9px">
														<b>Patient Name</b>
													</div>
													<div class="col-md-7-1" style="margin-top: 0px;">
														<input type="text" id='searchBox1' name='searchBox1'
															placeholder="Patient Name" class="form-control input-SmallText"
															onblur="splitChequeReceiptEntryContent($('#searchBox1').val());" />
														<form:hidden id="patientId" path="patientMaster.patId" />
														<form:hidden path="chequeReceiptSaleId" id="chequeReceiptSaleId" />
                                                                <!-- ,isAlphaWithSpace('searchBox1',0,100) -->
														<script type="text/javascript">
															$("#searchBox1")
																	.autocomplete(
																			{
																				source : function(
																						request,
																						response) {

																					var findingName = $(
																							"#searchBox1")
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
																								url : "/EhatEnterprise/pharmacy/patient/autoSuggestionPatient",
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
																										availableTags[i] = r[i].patName
																												+ "-"
																												+ r[i].patId
																												+ "-"
																												+ r[i].patAddress
																												+ "-"
																												+ r[i].patMobile;

																									}
																									response(availableTags);
																								}

																							});
																				}
																			});
														</script>
														<div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
														</div>
													</div>

												</div>


												<div class="col-md-12-1" style="margin-top: 0px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b> Address</b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:textarea path="" readonly="true" id="txtAddress"
															style="width:97%;" placeholder="Address" class="col-md-11-1" name="txtAddress"
															tabindex="-1"></form:textarea>
														<br>
														<!-- <div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
														</div> -->
													</div>
												</div>

												<div class="col-md-12-1" style="margin-top: 9px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b> Phone </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:input path="" placeholder="Phone" readonly="true" id="txtPhone"
															class="form-control input-SmallText" type="text"
															name="txtPhone" tabindex="-1" />
														<br>
														<!-- <div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
														</div>
 -->													</div>
												</div>

												<div class="col-md-12-1"
													style="margin-top: 0px; margin-bottom: 10px;">
													<div class="col-md-2-1" style="margin-top: 0px;">
														<b> Patient Bank </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 0px;">
														<form:input type="text" id='searchBox2' name='searchBox2'
															placeholder="Bank" path="bankMaster.bankName"
															class="form-control input-SmallText"
															onblur="splitBank($('#searchBox2').val());" />
														<form:hidden id="bankId" path="bankMaster.bankId" />
                                                           <!--  ,isAlphaWithSpace('searchBox2',0,200) -->
														<script type="text/javascript">
															$("#searchBox2")
																	.autocomplete(
																			{
																				source : function(
																						request,
																						response) {

																					var findingName = $(
																							"#searchBox2")
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
																								url : "/EhatEnterprise/pharmacy/bank/autoSuggestionBankNames",
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
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
														</div>
													</div>
												</div>

												<div class="col-md-12-1"
													style="margin-top: 9px; margin-bottom: 10px;">
													<div class="col-md-2-1" style="margin-top: 0px;">
														<b> Branch </b>
													</div>
													<div id="divtxtBranch" class="col-md-7-1"
														style="margin-top: 0px;">
														<form:input type="text" id='txtBranch' name='txtBranch'
															path="branchMaster.branchName" placeholder="Branch"
															readonly="readonly" autocomplete="off"
															onkeyup="return setValuesOfBranch(this.id);"
															class="form-control input-SmallText" />
                                                               <!--  ,isAlphabet('txtBranch',0,200) -->
														<form:hidden id="ourBranchId" path="branchMaster.branchId" />

                                                  <div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
														</div>
													</div>

												</div>

												<div class="col-md-12-1"
													style="margin-top: 0px; margin-bottom: 10px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b> Narration </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:textarea path="chequeReceiptSaleNarration" placeholder="Narration"
															style="width:97%;" id="txtNaration" class="col-md-11-1"
															type="text" name="txtNaration"  />
														<br>
													</div>
													<!-- onblur="isAlphaWithDigitSpace('txtNaration',0,100)" -->
												</div>
												<div class="col-md-12-1" style="margin-top: 9px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b> Date </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 0px;">
														<form:input path="chequeReceiptSaleDate" id="txtCurrDate"
															class="form-control input-SmallText" type="text"
															readonly="true" name="txtCurrDate" placeholder="date"
															 value="<%=date%>"
															onclick="displayCalendar(document.getElementById('txtVouDate'),'dd/mm/yyyy',this)"
															tabindex="-1" />

													</div>
												</div>

												<div class="col-md-12-1" style="margin-top: 9px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b>Pharmacy Bank </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:input type="text" id='searchBox3' name='searchBox3'
															placeholder="Bank" path="bankMaster1.bankName"
															class="form-control input-SmallText" 
															onblur="splitBank1($('#searchBox3').val());" />
														<form:hidden id="bankId1" path="bankMaster1.bankId" />
                                                                   <!-- ,isAlphaWithSpace('searchBox3',1,200) -->
														<script type="text/javascript">
															$("#searchBox3")
																	.autocomplete(
																			{
																				source : function(
																						request,
																						response) {

																					var findingName = $(
																							"#searchBox3")
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
																								url : "/EhatEnterprise/pharmacy/bank/autoSuggestionBankNames",
																								timeout : 1000 * 60 * 5,
																								catche : false,
																								error : function() {
																									alert(error);
																								},
																								success : function(
																										r) {
																									var availableTags = [];
																									for ( var i = 0; i < r.length; i++) {
																								
																											availableTags[i] = r[i].bankName
																												+ "-"
																												+ r[i].bankId;																										}
																									
																									response(availableTags);
																								}
																							});
																				}
																			});
														</script>
														<div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
														</div>
													</div>
												</div>
												<div class="col-md-12-1" style="margin-top: 9px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b> Branch </b>
													</div>
													<div id="divtxtNextBranch1" class="col-md-7-1"
														style="margin-top: 9px;">
														<form:input path="branchMaster1.branchName" type="text"
															id="txtNextBranch1" autocomplete="off"
															name="txtNextBranch1" placeholder="Branch"
															onkeyup="return setValuesOfNextBranch1(this.id);"
															class="form-control input-SmallText" />
														<form:hidden id="branchId1" path="branchMaster1.branchId" />
														<div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
															<!-- ,isAlphabet('txtNextBranch1',0,200) -->
														</div>
													</div>
												</div>
												<div class="col-md-12-1"
													style="margin-top: 9px; margin-bottom: 10px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b> Amount </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:input path="chequeReceiptSaleAmt" type="text" placeholder="Amount"
															id="txtAmount" class="form-control input-SmallText" 
															name="txtAmount" onblur="isFloatingPoint('txtAmount',0,10);"/>
															<div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
														</div>
													</div>
												</div>

												<div class="col-md-12-1" style="margin-top: 0px;">
													<div class="col-md-2-1" style="margin-top: 9px;">
														<b> Cheque No </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:input path="chequeReceiptSaleNo" type="text"  placeholder="Cheque No"
															id="txtChequeNo" class="form-control input-SmallText"
															name="txtChequeNo" />
															<div class='col-md-1-1 center'
															style='margin-top: -12px; margin-left: 204px; color: red;'>
															<b> *</b>
															<!-- onblur="isNumber('txtChequeNo',0,10);" -->
														</div>
													</div>
												</div>



												<div class="col-md-12-1" style="margin-top: 9px;">
													<div class="col-md-2-1"
														style="margin-top: 9px; margin-bottom: 20px;">
														<b> Date </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 9px;">
														<form:input path="chequeReceiptSaleDate" id="popup_container2"
															class="form-control input-SmallText" type="text"
															placeholder="Date" name="chequeReceiptDate"
															value="<%=date%>" readonly="true"
															onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)" />
													</div>
												</div>
												<div class="col-md-12-1" style="margin-top: 9px;">
													<div class="col-md-2-1" style="margin-top: 5px;">
														<b> Entry Made by </b>
													</div>
													<div class="col-md-7-1" style="margin-top: 0px;">
														<form:input path="chequeReceiptSaleMadeBy" id="txtEntryMadeBY"
															class="form-control input-SmallText" type="text" 
															name="txtEntryMadeBY" placeholder="Entry made by" 
															/>
															<!-- onblur="isAlphaWithSpace('txtEntryMadeBY',0,100);" -->
														<br>
													</div>

												</div>
											</div>
										</form:form>
										<div class="col-md-5-1"
											style="width: 50%; max-height: auto; margin-left: 0%;">

											<table
												class="table table-striped table-bordered header-fixed cf "
												style="Width: 150%; margin-top: 5px;">
												<thead class="cf" style="background: white;">
													<tr>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Patient Name
															</div></th>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Amount
															</div></th>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Cheque
																No.</div></th>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Branch
															</div></th>
																<th style="height: 21.5px;" class="col-md-2 center"><div>Print</div></th>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Delete</div></th>
													</tr>
												</thead>
											
														<tbody id="divChequeList">
															<c:forEach items="${ltChequeReceiptSaleMasters}" var="row"
																varStatus="count">
																<tr>

																	<td class="col-md-1">${(count.index)+1}<input
																		type="hidden"
																		id="chequeReceiptSaleId${row.chequeReceiptSaleId}"
																		value="${row.chequeReceiptSaleId}"></td>

																	<td class="col-md-1">${row.patientMaster.patName} <input
																		type="hidden" id="PatName${row.chequeReceiptSaleId}"
																		value="${row.patientMaster.patName}">
																	</td>

																	<td style="display: none" id="txtDebit">${row.bankMaster1.bankName}
																		<input type="hidden"
																		id="bankName1${row.chequeReceiptSaleId}"
																		value="${row.bankMaster1.bankName}">
																	</td>
                                                                     <td style="display: none" id="txtDebit">${row.bankMaster.bankName}
																		<input type="hidden"
																		id="bankName${row.chequeReceiptSaleId}"
																		value="${row.bankMaster.bankName}">
																	</td>
																	<td class="col-md-1">${row.chequeReceiptSaleAmt} <input
																		type="hidden"
																		id="chequeReceiptSaleAmt${row.chequeReceiptSaleId}"
																		value="${row.chequeReceiptSaleAmt}">
																	</td>


																	<td class="col-md-1">${row.chequeReceiptSaleNo} <input
																		type="hidden"
																		id="chequeReceiptSaleNo${row.chequeReceiptSaleId}"
																		value="${row.chequeReceiptSaleNo}">
																	</td>


																	<td class="col-md-1">${row.branchMaster.branchName}
																		<input type="hidden"
																		id="OurbranchName${row.chequeReceiptSaleId}"
																		value="${row.branchMaster.branchName}">
																	</td>

																	<td style="display: none">${row.branchMaster1.branchName}
																		<input type="hidden"
																		id="branchName1${row.chequeReceiptSaleId}"
																		value="${row.branchMaster1.branchName}">
																	</td>

																	<td style="display: none"><c:set var="now2"
																			value="${row.chequeReceiptSaleDate}" /> <fmt:formatDate
																			value="${now2}" var="parsedDate" pattern="dd/MM/yyyy" />
																		<c:out value="${parsedDate}"></c:out> <input
																		type="hidden"
																		id="chequeReceiptSaleDate${row.chequeReceiptSaleId}"
																		value="<c:out value="${parsedDate}"></c:out>">

																	</td>

																	<td style="display: none">${row.patientMaster.patAddress}
																		<input type="hidden"
																		id="patientAddress${row.chequeReceiptSaleId}"
																		value="${row.patientMaster.patAddress}">
																	</td>

																	<td style="display: none">${row.patientMaster.patId}
																		<input type="hidden"
																		id="patientId${row.chequeReceiptSaleId}"
																		value="${row.patientMaster.patId}">
																	</td>


																	<td style="display: none">${row.bankMaster.bankId}
																		<input type="hidden" id="bankId${row.chequeReceiptSaleId}"
																		value="${row.bankMaster.bankId}">
																	</td>

																	<td style="display: none">${row.bankMaster1.bankId}
																		<input type="hidden"
																		id="bankId1${row.chequeReceiptSaleId}"
																		value="${row.bankMaster1.bankId}">
																	</td>

																	<td style="display: none">${row.branchMaster.branchId}
																		<input type="hidden"
																		id="branchId${row.chequeReceiptSaleId}"
																		value="${row.branchMaster.branchId}">
																	</td>

																	<td style="display: none">${row.branchMaster1.branchId}
																		<input type="hidden"
																		id="branchId1${row.chequeReceiptSaleId}"
																		value="${row.branchMaster1.branchId}">
																	</td>

																	<td style="display: none">${row.patientMaster.patName}
																		<input type="hidden"
																		id="patName${row.chequeReceiptSaleId}"
																		value="${row.patientMaster.patName}">
																	</td>

																	<td style="display: none">${row.patientMaster.patMobile}
																		<input type="hidden"
																		id="patientMobileNum${row.chequeReceiptSaleId}"
																		value="${row.patientMaster.patMobile}">
																	</td>

																	<td style="display: none">${row.chequeReceiptSaleNarration}
																		<input type="hidden"
																		id="chequeReceiptSaleNarration${row.chequeReceiptSaleId}"
																		value="${row.chequeReceiptSaleNarration}">
																	</td>


																	<td style="display: none">${row.chequeReceiptSaleMadeBy}
																		<input type="hidden"
																		id="chequeReceiptSaleMadeBy${row.chequeReceiptSaleId}"
																		value="${row.chequeReceiptSaleMadeBy}">
																	</td>

                                                                 <%--     <td class="col-md-2 center"><a
															id="btnPrint${row.chequeReceiptSaleId}" class="btn btn-xs btn-success"
															href="/EhatEnterprise/pharmacy/chequeReceiptPatientSale/printView?chequeReceiptSaleId=${row.chequeReceiptSaleId}">
																<i class="fa fa-print"></i>
															</a></td> --%>
															
															<td class="col-md-2 center"><button
															id="btnPrint${row.chequeReceiptSaleId}" class="btn btn-xs btn-success"
															onclick="chequeReceiptSalePrint(${row.chequeReceiptSaleId});">
																<i class="fa fa-print"></i>
															</button></td>

																	<td class="col-md-1 center">
																		<button id="btnEdit${row.chequeReceiptSaleId}"
																			class="btn btn-xs btn-success"
																			 onclick="edit(${row.chequeReceiptSaleId})" value="EDIT">
																			
																			<i class="fa fa-edit"></i>
																		</button>
																	</td>
																	<td class="col-md-1 center">
																		<button id="btnDeleteENtry"
																			class="btn btn-xs btn-success"
																			onclick="deleteCheque(${row.chequeReceiptSaleId})"
																			value="DELETE">
																			<i class="fa fa-trash-o"></i>
																		</button>
																	</td>
																</tr>
															</c:forEach>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>



						<div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
						<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
						<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div>


					</div>
				</div>
			</div>
			<input type="hidden" value="1" id="RowCount">
			<%@include file="Pharma_Footer.jsp"%>

			<div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
			<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div>


		</div>
		</div>

	</section>
</body>
</html>