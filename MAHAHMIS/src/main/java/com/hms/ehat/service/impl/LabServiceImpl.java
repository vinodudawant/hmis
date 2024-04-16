package com.hms.ehat.service.impl;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.codehaus.groovy.tools.shell.ParseCode;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.constants.MsSqlServerConnection;
import com.hms.dto.LabProfile;
import com.hms.dto.LabProfileTestComp;
import com.hms.dto.Labheadings;
import com.hms.dto.pathologistDto;
import com.hms.ehat.dao.GenericDao;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.EhatOtherBillDetailForIpdDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.ITABLE;
import com.hms.ehat.dto.LabRequestDTO;
import com.hms.ehat.dto.LabRequestSlaveDTO;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.ehat.dto.LabSlavePojo;
import com.hms.ehat.dto.LabTestResultDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.AutosuggestionService;
import com.hms.ehat.service.LabService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.ApplicationContextUtils;

@Service
public class LabServiceImpl implements LabService{
	
	@Autowired
	SessionFactory sessionFactory;
	@Autowired
	GenericDao genericDao;

	//checking what lab heading id configured in properties file
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String sid = (String)resourceBundleEhat.getString("labHeadingID");
	String pkgID = (String)resourceBundleEhat.getString("packageID");
	
	int packageID = Integer.parseInt(pkgID);
	int serviceId = Integer.parseInt(sid);
	String sendToItable = (String)resourceBundleEhat.getString("sendToItable");
	String pathologyManagement = (String)resourceBundleEhat.getString("pathologyManagement");
	String currentRec = (String)resourceBundleEhat.getString("currentRec");
	String LabMachineFlow = (String)resourceBundleEhat.getString("LabMachineFlow");
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public int sendToLab(int patientId, int treatmentId, String subList,
			int deptId, HttpServletRequest request) {
		//List<ConfigurServicesDto> listSubSerId=null;
		List<EhatOtherBillDetailForOpdDto> listOpdSubSerId=null;
		List<EhatOtherBillDetailForIpdDto> listIpdSubSerId=null;
		//getting patient object
		RegistrationDto patientPojo = (RegistrationDto) genericDao.getOneObject(RegistrationDto.class, patientId);
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		Calendar calendar = Calendar.getInstance();
		//Getting object of LabRequestDTO to genereate requivision number
		LabRequestDTO  labReq = new LabRequestDTO();
		//setting values
		labReq.setInsertedBy(userId);
		labReq.setInsertedDatetime(calendar);
		labReq.setDeptId(deptId);
		labReq.setPatientId(patientId);
		labReq.setTreatmentId(treatmentId);
		labReq.setUnitId(unitId);
		//Added by Laxman for test_status.
		labReq.setTestStatus(currentRec);
		LabSlavePojo labSlvpo =  (LabSlavePojo) ConfigUIJSONUtility.getObjectFromJSON(subList,LabSlavePojo.class);	
		
		//Call for Test Duplicates validation. 
		int result = TestValidataion(labSlvpo,deptId,treatmentId);
		
		if(result<0){
			return result;
		}
		
		//Saving LabRequest pojo
		int labReqId = genericDao.saveObject(labReq);
		//Jsong string formate subList variable 
		//LabSlavePojo labSlvpo =  (LabSlavePojo) ConfigUIJSONUtility.getObjectFromJSON(subList,LabSlavePojo.class);	
		for (LabSlavePojo lpojo : labSlvpo.getSubSrvList()) {
			
			//Call method for update in billdetails sendtolab flag.
			result = updateSndFlagBillDetails(lpojo,deptId);
			
			//if service id equal to service id configured in porperties then it will send to lab
			if (lpojo.getServiceId()==serviceId) {
				//Dynamically getting coulmn value of any perticular pojo
				String code = genericDao.getStringValOfObject("ehat_subservice", "code_name", lpojo.getSubSrvid(), "id");
				
				LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
				labReqtSlv.setLabRequestId(labReqId);
				labReqtSlv.setBillDetailsID(lpojo.getBilDetId());
				labReqtSlv.setServiceId(lpojo.getServiceId());
				labReqtSlv.setSubServiceId(lpojo.getSubSrvid());
				labReqtSlv.setLabTestCode(code);
				labReqtSlv.setRefDocId(lpojo.getRefDocId());
				labReqtSlv.setDeptId(deptId);
				//Insert value in lab slave
				int labReqslvid = genericDao.saveObject(labReqtSlv);
				labReqtSlv.setLabReqSlvId(labReqslvid);
				
				if (LabMachineFlow.equalsIgnoreCase("on")) {
					//Call saveLabTestData().
					int res = saveLabTestData(labReq,labReqtSlv,labReqId,labReqslvid);
						if(res==0){
							return -4;
						}
				}
				//if variable contian value on then : insert into i_table
				if (sendToItable.equalsIgnoreCase("on")) {
					//If pathologyManagement flow is on then don't call inertInITable();
					if(!pathologyManagement.equalsIgnoreCase("on")){
					int iTableId= inertInITable(labReqtSlv,treatmentId,calendar,deptId,patientPojo);
					}
				}
				
			}//if end service id check
			else if(lpojo.getServiceId()==packageID){//Added by Laxman for Packages.
				
				try{
					if(deptId==2){
						
						Criteria criteriaSubSerId= sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForIpdDto.class);
						criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
						criteriaSubSerId.add(Restrictions.eq("subServiceId", lpojo.getSubSrvid()));
						criteriaSubSerId.add(Restrictions.eq("childServiceId",serviceId));
						criteriaSubSerId.add(Restrictions.eq("treatmentId",treatmentId));
						criteriaSubSerId.add(Restrictions.eq("billDetailsId",lpojo.getBilDetId()));
						criteriaSubSerId.add(Restrictions.eq("departmentId",deptId));
						criteriaSubSerId.add(Restrictions.eq("cancle","N"));
						criteriaSubSerId.add(Restrictions.eq("deleted","N"));
						//criteriaSubSerId.setProjection(Projections.projectionList().add(Projections.property("childSubServiceId"), "childSubServiceId"));
						//criteriaSubSerId.setResultTransformer(Transformers.aliasToBean(EhatOtherBillDetailForIpdDto.class));
						
						listIpdSubSerId = criteriaSubSerId.list();
					
					for(EhatOtherBillDetailForIpdDto objOthIpd:listIpdSubSerId)
					{
						//set profile/subserviceId to Labslavepojo.
						String code = genericDao.getStringValOfObject("ehat_subservice", "code_name", objOthIpd.getChildSubServiceId(), "id");
						LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
						labReqtSlv.setLabRequestId(labReqId);
						labReqtSlv.setBillDetailsID(lpojo.getBilDetId());
						labReqtSlv.setServiceId(lpojo.getServiceId());
						labReqtSlv.setSubServiceId(objOthIpd.getChildSubServiceId());
						labReqtSlv.setLabTestCode(code);
						labReqtSlv.setRefDocId(objOthIpd.getDoctorId());
						
						labReqtSlv.setPackageId(lpojo.getSubSrvid());
						labReqtSlv.setIsPackageFlag("Y");
						labReqtSlv.setDeptId(deptId);
						//Insert value in lab slave
						int labReqslvid = genericDao.saveObject(labReqtSlv);
						labReqtSlv.setLabReqSlvId(labReqslvid);
						
						if (LabMachineFlow.equalsIgnoreCase("on")) {
							//Call saveLabTestData().
							int res = saveLabTestData(labReq,labReqtSlv,labReqId,labReqslvid);
								if(res==0){
									return -4;
								}
						}
						//if variable contian value on then : insert into i_table
						if (sendToItable.equalsIgnoreCase("on")) {
							//If pathologyManagement flow is on then don't call inertInITable();
							if(!pathologyManagement.equalsIgnoreCase("on")){
							int iTableId= inertInITable(labReqtSlv,treatmentId,calendar,deptId,patientPojo);
							}
						}
					}
						
					}else{
							Criteria criteriaSubSerId= sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForOpdDto.class);
							criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
							criteriaSubSerId.add(Restrictions.eq("subServiceId", lpojo.getSubSrvid()));
							criteriaSubSerId.add(Restrictions.eq("childServiceId",serviceId));
							criteriaSubSerId.add(Restrictions.eq("treatmentId",treatmentId));
							criteriaSubSerId.add(Restrictions.eq("billDetailsId",lpojo.getBilDetId()));
							criteriaSubSerId.add(Restrictions.eq("departmentId",deptId));
							criteriaSubSerId.add(Restrictions.eq("cancle","N"));
							criteriaSubSerId.add(Restrictions.eq("deleted","N"));
							//criteriaSubSerId.setProjection(Projections.projectionList().add(Projections.property("childSubServiceId"), "childSubServiceId"));
							//criteriaSubSerId.setResultTransformer(Transformers.aliasToBean(EhatOtherBillDetailForOpdDto.class));
							
							listOpdSubSerId = criteriaSubSerId.list();
						
						for(EhatOtherBillDetailForOpdDto objOthOpd:listOpdSubSerId)
						{
							//set profile/subserviceId to Labslavepojo.
							String code = genericDao.getStringValOfObject("ehat_subservice", "code_name", objOthOpd.getChildSubServiceId(), "id");
							LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
							labReqtSlv.setLabRequestId(labReqId);
							labReqtSlv.setBillDetailsID(lpojo.getBilDetId());
							labReqtSlv.setServiceId(lpojo.getServiceId());
							labReqtSlv.setSubServiceId(objOthOpd.getChildSubServiceId());
							labReqtSlv.setLabTestCode(code);
							labReqtSlv.setRefDocId(objOthOpd.getDoctorId());
							
							labReqtSlv.setPackageId(lpojo.getSubSrvid());
							labReqtSlv.setIsPackageFlag("Y");
							labReqtSlv.setDeptId(deptId);
							//Insert value in lab slave
							int labReqslvid = genericDao.saveObject(labReqtSlv);
							labReqtSlv.setLabReqSlvId(labReqslvid);
							
							if (LabMachineFlow.equalsIgnoreCase("on")) {
								//Call saveLabTestData().
								int res = saveLabTestData(labReq,labReqtSlv,labReqId,labReqslvid);
									if(res==0){
										return -4;
									}
							}
							
							//if variable contian value on then : insert into i_table
							if (sendToItable.equalsIgnoreCase("on")) {
								//If pathologyManagement flow is on then don't call inertInITable();
								if(!pathologyManagement.equalsIgnoreCase("on")){
								int iTableId= inertInITable(labReqtSlv,treatmentId,calendar,deptId,patientPojo);
								}
							}
						}
						
					/*//Call for getting sponsor and general patient perticular service in Package. 
					listSubSerId=checkPackageConfiguration(lpojo,deptId,lpojo.getSubSrvid(),treatmentId);
					
					//For getting profile Id under Package.
					for(ConfigurServicesDto objCon:listSubSerId){
						//set profile/subserviceId to Labslavepojo.
						lpojo.setSubSrvid(objCon.getServiceId());
						String code = genericDao.getStringValOfObject("ehat_subservice", "code_name", lpojo.getSubSrvid(), "id");
						LabRequestSlaveDTO labReqtSlv = new LabRequestSlaveDTO();
						labReqtSlv.setLabRequestId(labReqId);
						labReqtSlv.setBillDetailsID(lpojo.getBilDetId());
						labReqtSlv.setServiceId(lpojo.getServiceId());
						labReqtSlv.setSubServiceId(lpojo.getSubSrvid());
						labReqtSlv.setLabTestCode(code);
						labReqtSlv.setRefDocId(lpojo.getRefDocId());
						
						labReqtSlv.setPackageId(packageId);
						labReqtSlv.setIsPackageFlag("Y");
						labReqtSlv.setDeptId(deptId);
						//Insert value in lab slave
						int labReqslvid = genericDao.saveObject(labReqtSlv);
						labReqtSlv.setLabReqSlvId(labReqslvid);
						
						//if variable contian value on then : insert into i_table
						if (sendToItable.equalsIgnoreCase("on")) {
							//If pathologyManagement flow is on then don't call inertInITable();
							if(!pathologyManagement.equalsIgnoreCase("on")){
							int iTableId= inertInITable(labReqtSlv,treatmentId,calendar,deptId,patientPojo);
							}
						}*/
					}
				}catch (Exception e) {
					e.printStackTrace();
				}
			}
				
		}//foreach end of LabSlavePojo
		
		return labReqId;
	} 
	
	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 06-March-2018
	 * @code For update in billdetails sendtolab flag.
	 ***/
	private int updateSndFlagBillDetails(LabSlavePojo lpojo, int deptId) {
		String sql="";
		int response=0;
		try{
		if(deptId==2){//for ipd bill
			sql="update ehat_bill_details_ipd set sndtolabflag='Y' where bill_details_id='"+lpojo.getBilDetId()+"'";
			Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
			response = updateSql.executeUpdate();
		}else if(deptId==1 || deptId==3){//for opd and diagno bill.
			sql="update ehat_bill_details set sndtolabflag='Y' where bill_details_id='"+lpojo.getBilDetId()+"'";
			Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
			response = updateSql.executeUpdate();
		}
		}catch(Exception e){
			 e.printStackTrace();
			 return response;
		 }
		return response;
	}
	
	/**
	 * @author Laxman Nikam
	 * @param deptId 
	 * @throws ParseException 
	 * @date 07-March-2018
	 * @code For check Teat already send to Lab or not.
	 ***/
	@SuppressWarnings("unchecked")
	private int TestValidataion(LabSlavePojo labSlvpo, int deptId, int treatmentId) {
		List<Integer> occuranceList = new ArrayList<Integer>();
		//List<ConfigurServicesDto> listSubSerId=null;
		List<EhatOtherBillDetailForOpdDto> listOpdSubSerId=null;
		List<EhatOtherBillDetailForIpdDto> listIpdSubSerId=null;
		for (LabSlavePojo lpojo : labSlvpo.getSubSrvList()) {
			//Check test are udnder pathology or not.
			if(lpojo.getServiceId()!=packageID && lpojo.getServiceId()!=serviceId)
			{
				return -3;
			}
			
			//for check same test not send to lab again.
			String chkBillIdqry="select  count(*) from ehat_lab_request_slave where bill_details_id='"+lpojo.getBilDetId()+"' and dept_id='"+deptId+"'";
			int cnt = ((BigInteger)sessionFactory.getCurrentSession().createSQLQuery(chkBillIdqry).uniqueResult()).intValue();
			
			if(cnt>0){
				return -1;
			}
			
			if(lpojo.getServiceId()==packageID){//for Packages.
				/*
				//Call for getting sponsor and general patient perticular service in Package. 
				listSubSerId=checkPackageConfiguration(lpojo,deptId,packageId,treatmentId);
				//For getting profile Id under Package.
				for(ConfigurServicesDto objCon:listSubSerId){
					//set profile/subserviceId to Labslavepojo.
					occuranceList.add(objCon.getServiceId());
				}*/
				
				
					if(deptId==2){
					
					try{
					Criteria criteriaSubSerId= sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForIpdDto.class);
					criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
					criteriaSubSerId.add(Restrictions.eq("subServiceId", lpojo.getSubSrvid()));
					criteriaSubSerId.add(Restrictions.eq("childServiceId",serviceId));
					criteriaSubSerId.add(Restrictions.eq("treatmentId",treatmentId));
					criteriaSubSerId.add(Restrictions.eq("billDetailsId",lpojo.getBilDetId()));
					criteriaSubSerId.add(Restrictions.eq("departmentId",deptId));
					criteriaSubSerId.add(Restrictions.eq("cancle","N"));
					criteriaSubSerId.add(Restrictions.eq("deleted","N"));
					criteriaSubSerId.setProjection(Projections.projectionList().add(Projections.property("childSubServiceId"), "childSubServiceId"));
					criteriaSubSerId.setResultTransformer(Transformers.aliasToBean(EhatOtherBillDetailForIpdDto.class));
					
					listIpdSubSerId = criteriaSubSerId.list();
					}catch (Exception e) {
						e.printStackTrace();
					}
				
					for(EhatOtherBillDetailForIpdDto objOthIpd:listIpdSubSerId)
					{
						occuranceList.add(objOthIpd.getChildSubServiceId());
					}
					
				}else{
					
					try{
					Criteria criteriaSubSerId= sessionFactory.getCurrentSession().createCriteria(EhatOtherBillDetailForOpdDto.class);
					criteriaSubSerId.add(Restrictions.eq("serviceId", packageID));
					criteriaSubSerId.add(Restrictions.eq("subServiceId", lpojo.getSubSrvid()));
					criteriaSubSerId.add(Restrictions.eq("childServiceId",serviceId));
					criteriaSubSerId.add(Restrictions.eq("treatmentId",treatmentId));
					criteriaSubSerId.add(Restrictions.eq("billDetailsId",lpojo.getBilDetId()));
					criteriaSubSerId.add(Restrictions.eq("departmentId",deptId));
					criteriaSubSerId.add(Restrictions.eq("cancle","N"));
					criteriaSubSerId.add(Restrictions.eq("deleted","N"));
					criteriaSubSerId.setProjection(Projections.projectionList().add(Projections.property("childSubServiceId"), "childSubServiceId"));
					criteriaSubSerId.setResultTransformer(Transformers.aliasToBean(EhatOtherBillDetailForOpdDto.class));
					
					listOpdSubSerId = criteriaSubSerId.list();
					}catch (Exception e) {
						e.printStackTrace();
					}
				
					for(EhatOtherBillDetailForOpdDto objOthOpd:listOpdSubSerId)
					{
						occuranceList.add(objOthOpd.getChildSubServiceId());
					}
				
				}
				Set<Integer> dupes = new HashSet<Integer>();
				for (Integer i : occuranceList) {
		            if (!dupes.add(i)) {
		                System.err.println("Duplicate element in array is : " + i);
		                return -2;
		            }
		        }
			}else if(lpojo.getServiceId()==serviceId){
					
				//set profile/subserviceId to Labslavepojo.
					occuranceList.add(lpojo.getSubSrvid());
				
				Set<Integer> dupes = new HashSet<Integer>();
				for (Integer i : occuranceList) {
		            if (!dupes.add(i)) {
		                System.err.println("Duplicate element in array is : " + i);
		                return -2;
		            }
		        }
			}
		}
		return 1;
	}
	/***********
	 * @author	: Touheed Khan
	 * @date	: 30-Aug-2017
	 * @see		: Inserting in Itable 
	 */
	private int inertInITable(LabRequestSlaveDTO labReqtSlv, Integer treatmentId,
							Calendar calendar,Integer deptId,RegistrationDto patientPojo) {
		int id =0;
		//getting subService name to store in i_table       ehat_subservice
		String subSrvNmae= genericDao.getStringValOfObject("ehat_subservice", "category_name", labReqtSlv.getSubServiceId(), "id");
		
		//Saving object in wrapper class because 3rd party lab software wants every thing in varchar(Strring)
		Integer refVistNo	= labReqtSlv.getLabRequestId();
		Integer labNo		= labReqtSlv.getLabReqSlvId();
		Integer page		= patientPojo.getAge();
		Integer pid			= patientPojo.getPatientId();
		
		ITABLE itable = new ITABLE();
		//setting requarid value
		itable.setIpOpFlag( (deptId==2)?"I":"O");
		itable.setPinNo(treatmentId.toString());
		itable.setRefVisitno(refVistNo.toString());
		itable.setAdmissionno(pid.toString());
		itable.setReqDateTime(calendar);
		itable.setTestProfCode(labReqtSlv.getLabTestCode());
		itable.setPackageName(subSrvNmae);
		itable.setPatFname(patientPojo.getfName());
		itable.setPatMname(patientPojo.getmName());
		itable.setPatLname(patientPojo.getlName());
		itable.setPatDob(patientPojo.getDob());
		itable.setGender(patientPojo.getGender());
		itable.setPatAge(page.toString());
		itable.setPatYears(patientPojo.getAge());
		itable.setPatMonths(patientPojo.getAgeMonths());
		itable.setPatDays(patientPojo.getAgeDays());
		itable.setPatMobile(patientPojo.getMobile());
		itable.setTitle(patientPojo.getPrefix());
		itable.setLabNo(labNo);
		
		id = genericDao.saveObjectForCompositeKey(itable);
		int sent = sendToLabSoft(itable);
		return id;
	}
	
	private int sendToLabSoft(ITABLE itable) {
		Connection con=null;
		 try {
			 Calendar cal = Calendar.getInstance(); 
			 java.sql.Timestamp timestamp = new Timestamp(cal.getTimeInMillis());
				 con = MsSqlServerConnection
						.getConnection();
				if (con != null) {
					System.err.println("Service Impl========================>Connection Done   :)");
					


					Statement sta = con
							.createStatement();

					sta.executeUpdate(" INSERT INTO [dbo].[HISLIS_TABLE] ( " 
					+ "[IPOPFlag],[IPOPNO],[ORDERNO],[ADMISSIONNO],"
					+ "[ORDERDATE],[PROCESSED],[Title],[PATFNAME],"
					+ "[PATMNAME],[PATLNAME],[PAT_DOB] ,[PATAGE],"
					+ "[AgeUNIT],[Gender],[Mobile],"
					//+ "[BED_NO],[BED_ROOM_NO],[Wing_code],[Ward_code],"
					+ "[Doc_Name],[Servicecode],[ServiceName]"
				//	+ "[PRIORITY],[DiagnosisCode],[CENCODE],[CENNAME],"
				//	+ "[Nationality],[Adddate],[RATE],[BILLINGFLAG],"
				//  + "[Billingdate],[LISReadDate],[ServiceOrderNO]," 
					+ ")"

					+ " VALUES ('"
					+ itable.getIpOpFlag()+ "' ,'"+ itable.getPinNo()+ "','"+ itable.getRefVisitno()+ "','"+ itable.getAdmissionno()+ "' ,"+ " '"
					+ timestamp+ "', 'N','"+itable.getTitle()+"' ,'"+itable.getPatFname()+"' ,'"
					+ itable.getPatMname()+ "' ,"+ " '"+ itable.getPatLname()+ "','"+ itable.getPatDob()+ "' ,'"+ itable.getPatAge()+ "' ,'"
					+ itable.getPatYears()+ "' ,"+ " 'M' ,'"+itable.getPatMobile()+"', "
					//+ bedNo+ "' ,'0' ,'0' ,'0' ,"+ " '"
					+ " '-' ,"+ " '"+itable.getTestProfCode()+"' ,'"+ itable.getPackageName()+ "' "
					//+ docName+ "','"+ title+ "', "+ " '"+ todays_date+ "', '"+ userid+ "',  "+ " '"
					//+ mob
					+ " )");
				
				}
				con.close();
				return 1;
		 }catch(Exception e){
			 e.printStackTrace();
			 return -1;
		 }
		
		
	}
	@Override
	@Transactional
	public String getStringValOfObject(String tableName, String columnName,
			int pkId, String pkColumn) {
		String code = genericDao.getStringValOfObject(tableName, columnName, pkId, pkColumn);
		if (code == null) {
			code= "0";
		}
		return code;
	}
	
	@Override
	@Transactional
	public int saveLabTestResult(LabTestResultDto labResultDto, HttpServletRequest request) {
		int response=0;
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		for(int i = 0; i < labResultDto.getListLabResultDto().size(); i++){
			//create new Dto obj. 
			LabTestResultDto labResultDtoObj=labResultDto.getListLabResultDto().get(i);
			
			/*String strReplace=labResultDtoObj.getTestResult().replaceAll(" ", "+");
			
			labResultDtoObj.setTestResult(strReplace);*/
			
			//System.out.println(labResultDtoObj);
			
			if(labResultDtoObj.getLabResultId()==0){
				labResultDtoObj.setInsertedBy(userId);
				labResultDtoObj.setDeleteFlag("N");
				labResultDtoObj.setInsertedDatetime(new Date(new java.util.Date().getTime()));
				//Call generic save method.
				response = genericDao.saveObject(labResultDtoObj);
			}else{
				labResultDtoObj.setUpdateBy(userId);
				labResultDtoObj.setUpdatedDatetime(new Date(new java.util.Date().getTime()));
				try{
					
					String narration="";
					if((labResultDtoObj.getNarration()).equalsIgnoreCase(null) || (labResultDtoObj.getNarration()).equalsIgnoreCase("")){
						narration="-";
					}else{
						narration=labResultDtoObj.getNarration();
					}
					Query updateSql = sessionFactory
							.getCurrentSession()
							.createSQLQuery("update ehat_lab_result set is_template_flag='"+labResultDtoObj.getIsTemplateFlag()+"', test_result='"+labResultDtoObj.getTestResult()+"', narration='"+narration+"', updated_by='"+userId+"',"
											+ " updated_datetime=now() where lab_result_id='"+labResultDtoObj.getLabResultId()+"'");
					response = updateSql.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
					response = 0;
				}
			}
		}
		return response;
	}
	
	@Override
	@Transactional
	public int updateLabRequestMst(LabRequestDTO labReqDto,String btnType,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		int response=0;
		Date dt=labReqDto.getReportDueDatetime();
		String date=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(dt);
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String testStsFlg="";
		if(btnType.equalsIgnoreCase("save")){
			//for unauthorize record.
			testStsFlg = (String)resourceBundleEhat.getString("unauthRec");
		}else if(btnType.equalsIgnoreCase("auth")){
			//for authorize record.
			testStsFlg = (String)resourceBundleEhat.getString("authRec");
		}
		
		try{
		Query updateSql = sessionFactory
				.getCurrentSession()
				.createSQLQuery("update ehat_lab_request set test_status='"+testStsFlg+"', advice='"+labReqDto.getAdvice()+"', report_due_datetime='"+date+"',"
								+ "pathologist_id='"+labReqDto.getPathologistId()+"',updated_by='"+userId+"',"
								+ " updated_datetime=now() where lab_request_id="+labReqDto.getLabRequestId()+"");
		response = updateSql.executeUpdate();
	} catch (Exception e) {
		e.printStackTrace();
		response = 0;
	}
		return response;
	}
	//Added by Laxman on 05-Feb-2018.
	@Override
	@Transactional
	public LabRequestDTO fetchonloadTestResult(int labReqMstId, HttpServletRequest request) {
		LabRequestDTO labReqDto = new LabRequestDTO();
		List<LabRequestDTO> labReqDtolist = new ArrayList<LabRequestDTO>();
		List<LabResultMstViewDto> labResDtolist = new ArrayList<LabResultMstViewDto>();
		List<pathologistDto> PathologistsList = new ArrayList<pathologistDto>();
		pathologistDto pathDocName = new pathologistDto();
		LabResultMstViewDto laRsltMstDto=new LabResultMstViewDto();
		//getting patient object
		LabRequestDTO resLabReqDto = (LabRequestDTO) genericDao.getOneObject(LabRequestDTO.class, labReqMstId);
		labReqDtolist.add(resLabReqDto);
		labReqDto.setListLabRequest(labReqDtolist);	
		
		String refDocList=genericDao.getStringValOfObject("ehat_lab_result_mst_view", "refdoc_name", labReqMstId, "labrequest_id");
		laRsltMstDto.setRefDocName(refDocList);
		labResDtolist.add(laRsltMstDto);
		labReqDto.setLabResultMstViewDto(labResDtolist);
		
		String pathDocNm=genericDao.getStringValOfObject("doctor", "doc_name", resLabReqDto.getPathologistId(), "Doctor_ID");
		pathDocName.setDocName(pathDocNm);
		PathologistsList.add(pathDocName);
		labReqDto.setPathologistDtoList(PathologistsList);
		
		return labReqDto;
	}
	
	//Added by Laxman on 06-Feb-2018.
	@Override
	@Transactional
	public String checkSampleCol(int labReqMstId, HttpServletRequest request) {
		String smplColFlag="";
		smplColFlag=genericDao.getStringValOfObject("ehat_lab_request", "smpl_collet_flag", labReqMstId, "lab_request_id");
		return smplColFlag;
	}
	
	//Added by Laxman on 06-Feb-2018.
	@Override
	@Transactional
	public String checkSamplAccpted(int labReqMstId, HttpServletRequest request) {
		String smplColFlag="";
		smplColFlag=genericDao.getStringValOfObject("ehat_lab_request", "smpl_accpt_flag", labReqMstId, "lab_request_id");
		return smplColFlag;
	}
	
	//Added by Laxman on 06-Feb-2018.
	@Override
	@Transactional
	public LabResultMstViewDto getLabTestPatientSearch(String strValue,
			String strBarcode, String txtFdate, String txtTdate, String type,
			HttpServletRequest request) {
		LabResultMstViewDto labResultPatRecord=new LabResultMstViewDto();
		List<LabResultMstViewDto> labResultPatRecordList = new ArrayList<LabResultMstViewDto>();
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		//for currentRec record.
		String currentRec = (String)resourceBundleEhat.getString("currentRec");
		//for authorize record.
		String authRec = (String)resourceBundleEhat.getString("authRec");
		//for unauthRec record.
		String unauthRec = (String)resourceBundleEhat.getString("unauthRec");
		//for recallRec record.
		String recallRec = (String)resourceBundleEhat.getString("recallRec");
		//for holdRec record.
		String holdRec = (String)resourceBundleEhat.getString("holdRec");
		//for priviousRec record.
		String priviousRec = (String)resourceBundleEhat.getString("priviousRec");
		
		String labRecordSql="";
		int department_id=0;
		try {
			if(!strValue.equalsIgnoreCase(""))
			{
				if(type.equals("onload")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+currentRec+"' and patient_name like '%"+strValue+"%' order by labrequest_id desc";
				}else if(type.equals("autho")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+authRec+"' and patient_name like '%"+strValue+"%' order by labrequest_id desc";
				}else if(type.equals("unathot")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+unauthRec+"' and patient_name like '%"+strValue+"%' order by labrequest_id desc";
				}else if(type.equals("recallt")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+recallRec+"' and patient_name like '%"+strValue+"%' order by labrequest_id desc";
				}else if(type.equals("holdt")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+holdRec+"' and patient_name like '%"+strValue+"%' order by labrequest_id desc";
				}else if(type.equals("privst")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+priviousRec+"' and patient_name like '%"+strValue+"%' order by labrequest_id desc";
				}
			}else if(!strBarcode.equalsIgnoreCase("")){

				if(type.equals("onload")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+currentRec+"' and labrequest_id like '%"+strBarcode+"%' order by labrequest_id desc";
				}else if(type.equals("autho")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+authRec+"' and labrequest_id like '%"+strBarcode+"%' order by labrequest_id desc";
				}else if(type.equals("unathot")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+unauthRec+"' and labrequest_id like '%"+strBarcode+"%' order by labrequest_id desc";
				}else if(type.equals("recallt")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+recallRec+"' and labrequest_id like '%"+strBarcode+"%' order by labrequest_id desc";
				}else if(type.equals("holdt")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+holdRec+"' and labrequest_id like '%"+strBarcode+"%' order by labrequest_id desc";
				}else if(type.equals("privst")){
					labRecordSql ="SELECT * FROM ehat_lab_result_mst_view where test_status='"+priviousRec+"' and labrequest_id like '%"+strBarcode+"%' order by labrequest_id desc";
				}
			}if(!txtFdate.equalsIgnoreCase("N") && !txtTdate.equalsIgnoreCase("N")
					&& !txtFdate.equalsIgnoreCase(null) && !txtTdate.equalsIgnoreCase(null)
					&& !txtFdate.equalsIgnoreCase("") && !txtTdate.equalsIgnoreCase(""))
			{
				
				if(type.equals("onload")){
					labRecordSql ="select * from ehat_lab_result_mst_view where test_status='"+currentRec+"' and assign_date BETWEEN str_to_date('"+txtFdate+"','%d/%m/%Y') and str_to_date('"+txtTdate+"','%d/%m/%Y')";
				}else if(type.equals("autho")){
					labRecordSql ="select * from ehat_lab_result_mst_view where test_status='"+authRec+"' and assign_date BETWEEN str_to_date('"+txtFdate+"','%d/%m/%Y') and str_to_date('"+txtTdate+"','%d/%m/%Y')";
				}else if(type.equals("unathot")){
					labRecordSql ="select * from ehat_lab_result_mst_view where test_status='"+unauthRec+"' and assign_date BETWEEN str_to_date('"+txtFdate+"','%d/%m/%Y') and str_to_date('"+txtTdate+"','%d/%m/%Y')";
				}else if(type.equals("recallt")){
					labRecordSql ="select * from ehat_lab_result_mst_view where test_status='"+recallRec+"' and assign_date BETWEEN str_to_date('"+txtFdate+"','%d/%m/%Y') and str_to_date('"+txtTdate+"','%d/%m/%Y')";
				}else if(type.equals("holdt")){
					labRecordSql ="select * from ehat_lab_result_mst_view where test_status='"+holdRec+"' and assign_date BETWEEN str_to_date('"+txtFdate+"','%d/%m/%Y') and str_to_date('"+txtTdate+"','%d/%m/%Y')";
				}else if(type.equals("privst")){
					labRecordSql ="select * from ehat_lab_result_mst_view where test_status='"+priviousRec+"' and assign_date BETWEEN str_to_date('"+txtFdate+"','%d/%m/%Y') and str_to_date('"+txtTdate+"','%d/%m/%Y')";
				}
			}
				Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(labRecordSql);
				labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listLabTestRes = labTestResQuery.list();
				//call getLabTestResult().
				labResultPatRecordList=getLabPatientRecord(listLabTestRes);
				
		} catch (Exception e) {
			e.printStackTrace();
		}
		labResultPatRecord.setListLabResultMstViewDto(labResultPatRecordList);
		System.err.println("---------------->>>>>>>"+labResultPatRecordList.toString());
		return labResultPatRecord;
	}
	
	private List<LabResultMstViewDto> getLabPatientRecord(List<Map<String, Object>> listLabTestRes) 
	{
		List<LabResultMstViewDto> labPatRecordlist = new ArrayList<LabResultMstViewDto>();
		for(Map<String, Object> row : listLabTestRes){
			LabResultMstViewDto obj=new LabResultMstViewDto();
			obj.setPatientId((Integer)row.get("patient_id"));
			obj.setAge((String)row.get("patient_age"));
			obj.setAssignDate((String)row.get("assign_date"));
			obj.setAssignTime((String)row.get("assign_time"));
			obj.setDepartmentId((Integer)row.get("department_id"));
			obj.setGender((String)row.get("gender"));
			obj.setLabrequestId((Integer)row.get("labrequest_id"));
			obj.setPatientName((String)row.get("patient_name"));
			obj.setAddress((String)row.get("address"));
			obj.setServiceId((Integer)row.get("service_id"));
			obj.settFlag((String)row.get("t_flag"));
			obj.setTestName((String)row.get("test"));
			obj.setTreatmentId((Integer)row.get("treatment_id"));
			if((String)row.get("refdoc_id")!=null){
				obj.setRefDocId((String)row.get("refdoc_id"));
			}else{
				obj.setRefDocId("-");
			}
			if((String)row.get("refdoc_name")!=null){
				obj.setRefDocName((String)row.get("refdoc_name"));
			}else{
				obj.setRefDocName("");
			}
			obj.setReportdueDate((String)row.get("reportdue_date"));
			obj.setTestStatus((String)row.get("test_status"));
			labPatRecordlist.add(obj);
		}
		return labPatRecordlist;
	}
	
	//Added by Laxman on 07-Feb-2018.
	@Override
	@Transactional
	public int changeStatusOfLabRprt(String type, String labReqIdList, HttpServletRequest request) {
		String sql = "";
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		//for currentRec record.
		String currentRec = (String)resourceBundleEhat.getString("currentRec");
		//for authorize record.
		String authRec = (String)resourceBundleEhat.getString("authRec");
		//for unauthRec record.
		String unauthRec = (String)resourceBundleEhat.getString("unauthRec");
		//for recallRec record.
		String recallRec = (String)resourceBundleEhat.getString("recallRec");
		//for holdRec record.
		String holdRec = (String)resourceBundleEhat.getString("holdRec");
		//for priviousRec record.
		String priviousRec = (String)resourceBundleEhat.getString("priviousRec");
		int response=0;
		try{
			if(type.equalsIgnoreCase("auth") || type.equalsIgnoreCase("authselect")){
				sql="update ehat_lab_request set test_status = '"+authRec+"' where lab_request_id IN ("+ labReqIdList +") ";
				
			}else if(type.equalsIgnoreCase("hold")){
				sql="update ehat_lab_request set test_status = '"+holdRec+"' where lab_request_id IN ("+ labReqIdList +") ";
				
			}else if(type.equalsIgnoreCase("recall")){
				sql="update ehat_lab_request set test_status = '"+recallRec+"' where lab_request_id IN ("+ labReqIdList +") ";
				
			}else if(type.equalsIgnoreCase("bktocrnt")){
				sql="update ehat_lab_request set test_status = '"+currentRec+"' where lab_request_id IN ("+ labReqIdList +") ";
				
			}else if(type.equalsIgnoreCase("post")){
				sql="update ehat_lab_request set test_status = '"+priviousRec+"', posted_result_flag='Y', posted_datetime=now()" +
						", posted_by='"+userId+"'  where lab_request_id IN ("+ labReqIdList +") ";
				
			}
			
			Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
			response = updateSql.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			response = 0;
		}
		return response;
	}

	@Override
	@Transactional
	public int savePatientTestTemplate(LabTestResultDto labTestResultDto,
			HttpServletRequest request) {
		int maxlabResultId=0;
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		try{
		
			if(labTestResultDto.getLabResultId()==0)
			{
				labTestResultDto.setInsertedBy(userId);
				labTestResultDto.setDeleteFlag("N");
				labTestResultDto.setInsertedDatetime(new Date(new java.util.Date().getTime()));
			}else{
				labTestResultDto.setUpdateBy(userId);
				labTestResultDto.setUpdatedDatetime(new Date(new java.util.Date().getTime()));
			}
			sessionFactory.getCurrentSession().saveOrUpdate(labTestResultDto);
			
			Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(LabTestResultDto.class);
			 criteriaMax.setProjection(Projections.max("labResultId"));
			 maxlabResultId = ((Integer)criteriaMax.uniqueResult()).intValue();
			
			
		
		}catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
		return maxlabResultId;
	}

	@Override
	@Transactional
	public Labheadings getLabFormulaHeading(String type,
			HttpServletRequest request) {
		List<Labheadings> arrLabheadings = new ArrayList<Labheadings>();
		Labheadings objLabheadings = new Labheadings();

		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String)resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		
		int packageID = Integer.parseInt(pkgID);
		int serviceId = Integer.parseInt(sid);
		Integer[] series = {packageID,serviceId};//11,13
		
		Criteria criteria=null;
		try{
		if (type.equals("onload")) {
			
			criteria = sessionFactory.getCurrentSession().createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("selfId", 0));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.in("serviceId", series));
			
			@SuppressWarnings("unchecked")
			List<SubServiceDto> subServiceDtoList = criteria.list();
			for(SubServiceDto obj : subServiceDtoList){
				Labheadings objLabheads = new Labheadings();

				objLabheads.setIdheadings(obj.getSubId());
				objLabheads.setHeading(obj.getCategoryName());
				objLabheads.setIsCategory(obj.getIsCategory());
				objLabheads.setHcode(obj.getCodeName());
				
				arrLabheadings.add(objLabheads);
			}
			objLabheadings.setLabheadingsList(arrLabheadings);
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return objLabheadings;
	}

	@Override
	@Transactional
	public Labheadings featchLabFormulaPro(String isCategory, String idHed,
			String type, HttpServletRequest request) {

		List<Labheadings> arrLabheadings = new ArrayList<Labheadings>();
		Labheadings objLabheadings = new Labheadings();
		Labheadings MainObj = new Labheadings();
		List<LabProfile> arrLabProfile = new ArrayList<LabProfile>();
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String)resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		
		int packageID = Integer.parseInt(pkgID);
		int serviceId = Integer.parseInt(sid);
		Integer[] series = {packageID,serviceId};//11,13
		String sql="";
		try{
			if(isCategory.equalsIgnoreCase("Y")){
				//if only Profile
				sql = "SELECT lp.* FROM ehat_subservice es,labprofile lp where lp.subservice_id=es.id and es.deleted = 'N' and lp.profileStatus='Y' and block='0' and es.service_id in ('"+serviceId+"','"+packageID+"') and es.selfid = "+idHed+"";
			}else{
				//if Only pkg.
				sql = "SELECT lp.* FROM ehat_configuration_services ecs,labprofile lp where ecs.service_id=lp.subservice_id  and lp.profileStatus='Y' and ecs.deleted = 'N' and ecs.master_id='"+serviceId+"' and ecs.is_com_servId='"+packageID+"' and ecs.is_com_servlastId ='"+idHed+"'";
			}
			
			Query query=sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listProList = query.list();
			
			for (Map<String, Object> rs : listProList) {
				LabProfile objLabProfile = new LabProfile();

				int porId = (Integer) rs.get("idprofile");
				//get test under profile.
				List<LabProfileTestComp> labProTstCmpList=featchLabProTestCompDataNew(porId);
				if(labProTstCmpList.size()>1){
					
					//objLabProfile.setPretestli(labProTstCmpList);
					
					objLabProfile.setIdprofile((Integer) rs.get("idprofile"));
					objLabProfile.setIdheadings((Integer) rs.get("idheadings"));

					objLabProfile.setProfileName((String) rs.get("profileName"));
					objLabProfile.setProfileStatus((String) rs.get("profileStatus"));
					objLabProfile.setProfileCode((String) rs.get("profileCode"));
					objLabProfile.setProfileCharges((Float) rs.get("profileCharges"));
					

					arrLabProfile.add(objLabProfile);
				}
				
			}

			objLabheadings.setLabProfileList(arrLabProfile);
			arrLabheadings.add(objLabheadings);

		}catch (Exception e) {
			e.printStackTrace();
		}
		MainObj.setLabheadingsList(arrLabheadings);
		return MainObj;
	}
	
	private List<LabProfileTestComp> featchLabProTestCompDataNew(int porId) {

		List<LabProfileTestComp> arrLabProfileTestComp = new ArrayList<LabProfileTestComp>();

		
		String sql = "SELECT * FROM labprofiletestcomp where idprofile ='"+porId+"'";
		
		Query query=sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> hdt = query.list();
		
		//if only more than one test under profile.
		if(hdt.size()>1){

		for (Map<String, Object> rs1 : hdt) {
			LabProfileTestComp objLabProfileTestComp = new LabProfileTestComp();
			
			int id = (Integer) rs1.get("idTest");
			
			if(id !=0){
				
				objLabProfileTestComp.setIdlabProfileTestComp((Integer) rs1
						.get("idlabProfileTestComp"));
				objLabProfileTestComp.setIdprofile((Integer) rs1.get("idprofile"));
				objLabProfileTestComp.setIdTest((Integer) rs1.get("idTest"));
				
				sql = "SELECT * FROM labtest where idTest ='"+id+"'";
				
				Query query1=sessionFactory.getCurrentSession().createSQLQuery(sql);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> labtest = query1.list();
				String tn = "";
				String tc ="";
				float tr = 0f;

				for (Map<String, Object> rs : labtest) {
					
					tn = (String) rs.get("testName");
					tc =(String) rs.get("testCode");
					tr = (Float) rs.get("testRate");
				}
				
				objLabProfileTestComp.setTestName(tn);
				objLabProfileTestComp.setTestCode(tc);
				objLabProfileTestComp.setTestRate(tr);
				
				arrLabProfileTestComp.add(objLabProfileTestComp);
			}/*else{
				
				objLabProfileTestComp.setTestName((String) rs1.get("headName"));
				objLabProfileTestComp.setTestCode("");
				objLabProfileTestComp.setIdTest((Integer) rs1.get("idTest"));
				objLabProfileTestComp.setIdlabProfileTestComp((Integer) rs1.get("idlabProfileTestComp"));
				objLabProfileTestComp.setIdprofile((Integer) rs1.get("idprofile"));
			}*/
			
		}
	}
		return arrLabProfileTestComp;
	}
	
/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 06-March-2018
	 * @code For checkPackageConfiguration(for sponsor and general (OPD/IPD/Digno) patient).
	 ***/
	//for getting sponsor and general patient serviceId which is in Package.
	@SuppressWarnings("unchecked")
	private List<ConfigurServicesDto> checkPackageConfiguration(LabSlavePojo lpojo, int deptId,int packageId,int treatmentId) {
		
		List<ConfigurServicesDto> listSubSerId=null;
		List<BillDetailsIpdDto> listBillIpd=null;
		List<BillDetailsDto> listBillOpd=null;
		int hallId = 2;
		int	hallSlaveId=0;
		
		if(deptId==2){
			
			Criteria criteriaBillDto= sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
			criteriaBillDto.add(Restrictions.eq("billDetailsId", lpojo.getBilDetId()));
			listBillIpd = criteriaBillDto.list();
			
			
			for(BillDetailsIpdDto objBillDtoIpd:listBillIpd){
				
				//if count greater than zero then package will be assign 
				
				if (objBillDtoIpd.getSponsorId() == 0 && objBillDtoIpd.getChargesSlaveId() == 0) {
					try {
						if(hallId > 0){
							//Get Bed Id of patient whose treatment is active 
							//Call for get hallSlaveId.
							hallSlaveId=gethallSlaveIdForLab(treatmentId,hallId,hallSlaveId,objBillDtoIpd.getSponsorId(),
									objBillDtoIpd.getChargesSlaveId(),packageId,lpojo.getServiceId());
						}
						//Calling count method to check count is available or not
						int count =  getCount(objBillDtoIpd.getSponsorId(),objBillDtoIpd.getChargesSlaveId(),hallId,hallSlaveId,packageId,serviceId);
						if (count > 0) {
							
							listSubSerId=getListSubSerIdInPkg(objBillDtoIpd.getSponsorId(),objBillDtoIpd.getChargesSlaveId(),
									hallId,hallSlaveId,packageId);
							
						}else{
							
							listSubSerId=getListSubSerIdInPkg(0,0,0,0,packageId);
						}
						
					} catch (Exception e) {
						e.printStackTrace();
						
					}
					//&& receiptOf.equals("sponsor")
				} else if (objBillDtoIpd.getSponsorId() > 0 && objBillDtoIpd.getChargesSlaveId() > 0) {

					try {
						if(hallId > 0){
							//Get Bed Id of patient whose treatment is active 
							hallSlaveId = gethallSlaveIdForLab(treatmentId,hallId,hallSlaveId,objBillDtoIpd.getSponsorId(),
									objBillDtoIpd.getChargesSlaveId(),packageId,lpojo.getServiceId());
						}
						
						//calling count method to get the count of package if count greater than zero than package will be save 
						int count =  getCount(objBillDtoIpd.getSponsorId(),objBillDtoIpd.getChargesSlaveId(),hallId,hallSlaveId,packageId,serviceId);
						if (count > 0) {
							
							listSubSerId=getListSubSerIdInPkg(objBillDtoIpd.getSponsorId(),objBillDtoIpd.getChargesSlaveId(),
									hallId,hallSlaveId,packageId);
						}
						//calling count method to get the count of package if count greater than zero than package will be save with hall
						else{
							objBillDtoIpd.setSponsorId(0);
							objBillDtoIpd.setChargesSlaveId(0);
							if(hallId > 0){
								//Get Bed Id of patient whose treatment is active 
								hallSlaveId = gethallSlaveIdForLab(treatmentId,hallId,hallSlaveId,objBillDtoIpd.getSponsorId(),
										objBillDtoIpd.getChargesSlaveId(),packageId,lpojo.getServiceId());
								}
							count = getCount(objBillDtoIpd.getSponsorId(),objBillDtoIpd.getChargesSlaveId(),hallId,hallSlaveId,packageId,serviceId);
							
							if (count > 0) {
								//for Default Hall Package.
								
								listSubSerId=getListSubSerIdInPkg(0,0,hallId,hallSlaveId,packageId);
								
								
							}else{
								//for default Package.
								
								listSubSerId=getListSubSerIdInPkg(0,0,0,0,packageId);
								
							}
							
						}
						
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}else{
			
			Criteria criteriaBillDto= sessionFactory.getCurrentSession().createCriteria(BillDetailsDto.class);
			criteriaBillDto.add(Restrictions.eq("billDetailsId", lpojo.getBilDetId()));
			listBillOpd = criteriaBillDto.list();
			
			for(BillDetailsDto objBillDtoOpd:listBillOpd){
				
				//if count greater than zero then package will be assign 
				
				if (objBillDtoOpd.getSponsorId() == 0 && objBillDtoOpd.getChargesSlaveId()==0) {
					try {
						
						int	count = getCount(objBillDtoOpd.getSponsorId(),objBillDtoOpd.getChargesSlaveId(),0,0,packageId,serviceId);
						
						if (count > 0) {
							listSubSerId=getListSubSerIdInPkg(objBillDtoOpd.getSponsorId(),objBillDtoOpd.getChargesSlaveId(),0,0,packageId);
						}
						
					} catch (Exception e) {
						e.printStackTrace();
					}
				} else if (objBillDtoOpd.getSponsorId() > 0 && objBillDtoOpd.getChargesSlaveId() > 0) {

					try {
						int	count = getCount(objBillDtoOpd.getSponsorId(),objBillDtoOpd.getChargesSlaveId(),0,0,packageId,serviceId);
						
						if (count > 0) {
							listSubSerId=getListSubSerIdInPkg(objBillDtoOpd.getSponsorId(),objBillDtoOpd.getChargesSlaveId(),0,0,packageId);
						}else{
							listSubSerId=getListSubSerIdInPkg(0,0,0,0,packageId);
						}
						
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		return listSubSerId;
	}

	/**
	 * @author Laxman Nikam
	 * @throws ParseException 
	 * @date 06-March-2018
	 * @code For get List of SubServiceId In Pkg.
	 ***/
	@SuppressWarnings("unchecked")
	private List<ConfigurServicesDto> getListSubSerIdInPkg(Integer sponsorId,
			Integer chargesSlaveId, int hallId, int hallSlaveId, int packageId) {
		
		List<ConfigurServicesDto> listSubSerId=null;
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		int packageSerID = Integer.parseInt(pkgID);
		try{
		Criteria criteriaSubSerId= sessionFactory.getCurrentSession().createCriteria(ConfigurServicesDto.class);
		criteriaSubSerId.add(Restrictions.eq("isComServlastId", packageId));
		criteriaSubSerId.add(Restrictions.eq("chargesId", sponsorId));
		criteriaSubSerId.add(Restrictions.eq("chargesSlaveId", chargesSlaveId));
		criteriaSubSerId.add(Restrictions.eq("hallId",hallId));
		criteriaSubSerId.add(Restrictions.eq("hallSlaveId",hallSlaveId));
		criteriaSubSerId.add(Restrictions.eq("isComServId",packageSerID));
		criteriaSubSerId.add(Restrictions.eq("deleted","N"));
		criteriaSubSerId.setProjection(Projections.projectionList().add(Projections.property("serviceId"), "serviceId"));
		criteriaSubSerId.setResultTransformer(Transformers.aliasToBean(ConfigurServicesDto.class));
		listSubSerId = criteriaSubSerId.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return listSubSerId;
	}

	/*******
	 * @author    :Laxman
	 * @Date      :07-04-2018
	 * @Code      :For getting hall slave id
	 * *******/
	private int gethallSlaveIdForLab(int treatId, Integer hallId, Integer hallSlaveId, 
			Integer sponsorId, Integer chargesSlaveId, int subServId, int serviceId) {
		
		try {
			
			// get hall id from hall table
			Query bedID = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"SELECT sub_service_id FROM ehat_bill_details_ipd where on_bed_flag='Y' and  treatment_id="
									+ treatId + "");
			int hsid = (Integer) bedID.uniqueResult();

			// get hall slave id from hall table
			Query hallType = sessionFactory.getCurrentSession()
					.createSQLQuery(
							"SELECT hall.ehat_hallid FROM ehat_bill_details_ipd INNER JOIN beds ON ehat_bill_details_ipd.sub_service_id=beds.Bed_ID INNER JOIN hall on hall.Hall_ID = beds.Hall_ID where  ehat_bill_details_ipd.sub_service_id="
									+ hsid);

			hallSlaveId = (Integer) hallType.uniqueResult();
			
			//Calling count method to check count is available or not
			Integer count =  getCount(sponsorId,chargesSlaveId,hallId,hallSlaveId,subServId,serviceId);
		
			if (count > 0) {
				System.err.println("????????countcountcountcount????????????has" + hallSlaveId);
			} else {
				//Calling method of auto suggestion service layer to get super hall ids 
				AutosuggestionService obj=(ApplicationContextUtils.getApplicationContext()).getBean(AutosuggestionService.class);
				List<ChargesMasterSlave> ltSubCharges = new ArrayList<ChargesMasterSlave>();
				ltSubCharges = obj.fetchSuperCatofchargesSlave(hallSlaveId);
				if (ltSubCharges.size() > 0) {

					for (int i = 0; i < ltSubCharges.size(); i++) {
						
						//checking count with new hall slave id 
						Integer count1 = getCount(sponsorId,
								chargesSlaveId, hallId, ltSubCharges.get(i)
										.getSlaveId(), subServId,
										serviceId);
						//if count greater than zero than loop will break
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
	
	/*****
	 * @author   :Laxman
	 * @Date     :07-04-2018
	 * @Code     :For Package count in configuration
	 * ******/
	private int getCount(Integer sponsorId, Integer chargesSlaveId,
			Integer hallId, Integer hallSlaveId, int subServId, int serviceId) {
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		int packageID = Integer.parseInt(pkgID);
		
				Query q = sessionFactory.getCurrentSession().createSQLQuery(
				                    "SELECT count(*) as count FROM ehat_configuration_services where deleted='N' "
				                     +" and charges_id="+sponsorId+" and chargesSlave_id="
				                     +chargesSlaveId+" and hall_id="+hallId+" and hallSlave_id="+hallSlaveId+" and is_com_servId="
				                     +packageID+" and is_com_servlastId="+subServId );

				Integer count = ((Number) q.uniqueResult()).intValue();
		return count;
	}
	
	/*******
	 * @author    :Laxman Nikam
	 * @param LabRequestDTO 
	 * @param LabRequestSlaveDTO 
	 * @param labReqslvid 
	 * @param labReqId 
	 * @Date      :07-04-2018
	 * @Code      :For Machine-Interface save Lab test result at the time of test send to lab.
	 * *******/
	private int saveLabTestData(LabRequestDTO labReq,LabRequestSlaveDTO labReqtSlv, int labReqId, int labReqslvid) {
		int response=0;
		String tempFlag="N";
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String)resourceBundleEhat.getString("labHeadingID");
		int serviceId = Integer.parseInt(sid);
		try {
		
			String sql ="SELECT lt.idTest,lt.valueType FROM pathology_labprofile lp left join pathology_labprofiletestcomp lpc on lpc.idprofile=lp.id left join pathology_lab_test lt on lt.idTest=lpc.idTest where lp.service_id ='"+serviceId+"' and lp.subservice_id='"+labReqtSlv.getSubServiceId()+"' and lp.profileStatus='Y' and lt.testStatus='Y'";
		
			Query labTestResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			labTestResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listLabTest = labTestResQuery.list();
		if(listLabTest.size()>0){
			for(Map<String, Object> row : listLabTest){
				LabTestResultDto labResultDtoObj=new LabTestResultDto();
				
				tempFlag = (String)row.get("valueType");
				if(tempFlag.equalsIgnoreCase("t")){
					labResultDtoObj.setIsTemplateFlag("Y");
				}else{
					labResultDtoObj.setIsTemplateFlag("N");
				}

				labResultDtoObj.setTestId((Integer)row.get("idTest"));
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
				
				//Call generic save method.
				response = genericDao.saveObject(labResultDtoObj);
				
			}
		}else{
			response=1;
		}
		} catch (Exception e) {
			response=0;
			e.printStackTrace();
			System.out.println("database error...could not insert: "
					+ e.getMessage());
		}
		
		return response;
	}

	@Override
	public int getAllOPDPatientsCount() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getTodaysOPDPatientsCount() {
		// TODO Auto-generated method stub
		return 0;
	}
}
