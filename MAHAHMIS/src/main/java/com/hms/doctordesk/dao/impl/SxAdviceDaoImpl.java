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
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.SurAdviceDao;
import com.hms.doctordesk.dto.SurgicalAdviceDto;
import com.hms.ot.dto.ProcedureMasterDetails;
import com.hms.ot.dto.ProcedureMasterDto;

@Repository
@Transactional
public class SxAdviceDaoImpl implements SurAdviceDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<ProcedureMasterDto> procedureNameAutoSuggestion(
			String searchText, String callfrom) {
		// TODO Auto-generated method stub	
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProcedureMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.ilike("procedureName", searchText, MatchMode.START));
		criteria.setMaxResults(10);
		return criteria.list();
	}

	@Override
	public String saveSxAdvice(SurgicalAdviceDto surgicalAdviceDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		surgicalAdviceDto.setUnitId(unitId);
		surgicalAdviceDto.setUserId(userId);
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgicalAdviceDto.class);
         criteria.add(Restrictions.eq("procedureName", surgicalAdviceDto.getProcedureName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("treatmentId",surgicalAdviceDto.getTreatmentId()));
		
		if(surgicalAdviceDto.getId() == 0){
			 if(criteria.uniqueResult() != null){
	        	 return "procedure with this name alredy exist";
	         }
			surgicalAdviceDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(surgicalAdviceDto);
			return "sx advice saved succesfully";
		}
		else{
			sessionFactory.getCurrentSession().merge(surgicalAdviceDto);
			surgicalAdviceDto.setUpdatedBy(userId);
			return "sx advice updated succesfully";
		}
		
	}

	@Override
	public List<SurgicalAdviceDto> getSxList(int patorTreatId,String callfrom) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgicalAdviceDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));	
		if(callfrom.equalsIgnoreCase("hometab")){
			criteria.add(Restrictions.eq("patientId",patorTreatId));
		}
		else{
			criteria.add(Restrictions.eq("treatmentId",patorTreatId));
		}
		
		return criteria.list();
	}

	@Override
	public List<SurgicalAdviceDto> getSxListById(int id) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgicalAdviceDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("id", id));
		return criteria.list();
	}

	@Override
	public String deleteSxAdvice(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		SurgicalAdviceDto object=(SurgicalAdviceDto) sessionFactory.getCurrentSession().get(SurgicalAdviceDto.class,id);
		object.setDeleted_by(userId);
		object.setDeleted("Y");
		object.setDeletedDate(new Date());
		return "sx advice deleted successfully";
	}

	@Override
	public List<ProcedureMasterDetails> getProList(int id) {
		List<ProcedureMasterDetails> list  = new ArrayList<>();
		String hql = "select pt.proName,pt.id,pg.proGrpName,pg.id from ProcedureMasterDto pm left join pm.procedureTypeMasterDto pt left join " +
				      " pm.procedureGroupMasterDto pg where pm.id=:pmid and pm.deleted=:deleted";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("pmid", id);
		query.setParameter("deleted","N");
		List<Object[]> qlist = query.list();
		for (Object[] rs : qlist) {
			ProcedureMasterDetails obj = new ProcedureMasterDetails();
			obj.setProTypeName((String)rs[0]);
			obj.setProtypeid((Integer)rs[1]);
			obj.setProgrpName((String)rs[2]);
	        obj.setProgrpid((Integer)rs[3]);
	        list.add(obj);
		}
		
		return list;
	}

	
}
