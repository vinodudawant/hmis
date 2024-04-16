package com.hms.ivf.dao.impl;

import java.math.BigInteger;
import java.security.Timestamp;
import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.HallManagementDto;
//import com.hms.dto.Beds;
import com.hms.dto.Hall;
import com.hms.dto.Patient;
import com.hms.dto.Treatment;
import com.hms.dto.TreatmentBeds;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ehat.dto.MlcDetailsDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.PaymentResponsibleDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.AutosuggestionService;
import com.hms.ehat.service.ConfigurationServiceService;
import com.hms.ivf.dao.IvfDao;
import com.hms.ivf.dto.IVFAdmissionNoteDTO;
import com.hms.ivf.dto.IVFBatchMaster;
import com.hms.ivf.dto.IVFBatchSlave;
import com.hms.ivf.dto.IVFBatchViewDto;
import com.hms.ivf.dto.IVFClinicalEvaluationDTO;
import com.hms.ivf.dto.IVFClinicalEvaluationForAllergyAlertDTO;
import com.hms.ivf.dto.IVFClinicalEvaluatonPregnancyDTO;
import com.hms.ivf.dto.IVFCoupleDTO;
import com.hms.ivf.dto.IVFcoupleViewDto;
import com.hms.ivf.dto.IvfPatientInfo;
import com.hms.ivf.dto.IvfQueueDTO;
import com.hms.ivf.dto.IvfTreBillDto;
import com.hms.ivf.dto.SurgeryAdviceForIvfDTO;
import com.hms.ivf.service.IvfService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
@Transactional
public class IvfDaoImpl implements IvfDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	ConfigurationServiceService configServiceService;

	@Autowired
	IvfService IvfService;

	@Autowired
	AutosuggestionService autoSuggService;

	java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
	SimpleDateFormat formatter4 = new SimpleDateFormat("yyyy-MM-dd");
	String todays_date4 = formatter4.format(currentDate1.getTime());

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String sponsor = (String) resourceBundleEhat.getString("sponsor");
	Integer sponsorid = Integer.parseInt(sponsor);

	@Override
	public List<RegistrationDto> fetchpatientnameMale(String patientName, String callfrom) {
		SQLQuery sql = null;

		List<RegistrationDto> listOfMales = new ArrayList<RegistrationDto>();

		try {

			if (callfrom.equals("onload")) {
				sql = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT p1.patient_id,concat(p1.f_name,' ', p1.m_name,' ', p1.l_name) as patientName FROM ehat_patient p1,ehat_ivf_treatment t1 where p1.patient_id=t1.patient_id and t1.ivf_status = 'Y' and p1.gender='Male' and p1.f_name like '%" 
													+ patientName + "%' limit 100 ");
			} else {

				sql = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT p1.patient_id,concat(p1.f_name,' ', p1.m_name,' ', p1.l_name) as patientName FROM ehat_patient p1,ehat_ivf_treatment t1 where p1.patient_id=t1.patient_id and t1.ivf_status = 'Y' and p1.gender='Male' and p1.f_name like '%"
								+ patientName + "%' limit 100 ");

				System.out.println(sql);
			}

			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> maleQuerryList = sql.list();
			for (Map<String, Object> rs1 : maleQuerryList) {
				RegistrationDto dto = new RegistrationDto();
				dto.setPatientidivf((Integer) rs1.get("patient_id"));
				dto.setPatientNameivf((String) rs1.get("patientName"));
				listOfMales.add(dto);

			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return listOfMales;
	}

	@Override
	public List<RegistrationDto> fetchpatientnameFemale(String patientName, String callfrom) {
		SQLQuery sql = null;

		List<RegistrationDto> listOfFemales = new ArrayList<RegistrationDto>();

		try {

			if (callfrom.equals("onload")) {
				sql = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT p1.patient_id,concat(p1.f_name,' ', p1.m_name,' ', p1.l_name) FROM ehat_patient p1,ehat_ivf_treatment t1 where p1.patient_id=t1.patient_id and t1.ivf_status = 'Y' and p1.gender='Female' ");
			} else {

				sql = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT p1.patient_id,concat(p1.f_name,' ', p1.m_name,' ', p1.l_name) as patientName FROM ehat_patient p1,ehat_ivf_treatment t1 where p1.patient_id=t1.patient_id and t1.ivf_status = 'Y' and p1.gender='Female' and p1.f_name like '%"
								+ patientName + "%' limit 100 ");
				System.out.println(sql);
			}

			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> femaleQuerryList = sql.list();
			for (Map<String, Object> rs1 : femaleQuerryList) {
				RegistrationDto dto = new RegistrationDto();
				dto.setPatientidivffemale((Integer) rs1.get("patient_id"));
				dto.setPatientNameivffemale((String) rs1.get("patientName"));
				listOfFemales.add(dto);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return listOfFemales;

	}

	@Override
	public RegistrationDto getPatientDataById(Integer patId) {
		RegistrationDto objj = new RegistrationDto();
		
		  Criteria criteria =
		  sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
		  Criteria obj =
		  sessionFactory.getCurrentSession().createCriteria(TreatmentDto.class);
		  criteria.add(Restrictions.eq("patientId", patId));
		  
		  obj.addOrder(Order.desc("treatmentId")); obj.setMaxResults(1); TreatmentDto
		  obj1 = (TreatmentDto) obj.list().get(0); System.out.println("obj1" + obj1);
		  objj = (RegistrationDto) criteria.list().get(0);
		  objj.setTflg(obj1.gettFlag()); objj.setDepartment_id(obj1.getDepartmentId());
		  System.out.println("obj1.getDepartmentId()------" + obj1.getDepartmentId());
		  objj.setPatient_weight(obj1.getWeight());
		 
		
		Session s=sessionFactory.getCurrentSession();
				
				
		objj=(RegistrationDto) s.get(RegistrationDto.class, patId);
				//objj=(RegistrationDto) c.uniqueResult();
				Hibernate.initialize(objj.getListTreatment());
				Hibernate.initialize(objj.getListBill());
				Hibernate.initialize(objj.getListPayRes());
				Hibernate.initialize(objj.getListMlcDetails());
				Hibernate.initialize(objj.getListMultipleSponsor());
				List<TreatmentDto> lstTreat=objj.getListTreatment();
				List<BillMasterDto> lstBill=objj.getListBill();
				List<PaymentResponsibleDto> lstPay=objj.getListPayRes();
				List<MlcDetailsDto> lstMlc=objj.getListMlcDetails();
				List<MultipleSponsorDto> lstSponsor=objj.getListMultipleSponsor();
				objj.setListTreatment(lstTreat);
				objj.setListBill(lstBill);
				objj.setListPayRes(lstPay);
				objj.setListMlcDetails(lstMlc);
				objj.setListMultipleSponsor(lstSponsor);
		return objj;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List getAddressList(int id) {
		SQLQuery sql = null;
		sql = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT a.state_name,c.dis_name ,d.city_name from state a left join ehat_patient b on a.idstate=b.state_id left join district c on c.iddistrict=b.district_id left join city d on d.idcity=b.town_id where b.patient_id="
						+ id);
		System.out.println("sqll::::" + sql);
		@SuppressWarnings("rawtypes")
		List list = sql.list();
		System.out.println("result_list for state" + list);
		return list;
	}

	java.util.Calendar currentDate = java.util.Calendar.getInstance();

	@Override
	public synchronized int generateCoupleId(String ivfCoupleDetails, String queryType, HttpServletRequest request) {

		int coupleId = 0;
		int unitid = 0;

		try {

			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			IVFCoupleDTO ivfCoupleDto = (IVFCoupleDTO) ConfigUIJSONUtility.getObjectFromJSON(ivfCoupleDetails,
					IVFCoupleDTO.class);

			IVFCoupleDTO ivfCoupleDto2 = ivfCoupleDto.getListCouple().get(0);

			SimpleDateFormat monthFormatter = new SimpleDateFormat("MM");
			String currentMonth = monthFormatter.format(currentDate.getTime());

			SimpleDateFormat yearFormatter = new SimpleDateFormat("yyyy");
			String currentYear = yearFormatter.format(currentDate.getTime());

			String currentYearMonth = "";
			Integer intPatientID = 0;

			currentYearMonth = currentYear + "/" + currentMonth;

			Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(IVFCoupleDTO.class);
			criteria2.setProjection(Projections.max("ivfCoupleId"));
			Integer unid1 = (Integer) criteria2.uniqueResult();

			if (unid1 != null) {
				intPatientID = unid1;
			}

			intPatientID = intPatientID + 1;

			// code for unit count...
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IVFCoupleDTO.class);
			criteria.setProjection(Projections.count("ivfCoupleId"));
			criteria.add(Restrictions.eq("unitId", ivfCoupleDto.getUnitId()));
			List ltUnitMasters1 = criteria.list();

			Criteria Uncrite = sessionFactory.getCurrentSession().createCriteria(IVFCoupleDTO.class);
			Uncrite.setProjection(Projections.property("unitId"));
			Uncrite.add(Restrictions.eq("ivfCoupleId", ivfCoupleDto.getIvfCoupleId()));
			Integer unid = (Integer) Uncrite.uniqueResult();

			if (ltUnitMasters1.get(0) != null) {
				long u1 = (Long) ltUnitMasters1.get(0);
				unitid = (int) u1;
			}

			if (queryType.equalsIgnoreCase("insert")) {
				unitid++;
				ivfCoupleDto2.setCreatedBy(userId);
				ivfCoupleDto2.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				ivfCoupleDto2.setYearMonth(currentYearMonth);
				ivfCoupleDto2.setCoupleFlag("Active");

				sessionFactory.getCurrentSession().merge(ivfCoupleDto2);
				coupleId = maxCountOfColumn(IVFCoupleDTO.class, "ivfCoupleId");

			} else if (queryType.equalsIgnoreCase("update")) {

				IVFCoupleDTO objectToUpdate = (IVFCoupleDTO) sessionFactory.getCurrentSession().get(IVFCoupleDTO.class,
						ivfCoupleDto2.getIvfCoupleId());
				objectToUpdate.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				objectToUpdate.setUpdatedBy(userId);
				objectToUpdate.setYearMonth(currentYearMonth);
				objectToUpdate.setCoupleFlag("Active");
				objectToUpdate.setFemalePatientId(ivfCoupleDto2.getFemalePatientId());
				objectToUpdate.setMalePatientId(ivfCoupleDto2.getMalePatientId());

				// objectToUpdate
				sessionFactory.getCurrentSession().merge(objectToUpdate);

				coupleId = ivfCoupleDto2.getIvfCoupleId();

			}

		} catch (Exception e) {
			e.printStackTrace();
			coupleId = -1;
		}
		// returning couple Id
		return coupleId;
	}

	// Max value of any coloumn
	public int maxCountOfColumn(@SuppressWarnings("rawtypes") Class className, String columnName) {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(className)
				.setProjection(Projections.max(columnName));
		Integer maxAge = (Integer) criteria.uniqueResult();
		if (maxAge == null) {
			maxAge = 0;
		}
		return maxAge;
	}

	public List<IVFcoupleViewDto> getIVFCoupleList(String coupleFlag,String fromDate,String toDate) {

		List<IVFcoupleViewDto> ltIVFcoupleViewDto = new ArrayList<IVFcoupleViewDto>();

		try {

			String sql = "";

			/*
			 * sql = "SELECT * FROM ehat_view_ivf_couple_details where couple_flag = '" +
			 * coupleFlag + "' group by couple_id  order by couple_id desc limit 10";
			 */

			  sql = "SELECT * FROM ehat_view_ivf_couple_details where date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' group by couple_id  order by couple_id desc limit 10";
			
			Query ltCoupleResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);

			ltCoupleResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> Couplelist = ltCoupleResQuery.list();
			for (Map<String, Object> row : Couplelist) {

				IVFcoupleViewDto obj = new IVFcoupleViewDto();

				obj.setCoupleID((Integer) row.get("couple_id"));
				obj.setMalePatientId((Integer) row.get("male_patient_id"));
				obj.setFemalePatientId((Integer) row.get("female_patient_id"));
				obj.setUnitId((Integer) row.get("unit_id"));
				obj.setCoupleNo((String) row.get("couple_No"));
				obj.setMalePatientName((String) row.get("male_patient_name"));
				obj.setFemalePatientName((String) row.get("female_patient_name"));
				obj.setCoupleID((Integer) row.get("couple_id"));
				obj.setCoupleId(String.valueOf((Integer) row.get("couple_id")));
				obj.setCoupleFlag((String) row.get("couple_flag"));
				obj.setMaleTreatId((BigInteger) row.get("male_treatId"));
				obj.setMaleDeptId((Integer) row.get("male_dept_id"));
				obj.setFemaleDeptId((Integer) row.get("female_dept_id"));

				Integer female_treatId = ((BigInteger) row.get("female_treatId")).intValue();
				obj.setFemaleTreatId(female_treatId);

				String male_doctorId = (String) row.get("male_doctorId");
				if (male_doctorId == "" || null == male_doctorId || male_doctorId.equals(null)) {
					obj.setMaleDoctorId(0);
				} else {
					obj.setMaleDoctorId(Integer.parseInt(male_doctorId));
				}

				String female_doctorId = (String) row.get("female_doctorId");
				if (female_doctorId == "" || null == female_doctorId || female_doctorId.equals(null)) {
					obj.setFemaleDoctorId(0);
				} else {
					obj.setFemaleDoctorId(Integer.parseInt(female_doctorId));
				}
				obj.setIvfBatchStatus((String) row.get("ivf_batch_status"));
				
				Integer femaleIvfTreatId=((Number) row.get("female_ivf_treat_id")).intValue();
				Integer maleIvfTreatId=((Number) row.get("male_ivf_treat_id")).intValue();
				
				if(femaleIvfTreatId == null  || femaleIvfTreatId .equals(null)) {
					obj.setFemaleIvfTreatId(0);
				}else {
					obj.setFemaleIvfTreatId(((Number) row.get("female_ivf_treat_id")).intValue());
				}
				
				if(maleIvfTreatId == null  || maleIvfTreatId .equals(null)) {
					obj.setMaleIvfTreatId(0);
				}else {
					obj.setMaleIvfTreatId(((Number) row.get("male_ivf_treat_id")).intValue());
				}
				
				
				//obj.setFemaleIvfTreatId(((Number) row.get("female_ivf_treat_id")).intValue());
				//obj.setMaleIvfTreatId(((Number) row.get("male_ivf_treat_id")).intValue());

				ltIVFcoupleViewDto.add(obj);

			}

		} catch (Exception e) {

			e.printStackTrace();

			return ltIVFcoupleViewDto;

		}

		return ltIVFcoupleViewDto;

	}

	@Override
	public String getCountCoupleMaster(String coupleFlag, HttpServletRequest request) {
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT  count(distinct r.couple_id)FROM  ehat_view_ivf_couple_details r where couple_flag = '"
							+ coupleFlag + "'");

		} catch (Exception e) {
			e.printStackTrace();
		}

		BigInteger count = (BigInteger) query.uniqueResult();
		return count.toString();
	}

	@Override
	public IVFcoupleViewDto autoSuggestionForCoupleDetails(String findingName, int coupleSearchType, String callFrom) {

		IVFcoupleViewDto coupleDetails = new IVFcoupleViewDto();
		List<IVFcoupleViewDto> coupleList = new ArrayList<IVFcoupleViewDto>();
		try {
			String sql = "";

			if (callFrom.equals("active")) {

				sql = getSqlQueryCoupleDetails(findingName, coupleSearchType, "active");

			} else if (callFrom.equals("passive")) {

				sql = getSqlQueryCoupleDetails(findingName, coupleSearchType, "passive");

			}

			SQLQuery getCoupleDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getCoupleDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> coupleRow = getCoupleDetails.list();
			for (Map<String, Object> row : coupleRow) {

				IVFcoupleViewDto obj = new IVFcoupleViewDto();
				obj.setFemalePatientName((String) row.get("female_patient_name"));
				obj.setMalePatientName((String) row.get("male_patient_name"));
				obj.setCoupleID((Integer) row.get("couple_id"));
				coupleList.add(obj);
			}
			coupleDetails.setLstCoupleviewDto(coupleList);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return coupleDetails;
	}

	String getSqlQueryCoupleDetails(String findingName, int coupleSearchType, String callFrom) {

		String sql = "";
		if (coupleSearchType == 1) {

			sql = "SELECT c.couple_id AS couple_id,c.male_patient_name,c.female_patient_name FROM ehat_view_ivf_couple_details c WHERE c.couple_id like '"
					+ findingName + "%' ";

		} else if (coupleSearchType == 2) {

			sql = "SELECT c.couple_id AS couple_id,c.male_patient_name,c.female_patient_name FROM ehat_view_ivf_couple_details c WHERE "
					+ " c.female_patient_name like '%" + findingName + "%' ";

		} else if (coupleSearchType == 3) {

			sql = "SELECT c.couple_id AS couple_id,c.male_patient_name,c.female_patient_name FROM ehat_view_ivf_couple_details c WHERE "
					+ " c.male_patient_name like '%" + findingName + "%' ";

		}

		if (callFrom.equalsIgnoreCase("active")) {
			sql = sql + " and c.couple_flag = 'Active' LIMIT 20";
		} else {
			sql = sql + " and c.couple_flag = 'Passive' LIMIT 20";
		}

		return sql;
	}

	@Override
	public IVFcoupleViewDto autoSuggestionForCoupleDetails1(int CoupleId, String callFrom) {

		IVFcoupleViewDto coupleDetails = new IVFcoupleViewDto();
		List<IVFcoupleViewDto> ltIVFcoupleViewDto = new ArrayList<IVFcoupleViewDto>();
		try {
			String sql = "select * from ehat_view_ivf_couple_details c where c.couple_id = " + CoupleId + " ";
			if (callFrom.equalsIgnoreCase("active")) {
				sql = sql + " and  c.couple_flag = 'Active' order by c.couple_id desc";
			} else {
				sql = sql + " and  c.couple_flag = 'Passive' order by c.couple_id desc";
			}

			SQLQuery getCouple = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getCouple.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getCouple.list();
			for (Map<String, Object> row : masterRow) {

				IVFcoupleViewDto obj = new IVFcoupleViewDto();
				obj.setCoupleID((Integer) row.get("couple_id"));
				obj.setCoupleNo((String) row.get("couple_No"));
				obj.setMalePatientId((Integer) row.get("male_patient_id"));
				obj.setFemalePatientId((Integer) row.get("female_patient_id"));
				obj.setMalePatientName((String) row.get("male_patient_name"));
				obj.setFemalePatientName((String) row.get("female_patient_name"));
				obj.setUnitId((Integer) row.get("unit_id"));

				ltIVFcoupleViewDto.add(obj);
			}

			coupleDetails.setLstCoupleviewDto(ltIVFcoupleViewDto);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return coupleDetails;
	}

	@Override
	public synchronized int generateBatch(String ivfBatchMasterDetails, IVFBatchSlave ivfBatchSlaveDetails,
			String ivfBatcInsertType, HttpServletRequest request) {

		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String smsSendNewFlow = (resourceBundle.getObject("smsSendNewFlow").toString());
		int batchId = 0;
		try {
			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			// ====================== For Batch Details ============================
			IVFBatchMaster BatchMasterDto = (IVFBatchMaster) ConfigUIJSONUtility
					.getObjectFromJSON(ivfBatchMasterDetails, IVFBatchMaster.class);

			IVFBatchMaster BatchMasterDto2 = BatchMasterDto.getLtivfBatchMaster().get(0);
			if (ivfBatcInsertType.equalsIgnoreCase("insert")) { // To Insert Record

				BatchMasterDto2.setCreatedBy(userId);
				BatchMasterDto2.setCreatedDateTime(new Date(new java.util.Date().getTime()));

			} else if (ivfBatcInsertType.equalsIgnoreCase("update")
					|| ivfBatcInsertType.equalsIgnoreCase("markvisit")) {// To Update Record

				BatchMasterDto2.setUpdatedBy(userId);
				BatchMasterDto2.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			}
			// Save Batch details
			int batchID = saveIVFBatchMasterDetails(BatchMasterDto.getLtivfBatchMaster().get(0), ivfBatcInsertType,
					userId);

			if (batchID > 0) {

				if (ivfBatcInsertType.equalsIgnoreCase("insert")) { // To Insert Record

					for (int i = 0; i < ivfBatchSlaveDetails.getLtivfBatchSlave().size(); i++) {
						IVFBatchSlave BatchSlaveDto = ivfBatchSlaveDetails.getLtivfBatchSlave().get(i);
						BatchSlaveDto.setIvfBatchMasterId(batchID);
						sessionFactory.getCurrentSession().save(BatchSlaveDto);

						IVFCoupleDTO objectToUpdate = (IVFCoupleDTO) sessionFactory.getCurrentSession().get(
								IVFCoupleDTO.class, ivfBatchSlaveDetails.getLtivfBatchSlave().get(i).getIvfCoupleId());
						objectToUpdate.setIvfBatchStatus("generated");
						sessionFactory.getCurrentSession().update(objectToUpdate);
					}

				} else if (ivfBatcInsertType.equalsIgnoreCase("update")) {

					String hql = "update IVFBatchSlave set ivfCoupleStatus =:ivfCoupleStatus WHERE ivfBatchMasterId =:ivfBatchMasterId";
					Query query1 = sessionFactory.getCurrentSession().createQuery(hql);

					query1.setParameter("ivfCoupleStatus", "Y");
					query1.setParameter("ivfBatchMasterId", batchID);

					query1.executeUpdate();

					Query q = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT ivf_couple_id FROM ehat_ivf_batch_slave WHERE ivf_batch_master_id=" + batchID);
					List<Integer> list = q.list();

					for (int i = 0; i < list.size(); i++) {
						String hql1 = "update IVFCoupleDTO C set ivfBatchStatus =:ivfBatchStatus WHERE ivfCoupleId =:ivfCoupleId";
						Query query2 = sessionFactory.getCurrentSession().createQuery(hql1);
						query2.setParameter("ivfBatchStatus", "not generated");
						query2.setParameter("ivfCoupleId", list.get(i));

						query2.executeUpdate();
					}

					// To Update Record

					for (int i = 0; i < ivfBatchSlaveDetails.getLtivfBatchSlave().size(); i++) {
						IVFBatchSlave BatchSlaveDto = ivfBatchSlaveDetails.getLtivfBatchSlave().get(i);
						BatchSlaveDto.setIvfBatchMasterId(batchID);
						sessionFactory.getCurrentSession().save(BatchSlaveDto);

						IVFCoupleDTO objectToUpdate = (IVFCoupleDTO) sessionFactory.getCurrentSession().get(
								IVFCoupleDTO.class, ivfBatchSlaveDetails.getLtivfBatchSlave().get(i).getIvfCoupleId());
						objectToUpdate.setIvfBatchStatus("generated");
						sessionFactory.getCurrentSession().update(objectToUpdate);
					}
				}

			}
		} catch (Exception e) {

			e.printStackTrace();
		}
		return batchId;
	}

	@Override
	public synchronized int saveIVFBatchMasterDetails(IVFBatchMaster IVFBatchMasterDto, String queryType,
			Integer userId) {

		int batchId = 0;
		int unitid = 0;

		try {

			SimpleDateFormat monthFormatter = new SimpleDateFormat("MM");
			String currentMonth = monthFormatter.format(currentDate.getTime());

			SimpleDateFormat yearFormatter = new SimpleDateFormat("yyyy");
			String currentYear = yearFormatter.format(currentDate.getTime());

			String currentYearMonth = "";

			currentYearMonth = currentYear + "/" + currentMonth;

			Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(IVFBatchMaster.class);
			criteria2.setProjection(Projections.max("ivfBatchMasterId"));
			Integer unid1 = (Integer) criteria2.uniqueResult();

			// code for unit count...
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IVFBatchMaster.class);
			criteria.setProjection(Projections.count("ivfBatchMasterId"));
			criteria.add(Restrictions.eq("unitId", IVFBatchMasterDto.getUnitId()));
			List ltUnitMasters1 = criteria.list();

			Criteria Uncrite = sessionFactory.getCurrentSession().createCriteria(IVFBatchMaster.class);
			Uncrite.setProjection(Projections.property("unitId"));
			Uncrite.add(Restrictions.eq("ivfBatchMasterId", IVFBatchMasterDto.getIvfBatchMasterId()));
			Integer unid = (Integer) Uncrite.uniqueResult();

			if (ltUnitMasters1.get(0) != null) {
				long u1 = (Long) ltUnitMasters1.get(0);
				unitid = (int) u1;
			}

			if (queryType.equalsIgnoreCase("insert")) {
				unitid++;
				IVFBatchMasterDto.setCreatedBy(userId);
				IVFBatchMasterDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				IVFBatchMasterDto.setYearMonth(currentYearMonth);
				sessionFactory.getCurrentSession().merge(IVFBatchMasterDto);
				batchId = maxCountOfColumn(IVFBatchMaster.class, "ivfBatchMasterId");

			} else if (queryType.equalsIgnoreCase("update")) {

				IVFBatchMaster objectToUpdate = (IVFBatchMaster) sessionFactory.getCurrentSession()
						.get(IVFBatchMaster.class, IVFBatchMasterDto.getIvfBatchMasterId());
				objectToUpdate.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				objectToUpdate.setUpdatedBy(userId);
				objectToUpdate.setYearMonth(currentYearMonth);

				// objectToUpdate
				sessionFactory.getCurrentSession().merge(objectToUpdate);
				batchId = IVFBatchMasterDto.getIvfBatchMasterId();
			}

		} catch (Exception e) {
			e.printStackTrace();
			batchId = -1;
		}
		// returning batch Id
		return batchId;
	}

	@Override
	public List<IVFBatchMaster> getIVFBatchedCoupleList(String ivfBatchStatus) {

		List<IVFBatchMaster> ltIVFBatchMasterDto = new ArrayList<IVFBatchMaster>();
		try {
			if (ivfBatchStatus.equals("N")) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IVFBatchMaster.class);
				criteria.add(Restrictions.eq("ivfBatchStatus", "N"));
				criteria.addOrder(Order.desc("ivfBatchMasterId"));
				criteria.setMaxResults(10);

				ProjectionList proList = Projections.projectionList();
				proList.add(Projections.property("ivfBatchMasterId"));
				proList.add(Projections.property("YearMonth"));
				proList.add(Projections.property("unitId"));
				proList.add(Projections.property("ivfBatchStatus"));
				proList.add(Projections.property("pickUpDate"));

				criteria.setProjection(proList);

				@SuppressWarnings("unchecked")
				List<Object[]> result = criteria.list();

				for (Object[] BatchMaster : result) {
					if (BatchMaster[0] != null) {
						IVFBatchMaster IVFbatchMasterDto = new IVFBatchMaster();

						if (BatchMaster[0] != null)
							IVFbatchMasterDto.setIvfBatchMasterId(Integer.parseInt(BatchMaster[0].toString()));
						else
							IVFbatchMasterDto.setIvfBatchMasterId(0);

						if (BatchMaster[1] != null)
							IVFbatchMasterDto.setYearMonth(BatchMaster[1].toString());
						else
							IVFbatchMasterDto.setYearMonth("0");

						if (BatchMaster[2] != null)
							IVFbatchMasterDto.setUnitId(Integer.parseInt(BatchMaster[2].toString()));
						else
							IVFbatchMasterDto.setUnitId(0);

						if (BatchMaster[3] != null)
							IVFbatchMasterDto.setIvfBatchStatus(BatchMaster[3].toString());
						else
							IVFbatchMasterDto.setIvfBatchStatus("");

						if (BatchMaster[4] != null)
							IVFbatchMasterDto.setPickUpDate(BatchMaster[4].toString());
						else
							IVFbatchMasterDto.setPickUpDate("-");

						ltIVFBatchMasterDto.add(IVFbatchMasterDto);
					}
				}

			} else {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IVFBatchMaster.class);
				criteria.add(Restrictions.eq("ivfBatchStatus", "Y"));
				criteria.setMaxResults(10);

				ProjectionList proList = Projections.projectionList();
				proList.add(Projections.property("ivfBatchMasterId"));
				proList.add(Projections.property("YearMonth"));
				proList.add(Projections.property("unitId"));
				proList.add(Projections.property("ivfBatchStatus"));
				proList.add(Projections.property("pickUpDate"));

				criteria.setProjection(proList);

				@SuppressWarnings("unchecked")
				List<Object[]> result = criteria.list();

				for (Object[] BatchMaster : result) {
					if (BatchMaster[0] != null) {
						IVFBatchMaster IVFbatchMasterDto = new IVFBatchMaster();

						if (BatchMaster[0] != null)
							IVFbatchMasterDto.setIvfBatchMasterId(Integer.parseInt(BatchMaster[0].toString()));
						else
							IVFbatchMasterDto.setIvfBatchMasterId(0);

						if (BatchMaster[1] != null)
							IVFbatchMasterDto.setYearMonth(BatchMaster[1].toString());
						else
							IVFbatchMasterDto.setYearMonth("0");

						if (BatchMaster[2] != null)
							IVFbatchMasterDto.setUnitId(Integer.parseInt(BatchMaster[2].toString()));
						else
							IVFbatchMasterDto.setUnitId(0);

						if (BatchMaster[3] != null)
							IVFbatchMasterDto.setIvfBatchStatus(BatchMaster[3].toString());
						else
							IVFbatchMasterDto.setIvfBatchStatus("");

						if (BatchMaster[4] != null)
							IVFbatchMasterDto.setPickUpDate(BatchMaster[4].toString());
						else
							IVFbatchMasterDto.setPickUpDate("-");

						ltIVFBatchMasterDto.add(IVFbatchMasterDto);
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltIVFBatchMasterDto;
		}
		return ltIVFBatchMasterDto;
	}

	@Override
	public String getCountBatchMaster(String ivfBatchStatus, HttpServletRequest request) {
		SQLQuery query = null;

		try {
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT  count(distinct r.ivf_batch_master_id)FROM  ehat_view_ivf_batch_details r where ivf_batch_status = '"
							+ ivfBatchStatus + "'");

		} catch (Exception e) {
			e.printStackTrace();
		}

		BigInteger count = (BigInteger) query.uniqueResult();
		return count.toString();
	}

	@Override
	public List<IVFBatchViewDto> getBatchedCoupleDetails(Integer batchID, String ivfCoupleStatus) {

		List<IVFBatchViewDto> ltIVFBatchViewRecord = new ArrayList<IVFBatchViewDto>();
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IVFBatchViewDto.class);
			criteria.add(Restrictions.eq("batchID", batchID));
			if (ivfCoupleStatus.equals("N")) {
				//criteria.add(Restrictions.eq("ivfCoupleStatus", ivfCoupleStatus));
				criteria.add(Restrictions.eq("ivfBatchStatus", "N"));
			} else {
				criteria.add(Restrictions.eq("ivfBatchStatus", "Y"));
				// criteria.add(Restrictions.eq("ivfCoupleStatus", "N"));
			}

			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("batchID"));
			proList.add(Projections.property("coupleID"));
			proList.add(Projections.property("malePatientName"));
			proList.add(Projections.property("femalePatientName"));
			proList.add(Projections.property("malePatientId"));
			proList.add(Projections.property("femalePatientId"));
			proList.add(Projections.property("maleTreatId"));
			proList.add(Projections.property("femaleTreatId"));
			proList.add(Projections.property("maleDoctorId"));
			proList.add(Projections.property("femaleDoctorId"));
			proList.add(Projections.property("maleDeptId"));
			proList.add(Projections.property("femaleDeptId"));
			proList.add(Projections.property("batchNo"));
			proList.add(Projections.property("pickUpDate"));

			criteria.setProjection(proList);
			@SuppressWarnings("unchecked")
			List<Object[]> result = criteria.list();

			for (Object[] IVFBatchViewDto : result) {
				IVFBatchViewDto IVFbatchViewDto = new IVFBatchViewDto();

				if (IVFBatchViewDto[0] != null)
					IVFbatchViewDto.setBatchID(Integer.parseInt(IVFBatchViewDto[0].toString()));
				else
					IVFbatchViewDto.setBatchID(0);

				if (IVFBatchViewDto[1] != null)
					IVFbatchViewDto.setCoupleID(Integer.parseInt(IVFBatchViewDto[1].toString()));
				else
					IVFbatchViewDto.setCoupleID(0);

				if (IVFBatchViewDto[2] != null)
					IVFbatchViewDto.setMalePatientName(IVFBatchViewDto[2].toString());
				else
					IVFbatchViewDto.setMalePatientName("-");

				if (IVFBatchViewDto[3] != null)
					IVFbatchViewDto.setFemalePatientName(IVFBatchViewDto[3].toString());
				else
					IVFbatchViewDto.setFemalePatientName("-");

				if (IVFBatchViewDto[4] != null)
					IVFbatchViewDto.setMalePatientId(Integer.parseInt(IVFBatchViewDto[4].toString()));
				else
					IVFbatchViewDto.setMalePatientId(0);

				if (IVFBatchViewDto[5] != null)
					IVFbatchViewDto.setFemalePatientId(Integer.parseInt(IVFBatchViewDto[5].toString()));
				else
					IVFbatchViewDto.setFemalePatientId(0);

				if (IVFBatchViewDto[6] != null)
					IVFbatchViewDto.setMaleTreatId(Integer.parseInt(IVFBatchViewDto[6].toString()));
				else
					IVFbatchViewDto.setMaleTreatId(0);

				if (IVFBatchViewDto[7] != null)
					IVFbatchViewDto.setFemaleTreatId(Integer.parseInt(IVFBatchViewDto[7].toString()));
				else
					IVFbatchViewDto.setFemaleTreatId(0);

				if (IVFBatchViewDto[8] != null)
					IVFbatchViewDto.setMaleDoctorId(Integer.parseInt(IVFBatchViewDto[8].toString()));
				else
					IVFbatchViewDto.setMaleDoctorId(0);

				if (IVFBatchViewDto[9] != null)
					IVFbatchViewDto.setFemaleDoctorId(Integer.parseInt(IVFBatchViewDto[9].toString()));
				else
					IVFbatchViewDto.setFemaleDoctorId(0);

				if (IVFBatchViewDto[10] != null)
					IVFbatchViewDto.setMaleDeptId(Integer.parseInt(IVFBatchViewDto[10].toString()));
				else
					IVFbatchViewDto.setMaleDeptId(0);

				if (IVFBatchViewDto[11] != null)
					IVFbatchViewDto.setFemaleDeptId(Integer.parseInt(IVFBatchViewDto[11].toString()));
				else
					IVFbatchViewDto.setFemaleDeptId(0);

				if (IVFBatchViewDto[12] != null)
					IVFbatchViewDto.setBatchNo(IVFBatchViewDto[12].toString());
				else
					IVFbatchViewDto.setBatchNo("-");

				if (IVFBatchViewDto[13] != null)
					IVFbatchViewDto.setPickUpDate(IVFBatchViewDto[13].toString());
				else
					IVFbatchViewDto.setPickUpDate("-");

				ltIVFBatchViewRecord.add(IVFbatchViewDto);

			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltIVFBatchViewRecord;
		}
		return ltIVFBatchViewRecord;
	}

	@Override
	public IVFBatchMaster autoSuggestionForBatchDetails(String findingName, int batchSearchType, String callFrom) {

		IVFBatchMaster batchDetails = new IVFBatchMaster();
		List<IVFBatchMaster> batchList = new ArrayList<IVFBatchMaster>();
		try {
			String sql = "";

			if (callFrom.equals("activeBatch")) {

				sql = "SELECT bm.ivf_batch_master_id AS ivf_batch_master_id,bm.yearmonth,bm.pick_up_date FROM ehat_ivf_batch_master bm WHERE bm.ivf_batch_status = 'N' and bm.ivf_batch_master_id like '"
						+ findingName + "%' ";

			} else if (callFrom.equals("cancelBatch")) {

				sql = "SELECT bm.ivf_batch_master_id AS ivf_batch_master_id,bm.yearmonth,bm.pick_up_date FROM ehat_ivf_batch_master bm WHERE bm.ivf_batch_status = 'Y' and bm.ivf_batch_master_id like '"
						+ findingName + "%' ";

			}

			SQLQuery getBatchDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getBatchDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> batchRow = getBatchDetails.list();
			for (Map<String, Object> row : batchRow) {

				IVFBatchMaster obj = new IVFBatchMaster();
				obj.setPickUpDate((String) row.get("pick_up_date"));
				obj.setYearMonth((String) row.get("yearmonth"));
				obj.setIvfBatchMasterId((Integer) row.get("ivf_batch_master_id"));
				batchList.add(obj);
			}
			batchDetails.setLtivfBatchMaster(batchList);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return batchDetails;
	}

	@Override
	public IVFBatchMaster autoSuggestionForBatchDetails1(int batchId, String callFrom) {

		IVFBatchMaster batchDetails = new IVFBatchMaster();
		List<IVFBatchMaster> ltIVFbatchMaster = new ArrayList<IVFBatchMaster>();
		try {
			String sql = "select * from ehat_ivf_batch_master where ivf_batch_master_id = " + batchId + " ";
			if (callFrom.equalsIgnoreCase("activeBatch")) {
				sql = sql + " and  ivf_batch_status = 'N' order by ivf_batch_master_id desc";
			} else {
				sql = sql + " and  ivf_batch_status = 'Y' order by ivf_batch_master_id desc";
			}

			SQLQuery getBatch = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getBatch.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getBatch.list();
			for (Map<String, Object> row : masterRow) {

				IVFBatchMaster obj = new IVFBatchMaster();
				obj.setIvfBatchMasterId((Integer) row.get("ivf_batch_master_id"));
				obj.setYearMonth((String) row.get("yearmonth"));
				obj.setPickUpDate((String) row.get("pick_up_date"));
				obj.setUnitId((Integer) row.get("unit_id"));

				ltIVFbatchMaster.add(obj);
			}

			batchDetails.setLtivfBatchMaster(ltIVFbatchMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return batchDetails;
	}

	@Override
	public int saveOrUpdateSurgeryadvice(SurgeryAdviceForIvfDTO obj, HttpServletRequest request) {

		try {

			if (obj.getAdviceID() == 0) {
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(obj);
				return 2;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	public List<SurgeryAdviceForIvfDTO> fetchSurgeryAdviceInfoForIVF(Integer treatmentId) {

		List<SurgeryAdviceForIvfDTO> listsga = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgeryAdviceForIvfDTO.class);
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("ivftreatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));

			listsga = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listsga;
	}

	@Override
	public String deleteDataforsurgeryAdviceBasicInfo(Integer adviceMasterId, Integer userId) {

		String sql = "";
		String msg = "";
		try {
			sql = "update  SurgeryAdviceForIvfDTO set deleted='Y',deletedBy=" + userId
					+ ",deletedDateTime=now() where adviceID=:adviceMasterId";
			Query query = sessionFactory.getCurrentSession().createQuery(sql);
			query.setParameter("adviceMasterId", adviceMasterId);
			query.executeUpdate();
			msg = "Record Deleted Successfully";
		} catch (Exception e) {
			e.printStackTrace();
			msg = "Network Issue";
		}
		return msg;
	}

	@Override
	public SurgeryAdviceForIvfDTO editsurgeryadvicerecord(Integer adviceID) {

		SurgeryAdviceForIvfDTO obj = new SurgeryAdviceForIvfDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgeryAdviceForIvfDTO.class);
			criteria.add(Restrictions.eq("adviceID", adviceID));

			obj = (SurgeryAdviceForIvfDTO) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int saveOrUpdateAdmissionNote(IVFAdmissionNoteDTO obj, HttpServletRequest request) {

		try {

			if (obj.getAdmissionNoteID() == 0) {
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(obj);
				return 2;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<IVFAdmissionNoteDTO> fetchRecordadmissionnoteForIVF(Integer treatmentId) {

		List<IVFAdmissionNoteDTO> listivfnote = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IVFAdmissionNoteDTO.class);
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("ivftreatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));

			listivfnote = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listivfnote;
	}

	@Override
	public int saveOrUpdateClinicalEvaluationforAllergyAlert(IVFClinicalEvaluationForAllergyAlertDTO obj,
			HttpServletRequest request) {
		try {

			if (obj.getAllergyalertid() == 0) {
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(obj);
				return 2;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;

	}

	@Override
	public List<IVFClinicalEvaluationForAllergyAlertDTO> saveOrUpdateClinicalEvaluationforAllergyAlert(
			Integer treatmentId) {
		List<IVFClinicalEvaluationForAllergyAlertDTO> listivfAllergyAlert = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IVFClinicalEvaluationForAllergyAlertDTO.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));

			listivfAllergyAlert = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listivfAllergyAlert;
	}

	@Override
	public IVFClinicalEvaluationForAllergyAlertDTO editRecordClinicalEvaluationForIVFAllergyAlert(
			Integer allergyalertid) {

		IVFClinicalEvaluationForAllergyAlertDTO obj = new IVFClinicalEvaluationForAllergyAlertDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IVFClinicalEvaluationForAllergyAlertDTO.class);
			criteria.add(Restrictions.eq("allergyalertid", allergyalertid));

			obj = (IVFClinicalEvaluationForAllergyAlertDTO) criteria.uniqueResult();
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public String deleterecordClinicalEvaluationForIVFAllergyAlert(String allergyalertIdRow, int userId) {

		String sql = "";
		String msg = "";

		try {

			Query itemInfo = sessionFactory.getCurrentSession()
					.createSQLQuery("update ivf_clinical_evaluation_allergyalert set deleted='Y',deleted_by=" + userId
							+ ",deleted_date_time=now() where allergyalert_id in(" + allergyalertIdRow + ")");

			int iii = itemInfo.executeUpdate();

			// msg="Record Deleted Successfully";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public int saveOrUpdateInfoPreganacyData(IVFClinicalEvaluatonPregnancyDTO obj, HttpServletRequest request) {
		try {

			if (obj.getPregnancyid() == 0) {
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(obj);
				return 2;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int saveOrUpdateCKEditorDocterDeskIvf(IVFClinicalEvaluationDTO obj, HttpServletRequest request) {
		try {

			if (obj.getCid() == 0) {
				System.out.println("ddddddddddddddddddddddd");
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(obj);
				return 2;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public IVFClinicalEvaluationDTO fetchClinicalInfo(Integer treatmentId) {
		IVFClinicalEvaluationDTO obj = null;
		try {
			// System.out.println("aaaaaaaaaaaaaaa");
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IVFClinicalEvaluationDTO.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));

			obj = (IVFClinicalEvaluationDTO) criteria.uniqueResult();
			// System.out.println("---------obj----------------"+obj);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return obj;
	}

	@Override
	public IVFClinicalEvaluatonPregnancyDTO fetchInfoPreganacyData(Integer treatmentId) {
		IVFClinicalEvaluatonPregnancyDTO obj = null;
		try {
			System.out.println("aaaaaaaaaaaaaaa");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IVFClinicalEvaluatonPregnancyDTO.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));

			obj = (IVFClinicalEvaluatonPregnancyDTO) criteria.uniqueResult();
			System.out.println("---------obj----------------" + obj);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return obj;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<IvfQueueDTO> getIvfQueue(Integer unitId) {
		List<IvfQueueDTO> ltIvfQueue = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfQueueDTO.class);
			if (unitId > 0) {
				criteria.add(Restrictions.eq("unitId", unitId));
			}
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("pId"));
			ltIvfQueue = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			return ltIvfQueue;
		}
		return ltIvfQueue;
	}

	@Override
	public List<IvfQueueDTO> autoSuggestationIvfQueue(String searchText,int patSearchType,String callFrom) {
		List<IvfQueueDTO> list = new ArrayList<IvfQueueDTO>();
		try {
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IvfQueueDTO.class);
			
			if(patSearchType == 1){
			   c.add(Restrictions.eq("pId", Integer.valueOf(searchText)));
			}else if(patSearchType == 2){
				c.add(Restrictions.ilike("patientName",searchText, MatchMode.ANYWHERE));
			}else if(patSearchType == 3){
				c.add(Restrictions.ilike("mobile", searchText, MatchMode.ANYWHERE));
			}
			list = c.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public IvfQueueDTO getIvfQueuePatientByTreatmentId(Integer treatId) {
		IvfQueueDTO obj = new IvfQueueDTO();
		try {
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IvfQueueDTO.class);
			c.add(Restrictions.eq("treatId", treatId));
			obj = (IvfQueueDTO) c.uniqueResult();
			;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public List<ChargesMasterSlave> fetchWordWiseHallList(Integer hallType) {
		List<Object[]> list = null;
		List<ChargesMasterSlave> li = new ArrayList<>();
		try {

			Criteria crit = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			ProjectionList projList = Projections.projectionList();
			crit.add(Restrictions.eq("isCategory", "N"));
			crit.add(Restrictions.eq("deleted", "N"));
			crit.add(Restrictions.eq("chargesMasterDto", 2));
			crit.add(Restrictions.eq("selfId", hallType));
			crit.addOrder(Order.desc("slaveId"));
			projList.add(Projections.property("slaveId").as("slaveId"));
			projList.add(Projections.property("categoryName").as("categoryName"));
			crit.setProjection(projList);
			list = crit.list();

			for (Object[] obj : list) {
				ChargesMasterSlave salve = new ChargesMasterSlave();
				salve.setSlaveId((int) obj[0]);
				salve.setCategoryName((String) obj[1]);
				li.add(salve);

			}
			return li;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return li;
	}

	@Override
	public HallManagementDto fetchHallWiseNumberOfBeds(Integer hallID, String callFrom) {
		String sql = "";
		HallManagementDto obj = new HallManagementDto();

		Integer countAvailableBeds = 0;
		Integer countCleaningBeds = 0;
		Integer countAllocateBeds = 0;
		Integer countTotalBeds = 0;
		Integer HallID = 0;
		String sqlcount = "";

		if (callFrom.equalsIgnoreCase("allBed")) {

			sqlcount = "SELECT count(*) as countTotal FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N'";
			SQLQuery qcountTotal = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countTotalBeds = ((Number) qcountTotal.uniqueResult()).intValue();

			sqlcount = "SELECT count(*) as countAvailable FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N'and b.idbedstate = '4'";
			SQLQuery qcountAva = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countAvailableBeds = ((Number) qcountAva.uniqueResult()).intValue();

			sqlcount = "SELECT count(*) as countCleaning FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N'and b.idbedstate = '2' ";
			SQLQuery qcountClean = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countCleaningBeds = ((Number) qcountClean.uniqueResult()).intValue();

			sqlcount = "SELECT count(*) as countAllocate FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N'and b.idbedstate = '3' ";
			SQLQuery qcountAllocate = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countAllocateBeds = ((Number) qcountAllocate.uniqueResult()).intValue();
		} else {

			sqlcount = "SELECT Hall_ID FROM hall h WHERE status ='Y' and deleted='N' and ehat_hallid=" + hallID;
			SQLQuery qHallID = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			HallID = ((Number) qHallID.uniqueResult()).intValue();

			sqlcount = "SELECT count(*) as countCleaning FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N' and h.ehat_hallid="
					+ hallID;
			SQLQuery qcountTotal = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countTotalBeds = ((Number) qcountTotal.uniqueResult()).intValue();

			sqlcount = "SELECT count(*) as countAvailable FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N' and b.idbedstate = '4' and h.ehat_hallid="
					+ hallID;
			SQLQuery qcountAva = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countAvailableBeds = ((Number) qcountAva.uniqueResult()).intValue();

			sqlcount = "SELECT count(*) as countCleaning FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N' and b.idbedstate = '2' and h.ehat_hallid= "
					+ hallID;
			SQLQuery qcountClean = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countCleaningBeds = ((Number) qcountClean.uniqueResult()).intValue();

			sqlcount = "SELECT count(*) as countAllocate FROM beds b, hall h WHERE b.Hall_ID = h.Hall_ID and b.status ='Y' and h.status ='Y' and h.deleted='N' and b.deleted='N' and b.idbedstate = '3' and h.ehat_hallid= "
					+ hallID;
			SQLQuery qcountAllocate = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
			countAllocateBeds = ((Number) qcountAllocate.uniqueResult()).intValue();
		}

		obj.setCountTotalBeds(countTotalBeds);
		obj.setCountAvailableBeds(countAvailableBeds);
		obj.setCountCleaningBeds(countCleaningBeds);
		obj.setCountAllocateBeds(countAllocateBeds);

		List<HallManagementDto> arrDefaultHall = new ArrayList<HallManagementDto>();

		try {

			// if (hallID.equals("allBed")) {
			if (callFrom.equals("allBed")) {
				sql = "select * from hall where status='Y'  order by Htype";
			} else if (hallID.equals("allHallBed")) {
				sql = "select * from hall where status='Y'  order by Htype";
			} else {
				sql = "select * from hall where status='Y'  and Hall_ID= " + HallID;
			}

			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);

			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> hallDetails = q.list();

			for (Map<String, Object> rs : hallDetails) {
				HallManagementDto objhallDetails = new HallManagementDto();
				List<Beds> arrDefaultBed = new ArrayList<Beds>();
				objhallDetails.setHall((Integer) rs.get("Hall_ID"));
				objhallDetails.setHallName((String) rs.get("Hname"));
				objhallDetails.setHall_type((String) rs.get("Htype"));
				String htypeid = (String) rs.get("Htype");
				objhallDetails.setHtypeName(fetchHallTypeNameById(htypeid));
				objhallDetails.setNumberOfBed((String) rs.get("Number_of_Beds"));
				/* objhallDetails.setA((String) rs .get("Available_Beds")); */

				objhallDetails.setLeasePreBed((String) rs.get("lease_per_bed"));

				sql = "SELECT b.*,tb.Treatment_ID,tb.isolation, tb.bedAllocatedFor, tb.In_Time"
						+ " FROM beds b  left join treatment_beds tb ON b.Bed_ID=tb.Bed_ID and tb.status != 'N' and  tb.Treatment_ID is not null"
						+ " WHERE  b.status = 'Y'  and b.Hall_ID=" + objhallDetails.getHall();

				q = sessionFactory.getCurrentSession().createSQLQuery(sql);
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> bedDetails = q.list();

				for (Map<String, Object> rs1 : bedDetails) {
					com.hms.administrator.dto.Beds objBedDetails = new com.hms.administrator.dto.Beds();

					objBedDetails.setBed_ID((Integer) rs1.get("Bed_ID"));
					objBedDetails.setBed_name((String) rs1.get("bed_name"));
					objBedDetails.setStatus((String) rs1.get("status"));
					objBedDetails.setAvailability(((String) rs1.get("Availability")));
				//	int idbedState = (Integer) rs1.get("idbedstate");
					//String idbedState1 = String.valueOf(idbedState);
					objBedDetails.setBedstate((String) rs1.get("idbedstate"));
					objBedDetails.setIsolation((String) rs1.get("isolation"));

					// used ternary operator

					try {
						objBedDetails.setInDateTime(
								(rs1.get("In_Time") == null) ? ("") : (((Timestamp) rs1.get("In_Time")).toString()));
					} catch (Exception e) {
						objBedDetails.setInDateTime("");
					}

					if (((Integer) rs1.get("Treatment_ID")) != null && !hallID.equals("allHallBed")) {

						objBedDetails.setTreatment_ID((Integer) rs1.get("Treatment_ID"));

						String bedAllocatedFor = (String) rs1.get("bedAllocatedFor");

						List<RegistrationDto> pat = fetchPatientList((Integer) rs1.get("Treatment_ID"),
								bedAllocatedFor);
						// System.out.println(pat);
						objBedDetails.setPatList(pat);
					}

					arrDefaultBed.add(objBedDetails);
					objhallDetails.setBedsList(arrDefaultBed);
					//objhallDetails.setBedsList(arrDefaultBed);
				}

				arrDefaultHall.add(objhallDetails);

				obj.setHallList(arrDefaultHall);

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;

	}

	public String fetchHallTypeNameById(String htypeid) {

		String sql = "select * from hall_type where idhall_type =" + htypeid;
		String hTNM = "";

		try {
			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> hallDetails = q.list();

			for (Map<String, Object> rs : hallDetails) {
				hTNM = (String) rs.get("hall_type_name");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hTNM;
	}

	private List<RegistrationDto> fetchPatientList(Integer treatId, String bedAllocatedFor) {

		List arrPat = null;
		try {
			String sql = "SELECT ehat_patient.patient_id as patient_id, ehat_patient.f_name as fName,ehat_patient.m_name as mName, "
					+ " ehat_patient.l_name as lName, ehat_patient.mrnno as mr_no, ehat_patient.prefix as title,"
					+ " date(ehat_patient.created_date_time) as reg_date, ehat_patient.age, ehat_patient.gender as sex, date(ehat_treatment.updated_date_time) as TendDate,"
					+ " DATEDIFF(now(), ehat_treatment.created_date_time) as admitedDays, ehat_treatment.doctor_id as doctor_id, ifnull(ehat_bill_master.source_type_id,0) as source_type_id,"
					+ " ehat_bill_master.charges_master_slave_id as charges_master_slave_id, ehat_charges_master_slave.category_name as category_name"

					+ " FROM ehat_treatment left join ehat_patient ON (ehat_treatment.patient_id = ehat_patient.patient_id)"
					+ " left join ehat_bill_master ON(ehat_treatment.treatment_id=ehat_bill_master.treatment_id)	left join ehat_charges_master_slave ON (ehat_bill_master.charges_master_slave_id = ehat_charges_master_slave.id)"
					+ " where ehat_treatment.treatment_id =" + treatId;

			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> patDetails = q.list();

			arrPat = fetchPatientDetails(patDetails, bedAllocatedFor);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return arrPat;

	}

	private List fetchPatientDetails(List<Map<String, Object>> patDetails, String bedAllocatedFor) {
		String sql = "";

		List<RegistrationDto> arrPat = new ArrayList<RegistrationDto>();
		for (Map<String, Object> rs : patDetails) {

			RegistrationDto objPat = new RegistrationDto();
			objPat.setPrefix((String) rs.get("title"));
			objPat.setfName((String) rs.get("fName"));
			objPat.setmName((String) rs.get("mName"));
			objPat.setlName((String) rs.get("lName"));
			objPat.setCreatedDateTime((Date) rs.get("reg_date"));

			objPat.setMrnno((String) rs.get("mr_no"));
			objPat.setAge((Integer) rs.get("age"));
			objPat.setGender((String) rs.get("sex"));
			objPat.setPatientId((Integer) rs.get("patient_id"));
			objPat.setAdmitedDays(((Number) rs.get("admitedDays")).intValue());
			objPat.setSourceTypeId(((Number) rs.get("source_type_id")).intValue());
			objPat.setSponsorName((String) rs.get("category_name"));
			String docIDs = (String) rs.get("doctor_id");

			if (docIDs.equalsIgnoreCase("") || docIDs.equalsIgnoreCase("0")) {
				objPat.setDocName("-");
			} else {
				sql = "SELECT  ifnull(GROUP_CONCAT(doc_name SEPARATOR ', '),'') as docname"
						+ " FROM doctor where Doctor_ID in(" + docIDs + ")";

				/* String docName=getJdbcTemplate().queryForObject(sql,String.class); */

				SQLQuery qname = sessionFactory.getCurrentSession().createSQLQuery(sql);
				String docName = (String) qname.uniqueResult();
				objPat.setDocName(docName);
			}

			// System.err.println((String) rs.get("fName"));

			TreatMentBeds objTB = new TreatMentBeds();
			objTB.setBedAllocatedFor(bedAllocatedFor);

			Treatment objTreatment = new Treatment();

			sql = "SELECT count(*) FROM sp_dic_master where sp_dic_master_id=" + objTreatment.getSpecialDiscount();

			/*
			 * int count = getJdbcTemplate().queryForInt(sql,new Object[] {
			 * objTreatment.getSpecialDiscount() });
			 */

			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number) q.uniqueResult()).intValue();

			String insuranceCmpny = "Self Pay";

			if (count > 0) {
				sql = "SELECT name FROM sp_dic_master where sp_dic_master_id=" + objTreatment.getSpecialDiscount();

				/*
				 * insuranceCmpny = (String) getJdbcTemplate().queryForObject(sql, new Object[]
				 * { objTreatment.getSpecialDiscount() }, String.class);
				 */
				SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				insuranceCmpny = (String) q1.uniqueResult();

			}

			objTreatment.setInsuranceCmpny(insuranceCmpny);
			objPat.setObjTreatment(objTreatment);
			objPat.setObjtreatmentbeds(objTB);
			arrPat.add(objPat);
		}

		return arrPat;
	}

	@Override
	public List<IvfTreBillDto> fetchIvfPatientDetailsByTreatmentId(Integer treatmentId) {

		List<IvfTreBillDto> lstMainList = new ArrayList<IvfTreBillDto>();

		List<IvfTreBillDto> ltIvfPatientRecord = null;
		List<EhatBillPrefix> ltBillPrefix = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IvfTreBillDto.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.setMaxResults(10);
			ltIvfPatientRecord = criteria.list();

			int depId = ltIvfPatientRecord.get(0).getDepartmentId();
			ArrayList<Integer> depIds = new ArrayList<Integer>();
			depIds.add(depId);
			depIds.add(0);
			depIds.add(4);

			Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
			criteriaPrefix.add(Restrictions.eq("deleted", "N"));
			criteriaPrefix.add(Restrictions.in("depId", depIds));
			ltBillPrefix = criteriaPrefix.list();

			for (IvfTreBillDto obj : ltIvfPatientRecord) {

				obj.setListEhatBillPrefix(ltBillPrefix);
				lstMainList.add(obj);
			}

			System.err.println("pat---" + ltIvfPatientRecord.get(0).getPatientId());
			System.err.println("1---" + lstMainList.get(0).getPatientId());
			String gender = ltIvfPatientRecord.get(0).getGender();
			Session session = sessionFactory.getCurrentSession();
			int CoupleID = 0;
			int BatchID = 0;
			int count = 0;

			if (gender.equalsIgnoreCase("Female")) {

				String countSql = "Select count(*) from ehat_ivf_couple where female_patient_id = '"
						+ ltIvfPatientRecord.get(0).getPatientId() + "'";
				System.err.println("countSql---" + countSql);
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(countSql);
				count = ((Number) countQuery1.uniqueResult()).intValue();

				if (count > 0) {
					String sql1 = "Select ivf_couple_id from ehat_ivf_couple where female_patient_id = '"
							+ ltIvfPatientRecord.get(0).getPatientId() + "'";
					Query coupleQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					CoupleID = ((Number) coupleQuery1.uniqueResult()).intValue();

					String batchSql = "Select ivf_batch_master_id from ehat_ivf_batch_slave where ivf_batch_female_patient_id = '"
							+ ltIvfPatientRecord.get(0).getPatientId() + "'";
					Query batchQuery1 = sessionFactory.getCurrentSession().createSQLQuery(batchSql);
					BatchID = ((Number) batchQuery1.uniqueResult()).intValue();
				}

			} else {

				String countSql = "Select count(*) from ehat_ivf_couple where male_patient_id = '"
						+ ltIvfPatientRecord.get(0).getPatientId() + "'";
				System.err.println("countSql---" + countSql);
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(countSql);
				count = ((Number) countQuery1.uniqueResult()).intValue();

				if (count > 0) {

					String sql1 = "Select ivf_couple_id from ehat_ivf_couple where male_patient_id = '"
							+ ltIvfPatientRecord.get(0).getPatientId() + "'";
					Query coupleQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					CoupleID = ((Number) coupleQuery1.uniqueResult()).intValue();

					String batchSql = "Select ivf_batch_master_id from ehat_ivf_batch_slave where ivf_batch_male_patient_id = '"
							+ ltIvfPatientRecord.get(0).getPatientId() + "'";
					Query batchQuery1 = sessionFactory.getCurrentSession().createSQLQuery(batchSql);
					BatchID = ((Number) batchQuery1.uniqueResult()).intValue();

				}
			}

			ltIvfPatientRecord.get(0).setCoupleID(CoupleID);
			ltIvfPatientRecord.get(0).setBatchID(BatchID);

			String batchNo = "-";
			if (count > 0) {
				String batchNosql = "select CONCAT(`yearmonth`,'-', `ivf_batch_master_id`) from ehat_ivf_batch_master where ivf_batch_master_id='"
						+ BatchID + "'";
				Query batchNoQuery1 = sessionFactory.getCurrentSession().createSQLQuery(batchNosql);
				batchNo = (String) batchNoQuery1.uniqueResult();
			}

			ltIvfPatientRecord.get(0).setBatchNo(batchNo);

			String docId = ltIvfPatientRecord.get(0).getDoctorId();

			String sql = "select department from doctor where Doctor_ID='" + docId + "' ";
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			String docDeptId = (String) query1.uniqueResult();

			String sql1 = "select department_name from hospital_departments where idhospital_departments='" + docDeptId
					+ "' ";
			SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			String docDepName = (String) query11.uniqueResult();

			ltIvfPatientRecord.get(0).setDepartmentNameDoc(docDepName);

		} catch (Exception e) {
			e.printStackTrace();
			return lstMainList;
		}
		return lstMainList;
	}

	@Override
	public String allocateBedToIvfPatient(TreatMentBeds obj, String BedAllocStatus, String DallocBedId,
			String billableBedType, String patientType, Integer CoupleId, String BatchNo) {
		String msg = "";

		String s1 = allocBedsNewIvfPatient(obj.getBedId(), obj.getTreatmentId(), BedAllocStatus, DallocBedId,
				obj.getIsolation(), "P", billableBedType, 1, 1, CoupleId, BatchNo);
		msg = s1;
		return msg;
	}

	public synchronized String allocBedsNewIvfPatient(int bedID, int tid, String bedAllocStatus, String dallocBedId,
			String isolation, String patientType, String billableBedType, Integer userId, Integer unitId,
			Integer CoupleId, String BatchNo) {

		java.util.Calendar currentDate = java.util.Calendar.getInstance();

		String msg = "";

		double other_amount = 0.0;
		double other_nur = 0.0;
		String sql = "";
		if (bedAllocStatus.equals("new")) {

			try {

				sql = "select count(Treatment_ID) FROM treatment_beds where (Bed_ID=" + bedID + " or Treatment_ID="
						+ tid + ") and status='Y' and ivf_bed_flag ='Y' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int isBedAllocatedCount = ((Number) countQuery.uniqueResult()).intValue();

				if (isBedAllocatedCount == 0) {

					sql = "SELECT source_type_id FROM ehat_bill_master  where treatment_id=" + tid;

					SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
					int sourceTypeId = (int) q.uniqueResult();

					if (patientType.equals("R")) {

					} else {
						int count = 0;

						/*
						 * String s = "SELECT count(*) FROM ivf_ehat_bill_details" +
						 * " where  service_id=3 and sub_service_id	=" + bedID +
						 * " and on_bed_flag='Y' and treatment_id = "+tid;
						 */
						
						String s = "SELECT count(*) FROM  ehat_bill_details"
								+ " where  service_id=3 and sub_service_id	=" + bedID + " and on_bed_flag='Y' and treatment_id = "+tid;
						
						SQLQuery hquery = sessionFactory.getCurrentSession().createSQLQuery(s);
						count = ((Number) hquery.uniqueResult()).intValue();

						if (count == 0) {

							String sql1 = "update treatment_beds set status='N',ivf_bed_flag ='N',Out_Time=now(),shifted_By="
									+ userId + ",shifted_date_time=now()  where Bed_ID=" + bedID + " and status='Y' ";

							SQLQuery traetquery = sessionFactory.getCurrentSession().createSQLQuery(sql1);
							traetquery.executeUpdate();
						}

						if (count > 0) {
							msg = "This Bed Is Already Allocated For Patient.";
						} else {

							TreatMentBeds obj = new TreatMentBeds();
							String statusy = "Y";

							obj.setBedId(bedID);
							obj.setTreatmentId(tid);
							obj.setStatus(statusy);
							obj.setIn_Time(currentDate.getTime());
							obj.setIsolation(isolation);
							obj.setBedAllocatedFor(patientType);
							obj.setIdBillableBedType(billableBedType);
							obj.setCreatedBy(userId);
							obj.setCreatedDateTime(currentDate.getTime());
							obj.setIvf_bed_flag("Y");

							sessionFactory.getCurrentSession().merge(obj);

							int treatment_beds_id = 0;
							String sqlfor_treatment_beds_id = "";
							sqlfor_treatment_beds_id = "select last_insert_id()";

							SQLQuery qtreat = sessionFactory.getCurrentSession()
									.createSQLQuery(sqlfor_treatment_beds_id);
							treatment_beds_id = ((Number) qtreat.uniqueResult()).intValue();

							String bedr = "";
							String serop = "";
							int corporateAccountId = 0;

							double charges = 0;

							float bedrcharges = 0;

							float serocharges = 0;

							String sql7 = null;
							String leaseRate = "0";
							float lease_per_bed_isolation = 0;
							double nursingCharges = 0.0;

							if (corporateAccountId == 0) {
								// for Non Sponser

								if (Integer.parseInt(billableBedType) == 0) {

									sql = "select lease_per_bed,lease_per_bed_isolation from hall inner join beds on hall.Hall_ID = beds.Hall_ID where beds.Bed_ID ="
											+ bedID;

									SQLQuery queryb = sessionFactory.getCurrentSession().createSQLQuery(sql);
									queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

									List<Map<String, Object>> bedDetails = queryb.list();
									if (bedDetails.size() > 0) {
										for (Map<String, Object> rs : bedDetails) {
											leaseRate = (String) rs.get("lease_per_bed");

											if (isolation.equals("1")) {// isolation
																		// charges
												lease_per_bed_isolation = (Float) rs.get("lease_per_bed_isolation");
												sql7 = "select ifnull((select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
														+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'Y' and beds.Bed_ID = "
														+ bedID + " LIMIT 1),0) as medical_team ";
											} else {// normal nusrsing charge ,
													// Medical team
												sql7 = " select ifnull(( select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
														+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'N' and beds.Bed_ID = "
														+ bedID + " LIMIT 1 ),0) as medical_team ";
											}

											SQLQuery querynurshing = sessionFactory.getCurrentSession()
													.createSQLQuery(sql7);
											
											float nCharges= (float) querynurshing.uniqueResult();
											nursingCharges=nCharges;
											
											//nursingCharges = (double) querynurshing.uniqueResult();
										}
									} else {// if nursing charge not found then
											// default zero
										leaseRate = "0";
										lease_per_bed_isolation = 0;
										nursingCharges = 0;
									}

								} else {
									sql = "select lease_per_bed,lease_per_bed_isolation from hall where Hall_ID ="
											+ billableBedType;

									SQLQuery queryb = sessionFactory.getCurrentSession().createSQLQuery(sql);
									queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

									List<Map<String, Object>> bedDetails = queryb.list();

									if (bedDetails.size() > 0) {
										for (Map<String, Object> rs : bedDetails) {
											leaseRate = (String) rs.get("lease_per_bed");

											if (isolation.equals("1")) {
												lease_per_bed_isolation = (Float) rs.get("lease_per_bed_isolation");
											}
										}
									} else {
										leaseRate = "0";
										lease_per_bed_isolation = 0;
									}
								}

								if (bedr.equals("Y")) {// bedr=N default
									sql = "select bedriddencharges from hospital ";

									SQLQuery querybedri = sessionFactory.getCurrentSession().createSQLQuery(sql);
									bedrcharges = (float) querybedri.uniqueResult();
								}
								if (serop.equals("Y")) {// serop=N default
									sql = "select servocharges from hospital ";

									SQLQuery querybedri = sessionFactory.getCurrentSession().createSQLQuery(sql);
									serocharges = (float) querybedri.uniqueResult();
								}

								nursingCharges = nursingCharges + (int) bedrcharges + (int) serocharges;

								if (isolation.equals("1")) {
									charges = lease_per_bed_isolation;
								} else {
									charges = Double.parseDouble(leaseRate);
								}

								other_amount = charges;
								other_nur = nursingCharges;
								sql = "SELECT bill_id FROM ehat_bill_master where treatment_id=" + tid;

								SQLQuery billidQ = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int biId = ((Number) billidQ.uniqueResult()).intValue();

								sql = "SELECT patient_id FROM ehat_treatment  where treatment_id=" + tid;

								SQLQuery pIdQ = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int pId = ((Number) pIdQ.uniqueResult()).intValue();

								other_amount = charges;
								other_nur = nursingCharges;

								// charges_master_slave_id
								sql = "SELECT charges_master_slave_id FROM ehat_bill_master  where treatment_id=" + tid;

								SQLQuery sponsrLeafQ = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int sponsrLeaf = ((Number) sponsrLeafQ.uniqueResult()).intValue();
								System.out.println(sponsrLeaf);

								sql = "select ifnull((SELECT concat(h.ehat_hallid,'/', ht.ehat_halltype_id) as hidhtypid FROM beds b INNER JOIN hall  h ON b.Hall_ID=h.Hall_ID"
										+ " INNER JOIN hall_type  ht ON h.Htype=ht.idhall_type" + " where b.Bed_ID="
										+ bedID + "),0) as hidhtypid";

								SQLQuery htypidIdQ = sessionFactory.getCurrentSession().createSQLQuery(sql);
								String htypidId = (String) htypidIdQ.uniqueResult();

								String dateSp[] = htypidId.split("/");
								Integer hallId = 0;
								System.err.println("dateSp.length..." + dateSp.length);
								for (int i = 0; i < dateSp.length; i++) {
									hallId = Integer.parseInt(dateSp[i]);
									Double hType = Double.parseDouble(dateSp[i]);
								}

								int chargesId = 1;
								int mainhal = 2;
								int isComServId = 0;
								int isComServlastId = 0;
								int hallleaf = hallId;

								List<ConfigurServicesDto> lts = new ArrayList<ConfigurServicesDto>();
								lts = configServiceService.fetchMedicalTeamCharges(chargesId, sponsrLeaf, mainhal,
										hallleaf, isComServId, isComServlastId);
								double hallcharges = 0.0;
								double medicalteamcharges = 0.0;
								if (lts.size() > 0) {
									hallcharges = lts.get(0).getHallCharges();
									medicalteamcharges = lts.get(0).getMedicalCharges();
									if (hallcharges > -1) {
										other_amount = hallcharges;
									}
									if (medicalteamcharges > -1) {
										other_nur = medicalteamcharges;
									}
								}

								// Emergency Charges code Start

								// check for holiday=today?
								Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
										"select count(*) from hospital_holiday where date=" + todays_date4);

								Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();

								// check for sunday today?
								SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
								String currentDay = dayFormatter.format(currentDate.getTime());

								if (currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTimeNew()) {

									// fetch emergency percentage
									double emrChrPer = getEmergencyPerNew();

									charges = charges * (1 + emrChrPer / 100);

									nursingCharges = nursingCharges * (1 + emrChrPer / 100);

									other_amount = other_amount * (1 + emrChrPer / 100);

									other_nur = other_nur * (1 + emrChrPer / 100);
								}

								// Emergency Charges code End

								// inserting into billing

								sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id=" + tid;

								SQLQuery chargeQ = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int chargesSlaveId = ((Number) chargeQ.uniqueResult()).intValue();

								int sponsorId = 0;
								if (chargesSlaveId > 0) {

									sponsorId = 1;
								}

								// For Bed Charges
								//IvfBillDetailsDto obj1 = new IvfBillDetailsDto();
								BillDetailsDto obj1 = new BillDetailsDto();
								obj1.setAmount(charges);
								obj1.setBillId(biId);
								obj1.setConcession(0.0);
								obj1.setCreatedBy(userId);
								obj1.setDiscount(0.0);
								obj1.setDoctorId(0);
								obj1.setPatienttId(pId);
								obj1.setQuantity(1);
								obj1.setRate(charges);
								obj1.setServiceId(3);
								obj1.setSourceTypeId(sourceTypeId);
								obj1.setSubServiceId(bedID);

								obj1.setUnitId(unitId);
								obj1.setTreatmentId(tid);
								obj1.setCoPay(charges);
								obj1.setPay(0.0);
								obj1.setDepartmentId(2);
								obj1.setOtherAmount(other_amount);
								obj1.setOtherCoPay(0.0);
								obj1.setOtherConcession(0.0);
								obj1.setOtherCoPay(other_amount);
								obj1.setOtherRate(other_amount);
								char c = 'Y';
								obj1.setOnBedFlag("Y");
								obj1.setEmrPer(0.0);
								obj1.setChargesSlaveId(chargesSlaveId);
								obj1.setSponsorId(sponsorId);
								obj1.setCoupleID(CoupleId);
								obj1.setBatchNo(BatchNo);
								obj1.setIvfTreatFlag("Y");

								sessionFactory.getCurrentSession().merge(obj1);

								// For Nursing Charges
								//IvfBillDetailsDto obj2 = new IvfBillDetailsDto();
								BillDetailsDto obj2 = new BillDetailsDto();
								obj2.setAmount(nursingCharges);
								obj2.setBillId(biId);
								obj2.setConcession(0.0);
								obj2.setCreatedBy(userId);
								obj2.setDiscount(0.0);
								obj2.setDoctorId(0);
								obj2.setPatienttId(pId);
								obj2.setQuantity(1);
								obj2.setRate(nursingCharges);
								obj2.setServiceId(3);
								obj2.setSourceTypeId(sourceTypeId);
								obj2.setSubServiceId(0);

								obj2.setUnitId(unitId);
								obj2.setTreatmentId(tid);
								obj2.setCoPay(nursingCharges);
								obj2.setPay(0.0);
								obj2.setDepartmentId(2);
								obj2.setOtherAmount(other_nur);
								obj2.setOtherCoPay(0.0);
								obj2.setOtherConcession(0.0);
								obj2.setOtherCoPay(other_nur);
								obj2.setOtherRate(other_nur);
								char cc = 'Y';
								obj2.setOnBedFlag("Y");
								obj2.setEmrPer(0.0);
								obj2.setChargesSlaveId(chargesSlaveId);
								obj2.setSponsorId(sponsorId);
								obj2.setCoupleID(CoupleId);
								obj2.setBatchNo(BatchNo);
								obj2.setIvfTreatFlag("Y");

								sessionFactory.getCurrentSession().merge(obj2);

							}

							String sql1 = " update beds set idbedstate =3 where Bed_ID =" + bedID;

							SQLQuery qUpdate = sessionFactory.getCurrentSession().createSQLQuery(sql1);
							qUpdate.executeUpdate();

							msg = "Bed Allocated Successfully.";

							ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
							String smsSendNewFlow = (resourceBundle.getObject("smsSendNewFlow").toString());
							if (smsSendNewFlow.equalsIgnoreCase("on")) {

								// sendSMSDoctorCK(tid);

							}
							// registration and consultation entry Starts
							//IvfBillDetailsDto billDetailsIvfDto = new IvfBillDetailsDto();
							BillDetailsDto billDetailsIvfDto = new BillDetailsDto();

							billDetailsIvfDto.setBillDetailsId(0);
							billDetailsIvfDto.setTreatmentId(tid);

							sql = "SELECT * FROM ehat_bill_master where treatment_id =" + tid + " and deleted='N' ";

							SQLQuery queryb = sessionFactory.getCurrentSession().createSQLQuery(sql);
							queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

							List<Map<String, Object>> billMasterList = queryb.list();

							for (Map<String, Object> rs : billMasterList) {
								billDetailsIvfDto.setPatienttId((Integer) rs.get("patient_id"));
								billDetailsIvfDto.setBillId((Integer) rs.get("bill_id"));
								billDetailsIvfDto.setSourceTypeId((Integer) rs.get("source_type_id"));
								billDetailsIvfDto.setDepartmentId((Integer) rs.get("department_id"));
								billDetailsIvfDto.setUnitId((Integer) rs.get("unit_id"));
								billDetailsIvfDto.setSponsorId((Integer) rs.get("source_type_id"));
								billDetailsIvfDto.setChargesSlaveId((Integer) rs.get("charges_master_slave_id"));
								billDetailsIvfDto.setCreatedBy((Integer) rs.get("created_by"));

							}

							String docIdsQuery = "SELECT doctor_id FROM ehat_treatment where deleted='N' and treatment_id="
									+ tid;

							SQLQuery querydoc = sessionFactory.getCurrentSession().createSQLQuery(docIdsQuery);
							String docIdsRes = (String) querydoc.uniqueResult();

							String queryType = "insert";

							String markQuery = "SELECT count(treatment_id) as treatment_count FROM ehat_treatment where t_flag='N'and ivf_treat_flag='N' and patient_id="
									+ billDetailsIvfDto.getPatienttId();

							SQLQuery markQueryQ = sessionFactory.getCurrentSession().createSQLQuery(markQuery);
							Integer treatment_count = ((Number) markQueryQ.uniqueResult()).intValue();

							if (treatment_count > 0) {
								queryType = "markvisit";
							}
							/*
							 * int billDetailsIvfId = IvfService.saveBillDetailsIvf(billDetailsIvfDto,
							 * billDetailsIvfDto.getCreatedBy(), queryType, docIdsRes,CoupleId,BatchNo);
							 * 
							 * System.err.println("heyy==" + billDetailsIvfId);
							 */

							ResourceBundle resourceBundleEhat = ResourceBundle
									.getBundle("EhatEnterpriseConfigurationFile");
							int servId = Integer.parseInt(resourceBundleEhat.getObject("adminServId").toString());
							int subServId = Integer.parseInt(resourceBundleEhat.getObject("adminSubServId").toString());
							if (masterConfigAccess(1, 2, servId)) {

								sql = "SELECT bill_id FROM ehat_bill_master where treatment_id=" + tid;

								SQLQuery q11 = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int biId = ((Number) q11.uniqueResult()).intValue();

								sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id=" + tid;

								SQLQuery charhesq = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int chargesSlaveId = ((Number) charhesq.uniqueResult()).intValue();

								sql = "SELECT patient_id FROM ehat_treatment  where treatment_id=" + tid;

								SQLQuery pidq = sessionFactory.getCurrentSession().createSQLQuery(sql);
								int pId = ((Number) pidq.uniqueResult()).intValue();

								sql = "SELECT charges FROM ehat_subservice where id=" + subServId + "";

								SQLQuery adminq = sessionFactory.getCurrentSession().createSQLQuery(sql);
								double adminCharges = (double) adminq.uniqueResult();

								int sponsorId = 0;
								if (chargesSlaveId > 0) {

									sponsorId = 1;
								}

							}

							/*
							 * sql =
							 * "select ifnull(sum(amount),0) from ivf_ehat_bill_details where treatment_id="
							 * + tid + " and deleted='N' and cancle='N' ";
							 */
							
							sql = "select ifnull(sum(amount),0) from ehat_bill_details where treatment_id=" + tid
									+ " and deleted='N' and cancle='N' ";

							SQLQuery q12 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							double totBill = (double) q12.uniqueResult();

							sql = "update ehat_bill_master set total_bill=" + totBill + " where treatment_id=" + tid;

							SQLQuery q123 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							q123.executeUpdate();

						}

					}

					updateConsultationChargesIpd(tid, "new");

				} else {

					msg = "Bed already allocated to this patient.";
				}
			} catch (Exception e) {
				System.out.println("database error...could not insert: " + e.getMessage());
				e.printStackTrace();
				// transactionManager.rollback(status);
			}

		} else if (bedAllocStatus.equals("old")) {
			try {

				sql = "select count(Treatment_ID) FROM treatment_beds where (Bed_ID=" + bedID + " or Treatment_ID="
						+ tid + ") and status='Y' and ivf_bed_flag = 'Y' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int isBedAllocatedCount = ((Number) countQuery.uniqueResult()).intValue();

				String sqlPhycal = "select ifnull(count(treatment_id),0) as treat_count from ehat_treatment where phydis_flag='Y' and treatment_id="
						+ tid;
				Query sqlPhycalQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlPhycal);
				int countPhysical = ((Number) sqlPhycalQuery.uniqueResult()).intValue();

				if (isBedAllocatedCount == 1 && countPhysical == 0) {

					sql = "SELECT source_type_id FROM ehat_bill_master  where treatment_id=" + tid;

					SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
					int sourceTypeId = ((Number) q.uniqueResult()).intValue();

					if (patientType.equals("R")) {

					} else {

						String s = "select count(*) from treatment_beds where Bed_ID=" + dallocBedId
								+ " and Treatment_ID=" + tid
								+ " and status='Y' and ivf_bed_flag = 'Y' and bedAllocatedFor='P' ";

						SQLQuery qa = sessionFactory.getCurrentSession().createSQLQuery(s);
						int a = ((Number) qa.uniqueResult()).intValue();

						if (a > 0) {
							String sql11 = "update treatment_beds set status='N', ivf_bed_flag = 'N', Out_Time=now(),shifted_By="
									+ userId + ",shifted_date_time=now()  where Bed_ID=" + dallocBedId
									+ " and status='Y'";

							SQLQuery qq = sessionFactory.getCurrentSession().createSQLQuery(sql11);
							qq.executeUpdate();

							String sql1 = "update beds set idbedstate = 2  where Bed_ID =" + dallocBedId;

							SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
							q1.executeUpdate();

							// change current position of bed ie N to that bed of patient
							/*
							 * String ipdBill =
							 * "update ivf_ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id ="
							 * + dallocBedId + " and treatment_id=" + tid;
							 */
							
							String ipdBill = "update ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id ="
									+ dallocBedId + " and treatment_id=" + tid;

							SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(ipdBill);
							q2.executeUpdate();

							// change current position of bed ie N to that bed of patient for nursing

							/*
							 * String ipdBill1 =
							 * "update ivf_ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id = 0 and treatment_id="
							 * + tid;
							 */
							
							String ipdBill1 = "update ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id = 0 and treatment_id="
									+ tid;

							SQLQuery q3 = sessionFactory.getCurrentSession().createSQLQuery(ipdBill1);
							q3.executeUpdate();

							// change current position of bed ie N to that bed of patient
							String sd = "select count(*) from treatment_beds where (Treatment_ID=" + tid + " or Bed_ID="
									+ bedID + ") and status='Y' and ivf_bed_flag = 'Y' and bedAllocatedFor='P'  ";

							SQLQuery q4 = sessionFactory.getCurrentSession().createSQLQuery(sd);
							int count = ((Number) q4.uniqueResult()).intValue();

							if (count > 0) {

								msg = "This Bed Is Already Allocated For Patient.";
							} else {

								String statusy = "Y";

								TreatMentBeds obj = new TreatMentBeds();
								obj.setTreatmentId(tid);
								obj.setBedId(bedID);
								obj.setStatus(statusy);
								obj.setIn_Time(currentDate.getTime());
								obj.setIsolation(isolation);
								obj.setBedAllocatedFor(patientType);
								obj.setIdBillableBedType(billableBedType);

								sessionFactory.getCurrentSession().merge(obj);

								String bedr = "";
								String serop = "";
								int corporateAccountId = 0;

								// Code for changes in ipdbill_bedcharges_table
								double charges = 0;
								float bedrcharges = 0;
								float serocharges = 0;

								String sql7 = null;
								String leaseRate = "0";
								float lease_per_bed_isolation = 0;
								double nursingCharges = 0.0;

								if (corporateAccountId == 0) {
									// for Non Sponser

									if (Integer.parseInt(billableBedType) == 0) {
										sql = "select lease_per_bed,lease_per_bed_isolation from hall inner join beds on hall.Hall_ID = beds.Hall_ID where beds.Bed_ID ="
												+ bedID;

										SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
										query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

										List<Map<String, Object>> bedDetails = query.list();

										if (bedDetails.size() > 0) {

											for (Map<String, Object> rs : bedDetails) {

												leaseRate = (String) rs.get("lease_per_bed");

												if (isolation.equals("1")) {// isolation charges

													lease_per_bed_isolation = (Float) rs.get("lease_per_bed_isolation");
													sql7 = "select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
															+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'Y' and beds.Bed_ID = "
															+ bedID + " limit 1";
												} else {// normal nusrsing charge , Medical team

													sql7 = "select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
															+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'N' and beds.Bed_ID = "
															+ bedID + " limit 1";
												}
												/* nursingCharges = getJdbcTemplate().queryForInt(sql7); */

												SQLQuery query1 = sessionFactory.getCurrentSession()
														.createSQLQuery(sql7);
												nursingCharges = (double) query1.uniqueResult();

											}
										} else {// if nursing charge not found then default zero
											leaseRate = "0";
											lease_per_bed_isolation = 0;
											nursingCharges = 0;
										}
									}

									if (bedr.equals("Y")) {// bedr=N default
										sql = "select bedriddencharges from hospital ";
										SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
										bedrcharges = (float) query1.uniqueResult();
									}
									if (serop.equals("Y")) {// serop=N default
										sql = "select servocharges from hospital ";
										SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
										serocharges = (float) query1.uniqueResult();
									}

									nursingCharges = nursingCharges + (int) bedrcharges + (int) serocharges;

									if (isolation.equals("1")) {
										charges = lease_per_bed_isolation;
									} else {
										charges = Double.parseDouble(leaseRate);
									}

									sql = "SELECT bill_id FROM ehat_bill_master where treatment_id=" + tid;
									SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									int biId = ((Number) query1.uniqueResult()).intValue();

									sql = "SELECT patient_id FROM ehat_treatment  where treatment_id=" + tid;
									SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									int pId = ((Number) query2.uniqueResult()).intValue();

									other_amount = charges;
									other_nur = nursingCharges;

									// charges_master_slave_id
									sql = "SELECT charges_master_slave_id FROM ehat_bill_master  where treatment_id="
											+ tid;

									SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									int sponsrLeaf = ((Number) query3.uniqueResult()).intValue();

									sql = "SELECT concat(h.ehat_hallid,'/', ht.ehat_halltype_id) as hidhtypid FROM beds b INNER JOIN hall  h ON b.Hall_ID=h.Hall_ID"
											+ " INNER JOIN hall_type  ht ON h.Htype=ht.idhall_type where b.Bed_ID="
											+ bedID;

									SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									String htypidId = (String) query4.uniqueResult();

									String dateSp[] = htypidId.split("/");
									Integer hallId = Integer.parseInt(dateSp[0]);
									// Double hType = Double.parseDouble(dateSp[1]);
									int chargesId = 1;
									int mainhal = 2;
									int isComServId = 0;
									int isComServlastId = 0;
									int hallleaf = hallId;

									List<ConfigurServicesDto> lts = new ArrayList<ConfigurServicesDto>();
									lts = configServiceService.fetchMedicalTeamCharges(chargesId, sponsrLeaf, mainhal,
											hallleaf, isComServId, isComServlastId);
									double hallcharges = 0.0;
									double medicalteamcharges = 0.0;
									if (lts.size() > 0) {
										hallcharges = lts.get(0).getHallCharges();
										medicalteamcharges = lts.get(0).getMedicalCharges();
										if (hallcharges > 0) {
											other_amount = hallcharges;
										}
										if (medicalteamcharges > 0) {
											other_nur = medicalteamcharges;
										}
									}

									// Emergency Charges code Start

									// check for holiday=today?
									Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
											"select count(*) from hospital_holiday where date=" + todays_date4);
									Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();

									// check for sunday today?
									SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
									String currentDay = dayFormatter.format(currentDate.getTime());

									if (currentDay.equalsIgnoreCase("Sun") || countHoliday > 0
											|| chkEmergencyTimeNew()) {

										// fetch emergency percentage
										double emrChrPer = getEmergencyPerNew();
										charges = charges * (1 + emrChrPer / 100);
										nursingCharges = nursingCharges * (1 + emrChrPer / 100);
										other_amount = other_amount * (1 + emrChrPer / 100);
										other_nur = other_nur * (1 + emrChrPer / 100);
									}

									// Emergency Charges code End

									// inserting into billing for noble
									sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id="
											+ tid;
									SQLQuery query5 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									int chargesIdd = ((Number) query5.uniqueResult()).intValue();
									int sponsorId = 1;

									BillDetailsIpdDto obj1 = new BillDetailsIpdDto();
									obj1.setAmount(charges);
									obj1.setBillId(biId);
									obj1.setConcession(0.0);
									obj1.setCreatedBy(userId);
									// obj1.setCreatedDateTime(currentDate);
									obj1.setDiscount(0.0);
									obj1.setDoctorId(0);
									obj1.setPatientCatId(0.0);
									obj1.setPatienttId(pId);
									obj1.setQuantity(1);
									obj1.setRate(charges);
									obj1.setServiceId(3);
									obj1.setSourceTypeId(sourceTypeId);
									obj1.setSponsorCatId(0);
									obj1.setSubServiceId(bedID);

									obj1.setUnitId(unitId);
									obj1.setTreatmentId(tid);
									obj1.setCoPay(charges);
									obj1.setPay(0.0);
									obj1.setDepartmentId(2);
									obj1.setOtherAmount(other_amount);
									obj1.setOtherCoPay(0.0);
									obj1.setOtherConcession(0.0);
									obj1.setOtherCoPay(other_amount);
									obj1.setOtherRate(other_amount);
									char c = 'Y';
									obj1.setOnBedFlag(c);
									obj1.setEmrPer(0.0);
									obj1.setChargesSlaveId(chargesIdd);
									obj1.setSponsorId(sponsorId);

									sessionFactory.getCurrentSession().merge(obj1);

									// 'nursing charges

									//IvfBillDetailsDto obj2 = new IvfBillDetailsDto();
									BillDetailsDto obj2 = new BillDetailsDto();
									obj2.setAmount(nursingCharges);
									obj2.setBillId(biId);
									obj2.setConcession(0.0);
									obj2.setCreatedBy(userId);
									// obj1.setCreatedDateTime(currentDate);
									obj2.setDiscount(0.0);
									obj2.setDoctorId(0);
									// obj2.setPatientCatId(0.0);
									obj2.setPatienttId(pId);
									obj2.setQuantity(1);
									obj2.setRate(nursingCharges);
									obj2.setServiceId(3);
									obj2.setSourceTypeId(sourceTypeId);
									// obj2.setSponsorCatId(0);
									obj2.setSubServiceId(bedID);

									obj2.setUnitId(unitId);
									obj2.setTreatmentId(tid);
									obj2.setCoPay(nursingCharges);
									obj2.setPay(0.0);
									obj2.setDepartmentId(2);
									obj2.setOtherAmount(other_nur);
									obj2.setOtherCoPay(0.0);
									obj2.setOtherConcession(0.0);
									obj2.setOtherCoPay(other_nur);
									obj2.setOtherRate(other_nur);
									char cc = 'Y';
									obj2.setOnBedFlag("Y");
									obj2.setEmrPer(0.0);
									obj2.setChargesSlaveId(chargesIdd);
									obj2.setSponsorId(sponsorId);

									sessionFactory.getCurrentSession().merge(obj2);

								}
								sql = " update beds set idbedstate =3 where Bed_ID =" + bedID;

								SQLQuery qbeds = sessionFactory.getCurrentSession().createSQLQuery(sql);
								qbeds.executeUpdate();

								msg = "Bed Shifted Successfully.";
							}
						} else {
							msg = "This Bed Is Already Allocated This Patient.";
						}
					}

					updateConsultationChargesIpd(tid, "markvisit");

				} else {

					msg = "Bed already occupied..select another bed";
				}
			} catch (Exception e) {

				System.out.println("database error...could not insert: " + e.getMessage());
				e.printStackTrace();
			}
		}
		return msg;

	}

	public boolean chkEmergencyTimeNew() {
		// private DateFormat sdf = new SimpleDateFormat("HH");
		boolean emergencyFlag = false;
		try {
			DateFormat sdf = new SimpleDateFormat("HH");
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
			String todays_time = formatter1.format(currentDate.getTime());

			DateFormat sdf2 = new SimpleDateFormat("mm");

			int fromTime = 0;
			int toTime = 0;

			String sql = "select emergencyAdmissionFromTime,emergencyAdmissionToTime from hospitalaccinfo";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> details = query.list();

			// List<Map<String, Object>> details = getJdbcTemplate().queryForList(sql);

			// current time from system
			// sdf is an object of simple date format which takes only hours from the
			// time("HH")

			int min = Integer.parseInt(sdf2.format(Time.valueOf(todays_time)).toLowerCase());

			int inTime = Integer.parseInt(sdf.format(Time.valueOf(todays_time)).toLowerCase());
			// int inTime2=inTime+min;

			for (Map<String, Object> row : details) {

				// assigning (fromTime & toTime)Time values from table into sdf("HH") hours
				fromTime = Integer.parseInt(sdf.format((Time) row.get("emergencyAdmissionFromTime")).toLowerCase());
				toTime = Integer.parseInt(sdf.format((Time) row.get("emergencyAdmissionToTime")).toLowerCase());

			}

			// business logic for registration charges.
			if ((fromTime > toTime) && (inTime >= fromTime || inTime <= toTime)) {
				if (inTime == toTime && min > 0) {
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else if (fromTime < toTime && (inTime >= fromTime && inTime <= toTime)) {
				if (inTime == toTime && min > 0) {
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else {
				emergencyFlag = false;
			}
			return emergencyFlag;
		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :" + new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : " + new Exception().getStackTrace()[0].getMethodName() + " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return emergencyFlag;
		}

	}

	public double getEmergencyPerNew() {
		double a = 0;
		try {
			Query emerChr = sessionFactory.getCurrentSession()
					.createSQLQuery("select emrChrPer from hospitalaccinfo where idhospitalAccInfo=1");

			a = (Double) emerChr.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :" + new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : " + new Exception().getStackTrace()[0].getMethodName() + " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return a;
		}
		return a;
	}

	public boolean masterConfigAccess(int unitId, int deptId, int serviceId) {

		String sql = "SELECT count(*) FROM ehat_master_config where deleted='N' and unit_id=" + unitId + " and"
				+ " dept_id=" + deptId + " and service_id=" + serviceId + " ";

		SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
		Integer count = ((Number) q.uniqueResult()).intValue();

		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}

	int updateConsultationChargesIpd(int tid, String callFrom) {
		String sql = "";

		try {
			sql = "SELECT patient_id FROM ehat_treatment where treatment_id=" + tid;

			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int patientId = (int) q.uniqueResult();

			sql = "SELECT count(treatment_id) FROM ehat_treatment where patient_id=" + patientId;

			SQLQuery qq = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int trCount = ((Number) qq.uniqueResult()).intValue();
			if (trCount > 1) {
				callFrom = "markvisit";
			} else {
				callFrom = "new";
			}

			sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id=" + tid;

			SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int chargesSlaveId = ((Number) q1.uniqueResult()).intValue();

			String sqlHallId = "select h.Htype from hall h,treatment_beds tb,beds b where tb.Bed_ID = b.Bed_ID and b.Hall_ID = h.Hall_ID and tb.Treatment_ID ="
					+ tid + "  and tb.status = 'Y' and tb.bedAllocatedFor = 'P' ";

			SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(sqlHallId);
			String hId1 = (String) q2.uniqueResult();
			int hId = Integer.parseInt(hId1);
			// int hId = ((Number) q2.uniqueResult()).intValue();

			sqlHallId = "SELECT ifnull(ehat_halltype_id,0) as htypeId FROM hall_type where idhall_type = " + hId;

			SQLQuery q3 = sessionFactory.getCurrentSession().createSQLQuery(sqlHallId);
			int trHallId = ((Number) q3.uniqueResult()).intValue();

			sqlHallId = "select doctor_id from ehat_treatment where treatment_id =" + tid
					+ " and t_flag = 'Y' and deleted = 'N' ";

			SQLQuery q4 = sessionFactory.getCurrentSession().createSQLQuery(sqlHallId);
			String doctorIdList = (String) q4.uniqueResult();

			String conChargesQuery = "";
			if (!doctorIdList.equalsIgnoreCase("") && !doctorIdList.equalsIgnoreCase(null)) {

				String[] ary = doctorIdList.split(",");
				for (int i = 0; i < ary.length; i++) {

					int docId = Integer.parseInt(ary[i]);

					// For week day consultation charges
					if (chargesSlaveId > 0) {

						conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
								+ docId + " and sponserslave_id = " + chargesSlaveId + " and hallslave_id = " + trHallId
								+ " and drflag = 'S' and deleted = 'N'";

					} else {

						conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
								+ docId + " and hallslave_id = " + trHallId + " and drflag = 'H' and deleted = 'N'";
					}

					// For weekend consultation charges
					SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
					String currentDay = dayFormatter.format(currentDate.getTime());

					if (currentDay.equalsIgnoreCase("Sun")) {

						if (chargesSlaveId > 0) {

							conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
									+ docId + " and sponserslave_id = " + chargesSlaveId + " and hallslave_id = "
									+ trHallId + " and drflag = 'S' and deleted = 'N'";

						} else {

							conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
									+ docId + " and hallslave_id = " + trHallId + " and drflag = 'H' and deleted = 'N'";
						}
					}

					if (callFrom.equals("markvisit")) {

						// fetch doctor_followup_days from hospital table
						String ss = "SELECT doctor_followup_days as doctor_followup_days FROM hospital";

						SQLQuery qfolloup = sessionFactory.getCurrentSession().createSQLQuery(ss);
						Integer doctorFollowupDays = (Integer) qfolloup.uniqueResult();

						// fetch last treatment date
						ss = "SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "
								+ patientId + " AND t_flag = 'N' > 0)"
								+ " THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="
								+ patientId
								+ " AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ";

						SQLQuery lasttreat = sessionFactory.getCurrentSession().createSQLQuery(ss);
						Date lastTreatmentDate = (Date) lasttreat.uniqueResult();

						// calculate difference between last treatment and current treatment
						long differenceDays = getDifferenceDays(lastTreatmentDate,
								new Date(new java.util.Date().getTime()));

						// if diff is less than or equals followup days then apply followup charges
						if (differenceDays <= doctorFollowupDays) {

							if (currentDay.equalsIgnoreCase("Sun")) {// only for shraddha

								if (chargesSlaveId > 0) {

									conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
											+ docId + " and sponserslave_id = " + chargesSlaveId
											+ " and hallslave_id = " + trHallId + " and drflag = 'S' and deleted = 'N'";

								} else {

									conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
											+ docId + " and hallslave_id = " + trHallId
											+ " and drflag = 'H' and deleted = 'N'";
								}
							} else {

								if (chargesSlaveId > 0) {

									conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
											+ docId + " and sponserslave_id = " + chargesSlaveId
											+ " and hallslave_id = " + trHallId + " and drflag = 'S' and deleted = 'N'";

								} else {

									conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "
											+ docId + " and hallslave_id = " + trHallId
											+ " and drflag = 'H' and deleted = 'N'";
								}
							}
						}
					}
					double constCharges = 0;
					String sqlC = "";
					if (chargesSlaveId > 0) {

						sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = " + docId
								+ " and sponserslave_id = " + chargesSlaveId + " and hallslave_id = " + trHallId
								+ " and drflag = 'S' and deleted = 'N'";
					} else {

						sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = " + docId
								+ " and hallslave_id = " + trHallId + " and drflag = 'H' and deleted = 'N'";
					}

					SQLQuery qc = sessionFactory.getCurrentSession().createSQLQuery(sqlC);
					int countDr = ((Number) qc.uniqueResult()).intValue();

					if (countDr > 0) {

						SQLQuery constChargesQ = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
						constCharges = (double) constChargesQ.uniqueResult();

					} else {

						constCharges = 0;
					}

					String sqlUpdate = "update ehat_bill_details_ipd set rate=" + constCharges + ",amount="
							+ constCharges + ",co_pay=" + constCharges + ",pay=" + constCharges + ",other_co_pay="
							+ constCharges + ",other_pay=" + constCharges + ",other_rate=" + constCharges
							+ ", other_amount=" + constCharges + " where doctor_id=" + docId
							+ " and service_id=2 and treatment_id=" + tid;

					SQLQuery sqlUpdateq = sessionFactory.getCurrentSession().createSQLQuery(sqlUpdate);
					sqlUpdateq.executeUpdate();
				}
			}
		} catch (Exception e) {

			e.printStackTrace();
		}

		return 1;

	}

	// Used in registration functions
	public static long getDifferenceDays(Date d1, Date d2) {
		if (d1.equals(null)) {
			d1 = new Date(new java.util.Date().getTime());
		}
		if (d2.equals(null)) {
			d2 = new Date(new java.util.Date().getTime());
		}
		long diff = d2.getTime() - d1.getTime();
		// System.err.println("days in diff=="+TimeUnit.DAYS.convert(diff,
		// TimeUnit.MILLISECONDS));
		return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
	}

	public boolean chkEmergencyTime() {
		// private DateFormat sdf = new SimpleDateFormat("HH");
		boolean emergencyFlag = false;
		try {
			DateFormat sdf = new SimpleDateFormat("HH");
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
			String todays_time = formatter1.format(currentDate.getTime());

			DateFormat sdf2 = new SimpleDateFormat("mm");

			int fromTime = 0;
			int toTime = 0;

			String sql = "select emergencyAdmissionFromTime,emergencyAdmissionToTime from hospitalaccinfo";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> details = query.list();

			// List<Map<String, Object>> details = getJdbcTemplate().queryForList(sql);

			// current time from system
			// sdf is an object of simple date format which takes only hours from the
			// time("HH")

			int min = Integer.parseInt(sdf2.format(Time.valueOf(todays_time)).toLowerCase());

			int inTime = Integer.parseInt(sdf.format(Time.valueOf(todays_time)).toLowerCase());
			// int inTime2=inTime+min;

			for (Map<String, Object> row : details) {

				// assigning (fromTime & toTime)Time values from table into sdf("HH") hours
				fromTime = Integer.parseInt(sdf.format((Time) row.get("emergencyAdmissionFromTime")).toLowerCase());
				toTime = Integer.parseInt(sdf.format((Time) row.get("emergencyAdmissionToTime")).toLowerCase());

			}

			// business logic for registration charges.
			if ((fromTime > toTime) && (inTime >= fromTime || inTime <= toTime)) {
				if (inTime == toTime && min > 0) {
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else if (fromTime < toTime && (inTime >= fromTime && inTime <= toTime)) {
				if (inTime == toTime && min > 0) {
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else {
				emergencyFlag = false;
			}
			return emergencyFlag;
		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :" + new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : " + new Exception().getStackTrace()[0].getMethodName() + " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return emergencyFlag;
		}

	}

	public double getEmergencyPer() {
		double a = 0;
		try {
			Query emerChr = sessionFactory.getCurrentSession()
					.createSQLQuery("select emrChrPer from hospitalaccinfo where idhospitalAccInfo=1");

			a = (Double) emerChr.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :" + new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : " + new Exception().getStackTrace()[0].getMethodName() + " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return a;
		}
		return a;
	}

	@Override
	public List<TreatmentBeds> getIVFBillable(Integer treatmentId) {

		Integer bedId = 0;
		Integer billableBedType = 0;
		String sql = "";
		sql = " select Bed_ID,idBillableBedType from treatment_beds where Treatment_ID=" + treatmentId
				+ " and status='Y' AND bedAllocatedFor='P'";
		Query ltBedsResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		ltBedsResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> treatBedlist = ltBedsResQuery.list();
		for (Map<String, Object> row : treatBedlist) {

			bedId = (Integer) row.get("Bed_ID");
			billableBedType = (Integer) row.get("idBillableBedType");
		}

		if (treatBedlist.size() == 0) {
			sql = " select Bed_ID,idBillableBedType from treatment_beds where Treatment_ID=" + treatmentId
					+ " and status='Y' AND bedAllocatedFor='P'";

			Query ltPatBedsResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			ltPatBedsResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> PatTreatBedlist = ltPatBedsResQuery.list();
			for (Map<String, Object> row1 : PatTreatBedlist) {

				bedId = (Integer) row1.get("Bed_ID");
				billableBedType = (Integer) row1.get("idBillableBedType");
			}
		}

		String billableHallType = "0";
		sql = " select Htype from hall where Hall_ID=" + billableBedType;
		Query ltBedsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		ltBedsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> Bedlist = ltBedsQuery.list();
		for (Map<String, Object> row2 : Bedlist) {

			billableHallType = (String) row2.get("Htype");
		}

		Integer bedType = 0;
		sql = " select Hall_ID from beds where Bed_ID=" + bedId;
		Query ltBeds = sessionFactory.getCurrentSession().createSQLQuery(sql);
		ltBeds.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> Bedlist1 = ltBeds.list();
		for (Map<String, Object> row3 : Bedlist1) {

			bedType = (Integer) row3.get("Hall_ID");
		}

		String hallType = "0";
		sql = " select Htype from hall where Hall_ID=" + bedType;
		Query ltHall = sessionFactory.getCurrentSession().createSQLQuery(sql);
		ltHall.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> Halllist1 = ltHall.list();
		for (Map<String, Object> row4 : Halllist1) {

			hallType = (String) row4.get("Htype");
		}

		TreatmentBeds objTreatmentBeds = new TreatmentBeds();
		objTreatmentBeds.setBed_type(bedType.toString());
		objTreatmentBeds.setHallType(hallType);
		objTreatmentBeds.setIdBillableBedType(billableBedType.toString());
		objTreatmentBeds.setIdBillableHallName(billableHallType);

		List<TreatmentBeds> objList = new ArrayList<TreatmentBeds>();
		objList.add(objTreatmentBeds);
		return objList;
	}

	@Override
	public List<Hall> getIVFHallDetails(Integer hallID, Integer unitId) {

		List<Hall> arrDefaultHall = new ArrayList<Hall>();

		String sql = "";
		try {

			if (hallID.equals("allBed")) {
				sql = "select * from hall where status='Y' and unit_id= " + unitId + " order by Htype";
			} else if (hallID.equals("allHallBed")) {
				sql = "select * from hall where status='Y' and unit_id= " + unitId + " order by Htype";
			} else {
				sql = "select * from hall where status='Y' and unit_id= " + unitId + " and Hall_ID= " + hallID;
			}

			SQLQuery queryb = sessionFactory.getCurrentSession().createSQLQuery(sql);
			queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> billMasterList = queryb.list();
			Hall objhallDetails = new Hall();
			List<Beds> arrDefaultBed = new ArrayList<Beds>();
			for (Map<String, Object> rs : billMasterList) {
				objhallDetails.setHall_ID((Integer) rs.get("Hall_ID"));
				objhallDetails.setHname((String) rs.get("Hname"));
				objhallDetails.setHtype((String) rs.get("Htype"));
				String htypeid = (String) rs.get("Htype");
				objhallDetails.setHtypeName(findHallTypeNameById(htypeid));
				objhallDetails.setNumber_of_Beds((String) rs.get("Number_of_Beds"));
				objhallDetails.setAvailable_Beds((String) rs.get("Available_Beds"));
				objhallDetails.setLease((String) rs.get("lease_per_bed"));

				sql = "SELECT b.*,tb.Treatment_ID,tb.isolation, tb.bedAllocatedFor, tb.In_Time"
						+ " FROM beds b  left join treatment_beds tb ON b.Bed_ID=tb.Bed_ID and tb.status != 'N' and  tb.Treatment_ID is not null"
						+ " WHERE  b.status = 'Y'  and b.Hall_ID=" + objhallDetails.getHall_ID();

				SQLQuery queryb1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> hallMasterList = queryb1.list();
				com.hms.administrator.dto.Beds objBedDetails = new com.hms.administrator.dto.Beds();
				for (Map rs1 : hallMasterList) {
					objBedDetails.setBed_ID((Integer) rs1.get("Bed_ID"));
					objBedDetails.setBed_name((String) rs1.get("bed_name"));
					objBedDetails.setStatus((String) rs1.get("status"));
					objBedDetails.setAvailability(((Integer) rs1.get("idbedstate")).toString());
					objBedDetails.setIsolation((String) rs1.get("isolation"));

					// used ternary operator

					try {
						objBedDetails.setInDateTime(
								(rs1.get("In_Time") == null) ? ("") : (((Timestamp) rs1.get("In_Time")).toString()));
					} catch (Exception e) {
						objBedDetails.setInDateTime("");
					}

					if (((Integer) rs1.get("Treatment_ID")) != null && !hallID.equals("allHallBed")) {

						objBedDetails.setTreatment_ID((Integer) rs1.get("Treatment_ID"));

						String bedAllocatedFor = (String) rs1.get("bedAllocatedFor");

						List<Patient> pat = fetchIVFPatList((Integer) rs1.get("Treatment_ID"), bedAllocatedFor);
						// System.out.println(pat);
						//objBedDetails.setPatList(pat);
					}

					arrDefaultBed.add(objBedDetails);
					objhallDetails.setBedList(arrDefaultBed);
				}

				arrDefaultHall.add(objhallDetails);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return arrDefaultHall;
	}

	public String findHallTypeNameById(String htypeid) {

		String hTNM = "";
		String sql3 = "select hall_type_name from hall_type where idhall_type =" + htypeid + " ";
		SQLQuery gethallType = sessionFactory.getCurrentSession().createSQLQuery(sql3);
		gethallType.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> lsthallType = gethallType.list();

		for (Map<String, Object> row : lsthallType) {

			hTNM = (String) row.get("hall_type_name");
		}
		return hTNM;
	}

	private List<Patient> fetchIVFPatList(Integer treatId, String bedAllocatedFor) {
		List arrPat = null;

		String sql = "SELECT ehat_patient.patient_id as patient_id, ehat_patient.f_name as fName,ehat_patient.m_name as mName, "
				+ " ehat_patient.l_name as lName, ehat_patient.mrnno as mr_no, ehat_patient.prefix as title,"
				+ " date(ehat_patient.created_date_time) as reg_date, ehat_patient.age, ehat_patient.gender as sex, date(ehat_treatment.updated_date_time) as TendDate,"
				+ " DATEDIFF(now(), ehat_treatment.created_date_time) as admitedDays, ehat_treatment.doctor_id as doctor_id, ifnull(ehat_bill_master.source_type_id,0) as source_type_id,"
				+ " ehat_bill_master.charges_master_slave_id as charges_master_slave_id, ehat_charges_master_slave.category_name as category_name"

				+ " FROM ehat_treatment left join ehat_patient ON (ehat_treatment.patient_id = ehat_patient.patient_id)"
				+ " left join ehat_bill_master ON(ehat_treatment.treatment_id=ehat_bill_master.treatment_id)	left join ehat_charges_master_slave ON (ehat_bill_master.charges_master_slave_id = ehat_charges_master_slave.id)"
				+ " where ehat_treatment.treatment_id =" + treatId;

		SQLQuery getPatDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getPatDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> lstPatDetails = getPatDetails.list();

		arrPat = fetchIVFPatDetails(lstPatDetails, bedAllocatedFor);

		return arrPat;

	}

	private List fetchIVFPatDetails(List<Map<String, Object>> lstPatDetails, String bedAllocatedFor) {
		List<Patient> arrPat = new ArrayList<Patient>();
		for (Map row : lstPatDetails) {

			Patient objPat = new Patient();
			objPat.setTitle((String) row.get("title"));
			objPat.setfName((String) row.get("fName"));
			objPat.setmName((String) row.get("mName"));
			objPat.setlName((String) row.get("lName"));
			objPat.setRegDate(row.get("reg_date").toString());
			// objPat.setMrNo("IPD/000/001-D");//now static->
			objPat.setMrNo((String) row.get("mr_no"));
			objPat.setAge(row.get("age").toString());
			objPat.setSex((String) row.get("sex"));
			objPat.setPatient_ID((Integer) row.get("patient_id"));
			objPat.setAdmitedDays(((Long) row.get("admitedDays")).intValue());
			objPat.setSourceTypeId(((Long) row.get("source_type_id")).intValue());
			objPat.setSponsorName((String) row.get("category_name"));
			String docIDs = (String) row.get("doctor_id");

			if (docIDs.equalsIgnoreCase("") || docIDs.equalsIgnoreCase("0")) {
				objPat.setDocName("-");
			} else {
				String sql = "SELECT  ifnull(GROUP_CONCAT(doc_name SEPARATOR ', '),'') as docname"
						+ " FROM doctor where Doctor_ID in(" + docIDs + ")";
				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				String docName = (String) query.uniqueResult();
				objPat.setDocName(docName);

			}

			TreatmentBeds objTB = new TreatmentBeds();
			objTB.setBedAllocatedFor(bedAllocatedFor);

			Treatment objTreatment = new Treatment();

			objTreatment.setSpecialDiscount(0);// Static Beacuse no data

			Query q = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT count(*) FROM sp_dic_master where sp_dic_master_id=" + objTreatment.getSpecialDiscount());
			Integer count = ((Number) q.uniqueResult()).intValue();
			String insuranceCmpny = "Self Pay";

			if (count > 0) {
				String sql = "SELECT name FROM sp_dic_master where sp_dic_master_id="
						+ objTreatment.getSpecialDiscount();
				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				insuranceCmpny = (String) query.uniqueResult();
			}

			objTreatment.setInsuranceCmpny(insuranceCmpny);
			objPat.setObjTreatment(objTreatment);
			objPat.setObjTreatmentBeds(objTB);
			arrPat.add(objPat);
		}

		return arrPat;
	}

	@Override
	public int cancelAdmissionOfIvfPatient(TreatmentDto treatmentDto, HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		try {
			String sql = "update ehat_treatment set ivf_treat_flag= 'N' , adm_cancel_flag='Y', admsn_can_date_time=now(), admsn_canceled_by="
					+ userId + ", cancel_narration='" + treatmentDto.getCancelNarration() + "' where treatment_id= "
					+ treatmentDto.getTreatmentId() + " and patient_id= " + treatmentDto.getPatientId();

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		try {
			String sql = "update ehat_ivf_treatment set ivf_status= 'N' , adm_cancel_flag='Y', admsn_can_date_time=now(), admsn_canceled_by="
					+ userId + ", cancel_narration='" + treatmentDto.getCancelNarration() + "' where treatment_id= "
					+ treatmentDto.getTreatmentId() + " and patient_id= " + treatmentDto.getPatientId()
					+ " and ivf_treat_id= " + treatmentDto.getIvfTreatID();

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	
	@Override
	public String deallocateBedToIvfPatient(Integer treatmentId,Integer userId) {
		String msg = "";

		String s = "select count(*) from treatment_beds where Treatment_ID=" + treatmentId
				      + " and status='Y' and ivf_bed_flag = 'Y' and bedAllocatedFor='P' ";
        SQLQuery qa = sessionFactory.getCurrentSession().createSQLQuery(s);
		int a = ((Number) qa.uniqueResult()).intValue();
		

		if (a > 0) {
			
			String BedIdSql = "select Bed_ID from treatment_beds where Treatment_ID=" + treatmentId
				      + " and status='Y' and ivf_bed_flag = 'Y' and bedAllocatedFor='P' ";
	       SQLQuery BedIdQuery = sessionFactory.getCurrentSession().createSQLQuery(BedIdSql);
		    int BedId = ((Number) BedIdQuery.uniqueResult()).intValue();
			
			String sql11 = "update treatment_beds set status='N', ivf_bed_flag = 'N', Out_Time=now(),closed_By="
					+ userId + ",closed_date_time=now()  where Bed_ID=" + BedId;

			SQLQuery qq = sessionFactory.getCurrentSession().createSQLQuery(sql11);
			qq.executeUpdate();

			String sql1 = "update beds set idbedstate = 2  where Bed_ID =" + BedId;

			SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			q1.executeUpdate();

			// change current position of bed ie N to that bed of patient
			/*
			 * String ipdBill =
			 * "update ivf_ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id ="
			 * + BedId + " and treatment_id=" + treatmentId;
			 */
			
			String ipdBill = "update ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id ="
					+ BedId + " and treatment_id=" + treatmentId;

			SQLQuery q2 = sessionFactory.getCurrentSession().createSQLQuery(ipdBill);
			q2.executeUpdate();

			// change current position of bed ie N to that bed of patient for nursing

			/*
			 * String ipdBill1 =
			 * "update ivf_ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id = 0 and treatment_id="
			 * + treatmentId;
			 */
			
			String ipdBill1 = "update ehat_bill_details set on_bed_flag ='N' where service_id=3 and sub_service_id = 0 and treatment_id="
					+ treatmentId;

			SQLQuery q3 = sessionFactory.getCurrentSession().createSQLQuery(ipdBill1);
			q3.executeUpdate();

			// change current position of bed ie N to that bed of patient
			String sd = "select count(*) from treatment_beds where (Treatment_ID=" + treatmentId + " or Bed_ID="
					+ BedId + ") and status='Y' and ivf_bed_flag = 'Y' and bedAllocatedFor='P'  ";

			SQLQuery q4 = sessionFactory.getCurrentSession().createSQLQuery(sd);
			int count = ((Number) q4.uniqueResult()).intValue();

			if (count == 0) {

				msg = "Bed is Deallocated ...";
			} else {
				msg = "Oops some Problem...";
			}
		}else {
			msg = "Bed has not allocated for This Patient...";
		}
	
		return msg;
	}
	
	@Override
	public int checkCoupledOrNot(String gender, Integer patientId,HttpServletRequest request) {
		
		String coupleCount = "";
		try {
			
			coupleCount = "SELECT COUNT(*) FROM ehat_ivf_couple couple,ehat_ivf_treatment treat WHERE treat.ivf_status = 'Y' And";
			
			if(gender.equalsIgnoreCase("male")) {
				coupleCount = coupleCount + " couple.male_patient_id = treat.patient_id And couple.male_patient_id = "+ patientId;
	        }else {
				coupleCount = coupleCount + " couple.female_patient_id = treat.patient_id And couple.female_patient_id = "+ patientId;
	        }
			
			 System.err.println("coupleCount-----------"+coupleCount);
			 Query coupleCount1 = sessionFactory.getCurrentSession()
                     .createSQLQuery(coupleCount);
			 int  CountCouple = ((Number) coupleCount1.uniqueResult()).intValue();
			 
			 System.err.println("CountCouple-----------"+CountCouple);
			
			if(CountCouple == 1) {
				return 1;
			}else {
				return 0;
			}
			

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public IvfPatientInfo getIvfPatientInfoByPatientId(Integer patientId,Integer unitId) {

		List<IvfPatientInfo> lstIvfPatientInfo = new ArrayList<IvfPatientInfo>();
		IvfPatientInfo obj = new IvfPatientInfo();
		
		try {
			Query q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_patient_info_ivf(:unitId,:patientId,:departmentId)");
			q.setParameter("unitId", unitId);
			q.setParameter("patientId", patientId);
			q.setParameter("departmentId", null);
			q.setResultTransformer(Transformers.aliasToBean(IvfPatientInfo.class));
			//obj = (OpdPatientDetailsDto) q.uniqueResult();
			lstIvfPatientInfo = q.list();
			obj.setLstIvfPatientInfo(lstIvfPatientInfo);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
}
