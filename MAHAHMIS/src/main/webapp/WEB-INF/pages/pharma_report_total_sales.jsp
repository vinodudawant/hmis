<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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


<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>

<!-- for Developers  -->
<!-- <script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<!-- <script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.base.css"/>">
	
<link rel="stylesheet" href="<c:url value="/pharmacy/resources/js/jqx-widgets/jqx.energyblue.css"/>" type="text/css" />

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcore.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxbuttons.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxscrollbar.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxmenu.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.selection.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.filter.js"/>"></script>		
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxlistbox.js"/>"></script>	
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdropdownlist.js"/>"></script>		
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxcheckbox.js"/>"></script>
	
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxwindow.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/demos.js"/>"></script>	


<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.sort.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.pager.js"/>"></script>

<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.columnsresize.js"/>"></script>


	
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxdata.export.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/jqx-widgets/jqxgrid.export.js"/>"></script>

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
	z-index: 10000;
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
	var total=0;
	var total1=0;
	var	vat5=0;
	var	vat12=0;
	var	vat0=0;
	var totalNet=0;
	
	var	totalNet=0;
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
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

	function getPatientwiseTotalSale() 
	{
	
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
		
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/report/getPatientwiseTotalBill",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {
							$("#partywise_purchase").show();
								setPartyWisePurchaseResult(r); 
							
						}
					});
			return true;
		}
	
		
	function setPartyWisePurchaseResult(result) 
	{
		var r = result;
		var divContent = "";
		 total=0;
		 totalVat=0;
		 totalNet=0;
			
		if (r.length > 0) {
			divContent = divContent + "";
			for ( var i = 0; i < r.length; i++) {
				divContent = divContent + "<tr><td class='col-md-1-1' >" +"VAT 5.5%"+ "</td><td class='col-md-1-1' id='gross0' >" + (r[i].gross5).toFixed(2) + "</td><td class='col-md-1-1' id='vat0' "
				+ ">"+ (r[i].totalVat5).toFixed(2) + "</td><td class='col-md-1-1' id='net0' "
				+ ">" + r[i].totalNet5.toFixed(2) + "</td></tr>";
						
				divContent = divContent + "<tr><td class='col-md-1-1' >" +"VAT 12.5%"+ "</td><td class='col-md-1-1' id='gross1'>"  
				+ (r[i].gross12).toFixed(2) + "</td><td class='col-md-1-1' id='vat1'>" 
				+ r[i].totalVat12.toFixed(2) + "</td><td class='col-md-1-1' id='net1'>" + r[i].totalNet12.toFixed(2) + "</td>"
				+ "</tr>";	
				
						
			divContent = divContent + "<tr><td class='col-md-1-1'>" +"VAT 0%"+ "</td><td class='col-md-1-1' id='gross2'>" + (r[i].gross0).toFixed(2)
			+ "</td><td class='col-md-1-1' id='vat2' >"
			+ (r[i].totalVat0).toFixed(2) + "</td><td class='col-md-1-1' id='net2' >" + (r[i].totalNet0).toFixed(2)
			+ "</td>"
			+ "</tr>";	
			
			$("#totalVat0").val((r[i].grossAmt).toFixed(2));
			$("#totalVat5").val((r[i].totalAdd).toFixed(2));
			$("#totalVat12").val((r[i].netAmt).toFixed(2));
			
		/* 	$("#totalVat12").val(total); */
			
		/* 	alert($('#gross0').html());	
			alert($("#gross1").val()); */
						
			/* 	calculateTotalGrossAmount(r[i].totalGross);
				calculateTotalVat5(r[i].totalVat5);
				calculateTotalVat12(r[i].totalVat12);
				calculateTotalVat0(r[i].totalVat0);
				calculateTotalNetAmt(r[i].totalNet); */
				
						
			}
			divContent = divContent + "";
		} else {
			divContent = divContent + "<b><center>No Record Found</center></b>";
		}
		
		$("#partyWiseResult").html(divContent);
	}

	/* function setPartyWisePurchaseResult(result) 
	{
		var r = result;
		var divContent = "";
		 total=0;
		 totalVat=0;
		 totalNet=0;
			
		if (r.length > 0) {
			divContent = divContent + "";
			for ( var i = 0; i < r.length; i++) {
				divContent = divContent + "<tr><td class='col-md-1-1'>" + r[i].totalGross + "</td><td class='col-md-1-1'>"
						+ r[i].totalVat0 + "</td><td class='col-md-1-1'>" + r[i].totalVat5
						+ "</td><td class='col-md-1-1'>" + r[i].totalVat12
						+ "</td><td class='col-md-1-1'>" + r[i].totalNet
						+ "</td>"
						+ "</tr>";
				calculateTotalGrossAmount(r[i].totalGross);
				calculateTotalVat5(r[i].totalVat5);
				calculateTotalVat12(r[i].totalVat12);
				calculateTotalVat0(r[i].totalVat0);
				calculateTotalNetAmt(r[i].totalNet);
				
						
			}
			divContent = divContent + "";
		} else {
			divContent = divContent + "<b><center>No Record Found</center></b>";
		}
		
		$("#partyWiseResult").html(divContent);
	}
 */
	/* function calculateTotalGrossAmount(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null') 
		{
		   total = total + parseFloat(amount);
		}
		$("#totalAmount").val(total);
	}
	
	function calculateTotalVat0(amount) 
	{
		
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null') 
		{
			vat0 = vat0 + parseFloat(amount);
		}
		$("#totalVat0").val(vat0);
	}
	
	function calculateTotalVat5(amount) 
	{
		
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null') 
		{
			vat5 = vat5 + parseFloat(amount);
		}
		$("#totalVat5").val(vat5);
	}
	
	function calculateTotalVat12(amount) 
	{
		
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null') 
		{
			vat12 = vat12 + parseFloat(amount);
		}
		$("#totalVat12").val(vat12);
	}
	
	
	function calculateTotalNetAmt(amount) 
	{
		
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null') 
		{
			totalNet = totalNet + parseFloat(amount);
		}
		$("#totalNet").val(totalNet);
	}
	 */
function getTotalSaleReport() 
	{
							
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var inputs = [];
		
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			var str = inputs.join('&');

			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/report/getPatientTotalBillReport",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {
							alert("Report Generated Successfully");
							setResult(r);

						}
					});
			return true;
		}
					
	function setResult(result) 
	{
		var splitResult = result.split('$');
		$('#setButtons')
				.html(
						"<button onclick='getTotalSaleReport();' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
								+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='hidePopUp()' data-dismiss='modal'>Close</button>");
	}

	
	
	function hidePopUp() {
		$('#partywise_purchase').hide();
		location.reload();
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

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>totalVat5
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_reports.jsp"%>
			<%@include file="pharma_report_total_sales_pop_up.jsp"%>

			<!-- 			content -->

			<input type="hidden" id="userID" />
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
											<li>Purchase Report</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<!-- <li class="pull-right" id="template">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getPharmacyCompanyWiseProductReport()">Get
													Product Report</button> <button class="btn btn-xs btn-danger">Discard</button>
											</li> -->
										</ul>

									</div>
								</div>
							</div>
							<div id="SearchContent" class="col-md-12-1"></div>

							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="divide-20"></div>
							<div class="col-md-12-1">


								<div class="col-md-12-1">
									<div id="companyReport" class="col-md-5-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<div class="col-md-12-1 center" style="margin-bottom: 10px;">
											<h4 id="title">Total Sales Report</h4>
										</div>

										<div class="col-md-6-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
											</div>
										</div>

										<div class="col-md-6-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText"
													placeholder="To Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div style="margin-top: 9px;" class="col-md-4-1">
												<B></B>
											</div>
											<div style="margin-top: 9px;" class="col-md-4-1">
												<button class="btn btn-xs btn-success" type="button"
													id="getIndentData" onclick="getPatientwiseTotalSale();"
													style="margin-left: 5%;">Get Data</button>
											</div>

										</div>
									</div>

									<div class="col-md-1-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px;"></div>

									<div class="col-md-6-1"
										style="padding-left: 1%; padding-right: 0%;">
										<div class="box border purple">
											<div class="box-title" style="background-color: #a696ce">
												<h4>
													<i class="fa fa-bitbucket"></i>Total Sales Report
												</h4>
												<div class="tools">
													<a href="#box-config" data-toggle="modal" class="config">
														<i class="fa fa-cog"></i>
													</a>
													<!-- <a href="javascript:;" class="reload">
												<i class="fa fa-refresh"></i>
											</a> -->
													<a href="javascript:;" class="collapse"> <i
														class="fa fa-chevron-up"></i>
													</a> <a href="javascript:;" class="remove"> <i
														class="fa fa-times"></i>
													</a>
												</div>
											</div>
											<div class="box-body " id='well'
												style="height: 350px; overflow-y: Scroll; width: 100%;">

												<div class="col-md-12-1" style="border: 2px solid;"
													id="reportList">
													<div class="col-md-12-1 center"
														style="margin-bottom: 10px;"></div>
													<div class="col-md-12-1"
														style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
														<table border='1'
															class="table table-striped table-bordered header-fixed cf "
															style="Width: 100%; margin-top: 5px;">
															<thead class="cf" style="background: white;">
																<tr>
																	<th>File Id</th>
																	<th>File Name</th>
																	<th>Date</th>
																</tr>
															</thead>
															<tbody>
																<%
																	File folder = new File(
																			request.getRealPath("/ehat_Reports/Pharmacy/purchase/partywiseTotalPo/"));
																	File[] listOfFiles = folder.listFiles();

																	if (listOfFiles != null) {
																		for (int i = 0; i < listOfFiles.length; i++) {
																%>
																<tr>
																	<td><%=i + 1%></td>
																	<td>
																		<%
																			if (listOfFiles[i].isFile()) {
																		%> <a
																		href='/EhatEnterprise/ehat_Reports/Pharmacy/purchase/partywiseTotalPo/<%=listOfFiles[i].getName()%>'><%=listOfFiles[i].getName()%></a>
																	</td>
																	<td>
																		<%
																			SimpleDateFormat sdf = new SimpleDateFormat(
																								"dd/MM/yyyy HH:mm:ss");

																						/* System.out.println("After Format : " + sdf.format(listOfFiles[i].lastModified())); */
																		%> <%=sdf.format(listOfFiles[i].lastModified())%>
																	</td>
																</tr>
																<%
																	}
																		}
																	}
																%>
															</tbody>
														</table>
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
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
	</section>

	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>