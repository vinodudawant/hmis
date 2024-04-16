package com.hms.administrator.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.CustomizeTemplateDao;
import com.hms.administrator.service.CustomizeTemplateService;
import com.hms.administrator.dto.CustomizeTemplate;
@Service
@Transactional
public class CustomizeTemplateServiceImpl implements CustomizeTemplateService{
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	CustomizeTemplateDao cdao;
	
	@Override
	public int saveCustomizeTemplate(CustomizeTemplate cobj,HttpServletRequest request) {
		String sql="";
		sql="SELECT count(*) from customizetemplate  r where r.deleted='N' and r.type='"+cobj.getType()+"' and r.temp_name='"+cobj.getTemp_name()+"' " ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if (cobj.getIdCustomizeTemplate() == 0){			
			
				if(count > 0){
					return 3;
				}
				else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				cobj.setCreatedBy(userId);
				cobj.setCreatedDate(new Date(new java.util.Date().getTime()));
				int response = cdao.saveCustomizeTemplate(cobj);			
				return response;
				}
		}
		else{
			
				String sql1="";
				sql1="SELECT count(*) from customizetemplate r where r.deleted='N' and r.temp_name='"+cobj.getTemp_name()+"' and r.type='"+cobj.getType()+"' and r.idCustomizeTemplate not in("+cobj.getIdCustomizeTemplate()+")";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				
				int count1 = ((Number)countQuery1.uniqueResult()).intValue();
				if(count1 >0){
					return 3;
				}else{
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					cobj.setUpdatedBy(userId);
					cobj.setUpdatedBy(userId);
					cobj.setUpdatedDate(new Date(new java.util.Date().getTime()));			
					int response = cdao.saveCustomizeTemplate(cobj);			
					return response;
			  }
		}
	}

	@Override
	public List<CustomizeTemplate> getTemplateListByType(String value,Integer unitId) {
		return cdao.getTemplateListByType(value,unitId);
	}

	@Override
	public CustomizeTemplate getTemplateListByTemplateId(Integer id) {
		return cdao.getTemplateListByTemplateId(id);
	}

	@Override
	public CustomizeTemplate getTemplateListByDepartmentId(Integer departmentid) {
		// TODO Auto-generated method stub
		return cdao.getTemplateListByDepartmentId(departmentid);
	}

}
