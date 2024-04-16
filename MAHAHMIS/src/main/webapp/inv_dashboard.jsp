<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Document Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
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
	<section id="page"> 
	<!-- SIDEBAR --> 
	<%@include	file="inv_left_menu.jsp"%> 
	<!-- /SIDEBAR -->
		<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd-MM-yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
	<div id="main-content">
		<div class="container">
			<div class="row">
				<div id="content" class="col-lg-12">
					<div class="row">
						<div class="col-sm-12">
							<div class="page-header">

								<ul class="breadcrumb">
									<li><i class="fa fa-home"></i> Date : <%=todays_date%>
									</li>
									<li><i class="fa fa-home"></i>  <a href="Dashboard.jsp">Home</a></li>
	
								</ul>

							</div>
						</div>
					</div>
					<div style="font-weight: bold;" class="col-md-1-1"></div>
					<div class="container">
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
								<div class="panel panel-primary">
									<div class="panel-heading" id="itemStockBelowInQtyTotal">Item Stock Below-in-Quantity (0)
									</div>
									<div class="panel-heading">
									<input type="text" placeholder="Search Item Name" class="form-control input-SmallText" id="searchItemMasterId" onkeyup="fetchItemMasterDetails()" >
									</div>
									<div class="panel-body">
										<div
											style="height: 140px; overflow-y: scroll; overflow-x: scroll; border: 1px solid #b8b8b8;"
											class="col-md-12-1">  
											<table  class="table table-bordered" id="itemStockQty" >
											<thead>
												<tr>
													<th>#</th>
												    <th>Item Id</th>
													<th>Item Name</th>
													<th>Item Category</th>
													<th>Below Minimum Level</th>
													<th>Item Qty With UOM</th>
												</tr>
											</thead>
											<tbody id="itemStockBelowInQty">

												
											</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" >
								<div class="panel panel-primary">
									<div class="panel-heading" id="pendingIndentTotal">Pending Indent (Total Count)</div>
										<div class="panel-body">
									<div
											style="height: 176px; overflow-y: scroll; overflow-x: scroll; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
													<th class='col-md-1-1 center'>#</th>
													<th class='col-md-3-1 center'>MRN ID</th>
													<th class='col-md-3-1 center'>Sub Inventory</th>
													<th class='col-md-3-1 center'>MRN Raised Date</th>
													 
												</tr>
											</thead>
											<tbody id="invPendingIndent">

												
											</tbody>
											</table>
										</div></div>
								</div>
							</div>

						</div>
						<div class='divide-20'></div>
						<div class="row">
							<div class="col-xs-12 col-sm-4 col-md-6 col-lg-6"style="">
								<div class="panel panel-primary">
									<div class="panel-heading" id="todayIndentTotal">Today Indent(Total Count)</div>
										<div class="panel-body">
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: scroll; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
												<th class='col-md-1-1 center'>#</th>
													<th class='col-md-3-1 center'>MRN ID</th>
													<th class='col-md-3-1 center'>Sub Inventory</th>
													<th class='col-md-3-1 center'>MRN Raised Date</th>
													 
												</tr>
											</thead>
												<tbody id="invTodayIndent">

										
												
												</tbody>
											</table>
										</div>
										</div>
								</div>
							</div>

							<div class="col-xs-12 col-sm-4 col-md-6 col-lg-6">
								<div class="panel panel-primary">
									<div class="panel-heading" id="inProgressIndentTotal">In-progress Indent  (Total Count)
									</div>
									<div class="panel-body">
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: scroll; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
													<th class='col-md-1-1 	'>#</th>
													<th class='col-md-3-1'>MRN ID</th>
													<th class='col-md-5-1'>Sub Inventory</th>
													<th class='col-md-3-1'>MRN Raised Date</th>
												</tr>
											</thead>
												<tbody id="invInProgressIndent">

													
												</tbody>
											</table>
										</div>
										</div>
								</div>
							</div>
						</div>
						<div class='divide-20'></div>
						<div class="row">
							<div class="col-xs-12 col-sm-4 col-md-6 col-lg-6"style="">
								<div class="panel panel-primary">
									<div class="panel-heading" id="productNearExpiryTotal">Product Near Expiry (Total Count)</div>
										<div class="panel-body" id="invProductNearExpiryReport">
									<button id="btnExportReport" class="btn btn-xs btn-warning"
										value="Excel" title="" data-placement="left"
										data-toggle="tooltip" data-original-title="Excel"
										style="margin-bottom: 10px;">
										Export To Excel
									</button>
									<script type="text/javascript">
									$("[id$=btnExportReport]")
											.click(
													function(e) {
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
												        var table_div = document.getElementById('productNearExpiryTableId');
												        var table_html = table_div.outerHTML.replace(/ /g, '%20');
												        a.href = data_type + ', ' + table_html;
												        //setting the file name
												        a.download = 'Product_Near_Expiry_Report_' + postfix + '.xls';
												        //triggering the function
												        a.click();
												        //just in case, prevent default behaviour
												        e.preventDefault();		
																
													});
								</script>
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: scroll; border: 1px solid grey;"
											class="col-md-12-1">
											<table class="table table-bordered" id="productNearExpiryTableId">
											<thead>
												<tr>
													<th class='col-md-1-1 center'>Sr NO</th>
													<th class='col-md-3-1 center'>Item ID</th>
													<th class='col-md-3-1 center'>Item Name</th>
													<th class='col-md-3-1 center'>Main Stock/Subinventory Name</th>
													<th class='col-md-3-1 center'>Batch Code</th> 
													<th class='col-md-3-1 center'>Batch Expiry Date</th> 
													<th class='col-md-3-1 center'>Days Remaining</th> 
													<th class='col-md-3-1 center'>Item quantity with UOM</th> 
												</tr>
											</thead>
												<tbody id="invProductNearExpiry">

										
												
												</tbody>
											</table>
										</div>
										</div>
								</div>
							</div>
							
							<div class="col-xs-12 col-sm-4 col-md-6 col-lg-6">
								<div class="panel panel-primary">
									<div class="panel-heading" id="productExpiredTotal"> Product Expired  (Total Count)
									</div>
									<div class="panel-body" id="productExpiredReport" >
									<button id="btnExportReport1" class="btn btn-xs btn-warning"
										value="Excel" title="" data-placement="left"
										data-toggle="tooltip" data-original-title="Excel"
										style="margin-bottom: 10px;">
										Export To Excel
									</button>
									<script type="text/javascript">
									$("[id$=btnExportReport1]")
											.click(
													function(e) {
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
												        var table_div = document.getElementById('productExpiredReport');
												        var table_html = table_div.outerHTML.replace(/ /g, '%20');
												        a.href = data_type + ', ' + table_html;
												        //setting the file name
												        a.download = 'Product_Expired_Report_' + postfix + '.xls';
												        //triggering the function
												        a.click();
												        //just in case, prevent default behaviour
												        e.preventDefault();		
																
													});
								</script>
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: scroll; border: 1px solid grey;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
													<th class='col-md-1-1'>Sr. No.</th>
													<th class='col-md-3-1'>Item ID</th>
													<th class='col-md-5-1'>Item Name</th>
													<th class='col-md-3-1'>Inventory Stock/Subinventory Name</th>
													<th class='col-md-3-1'>Batch Code</th>
													<th class='col-md-3-1'>Batch Expiry</th>
													<th class='col-md-3-1'> Item quantity with UOM</th>
													 
												</tr>
											</thead>
												<tbody id="invProductExpired">

													
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
	<%@include file="Footer.jsp"%>
	</section>
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<script type="text/javascript" src="js/inv_dashboard.js"></script>
	<!-- CUSTOM SCRIPT -->

	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#ehat_module_18").addClass("Anchor active");
			getItemStockBelowMinimumInQty();
			getProductExpired();
			getTodayIndent();
			getInProgressIndent();
			getPendingIndent();
			getProductNearExpiry();		
			
		});
	</script>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>