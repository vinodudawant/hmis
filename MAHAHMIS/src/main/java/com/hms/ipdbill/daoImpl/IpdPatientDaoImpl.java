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

import com.hms.ipdbill.dao.IpdPatientDao;
import com.hms.ipdbill.dto.IpdPatientsDto;
@Repository
public class IpdPatientDaoImpl implements IpdPatientDao {

	static Logger log = Logger.getLogger(IpdPatientDaoImpl.class.getName());
	static {
		System.out.println("IpdPatientDaoImpl is Loaded...!");
	}


	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation for Ipd Patients
	================*/

	@Autowired
	SessionFactory sessionFactory;
	@Override
	public List<IpdPatientsDto> autoSuggestationIpdPatients(Integer unitId, String callFrom,
			String findText,int wardType,Integer startIndex,int wardName,String activeBlock) {

		log.info("In IpdPatientDaoImpl autoSuggestationIpdPatients()");
		Session s = sessionFactory.getCurrentSession();
		try {
			Query prefixSp = null;
			if(activeBlock.equalsIgnoreCase("ipdPhyDisc"))
			{
				 prefixSp = s.createSQLQuery(
						"call sp_ipd_physical_discharge_patient_new(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName)");

			}else {
				int maxresult = 10;
				prefixSp	= s.createSQLQuery(
						"call sp_ipd_blockwise_patient_new_pagination(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName,:startIndex,:maxresult)");
				
				if(activeBlock.equalsIgnoreCase("blockWise"))
				{
					prefixSp.setParameter("startIndex", null);
					prefixSp.setParameter("maxresult", null);
				} else {
					prefixSp.setParameter("startIndex", startIndex);
					prefixSp.setParameter("maxresult", maxresult);
				}
			}
			
			prefixSp.setParameter("unit_id", unitId);
			if(wardType > 0)
				prefixSp.setParameter("wardType", wardType);
			else
				prefixSp.setParameter("wardType", null);
			if(wardName > 0)
				prefixSp.setParameter("wardName", wardName);
			else
				prefixSp.setParameter("wardName", null);
			
			if (callFrom.equalsIgnoreCase("1")) {
				prefixSp.setParameter("patient_id", findText);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", "search");
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", "search");
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
				//prefixSp.setParameter("hallTypeId", null);
			   //prefixSp.setParameter("callFrom", "search");
				
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}else if (callFrom.equalsIgnoreCase("ipd")) { //Added By Akshata
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdPatientsDto.class));
			@SuppressWarnings("unchecked")
			List<IpdPatientsDto> ltIpdPatientsDto = prefixSp.list();
			log.debug("Response--------> " + ltIpdPatientsDto);
			return ltIpdPatientsDto;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}	
	
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation for Ipd Patients Physical Discharge
	================*/
	@Override
	public List<IpdPatientsDto> autoSuggestationPhyDischarge(Integer unit_id, String callFrom, String findText,
			Integer wardType, Integer wardName,Integer startIndex) {
		// TODO Auto-generated method stub


		log.info("In IpdPatientDaoImpl autoSuggestationPhyDischarge()");
		Session s = sessionFactory.getCurrentSession();
		try {
			int maxresult = 10;
			Query prefixSp = s.createSQLQuery(
					"call sp_ipd_physical_discharge_patient_new_pagination(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName,:startIndex,:maxresult)");
			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
			prefixSp.setParameter("unit_id", unit_id);
			if(wardType > 0)
				prefixSp.setParameter("wardType", wardType);
			else
				prefixSp.setParameter("wardType", null);
			if(wardName > 0)
				prefixSp.setParameter("wardName", wardName);
			else
				prefixSp.setParameter("wardName", null);
			
			if (callFrom.equalsIgnoreCase("1")) {
				prefixSp.setParameter("patient_id", findText);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", "search");
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", "search");
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
				//prefixSp.setParameter("hallTypeId", null);
			   //prefixSp.setParameter("callFrom", "search");
				
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdPatientsDto.class));
			@SuppressWarnings("unchecked")
			List<IpdPatientsDto> ltIpdPatientsDto = prefixSp.list();
			log.debug("Response--------> " + ltIpdPatientsDto);
			return ltIpdPatientsDto;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	
	}
	
	
	/* =============
	  Code By  : Vishant Pawar
	  Code For : a get All Record Fo Cosent Form
	================*/
	public List<IpdPatientsDto> getAllRecordForCosentForm(Integer unitId, String callFrom,
			String findText,int deptId) {

		log.info("In IpdPatientDaoImpl autoSuggestationIpdPatients()");
		Session s = sessionFactory.getCurrentSession();
		try {

			Query prefixSp = s.createSQLQuery(
					"call sp_all_blockwise_patient_new(:unit_id,:patient_id,:patient_name,:mobile,:department_id)");

			prefixSp.setParameter("unit_id", unitId);
			
			if (callFrom.equalsIgnoreCase("all")) {
				prefixSp.setParameter("patient_id", null);
				if(findText.equalsIgnoreCase("0")) {
					prefixSp.setParameter("patient_name", null);
				}
				else {
					prefixSp.setParameter("patient_name", findText);
				}
				
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("department_id", null);
				
			}
			
			else if(callFrom.equalsIgnoreCase("search")) {
				prefixSp.setParameter("patient_id", null);
				if(findText.equalsIgnoreCase("0")) {
					prefixSp.setParameter("patient_name", null);
				}
				else {
					prefixSp.setParameter("patient_name", findText);
				}
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("department_id", null);
			}
			
			else if(callFrom.equalsIgnoreCase("ipd")) {
				prefixSp.setParameter("patient_id", null);
				if(findText.equalsIgnoreCase("0")) {
					prefixSp.setParameter("patient_name", null);
				}
				else {
					prefixSp.setParameter("patient_name", findText);
				}
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("department_id", 2);
			}
			
			else if(callFrom.equalsIgnoreCase("opd")) {
				prefixSp.setParameter("patient_id", null);
				if(findText.equalsIgnoreCase("0")) {
					prefixSp.setParameter("patient_name", null);
				}
				else {
					prefixSp.setParameter("patient_name", findText);
				}
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("department_id", 1);
			}
			
			else if(callFrom.equalsIgnoreCase("diagnosis")) {
				prefixSp.setParameter("patient_id", null);
				if(findText.equalsIgnoreCase("0")) {
					prefixSp.setParameter("patient_name", null);
				}
				else {
					prefixSp.setParameter("patient_name", findText);
				}
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("department_id", 3);
			}

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdPatientsDto.class));
			@SuppressWarnings("unchecked")
			List<IpdPatientsDto> ltIpdPatientsDto = prefixSp.list();
			log.debug("Response--------> " + ltIpdPatientsDto);
			return ltIpdPatientsDto;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}	
	
	/* =============
	  Code By  : Annapurna Jamnor
	  Code For : a get TotalBed Count
	================*/
	@Override
	public Integer getTotalBedCount(Integer wardType,Integer wardName) {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {
   if(wardType==0) {
	String sql ="SELECT COUNT(*) from ehat_charges_master_slave c left join beds b on( b.Hall_ID=c.id) where c.deleted='N' and b.status = 'Y' and b.deleted='N'" ;
	SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
	result = ((Number) sqlcount.uniqueResult()).intValue();
  }
   else {
	String sql ="SELECT COUNT(*) from ehat_charges_master_slave c left join beds b on( b.Hall_ID=c.id) where c.id="+wardName+" and c.selfId="+wardType+" and c.deleted='N' and b.deleted='N' ";
	SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
	result = ((Number) sqlcount.uniqueResult()).intValue();
   }
		
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}


	@Override
	public Integer getAllActivePatCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " SELECT COUNT(*) AS row_count" + 
					" FROM (" + 
					"SELECT DISTINCT" + 
					"        c.selfId AS `ht_id`," + 
					"        (select category_name from ehat_charges_master_slave where id=c.selfId) AS `ht_name`," + 
					"        c.selfId AS `ht_ehat_ht_id`," + 
					"        c.id AS `h_id`," + 
					"        c.category_name AS `h_name`," + 
					"        c.id AS `h_ehat_h_id`," + 
					"        `b`.`Bed_ID` AS `bid`," + 
					"        `b`.`Hall_ID` AS `bed_hall_id`," + 
					"        `b`.`bed_name` AS `bname`," + 
					"        `b`.`idbedstate` AS `bstate`," + 
					"        IFNULL(`p`.`patient_id`, 0) AS `patient_id`," + 
					"        IFNULL(`tr`.`treatment_id`, 0) AS `treatment_id`," + 
					"        IFNULL(CONCAT(`p`.`prefix`," + 
					"                        ' '," + 
					"                        `p`.`f_name`," + 
					"                        ' '," + 
					"                        `p`.`m_name`," + 
					"                        ' '," + 
					"                        `p`.`l_name`)," + 
					"                '-') AS `patient_name`," + 
					"        `p`.`mrnno` AS `mrnno`," + 
					"        `p`.`mobile` AS `mobile`," + 
					"        `p`.`age` AS `age`," + 
					"        `p`.`created_date_time` AS `created_date_time`," + 
					"        IFNULL((SELECT (TO_DAYS(NOW()) - TO_DAYS(`p`.`created_date_time`)))," + 
					"                -(1)) AS `addmit_days`," + 
					"        IFNULL(`t`.`doctor_id`, 0) AS `doctor_id`," + 
					"        IFNULL(`t`.`department_id`, 0) AS `department_id`," + 
					"        `t`.`t_flag` AS `t_flag`," + 
					"        `t`.`weight` AS `weight`," + 
					"        `t`.`opdipdno` AS `opdipdno`," + 
					"        IFNULL(`t`.`unit_id`, 0) AS `unit_id`," + 
					"        IFNULL(`bm`.`source_type_id`, -(1)) AS `source_type_id`," + 
					"        IFNULL(`bm`.`charges_master_slave_id`, -(1)) AS `charges_master_slave_id`," + 
					"        ifnull((select category_name from ehat_charges_master_slave where id=bm.charges_master_slave_id),'-') AS `category_name`," + 
					"        IFNULL(`bm`.`invoice_count`, 0) AS `invoice_count`," + 
					"        IFNULL(`t`.`specialityId`, 0) AS `specialityId`," + 
					"        fn_get_multiple_doctor_name(t.doctor_id) as doctorName " + 
					"    FROM" + 
					"        treatment_beds tr" + 
					"    left join beds b on(b.Bed_ID = tr.Bed_ID and tr.status = \"Y\")   " + 
					"    left join ehat_charges_master_slave c on(c.id = b.Hall_ID)" + 
					"    left join ehat_treatment t on(t.treatment_id = tr.Treatment_ID and t.t_flag='Y')" + 
					"    left join ehat_bill_master bm on(t.treatment_id = bm.treatment_id)" + 
					"    left join ehat_patient p on(p.patient_id = t.patient_id) " + 
					"    where tr.status='Y'" + 
					"        AND`t`.`unit_id` = IFNULL(null, `t`.`unit_id`)" + 
					"        AND `p`.`patient_id` = IFNULL(null, `p`.`patient_id`)" + 
					"        AND FN_GET_PATIENT_NAME(`p`.`patient_id`) LIKE CONCAT('%',IFNULL(null,FN_GET_PATIENT_NAME(`p`.`patient_id`)),'%')" + 
					"        AND `p`.`mobile` = IFNULL(null, `p`.`mobile`)" + 
					"        AND `c`.`selfId` = IFNULL(null, `c`.`selfId`)" + 
					"        AND `c`.`id` = IFNULL(null, `c`.`id`)" + 
					"        GROUP BY CONCAT(`p`.`prefix`," + 
					"            ' '," + 
					"            `p`.`f_name`," + 
					"            ' ',\r\n" + 
					"            `p`.`m_name`," + 
					"            ' '," + 
					"            `p`.`l_name`)" + 
					"    ORDER BY `p`.`patient_id` DESC ) as result_count; "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}


	@Override
	public Integer getAllPhyDiscPatientCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " SELECT COUNT(*) AS row_count" + 
					" FROM (" + 
					" SELECT DISTINCT" + 
					"        c.selfId AS `ht_id`," + 
					"        (select category_name from ehat_charges_master_slave where id=c.selfId) AS `ht_name`," + 
					"        c.selfId AS `ht_ehat_ht_id`," + 
					"        c.id AS `h_id`," + 
					"        c.category_name AS `h_name`," + 
					"        c.id AS `h_ehat_h_id`," + 
					"        `b`.`Bed_ID` AS `bid`," + 
					"        `b`.`Hall_ID` AS `bed_hall_id`," + 
					"        `b`.`bed_name` AS `bname`," + 
					"        `b`.`idbedstate` AS `bstate`," + 
					"        IFNULL(`p`.`patient_id`, 0) AS `patient_id`," + 
					"        IFNULL(`tr`.`treatment_id`, 0) AS `treatment_id`," + 
					"        IFNULL(CONCAT(`p`.`prefix`," + 
					"                        ' '," + 
					"                        `p`.`f_name`," + 
					"                        ' '," + 
					"                        `p`.`m_name`," + 
					"                        ' '," + 
					"                        `p`.`l_name`)," + 
					"                '-') AS `patient_name`," + 
					"        `p`.`mrnno` AS `mrnno`," + 
					"        `p`.`mobile` AS `mobile`," + 
					"        `p`.`age` AS `age`," + 
					"        `p`.`created_date_time` AS `created_date_time`," + 
					"        IFNULL((SELECT (TO_DAYS(NOW()) - TO_DAYS(`p`.`created_date_time`)))," + 
					"                -(1)) AS `addmit_days`," + 
					"        IFNULL(`t`.`doctor_id`, 0) AS `doctor_id`," + 
					"        IFNULL(`t`.`department_id`, 0) AS `department_id`," + 
					"        `t`.`t_flag` AS `t_flag`," + 
					"        `t`.`weight` AS `weight`," + 
					"        `t`.`opdipdno` AS `opdipdno`," + 
					"        IFNULL(`t`.`unit_id`, 0) AS `unit_id`," + 
					"        IFNULL(`bm`.`source_type_id`, -(1)) AS `source_type_id`," + 
					"        IFNULL(`bm`.`charges_master_slave_id`, -(1)) AS `charges_master_slave_id`," + 
					"        ifnull((select category_name from ehat_charges_master_slave where id=bm.charges_master_slave_id),'-') AS `category_name`," + 
					"        IFNULL(`bm`.`invoice_count`, 0) AS `invoice_count`," + 
					"        IFNULL(`t`.`specialityId`, 0) AS `specialityId`," + 
					"		fn_get_multiple_doctor_name(t.doctor_id) as doctorName," + 
					"        t.phydis_flag as phyDisFlag" + 
					"    FROM" + 
					"		treatment_beds tr" + 
					"	left join beds b on(b.Bed_ID = tr.Bed_ID and tr.status = \"N\")    " + 
					"    left join ehat_charges_master_slave c on(c.id = b.Hall_ID)" + 
					"    left join ehat_treatment t on(t.treatment_id = tr.Treatment_ID and t.phydis_flag='Y'and t.t_flag='Y')" + 
					"    left join ehat_bill_master bm on(t.treatment_id = bm.treatment_id)" + 
					"    left join ehat_patient p on(p.patient_id = t.patient_id)  " + 
					"    where tr.status='N'" + 
					"		AND`t`.`unit_id` = IFNULL(null, `t`.`unit_id`)" + 
					"		AND `p`.`patient_id` = IFNULL(null, `p`.`patient_id`)" + 
					"		AND FN_GET_PATIENT_NAME(`p`.`patient_id`) LIKE CONCAT('%',IFNULL(null,FN_GET_PATIENT_NAME(`p`.`patient_id`)),'%')" + 
					"		AND `p`.`mobile` = IFNULL(null, `p`.`mobile`)" + 
					"        AND `c`.`selfId` = IFNULL(null, `c`.`selfId`)" + 
					"        AND `c`.`id` = IFNULL(null, `c`.`id`)" + 
					"        GROUP BY CONCAT(`p`.`prefix`," + 
					"            ' '," + 
					"            `p`.`f_name`," + 
					"            ' '," + 
					"            `p`.`m_name`," + 
					"            ' '," + 
					"            `p`.`l_name`)" + 
					"    ORDER BY `p`.`patient_id` DESC) as result_count; "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
}
