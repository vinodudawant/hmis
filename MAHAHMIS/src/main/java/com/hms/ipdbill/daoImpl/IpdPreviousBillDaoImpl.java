package com.hms.ipdbill.daoImpl;

import java.util.List;


import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipdbill.dao.IpdPreviousBillDao;
import com.hms.ipdbill.dto.IpdPreviousBillDTO;

@Repository
public class IpdPreviousBillDaoImpl implements IpdPreviousBillDao{

	static Logger log = Logger.getLogger(IpdPreviousBillDaoImpl.class.getName());
	static {
		System.out.println("IpdPreviousBillDaoImpl is Loaded...!");
	}


	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation Previous Bill Patients
	================*/

	@Autowired
	SessionFactory sessionFactory;

	public List<IpdPreviousBillDTO> autoSuggestationPreviousBillPatients(Integer unitId, String callFrom,
			String findText,Integer startIndex) {

		log.info("In IpdPreviousBillDaoImpl autoSuggestationPreviousBillPatients()");
		Session s = sessionFactory.getCurrentSession();
		try {
			int maxresult = 10;
			Query prefixSp = s.createSQLQuery(
					"call sp_ipd_previous_bill_patients_auto_suggesstion_pagination(:unit_id,:patient_id,:patient_name,:mobile,:callFrom,:limitcnt,:startIndex,:maxresult)");

			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
			prefixSp.setParameter("unit_id", unitId);
			
				
			if (callFrom.equalsIgnoreCase("1")) {
				prefixSp.setParameter("patient_id", findText);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("callFrom", "search");
				prefixSp.setParameter("limitcnt", null);
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("callFrom", "search");
				prefixSp.setParameter("limitcnt", null);
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
				prefixSp.setParameter("callFrom", "search");
				prefixSp.setParameter("limitcnt", null);
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("callFrom", callFrom);
				prefixSp.setParameter("limitcnt", 100);
			}
			
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdPreviousBillDTO.class));
			
			@SuppressWarnings("unchecked")
			List<IpdPreviousBillDTO> ltIpdPreviousBillDTO = prefixSp.list();
			log.debug("Response--------> " + ltIpdPreviousBillDTO);
			return ltIpdPreviousBillDTO;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : For Previous Bill Patients count
	================*/
	@Override
	public Integer getPrevBillPatCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " SELECT COUNT(*) AS row_count" + 
					"     FROM (" + 
					"     SELECT DISTINCT" + 
					"			p.patient_id AS patient_id," + 
					"			CONCAT(p.prefix  ," + 
					"					'. '," + 
					"					p.f_name," + 
					"					' '," + 
					"					p.m_name," + 
					"					' '," + 
					"					p.l_name) AS patient_name," + 
					"			p.mobile AS mobile," + 
					"			p.adharcardNo AS adharcardNo," + 
					"			p.created_date_time AS created_date_time," + 
					"			p.deleted AS deleted," + 
					"			t.treatment_id AS treatment_id," + 
					"			t.deleted AS tdeleted," + 
					"			p.center_patient_id AS center_patient_id," + 
					"			t.t_flag AS t_flag," + 
					"			t.department_id AS department_id," + 
					"			t.unit_id AS unit_id," + 
					"			b.charges_master_slave_id AS charges_master_slave_id," + 
					"			t.opdipdno AS opdipdno," + 
					"			p.mrnno AS mrnno" + 
					"		FROM" + 
					"			((ehat_patient p" + 
					"			JOIN ehat_treatment t ON ((p.patient_id = t.patient_id)))" + 
					"			JOIN ehat_bill_master b ON ((b.patient_id = t.patient_id)))" + 
					"		WHERE" + 
					"			((p.deleted = 'N') AND (t.deleted = 'N')" + 
					"				AND (t.department_id = 2)" + 
					"				AND (t.t_flag = 'N'))" + 
					"                and (t.created_date_time >= (curdate() - interval 30 day)) group by t.patient_id order by p.patient_id desc) as result_count;" + 
					"  "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}	
}
