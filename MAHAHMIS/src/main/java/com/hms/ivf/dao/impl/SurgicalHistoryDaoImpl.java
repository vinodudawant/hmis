package com.hms.ivf.dao.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ivf.dao.SurgicalHistoryDao;
import com.hms.ivf.dto.SurgicalHistoryDto;




@Repository
public class SurgicalHistoryDaoImpl implements SurgicalHistoryDao{
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveSurgicalHistory(List<SurgicalHistoryDto> objDto, HttpServletRequest request) {
		
		int Result = 0;
		try {
			
			for (SurgicalHistoryDto obj : objDto) {
				
				sessionFactory.getCurrentSession().merge(obj);
				Result = 1;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		
		return Result;
		
	}

	@Override
	public List<SurgicalHistoryDto> fetchSurgicalHistoryData(int patientId, int treatmentId,String callform) {
		
		List<SurgicalHistoryDto> listSurgicalData11 = null;
		try {
				
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgicalHistoryDto.class);
			criteria.add(Restrictions.eq("patientId", patientId));
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("ivf_treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("surgicalRadioFalg", callform));
			//criteria.addOrder(org.hibernate.criterion.Order.asc("surgicalHisid");   
			listSurgicalData11 = criteria.list();
			System.out.println("listSurgicalData11listSurgicalData11"+listSurgicalData11);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listSurgicalData11;
		
	}

	@Override
	public String deleteRecordSurgicalHistoryInfo(String ovampickupslaveids, int userId) {
		
		String sql="";
		String msg="";
		
		try{
			
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update Surgical_History_Info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where surgical_his_id in("+ovampickupslaveids+")");
			
			int iii=itemInfo.executeUpdate();
			
			msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public List<SurgicalHistoryDto> getListForSurgicalHistory(String patientId) {
		
		List<SurgicalHistoryDto> list = null; 
		  
		  try { 
			  Criteria c = sessionFactory.getCurrentSession().createCriteria(SurgicalHistoryDto.class);
			 // String pid = null;
			int ivftreatmentId=Integer.parseInt(patientId);
		  c.add(Restrictions.eq("ivf_treatmentId", ivftreatmentId));
		  c.add(Restrictions.eq("deleted", "N")); 
		  list = c.list(); 
		  
		  } 
		  catch (Exception e) 
		  { 
			  e.printStackTrace(); 
			  } 
		  return list; 
		
	}

}
