package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.PresInstructionDao;
import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;

@Repository
@Transactional
public class PrescriptionInstructionDaoImpl implements PresInstructionDao{

	@Autowired
	SessionFactory sessionFactory;
	
	
	
	@Override
	public String savePreInstrutionDetals(
			PrescriptionInstructionDto prescriptionInstructionDto,HttpServletRequest request) {
		HttpSession session=request.getSession();
		int userId=(int)session.getAttribute("userId1");
		int unitId=(int)session.getAttribute("uId");
		prescriptionInstructionDto.setUnitId(unitId);
		 prescriptionInstructionDto.setDeleted("N");
		 
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
         criteria.add(Restrictions.eq("englishInstruction", prescriptionInstructionDto.getEnglishInstruction()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
        System.err.println("instruction=========="+prescriptionInstructionDto.getHindiInstruction() +"   "+prescriptionInstructionDto.getMarathiInstruction());
         
		 
		if(prescriptionInstructionDto.getId()==0){
			 if(criteria.uniqueResult() != null){
	        	 return "Instruction with this name already exist";
	         }
	        	
			prescriptionInstructionDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(prescriptionInstructionDto);
			  return "Instruction Saved SuccessFully";
		}
		else{
			prescriptionInstructionDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(prescriptionInstructionDto);
			return "Instruction Update SuccessFully";
		}
			
			  
	}



	@SuppressWarnings("unchecked")
	@Override
	public List<PrescriptionInstructionDto> getAllPreDetails(HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		 List<PrescriptionInstructionDto> list =criteria.list();
		return list;
	}



	@Override
	public List<PrescriptionInstructionDto> getAllPreDetailsById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
		criteria.add(Restrictions.eq("id", id));
		criteria.add(Restrictions.eq("deleted","N"));
		List<PrescriptionInstructionDto> list = criteria.list();
		return list;
	}



	@Override
	public List<PrescriptionInstructionDto> getAllPreDetailByName(
			String searchText,HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescriptionInstructionDto.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.ilike("englishInstruction", searchText,MatchMode.ANYWHERE));
		criteria.add(Restrictions.eq("unitId",unitId));
         List<PrescriptionInstructionDto> list = criteria.list();
		return list;
	}



	@Override
	public String saveTemplate(PresTemplateMaster presTemplateMaster,HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int userId=(int)session.getAttribute("userId1");
		int unitId=(int)session.getAttribute("uId");
		presTemplateMaster.setUnitId(unitId);
		presTemplateMaster.setDeleted("N");
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PresTemplateMaster.class);
         criteria.add(Restrictions.eq("tempLateName",presTemplateMaster.getTempLateName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
        
		
		if(presTemplateMaster.getId()==0){
			 if(criteria.uniqueResult() != null){
	        	 return "Template with this name already exist";
	         }
			presTemplateMaster.setCreatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(presTemplateMaster);
			return "Template Saved SuccessFully";
		}
		else{
			presTemplateMaster.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(presTemplateMaster);
			return "Template updated SuccessFully";
		}
		
	}



	@Override
	public List<PresTemplateMaster> getTemplateList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PresTemplateMaster.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		List<PresTemplateMaster> list = criteria.list();
		return list;
	}



	@Override
	public List<PresTemplateMaster> getInstListByTempId(int templateId) {
		// TODO Auto-generated method stub
		String hql ="from PresTemplateMaster where id = :id and deleted =:status";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id",templateId);
		query.setParameter("status", "N");
		List<PresTemplateMaster> templateList = query.list();
		List<PresTemplateMaster> listOfTemp = new ArrayList<PresTemplateMaster>();
		for(PresTemplateMaster rs : templateList){
			PresTemplateMaster obj = new PresTemplateMaster();
			obj.setId(rs.getId());
			obj.setInstructionId(rs.getInstructionId());
			obj.setTempLateName(rs.getTempLateName());
			
			String hqlForInstructions ="from PrescriptionInstructionDto where id in ("+	rs.getInstructionId() +") and deleted =:status";
			Query queryInst = sessionFactory.getCurrentSession().createQuery(hqlForInstructions);
			queryInst.setParameter("status", "N");
			List<PrescriptionInstructionDto> list = queryInst.list();
			List<PrescriptionInstructionDto> presList = new ArrayList<PrescriptionInstructionDto>();
		       for(PrescriptionInstructionDto rs1 : list){
		    	   PrescriptionInstructionDto object = new PrescriptionInstructionDto();
		    	   object.setId(rs1.getId());
		    	   object.setEnglishInstruction(rs1.getEnglishInstruction());
		    	   object.setHindiInstruction(rs1.getHindiInstruction());
		    	   object.setMarathiInstruction(rs1.getMarathiInstruction());
		    	   object.setUnicode(rs1.getUnicode());
		    	   object.setReferTo(rs1.getReferTo());
		    	   presList.add(object);
		       }
		       obj.setPrescriptionInstructionDto(presList);
		       listOfTemp.add(obj);
		}
	
			return listOfTemp;
	}



	@Override
	public String deletePrescript(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		int count = 0;
		String sqlQuery ="select count(*) from pres_template where FIND_IN_SET('"+id+"',instruction_id) and deleted='N'";
		System.out.println("exc"+sessionFactory.getCurrentSession().createSQLQuery(sqlQuery).uniqueResult());
		Query query =sessionFactory.getCurrentSession().createSQLQuery(sqlQuery);
		count = ((Number)query.uniqueResult()).intValue();
		 if(count>0){
			 return "Instruction Can't be Deleted";
		 }
		 else{
			 PrescriptionInstructionDto pres = (PrescriptionInstructionDto) sessionFactory.getCurrentSession().get(PrescriptionInstructionDto.class,id);
				pres.setDeleted("Y");
		        sessionFactory.getCurrentSession().saveOrUpdate(pres);
 
		 }
		return "Instruction Delete SuccessFully";
	}



	@Override
	public String deleteTemplate(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		PresTemplateMaster pretemp = (PresTemplateMaster) sessionFactory.getCurrentSession().get(PresTemplateMaster.class,id);
		HttpSession session=request.getSession();
		int userId=(int)session.getAttribute("userId1");
		pretemp.setDeleted("Y");
		pretemp.setDeleted_by(userId);
		sessionFactory.getCurrentSession().saveOrUpdate(pretemp);
		return "Template Delete SuccessFully";
	}



	



	
}