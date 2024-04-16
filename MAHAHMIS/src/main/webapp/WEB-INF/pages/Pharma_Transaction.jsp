<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Transaction | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<%-- <link rel="stylesheet" type="text/css"
	href="<c:url value="/pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="/pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="/pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">
	
<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/shortcut.js"/>"></script>

<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/app_js/pharma_shortcut.js"/>"></script>	


<!-- JQUERY -->
<script
	src="<c:url value="/pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="/pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script> --%>

<!-- SLIMSCROLL -->
<%-- <script type="text/javascript"
	src="<c:url value="/pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script> --%>

<%-- <link rel="stylesheet"
	href="<c:url value="/pharma-resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharma-resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />
 --%>
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
<%-- <script src="<c:url value="/pharma-resources/alertify.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharma-resources/js/script.js"/>"></script> --%>
</head>
<%@include file="pharma_header.jsp"%>

<script>
	jQuery(document).ready(function() {
		//App.setPage("widgets_box");  //Set current page
		App.init(); //Initialise plugins and elements
		getAllStore();
		setUserAccess();
	});

	function getAllStore() {

		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/store/getAllStore",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setAllStoreData(r);

			}
		});
	}
	
	function invalidateSession()
	{
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "../../pharmacy/mrn/invalidateSesion",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				alertify.success("Main Store Selected");
			}
		});
	}
	
	function setUserAccess() {

		jQuery.ajax({
			async : true,
			type : "GET",
			url : "../../pharmacy/access/setUserAccessSession",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
			}
		});
	}
	
	function setStoreToSession(storeId, storeName,storeUsers) {
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "../../pharmacy/mrn/saveSessionToStore",
			data : {
				storeId : storeId,
				storeName : storeName,
				storeUsers:storeUsers
			},
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				alertify.success(storeName + "  Store Selected");
			}
		});
	}

	function setAllStoreData(result) {
		if (result.length > 0) {
			for ( var i = 0; i < result.length; i++) {
				var storePersonName=result[i].storeContactPerson.slice(0,15);
				$('#storeData')
						.append(
								"<div class='col-sm-6 col-md-4' style='margin-bottom:2px;'><div class='thumbnail col-md-12' style='border-width:1px'><div class='caption'><div class='col-md-12-1'><i class='fa fa-medkit'></i>&nbsp;<strong id='storeName' class='center'>"
										+ result[i].storeName
										+ "</strong></div><div  class='col-md-8-1' style='margin-top:10px;'><div class='col-md-12-1' style='margin-top:2px;'> <i class='fa fa-user-md'></i> &nbsp;Contact Person-"
										+ storePersonName
										+ "</div><div class='col-md-12-1' style='margin-top:2px;'><i class='fa fa-hospital-o'></i>&nbsp;&nbsp;Store Location-"
										+ result[i].storeLocation
										+ "</div><div class='col-md-12-1' style='margin-top:2px;'><i class='fa fa-book'></i>&nbsp;&nbsp;Store Number-"
										+ result[i].storeNumber
										+ "</div></div><div class='col-md-4-1' style='margin-top:10px;'><a href='#' style='' class='btn btn-primary' role='button' onclick=setStoreToSession("
										+ result[i].storeId
										+ ",'"+ result[i].storeName+ "','"+result[i].storeUserId+"')>Select &nbsp;<i class='fa fa-arrow-circle-right'></i></a></div></div></div></div>");
				
			}
		}
	}
</script>


<body style="background: white ! important;">
	<section id="page">

		<%-- <c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }"> --%>

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
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
					<!-- <div class="divide-20"></div>
					<div class="divide-20"></div>
					<div class="divide-20"></div>
					<div class="col-md-12-1">

						<div class="col-md-12-1">

							<div class="row" id="storeData">
								
								
							</div>
						</div>
					</div> -->

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
											<li><span style="background-color:red" class="badge" id='storeTitle'><i class="fa fa-hospital-o"></i>
											<%
											if(session.getAttribute("pharmacyStoreName")!=null)
											{
											%>	
												<%=session.getAttribute("pharmacyStoreName") %> Store
											<%
											}
											else
											{
												%>
												No Sub Store Selected
												<%
											}
											%> </span></li>
											
											<%
											if(session.getAttribute("pharmacyStoreName")!=null)
											{
											%>	
												<li><a onclick="invalidateSession()"><span style="background-color:red" class="badge" id='storeTitle'><i class="fa fa-hospital-o"></i>return to Main store
											<%
											}
											%>
											</span></a></li>
											
											

										</ul>
									</div>
								</div>
							</div>

							<!-- /Common -->
							<div class="divide-20"></div>

							<div class="">
								<div class="col-md-12-1">

									<div class="row" id="storeData"></div>
									<!-- <div class="tabbable  tabs-left" style='background-color:whitesmoke'>
														<ul class="nav nav-tabs tabs-right">
														   <li class="active"><a data-toggle="tab" href="#tab_4_1"><span class="badge badge-red font-11">4</span> Section 1</a></li>
														   <li><a data-toggle="tab" href="#tab_4_2">Section 2</a></li>
														   <li><a data-toggle="tab" href="#tab_4_3">Section 3</a></li>
														</ul>
														<div class="tab-content">
														   <div id="tab_4_1" class="tab-pane fade in active">
															  <p>Coming Soon!!!!!!!!!!!!!! </p>
														   </div>
														   <div id="tab_4_2" class="tab-pane fade">
															  <p>Coming Soon!!!!!!!!!!!!!!</p>
														   </div>
														   <div id="tab_4_3" class="tab-pane fade">
															  <p>Coming Soon!!!!!!!!!!!!!!</p>
														   </div>
														</div>
													 </div> -->
									
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
	</section>
</body>
</html>