package com.hms.doctordesk.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.DoctorPreviousTreatmentDeatilsDao;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.ehat.dto.RegTreBillDto;
@Repository
public class DoctorPreviousTreatmentDeatilsDaoImpl implements DoctorPreviousTreatmentDeatilsDao {
	
	@Autowired
	SessionFactory sessionfactory;

	static Logger log=Logger.getLogger(DoctorPreviousTreatmentDeatilsDaoImpl.class.getName());

	@Override
	public Doctordeskopderdto previousPatientHeaderListTreatmentWise(Integer treatmentId) {
		Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
		try{
			
			String sql="SELECT   \r\n" + 
					"					    `p`.`patient_id` AS `patient_id`,  \r\n" + 
					"					    `t`.`treatment_id` AS `treatment_id`,  \r\n" + 
					"					    `t`.`opdipdno` AS `opdipdno`,  \r\n" + 
					"					    `t`.`created_date_time` AS `created_date_time` \r\n" + 
					"						FROM  \r\n" + 
					"					    ehat_patient p,  \r\n" + 
					"					    ehat_treatment t,  \r\n" + 
					"					    doctor d   \r\n" + 
					"						WHERE  \r\n" + 
					"					    `t`.`patient_id` = `p`.`patient_id`  \r\n" + 
					"					        AND (`p`.`deleted` = 'N')  \r\n" + 
					"					        AND t.treatment_id ='"+treatmentId+"'\n";
			System.out.println(sql);
			Query query=sessionfactory.getCurrentSession().createSQLQuery(sql);
			// query.setParameter(0,  treatmentId);
			Object[] obj=(Object[]) query.uniqueResult();
			regtrebilldto.setPatientId((int) obj[0]);
			regtrebilldto.setTreatmentId((int) obj[1]);
			regtrebilldto.setOpdipdno((String) obj[2]);
			//String date1= Date.((Date)obj[3]);
			//SimpleDateFormat date =new SimpleDateFormat("dd/mm/yyyy");
			regtrebilldto.setCreatedDateTime((Date) obj[3]);
			//date = 
			regtrebilldto.setDocName((String) obj[4]);
			
		}catch(Exception e){
			e.printStackTrace();
			log.error("Excetion...> ", e);
		}
		System.out.println(regtrebilldto);
		return regtrebilldto;
	}

}
