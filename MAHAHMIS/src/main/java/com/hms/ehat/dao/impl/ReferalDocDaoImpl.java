package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.impl.ChannelDoctorMgmtDaoImpl;
import com.hms.administrator.dto.Chanelling_doctor;
import com.hms.ehat.dao.ReferalDocDao;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.PercentMasterDto;
import com.hms.ehat.dto.PercentMasterReferalDocDto;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.PercentSlaveReferalDocDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ipdbill.dto.BillReceiptSlaveDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class ReferalDocDaoImpl implements ReferalDocDao {
	
	
	@Autowired 
	SessionFactory sessionFactory;
	
	static Logger log=Logger.getLogger(ChannelDoctorMgmtDaoImpl.class.getName());
	
	@Override
	public List<DoctorDto> setAutoSugForDoctorListAll(String letter,
			String callFrom) {
		List<DoctorDto> lisDoc = null;
		try {
			
			String slaveQuery = /* "SELECT Doctor_ID as Doctor_ID,doc_name as doc_name,department as specialisation,"
					+ "doc_Type as doc_Type,  fn_get_doctor_department_name(department)  as specialisationName FROM doctor where status='Y' and doc_name like '%"
					+ letter + "%'";*/
					
					"SELECT channDocId as Doctor_ID,concat(prefix,'',docName ) as doc_name," + " ifnull( specility,'') as specialisation,doctorType as doc_Type " + 
					" FROM chanelling_doctor where status='Y' and docName like '%" + letter + "%'";
			
			Query qExe = sessionFactory.getCurrentSession().createSQLQuery(slaveQuery)
					.setResultTransformer(Transformers.aliasToBean(DoctorDto.class));

			lisDoc = qExe.list();

		} catch (Exception e) {
			e.printStackTrace();
			log.error("saveReferToDoc....."+e);
			return null;
		}
		return lisDoc;
	}
	
	@Override
	public int savePerMasterForRefDoc(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,int paymentType,
			int drDeptId, String drDeptFlag, int chargesId, int chargesSlaveId) {
		int a = 0;
		Session session = sessionFactory.openSession(); 
		
		session.beginTransaction(); 
								
		try {
			if (callFrom.equalsIgnoreCase("insert")) {

				Query q = session
						.createSQLQuery(
								"SELECT count(*) as count FROM percent_master_referal_doc where deleted='N' and "
										+ "doctor_id =:doctorId and unit_id =:unitId and case_type=:caseType and payment_type=:paymentType and "
										+ "dr_dept_id=:drDeptId and charges_id=:chargesId and charges_slave_id=:chargesSlaveId");

				q.setParameter("doctorId", doctorId);
				q.setParameter("unitId", unitId);
				q.setParameter("caseType", caseType);
				q.setParameter("paymentType", paymentType);
				q.setParameter("drDeptId", drDeptId);
				q.setParameter("chargesId", chargesId);
				q.setParameter("chargesSlaveId", chargesSlaveId);

				Integer count = ((Number) q.uniqueResult()).intValue();

				if (count == 0) {

					PercentMasterReferalDocDto percentMasterDto2 = (PercentMasterReferalDocDto) ConfigUIJSONUtility
							.getObjectFromJSON(percentMasterList,PercentMasterReferalDocDto.class);

					for (int i = 0; i < percentMasterDto2.getListPerMaster().size(); i++) {
						PercentMasterReferalDocDto percentMasterDto3 = percentMasterDto2.getListPerMaster().get(i);
												
						for (int j = 0; j < percentMasterDto3.getSerIdList().size(); j++) {
							
							PercentMasterReferalDocDto percentMasterDto = new PercentMasterReferalDocDto();
							
							percentMasterDto.setCreatedBy(userId);
							percentMasterDto.setCreatedDate(new Date(new java.util.Date().getTime()));
							percentMasterDto.setDeleted("N");
							percentMasterDto.setDoctorId(doctorId);
							percentMasterDto.setDrDeptId(drDeptId);
							percentMasterDto.setDrDeptFlag(drDeptFlag);
							percentMasterDto.setCaseType(caseType);
							percentMasterDto.setPaymentType(paymentType);
							percentMasterDto.setUnitId(unitId);
							percentMasterDto.setChargesId(chargesId);
							percentMasterDto.setChargesSlaveId(chargesSlaveId);
							percentMasterDto.setDeptId(percentMasterDto3.getDeptId());
							percentMasterDto.setServiceId(percentMasterDto3.getSerIdList().get(j));
							percentMasterDto.setHospPercent(percentMasterDto3.getSerIdListPer().get(j));

							session.save(percentMasterDto);
							if (j % 20 == 0) {
								session.flush();
								session.clear();
							}
						}
						
						for (int k = 0; k < percentMasterDto3.getSubSerIdList().size(); k++) {
							
							Query qSubSer = session
									.createSQLQuery(
											"SELECT service_id FROM ehat_subservice where id= :subServiceId");

							qSubSer.setParameter("subServiceId", percentMasterDto3.getSubSerIdList().get(k));
							
							Integer mServiceId = (Integer) qSubSer.uniqueResult();
							
							PercentSlaveReferalDocDto percentSlaveDto = new PercentSlaveReferalDocDto();
													
							percentSlaveDto.setCreatedBy(userId);
							percentSlaveDto.setCreatedDate(new Date(
									new java.util.Date().getTime()));
							percentSlaveDto.setDeleted("N");
							percentSlaveDto.setDoctorId(doctorId);
							percentSlaveDto.setDrDeptId(drDeptId);
							percentSlaveDto.setDrDeptFlag(drDeptFlag);
							percentSlaveDto.setCaseType(caseType);
							percentSlaveDto.setPaymentType(paymentType);
							percentSlaveDto.setUnitId(unitId);
							percentSlaveDto.setChargesId(chargesId);
							percentSlaveDto.setChargesSlaveId(chargesSlaveId);
							percentSlaveDto.setDeptId(percentMasterDto3.getDeptId());
							percentSlaveDto.setServiceId(mServiceId);
							percentSlaveDto.setSubServiceId(percentMasterDto3.getSubSerIdList().get(k));
							percentSlaveDto.setHospPercent(percentMasterDto3.getSubSerIdListPer().get(k));

							session.save(percentSlaveDto);
							if (k % 20 == 0) { // Same as the JDBC batch size
								// flush a batch of inserts and release memory:
								session.flush();
								session.clear();
							}
						}
						
					}
					a = 1;
				} else {
					a = 3;
				}
			} else {
				
								
				Query alfa = session
						.createSQLQuery("Delete from percent_master_referal_doc where doctor_id=:doctorId and unit_id=:unitId and "
								+ "case_type=:caseType and  payment_type=:paymentType  and dr_dept_id=:drDeptId and "
								+ "charges_id=:chargesId and charges_slave_id=:chargesSlaveId");
				alfa.setParameter("doctorId", doctorId);
				alfa.setParameter("unitId", unitId);
				alfa.setParameter("caseType", caseType);
				alfa.setParameter("paymentType", paymentType);
				alfa.setParameter("drDeptId", drDeptId);
				// alfa.setParameter("drDeptFlag", drDeptFlag);
				alfa.setParameter("chargesId", chargesId);
				alfa.setParameter("chargesSlaveId", chargesSlaveId);
				alfa.executeUpdate();
				
				
				PercentMasterReferalDocDto percentMasterDto2 = (PercentMasterReferalDocDto) ConfigUIJSONUtility
						.getObjectFromJSON(percentMasterList,
								PercentMasterReferalDocDto.class);
				
				if(percentMasterDto2.getListPerMaster().get(0).getSubSerIdList().size() > 0){
					Query alfaSlave = session
							.createSQLQuery("Delete from percent_slave_referal_doc where doctor_id=:doctorId and unit_id=:unitId and "
									+ "case_type=:caseType and  payment_type=:paymentType and dr_dept_id=:drDeptId and "
									+ "charges_id=:chargesId and charges_slave_id=:chargesSlaveId and sub_service_id in(:subSerList)");
					alfaSlave.setParameter("doctorId", doctorId);
					alfaSlave.setParameter("unitId", unitId);
					alfaSlave.setParameter("caseType", caseType);
					alfaSlave.setParameter("paymentType", paymentType);
					alfaSlave.setParameter("drDeptId", drDeptId);
					// alfa.setParameter("drDeptFlag", drDeptFlag);
					alfaSlave.setParameter("chargesId", chargesId);
					alfaSlave.setParameter("chargesSlaveId", chargesSlaveId);
					alfaSlave.setParameterList("subSerList", percentMasterDto2.getListPerMaster().get(0).getSubSerIdList());
					alfaSlave.executeUpdate();
				}
				

				for (int i = 0; i < percentMasterDto2.getListPerMaster().size(); i++) {
					PercentMasterReferalDocDto percentMasterDto3 = percentMasterDto2
							.getListPerMaster().get(i);
					
					for (int j = 0; j < percentMasterDto3.getSerIdList().size(); j++) {

						PercentMasterReferalDocDto percentMasterDto = new PercentMasterReferalDocDto();
						
						percentMasterDto.setCreatedBy(userId);
						percentMasterDto.setCreatedDate(new Date(
								new java.util.Date().getTime()));
						percentMasterDto.setDeleted("N");
						percentMasterDto.setDoctorId(doctorId);
						percentMasterDto.setDrDeptId(drDeptId);
						percentMasterDto.setDrDeptFlag(drDeptFlag);
						percentMasterDto.setCaseType(caseType);
						percentMasterDto.setPaymentType(paymentType);
						percentMasterDto.setUnitId(unitId);
						percentMasterDto.setChargesId(chargesId);
						percentMasterDto.setChargesSlaveId(chargesSlaveId);
						percentMasterDto.setDeptId(percentMasterDto3
								.getDeptId());
						percentMasterDto.setServiceId(percentMasterDto3
								.getSerIdList().get(j));
						percentMasterDto.setHospPercent(percentMasterDto3
								.getSerIdListPer().get(j));

						session.save(percentMasterDto);
						if (j % 20 == 0) { // Same as the JDBC batch size
							// flush a batch of inserts and release memory:
							session.flush();
							session.clear();
						}
					}

					for (int k = 0; k < percentMasterDto3.getSubSerIdList()
							.size(); k++) {
						
						Query qSubSer = session
								.createSQLQuery(
										"SELECT service_id FROM ehat_subservice where id= :subServiceId");

						qSubSer.setParameter("subServiceId", percentMasterDto3.getSubSerIdList().get(k));
						
						Integer mServiceId = (Integer) qSubSer.uniqueResult();
						
						PercentSlaveReferalDocDto percentSlaveDto = new PercentSlaveReferalDocDto();
						
						percentSlaveDto.setCreatedBy(userId);
						percentSlaveDto.setCreatedDate(new Date(
								new java.util.Date().getTime()));
						percentSlaveDto.setDeleted("N");
						percentSlaveDto.setDoctorId(doctorId);
						percentSlaveDto.setDrDeptId(drDeptId);
						percentSlaveDto.setDrDeptFlag(drDeptFlag);
						percentSlaveDto.setCaseType(caseType);
						percentSlaveDto.setPaymentType(paymentType);
						percentSlaveDto.setUnitId(unitId);
						percentSlaveDto.setChargesId(chargesId);
						percentSlaveDto.setChargesSlaveId(chargesSlaveId);
						percentSlaveDto.setDeptId(percentMasterDto3.getDeptId());
						percentSlaveDto.setServiceId(mServiceId);
						percentSlaveDto.setSubServiceId(percentMasterDto3.getSubSerIdList().get(k));
						percentSlaveDto.setHospPercent(percentMasterDto3.getSubSerIdListPer().get(k));

						session.save(percentSlaveDto);
						if (k % 20 == 0) { // Same as the JDBC batch size
							// flush a batch of inserts and release memory:
							session.flush();
							session.clear();
						}
					}

				}
				a = 2;
			}
			session.getTransaction().commit(); // commit the transaction
			session.close();

		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
			session.getTransaction().rollback();
		}

		return a;
	}
	
	@Override
	public int savePercentMasterDrDept(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,int paymentType,
 int drDeptId, String drDeptFlag,int chargesId,int chargesSlaveId) {
		int a = 0;
		String all = "select Doctor_ID from doctor where specialisation=:drDeptId and status='Y'";
		Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
		q.setParameter("drDeptId", drDeptId);

		ArrayList<Integer> doctorIdList = (ArrayList<Integer>) q.list();
		if (doctorIdList.size() > 0) {
			for (int i = 0; i < doctorIdList.size(); i++) {
				a = savePerMasterForRefDoc(percentMasterList, userId,
						((Integer) doctorIdList.get(i)), unitId, callFrom,
						caseType, paymentType, drDeptId, drDeptFlag,chargesId,chargesSlaveId);
			}
		} else {
			a = 4;//If doctor list is empty
		}
		return a;
	}
	
	@Override
	public PercentMasterReferalDocDto getDrForRefDocDeptList(String callFrom, String letter) {
		PercentMasterReferalDocDto PercentMasterObj= new PercentMasterReferalDocDto();
		List<PercentMasterReferalDocDto> listPerMaster = new ArrayList<PercentMasterReferalDocDto>();
		
		if(callFrom.equalsIgnoreCase("search")){
			String perMastQuery = "select hs.specialization_name as drDeptName, pm.dr_dept_id as drDeptId,pm.unit_id as " +
					  "unitId,pm.case_type as caseType,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId from percent_master_referal_doc pm,hospital_specialization hs where " +
					  "pm.dr_dept_id = hs.idhospital_Specialization and dr_dept_flag = 'P' and pm.deleted='N' and hs.specialization_name like :letter group by pm.unit_id,pm.case_type,dr_dept_id";
					  
			Query qExe = sessionFactory.getCurrentSession().createSQLQuery(perMastQuery)
					.setResultTransformer(Transformers.aliasToBean(PercentMasterReferalDocDto.class));
			qExe.setParameter("letter","%" +letter+"%");

			listPerMaster = qExe.list();
			PercentMasterObj.setListPerMaster(listPerMaster);
			
		}else{
		String perMastQuery = "select hs.specialization_name as drDeptName, pm.dr_dept_id as drDeptId,pm.unit_id as " +
							  "unitId,pm.case_type as caseType,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId from percent_master_referal_doc pm,hospital_specialization hs where " +
							  "pm.dr_dept_id = hs.idhospital_Specialization and dr_dept_flag = 'P' and pm.deleted='N' group by pm.unit_id,pm.case_type,dr_dept_id";
							  
		Query qExe = sessionFactory.getCurrentSession().createSQLQuery(perMastQuery)
				.setResultTransformer(Transformers.aliasToBean(PercentMasterReferalDocDto.class));
		
		listPerMaster = qExe.list();
		PercentMasterObj.setListPerMaster(listPerMaster);
		}
		return PercentMasterObj;
		
	}
	
	
	@Override
	public PercentMasterReferalDocDto getRefDrPersonalList(String callFrom, String callSearch, String letter) {
		PercentMasterReferalDocDto PercentMasterObj = new PercentMasterReferalDocDto();
		List<PercentMasterReferalDocDto> listPerMaster = new ArrayList<PercentMasterReferalDocDto>();

		String perMastQuery = "";
		if(callSearch.equalsIgnoreCase("search")){
			

			if(callFrom.equalsIgnoreCase("doctorPersonal")){
				/*perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
						+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0 and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";*/
				
				perMastQuery = "SELECT pm.doctor_id as doctorId, CONCAT(d.prefix, '', d.docName) as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,chanelling_doctor d where pm.deleted = 'N' and pm.doctor_id=d.channDocIds "
						+" and pm.dr_dept_flag != 'D' and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
			
			}
			else if(callFrom.equalsIgnoreCase("doctorRupees")){
				/*perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
						+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0 and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";*/
				
				perMastQuery = "SELECT pm.doctor_id as doctorId, CONCAT(d.prefix, '', d.docName) as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,chanelling_doctor d where pm.deleted = 'N' and pm.doctor_id=d.channDocIds "
						+" and payment_type = 2 and pm.dr_dept_flag != 'D' and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
			
			}
			 
			else{
				/*perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName FROM percent_master_referal_doc pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
						+" and d.group_master_id > 0 and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type"; */
				
				perMastQuery = "SELECT pm.doctor_id as doctorId, CONCAT(d.prefix, '', d.docName) as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName FROM percent_master_referal_doc pm,chanelling_doctor d where pm.deleted = 'N' and pm.doctor_id=d.channDocId "
						+" and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
			}
			

			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(perMastQuery)
					.setResultTransformer(
							Transformers.aliasToBean(PercentMasterReferalDocDto.class));
			qExe.setParameter("letter","%" +letter+"%");
			// qExe.setParameter("fromDate", fromDate);
			listPerMaster = qExe.list();
			PercentMasterObj.setListPerMaster(listPerMaster);
			
			
		}else{
		if(callFrom.equalsIgnoreCase("doctorPersonal")){
			/*perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
					+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0 GROUP BY pm.charges_slave_id, pm.doctor_id , pm.unit_id , pm.case_type";*/
		
			perMastQuery = "SELECT pm.doctor_id as doctorId,CONCAT(d.prefix, '', d.docName)  as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,chanelling_doctor d where pm.deleted = 'N' and pm.doctor_id=d.channDocId "
					+" and payment_type = 1  and pm.dr_dept_flag != 'D'  GROUP BY pm.charges_slave_id, pm.doctor_id , pm.unit_id , pm.case_type";
			
		}
		else if(callFrom.equalsIgnoreCase("doctorRupees")){
			/*perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
					+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0 GROUP BY pm.charges_slave_id, pm.doctor_id , pm.unit_id , pm.case_type";*/
		
			perMastQuery = "SELECT pm.doctor_id as doctorId,CONCAT(d.prefix, '', d.docName)  as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master_referal_doc pm,chanelling_doctor d where pm.deleted = 'N' and pm.doctor_id=d.channDocId "
					+" and payment_type = 2 and pm.dr_dept_flag != 'D'  GROUP BY pm.charges_slave_id, pm.doctor_id , pm.unit_id , pm.case_type";
			
		}
		else{
			/*perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName FROM percent_master_referal_doc pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
					+" and d.group_master_id > 0 GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";*/
			
			perMastQuery = "SELECT pm.doctor_id as doctorId,CONCAT(d.prefix, '', d.docName)  as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName FROM percent_master_referal_doc pm,chanelling_doctor d where pm.deleted = 'N' and pm.doctor_id=d.channDocId "
					+"  GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
		}
		

		Query qExe = sessionFactory.getCurrentSession().createSQLQuery(perMastQuery)
				.setResultTransformer(Transformers.aliasToBean(PercentMasterReferalDocDto.class));

		listPerMaster = qExe.list();
		PercentMasterObj.setListPerMaster(listPerMaster);
		}
		return PercentMasterObj;
	}
	
	@Override
	public int deleteReferalDoctAndGroupById(Integer docId, Integer userId, Integer caseType, Integer unitId,
			Integer chargesSlaveId) {
		try {

			 //delete subservice percentage from percent_master
			String sql1 = "DELETE FROM percent_master_referal_doc WHERE doctor_id =:docId and case_type=:caseType "
							+"and unit_id=:unitId and dr_dept_flag =:drDeptFlag and charges_slave_id =:chargesSlaveId";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	        // query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         query1.setParameter("docId", docId);
	         query1.setParameter("caseType", caseType);
	         query1.setParameter("unitId", unitId);
	         query1.setParameter("drDeptFlag", "P");
	         query1.setParameter("chargesSlaveId", chargesSlaveId);
	         query1.executeUpdate();
	         
	         //delete subservice percentage from percent_slave
			String sql2 = "DELETE FROM percent_slave_referal_doc WHERE doctor_id =:docId and case_type=:caseType "
					+ "and unit_id=:unitId and dr_dept_flag =:drDeptFlag and charges_slave_id =:chargesSlaveId";

			SQLQuery query2 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql2);
		
			query2.setParameter("docId", docId);
			query2.setParameter("caseType", caseType);
			query2.setParameter("unitId", unitId);
			query2.setParameter("drDeptFlag", "P");
			query2.setParameter("chargesSlaveId", chargesSlaveId);
			query2.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	@Override
	public PercentMasterReferalDocDto editPercentMasterReferal(int doctorId, int unitId,int caseType,int chargesSlaveId) {
		PercentMasterReferalDocDto percentMasterDto = new PercentMasterReferalDocDto();
		List<PercentMasterReferalDocDto> listRecords = null;
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(PercentMasterReferalDocDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("doctorId", doctorId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("caseType", caseType));
		criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
		
		listRecords = criteria.list();
		
		percentMasterDto.setListPerMaster(listRecords);
		
		return percentMasterDto;
	}
	
	@Override
	public List<ChargesMasterSlave> fetchSuperCatPrcentMasterReferal(Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		if (chargesMasterDto > 0) {
			
			Query query = sessionFactory.getCurrentSession().createSQLQuery("CALL  fetchSuperCatogoires (:chargesMasterDto)")
					.setParameter("chargesMasterDto", chargesMasterDto);
			String result = (String) query.uniqueResult();
			String[] ary = result.split(",");

			List<Integer> ae = new ArrayList<Integer>();
			for (int i = 0; i < ary.length; i++) {
				ae.add(Integer.parseInt(ary[i]));
			}
			ae.add(chargesMasterDto);
			
			if (ary.length > 0) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
				
				criteria.add(Restrictions.in("slaveId", ae));
				ltSubCharges = criteria.list();				
			}
		}
		return ltSubCharges;
	}

	@Override
	public Chanelling_doctor getdoctorNameOfRef(int docId) {
		Chanelling_doctor doctordto = new Chanelling_doctor();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Chanelling_doctor.class);
			criteria.add(Restrictions.eq("channDocId", docId));
			doctordto = (Chanelling_doctor) criteria.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doctordto;
	}
	
	
	@Override
	public List<SubServiceDto> getSubServicesFoprofees(Integer masterId,
			Integer selfId) {
		List<SubServiceDto> ltSubService = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("serviceId", masterId));
			criteria.add(Restrictions.eq("selfId", selfId));

			ltSubService = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltSubService;
		}
		return ltSubService;
	}

	@Override
	public List<DeptMasterDto> getAllDeptLst() {
		 DeptMasterDto dp = new DeptMasterDto();
		List<DeptMasterDto> ltDeptMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("deptId"));
			criteria.setMaxResults(10);
			ltDeptMasters = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltDeptMasters;
		}
		return ltDeptMasters;
	}
	
	
	@Override
	public List<PercentSlaveReferalDocDto> fetchAndSetSubServiceOnEditReferal(int serviceId,
			int unitId, int doctorId, int drDeptId, int caseType,
			int chargesId, int chargesSlaveId) {
		
		List<PercentSlaveReferalDocDto> listPerSlave = null;
		if(doctorId == 0){//For Dr.Dept where drDeptFlag = 'D'
			
			Query qq = sessionFactory
					.getCurrentSession()
					.createSQLQuery("SELECT Doctor_id FROM percent_slave_referal_doc where dr_dept_id = :drDeptId and dr_dept_flag='P' limit 1");

			qq.setParameter("drDeptId", drDeptId);

			@SuppressWarnings("unchecked")
			Integer drId = (Integer) qq.uniqueResult();
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PercentSlaveReferalDocDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("serviceId", serviceId));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("doctorId", drId));
			criteria.add(Restrictions.eq("drDeptId", drDeptId));
			criteria.add(Restrictions.eq("caseType", caseType));
			criteria.add(Restrictions.eq("chargesId", chargesId));
			criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
			
			listPerSlave = criteria.list();
		}else{//For Doctor personal where drDeptFlag = 'P'
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PercentSlaveReferalDocDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("serviceId", serviceId));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("doctorId", doctorId));
			criteria.add(Restrictions.eq("drDeptId", drDeptId));
			criteria.add(Restrictions.eq("drDeptFlag", "P"));
			criteria.add(Restrictions.eq("caseType", caseType));
			criteria.add(Restrictions.eq("chargesId", chargesId));
			criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
			
			listPerSlave = criteria.list();
		}
		
		return listPerSlave;
	}

	@Override
	public ProfeesDoctorsPaymentDto proFeesDoctorPaymentIpd(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, String serviceId, Integer userId, int specialisationId,
			int billTypeId) {

		ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = new ProfeesDoctorsPaymentDto();
		//List<ReceiptSlaveViewDto> listReceiptSlaveViewDto = new ArrayList<ReceiptSlaveViewDto>();
		List<ProfeesDoctorsPaymentDto> pflist = new ArrayList<ProfeesDoctorsPaymentDto>();

			String all = "";

			if (billTypeId == 1) {// clear_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain <= 0 and deleted='N' and date(created_date_time) between :fromDate and :toDate";
			} else if (billTypeId == 2) {// full_pending_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain > 0 and total_paid = 0 and deleted='N' and date(created_date_time) between :fromDate and :toDate";
			} else if (billTypeId == 3) {// partial_pending_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain > 0 and total_paid > 0 and deleted='N' and date(created_date_time) between :fromDate and :toDate";
			} else if (billTypeId == 4) {// settled_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain <= 0 and bill_settled_flag='Y' and deleted='N' and date(created_date_time) between :fromDate and :toDate";
			}

			Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
			q.setParameter("deptId", deptId);
			q.setParameter("fromDate", fromDate);
			q.setParameter("toDate", toDate);

			ArrayList<Integer> masterId2 = (ArrayList<Integer>) q.list();

			StringBuilder masterId3 = new StringBuilder();
			for (Integer s : masterId2) {
				masterId3.append(s);
				masterId3.append(",");
			}

			String masterId = "";
			if (masterId3 != null && masterId3.length() > 0) {
				masterId = masterId3.substring(0, masterId3.length() - 1);
			}

			if (!masterId.equalsIgnoreCase("")) {

				String slaveQuery = "select  u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,s.iscombination as iscombination,"
						+"subs.category_name as componentName,concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
					    +"ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
					    +"ifnull(rv.concession,0) as concession,ifnull(rv.concession_per,0) as concessionPer,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) as discount,"
					    +"ifnull(rv.discount_per,0) as discountPer,rv.doctor_id as doctorId,rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,"
					    +"date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.sub_service_id as subServiceId,ifnull(rv.refund,0) as refundAmount,ifnull(rv.refund_per,0) as refundPer,"
					    +"rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,rv.source_type_id as chargesId,rv.charges_slave_id as chargesSlaveId,"
					    +"ifnull(rm.total_bill,0) as totalBillAmount,doc.doc_name as doctorName,doc.department as drDeptIdStr,"
					    +"ifnull(other_amount,0) as otherAmount,ifnull(other_concession,0) as otherConcession,ifnull(other_pay,0) as otherPay,ifnull(other_rate,0) as otherRate "
					    +" from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_patient p,"
					    +"ehat_treatment t,ehat_bill_details_ipd rv,ehat_bill_master rm,doctor doc "
					    +"where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id "
					    +"and subs.id = rv.sub_service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id "
					    +"and doc.Doctor_ID = rv.doctor_id and rm.bill_id = rv.bill_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
					    +"and rv.bill_id in ("+masterId+") and date(rv.created_date_time) between :fromDate and :toDate "
					    +"and rv.department_id = :deptId and rv.doctor_id = :doctorId and s.iscombination='N' ";

				if (unitId > 0) {
					String byUnit = " and rv.unit_id= :unitId";
					slaveQuery = slaveQuery + byUnit;
				}

				if (!serviceId.equalsIgnoreCase("0")) {
					String byService = " and rv.service_id in(" + serviceId
							+ ")";
					slaveQuery = slaveQuery + byService;
				}
				if (specialisationId > 0) {
					String byService = " and doc.department= :specialisationId";
					slaveQuery = slaveQuery + byService;
				}
				
				Query qExe = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveQuery)
						.setResultTransformer(
								Transformers
										.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExe.setParameter("fromDate", fromDate);
				qExe.setParameter("toDate", toDate);
				qExe.setParameter("doctorId", doctorId);
				qExe.setParameter("deptId", deptId);

				if (unitId > 0) {
					qExe.setParameter("unitId", unitId);
				}
				
				if (specialisationId > 0) {
					qExe.setParameter("specialisationId", specialisationId);
				}
				
				pflist = qExe.list();
			//	pflist = profeesCalculationListIpd(pflist, billTypeId);
				
				//surgery charges logic start
				String surgeryQuery="select bill_details_id from ehat_other_bill_detail_for_ipd where bill_id in(:masterId) group by bill_details_id";
				Query qSurgery = sessionFactory.getCurrentSession().createSQLQuery(surgeryQuery);
				qSurgery.setParameterList("masterId",masterId2 );

				ArrayList<Integer> surgeryBillDetailsId = (ArrayList<Integer>) qSurgery.list();
				
				String slaveSurgeryQuery = "select  u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,s.iscombination as iscombination,"
						+"subs.category_name as componentName,concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
					    +"ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
					    +"ifnull(rv.concession,0) as concession,ifnull(rv.concession_per,0) as concessionPer,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) as discount,"
					    +"ifnull(rv.discount_per,0) as discountPer,rv.doctor_id as doctorId,rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,"
					    +"date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.sub_service_id as subServiceId,ifnull(rv.refund,0) as refundAmount,ifnull(rv.refund_per,0) as refundPer,"
					    +"rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,rv.source_type_id as chargesId,rv.charges_slave_id as chargesSlaveId,"
					    +"ifnull(rm.total_bill,0) as totalBillAmount,doc.doc_name as doctorName,doc.department as drDeptIdStr,"
					    +"ifnull(other_amount,0) as otherAmount,ifnull(other_concession,0) as otherConcession,ifnull(other_pay,0) as otherPay,ifnull(other_rate,0) as otherRate "
					    +" from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_patient p,"
					    +"ehat_treatment t,ehat_bill_details_ipd rv,ehat_bill_master rm,doctor doc "
					    +"where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id "
					    +"and subs.id = rv.sub_service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id "
					    +"and doc.Doctor_ID = rv.doctor_id and rm.bill_id = rv.bill_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
					    +"and rv.bill_id in ("+masterId+") and date(rv.created_date_time) between :fromDate and :toDate "
					    +"and rv.department_id = :deptId and rv.doctor_id = :doctorId and s.iscombination='Y'  ";

				if (unitId > 0) {
					String byUnit = " and rv.unit_id= :unitId";
					slaveSurgeryQuery = slaveSurgeryQuery + byUnit;
				}

				if (!serviceId.equalsIgnoreCase("0")) {
					String byService = " and rv.service_id in(" + serviceId
							+ ")";
					slaveSurgeryQuery = slaveSurgeryQuery + byService;
				}
				if (specialisationId > 0) {
					String byService = " and doc.department= :specialisationId";
					slaveSurgeryQuery = slaveSurgeryQuery + byService;
				}
				if(surgeryBillDetailsId.size() > 0){
					String bySurgery = " and rv.bill_details_id not in(:surgeryBillDetailsId)";
					slaveSurgeryQuery = slaveSurgeryQuery + bySurgery;
				}
				
				Query qExeSurgery = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveSurgeryQuery)
						.setResultTransformer(
								Transformers
										.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExeSurgery.setParameter("fromDate", fromDate);
				qExeSurgery.setParameter("toDate", toDate);
				qExeSurgery.setParameter("doctorId", doctorId);
				qExeSurgery.setParameter("deptId", deptId);
				

				if (unitId > 0) {
					qExeSurgery.setParameter("unitId", unitId);
				}
				
				if (specialisationId > 0) {
					qExeSurgery.setParameter("specialisationId", specialisationId);
				}
				if(surgeryBillDetailsId.size() > 0){
					qExeSurgery.setParameterList("surgeryBillDetailsId", surgeryBillDetailsId);
				}
				
				//pflist = qExeSurgery.list();
				pflist.addAll(qExeSurgery.list());
				
				//surgery charges logic end
				
				
				//logic start for other bill details(package)

				String slaveQuery2 = "select  u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,s.iscombination as iscombination,rv.other_bill_details_id_for_ipd as otherBillDIdIpd,"
						+"concat(subs1.category_name,'-(',subs.category_name,')') as componentName,concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
					    +"ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
					    +"ifnull(rv.concession,0) as concession,ifnull(rv.concession_per,0) as concessionPer,"
					    +"rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) as discount,ifnull(rv.discount_per,0) as discountPer,"
					    +"rv.doctor_id as doctorId,rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,"
					    +"date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.sub_service_id as subServiceId,ifnull(rv.refund,0) as refundAmount,ifnull(rv.refund_per,0) as refundPer,"
					    +"rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,rv.charges_id as chargesId,rv.chargesSlave_id as chargesSlaveId,"
					    +"ifnull(rm.total_bill,0) as totalBillAmount,doc.doc_name as doctorName,doc.department as drDeptIdStr,"
					    +"ifnull(other_amount,0) as otherAmount,ifnull(other_concession,0) as otherConcession,ifnull(other_pay,0) as otherPay,ifnull(other_rate,0) as otherRate "
					    +" from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_subservice subs1,ehat_patient p,"
					    +"ehat_treatment t,ehat_other_bill_detail_for_ipd rv,ehat_bill_master rm,doctor doc "
					    +"where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id "
					    +"and subs.id = rv.sub_service_id and subs1.id = rv.child_sub_service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id "
					    +"and doc.Doctor_ID = rv.doctor_id and rm.bill_id = rv.bill_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
					    +"and rv.bill_id in ("+masterId+") and date(rv.created_date_time) between :fromDate and :toDate "
					    +"and rv.department_id = :deptId and rv.doctor_id = :doctorId ";

				if (unitId > 0) {
					String byUnit2 = " and rv.unit_id= :unitId";
					slaveQuery2 = slaveQuery2 + byUnit2;
				}

				if (!serviceId.equalsIgnoreCase("0")) {
					String byService2 = " and rv.service_id in(" + serviceId
							+ ")";
					slaveQuery2 = slaveQuery2 + byService2;
				}
				if (specialisationId > 0) {
					String byService2 = " and doc.department= :specialisationId";
					slaveQuery2 = slaveQuery2 + byService2;
				}
				
				Query qExe2 = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveQuery2)
						.setResultTransformer(
								Transformers
										.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExe2.setParameter("fromDate", fromDate);
				qExe2.setParameter("toDate", toDate);
				qExe2.setParameter("doctorId", doctorId);
				qExe2.setParameter("deptId", deptId);

				if (unitId > 0) {
					qExe2.setParameter("unitId", unitId);
				}
				
				if (specialisationId > 0) {
					qExe2.setParameter("specialisationId", specialisationId);
				}
				
				
				pflist.addAll(qExe2.list());
								
				pflist = profeesCalculationListIpd(pflist, billTypeId);
							
				//logic end for other bill details(package)
				
			}
		profeesDoctorsPaymentDto.setListProFees(pflist);
		return profeesDoctorsPaymentDto;
	}
	
	@Override
	public ProfeesDoctorsPaymentDto proFeesDoctorPaymentOpd(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, String serviceId, Integer userId, int specialisationId,
			int billTypeId) {

		//creating object and list of pojo to return with list
		ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> pflist = new ArrayList<ProfeesDoctorsPaymentDto>();

		String all = "";

		if (billTypeId == 1) {// clear_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_clear_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
					
					/*+ " and (doctor_ids = "
					+ doctorId
					+ " OR doctor_ids LIKE '"
					+ doctorId
					+ ",%'"
					+ " OR doctor_ids LIKE '%,"
					+ doctorId
					+ ",%' OR doctor_ids LIKE '%,"
					+ doctorId
					+ "') and department_id= :deptId";*/
		} else if (billTypeId == 2) {// full_pending_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_full_pending_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
					
					/*+ " and (doctor_ids = "
					+ doctorId
					+ " OR doctor_ids LIKE '"
					+ doctorId
					+ ",%'"
					+ " OR doctor_ids LIKE '%,"
					+ doctorId
					+ ",%' OR doctor_ids LIKE '%,"
					+ doctorId
					+ "') and department_id= :deptId";*/
		} else if (billTypeId == 3) {// partial_pending_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_partial_pending_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
					
					/*+ " and (doctor_ids = "
					+ doctorId
					+ " OR doctor_ids LIKE '"
					+ doctorId
					+ ",%'"
					+ " OR doctor_ids LIKE '%,"
					+ doctorId
					+ ",%' OR doctor_ids LIKE '%,"
					+ doctorId
					+ "') and department_id= :deptId";*/
		} else if (billTypeId == 4) {// settled_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_settled_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and total_paid > 0 and department_id= :deptId" ;
					/*+ "and (doctor_ids = "
					+ doctorId
					+ " OR doctor_ids LIKE '"
					+ doctorId
					+ ",%'"
					+ " OR doctor_ids LIKE '%,"
					+ doctorId
					+ ",%' OR doctor_ids LIKE '%,"
					+ doctorId
					+ "') and department_id= :deptId";*/
		}

		Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
		q.setParameter("fromDate", fromDate);
		q.setParameter("toDate", toDate);
		q.setParameter("deptId", deptId);

		ArrayList<Integer> masterId2 = (ArrayList<Integer>) q.list();

		StringBuilder masterId3 = new StringBuilder();
		for (Integer s : masterId2) {
			masterId3.append(s);
			masterId3.append(",");
		}

		String masterId = "";
		if (masterId3 != null && masterId3.length() > 0) {
			masterId = masterId3.substring(0, masterId3.length() - 1);
		}

		//if masterId's is present then fetch slaves for particular
		if (!masterId.equalsIgnoreCase("")) {

			String slaveQuery = "select u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
					+ "concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId"
					+ ",rv.bill_rec_slave_id as billReceiptSlaveId,ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,rv.bill_receipt_master_id as billReceiptMasterId,"
					+ "rv.comp_name as componentName,ifnull(rv.concession,0) as concession,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) discount,t.ref_doc_id as doctorId,ifnull(rv.paid,0) as paid,"//rv.doctor_id as doctorId
					+ "rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,rv.service_assign_date as serviceAssignDate,rv.service_id as serviceId,rv.source_type_id as sourceTypeId,rv.sub_service_id as subServiceId,"
					+ "rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.refund_flag as refundFlag,rv.pfVoucherFlag as pfVoucherFlag,"
					+ "ifnull(rm.total_amt,0) as totalBillAmount, concat(doc.prefix,'', doc.docName) as doctorName,ifnull(rv.actual_ref_amt,0) as refundAmount,ifnull(rv.actual_ref_per,0) as refundPer,"//doc.specialisation as drDeptIdStr,doc.doc_name as doctorName,doc.department as drDeptIdStr
					+ "rv.actual_amt as actualAmt,rv.actual_concn_per as actualConcnPer,rv.actual_concn_amt as actualConcnAmt,"
					//+ "rv.actual_payable as actualPayable,rv.actual_disc_per as actualDiscPer,rv.actual_disc_amt as actualDiscAmt, "
					
					// 15-03-2024
					+ " rv.actual_payable as actualPayable,rm.actual_disc_per AS actualDiscPer,rm.total_discount AS actualDiscAmt, "					
					+ " rv.actual_final_paid as actualFinalPaid, " 
					+ " rv.actual_final_payable as actualFinalPayable,"  //rm.payable as actualFinalPayable,
					+ "rm.source_type_id as chargesId,rm.sponsor_cat_id as chargesSlaveId from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,ehat_treatment t, "
					+ "ehat_receipt_slave rv,ehat_receipt_master rm,chanelling_doctor doc where u.unit_id = rv.unit_id and d.dept_id = rv.department_id "
					+ "and s.service_id = rv.service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id and "
					+ "rv.bill_receipt_master_id = rm.bill_receipt_id and doc.channDocId = t.ref_doc_id and rv.deleted='N' and rv.rpfVoucherFlag='N' and "
					+ "rv.bill_receipt_master_id in("
					+ masterId
					+ ") and rv.service_assign_date between :fromDate and :toDate "
					//+ "and rv.doctor_id=:doctorId and rv.department_id= :deptId";
					+ "and t.ref_doc_id=:doctorId and rv.department_id= :deptId and  rv.service_id!=1";

			//unit filter for search
			if (unitId > 0) {
				String byUnit = " and rv.unit_id= :unitId";
				slaveQuery = slaveQuery + byUnit;
			}
			//service id filter for search
			if (!serviceId.equalsIgnoreCase("0")) {
				String byService = " and rv.service_id in(" + serviceId + ")";
				slaveQuery = slaveQuery + byService;
			}
			//specialisation id filter for search
			if (specialisationId > 0) {
				//String byService = " and doc.specialisation= :specialisationId";
				String byService = " and doc.department= :specialisationId";
				slaveQuery = slaveQuery + byService;
			}

			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(slaveQuery)
					.setResultTransformer(
							Transformers.aliasToBean(ProfeesDoctorsPaymentDto.class));

			qExe.setParameter("fromDate", fromDate);
			qExe.setParameter("toDate", toDate);
			qExe.setParameter("doctorId", doctorId);
			qExe.setParameter("deptId", deptId);

			//values for unit filter for search
			if (unitId > 0) {
				qExe.setParameter("unitId", unitId);
			}
			
			//values for specialisation filter for search
			if (specialisationId > 0) {
				qExe.setParameter("specialisationId", specialisationId);
			}
			
			pflist = qExe.list();
			
			//code for package profees starts 3-feb-2018
			
			String queryBillDId = "select rv.bill_details_id from ehat_receipt_slave rv,ehat_service_master s where "
							+"s.service_id=rv.service_id and s.iscombination='Y' and rv.bill_receipt_master_id in("+masterId+")";
			
			Query qBillDid = sessionFactory.getCurrentSession().createSQLQuery(queryBillDId);
			/*qBillDid.setParameter("fromDate", fromDate);
			qBillDid.setParameter("toDate", toDate);
			qBillDid.setParameter("deptId", deptId);*/

			ArrayList<Integer> billDId2 = (ArrayList<Integer>) qBillDid.list();
			
			StringBuilder billDId3 = new StringBuilder();
			for (Integer s : billDId2) {
				billDId3.append(s);
				billDId3.append(",");
			}

			String billDId = "";
			if (billDId3 != null && billDId3.length() > 0) {
				billDId = billDId3.substring(0, billDId3.length() - 1);
			}

			//if masterId's is present then fetch slaves for particular
			if (!billDId.equalsIgnoreCase("")) {
				List<ProfeesDoctorsPaymentDto> pflistOther = new ArrayList<ProfeesDoctorsPaymentDto>();
								
				String slaveQueryOther = "SELECT u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
						+"s.iscombination as iscombination,rv.other_bill_details_id_for_Opd as otherBillDIdOpd,subs.id as subServiceId,"
					    +"concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
						+"ifnull(rv.amount, 0) as actualAmt,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
						+"concat(subs1.category_name,'-(',subs.category_name,')') as componentName,ifnull(rv.concession, 0) as concession,"
					    +"rv.deleted as deleted,rv.department_id as deptId,rv.doctor_id as doctorId,rv.patient_id as patientId,"
					    +"rv.quantity as quantity,ifnull(rv.rate, 0) as rate,rv.service_id as serviceId,rv.treatment_id as treatmentId,"
					    +"rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,doc.doc_name as doctorName,doc.specialisation as drDeptIdStr,"
						+"rv.charges_id as chargesId,rv.chargesSlave_id as chargesSlaveId,bm.total_bill as totalBillAmount, "
					    +"ifnull(rv.other_amount,0) as otherAmount,ifnull(rv.other_concession,0) as otherConcession,ifnull(rv.other_pay,0) as otherPay,ifnull(rv.other_rate,0) as otherRate "
						+" FROM ehat_other_bill_detail_for_opd rv,ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,"
					    +"ehat_treatment t,ehat_subservice subs,ehat_subservice subs1,ehat_bill_master bm,doctor doc where "
						+"u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id and p.patient_id = rv.patient_id "
					    +"and t.treatment_id = rv.treatment_id and doc.Doctor_ID = rv.doctor_id and bm.bill_id = rv.bill_id "
						+"and subs.id = rv.sub_service_id and subs1.id = rv.child_sub_service_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
						+"and date(rv.created_date_time) between :fromDate and :toDate and rv.bill_details_id in ("+billDId+") "
						+"and rv.department_id = :deptId and t.ref_doc_id = :doctorId ";

				//unit filter for search
				if (unitId > 0) {
					String byUnit = " and rv.unit_id= :unitId";
					slaveQueryOther = slaveQueryOther + byUnit;
				}
				//service id filter for search
				if (!serviceId.equalsIgnoreCase("0")) {
					String byService = " and rv.service_id in(" + serviceId + ")";
					slaveQueryOther = slaveQueryOther + byService;
				}
				//specialisation id filter for search
				if (specialisationId > 0) {
					String byService = " and doc.specialisation= :specialisationId";
					slaveQueryOther = slaveQueryOther + byService;
				}

				Query qExeOther = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveQueryOther)
						.setResultTransformer(
								Transformers.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExeOther.setParameter("fromDate", fromDate);
				qExeOther.setParameter("toDate", toDate);
				qExeOther.setParameter("doctorId", doctorId);
				qExeOther.setParameter("deptId", deptId);

				//values for unit filter for search
				if (unitId > 0) {
					qExeOther.setParameter("unitId", unitId);
				}
				
				//values for specialisation filter for search
				if (specialisationId > 0) {
					qExeOther.setParameter("specialisationId", specialisationId);
				}
				
				pflistOther = qExeOther.list();
				
				List<ProfeesDoctorsPaymentDto> pflistOther2 = new ArrayList<ProfeesDoctorsPaymentDto>();
				for(int i=0;i<pflistOther.size();i++){					
					BillReceiptSlaveDTO objBRS=new BillReceiptSlaveDTO();
					
					String BRSQAll = "Select ers.bill_rec_slave_id as billRecSlaveId,ers.actual_amt as actualAmt,ers.actual_concn_per as actualConcnPer," +
							"ers.actual_concn_amt as actualConcnAmt,ers.actual_payable as actualPayable,ers.actual_disc_per as actualDiscPer," +
							"ers.actual_disc_amt as actualDiscAmt,ers.actual_ref_per as actualRefPer,ers.actual_ref_amt as actualRefAmt," +
							"ers.actual_final_payable as actualFinalPayable,ers.actual_final_paid as actualFinalPaid," +
							//"ers.ref_dr_percent as refDrPercent,ers.ref_dr_amount as refDrAmount,ers.ref_dr_id as refDrId," +
							"ers.service_assign_date as serviceAssignDate," +
							"ers.bill_receipt_master_id as billReceiptMasterId,erm.total_amt as totalBillAmount " +
							"from ehat_receipt_slave ers,ehat_receipt_master erm where ers.bill_receipt_master_id=erm.bill_receipt_id and ers.bill_details_id= :billDetailsId " +
							"and ers.deleted='N'";
					
					Query BRSQuery = sessionFactory.getCurrentSession().createSQLQuery(BRSQAll)
							.setResultTransformer(Transformers.aliasToBean(BillReceiptSlaveDTO.class));
					BRSQuery.setParameter("billDetailsId",pflistOther.get(i).getBillDetailsId());

					if(BRSQuery.list().size() > 0){
						objBRS = (BillReceiptSlaveDTO) BRSQuery.list().get(0);
						
						double slaveActAmount = pflistOther.get(i).getActualAmt();
						if(pflistOther.get(i).getChargesId() > 0 || pflistOther.get(i).getChargesSlaveId() > 0){
	                        slaveActAmount = pflistOther.get(i).getOtherAmount();
	                        pflistOther.get(i).setRate(pflistOther.get(i).getOtherRate());
	                        pflistOther.get(i).setActualAmt(pflistOther.get(i).getOtherRate() * pflistOther.get(i).getQuantity());
	                        
	                    }
						
						
						double masterActAmount = objBRS.getActualAmt();
						double actualFinalPaid = objBRS.getActualFinalPaid();
						//double actualFinalPayable = objBRS.getActualFinalPayable();
						double concessionPer = objBRS.getActualConcnPer();
						double discountPer = objBRS.getActualDiscPer();
						
						double slaveActAmtPer = slaveActAmount * 100/masterActAmount;
						double slaveActFinalPaid = slaveActAmtPer * actualFinalPaid /100;
						double slaveConcessionAmt = concessionPer * slaveActAmount /100;
						double payable = slaveActAmount - slaveConcessionAmt;
						double slaveDiscountAmt = discountPer * payable /100;
						double finalPayable = payable - slaveDiscountAmt;
						
						double refundPer = objBRS.getActualRefPer();
						double slaveRefundAmt = refundPer * slaveActFinalPaid/100;
						
						pflistOther.get(i).setActualConcnAmt(slaveConcessionAmt);
						pflistOther.get(i).setActualConcnPer(concessionPer);
						pflistOther.get(i).setActualDiscAmt(slaveDiscountAmt);
						pflistOther.get(i).setActualDiscPer(discountPer);
						pflistOther.get(i).setActualPayable(payable);
						pflistOther.get(i).setActualFinalPayable(finalPayable);
						pflistOther.get(i).setActualFinalPaid(slaveActFinalPaid);
						pflistOther.get(i).setRefundAmount(slaveRefundAmt);
						pflistOther.get(i).setRefundPer(refundPer);
						//pflistOther.get(i).setRefDrId(objBRS.getRefDrId());
						//pflistOther.get(i).setRefDrPercent(objBRS.getRefDrPercent());
						pflistOther.get(i).setServiceAssignDate(objBRS.getServiceAssignDate());
						pflistOther.get(i).setTotalBillAmount(objBRS.getTotalBillAmount());
						pflistOther.get(i).setBillReceiptMasterId(objBRS.getBillReceiptMasterId());
						pflistOther.get(i).setBillReceiptSlaveId(objBRS.getBillRecSlaveId());
					}
					
				}
				
				pflist.addAll(pflistOther);
			}
			
			//code for package profees ends			
			
			//profees calculation function call and return list
			pflist = profeesCalculationList(pflist,billTypeId);
		}

		profeesDoctorsPaymentDto.setListProFees(pflist);
		return profeesDoctorsPaymentDto;
	}
	
	
	@Override
	public ProfeesDoctorsPaymentDto proFeesDoctorPaymentForAllDocIpd(
			int doctorId, java.sql.Date fromDate, java.sql.Date toDate,
			int unitId, int deptId, String serviceId, Integer userId,
			int specialisationId, int billTypeId) {

		ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = new ProfeesDoctorsPaymentDto();
		//List<ReceiptSlaveViewDto> listReceiptSlaveViewDto = new ArrayList<ReceiptSlaveViewDto>();
		List<ProfeesDoctorsPaymentDto> pflist = new ArrayList<ProfeesDoctorsPaymentDto>();

			String all = "";

			if (billTypeId == 1) {// clear_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain <= 0 and date(created_date_time) between :fromDate and :toDate";
			} else if (billTypeId == 2) {// full_pending_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain > 0 and total_paid = 0 and date(created_date_time) between :fromDate and :toDate";
			} else if (billTypeId == 3) {// partial_pending_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain > 0 and total_paid > 0 and date(created_date_time) between :fromDate and :toDate";
			} else if (billTypeId == 4) {// settled_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and total_remain <= 0 and bill_settled_flag='Y' and date(created_date_time) between :fromDate and :toDate";
			}

			Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
			q.setParameter("deptId", deptId);
			q.setParameter("fromDate", fromDate);
			q.setParameter("toDate", toDate);

			ArrayList<Integer> masterId2 = (ArrayList<Integer>) q.list();

			StringBuilder masterId3 = new StringBuilder();
			for (Integer s : masterId2) {
				masterId3.append(s);
				masterId3.append(",");
			}

			String masterId = "";
			if (masterId3 != null && masterId3.length() > 0) {
				masterId = masterId3.substring(0, masterId3.length() - 1);
			}

			if (!masterId.equalsIgnoreCase("")) {

				String slaveQuery = "select  u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,s.iscombination as iscombination,"
						+"subs.category_name as componentName,concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
					    +"ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
					    +"ifnull(rv.concession,0) as concession,ifnull(rv.concession_per,0) as concessionPer,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) as discount,"
					    +"ifnull(rv.discount_per,0) as discountPer,rv.doctor_id as doctorId,rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,"
					    +"date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.sub_service_id as subServiceId,ifnull(rv.refund,0) as refundAmount,ifnull(rv.refund_per,0) as refundPer,"
					    +"rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,rv.source_type_id as chargesId,rv.charges_slave_id as chargesSlaveId,"
					    +"ifnull(rm.total_bill,0) as totalBillAmount,doc.doc_name as doctorName,doc.specialisation as drDeptIdStr,"
					    +"ifnull(other_amount,0) as otherAmount,ifnull(other_concession,0) as otherConcession,ifnull(other_pay,0) as otherPay,ifnull(other_rate,0) as otherRate "
					    +" from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_patient p,"
					    +"ehat_treatment t,ehat_bill_details_ipd rv,ehat_bill_master rm,doctor doc "
					    +"where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id "
					    +"and subs.id = rv.sub_service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id "
					    +"and doc.Doctor_ID = rv.doctor_id and rm.bill_id = rv.bill_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
					    +"and rv.bill_id in ("+masterId+") and date(rv.created_date_time) between :fromDate and :toDate "
					    +"and rv.department_id = :deptId and s.iscombination='N' ";

				if (unitId > 0) {
					String byUnit = " and rv.unit_id= :unitId";
					slaveQuery = slaveQuery + byUnit;
				}

				if (!serviceId.equalsIgnoreCase("0")) {
					String byService = " and rv.service_id in(" + serviceId
							+ ")";
					slaveQuery = slaveQuery + byService;
				}
				if (specialisationId > 0) {
					String byService = " and doc.specialisation= :specialisationId";
					slaveQuery = slaveQuery + byService;
				}
				
				Query qExe = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveQuery)
						.setResultTransformer(
								Transformers
										.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExe.setParameter("fromDate", fromDate);
				qExe.setParameter("toDate", toDate);
				//qExe.setParameter("doctorId", doctorId);
				qExe.setParameter("deptId", deptId);

				if (unitId > 0) {
					qExe.setParameter("unitId", unitId);
				}
				
				if (specialisationId > 0) {
					qExe.setParameter("specialisationId", specialisationId);
				}
				
				pflist = qExe.list();
				
				//surgery charges logic start
				String surgeryQuery="select bill_details_id from ehat_other_bill_detail_for_ipd where bill_id in(:masterId) group by bill_details_id";
				Query qSurgery = sessionFactory.getCurrentSession().createSQLQuery(surgeryQuery);
				qSurgery.setParameterList("masterId",masterId2 );

				ArrayList<Integer> surgeryBillDetailsId = (ArrayList<Integer>) qSurgery.list();
				
				String slaveSurgeryQuery = "select  u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,s.iscombination as iscombination,"
						+"subs.category_name as componentName,concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
					    +"ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
					    +"ifnull(rv.concession,0) as concession,ifnull(rv.concession_per,0) as concessionPer,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) as discount,"
					    +"ifnull(rv.discount_per,0) as discountPer,rv.doctor_id as doctorId,rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,"
					    +"date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.sub_service_id as subServiceId,ifnull(rv.refund,0) as refundAmount,ifnull(rv.refund_per,0) as refundPer,"
					    +"rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,rv.source_type_id as chargesId,rv.charges_slave_id as chargesSlaveId,"
					    +"ifnull(rm.total_bill,0) as totalBillAmount,doc.doc_name as doctorName,doc.specialisation as drDeptIdStr,"
					    +"ifnull(other_amount,0) as otherAmount,ifnull(other_concession,0) as otherConcession,ifnull(other_pay,0) as otherPay,ifnull(other_rate,0) as otherRate "
					    +" from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_patient p,"
					    +"ehat_treatment t,ehat_bill_details_ipd rv,ehat_bill_master rm,doctor doc "
					    +"where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id "
					    +"and subs.id = rv.sub_service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id "
					    +"and doc.Doctor_ID = rv.doctor_id and rm.bill_id = rv.bill_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
					    +"and rv.bill_id in ("+masterId+") and date(rv.created_date_time) between :fromDate and :toDate "
					    +"and rv.department_id = :deptId and  s.iscombination='Y'  ";

				if (unitId > 0) {
					String byUnit = " and rv.unit_id= :unitId";
					slaveSurgeryQuery = slaveSurgeryQuery + byUnit;
				}

				if (!serviceId.equalsIgnoreCase("0")) {
					String byService = " and rv.service_id in(" + serviceId
							+ ")";
					slaveSurgeryQuery = slaveSurgeryQuery + byService;
				}
				if (specialisationId > 0) {
					String byService = " and doc.specialisation= :specialisationId";
					slaveSurgeryQuery = slaveSurgeryQuery + byService;
				}
				if(surgeryBillDetailsId.size() > 0){
					String bySurgery = " and rv.bill_details_id not in(:surgeryBillDetailsId)";
					slaveSurgeryQuery = slaveSurgeryQuery + bySurgery;
				}
				
				Query qExeSurgery = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveSurgeryQuery)
						.setResultTransformer(
								Transformers
										.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExeSurgery.setParameter("fromDate", fromDate);
				qExeSurgery.setParameter("toDate", toDate);
				//qExeSurgery.setParameter("doctorId", doctorId);
				qExeSurgery.setParameter("deptId", deptId);
				

				if (unitId > 0) {
					qExeSurgery.setParameter("unitId", unitId);
				}
				
				if (specialisationId > 0) {
					qExeSurgery.setParameter("specialisationId", specialisationId);
				}
				if(surgeryBillDetailsId.size() > 0){
					qExeSurgery.setParameterList("surgeryBillDetailsId", surgeryBillDetailsId);
				}
				
				//pflist = qExeSurgery.list();
				pflist.addAll(qExeSurgery.list());
				
				//surgery charges logic end
				
				
				//logic start for other bill details(package)

				String slaveQuery2 = "select  u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,s.iscombination as iscombination,rv.other_bill_details_id_for_ipd as otherBillDIdIpd,"
						+"concat(subs1.category_name,'-(',subs.category_name,')') as componentName,concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
					    +"ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
					    +"ifnull(rv.concession,0) as concession,ifnull(rv.concession_per,0) as concessionPer,"
					    +"rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) as discount,ifnull(rv.discount_per,0) as discountPer,"
					    +"rv.doctor_id as doctorId,rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,"
					    +"date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.sub_service_id as subServiceId,ifnull(rv.refund,0) as refundAmount,ifnull(rv.refund_per,0) as refundPer,"
					    +"rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,rv.charges_id as chargesId,rv.chargesSlave_id as chargesSlaveId,"
					    +"ifnull(rm.total_bill,0) as totalBillAmount,doc.doc_name as doctorName,doc.specialisation as drDeptIdStr,"
					    +"ifnull(other_amount,0) as otherAmount,ifnull(other_concession,0) as otherConcession,ifnull(other_pay,0) as otherPay,ifnull(other_rate,0) as otherRate "
					    +" from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_subservice subs1,ehat_patient p,"
					    +"ehat_treatment t,ehat_other_bill_detail_for_ipd rv,ehat_bill_master rm,doctor doc "
					    +"where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id "
					    +"and subs.id = rv.sub_service_id and subs1.id = rv.child_sub_service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id "
					    +"and doc.Doctor_ID = rv.doctor_id and rm.bill_id = rv.bill_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
					    +"and rv.bill_id in ("+masterId+") and date(rv.created_date_time) between :fromDate and :toDate "
					    +"and rv.department_id = :deptId ";

				if (unitId > 0) {
					String byUnit2 = " and rv.unit_id= :unitId";
					slaveQuery2 = slaveQuery2 + byUnit2;
				}

				if (!serviceId.equalsIgnoreCase("0")) {
					String byService2 = " and rv.service_id in(" + serviceId
							+ ")";
					slaveQuery2 = slaveQuery2 + byService2;
				}
				if (specialisationId > 0) {
					String byService2 = " and doc.specialisation= :specialisationId";
					slaveQuery2 = slaveQuery2 + byService2;
				}
				
				Query qExe2 = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveQuery2)
						.setResultTransformer(
								Transformers
										.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExe2.setParameter("fromDate", fromDate);
				qExe2.setParameter("toDate", toDate);
				//qExe2.setParameter("doctorId", doctorId);
				qExe2.setParameter("deptId", deptId);

				if (unitId > 0) {
					qExe2.setParameter("unitId", unitId);
				}
				
				if (specialisationId > 0) {
					qExe2.setParameter("specialisationId", specialisationId);
				}
				
				pflist.addAll(qExe2.list());
				//logic ends for package billing
				
				pflist = profeesCalculationListIpd(pflist, billTypeId);
			}

		profeesDoctorsPaymentDto.setListProFees(pflist);
		return profeesDoctorsPaymentDto;
	}
	
	
	@Override
	public ProfeesDoctorsPaymentDto proFeesDoctorPaymentForAllDocOpd(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, String serviceId, Integer userId, int specialisationId,int billTypeId) {

		//creating object and list of pojo to return with list
		ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> pflist = new ArrayList<ProfeesDoctorsPaymentDto>();

		String all = "";

		if (billTypeId == 1) {// clear_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_clear_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
		} else if (billTypeId == 2) {// full_pending_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_full_pending_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
		} else if (billTypeId == 3) {// partial_pending_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_partial_pending_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
		} else if (billTypeId == 4) {// settled_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_settled_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
		}

		Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
		q.setParameter("fromDate", fromDate);
		q.setParameter("toDate", toDate);
		q.setParameter("deptId", deptId);

		ArrayList<Integer> masterId2 = (ArrayList<Integer>) q.list();

		StringBuilder masterId3 = new StringBuilder();
		for (Integer s : masterId2) {
			masterId3.append(s);
			masterId3.append(",");
		}

		String masterId = "";
		if (masterId3 != null && masterId3.length() > 0) {
			masterId = masterId3.substring(0, masterId3.length() - 1);
		}

		//if masterId's is present then fetch slaves for particular
		if (!masterId.equalsIgnoreCase("")) {

			String slaveQuery = "select u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
					+ "concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId"
					+ ",rv.bill_rec_slave_id as billReceiptSlaveId,ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,rv.bill_receipt_master_id as billReceiptMasterId,"
					+ "rv.comp_name as componentName,ifnull(rv.concession,0) as concession,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) discount,rv.doctor_id as doctorId,ifnull(rv.paid,0) as paid,"
					+ "rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,rv.service_assign_date as serviceAssignDate,rv.service_id as serviceId,rv.source_type_id as sourceTypeId,rv.sub_service_id as subServiceId,"
					+ "rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.refund_flag as refundFlag,rv.pfVoucherFlag as pfVoucherFlag,"
					+ "ifnull(rm.total_amt,0) as totalBillAmount,doc.doc_name as doctorName,doc.department as drDeptIdStr,ifnull(rv.actual_ref_amt,0) as refundAmount,ifnull(rv.actual_ref_per,0) as refundPer,"
					+ "rv.actual_amt as actualAmt,rv.actual_concn_per as actualConcnPer,rv.actual_concn_amt as actualConcnAmt,"
					+ "rv.actual_payable as actualPayable,rv.actual_disc_per as actualDiscPer,rv.actual_disc_amt as actualDiscAmt,rv.actual_final_paid as actualFinalPaid, "
					+ "rv.actual_final_payable as actualFinalPayable,rm.source_type_id as chargesId,rm.sponsor_cat_id as chargesSlaveId from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,ehat_treatment t, "
					+ "ehat_receipt_slave rv,ehat_receipt_master rm,doctor doc where u.unit_id = rv.unit_id and d.dept_id = rv.department_id "
					+ "and s.service_id = rv.service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id and "
					+ "rv.bill_receipt_master_id = rm.bill_receipt_id and doc.Doctor_ID = rv.doctor_id and rv.deleted='N' and pfVoucherFlag='N' and "
					+ "rv.bill_receipt_master_id in("
					+ masterId
					+ ") and rv.service_assign_date between :fromDate and :toDate "
					+ "and rv.department_id= :deptId";

			//unit filter for search
			if (unitId > 0) {
				String byUnit = " and rv.unit_id= :unitId";
				slaveQuery = slaveQuery + byUnit;
			}
			//service id filter for search
			if (!serviceId.equalsIgnoreCase("0")) {
				String byService = " and rv.service_id in(" + serviceId + ")";
				slaveQuery = slaveQuery + byService;
			}
			//specialisation id filter for search
			if (specialisationId > 0) {
				String byService = " and doc.department= :specialisationId";
				slaveQuery = slaveQuery + byService;
			}

			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(slaveQuery)
					.setResultTransformer(
							Transformers.aliasToBean(ProfeesDoctorsPaymentDto.class));

			qExe.setParameter("fromDate", fromDate);
			qExe.setParameter("toDate", toDate);
			//qExe.setParameter("doctorId", doctorId);
			qExe.setParameter("deptId", deptId);

			//values for unit filter for search
			if (unitId > 0) {
				qExe.setParameter("unitId", unitId);
			}
			
			//values for specialisation filter for search
			if (specialisationId > 0) {
				qExe.setParameter("specialisationId", specialisationId);
			}
			
			pflist = qExe.list();
			
			//code for package profees starts 3-feb-2018
			
			String queryBillDId = "select rv.bill_details_id from ehat_receipt_slave rv,ehat_service_master s where "
							+"s.service_id=rv.service_id and s.iscombination='Y' and rv.bill_receipt_master_id in("+masterId+")";
			
			Query qBillDid = sessionFactory.getCurrentSession().createSQLQuery(queryBillDId);
			/*qBillDid.setParameter("fromDate", fromDate);
			qBillDid.setParameter("toDate", toDate);
			qBillDid.setParameter("deptId", deptId);*/

			ArrayList<Integer> billDId2 = (ArrayList<Integer>) qBillDid.list();
			
			StringBuilder billDId3 = new StringBuilder();
			for (Integer s : billDId2) {
				billDId3.append(s);
				billDId3.append(",");
			}

			String billDId = "";
			if (billDId3 != null && billDId3.length() > 0) {
				billDId = billDId3.substring(0, billDId3.length() - 1);
			}

			//if masterId's is present then fetch slaves for particular
			if (!billDId.equalsIgnoreCase("")) {
				List<ProfeesDoctorsPaymentDto> pflistOther = new ArrayList<ProfeesDoctorsPaymentDto>();
								
				String slaveQueryOther = "SELECT u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
						+"s.iscombination as iscombination,rv.other_bill_details_id_for_Opd as otherBillDIdOpd,subs.id as subServiceId,"
					    +"concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
						+"ifnull(rv.amount, 0) as actualAmt,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
						+"concat(subs1.category_name,'-(',subs.category_name,')') as componentName,ifnull(rv.concession, 0) as concession,"
					    +"rv.deleted as deleted,rv.department_id as deptId,rv.doctor_id as doctorId,rv.patient_id as patientId,"
					    +"rv.quantity as quantity,ifnull(rv.rate, 0) as rate,rv.service_id as serviceId,rv.treatment_id as treatmentId,"
					    +"rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,doc.doc_name as doctorName,doc.department as drDeptIdStr,"
						+"rv.charges_id as chargesId,rv.chargesSlave_id as chargesSlaveId,bm.total_bill as totalBillAmount,"
						+"ifnull(rv.other_amount,0) as otherAmount,ifnull(rv.other_concession,0) as otherConcession,ifnull(rv.other_pay,0) as otherPay,ifnull(rv.other_rate,0) as otherRate "
						+" FROM ehat_other_bill_detail_for_opd rv,ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,"
					    +"ehat_treatment t,ehat_subservice subs,ehat_subservice subs1,ehat_bill_master bm,doctor doc where "
						+"u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id and p.patient_id = rv.patient_id "
					    +"and t.treatment_id = rv.treatment_id and doc.Doctor_ID = rv.doctor_id and bm.bill_id = rv.bill_id "
						+"and subs.id = rv.sub_service_id and subs1.id = rv.child_sub_service_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "
						+"and date(rv.created_date_time) between :fromDate and :toDate and rv.bill_details_id in ("+billDId+") "
						+"and rv.department_id = :deptId ";

				//unit filter for search
				if (unitId > 0) {
					String byUnit = " and rv.unit_id= :unitId";
					slaveQueryOther = slaveQueryOther + byUnit;
				}
				//service id filter for search
				if (!serviceId.equalsIgnoreCase("0")) {
					String byService = " and rv.service_id in(" + serviceId + ")";
					slaveQueryOther = slaveQueryOther + byService;
				}
				//specialisation id filter for search
				if (specialisationId > 0) {
					String byService = " and doc.department= :specialisationId";
					slaveQueryOther = slaveQueryOther + byService;
				}

				Query qExeOther = sessionFactory
						.getCurrentSession()
						.createSQLQuery(slaveQueryOther)
						.setResultTransformer(
								Transformers.aliasToBean(ProfeesDoctorsPaymentDto.class));

				qExeOther.setParameter("fromDate", fromDate);
				qExeOther.setParameter("toDate", toDate);
				//qExeOther.setParameter("doctorId", doctorId);
				qExeOther.setParameter("deptId", deptId);

				//values for unit filter for search
				if (unitId > 0) {
					qExeOther.setParameter("unitId", unitId);
				}
				
				//values for specialisation filter for search
				if (specialisationId > 0) {
					qExeOther.setParameter("specialisationId", specialisationId);
				}
				
				pflistOther = qExeOther.list();
				
				List<ProfeesDoctorsPaymentDto> pflistOther2 = new ArrayList<ProfeesDoctorsPaymentDto>();
				for(int i=0;i<pflistOther.size();i++){					
					BillReceiptSlaveDTO objBRS=new BillReceiptSlaveDTO();
					
					String BRSQAll = "Select ers.bill_rec_slave_id as billRecSlaveId,ers.actual_amt as actualAmt,ers.actual_concn_per as actualConcnPer," +
							"ers.actual_concn_amt as actualConcnAmt,ers.actual_payable as actualPayable,ers.actual_disc_per as actualDiscPer," +
							"ers.actual_disc_amt as actualDiscAmt,ers.actual_ref_per as actualRefPer,ers.actual_ref_amt as actualRefAmt," +
							"ers.actual_final_payable as actualFinalPayable,ers.actual_final_paid as actualFinalPaid," +
							//"ers.ref_dr_percent as refDrPercent,ers.ref_dr_amount as refDrAmount,ers.ref_dr_id as refDrId," +
							"ers.service_assign_date as serviceAssignDate," +
							"ers.bill_receipt_master_id as billReceiptMasterId,erm.total_amt as totalBillAmount " +
							"from ehat_receipt_slave ers,ehat_receipt_master erm where ers.bill_receipt_master_id=erm.bill_receipt_id and ers.bill_details_id= :billDetailsId " +
							"and ers.deleted='N'";
					
					Query BRSQuery = sessionFactory.getCurrentSession().createSQLQuery(BRSQAll)
							.setResultTransformer(Transformers.aliasToBean(BillReceiptSlaveDTO.class));
					BRSQuery.setParameter("billDetailsId",pflistOther.get(i).getBillDetailsId());

					if(BRSQuery.list().size() > 0){
						objBRS = (BillReceiptSlaveDTO) BRSQuery.list().get(0);
						
						double slaveActAmount = pflistOther.get(i).getActualAmt();
						if(pflistOther.get(i).getChargesId() > 0 || pflistOther.get(i).getChargesSlaveId() > 0){
							slaveActAmount = pflistOther.get(i).getOtherAmount();
							pflistOther.get(i).setRate(pflistOther.get(i).getOtherRate());
							pflistOther.get(i).setActualAmt(pflistOther.get(i).getOtherRate() * pflistOther.get(i).getQuantity());
							
						}
						
						double masterActAmount = objBRS.getActualAmt();
						double actualFinalPaid = objBRS.getActualFinalPaid();
						//double actualFinalPayable = objBRS.getActualFinalPayable();
						double concessionPer = objBRS.getActualConcnPer();
						double discountPer = objBRS.getActualDiscPer();
						
						double slaveActAmtPer = slaveActAmount * 100/masterActAmount;
						double slaveActFinalPaid = slaveActAmtPer * actualFinalPaid /100;
						double slaveConcessionAmt = concessionPer * slaveActAmount /100;
						double payable = slaveActAmount - slaveConcessionAmt;
						double slaveDiscountAmt = discountPer * payable /100;
						double finalPayable = payable - slaveDiscountAmt;
						
						double refundPer = objBRS.getActualRefPer();
						double slaveRefundAmt = refundPer * slaveActFinalPaid/100;
						
						pflistOther.get(i).setActualConcnAmt(slaveConcessionAmt);
						pflistOther.get(i).setActualConcnPer(concessionPer);
						pflistOther.get(i).setActualDiscAmt(slaveDiscountAmt);
						pflistOther.get(i).setActualDiscPer(discountPer);
						pflistOther.get(i).setActualPayable(payable);
						pflistOther.get(i).setActualFinalPayable(finalPayable);
						pflistOther.get(i).setActualFinalPaid(slaveActFinalPaid);
						pflistOther.get(i).setRefundAmount(slaveRefundAmt);
						pflistOther.get(i).setRefundPer(refundPer);
						//pflistOther.get(i).setRefDrId(objBRS.getRefDrId());
						//pflistOther.get(i).setRefDrPercent(objBRS.getRefDrPercent());
						pflistOther.get(i).setServiceAssignDate(objBRS.getServiceAssignDate());
						pflistOther.get(i).setTotalBillAmount(objBRS.getTotalBillAmount());
						pflistOther.get(i).setBillReceiptMasterId(objBRS.getBillReceiptMasterId());
						pflistOther.get(i).setBillReceiptSlaveId(objBRS.getBillRecSlaveId());
					}
					
				}
				
				pflist.addAll(pflistOther);
			}
			
			//code for package profees ends		
			
			//profees calculation function call and return list
			pflist = profeesCalculationList(pflist,billTypeId);
		}

		profeesDoctorsPaymentDto.setListProFees(pflist);
		return profeesDoctorsPaymentDto;
	}
	
	
	
	public List<ProfeesDoctorsPaymentDto> profeesCalculationListIpd(
			List<ProfeesDoctorsPaymentDto> pflist, int billTypeId) {

		for (int i = 0; i < pflist.size(); i++) {
			int refDocId = pflist.get(i).getRefDrId();
			double refPfCut = 0;
			double refper = 0;
			double hospitalPercent = 0.0;
			double hospitalPercentInAmount = 0;
			double pfAmount = 0;
			double concessionInAmount = 0;
			double discountInAmount = 0;
			double hospDiscCutAmt = 0;
			double DrDiscCutAmt = 0;
			double refundInHospAmt = 0;
			double refundInPFAmt = 0;
			
			//condition for sponsor charges
			if(pflist.get(i).getChargesId() > 0 || pflist.get(i).getChargesSlaveId() > 0){
				pflist.get(i).setAmount(pflist.get(i).getOtherAmount());
				pflist.get(i).setRate(pflist.get(i).getOtherRate());
			}
			
			concessionInAmount = ((pflist.get(i).getAmount() * pflist.get(i).getConcessionPer()) / 100);
			
			discountInAmount = ((pflist.get(i).getAmount() * pflist.get(i).getDiscountPer()) / 100);
			pflist.get(i).setPaid(pflist.get(i).getAmount()-(concessionInAmount + discountInAmount));
			
			int chargesSlaveId = pflist.get(i).getChargesSlaveId();
			int drDeptId = Integer.parseInt(pflist.get(i).getDrDeptIdStr());
			if (pflist.get(i).getUnitId() > 0) {
				if (chargesSlaveId > 0) {
					int ctr = 0;

					List<Integer> ltSubCharges = new ArrayList<Integer>();
					ltSubCharges = fetchSuperCatofchargesSlave2(chargesSlaveId);
					for (int j = 0; j < ltSubCharges.size(); j++) {
						//Integer count1 = profeesCountChargesId(ltSubCharges.get(j), pflist.get(i)
					Integer count1 = profeesCountChargesId(chargesSlaveId, pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),
								pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), pflist.get(i)
										.getUnitId(), drDeptId);
						
						if (count1 > 0) {
							ctr++;
							//chargesSlaveId = ltSubCharges.get(j);
							chargesSlaveId = chargesSlaveId;
							break;
						}
					}
					if (ctr == 0) {
						for (int j = 0; j < ltSubCharges.size(); j++) {
							Integer count1 = profeesCountChargesId(
									ltSubCharges.get(j), pflist.get(i)
											.getDoctorId(), pflist.get(i)
											.getCaseType(), pflist.get(i)
											.getDeptId(), pflist.get(i)
											.getServiceId(), 0, drDeptId);

							if (count1 > 0) {
								ctr++;
								chargesSlaveId = ltSubCharges.get(j);
								break;
							}
						}
					}
				}

			} else {
				if (chargesSlaveId > 0) {

					List<Integer> ltSubCharges = new ArrayList<Integer>();
					ltSubCharges = fetchSuperCatofchargesSlave2(chargesSlaveId);
					for (int j = 0; j < ltSubCharges.size(); j++) {
						Integer count1 = profeesCountChargesId(ltSubCharges.get(j), pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),
								pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), 0, drDeptId);

						if (count1 > 0) {
							chargesSlaveId = ltSubCharges.get(j);
							break;
						}
					}
				}

			}
			// get the hospital cut percent for the perticular doctor
			Query qq = sessionFactory.getCurrentSession()
					.createSQLQuery(
						"SELECT ifnull(CASE WHEN(select count(*) from percent_master "
							+ "where doctor_id = :doctorId and case_type = :caseType "
							+ "and dept_id = :deptId and deleted='N' and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId > 0) "
							+ "THEN(select hosp_percent from percent_master where "
							+ "doctor_id = :doctorId and deleted='N' and case_type = :caseType and dept_id = :deptId and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId) "
							+ "ELSE (select hosp_percent from percent_master where doctor_id = :doctorId and deleted='N' and case_type = 0 "
							+ "and dept_id = :deptId and service_id = :serviceId and charges_slave_id = 0 and dr_dept_id = :drDeptId and unit_id = 0) END,0) AS hosp_percent ");

			qq.setParameter("doctorId", pflist.get(i).getDoctorId());
			qq.setParameter("caseType", pflist.get(i).getCaseType());
			qq.setParameter("deptId", pflist.get(i).getDeptId());
			qq.setParameter("serviceId", pflist.get(i).getServiceId());
			qq.setParameter("unitId", pflist.get(i).getUnitId());
			//qq.setParameter("chargesId", pflist.get(i).getChargesId());
			//qq.setParameter("chargesSlaveId", chargesSlaveId);
			qq.setParameter("chargesSlaveId", pflist.get(i).getChargesId());
			//System.out.println("............ pflist.get(i).getChargesId()..."+ pflist.get(i).getChargesId());
			qq.setParameter("drDeptId",pflist.get(i).getDrDeptIdStr());

			double hosp_percent = (Double) qq.uniqueResult();

			//fetch subservice percentage 
			double subServicePercent = fetchSubServicePercent(pflist.get(i).getDoctorId(),pflist.get(i).getCaseType(),pflist.get(i).getDeptId(),
					pflist.get(i).getSubServiceId(),pflist.get(i).getUnitId(),chargesSlaveId,pflist.get(i).getDrDeptIdStr());

			//If subservice percent is given use else use service percent
			if(subServicePercent > 0){
				hosp_percent = subServicePercent;
			}
			
			//Getting discount deduction from value 
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int discountDeductFrom =Integer.parseInt(resourceBundle.getObject("discountDeductFrom").toString());
			
			// if cut percent is available
			if (hosp_percent > 0) {
				hospitalPercent = hosp_percent;
			} else {// else Doctor will get 100%
				//hospitalPercent = 100.0;
				hospitalPercent = 0.0;
			}
			
			//calculating hosp and doctors cut/profees
			/*hospitalPercentInAmount = (((pflist.get(i).getAmount() - pflist.get(i).getRefundAmount()) * hospitalPercent) / 100);
			pfAmount = (pflist.get(i).getAmount()-pflist.get(i).getRefundAmount()) - hospitalPercentInAmount;*/
			hospitalPercentInAmount = ((pflist.get(i).getAmount() * hospitalPercent) / 100);
			pfAmount = pflist.get(i).getAmount() - hospitalPercentInAmount;
			
			//profees discount flow 0=both 1=hospital 2=surgeon
			if(discountDeductFrom == 1){//hosp will bare the discount
				hospitalPercentInAmount = hospitalPercentInAmount - (concessionInAmount + discountInAmount);
				
			}else if(discountDeductFrom == 2){//Doctor will bare the discount
				pfAmount = pfAmount - (concessionInAmount + discountInAmount);
				
			}else{//Doctor & hosp both will bare the discount
				
				//deducting disc% & concession% from hospital Amount
				hospDiscCutAmt = ((hospitalPercentInAmount * (pflist.get(i).getDiscountPer() + pflist.get(i).getConcessionPer()))/100);
				hospitalPercentInAmount = hospitalPercentInAmount - hospDiscCutAmt;
				
				//deducting disc% & concession% from Doctor Amount
				DrDiscCutAmt = ((pfAmount * (pflist.get(i).getDiscountPer() + pflist.get(i).getConcessionPer()))/100);
				pfAmount = pfAmount - DrDiscCutAmt;
			}
			//refund flow
			//if any refund would be thr that will be as a discount no need to add refund 
			//in calculation bcoz we are adding discount in calculation
			/*refundInHospAmt = (hospitalPercentInAmount * pflist.get(i).getRefundPer())/100;
			hospitalPercentInAmount = hospitalPercentInAmount - refundInHospAmt;
			
			refundInPFAmt = (pfAmount * pflist.get(i).getRefundPer())/100;
			pfAmount = pfAmount - refundInPFAmt;*/
			
			
			
			// calculation for referred patient
			if (refDocId > 0) {

				// query to fetch refdr percent from table

				Query q1 = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT ifnull(refDocPer,0) FROM hospitalaccinfo");
				
				refper = (Double) q1.uniqueResult();
				
				// query to fetch refdr percent from channelling doctor personal
				Query q2 = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(ref_doc_per,0) FROM chanelling_doctor where channDocId= :refDocId");
				q2.setParameter("refDocId", refDocId);
				
				double refper2 = (Double) q2.uniqueResult();
				
				//if channelling doctor percent is greater than zero then assign 
				//percent else remain hosp acc info percent
				if(refper2 > 0){
					refper = refper2;
				}
				
				/*// query to fetch refdr percent from doctor personal
				Query q2 = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(referal_percent,0) FROM doctor where Doctor_ID= :refDocId");
				q2.setParameter("refDocId", refDocId);
				
				double refper2 = (Double) q2.uniqueResult();
				
				//if doctor percent is greater than zero then assign 
				//percent else remain hosp acc info percent
				if(refper2 > 0){
					refper = refper2;
				}*/
				
				if (pflist.get(i).getServiceId() == 1) {// registration
					hospitalPercent = 100 - refper;
					refPfCut = (refper * pflist.get(i).getPaid()) / 100;

					hospitalPercentInAmount = pflist.get(i).getPaid() - refPfCut;
				} else {
					if (pfAmount > 0) {
						refPfCut = (refper * pfAmount) / 100;

						pfAmount = pfAmount - refPfCut;
					} else {
						hospitalPercent = 100 - refper;
						refPfCut = (refper * pflist.get(i).getPaid()) / 100;
						hospitalPercentInAmount = pflist.get(i).getPaid() - refPfCut;
					}
				}
			}

			// Setting values after calculations
			pflist.get(i).setPfAmount(pfAmount);
			pflist.get(i).setPfPaid(0.0);
			pflist.get(i).setPfUnpaid(pfAmount);
			pflist.get(i).setPfPaidStatus("unpaid");
			pflist.get(i).setRefDrPercent(refper);
			pflist.get(i).setRefDrAmount(refPfCut);
			pflist.get(i).setHospPercent(hospitalPercent);
			pflist.get(i).setHospPercentInAmount(hospitalPercentInAmount);
			pflist.get(i).setConcession(concessionInAmount);
			pflist.get(i).setDiscount(discountInAmount);

		}

		return pflist;
	}
	
	
	
	public List<ProfeesDoctorsPaymentDto> profeesCalculationList(
			List<ProfeesDoctorsPaymentDto> pflist,
			int billTypeId) {
		
		for(int i=0;i < pflist.size(); i++){
		
			int refDocId = pflist.get(i).getRefDrId();
			double refPfCut = 0;
			double refper = 0;
			double hospitalPercent = 0.0;
			double hospitalPercentInAmount = 0;
			double pfAmount = 0;
			int chargesSlaveId1 = pflist.get(i).getChargesSlaveId();
			//int drDeptId = Integer.parseInt(pflist.get(i).getDrDeptIdStr());
			String drDeptId = (pflist.get(i).getDrDeptIdStr());

			Integer chargesSlaveId=0;
			// added Rohini on 02_04_2024 for parent save id 
			Integer profeesDocId=0;
			profeesDocId =  pflist.get(i).getDoctorId();
			if(chargesSlaveId1 >0) {
			    chargesSlaveId = getReferalChargeSlaveId(chargesSlaveId1,profeesDocId);
			   
			    if(chargesSlaveId == 0) {
			    	chargesSlaveId = pflist.get(i).getChargesSlaveId();
			    }
			}else {
				 chargesSlaveId = chargesSlaveId1;
			}
			if (pflist.get(i).getUnitId() > 0) {
				if (chargesSlaveId > 0) {
					int ctr = 0;

					List<Integer> ltSubCharges = new ArrayList<Integer>();
					ltSubCharges = fetchSuperCatofchargesSlave2(chargesSlaveId);
					for (int j = 0; j < ltSubCharges.size(); j++) {
						/*Integer count1 = profeesCountChargesId(ltSubCharges.get(j), pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), pflist.get(i).getUnitId(), drDeptId);*/
						
						Integer count1 = profeesCountChargesIdNew(ltSubCharges.get(j), pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), pflist.get(i).getUnitId(), drDeptId);
						
						if (count1 > 0) {
							ctr++;
							chargesSlaveId = ltSubCharges.get(j);
							break;
						}
					}
					if (ctr == 0) {
						for (int j = 0; j < ltSubCharges.size(); j++) {
							//Integer count1 = profeesCountChargesId(
							Integer count1 = profeesCountChargesIdNew(
							ltSubCharges.get(j), pflist.get(i)
											.getDoctorId(), pflist.get(i)
											.getCaseType(), pflist.get(i)
											.getDeptId(), pflist.get(i)
											.getServiceId(), 0, drDeptId);

							if (count1 > 0) {
								ctr++;
								chargesSlaveId = ltSubCharges.get(j);
								break;
							}
						}
					}
				}

			} else {
				if (chargesSlaveId > 0) {

					List<Integer> ltSubCharges = new ArrayList<Integer>();
					ltSubCharges = fetchSuperCatofchargesSlave2(chargesSlaveId);
					for (int j = 0; j < ltSubCharges.size(); j++) {
						//Integer count1 = profeesCountChargesId(ltSubCharges.get(j), pflist.get(i)
						Integer count1 = profeesCountChargesIdNew(ltSubCharges.get(j), pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),
								pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), 0, drDeptId);

						if (count1 > 0) {
							chargesSlaveId = ltSubCharges.get(j);
							break;
						}
					}
				}

			}
			// get the hospital cut percent for the perticular doctor
			Query qq = sessionFactory.getCurrentSession().createSQLQuery(
		/*	"SELECT ifnull(CASE WHEN(select count(*) from percent_master "
					+"where doctor_id = :doctorId and case_type = :caseType "
					+"and dept_id = :deptId and deleted='N' and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId > 0) "
					+"THEN(select hosp_percent from percent_master where "
					+"doctor_id = :doctorId and deleted='N' and case_type = :caseType and dept_id = :deptId and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId) "
					+"ELSE (select hosp_percent from percent_master where doctor_id = :doctorId and deleted='N' and case_type = 0 "
					+"and dept_id = :deptId and service_id = :serviceId and charges_slave_id = 0 and dr_dept_id = :drDeptId and unit_id = 0) END,0) AS hosp_percent ");
			*/
					
					"SELECT ifnull(CASE WHEN(select count(*) from percent_master_referal_doc "
					+"where doctor_id = :doctorId and case_type = :caseType "
					+"and dept_id = :deptId and deleted='N' and service_id = :serviceId and charges_slave_id = :chargesSlaveId  and unit_id = :unitId > 0) "
					+"THEN(select hosp_percent from percent_master_referal_doc where "
					+"doctor_id = :doctorId and deleted='N' and case_type = :caseType and dept_id = :deptId and service_id = :serviceId and charges_slave_id = :chargesSlaveId and unit_id = :unitId) "
					+"ELSE (select hosp_percent from percent_master_referal_doc where doctor_id = :doctorId and deleted='N' and case_type = 0 "
					+"and dept_id = :deptId and service_id = :serviceId and charges_slave_id = 0  and unit_id = 0) END,0) AS hosp_percent ");
			
			
			qq.setParameter("doctorId", pflist.get(i).getDoctorId());
			qq.setParameter("caseType", pflist.get(i).getCaseType());
			qq.setParameter("deptId", pflist.get(i).getDeptId());
			qq.setParameter("serviceId", pflist.get(i).getServiceId());
			qq.setParameter("unitId", pflist.get(i).getUnitId());
			qq.setParameter("chargesSlaveId", chargesSlaveId);
			//qq.setParameter("drDeptId",pflist.get(i).getDrDeptIdStr());
			
			@SuppressWarnings("unchecked")
			double hosp_percent = (Double) qq.uniqueResult();
			
			//fetch subservice percentage 
			double subServicePercent = fetchSubServicePercent(pflist.get(i).getDoctorId(),pflist.get(i).getCaseType(),pflist.get(i).getDeptId(),
					pflist.get(i).getSubServiceId(),pflist.get(i).getUnitId(),chargesSlaveId,pflist.get(i).getDrDeptIdStr());

			//If subservice percent is given use else use service percent
			if(subServicePercent >= 0){
				hosp_percent = subServicePercent;
			}
			
			// if cut percent is available
			if (hosp_percent > 0) {
				hospitalPercent = hosp_percent;
			} else {// else Doctor will get 100%
				//hospitalPercent = 100.0;
				hospitalPercent = 0.0;
			}

			// calculate hospitalCut in amount
			//hospitalPercentInAmount = ((dto.getPaid() * hospitalPercent) / 100);
			
			//if(billTypeId == 1 || billTypeId == 3){
			if(billTypeId == 1){
				// calculate hospitalCut in amount
				hospitalPercentInAmount = (((pflist.get(i).getActualFinalPaid() - pflist.get(i).getRefundAmount()) * hospitalPercent) / 100);

				// calculate profees of doctor
				pfAmount = (pflist.get(i).getActualFinalPaid() - pflist.get(i).getRefundAmount())
						- hospitalPercentInAmount;
				
			}else if(billTypeId == 2 || billTypeId == 3 || billTypeId == 4){
				// calculate hospitalCut in amount
				hospitalPercentInAmount = ((pflist.get(i).getActualFinalPayable() * hospitalPercent) / 100);
				
				// calculate profees of doctor
				pfAmount = pflist.get(i).getActualFinalPayable() - hospitalPercentInAmount;
			}
			
			// calculation for referred patient
			if (refDocId > 0) {

				// query to fetch refdr percent from hospital acc info
				Query q1 = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(refDocPer,0) FROM hospitalaccinfo");
				refper = (Double) q1.uniqueResult();
				
				// query to fetch refdr percent from channelling doctor personal
				Query q2 = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(ref_doc_per,0) FROM chanelling_doctor where channDocId= :refDocId");
				q2.setParameter("refDocId", refDocId);
				
				double refper2 = (Double) q2.uniqueResult();
				
				//if channelling doctor percent is greater than zero then assign 
				//percent else remain hosp acc info percent
				if(refper2 > 0){
					refper = refper2;
				}
				
				if (pflist.get(i).getServiceId() == 1) {// registration
					hospitalPercent = 100 - refper;
					refPfCut = (refper * pflist.get(i).getPaid()) / 100;

					hospitalPercentInAmount = pflist.get(i).getPaid() - refPfCut;
				} else {
					if (pfAmount > 0) {
						refPfCut = (refper * pfAmount) / 100;

						pfAmount = pfAmount - refPfCut;
					} else {
						hospitalPercent = 100 - refper;
						refPfCut = (refper * pflist.get(i).getPaid()) / 100;
						hospitalPercentInAmount = pflist.get(i).getPaid()
								- refPfCut;
					}
				}
			}

			// Setting values after calculations
			pflist.get(i).setPfAmount(pfAmount);
			pflist.get(i).setPfPaid(0.0);
			pflist.get(i).setPfUnpaid(pfAmount);
			pflist.get(i).setPfPaidStatus("unpaid");
			pflist.get(i).setRefDrPercent(refper);
			pflist.get(i).setRefDrAmount(refPfCut);
			pflist.get(i).setHospPercent(hospitalPercent);
			pflist.get(i).setHospPercentInAmount(hospitalPercentInAmount);
			
			//pflist.add(dto);
		}

		return pflist;
	}
	
	public List<Integer> fetchSuperCatofchargesSlave2(
			Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		
		//Calling stored procedure
		Query query = sessionFactory.getCurrentSession().createSQLQuery(
				"CALL  fetchSuperCatogoires (:chargesMasterDto)")
				.setParameter("chargesMasterDto", chargesMasterDto);
				String result =(String) query.uniqueResult();
				String[] ary = result.split(",");
				
				//converting string object into Integer
				List<Integer> ae =  new ArrayList<Integer>();
				for (int i = 0; i < ary.length; i++) {
					ae.add(Integer.parseInt(ary[i]));
				}
	
	return ae;
	}
	
	
	
	public int profeesCountChargesIdNew(int chargesSlaveId,int doctorId,int caseType,
			int deptId,int serviceId,int unitId,String drDeptId) {
		Integer count=0;
		try {
			
			int drDeptId1 = Integer.parseInt(drDeptId);
			Query qq = sessionFactory.getCurrentSession().createQuery
					("select count(*) from PercentMasterDto where doctorId =:doctorId and caseType =:caseType and deptId =:deptId " +
					"and deleted='N' and serviceId =:serviceId and chargesSlaveId =:chargesSlaveId and " +
					"drDeptId =:drDeptId and unitId =:unitId");
			
			qq.setParameter("doctorId", doctorId);
			qq.setParameter("caseType", caseType);
			qq.setParameter("deptId", deptId);
			qq.setParameter("serviceId", serviceId);
			qq.setParameter("chargesSlaveId", chargesSlaveId);
			qq.setParameter("drDeptId",drDeptId1);
			qq.setParameter("unitId", unitId);
		    count = ((Number) qq.uniqueResult()).intValue();
			
		} catch (Exception e) {
			e.printStackTrace();
			return count;
		}
		return count;
		
	}
	
	public int profeesCountChargesId(int chargesSlaveId,int doctorId,int caseType,
			int deptId,int serviceId,int unitId,int drDeptId) {
		Integer count=0;
		try {
			Query qq = sessionFactory.getCurrentSession().createQuery
					("select count(*) from PercentMasterDto where doctorId =:doctorId and caseType =:caseType and deptId =:deptId " +
					"and deleted='N' and serviceId =:serviceId and chargesSlaveId =:chargesSlaveId and " +
					"drDeptId =:drDeptId and unitId =:unitId");
			
			qq.setParameter("doctorId", doctorId);
			qq.setParameter("caseType", caseType);
			qq.setParameter("deptId", deptId);
			qq.setParameter("serviceId", serviceId);
			qq.setParameter("chargesSlaveId", chargesSlaveId);
			qq.setParameter("drDeptId",drDeptId);
			qq.setParameter("unitId", unitId);
		    count = ((Number) qq.uniqueResult()).intValue();
			
		} catch (Exception e) {
			e.printStackTrace();
			return count;
		}
		return count;
		
	}
	
	
	public double fetchSubServicePercent(int doctorId,int caseType,int deptId,
			int subServiceId, int unitId, int chargesSlaveId,
			String drDeptId) {

		double hosp_percent = 0;
		int ctr = 0;

		Integer subServCount = profeesCountSubServcId(doctorId, caseType,
				deptId, subServiceId, unitId, chargesSlaveId, drDeptId);
		if (subServCount > 0) {
			ctr++;
			// get the hospital cut percent for the perticular doctor
			Query qq = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select ifnull(CASE WHEN(select count(*) from percent_slave_referal_doc where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
									+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId " //+" and dr_dept_id = :drDeptId  "
									+" and unit_id = :unitId >0) " //
									+ "THEN(select hosp_percent from percent_slave_referal_doc where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
									+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId  " //+ " and dr_dept_id = :drDeptId " 
									+ " and unit_id = :unitId) "
									+ "ELSE (select hosp_percent from percent_slave_referal_doc where doctor_id =:doctorId and deleted = 'N' and case_type = 0 "
									+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = 0 " //+" and dr_dept_id = :drDeptId " 
									+ "and unit_id = 0) END,0) as hosp_percent");

			qq.setParameter("doctorId", doctorId);
			qq.setParameter("caseType", caseType);
			qq.setParameter("deptId", deptId);
			qq.setParameter("subServiceId", subServiceId);
			qq.setParameter("chargesSlaveId", chargesSlaveId);
		//	qq.setParameter("drDeptId", drDeptId);
			qq.setParameter("unitId", unitId);

			hosp_percent = (Double) qq.uniqueResult();
		} else {
			List<Integer> ltSubServId = new ArrayList<Integer>();
			ltSubServId = fetchSubServSuperList(subServiceId);
			for (int j = 0; j < ltSubServId.size(); j++) {
				Integer count1 = profeesCountSubServcId(doctorId, caseType,
						deptId, ltSubServId.get(j), unitId, chargesSlaveId, drDeptId);

				if (count1 > 0) {
					ctr++;
					
					// get the hospital cut percent for the perticular doctor
					Query qq = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"select ifnull(CASE WHEN(select count(*) from percent_slave_referal_doc where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
											+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId  and unit_id = :unitId >0) " // and dr_dept_id = :drDeptId
											+ "THEN(select hosp_percent from percent_slave_referal_doc where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
											+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId and unit_id = :unitId) " // and dr_dept_id = :drDeptId 
											+ "ELSE (select hosp_percent from percent_slave_referal_doc where doctor_id =:doctorId and deleted = 'N' and case_type = 0 "
											+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = 0  and unit_id = 0) END,0) as hosp_percent");// and dr_dept_id = :drDeptId

					qq.setParameter("doctorId", doctorId);
					qq.setParameter("caseType", caseType);
					qq.setParameter("deptId", deptId);
					qq.setParameter("subServiceId", ltSubServId.get(j));
                    qq.setParameter("chargesSlaveId", chargesSlaveId);
					//qq.setParameter("drDeptId", drDeptId);
					qq.setParameter("unitId", unitId);

					hosp_percent = (Double) qq.uniqueResult();
					
					break;
				}
			}
		}

		if(ctr > 0){
			return hosp_percent;
		}else{
			return -200;
		}
		
	}
	
	
	public int profeesCountSubServcId( int doctorId,int caseType, int deptId,
			int subServiceId, int unitId,int chargesSlaveId, String drDeptId) {
	int count = 0;
		try {
			String[] mstIds;
			ArrayList<Integer> masterChecked=new ArrayList<Integer>();	
			// get checked service masters
						/*if(drDeptId.length()>0){
							
							mstIds=drDeptId.split(",");
							for(String id:mstIds){
								
								masterChecked.add(Integer.parseInt(id));					
							}
						}*/
						
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PercentSlaveReferalDocDto.class);			
		criteria.add(Restrictions.eq("doctorId",doctorId));	
		criteria.add(Restrictions.eq("caseType", caseType));
		criteria.add(Restrictions.eq("deptId", deptId));
		criteria.add(Restrictions.eq("subServiceId", subServiceId));
		
		criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
		//criteria.add(Restrictions.not(Restrictions.in("drDeptId", masterChecked)));
		//criteria.add(Restrictions.eq("drDeptId", Integer.parseInt(drDeptId)));
		criteria.add(Restrictions.eq("unitId", unitId));
		
		//criteria.add(Restrictions.not(Restrictions.in("drDeptId", masterChecked)));
		 List<PercentSlaveReferalDocDto> percentSlaveDtolist = (List<PercentSlaveReferalDocDto>) criteria.list();	
		 count = (int) percentSlaveDtolist.stream().count();
		 
			if(count == 0){
				Query qqDefault = sessionFactory
						.getCurrentSession()
						.createQuery(
								"select count(*) from PercentSlaveReferalDocDto where doctorId =:doctorId and caseType =:caseType and deptId =:deptId "
										+ "and deleted='N' and subServiceId =:subServiceId and chargesSlaveId =:chargesSlaveId and "
									//	+ "drDeptId =:drDeptId and "
										+ " unitId =:unitId");

				qqDefault.setParameter("doctorId", doctorId);
				qqDefault.setParameter("caseType", 0);
				qqDefault.setParameter("deptId", deptId);
				qqDefault.setParameter("subServiceId", subServiceId);
				qqDefault.setParameter("chargesSlaveId", 0);
				//qqDefault.setParameter("drDeptId", Integer.parseInt(drDeptId));
				qqDefault.setParameter("unitId", 0);
				count = ((Number) qqDefault.uniqueResult()).intValue();
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return count;
		}
		return count;

	}
	
	
	public List<Integer> fetchSubServSuperList(Integer subServiceId) {

		// Calling stored procedure
		Query query = sessionFactory
				.getCurrentSession()
				.createSQLQuery("CALL  fetchSuperCatogoiresSubSrv (:subServId)")
				.setParameter("subServId", subServiceId);
		String result = (String) query.uniqueResult();
		String[] ary = result.split(",");

		// converting string object into Integer
		List<Integer> ae = new ArrayList<Integer>();
		for (int i = 0; i < ary.length; i++) {
			ae.add(Integer.parseInt(ary[i]));
		}

		return ae;
	}
	
	//added Rohini on 02-04-2024 for referal doc percent master parent chreges id 
	public Integer getReferalChargeSlaveId(int chargesSlaveId1,int profeesDocId) {
		// TODO Auto-generated method stub
		
		Integer profeesChargesSlaveid =0;
		try {
			
			Query q = sessionFactory.getCurrentSession().createSQLQuery("select ifnull(fun_get_charges_slave_id_referal("
			+chargesSlaveId1+","+profeesDocId+"),0)");
			profeesChargesSlaveid =	((Number) q.uniqueResult()).intValue();
		  
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return profeesChargesSlaveid;
	}
}
