package com.hms.utility;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/syncronizedtokencontroller")
public class UtilityTokenController {

	@RequestMapping(value = "/syncronizedtoken", method = RequestMethod.POST)
	public @ResponseBody String getSyncronizedTokenForSession(HttpServletRequest request) {
		
		HttpSession session = request.getSession();

		String uuid = UUID.randomUUID().toString();
		session.setAttribute("synchronizeToken", uuid);
		return uuid;
	}
}
