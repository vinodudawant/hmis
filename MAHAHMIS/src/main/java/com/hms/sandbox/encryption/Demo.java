package com.hms.sandbox.encryption;

import java.sql.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.ResourceBundle;

import com.hms.patient.util.OSValidator;


public class Demo {

	public static void main(String[] args) {
		
		SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy hh:mm aa");
		String dischargedate1="02-02-2024 11:08:50";
		String dischargedate=format.format(dischargedate1);
		
		
		System.out.println("dischargedate==="+dischargedate);
		System.exit(0);
		
String filePath="";
		String serverName=getServer();
		if(serverName.equalsIgnoreCase("jboss"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("jboss.server.data.dir") + "\\patImages\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("jboss.server.data.dir") + "/patImages/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
			
		}else if(serverName.equalsIgnoreCase("tomcat"))
		{
			if (OSValidator.isWindows()) {
				filePath = System.getProperty("catalina.home") + "\\patImages\\";
			} else if (OSValidator.isMac()) {
				System.out.println("This is Mac");
			} else if (OSValidator.isUnix()) {
				filePath = System.getProperty("catalina.home") + "/patImages/";
			} else if (OSValidator.isSolaris()) {
				System.out.println("This is Solaris");
			} else {
				System.out.println("Your OS is not support!!");
			}
		}	
		System.out.println("filepath==="+filePath);
		//return filePath;
		// "/media/black/d/EHRLive/Reports";//"D:\\EHRLive\\Reports\\";
		/* return FilePath.BASEPATH.path; */
	
	}
	
	public static String getServer()
	{
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String serverName =resourceBundle.getObject("serverName").toString();
		return serverName;
				
	}
	
}
