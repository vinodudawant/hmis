package com.hms.utility;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/checkSessionAndRedirect")
public class checkSessionAndRedirect {

	/*
	 * @ResponseBody
	 * 
	 * @RequestMapping(value = "/checkSession", method = RequestMethod.GET) public
	 * String checkSession(HttpServletRequest request) { HttpSession session =
	 * request.getSession(); String userType = (String)
	 * session.getAttribute("userType"); if(userType == null) return "null"; else
	 * return "not null"; }
	 */
}
