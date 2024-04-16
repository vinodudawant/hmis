package com.hms.pathology.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.SponsorCustomTestNameDTO;
import com.hms.ehat.dto.SponsorCustomWardNameDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.service.SponsorCustomTestNameService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
@Transactional
public class SponsorCustomTestNameServiceImpl implements SponsorCustomTestNameService  {
	@Autowired
	SessionFactory sf;

	@Override
	public List<SponsorCustomTestNameDTO> getTestDetailsByServiceId(int sponsorId, int serviceId) {
		List<SponsorCustomTestNameDTO> list=new ArrayList<>();
		  try {
			  
			  Query q = sf.getCurrentSession().createSQLQuery("CALL sp_get_test_names(:p_sponsor_id,:p_service_id)");
				q.setParameter("p_sponsor_id", sponsorId);
				q.setParameter("p_service_id", serviceId);
				q.setResultTransformer(Transformers.aliasToBean(SponsorCustomTestNameDTO.class));
				list = q.list();
			  
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int saveSponsorCustomTestName(String testDeatisls) {
	      try {
	    	  SponsorCustomTestNameDTO obj = (SponsorCustomTestNameDTO) ConfigUIJSONUtility
	  				.getObjectFromJSON(testDeatisls, SponsorCustomTestNameDTO.class);	
	  		List<SponsorCustomTestNameDTO> lstTest = obj.getLstSponsorCustomTestName();
	  		
	  		for(SponsorCustomTestNameDTO tobj:lstTest) {
	  			sf.getCurrentSession().merge(tobj);
	  		}
	  		
	  		return 1;
	      }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public String getSponsorCustomTestName(int sponsorId, int serviceId, int subserviceId) {
		 String testName="";
		 int count=0;
		   try {
			   String sqlCount=" select count(*) from  sponsor_customer_testname where service_id="+serviceId+" and sub_service_id="+subserviceId+" and sponsor_id="+sponsorId+" and deleted='N' limit 1 ";
			   count=((Number) sf.getCurrentSession().createSQLQuery(sqlCount).uniqueResult()).intValue();
			    if(count > 0) {
			        String sql=" select ifnull(testname,'') as testname from  sponsor_customer_testname where service_id="+serviceId+" and sub_service_id="+subserviceId+" and sponsor_id="+sponsorId+" and deleted='N' limit 1 ";
			        testName=(String) sf.getCurrentSession().createSQLQuery(sql).uniqueResult();
			    }
		   }catch (Exception e) {
			e.printStackTrace();
		}
		 
		return testName;
	}

	@Override
	public List<SubServiceDto> getSubservicelistById(int serviceId, String searchText) {
		List<SubServiceDto> list=new ArrayList<>();
		 try {
			 Criteria c = sf.getCurrentSession().createCriteria(SubServiceDto.class);
			 c.add(Restrictions.eq("deleted", "N"));
			 c.add(Restrictions.eq("serviceId", serviceId));
			 c.add(Restrictions.like("categoryName", searchText, MatchMode.ANYWHERE));
			 list=c.list();
			 
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<SponsorCustomTestNameDTO> getTestDetailsBySubServiceId(int sponsorId, int serviceId, int subServiceID) {
		  List<SponsorCustomTestNameDTO> list=new ArrayList<>();  
		try {
			  Query q = sf.getCurrentSession().createSQLQuery("CALL sp_get_test_names_by_subservice_id(:p_sponsor_id,:p_service_id,:p_sub_service_id)");
				q.setParameter("p_sponsor_id", sponsorId);
				q.setParameter("p_service_id", serviceId);
				q.setParameter("p_sub_service_id", subServiceID);
				q.setResultTransformer(Transformers.aliasToBean(SponsorCustomTestNameDTO.class));
				list = q.list();
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@Override
	public List<SponsorCustomWardNameDTO> getWardDetailsBySponsorId(int sponsorId) {
		List<SponsorCustomWardNameDTO> list=new ArrayList<>();
		  try {
			  
			  Query q = sf.getCurrentSession().createSQLQuery("CALL sp_get_sponsor_ward_names(:p_sponsor_id)");
				q.setParameter("p_sponsor_id", sponsorId);
		
				q.setResultTransformer(Transformers.aliasToBean(SponsorCustomWardNameDTO.class));
				list = q.list();
			  
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int saveSponsorCustomWardName(String wardDeatisls) {
	      try {
	    	  SponsorCustomWardNameDTO obj = (SponsorCustomWardNameDTO) ConfigUIJSONUtility
	  				.getObjectFromJSON(wardDeatisls, SponsorCustomWardNameDTO.class);	
	  		List<SponsorCustomWardNameDTO> lstTest = obj.getLstSponsorCustomWardName();
	  		
	  		for(SponsorCustomWardNameDTO tobj:lstTest) {
	  			sf.getCurrentSession().merge(tobj);
	  		}
	  		
	  		return 1;
	      }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<ChargesMasterSlave> getWardListAutoSuggestion(String searchText) {
		List<ChargesMasterSlave> list=new ArrayList<>();
		 try {
			 Criteria c = sf.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			 c.add(Restrictions.eq("deleted", "N"));
			 c.add(Restrictions.eq("chargesMasterDto",2));
			 c.add(Restrictions.eq("isCategory","N"));
	
			 c.add(Restrictions.like("categoryName", searchText, MatchMode.ANYWHERE));
			 list=c.list();
			 
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<SponsorCustomWardNameDTO> getWardDetailsBysponsorIdandChargeId(int sponsorId, int chargeId) {
		  List<SponsorCustomWardNameDTO> list=new ArrayList<>();  
		try {
			  Query q = sf.getCurrentSession().createSQLQuery("CALL sp_get_ward_names_by_charges_master_id(:p_sponsor_id,:p_charge_id)");
				q.setParameter("p_sponsor_id", sponsorId);
				q.setParameter("p_charge_id", chargeId);
			
				q.setResultTransformer(Transformers.aliasToBean(SponsorCustomWardNameDTO.class));
				list = q.list();
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
   
   
} 
