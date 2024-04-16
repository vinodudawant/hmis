package com.hms.common.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.common.dto.TmCmLookup;
import com.hms.common.dto.TmCmLookupDet;

@Repository
public class TmCmLookupRepoImpl implements TmCmLookupRepo {

	@Autowired
	SessionFactory sessionfactory;
	
	@Override
	public Integer getLookupIdByCode(String lookupCode) {
		// TODO Auto-generated method stub
		Integer lookupid = 0;
		try {
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery("select lookup_id from tm_cm_lookup where lookup_code = '"+lookupCode+"' ");
			lookupid = ((Number) query.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return lookupid;
	}

	@Override
	public List<TmCmLookupDet> getLookupDecById(Integer lookupId) {
		// TODO Auto-generated method stub
		
		List<TmCmLookupDet> list = new ArrayList<>();
		try {
			String sql = "select * from tm_cm_lookup_det where lookup_id ="+lookupId;
			SQLQuery sqlresult = sessionfactory.getCurrentSession().createSQLQuery(sql);
			sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			list = sqlresult.list();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

}
