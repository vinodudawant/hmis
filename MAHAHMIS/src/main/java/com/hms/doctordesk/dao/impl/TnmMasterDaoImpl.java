package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.TnmMasterDao;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.dto.TnmGroupMaster;
import com.hms.doctordesk.dto.TnmMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
@Transactional
public class TnmMasterDaoImpl implements TnmMasterDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public String saveOnTnmMaster(String tnmMaster, HttpServletRequest request, String tabletnmNmData,
			String tabletnmMetaData) {
		// TODO Auto-generated method stub
		TnmMasterDto tnmMasterList = (TnmMasterDto) ConfigUIJSONUtility.getObjectFromJSON(tnmMaster,
				TnmMasterDto.class);

		TnmMasterDto tnmMasterNmList = (TnmMasterDto) ConfigUIJSONUtility.getObjectFromJSON(tabletnmNmData,
				TnmMasterDto.class);

		TnmMasterDto tnmMasterMetaList = (TnmMasterDto) ConfigUIJSONUtility.getObjectFromJSON(tabletnmMetaData,
				TnmMasterDto.class);

		boolean flag = false;

		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");

		if (tnmMasterMetaList.getListOfTnmMaster().size() > 0) {
			for (int i = 0; i < tnmMasterMetaList.getListOfTnmMaster().size(); i++) {
				TnmMasterDto tnmMasterDto = new TnmMasterDto();
				
				
				tnmMasterDto = tnmMasterMetaList.getListOfTnmMaster().get(i);
				if (tnmMasterDto.getId() == 0) {
					tnmMasterDto.setCreatedBy(userId);
					flag = true;
				} else {
					tnmMasterDto.setUpdatedBy(userId);
				}
				tnmMasterDto.setUnitId(unitId);
				tnmMasterDto.setDeleted("N");
				tnmMasterDto.setUserId(userId);
				tnmMasterDto.setTnmFlag("m");
				sessionFactory.getCurrentSession().merge(tnmMasterDto);
			}
		}

		if (tnmMasterList.getListOfTnmMaster().size() > 0) {
			for (int i = 0; i < tnmMasterList.getListOfTnmMaster().size(); i++) {
				TnmMasterDto tnmMasterDto = new TnmMasterDto();
				
				tnmMasterDto = tnmMasterList.getListOfTnmMaster().get(i);
				if (tnmMasterDto.getId() == 0) {
					tnmMasterDto.setCreatedBy(userId);
					flag = true;
				} else {
					tnmMasterDto.setUpdatedBy(userId);
				}
				
				tnmMasterDto.setTnmFlag("t");
				tnmMasterDto.setUnitId(unitId);
				tnmMasterDto.setDeleted("N");
				tnmMasterDto.setUserId(userId);
				sessionFactory.getCurrentSession().merge(tnmMasterDto);
			}
		}
		if (tnmMasterNmList.getListOfTnmMaster().size() > 0) {
			for (int i = 0; i < tnmMasterNmList.getListOfTnmMaster().size(); i++) {
				TnmMasterDto tnmMasterDto = new TnmMasterDto();
				
				tnmMasterDto = tnmMasterNmList.getListOfTnmMaster().get(i);
				tnmMasterDto.setUnitId(unitId);
				tnmMasterDto.setDeleted("N");
				tnmMasterDto.setUserId(userId);
				if (tnmMasterDto.getId() == 0) {
					tnmMasterDto.setCreatedBy(userId);
					flag = true;
				} else {
					tnmMasterDto.setUpdatedBy(userId);
				}
				tnmMasterDto.setTnmFlag("l");
				sessionFactory.getCurrentSession().merge(tnmMasterDto);
			}
		}
		if (flag == false) {
			return "Record updated SuccessFully";
		} else {
			return "Record saved SuccessFully";
		}

	}

	@Override
	public List<TnmMasterDto> getTnmDetails(int bodypartid,HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TnmMasterDto.class);
		criteria.add(Restrictions.eq("bodyPartId", bodypartid));
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		List<TnmMasterDto> tnmList = criteria.list();
		return tnmList;
	}

	@Override
	public String saveTnmGroupMaster(TnmGroupMaster tnmGroupMaster, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		tnmGroupMaster.setDeleted("N");
		tnmGroupMaster.setUnitId(unitId);
		tnmGroupMaster.setUserId(userId);
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TnmGroupMaster.class);
         criteria.add(Restrictions.eq("groupName", tnmGroupMaster.getGroupName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
		
		if (tnmGroupMaster.getId() == 0) {
			
			if(criteria.uniqueResult() != null){
	        	 return "TNM group already exist";
	         }
			
			tnmGroupMaster.setCreatedBy(userId);
			sessionFactory.getCurrentSession().save(tnmGroupMaster);
			return "TNM group saved successfully";
		} else {
			tnmGroupMaster.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(tnmGroupMaster);
			return "TNM group updated successfully";
		}
	}

	@Override
	public List<TnmGroupMaster> getTnmGroupList(HttpServletRequest request) {
		HttpSession session = request.getSession();
		int unitId = (int) session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TnmGroupMaster.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId",unitId));
		List<TnmGroupMaster> list = criteria.list();
		return list;

	}

	@Override
	public List<TnmGroupMaster> getTmnListById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TnmGroupMaster.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("id", id));
		List<TnmGroupMaster> list = criteria.list();
		return list;
	}

	@Override
	public String deleteTnmGroupMaster(int id) {
		// TODO Auto-generated method stub
		TnmGroupMaster tnmGroupMaster = (TnmGroupMaster) sessionFactory.getCurrentSession().get(TnmGroupMaster.class,
				id);
		tnmGroupMaster.setDeletedDate(new Date());
		tnmGroupMaster.setDeleted("Y");
		return "Groups Removed SuccessFully";
	}

	@Override
	public String getGroupNameByTnmStage(String groupStage) {
		  List<TnmGroupMaster> list=new ArrayList<>();
		  String groupName="";
		try {
			  Criteria c=   sessionFactory.getCurrentSession().createCriteria(TnmGroupMaster.class);
			  c.add(Restrictions.eq("groupStage", groupStage));
			  list= c.list();
			   if(list.size() > 0) {
				   groupName=  list.get(list.size()-1).getGroupName();
			   }
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return groupName;
	}

}