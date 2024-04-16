<%@page import="java.util.Date"%>

<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>BMW Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<%@include file="inv_header.jsp"%>
<style>
.tdColorWarning{
	color:#e1890c;
	font-weight: bold;
}
.tdColorRed{
	color:red;
	font-weight: bold;
}
.tdColorGreen{
	color:green;
	font-weight: bold;
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
			<%@include file="BMW_left_menu.jsp"%>
			<!-- /SIDEBAR -->
			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
				String todays_date = formatter.format(currentDate.getTime());
				
				Date date = new Date();
				java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy h:mm:ss a");
				String formattedDate = sdf.format(date);					
			%>
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							
							
							<div class="row">
								<!-- NEW ORDERS -->
						<div class="col-md-12-1" style="margin-top: 2%">
						 <marquee style="font-size:35px;color: red ">Welcome to BMW Dashboard</marquee>
							<div class="col-md-12-1" style="display:none; ">
								<div class="col-lg-3 col-md-6">
									<div class="panel panel-primary">
										<div class="panel-heading">
											
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-comments fa-5x"></i>
												</div>
												<div class="col-xs-9 text-right">
													<div class="huge" id="subChrgCount">00</div>
													<div style="font-size:15px;">All Samples</div>
												</div>
											</div>
										</div>
										<!-- <a href="#">
											<div class="panel-footer" onclick="getUsersLoginOrNew('login')">
												<span class="pull-left">View Details</span> <span
													class="pull-right"><i
													class="fa fa-arrow-circle-right"></i></span>
												<div class="clearfix"></div>
											</div>
										</a> -->
									</div>
								</div>
								<div class="col-lg-3 col-md-6">
									<div class="panel panel-green">
										<div class="panel-heading">
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-tasks fa-5x"></i>
												</div>
												<div class="col-xs-9 text-right">
													<div class="huge" id="servCount">00</div>
													<div style="font-size:15px;">Accepted Sample</div>
												</div>
											</div>
										</div>
										<!-- <a href="#">
											<div class="panel-footer" onclick="getUsersLoginOrNew('new')">
												<span class="pull-left">View Details</span> <span
													class="pull-right"><i
													class="fa fa-arrow-circle-right"></i></span>
												<div class="clearfix"></div>
											</div>
										</a> -->
									</div>
								</div>
								<div class="col-lg-3 col-md-6">
									<div class="panel panel-yellow">
										<div class="panel-heading">
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-shopping-cart fa-5x"></i>
												</div>
												<div class="col-xs-9 text-right">
													<div class="huge" id="chrgCount">00</div>
													<div style="font-size:15px;">Acceptance Pending</div>
												</div>
											</div>
										</div>
										<!-- <a href="#">
											<div class="panel-footer">
												<span class="pull-left">View Details</span> <span
													class="pull-right"><i
													class="fa fa-arrow-circle-right"></i></span>
												<div class="clearfix"></div>
											</div>
										</a> -->
									</div>
								</div>
								<div class="col-lg-3 col-md-6">
									<div class="panel panel-red">
										<div class="panel-heading">
											<div class="row">
												<div class="col-xs-3">
													<i class="fa fa-shopping-cart fa-5x"></i>
												</div>
												<div class="col-xs-9 text-right">
													<div class="huge" id="deptCount">00</div>
													<div style="font-size:15px;">Rejected Sample</div>
												</div>
											</div>
										</div>
										
									</div>
								</div>
								
							</div>
						</div>
							</div>							
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
				<img style="margin-top: 250px;" height="43px" src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->
		<%@include file="inv_footer.jsp"%>
		<!-- BOOTSTRAP SWITCH -->
		<script type="text/javascript" src="ehat-design/js/bootstrap-switch/bootstrap-switch.min.js"></script>
		<!-- /JAVASCRIPTS -->
		<script>
		
			jQuery(document).ready(function() {		
				App.setPage("wizards_validations");  //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});	
						
			});
			
			
			
		</script>
	</c:if>
	<!-- include js for development -->
	<script type="text/javascript" src="js/pathology_reporting.js"></script>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>

