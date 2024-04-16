package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.util.StringUtil;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.jfree.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.DoctorRoundReport;
import com.hms.dto.LabFormula;
import com.hms.dto.LabPkg;
import com.hms.dto.LabProfile;
import com.hms.dto.LabTest;
import com.hms.dto.LabTestNormalValues;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.Treatment;
import com.hms.ehat.controller.CpoeIPDdetails;
import com.hms.ehat.controller.OTPercentageDTO;
import com.hms.ehat.controller.RegistrationController;
import com.hms.ehat.dao.DoctorDeskDao;
import com.hms.ehat.dao.IPDDao;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.ComAdvbifergationDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.CpoeOTdetails;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatComplaintFindingDto;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabRequestSlaveDTO;
import com.hms.ehat.dto.LabSlavePojo;
import com.hms.ehat.dto.LabTestResultDto;
import com.hms.ehat.dto.OperationMaster;
import com.hms.ehat.dto.RadiologyDto;
import com.hms.ehat.dto.RadiologyFileMasterDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.SubObjTemplateDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.AutosuggestionService;
import com.hms.ipd.daoimpl.IPDManagementDAOImpl;
import com.hms.ipd.dto.DoctorRoundDTO;
import com.hms.ipdbill.dao.BillDao;
import com.hms.ipdbill.dao.IpdBillDao;
import com.hms.ipdbill.daoImpl.BillDaoImpl;
import com.hms.ipdbill.daoImpl.IpdBillDaoImpl;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
import com.hms.ipdbill.dto.BillReceiptSlaveDTO;
import com.hms.ipdbill.dto.BillRefundMasterDTO;
import com.hms.ipdbill.dto.BillRefundSlaveDTO;
import com.hms.ipdbill.dto.IpdBillReceiptMasterDTO;
import com.hms.ipdbill.dto.IpdBillReceiptSlaveDTO;
import com.hms.ipdbill.dto.ServicewiseBillDTO;
import com.hms.ipdbill.dto.servicewiseIpdBillDTO;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.IndentMaster;
import com.hms.utility.ApplicationContextUtils;

@Repository
@SuppressWarnings("unchecked")
public class DoctorDeskDaoImpl implements DoctorDeskDao {

	// declaring constant for deleteServDetailsOfPackage
	private static final Integer ACCESSION_TEST_STATUS = 3;
	private static final Integer IS_EQUAL_TO_ZERO = 0;

	private static final Logger LOG = Logger.getLogger(IPDManagementDAOImpl.class.getName());

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	GenericDaoImpl genericDaoImpl;

	@Autowired
	IpdBillDao ipdBillDaoImpl;
	
	@Autowired
	BillDao billDao;

	ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String cmnAdvcPaymodeId = (String) resourceBundle.getString("cmnAdvcPaymodeId");
	Integer commonAdv = Integer.parseInt(cmnAdvcPaymodeId);

	@Override
	public int savecpoe(BillDetailsDto billDetailsDto, String queryType, String module) {

		String radId = resourceBundleEhat.getObject("radiationId").toString();
		String pathologyId = resourceBundleEhat.getObject("pathologyId").toString();
		int radiationId = Integer.parseInt(radId);
		int labId = Integer.parseInt(pathologyId);
		int records = 0;
		try {

			if (billDetailsDto.getServiceId() == labId) {

				return saveLabTest(billDetailsDto, queryType, module);
			}
			// ADDED BY BILAL
			// FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT
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
				SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
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

				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
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
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
			criteria.add(Restrictions.eq("serviceId", radiationId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", billDetailsDto.getTreatmentId()));
			// criteria.createAlias("treatmentDetails",
			// "treatment").add(Restrictions.eq("treatment.treatmentId",
			// billDetailsDto.getTreatmentId()));
			criteria.add(Restrictions.eq("subServiceId", billDetailsDto.getSubServiceId()));
			listCheck = criteria.list();
			if (listCheck.size() > 0) {
				radExist = true;
				records = 21;
			}

			if (radExist == false || queryType.equalsIgnoreCase("update")) {

				// FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT END
				sessionFactory.getCurrentSession().merge(billDetailsDto);

				// @codeBy : Vinod @codeDate : 25-July-2016 @codeFor : Generate service wise
				// bill id // start here
				Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(ServicewiseBillDTO.class);
				criteriaRec.add(Restrictions.eq("treatId", billDetailsDto.getTreatmentId()));
				criteriaRec.add(Restrictions.eq("patientId", billDetailsDto.getPatienttId()));
				criteriaRec.add(Restrictions.eq("serviceId", billDetailsDto.getServiceId()));
				criteriaRec.add(Restrictions.eq("unitId", billDetailsDto.getUnitId()));
				criteriaRec.add(Restrictions.eq("deptId", billDetailsDto.getDepartmentId()));
				criteriaRec.setProjection(Projections.rowCount());
				long count = (Long) criteriaRec.uniqueResult();
				if (count == 0) {

					Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
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

					sessionFactory.getCurrentSession().merge(obj);
				}
			}
			// @codeBy : Vinod @codeDate : 25-July-2016 @codeFor : Generate service wise
			// bill id // End here

			/*
			 * if(billDetailsDto.getServiceId()==12) { RadiologyDto radiologyDto = new
			 * RadiologyDto();
			 * 
			 * String sql = "SELECT max(bill_details_id) FROM ehat_bill_details "; SQLQuery
			 * query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); int
			 * biillid=(Integer.parseInt(query.uniqueResult().toString())) ;
			 * 
			 * int biillid=0;
			 * 
			 * List<Map<String, Object>> data = query.list(); for(Map<String, Object> row :
			 * data){ biillid=(Integer)row.get("max(bill_details_id)"); } if(biillid>0){
			 * System.err.println("id issssssss"+biillid); Session session =
			 * sessionFactory.openSession(); session.beginTransaction(); SQLQuery
			 * insertQuery = session.createSQLQuery("" +
			 * "INSERT INTO radiology_file_master(treatment_id,radio_total,idbill) values(?,?,?)"
			 * ); insertQuery.setParameter(0,billDetailsDto.getTreatmentId());
			 * insertQuery.setParameter(1,billDetailsDto.getAmount() );
			 * insertQuery.setParameter(2, biillid); int result=
			 * insertQuery.executeUpdate(); session.getTransaction().commit();
			 * radiologyDto.setIdbill(biillid);
			 * radiologyDto.setRadio_total(((float)(billDetailsDto.getAmount())));
			 * radiologyDto.setTreatment_id(billDetailsDto.getTreatmentId());
			 * sessionFactory.getCurrentSession().merge(radiologyDto);
			 * 
			 * int idradiology=0; String sql1 =
			 * "SELECT  max(idradiology_file_master) FROM radiology_file_master "; SQLQuery
			 * query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			 * query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * 
			 * List<Map<String, Object>> data2 = query1.list(); for(Map<String, Object> row
			 * : data2){ idradiology=(Integer)row.get("max(idradiology_file_master)"); }
			 * 
			 * 
			 * String flag= billDetailsDto.getUrgentflag(); int urgentflag=0; if
			 * (flag.equals('Y')){ urgentflag=1; }else urgentflag=3; if(idradiology>0){
			 * Session session = sessionFactory.openSession(); session.beginTransaction();
			 * SQLQuery insertQuery1 = session.createSQLQuery("" +
			 * "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyTestStatus,radiologyInstruction,radiologyClinicalNote,radiologyUrgentflag,doctor) values(?,?,?,?,?,?,?,?,?,?)"
			 * ); insertQuery1.setParameter(0,idradiology);
			 * insertQuery1.setParameter(1,billDetailsDto.getSubServiceId() );
			 * insertQuery1.setParameter(2,billDetailsDto.getAmount() );
			 * insertQuery1.setParameter(3, 1);
			 * insertQuery1.setParameter(4,billDetailsDto.getUpdatedDateTime());
			 * insertQuery1.setParameter(5,'Y');
			 * insertQuery1.setParameter(6,billDetailsDto.getInstructions() );
			 * insertQuery1.setParameter(7, billDetailsDto.getClinicalnotes());
			 * insertQuery1.setParameter(8,urgentflag);
			 * insertQuery1.setParameter(9,billDetailsDto.getDoctorId() );
			 * insertQuery1.executeUpdate(); session.getTransaction().commit(); }
			 * 
			 * } }
			 */
			if (billDetailsId > 0) {

				// Added By Bilal 01-02-2018
				SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
						subserviceid);
				String isCombination = subsobj.getIscombination();
				if (isCombination.equals("Y")) {
					Query update = sessionFactory.getCurrentSession().createQuery(
							"update EhatOtherBillDetailForOpdDto set doctorId = :doctorId where billDetailsId= :billDetailsId  and subServiceId= :subServiceId and deleted='N' ");

					update.setParameter("doctorId", billDetailsDto.getDoctorId());
					update.setParameter("billDetailsId", billDetailsId);
					update.setParameter("subServiceId", subserviceid);

					update.executeUpdate();
				}
				records = 2;
				
				  // Added Rohini for update ris test
				
			//	String sql = "select  COUNT(*) from ehat_radiology_test_report where bill_details_id = "
				String sql = "select  COUNT(*) from radiology_assign_test where bill_details_id = "
						+ billDetailsId +  "";
				int count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
						.intValue();

				if (count > 0) {
				
					String sql1 = "update radiology_assign_test set doctor_id='" + billDetailsDto.getDoctorId()
							+ "' where " //"idradiology_file_master=" + idradiologyFileMaster 
							+ "  bill_details_id=" + billDetailsId + "";
					Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					updateSql.executeUpdate();
					
				}
				
				////////
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
			// setBillMasterTotalsForOpd(billDetailsDto.getTreatmentId());

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	@Override
	public List<CpoeServdetails> getlistbiil(Integer tID, String callform, Integer servid) {

		List<CpoeServdetails> tlistbiilall = new ArrayList<CpoeServdetails>();

		try {

			if (callform.equalsIgnoreCase("coversheet")) {

				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CpoeServdetails.class);
				criteria.add(Restrictions.eq("treatmentid", tID));
				criteria.add(Restrictions.eq("serviceid", servid));
				criteria.setMaxResults(10);
				tlistbiilall = criteria.list();

			} else {

				/*
				 * Criteria criteria = sessionFactory.getCurrentSession()
				 * .createCriteria(CpoeServdetails.class);
				 * criteria.add(Restrictions.eq("treatmentid", tID));
				 * //criteria.add(Restrictions.eq("drdeskFlag","D"));
				 * criteria.setMaxResults(10); tlistbiilall = criteria.list();
				 */

				CpoeServdetails objCpoe = new CpoeServdetails();

				// List<CpoeIPDdetails> tlistbiilall=new ArrayList<CpoeIPDdetails>();

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
				// String sql="select a.bill_details_id AS bill_details_ipd_id, a.treatment_id
				// AS treatment_id,b.service_id AS service_id, b.service_name AS service_name,
				// t.id AS id, t.category_name AS category_name, t.charges AS category_charges,
				// a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName,
				// a.created_date_time AS created_date_time, a.paid_flag AS paid_flag,
				// a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions
				// AS instructions from ehat_bill_details_ipd a join ehat_subservice t ON
				// t.service_id = a.service_id and t.id = a.sub_service_id join
				// ehat_service_master b ON b.service_id = t.service_id left join doctor ON
				// doctor.Doctor_ID = a.doctor_id where a.delete_from='B' or a.delete_from='-'
				// and t.isCategory = 'N' and t.deleted = 'N' and b.deleted = 'N' and
				// t.service_id in(11,12,13,31,28) and a.treatment_id='"+tID+"' and (a.ot_flag =
				// 'N') and (t.deleted = 'N') and (b.deleted = 'N') order by a.bill_details_id
				// desc";
				String sql = "select a.bill_details_id AS bill_details_id, a.emrPer AS emrPer, a.rate AS rate, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, a.drdesk_flag AS drdesk_flag, t.category_name AS category_name, t.charges AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions, a.created_date_time AS inserted_date_time ,a.deleted AS deleted,a.cancle AS cancel from (((ehat_bill_details a join ehat_subservice t ON (((t.service_id = a.service_id) and (t.id = a.sub_service_id)))) join ehat_service_master b ON ((b.service_id = t.service_id))) left join doctor ON ((doctor.Doctor_ID = a.doctor_id))) where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
						+ serviceId + "," + investigation + "," + packageID + "," + physiotherapy + "," + casuality
						+ "," + otherservices + "," + radiationId + ") and a.treatment_id='" + tID
						+ "' order by a.bill_details_id desc";

				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = query.list();
				// tlistbiilall= query.list();
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

					java.util.Calendar cal = Calendar.getInstance();
					cal.setTime(obj.getInserted_date_time());
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
					cal.set(Calendar.MILLISECOND, 0);
					java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());

					obj.setCreated_date_time(sqlDate);
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
	public int deleteservdetails(String labservicelist, Integer userId, String callform) {

		int res = 0;
		String[] ary = labservicelist.split(",");
		try {
			if (callform.equalsIgnoreCase("OTP")) {
				OTPercentageDTO TPercentageDTO = new OTPercentageDTO();
				TPercentageDTO = (OTPercentageDTO) sessionFactory.getCurrentSession().get(OTPercentageDTO.class,
						Integer.parseInt(labservicelist));

				TPercentageDTO.setConfugrationflag("Y");
				TPercentageDTO.setUpdatedBy(userId);
				TPercentageDTO.setUpdatedDateTime((new Date(new java.util.Date().getTime())));
			} else if (callform.equalsIgnoreCase("IPD")) {
				// Added by Laxman for deletefrom flag.
				String deleteFromFlag = "D";
				System.out.println("id isssss=" + labservicelist);
				for (int i = 0; i < ary.length; i++) {
					System.err.println(ary[i]);
					BillDetailsIpdDto billDetailsDto = new BillDetailsIpdDto();
					billDetailsDto = (BillDetailsIpdDto) sessionFactory.getCurrentSession().get(BillDetailsIpdDto.class,
							Integer.parseInt(ary[i]));

					billDetailsDto.setDeleted("Y");
					billDetailsDto.setDeletedBy(userId);
					billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
					billDetailsDto.setDeleteFrom(deleteFromFlag);
					// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
					// sessionFactory.getCurrentSession().update(billDetailsDto);
				}

			} else if (callform.equals("OT") || callform.equals("OC")) {
				System.out.println("id isssss=" + labservicelist);
				for (int i = 0; i < ary.length; i++) {
					System.err.println(ary[i]);
					BillDetailsIpdDto billDetailsDto = new BillDetailsIpdDto();
					billDetailsDto = (BillDetailsIpdDto) sessionFactory.getCurrentSession().get(BillDetailsIpdDto.class,
							Integer.parseInt(ary[i]));

					billDetailsDto.setDeleted("Y");
					billDetailsDto.setDeletedBy(userId);
					billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
					// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
					// sessionFactory.getCurrentSession().update(billDetailsDto);
				}

			} else {
				// Added by Laxman for deletefrom flag.
				String deleteFromFlag = "B";
				if (callform.equalsIgnoreCase("DR") || callform.equalsIgnoreCase("Diagno")) {
					deleteFromFlag = "D";
				}
				for (int i = 0; i < ary.length; i++) {

					BillDetailsDto billDetailsDto = new BillDetailsDto();
					billDetailsDto = (BillDetailsDto) sessionFactory.getCurrentSession().get(BillDetailsDto.class,
							Integer.parseInt(ary[i]));

					int serviceId = billDetailsDto.getServiceId();
					int testStatus = 0;

					if (serviceId == 11 && billDetailsDto.getSndToLabFlag().equalsIgnoreCase("Y")) {

						String sqlRef = "select ifnull(test_status,0) from pathology_sample_wise_master where bil_det_id="
								+ Integer.parseInt(ary[i]);
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
						testStatus = ((Number) refQuery.uniqueResult()).intValue();
					}

					if (serviceId == 11) {

						if (testStatus <= 2) {

							billDetailsDto.setDeleted("Y");
							billDetailsDto.setDeletedBy(userId);
							billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
							billDetailsDto.setDeleteFrom(deleteFromFlag);
							// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
							// sessionFactory.getCurrentSession().update(billDetailsDto);
							res = 1;
							// delete test from pathology_sample_wise_slave slave
							 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+Integer.parseInt(ary[i]);
							 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
							 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
							
							 if(masterCount > 0) {
							 
								String sqlM="select id from pathology_sample_wise_master where bil_det_id="+Integer.parseInt(ary[i]);
								Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
								int masterId = ((Number) refQuery.uniqueResult()).intValue();
								
								
								String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='Y' where master_id="+masterId+" ";
								Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
								qUpdate.executeUpdate();
							 }
							
						} else {

							res = 3;
						}

					} 
					if (serviceId == 13) // added by Rohini Ambhore on 19-06-2023 for package test delete
					{
						res = deleteServDetailsOfPackage(billDetailsDto.getTreatmentId(), serviceId,
								Integer.parseInt(ary[i]), userId);
					} /*
						 * else{
						 * 
						 * 
						 * billDetailsDto.setDeleted("Y"); billDetailsDto.setDeletedBy(userId);
						 * billDetailsDto.setDeletedDateTime((new Date(new
						 * java.util.Date().getTime()))); billDetailsDto.setDeleteFrom(deleteFromFlag);
						 * 
						 * //billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
						 * //sessionFactory.getCurrentSession().update(billDetailsDto); //res = 5;
						 * 
						 * 
						 * }
						 */
					// addded for to delete Investigation Test
					if(serviceId == 12 || serviceId == 2) {
						billDetailsDto.setDeleted("Y");
						billDetailsDto.setDeletedBy(userId);
						billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
						billDetailsDto.setDeleteFrom(deleteFromFlag);
						// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
						// sessionFactory.getCurrentSession().update(billDetailsDto);
						res = 1;
					}
					
				}
				
				
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return res;
	}

	@Override
	public int deleteServices(String servId, String tretId, Integer uid) {

		String[] ary = servId.split(",");
		try {
			// System.out.println("id isssss="+ labservicelist);
			for (int i = 0; i < ary.length; i++) {
				System.err.println(ary[i]);
				/*
				 * BillDetailsDto billDetailsDto = new BillDetailsDto(); // billDetailsDto =
				 * (BillDetailsDto) billDetailsDto.setBillId(Integer.parseInt(ary[i]));
				 * billDetailsDto.setDeleted("Y"); billDetailsDto.setDeletedBy(uid);
				 * billDetailsDto.setDeletedDateTime((new Date(new
				 * java.util.Date().getTime())));
				 * 
				 * sessionFactory.getCurrentSession().update(billDetailsDto);
				 */

				Query query = sessionFactory.getCurrentSession().createSQLQuery(
						"update ehat_bill_details set deleted = 'Y' where treatment_id = :treatmentid and service_id =:serviceid");
				query.setParameter("treatmentid", tretId);
				query.setParameter("serviceid", ary[i]);
				int result = query.executeUpdate();

				// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
				//
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	@Override
	public int cancleServices(String servId, String tretId, String cancleType, Integer uid, String remarkcanceltest) {

		DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
		String todays_date_time = dateFormat1.format(currentDate1.getTime());

		String flag = "N";
		String[] ary = servId.split(",");
		try {
			/*
			 * for (int i = 0; i < ary.length; i++) { System.err.println("kishor"+ary[i]);
			 */

			int testStatus = 0;
			int testResultCount = 0;

			String sqlRef3 = "select ifnull(service_id,0) from ehat_bill_details where bill_details_id="
					+ Integer.parseInt(servId.trim());
			Query refQuery3 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef3);
			int serviceId = ((Number) refQuery3.uniqueResult()).intValue();

			String sqlRef4 = "select ifnull(sub_service_id,0) from ehat_bill_details where bill_details_id="
					+ Integer.parseInt(servId.trim());
			Query refQuery4 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef4);
			int SubserviceId = ((Number) refQuery4.uniqueResult()).intValue();

			if (serviceId == 11 || serviceId == 13) {

				String sqlRef = "select count(*) from pathology_sample_wise_master where treatment_id="
						+ Integer.parseInt(tretId.trim()) + " and bil_det_id=" + Integer.parseInt(servId.trim());
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				testResultCount = ((Number) refQuery.uniqueResult()).intValue();

				if (testResultCount > 0) {

					if (serviceId == 13) {

						int pkgTestStatus = 0;
						int pkgCount = 0;
						String sqlRef2 = "select ifnull(test_status,0) as testResult from pathology_sample_wise_master where treatment_id="
								+ Integer.parseInt(tretId.trim()) + " and bil_det_id="
								+ Integer.parseInt(servId.trim());
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
						query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data1 = query1.list();

						for (Map<String, Object> row : data1) {

							pkgTestStatus = ((Number) row.get("testResult")).intValue();

							if (pkgTestStatus > 2)
								pkgCount++;
						}

						if (pkgCount > 0)
							testStatus = 3;

					} else {

						String sqlRef2 = "select ifnull(test_status,0) from pathology_sample_wise_master where treatment_id="
								+ Integer.parseInt(tretId.trim()) + " and bil_det_id="
								+ Integer.parseInt(servId.trim());
						Query refQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
						testStatus = ((Number) refQuery2.uniqueResult()).intValue();
					}
				}
			}

			if (serviceId == 11 || serviceId == 13) {
				if (testStatus <= 2) {

					if (serviceId == 13) {
						String sqlcount = " select count(*) from ehat_bill_details where treatment_id ="
								+ Integer.parseInt(tretId.trim()) + " and sub_service_id =" + SubserviceId
								+ "   and deleted='N' and cancle='N' and  bill_details_id not in("
								+ Integer.parseInt(servId.trim()) + ") ";

						Query refQueryCount = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
						int count = ((Number) refQueryCount.uniqueResult()).intValue();
						int packServiceCount = 0;
						if (count <= 0) {
							Query query = sessionFactory.getCurrentSession().createSQLQuery(
									"SELECT child_sub_service_id as child_sub_service_id FROM ehat_other_bill_detail_for_opd where treatment_id="
											+ Integer.parseInt(tretId.trim()) + " AND  deleted='N' AND bill_details_id="
											+ Integer.parseInt(servId.trim()) + "");
							query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data1 = query.list();

							for (Map<String, Object> row : data1) {

								int child_sub_service_id = ((Number) row.get("child_sub_service_id")).intValue();
								sqlcount = " select count(*) from ehat_bill_details where treatment_id ="
										+ Integer.parseInt(tretId.trim()) + " and sub_service_id ="
										+ child_sub_service_id
										+ "   and deleted='N' and cancle='N' and  bill_details_id not in("
										+ Integer.parseInt(servId.trim()) + ") ";
								refQueryCount = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
								packServiceCount = ((Number) refQueryCount.uniqueResult()).intValue();

								if (packServiceCount == 0 && cancleType.equals("N")) { // added Rohini For check test
																						// under package.
									String querycheck = "SELECT count(*) FROM ehat_other_bill_detail_for_opd where treatment_id="
											+ Integer.parseInt(tretId.trim()) + "  AND child_sub_service_id="
											+ child_sub_service_id + " and deleted='N' and cancle='N' ";
									refQueryCount = sessionFactory.getCurrentSession().createSQLQuery(querycheck);
									packServiceCount = ((Number) refQueryCount.uniqueResult()).intValue();
								}

								if (packServiceCount > 0) {
									return 4;
								}
							}

						}

						if (count > 0) {
							return 4;
						} else {
							Query query = sessionFactory.getCurrentSession()
									.createSQLQuery("update ehat_bill_details set cancle = '" + cancleType
											+ "',canceled_by = " + uid + ", canceled_date_time = '" + todays_date_time
											+ "', remarkcanceltest = '" + remarkcanceltest
											+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
							query.setParameter("treatmentid", tretId);
							query.setParameter("serviceid", servId);
							int result = query.executeUpdate();
							
							

							// if(tretId != null || !(tretId.equals("")))
							// setBillMasterTotalsForOpd(Integer.parseInt(tretId));
							
							// delete or revert  test from pathology_sample_wise_slave slave
							
							 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+servId;
							 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
							 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
							
							 if(masterCount > 0) {
							 
								String sqlM="select group_concat(id) from pathology_sample_wise_master where bil_det_id="+servId;
								Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
								String  masterIds = ((String) refQuery.uniqueResult());
								
								String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='"+cancleType+"' where master_id in ("+masterIds+") ";
								Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
								qUpdate.executeUpdate();
							 }
						}

						if (serviceId == 13) {

							Query query = sessionFactory.getCurrentSession()
									.createSQLQuery("update ehat_other_bill_detail_for_opd set cancle = '" + cancleType
											+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
							query.setParameter("treatmentid", tretId);
							query.setParameter("serviceid", servId);
							int result = query.executeUpdate();

							// if(tretId != null || !(tretId.equals("")))
							// setBillMasterTotalsForOpd(Integer.parseInt(tretId));
							
							// delete or revert  test from pathology_sample_wise_slave slave
							 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+servId;
							 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
							 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
							 
							 if(masterCount > 0) {
								String sqlM="select group_concat(id) from pathology_sample_wise_master where bil_det_id="+servId;
								Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
								String  masterIds = ((String) refQuery.uniqueResult());
								
								String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='"+cancleType+"' where master_id in ("+masterIds+") ";
								Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
								qUpdate.executeUpdate();
							 }

						}
					} else if (serviceId == 11) {

						String sqlcount = " select count(*) from ehat_bill_details where treatment_id ="
								+ Integer.parseInt(tretId.trim()) + " and sub_service_id =" + SubserviceId
								+ "   and deleted='N' and cancle='N' and  bill_details_id not in("
								+ Integer.parseInt(servId.trim()) + ") ";

						Query refQueryCount = sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
						int count = ((Number) refQueryCount.uniqueResult()).intValue();
						int packServiceCount = 0;
						if (count <= 0) {
							Query query = sessionFactory.getCurrentSession().createSQLQuery(
									"SELECT count(*) FROM ehat_other_bill_detail_for_opd where treatment_id="
											+ Integer.parseInt(tretId.trim())
											+ " and deleted='N' and cancle='N' and child_sub_service_id=" + SubserviceId
											+ " ");
							packServiceCount = ((Number) query.uniqueResult()).intValue();
							if (packServiceCount > 0) {
								return 4;
							}

						}

						if (count > 0) {
							return 4;
						} else {
							Query query = sessionFactory.getCurrentSession().createSQLQuery(
									// "update ehat_bill_details set cancle = '"+cancleType+"',canceled_by = "+ uid
									// +", canceled_date_time = '"+ todays_date_time +"' where treatment_id =
									// :treatmentid and bill_details_id =:serviceid");
									"update ehat_bill_details set cancle = '" + cancleType + "',canceled_by = " + uid
											+ ", canceled_date_time = '" + todays_date_time + "', remarkcanceltest = '"
											+ remarkcanceltest
											+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
							query.setParameter("treatmentid", tretId);
							query.setParameter("serviceid", servId);
							int result = query.executeUpdate();

							// if(tretId != null || !(tretId.equals("")))
							// setBillMasterTotalsForOpd(Integer.parseInt(tretId));
							
							// delete or revert  test from pathology_sample_wise_slave slave
							 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+servId;
							 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
							 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
							 if(masterCount > 0) {
							String sqlM="select group_concat(id) from pathology_sample_wise_master where bil_det_id="+servId;
							Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
							String  masterIds = ((String) refQuery.uniqueResult());
							
							String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='"+cancleType+"' where master_id in ("+masterIds+") ";
							Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
							qUpdate.executeUpdate();
							 }
						}

						if (serviceId == 13) {

							Query query = sessionFactory.getCurrentSession()
									.createSQLQuery("update ehat_other_bill_detail_for_opd set cancle = '" + cancleType
											+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
							query.setParameter("treatmentid", tretId);
							query.setParameter("serviceid", servId);
							int result = query.executeUpdate();

							// if(tretId != null || !(tretId.equals("")))
							// setBillMasterTotalsForOpd(Integer.parseInt(tretId));
							
							// delete or rever  test from pathology_sample_wise_slave slave
							
							 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+servId;
							 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
							 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
							 if(masterCount > 0) {
									String sqlM="select group_concat(id) from pathology_sample_wise_master where bil_det_id="+servId;
									Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
									String  masterIds = ((String) refQuery.uniqueResult());
									
									String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='"+cancleType+"' where master_id in ("+masterIds+") ";
									Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
									qUpdate.executeUpdate();
							 }

						}

					}

					if (serviceId == 12) {
						Query query = sessionFactory.getCurrentSession()
								.createSQLQuery("update ehat_bill_details set cancle = '" + cancleType
										+ "',canceled_by = " + uid + ", canceled_date_time = '" + todays_date_time
										+ "', remarkcanceltest = '" + remarkcanceltest
										+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
						query.setParameter("treatmentid", tretId);
						query.setParameter("serviceid", servId);
						int result = query.executeUpdate();

						// Added by ROhini .
						String sql1 = "update radiology_assign_test set radiologyTestStatus='" + cancleType// +"' where
																											// idradiology_test="+idRadiologyTest+"
																											// and
																											// idtest_radiology="+idTestRadiology
								+ "' where bill_details_id = :billdetailsid";
						query.setParameter("billdetailsid", servId);
						Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql1);
						updateSql.executeUpdate();

					}

				} else {

					return 3;
				}
			} else {
				Query query = sessionFactory.getCurrentSession()
						.createSQLQuery("update ehat_bill_details set cancle = '" + cancleType + "',canceled_by = "
								+ uid + ", canceled_date_time = '" + todays_date_time + "', remarkcanceltest = '"
								+ remarkcanceltest
								+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
				query.setParameter("treatmentid", tretId);
				query.setParameter("serviceid", servId);
				int result = query.executeUpdate();
			}
			// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
			//
			/* } */

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	@Override
	public int saveIpd(BillDetailsIpdDto billDetailsIpdDto, String queryType, String module) {

		List<BillDetailsIpdDto> listBedIpdDto = new ArrayList<BillDetailsIpdDto>();

		int a = billDetailsIpdDto.getSubServiceId();
		int records = 0;
		String sname = null;

		String radId = resourceBundleEhat.getObject("radiationId").toString();
		int radiationId = Integer.parseInt(radId);

		String pathologyId = resourceBundleEhat.getObject("pathologyId").toString();
		int labId = Integer.parseInt(pathologyId);
		
		String pServiceId = resourceBundleEhat.getObject("pharmacy").toString();
		int pharmacyServiceId = Integer.parseInt(pServiceId);

		try {

			if (billDetailsIpdDto.getServiceId() == labId) {

				return saveIpdLabTest(billDetailsIpdDto, queryType, module);
			}
			
			

			// ADDED BY BILAL
			// FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT
			int treatmentId = billDetailsIpdDto.getTreatmentId();
			int patientId = billDetailsIpdDto.getPatienttId();
			int sponsorid = billDetailsIpdDto.getSponsorId();
			int chargesSid = billDetailsIpdDto.getChargesSlaveId();
			String receiptOf = billDetailsIpdDto.getReceiptOf();
			int subserviceid = 0;
			double charges = 0.0;
			double calDec = 0;
			double copycalc = 0;
			int recSlaveIdIPD = billDetailsIpdDto.getRecSlaveIdIPD();
			subserviceid = billDetailsIpdDto.getSubServiceId();
			int billDetailsId = billDetailsIpdDto.getBillDetailsId();
			if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("IpdSponsor") && recSlaveIdIPD > 0
					&& subserviceid != -2) {

				// GETTING CHARGES OF SERVICE
				SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
						subserviceid);
				charges = subsobj.getCharges();
				billDetailsIpdDto.setRate(charges);

				charges = charges * billDetailsIpdDto.getQuantity();

				calDec = (charges * billDetailsIpdDto.getConcessionPer() / 100);
				copycalc = charges - calDec;

				billDetailsIpdDto.setConcession(calDec);
				billDetailsIpdDto.setAmount(charges);
				billDetailsIpdDto.setCoPay(copycalc);

			} else if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("general") && recSlaveIdIPD > 0
					&& subserviceid != -1) {
				int iscomser = 0;
				int iscomserl = 0;
				int hallId = 0;
				int hallSlaveId = 0;
				subserviceid = billDetailsIpdDto.getSubServiceId();

				// GETTING CHARGES OF SERVICE
				String query1 = "SELECT ifnull(charges, 0) FROM ehat_configuration_services where charges_id="
						+ sponsorid + " and chargesSlave_id=" + chargesSid + " and is_com_servId=" + iscomser
						+ " and is_com_servlastId=" + iscomserl + " and hall_id=" + hallId + " and hallSlave_id="
						+ hallSlaveId + " and service_id=" + subserviceid + " and deleted='N'";

				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
				charges = (Double) query.uniqueResult();
				billDetailsIpdDto.setOtherRate(charges);

				if (charges > 0) {
					charges = charges * billDetailsIpdDto.getQuantity();

					calDec = (charges * billDetailsIpdDto.getConcessionPer() / 100);
					copycalc = charges - calDec;
				} else {
					charges = billDetailsIpdDto.getOtherRate() * billDetailsIpdDto.getQuantity();

					calDec = (charges * billDetailsIpdDto.getConcessionPer() / 100);
					copycalc = charges - calDec;
				}

				billDetailsIpdDto.setOtherConcession(calDec);
				billDetailsIpdDto.setOtherAmount(charges);
				billDetailsIpdDto.setOtherPay(copycalc);

			}

			String obf = genericDaoImpl.getStringValOfObject("ehat_bill_details_ipd", "on_bed_flag", billDetailsId,
					"bill_details_id");
			System.err.println("-=-=-=Onb" + obf);
			char aa;
			if (obf == null) {
				aa = 'N';
			} else {
				aa = obf.charAt(0);
			}

			billDetailsIpdDto.setOnBedFlag(aa);
			// FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT END
			String sql1 = "SELECT category_name as sub_name FROM ehat_subservice where id='" + a + "'";

			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> data1 = query1.list();

			for (Map<String, Object> row : data1) {

				BillDetailsIpdDto objDTO1 = new BillDetailsIpdDto();

				sname = (String) row.get("sub_name");
				listBedIpdDto.add(objDTO1);
				objDTO1 = null;

			}

			boolean radExist = false;

			List<BillDetailsIpdDto> listCheck = new ArrayList<BillDetailsIpdDto>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
			criteria.add(Restrictions.eq("serviceId", radiationId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", billDetailsIpdDto.getTreatmentId()));
			criteria.add(Restrictions.eq("subServiceId", billDetailsIpdDto.getSubServiceId()));
			listCheck = criteria.list();

			if (listCheck.size() > 0) {
				radExist = true;
				records = 6;
			}
			
			if(billDetailsIpdDto.getServiceId() == pharmacyServiceId) {
				
				return saveIpdPharmacyBill(billDetailsIpdDto, queryType, module,pharmacyServiceId);
			}

			if (radExist == false || queryType.equalsIgnoreCase("update")) {
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
				// @codeBy : Vinod @codeDate : 25-July-2016 @codeFor : Generate service wise
				// bill id // start here
				Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(servicewiseIpdBillDTO.class);
				criteriaRec.add(Restrictions.eq("treatId", billDetailsIpdDto.getTreatmentId()));
				criteriaRec.add(Restrictions.eq("patientId", billDetailsIpdDto.getPatienttId()));
				criteriaRec.add(Restrictions.eq("serviceId", billDetailsIpdDto.getServiceId()));
				criteriaRec.add(Restrictions.eq("unitId", billDetailsIpdDto.getUnitId()));
				criteriaRec.add(Restrictions.eq("deptId", billDetailsIpdDto.getDepartmentId()));
				criteriaRec.setProjection(Projections.rowCount());
				long count = (Long) criteriaRec.uniqueResult();
				if (count == 0) {

					Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
					criteriaMax.setProjection(Projections.max("billDetailsId"));
					Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();

					servicewiseIpdBillDTO obj = new servicewiseIpdBillDTO();
					obj.setBillMasterId(billDetailsIpdDto.getBillId());
					obj.setBillDetailsId(maxBillDetailsId);
					obj.setUnitId(billDetailsIpdDto.getUnitId());
					obj.setPatientId(billDetailsIpdDto.getPatienttId());
					obj.setDeptId(billDetailsIpdDto.getDepartmentId());
					obj.setTreatId(billDetailsIpdDto.getTreatmentId());
					obj.setServiceId(billDetailsIpdDto.getServiceId());
					obj.setCreatedBy(billDetailsIpdDto.getCreatedBy());
					obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());

					sessionFactory.getCurrentSession().merge(obj);
				}
			}
			// @codeBy : Vinod @codeDate : 25-July-2016 @codeFor : Generate service wise
			// bill id // End here
			if (billDetailsId > 0) {

				// Added By Bilal 01-02-2018
				SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
						subserviceid);
				String isCombination = subsobj.getIscombination();
				if (isCombination.equals("Y")) {
					Query update = sessionFactory.getCurrentSession().createQuery(
							"update EhatOtherBillDetailForIpdDto set doctorId = :doctorId where billDetailsId= :billDetailsId  and subServiceId= :subServiceId and deleted='N' ");

					update.setParameter("doctorId", billDetailsIpdDto.getDoctorId());
					update.setParameter("billDetailsId", billDetailsId);
					update.setParameter("subServiceId", subserviceid);

					update.executeUpdate();
				}
				records = 2;
			} else {
				if (listCheck.size() > 0 && queryType.equalsIgnoreCase("insert"))
					records = 6;
				else
					records = 1;
			}
			// Sanjay Kr Shah for sending investigation test to Ris when check box is
			// checked in ipd bill
			if (billDetailsIpdDto.getSendToRisIpdBill().equals("Y")) {

				Session session = sessionFactory.openSession(); // create session object from the session factory
				session.beginTransaction();

				/*
				 * String sql =""; Long billDetails = ((BigInteger)
				 * sessionFactory.getCurrentSession().createSQLQuery("SELECT LAST_INSERT_ID()").
				 * uniqueResult()).longValue();
				 */
                   if(billDetailsId == 0) {
				String sql = "SELECT max(bill_details_id) FROM ehat_bill_details_ipd ";
				int billDetails = ((Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
						.intValue();

				sql = "select sub_Service_id from ehat_bill_details_ipd where bill_details_id =" + billDetails
						+ " and treatment_id =" + billDetailsIpdDto.getTreatmentId();
				Integer subServiceid = ((Integer) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
						.intValue();

				sql = "select count(*) from radiology_file_master where treatment_id = '"
						+ billDetailsIpdDto.getTreatmentId() + "'";
				int count_id = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
						.intValue();
				if (count_id < 1) {
					SQLQuery sql2 = sessionFactory.getCurrentSession().createSQLQuery(
							"INSERT INTO radiology_file_master(treatment_id,radio_total,idbill,sub_service_id,unit_id,inserted_by,inserted_date_time,patient_id) values(?,?,?,?,?,?,?,?)");
					sql2.setParameter(0, billDetailsIpdDto.getTreatmentId());
					sql2.setParameter(1, billDetailsIpdDto.getAmount());
					sql2.setParameter(2, billDetailsIpdDto.getBillId());
					sql2.setParameter(3, billDetailsIpdDto.getSubServiceId());
					sql2.setParameter(4, billDetailsIpdDto.getUnitId());
					sql2.setParameter(5, billDetailsIpdDto.getCreatedBy());
					sql2.setParameter(6, billDetailsIpdDto.getCreatedDateTime());
					sql2.setParameter(7, billDetailsIpdDto.getPatienttId());
					sql2.executeUpdate();

				}

				String sqlqry = "select max(idradiology_file_master) from radiology_file_master where treatment_id='"
						+ billDetailsIpdDto.getTreatmentId() + "'";
				int idradiology_file_master = ((Integer) sessionFactory.getCurrentSession().createSQLQuery(sqlqry)
						.uniqueResult()).intValue();

				SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery(""
						+ "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyUrgentflag,radiologyRISFlag,radiologyInstruction,radiologyClinicalNote,bill_details_id,doctor_id) values(?,?,?,?,?,?,?,?,?,?,?)");
				insertQuery1.setParameter(0, idradiology_file_master);
				insertQuery1.setParameter(1, subServiceid);
				insertQuery1.setParameter(2, billDetailsIpdDto.getAmount());
				insertQuery1.setParameter(3, billDetailsIpdDto.getCreatedBy());
				insertQuery1.setParameter(4, new Date());
				insertQuery1.setParameter(5, 1);
				insertQuery1.setParameter(6, 'Y');
				insertQuery1.setParameter(7, billDetailsIpdDto.getInstructions());
				insertQuery1.setParameter(8, billDetailsIpdDto.getClinicalnotes());
				insertQuery1.setParameter(9, billDetails);
				insertQuery1.setParameter(10, billDetailsIpdDto.getDoctorId());
				insertQuery1.executeUpdate();

				sql = "update ehat_bill_details_ipd set sndtorisflag='Y' where bill_details_id= " + billDetails;
				Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int response = updateSql.executeUpdate();

				session.getTransaction().commit(); // commit the transaction
				session.close();
                   }else if(billDetailsId > 0) {
                	   
       				//session.beginTransaction();
       				
       				String sqlSub = "select sub_Service_id from ehat_bill_details_ipd where bill_details_id =" + billDetailsId
    						+ " and treatment_id =" + billDetailsIpdDto.getTreatmentId();
    				Integer subServiceid = ((Integer) sessionFactory.getCurrentSession().createSQLQuery(sqlSub).uniqueResult())
    						.intValue();
       				   
       				  String sql="update radiology_assign_test set idtest_radiology="+billDetailsIpdDto.getSubServiceId()+",doctor_id="+billDetailsIpdDto.getDoctorId()+"  where bill_details_id="+billDetailsId+" ";
       				   
       				   SQLQuery  q=session.createSQLQuery(sql);
       				      q.executeUpdate();
       				      
       				 String   sql2 = "update ehat_bill_details_ipd set sndtorisflag='Y' where bill_details_id="+ billDetailsId+" ";
       				//Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql2);
       				SQLQuery  updateSql=session.createSQLQuery(sql2);
       				 updateSql.executeUpdate();
       				      
       				   session.getTransaction().commit(); // commit the transaction
       				session.close();
                   }
			}
			// Ends here
			
			
			
			if (sponsorid > 0 && chargesSid > 0) {
				ipdBillDaoImpl.setRemainSanctionAmount(sponsorid, chargesSid, treatmentId, patientId);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	//added by vishant for pharmacy service add in billing @date:21-DEC-2023
	private int saveIpdPharmacyBill(BillDetailsIpdDto billDetailsIpdDto, String queryType, String module,Integer pharmacyServiceId) {
		int record=0;
	try {	
		
		if(pharmacyServiceId==billDetailsIpdDto.getServiceId()) {
			
			
		
		List<SubServiceDto> list = sessionFactory.getCurrentSession().createCriteria(SubServiceDto.class)
		.add(Restrictions.eq("serviceId", pharmacyServiceId))
		.add(Restrictions.eq("deleted", "N"))
		.list();
		
		if(list.size()>0) {
			
			SubServiceDto subServiceDto = list.get(0);
			
			//BillDetailsIpdDto billDetailsIpdDtoNew = new BillDetailsIpdDto();
			//BeanUtils.copyProperties(billDetailsIpdDtoNew, billDetailsIpdDto);
			
			List<BillDetailsIpdDto> list2 = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class)
			.add(Restrictions.eq("treatmentId", billDetailsIpdDto.getTreatmentId()))
			.add(Restrictions.eq("deleted", "N"))
			.add(Restrictions.eq("serviceId", pharmacyServiceId)).list();
			
			if(list2.size()>0) {
				
				BillDetailsIpdDto billDetailsIpdDto2 = list2.get(0);
				Double amount = billDetailsIpdDto2.getAmount();
				double coPay = billDetailsIpdDto2.getCoPay();
				
				billDetailsIpdDto.setBillDetailsId(billDetailsIpdDto2.getBillDetailsId());
				billDetailsIpdDto.setAmount(billDetailsIpdDto.getAmount()+amount);
				billDetailsIpdDto.setCoPay(billDetailsIpdDto.getCoPay()+coPay);
				billDetailsIpdDto.setRate(billDetailsIpdDto.getCoPay()+coPay);
				
				
			}
			
			
			
			billDetailsIpdDto.setSubServiceId(subServiceDto.getSubId());
			billDetailsIpdDto.setServiceId(pharmacyServiceId);
			billDetailsIpdDto.setSubservicesname(subServiceDto.getCategoryname());
			
			sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
			
			
			// change status for billing pharmacy 
			Integer treatmentId = billDetailsIpdDto.getTreatmentId();
			// String sqlQuery="";
			if (treatmentId > 0) {

				// update indent sale billing status
				String sqlQuery = "update pharma_indent_master set indent_billing='Y' where indent_treatement_id="
						+ treatmentId;
				sessionFactory.getCurrentSession().createSQLQuery(sqlQuery).executeUpdate();

				// update patient sale billing status
				String sqlQuery2 = "update pharma_patient_sales_bill_master set patient_sale_billing='Y' where patient_sale_treatmentId="
						+ treatmentId;
				sessionFactory.getCurrentSession().createSQLQuery(sqlQuery2).executeUpdate();

				// update ot drug billing status
				String sqlQuery3 = "update ehat_other_bill_detail_for_ipd set billing_status='Y' where treatment_id="
						+ treatmentId;
				sessionFactory.getCurrentSession().createSQLQuery(sqlQuery3).executeUpdate();

			}

			//sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
			// @codeBy : Vishant @codeDate : 21-Dec-2023 @codeFor : Generate service wise
			// bill id // start here
			Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(servicewiseIpdBillDTO.class);
			criteriaRec.add(Restrictions.eq("treatId", billDetailsIpdDto.getTreatmentId()));
			criteriaRec.add(Restrictions.eq("patientId", billDetailsIpdDto.getPatienttId()));
			criteriaRec.add(Restrictions.eq("serviceId", billDetailsIpdDto.getServiceId()));
			criteriaRec.add(Restrictions.eq("unitId", billDetailsIpdDto.getUnitId()));
			criteriaRec.add(Restrictions.eq("deptId", billDetailsIpdDto.getDepartmentId()));
			criteriaRec.setProjection(Projections.rowCount());
			long count = (Long) criteriaRec.uniqueResult();
			if (count == 0) {

				Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
				criteriaMax.setProjection(Projections.max("billDetailsId"));
				Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();

				servicewiseIpdBillDTO obj = new servicewiseIpdBillDTO();
				obj.setBillMasterId(billDetailsIpdDto.getBillId());
				obj.setBillDetailsId(maxBillDetailsId);
				obj.setUnitId(billDetailsIpdDto.getUnitId());
				obj.setPatientId(billDetailsIpdDto.getPatienttId());
				obj.setDeptId(billDetailsIpdDto.getDepartmentId());
				obj.setTreatId(billDetailsIpdDto.getTreatmentId());
				obj.setServiceId(billDetailsIpdDto.getServiceId());
				obj.setCreatedBy(billDetailsIpdDto.getCreatedBy());
				obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());
				//wait();
				sessionFactory.getCurrentSession().merge(obj);
				return record=1;
			}
			
			
			
			
		}
	}
	}
	catch (Exception e) {
		e.printStackTrace();
		return record;
	}
		return record;
	}

	@Override
	public int deletesIpdSrvDetails(String labservicelist, Integer userId) {
		System.err.println("DeleteIn= " + labservicelist);
		int testStatus = 0;
		int testResultCount = 0;
		String[] ary = labservicelist.split(",");
		try {
			System.out.println("id isssss=" + labservicelist);
			for (int i = 0; i < ary.length; i++) {
				System.err.println("HIii" + ary[i]);
				/*
				 * BillDetailsIpdDto billDetailsIpdDto = new BillDetailsIpdDto();
				 * billDetailsIpdDto = (BillDetailsIpdDto) sessionFactory
				 * .getCurrentSession().get(BillDetailsIpdDto.class, Integer.parseInt(ary[i]));
				 * System.err.println("HIii"+ary[i]); billDetailsIpdDto.setDeleted("Y");
				 * billDetailsIpdDto.setDeletedBy(userId);
				 * billDetailsIpdDto.setDeletedDateTime((new Date(new
				 * java.util.Date().getTime())));
				 */
				// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
				// sessionFactory.getCurrentSession().update(billDetailsDto);
				
				String sqlTreatId= "select ifnull(treatment_id,0) from ehat_bill_details_ipd where bill_details_id="
						+ ary[i];
				Query queryTreatId = sessionFactory.getCurrentSession().createSQLQuery(sqlTreatId);
				int treatmentId = ((Number) queryTreatId.uniqueResult()).intValue();
				
				
				String sqlRef3 = "select ifnull(service_id,0) from ehat_bill_details_ipd where bill_details_id="
						+ ary[i];
				Query refQuery3 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef3);
				int serviceId = ((Number) refQuery3.uniqueResult()).intValue();

				String sqlRef4 = "select ifnull(sub_service_id,0) from ehat_bill_details_ipd where bill_details_id="
						+ ary[i];
				Query refQuery4 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef4);
				int SubserviceId = ((Number) refQuery4.uniqueResult()).intValue();
				
				if (serviceId == 11 || serviceId == 13) {


					String sqlRef = "select count(*) from pathology_sample_wise_master where treatment_id="
							+ treatmentId + " and bil_det_id=" +  ary[i]+" and dept_id=2 ";
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					testResultCount = ((Number) refQuery.uniqueResult()).intValue();
					
					  if(testResultCount > 0) {
						  if (serviceId == 13) {

								int pkgTestStatus = 0;
								int pkgCount = 0;
								String sqlRef2 = "select ifnull(test_status,0) as testResult from pathology_sample_wise_master where treatment_id="
										+ treatmentId + " and bil_det_id="	+  ary[i]+" and dept_id=2 ";
								SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
								query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> data1 = query1.list();

								for (Map<String, Object> row : data1) {

									pkgTestStatus = ((Number) row.get("testResult")).intValue();

									if (pkgTestStatus > 2)
										pkgCount++;
								}

								if (pkgCount > 0)
									testStatus = 3;

							} else {

								String sqlRef2 = "select ifnull(test_status,0) from pathology_sample_wise_master where treatment_id="
										+treatmentId + " and bil_det_id="+  ary[i] + " and dept_id=2";
								Query refQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
								testStatus = ((Number) refQuery2.uniqueResult()).intValue();
							}
					  }
					if(testStatus > 2) {
						return 3;
					}
				
				}
				

				Query query = sessionFactory.getCurrentSession().createSQLQuery(
						"update ehat_bill_details_ipd set deleted = 'Y' ,delete_from = 'B',deleted_by="+userId+" where bill_details_id =:billDetailsId");
				// query.setParameter("treatmentid", tretId);
				query.setParameter("billDetailsId", ary[i]);
				int result = query.executeUpdate();
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	@Override
	public int deleteIpdServices(String servId, String tretId, Integer userId) {
		System.err.println("servId= " + servId);
		System.err.println("tretId= " + tretId);
		System.err.println("userId= " + userId);

		String[] ary = servId.split(",");
		try {
			// System.out.println("id isssss="+ labservicelist);
			for (int i = 0; i < ary.length; i++) {
				System.err.println(ary[i]);
				/*
				 * BillDetailsDto billDetailsDto = new BillDetailsDto(); // billDetailsDto =
				 * (BillDetailsDto) billDetailsDto.setBillId(Integer.parseInt(ary[i]));
				 * billDetailsDto.setDeleted("Y"); billDetailsDto.setDeletedBy(uid);
				 * billDetailsDto.setDeletedDateTime((new Date(new
				 * java.util.Date().getTime())));
				 * 
				 * sessionFactory.getCurrentSession().update(billDetailsDto);
				 */

				Query query = sessionFactory.getCurrentSession().createSQLQuery(
						"update ehat_bill_details_ipd set deleted = 'Y', delete_from = 'B',deleted_by="+userId+" where treatment_id = :treatmentid and service_id =:serviceid");
				query.setParameter("treatmentid", tretId);
				query.setParameter("serviceid", ary[i]);
				int result = query.executeUpdate();

				// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
				//
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	@Override
	public int cancleIpdServices(String servId, String tretId, String cancleType, Integer userId,String remarkcanceltest) {
		String flag = "N";
		String[] ary = servId.split(",");
		int testStatus = 0;
		int testResultCount = 0;
		try {
			String sqlRef3 = "select ifnull(service_id,0) from ehat_bill_details_ipd where bill_details_id="
					+ Integer.parseInt(servId.trim());
			Query refQuery3 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef3);
			int serviceId = ((Number) refQuery3.uniqueResult()).intValue();

			String sqlRef4 = "select ifnull(sub_service_id,0) from ehat_bill_details_ipd where bill_details_id="
					+ Integer.parseInt(servId.trim());
			Query refQuery4 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef4);
			int SubserviceId = ((Number) refQuery4.uniqueResult()).intValue();
			
			if (serviceId == 11 || serviceId == 13) {

				String sqlRef = "select count(*) from pathology_sample_wise_master where treatment_id="
						+ Integer.parseInt(tretId.trim()) + " and bil_det_id=" + Integer.parseInt(servId.trim());
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				testResultCount = ((Number) refQuery.uniqueResult()).intValue();
				
				  if(testResultCount > 0) {
					  if (serviceId == 13) {

							int pkgTestStatus = 0;
							int pkgCount = 0;
							String sqlRef2 = "select ifnull(test_status,0) as testResult from pathology_sample_wise_master where treatment_id="
									+ Integer.parseInt(tretId.trim()) + " and bil_det_id="
									+ Integer.parseInt(servId.trim());
							SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
							query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> data1 = query1.list();

							for (Map<String, Object> row : data1) {

								pkgTestStatus = ((Number) row.get("testResult")).intValue();

								if (pkgTestStatus > 2)
									pkgCount++;
							}

							if (pkgCount > 0)
								testStatus = 3;

						} else {

							String sqlRef2 = "select ifnull(test_status,0) from pathology_sample_wise_master where treatment_id="
									+ Integer.parseInt(tretId.trim()) + " and bil_det_id="
									+ Integer.parseInt(servId.trim());
							Query refQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
							testStatus = ((Number) refQuery2.uniqueResult()).intValue();
						}
				  }
				if(testStatus > 2) {
					return 3;
				}
			}
			DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
			String todays_date_time = dateFormat1.format(currentDate1.getTime());

			
			System.err.println("cancleType====>" + cancleType);
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_bill_details_ipd set cancle = '" + cancleType
							+ "' ,canceled_by = " + userId + ", canceled_date_time = '" + todays_date_time
							+ "', remarkcanceltest = '" + remarkcanceltest
							+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
			query.setParameter("treatmentid", tretId);
			query.setParameter("serviceid", servId);
			int result = query.executeUpdate();

			// billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
			//
			/* } */

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	@Override
	public int savecpoeOT(BillDetailsIpdDto billDetailsIpdDto, String queryType, String callfrom) {

		/*
		 * if (billDetailsDto.getDoctorId()==0) { billDetailsDto.setDoctorId(null); }
		 */

		String radId = resourceBundleEhat.getObject("radiationId").toString();
		int radiationId = Integer.parseInt(radId);

		int records = 0;
		try {
			boolean radExist = false;

			List<BillDetailsDto> listCheck = new ArrayList<BillDetailsDto>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
			criteria.add(Restrictions.eq("serviceId", radiationId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", billDetailsIpdDto.getTreatmentId()));
			criteria.add(Restrictions.eq("subServiceId", billDetailsIpdDto.getSubServiceId()));
			listCheck = criteria.list();
			if (listCheck.size() > 0) {
				radExist = true;
				records = 2;
			}

			if (radExist == false) {
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
			}

			if (!callfrom.equals("OC")) {
				if (billDetailsIpdDto.getServiceId() == 12) {
					RadiologyDto radiologyDto = new RadiologyDto();

					String sql = "SELECT max(bill_details_id) FROM ehat_bill_details ";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					/*
					 * int biillid=(Integer.parseInt(query.uniqueResult().toString())) ;
					 */
					int biillid = 0;
					/*
					 * List<Map<String, Object>> data = query.list(); for(Map<String, Object> row :
					 * data){ biillid=(Integer)row.get("max(bill_details_id)"); } if(biillid>0){
					 * System.err.println("id issssssss"+biillid); Session session =
					 * sessionFactory.openSession(); session.beginTransaction(); SQLQuery
					 * insertQuery = session.createSQLQuery("" +
					 * "INSERT INTO radiology_file_master(treatment_id,radio_total,idbill) values(?,?,?)"
					 * ); insertQuery.setParameter(0,billDetailsDto.getTreatmentId());
					 * insertQuery.setParameter(1,billDetailsDto.getAmount() );
					 * insertQuery.setParameter(2, biillid); int result=
					 * insertQuery.executeUpdate(); session.getTransaction().commit();
					 * 
					 * radiologyDto.setIdbill(biillid);
					 * radiologyDto.setRadio_total(((billDetailsIpdDto.getAmount().floatValue())));
					 * radiologyDto.setTreatment_id(billDetailsIpdDto.getTreatmentId());
					 * sessionFactory.getCurrentSession().merge(radiologyDto);
					 * 
					 * int idradiology=0; String sql1 =
					 * "SELECT  max(idradiology_file_master) FROM radiology_file_master "; SQLQuery
					 * query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					 * query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					 * 
					 * List<Map<String, Object>> data2 = query1.list(); for(Map<String, Object> row
					 * : data2){ idradiology=(Integer)row.get("max(idradiology_file_master)"); }
					 * 
					 * 
					 * String flag= billDetailsIpdDto.getUrgentFlag(); int urgentflag=0; if
					 * (flag.equals('Y')){ urgentflag=3; }else urgentflag=1;
					 * 
					 * if(idradiology>0){ Session session = sessionFactory.openSession();
					 * session.beginTransaction(); SQLQuery insertQuery1 = session.createSQLQuery(""
					 * +
					 * "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyTestStatus,radiologyInstruction,radiologyClinicalNote,radiologyUrgentflag,doctor) values(?,?,?,?,?,?,?,?,?,?)"
					 * ); insertQuery1.setParameter(0,idradiology);
					 * insertQuery1.setParameter(1,billDetailsIpdDto.getSubServiceId() );
					 * insertQuery1.setParameter(2,billDetailsIpdDto.getAmount() );
					 * insertQuery1.setParameter(3, 1);
					 * insertQuery1.setParameter(4,billDetailsIpdDto.getUpdatedDateTime());
					 * insertQuery1.setParameter(5,'Y');
					 * insertQuery1.setParameter(6,billDetailsIpdDto.getInstructions() );
					 * insertQuery1.setParameter(7, billDetailsIpdDto.getClinicalnotes());
					 * insertQuery1.setParameter(8,urgentflag);
					 * insertQuery1.setParameter(9,billDetailsIpdDto.getDoctorId() );
					 * insertQuery1.executeUpdate(); session.getTransaction().commit(); }
					 * 
					 * }
					 */
				}
			}
			if (billDetailsIpdDto.getCountot() > 0) {
				String sql4 = "update treatmentoperationsmanage set flag='N'" + " where treatmentOperationsID ="
						+ billDetailsIpdDto.getCountot() + " ";
				SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);
				query4.executeUpdate();
			}

			records = 1;
			if (listCheck.size() > 0) {
				radExist = true;
				records = 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	@Override
	public List<CpoeOTdetails> getlistservciesotcope(Integer tID, String callform, Integer treatmentoperationid) {
		List<CpoeOTdetails> tlistbiilall = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CpoeOTdetails.class);

			if (callform.equals("OC")) {
				criteria.add(Restrictions.eq("drdesk_flag", "C"));
				criteria.add(Restrictions.eq("count_ot", treatmentoperationid));
			} else {
				criteria.add(Restrictions.eq("drdesk_flag", "N"));
			}
			criteria.add(Restrictions.eq("treatmentid", tID));
			criteria.setMaxResults(10);
			tlistbiilall = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return tlistbiilall;
	}

	@Override
	public List<CpoeIPDdetails> getlistservciesipdcope(Integer tID, String callform) {

		List<CpoeIPDdetails> tlistbiilall = null;

		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CpoeIPDdetails.class);
			criteria.add(Restrictions.eq("treatmentid", tID));
			criteria.setMaxResults(10);
			tlistbiilall = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return tlistbiilall;
	}

	// @author BILAL to on off flow of billing
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String receiptOFOPD = (String) resourceBundleEhat.getString("receiptOFOPD");
	String receiptOFIPD = (String) resourceBundleEhat.getString("receiptOFIPD");

	/********
	 * @author :BILAL
	 * @date :03-JULY-2017
	 * @code :for receipt update of OPD
	 *******/
	@Override
	public int updateOPDrecipt(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {
		int records = 0;

		if (receiptOFOPD.equals("off")) {
			updateOPDreciptOffFlow(billDetailsDto, request, queryType);
			records = 2;
		} else {
			updateOPDreciptOnFlow(billDetailsDto, request, queryType);
			records = 2;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @date :03-JULY-2017
	 * @code :for receipt update on OPD on flow
	 *******/
	public int updateOPDreciptOnFlow(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {

		int records = 0;
		int sponsorid = billDetailsDto.getSponsorId();
		int chargesSid = billDetailsDto.getChargesSlaveId();
		String receiptOf = billDetailsDto.getReceiptOf();
		try {
			Integer receiptSlave = billDetailsDto.getRecSlaveId();
			BillReceiptSlaveDTO obj = (BillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptSlaveDTO.class, receiptSlave);

			Integer receiptMasterId = obj.getBillReceiptMasterId();

			// Get receipt master start
			BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, receiptMasterId);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			double remainingAmt = obje.getTotalRemain();

			// Get receipt master end

			double amountNow = billDetailsDto.getAmount();
			double concessionNow = billDetailsDto.getConcession();
			double rate = billDetailsDto.getRate();
			double quantity = billDetailsDto.getQuantity();

			double otheramt = billDetailsDto.getOtherAmount();
			double othercons = billDetailsDto.getOtherConcession();
			double otherpay = billDetailsDto.getOtherPay();
			double othercpay = billDetailsDto.getOtherCoPay();
			double otherrate = billDetailsDto.getOtherRate();

			otherpay = otheramt - othercons;
			amountNow = amountNow - concessionNow;

			double curAmt = obj.getAmount();
			double currentCon = obj.getConcession();

			curAmt = curAmt - currentCon;

			double diff = 0;

			// for sponsor tab receipt edit
			if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("sponsor")) {

				if (otheramt > curAmt) {

					diff = otheramt - curAmt;
					curAmtofMaster = curAmtofMaster + diff;

				} else if (otheramt < curAmt) {

					diff = curAmt - otheramt;
					curAmtofMaster = curAmtofMaster - diff;

				} else {

					diff = 0;
				}

				if (quantity > 0) {

					rate = otheramt / quantity;
				}
				obj.setAmount(otheramt);
				obj.setCoPay(othercpay);
				obj.setPay(otherpay);
				obj.setConcession(othercons);
				obj.setRate(otherrate);
				obj.setQuantity(billDetailsDto.getQuantity());

			} else {

				if (amountNow > curAmt) {

					diff = amountNow - curAmt;
					curAmtofMaster = curAmtofMaster + diff;

				} else if (amountNow < curAmt) {

					diff = curAmt - amountNow;
					curAmtofMaster = curAmtofMaster - diff;

				} else {

					diff = 0;
				}

				if (quantity > 0) {

					rate = amountNow / quantity;
				}
				obj.setAmount(billDetailsDto.getAmount());
				obj.setCoPay(billDetailsDto.getCoPay());
				obj.setPay(billDetailsDto.getPay());
				obj.setConcession(billDetailsDto.getConcession());
				obj.setRate(billDetailsDto.getRate());
				obj.setQuantity(billDetailsDto.getQuantity());
				obj.setRate(rate);
			}

			obj.setServiceId(billDetailsDto.getServiceId());

			obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
			obj.setPaid(billDetailsDto.getCoPay());
			obj.setCompName(billDetailsDto.getSubservicesname());
			obj.setDoctorId(billDetailsDto.getDoctorId());

			// receiptMasterId to update master table for calculations

			obje.setTotalAmt(curAmtofMaster);

			if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
				remainingAmt = curAmtofMaster - currTotalPaid;
			} else {
				remainingAmt = 0;
			}

			if (obje.getTotalRemain() == 0) {

				obje.setReceiptStatus("paid");
			} else {

				obje.setReceiptStatus("unpaid");
			}

			obje.setTotalRemain(remainingAmt);

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;

	}

	/********
	 * @author :BILAL
	 * @date :03-JULY-2017
	 * @code :for receipt update off OPD on flow
	 ********/
	public int updateOPDreciptOffFlow(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {

		int records = 0;

		try {
			Integer receiptSlave = billDetailsDto.getRecSlaveId();
			BillReceiptSlaveDTO obj = (BillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptSlaveDTO.class, receiptSlave);

			Integer receiptMasterId = obj.getBillReceiptMasterId();

			// Get receipt master start
			BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, receiptMasterId);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			double remainingAmt = obje.getTotalRemain();
			double masterActualAmt = obje.getActualAmt();
			double masterActualCon = obje.getActualTotConcn();
			// Get receipt master end

			double amountNow = billDetailsDto.getAmount();
			double concessionNow = billDetailsDto.getConcession();
			double rate = billDetailsDto.getRate();
			double quantity = billDetailsDto.getQuantity();

			amountNow = amountNow - concessionNow;

			double curAmt = obj.getAmount();
			double currentCon = obj.getConcession();

			curAmt = curAmt - currentCon;

			double diff = 0;

			if (amountNow > curAmt) {

				diff = amountNow - curAmt;
				curAmtofMaster = curAmtofMaster + diff;
				currTotalPaid = currTotalPaid + diff;
				masterActualAmt = masterActualAmt + diff;

			} else if (amountNow < curAmt) {

				diff = curAmt - amountNow;
				curAmtofMaster = curAmtofMaster - diff;
				currTotalPaid = currTotalPaid - diff;
				masterActualAmt = masterActualAmt - diff;

			} else {

				diff = 0;
			}

			if (quantity > 0) {

				rate = amountNow / quantity;
			}

			/*
			 * obj.setAmount(billDetailsDto.getAmount());
			 * obj.setServiceId(billDetailsDto.getServiceId()); obj.setRate(rate);
			 * obj.setCoPay(billDetailsDto.getCoPay()); obj.setPay(billDetailsDto.getPay());
			 * obj.setConcession(billDetailsDto.getConcession());
			 * obj.setRate(billDetailsDto.getRate());
			 * obj.setQuantity(billDetailsDto.getQuantity());
			 * obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
			 * obj.setPaid(billDetailsDto.getCoPay());
			 * obj.setCompName(billDetailsDto.getSubservicesname());
			 */

			// receiptMasterId to update master table for caculations

			String sql = "";

			if (billDetailsDto.getChargesSlaveId() > 0) {

				sql = "update ehat_receipt_slave set amount=" + billDetailsDto.getOtherAmount() + ", service_id ="
						+ billDetailsDto.getServiceId() + ",rate=" + billDetailsDto.getOtherRate() + "," + "co_pay="
						+ billDetailsDto.getOtherCoPay() + ",pay=" + billDetailsDto.getOtherPay() + ",concession="
						+ billDetailsDto.getOtherConcession() + "," + "quantity=" + billDetailsDto.getQuantity()
						+ ",actual_final_paid=" + billDetailsDto.getOtherCoPay() + "," + "comp_name='"
						+ billDetailsDto.getSubservicesname() + "',actual_amt=" + billDetailsDto.getOtherAmount() + ","
						+ "actual_concn_amt=" + billDetailsDto.getOtherConcession() + ",doctor_id="
						+ billDetailsDto.getDoctorId() + " where bill_rec_slave_id = " + receiptSlave;

			} else {

				sql = "update ehat_receipt_slave set amount=" + billDetailsDto.getAmount() + ", service_id ="
						+ billDetailsDto.getServiceId() + ",rate=" + rate + "," + "co_pay=" + billDetailsDto.getCoPay()
						+ ",pay=" + billDetailsDto.getPay() + ",concession=" + billDetailsDto.getConcession() + ","
						+ "quantity=" + billDetailsDto.getQuantity() + ",actual_final_paid=" + billDetailsDto.getCoPay()
						+ "," + "comp_name='" + billDetailsDto.getSubservicesname() + "',actual_amt="
						+ billDetailsDto.getAmount() + "," + "actual_concn_amt=" + billDetailsDto.getConcession()
						+ ",doctor_id=" + billDetailsDto.getDoctorId() + " where bill_rec_slave_id = " + receiptSlave;
			}

			Query recSlaveQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recSlaveQuery.executeUpdate();

			double discountAmount = obje.getTotalDisc();
			double discDiff = 0.0;
			double payable = 0;
			double amt = 0;
			if (obje.getTotalDisc() > 0) {

				amt = ((masterActualAmt - masterActualCon) * obje.getActualDiscPer()) / 100;
				payable = masterActualAmt - (masterActualCon + amt);

				if (discountAmount > amt) {
					discDiff = discountAmount - amt;
					currTotalPaid = currTotalPaid + discDiff;
				} else {
					discDiff = amt - discountAmount;
					currTotalPaid = currTotalPaid - discDiff;
				}
			} else {

				payable = (masterActualAmt - masterActualCon);
				payable = (payable - discountAmount);
				// obje.setTotalDisc(0);
			}

			double totRem = curAmtofMaster - (obje.getTotalDisc() + currTotalPaid);

			/*
			 * obje.setTotalRemain(totRem);
			 * 
			 * // for pro fees obje.setTotalDisc(amt); obje.setActualAmt(masterActualAmt);
			 * obje.setActualTotConcn(masterActualCon);
			 * obje.setActualPayable(masterActualAmt - masterActualCon);
			 * obje.setPayable(payable);
			 * 
			 * obje.setTotalAmt(curAmtofMaster); obje.setTotalPaid(currTotalPaid);
			 * obje.setFirstPaid(currTotalPaid);
			 */

			sql = "update ehat_receipt_master set actual_amt=" + masterActualAmt + ", actual_tot_concn ="
					+ masterActualCon + ",actual_payable=" + (masterActualAmt - masterActualCon) + "," + "payable="
					+ payable + ",total_amt=" + masterActualAmt + ",total_paid=" + currTotalPaid + ",first_paid="
					+ currTotalPaid + ",first_disc=" + amt + ",total_discount=" + amt + ",total_remain=" + totRem
					+ " where bill_receipt_id = " + receiptMasterId;
			Query recMastQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recMastQuery.executeUpdate();

			BillDaoImpl billDao = new BillDaoImpl();
			billDao.setOpdRecMasterSlave(receiptMasterId, obje.getAgainstId(), "", sessionFactory.getCurrentSession());

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;

	}

	/********
	 * @author :BILAL
	 * @date :05-JULY-2017
	 * @code :for receipt update of IPD
	 *******/
	@Override
	public int updateOPDreciptIPD(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request, String queryType) {
		int records = 0;

		if (receiptOFIPD.equals("off")) {
			updateOPDreciptIPDoffFlow(billDetailsIpdDto, request, queryType);
			records = 2;
		} else {
			updateOPDreciptIPDonFlow(billDetailsIpdDto, request, queryType);
			records = 2;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @date :05-JULY-2017
	 * @code :for receipt update of IPD on flow
	 *******/
	public int updateOPDreciptIPDonFlow(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request,
			String queryType) {

		int records = 0;
		int sponsorid = billDetailsIpdDto.getSponsorId();
		int chargesSid = billDetailsIpdDto.getChargesSlaveId();
		String receiptOf = billDetailsIpdDto.getReceiptOf();
		try {
			Integer receiptSlave = billDetailsIpdDto.getRecSlaveIdIPD();
			IpdBillReceiptSlaveDTO obj = (IpdBillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptSlaveDTO.class, receiptSlave);

			// master receipt start
			Integer receiptMasterId = obj.getBillReceiptMasterId();

			IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptMasterDTO.class, receiptMasterId);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			double remainingAmt = obje.getTotalRemain();
			// master receipt end

			double amountNow = billDetailsIpdDto.getAmount();
			double rate = billDetailsIpdDto.getRate();
			double quantity = billDetailsIpdDto.getQuantity();
			double concessionNow = billDetailsIpdDto.getConcession();

			double otheramt = billDetailsIpdDto.getOtherAmount();
			double othercons = billDetailsIpdDto.getOtherConcession();
			double otherpay = billDetailsIpdDto.getOtherPay();
			double othercpay = billDetailsIpdDto.getOtherCoPay();
			double otherrate = billDetailsIpdDto.getOtherRate();

			otherpay = otheramt - othercons;

			amountNow = amountNow - concessionNow;
			otheramt = otheramt - othercons;

			double curAmt = obj.getAmount();
			double currentCon = obj.getConcession();

			curAmt = curAmt - currentCon;

			double diff = 0;

			// for sponsor tab receipt edit
			if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("IpdSponsor")) {
				if (otheramt > curAmt) {

					diff = otheramt - curAmt;
					curAmtofMaster = curAmtofMaster + diff;

				} else if (otheramt < curAmt) {

					diff = curAmt - otheramt;
					curAmtofMaster = curAmtofMaster - diff;

				} else {

					diff = 0;
				}

				if (quantity > 0) {

					rate = otheramt / quantity;
				}
				obj.setAmount(otheramt);
				obj.setCoPay(othercpay);
				obj.setPay(otherpay);
				obj.setConcession(othercons);
				obj.setRate(otherrate);
				obj.setQuantity(billDetailsIpdDto.getQuantity());
				obj.setPaid(billDetailsIpdDto.getCoPay());
			} else {
				if (amountNow > curAmt) {

					diff = amountNow - curAmt;
					curAmtofMaster = curAmtofMaster + diff;

				} else if (amountNow < curAmt) {

					diff = curAmt - amountNow;
					curAmtofMaster = curAmtofMaster - diff;

				} else {

					diff = 0;
				}

				if (quantity > 0) {

					rate = amountNow / quantity;
				}
				obj.setAmount(billDetailsIpdDto.getAmount());
				obj.setCoPay(billDetailsIpdDto.getCoPay());
				obj.setPay(billDetailsIpdDto.getPay());
				obj.setConcession(billDetailsIpdDto.getConcession());
				obj.setRate(billDetailsIpdDto.getRate());
				obj.setQuantity(billDetailsIpdDto.getQuantity());
				obj.setPaid(billDetailsIpdDto.getCoPay());
			}

			obj.setServiceId(billDetailsIpdDto.getServiceId());
			// obj.setRate(rate);

			obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());
			obj.setCompName(billDetailsIpdDto.getSubservicesname());
			obj.setDoctorId(billDetailsIpdDto.getDoctorId());
			obje.setTotalAmt(curAmtofMaster);

			if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
				remainingAmt = curAmtofMaster - currTotalPaid;
			} else {
				remainingAmt = 0;
			}

			if (obje.getTotalRemain() == 0) {

				obje.setReceiptStatus("paid");
			} else {

				obje.setReceiptStatus("unpaid");
			}

			obje.setTotalRemain(remainingAmt);

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;

	}

	/********
	 * @author :BILAL
	 * @date :05-JULY-2017
	 * @code :for receipt update of IPD off flow
	 *******/
	public int updateOPDreciptIPDoffFlow(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request,
			String queryType) {

		int records = 0;

		try {
			Integer receiptSlave = billDetailsIpdDto.getRecSlaveIdIPD();
			IpdBillReceiptSlaveDTO obj = (IpdBillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptSlaveDTO.class, receiptSlave);

			// master receipt start
			Integer receiptMasterId = obj.getBillReceiptMasterId();

			IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptMasterDTO.class, receiptMasterId);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			double remainingAmt = obje.getTotalRemain();
			// master receipt end

			double amountNow = billDetailsIpdDto.getAmount();
			double rate = billDetailsIpdDto.getRate();
			double quantity = billDetailsIpdDto.getQuantity();
			double concessionNow = billDetailsIpdDto.getConcession();

			amountNow = amountNow - concessionNow;

			double curAmt = obj.getAmount();
			double currentCon = obj.getConcession();

			curAmt = curAmt - currentCon;

			double diff = 0;

			if (amountNow > curAmt) {

				diff = amountNow - curAmt;
				curAmtofMaster = curAmtofMaster + diff;
				currTotalPaid = currTotalPaid + diff;

			} else if (amountNow < curAmt) {

				diff = curAmt - amountNow;
				curAmtofMaster = curAmtofMaster - diff;
				currTotalPaid = currTotalPaid - diff;

			} else {

				diff = 0;
			}

			if (quantity > 0) {

				rate = amountNow / quantity;
			}

			obj.setAmount(billDetailsIpdDto.getAmount());
			obj.setServiceId(billDetailsIpdDto.getServiceId());
			// obj.setRate(rate);
			obj.setCoPay(billDetailsIpdDto.getCoPay());
			obj.setPay(billDetailsIpdDto.getPay());
			obj.setConcession(billDetailsIpdDto.getConcession());
			obj.setRate(billDetailsIpdDto.getRate());
			obj.setQuantity(billDetailsIpdDto.getQuantity());
			obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());
			obj.setPaid(billDetailsIpdDto.getCoPay());
			obj.setCompName(billDetailsIpdDto.getSubservicesname());

			obje.setTotalAmt(curAmtofMaster);
			obje.setTotalPaid(currTotalPaid);

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;

	}

	/********
	 * @author :BILAL
	 * @date :05-JULY-2017
	 * @code :for save new service to receipt of OPD
	 *******/
	@Override
	public int saveNewSer(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {
		int records = 0;

		if (receiptOFOPD.equals("off")) {
			saveNewSerOffFLow(billDetailsDto, request, queryType);
			records = 1;
		} else {
			saveNewSerOnFLow(billDetailsDto, request, queryType);
			records = 1;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @date :05-JULY-2017
	 * @code :for save new service to receipt of OPD on flow
	 *******/

	public int saveNewSerOnFLow(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		Integer receiptMasterId = billDetailsDto.getMasterReceiptId();
		String receiptof = billDetailsDto.getReceiptOf();
		// Get receipt master start
		BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
				.get(BillReceiptMasterDTO.class, receiptMasterId);

		double curAmtofMaster = obje.getTotalAmt();
		double currTotalPaid = obje.getTotalPaid();
		double remainingAmt = obje.getTotalRemain();

		Integer sponsorId = billDetailsDto.getSponsorId();
		Integer chargesSlaveId = billDetailsDto.getChargesSlaveId();

		// double otherRate =billDetailsDto.getOtherRate();
		double otherCon = billDetailsDto.getOtherConcession();
		double otherAmt = billDetailsDto.getOtherAmount();
		// double otherPay =billDetailsDto.getOtherPay();
		// double otherCpay =billDetailsDto.getOtherCoPay();

		// Get receipt master end

		BillReceiptSlaveDTO obj = new BillReceiptSlaveDTO();

		double amountSlave = billDetailsDto.getAmount();
		double concessionSlave = billDetailsDto.getConcession();
		// double rateSlave =billDetailsDto.getRate();
		String compName = "";

		// receipt slave total amount to add in master
		double totalAmountSlave = amountSlave - concessionSlave;

		int records = 0;
		try {

			// getting service name by sub service id
			Criteria criteriaCompName = sessionFactory.getCurrentSession().createCriteria(SubServiceDto.class);
			criteriaCompName.add(Restrictions.eq("subId", billDetailsDto.getSubServiceId()));
			criteriaCompName.add(Restrictions.eq("deleted", "N"));
			List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
			for (SubServiceDto bojComp : listCompNames) {

				compName = bojComp.getCategoryName();
			}

			// max bill details id of OPD
			Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
			criteriaRec.setProjection(Projections.max("billDetailsId"));
			Integer maxRecId = (Integer) criteriaRec.uniqueResult();

			if (sponsorId > 0 && chargesSlaveId > 0 && receiptof.equals("sponsor")) {
				totalAmountSlave = otherAmt - otherCon;

				obj.setAmount(billDetailsDto.getOtherAmount());
				obj.setCoPay(billDetailsDto.getOtherCoPay());
				obj.setPay(billDetailsDto.getOtherPay());
				obj.setConcession(billDetailsDto.getOtherConcession());
				obj.setRate(billDetailsDto.getOtherRate());
				obj.setQuantity(billDetailsDto.getQuantity());

			} else {
				totalAmountSlave = amountSlave - concessionSlave;

				obj.setAmount(billDetailsDto.getAmount());
				obj.setCoPay(billDetailsDto.getCoPay());
				obj.setPay(billDetailsDto.getPay());
				obj.setConcession(billDetailsDto.getConcession());
				obj.setRate(billDetailsDto.getRate());
				obj.setQuantity(billDetailsDto.getQuantity());
			}

			// receipt slave to save in table

			obj.setCompName(compName);
			obj.setBillDetailsId(maxRecId);
			obj.setBillId(billDetailsDto.getBillId());
			obj.setBillReceiptMasterId(billDetailsDto.getMasterReceiptId());
			obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
			obj.setDeleted("N");
			obj.setUnitId(billDetailsDto.getUnitId());
			obj.setDepartmentId(billDetailsDto.getDepartmentId());
			obj.setDoctorId(billDetailsDto.getDoctorId());
			obj.setInstructions(billDetailsDto.getInstructions());

			obj.setTreatmentId(billDetailsDto.getTreatmentId());
			obj.setPatientId(billDetailsDto.getPatienttId());
			obj.setBillId(billDetailsDto.getBillId());
			obj.setServiceId(billDetailsDto.getServiceId());
			obj.setSubServiceId(billDetailsDto.getSubServiceId());
			obj.setServiceAssignDate(new Date(new java.util.Date().getTime()));
			obj.setCreatedBy(userId);
			obj.setPaid(totalAmountSlave);
			obj.setUnitId(unitId);
			// calculation in master receipt
			curAmtofMaster = curAmtofMaster + totalAmountSlave;
			// currTotalPaid = currTotalPaid + totalAmountSlave;

			// remainingAmt = curAmtofMaster - currTotalPaid;
			if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
				remainingAmt = curAmtofMaster - currTotalPaid;
			} else {
				remainingAmt = 0;
			}
			obje.setTotalAmt(curAmtofMaster);
			obje.setTotalRemain(remainingAmt);
			// obje.setTotalPaid(currTotalPaid);

			if (obje.getTotalRemain() == 0) {

				obje.setReceiptStatus("paid");
			} else {

				obje.setReceiptStatus("unpaid");
			}

			sessionFactory.getCurrentSession().merge(obj);

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	/********
	 * @author :BILAL
	 * @date :05-JULY-2017
	 * @code :for save new service to receipt of OPD off flow
	 *******/

	public int saveNewSerOffFLow(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		Integer receiptMasterId = billDetailsDto.getMasterReceiptId();
		String receiptof = billDetailsDto.getReceiptOf();
		// Get receipt master start
		BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
				.get(BillReceiptMasterDTO.class, receiptMasterId);

		double curAmtofMaster = obje.getTotalAmt();
		double currTotalPaid = obje.getTotalPaid();
		// double remainingAmt =obje.getTotalRemain();

		// Get receipt master end

		BillReceiptSlaveDTO obj = new BillReceiptSlaveDTO();

		double amountSlave = billDetailsDto.getAmount();
		double concessionSlave = billDetailsDto.getConcession();
		// double rateSlave =billDetailsDto.getRate();

		Integer sponsorId = billDetailsDto.getSponsorId();
		Integer chargesSlaveId = billDetailsDto.getChargesSlaveId();

		// double otherRate =billDetailsDto.getOtherRate();
		double otherCon = billDetailsDto.getOtherConcession();
		double otherAmt = billDetailsDto.getOtherAmount();
		// double otherPay =billDetailsDto.getOtherPay();
		// double otherCpay =billDetailsDto.getOtherCoPay();

		String compName = "";

		// receipt slave total amount to add in master
		double totalAmountSlave = 0.0;

		int records = 0;
		try {

			// getting service name by sub service id
			Criteria criteriaCompName = sessionFactory.getCurrentSession().createCriteria(SubServiceDto.class);
			criteriaCompName.add(Restrictions.eq("subId", billDetailsDto.getSubServiceId()));
			criteriaCompName.add(Restrictions.eq("deleted", "N"));
			List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
			for (SubServiceDto bojComp : listCompNames) {

				compName = bojComp.getCategoryName();
			}

			// max bill details id of OPD
			Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
			criteriaRec.setProjection(Projections.max("billDetailsId"));
			Integer maxRecId = (Integer) criteriaRec.uniqueResult();

			// receipt slave to save in table

			if (sponsorId > 0 && chargesSlaveId > 0 && receiptof.equals("sponsor")) {
				totalAmountSlave = otherAmt - otherCon;

				obj.setAmount(billDetailsDto.getOtherAmount());
				obj.setCoPay(billDetailsDto.getOtherCoPay());
				obj.setPay(billDetailsDto.getOtherPay());
				obj.setConcession(billDetailsDto.getOtherConcession());
				obj.setRate(billDetailsDto.getOtherRate());
				obj.setQuantity(billDetailsDto.getQuantity());

				// for pro fees start
				obj.setActualAmt(billDetailsDto.getOtherAmount());
				obj.setActualConcnPer(billDetailsDto.getConcessionOnPerc());
				obj.setActualConcnAmt(billDetailsDto.getOtherConcession());
				obj.setActualPayable(billDetailsDto.getOtherAmount() - billDetailsDto.getOtherConcession());
				double disc = ((obj.getAmount() - obj.getConcession()) * obje.getActualDiscPer()) / 100;
				obj.setActualDiscAmt(disc);
				obj.setActualFinalPaid((obj.getAmount() - obj.getConcession()) - disc);
				obj.setActualFinalPayable((obj.getAmount() - obj.getConcession()) - disc);
				// for pro fees end
			} else {
				totalAmountSlave = amountSlave - concessionSlave;

				obj.setAmount(billDetailsDto.getAmount());
				obj.setCoPay(billDetailsDto.getCoPay());
				obj.setPay(billDetailsDto.getPay());
				obj.setConcession(billDetailsDto.getConcession());
				obj.setRate(billDetailsDto.getRate());
				obj.setQuantity(billDetailsDto.getQuantity());

				// for pro fees start
				obj.setActualAmt(billDetailsDto.getOtherAmount());
				obj.setActualConcnPer(billDetailsDto.getConcessionOnPerc());
				obj.setActualConcnAmt(billDetailsDto.getOtherConcession());
				obj.setActualPayable(billDetailsDto.getOtherAmount() - billDetailsDto.getOtherConcession());
				double disc = ((obj.getAmount() - obj.getConcession()) * obje.getActualDiscPer()) / 100;
				obj.setActualDiscAmt(disc);
				obj.setActualFinalPaid((obj.getAmount() - obj.getConcession()) - disc);
				obj.setActualFinalPayable((obj.getAmount() - obj.getConcession()) - disc);
				// for pro fees end
			}

			obj.setActualDiscPer(obje.getActualDiscPer());
			obj.setCompName(compName);
			obj.setBillDetailsId(maxRecId);
			obj.setBillId(billDetailsDto.getBillId());
			obj.setBillReceiptMasterId(billDetailsDto.getMasterReceiptId());
			obj.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
			obj.setDeleted("N");
			obj.setUnitId(billDetailsDto.getUnitId());
			obj.setDepartmentId(billDetailsDto.getDepartmentId());
			obj.setDoctorId(billDetailsDto.getDoctorId());
			obj.setInstructions(billDetailsDto.getInstructions());

			obj.setTreatmentId(billDetailsDto.getTreatmentId());
			obj.setPatientId(billDetailsDto.getPatienttId());
			obj.setBillId(billDetailsDto.getBillId());
			obj.setServiceId(billDetailsDto.getServiceId());
			obj.setSubServiceId(billDetailsDto.getSubServiceId());
			obj.setServiceAssignDate(new Date(new java.util.Date().getTime()));
			obj.setCreatedBy(userId);
			obj.setPaid(totalAmountSlave);
			obj.setUnitId(unitId);
			// added pro fees start
			// calculation in master receipt
			curAmtofMaster = curAmtofMaster + totalAmountSlave;
			currTotalPaid = currTotalPaid + totalAmountSlave;

			// remainingAmt = curAmtofMaster - currTotalPaid;

			double masterActualAmt = obje.getActualAmt();
			double masterActualCon = obje.getActualTotConcn();

			masterActualAmt = masterActualAmt + totalAmountSlave;

			// added by pro fees end

			double discountAmount = obje.getTotalDisc();
			double discDiff = 0.0;
			double payable = 0;
			double amt = 0;
			if (obje.getTotalDisc() > 0) {

				amt = ((masterActualAmt - masterActualCon) * obje.getActualDiscPer()) / 100;
				payable = (masterActualAmt - masterActualCon) - amt;

				if (discountAmount > amt) {
					discDiff = discountAmount - amt;
					currTotalPaid = currTotalPaid + discDiff;
				} else {
					discDiff = amt - discountAmount;
					currTotalPaid = currTotalPaid - discDiff;
				}
			} else {

				payable = (masterActualAmt - masterActualCon);
				payable = (payable - discountAmount);
			}

			// for pro fees end

			sessionFactory.getCurrentSession().merge(obj);
			String sql = "update ehat_receipt_master set actual_amt=" + masterActualAmt + ", actual_tot_concn ="
					+ masterActualCon + ",actual_payable=" + (masterActualAmt - masterActualCon) + "," + "payable="
					+ payable + ",total_amt=" + masterActualAmt + ",total_paid=" + currTotalPaid + ",first_paid="
					+ currTotalPaid + ",first_disc=" + amt + ",total_discount=" + amt + " where bill_receipt_id = "
					+ receiptMasterId;
			Query recMastQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recMastQuery.executeUpdate();

			BillDaoImpl billDao = new BillDaoImpl();
			billDao.setOpdRecMasterSlave(receiptMasterId, obje.getAgainstId(), "", sessionFactory.getCurrentSession());

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	/********
	 * @author :BILAL
	 * @date :07-JULY-2017
	 * @code :for save service to receipt of IPD
	 ********/
	@Override
	public int saveNewToIPD(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request, String queryType) {
		int records = 0;

		if (receiptOFIPD.equals("off")) {
			saveNewToIPDOffFlow(billDetailsIpdDto, request, queryType);
			records = 1;
		} else {
			saveNewToIPDOnFlow(billDetailsIpdDto, request, queryType);
			records = 1;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @date :07-JULY-2017
	 * @code :for save service to receipt of IPD on flow
	 ********/

	public int saveNewToIPDOnFlow(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request, String queryType) {

		Integer receiptMasterId = billDetailsIpdDto.getMasterReceiptId();
		String receiptof = billDetailsIpdDto.getReceiptOf();
		Integer sponsorId = billDetailsIpdDto.getSponsorId();
		Integer chargesSlaveId = billDetailsIpdDto.getChargesSlaveId();

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		// Get receipt master start
		IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
				.get(IpdBillReceiptMasterDTO.class, receiptMasterId);

		double curAmtofMaster = obje.getTotalAmt();
		double currTotalPaid = obje.getTotalPaid();
		double remainingAmt = obje.getTotalRemain();

		// Get receipt master end

		IpdBillReceiptSlaveDTO obj = new IpdBillReceiptSlaveDTO();

		double amountSlave = billDetailsIpdDto.getAmount();
		double concessionSlave = billDetailsIpdDto.getConcession();
		// double rateSlave =billDetailsIpdDto.getRate();

		// double otherRate =billDetailsIpdDto.getOtherRate();
		double otherCon = billDetailsIpdDto.getOtherConcession();
		double otherAmt = billDetailsIpdDto.getOtherAmount();
		// double otherPay =billDetailsIpdDto.getOtherPay();
		// double otherCpay =billDetailsIpdDto.getOtherCoPay();

		String compName = "";

		// receipt slave total amount to add in master
		double totalAmountSlave = 0.0;

		int records = 0;
		try {

			// getting service name by sub service id
			Criteria criteriaCompName = sessionFactory.getCurrentSession().createCriteria(SubServiceDto.class);
			criteriaCompName.add(Restrictions.eq("subId", billDetailsIpdDto.getSubServiceId()));
			criteriaCompName.add(Restrictions.eq("deleted", "N"));
			List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
			for (SubServiceDto bojComp : listCompNames) {

				compName = bojComp.getCategoryName();
			}

			// max bill details id of IPD
			Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
			criteriaRec.setProjection(Projections.max("billDetailsId"));
			Integer maxRecId = (Integer) criteriaRec.uniqueResult();

			if (sponsorId > 0 && chargesSlaveId > 0 && receiptof.equals("IpdSponsor")) {
				totalAmountSlave = otherAmt - otherCon;

				obj.setAmount(billDetailsIpdDto.getOtherAmount());
				obj.setCoPay(billDetailsIpdDto.getOtherCoPay());
				obj.setPay(billDetailsIpdDto.getOtherPay());
				obj.setConcession(billDetailsIpdDto.getOtherConcession());
				obj.setRate(billDetailsIpdDto.getOtherRate());
				obj.setQuantity(billDetailsIpdDto.getQuantity());

			} else {
				totalAmountSlave = amountSlave - concessionSlave;

				obj.setAmount(totalAmountSlave);
				obj.setCoPay(billDetailsIpdDto.getCoPay());
				obj.setPay(billDetailsIpdDto.getPay());
				obj.setConcession(billDetailsIpdDto.getConcession());
				obj.setRate(billDetailsIpdDto.getRate());
				obj.setQuantity(billDetailsIpdDto.getQuantity());
			}
			// receipt slave to save in table

			obj.setCompName(compName);
			obj.setBillDetailsId(maxRecId);
			obj.setBillId(billDetailsIpdDto.getBillId());
			obj.setBillReceiptMasterId(billDetailsIpdDto.getMasterReceiptId());
			obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());
			obj.setDeleted("N");
			obj.setUnitId(billDetailsIpdDto.getUnitId());
			obj.setDepartmentId(billDetailsIpdDto.getDepartmentId());
			obj.setDoctorId(billDetailsIpdDto.getDoctorId());
			obj.setInstructions(billDetailsIpdDto.getInstructions());

			obj.setTreatmentId(billDetailsIpdDto.getTreatmentId());
			obj.setPatientId(billDetailsIpdDto.getPatienttId());
			obj.setBillId(billDetailsIpdDto.getBillId());
			obj.setServiceId(billDetailsIpdDto.getServiceId());
			obj.setSubServiceId(billDetailsIpdDto.getSubServiceId());
			obj.setUnitId(unitId);
			obj.setServiceAssignDate(new Date(new java.util.Date().getTime()));
			obj.setCreatedBy(userId);
			// calculation in master receipt
			curAmtofMaster = curAmtofMaster + totalAmountSlave;

			obje.setTotalAmt(curAmtofMaster);

			// Remaining amount logic
			if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
				remainingAmt = curAmtofMaster - currTotalPaid;
			} else {
				remainingAmt = 0;
			}

			obje.setTotalRemain(remainingAmt);

			// unpaid flag to show receipt in credit tab
			if (obje.getTotalRemain() == 0) {

				obje.setReceiptStatus("paid");
			} else {

				obje.setReceiptStatus("unpaid");
			}

			sessionFactory.getCurrentSession().merge(obj);

			// currTotalPaid = currTotalPaid + totalAmountSlave;
			// obje.setTotalPaid(currTotalPaid);
			// remainingAmt = curAmtofMaster - currTotalPaid;
			records = 1;

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	/********
	 * @author :BILAL
	 * @date :07-JULY-2017
	 * @code :for save service to receipt of IPD on flow
	 ********/

	public int saveNewToIPDOffFlow(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request, String queryType) {

		Integer receiptMasterId = billDetailsIpdDto.getMasterReceiptId();

		String receiptof = billDetailsIpdDto.getReceiptOf();
		Integer sponsorId = billDetailsIpdDto.getSponsorId();
		Integer chargesSlaveId = billDetailsIpdDto.getChargesSlaveId();

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		// Get receipt master start
		IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
				.get(IpdBillReceiptMasterDTO.class, receiptMasterId);

		double curAmtofMaster = obje.getTotalAmt();
		double currTotalPaid = obje.getTotalPaid();
		// double remainingAmt =obje.getTotalRemain();

		// Get receipt master end

		IpdBillReceiptSlaveDTO obj = new IpdBillReceiptSlaveDTO();

		double amountSlave = billDetailsIpdDto.getAmount();
		double concessionSlave = billDetailsIpdDto.getConcession();
		// double rateSlave =billDetailsIpdDto.getRate();

		// double otherRate =billDetailsIpdDto.getOtherRate();
		double otherCon = billDetailsIpdDto.getOtherConcession();
		double otherAmt = billDetailsIpdDto.getOtherAmount();
		// double otherPay =billDetailsIpdDto.getOtherPay();
		// double otherCpay =billDetailsIpdDto.getOtherCoPay();
		// double quant =billDetailsIpdDto.getQuantity();
		// otherAmt = otherRate * quant;
		// otherPay = otherAmt - otherCon;
		String compName = "";

		// receipt slave total amount to add in master
		double totalAmountSlave = 0.0;

		int records = 0;
		try {

			// getting service name by sub service id
			Criteria criteriaCompName = sessionFactory.getCurrentSession().createCriteria(SubServiceDto.class);
			criteriaCompName.add(Restrictions.eq("subId", billDetailsIpdDto.getSubServiceId()));
			criteriaCompName.add(Restrictions.eq("deleted", "N"));
			List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
			for (SubServiceDto bojComp : listCompNames) {

				compName = bojComp.getCategoryName();
			}

			// max bill details id of IPD
			Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
			criteriaRec.setProjection(Projections.max("billDetailsId"));
			Integer maxRecId = (Integer) criteriaRec.uniqueResult();

			if (sponsorId > 0 && chargesSlaveId > 0 && receiptof.equals("IpdSponsor")) {
				totalAmountSlave = otherAmt - otherCon;

				obj.setAmount(billDetailsIpdDto.getOtherAmount());
				obj.setCoPay(billDetailsIpdDto.getOtherCoPay());
				obj.setPay(billDetailsIpdDto.getOtherPay());
				obj.setConcession(billDetailsIpdDto.getOtherConcession());
				obj.setRate(billDetailsIpdDto.getOtherRate());
				obj.setQuantity(billDetailsIpdDto.getQuantity());

				// for pro fees start
				obj.setActualAmt(billDetailsIpdDto.getOtherAmount());
				obj.setActualConcnPer(billDetailsIpdDto.getConcessionPer());
				obj.setActualConcnAmt(billDetailsIpdDto.getOtherConcession());
				obj.setActualPayable(billDetailsIpdDto.getOtherAmount() - billDetailsIpdDto.getOtherConcession());
				double disc = ((obj.getAmount() - obj.getConcession()) * obje.getActualDiscPer()) / 100;
				obj.setActualDiscAmt(disc);
				obj.setActualFinalPaid((obj.getAmount() - obj.getConcession()) - disc);
				obj.setActualFinalPayable((obj.getAmount() - obj.getConcession()) - disc);
				// for pro fees end

			} else {
				totalAmountSlave = amountSlave - concessionSlave;

				obj.setAmount(totalAmountSlave);
				obj.setCoPay(billDetailsIpdDto.getCoPay());
				obj.setPay(billDetailsIpdDto.getPay());
				obj.setConcession(billDetailsIpdDto.getConcession());
				obj.setRate(billDetailsIpdDto.getRate());
				obj.setQuantity(billDetailsIpdDto.getQuantity());

				// for pro fees start
				obj.setActualAmt(billDetailsIpdDto.getOtherAmount());
				obj.setActualConcnPer(billDetailsIpdDto.getConcessionPer());
				obj.setActualConcnAmt(billDetailsIpdDto.getOtherConcession());
				obj.setActualPayable(billDetailsIpdDto.getOtherAmount() - billDetailsIpdDto.getOtherConcession());
				double disc = ((obj.getAmount() - obj.getConcession()) * obje.getActualDiscPer()) / 100;
				obj.setActualDiscAmt(disc);
				obj.setActualFinalPaid((obj.getAmount() - obj.getConcession()) - disc);
				obj.setActualFinalPayable((obj.getAmount() - obj.getConcession()) - disc);
				// for pro fees end
			}

			// receipt slave to save in table

			obj.setActualDiscPer(obje.getActualDiscPer());
			obj.setCompName(compName);
			obj.setBillDetailsId(maxRecId);
			obj.setBillId(billDetailsIpdDto.getBillId());
			obj.setBillReceiptMasterId(billDetailsIpdDto.getMasterReceiptId());
			obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());
			obj.setDeleted("N");
			obj.setUnitId(billDetailsIpdDto.getUnitId());
			obj.setDepartmentId(billDetailsIpdDto.getDepartmentId());
			obj.setDoctorId(billDetailsIpdDto.getDoctorId());
			obj.setInstructions(billDetailsIpdDto.getInstructions());

			obj.setTreatmentId(billDetailsIpdDto.getTreatmentId());
			obj.setPatientId(billDetailsIpdDto.getPatienttId());
			obj.setBillId(billDetailsIpdDto.getBillId());
			obj.setServiceId(billDetailsIpdDto.getServiceId());
			obj.setSubServiceId(billDetailsIpdDto.getSubServiceId());

			obj.setServiceAssignDate(new Date(new java.util.Date().getTime()));
			obj.setCreatedBy(userId);
			obj.setUnitId(unitId);
			// calculation in master receipt
			curAmtofMaster = curAmtofMaster + totalAmountSlave;
			currTotalPaid = currTotalPaid + totalAmountSlave;
			obje.setTotalPaid(currTotalPaid);

			obje.setTotalAmt(curAmtofMaster);

			double masterActualAmt = obje.getActualAmt();
			double masterActualCon = obje.getActualTotConcn();

			masterActualAmt = masterActualAmt + totalAmountSlave;
			// added by pro fees end

			double discountAmount = obje.getTotalDisc();
			double discDiff = 0.0;
			double payable = 0;
			double amt = 0;
			if (obje.getTotalDisc() > 0) {

				amt = ((masterActualAmt - masterActualCon) * obje.getActualDiscPer()) / 100;
				payable = (masterActualAmt - masterActualCon) - amt;

				if (discountAmount > amt) {
					discDiff = discountAmount - amt;
					currTotalPaid = currTotalPaid + discDiff;
				} else {
					discDiff = amt - discountAmount;
					currTotalPaid = currTotalPaid - discDiff;
				}
			} else {

				payable = (masterActualAmt - masterActualCon);
				obje.setTotalDisc(0);
			}

			// for pro fees
			obje.setTotalDisc(amt);
			obje.setActualAmt(masterActualAmt);
			obje.setActualTotConcn(masterActualCon);
			obje.setActualPayable(masterActualAmt - masterActualCon);
			obje.setPayable(payable);
			obje.setTotalAmt(masterActualAmt);
			obje.setTotalPaid(currTotalPaid);

			// for pro fees end
			sessionFactory.getCurrentSession().merge(obj);

			// currTotalPaid = currTotalPaid + totalAmountSlave;
			// obje.setTotalPaid(currTotalPaid);
			// remainingAmt = curAmtofMaster - currTotalPaid;
			records = 1;

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	/********
	 * @author :BILAL
	 * @date :10-JULY-2017
	 * @code :for delete receipt of OPD
	 ********/
	@Override
	public int deleteReceiptOfOPD(Integer slaveId, HttpServletRequest request) {
		int records = 0;

		if (receiptOFOPD.equals("off")) {
			deleteReceiptOfOPDOffFlow(slaveId, request);
			records = 1;
		} else {
			deleteReceiptOfOPDOnFlow(slaveId, request);
			records = 1;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @date :10-JULY-2017
	 * @code :for delete receipt of OPD on flow
	 ********/
	public int deleteReceiptOfOPDOnFlow(Integer slaveId, HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			BillReceiptSlaveDTO billReceiptSlaveDTO = (BillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptSlaveDTO.class, slaveId);

			Integer masterID = billReceiptSlaveDTO.getBillReceiptMasterId();

			double amount = billReceiptSlaveDTO.getAmount();
			double concession = billReceiptSlaveDTO.getConcession();
			double finalAmt = amount - concession;

			billReceiptSlaveDTO.setDeleted("Y");
			billReceiptSlaveDTO.setDeletedBy(userId);
			billReceiptSlaveDTO.setDeletedDateTime(new Date(new java.util.Date().getTime()));

			// Get receipt master start
			BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, masterID);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			double remainingAmt = obje.getTotalRemain();
			// Get receipt master end

			// Reaming amount logic in delete
			if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
				remainingAmt = remainingAmt - finalAmt;
			} else {
				remainingAmt = 0;
			}

			curAmtofMaster = curAmtofMaster - finalAmt;

			obje.setTotalAmt(curAmtofMaster);
			obje.setTotalRemain(remainingAmt);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/********
	 * @author :BILAL
	 * @date :10-JULY-2017
	 * @code :for delete receipt of OPD off flow
	 ********/

	public int deleteReceiptOfOPDOffFlow(Integer slaveId, HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			BillReceiptSlaveDTO billReceiptSlaveDTO = (BillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptSlaveDTO.class, slaveId);

			Integer masterID = billReceiptSlaveDTO.getBillReceiptMasterId();

			double amount = billReceiptSlaveDTO.getAmount();
			double concession = billReceiptSlaveDTO.getConcession();
			double finalAmt = amount - concession;

			billReceiptSlaveDTO.setRefundAmt(0);
			billReceiptSlaveDTO.setRefundFlag("N");
			/*
			 * billReceiptSlaveDTO.setDeleted("Y");
			 * billReceiptSlaveDTO.setDeletedBy(userId);
			 * billReceiptSlaveDTO.setDeletedDateTime(new Date(new
			 * java.util.Date().getTime()));
			 */
			java.util.Date date = new java.util.Date();
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());

			String sql = "update ehat_receipt_slave set deleted='Y',deleted_by=" + userId + ",deleted_date_time='"
					+ sqlDate + "' where bill_rec_slave_id = " + slaveId;
			Query recSlaveQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recSlaveQuery.executeUpdate();

			sql = "select ifnull(bill_details_id,0) from ehat_receipt_slave where bill_rec_slave_id = " + slaveId;
			Query billDetailsIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int billDetailsId = ((Number) billDetailsIdQuery.uniqueResult()).intValue();

			sql = "update ehat_bill_details set paid_flag='N',updated_by=" + userId + ",updated_date_time='" + sqlDate
					+ "' where bill_details_id = " + billDetailsId;
			Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			billDetailsQuery.executeUpdate();

			// Get receipt master start
			BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, masterID);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			double refundAmt= obje.getActualRefAmt();
			refundAmt= refundAmt-finalAmt;
			
			

			// double remainingAmt =obje.getTotalRemain();
			// double curDiscount =obje.getTotalDisc();
			// Get receipt master end

			// Reaming amount logic in delete
			/*
			 * if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
			 * remainingAmt = remainingAmt - finalAmt; }else{ remainingAmt = 0; }
			 */
			/* currTotalPaid =currTotalPaid + curDiscount; */
			double slavePaid = billReceiptSlaveDTO.getActualFinalPaid();

			curAmtofMaster = curAmtofMaster - finalAmt;
			currTotalPaid = currTotalPaid - slavePaid;

			if (currTotalPaid < 0) {
				currTotalPaid = 0;
			}

			double mastRemain = curAmtofMaster - currTotalPaid;
			/*
			 * obje.setTotalAmt(curAmtofMaster); obje.setTotalPaid(currTotalPaid);
			 */
			// obje.setTotalRemain(remainingAmt);

			double actualPayable = curAmtofMaster - obje.getActualTotConcn();
			double totDisc = 0;
			if (obje.getActualDiscPer() > 0) {

				totDisc = (actualPayable * obje.getActualDiscPer()) / 100;
			}

			double actualFinalPayable = actualPayable - totDisc;

			sql = "update ehat_receipt_master set actual_amt=" + curAmtofMaster + ",actual_payable=" + actualPayable
					+ ",total_discount=" + totDisc + "," + "payable=" + actualFinalPayable + ",total_amt="
					+ curAmtofMaster + ",total_paid=" + currTotalPaid + ",first_paid=" + currTotalPaid + ",first_disc="
					+ totDisc + ",total_remain=" + mastRemain + ",first_remain=" + mastRemain
					+ ",actual_ref_amt="+refundAmt
					+ " where bill_receipt_id = " + masterID;
			Query recMastQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recMastQuery.executeUpdate();

			BillDaoImpl billDao = new BillDaoImpl();
			billDao.setOpdRecMasterSlave(masterID, obje.getAgainstId(), "", sessionFactory.getCurrentSession());

			if (curAmtofMaster == 0) {
				// deleteMasterReceiptOPD(masterID ,request);
				deleteMasterReceiptOPD(masterID, "", request);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/********
	 * @author :BILAL
	 * @date :17-JULY-2017
	 * @code :for delete receipt of IPD
	 ********/
	@Override
	public int deleteOnClickForRecieptIPD(Integer billRecSlaveId, HttpServletRequest request) {
		int records = 0;

		if (receiptOFIPD.equals("off")) {
			deleteOnClickForRecieptIPDOffFlow(billRecSlaveId, request);
			records = 1;
		} else {
			deleteOnClickForRecieptIPDOnFlow(billRecSlaveId, request);
			records = 1;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @date :10-JULY-2017
	 * @code :for delete receipt of OPD off flow
	 ********/

	public int deleteOnClickForRecieptIPDOffFlow(Integer billRecSlaveId, HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			IpdBillReceiptSlaveDTO billReceiptSlaveDTO = (IpdBillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptSlaveDTO.class, billRecSlaveId);

			Integer masterID = billReceiptSlaveDTO.getBillReceiptMasterId();

			double amount = billReceiptSlaveDTO.getAmount();
			double concession = billReceiptSlaveDTO.getConcession();
			double finalAmt = amount - concession;

			billReceiptSlaveDTO.setDeleted("Y");
			billReceiptSlaveDTO.setDeletedBy(userId);
			billReceiptSlaveDTO.setDeletedDateTime(new Date(new java.util.Date().getTime()));

			// Get receipt master start
			IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptMasterDTO.class, masterID);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			// double remainingAmt =obje.getTotalRemain();
			// Get receipt master end

			// Reaming amount logic in delete
			/*
			 * if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
			 * remainingAmt = remainingAmt - finalAmt; }else{ remainingAmt = 0; }
			 */

			curAmtofMaster = curAmtofMaster - finalAmt;
			currTotalPaid = currTotalPaid - finalAmt;

			if (currTotalPaid < 0) {
				currTotalPaid = 0;
			}

			obje.setTotalAmt(curAmtofMaster);
			obje.setTotalPaid(currTotalPaid);

			String deleteRemark ="";
			
			if (curAmtofMaster == 0) {
				deleteMasterReceiptIPD(masterID,deleteRemark, request);
			}
			// obje.setTotalRemain(remainingAmt);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/********
	 * @author :BILAL
	 * @date :10-JULY-2017
	 * @code :for delete receipt of OPD on flow
	 ********/
	public int deleteOnClickForRecieptIPDOnFlow(Integer billRecSlaveId, HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			IpdBillReceiptSlaveDTO billReceiptSlaveDTO = (IpdBillReceiptSlaveDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptSlaveDTO.class, billRecSlaveId);

			Integer masterID = billReceiptSlaveDTO.getBillReceiptMasterId();

			double amount = billReceiptSlaveDTO.getAmount();
			double concession = billReceiptSlaveDTO.getConcession();
			double finalAmt = amount - concession;

			billReceiptSlaveDTO.setDeleted("Y");
			billReceiptSlaveDTO.setDeletedBy(userId);
			billReceiptSlaveDTO.setDeletedDateTime(new Date(new java.util.Date().getTime()));

			// Get receipt master start
			IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptMasterDTO.class, masterID);

			double curAmtofMaster = obje.getTotalAmt();
			double currTotalPaid = obje.getTotalPaid();
			double remainingAmt = obje.getTotalRemain();

			// Get receipt master end

			// Reaming amount logic in delete
			if (curAmtofMaster > currTotalPaid || curAmtofMaster == currTotalPaid) {
				remainingAmt = remainingAmt - finalAmt;
			} else {
				remainingAmt = 0;
			}

			curAmtofMaster = curAmtofMaster - finalAmt;

			obje.setTotalAmt(curAmtofMaster);
			obje.setTotalPaid(remainingAmt);

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/********
	 * @author :BILAL
	 * @date :21-JULY-2017
	 * @code :for delete master receipt of OPD
	 ********/
	@Override
	public int deleteMasterReceiptOPD(Integer recId, String deleteRemark, HttpServletRequest request) {

		// Integer billDetailsId=0;
		int records = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			// Get receipt master start
			BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, recId);
			obje.setDeleted("Y");
			obje.setDeleteRemark(deleteRemark);
			obje.setDeletedBy(userId);
			obje.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			Integer payMode = obje.getPayMode();
			double totalPaid = obje.getTotalPaid();

			if (obje.getAgainstId() > 0) {

				BillReceiptMasterDTO objToUpdate = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
						.get(BillReceiptMasterDTO.class, obje.getAgainstId());
				objToUpdate.setCreditFlag("N");
			}

			// Calling stored procedure for get super master of receipt
			Query query2 = sessionFactory.getCurrentSession().createSQLQuery("CALL fetchSuperReceiptId (:receiptId)")
					.setParameter("receiptId", recId);
			int masterRecId = (Integer) query2.uniqueResult();

			BillReceiptMasterDTO objToUpdate = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, masterRecId);
			objToUpdate.setTotalPaid(objToUpdate.getTotalPaid() - totalPaid);
			
			//added by vishant
			try {
				if (totalPaid != 0.0) {
					objToUpdate.setTotalRemain(objToUpdate.getTotalRemain() + (totalPaid+obje.getTotalDisc()));
					objToUpdate.setTotalDisc(objToUpdate.getTotalDisc() - obje.getTotalDisc());

					String sql = "update ehat_receipt_master set total_paid=" + objToUpdate.getTotalPaid()
							+ ", total_remain=" + (objToUpdate.getTotalRemain()+(totalPaid+obje.getTotalDisc())) + ", total_discount="
							+ objToUpdate.getTotalDisc() 
							+" , payable="+ objToUpdate.getTotalRemain()
							+ " where bill_receipt_id=" + masterRecId;
					sessionFactory.getCurrentSession().createSQLQuery(sql).executeUpdate();
					
					BillReceiptMasterDTO objToUpdatepayable = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
							.get(BillReceiptMasterDTO.class, masterRecId);
					objToUpdatepayable.setPayable(objToUpdate.getTotalRemain());
					
					
					
					billDao.setOpdRecMasterSlave(recId, recId, "delete", sessionFactory.getCurrentSession());
					
				} else {

					objToUpdate.setTotalRemain(objToUpdate.getTotalRemain() + (totalPaid+obje.getTotalDisc()));
					objToUpdate.setTotalDisc(objToUpdate.getTotalDisc() - obje.getTotalDisc());

					String sql = "update ehat_receipt_master set total_paid=" + objToUpdate.getTotalPaid()
							+ ", total_remain=" + objToUpdate.getTotalRemain() + ", total_discount="
							+ objToUpdate.getTotalDisc() 
							+" , payable="+ objToUpdate.getTotalRemain()
							+ " where bill_receipt_id=" + masterRecId;
					sessionFactory.getCurrentSession().createSQLQuery(sql).executeUpdate();
					
					
					BillReceiptMasterDTO objToUpdatepayable = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
							.get(BillReceiptMasterDTO.class, masterRecId);
					objToUpdatepayable.setPayable(objToUpdate.getTotalRemain());
					
					billDao.setOpdRecMasterSlave(recId, recId, "delete", sessionFactory.getCurrentSession());
				}

			} catch (Exception e) {
				e.printStackTrace();
			}
			
			
			

			Integer patientId = obje.getPatientId();
			Integer treatmentId = obje.getTreatmentId();
			String refundFlag = obje.getRefundFlag();
			double refundAmt = obje.getRefundAmt();
			Integer reciptcount = obje.getReceiptCount();
	
			 SQLQuery update2 = sessionFactory.getCurrentSession().
			 createSQLQuery("update ehat_multi_receipt_master set deleted= 'Y'   where bill_receipt_id=:bill_receipt_id ");
			 update2.setParameter("bill_receipt_id", recId);
			  update2.executeUpdate();
			 
			if (payMode == commonAdv) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComAdvbifergationDto.class);
				criteria.add(Restrictions.eq("receipt_id", recId));
				criteria.add(Restrictions.eq("bifergation_flag", "N"));
				// criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<ComAdvbifergationDto> listComandavbifgratin = criteria.list();
				for (ComAdvbifergationDto row : listComandavbifgratin) {

					Integer reciptid = row.getReceipt_id();
					Integer caid = row.getCadvid();
					Double amount = row.getAmount();

					Query update1 = sessionFactory.getCurrentSession().createQuery(
							"update ComAdvbifergationDto set bifergation_flag= 'Y'  where receipt_id= :receipt_id  ");

					update1.setParameter("receipt_id", reciptid);

					update1.executeUpdate();
					String sql = "select ifnull(deduct_common_amnt,0) from ehat_common_advance_master where common_adv_id = "
							+ caid;
					Query billDetailsIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					Double deduct_common_amnt = (Double) (billDetailsIdQuery.uniqueResult());
					if (deduct_common_amnt.equals(amount)) {
						Query update = sessionFactory.getCurrentSession()
								.createQuery("update CommonadvDto set remaining_amnt= remaining_amnt+ " + amount
										+ " ,deduct_common_amnt= " + 0
										+ "  where treatmentId= :treatmentId  and patient_ID= :patient_ID and  commonadv_id =:commonadv_id   and deleted='N'");

						update.setParameter("treatmentId", treatmentId);
						update.setParameter("patient_ID", patientId);
						update.setParameter("commonadv_id", caid);

						update.executeUpdate();
					} else {
						Query update = sessionFactory.getCurrentSession()
								.createQuery("update CommonadvDto set remaining_amnt= remaining_amnt+ " + amount
										+ " where treatmentId= :treatmentId  and patient_ID= :patient_ID and  commonadv_id =:commonadv_id  and deleted='N'");

						update.setParameter("treatmentId", treatmentId);
						update.setParameter("patient_ID", patientId);
						update.setParameter("commonadv_id", caid);

						update.executeUpdate();
					}

				}

			}
			if (refundFlag.equals("Y") && refundAmt > 0) {

				
			try {	
				Query update = sessionFactory.getCurrentSession().createQuery(
						"update BillRefundMasterDTO set deleted='Y' , deletedBy= :deletedBy , deletedDateTime= :deletedDateTime where againstId= :againstId  ");

				//update.setParameter("againstId", recId);
				update.setParameter("againstId", reciptcount);
				update.setParameter("deletedBy", userId);
				update.setDate("deletedDateTime", new Date(new java.util.Date().getTime()));

				update.executeUpdate();
				
				
			//added by vishant @reason delete flag after deleted receipt	
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillRefundMasterDTO.class);
				criteria.add(Restrictions.eq("againstId", reciptcount));
				criteria.setProjection(Projections.distinct(Projections.property("billRefundId")));

				List<Integer> listDocs = (List<Integer>) criteria.list();
				for (Integer id : listDocs) {
					if (id > 0) {
						Query updateRefundSlave = sessionFactory.getCurrentSession().createQuery(
								"update BillRefundSlaveDTO set deleted='Y' , deletedBy= :deletedBy , deletedDateTime= :deletedDateTime where billReceiptMasterId= :billReceiptMasterId  ");

						//update.setParameter("againstId", recId);
						updateRefundSlave.setParameter("billReceiptMasterId", id);
						updateRefundSlave.setParameter("deletedBy", userId);
						updateRefundSlave.setDate("deletedDateTime", new Date(new java.util.Date().getTime()));

						updateRefundSlave.executeUpdate();
					}
				}
				
			}catch (Exception e) {
				e.printStackTrace();
			}

			}
			// selecting other bill details id where billdetail's id

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillReceiptSlaveDTO.class);
			criteria.add(Restrictions.eq("billReceiptMasterId", recId));
			criteria.setProjection(Projections.distinct(Projections.property("billDetailsId")));

			List<Integer> listDocs = (List<Integer>) criteria.list();
			for (Integer id : listDocs) {
				if (id > 0) {
					BillDetailsDto objectToUpdate = (BillDetailsDto) sessionFactory.getCurrentSession()
							.get(BillDetailsDto.class, id);
					objectToUpdate.setPaidFlag("N");
					objectToUpdate.setRefundAmt(0.0);
					objectToUpdate.setRefundPer(0.0);
					sessionFactory.getCurrentSession().merge(objectToUpdate);
					
					List<EhatOtherBillDetailForOpdDto> list = sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForOpdDto.class)
					.add(Restrictions.eq("deleted", "N"))
					.add(Restrictions.eq("cancle", "N"))
					.add(Restrictions.eq("billDetailsId", id)).list();
					if(list.size()>0) {
						
						for (EhatOtherBillDetailForOpdDto dto : list) {
							
							dto.setRefund(0.0);
							dto.setRefundPer(0.0);
							dto.setPaidFlag("N");
							sessionFactory.getCurrentSession().merge(dto);
						}
					}
				}
			}

			java.util.Date date = new java.util.Date();
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());

			String sql = "update ehat_receipt_slave set deleted='Y',deleted_by =" + userId + ",deleted_date_time='"
					+ sqlDate + "' " + " where bill_receipt_master_id = " + recId;
			Query recSlaveDelQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recSlaveDelQuery.executeUpdate();
			
			

			records = 1;

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	/********
	 * @author :BILAL
	 * @date :21-JULY-2017
	 * @code :for reset master receipt of OPD
	 ********/
	@Override
	public int resetMasterReceiptOPD(Integer recId, HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			// Get receipt master start
			BillReceiptMasterDTO obje = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, recId);
			obje.setDeleted("N");

			double totalPaid = obje.getTotalPaid();

			if (obje.getAgainstId() > 0) {

				BillReceiptMasterDTO objToUpdate = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
						.get(BillReceiptMasterDTO.class, obje.getAgainstId());
				objToUpdate.setCreditFlag("Y");
			}

			// Calling stored procedure for get super master of receipt
			Query query2 = sessionFactory.getCurrentSession().createSQLQuery("CALL fetchSuperReceiptId (:receiptId)")
					.setParameter("receiptId", recId);
			int masterRecId = (Integer) query2.uniqueResult();

			BillReceiptMasterDTO objToUpdate = (BillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(BillReceiptMasterDTO.class, masterRecId);
			objToUpdate.setTotalPaid(objToUpdate.getTotalPaid() + totalPaid);
			objToUpdate.setTotalRemain(objToUpdate.getTotalRemain() - totalPaid);

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillReceiptSlaveDTO.class);
			criteria.add(Restrictions.eq("billReceiptMasterId", recId));
			criteria.setProjection(Projections.distinct(Projections.property("billDetailsId")));

			List<Integer> listDocs = (List<Integer>) criteria.list();
			for (Integer id : listDocs) {
				if (id > 0) {
					BillDetailsDto objectToUpdate = (BillDetailsDto) sessionFactory.getCurrentSession()
							.get(BillDetailsDto.class, id);
					objectToUpdate.setPaidFlag("Y");
				}

			}

			java.util.Date date = new java.util.Date();
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());

			String sql = "update ehat_receipt_slave set deleted='N',updated_by =" + userId + ",updated_date_time='"
					+ sqlDate + "' " + " where bill_receipt_master_id = " + recId;
			Query recSlaveDelQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			recSlaveDelQuery.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/********
	 * @author :BILAL
	 * @date :21-JULY-2017
	 * @code :for delete master receipt of IPD
	 ********/
	@Override
	public int deleteMasterReceiptIPD(Integer recId,String deleteRemark,	 HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");

			// Get receipt master start
			IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptMasterDTO.class, recId);
			obje.setDeleted("Y");
			obje.setDeletedBy(userId);
			obje.setDeleteRemark(deleteRemark);
			obje.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			Integer payMode = obje.getPayMode();
			double totalPaid = obje.getTotalPaid();
			Integer patientId = obje.getPatientId();
			Integer treatmentId = obje.getTreatmentId();
			String refundFlag = obje.getRefundFlag();
			double refundAmt = obje.getRefundAmt();

			if (payMode == commonAdv) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComAdvbifergationDto.class);
				criteria.add(Restrictions.eq("receipt_id", recId));
				criteria.add(Restrictions.eq("bifergation_flag", "N"));
				// criteria.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<ComAdvbifergationDto> listComandavbifgratin = criteria.list();
				for (ComAdvbifergationDto row : listComandavbifgratin) {

					Integer reciptid = row.getReceipt_id();
					Integer caid = row.getCadvid();
					Double amount = row.getAmount();

					Query update1 = sessionFactory.getCurrentSession().createQuery(
							"update ComAdvbifergationDto set bifergation_flag= 'Y'  where receipt_id= :receipt_id  ");

					update1.setParameter("receipt_id", reciptid);

					update1.executeUpdate();
					String sql = "select ifnull(deduct_common_amnt,0) from ehat_common_advance_master where common_adv_id = "
							+ caid;
					Query billDetailsIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					Double deduct_common_amnt = (Double) (billDetailsIdQuery.uniqueResult());
					if (deduct_common_amnt.equals(amount)) {
						Query update = sessionFactory.getCurrentSession()
								.createQuery("update CommonadvDto set remaining_amnt= remaining_amnt+ " + amount
										+ " ,deduct_common_amnt= " + 0
										+ "  where treatmentId= :treatmentId  and patient_ID= :patient_ID and  commonadv_id =:commonadv_id   and deleted='N'");

						update.setParameter("treatmentId", treatmentId);
						update.setParameter("patient_ID", patientId);
						update.setParameter("commonadv_id", caid);

						update.executeUpdate();
					} else {
						Query update = sessionFactory.getCurrentSession()
								.createQuery("update CommonadvDto set remaining_amnt= remaining_amnt+ " + amount
										+ " where treatmentId= :treatmentId  and patient_ID= :patient_ID and  commonadv_id =:commonadv_id  and deleted='N'");

						update.setParameter("treatmentId", treatmentId);
						update.setParameter("patient_ID", patientId);
						update.setParameter("commonadv_id", caid);

						update.executeUpdate();
					}

				}

			}

			if (refundFlag.equals("Y") && refundAmt > 0) {

				Query update = sessionFactory.getCurrentSession().createQuery(
						"update IpdBillRefundMasterDTO set deleted='Y' , deletedBy= :deletedBy , deletedDateTime= :deletedDateTime where againstId= :againstId  ");

				update.setParameter("againstId", recId);
				update.setParameter("deletedBy", userId);
				update.setDate("deletedDateTime", new Date(new java.util.Date().getTime()));

				update.executeUpdate();

			}
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdBillReceiptSlaveDTO.class);
			criteria.add(Restrictions.eq("billReceiptMasterId", recId));
			criteria.setProjection(Projections.distinct(Projections.property("billDetailsId")));

			List<Integer> listDocs = (List<Integer>) criteria.list();
			for (Integer id : listDocs) {
				if (id > 0) {
					BillDetailsIpdDto objectToUpdate = (BillDetailsIpdDto) sessionFactory.getCurrentSession()
							.get(BillDetailsIpdDto.class, id);
					objectToUpdate.setPaidFlag("N");
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/********
	 * @author :BILAL
	 * @date :21-JULY-2017
	 * @code :for reset master receipt of IPD
	 ********/
	@Override
	public int resetMasterReceiptIPD(Integer recId, HttpServletRequest request) {

		try {
			// HttpSession session = request.getSession();
			// Integer userId = (Integer) session.getAttribute("userId1");

			// Get receipt master start
			IpdBillReceiptMasterDTO obje = (IpdBillReceiptMasterDTO) sessionFactory.getCurrentSession()
					.get(IpdBillReceiptMasterDTO.class, recId);
			obje.setDeleted("N");

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdBillReceiptSlaveDTO.class);
			criteria.add(Restrictions.eq("billReceiptMasterId", recId));
			criteria.setProjection(Projections.distinct(Projections.property("billDetailsId")));

			List<Integer> listDocs = (List<Integer>) criteria.list();
			for (Integer id : listDocs) {
				if (id > 0) {

					BillDetailsIpdDto objectToUpdate = (BillDetailsIpdDto) sessionFactory.getCurrentSession()
							.get(BillDetailsIpdDto.class, id);
					objectToUpdate.setPaidFlag("Y");
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/********
	 * @author :BILAL
	 * @date :7-JULY-2017
	 * @code :for save and update records in other bill details
	 ********/
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
					/*
					 * records = saveOpdPackageForSponsor(sponsorId, chargesSlaveId, billDetailsDto,
					 * queryType, iscombination, a,request);
					 */
					records = 4;
				}

			} catch (Exception e) {
				e.printStackTrace();
				records = 0;
			}
			return records;
		} else {
			try {
				sessionFactory.getCurrentSession().merge(billDetailsDto);
				records = 1;
			} catch (Exception e) {
				e.printStackTrace();
				return records;
			}
		}

		return records;
	}

	/*****
	 * @author :BILAL
	 * @Date :28-11-2017
	 * @Code :For From-Date from configuration
	 ******/
	public java.sql.Date fromDatePackage(int sponsorId, int chargesSlaveId, int hallId, int hallSlaveId, int subServId,
			int serviceId) {
		java.sql.Date fromd = null;
		try {
			Query fromdate = sessionFactory.getCurrentSession().createQuery(
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

	/*****
	 * @author :BILAL
	 * @Date :28-11-2017
	 * @Code :For To-Date from configuration
	 ******/
	public java.sql.Date toDatePackage(int sponsorId, int chargesSlaveId, int hallId, int hallSlaveId, int subServId,
			int serviceId) {
		java.sql.Date todate = null;
		try {
			Query date = sessionFactory.getCurrentSession().createQuery(
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

	/*****
	 * @author :BILAL
	 * @Date :28-11-2017
	 * @Code :For Comparing From-Date and To-Date from configuration table
	 ******/
	private long countDate(Integer sponsorId, Integer chargesSlaveId, Integer hallId, Integer hallSlaveId,
			int subServId, int serviceId, java.sql.Date fromd, java.sql.Date todate) {
		long count = 0;
		try {
			// getting charges from Auto suggestion date wise
			Query bet = sessionFactory.getCurrentSession().createQuery(
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

	/*****
	 * @author :BILAL
	 * @Date :15-11-2017
	 * @Code :For Package count in configuration
	 ******/
	private int count(Integer sponsorId, Integer chargesSlaveId, Integer hallId, Integer hallSlaveId, int subServId,
			int serviceId) {

		Query q = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT count(*) as count FROM ehat_configuration_services where deleted='N' "
						+ " and charges_id=" + sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and hall_id="
						+ hallId + " and hallSlave_id=" + hallSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId);

		Integer count = ((Number) q.uniqueResult()).intValue();
		return count;
	}

	/**
	 * @author :BILAL
	 * @param request
	 * @date :9-AUG-2017
	 * @code :for saving package billing OPD and iscombination='Y'
	 **/
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
					sessionFactory.getCurrentSession().merge(billDetailsDto);
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

	/*****
	 * @author :BILAL
	 * @param request
	 * @Date :14-11-2014
	 * @Code :Adding package from OPD billing
	 *****/
	private void addpackagefromBilling(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {// saving records in bill
																							// details

		int billidd = billDetailsDto.getBillId();

		String billmasterr = "SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
				+ billidd;
		SQLQuery billmasterqueryy = sessionFactory.getCurrentSession().createSQLQuery(billmasterr);
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
		sessionFactory.getCurrentSession().merge(billDetailsDto);

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
		Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
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

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
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
			SQLQuery billmasterquery = sessionFactory.getCurrentSession().createSQLQuery(billmaster);
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
			SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, subId);
			obj.setChildServiceId(obje.getServiceId());
			obj.setSelfid(0);
			sessionFactory.getCurrentSession().merge(obj);

			// for package of package
			/*
			 * if (iscombinationflag.equals("Y")) {
			 * packofpack(sponsorId,chargesSlaveId,billDetailsDto,serviceId,subserviceId,
			 * hallId,hallSlaveId,maxBillId,quantity,charges); }
			 */

		}
	}

	/****
	 * @author :BILAL
	 * @param request
	 * @Date :15-11-2017
	 * @Code :For Adding or saving package from receipt
	 *****/
	private void addpackagefromreceipt(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {// saving records in bill
																							// details
		sessionFactory.getCurrentSession().merge(billDetailsDto);

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

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
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
			SQLQuery billmasterquery = sessionFactory.getCurrentSession().createSQLQuery(billmaster);
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
			SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, subId);
			obj.setChildServiceId(obje.getServiceId());

			sessionFactory.getCurrentSession().merge(obj);

		}
	}

	/*******
	 * @author :BILAL
	 * @date :10-11-2017
	 * @code :for package of package
	 *       *
	 ****/
	public int packofpack(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto, Integer serviceId,
			Integer subserviceId, Integer hallId, Integer hallSlaveId, Integer maxBillId, int quantity,
			double charges) {
		int records = 0;
		try {

			// max count of other BillDetails Id
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForOpdDto.class);
			criteria.setProjection(Projections.max("otherBillDetailsId"));
			Integer maxOtherBillId = (Integer) criteria.uniqueResult();

			if (maxOtherBillId == null) {
				maxOtherBillId = 0;
			}

			String query2 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
					+ sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
					+ " and is_com_servlastId=" + subserviceId + " and hall_id=" + hallId + " and hallSlave_id="
					+ hallSlaveId + " and deleted='N'";

			SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(query2);
			query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> data2 = query3.list();
			for (Map<String, Object> row2 : data2) {
				EhatOtherBillDetailForOpdDto obj2 = new EhatOtherBillDetailForOpdDto();

				double copay2 = 0;
				double pay2 = 0;
				double concession2 = 0;
				double charges2 = (Double) row2.get("charges");
				double amountofcon2 = 0;
				String iscombinationflag2 = (String) row2.get("iscombination");
				double totalcharges = (Double) row2.get("totalcharges");
				Integer subserviceId2 = (Integer) row2.get("service_id");

				obj2.setRate((Double) row2.get("charges"));

				obj2.setChildSubServiceId((Integer) row2.get("service_id"));

				obj2.setSubServiceId(subserviceId);

				obj2.setServiceId(billDetailsDto.getServiceId());
				obj2.setBillId(billDetailsDto.getBillId());
				obj2.setBillDetailsId(maxBillId);
				obj2.setCreatedDateTime(billDetailsDto.getCreatedDateTime());
				obj2.setCreatedBy(billDetailsDto.getUnitId());
				obj2.setCreatedDateTime(new Date(new java.util.Date().getTime()));

				obj2.setCancle("N");
				obj2.setDeleted("N");

				obj2.setUnitId(billDetailsDto.getUnitId());
				obj2.setDepartmentId(billDetailsDto.getDepartmentId());
				obj2.setDoctorId(billDetailsDto.getDoctorId());

				obj2.setTreatmentId(billDetailsDto.getTreatmentId());
				obj2.setPatienttId(billDetailsDto.getPatienttId());

				obj2.setChargesId(sponsorId);
				obj2.setChargesSlaveId(chargesSlaveId);

				amountofcon2 = charges2 * quantity;
				copay2 = charges2 * quantity - concession2;
				pay2 = amountofcon2 - copay2;

				// distributed amount formula
				double IncDecp = amountofcon2 * 100 / totalcharges;
				amountofcon2 = IncDecp * charges / 100;

				obj2.setAmount(amountofcon2);
				obj2.setCoPay(copay2);
				obj2.setPay(pay2);
				obj2.setConcession(concession2);

				obj2.setQuantity(quantity);
				obj2.setIscombination(iscombinationflag2);

				// setting service id in other bill details table
				Integer subId2 = (Integer) row2.get("service_id");
				SubServiceDto obje2 = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
						subId2);
				obj2.setChildServiceId(obje2.getServiceId());
				obj2.setSelfid(maxOtherBillId);
				sessionFactory.getCurrentSession().merge(obj2);
				records = 1;
				if (iscombinationflag2.equals("Y")) {
					subserviceId = subserviceId2;
					charges = charges2;
					packofpack(sponsorId, chargesSlaveId, billDetailsDto, serviceId, subserviceId, hallId, hallSlaveId,
							maxBillId, quantity, charges);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			records = 0;
		}
		return records;
	}

	/**
	 * @author :BILAL
	 * @param request
	 * @date :9-AUG-2017
	 * @code :for OPD sponsor package billing save
	 **/
	public int saveOpdPackageForSponsor(Integer sponsorId, Integer chargesSlaveId, BillDetailsDto billDetailsDto,
			String queryType, String iscombination, String a, HttpServletRequest request) {
		int records = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (queryType.equals("update")) {

				sessionFactory.getCurrentSession().merge(billDetailsDto);

			} else {
				// saving records in bill details
				sessionFactory.getCurrentSession().merge(billDetailsDto);

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
				Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
				criteriaMax.setProjection(Projections.max("billDetailsId"));
				Integer maxBillId = (Integer) criteriaMax.uniqueResult();

				if (maxBillId == null) {
					maxBillId = 0;
				}

				String query1 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
						+ sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId + " and hall_id=" + hallId + " and hallSlave_id="
						+ hallSlaveId + " and deleted='N'";

				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
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
					SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
							subId);
					obj.setChildServiceId(obje.getServiceId());

					sessionFactory.getCurrentSession().merge(obj);
				}
			}

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			records = 0;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @date :7-JULY-2017
	 * @code :for save and update record in other bill details ipd for package
	 *       billing
	 ********/
	@Override
	public int saveToOtherBillingIpd(BillDetailsIpdDto billDetailsIpdDto, String queryType, Integer sponsorId,
			Integer chargesSlaveId, String a, HttpServletRequest request) {

		int records = 0;

		String iscombination = billDetailsIpdDto.getIscombination();
		Integer hallId = billDetailsIpdDto.getHallId();
		// Integer hallSlaveId =0;
		Integer hallSlaveId = billDetailsIpdDto.getHallSlaveId();
		int subServId = billDetailsIpdDto.getSubServiceId();
		int serviceId = billDetailsIpdDto.getServiceId();
		int treatId = billDetailsIpdDto.getTreatmentId();

		// if count greater than zero then package will be assign

		if (chargesSlaveId > 0) {
			sponsorId = 1;
		}

		if (hallSlaveId > 0) {
			hallId = 2;
		}
		if (iscombination.equals("Y") && sponsorId == 0 && chargesSlaveId == 0) {
			try {

				/*
				 * if(hallId > 0){ //Get Bed Id of patient whose treatment is active hallSlaveId
				 * =
				 * gethallSlaveId(treatId,hallId,hallSlaveId,sponsorId,chargesSlaveId,subServId,
				 * serviceId); }
				 */

				int count = count(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
				if (count > 0) {
					records = saveOpdPackageForGeneralIpd(sponsorId, chargesSlaveId, billDetailsIpdDto, queryType,
							iscombination, a, hallId, hallSlaveId, request);
				} else {
					records = 4;
				}

			} catch (Exception e) {
				e.printStackTrace();
				records = 0;
			}
			return records;
			// && receiptOf.equals("sponsor")
		} else if (iscombination.equals("Y") && sponsorId > 0 && chargesSlaveId > 0) {

			try {

				/*
				 * if(hallId > 0){ //Get Bed Id of patient whose treatment is active hallSlaveId
				 * =
				 * gethallSlaveId(treatId,hallId,hallSlaveId,sponsorId,chargesSlaveId,subServId,
				 * serviceId); }
				 */

				// calling count method to get the count of package if count greater than zero
				// than package will be save
				int count = count(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);
				if (count > 0) {
					records = saveOpdPackageForSponsorIpd(sponsorId, chargesSlaveId, billDetailsIpdDto, queryType,
							iscombination, a, hallId, hallSlaveId, request);
				}
				// calling count method to get the count of package if count greater than zero
				// than package will be save with hall
				else {
					sponsorId = 0;
					chargesSlaveId = 0;

					/*
					 * if(hallId > 0){ //Get Bed Id of patient whose treatment is active hallSlaveId
					 * =
					 * gethallSlaveId(treatId,hallId,hallSlaveId,sponsorId,chargesSlaveId,subServId,
					 * serviceId); }
					 */

					count = count(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);

					if (count > 0) {
						records = 3;

					} else {
						records = 4;

						/*
						 * records = saveOpdPackageForSponsorIpd(sponsorId, chargesSlaveId,
						 * billDetailsIpdDto, queryType, iscombination, a, hallId, hallSlaveId,request);
						 */

					}

				}

			} catch (Exception e) {
				e.printStackTrace();
				records = 0;
			}
			return records;
		} else {
			try {
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
				records = 1;
			} catch (Exception e) {
				e.printStackTrace();
				return records;
			}
		}

		System.err.println(records + " records and count??????????????????????/" + hallSlaveId);

		return records;

	}

	/******
	 * @author :BILAL
	 * @param hallSlaveId
	 * @param hallId
	 * @param request
	 * @Date :16-11-2017
	 * @Code :For saving records of IPD package billing
	 *********/
	private int saveOpdPackageForGeneralIpd(Integer sponsorId, Integer chargesSlaveId,
			BillDetailsIpdDto billDetailsIpdDto, String queryType, String iscombination, String a, Integer hallId,
			Integer hallSlaveId, HttpServletRequest request) {
		int records = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			int billidd = billDetailsIpdDto.getBillId();

			String billmasterr = "SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
					+ billidd;
			SQLQuery billmasterqueryy = sessionFactory.getCurrentSession().createSQLQuery(billmasterr);
			billmasterqueryy.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			List<Map<String, Object>> databillmasterr = billmasterqueryy.list();
			int chidd = 0;
			int chslavidd = 0;
			for (Map<String, Object> rowbillmaster : databillmasterr) {
				chidd = (Integer) rowbillmaster.get("source_type_id");
				chslavidd = (Integer) rowbillmaster.get("charges_master_slave_id");

			}
			billDetailsIpdDto.setSponsorId(chidd);
			billDetailsIpdDto.setChargesSlaveId(chslavidd);

			if (queryType.equals("update")) {
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
			} else {
				// saving records in bill details
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);

				int subServId = billDetailsIpdDto.getSubServiceId();
				int serviceId = billDetailsIpdDto.getServiceId();
				// String receiptOf =billDetailsIpdDto.getReceiptOf();
				int quantity = 1;

				double amount = billDetailsIpdDto.getAmount();
				double con = billDetailsIpdDto.getConcession();
				double otheramt = billDetailsIpdDto.getOtherAmount();
				double othercon = billDetailsIpdDto.getOtherConcession();
				double actualam = amount - con;
				double actualotheramt = otheramt - othercon;
				// int treatId =billDetailsIpdDto.getTreatmentId();
				// Integer billDetailsId = billDetailsIpdDto.getBillDetailsId();

				// max count of bill details id
				Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
				criteriaMax.setProjection(Projections.max("billDetailsId"));
				Integer maxBillId = (Integer) criteriaMax.uniqueResult();

				if (maxBillId == null) {
					maxBillId = 0;
				}

				String query1 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
						+ sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId + " and hall_id=" + hallId + " and hallSlave_id="
						+ hallSlaveId + " and deleted='N'";

				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> data = query.list();
				for (Map<String, Object> row : data) {

					EhatOtherBillDetailForIpdDto obj = new EhatOtherBillDetailForIpdDto();

					double copay = 0;
					double pay = 0;
					double concession = 0;
					double charges = (Double) row.get("charges");
					double amountofcon = 0;
					String iscombinationflag = (String) row.get("iscombination");
					double totalcharges = (Double) row.get("totalcharges");

					// distributed amount formula
					double IncDecp = charges * 100 / totalcharges;
					charges = IncDecp * actualam / 100;
					obj.setRate(charges);

					double chargessposor = (Double) row.get("charges");

					double amountofconsponsor = 0;
					double otherpay = 0;
					double othercopay = 0;

					// distributed amount formula for sponsor charges
					double IncDecp2 = chargessposor * 100 / totalcharges;
					int billid = billDetailsIpdDto.getBillId();

					String billmaster = "SELECT source_type_id,charges_master_slave_id FROM ehat_bill_master where deleted='N' and bill_id="
							+ billid;
					SQLQuery billmasterquery = sessionFactory.getCurrentSession().createSQLQuery(billmaster);
					billmasterquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

					List<Map<String, Object>> databillmaster = billmasterquery.list();
					int chid = 0;
					int chslavid = 0;
					for (Map<String, Object> rowbillmaster : databillmaster) {
						chid = (Integer) rowbillmaster.get("source_type_id");
						chslavid = (Integer) rowbillmaster.get("charges_master_slave_id");

					}
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

					obj.setSubServiceId(billDetailsIpdDto.getSubServiceId());

					obj.setServiceId(billDetailsIpdDto.getServiceId());
					obj.setBillId(billDetailsIpdDto.getBillId());
					obj.setBillDetailsId(maxBillId);
					obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());
					obj.setCreatedBy(userId);
					obj.setUnitId(unitId);
					obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));

					obj.setCancle("N");
					obj.setDeleted("N");

					obj.setDepartmentId(billDetailsIpdDto.getDepartmentId());
					obj.setDoctorId(billDetailsIpdDto.getDoctorId());

					obj.setTreatmentId(billDetailsIpdDto.getTreatmentId());
					obj.setPatienttId(billDetailsIpdDto.getPatienttId());

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

					Integer subId = (Integer) row.get("service_id");
					SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
							subId);
					obj.setChildServiceId(obje.getServiceId());
					sessionFactory.getCurrentSession().merge(obj);
				}
			}

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}

	/********
	 * @author :BILAL
	 * @param request
	 * @Date :15-11-2017
	 * @Code :For saving IPD sponsor package
	 **********/
	private int saveOpdPackageForSponsorIpd(Integer sponsorId, Integer chargesSlaveId,
			BillDetailsIpdDto billDetailsIpdDto, String queryType, String iscombination, String a, Integer hallId,
			Integer hallSlaveId, HttpServletRequest request) {
		int records = 0;

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (queryType.equals("update")) {
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
			} else {
				// saving records in bill details
				sessionFactory.getCurrentSession().merge(billDetailsIpdDto);

				int subServId = billDetailsIpdDto.getSubServiceId();
				int serviceId = billDetailsIpdDto.getServiceId();
				// int deptID = billDetailsIpdDto.getDepartmentId();
				// String receiptOf =billDetailsIpdDto.getReceiptOf();
				int quantity = 1;

				double amount = billDetailsIpdDto.getAmount();
				double con = billDetailsIpdDto.getConcession();
				double otheramt = billDetailsIpdDto.getOtherAmount();
				double othercon = billDetailsIpdDto.getOtherConcession();
				double actualam = amount - con;
				double actualotheramt = otheramt - othercon;

				// max count of bill details id
				Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
				criteriaMax.setProjection(Projections.max("billDetailsId"));
				Integer maxBillId = (Integer) criteriaMax.uniqueResult();

				if (maxBillId == null) {
					maxBillId = 0;
				}
				// bill details id from other OPD bill table
				// Integer otherbillDetailsId = 0;

				String query1 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where charges_id="
						+ sponsorId + " and chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId + " and hall_id=" + hallId + " and hallSlave_id="
						+ hallSlaveId + " and deleted='N'";

				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> data = query.list();
				for (Map<String, Object> row : data) {

					EhatOtherBillDetailForIpdDto obj = new EhatOtherBillDetailForIpdDto();
					double copay = 0;
					double pay = 0;
					double concession = 0;
					double charges = (Double) row.get("charges");
					double amountofcon = 0;

					String iscombinationflag = (String) row.get("iscombination");
					double totalcharges = (Double) row.get("totalcharges");

					// distributed amount formula
					double IncDecp = charges * 100 / totalcharges;
					charges = IncDecp * actualam / 100;
					obj.setRate(charges);

					double chargessposor = (Double) row.get("charges");
					double amountofconsponsor = 0;
					double otherpay = 0;
					double othercopay = 0;
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

					obj.setSubServiceId(billDetailsIpdDto.getSubServiceId());
					obj.setServiceId(billDetailsIpdDto.getServiceId());
					obj.setBillId(billDetailsIpdDto.getBillId());
					obj.setBillDetailsId(maxBillId);
					obj.setCreatedDateTime(billDetailsIpdDto.getCreatedDateTime());
					obj.setCreatedBy(userId);
					obj.setUnitId(unitId);

					obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));

					obj.setCancle("N");
					obj.setDeleted("N");

					obj.setDepartmentId(billDetailsIpdDto.getDepartmentId());
					obj.setDoctorId(billDetailsIpdDto.getDoctorId());

					obj.setTreatmentId(billDetailsIpdDto.getTreatmentId());
					obj.setPatienttId(billDetailsIpdDto.getPatienttId());

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
					SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
							subId);
					obj.setChildServiceId(obje.getServiceId());

					sessionFactory.getCurrentSession().merge(obj);
				}

			}

			records = 1;
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}

	/*******
	 * @author :BILAL
	 * @Date :15-11-2017
	 * @Code :For getting hall slave id
	 *******/
	private int gethallSlaveId(int treatId, Integer hallId, Integer hallSlaveId, Integer sponsorId,
			Integer chargesSlaveId, int subServId, int serviceId) {

		try {

			// get hall id from hall table
			Query bedID = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT sub_service_id FROM ehat_bill_details_ipd where on_bed_flag='Y' and  treatment_id="
							+ treatId + " limit 1");
			int hsid = (Integer) bedID.uniqueResult();

			// get hall slave id from hall table
			Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT hall.ehat_hallid FROM ehat_bill_details_ipd INNER JOIN beds ON ehat_bill_details_ipd.sub_service_id=beds.Bed_ID INNER JOIN hall on hall.Hall_ID = beds.Hall_ID where  ehat_bill_details_ipd.sub_service_id="
							+ hsid);

			hallSlaveId = (Integer) hallType.uniqueResult();

			// Calling count method to check count is available or not
			Integer count = count(sponsorId, chargesSlaveId, hallId, hallSlaveId, subServId, serviceId);

			if (count > 0) {
				System.err.println("????????countcountcountcount????????????has" + hallSlaveId);
			} else {
				// Calling method of auto suggestion service layer to get super hall ids
				AutosuggestionService obj = (ApplicationContextUtils.getApplicationContext())
						.getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
				ltSubCharges = obj.fetchSuperCatofchargesSlave(hallSlaveId);
				if (ltSubCharges.size() > 0) {

					for (int i = 0; i < ltSubCharges.size(); i++) {

						// checking count with new hall slave id
						Integer count1 = count(sponsorId, chargesSlaveId, hallId, ltSubCharges.get(i).getSlaveId(),
								subServId, serviceId);
						// if count greater than zero than loop will break
						if (count1 > 0) {
							hallSlaveId = ltSubCharges.get(i).getSlaveId();
							break;
						}

					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return hallSlaveId;
		}

		return hallSlaveId;

	}

	/**
	 * @author :Bilal
	 * @date :8-Aug-2017
	 * @code :for opd package billing save and update
	 **/
	@Override
	public int savePackageOpd(EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto, HttpServletRequest request,
			String queryType, String callfrom) {

		Integer otherBillDetailsId = ehatOtherBillDetailForOpdDto.getOtherBillDetailsId();
		// Integer billDetailsId = ehatOtherBillDetailForOpdDto.getBillDetailsId();
		// Integer chargesId = ehatOtherBillDetailForOpdDto.getChargesId();
		// Integer chargesSlaveId = ehatOtherBillDetailForOpdDto.getChargesSlaveId();
		String iscombination = ehatOtherBillDetailForOpdDto.getIscombination();
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		int records = 0;
		try {
			if (otherBillDetailsId > 0) {

				EhatOtherBillDetailForOpdDto obj = (EhatOtherBillDetailForOpdDto) sessionFactory.getCurrentSession()
						.get(EhatOtherBillDetailForOpdDto.class, otherBillDetailsId);
				// double amountold = obj.getAmount();
				// double amountnew = ehatOtherBillDetailForOpdDto.getAmount();

				// double difference = amountnew - amountold ;

				obj.setAmount(ehatOtherBillDetailForOpdDto.getAmount());
				obj.setBillDetailsId(ehatOtherBillDetailForOpdDto.getBillDetailsId());
				obj.setBillId(ehatOtherBillDetailForOpdDto.getBillId());
				obj.setQuantity(ehatOtherBillDetailForOpdDto.getQuantity());
				obj.setRate(ehatOtherBillDetailForOpdDto.getRate());
				obj.setChildSubServiceId(ehatOtherBillDetailForOpdDto.getChildSubServiceId());
				obj.setDoctorId(ehatOtherBillDetailForOpdDto.getDoctorId());
				obj.setServiceId(ehatOtherBillDetailForOpdDto.getServiceId());
				obj.setSubServiceId(ehatOtherBillDetailForOpdDto.getSubServiceId());

				obj.setOtherAmount(ehatOtherBillDetailForOpdDto.getOtherAmount());
				obj.setOtherRate(ehatOtherBillDetailForOpdDto.getOtherRate());
				obj.setOtherPay(ehatOtherBillDetailForOpdDto.getOtherPay());

				obj.setUpdatedBy(userId);
				obj.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				obj.setExtraFlag("Y");
				obj.setChildServiceId(ehatOtherBillDetailForOpdDto.getChildServiceId());
				obj.setIscombination(iscombination);
				records = 2;

			} else {

				ehatOtherBillDetailForOpdDto.setCreatedBy(userId);
				ehatOtherBillDetailForOpdDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				ehatOtherBillDetailForOpdDto.setDeleted("N");
				ehatOtherBillDetailForOpdDto.setCancle("N");
				ehatOtherBillDetailForOpdDto.setExtraFlag("Y");
				ehatOtherBillDetailForOpdDto.setIscombination(iscombination);

				sessionFactory.getCurrentSession().merge(ehatOtherBillDetailForOpdDto);
				records = 1;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}

		return records;
	}

	/**
	 * @author :BILAL
	 * @param :ehatOtherBillDetailForOpdDto
	 * @date :8-08-2017
	 * @code :for calculations of OPD bill details
	 **/
	public int calculations(Integer billDetailsId, Integer chargesId, Integer chargesSlaveId,
			EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto, String callfrom) {

		BillDetailsDto obj = (BillDetailsDto) sessionFactory.getCurrentSession().get(BillDetailsDto.class,
				billDetailsId);
		// double amount =obj.getAmount();
		double copay = obj.getCoPay();
		double pay = obj.getPay();
		double concession = obj.getConcession();
		double quantity = obj.getQuantity();
		double rate = obj.getRate();
		double amountPak = ehatOtherBillDetailForOpdDto.getAmount();
		double amountTosave = 0;
		double rateToSave = 0;

		if (chargesId > 0 && chargesSlaveId > 0) {
			rateToSave = rate + amountPak;
			amountTosave = rateToSave * quantity;

			if (callfrom.equals("sponsor")) {
				// pay = amountTosave - concession;
				copay = amountTosave - concession;
			} else {
				copay = amountTosave - concession;
			}

		} else {
			rateToSave = rate + amountPak;
			amountTosave = rateToSave * quantity;
			copay = amountTosave - concession;
		}

		obj.setPay(pay);
		obj.setCoPay(copay);
		obj.setAmount(amountTosave);
		obj.setRate(rateToSave);

		return 1;

	}

	/**
	 * @author :Bilal
	 * @date :8-Aug-2017
	 * @code :for calculations of opd billdetails on update
	 **/
	public int calculationsupdate(Integer billDetailsId, Integer chargesId, Integer chargesSlaveId,
			EhatOtherBillDetailForOpdDto ehatOtherBillDetailForOpdDto, String callfrom, double difference) {

		BillDetailsDto obj = (BillDetailsDto) sessionFactory.getCurrentSession().get(BillDetailsDto.class,
				billDetailsId);
		// double amount =obj.getAmount();
		double copay = obj.getCoPay();
		double pay = obj.getPay();
		double concession = obj.getConcession();
		double quantity = obj.getQuantity();
		double rate = obj.getRate();

		double amountTosave = 0;
		double rateToSave = 0;

		if (chargesId > 0 && chargesSlaveId > 0) {
			rateToSave = rate + difference;
			amountTosave = rateToSave * quantity;

			if (callfrom.equals("sponsor")) {
				// pay = amountTosave - concession;
				copay = amountTosave - concession;
			} else {
				copay = amountTosave - concession;
			}

		} else {
			rateToSave = rate + difference;
			amountTosave = rateToSave * quantity;
			copay = amountTosave - concession;
		}

		obj.setPay(pay);
		obj.setCoPay(copay);
		obj.setAmount(amountTosave);
		obj.setRate(rateToSave);

		return 1;

	}

	/**
	 * @author :Bilal
	 * @date :16-aug-2017
	 * @code :for cancle the services of opd package billing
	 **/
	@Override
	public int cancleOPDPackageSer(Integer otherBillDetailsId, String cancleType, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		try {
			EhatOtherBillDetailForOpdDto obj = (EhatOtherBillDetailForOpdDto) sessionFactory.getCurrentSession()
					.get(EhatOtherBillDetailForOpdDto.class, otherBillDetailsId);

			obj.setDeletedBy(userId);
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			obj.setDeleted("Y");
			obj.setCancle("Y");
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	/**
	 * @author :Bilal
	 * @date :16-aug-2017
	 * @code :for cancle the services of ipd package billing
	 **/
	@Override
	public int cancleIPDPackageSer(Integer otherBillDetailsId, String cancleType, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		try {

			EhatOtherBillDetailForIpdDto obj = (EhatOtherBillDetailForIpdDto) sessionFactory.getCurrentSession()
					.get(EhatOtherBillDetailForIpdDto.class, otherBillDetailsId);

			obj.setDeletedBy(userId);
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			obj.setDeleted("Y");
			obj.setCancle("Y");
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	@Override
	public CpoeServdetails fetchlabbilldetails(Integer tID, String callform, Integer deptId) {
		CpoeServdetails objCpoe = new CpoeServdetails();
		List<LabRequestDTO> labReqList = new ArrayList<LabRequestDTO>();
		List<LabRequestSlaveDTO> labReqSlvList = new ArrayList<LabRequestSlaveDTO>();
		List<CpoeServdetails> tlistbiilall = new ArrayList<CpoeServdetails>();
		String fetchId = "";
		Calendar postDate = Calendar.getInstance();
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String) resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String) resourceBundleEhat.getString("packageID");

		int packageID = Integer.parseInt(pkgID);
		int serviceId = Integer.parseInt(sid);
		Integer[] series = { packageID, serviceId };// 11,13
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CpoeServdetails.class);
			criteria.add(Restrictions.eq("treatmentid", tID));
			criteria.add(Restrictions.in("serviceid", series));
			// criteria.add(Restrictions.eq("drdeskFlag","D"));
			// criteria.setMaxResults(10);
			criteria.addOrder(Order.asc("billdetailsid"));
			tlistbiilall = criteria.list();
			// Set List to CpoeServdetails
			objCpoe.setCpoeServdetails(tlistbiilall);

			for (int i = 0; i < tlistbiilall.size(); i++) {
				fetchId = "SELECT elr.lab_request_id,elr.posted_datetime,elr.posted_result_flag,elrs.sub_service_id,elrs.lab_req_slv_id"
						+ " ,elrs.is_package_flag FROM ehat_lab_request elr inner join ehat_lab_request_slave elrs ON "
						+ "elr.lab_request_id = elrs.lab_request_id where elr.posted_result_flag='Y' and "
						+ "elrs.bill_details_id ='" + tlistbiilall.get(i).getBilldetailsid() + "' and  elrs.dept_id='"
						+ deptId + "' and elrs.deleted_flag='N' group by elrs.bill_details_id";
				Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(fetchId);
				labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listLabTestRes = labTestResQuery.list();

				if (listLabTestRes.size() > 0) {
					for (Map<String, Object> row : listLabTestRes) {
						LabRequestDTO objReq = new LabRequestDTO();
						LabRequestSlaveDTO objSlv = new LabRequestSlaveDTO();

						postDate.setTime((Date) row.get("posted_datetime"));
						objReq.setLabRequestId((Integer) row.get("lab_request_id"));
						objReq.setPostedDatetime(postDate);
						objReq.setPostedResultFlag(row.get("posted_result_flag").toString().charAt(0));
						objSlv.setLabReqSlvId((Integer) row.get("lab_req_slv_id"));
						objSlv.setIsPackageFlag((String) row.get("is_package_flag"));
						labReqList.add(objReq);
						labReqSlvList.add(objSlv);
					}
				} else {
					LabRequestDTO objReq = new LabRequestDTO();
					LabRequestSlaveDTO objSlv = new LabRequestSlaveDTO();
					objReq.setPostedResultFlag('N');
					objSlv.setLabReqSlvId(0);
					labReqList.add(objReq);
					labReqSlvList.add(objSlv);
				}

			}
			// Set List to LabRequestDTO
			objCpoe.setListLabRequest(labReqList);
			// Set List to LabRequestSlaveDTO
			objCpoe.setListLabRequestSlave(labReqSlvList);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return objCpoe;
	}

	@Override
	public List fetchLabTestResult(Integer testmasterId, Integer labReqSlvId, Integer subSerId, Integer tretId) {
		String sql = "";
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		String todays_date = dateFormat.format(currentDate.getTime());

		List arrlist = new ArrayList();
		List<LabPkg> arrLabPkg = new ArrayList<LabPkg>();
		List<LabProfile> arrLabProfile = new ArrayList<LabProfile>();
		List<LabTest> arrLabTest1 = new ArrayList<LabTest>();

		try {

			int profilecount = 0;
			// sql = "select distinct(tr.idprofile),lp.* from labtestsresult tr,labprofile
			// lp where lp.idprofile=tr.idprofile and tr.idprofile is not null and
			// tr.idlabpkg is null and tr.idlabTestResultMaster=? and tr.labtestresultStatus
			// = 'Y' ";
			// changed by Laxman for fetch PROFILE in new tables on 02-Feb-2018.
			// sql="select distinct lp . *, elrs.lab_request_id,elrs.lab_req_slv_id,
			// dct.doc_name,elr.posted_datetime from ehat_lab_request
			// elr,ehat_lab_request_slave elrs,labprofile lp,doctor dct where
			// elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id =
			// lp.subservice_id and elrs.ref_doc_id=dct.Doctor_ID and elrs.sub_service_id is
			// not null and elrs.sub_service_id ='"+subSerId+"' and
			// elr.treatment_id='"+tretId+"'";
			sql = "select distinct lp . *, elrs.lab_request_id, elrs.lab_req_slv_id, ifnull(dct.doc_name,'-') as doc_name, elr.posted_datetime,elrs.service_id as serv_id, ifnull(es.category_name,'-') as pkg_name from ehat_lab_request elr join ehat_lab_request_slave elrs join labprofile lp left join doctor dct on elrs.ref_doc_id = dct.Doctor_ID  left join ehat_subservice es ON elrs.package_id = es.id where elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id = lp.subservice_id and elrs.sub_service_id is not null and elrs.sub_service_id = '"
					+ subSerId + "' and elr.treatment_id = '" + tretId
					+ "' and elr.posted_result_flag='Y' and elrs.deleted_flag='N' order by elrs.lab_req_slv_id";
			Query userDtls = sessionFactory.getCurrentSession().createSQLQuery(sql);
			userDtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> userDetails = userDtls.list();

			/*
			 * List<Map<String, Object>> userDetails = getJdbcTemplate() .queryForList(sql,
			 * new Object[] { testmasterId });
			 */

			for (Map<String, Object> rs : userDetails) {
				List<LabTest> arrLabTest = new ArrayList<LabTest>();
				profilecount++;
				LabProfile objLabProfile = new LabProfile();

				objLabProfile.setIdprofile((Integer) rs.get("idprofile"));
				objLabProfile.setIdheadings((Integer) rs.get("idheadings"));
				objLabProfile.setProfileCharges((Float) rs.get("profileCharges"));

				objLabProfile.setProfileName((String) rs.get("profileName"));
				objLabProfile.setProfileStatus((String) rs.get("profileStatus"));
				objLabProfile.setProfileCode((String) rs.get("profileCode"));
				// Added by Laxman on 31-Jan-2018.
				objLabProfile.setServiceID((Integer) rs.get("serv_id"));
				objLabProfile.setSubServiceID((Integer) rs.get("subservice_id"));
				objLabProfile.setLabRequestId((Integer) rs.get("lab_request_id"));
				objLabProfile.setLabReqSlvId((Integer) rs.get("lab_req_slv_id"));
				objLabProfile.setPkgName((String) rs.get("pkg_name"));
				objLabProfile.setRefDocName((String) rs.get("doc_name"));

				objLabProfile.setPostDateTime((Date) rs.get("posted_datetime"));
				int porId = (Integer) rs.get("idprofile");

				// sql = "select tr.*,lt.*,ltm.methodName from labtestresultmaster
				// lrm,labtestsresult tr,labtest lt,labtestmethod ltm where tr.idTest=lt.idTest
				// and ltm.idtestMethod = lt.idtestMethod and
				// lrm.idlabTestResultMaster=tr.idlabTestResultMaster and tr.idlabpkg is null
				// and tr.idprofile=? and tr.idlabTestResultMaster=? and tr.labtestresultStatus
				// = 'Y'";
				/*
				 * =============================================================================
				 * =======
				 */
				sql = "SELECT * FROM labprofiletestcomp where idprofile ='" + porId + "'";

				Query procoQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				procoQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> proco = procoQuery.list();

				/*
				 * List<Map<String, Object>> proco = getJdbcTemplate() .queryForList(sql, new
				 * Object[] { porId});
				 */

				for (Map<String, Object> rs1 : proco) {

					// idTest
					LabTest objLabTest1 = new LabTest();

					int idTest = (Integer) rs1.get("idTest");
					objLabTest1.setIdTest(idTest);

					if (idTest != 0) {
						// Added by Laxman on 01-Feb-2018.Getting test result value,after saving
						// labtestresult in new Table,use new (ehat_lab_result_ table for getting
						// testresult.
						// sql ="select * from labtestsresult where idTest =? and idprofile =? and
						// idlabtestresultmaster =?";
						sql = "select lab_result_id, test_result, narration from ehat_lab_result where test_Id = '"
								+ idTest + "' and service_id= '" + objLabProfile.getServiceID()
								+ "' and sub_service_id= '" + objLabProfile.getSubServiceID() + "' and treatment_id = '"
								+ tretId + "' and lab_request_id = '" + objLabProfile.getLabRequestId()
								+ "' and lab_req_slv_id='" + objLabProfile.getLabReqSlvId() + "'";

						Query testreQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						testreQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> testre = testreQuery.list();

						/*
						 * List<Map<String, Object>> testre = getJdbcTemplate() .queryForList(sql, new
						 * Object[] { idTest,
						 * objLabProfile.getServiceID(),objLabProfile.getSubServiceID(),tretId,
						 * testmasterId});
						 */

						for (Map<String, Object> t : testre) {

							int labResultPk = (Integer) t.get("lab_result_id");
							String tr = (String) t.get("test_result");
							String noteDetailsForGeneral = (String) t.get("narration");
							System.err.println("trid--->>>>>>" + labResultPk + "   testResult---->>>" + tr);
							objLabTest1.setIdTestResult(labResultPk);
							objLabTest1.setTestResult(tr);
							objLabTest1.setNoteDeatilsForGeneral(noteDetailsForGeneral);

						}

						sql = "select * from labtest where idTest ='" + idTest + "'";
						Query tesQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> tes = tesQuery.list();

						/*
						 * List<Map<String, Object>> tes = getJdbcTemplate() .queryForList(sql, new
						 * Object[] { idTest});
						 */

						for (Map<String, Object> t : tes) {

							String testName = (String) t.get("testName");
							String testCode = (String) t.get("testCode");
							float testRate = (Float) t.get("testRate");
							String valueType = (String) t.get("valueType");
							int idtestMethod = (Integer) t.get("idtestMethod");

							objLabTest1.setTestName(testName);
							objLabTest1.setTestCode(testCode);
							objLabTest1.setTestRate(testRate);
							objLabTest1.setValueType(valueType);
							objLabTest1.setIdtestMethod(idtestMethod);

							String mq = "select methodName from labtestmethod where idtestmethod = " + idtestMethod;
							String methodName = (String) sessionFactory.getCurrentSession().createSQLQuery(mq)
									.uniqueResult();
							/*
							 * methodNmQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); String
							 * methodName= methodNmQuery.uniqueResult().toString();
							 */

							System.err.println("---->>>>" + methodName);

							/*
							 * String methodName = getJdbcTemplate().queryForObject(mq, String.class);
							 */

							objLabTest1.setTestMethodnm(methodName);

							objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
							objLabTest1.setObjFormula(featchLabFormulaForTest(idTest));

							objLabTest1.setNormalValuesli(
									featchNormalValOfPat(idTest, valueType, tretId, objLabTest1.getNormalValuesli()));
							// System.err.println("in
							// profile-----?"+objLabTest1.getNormalValuesli().size());

							arrLabTest.add(objLabTest1);

						}

					} else {

						objLabTest1.setIdTest((Integer) rs1.get("idTest"));
						objLabTest1.setTestName((String) rs1.get("headName"));
						arrLabTest.add(objLabTest1);
					}
				}

				/*
				 * =============================================================================
				 * =======
				 */
				/*
				 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
				 * Object[] { porId, testmasterId });
				 * 
				 * for (Map rs1 : labtest) { LabTest objLabTest = new LabTest();
				 * 
				 * objLabTest.setIdTestResult((Integer) rs1 .get("idresultTests"));
				 * objLabTest.setTestResult((String) rs1.get("testResult"));
				 * objLabTest.setIdTest((Integer) rs1.get("idTest"));
				 * objLabTest.setTestName((String) rs1.get("testName"));
				 * objLabTest.setTestCode((String) rs1.get("testCode"));
				 * objLabTest.setTestRate((Float) rs1.get("testRate"));
				 * objLabTest.setValueType((String) rs1.get("valueType"));
				 * objLabTest.setTestMethodnm((String) rs1.get("methodName")); int idTest =
				 * (Integer) rs1.get("idTest"); String valueType = (String)
				 * rs1.get("valueType"); objLabTest.setNoteDeatilsForGeneral((String) rs1
				 * .get("noteDetailsForGeneral"));
				 * objLabTest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
				 * objLabTest.setObjFormula(featchLabFormulaForTest(idTest));
				 * 
				 * arrLabTest.add(objLabTest); }
				 */
				// objLabProfile.setTestli(arrLabTest);

				arrLabProfile.add(objLabProfile);
			}
			sql = "select lt.*,tr.idresultTests,tr.testResult,ltm.methodName from labtestresultmaster lrm,labtestmethod ltm,labtestsresult tr,labtest lt where tr.idTest=lt.idTest and ltm.idtestMethod = lt.idtestMethod and lrm.idlabTestResultMaster=tr.idlabTestResultMaster and   tr.idprofile is null  and tr.idlabTestResultMaster='"
					+ testmasterId + "' and tr.labtestresultStatus = 'Y' ";

			List<Map<String, Object>> testDetails = null;

			Query testDtlsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			testDtlsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			testDetails = testDtlsQuery.list();

			/*
			 * testDetails = getJdbcTemplate().queryForList(sql, new Object[] { testmasterId
			 * });
			 */

			for (Map<String, Object> rs2 : testDetails) {
				LabTest objLabtest = new LabTest();
				// LabTest objLabTestindi = new LabTest();// new individual.
				objLabtest.setIdTestResult((Integer) rs2.get("idresultTests"));
				objLabtest.setTestResult((String) rs2.get("testResult"));
				objLabtest.setIdTest((Integer) rs2.get("idTest"));
				objLabtest.setTestName((String) rs2.get("testName"));
				objLabtest.setTestCode((String) rs2.get("testCode"));
				objLabtest.setTestRate((Float) rs2.get("testRate"));
				objLabtest.setValueType((String) rs2.get("valueType"));
				objLabtest.setTestMethodnm((String) rs2.get("methodName"));
				int idTest = (Integer) rs2.get("idTest");

				objLabtest.setTestNote((String) rs2.get("testNote"));
				objLabtest.setTestClinicaluse((String) rs2.get("testClinicaluse"));
				objLabtest.setTestIncreasedlevel((String) rs2.get("testIncreasedlevel"));
				objLabtest.setTestInterpretation((String) rs2.get("testInterpretation"));
				objLabtest.setTestComments((String) rs2.get("testComments"));
				String valueType = (String) rs2.get("valueType");
				objLabtest.setIdheadings((Integer) rs2.get("idheadings"));
				objLabtest.setNoteDeatilsForGeneral((String) rs2.get("noteDetailsForGeneral"));

				objLabtest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));

				objLabtest.setObjFormula(featchLabFormulaForTest(idTest));
				objLabtest.setNormalValuesli(
						featchNormalValOfPat(idTest, valueType, tretId, objLabtest.getNormalValuesli()));
				// System.err.println("in profile-----?"+objLabtest.getNormalValuesli().size());

				arrLabTest1.add(objLabtest);

				// arrLabTest1.add(objLabTestindi);
			}

			// System.out.println("tretId" + tretId);
			// commented on 30-Jan-20188.
			/*
			 * String sqlforpat = "select referedTo from treatment where Treatment_ID = " +
			 * tretId; String referedTo = getJdbcTemplate().queryForObject(sqlforpat,
			 * String.class); String sqlforbiil = ""; int bill_id = 0; if
			 * (referedTo.equals("ipd")) { sqlforbiil =
			 * "select bill_id from bill_master where Treatment_ID = " + tretId; bill_id =
			 * getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else if
			 * (referedTo.equals("opd")) { sqlforbiil =
			 * "select bill_id from bill_master_opd where Treatment_ID = " + tretId; bill_id
			 * = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else { sqlforbiil =
			 * "select bill_id from bill_master_diagnosis where Treatment_ID = " + tretId;
			 * bill_id = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); }
			 * 
			 * int count = 0; if (referedTo.equals("ipd")) { sql =
			 * "select count(*) from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("opd")) { sql =
			 * "select count(*) from opd_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("diagnosis")) { sql =
			 * "select count(*) from diagnosis_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); }
			 */

			// @ModifiedBy:Touheed @ModifiedDate :17-Mar-2016 //kavita forget Why she write
			// this code here if she remember then will change the code

			/*
			 * int labtestresultmaster_id = 0; String sqlforlab =
			 * "select idlabtestresultmaster from labtestresultmaster where Treatment_ID = "
			 * + tretId; labtestresultmaster_id = getJdbcTemplate().queryForInt(sqlforlab);
			 * System.out.println("idlabtestresultmaster----" + labtestresultmaster_id);
			 * 
			 * int id_master = 0; List<Map<String, Object>> billListDetails = null; if
			 * (count > 0) { if (referedTo.equals("ipd")) { sql =
			 * "select idipdbill_pathologytest_master from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; id_master = getJdbcTemplate().queryForInt(sql);
			 * 
			 * sql =
			 * "select * from ipdbill_pathologytest_slave where idipdbill_pathologytest_master = ? and labresult_flag = 'Y'"
			 * ;
			 * 
			 * billListDetails = getJdbcTemplate().queryForList(sql, new Object[] {
			 * id_master }); } else if (referedTo.equals("opd")) { sql =
			 * "select * from opd_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } else if (referedTo.equals("diagnosis")) { sql =
			 * "select * from diagnosis_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } String test_type = ""; for (Map rsforBillTest : billListDetails) { if
			 * (referedTo.equals("ipd")) { test_type = (String) rsforBillTest
			 * .get("pathologytest_type"); } else if (referedTo.equals("opd")) { test_type =
			 * (String) rsforBillTest.get("msg"); } else if (referedTo.equals("diagnosis"))
			 * { test_type = (String) rsforBillTest.get("msg"); }
			 * 
			 * //System.out.println("test_type-----" + test_type);
			 * 
			 * if ((test_type.equals("test") || test_type == "test") ||
			 * (test_type.equals("t") || test_type == "t")) { int testId = 0;
			 * 
			 * if (referedTo.equals("ipd")) { testId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("opd")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("diagnosis")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idTest=? and idprofile is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate() .queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, testId }); if (countForPesent == 0) { sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ; List<Map<String, Object>> testDetailsBill = null;
			 * 
			 * testDetailsBill = getJdbcTemplate().queryForList( sql, new Object[] { testId
			 * });
			 * 
			 * for (Map rsforTest : testDetailsBill) { LabTest objLabtest = new LabTest();
			 * objLabtest.setTestResult((String) rsforTest .get("testResult"));
			 * objLabtest.setIdTest((Integer) rsforTest .get("idTest"));
			 * objLabtest.setTestName((String) rsforTest .get("testName"));
			 * objLabtest.setTestCode((String) rsforTest .get("testCode"));
			 * objLabtest.setTestRate((Float) rsforTest .get("testRate"));
			 * objLabtest.setValueType((String) rsforTest .get("valueType"));
			 * objLabtest.setTestMethodnm((String) rsforTest .get("methodName"));
			 * objLabtest.setTestNote((String) rsforTest .get("testNote")); objLabtest
			 * .setTestClinicaluse((String) rsforTest .get("testClinicaluse")); objLabtest
			 * .setTestIncreasedlevel((String) rsforTest .get("testIncreasedlevel"));
			 * objLabtest .setTestInterpretation((String) rsforTest
			 * .get("testInterpretation")); objLabtest.setTestComments((String) rsforTest
			 * .get("testComments"));
			 * 
			 * int idTest = (Integer) rsforTest.get("idTest"); String valueType = (String)
			 * rsforTest .get("valueType"); objLabtest
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType)); objLabtest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest,idlabTestResultMaster,assignDate) VALUES (?,?,?)"
			 * ; getJdbcTemplate().update( sql, new Object[] { testId,
			 * labtestresultmaster_id, todays_date }); int last_insert_id = 0; String
			 * sqlForId = "select last_insert_id()"; last_insert_id =
			 * getJdbcTemplate().queryForInt( sqlForId);
			 * System.out.println("last_insert_id test_id>>>>" + last_insert_id);
			 * objLabtest.setIdTestResult(last_insert_id); arrLabTest1.add(objLabtest); } }
			 * } else if ((test_type.equals("profile") || test_type == "profile") ||
			 * (test_type.equals("pro") || test_type == "pro")) { int profileId = 0; if
			 * (referedTo.equals("ipd")) { profileId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("profileId-----" + profileId);
			 * } else if (referedTo.equals("opd")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); } else if (referedTo.equals("diagnosis")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idprofile=? and idlabpkg is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[] {
			 * labtestresultmaster_id, profileId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labprofile lp where lp.idprofile=?";
			 * 
			 * List<Map<String, Object>> billprofileDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) { List<LabTest> arrbillLabTest = new
			 * ArrayList<LabTest>(); profilecount++; LabProfile objbillLabProfile = new
			 * LabProfile(); objbillLabProfile .setIdprofile((Integer) rsforTest
			 * .get("idprofile")); objbillLabProfile .setIdheadings((Integer) rsforTest
			 * .get("idheadings")); objbillLabProfile .setProfileCharges((Float) rsforTest
			 * .get("profileCharges")); objbillLabProfile .setProfileName((String) rsforTest
			 * .get("profileName")); objbillLabProfile .setProfileStatus((String) rsforTest
			 * .get("profileStatus")); objbillLabProfile .setProfileCode((String) rsforTest
			 * .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile");
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList(sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1.get("idTest"); sql
			 * =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTest.setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTest.setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrbillLabTest.add(objLabTest);
			 * 
			 * } objbillLabProfile.setTestli(arrbillLabTest); }
			 * 
			 * System.out.println("profilecount>>>>" + profilecount); int last_insert_id_pro
			 * = 0; sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,profilecount) VALUES (?,?,?,?,?)"
			 * ; int ProCntForInsert = 0; for (int i = 0; i < objbillLabProfile
			 * .getTestli().size(); i++) { getJdbcTemplate() .update(sql, new Object[] {
			 * objbillLabProfile .getTestli() .get(i) .getIdTest(), objbillLabProfile
			 * .getIdprofile(), labtestresultmaster_id, todays_date, profilecount });
			 * 
			 * String sqlForproId = "select last_insert_id()"; last_insert_id_pro =
			 * getJdbcTemplate() .queryForInt(sqlForproId); objbillLabProfile .getTestli()
			 * .get(i) .setIdTestResult(last_insert_id_pro); }
			 * arrLabProfile.add(objbillLabProfile); } } } else if
			 * ((test_type.equals("package") || test_type == "package") ||
			 * (test_type.equals("pkg") || test_type == "pkg")) {
			 * 
			 * int packageId = 0; if (referedTo.equals("ipd")) { packageId = (Integer)
			 * rsforBillTest .get("pathologytest_id"); //System.out.println("packageId-----"
			 * + packageId); } else if (referedTo.equals("opd")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); } else if (referedTo.equals("diagnosis")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idlabpkg=?"
			 * ; countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, packageId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labpkg lp  where lp.idlabpkg = ?";
			 * 
			 * List<Map<String, Object>> pkgallDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { packageId });
			 * 
			 * for (Map rsforpkg : pkgallDetails) { LabPkg objbillLabPkg = new LabPkg();
			 * 
			 * objbillLabPkg.setIdlabpkg((Integer) rsforpkg .get("idlabpkg"));
			 * objbillLabPkg.setIdheadings((Integer) rsforpkg .get("idheadings"));
			 * objbillLabPkg.setPkgCharges((Float) rsforpkg .get("pkgCharges"));
			 * 
			 * objbillLabPkg.setPkgName((String) rsforpkg .get("pkgName"));
			 * objbillLabPkg.setPkgStatus((String) rsforpkg .get("pkgStatus"));
			 * objbillLabPkg.setPkgCode((String) rsforpkg .get("pkgCode"));
			 * 
			 * int pkgId = (Integer) rsforpkg.get("idlabpkg"); List<LabProfile>
			 * labbillProfileLi = new ArrayList<LabProfile>(); List<LabTest> arrLabTestBill
			 * = new ArrayList<LabTest>();
			 * 
			 * String sqlforpro = "select * from labpkgprotestcomp where idpkg = ?";
			 * List<Map<String, Object>> pkgprodetails = getJdbcTemplate()
			 * .queryForList(sqlforpro, new Object[] { pkgId });
			 * //System.out.println(pkgprodetails);
			 * 
			 * for (Map resforpro : pkgprodetails) { String testtype = (String) resforpro
			 * .get("typeTP"); if (testtype.equals("P")) { int profileId = (Integer)
			 * resforpro .get("idProTest");
			 * 
			 * sql = "select lp.* from labprofile lp where lp.idprofile=?"; List<Map<String,
			 * Object>> billprofileDetails = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) {
			 * 
			 * LabProfile objbillLabPro = new LabProfile();
			 * 
			 * objbillLabPro .setIdprofile((Integer) rsforTest .get("idprofile"));
			 * objbillLabPro .setIdheadings((Integer) rsforTest .get("idheadings"));
			 * objbillLabPro .setProfileCharges((Float) rsforTest .get("profileCharges"));
			 * objbillLabPro .setProfileName((String) rsforTest .get("profileName"));
			 * objbillLabPro .setProfileStatus((String) rsforTest .get("profileStatus"));
			 * objbillLabPro .setProfileCode((String) rsforTest .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile"); List<LabTest>
			 * arrLabTestPro = new ArrayList<LabTest>();
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList( sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1 .get("idTest");
			 * sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTestforPro = new LabTest();
			 * 
			 * objLabTestforPro .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTestforPro .setIdTest((Integer) rsForpro .get("idTest"));
			 * objLabTestforPro .setTestName((String) rsForpro .get("testName"));
			 * objLabTestforPro .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTestforPro .setTestRate((Float) rsForpro .get("testRate"));
			 * objLabTestforPro .setValueType((String) rsForpro .get("valueType"));
			 * objLabTestforPro .setTestMethodnm((String) rsForpro .get("methodName")); int
			 * idTest = (Integer) rsForpro .get("idTest"); String valueType = (String)
			 * rsForpro .get("valueType"); objLabTestforPro
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType));
			 * objLabTestforPro .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrLabTestPro .add(objLabTestforPro); } objbillLabPro
			 * .setTestli(arrLabTestPro); } System.out .println("pro list size>>>>" +
			 * objbillLabPro .getTestli() .size()); sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_pro_pkg = 0; for (int j = 0; j < objbillLabPro
			 * .getTestli().size(); j++) {
			 * 
			 * getJdbcTemplate() .update(sql, new Object[] { objbillLabPro .getTestli()
			 * .get(j) .getIdTest(), objbillLabPro .getIdprofile(), labtestresultmaster_id,
			 * todays_date, objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForpkgId = "select last_insert_id()"; last_insert_id_pro_pkg =
			 * getJdbcTemplate() .queryForInt( sqlForpkgId); System.out
			 * .println("last_insert_id_pro_pkg>>>>" + last_insert_id_pro_pkg);
			 * objbillLabPro .getTestli() .get(j) .setIdTestResult( last_insert_id_pro_pkg);
			 * }
			 * 
			 * labbillProfileLi.add(objbillLabPro); }
			 * 
			 * } else {
			 * 
			 * int testId = (Integer) resforpro .get("idProTest"); sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { testId }); //System.out.println(labtest);
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult")); objLabTest
			 * .setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode")); objLabTest
			 * .setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_test_pkg = 0; getJdbcTemplate() .update(sql, new
			 * Object[] { objLabTest .getIdTest(), 0, labtestresultmaster_id, todays_date,
			 * objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForTestId = "select last_insert_id()"; last_insert_id_test_pkg =
			 * getJdbcTemplate() .queryForInt(sqlForTestId); System.out
			 * .println("last_insert_id_test_pkg>>>>" + last_insert_id_test_pkg); objLabTest
			 * .setIdTestResult(last_insert_id_test_pkg);
			 * 
			 * arrLabTestBill.add(objLabTest); } } }
			 * objbillLabPkg.setProfileli(labbillProfileLi);
			 * objbillLabPkg.setArrLabTest(arrLabTestBill); arrLabPkg.add(objbillLabPkg); }
			 * } } } }
			 */
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("database error...could not insert: " + e.getMessage());
		}
		arrlist.add(arrLabProfile);
		arrlist.add(arrLabTest1);
		arrlist.add(arrLabPkg);
		return arrlist;
	}

	private LabFormula featchLabFormulaForTest(int idTest) {

		LabFormula objLabFormula = new LabFormula();

		String sql = "select * from labformula where formStatus='Y' and  resultTestId='" + idTest + "' ";

		Query labtestQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		labtestQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> labtest = labtestQuery.list();

		/*
		 * List<Map<String, Object>> labtest = getJdbcTemplate().queryForList(sql, new
		 * Object[] { idTest });
		 */

		for (Map<String, Object> rs : labtest) {

			objLabFormula.setIdlabFormula((Integer) rs.get("idlabFormula"));
			objLabFormula.setResultTestId((Integer) rs.get("resultTestId"));
			objLabFormula.setExpTestId((String) rs.get("expTestId"));
			objLabFormula.setFormStatus((String) rs.get("formStatus"));

		}

		return objLabFormula;
	}

	private List<LabTestNormalValues> featchNormalValOfPat(int idTest, String valueType) {
		String sql = "";
		List<LabTestNormalValues> arrLabTestNormalValues = new ArrayList<LabTestNormalValues>();

		if (null != valueType && !valueType.equals("")) {
			if (valueType.equals("g")) {

				sql = "select * from labtestnormalvalue where idTest='" + idTest + "' and sexType ='g'";

			} else {

				sql = "select * from labtestnormalvalue where idTest='" + idTest
						+ "' and sexType !='g' and idUnitType is not null and lab_oldandnew='" + 0 + "'";

			}

			Query labtestQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			labtestQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> labtestvalues = labtestQuery.list();

			/*
			 * List<Map<String, Object>> labtestvalues = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { idTest });
			 */
			for (Map<String, Object> rs1 : labtestvalues) {
				LabTestNormalValues objLabTestNormalValues = new LabTestNormalValues();
				objLabTestNormalValues.setIdtestNormalValue((Integer) rs1.get("idtestNormalValue"));
				if (valueType.equals("i")) {
					objLabTestNormalValues.setIdUnitType((Integer) rs1.get("idUnitType"));
					sql = "select unitName from labunittype where idunitType='" + objLabTestNormalValues.getIdUnitType()
							+ "'";
					String unitnm = (String) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
					/*
					 * String unitnm = (String) getJdbcTemplate().queryForObject( sql, new Object[]
					 * { objLabTestNormalValues .getIdUnitType() }, String.class);
					 */
					objLabTestNormalValues.setUnitnm(unitnm);
				}

				objLabTestNormalValues.setSexType((String) rs1.get("sexType"));
				objLabTestNormalValues.setLowerVal((String) rs1.get("lowerVal"));
				objLabTestNormalValues.setUpperVal((String) rs1.get("upperVal"));
				objLabTestNormalValues.setIdTest((Integer) rs1.get("idTest"));
				arrLabTestNormalValues.add(objLabTestNormalValues);
			}
		}

		return arrLabTestNormalValues;
	}

	private List<LabTestNormalValues> featchNormalValOfPat(int idTest, String valueType, Integer tretId,
			List<LabTestNormalValues> normalValuesli1) throws Exception {
		String sql = "";
		long count = 0;
		int agetyp = 0;
		double age = 0;
		double month = 0;
		double days = 0;
		String type = null;
		String sex = null;
		String male;
		String female;
		String others;
		String sextyp;
		List<LabTestNormalValues> normalValuesli = new ArrayList<LabTestNormalValues>();
		normalValuesli = normalValuesli1;
		try {
			System.err.println(" actual size ----------------->" + normalValuesli1.size());

			/***** query for pagient age detail *************/
			// Change by Laxman for fetch data from new tables on 30-Jan-2018.
			// sql="select p.age,p.month,p.days,p.sex from patient p,treatment t where
			// p.Patient_ID=t.Patient_ID and t.Treatment_ID=?";
			sql = "select p.age,p.age_months,p.age_days,p.gender from ehat_patient p,ehat_treatment t where p.Patient_ID=t.Patient_ID and t.Treatment_ID='"
					+ tretId + "'";

			Query labtestQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			labtestQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> labtestvaluesnew = labtestQuery.list();
			/*
			 * List<Map<String, Object>> labtestvaluesnew =
			 * getJdbcTemplate().queryForList(sql, new Object[] { tretId });
			 */
			for (Map<String, Object> rs1 : labtestvaluesnew) {

				age = (Integer) rs1.get("age");
				month = (Integer) rs1.get("age_months");
				days = (Integer) rs1.get("age_days");
				sex = (String) rs1.get("gender");
				System.err.println("age is=" + age + "-" + month + "-" + days + " gender is=" + sex);
			}

			/******************************************/
			// check paient is male , female, others
			/*
			 * if(sex.equalsIgnoreCase("Male")){ male="Y"; }else{ male="N"; }
			 * if(sex.equalsIgnoreCase("Female")){ female="Y";
			 * 
			 * }else{ female="N"; } if(sex.equalsIgnoreCase("others")){ others="Y"; }else{
			 * others="N"; }
			 */
			List<LabTestNormalValues> arrLabTestNewNVal = new ArrayList<LabTestNormalValues>();
			// query for normal values for genral

			if (null != valueType && !valueType.equals("")) {

				if (valueType.equals("g")) {

					// query for normal values for genral

					sql = "select * from labtestnormalvalue where idTest='" + idTest + "' and sexType ='g'";
					type = "genral";
				} else {

					// normal values for individual

					// chk paitent age in year , months , days and query for
					// fetch their normal values
					if (sex.equalsIgnoreCase("Male")) {
						sextyp = "Y";

						if (age != 0) {
							agetyp = 3;
							sql = "select count(*) from labtestnormalvalue where lab_fage<='" + age
									+ "' and lab_toage>='" + age + "' and  idtest='" + idTest + "' and lab_age='"
									+ agetyp + "' and lab_male='" + sextyp + "' ";

						} else {

							if (month != 0) {
								agetyp = 2;
								sql = "select count(*) from labtestnormalvalue where lab_fage<='" + month
										+ "' and lab_toage>='" + month + "' and  idtest='" + idTest + "' and lab_age='"
										+ agetyp + "' and lab_male='" + sextyp + "' ";

							} else {
								if (days != 0) {
									agetyp = 1;
									sql = "select count(*) from labtestnormalvalue where lab_fage<='" + days
											+ "' and lab_toage>='" + days + "'  and  idtest='" + idTest
											+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";
								}
							}
						}

						count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
								.longValue();
						/* count = getJdbcTemplate().queryForInt(sql); */
						if (count > 0) {

							if (count > 1) {

								if (age != 0) {
									agetyp = 3;
									if (month != 0) {
										sql = "select * from labtestnormalvalue where lab_fage <='" + age
												+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";

										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + age
													+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";
											// select * from labtestnormalvalue
											// where lab_fage<3 and lab_toage
											// >=3 and idtest=18 and lab_age=4;
										}

									} else {
										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + age
													+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";
										}

									}
									if (month == 0 && days == 0) {
										sql = "select * from labtestnormalvalue where lab_fage <'" + age
												+ "' and lab_toage >='" + age + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";// query
																													// for
																													// age
										// select * from labtestnormalvalue
										// where lab_fage<=5 and lab_toage >5
										// and idtest=18 and lab_age=4;

									}
								} else {
									if (month != 0) {
										agetyp = 2;

										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + month
													+ "' and lab_toage >'" + month + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";
										} else {

											sql = "select * from labtestnormalvalue where lab_fage <'" + month
													+ "' and lab_toage >='" + month + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";// query
																														// for
																														// age
										}

									} else {
										if (days != 0) {
											agetyp = 1;
											sql = "select * from labtestnormalvalue where lab_fage <'" + days
													+ "' and lab_toage >='" + days + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";// query
																														// for
																														// age
										}

									}
								}
							} else {
								if (age != 0) {
									agetyp = 3;
									sql = "select * from labtestnormalvalue where lab_fage <='" + age
											+ "' and lab_toage >='" + age + "' and  idtest='" + idTest
											+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";

								} else {
									if (month != 0) {
										agetyp = 2;
										sql = "select * from labtestnormalvalue where lab_fage <='" + month
												+ "' and lab_toage >='" + month + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";
									} else {
										if (days != 0) {
											agetyp = 1;
											sql = "select * from labtestnormalvalue where lab_fage <='" + days
													+ "' and lab_toage >='" + days + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and lab_male='" + sextyp + "' ";
										}
									}
								}
							}
						}
					}

					if (sex.equalsIgnoreCase("Female")) {
						sextyp = "Y";

						if (age != 0) {
							agetyp = 3;
							sql = "select count(*) from labtestnormalvalue where lab_fage<='" + age
									+ "' and lab_toage>='" + age + "' and  idtest='" + idTest + "' and lab_age='"
									+ agetyp + "' and  lab_female='" + sextyp + "' ";

						} else {

							if (month != 0) {
								agetyp = 2;
								sql = "select count(*) from labtestnormalvalue where lab_fage<='" + month
										+ "' and lab_toage>='" + month + "' and  idtest='" + idTest + "' and lab_age='"
										+ agetyp + "' and  lab_female='" + sextyp + "' ";

							} else {
								if (days != 0) {
									agetyp = 1;
									sql = "select count(*) from labtestnormalvalue where lab_fage<='" + days
											+ "' and lab_toage>='" + days + "'  and  idtest='" + idTest
											+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp + "' ";
								}
							}
						}
						count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
								.longValue();
						/* count = getJdbcTemplate().queryForInt(sql); */

						if (count > 0) {

							if (count > 1) {

								if (age != 0) {
									agetyp = 3;
									if (month != 0) {
										sql = "select * from labtestnormalvalue where lab_fage <='" + age
												+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp + "' ";

										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + age
													+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp
													+ "' ";
											// select * from labtestnormalvalue
											// where lab_fage<3 and lab_toage
											// >=3 and idtest=18 and lab_age=4;
										}

									} else {
										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + age
													+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp
													+ "' ";
										}

									}
									if (month == 0 && days == 0) {
										sql = "select * from labtestnormalvalue where lab_fage <'" + age
												+ "' and lab_toage >='" + age + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp + "' ";// query
																														// for
																														// age
										// select * from labtestnormalvalue
										// where lab_fage<=5 and lab_toage >5
										// and idtest=18 and lab_age=4;

									}
								} else {
									if (month != 0) {
										agetyp = 2;

										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + month
													+ "' and lab_toage >'" + month + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp
													+ "' ";
										} else {

											sql = "select * from labtestnormalvalue where lab_fage <'" + month
													+ "' and lab_toage >='" + month + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp
													+ "' ";// query for
															// age
										}

									} else {
										if (days != 0) {
											agetyp = 1;
											sql = "select * from labtestnormalvalue where lab_fage <'" + days
													+ "' and lab_toage >='" + days + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp
													+ "' ";// query for
															// age
										}

									}
								}
							} else {
								if (age != 0) {
									agetyp = 3;
									sql = "select * from labtestnormalvalue where lab_fage <='" + age
											+ "' and lab_toage >='" + age + "' and  idtest='" + idTest
											+ "' and lab_age='" + agetyp + "' and lab_female='" + sextyp + "' ";

								} else {
									if (month != 0) {
										agetyp = 2;
										sql = "select * from labtestnormalvalue where lab_fage <='" + month
												+ "' and lab_toage >='" + month + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and lab_female='" + sextyp + "' ";
									} else {
										if (days != 0) {
											agetyp = 1;
											sql = "select * from labtestnormalvalue where lab_fage <='" + days
													+ "' and lab_toage >='" + days + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_female='" + sextyp
													+ "' ";
										}
									}
								}
							}
						}

					}

					if (sex.equalsIgnoreCase("others")) {
						sextyp = "Y";

						if (age != 0) {
							agetyp = 3;
							sql = "select count(*) from labtestnormalvalue where lab_fage<='" + age
									+ "' and lab_toage>='" + age + "' and  idtest='" + idTest + "' and lab_age='"
									+ agetyp + "' and  lab_others='" + sextyp + "'";

						} else {

							if (month != 0) {
								agetyp = 2;
								sql = "select count(*) from labtestnormalvalue where lab_fage<='" + month
										+ "' and lab_toage>='" + month + "' and  idtest='" + idTest + "' and lab_age='"
										+ agetyp + "' and lab_others='" + sextyp + "'";

							} else {
								if (days != 0) {
									agetyp = 1;
									sql = "select count(*) from labtestnormalvalue where lab_fage<='" + days
											+ "' and lab_toage>='" + days + "'  and  idtest='" + idTest
											+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp + "'";
								}
							}
						}
						count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
								.longValue();
						/* count = getJdbcTemplate().queryForInt(sql); */

						if (count > 0) {

							if (count > 1) {

								if (age != 0) {
									agetyp = 3;
									if (month != 0) {
										sql = "select * from labtestnormalvalue where lab_fage <='" + age
												+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp + "'";

										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + age
													+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp + "'";
											// select * from labtestnormalvalue
											// where lab_fage<3 and lab_toage
											// >=3 and idtest=18 and lab_age=4;
										}

									} else {
										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + age
													+ "' and lab_toage >'" + age + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp + "'";
										}

									}
									if (month == 0 && days == 0) {
										sql = "select * from labtestnormalvalue where lab_fage <'" + age
												+ "' and lab_toage >='" + age + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp + "'";// query
																													// for
																													// age
										// select * from labtestnormalvalue
										// where lab_fage<=5 and lab_toage >5
										// and idtest=18 and lab_age=4;

									}
								} else {
									if (month != 0) {
										agetyp = 2;

										if (days != 0) {
											sql = "select * from labtestnormalvalue where lab_fage <='" + month
													+ "' and lab_toage >'" + month + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp
													+ "' ";
										} else {

											sql = "select * from labtestnormalvalue where lab_fage <'" + month
													+ "' and lab_toage >='" + month + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp
													+ "' ";// query for
															// age
										}

									} else {
										if (days != 0) {
											agetyp = 1;
											sql = "select * from labtestnormalvalue where lab_fage <'" + days
													+ "' and lab_toage >='" + days + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp
													+ "' ";// query for
															// age
										}

									}
								}
							} else {
								if (age != 0) {
									agetyp = 3;
									sql = "select * from labtestnormalvalue where lab_fage <='" + age
											+ "' and lab_toage >='" + age + "' and  idtest='" + idTest
											+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp + "' ";

								} else {
									if (month != 0) {
										agetyp = 2;
										sql = "select * from labtestnormalvalue where lab_fage <='" + month
												+ "' and lab_toage >='" + month + "' and  idtest='" + idTest
												+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp + "' ";
									} else {
										if (days != 0) {
											agetyp = 1;
											sql = "select * from labtestnormalvalue where lab_fage <='" + days
													+ "' and lab_toage >='" + days + "' and  idtest='" + idTest
													+ "' and lab_age='" + agetyp + "' and  lab_others='" + sextyp
													+ "' ";
										}
									}
								}
							}
						}

					}

				}

				if (type == "genral") {

					// type is genral query is exicuted

					Query labtestvalQue = sessionFactory.getCurrentSession().createSQLQuery(sql);
					labtestvalQue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> labtestvalues = labtestvalQue.list();

					/*
					 * List<Map<String, Object>> labtestvalues = getJdbcTemplate()
					 * .queryForList(sql);
					 */
					for (Map<String, Object> rs1 : labtestvalues) {
						LabTestNormalValues objnewLabTestNormalValues = new LabTestNormalValues();
						objnewLabTestNormalValues.setIdtestNormalValue((Integer) rs1.get("idtestNormalValue"));
						if (valueType.equals("i")) {
							objnewLabTestNormalValues.setIdUnitType((Integer) rs1.get("idUnitType"));
							sql = "select unitName from labunittype where idunitType='"
									+ objnewLabTestNormalValues.getIdUnitType() + "'";
							String unitnm = (String) sessionFactory.getCurrentSession().createSQLQuery(sql)
									.uniqueResult();
							/*
							 * String unitnm = (String) getJdbcTemplate().queryForObject(sql, new Object[] {
							 * objnewLabTestNormalValues.getIdUnitType() }, String.class);
							 */

							objnewLabTestNormalValues.setUnitnm(unitnm);
						}

						objnewLabTestNormalValues.setSexType((String) rs1.get("sexType"));
						objnewLabTestNormalValues.setLowerVal((String) rs1.get("lowerVal"));
						objnewLabTestNormalValues.setUpperVal((String) rs1.get("upperVal"));
						objnewLabTestNormalValues.setIdTest((Integer) rs1.get("idTest"));
						objnewLabTestNormalValues.setOldandnew((String) rs1.get("lab_oldandnew"));
						normalValuesli.add(objnewLabTestNormalValues);
					}

				} else {
					// type is individual query is exicuted

					if (count > 0) {

						Query labtestvalQue = sessionFactory.getCurrentSession().createSQLQuery(sql);
						labtestvalQue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> labtestvalues = labtestvalQue.list();

						/*
						 * List<Map<String, Object>> labtestvalues = getJdbcTemplate()
						 * .queryForList(sql);
						 */
						for (Map rs1 : labtestvalues) {
							LabTestNormalValues objnewLabTestNormalValues = new LabTestNormalValues();
							objnewLabTestNormalValues.setIdtestNormalValue((Integer) rs1.get("idtestNormalValue"));
							if (valueType.equals("i")) {
								objnewLabTestNormalValues.setIdUnitType((Integer) rs1.get("idUnitType"));
								sql = "select unitName from labunittype where idunitType='"
										+ objnewLabTestNormalValues.getIdUnitType() + "'";
								String unitnm = (String) sessionFactory.getCurrentSession().createSQLQuery(sql)
										.uniqueResult();
								/*
								 * String unitnm = (String) getJdbcTemplate().queryForObject(sql, new Object[] {
								 * objnewLabTestNormalValues.getIdUnitType() }, String.class);
								 */
								objnewLabTestNormalValues.setUnitnm(unitnm);
							}

							objnewLabTestNormalValues.setSexType((String) rs1.get("sexType"));
							objnewLabTestNormalValues.setLowerVal((String) rs1.get("lowerVal"));
							objnewLabTestNormalValues.setUpperVal((String) rs1.get("upperVal"));
							objnewLabTestNormalValues.setIdTest((Integer) rs1.get("idTest"));
							objnewLabTestNormalValues.setAge((Integer) rs1.get("lab_age"));
							objnewLabTestNormalValues.setFage((Double) rs1.get("lab_fage"));
							objnewLabTestNormalValues.setTage((Double) rs1.get("lab_toage"));
							objnewLabTestNormalValues.setMale((String) rs1.get("lab_male"));
							objnewLabTestNormalValues.setFemale((String) rs1.get("lab_female"));
							objnewLabTestNormalValues.setOthers((String) rs1.get("lab_others"));
							objnewLabTestNormalValues.setCl((String) rs1.get("lab_cl"));
							objnewLabTestNormalValues.setCh((String) rs1.get("lab_ch"));
							objnewLabTestNormalValues.setOldandnew((String) rs1.get("lab_oldandnew"));
							normalValuesli.add(objnewLabTestNormalValues);
						}

					}
				}

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return normalValuesli;
	}

	@Override
	public List fetchLabTestResult(Integer tretId, String callfrom) {
		String sql = "";
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		String todays_date = dateFormat.format(currentDate.getTime());

		List arrlist = new ArrayList();
		List<LabPkg> arrLabPkg = new ArrayList<LabPkg>();
		List<LabProfile> arrLabProfile = new ArrayList<LabProfile>();
		List<LabTest> arrLabTest1 = new ArrayList<LabTest>();

		try {

			int profilecount = 0;
			// sql = "select distinct(tr.idprofile),lp.* from labtestsresult tr,labprofile
			// lp where lp.idprofile=tr.idprofile and tr.idprofile is not null and
			// tr.idlabpkg is null and tr.idlabTestResultMaster=? and tr.labtestresultStatus
			// = 'Y' ";
			// changed by Laxman for fetch PROFILE in new tables on 02-Feb-2018.
			// sql="select distinct lp . *, elrs.lab_request_id,elrs.lab_req_slv_id,
			// dct.doc_name,elr.posted_datetime from ehat_lab_request
			// elr,ehat_lab_request_slave elrs,labprofile lp,doctor dct where
			// elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id =
			// lp.subservice_id and elrs.ref_doc_id=dct.Doctor_ID and elrs.sub_service_id is
			// not null and elr.treatment_id='"+tretId+"'";

			if (callfrom.equalsIgnoreCase("viewbtn")) {

				sql = "select distinct lp . *, elrs.lab_request_id, elrs.lab_req_slv_id, ifnull(dct.doc_name,'-') as doc_name, elr.posted_datetime,elrs.service_id as serv_id,ifnull(es.category_name,'-') as pkg_name from ehat_lab_request elr join ehat_lab_request_slave elrs join labprofile lp left join doctor dct on elrs.ref_doc_id = dct.Doctor_ID left join ehat_subservice es ON elrs.package_id = es.id where elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id = lp.subservice_id and elrs.sub_service_id is not null and elr.treatment_id = '"
						+ tretId
						+ "' and elr.posted_result_flag='Y' and elrs.deleted_flag='N' order by elrs.lab_req_slv_id";

			} else if (callfrom.equalsIgnoreCase("autodischargesum")) {

				// For AutoDischargeSummaryPrint
				sql = "select distinct lp . *, elrs.lab_request_id, elrs.lab_req_slv_id, ifnull(dct.doc_name,'-') as doc_name, elr.posted_datetime,elrs.service_id as serv_id,ifnull(es.category_name,'-') as pkg_name from ehat_lab_request elr join ehat_lab_request_slave elrs join labprofile lp left join doctor dct on elrs.ref_doc_id = dct.Doctor_ID left join ehat_subservice es ON elrs.package_id = es.id where elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id = lp.subservice_id and elrs.sub_service_id is not null and elr.treatment_id = '"
						+ tretId
						+ "' and (elr.test_status = 'P' or elr.test_status = 'A') and elrs.deleted_flag='N' order by elrs.lab_req_slv_id";
			}

			Query userDtls = sessionFactory.getCurrentSession().createSQLQuery(sql);
			userDtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> userDetails = userDtls.list();

			/*
			 * List<Map<String, Object>> userDetails = getJdbcTemplate() .queryForList(sql,
			 * new Object[] { testmasterId });
			 */

			for (Map<String, Object> rs : userDetails) {
				List<LabTest> arrLabTest = new ArrayList<LabTest>();
				profilecount++;
				LabProfile objLabProfile = new LabProfile();

				objLabProfile.setIdprofile((Integer) rs.get("idprofile"));
				objLabProfile.setIdheadings((Integer) rs.get("idheadings"));
				objLabProfile.setProfileCharges((Float) rs.get("profileCharges"));

				objLabProfile.setProfileName((String) rs.get("profileName"));
				objLabProfile.setProfileStatus((String) rs.get("profileStatus"));
				objLabProfile.setProfileCode((String) rs.get("profileCode"));
				// Added by Laxman on 31-Jan-2018.
				objLabProfile.setServiceID((Integer) rs.get("serv_id"));
				objLabProfile.setSubServiceID((Integer) rs.get("subservice_id"));
				objLabProfile.setLabRequestId((Integer) rs.get("lab_request_id"));
				objLabProfile.setLabReqSlvId((Integer) rs.get("lab_req_slv_id"));
				objLabProfile.setPkgName((String) rs.get("pkg_name"));
				objLabProfile.setRefDocName((String) rs.get("doc_name"));

				objLabProfile.setPostDateTime((Date) rs.get("posted_datetime"));
				int porId = (Integer) rs.get("idprofile");

				// sql = "select tr.*,lt.*,ltm.methodName from labtestresultmaster
				// lrm,labtestsresult tr,labtest lt,labtestmethod ltm where tr.idTest=lt.idTest
				// and ltm.idtestMethod = lt.idtestMethod and
				// lrm.idlabTestResultMaster=tr.idlabTestResultMaster and tr.idlabpkg is null
				// and tr.idprofile=? and tr.idlabTestResultMaster=? and tr.labtestresultStatus
				// = 'Y'";
				/*
				 * =============================================================================
				 * =======
				 */
				sql = "SELECT * FROM labprofiletestcomp where idprofile ='" + porId + "'";

				Query procoQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				procoQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> proco = procoQuery.list();

				/*
				 * List<Map<String, Object>> proco = getJdbcTemplate() .queryForList(sql, new
				 * Object[] { porId});
				 */

				for (Map<String, Object> rs1 : proco) {

					// idTest
					LabTest objLabTest1 = new LabTest();

					int idTest = (Integer) rs1.get("idTest");
					objLabTest1.setIdTest(idTest);

					if (idTest != 0) {
						// Added by Laxman on 01-Feb-2018.Getting test result value,after saving
						// labtestresult in new Table,use new (ehat_lab_result_ table for getting
						// testresult.
						// sql ="select * from labtestsresult where idTest =? and idprofile =? and
						// idlabtestresultmaster =?";
						sql = "select lab_result_id, test_result, narration from ehat_lab_result where test_Id = '"
								+ idTest + "' and service_id= '" + objLabProfile.getServiceID()
								+ "' and sub_service_id= '" + objLabProfile.getSubServiceID() + "' and treatment_id = '"
								+ tretId + "' and lab_request_id = '" + objLabProfile.getLabRequestId()
								+ "' and lab_req_slv_id='" + objLabProfile.getLabReqSlvId() + "'";

						Query testreQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						testreQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> testre = testreQuery.list();

						/*
						 * List<Map<String, Object>> testre = getJdbcTemplate() .queryForList(sql, new
						 * Object[] { idTest,
						 * objLabProfile.getServiceID(),objLabProfile.getSubServiceID(),tretId,
						 * testmasterId});
						 */

						for (Map<String, Object> t : testre) {

							int labResultPk = (Integer) t.get("lab_result_id");
							String tr = (String) t.get("test_result");
							String noteDetailsForGeneral = (String) t.get("narration");
							System.err.println("trid--->>>>>>" + labResultPk + "   testResult---->>>" + tr);
							objLabTest1.setIdTestResult(labResultPk);
							objLabTest1.setTestResult(tr);
							objLabTest1.setNoteDeatilsForGeneral(noteDetailsForGeneral);

						}

						sql = "select * from labtest where idTest ='" + idTest + "'";
						Query tesQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> tes = tesQuery.list();

						/*
						 * List<Map<String, Object>> tes = getJdbcTemplate() .queryForList(sql, new
						 * Object[] { idTest});
						 */

						for (Map<String, Object> t : tes) {

							String testName = (String) t.get("testName");
							String testCode = (String) t.get("testCode");
							float testRate = (Float) t.get("testRate");
							String valueType = (String) t.get("valueType");
							int idtestMethod = (Integer) t.get("idtestMethod");

							objLabTest1.setTestName(testName);
							objLabTest1.setTestCode(testCode);
							objLabTest1.setTestRate(testRate);
							objLabTest1.setValueType(valueType);
							objLabTest1.setIdtestMethod(idtestMethod);

							String mq = "select methodName from labtestmethod where idtestmethod = " + idtestMethod;
							String methodName = (String) sessionFactory.getCurrentSession().createSQLQuery(mq)
									.uniqueResult();
							/*
							 * methodNmQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); String
							 * methodName= methodNmQuery.uniqueResult().toString();
							 */

							System.err.println("---->>>>" + methodName);

							/*
							 * String methodName = getJdbcTemplate().queryForObject(mq, String.class);
							 */

							objLabTest1.setTestMethodnm(methodName);

							objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
							objLabTest1.setObjFormula(featchLabFormulaForTest(idTest));

							objLabTest1.setNormalValuesli(
									featchNormalValOfPat(idTest, valueType, tretId, objLabTest1.getNormalValuesli()));
							// System.err.println("in
							// profile-----?"+objLabTest1.getNormalValuesli().size());

							arrLabTest.add(objLabTest1);

						}

					} else {

						objLabTest1.setIdTest((Integer) rs1.get("idTest"));
						objLabTest1.setTestName((String) rs1.get("headName"));
						arrLabTest.add(objLabTest1);
					}
				}

				/*
				 * =============================================================================
				 * =======
				 */
				/*
				 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
				 * Object[] { porId, testmasterId });
				 * 
				 * for (Map rs1 : labtest) { LabTest objLabTest = new LabTest();
				 * 
				 * objLabTest.setIdTestResult((Integer) rs1 .get("idresultTests"));
				 * objLabTest.setTestResult((String) rs1.get("testResult"));
				 * objLabTest.setIdTest((Integer) rs1.get("idTest"));
				 * objLabTest.setTestName((String) rs1.get("testName"));
				 * objLabTest.setTestCode((String) rs1.get("testCode"));
				 * objLabTest.setTestRate((Float) rs1.get("testRate"));
				 * objLabTest.setValueType((String) rs1.get("valueType"));
				 * objLabTest.setTestMethodnm((String) rs1.get("methodName")); int idTest =
				 * (Integer) rs1.get("idTest"); String valueType = (String)
				 * rs1.get("valueType"); objLabTest.setNoteDeatilsForGeneral((String) rs1
				 * .get("noteDetailsForGeneral"));
				 * objLabTest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
				 * objLabTest.setObjFormula(featchLabFormulaForTest(idTest));
				 * 
				 * arrLabTest.add(objLabTest); }
				 */
				// objLabProfile.setTestli(arrLabTest);

				arrLabProfile.add(objLabProfile);
			}
			sql = "select lt.*,tr.idresultTests,tr.testResult,ltm.methodName from labtestresultmaster lrm,labtestmethod ltm,labtestsresult tr,labtest lt where tr.idTest=lt.idTest and ltm.idtestMethod = lt.idtestMethod and lrm.idlabTestResultMaster=tr.idlabTestResultMaster and   tr.idprofile is null  and tr.idlabTestResultMaster='' and tr.labtestresultStatus = 'Y' ";

			List<Map<String, Object>> testDetails = null;

			Query testDtlsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			testDtlsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			testDetails = testDtlsQuery.list();

			/*
			 * testDetails = getJdbcTemplate().queryForList(sql, new Object[] { testmasterId
			 * });
			 */

			for (Map<String, Object> rs2 : testDetails) {
				LabTest objLabtest = new LabTest();
				// LabTest objLabTestindi = new LabTest();// new individual.
				objLabtest.setIdTestResult((Integer) rs2.get("idresultTests"));
				objLabtest.setTestResult((String) rs2.get("testResult"));
				objLabtest.setIdTest((Integer) rs2.get("idTest"));
				objLabtest.setTestName((String) rs2.get("testName"));
				objLabtest.setTestCode((String) rs2.get("testCode"));
				objLabtest.setTestRate((Float) rs2.get("testRate"));
				objLabtest.setValueType((String) rs2.get("valueType"));
				objLabtest.setTestMethodnm((String) rs2.get("methodName"));
				int idTest = (Integer) rs2.get("idTest");

				objLabtest.setTestNote((String) rs2.get("testNote"));
				objLabtest.setTestClinicaluse((String) rs2.get("testClinicaluse"));
				objLabtest.setTestIncreasedlevel((String) rs2.get("testIncreasedlevel"));
				objLabtest.setTestInterpretation((String) rs2.get("testInterpretation"));
				objLabtest.setTestComments((String) rs2.get("testComments"));
				String valueType = (String) rs2.get("valueType");
				objLabtest.setIdheadings((Integer) rs2.get("idheadings"));
				objLabtest.setNoteDeatilsForGeneral((String) rs2.get("noteDetailsForGeneral"));

				objLabtest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));

				objLabtest.setObjFormula(featchLabFormulaForTest(idTest));
				objLabtest.setNormalValuesli(
						featchNormalValOfPat(idTest, valueType, tretId, objLabtest.getNormalValuesli()));
				// System.err.println("in profile-----?"+objLabtest.getNormalValuesli().size());

				arrLabTest1.add(objLabtest);

				// arrLabTest1.add(objLabTestindi);
			}

			// System.out.println("tretId" + tretId);
			// commented on 30-Jan-20188.
			/*
			 * String sqlforpat = "select referedTo from treatment where Treatment_ID = " +
			 * tretId; String referedTo = getJdbcTemplate().queryForObject(sqlforpat,
			 * String.class); String sqlforbiil = ""; int bill_id = 0; if
			 * (referedTo.equals("ipd")) { sqlforbiil =
			 * "select bill_id from bill_master where Treatment_ID = " + tretId; bill_id =
			 * getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else if
			 * (referedTo.equals("opd")) { sqlforbiil =
			 * "select bill_id from bill_master_opd where Treatment_ID = " + tretId; bill_id
			 * = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else { sqlforbiil =
			 * "select bill_id from bill_master_diagnosis where Treatment_ID = " + tretId;
			 * bill_id = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); }
			 * 
			 * int count = 0; if (referedTo.equals("ipd")) { sql =
			 * "select count(*) from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("opd")) { sql =
			 * "select count(*) from opd_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("diagnosis")) { sql =
			 * "select count(*) from diagnosis_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); }
			 */

			// @ModifiedBy:Touheed @ModifiedDate :17-Mar-2016 //kavita forget Why she write
			// this code here if she remember then will change the code

			/*
			 * int labtestresultmaster_id = 0; String sqlforlab =
			 * "select idlabtestresultmaster from labtestresultmaster where Treatment_ID = "
			 * + tretId; labtestresultmaster_id = getJdbcTemplate().queryForInt(sqlforlab);
			 * System.out.println("idlabtestresultmaster----" + labtestresultmaster_id);
			 * 
			 * int id_master = 0; List<Map<String, Object>> billListDetails = null; if
			 * (count > 0) { if (referedTo.equals("ipd")) { sql =
			 * "select idipdbill_pathologytest_master from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; id_master = getJdbcTemplate().queryForInt(sql);
			 * 
			 * sql =
			 * "select * from ipdbill_pathologytest_slave where idipdbill_pathologytest_master = ? and labresult_flag = 'Y'"
			 * ;
			 * 
			 * billListDetails = getJdbcTemplate().queryForList(sql, new Object[] {
			 * id_master }); } else if (referedTo.equals("opd")) { sql =
			 * "select * from opd_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } else if (referedTo.equals("diagnosis")) { sql =
			 * "select * from diagnosis_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } String test_type = ""; for (Map rsforBillTest : billListDetails) { if
			 * (referedTo.equals("ipd")) { test_type = (String) rsforBillTest
			 * .get("pathologytest_type"); } else if (referedTo.equals("opd")) { test_type =
			 * (String) rsforBillTest.get("msg"); } else if (referedTo.equals("diagnosis"))
			 * { test_type = (String) rsforBillTest.get("msg"); }
			 * 
			 * //System.out.println("test_type-----" + test_type);
			 * 
			 * if ((test_type.equals("test") || test_type == "test") ||
			 * (test_type.equals("t") || test_type == "t")) { int testId = 0;
			 * 
			 * if (referedTo.equals("ipd")) { testId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("opd")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("diagnosis")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idTest=? and idprofile is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate() .queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, testId }); if (countForPesent == 0) { sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ; List<Map<String, Object>> testDetailsBill = null;
			 * 
			 * testDetailsBill = getJdbcTemplate().queryForList( sql, new Object[] { testId
			 * });
			 * 
			 * for (Map rsforTest : testDetailsBill) { LabTest objLabtest = new LabTest();
			 * objLabtest.setTestResult((String) rsforTest .get("testResult"));
			 * objLabtest.setIdTest((Integer) rsforTest .get("idTest"));
			 * objLabtest.setTestName((String) rsforTest .get("testName"));
			 * objLabtest.setTestCode((String) rsforTest .get("testCode"));
			 * objLabtest.setTestRate((Float) rsforTest .get("testRate"));
			 * objLabtest.setValueType((String) rsforTest .get("valueType"));
			 * objLabtest.setTestMethodnm((String) rsforTest .get("methodName"));
			 * objLabtest.setTestNote((String) rsforTest .get("testNote")); objLabtest
			 * .setTestClinicaluse((String) rsforTest .get("testClinicaluse")); objLabtest
			 * .setTestIncreasedlevel((String) rsforTest .get("testIncreasedlevel"));
			 * objLabtest .setTestInterpretation((String) rsforTest
			 * .get("testInterpretation")); objLabtest.setTestComments((String) rsforTest
			 * .get("testComments"));
			 * 
			 * int idTest = (Integer) rsforTest.get("idTest"); String valueType = (String)
			 * rsforTest .get("valueType"); objLabtest
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType)); objLabtest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest,idlabTestResultMaster,assignDate) VALUES (?,?,?)"
			 * ; getJdbcTemplate().update( sql, new Object[] { testId,
			 * labtestresultmaster_id, todays_date }); int last_insert_id = 0; String
			 * sqlForId = "select last_insert_id()"; last_insert_id =
			 * getJdbcTemplate().queryForInt( sqlForId);
			 * System.out.println("last_insert_id test_id>>>>" + last_insert_id);
			 * objLabtest.setIdTestResult(last_insert_id); arrLabTest1.add(objLabtest); } }
			 * } else if ((test_type.equals("profile") || test_type == "profile") ||
			 * (test_type.equals("pro") || test_type == "pro")) { int profileId = 0; if
			 * (referedTo.equals("ipd")) { profileId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("profileId-----" + profileId);
			 * } else if (referedTo.equals("opd")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); } else if (referedTo.equals("diagnosis")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idprofile=? and idlabpkg is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[] {
			 * labtestresultmaster_id, profileId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labprofile lp where lp.idprofile=?";
			 * 
			 * List<Map<String, Object>> billprofileDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) { List<LabTest> arrbillLabTest = new
			 * ArrayList<LabTest>(); profilecount++; LabProfile objbillLabProfile = new
			 * LabProfile(); objbillLabProfile .setIdprofile((Integer) rsforTest
			 * .get("idprofile")); objbillLabProfile .setIdheadings((Integer) rsforTest
			 * .get("idheadings")); objbillLabProfile .setProfileCharges((Float) rsforTest
			 * .get("profileCharges")); objbillLabProfile .setProfileName((String) rsforTest
			 * .get("profileName")); objbillLabProfile .setProfileStatus((String) rsforTest
			 * .get("profileStatus")); objbillLabProfile .setProfileCode((String) rsforTest
			 * .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile");
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList(sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1.get("idTest"); sql
			 * =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTest.setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTest.setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrbillLabTest.add(objLabTest);
			 * 
			 * } objbillLabProfile.setTestli(arrbillLabTest); }
			 * 
			 * System.out.println("profilecount>>>>" + profilecount); int last_insert_id_pro
			 * = 0; sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,profilecount) VALUES (?,?,?,?,?)"
			 * ; int ProCntForInsert = 0; for (int i = 0; i < objbillLabProfile
			 * .getTestli().size(); i++) { getJdbcTemplate() .update(sql, new Object[] {
			 * objbillLabProfile .getTestli() .get(i) .getIdTest(), objbillLabProfile
			 * .getIdprofile(), labtestresultmaster_id, todays_date, profilecount });
			 * 
			 * String sqlForproId = "select last_insert_id()"; last_insert_id_pro =
			 * getJdbcTemplate() .queryForInt(sqlForproId); objbillLabProfile .getTestli()
			 * .get(i) .setIdTestResult(last_insert_id_pro); }
			 * arrLabProfile.add(objbillLabProfile); } } } else if
			 * ((test_type.equals("package") || test_type == "package") ||
			 * (test_type.equals("pkg") || test_type == "pkg")) {
			 * 
			 * int packageId = 0; if (referedTo.equals("ipd")) { packageId = (Integer)
			 * rsforBillTest .get("pathologytest_id"); //System.out.println("packageId-----"
			 * + packageId); } else if (referedTo.equals("opd")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); } else if (referedTo.equals("diagnosis")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idlabpkg=?"
			 * ; countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, packageId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labpkg lp  where lp.idlabpkg = ?";
			 * 
			 * List<Map<String, Object>> pkgallDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { packageId });
			 * 
			 * for (Map rsforpkg : pkgallDetails) { LabPkg objbillLabPkg = new LabPkg();
			 * 
			 * objbillLabPkg.setIdlabpkg((Integer) rsforpkg .get("idlabpkg"));
			 * objbillLabPkg.setIdheadings((Integer) rsforpkg .get("idheadings"));
			 * objbillLabPkg.setPkgCharges((Float) rsforpkg .get("pkgCharges"));
			 * 
			 * objbillLabPkg.setPkgName((String) rsforpkg .get("pkgName"));
			 * objbillLabPkg.setPkgStatus((String) rsforpkg .get("pkgStatus"));
			 * objbillLabPkg.setPkgCode((String) rsforpkg .get("pkgCode"));
			 * 
			 * int pkgId = (Integer) rsforpkg.get("idlabpkg"); List<LabProfile>
			 * labbillProfileLi = new ArrayList<LabProfile>(); List<LabTest> arrLabTestBill
			 * = new ArrayList<LabTest>();
			 * 
			 * String sqlforpro = "select * from labpkgprotestcomp where idpkg = ?";
			 * List<Map<String, Object>> pkgprodetails = getJdbcTemplate()
			 * .queryForList(sqlforpro, new Object[] { pkgId });
			 * //System.out.println(pkgprodetails);
			 * 
			 * for (Map resforpro : pkgprodetails) { String testtype = (String) resforpro
			 * .get("typeTP"); if (testtype.equals("P")) { int profileId = (Integer)
			 * resforpro .get("idProTest");
			 * 
			 * sql = "select lp.* from labprofile lp where lp.idprofile=?"; List<Map<String,
			 * Object>> billprofileDetails = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) {
			 * 
			 * LabProfile objbillLabPro = new LabProfile();
			 * 
			 * objbillLabPro .setIdprofile((Integer) rsforTest .get("idprofile"));
			 * objbillLabPro .setIdheadings((Integer) rsforTest .get("idheadings"));
			 * objbillLabPro .setProfileCharges((Float) rsforTest .get("profileCharges"));
			 * objbillLabPro .setProfileName((String) rsforTest .get("profileName"));
			 * objbillLabPro .setProfileStatus((String) rsforTest .get("profileStatus"));
			 * objbillLabPro .setProfileCode((String) rsforTest .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile"); List<LabTest>
			 * arrLabTestPro = new ArrayList<LabTest>();
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList( sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1 .get("idTest");
			 * sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTestforPro = new LabTest();
			 * 
			 * objLabTestforPro .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTestforPro .setIdTest((Integer) rsForpro .get("idTest"));
			 * objLabTestforPro .setTestName((String) rsForpro .get("testName"));
			 * objLabTestforPro .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTestforPro .setTestRate((Float) rsForpro .get("testRate"));
			 * objLabTestforPro .setValueType((String) rsForpro .get("valueType"));
			 * objLabTestforPro .setTestMethodnm((String) rsForpro .get("methodName")); int
			 * idTest = (Integer) rsForpro .get("idTest"); String valueType = (String)
			 * rsForpro .get("valueType"); objLabTestforPro
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType));
			 * objLabTestforPro .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrLabTestPro .add(objLabTestforPro); } objbillLabPro
			 * .setTestli(arrLabTestPro); } System.out .println("pro list size>>>>" +
			 * objbillLabPro .getTestli() .size()); sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_pro_pkg = 0; for (int j = 0; j < objbillLabPro
			 * .getTestli().size(); j++) {
			 * 
			 * getJdbcTemplate() .update(sql, new Object[] { objbillLabPro .getTestli()
			 * .get(j) .getIdTest(), objbillLabPro .getIdprofile(), labtestresultmaster_id,
			 * todays_date, objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForpkgId = "select last_insert_id()"; last_insert_id_pro_pkg =
			 * getJdbcTemplate() .queryForInt( sqlForpkgId); System.out
			 * .println("last_insert_id_pro_pkg>>>>" + last_insert_id_pro_pkg);
			 * objbillLabPro .getTestli() .get(j) .setIdTestResult( last_insert_id_pro_pkg);
			 * }
			 * 
			 * labbillProfileLi.add(objbillLabPro); }
			 * 
			 * } else {
			 * 
			 * int testId = (Integer) resforpro .get("idProTest"); sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { testId }); //System.out.println(labtest);
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult")); objLabTest
			 * .setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode")); objLabTest
			 * .setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_test_pkg = 0; getJdbcTemplate() .update(sql, new
			 * Object[] { objLabTest .getIdTest(), 0, labtestresultmaster_id, todays_date,
			 * objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForTestId = "select last_insert_id()"; last_insert_id_test_pkg =
			 * getJdbcTemplate() .queryForInt(sqlForTestId); System.out
			 * .println("last_insert_id_test_pkg>>>>" + last_insert_id_test_pkg); objLabTest
			 * .setIdTestResult(last_insert_id_test_pkg);
			 * 
			 * arrLabTestBill.add(objLabTest); } } }
			 * objbillLabPkg.setProfileli(labbillProfileLi);
			 * objbillLabPkg.setArrLabTest(arrLabTestBill); arrLabPkg.add(objbillLabPkg); }
			 * } } } }
			 */
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("database error...could not insert: " + e.getMessage());
		}
		arrlist.add(arrLabProfile);
		arrlist.add(arrLabTest1);
		arrlist.add(arrLabPkg);
		return arrlist;
	}

	@Override
	public CpoeIPDdetails fetchIpdCoversheetLab(Integer tID, String callform, Integer deptId) {
		CpoeIPDdetails objCpoe = new CpoeIPDdetails();
		List<LabRequestDTO> labReqList = new ArrayList<LabRequestDTO>();
		List<LabRequestSlaveDTO> labReqSlvList = new ArrayList<LabRequestSlaveDTO>();
		List<CpoeIPDdetails> tlistbiilall = new ArrayList<CpoeIPDdetails>();
		String fetchId = "";
		Calendar postDate = Calendar.getInstance();
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String) resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String) resourceBundleEhat.getString("packageID");

		int packageID = Integer.parseInt(pkgID);// 13
		int serviceId = Integer.parseInt(sid);// 11

		try {
			// String sql="select a.bill_details_id AS bill_details_ipd_id, a.treatment_id
			// AS treatment_id, b.service_id AS service_id, b.service_name AS service_name,
			// t.id AS id, t.category_name AS category_name, t.charges AS category_charges,
			// a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName,
			// a.created_date_time AS created_date_time from ehat_bill_details_ipd a join
			// ehat_subservice t ON t.service_id = a.service_id and t.id = a.sub_service_id
			// join ehat_service_master b ON b.service_id = t.service_id left join doctor ON
			// doctor.Doctor_ID = a.doctor_id where a.deleted = 'N' and t.isCategory = 'N'
			// and t.deleted = 'N' and b.deleted = 'N' and t.service_id
			// in("+serviceId+","+packageID+") and a.treatment_id='"+tID+"' order by
			// a.bill_details_id desc";

			String sql = "select a.bill_details_id AS bill_details_ipd_id, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, t.category_name AS category_name, t.charges  AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-')  AS docName, a.created_date_time AS created_date_time  from ehat_bill_details_ipd a  join ehat_subservice t ON t.service_id = a.service_id and t.id = a.sub_service_id join ehat_service_master b ON b.service_id = t.service_id  left join doctor ON doctor.Doctor_ID = a.doctor_id  where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N'  and b.deleted = 'N' and t.service_id in("
					+ serviceId + "," + packageID + ") and a.treatment_id='" + tID
					+ "' and (t.deleted = 'N') and (b.deleted = 'N') order by a.bill_details_id desc";

			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();
			// List<CpoeIPDdetails> labPatRecordlist = new ArrayList<CpoeIPDdetails>();
			for (Map<String, Object> row : result) {
				CpoeIPDdetails obj = new CpoeIPDdetails();
				obj.setBillipd_id((Integer) row.get("bill_details_ipd_id"));
				obj.setServicename((String) row.get("service_name"));
				obj.setCategoryid((Integer) row.get("id"));
				obj.setCategoryName((String) row.get("category_name"));
				obj.setCategorycharges((Double) row.get("category_charges"));
				obj.setQuantity(((Double) row.get("quantity")).intValue());
				obj.setDocName((String) row.get("docName"));
				obj.setInserted_date_time((Date) row.get("created_date_time"));
				tlistbiilall.add(obj);
			}

			objCpoe.setCpoeServdetails(tlistbiilall);

			for (int i = 0; i < tlistbiilall.size(); i++) {
				fetchId = "SELECT elr.lab_request_id,elr.posted_datetime,elr.posted_result_flag,elrs.sub_service_id,elrs.lab_req_slv_id"
						+ ",elrs.is_package_flag FROM ehat_lab_request elr inner join ehat_lab_request_slave elrs ON "
						+ "elr.lab_request_id = elrs.lab_request_id where elr.posted_result_flag='Y' and elrs.bill_details_id ='"
						+ tlistbiilall.get(i).getBillipd_id() + "' and  elrs.dept_id='" + deptId
						+ "' and elrs.deleted_flag='N' group by elrs.bill_details_id";
				Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(fetchId);
				labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listLabTestRes = labTestResQuery.list();

				if (listLabTestRes.size() > 0) {
					for (Map<String, Object> row : listLabTestRes) {
						LabRequestDTO objReq = new LabRequestDTO();
						LabRequestSlaveDTO objSlv = new LabRequestSlaveDTO();

						postDate.setTime((Date) row.get("posted_datetime"));
						objReq.setLabRequestId((Integer) row.get("lab_request_id"));
						objReq.setPostedDatetime(postDate);
						objReq.setPostedResultFlag(row.get("posted_result_flag").toString().charAt(0));
						objSlv.setLabReqSlvId((Integer) row.get("lab_req_slv_id"));
						objSlv.setIsPackageFlag((String) row.get("is_package_flag"));
						labReqList.add(objReq);
						labReqSlvList.add(objSlv);
					}
				} else {
					LabRequestDTO objReq = new LabRequestDTO();
					LabRequestSlaveDTO objSlv = new LabRequestSlaveDTO();
					objReq.setPostedResultFlag('N');
					objSlv.setLabReqSlvId(0);
					labReqList.add(objReq);
					labReqSlvList.add(objSlv);
				}

			}
			// Set List to LabRequestDTO
			objCpoe.setListLabRequest(labReqList);
			// Set List to LabRequestSlaveDTO
			objCpoe.setListLabRequestSlave(labReqSlvList);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return objCpoe;
	}

	@Override
	public List compareLabTestResult(String callfrom, Integer tretId, Integer patientId) {

		String sql = "";
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		String todays_date = dateFormat.format(currentDate.getTime());

		List arrlist = new ArrayList();
		List<LabPkg> arrLabPkg = new ArrayList<LabPkg>();
		List<LabProfile> arrLabProfile = new ArrayList<LabProfile>();
		List<LabTest> arrLabTest1 = new ArrayList<LabTest>();

		try {

			/*
			 * sql =
			 * "select distinct lp.* from labtestresultmaster trm, labtestsresult tr, labpkg lp  where "
			 * +
			 * "trm.idlabtestresultmaster = tr.idlabTestResultMaster and lp.idlabpkg = tr.idlabpkg and tr.idlabpkg is not null "
			 * + "and trm.idlabTestResultMaster='' and tr.labtestresultStatus = 'Y' ";
			 * 
			 * Query pkgDtls = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * pkgDtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
			 * Object>> pkgDetails= pkgDtls.list(); //List<Map<String, Object>> pkgDetails =
			 * getJdbcTemplate().queryForList(sql, new Object[] { testmasterId });
			 * 
			 * for (Map<String, Object> rs : pkgDetails) { LabPkg objLabPkg = new LabPkg();
			 * 
			 * objLabPkg.setIdlabpkg((Integer) rs.get("idlabpkg"));
			 * objLabPkg.setIdheadings((Integer) rs.get("idheadings"));
			 * objLabPkg.setPkgCharges((Float) rs.get("pkgCharges"));
			 * 
			 * objLabPkg.setPkgName((String) rs.get("pkgName"));
			 * objLabPkg.setPkgStatus((String) rs.get("pkgStatus"));
			 * objLabPkg.setPkgCode((String) rs.get("pkgCode"));
			 * 
			 * int pkgId = (Integer) rs.get("idlabpkg");
			 * 
			 * List<LabProfile> labProfileLi = new ArrayList<LabProfile>();
			 * 
			 * sql =
			 * "select distinct (tr.idprofile), lp.* from labtestresultmaster lrm,labtestsresult tr,labpkgprotestcomp lpptc,"
			 * +
			 * "labprofile lp where lrm.idlabTestResultMaster = tr.idlabTestResultMaster and tr.idprofile = lpptc.idProTest "
			 * +
			 * "and tr.idlabpkg = lpptc.idpkg and lpptc.typeTP = 'P' and lp.idprofile = lpptc.idProTest "
			 * + "and lrm.idlabTestResultMaster='' and tr.idlabpkg = '"
			 * +pkgId+"' and tr.labtestresultStatus = 'Y' ";
			 * 
			 * Query pkgprodtls = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * pkgprodtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * List<Map<String, Object>> pkgprodetails= pkgprodtls.list();
			 * //List<Map<String, Object>> pkgprodetails =
			 * getJdbcTemplate().queryForList(sql, new Object[] { testmasterId, pkgId });
			 * 
			 * for (Map res : pkgprodetails) { LabProfile objLabProfile = new LabProfile();
			 * 
			 * objLabProfile.setIdprofile((Integer) res.get("idprofile")); objLabProfile
			 * .setIdheadings((Integer) res.get("idheadings"));
			 * objLabProfile.setProfileCharges((Float) res .get("profileCharges"));
			 * 
			 * objLabProfile.setProfileName((String) res .get("profileName"));
			 * objLabProfile.setProfileStatus((String) res .get("profileStatus"));
			 * objLabProfile.setProfileCode((String) res .get("profileCode"));
			 * 
			 * int porId = (Integer) res.get("idprofile");
			 * 
			 * List<LabTest> arrLabTest = new ArrayList<LabTest>();
			 * 
			 * 
			 * 
			 * 
			 * 
			 * _______________________only checked test should come inside profile of
			 * Pakcage__________
			 * 
			 * ArrayList<Integer> al = new ArrayList<Integer>();
			 * //System.err.println("______proId::"+porId+"   _____pkgId " +pkgId);
			 * //@modified : Touheed Khan @date : 03-May-2016 @reasone : added one more
			 * column typeTP = 'P' becasuse only for profile sql =
			 * "select idlabpkgprotestcomp from labpkgprotestcomp where idProTest='"
			 * +porId+"' and idpkg='"+pkgId+"' and typeTP='P'"; Query idlabpkgprotestcm =
			 * sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * idlabpkgprotestcm.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); int
			 * idlabpkgprotestcomp= (Integer)idlabpkgprotestcm.uniqueResult();
			 * 
			 * int idlabpkgprotestcomp = (Integer) getJdbcTemplate() .queryForObject(sql,
			 * new Object[] { porId,pkgId }, Integer.class);
			 * 
			 * 
			 * 
			 * sql =
			 * "SELECT * FROM labpkgpro where idprofile='"+porId+"' and idlabpkgTestComp='"
			 * +idlabpkgprotestcomp+"'";
			 * 
			 * Query litest = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * litest.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
			 * Object>> lit= litest.list();
			 * 
			 * List<Map<String, Object>> lit = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { porId,idlabpkgprotestcomp});
			 * 
			 * 
			 * for (Map rsli : lit) {
			 * 
			 * 
			 * int tid = (Integer) rsli.get("idTest");
			 * 
			 * al.add(tid);
			 * 
			 * }
			 * 
			 * //System.err.println("~~~~~~~~List of tes inside profile of package~~~~~~~"
			 * +al);
			 * 
			 * 
			 * 
			 * ______________________only checked test should come inside profile of
			 * Pakcage__________
			 * 
			 * // sql =
			 * "select tr.*, lt.*, ltm.methodName from labtestresultmaster lrm,labtestsresult tr,labpkgprotestcomp lpptc, labpkgpro lpp, labtest lt,   labtestmethod ltm where lrm.idlabTestResultMaster = tr.idlabTestResultMaster and tr.idprofile = lpptc.idProTest and tr.idlabpkg = lpptc.idpkg and lpptc.idlabpkgprotestcomp = lpp.idlabpkgTestComp and lpp.idTest = lt.idTest and lpp.idTest = tr.idTest and ltm.idtestMethod = lt.idtestMethod and lpptc.idProTest = tr.idprofile and lrm.idlabTestResultMaster=? and tr.labtestresultStatus = 'Y' and tr.idprofile = ? and tr.idlabpkg = ? "
			 * ;
			 * 
			 * System.out.println("  testmasterId="+ testmasterId+"  porId="+porId+
			 * "  pkgId="+pkgId ); System.out.println("Query all -- >"+sql);
			 * 
			 * __________________________MY new COde____________________ sql =
			 * "SELECT * FROM labprofiletestcomp where idprofile ='"+porId+"'"; Query
			 * procoQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * procoQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * List<Map<String, Object>> proco= procoQuery.list();
			 * 
			 * List<Map<String, Object>> proco = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { porId});
			 * 
			 * for (Map rs1 : proco) {
			 * 
			 * //idTest LabTest objLabTest1 = new LabTest();
			 * 
			 * int idTest = (Integer) rs1.get("idTest"); objLabTest1.setIdTest(idTest);
			 * 
			 * if(idTest !=0){
			 * 
			 * if(al.contains(idTest)){
			 * 
			 * sql
			 * ="select * from labtestsresult where idTest ='"+idTest+"' and idprofile ='"
			 * +porId+"' and idlabtestresultmaster =''";
			 * 
			 * Query testreQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * testreQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * List<Map<String, Object>> testre= testreQuery.list();
			 * 
			 * List<Map<String, Object>> testre = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { idTest, porId,testmasterId}); for (Map t : testre) {
			 * 
			 * int trid = (Integer) t.get("idresultTests"); String tr = (String)
			 * t.get("testResult"); String noteDetailsForGeneral = (String)
			 * t.get("noteDetailsForGeneral");
			 * 
			 * objLabTest1.setIdTestResult(trid); objLabTest1.setTestResult(tr);
			 * objLabTest1.setNoteDeatilsForGeneral(noteDetailsForGeneral);
			 * 
			 * }
			 * 
			 * sql = "select * from labtest where idTest ='"+idTest+"'"; Query tesQuery =
			 * sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); List<Map<String,
			 * Object>> tes= tesQuery.list();
			 * 
			 * List<Map<String, Object>> tes = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { idTest});
			 * 
			 * for (Map t : tes) {
			 * 
			 * String testName = (String) t.get("testName"); String testCode = (String)
			 * t.get("testCode"); float testRate = (Float) t.get("testRate"); String
			 * valueType = (String) t.get("valueType"); int idtestMethod = (Integer)
			 * t.get("idtestMethod");
			 * 
			 * objLabTest1.setTestName(testName); objLabTest1.setTestCode(testCode);
			 * objLabTest1.setTestRate(testRate); objLabTest1.setValueType(valueType);
			 * objLabTest1.setIdtestMethod(idtestMethod);
			 * 
			 * String mq = "select methodName from labtestmethod where idtestmethod = " +
			 * idtestMethod; Query methodNameQuery =
			 * sessionFactory.getCurrentSession().createSQLQuery(mq); String methodName=
			 * methodNameQuery.uniqueResult().toString();
			 * 
			 * String methodName = getJdbcTemplate().queryForObject(mq, String.class);
			 * 
			 * objLabTest1.setTestMethodnm(methodName);
			 * 
			 * objLabTest1.setNormalValuesli(featchNormalValOfPat( idTest, valueType));
			 * 
			 * objLabTest1.setObjFormula(featchLabFormulaForTest(idTest));
			 * objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest,
			 * valueType,objLabProfile.getTreatmentId(),objLabTest1.getNormalValuesli()));
			 * arrLabTest.add(objLabTest1);
			 * 
			 * 
			 * 
			 * }
			 * 
			 * }
			 * 
			 * 
			 * }else{
			 * 
			 * objLabTest1.setIdTest((Integer) rs1.get("idTest"));
			 * objLabTest1.setTestName((String) rs1.get("headName"));
			 * arrLabTest.add(objLabTest1); }
			 * 
			 * objLabProfile.setTestli(arrLabTest);
			 * 
			 * labProfileLi.add(objLabProfile);
			 * 
			 * objLabPkg.setProfileli(labProfileLi);
			 * 
			 * 
			 * }
			 * 
			 * 
			 * __________________________MY new COde____________________
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { testmasterId, porId, pkgId });
			 * 
			 * for (Map rs1 : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest.setIdTestResult((Integer) rs1 .get("idresultTests")); objLabTest
			 * .setTestResult((String) rs1.get("testResult"));
			 * //objLabTest.setIdTest((Integer) rs1.get("idTest"));
			 * //objLabTest.setTestName((String) rs1.get("testName"));
			 * //objLabTest.setTestCode((String) rs1.get("testCode"));
			 * //objLabTest.setTestRate((Float) rs1.get("testRate"));
			 * //objLabTest.setValueType((String) rs1.get("valueType"));
			 * //objLabTest.setTestMethodnm((String) rs1 // .get("methodName")); int idTest
			 * = (Integer) rs1.get("idTest"); String valueType = (String)
			 * rs1.get("valueType"); //objLabTest.setNoteDeatilsForGeneral((String)
			 * rs1.get("noteDetailsForGeneral"));
			 * 
			 * objLabTest.setNormalValuesli(featchNormalValOfPat( idTest, valueType));
			 * objLabTest .setObjFormula(featchLabFormulaForTest(idTest));
			 * arrLabTest.add(objLabTest); } objLabProfile.setTestli(arrLabTest);
			 * 
			 * labProfileLi.add(objLabProfile);
			 * 
			 * objLabPkg.setProfileli(labProfileLi); }
			 * 
			 * List<LabTest> arrLabTest = new ArrayList<LabTest>();
			 * 
			 * sql =
			 * "select tr.*, lt.*, ltm.methodName from labtestresultmaster lrm,labtestsresult tr,labpkgprotestcomp lpptc,labtest lt,labtestmethod ltm where lrm.idlabTestResultMaster = tr.idlabTestResultMaster and ltm.idtestMethod = lt.idtestMethod and tr.idTest = lpptc.idProTest and tr.idlabpkg = lpptc.idpkg and lpptc.typeTP = 'T' and lt.idTest = lpptc.idProTest and tr.idprofile = 0 and lrm.idlabTestResultMaster=''  and tr.idlabpkg = '"
			 * +pkgId+"' and tr.labtestresultStatus = 'Y' ";
			 * 
			 * Query labtestQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * labtestQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * List<Map<String, Object>> labtest= labtestQuery.list();
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { testmasterId, pkgId });
			 * 
			 * for (Map rs1 : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest.setIdTestResult((Integer) rs1 .get("idresultTests"));
			 * objLabTest.setTestResult((String) rs1.get("testResult"));
			 * objLabTest.setIdTest((Integer) rs1.get("idTest"));
			 * objLabTest.setTestName((String) rs1.get("testName"));
			 * objLabTest.setTestCode((String) rs1.get("testCode"));
			 * objLabTest.setTestRate((Float) rs1.get("testRate"));
			 * objLabTest.setValueType((String) rs1.get("valueType"));
			 * objLabTest.setTestMethodnm((String) rs1.get("methodName")); int idTest =
			 * (Integer) rs1.get("idTest"); String valueType = (String)
			 * rs1.get("valueType"); objLabTest.setNoteDeatilsForGeneral((String) rs1
			 * .get("noteDetailsForGeneral"));
			 * 
			 * objLabTest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
			 * objLabTest.setObjFormula(featchLabFormulaForTest(idTest));
			 * objLabTest.setNormalValuesli(featchNormalValOfPat(idTest,
			 * valueType,tretId,objLabTest.getNormalValuesli()));
			 * 
			 * arrLabTest.add(objLabTest); } objLabPkg.setArrLabTest(arrLabTest);
			 * 
			 * arrLabPkg.add(objLabPkg); }
			 */
			int profilecount = 0;
			// sql = "select distinct(tr.idprofile),lp.* from labtestsresult tr,labprofile
			// lp where lp.idprofile=tr.idprofile and tr.idprofile is not null and
			// tr.idlabpkg is null and tr.idlabTestResultMaster=? and tr.labtestresultStatus
			// = 'Y' ";
			// changed by Laxman for fetch PROFILE in new tables on 02-Feb-2018.
			// sql="select distinct lp . *, elrs.lab_request_id,elrs.lab_req_slv_id,
			// dct.doc_name,elr.posted_datetime from ehat_lab_request
			// elr,ehat_lab_request_slave elrs,labprofile lp,doctor dct where
			// elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id =
			// lp.subservice_id and elrs.ref_doc_id=dct.Doctor_ID and elrs.sub_service_id is
			// not null and elr.treatment_id='"+tretId+"'";
			sql = "select distinct lp . *, elrs.lab_request_id, elrs.lab_req_slv_id, ifnull(dct.doc_name,'-') as doc_name, elr.posted_datetime,elr.treatment_id,elrs.service_id as serv_id,ifnull(es.category_name,'-') as pkg_name from ehat_lab_request elr join ehat_lab_request_slave elrs join labprofile lp left join doctor dct on elrs.ref_doc_id = dct.Doctor_ID left join ehat_subservice es ON elrs.package_id = es.id where elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id = lp.subservice_id and elrs.sub_service_id is not null and elr.patient_id = '"
					+ patientId + "' and elr.posted_result_flag='Y' and elrs.deleted_flag='N'";
			Query userDtls = sessionFactory.getCurrentSession().createSQLQuery(sql);
			userDtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> userDetails = userDtls.list();

			/*
			 * List<Map<String, Object>> userDetails = getJdbcTemplate() .queryForList(sql,
			 * new Object[] { testmasterId });
			 */

			for (Map<String, Object> rs : userDetails) {
				List<LabTest> arrLabTest = new ArrayList<LabTest>();
				profilecount++;
				LabProfile objLabProfile = new LabProfile();

				objLabProfile.setIdprofile((Integer) rs.get("idprofile"));
				objLabProfile.setIdheadings((Integer) rs.get("idheadings"));
				objLabProfile.setProfileCharges((Float) rs.get("profileCharges"));

				objLabProfile.setProfileName((String) rs.get("profileName"));
				objLabProfile.setProfileStatus((String) rs.get("profileStatus"));
				objLabProfile.setProfileCode((String) rs.get("profileCode"));
				// Added by Laxman on 31-Jan-2018.
				objLabProfile.setServiceID((Integer) rs.get("serv_id"));
				objLabProfile.setSubServiceID((Integer) rs.get("subservice_id"));
				objLabProfile.setLabRequestId((Integer) rs.get("lab_request_id"));
				objLabProfile.setLabReqSlvId((Integer) rs.get("lab_req_slv_id"));
				objLabProfile.setRefDocName((String) rs.get("doc_name"));
				objLabProfile.setPkgName((String) rs.get("pkg_name"));

				objLabProfile.setPostDateTime((Date) rs.get("posted_datetime"));
				objLabProfile.setTreatmentId((Integer) rs.get("treatment_id"));
				int porId = (Integer) rs.get("idprofile");

				// sql = "select tr.*,lt.*,ltm.methodName from labtestresultmaster
				// lrm,labtestsresult tr,labtest lt,labtestmethod ltm where tr.idTest=lt.idTest
				// and ltm.idtestMethod = lt.idtestMethod and
				// lrm.idlabTestResultMaster=tr.idlabTestResultMaster and tr.idlabpkg is null
				// and tr.idprofile=? and tr.idlabTestResultMaster=? and tr.labtestresultStatus
				// = 'Y'";
				/*
				 * =============================================================================
				 * =======
				 */
				sql = "SELECT * FROM labprofiletestcomp where idprofile ='" + porId + "'";

				Query procoQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				procoQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> proco = procoQuery.list();

				/*
				 * List<Map<String, Object>> proco = getJdbcTemplate() .queryForList(sql, new
				 * Object[] { porId});
				 */

				for (Map<String, Object> rs1 : proco) {

					// idTest
					LabTest objLabTest1 = new LabTest();

					int idTest = (Integer) rs1.get("idTest");
					objLabTest1.setIdTest(idTest);

					if (idTest != 0) {
						// Added by Laxman on 01-Feb-2018.Getting test result value,after saving
						// labtestresult in new Table,use new (ehat_lab_result_ table for getting
						// testresult.
						// sql ="select * from labtestsresult where idTest =? and idprofile =? and
						// idlabtestresultmaster =?";
						sql = "select lab_result_id, test_result, narration from ehat_lab_result where test_Id = '"
								+ idTest + "' and service_id= '" + objLabProfile.getServiceID()
								+ "' and sub_service_id= '" + objLabProfile.getSubServiceID() + "' and treatment_id = '"
								+ objLabProfile.getTreatmentId() + "' and lab_request_id = '"
								+ objLabProfile.getLabRequestId() + "' and lab_req_slv_id='"
								+ objLabProfile.getLabReqSlvId() + "'";

						Query testreQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						testreQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> testre = testreQuery.list();

						/*
						 * List<Map<String, Object>> testre = getJdbcTemplate() .queryForList(sql, new
						 * Object[] { idTest,
						 * objLabProfile.getServiceID(),objLabProfile.getSubServiceID(),tretId,
						 * testmasterId});
						 */

						for (Map<String, Object> t : testre) {

							int labResultPk = (Integer) t.get("lab_result_id");
							String tr = (String) t.get("test_result");
							String noteDetailsForGeneral = (String) t.get("narration");
							System.err.println("trid--->>>>>>" + labResultPk + "   testResult---->>>" + tr);
							objLabTest1.setIdTestResult(labResultPk);
							objLabTest1.setTestResult(tr);
							objLabTest1.setNoteDeatilsForGeneral(noteDetailsForGeneral);

						}

						sql = "select * from labtest where idTest ='" + idTest + "'";
						Query tesQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> tes = tesQuery.list();

						/*
						 * List<Map<String, Object>> tes = getJdbcTemplate() .queryForList(sql, new
						 * Object[] { idTest});
						 */

						for (Map<String, Object> t : tes) {

							String testName = (String) t.get("testName");
							String testCode = (String) t.get("testCode");
							float testRate = (Float) t.get("testRate");
							String valueType = (String) t.get("valueType");
							int idtestMethod = (Integer) t.get("idtestMethod");

							objLabTest1.setTestName(testName);
							objLabTest1.setTestCode(testCode);
							objLabTest1.setTestRate(testRate);
							objLabTest1.setValueType(valueType);
							objLabTest1.setIdtestMethod(idtestMethod);

							String mq = "select methodName from labtestmethod where idtestmethod = " + idtestMethod;
							String methodName = (String) sessionFactory.getCurrentSession().createSQLQuery(mq)
									.uniqueResult();
							/*
							 * methodNmQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); String
							 * methodName= methodNmQuery.uniqueResult().toString();
							 */

							System.err.println("---->>>>" + methodName);

							/*
							 * String methodName = getJdbcTemplate().queryForObject(mq, String.class);
							 */

							objLabTest1.setTestMethodnm(methodName);

							objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
							objLabTest1.setObjFormula(featchLabFormulaForTest(idTest));

							objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType,
									objLabProfile.getTreatmentId(), objLabTest1.getNormalValuesli()));
							// System.err.println("in
							// profile-----?"+objLabTest1.getNormalValuesli().size());

							arrLabTest.add(objLabTest1);

						}

					} else {

						objLabTest1.setIdTest((Integer) rs1.get("idTest"));
						objLabTest1.setTestName((String) rs1.get("headName"));
						arrLabTest.add(objLabTest1);
					}
				}

				/*
				 * =============================================================================
				 * =======
				 */
				/*
				 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
				 * Object[] { porId, testmasterId });
				 * 
				 * for (Map rs1 : labtest) { LabTest objLabTest = new LabTest();
				 * 
				 * objLabTest.setIdTestResult((Integer) rs1 .get("idresultTests"));
				 * objLabTest.setTestResult((String) rs1.get("testResult"));
				 * objLabTest.setIdTest((Integer) rs1.get("idTest"));
				 * objLabTest.setTestName((String) rs1.get("testName"));
				 * objLabTest.setTestCode((String) rs1.get("testCode"));
				 * objLabTest.setTestRate((Float) rs1.get("testRate"));
				 * objLabTest.setValueType((String) rs1.get("valueType"));
				 * objLabTest.setTestMethodnm((String) rs1.get("methodName")); int idTest =
				 * (Integer) rs1.get("idTest"); String valueType = (String)
				 * rs1.get("valueType"); objLabTest.setNoteDeatilsForGeneral((String) rs1
				 * .get("noteDetailsForGeneral"));
				 * objLabTest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
				 * objLabTest.setObjFormula(featchLabFormulaForTest(idTest));
				 * 
				 * arrLabTest.add(objLabTest); }
				 */
				// objLabProfile.setTestli(arrLabTest);

				arrLabProfile.add(objLabProfile);
			}
			/*
			 * sql =
			 * "select lt.*,tr.idresultTests,tr.testResult,ltm.methodName from labtestresultmaster lrm,labtestmethod ltm,labtestsresult tr,labtest lt where tr.idTest=lt.idTest and ltm.idtestMethod = lt.idtestMethod and lrm.idlabTestResultMaster=tr.idlabTestResultMaster and   tr.idprofile is null  and tr.idlabTestResultMaster='' and tr.labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * List<Map<String, Object>> testDetails = null;
			 * 
			 * Query testDtlsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * testDtlsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * testDetails= testDtlsQuery.list();
			 * 
			 * testDetails = getJdbcTemplate().queryForList(sql, new Object[] { testmasterId
			 * });
			 * 
			 * for (Map<String, Object> rs2 : testDetails) { LabTest objLabtest = new
			 * LabTest(); // LabTest objLabTestindi = new LabTest();// new individual.
			 * objLabtest.setIdTestResult((Integer) rs2.get("idresultTests"));
			 * objLabtest.setTestResult((String) rs2.get("testResult"));
			 * objLabtest.setIdTest((Integer) rs2.get("idTest"));
			 * objLabtest.setTestName((String) rs2.get("testName"));
			 * objLabtest.setTestCode((String) rs2.get("testCode"));
			 * objLabtest.setTestRate((Float) rs2.get("testRate"));
			 * objLabtest.setValueType((String) rs2.get("valueType"));
			 * objLabtest.setTestMethodnm((String) rs2.get("methodName")); int idTest =
			 * (Integer) rs2.get("idTest");
			 * 
			 * objLabtest.setTestNote((String) rs2.get("testNote"));
			 * objLabtest.setTestClinicaluse((String) rs2 .get("testClinicaluse"));
			 * objLabtest.setTestIncreasedlevel((String) rs2 .get("testIncreasedlevel"));
			 * objLabtest.setTestInterpretation((String) rs2 .get("testInterpretation"));
			 * objLabtest.setTestComments((String) rs2.get("testComments")); String
			 * valueType = (String) rs2.get("valueType"); objLabtest.setIdheadings((Integer)
			 * rs2.get("idheadings")); objLabtest.setNoteDeatilsForGeneral((String) rs2
			 * .get("noteDetailsForGeneral"));
			 * 
			 * objLabtest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
			 * 
			 * objLabtest.setObjFormula(featchLabFormulaForTest(idTest));
			 * objLabtest.setNormalValuesli(featchNormalValOfPat(idTest,
			 * valueType,tretId,objLabtest.getNormalValuesli()));
			 * //System.err.println("in profile-----?"+objLabtest.getNormalValuesli().size()
			 * );
			 * 
			 * arrLabTest1.add(objLabtest);
			 * 
			 * // arrLabTest1.add(objLabTestindi); }
			 */

			// System.out.println("tretId" + tretId);
			// commented on 30-Jan-20188.
			/*
			 * String sqlforpat = "select referedTo from treatment where Treatment_ID = " +
			 * tretId; String referedTo = getJdbcTemplate().queryForObject(sqlforpat,
			 * String.class); String sqlforbiil = ""; int bill_id = 0; if
			 * (referedTo.equals("ipd")) { sqlforbiil =
			 * "select bill_id from bill_master where Treatment_ID = " + tretId; bill_id =
			 * getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else if
			 * (referedTo.equals("opd")) { sqlforbiil =
			 * "select bill_id from bill_master_opd where Treatment_ID = " + tretId; bill_id
			 * = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else { sqlforbiil =
			 * "select bill_id from bill_master_diagnosis where Treatment_ID = " + tretId;
			 * bill_id = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); }
			 * 
			 * int count = 0; if (referedTo.equals("ipd")) { sql =
			 * "select count(*) from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("opd")) { sql =
			 * "select count(*) from opd_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("diagnosis")) { sql =
			 * "select count(*) from diagnosis_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); }
			 */

			// @ModifiedBy:Touheed @ModifiedDate :17-Mar-2016 //kavita forget Why she write
			// this code here if she remember then will change the code

			/*
			 * int labtestresultmaster_id = 0; String sqlforlab =
			 * "select idlabtestresultmaster from labtestresultmaster where Treatment_ID = "
			 * + tretId; labtestresultmaster_id = getJdbcTemplate().queryForInt(sqlforlab);
			 * System.out.println("idlabtestresultmaster----" + labtestresultmaster_id);
			 * 
			 * int id_master = 0; List<Map<String, Object>> billListDetails = null; if
			 * (count > 0) { if (referedTo.equals("ipd")) { sql =
			 * "select idipdbill_pathologytest_master from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; id_master = getJdbcTemplate().queryForInt(sql);
			 * 
			 * sql =
			 * "select * from ipdbill_pathologytest_slave where idipdbill_pathologytest_master = ? and labresult_flag = 'Y'"
			 * ;
			 * 
			 * billListDetails = getJdbcTemplate().queryForList(sql, new Object[] {
			 * id_master }); } else if (referedTo.equals("opd")) { sql =
			 * "select * from opd_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } else if (referedTo.equals("diagnosis")) { sql =
			 * "select * from diagnosis_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } String test_type = ""; for (Map rsforBillTest : billListDetails) { if
			 * (referedTo.equals("ipd")) { test_type = (String) rsforBillTest
			 * .get("pathologytest_type"); } else if (referedTo.equals("opd")) { test_type =
			 * (String) rsforBillTest.get("msg"); } else if (referedTo.equals("diagnosis"))
			 * { test_type = (String) rsforBillTest.get("msg"); }
			 * 
			 * //System.out.println("test_type-----" + test_type);
			 * 
			 * if ((test_type.equals("test") || test_type == "test") ||
			 * (test_type.equals("t") || test_type == "t")) { int testId = 0;
			 * 
			 * if (referedTo.equals("ipd")) { testId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("opd")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("diagnosis")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idTest=? and idprofile is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate() .queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, testId }); if (countForPesent == 0) { sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ; List<Map<String, Object>> testDetailsBill = null;
			 * 
			 * testDetailsBill = getJdbcTemplate().queryForList( sql, new Object[] { testId
			 * });
			 * 
			 * for (Map rsforTest : testDetailsBill) { LabTest objLabtest = new LabTest();
			 * objLabtest.setTestResult((String) rsforTest .get("testResult"));
			 * objLabtest.setIdTest((Integer) rsforTest .get("idTest"));
			 * objLabtest.setTestName((String) rsforTest .get("testName"));
			 * objLabtest.setTestCode((String) rsforTest .get("testCode"));
			 * objLabtest.setTestRate((Float) rsforTest .get("testRate"));
			 * objLabtest.setValueType((String) rsforTest .get("valueType"));
			 * objLabtest.setTestMethodnm((String) rsforTest .get("methodName"));
			 * objLabtest.setTestNote((String) rsforTest .get("testNote")); objLabtest
			 * .setTestClinicaluse((String) rsforTest .get("testClinicaluse")); objLabtest
			 * .setTestIncreasedlevel((String) rsforTest .get("testIncreasedlevel"));
			 * objLabtest .setTestInterpretation((String) rsforTest
			 * .get("testInterpretation")); objLabtest.setTestComments((String) rsforTest
			 * .get("testComments"));
			 * 
			 * int idTest = (Integer) rsforTest.get("idTest"); String valueType = (String)
			 * rsforTest .get("valueType"); objLabtest
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType)); objLabtest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest,idlabTestResultMaster,assignDate) VALUES (?,?,?)"
			 * ; getJdbcTemplate().update( sql, new Object[] { testId,
			 * labtestresultmaster_id, todays_date }); int last_insert_id = 0; String
			 * sqlForId = "select last_insert_id()"; last_insert_id =
			 * getJdbcTemplate().queryForInt( sqlForId);
			 * System.out.println("last_insert_id test_id>>>>" + last_insert_id);
			 * objLabtest.setIdTestResult(last_insert_id); arrLabTest1.add(objLabtest); } }
			 * } else if ((test_type.equals("profile") || test_type == "profile") ||
			 * (test_type.equals("pro") || test_type == "pro")) { int profileId = 0; if
			 * (referedTo.equals("ipd")) { profileId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("profileId-----" + profileId);
			 * } else if (referedTo.equals("opd")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); } else if (referedTo.equals("diagnosis")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idprofile=? and idlabpkg is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[] {
			 * labtestresultmaster_id, profileId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labprofile lp where lp.idprofile=?";
			 * 
			 * List<Map<String, Object>> billprofileDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) { List<LabTest> arrbillLabTest = new
			 * ArrayList<LabTest>(); profilecount++; LabProfile objbillLabProfile = new
			 * LabProfile(); objbillLabProfile .setIdprofile((Integer) rsforTest
			 * .get("idprofile")); objbillLabProfile .setIdheadings((Integer) rsforTest
			 * .get("idheadings")); objbillLabProfile .setProfileCharges((Float) rsforTest
			 * .get("profileCharges")); objbillLabProfile .setProfileName((String) rsforTest
			 * .get("profileName")); objbillLabProfile .setProfileStatus((String) rsforTest
			 * .get("profileStatus")); objbillLabProfile .setProfileCode((String) rsforTest
			 * .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile");
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList(sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1.get("idTest"); sql
			 * =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTest.setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTest.setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrbillLabTest.add(objLabTest);
			 * 
			 * } objbillLabProfile.setTestli(arrbillLabTest); }
			 * 
			 * System.out.println("profilecount>>>>" + profilecount); int last_insert_id_pro
			 * = 0; sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,profilecount) VALUES (?,?,?,?,?)"
			 * ; int ProCntForInsert = 0; for (int i = 0; i < objbillLabProfile
			 * .getTestli().size(); i++) { getJdbcTemplate() .update(sql, new Object[] {
			 * objbillLabProfile .getTestli() .get(i) .getIdTest(), objbillLabProfile
			 * .getIdprofile(), labtestresultmaster_id, todays_date, profilecount });
			 * 
			 * String sqlForproId = "select last_insert_id()"; last_insert_id_pro =
			 * getJdbcTemplate() .queryForInt(sqlForproId); objbillLabProfile .getTestli()
			 * .get(i) .setIdTestResult(last_insert_id_pro); }
			 * arrLabProfile.add(objbillLabProfile); } } } else if
			 * ((test_type.equals("package") || test_type == "package") ||
			 * (test_type.equals("pkg") || test_type == "pkg")) {
			 * 
			 * int packageId = 0; if (referedTo.equals("ipd")) { packageId = (Integer)
			 * rsforBillTest .get("pathologytest_id"); //System.out.println("packageId-----"
			 * + packageId); } else if (referedTo.equals("opd")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); } else if (referedTo.equals("diagnosis")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idlabpkg=?"
			 * ; countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, packageId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labpkg lp  where lp.idlabpkg = ?";
			 * 
			 * List<Map<String, Object>> pkgallDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { packageId });
			 * 
			 * for (Map rsforpkg : pkgallDetails) { LabPkg objbillLabPkg = new LabPkg();
			 * 
			 * objbillLabPkg.setIdlabpkg((Integer) rsforpkg .get("idlabpkg"));
			 * objbillLabPkg.setIdheadings((Integer) rsforpkg .get("idheadings"));
			 * objbillLabPkg.setPkgCharges((Float) rsforpkg .get("pkgCharges"));
			 * 
			 * objbillLabPkg.setPkgName((String) rsforpkg .get("pkgName"));
			 * objbillLabPkg.setPkgStatus((String) rsforpkg .get("pkgStatus"));
			 * objbillLabPkg.setPkgCode((String) rsforpkg .get("pkgCode"));
			 * 
			 * int pkgId = (Integer) rsforpkg.get("idlabpkg"); List<LabProfile>
			 * labbillProfileLi = new ArrayList<LabProfile>(); List<LabTest> arrLabTestBill
			 * = new ArrayList<LabTest>();
			 * 
			 * String sqlforpro = "select * from labpkgprotestcomp where idpkg = ?";
			 * List<Map<String, Object>> pkgprodetails = getJdbcTemplate()
			 * .queryForList(sqlforpro, new Object[] { pkgId });
			 * //System.out.println(pkgprodetails);
			 * 
			 * for (Map resforpro : pkgprodetails) { String testtype = (String) resforpro
			 * .get("typeTP"); if (testtype.equals("P")) { int profileId = (Integer)
			 * resforpro .get("idProTest");
			 * 
			 * sql = "select lp.* from labprofile lp where lp.idprofile=?"; List<Map<String,
			 * Object>> billprofileDetails = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) {
			 * 
			 * LabProfile objbillLabPro = new LabProfile();
			 * 
			 * objbillLabPro .setIdprofile((Integer) rsforTest .get("idprofile"));
			 * objbillLabPro .setIdheadings((Integer) rsforTest .get("idheadings"));
			 * objbillLabPro .setProfileCharges((Float) rsforTest .get("profileCharges"));
			 * objbillLabPro .setProfileName((String) rsforTest .get("profileName"));
			 * objbillLabPro .setProfileStatus((String) rsforTest .get("profileStatus"));
			 * objbillLabPro .setProfileCode((String) rsforTest .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile"); List<LabTest>
			 * arrLabTestPro = new ArrayList<LabTest>();
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList( sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1 .get("idTest");
			 * sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTestforPro = new LabTest();
			 * 
			 * objLabTestforPro .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTestforPro .setIdTest((Integer) rsForpro .get("idTest"));
			 * objLabTestforPro .setTestName((String) rsForpro .get("testName"));
			 * objLabTestforPro .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTestforPro .setTestRate((Float) rsForpro .get("testRate"));
			 * objLabTestforPro .setValueType((String) rsForpro .get("valueType"));
			 * objLabTestforPro .setTestMethodnm((String) rsForpro .get("methodName")); int
			 * idTest = (Integer) rsForpro .get("idTest"); String valueType = (String)
			 * rsForpro .get("valueType"); objLabTestforPro
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType));
			 * objLabTestforPro .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrLabTestPro .add(objLabTestforPro); } objbillLabPro
			 * .setTestli(arrLabTestPro); } System.out .println("pro list size>>>>" +
			 * objbillLabPro .getTestli() .size()); sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_pro_pkg = 0; for (int j = 0; j < objbillLabPro
			 * .getTestli().size(); j++) {
			 * 
			 * getJdbcTemplate() .update(sql, new Object[] { objbillLabPro .getTestli()
			 * .get(j) .getIdTest(), objbillLabPro .getIdprofile(), labtestresultmaster_id,
			 * todays_date, objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForpkgId = "select last_insert_id()"; last_insert_id_pro_pkg =
			 * getJdbcTemplate() .queryForInt( sqlForpkgId); System.out
			 * .println("last_insert_id_pro_pkg>>>>" + last_insert_id_pro_pkg);
			 * objbillLabPro .getTestli() .get(j) .setIdTestResult( last_insert_id_pro_pkg);
			 * }
			 * 
			 * labbillProfileLi.add(objbillLabPro); }
			 * 
			 * } else {
			 * 
			 * int testId = (Integer) resforpro .get("idProTest"); sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { testId }); //System.out.println(labtest);
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult")); objLabTest
			 * .setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode")); objLabTest
			 * .setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_test_pkg = 0; getJdbcTemplate() .update(sql, new
			 * Object[] { objLabTest .getIdTest(), 0, labtestresultmaster_id, todays_date,
			 * objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForTestId = "select last_insert_id()"; last_insert_id_test_pkg =
			 * getJdbcTemplate() .queryForInt(sqlForTestId); System.out
			 * .println("last_insert_id_test_pkg>>>>" + last_insert_id_test_pkg); objLabTest
			 * .setIdTestResult(last_insert_id_test_pkg);
			 * 
			 * arrLabTestBill.add(objLabTest); } } }
			 * objbillLabPkg.setProfileli(labbillProfileLi);
			 * objbillLabPkg.setArrLabTest(arrLabTestBill); arrLabPkg.add(objbillLabPkg); }
			 * } } } }
			 */
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("database error...could not insert: " + e.getMessage());
		}
		arrlist.add(arrLabProfile);
		arrlist.add(arrLabTest1);
		arrlist.add(arrLabPkg);
		return arrlist;
	}

	@Override
	public List fetchLabTestResultOnClick(Integer testmasterId, Integer labReqSlvId, Integer subSerId, Integer tretId,
			String isPackageFlag) {
		String sql = "";
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		String todays_date = dateFormat.format(currentDate.getTime());

		List arrlist = new ArrayList();
		List<LabPkg> arrLabPkg = new ArrayList<LabPkg>();
		List<LabProfile> arrLabProfile = new ArrayList<LabProfile>();
		List<LabTest> arrLabTest1 = new ArrayList<LabTest>();

		try {

			if (isPackageFlag.equalsIgnoreCase("Y")) {// only for Package
				int profilecount = 0;
				// sql = "select distinct(tr.idprofile),lp.* from labtestsresult tr,labprofile
				// lp where lp.idprofile=tr.idprofile and tr.idprofile is not null and
				// tr.idlabpkg is null and tr.idlabTestResultMaster=? and tr.labtestresultStatus
				// = 'Y' ";
				// changed by Laxman for fetch PROFILE in new tables on 02-Feb-2018.
				// sql="select distinct lp . *, elrs.lab_request_id,elrs.lab_req_slv_id,
				// dct.doc_name,elr.posted_datetime from ehat_lab_request
				// elr,ehat_lab_request_slave elrs,labprofile lp,doctor dct where
				// elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id =
				// lp.subservice_id and elrs.ref_doc_id=dct.Doctor_ID and elrs.sub_service_id is
				// not null and elrs.sub_service_id ='"+subSerId+"' and
				// elr.treatment_id='"+tretId+"'";
				sql = "select distinct lp . *, elrs.lab_request_id, elrs.lab_req_slv_id, dct.doc_name, elr.posted_datetime,elrs.service_id as serv_id,ifnull(es.category_name,'-') as pkg_name from ehat_lab_request elr join ehat_lab_request_slave elrs join labprofile lp left join doctor dct on elrs.ref_doc_id = dct.Doctor_ID left join ehat_subservice es ON elrs.package_id = es.id where elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id = lp.subservice_id and elrs.sub_service_id is not null and elrs.package_id = '"
						+ subSerId + "' and elr.treatment_id = '" + tretId
						+ "' and elr.posted_result_flag='Y' and elrs.deleted_flag='N' and elrs.lab_request_id='"
						+ testmasterId + "'";
				Query userDtls = sessionFactory.getCurrentSession().createSQLQuery(sql);
				userDtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> userDetails = userDtls.list();

				/*
				 * List<Map<String, Object>> userDetails = getJdbcTemplate() .queryForList(sql,
				 * new Object[] { testmasterId });
				 */

				for (Map<String, Object> rs : userDetails) {
					List<LabTest> arrLabTest = new ArrayList<LabTest>();
					profilecount++;
					LabProfile objLabProfile = new LabProfile();

					objLabProfile.setIdprofile((Integer) rs.get("idprofile"));
					objLabProfile.setIdheadings((Integer) rs.get("idheadings"));
					objLabProfile.setProfileCharges((Float) rs.get("profileCharges"));

					objLabProfile.setProfileName((String) rs.get("profileName"));
					objLabProfile.setProfileStatus((String) rs.get("profileStatus"));
					objLabProfile.setProfileCode((String) rs.get("profileCode"));
					// Added by Laxman on 31-Jan-2018.
					objLabProfile.setServiceID((Integer) rs.get("serv_id"));
					objLabProfile.setSubServiceID((Integer) rs.get("subservice_id"));
					objLabProfile.setLabRequestId((Integer) rs.get("lab_request_id"));
					objLabProfile.setLabReqSlvId((Integer) rs.get("lab_req_slv_id"));
					objLabProfile.setPkgName((String) rs.get("pkg_name"));
					if (rs.get("doc_name") == null) {
						objLabProfile.setRefDocName("-");
					} else {
						objLabProfile.setRefDocName((String) rs.get("doc_name"));
					}

					objLabProfile.setPostDateTime((Date) rs.get("posted_datetime"));
					int porId = (Integer) rs.get("idprofile");

					// sql = "select tr.*,lt.*,ltm.methodName from labtestresultmaster
					// lrm,labtestsresult tr,labtest lt,labtestmethod ltm where tr.idTest=lt.idTest
					// and ltm.idtestMethod = lt.idtestMethod and
					// lrm.idlabTestResultMaster=tr.idlabTestResultMaster and tr.idlabpkg is null
					// and tr.idprofile=? and tr.idlabTestResultMaster=? and tr.labtestresultStatus
					// = 'Y'";
					/*
					 * =============================================================================
					 * =======
					 */
					sql = "SELECT * FROM labprofiletestcomp where idprofile ='" + porId + "'";

					Query procoQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					procoQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> proco = procoQuery.list();

					/*
					 * List<Map<String, Object>> proco = getJdbcTemplate() .queryForList(sql, new
					 * Object[] { porId});
					 */

					for (Map<String, Object> rs1 : proco) {

						// idTest
						LabTest objLabTest1 = new LabTest();

						int idTest = (Integer) rs1.get("idTest");
						objLabTest1.setIdTest(idTest);

						if (idTest != 0) {
							// Added by Laxman on 01-Feb-2018.Getting test result value,after saving
							// labtestresult in new Table,use new (ehat_lab_result_ table for getting
							// testresult.
							// sql ="select * from labtestsresult where idTest =? and idprofile =? and
							// idlabtestresultmaster =?";
							sql = "select lab_result_id, test_result, narration from ehat_lab_result where test_Id = '"
									+ idTest + "' and service_id= '" + objLabProfile.getServiceID()
									+ "' and sub_service_id= '" + objLabProfile.getSubServiceID()
									+ "' and treatment_id = '" + tretId + "' and lab_request_id = '"
									+ objLabProfile.getLabRequestId() + "' and lab_req_slv_id='"
									+ objLabProfile.getLabReqSlvId() + "'";

							Query testreQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
							testreQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> testre = testreQuery.list();

							/*
							 * List<Map<String, Object>> testre = getJdbcTemplate() .queryForList(sql, new
							 * Object[] { idTest,
							 * objLabProfile.getServiceID(),objLabProfile.getSubServiceID(),tretId,
							 * testmasterId});
							 */

							for (Map<String, Object> t : testre) {

								int labResultPk = (Integer) t.get("lab_result_id");
								String tr = (String) t.get("test_result");
								String noteDetailsForGeneral = (String) t.get("narration");
								System.err.println("trid--->>>>>>" + labResultPk + "   testResult---->>>" + tr);
								objLabTest1.setIdTestResult(labResultPk);
								objLabTest1.setTestResult(tr);
								objLabTest1.setNoteDeatilsForGeneral(noteDetailsForGeneral);

							}

							sql = "select * from labtest where idTest ='" + idTest + "'";
							Query tesQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
							tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> tes = tesQuery.list();

							/*
							 * List<Map<String, Object>> tes = getJdbcTemplate() .queryForList(sql, new
							 * Object[] { idTest});
							 */

							for (Map<String, Object> t : tes) {

								String testName = (String) t.get("testName");
								String testCode = (String) t.get("testCode");
								float testRate = (Float) t.get("testRate");
								String valueType = (String) t.get("valueType");
								int idtestMethod = (Integer) t.get("idtestMethod");

								objLabTest1.setTestName(testName);
								objLabTest1.setTestCode(testCode);
								objLabTest1.setTestRate(testRate);
								objLabTest1.setValueType(valueType);
								objLabTest1.setIdtestMethod(idtestMethod);

								String mq = "select methodName from labtestmethod where idtestmethod = " + idtestMethod;
								String methodName = (String) sessionFactory.getCurrentSession().createSQLQuery(mq)
										.uniqueResult();
								/*
								 * methodNmQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); String
								 * methodName= methodNmQuery.uniqueResult().toString();
								 */

								System.err.println("---->>>>" + methodName);

								/*
								 * String methodName = getJdbcTemplate().queryForObject(mq, String.class);
								 */

								objLabTest1.setTestMethodnm(methodName);

								objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
								objLabTest1.setObjFormula(featchLabFormulaForTest(idTest));

								objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType, tretId,
										objLabTest1.getNormalValuesli()));
								// System.err.println("in
								// profile-----?"+objLabTest1.getNormalValuesli().size());

								arrLabTest.add(objLabTest1);

							}

						} else {

							objLabTest1.setIdTest((Integer) rs1.get("idTest"));
							objLabTest1.setTestName((String) rs1.get("headName"));
							arrLabTest.add(objLabTest1);
						}
					}

					/*
					 * =============================================================================
					 * =======
					 */
					/*
					 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
					 * Object[] { porId, testmasterId });
					 * 
					 * for (Map rs1 : labtest) { LabTest objLabTest = new LabTest();
					 * 
					 * objLabTest.setIdTestResult((Integer) rs1 .get("idresultTests"));
					 * objLabTest.setTestResult((String) rs1.get("testResult"));
					 * objLabTest.setIdTest((Integer) rs1.get("idTest"));
					 * objLabTest.setTestName((String) rs1.get("testName"));
					 * objLabTest.setTestCode((String) rs1.get("testCode"));
					 * objLabTest.setTestRate((Float) rs1.get("testRate"));
					 * objLabTest.setValueType((String) rs1.get("valueType"));
					 * objLabTest.setTestMethodnm((String) rs1.get("methodName")); int idTest =
					 * (Integer) rs1.get("idTest"); String valueType = (String)
					 * rs1.get("valueType"); objLabTest.setNoteDeatilsForGeneral((String) rs1
					 * .get("noteDetailsForGeneral"));
					 * objLabTest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
					 * objLabTest.setObjFormula(featchLabFormulaForTest(idTest));
					 * 
					 * arrLabTest.add(objLabTest); }
					 */
					// objLabProfile.setTestli(arrLabTest);

					arrLabProfile.add(objLabProfile);
				}
				sql = "select lt.*,tr.idresultTests,tr.testResult,ltm.methodName from labtestresultmaster lrm,labtestmethod ltm,labtestsresult tr,labtest lt where tr.idTest=lt.idTest and ltm.idtestMethod = lt.idtestMethod and lrm.idlabTestResultMaster=tr.idlabTestResultMaster and   tr.idprofile is null  and tr.idlabTestResultMaster='"
						+ testmasterId + "' and tr.labtestresultStatus = 'Y' ";

				List<Map<String, Object>> testDetails = null;

				Query testDtlsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				testDtlsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				testDetails = testDtlsQuery.list();

				/*
				 * testDetails = getJdbcTemplate().queryForList(sql, new Object[] { testmasterId
				 * });
				 */

				for (Map<String, Object> rs2 : testDetails) {
					LabTest objLabtest = new LabTest();
					// LabTest objLabTestindi = new LabTest();// new individual.
					objLabtest.setIdTestResult((Integer) rs2.get("idresultTests"));
					objLabtest.setTestResult((String) rs2.get("testResult"));
					objLabtest.setIdTest((Integer) rs2.get("idTest"));
					objLabtest.setTestName((String) rs2.get("testName"));
					objLabtest.setTestCode((String) rs2.get("testCode"));
					objLabtest.setTestRate((Float) rs2.get("testRate"));
					objLabtest.setValueType((String) rs2.get("valueType"));
					objLabtest.setTestMethodnm((String) rs2.get("methodName"));
					int idTest = (Integer) rs2.get("idTest");

					objLabtest.setTestNote((String) rs2.get("testNote"));
					objLabtest.setTestClinicaluse((String) rs2.get("testClinicaluse"));
					objLabtest.setTestIncreasedlevel((String) rs2.get("testIncreasedlevel"));
					objLabtest.setTestInterpretation((String) rs2.get("testInterpretation"));
					objLabtest.setTestComments((String) rs2.get("testComments"));
					String valueType = (String) rs2.get("valueType");
					objLabtest.setIdheadings((Integer) rs2.get("idheadings"));
					objLabtest.setNoteDeatilsForGeneral((String) rs2.get("noteDetailsForGeneral"));

					objLabtest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));

					objLabtest.setObjFormula(featchLabFormulaForTest(idTest));
					objLabtest.setNormalValuesli(
							featchNormalValOfPat(idTest, valueType, tretId, objLabtest.getNormalValuesli()));
					// System.err.println("in profile-----?"+objLabtest.getNormalValuesli().size());

					arrLabTest1.add(objLabtest);

					// arrLabTest1.add(objLabTestindi);
				}
			} else if (isPackageFlag.equalsIgnoreCase("N")) {// only for Profile
				int profilecount = 0;
				// sql = "select distinct(tr.idprofile),lp.* from labtestsresult tr,labprofile
				// lp where lp.idprofile=tr.idprofile and tr.idprofile is not null and
				// tr.idlabpkg is null and tr.idlabTestResultMaster=? and tr.labtestresultStatus
				// = 'Y' ";
				// changed by Laxman for fetch PROFILE in new tables on 02-Feb-2018.
				// sql="select distinct lp . *, elrs.lab_request_id,elrs.lab_req_slv_id,
				// dct.doc_name,elr.posted_datetime from ehat_lab_request
				// elr,ehat_lab_request_slave elrs,labprofile lp,doctor dct where
				// elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id =
				// lp.subservice_id and elrs.ref_doc_id=dct.Doctor_ID and elrs.sub_service_id is
				// not null and elrs.sub_service_id ='"+subSerId+"' and
				// elr.treatment_id='"+tretId+"'";
				sql = "select distinct lp . *, elrs.lab_request_id, elrs.lab_req_slv_id, dct.doc_name, elr.posted_datetime from ehat_lab_request elr join ehat_lab_request_slave elrs join labprofile lp left join doctor dct on elrs.ref_doc_id = dct.Doctor_ID where elr.lab_request_id = elrs.lab_request_id and elrs.sub_service_id = lp.subservice_id and elrs.sub_service_id is not null and elrs.lab_req_slv_id = '"
						+ labReqSlvId + "' and elr.treatment_id = '" + tretId
						+ "' and elr.posted_result_flag='Y' and elrs.deleted_flag='N'";
				Query userDtls = sessionFactory.getCurrentSession().createSQLQuery(sql);
				userDtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> userDetails = userDtls.list();

				/*
				 * List<Map<String, Object>> userDetails = getJdbcTemplate() .queryForList(sql,
				 * new Object[] { testmasterId });
				 */

				for (Map<String, Object> rs : userDetails) {
					List<LabTest> arrLabTest = new ArrayList<LabTest>();
					profilecount++;
					LabProfile objLabProfile = new LabProfile();

					objLabProfile.setIdprofile((Integer) rs.get("idprofile"));
					objLabProfile.setIdheadings((Integer) rs.get("idheadings"));
					objLabProfile.setProfileCharges((Float) rs.get("profileCharges"));

					objLabProfile.setProfileName((String) rs.get("profileName"));
					objLabProfile.setProfileStatus((String) rs.get("profileStatus"));
					objLabProfile.setProfileCode((String) rs.get("profileCode"));
					// Added by Laxman on 31-Jan-2018.
					objLabProfile.setServiceID((Integer) rs.get("service_id"));
					objLabProfile.setSubServiceID((Integer) rs.get("subservice_id"));
					objLabProfile.setLabRequestId((Integer) rs.get("lab_request_id"));
					objLabProfile.setLabReqSlvId((Integer) rs.get("lab_req_slv_id"));
					if (rs.get("doc_name") == null) {
						objLabProfile.setRefDocName("-");
					} else {
						objLabProfile.setRefDocName((String) rs.get("doc_name"));
					}

					objLabProfile.setPostDateTime((Date) rs.get("posted_datetime"));
					int porId = (Integer) rs.get("idprofile");

					// sql = "select tr.*,lt.*,ltm.methodName from labtestresultmaster
					// lrm,labtestsresult tr,labtest lt,labtestmethod ltm where tr.idTest=lt.idTest
					// and ltm.idtestMethod = lt.idtestMethod and
					// lrm.idlabTestResultMaster=tr.idlabTestResultMaster and tr.idlabpkg is null
					// and tr.idprofile=? and tr.idlabTestResultMaster=? and tr.labtestresultStatus
					// = 'Y'";
					/*
					 * =============================================================================
					 * =======
					 */
					sql = "SELECT * FROM labprofiletestcomp where idprofile ='" + porId + "'";

					Query procoQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					procoQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> proco = procoQuery.list();

					/*
					 * List<Map<String, Object>> proco = getJdbcTemplate() .queryForList(sql, new
					 * Object[] { porId});
					 */

					for (Map<String, Object> rs1 : proco) {

						// idTest
						LabTest objLabTest1 = new LabTest();

						int idTest = (Integer) rs1.get("idTest");
						objLabTest1.setIdTest(idTest);

						if (idTest != 0) {
							// Added by Laxman on 01-Feb-2018.Getting test result value,after saving
							// labtestresult in new Table,use new (ehat_lab_result_ table for getting
							// testresult.
							// sql ="select * from labtestsresult where idTest =? and idprofile =? and
							// idlabtestresultmaster =?";
							sql = "select lab_result_id, test_result, narration from ehat_lab_result where test_Id = '"
									+ idTest + "' and service_id= '" + objLabProfile.getServiceID()
									+ "' and sub_service_id= '" + objLabProfile.getSubServiceID()
									+ "' and treatment_id = '" + tretId + "' and lab_request_id = '"
									+ objLabProfile.getLabRequestId() + "' and lab_req_slv_id='"
									+ objLabProfile.getLabReqSlvId() + "'";

							Query testreQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
							testreQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> testre = testreQuery.list();

							/*
							 * List<Map<String, Object>> testre = getJdbcTemplate() .queryForList(sql, new
							 * Object[] { idTest,
							 * objLabProfile.getServiceID(),objLabProfile.getSubServiceID(),tretId,
							 * testmasterId});
							 */

							for (Map<String, Object> t : testre) {

								int labResultPk = (Integer) t.get("lab_result_id");
								String tr = (String) t.get("test_result");
								String noteDetailsForGeneral = (String) t.get("narration");
								System.err.println("trid--->>>>>>" + labResultPk + "   testResult---->>>" + tr);
								objLabTest1.setIdTestResult(labResultPk);
								objLabTest1.setTestResult(tr);
								objLabTest1.setNoteDeatilsForGeneral(noteDetailsForGeneral);

							}

							sql = "select * from labtest where idTest ='" + idTest + "'";
							Query tesQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
							tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> tes = tesQuery.list();

							/*
							 * List<Map<String, Object>> tes = getJdbcTemplate() .queryForList(sql, new
							 * Object[] { idTest});
							 */

							for (Map<String, Object> t : tes) {

								String testName = (String) t.get("testName");
								String testCode = (String) t.get("testCode");
								float testRate = (Float) t.get("testRate");
								String valueType = (String) t.get("valueType");
								int idtestMethod = (Integer) t.get("idtestMethod");

								objLabTest1.setTestName(testName);
								objLabTest1.setTestCode(testCode);
								objLabTest1.setTestRate(testRate);
								objLabTest1.setValueType(valueType);
								objLabTest1.setIdtestMethod(idtestMethod);

								String mq = "select methodName from labtestmethod where idtestmethod = " + idtestMethod;
								String methodName = (String) sessionFactory.getCurrentSession().createSQLQuery(mq)
										.uniqueResult();
								/*
								 * methodNmQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP); String
								 * methodName= methodNmQuery.uniqueResult().toString();
								 */

								System.err.println("---->>>>" + methodName);

								/*
								 * String methodName = getJdbcTemplate().queryForObject(mq, String.class);
								 */

								objLabTest1.setTestMethodnm(methodName);

								objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
								objLabTest1.setObjFormula(featchLabFormulaForTest(idTest));

								objLabTest1.setNormalValuesli(featchNormalValOfPat(idTest, valueType, tretId,
										objLabTest1.getNormalValuesli()));
								// System.err.println("in
								// profile-----?"+objLabTest1.getNormalValuesli().size());

								arrLabTest.add(objLabTest1);

							}

						} else {

							objLabTest1.setIdTest((Integer) rs1.get("idTest"));
							objLabTest1.setTestName((String) rs1.get("headName"));
							arrLabTest.add(objLabTest1);
						}
					}

					/*
					 * =============================================================================
					 * =======
					 */
					/*
					 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
					 * Object[] { porId, testmasterId });
					 * 
					 * for (Map rs1 : labtest) { LabTest objLabTest = new LabTest();
					 * 
					 * objLabTest.setIdTestResult((Integer) rs1 .get("idresultTests"));
					 * objLabTest.setTestResult((String) rs1.get("testResult"));
					 * objLabTest.setIdTest((Integer) rs1.get("idTest"));
					 * objLabTest.setTestName((String) rs1.get("testName"));
					 * objLabTest.setTestCode((String) rs1.get("testCode"));
					 * objLabTest.setTestRate((Float) rs1.get("testRate"));
					 * objLabTest.setValueType((String) rs1.get("valueType"));
					 * objLabTest.setTestMethodnm((String) rs1.get("methodName")); int idTest =
					 * (Integer) rs1.get("idTest"); String valueType = (String)
					 * rs1.get("valueType"); objLabTest.setNoteDeatilsForGeneral((String) rs1
					 * .get("noteDetailsForGeneral"));
					 * objLabTest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));
					 * objLabTest.setObjFormula(featchLabFormulaForTest(idTest));
					 * 
					 * arrLabTest.add(objLabTest); }
					 */
					// objLabProfile.setTestli(arrLabTest);

					arrLabProfile.add(objLabProfile);
				}
				sql = "select lt.*,tr.idresultTests,tr.testResult,ltm.methodName from labtestresultmaster lrm,labtestmethod ltm,labtestsresult tr,labtest lt where tr.idTest=lt.idTest and ltm.idtestMethod = lt.idtestMethod and lrm.idlabTestResultMaster=tr.idlabTestResultMaster and   tr.idprofile is null  and tr.idlabTestResultMaster='"
						+ testmasterId + "' and tr.labtestresultStatus = 'Y' ";

				List<Map<String, Object>> testDetails = null;

				Query testDtlsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				testDtlsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				testDetails = testDtlsQuery.list();

				/*
				 * testDetails = getJdbcTemplate().queryForList(sql, new Object[] { testmasterId
				 * });
				 */

				for (Map<String, Object> rs2 : testDetails) {
					LabTest objLabtest = new LabTest();
					// LabTest objLabTestindi = new LabTest();// new individual.
					objLabtest.setIdTestResult((Integer) rs2.get("idresultTests"));
					objLabtest.setTestResult((String) rs2.get("testResult"));
					objLabtest.setIdTest((Integer) rs2.get("idTest"));
					objLabtest.setTestName((String) rs2.get("testName"));
					objLabtest.setTestCode((String) rs2.get("testCode"));
					objLabtest.setTestRate((Float) rs2.get("testRate"));
					objLabtest.setValueType((String) rs2.get("valueType"));
					objLabtest.setTestMethodnm((String) rs2.get("methodName"));
					int idTest = (Integer) rs2.get("idTest");

					objLabtest.setTestNote((String) rs2.get("testNote"));
					objLabtest.setTestClinicaluse((String) rs2.get("testClinicaluse"));
					objLabtest.setTestIncreasedlevel((String) rs2.get("testIncreasedlevel"));
					objLabtest.setTestInterpretation((String) rs2.get("testInterpretation"));
					objLabtest.setTestComments((String) rs2.get("testComments"));
					String valueType = (String) rs2.get("valueType");
					objLabtest.setIdheadings((Integer) rs2.get("idheadings"));
					objLabtest.setNoteDeatilsForGeneral((String) rs2.get("noteDetailsForGeneral"));

					objLabtest.setNormalValuesli(featchNormalValOfPat(idTest, valueType));

					objLabtest.setObjFormula(featchLabFormulaForTest(idTest));
					objLabtest.setNormalValuesli(
							featchNormalValOfPat(idTest, valueType, tretId, objLabtest.getNormalValuesli()));
					// System.err.println("in profile-----?"+objLabtest.getNormalValuesli().size());

					arrLabTest1.add(objLabtest);

					// arrLabTest1.add(objLabTestindi);
				}
			}
			// System.out.println("tretId" + tretId);
			// commented on 30-Jan-20188.
			/*
			 * String sqlforpat = "select referedTo from treatment where Treatment_ID = " +
			 * tretId; String referedTo = getJdbcTemplate().queryForObject(sqlforpat,
			 * String.class); String sqlforbiil = ""; int bill_id = 0; if
			 * (referedTo.equals("ipd")) { sqlforbiil =
			 * "select bill_id from bill_master where Treatment_ID = " + tretId; bill_id =
			 * getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else if
			 * (referedTo.equals("opd")) { sqlforbiil =
			 * "select bill_id from bill_master_opd where Treatment_ID = " + tretId; bill_id
			 * = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); } else { sqlforbiil =
			 * "select bill_id from bill_master_diagnosis where Treatment_ID = " + tretId;
			 * bill_id = getJdbcTemplate().queryForInt(sqlforbiil);
			 * //System.out.println("bill_id-----" + bill_id); }
			 * 
			 * int count = 0; if (referedTo.equals("ipd")) { sql =
			 * "select count(*) from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("opd")) { sql =
			 * "select count(*) from opd_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); } else if
			 * (referedTo.equals("diagnosis")) { sql =
			 * "select count(*) from diagnosis_billing where test_type = 'pathology' and id_treatment = "
			 * + tretId; count = getJdbcTemplate().queryForInt(sql); }
			 */

			// @ModifiedBy:Touheed @ModifiedDate :17-Mar-2016 //kavita forget Why she write
			// this code here if she remember then will change the code

			/*
			 * int labtestresultmaster_id = 0; String sqlforlab =
			 * "select idlabtestresultmaster from labtestresultmaster where Treatment_ID = "
			 * + tretId; labtestresultmaster_id = getJdbcTemplate().queryForInt(sqlforlab);
			 * System.out.println("idlabtestresultmaster----" + labtestresultmaster_id);
			 * 
			 * int id_master = 0; List<Map<String, Object>> billListDetails = null; if
			 * (count > 0) { if (referedTo.equals("ipd")) { sql =
			 * "select idipdbill_pathologytest_master from ipdbill_pathologytest_master where ipdBill_master_id = "
			 * + bill_id; id_master = getJdbcTemplate().queryForInt(sql);
			 * 
			 * sql =
			 * "select * from ipdbill_pathologytest_slave where idipdbill_pathologytest_master = ? and labresult_flag = 'Y'"
			 * ;
			 * 
			 * billListDetails = getJdbcTemplate().queryForList(sql, new Object[] {
			 * id_master }); } else if (referedTo.equals("opd")) { sql =
			 * "select * from opd_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } else if (referedTo.equals("diagnosis")) { sql =
			 * "select * from diagnosis_billing where test_type = 'pathology' and id_treatment = ?"
			 * ; billListDetails = getJdbcTemplate().queryForList(sql, new Object[] { tretId
			 * }); } String test_type = ""; for (Map rsforBillTest : billListDetails) { if
			 * (referedTo.equals("ipd")) { test_type = (String) rsforBillTest
			 * .get("pathologytest_type"); } else if (referedTo.equals("opd")) { test_type =
			 * (String) rsforBillTest.get("msg"); } else if (referedTo.equals("diagnosis"))
			 * { test_type = (String) rsforBillTest.get("msg"); }
			 * 
			 * //System.out.println("test_type-----" + test_type);
			 * 
			 * if ((test_type.equals("test") || test_type == "test") ||
			 * (test_type.equals("t") || test_type == "t")) { int testId = 0;
			 * 
			 * if (referedTo.equals("ipd")) { testId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("opd")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * else if (referedTo.equals("diagnosis")) { testId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("testId-----" + testId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idTest=? and idprofile is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate() .queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, testId }); if (countForPesent == 0) { sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ; List<Map<String, Object>> testDetailsBill = null;
			 * 
			 * testDetailsBill = getJdbcTemplate().queryForList( sql, new Object[] { testId
			 * });
			 * 
			 * for (Map rsforTest : testDetailsBill) { LabTest objLabtest = new LabTest();
			 * objLabtest.setTestResult((String) rsforTest .get("testResult"));
			 * objLabtest.setIdTest((Integer) rsforTest .get("idTest"));
			 * objLabtest.setTestName((String) rsforTest .get("testName"));
			 * objLabtest.setTestCode((String) rsforTest .get("testCode"));
			 * objLabtest.setTestRate((Float) rsforTest .get("testRate"));
			 * objLabtest.setValueType((String) rsforTest .get("valueType"));
			 * objLabtest.setTestMethodnm((String) rsforTest .get("methodName"));
			 * objLabtest.setTestNote((String) rsforTest .get("testNote")); objLabtest
			 * .setTestClinicaluse((String) rsforTest .get("testClinicaluse")); objLabtest
			 * .setTestIncreasedlevel((String) rsforTest .get("testIncreasedlevel"));
			 * objLabtest .setTestInterpretation((String) rsforTest
			 * .get("testInterpretation")); objLabtest.setTestComments((String) rsforTest
			 * .get("testComments"));
			 * 
			 * int idTest = (Integer) rsforTest.get("idTest"); String valueType = (String)
			 * rsforTest .get("valueType"); objLabtest
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType)); objLabtest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest,idlabTestResultMaster,assignDate) VALUES (?,?,?)"
			 * ; getJdbcTemplate().update( sql, new Object[] { testId,
			 * labtestresultmaster_id, todays_date }); int last_insert_id = 0; String
			 * sqlForId = "select last_insert_id()"; last_insert_id =
			 * getJdbcTemplate().queryForInt( sqlForId);
			 * System.out.println("last_insert_id test_id>>>>" + last_insert_id);
			 * objLabtest.setIdTestResult(last_insert_id); arrLabTest1.add(objLabtest); } }
			 * } else if ((test_type.equals("profile") || test_type == "profile") ||
			 * (test_type.equals("pro") || test_type == "pro")) { int profileId = 0; if
			 * (referedTo.equals("ipd")) { profileId = (Integer) rsforBillTest
			 * .get("pathologytest_id"); //System.out.println("profileId-----" + profileId);
			 * } else if (referedTo.equals("opd")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); } else if (referedTo.equals("diagnosis")) { profileId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("profileId-----" +
			 * profileId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idprofile=? and idlabpkg is null and labtestresultStatus = 'Y' "
			 * ;
			 * 
			 * countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[] {
			 * labtestresultmaster_id, profileId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labprofile lp where lp.idprofile=?";
			 * 
			 * List<Map<String, Object>> billprofileDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) { List<LabTest> arrbillLabTest = new
			 * ArrayList<LabTest>(); profilecount++; LabProfile objbillLabProfile = new
			 * LabProfile(); objbillLabProfile .setIdprofile((Integer) rsforTest
			 * .get("idprofile")); objbillLabProfile .setIdheadings((Integer) rsforTest
			 * .get("idheadings")); objbillLabProfile .setProfileCharges((Float) rsforTest
			 * .get("profileCharges")); objbillLabProfile .setProfileName((String) rsforTest
			 * .get("profileName")); objbillLabProfile .setProfileStatus((String) rsforTest
			 * .get("profileStatus")); objbillLabProfile .setProfileCode((String) rsforTest
			 * .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile");
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList(sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1.get("idTest"); sql
			 * =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTest.setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTest.setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrbillLabTest.add(objLabTest);
			 * 
			 * } objbillLabProfile.setTestli(arrbillLabTest); }
			 * 
			 * System.out.println("profilecount>>>>" + profilecount); int last_insert_id_pro
			 * = 0; sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,profilecount) VALUES (?,?,?,?,?)"
			 * ; int ProCntForInsert = 0; for (int i = 0; i < objbillLabProfile
			 * .getTestli().size(); i++) { getJdbcTemplate() .update(sql, new Object[] {
			 * objbillLabProfile .getTestli() .get(i) .getIdTest(), objbillLabProfile
			 * .getIdprofile(), labtestresultmaster_id, todays_date, profilecount });
			 * 
			 * String sqlForproId = "select last_insert_id()"; last_insert_id_pro =
			 * getJdbcTemplate() .queryForInt(sqlForproId); objbillLabProfile .getTestli()
			 * .get(i) .setIdTestResult(last_insert_id_pro); }
			 * arrLabProfile.add(objbillLabProfile); } } } else if
			 * ((test_type.equals("package") || test_type == "package") ||
			 * (test_type.equals("pkg") || test_type == "pkg")) {
			 * 
			 * int packageId = 0; if (referedTo.equals("ipd")) { packageId = (Integer)
			 * rsforBillTest .get("pathologytest_id"); //System.out.println("packageId-----"
			 * + packageId); } else if (referedTo.equals("opd")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); } else if (referedTo.equals("diagnosis")) { packageId = (Integer)
			 * rsforBillTest.get("id_test"); //System.out.println("packageId-----" +
			 * packageId); }
			 * 
			 * int countForPesent = 0; String sqlforPresent =
			 * "select count(*) from labtestsresult where idlabTestResultMaster = ? and idlabpkg=?"
			 * ; countForPesent = getJdbcTemplate().queryForInt( sqlforPresent, new Object[]
			 * { labtestresultmaster_id, packageId }); if (countForPesent == 0) { sql =
			 * "select lp.* from labpkg lp  where lp.idlabpkg = ?";
			 * 
			 * List<Map<String, Object>> pkgallDetails = getJdbcTemplate()
			 * .queryForList(sql, new Object[] { packageId });
			 * 
			 * for (Map rsforpkg : pkgallDetails) { LabPkg objbillLabPkg = new LabPkg();
			 * 
			 * objbillLabPkg.setIdlabpkg((Integer) rsforpkg .get("idlabpkg"));
			 * objbillLabPkg.setIdheadings((Integer) rsforpkg .get("idheadings"));
			 * objbillLabPkg.setPkgCharges((Float) rsforpkg .get("pkgCharges"));
			 * 
			 * objbillLabPkg.setPkgName((String) rsforpkg .get("pkgName"));
			 * objbillLabPkg.setPkgStatus((String) rsforpkg .get("pkgStatus"));
			 * objbillLabPkg.setPkgCode((String) rsforpkg .get("pkgCode"));
			 * 
			 * int pkgId = (Integer) rsforpkg.get("idlabpkg"); List<LabProfile>
			 * labbillProfileLi = new ArrayList<LabProfile>(); List<LabTest> arrLabTestBill
			 * = new ArrayList<LabTest>();
			 * 
			 * String sqlforpro = "select * from labpkgprotestcomp where idpkg = ?";
			 * List<Map<String, Object>> pkgprodetails = getJdbcTemplate()
			 * .queryForList(sqlforpro, new Object[] { pkgId });
			 * //System.out.println(pkgprodetails);
			 * 
			 * for (Map resforpro : pkgprodetails) { String testtype = (String) resforpro
			 * .get("typeTP"); if (testtype.equals("P")) { int profileId = (Integer)
			 * resforpro .get("idProTest");
			 * 
			 * sql = "select lp.* from labprofile lp where lp.idprofile=?"; List<Map<String,
			 * Object>> billprofileDetails = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { profileId });
			 * 
			 * for (Map rsforTest : billprofileDetails) {
			 * 
			 * LabProfile objbillLabPro = new LabProfile();
			 * 
			 * objbillLabPro .setIdprofile((Integer) rsforTest .get("idprofile"));
			 * objbillLabPro .setIdheadings((Integer) rsforTest .get("idheadings"));
			 * objbillLabPro .setProfileCharges((Float) rsforTest .get("profileCharges"));
			 * objbillLabPro .setProfileName((String) rsforTest .get("profileName"));
			 * objbillLabPro .setProfileStatus((String) rsforTest .get("profileStatus"));
			 * objbillLabPro .setProfileCode((String) rsforTest .get("profileCode"));
			 * 
			 * int porId = (Integer) rsforTest .get("idprofile"); List<LabTest>
			 * arrLabTestPro = new ArrayList<LabTest>();
			 * 
			 * String sqlforportest =
			 * "select * from labprofiletestcomp where idprofile = ?"; List<Map<String,
			 * Object>> labprotest = getJdbcTemplate() .queryForList( sqlforportest, new
			 * Object[] { porId });
			 * 
			 * for (Map rs1 : labprotest) { int protestId = (Integer) rs1 .get("idTest");
			 * sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList( sql, new
			 * Object[] { protestId });
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTestforPro = new LabTest();
			 * 
			 * objLabTestforPro .setTestResult((String) rsForpro .get("testResult"));
			 * objLabTestforPro .setIdTest((Integer) rsForpro .get("idTest"));
			 * objLabTestforPro .setTestName((String) rsForpro .get("testName"));
			 * objLabTestforPro .setTestCode((String) rsForpro .get("testCode"));
			 * objLabTestforPro .setTestRate((Float) rsForpro .get("testRate"));
			 * objLabTestforPro .setValueType((String) rsForpro .get("valueType"));
			 * objLabTestforPro .setTestMethodnm((String) rsForpro .get("methodName")); int
			 * idTest = (Integer) rsForpro .get("idTest"); String valueType = (String)
			 * rsForpro .get("valueType"); objLabTestforPro
			 * .setNormalValuesli(featchNormalValOfPat( idTest, valueType));
			 * objLabTestforPro .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * arrLabTestPro .add(objLabTestforPro); } objbillLabPro
			 * .setTestli(arrLabTestPro); } System.out .println("pro list size>>>>" +
			 * objbillLabPro .getTestli() .size()); sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_pro_pkg = 0; for (int j = 0; j < objbillLabPro
			 * .getTestli().size(); j++) {
			 * 
			 * getJdbcTemplate() .update(sql, new Object[] { objbillLabPro .getTestli()
			 * .get(j) .getIdTest(), objbillLabPro .getIdprofile(), labtestresultmaster_id,
			 * todays_date, objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForpkgId = "select last_insert_id()"; last_insert_id_pro_pkg =
			 * getJdbcTemplate() .queryForInt( sqlForpkgId); System.out
			 * .println("last_insert_id_pro_pkg>>>>" + last_insert_id_pro_pkg);
			 * objbillLabPro .getTestli() .get(j) .setIdTestResult( last_insert_id_pro_pkg);
			 * }
			 * 
			 * labbillProfileLi.add(objbillLabPro); }
			 * 
			 * } else {
			 * 
			 * int testId = (Integer) resforpro .get("idProTest"); sql =
			 * "select lt.*, ltm.methodName from labtestmethod ltm, labtest lt where lt.idTest = ? and ltm.idtestMethod = lt.idtestMethod"
			 * ;
			 * 
			 * List<Map<String, Object>> labtest = getJdbcTemplate() .queryForList(sql, new
			 * Object[] { testId }); //System.out.println(labtest);
			 * 
			 * for (Map rsForpro : labtest) { LabTest objLabTest = new LabTest();
			 * 
			 * objLabTest .setTestResult((String) rsForpro .get("testResult")); objLabTest
			 * .setIdTest((Integer) rsForpro .get("idTest")); objLabTest
			 * .setTestName((String) rsForpro .get("testName")); objLabTest
			 * .setTestCode((String) rsForpro .get("testCode")); objLabTest
			 * .setTestRate((Float) rsForpro .get("testRate")); objLabTest
			 * .setValueType((String) rsForpro .get("valueType")); objLabTest
			 * .setTestMethodnm((String) rsForpro .get("methodName")); int idTest =
			 * (Integer) rsForpro .get("idTest"); String valueType = (String) rsForpro
			 * .get("valueType"); objLabTest .setNormalValuesli(featchNormalValOfPat(
			 * idTest, valueType)); objLabTest
			 * .setObjFormula(featchLabFormulaForTest(idTest));
			 * 
			 * sql =
			 * "INSERT into labtestsresult (idTest, idprofile,idlabTestResultMaster,assignDate,idlabpkg) VALUES (?,?,?,?,?)"
			 * ; int last_insert_id_test_pkg = 0; getJdbcTemplate() .update(sql, new
			 * Object[] { objLabTest .getIdTest(), 0, labtestresultmaster_id, todays_date,
			 * objbillLabPkg .getIdlabpkg() });
			 * 
			 * String sqlForTestId = "select last_insert_id()"; last_insert_id_test_pkg =
			 * getJdbcTemplate() .queryForInt(sqlForTestId); System.out
			 * .println("last_insert_id_test_pkg>>>>" + last_insert_id_test_pkg); objLabTest
			 * .setIdTestResult(last_insert_id_test_pkg);
			 * 
			 * arrLabTestBill.add(objLabTest); } } }
			 * objbillLabPkg.setProfileli(labbillProfileLi);
			 * objbillLabPkg.setArrLabTest(arrLabTestBill); arrLabPkg.add(objbillLabPkg); }
			 * } } } }
			 */
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("database error...could not insert: " + e.getMessage());
		}
		arrlist.add(arrLabProfile);
		arrlist.add(arrLabTest1);
		arrlist.add(arrLabPkg);
		return arrlist;
	}

	@Override
	public int deleteom(String opId, String callform, HttpServletRequest request) {

		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			if (callform.equalsIgnoreCase("OTP")) {
				OperationMaster TPercentageDTO = new OperationMaster();
				TPercentageDTO = (OperationMaster) sessionFactory.getCurrentSession().get(OperationMaster.class,
						Integer.parseInt(opId));

				TPercentageDTO.setDelete("Y");
				TPercentageDTO.setUpdatedBy(userId);
				TPercentageDTO.setUpdatedDateTime((new Date(new java.util.Date().getTime())));

			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	@Override
	public List<EhatComplaintFindingDto> fetchComplaintFinding(Integer pId, Integer treatId, Integer emrId,
			HttpServletRequest request) {
		List<EhatComplaintFindingDto> objQue = new ArrayList<EhatComplaintFindingDto>();
		try {

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(EhatComplaintFindingDto.class);
			criteria.add(Restrictions.eq("patientId", pId));
			criteria.add(Restrictions.eq("treatmentId", treatId));
			criteria.add(Restrictions.eq("status", "N"));
			objQue = criteria.list();
		}

		catch (Exception e) {
			System.out.println("database error...could not fetched: " + e.getMessage());
			e.printStackTrace();
		}
		return objQue;
	}

	/**
	 * @author Tushar @date 8_March-2018 these methods are used to map request with
	 *         services ffor(questionDto objDto : ltSlaveDetails) {
	 *         QuestionOptionMasterDto qsnSlave=new QuestionOptionMasterDto();
	 *         qsnSlave.setOptionName(obj.getOptionName());
	 *         qsnSlave.setQuestionMasterId(obj.getQuestionMasterId());
	 *         qsnSlave.setQsnOptionId(obj.getQsnOptionId());
	 * 
	 *         ltSlaveDetails1.add(qsnSlave);
	 * 
	 *         }or Getting SubObjTemplate Details Speciality wise
	 **/
	@Override
	public SubObjTemplateDto fetchSubObjTemplate(Integer bodyPart, Integer speciality, HttpServletRequest request) {
		SubObjTemplateDto obj = new SubObjTemplateDto();
		List<SubObjTemplateDto> ltSubObjTemplates = null;
		try {
			if (bodyPart != 0) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SubObjTemplateDto.class);
				criteria.add(Restrictions.eq("bodyPart", bodyPart));
				criteria.add(Restrictions.eq("speciality", speciality));
				criteria.add(Restrictions.eq("status", "Y"));
				ltSubObjTemplates = criteria.list();
			} else {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SubObjTemplateDto.class);
				// criteria.add(Restrictions.eq("bodyPart", bodyPart));
				criteria.add(Restrictions.eq("speciality", speciality));
				criteria.add(Restrictions.eq("status", "Y"));
				ltSubObjTemplates = criteria.list();

			}

			obj.setLstSubObjTemplate(ltSubObjTemplates);

		} catch (Exception e) {
			e.printStackTrace();
			return obj;
		}
		return obj;
	}

	@Override
	public int OpdCpoeSendToLab(BillDetailsDto billDetailsDto, String subList, HttpServletRequest request) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String) resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String) resourceBundleEhat.getString("packageID");
		String LabMachineFlow = (String) resourceBundleEhat.getString("LabMachineFlow");

		int packageID = Integer.parseInt(pkgID);// 13
		int serviceId = Integer.parseInt(sid);// 11
		String currentRec = (String) resourceBundleEhat.getString("currentRec");
		List<EhatOtherBillDetailForOpdDto> listOpdSubSerId = null;
		// getting patient object
		// RegistrationDto patientPojo = (RegistrationDto)
		// sessionFactory.getCurrentSession().get(RegistrationDto.class,
		// billDetailsDto.getPatienttId());

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		int labReqId = 0;
		Calendar calendar = Calendar.getInstance();
		// Getting object of LabRequestDTO to genereate requivision number
		LabRequestDTO labReq = new LabRequestDTO();
		// setting values
		labReq.setInsertedBy(userId);
		labReq.setInsertedDatetime(calendar);
		labReq.setDeptId(billDetailsDto.getDepartmentId());
		labReq.setPatientId(billDetailsDto.getPatienttId());
		labReq.setTreatmentId(billDetailsDto.getTreatmentId());
		labReq.setUnitId(unitId);
		// Added by Laxman for test_status.
		labReq.setTestStatus(currentRec);

		// Jsong string formate subList variable
		LabSlavePojo labSlvpo = (LabSlavePojo) ConfigUIJSONUtility.getObjectFromJSON(subList, LabSlavePojo.class);
		LabSlavePojo lpojo = labSlvpo.getSubSrvList().get(0);

		Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
		criteriaMax.setProjection(Projections.max("billDetailsId"));
		criteriaMax.add(Restrictions.eq("billId", billDetailsDto.getBillId()));
		Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();
		// if service id equal to service id configured in porperties then it will send
		// to lab

		if (lpojo.getServiceId() == serviceId) {// for profile under pathology only
			// Saving LabRequest pojo
			labReqId = (Integer) sessionFactory.getCurrentSession().save(labReq);

			String code = (String) sessionFactory.getCurrentSession()
					.createSQLQuery(
							"SELECT ifnull(code_name,'-') FROM ehat_subservice where id='" + lpojo.getSubSrvid() + "'")
					.uniqueResult();

			LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
			labReqtSlv.setLabRequestId(labReqId);
			labReqtSlv.setBillDetailsID(maxBillDetailsId);
			labReqtSlv.setServiceId(lpojo.getServiceId());
			labReqtSlv.setSubServiceId(lpojo.getSubSrvid());
			labReqtSlv.setLabTestCode(code);
			labReqtSlv.setRefDocId(lpojo.getRefDocId());
			labReqtSlv.setDeptId(billDetailsDto.getDepartmentId());
			// Insert value in lab slave
			int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
			labReqtSlv.setLabReqSlvId(labReqslvid);

			if (LabMachineFlow.equalsIgnoreCase("on")) {
				// Call saveLabTestData().
				int res = saveLabTestData(labReq, labReqtSlv, labReqId, labReqslvid);
				if (res == 0) {
					return -4;
				}
			}
		} // if end service id check
		else if (lpojo.getServiceId() == packageID) {// for profile under package only
			// Saving LabRequest pojo
			labReqId = (Integer) sessionFactory.getCurrentSession().save(labReq);

			try {
				Criteria criteriaSubSerId = sessionFactory.getCurrentSession()
						.createCriteria(EhatOtherBillDetailForOpdDto.class);
				criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
				criteriaSubSerId.add(Restrictions.eq("subServiceId", lpojo.getSubSrvid()));
				criteriaSubSerId.add(Restrictions.eq("childServiceId", serviceId));
				criteriaSubSerId.add(Restrictions.eq("treatmentId", billDetailsDto.getTreatmentId()));
				criteriaSubSerId.add(Restrictions.eq("billDetailsId", maxBillDetailsId));
				criteriaSubSerId.add(Restrictions.eq("departmentId", billDetailsDto.getDepartmentId()));
				criteriaSubSerId.add(Restrictions.eq("cancle", "N"));
				criteriaSubSerId.add(Restrictions.eq("deleted", "N"));

				listOpdSubSerId = criteriaSubSerId.list();

				for (EhatOtherBillDetailForOpdDto objOthOpd : listOpdSubSerId) {
					String code = (String) sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id='"
									+ objOthOpd.getChildSubServiceId() + "'")
							.uniqueResult();

					LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
					labReqtSlv.setLabRequestId(labReqId);
					labReqtSlv.setBillDetailsID(maxBillDetailsId);
					labReqtSlv.setServiceId(objOthOpd.getServiceId());
					labReqtSlv.setSubServiceId(objOthOpd.getChildSubServiceId());
					labReqtSlv.setLabTestCode(code);
					labReqtSlv.setRefDocId(objOthOpd.getDoctorId());
					labReqtSlv.setPackageId(lpojo.getSubSrvid());
					labReqtSlv.setIsPackageFlag("Y");
					labReqtSlv.setDeptId(objOthOpd.getDepartmentId());
					// Insert value in lab slave
					int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
					labReqtSlv.setLabReqSlvId(labReqslvid);

					if (LabMachineFlow.equalsIgnoreCase("on")) {
						// Call saveLabTestData().
						int res = saveLabTestData(labReq, labReqtSlv, labReqId, labReqslvid);
						if (res == 0) {
							return -4;
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return labReqId;
	}

	@Override
	public int IpdCpoeSendToLab(BillDetailsIpdDto billDetailsIpdDto, String subList, HttpServletRequest request) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String) resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String) resourceBundleEhat.getString("packageID");
		String LabMachineFlow = (String) resourceBundleEhat.getString("LabMachineFlow");

		int packageID = Integer.parseInt(pkgID);
		int serviceId = Integer.parseInt(sid);
		String currentRec = (String) resourceBundleEhat.getString("currentRec");
		List<EhatOtherBillDetailForIpdDto> listIpdSubSerId = null;
		// getting patient object
		// RegistrationDto patientPojo = (RegistrationDto)
		// sessionFactory.getCurrentSession().get(RegistrationDto.class,
		// billDetailsDto.getPatienttId());

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		Calendar calendar = Calendar.getInstance();
		// Getting object of LabRequestDTO to genereate requivision number
		LabRequestDTO labReq = new LabRequestDTO();
		// setting values
		labReq.setInsertedBy(userId);
		labReq.setInsertedDatetime(calendar);
		labReq.setDeptId(billDetailsIpdDto.getDepartmentId());
		labReq.setPatientId(billDetailsIpdDto.getPatienttId());
		labReq.setTreatmentId(billDetailsIpdDto.getTreatmentId());
		labReq.setUnitId(unitId);
		// Added by Laxman for test_status.
		labReq.setTestStatus(currentRec);

		// Saving LabRequest pojo
		int labReqId = (Integer) sessionFactory.getCurrentSession().save(labReq);
		// Jsong string formate subList variable
		LabSlavePojo labSlvpo = (LabSlavePojo) ConfigUIJSONUtility.getObjectFromJSON(subList, LabSlavePojo.class);
		LabSlavePojo lpojo = labSlvpo.getSubSrvList().get(0);

		Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
		criteriaMax.setProjection(Projections.max("billDetailsId"));
		criteriaMax.add(Restrictions.eq("billId", billDetailsIpdDto.getBillId()));
		Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();
		// if service id equal to service id configured in porperties then it will send
		// to lab
		if (lpojo.getServiceId() == serviceId) {
			// Dynamically getting coulmn value of any perticular pojo

			String code = (String) sessionFactory.getCurrentSession()
					.createSQLQuery(
							"SELECT ifnull(code_name,'-') FROM ehat_subservice where id='" + lpojo.getSubSrvid() + "'")
					.uniqueResult();

			LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
			labReqtSlv.setLabRequestId(labReqId);
			labReqtSlv.setBillDetailsID(maxBillDetailsId);
			labReqtSlv.setServiceId(lpojo.getServiceId());
			labReqtSlv.setSubServiceId(lpojo.getSubSrvid());
			labReqtSlv.setLabTestCode(code);
			labReqtSlv.setRefDocId(lpojo.getRefDocId());
			labReqtSlv.setDeptId(billDetailsIpdDto.getDepartmentId());
			// Insert value in lab slave
			int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
			labReqtSlv.setLabReqSlvId(labReqslvid);

			if (LabMachineFlow.equalsIgnoreCase("on")) {
				// Call saveLabTestData().
				int res = saveLabTestData(labReq, labReqtSlv, labReqId, labReqslvid);
				if (res == 0) {
					return -4;
				}
			}
		} // if end service id check
		else if (lpojo.getServiceId() == packageID) {// Added by Laxman for Packages.
			try {
				Criteria criteriaSubSerId = sessionFactory.getCurrentSession()
						.createCriteria(EhatOtherBillDetailForIpdDto.class);
				criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
				criteriaSubSerId.add(Restrictions.eq("subServiceId", lpojo.getSubSrvid()));
				criteriaSubSerId.add(Restrictions.eq("childServiceId", serviceId));
				criteriaSubSerId.add(Restrictions.eq("treatmentId", billDetailsIpdDto.getTreatmentId()));
				criteriaSubSerId.add(Restrictions.eq("billDetailsId", maxBillDetailsId));
				criteriaSubSerId.add(Restrictions.eq("departmentId", billDetailsIpdDto.getDepartmentId()));
				criteriaSubSerId.add(Restrictions.eq("cancle", "N"));
				criteriaSubSerId.add(Restrictions.eq("deleted", "N"));

				listIpdSubSerId = criteriaSubSerId.list();

				for (EhatOtherBillDetailForIpdDto objOthIpd : listIpdSubSerId) {
					// set profile/subserviceId to Labslavepojo.
					String code = (String) sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id='"
									+ objOthIpd.getChildSubServiceId() + "'")
							.uniqueResult();

					LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
					labReqtSlv.setLabRequestId(labReqId);
					labReqtSlv.setBillDetailsID(maxBillDetailsId);
					labReqtSlv.setServiceId(lpojo.getServiceId());
					labReqtSlv.setSubServiceId(objOthIpd.getChildSubServiceId());
					labReqtSlv.setLabTestCode(code);
					labReqtSlv.setRefDocId(objOthIpd.getDoctorId());
					labReqtSlv.setPackageId(lpojo.getSubSrvid());
					labReqtSlv.setIsPackageFlag("Y");
					labReqtSlv.setDeptId(objOthIpd.getDepartmentId());
					// Insert value in lab slave
					int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
					labReqtSlv.setLabReqSlvId(labReqslvid);

					if (LabMachineFlow.equalsIgnoreCase("on")) {
						// Call saveLabTestData().
						int res = saveLabTestData(labReq, labReqtSlv, labReqId, labReqslvid);
						if (res == 0) {
							return -4;
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return labReqId;
	}

	@Override
	public int cancelLabTest(String billDetId, String cancleType, Integer deptId, HttpServletRequest request) {

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

					Criteria criteriaSubSerId = sessionFactory.getCurrentSession()
							.createCriteria(LabRequestSlaveDTO.class);
					criteriaSubSerId.add(Restrictions.eq("billDetailsID", Integer.parseInt(billDetailsId.trim())));
					criteriaSubSerId.add(Restrictions.eq("deptId", deptId));
					listSerId = criteriaSubSerId.list();
					if (listSerId.size() != 0) {
						for (LabRequestSlaveDTO labSlvObj : listSerId) {
							Criteria criteriasmplFlg = sessionFactory.getCurrentSession()
									.createCriteria(LabRequestDTO.class);
							criteriasmplFlg.add(Restrictions.eq("labRequestId", labSlvObj.getLabRequestId()));
							criteriasmplFlg.setProjection(Projections.projectionList()
									.add(Projections.property("smplColletFlag"), "smplColletFlag"));
							criteriasmplFlg.setResultTransformer(Transformers.aliasToBean(LabRequestDTO.class));
							listsmplColFlg = criteriasmplFlg.list();

							for (LabRequestDTO labObj : listsmplColFlg) {
								if (labObj.getSmplColletFlag() == 'N') {
									labRequestSlaveDTO = (LabRequestSlaveDTO) sessionFactory.getCurrentSession()
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
	public int IpdBillSendToLab(BillDetailsIpdDto billDetailsIpdDto, HttpServletRequest request) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String) resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String) resourceBundleEhat.getString("packageID");
		String LabMachineFlow = (String) resourceBundleEhat.getString("LabMachineFlow");

		int packageID = Integer.parseInt(pkgID);
		int serviceId = Integer.parseInt(sid);
		String currentRec = (String) resourceBundleEhat.getString("currentRec");
		List<ConfigurServicesDto> listSubSerId = null;
		List<EhatOtherBillDetailForIpdDto> listIpdSubSerId = null;
		// getting patient object
		// RegistrationDto patientPojo = (RegistrationDto)
		// sessionFactory.getCurrentSession().get(RegistrationDto.class,
		// billDetailsDto.getPatienttId());

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		Calendar calendar = Calendar.getInstance();
		// Getting object of LabRequestDTO to genereate requivision number
		LabRequestDTO labReq = new LabRequestDTO();
		// setting values
		labReq.setInsertedBy(userId);
		labReq.setInsertedDatetime(calendar);
		labReq.setDeptId(billDetailsIpdDto.getDepartmentId());
		labReq.setPatientId(billDetailsIpdDto.getPatienttId());
		labReq.setTreatmentId(billDetailsIpdDto.getTreatmentId());
		labReq.setUnitId(unitId);
		// Added by Laxman for test_status.
		labReq.setTestStatus(currentRec);

		// Saving LabRequest pojo
		int labReqId = (Integer) sessionFactory.getCurrentSession().save(labReq);
		// Jsong string formate subList variable
		// LabSlavePojo labSlvpo = (LabSlavePojo)
		// ConfigUIJSONUtility.getObjectFromJSON(subList,LabSlavePojo.class);
		// LabSlavePojo lpojo = labSlvpo.getSubSrvList().get(0);

		Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
		criteriaMax.setProjection(Projections.max("billDetailsId"));
		Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();
		// if service id equal to service id configured in porperties then it will send
		// to lab
		if (billDetailsIpdDto.getServiceId() == serviceId) {
			// Dynamically getting coulmn value of any perticular pojo

			String code = (String) sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id='"
							+ billDetailsIpdDto.getSubServiceId() + "'")
					.uniqueResult();

			LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
			labReqtSlv.setLabRequestId(labReqId);
			labReqtSlv.setBillDetailsID(maxBillDetailsId);
			labReqtSlv.setServiceId(billDetailsIpdDto.getServiceId());
			labReqtSlv.setSubServiceId(billDetailsIpdDto.getSubServiceId());
			labReqtSlv.setLabTestCode(code);
			labReqtSlv.setRefDocId(billDetailsIpdDto.getDoctorId());
			labReqtSlv.setDeptId(billDetailsIpdDto.getDepartmentId());
			// Insert value in lab slave
			int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
			labReqtSlv.setLabReqSlvId(labReqslvid);

			if (LabMachineFlow.equalsIgnoreCase("on")) {
				// Call saveLabTestData().
				int res = saveLabTestData(labReq, labReqtSlv, labReqId, labReqslvid);
				if (res == 0) {
					return -4;
				}
			}

		} // if end service id check
		else if (billDetailsIpdDto.getServiceId() == packageID) {// Added by Laxman for Packages.

			try {
				Criteria criteriaSubSerId = sessionFactory.getCurrentSession()
						.createCriteria(EhatOtherBillDetailForIpdDto.class);
				criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
				criteriaSubSerId.add(Restrictions.eq("subServiceId", billDetailsIpdDto.getSubServiceId()));
				criteriaSubSerId.add(Restrictions.eq("childServiceId", serviceId));
				criteriaSubSerId.add(Restrictions.eq("treatmentId", billDetailsIpdDto.getTreatmentId()));
				criteriaSubSerId.add(Restrictions.eq("billDetailsId", maxBillDetailsId));
				criteriaSubSerId.add(Restrictions.eq("departmentId", billDetailsIpdDto.getDepartmentId()));
				criteriaSubSerId.add(Restrictions.eq("cancle", "N"));
				criteriaSubSerId.add(Restrictions.eq("deleted", "N"));

				listIpdSubSerId = criteriaSubSerId.list();
			} catch (Exception e) {
				e.printStackTrace();
			}

			for (EhatOtherBillDetailForIpdDto othrBillIpdObj : listIpdSubSerId) {
				if (othrBillIpdObj.getChildServiceId() == serviceId) {
					// set profile/subserviceId to Labslavepojo.
					String code = (String) sessionFactory.getCurrentSession()
							.createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id='"
									+ othrBillIpdObj.getChildSubServiceId() + "'")
							.uniqueResult();
					if (code == null) {
						code = "-";
					}
					LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();

					labReqtSlv.setLabRequestId(labReqId);
					labReqtSlv.setBillDetailsID(othrBillIpdObj.getBillDetailsId());
					labReqtSlv.setServiceId(othrBillIpdObj.getServiceId());
					labReqtSlv.setSubServiceId(othrBillIpdObj.getChildSubServiceId());
					labReqtSlv.setLabTestCode(code);
					labReqtSlv.setRefDocId(othrBillIpdObj.getDoctorId());
					labReqtSlv.setPackageId(othrBillIpdObj.getSubServiceId());
					labReqtSlv.setIsPackageFlag("Y");
					labReqtSlv.setDeptId(billDetailsIpdDto.getDepartmentId());
					// Insert value in lab slave
					int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
					labReqtSlv.setLabReqSlvId(labReqslvid);

					if (LabMachineFlow.equalsIgnoreCase("on")) {
						// Call saveLabTestData().
						int res = saveLabTestData(labReq, labReqtSlv, labReqId, labReqslvid);
						if (res == 0) {
							return -4;
						}
					}
				}
			}
		}
		return labReqId;
	}

	@Override
	public List<CpoeIPDdetails> getlistservciesipdcopenew(Integer tID, String callform) {

		List<CpoeIPDdetails> tlistbiilall = new ArrayList<CpoeIPDdetails>();
		;

		// try {
		/*
		 * Criteria criteria = sessionFactory.getCurrentSession()
		 * .createCriteria(CpoeIPDdetails.class);
		 * criteria.add(Restrictions.eq("treatmentid", tID));
		 * criteria.setMaxResults(10); tlistbiilall = criteria.list();
		 */

		CpoeIPDdetails objCpoe = new CpoeIPDdetails();

		// List<CpoeIPDdetails> tlistbiilall=new ArrayList<CpoeIPDdetails>();
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
					+ otherservices + "," + radiationId + ") and a.treatment_id='" + tID
					+ "' order by a.bill_details_id desc";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();
			// tlistbiilall= query.list();
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
				java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());

				obj.setCreated_date_time(sqlDate);

				// date to string
				String pattern = "dd/MM/YYYY";

				// Create an instance of SimpleDateFormat used for formatting
				// the string representation of date according to the chosen pattern
				DateFormat df = new SimpleDateFormat(pattern);
				// Using DateFormat format method we can create a string
				// representation of a date with the defined format.
				String todayAsString = df.format(sqlDate);
				obj.setInsertDate(todayAsString);
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
	public int OpdCpoeSendToRis(BillDetailsDto billDetailsDto, String subList, HttpServletRequest request) {

		HttpSession session = request.getSession();
		int radMstId = 0;
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		RadiologyFileMasterDTO radmst = new RadiologyFileMasterDTO();
		// setting values
		radmst.setInsertedBy(userId);
		radmst.setInsertedDatetime(new Date(new java.util.Date().getTime()));
		radmst.setPatientId(billDetailsDto.getPatienttId());
		radmst.setTreatmentId(billDetailsDto.getTreatmentId());
		radmst.setIdbill(billDetailsDto.getBillId());
		radmst.setUnitId(unitId);
		radmst.setRadioTotal((float) billDetailsDto.getAmount());
		radmst.setSubSerId(billDetailsDto.getSubServiceId());
		try {

			// Jsong string formate subList variable
			LabSlavePojo labSlvpo = (LabSlavePojo) ConfigUIJSONUtility.getObjectFromJSON(subList, LabSlavePojo.class);
			LabSlavePojo lpojo = labSlvpo.getSubSrvList().get(0);

			Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
			criteriaMax.setProjection(Projections.max("billDetailsId"));
			criteriaMax.add(Restrictions.eq("billId", billDetailsDto.getBillId()));
			Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();

			int urgentflag = 0;
			if (billDetailsDto.getUrgentflag().equals("Y")) {
				urgentflag = 3;
			} else
				urgentflag = 1;

			if (lpojo.getServiceId() == 12) {

				radMstId = (Integer) sessionFactory.getCurrentSession().save(radmst);

				SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery(""
						+ "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyUrgentflag,radiologyRISFlag,bill_details_id,radiologyClinicalNote,radiologyInstruction) values(?,?,?,?,?,?,?,?,?,?)");
				insertQuery1.setParameter(0, radMstId);
				insertQuery1.setParameter(1, lpojo.getSubSrvid());
				insertQuery1.setParameter(2, billDetailsDto.getAmount());
				insertQuery1.setParameter(3, userId);
				insertQuery1.setParameter(4, new Date());
				insertQuery1.setParameter(5, urgentflag);
				insertQuery1.setParameter(6, 'Y');
				insertQuery1.setParameter(7, maxBillDetailsId);
				insertQuery1.setParameter(8, billDetailsDto.getClinicalnotes());
				insertQuery1.setParameter(9, billDetailsDto.getInstructions());
				insertQuery1.executeUpdate();
				System.out.println("Hello opd >> " + maxBillDetailsId + ">>>> Clinicalnotes "
						+ billDetailsDto.getClinicalnotes() + " >>>Instructions " + billDetailsDto.getInstructions());
				String sql = "update ehat_bill_details set sndtorisflag='Y' where bill_details_id='" + maxBillDetailsId
						+ "'";
				Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int response = updateSql.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return radMstId;
		}
		return radMstId;
	}

	@Override
	public int IpdCpoeSendToRis(BillDetailsIpdDto billDetailsIpdDto, String subList, HttpServletRequest request) {

		HttpSession session = request.getSession();
		int radMstId = 0;
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		RadiologyFileMasterDTO radmst = new RadiologyFileMasterDTO();
		// setting values
		radmst.setInsertedBy(userId);
		radmst.setInsertedDatetime(new Date(new java.util.Date().getTime()));
		radmst.setPatientId(billDetailsIpdDto.getPatienttId());
		radmst.setTreatmentId(billDetailsIpdDto.getTreatmentId());
		radmst.setIdbill(billDetailsIpdDto.getBillId());
		radmst.setUnitId(unitId);
		radmst.setRadioTotal(billDetailsIpdDto.getAmount().floatValue());
		radmst.setSubSerId(billDetailsIpdDto.getSubServiceId());

		try {

			radMstId = (Integer) sessionFactory.getCurrentSession().save(radmst);

			// Jsong string formate subList variable
			LabSlavePojo labSlvpo = (LabSlavePojo) ConfigUIJSONUtility.getObjectFromJSON(subList, LabSlavePojo.class);
			LabSlavePojo lpojo = labSlvpo.getSubSrvList().get(0);

			Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
			criteriaMax.setProjection(Projections.max("billDetailsId"));
			criteriaMax.add(Restrictions.eq("billId", billDetailsIpdDto.getBillId()));
			Integer maxBillDetailsId = (Integer) criteriaMax.uniqueResult();

			if (lpojo.getServiceId() == 12) {

				int urgentflag = 0;
				if (billDetailsIpdDto.getUrgentFlag().equals("Y")) {
					urgentflag = 3;
				} else
					urgentflag = 1;
				SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery(""
						+ "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyUrgentflag,radiologyRISFlag,bill_details_id,radiologyClinicalNote,radiologyInstruction) values(?,?,?,?,?,?,?,?,?,?)");
				insertQuery1.setParameter(0, radMstId);
				insertQuery1.setParameter(1, lpojo.getSubSrvid());
				insertQuery1.setParameter(2, billDetailsIpdDto.getAmount());
				insertQuery1.setParameter(3, userId);
				insertQuery1.setParameter(4, new Date());
				insertQuery1.setParameter(5, urgentflag);
				insertQuery1.setParameter(6, 'Y');
				insertQuery1.setParameter(7, maxBillDetailsId);
				insertQuery1.setParameter(8, billDetailsIpdDto.getClinicalnotes());
				insertQuery1.setParameter(9, billDetailsIpdDto.getInstructions());

				insertQuery1.executeUpdate();
				System.out.println("Hello Ipd >>>>>>>>>" + maxBillDetailsId + ">>>> Clinicalnotes "
						+ billDetailsIpdDto.getClinicalnotes() + " >>>Instructions "
						+ billDetailsIpdDto.getInstructions());
				String sql = "update ehat_bill_details_ipd set sndtorisflag='Y' where bill_details_id='"
						+ maxBillDetailsId + "'";
				Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int response = updateSql.executeUpdate();

			}
		} catch (Exception e) {
			e.printStackTrace();
			return radMstId;
		}
		return radMstId;
	}

	@Override
	public List<RadiologyTemplateReportDTO> getTestRadilogyReports(Integer patientId, Integer testId,
			Integer billdetailsid, Integer treatmentId) {
		List<RadiologyTemplateReportDTO> ltTestRadiologyReports = null;
		try {
			String query = "select idradiology_test from radiology_assign_test where bill_details_id = "
					+ billdetailsid;
			int radiologyTestId = ((Integer) sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult())
					.intValue();

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyTemplateReportDTO.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("patientId", patientId));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("testId", testId));
			criteria.add(Restrictions.eq("radiologyTestId", radiologyTestId));
			criteria.setMaxResults(10);
			ltTestRadiologyReports = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return ltTestRadiologyReports;
		}
		return ltTestRadiologyReports;
	}

	@Override
	public List<Treatment> fetchPreviousTreatmentsByTreatmentID(Integer treatmentId, HttpServletRequest request) {
		List<Treatment> treatmentList = new ArrayList<Treatment>();

		try {

			String sql = "SELECT * FROM ehat_treatment WHERE patient_id=(SELECT patient_id FROM ehat_treatment WHERE treatment_id="
					+ treatmentId + ")" + " AND treatment_id!=" + treatmentId
					+ " AND t_flag = 'N' ORDER BY treatment_id DESC";

			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();

			for (Map<String, Object> mapRS : result) {

				Treatment treatment = new Treatment();

				treatment.setPatient_ID((Integer) mapRS.get("patient_id"));
				treatment.setTreatment_ID((Integer) mapRS.get("treatment_id"));
				treatment.setTstartDate((String) mapRS.get("opdipdno"));
				treatment.setTreatmentCount((String) mapRS.get("trcount"));
				int department = (Integer) mapRS.get("department_id");
				if (department == 1) {

					treatment.setDepartment("opd");

				} else if (department == 2) {

					treatment.setDepartment("ipd");

				} else {

					treatment.setDepartment("diagnosis");

				}
				// System.err.println("date="+(String) mapRS.get("created_date_time"));
				// String tempDate = ((String) mapRS.get("TstartDate"));
				// String tempDate = ((String) mapRS.get("created_date_time"));
				System.err.println("date doctor=" + (Date) mapRS.get("created_date_time"));

				Timestamp ts = (Timestamp) mapRS.get("created_date_time");
				Date date1 = new Date();
				date1.setTime(ts.getTime());
				String tempDate = new SimpleDateFormat("dd/MM/yyyy").format(date1);
				System.out.println("date1....." + date1);

				if (tempDate.contains("-")) {
					String[] splitDate = tempDate.split("-");
					tempDate = (splitDate[0] + "/" + splitDate[1] + "/" + splitDate[2]);
					treatment.setCreatedDate(tempDate);
				} else {
					treatment.setCreatedDate(tempDate);
				}
				treatmentList.add(treatment);
			}

			return treatmentList;
		} catch (Exception e) {
			e.printStackTrace();
			return treatmentList;
		}
	}

	@Override
	public List<RisImageUploadDTO> fetchXrayImage(Integer treatmentId, Integer testId, Integer billdetailsid) {

		List<RisImageUploadDTO> lstTest = new ArrayList<RisImageUploadDTO>();

		String query = "select idradiology_test from radiology_assign_test where bill_details_id = " + billdetailsid;
		int idRadiologyTest = ((Integer) sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult())
				.intValue();
		String sql = "select idradiology_image_master,image_name,created_date_time,treatment_id from ehat_radiology_image_master where radiology_test_id = "
				+ idRadiologyTest + " and test_id = " + testId + " and treatment_id = " + treatmentId;
		Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
		tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listBillDetails = tsetDetails.list();
		for (Map<String, Object> row : listBillDetails) {

			RisImageUploadDTO objData = new RisImageUploadDTO();

			objData.setIdRadiologyTestReport((Integer) row.get("idradiology_image_master"));
			objData.setImageName((String) row.get("image_name"));
			objData.setCreatedDate((Date) row.get("created_date_time"));
			objData.setTreatmentId((Integer) row.get("treatment_id"));

			lstTest.add(objData);
		}
		return lstTest;
	}

	@Override
	public int cancelInvestigationTest(String billDetId, String cancleType, String callform,
			HttpServletRequest request) {
		int idRadiologyTest = 0;
		int idTestRadiology = 0;
		int idradiologyFileMaster = 0; // Rohini.
		int response = 0;
		if (callform.equals("Diagno") || callform.equals("DR") || callform.equals("OPDDignoBill")
				|| callform.equals("IPD") || callform.equals("IpdBill") || callform.equals("edit")) {

			String[] ary = billDetId.split(",");
			for (String billDetailsId : ary) {

				// String query="select idradiology_test,idtest_radiology from
				// radiology_assign_test where bill_details_id = "+billDetailsId;

				// change by Rohini Ambhore for package test cancle.
				String query = "select idradiology_test,idtest_radiology,idradiology_file_master from radiology_assign_test where bill_details_id = "
						+ billDetailsId;
				Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(query);
				tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listBillDetails = tsetDetails.list();
				for (Map<String, Object> row : listBillDetails) {
					idRadiologyTest = ((Integer) row.get("idradiology_test"));
					idTestRadiology = ((Integer) row.get("idtest_radiology"));
					idradiologyFileMaster = ((Integer) row.get("idradiology_file_master"));
				}

				String sql = "select  COUNT(*) from ehat_radiology_test_report where radiology_test_id = "
						+ idRadiologyTest + " and test_id = " + idTestRadiology + "";
				int count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
						.intValue();

				if (count == 0) {

					// String sql1="update radiology_assign_test set
					// radiologyTestStatus='"+cancleType+"' where
					// idradiology_test="+idRadiologyTest+" and
					// idtest_radiology="+idTestRadiology+"";
					// rohini
					
					if(callform.equals("edit")) {
						
					}else {
						
					String sql1 = "update radiology_assign_test set radiologyTestStatus='" + cancleType
							+ "' where idradiology_file_master=" + idradiologyFileMaster + " and bill_details_id="
							+ billDetailsId + "";
					Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					updateSql.executeUpdate();
					}

					if(callform.equals("edit")) {
						response = 9;
					}else {
					response = 1;
					}
				} else {

					return 0;
				}
			}
		}
		return response;
	}

	@Override
	public int packageOpdSendToLab(EhatOtherBillDetailForOpdDto othrBillOpdObj, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");

		List<LabRequestDTO> listsmplColFlg = new ArrayList<LabRequestDTO>();
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String) resourceBundleEhat.getString("labHeadingID");
		String LabMachineFlow = (String) resourceBundleEhat.getString("LabMachineFlow");
		int serviceId = Integer.parseInt(sid);
		LabRequestDTO labReq = new LabRequestDTO();
		// setting values
		labReq.setInsertedBy(userId);
		labReq.setDeptId(othrBillOpdObj.getDepartmentId());
		labReq.setPatientId(othrBillOpdObj.getPatienttId());
		labReq.setTreatmentId(othrBillOpdObj.getTreatmentId());
		labReq.setUnitId(unitId);
		try {

			Query q1 = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT count(*) FROM ehat_lab_request_slave where  deleted_flag='N' and bill_details_id='"
							+ othrBillOpdObj.getBillDetailsId() + "' " + " and dept_id='"
							+ othrBillOpdObj.getDepartmentId() + "' and is_package_flag='Y' and deleted_flag='N'");
			Integer count = ((Number) q1.uniqueResult()).intValue();

			if (count > 0) {

				Query que = sessionFactory.getCurrentSession().createSQLQuery(
						"SELECT count(*) FROM ehat_lab_request_slave where  deleted_flag='N' and bill_details_id='"
								+ othrBillOpdObj.getBillDetailsId() + "' " + " and dept_id='"
								+ othrBillOpdObj.getDepartmentId()
								+ "' and is_package_flag='Y' and deleted_flag='N' and sub_service_id = '"
								+ othrBillOpdObj.getChildSubServiceId() + "'");
				Integer dupCount = ((Number) que.uniqueResult()).intValue();
				// count check For duplicate test are exist in DB.
				if (dupCount == 0) {

					Query q = sessionFactory.getCurrentSession().createSQLQuery(
							"SELECT Distinct(lab_request_id) FROM ehat_lab_request_slave where  deleted_flag='N' and bill_details_id='"
									+ othrBillOpdObj.getBillDetailsId() + "' " + " and dept_id='"
									+ othrBillOpdObj.getDepartmentId()
									+ "' and is_package_flag='Y' and deleted_flag='N'");
					Integer labReqId = ((Number) q.uniqueResult()).intValue();

					Criteria criteriasmplFlg = sessionFactory.getCurrentSession().createCriteria(LabRequestDTO.class);
					criteriasmplFlg.add(Restrictions.eq("labRequestId", labReqId));
					criteriasmplFlg.setProjection(
							Projections.projectionList().add(Projections.property("smplColletFlag"), "smplColletFlag"));
					criteriasmplFlg.setResultTransformer(Transformers.aliasToBean(LabRequestDTO.class));
					listsmplColFlg = criteriasmplFlg.list();

					for (LabRequestDTO labObj : listsmplColFlg) {
						if (labObj.getSmplColletFlag() == 'N') {

							if (othrBillOpdObj.getChildServiceId() == serviceId) {
								// set profile/subserviceId to Labslavepojo.

								String code = (String) sessionFactory.getCurrentSession()
										.createSQLQuery("SELECT ifnull(code_name,'-') FROM ehat_subservice where id="
												+ othrBillOpdObj.getChildSubServiceId() + "")
										.uniqueResult();

								if (code == null) {
									code = "-";
								}
								LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();

								labReqtSlv.setLabRequestId(labReqId);
								labReqtSlv.setBillDetailsID(othrBillOpdObj.getBillDetailsId());
								labReqtSlv.setServiceId(othrBillOpdObj.getServiceId());
								labReqtSlv.setSubServiceId(othrBillOpdObj.getChildSubServiceId());
								labReqtSlv.setLabTestCode(code);
								labReqtSlv.setRefDocId(othrBillOpdObj.getDoctorId());
								labReqtSlv.setPackageId(othrBillOpdObj.getSubServiceId());
								labReqtSlv.setIsPackageFlag("Y");
								labReqtSlv.setDeptId(othrBillOpdObj.getDepartmentId());
								// Insert value in lab slave
								int labReqslvid = (Integer) sessionFactory.getCurrentSession().save(labReqtSlv);
								labReqtSlv.setLabReqSlvId(labReqslvid);

								if (LabMachineFlow.equalsIgnoreCase("on")) {
									// Call saveLabTestData().
									int res = saveLabTestData(labReq, labReqtSlv, labReqId, labReqslvid);
									if (res == 0) {
										return -4;
									}
								}

							}
						} else {
							// if sample are collected.
							return 0;
						}
					}
				} else {
					// For duplicate test.
					return 2;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		return 1;
	}

	@Override
	public int deleteLabPackageTest(Integer otherBillDetailsId, Integer deptId, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (Integer) session.getAttribute("userId1");
		int testSatus = 0;
		List<EhatOtherBillDetailForOpdDto> listOpdSubSerId = null;
		List<EhatOtherBillDetailForIpdDto> listIpdSubSerId = null;
		List<LabRequestDTO> listsmplColFlg = new ArrayList<LabRequestDTO>();
		/* List<LabRequestSlaveDTO> listSerId=new ArrayList<LabRequestSlaveDTO>(); */
		List<PathologySampleWiseMaster> listSerId = new ArrayList<PathologySampleWiseMaster>();

		if (deptId == 2) {

			Criteria criteriaSerDet = sessionFactory.getCurrentSession()
					.createCriteria(EhatOtherBillDetailForIpdDto.class);
			criteriaSerDet.add(Restrictions.eq("otherbildetailidipd", otherBillDetailsId));

			listIpdSubSerId = criteriaSerDet.list();

			for (EhatOtherBillDetailForIpdDto objOthIpd : listIpdSubSerId) {

				// LabRequestDTO labRequestDTO = new LabRequestDTO();
				// LabRequestSlaveDTO labRequestSlaveDTO = new LabRequestSlaveDTO();

				EhatOtherBillDetailForOpdDto labRequestSlaveDTO = new EhatOtherBillDetailForOpdDto();

				Criteria criteriaSubSerId = sessionFactory.getCurrentSession()
						.createCriteria(EhatOtherBillDetailForOpdDto.class);
				criteriaSubSerId.add(Restrictions.eq("billDetailsID", objOthIpd.getBillDetailsId()));
				criteriaSubSerId.add(Restrictions.eq("subServiceId", objOthIpd.getChildSubServiceId()));
				criteriaSubSerId.add(Restrictions.eq("deptId", objOthIpd.getDepartmentId()));
				listSerId = criteriaSubSerId.list();
				if (listSerId.size() != 0) {
					for (PathologySampleWiseMaster labSlvObj : listSerId) {
						Criteria criteriasmplFlg = sessionFactory.getCurrentSession()
								.createCriteria(PathologySampleWiseMaster.class);
						// criteriasmplFlg.add(Restrictions.eq("labRequestId",
						// labSlvObj.getLabRequestId()));
						criteriasmplFlg.setProjection(Projections.projectionList()
								.add(Projections.property("smplColletFlag"), "smplColletFlag"));
						criteriasmplFlg.setResultTransformer(Transformers.aliasToBean(PathologySampleWiseMaster.class));
						listsmplColFlg = criteriasmplFlg.list();

						/*
						 * for(LabRequestDTO labObj:listsmplColFlg){
						 * if(labObj.getSmplColletFlag()=='N'){
						 * 
						 * labRequestSlaveDTO = (EhatOtherBillDetailForOpdDto) sessionFactory
						 * .getCurrentSession().get(EhatOtherBillDetailForOpdDto.class,
						 * labSlvObj.getLabReqSlvId()); labRequestSlaveDTO.setDeletedFlag("Y");
						 * labRequestSlaveDTO.setDeletedBy(userId);
						 * labRequestSlaveDTO.setDeleteDatetime((new Date(new
						 * java.util.Date().getTime()))); }else{ //if sample are collected. return 0; }
						 * }
						 */
					}
				}
			}

		} else {

			Criteria criteriaSerDet = sessionFactory.getCurrentSession()
					.createCriteria(EhatOtherBillDetailForOpdDto.class);
			criteriaSerDet.add(Restrictions.eq("otherBillDetailsId", otherBillDetailsId));
			listOpdSubSerId = criteriaSerDet.list();

			for (EhatOtherBillDetailForOpdDto objOthOpd : listOpdSubSerId) {
				if (objOthOpd.getServiceId() == 13 && objOthOpd.getChildServiceId() == 12) { // added Rohini for
																								// investigation test
																								// deleted show
																								// reflection in ris.

					Query query = sessionFactory.getCurrentSession().createSQLQuery(
							"update radiology_assign_test set radiologyTestStatus='N' where bill_details_id = :bill_details_id "
									+ " and idtest_radiology = :idtestrad");
					query.setParameter("bill_details_id", objOthOpd.getBillDetailsId());
					query.setParameter("idtestrad", objOthOpd.getChildSubServiceId());
					query.executeUpdate();

					testSatus = 8;

				} else {
					LabRequestSlaveDTO labRequestSlaveDTO = new LabRequestSlaveDTO();

					/*
					 * Criteria criteriaSubSerId=
					 * sessionFactory.getCurrentSession().createCriteria(LabRequestSlaveDTO.class);
					 * criteriaSubSerId.add(Restrictions.eq("billDetailsID",objOthOpd.
					 * getBillDetailsId()));
					 * criteriaSubSerId.add(Restrictions.eq("subServiceId",objOthOpd.
					 * getChildSubServiceId())); criteriaSubSerId.add(Restrictions.eq("deptId",
					 * objOthOpd.getDepartmentId())); listSerId = criteriaSubSerId.list();
					 */

					// change by Rohini Ambhore.

					Criteria criteriaSubSerId = sessionFactory.getCurrentSession()
							.createCriteria(PathologySampleWiseMaster.class);
					criteriaSubSerId.add(Restrictions.eq("bilDetId", objOthOpd.getBillDetailsId()));
					criteriaSubSerId.add(Restrictions.eq("subServiceId", objOthOpd.getChildSubServiceId()));
					criteriaSubSerId.add(Restrictions.eq("treatmentId", objOthOpd.getTreatmentId()));
					criteriaSubSerId.add(Restrictions.eq("deptId", objOthOpd.getDepartmentId()));
					listSerId = criteriaSubSerId.list();
					if (listSerId.size() > 0) {

						for (PathologySampleWiseMaster labSlvObj : listSerId) {

							testSatus = labSlvObj.getTeststatus();

							if (testSatus <= 2) {
								boolean testupdate = deleteLabPackageTestFromLis(labSlvObj.getTreatmentId(),
										labSlvObj.getSubServiceId(), labSlvObj.getBilDetId(), userId);
							}
						}
					}

				}
			}

		}
		return testSatus;
	}

	/*******
	 * @author :Laxman Nikam
	 * @param LabRequestDTO
	 * @param LabRequestSlaveDTO
	 * @param labReqslvid
	 * @param labReqId
	 * @Date :07-04-2018
	 * @Code :For Machine-Interface save Lab test result at the time of test send to
	 *       lab.
	 *******/
	private int saveLabTestData(LabRequestDTO labReq, LabRequestSlaveDTO labReqtSlv, int labReqId, int labReqslvid) {
		int response = 0;
		String tempFlag = "N";
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String) resourceBundleEhat.getString("labHeadingID");
		int serviceId = Integer.parseInt(sid);

		try {

			String sql = "SELECT lt.idTest,lt.valueType FROM labprofile lp left join labprofiletestcomp lpc on lpc.idprofile=lp.idprofile left join labtest lt on lt.idTest=lpc.idTest where lp.service_id ='"
					+ serviceId + "' and lp.subservice_id='" + labReqtSlv.getSubServiceId()
					+ "' and lp.profileStatus='Y' and lt.testStatus='Y'";

			Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();
			if (listLabTest.size() > 0) {
				for (Map<String, Object> row : listLabTest) {
					LabTestResultDto labResultDtoObj = new LabTestResultDto();

					tempFlag = (String) row.get("valueType");
					if (tempFlag.equalsIgnoreCase("t")) {
						labResultDtoObj.setIsTemplateFlag("Y");
					} else {
						labResultDtoObj.setIsTemplateFlag("N");
					}

					labResultDtoObj.setTestId((Integer) row.get("idTest"));
					labResultDtoObj.setInsertedBy(labReq.getInsertedBy());
					labResultDtoObj.setDeleteFlag("N");
					labResultDtoObj.setInsertedDatetime(new Date(new java.util.Date().getTime()));
					labResultDtoObj.setPatientId(labReq.getPatientId());
					labResultDtoObj.setTreatmentId(labReq.getTreatmentId());
					labResultDtoObj.setDepartmentId(labReq.getDeptId());
					labResultDtoObj.setUnitId(labReq.getUnitId());
					labResultDtoObj.setLabRequestId(labReqId);
					labResultDtoObj.setLabReqSlvId(labReqslvid);
					labResultDtoObj.setServiceId(labReqtSlv.getServiceId());
					labResultDtoObj.setSubServiceId(labReqtSlv.getSubServiceId());
					labResultDtoObj.setImpressions("");
					labResultDtoObj.setTestTemplate("");
					labResultDtoObj.setNarration("");
					labResultDtoObj.setTestResult("");

					// Call generic save method.
					response = (Integer) sessionFactory.getCurrentSession().save(labResultDtoObj);

				}
			} else {
				response = 1;
			}
		} catch (Exception e) {
			response = 0;
			e.printStackTrace();
			System.out.println("database error...could not insert: " + e.getMessage());
		}

		return response;
	}

	public int setBillMasterTotalsForOpd(int treatmentId) {

		int result = 0;
		try {

			// Update amount in bill master start
			double totalAmt = 0;
			double totPaid = 0;
			double totRemain = 0;
			double totRefund = 0;
			double totDisc = 0;
			double totConcn = 0;
			int billId = 0;
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
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
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

			Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
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
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				ipdRefund = (Double) refQuery.uniqueResult();
			}

			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
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

	/*******
	 * @author :Touheed
	 * @Date :12-12-2021
	 * @Code :Get Previous Doctor round
	 *******/
	@Override
	public List<DoctorRoundReport> fetchSelctedIpdDrRound(Integer treatmentID, String date,
			HttpServletRequest request) {
		// String sql="";
		List<DoctorRoundReport> list = new ArrayList<>();

		int unitId = 1;
		// sql="select * from doctorroundreport where Treatment_ID='"+treatmentID+"' and
		// drr_id IN ("+drRoundIdList+") and status='Y'";

		// Query drRndDtlsQuery =
		// sessionFactory.getCurrentSession().createSQLQuery(sql);
		// drRndDtlsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

		// List<Map<String, Object>> drRndDtlList = drRndDtlsQuery.list();
		try {

			/*
			 * Criteria criteria =
			 * sessionFactory.getCurrentSession().createCriteria(DoctorRoundDTO.class);
			 * criteria.add(Restrictions.eq("treatmentId", treatmentID));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.setFetchMode("listDoctorRoundSlaveDTO", FetchMode.SELECT);
			 */

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorRoundReport.class); // criteria.add(Restrictions.eq("unitId",
																											// unitId));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("Treatment_ID", treatmentID));

			list = criteria.list();
			list = fetchDRRDetails(list, treatmentID);
			LOG.info("Doctor Round List size is:" + list.size());
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("defaultViewDoctorSpeciality....." + e);

		}

		return list;

	}

	private List<DoctorRoundReport> fetchDRRDetails(List<DoctorRoundReport> drrList, Integer treatmentID) {

		List<DoctorRoundReport> arrDoctorRoundReport = new ArrayList<DoctorRoundReport>();
		String sql = "select bill_details_id from ehat_bill_details_ipd where   deleted='N' and drdesk_flag='R'  and treatment_id='"
				+ treatmentID + "'";

		Query biilidQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		biilidQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> biilid = biilidQuery.list();

		List<Integer> myServiceId = new ArrayList<Integer>();
		for (Map<String, Object> rs1 : biilid) {
			myServiceId.add((Integer) rs1.get("bill_details_id"));
		}

		for (DoctorRoundReport rs : drrList) {
			DoctorRoundReport objDoctorRoundReport = new DoctorRoundReport();
			int id = drrList.size();
			int getid = 0;
			if (id > 0) {
				objDoctorRoundReport.setBill_details_id(myServiceId.get(getid));// added by paras getting bill id.

				getid++;
				id--;

			}
			String dId = rs.getRoundby();

			String docNmSql = "select doc_name from doctor where Doctor_ID='" + dId + "'";
			Query docNmQuery = sessionFactory.getCurrentSession().createSQLQuery(docNmSql);
			docNmQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> did = docNmQuery.list();

			String docName = "";
			for (Map<String, Object> rs1 : did) {
				docName = (String) rs1.get("doc_name");//
				// System.err.println("doc------"+docName);
				objDoctorRoundReport.setDocName(docName);
			}

			/*
			 * objDoctorRoundReport.setDrr_id((Integer) rs.get("drr_id"));
			 * objDoctorRoundReport.setClinical_note((String) rs.get("clinical_note"));
			 * objDoctorRoundReport.setTreatment_ID((Integer) rs.get("Treatment_ID"));
			 * objDoctorRoundReport.setDate((String) rs.get("date"));
			 * objDoctorRoundReport.setTime((String) rs.get("time"));
			 * objDoctorRoundReport.setTreatment((String) rs.get("treatment"));
			 * objDoctorRoundReport.setRoundby((String) rs.get("roundby"));
			 * objDoctorRoundReport.setInvestigation_advice((String) rs.get("inv_adv"));
			 * objDoctorRoundReport.setTemplateVal((Integer)rs.get("template_val"));
			 * objDoctorRoundReport.setComplitionTime((String)rs.get("dr_r_complition_time")
			 * ); objDoctorRoundReport.setNursingNotes((String)rs.get("nursing_notes"));
			 * objDoctorRoundReport.setUserIp((String)rs.get("nurse_user_ip"));
			 * objDoctorRoundReport.setNurseAddDate((String)rs.get("nurse_add_date"));
			 * objDoctorRoundReport.setNurseAddTime((String)rs.get("nurse_add_time"));
			 * objDoctorRoundReport.setUserId((Integer) rs.get("nurse_user_id"));
			 */

			arrDoctorRoundReport.add(objDoctorRoundReport);
		}

		return arrDoctorRoundReport;

	}

	@Override
	public int deleteOPDPrepDocTemp(Integer prepTemplateDocID, HttpServletRequest request) {
		int response = 0;
		try {

			String sql = "UPDATE prescription_doc_template SET status_flag='N' where idprescription_doc_template='"
					+ prepTemplateDocID + "' ";

			Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
			response = updateSql.executeUpdate();

		} catch (Exception e) {
			return 0;
		}
		return response;
	}

	@Override
	public int savecpoeOTsurgan(BillDetailsIpdDto billDetailsIpdDto, String queryType, String callfrom,
			HttpServletRequest request) {

		int records = 0;
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		String usertype = (String) session.getAttribute("userType");

		// TODO Auto-generated method stub
		try {

			for (BillDetailsIpdDto obj : billDetailsIpdDto.getListBillDetailsIpd()) {
				if (obj.getBillDetailsId() == 0) {
					obj.setCreatedBy(userId);
					obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));
					obj.setDeleted("N");
				} else {
					obj.setUpdatedBy(userId);
					obj.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
					obj.setDeleted("N");
				}

				sessionFactory.getCurrentSession().merge(obj);
				records = 1;
			}

		} catch (Exception e) {
			e.printStackTrace();
			records = 0;
			// TODO: handle exception
		}
		return records;
	}

	@Override
	public List<DoctorDto> fetchDoctorList(String doctodType) {

		List<DoctorDto> list = new ArrayList<DoctorDto>();
		Query query = null;
		query = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_doctor_list_by_type(:doctorType)");
		query.setParameter("doctorType", doctodType);
		try {

			List<Object[]> queryResult = query.list();
			for (Object[] row : queryResult) {
				DoctorDto obj = new DoctorDto();
				Integer doctorId = (Integer) row[0];
				String doctorName = (String) row[1];
				obj.setDoctor_ID(doctorId);
				obj.setDoc_name(doctorName);
				list.add(obj);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public int saveLabTest(BillDetailsDto billDetailsDto, String queryType, String module) {

		int lenghtCount = Integer.parseInt(module);
		int setValue = 0;

		int lenghtSub = 0;
		if (lenghtCount == 1) {
			lenghtSub = 0;
			setValue = 0;
		} else if (lenghtCount == 2) {
			lenghtSub = 0;
			setValue = 1;
		} else if (lenghtCount == 3) {
			lenghtSub = 1;
			setValue = 3;
		}
		int records = 0;
		/*
		 * String collectionChargesSampleTypeId = (String)
		 * resourceBundleEhat.getString("collectionChargesSampleTypeId"); String
		 * risSampleTypeId = (String) resourceBundleEhat.getString("risSampleTypeId");
		 * if(billDetailsDto.getSampleTypeId() !=
		 * Integer.parseInt(collectionChargesSampleTypeId) &&
		 * billDetailsDto.getSampleTypeId() != Integer.parseInt(risSampleTypeId)) {
		 * 
		 * long BarcodeCount=checkDuplicateBarcode(billDetailsDto.getPatienttId(),
		 * billDetailsDto.getTreatmentId(),billDetailsDto.getBarCode());
		 * 
		 * if(BarcodeCount > 0){ records=7; return records; }
		 * updateEmergencyFlag(billDetailsDto); }
		 */

		for (int iii = 0; iii <= lenghtSub; iii++) {

			String radId = resourceBundleEhat.getObject("radiationId").toString();
			int radiationId = Integer.parseInt(radId);

			try {

				if (setValue == 3) {
					billDetailsDto.setInOutHouse(iii);
					if (iii == 1) {
						// billDetailsDto.setBarCode(billDetailsDto.getTreatmentId().toString()+""+billDetailsDto.getSampleTypeId().toString()+""+iii);
						billDetailsDto.setRate(0);
						billDetailsDto.setConcession(0);
						billDetailsDto.setAmount(0);
						billDetailsDto.setCoPay(0);
						billDetailsDto.setOtherRate(0);
						billDetailsDto.setOtherConcession(0);
						billDetailsDto.setOtherAmount(0);
						billDetailsDto.setOtherPay(0);

					}

				} else {
					billDetailsDto.setInOutHouse(setValue);

					if (billDetailsDto.getBusinessType() == 2) {

						/*
						 * Criteria criteriatoken =
						 * sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
						 * //criteriatoken.setProjection(Projections.property("token"));
						 * criteriatoken.setProjection(Projections.max("barCode"));
						 * criteriatoken.add(Restrictions.eq("businessType",billDetailsDto.
						 * getBusinessType()));
						 */

						/*
						 * String
						 * sqlRef="select ifnull((bar_code),0) from ehat_bill_details where treatment_id="
						 * +billDetailsDto.getTreatmentId()+" AND sample_type_id = "+billDetailsDto.
						 * getSampleTypeId()+" AND in_out_house ="+setValue+" AND deleted='N' "; Query
						 * query12= sessionFactory.getCurrentSession().createSQLQuery(sqlRef); String
						 * result = ((String)query12.uniqueResult()).toString(); if(result == null){
						 * result="0"; }
						 */
						// billDetailsDto.setBarCode(billDetailsDto.getTreatmentId().toString()+""+billDetailsDto.getSampleTypeId().toString()+""+setValue);

						/*
						 * Criteria criteria =
						 * sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
						 * //criteria.add(Projections.groupProperty("sampleTypeId"));
						 * criteria.setProjection(Projections.groupProperty("sampleTypeId"));
						 * criteria.setProjection(Projections.groupProperty("inOutHouse"));
						 * criteria.setProjection(Projections.property("barCode"));
						 * criteria.add(Restrictions.eq("treatmentId",billDetailsDto.getTreatmentId()));
						 * criteria.add(Restrictions.eq("patienttId",billDetailsDto.getPatienttId()));
						 * criteria.add(Restrictions.eq("sampleTypeId",billDetailsDto.getSampleTypeId())
						 * ); criteria.add(Restrictions.eq("inOutHouse",C));
						 * criteria.add(Restrictions.eq("deleted","N"));
						 * 
						 * //result = (String) criteria.uniqueResult();
						 * 
						 * String barCodee = (String) criteria.uniqueResult();
						 * System.err.println("barCodee   "+barCodee);
						 * if(barCodee.equalsIgnoreCase(null) || barCodee.equalsIgnoreCase("") ||
						 * barCodee == null || barCodee == "") { barCodee="0"; } //Integer
						 * bar=Integer.parseInt(barCodee); //Integer barC= bar+1;
						 * System.err.println("barC - "+barCodee); billDetailsDto.setBarCode(barCodee);
						 */

					}
				}

				// ADDED BY BILAL
				// FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT
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
					SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
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

					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
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
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
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
					sessionFactory.getCurrentSession().merge(billDetailsDto);

					// @codeBy : Vinod @codeDate : 25-July-2016 @codeFor : Generate service wise
					// bill id // start here
					Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(ServicewiseBillDTO.class);
					criteriaRec.add(Restrictions.eq("treatId", billDetailsDto.getTreatmentId()));
					criteriaRec.add(Restrictions.eq("patientId", billDetailsDto.getPatienttId()));
					criteriaRec.add(Restrictions.eq("serviceId", billDetailsDto.getServiceId()));
					criteriaRec.add(Restrictions.eq("unitId", billDetailsDto.getUnitId()));
					criteriaRec.add(Restrictions.eq("deptId", billDetailsDto.getDepartmentId()));
					criteriaRec.setProjection(Projections.rowCount());
					long count = (Long) criteriaRec.uniqueResult();
					if (count == 0) {

						Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
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

						sessionFactory.getCurrentSession().merge(obj);
					}
				}

				if (billDetailsId > 0) {

					// Added By Bilal 01-02-2018
					SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
							subserviceid);
					String isCombination = subsobj.getIscombination();
					if (isCombination.equals("Y")) {
						Query update = sessionFactory.getCurrentSession().createQuery(
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
				// setBillMasterTotalsForOpd(billDetailsDto.getTreatmentId());

			} catch (Exception e) {
				e.printStackTrace();
				return records;
			}

		}

		return records;
	}

	public int addPathologyPackageFromBilling(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType, String module, String sampleWiseBarcodes) {

		try {

			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
			int labId = Integer.parseInt((String) resourceBundleEhat.getString("pathologyId"));// 13
			// saving records in bill details
			int businessType = billDetailsDto.getBusinessType();
			int customerType = billDetailsDto.getCustomerType();
			int customerId = billDetailsDto.getCustomerId();
			int sponsorId = billDetailsDto.getChargesSlaveId();
			int chargesSlaveId = billDetailsDto.getChargesSlaveId();
			int chslavidd = billDetailsDto.getChargesSlaveId();
			int defaultFlag = billDetailsDto.getDefaultFlag();
			int chidd = 0;
			if (chslavidd > 0) {

				chidd = 1;
			}

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
			double concessionPer = billDetailsDto.getConcessionOnPerc();
			double actualam = amount - con;
			double actualotheramt = otheramt - othercon;

			int spCount = -1;
			if (chargesSlaveId > 0) {

				String sqlSPCount = "SELECT count(*) FROM ehat_configuration_services where " + " chargesSlave_id="
						+ chargesSlaveId + " and hallSlave_id=" + hallSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId + " and deleted='N'";
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlSPCount);
				spCount = ((Number) spQuery.uniqueResult()).intValue();
			}

			if (spCount <= 0)
				chargesSlaveId = 0;

			if (spCount == 0 && defaultFlag == 0) {

				return 33;
			}

			billDetailsDto.setSponsorId(chidd);
			billDetailsDto.setChargesSlaveId(chslavidd);
			BillDetailsDto savedObj = (BillDetailsDto) sessionFactory.getCurrentSession().merge(billDetailsDto);
			Integer maxBillId = savedObj.getBillDetailsId();

			if (maxBillId == null) {
				maxBillId = 0;
			}

			String sql22 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where "
					+ " chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
					+ " and is_com_servlastId=" + subServId + " and hall_id=" + hallId + " and hallSlave_id="
					+ hallSlaveId + " and deleted='N'";

			SQLQuery query222 = sessionFactory.getCurrentSession().createSQLQuery(sql22);
			query222.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data22 = query222.list();
			for (Map<String, Object> row22 : data22) {

				// setting service id in other bill details table
				Integer subId = (Integer) row22.get("service_id");
				SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, subId);
				
				String sqlInvestigation= "select count(*) from ehat_other_bill_detail_for_opd where  treatment_id="+billDetailsDto.getTreatmentId() + " and child_sub_service_id="+subId+" and cancle='N' and deleted='N'";
				SQLQuery qInvestigation = sessionFactory.getCurrentSession().createSQLQuery(sqlInvestigation);
				int invcount =((Number) qInvestigation.uniqueResult()).intValue();
				
				if(invcount > 0)
					continue;

				Integer testServiceId = obje.getServiceId();

				if (testServiceId != labId) {

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
					
					double serviceAmount=charges;
					double sponsorAmt= chargessposor;
					double concessionDistributeAmt=0;

					// distributed amount formula
					if (charges > 0) {
						double IncDecp = charges * 100 / totalcharges;
						charges = IncDecp * actualam / 100;
						concessionDistributeAmt = serviceAmount-charges;
						charges = serviceAmount;
					}

					obj.setRate(charges);

					// distributed amount formula for sponsor charges
					if (chargessposor > 0) {
						double IncDecp2 = chargessposor * 100 / totalcharges;
						chargessposor = IncDecp2 * actualotheramt / 100;
						concessionDistributeAmt = sponsorAmt-chargessposor;
						chargessposor = sponsorAmt;
						
					}

					obj.setOtherRate(chargessposor);

					amountofconsponsor = chargessposor * quantity;
					otherpay = chargessposor * quantity - concession;
					othercopay = amountofconsponsor - otherpay;

					obj.setOtherAmount(amountofconsponsor);
					obj.setOtherPay(otherpay);
					obj.setOtherCoPay(othercopay);
					obj.setOtherConcession(concessionDistributeAmt);
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
					obj.setConcessionOnPerc(concessionPer);

					amountofcon = charges * quantity;
					copay = charges * quantity - concession;
					pay = amountofcon - copay;

					obj.setAmount(amountofcon);
					obj.setCoPay(copay);
					obj.setPay(pay);
					obj.setConcession(concessionDistributeAmt);
					obj.setQuantity(quantity);
					obj.setIscombination(iscombinationflag);
					obj.setChildServiceId(obje.getServiceId());
					obj.setSelfid(0);

					sessionFactory.getCurrentSession().merge(obj);
				} else {

					PathologySampleWiseMaster master = (PathologySampleWiseMaster) ConfigUIJSONUtility
							.getObjectFromJSON(sampleWiseBarcodes, PathologySampleWiseMaster.class);
					List<PathologySampleWiseMaster> barcodeList = master.getLabSampleWiseMasterDtoList();

					String query1 = "";
					if (businessType == 1) {

						query1 = "SELECT c.service_id , c.charges , c.iscombination , c.totalcharges, ifnull(p.template_wise,'N') as template_wise FROM lab_charges_configuration c, pathology_labprofile p where "
								+ "(c.service_id = p.subservice_id) and c.charges_id=" + sponsorId
								+ " and c.chargesSlave_id=" + chargesSlaveId + " and c.is_com_servId=" + serviceId
								+ " and is_com_servlastId=" + subServId + " and c.hall_id=" + hallId
								+ " and c.hallSlave_id=" + hallSlaveId + " and c.customer_type=" + customerType
								+ " and c.customer_name=" + customerId + " and c.deleted='N' ";

					} else {

						query1 = "SELECT c.service_id , c.charges , c.iscombination , c.totalcharges, ifnull(p.template_wise,'N') as template_wise, ifnull(p.idTestSample,0) as sample_type_id  FROM ehat_configuration_services c, pathology_labprofile p where "
								+ "(c.service_id = p.subservice_id) and c.chargesSlave_id=" + chargesSlaveId
								+ " and c.is_com_servId=" + serviceId + " and is_com_servlastId=" + subServId
								+ " and c.hall_id=" + hallId + " and c.hallSlave_id=" + hallSlaveId
								+ " and c.deleted='N' and c.service_id=" + subId;

					}

					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> data = query.list();
					for (Map<String, Object> row : data) {

						EhatOtherBillDetailForOpdDto obj = new EhatOtherBillDetailForOpdDto();

						Integer subServiceId = (Integer) row.get("service_id");
						Integer sampleTypeId = ((Number) row.get("sample_type_id")).intValue();
						
						String sql12= "select count(*) from ehat_other_bill_detail_for_opd where  treatment_id="+billDetailsDto.getTreatmentId() + " and child_sub_service_id="+subServiceId+" and cancle='N' and deleted='N'";
						SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql12);
						int count =((Number) q.uniqueResult()).intValue();
						
						if(count > 0)
							continue;

						int lenghtCount = ((Number) sessionFactory.getCurrentSession()
								.createSQLQuery("select fn_get_inouthouse_count(" + labId + "," + subServiceId + ")")
								.uniqueResult()).intValue();
						int setValue = 0;

						int lenghtSub = 0;
						if (lenghtCount == 1) {
							lenghtSub = 0;
							setValue = 0;
						} else if (lenghtCount == 2) {
							lenghtSub = 0;
							setValue = 1;
						} else if (lenghtCount == 3) {
							lenghtSub = 1;
							setValue = 3;
						}

						for (int iii = 0; iii <= lenghtSub; iii++) {

							String barcode = "0";

							/*
							 * for(PathologySampleWiseMaster dto : barcodeList) {
							 * if(subServiceId.equals(dto.getSubServiceId())) { barcode = dto.getBarCode();
							 * sampleTypeId = dto.getSampleTypeId(); } }
							 */
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
							double otherpay = 0;
							double othercopay = 0;
							String iscombinationflag = (String) row.get("iscombination");
							double totalcharges = (Double) row.get("totalcharges");
							
							double serviceAmount=charges;
							double sponsorAmt= chargessposor;
							double concessionDistributeAmt=0;

							double IncDecp2 = 0;
							double IncDecp = 0;
							// modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition
							// apply
							if (!Double.isNaN(charges) && charges != 0.0) {

								IncDecp = charges * 100 / totalcharges;
								charges = IncDecp * actualam / 100;
								concessionDistributeAmt =serviceAmount-charges;
								charges = serviceAmount;
								obj.setRate(charges);
								obj.setConcession(concessionDistributeAmt);

							} else {

								IncDecp = 0;
								obj.setRate(0);
							}

							// distributed amount formula for sponsor charges
							// modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition
							// apply
							if (!Double.isNaN(chargessposor) && chargessposor != 0.0) {

								IncDecp2 = chargessposor * 100 / totalcharges;
								chargessposor = IncDecp2 * actualotheramt / 100;
								
								concessionDistributeAmt= serviceAmount-chargessposor;
								chargessposor= sponsorAmt;
								obj.setOtherRate(chargessposor);

								amountofconsponsor = chargessposor * quantity;
								otherpay = chargessposor * quantity - concession;
								othercopay = amountofconsponsor - otherpay;

								obj.setOtherAmount(amountofconsponsor);
								obj.setOtherPay(otherpay);
								obj.setOtherCoPay(chargessposor-concessionDistributeAmt);
								obj.setCoPay(chargessposor-concessionDistributeAmt);
								//obj.setOtherConcession(concessionDistributeAmt);
							} else {

								IncDecp2 = 0.0;
								obj.setOtherRate(chargessposor);
								obj.setOtherAmount(0);
								obj.setOtherPay(0);
								obj.setOtherCoPay(0);
							}

							obj.setOtherConcession(concessionDistributeAmt);
							obj.setConcession(concessionDistributeAmt);
							obj.setChildSubServiceId((Integer) row.get("service_id"));

							String templateWise = (String) row.get("template_wise");

							// code added by ROHIT on 11Oct 2022 for the Template Wise package flow
							obj.setTemplateWise(templateWise);

							/*
							 * if(!templateWise.equalsIgnoreCase("Y")) {
							 * 
							 * obj.setTemplateWise("N"); }else { obj.setTemplateWise(templateWise); }
							 */
							obj.setConcessionOnPerc(concessionPer);
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
							// modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition
							// apply
							if (!Double.isNaN(charges) && charges != 0.0) {

								amountofcon = charges * quantity;
								copay = charges * quantity - concession;
								pay = amountofcon - copay;
								obj.setAmount(amountofcon);
								obj.setCoPay(copay-concessionDistributeAmt);
								obj.setPay(pay);
							} else {
								obj.setAmount(0);
								obj.setCoPay(0);
								obj.setPay(0);

							}
							obj.setConcession(concessionDistributeAmt);
							obj.setQuantity(quantity);
							obj.setIscombination(iscombinationflag);

							if (setValue == 3) {

								obj.setInOutHouse(iii);
								if (iii == 1) {
									obj.setRate(0);
									obj.setConcession(0);
									obj.setAmount(0);
									obj.setCoPay(0);
									obj.setOtherRate(0);
									obj.setOtherConcession(0);
									obj.setOtherAmount(0);
									obj.setOtherPay(0);
								}

							} else {
								obj.setInOutHouse(setValue);
							}

							obj.setChildServiceId(testServiceId);
							obj.setSelfid(0);
							sessionFactory.getCurrentSession().merge(obj);
						}
					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	public int saveIpdLabTest(BillDetailsIpdDto billDetailsDto, String queryType, String module) {

		int lenghtCount = Integer.parseInt(module);
		int setValue = 0;

		int lenghtSub = 0;
		if (lenghtCount == 1) {
			lenghtSub = 0;
			setValue = 0;
		} else if (lenghtCount == 2) {
			lenghtSub = 0;
			setValue = 1;
		} else if (lenghtCount == 3) {
			lenghtSub = 1;
			setValue = 3;
		}
		int records = 0;
		/*
		 * String collectionChargesSampleTypeId = (String)
		 * resourceBundleEhat.getString("collectionChargesSampleTypeId"); String
		 * risSampleTypeId = (String) resourceBundleEhat.getString("risSampleTypeId");
		 * if(billDetailsDto.getSampleTypeId() !=
		 * Integer.parseInt(collectionChargesSampleTypeId) &&
		 * billDetailsDto.getSampleTypeId() != Integer.parseInt(risSampleTypeId)) {
		 * 
		 * long BarcodeCount=checkDuplicateBarcode(billDetailsDto.getPatienttId(),
		 * billDetailsDto.getTreatmentId(),billDetailsDto.getBarCode());
		 * 
		 * if(BarcodeCount > 0){ records=7; return records; }
		 * updateEmergencyFlag(billDetailsDto); }
		 */

		for (int iii = 0; iii <= lenghtSub; iii++) {

			String radId = resourceBundleEhat.getObject("radiationId").toString();
			int radiationId = Integer.parseInt(radId);

			try {

				if (setValue == 3) {
					billDetailsDto.setInOutHouse(iii);
					if (iii == 1) {
						// billDetailsDto.setBarCode(billDetailsDto.getTreatmentId().toString()+""+billDetailsDto.getSampleTypeId().toString()+""+iii);
						billDetailsDto.setRate(0.0);
						billDetailsDto.setConcession(0.0);
						billDetailsDto.setAmount(0.0);
						billDetailsDto.setCoPay(0);
						billDetailsDto.setOtherRate(0);
						billDetailsDto.setOtherConcession(0);
						billDetailsDto.setOtherAmount(0);
						billDetailsDto.setOtherPay(0);

					}

				} else {
					billDetailsDto.setInOutHouse(setValue);

					if (billDetailsDto.getBusinessType() == 2) {

						/*
						 * Criteria criteriatoken =
						 * sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
						 * //criteriatoken.setProjection(Projections.property("token"));
						 * criteriatoken.setProjection(Projections.max("barCode"));
						 * criteriatoken.add(Restrictions.eq("businessType",billDetailsDto.
						 * getBusinessType()));
						 */

						/*
						 * String
						 * sqlRef="select ifnull((bar_code),0) from ehat_bill_details where treatment_id="
						 * +billDetailsDto.getTreatmentId()+" AND sample_type_id = "+billDetailsDto.
						 * getSampleTypeId()+" AND in_out_house ="+setValue+" AND deleted='N' "; Query
						 * query12= sessionFactory.getCurrentSession().createSQLQuery(sqlRef); String
						 * result = ((String)query12.uniqueResult()).toString(); if(result == null){
						 * result="0"; }
						 */
						// billDetailsDto.setBarCode(billDetailsDto.getTreatmentId().toString()+""+billDetailsDto.getSampleTypeId().toString()+""+setValue);

						/*
						 * Criteria criteria =
						 * sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
						 * //criteria.add(Projections.groupProperty("sampleTypeId"));
						 * criteria.setProjection(Projections.groupProperty("sampleTypeId"));
						 * criteria.setProjection(Projections.groupProperty("inOutHouse"));
						 * criteria.setProjection(Projections.property("barCode"));
						 * criteria.add(Restrictions.eq("treatmentId",billDetailsDto.getTreatmentId()));
						 * criteria.add(Restrictions.eq("patienttId",billDetailsDto.getPatienttId()));
						 * criteria.add(Restrictions.eq("sampleTypeId",billDetailsDto.getSampleTypeId())
						 * ); criteria.add(Restrictions.eq("inOutHouse",C));
						 * criteria.add(Restrictions.eq("deleted","N"));
						 * 
						 * //result = (String) criteria.uniqueResult();
						 * 
						 * String barCodee = (String) criteria.uniqueResult();
						 * System.err.println("barCodee   "+barCodee);
						 * if(barCodee.equalsIgnoreCase(null) || barCodee.equalsIgnoreCase("") ||
						 * barCodee == null || barCodee == "") { barCodee="0"; } //Integer
						 * bar=Integer.parseInt(barCodee); //Integer barC= bar+1;
						 * System.err.println("barC - "+barCodee); billDetailsDto.setBarCode(barCodee);
						 */

					}
				}

				// ADDED BY BILAL
				// FOR SEPERATING AMOUNT OF SPONSOR AND GENERAL WHEN EDITING FROM RECEIPT
				int treatmentId = billDetailsDto.getTreatmentId();
				int patientId = billDetailsDto.getPatienttId();
				int sponsorid = billDetailsDto.getSponsorId();
				int chargesSid = billDetailsDto.getChargesSlaveId();
				String receiptOf = billDetailsDto.getReceiptOf();
				int subserviceid = 0;
				double charges = 0.0;
				double calDec = 0;
				double copycalc = 0;
				// int recSlaveId =billDetailsDto.getRecSlaveId();
				subserviceid = billDetailsDto.getSubServiceId();
				int billDetailsId = billDetailsDto.getBillDetailsId();

				if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("sponsor") && subserviceid != -1) {
					// if (sponsorid >0 && chargesSid>0 && receiptOf.equals("sponsor") && recSlaveId
					// > 0 && subserviceid != -1) {

					// GETTING CHARGES OF SERVICE
					SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
							subserviceid);
					charges = subsobj.getCharges();
					billDetailsDto.setRate(charges);

					charges = charges * billDetailsDto.getQuantity();

					calDec = (charges * billDetailsDto.getConcessionPer() / 100);
					copycalc = charges - calDec;

					billDetailsDto.setConcession(calDec);
					billDetailsDto.setAmount(charges);
					billDetailsDto.setCoPay(copycalc);

					// }else if(sponsorid >0 && chargesSid>0 && receiptOf.equals("general") &&
					// recSlaveId > 0 && subserviceid != -1){
				} else if (sponsorid > 0 && chargesSid > 0 && receiptOf.equals("general") && subserviceid != -1) {
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

					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
					charges = (Double) query.uniqueResult();
					billDetailsDto.setOtherRate(charges);

					if (charges > 0) {
						charges = charges * billDetailsDto.getQuantity();

						calDec = (charges * billDetailsDto.getConcessionPer() / 100);
						copycalc = charges - calDec;
					} else {
						charges = billDetailsDto.getOtherRate() * billDetailsDto.getQuantity();

						calDec = (charges * billDetailsDto.getConcessionPer() / 100);
						copycalc = charges - calDec;
					}

					billDetailsDto.setOtherConcession(calDec);
					billDetailsDto.setOtherAmount(charges);
					billDetailsDto.setOtherPay(copycalc);

				}

				boolean radExist = false;

				List<BillDetailsIpdDto> listCheck = new ArrayList<BillDetailsIpdDto>();
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
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
					sessionFactory.getCurrentSession().merge(billDetailsDto);

					// @codeBy : Vinod @codeDate : 25-July-2016 @codeFor : Generate service wise
					// bill id // start here
					Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(ServicewiseBillDTO.class);
					criteriaRec.add(Restrictions.eq("treatId", billDetailsDto.getTreatmentId()));
					criteriaRec.add(Restrictions.eq("patientId", billDetailsDto.getPatienttId()));
					criteriaRec.add(Restrictions.eq("serviceId", billDetailsDto.getServiceId()));
					criteriaRec.add(Restrictions.eq("unitId", billDetailsDto.getUnitId()));
					criteriaRec.add(Restrictions.eq("deptId", billDetailsDto.getDepartmentId()));
					criteriaRec.setProjection(Projections.rowCount());
					long count = (Long) criteriaRec.uniqueResult();
					if (count == 0) {

						Criteria criteriaMax = sessionFactory.getCurrentSession()
								.createCriteria(BillDetailsIpdDto.class);
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

						sessionFactory.getCurrentSession().merge(obj);
					}
				}

				if (billDetailsId > 0) {

					// Added By Bilal 01-02-2018
					SubServiceDto subsobj = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class,
							subserviceid);
					String isCombination = subsobj.getIscombination();
					if (isCombination.equals("Y")) {
						Query update = sessionFactory.getCurrentSession().createQuery(
								"update EhatOtherBillDetailForIpdDto set doctorId = :doctorId where billDetailsId= :billDetailsId  and subServiceId= :subServiceId and deleted='N' ");

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
				// setBillMasterTotalsForOpd(billDetailsDto.getTreatmentId());

			} catch (Exception e) {
				e.printStackTrace();
				return records;
			}

		}

		return records;
	}

	@Override
	public int addPathologyPackageFromIpdBilling(BillDetailsIpdDto billDetailsDto, HttpServletRequest request,
			String queryType, String module, String sampleWiseBarcodes) {

		try {

			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
			int labId = Integer.parseInt((String) resourceBundleEhat.getString("pathologyId"));// 13
			// saving records in bill details
			int businessType = billDetailsDto.getBusinessType();
			int customerType = billDetailsDto.getCustomerType();
			int customerId = billDetailsDto.getCustomerId();
			int sponsorId = billDetailsDto.getChargesSlaveId();
			int chargesSlaveId = billDetailsDto.getChargesSlaveId();
			int chslavidd = billDetailsDto.getChargesSlaveId();
			int defaultFlag = billDetailsDto.getDefaultFlag();
			int chidd = 0;
			if (chslavidd > 0) {

				chidd = 1;
			}

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			int subServId = billDetailsDto.getSubServiceId();
			int serviceId = billDetailsDto.getServiceId();

			int quantity = 1;
			int hallId = billDetailsDto.getHallId();
			int hallSlaveId = billDetailsDto.getHallSlaveId();
			// String receitpof = billDetailsDto.getReceiptOf();
			double amount = billDetailsDto.getAmount();
			double con = billDetailsDto.getConcession();
			double otheramt = billDetailsDto.getOtherAmount();
			double othercon = billDetailsDto.getOtherConcession();
			double concessionPerc = billDetailsDto.getConcessionPer();
			double actualam = amount - con;
			double actualotheramt = otheramt - othercon;

			// bill details id from other OPD bill table
			int spCount = -1;
			int hallCount = 0;

			if (hallSlaveId > 0) {

				String sqlHallCount = "SELECT count(*) FROM ehat_configuration_services where " + " is_com_servId="
						+ serviceId + " and is_com_servlastId=" + subServId + " and hallSlave_id=" + hallSlaveId
						+ " and deleted='N'";
				Query hallQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlHallCount);
				hallCount = ((Number) hallQuery.uniqueResult()).intValue();
			}

			if (hallCount <= 0)
				hallSlaveId = 0;

			if (chargesSlaveId > 0) {

				String sqlSPCount = "SELECT count(*) FROM ehat_configuration_services where " + " chargesSlave_id="
						+ chargesSlaveId + " and hallSlave_id=" + hallSlaveId + " and is_com_servId=" + serviceId
						+ " and is_com_servlastId=" + subServId + " and deleted='N'";
				Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlSPCount);
				spCount = ((Number) spQuery.uniqueResult()).intValue();
			}

			if (spCount <= 0)
				chargesSlaveId = 0;

			int res = 0;
			if (hallSlaveId > 0 && spCount == 0 && defaultFlag == 0) {

				res = 44;
				return res;
			}

			if (hallSlaveId == 0 && defaultFlag == 0) {
				res = 22;

				if (spCount == 0)
					res = 33;

				return res;
			}

			// Save package service
			billDetailsDto.setSponsorId(chidd);
			billDetailsDto.setChargesSlaveId(chslavidd);
			BillDetailsIpdDto savedObj = (BillDetailsIpdDto) sessionFactory.getCurrentSession().merge(billDetailsDto);
			Integer maxBillId = savedObj.getBillDetailsId();

			if (maxBillId == null) {
				maxBillId = 0;
			}

			String sql22 = "SELECT service_id , charges , iscombination , totalcharges FROM ehat_configuration_services where "
					+ " chargesSlave_id=" + chargesSlaveId + " and is_com_servId=" + serviceId
					+ " and is_com_servlastId=" + subServId
					// + " and hall_id=" + hallId
					+ " and hallSlave_id=" + hallSlaveId + " and deleted='N'";

			SQLQuery query222 = sessionFactory.getCurrentSession().createSQLQuery(sql22);
			query222.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data22 = query222.list();
			for (Map<String, Object> row22 : data22) {

				// setting service id in other bill details table
				Integer subId = (Integer) row22.get("service_id");
				SubServiceDto obje = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, subId);

				int testServiceId = obje.getServiceId();
				
				String sql = "select count(*) from pathology_labprofile where subservice_id ="+subId+" and profileStatus = 'Y' ";
				SQLQuery sqlres = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int cnt = ((Number) sqlres.uniqueResult()).intValue();

				if (testServiceId != labId || cnt == 0) {

					EhatOtherBillDetailForIpdDto obj = new EhatOtherBillDetailForIpdDto();
					
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
					
					double totalAmtndConAmt=charges;
					double totalAmtndConAmtSponsor=chargessposor;
					double concessionDistribute=0;
					

					// distributed amount formula
					double IncDecp = charges * 100 / totalcharges;
					charges = IncDecp * actualam / 100;
					charges = totalAmtndConAmt;
					obj.setRate(charges);

					// distributed amount formula for sponsor charges
					double IncDecp2 = chargessposor * 100 / totalcharges;
					chargessposor = IncDecp2 * actualotheramt / 100;
					
					concessionDistribute=totalAmtndConAmtSponsor-chargessposor;
					
					chargessposor = totalAmtndConAmtSponsor;
					obj.setOtherRate(chargessposor);

					amountofconsponsor = chargessposor * quantity;
					otherpay = chargessposor * quantity - concession;
					othercopay = amountofconsponsor - otherpay;

					obj.setOtherAmount(amountofconsponsor);
					obj.setOtherPay(otherpay);
					obj.setOtherCoPay(othercopay);
					obj.setOtherConcession(concessionDistribute);
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
					obj.setConcessionPer(concessionPerc);
					obj.setOtherCoPay(amountofconsponsor-concessionDistribute);

					amountofcon = charges * quantity;
					copay = charges * quantity - concession;
					pay = amountofcon - copay;

					obj.setAmount(amountofcon);
					obj.setCoPay(amountofconsponsor-concessionDistribute);
					obj.setPay(pay);
					obj.setConcession(concessionDistribute);
					obj.setQuantity(quantity);
					obj.setIscombination(iscombinationflag);
					obj.setChildServiceId(obje.getServiceId());
					obj.setSelfid(0);

					sessionFactory.getCurrentSession().merge(obj);
				} else {

					PathologySampleWiseMaster master = (PathologySampleWiseMaster) ConfigUIJSONUtility
							.getObjectFromJSON(sampleWiseBarcodes, PathologySampleWiseMaster.class);
					List<PathologySampleWiseMaster> barcodeList = master.getLabSampleWiseMasterDtoList();

					String query1 = "";
					if (businessType == 1) {

						query1 = "SELECT c.service_id , c.charges , c.iscombination , c.totalcharges, ifnull(p.template_wise,'N') as template_wise FROM lab_charges_configuration c, pathology_labprofile p where "
								+ "(c.service_id = p.subservice_id) and c.charges_id=" + sponsorId
								+ " and c.chargesSlave_id=" + chargesSlaveId + " and c.is_com_servId=" + serviceId
								+ " and is_com_servlastId=" + subServId + " and c.hall_id=" + hallId
								+ " and c.hallSlave_id=" + hallSlaveId + " and c.customer_type=" + customerType
								+ " and c.customer_name=" + customerId + " and c.deleted='N' ";

					} else {

						query1 = "SELECT c.service_id , c.charges , c.iscombination , c.totalcharges, ifnull(p.template_wise,'N') as template_wise, ifnull(p.idTestSample,0) as sample_type_id  FROM ehat_configuration_services c, pathology_labprofile p where "
								+ "(c.service_id = p.subservice_id) and c.chargesSlave_id=" + chargesSlaveId
								+ " and c.is_com_servId=" + serviceId + " and is_com_servlastId=" + subServId
								+ " and c.hallSlave_id=" + hallSlaveId + " and c.deleted='N' and c.service_id=" + subId;

					}

					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> data = query.list();
					for (Map<String, Object> row : data) {

						EhatOtherBillDetailForIpdDto obj = new EhatOtherBillDetailForIpdDto();

						Integer subServiceId = (Integer) row.get("service_id");
						Integer sampleTypeId = ((Number) row.get("sample_type_id")).intValue();

						int lenghtCount = ((Number) sessionFactory.getCurrentSession()
								.createSQLQuery("select fn_get_inouthouse_count(" + labId + "," + subServiceId + ")")
								.uniqueResult()).intValue();
						int setValue = 0;

						int lenghtSub = 0;
						if (lenghtCount == 1) {
							lenghtSub = 0;
							setValue = 0;
						} else if (lenghtCount == 2) {
							lenghtSub = 0;
							setValue = 1;
						} else if (lenghtCount == 3) {
							lenghtSub = 1;
							setValue = 3;
						}

						for (int iii = 0; iii <= lenghtSub; iii++) {

							String barcode = "0";

							/*
							 * for(PathologySampleWiseMaster dto : barcodeList) {
							 * if(subServiceId.equals(dto.getSubServiceId())) { barcode = dto.getBarCode();
							 * sampleTypeId = dto.getSampleTypeId(); } }
							 */
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
							double otherpay = 0;
							double othercopay = 0;
							String iscombinationflag = (String) row.get("iscombination");
							double totalcharges = (Double) row.get("totalcharges");
							
							double concessionDistribute=0;
							double otheramountCharges= charges;

							double IncDecp2 = 0;
							double IncDecp = 0;
							// modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition
							// apply
							if (!Double.isNaN(charges) && charges != 0.0) {

								IncDecp = charges * 100 / totalcharges;
								charges = IncDecp * actualam / 100;
								charges = otheramountCharges;
								obj.setRate(charges);

							} else {

								IncDecp = 0;
								obj.setRate(0);
							}

							// distributed amount formula for sponsor charges
							// modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition
							// apply
							if (!Double.isNaN(chargessposor) && chargessposor != 0.0) {

								IncDecp2 = chargessposor * 100 / totalcharges;
								chargessposor = IncDecp2 * actualotheramt / 100;
								
								concessionDistribute=(otheramountCharges-chargessposor);
								chargessposor = otheramountCharges;
								obj.setOtherRate(chargessposor);

								amountofconsponsor = chargessposor * quantity;
								otherpay = chargessposor * quantity - concession;
								othercopay = amountofconsponsor - otherpay;

								obj.setOtherAmount(amountofconsponsor);
								obj.setOtherPay(otherpay);
								obj.setOtherCoPay(amountofconsponsor-concessionDistribute);
								obj.setOtherConcession(concessionDistribute);
								obj.setConcessionPer(concessionPerc);
							} else {

								IncDecp2 = 0.0;
								obj.setOtherRate(chargessposor);
								obj.setOtherAmount(0);
								obj.setOtherPay(0);
								obj.setOtherCoPay(0);
							}

//							obj.setOtherConcession(concession);
							//obj.setOtherConcession(concessionDistribute);
							obj.setChildSubServiceId((Integer) row.get("service_id"));

							String templateWise = (String) row.get("template_wise");
							if (!templateWise.equalsIgnoreCase("Y")) {

								obj.setTemplateWise("N");
							} else {
								obj.setTemplateWise(templateWise);
							}

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
							// modify by ajay:27-06-2019 handle NaN condition if charges is 0 then condition
							// apply
							if (!Double.isNaN(charges) && charges != 0.0) {

								amountofcon = charges * quantity;
								copay = charges * quantity - concession;
								pay = amountofcon - copay;
								obj.setAmount(amountofcon);
								obj.setCoPay(copay);
								obj.setPay(pay);
							} else {
								obj.setAmount(0);
								obj.setCoPay(0);
								obj.setPay(0);

							}
							obj.setConcession(concessionDistribute);
							obj.setQuantity(quantity);
							obj.setIscombination(iscombinationflag);

							if (setValue == 3) {

								obj.setInOutHouse(iii);
								if (iii == 1) {
									obj.setRate(0);
									obj.setConcession(0);
									obj.setAmount(0);
									obj.setCoPay(0);
									obj.setOtherRate(0);
									obj.setOtherConcession(0);
									obj.setOtherAmount(0);
									obj.setOtherPay(0);
								}

							} else {
								obj.setInOutHouse(setValue);
							}

							obj.setChildServiceId(testServiceId);
							obj.setSelfid(0);
							sessionFactory.getCurrentSession().merge(obj);
							
						
						}
					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public String deleteservdetailsPreviousOPD(String labservicelist, HttpServletRequest request) {

		HttpSession session = request.getSession();
		String userType = (String) session.getAttribute("userType");// get user Type which is login
		Integer userId = (Integer) session.getAttribute("userId1");// Get user id from session
		String[] ary = labservicelist.split(",");
		String res = "";
		int count = 0;
		for (int i = 0; i < ary.length; i++) {

			BillDetailsDto billDetailsDto = new BillDetailsDto();
			billDetailsDto = (BillDetailsDto) sessionFactory.getCurrentSession().get(BillDetailsDto.class,
					Integer.parseInt(ary[i]));
			
			if(billDetailsDto.getServiceId() == 11) {
			String sql = "select count(*) from pathology_sample_wise_master where bil_det_id in (" + billDetailsDto.getBillDetailsId()	+ ") and test_status >=3";
			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count1 = ((Number) q.uniqueResult()).intValue();
			if(count1 == 0) {
					if (billDetailsDto.getPaidFlag().equalsIgnoreCase("N") && userType.equalsIgnoreCase("Admin")) {
						billDetailsDto.setDeleted("Y");
						billDetailsDto.setDeletedBy(userId);
						billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
						billDetailsDto.setDeleteFrom("OPDPrevious");
						
						// delete test from pathology_sample_wise_slave slave
						 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+Integer.parseInt(ary[i]);
						 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
						 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
						 if(masterCount > 0) {
							String sqlM="select id from pathology_sample_wise_master where bil_det_id="+Integer.parseInt(ary[i]);
							Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
							String  masterIds = ((String) refQuery.uniqueResult());
							
							String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='Y' where master_id in ("+masterIds+") ";
							Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
							qUpdate.executeUpdate();
						 }
						
					}else {
							if (count == 0) {
								res = ary[i];
								count++;
							} else {
								res = res + "," + ary[i];
							}
		            }
				
				
			} else {
						if (count == 0) {
							res = ary[i];
							count++;
						} else {
							res = res + "," + ary[i];
						}
		    }
			
			
			}
			
			// added for package delete 
			if(billDetailsDto.getServiceId() == 13) {
						
						String sql = "select count(*) from pathology_sample_wise_master where bil_det_id in (" + billDetailsDto.getBillDetailsId()	+ ") and test_status >=3";
						SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
						int count1 = ((Number) q.uniqueResult()).intValue();
						
						DateFormat datef = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						Calendar todaydate = Calendar.getInstance();
						String todays_date_time = datef.format(todaydate.getTime());
							if(count1 == 0) {
								if (billDetailsDto.getPaidFlag().equalsIgnoreCase("N") && userType.equalsIgnoreCase("Admin")) {
								// delete from  ehat_bill_details
									Query query1 = sessionFactory.getCurrentSession()
											.createSQLQuery(" update ehat_bill_details set deleted ='Y'" + " , deleted_by ='"
													+ userId + "' , deleted_date_time ='" + todays_date_time
													+ "' where treatment_id = :treatmentId and bill_details_id = :billdetailsid ");
									query1.setParameter("treatmentId", billDetailsDto.getTreatmentId());
									query1.setParameter("billdetailsid", billDetailsDto.getBillDetailsId());
									 
									query1.executeUpdate();
									 // delete or cancel package test from ehat_other_bill_detail_for_opd related package
									Query query = sessionFactory.getCurrentSession()
											.createSQLQuery(" update ehat_other_bill_detail_for_opd set deleted ='Y'" + " , deleted_by ='"
													+ userId + "' , deleted_date_time ='" + todays_date_time
													+ "' where treatment_id = :treatmentId and bill_details_id = :billdetailsid and service_id = :serviceId");
									query.setParameter("treatmentId", billDetailsDto.getTreatmentId());
									query.setParameter("billdetailsid", billDetailsDto.getBillDetailsId());
									query.setParameter("serviceId", billDetailsDto.getServiceId());
									query.executeUpdate();
									
									// delete test from pathology_sample_wise_slave slave
									
									 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+Integer.parseInt(ary[i]);
									 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
									 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
									
									 if(masterCount > 0) {
									String sqlM="select group_concat(id) from pathology_sample_wise_master where bil_det_id="+Integer.parseInt(ary[i]);
									Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
									String  masterIds = ((String) refQuery.uniqueResult());
									
									String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='Y' where master_id in ("+masterIds+") ";
									Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
									qUpdate.executeUpdate();
									 }
									
									
								}else {
									if (count == 0) {
										res = ary[i];
										count++;
									} else {
										res = res + "," + ary[i];
									}
								 }
						} else {
								if (count == 0) {
									res = ary[i];
									count++;
								} else {
									res = res + "," + ary[i];
								}
						}
						
						
				
			  }
			
			// added for Investigation Test 
			 if(billDetailsDto.getServiceId() ==12) {
				 if (billDetailsDto.getPaidFlag().equalsIgnoreCase("N") && userType.equalsIgnoreCase("Admin")) {
						billDetailsDto.setDeleted("Y");
						billDetailsDto.setDeletedBy(userId);
						billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
						billDetailsDto.setDeleteFrom("OPDPrevious");
					}else {
							if (count == 0) {
								res = ary[i];
								count++;
							} else {
								res = res + "," + ary[i];
							}
		            }
			 }

			return res;

		}

		return res;
	}

	@Override
	public int canclePreviousServices(String servId, String tretId, String cancleType, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String userType = (String) session.getAttribute("userType");// get user Type which is login
		Integer uid = (Integer) session.getAttribute("userId1");// Get user id from session

		DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
		String todays_date_time = dateFormat1.format(currentDate1.getTime());

		String flag = "N";
		String[] ary = servId.split(",");
		try {
			/*
			 * for (int i = 0; i < ary.length; i++) { System.err.println("kishor"+ary[i]);
			 */
			int testStatus = 0;

			String sqlCount = "select count(*) from pathology_sample_wise_master where treatment_id="
					+ Integer.parseInt(tretId.trim()) + " and bil_det_id=" + Integer.parseInt(servId.trim());
			Query refQueryCount = sessionFactory.getCurrentSession().createSQLQuery(sqlCount);
			int count = ((Number) refQueryCount.uniqueResult()).intValue();
			if (count > 0) {
				String sqlRef = "select ifnull(test_status,0) from pathology_sample_wise_master where treatment_id="
						+ Integer.parseInt(tretId.trim()) + " and bil_det_id=" + Integer.parseInt(servId.trim());
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				testStatus = ((Number) refQuery.uniqueResult()).intValue();
			}
			if (testStatus <= 2) {
				System.err.println("cancleType====>" + cancleType);
				BillDetailsDto billDetailsDto = new BillDetailsDto();
				billDetailsDto = (BillDetailsDto) sessionFactory.getCurrentSession().get(BillDetailsDto.class,
						Integer.parseInt(servId.trim()));
				if (billDetailsDto.getPaidFlag().equalsIgnoreCase("N") && userType.equalsIgnoreCase("Admin")) {
					Query query = sessionFactory.getCurrentSession()
							.createSQLQuery("update ehat_bill_details set cancle = '" + cancleType + "',canceled_by = "
									+ uid + ", canceled_date_time = '" + todays_date_time
									+ "' where treatment_id = :treatmentid and bill_details_id =:serviceid");
					query.setParameter("treatmentid", tretId);
					query.setParameter("serviceid", servId);
					int result = query.executeUpdate();
					// if(tretId != null || !(tretId.equals("")))
					// setBillMasterTotalsForOpd(Integer.parseInt(tretId));
				} else {
					return 4;
				}

			} else {

				return 3;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		return 1;
	}

	// created by Rohini Ambhore for delete test from lis.

	public boolean deleteLabPackageTestFromLis(int treatid, int subserviceid, int billdetailsid, int userId) {

		boolean testupdate = false;
		try {
			DateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar currentdate = Calendar.getInstance();
			String todays_date_time = dateformat.format(currentdate.getTime());

			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery(" update pathology_sample_wise_master set deleted ='Y' " + " , deleted_by = '"
							+ userId + "' , deleted_date ='" + todays_date_time
							+ "' where treatment_id = :treatmentid and sub_service_id = :subserviceid and bil_det_id = :billdetailsid ");
			query.setParameter("treatmentid", treatid);
			query.setParameter("subserviceid", subserviceid);
			query.setParameter("billdetailsid", billdetailsid);
			query.executeUpdate();
			testupdate = true;

		} catch (Exception e) {
			e.printStackTrace();
			Log.error("......deleteLabPackageTestFromLis........errorr.." + e);

		}

		return testupdate;
	}

	// Added by Rohini Ambhore for package delete.
	/**
	 * @author TUSHAR JADHAV
	 * @param MODIFY : after LIS accessing should not be deleted PKG
	 * @since 14 AUG 2023
	 */
	public int deleteServDetailsOfPackage(int treatmentId, int serviceId, int billdetailsid, int userId) {

		int res = 0;
		try {
			String sql = "select count(*) from pathology_sample_wise_master where bil_det_id in (" + billdetailsid
					+ ") and test_status >=3";
			SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number) q.uniqueResult()).intValue();

			if (count > 0) {
				res = 3;
			} else {
				DateFormat datef = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Calendar todaydate = Calendar.getInstance();
				String todays_date_time = datef.format(todaydate.getTime());
				// delete from  ehat_bill_details
				Query query1 = sessionFactory.getCurrentSession()
						.createSQLQuery(" update ehat_bill_details set deleted ='Y'" + " , deleted_by ='"
								+ userId + "' , deleted_date_time ='" + todays_date_time
								+ "' where treatment_id = :treatmentId and bill_details_id = :billdetailsid ");
				query1.setParameter("treatmentId", treatmentId);
				query1.setParameter("billdetailsid", billdetailsid);
				 
				query1.executeUpdate();
				 // delete or cancel package test from ehat_other_bill_detail_for_opd related package
				Query query = sessionFactory.getCurrentSession()
						.createSQLQuery(" update ehat_other_bill_detail_for_opd set deleted ='Y'" + " , deleted_by ='"
								+ userId + "' , deleted_date_time ='" + todays_date_time
								+ "' where treatment_id = :treatmentId and bill_details_id = :billdetailsid and service_id = :serviceId");
				query.setParameter("treatmentId", treatmentId);
				query.setParameter("billdetailsid", billdetailsid);
				query.setParameter("serviceId", serviceId);
				query.executeUpdate();

				res = 1;
				
				
				// delete test from pathology_sample_wise_slave slave
				
				 String sqlMCount= " Select count(*) from pathology_sample_wise_master where bil_det_id="+billdetailsid;
				 Query qCount = sessionFactory.getCurrentSession().createSQLQuery(sqlMCount);
				 int  masterCount = ((Number) qCount.uniqueResult()).intValue();
				
				 if(masterCount > 0) {
						String sqlM="select group_concat(id) from pathology_sample_wise_master where bil_det_id="+billdetailsid;
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlM);
						String  masterIds = ((String) refQuery.uniqueResult());
						
						String deletePathoSlaveSql="update pathology_sample_wise_slave set test_flag='Y' where master_id in ("+masterIds+") ";
						Query qUpdate = sessionFactory.getCurrentSession().createSQLQuery(deletePathoSlaveSql);
						qUpdate.executeUpdate();
				 }

			}

		} catch (Exception e) {
			e.printStackTrace();
			Log.error(".....deleteServDetailsOfPackage method error", e);
		}
		return res;

	}

	@Override
	public int cancelLabTestCheckService(String servId, String tretId, String cancleType, Integer uid) {

		DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
		String todays_date_time = dateFormat1.format(currentDate1.getTime());
		int testStatus = 0;
		int testResultCount = 0;

		String flag = "N";
		String[] ary = servId.split(",");
		try {

			String sqlRef3 = "select ifnull(service_id,0) from ehat_bill_details where bill_details_id="
					+ Integer.parseInt(servId.trim());
			Query refQuery3 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef3);
			int serviceId = ((Number) refQuery3.uniqueResult()).intValue();

			String sqlRef4 = "select ifnull(sub_service_id,0) from ehat_bill_details where bill_details_id="
					+ Integer.parseInt(servId.trim());
			Query refQuery4 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef4);
			int SubserviceId = ((Number) refQuery4.uniqueResult()).intValue();

			if (serviceId == 11 || serviceId == 13) {

				String sqlRef = "select count(*) from pathology_sample_wise_master where treatment_id="
						+ Integer.parseInt(tretId.trim()) + " and bil_det_id=" + Integer.parseInt(servId.trim());
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				testResultCount = ((Number) refQuery.uniqueResult()).intValue();

				if (testResultCount > 0) {

					if (serviceId == 13) {

						int pkgTestStatus = 0;
						int pkgCount = 0;
						String sqlRef2 = "select ifnull(test_status,0) as testResult from pathology_sample_wise_master where treatment_id="
								+ Integer.parseInt(tretId.trim()) + " and bil_det_id="
								+ Integer.parseInt(servId.trim());
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
						query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> data1 = query1.list();

						for (Map<String, Object> row : data1) {

							pkgTestStatus = ((Number) row.get("testResult")).intValue();

							if (pkgTestStatus > 2)
								pkgCount++;
						}

						if (pkgCount > 0)
							testStatus = 3;

					} else {

						String sqlRef2 = "select ifnull(test_status,0) from pathology_sample_wise_master where treatment_id="
								+ Integer.parseInt(tretId.trim()) + " and bil_det_id="
								+ Integer.parseInt(servId.trim());
						Query refQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sqlRef2);
						testStatus = ((Number) refQuery2.uniqueResult()).intValue();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return testStatus;
	}
	
	

}