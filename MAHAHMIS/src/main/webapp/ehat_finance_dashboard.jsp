<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<title>Finance Dashboard | EhatEnterprise</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<!-- STYLESHEETS --><!--[if lt IE 9]><script src="js/flot/excanvas.min.js"></script><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script><![endif]-->
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- FONTS -->
	<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'> -->
	<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>
	
	<!-- JQUERY -->
	<script src="jquery/jquery-2.1.1.js"></script>
	
	<!--calender Files  -->
	<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
	
	<!-- chart -->
	<script src="js/hisab/Chart.js"></script>
	<!-- //chart -->
	<!-- <script type="text/javascript" src="js/hisab/hisab.js"></script> -->
	<script type="text/javascript" src="js/Admin.js"></script>
	<script type="text/javascript" src="js/finance.js"></script>
		
	<script>
	
		/* jQuery(document).ajaxStart(function() {		
			
			$("#pleaseWait").show();
		});
	
		jQuery(document).ajaxStop(function() {
			
			$("#pleaseWait").hide();
		}); */
	
		onload = function() {
			
			showGraphs();
		}
	
		/* jQuery(document).ready(function() {
			App.setPage("Report"); //Set current page
			App.init(); //Initialise plugin1s and elements				
		}); */
	</script>
	
	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		//java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());
	%>
	
</head>
<body>

	<!-- <div id="pleaseWait" style="text-align: center;">
        <img style="margin-top: 250px;" height="43px" src="images/loading_black.gif"/>
        <div style="margin-top: 10px; color: white">
            <b>Please wait...</b>
        </div>
	</div> -->
	
	<!-- HEADER -->
	<header class="navbar clearfix navbar-fixed-top" id="header">
		
		<%@include file="Menu_Header_Nobel.jsp"%>
		
	</header>
	<!--/HEADER -->
	
	<!-- PAGE -->
	<section id="page">
		
		<!-- SIDEBAR -->
		<%@include file="ehat_finance_leftmenu.jsp"%>
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
										<li>Date : <%=todays_date%></li>
										<li>
											<i class="fa fa-home"></i>
											<a href="Dashboard.jsp">Home</a>
										</li>
										
										<li>Dashboard</li>
										
										<div class="li pull-right">
											<div class="form-group">
												<div class="col-md-12">
													<div id="input-type" class="row">														
														<div class="col-sm-4">
															<label class="radio-inline">
																<button type="button" id="btFfinanceDashboard"
																	class="pull-right btn btn-xs btn-success btn-table-add-row editUserAccess"
																	data-toggle="tooltip" data-placement="left"
																	title="Export to excel" >
																	<i class="fa fa-print"></i>
																</button>
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										
									</ul>
									<!-- /BREADCRUMBS -->
									<div class="clearfix">
										<h3 class="content-title pull-left">Fixed Header & Sidebar</h3>
									</div>
									<div class="description">Fixed Header & Sidebar Layout</div>
								</div>
							</div>
						</div>
						<!-- /PAGE HEADER -->
						
						<div class="panel panel-default">

							<div class="panel-body">

								<div class="col-md-12">
									
						 			<div class="col-md-3" style="margin-top: 2px">
										<div class="col-md-2">
											<label>From</label>
										</div>
										<div class="col-md-10">
											<input id="fromDate" class="form-control input-SmallText"
												type="text"
												onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>">
										</div>
									</div>

									<div class="col-md-3" style="margin-top: 2px">
										<div class="col-md-2">
											<label>To</label>
										</div>
										<div class="col-md-10">
											<input id="lastDate" class="form-control input-SmallText"
												type="text"
												onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>">
										</div>
									</div>									

									<div class="col-md-1" style="margin-top: 2px">
										<input type="button" onclick="showGraphs();"
											class="btn btn-primary" value="Show">
									</div>
									 
								</div>
							</div>								
						</div>

						<div class="divide-10"></div>				
						
						<div class="charts">
							<div class="col-md-4 charts-grids widget">
								<h4 class="title">Diagnosis</h4>
								<canvas id="bar" height="300" width="400"> </canvas>
							</div>
							<div class="col-md-4 charts-grids widget states-mdl">
								<h4 class="title">OPD</h4>
								<canvas id="line" height="300" width="400"> </canvas>
							</div>
							<div class="col-md-4 charts-grids widget">
								<h4 class="title">IPD</h4>
								<canvas id="pie" height="300" width="400"> </canvas>
							</div>
							<div class="clearfix"> </div>
								 <script>
									/* var barChartData = {
										labels : ["Jan","Feb","March","April"],
										datasets : [
											{
												fillColor : "rgba(233, 78, 2, 0.9)",
												strokeColor : "rgba(233, 78, 2, 0.9)",
												highlightFill: "#e94e02",
												highlightStroke: "#e94e02",
												data : [65,59,90,40]
											},
											{
												fillColor : "rgba(79, 82, 186, 0.9)",
												strokeColor : "rgba(79, 82, 186, 0.9)",
												highlightFill: "#4F52BA",
												highlightStroke: "#4F52BA",
												data : [40,70,55,50]
											},
											{
												fillColor : "rgba(242, 179, 63, 1)",
												strokeColor : "rgba(242, 179, 63, 1)",
												highlightFill: "#F2B33F",
												highlightStroke: "#F2B33F",
												data : [40,70,55,70]
											}
										]
										
									}; */
									/* var lineChartData = {
										labels : ["Jan","Feb","March","April","May","June","July"],
										datasets : [
											{
												fillColor : "rgba(242, 179, 63, 1)",
												strokeColor : "#F2B33F",
												pointColor : "rgba(242, 179, 63, 1)",
												pointStrokeColor : "#fff",
												data : [70,60,72,61,75,59,80]
	
											},
											{
												fillColor : "rgba(97, 100, 193, 1)",
												strokeColor : "#6164C1",
												pointColor : "rgba(97, 100, 193,1)",
												pointStrokeColor : "#9358ac",
												data : [50,65,51,67,52,64,50]
	
											}
										]
										
									};
									var pieData = [
											{
												value: 90,
												color:"rgba(233, 78, 2, 1)",
												label: "Product 1"
											},
											{
												value : 50,
												color : "rgba(242, 179, 63, 1)",
												label: "Product 2"
											},
											{
												value : 60,
												color : "rgba(88, 88, 88,1)",
												label: "Product 3"
											},
											{
												value : 40,
												color : "rgba(79, 82, 186, 1)",
												label: "Product 4"
											}
											
										];
									
								new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);
								//new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
								new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData); */
								
								</script>
									
						</div>			
						
						
						<div class="row">
	
							<div class="divide-20"></div>
							
							<div id="financeDashboard" class="col-md-12 stats-info stats-last widget-shadow">
								<table class="table stats-table">
									<thead>
										<tr>
											<th></th>
											<th>Diagnosis Finance</th>
											<th>OPD Finance</th>
											<th>IPD Finance</th>
											<!-- <th>Vouchers Hisab</th> -->
											<th>Total Finance</th>
											<!-- <th>Last Total Hisab</th>
											<th>STATUS</th>
											<th>PROGRESS</th> -->
										</tr>
									</thead>
									<tbody id="hisabDetails">

									</tbody>
								</table>
							</div>
							<div class="clearfix"></div>
						</div>
						
						<script type="text/javascript">
							$("[id$=btFfinanceDashboard]").click(function(e) {
																			
								window.open('data:application/vnd.ms-excel,'+ encodeURIComponent($('div[id$=financeDashboard]').html()));
								e.preventDefault();
							});
						</script>					
						
					</div><!-- /CONTENT-->
				</div>
			</div>
		</div>
	</section>
	<!--/PAGE -->
	<!-- JAVASCRIPTS -->
	<!-- Placed at the end of the document so the pages load faster -->
	<!-- JQUERY -->
	<!-- <script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script> -->
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
	
		
	<!-- DATE RANGE PICKER -->
	<script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>
	
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script><script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script>
		jQuery(document).ready(function() {		
			App.setPage("fixed_header_sidebar");  //Set current page
			App.init(); //Initialise plugins and elements
		});
	</script>
	<!-- /JAVASCRIPTS -->
	
	<%-- <input type="hidden" id="fromDate" value="<%=todays_date%>">
	<input type="hidden" id="lastDate" value="<%=todays_date%>"> --%>
	
	<input type="hidden" id="totRec" value="0">
	<input type="hidden" id="totRef" value="0">
	<input type="hidden" id="totCash" value="0">
	
	<!-- <input type="hidden" id="totRec" value="0">
	<input type="hidden" id="totRef" value="0">
	<input type="hidden" id="totCash" value="0"> -->
	
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="payMode" value="0">
	<input type="hidden" id="payModeId" value="0">
	<input type="hidden" id="deptId" value="0">
	<input type="hidden" id="byName" value="0">
	
	<div class="col-sm-3" style="display: none;">
		<label class="radio-inline">Consolodated <input
			type="radio" name="billType" checked="checked"
			id="consolidated" value="1">
		</label>
	</div>
	
</body>
</html>