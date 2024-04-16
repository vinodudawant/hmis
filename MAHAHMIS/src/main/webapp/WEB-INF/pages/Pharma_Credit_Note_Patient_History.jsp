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
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

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
	src="<c:url value="/pharmacy/resources/jquery/jquery-jtemplates.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/jquery.validate.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jquery-validate/additional-methods.min.js"/>"></script>
<!-- /for Developers  -->
<!-- Application js -->
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_DueCollection.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>
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
<script>
	jQuery(document).ready(function() {
		/* App.setPage("Pharma_Patient_Sales_Bill_Entry");  //Set current page */
		App.init(); //Initialise plugins and elements
		DisplayPatientData();
	});
</script>
<script>
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
		
</script>

<%
	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
			"dd/MM/yyyy");
	String date = simpleDateFormat.format(new Date());
%>

<script type="text/javascript">	
	
	shortcut.add("ctrl+f",function() {
		openForm('creditNote');
});
	
</script>

<script type="text/javascript">
	
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
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>
</head>

<body style="background: white ! important;">
	<%@include file="HelpMenu.jsp"%>
	<section id="page">
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>

                <%@include file="Pharma_left_menu_transaction.jsp"%>
               
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 6px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li>Previous Billing History</li>
											</ul>
										</div>
									</div>

									<div id="commonPatInfo" class="col-sm-12"
										style="margin-top: -25px; padding-left: 20px; padding-right: 9px;">


										 <div
											style="background-color: #EEEEEE; padding: 5px; height: 34px;">

											<div class="col-md-2-1" style="margin: 0px;">
												<label>Patient Id:</label> <label><%=request.getParameter("patientId")%></label>
												<input type="hidden" id="hiddenTreatmentId2"  value="<%=request.getParameter("treatmentId")%>"/>
												 <input type="hidden" id="hiddenPatientId"  value="<%=request.getParameter("patientId")%>"/>
											</div>

											<div class="col-md-5-1" style="margin: 0px;">
												<label>Patient Name:</label> <label><%=request.getParameter("pName")%></label>
											</div>

											<div class="col-md-2-1" style="margin: 0px;">
												<label>Phone Number:</label> <label>
												<% if(request.getParameter("phoneNum")!=null){
												%>	
													<%=request.getParameter("phoneNum")%>
												<%	
												}
												else
												{
												%>
													-	
												<%	
												}
												%>
												</label>
											</div>
											
											<!--   <div class="col-md-3-1" style="margin: 0px;margin-left:55px;">
												<button type="button" class="btn btn-xs btn-success"  style="background: blue none repeat scroll 0% 0%;"
													onclick="savePatientSaleBill(),saveIndentSaleBill();">Save <i class="fa fa-save"></i></button>
											</div> -->
										</div>

									</div>
								</div>

								<div id="rightContActual" style="width: 100%; margin-left: 5px;">

									<!-- Start Tab UI -->
									<div class="col-md-12-1" id="#deskTabs"
										style="margin-top: 5px; margin-left: 0px;">
										<!-- Start BOX -->
										<div class="box border col-md-12-1">
											<div class="divide-10"></div>
											<div class="tabbable col-md-12-1">
												<ul class="nav nav-tabs"
													style="background-color:lightblue; margin: -1px;">
																										
												</ul>
												<div class="divide-10"></div>
												<div class="tab-content">

													<div class="col-md-12-1" style="margin: 0px;">
															<div class="panel-group">
																<table style="background-color: lightblue;margin-bottom: 7px ! important;"
																	class="table table-condensed" >
																	<thead>
																		<tr>
																			<th class="col-md-1-1"><div class="TextFont">#</div></th>
																			<th class="col-md-1-1"><div class="TextFont">Type</div></th>
																			<th class="col-md-1-1"><div class="TextFont">Bill Id</div></th>
																			<th class="col-md-1-1" ><div class="TextFont">TreatmentID</div></th>
																			<th class="col-md-1-1" ><div class="TextFont">Bill Amount Receive</div></th>
																		    <th class=" col-md-1-1" ><div class="TextFont">Total Bill</div></th> 
																		    <th class=" col-md-1-1" ><div class="TextFont">Amount Balance</div></th>
																		    <th class=" col-md-1-1" ><div class="TextFont">Date</div></th>
																	       <!--  <th class=" col-md-1-1" ><div class="TextFont">Select</div></th> -->
																	        <th class=" col-md-1-1" ><div class="TextFont">Button</div></th>
																		</tr>
																	</thead>
																</table>
																<div class="col-md-12-1"
																	style="height: 470px; max-height: auto; overflow-y: scroll;margin-top:0.5%">
																
																		<div id="patientTab"></div>
																        <div id="indentTab"></div>   
																</div>
															</div>
														</div>
												
													
												</div>
												<!-- End Code for tab-content GUI -->
											</div>
										</div>
									</div>
									<!-- End Tab UI -->

									<!-- Start: RefundReceipt popup code-->
									

								</div>
								<div id="indentReceipt" class="modal fade in">
										<div class="modal-dialog" style="margin-top: 45px;">
											<div class="modal-content" class="col-md-12"
												style="height: 300px;">
												<div class="modal-header" style="padding-bottom: 0px;">
													<div class="box-title" style="margin-bottom: -1px;">
														<h4>
															<i class="fa fa-calendar"></i>Refund Indent Sale
														</h4>
														<div class="form-group col-md-2-1"
															style="float: right; margin-top: -27px;">
															<button type="submit" class="btn  btn-xs btn-primary"
																onclick="saveIndentSale();">Save</button>
															<button class="btn btn-xs btn-danger" type="button"
																data-dismiss="modal" onclick="">
																<i class="fa fa-arrows"></i> Close
															</button>
														</div>
													</div>
												</div>
												<div class="modal-body">
													<div class="form-group col-md-12-1" style="margin: 0px;">
														<div class="form-group Remove-Padding col-sm-3-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Payment Mode <b
																style="color: red; padding-left: 3px;">*</b>
															</label><select id="refundReceiptPaymentMode"
																class="form-control input-SmallText TextFont">
																<option value="">--Select--</option>
																<option value="Cash" selected="selected">Cash</option>
																<option value="Cheque">Cheque</option>
															</select>
														</div>

														<div class="form-group Remove-Padding col-sm-3-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Amount Balance<b
																style="color: red; padding-left: 3px;">*</b>
															</label> <input type="text" id="txtAmtBal"
																 readonly="true" name="txtAmtBal" placeholder="Amount Balance"
																class="form-control input-SmallText" />
																 <input type="hidden" id="hiddenTreatmentId1" />
														</div>

														<div class="form-group Remove-Padding col-sm-2-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Amount Received</label> <input type="text"
																id="txtAmtRec" name="txtAmtRec"
																placeholder="Amount Received" onblur="chkIndentAmountReceive();"
																class="form-control input-SmallText" />
														</div>

                                                         <div class="form-group Remove-Padding col-sm-2-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Discount</label> <input type="text"
																id="txtDisc" name="txtDisc"
																placeholder="Discount"
																class="form-control input-SmallText" />
														</div>

														<div class="form-group Remove-Padding col-sm-2-1"
															style="margin-top:-2px;">
															<div class="divide-10"></div>
															<label class="TextFont">Date:</label> <input type="text"
																id="txtDate" placeholder="date" value="<%=date%>"
																readonly="readonly" />
														</div>

														<div class="form-group Remove-Padding col-sm-3-1"
															style="margin: 0px;">
															<div class="divide-40"></div>
															<label class="TextFont">Bank Name</label> <input
																type="text" id="txtBank" name="txtBank"
																placeholder="Bank Name"
																class="form-control input-SmallText" />
														</div>
												
													</div>
												</div>
											</div>
										</div>
									</div>
									<div id="patientReceipt" class="modal fade in">
										<div class="modal-dialog" style="margin-top: 45px;">
											<div class="modal-content" class="col-md-12"
												style="height: 300px;">
												<div class="modal-header" style="padding-bottom: 0px;">
													<div class="box-title" style="margin-bottom: -1px;">
														<h4>
															<i class="fa fa-calendar"></i>Refund Patient Sale
														</h4>
														<div class="form-group col-md-2-1"
															style="float: right; margin-top: -27px;">
															<button type="submit" class="btn  btn-xs btn-primary"
																onclick="savePatientSale();">Save</button>
															<button class="btn btn-xs btn-danger" type="button"
																data-dismiss="modal" onclick="">
																<i class="fa fa-arrows"></i> Close
															</button>
															
														</div>
													</div>
												</div>
												<div class="modal-body">
													<div class="form-group col-md-12-1" style="margin: 0px;">
														<div class="form-group Remove-Padding col-sm-3-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Payment Mode <b
																style="color: red; padding-left: 3px;">*</b>
															</label><select id="refundReceiptPaymentMode"
																class="form-control input-SmallText TextFont">
																<option value="">--Select--</option>
																<option value="Cash" selected="selected">Cash</option>
																<option value="Cheque">Cheque</option>
															</select>
														</div>

														<div class="form-group Remove-Padding col-sm-3-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Amount Balance<b
																style="color: red; padding-left: 3px;">*</b>
															</label> <input type="text" id="txtAmtBal1"
																 readonly="true" name="txtAmtBal1" placeholder="Amount Balance"
																class="form-control input-SmallText" />
																	 <input type="hidden" id="hiddenTreatmentId" />
														</div>

														<div class="form-group Remove-Padding col-sm-2-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Amount Received</label> <input type="text"
																id="txtAmtRec1" name="txtAmtRec1" onblur="chkAmountReceive();"
																placeholder="Amount Received" 
																class="form-control input-SmallText" />
														</div>
                                                        <div class="form-group Remove-Padding col-sm-2-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Discount</label> <input type="text"
																id="txtDisc1" name="txtDisc1"
																placeholder="Discount"
																class="form-control input-SmallText" />
														</div>

														<div class="form-group Remove-Padding col-sm-2-1"
															style="margin-top: -2px;">
															<div class="divide-10"></div>
															<label class="TextFont">Date:</label> <input type="text"
																id="txtDate1" placeholder="date" value="<%=date%>"
																readonly="readonly" />
														</div>

														<div class="form-group Remove-Padding col-sm-3-1"
															style="margin: 0px;">
															<div class="divide-40"></div>
															<label class="TextFont">Bank Name</label> <input
																type="text" id="txtBank1" name="txtBank1"
																placeholder="Bank Name"
																class="form-control input-SmallText" />
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

			</div>
		<script type="text/javascript">
				
			</script>
			<%@include file="Pharma_Footer.jsp"%></div>
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</section>
</body>
</html>
