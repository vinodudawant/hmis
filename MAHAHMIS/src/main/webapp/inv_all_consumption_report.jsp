<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>All Consumption Report</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>
<!--Below CSS added by Rohit on 14-05-2021 To stick the table head -->
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
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->
		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="inv_left_menu.jsp"%>
			<!-- /SIDEBAR -->
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- STYLER -->
										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="inv_all_consumption_report.jsp">All Consumption
													Report</a></li>
											<li class='pull-right'>
											<button id="btnExportReport"
												class="pull-right btn btn-primary btn-warning" value="Excel"
												title="" data-placement="left" data-toggle="tooltip"
												data-original-title="Excel" style="margin-left: 10px">
												<!-- <i class="fa fa-file"></i> -->
												Export To Excel
											</button>
									</li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">

									<script type="text/javascript">
										$("[id$=btnExportReport]")
												.click(
														function(e) {
																	
															 //getting values of current time for generating the file name
													        var dt = new Date();
													        var day = dt.getDate();
													        var month = dt.getMonth() + 1;
													        var year = dt.getFullYear();
													      
													        var hours = dt.getHours();
													        var minutes = dt.getMinutes();
													        var s = dt.getSeconds();
													        
													        var ampm = hours >= 12 ? 'pm' : 'am';
													        hours = hours % 12;
													        hours = hours ? hours : 12; // the hour '0' should be '12'
													        minutes = minutes < 10 ? '0'+minutes : minutes;
													        var strTime = hours + ':' + minutes + ':'+s+':'+ ampm;
													      
													        var postfix = day + "_" + month + "_" + year+"_"+strTime;
													        //creating a temporary HTML link element (they support setting file names)
													        var a = document.createElement('a');
													        //getting data from our div that contains the HTML table
													        var data_type = 'data:application/vnd.ms-excel';
													        var table_div = document.getElementById('allItemconsumptionDetailMasterInfo');
													        var table_html = table_div.outerHTML.replace(/ /g, '%20');
													        a.href = data_type + ', ' + table_html;
													        //setting the file name
													        a.download = 'All_Item_Consumption_Report_' + postfix + '.xls';
													        //triggering the function
													        a.click();
													        //just in case, prevent default behaviour
													        e.preventDefault();		
																	
														});
									</script>
									<!-- End -->
								</div>
							</div>
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 5px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary" style="overflow: auto;">
																	<div class="panel-heading" id="divEhatContent">All
																		Item Consumption Report Table</div>
																	<div class="panel-body"
																		style="height: 300px"
																		id="allItemconsumptionDetailMasterInfo">
																		<table
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th>Sr No</th>
																					<th>Consumption ID</th>
																					<th>Consumption Date</th>
																					<th>SubInv Name</th>
																					<th>Item Code</th>
																					<th>Item Name</th>
																					<th>Batch No.</th>
																					<th>Expiry Date</th>
																					<th>Consumed Item Qty</th>
																					<th>UOM</th>
																					<th>Consumed Status</th>
																					<th>Dispensed to</th>
																					<th>Consumed by</th>
																				</tr>
																			</thead>
																			<tbody id="allItemConsumptionDetailList">
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
							<!-- /NEW ORDERS -->
						</div>
						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>
			</div>
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>
		<!-- /JAVASCRIPTS -->
		<script>
		/*
		 * @author: Rohit Sandbhor
		 * @date:- 23-10-2019
		 * @codeFor:- below js function to call the getAllWarehouseMasterRecords() on ready
		 */
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});	
			getAllConsumptionListForConsumtionReport();
		});
		</script>
		<script>
		onload = function() {
			getAllHSNList();
		}
		</script>
		<input type="hidden" id="userIdSalesSlave"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdSalesSlave" value="0">
		<input type="hidden" id="userIdPurchaseSlave"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdPartySlave"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="subInvId" value="0">
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/inv_reports.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

