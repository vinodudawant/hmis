package com.hms.ehat.dao.impl;


import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.dto.Doctor;
import com.hms.dto.HisabProFeesDTO;
import com.hms.dto.HisabProFeesReferDoctorDTO;
import com.hms.ehat.dao.ProfeesDao;
import com.hms.ehat.dto.AllPfPostedRecordsDto;
import com.hms.ehat.dto.AreaWisePatientViewDto;
import com.hms.ehat.dto.AreaWisePatientViewDto2;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.DrPaymentVoucherDto;
import com.hms.ehat.dto.DynamicGroupMasterDto;
import com.hms.ehat.dto.DynamicGroupSlaveDto;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.GroupMasterDto;
import com.hms.ehat.dto.GroupReceiptSlaveDetails;
import com.hms.ehat.dto.GroupSlaveDto;
import com.hms.ehat.dto.HospitalReport;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.PatientOutStandingReport;
import com.hms.ehat.dto.PercentMasterDto;
import com.hms.ehat.dto.PercentSlaveDto;
import com.hms.ehat.dto.ProfeesDoctorsPaymentDto;
import com.hms.ehat.dto.RefDoctorDTO;
import com.hms.ehat.dto.ReferDrPaymentVoucherDto;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipdbill.dto.BillReceiptSlaveDTO;
import com.hms.patient.util.ConfigUIJSONUtility;


@Repository
public class ProfeesDaoImpl implements ProfeesDao{

	@Autowired
	SessionFactory sessionFactory;

	DecimalFormat df = new DecimalFormat("0.00");
	
	@Override
	public DeptMasterDto fetchDeptAndServices() {

		DeptMasterDto deptMasterDto = new DeptMasterDto();
		try {
			
			List<DeptMasterDto> listDept = null;
			
			Criteria criteriaDept = sessionFactory.getCurrentSession()
					.createCriteria(DeptMasterDto.class);
			criteriaDept.add(Restrictions.eq("deleted", "N"));
			//criteriaDept.add(Restrictions.eq("isclinical", "Y"));
			//criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			listDept = criteriaDept.list();
			
			deptMasterDto.setLstDepts(listDept);
			
			List<ServiceMasterDto> listService = null;
			
			Criteria criteriaService = sessionFactory.getCurrentSession()
					.createCriteria(ServiceMasterDto.class);
			criteriaService.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			listService = criteriaService.list();
			
			deptMasterDto.setListService(listService);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return deptMasterDto;
	}

	// Irfan Khan @date: 19-July-2017 @reason : To save n update percentage
	@Override
	public int savePercentMaster(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,
			int drDeptId, String drDeptFlag,int chargesId,int chargesSlaveId) {
		int a = 0;
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction(); // initialize the transaction object from session
		try {
			if (callFrom.equalsIgnoreCase("insert")) {

				Query q = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT count(*) as count FROM percent_master where deleted='N' and " +
								"doctor_id =:doctorId and unit_id =:unitId and case_type=:caseType and " +
								"dr_dept_id=:drDeptId and charges_id=:chargesId and charges_slave_id=:chargesSlaveId");
				
				q.setParameter("doctorId", doctorId);
				q.setParameter("unitId", unitId);
				q.setParameter("caseType", caseType);
				q.setParameter("drDeptId", drDeptId);
				q.setParameter("chargesId", chargesId);
				q.setParameter("chargesSlaveId", chargesSlaveId);

				Integer count = ((Number) q.uniqueResult()).intValue();

				if (count == 0) {

					PercentMasterDto percentMasterDto2 = (PercentMasterDto) ConfigUIJSONUtility
							.getObjectFromJSON(percentMasterList,
									PercentMasterDto.class);

					for (int i = 0; i < percentMasterDto2.getListPerMaster()
							.size(); i++) {
						PercentMasterDto percentMasterDto = percentMasterDto2
								.getListPerMaster().get(i);
						percentMasterDto.setCreatedBy(userId);
						percentMasterDto.setCreatedDate(new Date(
								new java.util.Date().getTime()));
						percentMasterDto.setDeleted("N");
						percentMasterDto.setDoctorId(doctorId);
						percentMasterDto.setDrDeptId(drDeptId);
						percentMasterDto.setDrDeptFlag(drDeptFlag);
						percentMasterDto.setChargesId(chargesId);
						percentMasterDto.setChargesSlaveId(chargesSlaveId);

						session.save(percentMasterDto);
						if (i % 20 == 0) { // Same as the JDBC batch size
							// flush a batch of inserts and release memory:
							session.flush();
							session.clear();
						}
					}
					a = 1;
				} else {
					a = 3;
				}
			} else {
				Query alfa = session.createSQLQuery(
						"Delete from percent_master where doctor_id=:doctorId and unit_id=:unitId and " +
						"case_type=:caseType and dr_dept_id=:drDeptId and " +
						"charges_id=:chargesId and charges_slave_id=:chargesSlaveId");
				alfa.setParameter("doctorId", doctorId);
				alfa.setParameter("unitId", unitId);
				alfa.setParameter("caseType", caseType);
				alfa.setParameter("drDeptId", drDeptId);
				//alfa.setParameter("drDeptFlag", drDeptFlag);
				alfa.setParameter("chargesId", chargesId);
				alfa.setParameter("chargesSlaveId", chargesSlaveId);
				alfa.executeUpdate();

				PercentMasterDto percentMasterDto2 = (PercentMasterDto) ConfigUIJSONUtility
						.getObjectFromJSON(percentMasterList,
								PercentMasterDto.class);

				for (int i = 0; i < percentMasterDto2.getListPerMaster().size(); i++) {
					PercentMasterDto percentMasterDto = percentMasterDto2
							.getListPerMaster().get(i);
					percentMasterDto.setCreatedBy(userId);
					percentMasterDto.setCreatedDate(new Date(
							new java.util.Date().getTime()));
					percentMasterDto.setDeleted("N");
					percentMasterDto.setDoctorId(doctorId);
					percentMasterDto.setDrDeptId(drDeptId);
					percentMasterDto.setDrDeptFlag(drDeptFlag);
					percentMasterDto.setChargesId(chargesId);
					percentMasterDto.setChargesSlaveId(chargesSlaveId);

					// sessionFactory.getCurrentSession().merge(percentMasterDto);
					session.save(percentMasterDto);
					if (i % 20 == 0) { // Same as the JDBC batch size
						// flush a batch of inserts and release memory:
						session.flush();
						session.clear();
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
	
	// Irfan Khan @date: 22-Jan-2018 @reason : To save n update Advance percentage
	@Override
	public int savePercentMaster2(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,
			int drDeptId, String drDeptFlag, int chargesId, int chargesSlaveId) {
		int a = 0;
		Session session = sessionFactory.openSession(); // create session object
														// from the session
														// factory
		session.beginTransaction(); // initialize the transaction object from
									// session
		try {
			if (callFrom.equalsIgnoreCase("insert")) {

				Query q = session
						.createSQLQuery(
								"SELECT count(*) as count FROM percent_master where deleted='N' and "
										+ "doctor_id =:doctorId and unit_id =:unitId and case_type=:caseType and "
										+ "dr_dept_id=:drDeptId and charges_id=:chargesId and charges_slave_id=:chargesSlaveId");

				q.setParameter("doctorId", doctorId);
				q.setParameter("unitId", unitId);
				q.setParameter("caseType", caseType);
				q.setParameter("drDeptId", drDeptId);
				q.setParameter("chargesId", chargesId);
				q.setParameter("chargesSlaveId", chargesSlaveId);

				Integer count = ((Number) q.uniqueResult()).intValue();

				if (count == 0) {

					PercentMasterDto percentMasterDto2 = (PercentMasterDto) ConfigUIJSONUtility
							.getObjectFromJSON(percentMasterList,
									PercentMasterDto.class);

					for (int i = 0; i < percentMasterDto2.getListPerMaster()
							.size(); i++) {
						PercentMasterDto percentMasterDto3 = percentMasterDto2
								.getListPerMaster().get(i);
												
						for (int j = 0; j < percentMasterDto3.getSerIdList().size(); j++) {
							
							PercentMasterDto percentMasterDto = new PercentMasterDto();
							//int serviceId = percentMasterDto.getSerIdList().get(j);
							//Double servPer =  percentMasterDto.getSerIdListPer().get(j);
							//percentMasterDto.setDeptId(percentMasterDto.getDeptId());
							
							percentMasterDto.setCreatedBy(userId);
							percentMasterDto.setCreatedDate(new Date(
									new java.util.Date().getTime()));
							percentMasterDto.setDeleted("N");
							percentMasterDto.setDoctorId(doctorId);
							percentMasterDto.setDrDeptId(drDeptId);
							percentMasterDto.setDrDeptFlag(drDeptFlag);
							percentMasterDto.setCaseType(caseType);
							percentMasterDto.setUnitId(unitId);
							percentMasterDto.setChargesId(chargesId);
							percentMasterDto.setChargesSlaveId(chargesSlaveId);
							percentMasterDto.setDeptId(percentMasterDto3.getDeptId());
							percentMasterDto.setServiceId(percentMasterDto3.getSerIdList().get(j));
							percentMasterDto.setHospPercent(percentMasterDto3.getSerIdListPer().get(j));

							session.save(percentMasterDto);
							if (j % 20 == 0) { // Same as the JDBC batch size
								// flush a batch of inserts and release memory:
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
							
							PercentSlaveDto percentSlaveDto = new PercentSlaveDto();
													
							percentSlaveDto.setCreatedBy(userId);
							percentSlaveDto.setCreatedDate(new Date(
									new java.util.Date().getTime()));
							percentSlaveDto.setDeleted("N");
							percentSlaveDto.setDoctorId(doctorId);
							percentSlaveDto.setDrDeptId(drDeptId);
							percentSlaveDto.setDrDeptFlag(drDeptFlag);
							percentSlaveDto.setCaseType(caseType);
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
						.createSQLQuery("Delete from percent_master where doctor_id=:doctorId and unit_id=:unitId and "
								+ "case_type=:caseType and dr_dept_id=:drDeptId and "
								+ "charges_id=:chargesId and charges_slave_id=:chargesSlaveId");
				alfa.setParameter("doctorId", doctorId);
				alfa.setParameter("unitId", unitId);
				alfa.setParameter("caseType", caseType);
				alfa.setParameter("drDeptId", drDeptId);
				// alfa.setParameter("drDeptFlag", drDeptFlag);
				alfa.setParameter("chargesId", chargesId);
				alfa.setParameter("chargesSlaveId", chargesSlaveId);
				alfa.executeUpdate();
				
				
				PercentMasterDto percentMasterDto2 = (PercentMasterDto) ConfigUIJSONUtility
						.getObjectFromJSON(percentMasterList,
								PercentMasterDto.class);
				
				if(percentMasterDto2.getListPerMaster().get(0).getSubSerIdList().size() > 0){
					Query alfaSlave = session
							.createSQLQuery("Delete from percent_slave where doctor_id=:doctorId and unit_id=:unitId and "
									+ "case_type=:caseType and dr_dept_id=:drDeptId and "
									+ "charges_id=:chargesId and charges_slave_id=:chargesSlaveId and sub_service_id in(:subSerList)");
					alfaSlave.setParameter("doctorId", doctorId);
					alfaSlave.setParameter("unitId", unitId);
					alfaSlave.setParameter("caseType", caseType);
					alfaSlave.setParameter("drDeptId", drDeptId);
					// alfa.setParameter("drDeptFlag", drDeptFlag);
					alfaSlave.setParameter("chargesId", chargesId);
					alfaSlave.setParameter("chargesSlaveId", chargesSlaveId);
					alfaSlave.setParameterList("subSerList", percentMasterDto2.getListPerMaster().get(0).getSubSerIdList());
					alfaSlave.executeUpdate();
				}
				

				for (int i = 0; i < percentMasterDto2.getListPerMaster().size(); i++) {
					PercentMasterDto percentMasterDto3 = percentMasterDto2
							.getListPerMaster().get(i);
					
					for (int j = 0; j < percentMasterDto3.getSerIdList().size(); j++) {

						PercentMasterDto percentMasterDto = new PercentMasterDto();
						
						percentMasterDto.setCreatedBy(userId);
						percentMasterDto.setCreatedDate(new Date(
								new java.util.Date().getTime()));
						percentMasterDto.setDeleted("N");
						percentMasterDto.setDoctorId(doctorId);
						percentMasterDto.setDrDeptId(drDeptId);
						percentMasterDto.setDrDeptFlag(drDeptFlag);
						percentMasterDto.setCaseType(caseType);
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
						
						PercentSlaveDto percentSlaveDto = new PercentSlaveDto();
						
						percentSlaveDto.setCreatedBy(userId);
						percentSlaveDto.setCreatedDate(new Date(
								new java.util.Date().getTime()));
						percentSlaveDto.setDeleted("N");
						percentSlaveDto.setDoctorId(doctorId);
						percentSlaveDto.setDrDeptId(drDeptId);
						percentSlaveDto.setDrDeptFlag(drDeptFlag);
						percentSlaveDto.setCaseType(caseType);
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

	// Irfan Khan @date: 19-July-2017 @reason : To save n update percentage for Dr.Dept
	@Override
	public int savePercentMasterDrDept(String percentMasterList, Integer userId,
			int doctorId, int unitId, String callFrom, int caseType,
 int drDeptId, String drDeptFlag,int chargesId,int chargesSlaveId) {
		int a = 0;
		String all = "select Doctor_ID from doctor where specialisation=:drDeptId and status='Y'";
		Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
		q.setParameter("drDeptId", drDeptId);

		ArrayList<Integer> doctorIdList = (ArrayList<Integer>) q.list();
		if (doctorIdList.size() > 0) {
			for (int i = 0; i < doctorIdList.size(); i++) {
				a = savePercentMaster2(percentMasterList, userId,
						((Integer) doctorIdList.get(i)), unitId, callFrom,
						caseType, drDeptId, drDeptFlag,chargesId,chargesSlaveId);
			}
		} else {
			a = 4;//If doctor list is empty
		}
		return a;
	}
	
	// Irfan Khan @date: 19-July-2017 @reason : To Fetch all records
	@Override
	public PercentMasterDto fetchPercentRecords(int doctorId,int unitId,int caseType,String callFrom) {
		
		PercentMasterDto percentMasterDto = new PercentMasterDto();
		List<PercentMasterDto> listRecords = null;
		String all;
		
		if(callFrom.equalsIgnoreCase("search")){
			all= "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_name as unitName,"
					+"pm.unit_id as unitId,pm.case_type as caseType,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId FROM percent_master pm,doctor d where pm.deleted='N' "
					+"and pm.doctor_id="+doctorId+" and pm.doctor_id=d.Doctor_ID GROUP BY pm.doctor_id,pm.unit_id,pm.case_type";
		}else if(callFrom.equalsIgnoreCase("percentMaster")){
			all= "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_name as unitName,"
					+"pm.unit_id as unitId,pm.case_type as caseType,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId FROM percent_master pm,doctor d where pm.deleted='N' "
					+"and pm.doctor_id="+doctorId+" and pm.doctor_id=d.Doctor_ID and pm.unit_id="+unitId+" and pm.case_type="+caseType+" GROUP BY pm.doctor_id,pm.unit_id,pm.case_type";
		}else{
			all= "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_name as unitName,"
					+"pm.unit_id as unitId,pm.case_type as caseType,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId FROM percent_master pm,doctor d where pm.deleted='N' "
					+"and pm.doctor_id=d.Doctor_ID GROUP BY pm.doctor_id,pm.unit_id,pm.case_type";
		}
		
		Query q = sessionFactory
				.getCurrentSession()
				.createSQLQuery(all);
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		listRecords = q.list();
		
		percentMasterDto.setListPerMaster(listRecords);
		
		return percentMasterDto;
	}

	// Irfan Khan @date: 20-July-2017 @reason : To Fetch record by drid and unitid
	@Override
	public PercentMasterDto editPercentMaster(int doctorId, int unitId,int caseType,int chargesSlaveId) {
		PercentMasterDto percentMasterDto = new PercentMasterDto();
		List<PercentMasterDto> listRecords = null;
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(PercentMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("doctorId", doctorId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("caseType", caseType));
		criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
		
		listRecords = criteria.list();
		
		percentMasterDto.setListPerMaster(listRecords);
		
		return percentMasterDto;
	}

	// Irfan Khan @date: 12-Dec-2017 @reason : To Fetch record by Dr.Dept to edit and update
	@Override
	public PercentMasterDto updateDrDeptPercentMaster(int drDeptId, int unitId,
			int caseType,String drDeptFlag) {
		PercentMasterDto percentMasterDto = new PercentMasterDto();
		List<PercentMasterDto> listRecords = null;
		String all="select Doctor_ID from doctor where specialisation=:drDeptId and status='Y'";
		Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
		q.setParameter("drDeptId", drDeptId);

		ArrayList<Integer> doctorIdList = (ArrayList<Integer>) q.list();
		if(doctorIdList.size()>0){
			percentMasterDto = editPercentMasterNew(doctorIdList.get(0),unitId,caseType);
		}
		
		return percentMasterDto;
	}
		
		
	// Irfan Khan @date: 20-July-2017 @reason : To Delete percentage records = N
	@Override
	public int deletePercentRecord(Integer userId, int doctorId, int unitId, int caseType) {
		Query alfa = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"update percent_master set deleted='Y',deleted_by="+userId+" where doctor_id="
						+doctorId+" and unit_id="+unitId+" and case_type="+caseType);
		int result = alfa.executeUpdate();
		return 1;
	}

	// Irfan Khan @date: 24-July-2017 @reason : To fetch records of doctor for profees.
	@Override
	public ProfeesDoctorsPaymentDto proFeesDoctorPaymentOpd(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, String serviceId, Integer userId, int specialisationId,
			int billTypeId) {

		//creating object and list of pojo to return with list
		ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> pflist = new ArrayList<ProfeesDoctorsPaymentDto>();

		String all = "";
		String allbill = "";

		if (billTypeId == 1) {// clear_receipts_opd_view
			all = "SELECT billReceiptId FROM ehat_clear_receipts_opd_view WHERE date(created_date_time) between :fromDate and :toDate"
					+ " and department_id= :deptId";
			
			
			allbill = " select bill_id from ehat_bill_details where deleted = 'N' and (paid_amt + sponsor_paid) > 0 and date(created_date_time) between :fromDate and :toDate "
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
		
		Query qallbill = sessionFactory.getCurrentSession().createSQLQuery(allbill);
		qallbill.setParameter("fromDate", fromDate);
		qallbill.setParameter("toDate", toDate);
		qallbill.setParameter("deptId", deptId);

		ArrayList<Integer> allbillmasterId2 = (ArrayList<Integer>) qallbill.list();

		
		StringBuilder masterId3 = new StringBuilder();
		for (Integer s : masterId2) {
			masterId3.append(s);
			masterId3.append(",");
		}

		for (Integer s : allbillmasterId2) {
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
					+ "ifnull(rm.total_amt,0) as totalBillAmount,doc.doc_name as doctorName,doc.department as drDeptIdStr,ifnull(rv.actual_ref_amt,0) as refundAmount,ifnull(rv.actual_ref_per,0) as refundPer,"//doc.specialisation as drDeptIdStr,
					+ "rv.actual_amt as actualAmt,rv.actual_concn_per as actualConcnPer,rv.actual_concn_amt as actualConcnAmt,"
					//+ "rv.actual_payable as actualPayable,rv.actual_disc_per as actualDiscPer,rv.actual_disc_amt as actualDiscAmt, "
					
					// 15-03-2024
					+ " rv.actual_payable as actualPayable,rm.actual_disc_per AS actualDiscPer,rm.total_discount AS actualDiscAmt, "					
					+ " rv.actual_final_paid as actualFinalPaid, " 
					+ " rv.actual_final_payable as actualFinalPayable,"  //rm.payable as actualFinalPayable,
					+ "rm.source_type_id as chargesId,rm.sponsor_cat_id as chargesSlaveId, rv.profeesPercentage  , FN_GET_SPONSOR(rv.source_type_id) AS category_name"
					+ " from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,ehat_treatment t, "
					+ "ehat_receipt_slave rv,ehat_receipt_master rm,doctor doc where u.unit_id = rv.unit_id and d.dept_id = rv.department_id "
					+ "and s.service_id = rv.service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id and "
					+ "rv.bill_receipt_master_id = rm.bill_receipt_id and doc.Doctor_ID = rv.doctor_id  and rv.deleted='N' and pfVoucherFlag='N' and "
					+ "rv.bill_receipt_master_id in("
					+ masterId
					+ ") and rv.service_assign_date between :fromDate and :toDate "
					+ "and rv.doctor_id=:doctorId and rv.department_id= :deptId";

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
						+"and rv.department_id = :deptId and rv.doctor_id = :doctorId ";

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
	
	// Irfan Khan @date: 24-July-2017 @reason : To fetch paid records of doctor Ipd.
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
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and (total_remain - (select fn_get_total_paid_amt_sponser_paid(ehat_bill_master.treatment_id, 2)))  <= 0 and deleted='N' and date(created_date_time) between :fromDate and :toDate";
			} else if (billTypeId == 2) {// full_pending_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and (total_remain - (select fn_get_total_paid_amt_sponser_paid(ehat_bill_master.treatment_id, 2))) > 0 and (total_paid + (SELECT FN_GET_TOTAL_PAID_AMT_SPONSER_PAID(ehat_bill_master.treatment_id, 2))) = 0 and deleted='N' and date(created_date_time) between :fromDate and :toDate";//and total_remain > 0 and total_paid = 0
			} else if (billTypeId == 3) {// partial_pending_receipts_ipd_view
				all = "SELECT bill_id FROM ehat_bill_master where invoice_flag='Y' and department_id= :deptId and (total_remain - (select fn_get_total_paid_amt_sponser_paid(ehat_bill_master.treatment_id, 2)))  > 0 and (total_paid + (SELECT FN_GET_TOTAL_PAID_AMT_SPONSER_PAID(ehat_bill_master.treatment_id, 2))) > 0 and deleted='N' and date(created_date_time) between :fromDate and :toDate";// and total_remain > 0 and total_paid > 0 
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
					    +"ifnull(other_amount,0) as otherAmount,ifnull(other_concession,0) as otherConcession,ifnull(other_pay,0) as otherPay,ifnull(other_rate,0) as otherRate , FN_GET_SPONSOR(rv.charges_slave_id) AS category_name "
					    +" from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_patient p,"
					    +"ehat_treatment t,ehat_bill_details_ipd rv,ehat_bill_master rm,doctor doc  " // ,ehat_charges_master_slave cms
					    +"where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id "
					    +"and subs.id = rv.sub_service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id "
					    +"and doc.Doctor_ID = rv.doctor_id and rm.bill_id = rv.bill_id  and rv.deleted = 'N' and rv.pfVoucherFlag = 'N' "// and cms.id = rv.source_type_id
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
	
	//irfan khan call for profees calculation 2-aug-2017
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
			Integer chargesSlaveId=0;
			// added Rohini on 02_04_2024 for parent save id 
			Integer profeesDocId=0;
			profeesDocId =  pflist.get(i).getDoctorId();
			if(chargesSlaveId1 >0) {
			    chargesSlaveId = getProfeesChargeSlaveId(chargesSlaveId1,profeesDocId);
			   
			    if(chargesSlaveId == 0) {
			    	chargesSlaveId = pflist.get(i).getChargesSlaveId();
			    }
			}else {
				 chargesSlaveId = chargesSlaveId1;
			}
			
			//int drDeptId = Integer.parseInt(pflist.get(i).getDrDeptIdStr());
			String drDeptId = (pflist.get(i).getDrDeptIdStr());
			
			if (pflist.get(i).getUnitId() > 0) {
				if (chargesSlaveId > 0) {
					int ctr = 0;

					List<Integer> ltSubCharges = new ArrayList<Integer>();
					ltSubCharges = fetchSuperCatofchargesSlave2(chargesSlaveId);
					for (int j = 0; j < ltSubCharges.size(); j++) {
						/*Integer count1 = profeesCountChargesId(ltSubCharges.get(j), pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), pflist.get(i).getUnitId(), drDeptId);*/
						
						Integer count1 = profeesCountChargesIdNew(chargesSlaveId, pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), pflist.get(i).getUnitId(), drDeptId);
						
						if (count1 > 0) {
							ctr++;
							chargesSlaveId = chargesSlaveId;//ltSubCharges.get(j);
							break;
						}
					}
					if (ctr == 0) {
						for (int j = 0; j < ltSubCharges.size(); j++) {
							//Integer count1 = profeesCountChargesId(
							Integer count1 = profeesCountChargesIdNew(  chargesSlaveId //ltSubCharges.get(j)
									, pflist.get(i)
											.getDoctorId(), pflist.get(i)
											.getCaseType(), pflist.get(i)
											.getDeptId(), pflist.get(i)
											.getServiceId(), 0, drDeptId);

							if (count1 > 0) {
								ctr++;
								chargesSlaveId =chargesSlaveId; //ltSubCharges.get(j);
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
						Integer count1 = profeesCountChargesIdNew(chargesSlaveId //ltSubCharges.get(j)
								, pflist.get(i)
								.getDoctorId(), pflist.get(i).getCaseType(),
								pflist.get(i).getDeptId(), pflist.get(i)
										.getServiceId(), 0, drDeptId);

						if (count1 > 0) {
							chargesSlaveId = chargesSlaveId; //ltSubCharges.get(j);
							break;
						}
					}
				}

			}
			// get the hospital cut percent for the perticular doctor
			Query qq = sessionFactory.getCurrentSession().createSQLQuery(
			"SELECT ifnull(CASE WHEN(select count(*) from percent_master "
					+"where doctor_id = :doctorId and case_type = :caseType "
					+"and dept_id = :deptId and deleted='N' and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId > 0) "
					+"THEN(select hosp_percent from percent_master where "
					+"doctor_id = :doctorId and deleted='N' and case_type = :caseType and dept_id = :deptId and service_id = :serviceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId) "
					+"ELSE (select hosp_percent from percent_master where doctor_id = :doctorId and deleted='N' and case_type = 0 "
					+"and dept_id = :deptId and service_id = :serviceId and charges_slave_id = 0 and dr_dept_id = :drDeptId and unit_id = 0) END,0) AS hosp_percent ");
			
			qq.setParameter("doctorId", pflist.get(i).getDoctorId());
			qq.setParameter("caseType", pflist.get(i).getCaseType());
			qq.setParameter("deptId", pflist.get(i).getDeptId());
			qq.setParameter("serviceId", pflist.get(i).getServiceId());
			qq.setParameter("unitId", pflist.get(i).getUnitId());
			//qq.setParameter("chargesId", pflist.get(i).getChargesId());
			qq.setParameter("chargesSlaveId", chargesSlaveId);
			qq.setParameter("drDeptId",pflist.get(i).getDrDeptIdStr());
			
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
			
			
			// updated Rohini Ambhore for siddhivinayak requirement
			
			ResourceBundle resource = ResourceBundle.getBundle("hospitalaccess");
			String hospitalName = resource.getObject("hospitalname").toString();
			
			if(hospitalName.equalsIgnoreCase("Siddhivinayak")) {
				hospitalPercent = pflist.get(i).getProfeesPercentage();
			}
			
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
	
	
	// irfan khan call for profees IPD calculation 21-Nov-2017
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
			
			int chargesSlaveId1 = pflist.get(i).getChargesSlaveId();
			Integer chargesSlaveId=0;
			
			// added Rohini on 02_04_2024 for parent save id 
			Integer profeesDocId=0;
			profeesDocId =  pflist.get(i).getDoctorId();
			
			if(chargesSlaveId1 >0) {
			     chargesSlaveId = getProfeesChargeSlaveId(chargesSlaveId1,profeesDocId);
			     if(chargesSlaveId == 0) {
				    	chargesSlaveId = pflist.get(i).getChargesSlaveId();
				 }
			}else {
				 chargesSlaveId = chargesSlaveId1;
			}
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
			qq.setParameter("chargesSlaveId", chargesSlaveId);
			//qq.setParameter("chargesSlaveId", pflist.get(i).getChargesId());
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
	
	// irfan khan call for profees Count 21-Dec-2017
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
	
	// Irfan Khan @date: 7-Aug-2017 @reason : save voucher details
	@Override
	public int saveDrPaymentVoucher(String voucherDetails, Integer userId,
			int unitId, String profeesDetails) {
		int a = 1;
		Session session = null;
		session = sessionFactory.openSession();
		// Transaction tx = null;
		Transaction t = session.beginTransaction();
		try {

			DrPaymentVoucherDto drPaymentVoucherDto2 = (DrPaymentVoucherDto) ConfigUIJSONUtility
					.getObjectFromJSON(voucherDetails,
							DrPaymentVoucherDto.class);

			DrPaymentVoucherDto drPaymentVoucherDto = drPaymentVoucherDto2
					.getListVoucher().get(0);
			drPaymentVoucherDto.setCreatedBy(userId);
			drPaymentVoucherDto.setCreatedDateTime(new Date(
					new java.util.Date().getTime()));
			drPaymentVoucherDto.setCreatedDate(new Date(new java.util.Date()
					.getTime()));

			drPaymentVoucherDto.setDeleted("N");
			drPaymentVoucherDto.setUnitId(unitId);

			DrPaymentVoucherDto id = (DrPaymentVoucherDto) session
					.merge(drPaymentVoucherDto);

			int voucherId = id.getVoucherId();

			ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = (ProfeesDoctorsPaymentDto) ConfigUIJSONUtility
					.getObjectFromJSON(profeesDetails,
							ProfeesDoctorsPaymentDto.class);
			
			int chkDocId = 0;
			int groupMasterId = 0;
			for (int i = 0; i < profeesDoctorsPaymentDto.getListProFees()
					.size(); i++) {
				ProfeesDoctorsPaymentDto profeesObj = profeesDoctorsPaymentDto
						.getListProFees().get(i);

				if (chkDocId == 0 || chkDocId != profeesObj.getDoctorId()) {
					chkDocId = profeesObj.getDoctorId();
					groupMasterId = 0;
					
					Query q = sessionFactory.getCurrentSession()
							.createSQLQuery(
									"SELECT group_master_id FROM doctor where status='Y' and Doctor_ID = "
											+ profeesObj.getDoctorId());

					groupMasterId = ((Number) q.uniqueResult()).intValue();

				}

				// Group calculations starts
				if (groupMasterId > 0) {

					Query qGrName = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"SELECT group_name "
											+ "FROM profees_group_master where group_master_id="
											+ groupMasterId);

					String groupName = (String) qGrName.uniqueResult();

					// ArrayList drDetails = new ArrayList();
					Query qDrId = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"SELECT doctor_id "
											+ "FROM profees_group_slave where group_master_id="
											+ groupMasterId);

					ArrayList<Integer> drIdGs = (ArrayList<Integer>) qDrId
							.list();
					int countFlag = 0;
					for (Integer s : drIdGs) {
						Query qDrStatus = sessionFactory.getCurrentSession()
								.createSQLQuery(
										"select status from doctor where Doctor_ID="
												+ s);

						String qDrStatus2 = (qDrStatus.list().get(0))
								.toString();

						if (qDrStatus2.equalsIgnoreCase("N")) {
							countFlag++;
							break;
						}
					}
					
					if (countFlag > 0) {
						a = 4;// Doctors inactive in group master
						t.rollback();
						break;
					} else {

						if (profeesObj.getPfPaid() > profeesObj.getPfAmount()) {
							profeesObj.setHospPercentInAmount(profeesObj
									.getHospPercentInAmount()
									- profeesObj.getPfAddition());
						} else if (profeesObj.getPfPaid() < profeesObj
								.getPfAmount()) {
							profeesObj.setHospPercentInAmount(profeesObj
									.getHospPercentInAmount()
									+ profeesObj.getPfReduction());
						}

						if (profeesObj.getDeptId() == 2) {

							// iscombination is Y = package/ot
							if (profeesObj.getIscombination().equalsIgnoreCase(
									"Y")) {
								Query alfa = session
										.createSQLQuery("update ehat_other_bill_detail_for_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",pfVoucherFlag='Y',pfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ ",paid_package="
												+ profeesObj.getPaid()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId()
												+ " and other_bill_details_id_for_ipd="
												+ profeesObj
														.getOtherBillDIdIpd());

								int result = alfa.executeUpdate();

								List<EhatOtherBillDetailForIpdDto> listRecords = null;

								Criteria criteria = session
										.createCriteria(EhatOtherBillDetailForIpdDto.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq(
										"otherbildetailidipd",
										profeesObj.getOtherBillDIdIpd()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								// gs.setBillRecSlaveId(listRecords.get(0).getBillRecSlaveId());
								gs.setBillRecSlaveId(0);
								// gs.setBillReceiptMasterId(listRecords.get(0).getBillReceiptMasterId());
								gs.setBillReceiptMasterId(0);
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatienttId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								// gs.setCompName(listRecords.get(0).getSubservicesname());
								gs.setUnitId(listRecords.get(0).getUnitId());
								// gs.setAgainstId(listRecords.get(0).getAgainstId());
								// gs.setClinicalnotes(listRecords.get(0).getClinicalnote());
								// gs.setInstructions(listRecords.get(0).getInstructions());
								// gs.setUrgentflag(listRecords.get(0).getUrgentfla());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								// gs.setPaid(listRecords.get(0).getPaid());
								// gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								// gs.setRefundAmt(listRecords.get(0).getRefundAmt());
								// gs.setRefundFlag(listRecords.get(0).getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getCreatedDateTime());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								// gs.setDoctorPaymentFlag(listRecords.get(0).getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								// gs.setPatientName(listRecords.get(0).getPatientName());
								// gs.setUnitName(listRecords.get(0).getUnitName());
								// gs.setDeptName(listRecords.get(0).getDeptName());
								// gs.setServiceName(listRecords.get(0).getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession().
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);

								}

								// End Package

							} else {
								Query alfa = session
										.createSQLQuery("update ehat_bill_details_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",pfVoucherFlag='Y',pfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();

								List<BillDetailsIpdDto> listRecords = null;

								Criteria criteria = session
										.createCriteria(BillDetailsIpdDto.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq("billDetailsId",
										profeesObj.getBillDetailsId()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								// gs.setBillRecSlaveId(listRecords.get(0).getBillRecSlaveId());
								gs.setBillRecSlaveId(0);
								// gs.setBillReceiptMasterId(listRecords.get(0).getBillReceiptMasterId());
								gs.setBillReceiptMasterId(0);
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatienttId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								gs.setCompName(listRecords.get(0)
										.getSubservicesname());
								gs.setUnitId(listRecords.get(0).getUnitId());
								// gs.setAgainstId(listRecords.get(0).getAgainstId());
								// gs.setClinicalnotes(listRecords.get(0).getClinicalnote());
								// gs.setInstructions(listRecords.get(0).getInstructions());
								// gs.setUrgentflag(listRecords.get(0).getUrgentfla());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								// gs.setPaid(listRecords.get(0).getPaid());
								// gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								// gs.setRefundAmt(listRecords.get(0).getRefundAmt());
								// gs.setRefundFlag(listRecords.get(0).getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getCreatedDateTime());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								// gs.setDoctorPaymentFlag(listRecords.get(0).getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								// gs.setPatientName(listRecords.get(0).getPatientName());
								// gs.setUnitName(listRecords.get(0).getUnitName());
								// gs.setDeptName(listRecords.get(0).getDeptName());
								// gs.setServiceName(listRecords.get(0).getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession().
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);

								}
							}

							// percentMasterDto.setListPerMaster(listRecords);

							// GroupReceiptSlaveDetails gRSDObj =

						} else {

							// iscombination is Y = package/ot
							if (profeesObj.getIscombination().equalsIgnoreCase(
									"Y")) {
								// Query alfa =
								// sessionFactory.getCurrentSession()
								
								Query alfa = session
										.createSQLQuery("update ehat_other_bill_detail_for_opd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",pfVoucherFlag='Y',pfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ ",paid_package="
												+ profeesObj.getPaid()
												+ " where other_bill_details_id_for_Opd="
												+ profeesObj
														.getOtherBillDIdOpd()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();

								// Group Master Payment calculations starts here
								BillReceiptSlaveDTO billReceiptSlaveDTO = new BillReceiptSlaveDTO();
								List<EhatOtherBillDetailForOpdDto> listRecords = null;

								// Criteria criteria =
								// sessionFactory.getCurrentSession()
								Criteria criteria = session
										.createCriteria(EhatOtherBillDetailForOpdDto.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq(
										"otherBillDetailsId",
										profeesObj.getOtherBillDIdOpd()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								// gs.setBillRecSlaveId(listRecords.get(0).getBillRecSlaveId());
								// gs.setBillReceiptMasterId(listRecords.get(0).getBillReceiptMasterId());
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatienttId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								// gs.setCompName(listRecords.get(0).getCompName());
								gs.setUnitId(listRecords.get(0).getUnitId());
								// gs.setAgainstId(listRecords.get(0).getAgainstId());
								gs.setClinicalnotes(listRecords.get(0)
										.getClinicalnotes());
								gs.setInstructions(listRecords.get(0)
										.getInstructions());
								gs.setUrgentflag(listRecords.get(0)
										.getUrgentflag());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								gs.setPaid(listRecords.get(0).getPaidPackage());
								// gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								//gs.setRefundAmt(listRecords.get(0).getRefund());
								// gs.setRefundFlag(listRecords.get(0).getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getCreatedDateTime());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								// gs.setDoctorPaymentFlag(listRecords.get(0).getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								// gs.setPatientName(listRecords.get(0).getPatientName());
								// gs.setUnitName(listRecords.get(0).getUnitName());
								// gs.setDeptName(listRecords.get(0).getDeptName());
								// gs.setServiceName(listRecords.get(0).getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession()
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);
								}
								// package end

							} else {

								// iscombination is N = rest all service
								Query alfa = session
										.createSQLQuery("update ehat_receipt_slave set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",pfVoucherFlag='Y',pfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ " where bill_rec_slave_id="
												+ profeesObj
														.getBillReceiptSlaveId()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();

								// Group Master Payment calculations starts here
								BillReceiptSlaveDTO billReceiptSlaveDTO = new BillReceiptSlaveDTO();
								List<BillReceiptSlaveDTO> listRecords = null;

								// Criteria criteria =
								// sessionFactory.getCurrentSession()
								Criteria criteria = session
										.createCriteria(BillReceiptSlaveDTO.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq("billRecSlaveId",
										profeesObj.getBillReceiptSlaveId()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								gs.setBillRecSlaveId(listRecords.get(0)
										.getBillRecSlaveId());
								gs.setBillReceiptMasterId(listRecords.get(0)
										.getBillReceiptMasterId());
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatientId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								gs.setCompName(listRecords.get(0).getCompName());
								gs.setUnitId(listRecords.get(0).getUnitId());
								gs.setAgainstId(listRecords.get(0)
										.getAgainstId());
								gs.setClinicalnotes(listRecords.get(0)
										.getClinicalnotes());
								gs.setInstructions(listRecords.get(0)
										.getInstructions());
								gs.setUrgentflag(listRecords.get(0)
										.getUrgentflag());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								gs.setPaid(listRecords.get(0).getPaid());
								gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								gs.setRefundAmt(listRecords.get(0)
										.getRefundAmt());
								gs.setRefundFlag(listRecords.get(0)
										.getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getServiceAssignDate());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								gs.setDoctorPaymentFlag(listRecords.get(0)
										.getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								gs.setPatientName(listRecords.get(0)
										.getPatientName());
								gs.setUnitName(listRecords.get(0).getUnitName());
								gs.setDeptName(listRecords.get(0).getDeptName());
								gs.setServiceName(listRecords.get(0)
										.getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession()
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);
								}
								// package end
							}

						}

					}
					a = 1;
				} else {

					if (profeesObj.getPfPaid() > profeesObj.getPfAmount()) {
						profeesObj.setHospPercentInAmount(profeesObj
								.getHospPercentInAmount()
								- profeesObj.getPfAddition());
					} else if (profeesObj.getPfPaid() < profeesObj
							.getPfAmount()) {
						profeesObj.setHospPercentInAmount(profeesObj
								.getHospPercentInAmount()
								+ profeesObj.getPfReduction());
					}

					if (profeesObj.getDeptId() == 2) {

						// if iscombination=Y
						if (profeesObj.getIscombination().equalsIgnoreCase("Y")) {
							
							//to check service is leaf or package 
							String surgeryQuery="SELECT count(*) FROM ehat_other_bill_detail_for_ipd where bill_details_id=:billDetailsId ";
							Query qSurgery = sessionFactory.getCurrentSession().createSQLQuery(surgeryQuery);
							qSurgery.setParameter("billDetailsId",profeesObj.getBillDetailsId() );

							Integer surgeryBillDetailsIdCount = ((Number) qSurgery.uniqueResult()).intValue();
							
							if(surgeryBillDetailsIdCount > 0){//for package/other bill details
								Query alfa = session
										.createSQLQuery("update ehat_other_bill_detail_for_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",pfVoucherFlag='Y',pfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ ",paid_package="
												+ profeesObj.getPaid()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId()
												+ " and other_bill_details_id_for_ipd="
												+ profeesObj.getOtherBillDIdIpd());

								int result = alfa.executeUpdate();
								
							}else{//if service is leaf
								Query alfa = session
										.createSQLQuery("update ehat_bill_details_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",pfVoucherFlag='Y',pfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();
							}
							
						} else {
							Query alfa = session
									.createSQLQuery("update ehat_bill_details_ipd set hospAmount="
											+ profeesObj
													.getHospPercentInAmount()
											+ ",pfAmount="
											+ profeesObj.getPfAmount()
											+ ",pfPaid="
											+ profeesObj.getPfPaid()
											+ ",pfUnpaid="
											+ profeesObj.getPfUnpaid()
											+ ",pfReduction="
											+ profeesObj.getPfReduction()
											+ ",pfVoucherFlag='Y',pfVoucherId="
											+ voucherId
											+ ",pfAddition="
											+ profeesObj.getPfAddition()
											+ ",advance_flag='"
											+ profeesObj.getAdvanceFlag()
											+ "',actHospAmount="
											+ profeesObj.getActHospAmount()
											+ ",ref_dr_id="
											+ profeesObj.getRefDrId()
											+ ",ref_dr_percent="
											+ profeesObj.getRefDrPercent()
											+ ",ref_dr_amount="
											+ profeesObj.getRefDrAmount()
											+ " where bill_details_id="
											+ profeesObj.getBillDetailsId()
											+ " and department_id="
											+ profeesObj.getDeptId());

							int result = alfa.executeUpdate();
						}

					} else {

						// iscombination is Y = package/ot
						if (profeesObj.getIscombination().equalsIgnoreCase("Y")) {

							Query alfa = session
									.createSQLQuery("update ehat_other_bill_detail_for_opd set hospAmount="
											+ profeesObj
													.getHospPercentInAmount()
											+ ",pfAmount="
											+ profeesObj.getPfAmount()
											+ ",pfPaid="
											+ profeesObj.getPfPaid()
											+ ",pfUnpaid="
											+ profeesObj.getPfUnpaid()
											+ ",pfReduction="
											+ profeesObj.getPfReduction()
											+ ",pfVoucherFlag='Y',pfVoucherId="
											+ voucherId
											+ ",pfAddition="
											+ profeesObj.getPfAddition()
											+ ",advance_flag='"
											+ profeesObj.getAdvanceFlag()
											+ "',actHospAmount="
											+ profeesObj.getActHospAmount()
											+ ",ref_dr_id="
											+ profeesObj.getRefDrId()
											+ ",ref_dr_percent="
											+ profeesObj.getRefDrPercent()
											+ ",ref_dr_amount="
											+ profeesObj.getRefDrAmount()
											+ ",paid_package="
											+ profeesObj.getPaid()
											+ " where other_bill_details_id_for_Opd="
											+ profeesObj.getOtherBillDIdOpd()
											+ " and department_id="
											+ profeesObj.getDeptId());

							int result = alfa.executeUpdate();

						} else {

							// Query alfa = sessionFactory.getCurrentSession()
							Query alfa = session
									.createSQLQuery("update ehat_receipt_slave set hospAmount="
											+ profeesObj
													.getHospPercentInAmount()
											+ ",pfAmount="
											+ profeesObj.getPfAmount()
											+ ",pfPaid="
											+ profeesObj.getPfPaid()
											+ ",pfUnpaid="
											+ profeesObj.getPfUnpaid()
											+ ",pfReduction="
											+ profeesObj.getPfReduction()
											+ ",pfVoucherFlag='Y',pfVoucherId="
											+ voucherId
											+ ",pfAddition="
											+ profeesObj.getPfAddition()
											+ ",advance_flag='"
											+ profeesObj.getAdvanceFlag()
											+ "',actHospAmount="
											+ profeesObj.getActHospAmount()
											+ ",ref_dr_id="
											+ profeesObj.getRefDrId()
											+ ",ref_dr_percent="
											+ profeesObj.getRefDrPercent()
											+ ",ref_dr_amount="
											+ profeesObj.getRefDrAmount()
											+ " where bill_rec_slave_id="
											+ profeesObj
													.getBillReceiptSlaveId()
											+ " and department_id="
											+ profeesObj.getDeptId());

							int result = alfa.executeUpdate();

						}
					}
					a = 1;
				}

			}

			// Added by vinod (Hisab entry) start
			int res = saveProfeesVoucherHisab(voucherId, drPaymentVoucherDto,
					session);
			// Added by vinod (Hisab entry) end

			t.commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally { // Transaction t = session.getTransaction();
			session.close();
		}

		return a;
	}
	

	// Max value of any coloumn
	public int maxCountOfColumn(@SuppressWarnings("rawtypes") Class className,
			String columnName) {

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(className)
				.setProjection(Projections.max(columnName));
		Integer maxAge = (Integer) criteria.uniqueResult();
		if (maxAge == null) {
			maxAge = 0;
		}
		return maxAge;
	}

	@Override
	public DrPaymentVoucherDto fetchDoctorsVouchers(String callFrom,
			int doctorId, int unitId, int deptId, java.sql.Date fromDate,
			java.sql.Date toDate) {

		
		List<DrPaymentVoucherDto> listVoucher = null;

		DrPaymentVoucherDto objVoucher = new DrPaymentVoucherDto();

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DrPaymentVoucherDto.class);
		if (callFrom.equalsIgnoreCase("cancel")) {
			criteria.add(Restrictions.eq("deleted", "Y"));
		}else{
			criteria.add(Restrictions.eq("deleted", "N"));
		}

		if (callFrom.equalsIgnoreCase("search")) {
			criteria.add(Restrictions.eq("doctorId", doctorId));
			criteria.add(Restrictions.between("createdDate",
					fromDate, toDate));
			if (unitId > 0) {
				criteria.add(Restrictions.eq("unitId", unitId));
			}
			if (deptId > 0) {
				criteria.add(Restrictions.eq("deptId", deptId));
			}
		}
		criteria.addOrder(Order.desc("voucherId"));
		
		listVoucher = criteria.list();
		objVoucher.setListVoucher(listVoucher);
		
		return objVoucher;
	}

	// Irfan Khan @date: 16-Aug-2017 @reason : To Cancel Voucher
	@Override
	public int cancelVoucher(Integer userId, int voucherId, int deptId) {
		int a=0;
		Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
				"update ehat_doctors_payment_voucher set deleted='Y',deletedBy="+userId
				+",deletedDateTime=now() where voucherId="+voucherId);
		
		int result = alfa.executeUpdate();
		
		Query alfaGroup = sessionFactory.getCurrentSession().createSQLQuery(
				"DELETE  FROM profees_group_receipt_slave WHERE pfVoucherId="+voucherId);
		
				/*"update profees_group_receipt_slave set deleted='Y',deletedBy="+userId
				+",deletedDateTime=now() where pfVoucherId="+voucherId);*/
		
		int resultGroup = alfaGroup.executeUpdate();
		
		if(deptId == 2){
			Query alfaIpd = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_bill_details_ipd set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,pfVoucherFlag='N' where pfVoucherId="+voucherId);
			
			int resultIpd = alfaIpd.executeUpdate();
			
			Query alfaPkg = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_other_bill_detail_for_ipd set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,pfVoucherFlag='N' where pfVoucherId="+voucherId);
			
			int resultPkg = alfaPkg.executeUpdate();
			a=1;
		}else if(deptId > 0 && deptId != 2){
			Query alfaOpd = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_receipt_slave set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,pfVoucherFlag='N' where pfVoucherId="+voucherId);
			
			int resultOpd = alfaOpd.executeUpdate();
			
			Query alfaPkg = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_other_bill_detail_for_opd set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,pfVoucherFlag='N' where pfVoucherId="+voucherId);
			
			int resultPkg = alfaPkg.executeUpdate();
			
			a=1;
		}
		
		return a;
	}

	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@Override
	public ProfeesDoctorsPaymentDto proFeesDoctorsReport(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, int serviceId, Integer userId) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> listProFees = new ArrayList<ProfeesDoctorsPaymentDto>();
		List<ProfeesDoctorsPaymentDto> listProFees2 = new ArrayList<ProfeesDoctorsPaymentDto>();

		String slaveQuery = "select u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
				+ "concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,doc.doc_name as doctorName "
				+ ",rv.bill_rec_slave_id as billReceiptSlaveId,ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,rv.bill_receipt_master_id as billReceiptMasterId,"
				+ "rv.comp_name as componentName,ifnull(rv.actual_concn_amt,0) as concession,ifnull(rv.actual_concn_per,0) as concessionPer,ifnull(rv.actual_disc_amt,0) as discount,ifnull(rv.actual_disc_per,0) as discountPer,rv.deleted as deleted,rv.department_id as deptId,rv.doctor_id as doctorId,ifnull(rv.actual_final_paid,0) as paid,"
				+ "rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,rv.service_assign_date as serviceAssignDate,rv.service_id as serviceId,rv.source_type_id as sourceTypeId,rv.sub_service_id as subServiceId,"
				+ "rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.refund_flag as refundFlag,rv.pfVoucherFlag as pfVoucherFlag,"
				+ "ifnull(rv.hospAmount,0) as hospAmount,ifnull(rv.actHospAmount,0) as actHospAmount,ifnull(rv.pfAmount,0) as pfAmount,ifnull(rv.pfPaid,0) as pfPaid,ifnull(rv.pfUnpaid,0) as pfUnpaid,ifnull(rv.pfReduction,0) as pfReduction," 
				+ "ifnull(rv.pfAddition,0) as pfAddition,rv.pfVoucherId as pfVoucherId,ifnull(rm.total_amt,0) as totalBillAmount "
				+ "from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,ehat_treatment t, "
				+ "ehat_receipt_slave rv,ehat_receipt_master rm,doctor doc where u.unit_id = rv.unit_id and d.dept_id = rv.department_id "
				+ "and s.service_id = rv.service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id and "
				+ "rv.bill_receipt_master_id = rm.bill_receipt_id and doc.Doctor_ID=rv.doctor_id  and rv.deleted='N' and pfVoucherFlag='Y' and "
				+ "rv.service_assign_date between :fromDate and :toDate ";
				//+ "and rv.doctor_id=:doctorId ";

		if (doctorId > 0) {
			String byDoc = " and rv.doctor_id=:doctorId";
			slaveQuery = slaveQuery + byDoc;
		}
		if (unitId > 0) {
			String byUnit = " and rv.unit_id= :unitId";
			slaveQuery = slaveQuery + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and rv.department_id= :deptId";
			slaveQuery = slaveQuery + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and rv.service_id= :serviceId";
			slaveQuery = slaveQuery + byService;
		}

		Query qExe = sessionFactory.getCurrentSession().createSQLQuery(
				slaveQuery).setResultTransformer(Transformers.aliasToBean(ProfeesDoctorsPaymentDto.class));
		
		qExe.setParameter("fromDate", fromDate);
		qExe.setParameter("toDate", toDate);
		
		//qExe.setParameter("deptId", deptId);
		//qExe.setParameter("masterId", masterId);
		
		if (doctorId > 0) {
			qExe.setParameter("doctorId", doctorId);
		}
		if (unitId > 0) {
			qExe.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe.setParameter("serviceId", serviceId);
		}
		
		listProFees = qExe.list();
		
		//Package start
		
		String slaveQuery2 = "SELECT u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
				+"s.iscombination as iscombination,rv.other_bill_details_id_for_Opd as otherBillDIdOpd,subs.id as subServiceId,"
			    +"concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,t.ref_doc_id as refDrId,"
				+"ifnull(rv.amount, 0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,"
				+"concat(subs1.category_name,'-(',subs.category_name,')') as componentName,ifnull(rv.concession, 0) as concession,"
				+"ifnull(rv.concession_in_Perc, 0) as concessionPer,ifnull(rv.discount, 0) as discount,ifnull(rv.discount_per, 0) as discountPer,"
				+"ifnull(rv.pfAmount, 0) as pfAmount,ifnull(rv.pfPaid, 0) as pfPaid,ifnull(rv.pfUnpaid, 0) as pfUnpaid,"
				+"ifnull(rv.pfReduction, 0) as pfReduction,ifnull(rv.pfAddition, 0) as pfAddition,ifnull(rv.hospAmount, 0) as hospAmount,"
				+"date(rv.created_date_time) as serviceAssignDate,ifnull(rv.paid_package, 0) as paid,"
			    +"rv.deleted as deleted,rv.department_id as deptId,rv.doctor_id as doctorId,rv.patient_id as patientId,"
			    +"rv.quantity as quantity,ifnull(rv.rate, 0) as rate,rv.service_id as serviceId,rv.treatment_id as treatmentId,"
			    +"rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,doc.doc_name as doctorName,doc.department as drDeptIdStr,"
				+"rv.charges_id as chargesId,rv.chargesSlave_id as chargesSlaveId,bm.total_bill as totalBillAmount,"
				+"ifnull(rv.other_amount,0) as otherAmount,ifnull(rv.other_concession,0) as otherConcession,ifnull(rv.other_pay,0) as otherPay,ifnull(rv.other_rate,0) as otherRate "
				+" FROM ehat_other_bill_detail_for_opd rv,ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,"
			    +"ehat_treatment t,ehat_subservice subs,ehat_subservice subs1,ehat_bill_master bm,doctor doc where "
				+"u.unit_id = rv.unit_id and d.dept_id = rv.department_id and s.service_id = rv.service_id and p.patient_id = rv.patient_id "
			    +"and t.treatment_id = rv.treatment_id and doc.Doctor_ID = rv.doctor_id and bm.bill_id = rv.bill_id "
				+"and subs.id = rv.sub_service_id and subs1.id = rv.child_sub_service_id and rv.deleted = 'N' and rv.pfVoucherFlag = 'Y' "
				+"and date(rv.created_date_time) between :fromDate and :toDate and rv.department_id = :deptId ";
			//	+" and rv.doctor_id = :doctorId ";

		if (doctorId > 0) {
			String byDoc = " and rv.doctor_id=:doctorId";
			slaveQuery2 = slaveQuery2 + byDoc;
		}
		if (unitId > 0) {
			String byUnit = " and rv.unit_id= :unitId";
			slaveQuery2 = slaveQuery2 + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and rv.department_id= :deptId";
			slaveQuery2 = slaveQuery2 + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and rv.service_id= :serviceId";
			slaveQuery2 = slaveQuery2 + byService;
		}

		Query qExe2 = sessionFactory.getCurrentSession().createSQLQuery(
				slaveQuery2).setResultTransformer(Transformers.aliasToBean(ProfeesDoctorsPaymentDto.class));
		
		qExe2.setParameter("fromDate", fromDate);
		qExe2.setParameter("toDate", toDate);
		
		//qExe.setParameter("deptId", deptId);
		//qExe.setParameter("masterId", masterId);
		
		if (doctorId > 0) {
			qExe2.setParameter("doctorId", doctorId);
		}
		if (unitId > 0) {
			qExe2.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe2.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe2.setParameter("serviceId", serviceId);
		}
		
		listProFees2 = qExe2.list();
		
		//Package end
		listProFees.addAll(listProFees2);
	
		objDto.setListProFees(listProFees);
	return objDto;
	}
	
	// Irfan Khan @date: 14-Dec-2017 @reason : To fetch doctors report ipd
	@Override
	public ProfeesDoctorsPaymentDto proFeesDoctorsReportIpd(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, int serviceId, Integer userId) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> listProFees = new ArrayList<ProfeesDoctorsPaymentDto>();
		List<ProfeesDoctorsPaymentDto> listProFees2 = new ArrayList<ProfeesDoctorsPaymentDto>();

		String slaveQuery = "select u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
				+ "concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,doc.doc_name as doctorName "
				+ ",ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,rv.concession_per as concessionPer,rv.discount_per as discountPer,"
				+ "subs.category_name as componentName,ifnull(rv.concession,0) as concession,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) discount,rv.doctor_id as doctorId,"
				+ "ifnull((rv.amount-(rv.concession+rv.discount)),0) as paid,rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.source_type_id as sourceTypeId,rv.sub_service_id as subServiceId,"
				+ "rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,"
				+ "ifnull(rv.hospAmount,0) as hospAmount,ifnull(rv.actHospAmount,0) as actHospAmount,ifnull(rv.pfAmount,0) as pfAmount,ifnull(rv.pfPaid,0) as pfPaid,ifnull(rv.pfUnpaid,0) as pfUnpaid,ifnull(rv.pfReduction,0) as pfReduction,"
				+ "ifnull(rv.pfAddition,0) as pfAddition,rv.pfVoucherId as pfVoucherId,ifnull(rm.total_bill,0) as totalBillAmount "
				+ "from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_patient p,ehat_treatment t, "
				+ "ehat_bill_details_ipd rv,ehat_bill_master rm,doctor doc where rv.bill_id=rm.bill_id and u.unit_id = rv.unit_id and d.dept_id = rv.department_id and subs.id=rv.sub_service_id "
				+ "and s.service_id = rv.service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id and "
				+ " rv.deleted='N' and pfVoucherFlag='Y' and doc.Doctor_ID = rv.doctor_id and "
				+ "date(rv.created_date_time) between :fromDate and :toDate ";
				//+ "and rv.doctor_id=:doctorId ";

		if (doctorId > 0) {
			String byDoc = " and rv.doctor_id=:doctorId";
			slaveQuery = slaveQuery + byDoc;
		}
		if (unitId > 0) {
			String byUnit = " and rv.unit_id= :unitId";
			slaveQuery = slaveQuery + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and rv.department_id= :deptId";
			slaveQuery = slaveQuery + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and rv.service_id= :serviceId";
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
		
		// qExe.setParameter("deptId", deptId);
		// qExe.setParameter("masterId", masterId);

		if (doctorId > 0) {
			qExe.setParameter("doctorId", doctorId);
		}
		if (unitId > 0) {
			qExe.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe.setParameter("serviceId", serviceId);
		}

		listProFees = qExe.list();
		//Package start
		
		String slaveQuery2 = "select u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
				+ "concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType,doc.doc_name as doctorName "
				+ ",ifnull(rv.amount,0) as amount,rv.bill_details_id as billDetailsId,rv.bill_id as billId,rv.concession_per as concessionPer,rv.discount_per as discountPer,"
				+ "concat(subs1.category_name,'-(',subs.category_name,')') as componentName,ifnull(rv.concession,0) as concession,rv.deleted as deleted,rv.department_id as deptId,ifnull(rv.discount,0) as discount,rv.doctor_id as doctorId,"
				//+ "ifnull((rv.amount-(rv.concession+rv.discount)),0) as paid,"
				+"rv.patient_id as patientId,rv.quantity as quantity,ifnull(rv.rate,0) as rate,date(rv.created_date_time) as serviceAssignDate,rv.service_id as serviceId,rv.source_type_id as sourceTypeId,rv.sub_service_id as subServiceId,"
				+ "rv.treatment_id as treatmentId,rv.unit_id as unitId,rv.pfVoucherFlag as pfVoucherFlag,ifnull(rv.paid_package, 0) as paid,"
				+ "ifnull(rv.hospAmount,0) as hospAmount,ifnull(rv.actHospAmount,0) as actHospAmount,ifnull(rv.pfAmount,0) as pfAmount,ifnull(rv.pfPaid,0) as pfPaid,ifnull(rv.pfUnpaid,0) as pfUnpaid,ifnull(rv.pfReduction,0) as pfReduction,"
				+ "ifnull(rv.pfAddition,0) as pfAddition,rv.pfVoucherId as pfVoucherId,ifnull(rm.total_bill,0) as totalBillAmount "
				+ "from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_subservice subs,ehat_subservice subs1,ehat_patient p,ehat_treatment t, "
				+ "ehat_other_bill_detail_for_ipd rv,ehat_bill_master rm,doctor doc where rv.bill_id=rm.bill_id and u.unit_id = rv.unit_id and d.dept_id = rv.department_id and subs.id=rv.sub_service_id "
				+ "and subs1.id = rv.child_sub_service_id and s.service_id = rv.service_id and p.patient_id = rv.patient_id and t.treatment_id = rv.treatment_id and "
				+ " rv.deleted='N' and pfVoucherFlag='Y' and doc.Doctor_ID = rv.doctor_id and "
				+ "date(rv.created_date_time) between :fromDate and :toDate ";
			//	+ "and rv.doctor_id=:doctorId ";

		if (doctorId > 0) {
			String byDoc = " and rv.doctor_id=:doctorId";
			slaveQuery = slaveQuery + byDoc;
		}
		if (unitId > 0) {
			String byUnit = " and rv.unit_id= :unitId";
			slaveQuery2 = slaveQuery2 + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and rv.department_id= :deptId";
			slaveQuery2 = slaveQuery2 + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and rv.service_id= :serviceId";
			slaveQuery2 = slaveQuery2 + byService;
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
		// qExe.setParameter("deptId", deptId);
		// qExe.setParameter("masterId", masterId);

		if (doctorId > 0) {
			qExe.setParameter("doctorId", doctorId);
		}
		if (unitId > 0) {
			qExe2.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe2.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe2.setParameter("serviceId", serviceId);
		}

		listProFees2 = qExe2.list();
		
		//Package End
		
		listProFees.addAll(listProFees2);
		
		objDto.setListProFees(listProFees);
		return objDto;
	}

	/*// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@Override
	public ProfeesDoctorsPaymentDto proFeesAllDocReport(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, int serviceId, Integer userId,int drDeptId) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> listProfees = new ArrayList<ProfeesDoctorsPaymentDto>();

		String slaveQuery = "select rv.unit_id as unitId,u.unit_name as unitName,rv.department_id as deptId,"
			    +"d.dept_name as deptName,rv.doctor_id as doctorId,doc.doc_name as doctorName,ifnull(truncate(sum(rv.actual_amt),2),0) as amount,"
			    +"ifnull(truncate(sum(rv.actual_concn_amt),2),0) as concession,rv.deleted as deleted,ifnull(truncate(sum(rv.actual_disc_amt),2),0) discount,"
			    +"ifnull(truncate(sum(rv.actual_final_paid),2),0) as paid,ifnull(truncate(sum(rv.actHospAmount),2),0) as actHospAmount,ifnull(truncate(sum(rv.hospAmount),2),0) as hospAmount,"
			    +"ifnull(truncate(sum(rv.pfAmount),2),0) as pfAmount,ifnull(truncate(sum(rv.pfPaid),2),0) as pfPaid,ifnull(truncate(sum(rv.pfUnpaid),2),0) as pfUnpaid,"
			    +"ifnull(truncate(sum(rv.pfReduction),2),0) as pfReduction,ifnull(truncate(sum(rv.pfAddition),2),0) as pfAddition"
			    +" from ehat_unit_master u,dept_master d,doctor doc,ehat_receipt_slave rv"
			    +" where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and doc.Doctor_ID = rv.doctor_id"
			    +" and rv.deleted = 'N' and rv.pfVoucherFlag='Y' and rv.service_assign_date between :fromDate and :toDate ";	

		if (unitId > 0) {
			String byUnit = " and rv.unit_id= :unitId";
			slaveQuery = slaveQuery + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and rv.department_id= :deptId";
			slaveQuery = slaveQuery + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and rv.service_id= :serviceId";
			slaveQuery = slaveQuery + byService;
		}
		
		if (doctorId > 0) {
			String byDoc = " and rv.doctor_id=:doctorId";
			slaveQuery = slaveQuery + byDoc;
		}
		if (drDeptId > 0) {
			String byDocDepId = " and doc.specialisation =:drDeptId";
			slaveQuery = slaveQuery + byDocDepId;
		}
		String byDocGroup = " group by rv.doctor_id";
		slaveQuery = slaveQuery + byDocGroup;

		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(
						Transformers.aliasToBean(ProfeesDoctorsPaymentDto.class));

		qExe.setParameter("fromDate", fromDate);
		qExe.setParameter("toDate", toDate);
		
		// qExe.setParameter("deptId", deptId);
		// qExe.setParameter("masterId", masterId);

		if (unitId > 0) {
			qExe.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe.setParameter("serviceId", serviceId);
		}
		if (doctorId > 0) {
			qExe.setParameter("doctorId", doctorId);
		}
		if (drDeptId > 0) {
			qExe.setParameter("drDeptId", drDeptId);
		}

		listProfees = qExe.list();
		objDto.setListProFees(listProfees);
		return objDto;
	}*/
	
	//Irfan khan 29-Mar-2018 Fetch All doctors profees posted records
	@Override
	public ProfeesDoctorsPaymentDto allPfPostedRecords(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, int serviceId, int drDeptId) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> listProfees = new ArrayList<ProfeesDoctorsPaymentDto>();

		String slaveQuery = "select ifnull(sum(tv.amount), 0) as amount,ifnull(sum(tv.concession), 0) as concession,"
				+ "ifnull(sum(tv.discount), 0) as discount,ifnull(sum(tv.refund), 0) as refund,ifnull(sum(tv.actHospAmount), 0) as actHospAmount,"
				+ "ifnull(sum(tv.hospAmount), 0) as hospAmount,ifnull(sum(tv.pfAmount), 0) as pfAmount,ifnull(sum(tv.pfPaid), 0) as pfPaid,"
				+ "ifnull(sum(tv.pfUnpaid), 0) as pfUnpaid,ifnull(sum(tv.pfReduction), 0) as pfReduction,ifnull(sum(tv.pfAddition), 0) as pfAddition,"
				+ "tv.doctor_id as doctorId,doc.doc_name as doctorName from "
				+ "ehat_view_all_pf_posted_records tv,doctor doc where tv.doctor_id = doc.Doctor_ID "
				+ "and date(tv.created_date_time) between :fromDate and :toDate and tv.advance_flag='N' ";

		if (unitId > 0) {
			String byUnit = " and tv.unit_id= :unitId";
			slaveQuery = slaveQuery + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and tv.department_id= :deptId";
			slaveQuery = slaveQuery + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and tv.service_id= :serviceId";
			slaveQuery = slaveQuery + byService;
		}

		if (doctorId > 0) {
			String byDoc = " and tv.doctor_id=:doctorId";
			slaveQuery = slaveQuery + byDoc;
		}
		/*if (drDeptId > 0) {
			String byDocDepId = " and doc.specialisation =:drDeptId";
			slaveQuery = slaveQuery + byDocDepId;
		}*/
		String byDocGroup = " group by tv.doctor_id";
		slaveQuery = slaveQuery + byDocGroup;

		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(
						Transformers
								.aliasToBean(ProfeesDoctorsPaymentDto.class));

		qExe.setParameter("fromDate", fromDate);
		qExe.setParameter("toDate", toDate);

		// qExe.setParameter("deptId", deptId);
		// qExe.setParameter("masterId", masterId);

		if (unitId > 0) {
			qExe.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe.setParameter("serviceId", serviceId);
		}
		if (doctorId > 0) {
			qExe.setParameter("doctorId", doctorId);
		}
		/*if (drDeptId > 0) {
			qExe.setParameter("drDeptId", drDeptId);
		}*/

		listProfees = qExe.list();
		objDto.setListProFees(listProfees);
		return objDto;
	}
	
	/*// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@Override
	public ProfeesDoctorsPaymentDto proFeesAllDocReportIpd(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, int serviceId, Integer userId, int drDeptId) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		List<ProfeesDoctorsPaymentDto> listProfees = new ArrayList<ProfeesDoctorsPaymentDto>();

		String slaveQuery = "select rv.unit_id as unitId,u.unit_name as unitName,rv.department_id as deptId,"
				+ "d.dept_name as deptName,rv.doctor_id as doctorId,doc.doc_name as doctorName,ifnull(truncate(sum(rv.amount),2),0) as amount,"
				+ "ifnull(truncate(sum(rv.concession),2),0) as concession,rv.deleted as deleted,ifnull(truncate(sum(rv.discount),2),0) discount,"
				+ "ifnull(truncate(sum(rv.hospAmount),2),0) as hospAmount,ifnull(truncate(sum(rv.actHospAmount),2),0) as actHospAmount,"
				+ "ifnull(truncate(sum(rv.pfAmount),2),0) as pfAmount,ifnull(truncate(sum(rv.pfPaid),2),0) as pfPaid,ifnull(truncate(sum(rv.pfUnpaid),2),0) as pfUnpaid,"
				+ "ifnull(truncate(sum(rv.pfReduction),2),0) as pfReduction,ifnull(truncate(sum(rv.pfAddition),2),0) as pfAddition,"
				+ "ifnull(truncate(sum(rv.amount-(rv.concession+rv.discount)),2),0) as paid"
				+ " from ehat_unit_master u,dept_master d,doctor doc,ehat_bill_details_ipd rv"
				+ " where u.unit_id = rv.unit_id and d.dept_id = rv.department_id and doc.Doctor_ID = rv.doctor_id"
				+ " and rv.deleted = 'N' and rv.pfVoucherFlag='Y' and date(rv.created_date_time) between :fromDate and :toDate ";

		if (unitId > 0) {
			String byUnit = " and rv.unit_id= :unitId";
			slaveQuery = slaveQuery + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and rv.department_id= :deptId";
			slaveQuery = slaveQuery + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and rv.service_id= :serviceId";
			slaveQuery = slaveQuery + byService;
		}

		if (doctorId > 0) {
			String byDoc = " and rv.doctor_id=:doctorId";
			slaveQuery = slaveQuery + byDoc;
		}
		if (drDeptId > 0) {
			String byDocDepId = " and doc.specialisation =:drDeptId";
			slaveQuery = slaveQuery + byDocDepId;
		}
		String byDocGroup = " group by rv.doctor_id";
		slaveQuery = slaveQuery + byDocGroup;

		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(
						Transformers
								.aliasToBean(ProfeesDoctorsPaymentDto.class));

		qExe.setParameter("fromDate", fromDate);
		qExe.setParameter("toDate", toDate);

		// qExe.setParameter("deptId", deptId);
		// qExe.setParameter("masterId", masterId);

		if (unitId > 0) {
			qExe.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe.setParameter("serviceId", serviceId);
		}
		if (doctorId > 0) {
			qExe.setParameter("doctorId", doctorId);
		}
		if (drDeptId > 0) {
			qExe.setParameter("drDeptId", drDeptId);
		}

		listProfees = qExe.list();
		objDto.setListProFees(listProfees);
		return objDto;
	}*/
		
	// Irfan Khan @date: 24-Aug-2017 @reason : save group details
	@Override
	public int saveGroupDetails(String groupSlaveDetails,
			String groupMasterDetails, Integer userId, String callFrom) {
		int a = 0;
		GroupMasterDto groupMasterDto2 = (GroupMasterDto) ConfigUIJSONUtility
				.getObjectFromJSON(groupMasterDetails, GroupMasterDto.class);

		GroupMasterDto groupMasterDto = groupMasterDto2.getListGroupMaster()
				.get(0);
		if (callFrom.equalsIgnoreCase("insert")) {
			groupMasterDto.setCreatedBy(userId);
			groupMasterDto.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			groupMasterDto.setDeleted("N");

			String groupName = groupMasterDto.getGroupName();
			sessionFactory.getCurrentSession().merge(groupMasterDto);

			int groupMasterId = maxCountOfColumn(GroupMasterDto.class,
					"groupMasterId");
			
			GroupSlaveDto groupSlaveDto2 = (GroupSlaveDto) ConfigUIJSONUtility
					.getObjectFromJSON(groupSlaveDetails, GroupSlaveDto.class);

			for (int i = 0; i < groupSlaveDto2.getListGroupSlave().size(); i++) {

				GroupSlaveDto groupSlaveDto = groupSlaveDto2
						.getListGroupSlave().get(i);

				groupSlaveDto.setGroupMasterId(groupMasterId);
				groupSlaveDto.setGroupName(groupName);
				groupSlaveDto.setCreatedBy(userId);
				groupSlaveDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				groupSlaveDto.setDeleted("N");

				sessionFactory.getCurrentSession().merge(groupSlaveDto);
			}

			/*
			 * Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
			 * "INSERT INTO doctor(doc_name,doc_Type,User_ID,specialisation,group_master_id) VALUES( '"
			 * + groupName + "', 'doctor',0,'0'," + groupMasterId + ")");
			 * 
			 * int resultOpd = alfa.executeUpdate();
			 */
			a = 1;
		} else if (callFrom.equalsIgnoreCase("update")) {

			groupMasterDto.setUpdatedBy(userId);
			groupMasterDto.setUpdatedDateTime(new Date(new java.util.Date()
					.getTime()));
			groupMasterDto.setDeleted("N");

			String groupName = groupMasterDto.getGroupName();
			sessionFactory.getCurrentSession().merge(groupMasterDto);

			Query bet = sessionFactory.getCurrentSession().createSQLQuery
                    ("DELETE  FROM profees_group_slave WHERE group_master_id="+groupMasterDto.getGroupMasterId());
           // bet.setParameter("gId", groupMasterDto.getGroupMasterId());
           int resultDelete= bet.executeUpdate();
           
           
			GroupSlaveDto groupSlaveDto2 = (GroupSlaveDto) ConfigUIJSONUtility
					.getObjectFromJSON(groupSlaveDetails, GroupSlaveDto.class);

			for (int i = 0; i < groupSlaveDto2.getListGroupSlave().size(); i++) {

				GroupSlaveDto groupSlaveDto = groupSlaveDto2
						.getListGroupSlave().get(i);

				groupSlaveDto.setGroupMasterId(groupMasterDto.getGroupMasterId());
				groupSlaveDto.setGroupName(groupName);
				groupSlaveDto.setCreatedBy(userId);
				groupSlaveDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				groupSlaveDto.setDeleted("N");

				sessionFactory.getCurrentSession().merge(groupSlaveDto);
			}
			Query alfaDoc = sessionFactory.getCurrentSession().createSQLQuery(
					"update doctor set doc_name='"+groupName+"' where group_master_id="+(groupMasterDto.getGroupMasterId()));

			int resultDoc = alfaDoc.executeUpdate();

			a = 2;
		
		}

		return a;
	}

	// Irfan Khan @date: 28-Aug-2017 @reason : To Group master
	@Override
	public GroupMasterDto fetchGroupMasterList(String callFrom, String letter) {
		GroupMasterDto groupMasterDto = new GroupMasterDto();
		List<GroupMasterDto> listGroupMaster = null;
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(GroupMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		
		if (callFrom.equalsIgnoreCase("search")) {
			criteria.add(Restrictions.like("groupName", "%" + letter + "%"));
		}
			
		listGroupMaster = criteria.list();
		
		groupMasterDto.setListGroupMaster(listGroupMaster);
		return groupMasterDto;
	}

	// Irfan Khan @date: 30-Aug-2017 @reason : To Group slave
	@Override
	public GroupSlaveDto fetchGroupSlaveList(int groupId) {
		GroupSlaveDto groupSlaveDto = new GroupSlaveDto();
		List<GroupSlaveDto> listGroupSlave = null;
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(GroupSlaveDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("groupMasterId", groupId));
		
		listGroupSlave = criteria.list();
		
		groupSlaveDto.setListGroupSlave(listGroupSlave);
		return groupSlaveDto;
	}

	// Irfan Khan @date: 30-Aug-2017 @reason : To Delete Group Master
	@Override
	public int deleteGroupMaster(Integer userId, int groupId) {
		Query alfa = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"update profees_group_master set deleted='Y',deleted_by="+userId+",deleted_date_time=now() where group_master_id="+groupId);
		int result = alfa.executeUpdate();
		
		Query alfa2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"update profees_group_slave set deleted='Y',deleted_by="+userId+",deleted_date_time=now() where group_master_id="+groupId);
		int result2 = alfa2.executeUpdate();
		
		Query alfa3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"update doctor set status='N' where group_master_id="+groupId);
		int result3 = alfa3.executeUpdate();
		
		return 1;
	}
	
	// Irfan Khan @date: 16-Aug-2017 @reason : To fetch doctors report
	@Override
	public GroupReceiptSlaveDetails proFeesGroupDoctorsReport(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, int serviceId, Integer userId) {

		GroupReceiptSlaveDetails ReceiptSlaveViewDto = new GroupReceiptSlaveDetails();
		List<GroupReceiptSlaveDetails> listReceiptSlaveViewDto = new ArrayList<GroupReceiptSlaveDetails>();

		String slaveQuery = "select u.unit_name as unitName,d.dept_name as deptName,s.service_name as serviceName,"
				+ "concat(p.f_name, ' ', p.l_name) as patientName,t.case_type as caseType "
				+ ",rv.billRecSlaveId as billRecSlaveId,rv.amount as amount,rv.billDetailsId as billDetailsId,rv.billId as billId,rv.billReceiptMasterId as billReceiptMasterId,"
				+ "rv.compName as compName,rv.concession as concession,rv.deleted as deleted,rv.departmentId as departmentId,rv.discount discount,rv.doctorId as doctorId,rv.paid as paid,"
				+ "rv.patientId as patientId,rv.quantity as quantity,rv.rate as rate,rv.serviceAssignDate as serviceAssignDate,rv.serviceId as serviceId,rv.sourceTypeId as sourceTypeId,rv.subServiceId as subServiceId,"
				+ "rv.treatmentId as treatmentId,rv.unitId as unitId,rv.refundFlag as refundFlag,rv.pfVoucherFlag as pfVoucherFlag,"
				+ "rv.hospAmount as hospAmount,rv.pfAmount as pfAmount,rv.pfPaid as pfPaid,rv.pfUnpaid as pfUnpaid,rv.pfReduction as pfReduction,"
				+ "rv.pfAddition as pfAddition,rv.pfVoucherId as pfVoucherId,rm.total_amt as totalBillAmount,"
				+ "rv.equalDrAmount as equalDrAmount,rv.individualDrAmount as individualDrAmount,rv.totalDrAmount as totalDrAmount,rv.groupName as groupName "
				+ "from ehat_unit_master u,dept_master d,ehat_service_master s,ehat_patient p,ehat_treatment t, "
				+ "profees_group_receipt_slave rv,ehat_receipt_master rm where u.unit_id = rv.unitId and d.dept_id = rv.departmentId "
				+ "and s.service_id = rv.serviceId and p.patient_id = rv.patientId and t.treatment_id = rv.treatmentId and "
				+ "rv.billReceiptMasterId = rm.bill_receipt_id  and rv.deleted='N' and rv.refundFlag='N' and rv.pfVoucherFlag='Y' and "
				+ "rv.serviceAssignDate between :fromDate and :toDate "
				+ "and rv.doctorId=:doctorId ";

		if (unitId > 0) {
			String byUnit = " and rv.unitId= :unitId";
			slaveQuery = slaveQuery + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and rv.departmentId= :deptId";
			slaveQuery = slaveQuery + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and rv.serviceId= :serviceId";
			slaveQuery = slaveQuery + byService;
		}

		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(
						Transformers.aliasToBean(GroupReceiptSlaveDetails.class));

		qExe.setParameter("fromDate", fromDate);
		qExe.setParameter("toDate", toDate);
		qExe.setParameter("doctorId", doctorId);
		// qExe.setParameter("deptId", deptId);
		// qExe.setParameter("masterId", masterId);

		if (unitId > 0) {
			qExe.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe.setParameter("serviceId", serviceId);
		}

		listReceiptSlaveViewDto = qExe.list();
		
		ReceiptSlaveViewDto.setListReceiptSlaveViewDto(listReceiptSlaveViewDto);
		return ReceiptSlaveViewDto;
	}

	// @author : Irfan Khan @date: 28-Sep-2017 @reason : Autosuggestion for doctor
	@Override
	public List<DoctorDto> setAutoSugForDoctorListAll(String letter,
			String callFrom) {
		List<DoctorDto> lisDoc = null;
		try {
			
			/*String slaveQuery = "SELECT Doctor_ID as Doctor_ID,doc_name as doc_name,specialisation as specialisation,"
					+ "doc_Type as doc_Type,  specializationName as specialisationName FROM doctor where status='Y' and doc_name like '%"
					+ letter + "%'";*/
			
			// updated Rohini For percentage master department on 21-02-2024
			String slaveQuery = "SELECT Doctor_ID as Doctor_ID,doc_name as doc_name,department as specialisation,"
					+ "doc_Type as doc_Type,  fn_get_doctor_department_name(department)  as specialisationName FROM doctor where status='Y' and doc_name like '%"
					+ letter + "%'";
			
			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(slaveQuery)
					.setResultTransformer(
							Transformers.aliasToBean(DoctorDto.class));

			// qExe.setParameter("letter", letter);

			lisDoc = qExe.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return lisDoc;
	}

	@Override
	public List<DoctorDto> setAutoSugForDoctorListDocType(String letter,
			String callFrom) {
		List<DoctorDto> lisDoc = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DoctorDto.class);
			
			//Restrictions in query
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.ilike("doc_name", letter+"%",MatchMode.START));
			
			lisDoc = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return lisDoc;
	}

	// Irfan Khan @date: 11-oct-2017 @reason : To Fetch all hosp specialisation
	@Override
	public HospitalSpecialisationDto getHospSpecialization() {
		HospitalSpecialisationDto object = new HospitalSpecialisationDto();
		try {
			
			List<HospitalSpecialisationDto> listHospSpcl = null;
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalSpecialisationDto.class);
			//criteria.add(Restrictions.eq("status", "Y"));//Y is active
			criteria.add(Restrictions.eq("deleted", "N"));
			listHospSpcl = criteria.list();
			object.setListHospSpcl(listHospSpcl);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return object;
	}

	//@author : Irfan Khan @date: 28-Sep-2017 @reason : Autosuggestion hosp specialisation wise doc list
	@Override
	public List<DoctorDto> setAutoSugForDocListSpcl(String letter,
			String callFrom, int specialisationId) {
		List<DoctorDto> lisDoc = null;
		try {
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DoctorDto.class);
			
			//Restrictions in query
			criteria.add(Restrictions.eq("status", "N"));
			criteria.add(Restrictions.ilike("doc_name", letter+"%",MatchMode.START));
			
			lisDoc = criteria.list();*/
			String slaveQuery = "";
			if (specialisationId > 0) {
				slaveQuery = "SELECT Doctor_ID as Doctor_ID,doc_name as doc_name,specialisation as specialisation,"
						+ "doc_Type as doc_Type FROM doctor where status='Y' and specialisation='"+specialisationId+"' and doc_name like '%"
						+ letter + "%'";
			} else {
				slaveQuery = "SELECT Doctor_ID as Doctor_ID,doc_name as doc_name,specialisation as specialisation,"
						+ "doc_Type as doc_Type FROM doctor where status='Y' and doc_name like '%"
						+ letter + "%'";
			}
			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(slaveQuery)
					.setResultTransformer(
							Transformers.aliasToBean(DoctorDto.class));

			//qExe.setParameter("letter", letter);

			lisDoc = qExe.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return lisDoc;
	}

	// Irfan Khan @date: 2-Nov-2017 @reason : To fetch paid records of All doctor opd.
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
	
	// Irfan Khan @date: 2-Nov-2017 @reason : To fetch paid records of All doctor ipd.
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
	
	/************
	* @author	: Vinod Udawant
	* @date		: 25-Oct-2017
	* @codeFor	: Save profees voucher in hisab
	*************/
	public int saveProfeesVoucherHisab(int vId,DrPaymentVoucherDto objDto,Session session) {
			
		try{
			
			String sql="select distinct doctor_id from ehat_receipt_slave where pfVoucherId="+vId+" and pfVoucherFlag='Y' and deleted='N' ";
			
		    SQLQuery query = session.createSQLQuery(sql);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    @SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillMaster = query.list();
			
		    for(Map<String, Object> row : listBillMaster){
			
		    	int docId=(Integer)row.get("doctor_id");
		    	sql="select sum(hospAmount),sum(pfAmount),sum(pfPaid) from ehat_receipt_slave where pfVoucherId="+vId+" and pfVoucherFlag='Y' and deleted='N' and doctor_id="+docId+" ";
		    	SQLQuery query2 = session.createSQLQuery(sql);
			    query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			    @SuppressWarnings("unchecked")
				List<Map<String, Object>> listBillMaster2 = query2.list();
				
			    for(Map<String, Object> row2 : listBillMaster2){
			    	
			    	HisabProFeesDTO hisabDto=new HisabProFeesDTO();
					hisabDto.setDeptId(objDto.getDeptId());
					hisabDto.setUnitId(objDto.getUnitId());
					hisabDto.setCreatedBy(objDto.getCreatedBy());
					hisabDto.setCreatedDate(objDto.getCreatedDate());
					hisabDto.setCreatedDateTime(objDto.getCreatedDateTime());
					hisabDto.setDeleted("N");		
					hisabDto.setDoctorId(docId);
					//hisabDto.setDoctorName(objDto.getDoctorName());
					hisabDto.setFromDate(objDto.getFromDate());
					hisabDto.setToDate(objDto.getToDate());				
					hisabDto.setTotalAmount(objDto.getTotalAmount());
					hisabDto.setTotalConcession(objDto.getTotalConcession());				
					hisabDto.setTotalPatPaid(objDto.getTotalPatPaid());
					
					hisabDto.setTotalHospAmount((Double)row2.get("sum(hospAmount)"));
					hisabDto.setTotalPfAmount((Double)row2.get("sum(pfAmount)"));
					hisabDto.setTotalPfPaid((Double)row2.get("sum(pfPaid)"));
					hisabDto.setVoucherId(vId);
					session.merge(hisabDto); // Save object
					hisabDto=null;
			    }	    	
		    }
		}catch(Exception e){
			
			e.printStackTrace();
			return 0;
		}
		
		return 1;		
	}
	
	@Override
	public HisabProFeesDTO fetchProFeesHisab(int unitId, int userId,
			int deptId, String fromDate, String toDate, int drId,int fromToRange) {
		
		HisabProFeesDTO obj = new HisabProFeesDTO();		
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		
		try {
			
			Date fdate = formatter.parse(fromDate);			
			Date tdate = formatter.parse(toDate);
				
			Criteria proFeesCr = sessionFactory.getCurrentSession().createCriteria(HisabProFeesDTO.class);	
			if(unitId > 0){
				
				proFeesCr.add(Restrictions.eq("unitId",unitId));	
				
			}if(userId > 0){
				
				proFeesCr.add(Restrictions.eq("createdBy",userId));	
				
			}if(deptId > 0){
				
				proFeesCr.add(Restrictions.eq("deptId",deptId));	
				
			}if(drId > 0){
				
				proFeesCr.add(Restrictions.eq("doctorId",drId));	
				
			}if(fromToRange > 0){
					
				proFeesCr.add(Restrictions.ge("createdDate", fdate)); 
				proFeesCr.add(Restrictions.le("createdDate", tdate));
			}
			
			@SuppressWarnings("unchecked")
			List<HisabProFeesDTO> listRecDetails = (List<HisabProFeesDTO>) proFeesCr.list();
			for(int i=0;i<listRecDetails.size();i++){
				
				SQLQuery query2 = sessionFactory.getCurrentSession().
						createSQLQuery("select ifnull(doc_name,'-') from doctor where status='Y' and Doctor_ID="+ listRecDetails.get(i).getDoctorId());			
				listRecDetails.get(i).setDoctorName((String) query2.uniqueResult());	
				
				SQLQuery query3 = sessionFactory.getCurrentSession().
						createSQLQuery("select ifnull(fixed_income,0) from doctor where status='Y' and Doctor_ID="+ listRecDetails.get(i).getDoctorId());			
				listRecDetails.get(i).setFixedIncome((Double) query3.uniqueResult());				
			}
			
			obj.setListVoucher(listRecDetails);		
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return obj;
	}

	// Irfan Khan @date: 8-Dec-2017 @reason : To fetch configured list of dr dept
	@Override
	public PercentMasterDto fetchConfgDrDeptList(String callFrom, String letter) {
		PercentMasterDto PercentMasterObj= new PercentMasterDto();
		List<PercentMasterDto> listPerMaster = new ArrayList<PercentMasterDto>();
		
		if(callFrom.equalsIgnoreCase("search")){
			String perMastQuery = "select hs.specialization_name as drDeptName, pm.dr_dept_id as drDeptId,pm.unit_id as " +
					  "unitId,pm.case_type as caseType,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId from percent_master pm,hospital_specialization hs where " +
					  "pm.dr_dept_id = hs.idhospital_Specialization and dr_dept_flag = 'P' and pm.deleted='N' and hs.specialization_name like :letter group by pm.unit_id,pm.case_type,dr_dept_id";
					  
			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(perMastQuery)
					.setResultTransformer(
							Transformers.aliasToBean(PercentMasterDto.class));
			qExe.setParameter("letter","%" +letter+"%");

			listPerMaster = qExe.list();
			PercentMasterObj.setListPerMaster(listPerMaster);
			
		}else{
		String perMastQuery = "select hs.specialization_name as drDeptName, pm.dr_dept_id as drDeptId,pm.unit_id as " +
							  "unitId,pm.case_type as caseType,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId from percent_master pm,hospital_specialization hs where " +
							  "pm.dr_dept_id = hs.idhospital_Specialization and dr_dept_flag = 'P' and pm.deleted='N' group by pm.unit_id,pm.case_type,dr_dept_id";
							  
		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(perMastQuery)
				.setResultTransformer(
						Transformers
								.aliasToBean(PercentMasterDto.class));
		
		//qExe.setParameter("fromDate", fromDate);
		listPerMaster = qExe.list();
		PercentMasterObj.setListPerMaster(listPerMaster);
		}
		return PercentMasterObj;
		
	}
	
	// Irfan Khan @date: 12-Dec-2017 @reason : To fetch configured list of doctor personal
	@Override
	public PercentMasterDto fetchConfgDrPersonalList(String callFrom, String callSearch, String letter) {
		PercentMasterDto PercentMasterObj = new PercentMasterDto();
		List<PercentMasterDto> listPerMaster = new ArrayList<PercentMasterDto>();

		String perMastQuery = "";
		if(callSearch.equalsIgnoreCase("search")){
			

			if(callFrom.equalsIgnoreCase("doctorPersonal")){
				perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
						+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0 and pm.charges_slave_id = 0 and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
			}
			else if(callFrom.equalsIgnoreCase("doctorPersonalSponser")){
				perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
						+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0 and pm.charges_slave_id <> 0 and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
			}
			else{
				perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
						+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName FROM percent_master pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
						+" and d.group_master_id > 0 and d.doc_name like :letter GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
			}
			

			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(perMastQuery)
					.setResultTransformer(
							Transformers.aliasToBean(PercentMasterDto.class));
			qExe.setParameter("letter","%" +letter+"%");
			// qExe.setParameter("fromDate", fromDate);
			listPerMaster = qExe.list();
			PercentMasterObj.setListPerMaster(listPerMaster);
			
			
		}else{
		if(callFrom.equalsIgnoreCase("doctorPersonal")){
			perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
					+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0    and pm.charges_slave_id = 0 GROUP BY pm.charges_slave_id, pm.doctor_id , pm.unit_id , pm.case_type";
		}
		else if(callFrom.equalsIgnoreCase("doctorPersonalSponser")){
			perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName  FROM percent_master pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
					+" and pm.dr_dept_flag != 'D' and d.group_master_id = 0 and pm.charges_slave_id <> 0 GROUP BY pm.charges_slave_id, pm.doctor_id , pm.unit_id , pm.case_type";
		}		
		else{
			perMastQuery = "SELECT pm.doctor_id as doctorId,d.doc_name as doctorName,pm.unit_id as unitId,pm.case_type as caseType,"
					+"pm.dr_dept_id as drDeptId,pm.charges_slave_id as chargesSlaveId,pm.charges_id as chargesId ,ifnull(fn_get_sponsor(pm.charges_slave_id),'') as sponserName FROM percent_master pm,doctor d where pm.deleted = 'N' and pm.doctor_id=d.Doctor_ID "
					+" and d.group_master_id > 0 GROUP BY  pm.charges_slave_id , pm.doctor_id , pm.unit_id , pm.case_type";
		}
		

		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(perMastQuery)
				.setResultTransformer(
						Transformers.aliasToBean(PercentMasterDto.class));

		// qExe.setParameter("fromDate", fromDate);
		listPerMaster = qExe.list();
		PercentMasterObj.setListPerMaster(listPerMaster);
		}
		return PercentMasterObj;
	}
		

	//@author : Irfan Khan @date: 11-Dec-2017 @reason : Autosuggestion for Group List
	@Override
	public List<GroupMasterDto> setAutoSugForGroupList(String letter) {
		List<GroupMasterDto> listGroup = null;
		try {
			
			String slaveQuery ="SELECT group_master_id as groupMasterId,group_name as groupName FROM profees_group_master where deleted='N' and group_name like '%"+letter+"%'";
			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(slaveQuery)
					.setResultTransformer(
							Transformers.aliasToBean(GroupMasterDto.class));

			//qExe.setParameter("letter", letter);

			listGroup = qExe.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return listGroup;
	}

	// Irfan Khan @date: 11-Dec-2017 @reason : To fetch Groups report
	@Override
	public GroupReceiptSlaveDetails profeesGroupWiseReport(int groupId,
			java.sql.Date fromDate, java.sql.Date toDate, int unitId,
			int deptId, int serviceId, Integer userId) {

		GroupReceiptSlaveDetails objDto = new GroupReceiptSlaveDetails();
		List<GroupReceiptSlaveDetails> listDto = new ArrayList<GroupReceiptSlaveDetails>();

		String slaveQuery = "SELECT gs.groupMasterId as groupMasterId,gs.doctorId as doctorId,d.doc_name as doctorName," +
					"ifnull(sum(gs.equalDrAmount),0) as equalDrAmount,ifnull(sum(gs.individualDrAmount),0) as individualDrAmount,"+
					"ifnull(sum(gs.totalDrAmount),0) as totalDrAmount FROM profees_group_receipt_slave gs,doctor d where gs.doctorId = d.Doctor_ID "+
					"and gs.groupMasterId =:groupId and gs.serviceAssignDate between :fromDate and :toDate and gs.deleted='N' ";

		if (unitId > 0) {
			String byUnit = " and gs.unitId= :unitId";
			slaveQuery = slaveQuery + byUnit;
		}
		if (deptId > 0) {
			String byDeptId = " and gs.departmentId= :deptId";
			slaveQuery = slaveQuery + byDeptId;
		}

		if (serviceId > 0) {
			String byService = " and gs.serviceId= :serviceId";
			slaveQuery = slaveQuery + byService;
		}
		slaveQuery = slaveQuery + " group by gs.doctorId";
		
		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(
						Transformers.aliasToBean(GroupReceiptSlaveDetails.class));

		qExe.setParameter("groupId", groupId);
		qExe.setParameter("fromDate", fromDate);
		qExe.setParameter("toDate", toDate);
		
		// qExe.setParameter("deptId", deptId);
		// qExe.setParameter("masterId", masterId);

		if (unitId > 0) {
			qExe.setParameter("unitId", unitId);
		}
		if (deptId > 0) {
			qExe.setParameter("deptId", deptId);
		}
		if (serviceId > 0) {
			qExe.setParameter("serviceId", serviceId);
		}

		listDto = qExe.list();
		objDto.setListReceiptSlaveViewDto(listDto);
		return objDto;
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

	//Irfan khan 2-Jan-2018 @reason : Single doctor summary report
	@Override
	public ProfeesDoctorsPaymentDto profeesSingleDocSummary(int doctorId,
			java.sql.Date fromDate, java.sql.Date toDate) {
		
		//Object of pojo
		ProfeesDoctorsPaymentDto mainObj = new ProfeesDoctorsPaymentDto();
		
		//Lists for OPD 
		List<BillReceiptSlaveDTO> listBillReceiptSlave = new ArrayList<BillReceiptSlaveDTO>();
		List<BillReceiptSlaveDTO> listBillReceiptSlaveCredit = new ArrayList<BillReceiptSlaveDTO>();
		
		//Lists for DIAGO
		List<BillReceiptSlaveDTO> listBillReceiptSlaveDiago = new ArrayList<BillReceiptSlaveDTO>();
		List<BillReceiptSlaveDTO> listBillReceiptSlaveDiagoCredit = new ArrayList<BillReceiptSlaveDTO>();
		
		//Lists for OPD & DIAGO package(other bill details)
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		
		//Lists for OPD & DIAGO Mediclaim Credit
		List<BillReceiptSlaveDTO> listBillOpdMediclaimCredit = new ArrayList<BillReceiptSlaveDTO>();
		List<BillReceiptSlaveDTO> listBillDiagoMediclaimCredit = new ArrayList<BillReceiptSlaveDTO>();
		
		
		//Lists for OPD & DIAGO Mediclaim Package Cash
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCash = new ArrayList<EhatOtherBillDetailForOpdDto>();
		//Lists for OPD & DIAGO Mediclaim Package Credit
		List<EhatOtherBillDetailForOpdDto> listOBDForOpdMediclaimCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		List<EhatOtherBillDetailForOpdDto> listOBDForDiagoMediclaimCredit = new ArrayList<EhatOtherBillDetailForOpdDto>();
		
		//Lists for IPD
		List<BillDetailsIpdDto> listBillDetailsIpd = new ArrayList<BillDetailsIpdDto>();
		List<BillDetailsIpdDto> listBillDetailsIpdCredit = new ArrayList<BillDetailsIpdDto>();
		
		//Lists for IPD package(other bill details)
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdCash = new ArrayList<EhatOtherBillDetailForIpdDto>();
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdCredit = new ArrayList<EhatOtherBillDetailForIpdDto>();
		
		//Lists for IPD Mediclaim Cash
		List<BillDetailsIpdDto> listBillIpdMediclaimCash = new ArrayList<BillDetailsIpdDto>();
		//Lists for IPD Mediclaim Credit
		List<BillDetailsIpdDto> listBillIpdMediclaimCredit = new ArrayList<BillDetailsIpdDto>();
		
		//Lists for IPD Mediclaim Package Cash
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCash = new ArrayList<EhatOtherBillDetailForIpdDto>();
		//Lists for IPD Mediclaim Package Credit
		List<EhatOtherBillDetailForIpdDto> listOBDForIpdMediclaimCredit = new ArrayList<EhatOtherBillDetailForIpdDto>();
		
		//List for Group
		List<GroupReceiptSlaveDetails> listGroupReceiptSlave = new ArrayList<GroupReceiptSlaveDetails>();
		List<GroupReceiptSlaveDetails> listGroupReceiptSlaveCredit = new ArrayList<GroupReceiptSlaveDetails>();
		
		//List for Group Mediclaim Cash
		List<GroupReceiptSlaveDetails> listGroupMediclaimCash = new ArrayList<GroupReceiptSlaveDetails>();
		//List for Group Mediclaim Credit
		List<GroupReceiptSlaveDetails> listGroupMediclaimCredit = new ArrayList<GroupReceiptSlaveDetails>();

		
		Double totalSumAmount = 0.0;
		Double totalSumConcession = 0.0;
		Double totalSumHospAmount = 0.0;
		Double totalSumNet = 0.0;
		// ----------OPD Cash---------starts
		String slaveQuery1 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='N' and department_id = 1 and service_assign_date between :fromDate and :toDate"; //and source_type_id=0";

		Query qExe1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery1)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExe1.setParameter("doctorId", doctorId);
		qExe1.setParameter("fromDate", fromDate);
		qExe1.setParameter("toDate", toDate);

		listBillReceiptSlave = qExe1.list();
		mainObj.setListBillReceiptSlave(listBillReceiptSlave);
		// ----------OPD Cash---------Ends
		
		totalSumAmount = totalSumAmount + listBillReceiptSlave.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillReceiptSlave.get(0).getSumConcession() 
					+  listBillReceiptSlave.get(0).getActualDiscAmt() +  listBillReceiptSlave.get(0).getRefundAmt();
		totalSumHospAmount = totalSumHospAmount + listBillReceiptSlave.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillReceiptSlave.get(0).getSumNet();
		
		// ---------OPD Credit---------starts
		String slaveQueryCredit1 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 1 and service_assign_date between :fromDate and :toDate and source_type_id=0";

		Query qExeCredit1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit1)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeCredit1.setParameter("doctorId", doctorId);
		qExeCredit1.setParameter("fromDate", fromDate);
		qExeCredit1.setParameter("toDate", toDate);

		listBillReceiptSlaveCredit = qExeCredit1.list();
		mainObj.setListBillReceiptSlaveCredit(listBillReceiptSlaveCredit);
		// ----------OPD Credit---------Ends
		
		totalSumAmount = totalSumAmount + listBillReceiptSlaveCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillReceiptSlaveCredit.get(0).getSumConcession()
					+  listBillReceiptSlaveCredit.get(0).getActualDiscAmt() +  listBillReceiptSlaveCredit.get(0).getRefundAmt();
		totalSumHospAmount = totalSumHospAmount + listBillReceiptSlaveCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillReceiptSlaveCredit.get(0).getSumNet();
		
		// ---------OPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit1 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 1 and service_assign_date between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCredit1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit1)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeMediclaimCredit1.setParameter("doctorId", doctorId);
		qExeMediclaimCredit1.setParameter("fromDate", fromDate);
		qExeMediclaimCredit1.setParameter("toDate", toDate);

		listBillOpdMediclaimCredit = qExeMediclaimCredit1.list();
		mainObj.setListBillOpdMediclaimCredit(listBillOpdMediclaimCredit);
		// ----------OPD Mediclaim Credit---------Ends
		
		totalSumAmount = totalSumAmount + listBillOpdMediclaimCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillOpdMediclaimCredit.get(0).getSumConcession()
					+  listBillOpdMediclaimCredit.get(0).getActualDiscAmt() +  listBillOpdMediclaimCredit.get(0).getRefundAmt();
		totalSumHospAmount = totalSumHospAmount + listBillOpdMediclaimCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillOpdMediclaimCredit.get(0).getSumNet();

		// ----------IPD Cash---------starts
		String slaveQuery2 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate and source_type_id=0";

		Query qExe2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExe2.setParameter("doctorId", doctorId);
		qExe2.setParameter("fromDate", fromDate);
		qExe2.setParameter("toDate", toDate);

		listBillDetailsIpd = qExe2.list();
		mainObj.setListBillDetailsIpd(listBillDetailsIpd);
		// ----------IPD Cash---------Ends
		
		totalSumAmount = totalSumAmount + listBillDetailsIpd.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillDetailsIpd.get(0).getSumConcession()
								+  listBillDetailsIpd.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listBillDetailsIpd.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillDetailsIpd.get(0).getSumNet();
		
		// ----------IPD Credit---------starts
		String slaveQueryCredit2 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate and source_type_id=0";

		Query qExeCredit2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExeCredit2.setParameter("doctorId", doctorId);
		qExeCredit2.setParameter("fromDate", fromDate);
		qExeCredit2.setParameter("toDate", toDate);

		listBillDetailsIpdCredit = qExeCredit2.list();
		mainObj.setListBillDetailsIpdCredit(listBillDetailsIpdCredit);
		// ----------IPD Credit---------Ends
		
		totalSumAmount = totalSumAmount + listBillDetailsIpdCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillDetailsIpdCredit.get(0).getSumConcession()
								+  listBillDetailsIpdCredit.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listBillDetailsIpdCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillDetailsIpdCredit.get(0).getSumNet();
		
		// ----------IPD Mediclaim Cash---------starts
		String slaveQueryMediclaimCash2 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCash2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExeMediclaimCash2.setParameter("doctorId", doctorId);
		qExeMediclaimCash2.setParameter("fromDate", fromDate);
		qExeMediclaimCash2.setParameter("toDate", toDate);

		listBillIpdMediclaimCash = qExeMediclaimCash2.list();
		mainObj.setListBillIpdMediclaimCash(listBillIpdMediclaimCash);
		// ----------IPD Mediclaim Cash---------Ends
		
		totalSumAmount = totalSumAmount + listBillIpdMediclaimCash.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillIpdMediclaimCash.get(0).getSumConcession()
								+  listBillIpdMediclaimCash.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listBillIpdMediclaimCash.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillIpdMediclaimCash.get(0).getSumNet();
		
		
		// ----------IPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit2 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_bill_details_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCredit2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit2)
				.setResultTransformer(
						Transformers.aliasToBean(BillDetailsIpdDto.class));

		qExeMediclaimCredit2.setParameter("doctorId", doctorId);
		qExeMediclaimCredit2.setParameter("fromDate", fromDate);
		qExeMediclaimCredit2.setParameter("toDate", toDate);

		listBillIpdMediclaimCredit= qExeMediclaimCredit2.list();
		mainObj.setListBillIpdMediclaimCredit(listBillIpdMediclaimCredit);
		// ----------IPD Mediclaim Credit---------Ends
		
		totalSumAmount = totalSumAmount + listBillIpdMediclaimCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillIpdMediclaimCredit.get(0).getSumConcession()
								+  listBillIpdMediclaimCredit.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listBillIpdMediclaimCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillIpdMediclaimCredit.get(0).getSumNet();

		// ----------Diagno Cash---------starts
		String slaveQuery3 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='N' and department_id = 3 and service_assign_date between :fromDate and :toDate ";//and source_type_id = 0";

		Query qExe3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery3)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExe3.setParameter("doctorId", doctorId);
		qExe3.setParameter("fromDate", fromDate);
		qExe3.setParameter("toDate", toDate);

		listBillReceiptSlaveDiago = qExe3.list();
		mainObj.setListBillReceiptSlaveDiago(listBillReceiptSlaveDiago);
		// ----------Diagno Cash---------Ends
		
		totalSumAmount = totalSumAmount + listBillReceiptSlaveDiago.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillReceiptSlaveDiago.get(0).getSumConcession() 
					+  listBillReceiptSlaveDiago.get(0).getActualDiscAmt() +  listBillReceiptSlaveDiago.get(0).getRefundAmt();
		totalSumHospAmount = totalSumHospAmount + listBillReceiptSlaveDiago.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillReceiptSlaveDiago.get(0).getSumNet();
		
		
		// ----------Diagno Credit---------starts
		String slaveQueryCredit3 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 3 and service_assign_date between :fromDate and :toDate and source_type_id = 0";

		Query qExeCredit3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit3)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeCredit3.setParameter("doctorId", doctorId);
		qExeCredit3.setParameter("fromDate", fromDate);
		qExeCredit3.setParameter("toDate", toDate);

		listBillReceiptSlaveDiagoCredit = qExeCredit3.list();
		mainObj.setListBillReceiptSlaveDiagoCredit(listBillReceiptSlaveDiagoCredit);
		// ----------Diagno Credit---------Ends
		
		totalSumAmount = totalSumAmount + listBillReceiptSlaveDiagoCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillReceiptSlaveDiagoCredit.get(0).getSumConcession() 
					+  listBillReceiptSlaveDiagoCredit.get(0).getActualDiscAmt() +  listBillReceiptSlaveDiagoCredit.get(0).getRefundAmt();
		totalSumHospAmount = totalSumHospAmount + listBillReceiptSlaveDiagoCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillReceiptSlaveDiagoCredit.get(0).getSumNet();
		
		// ----------Diagno Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit3 = "SELECT ifnull(sum(actual_amt),0) as sumAmount,ifnull(sum(actual_concn_amt),0) as sumConcession,"
				+ "ifnull(sum(actual_disc_amt),0) as actualDiscAmt,ifnull(sum(actual_ref_amt),0) as refundAmt,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_receipt_slave "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and department_id = 3 and service_assign_date between :fromDate and :toDate and source_type_id > 0";

		Query qExeMediclaimCredit3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit3)
				.setResultTransformer(
						Transformers.aliasToBean(BillReceiptSlaveDTO.class));

		qExeMediclaimCredit3.setParameter("doctorId", doctorId);
		qExeMediclaimCredit3.setParameter("fromDate", fromDate);
		qExeMediclaimCredit3.setParameter("toDate", toDate);

		listBillDiagoMediclaimCredit = qExeMediclaimCredit3.list();
		mainObj.setListBillDiagoMediclaimCredit(listBillDiagoMediclaimCredit);
		// ----------Diagno Mediclaim Credit---------Ends
		
		totalSumAmount = totalSumAmount + listBillDiagoMediclaimCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listBillDiagoMediclaimCredit.get(0).getSumConcession() 
					+  listBillDiagoMediclaimCredit.get(0).getActualDiscAmt() +  listBillDiagoMediclaimCredit.get(0).getRefundAmt();
		totalSumHospAmount = totalSumHospAmount + listBillDiagoMediclaimCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listBillDiagoMediclaimCredit.get(0).getSumNet();
		
		// ----------Group Cash---------starts
		String slaveQuery4 = "SELECT ifnull(truncate(sum(amount), 2), 0) as sumAmount,ifnull(sum(concession), 0) as sumConcession,"
				+ "ifnull(sum(discount), 0) as discount,ifnull(sum(refundAmt), 0) as refundAmt,"
				+ "ifnull(sum(hospAmount), 0) as sumHospAmount,ifnull(sum(totalDrAmount), 0) as sumNet,groupMasterId,groupName "
				+ "FROM  profees_group_receipt_slave where doctorId = :doctorId and pfVoucherFlag = 'Y' and advance_flag='N' and "
				+ " serviceAssignDate between :fromDate and :toDate group by groupMasterId";

		Query qExe4 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery4)
				.setResultTransformer(
						Transformers.aliasToBean(GroupReceiptSlaveDetails.class));

		qExe4.setParameter("doctorId", doctorId);
		qExe4.setParameter("fromDate", fromDate);
		qExe4.setParameter("toDate", toDate);

		listGroupReceiptSlave = qExe4.list();
		mainObj.setListGroupReceiptSlave(listGroupReceiptSlave);
		// ----------Group Cash---------Ends
		for(int i=0;i < listGroupReceiptSlave.size();i++){
			totalSumAmount = totalSumAmount + listGroupReceiptSlave.get(i).getSumAmount();
			totalSumConcession = totalSumConcession + listGroupReceiptSlave.get(i).getSumConcession() 
						+  listGroupReceiptSlave.get(i).getDiscount() +  listGroupReceiptSlave.get(i).getRefundAmt();
			totalSumHospAmount = totalSumHospAmount + listGroupReceiptSlave.get(i).getSumHospAmount();
			totalSumNet = totalSumNet + listGroupReceiptSlave.get(i).getSumNet();
		}
		// ----------Group Credit---------starts
		String slaveQueryCredit4 = "SELECT ifnull(sum(amount), 0) as sumAmount,ifnull(sum(concession), 0) as sumConcession,"
				+ "ifnull(sum(discount), 0) as discount,ifnull(sum(refundAmt), 0) as refundAmt,"
				+ "ifnull(sum(hospAmount), 0) as sumHospAmount,ifnull(sum(totalDrAmount), 0) as sumNet,groupMasterId,groupName "
				+ "FROM  profees_group_receipt_slave where doctorId = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and "
				+ " sourceTypeId = 0 and serviceAssignDate between :fromDate and :toDate group by groupMasterId";

		Query qExeCredit4 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit4)
				.setResultTransformer(
						Transformers
								.aliasToBean(GroupReceiptSlaveDetails.class));

		qExeCredit4.setParameter("doctorId", doctorId);
		qExeCredit4.setParameter("fromDate", fromDate);
		qExeCredit4.setParameter("toDate", toDate);

		listGroupReceiptSlaveCredit = qExeCredit4.list();
		mainObj.setListGroupReceiptSlaveCredit(listGroupReceiptSlaveCredit);
		// ----------Group Credit---------Ends
		
		for(int i=0;i < listGroupReceiptSlaveCredit.size();i++){
			totalSumAmount = totalSumAmount + listGroupReceiptSlaveCredit.get(i).getSumAmount();
			totalSumConcession = totalSumConcession + listGroupReceiptSlaveCredit.get(i).getSumConcession() 
						+  listGroupReceiptSlaveCredit.get(i).getDiscount() +  listGroupReceiptSlaveCredit.get(i).getRefundAmt();
			totalSumHospAmount = totalSumHospAmount + listGroupReceiptSlaveCredit.get(i).getSumHospAmount();
			totalSumNet = totalSumNet + listGroupReceiptSlaveCredit.get(i).getSumNet();
		}
		
		
		// ----------Group Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit4 = "SELECT ifnull(sum(amount), 0) as sumAmount,ifnull(sum(concession), 0) as sumConcession,"
				+ "ifnull(sum(discount), 0) as discount,ifnull(sum(refundAmt), 0) as refundAmt,"
				+ "ifnull(sum(hospAmount), 0) as sumHospAmount,ifnull(sum(totalDrAmount), 0) as sumNet,groupMasterId,groupName "
				+ "FROM  profees_group_receipt_slave where doctorId = :doctorId and pfVoucherFlag = 'Y' and advance_flag='Y' and "
				+ " sourceTypeId > 0 and serviceAssignDate between :fromDate and :toDate group by groupMasterId";

		Query qExeMediclaimCredit4 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit4)
				.setResultTransformer(
						Transformers
								.aliasToBean(GroupReceiptSlaveDetails.class));

		qExeMediclaimCredit4.setParameter("doctorId", doctorId);
		qExeMediclaimCredit4.setParameter("fromDate", fromDate);
		qExeMediclaimCredit4.setParameter("toDate", toDate);

		listGroupMediclaimCredit = qExeMediclaimCredit4.list();
		mainObj.setListGroupMediclaimCredit(listGroupMediclaimCredit);
		// ----------Group Mediclaim Credit---------Ends
		
		for(int i=0;i < listGroupMediclaimCredit.size();i++){
			totalSumAmount = totalSumAmount + listGroupMediclaimCredit.get(i).getSumAmount();
			totalSumConcession = totalSumConcession + listGroupMediclaimCredit.get(i).getSumConcession() 
						+  listGroupMediclaimCredit.get(i).getDiscount() +  listGroupMediclaimCredit.get(i).getRefundAmt();
			totalSumHospAmount = totalSumHospAmount + listGroupMediclaimCredit.get(i).getSumHospAmount();
			totalSumNet = totalSumNet + listGroupMediclaimCredit.get(i).getSumNet();
		}
		
		// ----------Package OPD Cash---------starts
		String slaveQuery5 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExe5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery5)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExe5.setParameter("doctorId", doctorId);
		qExe5.setParameter("fromDate", fromDate);
		qExe5.setParameter("toDate", toDate);

		listOBDForOpdCash = qExe5.list();
		mainObj.setListOBDForOpdCash(listOBDForOpdCash);
		// ----------Package OPD Cash---------Ends

		totalSumAmount = totalSumAmount + listOBDForOpdCash.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForOpdCash.get(0).getSumConcession()
								+  listOBDForOpdCash.get(0).getDiscount() + listOBDForOpdCash.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForOpdCash.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForOpdCash.get(0).getSumNet();
		
		// ----------Package OPD Credit---------starts
		String slaveQueryCredit5 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExeCredit5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit5)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeCredit5.setParameter("doctorId", doctorId);
		qExeCredit5.setParameter("fromDate", fromDate);
		qExeCredit5.setParameter("toDate", toDate);

		listOBDForOpdCredit = qExeCredit5.list();
		mainObj.setListOBDForOpdCredit(listOBDForOpdCredit);
		// ----------Package OPD Credit---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForOpdCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForOpdCredit.get(0).getSumConcession()
								+  listOBDForOpdCredit.get(0).getDiscount() + listOBDForOpdCredit.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForOpdCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForOpdCredit.get(0).getSumNet();
		
		// ----------Package OPD Mediclaim Cash---------starts
		String slaveQueryMediclaimCash5 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0";

		Query qExeMediclaimCash5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash5)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCash5.setParameter("doctorId", doctorId);
		qExeMediclaimCash5.setParameter("fromDate", fromDate);
		qExeMediclaimCash5.setParameter("toDate", toDate);

		listOBDForOpdMediclaimCash = qExeMediclaimCash5.list();
		mainObj.setListOBDForOpdMediclaimCash(listOBDForOpdMediclaimCash);
		// ----------Package OPD Mediclaim Cash---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForOpdMediclaimCash.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForOpdMediclaimCash.get(0).getSumConcession()
								+  listOBDForOpdMediclaimCash.get(0).getDiscount() + listOBDForOpdMediclaimCash.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForOpdMediclaimCash.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForOpdMediclaimCash.get(0).getSumNet();
		
		
		// ----------Package OPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit5 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 1 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0";

		Query qExeMediclaimCredit5 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit5)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCredit5.setParameter("doctorId", doctorId);
		qExeMediclaimCredit5.setParameter("fromDate", fromDate);
		qExeMediclaimCredit5.setParameter("toDate", toDate);

		listOBDForOpdMediclaimCredit = qExeMediclaimCredit5.list();
		mainObj.setListOBDForOpdMediclaimCredit(listOBDForOpdMediclaimCredit);
		// ----------Package OPD Mediclaim Credit---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForOpdMediclaimCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForOpdMediclaimCredit.get(0).getSumConcession()
								+  listOBDForOpdMediclaimCredit.get(0).getDiscount() + listOBDForOpdMediclaimCredit.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForOpdMediclaimCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForOpdMediclaimCredit.get(0).getSumNet();
		
		// ----------Package Diago Cash---------starts
		String slaveQuery6 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExe6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExe6.setParameter("doctorId", doctorId);
		qExe6.setParameter("fromDate", fromDate);
		qExe6.setParameter("toDate", toDate);

		listOBDForDiagoCash = qExe6.list();
		mainObj.setListOBDForDiagoCash(listOBDForDiagoCash);
		// ----------Package Diago Cash---------Ends

		totalSumAmount = totalSumAmount + listOBDForDiagoCash.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForDiagoCash.get(0).getSumConcession()
								+  listOBDForDiagoCash.get(0).getDiscount() + listOBDForDiagoCash.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForDiagoCash.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForDiagoCash.get(0).getSumNet();
		
		// ----------Package Diago Credit---------starts
		String slaveQueryCredit6 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0";

		Query qExeCredit6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeCredit6.setParameter("doctorId", doctorId);
		qExeCredit6.setParameter("fromDate", fromDate);
		qExeCredit6.setParameter("toDate", toDate);

		listOBDForDiagoCredit = qExeCredit6.list();
		mainObj.setListOBDForDiagoCredit(listOBDForDiagoCredit);
		// ----------Package Diago Credit---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForDiagoCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForDiagoCredit.get(0).getSumConcession()
								+  listOBDForDiagoCredit.get(0).getDiscount() + listOBDForDiagoCredit.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForDiagoCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForDiagoCredit.get(0).getSumNet();
		
		// ----------Package Diago Mediclaim Cash---------starts
		String slaveQueryMediclaimCash6 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCash6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCash6.setParameter("doctorId", doctorId);
		qExeMediclaimCash6.setParameter("fromDate", fromDate);
		qExeMediclaimCash6.setParameter("toDate", toDate);

		listOBDForDiagoMediclaimCash = qExeMediclaimCash6.list();
		mainObj.setListOBDForDiagoMediclaimCash(listOBDForDiagoMediclaimCash);
		// ----------Package Diago Mediclaim Cash---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForDiagoMediclaimCash.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForDiagoMediclaimCash.get(0).getSumConcession()
								+  listOBDForDiagoMediclaimCash.get(0).getDiscount() + listOBDForDiagoMediclaimCash.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForDiagoMediclaimCash.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForDiagoMediclaimCash.get(0).getSumNet();
		
		// ----------Package Diago Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit6 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_opd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 3 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCredit6 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit6)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForOpdDto.class));

		qExeMediclaimCredit6.setParameter("doctorId", doctorId);
		qExeMediclaimCredit6.setParameter("fromDate", fromDate);
		qExeMediclaimCredit6.setParameter("toDate", toDate);

		listOBDForDiagoMediclaimCredit = qExeMediclaimCredit6.list();
		mainObj.setListOBDForDiagoMediclaimCredit(listOBDForDiagoMediclaimCredit);
		// ----------Package Diago Mediclaim Credit---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForDiagoMediclaimCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForDiagoMediclaimCredit.get(0).getSumConcession()
								+  listOBDForDiagoMediclaimCredit.get(0).getDiscount() + listOBDForDiagoMediclaimCredit.get(0).getRefund();
		totalSumHospAmount = totalSumHospAmount + listOBDForDiagoMediclaimCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForDiagoMediclaimCredit.get(0).getSumNet();
		
		// ----------Package IPD Cash---------starts
		String slaveQuery7 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0 ";

		Query qExe7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery7)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExe7.setParameter("doctorId", doctorId);
		qExe7.setParameter("fromDate", fromDate);
		qExe7.setParameter("toDate", toDate);

		listOBDForIpdCash = qExe7.list();
		mainObj.setListOBDForIpdCash(listOBDForIpdCash);
		// ----------Package IPD Cash---------Ends

		totalSumAmount = totalSumAmount + listOBDForIpdCash.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForIpdCash.get(0).getSumConcession()
								+  listOBDForIpdCash.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listOBDForIpdCash.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForIpdCash.get(0).getSumNet();
		
		// ----------Package IPD Credit---------starts
		String slaveQueryCredit7 = "SELECT ifnull(sum(amount),0) as sumAmount,ifnull(sum(concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id = 0 ";

		Query qExeCredit7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryCredit7)
				.setResultTransformer(
						Transformers.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExeCredit7.setParameter("doctorId", doctorId);
		qExeCredit7.setParameter("fromDate", fromDate);
		qExeCredit7.setParameter("toDate", toDate);

		listOBDForIpdCredit = qExeCredit7.list();
		mainObj.setListOBDForIpdCredit(listOBDForIpdCredit);
		// ----------Package IPD Credit---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForIpdCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForIpdCredit.get(0).getSumConcession()
								+  listOBDForIpdCredit.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listOBDForIpdCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForIpdCredit.get(0).getSumNet();
		
		// ----------Package IPD Mediclaim Cash---------starts
		String slaveQueryMediclaimCash7 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='N' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCash7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCash7)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExeMediclaimCash7.setParameter("doctorId", doctorId);
		qExeMediclaimCash7.setParameter("fromDate", fromDate);
		qExeMediclaimCash7.setParameter("toDate", toDate);

		listOBDForIpdMediclaimCash = qExeMediclaimCash7.list();
		mainObj.setListOBDForIpdMediclaimCash(listOBDForIpdMediclaimCash);
		// ----------Package IPD Mediclaim Cash---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForIpdMediclaimCash.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForIpdMediclaimCash.get(0).getSumConcession()
								+  listOBDForIpdMediclaimCash.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listOBDForIpdMediclaimCash.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForIpdMediclaimCash.get(0).getSumNet();
		
		// ----------Package IPD Mediclaim Credit---------starts
		String slaveQueryMediclaimCredit7 = "SELECT ifnull(sum(other_amount),0) as sumAmount,ifnull(sum(other_concession),0) as sumConcession,"
				+ "ifnull(sum(discount),0) as discount,ifnull(sum(refund),0) as refund,ifnull(sum(hospAmount),0) as sumHospAmount,"
				+ "ifnull(sum(pfAmount),0) as pfAmount,ifnull(sum(pfPaid),0) as sumNet,ifnull(sum(pfUnpaid),0) as pfUnpaid,"
				+ "ifnull(sum(pfAddition),0) as pfAddition,ifnull(sum(pfReduction),0) as pfReduction FROM ehat_other_bill_detail_for_ipd "
				+ "where doctor_id = :doctorId and pfVoucherFlag = 'Y' and department_id = 2 and advance_flag='Y' and date(created_date_time) between :fromDate and :toDate "
				+ " and charges_id > 0 ";

		Query qExeMediclaimCredit7 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQueryMediclaimCredit7)
				.setResultTransformer(
						Transformers
								.aliasToBean(EhatOtherBillDetailForIpdDto.class));

		qExeMediclaimCredit7.setParameter("doctorId", doctorId);
		qExeMediclaimCredit7.setParameter("fromDate", fromDate);
		qExeMediclaimCredit7.setParameter("toDate", toDate);

		listOBDForIpdMediclaimCredit = qExeMediclaimCredit7.list();
		mainObj.setListOBDForIpdMediclaimCredit(listOBDForIpdMediclaimCredit);
		// ----------Package IPD Mediclaim Credit---------Ends
		
		totalSumAmount = totalSumAmount + listOBDForIpdMediclaimCredit.get(0).getSumAmount();
		totalSumConcession = totalSumConcession + listOBDForIpdMediclaimCredit.get(0).getSumConcession()
								+  listOBDForIpdMediclaimCredit.get(0).getDiscount() ;
		totalSumHospAmount = totalSumHospAmount + listOBDForIpdMediclaimCredit.get(0).getSumHospAmount();
		totalSumNet = totalSumNet + listOBDForIpdMediclaimCredit.get(0).getSumNet();
		
		
		// To get doctors fixed income
		Query qq = sessionFactory
				.getCurrentSession()
				.createSQLQuery("Select ifnull(fixed_income,0) from doctor where Doctor_ID=:doctorId");

		qq.setParameter("doctorId", doctorId);

		@SuppressWarnings("unchecked")
		double fixedIncome = (Double) qq.uniqueResult();
		//Set doctors fixed income direct in pojo object
		mainObj.setFixedIncome(fixedIncome);
		mainObj.setTotalSumAmount(totalSumAmount);
		mainObj.setTotalSumConcession(totalSumConcession);
		mainObj.setTotalSumHospAmount(totalSumHospAmount);
		mainObj.setTotalSumNet(totalSumNet);

		return mainObj;
	}

	//Irfan khan @9-Jan-2018 to save dynamic group details
	@Override
	public int saveDynamicGroupDetails(String groupSlaveDetails,
			String groupMasterDetails, Integer userId, String callFrom) {
		int a = 0;
		DynamicGroupMasterDto dynamicGroupMasterDto2 = (DynamicGroupMasterDto) ConfigUIJSONUtility
				.getObjectFromJSON(groupMasterDetails, DynamicGroupMasterDto.class);

		DynamicGroupMasterDto dynamicGroupMasterDto = dynamicGroupMasterDto2.getListDynamicGroupMaster()
				.get(0);
		if (callFrom.equalsIgnoreCase("insert")) {
			dynamicGroupMasterDto.setCreatedBy(userId);
			dynamicGroupMasterDto.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			dynamicGroupMasterDto.setDeleted("N");

			String groupName = dynamicGroupMasterDto.getdGroupName();
			sessionFactory.getCurrentSession().merge(dynamicGroupMasterDto);

			int groupMasterId = maxCountOfColumn(DynamicGroupMasterDto.class,
					"dMasterId");
			
			DynamicGroupSlaveDto groupSlaveDto2 = (DynamicGroupSlaveDto) ConfigUIJSONUtility
					.getObjectFromJSON(groupSlaveDetails, DynamicGroupSlaveDto.class);
			
			for (int i = 0; i < groupSlaveDto2.getListDynamicGroupSlave().size(); i++) {

				DynamicGroupSlaveDto groupSlaveDto = groupSlaveDto2
						.getListDynamicGroupSlave().get(i);

				groupSlaveDto.setdMasterId(groupMasterId);
				groupSlaveDto.setdGroupName(groupName);
				groupSlaveDto.setCreatedBy(userId);
				groupSlaveDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				groupSlaveDto.setDeleted("N");

				sessionFactory.getCurrentSession().merge(groupSlaveDto);
				Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
						"update doctor set dynamic_group_master_id=" + groupMasterId
								+ " where Doctor_ID="
								+ (groupSlaveDto.getDoctorId()));

				int resultOpd = alfa.executeUpdate();
			}

			/*Query alfa = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"INSERT INTO doctor(doc_name,doc_Type,specialisation,dynamic_group_master_id) VALUES( '"
									+ groupName
									+ "', 'doctor','0',"
									+ groupMasterId + ")");*/
			
			a = 1;
		} else if (callFrom.equalsIgnoreCase("update")) {

			dynamicGroupMasterDto.setUpdatedBy(userId);
			dynamicGroupMasterDto.setUpdatedDateTime(new Date(new java.util.Date()
					.getTime()));
			dynamicGroupMasterDto.setDeleted("N");

			String groupName = dynamicGroupMasterDto.getdGroupName();
			sessionFactory.getCurrentSession().merge(dynamicGroupMasterDto);

			Query bet = sessionFactory.getCurrentSession().createSQLQuery(
					"DELETE  FROM profees_dynamic_group_slave WHERE d_master_id="
							+ dynamicGroupMasterDto.getdMasterId());
			// bet.setParameter("gId", groupMasterDto.getGroupMasterId());
			int resultDelete = bet.executeUpdate();

			DynamicGroupSlaveDto groupSlaveDto2 = (DynamicGroupSlaveDto) ConfigUIJSONUtility
					.getObjectFromJSON(groupSlaveDetails, DynamicGroupSlaveDto.class);

			
			for (int i = 0; i < groupSlaveDto2.getListDynamicGroupSlave().size(); i++) {

				DynamicGroupSlaveDto groupSlaveDto = groupSlaveDto2
						.getListDynamicGroupSlave().get(i);

				groupSlaveDto.setdMasterId(dynamicGroupMasterDto
						.getdMasterId());
				groupSlaveDto.setdGroupName(groupName);
				groupSlaveDto.setCreatedBy(userId);
				groupSlaveDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				groupSlaveDto.setDeleted("N");

				sessionFactory.getCurrentSession().merge(groupSlaveDto);
				Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
						"update doctor set dynamic_group_master_id=" + groupSlaveDto.getdMasterId()
								+ " where Doctor_ID="
								+ (groupSlaveDto.getDoctorId()));

				int resultOpd = alfa.executeUpdate();
			}
			/*Query alfaDoc = sessionFactory.getCurrentSession().createSQLQuery(
					"update doctor set doc_name='" + groupName
							+ "' where dynamic_group_master_id="
							+ (dynamicGroupMasterDto.getdMasterId()));

			int resultDoc = alfaDoc.executeUpdate();*/

			a = 2;

		}

		return a;
	}
	
	// Irfan khan @10-Jan-2018 to fetch dynamic group details
	@Override
	public DynamicGroupMasterDto fetchDynamicGroupMasterList(String callFrom, String letter) {
		DynamicGroupMasterDto groupMasterDto = new DynamicGroupMasterDto();
		List<DynamicGroupMasterDto> listGroupMaster = null;

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				DynamicGroupMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		if (callFrom.equalsIgnoreCase("search")) {
			criteria.add(Restrictions.like("dGroupName", "%" + letter + "%"));
		}

		listGroupMaster = criteria.list();

		groupMasterDto.setListDynamicGroupMaster(listGroupMaster);
		return groupMasterDto;
	}

	@Override
	public int deleteForDrDeps(Integer drDeptId, Integer userId,Integer caseType,Integer unitId) {
		try {

			String sql1 = "DELETE FROM percent_master WHERE dr_dept_id =:drDeptId and case_type=:caseType "
							+"and unit_id=:unitId and dr_dept_flag =:drDeptFlag";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	        // query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         query1.setParameter("drDeptId", drDeptId);
	         query1.setParameter("caseType", caseType);
	         query1.setParameter("unitId", unitId);
	         query1.setParameter("drDeptFlag", "D");
	         query1.executeUpdate();

			String sql2 = "DELETE FROM percent_slave WHERE dr_dept_id =:drDeptId and case_type=:caseType "
					+ "and unit_id=:unitId and dr_dept_flag =:drDeptFlag";

			SQLQuery query2 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql2);
			// query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query2.setParameter("drDeptId", drDeptId);
			query2.setParameter("caseType", caseType);
			query2.setParameter("unitId", unitId);
			query2.setParameter("drDeptFlag", "D");
			query2.executeUpdate();
      
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	@Override
	public int deleteDoctAndGroup(Integer docId, Integer userId,Integer caseType,Integer unitId) {
		try {

			 //delete subservice percentage from percent_master
			String sql1 = "DELETE FROM percent_master WHERE doctor_id =:docId and case_type=:caseType "
							+"and unit_id=:unitId and dr_dept_flag =:drDeptFlag";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
	        // query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         query1.setParameter("docId", docId);
	         query1.setParameter("caseType", caseType);
	         query1.setParameter("unitId", unitId);
	         query1.setParameter("drDeptFlag", "P");
	         query1.executeUpdate();
	         
	         //delete subservice percentage from percent_slave
			String sql2 = "DELETE FROM percent_slave WHERE doctor_id =:docId and case_type=:caseType "
					+ "and unit_id=:unitId and dr_dept_flag =:drDeptFlag";

			SQLQuery query2 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql2);
			// query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query2.setParameter("docId", docId);
			query2.setParameter("caseType", caseType);
			query2.setParameter("unitId", unitId);
			query2.setParameter("drDeptFlag", "P");
			query2.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	@Override
	public int deleteDynamicGroupMaster(Integer dMasterId, Integer userId) {
		try {

			// String sql1 =
			// "DELETE FROM percent_master WHERE doctor_id =:docId and dr_dept_flag =:drDeptFlag";

			String sql1 = "	UPDATE profees_dynamic_group_master SET deleted=:delete, deleted_by=:user, deleted_date_time=:time WHERE d_master_id=:dMasterId";

			SQLQuery query1 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql1);
			// query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query1.setParameter("dMasterId", dMasterId);
			query1.setParameter("delete", "Y");
			query1.setParameter("user", userId);
			query1.setParameter("time",
					new Date(new java.util.Date().getTime()));
			query1.executeUpdate();

			String sql2 = "UPDATE profees_dynamic_group_slave SET deleted=:delete, deleted_by=:user, deleted_date_time=:time WHERE d_master_id=:dMasterId";

			SQLQuery query2 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql2);
			// query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query2.setParameter("dMasterId", dMasterId);
			query2.setParameter("delete", "Y");
			query2.setParameter("user", userId);
			query2.setParameter("time",
					new Date(new java.util.Date().getTime()));
			query2.executeUpdate();

			String sql3 = "select doctor_id from  profees_dynamic_group_slave where d_master_id=:dMasterId and deleted='Y'";
			Query query3 = sessionFactory.getCurrentSession().createSQLQuery(
					sql3);
			query3.setParameter("dMasterId", dMasterId);

			ArrayList<Integer> doctorIdList = (ArrayList<Integer>) query3.list();

			if (doctorIdList.size() > 0) {
				String sql4 = "update doctor set dynamic_group_master_id=0 where Doctor_ID in(:doctorIdList)";

				SQLQuery query4 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql4);

				query4.setParameterList("doctorIdList", doctorIdList);
				query4.executeUpdate();
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	
	@Override
	public DynamicGroupSlaveDto editDynamicGroupMaster(int groupId) {
		DynamicGroupSlaveDto dynamicGroupSlaveDto = new DynamicGroupSlaveDto();
		List<DynamicGroupSlaveDto> listdynamicGroupSlave = null;
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(DynamicGroupSlaveDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("dMasterId", groupId));
		
		listdynamicGroupSlave = criteria.list();
		
		dynamicGroupSlaveDto.setListDynamicGroupSlave(listdynamicGroupSlave);
		return dynamicGroupSlaveDto;
	}
	
	// Irfan khan @23-Jan-2018 to fetch subservice percentage
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
							"select ifnull(CASE WHEN(select count(*) from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
									+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId " +" and dr_dept_id = :drDeptId  and unit_id = :unitId >0) " //
									+ "THEN(select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
									+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId  " + " and dr_dept_id = :drDeptId " 
									+ " and unit_id = :unitId) "
									+ "ELSE (select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = 0 "
									+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = 0 " +" and dr_dept_id = :drDeptId " 
									+ "and unit_id = 0) END,0) as hosp_percent");

			qq.setParameter("doctorId", doctorId);
			qq.setParameter("caseType", caseType);
			qq.setParameter("deptId", deptId);
			qq.setParameter("subServiceId", subServiceId);

			// qq.setParameter("chargesId", pflist.get(i).getChargesId());
			qq.setParameter("chargesSlaveId", chargesSlaveId);
			qq.setParameter("drDeptId", drDeptId);
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
									"select ifnull(CASE WHEN(select count(*) from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
											+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId >0) "
											+ "THEN(select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = :caseType "
											+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = :chargesSlaveId and dr_dept_id = :drDeptId and unit_id = :unitId) "
											+ "ELSE (select hosp_percent from percent_slave where doctor_id =:doctorId and deleted = 'N' and case_type = 0 "
											+ "and dept_id = :deptId and sub_service_id = :subServiceId and charges_slave_id = 0 and dr_dept_id = :drDeptId and unit_id = 0) END,0) as hosp_percent");

					qq.setParameter("doctorId", doctorId);
					qq.setParameter("caseType", caseType);
					qq.setParameter("deptId", deptId);
					qq.setParameter("subServiceId", ltSubServId.get(j));

					// qq.setParameter("chargesId", pflist.get(i).getChargesId());
					qq.setParameter("chargesSlaveId", chargesSlaveId);
					qq.setParameter("drDeptId", drDeptId);
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
	
	//@author : Irfan Khan @date: 24-Jan-2018 @reason : Autosuggestion for doctor
	@Override
	public List<DoctorDto> fetchDoctorListAutoSug(String letter,
			String callFrom, int specialisationId,int unitId) {
		List<DoctorDto> lisDoc = null;
		try {
			
			  			  
			  /*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class,"club");
			  
			  criteria.setFetchMode("users", FetchMode.JOIN);
			  criteria.createAlias("club.users","users");
			  criteria.add(Restrictions.eq("club.status", "N"));
			  criteria.add(Restrictions.like("club.doc_name","%"+letter+"%",MatchMode.START));
			  criteria.add(Restrictions.eq("users.User_ID",unitId));
			  
			  lisDoc = criteria.list();*/
			
			String docQuery = "";
			
			if(callFrom.equalsIgnoreCase("doctors_payment_group_master") || callFrom.equalsIgnoreCase("profees_group_doctor_report")){
				
				docQuery = "SELECT doc.Doctor_ID as Doctor_ID,doc.doc_name as doc_name,doc.specialisation as specialisation,"
						+"doc.doc_Type as doc_Type,doc.group_master_id as group_master_id,doc.dynamic_group_master_id as dynamic_group_master_id "
						+" FROM doctor doc,users u where u.User_ID = doc.User_ID and doc.status = 'Y' and group_master_id=0 and (u.unitmaster_id ="+unitId
						+" OR u.unitmaster_id LIKE '"+unitId+",%' OR u.unitmaster_id LIKE '%,"+unitId+",%' OR u.unitmaster_id LIKE '%,"+unitId+"') "
						+" and doc.doc_name LIKE '%"+letter+"%' ";
			}else if(callFrom.equalsIgnoreCase("profees_dynamic_group_master")){
				
				docQuery = "SELECT doc.Doctor_ID as Doctor_ID,doc.doc_name as doc_name,doc.specialisation as specialisation,"
						+"doc.doc_Type as doc_Type,doc.group_master_id as group_master_id,doc.dynamic_group_master_id as dynamic_group_master_id "
						+" FROM doctor doc,users u where u.User_ID = doc.User_ID and doc.status = 'Y' and dynamic_group_master_id=0 and (u.unitmaster_id ="+unitId
						+" OR u.unitmaster_id LIKE '"+unitId+",%' OR u.unitmaster_id LIKE '%,"+unitId+",%' OR u.unitmaster_id LIKE '%,"+unitId+"') "
						+" and doc.doc_name LIKE '%"+letter+"%' ";
			}
			else{
				
				docQuery = "SELECT doc.Doctor_ID as Doctor_ID,doc.doc_name as doc_name,doc.specialisation as specialisation,"
							+"doc.doc_Type as doc_Type,doc.group_master_id as group_master_id,doc.dynamic_group_master_id as dynamic_group_master_id "
							+" FROM doctor doc,users u where u.User_ID = doc.User_ID and doc.status = 'Y' and (u.unitmaster_id ="+unitId
							+" OR u.unitmaster_id LIKE '"+unitId+",%' OR u.unitmaster_id LIKE '%,"+unitId+",%' OR u.unitmaster_id LIKE '%,"+unitId+"') "
							+" and doc.doc_name LIKE '%"+letter+"%' ";
				
			}
			
			
			
			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(docQuery)
					.setResultTransformer(
							Transformers.aliasToBean(DoctorDto.class));

			// qExe.setParameter("letter", letter);

			lisDoc = qExe.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return lisDoc;
	}

	// @author : Irfan Khan @date: 14-Feb-2018 @reason : fetch sub service % from perSlave
	@Override
	public List<PercentSlaveDto> fetchAndSetSubServiceOnEdit(int serviceId,
			int unitId, int doctorId, int drDeptId, int caseType,
			int chargesId, int chargesSlaveId) {
		
		List<PercentSlaveDto> listPerSlave = null;
		if(doctorId == 0){//For Dr.Dept where drDeptFlag = 'D'
			
			Query qq = sessionFactory
					.getCurrentSession()
					.createSQLQuery("SELECT Doctor_id FROM percent_slave where dr_dept_id = :drDeptId and dr_dept_flag='P' limit 1");

			qq.setParameter("drDeptId", drDeptId);

			@SuppressWarnings("unchecked")
			Integer drId = (Integer) qq.uniqueResult();
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PercentSlaveDto.class);
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
					.createCriteria(PercentSlaveDto.class);
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

	//Irfan khan-- Fetching super master of service based on there id 12-Mar-2018
	@Override
	public List<ChargesMasterSlave> fetchSuperCatPrcentMaster(
			Integer chargesMasterDto) {
		List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
		if (chargesMasterDto > 0) {
			// Calling stored procedure
			Query query = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"CALL  fetchSuperCatogoires (:chargesMasterDto)")
					.setParameter("chargesMasterDto", chargesMasterDto);
			String result = (String) query.uniqueResult();
			String[] ary = result.split(",");

			// converting string object into Integer
			List<Integer> ae = new ArrayList<Integer>();
			for (int i = 0; i < ary.length; i++) {
				ae.add(Integer.parseInt(ary[i]));
			}
			ae.add(chargesMasterDto);
			// First checking the Lenth should be greater then zero
			if (ary.length > 0) {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				// criteria.addOrder(Order.desc("subId"));
				criteria.add(Restrictions.in("slaveId", ae));
				ltSubCharges = criteria.list();
				
			}
		}

		return ltSubCharges;
	}

	//irfan khan 16-mar-2018 to dynamic doctors availability
	@Override
	public int checkDynamicDocAvailability(int doctorId) {
		String sql = "SELECT ifnull(dynamic_group_master_id,0) FROM doctor where Doctor_ID=:doctorId";
		Query query = sessionFactory.getCurrentSession().createSQLQuery(
				sql);
		query.setParameter("doctorId", doctorId);

		int value = ((Number) query.uniqueResult()).intValue();
		if(value > 0){
			return value;
		}else{
			return 0;
		}
		
	}
	
	//irfan khan 17-mar-2018 to fetch super subservcId List
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
	
	// irfan khan  17-Mar-2018 to chck for profees record Count for subservice
	public int profeesCountSubServcId( int doctorId,int caseType, int deptId,
			int subServiceId, int unitId,int chargesSlaveId, String drDeptId) {
	int count = 0;
		try {
			String[] mstIds;
			ArrayList<Integer> masterChecked=new ArrayList<Integer>();	
			// get checked service masters
						if(drDeptId.length()>0){
							
							mstIds=drDeptId.split(",");
							for(String id:mstIds){
								
								masterChecked.add(Integer.parseInt(id));					
							}
						}
						
			/*Query qq = sessionFactory
					.getCurrentSession()
					.createQuery(
							"select count(*) from PercentSlaveDto where doctorId =:doctorId and caseType =:caseType and deptId =:deptId "
									+ "and deleted='N' and subServiceId =:subServiceId and chargesSlaveId =:chargesSlaveId and "
									+ "drDeptId In(:drDeptId) and unitId =:unitId");

			qq.setParameter("doctorId", doctorId);
			qq.setParameter("caseType", caseType);
			qq.setParameter("deptId", deptId);
			qq.setParameter("subServiceId", subServiceId);
			qq.setParameter("chargesSlaveId", chargesSlaveId);
			//qq.setParameter("drDeptId", Integer.parseInt(drDeptId));
			//qq.setParameter("drDeptId",drDeptId);
			qq.setParameter("drDeptId",masterChecked);
			qq.setParameter("unitId", unitId);
			count = ((Number)qq.uniqueResult()).intValue();*/			
			//count = ((Number) qq.uniqueResult()).intValue();
			//List<PercentSlaveDto> percentSlaveDtolist = qq.list();
			// count = (int) percentSlaveDtolist.stream().count();
			//Integer count1 =  ((BigInteger) qq.uniqueResult()).intValue();
			//Integer counta = Integer.parseInt(count1);
			
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PercentSlaveDto.class);			
		criteria.add(Restrictions.eq("doctorId",doctorId));	
		criteria.add(Restrictions.eq("caseType", caseType));
		criteria.add(Restrictions.eq("deptId", deptId));
		criteria.add(Restrictions.eq("subServiceId", subServiceId));
		
		criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
		//criteria.add(Restrictions.not(Restrictions.in("drDeptId", masterChecked)));
		criteria.add(Restrictions.eq("drDeptId", Integer.parseInt(drDeptId)));
		criteria.add(Restrictions.eq("unitId", unitId));
		
		//criteria.add(Restrictions.not(Restrictions.in("drDeptId", masterChecked)));
		 List<PercentSlaveDto> percentSlaveDtolist = (List<PercentSlaveDto>) criteria.list();	
		 count = (int) percentSlaveDtolist.stream().count();
		 
			if(count == 0){
				Query qqDefault = sessionFactory
						.getCurrentSession()
						.createQuery(
								"select count(*) from PercentSlaveDto where doctorId =:doctorId and caseType =:caseType and deptId =:deptId "
										+ "and deleted='N' and subServiceId =:subServiceId and chargesSlaveId =:chargesSlaveId and "
										+ "drDeptId =:drDeptId and "
										+ " unitId =:unitId");

				qqDefault.setParameter("doctorId", doctorId);
				qqDefault.setParameter("caseType", 0);
				qqDefault.setParameter("deptId", deptId);
				qqDefault.setParameter("subServiceId", subServiceId);
				qqDefault.setParameter("chargesSlaveId", 0);
				qqDefault.setParameter("drDeptId", Integer.parseInt(drDeptId));
				qqDefault.setParameter("unitId", 0);
				count = ((Number) qqDefault.uniqueResult()).intValue();
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return count;
		}
		return count;

	}

	//Irfan khan 30-Mar-2018 records of profees voucher
	@Override
	public AllPfPostedRecordsDto fetchProfeesVoucherReport(String voucherId,
			java.sql.Date fromDate, java.sql.Date toDate) {

		AllPfPostedRecordsDto objDto = new AllPfPostedRecordsDto();
		List<AllPfPostedRecordsDto> listAllPfRecords = new ArrayList<AllPfPostedRecordsDto>();

		String slaveQuery = "select ifnull(sum(tv.amount), 0) as amount,ifnull(sum(tv.concession), 0) as concession,"
				+ "ifnull(sum(tv.discount), 0) as discount,ifnull(sum(tv.refund), 0) as refund,ifnull(sum(tv.actHospAmount), 0) as actHospAmount,"
				+ "ifnull(sum(tv.hospAmount), 0) as hospAmount,ifnull(sum(tv.pfAmount), 0) as pfAmount,ifnull(sum(tv.pfPaid), 0) as pfPaid,"
				+ "ifnull(sum(tv.pfUnpaid), 0) as pfUnpaid,ifnull(sum(tv.pfReduction), 0) as pfReduction,ifnull(sum(tv.ref_dr_amount), 0) as refDrAmount,"
				+ "ifnull(sum(tv.pfAddition), 0) as pfAddition,tv.pfVoucherId as pfVoucherId,tv.department_id as departmentId,"
				+ "tv.doctor_id as doctorId,doc.doc_name as doctorName,dpv.createdDateTime as createdDateTime,dm.dept_name as deptName from "
				+ "ehat_view_all_pf_posted_records tv,doctor doc,ehat_doctors_payment_voucher dpv,dept_master dm where tv.doctor_id = doc.Doctor_ID "
				+ "and dpv.voucherId=tv.pfVoucherId and dm.dept_id=tv.department_id  ";

		if (!voucherId.equalsIgnoreCase("0")) {
			String byVoucherId = " and tv.pfVoucherId in("+voucherId+")";
			slaveQuery = slaveQuery + byVoucherId;
		}else{
			String byDate = " and date(dpv.createdDateTime) between :fromDate and :toDate ";
			slaveQuery = slaveQuery + byDate;
		}
		
		String byDocGroup = " group by tv.pfVoucherId,tv.doctor_id,tv.department_id";
		slaveQuery = slaveQuery + byDocGroup;

		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(
						Transformers
								.aliasToBean(AllPfPostedRecordsDto.class));

		if (voucherId.equalsIgnoreCase("0")) {
			qExe.setParameter("fromDate", fromDate);
			qExe.setParameter("toDate", toDate);
		}
		

		listAllPfRecords = qExe.list();
		objDto.setListAllPfRecords(listAllPfRecords);
		return objDto;
	}

	//Irfan Khan @date: 30-June-2018 @reason : get All Voucher
	@Override
	public DrPaymentVoucherDto fetchAllVoucherIds() {

		DrPaymentVoucherDto objVoucher = new DrPaymentVoucherDto();
		try {
			List<DrPaymentVoucherDto> listVoucher = null;
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DrPaymentVoucherDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			listVoucher = criteria.list();

			objVoucher.setListVoucher(listVoucher);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objVoucher;
	}

	//Irfan khan 6-Apr-2018 Outstanding report
	@Override
	public ProfeesDoctorsPaymentDto fetchProfeesVoucherReport(
			java.sql.Date fromDate, java.sql.Date toDate,int departmentId) {

		ProfeesDoctorsPaymentDto objDto = new ProfeesDoctorsPaymentDto();
		
		List<ProfeesDoctorsPaymentDto> listAllRecords = new ArrayList<ProfeesDoctorsPaymentDto>();

		String slaveQuery = "SELECT  bill_id as billId,department_id as deptId,patient_id as patientId,"
				+ "patient_name as patientName,dept_name as deptName,ifnull(sum(total_remain),0) as totalRemain,"
				+ "ifnull(sum(total_bill),0) as totalBill,date(created_date_time) as createdDateTime,IFNULL(bill_no, 0) AS billNo FROM "
				+ "ehat_view_outstanding_report where date(created_date_time) between :fromDate and :toDate ";
				
		if (departmentId > 0) {
			String byDeptId = " and department_id = :departmentId";
			slaveQuery = slaveQuery + byDeptId;
		}
		
		String byDocGroup = " group by patient_id , department_id";
		slaveQuery = slaveQuery + byDocGroup;

		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		if(departmentId > 0){
			qExe.setParameter("departmentId", departmentId);
		}
			
			qExe.setParameter("fromDate", fromDate);
			qExe.setParameter("toDate", toDate);
		

			List<Map<String, Object>> list = qExe.list();
			
			for(Map<String, Object> rs : list)
			{
				ProfeesDoctorsPaymentDto obj = new ProfeesDoctorsPaymentDto();
				
				obj.setBillId((Integer) rs.get("billId"));
				obj.setDeptId((Integer) rs.get("deptId"));
				obj.setPatientId((Integer) rs.get("patientId"));
				obj.setPatientName((String) rs.get("patientName"));
				obj.setDeptName((String) rs.get("deptName"));
				obj.setTotalRemain((Double) rs.get("totalRemain"));
				obj.setTotalBill((Double) rs.get("totalBill"));
				obj.setCreatedDateTime((Date) rs.get("createdDateTime"));
				obj.setBillNo(((Number) rs.get("billNo")).intValue());
				
				listAllRecords.add(obj);
			}
			
		objDto.setListProFees(listAllRecords);
		return objDto;
	}

	//Irfan khan 19-April-2018 Reference dr. records
	@Override
	public AllPfPostedRecordsDto fetchProfeesReferenceDrReport(
			java.sql.Date fromDate, java.sql.Date toDate) {

		AllPfPostedRecordsDto objDto = new AllPfPostedRecordsDto();
		List<AllPfPostedRecordsDto> listAllPfRecords = new ArrayList<AllPfPostedRecordsDto>();

		String slaveQuery = "SELECT ev.ref_dr_id as refDrId,doc.doc_name as doctorName,sum(ev.ref_dr_amount) as refDrAmount,"
				+ "sum(ev.amount) as amount,sum(ev.hospAmount) as hospAmount,sum(ev.pfAmount) as pfAmount,sum(ev.pfPaid) as pfPaid"
				+ " FROM ehat_view_all_pf_posted_records ev,doctor doc where ev.ref_dr_id = doc.Doctor_ID and ev.ref_dr_id > 0"
				+ " and date(ev.created_date_time) between :fromDate and :toDate group by ev.ref_dr_id ";

		
		/*String byDocGroup = " group by tv.pfVoucherId,tv.doctor_id,tv.department_id";
		slaveQuery = slaveQuery + byDocGroup;
*/
		Query qExe = sessionFactory
				.getCurrentSession()
				.createSQLQuery(slaveQuery)
				.setResultTransformer(
						Transformers
								.aliasToBean(AllPfPostedRecordsDto.class));
			qExe.setParameter("fromDate", fromDate);
			qExe.setParameter("toDate", toDate);
		

		listAllPfRecords = qExe.list();
		objDto.setListAllPfRecords(listAllPfRecords);
		return objDto;
	}

	// Irfan Khan @date: 29-June-2018 @reason : area Wise Patient Report
	@Override
	public AreaWisePatientViewDto areaWisePatientReport(int townId,
			int talukaId, int districtId, int stateId) {

		AreaWisePatientViewDto objDto = new AreaWisePatientViewDto();
		try {
			List<AreaWisePatientViewDto> listDto = null;
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(AreaWisePatientViewDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			
			if(townId > 0){
				criteria.add(Restrictions.eq("townId", townId));
			}
			if(talukaId > 0){
				criteria.add(Restrictions.eq("talukaId", talukaId));
			}
			if(districtId > 0){
				criteria.add(Restrictions.eq("districtId", districtId));
			}
			if(stateId > 0){
				criteria.add(Restrictions.eq("stateId", stateId));
			}
			
			//criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			listDto = criteria.list();

			objDto.setListAreaWisePatientView(listDto);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objDto;
	}
	
	
	// Mohd TArique Aalam @date: 7-july-2018 @reason : area Wise Patient Report2
	@Override
	public AreaWisePatientViewDto2 areaWisePatientReport2(int townId,
			int talukaId, int districtId, int stateId,String diagnosis) {

		AreaWisePatientViewDto2 objDto = new AreaWisePatientViewDto2();
		try {
			List<AreaWisePatientViewDto2> listDto = null;
			
			String hql="from AreaWisePatientViewDto2 ";
			
			if(stateId > 0){
				hql=hql+" where stateId="+stateId+" ";
			}
			
			if(townId > 0){
				hql=hql+" and townId="+townId+" ";
			}
			
			if(talukaId > 0){
				hql=hql+" and talukaId="+talukaId+" ";
			}
			
			if(districtId > 0){
				hql=hql+" and districtId="+districtId+" ";
				
			}
			
			if(!diagnosis.equalsIgnoreCase("withoutDiagnosis")){
				if(stateId==0 && townId==0 && talukaId==0 && districtId==0)
				{
					hql=hql+" where diagnosis='"+diagnosis+"' ";
				}
				else
				{
					hql=hql+" and diagnosis='"+diagnosis+"' ";
				}
	
				
			}
			
		
			hql=hql+"group by patientId";
			//System.err.print(hql);
			Query query=sessionFactory.getCurrentSession().createQuery(hql);  
			listDto = query.list();
/*			//criteria.addOrder(Order.desc("serviceId"));
			//criteria.setMaxResults(10);
			listDto = criteria.list();*/

			objDto.setListAreaWisePatientView(listDto);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objDto;
	}

	//Irfan khan 27-july-2018 fetch hall n hall type id by treatment id
	@Override
	public List<Integer> fetchHallIdsToSetOnload(int treatmentId) {

		List<Integer> objList = new ArrayList<Integer>();

		Query q1 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"select sub_service_id as bed_id from ehat_bill_details_ipd where "
						+"treatment_id = :treatmentId and service_id = 3 and sub_service_id > 0 and on_bed_flag = 'Y'");

		q1.setParameter("treatmentId", treatmentId);

		//Integer count = ((Number) q1.uniqueResult()).intValue();
		Integer bedId = (Integer) q1.uniqueResult();
		
		Query q2 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"select Hall_ID as hall_id from beds where Bed_ID = :bedId ");

		q2.setParameter("bedId", bedId);

		//Integer count = ((Number) q1.uniqueResult()).intValue();
		Integer hallId = (Integer) q2.uniqueResult();
		
		Query q3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"SELECT Htype as hall_type_id FROM hall where Hall_ID=:hallId ");

		q3.setParameter("hallId", hallId);

		//Integer count = ((Number) q1.uniqueResult()).intValue();
		String hallTypeIdStr = (String) q3.uniqueResult();
		Integer hallTypeId = Integer.parseInt(hallTypeIdStr);
		
		objList.add(hallId);
		objList.add(hallTypeId);
		return objList;
	}

	// Irfan khan @date: 21-Sep-2018 @reason : Fetch canceled admission records
	@Override
	public TreatmentDto canceledAdmissionRecords(java.sql.Date fromDate,
			java.sql.Date toDate) {
		TreatmentDto obj = new TreatmentDto();
		List<TreatmentDto> listAllRecords ;
		String querryy = "select et.treatment_id as treatmentId,ep.patient_id as patientId,ep.center_patient_id as centerPatientId,u.User_Name as userName,"
				+"concat(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) as patientName ,"
				+" date(et.admsn_can_date_time) as cancelDate,time(et.admsn_can_date_time) as cancelTime,et.opdipdno as opdipdno,et.cancel_narration as cancelNarration"
				+" from  ehat_treatment et,ehat_patient ep,users u where et.patient_id = ep.patient_id and"
				+" et.admsn_canceled_by = u.User_ID and  et.adm_cancel_flag = 'Y' and date(et.admsn_can_date_time) between '"+fromDate
				+"' and '"+toDate+"'";
		
		Query q = sessionFactory
				.getCurrentSession()
				.createSQLQuery(querryy);
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		

		listAllRecords = q.list();
		
		obj.setListTreatment(listAllRecords);
		
		return obj;
	}

	// Ajay khandare @date: 5-07-2019 @reason : Fetch  monthy and progresive report for ipd, opd, x-ray, sonography, etc..
      @Override
	  public List<HospitalReport> getMonthyHospitalActivitiesReport(
			String fromYear, String fromMonth) {
   	  
    	  List<String> deptList = new ArrayList<String>();
			deptList.add("OPD");
			deptList.add("IPD");		
			deptList.add("MINOR");	
		    deptList.add("MajorSUPRAMAJOR");
		    deptList.add("X-Ray");	
			deptList.add("Sonography");
			deptList.add("ECG");
			
			String sql="";
			String sql1="";
			int deptPrgCount=0,deptMonthCount=0;
			int deptId=1;
		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
		try {
			for(String deptName : deptList){
				
				
				 // For Month Count
				if(deptId == 1 || deptId == 2){
					
					sql="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OPD,COUNT(IF(et.department_id = '2', 1, null)) AS IPD FROM ehat_treatment et where MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;				
			

				}else if(deptId == 3 || deptId == 4 ){
					
					sql = "SELECT   COUNT(IF(ot.department = '6', 1, null)) AS MINOR,(COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null))) as SUPRAMAJORMAJOR"
					        +" FROM treatment_operations et  inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where eet.department_id ='2' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y')) ="+fromMonth+" and Year(STR_TO_DATE(et.date, '%d/%m/%Y')) ="+fromYear;

	

				}else if(deptId == 5 || deptId == 6 || deptId == 7){
					
					sql="SELECT COUNT(IF(bill.group_name = 'X-RAY', 1, null)) AS XRAY, COUNT(IF(bill.idtest_radiology = '31', 1, null)) AS sonography, COUNT(IF(bill.idtest_radiology = '159', 1, null)) AS ECG "
				        +" FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and month(bill.assign_date) ="+fromMonth+" and Year(bill.assign_date)="+fromYear;
			
				
				}
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					if(deptId == 1){
						
						deptMonthCount = ((Number)row.get("OPD")).intValue();	
						
					}else if(deptId == 2){
						
						deptMonthCount = ((Number)row.get("IPD")).intValue();
						
					}else if(deptId == 3){
						
						deptMonthCount = ((Number)row.get("MINOR")).intValue();	
					}else if(deptId == 4){
						
						deptMonthCount = ((Number)row.get("SUPRAMAJORMAJOR")).intValue();	
					}else if(deptId == 5){
						
						deptMonthCount = ((Number)row.get("XRAY")).intValue();	
						
					}else if(deptId == 6){
						
						deptMonthCount = ((Number)row.get("sonography")).intValue();	
						
					}else if(deptId == 7){
						
						deptMonthCount = ((Number)row.get("ECG")).intValue();	
					}
				}
			
				
				
									
					// For Progressive Count
				if(deptId == 1 || deptId == 2){
					
					sql1="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OPD,COUNT(IF(et.department_id = '2', 1, null)) AS IPD FROM ehat_treatment et where date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
				
				}else if(deptId == 3 || deptId == 4 ){
					
					sql1 = "SELECT   COUNT(IF(ot.department = '6', 1, null)) AS MINOR,(COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null))) as SUPRAMAJORMAJOR"
					        +" FROM treatment_operations et  inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where eet.department_id = '2' and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
			

				}else if(deptId == 5 || deptId == 6 || deptId == 7){
					
					sql1="SELECT COUNT(IF(bill.group_name = 'X-RAY', 1, null)) AS XRAY, COUNT(IF(bill.idtest_radiology = '31', 1, null)) AS sonography, COUNT(IF(bill.idtest_radiology = '159', 1, null)) AS ECG "
				        +" FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and date(bill.assign_date) >= concat("+fromYear+ ", '-04-01') and date(bill.assign_date) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
				
				
				}
				Query recQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec1 = recQuery1.list();
				for(Map<String, Object> row : listRec1){
					
					if(deptId == 1){
						
						deptPrgCount = ((Number)row.get("OPD")).intValue();	
					
						
					}else if(deptId == 2){
						
						deptPrgCount = ((Number)row.get("IPD")).intValue();
						
					}else if(deptId == 3){
						
						deptPrgCount = ((Number)row.get("MINOR")).intValue();	
					}else if(deptId == 4){
						
						deptPrgCount = ((Number)row.get("SUPRAMAJORMAJOR")).intValue();	
					}else if(deptId == 5){
						
						deptPrgCount = ((Number)row.get("XRAY")).intValue();	
						
					}else if(deptId == 6){
						
						deptPrgCount = ((Number)row.get("sonography")).intValue();	
						
					}else if(deptId == 7){
						
						deptPrgCount = ((Number)row.get("ECG")).intValue();	
					}
				}
		
			
		
			
				HospitalReport dto =new HospitalReport();
			dto.setMonthlycount(deptMonthCount);
			dto.setProgressivecount(deptPrgCount);
			listsubservice.add(dto);
			deptId++;
			dto = null;
					
		}
		}catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;
	}

      
      @Override
  	public List<HospitalReport> getMonthyHospitalActivitiesPerformanceReport(
  			String fromYear, String fromMonth) {
  		
  		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
  		
  		List<String> deptList = new ArrayList<String>();
  		/* 1 */ deptList.add("OPD");
  		/* 2 */ deptList.add("IPD");
  		
  		
  		/* 3 */ deptList.add("Sonography");	
  		/* 4 */ deptList.add("X-ray+IVP");	
  		/* 5 */ deptList.add("ColourDopplerStudy");	
  		/* 6 */ deptList.add("Lithotripsy"); // sub_service_id  = 174
  		
  		/* 7 */ deptList.add("I.C.U. Admission");	
  		/* 8 */ deptList.add("N.I.C.U. Admission");	
  		
  		/* 9 */ deptList.add("LabInvenstigations");	
  	
  		/* 10 */ deptList.add("M J P J A Y Health Camp");
  		
  		
  		/* 11 */ deptList.add("Operation");
  		
  		/* 12 */ deptList.add("Uro Surgery");
  		/* 13 */ deptList.add("Supramajor - Uro Surgery");
  		/* 14 */ deptList.add("Major - Uro Surgery");
  		/* 15 */ deptList.add("Minor - Uro Surgery");
  		
  		/* 16 */ deptList.add("Paediatric Surgery");
  		/* 17 */ deptList.add("Supramajor - Paediatric Surgery");
  		/* 18 */ deptList.add("Major - Paediatric Surgery");
  		/* 19 */ deptList.add("Minor - Paediatric Surgery");
  		
  		/* 20 */ deptList.add("Plastic Surgery");
  		/* 21 */ deptList.add("Supramajor - Plastic Surgery");
  		/* 22 */ deptList.add("Major - Plastic Surgery");
  		/* 23*/ deptList.add("Minor - Plastic Surgery");

  		/* 24 */ deptList.add("Supramajor - Total");
  		/* 25 */ deptList.add("Major - Total");
  		/* 26 */ deptList.add("Minor - Total");
  		
  		
  		
  		
  		/*
  		 27  deptList.add("Physiotherapy");	
  		 29 deptList.add("Dialysis");	
  		
  		 30  deptList.add("Urodynamic Study"); 
  		
  	
  		 15  deptList.add("Kidney Transplant Surgery");
  		*/
  		
  		
  	
  		String sql="",sql1="";
  		int deptPrgCount=0,deptMonthCount=0;
  		int deptId=1;
  		try {
  			
  			for(String deptName : deptList){
  				
  				
  			 // For Month Count
  				if(deptId == 1 || deptId == 2){// month ipd , opd 
  					
  					sql="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OPD,COUNT(IF(et.department_id = '2', 1, null)) AS IPD FROM ehat_treatment et where MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;				
  					
  				}else if(deptId == 3 || deptId == 4){//month for ICU, NICU...
  					
  					sql = "select COUNT(IF(b.Hall_ID = '9', 1, null)) AS ICU,COUNT(IF(b.Hall_ID = '13', 1, null)) AS NICU from beds b left join ehat_bill_details_ipd bill ON (b.Bed_ID = bill.sub_service_id and bill.service_id = 3  and bill.sub_service_id > 0 and bill.on_bed_flag = 'Y') where b.status = 'Y' and idbedstate = 3  and month(bill.created_date_time) = "+fromMonth+" and Year(bill.created_date_time) = "+fromYear;
  					       
  					
  				}else if(deptId == 5 || deptId == 6 || deptId == 7 || deptId == 8){//month for sonography,X-ray+IVP ,Colour Dropper Study, lithoripsy...
  					
  					sql="SELECT COUNT(IF(bill.group_name = 'E.S.W.L.(Lithotripsy)', 1, null)) AS Lithotripsy,(COUNT(IF(bill.group_name = 'X-RAY', 1, null)) + COUNT(IF(bill.idtest_radiology = '162',1,null))) AS xrayIVP,COUNT(IF(bill.idtest_radiology = '31', 1, null)) AS sonography,COUNT(IF(bill.idtest_radiology = '74',1,null)) AS ColourDopplerStudy"
  					        +" FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and month(bill.assign_date) ="+fromMonth+" and Year(bill.assign_date)="+fromYear;  				
  	
  				}else if(deptId == 9){//month for Lab Invenstigations under diagonis test send to lab only...
  					
  					sql = "SELECT  COUNT(*) AS LabInvenstigations FROM ehat_lab_result_mst_view bill where month(bill.assign_date) = "+fromMonth+" and Year(bill.assign_date) = "+fromYear;
  					
  				}else if(deptId == 10){//month for M.J.phule jan arogya jojna count paitent 
  					
  					sql = "SELECT COUNT(IF(opd.charges_master_slave_id = '35',1,null)) AS sponsorCount FROM ehat_bill_master opd where month(opd.created_date_time) = "+fromMonth+" and Year(opd.created_date_time)= "+fromYear;
  				
  				}else if(deptId == 11){ //Count Operation 
  					
  					sql="SELECT  COUNT(ID) AS operation FROM treatment_operations et  inner join  treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where  eet.department_id = '2' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+fromMonth+"  and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+fromYear;
  					
  				}else if(deptId >= 12 && deptId <= 26){// total supramajor, taotal minor, total major, uro supramajor, uro total major,uro total major,total minor,....etc paediatric and plastic surgery
  					
  					sql = "SELECT COUNT(IF(et.ot_id = '1', 1, null)) AS uro, "						
  						+ "COUNT(IF(ot.department = '1' and et.ot_id = '1', 1, null)) AS uro_supramajor, "
      					+ "COUNT(IF(ot.department = '5' and et.ot_id = '1', 1, null)) AS uro_major, "
  						+ "COUNT(IF(ot.department = '6' and et.ot_id = '1', 1, null)) As uro_minor, "
  						+ "COUNT(IF(et.ot_id = '2', 1, null)) AS paediatric, "	
  						+ "COUNT(IF(ot.department = '1' and et.ot_id = '2', 1, null)) AS paediatric_supramajor, "
      					+ "COUNT(IF(ot.department = '5' and et.ot_id = '2', 1, null)) AS paediatric_major, "
  						+ "COUNT(IF(ot.department = '6' and et.ot_id = '2', 1, null)) As paediatric_minor, "
  						+ "COUNT(IF(et.ot_id = '3', 1, null)) AS plastic, "	
  						+ "COUNT(IF(ot.department = '1' and et.ot_id = '3', 1, null)) AS plastic_supramajor, "
      					+ "COUNT(IF(ot.department = '5' and et.ot_id = '3', 1, null)) AS plastic_major, "
  						+ "COUNT(IF(ot.department = '6' and et.ot_id = '3', 1, null)) As plastic_minor ,"
  						+" COUNT(IF(ot.department = '1', 1, null)) AS supramajor ,"
  		  				+ "COUNT(IF(ot.department = '5', 1, null)) AS major, "
  		  				+ "COUNT(IF(ot.department = '6', 1, null)) As minor "
  					    + " FROM treatment_operations et  inner join  treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where  eet.department_id = '2' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+fromMonth+"  and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+fromYear;			
  			
  				}
  				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
  				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
  				List<Map<String, Object>> listRec = recQuery.list();
  				for(Map<String, Object> row : listRec){
  					
  					if(deptId == 1){
  						
  						deptMonthCount = ((Number)row.get("OPD")).intValue();	
  						
  					}else if(deptId == 2){
  						
  						deptMonthCount = ((Number)row.get("IPD")).intValue();
  						
  					}
  					else if(deptId == 3){
  						
  						deptMonthCount = ((Number)row.get("ICU")).intValue();	
  						
  					}else if(deptId == 4){
  						
  						deptMonthCount = ((Number)row.get("NICU")).intValue();	
  					
  					}else if(deptId == 5){
  						
  						deptMonthCount = ((Number)row.get("Lithotripsy")).intValue();	
  						
  					}else if(deptId == 6){
  						
  						deptMonthCount = ((Number)row.get("xrayIVP")).intValue();	
  						
  					}
  					
  					else if(deptId == 7){
  						
  						deptMonthCount = ((Number)row.get("sonography")).intValue();	
  						
  					}else if(deptId == 8){
  						
  						deptMonthCount = ((Number)row.get("ColourDopplerStudy")).intValue();	
  						
  					}
  					
  					else if(deptId == 9){
  						
  						deptMonthCount = ((Number)row.get("LabInvenstigations")).intValue();	
  					
  					}else if(deptId == 10){
  						
  						deptMonthCount = ((Number)row.get("sponsorCount")).intValue();	
  					
  					}
  					
  					else if(deptId == 11){
  						
  						deptMonthCount = ((Number)row.get("operation")).intValue();	
  					
  					}else if(deptId == 12){
  						
  						deptMonthCount = ((Number)row.get("uro")).intValue();	
  					
  					}else if(deptId == 13){
  						
  						deptMonthCount = ((Number)row.get("uro_supramajor")).intValue();	
  					
  					}else if(deptId == 14){
  						
  						deptMonthCount = ((Number)row.get("uro_major")).intValue();	
  					
  					}else if(deptId == 15){
  						
  						deptMonthCount = ((Number)row.get("uro_minor")).intValue();	
  					
  					}else if(deptId == 16){
  						
  						deptMonthCount = ((Number)row.get("paediatric")).intValue();	
  					
  					}else if(deptId == 17){
  						
  						deptMonthCount = ((Number)row.get("paediatric_supramajor")).intValue();	
  					
  					}else if(deptId == 18){
  						
  						deptMonthCount = ((Number)row.get("paediatric_major")).intValue();	
  					
  					}else if(deptId == 19){
  						
  						deptMonthCount = ((Number)row.get("paediatric_minor")).intValue();	
  					
  					}else if(deptId == 20){
  						
  						deptMonthCount = ((Number)row.get("plastic")).intValue();	
  					
  					}else if(deptId == 21){
  						
  						deptMonthCount = ((Number)row.get("plastic_supramajor")).intValue();	
  					
  					}else if(deptId == 22){
  						
  						deptMonthCount = ((Number)row.get("plastic_major")).intValue();	
  					
  					}else if(deptId == 23){
  						
  						deptMonthCount = ((Number)row.get("plastic_minor")).intValue();	
  					
  					}else if(deptId == 24){
  						
  						deptMonthCount = ((Number)row.get("supramajor")).intValue();	
  					
  					}else if(deptId == 25){
  						
  						deptMonthCount = ((Number)row.get("major")).intValue();	
  					
  					}else if(deptId == 26){
  						
  						deptMonthCount = ((Number)row.get("minor")).intValue();	
  					}
  				}
  				
  				
  				
  				
  				// progresive count start //
  				
  				
  	  			 // For Month Count
  	  				if(deptId == 1 || deptId == 2){// month ipd , opd 
  	  					
  	  					sql1="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OPD,COUNT(IF(et.department_id = '2', 1, null)) AS IPD FROM ehat_treatment et where date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
  	  					
  	  				}else if(deptId == 3 || deptId == 4){//progresive for ICU, NICU...
  	  					
  	  					sql1 = "select COUNT(IF(b.Hall_ID = '9', 1, null)) AS ICU,COUNT(IF(b.Hall_ID = '13', 1, null)) AS NICU from beds b left join ehat_bill_details_ipd bill ON (b.Bed_ID = bill.sub_service_id and bill.service_id = 3  and bill.sub_service_id > 0 and bill.on_bed_flag = 'Y') where b.status = 'Y' and idbedstate = 3  and date(bill.created_date_time) >= concat("+fromYear+ ", '-04-01') and date(bill.created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";
  	  					       
  	  					
  	  				}else if(deptId == 5 || deptId == 6 || deptId == 7 || deptId == 8){//progresive for sonography,X-ray+IVP ,Colour Dropper Study, lithoripsy...
  	  					
  	  					sql1="SELECT COUNT(IF(bill.group_name = 'E.S.W.L.(Lithotripsy)', 1, null)) AS Lithotripsy,(COUNT(IF(bill.group_name = 'X-RAY', 1, null)) + COUNT(IF(bill.idtest_radiology = '162',1,null))) AS xrayIVP,COUNT(IF(bill.idtest_radiology = '31', 1, null)) AS sonography,COUNT(IF(bill.idtest_radiology = '74',1,null)) AS ColourDopplerStudy"
  	  					        +" FROM ehat_ris_records_details bill where  bill.radTestStatus='Y' and date(bill.assign_date) >= concat("+fromYear+ ", '-04-01') and date(bill.assign_date) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
  	  				
  	  	
  	  				}else if(deptId == 9){//progresive for Lab Invenstigations under diagonis test send to lab only...
  	  					
  	  					sql1 = "SELECT  COUNT(*) AS LabInvenstigations FROM ehat_lab_result_mst_view bill where date(bill.assign_date) >= concat("+fromYear+ ", '-04-01') and date(bill.assign_date) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
  	  					
  	  				}else if(deptId == 10){//progresive for M.J.phule jan arogya jojna count paitent 
  	  					
  	  					sql1 = "SELECT COUNT(IF(opd.charges_master_slave_id = '35',1,null)) AS sponsorCount FROM ehat_bill_master opd where date(opd.created_date_time) >= concat("+fromYear+ ", '-04-01') and date(opd.created_date_time) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
  	  				
  	  				}else if(deptId == 11){ // progresive Count Operation 
  	  					
  	  					sql1="SELECT  COUNT(ID) AS operation FROM treatment_operations et  inner join  treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where  eet.department_id = '2' and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
  	  					
  	  				}else if(deptId >= 12 && deptId <= 26){// total supramajor, taotal minor, total major, uro supramajor, uro total major,uro total major,total minor,....etc paediatric and plastic surgery
  	  					
  	  					sql1 = "SELECT COUNT(IF(et.ot_id = '1', 1, null)) AS uro, "						
  	  						+ "COUNT(IF(ot.department = '1' and et.ot_id = '1', 1, null)) AS uro_supramajor, "
  	      					+ "COUNT(IF(ot.department = '5' and et.ot_id = '1', 1, null)) AS uro_major, "
  	  						+ "COUNT(IF(ot.department = '6' and et.ot_id = '1', 1, null)) As uro_minor, "
  	  						+ "COUNT(IF(et.ot_id = '2', 1, null)) AS paediatric, "	
  	  						+ "COUNT(IF(ot.department = '1' and et.ot_id = '2', 1, null)) AS paediatric_supramajor, "
  	      					+ "COUNT(IF(ot.department = '5' and et.ot_id = '2', 1, null)) AS paediatric_major, "
  	  						+ "COUNT(IF(ot.department = '6' and et.ot_id = '2', 1, null)) As paediatric_minor, "
  	  						+ "COUNT(IF(et.ot_id = '3', 1, null)) AS plastic, "	
  	  						+ "COUNT(IF(ot.department = '1' and et.ot_id = '3', 1, null)) AS plastic_supramajor, "
  	      					+ "COUNT(IF(ot.department = '5' and et.ot_id = '3', 1, null)) AS plastic_major, "
  	  						+ "COUNT(IF(ot.department = '6' and et.ot_id = '3', 1, null)) As plastic_minor ,"
  	  						+" COUNT(IF(ot.department = '1', 1, null)) AS supramajor ,"
  	  		  				+ "COUNT(IF(ot.department = '5', 1, null)) AS major, "
  	  		  				+ "COUNT(IF(ot.department = '6', 1, null)) As minor "
  	  					    + " FROM treatment_operations et  inner join  treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where  eet.department_id = '2'  and where  STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+ ", '-"+fromMonth+"-31')";			
  	  			
  	  				}
  	  				Query recQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
  	  				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
  	  				List<Map<String, Object>> listRec1 = recQuery1.list();
  	  				for(Map<String, Object> row : listRec1){
  	  					
  	  					if(deptId == 1){
  	  						
  	  					deptPrgCount = ((Number)row.get("OPD")).intValue();	
  	  						
  	  					}else if(deptId == 2){
  	  						
  	  					deptPrgCount = ((Number)row.get("IPD")).intValue();
  	  						
  	  					}
  	  					else if(deptId == 3){
  	  						
  	  					deptPrgCount = ((Number)row.get("ICU")).intValue();	
  	  						
  	  					}else if(deptId == 4){
  	  					deptPrgCount = ((Number)row.get("NICU")).intValue();	
  	  					
  	  					}else if(deptId == 5){
  	  						
  	  					deptPrgCount = ((Number)row.get("Lithotripsy")).intValue();	
  	  						
  	  					}else if(deptId == 6){
  	  						
  	  					deptPrgCount = ((Number)row.get("xrayIVP")).intValue();	
  	  						
  	  					}
  	  					
  	  					else if(deptId == 7){
  	  						
  	  					deptPrgCount = ((Number)row.get("sonography")).intValue();	
  	  						
  	  					}else if(deptId == 8){
  	  						
  	  					deptPrgCount = ((Number)row.get("ColourDopplerStudy")).intValue();	
  	  						
  	  					}
  	  					
  	  					else if(deptId == 9){
  	  						
  	  					deptPrgCount = ((Number)row.get("LabInvenstigations")).intValue();	
  	  					
  	  					}else if(deptId == 10){
  	  						
  	  					deptPrgCount = ((Number)row.get("sponsorCount")).intValue();	
  	  				}		
  	  					else if(deptId == 11){
  	  						
  	  					deptPrgCount = ((Number)row.get("operation")).intValue();	
  	  					
  	  					}else if(deptId == 12){
  	  						
  	  					deptPrgCount = ((Number)row.get("uro")).intValue();	
  	  					
  	  					}else if(deptId == 13){
  	  						
  	  					deptPrgCount = ((Number)row.get("uro_supramajor")).intValue();	
  	  					
  	  					}else if(deptId == 14){
  	  						
  	  					deptPrgCount = ((Number)row.get("uro_major")).intValue();	
  	  					
  	  					}else if(deptId == 15){
  	  						
  	  					deptPrgCount = ((Number)row.get("uro_minor")).intValue();	
  	  					
  	  					}else if(deptId == 16){
  	  						
  	  					deptPrgCount = ((Number)row.get("paediatric")).intValue();	
  	  					
  	  					}else if(deptId == 17){
  	  						
  	  					deptPrgCount = ((Number)row.get("paediatric_supramajor")).intValue();	
  	  					
  	  					}else if(deptId == 18){
  	  						
  	  					deptPrgCount = ((Number)row.get("paediatric_major")).intValue();	
  	  					
  	  					}else if(deptId == 19){
  	  						
  	  					deptPrgCount = ((Number)row.get("paediatric_minor")).intValue();	
  	  					
  	  					}else if(deptId == 20){
  	  						
  	  					deptPrgCount = ((Number)row.get("plastic")).intValue();	
  	  					
  	  					}else if(deptId == 21){
  	  						
  	  					deptPrgCount = ((Number)row.get("plastic_supramajor")).intValue();	
  	  					
  	  					}else if(deptId == 22){
  	  						
  	  					deptPrgCount = ((Number)row.get("plastic_major")).intValue();	
  	  					
  	  					}else if(deptId == 23){
  	  						
  	  					deptPrgCount = ((Number)row.get("plastic_minor")).intValue();	
  	  					
  	  					}else if(deptId == 24){
  	  						
  	  					deptPrgCount = ((Number)row.get("supramajor")).intValue();	
  	  					
  	  					}else if(deptId == 25){
  	  						
  	  					deptPrgCount = ((Number)row.get("major")).intValue();	
  	  					
  	  					}else if(deptId == 26){
  	  						
  	  					deptPrgCount = ((Number)row.get("minor")).intValue();	
  	  					}
  	  				}
  	  				
  				
  				
  				
  	  			HospitalReport dto =new HospitalReport();
  				dto.setMonthlycount(deptMonthCount);
  				dto.setProgressivecount(deptPrgCount);
  				listsubservice.add(dto);
  				deptId++;
  				dto = null;	
  			}
  		}catch (Exception e) {
  				
  				e.printStackTrace();
  				
  			}
  		
  		return listsubservice;
  	}
  	
  
      
      
	@Override
	public List<HospitalReport> getyearWiseAndFundInfomationHospitalReport(
			String fromYear, String fromMonth) {
		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
		List<String> deptList = new ArrayList<String>();
		deptList.add("OPD");
		deptList.add("IPD");		
		deptList.add("UroSurgery");	
	    deptList.add("Predaticsurgery");
	    deptList.add("PlasticSurgery");	
	    deptList.add("Total Revenue Generation opd");
	    deptList.add("Total Revenue Generation ipd");	
	    deptList.add("Total case under sponsor patient MJFJAY");	
	    deptList.add("Total Revenue sponsor patient MJFJAY opd");	
	    deptList.add("Total Revenue sponsor patient MJFJAY ipd");	
		
		String sql="";
		String sql1="";
		int deptPrgCount=0,deptMonthCount=0, ipdcountsponsor=0,opdcountsponsor=0, totalipdopdspnosr=0,opdcountsponsormrp=0, ipdcountsponsormrp=0;
		int deptId=1;
	
	try {
		for(String deptName : deptList){
			
			
		
			if(deptId == 1 || deptId == 2){//total year wise count ipd, opd
				
				sql="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OPD,COUNT(IF(et.department_id = '2', 1, null)) AS IPD FROM ehat_treatment et where year(et.created_date_time) between "+fromYear+" and "+fromMonth+"";		
		

			}else if(deptId == 3 || deptId == 4 || deptId == 5 ){//total year wise count Uro,Predatic,plastic 
				
				sql = "SELECT COUNT(IF(et.ot_id = '1', 1, null)) AS UroSurgery,COUNT(IF(et.ot_id = '2', 1, null)) AS Predaticsurgery,COUNT(IF(et.ot_id = '3', 1, null)) AS PlasticSurgery FROM treatment_operations et  inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where eet.department_id = '2' and STR_TO_DATE(et.date, '%d/%m/%Y') between "+fromYear+" and "+fromMonth+" ";


			}else if(deptId == 6 ){//total revenue opd
				
				sql = "SELECT SUM(total_paid) as totalOpdRevenue FROM ehat_receipt_master opd where Year(opd.created_date_time) between "+fromYear+" and "+fromMonth+" ";
		

			}else if(deptId == 7 ){//total revenue ipd
				
				sql = "SELECT SUM(total_paid) as totalipdRevenue FROM ehat_receipt_master_ipd ipd where Year(ipd.created_date_time) between "+fromYear+" and "+fromMonth+" ";
		

			}else if(deptId == 8 ){//total Count under case MJFJAY sponsor
				
				sql = "SELECT COUNT(IF(opd.charges_master_slave_id = '35',1,null)) AS sponsorCount FROM ehat_bill_master opd where Year(opd.created_date_time) between  "+fromYear+" and "+fromMonth+" ";
			

			}else if(deptId == 9 ){//total revenue under MJFJAY sponsor for opd
				
				sql = "SELECT sum(opd.total_paid) as opdRevenue FROM ehat_receipt_master opd where opd.sponsor_cat_id = '35' and Year(opd.created_date_time) between "+fromYear+" and "+fromMonth+" ";
		
			}else if(deptId == 10 ){//total revenue under MJFJAY sponsor for ipd
				
				sql = "SELECT sum(ipd .total_paid) as ipdRevenue  FROM ehat_receipt_master_ipd ipd  where ipd.sponsor_cat_id = '35' and Year(ipd.created_date_time) between "+fromYear+" and "+fromMonth+"";
		
			}
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listRec = recQuery.list();
			for(Map<String, Object> row : listRec){
				
				if(deptId == 1){
					
					deptMonthCount = ((Number)row.get("OPD")).intValue();	
					
				}else if(deptId == 2){
					
					deptMonthCount = ((Number)row.get("IPD")).intValue();
					
				}
				
				
				else if(deptId == 3){
					
					deptMonthCount = ((Number)row.get("UroSurgery")).intValue();	
				}else if(deptId == 4){
					
					deptMonthCount = ((Number)row.get("Predaticsurgery")).intValue();	
				}else if(deptId == 5){
					
					deptMonthCount = ((Number)row.get("PlasticSurgery")).intValue();	
					
				}
				
				
				
				else if(deptId == 6){
					
					deptMonthCount	 = ((Number)row.get("totalOpdRevenue")).intValue();	
					
				}else if(deptId == 7){
					
					deptMonthCount	 = ((Number)row.get("totalipdRevenue")).intValue();	
					
				}
				
				
				else if(deptId == 8){
					
					deptMonthCount = ((Number)row.get("sponsorCount")).intValue();	
					
				}
				
				else if(deptId == 9){
					
					deptMonthCount = ((Number)row.get("opdRevenue")).intValue();	
					
				}else if(deptId == 10){
					
					deptMonthCount = ((Number)row.get("ipdRevenue")).intValue();	
					
				}
			
				
			}
			
			HospitalReport dto =new HospitalReport();
		dto.setMonthlycount(deptMonthCount);
		listsubservice.add(dto);
		deptId++;
		dto = null;
				
	}
	}catch (Exception e) {
		e.printStackTrace();

	}
	return listsubservice;
	}

	@Override
	public List<HospitalReport> getMonthyAndProgresiveHospitalReport1(
			String fromYear, String fromMonth) {
	   	  
  	  List<String> deptList = new ArrayList<String>();
			deptList.add("NewOPD");
			deptList.add("OldOPD");		
			deptList.add("TotalOPD");	
		    deptList.add("Avg. OPD per day");
		   
		    deptList.add("IPD");
		   
		    deptList.add("Minor");	
		    deptList.add("Major+SupraMajor");	
			
		    deptList.add("X-ray");
		
		    deptList.add("Lab Test Performed");
		    
		    deptList.add("LAMA");
			
		
			
			String sql="";
			String sql1=""; int totalpatient=0;int newpatient=0;int oldpatient=0; double avgpatientOpdperDay=0.0d; 
			int newpatientprogresive=0;
			int totalpatientprogresive=0;
			int oldpatinetprogresive=0; double avgpatientopdperdayprogresive = 0.0d;
			int deptPrgCount=0,deptMonthCount=0;
			int deptId=1;
		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
		try {
			for(String deptName : deptList){
				
				
				 // For Month Count
				if(deptId == 1 ){//for opd new patient
					
					sql="SELECT COUNT(IF(et.count = '1', 1, null)) AS NewOPD FROM ehat_treatment et where  et.department_id='1'  and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;
		
				}else if(deptId == 2){// for total opd - new opd patient old patient
					
						sql="SELECT   COUNT(IF(et.department_id = '1', 1, null)) AS OldOPD FROM ehat_treatment et where  et.count >'1' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;				
					
						
				}else if(deptId == 3){// for total opd 
					
					sql="SELECT   COUNT(IF(et.department_id = '1', 1, null)) AS totalOPD FROM ehat_treatment et where  MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;				
				
					
			    }else if(deptId == 4){// for total opd 
					
					sql="SELECT   COUNT(IF(et.department_id = '1', 1, null)) AS averageOPD FROM ehat_treatment et where  MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;				
				
					
			    }else if(deptId == 5 ){// for ipd patient
			    	
					sql="SELECT   COUNT(IF(et.department_id = '2', 1, null)) AS IPD  FROM ehat_treatment et where  MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;				

				
				}
				else if(deptId == 6 || deptId == 7)	{// for minor and supramajor+major surgery
			
					sql = "SELECT   COUNT(IF(ot.department = '6', 1, null)) AS MINOR,(COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null))) as SUPRAMAJORMAJOR"
					        +" FROM treatment_operations et  inner join  treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where  eet.department_id = '2' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+fromMonth+" and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+fromYear;
	
				}
				
				else if(deptId == 8 ){// for X-ray 
				
					sql="SELECT COUNT(IF(bill.group_name = 'X-RAY', 1, null)) AS XRAY "
				        +" FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and month(bill.assign_date) ="+fromMonth+" and Year(bill.assign_date)="+fromYear;
				
				}
				else if(deptId == 9){// for LabInvenstigations
			
  					sql = "SELECT  COUNT(*) AS LabInvenstigations FROM ehat_lab_result_mst_view bill where month(bill.assign_date) = "+fromMonth+" and Year(bill.assign_date) = "+fromYear;

				}else if(deptId == 10){// for LAMA
					sql="SELECT   COUNT(IF(et.department_id = '2', 1, null)) AS LAMA  FROM ehat_treatment et where     adm_cancel_flag='Y' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(created_date_time)="+fromYear;				

				}
				
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					if(deptId == 1){
						
						deptMonthCount = ((Number)row.get("NewOPD")).intValue();	
					
					
					}else if(deptId == 2){
						
						deptMonthCount = ((Number)row.get("OldOPD")).intValue();	// get total opd patient this line
							
						
					}else if(deptId == 3){
						
						deptMonthCount = ((Number)row.get("totalOPD")).intValue();	// get total opd patient this line
						
					}else if(deptId == 4){
						
						deptMonthCount = ((Number)row.get("averageOPD")).intValue();	// get total opd patient this line and divided by 30 days
					

						avgpatientOpdperDay =(double) (deptMonthCount/30);
						
						
					}else if(deptId == 5){
						
						deptMonthCount = ((Number)row.get("IPD")).intValue();	
					}else if(deptId == 6){
						
						deptMonthCount = ((Number)row.get("MINOR")).intValue();	
					}else if(deptId == 7){
						
						deptMonthCount = ((Number)row.get("SUPRAMAJORMAJOR")).intValue();	
					}else if(deptId == 8){
						
						deptMonthCount = ((Number)row.get("XRAY")).intValue();	
						
					}else if(deptId == 9){
						
						deptMonthCount = ((Number)row.get("LabInvenstigations")).intValue();	
						
					}else if(deptId == 10){
						
						deptMonthCount = ((Number)row.get("LAMA")).intValue();	
						
					}
				}
			
				
				
									
				// For Progressive Count
				if(deptId == 1 ){// new OPD patient for progresive 
					
					sql1="SELECT COUNT(IF(et.count = '1', 1, null)) AS NewOPD FROM ehat_treatment et where  et.department_id='1'  and date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
				
				}if(deptId == 2 ){
					
					sql1="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OldOPD  FROM ehat_treatment et where  et.count >'1' and date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
				
				}if(deptId == 3 ){
					
					sql1="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS totalOPD  FROM ehat_treatment et where date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
				
				}if(deptId == 4 ){
					
					sql1="SELECT COUNT(IF(et.department_id = '1', 1, null)) AS averageOPD  FROM ehat_treatment et where date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
				
				}if(deptId == 5 ){
					
					sql1="SELECT COUNT(IF(et.department_id = '2', 1, null)) AS IPD FROM ehat_treatment et where date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
						
				}else if(deptId == 6 || deptId == 7 ){
					sql1 = "SELECT   COUNT(IF(ot.department = '6', 1, null)) AS MINOR,(COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null))) as SUPRAMAJORMAJOR"
					        +" FROM treatment_operations et  inner join  treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet ON eet.treatment_id = et.Treatment_ID where  eet.department_id = '2' and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
			

				}else if(deptId == 8 ){
					
					sql1="SELECT COUNT(IF(bill.group_name = 'X-RAY', 1, null)) AS XRAY "
				        +" FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and date(bill.assign_date) >= concat("+fromYear+ ", '-04-01') and date(bill.assign_date) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
				
				
				}else if(deptId == 9){
				
	  			  sql1 = "SELECT  COUNT(*) AS LabInvenstigations FROM ehat_lab_result_mst_view bill where date(bill.assign_date) >= concat("+fromYear+ ", '-04-01') and date(bill.assign_date) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";

				}if(deptId == 10 ){
					
					sql1="SELECT COUNT(IF(et.department_id = '2', 1, null)) AS LAMA FROM ehat_treatment et  where  adm_cancel_flag='Y' and date(created_date_time) >= concat("+fromYear+ ",'-04-01') and date(created_date_time) <= concat("+fromYear+ ",'-"+fromMonth+"-31')";				
						
				}
				
				
				Query recQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec1 = recQuery1.list();
				for(Map<String, Object> row : listRec1){
					
					if(deptId == 1){
						
						deptPrgCount = ((Number)row.get("NewOPD")).intValue();	
					
						
					}else if(deptId == 2){
						
						deptPrgCount = ((Number)row.get("OldOPD")).intValue();
                        
						
					}else if(deptId == 3){
						
						deptPrgCount = ((Number)row.get("totalOPD")).intValue();	
					}else if(deptId == 4){
						
						deptPrgCount = ((Number)row.get("averageOPD")).intValue();	
						avgpatientopdperdayprogresive =(double) (deptPrgCount/30);
				

					}else if(deptId == 5){
						
						deptPrgCount = ((Number)row.get("IPD")).intValue();	
					}else if(deptId == 6){
						
						deptPrgCount = ((Number)row.get("MINOR")).intValue();	
						
					}else if(deptId == 7){
						
						deptPrgCount = ((Number)row.get("SUPRAMAJORMAJOR")).intValue();	
					}else if(deptId == 8){
						
						deptPrgCount = ((Number)row.get("XRAY")).intValue();	
					}else if(deptId == 9){
						
						deptPrgCount = ((Number)row.get("LabInvenstigations")).intValue();	
					}else if(deptId == 10){
						
						deptPrgCount = ((Number)row.get("LAMA")).intValue();	
					}
				}
				
				
		
			
				HospitalReport dto =new HospitalReport();
			
				dto.setMonthlycount(deptMonthCount);
				dto.setAvgpatientopd(avgpatientOpdperDay);
				dto.setProgressivecount(deptPrgCount);
                dto.setAvgpatientopdprogresive(avgpatientopdperdayprogresive);
            	listsubservice.add(dto);
			deptId++;
			dto = null;
					
		}
		}catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;
	}

	@Override
	public List<TreatmentDto> getOPDIPDOperationSpecilitywiseReport(
			String fromMonth ,String fromYear) {

		List<String> deptList = new ArrayList<String>();
		deptList.add("maleOPD");
		deptList.add("femaleOPD");
		deptList.add("TotalOPD");

		deptList.add("maleiPD");
		deptList.add("femaleiPD");
		deptList.add("TotaliPD");

		deptList.add("SupraMajor");
		deptList.add("Major");
		deptList.add("Minor");
		deptList.add("Total");
		deptList.add("Lithotripsy");
		String sql = "";
		String sql1 = "";
	

		int deptPrgCount = 0, deptMonth = 0, deptMonthCountplastic = 0, deptMonthCountPaediatric = 0, deptMonthCountNCD = 0,deptPrgCountPlastic=0, deptPrgCountPaediatric=0,deptPrgCountNCD=0 ,lithomonthcount=0,lithoprogcount=0;  

		int deptId = 1;

		List<TreatmentDto> listsubservice = new ArrayList<TreatmentDto>();
		try {
			for (String deptName : deptList) {

				// For Month Count nephro and Urology
				if (deptId == 1) {// for opd male patient

					
					
					
					sql = "SELECT   COUNT(IF(et.department_id = '1', 1, null)) as OPDmale  FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation in(70 , 43) and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 2) {// for opd Female new patient

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null)) as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation in(70 , 43) and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 3) {// for total opd

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation in(70 , 43) and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 4) {// for ipd male patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null)) as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation in(70 , 43) and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 5) {// for ipd female patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id  where ep.gender='Female' and doc.specialisation in(70 , 43) and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 6) {// for total ipd

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id  inner join doctor doc On doc.Doctor_ID = et.doctor_id  where doc.specialisation in(70 , 43) and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9 || deptId == 10) {// for// supramajor+mjor minor
											// operation
					sql = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where  doc.specialisation in( 70,43) and wt.department_id = '2' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
                        
				}

				Query recQuery = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
			
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for (Map<String, Object> row : listRec) {

					if (deptId == 1) {

						deptMonth = ((Number) row.get("OPDmale")).intValue();

				
					} else if (deptId == 2) {

						deptMonth = ((Number) row.get("OPDfemale")).intValue();
					
					} else if (deptId == 3) {

						deptMonth = ((Number) row.get("OPDtotal")).intValue();
				
					} else if (deptId == 4) {

						deptMonth = ((Number) row.get("IPDmale")).intValue();
				
					} else if (deptId == 5) {

						deptMonth = ((Number) row.get("IpdFemale")).intValue();
					} else if (deptId == 6) {

						deptMonth = ((Number) row.get("totalIPd")).intValue();
					

					} else if (deptId == 7) {

						deptMonth = ((Number) row.get("SUPRAMAJOR")).intValue();
				
					} else if (deptId == 8) {

						deptMonth = ((Number) row.get("Major")).intValue();

					} else if (deptId == 9) {

						deptMonth = ((Number) row.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptMonth = ((Number) row.get("totalOperation"))
								.intValue();

					}

				}

				// For Progresive Count nephro and Urology

				if (deptId == 1) {// for opd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation in(70 , 43) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 2) {// for opd Female new patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id  where ep.gender='Female' and doc.specialisation in(70 , 43) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 3) {// for total opd

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id  where doc.specialisation  in(70 , 43) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 4) {// for ipd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null))  as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id  inner join doctor doc On doc.Doctor_ID = et.doctor_id  where ep.gender='Male' and doc.specialisation in(70 , 43) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 5) {// for ipd female patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id   where ep.gender='Female' and doc.specialisation in(70 , 43) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 6) {// for total ipd

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id  where doc.specialisation in(70 , 43) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9
						|| deptId == 10) {// for supramajor+mjor minor  operation
					sql1 = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and  doc.specialisation in( 70,43) and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
		
				}

				Query recQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec1 = recQuery1.list();
				for (Map<String, Object> row1 : listRec1) {

					if (deptId == 1) {

						deptPrgCount = ((Number) row1.get("OPDmale")).intValue();

					} else if (deptId == 2) {

						deptPrgCount = ((Number) row1.get("OPDfemale"))
								.intValue();

					} else if (deptId == 3) {

						deptPrgCount = ((Number) row1.get("OPDtotal"))
								.intValue();

					} else if (deptId == 4) {

						deptPrgCount = ((Number) row1.get("IPDmale")).intValue();

					} else if (deptId == 5) {

						deptPrgCount = ((Number) row1.get("IpdFemale"))
								.intValue();
					} else if (deptId == 6) {

						deptPrgCount = ((Number) row1.get("totalIPd"))
								.intValue();

					} else if (deptId == 7) {

						deptPrgCount = ((Number) row1.get("SUPRAMAJOR"))
								.intValue();
					} else if (deptId == 8) {

						deptPrgCount = ((Number) row1.get("Major")).intValue();

					} else if (deptId == 9) {

						deptPrgCount = ((Number) row1.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptPrgCount = ((Number) row1.get("totalOperation"))
								.intValue();

					}
				}
				
				
				
				// For Month Count Plastic Surgery 
				if (deptId == 1) {// for opd male patient

					sql = "SELECT   COUNT(IF(et.department_id = '1', 1, null)) as OPDmale  FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation='32' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 2) {// for opd Female new patient

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null)) as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='32' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 3) {// for total opd

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id  inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='32' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 4) {// for ipd male patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null)) as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation='32' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 5) {// for ipd female patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='32' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 6) {// for total ipd

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='32' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9
						|| deptId == 10) {// for// supramajor+mjor minor
											// operation
					sql = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and doc.specialisation='32' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
                        
				}

				Query recQuery3 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
			
				recQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec3 = recQuery3.list();
				for (Map<String, Object> row : listRec3) {

					if (deptId == 1) {

						deptMonthCountplastic = ((Number) row.get("OPDmale")).intValue();

					} else if (deptId == 2) {

						deptMonthCountplastic = ((Number) row.get("OPDfemale")).intValue();

					} else if (deptId == 3) {

						deptMonthCountplastic = ((Number) row.get("OPDtotal")).intValue();

					} else if (deptId == 4) {

						deptMonthCountplastic = ((Number) row.get("IPDmale")).intValue();

					} else if (deptId == 5) {

						deptMonthCountplastic = ((Number) row.get("IpdFemale")).intValue();
					} else if (deptId == 6) {

						deptMonthCountplastic = ((Number) row.get("totalIPd")).intValue();

					} else if (deptId == 7) {

						deptMonthCountplastic = ((Number) row.get("SUPRAMAJOR")).intValue();
					} else if (deptId == 8) {

						deptMonthCountplastic = ((Number) row.get("Major")).intValue();

					} else if (deptId == 9) {

						deptMonthCountplastic = ((Number) row.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptMonthCountplastic = ((Number) row.get("totalOperation"))
								.intValue();

					}

				}

				// For Progresive  Count Plastic Surgery 

				if (deptId == 1) {// for opd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation='32' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 2) {// for opd Female new patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='32' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 3) {// for total opd

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='32' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 4) {// for ipd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null))  as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation='32' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 5) {// for ipd female patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='32' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 6) {// for total ipd

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='32' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9
						|| deptId == 10) {// for supramajor+mjor minor  operation
					sql1 = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and  doc.specialisation='32' and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
		
				}

				Query recQuery4 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec4 = recQuery4.list();
				for (Map<String, Object> row1 : listRec4) {

					if (deptId == 1) {

						deptPrgCountPlastic = ((Number) row1.get("OPDmale")).intValue();

					} else if (deptId == 2) {

						deptPrgCountPlastic = ((Number) row1.get("OPDfemale"))
								.intValue();

					} else if (deptId == 3) {

						deptPrgCountPlastic = ((Number) row1.get("OPDtotal"))
								.intValue();

					} else if (deptId == 4) {

						deptPrgCountPlastic = ((Number) row1.get("IPDmale")).intValue();

					} else if (deptId == 5) {

						deptPrgCountPlastic = ((Number) row1.get("IpdFemale"))
								.intValue();
					} else if (deptId == 6) {

						deptPrgCountPlastic = ((Number) row1.get("totalIPd"))
								.intValue();

					} else if (deptId == 7) {

						deptPrgCountPlastic = ((Number) row1.get("SUPRAMAJOR"))
								.intValue();
					} else if (deptId == 8) {

						deptPrgCountPlastic = ((Number) row1.get("Major")).intValue();

					} else if (deptId == 9) {

						deptPrgCountPlastic = ((Number) row1.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptPrgCountPlastic = ((Number) row1.get("totalOperation"))
								.intValue();

					}
				}
				
				
				// For Month Count  PaediaTric Surgery + NICU (NICU count includes peadiatric speclitiy)
				if (deptId == 1) {// for opd male patient

					sql = "SELECT   COUNT(IF(et.department_id = '1', 1, null)) as OPDmale  FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation='18' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 2) {// for opd Female new patient

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null)) as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='18' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 3) {// for total opd

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='18' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 4) {// for ipd male patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null)) as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation='18' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 5) {// for ipd female patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='18' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 6) {// for total ipd

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='18' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9
						|| deptId == 10) {// for// supramajor+mjor minor
											// operation
					sql = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where  wt.department_id = '2' and doc.specialisation='18' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
                        
				}

				Query recQuery5 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
			
				recQuery5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec5 = recQuery5.list();
				for (Map<String, Object> row : listRec5) {

					if (deptId == 1) {

						deptMonthCountPaediatric = ((Number) row.get("OPDmale")).intValue();

					} else if (deptId == 2) {

						deptMonthCountPaediatric = ((Number) row.get("OPDfemale")).intValue();

					} else if (deptId == 3) {

						deptMonthCountPaediatric = ((Number) row.get("OPDtotal")).intValue();

					} else if (deptId == 4) {

						deptMonthCountPaediatric = ((Number) row.get("IPDmale")).intValue();

					} else if (deptId == 5) {

						deptMonthCountPaediatric = ((Number) row.get("IpdFemale")).intValue();
					} else if (deptId == 6) {

						deptMonthCountPaediatric = ((Number) row.get("totalIPd")).intValue();

					} else if (deptId == 7) {

						deptMonthCountPaediatric = ((Number) row.get("SUPRAMAJOR")).intValue();
					} else if (deptId == 8) {

						deptMonthCountPaediatric = ((Number) row.get("Major")).intValue();

					} else if (deptId == 9) {

						deptMonthCountPaediatric = ((Number) row.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptMonthCountPaediatric = ((Number) row.get("totalOperation"))
								.intValue();

					}

				}

				// For Progresive PaediaTric Surgery + NICU (NICU count includes peadiatric speclitiy)

				if (deptId == 1) {// for opd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id  where ep.gender='Male' and doc.specialisation='18' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 2) {// for opd Female new patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='18' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 3) {// for total opd

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='18' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 4) {// for ipd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null))  as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation='18' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 5) {// for ipd female patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation='18' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 6) {// for total ipd

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation='18' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9
						|| deptId == 10) {// for supramajor+mjor minor  operation
					sql1 = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id   inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where  wt.department_id = '2' and doc.specialisation='18' and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
		
				}

				Query recQuery6 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery6.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec6 = recQuery6.list();
				for (Map<String, Object> row1 : listRec6) {

					if (deptId == 1) {

						deptPrgCountPaediatric = ((Number) row1.get("OPDmale")).intValue();

					} else if (deptId == 2) {

						deptPrgCountPaediatric = ((Number) row1.get("OPDfemale"))
								.intValue();

					} else if (deptId == 3) {

						deptPrgCountPaediatric = ((Number) row1.get("OPDtotal"))
								.intValue();

					} else if (deptId == 4) {

						deptPrgCountPaediatric = ((Number) row1.get("IPDmale")).intValue();

					} else if (deptId == 5) {

						deptPrgCountPaediatric = ((Number) row1.get("IpdFemale"))
								.intValue();
					} else if (deptId == 6) {

						deptPrgCountPaediatric = ((Number) row1.get("totalIPd"))
								.intValue();

					} else if (deptId == 7) {

						deptPrgCountPaediatric = ((Number) row1.get("SUPRAMAJOR"))
								.intValue();
					} else if (deptId == 8) {

						deptPrgCountPaediatric = ((Number) row1.get("Major")).intValue();

					} else if (deptId == 9) {

						deptPrgCountPaediatric = ((Number) row1.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptPrgCountPaediatric = ((Number) row1.get("totalOperation"))
								.intValue();

					}
				}
				
				
				
				// For Month Count NCD
				if (deptId == 1) {// for opd male patient

					sql = "SELECT   COUNT(IF(et.department_id = '1', 1, null)) as OPDmale  FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation ='71' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 2) {// for opd Female new patient

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null)) as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation ='71' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 3) {// for total opd

					sql = "SELECT  COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation ='71' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 4) {// for ipd male patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null)) as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation ='71' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 5) {// for ipd female patient

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation ='71' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;

				} else if (deptId == 6) {// for total ipd

					sql = "SELECT  COUNT(IF(et.department_id = '2', 1, null))  as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where et.department_id = '2' and doc.specialisation ='71' and MONTH(et.created_date_time) ="
							+ fromMonth
							+ " and YEAR(et.created_date_time)="
							+ fromYear;
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9
						|| deptId == 10) {// for// supramajor+mjor minor
											// operation
					sql = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and doc.specialisation='18' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
					
				}
				Query recQuery8 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
			
				recQuery8.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec8 = recQuery8.list();
				for (Map<String, Object> row : listRec8) {

					if (deptId == 1) {

						deptMonthCountNCD = ((Number) row.get("OPDmale")).intValue();

					} else if (deptId == 2) {

						deptMonthCountNCD = ((Number) row.get("OPDfemale")).intValue();

					} else if (deptId == 3) {

						deptMonthCountNCD = ((Number) row.get("OPDtotal")).intValue();

					} else if (deptId == 4) {

						deptMonthCountNCD = ((Number) row.get("IPDmale")).intValue();

					} else if (deptId == 5) {

						deptMonthCountNCD = ((Number) row.get("IpdFemale")).intValue();
					} else if (deptId == 6) {

						deptMonthCountNCD = ((Number) row.get("totalIPd")).intValue();

					} else if (deptId == 7) {

						deptMonthCountNCD = ((Number) row.get("SUPRAMAJOR")).intValue();
					} else if (deptId == 8) {

						deptMonthCountNCD = ((Number) row.get("Major")).intValue();

					} else if (deptId == 9) {

						deptMonthCountNCD = ((Number) row.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptMonthCountNCD = ((Number) row.get("totalOperation"))
								.intValue();

					}

				}

				// For Progresive Count NCD

				if (deptId == 1) {// for opd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation ='71' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 2) {// for opd Female new patient

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDfemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation ='71' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 3) {// for total opd

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null))  as OPDtotal FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation ='71'and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 4) {// for ipd male patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null))  as IPDmale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Male' and doc.specialisation ='71' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 5) {// for ipd female patient

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as IpdFemale FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where ep.gender='Female' and doc.specialisation ='71' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 6) {// for total ipd

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) as totalIPd FROM ehat_patient ep  inner join ehat_treatment et on et.patient_id = ep.patient_id inner join doctor doc On doc.Doctor_ID = et.doctor_id where doc.specialisation ='71' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";
				}

				else if (deptId == 7 || deptId == 8 || deptId == 9
						|| deptId == 10) {// for supramajor+mjor minor  operation
					sql1 = " SELECT COUNT(IF(ot.department = '1', 1, null)) as SUPRAMAJOR,COUNT(IF(ot.department = '5', 1, null)) as Major,COUNT(IF(ot.department = '6', 1, null)) AS MINOR, COUNT(IF(ot.department = '6', 1, null)) + COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null)) as totalOperation FROM  ehat_treatment wt inner join doctor doc On doc.Doctor_ID = wt.doctor_id inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and doc.specialisation ='71' and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
		
				}

				Query recQuery9 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery9.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec9 = recQuery9.list();
				for (Map<String, Object> row1 : listRec9) {

					if (deptId == 1) {

						deptPrgCountNCD = ((Number) row1.get("OPDmale")).intValue();

					} else if (deptId == 2) {

						deptPrgCountNCD = ((Number) row1.get("OPDfemale"))
								.intValue();

					} else if (deptId == 3) {

						deptPrgCountNCD = ((Number) row1.get("OPDtotal"))
								.intValue();

					} else if (deptId == 4) {

						deptPrgCountNCD = ((Number) row1.get("IPDmale")).intValue();

					} else if (deptId == 5) {

						deptPrgCountNCD = ((Number) row1.get("IpdFemale"))
								.intValue();
					} else if (deptId == 6) {

						deptPrgCountNCD = ((Number) row1.get("totalIPd"))
								.intValue();

					} else if (deptId == 7) {

						deptPrgCountNCD = ((Number) row1.get("SUPRAMAJOR"))
								.intValue();
					} else if (deptId == 8) {

						deptPrgCountNCD = ((Number) row1.get("Major")).intValue();

					} else if (deptId == 9) {

						deptPrgCountNCD = ((Number) row1.get("MINOR")).intValue();

					} else if (deptId == 10) {

						deptPrgCountNCD = ((Number) row1.get("totalOperation"))
								.intValue();

					}
				}
				
				
				
				// For Month Count Lithospery
				if (deptId == 1) {

					sql = "SELECT COUNT(IF(bill.group_name = 'E.S.W.L.(Lithotripsy)', 1, null)) AS Lithotripsy FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and month(bill.assign_date) ="
							+ fromMonth
							+ " and Year(bill.assign_date)="
							+ fromYear;

				}

				Query recQuery10 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);

				recQuery10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec10 = recQuery10.list();
				for (Map<String, Object> row : listRec10) {

					if (deptId == 1) {

						lithomonthcount = ((Number) row.get("Lithotripsy"))
								.intValue();

					}
				}

				// For Progresive Count Lithospery

				if (deptId == 1) {
					sql1 = "SELECT COUNT(IF(bill.group_name = 'E.S.W.L.(Lithotripsy)', 1, null)) AS Lithotripsy"
							+ " FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and date(bill.assign_date) >= concat("
							+ fromYear
							+ ", '-04-01') and date(bill.assign_date) <= concat("
							+ fromYear + ", '-" + fromMonth + "-31')";

				}

				Query recQuery11 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql1);
				recQuery11.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec11 = recQuery11.list();
				for (Map<String, Object> row1 : listRec11) {

					if (deptId == 1) {

						lithoprogcount= ((Number) row1.get("Lithotripsy")).intValue();

					}

				}
			

				TreatmentDto dto = new TreatmentDto();
				
				dto.setMonthlycount(deptMonth);
				dto.setProgressivecount(deptPrgCount);
				
				dto.setDeptMonthCountplastic(deptMonthCountplastic);
				dto.setDeptPrgCountPlastic(deptPrgCountPlastic);
				
				dto.setDeptMonthCountPaediatric(deptMonthCountPaediatric);
				dto.setDeptPrgCountPaediatric(deptPrgCountPaediatric);
				
	            dto.setDeptMonthCountNCD(deptMonthCountNCD);
				dto.setDeptPrgCountNCD(deptPrgCountNCD);
				
				dto.setLithomonthCount(lithomonthcount);
				dto.setLithoprogcount(lithoprogcount);
				
				listsubservice.add(dto);
				deptId++;
				dto = null;

			}
			
			
			
		} catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;

	}

	@Override
	public List<HospitalReport> getMonthlyOutPutFormatSpecilitywiseReport(
			String fromMonth, String fromYear) {


		List<String> deptList = new ArrayList<String>();
		deptList.add("NewOPD");
		deptList.add("OldOPD");
		deptList.add("TotalOPD");
      	deptList.add("TotalIPD");
      	deptList.add("Major");
		deptList.add("SupraMajor");
		deptList.add("Lithotripsy");
		deptList.add("UroDynamic");
		
		String sql = "";
		String sql1 = "";
	

		int deptPrgCount = 0, deptMonth = 0,Urologycount = 0,deptPrgCountUrology = 0, newpatient=0,totalpatient=0,oldpatient=0, newpatientpro=0,totalpatientpro=0,oldpatientpro=0, deptMonthCountplastic = 0, deptMonthCountPaediatric = 0, deptMonthCountNCD = 0,deptPrgCountPlastic=0, deptPrgCountPaediatric=0,deptPrgCountNCD=0 ,lithomonthcount=0,lithoprogcount=0;  
       
        int montDialysisnephor=0,progresiveDialysisnephro =0, montUroNephor=0,progresiveUroNephro =0, montPeadiNephor=0,progresivePeadiNephro =0,  montICUNephor=0,progresiveICUNephro =0, montPlasticNephor=0,progresivePlasticNephro =0;
		
        int montDialysisUro=0,progresiveDialysisUro =0, montUroUro=0,progresiveUroUro =0, montPeadiUro=0,progresivePeadiUro =0,  montICUUro=0,progresiveICUUro =0, montPlasticUro=0,progresivePlasticUro =0;

        int montDialysisPedia=0,progresiveDialysisPedia =0, montUroPedia=0,progresiveUroPedia =0, montPeadiPedia=0,progresivePeadiPedia =0,  montICUPedia=0,progresiveICUPedia =0, montPlasticPedia=0,progresivePlasticPedia =0;

        int montDialysisPlastic=0,progresiveDialysisPlastic =0, montUroPlastic=0,progresiveUroPlastic =0, montPeadiPlastic=0,progresivePeadiPlastic =0,  montICUPlastic=0,progresiveICUPlastic =0, montPlasticPlastic=0,progresivePlasticPlastic =0;

        int deptId = 1;

		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
		try {
			for (String deptName : deptList) {

				// For Month Count nephro
				if (deptId == 1) {// for opd newpatient

					sql = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

				
				} else if (deptId == 2) {// for opd Oldpatient= totalopd-newopd below calcultaion 

					sql = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count >'1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;
				
				} else if (deptId == 3) {// for total opd

					sql = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;
		

				} else if (deptId == 4) {// for ipd Total patient

					sql = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as TotalIpd FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;
				
				} 

				else if (deptId == 5  ) {// for supramajor+mjor 
					sql = "	SELECT  COUNT(IF(d2.specialisation = '43', 1, null)) as totalOperation  FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1)  and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
					
				}

				Query recQuery = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
			
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for (Map<String, Object> row : listRec) {

					if (deptId == 1) {

						deptMonth = ((Number) row.get("NewOPD")).intValue();
						
						
					} else if (deptId == 2) {

						deptMonth = ((Number) row.get("OldOPD")).intValue();
                   
						
					} else if (deptId == 3) {

						deptMonth = ((Number) row.get("TotalOPD")).intValue();
						
					} else if (deptId == 4) {

						deptMonth = ((Number) row.get("TotalIpd")).intValue();
						
					} else if (deptId == 5) {

						deptMonth = ((Number) row.get("totalOperation")).intValue();
					} 

				}

				
				
				// For Progresive Count nephro 

				if (deptId == 1) { // for opd new patient

					sql1 = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count ='1'  and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 2) { // for opd Oldpatient= totalopd-newopd below calcultaion 

					sql1 = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count > '1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 3) { // for total opd

					sql1 = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1'  and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				} else if (deptId == 4) { // for ipd Total patient

					sql1 = "SELECT  COUNT(IF(d2.specialisation = '43',1,null)) as IpdTotal FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

				}
				else if (deptId == 5) { // for supramajor+mjor   operation
					
					sql1 = "SELECT   COUNT(IF(d2.specialisation = '43', 1, null)) as totalOperation FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and  ot.department in (5 , 1) and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
		
				}

				Query recQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec1 = recQuery1.list();
				for (Map<String, Object> row1 : listRec1) {

					if (deptId == 1) {

						deptPrgCount = ((Number) row1.get("NewOPD")).intValue();
					
				  
					} else if (deptId == 2) {

						deptPrgCount = ((Number) row1.get("OldOPD"))
								.intValue();
	                  
						
					} else if (deptId == 3) {

						deptPrgCount = ((Number) row1.get("TotalOPD"))
								.intValue();

					} else if (deptId == 4) {

						deptPrgCount = ((Number) row1.get("IpdTotal")).intValue();

					} else if (deptId == 5) {

						deptPrgCount = ((Number) row1.get("totalOperation"))
								.intValue();
					
				}
				}
				
				
					// For Month Count UroLogy
				if (deptId == 1) {// for opd newpatient

					sql = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

				} else if (deptId == 2) {// for opd Oldpatient= totalopd-newopd below calcultaion 

					sql = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1' and et.count >'1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

				} else if (deptId == 3) {// for total opd

					sql = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;


				} else if (deptId == 4) {// for ipd Total patient

					sql = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as TotalIpd FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

				} 

				else if (deptId == 5  ) {// for supramajor+mjor 
					sql = "	SELECT  COUNT(IF(d2.specialisation = '70', 1, null)) as totalOperation  FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where  wt.department_id = '2' and ot.department in (5 , 1)  and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
                        
				}

					Query recQuery2 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);
				
					recQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec2 = recQuery2.list();
					for (Map<String, Object> row : listRec2) {

						if (deptId == 1) {

							Urologycount = ((Number) row.get("NewOPD")).intValue();
							
						
							
						} else if (deptId == 2) {

							Urologycount = ((Number) row.get("OldOPD")).intValue();
							
						
						} else if (deptId == 3) {

							Urologycount = ((Number) row.get("TotalOPD")).intValue();
							
						} else if (deptId == 4) {

							Urologycount = ((Number) row.get("TotalIpd")).intValue();
							
						} else if (deptId == 5) {

							Urologycount = ((Number) row.get("totalOperation")).intValue();
						} 

					}

					
					
					// For Progresive Count Urology

					if (deptId == 1) { // for opd new patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count ='1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 2) { // for opd Oldpatient= totalopd-newopd below calcultaion 

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count >'1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 3) { // for total opd

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 4) { // for ipd Total patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '70',1,null)) as IpdTotal FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					}
					else if (deptId == 5) { // for supramajor+mjor   operation
						
						sql1 = "SELECT   COUNT(IF(d2.specialisation = '70', 1, null)) as totalOperation FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1) and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
			
					}


					Query recQuery3 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					recQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec3 = recQuery3.list();
					for (Map<String, Object> row1 : listRec3) {

						if (deptId == 1) {

							deptPrgCountUrology = ((Number) row1.get("NewOPD")).intValue();
						
						} else if (deptId == 2) {

							deptPrgCountUrology = ((Number) row1.get("OldOPD")).intValue();
						
                       
						} else if (deptId == 3) {

							deptPrgCountUrology = ((Number) row1.get("TotalOPD")).intValue();

						} else if (deptId == 4) {

							deptPrgCountUrology = ((Number) row1.get("IpdTotal")).intValue();

						} else if (deptId == 5) {

							deptPrgCountUrology = ((Number) row1.get("totalOperation")).intValue();
						
					}
					}

					
					

					// For Month Count Peadiatrics And NICU Surgeries
					if (deptId == 1) {// for opd newpatient

						sql = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} else if (deptId == 2) {// for opd Oldpatient= totalopd-newopd below calcultaion 

						sql = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count >'1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} else if (deptId == 3) {// for total opd

						sql = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;


					} else if (deptId == 4) {// for ipd Total patient

						sql = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as TotalIpd FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} 

					else if (deptId == 5  ) {// for supramajor+mjor 
						sql = "	SELECT  COUNT(IF(d2.specialisation = '18', 1, null)) as totalOperation  FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1)  and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
	                        
					}
					
					Query recQuery4 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);
				
					recQuery4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec4 = recQuery4.list();
					for (Map<String, Object> row : listRec4) {

						if (deptId == 1) {

							deptMonthCountPaediatric = ((Number) row.get("NewOPD")).intValue();
							
						} else if (deptId == 2) {

							deptMonthCountPaediatric = ((Number) row.get("OldOPD")).intValue();
					
							
						} else if (deptId == 3) {

							deptMonthCountPaediatric = ((Number) row.get("TotalOPD")).intValue();
							
						} else if (deptId == 4) {

							deptMonthCountPaediatric = ((Number) row.get("TotalIpd")).intValue();
							
						} else if (deptId == 5) {

							deptMonthCountPaediatric = ((Number) row.get("totalOperation")).intValue();
						} 

					}

					
					
					// For Progresive Count Peadiatric and NICU surgeries
					if (deptId == 1) { // for opd new patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count ='1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 2) { // for opd Oldpatient= totalopd-newopd below calcultaion 

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count >'1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 3) { // for total opd

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 4) { // for ipd Total patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '18',1,null)) as IpdTotal FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					}
					else if (deptId == 5) { // for supramajor+mjor   operation
						
						sql1 = "SELECT   COUNT(IF(d2.specialisation = '18', 1, null)) as totalOperation FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1) and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
			
					}

					Query recQuery5 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					recQuery5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec5 = recQuery5.list();
					for (Map<String, Object> row1 : listRec5) {

						if (deptId == 1) {

							deptPrgCountPaediatric = ((Number) row1.get("NewOPD")).intValue();
			
						} else if (deptId == 2) {

							deptPrgCountPaediatric = ((Number) row1.get("OldOPD"))
									.intValue();
                   
                              
						} else if (deptId == 3) {

							deptPrgCountPaediatric = ((Number) row1.get("TotalOPD"))
									.intValue();

						} else if (deptId == 4) {

							deptPrgCountPaediatric = ((Number) row1.get("IpdTotal")).intValue();

						} else if (deptId == 5) {

							deptPrgCountPaediatric = ((Number) row1.get("totalOperation"))
									.intValue();
						
					}
					}
					

					// For Month Count Plastic Surgeries
					if (deptId == 1) {// for opd newpatient

						sql = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count ='1'  and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} else if (deptId == 2) {// for opd Oldpatient= totalopd-newopd below calcultaion 

						sql = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count >'1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} else if (deptId == 3) {// for total opd

						sql = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;


					} else if (deptId == 4) {// for ipd Total patient

						sql = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as TotalIpd FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} 

					else if (deptId == 5  ) {// for supramajor+mjor 
						sql = "	SELECT  COUNT(IF(d2.specialisation = '32', 1, null)) as totalOperation  FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1)  and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
	                        
					}
					
					Query recQuery6 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);
				
					recQuery6.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec6 = recQuery6.list();
					for (Map<String, Object> row : listRec6) {

						if (deptId == 1) {

							deptMonthCountplastic = ((Number) row.get("NewOPD")).intValue();
				
							
						} else if (deptId == 2) {

							deptMonthCountplastic = ((Number) row.get("OldOPD")).intValue();
		
						} else if (deptId == 3) {

							deptMonthCountplastic = ((Number) row.get("TotalOPD")).intValue();
							
						} else if (deptId == 4) {

							deptMonthCountplastic = ((Number) row.get("TotalIpd")).intValue();
							
						} else if (deptId == 5) {

							deptMonthCountplastic = ((Number) row.get("totalOperation")).intValue();
						} 

					}

					
					
					// For Progresive Count plastic surgeries

					if (deptId == 1) { // for opd new patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count ='1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 2) { // for opd Oldpatient= totalopd-newopd below calcultaion 

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2  where et.doctor_id = d2.Doctor_ID and et.department_id ='1'  and et.count >'1'  and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 3) { // for total opd

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id ='1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 4) { // for ipd Total patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '32',1,null)) as IpdTotal FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id ='2' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					}
					else if (deptId == 5) { // for supramajor+mjor   operation
						
						sql1 = "SELECT   COUNT(IF(d2.specialisation = '32', 1, null)) as totalOperation FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1) and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
			
					}

					Query recQuery7 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					recQuery7.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec7 = recQuery7.list();
					for (Map<String, Object> row1 : listRec7) {

						if (deptId == 1) {

							deptPrgCountPlastic = ((Number) row1.get("NewOPD")).intValue();

		
						} else if (deptId == 2) {

							deptPrgCountPlastic = ((Number) row1.get("OldOPD"))
									.intValue();
			
						} else if (deptId == 3) {

							deptPrgCountPlastic = ((Number) row1.get("TotalOPD"))
									.intValue();

						} else if (deptId == 4) {

							deptPrgCountPlastic = ((Number) row1.get("IpdTotal")).intValue();

						} else if (deptId == 5) {

							deptPrgCountPlastic = ((Number) row1.get("totalOperation"))
									.intValue();
						
					}
					}
				

					// For Month Count NCD Surgeries
					if (deptId == 1) {// for opd newpatient

						sql = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id = '1'  and et.count = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} else if (deptId == 2) {// for opd Oldpatient= totalopd-newopd below calcultaion 

						sql = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id = '1'  and et.count > '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} else if (deptId == 3) {// for total opd

						sql = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1' and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;


					} else if (deptId == 4) {// for ipd Total patient

						sql = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as TotalIpd FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and MONTH(et.created_date_time) ="+ fromMonth+ " and YEAR(et.created_date_time) = "+ fromYear;

					} 

					else if (deptId == 5  ) {// for supramajor+mjor 
						sql = "	SELECT  COUNT(IF(d2.specialisation = '71', 1, null)) as totalOperation  FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1)  and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromMonth+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y'))="+ fromYear;
	                        
					}

					Query recQuery8 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);
				
					recQuery8.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec8 = recQuery8.list();
					for (Map<String, Object> row : listRec8) {

						if (deptId == 1) {

							deptMonthCountNCD = ((Number) row.get("NewOPD")).intValue();

						} else if (deptId == 2) {

							deptMonthCountNCD = ((Number) row.get("OldOPD")).intValue();
		
							
						} else if (deptId == 3) {

							deptMonthCountNCD = ((Number) row.get("TotalOPD")).intValue();
							
						} else if (deptId == 4) {

							deptMonthCountNCD = ((Number) row.get("TotalIpd")).intValue();
							
						} else if (deptId == 5) {

							deptMonthCountNCD = ((Number) row.get("totalOperation")).intValue();
						} 

					}

					
					
					// For Progresive Count NCD surgeries

					if (deptId == 1) { // for opd new patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as NewOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id = '1'  and et.count = '1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 2) { // for opd Oldpatient= totalopd-newopd below calcultaion 

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as OldOPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and et.department_id = '1' and et.count > '1' and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 3) { // for total opd

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as TotalOPD FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '1'  and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					} else if (deptId == 4) { // for ipd Total patient

						sql1 = "SELECT  COUNT(IF(d2.specialisation = '71',1,null)) as IpdTotal FROM ehat_treatment et,doctor AS d2 where et.doctor_id = d2.Doctor_ID and  et.department_id = '2'  and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";

					}
					else if (deptId == 5) { // for supramajor+mjor   operation
						
						sql1 = "SELECT   COUNT(IF(d2.specialisation = '71', 1, null)) as totalOperation FROM    ehat_treatment wt  inner join  doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and ot.department in (5 , 1) and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+ fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+", '-" + fromMonth + "-31')";
			
					}
					Query recQuery9 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					recQuery9.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec9 = recQuery9.list();
					for (Map<String, Object> row1 : listRec9) {

						if (deptId == 1) {

							deptPrgCountNCD = ((Number) row1.get("NewOPD")).intValue();
 
	
						} else if (deptId == 2) {

							deptPrgCountNCD = ((Number) row1.get("OldOPD"))
									.intValue();

			
						} else if (deptId == 3) {

							deptPrgCountNCD = ((Number) row1.get("TotalOPD"))
									.intValue();

						} else if (deptId == 4) {

							deptPrgCountNCD = ((Number) row1.get("IpdTotal")).intValue();

						} else if (deptId == 5) {

							deptPrgCountNCD = ((Number) row1.get("totalOperation"))
									.intValue();
						
					}
					}
					// For Month Count Lithospery
					if (deptId == 1) {

						sql = "SELECT COUNT(IF(bill.group_name = 'E.S.W.L.(Lithotripsy)', 1, null)) AS Lithotripsy FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and month(bill.assign_date) ="
								+ fromMonth
								+ " and Year(bill.assign_date)="
								+ fromYear;

					}

					Query recQuery10 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec10 = recQuery10.list();
					for (Map<String, Object> row : listRec10) {

						if (deptId == 1) {

							lithomonthcount = ((Number) row.get("Lithotripsy"))
									.intValue();

						}
					}

					// For Progresive Count Lithospery

					if (deptId == 1) {
						sql1 = "SELECT COUNT(IF(bill.group_name = 'E.S.W.L.(Lithotripsy)', 1, null)) AS Lithotripsy"
								+ " FROM ehat_ris_records_details bill    where bill.radTestStatus='Y' and date(bill.assign_date) >= concat("
								+ fromYear
								+ ", '-04-01') and date(bill.assign_date) <= concat("
								+ fromYear + ", '-" + fromMonth + "-31')";

					}

					Query recQuery11 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery11.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec11 = recQuery11.list();
					for (Map<String, Object> row1 : listRec11) {

						if (deptId == 1) {

							lithoprogcount= ((Number) row1.get("Lithotripsy")).intValue();

						}

					}
				
					
					
					
					// For Month Count specility wise ward collection  Nephrology and ward is Dialysis
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1' and e.service_id ='3' and d2.specialisation = '43'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;
                  
					}

					Query recQuery13 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery13.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec13 = recQuery13.list();
					for (Map<String, Object> row : listRec13) {

						if (deptId == 1) {

							montDialysisnephor = ((Number) row.get("amount")).intValue();
						    
						}
					}

					// For Progresive Count Count specility wise ward collection  Nephrology
					if (deptId == 1) {
						sql1 = "SELECT    ifnull(sum(eb.total_bill),0) as amount FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1'  and e.service_id ='3' and d2.specialisation = '43'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery14 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery14.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec14 = recQuery14.list();
					for (Map<String, Object> row1 : listRec14) {

						if (deptId == 1) {

							progresiveDialysisnephro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					
					// For Month Count specility wise ward collection specility is Nephrology and ward is UroLology
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3' and d2.specialisation = '43' and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery15 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery15.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec15 = recQuery15.list();
					for (Map<String, Object> row : listRec15) {

						if (deptId == 1) {

							montUroNephor = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count  specility is Nephrology and ward is UroLology
					if (deptId == 1) {
						sql1 = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3' and d2.specialisation = '43'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery16 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery16.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec16 = recQuery16.list();
					for (Map<String, Object> row1 : listRec16) {

						if (deptId == 1) {

							progresiveUroNephro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection  Nephrology and ward is Peadiatric
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8) and e.service_id ='3' and d2.specialisation = '43'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery17 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery17.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec17 = recQuery17.list();
					for (Map<String, Object> row : listRec17) {

						if (deptId == 1) {

							montPeadiNephor = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  Peadiatric
					if (deptId == 1) {
						sql1 = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8) and e.service_id ='3' and d2.specialisation = '43'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery18 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery18.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec18 = recQuery18.list();
					for (Map<String, Object> row1 : listRec18) {

						if (deptId == 1) {

							progresivePeadiNephro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					// For Month Count specility wise ward collection  Nephrology and ward is ICU
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3' and d2.specialisation = '43'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery19 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery19.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec19 = recQuery19.list();
					for (Map<String, Object> row : listRec19) {

						if (deptId == 1) {

							montICUNephor = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  ICU
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3'  and d2.specialisation = '43'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery20 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery20.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec20 = recQuery20.list();
					for (Map<String, Object> row1 : listRec20) {

						if (deptId == 1) {

							progresiveICUNephro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection  Nephrology and ward is Plastic ward
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3' and d2.specialisation = '43'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery21 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery21.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec21 = recQuery21.list();
					for (Map<String, Object> row : listRec21) {

						if (deptId == 1) {

							montPlasticNephor = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  Plastic ward
					if (deptId == 1) {
						sql1 = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3' and d2.specialisation = '43'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery22 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery22.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec22 = recQuery22.list();
					for (Map<String, Object> row1 : listRec22) {

						if (deptId == 1) {

							progresivePlasticNephro= ((Number) row1.get("amount")).intValue();

						}

					}
				
/*------------------------------------------------------------------------------------------------------------------------			
*/
					// For Month Count specility wise ward collection Urology and ward is Dialysis
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1' and e.service_id ='3' and d2.specialisation = '70'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery23 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery23.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec23 = recQuery23.list();
					for (Map<String, Object> row : listRec23) {

						if (deptId == 1) {

							montDialysisUro = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count  ward collection Urology and ward is Dialysis
					if (deptId == 1) {
						sql1 = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1' and e.service_id ='3'  and d2.specialisation = '70'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery24 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery24.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec24 = recQuery24.list();
					for (Map<String, Object> row1 : listRec24) {

						if (deptId == 1) {

							progresiveDialysisUro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					
					// For Month Count specility wise ward collection specility is UroLology and ward is UroLology
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3' and d2.specialisation = '70'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery25 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery25.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec25 = recQuery25.list();
					for (Map<String, Object> row : listRec25) {

						if (deptId == 1) {

							montUroUro = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count  specility is UroLology and ward is UroLology
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3' and d2.specialisation = '70'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery26 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery26.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec26 = recQuery26.list();
					for (Map<String, Object> row1 : listRec26) {

						if (deptId == 1) {

							progresiveUroUro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection  uro and ward is Peadiatric
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8) and e.service_id ='3' and d2.specialisation = '70'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery27 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery27.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec27 = recQuery27.list();
					for (Map<String, Object> row : listRec27) {

						if (deptId == 1) {

							montPeadiUro = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward uro collection  Peadiatric
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8) and e.service_id ='3' and d2.specialisation = '70'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery28 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery28.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec28 = recQuery28.list();
					for (Map<String, Object> row1 : listRec28) {

						if (deptId == 1) {

							progresivePeadiUro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					// For Month Count specility wise ward collection  uro and ward is ICU
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3' and d2.specialisation = '70'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery29 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery29.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec29 = recQuery29.list();
					for (Map<String, Object> row : listRec29) {

						if (deptId == 1) {

							montICUUro = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  ICU
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3'  and d2.specialisation = '70'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery30 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery30.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec30 = recQuery30.list();
					for (Map<String, Object> row1 : listRec30) {

						if (deptId == 1) {

							progresiveICUUro= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection  Nephrology and ward is Plastic ward
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3' and d2.specialisation = '70'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery31 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery31.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec31 = recQuery31.list();
					for (Map<String, Object> row : listRec31) {

						if (deptId == 1) {

							montPlasticUro = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  Plastic ward
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3' and d2.specialisation = '70'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery32 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery32.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec32 = recQuery32.list();
					for (Map<String, Object> row1 : listRec32) {

						if (deptId == 1) {

							progresivePlasticUro= ((Number) row1.get("amount")).intValue();

						}

					}
/*			----------------------------------------------------------------------------------------------------------------	
*/
					
					// For Month Count specility wise ward collection  Pediatrics and ward is Dialysis
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1' and e.service_id ='3' and d2.specialisation = '18'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery33 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery33.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec33 = recQuery33.list();
					for (Map<String, Object> row : listRec33) {

						if (deptId == 1) {

							montDialysisPedia = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise Pediatrics  collection  Nephrology ward
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1' and e.service_id ='3' and d2.specialisation = '18'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery34 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery34.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec34 = recQuery34.list();
					for (Map<String, Object> row1 : listRec34) {

						if (deptId == 1) {

							progresiveDialysisPedia= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					
					// For Month Count specility wise ward collection specility is Pediatrics and ward is UroLology
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3' and d2.specialisation = '18'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery35 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery35.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec35 = recQuery35.list();
					for (Map<String, Object> row : listRec35) {

						if (deptId == 1) {

							montUroPedia = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count  specility is Pediatrics and ward is UroLology
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3'  and d2.specialisation = '18'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery36 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery36.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec36 = recQuery36.list();
					for (Map<String, Object> row1 : listRec36) {

						if (deptId == 1) {

							progresiveUroPedia= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection  Pediatrics and ward is Peadiatric
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8) and e.service_id ='3' and d2.specialisation = '18'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery37 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery37.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec37 = recQuery37.list();
					for (Map<String, Object> row : listRec37) {

						if (deptId == 1) {

							montPeadiPedia = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise Pediatrics  collection  Peadiatric ward
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8) and e.service_id ='3' and d2.specialisation = '18'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery38 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery38.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec38 = recQuery38.list();
					for (Map<String, Object> row1 : listRec38) {

						if (deptId == 1) {

							progresivePeadiPedia= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					// For Month Count specility wise   Pediatrics  and ward is ICU
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3'  and d2.specialisation = '18'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery39 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery39.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec39 = recQuery39.list();
					for (Map<String, Object> row : listRec39) {

						if (deptId == 1) {

							montICUPedia = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  ICU
					if (deptId == 1) {
						sql1 = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3'  and d2.specialisation = '18'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery40 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery40.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec40 = recQuery40.list();
					for (Map<String, Object> row1 : listRec40) {

						if (deptId == 1) {

							progresiveICUPedia= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection   and ward is Plastic ward
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3'  and d2.specialisation = '18'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery41 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery41.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec41 = recQuery41.list();
					for (Map<String, Object> row : listRec41) {

						if (deptId == 1) {

							montPlasticPedia = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  Plastic ward
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3' and d2.specialisation = '18'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery42 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery42.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec42 = recQuery42.list();
					for (Map<String, Object> row1 : listRec42) {

						if (deptId == 1) {

							progresivePlasticPedia= ((Number) row1.get("amount")).intValue();

						}

					}
/*				---------------------------------------------------------------------------------
*/		
			
					
					
					// For Month Count specility wise ward collection  Plastic and ward is Dialysis
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1' and e.service_id ='3'  and d2.specialisation = '32'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery43 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery43.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec43 = recQuery43.list();
					for (Map<String, Object> row : listRec43) {

						if (deptId == 1) {

							montDialysisPlastic = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  Nephrology
					if (deptId == 1) {
						sql1 = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '1' and e.service_id ='3'  and d2.specialisation = '32'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery44 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery44.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec44 = recQuery44.list();
					for (Map<String, Object> row1 : listRec44) {

						if (deptId == 1) {

							progresiveDialysisPlastic = ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					
					// For Month Count specility wise ward collection specility is Nephrology and ward is UroLology
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3' and d2.specialisation = '32'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery45 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery45.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec45 = recQuery45.list();
					for (Map<String, Object> row : listRec45) {

						if (deptId == 1) {

							montUroPlastic = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count  specility is Nephrology and ward is UroLology
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(4,5) and e.service_id ='3'  and d2.specialisation = '32'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery46 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery46.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec46 = recQuery46.list();
					for (Map<String, Object> row1 : listRec46) {

						if (deptId == 1) {

							progresiveUroPlastic= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection  Nephrology and ward is Peadiatric
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8)  and e.service_id ='3' and d2.specialisation = '32'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery47 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery47.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec47 = recQuery47.list();
					for (Map<String, Object> row : listRec47) {

						if (deptId == 1) {

							montPeadiPlastic = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  Peadiatric
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(2,8) and e.service_id ='3' and d2.specialisation = '32'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery48 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery48.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec48 = recQuery48.list();
					for (Map<String, Object> row1 : listRec48) {

						if (deptId == 1) {

							progresivePeadiPlastic= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					
					// For Month Count specility wise ward collection  Nephrology and ward is ICU
					if (deptId == 1) {

						sql = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3'  and d2.specialisation = '32'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery49 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery49.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec49 = recQuery49.list();
					for (Map<String, Object> row : listRec49) {

						if (deptId == 1) {

							montICUPlastic = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  ICU
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype = '6' and e.service_id ='3'  and d2.specialisation = '32'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery50 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery50.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec50 = recQuery50.list();
					for (Map<String, Object> row1 : listRec50) {

						if (deptId == 1) {

							progresiveICUPlastic= ((Number) row1.get("amount")).intValue();

						}

					}
				
					
					// For Month Count specility wise ward collection  Nephrology and ward is Plastic ward
					if (deptId == 1) {

						sql = "SELECT   ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3'  and d2.specialisation = '32'    and MONTH(e.created_date_time) = "+fromMonth+" and YEAR(e.created_date_time) = "+fromYear;

					}

					Query recQuery51 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql);

					recQuery51.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec51 = recQuery51.list();
					for (Map<String, Object> row : listRec51) {

						if (deptId == 1) {

							montPlasticPlastic = ((Number) row.get("amount"))
									.intValue();

						}
					}

					// For Progresive Count Count specility wise ward collection  Plastic ward
					if (deptId == 1) {
						sql1 = "SELECT  ifnull(sum(eb.total_bill),0) as amount  FROM ehat_bill_details_ipd e  inner join  beds b ON b.Bed_ID = e.sub_service_id inner join  hall h ON h.Hall_ID = b.Hall_ID inner join hall_type ht ON ht.idhall_type = h.Htype  inner join  ehat_treatment et ON et.treatment_id = e.treatment_id   inner join doctor AS d2 ON d2.Doctor_ID = et.doctor_id  join  ehat_bill_master eb ON (eb.treatment_id = e.treatment_id) where  h.Htype in(3,7) and e.service_id ='3' and d2.specialisation = '32'    and date(e.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(e.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";


					}

					Query recQuery52 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					recQuery52.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listRec52 = recQuery52.list();
					for (Map<String, Object> row1 : listRec52) {

						if (deptId == 1) {

							progresivePlasticPlastic = ((Number) row1.get("amount")).intValue();

						}

					}
/*				------------------------------------------------------------------------
*/					
						
					
					
					HospitalReport dto = new HospitalReport();
				
				
				dto.setMontDialysisnephor(montDialysisnephor);
				dto.setProgresiveDialysisnephro(progresiveDialysisnephro);
				
				dto.setMontUroNephor(montUroNephor);
				dto.setProgresiveUroNephro(progresiveUroNephro);
				
				dto.setMontPeadiNephor(montPeadiNephor);
				dto.setProgresivePeadiNephro(progresivePeadiNephro);
				
				dto.setMontICUNephor(montICUNephor);
				dto.setProgresiveICUNephro(progresiveICUNephro);
				
				dto.setMontPlasticNephor(montPlasticNephor);
				dto.setProgresivePlasticNephro(progresivePlasticNephro);
				
				
				
				
				
				dto.setMontDialysisUro(montDialysisUro);
				dto.setProgresiveDialysisUro(progresiveDialysisUro);
				
				dto.setMontUroUro(montUroUro);
				dto.setProgresiveUroUro(progresiveUroUro);
				
				dto.setMontPeadiUro(montPeadiUro);
				dto.setProgresivePeadiUro(progresivePeadiUro);
				
				dto.setMontICUUro(montICUUro);
				dto.setProgresiveICUUro(progresiveICUUro);
				
				dto.setMontPlasticUro(montPlasticUro);
				dto.setProgresivePlasticUro(progresivePlasticUro);
				
				
				
				
				dto.setMontDialysisPedia(montDialysisPedia);
				dto.setProgresiveDialysisPedia(progresiveDialysisPedia);
				
				dto.setMontUroPedia(montUroPedia);
				dto.setProgresiveUroPedia(progresiveUroPedia);
				
				dto.setMontPeadiPedia(montPeadiPedia);
				dto.setProgresivePeadiPedia(progresivePeadiPedia);
				
				dto.setMontICUPedia(montICUPedia);
				dto.setProgresiveICUPedia(progresiveICUPedia);
				
				dto.setMontPlasticPedia(montPlasticPedia);
				dto.setProgresivePlasticPedia(progresivePlasticPedia);
				
				
				
				
				
				dto.setMontDialysisPlastic(montDialysisPlastic);
				dto.setProgresiveDialysisPlastic(progresiveDialysisPlastic);
				
				dto.setMontUroPlastic(montUroPlastic);
				dto.setProgresiveUroPlastic(progresiveUroPlastic);
				
				dto.setMontPeadiPlastic(montPeadiPlastic);
				dto.setProgresivePeadiPlastic(progresivePeadiPlastic);
				
				dto.setMontICUPlastic(montICUPlastic);
				dto.setProgresiveICUPlastic(progresiveICUPlastic);
				
				dto.setMontPlasticPlastic(montPlasticPlastic);
				dto.setProgresivePlasticPlastic(progresivePlasticPlastic);
				
				
				
				
				
				dto.setMonthlycount(deptMonth);
				dto.setProgressivecount(deptPrgCount);
			   
				dto.setDeptMonthUrology(Urologycount);
				dto.setDeptPrgCountUrology(deptPrgCountUrology);
					
				dto.setDeptMonthCountplastic(deptMonthCountplastic);
				dto.setDeptPrgCountPlastic(deptPrgCountPlastic);
				
				dto.setDeptMonthCountPaediatric(deptMonthCountPaediatric);
				dto.setDeptPrgCountPaediatric(deptPrgCountPaediatric);
				
	            dto.setDeptMonthCountNCD(deptMonthCountNCD);
				dto.setDeptPrgCountNCD(deptPrgCountNCD);
				
				dto.setLithomonthCount(lithomonthcount);
				dto.setLithoprogcount(lithoprogcount);
				
				listsubservice.add(dto);
				deptId++;
				dto = null;
		
		}
			} catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;

	
	}

	@Override
	public List<HospitalReport> getDeathInformationSexwiseReport(
			String fromMonth, String fromYear) {
	   	  
  	  List<String> deptList = new ArrayList<String>();
			deptList.add("0-7 days");
			deptList.add("8-29 days");		
			deptList.add("30-1 years");	
		    deptList.add("1 to 5 years");
		    deptList.add("Adulth Death");	
			
			
			String sql="";
			String sql1="";
			int deptPrgCount=0,deptMonthCount=0, deptPrgCountFemale=0,deptMonthCountFemale=0;
			int deptId=1;
		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
		try {
			for(String deptName : deptList){
				
				
				 // For Month Count 0 days to 7 days dead 
				if(deptId == 1){
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and  ep.age_days between'0' and '07' and ep.age='0' and ep.age_months='0' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
			
				}else if(deptId == 2 ){//For Month Count 8 days to 29 days dead 
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and  ep.age_days between'8' and '29' and ep.age='0' and ep.age_months='0' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				

				}else if(deptId == 3){//For Month Count 30days to 1 year dead 
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead'  and ep.gender='Male' and (ep.age <= '1' or ep.age_days >= '30' or ep.age_months >= '1') and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
	
				}else if(deptId == 4){ //For Month Count 1 to 5 year dead 
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and (ep.age>='1' or ep.age<='5') and ep.age_days<='0' and ep.age_months<='1' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
                }
                else if(deptId == 5){ //For Month Count 18+ year dead 
				
                	sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and ep.age>='18'  and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
            	}
				Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for(Map<String, Object> row : listRec){
					
					if(deptId == 1){
						
						deptMonthCount = ((Number)row.get("agecount")).intValue();	
						
					}else if(deptId == 2){
						
						deptMonthCount = ((Number)row.get("agecount")).intValue();
						
					}else if(deptId == 3){
						
						deptMonthCount = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 4){
						
						deptMonthCount = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 5){
						
						deptMonthCount = ((Number)row.get("agecount")).intValue();	
						
					}
				}
								
				// For Progressive Count
	             if(deptId == 1){
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and  ep.age_days between'0' and '07' and ep.age='0' and ep.age_months='0' and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
			
				}else if(deptId == 2 ){//For Month Count 8 days to 29 days dead 
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and  ep.age_days between'8' and '29' and ep.age='0' and ep.age_months='0' and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				

				}else if(deptId == 3){//For Month Count 30days to 1 year dead 
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and (ep.age<='1' or ep.age_days >= '30' or ep.age_months>='1') and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";							
	
				}else if(deptId == 4){ //For Month Count 1 to 5 year dead 
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and (ep.age>='1' or ep.age<='5') and ep.age_days<='0' and ep.age_months<='1' and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
                }
                else if(deptId == 5){ //For Month Count 18+ year dead 
				
                	sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Male' and ep.age>='18' and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
            	}
	             
				Query recQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec1 = recQuery1.list();
				for(Map<String, Object> row : listRec1){
					
					if(deptId == 1){
						
						deptPrgCount = ((Number)row.get("agecount")).intValue();	
					
						
					}else if(deptId == 2){
						
						deptPrgCount = ((Number)row.get("agecount")).intValue();
						
					}else if(deptId == 3){
						
						deptPrgCount = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 4){
						
						deptPrgCount = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 5){
						
						deptPrgCount = ((Number)row.get("agecount")).intValue();	
						
					}
				}
		
			
		
				 // For Month Count 0 days to 7 days dead female
				if(deptId == 1){
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and ep.age_days between'0' and '07'  and ep.age='0' and ep.age_months='0' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
			
				}else if(deptId == 2 ){//For Month Count 8 days to 29 days dead female
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and ep.age_days between'8' and '29' and ep.age='0' and ep.age_months='0' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				

				}else if(deptId == 3){//For Month Count 30days to 1 year dead female
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and (ep.age<='1' or ep.age_days >= '30' or ep.age_months>='1') and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
	
				}else if(deptId == 4){ //For Month Count 1 to 5 year dead female
					
					sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and (ep.age>='1' or ep.age<='5')  and ep.age_days<='0' and ep.age_months<='1' and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
                }
                else if(deptId == 5){ //For Month Count 18+ year dead female
				
                	sql="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and ep.age>='18'  and MONTH(et.created_date_time) ="+fromMonth+" and YEAR(et.created_date_time) ="+fromYear;				
            	}
				Query recQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				recQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec2 = recQuery2.list();
				for(Map<String, Object> row : listRec2){
					
					if(deptId == 1){
						
						deptMonthCountFemale = ((Number)row.get("agecount")).intValue();	
						
					}else if(deptId == 2){
						
						deptMonthCountFemale = ((Number)row.get("agecount")).intValue();
						
					}else if(deptId == 3){
						
						deptMonthCountFemale = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 4){
						
						deptMonthCountFemale = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 5){
						
						deptMonthCountFemale = ((Number)row.get("agecount")).intValue();	
						
					}
				}
								
				// For Progressive Count
	             if(deptId == 1){
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and  ep.age_days between'0' and '07'  and ep.age='0' and ep.age_months='0' and  date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
			
				}else if(deptId == 2 ){//For Month Count 8 days to 29 days dead female
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and  ep.age_days between'8' and '29' and ep.age='0' and ep.age_months='0' and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				

				}else if(deptId == 3){//For Month Count 30days to 1 year dead female
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and (ep.age<='1' or ep.age_days >= '30' or ep.age_months>='1') and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";							
	
				}else if(deptId == 4){ //For Month Count 1 to 5 year dead female
					
					sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and (ep.age>='1' or ep.age<='5') and ep.age_days<='0' and ep.age_months<='1' and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
                }
                else if(deptId == 5){ //For Month Count 18+ year dead female
				
                	sql1="SELECT  count(ep.age_days) as agecount FROM ehat_treatment et inner join ehat_patient ep ON ep.patient_id = et.patient_id inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  ds.discharge_type = 'Dead' and ep.gender='Female' and ep.age>='18' and date(ep.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ep.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
            	}
	             
				Query recQuery3 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				recQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec3 = recQuery3.list();
				for(Map<String, Object> row : listRec3){
					
					if(deptId == 1){
						
						deptPrgCountFemale = ((Number)row.get("agecount")).intValue();	
					
						
					}else if(deptId == 2){
						
						deptPrgCountFemale = ((Number)row.get("agecount")).intValue();
						
					}else if(deptId == 3){
						
						deptPrgCountFemale = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 4){
						
						deptPrgCountFemale = ((Number)row.get("agecount")).intValue();	
					}else if(deptId == 5){
						
						deptPrgCountFemale = ((Number)row.get("agecount")).intValue();	
						
					}
				}
		
			
				
			
				HospitalReport dto =new HospitalReport();
			dto.setMonthlycount(deptMonthCount);
			dto.setProgressivecount(deptPrgCount);
			dto.setDeptMonthCountFemale(deptMonthCountFemale);
			dto.setDeptPrgCountFemale(deptPrgCountFemale);
			listsubservice.add(dto);
			deptId++;
			dto = null;
					
		}
		}catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;
	}

	@Override
	public List<HospitalReport> getYearWiseActivitiesReport2(String fromDate,
			String ToDate) {

        
		List<String> deptList = new ArrayList<String>();
		deptList.add("OPD");
		deptList.add("IPD");		
		deptList.add("Major surgery");	
	    deptList.add("Minor surgery");
	    deptList.add("Dialysis");
	    deptList.add("Lithotripsy");
	  /*  deptList.add("Dialysis");
	    deptList.add("Lithotripsy");
	    deptList.add("Dialysis");
	    deptList.add("UroFlowmentry");
	    deptList.add("X-ray");
	    deptList.add("ECG");
	    deptList.add("Sonography");
	    deptList.add("Blood Test");
	    deptList.add("Urine Test");
	    deptList.add("Physiotheraphy");*/
		
		String sql = "";
		String sql1 = "";
	

		int deptPrgCount = 0, deptMonth = 0,Urologycount = 0,deptPrgCountUrology = 0, newpatient=0,totalpatient=0,oldpatient=0, newpatientpro=0,totalpatientpro=0,oldpatientpro=0, deptMonthCountplastic = 0, deptMonthCountPaediatric = 0, deptMonthCountNCD = 0,deptPrgCountPlastic=0, deptPrgCountPaediatric=0,deptPrgCountNCD=0 ,lithomonthcount=0,lithoprogcount=0;  
       
       
        int deptId = 1;

		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
		try {
			for (String deptName : deptList) {

				// For Count nephro and UroLogy
				if (deptId == 1) {// for opd patient

					
					sql = "SELECT  COUNT(IF(et.department_id ='1',1,null)) as OPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation in(43,70) and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";
				
				} else if (deptId == 2) {// for ipd Total patient

					sql = "SELECT  COUNT(IF(et.department_id ='2',1,null)) as IPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation in(43,70) and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";
					
				}
             	else if (deptId == 3 || deptId == 4) {// for major+minor
					sql = "	SELECT   COUNT(IF(ot.department= '5', 1, null)) as Major, COUNT(IF(ot.department= '1', 1, null)) as Minor FROM ehat_treatment wt inner join doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where  wt.department_id = '2' and d2.specialisation in(43,70) and (STR_TO_DATE(et.date, '%d/%m/%Y')) between  '"+fromDate+"' and '"+ToDate+"'";
					
				}


				Query recQuery = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);

				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for (Map<String, Object> row : listRec) {

					if (deptId == 1) {

						deptMonth = ((Number) row.get("OPD")).intValue();

					} else if (deptId == 2) {

						deptMonth = ((Number) row.get("IPD")).intValue();

					} else if (deptId == 3) {

						deptMonth = ((Number) row.get("Major")).intValue();

					} else if (deptId == 4) {

						deptMonth = ((Number) row.get("Minor")).intValue();

					}

				}

				// For Count Plastic Surgery
				if (deptId == 1) {// for opd patient

					sql = "SELECT  COUNT(IF(et.department_id ='1',1,null)) as OPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation = '32' and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";

				} else if (deptId == 2) {// for ipd Total patient

					sql = "SELECT  COUNT(IF(et.department_id ='2',1,null)) as IPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation = '32' and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";
							

				}

				else if (deptId == 3 || deptId == 4) {// for major+minor
					sql = "	SELECT   COUNT(IF(ot.department= '5', 1, null)) as Major, COUNT(IF(ot.department= '1', 1, null)) as Minor FROM ehat_treatment wt inner join doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and d2.specialisation = '32' and (STR_TO_DATE(et.date, '%d/%m/%Y')) between  '"+fromDate+"' and '"+ToDate+"'";
							

				}

				Query recQuery1 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);

				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec1 = recQuery1.list();
				for (Map<String, Object> row : listRec1) {

					if (deptId == 1) {

						deptMonthCountplastic = ((Number) row.get("OPD")).intValue();

					} else if (deptId == 2) {

						deptMonthCountplastic = ((Number) row.get("IPD")).intValue();

					} else if (deptId == 3) {

						deptMonthCountplastic = ((Number) row.get("Major")).intValue();

					} else if (deptId == 4) {

						deptMonthCountplastic = ((Number) row.get("Minor")).intValue();

					}

				}

				// For Count Pediatric & NICU Surgery
				if (deptId == 1) {// for opd patient

					sql = "SELECT  COUNT(IF(et.department_id ='1',1,null)) as OPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation = '18' and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";
							

				} else if (deptId == 2) {// for ipd Total patient

					sql = "SELECT  COUNT(IF(et.department_id ='2',1,null)) as IPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation = '18' and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";
							

				}

				else if (deptId == 3 || deptId == 4) {// for major+minor
					sql = "	SELECT   COUNT(IF(ot.department= '5', 1, null)) as Major, COUNT(IF(ot.department= '1', 1, null)) as Minor FROM ehat_treatment wt inner join doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and d2.specialisation = '18' and (STR_TO_DATE(et.date, '%d/%m/%Y')) between  '"+fromDate+"' and '"+ToDate+"'";
						

				}

				Query recQuery2 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);

				recQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec2 = recQuery2.list();
				for (Map<String, Object> row : listRec2) {

					if (deptId == 1) {

						deptMonthCountPaediatric = ((Number) row.get("OPD")).intValue();

					} else if (deptId == 2) {

						deptMonthCountPaediatric = ((Number) row.get("IPD")).intValue();

					} else if (deptId == 3) {

						deptMonthCountPaediatric = ((Number) row.get("Major")).intValue();

					} else if (deptId == 4) {

						deptMonthCountPaediatric = ((Number) row.get("Minor")).intValue();

					}

				}

				// For Count NCD Surgery
				if (deptId == 1) {// for opd patient

					sql = "SELECT  COUNT(IF(et.department_id ='1',1,null)) as OPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation = '71' and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";
							

				} else if (deptId == 2) {// for ipd Total patient

					sql = "SELECT  COUNT(IF(et.department_id ='2',1,null)) as IPD FROM ehat_treatment et,doctor AS d2 where  et.doctor_id = d2.Doctor_ID and d2.specialisation = '71' and et.created_date_time between '"+fromDate+"' and '"+ToDate+"'";
							

				}

				else if (deptId == 3 || deptId == 4) {// for major+minor
					sql = "	SELECT   COUNT(IF(ot.department= '5', 1, null)) as Major, COUNT(IF(ot.department= '6', 1, null)) as Minor FROM ehat_treatment wt inner join doctor AS d2 ON d2.Doctor_ID = wt.doctor_id  inner join treatment_operations et ON et.Treatment_ID = wt.treatment_id inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID where wt.department_id = '2' and d2.specialisation = '71' and (STR_TO_DATE(et.date, '%d/%m/%Y')) between  '"+fromDate+"' and '"+ToDate+"'";
							

				}

				Query recQuery3 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);

				recQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec3 = recQuery3.list();
				for (Map<String, Object> row : listRec3) {

					if (deptId == 1) {

						deptMonthCountNCD = ((Number) row.get("OPD")).intValue();

					} else if (deptId == 2) {

						deptMonthCountNCD = ((Number) row.get("IPD")).intValue();

					} else if (deptId == 3) {

						deptMonthCountNCD = ((Number) row.get("Major")).intValue();

					} else if (deptId == 4) {

						deptMonthCountNCD = ((Number) row.get("Minor")).intValue();

					}

				}
				
				
				// For Count Lithoripsy , xray,sonography, ecg..
				if (deptId == 1 || deptId == 2 || deptId == 3 || deptId == 4) {// for opd patient
					
					sql = "SELECT  COUNT(IF(bill.group_name = 'E.S.W.L.(Lithotripsy)', 1, null)) AS Lithotripsy ,COUNT(IF(bill.group_name = 'X-RAY', 1, null)) AS XRAY, COUNT(IF(bill.idtest_radiology = '159', 1, null)) AS ECG , COUNT(IF(bill.idtest_radiology = '31', 1, null)) AS sonography"
							+ " FROM ehat_ris_records_details bill where bill.radTestStatus='Y' and bill.assign_date between  '"+fromDate+"' and '"+ToDate+"'";

				} 
				
				
             	// For Count LabInvenstigations for bloodsuger
				if (deptId == 5) {
					
					sql = "SELECT COUNT(*) AS LabInvenstigationsbloodsuger FROM ehat_lab_result_mst_view bill where bill.test_id not in (123 , 124.125, 139, 152, 153, 168) and bill.assign_date between  '"+fromDate+"' and '"+ToDate+"'";
           
				} 
				
				// For Count LabInvenstigations for urine
				if (deptId == 6) {
					
					sql = "SELECT COUNT(*) AS LabInvenstigationsUrine FROM ehat_lab_result_mst_view bill where bill.test_id in (123 , 124.125, 139, 152, 153, 168) and bill.assign_date between  '"+fromDate+"' and '"+ToDate+"'";
				     
				} 
				
				

				Query recQuery4 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);

				recQuery4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec4 = recQuery4.list();
				for (Map<String, Object> row : listRec4) {

					if (deptId == 1) {

						deptPrgCount = ((Number) row.get("Lithotripsy")).intValue();

					} else if (deptId == 2) {

						deptPrgCount = ((Number) row.get("XRAY")).intValue();

					} else if (deptId == 3) {

						deptPrgCount = ((Number) row.get("ECG")).intValue();

					} else if (deptId == 4) {

						deptPrgCount = ((Number) row.get("sonography")).intValue();

					}
					
					else if (deptId == 5) {

						deptPrgCount = ((Number) row.get("LabInvenstigationsbloodsuger")).intValue();

					}
					
					else if (deptId == 6) {

						deptPrgCount = ((Number) row.get("LabInvenstigationsUrine")).intValue();

					}

				}
				
				
				HospitalReport dto = new HospitalReport();

				dto.setMonthlycount(deptMonth);
               	dto.setDeptMonthCountplastic(deptMonthCountplastic);
				dto.setDeptMonthCountPaediatric(deptMonthCountPaediatric);
				dto.setDeptMonthCountNCD(deptMonthCountNCD);
	            dto.setProgressivecount(deptPrgCount);
				listsubservice.add(dto);
				deptId++;
				dto = null;

			}
			} catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;
	
	}

	@Override
	public List<HospitalReport> getYearWiseActivitiesReport3(String fromMonth,
			String fromYear) {

		List<String> deptList = new ArrayList<String>();
		deptList.add("1");
		deptList.add("2");
		deptList.add("3");
		deptList.add("4");
		deptList.add("5");
		deptList.add("6");
		deptList.add("7");
		deptList.add("9");
		deptList.add("10");
		deptList.add("11");
		deptList.add("12");
		deptList.add("13");
		deptList.add("14");
		deptList.add("15");

		String sql = "";
		String sql1 = "";

		int deptPrgCount = 0, deptMonthCount = 0, ipdcount=0,suergerycount=0,totalcountipdopd=0,labcount=0,ecgcount=0,xraycount=0,ipdamount=0,ipddeath48hoursbefore=0,ipddeath48hoursafter=0,totaldeath=0;
		int  ipdcountpro=0,suergerycountpro=0,totalcountipdopdpro=0,labcountpro=0,ecgcountpro=0,xraycountpro=0,ipdamountpro=0,ipddeath48hoursbeforepro=0,ipddeath48hoursafterpro=0,totaldeathpro=0;

		int deptId = 1;
		List<HospitalReport> listsubservice = new ArrayList<HospitalReport>();
		try {
			for (String deptName : deptList) {

				// For Month Count
				if (deptId == 1 || deptId == 2 || deptId == 3 || deptId == 4) {

					sql = "SELECT COUNT(IF(et.department_id = '2', 1, null)) AS IPD, COUNT(IF(ds.discharge_type = 'Dead',1,null)) as Dead, COUNT(IF(ds.discharge_type = 'Discharge',1,null)) as Discharge,COUNT(IF( et.adm_cancel_flag='Y',1,null)) as LAMA FROM ehat_treatment et inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where MONTH(et.created_date_time) = "
							+ fromMonth
							+ " and YEAR(et.created_date_time) ="
							+ fromYear;
				} else if (deptId == 5) {

					sql = "SELECT (COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null))) as SUPRAMAJORMAJOR FROM  treatment_operations et inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet on eet.treatment_id=et.Treatment_ID where eet.department_id = '2' and MONTH(STR_TO_DATE(et.date, '%d/%m/%Y')) = "
							+ fromMonth
							+ " and Year(STR_TO_DATE(et.date, '%d/%m/%Y')) = "
							+ fromYear;
				} else if (deptId == 6 || deptId == 7 || deptId == 8) {

					sql = "SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OPD,COUNT(IF(et.department_id = '2', 1, null)) AS IPD,COUNT(*) AS Total FROM ehat_treatment et where MONTH(et.created_date_time) = "
							+ fromMonth
							+ " and YEAR(et.created_date_time) ="
							+ fromYear;
				} else if (deptId == 9) {

					sql = "SELECT  COUNT(*) AS LabInvenstigations FROM ehat_lab_result_mst_view et where MONTH(et.assign_date) = "
							+ fromMonth
							+ " and YEAR(et.assign_date) = "
							+ fromYear;
				} else if (deptId == 10 || deptId == 11) {

					sql = "SELECT COUNT(IF(bill.group_name = 'X-RAY', 1, null)) AS XRAY,COUNT(IF(bill.idtest_radiology = '159', 1, null)) AS ECG FROM ehat_ris_records_details bill where bill.radTestStatus = 'Y' and MONTH(bill.assign_date) = "
							+ fromMonth
							+ " and YEAR(bill.assign_date) ="
							+ fromYear;
				} else if (deptId == 12) {

					sql = "SELECT SUM(total_paid) as totalipdRevenue FROM ehat_receipt_master_ipd ipd where MONTH(ipd.created_date_time) = "
							+ fromMonth
							+ " and YEAR(ipd.created_date_time) = "
							+ fromYear;
				}

				else if (deptId == 13) {

					sql = "SELECT  COUNT(IF(ds.discharge_type = 'Dead', 1, null)) AS Before48DEAD FROM  ehat_treatment et  inner join  discharge_summery ds ON ds.Treatment_ID = et.treatment_id where et.created_date_time > (ds.discharge_date - interval 48 HOUR) and MONTH(et.created_date_time) =  "
							+ fromMonth
							+ " and YEAR(et.created_date_time) = "
							+ fromYear;
				}

				else if (deptId == 14) {

					sql = "SELECT  COUNT(IF(ds.discharge_type = 'Dead', 1, null)) AS After48DEAD FROM  ehat_treatment et  inner join  discharge_summery ds ON ds.Treatment_ID = et.treatment_id where et.created_date_time < (ds.discharge_date - interval 48 HOUR) and MONTH(et.created_date_time) =  "
							+ fromMonth
							+ " and YEAR(et.created_date_time) = "
							+ fromYear;
				} else if (deptId == 15) {

					sql = "SELECT  COUNT(IF(ds.discharge_type = 'Dead', 1, null)) AS Totaldead FROM  ehat_treatment et  inner join  discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  MONTH(et.created_date_time) =  "
							+ fromMonth
							+ " and YEAR(et.created_date_time) = "
							+ fromYear;
				}

				Query recQuery = sessionFactory.getCurrentSession()
						.createSQLQuery(sql);
				recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec = recQuery.list();
				for (Map<String, Object> row : listRec) {

					if (deptId == 1) {

						deptMonthCount = ((Number) row.get("IPD")).intValue();
						 ipdcount=deptMonthCount;
					} else if (deptId == 2) {

						deptMonthCount = ((Number) row.get("Dead")).intValue();

					} else if (deptId == 3) {

						deptMonthCount = ((Number) row.get("Discharge"))
								.intValue();

					} else if (deptId == 4) {

						deptMonthCount = ((Number) row.get("LAMA")).intValue();

					} else if (deptId == 5) {

						deptMonthCount = ((Number) row.get("SUPRAMAJORMAJOR"))
								.intValue();
						suergerycount=deptMonthCount;
						
					} else if (deptId == 6) {

						deptMonthCount = ((Number) row.get("OPD")).intValue();
					} else if (deptId == 7) {

						deptMonthCount = ((Number) row.get("IPD")).intValue();
						
					} else if (deptId == 8) {

						deptMonthCount = ((Number) row.get("Total")).intValue();
						totalcountipdopd=deptMonthCount;
					} else if (deptId == 9) {

						deptMonthCount = ((Number) row
								.get("LabInvenstigations")).intValue();
						labcount=deptMonthCount;
					} else if (deptId == 10) {

						deptMonthCount = ((Number) row.get("XRAY")).intValue();
						xraycount=deptMonthCount;
					} else if (deptId == 11) {

						deptMonthCount = ((Number) row.get("ECG")).intValue();
						ecgcount=deptMonthCount;
					} else if (deptId == 12) {

						deptMonthCount = ((Number) row.get("totalipdRevenue"))
								.intValue();

					} else if (deptId == 13) {

						deptMonthCount = ((Number) row.get("Before48DEAD"))
								.intValue();
						ipddeath48hoursbefore=deptMonthCount;
					} else if (deptId == 14) {

						deptMonthCount = ((Number) row.get("After48DEAD"))
								.intValue();
						ipddeath48hoursafter = deptMonthCount;
					}

					else if (deptId == 15) {

						deptMonthCount = ((Number) row.get("Totaldead"))
								.intValue();
						totaldeath=deptMonthCount;
					}
				}
				
				
				
				// For Progresive Count
				if (deptId == 1 || deptId == 2 || deptId == 3 || deptId == 4) {

					sql1 = "SELECT COUNT(IF(et.department_id = '2', 1, null)) AS IPD, COUNT(IF(ds.discharge_type = 'Dead',1,null)) as Dead, COUNT(IF(ds.discharge_type = 'Discharge',1,null)) as Discharge,COUNT(IF( et.adm_cancel_flag='Y',1,null)) as LAMA FROM ehat_treatment et inner join discharge_summery ds ON ds.Treatment_ID = et.treatment_id where date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
				} else if (deptId == 5) {

					sql1 = "SELECT (COUNT(IF(ot.department = '5', 1, null)) + COUNT(IF(ot.department = '1', 1, null))) as SUPRAMAJORMAJOR FROM  treatment_operations et inner join treatmentoperationsmanage ot ON ot.treatmentOperationsID = et.ID inner join ehat_treatment eet on eet.treatment_id=et.Treatment_ID where eet.department_id = '2' and STR_TO_DATE(et.date, '%d/%m/%Y') >= concat("+fromYear+ ",'-04-01') and STR_TO_DATE(et.date, '%d/%m/%Y') <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
				} else if (deptId == 6 || deptId == 7 || deptId == 8) {

					sql1 = "SELECT COUNT(IF(et.department_id = '1', 1, null)) AS OPD,COUNT(IF(et.department_id = '2', 1, null)) AS IPD,COUNT(*) AS Total FROM ehat_treatment et where date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
				} else if (deptId == 9) {

					sql1 = "SELECT  COUNT(*) AS LabInvenstigations FROM ehat_lab_result_mst_view et where date(bill.assign_date) >= concat("+fromYear+ ", '-04-01') and date(bill.assign_date) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
				} else if (deptId == 10 || deptId == 11) {

					sql1 = "SELECT COUNT(IF(bill.group_name = 'X-RAY', 1, null)) AS XRAY,COUNT(IF(bill.idtest_radiology = '159', 1, null)) AS ECG FROM ehat_ris_records_details bill where bill.radTestStatus = 'Y' and date(bill.assign_date) >= concat("+fromYear+ ", '-04-01') and date(bill.assign_date) <= concat("+fromYear+ ", '-"+fromMonth+"-31')";
				} else if (deptId == 12) {

					sql1 = "SELECT SUM(total_paid) as totalipdRevenue FROM ehat_receipt_master_ipd ipd where date(ipd.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(ipd.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";		
					}

				else if (deptId == 13) {

					sql1 = "SELECT  COUNT(IF(ds.discharge_type = 'Dead', 1, null)) AS Before48DEAD FROM  ehat_treatment et  inner join  discharge_summery ds ON ds.Treatment_ID = et.treatment_id where et.created_date_time > (ds.discharge_date - interval 48 HOUR) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
				}

				else if (deptId == 14) {

					sql1 = "SELECT  COUNT(IF(ds.discharge_type = 'Dead', 1, null)) AS After48DEAD FROM  ehat_treatment et  inner join  discharge_summery ds ON ds.Treatment_ID = et.treatment_id where et.created_date_time < (ds.discharge_date - interval 48 HOUR) and date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
				} else if (deptId == 15) {

					sql1 = "SELECT  COUNT(IF(ds.discharge_type = 'Dead', 1, null)) AS Totaldead FROM  ehat_treatment et  inner join  discharge_summery ds ON ds.Treatment_ID = et.treatment_id where  date(et.created_date_time) >= concat("+ fromYear+ ",'-04-01') and date(et.created_date_time) <= concat("+ fromYear + ",'-" + fromMonth + "-31')";				
				}

				Query recQuery1 = sessionFactory.getCurrentSession()
						.createSQLQuery(sql1);
				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listRec1 = recQuery1.list();
				for (Map<String, Object> row : listRec1) {

					if (deptId == 1) {

						deptPrgCount = ((Number) row.get("IPD")).intValue();
						 ipdcount=deptMonthCount;
					} else if (deptId == 2) {

						deptPrgCount = ((Number) row.get("Dead")).intValue();

					} else if (deptId == 3) {

						deptPrgCount = ((Number) row.get("Discharge"))
								.intValue();

					} else if (deptId == 4) {

						deptPrgCount = ((Number) row.get("LAMA")).intValue();

					} else if (deptId == 5) {

						deptPrgCount = ((Number) row.get("SUPRAMAJORMAJOR"))
								.intValue();
						suergerycount=deptPrgCount;
						
					} else if (deptId == 6) {

						deptPrgCount = ((Number) row.get("OPD")).intValue();
					} else if (deptId == 7) {

						deptPrgCount = ((Number) row.get("IPD")).intValue();
						
					} else if (deptId == 8) {

						deptPrgCount = ((Number) row.get("Total")).intValue();
						totalcountipdopd=deptPrgCount;
					} else if (deptId == 9) {

						deptPrgCount = ((Number) row
								.get("LabInvenstigations")).intValue();
						labcount=deptPrgCount;
					} else if (deptId == 10) {

						deptPrgCount = ((Number) row.get("XRAY")).intValue();
						xraycount=deptPrgCount;
					} else if (deptId == 11) {

						deptPrgCount = ((Number) row.get("ECG")).intValue();
						ecgcount=deptPrgCount;
					} else if (deptId == 12) {

						deptPrgCount = ((Number) row.get("totalipdRevenue"))
								.intValue();

					} else if (deptId == 13) {

						deptPrgCount = ((Number) row.get("Before48DEAD"))
								.intValue();
						ipddeath48hoursbefore=deptPrgCount;
					} else if (deptId == 14) {

						deptPrgCount = ((Number) row.get("After48DEAD"))
								.intValue();
						ipddeath48hoursafter = deptPrgCount;
					}

					else if (deptId == 15) {

						deptPrgCount = ((Number) row.get("Totaldead"))
								.intValue();
						totaldeath=deptPrgCount;
					}
				}
				
				
				int iYear = Integer.parseInt(fromYear);
				int iMonth = Integer.parseInt(fromMonth); // 1 (months begin with 0)
				int iDay = 1;
                
				// Create a calendar object and set year and month
				Calendar mycal = new GregorianCalendar(iYear, iMonth, iDay);
               	
		        // Get the number of days in that month
				int daysInMonth = mycal.getActualMaximum(Calendar.DAY_OF_MONTH); 
				
				//set monthy calculation part 
				int perDMsupraAndMajor = suergerycount/ipdcount*100;
				int perDaySupraAndMajor= suergerycount/daysInMonth;
				int labtestperDay=labcount/daysInMonth;
				int labtestPercentage = labcount/totalcountipdopd*100;
				int EMItotal=xraycount+ecgcount;
				int perdayEmi=EMItotal/daysInMonth;
				int ipdpercentageAmount=ipdamount/ipdcount;
			    int deathbefore48h=ipddeath48hoursbefore/ipdcount*100;
				int deathafter48h=ipddeath48hoursafter/ipdcount*100;
				int totaldeathipd=totaldeath/ipdcount*100;
				
				
				//set progresive calculation part 
				int perDMsupraAndMajorpro = suergerycountpro/ipdcountpro*100;
				int perDaySupraAndMajorpro= suergerycountpro/daysInMonth;
				int labtestperDaypro=labcountpro/daysInMonth;
				int labtestPercentagepro = labcountpro/totalcountipdopdpro*100;
				int EMItotalpro=xraycountpro+ecgcountpro;
				int perdayEmipro=EMItotalpro/daysInMonth;
				int ipdpercentageAmountpro=ipdamountpro/ipdcountpro;
			    int deathbefore48hpro=ipddeath48hoursbeforepro/ipdcountpro*100;
				int deathafter48hpro=ipddeath48hoursafterpro/ipdcountpro*100;
				int totaldeathipdpro=totaldeathpro/ipdcountpro*100;
				
				
				HospitalReport dto = new HospitalReport();
				
				dto.setMonthlycount(deptMonthCount);
				dto.setProgressivecount(deptPrgCount);
				
                dto.setPerDMsupraAndMajor(perDMsupraAndMajor);
                dto.setPerDaySupraAndMajor(perDaySupraAndMajor);
                dto.setLabtestperDay(labtestperDay);
                dto.setLabtestPercentage(labtestPercentage);
                dto.setEMItotal(EMItotal);
                dto.setPerdayEmi(perdayEmi);
                dto.setIpdpercentageAmount(ipdpercentageAmount);
                dto.setDeathbefore48h(deathbefore48h);
                dto.setDeathafter48h(deathafter48h);
                dto.setTotaldeathipd(totaldeathipd);
                
                dto.setPerDMsupraAndMajorpro(perDMsupraAndMajorpro);
                dto.setPerDaySupraAndMajorpro(perDaySupraAndMajorpro);
                dto.setLabtestperDaypro(labtestperDaypro);
                dto.setLabtestPercentagepro(labtestPercentagepro);
                dto.setEMItotalpro(EMItotalpro);
                dto.setPerdayEmipro(perdayEmipro);
                dto.setIpdpercentageAmountpro(ipdpercentageAmountpro);
                dto.setDeathbefore48hpro(deathbefore48hpro);
                dto.setDeathafter48hpro(deathafter48hpro);
                dto.setTotaldeathipdpro(totaldeathipdpro);
                
                
				listsubservice.add(dto);
				deptId++;
				dto = null;

			}
			
			
		} catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;
	}
	
	@Override
	public DoctorDto doctorName(int docId) {
		DoctorDto doctordto = new DoctorDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			criteria.add(Restrictions.eq("Doctor_ID", docId));
			doctordto = (DoctorDto) criteria.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doctordto;
	}

	@Override 
	public int saveGroupDetails1(Doctor doctorDetails,String
	  groupSlaveDetails, String groupMasterDetails, Integer userId, String callFrom) { 
		
		int a = 0; 
		GroupMasterDto groupMasterDto2 = (GroupMasterDto)ConfigUIJSONUtility.getObjectFromJSON(groupMasterDetails,GroupMasterDto.class);
	  
		GroupMasterDto groupMasterDto = groupMasterDto2.getListGroupMaster().get(0);
	  
			if (callFrom.equalsIgnoreCase("insert")) {
	  
				groupMasterDto.setCreatedBy(userId); 
				groupMasterDto.setCreatedDate(new Date(new java.util.Date().getTime()));
				groupMasterDto.setDeleted("N");
	  
				String groupName = groupMasterDto.getGroupName();
				
				sessionFactory.getCurrentSession().merge(groupMasterDto);
	  
				int groupMasterId = maxCountOfColumn(GroupMasterDto.class, "groupMasterId");
	  
				GroupSlaveDto groupSlaveDto2 = (GroupSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(groupSlaveDetails,GroupSlaveDto.class);
	  
				for (int i = 0; i < groupSlaveDto2.getListGroupSlave().size(); i++) {
	  
						GroupSlaveDto groupSlaveDto = groupSlaveDto2.getListGroupSlave().get(i);
	  
						groupSlaveDto.setGroupMasterId(groupMasterId);
						groupSlaveDto.setGroupName(groupName); 
						groupSlaveDto.setCreatedBy(userId);
						groupSlaveDto.setCreatedDate(new Date(new java.util.Date().getTime()));
						groupSlaveDto.setDeleted("N");
	  
						sessionFactory.getCurrentSession().merge(groupSlaveDto);
						
				}
	  
	  
					try { 
							
							Session session = sessionFactory.getCurrentSession();
	  
	  
						GroupMasterDto groupMDto = (GroupMasterDto)session.get(GroupMasterDto.class,groupMasterId);
						//doctorDetails.setHospitalSpecialisationDto(specializationDto);
						int count=0;
						
							if(doctorDetails.getDoctor_ID() == 0) {
	  
								String sql="Select count(*) from users where User_Name='"+doctorDetails.getUser_Name()+"' "; 
								SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
								count= ((Number) q.uniqueResult()).intValue();
								doctorDetails.setGroupMasterId(groupMasterId);
								doctorDetails.setDoc_name(groupName);
								doctorDetails.setUser_Name(groupName);
	  
							if(count ==0) { 
								sessionFactory.getCurrentSession().merge(doctorDetails);
							}else { 
								return 3;
							} 
							
								return 1; 
							
							} else { 
								
								String sql="Select count(*) from users where User_Name='"+doctorDetails.getUser_Name()+"' and User_ID not in("+doctorDetails.getUser_ID()+")  ";
								SQLQuery q =sessionFactory.getCurrentSession().createSQLQuery(sql); 
								count= ((Number)q.uniqueResult()).intValue();
								session.merge(doctorDetails);
								return 2;
								
							} 
							
						} catch (Exception e) {
							e.printStackTrace();
							
						}
	  
				a=1;
	  
			} else if(callFrom.equalsIgnoreCase("update")) {
	  
				groupMasterDto.setUpdatedBy(userId); 
				groupMasterDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				groupMasterDto.setDeleted("N");
				String groupName = groupMasterDto.getGroupName();
				sessionFactory.getCurrentSession().merge(groupMasterDto);
	  
				Query bet = sessionFactory.getCurrentSession().createSQLQuery("DELETE  FROM profees_group_slave WHERE group_master_id="+groupMasterDto.getGroupMasterId());
				// bet.setParameter("gId",groupMasterDto.getGroupMasterId()); int resultDelete= bet.executeUpdate();
	  
				GroupSlaveDto groupSlaveDto2 = (GroupSlaveDto) ConfigUIJSONUtility.getObjectFromJSON(groupSlaveDetails, GroupSlaveDto.class);
	  
				for (int i = 0; i < groupSlaveDto2.getListGroupSlave().size(); i++) {
	  
					GroupSlaveDto groupSlaveDto = groupSlaveDto2 .getListGroupSlave().get(i);
	  
					groupSlaveDto.setGroupMasterId(groupMasterDto.getGroupMasterId());
					groupSlaveDto.setGroupName(groupName); 
					groupSlaveDto.setCreatedBy(userId);
					groupSlaveDto.setCreatedDate(new Date(new java.util.Date() .getTime()));
					groupSlaveDto.setDeleted("N");
	  
					sessionFactory.getCurrentSession().merge(groupSlaveDto);
					
				} 
				
				Query alfaDoc =sessionFactory.getCurrentSession().createSQLQuery("update doctor set doc_name='"+groupName+"' where group_master_id="+(groupMasterDto.getGroupMasterId()));
	  
				int resultDoc = alfaDoc.executeUpdate();
	  
			a = 2;
	  
		}
	  
	  return a; 
	  
	}
	
	@Override
	public RefDoctorDTO fetchProfeesReferenceDrReport1(java.sql.Date fromDate, java.sql.Date toDate,String searchBy, String searchByDept) {
		
		RefDoctorDTO obj = new RefDoctorDTO();
		int department_id = Integer.parseInt(searchByDept);
	
		
		/*String sql ="    SELECT \n" + 
				"        `b`.`patient_id` AS `patientId`,\n" + 
				"        date(`t`.`created_date_time`) AS `createdDateTime`,\n" + 
				"        CONCAT(`p`.`prefix`,\n" + 
				"                ' ',\n" + 
				"                `p`.`f_name`,\n" + 
				"                ' ',\n" + 
				"                `p`.`m_name`,\n" + 
				"                ' ',\n" + 
				"                `p`.`l_name`) AS `patientName`,\n" + 
				"        `t`.`opdipdno` AS `opdipdno`,\n" + 
				 
				
				 "        IFNULL(`ds`.`discharge_date`, '-') AS `dob`,\n" + 
				"        IFNULL(`d`.`doc_name`, '-') AS `docName`,\n" + 
				"        `cd`.`docName` AS `docNameChan`,\n" + 
				"        `cd`.`specility` AS `specility`,\n" + 
				"        `cd`.`referFees` AS `referFees`,\n" + 
				"        `cd`.`ref_doc_per` AS `ref_doc_per`,\n" + 
				"        `p`.`mobile` AS `mobile`,\n" + 
				"        IFNULL(`cm`.`category_name`,'Self') AS `categoryname`,\n" + 
				
				"        `b`.`total_bill` AS `totalbill`\n" + 
				
				
				"    FROM\n" + 
				"        (((((((`hospitalaccinfo` `h`\n" + 
				"        JOIN `ehat_bill_master` `b`)\n" + 
				"        JOIN `ehat_patient` `p` ON ((`b`.`patient_id` = `p`.`patient_id`)))\n" + 
				"        JOIN `ehat_treatment` `t` ON ((`b`.`treatment_id` = `t`.`treatment_id`)))\n" + 
				"        LEFT JOIN `discharge_summery` `ds` ON ((`ds`.`Treatment_ID` = `t`.`treatment_id`)))\n" + 
				"        LEFT JOIN `doctor` `d` ON ((`d`.`Doctor_ID` = `t`.`ref_doc_id`)))\n" + 
		         "LEFT JOIN `ehat_charges_master_slave` `cm` ON ((`b`.`charges_master_slave_id` = `cm`.`id`)))"+

				"        LEFT JOIN `hospital_departments` `hd` ON ((`hd`.`idhospital_departments` = `d`.`department`)))\n" +
				
				"        JOIN `chanelling_doctor` `cd` ON ((`cd`.`channDocId` = `t`.`ref_doc_id`))\n" + 
				" where Date(t.created_date_time) >='"+fromDate+"' and Date(t.created_date_time) <='"+toDate+"'"+
				"    ORDER BY `t`.`patient_id` ";
		*/
		
		Query getMaster = sessionFactory.getCurrentSession().createSQLQuery("call fetch_profees_reference_dr_report(:fromDate,:toDate)");
		getMaster.setParameter("fromDate", fromDate);
		getMaster.setParameter("toDate", toDate);
		  
		List<RefDoctorDTO> list1=new ArrayList<RefDoctorDTO>();
        
         getMaster.setResultTransformer(new AliasToBeanResultTransformer(RefDoctorDTO.class));
         list1 =getMaster.list();	
         
         if(!searchBy.equalsIgnoreCase("ALL"))
			{
				if (searchBy.equalsIgnoreCase("Source")) {
					List<RefDoctorDTO> doctorDtoList = list1.stream()
							.filter(dto -> dto instanceof RefDoctorDTO
									&& !((RefDoctorDTO) dto).getReferred_source().equals("-"))
							.collect(Collectors.toList());

					list1.clear();
					list1.addAll(doctorDtoList);
				} else {
					List<RefDoctorDTO> doctorDtoList = list1.stream()
							.filter(dto -> dto instanceof RefDoctorDTO
									&& ((RefDoctorDTO) dto).getReferred_source().equals(searchBy))
							.collect(Collectors.toList());

					list1.clear();
					list1.addAll(doctorDtoList);

				}

			}   
         
         
         if(!searchByDept.equalsIgnoreCase("0"))
			{
        	 
					List<RefDoctorDTO> doctorDtoList = list1.stream()
							.filter(dto -> dto instanceof RefDoctorDTO
									&& ((RefDoctorDTO) dto).getDepartment_id().equals(department_id))
							.collect(Collectors.toList());

					list1.clear();
					list1.addAll(doctorDtoList);

			}   
         
	    obj.setListAllPfRecords(list1);

		return obj;
	}

	@Override
	public PatientOutStandingReport fetchOutPatientStandingReport(java.sql.Date fromDate, java.sql.Date toDate,
			int departmentId) {
		PatientOutStandingReport objDto = new PatientOutStandingReport();
        try {

		String slaveQuery = "SELECT  *  FROM "
				+ "ehat_view_patient_outstanding_report where date(createdDateTime) between :fromDate and :toDate and totalRemain > 0 ";
				
		if (departmentId > 0) {
			String byDeptId = " and deptId = :departmentId";
			slaveQuery = slaveQuery + byDeptId;
		}
		
		String byDocGroup = " group by patientId , deptId";
		slaveQuery = slaveQuery + byDocGroup;

		Query qExe = sessionFactory	.getCurrentSession().createSQLQuery(slaveQuery)
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		if(departmentId > 0){
			qExe.setParameter("departmentId", departmentId);
		}
			
			qExe.setParameter("fromDate", fromDate);
			qExe.setParameter("toDate", toDate);
		
			qExe.setResultTransformer(Transformers.aliasToBean(PatientOutStandingReport.class));
			
		List<PatientOutStandingReport>	listAllRecords=qExe.list();
			
			
		objDto.setListProFees(listAllRecords);
        }catch (Exception e) {
			e.printStackTrace();
		}
		return objDto;
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
	
	//@Override
	public PercentMasterDto editPercentMasterNew(int doctorId, int unitId,int caseType) {
		PercentMasterDto percentMasterDto = new PercentMasterDto();
		List<PercentMasterDto> listRecords = null;
		
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(PercentMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("doctorId", doctorId));
		criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("caseType", caseType));
		//criteria.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
		
		listRecords = criteria.list();
		
		percentMasterDto.setListPerMaster(listRecords);
		
		return percentMasterDto;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getSponsorList() {
		List<ChargesMasterSlave> ltChargesSlave = null;
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sponsorIdss    =(String) resourceBundleEhat.getString("sponsor");
		Integer sponsorId = Integer.parseInt(sponsorIdss);
		try {
		/*	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("deleted", "N"));
		//	criteria.add(Restrictions.eq("selfId", 0));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", sponsorId));
			criteria.addOrder(Order.asc("slaveId"));
			ltChargesSlave = criteria.list();*/
			
			Query querySp =  sessionFactory.getCurrentSession().createSQLQuery("select   id as slaveId, category_name as categoryName from ehat_charges_master_slave where "
			+" charges_master_id="+sponsorId+" and "
			//+" isCategory='N' and deleted='N'  ");
			+" isCategory='Y' and deleted='N'  ");
			
			querySp.setResultTransformer(new AliasToBeanResultTransformer(ChargesMasterSlave.class));
			
			@SuppressWarnings("unchecked")
			List<ChargesMasterSlave> ltChargesSlave1 = querySp.list();
			ltChargesSlave = ltChargesSlave1 ;
			//ltChargesSlave = querySp.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}

	@Override
	public int deleteDoctAndGroupById(Integer docId, Integer userId, Integer caseType, Integer unitId,
			Integer chargesSlaveId) {
		try {

			 //delete subservice percentage from percent_master
			String sql1 = "DELETE FROM percent_master WHERE doctor_id =:docId and case_type=:caseType "
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
			String sql2 = "DELETE FROM percent_slave WHERE doctor_id =:docId and case_type=:caseType "
					+ "and unit_id=:unitId and dr_dept_flag =:drDeptFlag and charges_slave_id =:chargesSlaveId";

			SQLQuery query2 = sessionFactory.getCurrentSession()
					.createSQLQuery(sql2);
			// query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
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
	public HospitalDepartmentDto getHospDepartmentOfDoctor() {
		HospitalDepartmentDto object = new HospitalDepartmentDto();
		try {
			
			List<HospitalDepartmentDto> listHospSpcl = null;
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDepartmentDto.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			listHospSpcl = criteria.list();
			object.setListDepartments(listHospSpcl);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return object;
	}
	
	//added Rohini on 02-04-2024 for percent master parent chreges id 
	public Integer getProfeesChargeSlaveId(int chargesSlaveId1,int profeesDocId) {
		// TODO Auto-generated method stub
		
		Integer profeesChargesSlaveid =0;
		try {
			
			Query q = sessionFactory.getCurrentSession().createSQLQuery("select ifnull(fun_get_charges_slave_id("
			+chargesSlaveId1+","+profeesDocId+"),0)");
			profeesChargesSlaveid =	((Number) q.uniqueResult()).intValue();
		  
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return profeesChargesSlaveid;
	}

	@Override
	public int saveDrPaymentVoucherForRefer(String voucherDetails, Integer userId, int unitId, String profeesDetails) {
		int a = 1;
		Session session = null;
		session = sessionFactory.openSession();
		// Transaction tx = null;
		Transaction t = session.beginTransaction();
		try {

			ReferDrPaymentVoucherDto drPaymentVoucherDto2 = (ReferDrPaymentVoucherDto) ConfigUIJSONUtility
					.getObjectFromJSON(voucherDetails,
							ReferDrPaymentVoucherDto.class);

			ReferDrPaymentVoucherDto drPaymentVoucherDto = drPaymentVoucherDto2
					.getListVoucher().get(0);
			drPaymentVoucherDto.setCreatedBy(userId);
			drPaymentVoucherDto.setCreatedDateTime(new Date(
					new java.util.Date().getTime()));
			drPaymentVoucherDto.setCreatedDate(new Date(new java.util.Date()
					.getTime()));

			drPaymentVoucherDto.setDeleted("N");
			drPaymentVoucherDto.setUnitId(unitId);

			ReferDrPaymentVoucherDto id = (ReferDrPaymentVoucherDto) session
					.merge(drPaymentVoucherDto);

			int voucherId = id.getVoucherId();

			ProfeesDoctorsPaymentDto profeesDoctorsPaymentDto = (ProfeesDoctorsPaymentDto) ConfigUIJSONUtility
					.getObjectFromJSON(profeesDetails,
							ProfeesDoctorsPaymentDto.class);
			
			int chkDocId = 0;
			int groupMasterId = 0;
			for (int i = 0; i < profeesDoctorsPaymentDto.getListProFees()
					.size(); i++) {
				ProfeesDoctorsPaymentDto profeesObj = profeesDoctorsPaymentDto
						.getListProFees().get(i);

				if (chkDocId == 0 || chkDocId != profeesObj.getDoctorId()) {
					chkDocId = profeesObj.getDoctorId();
					groupMasterId = 0;
					
					Query q = sessionFactory.getCurrentSession()
							.createSQLQuery(
									"SELECT group_master_id FROM doctor where status='Y' and Doctor_ID = "
											+ profeesObj.getDoctorId());

					groupMasterId = ((Number) q.uniqueResult()).intValue();

				}

				// Group calculations starts
				if (groupMasterId > 0) {

					Query qGrName = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"SELECT group_name "
											+ "FROM profees_group_master where group_master_id="
											+ groupMasterId);

					String groupName = (String) qGrName.uniqueResult();

					// ArrayList drDetails = new ArrayList();
					Query qDrId = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"SELECT doctor_id "
											+ "FROM profees_group_slave where group_master_id="
											+ groupMasterId);

					ArrayList<Integer> drIdGs = (ArrayList<Integer>) qDrId
							.list();
					int countFlag = 0;
					for (Integer s : drIdGs) {
						Query qDrStatus = sessionFactory.getCurrentSession()
								.createSQLQuery(
										"select status from doctor where Doctor_ID="
												+ s);

						String qDrStatus2 = (qDrStatus.list().get(0))
								.toString();

						if (qDrStatus2.equalsIgnoreCase("N")) {
							countFlag++;
							break;
						}
					}
					
					if (countFlag > 0) {
						a = 4;// Doctors inactive in group master
						t.rollback();
						break;
					} else {

						if (profeesObj.getPfPaid() > profeesObj.getPfAmount()) {
							profeesObj.setHospPercentInAmount(profeesObj
									.getHospPercentInAmount()
									- profeesObj.getPfAddition());
						} else if (profeesObj.getPfPaid() < profeesObj
								.getPfAmount()) {
							profeesObj.setHospPercentInAmount(profeesObj
									.getHospPercentInAmount()
									+ profeesObj.getPfReduction());
						}

						if (profeesObj.getDeptId() == 2) {

							// iscombination is Y = package/ot
							if (profeesObj.getIscombination().equalsIgnoreCase(
									"Y")) {
								Query alfa = session
										.createSQLQuery("update ehat_other_bill_detail_for_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",rpfVoucherFlag='Y',rpfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ ",paid_package="
												+ profeesObj.getPaid()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId()
												+ " and other_bill_details_id_for_ipd="
												+ profeesObj
														.getOtherBillDIdIpd());

								int result = alfa.executeUpdate();

								List<EhatOtherBillDetailForIpdDto> listRecords = null;

								Criteria criteria = session
										.createCriteria(EhatOtherBillDetailForIpdDto.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq(
										"otherbildetailidipd",
										profeesObj.getOtherBillDIdIpd()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								// gs.setBillRecSlaveId(listRecords.get(0).getBillRecSlaveId());
								gs.setBillRecSlaveId(0);
								// gs.setBillReceiptMasterId(listRecords.get(0).getBillReceiptMasterId());
								gs.setBillReceiptMasterId(0);
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatienttId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								// gs.setCompName(listRecords.get(0).getSubservicesname());
								gs.setUnitId(listRecords.get(0).getUnitId());
								// gs.setAgainstId(listRecords.get(0).getAgainstId());
								// gs.setClinicalnotes(listRecords.get(0).getClinicalnote());
								// gs.setInstructions(listRecords.get(0).getInstructions());
								// gs.setUrgentflag(listRecords.get(0).getUrgentfla());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								// gs.setPaid(listRecords.get(0).getPaid());
								// gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								// gs.setRefundAmt(listRecords.get(0).getRefundAmt());
								// gs.setRefundFlag(listRecords.get(0).getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getCreatedDateTime());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								// gs.setDoctorPaymentFlag(listRecords.get(0).getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								// gs.setPatientName(listRecords.get(0).getPatientName());
								// gs.setUnitName(listRecords.get(0).getUnitName());
								// gs.setDeptName(listRecords.get(0).getDeptName());
								// gs.setServiceName(listRecords.get(0).getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession().
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);

								}

								// End Package

							} else {
								Query alfa = session
										.createSQLQuery("update ehat_bill_details_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",rpfVoucherFlag='Y',rpfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();

								List<BillDetailsIpdDto> listRecords = null;

								Criteria criteria = session
										.createCriteria(BillDetailsIpdDto.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq("billDetailsId",
										profeesObj.getBillDetailsId()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								// gs.setBillRecSlaveId(listRecords.get(0).getBillRecSlaveId());
								gs.setBillRecSlaveId(0);
								// gs.setBillReceiptMasterId(listRecords.get(0).getBillReceiptMasterId());
								gs.setBillReceiptMasterId(0);
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatienttId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								gs.setCompName(listRecords.get(0)
										.getSubservicesname());
								gs.setUnitId(listRecords.get(0).getUnitId());
								// gs.setAgainstId(listRecords.get(0).getAgainstId());
								// gs.setClinicalnotes(listRecords.get(0).getClinicalnote());
								// gs.setInstructions(listRecords.get(0).getInstructions());
								// gs.setUrgentflag(listRecords.get(0).getUrgentfla());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								// gs.setPaid(listRecords.get(0).getPaid());
								// gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								// gs.setRefundAmt(listRecords.get(0).getRefundAmt());
								// gs.setRefundFlag(listRecords.get(0).getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getCreatedDateTime());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								// gs.setDoctorPaymentFlag(listRecords.get(0).getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								// gs.setPatientName(listRecords.get(0).getPatientName());
								// gs.setUnitName(listRecords.get(0).getUnitName());
								// gs.setDeptName(listRecords.get(0).getDeptName());
								// gs.setServiceName(listRecords.get(0).getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession().
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);

								}
							}


						} else {

							// iscombination is Y = package/ot
							if (profeesObj.getIscombination().equalsIgnoreCase(
									"Y")) {
								// Query alfa =
								// sessionFactory.getCurrentSession()
								
								Query alfa = session
										.createSQLQuery("update ehat_other_bill_detail_for_opd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",rpfVoucherFlag='Y',rpfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ ",paid_package="
												+ profeesObj.getPaid()
												+ " where other_bill_details_id_for_Opd="
												+ profeesObj
														.getOtherBillDIdOpd()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();

								// Group Master Payment calculations starts here
								BillReceiptSlaveDTO billReceiptSlaveDTO = new BillReceiptSlaveDTO();
								List<EhatOtherBillDetailForOpdDto> listRecords = null;

								// Criteria criteria =
								// sessionFactory.getCurrentSession()
								Criteria criteria = session
										.createCriteria(EhatOtherBillDetailForOpdDto.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq(
										"otherBillDetailsId",
										profeesObj.getOtherBillDIdOpd()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								// gs.setBillRecSlaveId(listRecords.get(0).getBillRecSlaveId());
								// gs.setBillReceiptMasterId(listRecords.get(0).getBillReceiptMasterId());
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatienttId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								// gs.setCompName(listRecords.get(0).getCompName());
								gs.setUnitId(listRecords.get(0).getUnitId());
								// gs.setAgainstId(listRecords.get(0).getAgainstId());
								gs.setClinicalnotes(listRecords.get(0)
										.getClinicalnotes());
								gs.setInstructions(listRecords.get(0)
										.getInstructions());
								gs.setUrgentflag(listRecords.get(0)
										.getUrgentflag());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								gs.setPaid(listRecords.get(0).getPaidPackage());
								// gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								//gs.setRefundAmt(listRecords.get(0).getRefund());
								// gs.setRefundFlag(listRecords.get(0).getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getCreatedDateTime());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								// gs.setDoctorPaymentFlag(listRecords.get(0).getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								// gs.setPatientName(listRecords.get(0).getPatientName());
								// gs.setUnitName(listRecords.get(0).getUnitName());
								// gs.setDeptName(listRecords.get(0).getDeptName());
								// gs.setServiceName(listRecords.get(0).getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession()
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);
								}
								// package end

							} else {

								// iscombination is N = rest all service
								Query alfa = session
										.createSQLQuery("update ehat_receipt_slave set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",rpfVoucherFlag='Y',rpfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ " where bill_rec_slave_id="
												+ profeesObj
														.getBillReceiptSlaveId()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();

								// Group Master Payment calculations starts here
								BillReceiptSlaveDTO billReceiptSlaveDTO = new BillReceiptSlaveDTO();
								List<BillReceiptSlaveDTO> listRecords = null;

								// Criteria criteria =
								// sessionFactory.getCurrentSession()
								Criteria criteria = session
										.createCriteria(BillReceiptSlaveDTO.class);
								criteria.add(Restrictions.eq("deleted", "N"));
								criteria.add(Restrictions.eq("billRecSlaveId",
										profeesObj.getBillReceiptSlaveId()));

								listRecords = criteria.list();

								GroupReceiptSlaveDetails gs = new GroupReceiptSlaveDetails();

								gs.setGroupMasterId(groupMasterId);
								gs.setGroupName(groupName);
								gs.setGroupRecSlaveId(0);
								gs.setBillRecSlaveId(listRecords.get(0)
										.getBillRecSlaveId());
								gs.setBillReceiptMasterId(listRecords.get(0)
										.getBillReceiptMasterId());
								gs.setBillId(listRecords.get(0).getBillId());
								gs.setBillDetailsId(listRecords.get(0)
										.getBillDetailsId());
								gs.setTreatmentId(listRecords.get(0)
										.getTreatmentId());
								gs.setPatientId(listRecords.get(0)
										.getPatientId());
								gs.setDepartmentId(listRecords.get(0)
										.getDepartmentId());
								gs.setCompName(listRecords.get(0).getCompName());
								gs.setUnitId(listRecords.get(0).getUnitId());
								gs.setAgainstId(listRecords.get(0)
										.getAgainstId());
								gs.setClinicalnotes(listRecords.get(0)
										.getClinicalnotes());
								gs.setInstructions(listRecords.get(0)
										.getInstructions());
								gs.setUrgentflag(listRecords.get(0)
										.getUrgentflag());
								gs.setPay(listRecords.get(0).getPay());
								gs.setCoPay(listRecords.get(0).getCoPay());
								gs.setSourceTypeId(listRecords.get(0)
										.getSourceTypeId());
								gs.setServiceId(listRecords.get(0)
										.getServiceId());
								gs.setSubServiceId(listRecords.get(0)
										.getSubServiceId());
								gs.setRate(listRecords.get(0).getRate());
								gs.setQuantity(listRecords.get(0).getQuantity());
								gs.setConcession(listRecords.get(0)
										.getConcession());
								gs.setAmount(listRecords.get(0).getAmount());
								gs.setDiscount(listRecords.get(0).getDiscount());
								gs.setPaid(listRecords.get(0).getPaid());
								gs.setRemain(listRecords.get(0).getRemain());
								gs.setDeleted(listRecords.get(0).getDeleted());
								gs.setRefundAmt(listRecords.get(0)
										.getRefundAmt());
								gs.setRefundFlag(listRecords.get(0)
										.getRefundFlag());
								gs.setCreatedBy(listRecords.get(0)
										.getCreatedBy());
								gs.setCreatedDateTime(listRecords.get(0)
										.getCreatedDateTime());
								gs.setServiceAssignDate(listRecords.get(0)
										.getServiceAssignDate());
								gs.setUpdatedBy(listRecords.get(0)
										.getUpdatedBy());
								gs.setUpdatedDateTime(listRecords.get(0)
										.getUpdatedDateTime());
								gs.setDeletedBy(listRecords.get(0)
										.getDeletedBy());
								gs.setDeletedDateTime(listRecords.get(0)
										.getDeletedDateTime());
								gs.setDoctorPaymentFlag(listRecords.get(0)
										.getDoctorPaymentFlag());
								gs.setHospAmount(listRecords.get(0)
										.getHospAmount());
								gs.setPfAmount(listRecords.get(0).getPfAmount());
								gs.setPfPaid(listRecords.get(0).getPfPaid());
								gs.setPfUnpaid(listRecords.get(0).getPfUnpaid());
								gs.setPfReduction(listRecords.get(0)
										.getPfReduction());
								gs.setPfAddition(listRecords.get(0)
										.getPfAddition());
								gs.setPfVoucherId(listRecords.get(0)
										.getPfVoucherId());
								gs.setPfVoucherFlag(listRecords.get(0)
										.getPfVoucherFlag());
								gs.setPatientName(listRecords.get(0)
										.getPatientName());
								gs.setUnitName(listRecords.get(0).getUnitName());
								gs.setDeptName(listRecords.get(0).getDeptName());
								gs.setServiceName(listRecords.get(0)
										.getServiceName());
								gs.setAdvanceFlag(listRecords.get(0)
										.getAdvanceFlag());
								gs.setActHospAmount(listRecords.get(0)
										.getActHospAmount());
								gs.setRefDrId(listRecords.get(0).getRefDrId());
								gs.setRefDrPercent(listRecords.get(0)
										.getRefDrPercent());
								gs.setRefDrAmount(listRecords.get(0)
										.getRefDrAmount());

								// Query query =
								// sessionFactory.getCurrentSession()
								Query query = session
										.createSQLQuery("SELECT equal_percent FROM profees_group_master where group_master_id="
												+ groupMasterId);

								double equalPercentGroup = ((Double) query
										.uniqueResult());
								double equalPercentDr = 0.0;
								double equalAmountDr = 0.0;
								double totalGrPAmount = listRecords.get(0)
										.getPfPaid();
								List<GroupSlaveDto> listGroupSlave = null;

								// Criteria criteriaGroupSlave =
								// sessionFactory.getCurrentSession()
								Criteria criteriaGroupSlave = session
										.createCriteria(GroupSlaveDto.class);
								criteriaGroupSlave.add(Restrictions.eq(
										"deleted", "N"));
								criteriaGroupSlave.add(Restrictions.eq(
										"groupMasterId", groupMasterId));

								listGroupSlave = criteriaGroupSlave.list();
								if (listGroupSlave.size() > 0
										&& equalPercentGroup > 0) {
									equalPercentDr = equalPercentGroup
											/ listGroupSlave.size();
									equalAmountDr = (equalPercentDr * totalGrPAmount) / 100;
								}
								gs.setEqualPercent(equalPercentDr);
								gs.setEqualDrAmount(equalAmountDr);

								for (int j = 0; j < listGroupSlave.size(); j++) {
									gs.setDoctorId(listGroupSlave.get(j)
											.getDoctorId());
									gs.setDoctorName(listGroupSlave.get(j)
											.getDoctorName());

									double individualAmountDr = 0.0;
									if (listGroupSlave.get(j)
											.getDoctorPercent() > 0
											&& totalGrPAmount > 0) {
										individualAmountDr = (listGroupSlave
												.get(j).getDoctorPercent() * totalGrPAmount) / 100;
									}

									gs.setIndividualDrPercent(listGroupSlave
											.get(j).getDoctorPercent());
									gs.setIndividualDrAmount(individualAmountDr);
									gs.setTotalDrPercent(equalPercentDr
											+ listGroupSlave.get(j)
													.getDoctorPercent());
									gs.setTotalDrAmount(equalAmountDr
											+ individualAmountDr);

									// sessionFactory.getCurrentSession().merge(gs);
									session.merge(gs);
								}
								// package end
							}

						}

					}
					a = 1;
				} else {

					if (profeesObj.getPfPaid() > profeesObj.getPfAmount()) {
						profeesObj.setHospPercentInAmount(profeesObj
								.getHospPercentInAmount()
								- profeesObj.getPfAddition());
					} else if (profeesObj.getPfPaid() < profeesObj
							.getPfAmount()) {
						profeesObj.setHospPercentInAmount(profeesObj
								.getHospPercentInAmount()
								+ profeesObj.getPfReduction());
					}

					if (profeesObj.getDeptId() == 2) {

						// if iscombination=Y
						if (profeesObj.getIscombination().equalsIgnoreCase("Y")) {
							
							//to check service is leaf or package 
							String surgeryQuery="SELECT count(*) FROM ehat_other_bill_detail_for_ipd where bill_details_id=:billDetailsId ";
							Query qSurgery = sessionFactory.getCurrentSession().createSQLQuery(surgeryQuery);
							qSurgery.setParameter("billDetailsId",profeesObj.getBillDetailsId() );

							Integer surgeryBillDetailsIdCount = ((Number) qSurgery.uniqueResult()).intValue();
							
							if(surgeryBillDetailsIdCount > 0){//for package/other bill details
								Query alfa = session
										.createSQLQuery("update ehat_other_bill_detail_for_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",rpfVoucherFlag='Y',rpfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ ",paid_package="
												+ profeesObj.getPaid()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId()
												+ " and other_bill_details_id_for_ipd="
												+ profeesObj.getOtherBillDIdIpd());

								int result = alfa.executeUpdate();
								
							}else{//if service is leaf
								Query alfa = session
										.createSQLQuery("update ehat_bill_details_ipd set hospAmount="
												+ profeesObj
														.getHospPercentInAmount()
												+ ",pfAmount="
												+ profeesObj.getPfAmount()
												+ ",pfPaid="
												+ profeesObj.getPfPaid()
												+ ",pfUnpaid="
												+ profeesObj.getPfUnpaid()
												+ ",pfReduction="
												+ profeesObj.getPfReduction()
												+ ",rpfVoucherFlag='Y',rpfVoucherId="
												+ voucherId
												+ ",pfAddition="
												+ profeesObj.getPfAddition()
												+ ",advance_flag='"
												+ profeesObj.getAdvanceFlag()
												+ "',actHospAmount="
												+ profeesObj.getActHospAmount()
												+ ",ref_dr_id="
												+ profeesObj.getRefDrId()
												+ ",ref_dr_percent="
												+ profeesObj.getRefDrPercent()
												+ ",ref_dr_amount="
												+ profeesObj.getRefDrAmount()
												+ " where bill_details_id="
												+ profeesObj.getBillDetailsId()
												+ " and department_id="
												+ profeesObj.getDeptId());

								int result = alfa.executeUpdate();
							}
							
						} else {
							Query alfa = session
									.createSQLQuery("update ehat_bill_details_ipd set hospAmount="
											+ profeesObj
													.getHospPercentInAmount()
											+ ",pfAmount="
											+ profeesObj.getPfAmount()
											+ ",pfPaid="
											+ profeesObj.getPfPaid()
											+ ",pfUnpaid="
											+ profeesObj.getPfUnpaid()
											+ ",pfReduction="
											+ profeesObj.getPfReduction()
											+ ",rpfVoucherFlag='Y',rpfVoucherId="
											+ voucherId
											+ ",pfAddition="
											+ profeesObj.getPfAddition()
											+ ",advance_flag='"
											+ profeesObj.getAdvanceFlag()
											+ "',actHospAmount="
											+ profeesObj.getActHospAmount()
											+ ",ref_dr_id="
											+ profeesObj.getRefDrId()
											+ ",ref_dr_percent="
											+ profeesObj.getRefDrPercent()
											+ ",ref_dr_amount="
											+ profeesObj.getRefDrAmount()
											+ " where bill_details_id="
											+ profeesObj.getBillDetailsId()
											+ " and department_id="
											+ profeesObj.getDeptId());

							int result = alfa.executeUpdate();
						}

					} else {

						// iscombination is Y = package/ot
						if (profeesObj.getIscombination().equalsIgnoreCase("Y")) {

							Query alfa = session
									.createSQLQuery("update ehat_other_bill_detail_for_opd set hospAmount="
											+ profeesObj
													.getHospPercentInAmount()
											+ ",pfAmount="
											+ profeesObj.getPfAmount()
											+ ",pfPaid="
											+ profeesObj.getPfPaid()
											+ ",pfUnpaid="
											+ profeesObj.getPfUnpaid()
											+ ",pfReduction="
											+ profeesObj.getPfReduction()
											+ ",rpfVoucherFlag='Y',rpfVoucherId="
											+ voucherId
											+ ",pfAddition="
											+ profeesObj.getPfAddition()
											+ ",advance_flag='"
											+ profeesObj.getAdvanceFlag()
											+ "',actHospAmount="
											+ profeesObj.getActHospAmount()
											+ ",ref_dr_id="
											+ profeesObj.getRefDrId()
											+ ",ref_dr_percent="
											+ profeesObj.getRefDrPercent()
											+ ",ref_dr_amount="
											+ profeesObj.getRefDrAmount()
											+ ",paid_package="
											+ profeesObj.getPaid()
											+ " where other_bill_details_id_for_Opd="
											+ profeesObj.getOtherBillDIdOpd()
											+ " and department_id="
											+ profeesObj.getDeptId());

							int result = alfa.executeUpdate();

						} else {

							// Query alfa = sessionFactory.getCurrentSession()
							Query alfa = session
									.createSQLQuery("update ehat_receipt_slave set hospAmount="
											+ profeesObj
													.getHospPercentInAmount()
											+ ",pfAmount="
											+ profeesObj.getPfAmount()
											+ ",pfPaid="
											+ profeesObj.getPfPaid()
											+ ",pfUnpaid="
											+ profeesObj.getPfUnpaid()
											+ ",pfReduction="
											+ profeesObj.getPfReduction()
											+ ",rpfVoucherFlag='Y',rpfVoucherId="
											+ voucherId
											+ ",pfAddition="
											+ profeesObj.getPfAddition()
											+ ",advance_flag='"
											+ profeesObj.getAdvanceFlag()
											+ "',actHospAmount="
											+ profeesObj.getActHospAmount()
											+ ",ref_dr_id="
											+ profeesObj.getRefDrId()
											+ ",ref_dr_percent="
											+ profeesObj.getRefDrPercent()
											+ ",ref_dr_amount="
											+ profeesObj.getRefDrAmount()
											+ " where bill_rec_slave_id="
											+ profeesObj
													.getBillReceiptSlaveId()
											+ " and department_id="
											+ profeesObj.getDeptId());

							int result = alfa.executeUpdate();

						}
					}
					a = 1;
				}

			}

			// Added by vinod (Hisab entry) start
			int res = saveProfeesVoucherHisabReferDoctor(voucherId, drPaymentVoucherDto,
					session);
			// Added by vinod (Hisab entry) end

			t.commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally { // Transaction t = session.getTransaction();
			session.close();
		}

		return a;
	}
	
	
	public int saveProfeesVoucherHisabReferDoctor(int vId,ReferDrPaymentVoucherDto objDto,Session session) {
		
		try{
			
			String sql="select distinct doctor_id from ehat_receipt_slave where rpfVoucherId="+vId+" and rpfVoucherFlag='Y' and deleted='N' ";
			
		    SQLQuery query = session.createSQLQuery(sql);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    @SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillMaster = query.list();
			
		    for(Map<String, Object> row : listBillMaster){
			
		    	int docId=(Integer)row.get("doctor_id");
		    	sql="select sum(hospAmount),sum(pfAmount),sum(pfPaid) from ehat_receipt_slave where rpfVoucherId="+vId+" and rpfVoucherFlag='Y' and deleted='N' and doctor_id="+docId+" ";
		    	SQLQuery query2 = session.createSQLQuery(sql);
			    query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			    @SuppressWarnings("unchecked")
				List<Map<String, Object>> listBillMaster2 = query2.list();
				
			    for(Map<String, Object> row2 : listBillMaster2){
			    	
			    	HisabProFeesReferDoctorDTO hisabDto=new HisabProFeesReferDoctorDTO();
					hisabDto.setDeptId(objDto.getDeptId());
					hisabDto.setUnitId(objDto.getUnitId());
					hisabDto.setCreatedBy(objDto.getCreatedBy());
					hisabDto.setCreatedDate(objDto.getCreatedDate());
					hisabDto.setCreatedDateTime(objDto.getCreatedDateTime());
					hisabDto.setDeleted("N");		
					hisabDto.setDoctorId(docId);
					//hisabDto.setDoctorName(objDto.getDoctorName());
					hisabDto.setFromDate(objDto.getFromDate());
					hisabDto.setToDate(objDto.getToDate());				
					hisabDto.setTotalAmount(objDto.getTotalAmount());
					hisabDto.setTotalConcession(objDto.getTotalConcession());				
					hisabDto.setTotalPatPaid(objDto.getTotalPatPaid());
					
					hisabDto.setTotalHospAmount((Double)row2.get("sum(hospAmount)"));
					hisabDto.setTotalPfAmount((Double)row2.get("sum(pfAmount)"));
					hisabDto.setTotalPfPaid((Double)row2.get("sum(pfPaid)"));
					hisabDto.setVoucherId(vId);
					session.merge(hisabDto); // Save object
					hisabDto=null;
			    }	    	
		    }
		}catch(Exception e){
			
			e.printStackTrace();
			return 0;
		}
		
		return 1;		
	}

	@Override
	public ReferDrPaymentVoucherDto fetchReferDoctorsVouchers(String callFrom, int doctorId, int unitId, int deptId,
			java.sql.Date fromDate, java.sql.Date toDate) {

		
		List<ReferDrPaymentVoucherDto> listVoucher = null;

		ReferDrPaymentVoucherDto objVoucher = new ReferDrPaymentVoucherDto();

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				ReferDrPaymentVoucherDto.class);
		if (callFrom.equalsIgnoreCase("cancel")) {
			criteria.add(Restrictions.eq("deleted", "Y"));
		}else{
			criteria.add(Restrictions.eq("deleted", "N"));
		}

		if (callFrom.equalsIgnoreCase("search")) {
			criteria.add(Restrictions.eq("doctorId", doctorId));
			criteria.add(Restrictions.between("createdDate",
					fromDate, toDate));
			if (unitId > 0) {
				criteria.add(Restrictions.eq("unitId", unitId));
			}
			if (deptId > 0) {
				criteria.add(Restrictions.eq("deptId", deptId));
			}
		}
		criteria.addOrder(Order.desc("voucherId"));
		
		listVoucher = criteria.list();
		objVoucher.setListVoucher(listVoucher);
		
		return objVoucher;
	}

	@Override
	public int cancelReferalDoctorVoucher(Integer userId, int voucherId, int deptId) {
		int a=0;
		Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
				"update ehat_refer_doctors_payment_voucher set deleted='Y',deletedBy="+userId
				+",deletedDateTime=now() where voucherId="+voucherId);
		
		int result = alfa.executeUpdate();
		
		Query alfaGroup = sessionFactory.getCurrentSession().createSQLQuery(
				"DELETE  FROM profees_group_receipt_slave WHERE pfVoucherId="+voucherId);
		
				/*"update profees_group_receipt_slave set deleted='Y',deletedBy="+userId
				+",deletedDateTime=now() where pfVoucherId="+voucherId);*/
		
		int resultGroup = alfaGroup.executeUpdate();
		
		if(deptId == 2){
			Query alfaIpd = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_bill_details_ipd set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,ref_dr_amount=0,rpfVoucherFlag='N' where rpfVoucherId="+voucherId);
			
			int resultIpd = alfaIpd.executeUpdate();
			
			Query alfaPkg = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_other_bill_detail_for_ipd set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,ref_dr_amount=0,rpfVoucherFlag='N' where rpfVoucherId="+voucherId);
			
			int resultPkg = alfaPkg.executeUpdate();
			a=1;
		}else if(deptId > 0 && deptId != 2){
			Query alfaOpd = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_receipt_slave set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,ref_dr_amount=0,rpfVoucherFlag='N' where rpfVoucherId="+voucherId);
			
			int resultOpd = alfaOpd.executeUpdate();
			
			Query alfaPkg = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_other_bill_detail_for_opd set hospAmount=0,pfAmount=0,pfPaid=0,pfReduction=0,"
					+"pfUnpaid=0,pfAddition=0,ref_dr_amount=0,rpfVoucherFlag='N' where rpfVoucherId="+voucherId);
			
			int resultPkg = alfaPkg.executeUpdate();
			
			a=1;
		}
		
		return a;
	}
}




