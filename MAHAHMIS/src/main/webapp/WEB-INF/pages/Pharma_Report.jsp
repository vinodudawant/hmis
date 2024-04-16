<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>

<%-- 
<link rel="stylesheet" type="text/css" href="<c:url value="/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css" href="<c:url value="/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="<c:url value="/css/responsive.css"/>">
<link href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>" rel="stylesheet"
	media="screen">
<link href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>" rel="stylesheet">


<!-- JQUERY -->
<script src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script> 


<!-- /for Developers  -->
<%@include file="pharma_header.jsp"%>
<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script> --%>
<%@include file="pharma_header.jsp"%> 
</head>
<script>
		jQuery(document).ready(function() {		
			//App.setPage("widgets_box");  //Set current page
			App.init(); //Initialise plugins and elements
		});
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

				<%-- <%@include file="Pharma_left_menu_reports.jsp"%> --%>

				
				<input type="hidden" id="userID" />
			</div>
			<div><%@include file="Pharma_Footer.jsp"%></div>
			<div id="userObj" style="display: none;"></div>
		<%-- </c:if> --%>
	</section>
</body>
</html>