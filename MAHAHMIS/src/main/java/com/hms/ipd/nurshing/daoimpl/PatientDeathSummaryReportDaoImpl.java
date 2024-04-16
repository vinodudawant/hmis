package com.hms.ipd.nurshing.daoimpl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipd.nurshing.dao.PatientDeathSummaryReportDao;
import com.hms.ipd.nurshing.dto.PatientDeathSummaryReportDTO;

@Repository
public class PatientDeathSummaryReportDaoImpl implements PatientDeathSummaryReportDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int savePatientDeathSummary(PatientDeathSummaryReportDTO pobj, HttpServletRequest request) {
		try {
			if(pobj.getPatientDeathId()==0)
			{
				System.err.println("Inside dao");
			sessionFactory.getCurrentSession().merge(pobj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(pobj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			
			return 0;
		}
	}

	@Override
	public List<PatientDeathSummaryReportDTO> getListOfDeathSummaryReportByTreatmentId(Integer treatmentId) {
		List<PatientDeathSummaryReportDTO> lstsummary=new ArrayList<PatientDeathSummaryReportDTO>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PatientDeathSummaryReportDTO.class);
		//criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		lstsummary=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			
		}
		
	
		return lstsummary;
	}

}
