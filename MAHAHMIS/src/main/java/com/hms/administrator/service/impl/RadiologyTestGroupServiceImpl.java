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

import com.hms.administrator.dao.RadiologyTestGroupDao;
import com.hms.administrator.service.RadiologyTestGroupService;
import com.hms.administrator.dto.Test;
@Service
@Transactional
public class RadiologyTestGroupServiceImpl implements RadiologyTestGroupService {
	@Autowired
	RadiologyTestGroupDao  groupdao;
	@Autowired
	SessionFactory sessionFactory;
	@Override
	
	public int saveOrUpdateRadiologyTestGroup(Test robj,HttpServletRequest request) {
		String sql="";
		sql="SELECT count(*) from radilogygroup r where r.deleted='N' and r.radiologyGroupName='"+robj.getTName()+"' " ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if (robj.getId() == 0){			
			
				if(count > 0){
					return 3;
				}
				else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				robj.setCreatedBy(userId);
				robj.setTestNameStatus("Y");
				robj.setCreatedDate(new Date(new java.util.Date().getTime()));
				int response = groupdao.saveOrUpdateRadiologyTestGroup(robj);			
				return response;
				}
		}
		else{
			
				String sql1="";
				sql1="SELECT count(*) from radilogygroup r where r.deleted='N' and r.radiologyGroupName='"+robj.getTName()+"' and r.id not in("+robj.getTest_ID()+")";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				
				int count1 = ((Number)countQuery1.uniqueResult()).intValue();
				if(count1 >0){
					return 3;
				}else{
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					robj.setUpdatedBy(userId);
					robj.setUpdatedBy(userId);
					robj.setTestNameStatus("Y");
					robj.setUpdatedDate(new Date(new java.util.Date().getTime()));			
					int response = groupdao.saveOrUpdateRadiologyTestGroup(robj);			
					return response;
			  }
		}
	}

	@Override
	public List<Test> getAllRadiologyTestGroup(Integer unitId,HttpServletRequest request) {
		return groupdao.getAllRadiologyTestGroup(unitId);
	}

	@Override
	public Test editRadiologyTestGroup(Integer groupId) {
		return groupdao.editRadiologyTestGroup(groupId);
	}

	@Override
	public boolean deleteRadiologyTestGroup(Integer groupId,HttpServletRequest request) {
		Test obj=	(Test)sessionFactory.getCurrentSession().get(Test.class, groupId);
		obj.setDeleted("Y");
		obj.setTestNameStatus("N");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		return groupdao.deleteRadiologyTestGroup(obj);
	}

	@Override
	public List<Test> radiologyTestGroupAutoSuggestion(String groupName,Integer unitId) {
		return groupdao.radiologyTestGroupAutoSuggestion(groupName, unitId);
	}

}
