package com.hms.doctordesk.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.ComplaintMasterDao;
import com.hms.doctordesk.dto.ComplaintMasterDto;
import com.hms.doctordesk.dto.DdOrganMasterDTO;


@SuppressWarnings("unchecked")
@Repository
public class ComplaintMasterDaoImpl implements ComplaintMasterDao {
	
	static Logger log=Logger.getLogger(ComplaintMasterDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveComplaintMaster(ComplaintMasterDto complaint, HttpServletRequest request) {
		try {
			
			  Criteria criteria =
					  sessionFactory.getCurrentSession().createCriteria(ComplaintMasterDto.class);
			  		Criterion code = Restrictions.eq("complaintCode",complaint.getComplaintCode());
			  		Criterion name = Restrictions.eq("complaintName",complaint.getComplaintName());
			  		LogicalExpression orExp = Restrictions.or(code,name);
			  		criteria.add(orExp);
					//criteria.add(Restrictions.eq("complaintName", complaint.getComplaintName()));
					 /*criteria.add(Restrictions.eq("complaintCode", complaint.getComplaintCode()));
					  criteria.add(Restrictions.eq("deleted", "N"));*/
					  
					 
					  
					  if(complaint.getComplaintId() == 0) {
						  if(criteria.uniqueResult() != null){
							  return 3;
						  }else{
								 
					 sessionFactory.getCurrentSession().merge(complaint); 
					 return 1;
						  }
					 } 
					  else {
						  ComplaintMasterDto complaintDTO = (ComplaintMasterDto)
					  sessionFactory.getCurrentSession().get(ComplaintMasterDto.class,
							  complaint.getComplaintId());
					  if(complaintDTO != null) {
						  
						  complaintDTO.setComplaintName(complaint.getComplaintName());
						  complaintDTO.setComplaintCode(complaint.getComplaintCode());
						  complaintDTO.setUpdatedBy(complaint.getCreatedBy());
					  sessionFactory.getCurrentSession().merge(complaintDTO); 
					  } 
					  return 2; 
					  }
			/*sessionFactory.getCurrentSession().merge(complaint);
            return 1;*/
		
		} catch(Exception e) {
	            //log.error("Exception----> ",e);
	            System.out.println(e);
        }
        return 0;

}

	@Override
	public List<ComplaintMasterDto> getAllComplaintMaster(HttpServletRequest request) {
		List<ComplaintMasterDto> lstComplaintMaster=new ArrayList<ComplaintMasterDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ComplaintMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			lstComplaintMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstComplaintMaster;
}

	@Override
	public boolean deleteComplaintMaster(Integer complaintId, Integer userId) {
		try {
			ComplaintMasterDto obj=	(ComplaintMasterDto)sessionFactory.getCurrentSession().get(ComplaintMasterDto.class, complaintId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
}

	@Override
	public ComplaintMasterDto editComplaintMaster(Integer complaintId) {
		ComplaintMasterDto obj=new ComplaintMasterDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ComplaintMasterDto.class);
			criteria.add(Restrictions.eq("complaintId", complaintId));
			obj=(ComplaintMasterDto) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	
}

	@Override
	public List<ComplaintMasterDto> centerComplaintAutoSuggestion(String complaintName,String complaintCode) {
		String sql = "";
		 List<ComplaintMasterDto> lstcomplaintMaster=new ArrayList<ComplaintMasterDto>();
		 try{
				sql = "SELECT c.idcomplaint, c.complaint_name, c.complaint_code FROM complaint_master c  where c.complaint_name like '"	+ complaintName +   "%' or c.complaint_code like '"	+ complaintCode +   "%' and c.deleted='N' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ComplaintMasterDto obj = new ComplaintMasterDto();
					obj.setComplaintName((String) row.get("complaint_name"));
					obj.setComplaintCode((String)row.get("complaint_code"));
					obj.setComplaintId((Integer) row.get("idcomplaint"));
					//obj.setUnitId((Integer) row.get("unitId"));
					lstcomplaintMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstcomplaintMaster;
	}

	
}