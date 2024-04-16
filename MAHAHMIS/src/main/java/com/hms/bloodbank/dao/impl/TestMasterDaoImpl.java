package com.hms.bloodbank.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bloodbank.dao.TestMasterDao;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.bloodbank.dto.CompatibilityType;
import com.hms.bloodbank.dto.DiscardReason;
import com.hms.bloodbank.dto.PriorityMaster;
import com.hms.bloodbank.dto.RateOfTransfusion;
import com.hms.bloodbank.dto.TestMaster;

@SuppressWarnings("unchecked")
@Repository
public class TestMasterDaoImpl implements TestMasterDao {
	
	static Logger log=Logger.getLogger(TestMasterDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	Session session;

	@Override
	public int saveTest(TestMaster testMaster, HttpServletRequest request) {


		try {
			
			  Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TestMaster.class);
			  
			  		Criterion name = Restrictions.eq("testName",testMaster.getTestName());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(testMaster.getTestMasterId() == 0) {
						 
						  if(criteria.uniqueResult() != null){
							  return 3;
							  
						  } else {
								 
							  sessionFactory.getCurrentSession().merge(testMaster); 
							  return 1;
						  }
					 } 
					  else {
						  		TestMaster objeTestMaster = (TestMaster)sessionFactory.getCurrentSession()
								  .get(TestMaster.class, testMaster.getTestMasterId());
						  
							  if(objeTestMaster != null) {
								  
								  objeTestMaster.setTestName(testMaster.getTestName());
								  objeTestMaster.setUpdatedBy(testMaster.getCreatedBy());
								  sessionFactory.getCurrentSession().merge(objeTestMaster); 
							  }
							  
						return 2; 
					  }
			
		
		} catch(Exception e) {
	            log.error("Exception----> ",e);
	            System.out.println(e);
    }
    return 0;
	}

	
	@Override
	public List<TestMaster> getAllTestsMaster(HttpServletRequest request) {

		List<TestMaster> listTestMaster = new ArrayList<TestMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(TestMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("testIssueFlag","T"));
			
			listTestMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		System.err.println("----------listTestMaster size :: " + listTestMaster.size());
		return listTestMaster;
	}
	
	@Override
	public List<TestMaster> getAllIssues(HttpServletRequest request) {
		
		List<TestMaster> listTestMaster = new ArrayList<TestMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(TestMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("testIssueFlag","I"));
			
			listTestMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		System.err.println("----------listTestMaster size :: " + listTestMaster.size());
		return listTestMaster;
	}


	@Override
	public TestMaster editTestMaster(Integer testMasterId) {
		
		TestMaster obj = new TestMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(TestMaster.class);
			criteria.add(Restrictions.eq("testMasterId", testMasterId));
			obj = (TestMaster) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}


	@Override
	public boolean deleteTestMaster(Integer testMasterId, Integer userId, HttpServletRequest request) {

		try {
			TestMaster obj = (TestMaster)sessionFactory.getCurrentSession().get(TestMaster.class, testMasterId);
			obj.setStatus("N");
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
	public List<TestMaster> testMasterAutoSuggestion(String testName) {
		
		String sql = "";
		 List<TestMaster> listTestMaster = new ArrayList<TestMaster>();
		 try{
				sql = "SELECT t.id_test_master, t.test_name FROM bb_test_master t where t.test_name like '"	+ testName +   "%' and t.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					TestMaster obj = new TestMaster();
					obj.setTestName((String) row.get("test_name"));
					obj.setTestMasterId((Integer) row.get("id_test_master"));
					listTestMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return listTestMaster;
	}

	//-----END
	
	//--------DISCARD REASON CODE START----ANIKET-KANSE----23rd MAY 2021-------

	@Override
	public int saveDiscardReason(DiscardReason discardReason, HttpServletRequest request) {

		try {
			
			  Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DiscardReason.class);
			  
			  		Criterion name = Restrictions.eq("reasonName",discardReason.getReasonName());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(discardReason.getDiscardReasonId() == 0) {
						 
						  if(criteria.uniqueResult() != null){
							  return 3;
							  
						  } else {
								 
							  sessionFactory.getCurrentSession().merge(discardReason); 
							  return 1;
						  }
					 } 
					  else {
						  DiscardReason obj = (DiscardReason)sessionFactory.getCurrentSession()
								  .get(DiscardReason.class, discardReason.getDiscardReasonId());
						  
							  if(obj != null) {
								  
								  obj.setReasonName(discardReason.getReasonName());
								  obj.setUpdatedBy(discardReason.getCreatedBy());
								  sessionFactory.getCurrentSession().merge(obj); 
							  }
							  
						return 2; 
					  }
			
		
		} catch(Exception e) {
	            log.error("Exception----> ",e);
	            System.out.println(e);
	  }
	  return 0;
	}


	@Override
	public List<DiscardReason> getAllDiscardReasons(HttpServletRequest request) {

		List<DiscardReason> listDiscardReason = new ArrayList<DiscardReason>();
			try {
				HttpSession session = request.getSession();
				int unitId = (int) session.getAttribute("uId");
				Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DiscardReason.class);
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("unitId",unitId));
				
				listDiscardReason = criteria.list();
			}catch(Exception e) {
				log.error("Exception----> ",e);
			}		
		System.err.println("----------listDiscardReason size :: " + listDiscardReason.size());
		return listDiscardReason;
	}


	@Override
	public DiscardReason editDiscardReason(Integer discardReasonId) {
		
		DiscardReason obj = new DiscardReason();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DiscardReason.class);
			criteria.add(Restrictions.eq("discardReasonId", discardReasonId));
			obj = (DiscardReason) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}


	@Override
	public boolean deleteDiscardReason(Integer discardReasonId, Integer userId, HttpServletRequest request) {
		
		try {
			DiscardReason obj = (DiscardReason)sessionFactory.getCurrentSession().get(DiscardReason.class, discardReasonId);
			obj.setStatus("N");
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
	public List<DiscardReason> discardReasonAutoSugg(String reasonName) {
		


		String sql = "";
		 List<DiscardReason> listDiscardReason = new ArrayList<DiscardReason>();
		 
		 try{
				sql = "SELECT t.id_discard_reason, t.reason_name FROM bb_discard_reason_master t where t.reason_name like '"	+ reasonName +   "%' and t.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = query.list();
				
				for (Map<String, Object> row : masterRow) {
					
					DiscardReason obj = new DiscardReason();
					obj.setReasonName((String) row.get("reason_name"));
					obj.setDiscardReasonId((Integer) row.get("id_discard_reason"));
					listDiscardReason.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return listDiscardReason;
	}

	//-------------END
	
	//--------COMPATIBILITY TYPE START----ANIKET-KANSE----23rd MAY 2021-------
	
	@Override
	public int saveCompatibilityType(CompatibilityType compatibilityType, HttpServletRequest request) {

			try {
				
				  Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CompatibilityType.class);
				  
				  		Criterion name = Restrictions.eq("compatibilityType",compatibilityType.getCompatibilityType());
				  		Criterion Status = Restrictions.eq("status","Y");
				  		LogicalExpression orExp = Restrictions.and(name,Status);
				  		criteria.add(orExp);
						  
						 
						  
						  if(compatibilityType.getCompatibilityTypeId() == 0) {
							 
							  if(criteria.uniqueResult() != null){
								  return 3;
								  
							  } else {
									 
								  sessionFactory.getCurrentSession().merge(compatibilityType); 
								  return 1;
							  }
						 } 
						  else {
							  		CompatibilityType obj = (CompatibilityType)sessionFactory.getCurrentSession()
									  .get(CompatibilityType.class, compatibilityType.getCompatibilityTypeId());
							  
								  if(obj != null) {
									  
									  obj.setCompatibilityType(compatibilityType.getCompatibilityType());
									  obj.setUpdatedBy(compatibilityType.getCreatedBy());
									  sessionFactory.getCurrentSession().merge(obj); 
								  }
								  
							return 2; 
						  }
				
			
			} catch(Exception e) {
		            log.error("Exception----> ",e);
		            System.out.println(e);
	  }
	  return 0;
	}


	@Override
	public List<CompatibilityType> getAllCompatibilityType( HttpServletRequest request) {

		List<CompatibilityType> listCompatibilityType = new ArrayList<CompatibilityType>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CompatibilityType.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			listCompatibilityType = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		System.err.println("----------listTestMaster size :: " + listCompatibilityType.size());
		return listCompatibilityType;
	}


	@Override
	public CompatibilityType editCompatibilityType(Integer compatibilityTypeId) {

		CompatibilityType obj = new CompatibilityType();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CompatibilityType.class);
			criteria.add(Restrictions.eq("compatibilityTypeId", compatibilityTypeId));
			obj = (CompatibilityType) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}


	@Override
	public boolean deleteCompatibilityType(Integer compatibilityTypeId, Integer userId, HttpServletRequest request) {

		try {
			CompatibilityType obj = (CompatibilityType)sessionFactory.getCurrentSession().get(CompatibilityType.class, compatibilityTypeId);
			obj.setStatus("N");
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
	public List<CompatibilityType> compaTypeAutoSugg(String compatibilityType) {

		String sql = "";
		 List<CompatibilityType> listCompatibilityType = new ArrayList<CompatibilityType>();
		 
		 try{
				sql = "SELECT t.id_compatibility_type, t.compatibility_type FROM bb_compatibility_type_master t where t.compatibility_type like '"	+ compatibilityType +   "%' and t.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = query.list();
				
				for (Map<String, Object> row : masterRow) {
					
					CompatibilityType obj = new CompatibilityType();
					obj.setCompatibilityType((String) row.get("compatibility_type"));
					obj.setCompatibilityTypeId((Integer) row.get("id_compatibility_type"));
					listCompatibilityType.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return listCompatibilityType;
	}


	
	
	//-------------END
	
	//--------PRIORITY  START----ANIKET-KANSE----24 MAY 2021-------
	
	@Override
	public int savePriority(PriorityMaster priorityMaster, HttpServletRequest request) {
		
		try {
			
			  Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PriorityMaster.class);
			  
			  		Criterion name = Restrictions.eq("priority",priorityMaster.getPriority());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(priorityMaster.getPriorityId() == 0) {
						 
						  if(criteria.uniqueResult() != null){
							  return 3;
							  
						  } else {
								 
							  sessionFactory.getCurrentSession().merge(priorityMaster); 
							  return 1;
						  }
					 } 
					  else {
						  PriorityMaster obj = (PriorityMaster)sessionFactory.getCurrentSession()
								  .get(PriorityMaster.class, priorityMaster.getPriorityId());
						  
							  if(obj != null) {
								  
								  obj.setPriority(priorityMaster.getPriority());
								  obj.setUpdatedBy(priorityMaster.getCreatedBy());
								  sessionFactory.getCurrentSession().merge(obj); 
							  }
							  
						return 2; 
					  }
			
			} catch(Exception e) {
		            log.error("Exception----> ",e);
		            System.out.println(e);
			}
		return 0;
		}


	@Override
	public List<PriorityMaster> getAllpriority(HttpServletRequest request) {

		List<PriorityMaster> listPriorityMaster = new ArrayList<PriorityMaster>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PriorityMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			listPriorityMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		System.err.println("----------listTestMaster size :: " + listPriorityMaster.size());
		return listPriorityMaster;
	}


	@Override
	public PriorityMaster editPriority(Integer priorityId) {

		PriorityMaster obj = new PriorityMaster();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PriorityMaster.class);
			criteria.add(Restrictions.eq("priorityId", priorityId));
			obj = (PriorityMaster) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}


	@Override
	public boolean deletePriority(Integer priorityId, Integer userId, HttpServletRequest request) {

		try {
			PriorityMaster obj = (PriorityMaster)sessionFactory.getCurrentSession().get(PriorityMaster.class, priorityId);
			obj.setStatus("N");
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
	public List<PriorityMaster> priorityAutoSugg(String priority) {
		 
		String sql = "";
		 List<PriorityMaster> listPriorityMaster = new ArrayList<PriorityMaster>();
		 
		 try{
				sql = "SELECT t.id_priority, t.priority FROM bb_priority_master t where t.priority like '"	+ priority +   "%' and t.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = query.list();
				
				for (Map<String, Object> row : masterRow) {
					
					PriorityMaster obj = new PriorityMaster();
					obj.setPriority((String) row.get("priority"));
					obj.setPriorityId((Integer) row.get("id_priority"));
					listPriorityMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return listPriorityMaster;
	}

	//---------END
	//---------------Rate of transfusion below

	@Override
	public int saveTransfusion(RateOfTransfusion rateOfTransfusion, HttpServletRequest request) {

		try {
			
			  Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RateOfTransfusion.class);
			  
			  		Criterion name = Restrictions.eq("transfusion",rateOfTransfusion.getTransfusion());
			  		Criterion Status = Restrictions.eq("status","Y");
			  		LogicalExpression orExp = Restrictions.and(name,Status);
			  		criteria.add(orExp);
					  
					 
					  
					  if(rateOfTransfusion.getTransfusionId() == 0) {
						 
						  if(criteria.uniqueResult() != null){
							  return 3;
							  
						  } else {
								 
							  sessionFactory.getCurrentSession().merge(rateOfTransfusion); 
							  return 1;
						  }
					 } 
					  else {
						  RateOfTransfusion obj = (RateOfTransfusion)sessionFactory.getCurrentSession()
								  .get(RateOfTransfusion.class, rateOfTransfusion.getTransfusionId());
						  
							  if(obj != null) {
								  
								  obj.setTransfusion(rateOfTransfusion.getTransfusion());
								  obj.setUpdatedBy(rateOfTransfusion.getCreatedBy());
								  sessionFactory.getCurrentSession().merge(obj); 
							  }
							  
						return 2; 
					  }
			
			} catch(Exception e) {
		            log.error("Exception----> ",e);
		            System.out.println(e);
			}
		return 0;
	}


	@Override
	public List<RateOfTransfusion> getAllTransfusion(HttpServletRequest request) {

		List<RateOfTransfusion> listRateOfTransfusion = new ArrayList<RateOfTransfusion>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RateOfTransfusion.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			listRateOfTransfusion = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		System.err.println("----------listTestMaster size :: " + listRateOfTransfusion.size());
		return listRateOfTransfusion;
	}


	@Override
	public RateOfTransfusion editTransfusion(Integer transfusionId) {
		
		RateOfTransfusion obj = new RateOfTransfusion();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RateOfTransfusion.class);
			criteria.add(Restrictions.eq("transfusionId", transfusionId));
			obj = (RateOfTransfusion) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}


	@Override
	public boolean deleteTransfusion(Integer transfusionId, Integer userId, HttpServletRequest request) {

		try {
			RateOfTransfusion obj = (RateOfTransfusion)sessionFactory.getCurrentSession().get(RateOfTransfusion.class, transfusionId);
			obj.setStatus("N");
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
	public List<RateOfTransfusion> rateAutoSugg(String transfusion) {

		String sql = "";
		 List<RateOfTransfusion> listRateOfTransfusion = new ArrayList<RateOfTransfusion>();
		 
		 try{
				sql = "SELECT t.id_transfusion, t.transfusion FROM bb_rate_of_transfusion t where t.transfusion like '"	+ transfusion +   "%' and t.status='Y' limit 20 ";
				System.err.println("-------"+sql);
				
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = query.list();
				
				for (Map<String, Object> row : masterRow) {
					
					RateOfTransfusion obj = new RateOfTransfusion();
					obj.setTransfusion((String) row.get("transfusion"));
					obj.setTransfusionId((Integer) row.get("id_transfusion"));
					listRateOfTransfusion.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return listRateOfTransfusion;
	}


	
	
}
