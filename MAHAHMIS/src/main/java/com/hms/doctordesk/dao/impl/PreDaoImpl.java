
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



import com.hms.doctordesk.dao.PreMasterDao;
import com.hms.doctordesk.dto.PreMasterList;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.dto.PrescrptionMasterDto;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.pharmacy.pojo.PreparationMaster;

@Repository
@Transactional
public class PreDaoImpl implements PreMasterDao{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public  List<PreMasterList> getAutoSuggestion(String searchText,
			String callfrom) {
		// TODO Auto-generated method stub
        String hql = "select prod.productName,prod.productId,prep.preparationId,prep.preparationName"+
		             " from ProductMaster prod left join prod.preparationMaster prep where"+
        		     " prod.productName like :searchField or prep.preparationName like:searchField";
        Query query = sessionFactory.getCurrentSession().createQuery(hql);
        query.setString("searchField",searchText+"%");
        query.setMaxResults(20);
        List<PreMasterList> list = new ArrayList<PreMasterList>();
        List<Object[]> queryList = query.list();
        for (Object[] objects : queryList) {
        	PreMasterList obj = new PreMasterList();
            obj.setDrugName((String)objects[0]);
            obj.setPrepName((String)objects[3]);
            obj.setDrugId((Integer)objects[1]);
            obj.setPrepId((Integer)objects[2]);
            list.add(obj);
        }
		return list;
	}

	@Override
	public List<PreMasterList> getStrengthAndUom(int id) {
		// TODO Auto-generated method stub
		String hql = "select unit.uomName,strength.strengthName from ProductMaster prod left join" +
				     " prod.uomMaster unit left join prod.strengthMaster strength where prod.productId=:id";
		  Query query = sessionFactory.getCurrentSession().createQuery(hql);
		  query.setParameter("id",id);
		  List<PreMasterList> list = new ArrayList<PreMasterList>();
		  List<Object[]> queryList = query.list();
		  for (Object[] objects : queryList) {
			  PreMasterList obj = new PreMasterList();
			  obj.setUom((String)objects[0]);
			  obj.setStrength((String)objects[1]);
			  list.add(obj);
		  }
		return list;
	}

	@Override
	public List<RouteMaster> getRouteName(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RouteMaster.class);
		criteria.add(Restrictions.eq("deleted","N"));
		criteria.add(Restrictions.eq("preparation_id",id));
		List<RouteMaster> list = criteria.list();
		return list;
	}

	@Override
	public String savePrescription(PrescrptionMasterDto prescrptionMasterDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		prescrptionMasterDto.setUnitId(unitId);
		prescrptionMasterDto.setUserId(userId);
		// TODO Auto-generated method stub
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescrptionMasterDto.class);
         criteria.add(Restrictions.eq("drugName", prescrptionMasterDto.getDrugName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("treatmentId",prescrptionMasterDto.getTreatmentId()));
         //criteria.add(Restrictions.eq("unitId",unitId));
       
        	
         
		
		if(prescrptionMasterDto.getId()==0){
			
			  
	         if(criteria.uniqueResult() != null){
	        	 return "Drug with this name alredy exist";
	         }
			
			prescrptionMasterDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(prescrptionMasterDto);
			return "Prescription Saved SuccessFully";
		}
		else{
			prescrptionMasterDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(prescrptionMasterDto);
			return "Prescription updated SuccessFully";
		}
		
	}

	@Override
	public List<PrescrptionMasterDto> getPrescriptionById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescrptionMasterDto.class);
		criteria.add(Restrictions.eq("id",id));
		criteria.add(Restrictions.eq("deleted","N"));
		List<PrescrptionMasterDto> list = criteria.list();
		return list;
	}

	@Override
	public List<PrescrptionMasterDto> getPresList(int patOrTreatId,String callfrom) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PrescrptionMasterDto.class);
		criteria.add(Restrictions.eq("deleted","N"));
		if(callfrom.equalsIgnoreCase("hometab")){
			criteria.add(Restrictions.eq("patientId",patOrTreatId));
		}
		else{
			criteria.add(Restrictions.eq("treatmentId",patOrTreatId));
		}
		
		List<PrescrptionMasterDto> list = criteria.list();
		for(PrescrptionMasterDto p:list){
			
		}
		return list;
	}

	@Override
	public String deletePrecription(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		PrescrptionMasterDto dto = (PrescrptionMasterDto) sessionFactory.getCurrentSession().get(PrescrptionMasterDto.class,id);
		dto.setDeleted("Y");
		dto.setDeleted_by(userId);
		dto.setDeletedDate(new Date());
		return "prescription deleted successfully";
	}

}
