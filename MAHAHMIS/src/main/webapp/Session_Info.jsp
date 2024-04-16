<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>


<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>



<div style="width: 70%; padding-top: 3px;">
	<span class="loginfo">Welcome :</span> ${ sessionScope.userName }
</div>
<div style="width: 12%; padding-top: 3px; margin-left: 40px;">
	<span class="loginfo">Role :</span> <label id="userRole">${sessionScope.userType}</label>
</div>
<div style="width: 8%; padding-top: 3px;">
	<span class="loginfo">Date :</span>
	<%=todays_date%></div>
<div style="width: 5%; padding-top: 3px;">
	<a href="UserServlet?Action=logOut">Sign Out</a>
</div>