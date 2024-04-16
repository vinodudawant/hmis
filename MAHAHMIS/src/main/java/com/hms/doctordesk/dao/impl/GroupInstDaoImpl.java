package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.SimpleExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.GroupInstDao;
import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;

@Repository
@Transactional
public class GroupInstDaoImpl implements GroupInstDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public String saveGroupInstrutionDetails(GroupInstructionMaster groupInstructionMaster,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		groupInstructionMaster.setUnitId(unitId);
		groupInstructionMaster.setDeleted("N");
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupInstructionMaster.class);
         criteria.add(Restrictions.eq("englishInstruction", groupInstructionMaster.getEnglishInstruction()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
      
		 
		
		if (groupInstructionMaster.getId() == 0) {
			   if(criteria.uniqueResult() != null){
		        	 return "Instruction with this name alredy exist";
		         }
			groupInstructionMaster.setCreatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(groupInstructionMaster);
			return "Instruction Saved SuccessFully";
		} else {
			groupInstructionMaster.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(groupInstructionMaster);
			return "Instruction Update SuccessFully";
		}

	}

	@Override
	public List<GroupInstructionMaster> getAllGroupDetails(HttpServletRequest request,String callFrom) {
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupInstructionMaster.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		//criteria.add(Restrictions.eq("referTo", "IPD"));
		criteria.add(Restrictions.eq("unitId",unitId));
		
		if(callFrom.equalsIgnoreCase("OPD"))
		{
		  Criterion c1 = Restrictions.eq("referTo", "OPD");
		  Criterion c2 = Restrictions.eq("referTo", "Both");
		  criteria.add(Restrictions.eq("deleted", "N"));
		   criteria.add(Restrictions.or(c1,c2));
			criteria.addOrder(Order.desc("id"));
		
			System.err.println("unitId....");
		}
		else if(callFrom.equalsIgnoreCase("IPD")) {
			  Criterion c1 = Restrictions.eq("referTo", "IPD");
			  Criterion c2 = Restrictions.eq("referTo", "Both");
			  criteria.add(Restrictions.eq("deleted", "N"));
			   criteria.add(Restrictions.or(c1,c2));
				criteria.addOrder(Order.desc("id"));
			
				System.err.println("unitId....");
			}
		else{
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			
			criteria.addOrder(Order.desc("id"));
			
				System.err.println("unitId....");
			}
		List<GroupInstructionMaster> list = criteria.list();
		return list;
	}

	@Override
	public List<GroupInstructionMaster> getAllGroupDetailsById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupInstructionMaster.class);
		criteria.add(Restrictions.eq("id", id));
		criteria.add(Restrictions.eq("deleted", "N"));
		List<GroupInstructionMaster> list = criteria.list();
		return list;
	}

	@Override
	public List<GroupInstructionMaster> getAllGroupDetailByName(String searchText,HttpServletRequest request) {
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupInstructionMaster.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.ilike("englishInstruction", searchText, MatchMode.ANYWHERE));
		criteria.add(Restrictions.eq("unitId",unitId));
		List<GroupInstructionMaster> list = criteria.list();
		return list;
	}

	@Override
	public String saveTemplate(GroupTemplateMaster groupTemplateMaster, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		groupTemplateMaster.setUnitId(unitId);
		groupTemplateMaster.setDeleted("N");
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupTemplateMaster.class);
         criteria.add(Restrictions.eq("tempLateName",groupTemplateMaster.getTempLateName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
        
		
		
		if (groupTemplateMaster.getId() == 0) {
			 if(criteria.uniqueResult() != null){
	        	 return "Template with this name alredy exist";
	         }
			groupTemplateMaster.setCreatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(groupTemplateMaster);
			return "Template Saved SuccessFully";
		} else {
			groupTemplateMaster.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(groupTemplateMaster);
			return "Template updated SuccessFully";
		}

	}

	@Override
	public List<GroupTemplateMaster> getTemplateList(HttpServletRequest request) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupTemplateMaster.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		criteria.add(Restrictions.eq("unitId",unitId));
		List<GroupTemplateMaster> list = criteria.list();
		
		return list;
	}

	@Override
	public List<GroupTemplateMaster> getInstListByTempId(int templateId) {
		String hql = "from GroupTemplateMaster where id = :id and deleted =:status";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("id", templateId);
		query.setParameter("status", "N");
		List<GroupTemplateMaster> templateList = query.list();
		List<GroupTemplateMaster> listOfTemp = new ArrayList<GroupTemplateMaster>();
		for (GroupTemplateMaster rs : templateList) {
			GroupTemplateMaster obj = new GroupTemplateMaster();
			obj.setId(rs.getId());
			obj.setInstructionId(rs.getInstructionId());
			obj.setTempLateName(rs.getTempLateName());

			String hqlForInstructions = "from GroupInstructionMaster where id in (" + rs.getInstructionId()
					+ ") and deleted =:status";
			Query queryInst = sessionFactory.getCurrentSession().createQuery(hqlForInstructions);
			queryInst.setParameter("status", "N");
			List<GroupInstructionMaster> list = queryInst.list();
			List<GroupInstructionMaster> groupList = new ArrayList<GroupInstructionMaster>();
			for (GroupInstructionMaster rs1 : list) {
				GroupInstructionMaster object = new GroupInstructionMaster();
				object.setId(rs1.getId());
				object.setEnglishInstruction(rs1.getEnglishInstruction());
				object.setHindiInstruction(rs1.getHindiInstruction());
				object.setMarathiInstruction(rs1.getMarathiInstruction());
				object.setUnicode(rs1.getUnicode());
				object.setReferTo(rs1.getReferTo());
				groupList.add(object);
			}
			obj.setGroupInstructionMaster(groupList);
			listOfTemp.add(obj);
		}

		return listOfTemp;
	}

	@Override
	public String deleteTemplate(int id, HttpServletRequest request) {
		GroupTemplateMaster groupemp = (GroupTemplateMaster) sessionFactory.getCurrentSession()
				.get(GroupTemplateMaster.class, id);
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		groupemp.setDeleted("Y");
		groupemp.setDeleted_by(userId);
		sessionFactory.getCurrentSession().saveOrUpdate(groupemp);
		return "Template Delete SuccessFully";
	}

	@Override
	public String deleteGroupscript(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		int count = 0;
		String sqlQuery = "select count(*) from dd_group_template where FIND_IN_SET('" + id + "',instruction_id) and deleted='N'";
		Query query = sessionFactory.getCurrentSession().createSQLQuery(sqlQuery);
		count = ((Number) query.uniqueResult()).intValue();
		if (count > 0) {
			return "Instruction Can't be Deleted";
		} else {
			GroupInstructionMaster groups = (GroupInstructionMaster) sessionFactory.getCurrentSession()
					.get(GroupInstructionMaster.class, id);
			groups.setDeleted("Y");
			sessionFactory.getCurrentSession().saveOrUpdate(groups);

		}
		return "Instruction Delete SuccessFully";
	}

	//added by vishant
	@Override
	public String saveMultipleGroupDetails(GroupInstructionMaster groupInstructionMaster2, HttpServletRequest request) {
		// TODO Auto-generated method stub
		int count=0;
	List<GroupInstructionMaster> groupinstructionmasterlist = groupInstructionMaster2.getGroupinstructionmasterlist();
	 for (GroupInstructionMaster groupInstructionMaster : groupinstructionmasterlist) {
	
	try {	 
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		groupInstructionMaster.setUnitId(unitId);
		groupInstructionMaster.setDeleted("N");
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GroupInstructionMaster.class);
         criteria.add(Restrictions.eq("englishInstruction", groupInstructionMaster.getEnglishInstruction()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("unitId",unitId));
         
      
		 
		
		if (groupInstructionMaster.getId() == 0) {
			   if(criteria.uniqueResult() != null){
				   return "Instruction with this name alredy exist";
		         }
			groupInstructionMaster.setCreatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(groupInstructionMaster);
			count=1;
			//return "Instruction Saved SuccessFully";
		} else {
			groupInstructionMaster.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().saveOrUpdate(groupInstructionMaster);
			count=2;
			//return "Instruction Update SuccessFully";
		}

	 }catch (Exception e) {
		e.printStackTrace();
	 	}
	
	}
	 if(count==1) {
			return "Instruction Saved SuccessFully";
		}
		if(count==2) {
			return "Instruction Update SuccessFully";
		}
		return null;
 }

}
