<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat/Inventory</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

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

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
 
<!-- <script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- /for Developers  -->

<!-- Js for Autosuggestion -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script type="text/javascript" src="js/ExtraJs/inv_sanction_power.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		//$("#txtDocSeriesName").focus();
	});
	
	onload = function() {
		
		setAutoPatientName("txtempname","onload","HRMgmt_Database");
		setAutoUrNamSearch("byEmpName","onload","HRMgmt_Database");
		defaultViewUser('HRDashboard');
		setVendorNamesPO("txtSupplyerName", "onload");
		getNextSanpowId();
		fetchSanPowDetails();
		
		/* getNextDocNumberMasterId();
		fetchDocNumberDetailNew();
		fetchDocumentList();
		fetchFinancialList(); */
		
		
	}
</script>

</head>


<body style="background: white ! important;">
	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="Inventory_left_menu.jsp"%>
				
				
				<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
				"dd/MM/yyyy");
		String todays_date = formatter.format(currentDate.getTime());
	%>

				<div id="main-content">
					<div class="container">
						<div class="row" style="margin-top: -2px;">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row" >
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 7px 10px; margin-top: 1px;">
												<li>Date :<%= new Date()%></li>
												
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												<li><i class="fa fa-home"></i> <a href="inventory_Dashboard.jsp">Inventory</a></li>
												<li><a href="inv_sanction_power.jsp">Sanction Power</a></li>
											
												
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->

								<div id="SearchContent" class="col-md-12-1">
									<div class='col-md-1-1'>Search By:</div>
									<div class='col-md-2-1'>Emp Name</div>
									<div class='col-md-2-1'id="divtxtbyEmpName">
										<input name="byEmpName" id="byEmpName" type="text" onkeypress="setAutoUrNamSearch('byEmpName','onload','HRMgmt_Database');" class ='typeahead' placeholder="Sanction Emp Name "
											onkeypress="return validateNumbers(event)" /> <input type="hidden" id="byEmpId" value="0" >
									</div>
									<div class='col-md-2-1'>
										<input type="button" value="Search" class="btn btn-xs btn-primary"  placeholder=""
											onclick="fetchSanPowSerch();" />
									</div>
								</div>
								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">
										<div id="demoCategoryMaster" class="col-md-4-1"
											 style="height: 150%; margin-top: 1%; padding-left: 20px; border: 1px solid #b8b8b8;">
											<form action="" id="categoryMaster" method="post" name="documentnumberForm">
												<div class="col-md-12-1 center">
													<h4 id="title">Sanction Power Form</h4>
												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b> Id
														</b></div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" id="txtSanctionId" name="txtSanctionId"
															 placeholder="Sanction Id" readonly>
													</div>

												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>Date
														</b></div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" id="txtdate" name="txtdate"
															 value = <%= todays_date %> placeholder="Date" readonly>
													</div>

												</div>
												
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>Emp Name
														</b></div>
														<div class="col-md-1-1"
														style="color: red;margin-left:-16%; margin-top:-1%;">
														<b>*</b>
													</div>
													<div class="col-md-7-1" style="padding-top: 2%;"  id="divtxtempname" >
														<input type="text" id="txtempname" placeholder="Emp Name"
													 name="txtempname"  onkeypress="setAutoPatientName('txtempname','onload','HRMgmt_Database');" class ='typeahead'>
													 <input type="hidden" id="txtempId" placeholder="Emp Name"
													 name="txtempId"  value="0">
													 
													</div>
													
												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b> Emp Sanction Amt
														</b></div>
													<div class="col-md-1-1"
														style="color: red; color: red; margin-left:-11%; margin-top:-1%;">
														<b>*</b>
													</div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" id="txtEmpSanctionAmt" placeholder="Emp Sanction Amt"
														 name="txtEmpSanctionAmt">
													</div>
												
												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>Supplyer Name
														</b></div>
															<div class="col-md-1-1"
														style="color: red; margin-left:-9%; margin-top:-1%;">
														<b>*</b>
													</div>
													<div class="col-md-7-1" style="padding-top: 2%;" id="divtxtSupplyerName" >
														<input type="text" id="txtSupplyerName" placeholder="Supplyer Name"
															onkeypress="setVendorNamesPO(this.id, 'onload');"  name="txtSupplyerName" class ='typeahead'>
															
															<input type="hidden" id="suppId" value = "0" >
													</div>
												
												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>Supplyer Sanction Amt
														</b></div>
														<div class="col-md-1-1"
														style="color: red;margin-left:-14%; margin-top:-1%;">
														<b>*</b>
													</div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" id="txtSuppSancnAmt" placeholder="Supplyer Sanction Amt"
															 onkeypress="return validateAlphaNumberic1(event)" name="txtSuppSancnAmt" >
													</div>
													
												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>New Sanction Amt
														</b></div>
														<div class="col-md-1-1"
														style="color: red; margin-left:-10%; margin-top:-1%;">
														<b>*</b>
													</div>
													<div class="col-md-8-1" style="padding-top: 2%;">
															<input type="text" id="txtNewSanctionAmt" placeholder="New Sanction Amt"
															 onkeypress="return validateAlphaNumberic1(event)" name="txtNewSanctionAmt" >
													</div>
													
												</div>
													<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;  "><b>Sanction NO
														</b></div>
														<div class="col-md-1-1"
														style="color: red; margin-left:-20%; margin-top:-1%;">
														<b>*</b>
													</div>
													<div class="col-md-8-1" style="padding-top: 2%; ">
															<input type="text" id="txtSanctionNO" placeholder="Sanction NO"
															 onkeypress="return validateAlphaNumberic1(event)" name="txtSanctionNO" >
													</div>
													
												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding: 4%;margin-left:110px;">
												<button  id = "btnSaveSan" class="btn btn-xs btn-primary editUserAccess" type="button"
														onclick="saveSanctionMaster()" disabled="disabled">Save</button> 
														</div>
														<div class="col-md-4-1"
														style="padding-right: 6%; padding: 4%;margin-left: -30PX;">
												<button class="btn btn-xs btn-danger" type="button"
														  onclick="clerSanForm();" >Clear</button> 
														</div>
														</div>
											</form>
										</div>
											<div  style="width: 55%; margin-left: 3%; float: left; height: 100%;">
												<div style="width: 100%; overflow-y: scroll; height:450px; max-height: auto; margin-left: 2%;">
	                                               <div style="margin-top:10px; padding-left: 0%;">
													<div id="sancPowrContent"></div>

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
				</div>
				
				<input type='hidden' id='queryType' value='' />
				<input type='hidden' id='SaveUpdate' value='0' />
				
				<script type="text/javascript">
					
				</script>
				<%@include file="Footer.jsp"%></div>
				<div id="userObj" style="display: none;"></div>
			 <input type="hidden" id="currentuserName"  value="<%= session.getAttribute("userName")%>"/>
    		<input type="hidden" id="currentUserID"  value="<%= session.getAttribute("userId")%>"/>
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
</html>