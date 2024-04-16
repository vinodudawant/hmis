<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Inventory Stock Reports</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<!-- include js for development -->
<script type="text/javascript" src="js/inv_reports.js"></script>
<script>
	onload = function() {
		getAllInventoryStockReport();
	}
</script>
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
									<div class="page-header" style="height: 94%;">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><i class="fa fa-home"></i> <a
												href="inv_inventory_reports.jsp">Inventory Stock Report</a></li>
											<li class="pull-right">
												<button id="inventoryStockExportReport" title=""
													data-placement="left" class="btn btn-xs btn-warning">
													Export To Excel</button>
												<script type="text/javascript">
												$("[id$=inventoryStockExportReport]")
														.click(
																function(e) {
																	 //getting values of current time for generating the file name
															        var dt = new Date();
															        var day = dt.getDate();
															        var month = dt.getMonth() + 1;
															        var year = dt.getFullYear();
															      
															        var postfix = day + "_" + month + "_" + year;
															        //creating a temporary HTML link element (they support setting file names)
															        var a = document.createElement('a');
															        //getting data from our div that contains the HTML table
															        var data_type = 'data:application/vnd.ms-excel';
															        var table_div = document.getElementById('sTable');
															        var table_html = table_div.outerHTML.replace(/ /g, '%20');
															        a.href = data_type + ', ' + table_html;
															        //setting the file name
															        a.download = 'Inventroy_Stock_Reports_' + postfix + '.xls';
															        //triggering the function
															        a.click();
															        //just in case, prevent default behaviour
															        e.preventDefault();
																});
											</script>
											</li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>


							<div class="row">

								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												<div class="container">
													<ul class="nav nav-tabs">
														<li class="active"><a data-toggle="tab" href="#home" onclick="onClearText('clearSubInv')">Inventory
																Stock Reports</a></li>
													</ul>

													<div class="tab-content">
														<div id="home" class="tab-pane fade in active">

															<div class="col-md-3" style="margin: 1%;">
																<div class="input-group" id="itemByName">
																	<input type="search" id="stockItemName"
																		placeholder="enter item name"
																		class="typeahead form-control col-md-4 input-SmallText"
																		onkeyup="getInventoryStockAutoSuggestion(this.id,'stockAudit')">
																	<span class="input-group-btn">
																		<button class="btn btn-primary btn-xs"
																			style="height: 25px; margin-bottom: 10px"
																			type="button">
																			<span class="fa fa-search" aria-hidden="true">
																			</span> Search!
																		</button>
																	</span>
																</div>
															</div>
															<div class="col-md-12">
																<div class="tabbable header-tabs">
																	<div class="row">
																		<div class="col-md-12">
																			<div class="panel panel-primary" style="overflow: auto;">
																				<div class="panel-heading" id="divEhatContent"> Inventory Stock
																				Report List</div>
																				<div class="panel-body">
																					<div style="height: 300px;" id="sTable">
																						<table id="fixed_header"
																							class="table table-striped table-bordered">
																							<thead id="ehatTHead" class="fixedheaderdemo">
																								<tr>
																									<th>SNo</th>
																									<th>Item Id</th>
																									<th>Item Name</th>
																									<th>Batch No</th>
																									<th>Expiry Date</th>
																									<th>Qty</th>
																									<th>UOM</th>
																								</tr>
																							</thead>
																							<tbody id="inventoryReports" style="height: 94px;">
																							</tbody>
																						</table>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																	<!--    Starting pagination    
																	<div style="margin-top: -2%;">
																		<div class="pull-right">
																			<ul class="pagination pagination-blue margin-bottom-10"
																				id="stockAuditRecordPagination">
																			</ul>
																		</div>
																		<div class="pull-left">
																			<ul
																				class="pagination pagination-blue margin-bottom-10"
																				id="totalNumberOfPagesStockAudit">
																			</ul>
																		</div>
																		
																	</div>
																	  Ending  pagination -->
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

		<script
			src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<!-- CUSTOM SCRIPT -->
		<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
					
		});
	</script>
		<input type="hidden" id=doc_id value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>