package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.OPDClinicalStagingDao;
import com.hms.doctordesk.dto.OPDClinicalStagingDTO;

import com.hms.ehat.dto.TreatmentDto;

@Repository
public class OPDClinicalStagingDaoImpl  implements OPDClinicalStagingDao{

	@Autowired
	SessionFactory sf;
	
	@Override
	public int saveOPDCinicalStaging(OPDClinicalStagingDTO obj) {
		try {
			if(obj.getClinicalStagingMasterId()==0) {
				
				String Uname = getUserName(obj.getInvestigatorId());
				obj.setInvestigatorName(Uname);
				sf.getCurrentSession().merge(obj);
				return 1;
			}else {
				sf.getCurrentSession().merge(obj);
				return 2;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<OPDClinicalStagingDTO> getOPDClinicalStagingList(Integer treatmentId, Integer unitId) {
		List<OPDClinicalStagingDTO> list=new ArrayList<OPDClinicalStagingDTO>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDClinicalStagingDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			c.add(Restrictions.eq("unitId",unitId));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public OPDClinicalStagingDTO editOPDClinicalStaging(Integer id) {
		OPDClinicalStagingDTO obj=new OPDClinicalStagingDTO();
		try {
			obj=(OPDClinicalStagingDTO) sf.openSession().get(OPDClinicalStagingDTO.class, id);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int deleteOPDClinicalStaging(String id, Integer userId) {
		int msg=0;
		try{
			
		
			
			Query itemInfo = sf	.getCurrentSession().createQuery("update OPDClinicalStagingDTO set deleted='Y',deletedBy="
					+ userId	+ ",deletedDateTime=now() where clinicalStagingMasterId in("+id+")");
			
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}
	
	
	/******
	 * @author   : Rohini Ambhore
	 * @Code     :To get InvestigatorName for OPD Cinical Staging 
	 * *****/
	public String getUserName(Integer uid) {
		String userName="";
		try {
			String sql;
			if(uid != null) {
				sql = " SELECT concat(title, ' ', f_name,' ',m_name,' ' ,l_name) FROM users where User_ID = "+uid;
			}else {
				sql = " SELECT concat(title, ' ', f_name,' ',m_name,' ' ,l_name) FROM users where User_ID = 1 ";
			}
			SQLQuery query = sf.getCurrentSession().createSQLQuery(sql);
			userName = (String) query.uniqueResult();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return userName;
	}

}
