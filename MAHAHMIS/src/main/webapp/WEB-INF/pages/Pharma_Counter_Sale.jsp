<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Counter Sale | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

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

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/css/morphext.css"/>">

<!-- JQUERY -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/bootbox.js"/>"></script>
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
	src="<c:url value="../.././pharma-resources/js/app_js/NewPharmacy.js"/>"></script>
<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jquery-validate/additional-methods.min.js"/>"></script> 
<!-- <script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
 <script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_counter_batch_popup.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Counter_Sale.js"/>"></script>

 <script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/morphext.min.js"/>"></script>

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
<script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxloader.js"/>"></script>

<%-- <script
	src="<c:url value="../.././pharma-resources/js/jqx-widgets/jqxwindow.js"/>"></script>
 --%>
<%-- <script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_alternate_product.js"/>"></script> --%>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_counter_batch_popup.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Counter_Sale.js"/>"></script>
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_alternate_product.js"/>"></script>
<!-- 	<script type="text/javascript" src="webcam/webcam.min.js"></script>
 -->	
 <script type="text/javascript"
	src="../.././webcam/webcam.min.js"/></script>
	
	
<%@include file="pharma_header.jsp"%>

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
		url(/pharma-resources/images/ajax_loader_blue_64.gif')
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
	function reset() {
		$("#toggleCSS")
				.attr("href",
						"<c:url value="/pharma-resources/alertify/alertify.default.css"/>");
		alertify.set({
			notifier : {
				// auto-dismiss wait time (in seconds)  
				delay : 5,
				// default position
				position : 'top-right'
			},
			labels : {
				ok : "OK",
				cancel : "Cancel"

			},
			delay : 5000,
			buttonReverse : false,
			buttonFocus : "ok"

		});

	}
</script>
<script>
	jQuery(document).ready(function() {
		//App.setPage("widgets_box");  //Set current page
		App.init(); //Initialise plugins and elements
		expiryBatches();
	});
	
	/* jQuery(document).ajaxStart(function() {
		
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		
	}); */
</script>

<%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
	"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
	
	//For on off flow 
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String print = (String)resourceBundleEhat.getString("pharmacyPrint");
%>
<script type="text/javascript">
	onload = function() {
		
		$("#textNo1").focus();
		$("#textNo1").val(1);
		changeCounterColor(1);
		$("#DivBank").hide();
		$("#sampleDiv").hide();
	    $("#DivChequeNum").hide();
		getLastCounterAmount();
		getLastBillNum();
		
		/* $("#js-rotating").Morphext({
			// The [in] animation type. Refer to Animate.css for a list of available animations.
			animation : "flash",
			// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
			separator : ".",
			// The delay between the changing of each phrase in milliseconds.
			speed : 500,
			complete : function() {
				// Called after the entrance animation is executed.
			}
		}); */

		/* $("#js-rotating").Morphext({
			animation : "flash",
			separator : ".",
			speed : 500,
			complete : function() {
			}
		}); */
		
		shortcut.add("Ctrl+l",function() {
			backToList('counterSale');
		});
		
		shortcut.add("Ctrl+s", function() {
			//saveDiscountMaster();
		     saveCounter();
		});
		
		shortcut.add("delete", function() {
			deleteRowOnFocus();
		});
		
		shortcut.add("Up", function() {
			setUpfocus();
		});
		
		shortcut.add("Down", function() {
			setDownfocus();
		});
		
		shortcut.add("Alt+a", function() {
			showAlternateProduct();
		});
		
		shortcut.add("Alt+p", function() {
		$("#sampleDiv").show();
		$("#HSTDiv").hide();
		$("#txtPoProductName").focus();
		getNextAutoIncrement();
		
	
		
		});
		
		shortcut.add("Alt+d", function() {
			$("#sampleDiv").hide();
			$("#HSTDiv").show();
			$('#sampleDiv').find('input:text').val('');
			$('#textMin').html('');
			$('#textStockQty').html('');
			$('#textVat').html('');
			$('#textPhoneNo').html('');

			});
		
		/* shortcut.add("f8", function() {
			window.open("/EhatEnterprise/pharmacy/indentSale/view-frm");

		});
		
		shortcut.add("f5", function() {
			window.open("/EhatEnterprise/pharmacy/purchase/view-frm");
		});

		shortcut.add("f7", function() {
			window.open("/EhatEnterprise/pharmacy/patientSale/view-frm");

		});  */
		
		$("#CounterSale").hide();
		$("#txtRatePerUnit").css('background', 'yellow');
		$("#newDiv").hide();
		$("#Counter_Patient_PopUp_Form").hide();
		$("#counterSaleForm").submit(function(event) {
			alertify.success("Record Saved Succesfully");
		});
		
	/* 	 setAutoSuggetionToVendor(null);
		 setValuesToAutocompleteForSale(null); */
	 	return setValuesToAutocomplete(null); 
	};
	
	
	
	/* $( "#saveNewDiv" ).click(function() {
		alert( "Handler for .click() called." );
		}); */
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
		
		
	function addCounterSale() {
		
					
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
							alert("Record Saved  Successfully!");
							$("#Counter_Patient_PopUp_Form").modal('hide');
							$('#counterSaleForm').submit();
							
						 
						}
						else
						{
							showAlert();
						}

			}
		function generatePrint()
		{
			window
			.open("../../pharmacy/counterSale/printView?counterSaleId="+$('#hiddenCounterSaleId').val());
			
		}
	
		function showAlert()
		{
			
			alert("Please Fill All the Details!");
		}
</script>
<script type="text/javascript">

</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
	
	
	java.text.SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	java.util.Calendar cal = java.util.Calendar.getInstance();
	String time=dateFormat.format(cal.getTime());
%>
</head>

<body style="background: white ! important;">
	<section id="page">
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->

		<%@include file="pharma_access_control.jsp"%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->
			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="Pharma_Counter_Sale_pop_up.jsp"%>
			<%@include file="pharma_alternative_product.jsp"%>
			<%@include file="pharma_view_expiry_product.jsp"%>

			<%@include file="HelpMenu.jsp"%>

			<div id="main-content">
				<div class="container">
					<c:set scope="session"
						value="${fn:length(counterSale.ltCounterSlave)}" var="slaveCount"></c:set>

					<form:form commandName="counterSale" id="counterSaleForm"
						action="../../pharmacy/counterSale/save" method="post">
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
												<li>Counter Sale</li>

												<li><span style="background-color: red" class="badge"
													id='storeTitle'><i class="fa fa-hospital-o"></i> <%
                             	if(session.getAttribute("pharmacyStoreName")!=null)
         											{
 %> <%=session.getAttribute("pharmacyStoreName")%> Store <%
 	}
         											else
         											{
 %> No Sub Store Selected <%
 	}
 %> </span></li>

												<%
													if(session.getAttribute("pharmacyStoreName")!=null)
																																																																																																					{
												%>
												<li><a onclick="invalidateSession()"><span
														style="background-color: red" class="badge"
														id='storeTitle'><i class="fa fa-hospital-o"></i>return
															to Main store <%
													}
												%> </span></a></li>



												<!-- <li><i class="fa fa-question"></i></li>
												<li><i class="fa fa-exclamation-circle"
													style="color: red;">12</i></li> -->
												<li class="li pull-right">
													<div class="li pull-right" style="margin-left: 9px;">
														<button type="button" class="btn btn-xs btn-success"
															onclick="newSaveCounter();">Save and Print(Ctrl+S)</button>
													</div>

													<div class="li pull-right" style="margin-left: 9px;">
														<a class="btn btn-xs btn-info"
															href="../../pharmacy/counterSale/view">Back
															to List(Ctrl+L)</a>
													</div>

													<div class="li pull-right">
														<a class="btn btn-xs btn-info"
															onclick="showAlternateProduct()">Alternate
															Product(Alt+a)</a>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>


								<c:choose>
									<c:when test="${slaveCount !=0}">
										<input type="hidden" id='hiddenCounterSaleId' name='searchBox'
											value="${counterSale.counterSaleId}" />

										<script type="text/javascript">
											generatePrint();
										</script>
									</c:when>
								</c:choose>

								<!-- /Common -->
								<!-- <div id="SearchContent" class="col-md-12-1"></div> -->
								<!-- <div class="divide-40"></div> -->
								<!-- <div class="col-md-12-1">
									<b id="title">Counter Sale</b>
								</div> -->

								<div class="row">
									<div class="col-md-12-1" style='margin-top: -3%'>
										<div class="panel-body">
											<div id="counterSale" class="col-md-4-1"
												style="height: 100%; width: 100%; padding-left: 10px; border: 1px solid #b8b8b8; background-color: wheat;">

												<div class="col-md-12-1" style="margin-top: 0px;">

													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b> Save No </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 3px;">
															<input id="txtSaveNumber" name="txtSaveNumber"
																class="form-control input-SmallText"
																placeholder="Save No" tabindex="1" autofocus="autofocus"
																autocomplete="off" value="1"
																onblur="isNumber('txtSaveNumber',0,10);" readonly=""
																type="text">
														</div>
													</div>

													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px; ">
															<b style="margin-left: 6px;"> For Date </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input path="counterSaleForDate" id="txtDate"
																class="form-control input-SmallText" type="text" style="margin-left: 10px;"
																readonly="true" name="txtDate" placeholder="Date" 
																required="true" value="<%=date%>"
																onclick="displayCalendar(document.getElementById('txtDate'),'dd/mm/yyyy',this)" />


														</div>
													</div>
													<div class="col-md-2-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b style="margin-left: 20px;"> Time </b>
														</div>
														<div class="col-md-7-1" style="margin-top: 3px;">

															<form:input path="counterSaleForTime" id="txtTime"
																class="form-control input-SmallText" type="text" style="margin-left: 15px; width: 125px;"
																name="txtTime" readonly="true" value="<%=time%>" />
														</div>
													</div>

													<div class="col-md-4-1" style="margin-top: 3px;">


														<form:radiobutton name="rdoCash"
															path="counterSaleTransType" checked="true" value='0' style="margin-left: 130px;"
															id="rdoCash" onclick="myFunction('0')" />
														<b>Cash</b>


														<form:radiobutton name="rdoCash"
															path="counterSaleTransType" value='1' id="rdoCashCredit"
															onclick="myFunction('1'),hideDetails();" />
														<b> Credit</b>


														<form:radiobutton name="rdoCash"
															path="counterSaleTransType" value='2' id="rdoCreditCard"
															onclick="myFunction('2'),hideChequeDetails(),showcardDetails();" />
														<b> Card</b>

														<form:radiobutton name="rdoCheque"
															path="counterSaleTransType" value='3' id="rdoCheque"
															onclick="myFunction('3'),hideCardDetails(),showDetails();" />
														<b>Cheque</b>

													</div>
												</div>
												<!-- 01  -->
												<div class="col-md-12-1" style="margin-top: 0px;">


													<div class="col-md-3-1 " style="margin-top: 3px;"
														id="DivBank">

														<div class="col-md-5-1" style="margin-top: 3px;">
															<b>Bank Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtBankName"
																path="counterTaxBankName" name="txtBankName"
																class="form-control input-SmallText"
																placeholder="Bank Name" />

														</div>


													</div>


													<div class="col-md-3-1 " style="margin-top: 0px;"
														id="DivChequeNum">

														<div class="col-md-5-1" style="margin-top: 3px;">
															<b>Cheque No</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtChequeNo"
																path="counterTaxChequeNo" name="txtChequeNo"
																class="form-control input-SmallText"
																placeholder="Cheque No" />

														</div>


													</div>

												</div>


												<div class="col-md-12-1" style="margin-top: 0px;">


													<div class="col-md-3-1 "
														style="margin-top: 3px; display: none;"
														id="DivBankforcard">

														<div class="col-md-5-1" style="margin-top: 3px;">
															<b>Bank Name</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtBankNameForcard"
																path="counterTaxBankName" name="txtBankNameForcard"
																class="form-control input-SmallText"
																placeholder="Bank Name" />

														</div>


													</div>


													<div class="col-md-3-1 "
														style="margin-top: 0px; display: none;" id="DivNoforcard">

														<div class="col-md-5-1" style="margin-top: 3px;">
															<b>Card No</b>
														</div>
														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtCardNo"
																path="counterTaxCardNo" name="txtCardNo"
																class="form-control input-SmallText"
																placeholder="Card No" />

														</div>


													</div>

												</div>

												<!-- 2 -->
												<div class="col-md-12-1" style="margin-top: 0px;">



													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b> Credit Note No </b>
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtCreditNoteNo"
																path="counterSaleCreditNoteNo" name="txtCreditNoteNo"
																class="form-control input-SmallText"
																placeholder="Credit Note No" />

														</div>
													</div>
													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b style="margin-left: 6px;"> Credit Note Amt </b>
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtCreditNoteAmt"
																path="counterSaleCreditNoteAmt" name="txtCreditNoteAmt"
																class="form-control input-SmallText" style="margin-left: 10px;"
																placeholder="Credit Note Amt" />

														</div>
													</div>

													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<!-- <b style="margin-left: 20px;"> Doctor </b> -->
															<label style="margin-left: 20px;"  >Doctor <b style="color: red; ">*</b></label>
															
															
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtDoctor"
																path="counterSaleDoctor" name="txtDoctor"
																class="form-control input-SmallText"
																placeholder="Doctor" />

														</div>
													</div>

													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b style="margin-left: 20px;"> Narration  </b>
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtNaration"
																path="counterSaleNaration" name="txtNaration"
																class="form-control input-SmallText"
																placeholder="Naration" />

														</div>
													</div>


												</div>

												<!-- 3 -->
												<div class="col-md-12-1" style="margin-top: 0px;">




													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b> Add Prescription </b>
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtPrescription"
																path="counterSalePrescription" name="txtPrescription"
																class="form-control input-SmallText"
																placeholder="Prescription" />

														</div>
													</div>

													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<label style="margin-left: 6px;"  >Patient Name  <b style="color: red; ">*</b></label>
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtName"
																path="counterSalePatientName" name="txtName"
																class="form-control input-SmallText" style="margin-left: 10px;" placeholder="Name" />

														</div>
													</div>

													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b style="margin-left: 20px;"> Address </b> <b style="color: red; ">*</b>
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtAddress"
																path="counterSaleAddress" name="txtAddress"
																class="form-control input-SmallText"
																placeholder="Address" />

														</div>
													</div>

													<div class="col-md-3-1" style="margin-top: 3px;">
														<div class="col-md-5-1" style="margin-top: 3px;">
															<b style="margin-left: 20px;"> Mobile </b>
														</div>

														<div class="col-md-7-1" style="margin-top: 3px;">
															<form:input type="text" id="txtMobile"
																path="counterSaleMobile" name="txtMobile"
																class="form-control input-SmallText"
																placeholder="Mobile" maxlength="10"
																onblur="isMobileNum('txtMobile');" />

														</div>
													</div>

												</div>

												<!-- 4 -->
												<div class="col-md-12-1" style="margin-top: 0px;"></div>



												<div class="col-md-12-1"
													style="margin-top: 9px; display: none">
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: -27px; background: green;">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>1</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems1"
																			class="form-control input-SmallText" name="txtItems1"> -->

																	<form:hidden id="hiddenTax5" path="counterTaxVat5" />
																	<form:hidden id="hiddenTax55" path="counterTaxVat55" />
																	<form:hidden id="hiddenTax12" path="counterTaxVat12" />
																	<form:hidden id="hiddenTax0" path="counterTaxVat0" />
																	<form:hidden id="hiddenTotalTax" path="counterTotalVat" />
																	<form:hidden id="hiddenTax6" path="counterTaxVat6" />
																	<form:hidden id="hiddenTax135" path="counterTaxVat135" />


																	<input type="hidden" id="hiddenPoType"
																		value="counterSalePurchaseOrder" />

																	<form:input path="" type="text" id="txtItems1"
																		name="txtItems1" class="form-control input-SmallText"
																		value="0" required="true" readonly="true"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount1"
																			class="form-control input-SmallText" name="txtAmount1"> -->

																	<form:input path="" type="text" id="txtAmount1"
																		value="0.000" name="txtAmount1" readonly="true"
																		class="form-control input-SmallText" required="true"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: yellow;">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>2</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems2"
																			class="form-control input-SmallText" name="txtItems2"> -->

																	<form:input path="" type="text" id="txtItems2"
																		readonly="true" name="txtItems2"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount2"
																			class="form-control input-SmallText" name="txtAmount2"> -->

																	<form:input path="" type="text" id="txtAmount2"
																		readonly="true" name="txtAmount2"
																		class="form-control input-SmallText" value="0.000"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: pink;">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>3</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems3"
																			class="form-control input-SmallText" name="txtItems3"> -->

																	<form:input path="" type="text" id="txtItems3"
																		readonly="true" name="txtItems3"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount3"
																			class="form-control input-SmallText" name="txtAmount3"> -->

																	<form:input path="" type="text" id="txtAmount3"
																		readonly="true" name="txtAmount3"
																		class="form-control input-SmallText" value="0.000"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: darkgray">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>4</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems1"
																			class="form-control input-SmallText" name="txtItems4"> -->

																	<form:input path="" type="text" id="txtItems4"
																		readonly="true" name="txtItems4"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount4"
																			class="form-control input-SmallText" name="txtAmount4"> -->

																	<form:input path="" type="text" id="txtAmount4"
																		readonly="true" name="txtAmount4"
																		class="form-control input-SmallText" value="0.000"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: lightblue;"
														id="fifthCounter">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>5</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems5"
																			class="form-control input-SmallText" name="txtItems5"> -->

																	<form:input path="" type="text" id="txtItems5"
																		readonly="true" name="txtItems5"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount5"
																			class="form-control input-SmallText" name="txtAmount5"> -->

																	<form:input path="" type="text" id="txtAmount5"
																		readonly="true" name="txtAmount5"
																		class="form-control input-SmallText" value="0.000"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
												</div>
												<%-- 		<div class="col-md-12-1" style="margin-top: 9px;">
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: green;">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>1</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems1"
																			class="form-control input-SmallText" name="txtItems1"> -->

																	<form:input path="" type="text" id="txtItems1"
																		name="txtItems1" class="form-control input-SmallText"
																		value="0" required="true" readonly="true"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount1"
																			class="form-control input-SmallText" name="txtAmount1"> -->

																	<form:input path="" type="text" id="txtAmount1"
																		value="0.00" name="txtAmount1" readonly="true"
																		class="form-control input-SmallText" required="true"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: yellow;">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>2</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems2"
																			class="form-control input-SmallText" name="txtItems2"> -->

																	<form:input path="" type="text" id="txtItems2"
																		readonly="true" name="txtItems2"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount2"
																			class="form-control input-SmallText" name="txtAmount2"> -->

																	<form:input path="" type="text" id="txtAmount2"
																		readonly="true" name="txtAmount2"
																		class="form-control input-SmallText" value="0.00"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: pink;">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>3</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems3"
																			class="form-control input-SmallText" name="txtItems3"> -->

																	<form:input path="" type="text" id="txtItems3"
																		readonly="true" name="txtItems3"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount3"
																			class="form-control input-SmallText" name="txtAmount3"> -->

																	<form:input path="" type="text" id="txtAmount3"
																		readonly="true" name="txtAmount3"
																		class="form-control input-SmallText" value="0.00"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: darkgray">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>4</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems1"
																			class="form-control input-SmallText" name="txtItems4"> -->

																	<form:input path="" type="text" id="txtItems4"
																		readonly="true" name="txtItems4"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount4"
																			class="form-control input-SmallText" name="txtAmount4"> -->

																	<form:input path="" type="text" id="txtAmount4"
																		readonly="true" name="txtAmount4"
																		class="form-control input-SmallText" value="0.00"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
													<div id="CounterSale" class="col-md-3-1 panel panel-default"
														style="margin-top: 9px; margin-bottom: 10px; background: lightblue; ">
														<div class="col-md-2-1 center" style="margin-top: 9px;">
															<h4>5</h4>
														</div>
														<div class="col-md-10-1 " style="margin-top: 9px;">
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1 " style="margin-top: 9px;">
																	<b>Items </b>
																</div>
																<div class="col-md-7-1" style="margin-top: 9px;">
																	<!-- <input type="text" id="txtItems5"
																			class="form-control input-SmallText" name="txtItems5"> -->

																	<form:input path="" type="text" id="txtItems5"
																		readonly="true" name="txtItems5"
																		class="form-control input-SmallText" value="0"
																		style='color:blue;' />
																</div>
															</div>
															<div class="col-md-12-1" style="margin-top: 9px;">
																<div class="col-md-5-1" style="margin-top: 9px;">
																	<b> Amount </b>
																</div>
																<div class="col-md-7-1"
																	style="margin-top: 9px; margin-bottom: 10px;">
																	<!-- <input type="text" id="txtAmount5"
																			class="form-control input-SmallText" name="txtAmount5"> -->

																	<form:input path="" type="text" id="txtAmount5"
																		readonly="true" name="txtAmount5"
																		class="form-control input-SmallText" value="0.00"
																		style='color:blue;' />
																</div>
															</div>
														</div>
													</div>
												</div> --%>
											</div>
										</div>
									</div>
								</div>

								<%
									if (request.getParameter("msg") != null) {
								%>

								<script type="text/javascript">
									
								</script>

								<%
									} else {
								%>
								<div id="resultDiv"></div>
								<%
									}
								%>

								<div id="HSTDiv"
									style="width: 100%; height: 250Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">

									<div class="col-md-12-1">
										<input type="button" value="-" class="btn btn-xs btn-success"
											style="margin: 7px; float: right" onclick="deleteRow();">
									</div>
									<table id="ItemInfoTable" cellpadding="0" cellspacing="0"
										border="1"
										class="table table-bordered table-striped table-condensed">
										<thead>
											<tr id="h">
												<th class="col-md center">Counter No</th>
												<th class='col-md-1 center' style='height: 21.5px;'><div
														class='TextFont'>Barcode</div></th>
												<th class='col-md-2 center' style='height: 21.5px;'><div
														class='TextFont'>Product Name</div></th>
												<th class='col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Unit</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Pack</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Prep</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Company</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Batch No.</div></th>

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Expiry Date</div></th>
												<th class=' col-md center' style='height: 21.5px;'><div
														class='TextFont'>GST%</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>MRP</div></th>
												<th class=' col-md-1-1 center'
													style='height: 21.5px; display: none;'><div
														class='TextFont'>Rate</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Disc(%)</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Stock</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Quantity</div></th>
												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Amount</div></th>
														
																							<div class="col-md-12">
										<div class="form-group">
											<center>
												<div class="col-md-6 ">
													<button id="cameraClick" style="display: none;"  class="btn btn-xs btn-success"
														onclick="assignCamera()" data-toggle="modal"
														data-target="#cameraModal">Click</button>
												</div>
												<div class="col-md-6">
													<button class="btn btn-xs btn-warning" style="display: none;" data-toggle="modal" data-target="#prescriptionPhotoModal">Browse</button>
												</div>
											</center>
										</div>
										
										<!-- popup modal of status for investigation test send to  RIS from OPDBill -->
										<div id="prescriptionPhotoModal"  class="popup modal fade in" tabindex="-1"
											role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
											<div class="modal-dialog" style="width: 500px;">
												<div class="modal-content">
													<div class="modal-header">
														<div class="box-title">
															<h4>Upload Prescription Photo</h4>
														</div>
													</div>
													<div class="modal-body">
														<div class="row">
															<div class="col-md-12">
																<!-- BOX -->
																<div class="box-body">
																	<!--Panel Body-->
																	<form id="prescriptionPhoto" name="prescriptionPhoto" class="" enctype="multipart/form-data" method="post">
																		<input type="file" class="form-control" name="changePrescriptionPhoto" id="changePrescriptionPhoto">
																	</form>
																</div>
															</div>
															<!-- /BOX-->
														</div>
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-xs btn-warning" onclick="uploadPatientPhoto()">Upload</button>
														<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
													</div>
												</div>
												<!-- /BODY-->
											</div>
										</div>

									</div>
														

												<th class=' col-md-1-1 center' style='height: 21.5px;'><div
														class='TextFont'>Select</div></th>
														
											</tr>
										</thead>
										<tbody id="DRRDiv"
											style="height: 87%; overflow-y: scroll; border: 1px solid;">

											<c:choose>
												<c:when test="${slaveCount ==0}">
													<input type='hidden' id='hiddenCurrentRow' value='1' />
													<tr id="remove1">
														<td id="password"><form:input type='text'
																path="ltCounterSlave[0].counterSlaveNo"
																class='form-control input-SmallText # deleteGroup1 # textNoDelete'
																name="textNo1" id="textNo1"
																onkeyup='changeCounterColor(1);'
																onblur="isNumber('textNo1'),chkPassword(1);"
																maxlength="1" /></td>
														<td><form:input type='text' path=""
																onblur="isNumber('textBarcode1',0,7),fetchProductNameByBarcode(this.value,1)"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textBarcode1" name='textBarcode1' autocomplete="off" /></td>

														<td><form:hidden id="counterSlaveId1"
																path="ltCounterSlave[0].counterSlaveId" /> <form:hidden
																id="hiddenProductId1"
																path="ltCounterSlave[0].productMaster.productId" /> <form:input
																type='text'
																path="ltCounterSlave[0].productMaster.productName"
																class="form-control input-SmallText typeheadCounterPo1"
																id="textProductName1" name='txtProductName'
																onkeypress="return setValuesToAutocomplete(event,1)"
																autocomplete="off" /> <form:hidden
																id="textcounterSlaveVatAmt1"
																path="ltCounterSlave[0].counterSlaveVatAmt" /> <form:hidden
																id="textDis1" path="ltCounterSlave[0].counterSlaveDisc" />

															<form:hidden id="textDisAmtPerUnit1"
																path="ltCounterSlave[0].counterSlaveDiscAmt" /> <form:hidden
																id="textRateForPrint1"
																path="ltCounterSlave[0].counterSlaveRateForPrint" /> <form:hidden
																id="textIssueQty1"
																path="ltCounterSlave[0].counterSaleSlaveIssueQty" /></td>


														<td><form:input type='text'
																path="ltCounterSlave[0].productMaster.productUnit"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textUnit1" name='textUnit1' readonly="true"
																tabindex="-1" /></td>
														<td><form:input type='text'
																path="ltCounterSlave[0].productMaster.packingMaster.packType"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textPack1" name='textPack1' readonly="true"
																tabindex="-1" /></td>

														<td><form:input type='text'
																class='form-control input-SmallText # deleteGroup1 # textNo'
																path="ltCounterSlave[0].productMaster.preparationMaster.preparationName"
																style='' id='txtPre1' name='txtPre1' maxlength='6'
																readonly="true" /></td>

														<td><form:input type='text'
																path="ltCounterSlave[0].productMaster.companyMaster.compName"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textCom1" name='textCom1' readonly="true"
																tabindex="-1" /></td>

														<td><form:input type='text'
																path="ltCounterSlave[0].counterSaleBatchCode"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textBatchNo1" name='textBatchNo1' readonly="true"
																tabindex="-1" /></td>

														<td><form:input type='text'
																path="ltCounterSlave[0].counterSaleBatchExpiry"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textExp1" name='textExp1' readonly="true"
																tabindex="-1" /></td>

														<td><form:input type='text'
																path="ltCounterSlave[0].counterSlaveVat"
																id="textNewVat1"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																name='textNewVat1' readonly="true" tabindex="-1" /> <form:input
																type='hidden' path="ltCounterSlave[0].counterSlaveVatid"
																id="hiddenvatId1"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																name='hiddenvatId1' readonly="true" tabindex="-1" /></td>

														<td><form:input type='text'
																path="ltCounterSlave[0].counterSlaveMrp"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textMrp1" name='textMrp1' readonly="true"
																tabindex="-1" /></td>

														<td style="display: none;"><form:input type='text'
																path="ltCounterSlave[0].counterSlaveRate"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textRate1" name='textRate1' readonly="true"
																tabindex="-1" /></td>

														<td><form:input id="textDiscount1"
																path="ltCounterSlave[0].counterSlaveDisc"
																class="form-control input-SmallText # deleteGroup1 # textNo"
																onblur="disc(1)" type="text"></form:input></td>

														<td style="display: none;"><form:input
																path="ltCounterSlave[0].productMaster.batchMaster[0].batchId"
																type="text" id="textBatchId1" name="textBatchId1"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																readonly="true" /> <form:input
																path="ltCounterSlave[0].productMaster.batchMaster[0].stockMaster.stockId"
																type="text" id="textStockId1" name="textStockId1"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																readonly="true" /> <form:input type='text' path=""
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textRatePerUnit1" name='textRatePerUnit1'
																readonly="true" /> <form:input
																path="ltCounterSlave[0].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
																type="text" id="textStockQtyInHand1"
																name="textStockQtyInHand1"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																readonly="true" /></td>

														<td style="display: none;"><form:input type='text'
																path="ltCounterSlave[0].productMaster.shelfMaster.shelfName"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textShelf1" name='textShelf1' readonly="true" /></td>

														<td><input id="textClStk1"
															class="form-control input-SmallText # deleteGroup1 # textNo"
															type="text" readonly tabindex="-1" /></td>

														<td><form:input type='text'
																path="ltCounterSlave[0].counterSlaveQty"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textQty1" name='textQty1'
																onblur="isNumber('textQty1'),calculateAmt(1)" /></td>
														<!-- calculateAmt(1); -->

														<td><form:input type='text'
																path="ltCounterSlave[0].counterSlaveAmt"
																class='form-control input-SmallText # deleteGroup1 # textNo'
																id="textAmount1" name='textAmount1' readonly="true"
																tabindex="-1" /></td>

														<td><input type="checkbox"
															class='form-control input-SmallText # deleteGroup1 # textNo'
															name="deleteGroup" value="1" id="deleteGroup1"></td>

														<td style="display: none;"><input id="textContent1"
															class="form-control input-SmallText # deleteGroup1 # textNo"
															type="text" readonly /> <!-- <input id="textRatePerUnit1"
															class="form-control input-SmallText" type="text" readonly /> -->
															<input id="textTotalStk1"
															class="form-control input-SmallText # deleteGroup1 # textNo"
															type="text" readonly /> <input id="textPurchaseRate1"
															class="form-control input-SmallText # deleteGroup1 # textNo"
															type="text" readonly /> <input id="textDisAmt1"
															class="form-control input-SmallText # deleteGroup1 # textNo"
															type="text" readonly /> <input id="textProductH11"
															class="form-control input-SmallText # deleteGroup1 # textNo"
															type="text" readonly /></td>


													</tr>
												</c:when>

												<c:when test="${slaveCount !=0}">
													<c:forEach items="${counterSale.ltCounterSlave}" var="row"
														varStatus="count">
														<tr id="remove${count.index+1}">
															<td id="password"><input type='hidden'
																id='hiddenCurrentRow' value='${count.index+1}' /> <form:input
																	type='text'
																	path="ltCounterSlave[${(count.index)}].counterSlaveNo"
																	class='form-control input-SmallText'
															      name="textNo${count.index+1}"
																	id="textNo${count.index+1}"
																	onkeyup='changeCounterColor(${count.index+1});'
																	onblur="isNumber('textNo${(count.index)}'),chkPassword('${(count.index)}');"
																	maxlength="1" /> <form:hidden
																	id="textDis${count.index+1}"
																	path="ltCounterSlave[${count.index+1}].counterSlaveDisc" />

																<form:hidden id="textDisAmtPerUnit${count.index+1}"
																	path="ltCounterSlave[${count.index+1}].counterSlaveDiscAmt" />

																<form:hidden id="textIssueQty${count.index+1}"
																	path="ltCounterSlave[${count.index+1}].counterSaleSlaveIssueQty" />

																<form:hidden id="textRateForPrint${count.index+1}"
																	path="ltCounterSlave[${count.index+1}].counterSlaveRateForPrint" />
															</td>


															<td><form:hidden id="counterSlaveId${count.index+1}"
																	path="ltCounterSlave[${(count.index)}].counterSlaveId" />
																<form:hidden id="hiddenProductId${count.index+1}"
																	path="ltCounterSlave[${(count.index)}].productMaster.productId" />
															<td><form:input type='text' path=""
																	class='form-control input-SmallText'
																	id="textBarcode${count.index+1}"
																	name='textBarcode${count.index+1}'
																	onblur="fetchProductNameByBarcode(this.value)"
																	autocomplete="off" /></td>
															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].productMaster.productName"
																	class='form-control input-SmallText'
																	id="textProductName${count.index+1}"
																	name='textProductName${count.index+1}'
																	data-target="#Counter_PopUp_Form"
																	onclick="load(${count.index+1})" autocomplete="off" />

															</td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].productMaster.productUnit"
																	class='form-control input-SmallText'
																	id="textUnit${count.index+1}"
																	name='textUnit${count.index+1}' readonly="true"
																	tabindex="-1" /></td>
															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].productMaster.packingMaster.packType"
																	class='form-control input-SmallText'
																	id="textPack${count.index+1}"
																	name='textPack${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td><form:input type='text'
																	class='form-control input-SmallText'
																	path="ltCounterSlave[${count.index}].productMaster.preparationMaster.preparationName"
																	style='' id='txtPre${count.index+1}'
																	name='txtPre${count.index+1}' maxlength='6'
																	readonly="true" /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].productMaster.companyMaster.compName"
																	class='form-control input-SmallText'
																	id='textCom${count.index+1}'
																	name='textCom${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].counterSaleBatchCode"
																	class='form-control input-SmallText'
																	id="textBatchNo${count.index+1}"
																	name='textBatchNo${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].counterSaleBatchExpiry"
																	class='form-control input-SmallText'
																	id="textExp${count.index+1}"
																	name='textExp${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].counterSlaveVat"
																	id="textNewVat${count.index+1}"
																	class='form-control input-SmallText'
																	name='textNewVat${count.index+1}' readonly="true"
																	tabindex="-1" /> <form:input type='hidden'
																	path="ltCounterSlave[${(count.index)}].counterSlaveVatid"
																	id="hiddenvatId${count.index+1}"
																	class='form-control input-SmallText'
																	name='hiddenvatId${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].counterSlaveMrp"
																	class='form-control input-SmallText'
																	id="textMrp${count.index+1}"
																	name='textMrp${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].counterSlaveRate"
																	class='form-control input-SmallText'
																	id="textRate${count.index+1}"
																	name='textRate${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td style="display: none;"><form:input
																	path="ltCounterSlave[${(count.index)}].productMaster.batchMaster[0].batchId"
																	type="text" id="textBatchId${count.index+1}"
																	name="textBatchId${count.index+1}"
																	class='form-control input-SmallText' readonly="true" />
																<form:input
																	path="ltCounterSlave[${(count.index)}].productMaster.batchMaster[0].stockMaster.stockId"
																	type="text" id="textStockId${count.index+1}"
																	name="textStockId${count.index+1}"
																	class='form-control input-SmallText' readonly="true" />
																<form:input
																	path="ltCounterSlave[${(count.index)}].productMaster.batchMaster[0].stockMaster.stockQtyInHand"
																	type="text" id="textStockQtyInHand${count.index+1}"
																	name="textStockQtyInHand${count.index+1}"
																	class='form-control input-SmallText' readonly="true" /></td>

															<td style="display: none;"><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].productMaster.shelfMaster.shelfName"
																	class='form-control input-SmallText'
																	id="textShelf${count.index+1}"
																	name='textShelf${count.index+1}' readonly="true" /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].counterSlaveQty"
																	class='form-control input-SmallText'
																	id="textQty${count.index+1}"
																	name='textQty${count.index+1}' /></td>

															<td><form:input type='text'
																	path="ltCounterSlave[${(count.index)}].counterSlaveAmt"
																	class='form-control input-SmallText'
																	id="textAmount${count.index+1}"
																	name='textAmount${count.index+1}' readonly="true"
																	tabindex="-1" /></td>

															<td><input type="checkbox" name="deleteGroup"
																value="${count.index+1}"
																id="deleteGroup${count.index+1}"></td>

															<td style="display: none;"><input
																id="textClStk${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /> <input id="textContent${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /> <input id="textRatePerUnit${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /> <input id="textTotalStk${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /> <input
																id="textPurchaseRate${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /> <input id="textDisAmt${count.index+1}"
																class="form-control input-SmallText" type="text"
																readonly /></td>

														</tr>
													</c:forEach>

												</c:when>
											</c:choose>
										</tbody>
									</table>
								</div>


								<%@include file="pharma_sale_purchase_order.jsp"%>

								<div id="oldDiv" class="col-md-12-1" style="margin-top: -8px;">
									<div class="col-md-4-1" style="margin-top: 9px;">
										<div class="col-md-5-1" style="margin-top: 9px;">
											<b>Last Counter Amt</b>
										</div>
										<div class="col-md-5-1" style="margin-top: 9px;">
											<input type="text" id="txtLastCounterAmt"
												name="txtLastCounterAmt"
												class="form-control input-SmallText"
												placeholder="Last Counter Amt" tabindex="-1" readonly>
										</div>
										<div class="col-md-5-1" style="margin-top: 9px;">
											<b>Enter By Name</b>
										</div>
										<div class="col-md-5-1" style="margin-top: 9px;">
											<form:input type="text" id="txtEnterByName"
												name="txtEnterByName" path="counterSaleEnteredBy"
												class="form-control input-SmallText"
												placeholder="Enter By Name"  />
										</div>
									</div>
									<div class="col-md-4-1" style="margin-top: 9px;">
										<div class="col-md-5-1" style="margin-top: 9px;">
											<b>Last Bill No</b>
										</div>
										<div class="col-md-5-1" style="margin-top: 9px;">
											<input type="text" id="txtLastBillNo" name="txtLastBillNo"
												class="form-control input-SmallText"
												placeholder="Last Bill No" tabindex="-1" readonly>
										</div>
									</div>
									<!--  <div class="col-md-4-1" style="margin-top: 9px;">
										<div class="li pull-right"  style="margin-top: 9px;"><a
													class="btn btn-warning"
													onclick="viewAllExpiryProduct()">View All Expiry Product</a></div>		
									</div> -->

									<div class="col-md-4-1" style="margin-top: 9px;">
										<div class="col-md-5-1" style="margin-top: 9px;">
											<b>GrossAmt</b>
										</div>
										<div class="col-md-5-1" style="margin-top: 9px;">
											<form:input type="text" id="txtGrossAmount" path=""
												readonly="true" name="txtGrossAmount"
												class="form-control input-SmallText" placeholder="Gross Amt" />
										</div>
										<div class="col-md-5-1" style="margin-top: 9px;">
											<b>Net Amt</b>
										</div>
										<div class="col-md-5-1" style="margin-top: 9px;">
											<form:input type="text" id="txtNetAmount" path=""
												readonly="true" name="txtNetAmount"
												class="form-control input-SmallText" placeholder="Net Amt" />
										</div>
									</div>
								</div>


								<div id="newDiv" class="col-md-12-1"
									style="margin-top: 9px; margin-bottom: 30px; background: darkgray;">
									<div class="col-md-6-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 9px;">
											<b>Save No</b>
										</div>
										<div class="col-md-3-1"
											style="margin-top: 9px; margin-left: 8%;">
											<form:input type="text" id="txtSaveNo" name="txtSaveNo"
												path="" class="form-control input-SmallText"
												placeholder="Save No" value="1" maxlength="1"
												onblur="isNumber('txtSaveNo',0,10),displayGrossAmt(),checkCounterNumber(this.value),calculateTotalPurchase();" />
										</div>
									</div>
									<div class="col-md-6-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 9px;">
											<b>Gross Amt</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 9px;">
											<form:input path="counterSaleGrossAmt" type="text"
												id="txtGrossAmt" name="txtGrossAmt" readonly="true"
												class="form-control input-SmallText" placeholder="Gross Amt"
												required="true" />
										</div>
									</div>
									<div class="col-md-6-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 9px;">
											<b>Total P.Rate</b>
										</div>
										<div class="col-md-3-1"
											style="margin-top: 9px; margin-left: 8%;">

											<form:input type="text" id="txtTotalPurchase"
												name="txtTotalPurchase" path=""
												class="form-control input-SmallText"
												placeholder="Total Purchase" maxlength="1" readonly="true" />

										</div>
									</div>
									<div class="col-md-6-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 9px;">
											<b>Net Amount</b>
										</div>
										<div class="col-md-4-1"
											style="margin-top: 9px; margin-left: 0%;">
											<form:input path="counterSaleNetAmt" type="text"
												id="txtNetAmt" name="txtNetAmt" readonly="true"
												class="form-control input-SmallText"
												placeholder="Net Amount" required="true" />
										</div>
									</div>
								</div>
								<div id="batchScroll" class="col-md-12-1"
									style="margin-top: 9px;">
									<!-- <div class="col-md-6-1" style="margin-top: 9px;">
										<div class="col-md-2-1" style="margin-top: 9px;">
											<b></b>
										</div>
										<div class="col-md-3-1"
											style="margin-top: 9px; margin-left: 8%;">
											<marquee id='expiryBatches'>Expiring Batches</marquee>
										</div>
									</div> -->
									<div class="col-md-6-1"
										style="margin-top: 9px; margin-bottom: 30px; width: 85%; background: sandybrown;">
										<marquee id='expiryBatches'>Expiring Batches</marquee>
									</div>
									<div class="col-md-4-1"
										style="margin-top: 9px; margin-left: 64%;">
										<div class="li pull-right" style="margin-top: -60px;">
											<a class="btn btn-warning" onclick="viewAllExpiryProduct()">View
												All Expiry Product</a>
										</div>
									</div>

								</div>


								<%-- <div id="Counter_Patient_PopUp_Form" class="modal fade in">
									<div class="modal-dialog" style="width: 600px; hight: 1000px;">
										<div id="PopDiv" class="modal-content col-md-9">

											<div class="modal-header  col-md-12">
												<div class="box-title  col-md-8 center">
													<h4>
														<i class="fa fa-calendar"></i>Counter Sale
													</h4>
												</div>
											</div>
											<div class="modal-body col-md-12-1">
												<div class="col-md-12-1">
													<div class="col-md-12-1" style="margin-top: 9px;">
														<div class="col-md-12-1" style="margin-top: 9px;">
															<div class="col-md-4-1" style="margin-top: 0px;">

																<label for="product">Save No</label> <input type="text"
																	id="txtSaveNumber" name="txtSaveNumber"
																	class="form-control input-SmallText"
																	placeholder="Save No" tabindex="1"
																	autofocus="autofocus" autocomplete="off"
																	onblur="isNumber('txtSaveNumber',0,10);" readonly />

															</div>
														</div>

													</div>

													<div class="col-md-12-1 center" style="margin-top: 9px;">

														<form:radiobutton name="rdoCash"
															path="counterSaleTransType" checked="true" value='0'
															id="rdoCash" onclick="myFunction('0');" />
														<b>Cash</b>


														<form:radiobutton name="rdoCash"
															path="counterSaleTransType" value='1' id="rdoCashCredit"
															onclick="myFunction('1'),hideDetails();" />
														<b>Cash Credit</b>


														<form:radiobutton name="rdoCash"
															path="counterSaleTransType" value='2' id="rdoCreditCard"
															onclick="myFunction('2'),hideDetails();" />
														<b>Credit Card</b>

														<form:radiobutton name="rdoCheque"
															path="counterSaleTransType" value='3' id="rdoCheque"
															onclick="myFunction('3'),showDetails();" />
														<b>Cheque</b>
													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;">
														<div class="col-md-6-1" style="margin-top: 9px;">
															<div class="col-md-4-1" style="margin-top: 9px;">
																<b>Credit Note No</b>
															</div>
															<div class="col-md-7-1" style="margin-top: 9px;">
																<form:input type="text" id="txtCreditNoteNo"
																	path="counterSaleCreditNoteNo" name="txtCreditNoteNo"
																	class="form-control input-SmallText"
																	placeholder="Credit Note No" />
																
															</div>
														</div>
														<div class="col-md-6-1" style="margin-top: 9px;">
															<div class="col-md-4-1" style="margin-top: 9px;">
																<b>Credit Note Amt</b>
															</div>
															<div class="col-md-7-1" style="margin-top: 9px;">
																<form:input type="text" id="txtCreditNoteAmt"
																	path="counterSaleCreditNoteAmt" name="txtCreditNoteAmt"
																	class="form-control input-SmallText"
																	placeholder="Credit Note Amt" />
																
															</div>
														</div>
													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;">
														<div class="col-md-6-1" style="margin-top: 9px;">
															<div class="col-md-4-1" style="margin-top: 9px;">
																<b>GrossAmt</b>
															</div>
															<div class="col-md-7-1" style="margin-top: 9px;">
																<form:input type="text" id="txtGrossAmount" path=""
																	readonly="true" name="txtGrossAmount"
																	class="form-control input-SmallText"
																	placeholder="Gross Amt" />
															</div>
														</div>
														<div class="col-md-6-1" style="margin-top: 9px;">
															<div class="col-md-4-1" style="margin-top: 9px;">
																<b>Net Amt</b>
															</div>
															<div class="col-md-7-1" style="margin-top: 9px;">
																<form:input type="text" id="txtNetAmount" path=""
																	readonly="true" name="txtNetAmount"
																	class="form-control input-SmallText"
																	placeholder="Net Amt" />
															</div>
														</div>
													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Add Prescription</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtPrescription"
																path="counterSalePrescription" name="txtPrescription"
																class="form-control input-SmallText"
																placeholder="Prescription" />
															
														</div>

													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Patient Name</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtName"
																path="counterSalePatientName" name="txtName"
																class="form-control input-SmallText" placeholder="Name" />
															
														</div>

													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Address</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtAddress"
																path="counterSaleAddress" name="txtAddress"
																class="form-control input-SmallText"
																placeholder="Address" />
															
														</div>

													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Mobile</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtMobile"
																path="counterSaleMobile" name="txtMobile"
																class="form-control input-SmallText"
																placeholder="Mobile" maxlength="10"
																onblur="isMobileNum('txtMobile');" />
														</div>

													</div>


													<div class="col-md-12-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Doctor</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtDoctor"
																path="counterSaleDoctor" name="txtDoctor"
																class="form-control input-SmallText"
																placeholder="Doctor" />
															
														</div>

													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Naration</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtNaration"
																path="counterSaleNaration" name="txtNaration"
																class="form-control input-SmallText"
																placeholder="Naration" />
															
														</div>


													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;"
														id="DivChequeNum">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Cheque No</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtChequeNo"
																path="counterTaxChequeNo" name="txtChequeNo"
																class="form-control input-SmallText"
																placeholder="Cheque No" />
															
														</div>


													</div>

													<div class="col-md-12-1 " style="margin-top: 9px;"
														id="DivBank">

														<div class="col-md-4-1" style="margin-top: 9px;">
															<b>Bank Name</b>
														</div>
														<div class="col-md-7-1"
															style="margin-top: 9px; margin-left: -45px">
															<form:input type="text" id="txtBankName"
																path="counterTaxBankName" name="txtBankName"
																class="form-control input-SmallText"
																placeholder="Bank Name" />
															
														</div>


													</div>

												</div>

												<div class="modal-footer">
													<div style="margin-top: 15px; margin-left: 9px"
														class="form-group col-md-12 center">
														<div class="col-md-12-1">
															<button onclick="saveCounter()"
																name="btnSubContractingMaterialIssueSave"
																id="saveCounterButton" class="btn btn-default"
																type="button">Ok</button>

															<button data-dismiss="modal" onclick="resetValues();"
																class="btn btn-default" type="button">Cancel</button>
														</div>
														<div class="col-md-12-1" style="margin-top: 9px;">
															<b>To change the Counter Number Click on Cancel
																Button And Change The Counter</b>
														</div>
													</div>
												</div>

											</div>

										</div>
									</div>
								</div> --%>
								<%-- <div style="width: 98%; padding-top: 0%; font-weight: bold;"></div>
								<div id="div1" style="visibility: hidden"><%=request.getParameter("ajaxResponse")%></div>
								<div id="div3" style="visibility: hidden"><%=request.getParameter("myObj")%></div> --%>
							</div>
						</div>
					</form:form>

				</div>
				<!-- <input type="hidden" value="1" id="RowCount"> -->
				<%@include file="Pharma_Footer.jsp"%></div>
			<input type='hidden' value='0' id='addRowCount' />
			<input
				type="hidden" id="pharmaFetchStockOptionForCounterSale"
				value="<%=(String)session.getAttribute("fetchStockOptionForCounterSale")%>">
			<c:choose>
				<c:when test="${slaveCount ==0}">
					<input type="hidden" value="1" id="RowCount">
				</c:when>
				<c:when test="${slaveCount !=0}">
					<input type="hidden" value="${slaveCount}" id="RowCount">
					<script type="text/javascript">
						setData();
					</script>
				</c:when>
			</c:choose>
			<input type="hidden" value="0" id="tkr">

			<%-- <div id="div2" style="visibility: hidden"><%=request.getParameter("showSaveBtn")%></div>
			<div id="div4" style="visibility: hidden"><%=request.getParameter("onload")%></div> --%>
		</div>
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
							
<!-- Configure a few settings and attach camera -->
	<div id="cameraModal" class="modal fade" role="dialog">
			<div class="modal-dialog" style="width: 1200px;">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Camera / Upload Prescription Photo</h4>
					</div>
					<div class="modal-body">
						<div class="col-md-8" style="border: 1px solid #CCC;padding: 15px;">
							<div class="row">
								<div class="col-md-6">
									<div id="my_camera" style="margin: 30px 0 0"></div>
								</div>
								<div class="col-md-6">
									<div id="results" style="margin: 30px 0 0"></div>
								</div>
							</div>
							<div style="margin-top: 20px;text-align: center">
								<!-- A button for taking snaps -->
								<button onclick="take_snapshot()" class="btn btn-xs btn-warning">Take
									Snapshot</button>
							</div>
							
							<div class="col-md-12">
								<button type="button" class="btn btn-success" data-dismiss="modal"
									onclick="saveCounter()">Save</button>
								<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							</div>
						</div>
						<div class="col-md-4">
							<div class="col-md-12">
								<input type="file" class="form-control" name="changePrescriptionPhoto" id="changePrescriptionPhoto">
							</div>
							
						</div>
						<!-- Configure a few settings and attach camera -->
						
					</div>
					<div class="modal-footer">
					</div>
				</div>

			</div>
		</div>
	<!-- for image upload -->
	<script lang="Javascript">			
function uploadPrescriptionPhoto() {
			var form = $('#prescriptionPhoto')[0];
			 if( document.getElementById("changePrescriptionPhoto").files.length == 0 ){
			    alert("Please select photo");
			    return false;
			 }
			 var fileName = document.getElementById("changePrescriptionPhoto").files[0].name;
			 var data = new FormData(form);
		     jQuery.ajax({                   
		    	 async : true,                   
		    	 type : "POST",
		    	 enctype: 'multipart/form-data',
		    	 processData: false,
		         contentType: false,
		    	 data : data,
		    	 url : "ehat/uploadregdoc/uploadPrescriptionPhoto",                   
		    	 timeout : 1000 * 60 * 5,                   
		    	 catche : false,                    
		    	 error : function() {                                            
		    		 alert("error");
		    	 },                   
		    	 success : function(r) {                      
	
			    	alert("File uploaded successfully.");
			    	$("#prescriptionPhotoModal").modal("hide");  
			    	$('#changePrescriptionPhoto').val('');                    
		    		$('#prescriptionPhoto').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
					$('#prescriptionPhoto').attr('value',fileName); 
					$("#prescriptionReceipt").val(fileName);           
		    	}
			});
		}
		</script>
		<input type="hidden" id="curprescriptionPhoto" value="">
		<input type="hidden" id="queryType" value="insert">
		<input type="hidden" id="offflow" value="<%=print%>">
		<input type="hidden" id="userName" value="1">
	<!-- 	<input type="hidden" id="product_prescription" value="0"> -->
	</section>
	<script language="JavaScript">
						
							//var today = new Date();							
							//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();							
							//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();							
							//var dateTime = date+' '+time; 
							
							var dateTime = Date.now();
							
							function assignCamera() {
																	
								var qType=$("#queryType").val();
								
								var imgPath="";							
								
								if(qType != "insert"){
									
									var curImg=$("#curprescriptionPhoto").val();
									
									if(curImg=="patientPhoto.jpg"){
										
										imgPath = dateTime + "_webcam.jpg";
									}else{
										
										imgPath=curImg;
									}									
									//var patientId=$("#patientId").val(); 
									//imgPath = patientId + "_webcam.jpg";									
									//imgPath =$("#curprescriptionPhoto").val(); 
								}else{
									
									imgPath = dateTime + "_webcam.jpg";
									//var nextPatId=$("#maxPatId").val(); 
									//imgPath = nextPatId + "_webcam.jpg"; 
								}
								
								var arr=imgPath.split(".");
								var newPath=arr[0];
								
								$("#cameraClick").removeAttr("onclick");
								
								Webcam.set({
									
									width : 320,
									height : 240,
									image_format : 'jpeg',
									jpeg_quality : 90,
									upload_name : newPath
								});
								Webcam.attach('#my_camera');								
							}

							function take_snapshot() {
								// take snapshot and get image data
								Webcam
										.snap(function(data_uri) {
											// display results in page
											document.getElementById('results').innerHTML = '<img id="capturedImage" src="'+data_uri+'"/>';
										});
							}

							function assignProfilePicture() {
								
								var qType=$("#queryType").val();
								var imgPath="";
							
								if(qType != "insert"){
									
									var curImg=$("#curprescriptionPhoto").val();
									
									if(curImg=="prescriptionPhoto.jpg"){
										
										imgPath = dateTime + "_webcam.jpg";
									}else{
										
										imgPath=curImg;
									}
									
									//var patientId=$("#patientId").val();
									//imgPath = patientId + "_webcam.jpg";
									//alert("maxPatId==="+imgPath);
									//imgPath =$("#curprescriptionPhoto").val();
								}else{
									
									imgPath = dateTime + "_webcam.jpg";
									//var nextPatId=$("#maxPatId").val();
									//imgPath = nextPatId + "_webcam.jpg";
								}
								
								var src = $('#capturedImage').attr('src');
								$('#prescriptionPhoto').attr('src', src);								
								
								Webcam.upload(src, '../../ehat/uploadregdoc/uploadPrescriptionPhoto',
										function(code, text) {
											//$('#prescriptionPhoto').attr('src','pharmacy/pharmacy/readImage?url='+$('#patID').val()+"_webcam.jpg");
										    	$('#prescriptionPhoto').attr('value',+ imgPath);
										});						
								
								$("#prescriptionReceipt").val(imgPath);
							}
						</script>
</body>
</html>