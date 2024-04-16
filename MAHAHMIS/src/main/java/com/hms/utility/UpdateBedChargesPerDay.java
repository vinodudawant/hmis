package com.hms.utility;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ResourceBundle;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.hms.pharmacy.dao.EhatEnterpriseUtil;

@WebListener
public class UpdateBedChargesPerDay implements ServletContextListener{

	protected static Timer timer = null;
	private final static long ONCE_PER_DAY = 1000*60*60*24;

	//private final static long ONCE_PER_DAY = 600000;
	
	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		SimpleDateFormat dateFormat1=new SimpleDateFormat("yyyy-MM-dd");
		String todayDate=dateFormat1.format(new Date());
		
		ResourceBundle bundle = ResourceBundle.getBundle("Ehat");
		
		String startTime = bundle.getObject("timeToChange").toString();
		
		DateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date11;
		try {
			date11 = dateFormat.parse(todayDate+" "+startTime);
			Timer timer=new Timer();
			timer.schedule(new VodTimerTask(), date11,ONCE_PER_DAY);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

	class VodTimerTask extends TimerTask {
		@Override
		public void run() {
			
			try {
				if((ApplicationContextUtils.getApplicationContext())!=null)
				{
					EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
					//Added by Laxman on 17-JAN-2018 for close opd treatment automatically
					enterpriseUtil.autoCloseTreatment();
					enterpriseUtil.updateBedChargesPerDay();
					enterpriseUtil.updateNursingChargesPerDay();
					
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
