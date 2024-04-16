package com.hms.ehat.dao.impl;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Hall;
import com.hms.ehat.dao.RegDao;
import com.hms.ehat.dto.AdmissionReportSiddhiDTO;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DemographicPatientDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.DoctorWisePatientsCountDto;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ehat.dto.IpdBedDetailsDTO;
import com.hms.ehat.dto.MlcDetailsDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.OtherBillReceiptMasterDTO;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.PaymentResponsibleDto;
import com.hms.ehat.dto.PrefixDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegTreBillDto1;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationOtherDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.dto.TokenDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.dto.admissionReportViewDto;
import com.hms.ehat.service.AutosuggestionService;
import com.hms.ipdbill.daoImpl.BillDaoImpl;
import com.hms.ipdbill.dto.BillReceiptMasterDTO;
//import com.lowagie.toolbox.plugins.Add3D;
import com.hms.ipdbill.dto.BillReceiptSlaveDTO;
import com.hms.opdbill.dto.PatientHeaderInfoDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.SendSMSNoble;

@Repository
public class RegDaoImpl implements RegDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	AutosuggestionService autoSuggService;
	
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
 	SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
	String todays_time = formatter1.format(currentDate.getTime());
 	SimpleDateFormat formatter3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String todays_date3 = formatter3.format(currentDate.getTime());
  	SimpleDateFormat formatter2 = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date2 = formatter2.format(currentDate.getTime());
	SimpleDateFormat formatter4 = new SimpleDateFormat("yyyy-MM-dd");
	String todays_date4 = formatter4.format(currentDate.getTime());
	 
	 //subtracting a day	 
	 
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String sponsor =(String) resourceBundleEhat.getString("sponsor");
	Integer sponsorid = Integer.parseInt(sponsor);	 
	 
	@Override
	public synchronized int savePatient(String patientDetails,String treatDetails,String billMaster,String billDetails,String queryType,
			Integer AppId,String paymentResponsibleDetails,String mlcDetails,HttpServletRequest request){
		
		ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String smsSendNewFlow =(resourceBundle.getObject("smsSendNewFlow").toString());
		int treatId = 0;
		try {
			// current login user id
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			List<TreatmentDto> lstTreat = new ArrayList<TreatmentDto>();
			List<BillMasterDto> lstBill = new ArrayList<BillMasterDto>();
			List<BillDetailsDto> lstBillDetails = new ArrayList<BillDetailsDto>();
			List<BillDetailsIpdDto> lstBillDetailsIpd = new ArrayList<BillDetailsIpdDto>();
			List<PaymentResponsibleDto> lstPayRes = new ArrayList<PaymentResponsibleDto>();
			List<MlcDetailsDto> lstMlc = new ArrayList<MlcDetailsDto>();			
			
			// ====================== For ehat_patient table DTO ============================
			RegistrationDto registrationDto = (RegistrationDto) ConfigUIJSONUtility.getObjectFromJSON(patientDetails, RegistrationDto.class);
					
			// ====================== For ehat_treatment table DTO ============================
			TreatmentDto treatmentDto = (TreatmentDto) ConfigUIJSONUtility.getObjectFromJSON(treatDetails, TreatmentDto.class);			
			TreatmentDto treatObj = saveTreatmentDetails(treatmentDto.getListTreatment().get(0), queryType, userId);
			
			// ====================== For ehat_bill_master table DTO ============================
			BillMasterDto billMasterDto = (BillMasterDto) ConfigUIJSONUtility.getObjectFromJSON(billMaster, BillMasterDto.class);
			BillMasterDto billObj = saveBillMaster(billMasterDto.getListBill().get(0), queryType, userId);
			
			// ====================== For ehat_bill_details/ehat_bill_details_ipd table DTO ============================
			if (treatObj.getDepartmentId() == 2 && !billDetails.equalsIgnoreCase(null)) {

				BillDetailsIpdDto billDetailsIpdDto = (BillDetailsIpdDto) ConfigUIJSONUtility.getObjectFromJSON(billDetails, BillDetailsIpdDto.class);
				if(queryType.equalsIgnoreCase("update")){
					// save bill details ipd
					//BillDetailsIpdDto billDetailsIpdObj = saveBillDetailsIpd(billDetailsIpdDto.getListBillDetailsIpd().get(0), queryType, userId, treatObj.getDoctorIdList());
					//lstBillDetailsIpd.add(billDetailsIpdObj);
				}				
				
			} else {

				BillDetailsDto billDetailsDto = (BillDetailsDto) ConfigUIJSONUtility.getObjectFromJSON(billDetails, BillDetailsDto.class);
				// save bill details opd & diagnosis
				//BillDetailsDto billDetailsObj = saveBillDetails(billDetailsDto.getListBillDetails().get(0), queryType, userId, treatObj.getDoctorIdList());
				//lstBillDetails.add(billDetailsObj);
				//lstBillDetails = billDetailsObj.getListBillDetails();
			}			
			
			// ====================== For ehat_payment_responsible table DTO ============================
			PaymentResponsibleDto paymentDto = (PaymentResponsibleDto) ConfigUIJSONUtility.getObjectFromJSON(paymentResponsibleDetails,PaymentResponsibleDto.class);
			// save payment responsible details
			lstPayRes.add(paymentDto.getListPayRes().get(0));
			
			// ====================== For ehat_mlc_details table DTO ============================
			MlcDetailsDto mlcDto = (MlcDetailsDto) ConfigUIJSONUtility.getObjectFromJSON(mlcDetails, MlcDetailsDto.class);
			// save payment mlc details
			lstMlc.add(mlcDto.getListMlcDetails().get(0));
				
			// ====================== For save sponsor details ============================
			if(billObj.getSourceTypeId()==1){
				//save sponsor details
				saveSponsorDetails(treatId,billObj.getSponsorId(),queryType,request);
			}
			
			//billObj.setListBillDetails(lstBillDetails);
			//billObj.setListBillDetailsIpd(lstBillDetailsIpd);
			billObj.setListPayRes(lstPayRes);
			billObj.setListMlcDetails(lstMlc);			
			lstBill.add(billObj);
			
			treatObj.setListBill(lstBill);	
			//treatObj.setListBillDetails(lstBillDetails);
			//treatObj.setListBillDetailsIpd(lstBillDetailsIpd);
			treatObj.setListPayRes(lstPayRes);
			treatObj.setListMlcDetails(lstMlc);				
			lstTreat.add(treatObj);
			
			RegistrationDto patientObj = registrationDto.getListReg().get(0);
			patientObj.setListTreatment(lstTreat);
			patientObj.setListBill(lstBill);
			//patientObj.setListBillDetails(lstBillDetails);
			//patientObj.setListBillDetailsIpd(lstBillDetailsIpd);
			patientObj.setListPayRes(lstPayRes);
			patientObj.setListMlcDetails(lstMlc);				
			
			// Save patient details
			int patId = savePatientRegDetails(patientObj,queryType,userId,AppId);
			treatId = maxCountOfColumn(TreatmentDto.class, "treatmentId");
			
			// ====================== For send sms after registration ============================
			if (queryType.equalsIgnoreCase("insert")) {
				
				String pname = registrationDto.getListReg().get(0).getPrefix()+" "+registrationDto.getListReg().get(0).getfName()
						+" "+ registrationDto.getListReg().get(0).getmName()+" "+registrationDto.getListReg().get(0).getlName();
				
				if(smsSendNewFlow.equalsIgnoreCase("on")){
					//SendSMSNoble.sendSMS("Big Hospital", registrationDto.getListReg().get(0).getMobile(), userId, patId, pname,treatObj.getDepartmentId());
				}
			}
			
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}	
		return treatId;
	}
	 
	//@author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update Services
	@Override
	public int savePatientRegDetails(RegistrationDto registrationDto , String queryType , Integer userId,Integer AppId) {
		
		int a=0;
		int unitid=0;
		try {
			
			// MR Number Generation -@uthor-Sagar
            String sql1="SELECT hospital_initial FROM hospital";  
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            String initials=(String) query1.list().get(0);
            StringBuffer mrNo = new StringBuffer(initials);
            StringBuffer bufferMrNo = null;

		    SimpleDateFormat monthFormatter = new SimpleDateFormat("MM");
		    String currentMonth = monthFormatter.format(currentDate.getTime());
		
		    SimpleDateFormat yearFormatter = new SimpleDateFormat("yy");
		    String currentYear = yearFormatter.format(currentDate.getTime());
		    Integer nextYear=0;
		    String currentNextYear="";
		    Integer intPatientID=0;
		    
		    Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
		    criteria2.setProjection(Projections.max("patientId"));
		    Integer unid1 = (Integer) criteria2.uniqueResult();
		    
		    if(unid1!=null){
		        intPatientID=unid1;
		    }
		    if (Integer.parseInt(currentMonth) > 6) {
		        nextYear = Integer.parseInt(currentYear) + 1;
		        mrNo.append(currentYear);
		        mrNo.append(nextYear.toString());
		        currentNextYear = currentYear + nextYear.toString();
		    } else {
		        nextYear = Integer.parseInt(currentYear) - 1;
		        mrNo.append(currentYear);
		        mrNo.append(nextYear.toString());		
		        currentNextYear = nextYear.toString() + currentYear;
		    }
		    intPatientID = intPatientID + 1;
		    int length = intPatientID.toString().length();
		    bufferMrNo = new StringBuffer(initials + currentNextYear);
		    for (int i = length; i < 10; i++) {
		        bufferMrNo.append("0");
		    }
		    bufferMrNo.append(intPatientID.toString());
		   // System.err.println("mrn no id----------------------------------------"+bufferMrNo.toString());
		    // End Code
		    
		    //code for unit count...@uthor-Sagar
		    Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
		    criteria.setProjection(Projections.count("patientId"));
	        criteria.add(Restrictions.eq("unitId",registrationDto.getUnitId()));
	        List ltUnitMasters1=criteria.list();
	
	        //code for unit count in update/markvisit...@uthor-Sagar
	        Criteria Uncrite = sessionFactory.getCurrentSession().createCriteria(RegistrationDto.class);
	        Uncrite.setProjection(Projections.property("unitId"));
	        Uncrite.add(Restrictions.eq("patientId",registrationDto.getPatientId()));
	        Integer unid = (Integer) Uncrite.uniqueResult();
	
	        if(ltUnitMasters1.get(0)!=null){
	            long u1 = (Long) ltUnitMasters1.get(0);
	             unitid=(int) u1;
	        }
	        
	    
	        if(queryType.equalsIgnoreCase("delete")){
		        //Code for delete
		        registrationDto = (RegistrationDto) sessionFactory
		                .getCurrentSession().get(RegistrationDto.class, registrationDto.getPatientId());
		        
		        //Set values to coloumn to update...@uthor-Sagar
		        registrationDto.setDeleted("Y");
		        registrationDto.setDeletedBy(userId);
		        registrationDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
		        a=registrationDto.getPatientId();
	        
		    }else if(queryType.equalsIgnoreCase("insert")){
		        unitid++;
		        //Set values to coloumn...@uthor-Sagar
		        registrationDto.setUnitCount(unitid);    
		        registrationDto.setMrnno(bufferMrNo.toString());  
		        
		        /*ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");      
				String centerPatientId = (String)resourceBundleEhat.getString("centerPatientId");*/  
					
				String sqlForUnitId="select ifnull((unit_id),0) from ehat_unit_master where deleted='N' and active_flag='Y'";
				Query unitIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlForUnitId);
				int centerUnitId = ((Number)unitIdQuery.uniqueResult()).intValue();
				
				if(centerUnitId > 0){
					
					UnitMasterDto unObj=(UnitMasterDto) sessionFactory.getCurrentSession().get(UnitMasterDto.class, centerUnitId);
					
					String centerPatientId = "-";
					StringBuffer centerPatientCount = new StringBuffer();
					
					// Logic for state id
					for (int i = unObj.getStateId().toString().length(); i < 2; i++) {
				    	centerPatientCount.append("0");
				    }
					centerPatientCount.append(unObj.getStateId());
					
					// Logic for district id
					for (int i = unObj.getDistrictId().toString().length(); i < 2; i++) {
				    	centerPatientCount.append("0");
				    }
					centerPatientCount.append(unObj.getDistrictId());
					
					// Append Type Name
					centerPatientCount.append(unObj.getTypeName());
					// Append Year	
					centerPatientCount.append(unObj.getYear());
					// Append Patient Id
				    for (int i = length; i < 8; i++) {
				    	centerPatientCount.append("0");
				    }
				    centerPatientCount.append(intPatientID.toString());
				    centerPatientId = centerPatientCount.toString();
					registrationDto.setCenterPatientId(centerPatientId);
				}
				
		        sessionFactory.getCurrentSession().merge(registrationDto);
		        a = maxCountOfColumn(RegistrationDto.class,"patientId");
		        
		        //Added for Appoint patient reg  
		        if(AppId!=null && AppId!=0){
		        	Query Appointment = sessionFactory
						.getCurrentSession()
						.createSQLQuery("update appointment set RegFlag ='Y' "
										+ "where Appt_ID="+AppId+"");
					int result2 = Appointment.executeUpdate();
		       }
		        
		    }else if(queryType.equalsIgnoreCase("update") || queryType.equalsIgnoreCase("markvisit")){
		        if(unid==registrationDto.getUnitId() || queryType.equalsIgnoreCase("markvisit")){
		            //Set values to coloumn ...@uthor-Sagar 
		            registrationDto.setUnitCount(unitid);
		        }else{
		            unitid++;
		            //Set values to coloumn ...@uthor-Sagar 
		            registrationDto.setUnitCount(unitid);
		        }
		        //System.err.println("inside update==="+bufferMrNo.toString());
		        //registrationDto.setMrnno(bufferMrNo.toString());
		       // System.err.println("mrnno===>"+registrationDto.getMrnno());
		        RegistrationDto objectToUpdate = (RegistrationDto)sessionFactory.getCurrentSession().get(RegistrationDto.class, registrationDto.getPatientId());
		 		objectToUpdate.setUpdatedDateTime(registrationDto.getUpdatedDateTime());
				objectToUpdate.setUpdatedBy(registrationDto.getUpdatedBy());
				objectToUpdate.setDeleted("N");
				objectToUpdate.setUnitCount(registrationDto.getUnitCount());
				
				//objectToUpdate
		        sessionFactory.getCurrentSession().merge(registrationDto);
		         
		         
		        a=registrationDto.getPatientId();
		              
		        
		        //Added for Appoint patient reg by markvisit
		        if(AppId!=null){
		            Query Appointment = sessionFactory.getCurrentSession().createSQLQuery("update appointment set RegFlag ='Y' "
		    								+ "where Patient_ID="+registrationDto.getPatientId()+"");
		    		int result2 = Appointment.executeUpdate();
		        }
		}
    
    } catch (Exception e) {
			e.printStackTrace();
			a=-1;
		}
		//returning Patient Id
		return a;
	}
	
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
	// Services
	//@Override
	public synchronized TreatmentDto saveTreatmentDetails(TreatmentDto treatmentDto,
			String queryType, Integer userId) {
			Calendar cal  = Calendar.getInstance();
			Calendar now = Calendar.getInstance();		 
		 
		// @author : Kishor Lokhande @date: 17-July-2018
		// @reason : To dynamic change financial year like 18-19 / 19-20
		int cur_yr1 = 0;
		int next_yr = 0;
		String year = "";
		DateFormat date1 = new SimpleDateFormat("MM");
		String cur_month = date1.format(new java.util.Date());
		int cur_month1 = (Integer.parseInt(cur_month));
		
		if (cur_month1 < 4) {

			DateFormat date = new SimpleDateFormat("yy");
			String cur_yr = date.format(new java.util.Date());

			cur_yr1 = (Integer.parseInt(cur_yr));
			next_yr = (Integer.parseInt(cur_yr) - 1);
			year = next_yr + "-" + cur_yr1;
		

		} else {
			DateFormat date = new SimpleDateFormat("yy");
			String cur_yr = date.format(new java.util.Date());
			
			cur_yr1 = (Integer.parseInt(cur_yr));
			next_yr = (Integer.parseInt(cur_yr) + 1);
			year = cur_yr1 + "-" + next_yr;
			

		}
		 
		long deptcnt=01;
		int a = 0;
		int count=0;
		//int updatecount=01;
		String deptNm="";
		String opdipdNo="";
		int tokencount=0;
		int loopCnt=0;
		String tokenno="";
		
		//Added by Laxman on 17-Jan-2018.
		ResourceBundle doctorWiseToken = ResourceBundle.getBundle("Ehat");
		
		String doctorWise = doctorWiseToken.getObject("doctorWiseToken").toString();
  		
		/*String specialityId = doctorWiseToken.getObject("specialityId").toString();
		System.out.println(specialityId+"specialityId");*/

		try {
 		//code for  trcount ...Added by @uthor-Sagar
 			/*Query q1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT count(department_id) from ehat_treatment "
									+ " where created_date_time >=CURDATE()"
									+ "and department_id =(:dId)")
					.setParameter("dId", treatmentDto.getDepartmentId());*/
  			
  			/*Query q1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT count(department_id) from ehat_treatment "
									+ " where department_id =(:dId)")
					.setParameter("dId", treatmentDto.getDepartmentId());*/
  			
  				ResourceBundle sendPatientCount = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
  				String shraddha = sendPatientCount.getObject("shraddha").toString();
  				String sql = ""; 
  				if(shraddha.equals("on")){
  					
  					sql = "SELECT count(department_id) from ehat_treatment where department_id =(:dId) and month(created_date_time) >= 4 and year(created_date_time)  >= Year(CURDATE())";
  		  			  					
  				}else{
  					
  					sql = "SELECT count(department_id) from ehat_treatment "+ " where department_id =(:dId)";  		  			  
  				}
  				
  				Query q1 = sessionFactory.getCurrentSession().createSQLQuery(sql).setParameter("dId", treatmentDto.getDepartmentId());
  				
				List rows = q1.list();
				long constCharges = ((BigInteger)rows.get(0)).longValue();
			
			
				//code for  trcount date wise ...check count of current date records
				Query q2 = sessionFactory
					.getCurrentSession()
					.createSQLQuery("SELECT count(*) from ehat_treatment where created_date_time >=CURDATE()");
				List<Integer> rows2 = q2.list();
 
				//code for  opd/ipd count ...@uthor-Sagar	
				List<UnitMasterDto> ltUnitMasters = null;
				 
					Criteria uncrit  = sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class);
					uncrit.setProjection(Projections.property("unitName"));
					uncrit.add(Restrictions.eq("unitId", treatmentDto.getUnitId()));
					uncrit.add(Restrictions.eq("deleted", "N"));
 				List<String>ltUnitMasters1=uncrit.list();
 			
 				if(ltUnitMasters1.isEmpty() || ltUnitMasters1==null){
 					
 				}else{
 				opdipdNo=ltUnitMasters1.get(0);
 				opdipdNo=opdipdNo.substring(0,2);
		
 				}
			if (queryType.equalsIgnoreCase("delete")) {
				// Code for delete
				treatmentDto = (TreatmentDto) sessionFactory
						.getCurrentSession().get(TreatmentDto.class,
								treatmentDto.getTreatmentId());

				// Set values to coloumn to update...
				treatmentDto.setDeleted("Y");
				treatmentDto.setDeletedBy(userId);
				treatmentDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
				a = treatmentDto.getTreatmentId();
			} else if (queryType.equalsIgnoreCase("insert")) {
 				//code for trcount ...@uthor-Sagar
   				if(rows2.contains(0) || rows2.contains(null)){
					deptcnt=01;
					}else{
					
 						deptcnt=constCharges;
						deptcnt++;
 					}
				//code for trcount ...@uthor-Sagar
   				if(treatmentDto.getDepartmentId()==1){
					deptNm=deptNm+"OPD"+"/"+year+"/"+deptcnt;
 					opdipdNo=opdipdNo+"/"+deptNm;
  				}else if(treatmentDto.getDepartmentId()==2){
 					deptNm=deptNm+"IPD"+"/"+year+"/"+deptcnt;
 					opdipdNo= opdipdNo+"/"+deptNm;

 				}else if(treatmentDto.getDepartmentId()==3){
 					deptNm=deptNm+"DIG"+"/"+year+"/"+deptcnt;
 					opdipdNo=opdipdNo+"/"+deptNm;

 				}else  
 				{
 					deptNm=deptNm+"NAN"+"/"+year+"/"+deptcnt;
 					opdipdNo=opdipdNo+""+opdipdNo+"/"+deptNm;

 				}
   			// Set values to coloumn...@uthor-Sagar  
				treatmentDto.setTrcount(deptNm);
				treatmentDto.setOpdipdno(opdipdNo);
  				//sessionFactory.getCurrentSession().merge(treatmentDto);
				a = maxCountOfColumn(TreatmentDto.class, "treatmentId");
				
			//Generate Token number...@Author-Sagar  
				int toknvalue=0;
				TokenDto tn=new TokenDto();
				String drid= treatmentDto.getDoctorIdList();
				
				
				/*if(treatmentDto.getDepartmentId()==1){
 				for (String s : drid.split(",")){
 					
 					//Modify By Laxman on 17-Jan-2018.
 					Query tqry = null;
 					if(doctorWise.equalsIgnoreCase("true")){
 						 tqry = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT max(token) from token_number "
												+ " where created_date_time >=CURDATE()"
												+ "and department_id =(:dId) and doctor_id=(:drid)")
								.setParameter("dId", treatmentDto.getDepartmentId()).setParameter("drid",s);

 					}else{
 						 tqry = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT max(token) from token_number "
												+ " where created_date_time >=CURDATE()"
												+ "and department_id =(:dId)")
								.setParameter("dId", treatmentDto.getDepartmentId());
 					}
 					
 					

						List<Integer> tokencnt = tqry.list();
 				 		 if(tokencnt.contains(null)){
								tokencount++;	
 							}else{
								toknvalue =(Integer) tqry.uniqueResult();
								tokencount = toknvalue;
								
								if(doctorWise.equalsIgnoreCase("false")){
									if(loopCnt==0){
									tokencount++;
									}
								}else{
									tokencount++;
								}
 							}
						tn.setToken(tokencount);
						tn.setDepartmentId(treatmentDto.getDepartmentId());
						tn.setPatientId(treatmentDto.getPatientId());
						tn.setTreatmentId(a);
						tn.setDoctorIdList(s);
						tn.setCreatedDateTime(treatmentDto.getCreatedDateTime());
						tn.setUnitId(treatmentDto.getUnitId());
						sessionFactory.getCurrentSession().merge(tn);		
						tokencount=0;
						loopCnt=1;
				  		}
 				}
			// insert patient bmi details...@uthor-Sagar
 			String dt=	formatter.format(treatmentDto.getCreatedDateTime());
  					Query bmabsa = sessionFactory
							.getCurrentSession()
							.createSQLQuery("INSERT INTO patient_bmi_details (patient_treat_id, patient_treat_count, patient_id, patient_weight"
							+ ", patient_height, patient_bmi, patient_bsa, patient_headcim, status, patient_bmi_date)"
  							+ " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
 							.setParameter(0,a).setParameter(1,treatmentDto.getTrcount()).setParameter(2,treatmentDto.getPatientId())
							.setParameter(3,treatmentDto.getWeight()).setParameter(4,treatmentDto.getHeight())
							.setParameter(5,treatmentDto.getBMI()).setParameter(6,treatmentDto.getBSA())
							.setParameter(7,treatmentDto.getHCIM()).setParameter(8,"Y").setParameter(9,dt);
 					bmabsa.executeUpdate();*/
  				}
			 
			 	else if (queryType.equalsIgnoreCase("markvisit")) {
	  					
			 		String sqlTreatActiveCount="select ifnull(count(treatment_id),0) as trCount from ehat_treatment where t_flag='Y' and patient_id="+treatmentDto.getPatientId();
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlTreatActiveCount);
					int treatActiveCount = ((Number)refQuery.uniqueResult()).intValue();
			 		if(treatActiveCount == 0){
			 		
			 		//code for  count ...
		 				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(TreatmentDto.class);
						criteria.setProjection(Projections.max("count"));
		 				criteria.add(Restrictions.eq("patientId",treatmentDto.getPatientId()));
						criteria.add(Restrictions.eq("departmentId",treatmentDto.getDepartmentId()));
		 				  List<TreatmentDto>tlist1=criteria.list();
						 if(tlist1.contains(null)){
		 					count++;	
						}else{
		 				count = (Integer) criteria.uniqueResult();
						count++;
						}
	  		 		 
			 		//code for  trcount ...@uthor-Sagar
					if(rows2.contains(0) || rows2.contains(null)){
						deptcnt=01;
						}else{
	 						deptcnt=constCharges;
							deptcnt++;
	 					}
					//code for trcount ...@uthor-Sagar
	   				if(treatmentDto.getDepartmentId()==1){
						deptNm=deptNm+"OPD"+"/"+year+"/"+deptcnt;
	 					opdipdNo=opdipdNo+"/"+deptNm;
	
	  				}else if(treatmentDto.getDepartmentId()==2){
	 					deptNm=deptNm+"IPD"+"/"+year+"/"+deptcnt;
	 					opdipdNo=opdipdNo+"/"+deptNm;
	
	 				}else if(treatmentDto.getDepartmentId()==3){
	 					deptNm=deptNm+"DIG"+"/"+year+"/"+deptcnt;
	 					opdipdNo=opdipdNo+"/"+deptNm;
	
	 				}else  
	 				{
	 					deptNm=deptNm+"NAN"+"/"+year+"/"+deptcnt;
	 					opdipdNo=opdipdNo+"/"+deptNm;
	 				}
	 				// Set values to coloumn ...@uthor-Sagar
					 	treatmentDto.setTrcount(deptNm);
					 	treatmentDto.setOpdipdno(opdipdNo);
					 	treatmentDto.setCount(count);
	  				 	 
	   				 //sessionFactory.getCurrentSession().merge(treatmentDto);
					//a = maxCountOfColumn(TreatmentDto.class, "treatmentId"); 
					
					//Generate Token number...@Author-Sagar  
					/*int toknvalue=0;
					TokenDto tn=new TokenDto();
					String drid= treatmentDto.getDoctorIdList();
	 				if(treatmentDto.getDepartmentId()==1){
	 				for (String s : drid.split(",")){
	 					//Modify By Laxman on 17-Jan-2018.
	 					Query tqry = null;
	 					if(doctorWise.equalsIgnoreCase("true")){
	 						 tqry = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT max(token) from token_number "
													+ " where created_date_time >=CURDATE()"
													+ "and department_id =(:dId) and doctor_id=(:drid)")
									.setParameter("dId", treatmentDto.getDepartmentId()).setParameter("drid",s);
	 					}else{
	 						tqry = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT max(token) from token_number "
													+ " where created_date_time >=CURDATE()"
													+ "and department_id =(:dId)")
									.setParameter("dId", treatmentDto.getDepartmentId());
	
	 					}
	 					
	 						
							List<Integer> tokencnt = tqry.list();
	 				 		 if(tokencnt.contains(null)){
									tokencount++;	
	 							}else{
									toknvalue =(Integer) tqry.uniqueResult();
									tokencount = toknvalue;
									
									if(doctorWise.equalsIgnoreCase("false")){
										if(loopCnt==0){
										tokencount++;
										}
									}else{
										tokencount++;
									}
	 							}
							tn.setToken(tokencount);
							tn.setDepartmentId(treatmentDto.getDepartmentId());
							tn.setPatientId(treatmentDto.getPatientId());
							tn.setTreatmentId(a);
							tn.setDoctorIdList(s);
							tn.setCreatedDateTime(treatmentDto.getCreatedDateTime());
							tn.setUnitId(treatmentDto.getUnitId());
							sessionFactory.getCurrentSession().merge(tn);		
							tokencount=0;
							loopCnt=1;
					  		}
	 				}
	 				
					// insert patient bmi details...@uthor-Sagar
						Query bmabsa = sessionFactory
							.getCurrentSession()
							.createSQLQuery("INSERT INTO patient_bmi_details (patient_treat_id, patient_treat_count, patient_id, patient_weight"
							+ ", patient_height, patient_bmi, patient_bsa, patient_headcim, status, patient_bmi_date)"
								+ " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
								.setParameter(0,a).setParameter(1,treatmentDto.getTrcount()).setParameter(2,treatmentDto.getPatientId())
							.setParameter(3,treatmentDto.getWeight()).setParameter(4,treatmentDto.getHeight())
							.setParameter(5,treatmentDto.getBMI()).setParameter(6,treatmentDto.getBSA())
							.setParameter(7,treatmentDto.getHCIM()).setParameter(8,"Y").setParameter(9,treatmentDto.getCreatedDateTime());
						
					bmabsa.executeUpdate();*/
					
			 	}else{
		 			
		 			a = 0;
		 		}
					
	 		} 
 			else if (queryType.equalsIgnoreCase("update")) {
 				 String dt=	formatter.format(treatmentDto.getUpdatedDateTime());
 				 //To update query without merge ...
				a = treatmentDto.getTreatmentId();
				TreatmentDto objectToUpdate = (TreatmentDto)sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentDto.getTreatmentId());
				objectToUpdate.setBMI(treatmentDto.getBMI());
				objectToUpdate.setBSA(treatmentDto.getBSA());
				objectToUpdate.setHCIM(treatmentDto.getHCIM());
				objectToUpdate.setUpdatedDateTime(treatmentDto.getUpdatedDateTime());
				objectToUpdate.setUpdatedBy(treatmentDto.getUpdatedBy());
				objectToUpdate.setDeleted("N");
				objectToUpdate.setDoctorIdList(treatmentDto.getDoctorIdList());
				objectToUpdate.setHeight(treatmentDto.getHeight());
				objectToUpdate.setWeight(treatmentDto.getWeight());
				objectToUpdate.setReferredBy(treatmentDto.getReferredBy());
				objectToUpdate.setReferredSource(treatmentDto.getReferredSource());
				objectToUpdate.setReferredSourceSlave(treatmentDto.getReferredSourceSlave());
				objectToUpdate.setReferredSourceDocId(treatmentDto.getReferredSourceDocId());
				objectToUpdate.setRefDocId(treatmentDto.getRefDocId());	
				objectToUpdate.setEmpid(treatmentDto.getEmpid());
				objectToUpdate.setTpaid(treatmentDto.getTpaid());
				objectToUpdate.setRefDate(treatmentDto.getRefDate());
				objectToUpdate.setSactionOrdNo(treatmentDto.getSactionOrdNo());
				objectToUpdate.setSanctionAmt(treatmentDto.getSanctionAmt());
				objectToUpdate.setNeisNo(treatmentDto.getNeisNo());
				
				objectToUpdate.setVisitNo(treatmentDto.getVisitNo());
				objectToUpdate.setIpdOrOpd(treatmentDto.getIpdOrOpd());
				objectToUpdate.setTreatPermited(treatmentDto.getTreatPermited());
				objectToUpdate.setDiseToBeTreat(treatmentDto.getDiseToBeTreat());
				objectToUpdate.setValidUpToDate(treatmentDto.getValidUpToDate());
				objectToUpdate.setAdmissionDateTime(treatmentDto.getAdmissionDateTime());
				objectToUpdate.setReasonofvisit(treatmentDto.getReasonofvisit());
				//Comment by Laxman on 19-Jan-2018 for active patient token not regenrate .
				/*
				//Update Token number...@Author-Sagar  
				int toknvalue=0;
				TokenDto tn=new TokenDto();
				String drid= treatmentDto.getDoctorIdList();
 				if(treatmentDto.getDepartmentId()==1){
 				for (String s : drid.split(",")){
 					//Modify By Laxman on 17-Jan-2018.
 					Query tqry = null;
 					if(doctorWise.equalsIgnoreCase("true")){
 						 tqry = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT max(token) from token_number "
												+ " where created_date_time >=CURDATE()"
												+ "and department_id =(:dId) and doctor_id=(:drid)")
								.setParameter("dId", treatmentDto.getDepartmentId()).setParameter("drid",s);

 					}else{
 						 tqry = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT max(token) from token_number "
												+ " where created_date_time >=CURDATE()"
												+ "and department_id =(:dId)")
								.setParameter("dId", treatmentDto.getDepartmentId());

 					}
 					
 						List<Integer> tokencnt = tqry.list();
 				 		 if(tokencnt.contains(null)){
								tokencount++;	
								//System.err.println("token number in nullll:--"+tokencount);
 							}else{
								toknvalue =(Integer) tqry.uniqueResult();
								tokencount = toknvalue;
								tokencount++;
								//System.err.println("token number in elseee:--"+tokencount);
 							}
						tn.setToken(tokencount);
						//System.err.println("token number:--"+tokencount);
						tn.setDepartmentId(treatmentDto.getDepartmentId());
						tn.setPatientId(treatmentDto.getPatientId());
						tn.setTreatmentId(a);
						tn.setDoctorIdList(s);
						tn.setCreatedDateTime(treatmentDto.getUpdatedDateTime());
						sessionFactory.getCurrentSession().merge(tn);
						tokencount=0;
				  		}
 				}
				
				Query alfa2 = sessionFactory
						.getCurrentSession()
						.createSQLQuery("update patient_bmi_details set patient_weight ="+treatmentDto.getWeight()+",patient_height = "
										+ treatmentDto.getHeight()
										+ ",patient_bmi ="+treatmentDto.getBMI()+",patient_bsa="+treatmentDto.getBSA()
										+ ",patient_headcim="+treatmentDto.getHCIM()+",patient_bmi_date='"+ dt +"',status='Y' "
										+ "where patient_treat_id="+a+" and patient_id="+treatmentDto.getPatientId()+" ");
 				int result2 = alfa2.executeUpdate();*/
 				
  			}		
			
 		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
		}
		return treatmentDto;
	}
	
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
		// Bill master
		//@Override
		public BillMasterDto saveBillMaster(BillMasterDto billMasterDto,
				String queryType, Integer userId) {

			int a = 0;
			try {

				if (queryType.equalsIgnoreCase("delete")) {
					// Code for delete
					billMasterDto = (BillMasterDto) sessionFactory
							.getCurrentSession().get(BillMasterDto.class,
									billMasterDto.getBillId());

					// Set values to coloumn to update
					billMasterDto.setDeleted("Y");
					billMasterDto.setDeletedBy(userId);
					billMasterDto.setDeletedDateTime(new Date(new java.util.Date()
							.getTime()));
					a = billMasterDto.getBillId();
				} else if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) {
					
					int deptId = billMasterDto.getDepartmentId();
					int count = maxCountOfBilling(BillMasterDto.class, "count",deptId);
					billMasterDto.setCount(count+1);
					
					billMasterDto.setBillId(0);//Setting zero for insert
					//sessionFactory.getCurrentSession().save(billMasterDto);
					//a = maxCountOfColumn(BillMasterDto.class, "billId");
					
					// added by vinod
				/*
				 * if(deptId==1){
				 * 
				 * generateOpdCount(userId,billMasterDto.getTreatmentId(),1); }else
				 * if(deptId==3){
				 * 
				 * generateOpdCount(userId,billMasterDto.getTreatmentId(),3); }
				 */
									

				} else if (queryType.equalsIgnoreCase("update")) {
										
					//sessionFactory.getCurrentSession().merge(billMasterDto);
					a = billMasterDto.getBillId();					
				}

			} catch (Exception e) {
				e.printStackTrace();
				a = -1;
			}
			
			//returning bill_Id
			return billMasterDto;
		}
		
		
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
	// opd_bill
	//@Override
	public BillDetailsDto saveBillDetails(BillDetailsDto billDetailsDto, String queryType,
			Integer userId, String doctorIdList) {
		int a = 0;
		List<BillDetailsDto> lstBillDetails = new ArrayList<BillDetailsDto>();
	        try {
	            // query to fetch consultation charges of the doctor
	            // used below
	        	String conChargesQuery = "";
	        	int hallslave_id = 0;
				if(billDetailsDto.getDepartmentId() == 1){
					
					hallslave_id = -1;
				}else if(billDetailsDto.getDepartmentId() == 3){
					
					hallslave_id = -3;
				}		
				
	        	/*SimpleDateFormat monthFormatter = new SimpleDateFormat("E");
	    	    String currentMonth = monthFormatter.format(currentDate.getTime());
	    	    System.err.println(currentMonth);*/	        	
	            if (queryType.equalsIgnoreCase("delete")) {
	                a = billDetailsDto.getBillDetailsId();
	                // Code for delete
	                billDetailsDto = (BillDetailsDto) sessionFactory
	                        .getCurrentSession().get(BillDetailsDto.class,
	                                billDetailsDto.getBillId());
	                // Set values to coloumn to update
	                billDetailsDto.setDeleted("Y");
	                billDetailsDto.setDeletedBy(userId);
	                billDetailsDto.setDeletedDateTime(new Date(new java.util.Date()
	                        .getTime()));
	            } else if (queryType.equalsIgnoreCase("insert")
					|| queryType.equalsIgnoreCase("markvisit")) {

				// changes done by irfan khan on amrut's call(reg charges apply
				// on markvisit)
				// if(masterConfigAccess(billDetailsDto.getUnitId(),billDetailsDto.getDepartmentId(),1)
				// && !queryType.equalsIgnoreCase("markvisit")){
				if (masterConfigAccess(billDetailsDto.getUnitId(),billDetailsDto.getDepartmentId(), 1)) {
					
					BillDetailsDto regService = new BillDetailsDto();
										
					regService.setBillDetailsId(billDetailsDto.getBillDetailsId());
					regService.setDepartmentId(billDetailsDto.getDepartmentId());
					regService.setDeleted("N");
					regService.setUnitId(billDetailsDto.getUnitId());
					regService.setSourceTypeId(billDetailsDto.getSourceTypeId());
					regService.setSponsorId(billDetailsDto.getSponsorId());
					regService.setChargesSlaveId(billDetailsDto.getChargesSlaveId());
					regService.setCreatedBy(billDetailsDto.getCreatedBy());
					regService.setUpdatedBy(billDetailsDto.getUpdatedBy());
					
					//if callfrom markvisit then check for the followupdays
					if (queryType.equalsIgnoreCase("markvisit")) {
						
						//fetch regFollowUpDays from hospital table
						Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT registration_followup_days as registration_followup_days FROM hospital");
						Integer regFollowUpDays = (Integer) q3.uniqueResult();
						
						/*//fetch last treatment date
						Query q2 = sessionFactory.getCurrentSession().createSQLQuery(
										"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
										+" and t_flag='N' order by treatment_id desc limit 1");*/
						
						
						//fetch last treatment date
						Query q2 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+billDetailsDto.getPatienttId()+" AND t_flag = 'N' > 0)"
									       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+billDetailsDto.getPatienttId()
									       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
										/*"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
										+" and t_flag='N' order by treatment_id desc limit 1");*/
						Date lastTreatmentDate = (Date) q2.uniqueResult();
						
						//calculate difference between last treatment and current treatment
						long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
						
						//if diff is greater then apply registraion charges else do not apply
						if(differenceDays >regFollowUpDays || regFollowUpDays == 0){
							
							Query q = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT ifnull(hospitalRegCharges,0) as hospitalRegCharges FROM hospital");
							List<String> list = q.list();
							double regCharges = Double.parseDouble(list.get(0));
							
							//registration charges sponsorwise
							Query q22 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT id FROM ehat_subservice where service_id=1 and deleted='N' limit 1");

							Integer subServIdReg = (Integer) q22
									.uniqueResult();
							Double confgRegCharges=0.0;
							// if patient is sponsor
							if (billDetailsDto.getChargesSlaveId() > 0) {

								// check if concultation charges are configured
								 confgRegCharges = autoSuggService
										.getchargessponsor(1, billDetailsDto
												.getChargesSlaveId(), 0, 0,
												subServIdReg,
												billDetailsDto.getTreatmentId());

								/*if (confgRegCharges > 0) {
									regCharges = confgRegCharges;
									System.err.println("chargesin"
											+ regCharges);
								}*/
							}
							//end reg sponsorwise
							
							//Emergency Charges code Start
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	   
				    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	regCharges = regCharges *(1+emrChrPer/100);
				    	    	confgRegCharges = confgRegCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End
							if (confgRegCharges > 0) {
								regService.setRate(regCharges);
								regService.setQuantity(1);
								regService.setAmount(regCharges * 1);
								regService.setServiceId(1);
								regService.setOtherAmount(confgRegCharges * 1);
								regService.setOtherRate(confgRegCharges);
							}else{
								regService.setRate(regCharges);
								regService.setQuantity(1);
								regService.setAmount(regCharges * 1);
								regService.setServiceId(1);
								regService.setOtherAmount(regCharges * 1);
								regService.setOtherRate(regCharges);
							}
							

							// Entry in database opd bill table for registration
							//sessionFactory.getCurrentSession().merge(billDetailsDto);
							
						}
						
					} else {
						Query q = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT ifnull(hospitalRegCharges,0) as hospitalRegCharges FROM hospital");
						List<String> list = q.list();
						double regCharges = Double.parseDouble(list.get(0));
						
						//registration charges sponsorwise
						Query q2 = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT id FROM ehat_subservice where service_id=1 and deleted='N' limit 1");

						Integer subServIdReg = (Integer) q2
								.uniqueResult();
						Double confgRegCharges=0.0;
						// if patient is sponsor
						if (billDetailsDto.getChargesSlaveId() > 0) {

							// check if concultation charges are configured
							 confgRegCharges = autoSuggService
									.getchargessponsor(1, billDetailsDto
											.getChargesSlaveId(), 0, 0,
											subServIdReg,
											billDetailsDto.getTreatmentId());

							/*if (confgRegCharges > 0) {
								regCharges = confgRegCharges;
								System.err.println("chargesin"
										+ regCharges);
							}*/
						}
						
						//end reg sponsorwise
						
						//Emergency Charges code Start------------------------------
						
						//check for holiday=today?
						Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
								"select count(*) from hospital_holiday where date="+todays_date4);

						Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
						
						//check for sunday today?
						SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
			    	    String currentDay = dayFormatter.format(currentDate.getTime());
			    	   
			    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
			    	    	
			    	    	//fetch emergency percentage
			    	    	double emrChrPer = getEmergencyPer();
			    	    	
			    	    	regCharges = regCharges *(1+emrChrPer/100);
			    	    	confgRegCharges = confgRegCharges *(1+emrChrPer/100);			    	    	 
			    	    }
			    	    
						//Emergency Charges code End-------------------------------------
						
			    	    if (confgRegCharges > 0) {
			    	    	regService.setRate(regCharges);
			    	    	regService.setQuantity(1);
			    	    	regService.setAmount(regCharges * 1);
			    	    	regService.setServiceId(1);
			    	    	regService.setOtherAmount(confgRegCharges * 1);
			    	    	regService.setOtherRate(confgRegCharges);
			    	    }else{
			    	    	regService.setRate(regCharges);
			    	    	regService.setQuantity(1);
			    	    	regService.setAmount(regCharges * 1);
			    	    	regService.setServiceId(1);
			    	    	regService.setOtherAmount(regCharges * 1);
			    	    	regService.setOtherRate(regCharges);
						}
						

						// Entry in database opd bill table for registration
						//sessionFactory.getCurrentSession().merge(billDetailsDto);
					}

					lstBillDetails.add(regService);
					regService = null;
				}
				if (masterConfigAccess(billDetailsDto.getUnitId(),billDetailsDto.getDepartmentId(), 2)) {
										
					if (!doctorIdList.equalsIgnoreCase("")
							&& !doctorIdList.equalsIgnoreCase(null)) {
						String[] ary = doctorIdList.split(",");
						for (int i = 0; i < ary.length; i++) {
							
							BillDetailsDto regService = new BillDetailsDto();
							
							regService.setBillDetailsId(billDetailsDto.getBillDetailsId());
							regService.setDepartmentId(billDetailsDto.getDepartmentId());
							regService.setDeleted("N");
							regService.setUnitId(billDetailsDto.getUnitId());
							regService.setSourceTypeId(billDetailsDto.getSourceTypeId());
							regService.setSponsorId(billDetailsDto.getSponsorId());
							regService.setChargesSlaveId(billDetailsDto.getChargesSlaveId());
							regService.setCreatedBy(billDetailsDto.getCreatedBy());
							regService.setUpdatedBy(billDetailsDto.getUpdatedBy());
							
							int docId = Integer.parseInt(ary[i]);
							
							if (billDetailsDto.getChargesSlaveId() > 0) {
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
				    	    	
			    	    	}else{
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
			    	    	}
							
							String subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1";
							
							if (queryType.equalsIgnoreCase("markvisit")) {
								//fetch doctor_followup_days from hospital table
								Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
												"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
								Integer doctorFollowupDays = (Integer) q3.uniqueResult();
								
								//fetch last treatment date
								Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+billDetailsDto.getPatienttId()+" AND t_flag = 'N' > 0)"
											       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+billDetailsDto.getPatienttId()
											       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
												/*"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
												+" and t_flag='N' order by treatment_id desc limit 1");*/
												
								
								
								Date lastTreatmentDate = (Date) q25.uniqueResult();
								
								//calculate difference between last treatment and current treatment
								long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
								
								//if diff is less than or equals followup days then apply followup charges
								if(differenceDays <= doctorFollowupDays){
									SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
						    	    String currentDay = dayFormatter.format(currentDate.getTime());
						    	   
						    	  //  if(currentDay.equalsIgnoreCase("Sat") || currentDay.equalsIgnoreCase("Sun")){
						    	    if(currentDay.equalsIgnoreCase("Sun")){//only for shraddha
						    	    	//conChargesQuery = "SELECT ifnull(folloup_weekend,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT follow_weekend_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'),0) as doctorfee";
							    	    	
						    	    	}else{
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT follow_weekend_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'),0) as doctorfee";
							    	    }
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekEnd' and deleted='N' limit 1";
						    	    }else{
						    	    	//conChargesQuery = "SELECT ifnull(folloup_fees,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT followup_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'),0) as doctorfee";
							    	    	
						    	    	}else{
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT followup_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'),0) as doctorfee";							    	    	
						    	    	}
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekDay' and deleted='N' limit 1";

						    	    }
								}								
							}		
							// added by vinod	
							
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	    
				    	    if(currentDay.equalsIgnoreCase("Sun")){
				    	    	
				    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
					    	    	
				    	    	}else{
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
				    	    	}
				    	    }				    	    
							
							double constCharges = 0;
							String sqlC = "";
							if (billDetailsDto.getChargesSlaveId() > 0) {
								
								sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
							}else{
								
								sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";
							}
							
							Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlC);
							int countDr = ((Number)refQuery.uniqueResult()).intValue();
							
							if(countDr > 0){
								
								//Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery).setParameter("doctorId", docId);
								Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
								constCharges = (Double) q1.uniqueResult();
							}else{
								
								constCharges = 0; 
							}	
							// added by vinod
														
							Query q2 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(subServQueryForId);

							Integer subServIdConcsultaion = (Integer) q2
									.uniqueResult();

							// if patient is sponsor
							/*if (billDetailsDto.getChargesSlaveId() > 0) {

								// check if concultation charges are configured
								Double confgConCharges = autoSuggService
										.getchargessponsor(1, billDetailsDto
												.getChargesSlaveId(), 0, 0,
												subServIdConcsultaion,
												billDetailsDto.getTreatmentId());

								// added by vinod
								
								String sqlCSp = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
								Query spQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlCSp);
								int countDrSp = ((Number)spQuery.uniqueResult()).intValue();
								
								if(countDrSp > 0){
									
									sqlCSp = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = -1 and drflag = 'S' and deleted = 'N'";
									Query spChargeQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlCSp);
									constCharges = (Double)spChargeQuery.uniqueResult();
								}		
								// added by vinod
							}*/
														
							//Emergency Charges code Start------------------------------
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							/*SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());*/
				    	   
				    	    //if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
							if(countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	constCharges = constCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End-------------------------------------
				    	    
							regService.setRate(constCharges);
							regService.setQuantity(1);
							regService.setAmount(constCharges * 1);
							regService.setServiceId(2);
							regService.setDoctorId(docId);
							// for kishors view set service id = 0 instead of
							// doctor
							regService.setSubServiceId(subServIdConcsultaion);
							regService.setOtherAmount(constCharges * 1);
							regService.setOtherRate(constCharges);
							regService.setOtherPay(constCharges * 1);
							regService.setCoPay(constCharges);
							// Entry in database opd bill table for consultation
							//sessionFactory.getCurrentSession().merge(billDetailsDto);
							
							lstBillDetails.add(regService);
							regService = null;
						}
					}
					//a = maxCountOfColumn(BillDetailsDto.class, "billDetailsId");
				}
			} else if (queryType.equalsIgnoreCase("update")) {
	                // Delete all the consulting records from table by setting
	                // delete=Y
	                Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
	                        "update ehat_bill_details set deleted = 'Y',"
	                                + "updated_by = " + userId
	                                + ",updated_date_time = now() where "
	                                + "treatment_id = "
	                                + billDetailsDto.getTreatmentId()
	                                + " and service_id = 2 ");
	                int result = alfa.executeUpdate();
	                // get the consulting doctors list which was previously added
	                // serviceId = 2 is used for consultation
	                Query billDetailsDocId = sessionFactory
	                        .getCurrentSession()
	                        .createSQLQuery(
	                                "select doctor_id from ehat_bill_details where bill_id = (:billId) and service_id= (:serviceId) ")
	                        .setParameter("billId", billDetailsDto.getBillId())
	                        .setParameter("serviceId", 2);
	                List<Integer> rows = billDetailsDocId.list();
	                // latest list of doctors
	                if (!doctorIdList.equalsIgnoreCase("")
	                        && !doctorIdList.equalsIgnoreCase(null)) {
	                    String[] ary = doctorIdList.split(",");
	                    for (int i = 0; i < ary.length; i++) {
	                        int docId = Integer.parseInt(ary[i]);
	                        if (rows.contains(docId)) {
	                            // If the doctor is allready exist update deleted
	                            // flag by N
	                            Query alfa2 = sessionFactory
	                                    .getCurrentSession()
	                                    .createSQLQuery(
	                                            "update ehat_bill_details set deleted = 'N',updated_by = "
	                                                    + userId
	                                                    + ",updated_date_time = now() where bill_id = "
	                                                    + billDetailsDto
	                                                            .getBillId()
	                                                    + " and service_id = 2 and doctor_id ="
	                                                    + docId);
	                            int result2 = alfa2.executeUpdate();
	                        } else {
	                            // If the doctor is not exist need to insert new
	                            // record
	                            // fetch registration charges for the doctor
	                            /*Query q10 = sessionFactory.getCurrentSession()
	                                    .createSQLQuery(conChargesQuery)
	                                    .setParameter("doctorId", docId);
	                            double constCharges = (Double) q10.uniqueResult();
	                            
	                            Query q2 = sessionFactory
										.getCurrentSession()
										.createSQLQuery(
												"SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1");

								Integer subServIdConcsultaion = (Integer) q2.uniqueResult();
								
								//if patient is sponsor
								if (billDetailsDto.getChargesSlaveId() > 0) {

									// check if concultation charges are configured
									Double confgConCharges = autoSuggService.getchargessponsor(
											1, billDetailsDto.getChargesSlaveId(),
											0, 0, subServIdConcsultaion,
											billDetailsDto.getTreatmentId());
									
									if (confgConCharges > 0) {
										constCharges = confgConCharges;
										System.err.println("chargesin"
												+ constCharges);
									}
								}*/
	                        	
	                        	BillDetailsDto regService = new BillDetailsDto();
								
								regService.setBillDetailsId(billDetailsDto.getBillDetailsId());
								regService.setDepartmentId(billDetailsDto.getDepartmentId());
								regService.setDeleted("N");
								regService.setUnitId(billDetailsDto.getUnitId());
								regService.setSourceTypeId(billDetailsDto.getSourceTypeId());
								regService.setSponsorId(billDetailsDto.getSponsorId());
								regService.setChargesSlaveId(billDetailsDto.getChargesSlaveId());
								regService.setCreatedBy(billDetailsDto.getCreatedBy());
								regService.setUpdatedBy(billDetailsDto.getUpdatedBy());
	                        	
	                        	String subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1";
								
								//fetch doctor_followup_days from hospital table
								Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
												"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
								Integer doctorFollowupDays = (Integer) q3.uniqueResult();
								
								//fetch last treatment date
								Query q26 = sessionFactory.getCurrentSession().createSQLQuery(
												"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
												+" and t_flag='Y' and treatment_id="+billDetailsDto.getTreatmentId());
								Date activeTreatmentDate = (Date) q26.uniqueResult();
								System.err.println("activeTreatmentDate ===  "+activeTreatmentDate+"==treatmentid=="+billDetailsDto.getTreatmentId());
								
								//fetch last treatment date
								Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+billDetailsDto.getPatienttId()+" AND t_flag = 'N' > 0)"
											       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+billDetailsDto.getPatienttId()
											       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
										
												/*"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
												+" and t_flag='N' order by treatment_id desc limit 1");*/
								Date lastTreatmentDate = (Date) q25.uniqueResult();
								
								//calculate difference between last treatment and current treatment
								long differenceDays = getDifferenceDays(lastTreatmentDate,activeTreatmentDate);
								
								//if diff is less than or equals followup days then apply followup charges
								if(differenceDays <= doctorFollowupDays){
									SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
						    	    String currentDay = dayFormatter.format(currentDate.getTime());
						    	    
						    	   // if(currentDay.equalsIgnoreCase("Sat") || currentDay.equalsIgnoreCase("Sun")){
						    	   /* if(currentDay.equalsIgnoreCase("Sun")){//only for shraddha
						    	    	conChargesQuery = "SELECT ifnull(folloup_weekend,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekEnd' and deleted='N' limit 1";
						    	    }else{
						    	    	conChargesQuery = "SELECT ifnull(folloup_fees,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekDay' and deleted='N' limit 1";

						    	    }*/
						    	    
						    	    if(currentDay.equalsIgnoreCase("Sun")){//only for shraddha
						    	    	//conChargesQuery = "SELECT ifnull(folloup_weekend,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT follow_weekend_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'),0) as doctorfee";
							    	    	
						    	    	}else{
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT follow_weekend_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'),0) as doctorfee";
							    	    }
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekEnd' and deleted='N' limit 1";
						    	    }else{
						    	    	//conChargesQuery = "SELECT ifnull(folloup_fees,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT followup_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'),0) as doctorfee";
							    	    	
						    	    	}else{
						    	    		
						    	    		conChargesQuery = "SELECT ifnull((SELECT followup_amnt FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'),0) as doctorfee";							    	    	
						    	    	}
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekDay' and deleted='N' limit 1";

						    	    }
								}
								
							
							//Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery).setParameter("doctorId", docId);
							Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
							double constCharges = (Double) q1.uniqueResult();
														
							Query q2 = sessionFactory.getCurrentSession().createSQLQuery(subServQueryForId);

							Integer subServIdConcsultaion = (Integer) q2.uniqueResult();
                        	
								
							//Emergency Charges code Start------------------------------
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	   
				    	    //if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
				    	    if(countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	constCharges = constCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End-------------------------------------
	                            // set details to insert new record
					    	    regService.setRate(constCharges);
					    	    regService.setQuantity(1);
					    	    regService.setAmount(constCharges * 1);
					    	    regService.setServiceId(2);
					    	    regService.setDoctorId(docId);
		                            
		                            //for kishors view set service id = 0 instead of doctor
					    	    regService.setSubServiceId(subServIdConcsultaion);
					    	    regService.setCreatedBy(userId);
					    	    regService.setCreatedDateTime(new Date(new java.util.Date().getTime()));
					    	    regService.setUpdatedBy(null);
					    	    regService.setUpdatedDateTime(null);
					    	    regService.setDeleted("N");
					    	    regService.setOtherAmount(constCharges * 1);
					    	    regService.setOtherRate(constCharges);
					    	    regService.setOtherPay(constCharges * 1);
					    	    regService.setCoPay(constCharges);
	                            // Entry in database opd bill table for consultation
	                            //sessionFactory.getCurrentSession().merge(billDetailsDto);
		                        
		                        lstBillDetails.add(regService);
		                        regService = null;
	                        }
	                    }
	                }
	                // sessionFactory.getCurrentSession().merge(billDetailsDto);
					/*
					 * a = billDetailsDto.getBillId(); int tId=billDetailsDto.getTreatmentId(); int
					 * pId=billDetailsDto.getPatienttId();
					 */
	                int sponId=billDetailsDto.getSponsorId();
	                int SponSlaveId=billDetailsDto.getChargesSlaveId();
	                if(sponId > 0 || SponSlaveId > 0){
	               // getAndSetSponsorRate(tId,pId,sponId,SponSlaveId);//added by kishor
	                }
	            }
	            
				/*
				 * String sql=""; double totalAmt = 0; if(billDetailsDto.getChargesSlaveId() >
				 * 0){
				 * 
				 * sql="select ifnull(sum(other_amount),0) as totAmt FROM ehat_bill_details where deleted='N' and treatment_id="
				 * +billDetailsDto.getTreatmentId()+" and cancle='N' and service_id != 21 ";
				 * }else{
				 * 
				 * sql="select ifnull(sum(amount),0) as totAmt FROM ehat_bill_details where deleted='N' and treatment_id="
				 * +billDetailsDto.getTreatmentId()+" and cancle='N' and service_id != 21 "; }
				 * Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 * totalAmt = (Double) refQuery.uniqueResult();
				 */
	            
	            //Session session = session;
				/*
				 * String hql =
				 * "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,total_remain =:remaining WHERE treatmentId =:treatmentId"
				 * ; Query query = sessionFactory.getCurrentSession().createQuery(hql);
				 * query.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
				 * query.setParameter("totalBill",totalAmt);
				 * query.setParameter("remaining",totalAmt);
				 * query.setParameter("treatmentId",billDetailsDto.getTreatmentId());
				 * query.executeUpdate();
				 */
	            billDetailsDto.setListBillDetails(lstBillDetails);
	        } catch (Exception e) {
	            e.printStackTrace();
	            a = -1;
	        }
	        // returning bill_Id
	        return billDetailsDto;
	}
	
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
	// ipd_bill
	//@Override
	public BillDetailsIpdDto saveBillDetailsIpd(BillDetailsIpdDto billDetailsIpdDto, String queryType,
			Integer userId, String doctorIdList) {

		int a = 0;
		try {

			String conChargesQuery = "SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
			if (queryType.equalsIgnoreCase("delete")) {

				a = billDetailsIpdDto.getBillDetailsId();
				// Code for delete
				billDetailsIpdDto = (BillDetailsIpdDto) sessionFactory
						.getCurrentSession().get(BillDetailsIpdDto.class,
								billDetailsIpdDto.getBillId());

				// Set values to coloumn to update
				billDetailsIpdDto.setDeleted("Y");
				billDetailsIpdDto.setDeletedBy(userId);
				billDetailsIpdDto.setDeletedDateTime(new Date(
						new java.util.Date().getTime()));

			} else if (queryType.equalsIgnoreCase("insert")
					|| queryType.equalsIgnoreCase("markvisit")) {

				//changes done by irfan khan on amrut's call(reg charges apply on markvisit)
	               // if (masterConfigAccess(billDetailsIpdDto.getUnitId(),billDetailsIpdDto.getDepartmentId(), 1) && !queryType.equalsIgnoreCase("markvisit")) {
				if (masterConfigAccess(billDetailsIpdDto.getUnitId(),billDetailsIpdDto.getDepartmentId(), 1)) {
					

					//if callfrom markvisit then check for the followupdays
					if (queryType.equalsIgnoreCase("markvisit")) {
						
						//fetch regFollowUpDays from hospital table
						Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT registration_followup_days as registration_followup_days FROM hospital");
						Integer regFollowUpDays = (Integer) q3.uniqueResult();
						
						//fetch last treatment date
						Query q2 = sessionFactory.getCurrentSession().createSQLQuery(
										"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsIpdDto.getPatienttId()
										+" and t_flag='N' order by treatment_id desc limit 1");
						Date lastTreatmentDate = (Date) q2.uniqueResult();
						
						//calculate difference between last treatment and current treatment
						long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
						
						//if diff is greater then apply registraion charges else do not apply
						if(differenceDays >regFollowUpDays || regFollowUpDays == 0){
							
							Double confgRegCharges =0.0;
							
							Query q = sessionFactory.getCurrentSession()
									.createSQLQuery(
											"SELECT ifnull(ipdRegFee,0.0) FROM hospitalaccinfo limit 1");

									//List<String> list = q.list();
									Double regCharges =(Double) q.uniqueResult();
							//registration charges sponsorwise
							Query q22 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT id FROM ehat_subservice where service_id=1 and deleted='N' limit 1");

							Integer subServIdReg = (Integer) q22
									.uniqueResult();

							// if patient is sponsor
							if (billDetailsIpdDto.getChargesSlaveId() > 0) {

								// check if concultation charges are configured
								 confgRegCharges = autoSuggService
										.getchargessponsor(1, billDetailsIpdDto
												.getChargesSlaveId(), 0, 0,
												subServIdReg,
												billDetailsIpdDto.getTreatmentId());

								/*if (confgRegCharges > 0) {
									regCharges = confgRegCharges;
									System.err.println("chargesin"
											+ regCharges);
								}*/
							}
							
							//end reg sponsorwise
							
							//Emergency Charges code Start------------------------------
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	   
				    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	regCharges = regCharges *(1+emrChrPer/100);
				    	    	confgRegCharges = confgRegCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End-------------------------------------
				    	    if (confgRegCharges > 0) {
				    	    	billDetailsIpdDto.setRate(regCharges);
								billDetailsIpdDto.setQuantity(1);
								billDetailsIpdDto.setAmount(regCharges * 1);
								billDetailsIpdDto.setServiceId(1);
								billDetailsIpdDto.setOtherAmount(confgRegCharges * 1);
								billDetailsIpdDto.setOtherRate(confgRegCharges);
							}else{
								billDetailsIpdDto.setRate(regCharges);
								billDetailsIpdDto.setQuantity(1);
								billDetailsIpdDto.setAmount(regCharges * 1);
								billDetailsIpdDto.setServiceId(1);
								billDetailsIpdDto.setOtherAmount(regCharges * 1);
								billDetailsIpdDto.setOtherRate(regCharges);
							}
							

							// Entry in database ipd bill table for registration
							//sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
							
						}
						
					} else {
						Query qqq = sessionFactory.getCurrentSession()
								.createSQLQuery(
										"SELECT ifnull(ipdRegFee,0.0) FROM hospitalaccinfo limit 1");

						//List<String> list = q.list();
						Double regCharges =(Double) qqq.uniqueResult();// Double.parseDouble(list.get(0));
						
						//registration charges sponsorwise
						Query q22 = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT id FROM ehat_subservice where service_id=1 and deleted='N' limit 1");

						Integer subServIdReg = (Integer) q22
								.uniqueResult();
						Double confgRegCharges=0.0;
						// if patient is sponsor
						if (billDetailsIpdDto.getChargesSlaveId() > 0) {

							// check if concultation charges are configured
							 confgRegCharges = autoSuggService
									.getchargessponsor(1, billDetailsIpdDto
											.getChargesSlaveId(), 0, 0,
											subServIdReg,
											billDetailsIpdDto.getTreatmentId());

							/*if (confgRegCharges > 0) {
								regCharges = confgRegCharges;
								System.err.println("chargesin"
										+ regCharges);
							}*/
						}
						
						//end reg sponsorwise

						//Emergency Charges code Start------------------------------
						
						//check for holiday=today?
						Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
								"select count(*) from hospital_holiday where date="+todays_date4);

						Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
						
						//check for sunday today?
						SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
			    	    String currentDay = dayFormatter.format(currentDate.getTime());
			    	   
			    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
			    	    	
			    	    	//fetch emergency percentage
			    	    	double emrChrPer = getEmergencyPer();
			    	    	
			    	    	regCharges = regCharges *(1+emrChrPer/100);
			    	    	confgRegCharges = confgRegCharges *(1+emrChrPer/100);			    	    	 
			    	    }
			    	    
						//Emergency Charges code End-------------------------------------
			    	    if (confgRegCharges > 0) {
			    	    	billDetailsIpdDto.setRate(regCharges);
							billDetailsIpdDto.setQuantity(1);
							billDetailsIpdDto.setAmount(regCharges * 1);
							billDetailsIpdDto.setServiceId(1);
							billDetailsIpdDto.setOtherAmount(confgRegCharges * 1);
							billDetailsIpdDto.setOtherRate(confgRegCharges);
						}else{
							billDetailsIpdDto.setRate(regCharges);
							billDetailsIpdDto.setQuantity(1);
							billDetailsIpdDto.setAmount(regCharges * 1);
							billDetailsIpdDto.setServiceId(1);
							billDetailsIpdDto.setOtherAmount(regCharges * 1);
							billDetailsIpdDto.setOtherRate(regCharges);
						}
						

						// Entry in database ipd bill table for registration
						//sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
					}

				}

				if (masterConfigAccess(billDetailsIpdDto.getUnitId(),
						billDetailsIpdDto.getDepartmentId(), 2)) {
					//irfan khan added 19-oct-2018
					// Delete all the consulting records from table by setting
	                // delete=Y
	                Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
	                        "update ehat_bill_details_ipd set deleted = 'Y',"
	                                + "updated_by = " + userId
	                                + ",updated_date_time = now() where "
	                                + "treatment_id = "
	                                + billDetailsIpdDto.getTreatmentId()
	                                + " and service_id = 2 ");
	                int result = alfa.executeUpdate();
	                // get the consulting doctors list which was previously added
	                // serviceId = 2 is used for consultation
	                Query billDetailsDocId = sessionFactory
	                        .getCurrentSession()
	                        .createSQLQuery(
	                                "select doctor_id from ehat_bill_details_ipd where bill_id = (:billId) and service_id= (:serviceId) ")
	                        .setParameter("billId", billDetailsIpdDto.getBillId())
	                        .setParameter("serviceId", 2);
	                List<Integer> rows = billDetailsDocId.list();
					
					
					if (!doctorIdList.equalsIgnoreCase("")
							&& !doctorIdList.equalsIgnoreCase(null)) {
						String[] ary = doctorIdList.split(",");
	                    for (int i = 0; i < ary.length; i++) {
	                        int docId = Integer.parseInt(ary[i]);
	                        if (rows.contains(docId)) {
	                            // If the doctor is allready exist update deleted
	                            // flag by N
	                            Query alfa2 = sessionFactory
	                                    .getCurrentSession()
	                                    .createSQLQuery(
	                                            "update ehat_bill_details_ipd set deleted = 'N',updated_by = "
	                                                    + userId
	                                                    + ",updated_date_time = now() where bill_id = "
	                                                    + billDetailsIpdDto
	                                                            .getBillId()
	                                                    + " and service_id = 2 and doctor_id ="
	                                                    + docId);
	                            int result2 = alfa2.executeUpdate();
	                        } else {

							Query q1 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)")
									.setParameter("doctorId", docId);

							double constCharges = (Double) q1.uniqueResult();
							
							Query q2 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1");

							Integer subServIdConcsultaion = (Integer) q2.uniqueResult();
							System.err.println("chargesiD"+ billDetailsIpdDto.getChargesSlaveId());
							//if patient is sponsor
							if (billDetailsIpdDto.getChargesSlaveId() > 0) {

								// check if concultation charges are configured
								Double confgConCharges = autoSuggService.getchargessponsor(
										1, billDetailsIpdDto.getChargesSlaveId(),
										2, 0, subServIdConcsultaion,
										billDetailsIpdDto.getTreatmentId());
								
								if (confgConCharges > 0) {
									constCharges = confgConCharges;
									System.err.println("chargesin"
											+ constCharges);
								}
							}
							//Emergency Charges code Start------------------------------
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	   
				    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	constCharges = constCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End-------------------------------------
							

							billDetailsIpdDto.setRate(constCharges);
							billDetailsIpdDto.setQuantity(1);
							billDetailsIpdDto.setAmount(constCharges * 1);
							billDetailsIpdDto.setServiceId(2);
							billDetailsIpdDto.setDoctorId(docId);
							
							//for kishors view set service id = 0 instead of doctor
							billDetailsIpdDto.setSubServiceId(subServIdConcsultaion);
							billDetailsIpdDto.setOtherAmount(constCharges * 1);
							billDetailsIpdDto.setOtherRate(constCharges);
							billDetailsIpdDto.setOtherPay(constCharges * 1);
							billDetailsIpdDto.setCoPay(constCharges);

							// Entry in database opd bill table for consultation
							//sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
						}
					}
					}
					//a = maxCountOfColumn(BillDetailsIpdDto.class,"billDetailsId");
					
	                
					
				}

			} else if (queryType.equalsIgnoreCase("update")) {
				/*sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
				a = billDetailsIpdDto.getBillId();*/

                // Delete all the consulting records from table by setting
                // delete=Y
                Query alfa = sessionFactory.getCurrentSession().createSQLQuery(
                        "update ehat_bill_details_ipd set deleted = 'Y',"
                                + "updated_by = " + userId
                                + ",updated_date_time = now() where "
                                + "treatment_id = "
                                + billDetailsIpdDto.getTreatmentId()
                                + " and service_id = 2 ");
                int result = alfa.executeUpdate();
                // get the consulting doctors list which was previously added
                // serviceId = 2 is used for consultation
                Query billDetailsDocId = sessionFactory
                        .getCurrentSession()
                        .createSQLQuery(
                                "select doctor_id from ehat_bill_details_ipd where bill_id = (:billId) and service_id= (:serviceId) ")
                        .setParameter("billId", billDetailsIpdDto.getBillId())
                        .setParameter("serviceId", 2);
                List<Integer> rows = billDetailsDocId.list();
                // latest list of doctors
                if (!doctorIdList.equalsIgnoreCase("")
                        && !doctorIdList.equalsIgnoreCase(null)) {
                    String[] ary = doctorIdList.split(",");
                    for (int i = 0; i < ary.length; i++) {
                        int docId = Integer.parseInt(ary[i]);
                        if (rows.contains(docId)) {
                            // If the doctor is allready exist update deleted
                            // flag by N
                            Query alfa2 = sessionFactory
                                    .getCurrentSession()
                                    .createSQLQuery(
                                            "update ehat_bill_details_ipd set deleted = 'N',updated_by = "
                                                    + userId
                                                    + ",updated_date_time = now() where bill_id = "
                                                    + billDetailsIpdDto
                                                            .getBillId()
                                                    + " and service_id = 2 and doctor_id ="
                                                    + docId);
                            int result2 = alfa2.executeUpdate();
                        } else {
                            // If the doctor is not exist need to insert new
                            // record
                            // fetch registration charges for the doctor
                            Query q10 = sessionFactory.getCurrentSession()
                            		.createSQLQuery(
											"SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)")
									.setParameter("doctorId", docId);
                            double constCharges = (Double) q10.uniqueResult();
                            
                            Query q2 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1");

							Integer subServIdConcsultaion = (Integer) q2.uniqueResult();
							
							//if patient is sponsor
							if (billDetailsIpdDto.getChargesSlaveId() > 0) {
								// check if concultation charges are configured
								Double confgConCharges = getCharges(
										billDetailsIpdDto.getChargesSlaveId(),
										subServIdConcsultaion);
								if (confgConCharges > 0) {
									constCharges = confgConCharges;
								}
							}

							//Emergency Charges code Start------------------------------
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	   
				    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	constCharges = constCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End-------------------------------------
							

                            // set details to insert new record
                            billDetailsIpdDto.setRate(constCharges);
                            billDetailsIpdDto.setQuantity(1);
                            billDetailsIpdDto.setAmount(constCharges * 1);
                            billDetailsIpdDto.setServiceId(2);
                            billDetailsIpdDto.setDoctorId(docId);
                            
                            //for kishors view set service id = 0 instead of doctor
                            billDetailsIpdDto.setSubServiceId(subServIdConcsultaion);
                            billDetailsIpdDto.setCreatedBy(userId);
                            billDetailsIpdDto.setCreatedDateTime(new Date(
                                    new java.util.Date().getTime()));
                            billDetailsIpdDto.setUpdatedBy(null);
                            billDetailsIpdDto.setUpdatedDateTime(null);
                            billDetailsIpdDto.setDeleted("N");
                            billDetailsIpdDto.setOtherAmount(constCharges * 1);
                            billDetailsIpdDto.setOtherRate(constCharges);
                            billDetailsIpdDto.setOtherPay(constCharges);
                            billDetailsIpdDto.setCoPay(constCharges);
                            // Entry in database opd bill table for consultation
                            //sessionFactory.getCurrentSession().merge(billDetailsIpdDto);
                        }
                    }
                }
                // sessionFactory.getCurrentSession().merge(billDetailsDto);
                a = billDetailsIpdDto.getBillId();
                
                int tId=billDetailsIpdDto.getTreatmentId();
                int pId=billDetailsIpdDto.getPatienttId();
                int sponId=billDetailsIpdDto.getSponsorId();
                int SponSlaveId=billDetailsIpdDto.getChargesSlaveId();
                if(sponId > 0 || SponSlaveId > 0){
               // getAndSetSponsorRateForIpd(tId,pId,sponId,SponSlaveId);//added by kishor
                }
			}

		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
		}

		// returning bill_Id
		return billDetailsIpdDto;
	}
	
	//@author : Irfan Khan @date: 24-May-2017 @reason : To Fetch Service List
		@Override
		public RegTreBillDto getAllRecords() {
			RegTreBillDto objReg = new RegTreBillDto();
			try {
				List<RegTreBillDto> ltReg = null;
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto.class);
				ltReg = criteria.list();
				objReg.setListRegTreBillDto(ltReg);
				
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return objReg;
		}
		
	// @author : Irfan Khan @date: 31-May-2017 @reason : To Fetch Service List
	@Override
	public RegistrationDto getAllPatientList() {

		RegistrationDto objReg = new RegistrationDto();
		try {
			List<RegistrationDto> ltReg = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("patientId"));
			criteria.setMaxResults(10);
			ltReg = criteria.list();
			objReg.setListReg(ltReg);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objReg;
	}
		
	// @author : Irfan Khan @date: 29-May-2017 @reason : To Save and Update
	// Prefix
	@Override
	public int saveUpdatePrefix(PrefixDto prefixDto,
			String queryType, Integer userId) {
		try {
			if (queryType.equalsIgnoreCase("delete")) {
				// Code for delete
				prefixDto = (PrefixDto) sessionFactory
						.getCurrentSession().get(PrefixDto.class,
								prefixDto.getPrefixId());

				// Set values to coloumn to update
				prefixDto.setDeleted("Y");
				prefixDto.setDeletedBy(userId);
				prefixDto.setDeletedDateTime(new Date(
						new java.util.Date().getTime()));
			} else if (queryType.equalsIgnoreCase("insert")) {
				sessionFactory.getCurrentSession().merge(prefixDto);
			} else if (queryType.equalsIgnoreCase("update")) {
				sessionFactory.getCurrentSession().merge(prefixDto);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	//Max value of any coloumn
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
	
	//Max value of coloumn
		public int maxCountOfBilling(@SuppressWarnings("rawtypes") Class className,
	            String columnName , int paramName) {

	        Criteria criteria = sessionFactory.getCurrentSession()
	                .createCriteria(className)
	                .setProjection(Projections.max(columnName));
	        criteria.add(Restrictions.eq("departmentId", paramName));
	        Integer maxCount = (Integer) criteria.uniqueResult();
	        if (maxCount == null) {
	        	maxCount = 0;
	        }
	        return maxCount;
	    }

		/*******************************************************************************
		 * @author Kishor Lokhande
		 * @date 3_June_2017 
		 * @Code Fetching patient data bye id.
		 ******************************************************************************/
		@Override
		public List<RegTreBillDto> fetchPatientsRecordByTreatmentId(Integer treatmentId) {
 			
			List<RegTreBillDto> lstMainList = new ArrayList<RegTreBillDto>();
			
			List<RegTreBillDto> ltPatientRecord = null;
 			List<EhatBillPrefix> ltBillPrefix = null;
			try {
				/*RegistrationDto registrationDto = (RegistrationDto )sessionFactory.getCurrentSession()
                        .get(RegistrationDto.class, patientId);*/
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);
				//criteria.add(Restrictions.eq("deleted", "N"));
				//criteria.addOrder(Order.desc("unitId"));
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.setMaxResults(10);
				ltPatientRecord = criteria.list();
				
				int depId=ltPatientRecord.get(0).getDepartmentId();
				ArrayList<Integer> depIds=new ArrayList<Integer>();
				depIds.add(depId);
				depIds.add(0);
				depIds.add(4);
				
				Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
				criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
				criteriaPrefix.add(Restrictions.in("depId", depIds));
				ltBillPrefix = criteriaPrefix.list();
				
				for(RegTreBillDto obj:ltPatientRecord){
					
					obj.setListEhatBillPrefix(ltBillPrefix);
					lstMainList.add(obj);
				}
				String docId=ltPatientRecord.get(0).getDoctorId();
				
				 String sql = "select department from doctor where Doctor_ID='"+docId+"' ";
				  SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				  String docDeptId = (String) query1.uniqueResult();
				  
				  String sql1 = "select department_name from hospital_departments where idhospital_departments='"+docDeptId+"' ";
				  SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				  String docDepName = (String) query11.uniqueResult();
				  
				  ltPatientRecord.get(0).setDepartmentNameDoc(docDepName);
				  

			} catch (Exception e) {
				e.printStackTrace();
				return lstMainList;
			}
			return lstMainList;
		}
		/*******************************************************************************
		 * @author Kishor Lokhande
		 * @date 20_June_2017 
		 * @Code Fetching patient data trough Department.
		 ******************************************************************************/
		@Override
		public List<RegTreBillDto> getAllRecordsDeptwise(Integer deptId,Integer unitId,Integer userId1, String userType) {
 			RegTreBillDto obj=new RegTreBillDto();
			List<RegTreBillDto> ltPatientRecord = null;
			List<RegTreBillDto1> ltPatientRecord1 = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			String sql="";
			try {
				 
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto.class);
				
				if(deptId == 1 || deptId == 3)
				{
					
					
						if(userType.equalsIgnoreCase("doctor")){
							
							Session session = sessionFactory.getCurrentSession();
							
							 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
								Query query = session.createSQLQuery(hql);
								query.setParameter("UserID", userId1);
								String docId = query.uniqueResult().toString();
								
								
								
								String all = "SELECT bill_id FROM patient_records_details WHERE"
										+ "(doctor_id = "
										+ docId
										+ " OR doctor_id LIKE '"
										+ docId
										+ ",%'"
										+ " OR doctor_id LIKE '%,"
										+ docId
										+ ",%' OR doctor_id LIKE '%,"
										+ docId
										+ "') and department_id =:deptId and t_flag =:tFlag"
										+" and unit_id =:unitId";
										
								
								Query query2 = session.createSQLQuery(all);
								query2.setParameter("deptId", deptId);
								query2.setParameter("tFlag", "Y");
								query2.setParameter("unitId", unitId);
								
				        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				        		 List<Map<String, Object>> data1 = query2.list();
				        		 
									ArrayList<Integer> billIdArr = new ArrayList<Integer>();
									
									for (Map<String, Object> row1 : data1) {
										int bId = (Integer) row1.get("bill_id");
										billIdArr.add(bId);
										
									}
				        		 
				        		 
				        		 if(unitId > 0){//get list unit wise.
										criteria.add(Restrictions.eq("unitId", unitId));
									}
									criteria.add(Restrictions.eq("departmentId", deptId));
									criteria.add(Restrictions.eq("tFlag", "Y"));
									criteria.add(Restrictions.in("billId", billIdArr));
									
									//criteria.addOrder(Order.desc("patientId"));
									
									criteria.addOrder(Order.desc("treatmentId"));
					
									criteria.setMaxResults(10);
									ltPatientRecord = criteria.list();
																	
									for(RegTreBillDto objDto : ltPatientRecord){
										
										sql = "select ifnull(count(treatment_id),0) as visit_no from patient_records_details where patient_id="+objDto.getPatientIdd();
										Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
										objDto.setVisitNo(((Number)refQuery.uniqueResult()).intValue());
									}
									
									//Added by Sagar 
									Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				 					ltDoctorDto=criteria2.list();
				 					obj.setLstDoctorDto(ltDoctorDto);
				        		 
				        		
								
					}
				else{
					if(unitId > 0){//get list unit wise.
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					
					//criteria.addOrder(Order.desc("patientId"));
					criteria.addOrder(Order.desc("treatmentId"));
	
					criteria.setMaxResults(10);
					ltPatientRecord = criteria.list();
					
					for(RegTreBillDto objDto : ltPatientRecord){
						
						sql = "select ifnull(count(treatment_id),0) as visit_no from patient_records_details where patient_id="+objDto.getPatientIdd();
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						objDto.setVisitNo(((Number)refQuery.uniqueResult()).intValue());
					}
					
					//Added by Sagar 
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
 					ltDoctorDto=criteria2.list();
 					obj.setLstDoctorDto(ltDoctorDto);
				}
				}
				else if(deptId==2){
					
					Criteria criteriaa = sessionFactory.getCurrentSession()
							.createCriteria(RegTreBillDto1.class);
					
					if(userType.equalsIgnoreCase("doctor")){
						
						Session session = sessionFactory.getCurrentSession();
						
						 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
							Query query = session.createSQLQuery(hql);
							query.setParameter("UserID", userId1);
							String docId = query.uniqueResult().toString();
							
							
							
							String all = "SELECT bill_id FROM patient_records_details1 WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and department_id =:deptId and t_flag =:tFlag"
									+" and unit_id =:unitId";
									
							
							Query query2 = session.createSQLQuery(all);
							query2.setParameter("deptId", deptId);
							query2.setParameter("tFlag", "Y");
							query2.setParameter("unitId", unitId);
							
			        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        		 List<Map<String, Object>> data1 = query2.list();
								
								ArrayList<Integer> billIdArr = new ArrayList<Integer>();
								
								for (Map<String, Object> row1 : data1) {
									int bId = (Integer) row1.get("bill_id");
									billIdArr.add(bId);
								}
			        		 
			        		 
			        		 if(unitId > 0){//get list unit wise.
									criteriaa.add(Restrictions.eq("unitId", unitId));
								}
								criteriaa.add(Restrictions.eq("departmentId", deptId));
								criteriaa.add(Restrictions.eq("tFlag", "Y"));
								criteriaa.add(Restrictions.in("billId", billIdArr));
							
								//criteriaa.addOrder(Order.desc("patientId"));
								criteria.addOrder(Order.desc("treatmentId"));
				
								criteriaa.setMaxResults(10);
								ltPatientRecord1 = criteria.list();
								obj.setListRegTreBillDto1(ltPatientRecord1);
								//Added by Sagar 
								Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			 					ltDoctorDto=criteria2.list();
			 					
			        		 
			        		
							
				}
					
				else{ 
					
					Query q1 =sessionFactory.getCurrentSession()
				
							.createSQLQuery("select treatment_id from treatment_beds");
 							List<Integer> tidlst= q1.list();
 		
				if(unitId > 0){//get list unit wise.
					criteriaa.add(Restrictions.eq("unitId", unitId));
				}
 				criteriaa.add(Restrictions.eq("departmentId", deptId));
 				if(tidlst.contains(null)){}else{
 				criteriaa.add(Restrictions.in("treatmentId", tidlst));
 				}
				criteriaa.add(Restrictions.eq("tFlag", "Y"));
				
				criteria.addOrder(Order.desc("treatmentId"));
				//criteriaa.addOrder(Order.desc("patientId"));
				
 				criteriaa.setMaxResults(10);
				ltPatientRecord1 = criteria.list();
				
				
				
				}
				}else if(deptId == -5){

					System.err.println("=innnn-=-="+userType);
					if(userType.equalsIgnoreCase("doctor")){
						System.err.println("=innnn- innn=-="+deptId);
						Session session = sessionFactory.getCurrentSession();
						
						 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
							Query query = session.createSQLQuery(hql);
							query.setParameter("UserID", userId1);
							String docId = query.uniqueResult().toString();
							
							
							
							/*String all = "SELECT bill_id FROM patient_records_details WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and department_id =:deptId and t_flag =:tFlag"
									+" and unit_id =:unitId and patient_id order by 'desc'";*/
							
							String all = "SELECT bill_id FROM patient_records_details WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and emergency =:emergency and t_flag =:tFlag"
									+" and unit_id =:unitId";
									
							
							Query query2 = session.createSQLQuery(all);
							//query2.setParameter("deptId", deptId);
							query2.setParameter("emergency", "Y");
							
							query2.setParameter("tFlag", "Y");
							query2.setParameter("unitId", unitId);
							
			        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        		 List<Map<String, Object>> data1 = query2.list();
								
								ArrayList<Integer> billIdArr = new ArrayList<Integer>();
								
								for (Map<String, Object> row1 : data1) {
									int bId = (Integer) row1.get("bill_id");
									billIdArr.add(bId);
								}
			        		 
			        		 
			        		 if(unitId > 0){//get list unit wise.
									criteria.add(Restrictions.eq("unitId", unitId));
								}
								//criteria.add(Restrictions.eq("departmentId", deptId));
			        		 criteria.add(Restrictions.eq("emergency", "Y"));
								criteria.add(Restrictions.eq("tFlag", "Y"));
								criteria.add(Restrictions.in("billId", billIdArr));
								//System.err.println("in daoIMPL=="+deptId);
								criteria.addOrder(Order.desc("patientId"));
				
								criteria.setMaxResults(10);
								ltPatientRecord = criteria.list();
								
								//Added by Sagar 
								Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			 					ltDoctorDto=criteria2.list();
			 					obj.setLstDoctorDto(ltDoctorDto);
			        		 
			        		
							
				}
					
				else{
					
					System.err.println("=innnn- else" +
							".=-="+deptId);
					if(unitId > 0){//get list unit wise.
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					//criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					//System.err.println("in daoIMPL=="+deptId);
					criteria.addOrder(Order.desc("patientId"));
	
					criteria.setMaxResults(10);
					ltPatientRecord = criteria.list();
					
					//Added by Sagar 
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
 					ltDoctorDto=criteria2.list();
 					obj.setLstDoctorDto(ltDoctorDto);
				}
				
				}
			} catch (Exception e) {
				e.printStackTrace();
				return ltPatientRecord;
			}
			return ltPatientRecord;
		}
		
		
		//----------------------------------------------------------------------------
		
		
		@Override
		public List<RegTreBillDto1> getAllRecordsDeptwise1(Integer deptId,Integer unitId,Integer userId1, String userType) {
 			RegTreBillDto obj=new RegTreBillDto();
			List<RegTreBillDto> ltPatientRecord = null;
			List<RegTreBillDto1> ltPatientRecord1 = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			String sql="";
			try {
				 
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto.class);
				if(deptId == 1 || deptId == 3)
				{
					
					
						if(userType.equalsIgnoreCase("doctor")){
							
							Session session = sessionFactory.getCurrentSession();
							
							 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
								Query query = session.createSQLQuery(hql);
								query.setParameter("UserID", userId1);
								String docId = query.uniqueResult().toString();
								
								
								
								String all = "SELECT bill_id FROM patient_records_details WHERE"
										+ "(doctor_id = "
										+ docId
										+ " OR doctor_id LIKE '"
										+ docId
										+ ",%'"
										+ " OR doctor_id LIKE '%,"
										+ docId
										+ ",%' OR doctor_id LIKE '%,"
										+ docId
										+ "') and department_id =:deptId and t_flag =:tFlag"
										+" and unit_id =:unitId";
										
								
								Query query2 = session.createSQLQuery(all);
								query2.setParameter("deptId", deptId);
								query2.setParameter("tFlag", "Y");
								query2.setParameter("unitId", unitId);
								
				        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				        		 List<Map<String, Object>> data1 = query2.list();
				        		 
									ArrayList<Integer> billIdArr = new ArrayList<Integer>();
									
									for (Map<String, Object> row1 : data1) {
										int bId = (Integer) row1.get("bill_id");
										billIdArr.add(bId);
										System.err.println("=-=-=array"+bId);
									}
				        		 
				        		 
				        		 if(unitId > 0){//get list unit wise.
										criteria.add(Restrictions.eq("unitId", unitId));
									}
									criteria.add(Restrictions.eq("departmentId", deptId));
									criteria.add(Restrictions.eq("tFlag", "Y"));
									criteria.add(Restrictions.in("billId", billIdArr));
									//criteria.add(Restrictions.lt("patientIdd", patientId));
									//System.err.println("in daoIMPL=="+deptId);
									
									criteria.addOrder(Order.desc("treatmentId"));
									//criteria.addOrder(Order.desc("patientId"));
					
									criteria.setMaxResults(10);
									ltPatientRecord = criteria.list();
																	
									for(RegTreBillDto objDto : ltPatientRecord){
										
										sql = "select ifnull(count(treatment_id),0) as visit_no from patient_records_details where patient_id="+objDto.getPatientIdd();
										Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
										objDto.setVisitNo(((Number)refQuery.uniqueResult()).intValue());
									}
									
									//Added by Sagar 
									Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				 					ltDoctorDto=criteria2.list();
				 					obj.setLstDoctorDto(ltDoctorDto);
				        		 
				        		
								
					}
				else{
					if(unitId > 0){//get list unit wise.
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
			
					criteria.addOrder(Order.desc("treatmentId"));
					//criteria.addOrder(Order.desc("patientId"));
	
					criteria.setMaxResults(10);
					ltPatientRecord = criteria.list();
					
					for(RegTreBillDto objDto : ltPatientRecord){
						
						sql = "select ifnull(count(treatment_id),0) as visit_no from patient_records_details where patient_id="+objDto.getPatientIdd();
						Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						objDto.setVisitNo(((Number)refQuery.uniqueResult()).intValue());
					}
					
					//Added by Sagar 
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
 					ltDoctorDto=criteria2.list();
 					obj.setLstDoctorDto(ltDoctorDto);
				}
				}
				else if(deptId==2){
					
					Criteria criteriaa = sessionFactory.getCurrentSession()
							.createCriteria(RegTreBillDto1.class);
					
					if(userType.equalsIgnoreCase("doctor")){
						
						Session session = sessionFactory.getCurrentSession();
						
						 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
							Query query = session.createSQLQuery(hql);
							query.setParameter("UserID", userId1);
							String docId = query.uniqueResult().toString();
							
							
							
							String all = "SELECT bill_id FROM patient_records_details1 WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and department_id =:deptId and t_flag =:tFlag"
									+" and unit_id =:unitId";
									
							
							Query query2 = session.createSQLQuery(all);
							query2.setParameter("deptId", deptId);
							query2.setParameter("tFlag", "Y");
							query2.setParameter("unitId", unitId);
							
			        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        		 List<Map<String, Object>> data1 = query2.list();
								
								ArrayList<Integer> billIdArr = new ArrayList<Integer>();
								
								for (Map<String, Object> row1 : data1) {
									int bId = (Integer) row1.get("bill_id");
									billIdArr.add(bId);
								}
			        		 
			        		 
			        		 if(unitId > 0){//get list unit wise.
									criteriaa.add(Restrictions.eq("unitId", unitId));
								}
								criteriaa.add(Restrictions.eq("departmentId", deptId));
								criteriaa.add(Restrictions.eq("tFlag", "Y"));
								criteriaa.add(Restrictions.in("billId", billIdArr));
								//System.err.println("in daoIMPL=="+deptId);
								
								criteria.addOrder(Order.desc("treatmentId"));
								//criteriaa.addOrder(Order.desc("patientId"));
				
								criteriaa.setMaxResults(10);
								ltPatientRecord1 = criteriaa.list();
								//obj.setListRegTreBillDto1(ltPatientRecord1);
								//Added by Sagar 
								Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			 					ltDoctorDto=criteria2.list();
			 					
			        		 
			        		
							
				}
					
				else{ 
					
					Query q1 =sessionFactory.getCurrentSession()
				
							.createSQLQuery("select treatment_id from treatment_beds");
 							List<Integer> tidlst= q1.list();
 		
				if(unitId > 0){//get list unit wise.
					criteriaa.add(Restrictions.eq("unitId", unitId));
				}
 				criteriaa.add(Restrictions.eq("departmentId", deptId));
 				if(tidlst.contains(null)){}else{
 				criteriaa.add(Restrictions.in("treatmentId", tidlst));
 				}
				criteriaa.add(Restrictions.eq("tFlag", "Y"));
				System.err.println("in Manisha======="+deptId);
				criteria.addOrder(Order.desc("treatmentId"));
				
				//criteriaa.addOrder(Order.desc("patientId"));
 				criteriaa.setMaxResults(10);
				ltPatientRecord1 = criteriaa.list();
				 obj.setListRegTreBillDto1(ltPatientRecord1);
				
				
				}
				}else if(deptId == -5){

					System.err.println("=innnn-=-="+userType);
					if(userType.equalsIgnoreCase("doctor")){
						System.err.println("=innnn- innn=-="+deptId);
						Session session = sessionFactory.getCurrentSession();
						
						 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
							Query query = session.createSQLQuery(hql);
							query.setParameter("UserID", userId1);
							String docId = query.uniqueResult().toString();
							
							
							
							/*String all = "SELECT bill_id FROM patient_records_details WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and department_id =:deptId and t_flag =:tFlag"
									+" and unit_id =:unitId and patient_id order by 'desc'";*/
							
							String all = "SELECT bill_id FROM patient_records_details WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and emergency =:emergency and t_flag =:tFlag"
									+" and unit_id =:unitId";
									
							
							Query query2 = session.createSQLQuery(all);
							//query2.setParameter("deptId", deptId);
							query2.setParameter("emergency", "Y");
							
							query2.setParameter("tFlag", "Y");
							query2.setParameter("unitId", unitId);
							
			        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        		 List<Map<String, Object>> data1 = query2.list();
								
								ArrayList<Integer> billIdArr = new ArrayList<Integer>();
								
								for (Map<String, Object> row1 : data1) {
									int bId = (Integer) row1.get("bill_id");
									billIdArr.add(bId);
								}
			        		 
			        		 
			        		 if(unitId > 0){//get list unit wise.
									criteria.add(Restrictions.eq("unitId", unitId));
								}
								//criteria.add(Restrictions.eq("departmentId", deptId));
			        		 criteria.add(Restrictions.eq("emergency", "Y"));
								criteria.add(Restrictions.eq("tFlag", "Y"));
								criteria.add(Restrictions.in("billId", billIdArr));
								//System.err.println("in daoIMPL=="+deptId);
								criteria.addOrder(Order.desc("patientId"));
				
								criteria.setMaxResults(10);
								ltPatientRecord1 = criteria.list();
								
								//Added by Sagar 
								Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			 					ltDoctorDto=criteria2.list();
			 					obj.setLstDoctorDto(ltDoctorDto);
			        		 
			        		
							
				}
					
				else{
					
					System.err.println("=innnn- else" +
							".=-="+deptId);
					if(unitId > 0){//get list unit wise.
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					//criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					//System.err.println("in daoIMPL=="+deptId);
					criteria.addOrder(Order.desc("patientId"));
	
					criteria.setMaxResults(10);
					ltPatientRecord1 = criteria.list();
					
					//Added by Sagar 
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
 					ltDoctorDto=criteria2.list();
 					obj.setLstDoctorDto(ltDoctorDto);
				}
				
				}
			} catch (Exception e) {
				e.printStackTrace();
				return ltPatientRecord1;
			}
			return ltPatientRecord1;
		}
		
		
		//----------------------------------------------------------------------------

		
		
		
		@Override
		public List<RegTreBillDto> getAllRecordsDeptwise12(Integer deptId,Integer unitId,Integer userId1, String userType, String patientId) {
 			RegTreBillDto obj=new RegTreBillDto();
			List<RegTreBillDto> ltPatientRecord = null;
			List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
			try {
				 
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto.class);
				System.err.println("=-=-="+deptId);
				if(deptId == 1 || deptId == 3)
				{
					
					
						if(userType.equalsIgnoreCase("doctor")){
							
							Session session = sessionFactory.getCurrentSession();
							
							 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
								Query query = session.createSQLQuery(hql);
								query.setParameter("UserID", userId1);
								String docId = query.uniqueResult().toString();
								
								
								
								String all = "SELECT bill_id FROM patient_records_details WHERE"
										+ "(doctor_id = "
										+ docId
										+ " OR doctor_id LIKE '"
										+ docId
										+ ",%'"
										+ " OR doctor_id LIKE '%,"
										+ docId
										+ ",%' OR doctor_id LIKE '%,"
										+ docId
										+ "') and department_id =:deptId and t_flag =:tFlag"
										+" and unit_id =:unitId";
										
								
								Query query2 = session.createSQLQuery(all);
								query2.setParameter("deptId", deptId);
								query2.setParameter("tFlag", "Y");
								query2.setParameter("unitId", unitId);
								
				        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				        		 List<Map<String, Object>> data1 = query2.list();
				        		 
									ArrayList<Integer> billIdArr = new ArrayList<Integer>();
									
									for (Map<String, Object> row1 : data1) {
										int bId = (Integer) row1.get("bill_id");
										billIdArr.add(bId);
										System.err.println("=-=-=array"+bId);
									}
				        		 
				        		 
				        		 if(unitId > 0){//get list unit wise.
										criteria.add(Restrictions.eq("unitId", unitId));
									}
									criteria.add(Restrictions.eq("departmentId", deptId));
									criteria.add(Restrictions.eq("tFlag", "Y"));
									criteria.add(Restrictions.in("billId", billIdArr));
									criteria.add(Restrictions.lt("patientIdd", patientId));
									//System.err.println("in daoIMPL=="+deptId);
									
									criteria.addOrder(Order.desc("treatmentId"));
									//criteria.addOrder(Order.desc("patientId"));
					
									criteria.setMaxResults(10);
									ltPatientRecord = criteria.list();
									
									//Added by Sagar 
									Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				 					ltDoctorDto=criteria2.list();
				 					obj.setLstDoctorDto(ltDoctorDto);
				        		 
				        		
								
					}
				else{
					if(unitId > 0){//get list unit wise.
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					//System.err.println("in daoIMPL=="+deptId);
					//criteria.addOrder(Order.desc("patientId"));
					criteria.add(Restrictions.lt("patientIdd", patientId));
					//System.err.println("in daoIMPL=="+deptId);
					
					criteria.addOrder(Order.desc("treatmentId"));
					//criteria.addOrder(Order.desc("patientId"));
					criteria.setMaxResults(10);
					ltPatientRecord = criteria.list();
					
					//Added by Sagar 
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
 					ltDoctorDto=criteria2.list();
 					obj.setLstDoctorDto(ltDoctorDto);
				}
				}
				else if(deptId==2){
					
					if(userType.equalsIgnoreCase("doctor")){
						
						Session session = sessionFactory.getCurrentSession();
						
						 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
							Query query = session.createSQLQuery(hql);
							query.setParameter("UserID", userId1);
							String docId = query.uniqueResult().toString();
							
							
							
							String all = "SELECT bill_id FROM patient_records_details WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and department_id =:deptId and t_flag =:tFlag"
									+" and unit_id =:unitId";
									
							
							Query query2 = session.createSQLQuery(all);
							query2.setParameter("deptId", deptId);
							query2.setParameter("tFlag", "Y");
							query2.setParameter("unitId", unitId);
							
			        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        		 List<Map<String, Object>> data1 = query2.list();
								
								ArrayList<Integer> billIdArr = new ArrayList<Integer>();
								
								for (Map<String, Object> row1 : data1) {
									int bId = (Integer) row1.get("bill_id");
									billIdArr.add(bId);
								}
			        		 
			        		 
			        		 if(unitId > 0){//get list unit wise.
									criteria.add(Restrictions.eq("unitId", unitId));
								}
								criteria.add(Restrictions.eq("departmentId", deptId));
								criteria.add(Restrictions.eq("tFlag", "Y"));
								criteria.add(Restrictions.in("billId", billIdArr));
								//System.err.println("in daoIMPL=="+deptId);
								criteria.add(Restrictions.lt("patientIdd", patientId));
								
								criteria.addOrder(Order.desc("treatmentId"));
								//criteria.addOrder(Order.desc("patientId"));
				
								criteria.setMaxResults(10);
								ltPatientRecord = criteria.list();
								
								//Added by Sagar 
								Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			 					ltDoctorDto=criteria2.list();
			 					obj.setLstDoctorDto(ltDoctorDto);
			        		 
			        		
							
				}
					
				else{ 
					
					Query q1 =sessionFactory.getCurrentSession()
				
							.createSQLQuery("select treatment_id from treatment_beds");
 							List<Integer> tidlst= q1.list();
 		
				if(unitId > 0){//get list unit wise.
					criteria.add(Restrictions.eq("unitId", unitId));
				}
 				criteria.add(Restrictions.eq("departmentId", deptId));
 				if(tidlst.contains(null)){}else{
 				criteria.add(Restrictions.in("treatmentId", tidlst));
 				}
				criteria.add(Restrictions.eq("tFlag", "Y"));
				//System.err.println("in daoIMPL=="+deptId);
				criteria.add(Restrictions.lt("patientIdd", patientId));
				
				criteria.addOrder(Order.desc("treatmentId"));
				//criteria.addOrder(Order.desc("patientId"));
 				criteria.setMaxResults(10);
				ltPatientRecord = criteria.list();
				}
				}else if(deptId == -5){

					System.err.println("=innnn-=-="+userType);
					if(userType.equalsIgnoreCase("doctor")){
						System.err.println("=innnn- innn=-="+deptId);
						Session session = sessionFactory.getCurrentSession();
						
						 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
							Query query = session.createSQLQuery(hql);
							query.setParameter("UserID", userId1);
							String docId = query.uniqueResult().toString();
							
							
							
							/*String all = "SELECT bill_id FROM patient_records_details WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and department_id =:deptId and t_flag =:tFlag"
									+" and unit_id =:unitId and patient_id order by 'desc'";*/
							
							String all = "SELECT bill_id FROM patient_records_details WHERE"
									+ "(doctor_id = "
									+ docId
									+ " OR doctor_id LIKE '"
									+ docId
									+ ",%'"
									+ " OR doctor_id LIKE '%,"
									+ docId
									+ ",%' OR doctor_id LIKE '%,"
									+ docId
									+ "') and emergency =:emergency and t_flag =:tFlag"
									+" and unit_id =:unitId";
									
							
							Query query2 = session.createSQLQuery(all);
							//query2.setParameter("deptId", deptId);
							query2.setParameter("emergency", "Y");
							
							query2.setParameter("tFlag", "Y");
							query2.setParameter("unitId", unitId);
							
			        		 query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        		 List<Map<String, Object>> data1 = query2.list();
								
								ArrayList<Integer> billIdArr = new ArrayList<Integer>();
								
								for (Map<String, Object> row1 : data1) {
									int bId = (Integer) row1.get("bill_id");
									billIdArr.add(bId);
								}
			        		 
			        		 
			        		 if(unitId > 0){//get list unit wise.
									criteria.add(Restrictions.eq("unitId", unitId));
								}
								//criteria.add(Restrictions.eq("departmentId", deptId));
			        		 criteria.add(Restrictions.eq("emergency", "Y"));
								criteria.add(Restrictions.eq("tFlag", "Y"));
								criteria.add(Restrictions.in("billId", billIdArr));
								//System.err.println("in daoIMPL=="+deptId);
								criteria.addOrder(Order.desc("patientId"));
				
								criteria.setMaxResults(10);
								ltPatientRecord = criteria.list();
								
								//Added by Sagar 
								Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			 					ltDoctorDto=criteria2.list();
			 					obj.setLstDoctorDto(ltDoctorDto);
			        		 
			        		
							
				}
					
				else{
					
					System.err.println("=innnn- else" +
							".=-="+deptId);
					if(unitId > 0){//get list unit wise.
						criteria.add(Restrictions.eq("unitId", unitId));
					}
					//criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					//System.err.println("in daoIMPL=="+deptId);
					//criteria.addOrder(Order.desc("patientId"));
	
					criteria.setMaxResults(10);
					ltPatientRecord = criteria.list();
					
					//Added by Sagar 
					Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
 					ltDoctorDto=criteria2.list();
 					obj.setLstDoctorDto(ltDoctorDto);
				}
				
				}
			} catch (Exception e) {
				e.printStackTrace();
				return ltPatientRecord;
			}
			return ltPatientRecord;
		}
		
		//-------------------------------------------------------------------------------------------------
		
		
		
		
		
		//------------------------------------------------------------------------------------------------------
		
		
		// @author : Sagar Kadam @date: 27-Jun-2017 @reason : To Fetch Sponsor List
		@Override
		public ChargesMasterSlave fetchSponsorRecords(Integer chargesMasterDto) {

			ChargesMasterSlave objReg = new ChargesMasterSlave();
			
			
			try {
				/*List<ChargesMasterSlave> ltCMSlave = null;
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				criteria.add(Restrictions.eq("chargesMasterDto",chargesMasterDto)); //temp static values are given
				criteria.add(Restrictions.eq("isCategory","N"));
				criteria.add(Restrictions.eq("deleted","N"));
  				//criteria.setMaxResults(10);
  				ltCMSlave = criteria.list();
 				objReg.setLstChargesSlave(ltCMSlave);*/
				
				Query querySp =  sessionFactory.getCurrentSession().createSQLQuery("select   id as slaveId, category_name as categoryName from ehat_charges_master_slave where charges_master_id="+chargesMasterDto+" and isCategory='N' and deleted='N'  ");
				querySp.setResultTransformer(new AliasToBeanResultTransformer(ChargesMasterSlave.class));
				
				@SuppressWarnings("unchecked")
				List<ChargesMasterSlave> ltCMSlave = querySp.list();		
				objReg.setLstChargesSlave(ltCMSlave);
				
 			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			
			
			
			
			
			return objReg;
		}
		
		// @author : Sagar Kadam @date: 30-Jun-2017 @reason : For autosuggestion
		@Override
		public RegTreBillDto getAllRecordsDeptwiseWithAuto(Integer deptId,String letter,String usertype, Integer unitId) {
 			List<RegTreBillDto> ltPatientRecord = null;
 			RegTreBillDto obj=new RegTreBillDto();
			List<DoctorDto> ltDoctorDto=null;
 				
			try {
 				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto.class);
 				if(deptId == 1 || deptId==3 )
				{
 					if(usertype.equals("Y"))
					{
  					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
 					/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
					Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
 					LogicalExpression orExp = Restrictions.or( patientName,mobileno);*/
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 					/*criteria.add(orExp);*/}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
 				criteria.add(Restrictions.eq("departmentId", deptId));
 				criteria.add(Restrictions.eq("tFlag", "Y"));
 				criteria.addOrder(Order.desc("patientId"));
 				criteria.add(Restrictions.eq("physicalDisFlag", "N"));
				ltPatientRecord = criteria.list();
				
 				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				ltDoctorDto=criteria2.list();
				obj.setListRegTreBillDto(ltPatientRecord);
				obj.setLstDoctorDto(ltDoctorDto);
 				}else if(deptId == -5){

 					if(usertype.equals("Y"))
					{
 					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
						
 						
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 						}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));
					ltPatientRecord = criteria.list();
					obj.setListRegTreBillDto(ltPatientRecord);
 				
 				}else
 				{
 					if(usertype.equals("Y"))
					{
 					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
						/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
						Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
 						LogicalExpression orExp = Restrictions.or( patientName,mobileno);
 						criteria.add(orExp);*/ 
 						
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 						}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
					criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));
					criteria.add(Restrictions.eq("physicalDisFlag", "N"));
					ltPatientRecord = criteria.list();
					obj.setListRegTreBillDto(ltPatientRecord);
 				}

			} catch (Exception e) {
				e.printStackTrace();
				return obj;
			}
			return obj;
		}
		 
		
		//----------------------------------------------------------------------------
		
		
		
		@Override
		public RegTreBillDto1 getAllRecordsDeptwiseWithAuto1(Integer deptId,String letter,String usertype, Integer unitId) {
 			List<RegTreBillDto1> ltPatientRecord = null;
 			System.err.println("deptId--"+deptId);
 			System.err.println("letter--"+letter);

 			RegTreBillDto1 obj=new RegTreBillDto1();
			List<DoctorDto> ltDoctorDto=null;
 				
			try {
 				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegTreBillDto1.class);
 				if(deptId == 1 || deptId==3 )
				{
 					if(usertype.equals("Y"))
					{
  					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
 					/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
					Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
 					LogicalExpression orExp = Restrictions.or( patientName,mobileno);*/
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 					/*criteria.add(orExp);*/}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
 				criteria.add(Restrictions.eq("departmentId", deptId));
 				criteria.add(Restrictions.eq("tFlag", "Y"));
 				criteria.addOrder(Order.desc("patientId"));
 				criteria.add(Restrictions.eq("physicalDisFlag", "N"));
				ltPatientRecord = criteria.list();
				
 				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				ltDoctorDto=criteria2.list();
				obj.setListRegTreBillDto(ltPatientRecord);
				obj.setLstDoctorDto(ltDoctorDto);
 				}else if(deptId == -5){

 					if(usertype.equals("Y"))
					{
 					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
						
 						
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 						}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));
					ltPatientRecord = criteria.list();
					obj.setListRegTreBillDto(ltPatientRecord);
 				
 				}else
 				{
 					if(usertype.equals("Y"))
					{
 					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
						/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
						Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
 						LogicalExpression orExp = Restrictions.or( patientName,mobileno);
 						criteria.add(orExp);*/ 
 						
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 						}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
					criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));
					criteria.add(Restrictions.eq("physicalDisFlag", "N"));
					ltPatientRecord = criteria.list();
					obj.setListRegTreBillDto(ltPatientRecord);
 				}

			} catch (Exception e) {
				e.printStackTrace();
				return obj;
			}
			return obj;
		}
		
		//-----------------------------------------------------------------------------------
		
		//Added by Laxman on 15-Jan-2018 for OPDQueue Patients and Queue Management.
		@Override
		public OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(Integer deptId,String letter,String usertype, Integer unitId) {
 			List<OpdQueManagmentViewDto> ltPatientRecord = null;
 			OpdQueManagmentViewDto obj=new OpdQueManagmentViewDto();
			List<DoctorDto> ltDoctorDto=null;
 				
			try {
 				
 				if(deptId == 1 || deptId==3 )
				{
 					Criteria criteria = sessionFactory.getCurrentSession()
 							.createCriteria(OpdQueManagmentViewDto.class);
 					
 					if(usertype.equals("Y"))
					{
  					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else if(usertype.equals("age")){
 						//criteria.add(Restrictions.eq("age", letter));
 						Criterion rest1= Restrictions.like("age", letter + "%");
 						criteria.add(Restrictions.or(rest1));
 					}else if(usertype.equals("gender")){
 						criteria.add(Restrictions.eq("gender", letter));
 					}else if(usertype.equals("doctor")){
 						criteria.add(Restrictions.eq("doctorId", letter));
 					}else{
 					/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
					Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
 					LogicalExpression orExp = Restrictions.or( patientName,mobileno);*/
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 					/*criteria.add(orExp);*/}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
 				criteria.add(Restrictions.eq("departmentId", deptId));
 				criteria.add(Restrictions.eq("tFlag", "Y"));
 				criteria.addOrder(Order.desc("patientId"));
				ltPatientRecord = criteria.list();
				
 				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				ltDoctorDto=criteria2.list();
				obj.setListOpdQueManagmentViewDto(ltPatientRecord);
				obj.setLstDoctorDto(ltDoctorDto);
 				}else if(deptId == -11)
				{
 					Criteria criteria = sessionFactory.getCurrentSession()
 							.createCriteria(RegTreBillDto.class);
 					if(usertype.equals("Y"))
					{
  					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
 					/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
					Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
 					LogicalExpression orExp = Restrictions.or( patientName,mobileno);*/
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 					/*criteria.add(orExp);*/}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
 				//criteria.add(Restrictions.eq("departmentId", deptId));
 				//criteria.add(Restrictions.eq("tFlag", "Y"));
 				criteria.addOrder(Order.desc("patientId"));
				ltPatientRecord = criteria.list();
				
 				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				ltDoctorDto=criteria2.list();
				obj.setListOpdQueManagmentViewDto(ltPatientRecord);
				obj.setLstDoctorDto(ltDoctorDto);
 				}else
 				{
 					Criteria criteria = sessionFactory.getCurrentSession()
 							.createCriteria(OpdQueManagmentViewDto.class);
 					if(usertype.equals("Y"))
					{
 					 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
 					}else{
						/*Criterion patientName = Restrictions.like("patientName","%" + letter + "%");
						Criterion mobileno = Restrictions.like("mobile","%" + letter + "%");
 						LogicalExpression orExp = Restrictions.or( patientName,mobileno);
 						criteria.add(orExp);*/ 
 						
 						Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 						Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 						Criterion rest3= Restrictions.like("dob", "%" + letter + "%");
 						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
 						Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 						criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
 						}
 					if(unitId > 0){//get list unit wise.
 						criteria.add(Restrictions.eq("unitId", unitId));
 					}
					criteria.add(Restrictions.eq("departmentId", deptId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));
					ltPatientRecord = criteria.list();
					obj.setListOpdQueManagmentViewDto(ltPatientRecord);
 				}

			} catch (Exception e) {
				e.printStackTrace();
				return obj;
			}
			return obj;
		}
		 
			// @author : Sagar Kadam @date: 30-Jun-2017 @reason : For previous auto summary
 				@Override
				public List<RegTreBillDto> getAllForAutoSummary(String letter,String type) {
					 
					List<RegTreBillDto> ltPatientRecord = null;
					
					try {
						 
						if(type.equalsIgnoreCase("temp")){
	 						Query q1 =sessionFactory.getCurrentSession()
									.createSQLQuery("select treatmentId from ipd_patient_discharge_summary ");
 									
									List<Integer> rows = q1.list();
 						if (rows.size()>0) {
 							Criteria criteria = sessionFactory.getCurrentSession()
 									.createCriteria(RegTreBillDto.class);
 								
 							criteria.add(Restrictions.in("treatmentId", q1.list()));
 							criteria.add(Restrictions.eq("departmentId", 2));
 							criteria.add(Restrictions.eq("tFlag", "N"));
 	 
 							Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
 							Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
 							Criterion rest3= Restrictions.like("mobile", "%" + letter + "%");
 							Criterion rest4= Restrictions.like("patientIdd", "%" + letter + "%");
 							Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
 				 			criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));

 	 							criteria.addOrder(Order.desc("patientId"));
 	 							criteria.setMaxResults(30);
 							 
 								ltPatientRecord = criteria.list();

						}
						 
							return ltPatientRecord;
						}
						if(type.equalsIgnoreCase("auto")){
 							
							
//							fetch template wise summery
//							Query template =sessionFactory.getCurrentSession()
//									.createSQLQuery("select treatmentId from ipd_patient_discharge_summary ");
// 									
//									List<Integer> treatmentIds = template.list();
							
							
							Query q1 =sessionFactory.getCurrentSession()
									.createSQLQuery("select Treatment_ID from discharge_summery ");
 									
							List<Integer> rows = q1.list();
							
							
							
 							
							if (rows.size()>0) {

								Criteria criteria = sessionFactory.getCurrentSession()
										.createCriteria(RegTreBillDto.class);
									
								criteria.add(Restrictions.in("treatmentId", q1.list()));
								//criteria.add(Restrictions.not(Restrictions.in("treatmentId", rows)));
								criteria.add(Restrictions.eq("departmentId", 2));
								criteria.add(Restrictions.eq("tFlag", "N"));
								
								Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
								Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
								Criterion rest3= Restrictions.like("mobile", "%" + letter + "%");
								Criterion rest4= Restrictions.like("patientIdd", "%" + letter + "%");
								Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
					 			criteria.add(Restrictions.or(rest1,rest2,rest3,rest4,rest5));
		 							criteria.addOrder(Order.desc("patientId"));
		 							criteria.setMaxResults(30);
		 							
									ltPatientRecord = criteria.list();
							}
								
								return ltPatientRecord;
							
						}

					} catch (Exception e) {
						e.printStackTrace();
						return ltPatientRecord;
					}
					return ltPatientRecord;
				}

				@Override
				public IpdBedDetailsDTO getIpdBedDetailsForTid(Integer tid) {
 
				    Criteria criteria =  sessionFactory.getCurrentSession().createCriteria(IpdBedDetailsDTO.class);  
				    criteria.add(Restrictions.eq("treatId",tid));
				    criteria.addOrder(Order.desc("bId"));

				    IpdBedDetailsDTO ipdBeDeDtao = (IpdBedDetailsDTO) criteria.uniqueResult();
				    
					return ipdBeDeDtao;
				}
		
		
				// @author : Sagar Kadam @date: 27-Jun-2017 @reason :all records  For Scheduler 

				@Override
				public  RegTreBillDto getAllRecordsForScheduler(String letter) {
					 
					RegTreBillDto objReg = new RegTreBillDto();
					try {
						List<RegTreBillDto> ltReg = null;
						
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(RegTreBillDto.class);
							
							//criteria.add(Restrictions.eq("tFlag", "N"));
							criteria.add(Restrictions.like("patientName", "%" + letter + "%"));

							
							criteria.setMaxResults(10);
						ltReg = criteria.list();
						objReg.setListRegTreBillDto(ltReg);
						
					} catch (Exception e) {
						e.printStackTrace();
						return null;
					}
					return objReg;
				 
				}
		
			// @author : Sagar Kadam @date: 14-July-2017 @reason :getAllRecordsforOPDque1
				@Override
				public RegTreBillDto getAllRecordsforOPDque1(Integer deptId, Integer unitId,String userType, Integer userId1) {
					//System.err.println("in daoIMPL=="+deptId);
					RegTreBillDto obj=new RegTreBillDto();
					List<RegTreBillDto> ltPatientRecord = null;
					List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
					try {
											
						if(deptId == 1)
						{
							/*if(userType.equalsIgnoreCase("doctor")){
								
								Session session = sessionFactory.getCurrentSession();
								
								 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
									Query query = session.createSQLQuery(hql);
									query.setParameter("UserID", userId1);
									String docId = query.uniqueResult().toString();
									
									
									String hql1 = "select bill_id,doctor_id from patient_records_details where t_flag =:tFlag and department_id=:departmentId";
									Query query1 = session.createSQLQuery(hql1);
									query1.setParameter("departmentId", deptId);
									query1.setParameter("tFlag", "Y");
					        		 query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> data1 = query1.list();
									
									ArrayList<Integer> billIdArr = new ArrayList<Integer>();
									
							         for(Map<String, Object> row1 : data1)
							         {							        	
							        	 String dId=(String)row1.get("doctor_id");							        	 
							        	 int bId=(Integer)row1.get("bill_id");
							        	 
							 			String[] parts = dId.split(",");
							 			for(int i = 0; i < parts.length; i++) {
							 			    if(parts[i].equals(docId)) {
							 			    	
							 			    	billIdArr.add(bId);
							 			}
							 		}
							        	 
							    }
							         Criteria criteria = sessionFactory.getCurrentSession()
												.createCriteria(OpdQueManagmentViewDto.class);
										if(unitId > 0){//get list unit wise.
											criteria.add(Restrictions.eq("unitId", unitId));
										}
			 							criteria.add(Restrictions.eq("departmentId", deptId));
										criteria.add(Restrictions.in("billId", billIdArr));
										criteria.add(Restrictions.eq("tFlag", "Y"));
			 							criteria.addOrder(Order.desc("patientId"));
						
										criteria.setMaxResults(10);
										ltPatientRecord = criteria.list();
										
										Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
										  		
										ltDoctorDto=criteria2.list();
										obj.setListOpdQueManagmentViewDto(ltPatientRecord);
									
										obj.setLstDoctorDto(ltDoctorDto);
							         
								
							}else{*/
							
							Criteria criteria = sessionFactory.getCurrentSession()
									.createCriteria(RegTreBillDto.class);
							if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							criteria.add(Restrictions.eq("departmentId", deptId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
 							criteria.addOrder(Order.desc("patientId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListRegTreBillDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							//}
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
							
 						}else{
 							
 							Criteria criteria = sessionFactory.getCurrentSession()
 									.createCriteria(RegTreBillDto.class);
 							//RegistrationOtherDto
 							if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							criteria.add(Restrictions.eq("departmentId", deptId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
 							criteria.addOrder(Order.desc("patientId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListRegTreBillDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
 						}
						 
					} catch (Exception e) {
						e.printStackTrace();
						return obj;
					}
					
					System.out.println("ajskfhksdfh"+obj);
					return obj;
					
					
				}
				
				//Modify by Laxman on 15-Jan-2018 for OPDQueue Patients and Queue Management.
				@Override
				public OpdQueManagmentViewDto getAllRecordsForOPDqueue1(Integer deptId, Integer unitId,String userType, Integer userId1) {
					//System.err.println("in daoIMPL=="+deptId);
					OpdQueManagmentViewDto obj=new OpdQueManagmentViewDto();
					List<OpdQueManagmentViewDto> ltPatientRecord = null;
					List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
					try {
											
						if(deptId == 1)
						{
							/*if(userType.equalsIgnoreCase("doctor")){
								
								Session session = sessionFactory.getCurrentSession();
								
								 String hql = "select Doctor_ID from doctor where User_ID=:UserID";
									Query query = session.createSQLQuery(hql);
									query.setParameter("UserID", userId1);
									String docId = query.uniqueResult().toString();
									
									
									String hql1 = "select bill_id,doctor_id from patient_records_details where t_flag =:tFlag and department_id=:departmentId";
									Query query1 = session.createSQLQuery(hql1);
									query1.setParameter("departmentId", deptId);
									query1.setParameter("tFlag", "Y");
					        		 query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> data1 = query1.list();
									
									ArrayList<Integer> billIdArr = new ArrayList<Integer>();
									
							         for(Map<String, Object> row1 : data1)
							         {							        	
							        	 String dId=(String)row1.get("doctor_id");							        	 
							        	 int bId=(Integer)row1.get("bill_id");
							        	 
							 			String[] parts = dId.split(",");
							 			for(int i = 0; i < parts.length; i++) {
							 			    if(parts[i].equals(docId)) {
							 			    	
							 			    	billIdArr.add(bId);
							 			}
							 		}
							        	 
							    }
							         Criteria criteria = sessionFactory.getCurrentSession()
												.createCriteria(OpdQueManagmentViewDto.class);
										if(unitId > 0){//get list unit wise.
											criteria.add(Restrictions.eq("unitId", unitId));
										}
			 							criteria.add(Restrictions.eq("departmentId", deptId));
										criteria.add(Restrictions.in("billId", billIdArr));
										criteria.add(Restrictions.eq("tFlag", "Y"));
			 							criteria.addOrder(Order.desc("patientId"));
						
										criteria.setMaxResults(10);
										ltPatientRecord = criteria.list();
										
										Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
										  		
										ltDoctorDto=criteria2.list();
										obj.setListOpdQueManagmentViewDto(ltPatientRecord);
									
										obj.setLstDoctorDto(ltDoctorDto);
							         
								
							}else{*/
							
							Criteria criteria = sessionFactory.getCurrentSession()
									.createCriteria(OpdQueManagmentViewDto.class);/*.setProjection(Projections.projectionList()
											.add(Projections.property("treatmentId"))
										    .add(Projections.property("patientId"))
										    .add(Projections.property("tokenno"))
										    .add(Projections.property("tokenno"))
										    .add(Projections.property("mobile"))
										    .add(Projections.property("patientName")))
										    .setResultTransformer(Transformers.aliasToBean(OpdQueManagmentViewDto.class));;*/
													    
							if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							criteria.add(Restrictions.eq("departmentId", deptId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
 							criteria.addOrder(Order.desc("treatmentId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							for(OpdQueManagmentViewDto objDto : ltPatientRecord){
								
								Query inQueueDoc = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull((select doctor_id from token_number where queue_status = 'in' and patient_id = "+objDto.getPatientId()+" and treatment_id = "+objDto.getTreatmentId()+"),0) as doctor_id");
								objDto.setInQueueDocId((String)inQueueDoc.uniqueResult());
							}
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListOpdQueManagmentViewDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							//}
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
							
 						}else if(deptId == -11)
						{
							
							
							Criteria criteria = sessionFactory.getCurrentSession()
									.createCriteria(RegTreBillDto.class);
													    
										    if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							//criteria.add(Restrictions.eq("departmentId", deptId));
							//criteria.add(Restrictions.eq("tFlag", "Y"));
 							criteria.addOrder(Order.desc("patientId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListOpdQueManagmentViewDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							//}
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
							
 						}else{
 							
 							Criteria criteria = sessionFactory.getCurrentSession()
 									.createCriteria(OpdQueManagmentViewDto.class);
 							//RegistrationOtherDto
 							if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							criteria.add(Restrictions.eq("departmentId", deptId));
 							 criteria.addOrder(Order.desc("treatmentId"));
							criteria.add(Restrictions.eq("tFlag", "Y"));
 							//criteria.addOrder(Order.desc("patientId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListOpdQueManagmentViewDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
 						}
						 
					} catch (Exception e) {
						e.printStackTrace();
						return obj;
					}
					return obj;
				}
				
				
				@Override
				public OpdQueManagmentViewDto getAllRecordsForOPDqueue12(Integer deptId, Integer unitId, String userType, Integer userId1,Integer invoiceCount)
				{
					//System.err.println("in daoIMPL=="+deptId);
					OpdQueManagmentViewDto obj=new OpdQueManagmentViewDto();
					List<OpdQueManagmentViewDto> ltPatientRecord = null;
					List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
					try {
											
						if(deptId == 1)
						{
							
							
							Criteria criteria = sessionFactory.getCurrentSession()
									.createCriteria(OpdQueManagmentViewDto.class);
													    
										    if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							criteria.add(Restrictions.eq("departmentId", deptId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.lt("invoiceCountt", Integer.toString(invoiceCount)));
 							criteria.addOrder(Order.desc("treatmentId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							for(OpdQueManagmentViewDto objDto : ltPatientRecord){
								
								Query inQueueDoc = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull((select doctor_id from token_number where queue_status = 'in' and patient_id = "+objDto.getPatientId()+" and treatment_id = "+objDto.getTreatmentId()+"),0) as doctor_id");
								objDto.setInQueueDocId((String)inQueueDoc.uniqueResult());
							}
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListOpdQueManagmentViewDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							//}
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
							
 						}else if(deptId == -11)
						{
							
							
							Criteria criteria = sessionFactory.getCurrentSession()
									.createCriteria(RegTreBillDto.class);
													    
										    if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							//criteria.add(Restrictions.eq("departmentId", deptId));
							//criteria.add(Restrictions.eq("tFlag", "Y"));
 							criteria.addOrder(Order.desc("patientId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListOpdQueManagmentViewDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							//}
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
							
 						}else{
 							
 							Criteria criteria = sessionFactory.getCurrentSession()
 									.createCriteria(OpdQueManagmentViewDto.class);
 							//RegistrationOtherDto
 							if(unitId > 0){//get list unit wise.
								criteria.add(Restrictions.eq("unitId", unitId));
							}
 							criteria.add(Restrictions.eq("departmentId", deptId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
 							criteria.addOrder(Order.desc("patientId"));
			
							criteria.setMaxResults(10);
							ltPatientRecord = criteria.list();
							
							Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
							  		
							ltDoctorDto=criteria2.list();
							obj.setListOpdQueManagmentViewDto(ltPatientRecord);
						
							obj.setLstDoctorDto(ltDoctorDto);
							
							// added by vinod
							List<EhatBillPrefix> ltBillPrefix = null;							
							ArrayList<Integer> depIds=new ArrayList<Integer>();
							depIds.add(deptId);
							depIds.add(0);
							depIds.add(4);
							
							Criteria criteriaPrefix = sessionFactory.getCurrentSession().createCriteria(EhatBillPrefix.class);
							criteriaPrefix.add(Restrictions.eq("deleted", "N"));				
							criteriaPrefix.add(Restrictions.in("depId", depIds));
							ltBillPrefix = criteriaPrefix.list();
								
							obj.setListEhatBillPrefix(ltBillPrefix);							
							// added by vinod
 						}
						 
					} catch (Exception e) {
						e.printStackTrace();
						return obj;
					}
					return obj;
					
				}
				
			
				
				// @author : Sagar Kadam @date:20-july-2017 @reason : To Fetch Record of charges master list
 				@Override
				public ChargesMasterDto getSponsorTypeList() {
					//System.err.println("in daoIMPL=="+deptId);
					ChargesMasterDto obj=new ChargesMasterDto();
					List<ChargesMasterDto> ltChargesMasters = null;
					ArrayList<Integer> intarr=null;
 				 
					try {
						
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(ChargesMasterDto.class);
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.ne("chargesId",2));
						criteria.addOrder(Order.desc("chargesId"));
						ltChargesMasters = criteria.list();
						obj.setLstCharges(ltChargesMasters);
						 
					} catch (Exception e) {
						e.printStackTrace();
						return obj;
					}
					return obj;
				}
				
				
				//@author : Sagar Kadam @date: 03/aug/2017 @reason : get user name by user id
 				@Override
				public String getUserNameByUserid(Integer userid) {
					RegTreBillDto obj=new RegTreBillDto();
					List<RegTreBillDto> ltRegTreBillDto = null;
 					Query q1 = sessionFactory
							.getCurrentSession()
							.createSQLQuery(
									"select concat(title,' ',f_name,' ',m_name,' ',l_name) as name  from users where User_ID=:userid")
							.setParameter("userid", userid);

					String name = q1.uniqueResult().toString();
			
					//obj.setDob(name);
				    
					return name;
				}
				@Override
				public	int saveOtherPatientRegDetails(RegistrationOtherDto registrationDto , String queryType , Integer userId){
				int a=0;
				try{	
				
				if(queryType.equalsIgnoreCase("delete")){
			        //Code for delete
			        registrationDto = (RegistrationOtherDto) sessionFactory
			                .getCurrentSession().get(RegistrationOtherDto.class, registrationDto.getPatientId());
			        
			        //Set values to coloumn to update
			        registrationDto.setDeleted("Y");
			        registrationDto.setDeletedBy(userId);
			        registrationDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			        a=registrationDto.getPatientId();
			        
			    }else if(queryType.equalsIgnoreCase("insert")){
			    	System.err.println("in save ................");

			        //Set values to coloumn  
			        //registrationDto.setUnitCount(unitid);    
			       //  registrationDto.setMrnno(bufferMrNo.toString());  
			    	
			    	String sqlMax="select ifnull(max(Appt_ID),0) from appointment";
					Query maxQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlMax);
					int maxId = ((Number)maxQuery.uniqueResult()).intValue();
					
					String sqlRef="select ifnull(Doctor_id,0) from appointment where Appt_ID="+maxId;
					Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
					int docId = ((Number)refQuery.uniqueResult()).intValue();
			    	
			    	registrationDto.setDepartmentId(1);
			    	registrationDto.setDoctorId(docId);
			    	registrationDto.setAppointId(maxId);
			    	
			        sessionFactory.getCurrentSession().merge(registrationDto);
			        a = maxCountOfColumn(RegistrationOtherDto.class,"patientId");
			        
			    }else if(queryType.equalsIgnoreCase("update") || queryType.equalsIgnoreCase("markvisit")){
			       // if(unid==registrationDto.getUnitId()){
			            //Set values to coloumn  
			           // registrationDto.setUnitCount(unitid);
			       // }else{
			         //   unitid++;
			            //Set values to coloumn  
			           // registrationDto.setUnitCount(unitid);
			       // }
			    	
			        
			        sessionFactory.getCurrentSession().merge(registrationDto);
			        a=registrationDto.getPatientId();
			        
			        System.err.println("in update ................"+a);
			        
			    }
			    
			    } catch (Exception e) {
						e.printStackTrace();
						a=-1;
					}
					//returning Patient Id
					return a;
				}
					
				
	// @author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record List
	@Override
	public RegistrationOtherDto getOthetRecords() {
		RegistrationOtherDto objReg = new RegistrationOtherDto();
		try {
			List<RegistrationOtherDto> ltReg = null;

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationOtherDto.class);
			criteria.addOrder(Order.desc("patientId"));
			ltReg = criteria.list();
			objReg.setListReg(ltReg);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objReg;
	}
	//@author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record by id for edit
		@Override		
		public 	RegistrationOtherDto getOthetRecordsById(int pid){
				
				RegistrationOtherDto objReg = new RegistrationOtherDto();
			try {
				List<RegistrationOtherDto> ltReg = null;
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegistrationOtherDto.class);
				criteria.add(Restrictions.eq("patientId",pid));
				ltReg = criteria.list();
				objReg.setListReg(ltReg);
				
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return objReg;
		}
		
		
		//@author : Sagar Kadam @date: 07/aug/2017 @reason : Autosuggestion for other record  in registration
				@Override		
				public 	RegistrationOtherDto autosuggesstionForOtherRecords(String letter,String usertype){
						
						RegistrationOtherDto objReg = new RegistrationOtherDto();
					try {
						List<RegistrationOtherDto> ltReg = null;
						
						Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegistrationOtherDto.class);
						if(usertype.equals("Y")){
							
							 criteria.add(Restrictions.eq("patientId", Integer.parseInt(letter)));
						}else{
						Criterion rest1= Restrictions.like("fName", "%" + letter + "%");
						Criterion rest2= Restrictions.like("mName", "%" + letter + "%");
						Criterion rest3= Restrictions.like("lName", "%" + letter + "%");
						Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
						
						criteria.add(Restrictions.or(rest1, rest2, rest3, rest4));
						
//						//criteria.add(Restrictions.like("patientName", "%" + letter + "%"));
						}
						criteria.addOrder(Order.desc("patientId"));
 						criteria.setMaxResults(10);
 							
						ltReg = criteria.list();
						objReg.setListReg(ltReg);
						
					} catch (Exception e) {
						e.printStackTrace();
						return null;
					}
					return objReg;
				}
		
	// irfan khan 17-aug-2017 to check access of the service
	public boolean masterConfigAccess(int unitId, int deptId, int serviceId) {
		
		Query q = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT count(*) FROM ehat_master_config where deleted='N' and unit_id="
						+ unitId + " and dept_id=" + deptId
						+ " and service_id=" + serviceId);

		Integer count = ((Number) q.uniqueResult()).intValue();

		if (count > 0) {
			return true;
		} else {
			return false;
		}

	}

	// @author : Irfan Khan @date: 29-May-2017 @reason : To delete Patient
	@Override
	public int deletePatientReg(int pId, Integer userId) {
		// Code for delete
		Query alfa3 = sessionFactory
				.getCurrentSession()
				.createSQLQuery(
						"update ehat_patient set deleted='Y',deleted_by="+userId+",deleted_date_time=now() where patient_id="+pId);
		int result3 = alfa3.executeUpdate();
		
		return 1;
	}

	/***@author    :BILAL
	 * @Date       :27-10-2017
	 * @Code       :For getting records of patient By patient ID****/
	@SuppressWarnings("unchecked")
	@Override
	public List<RegistrationDto> getPatientRecordsbypatientId(Integer patientId) {
		List<RegistrationDto> lstReg = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationDto.class);	
			criteria.add(Restrictions.eq("patientId",patientId));
			criteria.add(Restrictions.eq("deleted", "N"));
			
			lstReg = criteria.list();

			
		} catch (Exception e) {
			e.printStackTrace();
			return lstReg;
		}
		return lstReg;
	}
	/***@author    :BILAL
	 * @Date       :27-10-2017
	 * @Code       :For getting records of patient By treatment ID****/
	@SuppressWarnings("unchecked")
	@Override
	public List<TreatmentDto> gettreatment(Integer treatmentId) {
		List<TreatmentDto> lsttre = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(TreatmentDto.class);	
			criteria.add(Restrictions.eq("treatmentId",treatmentId));
			//criteria.add(Restrictions.eq("deleted", "N"));
			
			lsttre = criteria.list();

			
		} catch (Exception e) {
			e.printStackTrace();
			return lsttre;
		}
		return lsttre;
	}
	
	// @author : Vinod Udawant @date: 31-Oct-2017 @reason : To maintain opd count
	public int generateOpdCount(int userId,int treatId, int deptId){
		int result=0;
		if(deptId==1){
			 String sql = "select max(invoice_count) from ehat_bill_master where department_id=1";
			  SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			  int invCount = (Integer) query2.uniqueResult();	
			  invCount=invCount+1;
			  
			  String hql = "UPDATE BillMasterDto set invoiceFlag = :invoiceFlag, invoiceCount = :invoiceCount, " +
			  		"invCreatedBy = :updatedBy, invoiceCreatedDateTime = :updatedDateTime " +
			  		"WHERE treatmentId = :treatmentId";
				Query query = sessionFactory.getCurrentSession().createQuery(hql);
				query.setParameter("invoiceFlag", "Y");
				query.setParameter("invoiceCount", invCount);							
				query.setParameter("updatedBy", userId);
				query.setParameter("updatedDateTime", new java.util.Date());
				query.setParameter("treatmentId", treatId);
				result = query.executeUpdate();	
				//return result;
		}else if(deptId == 3){
			 String sql = "select max(invoice_count) from ehat_bill_master where department_id=3";
			  SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			  int invCount = (Integer) query2.uniqueResult();	
			  invCount=invCount+1;
			  
			  String hql = "UPDATE BillMasterDto set invoiceFlag = :invoiceFlag, invoiceCount = :invoiceCount, " +
			  		"invCreatedBy = :updatedBy, invoiceCreatedDateTime = :updatedDateTime " +
			  		"WHERE treatmentId = :treatmentId";
				Query query = sessionFactory.getCurrentSession().createQuery(hql);
				query.setParameter("invoiceFlag", "Y");
				query.setParameter("invoiceCount", invCount);							
				query.setParameter("updatedBy", userId);
				query.setParameter("updatedDateTime", new java.util.Date());
				query.setParameter("treatmentId", treatId);
				result = query.executeUpdate();	
				//return result;
		}
		return result;
		
	}

	// @author : Irfan Khan @date: 8-Nov-2017 @reason : To Check registration access
	@Override
	public boolean getRegAccessAuth(Integer userId) {
		String all = "select case when count(*) > 0 then 1 else 0 end as result FROM users"
				+ " where (service_id = '1' OR service_id LIKE '1,%' OR service_id LIKE '%,1,%'"
				+ " OR service_id LIKE '%,1') and User_ID= :userId";
		
		Query q = sessionFactory.getCurrentSession().createSQLQuery(all);
		q.setParameter("userId", userId);

		// ArrayList<Integer> masterId2 = (ArrayList<Integer>) q.list();
		int value = ((Number) q.uniqueResult()).intValue();

		if (value == 0) {
			return false;
		} else {
			return true;
		}

	}

	@Override
	public RegistrationOtherDto getAllRecordsForOPDqueOther(Integer deptid,
			Integer unitId) {
		//System.err.println("in daoIMPL=="+deptId);
		RegistrationOtherDto obj123=new RegistrationOtherDto();
		List<RegistrationOtherDto> ltOtherPatient = null;
		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
		try {			
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RegistrationOtherDto.class);
				if(unitId > 0){//get list unit wise.
					criteria.add(Restrictions.eq("unitId", unitId));
				}
					//criteria.add(Restrictions.eq("departmentId", deptId));
				//criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.addOrder(Order.desc("patientId"));
				//criteria.setMaxResults(10);
				ltOtherPatient = criteria.list();
				
				Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
				  		
				ltDoctorDto=criteria2.list();
				obj123.setListReg(ltOtherPatient);			
				obj123.setListDoctorDto(ltDoctorDto);
				
				
			 
		} catch (Exception e) {
			e.printStackTrace();
			//return obj123;
		}
		return obj123;
	}

	// @author : Laxman Nikam @date: 05-Jan-2018 @reason : Check OPD send patiend Limit.
	@Override
	public String checkSendPatientLimit(int doctorId) {
		String msg="True";
		ResourceBundle sendPatientCount = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String sndPatCnt = sendPatientCount.getObject("sendPatientCount").toString();
		Query query = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT count(patient_id) FROM token_number where t_flag IS NULL and Doctor_id="+doctorId+" and queue_status='in' and send_date_time >=CURDATE()");
		
		Integer count = ((Number) query.uniqueResult()).intValue();
		
		if(count>=Integer.parseInt(sndPatCnt)){
			msg="You can not send more than "+sndPatCnt+" Patient";
		}
		return msg;
	}

	@Override
	public DoctorDto getDocListUnitWise(String callfrom, Integer unitId) {
		DoctorDto objService = new DoctorDto();
		List<DoctorDto> ltServiceMasters = null;
		 
		try {
			
            String sql1="select User_ID from users where status='Y' and (unitmaster_id = '"+unitId+"' OR unitmaster_id LIKE '"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+",%' OR unitmaster_id LIKE '%,"+unitId+"')";
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<Map<String, Object>> data1 = query1.list();
            ArrayList<Integer> UserID = new ArrayList<Integer>();
            for(Map<String, Object> row : data1){
                            	
            	int bId = (Integer) row.get("User_ID");
            	UserID.add(bId);
            	
            }
            	
            	//System.err.println("arra=-=-="+UserID);
            	
            	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);            
                criteria.add(Restrictions.eq("status", "Y"));
            //Group is not mapped with user table
                criteria.add(Restrictions.in("User_ID", UserID));
                criteria.add(Restrictions.eq("doc_Type", "doctor"));

								
                ltServiceMasters = criteria.list();
            
             
            

			objService.setLstDoctorDto(ltServiceMasters);
			 
			} catch (Exception e) {
			e.printStackTrace();
			return objService;
		}
		return objService;

	}

	// @author : Irfan Khan @date: 15-Feb-2018 @reason : To block Patient
	@Override
	public int blockPatient(int pid,String blockFlag,String narration,Integer userId,String userLoginName) {

		Query query;
		if(blockFlag.equalsIgnoreCase("F")){
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_patient set block_flag= :blockFlag ,block_narration_1= :narration " +
					",block_user_id_1= :userId,block_user_name_1= :userLoginName,blocked_date_time=:blockedDateTime where patient_id= :patientId ");
			query.setParameter("narration", narration);
			query.setParameter("userId", userId);
			query.setParameter("userLoginName", userLoginName);
			
		}else if(blockFlag.equalsIgnoreCase("S")){
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_patient set block_flag= :blockFlag ,block_narration_2= :narration " +
					", block_user_id_2= :userId,block_user_name_2= :userLoginName,blocked_date_time=:blockedDateTime where patient_id= :patientId ");
			query.setParameter("narration", narration);
			query.setParameter("userId", userId);
			query.setParameter("userLoginName", userLoginName);
		}else if(blockFlag.equalsIgnoreCase("T")){
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_patient set block_flag= :blockFlag ,block_narration_3= :narration " +
					",block_user_id_3= :userId,block_user_name_3= :userLoginName,blocked_date_time=:blockedDateTime where patient_id= :patientId ");
			query.setParameter("narration", narration);
			query.setParameter("userId", userId);
			query.setParameter("userLoginName", userLoginName);
			
		}else{
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"update ehat_patient set block_flag= :blockFlag where patient_id= :patientId ");
		}
		
		
		query.setParameter("blockFlag", blockFlag);
		query.setParameter("blockedDateTime", todays_date3);
		query.setParameter("patientId", pid);
		int result = query.executeUpdate();

		return result;
	}
	
	// @author : Kishor Lokhande @date: 15-Mar-2018 @reason : To set and get sponsor rate to Patient when update patiens details
	public void getAndSetSponsorRate(Integer treatmentId,Integer pId,Integer sponsorId,Integer sponsorSlaveId) {
		System.err.println("all data-=-=-=-="+treatmentId+" - "+pId+" - "+sponsorId+" - "+sponsorSlaveId);
		try {
			
			/*int sourceTypeId=0;
			int chargesMasterSlaveId=0;
			String sql10 = "SELECT * FROM ehat_bill_master where treatment_id = "+treatmentId+" and patient_id = "+pId+" and deleted = 'N'";
			SQLQuery query10 = sessionFactory.getCurrentSession().createSQLQuery(sql10);
	        query10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         
	        @SuppressWarnings("unchecked")
			List<Map<String, Object>> data10 = query10.list();   
	        for(Map<String, Object> row10 : data10){
	        	  sourceTypeId=((Integer)row10.get("source_type_id"));
	        	 chargesMasterSlaveId=((Integer)row10.get("charges_master_slave_id"));
	        	 System.err.println(" chargesMasterSlaveId-=-=-=-="+sourceTypeId+" - "+chargesMasterSlaveId);
	        	 }
			
	        if(sourceTypeId > 0 || chargesMasterSlaveId > 0){*/
	        	
	         /*if(sourceTypeId != sponsorId || chargesMasterSlaveId != sponsorSlaveId){*/
	        	
	        
			  String subSId="";
			  
				 String sql = "SELECT sub_service_id as sub_service_id FROM ehat_bill_details where treatment_id = "+treatmentId+" and patient_id = "+pId+" and deleted = 'N'";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		              
		         ArrayList<Integer> masterId2 = (ArrayList<Integer>) query.list();

		 		StringBuilder masterId3 = new StringBuilder();
		 		for (Integer s : masterId2) {
		 			masterId3.append(s);
		 			masterId3.append(",");
		 		}

		 		if (masterId3 != null && masterId3.length() > 0) {
		 			subSId = masterId3.substring(0, masterId3.length() - 1);
		 		}		         
		 		// System.err.println("=-=-=-=-=-=-=-=-"+subSId);
		 		
		 		
		 		if(subSId!=""){
		 			
		 			 String sql1 = "SELECT * FROM ehat_configuration_services_view where service_id in("+subSId+") and charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" order by service_id ASC";
						SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				         
				        @SuppressWarnings("unchecked")
						List<Map<String, Object>> data1 = query1.list();   
				        for(Map<String, Object> row : data1){
				        	 int ssId=((Integer)row.get("service_id"));
				        	 String catName=((String)row.get("category_name"));
				        	 Double SponRate=((Double)row.get("charges")); 			       			
				        	// System.err.println("=-=-=-=-=-=-=-=-"+ssId);
				        	// System.err.println("=-=-=-=-=-=-=-=-"+catName);
				        	// System.err.println("=-=-=-=-=-=-=-=-"+SponRate);
				        	 
				        	 String sql2 = "SELECT * FROM ehat_bill_details where sub_service_id ="+ssId+" and treatment_id = "+treatmentId+" and patient_id = "+pId+" and deleted = 'N'";
								SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
						        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						         
						        @SuppressWarnings("unchecked")
								List<Map<String, Object>> data2 = query2.list();   
						        for(Map<String, Object> row2 : data2){
						        	int billDetailsId=((Integer)row2.get("bill_details_id"));
						        	 Double qty=((Double)row2.get("quantity"));
						        	 Double conPer=((Double)row2.get("concession_in_Perc")); 
						        	// System.err.println("=-=-=-=-qty=-=-=-=-"+qty);
						        	// System.err.println("=-=-=-=conPer-=-=-=-=-"+conPer);
						        	 
						        	 Double amt= (double) (Math.round( SponRate * qty));
						        	 Double concAmt=(double) (Math.round((amt/100)*conPer));
						        	 Double otherPay=(double) (Math.round( amt - concAmt));
						        	 Double otherCoPay=0.0;
						        	// System.err.println("=-=-=-amt=-=-=-=-=-"+amt);
						        	// System.err.println("=-=-=-concAmt=-=-=-=-=-"+concAmt);
						        	// System.err.println("=-=-=-=otherPay-=-=-=-=-"+otherPay);
						        	 
						        	 
						        	
						        	 String sql3 = "update ehat_bill_details set other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+SponRate+" "
												+ "where bill_details_id="+billDetailsId+" ";
											SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
									         query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
									         query3.executeUpdate();
							}
				        //}
					//}
		 		}
		 		}
	        } catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
					}
	}
	
	public void getAndSetSponsorRateForIpd(Integer treatmentId,Integer pId,Integer sponsorId,Integer sponsorSlaveId) {
		System.err.println("all data-=-=-=-="+treatmentId+" - "+pId+" - "+sponsorId+" - "+sponsorSlaveId);
		try {
			
			/*int sourceTypeId=0;
			int chargesMasterSlaveId=0;
			String sql10 = "SELECT * from ehat_bill_master where treatment_id = "+treatmentId+" and patient_id = "+pId+" and deleted = 'N'";
			SQLQuery query10 = sessionFactory.getCurrentSession().createSQLQuery(sql10);
	        query10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         
	        @SuppressWarnings("unchecked")
			List<Map<String, Object>> data10 = query10.list();   
	        for(Map<String, Object> row10 : data10){
	        	  sourceTypeId=((Integer)row10.get("source_type_id"));
	        	 chargesMasterSlaveId=((Integer)row10.get("charges_master_slave_id"));
	        	 }
			
	        if(sourceTypeId > 0 || chargesMasterSlaveId > 0){*/
	        	
	        /* if(sourceTypeId != sponsorId || chargesMasterSlaveId != sponsorSlaveId){*/
	        	 
			int HallId=2;
			int HallSlaveId=0;
			int bedServiceId=3;
			int HallCharges=0;
			int nursingCharges=0;
			
			String sql10 = "SELECT * from ehat_view_patient_bed_details_ipd where treatment_id = "+treatmentId+" and service_id="+bedServiceId+" ";
			SQLQuery query10 = sessionFactory.getCurrentSession().createSQLQuery(sql10);
	        query10.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         
	        @SuppressWarnings("unchecked")
			List<Map<String, Object>> data10 = query10.list();   
	        for(Map<String, Object> row10 : data10){
	        	
	        	BigInteger	HallSlaveIddd=((BigInteger)row10.get("ehat_hallid"));
	        	int HallSlaveIdInt=HallSlaveIddd.intValue();
	        	if(HallSlaveIdInt > 0){
	        		HallSlaveId=HallSlaveIdInt;
	        	}
	        	}
	        
			  String subSId="";
			  
				 String sql = "SELECT sub_service_id as sub_service_id FROM ehat_bill_details_ipd where treatment_id = "+treatmentId+" and patient_id = "+pId+" and deleted = 'N'";
		         SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		              
		         ArrayList<Integer> masterId2 = (ArrayList<Integer>) query.list();

		 		StringBuilder masterId3 = new StringBuilder();
		 		for (Integer s : masterId2) {
		 			masterId3.append(s);
		 			masterId3.append(",");
		 		}

		 		if (masterId3 != null && masterId3.length() > 0) {
		 			subSId = masterId3.substring(0, masterId3.length() - 1);
		 		}		         
		 		//System.err.println("=-=-=-=-=-=-=-=-"+subSId);
		 		
		 		
		 		if(subSId!=""){
		 			
		 			/* if(HallSlaveId == 0){
		 				 String sql1 = "SELECT * FROM ehat_configuration_services_view where service_id in("+subSId+") and charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" order by service_id ASC ";
							SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					         
					        @SuppressWarnings("unchecked")
							List<Map<String, Object>> data1 = query1.list();   
					        for(Map<String, Object> row : data1){
					        	 int ssId=((Integer)row.get("service_id"));
					        	 String catName=((String)row.get("category_name"));
					        	 Double SponRate=((Double)row.get("charges")); 	
					        	// HallCharges=((Integer)row.get("hall_charges")); 	
					        	// nursingCharges=((Integer)row.get("medical_team_charges")); 	
					        	 System.err.println("=-=-=-=-=-=-=-=-"+ssId);
					        	 System.err.println("=-=-=-=-=-=-=-=-"+catName);
					        	 System.err.println("=-=-=-=-=-=-=-=-"+SponRate);
					        	// System.err.println("=-=-=-HallCharges=-=-=-=-=-"+HallCharges);
					        	 //System.err.println("=-=-nursingCharges=-=-=-=-=-=-"+nursingCharges);
					        	 
					        	 String sql2 = "SELECT * FROM ehat_bill_details_ipd where sub_service_id ="+ssId+" and treatment_id = "+treatmentId+" and patient_id = "+pId+" and deleted = 'N'";
									SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							         
							        @SuppressWarnings("unchecked")
									List<Map<String, Object>> data2 = query2.list();   
							        for(Map<String, Object> row2 : data2){
							        	int billDetailsId=((Integer)row2.get("bill_details_id"));
							        	 Double qty=((Double)row2.get("quantity"));
							        	 Double conPer=((Double)row2.get("concession_per")); 
							        	 System.err.println("=-=-=-=-qty=-=-=-=-"+qty);
							        	 System.err.println("=-=-=-=conPer-=-=-=-=-"+conPer);
							        	 
							        	 Double amt= (double) (Math.round( SponRate * qty));
							        	 Double concAmt=(double) (Math.round((amt/100)*conPer));
							        	 Double otherPay=(double) (Math.round( amt - concAmt));
							        	 Double otherCoPay=0.0;
							        	 System.err.println("=-=-=-amt=-=-=-=-=-"+amt);
							        	 System.err.println("=-=-=-concAmt=-=-=-=-=-"+concAmt);
							        	 System.err.println("=-=-=-=otherPay-=-=-=-=-"+otherPay);
							        	 
							        	 
							        	
							        	 String sql3 = "update ehat_bill_details_ipd set other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+SponRate+" "
													+ "where bill_details_id="+billDetailsId+" ";
												SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
										         query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
										         query3.executeUpdate();
								}
					      //  } 
						//}
			 		}
			         }else{*/
			        	 String sql1 = "SELECT * FROM ehat_configuration_services_view where service_id in("+subSId+") and charges_id="+sponsorId+" and id_charges_slave="+sponsorSlaveId+" and hall_id="+HallId+" and hallSlave_id="+HallSlaveId+" order by service_id ASC ";
							SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					        query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					         
					        @SuppressWarnings("unchecked")
							List<Map<String, Object>> data1 = query1.list();   
					        for(Map<String, Object> row : data1){
					        	 int ssId=((Integer)row.get("service_id"));
					        	 String catName=((String)row.get("category_name"));
					        	 Double SponRate=((Double)row.get("charges")); 	
					        	 HallCharges=((Integer)row.get("hall_charges")); 	
					        	 nursingCharges=((Integer)row.get("medical_team_charges")); 	
					        	 System.err.println("=-=-=-=-=-=-=-=-"+ssId);
					        	 System.err.println("=-=-=-=-=-=-=-=-"+catName);
					        	 System.err.println("=-=-=-=-=-=-=-=-"+SponRate);
					        	 System.err.println("=-=-=-HallCharges=-=-=-=-=-"+HallCharges);
					        	 System.err.println("=-=-nursingCharges=-=-=-=-=-=-"+nursingCharges);
					        	 
					        	 String sql2 = "SELECT * FROM ehat_bill_details_ipd where sub_service_id ="+ssId+" and treatment_id = "+treatmentId+" and patient_id = "+pId+" and deleted = 'N'";
									SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql2);
							        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							         
							        @SuppressWarnings("unchecked")
									List<Map<String, Object>> data2 = query2.list();   
							        for(Map<String, Object> row2 : data2){
							        	int billDetailsId=((Integer)row2.get("bill_details_id"));
							        	 Double qty=((Double)row2.get("quantity"));
							        	 Double conPer=((Double)row2.get("concession_per")); 
							        	 System.err.println("=-=-=-=-qty=-=-=-=-"+qty);
							        	 System.err.println("=-=-=-=conPer-=-=-=-=-"+conPer);
							        	 
							        	 Double amt= (double) (Math.round( SponRate * qty));
							        	 Double concAmt=(double) (Math.round((amt/100)*conPer));
							        	 Double otherPay=(double) (Math.round( amt - concAmt));
							        	 Double otherCoPay=0.0;
							        	 System.err.println("=-=-=-amt=-=-=-=-=-"+amt);
							        	 System.err.println("=-=-=-concAmt=-=-=-=-=-"+concAmt);
							        	 System.err.println("=-=-=-=otherPay-=-=-=-=-"+otherPay);
							        	 
							        	 
							        	
							        	 String sql3 = "update ehat_bill_details_ipd set other_amount = "+amt+",other_co_pay="+otherCoPay+",other_concession="+concAmt+",other_pay="+otherPay+",other_rate="+SponRate+" "
													+ "where bill_details_id="+billDetailsId+" ";
												SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
										         query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
										         query3.executeUpdate();
								//}
					      //  } 
						//}
			 		}
			         }
		 			
				        if(HallCharges == 0){
				        	String rateBed="";
							  
							 String sql4 = "SELECT rate as rate from ehat_view_patient_bed_details_ipd where treatment_id = "+treatmentId+" and service_id="+bedServiceId+" ";
					         SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);
					              
					         ArrayList<Double> masterId4 = (ArrayList<Double>) query4.list();

					 		StringBuilder masterId31 = new StringBuilder();
					 		for (Double s : masterId4) {
					 			masterId31.append(s);
					 			masterId31.append(",");
					 		}

					 		if (masterId31 != null && masterId31.length() > 0) {
					 			rateBed = masterId31.substring(0, masterId31.length() - 1);
					 		}
					 		
					 		HallCharges=masterId31.charAt(0);
					 		nursingCharges=masterId31.charAt(1);
					 		
					 		System.err.println("=-=default-=-HallCharges=-=-=-=-=-"+HallCharges);
				        	 System.err.println("=-=-default=-nursingCharges=-=-=-=-=-"+nursingCharges);
				        }
				        
				        
				        
				        String sql3 = "update ehat_bill_details_ipd set other_amount = "+HallCharges+",other_co_pay="+HallCharges+",other_pay="+HallCharges+",other_rate="+HallCharges+" "
								+ "where treatment_id = "+treatmentId+" and service_id="+bedServiceId+" and sub_service_id > 0 ";
							SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
					         query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
					         query3.executeUpdate();
					         
					         String sql4 = "update ehat_bill_details_ipd set other_amount = "+nursingCharges+",other_co_pay="+nursingCharges+",other_pay="+nursingCharges+",other_rate="+nursingCharges+" "
										+ "where treatment_id = "+treatmentId+" and service_id="+bedServiceId+" and sub_service_id = 0 ";
									SQLQuery query4 = sessionFactory.getCurrentSession().createSQLQuery(sql4);
							         query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);        
							         query4.executeUpdate();
		 		} 
	        }catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
					}
	}

	//@author :Irfan khan@Date :7-03-2018@Code :To fetch records of Admission report
	@Override
	public List<admissionReportViewDto> fetchAdmissionReport(Date fromDate,
			Date toDate,Integer doctorId,Integer refDocId,Integer caseTypeId,Integer mediclaimType) {
		List<admissionReportViewDto> listAdmsnReportViewDto = null;
		try {
			
			String viewQuery = "select patient_id as patientId,opdipdno as ipdNo,date(created_date_time) as admitDate,"
					+ "patient_name as patientName,category_name as sposorType,hall_type_name as wardName,doctor_id as doctorIdStr,"
					+ "ref_doc_id as refDocId,ref_doc_name as refDocName,case_type as caseType,patient_type as patientType,"
					+ "address as address,time(created_date_time) as admitTime,mobile as contact,department_id as departmentId,"
					+ "department_name as departmentName,mediclaim as mediclaim "
					+ " From ehat_view_admission_report2 "
					//+ " where date(created_date_time) between :fromDate and :toDate ";
					+ " where date(created_date_time) between '"+fromDate+"' and '"+toDate+"'  ";// Added By Annapurna 
			
			if (doctorId > 0) {
				String byDoctorId = " and (doctor_id = "
					+ doctorId
					+ " OR doctor_id LIKE '"
					+ doctorId
					+ ",%'"
					+ " OR doctor_id LIKE '%,"
					+ doctorId
					+ ",%' OR doctor_id LIKE '%,"
					+ doctorId
					+ "') ";
				viewQuery = viewQuery + byDoctorId;
			}
			if (refDocId > 0) {
				String byRefDocId = " and ref_doc_id="+refDocId;
				viewQuery = viewQuery + byRefDocId;
			}
			if (caseTypeId > 0) {
				String byCaseTypeId = " and case_type="+caseTypeId;
				viewQuery = viewQuery + byCaseTypeId;
			}
			if (mediclaimType == 1) {
				String byMediclaimType = " and source_type_id = 0";
				viewQuery = viewQuery + byMediclaimType;
			}else if(mediclaimType == 2){
				String byMediclaimType = " and source_type_id > 0";
				viewQuery = viewQuery + byMediclaimType;
			}
			
			System.out.println(viewQuery+"FFFFFFFFFFFFFF");
			Query qExe = sessionFactory
					.getCurrentSession()
					.createSQLQuery(viewQuery)
					.setResultTransformer(
							Transformers.aliasToBean(admissionReportViewDto.class)); 
			//qExe.setParameter("fromDate", fromDate);
			//qExe.setParameter("toDate", toDate);

			
			listAdmsnReportViewDto = qExe.list();
			
			//code to fetch docName
			for(int i=0;i < listAdmsnReportViewDto.size() ;i++){
				
                Query qGrName = sessionFactory
                        .getCurrentSession()
                        .createSQLQuery(
                                "SELECT ifnull(GROUP_CONCAT(doc_name SEPARATOR ','),'-') as docName FROM doctor WHERE Doctor_ID IN ('"+listAdmsnReportViewDto.get(i).getDoctorIdStr()+"')");

                String docNameStr = (String) qGrName.uniqueResult();
                listAdmsnReportViewDto.get(i).setDoctorName(docNameStr);
            }
						
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
					
		}
		return listAdmsnReportViewDto;
	}
	
	/*******
	 * @Code   :for get sponsor charges against services 
	 * *********/
	public Double getCharges(int chargesSlaveId,int subserviceid) {
		int hallId=0;
		int has=0;
		int isComServId=0;
		int isComServlastId=0;
		
		Query bet = sessionFactory
				.getCurrentSession()
				.createSQLQuery("SELECT charges FROM ehat_configuration_services WHERE deleted = 'N' AND service_id = :serviceId and "
							+"charges_id=:sponsorId AND chargesSlave_id=:chargesSlaveId and hall_id=:hallId and hallSlave_id=:hallSlaveId and is_com_servId=:isComServId  "
							+"and is_com_servlastId=:isComServlastId limit 1");

		bet.setParameter("sponsorId", sponsorid);
		bet.setParameter("chargesSlaveId", chargesSlaveId);
		
		bet.setParameter("hallId", hallId);
		bet.setParameter("hallSlaveId", has);
		
		bet.setParameter("isComServId", isComServId);
		bet.setParameter("isComServlastId", isComServlastId);
		
		bet.setParameter("serviceId", subserviceid);
		
		Double sumOfRefund = (Double) bet.uniqueResult();
		System.err.println("sumOfRefund=="+sumOfRefund);
		if (sumOfRefund == null ) {
			sumOfRefund =0.0;
		}
		System.err.println("sumOfRefund=="+sumOfRefund);
		return sumOfRefund;
		
	}

	@Override
	public DoctorDto getAllRefDocNew(String callfrom, Integer unitId) {
		DoctorDto objService = new DoctorDto();
		List<DoctorDto> ltServiceMasters = null;
		 
		try {
			
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int refDocId = Integer.parseInt(resourceBundleEhat.getObject("refDocId").toString());
			
            String sql1="select User_ID from users where status='Y' and (doctor_type_id_list = '"+refDocId+"' OR doctor_type_id_list LIKE '"+refDocId+",%' OR doctor_type_id_list LIKE '%,"+refDocId+",%' OR doctor_type_id_list LIKE '%,"+refDocId+"')";
            SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
            query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<Map<String, Object>> data1 = query1.list();
            ArrayList<Integer> UserID = new ArrayList<Integer>();
            for(Map<String, Object> row : data1){
                            	
            	int bId = (Integer) row.get("User_ID");
            	UserID.add(bId);
            	
            }
            	
            	//System.err.println("arra=-=-="+UserID);
            	
            	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);            
                criteria.add(Restrictions.eq("status", "Y"));
            //Group is not mapped with user table
                criteria.add(Restrictions.in("User_ID", UserID));
                criteria.add(Restrictions.eq("doc_Type", "doctor"));

								
                ltServiceMasters = criteria.list();
            
			objService.setLstRefDoctorDto(ltServiceMasters);
			 
			} catch (Exception e) {
			e.printStackTrace();
			return objService;
		}
		return objService;

	}

	//irfan khan - 4-april-2018: fetch advertisement images
	@Override
	public ArrayList<String> fetchAdvertisementImgNames() {

		ArrayList<String> listFileName = new ArrayList<String>();

		File catalinaBase = null;
		try {
			catalinaBase = new File( System.getProperty( "jboss.server.data.dir" ) ).getCanonicalFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		
		File folder = new File(catalinaBase,
				"/webapps/MAHAHMIS/images/Advertisement");

		if (folder.exists()) {
			File[] listOfFiles = folder.listFiles();

			for (File file : listOfFiles) {
				if (file.isFile()) {
					if (file.getName().endsWith(".png")
							|| file.getName().endsWith(".jpg")
							|| file.getName().endsWith(".jpeg")
							|| file.getName().endsWith(".bmp")
							|| file.getName().endsWith(".gif")
							|| file.getName().endsWith(".JPG")
							|| file.getName().endsWith(".JPEG")
							|| file.getName().endsWith(".BMP")
							|| file.getName().endsWith(".GIF")) {
						listFileName.add(file.getName());
					}

				}
			}
		}else{
			folder.mkdir();
		}
		return listFileName;
	}
	
	
	//@Override
	public PaymentResponsibleDto savePayRespo(PaymentResponsibleDto paymentDto, String queryType,
			Integer userId) {

		int a = 0;
		try {

			 if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) {
				
				sessionFactory.getCurrentSession().merge(paymentDto);
				a = maxCountOfColumn(BillMasterDto.class, "billId");
				
			} else if (queryType.equalsIgnoreCase("update")) {
				sessionFactory.getCurrentSession().merge(paymentDto);
				a = paymentDto.getPayResId();
			}

		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
		}
		
		//returning bill_Id
		return paymentDto;
	}

	@Override
	public List<PaymentResponsibleDto> fetchPayResp(Integer patientId) {
		PaymentResponsibleDto obj=new PaymentResponsibleDto();
		List<PaymentResponsibleDto> ltPayResRecord = null;
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PaymentResponsibleDto.class);
			criteria.add(Restrictions.eq("patientId", patientId));
			criteria.add(Restrictions.eq("deleted", "N"));
			
			criteria.addOrder(Order.desc("patientId"));

			ltPayResRecord = criteria.list();
					
		} catch (Exception e) {
			e.printStackTrace();
			return ltPayResRecord;
		}
		return ltPayResRecord;
	}

	
	@Override
	public int deletePayResponse(int pId, int tId, Integer userId) {
		// Code for delete
		Query query = sessionFactory.getCurrentSession()
				.createSQLQuery("update ehat_payment_responsible set deleted='Y',deleted_by="+userId+",deleted_date_time=now() where patient_id="+pId+"  and treatmentId="+tId+"");
		 query.executeUpdate();
		
		return 1;
	}
	
	//irfan khan 18-may-2018 fetch the difference between 2 dates in days
	//Used in registration functions
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

	//irfan khan 18-may-2018 fetch the difference between 2 dates in days
	@Override
	public long fetchDifferenceInDays(Date d1, Date d2) {
		long diff = d2.getTime() - d1.getTime();
	    return (TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public DemographicPatientDto getDemoPatientDetails(Integer patientId) {
		
		DemographicPatientDto demoPatObj = new DemographicPatientDto();
		List<DemographicPatientDto> ltDemographicPatientDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DemographicPatientDto.class);

			criteria.add(Restrictions.eq("patientId",patientId));

			ltDemographicPatientDto = criteria.list();
			 
  			demoPatObj.setListDemographicPatientDto(ltDemographicPatientDto);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return null;
		}
		return demoPatObj;
	}

	@Override
	public int checkIsOldPatientAvilable(String oldPatientId) {
		int count=0;
		try {
		Query query = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT count(patient_id) FROM ehat_patient where old_patient_id='"+oldPatientId+"'");
		
		count= ((Number) query.uniqueResult()).intValue();

		}catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return -1;
		}
		return count;
	}

@Override
	public DoctorDto getConsultantDrName(Integer treatmentId) {
		
		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
		DoctorDto objDocDto=new DoctorDto();
		
		try{
		String doctor_id = (String) sessionFactory
				.getCurrentSession().createSQLQuery("SELECT ifnull(doctor_id,'-') FROM ehat_treatment where treatment_id='"+treatmentId+"'").uniqueResult();
		
		if(!doctor_id.equalsIgnoreCase("-") && !doctor_id.equalsIgnoreCase("") && doctor_id!=null){
			
			String doc_arr[]=doctor_id.split(",");
			Integer[] doc_id = new Integer[doc_arr.length];
			
	        for (int i = 0; i < doc_arr.length; i++) {
	        	doc_id[i] = Integer.parseInt(doc_arr[i].trim());
	        }

			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			criteria.add(Restrictions.in("Doctor_ID",doc_id));
			criteria.setMaxResults(10);
			ltDoctorDto = criteria.list();
			objDocDto.setLstDoctorDto(ltDoctorDto);
		}
		}catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
					
		}
		
	return objDocDto;
	
 }
	
	//@author :Pooja Sukre@Date :25-3-2018@Code :To fetch Hall Type And Hall Name
		@Override
		public List<Hall> fetchPatientsBedRecords(Integer treatmentId) {
			System.err.println("helloooo");
			List<Hall> ltPatientBedRecord = new ArrayList<Hall>();
			
			 String sql="select h.Hname, ht.hall_type_name "
					 	+"from hall h,treatment_beds tb,beds b,hall_type ht "
	                    +"where tb.Bed_ID = b.Bed_ID and b.Hall_ID = h.Hall_ID and h.Htype = ht.idhall_type and tb.Treatment_ID ='"+treatmentId+"' order by tb.ID desc";
			 Query bedDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 bedDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 
			 @SuppressWarnings("unchecked")
			List<Map<String, Object>> listBedDetails = bedDetails.list();
				for(Map<String, Object> row : listBedDetails){
					Hall objData=new Hall();
					objData.setHname((String) row.get("Hname"));
					objData.setHtypeName((String)row.get("hall_type_name"));			
					ltPatientBedRecord.add(objData);
				}
				return ltPatientBedRecord;
		}
		
		@Override

        public String fetchPatientsDischargeDateByTreatmentId(
                Integer treatmentId) {
            String date="";
            String time="";
            String dateTime="";

            String sql="SELECT discharge_date FROM discharge_summery where Treatment_ID="+treatmentId+"";
            date = (String) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult();
            String sql2="SELECT discharge_time FROM discharge_summery where Treatment_ID="+treatmentId+"";
            time = (String) sessionFactory.getCurrentSession().createSQLQuery(sql2).uniqueResult();

            System.err.println("++++++++++//////********"+date);
            System.err.println("++++++++++//////********"+time);
            // TODO Auto-generated method stub

            if(date==null || time==null)
            {
                dateTime="";
            }
            else
            {
                String[] words=date.split("-");//splits the string based on -  
                //using java foreach loop to print elements of string array  
                dateTime=words[2]+"/"+words[1]+"/"+words[0]+" "+time;
            }

            return dateTime;
        }

	// reuse by -irfan khan 3-july-2018 fetch emrchrPer%
	public double getEmergencyPer() {
		double a = 0;
		try {
			Query emerChr = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select emrChrPer from hospitalaccinfo where idhospitalAccInfo=1");

			a = (Double) emerChr.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"
					+ new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : "
					+ new Exception().getStackTrace()[0].getMethodName()
					+ " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return a;
		}
		return a;
	}

	// reuse by -irfan khan 3-july-2018 Check emr time
	public boolean chkEmergencyTime() {
		//private DateFormat sdf = new SimpleDateFormat("HH");
		boolean emergencyFlag = false;
		try{
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
		
		//List<Map<String, Object>> details = getJdbcTemplate().queryForList(sql);

		//current time from system
		// sdf is an object of simple date format which takes only hours from the time("HH")

		
		int min = Integer.parseInt(sdf2.format(Time.valueOf(todays_time)).toLowerCase());
	
		int inTime = Integer.parseInt(sdf.format(Time.valueOf(todays_time)).toLowerCase());
		//int inTime2=inTime+min;
									
			for (Map<String, Object> row: details) {
							
					//assigning (fromTime & toTime)Time values from table into sdf("HH") hours
					fromTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionFromTime")).toLowerCase());
					toTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionToTime")).toLowerCase());
								
			}

		//business logic for registration charges.
			if ((fromTime > toTime) && (inTime >= fromTime || inTime <= toTime)) {
				if(inTime == toTime && min>0 )
				{
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else if (fromTime < toTime && (inTime >= fromTime && inTime <= toTime)) {
				if(inTime == toTime && min>0 )
				{
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else{
				emergencyFlag = false;
		}
		return emergencyFlag;
		}
		catch(Exception e){

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return emergencyFlag;
		}

	}

	//@Override
	public MlcDetailsDto saveMlcDetails(MlcDetailsDto mlcDto2, String queryType,
			Integer userId) {

		int a = 0;
		try {

			 if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) {
				
				sessionFactory.getCurrentSession().merge(mlcDto2);
				a = maxCountOfColumn(BillMasterDto.class, "billId");
				
			} else if (queryType.equalsIgnoreCase("update")) {
				sessionFactory.getCurrentSession().merge(mlcDto2);
				a = mlcDto2.getMlcId();
			}

		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
		}
		
		//returning bill_Id
		return mlcDto2;
	}

	@Override
	public List<MlcDetailsDto> fetchMlcDetails(Integer patientId) {
		MlcDetailsDto obj=new MlcDetailsDto();
		List<MlcDetailsDto> ltMlcResRecord = null;
		
		try {
			RegistrationDto patientObj = (RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class,patientId);
			
			/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MlcDetailsDto.class);
			criteria.add(Restrictions.eq("patientId", patientObj));
			criteria.add(Restrictions.eq("deleted", "N"));
			
			criteria.addOrder(Order.desc("patientId"));*/
			Hibernate.initialize(patientObj.getListMlcDetails());
			ltMlcResRecord = patientObj.getListMlcDetails();//criteria.list();
					
		} catch (Exception e) {
			e.printStackTrace();
			return ltMlcResRecord;
		}
		return ltMlcResRecord;
	}

	@Override
	public int saveMultipleSponsor(MultipleSponsorDto multipleSponsorDto,
			HttpServletRequest request) {
	
		try {
			Query q1 = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select count(charges_slave_id) from ehat_multiple_sponsor "
									+ " where charges_slave_id ='"+multipleSponsorDto.getChargesSlaveId()+"'"
									+" and treatment_id='"+multipleSponsorDto.getTreatmentId()+"'"); 
					List rows = q1.list(); 
					
					long constCharges = ((BigInteger)rows.get(0)).longValue();
				
					if(multipleSponsorDto.getMulSponsorId()!=0){
						
						MultipleSponsorDto obj=new MultipleSponsorDto();
						obj = (MultipleSponsorDto) sessionFactory
								.getCurrentSession().get(MultipleSponsorDto.class,
										multipleSponsorDto.getMulSponsorId());
						
						multipleSponsorDto.setRemSanctionAmt(obj.getRemSanctionAmt());
						
						sessionFactory.getCurrentSession().merge(multipleSponsorDto);
						
					}else{
						if(constCharges==0){
							sessionFactory.getCurrentSession().save(multipleSponsorDto);
						}else{
							return 2;
						}
					}
				
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public MultipleSponsorDto getMultilpleSponsorList(Integer treatmentId,
			HttpServletRequest request) {

		MultipleSponsorDto objMulSpnsr= new MultipleSponsorDto();
		List<MultipleSponsorDto> ltMulSpnsr = null;
		List<ChargesMasterSlave> ltChrgesSlv = new ArrayList<ChargesMasterSlave>();
		List<Integer> chargesSlvIdArr=new ArrayList();
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MultipleSponsorDto.class);
			criteria.add(Restrictions.eq("treatmentId",treatmentId));
			criteria.add(Restrictions.eq("deleted","N"));
			
			ltMulSpnsr = criteria.list();
			
			for(MultipleSponsorDto row : ltMulSpnsr){
				
				ChargesMasterSlave obj=new ChargesMasterSlave();
				Criteria criteria1 = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterSlave.class);
				criteria1.add(Restrictions.eq("chargesMasterDto",1)); //1 for sponsor type.
				criteria1.add(Restrictions.eq("slaveId",row.getChargesSlaveId()));
				criteria1.add(Restrictions.eq("isCategory","N"));
				criteria1.add(Restrictions.eq("deleted","N"));
				obj = (ChargesMasterSlave)criteria1.uniqueResult();
				ltChrgesSlv.add(obj);
			}

			objMulSpnsr.setListMultipleSponsor(ltMulSpnsr);
			objMulSpnsr.setListChargesMasterSlave(ltChrgesSlv);
			
			} catch (Exception e) {
			e.printStackTrace();
			return objMulSpnsr;
		}
		
		return objMulSpnsr;
	}

	@Override
	public MultipleSponsorDto getMulSponsorData(Integer treatmentId,
			Integer chargesSlaveId, HttpServletRequest request) {
		
		MultipleSponsorDto objMulSpnsr= new MultipleSponsorDto();
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(MultipleSponsorDto.class);
			criteria.add(Restrictions.eq("treatmentId",treatmentId));
			criteria.add(Restrictions.eq("chargesSlaveId",chargesSlaveId));
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.setMaxResults(1);
			
			objMulSpnsr = (MultipleSponsorDto)criteria.uniqueResult();
			
			} catch (Exception e) {
			e.printStackTrace();
			return objMulSpnsr;
			}
		return objMulSpnsr;
	}

	@Override
	public int deleteMultipleSponsor(Integer treatmentId,
			Integer mulSponsorId, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		try{
			MultipleSponsorDto obj=new MultipleSponsorDto();
			obj = (MultipleSponsorDto) sessionFactory
					.getCurrentSession().get(MultipleSponsorDto.class,
							mulSponsorId);
	
			// Set values to coloumn to update
			
			if(Double.compare(obj.getSanctionAmt(), obj.getRemSanctionAmt())==0){
				if(obj.getPrimaryFlag().equalsIgnoreCase("N")){
					obj.setDeleted("Y");
					obj.setDeletedBy(userId);
					obj.setDeletedDateTime(new Date(
							new java.util.Date().getTime()));
				}else{
					//if PrimaryFlag = Y record should not deleted.
					return 2;
				}
			}else{
				//if record is used then should not be deleted.
				return 2;
			}
			
			
		
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
			}
		
		return 1;
	}

	@Override
	public int setPrimarySponsor(Integer treatmentId, Integer mulSponsorId,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		try{
			MultipleSponsorDto obj=new MultipleSponsorDto();
			obj = (MultipleSponsorDto) sessionFactory
					.getCurrentSession().get(MultipleSponsorDto.class,
							mulSponsorId);
	
			// Set values to coloumn to update
			
				if(obj.getPrimaryFlag().equalsIgnoreCase("N")){
					
					Query query = sessionFactory.getCurrentSession()
							.createSQLQuery("update ehat_multiple_sponsor set primary_flag='N' where treatment_id='"+obj.getTreatmentId()+"'");
					 query.executeUpdate();
					
					obj.setPrimaryFlag("Y");
					obj.setPrimarySetBy(userId);
					obj.setPrimaryDateTime(new Date(
							new java.util.Date().getTime()));
				}else{
					//if PrimaryFlag = Y record should not.
					return 2;
				}
		
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
			}
		
		return 1;
	}

	// @author : Laxman Nikam @reason : To save Multilple Sponsor Details
	@Override
	public int saveSponsorDetails(int treatId, Integer sponsorId,String queryType,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		try{
			
			TreatmentDto objTrtmnt=new TreatmentDto();
			objTrtmnt = (TreatmentDto) sessionFactory
					.getCurrentSession().get(TreatmentDto.class,
							treatId);
			MultipleSponsorDto objMulSpnsr=new MultipleSponsorDto();
			objMulSpnsr.setTreatmentId(treatId);
			objMulSpnsr.setChargesSlaveId(sponsorId);
			objMulSpnsr.setCreatedBy(userId);
			objMulSpnsr.setCreatedDateTime(new Date(
					new java.util.Date().getTime()));
			objMulSpnsr.setUnitId(unitId);
			objMulSpnsr.setDeleted("N");
			objMulSpnsr.setPrimaryFlag("Y");
			objMulSpnsr.setPrimarySetBy(userId);
			objMulSpnsr.setPrimaryDateTime(new Date(
					new java.util.Date().getTime()));
			objMulSpnsr.setDepartmentId(objTrtmnt.getDepartmentId());
			objMulSpnsr.setDiseToBeTreat(objTrtmnt.getDiseToBeTreat());
			objMulSpnsr.setEmpid(objTrtmnt.getEmpid());
			objMulSpnsr.setIpdOrOpd(objTrtmnt.getIpdOrOpd());
			objMulSpnsr.setNeisNo(objTrtmnt.getNeisNo());
			objMulSpnsr.setPatientId(objTrtmnt.getPatientId());
			objMulSpnsr.setSactionOrdNo(objTrtmnt.getSactionOrdNo());
			objMulSpnsr.setSanctionAmt(objTrtmnt.getSanctionAmt());
			objMulSpnsr.setSponsorId(1);
			objMulSpnsr.setTpaid(objTrtmnt.getTpaid());
			objMulSpnsr.setTreatPermited(objTrtmnt.getTreatPermited());
			objMulSpnsr.setValidUpToDate(objTrtmnt.getValidUpToDate());
			objMulSpnsr.setVisitNo(objTrtmnt.getVisitNo());
			objMulSpnsr.setRemSanctionAmt(objTrtmnt.getSanctionAmt());
			objMulSpnsr.setRefDate(objTrtmnt.getRefDate());
			
			//When patient markvisit
			if(queryType.equalsIgnoreCase("markvisit")){
					List<MultipleSponsorDto> listCheck = new ArrayList<MultipleSponsorDto>();
					  
					//Fetch Previous TretId. 
					Criteria oldSpnsrCriteria = sessionFactory.getCurrentSession()
							.createCriteria(MultipleSponsorDto.class);
					oldSpnsrCriteria.add(Restrictions.eq("patientId",objTrtmnt.getPatientId()));
					oldSpnsrCriteria.add(Restrictions.eq("deleted","N"));
					oldSpnsrCriteria.add(Restrictions.eq("unitId",unitId));	
					oldSpnsrCriteria.setProjection(Projections.max("treatmentId"));
					
					Integer maxTreatId = (Integer) oldSpnsrCriteria.uniqueResult();
					
					//Fetch previous multiple sponsor record.
					Criteria maxTrIdCriteria = sessionFactory.getCurrentSession()
							.createCriteria(MultipleSponsorDto.class);
					maxTrIdCriteria.add(Restrictions.eq("patientId",objTrtmnt.getPatientId()));
					maxTrIdCriteria.add(Restrictions.eq("deleted","N"));
					maxTrIdCriteria.add(Restrictions.eq("unitId",unitId));	
					maxTrIdCriteria.add(Restrictions.eq("treatmentId",maxTreatId));	
					
					listCheck=maxTrIdCriteria.list();
					
					for(MultipleSponsorDto bojComp:listCheck){
						
						MultipleSponsorDto obj=new MultipleSponsorDto();
						
						obj.setMulSponsorId(0);
						obj.setTreatmentId(treatId);
						obj.setCreatedBy(userId);
						obj.setCreatedDateTime(new Date(new java.util.Date().getTime()));
						obj.setDepartmentId(objTrtmnt.getDepartmentId());
						obj.setPrimaryFlag("N");
						obj.setChargesSlaveId(bojComp.getChargesSlaveId());
						obj.setDiseToBeTreat(bojComp.getDiseToBeTreat());
						obj.setEmpid(bojComp.getEmpid());
						obj.setIpdOrOpd(bojComp.getIpdOrOpd());
						obj.setNeisNo(bojComp.getNeisNo());
						obj.setPatientId(bojComp.getPatientId());
						obj.setRefDate(bojComp.getRefDate());
						obj.setSactionOrdNo(bojComp.getSactionOrdNo());
						obj.setSanctionAmt(bojComp.getSanctionAmt());
						obj.setSponsorId(bojComp.getSponsorId());
						obj.setTpaid(bojComp.getTpaid());
						obj.setTreatPermited(bojComp.getTreatPermited());
						obj.setUnitId(bojComp.getUnitId());
						obj.setValidUpToDate(bojComp.getValidUpToDate());
						obj.setVisitNo(bojComp.getVisitNo());
						obj.setRemSanctionAmt(bojComp.getRemSanctionAmt());
						obj.setDiscount(bojComp.getDiscount());
						obj.setTotalBill(bojComp.getTotalBill());
						obj.setTotalConcn(bojComp.getTotalConcn());
						obj.setTotalPaid(bojComp.getTotalPaid());
						obj.setTotalRefund(bojComp.getTotalRefund());
						obj.setTotalRemain(bojComp.getTotalRemain());
						obj.setTotalTds(bojComp.getTotalTds());
						
						//Save multiple sponsor by new TretId.
						sessionFactory.getCurrentSession().save(obj);
					}
			}
			
			//Save and set default primary sponsor.
			Criteria sponserCriteria = sessionFactory.getCurrentSession()
					.createCriteria(MultipleSponsorDto.class);
			sponserCriteria.setProjection(Projections.property("mulSponsorId"));
			sponserCriteria.add(Restrictions.eq("treatmentId",treatId));
			sponserCriteria.add(Restrictions.eq("chargesSlaveId",sponsorId));
			sponserCriteria.add(Restrictions.eq("deleted","N"));
			sponserCriteria.setMaxResults(1);
			
			Integer mul_sponsor_id = (Integer) sponserCriteria.uniqueResult();
			
			
			//For reset previous primary flag.
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_multiple_sponsor set primary_flag='N' where treatment_id='"+objMulSpnsr.getTreatmentId()+"'");
			 query.executeUpdate();
			
			if(mul_sponsor_id!=null){
				objMulSpnsr.setMulSponsorId(mul_sponsor_id);
				sessionFactory.getCurrentSession().merge(objMulSpnsr);
			}else{
				sessionFactory.getCurrentSession().save(objMulSpnsr);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
			}
		return 1;
	}
	
	// @author : Irfan Khan @date: 10-Oct-2018 @reason : To UnBlock Patient
	@Override
	public int unBlockPatient(int pid, String blockFlag, String narration, Integer userId, String userLoginName) {

		Query query;
	/*	if (blockFlag.equalsIgnoreCase("S")) {
			query = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_patient set block_flag= :blockFlag ,block_narration_3= :narration "
							+ ",block_user_id_3= :userId,block_user_name_3= :userLoginName where patient_id= :patientId ");
			query.setParameter("narration", narration);
			query.setParameter("userId", userId);
			query.setParameter("userLoginName", userLoginName);

		} else if (blockFlag.equalsIgnoreCase("F")) {
			query = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_patient set block_flag= :blockFlag ,block_narration_2= :narration "
							+ ", block_user_id_2= :userId,block_user_name_2= :userLoginName where patient_id= :patientId ");
			query.setParameter("narration", narration);
			query.setParameter("userId", userId);
			query.setParameter("userLoginName", userLoginName);
		} else if (blockFlag.equalsIgnoreCase("N")) {
			query = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_patient set block_flag= :blockFlag ,block_narration_1= :narration "
							+ ",block_user_id_1= :userId,block_user_name_1= :userLoginName where patient_id= :patientId ");
			query.setParameter("narration", narration);
			query.setParameter("userId", userId);
			query.setParameter("userLoginName", userLoginName);

		} else {
			query = sessionFactory.getCurrentSession()
					.createSQLQuery("update ehat_patient set block_flag= :blockFlag where patient_id= :patientId ");
		}
*/
		
		query = sessionFactory.getCurrentSession()
				.createSQLQuery("update ehat_patient set block_flag= :blockFlag ,block_narration_3= :narration "+ ",block_narration_2= :narration,block_narration_1= :narration,block_user_id_3= :userId,block_user_id_2= :userId,block_user_id_1= :userId,block_user_name_3= :userLoginName,block_user_name_2= :userLoginName,block_user_name_1= :userLoginName where patient_id= :patientId ");
		query.setParameter("narration", narration);
		query.setParameter("userId", userId);
		query.setParameter("userLoginName", userLoginName);
		query.setParameter("blockFlag", 'N');
		query.setParameter("patientId", pid);
		int result = query.executeUpdate();

		return result;
	}

	//irfan khan 11-oct-2018 fetch patient counts
	@Override
	public List<Integer> patientQueueListOnDashb() {
		ArrayList<Integer> records = new ArrayList<Integer>();

		// opd active patients count
		Query opdCountQuery = sessionFactory.getCurrentSession().createSQLQuery(
				//"SELECT count(*) FROM ehat_treatment where t_flag='Y' and department_id=1 and deleted='N'");
	  //"SELECT count(*) FROM ehat_treatment where t_flag='Y' and department_id=1 and deleted='N'");
				"SELECT count(*) FROM ehat_treatment where department_id=1 and t_flag='Y' and deleted='N' LIMIT 10");


		records.add(((Number) opdCountQuery.uniqueResult()).intValue());
		/*Integer opdCount = ((Number) opdCountQuery.uniqueResult()).intValue();
		System.err.println("yayyy==="+ opdCountQuery.uniqueResult());*/
		
		// OPD without consultant patients count
		Query opdwithoutconstCountQuery = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT count(*) FROM ehat_treatment where t_flag='Y' and department_id=1 and deleted='N' and (doctor_id IS NULL OR doctor_id = '')");

		records.add(((Number) opdwithoutconstCountQuery.uniqueResult()).intValue());

		// ipd active patients count
		Query ipdCountQuery = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT count(*) FROM ehat_treatment where t_flag='Y' and department_id=2 and deleted='N' ");

		records.add(((Number) ipdCountQuery.uniqueResult()).intValue());

		// ipd without bed patients count
		Query ipdwithoutBedCountQuery = sessionFactory.getCurrentSession()
				.createSQLQuery("SELECT count(*) FROM ehat_ipd");

		records.add(((Number) ipdwithoutBedCountQuery.uniqueResult()).intValue());

		// Diago active patients count
		Query diagoCountQuery = sessionFactory.getCurrentSession().createSQLQuery(
				"SELECT count(*) FROM ehat_treatment where t_flag='Y' and department_id=3 and deleted='N'");

		records.add(((Number) diagoCountQuery.uniqueResult()).intValue());

		return records;
	}
	
	@Override	
	//@author : Vinod Udawant @date: 01-April-2019 @reason : To Save and Update Other patient
	public int saveOtherBillDetails(OtherBillingDto billDetailsDto,String queryType) {
		int a = 0;
		try {
			
			String conChargesQuery = "";
        	int hallslave_id = 0;
			if(billDetailsDto.getDepartmentId() == 1){
				
				hallslave_id = -1;
			}else if(billDetailsDto.getDepartmentId() == 3){
				
				hallslave_id = -3;
			}
			
			if (queryType.equalsIgnoreCase("delete")) {
				
				a = billDetailsDto.getBillDetailsId();
				// Code for delete
				billDetailsDto = (OtherBillingDto) sessionFactory.getCurrentSession().get(OtherBillingDto.class,billDetailsDto.getPatienttId());
				// Set values to coloumn to update
				billDetailsDto.setDeleted("Y");
				billDetailsDto.setDeletedBy(billDetailsDto.getCreatedBy());
				billDetailsDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));
				
			} else if (queryType.equalsIgnoreCase("insert")	|| queryType.equalsIgnoreCase("markvisit")) {

				String sqlMax="select ifnull(max(Appt_ID),0) from appointment";
				Query maxQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlMax);
				int maxAppId = ((Number)maxQuery.uniqueResult()).intValue();
				
				if (masterConfigAccess(billDetailsDto.getUnitId(),billDetailsDto.getDepartmentId(), 1)) {
					
					if (queryType.equalsIgnoreCase("insert")) {
						
						Query q = sessionFactory.getCurrentSession().createSQLQuery("SELECT ifnull(hospitalRegCharges,0) as hospitalRegCharges FROM hospital");
						List<String> list = q.list();
						double regCharges = Double.parseDouble(list.get(0));

						// registration charges sponsorwise
						Query q2 = sessionFactory.getCurrentSession().createSQLQuery("SELECT id FROM ehat_subservice where service_id=1 and deleted='N' limit 1");

						Integer subServIdReg = (Integer) q2.uniqueResult();
						Double confgRegCharges = 0.0;
						
						// if patient is sponsor
						if (billDetailsDto.getChargesSlaveId() > 0) {

							// check if concultation charges are configured
							confgRegCharges = autoSuggService.getchargessponsor(1,billDetailsDto.getChargesSlaveId(),0, 0, subServIdReg,billDetailsDto.getTreatmentId());
						}
						// end reg sponsorwise

						// check for holiday=today?
						Query qCount = sessionFactory.getCurrentSession().createSQLQuery("select count(*) from hospital_holiday where date="+ todays_date4);
						Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();

						// check for sunday today?
						SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
						String currentDay = dayFormatter.format(currentDate.getTime());

						if (currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()) {

							// fetch emergency percentage
							double emrChrPer = getEmergencyPer();
							regCharges = regCharges * (1 + emrChrPer / 100);
							confgRegCharges = confgRegCharges * (1 + emrChrPer / 100);
						}

						if (confgRegCharges > 0) {
							billDetailsDto.setRate(regCharges);
							billDetailsDto.setQuantity(1);
							billDetailsDto.setAmount(regCharges * 1);
							billDetailsDto.setServiceId(1);
							billDetailsDto.setOtherAmount(confgRegCharges * 1);
							billDetailsDto.setOtherRate(confgRegCharges);
						} else {
							billDetailsDto.setRate(regCharges);
							billDetailsDto.setQuantity(1);
							billDetailsDto.setAmount(regCharges * 1);
							billDetailsDto.setServiceId(1);
							billDetailsDto.setOtherAmount(regCharges * 1);
							billDetailsDto.setOtherRate(regCharges);
						}
						billDetailsDto.setOtherServiceName("Registration Charges");
						billDetailsDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
						billDetailsDto.setAppointId(maxAppId);
						
						// Entry in database opd bill table for registration
						//sessionFactory.getCurrentSession().merge(billDetailsDto);
					}
				}		
				
				String doctorIdList = String.valueOf(billDetailsDto.getDoctorId());
				
				if (masterConfigAccess(billDetailsDto.getUnitId(),billDetailsDto.getDepartmentId(), 2)) {
					if (!doctorIdList.equalsIgnoreCase("") && !doctorIdList.equalsIgnoreCase(null)) {
						//String[] ary = doctorIdList.split(",");
						//ary[0] = doctorIdList;
						for (int i = 0; i < 1; i++) {
							
							int docId = billDetailsDto.getDoctorId();//Integer.parseInt(ary[i]);
							
							String subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1";
							
							// query to fetch consultation charges of the doctor
							//conChargesQuery ="SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
							if (billDetailsDto.getChargesSlaveId() > 0) {
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
				    	    	
			    	    	}else{
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
			    	    	}
							
							if (queryType.equalsIgnoreCase("markvisit")) {
								//fetch doctor_followup_days from hospital table
								Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
												"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
								Integer doctorFollowupDays = (Integer) q3.uniqueResult();
								
								//fetch last treatment date
								Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+billDetailsDto.getPatienttId()+" AND t_flag = 'N' > 0)"
											       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+billDetailsDto.getPatienttId()
											       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
												/*"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
												+" and t_flag='N' order by treatment_id desc limit 1");*/
												
								
								
								Date lastTreatmentDate = (Date) q25.uniqueResult();
								
								//calculate difference between last treatment and current treatment
								long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
								
								//if diff is less than or equals followup days then apply followup charges
								if(differenceDays <= doctorFollowupDays){
									SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
						    	    String currentDay = dayFormatter.format(currentDate.getTime());
						    	   
						    	  //  if(currentDay.equalsIgnoreCase("Sat") || currentDay.equalsIgnoreCase("Sun")){
						    	    if(currentDay.equalsIgnoreCase("Sun")){//only for shraddha
						    	    	//conChargesQuery = "SELECT ifnull(folloup_weekend,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	
						    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
						    	    		
						    	    		conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
							    	    	
						    	    	}else{
						    	    		
						    	    		conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";
							    	    }
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekEnd' and deleted='N' limit 1";
						    	    }else{
						    	    	//conChargesQuery = "SELECT ifnull(folloup_fees,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	
						    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
						    	    		
						    	    		conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
							    	    	
						    	    	}else{
						    	    		
						    	    		conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
						    	    	}
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekDay' and deleted='N' limit 1";

						    	    }
								}
								
							}
												
							
							/*Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery).setParameter("doctorId", docId);
							double constCharges = (Double) q1.uniqueResult();*/
							
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	    
				    	    if(currentDay.equalsIgnoreCase("Sun")){
				    	    	
				    	    	if (billDetailsDto.getChargesSlaveId() > 0) {
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
					    	    	
				    	    	}else{
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
				    	    	}
				    	    }				    	    
							
							double constCharges = 0;
							String sqlC = "";
							if (billDetailsDto.getChargesSlaveId() > 0) {
								
								sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+billDetailsDto.getChargesSlaveId()+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
							}else{
								
								sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";
							}
							
							Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlC);
							int countDr = ((Number)refQuery.uniqueResult()).intValue();
							
							if(countDr > 0){
								
								//Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery).setParameter("doctorId", docId);
								Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
								constCharges = (Double) q1.uniqueResult();
							}else{
								
								constCharges = 0; 
							}	
							// added by vinod
														
							Query q2 = sessionFactory.getCurrentSession().createSQLQuery(subServQueryForId);
							Integer subServIdConcsultaion = (Integer) q2.uniqueResult();

							// if patient is sponsor
							/*if (billDetailsDto.getChargesSlaveId() > 0) {

								// check if concultation charges are configured
								Double confgConCharges = autoSuggService.getchargessponsor(1, billDetailsDto.getChargesSlaveId(), 0, 0,
												subServIdConcsultaion,billDetailsDto.getTreatmentId());

								if (confgConCharges > 0) {
									constCharges = confgConCharges;
									System.err.println("chargesin"+ constCharges);
								}
							}*/
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery("select count(*) from hospital_holiday where date="+todays_date4);
							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							if(countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();				    	    	
				    	    	constCharges = constCharges *(1+emrChrPer/100);
				    	    }
				    	    
							billDetailsDto.setRate(constCharges);
							billDetailsDto.setQuantity(1);
							billDetailsDto.setAmount(constCharges * 1);
							billDetailsDto.setServiceId(2);
							billDetailsDto.setDoctorId(docId);
							
							// doctor
							billDetailsDto.setSubServiceId(subServIdConcsultaion);
							billDetailsDto.setOtherAmount(constCharges * 1);
							billDetailsDto.setOtherRate(constCharges);
							billDetailsDto.setOtherPay(constCharges * 1);
							billDetailsDto.setCoPay(constCharges);
							
							billDetailsDto.setOtherServiceName("Consultation Charges");
							billDetailsDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
							billDetailsDto.setAppointId(maxAppId);
							
							// Entry in database opd bill table for consultation
							//sessionFactory.getCurrentSession().merge(billDetailsDto);
						}
					}					
				}
			} 
			
			a = maxCountOfColumn(BillDetailsDto.class, "billDetailsId");

		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
		}
		// returning bill_Id
		return a;
	}
	
	@Override	
	//@author : Vinod Udawant @date: 03-April-2019 @reason : To Save bill details from appointment
	public int saveFromOtherBillDetails(BillDetailsDto billDetailsDto,HttpServletRequest request, String queryType,
					List<OtherBillingDto> lstOtherBill,String doctorIdList){
		int a = 0;
        try {
           
        	String conChargesQuery = "SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
            if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) {
      	
			if (masterConfigAccess(billDetailsDto.getUnitId(), billDetailsDto.getDepartmentId(), 1)) {
											
				int size = lstOtherBill.size();
				if(size > 1){
					
					OtherBillingDto otherObj = lstOtherBill.get(0);
					
					billDetailsDto.setRate(otherObj.getRate());
					billDetailsDto.setOtherRate(otherObj.getRate());
					billDetailsDto.setQuantity(1);
					billDetailsDto.setAmount(otherObj.getAmount());
					billDetailsDto.setOtherAmount(otherObj.getAmount());
					billDetailsDto.setCoPay(otherObj.getAmount());
					billDetailsDto.setServiceId(1);
					billDetailsDto.setPaidFlag(otherObj.getPaidFlag());
					billDetailsDto.setDoctorId(otherObj.getDoctorId());
					billDetailsDto.setCreatedBy(otherObj.getCreatedBy());
					billDetailsDto.setCreatedDateTime(otherObj.getCreatedDateTime());
					
				}else{
									
					//if callfrom markvisit then check for the followupdays
					if (queryType.equalsIgnoreCase("markvisit")) {
										
						//fetch regFollowUpDays from hospital table
						Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT registration_followup_days as registration_followup_days FROM hospital");
						Integer regFollowUpDays = (Integer) q3.uniqueResult();
						
						/*//fetch last treatment date
						Query q2 = sessionFactory.getCurrentSession().createSQLQuery(
										"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
										+" and t_flag='N' order by treatment_id desc limit 1");*/
						
						
						//fetch last treatment date
						Query q2 = sessionFactory.getCurrentSession().createSQLQuery(
								"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+billDetailsDto.getPatienttId()+" AND t_flag = 'N' > 0)"
									       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+billDetailsDto.getPatienttId()
									       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
										/*"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
										+" and t_flag='N' order by treatment_id desc limit 1");*/
						Date lastTreatmentDate = (Date) q2.uniqueResult();
						
						//calculate difference between last treatment and current treatment
						long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
						
						//if diff is greater then apply registraion charges else do not apply
						if(differenceDays >regFollowUpDays || regFollowUpDays == 0){
							
							Query q = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT ifnull(hospitalRegCharges,0) as hospitalRegCharges FROM hospital");
							List<String> list = q.list();
							double regCharges = Double.parseDouble(list.get(0));
							
							//registration charges sponsorwise
							Query q22 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(
											"SELECT id FROM ehat_subservice where service_id=1 and deleted='N' limit 1");

							Integer subServIdReg = (Integer) q22
									.uniqueResult();
							Double confgRegCharges=0.0;
							// if patient is sponsor
							if (billDetailsDto.getChargesSlaveId() > 0) {

								// check if concultation charges are configured
								 confgRegCharges = autoSuggService
										.getchargessponsor(1, billDetailsDto
												.getChargesSlaveId(), 0, 0,
												subServIdReg,
												billDetailsDto.getTreatmentId());

								/*if (confgRegCharges > 0) {
									regCharges = confgRegCharges;
									System.err.println("chargesin"
											+ regCharges);
								}*/
							}
							//end reg sponsorwise
							
							//Emergency Charges code Start
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	   
				    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	regCharges = regCharges *(1+emrChrPer/100);
				    	    	confgRegCharges = confgRegCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End
							if (confgRegCharges > 0) {
								billDetailsDto.setRate(regCharges);
								billDetailsDto.setQuantity(1);
								billDetailsDto.setAmount(regCharges * 1);
								billDetailsDto.setServiceId(1);
								billDetailsDto.setOtherAmount(confgRegCharges * 1);
								billDetailsDto.setOtherRate(confgRegCharges);
							}else{
								billDetailsDto.setRate(regCharges);
								billDetailsDto.setQuantity(1);
								billDetailsDto.setAmount(regCharges * 1);
								billDetailsDto.setServiceId(1);
								billDetailsDto.setOtherAmount(regCharges * 1);
								billDetailsDto.setOtherRate(regCharges);
							}							
						}
						
					} else {
						Query q = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT ifnull(hospitalRegCharges,0) as hospitalRegCharges FROM hospital");
						List<String> list = q.list();
						double regCharges = Double.parseDouble(list.get(0));
						
						//registration charges sponsorwise
						Query q2 = sessionFactory
								.getCurrentSession()
								.createSQLQuery(
										"SELECT id FROM ehat_subservice where service_id=1 and deleted='N' limit 1");

						Integer subServIdReg = (Integer) q2
								.uniqueResult();
						Double confgRegCharges=0.0;
						// if patient is sponsor
						if (billDetailsDto.getChargesSlaveId() > 0) {

							// check if concultation charges are configured
							 confgRegCharges = autoSuggService
									.getchargessponsor(1, billDetailsDto
											.getChargesSlaveId(), 0, 0,
											subServIdReg,
											billDetailsDto.getTreatmentId());

							/*if (confgRegCharges > 0) {
								regCharges = confgRegCharges;
								System.err.println("chargesin"
										+ regCharges);
							}*/
						}
						
						//end reg sponsorwise
						
						//Emergency Charges code Start------------------------------
						
						//check for holiday=today?
						Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
								"select count(*) from hospital_holiday where date="+todays_date4);

						Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
						
						//check for sunday today?
						SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
			    	    String currentDay = dayFormatter.format(currentDate.getTime());
			    	   
			    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
			    	    	
			    	    	//fetch emergency percentage
			    	    	double emrChrPer = getEmergencyPer();
			    	    	
			    	    	regCharges = regCharges *(1+emrChrPer/100);
			    	    	confgRegCharges = confgRegCharges *(1+emrChrPer/100);			    	    	 
			    	    }
			    	    
						//Emergency Charges code End-------------------------------------
						
			    	    if (confgRegCharges > 0) {
			    	    	billDetailsDto.setRate(regCharges);
							billDetailsDto.setQuantity(1);
							billDetailsDto.setAmount(regCharges * 1);
							billDetailsDto.setServiceId(1);
							billDetailsDto.setOtherAmount(confgRegCharges * 1);
							billDetailsDto.setOtherRate(confgRegCharges);
			    	    }else{
							billDetailsDto.setRate(regCharges);
							billDetailsDto.setQuantity(1);
							billDetailsDto.setAmount(regCharges * 1);
							billDetailsDto.setServiceId(1);
							billDetailsDto.setOtherAmount(regCharges * 1);
							billDetailsDto.setOtherRate(regCharges);
						}					
					}	
					
					billDetailsDto.setPaidFlag("N");
				}	
				// Entry in database opd bill table for registration
				//sessionFactory.getCurrentSession().merge(billDetailsDto);
			}
			if (masterConfigAccess(billDetailsDto.getUnitId(),billDetailsDto.getDepartmentId(), 2)) {
				
				if (!doctorIdList.equalsIgnoreCase("") && !doctorIdList.equalsIgnoreCase(null)) {
					String[] ary = doctorIdList.split(",");
					for (int i = 0; i < ary.length; i++) {
						
						int docId = Integer.parseInt(ary[i]);
						OtherBillingDto otherObj = lstOtherBill.get(lstOtherBill.size()-1);								
						if(docId == otherObj.getDoctorId()){
							
							billDetailsDto.setRate(otherObj.getRate());
							billDetailsDto.setOtherRate(otherObj.getRate());
							billDetailsDto.setQuantity(1);
							billDetailsDto.setAmount(otherObj.getAmount());
							billDetailsDto.setOtherAmount(otherObj.getAmount());
							billDetailsDto.setCoPay(otherObj.getAmount());
							billDetailsDto.setServiceId(2);
							billDetailsDto.setDoctorId(docId);
							billDetailsDto.setPaidFlag(otherObj.getPaidFlag());
							billDetailsDto.setSubServiceId(otherObj.getSubServiceId());
							billDetailsDto.setCreatedBy(otherObj.getCreatedBy());
							billDetailsDto.setCreatedDateTime(otherObj.getCreatedDateTime());
							
						}else{
													
							String subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1";
							
							if (queryType.equalsIgnoreCase("markvisit")) {
								//fetch doctor_followup_days from hospital table
								Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
												"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
								Integer doctorFollowupDays = (Integer) q3.uniqueResult();
								
								//fetch last treatment date
								Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
										"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+billDetailsDto.getPatienttId()+" AND t_flag = 'N' > 0)"
											       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+billDetailsDto.getPatienttId()
											       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
												/*"select ifnull(date(created_date_time),date(now())) as created_date_time from ehat_treatment where patient_id="+billDetailsDto.getPatienttId()
												+" and t_flag='N' order by treatment_id desc limit 1");*/
																			
								Date lastTreatmentDate = (Date) q25.uniqueResult();
								
								//calculate difference between last treatment and current treatment
								long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
								
								//if diff is less than or equals followup days then apply followup charges
								if(differenceDays <= doctorFollowupDays){
									SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
						    	    String currentDay = dayFormatter.format(currentDate.getTime());
						    	   
						    	  //  if(currentDay.equalsIgnoreCase("Sat") || currentDay.equalsIgnoreCase("Sun")){
						    	    if(currentDay.equalsIgnoreCase("Sun")){//only for shraddha
						    	    	conChargesQuery = "SELECT ifnull(folloup_weekend,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekEnd' and deleted='N' limit 1";
						    	    }else{
						    	    	conChargesQuery = "SELECT ifnull(folloup_fees,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
						    	    	
						    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekDay' and deleted='N' limit 1";

						    	    }
								}								
							}
													
							Query q1 = sessionFactory.getCurrentSession()
									.createSQLQuery(conChargesQuery)
									.setParameter("doctorId", docId);
							double constCharges = (Double) q1.uniqueResult();
														
							Query q2 = sessionFactory
									.getCurrentSession()
									.createSQLQuery(subServQueryForId);

							Integer subServIdConcsultaion = (Integer) q2
									.uniqueResult();

							// if patient is sponsor
							if (billDetailsDto.getChargesSlaveId() > 0) {

								// check if concultation charges are configured
								Double confgConCharges = autoSuggService
										.getchargessponsor(1, billDetailsDto
												.getChargesSlaveId(), 0, 0,
												subServIdConcsultaion,
												billDetailsDto.getTreatmentId());

								if (confgConCharges > 0) {
									constCharges = confgConCharges;
									System.err.println("chargesin"
											+ constCharges);
								}
							}
														
							//Emergency Charges code Start------------------------------
							
							//check for holiday=today?
							Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
									"select count(*) from hospital_holiday where date="+todays_date4);

							Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
							
							//check for sunday today?
							SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
				    	    String currentDay = dayFormatter.format(currentDate.getTime());
				    	   
				    	    if(currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTime()){
				    	    	
				    	    	//fetch emergency percentage
				    	    	double emrChrPer = getEmergencyPer();
				    	    	
				    	    	constCharges = constCharges *(1+emrChrPer/100);
				    	    }
				    	    
							//Emergency Charges code End-------------------------------------
				    	    
							billDetailsDto.setRate(constCharges);
							billDetailsDto.setQuantity(1);
							billDetailsDto.setAmount(constCharges * 1);
							billDetailsDto.setServiceId(2);
							billDetailsDto.setDoctorId(docId);
							// for kishors view set service id = 0 instead of
							// doctor
							billDetailsDto.setSubServiceId(subServIdConcsultaion);
							billDetailsDto.setOtherAmount(constCharges * 1);
							billDetailsDto.setOtherRate(constCharges);
							billDetailsDto.setOtherPay(constCharges * 1);
							billDetailsDto.setCoPay(constCharges);		
							billDetailsDto.setPaidFlag("N");
						}			
						// Entry in database opd bill table for consultation
						//sessionFactory.getCurrentSession().merge(billDetailsDto);	
					}
				}
				a = maxCountOfColumn(BillDetailsDto.class, "billDetailsId");
			}
		} 
            
        // Copy receipt from appointment advance to normal billing
        int res = setReceiptFromOtherBilling(lstOtherBill.get(0).getPatienttId(),billDetailsDto,doctorIdList);
            
        String sql="";
        double totalAmt = 0;
        if(billDetailsDto.getChargesSlaveId() > 0){
			
			sql="select ifnull(sum(other_amount),0) as totAmt FROM ehat_bill_details where deleted='N' and treatment_id="+billDetailsDto.getTreatmentId()+" and cancle='N' and service_id != 21 ";
		}else{
			
			sql="select ifnull(sum(amount),0) as totAmt FROM ehat_bill_details where deleted='N' and treatment_id="+billDetailsDto.getTreatmentId()+" and cancle='N' and service_id != 21 ";
		}
        Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
        totalAmt = (Double) refQuery.uniqueResult();
        
        //Session session = session;
		String hql = "UPDATE BillMasterDto set updatedDateTime =:updatedDateTime, totalBill =:totalBill,total_remain =:remaining WHERE treatmentId =:treatmentId";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setDate("updatedDateTime",new Date(new java.util.Date().getTime()));
		query.setParameter("totalBill",totalAmt);  				
		query.setParameter("remaining",totalAmt); 				
		query.setParameter("treatmentId",billDetailsDto.getTreatmentId());  
		query.executeUpdate();
            
        } catch (Exception e) {
            e.printStackTrace();
            a = -1;
        }
        // returning bill_Id
        return a;
	}
	
	
	public int setReceiptFromOtherBilling(int patientId,BillDetailsDto billDetailsDto,String doctorIdList){
		
		try{			
			Session session = sessionFactory.getCurrentSession();
			
			Criteria criteriaRec = session.createCriteria(OtherBillReceiptMasterDTO.class);			
			criteriaRec.add(Restrictions.eq("patientId",patientId));			
			criteriaRec.add(Restrictions.eq("deleted", "N"));
			List<OtherBillReceiptMasterDTO> listRecDetails = (List<OtherBillReceiptMasterDTO>) criteriaRec.list();		
						
			for(OtherBillReceiptMasterDTO billRec:listRecDetails){
				
				List<BillReceiptSlaveDTO> listBillReceiptSlave = new ArrayList<BillReceiptSlaveDTO>();
				
				int depId    = 0;
				int unitId   = 0;
				int departId = 0;
				int billId	 = 0;
				int patId    = 0;
				
				Criteria criteria = session.createCriteria(BillDetailsDto.class);			
				criteria.add(Restrictions.eq("treatmentId", billDetailsDto.getTreatmentId()));	
				criteria.add(Restrictions.eq("cancle", "N"));
				criteria.add(Restrictions.eq("paidFlag", "Y"));
				criteria.add(Restrictions.eq("deleted", "N"));
				
				List<BillDetailsDto> listBillDetails = (List<BillDetailsDto>) criteria.list();		
							
				for(BillDetailsDto billSlave:listBillDetails){
					
					unitId   = billSlave.getUnitId();
					departId = billSlave.getDepartmentId();
					billId	 = billSlave.getBillId();
					patId	 = billSlave.getPatienttId();
					
					// set receipt slave 
					BillReceiptSlaveDTO slave=new BillReceiptSlaveDTO();
					slave.setUnitId(unitId);				
					slave.setTreatmentId(billSlave.getTreatmentId());
					slave.setPatientId(patId);
					slave.setBillId(billId);						
					slave.setDepartmentId(departId);
					slave.setSourceTypeId(billSlave.getChargesSlaveId());
					
					// for profees
					slave.setActualConcnPer(billSlave.getConcessionOnPerc());
					slave.setActualDiscPer(billRec.getTotalDisc());				
					// for profees				
										
					slave.setRate(billSlave.getRate());
					slave.setAmount(billSlave.getAmount());
					slave.setConcession(billSlave.getConcession());						
					slave.setPaid(billSlave.getAmount()-billSlave.getConcession());							
					
					// for profees
					slave.setActualAmt(billSlave.getAmount());
					slave.setActualConcnAmt(billSlave.getConcession());	
					slave.setActualPayable(billSlave.getAmount()-billSlave.getConcession());
					double disc=((billSlave.getAmount()-billSlave.getConcession())*billRec.getTotalDisc())/100;
					slave.setActualDiscAmt(disc);
					slave.setActualFinalPayable((billSlave.getAmount()-billSlave.getConcession())-disc);
					slave.setActualFinalPaid((billSlave.getAmount()-billSlave.getConcession())-disc);
					// for profees
								
					slave.setQuantity(billSlave.getQuantity());
					//slave.setRemain(0);
					slave.setCreatedBy(billSlave.getCreatedBy());
					slave.setCreatedDateTime(billSlave.getCanceledDateTime());
					
					// to get only date from dateTime
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					java.util.Date assignDate = sdf.parse(sdf.format(billSlave.getCreatedDateTime()));
		
					slave.setServiceAssignDate(assignDate);
					//slave.setSourceTypeId(billRecMaster.getSourceTypeId());					
					slave.setDoctorId(billSlave.getDoctorId());
					slave.setServiceId(billSlave.getServiceId());
					slave.setSubServiceId(billSlave.getSubServiceId());
					slave.setConcession(billSlave.getConcession());
					slave.setBillDetailsId(billSlave.getBillDetailsId());
					
					String compName = "";
					if(slave.getServiceId()==1){
						
						compName="Registration Charges";
						
					}else{
						
						Criteria criteriaCompName = session.createCriteria(SubServiceDto.class);			
						criteriaCompName.add(Restrictions.eq("subId", billSlave.getSubServiceId()));	
						criteriaCompName.add(Restrictions.eq("deleted", "N"));
						List<SubServiceDto> listCompNames = (List<SubServiceDto>) criteriaCompName.list();
						for(SubServiceDto bojComp:listCompNames){
							
							compName=bojComp.getCategoryName();
						}
					}
					
					slave.setCompName(compName);
					listBillReceiptSlave.add(slave);
					slave=null;				
				}
				
				double totAmt = billRec.getTotalAmt();
				double totDisc = billRec.getActualTotConcn();
				
				// set receipt master 	
				BillReceiptMasterDTO billMaster=new BillReceiptMasterDTO();
				
				int recCount = getCurrentRecId("ehat_receipt_master",session,departId);
				billMaster.setReceiptCount(recCount);
				billMaster.setUnitId(unitId);
				billMaster.setTreatmentId(billDetailsDto.getTreatmentId());
				billMaster.setPatientId(patId);
				billMaster.setBillId(billId);				
				billMaster.setDepartmentId(departId);
				billMaster.setReceiptOf("general");				
				billMaster.setTotalAmt(totAmt-totDisc);				
				billMaster.setDiscGivenBy(billRec.getDiscGivenBy());
				billMaster.setDiscNarrtn(billRec.getDiscNarrtn());
				billMaster.setDiscRemark(billRec.getDiscRemark());
				billMaster.setTotalQty(billRec.getTotalQty());
				billMaster.setTotalPaid(billRec.getTotalPaid());								
				billMaster.setCreatedBy(billRec.getCreatedBy());
				billMaster.setCreatedDateTime(billRec.getCreatedDateTime());			
				billMaster.setDeleted("N");
				billMaster.setPayMode(billRec.getPayMode());
				billMaster.setbNumber(billRec.getbNumber());
				billMaster.setbName(billRec.getbName());
				billMaster.setBatchNumber("0");	
				billMaster.setSourceTypeId(0);
				billMaster.setSponsorCatId(0);
				
				// for profees
				billMaster.setActualAmt(totAmt);
				billMaster.setActualTotConcn(totDisc);
				if(totDisc>0){
					
					billMaster.setActualConPer((totDisc*100)/totAmt);
				}else{
					
					billMaster.setActualConPer(0);
				}
				
				billMaster.setActualPayable(totAmt-totDisc);
				billMaster.setActualDiscPer(billRec.getTotalDisc());
				
				double payable=0;
				double amt=0;
				if(billRec.getTotalDisc()>0){
					
					payable=totAmt-(totDisc+billRec.getFirstDisc());
					billMaster.setTotalDisc(billRec.getFirstDisc());
				}else{
					
					payable=(totAmt-totDisc);
					billMaster.setTotalDisc(0);
				}								
				billMaster.setPayable(payable);
				
				billMaster.setTotalRemain(payable-billRec.getTotalPaid());
				// for profees				
				
				if(billMaster.getTotalRemain()>0){
					
					billMaster.setReceiptStatus("unpaid");				
				}else{
					
					billMaster.setReceiptStatus("paid");
				}	
				
				billMaster.setFirstPaid(billRec.getTotalPaid());
				billMaster.setFirstDisc(billRec.getFirstDisc());
				billMaster.setFirstRemain(payable-billRec.getTotalPaid());		
				
				// Save Master list
				session.merge(billMaster);	
				
				// Get max master id
				Criteria criteriaMax = session.createCriteria(OtherBillReceiptMasterDTO.class).setProjection(Projections.max("billReceiptId"));
				Integer maxReceiptId = (Integer) criteriaMax.uniqueResult();
				if (maxReceiptId == null) {
			
					maxReceiptId = 0;
				}	
				
				// Save Slave list
				BillDaoImpl billObj = new BillDaoImpl();
				
				getSlaveList(maxReceiptId,billRec.getAgainstId(),listBillReceiptSlave,session,0);
				//billObj.setOpdRecMasterSlave(maxReceiptId,billRec.getAgainstId(),"paid",session);				
			}
		}catch(Exception ex){
			
			ex.printStackTrace();
		}		
		return 1;
	}
	
	public int getSlaveList(int maxId,int againstId,List<BillReceiptSlaveDTO> lstSlave,Session session,int chargesSlaveId){
		try{
			List<Integer> al=new ArrayList<Integer>();
			int billId=0,treatId=0;
			String docIds="";
			
			String sqlBill="select receipt_count FROM ehat_receipt_master where bill_receipt_id="+maxId;
			Query conQuery = session.createSQLQuery(sqlBill);		
			int receiptMasterCount = (Integer) conQuery.uniqueResult();
					
			for(BillReceiptSlaveDTO slave:lstSlave){
				
				int spsrId = slave.getSourceTypeId();
				if(spsrId == chargesSlaveId){
					
					slave.setBillReceiptMasterId(maxId);
					slave.setReceiptMasterCount(receiptMasterCount);
					al.add(slave.getBillDetailsId());
					session.merge(slave);		
				}						
				
				billId=slave.getBillId();
				treatId=slave.getTreatmentId();
				//docIds =slave.getDoctorId()+",";				
			}	
			
			if(againstId==0){	
			
				//doctor id in opd receipt master
				Criteria criteria = session.createCriteria(BillReceiptSlaveDTO.class);
				criteria.add(Restrictions.eq("treatmentId", treatId));
				criteria.add(Restrictions.eq("billId", billId));		
				criteria.add(Restrictions.eq("billReceiptMasterId", maxId));
				criteria.setProjection( Projections.distinct( Projections.property("doctorId")));			
				@SuppressWarnings("unchecked")
				List<Integer> listDocs = (List<Integer>) criteria.list();
				for(Integer id:listDocs){
					
					docIds=docIds+id+",";
				}
				
				String exactDoctIds=docIds.substring(0,docIds.length()-1);
				
				BillReceiptMasterDTO objMaster = (BillReceiptMasterDTO) session.get(BillReceiptMasterDTO.class, maxId);
				objMaster.setDoctorIds(exactDoctIds);
				//BillDetailsDto dto=new BillDetailsDto();
				
				/*for(int id:al){
					
					BillDetailsDto objectToUpdate = (BillDetailsDto) session.get(BillDetailsDto.class, id);
					objectToUpdate.setPaidFlag("Y");				
				}*/
			}
			
		}catch (Exception e) {
			
			e.printStackTrace();
			return 0;
		}				
		return 1;
	}
	
	public int getCurrentRecId(String tblName,Session session,Integer deptId){
		
		int maxId=0;
		
		try {
			
			String sqlRef="select ifnull(max(receipt_count),0) from "+tblName+" where department_id="+deptId;
			Query refQuery = session.createSQLQuery(sqlRef);
			maxId = ((Number)refQuery.uniqueResult()).intValue();
		}catch (Exception e) {
			
			e.printStackTrace();			
			return 0;
		}
		return (maxId+1);
	}
	
	@Override	
	//@author : Vinod Udawant @date: 13-April-2019 @reason : Add new consultant doctor
	public int addNewConsultantOpd(BillDetailsDto billDetailsDto,String queryType){
		int a = 0;
		try {
			BillDetailsDto billDetailsDtoSave = new BillDetailsDto();
			String conChargesQuery = "";
			String sql = "";
			int patId = billDetailsDto.getPatienttId();
			int treatId = billDetailsDto.getTreatmentId();
        	
			sql="select ifnull(doctor_id,'0') as doctor_id from ehat_treatment where treatment_id="+treatId;
			Query docIdList = sessionFactory.getCurrentSession().createSQLQuery(sql);
			String docIdListStr = (String) docIdList.uniqueResult();
						
			if (queryType.equalsIgnoreCase("delete")) {
				
				/*a = billDetailsDto.getBillDetailsId();
				// Code for delete
				billDetailsDto = (BillDetailsDto) sessionFactory.getCurrentSession().get(BillDetailsDto.class,billDetailsDto.getPatienttId());
				// Set values to coloumn to update
				billDetailsDto.setDeleted("Y");
				billDetailsDto.setDeletedBy(billDetailsDto.getCreatedBy());
				billDetailsDto.setDeletedDateTime(new Date(new java.util.Date().getTime()));*/
				
				sql="select bill_details_id FROM ehat_bill_details where deleted='N' and cancle ='N' and treatment_id ="+treatId+" and doctor_id="+billDetailsDto.getDoctorId();
				Query conQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				int billdetailId = (Integer) conQueryIpd.uniqueResult();
				
				sql= "UPDATE ehat_bill_details set deleted = 'Y',deleted_by = "+billDetailsDto.getCreatedBy()+",deleted_date_time = concat(curdate(), ' ', curtime()) WHERE bill_details_id ="+billdetailId;
				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();	
				
				String docIdListStrNew="";
				String[] ary = docIdListStr.split(",");
				for (int i = 0; i < ary.length; i++) {
					
					if(Integer.parseInt(ary[i]) != billDetailsDto.getDoctorId()){
						
						docIdListStrNew = docIdListStrNew + ary[i]+",";
					}
				}		
				
				sql = "UPDATE ehat_treatment set doctor_id ='"+docIdListStrNew.substring(0,docIdListStrNew.length()-1)+"' WHERE treatment_id ="+treatId;
				Query queryTreat = sessionFactory.getCurrentSession().createSQLQuery(sql);
				queryTreat.executeUpdate();	
				
			} else if (queryType.equalsIgnoreCase("insert")) {
					
				
				int sourceTypeId = 0;
				int billId = 0;
				int unitId = 0;
				int departmentId = 0;
				int sponsorId = 0;
				int chargesSlaveId = 0;
				
				
				if(docIdListStr.contains(String.valueOf(billDetailsDto.getDoctorId()))){
					
					a = -5;
				}else{				
				
					sql="select * from ehat_bill_master where treatment_id="+treatId;
					Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					billQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")			
					List<Map<String, Object>> listBillDetails = billQuery.list();
					for(Map<String, Object> row : listBillDetails){
						
						billId = (Integer)row.get("bill_id");
						chargesSlaveId = (Integer)row.get("charges_master_slave_id");
						sourceTypeId = (Integer)row.get("source_type_id");
						departmentId = (Integer)row.get("department_id");
						unitId = (Integer)row.get("unit_id");
						if(chargesSlaveId > 0){
							sponsorId = 1;
						}else{						
							sponsorId = 0;
						}					
					}
					
					billDetailsDtoSave.setPatienttId(patId);
					billDetailsDtoSave.setTreatmentId(treatId);
					billDetailsDtoSave.setBillId(billId);		
					billDetailsDtoSave.setUnitId(unitId);
					billDetailsDtoSave.setChargesSlaveId(chargesSlaveId);
					billDetailsDtoSave.setSourceTypeId(sourceTypeId);
					billDetailsDtoSave.setSponsorId(sponsorId);
					billDetailsDtoSave.setDepartmentId(departmentId);
					billDetailsDtoSave.setPaidFlag("N");
					billDetailsDtoSave.setDoctorId(billDetailsDto.getDoctorId());				
					billDetailsDtoSave.setCreatedBy(billDetailsDto.getCreatedBy());
					billDetailsDtoSave.setCreatedDateTime(new Date(new java.util.Date().getTime()));
					
					int hallslave_id = 0;
					if(departmentId == 1){
						
						hallslave_id = -1;
					}else if(departmentId == 3){
						
						hallslave_id = -3;
					}
					
					String doctorIdList = String.valueOf(billDetailsDto.getDoctorId());
					if (masterConfigAccess(billDetailsDtoSave.getUnitId(),billDetailsDtoSave.getDepartmentId(), 2)) {
						if (!doctorIdList.equalsIgnoreCase("") && !doctorIdList.equalsIgnoreCase(null)) {
							//String[] ary = doctorIdList.split(",");
							//ary[0] = doctorIdList;
							for (int i = 0; i < 1; i++) {
								
								int docId = billDetailsDto.getDoctorId();//Integer.parseInt(ary[i]);
								
								String subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and deleted='N' limit 1";
								
								// query to fetch consultation charges of the doctor
								//conChargesQuery ="SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
								if (chargesSlaveId > 0) {
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
					    	    	
				    	    	}else{
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
				    	    	}
								
								if (queryType.equalsIgnoreCase("markvisit")) {
									//fetch doctor_followup_days from hospital table
									Query q3 = sessionFactory.getCurrentSession().createSQLQuery(
													"SELECT doctor_followup_days as doctor_followup_days FROM hospital");
									Integer doctorFollowupDays = (Integer) q3.uniqueResult();
									
									//fetch last treatment date
									Query q25 = sessionFactory.getCurrentSession().createSQLQuery(
											"SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+billDetailsDto.getPatienttId()+" AND t_flag = 'N' > 0)"
												       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+billDetailsDto.getPatienttId()
												       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ");
												
									Date lastTreatmentDate = (Date) q25.uniqueResult();
									
									//calculate difference between last treatment and current treatment
									long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
									
									//if diff is less than or equals followup days then apply followup charges
									if(differenceDays <= doctorFollowupDays){
										SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
							    	    String currentDay = dayFormatter.format(currentDate.getTime());
							    	   
							    	    if(currentDay.equalsIgnoreCase("Sun")){//only for shraddha
							    	    	
							    	    	if (chargesSlaveId > 0) {
							    	    		
							    	    		conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
								    	    	
							    	    	}else{
							    	    		
							    	    		conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";
								    	    }
							    	    	
							    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekEnd' and deleted='N' limit 1";
							    	    }else{
							    	    	
							    	    	if (chargesSlaveId > 0) {
							    	    		
							    	    		conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
								    	    	
							    	    	}else{
							    	    		
							    	    		conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
							    	    	}
							    	    	subServQueryForId = "SELECT id FROM ehat_subservice where service_id=2 and category_name ='Followup Charges WeekDay' and deleted='N' limit 1";
	
							    	    }
									}								
								}
								
								SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
					    	    String currentDay = dayFormatter.format(currentDate.getTime());
					    	    
					    	    if(currentDay.equalsIgnoreCase("Sun")){
					    	    	
					    	    	if (chargesSlaveId > 0) {
					    	    		
					    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
						    	    	
					    	    	}else{
					    	    		
					    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
					    	    	}
					    	    }				    	    
								
								double constCharges = 0;
								String sqlC = "";
								if (chargesSlaveId > 0) {
									
									sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
								}else{
									
									sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";
								}
								
								Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlC);
								int countDr = ((Number)refQuery.uniqueResult()).intValue();
								
								if(countDr > 0){
									
									Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
									constCharges = (Double) q1.uniqueResult();
								}else{
									
									constCharges = 0; 
								}	
								// added by vinod
															
								Query q2 = sessionFactory.getCurrentSession().createSQLQuery(subServQueryForId);
								Integer subServIdConcsultaion = (Integer) q2.uniqueResult();
	
								//check for holiday=today?
								Query qCount = sessionFactory.getCurrentSession().createSQLQuery("select count(*) from hospital_holiday where date="+todays_date4);
								Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
								
								//check for sunday today?
								if(countHoliday > 0 || chkEmergencyTime()){
					    	    	
					    	    	//fetch emergency percentage
					    	    	double emrChrPer = getEmergencyPer();				    	    	
					    	    	constCharges = constCharges *(1+emrChrPer/100);
					    	    }
					    	    
								billDetailsDtoSave.setRate(constCharges);
								billDetailsDtoSave.setQuantity(1);
								billDetailsDtoSave.setAmount(constCharges * 1);
								billDetailsDtoSave.setServiceId(2);
								
								// doctor
								billDetailsDtoSave.setSubServiceId(subServIdConcsultaion);
								billDetailsDtoSave.setOtherAmount(constCharges * 1);
								billDetailsDtoSave.setOtherRate(constCharges);
								billDetailsDtoSave.setOtherPay(constCharges * 1);
								billDetailsDtoSave.setCoPay(constCharges);							
								
								// Entry in database opd bill table for consultation
								sessionFactory.getCurrentSession().merge(billDetailsDtoSave);							
	
								docIdListStr = docIdListStr + "," + docId;								
								sql = "UPDATE ehat_treatment set doctor_id ='"+docIdListStr+"' WHERE treatment_id ="+treatId;
								Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
								query.executeUpdate();								

								a = maxCountOfColumn(BillDetailsDto.class, "billDetailsId");
							}
						}					
					}			
				}
			} 			

		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
		}
		// returning bill_Id
		return a;
	}	
	
	//@author : Vinod Udawant @date: 04-May-2019 @reason : Get appointment type
	@Override
	public String getAppointmentType(int appId){
	
		String appType = "";
		try{
			
			String sql="select regType FROM appointment where status='Y' and Appt_ID="+appId;
			Query appTypeQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			appType = (String) appTypeQuery.uniqueResult();		
			
		}catch(Exception e){
			
			e.printStackTrace();
		}	
		return appType;
	}

	//@author : Vinod Udawant @date: 13-April-2019 @reason : Add new consultant doctor
	@Override
	public DoctorWisePatientsCountDto getDoctorWisePatientCount(String callFrom,Integer deptId,Integer unitId,Integer userId){
		
		DoctorWisePatientsCountDto objDto = new DoctorWisePatientsCountDto();
		List<DoctorWisePatientsCountDto> lstPatientCount = new ArrayList<DoctorWisePatientsCountDto>();
		try{ 
			
			String sql="select distinct ifnull(doctor_id,0) as doctor_id from ehat_treatment where t_flag = 'Y' and deleted = 'N' and department_id = 1";
			Query docIdsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			docIdsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")			
			List<Map<String, Object>> listBillDetails = docIdsQuery.list();
			for(Map<String, Object> row : listBillDetails){
				
				String docId = (String)row.get("doctor_id");
				if(!(docId.equals("") || docId.equals("null") || docId.equals(null))){
					
					sql="select ifnull(doc_name,'-') from doctor where status='Y' and Doctor_ID ="+docId;
					Query docNameQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					String docName =  (String) docNameQuery.uniqueResult();
					
					sql="select count(treatment_id) from ehat_treatment where t_flag = 'Y' and department_id = 1 and doctor_id ="+docId;
					Query appTypeQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					int patientCount = ((Number)appTypeQuery.uniqueResult()).intValue();
					
					DoctorWisePatientsCountDto obj = new DoctorWisePatientsCountDto();
					obj.setDoctorId(Integer.parseInt(docId));
					obj.setDocName(docName);
					obj.setPatientCount(patientCount);
					lstPatientCount.add(obj);
					objDto.setLstPatientCount(lstPatientCount);
				}								
			}
			
		}catch (Exception e) {
			
			e.printStackTrace();
		}
		return objDto;
	}

	@Override
	public List<ChargesMasterSlave> fetchPatientsBedRecords1(Integer treatmentId) {
		
		System.err.println("helloooo");
		List<ChargesMasterSlave> ltPatientBedRecord = new ArrayList<ChargesMasterSlave>();
		
		 String sql="select c.category_name AS Hname,(select category_name from ehat_charges_master_slave where id=c.selfId) AS `hall_type_name`"
				 	+"from treatment_beds tb,beds b,ehat_charges_master_slave c "
                    +"where tb.Bed_ID = b.Bed_ID and c.id = b.Hall_ID and tb.Treatment_ID ='"+treatmentId+"' order by tb.ID desc";
		 Query bedDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
		 bedDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		 
		 @SuppressWarnings("unchecked")
		List<Map<String, Object>> listBedDetails = bedDetails.list();
			for(Map<String, Object> row : listBedDetails){
				ChargesMasterSlave objData=new ChargesMasterSlave();
				objData.setCategoryName((String)row.get("Hname"));
				objData.setCategoryName((String)row.get("hall_type_name"));			
				ltPatientBedRecord.add(objData);
			}
			return ltPatientBedRecord;
	
	}

	//@author :Vishant Pawar@Date :17-01-2024@Code :To fetch records of Admission report
	@Override
	@Transactional
	public List<AdmissionReportSiddhiDTO> fetchAdmissionReportSiddhivinayak(Date fromDate, Date toDate, Integer doctorId,
			Integer refDocId, Integer caseTypeId, Integer mediclaimType,Integer chargesId, Integer chargesSlaveId) {
		List<AdmissionReportSiddhiDTO> listAdmsnReportDto = null;
		try {
						
			
			//sp_opd_diagnostic_report
			SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery("call sp_get_admission_report_siddhivinayak(:unitId,:fDate,:tDate)");
			createSQLQuery.setParameter("unitId", 1);
			
			createSQLQuery.setParameter("fDate", fromDate);
			createSQLQuery.setParameter("tDate", toDate);
					createSQLQuery.setResultTransformer(
							Transformers.aliasToBean(AdmissionReportSiddhiDTO.class)); 
			//qExe.setParameter("fromDate", fromDate);
			//qExe.setParameter("toDate", toDate);
					if (chargesSlaveId > 0) {
						listAdmsnReportDto = (List<AdmissionReportSiddhiDTO>) createSQLQuery.list().stream()
					            .filter(dto -> dto instanceof AdmissionReportSiddhiDTO && chargesSlaveId.equals(((AdmissionReportSiddhiDTO) dto).getSchemeID()))
					            .collect(Collectors.toList());
					} else {
					    listAdmsnReportDto = createSQLQuery.list();
					}
			
			
			

						
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
					
		}
		return listAdmsnReportDto;
	}

	/*******************************************************************************
	 * @author Rahul Patil
	 * @date 13-feb-2024
	 * @Code for getSorceDoc
	 ******************************************************************************/
	@Override
	@Transactional
	public DoctorDto getSourceDoctor(String isSourceType) {
		DoctorDto doctor = new DoctorDto();
		try {
			Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
			createCriteria.add(Restrictions.eq("status", "Y"));
		//	createCriteria.add(Restrictions.not(Restrictions.in("doc_Type", new String[]{"PRO", "Phlebotomist"})));
			createCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			List<DoctorDto> list = createCriteria.list();
			
			//Added by Tushar Jadhav for getting "PRO" && "Phlebo" Doctype
			if(isSourceType.equalsIgnoreCase("PRO") || isSourceType.equalsIgnoreCase("Phlebotomist"))
			{
				List<DoctorDto> doctorDtoList = list.stream()
	            .filter(dto -> dto instanceof DoctorDto && isSourceType.equals(((DoctorDto) dto).getDoc_Type()))
	            .collect(Collectors.toList());
				
					list.clear();
			        list.addAll(doctorDtoList);
			}
			doctor.setLstDoctorDto(list);
			System.out.println(doctor);
			return doctor;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return doctor;
	}
	
	
	@Override
	public ChargesMasterSlave fetchSponsorRecordsRegMaster(Integer chargesMasterDto) {

		ChargesMasterSlave objReg = new ChargesMasterSlave();
		
		
		try {
			/*List<ChargesMasterSlave> ltCMSlave = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChargesMasterSlave.class);
			criteria.add(Restrictions.eq("chargesMasterDto",chargesMasterDto)); //temp static values are given
			criteria.add(Restrictions.eq("isCategory","N"));
			criteria.add(Restrictions.eq("deleted","N"));
				//criteria.setMaxResults(10);
				ltCMSlave = criteria.list();
				objReg.setLstChargesSlave(ltCMSlave);*/
			
			//Query querySp =  sessionFactory.getCurrentSession().createSQLQuery("select   id as slaveId, category_name as categoryName from ehat_charges_master_slave where charges_master_id="+chargesMasterDto+" and isCategory='N' and deleted='N'  ");
			      //updated by Rohini 
			Query querySp =  sessionFactory.getCurrentSession().createSQLQuery("select   id as slaveId, category_name as categoryName from ehat_charges_master_slave where charges_master_id="+chargesMasterDto+" and isCategory='Y' and deleted='N' and selfId = 0  ");
			querySp.setResultTransformer(new AliasToBeanResultTransformer(ChargesMasterSlave.class));
			
			@SuppressWarnings("unchecked")
			List<ChargesMasterSlave> ltCMSlave = querySp.list();		
			objReg.setLstChargesSlave(ltCMSlave);
			
			} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
		
		
		
		return objReg;
	}
	
}
