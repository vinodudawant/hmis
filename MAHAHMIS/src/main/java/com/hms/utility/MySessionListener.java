package com.hms.utility;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.hms.accessmanagement.controller.UserAccessManagementController;

public class MySessionListener implements HttpSessionListener {
	
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		//System.err.println("Session created");
		//HttpSession session = event.getSession();
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		//System.err.println("Session destroy");
		HttpSession httpSession=event.getSession();
		if((String)httpSession.getAttribute("loginHistoryId")!=null){
			UserAccessManagementController userAccessManagementController=(ApplicationContextUtils.getApplicationContext()).getBean(UserAccessManagementController.class);
			userAccessManagementController.saveLogOutHistory((String)httpSession.getAttribute("loginHistoryId"));
		}
	}
	
}
