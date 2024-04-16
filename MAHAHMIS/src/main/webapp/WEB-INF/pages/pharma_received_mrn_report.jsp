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

<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>

</head>
<style>
table {
  font-family: "Fraunces", serif;
  font-size: 100%;
  margin: 0;
  border: none;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid black;
}
table td,
table th {
  border: 1px solid black;
  padding: 0.5rem 1rem;
}
table thead th {
  padding: 3px;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 25vw;
  background: white;
}
table td {
  background: #fff;
  padding: 4px 5px;
  text-align: center;
}

table tbody th {
  font-weight: 100;
  font-style: italic;
  text-align: left;
  position: relative;
}
table tbody th {
  position: sticky;
  left: 0;
  background: white;
  z-index: 1;
}
caption {
  text-align: left;
  padding: 0.25rem;
  position: sticky;
  left: 0;
}

[role="region"][aria-labelledby][tabindex] {
  width: 100%;
  max-height: 98vh;
  overflow: auto;
}
[role="region"][aria-labelledby][tabindex]:focus {
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
  outline: 0;
}
</style>
<script>
	jQuery(document).ready(function() {
		App.init(); //Initialise plugins and elements

	});

	function getReceivedMrnReportDataList() {
		var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../report/getReceivedMRNReportData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {

				var divContent = "";
				for ( var i = 0; i < r.lstMrnReportDetail.length; i++) {
					
					 var dateTime=new Date(r.lstMrnReportDetail[i].mrnDate).toLocaleString();
					 var createdDateTime = (dateTime.split(",")[0]).split('/');
					// var time=dateTime.split(",")[1];
					 var datetime = createdDateTime[1]+'/'+createdDateTime[0]+'/'+createdDateTime[2] ;
					divContent = divContent + '<tr>'
							+'<td>' + (i + 1) + '</td>'
							+ '<td>' + r.lstMrnReportDetail[i].mrnStoreName + '</td>' 
							+ '<td>'+datetime + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnNo + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnProductName + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnProductUnit + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnRequiredQty + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnProductBatch + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnProductBatchExp + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnIssueQty + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnCanceledQty + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnPendingQty + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnReceivedQty + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnDiscount + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnGST + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnMRP + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnRate + '</td>' 
							+ '<td>'+r.lstMrnReportDetail[i].mrnAmount + '</td>' ;
							if(r.lstMrnReportDetail[i].mrnRemark!="" && r.lstMrnReportDetail[i].mrnRemark != 'null'){
								divContent = divContent	+ '<td>'+r.lstMrnReportDetail[i].mrnRemark + '</td>';
							}else{
								divContent = divContent	+ '<td>NA</td>';
							}
							+ '</tr>';
				}
				$("#receivedMrnReportDataList").html(divContent);

			}
		});

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
											<li>Received MRN Report</li>

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
																			$(document).on('click','#btnExport',function(e) {
				                                                                var result = 'data:application/vnd.ms-excel,' + encodeURIComponent($('div[id$=receivedMrnReportList]').html());
				                                                                var link = document.createElement("a");
				                                                                document.body.appendChild(link);
				                                                                link.download = "Received MRN Report.xls"; //You need to change file_name here.
				                                                                link.href = result;
				                                                                link.click();
				                                                            });   //Add By Ajinkya
																			
																			
/* 																			window
																					.open('data:application/vnd.ms-excel,'
																							+ encodeURIComponent($(
																									'div[id$=receivedMrnReportList]')
																									.html()));
																			e
																					.preventDefault(); */
																		});
													</script>
											</li>
										</ul>

									</div>
								</div>
							</div>


							<div id="SearchContent" class="col-md-12-1" style="font-size: 15px;"><b></b></div>
							<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-12-1">
								<div class="col-md-4-1" style="font-size: 15px;">
									<b>Received MRN Report</b>
								</div>
								<div class="col-md-4-1" style="">
									<button style="margin-left: 5%;" onclick="getReceivedMrnReportDataList()"
										id="getproductData" type="button"
										class="btn btn-xs btn-success">Get Data</button>
								</div>
								<div class="col-md-4-1" style="text-align: right">
									<b style="text-align: right;color: red;font-size: 14px;">* Kindly Receive Issued MRN From All Stores</b>
								</div>

							</div>
							<div class="col-md-12-1">
								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;"
									id="receivedMrnReportList">
									<div class="col-md-12-1"
										style='height: 485px; max-height: auto; overflow-x: scroll; overflow-y: scroll;'>

										<div class="tab-content">
											<div class="tab-pane fade in active">
												<table
													class='table table-bordered table-condensed cf table-fixed'
													style='margin-bottom: 9px; overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
													<thead style="background-color: lightgray;">
														<tr>
															<th>Sr No</th>
															<th>Store Name</th>
															<th>Created Date</th>
															<th>MRN No</th>
															<th>Product</th>
															<th>Unit</th>
															<th>Required Qty</th>
															<th>Batch</th>
															<th>Expiry</th>
															<th>Issue Qty</th>
															<th>Cancel Qty</th>
															<th>Pending Qty</th>
															<th>Received Qty</th>
															<th>Disc</th>
															<th>GST</th>
															<th>Mrp</th>
															<th>Rate</th>
															<th>Amount</th>
															<th>Remark</th>
															
														</tr>
													</thead>
													<tbody id="receivedMrnReportDataList">
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
	</section>
</body>
</html>