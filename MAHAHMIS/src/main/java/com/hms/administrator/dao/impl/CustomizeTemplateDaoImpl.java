package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.CustomizeTemplateDao;
import com.hms.administrator.dto.CustomizeTemplate;
@Repository
public class CustomizeTemplateDaoImpl implements CustomizeTemplateDao {
	static Logger log=Logger.getLogger(CustomizeTemplateDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveCustomizeTemplate(CustomizeTemplate cobj) {
		try {
			if(cobj.getIdCustomizeTemplate()==0)
			{
			sessionFactory.getCurrentSession().merge(cobj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(cobj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("saveCustomizeTemplate....."+e);
			return 0;
		}
	}

	@Override
	public List<CustomizeTemplate> getTemplateListByType(String value,Integer unitId) {
		List<CustomizeTemplate> lsticd10code=new ArrayList<CustomizeTemplate>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CustomizeTemplate.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		criteria.add(Restrictions.eq("type", value));
		lsticd10code=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("getTemplateListByType....."+e);

		}
		
	
		return lsticd10code;
	}

	@Override
	public CustomizeTemplate getTemplateListByTemplateId(Integer id) {
		CustomizeTemplate c=	(CustomizeTemplate) sessionFactory.getCurrentSession().get(CustomizeTemplate.class,id);
		return c;
	}

	@Override
	public CustomizeTemplate getTemplateListByDepartmentId(Integer departmentid) {
		CustomizeTemplate obj=new CustomizeTemplate();
		List<CustomizeTemplate> list=new ArrayList<>();
		try {
			Criteria c=   sessionFactory.getCurrentSession().createCriteria(CustomizeTemplate.class);
		//	c.add(Restrictions.eq("departmentId", departmentid));
			c.add(Restrictions.or(
				    Restrictions.eq("departmentId", departmentid),
				    Restrictions.eq("departmentId", 4)
				));
			list=c.list();
			obj.setCustomizeTemplateList(list);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	

}
