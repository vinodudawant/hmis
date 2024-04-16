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
import com.hms.utility.CallFollowUpSendSMS.VodTimerTask;

@WebListener
public class CallBirthdaySendSMS implements ServletContextListener {

	protected static Timer timer = null;
	private final static long ONCE_PER_DAY = 1000*60*60*24;

	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		SimpleDateFormat dateFormat1=new SimpleDateFormat("yyyy-MM-dd");
		String todayDate=dateFormat1.format(new Date());
		
		ResourceBundle bundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		
		if(bundle.getObject("sendSMS").toString().equalsIgnoreCase("on"))
		{
			String startTime = bundle.getObject("startTimeForBirthdaySms").toString();
			
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
		
	}

	class VodTimerTask extends TimerTask {
		@Override
		public void run() {
			try {
				System.out.println(ApplicationContextUtils.getApplicationContext());
				//if((ApplicationContextUtils.getApplicationContext())!=null)
				//{
					EhatEnterpriseUtil enterpriseUtil=(ApplicationContextUtils.getApplicationContext()).getBean(EhatEnterpriseUtil.class);
					enterpriseUtil.SendBirthdaySMS();
			//	}
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
