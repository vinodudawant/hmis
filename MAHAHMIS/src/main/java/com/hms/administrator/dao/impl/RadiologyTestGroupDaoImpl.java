package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.RadiologyTestGroupDao;
import com.hms.administrator.dto.Test;
@Repository
public class RadiologyTestGroupDaoImpl implements RadiologyTestGroupDao {
	static Logger log=Logger.getLogger(RadiologyTestGroupDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveOrUpdateRadiologyTestGroup(Test robj) {
		try {
			if(robj.getTest_ID()==0)
			{
			sessionFactory.getCurrentSession().merge(robj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(robj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("saveOrUpdateRadiologyTestGroup....."+e);
			return 0;
		}
	}

	@Override
	public List<Test> getAllRadiologyTestGroup(Integer unitId) {
		List<Test> lstgroup=new ArrayList<Test>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(Test.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		lstgroup=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("getAllRadiologyTestGroup....."+e);

		}
		
		
		// TODO Auto-generated method stub
		return lstgroup;
	}

	@Override
	public Test editRadiologyTestGroup(Integer groupId) {
		Test obj=	(Test)sessionFactory.getCurrentSession().get(Test.class, groupId);

		return obj;
	}

	@Override
	public boolean deleteRadiologyTestGroup(Test robj) {
		try
		{
			sessionFactory.getCurrentSession().merge(robj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			log.error("deleteRadiologyTestGroup....."+e);
		}
		return false;
	}

	@Override
	public List<Test> radiologyTestGroupAutoSuggestion(String groupName,Integer unitId) {
		 String sql = "";
		 List<Test> lstgroup=new ArrayList<Test>();
		 try{			 
			 	sql = "SELECT c.idradiologyGroup, c.radiologyGroupName  FROM radilogygroup  c  where c.radiologyGroupName like '"	+ groupName + "%' and c.unit_id="+unitId+"and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					Test obj = new Test();
					obj.setTest_ID((Integer) row.get("idradiologyGroup"));
					
					obj.settName((String) row.get("radiologyGroupName"));
					lstgroup.add(obj);
					obj=null;
				}
				
		 
		 }catch (Exception e) {
				e.printStackTrace();
				log.error("radiologyTestGroupAutoSuggestion....."+e);

			}
				 
		return lstgroup;
	}

}
