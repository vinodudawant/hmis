package com.hms.utility;

import java.util.Date;
import java.util.ResourceBundle;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.hms.ipd.service.BedStateMgtService;

@WebListener
public class AutoDeallocateCleanedBed implements ServletContextListener{

	protected static Timer timer = null;
	
	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		
		try {
			ResourceBundle bundle = ResourceBundle.getBundle("Ehat");
			String timerInterval = bundle.getObject("timeInterval").toString();
			long interval = Long.parseLong(timerInterval);
			Timer timer=new Timer();
			timer.schedule(new VodTimerTask(), new Date(), interval);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	class VodTimerTask extends TimerTask {
		@Override
		public void run() {
			
			try{
				if((ApplicationContextUtils.getApplicationContext())!=null){
					BedStateMgtService bedStateMgtService = (ApplicationContextUtils.getApplicationContext()).getBean(BedStateMgtService.class);
					bedStateMgtService.autoDeallocateCleanedBeds();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		try {
			timer.cancel();
			System.err.println("HelloWorld Listener has been shutdown");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
