package com.hms.utility;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public final class AgeCalculatorMain {

	public static Age calculateAgeTillToday(java.util.Date birthDate) {

		int years = 0;
		int months = 0;
		int days = 0;
		// create calendar object for birth day
		Calendar birthDay = Calendar.getInstance();
		birthDay.setTimeInMillis(birthDate.getTime());

		// create calendar object for current day
		long currentTime = System.currentTimeMillis();
		Calendar now = Calendar.getInstance();
		now.setTimeInMillis(currentTime);

		// Get difference between years
		years = now.get(Calendar.YEAR) - birthDay.get(Calendar.YEAR);
		int currMonth = now.get(Calendar.MONTH) + 1;
		int birthMonth = birthDay.get(Calendar.MONTH) + 1;
		// Get difference between months
		months = currMonth - birthMonth;
		// if month difference is in negative then reduce years by one and
		// calculate the number of months.
		if (months < 0) {
			years--;
			months = 12 - birthMonth + currMonth;
			if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
				months--;
		} else if (months == 0
				&& now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			years--;
			months = 11;
		}
		// modified code
		else if (months > 0
				&& (birthDay.get(Calendar.DATE) > now.get(Calendar.DATE))) {
			months--;
		}

		// Calculate the days
		if (now.get(Calendar.DATE) > birthDay.get(Calendar.DATE))
			days = now.get(Calendar.DATE) - birthDay.get(Calendar.DATE);
		else if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			int today = now.get(Calendar.DAY_OF_MONTH);
			now.add(Calendar.MONTH, -1);
			days = now.getActualMaximum(Calendar.DAY_OF_MONTH)
					- birthDay.get(Calendar.DAY_OF_MONTH) + today;
		} else {
			days = 0;
			if (months == 12) {
				years++;
				months = 0;
			}
		}

		System.out.println("calculateAgeTillToday: "
				+ new Age(days, months, years));

		// Create new Age object
		return (new Age(days, months, years));
	}

	public static Age calculateAgeFromDateToDate(java.util.Date fromDate,
			java.util.Date toDate) {

		System.out.println("======calculateAgeFromDateToDate=================");

		int years = 0;
		int months = 0;
		int days = 0;

		// create calendar object for birth day
		Calendar birthDayFromDate = Calendar.getInstance();
		birthDayFromDate.setTimeInMillis(fromDate.getTime());

		// create calendar object for from day
		Calendar birthDayToDate = Calendar.getInstance();
		birthDayToDate.setTimeInMillis(toDate.getTime());

		// Get difference between years
		years = birthDayToDate.get(Calendar.YEAR)
				- birthDayFromDate.get(Calendar.YEAR);

		int currMonth = birthDayToDate.get(Calendar.MONTH) + 1;
		int birthMonth = birthDayFromDate.get(Calendar.MONTH) + 1;

		// Get difference between months
		months = currMonth - birthMonth;

		// System.out.println("difference between months: " + months);

		// if month difference is in negative then reduce years by one and
		// calculate the number of months.
		if (months < 0) {
			years--;
			months = 12 - birthMonth + currMonth;
			if (birthDayToDate.get(Calendar.DATE) < birthDayFromDate
					.get(Calendar.DATE))
				months--;
		} else if (months == 0
				&& birthDayToDate.get(Calendar.DATE) < birthDayFromDate
						.get(Calendar.DATE)) {
			years--;
			months = 11;
		}
		// modified code: Abhijit
		else if (months > 0
				&& (birthDayFromDate.get(Calendar.DATE) > birthDayToDate
						.get(Calendar.DATE))) {
			months--;
		}

		// Calculate the days
		if (birthDayToDate.get(Calendar.DATE) > birthDayFromDate
				.get(Calendar.DATE))
			days = birthDayToDate.get(Calendar.DATE)
					- birthDayFromDate.get(Calendar.DATE);
		else if (birthDayToDate.get(Calendar.DATE) < birthDayFromDate
				.get(Calendar.DATE)) {
			int today = birthDayToDate.get(Calendar.DAY_OF_MONTH);
			birthDayToDate.add(Calendar.MONTH, -1);
			days = birthDayToDate.getActualMaximum(Calendar.DAY_OF_MONTH)
					- birthDayFromDate.get(Calendar.DAY_OF_MONTH) + today;
		} else {
			days = 0;
			if (months == 12) {
				years++;
				months = 0;
			}
		}

		System.out.println("Age: " + new Age(days, months, years)
				+ "\n=================================================");

		// Create new Age object
		return (new Age(days, months, years));
	}

	public static String getLastDayOfCurrentMonth() {
		Date today = new Date();

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(today);

		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.add(Calendar.DATE, -1);

		Date lastDateOfMonth = calendar.getTime();
		DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		System.out.println("Today            : " + sdf.format(today));
		System.out.println("Last day of Month: " + sdf.format(lastDateOfMonth));

		return sdf.format(lastDateOfMonth);

	}

	// paramDateString = dd/MM/yyyy
	public static String getLastDayOfParamMonth(String paramDateString)
			throws ParseException {

		System.out.println("-----------------------------------");
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date paramStringDate = sdf.parse(paramDateString);

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(paramStringDate);

		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.add(Calendar.DATE, -1);

		Date lastDateOfMonth = calendar.getTime();
		System.out.println("Today            : " + sdf.format(paramStringDate));
		System.out.println("Last day of Month: " + sdf.format(lastDateOfMonth));
		System.out.println("-----------------------------------");

		return sdf.format(lastDateOfMonth);

	}

	public static double calculateAgeInMonthsTillCurrentDate(Age age) {

		int yearsInMonths = age.getYears() * 12;
		float daysInMonths = (float) (age.getDays())
				/ (Integer.parseInt((AgeCalculatorMain
						.getLastDayOfCurrentMonth().split("/")[0])));

		float finalAgeInMonths = yearsInMonths + (age.getMonths())
				+ daysInMonths;

		System.out.println("calculateAgeInMonths: "
				+ (double) (Math.round(finalAgeInMonths * 100.0) / 100.0));

		return (double) (Math.round(finalAgeInMonths * 100.0) / 100.0);
	}

	public static int calculateAgeInMonthsTillParamDateString(Age age,
			String toDateString) throws Exception {

		System.out.println("===S:calculateAgeInMonthsTillParamDateString===");

		int yearsInMonths = age.getYears() * 12;
		int lastDayOfParamMonth = (Integer.parseInt((AgeCalculatorMain
				.getLastDayOfParamMonth(toDateString).split("/")[0])));
		System.out.println("lastDayOfParamMonth =" + lastDayOfParamMonth);

		// System.out.println("age.getDays()= " + age.getDays());
		float daysInMonths = ((float) ((float) age.getDays() / (float) lastDayOfParamMonth));
		// System.out.println("daysInMonths =" + daysInMonths);

		float finalAgeInMonths = (yearsInMonths + (age.getMonths()) + daysInMonths);

		// System.out.println("finalAgeInMonths: " + finalAgeInMonths);
		// return finalAgeInMonths;

		System.out.println("===E:Math.round() finalAgeInMonths: "
				+ ((int) (Math.round((finalAgeInMonths * 100.0) / 100.0))));

		return ((int) (Math.round((finalAgeInMonths * 100.0) / 100.0)));

	}

	// 21 march 2016
	public static int calculateApproximateAgeInYearsByYearsMonthDays(Age age)
			throws Exception {

		System.out.println("--calculateApproximateAgeInYearsByYearsMonthDays-");

		int years = age.getYears();
		int months = age.getMonths();

		if ((age.getDays()) > 15) {

			if ((months) > 5) {
				months = (months + 1);
				years = (years + 1);
			}

		} else if ((months) > 5)
			years = (years + 1);

		return (Math.round(years));

	}

	public static String getDateFromDobByDaysWeeksMonthsYears(
			java.util.Date birthDate, int days, int weeks, int months, int years) {

		Calendar cal = Calendar.getInstance();
		// cal.setTimeZone(TimeZone.getTimeZone("GMT"));
		cal.setTimeInMillis(birthDate.getTime());

		System.out.println("birthDate: " + getDate(cal));

		// adding days
		cal.add(Calendar.DATE, days);

		// adding weeks
		cal.add(Calendar.DATE, (weeks * 7));

		// adding moths into Date
		cal.add(Calendar.MONTH, months);

		// adding moths into Date
		cal.add(Calendar.YEAR, years);

		System.out.println("Final Date: " + getDate(cal));

		return getDate(cal);

	}

	public static String getDate(Calendar cal) {
		return ("" + cal.get(Calendar.DATE) + "/"
				+ (cal.get(Calendar.MONTH) + 1) + "/" + cal.get(Calendar.YEAR));
		// return ("" + cal.get(Calendar.DATE) + "/" +
		// (cal.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.ENGLISH)) +
		// "/" + cal.get(Calendar.YEAR));
	}

	public static void main(String[] args) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date fromDate = sdf.parse("01/01/2010");
		String toDateString = "01/12/2014";
		Date toDate = sdf.parse(toDateString);

		// Age age = AgeCalculatorMain.calculateAgeTillToday(fromDate);
		// AgeCalculatorMain.calculateAgeInMonths(age);

		// AgeCalculatorMain.getLastDayOfCurrentMonth();

		Age age = calculateAgeFromDateToDate(fromDate, toDate);

		System.out.println("main(String[] args) age: " + age);

		int finalAgeInYears = calculateApproximateAgeInYearsByYearsMonthDays(age);
		System.err.println("main(String[] args) finalAgeInYears: "
				+ finalAgeInYears);

		System.out.println("**********************************************");

		float finalAgeInMonths = calculateAgeInMonthsTillParamDateString(age,
				toDateString);
		System.err.println("main(String[] args) finalAgeInMonths: "
				+ finalAgeInMonths);

		// System.out.println("**********************************************");
		/*
		 * if ((age.getYears() == 0) && (age.getMonths() == 0)) {
		 * 
		 * if (age.getDays() <= 7) { finalAgeInMonths = (float) 0.1; } else if
		 * ((age.getDays() >= 7) && (age.getDays() <= 14)) { finalAgeInMonths =
		 * (float) 0.2; } else if ((age.getDays() >= 14) && (age.getDays() <=
		 * 21)) { finalAgeInMonths = (float) 0.3; } else if ((age.getDays() >=
		 * 21) && (age.getDays() <= 28)) { finalAgeInMonths = (float) 0.4; }
		 * 
		 * // DecimalFormat df = new DecimalFormat("#.#"); //
		 * df.setRoundingMode(RoundingMode.CEILING);
		 * 
		 * //
		 * System.out.println("--------------------------------------------");
		 * // System.out.println("RoundingMode.CEILING: " + //
		 * df.format(finalAgeInMonths));
		 * 
		 * } else { finalAgeInMonths = (int) finalAgeInMonths; }
		 */

		/*
		 * System.out.println(finalAgeInMonths +
		 * "\n**********************************************");
		 */

	}

}
