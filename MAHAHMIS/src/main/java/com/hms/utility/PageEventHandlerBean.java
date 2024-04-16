package com.hms.utility;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.hms.configuration.Context;
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
		 //request = Context.getCurrentInstance().getRequest();
		request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		 //request = Context.getCurrentInstance().getRequest();
		request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		this.request = request;
	}

	
}
