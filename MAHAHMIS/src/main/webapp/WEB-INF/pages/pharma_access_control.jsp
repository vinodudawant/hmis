<%@page import="org.springframework.web.util.UrlPathHelper"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="org.json.JSONArray"%>
<%
	/* String pharmacyAccess=(String)session.getAttribute("pharmacyAccess");
	
	StringBuffer url = request.getRequestURL();
	
	JSONArray newJArray = new JSONArray(pharmacyAccess);
	
	List<String> lists=new ArrayList<String>();
	
	for(int i=0;i<newJArray.length();i++)
	{
		JSONObject jsonObject=newJArray.getJSONObject(i);
		lists.add((String)jsonObject.get("moduleName"));
	}
	
	System.out.println("url is"+url);
	if(lists.contains(url))
	{
	}
	else
	{
		System.out.println("false");
		response.sendRedirect("../pharmacy/error-page");
	} */
%>