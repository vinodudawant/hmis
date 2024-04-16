<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script type="text/javascript" src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css" href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css" href="ehat-design/css/responsive.css" >
	<link rel="stylesheet" type="text/css" href="ehat-design/font-awesome/css/font-awesome.min.css" >
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- ANIMATE -->
	<link rel="stylesheet" type="text/css" href="ehat-design/css/animatecss/animate.min.css" />
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- XCHARTS -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/xcharts/xcharts.min.css" />
	
	<style type="text/css">
	
		.hh{		
			font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important;		
		}
		/* .panel-left{
			background-color: #eaeae8 !important;
		} */
		.panel-right{
			/* background-color: #dfe4f7; */
			/* box-shadow: -5px -5px 30px 5px white, 5px 5px 30px 5px #4f4fd9; */
		}
		.panel-default{
			border-color: #c1bbbb;
		}		
		.dashbox .panel-right .title{
			text-transform : none;
			font-size: 15px;
			color: #aa1f1f;
			/* font-weight: bold; */		
		}
		.dashbox .panel-right .number{	
			margin-top : 30px;	
			font-size: 20px;
			color: #370768;
		}		
		.select2-arrow{		
			background: #a8bc7b !important;
		}
		.ex-tooltip {
			background: none repeat scroll 0 0 black !important;
			color: white !important;
			opacity: 1 !important;
			filter: alpha(opacity=100);
		}
		.panel-left .red{
			padding: 32px;
		}
		
		.panel-right span{
			text-align: left;
		}
		
	</style>
<!-- include js for development -->
<script type="text/javascript" src="js/ehat_inventory.js"></script>
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

			<%@include file="left_menu_home.jsp"%>

			<!-- /SIDEBAR -->
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="height: auto">
										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li>
												<i class="fa fa-home"></i>
												<a href="Dashboard.jsp">Home</a>
											</li>
											<li>Dashboard</li>
											
											<li class="pull-right">
												<div class="clearfix">								
													<!-- DATE RANGE PICKER -->
													<span class="date-range pull-right" style="margin-top: -15px">
														<div class="btn-group">
															<a class="js_update btn btn-default" href="#" onclick="getGraphData('today');">Today</a>
															<a id="lastSevenDay" class="js_update btn btn-default" href="#" onclick="getGraphData('7days');">Last 7 Days</a>
															<a class="js_update btn btn-default hidden-xs" href="#" onclick="getGraphData('month');">Last month</a>
															
															<a id="reportrange" class="btn reportrange">
																<i class="fa fa-calendar"></i>
																<span></span>
																<i class="fa fa-angle-down"></i>
															</a>
														</div>
													</span>
													<!-- /DATE RANGE PICKER -->
												</div>
											</li>					
											
										</ul>
										
									</div>
								</div>
							</div>
							<!-- /PAGE HEADER -->
							
							<!-- DASHBOARD CONTENT -->
							<div class="row">
								<!-- COLUMN 1 -->
								<div class="col-md-12">
									<div class="row">
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa fa-user fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div class="number" id="patient_reg">0</div>
													<div class="title">Patient Registered</div>
													<span class="label label-warning" style="height: 50px">
														OPD : <label id="opdCount">0</label> <br>
														DIAG : <label id="diagCount">0</label> <br>
														IPD : <label id="ipdCount">0</label>
													</span>
											   </div>
											</div>
										 </div>
									  </div>
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa  fa-flask fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div class="number" id="services_reg">0</div>
													<div class="title">Services Registered</div>
													<span class="label label-warning" style="height: 50px">
														OPD : <label id="opdServCount">0</label> <br>
														DIAG : <label id="diagServCount">0</label> <br>
														IPD : <label id="ipdServCount">0</label>
													</span>
											   </div>
											</div>
										 </div>
									  </div>
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa fa-user fa-check-square fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div class="number" id="totalBed">0</div>
													<div class="title">Total Beds</div>
													<span class="label label-warning" style="height: 35px">
														Avail Bed : <label id="availBedCount">0</label> <br>
														Clean Bed : <label id="cleanBedCount">0</label>
													</span>
											   </div>
											</div>
										 </div>
									  </div>
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa fa-truck fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div class="number" id="totOp">0</div>
													<div class="title">Total Operation</div>
													<!-- <span class="label label-warning" style="height: 35px">
														Avail : <label id="availBedCount">0</label> <br>
														Clean : <label id="cleanBedCount">0</label>
													</span> -->
											   </div>
											</div>
										 </div>
									  </div>
									</div>
									<div class="divide-20"></div>
									<div class="row">
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa fa-suitcase fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div style="margin-top: 40px"  class="number" id="gross_amount">0</div>
													<div class="title">Gross Amount (<label class="lblCurrency"></label>)</div>
													<span class="label label-warning" style="height: 50px">
														OPD : <label id="grossOpd">0</label> <br>
														DIAG : <label id="grossdiag">0</label> <br>
														IPD : <label id="grossIpd">0</label>
													</span>
											   </div>
											</div>
										 </div>
									  </div>
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa fa-scissors fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div style="margin-top: 40px"  class="number" id="discount_amount">0</div>
													<div class="title">Discount Amount (<label class="lblCurrency" ></label>)</div>
													<span class="label label-warning" style="height: 50px">
														OPD : <label id="discOpd">0</label> <br>
														DIAG : <label id="discDiag">0</label> <br>
														IPD : <label id="discIpd">0</label>
													</span>
											   </div>
											</div>
										 </div>
									  </div>
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa fa-tag fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div style="margin-top: 40px" class="number" id="net_amount">0</div>
													<div class="title">Net Amount (<label class="lblCurrency"></label>)</div>
													<span class="label label-warning" style="height: 50px">
														OPD : <label id="netOpd">0</label> <br>
														DIAG : <label id="netDiag">0</label> <br>
														IPD : <label id="netIpd">0</label>
													</span>
											   </div>
											</div>
										 </div>
									  </div>
									  <div class="col-lg-3">
										 <div class="dashbox panel panel-default">
											<div class="panel-body">
											   <div class="panel-left red">
													<i class="fa fa-download fa-3x"></i>
											   </div>
											   <div class="panel-right">
													<div style="margin-top: 40px" class="number" id="received_amount">0</div>
													<div class="title">Received Amount (<label class="lblCurrency"></label>)</div>
													<span class="label label-warning" style="height: 50px">
														OPD : <label id="recOpd">0</label> <br>
														DIAG : <label id="recDiag">0</label> <br>
														IPD : <label id="recIpd">0</label>
													</span>
											   </div>
											</div>
										 </div>
									  </div>
									</div>					
								</div>
							</div>
								
							<div class="divide-20"></div>
							
							<div class="row">
								<div class="col-md-6">									
									<div class="box border primary">
										<div class="box-title">
											<h4><i class="fa fa-bars"></i> <span class="hidden-inline-mobile hh">Patient Count</span></h4>
										</div>
										<div class="box-body">
											<figure class="chart" id="chart3"></figure>
										</div>
									</div>									
								</div>
							
								<div class="col-md-6">									
									<div class="box border primary">
										<div class="box-title">
											<h4><i class="fa fa-bars"></i> <span class="hidden-inline-mobile hh">Daily Revenue</span></h4>
										</div>
										<div class="box-body">
											<figure class="chart" id="chart7"></figure>
										</div>
									</div>									
								</div>
								
								<!-- <div class="col-md-12">									
									<div class="box border green">
										<div class="box-title">
											<h4><i class="fa fa-bars"></i> <span class="hidden-inline-mobile"></span></h4>
										</div>
										<div class="box-body">
											<div class="tabbable header-tabs">
												<ul class="nav nav-tabs">
													 <li><a onclick='getGraphData("7days")' href="#box_tab2" data-toggle="tab"><i class="fa fa-bar-chart-o"></i> <span class="hidden-inline-mobile hh">Daily Revenue</span></a></li>
													 <li class="active"><a onclick='getGraphData("7days")' href="#box_tab1" data-toggle="tab"><i class="fa fa-bar-chart-o"></i> <span class="hidden-inline-mobile hh">Patient Count</span></a></li>
												 </ul>
												 <div class="tab-content">
													 <div class="tab-pane fade in active" id="box_tab1">														
														<figure class="chart" id="chart3"></figure>													  
													 </div>
													 <div class="tab-pane fade" id="box_tab2">
														<figure class="chart" id="chart7"></figure>
													</div>
												 </div>
											</div>
										</div>
									</div>									
								</div> -->
																
							</div>
							
							<div class="row">
								
								<div class="col-md-6 text-center">
									<!-- <div class="box-title">
										<h4><i></i>Department Service Count</h4>										
									</div> -->																							
									<!-- <div>													
										<span class="sparklinepie">16,7,23</span>
									</div> -->
									<div class="box border inverse">
										<div class="box-body"> 
											<div id="pie1" class="chart"></div>		
										</div>
									</div>
																										
								</div>
								<div class="col-md-6 text-center">		
									<!-- <div class="box-title">
										<h4><i></i>Department Revenue</h4>										
									</div> -->
									<!-- <div>													
										<span class="sparklinepie">6,3,24,25</span>
									</div> -->	
									<div class="box border inverse">
										<div class="box-body">									
											<div id="pie2" class="chart"></div>		
										</div>
									</div>				
								</div>											
										
						   	</div>
							
							<!-- <div class="row">
								<div class="col-md-6">
									BOX
									<div class="box border inverse">
										<div class="box-title">
											<h4 class="hh">PATIENT COUNT</h4>											
										</div>
										<div class="box-body">
											<figure class="chart" id="chart3" style="min-width:350px"></figure>
										</div>
									</div>
									/BOX
								</div>
								<div class="col-md-6">
									BOX
									<div class="box border inverse">
										<div class="box-title">
											<h4 class="hh">DAILY REVENUE</h4>										
										</div>
										<div class="box-body">
											<figure class="chart" id="chart7" style="min-width:350px"></figure>
										</div>
									</div>
									/BOX
								</div>																
							</div> -->
							
						   	<!-- /DASHBOARD CONTENT -->
						  
							<div class="footer-tools">
								<span class="go-top">
									<i class="fa fa-chevron-up"></i> Top
								</span>
							</div>
							
						</div><!-- /CONTENT-->
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

	
	<!-- JQUERY UI-->
	<script type="text/javascript" src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script type="text/javascript" src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>		
	<!-- DATE RANGE PICKER -->
	<script type="text/javascript" src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>	
	<script type="text/javascript" src="lis/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<!-- Select2 -->
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- SPARKLINES -->
	<script type="text/javascript" src="ehat-design/js/sparklines/jquery.sparkline.min.js"></script>
	<!-- D3 -->
	<script type="text/javascript" src="ehat-design/js/d3/d3.v3.min.js"></script>
	<!-- XCHARTS -->
	<script type="text/javascript" src="ehat-design/js/xcharts/xcharts.min.js"></script>	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

	<!-- CUSTOM SCRIPT -->
	<script type="text/javascript" src="lis/script.js"></script>
	<script src="lis/highcharts.js"></script>
	<script src="lis/exporting.js"></script>
	<script src="lis/dashboard.js"></script>
	<script>
		jQuery(document).ready(function() {		
			App.setPage("index");  //Set current page
			App.init(); //Initialise plugins and elements	
			
			getAllCurrency();					
			getGraphData("7days");			
		});		
	</script>
	<!-- /JAVASCRIPTS -->
	
	<input type="hidden" id=txtFormCode value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="userType" value="<%=session.getAttribute("userType")%>">
	
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>