package com.hms.doctordesk.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.DoctorDeskChartsDao;
import com.hms.doctordesk.dto.ImmunizationConfigurationMaster;
import com.hms.doctordesk.dto.ImmunizationPatientStatus;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.AgeCalculatorMain;
@Repository
public class DoctorDeskChartDaoImpl implements DoctorDeskChartsDao{
	@Autowired
	SessionFactory sessionfactory;
	
	@Override
	public List<ImmunizationConfigurationMaster> fetchImmunizationMaster() {
		List<ImmunizationConfigurationMaster> list=new ArrayList<ImmunizationConfigurationMaster>();
		List<ImmunizationConfigurationMaster> weeks=new ArrayList<ImmunizationConfigurationMaster>();
		List<ImmunizationConfigurationMaster> month=new ArrayList<ImmunizationConfigurationMaster>();
		List<ImmunizationConfigurationMaster> year=new ArrayList<ImmunizationConfigurationMaster>();
	
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.gt("max_day", 0));
			list = criteria.list();
			
			Criteria criteria1 = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria1.add(Restrictions.eq("deleted", "N"));
			criteria1.add(Restrictions.gt("max_weeks", 0));
			weeks = criteria1.list();
			for(ImmunizationConfigurationMaster wk:weeks)
			{
				ImmunizationConfigurationMaster immunization=new ImmunizationConfigurationMaster();
				immunization.setImmunizationconfiguration_id(wk.getImmunizationconfiguration_id());
				immunization.setMandatory_flag(wk.getMandatory_flag());
				immunization.setDay(wk.getDay());
				immunization.setMax_day(wk.getMax_day());
				immunization.setWeeks(wk.getWeeks());
				immunization.setMax_weeks(wk.getMax_weeks());
				immunization.setMonths(wk.getMonths());
				immunization.setMax_months(wk.getMax_months());
				immunization.setYear(wk.getYear());
				immunization.setMax_year(wk.getMax_year());
				immunization.setVaccine(wk.getVaccine());
				immunization.setGender(wk.getGender());
				immunization.setNotes(wk.getNotes());
				list.add(immunization);
			}
			

			Criteria criteria2 = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria2.add(Restrictions.eq("deleted", "N"));
			criteria2.add(Restrictions.gt("max_months", 0));
			month = criteria2.list();
			
			for(ImmunizationConfigurationMaster wk:month)
			{
				ImmunizationConfigurationMaster immunization=new ImmunizationConfigurationMaster();
				immunization.setImmunizationconfiguration_id(wk.getImmunizationconfiguration_id());
				immunization.setMandatory_flag(wk.getMandatory_flag());
				immunization.setDay(wk.getDay());
				immunization.setMax_day(wk.getMax_day());
				immunization.setWeeks(wk.getWeeks());
				immunization.setMax_weeks(wk.getMax_weeks());
				immunization.setMonths(wk.getMonths());
				immunization.setMax_months(wk.getMax_months());
				immunization.setYear(wk.getYear());
				immunization.setMax_year(wk.getMax_year());
				immunization.setVaccine(wk.getVaccine());
				immunization.setGender(wk.getGender());
				immunization.setNotes(wk.getNotes());
				list.add(immunization);
			}
			

			Criteria criteria3 = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria3.add(Restrictions.eq("deleted", "N"));
			criteria3.add(Restrictions.gt("max_year", 0));
			year = criteria3.list();
			
			for(ImmunizationConfigurationMaster wk:year)
			{
				ImmunizationConfigurationMaster immunization=new ImmunizationConfigurationMaster();
				immunization.setImmunizationconfiguration_id(wk.getImmunizationconfiguration_id());
				immunization.setMandatory_flag(wk.getMandatory_flag());
				immunization.setDay(wk.getDay());
				immunization.setMax_day(wk.getMax_day());
				immunization.setWeeks(wk.getWeeks());
				immunization.setMax_weeks(wk.getMax_weeks());
				immunization.setMonths(wk.getMonths());
				immunization.setMax_months(wk.getMax_months());
				immunization.setYear(wk.getYear());
				immunization.setMax_year(wk.getMax_year());
				immunization.setVaccine(wk.getVaccine());
				immunization.setGender(wk.getGender());
				immunization.setNotes(wk.getNotes());
				list.add(immunization);
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}

	@Override
	public Integer saveImmunizationconPatient(String immpatient) {
		
		try {
			Session session = sessionfactory.getCurrentSession();
			ImmunizationPatientStatus chaslave = (ImmunizationPatientStatus) ConfigUIJSONUtility.getObjectFromJSON(immpatient, ImmunizationPatientStatus.class);
			for (int i = 0; i < chaslave.getList().size(); i++) {
				ImmunizationPatientStatus slave = new ImmunizationPatientStatus();
				slave = chaslave.getList().get(i);
				
				System.out.println("----------aniket ---------->>> " + slave);
				session.merge(slave);

			}
			return 1;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<ImmunizationPatientStatus> fetchMmmunizationconPatient(Integer treatmentId) {
		List<ImmunizationPatientStatus> list=new ArrayList<ImmunizationPatientStatus>();
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(ImmunizationPatientStatus.class);
			criteria.add(Restrictions.eq("treatment_id",treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			list = criteria.list();
		} catch (Exception e) {
			
		}
		return list;
	}

	@Override
	public List<ImmunizationConfigurationMaster> fetchimmunizationmasterOnDoctordesk(int patientId) {
		List<ImmunizationConfigurationMaster> list=new ArrayList<ImmunizationConfigurationMaster>();
		List<ImmunizationConfigurationMaster> weeks=new ArrayList<ImmunizationConfigurationMaster>();
		List<ImmunizationConfigurationMaster> month=new ArrayList<ImmunizationConfigurationMaster>();
		List<ImmunizationConfigurationMaster> year=new ArrayList<ImmunizationConfigurationMaster>();
		List<ImmunizationConfigurationMaster> days=new ArrayList<ImmunizationConfigurationMaster>();
	
		try {
			
			String sql = "SELECT dob FROM ehat_patient WHERE patient_id="+patientId;
			 
		     SQLQuery  q=sessionfactory.getCurrentSession().createSQLQuery(sql);
		         String dob=(String) q.uniqueResult();
		         SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
					Date dobDate = sdf.parse(dob);
			
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.gt("max_day", 0));
			list = criteria.list();
			
			  if(list.size() > 0) {
				     for(ImmunizationConfigurationMaster obj :list) {
				    	 int min = obj.getDay();
							int max = obj.getMax_day();
							
							String vaccineFromDate = AgeCalculatorMain
									.getDateFromDobByDaysWeeksMonthsYears(dobDate,
											min, 0, 0, 0);

							obj.setVaccineFromDate(vaccineFromDate);

							if (max != 0) {
								String vaccineToDate = AgeCalculatorMain
										.getDateFromDobByDaysWeeksMonthsYears(
												dobDate, max, 0, 0, 0);
								obj.setVaccineToDate(vaccineToDate);
							} else {
								obj.setVaccineToDate(vaccineFromDate);
							}
				     }
			  }
			
			Criteria criteria1 = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria1.add(Restrictions.eq("deleted", "N"));
			criteria1.add(Restrictions.gt("max_weeks", 0));
			weeks = criteria1.list();
			for(ImmunizationConfigurationMaster wk:weeks)
			{
				ImmunizationConfigurationMaster immunization=new ImmunizationConfigurationMaster();
				immunization.setImmunizationconfiguration_id(wk.getImmunizationconfiguration_id());
				immunization.setMandatory_flag(wk.getMandatory_flag());
				immunization.setDay(wk.getDay());
				immunization.setMax_day(wk.getMax_day());
				immunization.setWeeks(wk.getWeeks());
				immunization.setMax_weeks(wk.getMax_weeks());
				immunization.setMonths(wk.getMonths());
				immunization.setMax_months(wk.getMax_months());
				immunization.setYear(wk.getYear());
				immunization.setMax_year(wk.getMax_year());
				immunization.setVaccine(wk.getVaccine());
				immunization.setGender(wk.getGender());
				immunization.setNotes(wk.getNotes());
				
				int min = wk.getWeeks();
				int max = wk.getMax_weeks();
				String vaccineFromDate = AgeCalculatorMain
						.getDateFromDobByDaysWeeksMonthsYears(dobDate,
								0, min, 0, 0);
				immunization.setVaccineFromDate(vaccineFromDate);

				if (max != 0) {
					String vaccineToDate = AgeCalculatorMain
							.getDateFromDobByDaysWeeksMonthsYears(
									dobDate, 0, max, 0, 0);
					immunization.setVaccineToDate(vaccineToDate);
				} else {
					immunization.setVaccineToDate(vaccineFromDate);
				}
				list.add(immunization);
			}
			

			Criteria criteria2 = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria2.add(Restrictions.eq("deleted", "N"));
			criteria2.add(Restrictions.gt("max_months", 0));
			month = criteria2.list();
			
			for(ImmunizationConfigurationMaster wk:month)
			{
				ImmunizationConfigurationMaster immunization=new ImmunizationConfigurationMaster();
				immunization.setImmunizationconfiguration_id(wk.getImmunizationconfiguration_id());
				immunization.setMandatory_flag(wk.getMandatory_flag());
				immunization.setDay(wk.getDay());
				immunization.setMax_day(wk.getMax_day());
				immunization.setWeeks(wk.getWeeks());
				immunization.setMax_weeks(wk.getMax_weeks());
				immunization.setMonths(wk.getMonths());
				immunization.setMax_months(wk.getMax_months());
				immunization.setYear(wk.getYear());
				immunization.setMax_year(wk.getMax_year());
				immunization.setVaccine(wk.getVaccine());
				immunization.setGender(wk.getGender());
				immunization.setNotes(wk.getNotes());
				
				int min = wk.getMonths();
				int max = wk.getMax_months();
				String vaccineFromDate = AgeCalculatorMain
						.getDateFromDobByDaysWeeksMonthsYears(dobDate,
								0, 0, min, 0);
				immunization.setVaccineFromDate(vaccineFromDate);

				if (max != 0) {
					String vaccineToDate = AgeCalculatorMain
							.getDateFromDobByDaysWeeksMonthsYears(
									dobDate, 0, 0, max, 0);
					immunization.setVaccineToDate(vaccineToDate);
				} else {
					immunization.setVaccineToDate(vaccineFromDate);
				}

				
				list.add(immunization);
			}
			

			Criteria criteria3 = sessionfactory.getCurrentSession().createCriteria(ImmunizationConfigurationMaster.class);
			criteria3.add(Restrictions.eq("deleted", "N"));
			criteria3.add(Restrictions.gt("max_year", 0));
			year = criteria3.list();
			
			for(ImmunizationConfigurationMaster wk:year)
			{
				ImmunizationConfigurationMaster immunization=new ImmunizationConfigurationMaster();
				immunization.setImmunizationconfiguration_id(wk.getImmunizationconfiguration_id());
				immunization.setMandatory_flag(wk.getMandatory_flag());
				immunization.setDay(wk.getDay());
				immunization.setMax_day(wk.getMax_day());
				immunization.setWeeks(wk.getWeeks());
				immunization.setMax_weeks(wk.getMax_weeks());
				immunization.setMonths(wk.getMonths());
				immunization.setMax_months(wk.getMax_months());
				immunization.setYear(wk.getYear());
				immunization.setMax_year(wk.getMax_year());
				immunization.setVaccine(wk.getVaccine());
				immunization.setGender(wk.getGender());
				immunization.setNotes(wk.getNotes());
				
				int min = wk.getYear();
				int max = wk.getMax_year();
				
				String vaccineFromDate = AgeCalculatorMain
						.getDateFromDobByDaysWeeksMonthsYears(dobDate,
								0, 0, 0, min);
				immunization.setVaccineFromDate(vaccineFromDate);

				if (max != 0) {
					String vaccineToDate = AgeCalculatorMain
							.getDateFromDobByDaysWeeksMonthsYears(
									dobDate, 0, 0, 0, max);
					immunization.setVaccineToDate(vaccineToDate);
				} else {
					immunization.setVaccineToDate(vaccineFromDate);
				}
				
				list.add(immunization);
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
		
	}

}
