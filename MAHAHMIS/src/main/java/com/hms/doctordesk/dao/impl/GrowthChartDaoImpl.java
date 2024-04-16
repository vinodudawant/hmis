package com.hms.doctordesk.dao.impl;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.GrowthChartDao;
import com.hms.dto.StandardAndPatientBMIDetailsDTO;
import com.hms.utility.Age;
import com.hms.utility.AgeCalculatorMain;

@Repository
public class GrowthChartDaoImpl implements GrowthChartDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public List<StandardAndPatientBMIDetailsDTO> getGrowthChartDetailsLessThanFiveYears(
			String patientId) {
		List<StandardAndPatientBMIDetailsDTO> spBMIList = new ArrayList<StandardAndPatientBMIDetailsDTO>();
		Session session = null;
		try {
			Integer pId = 0;
			if(patientId != null){
				pId = Integer.parseInt(patientId);
			}
			session = sessionFactory.getCurrentSession();
			
			String sql = null;
			String sex = "";
			String dob = "";
			String monthsString = "";
			boolean repeatFlag = true;

			sql = "SELECT gender AS gender, dob AS dob FROM RegistrationDto WHERE patientId =:patientId";

			Query query1 = session.createQuery(sql);
			query1.setParameter("patientId", pId);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listmorDetails = query1.list();

			for (Map<String, Object> row : listmorDetails) {
				sex = (String) row.get("gender");
				dob = (String) row.get("dob");
			}
			
			// default:Boy
			String tableNameBoyGirl = "standard_growth_chart_boy";
			// girl
			if (!sex.equalsIgnoreCase("Male")) {
				tableNameBoyGirl = "standard_growth_chart_girl";
			}

			// start: get data for patient and for standard values first.
			//sql = "SELECT patient_bmi_date AS patient_bmi_date FROM patient_bmi_details WHERE patient_id =:patient_id AND status =:status";
			sql = "SELECT bmi_date as patient_bmi_date  FROM opd_bmi_master WHERE patient_id =:patient_id AND deleted =:deleted";
			Query query2 = session.createSQLQuery(sql);
			query2.setParameter("patient_id", pId);
			query2.setParameter("deleted", "N");
			query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			//Added by Akshata
			
			/*
			 * List<String> list = query2.list(); if(list.isEmpty() || list.equals(" ") ||
			 * list.equals(null)) { Format f = new SimpleDateFormat("dd/MM/yyyy"); String
			 * strDate = f.format(new Date());
			 * System.out.println("Current Date = "+strDate); list.add(strDate); }
			 */
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> list=query2.list();
			
			for(int k=0; k < list.size(); k++) {
				
				Map<String, Object> mapBMi_Date = list.get(k);
			
			//for(Map<String, Object> mapBMi_Date : list){
			//for(String mapBMi_Date : list){
				// patient_bmi_date = 17/12/2015
				String patient_bmi_date = (String) mapBMi_Date
						.get("patient_bmi_date");
			//	String patient_bmi_date =  mapBMi_Date;
						//.get("patient_bmi_date");
				String newbmidt=patient_bmi_date.replaceAll("-", "/");
				// calculate age (dob, patient_bmi_date) days_years_months
				Age age = AgeCalculatorMain.calculateAgeFromDateToDate(
						(new SimpleDateFormat("dd/MM/yyyy").parse(dob)),
						(new SimpleDateFormat("dd/MM/yyyy")
								.parse(newbmidt)));

				// part-1
				float finalAgeInMonths = ((AgeCalculatorMain
						.calculateAgeInMonthsTillParamDateString(age,
								newbmidt)));

				if (finalAgeInMonths <= 60) {

					if ((age.getYears() == 0) && (age.getMonths() == 0)) {
						if (age.getDays() <= 7) {
							// 1 week = 0.1 month
							finalAgeInMonths = (float) 0.1;
						} else if ((age.getDays() >= 7)
								&& (age.getDays() <= 14)) {
							// 2 week = 0.2 month
							finalAgeInMonths = (float) 0.2;
						} else if ((age.getDays() >= 14)
								&& (age.getDays() <= 21)) {
							// 3 week = 0.3 month
							finalAgeInMonths = (float) 0.3;
						} else if ((age.getDays() >= 21)
								&& (age.getDays() <= 28)) {
							// 4 week = 0.4 month
							finalAgeInMonths = (float) 0.4;
						}
					}
				
					// get data for patient and for standard values first.
				
					/*
					sql = "SELECT months, patient_height, patient_weight, patient_headcim, patient_bmi_date"
							+ ", height_3, height_15, height_50, height_85, height_97"
							+ ", weight_3, weight_15, weight_50, weight_85, weight_97"
							+ ", headcim_3, headcim_15, headcim_50, headcim_85, headcim_97"
							+ " FROM "
							+ tableNameBoyGirl
							+ " LEFT OUTER JOIN patient_bmi_details ON months=:months"
							+ " WHERE patient_id=:patient_id AND patient_bmi_date=:patient_bmi_date AND "
							+ tableNameBoyGirl
							+ ".status='Y'  and  months != 0 "
							+ " AND patient_bmi_details.status='Y'";
							
							*/
					

					sql = "SELECT months, height as patient_height, weight as  patient_weight, head_cm as  patient_headcim, bmi_date "
							+ ", height_3, height_15, height_50, height_85, height_97"
							+ ", weight_3, weight_15, weight_50, weight_85, weight_97"
							+ ", headcim_3, headcim_15, headcim_50, headcim_85, headcim_97"
							+ " FROM "
							+ tableNameBoyGirl
							+ " LEFT OUTER JOIN opd_bmi_master ON months=:months"
							+ " WHERE patient_id=:patient_id AND bmi_date=:patient_bmi_date AND "
							+ tableNameBoyGirl
							+ ".status='Y'  and  months != 0 "
							+ " AND opd_bmi_master.deleted='N'";



					Query query3 = session.createSQLQuery(sql);
					query3.setParameter("months", finalAgeInMonths);
					query3.setParameter("patient_id", pId);
					query3.setParameter("patient_bmi_date", patient_bmi_date);
					query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> rs = query3.list();
					for(Map<String, Object> map : rs){
						
						StandardAndPatientBMIDetailsDTO obj = new StandardAndPatientBMIDetailsDTO();
						obj.setMonths((String) map.get("months"));
						if (repeatFlag) {
							monthsString = obj.getMonths();
							repeatFlag = false;
						} else {
							monthsString += (", " + obj.getMonths());
						}

						obj.setPatientFinalAgeInMonths((String) map
								.get("months"));
						obj.setPatient_height(((Double) map
								.get("patient_height")).toString());
						obj.setPatient_weight(((Double) map
								.get("patient_weight")).toString());
						//obj.setPatient_headcim(((Double) map.get("patient_headcim")).toString());
						obj.setPatient_headcim(((String) map.get("patient_headcim")));

						obj.setHeight_3((String) map.get("height_3"));
						obj.setHeight_15((String) map.get("height_15"));
						obj.setHeight_50((String) map.get("height_50"));
						obj.setHeight_85((String) map.get("height_85"));
						obj.setHeight_97((String) map.get("height_97"));

						obj.setWeight_3((String) map.get("weight_3"));
						obj.setWeight_15((String) map.get("weight_15"));
						obj.setWeight_50((String) map.get("weight_50"));
						obj.setWeight_85((String) map.get("weight_85"));
						obj.setWeight_97((String) map.get("weight_97"));

						obj.setHeadcim_3((String) map.get("headcim_3"));
						obj.setHeadcim_15((String) map.get("headcim_15"));
						obj.setHeadcim_50((String) map.get("headcim_50"));
						obj.setHeadcim_85((String) map.get("headcim_85"));
						obj.setHeadcim_97((String) map.get("headcim_97"));

						spBMIList.add(obj);
						}
					// end: get data for patient and for standard values first.

				} // if (finalAgeInMonths <= 60)
			}
			// start remaing values
			// part-2
			if (!(monthsString.trim().equals(""))) {

				
				
				sql = "SELECT months, height_3, height_15, height_50, height_85, height_97"
						+ ", weight_3, weight_15, weight_50, weight_85, weight_97"
						+ ", headcim_3, headcim_15, headcim_50, headcim_85, headcim_97"
						+ " FROM "
						+ tableNameBoyGirl
						+ " WHERE status='Y' AND   months != 0 and months NOT IN('"
						+ monthsString + "')";

				Query query4 = session.createSQLQuery(sql);
				query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> rs = query4.list();
				System.out.println("List<Map<String, Object>> rs  = "+ rs); 
				for(Map<String, Object> map1 : rs){
					
					StandardAndPatientBMIDetailsDTO obj = new StandardAndPatientBMIDetailsDTO();

					// intentionally left blank
					obj.setPatient_height("");
					obj.setPatient_weight("");
					obj.setPatient_headcim("");

					obj.setMonths((String) map1.get("months"));
					obj.setPatientFinalAgeInMonths((String) map1.get("months"));
					obj.setHeight_3((String) map1.get("height_3"));
					obj.setHeight_15((String) map1.get("height_15"));
					obj.setHeight_50((String) map1.get("height_50"));
					obj.setHeight_85((String) map1.get("height_85"));
					obj.setHeight_97((String) map1.get("height_97"));

					obj.setWeight_3((String) map1.get("weight_3"));
					obj.setWeight_15((String) map1.get("weight_15"));
					obj.setWeight_50((String) map1.get("weight_50"));
					obj.setWeight_85((String) map1.get("weight_85"));
					obj.setWeight_97((String) map1.get("weight_97"));

					obj.setHeadcim_3((String) map1.get("headcim_3"));
					obj.setHeadcim_15((String) map1.get("headcim_15"));
					obj.setHeadcim_50((String) map1.get("headcim_50"));
					obj.setHeadcim_85((String) map1.get("headcim_85"));
					obj.setHeadcim_97((String) map1.get("headcim_97"));

					spBMIList.add(obj);
				}
			}
			// end: get remaining values from standard table.
			// sorting based on patietnAgeInMonths
			Collections.sort(spBMIList,
					StandardAndPatientBMIDetailsDTO.finalAgeInMonthsComparator);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return spBMIList;
	}

	@Override
	public List<StandardAndPatientBMIDetailsDTO> getGrowthChartDetailsGreaterThanFiveYears(
			String patientId) {

		List<StandardAndPatientBMIDetailsDTO> spBMIList = new ArrayList<StandardAndPatientBMIDetailsDTO>();
		Session session = null;
		try {
			Integer pId = 0;
			if(patientId != null){
				pId = Integer.parseInt(patientId);
			}
			
			session = sessionFactory.getCurrentSession();
			
			String sql = null;
			String sex = "";
			String dob = "";
			String yearsString = "";
			boolean repeatFlag = true;

			sql = "SELECT gender AS gender, dob AS dob FROM RegistrationDto WHERE patientId =:patientId";

			Query query1 = session.createQuery(sql);
			query1.setParameter("patientId", pId);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listmorDetails = query1.list();

			for (Map<String, Object> row : listmorDetails) {
				sex = (String) row.get("gender");
				dob = (String) row.get("dob");
			}
			// default:Boy
			String tableNameBoyGirl = "standard_growth_chart_boy";
			// girl
			if (!sex.equalsIgnoreCase("Male")) {
				tableNameBoyGirl = "standard_growth_chart_girl";
			}

			// start: get data for patient and for standard values first.
			//sql = "SELECT patient_bmi_date FROM patient_bmi_details WHERE patient_id=:patient_id AND status=:status";
			sql = "SELECT bmi_date as patient_bmi_date FROM opd_bmi_master WHERE patient_id=:patient_id AND deleted=:deleted";

			Query query2 = session.createSQLQuery(sql);
			query2.setParameter("patient_id", pId);
		//	query2.setParameter("status", "Y");
			query2.setParameter("deleted", "N");
			query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query2.list();
			for(Map<String, Object> mapBMi_Date : list){
			
			// patient_bmi_date = 17/12/2015
			String patient_bmi_date = ((String) mapBMi_Date
						.get("patient_bmi_date"));
			String newbmidt=patient_bmi_date.replaceAll("-", "/");
			// calculate age (dob, patient_bmi_date) days_years_months
			Age age = AgeCalculatorMain.calculateAgeFromDateToDate(
						(new SimpleDateFormat("dd/MM/yyyy").parse(dob)),
						(new SimpleDateFormat("dd/MM/yyyy")
								.parse(newbmidt))); 

			if (age.getYears() >= 5) {

					// part-1
					float finalAgeInYears = ((AgeCalculatorMain
							.calculateApproximateAgeInYearsByYearsMonthDays(age)));
					
					// get data for patient and for standard values first.
					/*sql = "SELECT years, patient_height, patient_weight, patient_headcim, patient_bmi, patient_bmi_date"
							+ ", height_3, height_15, height_50, height_85, height_97"
							+ ", weight_3, weight_15, weight_50, weight_85, weight_97"
							+ ", headcim_3, headcim_15, headcim_50, headcim_85, headcim_97"
							+ ", bmi_3, bmi_15, bmi_50, bmi_85, bmi_97"
							+ " FROM "
							+ tableNameBoyGirl
							+ " LEFT OUTER JOIN patient_bmi_details ON years=:years"
							+ " WHERE patient_id=:patient_id AND patient_bmi_date=:patient_bmi_date AND "
							+ tableNameBoyGirl
							+ ".status='Y' AND years != 0"
							+ " AND patient_bmi_details.status='Y'";
							*/
					
					sql = "SELECT years, height as patient_height, weight as patient_weight,ifnull(head_cm,'0') as  patient_headcim, bmi as  patient_bmi, bmi_date as  patient_bmi_date"
							+ ", height_3, height_15, height_50, height_85, height_97"
							+ ", weight_3, weight_15, weight_50, weight_85, weight_97"
							+ ", headcim_3, headcim_15, headcim_50, headcim_85, headcim_97"
							+ ", bmi_3, bmi_15, bmi_50, bmi_85, bmi_97"
							+ " FROM "
							+ tableNameBoyGirl
							+ " LEFT OUTER JOIN opd_bmi_master ON years=:years"
							+ " WHERE patient_id=:patient_id AND bmi_date=:patient_bmi_date AND "
							+ tableNameBoyGirl
							+ ".status='Y' AND years != 0"
							+ " AND opd_bmi_master.deleted='N'";
				
					Query query3 = session.createSQLQuery(sql);
					query3.setParameter("years", finalAgeInYears);
					query3.setParameter("patient_id", pId);
					query3.setParameter("patient_bmi_date", patient_bmi_date);
					query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> rs = query3.list();

					for(Map<String, Object> map : rs){
						StandardAndPatientBMIDetailsDTO obj = new StandardAndPatientBMIDetailsDTO();

						obj.setYears((String) map.get("years"));
						if (repeatFlag) {
							yearsString = obj.getYears();
							repeatFlag = false;
						} else {
							yearsString += (", " + obj.getYears());
						}

						obj.setPatientFinalAgeInYears((String) map.get("years"));
						obj.setPatient_height(((Double) map
								.get("patient_height")).toString());
						obj.setPatient_weight(((Double) map
								.get("patient_weight")).toString());
						
						//obj.setPatient_headcim(((Double) map.get("patient_headcim")).toString());
						obj.setPatient_headcim(((String) map.get("patient_headcim")));
						
						obj.setPatient_bmi(((Double) map.get("patient_bmi")).toString());

						obj.setHeight_3((String) map.get("height_3"));
						obj.setHeight_15((String) map.get("height_15"));
						obj.setHeight_50((String) map.get("height_50"));
						obj.setHeight_85((String) map.get("height_85"));
						obj.setHeight_97((String) map.get("height_97"));

						obj.setWeight_3((String) map.get("weight_3"));
						obj.setWeight_15((String) map.get("weight_15"));
						obj.setWeight_50((String) map.get("weight_50"));
						obj.setWeight_85((String) map.get("weight_85"));
						obj.setWeight_97((String) map.get("weight_97"));

						obj.setHeadcim_3((String) map.get("headcim_3"));
						obj.setHeadcim_15((String) map.get("headcim_15"));
						obj.setHeadcim_50((String) map.get("headcim_50"));
						obj.setHeadcim_85((String) map.get("headcim_85"));
						obj.setHeadcim_97((String) map.get("headcim_97"));

						obj.setBmi_3((String) map.get("bmi_3"));
						obj.setBmi_15((String) map.get("bmi_15"));
						obj.setBmi_50((String) map.get("bmi_50"));
						obj.setBmi_85((String) map.get("bmi_85"));
						obj.setBmi_97((String) map.get("bmi_97"));

						spBMIList.add(obj);

					}
					// end: get data for patient and for standard values first.
				}// if age in years >= 5
			}

			// start remaing values
			// part-2
			if (!(yearsString.trim().equals(""))) {

				// start: get remaining values from standard table.
				sql = "SELECT * FROM " + tableNameBoyGirl
						+ " WHERE status='Y' AND years != 0 AND years NOT IN("
						+ yearsString + ")";

				Query query4 = session.createSQLQuery(sql);
				query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> rs1 = query4.list();
				for(Map<String, Object> map1 : rs1){
				
					StandardAndPatientBMIDetailsDTO obj = new StandardAndPatientBMIDetailsDTO();

					// intentionally left blank
					obj.setPatient_height("");
					obj.setPatient_weight("");
					obj.setPatient_headcim("");
					obj.setPatient_bmi("");

					obj.setYears((String) map1.get("years"));
					obj.setPatientFinalAgeInYears((String) map1.get("years"));
					obj.setHeight_3((String) map1.get("height_3"));
					obj.setHeight_15((String) map1.get("height_15"));
					obj.setHeight_50((String) map1.get("height_50"));
					obj.setHeight_85((String) map1.get("height_85"));
					obj.setHeight_97((String) map1.get("height_97"));

					obj.setWeight_3((String) map1.get("weight_3"));
					obj.setWeight_15((String) map1.get("weight_15"));
					obj.setWeight_50((String) map1.get("weight_50"));
					obj.setWeight_85((String) map1.get("weight_85"));
					obj.setWeight_97((String) map1.get("weight_97"));

					obj.setHeadcim_3((String) map1.get("headcim_3"));
					obj.setHeadcim_15((String) map1.get("headcim_15"));
					obj.setHeadcim_50((String) map1.get("headcim_50"));
					obj.setHeadcim_85((String) map1.get("headcim_85"));
					obj.setHeadcim_97((String) map1.get("headcim_97"));

					obj.setBmi_3((String) map1.get("bmi_3"));
					obj.setBmi_15((String) map1.get("bmi_15"));
					obj.setBmi_50((String) map1.get("bmi_50"));
					obj.setBmi_85((String) map1.get("bmi_85"));
					obj.setBmi_97((String) map1.get("bmi_97"));

					spBMIList.add(obj);
				}
			}
			// end: get remaining values from standard table.
			// sorting based on patietnAgeInMonths
			Collections.sort(spBMIList,
					StandardAndPatientBMIDetailsDTO.finalAgeInYearsComparator);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return spBMIList;
	}
}