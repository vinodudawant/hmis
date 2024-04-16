<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title> IPD Deleted Refund Report </title>
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
	href="timepeacker/jquery.datetimepicker.css" />
	<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-switch/bootstrap-datetimepicker.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />


<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>


<!-- include js for development -->
<script src="timepeacker/jquery.datetimepicker.js"></script>
<script type="text/javascript" src="js/report_ipd_collection.js"></script>
<script type="text/javascript" src="js/formattedDate.js"></script>
<script type="text/javascript" src="js/finance.js"></script>

<style>
table {
  text-align: left;
  position: relative;
  border-collapse: collapse; 
}
th, td {
  padding: 0.25rem;
}
tr.red th {
  background: red;
  color: white;
}
tr.green th {
  background: green;
  color: white;
}
tr.purple th {
  background: purple;
  color: white;
}
th {
  background: white;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
.dynamicstructurescroll{
	max-height:350px;
	overflow:auto;
	scrollbar-width: thin;
}
</style>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
	
	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());
	
		Object CurrentuserName = session.getAttribute("userName");
		Object currentUserId = session.getAttribute("userId");
		session.setAttribute("CurrentuserName", CurrentuserName);
		session.setAttribute("currentUserID", currentUserId);
		System.out.println("Your Current NAme is ************* "+CurrentuserName);			
	%>
	
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
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
									<div class="page-header" style="height: 92%;">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="dd_opdDashBoard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a
												href="report_ipd_deleted_collection.jsp">IPD Deleted Refund Report  </a></li>
											<li class="pull-right">

										<button class="btn btn-info btn-xs" id="btnExportipddel" data-placement="left"
											data-toggle="tooltip" >Export Excel</button>
												<script type="text/javascript">
													$("[id$=btnExportipddel]").click(function(e) {
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
																		var table_div = $('#ipddeletedrefundtable').clone();

																		// Adding styles to the cloned content
																	    table_div.find('th').css({
																	        'background-color': '#CCFF66',
																	        'border': '1px solid black',
																	        'text-align': 'center',
																	        'vertical-align': 'middle'
																	    });

																	    table_div.find('td').css({
																	    	 'background-color': '#d3d3d3',
																	        'border': '1px solid black',
																	        'text-align': 'center',
																	        'vertical-align': 'middle'
																	    });

																		// Convert the HTML content to a string
																		var table_html = table_div[0].outerHTML.replace(/ /g, '%20');
																		
																		//setting the file name
																		a.href = data_type + ', ' + table_html;
																		a.download = 'IPD Deleted Refund Report' + postfix + '.xls';

																		//triggering the function
																		a.click();

																		//just in case, prevent default behaviour
																		e.preventDefault();

																	});
												</script>
												
											</li>										
											
											<!-- <li class="pull-right">
												<button  class="btn btn-primary btn-xs" onclick="openIpdDeletedReport()">Export PDF</button>
											</li> --> 
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

													<div class="col-md-12 form-group">
									
									<div class="col-md-2 form-group">
									<div class="col-sm-4">
										<label for="inlineFold" class="control-label">From
											</label>
									</div>
										<input type="text" 
												class="form-control span6 input-mini search-query"
												placeholder="Date" name="date" readonly="readonly"
											onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
											id="fromDate" value="<%=todays_date%>">
									</div>
									
									<div class="col-md-2 form-group">
									<div class="col-sm-4">
										<label for="inlineFold" class="control-label">To
											</label>
									</div>
										<input type="text" 
												class="form-control span6 input-mini search-query"
												placeholder="Date" name="date" readonly="readonly"
											onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
											id="lastDate" value="<%=todays_date%>">
									</div>
									
									<div class="col-md-1 form-group">
									<div class="divide-20"></div>
										<button class="btn btn-primary btn-xs" onclick="getIpdDeletedRefundData('deleted')">Search&nbsp;<i class="fa fa-search" aria-hidden="true"></i>
										</button>
									</div>
							</div>
									
									<div class="col-md-4">
									<div class="col-sm-2">
										<label style="display: none">PayMode </label>
									</div>
									<div class="col-md-6">
										<select id="payMode" style="display: none" class="form-control input-SmallText" style="width:100%">
											<option value="0">--select--</option>
											<option value="1">Cash</option>
											<option value="2">Card</option>
											<option value="3">Cheque</option>
											<option value="4">Common Advance</option>
											<option value="6">PhonePay</option>
											<option value="7">GooglePay</option>
											<option value="8">UPI</option>
										</select>
									</div>
									</div>
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-primary">
										<div class="panel-heading">IPD Deleted Refund Report  </div>
										<div class="panel-body">

											<div class="dynamicstructurescroll" >
												<table id="ipddeletedrefundtable"
													class="table table-bordered table-responsive table-striped">
													<thead>
														<tr>
															  <th class="text-center">Srno.</th>
															  <th class="text-center" >UHID</th>
                                                              <th class="text-center">Refund&nbsp;No.</th>                                                             
                                                              <th class="text-center" > Patient&nbsp;Name</th>  
                                                              <th class="text-center" > Bill No</th>   
                                                              <th class="text-center">RefundDeleted&nbsp;Amt</th>                        
                                                              <th class="text-center" >Paymode</th>
                                                              <th class="text-center" >Bank Name</th>
                                                              <th class="text-center" >Card No</th>                                                           
                                                              <th class="text-center">User</th>
                                                              <th class="text-center" >Deleted&nbsp;DateTime</th>
                                                              <th class="text-center" >Deleted&nbsp;By</th>
                                                              <th class="text-center" >Remark</th>
                                                              <th class="text-center" >Unit</th>
                                                              <th class="text-center" >Department</th>
                                                             
														</tr>
													</thead>
													<tbody id="deletedRefundIpdtable">
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
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
		
			//setTodaysDateAndTime('fromDate','lastDate','fromDate','lastDate');
			getIpdDeletedRefundData('deleted');
			//getPayModes();
		});
		
	</script>

		<input type="hidden" id="userId1"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
			<input type="hidden" id="userType"
			value="<%=session.getAttribute("userType")%>">
			<input type="hidden" id="userid"
			value="0">
		<!-- /JAVASCRIPTS -->

		<input type="hidden" id="datecallfrom" value="" />

		<input type="hidden" id="fromdate" value="<%=session.getAttribute("fDate")%>" />
		<input type="hidden" id="todate" value="<%=session.getAttribute("tDate")%>" />
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>