<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link
	href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">

<link
	href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">	
<title>Invalid Access</title>
</head>
<script>
	<c:if test="${sessionScope.userType == null}">
		var origin   = window.location.origin; 

			origin += "/MAHAHMIS/index.jsp";
			window.location.replace(origin);
	</c:if>	
</script>
<body>

<Center><h1>Unauthorized Access</h1>
<a href="/EhatEnterprise/pharmacy/pharmacy/masters"><i class="fa fa-home"></i> Go back </a></Center>
<hr>
</body>
</html>