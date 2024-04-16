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
import com.hms.doctordesk.dao.DdComplaintDao;
import com.hms.doctordesk.dto.ComplaintMasterDto;
import com.hms.doctordesk.dto.DdClinicalDto;
import com.hms.doctordesk.dto.DdComplaintDto;
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.doctordesk.dto.PrescrptionMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@SuppressWarnings("unchecked")
@Repository
public class DdComplaintDaoImpl implements DdComplaintDao {
	
static Logger log=Logger.getLogger(DdComplaintDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	

	@Override
	public int saveComplaint(String complaintDetails, HttpServletRequest request) {
		try {
			Session session = sessionFactory.getCurrentSession();
			DdComplaintDto ddComplaintDto = (DdComplaintDto)ConfigUIJSONUtility.getObjectFromJSON(complaintDetails,DdComplaintDto.class);	
			for(int i=0; i<ddComplaintDto.getLstDdComplaintMaster().size(); i++)
			{
				DdComplaintDto mainObj = new DdComplaintDto();
				mainObj=ddComplaintDto.getLstDdComplaintMaster().get(i);			
				mainObj.setCreatedDate(new Date());
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DdComplaintDto.class);
				criteria.add(Restrictions.eq("complaintName",mainObj.getComplaintName()));
				criteria.add(Restrictions.eq("treatment_id",mainObj.getTreatment_id()));
				criteria.setProjection(Projections.rowCount());
				Long count = (Long) criteria.uniqueResult();
				if(count==0){
				if(mainObj.getComplaintId() == 0)
				{
					session.merge(mainObj);
				}
				else
				{
					session.merge(mainObj);
					//return 2;
				}
				
			}	
			}
			return 1;
		}catch(Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return 0;
	}


	@Override
	public List<DdComplaintDto> fetchComplaint(int treatmentId,String callfrom) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DdComplaintDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		if(callfrom.equalsIgnoreCase("hometab")){
			criteria.add(Restrictions.eq("patientId",treatmentId));
		}
		else{
			criteria.add(Restrictions.eq("treatment_id",treatmentId));
		}
		
		List<DdComplaintDto> list = criteria.list();
		for(DdComplaintDto d:list){
			
		}
		return list;
		/*criteria.add(Restrictions.eq("treatment_id", treatmentId));
		//criteria.add(Restrictions.eq("treatmentId", treatmentId));
		//System.out.println("treatment_id="+treatmentId);
		List<DdComplaintDto> list = criteria.list();
		return list;*/
	}


	@Override
	public boolean deleteComplaintMaster(Integer complaintId, Integer userId) {
		try {
			DdComplaintDto obj=	(DdComplaintDto)sessionFactory.getCurrentSession().get(DdComplaintDto.class, complaintId);
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


	/*@Override
	public List<DdComplaintDto> fetchComplaint(int treatmentId) {
		List<DdComplaintDto> lstComplaintMaster=new ArrayList<DdComplaintDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DdComplaintDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			lstComplaintMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstComplaintMaster;
	}
}*/
}