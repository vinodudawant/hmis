package com.hms.opdbill.dao.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.opdbill.dao.TestAutoSuggestionDao;
import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;

@Repository
public class TestAutoSuggestionDaoImpl implements TestAutoSuggestionDao{

	static Logger log=Logger.getLogger(TestAutoSuggestionDaoImpl.class.getName());
	static {
		System.out.println("TestAutoSuggestionDaoImpl is Loaded...!");
	}
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto) {

		log.info("In TestAutoSuggestionDaoImpl getTestAutoSuggestion()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_test_autosuggestion(:unitId,:userId,:serviceId,:deptId,:searchText)");
			querySp.setParameter("unitId", objDto.getUnitid());
			querySp.setParameter("userId", objDto.getUserId());
			if(objDto.getServiceid() > 0)
				querySp.setParameter("serviceId", objDto.getServiceid());
			else
				querySp.setParameter("serviceId", null);
			querySp.setParameter("deptId", objDto.getDept_id());
			querySp.setParameter("searchText", objDto.getCategoryName());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(TestAutoSuggestionDto.class));
			@SuppressWarnings("unchecked")
			List<TestAutoSuggestionDto> lstTestAutoSuggestionDto = querySp.list();		
			objDto.setLstService(lstTestAutoSuggestionDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public TestSponsorAutoSuggestionDto getSponsorTestAutosuggestion(TestSponsorAutoSuggestionDto objDto) {
		
		log.info("In TestAutoSuggestionDaoImpl getSponsorTestAutosuggestion()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_sponsor_services_autosuggestion(:userId,:unitId,:serviceId,:deptId,:searchText)");
			querySp.setParameter("userId", objDto.getUserid());
			querySp.setParameter("unitId", objDto.getUnitid());
			if(objDto.getServiceid() > 0)
				querySp.setParameter("serviceId", objDto.getServiceid());
			else
				querySp.setParameter("serviceId", null);
			querySp.setParameter("deptId", objDto.getDept_id());
			querySp.setParameter("searchText", objDto.getCategoryName());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(TestSponsorAutoSuggestionDto.class));
			@SuppressWarnings("unchecked")
			List<TestSponsorAutoSuggestionDto> lstTestAutoSuggestionDto = querySp.list();		
			objDto.setLstService(lstTestAutoSuggestionDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto) {
		
		log.info("In TestAutoSuggestionDaoImpl getSponsorTestCharges()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_charges_sponsor(:chargesSlaveId,:isComServId,:isComServlastId,:serviceid,:unitId)");
			querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
			querySp.setParameter("isComServId", objDto.getIsComServId());
			querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
			querySp.setParameter("serviceid", objDto.getServiceid());
			querySp.setParameter("unitId", objDto.getUnitId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(SponsorTestChargesDto.class));
			@SuppressWarnings("unchecked")
			List<SponsorTestChargesDto> lstSponsorTestChargesDto = querySp.list();		
			objDto.setLstSponsorTestChargesDto(lstSponsorTestChargesDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
	
	@Override
	public SponsorTestChargesDto getB2BTestCharges(SponsorTestChargesDto objDto) {
		
		log.info("In TestAutoSuggestionDaoImpl getSponsorTestCharges()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("select fn_get_opd_bill_b2b_charges(:chargesSlaveId,:isComServId,:isComServlastId,:serviceid,:unitId)");
			querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
			querySp.setParameter("isComServId", objDto.getIsComServId());
			querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
			querySp.setParameter("serviceid", objDto.getServiceid());
			querySp.setParameter("unitId", objDto.getUnitId());
			double b2bCharges = (Double) querySp.uniqueResult();
			objDto.setB2bCharges(b2bCharges);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}
}
