package com.hms.pharmacy.dao;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.json.JSONException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.pharmacy.pojo.PurchaseMasterPrint;
import com.hms.utility.SendSMSAllFormat;

@Repository
public class EhatEnterpriseUtil {

	@Autowired
	SessionFactory sessionFactory;

	@Transactional
	public String getMobileNoByTreatId(String treatmentId) {
		Object mobileNumber = "";
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select p.mobile from ehat_patient p inner join ehat_treatment t on t.patient_id=p.patient_id where t.treatment_id="
									+ treatmentId + "");
			mobileNumber = query.uniqueResult();

		} catch (Exception e) {

		}
		return mobileNumber.toString();
	}

	public String getTommorowDate() {
		Calendar cal = Calendar.getInstance();
		//DateFormat apiDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		DateFormat apiDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String toDate = apiDateFormat.format(cal.getTime());
		cal.add(Calendar.DATE, +1);
		String fromDate = apiDateFormat.format(cal.getTime());
		return fromDate;
	}

	public String getTommorwDateAndMonth() {
		Calendar cal = Calendar.getInstance();
		DateFormat apiDateFormat = new SimpleDateFormat("dd/MM/");
		String toDate = apiDateFormat.format(cal.getTime());
		cal.add(Calendar.DATE, +1);
		String fromDate = apiDateFormat.format(cal.getTime());
		return fromDate;
	}

	@Transactional
	public void sendFollowScheduleSMS() {
		ResourceBundle chkSMSFlag = ResourceBundle
				.getBundle("EhatEnterpriseConfigurationFile");
		if (chkSMSFlag.getObject("sendSMS").toString().equalsIgnoreCase("on")) {
			if (chkSMSFlag.getObject("follow_up_Sms").toString()
					.equalsIgnoreCase("on")) {
				ResourceBundle bundle = ResourceBundle.getBundle("SMSFormat");
				String followUpMessage = bundle.getObject("FollowUpForPalve")
						.toString();

				SQLQuery query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"select date,Patient_Name,Treatment_id from follow_up where date like '"
										+ getTommorowDate() + "'");
				List<Object[]> rows = query.list();
				for (Object[] row : rows) {

					String replacePatientName = followUpMessage.replaceAll(
							"Patient_Name", row[1].toString());

					String replacePatientDate = replacePatientName.replaceAll(
							"follow_up_date", row[0].toString());

					if (row[2] != null)
						SendSMSAllFormat.sendSMS("", "", "", "",
								getMobileNoByTreatId(row[2].toString()),
								replacePatientDate);

				}
			}
		}

	}

	@Transactional
	public void SendBirthdaySMS() {
		ResourceBundle chkSMSFlag = ResourceBundle
				.getBundle("EhatEnterpriseConfigurationFile");
		ResourceBundle hospital = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = hospital.getObject("hospitalname").toString();
		String sendSMS = chkSMSFlag.getObject("sendSMS").toString();
		String birthday_Sms = chkSMSFlag.getObject("birthday_Sms").toString();
		if (!sendSMS.equalsIgnoreCase("off")) {
			if (!birthday_Sms.equalsIgnoreCase("off"))
			{
				ResourceBundle bundle = ResourceBundle.getBundle("SMSFormat");
				String followUpMessage = bundle.getObject("Birthday").toString();
			//	String flowon = chkSMSFlag.getObject("rising").toString();
					
				String BirthdayForPalve = bundle.getObject("BirthdayForPalve").toString();
				 if(hospitalName.equalsIgnoreCase("palve")){
					// followUpMessage =followUpMessage.replaceAll("Vatsalya", "Rising");
						SQLQuery query = sessionFactory.getCurrentSession()
								.createSQLQuery(
										"SELECT f_name, l_name, mobile FROM ehat_patient where deleted='N' and dob like '"
												+ getTommorwDateAndMonth() + "%'");
						List<Object[]> rows = query.list();

						for (Object[] row : rows) {

							String replacePatientName = BirthdayForPalve.replaceAll(
									"Patient_Name",
									row[0].toString() + " " + row[1].toString());
							String mobileNo = row[2].toString();

							SendSMSAllFormat.sendSMS("", "", "", "", mobileNo,
									replacePatientName);
				 }

		/*		SQLQuery query = sessionFactory.getCurrentSession()
						.createSQLQuery(
								"SELECT fName, lName, mobile FROM patient where status='Y' and dob like '"
										+ getTommorwDateAndMonth() + "%'");*/
				
			

				}
			}
		}

	}

	@Transactional
	public String saveTDSSlabMaster(org.json.JSONObject jsonObject) throws JSONException {
		
		String slabName = jsonObject.get("slabName").toString();
		String slabMinValue = jsonObject.get("slabMinValue").toString();
		String slabMaxValue = jsonObject.get("slabMaxValue").toString();
		String slabPercnt = jsonObject.get("slabPercnt").toString();

		String createdDate = new Date().toString();

		SimpleDateFormat localDateFormat = new SimpleDateFormat("HH:mm:ss");
		String createdTime = localDateFormat.format(new Date());

		int slabCratedBy = Integer.parseInt(jsonObject.get("slabCreatedBy")
				.toString());

		String slabUserIp = jsonObject.get("slabUserIp").toString();

		String slabUserAge = jsonObject.get("slabUserAge").toString();
		if(slabUserAge.length()==0)
		{
			slabUserAge="0";
		}

		String query = "insert into ehat_hr_tds_slab_master(tds_slab_name,tds_slab_min_value,tds_slab_max_value,tds_slab_percnt,tds_slab_delete_flag,tds_slab_created_date,tds_slab_created_time,tds_slab_update_date,tds_slab_update_time,tds_slab_created_by,tds_slab_updated_by,tds_slab_user_ip,tds_slab_age) values"
				+ "('"
				+ slabName
				+ "',"
				+ slabMinValue
				+ ","
				+ slabMaxValue
				+ ","
				+ slabPercnt
				+ ",0,'"
				+ createdDate
				+ "','"
				+ createdTime
				+ "','"
				+ createdDate
				+ "','"
				+ createdTime
				+ "',"
				+ slabCratedBy
				+ ","
				+ slabCratedBy
				+ ",'"
				+ slabUserIp
				+ "',"
				+ slabUserAge + ")";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(query);
			int rowsDeleted2 = sqlQuery.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Inserted Successfully";
	}

	@Transactional
	public Map<String, org.json.JSONArray> getTDSSlabMaster() {
		org.json.JSONArray list = new org.json.JSONArray();
		Map<String, org.json.JSONArray> batchData = new HashMap<String, org.json.JSONArray>();

		String fetchTDSQuery = "SELECT tds_slab_id,tds_slab_name,tds_slab_min_value,tds_slab_max_value,tds_slab_percnt,tds_slab_created_date,tds_slab_created_time,tds_slab_update_date,tds_slab_update_time,tds_slab_created_by,tds_slab_updated_by,tds_slab_user_ip,tds_slab_age FROM ehat_hr_tds_slab_master where tds_slab_delete_flag=0 order by tds_slab_id desc";

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				fetchTDSQuery);
		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			try {
				JSONObject obj1 = new JSONObject();

				if (row[0] != null)
					obj1.put("tds_slab_id", row[0].toString());
				else
					obj1.put("tds_slab_id", "");

				if (row[1] != null)
					obj1.put("tds_slab_name", row[1].toString());
				else
					obj1.put("tds_slab_name", "");

				if (row[2] != null)
					obj1.put("tds_slab_min_value", row[2].toString());
				else
					obj1.put("tds_slab_min_value", "");

				if (row[3] != null)
					obj1.put("tds_slab_max_value", row[3].toString());
				else
					obj1.put("tds_slab_max_value", "");

				if (row[4] != null)
					obj1.put("tds_slab_percnt", row[4].toString());
				else
					obj1.put("tds_slab_percnt", "");

				if (row[5] != null)
					obj1.put("tds_slab_created_date", row[5].toString());
				else
					obj1.put("tds_slab_created_date", "");

				if (row[6] != null)
					obj1.put("tds_slab_created_time", row[6].toString());
				else
					obj1.put("tds_slab_created_time", "");

				if (row[7] != null)
					obj1.put("tds_slab_update_date", row[7].toString());
				else
					obj1.put("tds_slab_update_date", "");

				if (row[8] != null)
					obj1.put("tds_slab_update_time", row[8].toString());
				else
					obj1.put("tds_slab_update_time", "");

				if (row[9] != null)
					obj1.put("tds_slab_created_by", row[9].toString());
				else
					obj1.put("tds_slab_created_by", "");

				if (row[10] != null)
					obj1.put("tds_slab_updated_by", row[10].toString());
				else
					obj1.put("tds_slab_updated_by", "");

				if (row[11] != null)
					obj1.put("tds_slab_user_ip", row[11].toString());
				else
					obj1.put("tds_slab_user_ip", "");

				if (row[12] != null)
					obj1.put("tds_slab_age", row[12].toString());
				else
					obj1.put("tds_slab_age", "");

				list.put(obj1);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		batchData.put("result", list);
		return batchData;
	}

	@Transactional
	public Integer getCompanyIdByCompanyName(String compName) {
		Integer count = 0;
		try {
			if (compName != null && compName != "") {
				/*String insertedCompanyMaster = "SELECT max(comp_id) FROM pharma_company_master where comp_name='"
						+ compName.trim() + "'";
				SQLQuery queryPharmaCompanyMaster = sessionFactory
						.getCurrentSession().createSQLQuery(insertedCompanyMaster);
				Object result = (Object) queryPharmaCompanyMaster.uniqueResult();*/
				
				String query="SELECT max(comp_id) FROM pharma_company_master where comp_name = ?";
				Object[] inputs = new Object[] {compName.trim()};
				/*
				 * String compId = getJdbcTemplate().queryForObject(query, inputs,
				 * String.class); System.out.println(compId); if (compId == null) count = 0;
				 * else count = 1;
				 */
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

	@Transactional
	public Integer getPackingIdByPackName(String packName) {
		Integer count = 0;
		if (packName != null && packName != "") {
			String insertedPackingMaster = "SELECT max(pack_id) FROM pharma_packing_master where pack_type='"
					+ packName + "'";
			SQLQuery queryPharmaPackingMaster = sessionFactory
					.getCurrentSession().createSQLQuery(insertedPackingMaster);

			Object resultPack = (Object) queryPharmaPackingMaster
					.uniqueResult();
			System.out.println(resultPack);
			if (resultPack == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}

	@Transactional
	public Integer getCategoryIdByCatName(String catName) {
		Integer count = 0;

		if (catName != null && catName != "") {
			String insertedCatMaster = "SELECT max(cat_id) FROM pharma_category_master where cat_name='"
					+ catName + "'";
			SQLQuery queryPharmaCatMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(insertedCatMaster);

			Object resultCat = (Object) queryPharmaCatMaster.uniqueResult();
			System.out.println(resultCat);
			if (resultCat == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}

	@Transactional
	public Integer getPreparationIdByPreName(String preName) {
		Integer count = 0;

		if (preName != null && preName != "") {
			String insertedPrepMaster = "SELECT max(preparation_id) FROM pharma_preparation_master where preparation_name='"
					+ preName + "'";
			SQLQuery queryPharmaPreMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(insertedPrepMaster);

			Object resultPre = (Object) queryPharmaPreMaster.uniqueResult();
			System.out.println(resultPre);
			if (resultPre == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}

	@Transactional
	public Integer getStrengthIdByStrName(String strName) {

		Integer count = 0;
		if (strName != null && strName != "") {
			String insertedStrMaster = "SELECT max(strength_id) FROM pharma_strength_master where strength_name='"
					+ strName + "'";
			SQLQuery queryPharmaStrMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(insertedStrMaster);

			Object resultStr = (Object) queryPharmaStrMaster.uniqueResult();
			System.out.println(resultStr);
			if (resultStr == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}

	@Transactional
	public Integer getShelfIdByShelfName(String shelfName) {
		Integer count = 0;

		if (shelfName != null && shelfName != "") {
			String insertedShelfMaster = "SELECT max(shelf_id) FROM pharma_shelf_master where shelf_name='"
					+ shelfName + "'";
			SQLQuery queryPharmaShelfMaster = sessionFactory
					.getCurrentSession().createSQLQuery(insertedShelfMaster);

			Object resultShelf = (Object) queryPharmaShelfMaster.uniqueResult();
			System.out.println(resultShelf);
			if (resultShelf == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}

	@Transactional
	public Integer getDrugIdByDrugName(String drugName) {
		Integer count = 0;

		if (drugName != null && drugName != "") {
			String insertedDrugMaster = "SELECT max(drug_id) FROM pharma_drug_master where drug_name='"
					+ drugName + "'";
			SQLQuery queryPharmaSDrugMaster = sessionFactory
					.getCurrentSession().createSQLQuery(insertedDrugMaster);

			Object resultDrug = (Object) queryPharmaSDrugMaster.uniqueResult();
			System.out.println(resultDrug);
			if (resultDrug == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}

	@Transactional
	public Integer getUomIdByUomName(String uomName) {
		Integer count = 0;

		if (uomName != null && uomName != "") {
			String insertedUomMaster = "SELECT max(uom_id) FROM pharma_uom_master where uom_name='"
					+ uomName + "'";
			SQLQuery queryPharmaUomMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(insertedUomMaster);

			Object resultUom = (Object) queryPharmaUomMaster.uniqueResult();
			System.out.println(resultUom);
			if (resultUom == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}
	
	@Transactional
	public String getActiveUserCount()
	{
		BigInteger activeUserCount = null;
		try {
			 activeUserCount = (BigInteger) sessionFactory
					.getCurrentSession().createSQLQuery("SELECT count(User_ID) FROM users where loged_in_status='Y'").uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return activeUserCount.toString();
	}
	
	@Transactional
	public String getSoftwareUserCount()
	{
		BigInteger softwareUserCount = null;
		try {
			softwareUserCount = (BigInteger) sessionFactory
					.getCurrentSession().createSQLQuery("SELECT count(Doctor_ID) FROM doctor where softwareUsed='Y'").uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return softwareUserCount.toString();
	}
	
	@Transactional
	public String getNewUserCount()
	{
		BigInteger newUserCount = null;
		try {
			newUserCount = (BigInteger) sessionFactory
					.getCurrentSession().createSQLQuery("SELECT count(User_ID) FROM users where STR_TO_DATE(created_date, '%d/%m/%Y') = STR_TO_DATE( date_format( curdate(), '%d/%m/%Y') , '%d/%m/%Y')").uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newUserCount.toString();
	}
	
	@Transactional
	public String validateUsername(String username,Integer employeeId)
	{
		String existOrNot = "notFound";
		SQLQuery query = sessionFactory.getCurrentSession()
				.createSQLQuery(
						"SELECT User_ID FROM users where User_Name='"+username+"'");
		List<Integer> rows = query.list();
		for (Integer row : rows) {
			Integer userId = row;
			if(userId.equals(employeeId)){
				existOrNot = "update";
			}else{
				existOrNot = "found";
			}
		}
		return existOrNot;
	}
	
	@Transactional
	public boolean saveAttendance(String filePath, String fileName, HttpServletRequest request) {
		// for current time & date and current login user id and ip address
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy hh:mm:ss aa");
		String todaysDate = formatter.format(calendar.getTime());
		HttpSession session = request.getSession();
		Integer sessionUserId = (Integer) session.getAttribute("userId1");
		String remoteAddress = request.getRemoteHost();

		String dateExcelTo = null, dateExcelFrom = null, to = null, from = null, userId = null, inTime = null, outTime = null, statusDb = null, totalTime = null;
		Date dateTo = null, dateFrom = null;
		Integer dateCount = 0;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MMM dd yyyy");
		boolean empCode = false,checkInsert = false;
		ArrayList<String> statusArray = new ArrayList<String>();
		ArrayList<String> inTimeArray = new ArrayList<String>();
		ArrayList<String> outTimeArray = new ArrayList<String>();
		ArrayList<String> totalTimeArray = new ArrayList<String>();
		ArrayList<String> jsonArray = new ArrayList<String>();
		String[] status = null;
		double presentDays = 0, absentDays = 0;
		String check = null, empId = null, date = null;
		HashMap<String, String> userHashMap = new HashMap<String, String>();
		HashMap<String, String> checkUserHashMap = new HashMap<String, String>();
		InputStream ExcelFileToRead;
		HSSFWorkbook wb = null;
		try {
			ExcelFileToRead = new FileInputStream(filePath);
			wb = new HSSFWorkbook(ExcelFileToRead);
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		for (int j = 0; j < wb.getNumberOfSheets(); j++) {
			HSSFSheet sheet = wb.getSheetAt(j);
			HSSFRow row;
			HSSFCell cell;
			Iterator rows = sheet.rowIterator();
			while (rows.hasNext()) {
				row = (HSSFRow) rows.next();
				Iterator cells = row.cellIterator();
				while (cells.hasNext()) {
					cell = (HSSFCell) cells.next();
					if (cell.getCellType() != 0) {//HSSFCell.CELL_TYPE_STRING) {
						// System.out.print(cell.getStringCellValue() + " ");
						if (empCode) {
							userId = cell.getStringCellValue();
							empCode = false;
						}

						if (cell.getStringCellValue().contains("Status")
								&& row.getRowNum() > 2) {
							while (cells.hasNext()) {
								cell = (HSSFCell) cells.next();
								statusArray.add(userId + "_" + cell.toString());
							}
						}

						if (cell.getStringCellValue().contains("InTime")) {
							while (cells.hasNext()) {
								cell = (HSSFCell) cells.next();
								inTimeArray.add(cell.toString());
							}
						}

						if (cell.getStringCellValue().contains("OutTime")) {
							while (cells.hasNext()) {
								cell = (HSSFCell) cells.next();
								outTimeArray.add(cell.toString());
							}
						}

						if (cell.getStringCellValue().contains("Total")) {
							while (cells.hasNext()) {
								cell = (HSSFCell) cells.next();
								totalTimeArray.add(cell.toString());
							}
						}

						// for to identify date to and date from
						if (cell.getStringCellValue().matches(
								"[a-zA-Z]{3} [0-9]{1,2} [0-9]{4}.*$")) {
							if (dateCount.equals(0)) {
								dateExcelTo = cell.getStringCellValue()
										.replaceAll("To", "");
							} else if (dateCount.equals(1)) {
								dateExcelFrom = cell.getStringCellValue();
							}
							dateCount++;
						}

						if (cell.getStringCellValue().contains("Emp. Code")) {
							empCode = true;
						}
					}
				}
				// System.out.println();
			}
			try {
				dateTo = simpleDateFormat.parse(dateExcelTo);
				dateFrom = simpleDateFormat.parse(dateExcelFrom);
				to = new SimpleDateFormat("dd-MM-yyyy").format(dateTo);
				from = new SimpleDateFormat("dd-MM-yyyy").format(dateFrom);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}

		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT user_id,date_to FROM ehat_user_attendance_master");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				checkUserHashMap.put(row[0].toString(), row[1].toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		calendar.setTime(dateTo);
		int setMonth = dateTo.getMonth();
		for (int i = 0; i < statusArray.size(); i++) {
			status = statusArray.get(i).split("_");
			if (status.length > 1) {
				if (setMonth < calendar.getTime().getMonth()) {
					calendar.setTime(dateTo);
				}
				date = new SimpleDateFormat("dd-MM-yyyy").format(calendar
						.getTime());
				calendar.add(Calendar.DATE, 1);

				check = statusArray.get(i).split("_")[1];
				empId = statusArray.get(i).split("_")[0];
				if (userHashMap.containsKey(empId)) {
					String days = userHashMap.get(empId);
					presentDays = Double.parseDouble(days.split("_")[0]);
					absentDays = Double.parseDouble(days.split("_")[1]);
					if (check.equals("P")) {
						presentDays = presentDays + 1;
					} else if (check.equals("A")) {
						absentDays = absentDays + 1;
					} else if (check.equals("½P")) {
						presentDays = presentDays + 0.5;
						absentDays = absentDays + 0.5;
					}
					userHashMap.put(empId, presentDays + "_" + absentDays);
				} else {
					presentDays = 0;
					absentDays = 0;
					if (check.equals("P")) {
						presentDays = 1;
					} else if (check.equals("A")) {
						absentDays = 1;
					} else if (check.equals("½P")) {
						presentDays = 0.5;
						absentDays = 0.5;
					}
					userHashMap.put(empId, presentDays + "_" + absentDays);
				}
				jsonArray.add(statusArray.get(i) + "_" + inTimeArray.get(i)
						+ "_" + outTimeArray.get(i) + "_"
						+ totalTimeArray.get(i) + "_" + date);
			}
		}

		Iterator userIterator = userHashMap.entrySet().iterator();
		while (userIterator.hasNext()) {
			Map.Entry pair = (Map.Entry) userIterator.next();
			userId = (String) pair.getKey();
			presentDays = Double.parseDouble(pair.getValue().toString()
					.split("_")[0]);
			absentDays = Double.parseDouble(pair.getValue().toString()
					.split("_")[1]);
			// System.err.println("in hashmap:"+userId+"*"+presentDays+"*"+absentDays+"*"+todaysDate+"*"+sessionUserId+"*"+remoteAddress+"*"+to+"*"+from);
			String dateToDb = checkUserHashMap.get(userId);
			if (null == dateToDb) {
				dateToDb = "";
			}
			if (!dateToDb.equals(to)) {
				try {
					// insert into ehat_user_attendance_master
					String insertUserAttendanceMaster = "insert into ehat_user_attendance_master(date_to,date_from,user_id,present_days,absent_days,added_by,added_on,remote_ip) values('"
							+ to
							+ "','"
							+ from
							+ "','"
							+ userId
							+ "','"
							+ presentDays
							+ "','"
							+ absentDays
							+ "','"
							+ sessionUserId
							+ "','"
							+ todaysDate
							+ "','"
							+ remoteAddress + "')";
					SQLQuery queryUserAttendanceMaster = sessionFactory
							.getCurrentSession().createSQLQuery(
									insertUserAttendanceMaster);
					queryUserAttendanceMaster.executeUpdate();
					checkInsert = true;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		for (int i = 0; i < jsonArray.size(); i++) {
			userId = jsonArray.get(i).split("_")[0];
			statusDb = jsonArray.get(i).split("_")[1];
			inTime = jsonArray.get(i).split("_")[2];
			outTime = jsonArray.get(i).split("_")[3];
			totalTime = jsonArray.get(i).split("_")[4];
			date = jsonArray.get(i).split("_")[5];
			// System.out.println("in json:"+date+"**"+userId+"*"+statusDb+"*"+inTime+"*"+outTime+"*"+totalTime+"*"+todaysDate+"*"+sessionUserId+"*"+remoteAddress+"*"+to+"*"+from);
			String dateToDb = checkUserHashMap.get(userId);
			if (null == dateToDb) {
				dateToDb = "";
			}
			if (!dateToDb.equals(to)) {
				try {
					// insert into ehat_user_attendance_slave
					String insertUserAttendanceSlave = "insert into ehat_user_attendance_slave(date,date_to,date_from,user_id,status,in_time,out_time,total_time,added_by,added_on,remote_ip) values('"
							+ date
							+ "','"
							+ to
							+ "','"
							+ from
							+ "','"
							+ userId
							+ "','"
							+ statusDb
							+ "','"
							+ inTime
							+ "','"
							+ outTime
							+ "','"
							+ totalTime
							+ "','"
							+ sessionUserId
							+ "','"
							+ todaysDate
							+ "','"
							+ remoteAddress + "')";
					SQLQuery queryUserAttendanceSlave = sessionFactory
							.getCurrentSession().createSQLQuery(
									insertUserAttendanceSlave);
					queryUserAttendanceSlave.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		if(checkInsert){
			// insert into ehat_user_attendance_details
			String insertUserAttendanceDetails = "insert into ehat_user_attendance_details(file_name,file_path,added_by,added_on,remote_ip) values('"+fileName+"','"
					+ filePath
					+ "','"
					+ sessionUserId
					+ "','"
					+ todaysDate
					+ "','"
					+ remoteAddress + "')";
			SQLQuery queryUserAttendanceDetails = sessionFactory
					.getCurrentSession().createSQLQuery(
							insertUserAttendanceDetails);
			queryUserAttendanceDetails.executeUpdate();
		}
		return checkInsert;
	}
	
	@Transactional
	public JSONArray getAllImportedFile() {
		JSONArray importedFileList = new JSONArray();
		try {
			SQLQuery query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT user_attendance_detail_id,file_path,added_by,added_on,file_name FROM ehat_user_attendance_details order by user_attendance_detail_id desc");
			List<Object[]> rows = query.list();
			for (Object[] row : rows) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("userAttendanceDetailId", row[0].toString());
				//jsonObject.put("filePath", row[1].toString());
				//jsonObject.put("addedBy", row[2].toString());
				jsonObject.put("addedOn", row[3].toString());
				jsonObject.put("fileName", row[4].toString());
				importedFileList.add(jsonObject);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return importedFileList;
	}
	
	@Transactional
	public Map<String, Object> getEmployeeAttendanceDetails(String userId, String date) {
		Map<String,Object> model=new HashMap<String,Object>();
		JSONArray attendanceSlaveArray = new JSONArray();
		JSONObject attendanceMasterObject = new JSONObject();
		try {
			SQLQuery slaveQuery = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT user_attendance_slave_id,date,status,in_time,out_time,total_time FROM ehat_user_attendance_slave where user_id = '"+userId+"' and date_to like '"+date+"'");
			List<Object[]> rows = slaveQuery.list();
			for (Object[] row : rows) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("userAttendanceSlaveId", row[0].toString());
				jsonObject.put("date", row[1].toString());
				jsonObject.put("status", row[2].toString());
				jsonObject.put("inTime", row[3].toString());
				jsonObject.put("outTime", row[4].toString());
				jsonObject.put("totalTime", row[5].toString());
				attendanceSlaveArray.add(jsonObject);
			}
			
			SQLQuery masterQuery = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT user_attendance_master_id,present_days,absent_days,paid_leave,unpaid_leave,late_min FROM ehat_user_attendance_master where user_id = '"+userId+"' and date_to like '"+date+"'");
			List<Object[]> rows1 = masterQuery.list();
			for (Object[] row : rows1) {
				attendanceMasterObject.put("userAttendanceMasterId", row[0].toString());
				attendanceMasterObject.put("presentDays", row[1].toString());
				attendanceMasterObject.put("absentDays", row[2].toString());
				attendanceMasterObject.put("paidLeave", "");
				if(row[3]!=null){
					attendanceMasterObject.put("paidLeave", row[3].toString());
				}
				attendanceMasterObject.put("unpaidLeave", "");
				if(row[4]!=null){
					attendanceMasterObject.put("unpaidLeave", row[4].toString());
				}
				attendanceMasterObject.put("lateMin", "");
				if(row[5]!=null){
					attendanceMasterObject.put("lateMin", row[5].toString());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.put("attendanceSlaveArray", attendanceSlaveArray);
		model.put("attendanceMasterObject",attendanceMasterObject);
		return model;
	}
	
	/*Consulting Room Master*/
	@Transactional
	public String saveRoom(org.json.simple.JSONObject jsonObject) {
		try {
			String query="insert into ehat_scheduler_room_master (room_name,status,added_by,added_on,remote_ip) values('"+jsonObject.get("roomName")+"','Y','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')"; 
			//getJdbcTemplate().update(query);  
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Room Inserted Successfully";
	}

	@Transactional
	public String updateRoom(org.json.simple.JSONObject jsonObject) {
		try {
			String query="update ehat_scheduler_room_master set room_name='"+jsonObject.get("roomName")+"',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where room_id='"+jsonObject.get("roomId")+"'";
			//getJdbcTemplate().update(query);  
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Room Updated Successfully";
	}

	@Transactional
	public String deleteRoom(org.json.simple.JSONObject jsonObject) {
		try {
			String query="update ehat_scheduler_room_master set status='N',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where room_id='"+jsonObject.get("roomId")+"'";
			//getJdbcTemplate().update(query);  
		} catch (Exception e) {
			System.err.println("database error...could not insert: "
					+ e.getMessage());
		}
		return "Room Deleted Successfully";
	}

	@Transactional
	public org.json.simple.JSONObject getRoomByRoomId(Integer roomId) {
		org.json.simple.JSONObject jsonObject=new org.json.simple.JSONObject();
		try{
		String query="select * from ehat_scheduler_room_master where room_id= ?";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query,new Object[] { roomId });
			/*
			 * for(Map<String, Object> row : rows){ jsonObject.put("roomId", roomId);
			 * jsonObject.put("roomName", (String)row.get("room_name")); }
			 */
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}

	@Transactional
	public org.json.simple.JSONArray getAllRoom() {
		org.json.simple.JSONArray roomArray=new org.json.simple.JSONArray();
		try{
		String query="select * from ehat_scheduler_room_master where status = 'Y'";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
			/*
			 * for(Map<String, Object> row : rows){ JSONObject jsonObject=new JSONObject();
			 * jsonObject.put("roomId", row.get("room_id").toString());
			 * jsonObject.put("roomName", (String)row.get("room_name"));
			 * roomArray.add(jsonObject); }
			 */
		} catch (Exception e) {
			e.printStackTrace();
		}
		return roomArray;
	}

	//Modify by Laxman on 29-Dec-2017.
	@SuppressWarnings("unchecked")
	@Transactional
	public JSONObject displayLED(int specialityId) {
		//for server date code
		/*ServerSocket s=new ServerSocket(5217);
        while(true){
           
        	System.out.println("Waiting For Connection ...");
            Socket soc=s.accept();
            DataOutputStream out=new DataOutputStream(soc.getOutputStream());
            out.writeBytes("Server Date" + (new Date()).toString() + "\n");
            out.close();
            soc.close();
        }*/
		JSONObject jsonObject2=new JSONObject();
		SimpleDateFormat parser = new SimpleDateFormat("HH:mm:ss");
		Calendar calendar = Calendar.getInstance();
		Date date = calendar.getTime();
		String dayWithTime = new SimpleDateFormat("EE HH:mm:ss", Locale.ENGLISH).format(date.getTime());
		String day = (dayWithTime.split(" ")[0]).toLowerCase();
		String todaysRoom = "";
		try {
			Date currentTime = parser.parse(dayWithTime.split(" ")[1]);
			Date twelveAM = parser.parse("00:00:00");
			Date twelvePM = parser.parse("12:00:00");
			Date fourPM = parser.parse("16:00:00");
			if(currentTime.after(twelveAM) && currentTime.before(twelvePM)){
				todaysRoom = day+"_mor_room";
			}else if(currentTime.after(twelvePM) && currentTime.before(fourPM)){
				todaysRoom = day+"_aft_room";
			}else if(currentTime.after(fourPM)){
				todaysRoom = day+"_eve_room";
			}
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		
		org.json.simple.JSONArray tokenArray1=new org.json.simple.JSONArray();
		org.json.simple.JSONArray tokenArray=new org.json.simple.JSONArray();
		try{
			/*String query="select opd.Patient_ID,opd.common_Token_number,opd.send_date_time,opd.queue_status,opd.doctor_id,opd.app_date,room.room_name "
					+" FROM patient_opd opd inner join schedular_doctor_timeslot sdt on opd.doctor_id = sdt.Doctor_ID inner join ehat_scheduler_room_master room on sdt."+todaysRoom+" = room.room_id "
					+" where opd.queue_status='in' group by room.room_id order by opd.send_date_time";*/
			String query1="select room.room_name, room.room_id, tno.doctor_id ,tno.created_date_time,dct.docInitial from token_number tno inner join schedular_doctor_timeslot sdt ON tno.doctor_id = sdt.Doctor_ID inner join ehat_scheduler_room_master room ON sdt."+todaysRoom+" = room.room_id inner join doctor dct ON tno.doctor_id = dct.Doctor_ID where "
					+ " tno.token_gen_date >= CURDATE() AND (tno.queue_status IS NOT NULL && tno.token > 0 && tno.queue_status != 'unpaid' && tno.queue_status != 'cancel' && tno.speciality_id = "+specialityId+") group by room.room_id";
			//List<Map<String, Object>> rows1 = getJdbcTemplate().queryForList(query1);
			SQLQuery querySplt = sessionFactory.getCurrentSession().createSQLQuery(query1);
			querySplt.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    List<Map<String, Object>> rows1 = querySplt.list();  
		    for(Map<String, Object> row : rows1){
		       JSONObject jsonObject1=new JSONObject();
		       jsonObject1.put("created_date_time", row.get("created_date_time").toString().split("\\s").clone()[0]);
		       //jsonObject1.put("tokenno", row.get("tokenno").toString().split("\\s").clone()[1]);
		       String docInitial="-";
		       if(row.get("docInitial").toString().equals("0") || row.get("docInitial").toString().equals("") || row.get("docInitial").toString().equals(null)){
		    	   docInitial = "-";
		       }
		       else{
		    	   docInitial=row.get("docInitial").toString();
		       }
		       jsonObject1.put("docInitial", docInitial);
			   jsonObject1.put("room_name", row.get("room_name"));
			   jsonObject1.put("room_id", (Integer)row.get("room_id"));
			   jsonObject1.put("doctor_id", row.get("doctor_id"));
			   tokenArray1.add(jsonObject1);
		    }
		    
			String query="select tno.Patient_ID,tno.Treatment_ID,tno.token,tno.send_date_time,tno.queue_status,tno.doctor_id,tno.created_date_time,room.room_name,room.room_id,ept.prefix,ept.f_name,ept.l_name " +
					"FROM token_number tno inner join schedular_doctor_timeslot sdt on tno.doctor_id = sdt.Doctor_ID " +
					"inner join ehat_scheduler_room_master room on sdt."+todaysRoom+" = room.room_id " +
					"inner join ehat_treatment etr on tno.Treatment_ID = etr.treatment_id " +
					"inner join ehat_patient ept ON tno.patient_id = ept.patient_id where etr.t_flag='Y' and tno.token_gen_date >= CURDATE() " +
					" AND (tno.queue_status IS NOT NULL && tno.token > 0 && tno.queue_status != 'unpaid' && tno.queue_status != 'cancel' && tno.speciality_id = "+specialityId+") order by tno.token_gen_date";
			//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
			SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(query);
			query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    List<Map<String, Object>> rows = query2.list(); 
		    for(Map<String, Object> row : rows){
		       
		    	JSONObject jsonObject=new JSONObject();
		    	jsonObject.put("patientName", (String)row.get("prefix")+(String)row.get("f_name")+" "+(String)row.get("l_name"));
		    	jsonObject.put("patientId", (Integer)row.get("Patient_ID"));
		    	jsonObject.put("TreatmentId", (Integer)row.get("Treatment_ID"));
		    	jsonObject.put("commonTokenNumber", row.get("token"));
		    	jsonObject.put("appointmentDate", row.get("created_date_time").toString().split("\\s").clone()[0]);//only Date.
		    	jsonObject.put("roomName", (String)row.get("room_name"));
		    	if(row.get("send_date_time")!=null){
				   jsonObject.put("sendDateTime", row.get("send_date_time").toString().split("\\s").clone()[1]);//only Time.
		    	}
		    	jsonObject.put("queueStatus", (String)row.get("queue_status"));
		    	jsonObject.put("doctorId", (String)row.get("doctor_id"));
		    	jsonObject.put("roomId", (Integer)row.get("room_id"));
		    	tokenArray.add(jsonObject);
		    }
		} catch (Exception e) {
			e.printStackTrace();
		}
		jsonObject2.put("roomArray", tokenArray1);
		jsonObject2.put("tokenArray", tokenArray);
		return jsonObject2;
	}
	
	@Transactional
	public org.json.simple.JSONObject getOTByOTId(Integer otId) {
		org.json.simple.JSONObject jsonObject=new org.json.simple.JSONObject();
		try{
		String query="select * from ot_type where idot_name= ?";
		//List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query,new Object[] { otId });
			/*
			 * for(Map<String, Object> row : rows){ jsonObject.put("otId", otId);
			 * jsonObject.put("otName", (String)row.get("ot_name")); }
			 */
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
	
	@Transactional
	public org.json.simple.JSONObject getDoctorByDoctorId(Integer doctorId) {
		org.json.simple.JSONObject jsonObject=new org.json.simple.JSONObject();
		try{
		String query="SELECT * FROM doctor where Doctor_id = ?";
			/*
			 * List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query,new
			 * Object[] { doctorId }); for(Map<String, Object> row : rows){
			 * jsonObject.put("doctorId", doctorId); if(row.get("mobileNo")!=null){
			 * jsonObject.put("mobileNo", (String)row.get("mobileNo")); }else{
			 * jsonObject.put("mobileNo", ""); } }
			 */
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
	
	
	
	@Transactional
	public List<PurchaseMasterPrint> getPurchaseDetailsbyPurId(int purId,int productId) {
	//	List<> list = new org.json.JSONArray();
		Map<String,org.json.JSONArray> batchData = new HashMap<String,org.json.JSONArray>();

		String fetchTDSQuery = "select product_name,pur_slave_batch_code as batch_code,pur_bill_date,pur_slave_qty,pur_slave_batch_id as batch_id,pur_slave_product_id from "
								+ "pharma_purchase_master m inner join pharma_purchase_slave s on s.pur_slave_master_id=m.pur_id " 
								+"inner join pharma_product_master pm on pm.product_id=s.pur_slave_product_id where "
								+"m.pur_id ="+purId+" and s.pur_slave_product_id="+productId+"";
		

		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					fetchTDSQuery);
			query.setResultTransformer(Transformers.aliasToBean(PurchaseMasterPrint.class));
			@SuppressWarnings("unchecked")
			List<PurchaseMasterPrint>list= query.list();
			return list;
		
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		

		
	}

	@Transactional
	public String savePharmaPrintMaster(org.json.JSONObject jsonObject) throws JSONException {
		
		String printId = jsonObject.get("printId").toString();
		String billName = jsonObject.get("billName").toString();
		String drugLicNo = jsonObject.get("drugLicNo").toString();
		String foodLicNo = jsonObject.get("foodLicNo").toString();
		String vatTinNo = jsonObject.get("vatTinNo").toString();
		String userModuleId = jsonObject.get("userModuleId").toString();
		
		Calendar cal = Calendar.getInstance();
		DateFormat apiDateFormat = new SimpleDateFormat("dd-MM-yyyy");
		String toDate = apiDateFormat.format(cal.getTime());
		
		
		SimpleDateFormat localDateFormat = new SimpleDateFormat("HH:mm:ss aa");
		String todaysTime = localDateFormat.format(new Date());
		String todaysDate = toDate +" "+ todaysTime;
		
		String query = "";
		String sql = "";
		BigInteger count = null;
		String msg = "";
		int CratedBy = Integer.parseInt(jsonObject.get("CreatedBy").toString());
		String UserIp = jsonObject.get("UserIp").toString();
		
		sql = "select count(*)moduleId from ehat_pharma_print_master where moduleId ="+userModuleId+" and pharma_print_delete_flag=0";
		count = (BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
		
		if(count.toString() == "0"){
		if(printId.equals("0") || printId.equals("")){
			query = "insert into ehat_pharma_print_master(billName,drugLicenseNo,foodLicenseNo,vatTinNo,pharma_print_delete_flag,moduleId,added_by,added_on,remote_ip) values"
				+ "('" + billName + "','" + drugLicNo + "','" + foodLicNo + "','" + vatTinNo + "',0,'"+userModuleId +"',"
				+ CratedBy + ",'" +todaysDate+ "','" + UserIp + "')";
			msg = "1";
		}else{
			query = "update ehat_pharma_print_master set billName='"+ billName +"',drugLicenseNo='"+ drugLicNo +"',foodLicenseNo='"+ foodLicNo +"',vatTinNo='"+ vatTinNo +"',modify_by="+ CratedBy +",modify_on='"+ todaysDate +"',remote_ip='"+ UserIp+"' where idehat_pharma_print_master="+Integer.parseInt(printId);
			msg = "2";
		}
		if(msg.equals("1")){
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(query);
			int rowsDeleted2 = sqlQuery.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
		}else{
			try {
				//getJdbcTemplate().update(query);  
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		}else if(!printId.equals("0") || !printId.equals("")){
			query = "update ehat_pharma_print_master set billName='"+ billName +"',drugLicenseNo='"+ drugLicNo +"',foodLicenseNo='"+ foodLicNo +"',vatTinNo='"+ vatTinNo +"',modify_by="+ CratedBy +",modify_on='"+ todaysDate +"',remote_ip='"+ UserIp+"' where idehat_pharma_print_master="+Integer.parseInt(printId);
			msg = "2";
			try {
				//getJdbcTemplate().update(query);  
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else{
			msg = "0";
		}
		return msg;
	}

	@Transactional
	public Map<String, org.json.JSONArray> getPharmaPrintMasters() {
		org.json.JSONArray list = new org.json.JSONArray();
		Map<String, org.json.JSONArray> batchData = new HashMap<String, org.json.JSONArray>();
		int moduleID = 0;
		String fetchPrintQuery = "SELECT idehat_pharma_print_master,billName,drugLicenseNo,foodLicenseNo,vatTinNo,moduleId,module.module_name FROM ehat_pharma_print_master master inner join pharma_user_module module on master.moduleId=module.module_id where pharma_print_delete_flag=0 order by idehat_pharma_print_master desc";

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				fetchPrintQuery);
		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			try {
				org.json.JSONObject obj1 = new org.json.JSONObject();

				if (row[0] != null)
					obj1.put("idehat_pharma_print_master", row[0].toString());
				else
					obj1.put("idehat_pharma_print_master", "");

				if (row[1] != null)
					obj1.put("billName", row[1].toString());
				else
					obj1.put("billName", "");

				if (row[2] != null)
					obj1.put("drugLicenseNo", row[2].toString());
				else
					obj1.put("drugLicenseNo", "");

				if (row[3] != null)
					obj1.put("foodLicenseNo", row[3].toString());
				else
					obj1.put("foodLicenseNo", "");

				if (row[4] != null)
					obj1.put("vatTinNo", row[4].toString());
				else
					obj1.put("vatTinNo", "");
				
				if (row[5] != null)
					obj1.put("moduleId", row[5].toString());
				else
					obj1.put("moduleId", "");
				
				if (row[6] != null)
					obj1.put("moduleName", row[6].toString());
				else
					obj1.put("moduleName", "");
				
				
				list.put(obj1);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		batchData.put("result", list);
		return batchData;
	}

@Transactional
public String deletePharmaPrint(org.json.simple.JSONObject jsonObject) {
	try {
		String query="update ehat_pharma_print_master set pharma_print_delete_flag='1',modify_by='"+jsonObject.get("modifyBy")+"',modify_on='"+jsonObject.get("modifyOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where idehat_pharma_print_master='"+jsonObject.get("printId")+"'";
		//getJdbcTemplate().update(query);  
	} catch (Exception e) {
		System.err.println("database error...could not delete: "
				+ e.getMessage());
	}
	return "Record deleted Successfully";
	}

@Transactional
public Map<String, org.json.JSONArray> getCategorywiseDiscount(int treatmentId) 
{
	org.json.JSONArray list = new org.json.JSONArray();
	Map<String, org.json.JSONArray> batchData = new HashMap<String, org.json.JSONArray>();

	String fetchTDSQuery = "SELECT     s.charges_master_slave_id, c.discount FROM    ehat_bill_master s left     join    ehat_charges_master_slave c ON c.id = s.charges_master_slave_id where    s.treatment_id ="+treatmentId;

	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
			fetchTDSQuery);
	List<Object[]> rows = query.list();
	for (Object[] row : rows) 
	{
		try {
			org.json.JSONObject obj1 = new org.json.JSONObject();

			if (row[0] != null)
				obj1.put("pharma_category_id", row[0].toString());
			else
				obj1.put("pharma_category_id", "");

			if (row[1] != null)
				obj1.put("discount_in_percent", row[1].toString());
			else
				obj1.put("discount_in_percent", "");

			list.put(obj1);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	batchData.put("result", list);
	return batchData;
}


@Transactional
public Map<String, org.json.JSONArray> getCreditCategorywiseDiscount(int treatmentId) 
{
	org.json.JSONArray list = new org.json.JSONArray();
	Map<String, org.json.JSONArray> batchData = new HashMap<String, org.json.JSONArray>();

	String fetchTDSQuery = "SELECT slave.pharma_category_id,discount_in_percent_credit FROM treatment t inner join ehat_bill_discount_category_master master ON t.bill_category = master.id_category_master inner join "
                           +" ehat_bill_discount_category_slave slave ON slave.id_category_master = master.id_category_master where t.Treatment_ID="+treatmentId+" and pharmacy_flag=1 and slave.cat_flag=1;";

	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
			fetchTDSQuery);
	List<Object[]> rows = query.list();
	for (Object[] row : rows) 
	{
		try {
			org.json.JSONObject obj1 = new org.json.JSONObject();

			if (row[0] != null)
				obj1.put("pharma_category_id", row[0].toString());
			else
				obj1.put("pharma_category_id", "");

			if (row[1] != null)
				obj1.put("discount_in_percent", row[1].toString());
			else
				obj1.put("discount_in_percent", "");

			list.put(obj1);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	batchData.put("result", list);
	return batchData;
}

/* Suraj code for hospital unit save  28 Mar 2017*/
@Transactional
public String saveHospitalUnitMaster(org.json.JSONObject jsonObject) throws JSONException {
	
	String unitName = jsonObject.get("unitName").toString();
	String narration = jsonObject.get("Narration").toString();
	String createdBy = jsonObject.get("createdBy").toString();
	
	
	String createdDate  = new SimpleDateFormat("dd-MM-yyyy").format(new Date());

	SimpleDateFormat localDateFormat = new SimpleDateFormat("HH:mm:ss");
	String createdTime = localDateFormat.format(new Date());

	int slabCratedBy = Integer.parseInt(jsonObject.get("createdBy").toString());

	String slabUserIp = jsonObject.get("userIp").toString();
	
	String query = "insert into ehat_hospital_unit_master(hosp_unit_name,hosp_unit_narration,hosp_unit_add_date,hosp_unit_upate_date,hosp_unit_add_time,hosp_unit_upate_time,hosp_unit_user_id,hosp_unit_update_user_id,hosp_unit_user_ip) values"
			+ "('" + unitName + "','" + narration + "','" + createdDate + "','" + createdDate + "','" + createdTime + "','" + createdTime + "'," + createdBy + ","+ createdBy + ",'"+slabUserIp+"')";
	try {
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(query);
		int rowsDeleted2 = sqlQuery.executeUpdate();

	} catch (Exception e) {
		e.printStackTrace();
	}
	
	return "Inserted Successfully";
}

/* Suraj code for hospital unit fetch  28 Mar 2017*/
@Transactional
public Map<String, org.json.JSONArray> getHospitalUnitMasters() {
	org.json.JSONArray list = new org.json.JSONArray();
	Map<String, org.json.JSONArray> batchData = new HashMap<String, org.json.JSONArray>();

	String fetchTDSQuery = "select hosp_unit_id,hosp_unit_name,hosp_unit_narration,hosp_unit_add_date from ehat_hospital_unit_master where hosp_unit_delete_flag=0 order by hosp_unit_id desc ";

	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(fetchTDSQuery);
	List<Object[]> rows = query.list();
	for (Object[] row : rows) {
		try {
			JSONObject obj1 = new JSONObject();

			if (row[0] != null)
				obj1.put("hosp_unit_id", row[0].toString());
			else
				obj1.put("hosp_unit_id", "");

			if (row[1] != null)
				obj1.put("hosp_unit_name", row[1].toString());
			else
				obj1.put("hosp_unit_name", "");

			if (row[2] != null)
				obj1.put("hosp_unit_narration", row[2].toString());
			else
				obj1.put("hosp_unit_narration", "");

			if (row[3] != null)
				obj1.put("hosp_unit_add_date", row[3].toString());
			else
				obj1.put("hosp_unit_add_date", "");

			list.put(obj1);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	batchData.put("result", list);
	return batchData;
}

/* Suraj code for fetch Bill Category by Indent ID  1 Apr 2017*/
@Transactional
public String getBillCategoryByIndentSaleId(int indentSaleId) 
{
	String defalut = "Self";
	org.json.JSONArray list = new org.json.JSONArray();
	Map<String, org.json.JSONArray> batchData = new HashMap<String, org.json.JSONArray>();

	try {
		String fetchTDSQuery = "SELECT     ifnull(c.category_name, 'Self') as catName FROM    pharma_indent_sale_master master        join    ehat_charges_master_slave c ON c.id = master.bill_Category_id where    master.indent_sale_id ="+indentSaleId; 

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
				fetchTDSQuery);
		Object rows = query.uniqueResult();
		return defalut =""+rows;
	} catch (Exception e) {
		return defalut;
	}
	
}

//TNM Stage Master By Amol Saware
public JSONArray getAllBodyPart() {
	JSONArray bodyPartArray=new JSONArray();
	try{
	String query="select body_part_id,body_part_name from ehat_onco_emr_body_part where status = 'Y'";
			/*
			 * List<Map<String, Object>> rows = getJdbcTemplate().queryForList(query);
			 * for(Map<String, Object> row : rows){ JSONObject jsonObject=new JSONObject();
			 * jsonObject.put("bodyPartId", row.get("body_part_id").toString());
			 * jsonObject.put("bodyPartName", (String)row.get("body_part_name"));
			 * bodyPartArray.add(jsonObject); }
			 */
	} catch (Exception e) {
		e.printStackTrace();
	}
	return bodyPartArray;
}

@Transactional
public String saveTNMStageMaster(JSONObject jsonObject) {
	Integer bodyPartId = (Integer) jsonObject.get("bodyPartId");
	String[] exTdescriptionArray = (String[]) jsonObject.get("exTdescriptionArray");
	String[] exTstageArray = (String[]) jsonObject.get("exTstageArray");
	String[] exTcheckRadioArray = (String[]) jsonObject.get("exTcheckRadioArray");
	String[] exNdescriptionArray = (String[]) jsonObject.get("exNdescriptionArray");
	String[] exNstageArray = (String[]) jsonObject.get("exNstageArray");
	String[] exNcheckRadioArray = (String[]) jsonObject.get("exNcheckRadioArray");
	String[] exMetadescriptionArray = (String[]) jsonObject.get("exMetadescriptionArray");
	String[] exMetastageArray = (String[]) jsonObject.get("exMetastageArray");
	String[] exMetacheckRadioArray = (String[]) jsonObject.get("exMetacheckRadioArray");
	String[] newTdescriptionArray = (String[]) jsonObject.get("newTdescriptionArray");
	String[] newTstageArray = (String[]) jsonObject.get("newTstageArray");
	String[] newTcheckRadioArray = (String[]) jsonObject.get("newTcheckRadioArray");
	String[] newNdescriptionArray = (String[]) jsonObject.get("newNdescriptionArray");
	String[] newNstageArray = (String[]) jsonObject.get("newNstageArray");
	String[] newNcheckRadioArray = (String[]) jsonObject.get("newNcheckRadioArray");
	String[] newMetadescriptionArray = (String[]) jsonObject.get("newMetadescriptionArray");
	String[] newMetastageArray = (String[]) jsonObject.get("newMetastageArray");
	String[] newMetacheckRadioArray = (String[]) jsonObject.get("newMetacheckRadioArray");
	String[] exTmasterIdArray = (String[]) jsonObject.get("exTmasterIdArray");
	String[] exNmasterIdArray = (String[]) jsonObject.get("exNmasterIdArray");
	String[] exMetamasterIdArray = (String[]) jsonObject.get("exMetamasterIdArray");
	if(exTdescriptionArray!=null){
	for(int i=0;i<exTdescriptionArray.length;i++){
		String Tquery = "update ehat_tnm_master set tnm_type='T',tnm_description='" +exTdescriptionArray[i]+"',tnm_stage='"+exTstageArray[i]+"',tnm_checkbox_radio='"+exTcheckRadioArray[i]+"',body_part_id='"+bodyPartId+"',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where tnm_master_id = '" +exTmasterIdArray[i]+"'";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(Tquery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}
	if(exNdescriptionArray!=null){
	for(int i=0;i<exNdescriptionArray.length;i++){
		String Nquery = "update ehat_tnm_master set tnm_type='N',tnm_description='" +exNdescriptionArray[i]+"',tnm_stage='"+exNstageArray[i]+"',tnm_checkbox_radio='"+exNcheckRadioArray[i]+"',body_part_id='"+bodyPartId+"',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where tnm_master_id = '" +exNmasterIdArray[i]+"'";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(Nquery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}
	if(exMetadescriptionArray!=null){
	for(int i=0;i<exMetadescriptionArray.length;i++){
		String Metaquery = "update ehat_tnm_master set tnm_type='M',tnm_description='" +exMetadescriptionArray[i]+"',tnm_stage='"+exMetastageArray[i]+"',tnm_checkbox_radio='"+exMetacheckRadioArray[i]+"',body_part_id='"+bodyPartId+"',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where tnm_master_id = '" +exMetamasterIdArray[i]+"'";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(Metaquery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}
	if(newTdescriptionArray!=null){
	for(int i=0;i<newTdescriptionArray.length;i++){
		String Tquery = "insert into ehat_tnm_master(tnm_type,tnm_description,tnm_stage,tnm_checkbox_radio,body_part_id,added_by,added_on,remote_ip) values"
				+ "('T','" +newTdescriptionArray[i]+"','"+newTstageArray[i]+"','"+newTcheckRadioArray[i]+"','"+bodyPartId+"','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(Tquery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}
	if(newNdescriptionArray!=null){
	for(int i=0;i<newNdescriptionArray.length;i++){
		String Nquery = "insert into ehat_tnm_master(tnm_type,tnm_description,tnm_stage,tnm_checkbox_radio,body_part_id,added_by,added_on,remote_ip) values"
				+ "('N','" +newNdescriptionArray[i]+"','"+newNstageArray[i]+"','"+newNcheckRadioArray[i]+"','"+bodyPartId+"','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(Nquery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}
	if(newMetadescriptionArray!=null){
	for(int i=0;i<newMetadescriptionArray.length;i++){
		String Metaquery = "insert into ehat_tnm_master(tnm_type,tnm_description,tnm_stage,tnm_checkbox_radio,body_part_id,added_by,added_on,remote_ip) values"
				+ "('M','" +newMetadescriptionArray[i]+"','"+newMetastageArray[i]+"','"+newMetacheckRadioArray[i]+"','"+bodyPartId+"','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(Metaquery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}
	return "TNM Stage Master Saved Successfully";
}

@Transactional
public JSONArray getTNMByBodyPartId(Integer bodyPartId) {
	JSONArray TNMList = new JSONArray();
	try {
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT tnm_master_id,tnm_type,tnm_description,tnm_stage,tnm_checkbox_radio,body_part_id FROM ehat_tnm_master where status = 'Y' and body_part_id = "+bodyPartId);
		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			JSONObject jsonObject = new JSONObject();
			if (row[0] != null){
				jsonObject.put("tnmMasterId", row[0].toString());
			}else{
				jsonObject.put("tnmMasterId", "");
			}
			
			if (row[1] != null){
				jsonObject.put("tnmType", row[1].toString());
			}else{
				jsonObject.put("tnmType", "");
			}
			
			if (row[2] != null){
				jsonObject.put("tnmDescription", row[2].toString());
			}else{
				jsonObject.put("tnmDescription", "");
			}
			
			if (row[3] != null){
				jsonObject.put("tnmStage", row[3].toString());
			}else{
				jsonObject.put("tnmStage", "");
			}
			
			if (row[4] != null){
				jsonObject.put("tnmCheckBoxRadio", row[4].toString());
			}else{
				jsonObject.put("tnmCheckBoxRadio", "");
			}
			
			if (row[5] != null){
				jsonObject.put("bodyPartId", row[5].toString());
			}else{
				jsonObject.put("bodyPartId", "");
			}
			TNMList.add(jsonObject);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	return TNMList;
}

@Transactional
public String removeTNMBytnmMasterId(JSONObject jsonObject) {
	String[] tnmMasterIdArray = (String[]) jsonObject.get("tnmMasterIdArray");
	if(tnmMasterIdArray!=null){
		for(int i=0;i<tnmMasterIdArray.length;i++){
			String Metaquery = "update ehat_tnm_master set status='N',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where tnm_master_id = '" +tnmMasterIdArray[i]+"'";
			try {
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(Metaquery);
				sqlQuery.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	return "TNM Stage Master Deleted Successfully";
}

@Transactional
public String saveClinicalStage(JSONObject jsonObject) {
	String response = "";
	Integer tnmStageId = (Integer) jsonObject.get("tnmStageId");
	if(tnmStageId==null || tnmStageId.equals("")){
	String insertQuery = "insert into ehat_tnm_stages(patient_id,body_part_id,tnm_stage,tnm_group_stage,tnm_description,tnm_clinical_date,tnm_comment,tnm_all_stages,added_by,added_on,remote_ip) values"
			+ "('" +jsonObject.get("patientId")+"','" +jsonObject.get("bodyPartId")+"','" +jsonObject.get("tnmStage")+"','" +jsonObject.get("tnmGroupStage")+"','" +jsonObject.get("tnmDescription")+"','"+jsonObject.get("clinicalStageDate")+"','"+jsonObject.get("commentClinicalstate")+"','"+jsonObject.get("stageArray")+"','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')";

	try {
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(insertQuery);
		sqlQuery.executeUpdate();
	} catch (Exception e) {
		e.printStackTrace();
	}
	response = "Clinical Stage Master Saved Successfully";
	}
	else{
		String updateQuery = "update ehat_tnm_stages set body_part_id='" +jsonObject.get("bodyPartId")+"',tnm_stage='"+jsonObject.get("tnmStage")+"',tnm_group_stage='"+jsonObject.get("tnmGroupStage")+"',tnm_description='" +jsonObject.get("tnmDescription")+"',tnm_clinical_date='"+jsonObject.get("clinicalStageDate")+"',tnm_comment='"+jsonObject.get("commentClinicalstate")+"',tnm_all_stages='"+jsonObject.get("stageArray")+"',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where tnm_stages_id = '" +tnmStageId+"'";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(updateQuery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		response = "Clinical Stage Master Updated Successfully";
	}
	return response;
}

@Transactional
public JSONArray getTNMStageByPatientId(Integer patientId) {
	JSONArray stageList = new JSONArray();
	try {
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT tnm_stages_id,patient_id,ebp.body_part_id,tnm_stage,tnm_group_stage,tnm_description,tnm_clinical_date,tnm_comment,tnm_all_stages,ets.added_by,body_part_name,User_Name FROM ehat_tnm_stages ets inner join ehat_onco_emr_body_part ebp on ets.body_part_id=ebp.body_part_id inner join users on ets.added_by = User_ID where ets.status = 'Y' and patient_id = "+patientId);
		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			JSONObject jsonObject = new JSONObject();
			if (row[0] != null){
				jsonObject.put("tnmStageId", row[0].toString());
			}else{
				jsonObject.put("tnmStageId", "");
			}
			
			if (row[1] != null){
				jsonObject.put("patientId", row[1].toString());
			}else{
				jsonObject.put("patientId", "");
			}
			
			if (row[2] != null){
				jsonObject.put("bodyPartId", row[2].toString());
			}else{
				jsonObject.put("bodyPartId", "");
			}
			
			if (row[3] != null){
				jsonObject.put("tnmStage", row[3].toString());
			}else{
				jsonObject.put("tnmStage", "");
			}
			
			if (row[4] != null){
				jsonObject.put("tnmGroupStage", row[4].toString());
			}else{
				jsonObject.put("tnmGroupStage", "");
			}
			
			if (row[5] != null){
				jsonObject.put("tnmDescription", row[5].toString());
			}else{
				jsonObject.put("tnmDescription", "");
			}
			
			if (row[6] != null){
				jsonObject.put("tnmClinicalDate", row[6].toString());
			}else{
				jsonObject.put("tnmClinicalDate", "");
			}
			
			if (row[7] != null){
				jsonObject.put("tnmComment", row[7].toString());
			}else{
				jsonObject.put("tnmComment", "");
			}
			
			if (row[8] != null){
				jsonObject.put("tnmAllStages", row[8].toString());
			}else{
				jsonObject.put("tnmAllStages", "");
			}
			if (row[9] != null){
				jsonObject.put("addedBy", row[9].toString());
			}
			if (row[10] != null){
				jsonObject.put("bodyPartName", row[10].toString());
			}
			if (row[11] != null){
				jsonObject.put("userName", row[11].toString());
			}
			stageList.add(jsonObject);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	return stageList;
}

@Transactional
public String removeTNMStageById(JSONObject jsonObject) {
	String[] tnmStageIdArray = (String[]) jsonObject.get("tnmStageIdArray");
	if(tnmStageIdArray!=null){
		for(int i=0;i<tnmStageIdArray.length;i++){
			String deleteQuery = "update ehat_tnm_stages set status='N',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where tnm_stages_id = '" +tnmStageIdArray[i]+"'";
			try {
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(deleteQuery);
				sqlQuery.executeUpdate();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	return "TNM Stage Deleted Successfully";
}

@Transactional
public String saveTNMGroup(JSONObject jsonObject) {
	String response = "";
	String groupId = (String) jsonObject.get("groupMasterId");
	if(groupId==null || groupId.equals("")){
	String insertQuery = "insert into ehat_tnm_group(body_part_id,group_name,group_stage,tnm_master_id,added_by,added_on,remote_ip) values"
			+ "('" +jsonObject.get("bodyPartId")+"','" +jsonObject.get("tnmGroupName")+"','" +jsonObject.get("tnmGroupStage")+"','" +jsonObject.get("groupArray")+"','"+jsonObject.get("addedBy")+"','"+jsonObject.get("addedOn")+"','"+jsonObject.get("remoteAddress")+"')";
	try {
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(insertQuery);
		sqlQuery.executeUpdate();
	} catch (Exception e) {
		e.printStackTrace();
	}
	response = "TNM Group Stage Master Saved Successfully";
	}
	else{
		String updateQuery = "update ehat_tnm_group set body_part_id='" +jsonObject.get("bodyPartId")+"',group_name='"+jsonObject.get("tnmGroupName")+"',group_stage='"+jsonObject.get("tnmGroupStage")+"',tnm_master_id='"+jsonObject.get("groupArray")+"',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where group_id = '" +groupId+"'";
		try {
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(updateQuery);
			sqlQuery.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		response = "TNM Group Stage Master Updated Successfully";
	}
	return response;
}

@Transactional
public JSONArray getAllGroup() {
	JSONArray tnmGroupList = new JSONArray();
	try {
		SQLQuery query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("SELECT group_id,group_name,group_stage,gp.body_part_id,body_part_name,tnm_master_id FROM ehat_tnm_group gp inner join ehat_onco_emr_body_part ebp on gp.body_part_id=ebp.body_part_id where gp.status = 'Y'");
		List<Object[]> rows = query.list();
		for (Object[] row : rows) {
			JSONObject jsonObject = new JSONObject();
			if (row[0] != null){
				jsonObject.put("groupMasterId", row[0].toString());
			}
			if (row[1] != null){
				jsonObject.put("groupName", row[1].toString());
			}
			if (row[2] != null){
				jsonObject.put("groupStage", row[2].toString());
			}
			if (row[3] != null){
				jsonObject.put("bodyPartId", row[3].toString());
			}
			if (row[4] != null){
				jsonObject.put("bodyPartName", row[4].toString());
			}
			if (row[5] != null){
				jsonObject.put("groupArray", row[5].toString());
			}else{
				jsonObject.put("groupArray", "");
			}
			tnmGroupList.add(jsonObject);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	return tnmGroupList;
}

@Transactional
public String removeTNMGroupById(JSONObject jsonObject) {
	String deleteQuery = "update ehat_tnm_group set status='N',modify_by='"+jsonObject.get("addedBy")+"',modify_on='"+jsonObject.get("addedOn")+"',remote_ip='"+jsonObject.get("remoteAddress")+"' where group_id = '" +jsonObject.get("groupMasterId")+"'";
	try {
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(deleteQuery);
		sqlQuery.executeUpdate();
	} catch (Exception e) {
		e.printStackTrace();
	}
	return "TNM Group Deleted Successfully";
}

@Transactional
public String getPoDateFromPoId(String id) throws ParseException 
{
	
	String fetchPrintQuery = " SELECT poMaster.po_date FROM pharma_po_master poMaster inner join pharma_partywise_po_invoice_master invoice ON poMaster.po_id = invoice.po_id "
                              +" where poMaster.po_id ='"+id+"'";

	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
			fetchPrintQuery);
	
	Object rows = query.uniqueResult();
	if(rows==null) {
		LocalDate dateObj = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String date = dateObj.format(formatter);
		rows=date;
	}
	String date[] = rows.toString().split("-");
	StringBuffer stringBuffer = new StringBuffer();
	stringBuffer
			.append(date[2] + "/" + date[1] + "/" + date[0]);
	
	return stringBuffer.toString();
}

//Added by Vikas Godse

	@Transactional
	public JSONArray getGroupName(String tnmStage) {
		JSONArray group_name = new JSONArray();
		String name = "SELECT group_name FROM ehat_tnm_group where status = 'Y' and group_stage = '"
				+ tnmStage + "'";
		SQLQuery query = sessionFactory.getCurrentSession()
				.createSQLQuery(name);
		List<Object[]> rows = query.list();
		for (Object row : rows) {
			JSONObject jsonObject = new JSONObject();
			if (row != null) {
				jsonObject.put("groupName", row.toString());
			}
			group_name.add(jsonObject);
		}
		return group_name;
	}

@Transactional
public JSONArray fetchCatMasterList() {
	JSONArray tnmGroupList = new JSONArray();
	String fetchPrintQuery = " SELECT id_category_master,category_name FROM ehat_bill_discount_category_master where status='Y'";
	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
			fetchPrintQuery);
	
	List<Object[]> rows = query.list();
	for (Object[] row : rows) {
		JSONObject jsonObject = new JSONObject();
		if (row[0] != null){
			jsonObject.put("catId", row[0].toString());
		}
		if (row[1] != null){
			jsonObject.put("catName", row[1].toString());
		}
		tnmGroupList.add(jsonObject);
}
	return tnmGroupList;
}



@Transactional
public void updateBedChargesPerDay() {
	
	ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
	String hospitalname = bundle.getObject("hospitalname").toString();	
	String sql = null;
	
	if(hospitalname.equalsIgnoreCase("Siddhivinayak")) {
		
		 sql = "SELECT bill_details_id,amount,co_pay,pay,rate,quantity,other_amount,other_co_pay,other_pay,other_rate "	
				 	+" FROM ehat_bill_details_ipd e, ehat_bill_master b, treatment_beds tb where e.bill_id = b.bill_id AND tb.id=e.tr_bed_id AND e.service_id=3 AND e.sub_service_id !=0 AND e.on_bed_flag='Y' AND e.cancle='N' AND e.deleted='N' AND b.invoice_flag='N' AND tb.phydis_flag='N'";
		
	}else {
		
		 sql = "SELECT bill_details_id,amount,co_pay,pay,rate,quantity,other_amount,other_co_pay,other_pay,other_rate "	
				 	+" FROM ehat_bill_details_ipd where service_id=3 AND sub_service_id !=0 AND on_bed_flag='Y' AND cancle='N' AND deleted='N' ";
	}
	
     SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
     query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
     List<Map<String, Object>> data = query.list();
     
     for(Map<String, Object> row : data){
    	 
    	 int billID=  (Integer)row.get("bill_details_id");
    	 BillDetailsIpdDto objDTO = (BillDetailsIpdDto) sessionFactory.getCurrentSession().get(BillDetailsIpdDto.class, billID);
		//objectToUpdate.setPaidFlag("Y");				
    	 //BillDetailsIpdDto objDTO= new BillDetailsIpdDto();
    	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
    	 objDTO.setRate((Double)row.get("rate"));
    	 objDTO.setAmount((Double)row.get("amount") + objDTO.getRate());
    	 objDTO.setCoPay((Double)row.get("co_pay")+ objDTO.getRate());
    	 objDTO.setPay((Double)row.get("pay"));
    	 
    	 objDTO.setQuantity((Double)row.get("quantity")+1);
    	 objDTO.setOtherRate((Double)row.get("other_rate"));
    	 objDTO.setOtherAmount((Double)row.get("other_amount") + objDTO.getOtherRate());
    	 objDTO.setOtherCoPay((Double)row.get("other_co_pay"));
    	 objDTO.setOtherPay((Double)row.get("other_pay")+objDTO.getOtherRate());
    	 
    	 //update billDetailsdto
    	 //updateBillDetailsIpdDto(objDTO);
     }
}


@Transactional
public void updateNursingChargesPerDay() {
	
	ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
	String hospitalname = bundle.getObject("hospitalname").toString();	
	String sql = null;
	
	if(hospitalname.equalsIgnoreCase("Siddhivinayak")) {
		
		 sql = "SELECT bill_details_id,amount,co_pay,pay,rate,quantity,other_amount,other_co_pay,other_pay,other_rate "	
				 	+" FROM ehat_bill_details_ipd e, ehat_bill_master b, treatment_beds tb where e.bill_id = b.bill_id AND tb.id=e.tr_bed_id AND e.service_id=3 AND e.sub_service_id=0 AND e.on_bed_flag='Y' AND e.cancle='N' AND e.deleted='N' AND b.invoice_flag='N' AND tb.phydis_flag='N' ";
		
	}else {
		
		 sql = "SELECT bill_details_id,amount,co_pay,pay,rate,quantity,other_amount,other_co_pay,other_pay,other_rate "	
				 	+" FROM ehat_bill_details_ipd where service_id=3 AND sub_service_id =0 AND on_bed_flag='Y' AND cancle='N' AND deleted='N' ";
	}
	
	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
    List<Map<String, Object>> data = query.list();
     
     for(Map<String, Object> row : data){
    	 
    	 int billID=  (Integer)row.get("bill_details_id");
    	 BillDetailsIpdDto objDTO = (BillDetailsIpdDto) sessionFactory.getCurrentSession().get(BillDetailsIpdDto.class, billID);
		//objectToUpdate.setPaidFlag("Y");				
    	 //BillDetailsIpdDto objDTO= new BillDetailsIpdDto();
    	 objDTO.setBillDetailsId((Integer)row.get("bill_details_id"));
    	 objDTO.setRate((Double)row.get("rate"));
    	 objDTO.setAmount((Double)row.get("amount") + objDTO.getRate());
    	 objDTO.setCoPay((Double)row.get("co_pay")+ objDTO.getRate());
    	 objDTO.setPay((Double)row.get("pay"));
    	 
    	 objDTO.setQuantity((Double)row.get("quantity")+1);
    	 objDTO.setOtherRate((Double)row.get("other_rate"));
    	 objDTO.setOtherAmount((Double)row.get("other_amount") + objDTO.getOtherRate());
    	 objDTO.setOtherCoPay((Double)row.get("other_co_pay"));
    	 objDTO.setOtherPay((Double)row.get("other_pay")+objDTO.getOtherRate());
    	 
    	 //update billDetailsdto
    	 //updateBillDetailsIpdDto(objDTO);
     }
   
}
	//Added By BILAL
	@Transactional
	public Integer gettaxIdByGSTName(String uomName) {
		Integer count = 0;

		if (uomName != null && uomName != "") {
			String insertedGSTMaster = "SELECT max(tax_id) FROM pharma_tax_master where tax_name='"
					+ uomName + "'";
			SQLQuery queryPharmaGSTMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(insertedGSTMaster);

			Object resultUom = (Object) queryPharmaGSTMaster.uniqueResult();
			System.out.println(resultUom);
			if (resultUom == null)
				count = 0;
			else
				count = 1;
		}
		return count;
	}
	
	//Added By BILAL
		@Transactional
		public Integer gettaxIdByHSNName(String hsnName) {
			Integer count = 0;

			if (hsnName != null && hsnName != "") {
				String insertedHSNMaster = "SELECT max(idpharma_hsn_master) FROM pharma_hsn_master where hsn_no='"
						+ hsnName + "'";
				SQLQuery queryPharmaGSTMaster = sessionFactory.getCurrentSession()
						.createSQLQuery(insertedHSNMaster);

				Object resultUom = (Object) queryPharmaGSTMaster.uniqueResult();
				System.out.println(resultUom);
				if (resultUom == null)
					count = 0;
				else
					count = 1;
			}
			return count;
		}
		
		//Added By BILAL
				@Transactional
				public Integer getProductIdByProductName(String productName) {
					Integer count = 0;

					if (productName != null && productName != "") {
						String insertedHSNMaster = "SELECT max(product_id) FROM pharma_product_master where product_name ='"
								+ productName + "'";
						SQLQuery queryPharmaGSTMaster = sessionFactory.getCurrentSession()
								.createSQLQuery(insertedHSNMaster);

						Object resultUom = (Object) queryPharmaGSTMaster.uniqueResult();
						System.out.println(resultUom);
						if (resultUom == null)
							count = 0;
						else
							count = 1;
					}
					return count;
				}
				

	//Added by Laxman on 17-JAN-2018 for close opd treatment automatically at 23:59:00.
	@Transactional
	public void autoCloseTreatment() {
		try {
			//cloase opd treatment in ehat_treatement.
			System.out.println("=====================start auto close==================================");
			String treatmentQueuery = "update ehat_treatment set t_flag='N', narration='Auto Cloased Treatment' where t_flag !='N' and department_id in (1,3) and date(created_date_time) <= CURDATE()";
			SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(treatmentQueuery);
			sqlQuery.executeUpdate();
			
			//cloase opd treatment in token_number.
			String tokenNoQueuery = "update token_number set t_flag='N', narration='Auto Cloased Treatment' where t_flag IS NULL or t_flag !='N'  and department_id in (1,3) and date(created_date_time) <= CURDATE()";
			SQLQuery sqlQuery1 = sessionFactory.getCurrentSession().createSQLQuery(tokenNoQueuery);
			sqlQuery1.executeUpdate();
			System.out.println("=====================end auto close==================================");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	public EhatEnterpriseUtil() {
	
	}

	

}