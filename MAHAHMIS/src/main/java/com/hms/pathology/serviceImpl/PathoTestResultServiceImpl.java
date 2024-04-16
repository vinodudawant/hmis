package com.hms.pathology.serviceImpl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologySampleWiseSlave;
import com.hms.pathology.service.PathoTestResultService;

@Service
@Transactional
public class PathoTestResultServiceImpl implements PathoTestResultService {
	@Autowired
	SessionFactory sessionfactory;
	@Override
	public PathologySampleWiseSlave getPathologySamplewiseSlaveDetailsForPrint(int testId, int profileId,
			int treatmentId,int masterId) { 
		
		/*	Criteria cslave = sessionfactory.getCurrentSession().createCriteria(PathologySampleWiseSlave.class);
		cslave.add(Restrictions.eq("testid", testId));
		cslave.add(Restrictions.eq("profileId", profileId));
		cslave.add(Restrictions.eq("treatmentId", treatmentId));
		cslave.add(Restrictions.eq("testflag", "N"));
		cslave.setMaxResults(1);
		PathologySampleWiseSlave pslaveObj = (PathologySampleWiseSlave) cslave.uniqueResult();
		return pslaveObj;
		*/
		
	
		/*
		Criteria cslave = sessionfactory.getCurrentSession().createCriteria(PathologySampleWiseSlave.class);
		cslave.add(Restrictions.eq("testid", testId));
		cslave.add(Restrictions.eq("profileId", profileId));
		cslave.add(Restrictions.eq("treatmentId", treatmentId));
		cslave.add(Restrictions.eq("testflag", "N"));
		PathologySampleWiseSlave pslaveObj=null;
      List<PathologySampleWiseSlave>	list	=cslave.list();
		    if(list.size() > 0) {
		    	pslaveObj =list.get(list.size()-1);
		    }
		//PathologySampleWiseSlave pslaveObj = (PathologySampleWiseSlave) cslave.uniqueResult();
		 */
		PathologySampleWiseSlave pslaveObj=null;
		 
		 String sql =" Select ifnull(flag_mark,'') as flagMark  ,test_result as testResult,expression,ifnull(test_reason,'') as testReason from pathology_sample_wise_slave where test_id="+testId+" and profile_Id="+profileId+" and treatment_id="+treatmentId+" and test_flag='N' and master_id="+masterId+" ";
		 Query querySp = sessionfactory.getCurrentSession().createSQLQuery(sql);
		  querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseSlave.class));
			@SuppressWarnings("unchecked")
			List<PathologySampleWiseSlave> lst = querySp.list();	
			if(lst.size() > 0) {
				pslaveObj=lst.get(0);
			}
			
		
		return pslaveObj;
		
	}

}
