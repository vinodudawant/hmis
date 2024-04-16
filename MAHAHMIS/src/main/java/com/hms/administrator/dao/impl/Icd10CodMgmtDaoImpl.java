package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.ICD10CodeMgmtDao;
import com.hms.administrator.dto.ICD10_L;
@Repository
public class Icd10CodMgmtDaoImpl implements ICD10CodeMgmtDao {
	static Logger log=Logger.getLogger(Icd10CodMgmtDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveICDDiagnosisLevel1(ICD10_L iobj) {
		try {
			if(iobj.getIdicd10_L()==0)
			{
			sessionFactory.getCurrentSession().merge(iobj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(iobj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("saveICDDiagnosisLevel1....."+e);
			return 0;
		}
	}

	@Override
	public List<ICD10_L> fetchICD10Level1(Integer unitId) {
		List<ICD10_L> lsticd10code=new ArrayList<ICD10_L>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ICD10_L.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		criteria.add(Restrictions.eq("icdStatus", "Y"));
		criteria.setMaxResults(30);
		lsticd10code=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("fetchICD10Level1....."+e);

		}
		
	
		return lsticd10code;
	}

	@Override
	public ICD10_L editIcd10CodeMgmt(Integer icdId) {
		ICD10_L obj=	(ICD10_L)sessionFactory.getCurrentSession().get(ICD10_L.class, icdId);
		return obj;
	}

	@Override
	public boolean deleteIcd10CodeMgmt(ICD10_L iobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(iobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			log.error("deleteIcd10CodeMgmt....."+e);
		}
		return false;
	}

	@Override
	public List<ICD10_L> icd10CodeMgmtAutoSuggestion(String icdCode,String icdFlag) {
		 String sql = "";
		 List<ICD10_L> lsticd10=new ArrayList<ICD10_L>();
		 try{			 
			 	sql = "SELECT c.idicd10_L, c.icd_code_L  FROM icd10_l  c  where c.icd_code_L like '"	+ icdCode + "%' and c.icd_flag="+Integer.parseInt(icdFlag)+" and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					ICD10_L obj = new ICD10_L();
					obj.setIdicd10_L((Integer) row.get("idicd10_L"));
					
					obj.setIcd_code_L((String) row.get("icd_code_L"));
					lsticd10.add(obj);
					obj=null;
				}
				
		 
		 }catch (Exception e) {
				e.printStackTrace();
				log.error("radiologyTestGroupAutoSuggestion....."+e);

			}
				 
		return lsticd10;
	}

	@Override
	public List<ICD10_L> getICD10ListByType(int type) {
		List<ICD10_L> list=new ArrayList<>();
		try {
		Criteria c=	sessionFactory.getCurrentSession().createCriteria(ICD10_L.class);
		c.add(Restrictions.eq("icd_Flag", type));
		c.add(Restrictions.eq("deleted", "N"));
		c.add(Restrictions.eq("icdStatus", "Y"));
		c.setMaxResults(30);
		list=c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<ICD10_L> ic10AutoSuggByType(int type, String searchText) {
		List<ICD10_L> list=new ArrayList<>();
		try {
			Criteria c=	sessionFactory.getCurrentSession().createCriteria(ICD10_L.class);
			c.add(Restrictions.eq("icd_Flag", type));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("icdStatus", "Y"));
			c.add(Restrictions.ilike("name_L", searchText, MatchMode.START));
			list=c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int deleteICD10(String id, int userId) {
		int msg=0;
		try{
			
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update icd10_l set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where idicd10_L in("+id+")");
			
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	

}
