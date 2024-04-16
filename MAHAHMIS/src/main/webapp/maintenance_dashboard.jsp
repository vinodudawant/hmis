<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Maintenance Dashboard</title>
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
	<%@include	file="inv_maintenance_left_menu.jsp"%> 
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
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-right"style="">
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
												        var table_div = document.getElementById('warrantyActionAlertTotalReport');
												        var table_html = table_div.outerHTML.replace(/ /g, '%20');
												        a.href = data_type + ', ' + table_html;
												        //setting the file name
												        a.download = 'Warranty_Action_Alert_Report_' + postfix + '.xls';
												        //triggering the function
												        a.click();
												        //just in case, prevent default behaviour
												        e.preventDefault();		
																
													});
										</script>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"style="">
								<div class="panel panel-primary">
									<div class="panel-heading" id="warrantyActionAlertTotal">Warranty Action Alert (Total Count)</div>
										<div class="panel-body" id="warrantyActionAlertTotalReport">
											<div style="height: 250px;overflow-y: scroll; overflow-x: scroll; border: 1px">
												<table class="table table-bordered">
													<thead>
														<tr>
															<th class='col-md-1-1 center'>Sr.No.</th>
															<th class='col-md-3-1 center'>Asset Id</th>
															<th class='col-md-3-1 center'>Asset Name</th>
															<th class='col-md-3-1 center'>Serial No</th>
															<th class='col-md-3-1 center'>Department</th> 
															<th class='col-md-3-1 center'>Hospital Department</th> 
															<th class='col-md-3-1 center'>Purchase Date</th> 
															<th class='col-md-3-1 center'>Party Name</th> 
															<th class='col-md-3-1 center'>Maintenance Contract</th> 
															<th class='col-md-3-1 center'>Valid From</th> 
															<th class='col-md-3-1 center'>Valid To</th> 
															<th class='col-md-3-1 center'>Alert Date</th> 
															<th class='col-md-3-1 center'>Remaining Days</th> 
														</tr>
													</thead>
													<tbody id="maintenanceWarrantyActionAlert">
													
													</tbody>
												</table>
											</div>
									</div>
								</div>
							</div>
						</div>
						<div class='divide-20'></div>
						<div class='divide-20'></div>
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-right"style="">
								<button id="btnExportReport2" class="btn btn-xs btn-warning"
									value="Excel" title="" data-placement="left"
									data-toggle="tooltip" data-original-title="Excel"
									style="margin-bottom: 10px;">
									Export To Excel
								</button>
								<script type="text/javascript">
											$("[id$=btnExportReport2]")
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
														        var table_div = document.getElementById('expiredWarrantyTotalReport');
														        var table_html = table_div.outerHTML.replace(/ /g, '%20');
														        a.href = data_type + ', ' + table_html;
														        //setting the file name
														        a.download = 'Expired_Warranty_Report_' + postfix + '.xls';
														        //triggering the function
														        a.click();
														        //just in case, prevent default behaviour
														        e.preventDefault();		
																		
															});
										</script>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div class="panel panel-primary">
									<div class="panel-heading" id="expiredWarrantyTotal">Expired Warranty (Total Count)
									</div>
									<div class="panel-body" id="expiredWarrantyTotalReport">
										<div style="height: 250px; overflow-y: scroll; overflow-x: scroll; border: 1px">
											<table class="table table-bordered">
											<thead>
												<tr>
													<th class='col-md-1-1 center'>Sr.No.</th>
													<th class='col-md-3-1 center'>Asset Id</th>
													<th class='col-md-3-1 center'>Asset Name</th>
													<th class='col-md-3-1 center'>Serial No</th>
													<th class='col-md-3-1 center'>Department</th> 
													<th class='col-md-3-1 center'>Hospital Department</th> 
													<th class='col-md-3-1 center'>Purchase Date</th> 
													<th class='col-md-3-1 center'>Party Name</th> 
													<th class='col-md-3-1 center'>Maintenance Contract</th> 
													<th class='col-md-3-1 center'>Valid From</th> 
													<th class='col-md-3-1 center'>Valid To</th> 
													<th class='col-md-3-1 center'>Alert Date</th> 
													<th class='col-md-3-1 center'>Remaining Days</th> 
													 
												</tr>
											</thead>
												<tbody id="maintenanceExpiredWarranty">

													
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
	<script type="text/javascript" src="js/maintenance_dashboard.js"></script>
	<!-- CUSTOM SCRIPT -->

	<script>		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			getWarrantyActionAlert();
			getExpiredWarranty();
		});
	</script>
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>