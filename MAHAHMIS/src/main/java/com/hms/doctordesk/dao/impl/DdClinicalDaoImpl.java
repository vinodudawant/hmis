package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.DdClinicalDao;
import com.hms.doctordesk.dto.DdClinicalDto;
import com.hms.doctordesk.dto.DdComplaintDto;
import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.patient.util.ConfigUIJSONUtility;
@SuppressWarnings("unchecked")
@Repository
public class DdClinicalDaoImpl implements DdClinicalDao{
	static Logger log=Logger.getLogger(DdClinicalDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveClinical(String clinicalDetails, HttpServletRequest request) {
try {
			Session session = sessionFactory.getCurrentSession();
			DdClinicalDto ddComplaintDto = (DdClinicalDto)ConfigUIJSONUtility.getObjectFromJSON(clinicalDetails,DdClinicalDto.class);	
			for(int i=0; i<ddComplaintDto.getLstDdClinicalMaster().size(); i++)
			{
				
				DdClinicalDto mainObj = new DdClinicalDto();
				mainObj=ddComplaintDto.getLstDdClinicalMaster().get(i);			
				mainObj.setCreatedDate(new Date());
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DdClinicalDto.class);
				criteria.add(Restrictions.eq("clinicalName",mainObj.getClinicalName()));
				criteria.add(Restrictions.eq("treatment_id",mainObj.getTreatment_id()));
				criteria.setProjection(Projections.rowCount());
				Long count = (Long) criteria.uniqueResult();
				if(count==0){
				if(mainObj.getClinicalId()==0)
				{
					//if(count>=0){
						//return 3;
					//}else{
					
					session.save(mainObj);
					//}
				}
				else {
					session.merge(mainObj);
					return 2;
				}
			}
				//return 3;
			}
		return 1;
		}catch(Exception e) {
			System.out.println(e);
		}
		return 0;
	}

	@Override
	public List<DdClinicalDto> fetchClinical(int treatmentId) {
		List<DdClinicalDto> lstClinicalEvolutionMaster=new ArrayList<DdClinicalDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DdClinicalDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatment_id", treatmentId));
			lstClinicalEvolutionMaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstClinicalEvolutionMaster;
	}

	@Override
	public boolean deleteDDClinical(Integer clinicalid,
			HttpServletRequest request) {
		try {
			DdClinicalDto obj=	(DdClinicalDto)sessionFactory.getCurrentSession().get(DdClinicalDto.class, clinicalid);
			obj.setDeleted("Y");
			//obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			//obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}




}
