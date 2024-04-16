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


<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="../.././pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/alertify.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

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
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/moments.js"/>"></script>

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
		url('/MAHAHMIS/pharma-resources/images/ajax_loader_blue_64.gif')
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

	function loadPopUp() {
		
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];
			
			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../report/getDailyBusinessDetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#dailyBusinessPopUp").show();
					setDailyBusinessReport(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}

	}

	function setDailyBusinessReport(result) {
		for(var i=0;i<result.length;i++)
		{
			if(result[i].cashPurchase!=null && result[i].cashPurchase!='null')
				$("#cashPurchase").val(result[i].cashPurchase);
			
			if(result[i].cashCreditPurchase!=null && result[i].cashCreditPurchase!='null')
				$("#cashCreditPurchase").val(result[i].cashCreditPurchase);
			
			if(result[i].cashPurchase!=null && result[i].cashPurchase!='null' && result[i].cashCreditPurchase!=null && result[i].cashCreditPurchase!='null')
			{
				var total=parseFloat(result[i].cashPurchase) + parseFloat(result[i].cashCreditPurchase);
				$("#totalPurchase").val(total);
			}
			
					
			if(result[i].cashReceipt!=null && result[i].cashReceipt!='null')
				$("#cashReceipt").val(result[i].cashReceipt);
			
			if(result[i].cashPaid!=null && result[i].cashPaid!='null')
				$("#cashPaid").val(result[i].cashPaid);
			
			if(result[i].chequeReceipt!=null && result[i].chequeReceipt!='null')
				$("#chequeReceipt").val(result[i].chequeReceipt);
			
			if(result[i].chequePaid!=null && result[i].chequePaid!='null')
				$("#chequePaid").val(result[i].chequePaid);	
			
			if(result[i].creditNote!=null && result[i].creditNote!='null')
				$("#creditNotee").val(result[i].creditNote);
			
			if(result[i].debitNote!=null && result[i].debitNote!='null')
				$("#debitNote").val(result[i].debitNote);
			
			if(result[i].counterSale!=null && result[i].counterSale!='null')
				$("#counterSale").val(result[i].counterSale);
			
			if(result[i].counterSale!=null && result[i].counterSale!='null' && result[i].counterSale!=null && result[i].counterSale!='null')
			{
				var total=parseFloat(result[i].counterSale);
				$("#totalSale").val(total);
			}
			$("#cashSale").val(' ');
			$("#cashCreditSale").val(' ');
			$("#creditSale").val(' ');
			$("#cashDiscount").val(' ');
			$("#itemDiscount").val(' ');
			$("#cashDiscount").val(' ');
			$("#postDatedCheques").val(' ');
			$("#sundryDebtors").val(' ');
			$("#closingStock").val(' ');
			$("#expirdStock").val(' ');
			$("#pendingCC").val(' ');
			$("#proffitAmt").val(' ');
			$("#proffit").val(' ');
			
			
		}
	}
	
	
	function calculateTotalAmount(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			total = total + parseFloat(amount);
		}
		$("#totalAmount").val(total);
	}
	
	function calculateTotalItemDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalItemDisc = totalItemDisc + parseFloat(amount);
		}
		$("#itemDisc").val(totalItemDisc);
	}
	
	function calculateTotalSchemeDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalSchemeDisc = totalSchemeDisc + parseFloat(amount);
		}
		$("#schmDisc").val(totalSchemeDisc);
	}
	
	function calculateTotalSplDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalSplDisc = totalSplDisc + parseFloat(amount);
		}
		$("#splDisc").val(totalSchemeDisc);
	}
	
	function calculateTotalSpecialDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalItemDisc = totalItemDisc + parseFloat(amount);
		}
		$("#itemDisc").val(totalItemDisc);
	}
	
	function getDailyBusinessReport() {
		/*var indentId = $('#selectIndentId').val();*/
		
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var cashCreditSale=$("#cashCreditSale").val();
		var creditSale=$("#creditSale").val();
		var counterSale=$("#counterSale").val();
		var totalSale=$("#totalSale").val();
		
		var cashDiscount=$("#cashDiscount").val();
		var itemDiscount=$("#itemDiscount").val();
		var creditNotee=$("#creditNotee").val();
		var debitNote=$("#debitNote").val();
		 var cashSale=$("#cashSale").val(); 
		var cashPurchase=$("#cashPurchase").val();
		var cashCreditPurchase=$("#cashCreditPurchase").val();
		var totalPurchase=$("#totalPurchase").val();
		var cashReceipt=$("#cashReceipt").val();
		/* var cashReceipt=$("#cashReceipt").val(); */
		var cashPaid=$("#cashPaid").val();
		
		var chequeReceipt=$("#chequeReceipt").val();
		var chequePaid=$("#chequePaid").val();
		
		var postDatedCheques=$("#postDatedCheques").val();
		var sundryDebtors=$("#sundryDebtors").val();
		var closingStock=$("#closingStock").val();
		var expirdStock=$("#expirdStock").val();
		var pendingCC=$("#pendingCC").val();
		var proffitAmt=$("#proffitAmt").val();
		var proffit=$("#proffit").val();
		
		

		/* var indentId = indentId; */
		if (from != '' && to != '') {
			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('cashSale=' + cashSale);
			inputs.push('cashCreditSale=' + cashCreditSale);
			inputs.push('creditSale=' + creditSale);
			inputs.push('counterSale=' + counterSale);
			inputs.push('totalSale=' + totalSale);
			inputs.push('cashDiscount=' + cashDiscount);
			inputs.push('itemDiscount=' + itemDiscount);
			inputs.push('creditNotee=' + creditNotee);
			inputs.push('debitNote=' + debitNote);
			inputs.push('cashPurchase=' + cashPurchase);
			inputs.push('cashCreditPurchase=' + cashCreditPurchase);
			inputs.push('totalPurchase=' + totalPurchase);
			inputs.push('cashReceipt=' + cashReceipt);
			inputs.push('cashPaid=' + cashPaid);
			inputs.push('chequeReceipt=' + chequeReceipt);
			inputs.push('chequePaid=' + chequePaid);
			inputs.push('postDatedCheques=' + postDatedCheques);
			inputs.push('sundryDebtors=' + sundryDebtors);
			inputs.push('closingStock=' + closingStock);
			inputs.push('expirdStock=' + expirdStock);
			inputs.push('pendingCC=' + pendingCC);
			inputs.push('proffitAmt=' + proffitAmt);
			inputs.push('proffit=' + proffit);
			
			var str = inputs.join('&');

			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "../../pharmacy/report/getDailyBusinessReport",
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
	}

	function setResult(result) {
		var splitResult = result.split('$');
		$('#setButtons')
				.html(
						"<button onclick='getDailyBusinessReport()' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/MAHAHMIS/ehat_Reports/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/MAHAHMIS/ehat_Reports/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
								+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='hidePopUp()' data-dismiss='modal'>Close</button>");
	}

	function setValuesToAutocomplete(key) {

		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#txtProductName").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/product/autoSuggestionProduct",
			timeout : 1000 * 60 * 15,

			error : function(error) {
				alert('error' + error);
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				for ( var i = 0; i < r.length; i++) {
					availableTags[i] = r[i].productName + '_' + r[i].productId
							+ '-' + r[i].productUnit + '-'
							+ r[i].packingMaster.packType + '-'
							+ r[i].companyMaster.compName + '-'
							+ r[i].shelfMaster.shelfName;
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

				}
				$(".typeahead1").html(template);
				$(".typeahead1").show();

				setTimeout(function() {
					$('#txtProductName').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
				}, 500);
			}
		});
	}

	function hidePopUp() {
		$('#dailyBusinessPopUp').hide();
	}

	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);

	}
	
	function getDate(milliseconds) {
		var d = new Date(milliseconds);
		var dd = d.getDate();
		var mm = d.getMonth() + 1; // January is 0!

		var yyyy = d.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		return yyyy + '-' + mm + '-' + dd;
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
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_reports.jsp"%>
			<%@include file="pharma_report_mis_daily_business_pop_up.jsp"%>

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
											<li>Daily Business Summary Report</li>
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
											<h4 id="title">Daily Business Summary Report</h4>
										</div>

										<div class="col-md-6-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<!-- <input type="text" class="form-control input-SmallText"
													placeholder="From Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3"> -->
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
													id="getIndentData" onclick="loadPopUp()"
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
													<i class="fa fa-bitbucket"></i>Daily Business Summary List
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
																			request.getRealPath("/ehat_Reports/Pharmacy/purchase/discount/"));
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
																		href='/MAHAHMIS/ehat_Reports/Pharmacy/purchase/discount/<%=listOfFiles[i].getName()%>'><%=listOfFiles[i].getName()%></a>
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
		<%-- </c:if> --%>
	</section>
</body>
</html>