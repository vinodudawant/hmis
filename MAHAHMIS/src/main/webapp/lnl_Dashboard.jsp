<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Laundry Dashboard</title>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="css/ExtraCss/inventory_Sales_Quotation.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />


<script src="js/ExtraJs/inventory_Sub_Contracting_Material_Issue.js"></script>
<!-- <script src="js/ExtraJs/inventory_Goods_Issue.js"></script> -->
<script src="jquery/jquery-2.1.1.js"></script>


<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript"
	src="js/ExtraJs/inventory_Document_SetUp.js"></script>
<script type="text/javascript" src="js/ExtraJs/inventory_Stock_Dashboard.js"></script>	
<script type="text/javascript" src="js/laundry_request.js"></script>

<script src="js/script.js"></script>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("111"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>



<script>

onload = function() {
	
	getlistforRequestedItemsDashboard();
	getlistforProcessingItemsDashboard();
	getlistforDispachedItemsDashboard();
	getlistforCompletedItemsDashboard();
}
	
	
	
	
	
	
	
	
	/*  $(document).ready(function(){
	
	 $("#BtnAddNewRecord").click(function(){
	 //alert("hii");
	 $("#ItemInfoList").remove();
	 });	
	 $("#btnAddNew").click(function(){
	
	 $("#ItemInfoList").show();
	 });
	 });  */
</script>
<style type="text/css">

tbody#Lowinqty tr:nth-child(odd) {
      
    background-color:#f2dede;
}
tbody#inv_pending tr:nth-child(odd) {
      
    background-color:#f2dede;
}
tbody#Lowinqty tr:nth-child(odd) {
      
    background-color:#f2dede;
}
tbody#todayindent tr:nth-child(odd) {
      
    background-color:#f2dede;
}

</style>
</head>
<body style="background: white ! important;">
	<section id="page"> <!-- HEADER --> <header
		class="navbar clearfix" id="header"> <%@include
		file="Menu_Header_Nobel.jsp"%></header> <%@include
		file="left_menu_LinenLaundry.jsp"%> <!-- /SIDEBAR -->
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

								<ul class="breadcrumb col-md-12-1"
									style="padding: 6px 10px; margin-top: 1px;">
									<li>Date : <%=todays_date%></li>
									<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
									</li>
									<!-- <li><i class="fa fa"></i></li> -->
									<!-- <li class="pull-right">
										<button class="btn btn-xs btn-success" type='button'
											value='Save Now'>Save</button>
										<button class="btn btn-xs btn-warning">Print</button>
										<button class="btn btn-xs btn-danger">Discard</button>
									</li> -->
								</ul>

							</div>
						</div>
					</div>
					<div style="font-weight: bold;" class="col-md-1-1"></div>
					<div class='divide-20'></div>
					<!-- <div class='divide-40'></div> -->

					<div class="container">
						<div class="row">
							<div class="col-xs-10 col-sm-6 col-md-6 col-lg-6">
								<div class="panel panel-default ">
									<div class="panel-heading"
										>Requested Indent
									</div>
									<div class="panel-body">
									 
										<div
											style="height: 140px; overflow-y: scroll; overflow-x:hidden; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table  class="table table-bordered"  >
											<thead>
												<tr>
													<th class='col-md-1 center '>#</th>
												    <th class='col-md-3-1 center'>Mrn Id</th>
													<th class='col-md-3-1 center'>Sub Department</th>
												
								<!-- 					<th class='col-md-2-1 center'>Below Minimum Level</th>
													<th class='col-md-1-1 center'>Item Qty</th> -->
													<!-- <th class='col-md-3-1'>Add Items</th> -->
													 
												</tr>
											</thead>
												<tbody id="Requestedqty" >

					
												</tbody>
											</table>
										</div>
							<!--ajaxResponce for item low qrty @author:paras @Date:30nov  -->			
										<div id="LowqtyAjaxResp" style="visibility: hidden;">
										</div>
									</div>
								</div>
							</div>
							<div class="col-xs-10 col-sm-6 col-md-6 col-lg-6" >
								<div class="panel panel-default">
									<div class="panel-heading"
										>Processing
										Indent</div>
										<div class="panel-body">
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
													<th class='col-md-1-1 center	'>#</th>
													<th class='col-md-3-1 center'>MRN ID</th>
													
													<th class='col-md-3-1 center'>Sub Department</th>
													
													 
												</tr>
											</thead>
												<tbody id="processQty">

													<!-- <tr>
														<td class='col-md-1-1 danger'>1</td>
														<td class='col-md-3-1 danger'>Bandage</td>
														<td class='col-md-3-1 danger'>Solid</td>
														<td class='col-md-8-1 danger'>10</td>
														<td><button id='btnEdit2' class='btn btn-xs btn-danger'  value='EDIT'><i class='fa fa-edit'></i></button></td>
													</tr> -->
												
												</tbody>
											</table>
										</div></div>
								</div>
							</div>

						</div>
						<div class="row">
							<div class="col-xs-10 col-sm-4 col-md-6 col-lg-6"style="">
								<div class="panel panel-default">
									<div class="panel-heading"
										>Dispached Indent</div>
										<div class="panel-body">
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
												<th class='col-md-1-1 center	'>#</th>
													<th class='col-md-3-1 center'>MRN ID</th>
													
													<th class='col-md-3-1 center'>Sub Department</th>
													
													 
												</tr>
											</thead>
												<tbody id="dispachedIndent">

										<!-- 			<tr >
														<td class='col-md-1-1 danger'>1</td>
														<td class='col-md-3-1 danger'>Bandage</td>
														<td class='col-md-3-1 danger'>Solid</td>
														<td class='col-md-8-1 danger'>10</td>
														<td><button id='btnEdit2' class='btn btn-xs btn-danger'  value='EDIT'><i class='fa fa-edit'></i></button></td>
													</tr> -->
												
												</tbody>
											</table>
										</div>
										</div>
								</div>
							</div>
							
							
							<div class="col-xs-10 col-sm-4 col-md-6 col-lg-6"style="">
								<div class="panel panel-default">
									<div class="panel-heading"
										>Complete Indent</div>
										<div class="panel-body">
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
												<th class='col-md-1-1 center	'>#</th>
													<th class='col-md-3-1 center'>MRN ID</th>
													
													<th class='col-md-3-1 center'>Sub Department</th>
													
													 
												</tr>
											</thead>
												<tbody id="completeIndent">

										<!-- 			<tr >
														<td class='col-md-1-1 danger'>1</td>
														<td class='col-md-3-1 danger'>Bandage</td>
														<td class='col-md-3-1 danger'>Solid</td>
														<td class='col-md-8-1 danger'>10</td>
														<td><button id='btnEdit2' class='btn btn-xs btn-danger'  value='EDIT'><i class='fa fa-edit'></i></button></td>
													</tr> -->
												
												</tbody>
											</table>
										</div>
										</div>
								</div>
							</div>

							<div class="col-xs-10 col-sm-4 col-md-6 col-lg-6" style="visibility: hidden;">
								<div class="panel panel-default">
									<div class="panel-heading"
										">Requirement
									</div>
									<div class="panel-body">
									<div
											style="height: 140px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;"
											class="col-md-12-1">
											<table class="table table-bordered">
											<thead>
												<tr>
													<th class='col-md-1-1 	'>#</th>
													<th class='col-md-3-1'>Item Name</th>
													<th class='col-md-5-1'>Item Category</th>
													<th class='col-md-3-1'>Item Qty</th>
													<th class='col-md-3-1'>Add Items</th>
													 
												</tr>
											</thead>
												<tbody id="">

													<tr>
														<td class='col-md-1-1 danger'>1</td>
														<td class='col-md-3-1 danger'>Bandage</td>
														<td class='col-md-3-1 danger'>Solid</td>
														<td class='col-md-8-1 danger'>10</td>
														<td><button id='btnEdit2' class='btn btn-xs btn-danger'  value='EDIT'><i class='fa fa-edit'></i></button></td>
													</tr>
													<tr>
														<td class='col-md-1-1  '>2</td>
														<td class='col-md-3-1  '>Injection</td>
														<td class='col-md-3-1  '>Solid</td>
														<td class='col-md-8-1  '>7</td>
														<td><button id='btnEdit2' class='btn btn-xs btn-danger'  value='EDIT'><i class='fa fa-edit'></i></button></td>
													</tr>
													<tr>
														<td class='col-md-1-1 danger'>3</td>
														<td class='col-md-3-1 danger'>Cotton</td>
														<td class='col-md-3-1 danger'>Solid</td>
														<td class='col-md-8-1 danger'>12</td>
												<td><button id='btnEdit2' class='btn btn-xs btn-danger'  value='EDIT'><i class='fa fa-edit'></i></button></td>
													</tr>
													<tr>
														<td class='col-md-1-1 '>4</td>
														<td class='col-md-3-1'>Syrups</td>
														<td class='col-md-3-1'>Liquid</td>
														<td class='col-md-8-1'>20</td>
													<td><button id='btnEdit2' class='btn btn-xs btn-danger'  value='EDIT'><i class='fa fa-edit'></i></button></td>
													</tr>
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

	</div>
	</section>
</body>
</html>