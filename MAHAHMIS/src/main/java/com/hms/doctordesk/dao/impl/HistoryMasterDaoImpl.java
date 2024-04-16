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
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.controller.HistoryMasterController;
import com.hms.doctordesk.dao.HistoryMasterDao;
import com.hms.doctordesk.dto.ClinicalEvolutionMasterDto;
import com.hms.doctordesk.dto.DdClinicalDto;
import com.hms.doctordesk.dto.DdComplaintDto;
import com.hms.doctordesk.dto.DdHistoryDto;
import com.hms.doctordesk.dto.HistoryMaster;
import com.hms.patient.util.ConfigUIJSONUtility;



@SuppressWarnings("unused")
@Repository
public class HistoryMasterDaoImpl implements HistoryMasterDao{
	
	static Logger log=Logger.getLogger(HistoryMasterDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveHistory(HistoryMaster history, HttpServletRequest request) {
		try {
			Criteria criteria =
					  sessionFactory.getCurrentSession().createCriteria(HistoryMaster.class);
					Criterion code = Restrictions.eq("historyName",history.getHistoryName());
					Criterion name = Restrictions.eq("historyCode",history.getHistoryCode());
					LogicalExpression orExp = Restrictions.or(code,name);
					criteria.add(orExp);
					 //criteria.add(Restrictions.eq("historyName", history.getHistoryName()));
					// criteria.add(Restrictions.eq("historyCode", history.getHistoryCode()));
					  criteria.add(Restrictions.eq("deleted", "N"));
					  
				
					  
					  if(history.getHistoryId() == 0) {
							 if(criteria.uniqueResult() != null) {
								 return 3;
							 }else{
					 sessionFactory.getCurrentSession().merge(history); 
					 return 1;
							 }
					 } 
					  else {
						  HistoryMaster historyDTO = (HistoryMaster)
					  sessionFactory.getCurrentSession().get(HistoryMaster.class,
							  history.getHistoryId());
					  if(historyDTO != null) {
						  
						  historyDTO.setHistoryName(history.getHistoryName());
						  historyDTO.setHistoryCode(history.getHistoryCode());
						  historyDTO.setUpdatedBy(history.getCreatedBy());
					  sessionFactory.getCurrentSession().merge(historyDTO); 
					  } 
					  return 2; 
					  }
			/*sessionFactory.getCurrentSession().merge(history);
			return 1;*/
		}catch(Exception e){
			 log.error("Exception----> ",e);
			
		}
		return 0;
	}

	@Override
	public List<HistoryMaster> getAllHistoryMaster(HttpServletRequest request) {
		List<HistoryMaster> lstHistoryMaster=new ArrayList<HistoryMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(HistoryMaster.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			lstHistoryMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstHistoryMaster;
	}

	@Override
	public HistoryMaster editHistoryMaster(Integer historyId) {
		HistoryMaster obj=new HistoryMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(HistoryMaster.class);
			criteria.add(Restrictions.eq("historyId", historyId));
			obj=(HistoryMaster) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}

	@Override
	public boolean deleteHistoryMaster(Integer historyId, HttpServletRequest request) {
		try {
			HistoryMaster obj=	(HistoryMaster)sessionFactory.getCurrentSession().get(HistoryMaster.class, historyId);
			obj.setDeleted("Y");
			/*
			 * obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			 * obj.setDeletedBy(userId);
			 */
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}

	@Override
	public List<HistoryMaster> centerHistoryAutoSuggestion(String historyName,String historyCode) {
		String sql = "";
		 List<HistoryMaster> lstHistoryMaster=new ArrayList<HistoryMaster>();
		 try{
			 
				sql = "SELECT c.idhistory, c.history_name, c.historyCode FROM history_master c  where c.history_name like '"	+ historyName +   "%' or c.historyCode like '"	+ historyCode +   "%' and c.deleted='N' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					HistoryMaster obj = new HistoryMaster();
					obj.setHistoryName((String) row.get("history_name"));
					obj.setHistoryCode((String)row.get("historyCode"));
					obj.setHistoryId((Integer) row.get("idhistory"));
					lstHistoryMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstHistoryMaster;
	}
	@Override
	public List<HistoryMaster> centerFamilyHistoryAutoSuggestion(
			String historyName, String historyCode) {
		String sql = "";
		 List<HistoryMaster> lstHistoryMaster=new ArrayList<HistoryMaster>();
		 try{
			 
				sql = "SELECT c.idhistory, c.history_name, c.historyCode FROM history_master c  where c.history_name like '"	+ historyName +   "%' or c.historyCode like '"	+ historyCode +   "%' and c.deleted='N' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					HistoryMaster obj = new HistoryMaster();
					obj.setHistoryName((String) row.get("history_name"));
					obj.setHistoryCode((String)row.get("historyCode"));
					obj.setHistoryId((Integer) row.get("idhistory"));
					lstHistoryMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstHistoryMaster;
	}

	//DoctorDesk History
	@Override
	public int saveHistoryMaster(String historyDetails,HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			System.out.println("list"+historyDetails);
			DdHistoryDto ddHistoryDto = (DdHistoryDto)ConfigUIJSONUtility.getObjectFromJSON(historyDetails,DdHistoryDto.class);	
			//DdHistoryDto ddHistoryDto1=(DdHistoryDto)ConfigUIJSONUtility.getObjectFromJSON(familyHistoryDetails,DdHistoryDto.class);
			for(int i=0; i<ddHistoryDto.getLstddHistoryList().size(); i++)
			{
				DdHistoryDto mainObj = new DdHistoryDto();
				mainObj=ddHistoryDto.getLstddHistoryList().get(i);
				mainObj.setCreatedBy(userId);
				mainObj.setUnitId(unitId);
				mainObj.setCreatedDate(new Date(new java.util.Date().getTime()));
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DdHistoryDto.class);
				criteria.add(Restrictions.eq("familyHistory",mainObj.getFamilyHistory()));
				criteria.add(Restrictions.eq("personalHistory",mainObj.getPersonalHistory()));
				criteria.add(Restrictions.eq("treatment_id",mainObj.getTreatment_id()));
				criteria.setProjection(Projections.rowCount());
				Long count = (Long) criteria.uniqueResult();
				if(count==0){
				if(mainObj.getHis_Id()==0) {
					//System.out.println("hisid:"+ddHistoryDto.getHis_Id());
					sessionFactory.getCurrentSession().merge(mainObj);
				}else {
					//System.out.println("Update:"+ddHistoryDto.getHis_Id());
					sessionFactory.getCurrentSession().merge(mainObj);
					}
				}
			}	
			  
			/*
			 * for(int j=0; j<ddHistoryDto1.getLstFamilyHistoryMaster().size(); j++) {
			 * 
			 * DdHistoryDto mainObj1 = new DdHistoryDto();
			 * 
			 * mainObj1 = ddHistoryDto1.getLstFamilyHistoryMaster().get(j);
			 * mainObj1.setCreatedBy(userId); mainObj1.setUnitId(unitId);
			 * mainObj1.setCreatedDate(new Date(new java.util.Date().getTime()));
			 * sessionFactory.getCurrentSession().merge(mainObj1); if(mainObj1.getHis_Id()
			 * == 0) { sessionFactory.getCurrentSession().save(mainObj1); }else {
			 * sessionFactory.getCurrentSession().merge(mainObj1); } }
			 */
			return 1;
		}catch(Exception e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return 0;
	}

	@Override
	public List<DdHistoryDto> fetchHistory(int treatmentId) {
		List<DdHistoryDto> lstHistoryMaster=new ArrayList<DdHistoryDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DdHistoryDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatment_id", treatmentId));
			lstHistoryMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstHistoryMaster;
	}

	@Override
	public boolean deleteDDHistory(Integer his_Id, HttpServletRequest request) {
		try {
			DdHistoryDto obj=	(DdHistoryDto)sessionFactory.getCurrentSession().get(DdHistoryDto.class, his_Id);
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
