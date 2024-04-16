package com.hms.configuration;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
//jitendra
public class PageEventHandlerBean extends HttpServlet{
	
	//HttpServletResponse response;
	HttpServletRequest request;
	
	

	/*public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
		try {
			response.getWriter().println("Some Output");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/

	public HttpServletRequest getRequest() {
		 request = Context.getCurrentInstance().getRequest();
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		 request = Context.getCurrentInstance().getRequest();
		this.request = request;
	}
}
