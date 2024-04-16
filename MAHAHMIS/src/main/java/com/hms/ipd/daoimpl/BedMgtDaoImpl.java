package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.text.SimpleDateFormat;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.Beds;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.MasterConfigDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipd.dao.BedMgtDao;
import com.hms.ipd.dto.PatientBedInfoDTO;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.registration.dto.PatientConsultationChargesDto;
import com.hms.registration.dto.PatientRegChargesDto;
import com.hms.registration.dto.PrefixDto;
import com.hms.utility.SendSMSAllFormat;

@Repository
public class BedMgtDaoImpl implements BedMgtDao {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired 
	SessionFactory sessionFactory;
	
	@Override
	public PatientHeaderInfoDto getIpdPatientHeaderInfo(int treatmentId, int unitId) {

		LOGGER.info("In BedMgtDaoImpl getIpdPatientHeaderInfo()");
		Session s = sessionFactory.getCurrentSession();
		PatientHeaderInfoDto objDto = new PatientHeaderInfoDto();
		try {
			
			Query querySp = s.createSQLQuery("call sp_ipd_bill_get_patient_info_by_treatment_id(:treatmentId, :unitId)");
			querySp.setParameter("treatmentId", treatmentId);
			querySp.setParameter("unitId", unitId);
			querySp.setResultTransformer(new AliasToBeanResultTransformer(PatientHeaderInfoDto.class));
			@SuppressWarnings("unchecked")
			List<PatientHeaderInfoDto> lstOpdQueueDto = querySp.list();		
			objDto.setListRegTreBillDto(lstOpdQueueDto);
			LOGGER.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public ChargesMasterSlave getWardTypeList(int hallTypeId) {
		
		LOGGER.info("In BedMgtDaoImpl getWardTypeList()");
		List<ChargesMasterSlave> ltChargesSlave = null;
		ChargesMasterSlave objSlave = new ChargesMasterSlave();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			if(hallTypeId > 0) {
				criteria.add(Restrictions.eq("isCategory", "N"));
				criteria.add(Restrictions.eq("selfId", hallTypeId));
			}else {
				criteria.add(Restrictions.eq("isCategory", "Y"));
			}
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 2));
			ltChargesSlave = criteria.list();
			objSlave.setLstChargesSlave(ltChargesSlave);
			
		} catch (Exception e) {
			e.printStackTrace();
			return objSlave;
		}
		return objSlave;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public PatientBedInfoDTO getPatientBedDetails(int chargesSlaveId, int hallId, String callFrom, int unitId) {
		
		LOGGER.info("In BedMgtDaoImpl getPatientBedDetails()");
		List<PatientBedInfoDTO> lstBedPatientDetailsDto = new ArrayList<PatientBedInfoDTO>();
		PatientBedInfoDTO obj = new PatientBedInfoDTO();
		
		try {
			Query q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_fetch_patient_bed_details(:chargesSlaveId, :hallId, :unitId)");
			q.setResultTransformer(Transformers.aliasToBean(PatientBedInfoDTO.class));
			q.setParameter("chargesSlaveId", chargesSlaveId);
			q.setParameter("hallId", hallId);
			q.setParameter("unitId", unitId);
			lstBedPatientDetailsDto = q.list();
			obj.setLstPatientBedInfoDTO(lstBedPatientDetailsDto);
			LOGGER.debug("Response--------> "+lstBedPatientDetailsDto);

		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		}
		return obj;
	}
	
	// Function to get administrative charges
	@Override
	public double getAdminChargesIpd(int unitId,int depId) {
		
		LOGGER.info("In BedMgtDaoImpl getAdminChargesIpd()");
		double adminCharges = 0;
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int servId = Integer.parseInt(resourceBundleEhat.getObject("adminServId").toString());
			int subServId = Integer.parseInt(resourceBundleEhat.getObject("adminSubServId").toString());			
			
			String sqlFlag = "select ifnull(admin_charges_flag,'servicewise') from hospitalaccinfo where idhospitalAccInfo=1";
			Query flagQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlFlag);		
			String adminChargesFlag = (String) flagQuery.uniqueResult();
			
			if(adminChargesFlag.equals("fixed")){
				
				String sqlAdminChrg = "select ifnull(administrativeCharge,0) from hospitalaccinfo where idhospitalAccInfo=1";
				Query adminQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlAdminChrg);		
				adminCharges = (Float) adminQuery.uniqueResult();					
				 
			}else{						
				
				if(masterConfigAccess(unitId,depId,servId)){
					
					SubServiceDto subService = (SubServiceDto)sessionFactory.getCurrentSession().get(SubServiceDto.class,subServId);
					adminCharges = subService.getCharges();		
					
				}else {
					
					adminCharges = 0;
				}
			}
			
			LOGGER.debug("Response--------> "+adminCharges);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return 0;
		}
		return adminCharges;
	}
	
	@Override
	public synchronized int allocateBedToPatient(TreatMentBeds treatmentBeds) {

		LOGGER.info("In BedMgtDaoImpl allocateBedToPatient()");
		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = bundle.getObject("hospitalname").toString();
		long isBedAllocatedCount = 0;
		int result = 0;
		try {
			int patientId = treatmentBeds.getLstBillDetailsIpd().get(0).getPatienttId();
			int treatmentId = treatmentBeds.getTreatmentId();
			int billId = treatmentBeds.getLstBillDetailsIpd().get(0).getBillId();
			int chargesSlaveId = treatmentBeds.getLstBillDetailsIpd().get(0).getChargesSlaveId();
			int bedId = treatmentBeds.getBedId();
			int treatBedsId = treatmentBeds.getTreatBedsId();
			//int deallocBedId = treatmentBeds.getDeallocBedId();
			
			// Check call is from bed shift
			if(treatBedsId > 0) {
				
				/*TreatMentBeds objToDelloc = (TreatMentBeds)sessionFactory.getCurrentSession().get(TreatMentBeds.class, treatBedsId);
				objToDelloc.setStatus("N");
				objToDelloc.setShifted_By(String.valueOf(treatmentBeds.getCreatedBy()));
				objToDelloc.setShifted_date_time(new Date());
				
				objToDelloc.getLstBillDetailsIpd().get(0).setOnBedFlag('N');
				objToDelloc.getLstBillDetailsIpd().get(1).setOnBedFlag('N');
				
				// Update bed state after deallocate bed
		    	Beds b = (Beds) sessionFactory.getCurrentSession().get(Beds.class, objToDelloc.getBedId());
		    	b.setBedstate("2");
		    	b.setUpdatedBy(treatmentBeds.getCreatedBy());
		    	b.setUpdatedDate(new Date());*/				
			}
			
			Criteria criteriaRec = sessionFactory.getCurrentSession().createCriteria(TreatMentBeds.class);			
			criteriaRec.add(Restrictions.disjunction().add(Restrictions.eq("treatmentId", treatmentId)).add(Restrictions.eq("bedId", bedId)));
			criteriaRec.add(Restrictions.eq("status", "Y"));
			if(treatBedsId > 0)
				criteriaRec.add(Restrictions.not(Restrictions.eq("id", treatBedsId)));				
			criteriaRec.setProjection(Projections.rowCount());	
			isBedAllocatedCount = (Long)criteriaRec.uniqueResult();		
			
		    if(isBedAllocatedCount == 0) {
		    	
		    	if(!(treatBedsId > 0)) {
		    		
		    		String sql2="select ifnull(count(*),0) from ehat_treatment where deleted='N' and patient_id = "+patientId;
					Query refQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql2);		
					int treatCount = ((Number)refQueryIpd.uniqueResult()).intValue(); 
					
					if(treatCount > 1) {
						
						// Save registration and consultation charges
						// this code is for particular hospital
						
						if(hospitalName.equalsIgnoreCase("Vatsalya")) {
							saveBillDetailsIpd(patientId,treatmentId,billId,treatmentBeds.getUnitId(),
					    			chargesSlaveId,treatmentBeds.getCreatedBy(),"insert",bedId);
						}else {
							saveBillDetailsIpd(patientId,treatmentId,billId,treatmentBeds.getUnitId(),
					    			chargesSlaveId,treatmentBeds.getCreatedBy(),"markvisit",bedId);
						}
					    	
						if(hospitalName.equalsIgnoreCase("vatsalya")) {
					    	saveBMWCharges(patientId,treatmentId,billId,treatmentBeds.getUnitId(),
					    			chargesSlaveId,treatmentBeds.getCreatedBy(),"insert",bedId);
						}
					}else {						
						
						// Save registration and consultation charges
				    	saveBillDetailsIpd(patientId,treatmentId,billId,treatmentBeds.getUnitId(),
				    			chargesSlaveId,treatmentBeds.getCreatedBy(),"insert",bedId);
				    	
				    	if(hospitalName.equalsIgnoreCase("vatsalya")) {
				    		saveBMWCharges(patientId,treatmentId,billId,treatmentBeds.getUnitId(),
				    			chargesSlaveId,treatmentBeds.getCreatedBy(),"insert",bedId);
				    	}
					}
		    	}else {
		    		
		    		//check for bed shift charges
					if (hospitalName.equalsIgnoreCase("Siddhivinayak")) {
						checkChargesBillingForBed(treatmentBeds);
					}
		    		
		    		Query prefixSp = sessionFactory.getCurrentSession().createSQLQuery("call sp_update_beds_details(:treatBedsId,:userId)");
					prefixSp.setParameter("treatBedsId", treatBedsId);
					prefixSp.setParameter("userId", treatmentBeds.getCreatedBy());
					prefixSp.executeUpdate();
		    	}
		    	
		    	// Save bed allocation details
		    	sessionFactory.getCurrentSession().merge(treatmentBeds);
		    	
		    	// Update bed state after allocate bed
		    	Beds b = (Beds) sessionFactory.getCurrentSession().get(Beds.class, bedId);
		    	b.setBedstate("3");
		    	b.setUpdatedBy(treatmentBeds.getCreatedBy());
		    	b.setUpdatedDate(new Date());
		    	
		    	// Update total bill in bill master
		    	setTotalBillAmount(treatmentId,billId);
		    	
		    	if(treatBedsId > 0)
		    		result = 3;// For bed shift
		    	else
		    		result = 1;// For bed allocate
		    }else {
		    	result = 2;// For bed already allocated
		    }
		    LOGGER.debug("Response--------> "+result);
		    
		} catch (Exception e) {

			e.printStackTrace();
			LOGGER.error(e.getMessage());
			result = -1;
		}
		return result;		
	}

	//added by vishant
	@SuppressWarnings("unchecked")
	private void checkChargesBillingForBed(TreatMentBeds treatmentBeds) {

		List<BillDetailsIpdDto> lstBillDetailsIpd = treatmentBeds.getLstBillDetailsIpd();
		List<BillDetailsIpdDto> listDB = new ArrayList<BillDetailsIpdDto>();

		/*
		 * Criteria criteriaRec =
		 * sessionFactory.getCurrentSession().createCriteria(TreatMentBeds.class);
		 * criteriaRec.add(Restrictions.disjunction().add(Restrictions.eq("treatmentId",
		 * treatmentBeds.getTreatmentId())) .add(Restrictions.eq("bedId",
		 * treatmentBeds.getBedId()))); criteriaRec.add(Restrictions.eq("status", "Y"));
		 * criteriaRec.setProjection(Projections.rowCount()); long isBedAllocatedCount =
		 * (Long) criteriaRec.uniqueResult();
		 */
		//if (isBedAllocatedCount == 0) {
			try {
				
				TreatMentBeds objToDelloc = (TreatMentBeds)sessionFactory.getCurrentSession().get(TreatMentBeds.class, treatmentBeds.getTreatBedsId());
				List<BillDetailsIpdDto> listDB2 = objToDelloc.getLstBillDetailsIpd();
				
				/*
				 * List<BillDetailsIpdDto> listDB2 = sessionFactory.getCurrentSession()
				 * .createCriteria(BillDetailsIpdDto.class) .add(Restrictions.eq("treatmentId",
				 * treatmentBeds.getTreatmentId())) .add(Restrictions.eq("serviceId", 3))
				 * .add(Restrictions.eq("deleted", "N")) .add(Restrictions.eq("onBedFlag",
				 * 'Y')).list();
				 */
				if (listDB2.size() > 0) {

					listDB2.get(0).setOnBedFlag('N');
					listDB2.get(1).setOnBedFlag('N');
					// code for if shift bed multiple time at one day and previous charge is zero
					double quantity2 = listDB2.get(0).getQuantity();
					if (quantity2 == 0) {
//					and (amount!=0 or other_amount!=0)
						String sql = "select ifnull(max(bill_details_id),0) from ehat_bill_details_ipd where treatment_id="
								+ treatmentBeds.getTreatmentId() + " and service_id=3 "
								+ " and on_bed_flag='N' and deleted='N' and amount!=0 and sub_service_id!=0 and CAST(created_date_time as date)=CURDATE()  order by(amount) desc";

						SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						Integer billDetailsId = ((Number) createSQLQuery.uniqueResult()).intValue();
						if (billDetailsId == 0) {

							String sql2 = "select ifnull(max(bill_details_id),0) from ehat_bill_details_ipd where treatment_id="
									+ treatmentBeds.getTreatmentId() + " and service_id=3 "
									+ " and on_bed_flag='N' and deleted='N' and amount!=0 and sub_service_id!=0 order by(amount) desc";

							createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							billDetailsId = ((Number) createSQLQuery.uniqueResult()).intValue();

						}
						Integer nursingBillDetailsId = billDetailsId + 1;
						Integer arr[] = new Integer[2];
						arr[0] = billDetailsId;
						arr[1] = nursingBillDetailsId;
						listDB = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class)
								.add(Restrictions.in("billDetailsId", arr)).list();
					} else {

						listDB.addAll(listDB2);

					}

					if (listDB.get(0).getChargesSlaveId() > 0) {

						double rate = listDB.get(0).getOtherRate();
						double quantity = listDB.get(0).getQuantity();
						Double amount = listDB.get(0).getOtherAmount();

						Double newWardRate = lstBillDetailsIpd.get(0).getOtherRate();
						if (rate <= newWardRate) {

							if (quantity != 0) {
								listDB.get(0).setQuantity(quantity - 1);
								listDB.get(0).setOtherAmount(amount - rate);
								listDB.get(0).setOtherCoPay(amount - rate);
								listDB.get(0).setCoPay(amount - rate);
								listDB.get(0).setOtherPay(amount - rate);

								// nursing charges check
								if (listDB.get(1).getSubServiceId() == 0) {

									double nursingRate = listDB.get(1).getOtherRate();
									double nursingQuantity = listDB.get(1).getQuantity();
									Double nursingAmount = listDB.get(1).getOtherAmount();

									listDB.get(1).setQuantity(nursingQuantity - 1);
									listDB.get(1).setOtherAmount(nursingAmount - nursingRate);
									listDB.get(1).setOtherCoPay(nursingAmount - nursingRate);
									listDB.get(1).setCoPay(nursingAmount - nursingRate);
									listDB.get(1).setOtherPay(amount - rate);

								}
							}
							
							for (BillDetailsIpdDto billDetailsIpdDto : listDB) {
								
								sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
							}
							//sessionFactory.getCurrentSession().merge(listDB);

						} else {

							lstBillDetailsIpd.get(0).setOtherAmount(0.0);
							lstBillDetailsIpd.get(0).setOtherCoPay(0.0);
							lstBillDetailsIpd.get(0).setQuantity(0);
							lstBillDetailsIpd.get(0).setOtherPay(0.0);

							lstBillDetailsIpd.get(1).setOtherAmount(0.0);
							lstBillDetailsIpd.get(1).setOtherCoPay(0.0);
							lstBillDetailsIpd.get(1).setQuantity(0);
							lstBillDetailsIpd.get(1).setOtherPay(0.0);

							lstBillDetailsIpd.get(0).setAmount(0.0);
							lstBillDetailsIpd.get(0).setCoPay(0.0);
							lstBillDetailsIpd.get(0).setQuantity(0);

							lstBillDetailsIpd.get(1).setAmount(0.0);
							lstBillDetailsIpd.get(1).setCoPay(0.0);
							lstBillDetailsIpd.get(1).setQuantity(0);
						}

					} else {

						double rate = listDB.get(0).getRate();
						double quantity = listDB.get(0).getQuantity();
						Double amount = listDB.get(0).getAmount();

						Double newWardRate = lstBillDetailsIpd.get(0).getRate();
						if (rate <= newWardRate) {

							if (quantity != 0) {
								listDB.get(0).setQuantity(quantity - 1);
								listDB.get(0).setAmount(amount - rate);
								listDB.get(0).setCoPay(amount - rate);

								// nursing charges check
								if (listDB.get(1).getSubServiceId() == 0) {

									double nursingRate = listDB.get(1).getRate();
									double nursingQuantity = listDB.get(1).getQuantity();
									Double nursingAmount = listDB.get(1).getAmount();

									listDB.get(1).setQuantity(nursingQuantity - 1);
									listDB.get(1).setAmount(nursingAmount - nursingRate);
									listDB.get(1).setCoPay(nursingAmount - nursingRate);

								}
							}
							List<BillDetailsIpdDto> list = new ArrayList<BillDetailsIpdDto>();
							list.addAll(listDB);

							for (BillDetailsIpdDto billDetailsIpdDto : list) {
								sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
							}

						} else {

							lstBillDetailsIpd.get(0).setAmount(0.0);
							lstBillDetailsIpd.get(0).setCoPay(0.0);
//						lstBillDetailsIpd.get(0).setRate(0.0);
							lstBillDetailsIpd.get(0).setQuantity(0);

							lstBillDetailsIpd.get(1).setAmount(0.0);
							lstBillDetailsIpd.get(1).setCoPay(0.0);
//						lstBillDetailsIpd.get(1).setRate(0.0);
							lstBillDetailsIpd.get(1).setQuantity(0);
						}

					}
				}

			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}

//		}

	}

	//Added By Rahul Patil
	public void sendSMSDoctorCK(int treatmentId) {
		  ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String smsSendNewFlow =(resourceBundle.getObject("smsSendNewFlow").toString());
			System.out.println("smsSendNewFlow="+smsSendNewFlow);
			if(smsSendNewFlow.equalsIgnoreCase("on")){

				//sendSMSDoctorCK(treatmentBeds.getTreatmentId());
				// this code is for particular hospital by suraj
				ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
				String hospitalName = bundle.getObject("hospitalname").toString();

			 if (hospitalName.equals("palve")) { 
					String patientName = "";
					String hName = "";
					String patientMobile = "";
					String TstartDate = "";

					Integer admit_under_id = 0;
					String admit_under_name = "";
					String admit_under_mobile = "";

					String referedBy_id = "0";
					String referedBy_name = "";
					String referedBy_mobile = "";
					Integer insurance_ID = 0;
					
					String admin_Dr_Bharti = "9960708849";
					String admin_Dr_Giri = "9960708849";


					String bedName = "";
					//Date tdate;

					String sql = "SELECT p.mobile,p.patient_name,t.*, h.category_name, bd.bed_name,t.created_date_time AS admitted_date"
							+" FROM ehat_view_registration p, ehat_treatment t,treatment_beds b,ehat_charges_master_slave h,beds bd"
							+" WHERE p.patient_id = t.patient_id AND t.treatment_id = b.Treatment_ID AND b.Bed_ID = bd.Bed_ID"
							+" AND t.t_flag='Y'  AND b.status='Y'  AND h.ID=bd.Hall_ID"
							+" AND t.treatment_id='"+treatmentId+"'";
					
					
					SQLQuery q1 = sessionFactory.getCurrentSession().createSQLQuery(sql); 
					q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> patientGeneralDetails = q1.list();

					for (Map rs : patientGeneralDetails) {

						patientName = ((String) rs.get("patient_name"));

						admit_under_id = Integer.parseInt((String) rs.get("doctor_id"));

						
						referedBy_id = ((Integer) rs.get("ref_doc_id")).toString();

						hName = ((String) rs.get("category_name"));

						bedName = ((String) rs.get("bed_name"));

						patientMobile = ((String) rs.get("mobile"));
						
						Date tdate;
						if(((Date) rs.get("admitted_date"))==null) {
							tdate = new Date();
						}else {
						 SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");  
				    	 tdate = ((Date) rs.get("admitted_date"));
				    	 TstartDate = formatter.format(tdate);  
				    	//TstartDate =tdate.toString();
						}
						
					//	insurance_ID = ((Integer) rs.get("sp_dic_master_id"));
					}

					try {
						// admit under
						if (!(admit_under_id).equals("")) {
							String admit_under_name_sql = "SELECT doc_name, mobileNo FROM doctor WHERE doc_Type='doctor' AND status='Y' AND doctor_id="
									+ admit_under_id;
							Query q2 = sessionFactory.getCurrentSession().createSQLQuery(admit_under_name_sql);
							q2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> admit_under_details = q2.list();
							for (Map map : admit_under_details) {
								admit_under_name = ((String) map.get("doc_name"));
								admit_under_mobile = ((String) map.get("mobileNo"));
							}
						}

					} catch (Exception e) {
						e.printStackTrace();
					}

					try {

						if (!(referedBy_id.trim()).equals("")) {
							// referedBy
							sql = "SELECT * FROM chanelling_doctor WHERE status='Y' AND channDocId="
									+ referedBy_id;
							Query q3 = sessionFactory.getCurrentSession().createSQLQuery(sql);
							q3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> doctorDetails = q3.list();
							for (Map rs : doctorDetails) {
								referedBy_name = ((String) rs.get("docName"));
								referedBy_mobile = ((String) rs.get("contactNo"));
							}
						}

					} catch (Exception e) {
						e.printStackTrace();
					}

					/*
					 * String msgOnBedAllocated = "Hello " + patientName + " is admitted under " +
					 * admit_under_name + " in " + hName + " on Bed No. " + bedName + " on " +
					 * TstartDate;
					 */
					String msgOnBedAllocated = "Hello " + patientName
							+ " is admitted under " + admit_under_name
							+ " in "
							+ hName + " on Bed No. " + bedName + ".Regards Dr Palve Hospital LLP.";

					/*String msgForPatient = "Hello " + patientName
							+ " is admitted under " + admit_under_name
							+ " Ref. by Dr "
							+ (referedBy_name == "" ? "-" : referedBy_name) + " in "
							+ hName + " on Bed No. " + bedName + " on " + TstartDate;*/
					
					// added by rahul
					String msgForPatient = "Dear Dr. Patient Mr/Ms. " + patientName
							+ " admitted under your care on " + admit_under_name
							+ " ward "+ hName
							+ " Thank you-palve Wellness Hospital.";
							
					
					
					/*String replaceMsgForPatient = msgForPatient
							.replaceAll("Ref. by Dr -","");*/

					/*try {
						if (patientMobile.length() == 10) {
							SendSMSAllFormat.sendSMS("","","","",patientMobile, replaceMsgForPatient);
						}
						
						if (patientMobile.length() == 10) {
							SendSMSAllFormat.sendSMS("","","","",patientMobile, msgForPatient);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}*/

					try {
						// admit under
						if (admit_under_mobile.length() == 10) {
							SendSMSAllFormat.sendSMS("","","","",admit_under_mobile, msgOnBedAllocated);
							//SendSMSAllFormat.sendSMS("","","","",admit_under_mobile, msgForPatient);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}

					/*try {
						// referedBy
						if (referedBy_mobile.length() == 10) {
							SendSMSAllFormat.sendSMS("","","","",referedBy_mobile, msgForPatient);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}*/

					// sendSMSCK: compulsory sms fro doctor
					/*try {
							if (admin_Dr_Bharti.length() == 10) {

								SendSMSAllFormat.sendSMS("","","","",admit_under_mobile,msgForPatient);
							}
							if (admin_Dr_Giri.length() == 10) {

								SendSMSAllFormat.sendSMS("","","","",admit_under_mobile,msgForPatient);
							}
						} catch (Exception e) {
							e.printStackTrace();
						}*/
				}
			
			}

		
	
		
	
		
	}

	// Function to save registration and consultation charges
	public int saveBillDetailsIpd(int patientId, int treatmentId, int billId, int unitId, 
			int chargesSlaveId, int userId,String queryType, int bedId) {
		
		LOGGER.info("In BedMgtDaoImpl saveBillDetailsIpd()");
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("hospitalaccess");
		String hospitalName = (String)resourceBundleEhat.getString("hospitalname");
		
		int result = 0;
		try {
			
			// SP for get registration charges
			String sqlreg ="";
			
			//Query spQuery = sessionFactory.getCurrentSession().createSQLQuery("call sp_reg_get_registration_charges_ipd(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)");
			
			String sqlhal = "select ifnull(Hall_ID,0) as hallId from beds where Bed_ID="+bedId+" and deleted='N' ";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sqlhal);
			int hallId1 = ((Number)query.uniqueResult()).intValue();
			
			sqlhal = "select ifnull(selfId,0) as hallTypeId from ehat_charges_master_slave where id="+hallId1+" and deleted='N' ";
			Query query2 = sessionFactory.getCurrentSession().createSQLQuery(sqlhal);
			int hallTypeId1 = ((Number)query2.uniqueResult()).intValue();
			
			
			//if(chargesSlaveId > 0) {
			
				
				//sqlreg = "call sp_reg_get_registration_charges_sponser_ipd(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
			//updated by Rohini for sponser and hall wise reg charges	
			sqlreg = "call sp_reg_get_registration_charges_sponser_ipd(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type,:hallTypeId)";
				
			//}else {
				//sqlreg = "call sp_reg_get_registration_charges_ipd(:unit_id,:department_id,:service_id,:patient_id,:treatment_id,:charges_slave_id,:query_type)";
			//}
			
			Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlreg);
			
			spQuery.setParameter("unit_id", unitId);
			spQuery.setParameter("department_id", 2);
			spQuery.setParameter("service_id", 1);
			spQuery.setParameter("patient_id", patientId);
			spQuery.setParameter("treatment_id", treatmentId);
			spQuery.setParameter("charges_slave_id", chargesSlaveId);
			spQuery.setParameter("query_type", queryType);	
			spQuery.setParameter("hallTypeId", hallTypeId1);	
			spQuery.setResultTransformer(new AliasToBeanResultTransformer(PatientRegChargesDto.class));
			@SuppressWarnings("unchecked")
			List<PatientRegChargesDto> ltRegChargesDto = spQuery.list();
			for(PatientRegChargesDto obj : ltRegChargesDto) {
				
				double regCharges = 0;
				if(chargesSlaveId > 0) {
					
					regCharges = obj.getN_other_amount();
				}else {
					
					regCharges = obj.getN_amount();
				}
				if(regCharges >= 0 && (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit"))) {
					
					BillDetailsIpdDto objBill = new BillDetailsIpdDto();
					objBill.setPatienttId(patientId);
					objBill.setTreatmentId(treatmentId);
					objBill.setBillId(billId);
					objBill.setDepartmentId(2);
					objBill.setChargesSlaveId(chargesSlaveId);
					if(queryType.equalsIgnoreCase("insert"))
						objBill.setCreatedBy(userId);
					else
						objBill.setUpdatedBy(userId);
					objBill.setUnitId(unitId);
					objBill.setServiceId(1);
					objBill.setSubServiceId(obj.getN_sub_serv_id_reg());
					objBill.setRate(obj.getN_amount());
					objBill.setQuantity(1);
					objBill.setAmount(obj.getN_amount());
					objBill.setCoPay(obj.getN_amount());
					
					if(chargesSlaveId > 0) {
						
						objBill.setOtherAmount(obj.getN_confg_reg_charges());
					}else {
						
						objBill.setOtherAmount(obj.getN_other_amount());
					}
					//objBill.setOtherRate(obj.getN_other_amount());
					objBill.setOtherRate(obj.getN_confg_reg_charges());
					if(obj.getN_confg_reg_charges() == 0 && hospitalName.equalsIgnoreCase("vatsalya")) {
						objBill.setOtherRate(obj.getN_other_amount());
						objBill.setOtherAmount(obj.getN_other_amount());
					}
					
					//objBill.setOtherAmount(obj.getN_confg_reg_charges());
					//objBill.setOtherAmount(obj.getN_other_amount());
					objBill.setOtherPay(obj.getN_other_amount());
					sessionFactory.getCurrentSession().merge(objBill);
				}
			}
			
			if(!hospitalName.equalsIgnoreCase("Siddhivinayak")) {
				
				TreatmentDto treatObj = (TreatmentDto)sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
				
				String sql = "select ifnull(Hall_ID,0) as hallId from beds where Bed_ID="+bedId+" and deleted='N' ";
				Query q1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int hallId = ((Number)q1.uniqueResult()).intValue();
				
				sql = "select ifnull(selfId,0) as hallTypeId from ehat_charges_master_slave where id="+hallId+" and deleted='N' ";
				Query q2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int hallTypeId = ((Number)q2.uniqueResult()).intValue();
				
				// SP for get consultation charges
				Query spQuery1 = sessionFactory.getCurrentSession().createSQLQuery("call sp_reg_get_consultation_charges_ipd(:patient_id,:treatment_id,:unit_id,:department_id,:user_id,:charges_slave_id,:bill_id,:service_id,:query_type,:doctor_id_list,:hallSlaveId)");
				spQuery1.setParameter("patient_id", patientId);
				spQuery1.setParameter("treatment_id", treatmentId);
				spQuery1.setParameter("unit_id", unitId);
				spQuery1.setParameter("department_id", 2);
				spQuery1.setParameter("user_id", userId);
				spQuery1.setParameter("charges_slave_id", chargesSlaveId);
				spQuery1.setParameter("bill_id", billId);
				spQuery1.setParameter("service_id", 2);
				spQuery1.setParameter("query_type", queryType);
				spQuery1.setParameter("doctor_id_list", treatObj.getDoctorIdList());
				spQuery1.setParameter("hallSlaveId", hallTypeId);
				spQuery1.setResultTransformer(new AliasToBeanResultTransformer(PatientConsultationChargesDto.class));
				@SuppressWarnings("unchecked")
				List<PatientConsultationChargesDto> ltConsultChargesDto = spQuery1.list();
				for(PatientConsultationChargesDto obj : ltConsultChargesDto) {
					
					BillDetailsIpdDto objBill = new BillDetailsIpdDto();
					objBill.setPatienttId(patientId);
					objBill.setTreatmentId(treatmentId);
					objBill.setBillId(billId);
					objBill.setDepartmentId(2);
					objBill.setChargesSlaveId(chargesSlaveId);
					if(queryType.equalsIgnoreCase("insert"))
						objBill.setCreatedBy(userId);
					else
						objBill.setUpdatedBy(userId);
					objBill.setUnitId(unitId);
					objBill.setSpecialityId(0);
					objBill.setDoctorId(obj.getN_doctor_id());
					objBill.setServiceId(2);
					objBill.setSubServiceId(obj.getN_sub_service_id());
					objBill.setRate(obj.getN_amount());
					objBill.setQuantity(1);
					objBill.setAmount(obj.getN_amount());
					objBill.setCoPay(obj.getN_amount());
					
					objBill.setOtherRate(obj.getN_other_amount());
					objBill.setOtherAmount(obj.getN_other_amount());
					objBill.setOtherPay(obj.getN_other_amount());
					sessionFactory.getCurrentSession().merge(objBill);
				}
			}
			
			result = 1;
			LOGGER.debug("Response--------> "+result);
			
		}catch(Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		}
		return result;
	}
	// Function to set total ipd bill to billmaster
	public double setTotalBillAmount(int treatId, int billId) {
		
		double totalBill = 0;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
		    criteria.setProjection(Projections.sum("amount"));
		    criteria.add(Restrictions.eq("treatmentId", treatId));
		    criteria.add(Restrictions.eq("deleted", "N"));
		    criteria.add(Restrictions.eq("cancle", "N"));
		    totalBill = (Double)criteria.uniqueResult();
		    
		    BillMasterDto billMaster = (BillMasterDto)sessionFactory.getCurrentSession().get(BillMasterDto.class,billId);
		    billMaster.setTotalBill(totalBill);
		    
		    LOGGER.debug("Response--------> "+totalBill);
		    
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			totalBill = 0;
		}
		return totalBill;
	}
	
	// Function to check access is given to service or not
	public boolean masterConfigAccess(int unitId, int deptId, int serviceId) {
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MasterConfigDto.class);
			criteria.setProjection(Projections.rowCount());	
		    criteria.add(Restrictions.eq("unitId", unitId));
		    criteria.add(Restrictions.eq("deptId", deptId));
		    criteria.add(Restrictions.eq("serviceId", serviceId));
		    criteria.add(Restrictions.eq("deleted", "N"));
		    long count = (Long)criteria.uniqueResult();
			
			if (count > 0)
				return true;
			else
				return false;
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return false;
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public PatientBedInfoDTO getBillableBedCharges(int chargesSlaveId, int hallId, String callFrom) {
		
		LOGGER.info("In BedMgtDaoImpl getBillableBedCharges()");
		List<PatientBedInfoDTO> lstBedPatientDetailsDto = new ArrayList<PatientBedInfoDTO>();
		PatientBedInfoDTO obj = new PatientBedInfoDTO();
		
		try {
			Query q = sessionFactory.getCurrentSession().createSQLQuery("CALL sp_fetch_billable_bed_charges(:chargesSlaveId, :hallId)");
			q.setResultTransformer(Transformers.aliasToBean(PatientBedInfoDTO.class));
			q.setParameter("chargesSlaveId", chargesSlaveId);
			q.setParameter("hallId", hallId);
			lstBedPatientDetailsDto = q.list();
			obj.setLstPatientBedInfoDTO(lstBedPatientDetailsDto);
			LOGGER.debug("Response--------> "+lstBedPatientDetailsDto);

		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		}
		return obj;
	}
	

	public int saveBMWCharges(int patientId, int treatmentId, int billId, int unitId, 
			int chargesSlaveId, int userId,String queryType, int bedId) {
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		int servId = Integer.parseInt(resourceBundleEhat.getObject("bmwServiceId").toString().trim());	
		String sql = "";
		
		try {
		
			BillDetailsIpdDto obj = new BillDetailsIpdDto();
			
			TreatmentDto treatObj = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
			
			sql = "select * from ehat_subservice where deleted = 'N' and service_id ="+servId;
			SQLQuery sqlresult = sessionFactory.getCurrentSession().createSQLQuery(sql);
			sqlresult.addEntity(SubServiceDto.class);
			
			List<SubServiceDto> subservList = sqlresult.list();
			
			obj.setAmount(subservList.get(0).getCharges());
			obj.setBillId(billId);
			obj.setClinicalnotes("-");
			obj.setCoPay(subservList.get(0).getCharges());
			obj.setDepartmentId(treatObj.getDepartmentId());
			obj.setOtherAmount(subservList.get(0).getCharges());
			obj.setOtherPay(subservList.get(0).getCharges());
			obj.setOtherRate(subservList.get(0).getCharges());
			obj.setPatienttId(patientId);
			obj.setQuantity(1);
			obj.setRate(subservList.get(0).getCharges());
			obj.setServiceId(servId);
			obj.setSubServiceId(subservList.get(0).getSubId());
			obj.setTreatmentId(treatmentId);
			obj.setUnitId(treatObj.getUnitId());
			obj.setBusinessType(treatObj.getBusinessType());
			
			sessionFactory.getCurrentSession().merge(obj);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return 1;
		
	}
}
