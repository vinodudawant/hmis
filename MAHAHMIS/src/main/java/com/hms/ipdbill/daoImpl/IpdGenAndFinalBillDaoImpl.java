package com.hms.ipdbill.daoImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipdbill.dao.IpdGenAndFinalBillDao;
import com.hms.ipdbill.dto.IpdGenFinalBillDTO;
import com.hms.ipdbill.dto.IpdPhysicalDischargedPatientsDTO;

@Repository
public class IpdGenAndFinalBillDaoImpl implements IpdGenAndFinalBillDao {

	static Logger log = Logger.getLogger(IpdGenAndFinalBillDaoImpl.class.getName());
	static {
		System.out.println("IpdGenAndFinalBillDaoImpl is Loaded...!");
	}

	/*
	 * =============Code By : Badrinath Wagh Code For : autoSuggestation For
	 * General Bill Patients ================
	 */

	@Autowired
	SessionFactory sessionFactory;

	// IPD General Patients
	public List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPatients(Integer unitId, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {

		log.info("In IpdGenAndFinalBillDaoImpl autoSuggestationGeneralBillPatients()");
		Session s = sessionFactory.getCurrentSession();
		try {
			int maxresult = 10;
			Query prefixSp = s.createSQLQuery(
					"call sp_view_ipd_bill_patients_auto_suggesstion_pagination(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName,:startIndex,:maxresult)");

			//prefixSp.setParameter("unit_id", null);
			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
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
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
			//	prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
			//	prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdGenFinalBillDTO.class));
			@SuppressWarnings("unchecked")
			List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = prefixSp.list();
			log.debug("Response--------> " + ltIpdBillPatientsDTO);
			return ltIpdBillPatientsDTO;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	//Ipd General Bill physical discharged Patients
	//Added By Badrinath Wagh
	@Override
	public List<IpdGenFinalBillDTO> autoSuggestationGeneralBillPhyDis(Integer unitId, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {

		log.info("In IpdGenAndFinalBillDaoImpl autoSuggestationGeneralBillPhyDis()");
		Session s = sessionFactory.getCurrentSession();
		try {
			int maxresult = 10;
			Query prefixSp = s.createSQLQuery(
					"call sp_ipd_general_bill_physical_discharge_pagination(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName,:startIndex,:maxresult)");

			//prefixSp.setParameter("unit_id", null);
			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
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
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
			//	prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
			//	prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdGenFinalBillDTO.class));
			@SuppressWarnings("unchecked")
			List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = prefixSp.list();
			log.debug("Response--------> " + ltIpdBillPatientsDTO);
			return ltIpdBillPatientsDTO;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/*
	 * ============= Code By : Badrinath Wagh Code For : autoSuggestation For Final
	 * Bill Patients ================
	 */
	public List<IpdGenFinalBillDTO> autoSuggestationFinalBillPatients(Integer unitId, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {

		log.info("In IpdGenAndFinalBillDaoImpl autoSuggestationFinalBillPatients()");
		Session s = sessionFactory.getCurrentSession();
		try {
			int maxresult = 10;
			Query prefixSp = s.createSQLQuery(
					"call sp_view_ipd_bill_final_patients_auto_suggesstion_pagination(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName,:startIndex,:maxresult)");

		//	prefixSp.setParameter("unit_id", null);
			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
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
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}
			
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdGenFinalBillDTO.class));
			@SuppressWarnings("unchecked")
			List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = prefixSp.list();
			log.debug("Response--------> " + ltIpdBillPatientsDTO);
			return ltIpdBillPatientsDTO;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/*
	 * ============= Code By : Badrinath Wagh Code For : autoSuggestation For Final
	 * Bill Physical Discharge Patients ================
	 */
	public List<IpdGenFinalBillDTO> autoSuggestationFinalBillPhyDisPatients(Integer unitId, String callFrom,
			String findText,int wardType,int wardName,Integer startIndex) {

		log.info("In IpdGenAndFinalBillDaoImpl autoSuggestationFinalBillPhyDisPatients()");
		Session s = sessionFactory.getCurrentSession();
		try {
			int maxresult = 10;
			Query prefixSp = s.createSQLQuery(
					"call sp_ipd_final_bill_physical_discharge_pagination(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName,:startIndex,:maxresult)");

		//	prefixSp.setParameter("unit_id", null);
			prefixSp.setParameter("startIndex", startIndex);
			prefixSp.setParameter("maxresult", maxresult);
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
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
				//prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}else if(callFrom.equalsIgnoreCase("view"))
			{
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
			}
			
			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(IpdGenFinalBillDTO.class));
			@SuppressWarnings("unchecked")
			List<IpdGenFinalBillDTO> ltIpdBillPatientsDTO = prefixSp.list();
			log.debug("Response--------> " + ltIpdBillPatientsDTO);
			return ltIpdBillPatientsDTO;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public String phyDisflagForOt(Integer treatmentId) {
		// TODO Auto-generated method stub
		String phyDisFlag = "";
		try {

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT phydis_flag FROM ehat_treatment where  treatment_id='" + treatmentId + "' and t_flag='Y'");
			phyDisFlag = (String) query1.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();

		}
		return phyDisFlag;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDActivePhyDisPat(String letter, String finalBill,
			String usertype, HttpServletRequest request) {
		List<IpdPhysicalDischargedPatientsDTO> ltIpdbillPatients = null;
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdPhysicalDischargedPatientsDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", +unitId));
			/*
			 * if(finalBill.equalsIgnoreCase("finalBill")){
			 * 
			 * criteria.add(Restrictions.eq("invoiceFlag", "Y")); }else{
			 * criteria.add(Restrictions.eq("invoiceFlag", "N")); }
			 */
			if (usertype.equalsIgnoreCase("Y")) {

				criteria.add(Restrictions.like("inCount", "%" + letter + "%"));

			} else {

				Criterion rest1 = Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest2 = Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest3 = Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4 = Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5 = Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4, rest5));
				/*
				 * criteria.add(Restrictions .sqlRestriction("patient_name LIKE '%" + letter +
				 * "%' OR pIdd LIKE '%" + letter + "%'"));
				 */
			}
			criteria.addOrder(Order.desc("pId"));
			ltIpdbillPatients = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IpdPhysicalDischargedPatientsDTO> autoIPDBillPhyDisPat(String letter, String finalBill, String usertype,
			HttpServletRequest request) {
		List<IpdPhysicalDischargedPatientsDTO> ltIpdbillPatients = null;
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdPhysicalDischargedPatientsDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", +unitId));
			if (finalBill.equalsIgnoreCase("finalBill")) {

				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			} else {
				criteria.add(Restrictions.eq("invoiceFlag", "N"));
			}
			if (usertype.equalsIgnoreCase("Y")) {

				criteria.add(Restrictions.like("inCount", "%" + letter + "%"));

			} else {

				Criterion rest1 = Restrictions.like("patientName", "%" + letter + "%");
				Criterion rest2 = Restrictions.like("pIdd", "%" + letter + "%");
				Criterion rest3 = Restrictions.like("mrnno", "%" + letter + "%");
				Criterion rest4 = Restrictions.like("mobile", "%" + letter + "%");
				Criterion rest5 = Restrictions.like("opdipdno", "%" + letter + "%");
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4, rest5));

			}
			criteria.addOrder(Order.desc("pId"));
			ltIpdbillPatients = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}
	
	 //Added By Badrinath For General Billing patient Count
	//30/11/23
	
	@Override
	public Integer getAllGenBillPatCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " SELECT COUNT(*)" + 
					"FROM (" + 
					"    " + 
					"    SELECT DISTINCT t.treatment_id" + 
					"    FROM `treatment_beds` `tb` " + 
					"    LEFT JOIN `ehat_treatment` `t` ON (`tb`.`treatment_id` = `t`.`treatment_id`)" + 
					"    LEFT JOIN `ehat_patient` `p` ON (`p`.`patient_id` = `t`.`patient_id`)" + 
					"    LEFT JOIN `ehat_bill_master` `x` ON (`t`.`treatment_id` = `x`.`treatment_id`)" + 
					"    LEFT JOIN `beds` ON (`tb`.`Bed_ID` = `beds`.`Bed_ID` AND `tb`.`status` = 'Y')" + 
					"    LEFT JOIN `ehat_charges_master_slave` `cms` ON (`cms`.`id` = `beds`.`Hall_ID`)" + 
					"    LEFT JOIN `ehat_charges_master_slave` `cs` ON (`x`.`charges_master_slave_id` = `cs`.`id`)" + 
					"    WHERE" + 
					"      (`t`.`t_flag` = 'Y')" + 
					"    AND (`p`.`deleted` = 'N')" + 
					"    AND (`t`.`department_id` = 2)                " + 
					"    AND `t`.`unit_id` = IFNULL(null, `t`.`unit_id`)" + 
					"    AND `p`.`patient_id` = IFNULL(null, `p`.`patient_id`)" + 
					"    AND FN_GET_PATIENT_NAME(`p`.`patient_id`) LIKE CONCAT('%',IFNULL(null,FN_GET_PATIENT_NAME(`p`.`patient_id`)),'%')" + 
					"    AND `p`.`mobile` = IFNULL(null, `p`.`mobile`)" + 
					"    AND `cms`.`selfId` = IFNULL(null, `cms`.`selfId`)" + 
					"    AND `cms`.`id` = IFNULL(null, `cms`.`id`)" + 
					"    AND (`x`.`invoice_flag` = 'N')" + 
					"    GROUP BY CONCAT(`p`.`prefix`, ' ', `p`.`f_name`, ' ', `p`.`m_name`, ' ', `p`.`l_name`)" + 
					") AS subquery;" + 
					"  "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}

	 //Added By Badrinath For Final Billing patient Count
		//30/11/23
		
		@Override
		public Integer getAllFinBillPatCount() {
			// TODO Auto-generated method stub
			
			Integer result = 0;
			try {

				String sql = "SELECT COUNT(*) AS row_count" + 
						" FROM (" + 
						" SELECT DISTINCT" + 
						"        `x`.`bill_id` AS `bill_id`," + 
						"        `t`.`doctor_id` AS `doctor_id`," + 
						"        `t`.`treatment_id` AS `treatment_id`," + 
						"        `t`.`department_id` AS `department_id`," + 
						"        `t`.`t_flag` AS `t_flag`," + 
						"        `t`.`weight` AS `weight`," + 
						"        `t`.`opdipdno` AS `opdipdno`," + 
						"        `t`.`unit_id` AS `unit_id`," + 
						"        `p`.`patient_id` AS `patient_id`," + 
						"        `p`.`center_patient_id` AS `center_patient_id`," + 
						"        `p`.`age` AS `age`," + 
						"        `t`.`created_date_time` AS `created_date_time`," + 
						"        `p`.`mrnno` AS `mrnno`," + 
						"        `p`.`deleted` AS `deleted`," + 
						"        `p`.`mobile` AS `mobile`," + 
						"        `x`.`invoice_flag` AS `invoice_flag`," + 
						"        `x`.`invoice_count` AS `invoice_count`," + 
						"        `x`.`charges_master_slave_id` AS `charges_master_slave_id`," + 
						"        IFNULL(`cs`.`category_name`, 'Self') AS `category_name`," + 
						"        CAST(`x`.`inv_created_date_time` AS DATE) AS `inv_created_date_time`," + 
						"        CONCAT(`p`.`prefix`," + 
						"                ' '," + 
						"                `p`.`f_name`," + 
						"                ' '," + 
						"                `p`.`m_name`," + 
						"                ' '," + 
						"                `p`.`l_name`) AS `patient_name`," + 
						"        CONCAT(IFNULL(`cms`.`category_name`, '-')," + 
						"                ' '," + 
						"                IFNULL((SELECT " + 
						"                                `cc`.`category_name`" + 
						"                            FROM" + 
						"                                `ehat_charges_master_slave` `cc`" + 
						"                            WHERE" + 
						"                                (`cc`.`id` = `cms`.`selfId`))," + 
						"                        '-')) AS `BedHall`," + 
						"        IFNULL(`cms`.`category_name`, '-') AS `hname`," + 
						"        IFNULL((SELECT " + 
						"                        `cc`.`category_name`" + 
						"                    FROM" + 
						"                        `ehat_charges_master_slave` `cc`" + 
						"                    WHERE" + 
						"                        (`cc`.`id` = `cms`.`selfId`))," + 
						"                '-') AS `hall_type_name`," + 
						"        IFNULL(`cms`.`id`, 0) AS `Hall_ID`," + 
						"        0 AS `ehat_hallid`," + 
						"        0 AS `idhall_type`," + 
						"        0 AS `ehat_halltype_id`," + 
						"        IFNULL(`beds`.`Bed_ID`, 0) AS `bed_name`," + 
						"        (SELECT (TO_DAYS(NOW()) - TO_DAYS(`p`.`created_date_time`))) AS `addmit_days`," + 
						"        `beds`.`Bed_ID` AS `bed_id`" + 
						"    FROM" + 
						"        (`treatment_beds` `tb` " + 
						"        LEFT JOIN `ehat_treatment` `t` ON (`tb`.`treatment_id` = `t`.`treatment_id`)" + 
						"        LEFT JOIN `ehat_patient` `p` ON (`p`.`patient_id` = `t`.`patient_id`)" + 
						"        LEFT JOIN `ehat_bill_master` `x` ON (`t`.`treatment_id` = `x`.`treatment_id`)" + 
						"        LEFT JOIN `beds` ON (`tb`.`Bed_ID` = `beds`.`Bed_ID` AND `tb`.`status` = 'Y')" + 
						"		LEFT JOIN `ehat_charges_master_slave` `cms` ON (`cms`.`id` = `beds`.`Hall_ID`)" + 
						"		LEFT JOIN `ehat_charges_master_slave` `cs` ON (`x`.`charges_master_slave_id` = `cs`.`id`))" + 
						"    WHERE" + 
						"        (`t`.`t_flag` = 'Y')" + 
						"		AND (`p`.`deleted` = 'N')" + 
						"		AND (`t`.`department_id` = 2)            	" + 
						"		AND `t`.`unit_id` = IFNULL(null, `t`.`unit_id`)" + 
						"		AND `p`.`patient_id` = IFNULL(null, `p`.`patient_id`)" + 
						"		AND FN_GET_PATIENT_NAME(`p`.`patient_id`) LIKE CONCAT('%',IFNULL(null,FN_GET_PATIENT_NAME(`p`.`patient_id`)),'%')" + 
						"		AND `p`.`mobile` = IFNULL(null, `p`.`mobile`)" + 
						"        AND `cms`.`selfId` = IFNULL(null, `cms`.`selfId`)" + 
						"		AND `cms`.`id` = IFNULL(null, `cms`.`id`)" + 
						"        AND (`x`.`invoice_flag` = 'Y')" + 
						"    GROUP BY `p`.`patient_id`" + 
						"    ORDER BY `t`.`treatment_id`DESC) as result_count;" + 
						"  "
						;
				SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
				result = ((Number) sqlcount.uniqueResult()).intValue();
				
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			return result;
		}

		@Override
		public Integer getAllGenPhyDisBillPatCount() {
			// TODO Auto-generated method stub
			
			Integer result = 0;
			try {

				String sql = " SELECT  COUNT(*) AS row_count" + 
						" From (" + 
						" SELECT DISTINCT" + 
						"        `x`.`bill_id` AS `bill_id`," + 
						"        `t`.`doctor_id` AS `doctor_id`," + 
						"        `t`.`treatment_id` AS `treatment_id`," + 
						"        `t`.`department_id` AS `department_id`," + 
						"        `t`.`t_flag` AS `t_flag`," + 
						"        `t`.`weight` AS `weight`," + 
						"        `t`.`opdipdno` AS `opdipdno`," + 
						"        `t`.`unit_id` AS `unit_id`," + 
						"        `p`.`patient_id` AS `patient_id`," + 
						"        `p`.`center_patient_id` AS `center_patient_id`," + 
						"        `p`.`age` AS `age`," + 
						"        `t`.`created_date_time` AS `created_date_time`," + 
						"        `p`.`mrnno` AS `mrnno`," + 
						"        `p`.`deleted` AS `deleted`," + 
						"        `p`.`mobile` AS `mobile`," + 
						"        `x`.`invoice_flag` AS `invoice_flag`," + 
						"        `x`.`invoice_count` AS `invoice_count`," + 
						"        `x`.`charges_master_slave_id` AS `charges_master_slave_id`," + 
						"        IFNULL(`cs`.`category_name`, 'Self') AS `category_name`," + 
						"        CAST(`x`.`inv_created_date_time` AS DATE) AS `inv_created_date_time`," + 
						"        CONCAT(`p`.`prefix`," + 
						"                ' '," + 
						"                `p`.`f_name`," + 
						"                ' '," + 
						"                `p`.`m_name`," + 
						"                ' '," + 
						"                `p`.`l_name`) AS `patient_name`," + 
						"        CONCAT(IFNULL(`cms`.`category_name`, '-')," + 
						"                ' '," + 
						"                IFNULL((SELECT " + 
						"                                `cc`.`category_name`" + 
						"                            FROM" + 
						"                                `ehat_charges_master_slave` `cc`" + 
						"                            WHERE" + 
						"                                (`cc`.`id` = `cms`.`selfId`))," + 
						"                        '-')) AS `BedHall`," + 
						"        IFNULL(`cms`.`category_name`, '-') AS `hname`," + 
						"        IFNULL((SELECT " + 
						"                        `cc`.`category_name`" + 
						"                    FROM" + 
						"                        `ehat_charges_master_slave` `cc`" + 
						"                    WHERE" + 
						"                        (`cc`.`id` = `cms`.`selfId`))," + 
						"                '-') AS `hall_type_name`," + 
						"        IFNULL(`cms`.`id`, 0) AS `Hall_ID`," + 
						"        0 AS `ehat_hallid`," + 
						"        0 AS `idhall_type`," + 
						"        0 AS `ehat_halltype_id`," + 
						"        IFNULL(`beds`.`Bed_ID`, 0) AS `bed_name`," + 
						"        (SELECT (TO_DAYS(NOW()) - TO_DAYS(`p`.`created_date_time`))) AS `addmit_days`," + 
						"        `beds`.`Bed_ID` AS `bed_id`," + 
						"        t.phydis_flag as phyDisFlag" + 
						"    FROM" + 
						"        `treatment_beds` `tb` " + 
						"        LEFT JOIN `ehat_treatment` `t` ON (`tb`.`treatment_id` = `t`.`treatment_id` and t.phydis_flag='Y')" + 
						"        LEFT JOIN `ehat_patient` `p` ON (`p`.`patient_id` = `t`.`patient_id`)" + 
						"        LEFT JOIN `ehat_bill_master` `x` ON (`t`.`treatment_id` = `x`.`treatment_id`)" + 
						"        LEFT JOIN `beds` ON (`beds`.`Bed_ID` = (select Bed_ID from treatment_beds where Treatment_ID = t.treatment_id and status = \"N\" order by ID desc limit 1))" + 
						"		LEFT JOIN `ehat_charges_master_slave` `cms` ON (`cms`.`id` = `beds`.`Hall_ID`)" + 
						"		LEFT JOIN `ehat_charges_master_slave` `cs` ON (`x`.`charges_master_slave_id` = `cs`.`id`)" + 
						"    WHERE" + 
						"        (`t`.`t_flag` = 'Y')" + 
						"		AND (`p`.`deleted` = 'N')" + 
						"		AND (`t`.`department_id` = 2)           " + 
						"		AND `t`.`unit_id` = IFNULL(null, `t`.`unit_id`)" + 
						"		AND `p`.`patient_id` = IFNULL(null, `p`.`patient_id`)" + 
						"		AND FN_GET_PATIENT_NAME(`p`.`patient_id`) LIKE CONCAT('%',IFNULL(null,FN_GET_PATIENT_NAME(`p`.`patient_id`)),'%')" + 
						"		AND `p`.`mobile` = IFNULL(null, `p`.`mobile`)" + 
						"        AND `cms`.`selfId` = IFNULL(null, `cms`.`selfId`)" + 
						"		AND `cms`.`id` = IFNULL(null, `cms`.`id`)" + 
						"        AND (`x`.`invoice_flag` = 'N')" + 
						"    GROUP BY `p`.`patient_id`" + 
						"    ORDER BY `t`.`treatment_id` DESC) as result_count;" + 
						"" + 
						"  "
						;
				SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
				result = ((Number) sqlcount.uniqueResult()).intValue();
				
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			return result;
		}

		@Override
		public Integer getAllFinBillPhyDisPatCount() {
			// TODO Auto-generated method stub
			
			Integer result = 0;
			try {

				String sql = "  SELECT  COUNT(*) AS row_count" + 
						" From (" + 
						" SELECT DISTINCT" + 
						"        `x`.`bill_id` AS `bill_id`," + 
						"        `t`.`doctor_id` AS `doctor_id`," + 
						"        `t`.`treatment_id` AS `treatment_id`," + 
						"        `t`.`department_id` AS `department_id`," + 
						"        `t`.`t_flag` AS `t_flag`," + 
						"        `t`.`weight` AS `weight`," + 
						"        `t`.`opdipdno` AS `opdipdno`," + 
						"        `t`.`unit_id` AS `unit_id`," + 
						"        `p`.`patient_id` AS `patient_id`," + 
						"        `p`.`center_patient_id` AS `center_patient_id`," + 
						"        `p`.`age` AS `age`," + 
						"        `t`.`created_date_time` AS `created_date_time`," + 
						"        `p`.`mrnno` AS `mrnno`," + 
						"        `p`.`deleted` AS `deleted`," + 
						"        `p`.`mobile` AS `mobile`," + 
						"        `x`.`invoice_flag` AS `invoice_flag`," + 
						"        `x`.`invoice_count` AS `invoice_count`," + 
						"        `x`.`charges_master_slave_id` AS `charges_master_slave_id`," + 
						"        IFNULL(`cs`.`category_name`, 'Self') AS `category_name`," + 
						"        CAST(`x`.`inv_created_date_time` AS DATE) AS `inv_created_date_time`," + 
						"        CONCAT(`p`.`prefix`," + 
						"                ' '," + 
						"                `p`.`f_name`," + 
						"                ' '," + 
						"                `p`.`m_name`," + 
						"                ' '," + 
						"                `p`.`l_name`) AS `patient_name`," + 
						"        CONCAT(IFNULL(`cms`.`category_name`, '-')," + 
						"                ' '," + 
						"                IFNULL((SELECT " + 
						"                                `cc`.`category_name`" + 
						"                            FROM" + 
						"                                `ehat_charges_master_slave` `cc`" + 
						"                            WHERE\r\n" + 
						"                                (`cc`.`id` = `cms`.`selfId`))," + 
						"                        '-')) AS `BedHall`," + 
						"        IFNULL(`cms`.`category_name`, '-') AS `hname`," + 
						"        IFNULL((SELECT " + 
						"                        `cc`.`category_name`" + 
						"                    FROM" + 
						"                        `ehat_charges_master_slave` `cc`" + 
						"                    WHERE" + 
						"                        (`cc`.`id` = `cms`.`selfId`))," + 
						"                '-') AS `hall_type_name`," + 
						"        IFNULL(`cms`.`id`, 0) AS `Hall_ID`," + 
						"        0 AS `ehat_hallid`," + 
						"        0 AS `idhall_type`," + 
						"        0 AS `ehat_halltype_id`," + 
						"        IFNULL(`beds`.`Bed_ID`, 0) AS `bed_name`," + 
						"        (SELECT (TO_DAYS(NOW()) - TO_DAYS(`p`.`created_date_time`))) AS `addmit_days`," + 
						"        `beds`.`Bed_ID` AS `bed_id`," + 
						"        t.phydis_flag as phyDisFlag" + 
						"    FROM" + 
						"        (`treatment_beds` `tb` " + 
						"        LEFT JOIN `ehat_treatment` `t` ON (`tb`.`treatment_id` = `t`.`treatment_id` and t.phydis_flag='Y')" + 
						"        LEFT JOIN `ehat_patient` `p` ON (`p`.`patient_id` = `t`.`patient_id`)" + 
						"        LEFT JOIN `ehat_bill_master` `x` ON (`t`.`treatment_id` = `x`.`treatment_id`)" + 
						"        LEFT JOIN `beds` ON (`beds`.`Bed_ID` = (select Bed_ID from treatment_beds where Treatment_ID = t.treatment_id and status = \"N\" order by ID desc limit 1))" + 
						"		LEFT JOIN `ehat_charges_master_slave` `cms` ON (`cms`.`id` = `beds`.`Hall_ID`)" + 
						"		LEFT JOIN `ehat_charges_master_slave` `cs` ON (`x`.`charges_master_slave_id` = `cs`.`id`))" + 
						"    WHERE" + 
						"        (`t`.`t_flag` = 'Y')" + 
						"		AND (`p`.`deleted` = 'N')" + 
						"		AND (`t`.`department_id` = 2)            " + 
						"		AND `t`.`unit_id` = IFNULL(null, `t`.`unit_id`)" + 
						"		AND `p`.`patient_id` = IFNULL(null, `p`.`patient_id`)" + 
						"		AND FN_GET_PATIENT_NAME(`p`.`patient_id`) LIKE CONCAT('%',IFNULL(null,FN_GET_PATIENT_NAME(`p`.`patient_id`)),'%')" + 
						"		AND `p`.`mobile` = IFNULL(null, `p`.`mobile`)" + 
						"        AND `cms`.`selfId` = IFNULL(null, `cms`.`selfId`)" + 
						"		AND `cms`.`id` = IFNULL(null, `cms`.`id`)" + 
						"        AND (`x`.`invoice_flag` = 'Y')" + 
						"    GROUP BY `p`.`patient_id`" + 
						"    ORDER BY `t`.`treatment_id` DESC) as result_count;" + 
						"" + 
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
