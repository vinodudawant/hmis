<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<title>DMS Dashboard | EhatEnterprise</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
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
	
	<!-- chart -->
	<script src="js/hisab/Chart.js"></script>
	<!-- //chart -->
	<!-- <script type="text/javascript" src="js/hisab/hisab.js"></script> -->
	<script type="text/javascript" src="js/Admin.js"></script>
	<script type="text/javascript" src="js/finance.js"></script>	
	<script type="text/javascript" src="js/mrd_mgt.js"></script>	
	
		<!--calender Files  -->
	<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
	<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
			
	<script>
	
		/* jQuery(document).ajaxStart(function() {		
			
			$("#pleaseWait").show();
		});
	
		jQuery(document).ajaxStop(function() {
			
			$("#pleaseWait").hide();
		}); */

		
		onload = function() {
			
			getCountDetailOfDMSAndMRD();
		}
	
		/* jQuery(document).ready(function() {
			App.setPage("Report"); //Set current page
			App.init(); //Initialise plugin1s and elements				
		}); */
	</script>
	
	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
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
	<header class="navbar clearfix" id="header">
		
		<%@include file="Menu_Header_Nobel.jsp"%>
		
	</header>
	<!--/HEADER -->
	
	<!-- PAGE -->
	<section id="page">
		
		<!-- SIDEBAR -->
		<%@include file="left_menu_dms.jsp"%>
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
											<%-- <input id="fromDate" class="form-control input-SmallText"
												
												onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>"> --%>
												<input id="fromDate" class="form-control input-SmallText"
												type="text"
												onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>">
										</div>
									</div>

									<div class="col-md-3" style="margin-top: 2px">
										<div class="col-md-2">
											<label>To</label>
										</div>
										<div class="col-md-10">
											<%-- <input id="lastDate" class="form-control input-SmallText"
											
												onclick="displayCalendar(document.getElementById('lastDate'),'yyyy-mm-dd',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>"> --%>
												<input id="lastDate" class="form-control input-SmallText"
												type="text"
												onclick="displayCalendar(document.getElementById('lastDate'),'yyyy-mm-dd',this)"
												readonly="readonly" name="date" placeholder="Date"
												value="<%=todays_date%>">
										</div>
									</div>									

									<div class="col-md-1" style="margin-top: 2px">
										<input type="button" onclick="getCountDetailOfDMSAndMRD();"
											class="btn btn-primary" value="Show">
									</div>
									 
								</div>
							</div>								
						</div>

						<div class="divide-10"></div>				
						
						<div class="charts">
							<div class="col-md-5 charts-grids widget">
								<h4 class="title">MRD</h4>
								<canvas id="bar" height="300" width="400"> </canvas>
							</div>
							<div class="col-md-5 charts-grids widget states-mdl">
								<h4 class="title">DMS</h4>
								<canvas id="line" height="300" width="400"> </canvas>
							</div>
							<!-- <div class="col-md-4 charts-grids widget">
								<h4 class="title">IPD</h4>
								<canvas id="pie" height="300" width="400"> </canvas>
							</div> -->
							<div class="clearfix"> </div>
								 									
						</div>			
						
						
						<div class="row">
	
							<div class="divide-20"></div>
							
							<div id="financeDashboard" class="col-md-12 stats-info stats-last widget-shadow">
								<table class="table stats-table">
									<thead>
										<tr>
											<th>File Created</th>
											<th>File Updated</th>
											<th>File Deleted</th>											
											<th>Document Uploaded</th>
											<th>Doc Deleted</th>											
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