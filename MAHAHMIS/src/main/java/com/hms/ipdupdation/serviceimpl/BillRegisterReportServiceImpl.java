package com.hms.ipdupdation.serviceimpl;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Users;
import com.hms.ehat.dto.BillRegisterReportDto;
import com.hms.ehat.dto.FinanceReportAmtDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.SpecialityWiseCountReport;
import com.hms.ehat.dto.UserEntryLogReportDto;
import com.hms.ipdbill.dao.BillDao;
import com.hms.ipdbill.dao.IpdBillDao;
import com.hms.ipdupdation.service.BillRegisterReportService;
import com.hms.users.daoimpl.UsersDaoImpl;


@Service
@Transactional
public class BillRegisterReportServiceImpl implements BillRegisterReportService {
	
	public static final int OPD_DEPT=1; 
	public static final int IPD_DEPT=2;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	UsersDaoImpl userDao;
	
	@Autowired
	IpdBillDao ipdBillDao;
	
	@Autowired
	BillDao opdBillDao;

	@Override
	public BillRegisterReportDto fetchIpdPatientsRecords(int unitId, int userId, String fDate, String tDate,
			String callFrom) {
		BillRegisterReportDto mainObj=new BillRegisterReportDto();
		List<BillRegisterReportDto> ltPatientRecord = null;
		
		/*
		 * List<BillRegisterReportDto> lstOpd = new ArrayList<>();
		 * List<BillRegisterReportDto> lstIpd = new ArrayList<>();
		 * List<BillRegisterReportDto> lstDiagno = new ArrayList<>();
		 */
		try {
			/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                    .get(RegistrationDto.class, patientId);*/
			String sql="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			c.setTime(sdf.parse(tDate));
			c.add(Calendar.DATE, 1);  // number of days to add
			tDate = sdf.format(c.getTime());  // dt is now the new date
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillRegisterReportDto.class);
			
			if(callFrom.equalsIgnoreCase("0")) {
				criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
				criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
				}	else if(callFrom.equalsIgnoreCase("1")) {
				criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
				criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
				criteria.add(Restrictions.eq("departmentId", 1));
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			}else if(callFrom.equalsIgnoreCase("2")) {
				criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
				criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
				criteria.add(Restrictions.eq("departmentId", 2));
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			}else if(callFrom.equalsIgnoreCase("3")) {
				criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
				criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
				criteria.add(Restrictions.eq("departmentId", 3));
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
				
			}
			criteria.add(Restrictions.eq("unitId", unitId));
		
			//criteria.addOrder(Order.desc("treatmentId"));
			criteria.addOrder(Order.desc("createdDateTime"));
			//criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();
			
			
			List<BillRegisterReportDto> lstOpd = ltPatientRecord.stream()
				    .filter(obj -> obj.getDepartmentId() == 1)
				    .collect(Collectors.toList());

				List<BillRegisterReportDto> lstIpd = ltPatientRecord.stream()
				    .filter(obj -> obj.getDepartmentId() == 2)
				    .collect(Collectors.toList());

				List<BillRegisterReportDto> lstDiagno = ltPatientRecord.stream()
				    .filter(obj -> obj.getDepartmentId() == 3)
				    .collect(Collectors.toList());
				
				
		//	for(BillRegisterReportDto obj:ltPatientRecord){
				
				/*
				if(obj.getChargesMasterSlaveId()>0){
					
					//sql="select category_name as sponsor_name from ehat_charges_master_slave where id="+obj.getChargesMasterSlaveId();
					//Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					//obj.setImageName((String) refQuery.uniqueResult());		
				}	
		
				if(obj.getDoctorId().length() > 0){
					
					String ar[]=obj.getDoctorId().split(",");
					String docName="";
					for(int i=0;i<ar.length;i++){
						
						sql="select doc_name as doctor_name from doctor where Doctor_ID="+ar[i];
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						docName=docName+(String) refQuery.uniqueResult()+",";
						//obj.setImageName((String) refQuery.uniqueResult());		
					}
					docName = docName.substring(0, docName.length()-1);
					obj.setAddress(docName);					
				} */
				
				//sql="select total_bill,total_paid,total_remain,total_refund from ehat_bill_master where treatment_id="+obj.getTreatmentId();
				//Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
			//	refQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				//@SuppressWarnings("unchecked")			
				//List<Map<String, Object>> listBillDetails = refQuery.list();
				//for(Map<String, Object> row : listBillDetails){
					
				//	obj.setTotBill((Double)row.get("total_bill"));
				//	obj.setTotPaid((Double)row.get("total_paid"));
				//	obj.setTotBal((Double)row.get("total_remain"));
				//	obj.setTotalRefund((Double)row.get("total_refund"));
				//}
				
//                    int treatmentId=obj.getTreatmentId();
//				
//				String sqlTreat=" select department_id from ehat_treatment where treatment_id="+treatmentId+" ";
//				int departmentId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlTreat).uniqueResult()).intValue();
//				
//				sqlTreat=" select charges_slave_id from ehat_treatment where treatment_id="+treatmentId+" ";
//				int sponsorId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlTreat).uniqueResult()).intValue();
//				
//				FinanceReportAmtDto fobj=getAmtsForReports(treatmentId,departmentId,sponsorId);
//				
//				obj.setTotBill(fobj.getTotalAMt());
//				//obj.setDiscAmt(fobj.getTotalDiscountAMt());
//				obj.setTotPaid(fobj.getTotalPaidAMt());
//				obj.setTotalRefund(fobj.getTotalRefundAMt());
//				
//				if(departmentId == 2) { 
//					obj.setTotBal((fobj.getTotalAMt()+fobj.getTotalRefundAMt() ) -(fobj.getTotalDiscountAMt() +fobj.getTotalPaidAMt() + fobj.getTotalConAMt()));
//				 }else  {
//					obj.setTotBal((fobj.getTotalAMt()) -(fobj.getTotalDiscountAMt() +fobj.getTotalPaidAMt() + fobj.getTotalConAMt()));
//				 }
//			
//				obj.setNetAmt(fobj.getTotalAMt() - ( fobj.getTotalConAMt()+fobj.getTotalDiscountAMt() ));
//				obj.setTotalConcession(fobj.getTotalConAMt());
//				
//				if(  fobj.getTotalPaidAMt() > obj.getNetAmt()) {
//					
//					obj.setDeposit(fobj.getTotalPaidAMt() - obj.getNetAmt());
//				}else {
//					obj.setDeposit(0);
//				}
//				
//				
//				if(departmentId == 2) { 
//					sql = "select ifnull(total_discount,0) as total_discount ,ifnull (GROUP_CONCAT((select doc_name from doctor where User_ID = d.approved_by) SEPARATOR ',') ,'') AS approved_by, ifnull (GROUP_CONCAT(approved_remark SEPARATOR ','),'') AS approved_remark from ehat_ipdbill_discount d where treatment_id=" + obj.getTreatmentId();
//					Query refQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
//					refQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
//					System.out.println("Discount=" + refQuery1);
//					@SuppressWarnings("unchecked")
//					List<Map<String, Object>> listBillDetails1 = refQuery1.list();
//					for (Map<String, Object> row : listBillDetails1) {
//						
//						//obj.setTotDisc((Double)row.get("total_discount"));
//						obj.setApproveBy((String)row.get("approved_by"));
//						obj.setApproveRemark((String)row.get("approved_remark"));
//					}
//				}else {
//					
//					sql = "select ifnull (GROUP_CONCAT((select doc_name from doctor where User_ID = d.disc_givenby) SEPARATOR ',') ,'') AS approved_by, ifnull (GROUP_CONCAT(disc_remark SEPARATOR ','),'') AS approved_remark from ehat_receipt_master d where treatment_id=" + obj.getTreatmentId();
//					Query refQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
//					refQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
//					System.out.println("Discount=" + refQuery1);
//					@SuppressWarnings("unchecked")
//					List<Map<String, Object>> listBillDetails1 = refQuery1.list();
//					for (Map<String, Object> row : listBillDetails1) {
//						
//						//obj.setTotDisc((Double)row.get("total_discount"));
//						obj.setApproveBy((String)row.get("approved_by"));
//						obj.setApproveRemark((String)row.get("approved_remark"));
//					}
//				}
//				obj.setTotDisc(fobj.getTotalDiscountAMt());
//				
//				
//				
//				obj.setBedName("");
//				
//				if (departmentId == 1) {
//
//					lstOpd.add(obj);
//
//					try {
//						if (lstOpd.size() > 0) {
//
//							// fetch doctor_followup_days from hospital table
//							Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
//									"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
//							Integer doctorFollowupDays = (Integer) q3.uniqueResult();
//							
//							String countTreatmentQ ="select count(*) from ehat_treatment where deleted='N' AND patient_id="+obj.getPatientId();
//							Query createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(countTreatmentQ);
//							BigInteger countTreatment =(BigInteger)createSQLQuery.uniqueResult();
//
//							// fetch last treatment date
//							Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
//									"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "
//											+ obj.getPatientId() + " AND t_flag = 'N' > 0)"
//											+ " THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="
//											+ obj.getPatientId()
//											+ " AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
//							/*
//							 * "select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="
//							 * +billDetailsDto.getPatienttId()
//							 * +" and t_flag='N' order by treatment_id desc limit 1");
//							 */
//
//							Date lastTreatmentDate = (Date) q25.uniqueResult();
//
//							// calculate difference between last treatment and current treatment
//							long differenceDays = getDifferenceDays(lastTreatmentDate,
//									new Date(new java.util.Date().getTime()));
//
//							// if diff is less than or equals followup days then apply followup charges
//						if(countTreatment.intValue()>1) {
//							
//							if (differenceDays <= doctorFollowupDays) {
//								// SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
//								// String currentDay = dayFormatter.format(currentDate.getTime());
//
//								// if(currentDay.equalsIgnoreCase("Sat") || currentDay.equalsIgnoreCase("Sun")){
//
//								obj.setVisitType("Follow");
//							} else {
//								obj.setVisitType("New");
//							}
//						}else {
//							obj.setVisitType("New");
//						}
//							
//
//						}
//					} catch (Exception e) {
//						e.printStackTrace();
//					}
//
//				}else if(departmentId ==2) {
//					lstIpd.add(obj);
//				}else if(departmentId ==3) {
//				   lstDiagno.add(obj);	
//				}
				
				mainObj.setLstOpd(lstOpd);
				mainObj.setLstIpd(lstIpd);
				mainObj.setLstDaigno(lstDiagno);
	//		}

		} catch (Exception e) {
			e.printStackTrace();
			return mainObj;
		}
		return mainObj;
	}
public FinanceReportAmtDto getAmtsForReports(Integer treatmentId,Integer departmentId,Integer sponsorId) {
		
		FinanceReportAmtDto obj=new FinanceReportAmtDto();
		
		String sqlAMt=" select  fn_get_rpt_total_bill_amt("+treatmentId+","+departmentId+","+sponsorId+") as totalBillAMt ";
		double totalAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_discount_amt("+treatmentId+","+departmentId+") as totalDiscountAmt ";
		double totalDiscountAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_paid_amt("+treatmentId+","+departmentId+","+sponsorId+") as totalPaidAmt ";
		double totalPaidAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_concession_amt("+treatmentId+","+departmentId+","+sponsorId+") as totalConAmt ";
		double totalConAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		sqlAMt=" select  fn_get_rpt_total_refund_amt("+treatmentId+","+departmentId+") as totalRefundAmt ";
		double totalRefundAMt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlAMt).uniqueResult();
		
		obj.setTotalAMt(totalAMt);
		obj.setTotalDiscountAMt(totalDiscountAMt);
		obj.setTotalPaidAMt(totalPaidAMt);
		obj.setTotalConAMt(totalConAMt);
		obj.setTotalRefundAMt(totalRefundAMt);
		
		return obj;
		
	}

@Override
public List<UserEntryLogReportDto> getUserEntryLogReport(Integer unitId, String fromDate, String toDate) {
    List<UserEntryLogReportDto> userEntryList = new ArrayList<>();
    try {
        List<Users> usersList = userDao.getUsersListpharmacy();
        Collections.reverse(usersList);
        SimpleDateFormat inputFormat = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date fromDateParsed = inputFormat.parse(fromDate);
        Date toDateParsed = inputFormat.parse(toDate);
        String fromDateFormatted = outputFormat.format(fromDateParsed);
        String toDateFormatted = outputFormat.format(toDateParsed);

        usersList.forEach(user -> {
            int totalVitalCount = getCountResult("SELECT ifnull(COUNT(DISTINCT treatment_id), 0) FROM chart_report WHERE user_id IN ("
                    + user.getUser_ID() + ") AND deleted='N' AND SUBSTR(date, 1, 10) BETWEEN '" + fromDate + "' AND '" + toDate + "'");
            int totalInputCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM chart_info WHERE user_id IN(" + user.getUser_ID()
                    + ") AND ctype='4' AND deleted='N' AND SUBSTR(date_vital, 1, 10) BETWEEN '" + fromDate + "' AND '" + toDate + "'");
            int totalOutputCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM chart_info WHERE user_id IN(" + user.getUser_ID()
                    + ") AND ctype='5' AND deleted='N' AND SUBSTR(date_vital, 1, 10) BETWEEN '" + fromDate + "' AND '" + toDate + "'");
            int totalOPDPrescriptionCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM opd_prescription WHERE created_by IN("
                    + user.getUser_ID() + ") AND deleted='N' AND SUBSTR(created_date_time, 1, 10) BETWEEN '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");
            int totalNursingPrescriptionCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM nurshing_drugs WHERE created_by IN("
                    + user.getUser_ID() + ") AND  deleted='N' AND SUBSTR(created_date_time, 1, 10) BETWEEN '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");
            int totalOTScheduleCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM treatment_operations toa JOIN treatmentoperationsmanage toaM ON toa.ID = toaM.treatmentOperationsID"+  
            		" WHERE SUBSTR(toa.date, 1, 10) BETWEEN '" + fromDate + "' AND '" + toDate + "' AND toaM.bookedBy IN (" + user.getUser_ID() + ")");
            int totalRegistrationCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM ehat_treatment WHERE created_by IN(" + user.getUser_ID()
                    + ") AND SUBSTR(created_date_time, 1, 10) BETWEEN '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");
            int totalOPDBillCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM ehat_receipt_master WHERE created_by IN (" + user.getUser_ID()
                    + ") AND  deleted='N' AND department_id=1 AND SUBSTR(created_date_time, 1, 10) BETWEEN  '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");
            int totalDaignpBillCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM ehat_receipt_master WHERE created_by IN (" + user.getUser_ID()
            + ") AND  deleted='N' AND  department_id=3 AND SUBSTR(created_date_time, 1, 10) BETWEEN  '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");
            int totalIPDBillCount = getCountResult("SELECT ifnull(COUNT(*),0) FROM ehat_receipt_master_ipd WHERE created_by IN ("
                    + user.getUser_ID() + ") AND SUBSTR(created_date_time, 1, 10) BETWEEN '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");
            int totalOPDServicesCount = getCountResult("SELECT ifnull(count(*),0) FROM ehat_bill_details WHERE created_by IN ("
                    + user.getUser_ID() + ") AND deleted='N' AND  cancle='N' AND deleted='N' AND SUBSTR(created_date_time, 1, 10) BETWEEN '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");
            int totalIPDServicesCount = getCountResult("SELECT ifnull(count(*),0) FROM ehat_bill_details_ipd WHERE created_by IN("
                    + user.getUser_ID() + ") AND deleted='N' AND cancle='N' AND SUBSTR(created_date_time, 1, 10) BETWEEN '" + fromDateFormatted + "' AND '" + toDateFormatted + "'");   

            if (totalVitalCount > 0 ||
                    totalInputCount > 0 ||
                    totalOutputCount > 0 ||
                    totalOPDPrescriptionCount > 0 ||
                    totalNursingPrescriptionCount > 0 ||
                    totalOTScheduleCount > 0 ||
                    totalRegistrationCount > 0 ||
                    totalOPDBillCount > 0 ||
                    totalIPDBillCount > 0 ||
                    totalOPDServicesCount > 0 ||
                    totalIPDServicesCount > 0 ||
                    totalDaignpBillCount > 0) {
                UserEntryLogReportDto userEntryInstance = new UserEntryLogReportDto();
                userEntryInstance.setUserId(user.getUser_ID());
                userEntryInstance.setUserName(user.getObjDoctor().getDoc_name());
                userEntryInstance.setTotalVitalCount(totalVitalCount);
                userEntryInstance.setTotalInputCount(totalInputCount);
                userEntryInstance.setTotalOutputCount(totalOutputCount);
                userEntryInstance.setTotalOPDPrescriptionCount(totalOPDPrescriptionCount);
                userEntryInstance.setTotalNurshingPrescriptionCount(totalNursingPrescriptionCount);
                userEntryInstance.setTotalotScheduleCount(totalOTScheduleCount);
                userEntryInstance.setTotalRegistrationCount(totalRegistrationCount);
                userEntryInstance.setTotalOPDBillCount(totalOPDBillCount);
                userEntryInstance.setTotalIPDBillCount(totalIPDBillCount);
                userEntryInstance.setTotalOPDServicesCount(totalOPDServicesCount);
                userEntryInstance.setTotalIPDServicesCount(totalIPDServicesCount);
                userEntryInstance.setTotalDiagnoBillCount(totalDaignpBillCount);
                userEntryList.add(userEntryInstance);
            }
        });

    } catch (HibernateException | ParseException e) {
        e.printStackTrace();
    }
    return userEntryList;
}

private int getCountResult(String query) {
    Object result = sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult();
    return result != null ? ((Number) result).intValue() : 0;
}

public static long getDifferenceDays(Date d1, Date d2) {
	if(d1.equals(null)){
		d1 = new Date(new java.util.Date().getTime());
	}
	if(d2.equals(null)){
		d2 = new Date(new java.util.Date().getTime());
	}
    long diff = d2.getTime() - d1.getTime();
   // System.err.println("days in diff=="+TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
    return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
}
@Override
public List<SpecialityWiseCountReport> getSpecialityWiseReport(Integer unitId, String fromDatein, String toDatein,
		String CallFrom) {
	List<SpecialityWiseCountReport> SpecialityWiseCountList = new ArrayList<>();

	try {
		SimpleDateFormat inputFormat = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");

		Date formattedFromDate = inputFormat.parse(fromDatein);
		Date formattedToDate = inputFormat.parse(toDatein);

		String fromDateParsed = outputFormat.format(formattedFromDate);
		String toDateParsed = outputFormat.format(formattedToDate);

		if ("Speciality Wise".equals(CallFrom)) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalSpecialisationDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		List<HospitalSpecialisationDto> hospitalSpecialisationList = criteria.list();

		hospitalSpecialisationList.forEach(specialisationDto -> {
			int specialisationId = specialisationDto.getSpecialisationId();
			Object opdResult, ipdResult, dischargeResult, deathResult, surgeryResult;
			try {
				opdResult = getCountOrList(OPD_DEPT, specialisationId, fromDateParsed, toDateParsed);
				ipdResult = getCountOrList(IPD_DEPT, specialisationId, fromDateParsed, toDateParsed);
				dischargeResult = getCountForDischargeSpecialisation(IPD_DEPT, specialisationId, fromDateParsed,
						toDateParsed, "None");
				deathResult = getCountForDischargeSpecialisation(IPD_DEPT, specialisationId, fromDateParsed,
						toDateParsed, "Dead");
				surgeryResult = getCountForSurgerySpecialisation(IPD_DEPT, specialisationId, fromDateParsed, toDateParsed);
			} catch (Exception e) {
				e.printStackTrace();
				return;
			}

			SpecialityWiseCountReport specialityWiseCountInstance = new SpecialityWiseCountReport(); 

			specialityWiseCountInstance.setDepartment(specialisationDto.getSpecializationName());
			specialityWiseCountInstance.setOpdCount(((Long) opdResult).intValue());
			specialityWiseCountInstance.setAdmissionCount(((Long) ipdResult).intValue());
			specialityWiseCountInstance.setDischargeCount(((Long) dischargeResult).intValue());
			specialityWiseCountInstance.setDeathCount(((Long) deathResult).intValue());
			specialityWiseCountInstance.setSurgeriesCount(((Long) surgeryResult).intValue());
			
			SpecialityWiseCountList.add(specialityWiseCountInstance);
		});
		}else
		{
			try {
				
				List<SpecialityWiseCountReport> lstSpecialityWiseCount  = getDepartmentWisePatientReportCount(fromDateParsed,toDateParsed);
				SpecialityWiseCountList.addAll(lstSpecialityWiseCount);
			} catch (Exception e) {
			    e.printStackTrace();
			}
		

		}

	} catch (HibernateException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return SpecialityWiseCountList;
}



private List<SpecialityWiseCountReport> getDepartmentWisePatientReportCount(String fromDatein, String toDatein) {

	
	Query querySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_department_wise_patient_count(:fromDatein,:toDatein)");
	querySp.setParameter("fromDatein", fromDatein);
	querySp.setParameter("toDatein", toDatein);
	querySp.setResultTransformer(new AliasToBeanResultTransformer(SpecialityWiseCountReport.class));
	@SuppressWarnings("unchecked")
	List<SpecialityWiseCountReport> specialityWiseCountReportList = querySp.list();		
	
	return specialityWiseCountReportList;
	

	
}
private Object getCountOrList(Integer department, Integer specialisationId, String parsedfromDate, String parsedToDate) {
	 String countQueryString = "SELECT COUNT(*) FROM ehat_treatment " +
	            "WHERE deleted = 'N' " +
	            "AND department_id = " + department + " " +
	            "AND SUBSTR(created_date_time, 1, 10) >= '" + parsedfromDate + "' " +
	            "AND SUBSTR(created_date_time, 1, 10) <= '" + parsedToDate + "' " +
	            "AND speciality_id = " + specialisationId;

		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(countQueryString);
		return ((BigInteger) countQuery.uniqueResult()).longValue();
	 
}






private Object getCountForSurgerySpecialisation(Integer department, Integer specialisationId, String fromDateParsed, String toDateParsed) {
	 String queryString = "SELECT COUNT( distinct ebdi.treatment_id) AS surgery_count " +
	            "FROM ehat_treatment et " +
	            "JOIN ehat_bill_details_ipd ebdi ON ebdi.treatment_id = et.treatment_id " +
	            "JOIN treatment_operations top ON top.treatment_id = et.treatment_id " +
	            "JOIN treatmentoperationsmanage tom ON  top.ID = tom.treatmentOperationsID " +
	            "WHERE et.deleted = 'N' " +
	            "AND et.department_id = " + department + " " +
	            " AND tom.opStatus = 'Y' AND ebdi.ot_flag = 'Y' "+
	            "AND et.speciality_id = " + specialisationId + " " +
	            "AND SUBSTR(ebdi.created_date_time, 1, 10) BETWEEN '" + fromDateParsed + "' AND '" + toDateParsed + "'";

		Query qry = sessionFactory.getCurrentSession().createSQLQuery(queryString);
		return ((BigInteger) qry.uniqueResult()).longValue();	
    }


private Object getCountForDischargeSpecialisation(Integer department, Integer specialisationId, String parsedfromDate,
		String parsedToDate, String dischargeType) {
	String queryString = "";
	if (dischargeType.equalsIgnoreCase("Dead")) { 
		queryString = "SELECT COUNT(ds.patientId) " + "FROM ehat_treatment et "
			+ "JOIN death_record_master ds ON ds.patientId = et.patient_id " + "WHERE ds.deleted = 'N' "
			+ "AND et.speciality_id = " + specialisationId + " "
			+ "AND ds.death_flag = 'Y' "
			+ "AND SUBSTR(ds.death_date, 1, 10) >= '" + parsedfromDate + "' "
			+ "AND SUBSTR(ds.death_date, 1, 10) <= '" + parsedToDate + "'";
	} else {
		queryString = "SELECT COUNT(DISTINCT et.treatment_id) " + "FROM ehat_treatment et "
			+ "JOIN discharge_summery ds ON ds.Treatment_ID = et.treatment_id " + "WHERE et.deleted = 'N' "
			+ "AND et.department_id = " + department + " "
			+ "AND et.speciality_id = " + specialisationId + " "
			+ "AND SUBSTR(discharge_date, 1, 10) >= '" + parsedfromDate + "' "
			+ "AND SUBSTR(discharge_date, 1, 10) <= '" + parsedToDate + "'";
	}

		

		Query qry = sessionFactory.getCurrentSession().createSQLQuery(queryString);
		return ((BigInteger) qry.uniqueResult()).longValue();
	
}





@Override
public BillRegisterReportDto getLabBillRegisterReport(int unitId, int userId, String fDate, String tDate,
		String callFrom) {
	BillRegisterReportDto mainObj=new BillRegisterReportDto();
	List<BillRegisterReportDto> ltPatientRecord = null;
	
	/*
	 * List<BillRegisterReportDto> lstOpd = new ArrayList<>();
	 * List<BillRegisterReportDto> lstIpd = new ArrayList<>();
	 * List<BillRegisterReportDto> lstDiagno = new ArrayList<>();
	 */try {
		/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                .get(RegistrationDto.class, patientId);*/
		String sql="";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.setTime(sdf.parse(tDate));
		c.add(Calendar.DATE, 1);  // number of days to add
		tDate = sdf.format(c.getTime());  // dt is now the new date
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(BillRegisterReportDto.class);
		
		if(callFrom.equalsIgnoreCase("0")) {
			criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			}	else if(callFrom.equalsIgnoreCase("1")) {
			criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("departmentId", 1));
			criteria.add(Restrictions.eq("invoiceFlag", "Y"));
		}else if(callFrom.equalsIgnoreCase("2")) {
			criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("departmentId", 2));
			criteria.add(Restrictions.eq("invoiceFlag", "Y"));
		}else if(callFrom.equalsIgnoreCase("3")) {
			criteria.add(Restrictions.ge("invoiceDateTime", sdf.parse(fDate))); 
			criteria.add(Restrictions.le("invoiceDateTime", sdf.parse(tDate)));
			criteria.add(Restrictions.eq("departmentId", 3));
			criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			
		}
		criteria.add(Restrictions.eq("unitId", unitId));
	
		//criteria.addOrder(Order.desc("treatmentId"));
		criteria.addOrder(Order.desc("createdDateTime"));
		//criteria.setMaxResults(10);
		ltPatientRecord = criteria.list();
		
		List<BillRegisterReportDto> lstOpd = ltPatientRecord.stream()
			    .filter(obj -> obj.getDepartmentId() == 1)
			    .collect(Collectors.toList());

			List<BillRegisterReportDto> lstIpd = ltPatientRecord.stream()
			    .filter(obj -> obj.getDepartmentId() == 2)
			    .collect(Collectors.toList());

			List<BillRegisterReportDto> lstDiagno = ltPatientRecord.stream()
			    .filter(obj -> obj.getDepartmentId() == 3)
			    .collect(Collectors.toList());
			
			
//		for(BillRegisterReportDto obj:ltPatientRecord){
			
		
			
            //    int treatmentId=obj.getTreatmentId();
			
		//	String sqlTreat=" select department_id from ehat_treatment where treatment_id="+treatmentId+" ";
		//	int departmentId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlTreat).uniqueResult()).intValue();
			
		//	sqlTreat=" select charges_slave_id from ehat_treatment where treatment_id="+treatmentId+" ";
		//	int sponsorId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlTreat).uniqueResult()).intValue();
			
		//	FinanceReportAmtDto fobj=getAmtsForReports(treatmentId,departmentId,sponsorId);
			
		//	obj.setTotBill(fobj.getTotalAMt());
			//obj.setDiscAmt(fobj.getTotalDiscountAMt());
		//	obj.setTotPaid(fobj.getTotalPaidAMt());
		//	obj.setTotalRefund(fobj.getTotalRefundAMt());
			
		//	if(departmentId == 2) { 
		//		obj.setTotBal((fobj.getTotalAMt()+fobj.getTotalRefundAMt() ) -(fobj.getTotalDiscountAMt() +fobj.getTotalPaidAMt() + fobj.getTotalConAMt()));
		//	 }else  {
		//		obj.setTotBal((fobj.getTotalAMt()) -(fobj.getTotalDiscountAMt() +fobj.getTotalPaidAMt() + fobj.getTotalConAMt()));
		//	 }
		
		// 	obj.setNetAmt(fobj.getTotalAMt() - ( fobj.getTotalConAMt()+fobj.getTotalDiscountAMt() ));
		//	obj.setTotalConcession(fobj.getTotalConAMt());
			
//			if(  fobj.getTotalPaidAMt() > obj.getNetAmt()) {
				
//				obj.setDeposit(fobj.getTotalPaidAMt() - obj.getNetAmt());
//			}else {
//				obj.setDeposit(0);
//			}
			
			
			/*
			 * if(departmentId == 2) { sql =
			 * "select ifnull(total_discount,0) as total_discount ,ifnull (GROUP_CONCAT((select doc_name from doctor where User_ID = d.approved_by) SEPARATOR ',') ,'') AS approved_by, ifnull (GROUP_CONCAT(approved_remark SEPARATOR ','),'') AS approved_remark from ehat_ipdbill_discount d where d.approved_status='Y' and d.deleted='N' and  treatment_id="
			 * + obj.getTreatmentId(); Query refQuery1 =
			 * sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * refQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * System.out.println("Discount=" + refQuery1);
			 * 
			 * @SuppressWarnings("unchecked") List<Map<String, Object>> listBillDetails1 =
			 * refQuery1.list(); for (Map<String, Object> row : listBillDetails1) {
			 * 
			 * //obj.setTotDisc((Double)row.get("total_discount"));
			 * obj.setApproveBy((String)row.get("approved_by"));
			 * obj.setApproveRemark((String)row.get("approved_remark")); } }else {
			 * 
			 * sql =
			 * "select ifnull (GROUP_CONCAT((select doc_name from doctor where User_ID = d.disc_givenby) SEPARATOR ',') ,'') AS approved_by, ifnull (GROUP_CONCAT(disc_remark SEPARATOR ','),'') AS approved_remark from ehat_receipt_master d where   d.deleted='N' and  disc_narrarion > 0 and  treatment_id="
			 * + obj.getTreatmentId(); Query refQuery1 =
			 * sessionFactory.getCurrentSession().createSQLQuery(sql);
			 * refQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * System.out.println("Discount=" + refQuery1);
			 * 
			 * @SuppressWarnings("unchecked") List<Map<String, Object>> listBillDetails1 =
			 * refQuery1.list(); for (Map<String, Object> row : listBillDetails1) {
			 * 
			 * //obj.setTotDisc((Double)row.get("total_discount"));
			 * obj.setApproveBy((String)row.get("approved_by"));
			 * obj.setApproveRemark((String)row.get("approved_remark")); } }
			 */
		//	obj.setTotDisc(fobj.getTotalDiscountAMt());
		//	obj.setBedName("");
			 
			// start patho test details
		//	  if(departmentId == 1 || departmentId ==3) {
//				         String sqlPathoGross=" select fun_get_grossAmt_pathology("+treatmentId+","+sponsorId+","+0+")";
//				        double pathoBillAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoGross).uniqueResult();
//				        obj.setPathoBillAmt(pathoBillAmt);
//				        
//				        String sqlPathoDiscount=" select fun_get_discountAmt_pathology("+treatmentId+","+0+")";
//				        double pathoDicountAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoDiscount).uniqueResult();
//				        obj.setPathoDiscountAmt(pathoDicountAmt);
//				        
//				        String sqlPathoConcession=" select  fun_get_concessionAmt_pathology("+treatmentId+","+sponsorId+","+0+")";
//				        double pathoConcessionAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoConcession).uniqueResult();
//				        obj.setPathoConcessionAmt(pathoConcessionAmt);
//				        
//				        String sqlPathoPaidAmt=" select  fun_get_paidAmt_pathology("+treatmentId+","+0+","+sponsorId+")";
//				        double pathoPaidAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoPaidAmt).uniqueResult();
//				        obj.setPathoPaidAmt(pathoPaidAmt);
//				        
//				        String sqlPathoRefundAmt=" select  fun_get_refundAmt_pathology_opd("+treatmentId+","+0+")";
//				        double pathoRefundAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoRefundAmt).uniqueResult();
//				        obj.setPathoRefundAmt(pathoRefundAmt);
				        
				   //     obj.setPathoNetAmt(pathoBillAmt-(pathoDicountAmt+pathoConcessionAmt) );
				        
				   //     obj.setPathoDuesAmt(obj.getPathoNetAmt() -pathoPaidAmt);
//			  }
			  
//			   if(departmentId == 2) {
//
//			         String sqlPathoGross=" select fun_get_grossAmt_pathology_ipd("+treatmentId+","+sponsorId+","+0+")";
//			        double pathoBillAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoGross).uniqueResult();
//			        obj.setPathoBillAmt(pathoBillAmt);
//			        
//			        String sqlPathoDiscount=" select fun_get_discountAmt_pathology_ipd("+treatmentId+","+0+")";
//			        double pathoDicountAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoDiscount).uniqueResult();
//			        obj.setPathoDiscountAmt(pathoDicountAmt);
//			        
//			        String sqlPathoConcession=" select  fun_get_concessionAmt_pathology_ipd("+treatmentId+","+sponsorId+","+0+")";
//			        double pathoConcessionAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoConcession).uniqueResult();
//			        obj.setPathoConcessionAmt(pathoConcessionAmt);
//			        
//			        String sqlPathoPaidAmt=" select  fun_get_paidAmt_pathology_ipd("+treatmentId+","+0+","+sponsorId+")";
//			        double pathoPaidAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoPaidAmt).uniqueResult();
//			        obj.setPathoPaidAmt(pathoPaidAmt);
//			        
//			        String sqlPathoRefundAmt=" select  fun_get_refundAmt_pathology_ipd("+treatmentId+","+0+")";
//			        double pathoRefundAmt=(double) sessionFactory.getCurrentSession().createSQLQuery(sqlPathoRefundAmt).uniqueResult();
//			        obj.setPathoRefundAmt(pathoRefundAmt);
			        
			     //   obj.setPathoNetAmt((pathoBillAmt)-(pathoDicountAmt+pathoConcessionAmt) );
			        
			    //    obj.setPathoDuesAmt(obj.getPathoNetAmt() -pathoPaidAmt);
		  
		//	   }			
			  
			// end patho test details
			
			
			
//			if (departmentId == 1) {
//
//				lstOpd.add(obj);
//
//				try {
//					if (lstOpd.size() > 0) {
//
//						// fetch doctor_followup_days from hospital table
//						Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
//								"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
//						Integer doctorFollowupDays = (Integer) q3.uniqueResult();
//						
//						String countTreatmentQ ="select count(*) from ehat_treatment where deleted='N' AND patient_id="+obj.getPatientId();
//						Query createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(countTreatmentQ);
//						BigInteger countTreatment =(BigInteger)createSQLQuery.uniqueResult();
//
//						// fetch last treatment date
//						Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
//								"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "
//										+ obj.getPatientId() + " AND t_flag = 'N' > 0)"
//										+ " THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="
//										+ obj.getPatientId()
//										+ " AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
//					
//
//						Date lastTreatmentDate = (Date) q25.uniqueResult();
//
//						// calculate difference between last treatment and current treatment
//						long differenceDays = getDifferenceDays(lastTreatmentDate,
//								new Date(new java.util.Date().getTime()));
//
//						// if diff is less than or equals followup days then apply followup charges
//					if(countTreatment.intValue()>1) {
//						
//						if (differenceDays <= doctorFollowupDays) {
//						
//							obj.setVisitType("Follow");
//						} else {
//							obj.setVisitType("New");
//						}
//					}else {
//						obj.setVisitType("New");
//					}
//						
//
//					}
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//
//			}else if(departmentId ==2) {
//				lstIpd.add(obj);
//
//				try {
//					if (lstIpd.size() > 0) {
//
//						// fetch doctor_followup_days from hospital table
//						Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
//								"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
//						Integer doctorFollowupDays = (Integer) q3.uniqueResult();
//						
//						String countTreatmentQ ="select count(*) from ehat_treatment where deleted='N' AND patient_id="+obj.getPatientId();
//						Query createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(countTreatmentQ);
//						BigInteger countTreatment =(BigInteger)createSQLQuery.uniqueResult();
//
//						// fetch last treatment date
//						Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
//								"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "
//										+ obj.getPatientId() + " AND t_flag = 'N' > 0)"
//										+ " THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="
//										+ obj.getPatientId()
//										+ " AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
//					
//
//						Date lastTreatmentDate = (Date) q25.uniqueResult();
//
//						// calculate difference between last treatment and current treatment
//						long differenceDays = getDifferenceDays(lastTreatmentDate,
//								new Date(new java.util.Date().getTime()));
//
//						// if diff is less than or equals followup days then apply followup charges
//					if(countTreatment.intValue()>1) {
//						
//						if (differenceDays <= doctorFollowupDays) {
//						
//							obj.setVisitType("Follow");
//						} else {
//							obj.setVisitType("New");
//						}
//					}else {
//						obj.setVisitType("New");
//					}
//						
//
//					}
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//
//			
//				
//				
//			}else if(departmentId ==3) {
//				lstDiagno.add(obj);
//
//				try {
//					if (lstDiagno.size() > 0) {
//
//						// fetch doctor_followup_days from hospital table
//						Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
//								"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
//						Integer doctorFollowupDays = (Integer) q3.uniqueResult();
//						
//						String countTreatmentQ ="select count(*) from ehat_treatment where deleted='N' AND patient_id="+obj.getPatientId();
//						Query createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(countTreatmentQ);
//						BigInteger countTreatment =(BigInteger)createSQLQuery.uniqueResult();
//
//						// fetch last treatment date
//						Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
//								"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "
//										+ obj.getPatientId() + " AND t_flag = 'N' > 0)"
//										+ " THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="
//										+ obj.getPatientId()
//										+ " AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
//					
//
//						Date lastTreatmentDate = (Date) q25.uniqueResult();
//
//						// calculate difference between last treatment and current treatment
//						long differenceDays = getDifferenceDays(lastTreatmentDate,
//								new Date(new java.util.Date().getTime()));
//
//						// if diff is less than or equals followup days then apply followup charges
//					if(countTreatment.intValue()>1) {
//						
//						if (differenceDays <= doctorFollowupDays) {
//						
//							obj.setVisitType("Follow");
//						} else {
//							obj.setVisitType("New");
//						}
//					}else {
//						obj.setVisitType("New");
//					}
//						
//
//					}
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
//
//			   //lstDiagno.add(obj);	
//			}
			
			mainObj.setLstOpd(lstOpd);
			mainObj.setLstIpd(lstIpd);
			mainObj.setLstDaigno(lstDiagno);
//		}

	} catch (Exception e) {
		e.printStackTrace();
		return mainObj;
	}
	return mainObj;
}


public int setDistributeAmountForLab(String fromDate, String toDate, Integer departmentId) {

	int result = 0;

	try {

		if (departmentId == 2) {

			String sql = "select treatment_id from ehat_bill_master where department_id = 2 and date(inv_created_date_time) >= '"
					+ fromDate + "' and date(inv_created_date_time)<= '" + toDate + "' and invoice_flag ='Y'  ";
			Query refQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			refQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillDetails1 = refQuery1.list();
			for (Map<String, Object> row : listBillDetails1) {

				int treatmentId = (Integer) row.get("treatment_id");
				ipdBillDao.setIpdBillDetailsDistribute(treatmentId, null);
				opdBillDao.setBulkSettleDistributeOnload(treatmentId, null);
			}
			result = 1;
		} else {

			String sql = "select treatment_id from ehat_bill_master where department_id <> 2 and date(inv_created_date_time) >= '"
					+ fromDate + "' and date(inv_created_date_time)<= '" + toDate + "' and invoice_flag ='Y'  ";
			Query refQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			refQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillDetails1 = refQuery1.list();
			for (Map<String, Object> row : listBillDetails1) {

				int treatmentId = (Integer) row.get("treatment_id");
				
				opdBillDao.setOpdBillDetailsDistribute(treatmentId, null);
				opdBillDao.setBulkSettleDistributeOnload(treatmentId, null);
//				ipdBillDao.setIpdBillDetailsDistribute(treatmentId, null);
				result = 1;
			}
		}
	} catch (Exception e) {

		result = 0;
		e.printStackTrace();
	}
	return result;
}
}
