<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Import Stock | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<%-- <link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/responsive.css"/>">
<link
	href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_shortcut.js"/>"></script>


<!-- JQUERY -->
<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.js"/>"></script>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" /> --%>

<!-- for Developers  -->
<!-- <script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->
<%-- <script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script> --%>
<%@include file="pharma_header.jsp"%>
</head>
<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 100000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/pharma-resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
<script>
	jQuery(document).ready(function() {
		App.setPage("widgets_box");  //Set current page
		App.init(); //Initialise plugins and elements
		//getAllStore();
		//setUserAccess();
	
	//Program a custom submit function for the form
	$("#importExcelForm").submit(function(event){
	  //disable the default form submission
	  event.preventDefault();
	  var fileName=$('#importFile').val();
	  if(fileName!="" && fileName!=null){
		//grab all form data  
		  var formData = new FormData($(this)[0]);
		  $.ajax({
		    url: 'readExcel',
		    type: 'POST',
		    data: formData,
		    async: false,
		    cache: false,
		    contentType: false,
		    processData: false,
		    success: function (returndata) {
		      alert(returndata);
		    }
		  });
		  return false;
	  }
	  else{
		  alert("Please select file first");
	  }
	});
	
	});
	
	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
	
</script>


<body style="background: white ! important;">
	<section id="page">
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_transaction.jsp"%>
			<%@include file="HelpMenu.jsp"%>

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div class="col-lg-12" id="content">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul style="padding: 4px 10px; margin-top: 1px;"
											class="breadcrumb col-md-12-1">
											<li>Date : 03/12/2015</li>
											<li><i class="fa fa-home"></i> <a
												href="../../Dashboard.jsp">Home</a></li>
											<li><a href="../../pharmacy/pharmacy/masters">Pharmacy</a></li>
											<li>Transaction</li>
											<!-- <li><span style="background-color:red" class="badge" id='storeTitle'><i class="fa fa-hospital-o"></i> -->
											<%
											if(session.getAttribute("pharmacyStoreName")!=null)
											{
											%>
											<%=session.getAttribute("pharmacyStoreName") %>
											Store
											<%
											}
											else
											{
												%>
											<!-- No Sub Store Selected -->
											<%
											}
											%>
											</span>
											</li>

											<%
											if(session.getAttribute("pharmacyStoreName")!=null)
											{
											%>
											<li><a onclick="invalidateSession()"><span
													style="background-color: red" class="badge" id='storeTitle'><i
														class="fa fa-hospital-o"></i>return to Main store <%
											}
											%> </span></a></li>



										</ul>
									</div>
								</div>
							</div>

							<!-- /Common -->
							<div class="divide-20"></div>

							<div class="">
								<div class="col-md-12-1">

									<div class="row panel panel-default">
										<!-- <h4>The excel file must be in following format...</h4> -->
										<h4>
											The excel file must be in following format ...<a href="../.././pharma-resources/pharmaexcel/openingstock.xlsx"><button
													id="btnExport" class="btn btn-xs btn-info pull-right"
													value="Excel"   data-placement="left"
													data-toggle="tooltip" data-original-title="Excel">Export
													To Excel</button></a> 
										</h4>
										<table class="table table-condensed table-hover ">
											<thead>
												<tr>
													<th>Product</th>
													<th>Batch No.</th>
													<th>Expiry</th>
													<th>Quantity</th>
													<th>MRP</th>
													<th>Purchase Rate</th>
													<th>Bill Rate</th>
													<th>Rate</th>
													<th>Company</th>
												</tr>
											</thead>



											<tbody>
												<tr>
													<td>CAPETAZ</td>
													<td>CAP123</td>
													<td>11/22</td>
													<td>10</td>
													<td>70</td>
													<td>50</td>
													<td>50</td>
													<td>70</td>
													<td>ABC</td>
												</tr>
											</tbody>


										</table>
									</div>

									<div class="row panel panel-default">
										<form id="importExcelForm" name="importExcelForm">

											<div class="col-md-12-1" style="margin-top: 2%;">

												<div class="col-md-3" >
													<input type="file" name="file" id="importFile" required>
												</div>
												<div class="col-md-3" >
													<input type="submit" value="Start Import" class="btn btn-xs btn-info">
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<input type="hidden" id="userID" />
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<%-- </c:if> --%>
			<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</section>
</body>
</html>