package com.hms.ehat.dao.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.PatientCareAdvicesDto;
import com.hms.dto.PatientChemoDto;
import com.hms.ehat.dao.PatientChemoDao;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.PatientChemoOrderSheetDto;


@Repository
public class PatientChemoDaoImpl implements PatientChemoDao{
	
	@Autowired
	SessionFactory sessionFactory;
	
	/**
	 * @author Pooja SUkre @date 8_March_2018 All method Implemented From Dao 
	 * **/

	@Override
	public int saveOrUpdatePatChemo(PatientChemoDto patChemoDto) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(patChemoDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PatientChemoDto> getPatientChemo(String callFrom,String Date,int pid,int tid) {
		List<PatientChemoDto> ltPatChemo = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientChemoDto.class);
			if(callFrom.equalsIgnoreCase("date")){
			criteria.add(Restrictions.eq("Status","Y"));
		//	criteria.add(Restrictions.eq("patId",pid));
			criteria.add(Restrictions.eq("treatId",tid));
			criteria.add(Restrictions.eq("chemoDt",Date));
			}else{
				String strDate = "";
                Date date = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
                strDate = sdf.format(date);
                System.err.println("sdf>>"+strDate);
                criteria.add(Restrictions.eq("Status","Y"));
                criteria.add(Restrictions.eq("treatId",tid));
                criteria.add(Restrictions.eq("chemoDt",strDate));
                //criteria.addOrder(Order.desc("pChemoId"));
			}
			ltPatChemo = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ltPatChemo;
		}
		return ltPatChemo;
	}

	@Override
	public int saveOrUpdatePatAdvice(PatientCareAdvicesDto patCareAdvDto) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(patCareAdvDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PatientCareAdvicesDto> getPatCareAdvices(int treatId) {

		List<PatientCareAdvicesDto> ltPatCareAdvice = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientCareAdvicesDto.class);
			criteria.add(Restrictions.eq("treatId",treatId));
			ltPatCareAdvice = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ltPatCareAdvice;
		}
		return ltPatCareAdvice;
	
	}

	@Override
	public ChemoTheropyMaterDto getChemoProtocol(String letter) {
		ChemoTheropyMaterDto ctm = new ChemoTheropyMaterDto();
		List<ChemoTheropyMaterDto> lstChemoProtoDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChemoTheropyMaterDto.class);
			//criteria.add(Restrictions.eq("deptId",2));
			
			///criteria.addOrder(Order.desc("ptId"));
			System.err.println("letter>>"+letter);			
			criteria.add(Restrictions.like("chemoTheropyName", "%" + letter + "%"));
			criteria.add(Restrictions.eq("status","Y"));
		 
			 lstChemoProtoDto = criteria.list();
			 
			 ctm.setLstChemoProto(lstChemoProtoDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ctm;
		}
		return ctm;
	}

	@Override
	public int saveOrderSheet(PatientChemoOrderSheetDto patientChemoOrderSheetDto) {
		int flag = 0;
		try {
			
			Session session = sessionFactory.getCurrentSession();
			int treatmentId = patientChemoOrderSheetDto.getTreatId();
			String chemoDate = patientChemoOrderSheetDto.getChemoDt();
        	String hql = "UPDATE PatientChemoOrderSheetDto set flg =:fg WHERE treatId =:tid and chemoDt =:chdt";
			org.hibernate.Query q = session.createQuery(hql);
			q.setParameter("fg","INACTIVE");  
			q.setParameter("tid", treatmentId);
			q.setParameter("chdt", chemoDate);
			q.executeUpdate();
			
			ArrayList objAry3 = new ArrayList(15);
			String s1 = patientChemoOrderSheetDto.getChemoOrders();
			String arr[] = s1.split("\n");
		
		for(int i=0;i<arr.length;i++){
			objAry3.add(arr[i]);
			}
		for(int j=0;j<objAry3.size();j++) {
			
			SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery("" +
	                   "INSERT INTO ehat_chemo_patient_order_sheet(patient_id, treatment_id, chemo_orders, start_time, stoptime, sign, notes, created_by, created_date_time, flag, chemoDate) "
				+ "VALUES ("+patientChemoOrderSheetDto.getPatId()+", "+patientChemoOrderSheetDto.getTreatId()+", '"+objAry3.get(j)+"', '00:00', '00:00', '-', '-', "+patientChemoOrderSheetDto.getCreatedBy()+", '"+patientChemoOrderSheetDto.getCreatedDate()+"', 'ACTIVE', '"+patientChemoOrderSheetDto.getChemoDt()+"')");
			insertQuery1.executeUpdate();
		
		}
			flag = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return flag = 0;
		}
		return flag;
	}

	@Override
	public List<PatientChemoOrderSheetDto> getPatientChemoOrderSheet(String callFrom, String date, Integer tid) {
		List<PatientChemoOrderSheetDto> ltChemoOrderSheetDtos = null;
		try {Criteria criteria = sessionFactory.getCurrentSession()
                .createCriteria(PatientChemoOrderSheetDto.class);
        if(callFrom.equalsIgnoreCase("dateWise")){
        criteria.add(Restrictions.eq("treatId",tid));
        criteria.add(Restrictions.eq("chemoDt",date));
        criteria.add(Restrictions.eq("flg","ACTIVE"));
        }else{
            String strDate = "";
           Date date1 = new Date();
           SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
           strDate = sdf.format(date1);
           criteria.add(Restrictions.eq("treatId",tid));
           criteria.add(Restrictions.eq("chemoDt",strDate));
           criteria.add(Restrictions.eq("flg","ACTIVE"));
        }
        ltChemoOrderSheetDtos = criteria.list();} catch (Exception e) {
			e.printStackTrace();
			return ltChemoOrderSheetDtos;
		}
		return ltChemoOrderSheetDtos;
	}

	@Override
	public int updateOrderSheet(Timestamp fromTimestamp, int userId, int tid,
			String orderString, String date, HttpServletRequest request) {
		
		ArrayList DrugList = new ArrayList(20);
		
		String[] objAry = orderString.split("@");
				
		for(int j=0;j<objAry.length;j++) {
			
				 String[] objAry3 = objAry[j].split("_");
				 SQLQuery updateQuery1 = sessionFactory.getCurrentSession().createSQLQuery("" +
		                   "UPDATE ehat_chemo_patient_order_sheet set start_time='"+objAry3[2]+"', stoptime='"+objAry3[3]+"', sign='"+objAry3[4]+"', notes='"+objAry3[5]+"', " +
		                   "updated_by="+userId+", updated_date_time='"+fromTimestamp+"' where patOrderSheet_id="+objAry3[0]+" and treatment_id="+tid+"");
				 updateQuery1.executeUpdate();
				 
		
	}
		return 0;
}

	@SuppressWarnings("unchecked")
	@Override
	public List<PatientChemoDto> getPatientChemoAll(int treatmentId,String callFrom, String date) {
		List<PatientChemoDto> ltPatChemo = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientChemoDto.class);
			if(callFrom.equalsIgnoreCase("allChemo")){
			criteria.add(Restrictions.eq("Status","Y"));
			criteria.add(Restrictions.eq("treatId",treatmentId));
			}else{
                criteria.add(Restrictions.eq("Status","Y"));
    			criteria.add(Restrictions.eq("treatId",treatmentId));
    			criteria.add(Restrictions.eq("chemoDt",date));
			}
			ltPatChemo = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ltPatChemo;
		}
		return ltPatChemo;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<PatientChemoOrderSheetDto> getOrderSheetAll(int treatmentId) {
		List<PatientChemoOrderSheetDto> ltOrderSheetChemo = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientChemoOrderSheetDto.class);
			criteria.add(Restrictions.eq("flg","ACTIVE"));
			criteria.add(Restrictions.eq("treatId",treatmentId));
			ltOrderSheetChemo = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ltOrderSheetChemo;
		}
		return ltOrderSheetChemo;
	}
}
