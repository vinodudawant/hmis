<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<title>Previous Operation Dashboard</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- AUTOSUGGESTION -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 5/1/2015-->
<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
    href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<!-- CUSTOM SCRIPT -->
<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {

		$("#OTManagement").addClass("menuActive");
		$("#preOP").addClass("anchorActive");

		
	}
</script>
</head>


<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header_Nobel.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_otmanagement.jsp"%>
				<!--End Left Menu -->
				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd/MM/yyyy");
						java.text.SimpleDateFormat formatter2 = new java.text.SimpleDateFormat(
								"yyyy-MM-dd");
						String todays_date = formatter.format(currentDate.getTime());
						String todays_date2 = formatter2.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-8-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="OT_Reports.jsp">OT</a></li>
												<li><a href="OT_Cathlab.jsp">Cathlab Report</a></li>
											</ul>
											<div style="margin-top:2px" class="pull-right">
													<button data-original-title="Export" class="btn btn-xs btn-primary" data-toggle="tooltip" data-placement="left" title="" onclick="showEXPORTcathot()" id="btnPrint">
														EXPORT
													</button>
													<script type="text/javascript">

														$(document).on('click', '#btnPrint', function (e) { 
															var clonedContent = $('div[id$=containerotcathlab]').clone();
	
														    clonedContent.find('th').css({
														        'background-color': '#CCFF66',
														        'border': '1px solid black', // Add border to heading cells
														        	 'text-align': 'center',
														        	 'vertical-align': 'middle'
														    });
	
														    clonedContent.find('td').css({
														    	 'background-color': '#d3d3d3', 
														        'border': '1px solid black',
														        //'width': '100px', // Adjust width as per your requirement
														        	 'text-align': 'center',
														        	 'vertical-align': 'middle'
														    });
														    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
														    var link = document.createElement("a");
														    document.body.appendChild(link);
														    link.download = "CathlabReport.xls";
														    link.href = result;
														    link.click();
														});
														
														
													</script> 
											<!-- 	<button class="btn btn-xs btn-danger" data-toggle="tooltip" data-placement="left" title="" onclick="showotprintotreports('onload')" data-original-title="">
														PRINT
													</button> -->
												</div>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->
									<div style="font-weight: bold;" class="col-md-12-1">
	
										<div style="font-weight: bold;" class="col-md-1">Search By:</div>
										<div class="col-md-2">
										
											<input type="text"
												onclick="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)"
												id="popup_container2"
												class="form-control input-SmallText col-md-8-1 margin-1"
												readonly="readonly" placeholder="From Date "
												>
											<!-- <input name="operationDate" id="operationDate"
											class="dp-applied"
											onchange="viewOPerationPatient('OperationDashboard')" /> -->
										</div>
									
											<div class="col-md-2">
											<input type="text"
												onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
												id="popup_container3"
												class="form-control input-SmallText col-md-8-1 margin-1"
												readonly="readonly" placeholder="To Date "
												>
											<!-- <input name="operationDate" id="operationDate"
											class="dp-applied"
											onchange="viewOPerationPatient('OperationDashboard')" /> -->
										</div>
											<div class=" col-md-2">
													<!-- 	<button class="btn btn-xs btn-primary"
														data-toggle="tooltip" data-placement="left" title="Search "
														onclick="operationSummarySearch('OPSummaryDashBoard')">
														<i class = "fa fa-search"></i>
													</button> -->
											<button class="btn btn-xs btn-primary"
												data-toggle="tooltip" data-placement="left" title="Search "
												onclick="searchotpatientCathlab()">
												<i class = "fa fa-search"></i>
											</button>
								</div>
										    <div class="col-sm-2-1" style="margin-top:-11px;margin-left:20px; display: none;"><div class="form-group  col-sm-12-1">
                
                <div class="" style="margin-top:9px">
               <select id="doctorNameOT" value='null' name="doctorNameOT"
				class="form-control col-md-12" onchange=""></select></div></div></div>
				<div style="font-weight: bold;display: none;" class="col-md-1-1" >Surgery Type</div>
                    <div class="col-sm-2-1" style="margin-top:-11px;margin-left:20px">
                    <div class="form-group  col-sm-12-1">
                
                <div class="" style="margin-top:9px;display:none;">
               <select id="selOTtypeOT" value='null' name="selOTtypeOT"
				class="form-control col-md-12" onchange=""></select></div></div></div>
										</div>
                   <div class="divide-20"></div>
								<!-- Page Search Header -->
								

							<!-- 	<div style="font-weight: bold;" class="col-md-1-1">Patient
									Name</div> -->

						

								<!-- <div style="font-weight: bold;" class="col-md-1-1">Patient
									ID</div> -->

								<div class="form-group col-md-2-1"style="margin-left:-61px;display: none;">
									<input id="byId1"
										class="form-group form-control input-SmallText" name="byId1"
										type="text" onkeypress="return validateNumbers(event)"  placeholder="Patient ID"/>
								</div>
								
								<!-- Page Search Header -->


								<div class="divide-40"></div>
								

										<!-- Start Table Gui -->



										<!-- from operation.js <var containerviewAssessTemplate> -->
											<div id="containerotcathlab" >
										<div id="containerot" class="col-md-12-1"
											style="margin-top: -22px; border: 1px solid #ddd;height: 400px;overflow-y: scroll;">
											<div style="margin-left:389px;display: none;" class=""><label style="width:200px;font-size:16px" class="center">Nobel Hospital Pvt Ltd</label><br>
									<label style="width:320px;margin-left:-41px" class="center">..153,Magarpatta City Road,Hadapsar,Pune pin -411013 ,Phone No.020-66285000/43285000</label>
								
								<div style="margin-left:-36px" class=""><label style="width:300px;font-size:16px;display: none;" class="center">Cathlab  Summary From	</label><br>
									<label id="daterd" style="width:320px;margin-left:-9px;font-size:14px" class="center"></label>
								
								
									
									</div>
									
									</div>
												<table
												class='table'
												style='width: 98.8%; margin-top: 10px;' >
												
												<thead class="cf">
															<tr>
																	<th style="height: 21.5px;" class="center"><div class="TextFont">#</div></th>
																	<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Procedure Name</div></th>
																	<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Count</div></th>
																	<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Procedure Amt</div></th>
																		
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Bill Amt</div></th>
																	
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Discount</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Debit</div></th>
													
																		
																		
																		<th style=" height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">credit</div></th>
																		
																		
																		<th style=" height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Net Amt</div></th>
																		
																		<th style=" height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Advance</div></th>
																		
																		
																		
																	 <th style=" height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">Recd In</div></th>
																		<th style=" height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">BAL On Bill</div></th>
																	<th style=" height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Dues Recd</div></th>
																	<th style=" height: 21.5px;" class="col-md-2-1 center"><div class="TextFont">Dues amt</div></th>
																	
																		
													
															</tr>
														</thead>
												<tbody id="otpr"></tbody>
										
											</table>
												
											</div>
	                                     	<div id="" class="col-md-12-1" style="border: 2px solid #ddd;margin-top:-1px;border-style:dotted" ><table
												class='table'
												style='width: 98.8%; margin-top: 10px;' >
												
												
												<tbody id="otpr2"></tbody>
										
											</table></div>
											</div>
										<!-- End Table Gui -->

									
							</div>
							<!-- End id="content" -->
						</div>
						<!-- End class="row" -->
					</div>
					<!-- class="container" -->
				</div>
				<!-- id="main-content" -->
			</div>
			<!-- id="outer" -->

			<div><%@include file="footer_nobel.jsp"%></div>
			<input type="hidden" id="tomId" value="<%=request.getParameter("tomId")%>"/>
			<div id="divPatId" style="display: none;"><%=request.getParameter("myObj")%></div>
		</c:if>
	</section>
	<!-- JAVASCRIPTS -->
	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->

	<!-- COOKIE -->
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<!-- <script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
		});
	</script> -->
		
<!-- /JAVASCRIPTS -->
</body>
</html>