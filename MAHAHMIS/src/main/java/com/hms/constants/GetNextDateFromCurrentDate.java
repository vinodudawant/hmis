package com.hms.constants;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class GetNextDateFromCurrentDate {
/*********
 * @author	: Touheed Khan
 * @date	: 03-June-2016
 * @reason	: To get next date from give date.
 */
	
	//converting string to date
	 public static Date covertStringToDate(String sdate,String dateFormate){
		 //SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		 //String dateInString = "07/06/2013";
		 Date date=null;
		 try {
		 SimpleDateFormat formatter = new SimpleDateFormat(dateFormate);
		  date =  formatter.parse(sdate);
		 
		 } catch (ParseException e) {
				e.printStackTrace();
		}
		 return date;
	 }
	 
	 
	 public static Date addDays(Date date, int days)
	    {
	        Calendar cal = Calendar.getInstance();
	        cal.setTime(date);
	        cal.add(Calendar.DATE, days); //minus number would decrement the days
	        return  cal.getTime();
	    }
}
