<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
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

<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

</head>
<script>
	jQuery(document).ready(function() {
		App.init(); //Initialise plugins and elements
	});
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
	"dd/mm/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>

<body style="background: white ! important;">
	<section id="page">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_reports.jsp"%>


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
											<li>Date_Wise Stock Report</li>
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button> <script
													type="text/javascript">
														$("[id$=btnExport]")
																.click(
																		function(
																				e) {
																			window
																					.open('data:application/vnd.ms-excel,'
																							+ encodeURIComponent($(
																									'div[id$=salereportListwithgst]')
																									.html()));
																			e
																					.preventDefault();
																		});
													</script>
											</li>
										</ul>

									</div>
								</div>
							</div>


							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="col-md-12-1">


								<div id="companyReport" class="col-md-12-1"
									style="height: 50%; margin-top: -1%; padding-left: 20px; border: 1px solid #b8b8b8;">

									<div class="col-md-12-1" style="margin-top: 0%">

										<div class="col-md-4-1"
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-3-1" style="margin-top: 9px;">
												<b>Select Date:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">

												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="Date " required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b>Product Name :</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text"
													onkeypress="return setValuesToAutocomplete(this.id)"
													autocomplete="off" placeholder="product"
													class="form-control input-SmallText" name="txtProductName"
													id="txtProductName">
											</div>
										</div>

										<div style="margin-top: 0px; margin-bottom: 10px"
											class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;"
													onclick="getDateWiseStock()" type="button"
													class="btn btn-xs btn-success">Get Data</button>
											</div>
										</div>

									</div>
								</div>

								<script type="text/javascript">
									function getDateWiseStock() {
										var pid = $('#hiddenProductId').val();
										var fromd = $('#popup_container2').val();
										farr = fromd.split('/');
										date = farr[2]+'-'+farr[1]+'-'+farr[0];
										var inputs = [];
										inputs.push('from='+date);
										inputs.push('productId=' + pid);
										
										var str = inputs.join('&');
										jQuery.ajax({
											async : true,
											type : "GET",
											data : str + "&reqType=AJAX",
											url : "getDateWiseStock",
											timeout : 1000 * 60 * 5,
											catche : false,
											error : function() {
											},
											success : function(r) {
												var i=0;
												$("#saledetailswithgst").empty();
												$.each(r,function(){
													$("#saledetailswithgst").append("<tr><td align='center'>"+ (i+1) +"</td><td>"+r[i].productName+"</td><td align='center'>"+parseFloat(r[i].stock).toFixed(2)+"</td><td align='center'>"+parseFloat(r[i].companyId).toFixed(2)+"</td><td align='center'>"+ parseFloat(r[i++].productCompany).toFixed(2)+"</td></tr>");
												});
											}
										});
									}

									function setValuesToAutocomplete(key) {

										if (key != null) {
											var keycode = (key.which) ? key.which
													: key.keyCode;
											if (keycode == 9) {
												$('#txtQty').focus();
												return false;
											}
										}

										var findingName = $("#txtProductName")
												.val();
										var inputs = [];
										inputs.push('letter=' + findingName);
										var str = inputs.join('&');

										jQuery
												.ajax({
													async : true,
													type : "GET",
													data : str
															+ "&reqType=AJAX",
													url : "../../pharmacy/product/autoSuggestionProduct",
													timeout : 1000 * 60 * 15,

													error : function(error) {
														alert('error' + error);
													},
													success : function(r) {
														var availableTags = [];
														var resultData = [];

														for ( var i = 0; i < r.length; i++) {
															availableTags[i] = r[i].productName
																	+ '_'
																	+ r[i].productId
																	+ '-'
																	+ r[i].productUnit
																	+ '-'
																	+ r[i].packingMaster.packType
																	+ '-'
																	+ r[i].companyMaster.compName
																	+ '-'
																	+ r[i].shelfMaster.shelfName;
														}

														var template = "";
														for ( var j = 0; j < availableTags.length; j++) {
															var arrValue = (availableTags[j])
																	.split("_");
															var idValue = (arrValue[1]);
															resultData
																	.push({
																		ID : idValue,
																		Name : arrValue[0]
																	});

															template = template
																	+ '<li data-value="'
																	+ (arrValue[1])
																	+ '" class=""><a href="#">'
																	+ arrValue[0]
																	+ '</a></li>';

														}
														$(".typeahead1").html(
																template);
														$(".typeahead1").show();

														setTimeout(
																function() {
																	$(
																			'#txtProductName')
																			.typeahead(
																					{
																						source : resultData,
																						displayField : 'Name',
																						valueField : 'ID',
																						onSelect : displayResult,
																						scrollBar : true
																					});
																	$(
																			"#txtProductName")
																			.data(
																					'typeahead').source = resultData;
																}, 500);
													}
												});
									}

									function displayResult(item) {
										var content = item.value.split("-");
										$('#hiddenProductId').val(content[0]);
									}
								</script>

								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;"
									id="salereportListwithgst">
									<div class="col-md-12-1 center" style="margin-bottom: 10px;">


										<table>
											<thead>
												<tr>
													<th colspan="7" align="center"><h4
															id="titlesalewithgst" align="center">Date_Wise Stock
															Report</h4></th>
												</tr>
												<tr>
													<th align="center"></th>
												</tr>

											</thead>
										</table>

									</div>

									<div class="col-md-12-1"
										style='height: 485px; max-height: auto; overflow-x: scroll; overflow-y: scroll;'>

										<div class="tab-content">
											<div class="tab-pane fade in active">
												<table
													class='table table-bordered table-condensed cf table-fixed'
													style='margin-bottom: 9px; overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
													<thead style="background-color: lightgray;">
														<tr align="center">
															<th>Sr No</th>
															<th>Product Name</th>
															<th>Closing Stock</th>
															<th>Purchase Rate</th>
															<th>Amount</th>
														</tr>
													</thead>
													<tbody id="saledetailswithgst">
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
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<input type="hidden" id="hiddenProductId" value="0">
	</section>
</body>
</html>