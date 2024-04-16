<%@page import="java.util.Date"%>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Item Expiry Report</title>
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
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"yyyy-MM-dd");
					String todays_date = formatter.format(currentDate.getTime());
					//	System.out.print("todays_date :::"+todays_date );

					Date date = new Date();
					java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(
							"dd/MM/yyyy h:mm:ss a");
					String formattedDate = sdf.format(date);
					System.out.println(formattedDate); // 12/01/2011 4:48:16 PM
					//	Date dtHMS = new Date();

					//	System.out.print(datewithHMS.getHours()+":"+datewithHMS.getMinutes()+":"+datewithHMS.getSeconds());
					//	String Time = dtHMS.getHours() + ":" + dtHMS.getMinutes() + ":"	+ dtHMS.getSeconds();
					//System.out.print("aaaaaa :" + Time);
			%>
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
												href="inv_expiray_report.jsp">Item Expiry Report</a></li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div class="row">

								<div class="col-md-12">



									<button id="btnExportReport"
										class="pull-right btn btn-primary btn-warning" value="Excel"
										title="" data-placement="left" data-toggle="tooltip"
										data-original-title="Excel" style="margin-left: 10px">
										<!-- <i class="fa fa-file"></i> -->
										Export To Excel
									</button>
									<script type="text/javascript">
												$("[id$=btnExportReport]")
														.click(
																function(e) {
																	/* window
																			.open('data:application/vnd.ms-excel,'
																					+ encodeURIComponent($(
																							'div[id$=itemexpirayDetailMasterInfo]')
																							.html()));
																	e
																			.preventDefault(); */
																		
																			
																	 //getting values of current time for generating the file name
															        var dt = new Date();
															        var day = dt.getDate();
															        var month = dt.getMonth() + 1;
															        var year = dt.getFullYear();
															      
															        var postfix = day + "." + month + "." + year;
															        //creating a temporary HTML link element (they support setting file names)
															        var a = document.createElement('a');
															        //getting data from our div that contains the HTML table
															        var data_type = 'data:application/vnd.ms-excel';
															        var table_div = document.getElementById('itemexpirayDetailMasterInfo');
															        var table_html = table_div.outerHTML.replace(/ /g, '%20');
															        a.href = data_type + ', ' + table_html;
															        //setting the file name
															        a.download = 'Item_Expiray_Report_' + postfix + '.xls';
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
														<div class="row" >

															<div class="form-group col-md-2 col-sm-2 col-xs-12">
															<label>From Date</label>
																<input id="fromuserDate"
																	class="form-control input-SmallText" type="text"
																	readonly="readonly" name="date" placeholder="Date"
																	value="<%=todays_date%>">

															</div>
															
															
															<div class="form-group col-md-2 col-sm-2 col-xs-12">
																<label>To Date</label>
																<input id="touserDate"
																	class="form-control input-SmallText" type="text"
																	readonly="readonly" name="date" placeholder="Date"
																	value="<%=todays_date%>">

															</div>
															
															
															<div class="form-group col-md-2 col-sm-2 col-xs-12">
																<div style="margin-top: 20px">
																<button class="btn btn-primary"
																	style="height: 25px; margin-bottom: 10px" type="button"
																	onclick="getAllItemExpirayDateReport()">
																	<span class="fa fa-search" aria-hidden="true"> </span>
																	Search
																</button>
																</div>
															</div>

															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary" style="overflow: auto;">
																	<div class="panel-heading" id="divEhatContent">Item
																		Expiry Report Table</div>
																	<div class="panel-body"
																		style="height: 300px"
																		id="itemexpirayDetailMasterInfo">
																		<table
																			class="datatable table table-striped table-bordered">
																			<thead id="ehatTHead">
																				<tr>
																					<th>Sr No</th>
																					<th>Item Id</th>
																					<th>Item Name</th>
																					<th>Batch No.</th>
																					<th>Expiry Date</th>
																					<th>Days Left</th>
																					<th>Available Stock Qty</th>
																				</tr>
																			</thead>
																			<tbody id="itemexpirayDetailList">
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
			getAllItemExpirayDateReport();
		});
		
		new JsDatePick({
			useMode : 2,
			target : "fromuserDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%Y-%m-%d",
			imgPath : "../img/",
			weekStartDay : 1,
		});
		
		
		new JsDatePick({
			useMode : 2,
			target : "touserDate",
			/* dateFormat:"%d-%M-%Y", */
			yearsRange : [ 1920, 2099 ],
			limitToToday : false,
			/* cellColorScheme:"beige", */
			dateFormat : "%Y-%m-%d",
			imgPath : "../img/",
			weekStartDay : 1,
		});
		
		
		</script>
		<script>
		onload = function() {
			getAllHSNList();
		}
		</script>
		<input type="hidden" id="userIdSalesSlave"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdPurchaseSlave"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userIdPartySlave"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/ehat_inventory.js"></script>
	<script type="text/javascript" src="js/inv_reports.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

