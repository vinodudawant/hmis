package com.hms.ivf.dao.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ivf.dao.PreviousFertilityTreatmentDao;
import com.hms.ivf.dto.PreviousFertilityTreatment;

@Repository
public class PreviousFertilityTreatmentDaoImpl implements PreviousFertilityTreatmentDao {

	@Autowired
	SessionFactory sessionFactory;



	
	 /* @Override
	  public PreviousFertilityTreatment
			savePreviousFertilityTreatment(PreviousFertilityTreatment previousFertilityTreatment) {
		try {
			System.out.println("In Dao.... Before session" + previousFertilityTreatment);

			sessionFactory.getCurrentSession().saveOrUpdate(previousFertilityTreatment);
			System.out.println("In Dao...." + previousFertilityTreatment);

		} catch (Exception e) {
			e.printStackTrace();
			return previousFertilityTreatment;
		}
		// System.out.println("In Dao...."+previousFertilityTreatment);
		return previousFertilityTreatment;
	}
	 
	 
	@Override
	public PreviousFertilityTreatment getAllPreviousFertilityTreatmentList() {

		PreviousFertilityTreatment objpft = new PreviousFertilityTreatment();
		try {
			List<PreviousFertilityTreatment> ltpft = null;
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PreviousFertilityTreatment.class);
			 criteria.add(Restrictions.eq("deleted", "N")); 
			criteria.addOrder(Order.desc("previousfertlitytreatid"));
			// criteria.setMaxResults(10);
			ltpft = criteria.list();
			objpft.setLtpft(ltpft);
			;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objpft;
	}
}*/
	
	@Override
	public int saveallpreviousFertilityTreatment22(PreviousFertilityTreatment objDtoo,HttpServletRequest request) {
			
		/*
		 * GynoExamDto gynexdto=(GynoExamDto)
		 * ConfigUIJSONUtility.getObjectFromJSON(GynExamDtoDetails , GynoExamDto.class);
		 * GynoExamDto gynexdto1 = gynexdto.getListGynExam().get(0);
		 * sessionFactory.getCurrentSession().save(gynexdto1);
		 * System.out.println(".........."+gynexdto1);
		 */
		
		System.out.println("in daoimpl  ....");
		int Result = 0;
		try {
			
			System.out.println("in daoimpl  try....");
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			System.out.println("//////////"+UserId);
			int id =objDtoo.getPreviousfertlitytreatid(); 
			
			//int id =0;
			System.out.println("/////////////////////////"+id+"............");
                if(id==0){
                	System.out.println("in daoimpl  if....");
                	objDtoo.setCreatedBy(UserId);      
                	objDtoo.setCreatedDateTime(new Date(new java.util.Date().getTime()));  
                    sessionFactory.getCurrentSession().merge(objDtoo);   
                    Result=1;
                }else{
                	System.out.println("in daoimpl  else....");
                	objDtoo.setUpdatedBy(UserId);   //setUpdatedBy(UserId);
                	objDtoo.setUpdatedDateTime(new Date(new java.util.Date().getTime())); 
                    sessionFactory.getCurrentSession().merge(objDtoo) ;   //saveOrUpdate(objDto);
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		System.out.println("Result........"+Result);
	return Result;
		
	}
	
	@Override
	public PreviousFertilityTreatment getAllPrevTreatGynecologicalList() {
			
		PreviousFertilityTreatment objGyn = new PreviousFertilityTreatment();
		try {
			List<PreviousFertilityTreatment> ltGyn = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PreviousFertilityTreatment.class);
			/*criteria.add(Restrictions.eq("deleted", "N"));*/
			criteria.addOrder(Order.desc("previousfertlitytreatid"));
			//criteria.setMaxResults(10);
			ltGyn = criteria.list();
			objGyn.setLtpft(ltGyn);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objGyn;
		
	}

	
	
	@Override
	public List<PreviousFertilityTreatment> fetchGynHisPrvData(int patientId, int treatmentId) {
		List<PreviousFertilityTreatment> listGynData = null;
		try {
			  Criteria criteria=sessionFactory.getCurrentSession()
					  .createCriteria(PreviousFertilityTreatment.class);
			  criteria.add(Restrictions.eq("patientId",patientId ));
			  criteria.add(Restrictions.eq("ivf_treatmentId", treatmentId));
			  listGynData=criteria.list();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		return listGynData;
	}

	


	
	
	
}