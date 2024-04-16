package com.hms.doctordesk.dao.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dao.OpdServicesAdvisedDao;
import com.hms.ehat.controller.CpoeIPDdetails;
import com.hms.ehat.controller.OTPercentageDTO;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabRequestSlaveDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ipdbill.dao.IpdBillDao;
import com.hms.ipdbill.daoImpl.IpdBillDaoImpl;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.ServicewiseBillDTO;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.ApplicationContextUtils;

@Repository
@SuppressWarnings("unchecked")
public class OpdServicesAdvisedDaoImpl implements OpdServicesAdvisedDao {

	@Autowired
	SessionFactory sessionfactory;

	@Autowired
	IpdBillDao ipdBillDaoImpl;
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	static Logger log = Logger.getLogger(OpdServicesAdvisedDaoImpl.class.getName());

	@Override
	public int saveOpdServicesAdvised(BillDetailsDto billDetailsDto, String queryType) {
		// TODO Auto-generated method stub

		String radId = resourceBundleEhat.getObject("radiationId").toString();
		int radiationId = Integer.parseInt(radId);
		int records = 0;
		try {

			int treatmentId = billDetailsDto.getTreatmentId();
			int patientId = billDetailsDto.getPatienttId();
			int sponsorid = billDetailsDto.getSponsorId();
			int chargesSid = billDetailsDto.getChargesSlaveId();
			String receiptOf = billDetailsDto.getReceiptOf();
			int subserviceid = 0;
			double charges = 0.0;
			double calDec = 0;
			double copycalc = 0;
			int recSlaveId = billDetailsDto.getRecSlaveId();
			subserviceid = billDetailsDto.getSubServiceId();
			int billDetailsId = billDetailsDto.getBillDetailsId();
			if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("sponsor") && recSlaveId > 0
					&& subserviceid != -1) {

				// GETTING CHARGES OF SERVICE
				SubServiceDto subsobj = (SubServiceDto) sessionfactory.getCurrentSession().get(SubServiceDto.class,
						subserviceid);
				charges = subsobj.getCharges();
				billDetailsDto.setRate(charges);

				charges = charges * billDetailsDto.getQuantity();

				calDec = (charges * billDetailsDto.getConcessionOnPerc() / 100);
				copycalc = charges - calDec;

				billDetailsDto.setConcession(calDec);
				billDetailsDto.setAmount(charges);
				billDetailsDto.setCoPay(copycalc);

			} else if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("general") && recSlaveId > 0
					&& subserviceid != -1) {
				int iscomser = 0;
				int iscomserl = 0;
				int hallId = 0;
				int hallSlaveId = 0;
				subserviceid = billDetailsDto.getSubServiceId();

				// GETTING CHARGES OF SERVICE
				String query1 = "SELECT ifnull(charges, 0) FROM ehat_configuration_services where charges_id="
						+ sponsorid + " and chargesSlave_id=" + chargesSid + " and is_com_servId=" + iscomser
						+ " and is_com_servlastId=" + iscomserl + " and hall_id=" + hallId + " and hallSlave_id="
						+ hallSlaveId + " and service_id=" + subserviceid + " and deleted='N'";

				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(query1);
				charges = (Double) query.uniqueResult();
				billDetailsDto.setOtherRate(charges);

				if (charges > 0) {
					charges = charges * billDetailsDto.getQuantity();

					calDec = (charges * billDetailsDto.getConcessionOnPerc() / 100);
					copycalc = charges - calDec;
				} else {
					charges = billDetailsDto.getOtherRate() * billDetailsDto.getQuantity();

					calDec = (charges * billDetailsDto.getConcessionOnPerc() / 100);
					copycalc = charges - calDec;
				}

				billDetailsDto.setOtherConcession(calDec);
				billDetailsDto.setOtherAmount(charges);
				billDetailsDto.setOtherPay(copycalc);

			}

			boolean radExist = false;

			List<BillDetailsDto> listCheck = new ArrayList<BillDetailsDto>();
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(BillDetailsDto.class);
			criteria.add(Restrictions.eq("serviceId", radiationId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", billDetailsDto.getTreatmentId()));
			criteria.add(Restrictions.eq("subServiceId", billDetailsDto.getSubServiceId()));
			listCheck = criteria.list();
			if (listCheck.size() > 0) {
				radExist = true;
				records = 21;
			}

			if (radExist == false || queryType.equalsIgnoreCase("update")) {

				// FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT END
				sessionfactory.getCurrentSession().merge(billDetailsDto);

				Criteria criteriaRec = sessionfactory.getCurrentSession().createCriteria(ServicewiseBillDTO.class);
				criteriaRec.add(Restrictions.eq("treatId", billDetailsDto.getTreatmentId()));
				criteriaRec.add(Restrictions.eq("patientId", billDetailsDto.getPatienttId()));
				criteriaRec.add(Restrictions.eq("serviceId", billDetailsDto.getServiceId()));
				criteriaRec.add(Restrictions.eq("unitId", billDetailsDto.getUnitId()));
				criteriaRec.add(Restrictions.eq("deptId", billDetailsDto.getDepartmentId()));
				criteriaRec.setProjection(Projections.rowCount());
				long count = (Long) criteriaRec.uniqueResult();
				if (count == 0) {

					Criteria criteriaMax = sessionfactory.getCurrentSession().createCriteria(BillDetailsDto.class);
					criteriaMax.setProjection(Projections.max("billDetailsId"));
					Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();

					ServicewiseBillDTO obj = new ServicewiseBillDTO();
					obj.setBillMasterId(billDetailsDto.getBillId());
					obj.setBillDetailsId(maxBillDetailsId);
					obj.setUnitId(billDetailsDto.getUnitId());
					obj.setPatientId(billDetailsDto.getPatienttId());
					obj.setDeptId(billDetailsDto.getDepartmentId());
					obj.setTreatId(billDetailsDto.getTreatmentId());
					obj.setServiceId(billDetailsDto.getServiceId());
					obj.setCreatedBy(billDetailsDto.getCreatedBy());
					obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());

					sessionfactory.getCurrentSession().merge(obj);
				}
			}

			if (billDetailsId > 0) {

				SubServiceDto subsobj = (SubServiceDto) sessionfactory.getCurrentSession().get(SubServiceDto.class,
						subserviceid);
				String isCombination = subsobj.getIscombination();
				if (isCombination.equals("Y")) {
					Query update = sessionfactory.getCurrentSession().createQuery(
							"update EhatOtherBillDetailForOpdDto set doctorId = :doctorId where billDetailsId= :billDetailsId  and subServiceId= :subServiceId and deleted='N' ");

					update.setParameter("doctorId", billDetailsDto.getDoctorId());
					update.setParameter("billDetailsId", billDetailsId);
					update.setParameter("subServiceId", subserviceid);

					update.executeUpdate();
				}
				records = 2;
			} else {
				if (listCheck.size() > 0 && queryType.equalsIgnoreCase("insert"))
					records = 21;
				else
					records = 1;
			}
			if (sponsorid > 0 && chargesSid > 0) {
				ipdBillDaoImpl.setRemainSanctionAmountForOpd(sponsorid, chargesSid, treatmentId, patientId);
			}

			// Set bill master totals
			setBillMasterTotalsForOpd(billDetailsDto.getTreatmentId());

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	public List<DoctorDto> fetchDoctorList(String doctodType) {

		List<DoctorDto> list = new ArrayList<DoctorDto>();
		try {
			Query query = null;
			query = sessionfactory.getCurrentSession().createSQLQuery("CALL sp_doctor_list_by_type_for_ot(:doctorType)");
			query.setParameter("doctorType", doctodType);
			query.setResultTransformer(Transformers.aliasToBean(DoctorDto.class));
			list = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<CpoeIPDdetails> getAllOpdServicesAdvised(Integer treatmentId, String callform,
			HttpServletRequest request) {

		List<CpoeIPDdetails> tlistbiilall = new ArrayList<CpoeIPDdetails>();

		CpoeIPDdetails objCpoe = new CpoeIPDdetails();

		String fetchId = "";
		Calendar postDate = Calendar.getInstance();
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		int packageID = Integer.parseInt((String) resourceBundleEhat.getString("labHeadingID"));// 13
		int serviceId = Integer.parseInt((String) resourceBundleEhat.getString("packageID"));// 11
		int investigation = Integer.parseInt((String) resourceBundleEhat.getString("investigation"));// 12
		int casuality = Integer.parseInt((String) resourceBundleEhat.getString("casuality"));
		int physiotherapy = Integer.parseInt((String) resourceBundleEhat.getString("physiotherapy"));
		int otherservices = Integer.parseInt((String) resourceBundleEhat.getString("otherservices"));
		int radiationId = Integer.parseInt((String) resourceBundleEhat.getString("radiationId"));
		try {

			String sql = "select a.bill_details_id AS bill_details_ipd_id, a.emrgency_percentage AS emrPer, a.rate AS rate,a.treatment_id AS treatment_id,b.service_id AS service_id, b.service_name AS service_name, t.id AS id, t.category_name AS category_name, t.charges  AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions,a.deleted AS deleted,a.drdesk_flag AS drdesk_flag,a.cancle AS cancel from ehat_bill_details_ipd a join ehat_subservice t ON t.service_id = a.service_id and t.id = a.sub_service_id  join ehat_service_master b ON b.service_id = t.service_id  left join doctor ON doctor.Doctor_ID = a.doctor_id  where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
					+ serviceId + "," + investigation + "," + packageID + "," + physiotherapy + "," + casuality + ","
					+ otherservices + "," + radiationId + ") and a.treatment_id='" + treatmentId
					+ "' order by a.bill_details_id desc";
			Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();
			List<CpoeIPDdetails> labPatRecordlist = new ArrayList<CpoeIPDdetails>();
			for (Map<String, Object> row : result) {
				CpoeIPDdetails obj = new CpoeIPDdetails();
				obj.setBillipd_id((Integer) row.get("bill_details_ipd_id"));
				obj.setTreatmentid((Integer) row.get("treatment_id"));
				obj.setServiceid((Integer) row.get("service_id"));
				obj.setPaid_flag((String) row.get("paid_flag"));
				obj.setDoctor_id((Integer) row.get("doctor_id"));
				obj.setClinical_notes((String) row.get("clinical_notes"));
				obj.setInstructions((String) row.get("instructions"));
				obj.setServicename((String) row.get("service_name"));
				obj.setCategoryid((Integer) row.get("id"));
				obj.setCategoryName((String) row.get("category_name"));
				obj.setCategorycharges((Double) row.get("category_charges"));
				obj.setQuantity(((Double) row.get("quantity")).intValue());
				obj.setDocName((String) row.get("docName"));
				obj.setInserted_date_time((Date) row.get("created_date_time"));
				obj.setInserted_date_time((Date) row.get("created_date_time"));
				obj.setEmrPer(((Double) row.get("emrPer")));
				obj.setRate((Double) row.get("rate"));
				obj.setDeleted((String) row.get("deleted"));
				obj.setDrdeskFlag((String) row.get("drdesk_flag"));
				obj.setCancel((String) row.get("cancel"));

				java.util.Calendar cal = Calendar.getInstance();
				cal.setTime(obj.getInserted_date_time());
				cal.set(Calendar.HOUR_OF_DAY, 0);
				cal.set(Calendar.MINUTE, 0);
				cal.set(Calendar.SECOND, 0);
				cal.set(Calendar.MILLISECOND, 0);
				java.util.Date utilDate = new java.util.Date(cal.getTime().getTime());

				obj.setCreated_date_time(utilDate);
				tlistbiilall.add(obj);
			}

			objCpoe.setCpoeServdetails(tlistbiilall);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return tlistbiilall;

	}

	@Override
	public int deleteOpdServicesAdvised(String labservicelist, Integer userId, String callform) {
		// TODO Auto-generated method stub

		String[] ary = labservicelist.split(",");
		try {
			if (callform.equalsIgnoreCase("OTP")) {
				OTPercentageDTO TPercentageDTO = new OTPercentageDTO();
				TPercentageDTO = (OTPercentageDTO) sessionfactory.getCurrentSession().get(OTPercentageDTO.class,
						Integer.parseInt(labservicelist));

				TPercentageDTO.setConfugrationflag("Y");
				TPercentageDTO.setUpdatedBy(userId);
				TPercentageDTO.setUpdatedDateTime((new Date(new java.util.Date().getTime())));
			} else if (callform.equalsIgnoreCase("IPD")) {

				String deleteFromFlag = "D";
				System.out.println("id isssss=" + labservicelist);
				for (int i = 0; i < ary.length; i++) {
					System.err.println(ary[i]);
					BillDetailsIpdDto billDetailsDto = new BillDetailsIpdDto();
					billDetailsDto = (BillDetailsIpdDto) sessionfactory.getCurrentSession().get(BillDetailsIpdDto.class,
							Integer.parseInt(ary[i]));

					billDetailsDto.setDeleted("Y");
					billDetailsDto.setDeletedBy(userId);
					billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
					billDetailsDto.setDeleteFrom(deleteFromFlag);
				}

			} else if (callform.equals("OT") || callform.equals("OC")) {
				System.out.println("id isssss=" + labservicelist);
				for (int i = 0; i < ary.length; i++) {
					System.err.println(ary[i]);
					BillDetailsIpdDto billDetailsDto = new BillDetailsIpdDto();
					billDetailsDto = (BillDetailsIpdDto) sessionfactory.getCurrentSession().get(BillDetailsIpdDto.class,
							Integer.parseInt(ary[i]));

					billDetailsDto.setDeleted("Y");
					billDetailsDto.setDeletedBy(userId);
					billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
				}

			} else {

				String deleteFromFlag = "B";
				if (callform.equalsIgnoreCase("DR") || callform.equalsIgnoreCase("Diagno")) {
					deleteFromFlag = "D";
				}
				System.out.println("id isssss=" + labservicelist);
				for (int i = 0; i < ary.length; i++) {
					System.err.println(ary[i]);
					BillDetailsDto billDetailsDto = new BillDetailsDto();
					billDetailsDto = (BillDetailsDto) sessionfactory.getCurrentSession().get(BillDetailsDto.class,
							Integer.parseInt(ary[i]));

					billDetailsDto.setDeleted("Y");
					billDetailsDto.setDeletedBy(userId);
					billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
					billDetailsDto.setDeleteFrom(deleteFromFlag);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;

	}

	@Override
	public List<CpoeServdetails> getListBill(Integer tID, String callform, Integer servid) {
		// TODO Auto-generated method stub

		List<CpoeServdetails> tlistbiilall = new ArrayList<CpoeServdetails>();

		try {

			if (callform.equalsIgnoreCase("coversheet")) {

				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(CpoeServdetails.class);
				criteria.add(Restrictions.eq("treatmentid", tID));
				criteria.add(Restrictions.eq("serviceid", servid));
				criteria.add(Restrictions.eq("cancel", "N"));
				criteria.add(Restrictions.eq("deleted", "N"));
				
				criteria.setMaxResults(10);
				tlistbiilall = criteria.list();

			} else {

				CpoeServdetails objCpoe = new CpoeServdetails();

				String fetchId = "";
				Calendar postDate = Calendar.getInstance();
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");

				int packageID = Integer.parseInt((String) resourceBundleEhat.getString("labHeadingID"));// 13
				int serviceId = Integer.parseInt((String) resourceBundleEhat.getString("packageID"));// 11
				int investigation = Integer.parseInt((String) resourceBundleEhat.getString("investigation"));// 12
				int casuality = Integer.parseInt((String) resourceBundleEhat.getString("casuality"));
				int physiotherapy = Integer.parseInt((String) resourceBundleEhat.getString("physiotherapy"));
				int otherservices = Integer.parseInt((String) resourceBundleEhat.getString("otherservices"));
				int radiationId = Integer.parseInt((String) resourceBundleEhat.getString("radiationId"));
				String sql = "select a.bill_details_id AS bill_details_id, a.emrPer AS emrPer, a.rate AS rate, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, a.drdesk_flag AS drdesk_flag, t.category_name AS category_name, t.charges AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions, a.created_date_time AS inserted_date_time ,a.deleted AS deleted,a.cancle AS cancel,a.speciality_id as speciality_id,a.sndtolabflag as sndtolabflag,a.template_wise as template_wise  from (((ehat_bill_details a join ehat_subservice t ON (((t.service_id = a.service_id) and (t.id = a.sub_service_id)))) join ehat_service_master b ON ((b.service_id = t.service_id))) left join doctor ON ((doctor.Doctor_ID = a.doctor_id))) where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N' and a.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
						+ serviceId + "," + investigation + "," + packageID + "," + physiotherapy + "," + casuality
						+ "," + otherservices + "," + radiationId + ") and a.treatment_id='" + tID
						+ "' and a.cancle='N' and a.deleted='N' order by a.bill_details_id desc";

				Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = query.list();
				for (Map<String, Object> row : result) {
					CpoeServdetails obj = new CpoeServdetails();
					obj.setBilldetailsid((Integer) row.get("bill_details_id"));
					obj.setTreatmentid((Integer) row.get("treatment_id"));
					obj.setServiceid((Integer) row.get("service_id"));
					obj.setPaid_flag((String) row.get("paid_flag"));
					obj.setDoctor_id((Integer) row.get("doctor_id"));
					obj.setClinical_notes((String) row.get("clinical_notes"));
					obj.setInstructions((String) row.get("instructions"));
					obj.setServicename((String) row.get("service_name"));
					obj.setCategoryid((Integer) row.get("id"));
					obj.setCategoryName((String) row.get("category_name"));
					obj.setCategorycharges((Double) row.get("category_charges"));
					obj.setQuantity(((Double) row.get("quantity")).intValue());
					obj.setDocName((String) row.get("docName"));
					obj.setInserted_date_time((Date) row.get("created_date_time"));
					obj.setEmrPer((Double) row.get("emrPer"));
					obj.setRate((Double) row.get("rate"));
					obj.setDeleted((String) row.get("deleted"));
					obj.setCancel((String) row.get("cancel"));
					obj.setSpecialityId((Integer) row.get("speciality_id"));
					obj.setTemplate_wise((String) row.get("template_wise"));

					java.util.Calendar cal = Calendar.getInstance();
					cal.setTime(obj.getInserted_date_time());
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
					cal.set(Calendar.MILLISECOND, 0);
					java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());

					obj.setCreated_date_time(sqlDate);
					obj.setSndtolabflag((String) row.get("sndtolabflag"));
					tlistbiilall.add(obj);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return tlistbiilall;

	}

	@Override
	public int saveToOtherBilling(BillDetailsDto billDetailsDto, String queryType, Integer sponsorId,
			Integer chargesSlaveId, String a, HttpServletRequest request) {

		int records = 0;

		String iscombination = billDetailsDto.getIscombination();
		Integer hallId = 0;
		Integer hallSlaveId = 0;
		int subServId = billDetailsDto.getSubServiceId();
		int serviceId = billDetailsDto.getServiceId();

		// if count greater than zero then package will be assign

		if (iscombination.equals("Y") && sponsorId == 0 && chargesSlaveId == 0) {
			try {
				int count = count(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
				if (count > 0) {

					// From And To date from charges configuration to check package date wise
					// calling to different methods
					java.sql.Date fromd = fromDatePackage(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId,
							serviceId);
					java.sql.Date todate = toDatePackage(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId,
							serviceId);

					// If From And To date not null then this condition will execute other it is
					// available till date not configured
					if (todate != null && fromd != null) {

						// getting count of date if count greater then zero then save other can't save
						long count2 = countDate(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId,
								fromd, todate);

						if (count2 > 0) {
							records = saveOpdPackageForGeneral(sponsorId, chargesSlaveId, billDetailsDto, queryType,
									iscombination, a, request);
						} else {
							records = 6;
						}
					} else {
						records = saveOpdPackageForGeneral(sponsorId, chargesSlaveId, billDetailsDto, queryType,
								iscombination, a, request);
					}

				} else {
					records = 3;
				}

			} catch (Exception e) {
				e.printStackTrace();
				records = 0;
			}
			return records;
			// && receiptOf.equals("sponsor")
		} else if (iscombination.equals("Y") && sponsorId > 0 && chargesSlaveId > 0) {

			try {
				int count = count(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
				if (count > 0) {

					// From And To date from charges configuration to check package date wise
					// calling to different methods
					java.sql.Date fromd = fromDatePackage(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId,
							serviceId);
					java.sql.Date todate = toDatePackage(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId,
							serviceId);

					// If From And To date not null then this condition will execute other it is
					// available till date not configured
					if (todate != null && fromd != null) {

						// getting count of date if count greater then zero then save other can't save
						long count2 = countDate(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId,
								fromd, todate);
						if (count2 > 0) {
							records = saveOpdPackageForSponsor(sponsorId, chargesSlaveId, billDetailsDto, queryType,
									iscombination, a, request);
						} else {
							records = 6;
						}
					} else {
						records = saveOpdPackageForSponsor(sponsorId, chargesSlaveId, billDetailsDto, queryType,
								iscombination, a, request);
					}

				} else {
					records = 4;
				}

			} catch (Exception e) {
				e.printStackTrace();
				records = 0;
			}
			return records;
		} else {
			try {
				sessionfactory.getCurrentSession().merge(billDetailsDto);
				records = 1;
			} catch (Exception e) {
				e.printStackTrace();
				return records;
			}
		}

		return records;
	}

	private long countDate(Integer sponsorId, Integer chargesSlaveId, Integer hallId, Integer hallSlaveId,
			int subServId, int serviceId, java.sql.Date fromd, java.sql.Date todate) {
		long count = 0;
		try {
			// getting charges from Auto suggestion date wise
			Query bet = sessionfactory.getCurrentSession().createQuery(
					"SELECT count(*) FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId AND current_date() BETWEEN  DATE_FORMAT(:stDate, '%Y-%m-%d')  AND DATE_FORMAT(:edDate, '%Y-%m-%d')");

			bet.setParameter("sponsorId", sponsorId);
			bet.setParameter("chargesSlaveId", chargesSlaveId);

			bet.setParameter("hallId", hallId);
			bet.setParameter("hallSlaveId", hallSlaveId);

			bet.setParameter("isComServId", serviceId);
			bet.setParameter("isComServlastId", subServId);

			bet.setDate("stDate", fromd);
			bet.setDate("edDate", todate);

			count = (Long) bet.setMaxResults(1).uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return count;
	}

	public int saveOpdPackageForSponsor(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {
		int records = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (queryType.equals("update")) {

				sessionfactory.getCurrentSession().merge(billDetailsDto);

			} else {
				// saving records in bill details
				sessionfactory.getCurrentSession().merge(billDetailsDto);

				int subServId = billDetailsDto.getSubServiceId();
				int serviceId = billDetailsDto.getServiceId();

				int quantity = 1;

				int hallId = 0;
				int hallSlaveId = 0;

				// String receitpof =billDetailsDto.getReceiptOf();
				double amount = billDetailsDto.getAmount();
				double con = billDetailsDto.getConcession();
				double otheramt = billDetailsDto.getOtherAmount();
				double othercon = billDetailsDto.getOtherConcession();
				double actualam = amount - con;
				double actualotheramt = otheramt - othercon;

				// max count of bill details id
				Criteria criteriaMax = sessionfactory.getCurrentSession().createCriteria(BillDetailsDto.class);
				criteriaMax.setProjection(Projections.max("billDetailsId"));
				Integer maxBillId = (Integer) criteriaMax.uniqueResult();

				if (maxBillId == null) {
					maxBillId = 0;
				}

				String query1 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
						+ sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId + " and hall_id=" + hallId + " and hallSlave_id="
						+ hallSlaveId + " and deleted='N'";

				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(query1);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> data = query.list();
				for (Map<String, Object> row : data) {

					EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();
					double copay = 0;
					double pay = 0;
					double concession = 0;

					double charges = (Double) row.get("charges");
					double chargessposor = (Double) row.get("charges");
					double amountofcon = 0;
					double amountofconsponsor = 0;
					double otherpay = 0;
					double othercopay = 0;

					String iscombinationflag = (String) row.get("iscombination");
					double totalcharges = (Double) row.get("totalcharges");

					// distributed amount formula
					double IncDecp = charges * 100 / totalcharges;
					charges = IncDecp * actualam / 100;

					obj.setRate(charges);

					// distributed amount formula for sponsor charges
					double IncDecp2 = chargessposor * 100 / totalcharges;
					chargessposor = IncDecp2 * actualotheramt / 100;
					obj.setOtherRate(chargessposor);

					amountofconsponsor = chargessposor * quantity;
					otherpay = chargessposor * quantity - concession;
					othercopay = amountofconsponsor - otherpay;

					obj.setOtherAmount(amountofconsponsor);
					obj.setOtherPay(otherpay);
					obj.setOtherCoPay(othercopay);
					obj.setOtherConcession(concession);
					// obj.setSubServiceId((Integer)row.get("service_id"));

					obj.setChildSubServiceId((Integer) row.get("service_id"));

					obj.setSubServiceId(billDetailsDto.getSubServiceId());
					obj.setServiceId(billDetailsDto.getServiceId());
					obj.setBillId(billDetailsDto.getBillId());
					obj.setBillDetailsId(maxBillId);
					obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
					obj.setCreatedBy(userId);
					obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));

					obj.setCancle("N");
					obj.setDeleted("N");

					obj.setUnitId(unitId);
					obj.setDepartmentId(billDetailsDto.getDepartmentId());
					obj.setDoctorId(billDetailsDto.getDoctorId());

					obj.setTreatmentId(billDetailsDto.getTreatmentId());
					obj.setPatienttId(billDetailsDto.getPatienttId());

					obj.setChargesId(sponsorId);
					obj.setChargesSlaveId(chargesSlaveId);

					amountofcon = charges * quantity;
					pay = charges * quantity - concession;
					copay = amountofcon - pay;

					obj.setAmount(amountofcon);
					obj.setCoPay(copay);
					obj.setPay(pay);
					obj.setConcession(concession);

					obj.setQuantity(quantity);
					obj.setIscombination(iscombinationflag);

					Integer subId = (Integer) row.get("service_id");
					SubServiceDto obje = (SubServiceDto) sessionfactory.getCurrentSession().get(SubServiceDto.class,
							subId);
					obj.setChildServiceId(obje.getServiceId());

					sessionfactory.getCurrentSession().merge(obj);
				}
			}

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			records = 0;
		}
		return records;
	}

	public java.sql.Date toDatePackage(int sponsorId, int chargesSlaveId, int hallId, int hallSlaveId, int subServId,
			int serviceId) {
		java.sql.Date todate = null;
		try {
			Query date = sessionfactory.getCurrentSession().createQuery(
					"SELECT toDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId");

			date.setParameter("sponsorId", sponsorId);
			date.setParameter("chargesSlaveId", chargesSlaveId);

			date.setParameter("hallId", hallId);
			date.setParameter("hallSlaveId", hallSlaveId);

			date.setParameter("isComServId", serviceId);
			date.setParameter("isComServlastId", subServId);

			todate = (java.sql.Date) date.setMaxResults(1).uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return todate;
		}
		return todate;

	}

	private int count(Integer sponsorId, Integer chargesSlaveId, Integer hallId, Integer hallSlaveId, int subServId,
			int serviceId) {

		Query q = sessionfactory.getCurrentSession()
				.createSQLQuery("SELECT count(*) as count FROM ehat_configuration_services where deleted='N' "
						+ " and charges_id=" + sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and hall_id="
						+ hallId + " and hallSlave_id=" + hallSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId);

		Integer count = ((Number) q.uniqueResult()).intValue();
		return count;
	}

	public java.sql.Date fromDatePackage(int sponsorId, int chargesSlaveId, int hallId, int hallSlaveId, int subServId,
			int serviceId) {
		java.sql.Date fromd = null;
		try {
			Query fromdate = sessionfactory.getCurrentSession().createQuery(
					"SELECT fromDate FROM ConfigurServicesDto  WHERE deleted='N' AND chargesId= :sponsorId AND chargesSlaveId= :chargesSlaveId AND hallId= :hallId AND hallSlaveId= :hallSlaveId AND isComServId= :isComServId AND isComServlastId= :isComServlastId");

			fromdate.setParameter("sponsorId", sponsorId);
			fromdate.setParameter("chargesSlaveId", chargesSlaveId);

			fromdate.setParameter("hallId", hallId);
			fromdate.setParameter("hallSlaveId", hallSlaveId);

			fromdate.setParameter("isComServId", serviceId);
			fromdate.setParameter("isComServlastId", subServId);

			fromd = (java.sql.Date) fromdate.setMaxResults(1).uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return fromd;
		}
		return fromd;

	}

	public int saveOpdPackageForGeneral(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {
		int records = 0;
		try {

			if (queryType.equals("update")) {

				if (a.equals("addToOPDreciept")) {

					// Add package from receipt
					addpackagefromreceipt(sponsorId, chargesSlaveId, billDetailsDto, queryType, iscombination, a,
							request);

				} else {
					sessionfactory.getCurrentSession().merge(billDetailsDto);
				}
			} else {

				// Add package from Billing
				addpackagefromBilling(sponsorId, chargesSlaveId, billDetailsDto, queryType, iscombination, a, request);

			}

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			records = 0;
		}
		return records;
	}

	private void addpackagefromreceipt(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {// saving records in bill
																							// details
		sessionfactory.getCurrentSession().merge(billDetailsDto);

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		int subServId = billDetailsDto.getSubServiceId();
		int serviceId = billDetailsDto.getServiceId();

		// String receitpof =billDetailsDto.getReceiptOf();
		double amount = billDetailsDto.getAmount();
		double con = billDetailsDto.getConcession();
		double otheramt = billDetailsDto.getOtherAmount();
		double othercon = billDetailsDto.getOtherConcession();
		double actualam = amount - con;
		double actualotheramt = otheramt - othercon;

		int quantity = 1;

		int hallId = 0;
		int hallSlaveId = 0;

		String query1 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
				+ sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
				+ " and is_com_servlastId=" + subServId + " and hall_id=" + hallId + " and hallSlave_id=" + hallSlaveId
				+ " and deleted='N'";

		SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(query1);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		List<Map<String, Object>> data = query.list();

		for (Map<String, Object> row : data) {

			EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();

			double copay = 0;
			double pay = 0;
			double concession = 0;
			double charges = (Double) row.get("charges");
			double chargessposor = (Double) row.get("charges");
			double amountofcon = 0;
			double amountofconsponsor = 0;
			double otherpay = 0;
			double othercopay = 0;
			String iscombinationflag = (String) row.get("iscombination");
			double totalcharges = (Double) row.get("totalcharges");

			int billid = billDetailsDto.getBillId();

			String billmaster = "SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
					+ billid;
			SQLQuery billmasterquery = sessionfactory.getCurrentSession().createSQLQuery(billmaster);
			billmasterquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> databillmaster = billmasterquery.list();
			int chid = 0;
			int chslavid = 0;
			for (Map<String, Object> rowbillmaster : databillmaster) {
				chid = (Integer) rowbillmaster.get("source_type_id");
				chslavid = (Integer) rowbillmaster.get("charges_master_slave_id");

			}
			// distributed amount formula for general charges
			double IncDecp = charges * 100 / totalcharges;
			charges = IncDecp * actualam / 100;
			obj.setRate(charges);

			// distributed amount formula for sponsor charges
			double IncDecp2 = chargessposor * 100 / totalcharges;
			chargessposor = IncDecp2 * actualotheramt / 100;
			obj.setOtherRate(chargessposor);

			amountofconsponsor = chargessposor * quantity;
			otherpay = chargessposor * quantity - concession;
			othercopay = amountofconsponsor - otherpay;

			obj.setOtherAmount(amountofconsponsor);
			obj.setOtherPay(otherpay);
			obj.setOtherCoPay(othercopay);
			obj.setOtherConcession(concession);

			obj.setChildSubServiceId((Integer) row.get("service_id"));

			obj.setSubServiceId(billDetailsDto.getSubServiceId());

			obj.setServiceId(billDetailsDto.getServiceId());
			obj.setBillId(billDetailsDto.getBillId());
			obj.setBillDetailsId(billDetailsDto.getBillDetailsId());
			obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
			obj.setCreatedBy(userId);
			obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));

			obj.setCancle("N");
			obj.setDeleted("N");

			obj.setUnitId(unitId);
			obj.setDepartmentId(billDetailsDto.getDepartmentId());
			obj.setDoctorId(billDetailsDto.getDoctorId());

			obj.setTreatmentId(billDetailsDto.getTreatmentId());
			obj.setPatienttId(billDetailsDto.getPatienttId());

			obj.setChargesId(chid);
			obj.setChargesSlaveId(chslavid);

			amountofcon = charges * quantity;
			copay = charges * quantity - concession;
			pay = amountofcon - copay;

			obj.setAmount(amountofcon);
			obj.setCoPay(copay);
			obj.setPay(pay);
			obj.setConcession(concession);

			obj.setQuantity(quantity);
			obj.setIscombination(iscombinationflag);

			// setting service id in other bill details table
			Integer subId = (Integer) row.get("service_id");
			SubServiceDto obje = (SubServiceDto) sessionfactory.getCurrentSession().get(SubServiceDto.class, subId);
			obj.setChildServiceId(obje.getServiceId());

			sessionfactory.getCurrentSession().merge(obj);

		}
	}

	private void addpackagefromBilling(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {// saving records in bill
																							// details

		int billidd = billDetailsDto.getBillId();

		String billmasterr = "SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
				+ billidd;
		SQLQuery billmasterqueryy = sessionfactory.getCurrentSession().createSQLQuery(billmasterr);
		billmasterqueryy.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		List<Map<String, Object>> databillmasterr = billmasterqueryy.list();
		int chidd = 0;
		int chslavidd = 0;
		for (Map<String, Object> rowbillmaster : databillmasterr) {
			chidd = (Integer) rowbillmaster.get("source_type_id");
			chslavidd = (Integer) rowbillmaster.get("charges_master_slave_id");

		}
		billDetailsDto.setSponsorId(chidd);
		billDetailsDto.setChargesSlaveId(chslavidd);
		sessionfactory.getCurrentSession().merge(billDetailsDto);

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		int subServId = billDetailsDto.getSubServiceId();
		int serviceId = billDetailsDto.getServiceId();

		int quantity = 1;

		int hallId = 0;
		int hallSlaveId = 0;
		// String receitpof =billDetailsDto.getReceiptOf();
		double amount = billDetailsDto.getAmount();
		double con = billDetailsDto.getConcession();
		double otheramt = billDetailsDto.getOtherAmount();
		double othercon = billDetailsDto.getOtherConcession();
		double actualam = amount - con;
		double actualotheramt = otheramt - othercon;

		// max count of bill details id
		Criteria criteriaMax = sessionfactory.getCurrentSession().createCriteria(BillDetailsDto.class);
		criteriaMax.setProjection(Projections.max("billDetailsId"));
		Integer maxBillId = (Integer) criteriaMax.uniqueResult();

		if (maxBillId == null) {
			maxBillId = 0;
		}
		// bill details id from other OPD bill table
		// Integer otherbillDetailsId = 0;

		String query1 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
				+ sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
				+ " and is_com_servlastId=" + subServId + " and hall_id=" + hallId + " and hallSlave_id=" + hallSlaveId
				+ " and deleted='N'";

		SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(query1);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		List<Map<String, Object>> data = query.list();

		for (Map<String, Object> row : data) {

			EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();

			double copay = 0;
			double pay = 0;
			double concession = 0;
			double charges = (Double) row.get("charges");
			double chargessposor = (Double) row.get("charges");
			double amountofcon = 0;
			double amountofconsponsor = 0;
			double otherpay = 0;
			double othercopay = 0;
			String iscombinationflag = (String) row.get("iscombination");
			double totalcharges = (Double) row.get("totalcharges");

			int billid = billDetailsDto.getBillId();

			String billmaster = "SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
					+ billid;
			SQLQuery billmasterquery = sessionfactory.getCurrentSession().createSQLQuery(billmaster);
			billmasterquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> databillmaster = billmasterquery.list();
			int chid = 0;
			int chslavid = 0;
			for (Map<String, Object> rowbillmaster : databillmaster) {
				chid = (Integer) rowbillmaster.get("source_type_id");
				chslavid = (Integer) rowbillmaster.get("charges_master_slave_id");

			}

			// Integer subserviceId = (Integer) row.get("service_id");

			// distributed amount formula
			double IncDecp = charges * 100 / totalcharges;
			charges = IncDecp * actualam / 100;
			obj.setRate(charges);

			// distributed amount formula for sponsor charges
			double IncDecp2 = chargessposor * 100 / totalcharges;
			chargessposor = IncDecp2 * actualotheramt / 100;
			obj.setOtherRate(chargessposor);

			amountofconsponsor = chargessposor * quantity;
			otherpay = chargessposor * quantity - concession;
			othercopay = amountofconsponsor - otherpay;

			obj.setOtherAmount(amountofconsponsor);
			obj.setOtherPay(otherpay);
			obj.setOtherCoPay(othercopay);
			obj.setOtherConcession(concession);

			obj.setChildSubServiceId((Integer) row.get("service_id"));

			obj.setSubServiceId(billDetailsDto.getSubServiceId());

			obj.setServiceId(billDetailsDto.getServiceId());
			obj.setBillId(billDetailsDto.getBillId());
			obj.setBillDetailsId(maxBillId);
			obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
			obj.setCreatedBy(userId);
			obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));

			obj.setCancle("N");
			obj.setDeleted("N");

			obj.setUnitId(unitId);
			obj.setDepartmentId(billDetailsDto.getDepartmentId());
			obj.setDoctorId(billDetailsDto.getDoctorId());

			obj.setTreatmentId(billDetailsDto.getTreatmentId());
			obj.setPatienttId(billDetailsDto.getPatienttId());

			obj.setChargesId(chid);
			obj.setChargesSlaveId(chslavid);

			amountofcon = charges * quantity;
			copay = charges * quantity - concession;
			pay = amountofcon - copay;

			obj.setAmount(amountofcon);
			obj.setCoPay(copay);
			obj.setPay(pay);
			obj.setConcession(concession);

			obj.setQuantity(quantity);
			obj.setIscombination(iscombinationflag);

			// setting service id in other bill details table
			Integer subId = (Integer) row.get("service_id");
			SubServiceDto obje = (SubServiceDto) sessionfactory.getCurrentSession().get(SubServiceDto.class, subId);
			obj.setChildServiceId(obje.getServiceId());
			obj.setSelfid(0);
			sessionfactory.getCurrentSession().merge(obj);

		}
	}

	public int setBillMasterTotalsForOpd(int treatmentId) {

		int result = 0;
		try {

			// Update amount in bill master start
			int billId = 0;
			double totalAmt = 0;
			double totPaid = 0;
			double totRemain = 0;
			double totRefund = 0;
			double totDisc = 0;
			double totConcn = 0;
			String callFrom = "opd";

			BillReceiptMasterDTO obj = new BillReceiptMasterDTO();
			obj.setTreatmentId(treatmentId);
			BillReceiptMasterDTO objRec = fetchAllReceiptTotals(obj, callFrom);

			totalAmt = objRec.getActualAmt();
			totConcn = objRec.getActualTotConcn();
			totDisc = objRec.getTotalDisc();
			totPaid = objRec.getTotalPaid();
			totRefund = objRec.getRefundAmt();
			totRemain = totalAmt - (totConcn + totDisc + totPaid);

			// Session session = session;
			String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,totalPaid =:totalPaid,total_remain =:remaining,totalRefund =:totalRefund,discount =:discount,total_concn =:totalConcn WHERE billId =:billId";
			Query query = sessionfactory.getCurrentSession().createQuery(hql);
			query.setDate("updatedDateTime", new Date(new java.util.Date().getTime()));
			query.setParameter("totalBill", totalAmt);
			query.setParameter("totalPaid", totPaid);
			query.setParameter("remaining", totRemain);
			query.setParameter("totalRefund", totRefund);
			query.setParameter("discount", totDisc);
			query.setParameter("totalConcn", totConcn);
			query.setParameter("billId", billId);
			query.executeUpdate();
			// Update amount in bill master end

			result = 1;

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
		}
		return result;
	}

	public BillReceiptMasterDTO fetchAllReceiptTotals(BillReceiptMasterDTO obj, String callFrom) {

		BillReceiptMasterDTO masterObj = new BillReceiptMasterDTO();

		try {

			RegistrationController regCon = (ApplicationContextUtils.getApplicationContext())
					.getBean(RegistrationController.class);
			RegTreBillDto rtd = new RegTreBillDto();

			if (regCon != null) {

				rtd = regCon.fetchPatientsRecordByTreatmentId(obj.getTreatmentId());
				rtd = rtd.getListRegTreBillDto().get(0);
				rtd.getPatientName();

				obj.setSponsorCatId(rtd.getSourceTypeId());
			}

			String sql = "";
			double ipdRefund = 0;
			double totAmt = 0, totConcn = 0, totDisc = 0, totPaid = 0, totRemain = 0, totRefund = 0;

			if (callFrom.equals("opd")) {

				if (obj.getSponsorCatId() > 0) {

					sql = "select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn FROM ehat_bill_details where deleted='N' and treatment_id="
							+ obj.getTreatmentId() + " and cancle='N' and service_id != 21 ";
				} else {

					sql = "select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn FROM ehat_bill_details where deleted='N' and treatment_id="
							+ obj.getTreatmentId() + " and cancle='N' and service_id != 21 ";
				}
			} else {

				if (obj.getSponsorCatId() > 0) {

					sql = "select ifnull(sum(other_amount),0) as totAmt,ifnull(sum(other_concession),0) as totConcn,service_id FROM ehat_bill_details_ipd where deleted='N' and treatment_id="
							+ obj.getTreatmentId() + " and cancle='N' and service_id != 21 and service_id != 16 ";
				} else {

					sql = "select ifnull(sum(amount),0) as totAmt,ifnull(sum(concession),0) as totConcn,service_id FROM ehat_bill_details_ipd where deleted='N' and treatment_id="
							+ obj.getTreatmentId() + " and cancle='N' and service_id != 21 and service_id != 16 ";
				}
			}

			Query billDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);
			billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
			for (Map<String, Object> row : listBillDetails) {

				totAmt = (Double) row.get("totAmt");
				totConcn = (Double) row.get("totConcn");
			}

			if (callFrom.equals("opd")) {

				sql = "select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid,"
						+ "ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where deleted='N' and treatment_id="
						+ obj.getTreatmentId() + " and against_id=0 ";

			} else {

				sql = "select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid,"
						+ "ifnull(sum(total_remain),0) as totRemain FROM ehat_receipt_master_ipd where deleted='N' and treatment_id="
						+ obj.getTreatmentId() + " and against_id=0 ";

				String sqlRef = "select ifnull(sum(total_paid),0) from ehat_refund_master_ipd where deleted='N' and treatment_id="
						+ obj.getTreatmentId() + " ";
				Query refQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlRef);
				ipdRefund = (Double) refQuery.uniqueResult();
			}

			Query recQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for (Map<String, Object> row : listRec) {

				totDisc = (Double) row.get("totDisc");
				totPaid = (Double) row.get("totPaid");
				totRemain = (Double) row.get("totRemain");

				if (callFrom.equals("opd")) {

					totRefund = (Double) row.get("totRefund");

				} else {

					totRefund = ipdRefund;
				}
			}
			masterObj.setBillId(rtd.getBillId());
			masterObj.setActualAmt(totAmt);
			masterObj.setActualTotConcn(totConcn);
			masterObj.setTotalDisc(totDisc);
			masterObj.setTotalPaid(totPaid);
			masterObj.setTotalRemain(totRemain);
			masterObj.setRefundAmt(totRefund);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return masterObj;
	}

	@Override
	public int cancelInvestigationTest(String billDetId, String cancleType, String callform,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		int idRadiologyTest=0;
		int idTestRadiology=0;
		int response=0;
		if(callform.equals("Diagno") || callform.equals("DR") || callform.equals("OPDDignoBill") ||
				callform.equals("IPD") || callform.equals("IpdBill")){
			
			String[] ary = billDetId.split(",");
			for(String billDetailsId: ary){
				
				String query="select idradiology_test,idtest_radiology from radiology_assign_test where bill_details_id = "+billDetailsId;
				Query tsetDetails = sessionfactory.getCurrentSession().createSQLQuery(query);
				tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 
				@SuppressWarnings("unchecked")
			 	List<Map<String, Object>> listBillDetails = tsetDetails.list();
				for(Map<String, Object> row : listBillDetails){
					idRadiologyTest=((Integer)row.get("idradiology_test"));
					idTestRadiology=((Integer)row.get("idtest_radiology"));
				}
				
				String sql="select  COUNT(*) from ehat_radiology_test_report where radiology_test_id = "+idRadiologyTest+" and test_id = "+idTestRadiology+"";
				int count=((BigInteger)sessionfactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
				
				if(count == 0){
					
					String sql1="update radiology_assign_test set radiologyTestStatus='"+cancleType+"' where idradiology_test="+idRadiologyTest+" and idtest_radiology="+idTestRadiology+"";
					Query updateSql = sessionfactory.getCurrentSession().createSQLQuery(sql1);
					updateSql.executeUpdate();
					response =1;
				}else{
					
					return 0;
				}
			}
		}
		return response;
	}

	@Override
	public int cancelLabTest(String billDetId, String cancleType, Integer deptId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (Integer) session.getAttribute("userId1");
		String[] ary = billDetId.split(",");
		List<LabRequestDTO> listsmplColFlg = new ArrayList<LabRequestDTO>();
		List<LabRequestSlaveDTO> listSerId = new ArrayList<LabRequestSlaveDTO>();
		try {

			System.err.println("cancleType====>" + cancleType);
			System.err.println("billDetId====>" + billDetId);
			if (billDetId != "" && billDetId != null) {

				for (String billDetailsId : ary) {

					// LabRequestDTO labRequestDTO = new LabRequestDTO();
					LabRequestSlaveDTO labRequestSlaveDTO = new LabRequestSlaveDTO();

					Criteria criteriaSubSerId = sessionfactory.getCurrentSession()
							.createCriteria(LabRequestSlaveDTO.class);
					criteriaSubSerId.add(Restrictions.eq("billDetailsID", Integer.parseInt(billDetailsId.trim())));
					criteriaSubSerId.add(Restrictions.eq("deptId", deptId));
					listSerId = criteriaSubSerId.list();
					if (listSerId.size() != 0) {
						for (LabRequestSlaveDTO labSlvObj : listSerId) {
							Criteria criteriasmplFlg = sessionfactory.getCurrentSession()
									.createCriteria(LabRequestDTO.class);
							criteriasmplFlg.add(Restrictions.eq("labRequestId", labSlvObj.getLabRequestId()));
							criteriasmplFlg.setProjection(Projections.projectionList()
									.add(Projections.property("smplColletFlag"), "smplColletFlag"));
							criteriasmplFlg.setResultTransformer(Transformers.aliasToBean(LabRequestDTO.class));
							listsmplColFlg = criteriasmplFlg.list();

							for (LabRequestDTO labObj : listsmplColFlg) {
								if (labObj.getSmplColletFlag() == 'N') {
									labRequestSlaveDTO = (LabRequestSlaveDTO) sessionfactory.getCurrentSession()
											.get(LabRequestSlaveDTO.class, labSlvObj.getLabReqSlvId());
									labRequestSlaveDTO.setDeletedFlag(cancleType);
									labRequestSlaveDTO.setDeletedBy(userId);
									labRequestSlaveDTO.setDeleteDatetime((new Date(new java.util.Date().getTime())));
								} else {
									// if sample are collected.
									return 0;
								}
							}
						}
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}

		return 1;
	}

	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(Integer treatmentId) {
		log.info("In OpdServiceAdvicedDaoImpl getPatientSubServiceDetails()");
		Session s = sessionfactory.getCurrentSession();
		PatientSubServiceDetailsDto objDto=new PatientSubServiceDetailsDto();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_doctordesk_patient_sub_service_details(:treatmentFlag,:treatmentId)");
			querySp.setParameter("treatmentFlag", "AT");//here 'AT' for active treatment
			querySp.setParameter("treatmentId", treatmentId);
			//querySp.setParameter("serviceId", objDto.getServiceId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientSubServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientSubServiceDetailsDto> lstSubServiceDetailsDto = querySp.list();		
			objDto.setListBillNobleServiceDto(lstSubServiceDetailsDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public int addPathologyPackageFromBilling(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType, String module, String sampleWiseBarcodes) {
		
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
			int labId = Integer.parseInt((String)resourceBundleEhat.getString("pathologyId"));//13
			// saving records in bill details
			int businessType = billDetailsDto.getBusinessType();
			int customerType = billDetailsDto.getCustomerType();
			int customerId = billDetailsDto.getCustomerId();
			int sponsorId = billDetailsDto.getChargesSlaveId();
			int chargesSlaveId = billDetailsDto.getChargesSlaveId();
		    int chslavidd = billDetailsDto.getChargesSlaveId();
		    int defaultFlag = billDetailsDto.getDefaultFlag();
		    int chidd=0;
		    if(chslavidd > 0) {
		    	
		    	chidd = 1;
		    }
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId =(Integer) session.getAttribute("uId");
			
			int subServId = billDetailsDto.getSubServiceId();
			int serviceId = billDetailsDto.getServiceId();
			
			int quantity = 1;
			int hallId = 0;
			int hallSlaveId = 0;
			//String receitpof      =billDetailsDto.getReceiptOf();
		    double amount         =billDetailsDto.getAmount();
			double con            =billDetailsDto.getConcession();
			double otheramt       =billDetailsDto.getOtherAmount();
			double othercon       =billDetailsDto.getOtherConcession();
			double actualam       =amount -con;
			double actualotheramt =otheramt -othercon;
			
			int spCount = -1;
			if(chargesSlaveId > 0) {
				
				String sqlSPCount = "SELECT count(*) FROM ehat_configuration_services where "
						  + " chargesSlave_id="+ chargesSlaveId +" and hallSlave_id="+ hallSlaveId +" and is_com_servId=" + serviceId
						  + " and is_com_servlastId=" + subServId +" and deleted='N'";
				Query spQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlSPCount);
				spCount = ((Number)spQuery.uniqueResult()).intValue();
			}
			
			if(spCount <= 0)
				chargesSlaveId = 0;
			
			if(spCount == 0 && defaultFlag == 0) {
				
				return 33;
			}
			
			billDetailsDto.setSponsorId(chidd);
	        billDetailsDto.setChargesSlaveId(chslavidd);
	        BillDetailsDto savedObj = (BillDetailsDto) sessionfactory.getCurrentSession().merge(billDetailsDto);
			Integer maxBillId = savedObj.getBillDetailsId();

			if(maxBillId == null){
				maxBillId = 0;
			}
			
			String sql22 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where "
							+ " chargesSlave_id="
							+ chargesSlaveId
							+ " and is_com_servId=" + serviceId
							+ " and is_com_servlastId=" + subServId
							+ " and hall_id=" + hallId
							+ " and hallSlave_id=" + hallSlaveId
							+ " and deleted='N'";

			SQLQuery query222 = sessionfactory.getCurrentSession().createSQLQuery(sql22);    
			query222.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data22 = query222.list();
			for (Map<String, Object> row22 : data22) {
				
				//setting service id in other bill details table
				Integer subId=(Integer) row22.get("service_id");
				SubServiceDto obje = (SubServiceDto) sessionfactory.getCurrentSession().get(SubServiceDto.class,subId);
				
				Integer testServiceId = obje.getServiceId();
				
				if(testServiceId != labId) {
					
					EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();
					
					double copay = 0;
					double pay = 0;
					double concession = 0;
					double charges = (Double) row22.get("charges");
					double chargessposor = (Double) row22.get("charges");
					double amountofcon = 0;
					double amountofconsponsor = 0;
					double otherpay = 0;
					double othercopay = 0;
					String iscombinationflag = (String) row22.get("iscombination");
					double totalcharges = (Double) row22.get("totalcharges");
					
					//distributed amount formula
					double IncDecp = charges*100/totalcharges;
					charges =  IncDecp * actualam/100;	
					obj.setRate(charges);
					
					//distributed amount formula for sponsor charges
					double IncDecp2 = chargessposor*100/totalcharges;
					chargessposor =  IncDecp2 * actualotheramt/100;
					obj.setOtherRate(chargessposor);
					
					amountofconsponsor = chargessposor * quantity;
					otherpay = chargessposor * quantity - concession;
					othercopay = amountofconsponsor - otherpay;
					
					obj.setOtherAmount(amountofconsponsor);
					obj.setOtherPay(otherpay);
					obj.setOtherCoPay(othercopay);
					obj.setOtherConcession(concession);
					obj.setChildSubServiceId((Integer) row22.get("service_id"));
					obj.setSubServiceId(billDetailsDto.getSubServiceId());
					obj.setServiceId(billDetailsDto.getServiceId());
					obj.setBillId(billDetailsDto.getBillId());
					obj.setBillDetailsId(maxBillId);
					obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
					obj.setCreatedBy(userId);
					obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));
					obj.setCancle("N");
					obj.setDeleted("N");
					obj.setUnitId(unitId);
					obj.setDepartmentId(billDetailsDto.getDepartmentId());
					obj.setDoctorId(billDetailsDto.getDoctorId());
					obj.setTreatmentId(billDetailsDto.getTreatmentId());
					obj.setPatienttId(billDetailsDto.getPatienttId());
					obj.setChargesId(chidd);
					obj.setChargesSlaveId(chslavidd);
					
					amountofcon = charges * quantity;
					copay = charges * quantity - concession;
					pay = amountofcon - copay;
					
					obj.setAmount(amountofcon);
					obj.setCoPay(copay);
					obj.setPay(pay);
					obj.setConcession(concession);
					obj.setQuantity(quantity);
					obj.setIscombination(iscombinationflag);
					obj.setChildServiceId(obje.getServiceId());
					obj.setSelfid(0);
					
					sessionfactory.getCurrentSession().merge(obj);
				}else {
					
					PathologySampleWiseMaster master = (PathologySampleWiseMaster) ConfigUIJSONUtility.getObjectFromJSON(sampleWiseBarcodes, PathologySampleWiseMaster.class);
				    List<PathologySampleWiseMaster> barcodeList = master.getLabSampleWiseMasterDtoList();
					
					String query1 = "";
					if(businessType == 1) {
						
						query1 = "SELECT c.service_id , c.charges , c.iscombination , c.totalcharges, ifnull(p.template_wise,'N') as template_wise FROM lab_charges_configuration c, pathology_labprofile p where "
							   + "(c.service_id = p.subservice_id) and c.charges_id="+sponsorId+" and c.chargesSlave_id="+chargesSlaveId+" and c.is_com_servId="+serviceId+" and is_com_servlastId="+subServId+" and c.hall_id="+hallId+" and c.hallSlave_id="+hallSlaveId+" and c.customer_type="+customerType+" and c.customer_name="+customerId+" and c.deleted='N' ";
						
					}else {
						
						query1 = "SELECT c.service_id , c.charges , c.iscombination , c.totalcharges, ifnull(p.template_wise,'N') as template_wise, ifnull(p.idTestSample,0) as sample_type_id  FROM ehat_configuration_services c, pathology_labprofile p where "
							   + "(c.service_id = p.subservice_id) and c.chargesSlave_id="+chargesSlaveId+" and c.is_com_servId="+serviceId+" and is_com_servlastId="+subServId+" and c.hall_id="+hallId+" and c.hallSlave_id="+hallSlaveId+" and c.deleted='N' and c.service_id="+subId;
						
					}
					
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(query1);    
			        query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        List<Map<String, Object>> data = query.list();
					for (Map<String, Object> row : data) {

						EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();
						
						Integer subServiceId = (Integer) row.get("service_id");
						Integer sampleTypeId = ((Number) row.get("sample_type_id")).intValue();
						
						int lenghtCount = ((Number)sessionfactory.getCurrentSession().createSQLQuery("select fn_get_inouthouse_count("+labId+","+subServiceId+")").uniqueResult()).intValue();
						int setValue=0;
						
						int lenghtSub=0;
						if(lenghtCount == 1){
							lenghtSub=0;
							setValue=0;
						}else if(lenghtCount == 2){
							lenghtSub=0;
							setValue=1;
						}else if(lenghtCount == 3){
							lenghtSub=1;
							setValue=3;
						}
						
						for (int iii = 0; iii <= lenghtSub; iii++) {
							
							String barcode = "0";
							
							/*for(PathologySampleWiseMaster dto : barcodeList) {
								if(subServiceId.equals(dto.getSubServiceId())) {
									barcode = dto.getBarCode();
									sampleTypeId = dto.getSampleTypeId();
								}
							}*/
							obj.setSampleTypeId(sampleTypeId);
							obj.setBarcode(barcode);
							obj.setCustomerType(customerType);
							obj.setCustomerId(customerId);
							
							double copay = 0;
							double pay = 0;
							double concession = 0;
							Double charges = (Double) row.get("charges");
							Double chargessposor = (Double) row.get("charges");
							double amountofcon = 0;
							double amountofconsponsor = 0;
							double otherpay     = 0;
							double othercopay     = 0;
							String iscombinationflag = (String) row.get("iscombination");
							double totalcharges = (Double) row.get("totalcharges");
							
				            double IncDecp2 = 0;
				            double IncDecp = 0;
				            //modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition apply
				            if(!Double.isNaN(charges) && charges != 0.0){
							  
				            	IncDecp = charges*100/totalcharges;
				 			    charges        =  IncDecp * actualam/100;	
				 			    obj.setRate(charges);
				            	
				            }else{
				            	
				            	IncDecp = 0;
				            	obj.setRate(0);
				            }
							
							//distributed amount formula for sponsor charges
				            //modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition apply
							if(!Double.isNaN(chargessposor) && chargessposor != 0.0){
								
								IncDecp2 = chargessposor*100/totalcharges;
								chargessposor =  IncDecp2 * actualotheramt/100;
								obj.setOtherRate(chargessposor);
								 
								amountofconsponsor = chargessposor * quantity;
								otherpay = chargessposor * quantity - concession;
								othercopay = amountofconsponsor - otherpay;
								
								obj.setOtherAmount(amountofconsponsor);
								obj.setOtherPay(otherpay);
								obj.setOtherCoPay(othercopay);
							}else{
								
								 IncDecp2 = 0.0;
								 obj.setOtherRate(chargessposor);
								 obj.setOtherAmount(0);
								 obj.setOtherPay(0);
								 obj.setOtherCoPay(0);
							 }
							
							obj.setOtherConcession(concession);
							obj.setChildSubServiceId((Integer) row.get("service_id"));
							
							String templateWise = (String) row.get("template_wise");
							
							// code added by ROHIT on 11Oct 2022 for the Template Wise package flow
							obj.setTemplateWise(templateWise);
							
							/*
							 * if(!templateWise.equalsIgnoreCase("Y")) {
							 * 
							 * obj.setTemplateWise("N"); }else { obj.setTemplateWise(templateWise); }
							 */
				            
							obj.setSubServiceId(billDetailsDto.getSubServiceId());
							obj.setServiceId(billDetailsDto.getServiceId());
							obj.setBillId(billDetailsDto.getBillId());
							obj.setBillDetailsId(maxBillId);
							obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
							obj.setCreatedBy(userId);
							obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));
							obj.setCancle("N");
							obj.setDeleted("N");
							obj.setUnitId(unitId);
							obj.setDepartmentId(billDetailsDto.getDepartmentId());
							obj.setDoctorId(billDetailsDto.getDoctorId());
							obj.setTreatmentId(billDetailsDto.getTreatmentId());
							obj.setPatienttId(billDetailsDto.getPatienttId());
							obj.setChargesId(chidd);
							obj.setChargesSlaveId(chslavidd);
					          //modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition apply
							if(!Double.isNaN(charges) && charges != 0.0){
			
								amountofcon = charges * quantity;
								copay = charges * quantity - concession;
								pay = amountofcon - copay;
								obj.setAmount(amountofcon);
								obj.setCoPay(copay);
								obj.setPay(pay);
							}else{
								obj.setAmount(0);
								obj.setCoPay(0);
							    obj.setPay(0);
								
							}
							obj.setConcession(concession);
							obj.setQuantity(quantity);
							obj.setIscombination(iscombinationflag);
							
							if(setValue == 3){
								 
								obj.setInOutHouse(iii);
								if(iii==1){
									 obj.setRate(0);
									 obj.setConcession(0);
									 obj.setAmount(0);
									 obj.setCoPay(0);
									 obj.setOtherRate(0);
									 obj.setOtherConcession(0);
									 obj.setOtherAmount(0);
									 obj.setOtherPay(0);
								}

							}else{
								obj.setInOutHouse(setValue);
							}
			
							obj.setChildServiceId(testServiceId);
							obj.setSelfid(0);
							sessionfactory.getCurrentSession().merge(obj);
						}
					}
				}
				
			}
		
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetailsOnIPD(PatientSubServiceDetailsDto objDto) {

		log.info("In IpdBillMgtDaoImpl getPatientSubServiceDetails()");
		Session s = sessionfactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_ipd_serviceadviced_sub_service_details(:treatmentFlag,:treatmentId,:serviceId)");
			querySp.setParameter("treatmentFlag", "AT");//here 'AT' for active treatment
			querySp.setParameter("treatmentId", objDto.getTreatmentId());
			querySp.setParameter("serviceId", objDto.getServiceId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientSubServiceDetailsDto.class));
			@SuppressWarnings("unchecked")
			List<PatientSubServiceDetailsDto> lstSubServiceDetailsDto = querySp.list();		
			objDto.setListSubServiceIpdDto(lstSubServiceDetailsDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public int deleteIpdServicesAdvised(String labservicelist, int userId) {
		//String hql=""; 
		String sql="";
	    int response=0;
		try {
			   System.out.println("length======="+labservicelist.length());
                
			   if(labservicelist .length()  > 1) {
				   String[] billDeatilsid = labservicelist.split(",");
				  for(String billId: billDeatilsid) {
					   String billDetailId=billId;
					   
					   String sqlCount="select service_id from ehat_bill_details_ipd where bill_details_id="+billDetailId+"";
					   SQLQuery qcCount	  =sessionfactory.getCurrentSession().createSQLQuery(sqlCount);
					   int serviceId=((Number) qcCount.uniqueResult()).intValue();
					   
					   if(serviceId==4) {
						   
						   sql ="Update ehat_bill_details_ipd set deleted = 'Y', delete_from='D', deleted_by="+userId+", deleted_date_time=now()   where bill_details_id in("+labservicelist+")";
							  SQLQuery q	  =sessionfactory.getCurrentSession().createSQLQuery(sql);
							  q.executeUpdate();
							  response=1;
						   
					   }
					   else {
					   //if(serviceId ==11 || serviceId==13) {
						   Integer testStatus=0;
						    sqlCount="select count(*) from pathology_sample_wise_master where bil_det_id="+billDetailId+" AND deleted = 'N' and dept_id='2' ";
						    qcCount	  =sessionfactory.getCurrentSession().createSQLQuery(sqlCount);
						   int isPresentCount=((Number) qcCount.uniqueResult()).intValue();
						   if(isPresentCount  > 0) {
							   String sqlforDelete = "SELECT test_status FROM pathology_sample_wise_master WHERE bil_det_id="+billDetailId+" AND deleted = 'N' and dept_id='2' ";
					            SQLQuery sqlforDeleteresult = sessionfactory.getCurrentSession().createSQLQuery(sqlforDelete);
					             testStatus = ((Number) sqlforDeleteresult.uniqueResult()).intValue();
						   }else {
							   sql ="Update ehat_bill_details_ipd set deleted='Y', delete_from='D', deleted_by="+userId+", deleted_date_time=now() where bill_details_id in("+labservicelist+")";
								  SQLQuery q	  =sessionfactory.getCurrentSession().createSQLQuery(sql);
								  q.executeUpdate();
								  response=1;
						   }
							
				            
				            if(testStatus <= 2)
							{
								//  hql="Update BillDetailsIpdDto set deleted='Y',deletedBy="+userId+",deletedDateTime=now() where billDetailsId in('"+labservicelist+"')  ";
								  sql ="Update ehat_bill_details_ipd set deleted='Y', delete_from='D', deleted_by="+userId+", deleted_date_time=now() where bill_details_id in("+labservicelist+")";
								  SQLQuery q	  =sessionfactory.getCurrentSession().createSQLQuery(sql);
								  q.executeUpdate();
								  response=1;
							}else if(isPresentCount > 0 &&  testStatus >2) {
								response=2;
							}
				            
					   }
				  }
				
			   }
			   else {
								
				      int testStatus=0;
				   				String sqlCount="select service_id from ehat_bill_details_ipd where bill_details_id="+labservicelist+"";
				   					SQLQuery qcCount	  =sessionfactory.getCurrentSession().createSQLQuery(sqlCount);
				   					int serviceId=((Number) qcCount.uniqueResult()).intValue();
				   					if(serviceId==11 || serviceId==13) {
				   					
									    sqlCount="select count(*) from pathology_sample_wise_master where bil_det_id="+labservicelist+" AND deleted = 'N' and dept_id='2'  ";
									    qcCount	  =sessionfactory.getCurrentSession().createSQLQuery(sqlCount);
									   int isPresentCount=((Number) qcCount.uniqueResult()).intValue();
				   						
				   						if(isPresentCount  > 0) {
				   						      String sqlforDelete = "SELECT test_status FROM pathology_sample_wise_master WHERE bil_det_id="+labservicelist+
												   " AND deleted = 'N' and dept_id='2' ";
						          	         SQLQuery sqlforDeleteresult = sessionfactory.getCurrentSession().createSQLQuery(sqlforDelete);
							                testStatus = ((Number) sqlforDeleteresult.uniqueResult()).intValue();
				   						}else {
				   						 sql ="Update ehat_bill_details_ipd set deleted='Y', delete_from='D', deleted_by="+userId+", deleted_date_time=now() where bill_details_id in("+labservicelist+")";
										  SQLQuery q	  =sessionfactory.getCurrentSession().createSQLQuery(sql);
										  q.executeUpdate();
										  response=1;
				   						}
				   						
				   						
				   						if(testStatus <= 2)
										{
											//  hql="Update BillDetailsIpdDto set deleted='Y',deletedBy="+userId+",deletedDateTime=now() where billDetailsId in('"+labservicelist+"')  ";
											  sql ="Update ehat_bill_details_ipd set deleted='Y', delete_from='D', deleted_by="+userId+", deleted_date_time=now() where bill_details_id in("+labservicelist+")";
											  SQLQuery q	  =sessionfactory.getCurrentSession().createSQLQuery(sql);
											  q.executeUpdate();
											  response=1;
												return response;
										} else if(isPresentCount > 0 &&  testStatus >2) {
											response=2;
										}
				   					}
								
								
								
					  }  
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	
	@Override
	public List<CpoeServdetails> getListBillIPD(Integer tID, String callform, Integer servid) {
		// TODO Auto-generated method stub

		List<CpoeServdetails> tlistbiilall = new ArrayList<CpoeServdetails>();

		try {

			if (callform.equalsIgnoreCase("coversheet")) {

				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(CpoeServdetails.class);
				criteria.add(Restrictions.eq("treatmentid", tID));
				criteria.add(Restrictions.eq("serviceid", servid));
				criteria.add(Restrictions.eq("cancel", "N"));
				criteria.add(Restrictions.eq("deleted", "N"));
				
				criteria.setMaxResults(10);
				tlistbiilall = criteria.list();

			} else {

				CpoeServdetails objCpoe = new CpoeServdetails();

				String fetchId = "";
				Calendar postDate = Calendar.getInstance();
				ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");

				int packageID = Integer.parseInt((String) resourceBundleEhat.getString("labHeadingID"));// 13
				int serviceId = Integer.parseInt((String) resourceBundleEhat.getString("packageID"));// 11
				int investigation = Integer.parseInt((String) resourceBundleEhat.getString("investigation"));// 12
				int casuality = Integer.parseInt((String) resourceBundleEhat.getString("casuality"));
				int physiotherapy = Integer.parseInt((String) resourceBundleEhat.getString("physiotherapy"));
				int otherservices = Integer.parseInt((String) resourceBundleEhat.getString("otherservices"));
				int radiationId = Integer.parseInt((String) resourceBundleEhat.getString("radiationId"));
				String sql = "select a.bill_details_id AS bill_details_id,a.rate AS rate, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, a.drdesk_flag AS drdesk_flag, t.category_name AS category_name, t.charges AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions, a.created_date_time AS inserted_date_time ,a.deleted AS deleted,a.cancle AS cancel,a.speciality_id as speciality_id,a.sndtolabflag as sndtolabflag,a.template_wise as template_wise  from (((ehat_bill_details_ipd a join ehat_subservice t ON (((t.service_id = a.service_id) and (t.id = a.sub_service_id)))) join ehat_service_master b ON ((b.service_id = t.service_id))) left join doctor ON ((doctor.Doctor_ID = a.doctor_id))) where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N' and a.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
						+ serviceId + "," + investigation + "," + packageID + "," + physiotherapy + "," + casuality
						+ "," + otherservices + "," + radiationId + ") and a.treatment_id='" + tID
						+ "' and a.cancle='N' and a.deleted='N' order by a.bill_details_id desc";

				Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = query.list();
				for (Map<String, Object> row : result) {
					CpoeServdetails obj = new CpoeServdetails();
					obj.setBilldetailsid((Integer) row.get("bill_details_id"));
					obj.setTreatmentid((Integer) row.get("treatment_id"));
					obj.setServiceid((Integer) row.get("service_id"));
					obj.setPaid_flag((String) row.get("paid_flag"));
					obj.setDoctor_id((Integer) row.get("doctor_id"));
					obj.setClinical_notes((String) row.get("clinical_notes"));
					obj.setInstructions((String) row.get("instructions"));
					obj.setServicename((String) row.get("service_name"));
					obj.setCategoryid((Integer) row.get("id"));
					obj.setCategoryName((String) row.get("category_name"));
					obj.setCategorycharges((Double) row.get("category_charges"));
					obj.setQuantity(((Double) row.get("quantity")).intValue());
					obj.setDocName((String) row.get("docName"));
					obj.setInserted_date_time((Date) row.get("created_date_time"));
					//obj.setEmrPer((Double) row.get("emrPer"));
					obj.setRate((Double) row.get("rate"));
					obj.setDeleted((String) row.get("deleted"));
					obj.setCancel((String) row.get("cancel"));
					obj.setSpecialityId((Integer) row.get("speciality_id"));
					obj.setTemplate_wise((String) row.get("template_wise"));

					java.util.Calendar cal = Calendar.getInstance();
					cal.setTime(obj.getInserted_date_time());
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
					cal.set(Calendar.MILLISECOND, 0);
					java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());

					obj.setCreated_date_time(sqlDate);
					obj.setSndtolabflag((String) row.get("sndtolabflag"));
					tlistbiilall.add(obj);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return tlistbiilall;

	}

	
	

}
