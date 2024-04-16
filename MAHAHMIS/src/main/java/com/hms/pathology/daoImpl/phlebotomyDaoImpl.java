package com.hms.pathology.daoImpl;

import java.io.File;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.impl.DoctorDeskDaoImpl;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.EhatOtherBillDetailForOpdDto;
import com.hms.ehat.dto.LabGradingsDto;
import com.hms.ehat.dto.LabMicroorganismsDto;
import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.service.BillNobleService;
import com.hms.histopath.dto.HistopathMaster;
import com.hms.pathology.dao.Phlebotomydao;
import com.hms.pathology.dto.FilePathPathology;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.LabTestGeneralValueDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;
import com.hms.pathology.dto.LabTestSampleDTO;
import com.hms.pathology.dto.LabUnitTypeDTO;
import com.hms.pathology.dto.LisTabCountDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologySampleWiseSlave;
import com.hms.pathology.dto.PathologySampleWiseSuperMaster;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;
import com.hms.pathology.dto.PathologyTestReasonDto;
import com.hms.pathology.dto.SendToOutSourceDocumentDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;

@Repository
public class phlebotomyDaoImpl implements Phlebotomydao {
	static Logger log=Logger.getLogger(phlebotomyDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionfactory;
	
	@Autowired
	BillNobleService billNobleService;
	
	@Autowired
	DoctorDeskDaoImpl doctorDeskDaoImpl;

	@Override
	public List<PathologySampleWiseMaster> getphlebotomyRecord(String patientType,String callFrom,String emergencyFlag, HttpServletRequest request) {	
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		

		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			
			if(callFrom.equalsIgnoreCase("B2BCollection")){
				
				if(userType.equalsIgnoreCase("admin")){
					String sql="";
					sql="SELECT et.emergency_flag AS emergencyflag,ps.collected_flag,ep.mobile,ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id  JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  eb.cancle = 'N' and ps.deleted='N' and ps.business_type=1 AND ps.unit_Id="+unitId+" group by ps.treatment_id ORDER BY et.treatment_id DESC";				
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					query.setMaxResults(10);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setPatientage((Integer)row.get("age"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						obj.setDocname((String)row.get("docname"));
						obj.setBarcodenumber((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setSamplenumber((BigInteger)row.get("samplecount"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setPhleboteststatus((String)row.get("phlebo_teststatus"));
						obj.setMobile((String)row.get("mobile"));
						obj.setCollectedFlag((String)row.get("collected_flag"));
						labPatRecordlist.add(obj);
				}
				}else{
					String sql="";
					//sql="SELECT ps.collected_flag,ep.mobile,ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.deleted='N' and ps.business_type=1 AND ps.unit_Id="+unitId+" group by ps.treatment_id ORDER BY et.treatment_id DESC";								
					sql="SELECT et.emergency_flag AS emergencyflag,ps.collected_flag,ep.mobile,ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id  JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and eb.cancle = 'N' and ps.deleted='N' and ps.business_type=1 AND ps.unit_Id="+unitId+" group by ps.treatment_id ORDER BY et.treatment_id DESC";
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					query.setMaxResults(10);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setPatientage((Integer)row.get("age"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						obj.setDocname((String)row.get("docname"));
						obj.setBarcodenumber((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setSamplenumber((BigInteger)row.get("samplecount"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setPhleboteststatus((String)row.get("phlebo_teststatus"));
						obj.setMobile((String)row.get("mobile"));
						obj.setCollectedFlag((String)row.get("collected_flag"));
						labPatRecordlist.add(obj);
				}
			}
			}else{
				if(userType.equalsIgnoreCase("admin")){
					String sql="";
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.business_type = '2' AND eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.treatment_id ORDER BY et.treatment_id DESC";
					
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					
					if(emergencyFlag.equalsIgnoreCase("Y")) {
						query.setString(0, "Y");
						query.setString(1, "Y");
					}else if(emergencyFlag.equalsIgnoreCase("All")){
						query.setString(0, "N");
						query.setString(1, "Y");
					}else {
						query.setString(0, "N");
						query.setString(1, "N");
					}
					query.setMaxResults(10);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setPatientage((Integer)row.get("age"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						//obj.setDocname((String)row.get("docname"));
						obj.setDocname((String)row.get("refdocname"));
						obj.setBarcodenumber((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setSamplenumber((BigInteger)row.get("samplecount"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setPhleboteststatus((String)row.get("phlebo_teststatus"));
						labPatRecordlist.add(obj);
				}
				}else{
					String sql="";
					//sql="SELECT ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.deleted='N' and  ps.unit_Id="+unitId+" group by ps.treatment_id ORDER BY et.treatment_id DESC";								
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.business_type = '2' AND ps.customer_id IN ("+userCustomerId+") and eb.cancle='N' and ps.deleted='N' and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.treatment_id ORDER BY et.treatment_id DESC";
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					
					if(emergencyFlag.equalsIgnoreCase("Y")) {
						query.setString(0, "Y");
						query.setString(1, "Y");
					}else if(emergencyFlag.equalsIgnoreCase("All")){
						query.setString(0, "N");
						query.setString(1, "Y");
					}else {
						query.setString(0, "N");
						query.setString(1, "N");
					}
					
					query.setMaxResults(10);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setPatientage((Integer)row.get("age"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						//obj.setDocname((String)row.get("docname"));
						obj.setDocname((String)row.get("refdocname"));
						obj.setBarcodenumber((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setSamplenumber((BigInteger)row.get("samplecount"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setPhleboteststatus((String)row.get("phlebo_teststatus"));
						labPatRecordlist.add(obj);
				}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}		
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> getPhlebotomyRecordWithSamplyWise(
			Integer pId, Integer tId,HttpServletRequest request) {	
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		

		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql="";
			sql="SELECT  ps.collected_flag,ps.test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,GROUP_CONCAT(DISTINCT es.profileName ) AS testname,GROUP_CONCAT(DISTINCT ps.bar_code)  AS barCode, GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-'))  as conatiner_name,ifnull(pl.sample_name, '-') as sample_name,ps.patient_id AS patient_id,  ps.treatment_id AS treatment_id,  et.department_id AS department_id,SUBSTR(ps.created_date_time, 1, 20) as datetime, ps.phlebo_teststatus,em.unit_name, ps.in_out_house, GROUP_CONCAT(DISTINCT ifnull(es.time_sensitive_value, '-'))  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN  ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where eb.cancle='N' and ps.deleted='N' and ps.unit_Id="+unitId+" and ps.patient_id="+pId+" and ps.treatment_id="+tId+" group by ps.sample_type_Id, ps.in_out_house, ps.test_status ORDER BY et.treatment_id DESC";								
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setMasterId((String)row.get("id"));
				obj.setProfileName((String)row.get("testname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setContainername((String)row.get("conatiner_name"));
				obj.setSamplename((String)row.get("sample_name"));
				//obj.setUnitname((String)row.get("barCode"));
				obj.setDepartmentId((Integer)row.get("patient_id"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));	
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPhleboteststatus((String)row.get("phlebo_teststatus"));
				obj.setUnitname((String)row.get("unit_name"));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setCollectedFlag((String)row.get("collected_flag"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		
		return labPatRecordlist;
	}


	@Override
	public Integer sendToLab(PathologySampleWiseMaster master, String subList, String histoList, String registeredAt, HttpServletRequest request) {

		Session session = null;
		HttpSession sessionn = request.getSession();
		Integer unitId = (Integer) sessionn.getAttribute("uId");
		Integer userId = (Integer) sessionn.getAttribute("userId1");
		Integer userInhouseId = (Integer.parseInt((String) sessionn.getAttribute("userInhouseId")));
		
		ResourceBundle resource = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
		String covidProfileId1 = (String) resource.getObject("CovidReportProfileId").toString();			
		String covidProfileId2 = (String) resource.getObject("SARSCOV2ANTIGEN").toString();			
		String covidProfileId3 = (String) resource.getObject("COVID19RNAAMPLIFICATION").toString();
		String covidProfileId4 = (String) resource.getObject("REALTIMEHEPATITISCVIRUSHCV").toString();
		String covidProfileId5 = (String) resource.getObject("REALTIMETRUENAT").toString();
		
		Integer[] array = {Integer.parseInt(covidProfileId1), Integer.parseInt(covidProfileId2), Integer.parseInt(covidProfileId3), Integer.parseInt(covidProfileId4), Integer.parseInt(covidProfileId5)};
		List<Integer> covidProfileIds = Arrays.asList(array);
		
		try {
			session = sessionfactory.getCurrentSession();
			
			if(histoList.length()>0){
				int res = sendToHistopathLab(histoList, master.getTreatmentId(),master.getPatientId(),request);
			}
			
			// added for Set customerType and customerId
			int customerId=0;
			int customerType=0;
			    
			String sqlCId=" select ifnull(customer_id,0) as customer_id from ehat_treatment where treatment_id="+ master.getTreatmentId()+"";
			   SQLQuery qCId =sessionfactory.getCurrentSession().createSQLQuery(sqlCId);
			   customerId=((Number) qCId.uniqueResult()).intValue();
			   if(customerId == 0)
				   customerId=1;
			   
			   String sqlCType=" select ifnull(customer_type,0) as customer_type from ehat_treatment where treatment_id="+ master.getTreatmentId()+"";
			   SQLQuery qCType=sessionfactory.getCurrentSession().createSQLQuery(sqlCType);
			   customerType=((Number) qCType.uniqueResult()).intValue();
			   if(customerType == 0)
				   customerType=1;
			   
			   master.setCustomerId(customerId);
			   master.setCustomerType(customerType);
			      
			//end customerId and CustomerType
			
			
			//for templatewise info
			
			PathologySampleWiseMaster dto = (PathologySampleWiseMaster) ConfigUIJSONUtility.getObjectFromJSON(subList, PathologySampleWiseMaster.class);
			SQLQuery query = session.createSQLQuery("SELECT lp.id as profileId, lpc.idTest as testId, lt.idTestSample as sampleId, lt.idSampleContainer as containerId FROM pathology_labprofile lp join pathology_labprofiletestcomp lpc on (lp.id = lpc.idprofile) join pathology_lab_test lt on(lpc.idTest = lt.idTest) " + 
					" WHERE lp.service_id =:serviceId and lp.subservice_id =:subServiceId AND lt.process_test_outlab =:testOutlab AND lt.testStatus=:testStatus AND lp.profileStatus=:profileStatus AND lpc.test_status=:test_status");

			System.err.println("SubList Size : "+dto.getLabSampleWiseMasterDtoList().size());
			
			for(PathologySampleWiseMaster obj : dto.getLabSampleWiseMasterDtoList()) {
				
				
				// check subservice profile configure in pathology_labprofile master or not 
				String sql1="Select count(*)  from pathology_labprofile lp  where lp.profileStatus='Y' AND lp.subservice_id="+obj.getSubServiceId()+" " ;
			    SQLQuery	qq=session.createSQLQuery(sql1);
			     int countProfile  =((Number) qq.uniqueResult()).intValue();
			     if(countProfile==0) {
			    	 continue;
			     }
			     
			     // end
				
				 String sqltemp= " Select  lp.callfrom from pathology_labprofile lp  where lp.profileStatus='Y' AND lp.subservice_id="+obj.getSubServiceId()+" "; 
				 SQLQuery sqltempq= session.createSQLQuery(sqltemp);
				 String callfrom= (String) sqltempq.uniqueResult();
				 
				query.setParameter("serviceId", obj.getServiceId());
				query.setParameter("subServiceId", obj.getSubServiceId());
				query.setParameter("testStatus", "Y");
				query.setParameter("profileStatus", "Y");
				query.setParameter("test_status", "Y");
				
			//	if(obj.getInOutHouse() == 0)
					query.setParameter("testOutlab", "N");
				// else
				//	query.setParameter("testOutlab", "Y");
								
			/*	Query qry = session.createQuery("Select count(*) from PathologySampleWiseMaster where deleted =:deleted and serviceId =:serviceId AND subServiceId =:subServiceId AND treatmentId =:treatmentId AND patientId =:patientId AND inOutHouse =:inOutHouse AND unitId =:unitId AND bilDetId =:bilDetId");
				 	  //qry.setParameter("profileId", master.getProfileId());
				 	  qry.setParameter("serviceId", obj.getServiceId());
				 	  qry.setParameter("subServiceId", obj.getSubServiceId());
				 	  qry.setParameter("unitId", unitId);
				 	  qry.setParameter("treatmentId", master.getTreatmentId());
				 	  qry.setParameter("patientId", master.getPatientId());
				 	  //qry.setParameter("teststatus", "C"); //AND teststatus =:teststatus //change by kishor
				 	  qry.setParameter("bilDetId", obj.getBilDetId());//Added by kishor
				 	  qry.setParameter("inOutHouse", obj.getInOutHouse());
				 	  qry.setParameter("deleted", "N");
				  
				Long count2 = (Long)qry.uniqueResult();*/
				//Thread.sleep(3000);
				SQLQuery qry = session.createSQLQuery("select count(*) from pathology_sample_wise_master where service_id="+obj.getServiceId()+" and sub_service_id="+obj.getSubServiceId()+" and unit_Id="+unitId+" and treatment_id="+master.getTreatmentId()+" and patient_id="+master.getPatientId()+" and bil_det_id="+obj.getBilDetId()+" and in_out_house="+obj.getInOutHouse()+" and deleted='N' ");
			      
			    
			int count2 = ((Number)qry.uniqueResult()).intValue();
		
			//if(count2 > 0) 
			//	return -1;
			if(count2 > 0) 
				continue;
				
			int superCount = 0;
			int count = 0;
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();

			PathologySampleWiseSuperMaster superMaster = new PathologySampleWiseSuperMaster();
			List<PathologySampleWiseMaster> masterList = new ArrayList<>();
			List<PathologySampleWiseSlave> slaveList = new ArrayList<>();
			if(callfrom.equalsIgnoreCase("Histopath")) {
               
				//String sqltemp1="SELECT lp.idTestSample as sampleId, lp.idSampleContainer as containerId,lp.id as profileId FROM pathology_labprofile lp  WHERE lp.service_id="+obj.getServiceId()+" AND lp.subservice_id="+obj.getSubServiceId()+" ";
				String sqltemp1="SELECT lp.idTestSample as sampleId, lp.idSampleContainer as containerId,lp.id as profileId FROM pathology_labprofile lp  WHERE lp.service_id="+obj.getServiceId()+" AND lp.subservice_id="+obj.getSubServiceId()+" and lp.profileStatus='Y' ";
				SQLQuery sqlQuery1 = session.createSQLQuery(sqltemp1);
				sqlQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> otherList = sqlQuery1.list();
				List<Map<String, Object>> list1 = new ArrayList<>();
				list1 = otherList;
				for(Map<String, Object> row : list1){
				
				PathologySampleWiseSlave slave = new PathologySampleWiseSlave();
				String sqlRef="";
				if(superCount == 0){
					if(((Integer)obj.getBusinessType()) == 1) {
						sqlRef="SELECT IFNULL(MAX(ssm.id), 0) AS id FROM pathology_sample_wise_super_master ssm join pathology_sample_wise_master sm on (ssm.id = sm.master_id) WHERE sm.deleted = 'N' AND sm.sample_type_id = "+obj.getSampleTypeId()+" AND ssm.patient_id = "+master.getPatientId()+" AND ssm.treatment_id = "+master.getTreatmentId()+" AND sm.unit_Id="+unitId+" AND sm.test_status = 112";
					}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))) {
						sqlRef="SELECT IFNULL(MAX(ssm.id), 0) AS id FROM pathology_sample_wise_super_master ssm join pathology_sample_wise_master sm on (ssm.id = sm.master_id) WHERE sm.deleted = 'N' AND sm.sample_type_id = "+obj.getSampleTypeId()+" AND ssm.patient_id = "+master.getPatientId()+" AND ssm.treatment_id = "+master.getTreatmentId()+" AND sm.unit_Id="+unitId+" AND sm.test_status = 2";
					}else{
						sqlRef="SELECT IFNULL(MAX(ssm.id), 0) AS id FROM pathology_sample_wise_super_master ssm join pathology_sample_wise_master sm on (ssm.id = sm.master_id) WHERE sm.deleted = 'N' AND sm.sample_type_id = "+obj.getSampleTypeId()+" AND ssm.patient_id = "+master.getPatientId()+" AND ssm.treatment_id = "+master.getTreatmentId()+" AND sm.unit_Id="+unitId+" AND sm.test_status < 2";
					}
						
					Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef); 
					Integer rowCount = ((Number)query12.uniqueResult()).intValue();
						//System.err.println(query12);
					if(rowCount == null){
						rowCount = 0;
					}
						
					if(rowCount > 0){
						PathologySampleWiseSuperMaster superMaster1 = (PathologySampleWiseSuperMaster) session.get(PathologySampleWiseSuperMaster.class, rowCount);
						masterList.addAll(superMaster1.getPathologySampleWiseMaster());
							
						superMaster.setSampleWiseSuperMasterId(rowCount);
						superMaster.setProfileId((Integer)row.get("profileId"));
						superMaster.setSampleTypeId((Integer)row.get("sampleId"));
						superMaster.setContainerId((Integer)row.get("containerId"));
							
						if(((Integer)obj.getBusinessType()) == 1) {
							superMaster.setTeststatus((Integer)(112));
							superMaster.setPhleboteststatus("R");
						}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))){
							superMaster.setTeststatus((Integer)(2));
							superMaster.setCollecteddatetime(new Date(new java.util.Date().getTime()));
							superMaster.setCollectedBy(userId);  
						}else {
							superMaster.setTeststatus((Integer)(1));
						}
							
						superMaster.setServiceId((Integer)(obj.getServiceId()));
						superMaster.setSubServiceId((Integer)(obj.getSubServiceId()));
						superMaster.setUnitId((Integer)(unitId));
						superMaster.setBilDetId((Integer)(obj.getBilDetId()));
						//superMaster.setBarCode((String)(obj.getBarCode()));
						superMaster.setBarCode((String)(obj.getBarCode()));
						//superMaster.setSampleTypeId((Integer)(obj.getSampleTypeId()));
						superMaster.setInOutHouse((Integer)(obj.getInOutHouse()));						
						superMaster.setBusinessType((Integer)(obj.getBusinessType()));
						superMaster.setCollectionDate((String)(obj.getCollectionDate()));
						superMaster.setCollectionTime((String)(obj.getCollectionTime()));
						//added by kishor for B2C flow
						if(obj.getBusinessType()==2){
							//superMaster.setCustomerType((Integer)(userInhouseId));
							//superMaster.setCustomerId((Integer)(userInhouseId));
						}else{
							superMaster.setCustomerType((Integer)(obj.getCustomerType()));
							superMaster.setCustomerId((Integer)(obj.getCustomerId()));
						}							
														
						superMaster.setPatientId((Integer)(master.getPatientId()));
						superMaster.setTreatmentId((Integer)(master.getTreatmentId()));
						superMaster.setRefdocid(obj.getRefdocid());
						superMaster.setRegRefDocId(master.getRegRefDocId());
						superMaster.setPackageId(obj.getPackageId());
					}else{							
						superMaster.setProfileId((Integer)row.get("profileId"));
						superMaster.setSampleTypeId((Integer)row.get("sampleId"));
						superMaster.setContainerId((Integer)row.get("containerId"));
							
						if(((Integer)obj.getBusinessType()) == 1) {
							superMaster.setTeststatus((Integer)(112));
							superMaster.setPhleboteststatus("R");
						}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))){
							superMaster.setTeststatus((Integer)(2));
							superMaster.setCollecteddatetime(new Date(new java.util.Date().getTime()));
							superMaster.setCollectedBy(userId);
						}else {
							superMaster.setTeststatus((Integer)(1));
						}
							
						superMaster.setServiceId((Integer)(obj.getServiceId()));
						superMaster.setSubServiceId((Integer)(obj.getSubServiceId()));
						superMaster.setUnitId((Integer)(unitId));
						superMaster.setBilDetId((Integer)(obj.getBilDetId()));
						superMaster.setBarCode((String)(obj.getBarCode()));
						//superMaster.setSampleTypeId((Integer)(obj.getSampleTypeId()));
						superMaster.setInOutHouse((Integer)(obj.getInOutHouse()));						
						superMaster.setBusinessType((Integer)(obj.getBusinessType()));
						superMaster.setCollectionDate((String)(obj.getCollectionDate()));
						superMaster.setCollectionTime((String)(obj.getCollectionTime()));
						
						//added by kishor for B2C flow
						if(obj.getBusinessType()==2){
							//superMaster.setCustomerType((Integer)(userInhouseId));
							//superMaster.setCustomerId((Integer)(userInhouseId));
						}else{
							superMaster.setCustomerType((Integer)(obj.getCustomerType()));
							superMaster.setCustomerId((Integer)(obj.getCustomerId()));
						}
							
						superMaster.setPatientId((Integer)(master.getPatientId()));
						superMaster.setTreatmentId((Integer)(master.getTreatmentId()));
						superMaster.setRefdocid(obj.getRefdocid());
						superMaster.setRegRefDocId(master.getRegRefDocId());
						superMaster.setPackageId(obj.getPackageId());
					}
						
					//Added by kishor for geting and seting sample_count for Phlebotomy
					if(count == 0) {
						Integer countVal=0;
							if(((Integer)obj.getBusinessType()) == 1) {
								String sqlRef1="SELECT ifnull(max(sample_count),0) FROM pathology_sample_wise_master WHERE deleted = 'N' AND sample_type_id = "+obj.getSampleTypeId()+" AND patient_id = "+master.getPatientId()+" AND treatment_id = "+master.getTreatmentId()+" AND unit_Id="+unitId+" AND test_status=112";
								Query query123= sessionfactory.getCurrentSession().createSQLQuery(sqlRef1); 
								Integer rowCount1 = ((Number)query123.uniqueResult()).intValue();
							
								if(rowCount1 == 0){
									String sql="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=112";
									Query sqlQuery= sessionfactory.getCurrentSession().createSQLQuery(sql);        	 
									Integer sampleCount = ((Number)sqlQuery.uniqueResult()).intValue();
									
									countVal = sampleCount + 1;
								}else{
									countVal = rowCount1;
								}
							}else {
								if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))) {
									String sqlRef1="SELECT ifnull(max(sample_count),0) FROM pathology_sample_wise_master WHERE deleted = 'N' AND sample_type_id = "+obj.getSampleTypeId()+" AND patient_id = "+master.getPatientId()+" AND treatment_id = "+master.getTreatmentId()+" AND unit_Id="+unitId+" AND test_status = 2";
									Query query123= sessionfactory.getCurrentSession().createSQLQuery(sqlRef1); 
									Integer rowCount1 = ((Number)query123.uniqueResult()).intValue();
								
									if(rowCount1 == 0){
										String sqlCount="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=2";
										Query queryCount= sessionfactory.getCurrentSession().createSQLQuery(sqlCount);        	 
										Integer PhleCount = ((Number)queryCount.uniqueResult()).intValue();
									
										countVal = PhleCount + 1;
									}else{
										countVal = rowCount1;
									}
								}else {
									String sqlRef1="SELECT ifnull(max(sample_count),0) FROM pathology_sample_wise_master WHERE deleted = 'N' AND sample_type_id = "+obj.getSampleTypeId()+" AND patient_id = "+master.getPatientId()+" AND treatment_id = "+master.getTreatmentId()+" AND unit_Id="+unitId+" AND test_status < 2";
									Query query123= sessionfactory.getCurrentSession().createSQLQuery(sqlRef1); 
									Integer rowCount1 = ((Number)query123.uniqueResult()).intValue();
								
									if(rowCount1 == 0){
										String sqlCount="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=1";
										Query queryCount= sessionfactory.getCurrentSession().createSQLQuery(sqlCount);        	 
										Integer PhleCount = ((Number)queryCount.uniqueResult()).intValue();
									
										countVal = PhleCount + 1;
									}else{
										countVal = rowCount1;
									}
								}
							}
							master.setProfileId((Integer)row.get("profileId"));
							master.setSampleTypeId((Integer)row.get("sampleId"));
							master.setContainerId((Integer)row.get("containerId"));
							
							if(((Integer)obj.getBusinessType()) == 1) {
								master.setTeststatus((Integer)(112));
								master.setPhleboteststatus("R");
							}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))){
								master.setTeststatus((Integer)(2));
								master.setCollecteddatetime(new Date(new java.util.Date().getTime()));
								master.setCollectedBy(userId);  
							}else {
								master.setTeststatus((Integer)(1));
							}
							master.setServiceId((Integer)(obj.getServiceId()));
							master.setSubServiceId((Integer)(obj.getSubServiceId()));
							master.setUnitId((Integer)(unitId));
							master.setBilDetId((Integer)(obj.getBilDetId()));
							master.setBarCode((String)(obj.getBarCode()));
							//master.setSampleTypeId((Integer)(obj.getSampleTypeId()));
							//master.setInOutHouse((Integer)(obj.getInOutHouse()));	
							// chek profile is out source or not
							
							String sqlOut="Select process_outlab from pathology_labprofile where id="+(Integer)row.get("profileId")+" and profileStatus='Y' limit 1";
							
                               SQLQuery  qOutsource =sessionfactory.getCurrentSession().createSQLQuery(sqlOut);
                               String outsourceFlag=(String) qOutsource.uniqueResult();
                               if(outsourceFlag.equalsIgnoreCase("Y")) {
                            	   master.setInOutHouse(1);	
                               }else {
                            	   master.setInOutHouse((Integer)(obj.getInOutHouse()));	
                               }
							// end for outsource check
							
							master.setBusinessType((Integer)(obj.getBusinessType()));
							master.setCollectionDate((String)(obj.getCollectionDate()));
							master.setCollectionTime((String)(obj.getCollectionTime()));
							System.out.println("Template wise flag 11===="+obj.getTemplateWise());
							master.setTemplateWise(obj.getTemplateWise());// Added by vinod
							//added by kishor for B2C flow
							if(obj.getBusinessType()==2){
								//master.setCustomerType((Integer)(userInhouseId));
								//master.setCustomerId((Integer)(userInhouseId));
							}else{
								master.setCustomerType((Integer)(obj.getCustomerType()));
								master.setCustomerId((Integer)(obj.getCustomerId()));
							}
							
							master.setSampleCount((Integer)(countVal));
							master.setCreatedBy((Integer)(userId));
							master.setRefdocid(obj.getRefdocid());
							master.setRegRefDocId(master.getRegRefDocId());
							master.setPackageId(obj.getPackageId());
							masterList.add(master);
						}
					}
					
				   
					slave.setProfileId((Integer)row.get("profileId"));
					slave.setSampleTypeId((Integer)row.get("sampleId"));
					slave.setTestid((Integer)row.get("testId"));
					slave.setPatientId(master.getPatientId());
					slave.setTreatmentId(master.getTreatmentId());
					slave.setUnitId((Integer)(unitId));
					slave.setBarCode((String)(obj.getBarCode()));
					slave.setInOutHouse((Integer)(obj.getInOutHouse()));
					slave.setCollectionDate((String)(obj.getCollectionDate()));
					slave.setCollectionTime((String)(obj.getCollectionTime()));
					slave.setRegRefDocId(master.getRegRefDocId());
					slave.setPackageId(obj.getPackageId());
					
					slaveList.add(slave);
				    
					superCount++;
					count++;
					//added by Kishor
				}
			}else {	
				for(Map<String, Object> row : list){
					
					PathologySampleWiseSlave slave = new PathologySampleWiseSlave();
					String sqlRef="";
					if(superCount == 0){
						if(((Integer)obj.getBusinessType()) == 1) {
							sqlRef="SELECT IFNULL(MAX(ssm.id), 0) AS id FROM pathology_sample_wise_super_master ssm join pathology_sample_wise_master sm on (ssm.id = sm.master_id) WHERE sm.deleted = 'N' AND sm.sample_type_id = "+obj.getSampleTypeId()+" AND ssm.patient_id = "+master.getPatientId()+" AND ssm.treatment_id = "+master.getTreatmentId()+" AND sm.unit_Id="+unitId+" AND sm.test_status = 112";
						}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))) {
							sqlRef="SELECT IFNULL(MAX(ssm.id), 0) AS id FROM pathology_sample_wise_super_master ssm join pathology_sample_wise_master sm on (ssm.id = sm.master_id) WHERE sm.deleted = 'N' AND sm.sample_type_id = "+obj.getSampleTypeId()+" AND ssm.patient_id = "+master.getPatientId()+" AND ssm.treatment_id = "+master.getTreatmentId()+" AND sm.unit_Id="+unitId+" AND sm.test_status = 2";
						}else{
							sqlRef="SELECT IFNULL(MAX(ssm.id), 0) AS id FROM pathology_sample_wise_super_master ssm join pathology_sample_wise_master sm on (ssm.id = sm.master_id) WHERE sm.deleted = 'N' AND sm.sample_type_id = "+obj.getSampleTypeId()+" AND ssm.patient_id = "+master.getPatientId()+" AND ssm.treatment_id = "+master.getTreatmentId()+" AND sm.unit_Id="+unitId+" AND sm.test_status < 2";
						}
							
						Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef); 
						Integer rowCount = ((Number)query12.uniqueResult()).intValue();
							//System.err.println(query12);
						if(rowCount == null){
							rowCount = 0;
						}
							
						if(rowCount > 0){
							PathologySampleWiseSuperMaster superMaster1 = (PathologySampleWiseSuperMaster) session.get(PathologySampleWiseSuperMaster.class, rowCount);
							masterList.addAll(superMaster1.getPathologySampleWiseMaster());
								
							superMaster.setSampleWiseSuperMasterId(rowCount);
							superMaster.setProfileId((Integer)row.get("profileId"));
							superMaster.setSampleTypeId((Integer)row.get("sampleId"));
							superMaster.setContainerId((Integer)row.get("containerId"));
								
							if(((Integer)obj.getBusinessType()) == 1) {
								superMaster.setTeststatus((Integer)(112));
								superMaster.setPhleboteststatus("R");
							}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))){
								superMaster.setTeststatus((Integer)(2));
								superMaster.setCollecteddatetime(new Date(new java.util.Date().getTime()));
								superMaster.setCollectedBy(userId);  
							}else {
								superMaster.setTeststatus((Integer)(1));
							}
								
							superMaster.setServiceId((Integer)(obj.getServiceId()));
							superMaster.setSubServiceId((Integer)(obj.getSubServiceId()));
							superMaster.setUnitId((Integer)(unitId));
							superMaster.setBilDetId((Integer)(obj.getBilDetId()));
							superMaster.setBarCode((String)(obj.getBarCode()));
							superMaster.setSampleTypeId((Integer)(obj.getSampleTypeId()));
							superMaster.setInOutHouse((Integer)(obj.getInOutHouse()));						
							superMaster.setBusinessType((Integer)(obj.getBusinessType()));
							superMaster.setCollectionDate((String)(obj.getCollectionDate()));
							superMaster.setCollectionTime((String)(obj.getCollectionTime()));
							//added by kishor for B2C flow
							if(obj.getBusinessType()==2){
								//superMaster.setCustomerType((Integer)(userInhouseId));
								//superMaster.setCustomerId((Integer)(userInhouseId));
							}else{
								superMaster.setCustomerType((Integer)(obj.getCustomerType()));
								superMaster.setCustomerId((Integer)(obj.getCustomerId()));
							}							
															
							superMaster.setPatientId((Integer)(master.getPatientId()));
							superMaster.setTreatmentId((Integer)(master.getTreatmentId()));
							superMaster.setRefdocid(obj.getRefdocid());
							superMaster.setRegRefDocId(master.getRegRefDocId());
							superMaster.setPackageId(obj.getPackageId());
						}else{							
							superMaster.setProfileId((Integer)row.get("profileId"));
							superMaster.setSampleTypeId((Integer)row.get("sampleId"));
							superMaster.setContainerId((Integer)row.get("containerId"));
								
							if(((Integer)obj.getBusinessType()) == 1) {
								superMaster.setTeststatus((Integer)(112));
								superMaster.setPhleboteststatus("R");
							}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))){
								superMaster.setTeststatus((Integer)(2));
								superMaster.setCollecteddatetime(new Date(new java.util.Date().getTime()));
								superMaster.setCollectedBy(userId);
							}else {
								superMaster.setTeststatus((Integer)(1));
							}
								
							superMaster.setServiceId((Integer)(obj.getServiceId()));
							superMaster.setSubServiceId((Integer)(obj.getSubServiceId()));
							superMaster.setUnitId((Integer)(unitId));
							superMaster.setBilDetId((Integer)(obj.getBilDetId()));
							superMaster.setBarCode((String)(obj.getBarCode()));
							superMaster.setSampleTypeId((Integer)(obj.getSampleTypeId()));
							superMaster.setInOutHouse((Integer)(obj.getInOutHouse()));						
							superMaster.setBusinessType((Integer)(obj.getBusinessType()));
							superMaster.setCollectionDate((String)(obj.getCollectionDate()));
							superMaster.setCollectionTime((String)(obj.getCollectionTime()));
							
							//added by kishor for B2C flow
							if(obj.getBusinessType()==2){
								//superMaster.setCustomerType((Integer)(userInhouseId));
								//superMaster.setCustomerId((Integer)(userInhouseId));
							}else{
								superMaster.setCustomerType((Integer)(obj.getCustomerType()));
								superMaster.setCustomerId((Integer)(obj.getCustomerId()));
							}
								
							superMaster.setPatientId((Integer)(master.getPatientId()));
							superMaster.setTreatmentId((Integer)(master.getTreatmentId()));
							superMaster.setRefdocid(obj.getRefdocid());
							superMaster.setRegRefDocId(master.getRegRefDocId());
							superMaster.setPackageId(obj.getPackageId());
						}
							
						//Added by kishor for geting and seting sample_count for Phlebotomy
						if(count == 0) {
							Integer countVal=0;
								if(((Integer)obj.getBusinessType()) == 1) {
									String sqlRef1="SELECT ifnull(max(sample_count),0) FROM pathology_sample_wise_master WHERE deleted = 'N' AND sample_type_id = "+obj.getSampleTypeId()+" AND patient_id = "+master.getPatientId()+" AND treatment_id = "+master.getTreatmentId()+" AND unit_Id="+unitId+" AND test_status=112";
									Query query123= sessionfactory.getCurrentSession().createSQLQuery(sqlRef1); 
									Integer rowCount1 = ((Number)query123.uniqueResult()).intValue();
								
									if(rowCount1 == 0){
										String sql="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=112";
										Query sqlQuery= sessionfactory.getCurrentSession().createSQLQuery(sql);        	 
										Integer sampleCount = ((Number)sqlQuery.uniqueResult()).intValue();
										
										countVal = sampleCount + 1;
									}else{
										countVal = rowCount1;
									}
								}else {
									if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))) {
										String sqlRef1="SELECT ifnull(max(sample_count),0) FROM pathology_sample_wise_master WHERE deleted = 'N' AND sample_type_id = "+obj.getSampleTypeId()+" AND patient_id = "+master.getPatientId()+" AND treatment_id = "+master.getTreatmentId()+" AND unit_Id="+unitId+" AND test_status = 2";
										Query query123= sessionfactory.getCurrentSession().createSQLQuery(sqlRef1); 
										Integer rowCount1 = ((Number)query123.uniqueResult()).intValue();
									
										if(rowCount1 == 0){
											String sqlCount="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=2";
											Query queryCount= sessionfactory.getCurrentSession().createSQLQuery(sqlCount);        	 
											Integer PhleCount = ((Number)queryCount.uniqueResult()).intValue();
										
											countVal = PhleCount + 1;
										}else{
											countVal = rowCount1;
										}
									}else {
										String sqlRef1="SELECT ifnull(max(sample_count),0) FROM pathology_sample_wise_master WHERE deleted = 'N' AND sample_type_id = "+obj.getSampleTypeId()+" AND patient_id = "+master.getPatientId()+" AND treatment_id = "+master.getTreatmentId()+" AND unit_Id="+unitId+" AND test_status < 2";
										Query query123= sessionfactory.getCurrentSession().createSQLQuery(sqlRef1); 
										Integer rowCount1 = ((Number)query123.uniqueResult()).intValue();
									
										if(rowCount1 == 0){
											String sqlCount="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=1";
											Query queryCount= sessionfactory.getCurrentSession().createSQLQuery(sqlCount);        	 
											Integer PhleCount = ((Number)queryCount.uniqueResult()).intValue();
										
											countVal = PhleCount + 1;
										}else{
											countVal = rowCount1;
										}
									}
								}
								master.setProfileId((Integer)row.get("profileId"));
								master.setSampleTypeId((Integer)row.get("sampleId"));
								master.setContainerId((Integer)row.get("containerId"));
								
								if(((Integer)obj.getBusinessType()) == 1) {
									master.setTeststatus((Integer)(112));
									master.setPhleboteststatus("R");
								}else if(registeredAt.equalsIgnoreCase("airport") && covidProfileIds.contains((Integer)row.get("profileId"))){
									master.setTeststatus((Integer)(2));
									master.setCollecteddatetime(new Date(new java.util.Date().getTime()));
									master.setCollectedBy(userId);  
								}else {
									master.setTeststatus((Integer)(1));
								}
								master.setServiceId((Integer)(obj.getServiceId()));
								master.setSubServiceId((Integer)(obj.getSubServiceId()));
								master.setUnitId((Integer)(unitId));
								master.setBilDetId((Integer)(obj.getBilDetId()));
								master.setBarCode((String)(obj.getBarCode()));
								//master.setSampleTypeId((Integer)(obj.getSampleTypeId()));
								master.setInOutHouse((Integer)(obj.getInOutHouse()));						
								master.setBusinessType((Integer)(obj.getBusinessType()));
								master.setCollectionDate((String)(obj.getCollectionDate()));
								master.setCollectionTime((String)(obj.getCollectionTime()));
								System.out.println("Template wise===="+obj.getTemplateWise());
								master.setTemplateWise(obj.getTemplateWise());// Added by vinod
								//added by kishor for B2C flow
								if(obj.getBusinessType()==2){
									//master.setCustomerType((Integer)(userInhouseId));
								//	master.setCustomerId((Integer)(userInhouseId));
								}else{
									master.setCustomerType((Integer)(obj.getCustomerType()));
									master.setCustomerId((Integer)(obj.getCustomerId()));
								}
								
								master.setSampleCount((Integer)(countVal));
								master.setCreatedBy((Integer)(userId));
								master.setRefdocid(obj.getRefdocid());
								master.setRegRefDocId(master.getRegRefDocId());
								master.setPackageId(obj.getPackageId());
								masterList.add(master);
							}
						}
					   
						slave.setProfileId((Integer)row.get("profileId"));
						slave.setSampleTypeId((Integer)row.get("sampleId"));
						slave.setTestid((Integer)row.get("testId"));
						slave.setPatientId(master.getPatientId());
						slave.setTreatmentId(master.getTreatmentId());
						slave.setUnitId((Integer)(unitId));
						slave.setBarCode((String)(obj.getBarCode()));
						slave.setInOutHouse((Integer)(obj.getInOutHouse()));
						slave.setCollectionDate((String)(obj.getCollectionDate()));
						slave.setCollectionTime((String)(obj.getCollectionTime()));
						slave.setRegRefDocId(master.getRegRefDocId());
						slave.setPackageId(obj.getPackageId());
						
						slaveList.add(slave);
					    
						superCount++;
						count++;
						//added by Kishor
					}
				}
			   System.out.println("masterList===="+masterList.size());
			     System.out.println("masterList data========"+masterList);
			   
				superMaster.setPathologySampleWiseMaster(masterList);
				master.setPathologySampleWiseSlave(slaveList);
				//Thread.sleep(2000);
				PathologySampleWiseSuperMaster savedObj = (PathologySampleWiseSuperMaster) session.merge(superMaster);
				
				int result = updateLabBarcodeAndSndFlag(savedObj,master.getDeptId());
				
				//int result1 = updateSndFlagBillDetails(obj.getBilDetId(),savedObj.getSampleWiseSuperMasterId().toString());
			}
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
			log.error("sendToLab()...Error :"+e);
		}
		return 0;
	}
	
	private int updateLabBarcodeAndSndFlag(PathologySampleWiseSuperMaster savedObj, int deptId) {
		
		try {
			
			Integer masterId = savedObj.getSampleWiseSuperMasterId();
			for(PathologySampleWiseMaster obj : savedObj.getPathologySampleWiseMaster()) {
				
				//PathologySampleWiseMaster objMaster = (PathologySampleWiseMaster) sessionfactory.getCurrentSession().get(PathologySampleWiseMaster.class, obj.getSampleWiseMasterId());
				//objMaster.setBarCode(masterId.toString());
				obj.setBarCode(obj.getTreatmentId().toString());
				
				if(deptId == 2) {
					
					//String sql = "update ehat_bill_details_ipd set bar_code='"+masterId.toString()+"',sndtolabflag='Y' where bill_details_id='"+obj.getBilDetId()+"'";
					String sql = "update ehat_bill_details_ipd set bar_code='"+obj.getTreatmentId()+"',sndtolabflag='Y' where bill_details_id='"+obj.getBilDetId()+"'";
					Query updateSql = sessionfactory.getCurrentSession().createSQLQuery(sql);
					updateSql.executeUpdate();
				}else {
					
					//String sql = "update ehat_bill_details set bar_code='"+masterId.toString()+"',sndtolabflag='Y' where bill_details_id='"+obj.getBilDetId()+"'";
					String sql = "update ehat_bill_details set bar_code='"+obj.getTreatmentId()+"',sndtolabflag='Y' where bill_details_id='"+obj.getBilDetId()+"'";
					Query updateSql = sessionfactory.getCurrentSession().createSQLQuery(sql);
					updateSql.executeUpdate();
				}
			}
			
		}catch(Exception e) {
			
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	
	private int updateSndFlagBillDetails(Integer bilDetId,String barcode) {
		Integer result=0;
		try {
			
			String sql = "update ehat_bill_details set sndtolabflag='Y' where bill_details_id='"+bilDetId+"'";
			Query updateSql = sessionfactory.getCurrentSession().createSQLQuery(sql);
			updateSql.executeUpdate();
			
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();	
			log.error("error for updateSndFlagBillDetailsForLab...."+e.getMessage());
			result=0;
			}
		return result;
	}
	
	private int sendToHistopathLab(String histoList, Integer tId, Integer pId, HttpServletRequest request) {
		Session session = null;
		HttpSession sessionn = request.getSession();
		session = sessionfactory.getCurrentSession();
		Integer unitId = (Integer) sessionn.getAttribute("uId");
		Integer userId = (Integer) sessionn.getAttribute("userId1");
		Integer userInhouseId = (Integer.parseInt((String) sessionn.getAttribute("userInhouseId")));
		try {
			
			HistopathMaster dto = (HistopathMaster) ConfigUIJSONUtility.getObjectFromJSON(histoList, HistopathMaster.class);
			SQLQuery query = session.createSQLQuery("SELECT lp.id as profileId, lpc.idTest as testId, lt.idTestSample as sampleId, lt.idSampleContainer as containerId FROM pathology_labprofile lp join pathology_labprofiletestcomp lpc on (lp.id = lpc.idprofile) join pathology_lab_test lt on(lpc.idTest = lt.idTest) " + 
					" WHERE lp.service_id =:serviceId and lp.subservice_id =:subServiceId AND lt.process_test_outlab =:testOutlab AND lt.testStatus=:testStatus AND lp.profileStatus=:profileStatus AND lpc.test_status=:test_status");
			for(HistopathMaster obj : dto.getLstHistoPathol()) {
				query.setParameter("serviceId", obj.getServiceId());
				query.setParameter("subServiceId", obj.getSubServiceId());
				query.setParameter("testStatus", "Y");
				query.setParameter("profileStatus", "Y");
				query.setParameter("test_status", "Y");

				if (obj.getInOutHouse() == 0)
					query.setParameter("testOutlab", "N");
				else
					query.setParameter("testOutlab", "Y");
				
				Query qry = session.createQuery("Select count(*) from HistopathMaster where deleted =:deleted and serviceId =:serviceId AND subServiceId =:subServiceId AND treatmentId =:treatmentId AND patientId =:patientId AND inOutHouse =:inOutHouse AND unitId =:unitId AND (teststatus =:teststatus OR teststatus =:teststatuss)");
			 	  qry.setParameter("serviceId", obj.getServiceId());
			 	  qry.setParameter("subServiceId", obj.getSubServiceId());
			 	  qry.setParameter("unitId", unitId);
			 	  qry.setParameter("treatmentId", tId);
			 	  qry.setParameter("patientId", pId);
			 	  qry.setParameter("teststatus", 1);
			 	  qry.setParameter("teststatuss", 2);
			 	 // qry.setParameter("bilDetId", obj.getBilDetId());//Added by kishor
			 	  qry.setParameter("inOutHouse", obj.getInOutHouse());
			 	  qry.setParameter("deleted", "N");
			  
			Long count2 = (Long)qry.uniqueResult();
	
		if(count2 > 0) 
			return -1;
			
		int result = updateSndFlagBillDetailsForLab(obj.getBilDetId());
		
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list = query.list();
		HistopathMaster histopathMaster = new HistopathMaster();
		List<HistopathMaster>histoPathList = new ArrayList<>();
			
		for(Map<String, Object> row : list){
		//	HistopathMaster hpMaster = new HistopathMaster();
			String sqlRef="";
			
			histopathMaster.setProfileId((Integer)row.get("profileId"));
			histopathMaster.setSampleTypeId((Integer)row.get("sampleId"));
			histopathMaster.setContainerId((Integer)row.get("containerId"));
			
			if(((Integer)obj.getBusinessType()) == 1) {
				histopathMaster.setTeststatus((Integer)(1));
			}else {
				histopathMaster.setTeststatus((Integer)(1));
			}
			histopathMaster.setPatientId(pId);
			histopathMaster.setTreatmentId(tId);
			histopathMaster.setServiceId((Integer)(obj.getServiceId()));
			histopathMaster.setSubServiceId((Integer)(obj.getSubServiceId()));
			histopathMaster.setUnitId((Integer)(unitId));
			histopathMaster.setBilDetId((Integer)(obj.getBilDetId()));
			histopathMaster.setBarCode((String)(obj.getBarCode().toString()));
			histopathMaster.setSampleTypeId((Integer)(obj.getSampleTypeId()));
			histopathMaster.setInOutHouse((Integer)(obj.getInOutHouse()));						
			histopathMaster.setBusinessType((Integer)(obj.getBusinessType()));
			histopathMaster.setCollectionDate((String)(obj.getCollectionDate().toString()));
			histopathMaster.setCollectionTime((String)(obj.getCollectionTime().toString()));
			
			//added by kishor for B2C flow
			if(obj.getBusinessType()==2){
				histopathMaster.setCustomerType((Integer)(userInhouseId));
				histopathMaster.setCustomerId((Integer)(userInhouseId));
			}else{
				histopathMaster.setCustomerType((Integer)(obj.getCustomerType()));
				histopathMaster.setCustomerId((Integer)(obj.getCustomerId()));
			}
			
			//hpMaster.setSampleCount((Integer)(countVal));
			histopathMaster.setCreatedBy((Integer)(userId));
			histopathMaster.setRefdocid(obj.getRefdocid());
			histopathMaster.setRegRefDocId(obj.getRegRefDocId());
			histoPathList.add(histopathMaster);						
			}
		histopathMaster.setLstHistoPathol(histoPathList);			
		session.merge(histopathMaster);
			
		}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 1;
	}

	//added by Kishor
	private int updateSndFlagBillDetailsForLab(Integer bilDetId) {
		Integer result=0;
		try {
			
			String sql="";
			int response=0;
			
				sql="update ehat_bill_details set sndtolabflag='Y' where bill_details_id='"+bilDetId+"'";
				Query updateSql = sessionfactory.getCurrentSession().createSQLQuery(sql);
				response = updateSql.executeUpdate();
			
			/*Session session = sessionfactory.getCurrentSession();
        	String hql = "UPDATE BillDetailsDto set sndToLabFlag =:sndToLabFlag WHERE billDetailsId =:bilDetId";
			Query qry = session.createQuery(hql);
			qry.setParameter("sndToLabFlag","Y"); 
			qry.setParameter("bilDetId",bilDetId); */
			
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();	
			log.error("error for updateSndFlagBillDetailsForLab...."+e.getMessage());
			result=0;
			}
		return result;
	}
	

	@Override
	public LabTestDTO getPathologyPreDetails(PathologySampleWiseMaster master, String callFrom,HttpServletRequest request) {
		
		Session session = null;
		HttpSession sessionn = request.getSession();
		Integer unitId = (Integer) sessionn.getAttribute("uId");
		try {
			session = sessionfactory.getCurrentSession();
			LabTestDTO dto = new LabTestDTO();
			List<LabTestDTO> labTestList = new ArrayList<>();
			//START HistoPathLab
			
			List<Map<String, Object>> Histolist = new ArrayList<>();
			SQLQuery sqlQueryH = 
					session.createSQLQuery("SELECT lp.idTestSample AS sampleId,lp.idSampleContainer AS containerId,lp.histopath_lab AS histopath_lab,lpc.idTest AS idTest,lt.testName AS testName,lt.process_test_outlab AS outlab FROM pathology_labprofile lp JOIN pathology_labprofiletestcomp lpc ON (lp.id = lpc.idprofile) JOIN pathology_lab_test lt ON (lpc.idTest = lt.idTest) WHERE lp.profileStatus = 'Y' AND lt.testStatus='Y' AND lp.service_id=:serviceId AND lp.subservice_id=:subServiceId  AND lp.histopath_lab='Y';");
			sqlQueryH.setParameter("serviceId", master.getServiceId());
			sqlQueryH.setParameter("subServiceId", master.getSubServiceId());
			
			sqlQueryH.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> histoLabList = sqlQueryH.list();
			Histolist = histoLabList;
			if(Histolist.size()>0) {
				Query query = session.createQuery("Select count(*) from HistopathMaster where deleted =:deleted AND serviceId =:serviceId AND subServiceId =:subServiceId AND treatmentId =:treatmentId AND patientId =:patientId AND (teststatus =:teststatus OR teststatus =:teststatuss) AND unitId =:unitId");
				  query.setParameter("serviceId", master.getServiceId());
				  query.setParameter("subServiceId", master.getSubServiceId());
				  query.setParameter("treatmentId", master.getTreatmentId());
				  query.setParameter("patientId", master.getPatientId());
				  query.setParameter("teststatus", 1);
				  query.setParameter("teststatuss", 2);
				 // query.setParameter("inOutHouse", master.getInOutHouse()); //AND inOutHouse =:inOutHouse
				  query.setParameter("unitId", unitId);
				  query.setParameter("deleted", "N");
				  
			Long count = (Long)query.uniqueResult();
			List<LabTestDTO> labTestList1 = new ArrayList<>();
			if(count > 0) {
				//Added by Kishor 
				LabTestDTO test2 = new LabTestDTO();
				test2.setCallFrom("Profile Already Present");
				labTestList1.add(test2);
			    dto.setLabTestList(labTestList1);
				return dto;
			}else {
				
				for(Map<String, Object> row : Histolist){
					LabTestDTO histoTest = new LabTestDTO();
					
					histoTest.setSampleId((Integer)row.get("sampleId"));
					histoTest.setHistopathLab((String)row.get("histopath_lab"));
					histoTest.setContainerId((Integer)row.get("containerId"));
					histoTest.setIdTest((Integer)row.get("idTest"));
					histoTest.setTestName((String)row.get("testName"));					
					histoTest.setProcessAtOutlab((String)row.get("outlab"));
					
					labTestList.add(histoTest);
				}
				dto.setLabTestList(labTestList);				
			}
				
			//END histopathlab
			}else{
				//START LIS Test
				ArrayList<Integer> numbers = new ArrayList<Integer>();
				numbers.add(1);numbers.add(2);numbers.add(101);	numbers.add(102);				
				
				/*Query query = session.createQuery("Select count(*) from PathologySampleWiseMaster where deleted =:deleted AND serviceId =:serviceId AND subServiceId =:subServiceId AND treatmentId =:treatmentId AND patientId =:patientId AND (teststatus in(:teststatus)) AND unitId =:unitId");
					  query.setParameter("serviceId", master.getServiceId());
					  query.setParameter("subServiceId", master.getSubServiceId());
					  query.setParameter("treatmentId", master.getTreatmentId());
					  query.setParameter("patientId", master.getPatientId());
					  query.setParameterList("teststatus", numbers);
					 // query.setParameter("teststatuss", 2);
					  //query.setParameter("inOutHouse", master.getInOutHouse()); //AND inOutHouse =:inOutHouse
					  query.setParameter("unitId", unitId);
					  query.setParameter("deleted", "N");*/
				Query qry = null;
				int count = 0;
				
				Query qry1 = session.createSQLQuery("SELECT process_outlab  FROM pathology_labprofile WHERE subservice_id="+master.getSubServiceId()+" and profileStatus='Y' limit 1");
				String process_outlab = ((String)qry1.uniqueResult());
				
						
				Query q = session.createSQLQuery("SELECT department_id FROM ehat_treatment  WHERE treatment_id="+master.getTreatmentId()+" AND deleted='N'");
				int dept = ((Number)q.uniqueResult()).intValue();
				
				if(dept == 1 || dept == 3)
				{
					 qry = session.createSQLQuery("SELECT count(*) as count FROM ehat_bill_details where sub_service_id="+master.getSubServiceId()+" AND treatment_id="+master.getTreatmentId()+" AND deleted='N' AND cancle='N'");
					count = ((Number)qry.uniqueResult()).intValue();
					
					if(count <= 0) {
						Query query = session.createSQLQuery("SELECT count(*) as count FROM ehat_other_bill_detail_for_opd where treatment_id="+master.getTreatmentId()+" AND deleted='N'  AND cancle='N' AND child_sub_service_id="+master.getSubServiceId()+"");
						count = ((Number)query.uniqueResult()).intValue();
					}
				}else if(dept == 2)
				{
					 qry = session.createSQLQuery("SELECT count(*) as count FROM ehat_bill_details_ipd where sub_service_id="+master.getSubServiceId()+" AND treatment_id="+master.getTreatmentId()+" AND deleted='N' AND cancle='N'");
					 count = ((Number)qry.uniqueResult()).intValue();
					
					if(count <= 0) {
						Query query = session.createSQLQuery("SELECT count(*) as count FROM ehat_other_bill_detail_for_ipd where treatment_id="+master.getTreatmentId()+" AND deleted='N'  AND cancle='N' AND child_sub_service_id="+master.getSubServiceId()+"");
						count = ((Number)query.uniqueResult()).intValue();
					}
				}
				
				
				
					 
				
				//Long count = (Long)query.uniqueResult();
				List<LabTestDTO> labTestList1 = new ArrayList<>();
				if(dept == 1 || dept ==3) {
				if(count > 0) {
					//Added by Kishor 
					LabTestDTO test1 = new LabTestDTO();
					test1.setCallFrom("Profile Already Present");
					labTestList1.add(test1);
				    dto.setLabTestList(labTestList1);
					return dto;
				  }
				}
				else {
					
					List<Map<String, Object>> list = new ArrayList<>();
					
					//for templatewise info				
					String sqltemp= "Select ifnull(lp.callfrom,'-') from pathology_labprofile lp where profileStatus='Y' and lp.subservice_id="+master.getSubServiceId()+" ";
					SQLQuery sqltempq= session.createSQLQuery(sqltemp);
					String callfrom = (String) sqltempq.uniqueResult();
					
					if(callfrom.equalsIgnoreCase("Histopath")) {
						
						SQLQuery sqlQuery1 = session.createSQLQuery("SELECT lp.idTestSample as sampleId, lp.idSampleContainer as containerId FROM pathology_labprofile lp  WHERE lp.service_id=:serviceId AND lp.subservice_id=:subServiceId ");
						sqlQuery1.setParameter("serviceId", master.getServiceId());
						sqlQuery1.setParameter("subServiceId", master.getSubServiceId());
						sqlQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> otherList = sqlQuery1.list();
						list = otherList;
						
						for(Map<String, Object> row : list){
							LabTestDTO test = new LabTestDTO();
							test.setSampleId((Integer)row.get("sampleId"));
							test.setContainerId((Integer)row.get("containerId"));
							test.setProfile_outlab_Flag(process_outlab);
							labTestList.add(test);
						}
	
					}else {
						
						SQLQuery sqlQuery = session.createSQLQuery("SELECT lp.idTestSample AS sampleId,lp.idSampleContainer AS containerId,lpc.idTest AS idTest,lt.testName AS testName,lt.volume AS volume,lt.fasting AS fasting,lt.tat AS tat,lt.temp_sensitive AS tempSensitive,lt.min_temp AS minTemp,lt.max_temp AS maxTemp,lt.time_sensitive AS timeSensitive,lt.time_sensitive_value AS timeSensitiveValue,lt.drug_sensitivity AS drugSensitivity,lt.nabl AS nabl,lt.process_test_outlab AS outlab,lt.height AS height,lt.weight AS weight,lt.urine_volume AS urineVolume,lt.prerequisite AS prerequisite,lt.lmp_status AS lmpStatus FROM pathology_labprofile lp JOIN pathology_labprofiletestcomp lpc ON (lp.id = lpc.idprofile) JOIN pathology_lab_test lt ON (lpc.idTest = lt.idTest) WHERE lp.profileStatus = 'Y' AND lt.testStatus='Y' AND lp.service_id=:serviceId AND lp.subservice_id=:subServiceId ");
						sqlQuery.setParameter("serviceId", master.getServiceId());
						sqlQuery.setParameter("subServiceId", master.getSubServiceId());
						
						sqlQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> genralList = sqlQuery.list();
						list = genralList;
						
						if(list.size() > 0) {
					
							//if(list.size() > 0) {
							if(list.size() <= 0) {
								SQLQuery sqlQuery1 = 
										session.createSQLQuery("SELECT lp.idTestSample as sampleId, lp.idSampleContainer as containerId, lpc.idTest as idTest, lt.testName as testName, lt.volume as volume, lt.fasting as fasting, lt.tat as tat, " + 
												" lt.temp_sensitive as tempSensitive, lt.min_temp as minTemp, lt.max_temp as maxTemp, lt.time_sensitive as timeSensitive, " + 
												" lt.time_sensitive_value as timeSensitiveValue, lt.drug_sensitivity as drugSensitivity, lt.nabl as nabl, " + 
												" lt.process_test_outlab as outlab, lt.height as height, lt.weight as weight, lt.urine_volume as urineVolume, lt.prerequisite as prerequisite, lt.lmp_status as lmpStatus," + 
												" lnv.idUnitType as unitTypeId FROM pathology_labprofile lp JOIN pathology_labprofiletestcomp lpc ON (lp.id = lpc.idprofile) " + 
												" JOIN pathology_lab_test lt ON(lpc.idTest = lt.idTest) JOIN pathology_labtestnormalvalue lnv ON(lt.idTest = lnv.matser_id) " + 
												" WHERE lp.service_id=:serviceId AND lp.subservice_id=:subServiceId AND (lnv.sexType=:gender OR lnv.sexType=:both OR lnv.sexType=:tran)");
								sqlQuery1.setParameter("serviceId", master.getServiceId());
								sqlQuery1.setParameter("subServiceId", master.getSubServiceId());
								//sqlQuery1.setString(0, master.getGender());
								//sqlQuery1.setString(1, "3");
								sqlQuery1.setParameter("gender", master.getGender());
								sqlQuery1.setParameter("both", 4);
								sqlQuery1.setParameter("tran", 3);
								
								sqlQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> otherList = sqlQuery1.list();
								list = otherList;
							}
							
							
							for(Map<String, Object> row : list){
								LabTestDTO test = new LabTestDTO();
								
								Integer testId = (Integer)row.get("idTest");
								
								Query query1 = session.createSQLQuery("Select count(*) from pathology_sample_wise_slave ss join pathology_sample_wise_master sm ON(sm.id = ss.master_id) where ss.treatment_id =:treatmentId AND ss.patient_id =:patientId AND ss.test_id =:testId AND sm.deleted =:deleted");
								  query1.setParameter("treatmentId", master.getTreatmentId());
								  query1.setParameter("patientId", master.getPatientId());
								  query1.setParameter("testId", testId);
								  query1.setParameter("deleted", "N");
								//Long count1 = (Long)query1.uniqueResult();
								Integer count1 = ((Number)query1.uniqueResult()).intValue();
							
								if(count1 > 0)
									test.setIsMatch("Y");
								else
									test.setIsMatch("N");
								
								test.setSampleId((Integer)row.get("sampleId"));
								test.setContainerId((Integer)row.get("containerId"));
								test.setIdTest((Integer)row.get("idTest"));
								test.setTestName((String)row.get("testName"));
								test.setVolume((String)row.get("volume"));
								test.setFasting((String)row.get("fasting"));
								test.setTurnAroundTime((String)row.get("tat"));
								test.setTempratureSensitive((String)row.get("tempSensitive"));
								test.setMinTemp((String)row.get("minTemp"));
								test.setMaxTemp((String)row.get("maxTemp"));
								test.setTimeSensitive((String)row.get("timeSensitive"));
								test.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
								test.setDrugSensitivity((String)row.get("drugSensitivity"));
								test.setIsNabl((String)row.get("nabl"));
								test.setProcessAtOutlab((String)row.get("outlab"));
								test.setHeight((String)row.get("height"));
								test.setWeight((String)row.get("weight"));
								test.setUrineVolume((String)row.get("urineVolume"));
								test.setPrerequisite((String)row.get("prerequisite"));
								test.setLmpStatus((String)row.get("lmpStatus"));
								test.setProfile_outlab_Flag(process_outlab);
								
								labTestList.add(test);
							}
							
	
					}else {
						
						LabTestDTO test2 = new LabTestDTO();
						test2.setCallFrom("Profile Not Configured In LIS");
						labTestList1.add(test2);
					    dto.setLabTestList(labTestList1);
						return dto;
					}					
				}	
				dto.setLabTestList(labTestList);
			}
			//END LIS Test
		}
		return dto;
	}catch (Exception e) {
			e.printStackTrace();
			log.error("getPathologyPreDetails()...Error :"+e);
		}
		return null;
	}

	@Override
	public boolean collectionRecord(String idList,String callform, HttpServletRequest request,String meeshaFlow,String collectionTime,String SampleCollected) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
			
		    if(callform.equals("Allrecord")){
				String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=3";
				Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
				Integer result = ((Number)query12.uniqueResult()).intValue();
				
				result++;
				
				List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				for(int i = 0; i < myList.size(); i++) {
					   
					numbers.add(Integer.parseInt(myList.get(i)));   
					   
				    /*String sqlAdvc = "SELECT ifnull(b.business_type,0) as businessType,ifnull(b.amount,0) as amount,ifnull(b.customer_id,0) as customer_id, ifnull(bm.payment_flag,'0') as paymentFlag FROM ehat_bill_details b join pathology_sample_wise_master ps on(b.bill_details_id = ps.bil_det_id) left join business_master_new bm on(b.customer_id = bm.id) where ps.id = "+ Integer.parseInt(myList.get(i));
					Query advcQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlAdvc);
					advcQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> listAdvc = advcQuery.list();	
					for(Map<String, Object> row : listAdvc){
						
						int businessType = ((Number)row.get("businessType")).intValue();
						if(businessType == 1) {
							
							String customerType = (String)row.get("paymentFlag");
							if(customerType.equalsIgnoreCase("prepaid")) {
								
								double amount = (Double)row.get("amount");
								int customerId = ((Number)row.get("customer_id")).intValue();
								
								String sqlCy="select ifnull(max(cc.cycle_id),0) as id from cycle_count_master cc where cc.customer_id="+customerId+" and cc.deleted='N' ";
								Query cyQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlCy);
								int cycleId = ((Number)cyQuery.uniqueResult()).intValue();
								
								if(cycleId > 0) {
								
									CycleCountDto objCount = (CycleCountDto) sessionfactory.getCurrentSession().get(CycleCountDto.class, cycleId);
									objCount.setConsumedAmount(objCount.getConsumedAmount() + amount);
									objCount.setRemainAmount(objCount.getRemainAmount() - amount);
								}							
							}
						}
					}*/
				}
				
			    String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, acceptedDateTime =:acceptedDateTime, acceptedby =:acceptedby where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
			    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    
			    query.setParameter("acceptedDateTime", new Date(new java.util.Date().getTime()));
			    query.setParameter("acceptedby", userId);
			    query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", 3);
				query.setParameter("sampleCount", result);
				query.executeUpdate();
		    	
			}else{
				String[] masterId = idList.split("-");
				
				for(String ids : masterId) {
					String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=2";
					Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
					Integer result = ((Number)query12.uniqueResult()).intValue();
						
					result++;
							
					List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
					ArrayList<Integer> numbers = new ArrayList<Integer>();		
				
					for(int i = 0; i < myList.size(); i++) {
					   numbers.add(Integer.parseInt(myList.get(i)));   
					}
														
					SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
					String date = formatter.format(new java.util.Date());
					
					Integer uId = (Integer) session.getAttribute("uId");	    
				//String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, collecteddatetime =:collecteddatetime, collectedBy =:collectedBy where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
					
					// updated by Rohini Ambhore 
					String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, collecteddatetime =:collecteddatetime, collectedBy =:collectedBy,collectionTime =:collectionTime, collectionDate =:collectionDate,sampleCollectedAt =:sampleCollectedAt where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
					Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    
						  query.setParameter("collecteddatetime", new Date(new java.util.Date().getTime()));
						  query.setParameter("collectedBy", userId);
						  query.setParameterList("sampleWiseMasterId", numbers);
						  query.setParameter("teststatus", 2);
						  query.setParameter("sampleCount", result);
						  query.setParameter("collectionTime", collectionTime);
						  query.setParameter("collectionDate", date);
						  query.setParameter("sampleCollectedAt", SampleCollected);
				
					query.executeUpdate();
					
					// update collection time in pathology_sample_wise_master table
				  /*  String sql="UPDATE PathologySampleWiseMaster set  collectionTime =:collectionTime, collectionDate =:collectionDate where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
				    Query query1 = sessionfactory.getCurrentSession().createQuery(sql);
				    query1.setParameter("collectionTime", collectionTime);
				    query1.setParameter("collectionDate", date);
				    query1.setParameterList("sampleWiseMasterId", numbers);
				    query1.executeUpdate();*/
				}
				
			
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean patientTestHold(String id,String phlebotype, HttpServletRequest request) {
		try {
			//char [] a =id.toCharArray();
			
			List<String> myList = new ArrayList<String>(Arrays.asList(id.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			for(int i = 0; i < myList.size(); i++) {
				   numbers.add(Integer.parseInt(myList.get(i)));   
			}
			
			
			HttpSession session = request.getSession();
			Integer uId = (Integer) session.getAttribute("uId");	    
		    String sql1 = "UPDATE PathologySampleWiseMaster set phleboteststatus =:phlebotype where sampleWiseMasterId IN (:sampleWiseMasterId) and unitId =:unitId" ;
		    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
		    query.setParameter("phlebotype", phlebotype);
		    query.setParameterList("sampleWiseMasterId", numbers);
		    query.setParameter("unitId", uId);
			query.executeUpdate();
			  			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@Override
	public List<PathologySampleWiseMaster> getAccessionRecord(String callfrom,String emergencyFlag,HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";
			
			if(userType.equalsIgnoreCase("admin")) {
				if(callfrom.equalsIgnoreCase("all")) {
				     sql="SELECT ps.profile_Id, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status!=8 and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AP")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AC")){
					//sql="SELECT ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=1 and  ps.in_out_house=0 and phlebo_teststatus='H' and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";					
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=1 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AD")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=3 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AR")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AAprocessing")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=5 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AA")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=5 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AAP")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=6 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AO")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 AND ps.in_out_house=1 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
				}	
			}else {
				if(callfrom.equalsIgnoreCase("all")) {
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status!=8 and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AP")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AC")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AD")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AR")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AAprocessing")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AA")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=5 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";				
				}else if(callfrom.equalsIgnoreCase("AAP")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";				
				}else if(callfrom.equalsIgnoreCase("AO")){
					sql="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
				}	
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
				obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPathologistId((Integer)row.get("pathologist_id"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setProfileId((Integer)row.get("profile_Id"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setCenterName((String)row.get("centerName"));
				
				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	
	@Override
	public List<PathologySampleWiseMaster> getProfileAndTestRecord(String Id,String outlabId,
			HttpServletRequest request) {		
		
		List<PathologySampleWiseMaster> ltunit = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> listofprofile = new ArrayList<PathologySampleWiseMaster>();;
		List<PathologySampleWiseMaster> listofTest = null;
		PathologySampleWiseMaster profileObj = null;
		try {		
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql="";
			String id[] = Id.split(",");			    
			
			for(int i = 0; i < id.length; i++) {
				Integer id1 = Integer.parseInt(id[i]);		
			/*	if(Integer.parseInt(outlabId) > 0){
					
					sql="select ps.profile_Id,ps.id,po.test_id from pathology_sample_wise_master ps join pathology_out_lab_test_master po on(ps.sub_service_id = po.test_id) where ps.id="+id1+" and po.out_lab_id="+Integer.parseInt(outlabId)+" and ps.unit_id="+unitId;
				}else{
					sql="select profile_Id,id from pathology_sample_wise_master ps where id="+id1+" and unit_id="+unitId;
				} */ // previous code
				
				 if( Integer.parseInt(outlabId) > 0 &&  id1 > 0) {
					 sql="select ps.profile_Id,ps.id,po.test_id from pathology_sample_wise_master ps join pathology_out_lab_test_master po on(ps.sub_service_id = po.test_id) where ps.id="+id1+" and po.out_lab_id="+Integer.parseInt(outlabId)+" and ps.unit_id="+unitId;
				 }else if(Integer.parseInt(outlabId) > 0 && id1==0 ) {
					 sql="select ps.profile_Id,ps.id,po.test_id from pathology_sample_wise_master ps join pathology_out_lab_test_master po on(ps.sub_service_id = po.test_id) where  po.out_lab_id="+Integer.parseInt(outlabId)+" and ps.test_status=2 and ps.unit_id="+unitId ;
				 }else if(Integer.parseInt(outlabId) == 0 && id1 > 0) {
					 sql="select profile_Id,id from pathology_sample_wise_master ps where id="+id1+" and unit_id="+unitId;
				 }
				
                
				
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				
				for(Map<String, Object> row : list){
					Integer profileId = (Integer)row.get("profile_Id");	
					Integer masterid = (Integer)row.get("id");	
					Query queryprofile = sessionfactory.getCurrentSession().createSQLQuery("CALL fetchprofileNameAndTestId(0,0,:subservice_id,0,0)");
					queryprofile.setParameter("subservice_id",profileId);
					@SuppressWarnings("unchecked")
					List<Object> lstprofile = queryprofile.list();
					for(int j = 0; j < lstprofile.size(); j++) {
						String profileName = (String) lstprofile.get(j);
						String[] profile = profileName.split("-");
						
						Integer profileId1 = Integer.parseInt(profile[0]);
						String profileName1 = profile[1];

						profileObj=new PathologySampleWiseMaster();
						profileObj.setProfileId(profileId1);
						profileObj.setProfileName(profileName1);
						profileObj.setSampleWiseMasterId(masterid);
						listofprofile.add(profileObj);							
					
						// adding list of test name this list							
						listofTest = new ArrayList<PathologySampleWiseMaster>();				
						Query querytest = sessionfactory.getCurrentSession().createSQLQuery("select test_id,test_flag,ifnull(reject_test_reason,'0') rejectId,ifnull(unReject_test_reason,'0') unjectId  from pathology_sample_wise_slave where master_id='"+masterid+"' and profile_id="+profileId1);					
						querytest.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listtest = querytest.list();
						for(Map<String, Object> rs1 : listtest) {		
							Integer testId=(Integer) rs1.get("test_id");
							String test_flag=(String) rs1.get("test_flag");
							String rejectId = (String) rs1.get("rejectId");
							Integer rId=Integer.parseInt(rejectId);
							String unjectId = (String) rs1.get("unjectId");	
							Integer uId=Integer.parseInt(unjectId);
							PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
					  
							SQLQuery resultvalue = sessionfactory.getCurrentSession().createSQLQuery("select t.idTest,t.testName,t.testCode from  pathology_lab_test t  where t.deleted_by='0' and t.idTest="+testId);     
							resultvalue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> resultvaluelist = resultvalue.list();
							for(Map<String, Object> rs3 : resultvaluelist) {		
								testObj.setTestId((Integer) rs3.get("idTest"));
								testObj.setTestName((String) rs3.get("testName"));	
								testObj.setTestcode((String) rs3.get("testCode"));
								testObj.setTestflag(test_flag);						
								testObj.setRejectreason(rId);
								testObj.setUnrejectreason(uId);
								testObj.setMasterid(masterid);
								testObj.setProfileId(profileId1);
								listofTest.add(testObj);
							}							
						}
					}
				}	
				if(list.size() > 0){
					
					profileObj.setTestli(listofTest);
					ltunit.add(profileObj);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ltunit;
		}
		return ltunit;
	}
	@Override
	public String getCountOfTabs(HttpServletRequest request) {
		String counts="";
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			
			if(userType.equalsIgnoreCase("admin")) {
				//String allRecord="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.unit_Id="+unitId+" and  ps.in_out_house=0 group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String allRecord="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status!=8 and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(allRecord);
				Integer countAllRecord = (Integer) query.list().size();
				
				//String accesionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String accesionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				SQLQuery accesionPendingQuery = sessionfactory.getCurrentSession().createSQLQuery(accesionPending);
				Integer countAccesionPending = (Integer) accesionPendingQuery.list().size();
				
				//String accesionDone="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String accesionDone="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=3 and ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				SQLQuery accesionDoneQuery = sessionfactory.getCurrentSession().createSQLQuery(accesionDone);
				Integer countAaccesionDone = (Integer) accesionDoneQuery.list().size();
				
				//String rejectedsample="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String rejectedsample="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				SQLQuery rejectedsampleQuery = sessionfactory.getCurrentSession().createSQLQuery(rejectedsample);
				Integer countRejectedsample= (Integer) rejectedsampleQuery.list().size();
				
				//String collectionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String collectionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				SQLQuery collectionPendingQuery = sessionfactory.getCurrentSession().createSQLQuery(collectionPending);
				Integer countCollectionPending= (Integer) collectionPendingQuery.list().size();
				
				counts=countAllRecord+","+countAccesionPending+","+countAaccesionDone+","+countRejectedsample+","+countCollectionPending;
			}else {
				//String allRecord="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.unit_Id="+unitId+" and  ps.in_out_house=0 group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String allRecord="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status!=8' AND ps.customer_id IN ("+userCustomerId+") and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(allRecord);
				Integer countAllRecord = (Integer) query.list().size();
				
				//String accesionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String accesionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=2' AND ps.customer_id IN ("+userCustomerId+") and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				SQLQuery accesionPendingQuery = sessionfactory.getCurrentSession().createSQLQuery(accesionPending);
				Integer countAccesionPending = (Integer) accesionPendingQuery.list().size();
				
				//String accesionDone="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String accesionDone="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=3' AND ps.customer_id IN ("+userCustomerId+") and ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				SQLQuery accesionDoneQuery = sessionfactory.getCurrentSession().createSQLQuery(accesionDone);
				Integer countAaccesionDone = (Integer) accesionDoneQuery.list().size();
				
				//String rejectedsample="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String rejectedsample="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=4' AND ps.customer_id IN ("+userCustomerId+") and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				SQLQuery rejectedsampleQuery = sessionfactory.getCurrentSession().createSQLQuery(rejectedsample);
				Integer countRejectedsample= (Integer) rejectedsampleQuery.list().size();
				
				//String collectionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and  ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";
				String collectionPending="SELECT count(*) FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=1' AND ps.customer_id IN ("+userCustomerId+") and ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				SQLQuery collectionPendingQuery = sessionfactory.getCurrentSession().createSQLQuery(collectionPending);
				Integer countCollectionPending= (Integer) collectionPendingQuery.list().size();
				
				counts=countAllRecord+","+countAccesionPending+","+countAaccesionDone+","+countRejectedsample+","+countCollectionPending;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return counts;
	}
	
	@Override
	public boolean rejectedInprofiletest(Integer masterid, Integer profileid,Integer testId, String testflag,Integer rejectedResion,String callfrom,HttpServletRequest request) {
		try {			
			String sql = "";
			String rejectflag="";
			
			if(testflag.equals("Y")) {
				rejectflag = "N";
				sql = "UPDATE pathology_sample_wise_slave set test_flag='"	+ rejectflag + "',unReject_test_reason="+ rejectedResion + ",reject_test_reason='0' where profile_Id='" + profileid+ "' and test_id='" + testId + "' and master_id='"+ masterid + "'";
				Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
			}else {
				rejectflag = "Y";
				sql = "UPDATE pathology_sample_wise_slave set test_flag='"+ rejectflag + "',reject_test_reason=" + rejectedResion+ ",unReject_test_reason='0' where profile_Id='" + profileid + "' and test_id='"+ testId + "' and master_id='" + masterid + "'";
				Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();
			}
		}catch(Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public boolean AccessionpatientTestReject(String idList,String remarks,String callfrom,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer userId = (Integer) session.getAttribute("userId1");
			
			if(callfrom.equals("Reject")){
				String[] masterId = idList.split("-");
				for(String ids : masterId) {
					List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
					ArrayList<Integer> numbers = new ArrayList<Integer>();			
					for(int i = 0; i < myList.size(); i++) {
						numbers.add(Integer.parseInt(myList.get(i)));   
					}
					
					Integer countVal = 0;
					String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=4";
					Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);        	 
					Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
							
					countVal = sampleCount + 1;
					
					String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, rejecteddatetime =:rejecteddatetime, rejectedBy =:rejectedBy,remarks =:remarks where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
					Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
						  query4.setParameter("rejecteddatetime", new Date(new java.util.Date().getTime()));
						  query4.setParameter("rejectedBy", userId);
						  query4.setParameter("remarks", remarks);
						  query4.setParameterList("sampleWiseMasterId", numbers);
						  query4.setParameter("teststatus", 4);
						  query4.setParameter("sampleCount", countVal);
						  query4.executeUpdate();
						  
						  updateDeleteFlagForInvoice(numbers, unitId, userId, "LIS");//Added by kishor for delete service from billing when test is rejected.
				}
			}else if(callfrom.equals("BulkAccept")){
				String[] masterId = idList.split("-");
				for(String ids : masterId) {
					List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
					ArrayList<Integer> numbers = new ArrayList<Integer>();			
					for(int i = 0; i < myList.size(); i++) {
						numbers.add(Integer.parseInt(myList.get(i)));   
						
						/*String sqlAdvc = "SELECT ifnull(b.business_type,0) as businessType,ifnull(b.amount,0) as amount,ifnull(b.customer_id,0) as customer_id, ifnull(bm.payment_flag,'0') as paymentFlag FROM ehat_bill_details b join pathology_sample_wise_master ps on(b.bill_details_id = ps.bil_det_id) left join business_master_new bm on(b.customer_id = bm.id) where ps.id = "+ Integer.parseInt(myList.get(i));
						Query advcQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlAdvc);
						advcQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listAdvc = advcQuery.list();	
						for(Map<String, Object> row : listAdvc){
							
							int businessType = ((Number)row.get("businessType")).intValue();
							if(businessType == 1) {
								
								String customerType = (String)row.get("paymentFlag");
								if(customerType.equalsIgnoreCase("prepaid")) {
									
									double amount = (Double)row.get("amount");
									int customerId = ((Number)row.get("customer_id")).intValue();
									
									String sqlCy="select ifnull(max(cc.cycle_id),0) as id from cycle_count_master cc where cc.customer_id="+customerId+" and cc.deleted='N' ";
									Query cyQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlCy);
									int cycleId = ((Number)cyQuery.uniqueResult()).intValue();
									
									if(cycleId > 0) {
									
										CycleCountDto objCount = (CycleCountDto) sessionfactory.getCurrentSession().get(CycleCountDto.class, cycleId);
										objCount.setConsumedAmount(objCount.getConsumedAmount() + amount);
										objCount.setRemainAmount(objCount.getRemainAmount() - amount);
									}							
								}
							}
						}*/
					}
					
					Integer countVal = 0;
					String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=3";
					Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);
					Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
							
					countVal = sampleCount + 1;
					
					String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, acceptedDateTime =:acceptedDateTime, acceptedby =:acceptedby where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
					Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
						  query4.setParameter("acceptedDateTime", new Date(new java.util.Date().getTime()));
						  query4.setParameter("acceptedby", userId);
						  query4.setParameterList("sampleWiseMasterId", numbers);
						  query4.setParameter("teststatus", 3);
						  query4.setParameter("sampleCount", countVal);
						  query4.executeUpdate();
				}
			}else if(callfrom.equals("ReCollection")){
				String[] masterId = idList.split("-");
				for(String ids : masterId) {
					List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
					ArrayList<Integer> numbers = new ArrayList<Integer>();			
					for(int i = 0; i < myList.size(); i++) {
						numbers.add(Integer.parseInt(myList.get(i)));   
					}
					
					Integer countVal = 0;
					String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=9";
					Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);
					Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
							
					countVal = sampleCount + 1;
					
					String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus ,recollectiontime =:recollectiontime, recollectionBy =:recollectionBy,remarks =:remarks  where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
					Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
						  query4.setParameter("recollectiontime", new Date(new java.util.Date().getTime()));
						  query4.setParameter("recollectionBy", userId);
						  query4.setParameter("remarks", remarks);
						  query4.setParameterList("sampleWiseMasterId", numbers);
						  // code added by ROHTI on 10 Oct 2022 for the Recollection flow
						  //query4.setParameter("teststatus", 9);
						  query4.setParameter("teststatus", 2);
						  query4.setParameter("sampleCount", countVal);
						  query4.executeUpdate();
						  
						  updateDeleteFlagForInvoiceOnRecollectAndUnreject(numbers, unitId, userId, "LIS");
				}
			}else if(callfrom.equals("Delete")){
				String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=4";
				Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
				Integer result = ((Number)query12.uniqueResult()).intValue();
					
					result++;
					
					
				List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));   
				}
					
				Integer uId = (Integer) session.getAttribute("uId");	    
				String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, deleteddatetime =:deleteddatetime, deletedBy =:deletedBy,deleted =:deleted where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
				Query query = sessionfactory.getCurrentSession().createQuery(sql1);
				    query.setParameter("deleteddatetime", new Date(new java.util.Date().getTime()));
				    query.setParameter("deletedBy", userId);
				    query.setParameterList("sampleWiseMasterId", numbers);
					query.setParameter("teststatus", 4);
					query.setParameter("deleted", "Y");
					query.setParameter("sampleCount", result);
					query.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	void updateDeleteFlagForInvoice(ArrayList<Integer> numbers,
			Integer unitId, Integer userId,String callform) {

		try {
			String sql3 = "select group_concat(ifnull(bil_det_id,'0')) from pathology_sample_wise_master where deleted ='N' and unit_Id="+ unitId + " and id IN (:id)";
			Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);
			query3.setParameterList("id", numbers);
			String billDetailsIds = ((String) query3.uniqueResult()).toString();
			
			if (!billDetailsIds.equalsIgnoreCase("0")) {
				int a = doctorDeskDaoImpl.deleteservdetails(billDetailsIds,userId, callform);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	void updateDeleteFlagForInvoiceOnRecollectAndUnreject(ArrayList<Integer> numbers,
			Integer unitId, Integer userId,String callform) {
		Session session = null;
		List<BillDetailsDto> list = null;
		try {
			session = sessionfactory.getCurrentSession();
			String sql3 = "select group_concat(ifnull(bil_det_id,'0')) from pathology_sample_wise_master where deleted='N' and unit_Id="+unitId+" and id IN (:id)";
			Query query3 = session.createSQLQuery(sql3);
			query3.setParameterList("id", numbers);
			String billDetailsIds = ((String) query3.uniqueResult()).toString();
			
			String[] ary = billDetailsIds.split(",");
			
			Object[] billDetailIds = new Integer[ary.length];  
			// Creates the integer array. 
			for (int i = 0; i < ary.length; i++){ 
				billDetailIds[i] = Integer.parseInt(ary[i]);  
			}
			
			Criteria criteria = session.createCriteria(BillDetailsDto.class);
			criteria.add(Restrictions.in("billDetailsId", billDetailIds));
			list = criteria.list();
			
			for(BillDetailsDto dto : list) {
				dto.setDeleted("N");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public List<PathologySampleWiseMaster> getRoutinevalueResutl(
			String masterid, Integer treatmentid,
			String patientType,HttpServletRequest request) {	
		//int sexType=0;
		String bothtype="";
		int count=0 ;
		int countFrom=0 ;
		int countspecailcase=0 ;
		String agetyp="";
		int age=0;
		int month=0;
		int days=0;
		String type=null;
		String sex=null;
		String male;
		String female;
		String others;
		
		String sextyp;
		String specialCase="";
		SQLQuery sqlindividual = null;
		String sqlindividualspecailcase = null;
		String sqlindividualcount=null;
		List<PathologySampleWiseMaster> ltunit = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> listofprofile = new ArrayList<PathologySampleWiseMaster>();;
		List<PathologySampleWiseMaster> listofTest = null;
		PathologySampleWiseMaster profileObj = null;
		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			
			SQLQuery patientage = sessionfactory.getCurrentSession().createSQLQuery("select p.age,p.age_months,p.age_days,p.gender,t.special_Case from ehat_patient p,ehat_treatment t where p.Patient_ID=t.Patient_ID and t.Treatment_ID="+treatmentid);     
			patientage.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> patientagelist = patientage.list();
			for (Map<String, Object> row : patientagelist) {		

				age=  (Integer)row.get("age");
	    		month= (Integer) row.get("age_months");
	    		days= (Integer) row.get("age_days");
	    		sex=  (String) row.get("gender");	  
	    		specialCase=  (String) row.get("special_Case");	  
			}
			
			String collectionDateTime = getOldestCollectionDateInString(masterid);
			
			String sql="";
			String id[] = masterid.split(",");	
			
			for (int i = 0; i < id.length; i++) {
				Integer id1 = Integer.parseInt(id[i]);			
	 			sql="select distinct pm.profile_Id,pm.test_status,pm.pathologist_id,pm.kitspec_id,ifnull(pm.profile_comments,' ') as profile_comments,SUBSTR(pm.collected_date, 1, 19) as collecteddate,SUBSTR(pm.accepted_datetime, 1, 19) as accepted_datetime,pm.dispatch_date,pm.dispatch_time,ifnull(pm.template_wise,'') as template_wise,ifnull(pm.machine_name,' ') as machine_name,pm.machine_Id as machine_Id  from pathology_sample_wise_master pm  where pm.id="+id1+" and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid;				
	 			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list)
				{
					  Integer profileId = (Integer)row.get("profile_Id");	
					  Integer teststatus = (Integer)row.get("test_status");					
					  Integer PathologistId = (Integer)row.get("pathologist_id");	
					  String kitspecId	 = (String)row.get("kitspec_id");	
					  //String collecteddate = (String)row.get("collecteddate");	
					  String accepteddatetime = (String)row.get("accepted_datetime");	
					  
					  String dispatchDate = (String)row.get("dispatch_date");	
					  String dispatchTime = (String)row.get("dispatch_time");
					  String profilecomments = (String)row.get("profile_comments");
					  String templateWise = (String)row.get("template_wise");
					  String machineName = (String)row.get("machine_name");
					  Integer machineId = (Integer)row.get("machine_Id");	
				
	        	  // adding list of Profile name this list	
				 listofprofile = new ArrayList<PathologySampleWiseMaster>();															
				 Query queryprofile = sessionfactory.getCurrentSession().createSQLQuery("CALL processingRoutineResultprofileTestId(:id,0)");
				 queryprofile.setParameter("id",profileId);
				 @SuppressWarnings("unchecked")
				 List<Object> lstprofile = queryprofile.list();
				 for (int j = 0; j < lstprofile.size(); j++) 				 
                {
						String profileName = (String) lstprofile.get(j);
						String[] profile = profileName.split("~");

						Integer profileId1 = Integer.parseInt(profile[0]);
						String profileName1 = profile[1];
						
						String applyformula = profile[4];
                       // System.out.println(applyformula+"applyformula");
                        
						profileObj = new PathologySampleWiseMaster();
						profileObj.setProfileId(profileId1);
						profileObj.setProfileName(profileName1);
						profileObj.setApplyformula(applyformula);
						profileObj.setTeststatus(teststatus);
						profileObj.setPathologistId(PathologistId);
						profileObj.setKitSpecId(kitspecId);
						profileObj.setCollecteddate(collectionDateTime);
						profileObj.setAccpteddate(accepteddatetime);
						profileObj.setDispatchDate(dispatchDate);
						profileObj.setDispatchTime(dispatchTime);
						profileObj.setComments(profilecomments);
						profileObj.setSampleWiseMasterId(id1);
						profileObj.setTemplateWise(templateWise);
						profileObj.setMachineId(machineId);
						profileObj.setMachineName(machineName);
						
						listofprofile.add(profileObj);

						// adding list of test name this list
						listofTest = new ArrayList<PathologySampleWiseMaster>();
						SQLQuery querytestId = sessionfactory.getCurrentSession().createSQLQuery("SELECT DISTINCT ps.test_id AS test_id, ps.test_result,IFNULL(ps.re_run_result, ' ') AS re_run_result, ps.re_run_flag, ps.test_reason,  ps.test_flag, ps.flag_mark, ps.master_id,  IFNULL(ps.expression, ' ') AS expression, pl.sequence FROM pathology_sample_wise_slave ps INNER JOIN pathology_labprofiletestcomp pl ON pl.idTest = ps.test_id where ps.re_collection='N' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and pl.idprofile="+profileId+" and ps.treatment_id="+treatmentid+" ORDER BY pl.sequence ASC");
						querytestId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listtest = querytestId.list();
						for (Map<String, Object> rs1 : listtest) {		
							
							int sexType=0;
							Integer testId=(Integer) rs1.get("test_id");
							String testResult=(String) rs1.get("test_result");
							String testreason = (String) rs1.get("test_reason");
							String testflag = (String) rs1.get("test_flag");
							String flagmark = (String) rs1.get("flag_mark");
							Integer masteridslave = (Integer) rs1.get("master_id");
							String expression = (String) rs1.get("expression");
							String rerunresult = (String) rs1.get("re_run_result");
							String rerunflag = (String) rs1.get("re_run_flag");

							//System.out.println(expression+"expressionexpression");
							PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
							 
							SQLQuery labformulaquery = sessionfactory.getCurrentSession().createSQLQuery("select expTestId from labformula where formStatus='Y' and  resultTestId="+testId);
							labformulaquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> listlabformula = labformulaquery.list();
								for (Map<String, Object> rs4 : listlabformula) {								
								    testObj.setObjFormula((String) rs4.get("expTestId"));								    
							}
								
							SQLQuery testresult = sessionfactory.getCurrentSession().createSQLQuery("select valueType from  pathology_lab_test where deleted_by='0' and idTest="+testId);     
							testresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> listtestresult = testresult.list();
							for (Map<String, Object> rs2 : listtestresult) {		
						    
							 String valueType=(String) rs2.get("valueType");
							 
							if(valueType.equals("general"))
							{
								    SQLQuery resultvalue = sessionfactory.getCurrentSession().createSQLQuery("select t.idTest,t.testName,t.test_general,ifnull(m.method_name,'-') as methodname, ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism,ifnull(t.quantitative,'-') as quantitative, ifnull(t.rerun_test,'N') as reruntest,IFNULL(u.unitName, '-') as unitname,ifnull(t.text_flag,'') as text_flag from  pathology_lab_test t left join pathology_labtestmethod m on m.id=t.idtestMethod left join pathology_labunittype u ON u.id = t.unitid_genaral     where t.deleted_by='0' and t.idTest="+testId);     
								    resultvalue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> resultvaluelist = resultvalue.list();
									for (Map<String, Object> rs3 : resultvaluelist) {		
										
										testObj.setTestId((Integer) rs3.get("idTest"));
										testObj.setTestName((String) rs3.get("testName"));
										testObj.setLowvalue((String) rs3.get("test_general"));										
										testObj.setMethodename((String) rs3.get("methodname"));
										testObj.setProvision((String) rs3.get("provision"));
										testObj.setReportingdecimal((String) rs3.get("reporting_decimal"));
										testObj.setDecimalvalue((Integer) rs3.get("decimal_value"));
										testObj.setMicroorganism((String) rs3.get("microorganism"));
										testObj.setQuantitative((String) rs3.get("quantitative"));
										testObj.setTestReRun((String) rs3.get("reruntest"));
										testObj.setUnitNameGenaral((String) rs3.get("unitname"));
										testObj.setTestType(valueType);
										testObj.setTestReRunResult(rerunresult);
										testObj.setExpressionResult(expression);
										testObj.setTestresult(testResult);
										testObj.setDefaultvalue((String) rs3.get("test_general"));
										testObj.setTestreason(testreason);										
										testObj.setApplyformula(applyformula);
										testObj.setRejecttestflag(testflag);
										testObj.setFlagmark(flagmark);
										testObj.setMasterid(masteridslave);
										testObj.setTextFlag((String) rs3.get("text_flag"));
										
										listofTest.add(testObj);
									}								 
							 }else if(valueType.equals("individual"))
							 {
								 //Start - Added by kishor For calculate Toatal mmonths from age.
								 
								 Integer ageInMonths= ((age * 12) + month);								
								
								
								 //Added by kishor For calculate Toatal days from age.
								 int dobYear = age;	 
								 int dobMonth = month; 
								 int dobDay = days;

								 LocalDate now = LocalDate.now();
								 LocalDate dob = now.minusYears(dobYear).minusMonths(dobMonth).minusDays(dobDay);

								 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
															
								 
								 String patientbirthDate = dob.format(formatter).toString();
								
								 
								 String[] patientBirthDatee = patientbirthDate.split("/");

								 	Integer d = Integer.parseInt(patientBirthDatee[0]);
									Integer m = Integer.parseInt(patientBirthDatee[1]);
									Integer y = Integer.parseInt(patientBirthDatee[2]);
							
								 LocalDate birthDate = LocalDate.of(y,m,d);
								 long ageInDays = ChronoUnit.DAYS.between(birthDate, now);
								
								 String ageTypeSplit="";
								 SQLQuery findAgeIn = sessionfactory.getCurrentSession().createSQLQuery("select distinct age_in from pathology_labtestnormalvalue where matser_id='"+testId+"'  and machine_flag='Y' and deleted='N' order by age_in asc ");     
								 findAgeIn.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								 List<Map<String, Object>> findAgeInList = findAgeIn.list();
								 for (Map<String, Object> findAgeInList1 : findAgeInList) {	
									  
										ageTypeSplit=(String) findAgeInList1.get("age_in");
										
										if(ageTypeSplit.equals("1"))
										{
											bothtype = "select count(sexType) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+"' and sexType='4' and matser_id='"+testId+"' and age_in="+ageTypeSplit+" and machine_flag='Y' and deleted='N' ";									    
											sexType = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(bothtype).uniqueResult()).intValue();	
										
										}else if(sexType==0 && ageTypeSplit.equals("2")){
											
											bothtype = "select count(sexType) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+"' and sexType='4' and matser_id='"+testId+"' and age_in="+ageTypeSplit+" and machine_flag='Y' and deleted='N' ";									    
											sexType = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(bothtype).uniqueResult()).intValue();	
											
										}else if(sexType==0 && ageTypeSplit.equals("3")){
											
											bothtype = "select count(sexType) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+"' and sexType='4' and matser_id='"+testId+"' and age_in="+ageTypeSplit+" and machine_flag='Y' and deleted='N' ";									    
											sexType = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(bothtype).uniqueResult()).intValue();	
											
										}						 
								 }
								 
								// age ageInMonths ageInDays
						    							   	
								if(sexType>0 && !sex.equalsIgnoreCase("Other")){	//Both gender type																	 
									     
						    			sextyp = "4";																			
									     if (age != 0) {									    	 
											    agetyp = "1";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N'  and  sexType='" + sextyp + "' ";
											    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
											    if(count > 0){
											    	countFrom=1;
											    }
											   // System.err.println("Couunttt age = "+count+" countFrom= "+countFrom);
											    
										    } if(count == 0)
											{
												// if (month != 0) {									    	 
												if (ageInMonths != 0) {
													    agetyp = "2";
													    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and  sexType='" + sextyp + "' ";
													    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
													    if(count > 0){
													    	countFrom=2;
													    }
													   // System.err.println("Couunttt months = "+count+" countFrom= "+countFrom);	

												} if(count == 0)
												 {
													 if (ageInDays != 0) {									    	 
														    agetyp = "3";
														    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and machine_flag='Y' and deleted='N' and  sexType='"+sextyp+"' ";
														    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
														    
														    if(count > 0){
														    	countFrom=3;
														    }
														    //System.err.println("Couunttt Days= "+ count +" countFrom= "+countFrom);
													 }
												 }											
											}
										  // System.err.println("Couunttt = "+count+ " countFrom= "+countFrom);
										    //count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
										    
										   if (count > 0) {

												if (count > 1) {
													
													if (countFrom == 1) {

														if (age != 0) {
															
														  agetyp = "1";
														  if (month != 0) {														  													  
									    				
															  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
														
															  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				  
															  if(countspecailcase > 0)								    				   
															  {														
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest          FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest" );																    				   
															  }else								    				    
															  {														 
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );																		    				   
															  }	
									    				 
														     
															  if (days != 0) {
														    	 
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
																	
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
											    				   
																  if(countspecailcase > 0)										    				    
																  {															   
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and   n.matser_id="+testId+" group by t.idTest"  );											    											    				    
																  }else										    				    
																  {															  
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );											    																
																  }														
															  }
														
														  } else {								    				 
															
															  if (days != 0) {	
																
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
																
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
										    				   
																  if(countspecailcase > 0)									    				    
																  {														    
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest           FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );									    				    
																  }else									    				    
																  {														    	
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );															
																  }														
															  }													
														  }if (month == 0 && days == 0) {	
									    			    
															  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
														
															  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				    
															  if(countspecailcase > 0)							    				    
															  {												    	
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );								    			 							    				    
															  }else							    				    
															  {												    	
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );								    			 														
															  }
															}
														}
													} else if (countFrom == 2) {// Month wise data fetch
														if (ageInMonths != 0) {												     
														
															agetyp = "2";																																						
															if (days != 0) {
														
																sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
														
																countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				  			if(countspecailcase > 0)							    				    
																{												    	
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression  ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );							    				   
																}else
								    				            {												    	
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );							    				    
								    				            }	
													  
															}else												
															{															
																sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
														
																countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				    
																if(countspecailcase > 0)							    				   
																{												    	
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression  ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ month+ "' and n.lab_toage>='"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );							    				   
																}else							    				    
																{												    	
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression  ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ month+ "' and n.lab_toage>='"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );
																}
															}
														}
													}	else if (countFrom == 2) {// Month wise data fetch
																if (ageInMonths != 0) {
													
																agetyp = "3";
																									
																sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ days+ "' and n.lab_toage>'"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													
																countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				   
																if(countspecailcase > 0)						    				   
																{											    	
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value  ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );						    				   
																}else						    				    
																{											    	
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value  ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );
															}

														}
													}

												} else {
										    		 if(countFrom == 1){//Year wise data fetch
										    			 
										    			 if (age != 0) {									    	 
															    agetyp = "1";
															    
															     sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
																 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
										    				     if(countspecailcase > 0)
										    				     {
																	    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );										 
				 
										    				     }else
										    				     {
																	    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );										 

										    				     }	 
											    			}
										    		 }else if(countFrom == 2){//Month wise data fetch
										    			 
										    			 if (ageInMonths != 0) {									    	 
																agetyp = "2";

															     sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
																 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
										    				     if(countspecailcase > 0)
										    				     {
																	   sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest     FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   

										    				     }else{
																	    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   
					    	 
										    				     }
											    				}
										    		 }else if(countFrom == 3){//days wise data fetch
										    			 
										    			 if (ageInDays != 0) {									    	 
														        agetyp = "3";
														        sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
																 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
										    				     if(countspecailcase > 0)
										    				     {
																        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

										    				     }else
										    				     {
																        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId +" group by t.idTest" );

										    				     }	 											
														}
										    		 }
										    	}
									    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
												 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
												 for (Map<String, Object> rs3 : sqlindividuallist) {		
														
													    testObj.setTestId((Integer) rs3.get("idTest"));
														testObj.setTestName((String) rs3.get("testName"));																																									
														testObj.setLowvalue((String) rs3.get("lowerVal"));
														testObj.setHighvalue((String) rs3.get("upperVal"));
														testObj.setUnitname((String) rs3.get("unitname"));												
														testObj.setMethodename((String) rs3.get("methodName"));
														testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
														
														testObj.setLabcl((String) rs3.get("labcl"));
														testObj.setLabch((String) rs3.get("labch"));
														testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
														testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
														testObj.setProvision((String) rs3.get("provision"));
														testObj.setExpression((String) rs3.get("expression"));
														testObj.setReportingdecimal((String) rs3.get("reporting_decimal"));
														testObj.setDecimalvalue((Integer) rs3.get("decimal_value"));
														testObj.setMicroorganism((String) rs3.get("microorganism"));
														testObj.setExpressionResult(expression);
														testObj.setQuantitative((String) rs3.get("quantitative"));
														testObj.setTestReRun((String) rs3.get("reruntest"));
														testObj.setTestReRunResult(rerunresult);
														testObj.setApplyformula(applyformula);
														testObj.setTestresult(testResult);
														testObj.setTestreason(testreason);
														testObj.setRejecttestflag(testflag);
														testObj.setFlagmark(flagmark);
														testObj.setMasterid(masteridslave);
														testObj.setTestType(valueType);
														listofTest.add(testObj);
												}											
								
										   }						     
						    		}else if (sex.equalsIgnoreCase("Male")) {																		 
								      sextyp = "1";																			
								     
								      if (age != 0) {									    	 
									      agetyp = "1"; 									   
								    	  sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+"' and  matser_id='"+testId+"' and age_in='"+agetyp+"' and machine_flag='Y' and deleted='N' and  sexType='"+sextyp+"' ";									    
								    	  count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();									    
								    	  if(count > 0){									    	
								    		  countFrom=1;									    
								    	  }									  																	   
								      
								      } if(count == 0)								
								      {
										// if (month != 0) {									    	 										
								    	  if (ageInMonths != 0) {
											    agetyp = "2";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and  machine_flag='Y' and deleted='N'  and sexType='" + sextyp + "' ";
											    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
											    if(count > 0){
											    	countFrom=2;
											    }
											 //  System.err.println("Couunttt months = "+count+" countFrom= "+countFrom);	

										} if(count == 0)
										 {
											 if (ageInDays != 0) {									    	 
												    agetyp = "3";
												    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and  machine_flag='Y' and deleted='N' and sexType='"+sextyp+"' ";
												    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
												    
												    if(count > 0){
												    	countFrom=3;
												    }
												    //System.err.println("Couunttt Days= "+ count +" countFrom= "+countFrom);
											 }
										 }											
									}
								    // System.err.println("Couunttt = "+count+ " countFrom= "+countFrom);
								    //count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();							   								   
										if (count > 0) {
											
											if (count > 1) {

												if (countFrom == 1) {
													
													if (age != 0) {

														agetyp = "1";
														if (month != 0) {
								    				 							    				     
								    				     sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
								    				     countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				     if(countspecailcase > 0)
								    				     {
														     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest   FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and  n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId +" group by t.idTest" );												     
								    				     }else
								    				     {
														     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );												     

								    				     }	 
													    
													     if (days != 0) {
													    	 
													    	 sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
									    				     countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     if(countspecailcase > 0)
									    				     {
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );							    	
 
									    				     }else{
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value  ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );											    	
 
									    				     }
													    }	
													     
								    			 }else {								    				 
														if (days != 0) {
															 sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
															 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     if(countspecailcase > 0)
									    				     {
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest     FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest" );

									    				     }else{
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );
 
									    				     }
														}
								    		 }if (month == 0 && days == 0) {
								    			 
								    			 sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
												 
								    			 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				     
								    			 if(countspecailcase > 0)
						    				     {
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );								    			 
 
						    				     }else
						    				     {
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression  ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest     FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N'  and  n.matser_id="+testId+" group by t.idTest"  );								    			 

															}
														}
													}
												} else if (countFrom == 2) {// Month wise data fetch
													if (ageInMonths != 0) {
														
														agetyp = "2";
														
														if (days != 0) {
													 
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     
															if(countspecailcase > 0)						    				     
															{													   
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,   IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );							    				    
															}else
							    				     
															{
													   
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,   IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );																					}
												  
														} else {
												 
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
												
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				     
															if(countspecailcase > 0)
						    				     
															{
												    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );
						    				    
															}else
						    				    
															{
												    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );
															
															}
														
														}
													
													}
												
												} else if(countFrom == 3){
												
													if (ageInDays != 0) {
												
														agetyp = "3";												
												 
														sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
												 
														countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();						    				    
														if(countspecailcase > 0)						    				     
														{
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  ); 						    				    
														}else						    				     
														{												    	
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N'  and  n.matser_id="+testId+" group by t.idTest"  ); 	 													
														}												
													}											  
												}											
											} else
								    	 
											{
								    		 if(countFrom == 1){//Year wise data fetch
								    										    			
								    			 if (age != 0) {									    	 
													 agetyp = "1";													    													   
								    				 sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;														
								    				 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();								    				  
								    				 if(countspecailcase > 0)								    				  
								    				 {													
								    					 sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );										 								    				  
								    				 }else							    				  
								    				 {													
								    					 sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );										 
								    					 
								    				     }	 									    			
								    			 }								    		 
								    		 }else if(countFrom == 2){//Month wise data fetch								    			 								    			
								    			 if (ageInMonths != 0) {									    	 
														agetyp = "2";													    
														sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;														
														countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();								    				    
														if(countspecailcase > 0)								    				     
														{														
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest     FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   								    				     
														}else{
														
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   			    	 																				    				    
														}									    				
								    			 }								    		
								    		 }else if(countFrom == 3){//days wise data fetch								    			 								    			 
								    			 if (ageInDays != 0) {									    	 											      
								    				 agetyp = "3";											       
								    				 sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;																						    				
								    				 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();								    				   
								    				 if(countspecailcase > 0)								    				    
								    				 {
														        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );								    				    
								    				 }else								    				   
								    				 {
														        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );														
								    				 }												
								    			 }												
								    		 }											
										}
								    	 
								    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
											 for (Map<String, Object> rs3 : sqlindividuallist) {		
													
												    testObj.setTestId((Integer) rs3.get("idTest"));
													testObj.setTestName((String) rs3.get("testName"));																																									
													testObj.setLowvalue((String) rs3.get("lowerVal"));
													testObj.setHighvalue((String) rs3.get("upperVal"));
													testObj.setUnitname((String) rs3.get("unitname"));												
													testObj.setMethodename((String) rs3.get("methodName"));
													testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
													
													testObj.setLabcl((String) rs3.get("labcl"));
													testObj.setLabch((String) rs3.get("labch"));
													testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
													testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
													testObj.setProvision((String) rs3.get("provision"));
													testObj.setReportingdecimal((String) rs3.get("reporting_decimal"));
													testObj.setDecimalvalue((Integer) rs3.get("decimal_value"));
													testObj.setMicroorganism((String) rs3.get("microorganism"));
													testObj.setExpression((String) rs3.get("expression"));
													testObj.setQuantitative((String) rs3.get("quantitative"));
													testObj.setTestReRun((String) rs3.get("reruntest"));
													testObj.setTestReRunResult(rerunresult);
													testObj.setExpressionResult(expression);
													testObj.setApplyformula(applyformula);
													testObj.setTestresult(testResult);
													testObj.setTestreason(testreason);
													testObj.setRejecttestflag(testflag);
													testObj.setFlagmark(flagmark);
													testObj.setMasterid(masteridslave);
													testObj.setTestType(valueType);
													listofTest.add(testObj);
											}

										

									}

								}if (sex.equalsIgnoreCase("Female")) {																		 
								     sextyp = "2";																			
								     if (age != 0) {									    	 
										    agetyp = "1";
										    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and  sexType='" + sextyp + "' ";
										    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
										    if(count > 0){
										    	countFrom=1;
										    }
										    //System.err.println("Couunttt age = "+count+" countFrom= "+countFrom);
										    
									    } if(count == 0)
										{
											// if (month != 0) {									    	 
											if (ageInMonths != 0) {
												    agetyp = "2";
												    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and  sexType='" + sextyp + "' ";
												    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
												    if(count > 0){
												    	countFrom=2;
												    }
												   // System.err.println("Couunttt months = "+count+" countFrom= "+countFrom);	

											} if(count == 0)
											 {
												 if (ageInDays != 0) {									    	 
													    agetyp = "3";
													    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and machine_flag='Y' and deleted='N' and  sexType='"+sextyp+"' ";
													    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
													    
													    if(count > 0){
													    	countFrom=3;
													    }
													    //System.err.println("Couunttt Days= "+ count +" countFrom= "+countFrom);
												 }
											 }											
										}
									   //System.err.println("Couunttt = "+count+ " countFrom= "+countFrom);
									    //count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
									    
										if (count > 0) {

											if (count > 1) {
												
												if (countFrom == 1) {

													if (age != 0) {
														
													  agetyp = "1";
													  if (month != 0) {
								    				 
								    				 sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     if(countspecailcase > 0)
							    				     {
													     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism  ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y'  and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );												    

							    				     }else
							    				     {
													     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism  ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );												    

							    				     }	 
													     if (days != 0) {
													    	 
													    	 sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
															 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     if(countspecailcase > 0)
									    				     {
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											    	

									    				     }else
									    				     {
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );											    	

									    				     }
													    	 
													    }	
													     
								    			 }else  {								    				 
														if (days != 0) {
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				    if(countspecailcase > 0)
									    				    {
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );
									    				    }else
									    				    {
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

									    				    }	 
															
														}
								    		 }if (month == 0 && days == 0) {	
								    			    sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				    if(countspecailcase > 0)
							    				    {
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and   n.matser_id="+testId+" group by t.idTest"  );								    			 

							    				    }else
							    				    {
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );								    			 
													}
												}
											}
										} else if (countFrom == 2) {// Month wise data fetch
											if (ageInMonths != 0) {
												agetyp = "2";												
												if (days != 0) {
													sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				    if(countspecailcase > 0)
							    				    {
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );
							    				    }else
							    				    {
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

							    				    }
												}else
												{	
												sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
												countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				    if(countspecailcase > 0)
						    				    {
											    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism  ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );

						    				    }else
						    				    {
											    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

						    					}
												}
											}
										} else if(countFrom == 3){
										   
											if (ageInDays != 0) {
												agetyp = "3";
												sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
												countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				    if(countspecailcase > 0)
						    				    {
											    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

						    				    }else
						    				    {
											    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

														}

													}
												}

											} else
								    	 {
								    		 if(countFrom == 1){//Year wise data fetch
								    			 
								    			 if (age != 0) {									    	 
													    agetyp = "1";
													    
													     sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
														 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				     if(countspecailcase > 0)
								    				     {
															    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );										 
		 
								    				     }else
								    				     {
															    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );										 

								    				     }	 
									    			}
								    		 }else if(countFrom == 2){//Month wise data fetch
								    			 
								    			 if (ageInMonths != 0) {									    	 
														agetyp = "2";

													     sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
														 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				     if(countspecailcase > 0)
								    				     {
															   sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest     FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   

								    				     }else{
															    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   
			    	 
								    				     }
									    				}
								    		 }else if(countFrom == 3){//days wise data fetch
								    			 
								    			 if (ageInDays != 0) {									    	 
												        agetyp = "3";
												        sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
														 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				     if(countspecailcase > 0)
								    				     {
														        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

								    				     }else
								    				     {
														        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );

								    				     }	 											
												}
								    		 }
								    	}
								    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
											 for (Map<String, Object> rs3 : sqlindividuallist) {		
													
												    testObj.setTestId((Integer) rs3.get("idTest"));
													testObj.setTestName((String) rs3.get("testName"));																																									
													testObj.setLowvalue((String) rs3.get("lowerVal"));
													testObj.setHighvalue((String) rs3.get("upperVal"));
													testObj.setUnitname((String) rs3.get("unitname"));												
													testObj.setMethodename((String) rs3.get("methodName"));
													testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
													
													testObj.setLabcl((String) rs3.get("labcl"));
													testObj.setLabch((String) rs3.get("labch"));
													testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
													testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
													testObj.setProvision((String) rs3.get("provision"));
													testObj.setExpression((String) rs3.get("expression"));
													testObj.setReportingdecimal((String) rs3.get("reporting_decimal"));
													testObj.setDecimalvalue((Integer) rs3.get("decimal_value"));
													testObj.setMicroorganism((String) rs3.get("microorganism"));
													testObj.setExpressionResult(expression);
													testObj.setQuantitative((String) rs3.get("quantitative"));
													testObj.setTestReRun((String) rs3.get("reruntest"));
													testObj.setTestReRunResult(rerunresult);
													//testObj.setExpression(expression);
													testObj.setApplyformula(applyformula);
													testObj.setTestresult(testResult);
													testObj.setTestreason(testreason);
													testObj.setRejecttestflag(testflag);
													testObj.setFlagmark(flagmark);
													testObj.setMasterid(masteridslave);
													testObj.setTestType(valueType);
													listofTest.add(testObj);
											}

										

									}

								}if (sex.equalsIgnoreCase("Other")) {	//other gender type																	 
								     sextyp = "3";																			
								     if (age != 0) {									    	 
										    agetyp = "1";
										    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N'  and  sexType='" + sextyp + "' ";
										    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
										    if(count > 0){
										    	countFrom=1;
										    }
										   // System.err.println("Couunttt age = "+count+" countFrom= "+countFrom);
										    
									    } if(count == 0)
										{
											// if (month != 0) {									    	 
											if (ageInMonths != 0) {
												    agetyp = "2";
												    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and  sexType='" + sextyp + "' ";
												    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
												    if(count > 0){
												    	countFrom=2;
												    }
												   // System.err.println("Couunttt months = "+count+" countFrom= "+countFrom);	

											} if(count == 0)
											 {
												 if (ageInDays != 0) {									    	 
													    agetyp = "3";
													    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and machine_flag='Y' and deleted='N' and  sexType='"+sextyp+"' ";
													    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
													    
													    if(count > 0){
													    	countFrom=3;
													    }
													    //System.err.println("Couunttt Days= "+ count +" countFrom= "+countFrom);
												 }
											 }											
										}
									  // System.err.println("Couunttt = "+count+ " countFrom= "+countFrom);
									    //count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
									    
									   if (count > 0) {

											if (count > 1) {
												
												if (countFrom == 1) {

													if (age != 0) {
														
													  agetyp = "1";
													  if (month != 0) {														  													  
								    				
														  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													
														  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				  
														  if(countspecailcase > 0)								    				   
														  {														
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest          FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );																    				   
														  }else								    				    
														  {														 
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );																		    				   
														  }	
								    				 
													     
														  if (days != 0) {
													    	 
															  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
																
															  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
										    				   
															  if(countspecailcase > 0)										    				    
															  {															   
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and   n.matser_id="+testId+" group by t.idTest"  );											    											    				    
															  }else										    				    
															  {															  
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );											    																
															  }														
														  }
													
													  } else {								    				 
														
														  if (days != 0) {	
															
															  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
															
															  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				   
															  if(countspecailcase > 0)									    				    
															  {														    
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest           FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );									    				    
															  }else									    				    
															  {														    	
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );															
															  }														
														  }													
													  }if (month == 0 && days == 0) {	
								    			    
														  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													
														  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				    
														  if(countspecailcase > 0)							    				    
														  {												    	
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );								    			 							    				    
														  }else							    				    
														  {												    	
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );								    			 														
														  }
														}
													}
												} else if (countFrom == 2) {// Month wise data fetch
													if (ageInMonths != 0) {												     
													
														agetyp = "2";																																						
														if (days != 0) {
													
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				  			if(countspecailcase > 0)							    				    
															{												    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression  ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );							    				   
															}else
							    				            {												    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest         FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );							    				    
							    				            }	
												  
														}else												
														{															
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
													
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				    
															if(countspecailcase > 0)							    				   
															{												    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression  ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ month+ "' and n.lab_toage>='"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );							    				   
															}else							    				    
															{												    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression  ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ month+ "' and n.lab_toage>='"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId +" group by t.idTest" );
															}
														}
													}
												}	else if (countFrom == 2) {// Month wise data fetch
															if (ageInMonths != 0) {
												
															agetyp = "3";
																								
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ days+ "' and n.lab_toage>'"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
												
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				   
															if(countspecailcase > 0)						    				   
															{											    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value  ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );						    				   
															}else						    				    
															{											    	
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value  ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest        FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );
														}

													}
												}

											} else {
									    		 if(countFrom == 1){//Year wise data fetch
									    			 
									    			 if (age != 0) {									    	 
														    agetyp = "1";
														    
														     sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
															 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     if(countspecailcase > 0)
									    				     {
																    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );										 
			 
									    				     }else
									    				     {
																    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest       FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );										 

									    				     }	 
										    			}
									    		 }else if(countFrom == 2){//Month wise data fetch
									    			 
									    			 if (ageInMonths != 0) {									    	 
															agetyp = "2";

														     sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
															 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     if(countspecailcase > 0)
									    				     {
																   sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest     FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   

									    				     }else{
																    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,'-') as quantitative ,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );											   
				    	 
									    				     }
										    				}
									    		 }else if(countFrom == 3){//days wise data fetch
									    			 
									    			 if (ageInDays != 0) {									    	 
													        agetyp = "3";
													        sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;
															 countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     if(countspecailcase > 0)
									    				     {
															        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId+" group by t.idTest"  );

									    				     }else
									    				     {
															        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.reporting_decimal, '-') as reporting_decimal,t.decimal_value ,ifnull(t.microorganism,'-') as microorganism ,ifnull(n.expression,' ') as expression ,ifnull(t.quantitative,'-') as quantitative,ifnull(t.rerun_test,'N') as reruntest      FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId+" group by t.idTest"  );

									    				     }	 											
													}
									    		 }
									    	}
								    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
											 for (Map<String, Object> rs3 : sqlindividuallist) {		
													
												    testObj.setTestId((Integer) rs3.get("idTest"));
													testObj.setTestName((String) rs3.get("testName"));																																									
													testObj.setLowvalue((String) rs3.get("lowerVal"));
													testObj.setHighvalue((String) rs3.get("upperVal"));
													testObj.setUnitname((String) rs3.get("unitname"));												
													testObj.setMethodename((String) rs3.get("methodName"));
													testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
													
													testObj.setLabcl((String) rs3.get("labcl"));
													testObj.setLabch((String) rs3.get("labch"));
													testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
													testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
													testObj.setProvision((String) rs3.get("provision"));
													testObj.setExpression((String) rs3.get("expression"));
													testObj.setReportingdecimal((String) rs3.get("reporting_decimal"));
													testObj.setDecimalvalue((Integer) rs3.get("decimal_value"));
													testObj.setMicroorganism((String) rs3.get("microorganism"));
													testObj.setExpressionResult(expression);
													testObj.setQuantitative((String) rs3.get("quantitative"));
													testObj.setTestReRun((String) rs3.get("reruntest"));
													testObj.setTestReRunResult(rerunresult);
													testObj.setApplyformula(applyformula);
													testObj.setTestresult(testResult);
													testObj.setTestreason(testreason);
													testObj.setRejecttestflag(testflag);
													testObj.setFlagmark(flagmark);
													testObj.setMasterid(masteridslave);
													testObj.setTestType(valueType);
													listofTest.add(testObj);
											}									
										}
									}// loop is stop gender wise

								}

							}

						}

					}
						profileObj.setTestli(listofTest);
						ltunit.add(profileObj);
					}
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ltunit;
		}
		
		return ltunit;
	}
	
	
	

	@Override
	public Integer savePrerequisiteInTreatment(String hieghtPupUp, String weightPupUp, String urineValumePupUp,String lmpDatePupUp,
			Integer tId, Integer pId) {
		Integer result=0;
		try {
			double h=Double.parseDouble(hieghtPupUp);
			double w=Double.parseDouble(weightPupUp);
			Session session = sessionfactory.getCurrentSession();
        	String hql = "UPDATE TreatmentDto set height =:hieghtPupUp,weight =:weightPupUp,urineVol =:urineValumePupUp,lmpDate =:lmpDatePupUp WHERE treatmentId =:tid";
			Query qry = session.createQuery(hql);
			qry.setParameter("hieghtPupUp",h); 
			qry.setParameter("weightPupUp",w); 
			qry.setParameter("urineValumePupUp",urineValumePupUp);
			qry.setParameter("lmpDatePupUp",lmpDatePupUp);
			qry.setParameter("tid", tId);
			qry.executeUpdate();
			result=1;
			
		} catch (Exception e) {
			e.printStackTrace();	
			log.error("error for savePrerequisiteInTreatment...."+e.getMessage());
			result=0;
			}
		return result;
	}
	
	@Override
	public String getPageCount(String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		String sql="";
		Integer count = 0;
		if(callFrom.equalsIgnoreCase("phelbotomyPageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.business_type = '2' AND eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.treatment_id ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.business_type = '2' AND ps.customer_id IN ("+userCustomerId+") and eb.cancle='N' and ps.deleted='N' and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.treatment_id ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("accessionPageCount") || callFrom.equalsIgnoreCase("accessionTrackStatusPageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and  ps.in_out_house=0  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and  ps.in_out_house=0  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("accessionPendingPageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}
		}else if(callFrom.equalsIgnoreCase("collectionPendingPageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("accessionDonePageCount") || callFrom.equalsIgnoreCase("processingPageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("rejectedSamplePageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}
		}else if(callFrom.equalsIgnoreCase("authorizationPageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id where  ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}else{
				sql="ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}
		}else if(callFrom.equalsIgnoreCase("reportingPageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=6 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status=6 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("outsourcePageCount")) {
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and  ps.in_out_house=1 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("accessionPathologiestPageCount")){
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id where ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
			}
		}else if(callFrom.equalsIgnoreCase("forcedOutSourcePageCount")){
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status =8  and ps.unit_Id="+unitId+"  AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			}
		}
		
		try{
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			count = (Integer) query.list().size();
			return count.toString();
		}catch(Exception e){
			e.printStackTrace();
			log.error("getPageCount()...Error :"+e);
		}
		return count.toString();
	}
	
	@Override
	public String getBarcodeIdFromSampleWise(Integer patientId,
			Integer treatmentId, Integer sampleTypeId, Integer inOutHouse,
			HttpServletRequest request) {
			
		String result = "";
		Session session = null;
		int count = 0;
		try {
			session = sessionfactory.getCurrentSession();
			List<Integer> testStatus = new ArrayList<>();
				testStatus.add(0);
				testStatus.add(1);
				testStatus.add(2);
				testStatus.add(101);
				testStatus.add(102);
				testStatus.add(111);
				testStatus.add(112);
				
			Query qry = session.createSQLQuery("SELECT IFNULL(ps.test_status, 0) AS test_status, es.sample_type_id, es.bar_code FROM ehat_bill_details es JOIN ehat_subservice eb ON (es.sub_service_id = eb.id) LEFT JOIN pathology_sample_wise_master ps ON (es.bill_details_id = ps.bil_det_id) WHERE es.treatment_id="+treatmentId+" AND es.deleted='N' AND es.cancle='N' AND eb.iscombination='N' AND es.sample_type_id="+sampleTypeId+"");
				
			qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> l = qry.list();
			for(Map<String, Object> row : l){
				if(testStatus.contains(((Number)row.get("test_status")).intValue())) {
					result = (String)row.get("bar_code");
					count++;
				}
			}
				
			if(count <= 0 || (result.trim()).equalsIgnoreCase("")) {
				Query qry2 = session.createSQLQuery("SELECT IFNULL(ps.test_status, 0) AS test_status, es.sample_type_id, es.barcode FROM ehat_other_bill_detail_for_opd es JOIN ehat_subservice eb ON (es.sub_service_id = eb.id) LEFT JOIN pathology_sample_wise_master ps ON (es.bill_details_id = ps.bil_det_id AND es.child_sub_service_id=ps.sub_service_id) WHERE es.treatment_id="+treatmentId+" AND es.deleted='N' AND es.cancle='N' AND eb.iscombination='Y' AND es.sample_type_id="+sampleTypeId+"");
				qry2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> li = qry2.list();
				for(Map<String, Object> row1 : li){
					if(testStatus.contains(((Number)row1.get("test_status")).intValue()))
						result = (String)row1.get("barcode");
				}
			}
		
			/*Criteria criteria = sessionfactory.getCurrentSession().createCriteria(BillDetailsDto.class);
			criteria.createAlias("BillDetailsDto", "p");
			System.out.println(criteria.getAlias());
			//criteria.add(Projections.groupProperty("sampleTypeId"));
			criteria.setProjection(Projections.groupProperty("sampleTypeId"));
			criteria.setProjection(Projections.groupProperty("inOutHouse"));
			criteria.setProjection(Projections.property("barCode"));
			criteria.add(Restrictions.eq("treatmentId",treatmentId));
			criteria.add(Restrictions.eq("patienttId",patientId));
			criteria.add(Restrictions.eq("sampleTypeId",sampleTypeId));
			if(inOutHouse == 2){
				criteria.add(Restrictions.eq("inOutHouse",1));
			}else if(inOutHouse == 1){
				criteria.add(Restrictions.eq("inOutHouse",0));
			}				
			criteria.add(Restrictions.eq("deleted","N"));
			if(criteria.list().size() > 0){
				result=(String) criteria.list().get(0);
			}*/
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getBarcodeIdFromSampleWise...."+e.getMessage());
			result="error";
		}
		return result;
	}

	@Override
	public List<LabPhlebotomyMaster> getpathologistname(
			HttpServletRequest request) {
		List<LabPhlebotomyMaster> PathologistsList = new ArrayList<LabPhlebotomyMaster>();
		try {
			
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("select Doctor_ID,doc_name from doctor where doc_Type = 'Pathologist'");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql.list();
			for (Map<String, Object> rs : listsubservice2) {
				LabPhlebotomyMaster objDocList = new LabPhlebotomyMaster();
				objDocList.setPathologyname((String) rs.get("doc_name"));
				objDocList.setPathologyId((Integer) rs.get("Doctor_ID"));				
				PathologistsList.add(objDocList);
			}
		} catch (Exception e) {
			e.printStackTrace();
			e.getMessage();
		}
		return PathologistsList;
	}

	@Override
	public boolean saveLabTestRoutineValueResult(String id, String statusFlag,
			Integer idPathologist,String kitSpecId,Integer machineId,String SerialNo, String phlebotomyListTestsalve,String profileIdcomments,
			HttpServletRequest request,HttpServletResponse res,String phlebotomysamplemastertable) {
		try {
			
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String CovidReportProfileId =(resourceBundle.getObject("CovidReportProfileId").toString());
			Integer CovidReProfileId=Integer.parseInt(CovidReportProfileId);
			
			String SARSCoV2RTPCR =(resourceBundle.getObject("SARSCoV2RTPCR").toString());
			Integer SARSCoV2RTPCRId=Integer.parseInt(SARSCoV2RTPCR);
			
			String CTVALUEFORCONFIRMATORYGENE =(resourceBundle.getObject("CTVALUEFORCONFIRMATORYGENE").toString());
			Integer CTVALUEFORCONFIRMATORYGENEID=Integer.parseInt(CTVALUEFORCONFIRMATORYGENE);
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer userId = (Integer) session.getAttribute("userId1");
			
			PathologySampleWiseSlave sendtodto = (PathologySampleWiseSlave) ConfigUIJSONUtility.getObjectFromJSON(phlebotomyListTestsalve,PathologySampleWiseSlave.class);
			List<PathologySampleWiseSlave> slaveList = sendtodto.getPathologySampleWiseSlaveList();

			
			String hql = "";
							
			for (PathologySampleWiseSlave obj : slaveList) {
				if(statusFlag.equals("AU"))// sample by save this flag used
                   {
         	                 								
   					List<String> myList = new ArrayList<String>(Arrays.asList(id.split(",")));
   					ArrayList<Integer> numbers = new ArrayList<Integer>();			
   					for(int i = 0; i < myList.size(); i++) {
   						   numbers.add(Integer.parseInt(myList.get(i)));   
   					}
   					
     				String sql1 = "UPDATE PathologySampleWiseMaster set unauthorizeddatetime =:unauthorizeddatetime, unauthorizedBy =:unauthorizedBy, pathologistId=:pathologistId,kitSpecId=:kitSpecId, machineId=:machineId, SerialNo=:SerialNo , profileComments=:profileComments,resultFlag =:resultFlag  where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
   				    Query query = sessionfactory.getCurrentSession().createQuery(sql1);  				    
   				    query.setParameter("unauthorizeddatetime", new Date(new java.util.Date().getTime()));
   				    query.setParameter("unauthorizedBy", userId);
   				    query.setParameterList("sampleWiseMasterId", numbers); 
   				    query.setParameter("pathologistId", idPathologist);
   					query.setParameter("kitSpecId", kitSpecId);
   				    query.setParameter("machineId", machineId);
   				    query.setParameter("SerialNo", SerialNo);
   				    query.setParameter("profileComments", profileIdcomments);
   					//query.setParameter("sampleCount", result);
   				 if(obj.getProfileId() == CovidReProfileId) {
			    	 if(obj.getTestResult().equalsIgnoreCase("Detected") &&  obj.getTestid() == SARSCoV2RTPCRId) {
  				    query.setParameter("resultFlag", "Y");
  				 }else if(obj.getTestResult().equalsIgnoreCase("Not Detected") &&  obj.getTestid() == SARSCoV2RTPCRId){
  					 query.setParameter("resultFlag", "N");
  				 }else if(obj.getFlagMark().equalsIgnoreCase("Positive") &&  obj.getTestid() == CTVALUEFORCONFIRMATORYGENEID){
  					 query.setParameter("resultFlag", "Y");
  				 }else if(obj.getFlagMark().equalsIgnoreCase("Negative") &&  obj.getTestid() == CTVALUEFORCONFIRMATORYGENEID){
  					 query.setParameter("resultFlag", "N");
  				 }
			    }else {
			    	if(obj.getTestResult().equalsIgnoreCase("Positive") || obj.getTestResult().equalsIgnoreCase("Detected")) {
 				    	query.setParameter("resultFlag", "Y");
 				    }else if(obj.getTestResult().equalsIgnoreCase("Negative") || obj.getTestResult().equalsIgnoreCase("Not Detected")){
 				    	query.setParameter("resultFlag", "N");
 				    }else {
 				    	query.setParameter("resultFlag", "NA");
 				    }
			    }
   					query.executeUpdate();
                	     				 
   					hql = "UPDATE pathology_sample_wise_slave set test_result='"+ obj.getTestResult()+ "',test_reason='"+obj.getTestReason()+"',flag_mark='"+obj.getFlagMark()+"',expression='"+obj.getExpression()+"' where profile_id='"+ obj.getProfileId()+ "' and test_id='"+ obj.getTestid() + "' and master_id in("+id+")";
					Query query4 = sessionfactory.getCurrentSession().createSQLQuery(hql);
					query4.executeUpdate();
                	               
                   }else if(statusFlag.equals("AA"))// sample by save and authorized this flag used
                   {          	   
                	 String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where unit_Id="+unitId+" and test_status=5";
          			 Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
          			 Integer result = ((Number)query12.uniqueResult()).intValue();      					
          			 result++;
      					
          			 List<String> myList = new ArrayList<String>(Arrays.asList(id.split(",")));
      					ArrayList<Integer> numbers = new ArrayList<Integer>();			
      					for(int i = 0; i < myList.size(); i++) {
      						   numbers.add(Integer.parseInt(myList.get(i)));   
      						}
      					
      				    String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, authorizeddatetime =:authorizeddatetime, authorizedBy =:authorizedBy,pathologistId=:pathologistId,kitSpecId=:kitSpecId,machineId=:machineId, SerialNo=:SerialNo ,profileComments=:profileComments, resultFlag =:resultFlag  where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
      				    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
      				    
      				    query.setParameter("authorizeddatetime", new Date(new java.util.Date().getTime()));
      				    query.setParameter("authorizedBy", userId);
      				    query.setParameterList("sampleWiseMasterId", numbers);
      					query.setParameter("teststatus", 5);
      					query.setParameter("sampleCount", result);
      					query.setParameter("pathologistId", idPathologist);
      					query.setParameter("kitSpecId", kitSpecId);
      				    query.setParameter("machineId", machineId);
     				    query.setParameter("SerialNo", SerialNo);
     				    query.setParameter("profileComments", profileIdcomments);
     				   if(obj.getProfileId() == CovidReProfileId) {
    				    	 if(obj.getTestResult().equalsIgnoreCase("Detected") &&  obj.getTestid() == SARSCoV2RTPCRId) {
          				    query.setParameter("resultFlag", "Y");
          				 }else if(obj.getTestResult().equalsIgnoreCase("Not Detected") &&  obj.getTestid() == SARSCoV2RTPCRId){
          					 query.setParameter("resultFlag", "N");
          				 }else if(obj.getFlagMark().equalsIgnoreCase("Positive") &&  obj.getTestid() == CTVALUEFORCONFIRMATORYGENEID){
          					 query.setParameter("resultFlag", "Y");
          				 }else if(obj.getFlagMark().equalsIgnoreCase("Negative") &&  obj.getTestid() == CTVALUEFORCONFIRMATORYGENEID){
          					 query.setParameter("resultFlag", "N");
          				 }
          				 else {
     				    	query.setParameter("resultFlag", "NA");
          				 }
    				    }else {
    				    	if(obj.getTestResult().equalsIgnoreCase("Positive") || obj.getTestResult().equalsIgnoreCase("Detected")) {
         				    	query.setParameter("resultFlag", "Y");
         				    }else if(obj.getTestResult().equalsIgnoreCase("Negative") || obj.getTestResult().equalsIgnoreCase("Not Detected")){
         				    	query.setParameter("resultFlag", "N");
         				    }else {
         				    	
         				    	query.setParameter("resultFlag", "NA");
         				    }
    				    }
     				   	
      					query.executeUpdate();
      					  
      					     String testTypesql="select ifnull(valueType,'') as valueType from pathology_lab_test where idTest="+obj.getTestid()+" ";
      					   Query querytesttype = sessionfactory.getCurrentSession().createSQLQuery(testTypesql);
      					String testType= (String) querytesttype.uniqueResult();
      					if(testType.equalsIgnoreCase("general")) {
      						String generalTypeSql="select   distinct ifnull(general_type,'') as general_type from pathology_labtest_generalvalues where test_general='"+obj.getTestResult()+"' and test_id="+obj.getTestid()+" limit 1";
      						Query generalTypeQuery = sessionfactory.getCurrentSession().createSQLQuery(generalTypeSql);
          					String generalType= (String) generalTypeQuery.uniqueResult();
          					hql = "UPDATE pathology_sample_wise_slave set test_result='"+ obj.getTestResult()+ "',test_reason='"+obj.getTestReason()+"',flag_mark='"+generalType+"',expression='"+obj.getExpression()+"'  where profile_id='"+ obj.getProfileId()+ "' and test_id='"+ obj.getTestid() + "' and master_id in("+id+")";
          					Query query5 = sessionfactory.getCurrentSession().createSQLQuery(hql);
    						query5.executeUpdate();
      					}else {
      						hql = "UPDATE pathology_sample_wise_slave set test_result='"+ obj.getTestResult()+ "',test_reason='"+obj.getTestReason()+"',flag_mark='"+obj.getFlagMark()+"',expression='"+obj.getExpression()+"'  where profile_id='"+ obj.getProfileId()+ "' and test_id='"+ obj.getTestid() + "' and master_id in("+id+")";
          					Query query5 = sessionfactory.getCurrentSession().createSQLQuery(hql);
    						query5.executeUpdate();
      					}
  		 
      					
						
						
					
                	                  	            	 
                   }else if(statusFlag.equals("AAP")){     
                	 String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where unit_Id="+unitId+" and test_status=6";
          			 Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
          			 Integer result = ((Number)query12.uniqueResult()).intValue();      					
          			 result++;
       					List<String> myList = new ArrayList<String>(Arrays.asList(id.split(",")));
       					ArrayList<Integer> numbers = new ArrayList<Integer>();			
       					for(int i = 0; i < myList.size(); i++) {
       						   numbers.add(Integer.parseInt(myList.get(i)));   
       						}
       					
       				    String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, postdatetime =:postdatetime, postBy =:postBy ,pathologistId=:pathologistId,kitSpecId=:kitSpecId,machineId=:machineId, SerialNo=:SerialNo ,profileComments=:profileComments, resultFlag =:resultFlag  where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
       				    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
       				    
       				    query.setParameter("postdatetime", new Date(new java.util.Date().getTime()));
       				    query.setParameter("postBy", userId);
       				    query.setParameterList("sampleWiseMasterId", numbers);
       					query.setParameter("teststatus", 6);
       					query.setParameter("sampleCount", result);
       					query.setParameter("pathologistId", idPathologist);
       					query.setParameter("kitSpecId", kitSpecId);
       				    query.setParameter("machineId", machineId);
      				    query.setParameter("SerialNo", SerialNo);
      				    query.setParameter("profileComments", profileIdcomments);
      				  if(obj.getProfileId() == CovidReProfileId) {
 				    	 if(obj.getTestResult().equalsIgnoreCase("Detected") &&  obj.getTestid() == SARSCoV2RTPCRId) {
       				    query.setParameter("resultFlag", "Y");
       				 }else if(obj.getTestResult().equalsIgnoreCase("Not Detected") &&  obj.getTestid() == SARSCoV2RTPCRId){
       					 query.setParameter("resultFlag", "N");
       				 }else if(obj.getFlagMark().equalsIgnoreCase("Positive") &&  obj.getTestid() == CTVALUEFORCONFIRMATORYGENEID){
       					 query.setParameter("resultFlag", "Y");
       				 }else if(obj.getFlagMark().equalsIgnoreCase("Negative") &&  obj.getTestid() == CTVALUEFORCONFIRMATORYGENEID){
       					 query.setParameter("resultFlag", "N");
       				 }
 				    }else {
 				    	
 				    	if(obj.getTestResult().equalsIgnoreCase("Positive") || obj.getTestResult().equalsIgnoreCase("Detected")) {
      				    	query.setParameter("resultFlag", "Y");
      				    }else if(obj.getTestResult().equalsIgnoreCase("Negative") || obj.getTestResult().equalsIgnoreCase("Not Detected")){
      				    	query.setParameter("resultFlag", "N");
      				    }else {
      				    	query.setParameter("resultFlag", "NA");
      				    }
 				    }
      				   
       					query.executeUpdate();
   		 
       					//hql = "UPDATE pathology_sample_wise_slave set test_result='"+ obj.getTestResult()+ "',test_reason='"+obj.getTestReason()+"',flag_mark='"+obj.getFlagMark()+"',expression='"+obj.getExpression()+"'  where profile_id='"+ obj.getProfileId()+ "' and test_id='"+ obj.getTestid() + "' and master_id in("+id+")";
       					//Query query5 = sessionfactory.getCurrentSession().createSQLQuery(hql);
 						//query5.executeUpdate();
       					
       				   String testTypesql="select ifnull(valueType,'') as valueType from pathology_lab_test where idTest="+obj.getTestid()+" ";
  					   Query querytesttype = sessionfactory.getCurrentSession().createSQLQuery(testTypesql);
  					String testType= (String) querytesttype.uniqueResult();
  					if(testType.equalsIgnoreCase("general")) {
  						String generalTypeSql="select   distinct ifnull(general_type,'') as general_type from pathology_labtest_generalvalues where test_general='"+obj.getTestResult()+"' and test_id="+obj.getTestid()+" limit 1";
  						Query generalTypeQuery = sessionfactory.getCurrentSession().createSQLQuery(generalTypeSql);
      					String generalType= (String) generalTypeQuery.uniqueResult();
      					hql = "UPDATE pathology_sample_wise_slave set test_result='"+ obj.getTestResult()+ "',test_reason='"+obj.getTestReason()+"',flag_mark='"+generalType+"',expression='"+obj.getExpression()+"'  where profile_id='"+ obj.getProfileId()+ "' and test_id='"+ obj.getTestid() + "' and master_id in("+id+")";
      					Query query5 = sessionfactory.getCurrentSession().createSQLQuery(hql);
						query5.executeUpdate();
  					}else {
  						hql = "UPDATE pathology_sample_wise_slave set test_result='"+ obj.getTestResult()+ "',test_reason='"+obj.getTestReason()+"',flag_mark='"+obj.getFlagMark()+"',expression='"+obj.getExpression()+"'  where profile_id='"+ obj.getProfileId()+ "' and test_id='"+ obj.getTestid() + "' and master_id in("+id+")";
      					Query query5 = sessionfactory.getCurrentSession().createSQLQuery(hql);
						query5.executeUpdate();
  					}
       					
 						
 						SQLQuery sql = null;
 						Integer treatmentId=0;						
 						sql = sessionfactory.getCurrentSession().createSQLQuery("select ps.treatment_id,p.email_id,p.gender,concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientName FROM pathology_sample_wise_master ps INNER JOIN ehat_treatment t ON t.treatment_id = ps.treatment_id INNER JOIN ehat_patient p ON p.patient_id = t.patient_id WHERE ps.id in("+id+") GROUP BY ps.treatment_id");     
 						sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
 						List<Map<String, Object>> listsubservice2 = sql.list();
 						for (Map<String, Object> rs : listsubservice2) { 														
 							treatmentId=(Integer)rs.get("treatment_id");							
 						} 						 								   					 						
 					  	//Added by kishor for close treatment after generate report
 					  	//billNobleService.closePatientTreatment(treatmentId,request);
 					  	//WhatsAppApi.sendWhatsSMS();
 					  /*	String m="9665686910";
 					  	WhatsAppApi.sendSMS(m,m);*/
 					  	
 					  
 					    //msg="Email Send  Successfully";	  	  
 					  	//return msg;                	            	 
                    
                   } 
			}	
			
			if(statusFlag.equalsIgnoreCase("AA") || statusFlag.equalsIgnoreCase("AAP")  ) {
				updateMachineData(phlebotomysamplemastertable);// update machine data
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}

	@Override
	public boolean changeStatusOfTest(String idList, String statusFlag,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer userId = (Integer) session.getAttribute("userId1");
			if(statusFlag.equals("AP"))// sample by back to accession
	        {
				   String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=2";
				   Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
				   Integer result = ((Number)query12.uniqueResult()).intValue();      					
				   result++;
				   
				   List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
				   ArrayList<Integer> numbers = new ArrayList<Integer>();			
				   for(int i = 0; i < myList.size(); i++) {
						   numbers.add(Integer.parseInt(myList.get(i)));   
						}				
				    String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, backToaccessiondatetime =:backToaccessiondatetime, backaccessionBy =:backaccessionBy where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
				    Query query = sessionfactory.getCurrentSession().createQuery(sql1);				    
				    query.setParameter("backToaccessiondatetime", new Date(new java.util.Date().getTime()));
				    query.setParameter("backaccessionBy", userId);
				    query.setParameterList("sampleWiseMasterId", numbers);
					query.setParameter("teststatus", 2);
					query.setParameter("sampleCount", result);
					query.executeUpdate();
				
	        }else if(statusFlag.equals("AAP"))// sample by post
	        {        	   
         	       String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=6";
				   Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
				   Integer result = ((Number)query12.uniqueResult()).intValue();      					
				   result++;
				   
					List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
					ArrayList<Integer> numbers = new ArrayList<Integer>();			
					for(int i = 0; i < myList.size(); i++) {
						   numbers.add(Integer.parseInt(myList.get(i)));   
						}					
				    String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, postdatetime =:postdatetime, postBy =:postBy where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
				    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
				    
				    query.setParameter("postdatetime", new Date(new java.util.Date().getTime()));
				    query.setParameter("postBy", userId);
				    query.setParameterList("sampleWiseMasterId", numbers);
					query.setParameter("teststatus", 6);
					query.setParameter("sampleCount", result);
					query.executeUpdate();					
         	                  	            	 
            }               			
		
		} catch (Exception e) {
			return false;
		}
		return true;
	}


	@Override
	public List<PathologySampleWiseMaster> getRoutinevalueResutlusingPrint(String masterid, Integer treatmentid,String patientType,Integer unitId,HttpServletRequest request) {		
		String bothtype="";
		//int sexType=0;
		int countFrom=0 ;
		int count=0 ;
		String agetyp="";
		int age=0;
		int month=0;
		int days=0;
		String type=null;
		String sex=null;
		String male;
		String female;
		String others;
		String sextyp;
		
		Integer patientId=0;
		
		SQLQuery sqlindividual = null;
		String sqlindividualcount=null;
		String barcodefbsppbs = "";
		String fbsppbsaccepteddate = "";
		String fbsppbspostdate ="";
		String specialCase="";
		String sqlindividualspecailcase = null;
        int countspecailcase=0 ;
        
      
		List<PathologySampleWiseMaster> trendAnalysisList = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> ltunit = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> listofprofile = new ArrayList<PathologySampleWiseMaster>();;
		List<PathologySampleWiseMaster> listofTest = null;
		
		PathologySampleWiseMaster profileObj = null;
		
		try {			
			HttpSession session = request.getSession();
			
			Integer unitId1 = (Integer) session.getAttribute("uId");
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String ftestId =(resourceBundle.getObject("FBSTEST").toString());
			Integer fbstestId=Integer.parseInt(ftestId);
			
			String ptestId =(resourceBundle.getObject("PPBSTEST").toString());
			Integer ppbstestId=Integer.parseInt(ptestId);
			
			SQLQuery patientage = sessionfactory.getCurrentSession().createSQLQuery("select p.patient_id, p.age,p.age_months,p.age_days,p.gender,t.special_Case from ehat_patient p,ehat_treatment t where p.Patient_ID=t.Patient_ID and t.Treatment_ID="+treatmentid);     
			patientage.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> patientagelist = patientage.list();
			for (Map<String, Object> row : patientagelist) {		
				patientId=  (Integer) row.get("patient_id");
				age=  (Integer)row.get("age");
	    		month= (Integer) row.get("age_months");
	    		days= (Integer) row.get("age_days");
	    		sex=  (String) row.get("gender");
	    		patientId=  (Integer) row.get("patient_id");	
	    		specialCase=  (String) row.get("special_Case");	
			}
			
			
			   
			   
			//String serviceAssignedDateTime = getOldestCollectionDateInString(masterid);
			
			String sql="";
			String id[] = masterid.split(",");	
			
			for (int i = 0; i < id.length; i++) {
				  int generalParameterCount=0;// calculate general test count
			        int indivisualParameterCount=0;// calculate indivisual test count
			        String testHeaderFlag="";
			Integer id1 = Integer.parseInt(id[i]);	
			System.err.println("masterids..."+id1);
			//sql="select distinct CASE WHEN business_type >1 THEN SUBSTR(pm.collected_date, 1, 19) ELSE SUBSTR(pm.created_date_time, 1, 19) end as createdDateTime, pm.profile_Id,pm.test_status,pm.bar_code,SUBSTR(pm.accepted_datetime, 1, 19) as collecteddate,SUBSTR(pm.post_date, 1, 19) as postdate, pm.pathologist_id,pm.kitspec_id,pm.authorized_by,pm.post_by from pathology_sample_wise_master pm where pm.id="+id1+" and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid;
			sql="select distinct IFNULL(trim(collection_date), '') as collection_date, IFNULL(trim(collection_time), '') as collection_time, pm.profile_Id,pm.test_status,pm.bar_code,SUBSTR(pm.accepted_datetime, 1, 19) as collecteddate,SUBSTR(pm.post_date, 1, 19) as postdate, pm.pathologist_id,pm.kitspec_id,ifnull(pm.profile_comments,'-') as profile_comments,pm.authorized_by,pm.post_by,ifnull(pm.template_wise,'') as template_wise,ifnull(pm.machine_name,'') as machine_name,ifnull(pm.machine_Id,0) as machine_Id,ifnull(pm.sample_collected_at,'') as sample_collected_at,ifnull(pm.customer_id,0) as customer_id,ifnull(pm.customer_type,0) as customer_type  from pathology_sample_wise_master pm where pm.id="+id1+" and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid;
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list)
			{
				Integer profileId = (Integer)row.get("profile_Id");	
				Integer teststatus = (Integer)row.get("test_status");	
				String barcode = (String)row.get("bar_code");				
				String collecteddate = (String)row.get("collecteddate");	
				String postdate = (String)row.get("postdate");	
				Integer PathologistId = (Integer)row.get("pathologist_id");	
				String kitspecId = (String)row.get("kitspec_id");	
				Integer authoId = (Integer)row.get("authorized_by");	
				Integer postId = (Integer)row.get("post_by");	
				String profilecomments = (String)row.get("profile_comments");
				String templateWise = (String)row.get("template_wise");
				String machineName = (String)row.get("machine_name");
				int machineId = ((Number)row.get("machine_Id")).intValue();
				

				String serviceAssignedDateTime = "";//(String)row.get("createdDateTime");
				
				String collectionDate = (String) row.get("collection_date");
				String collectionTime = (String) row.get("collection_time");
				
				if(!collectionDate.equalsIgnoreCase("") || !collectionTime.equalsIgnoreCase("")) {
					StringBuffer fd = new StringBuffer();
					String[] fDate = collectionDate.split("/");
						fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]+" "+collectionTime+":00");
						
						serviceAssignedDateTime = fd.toString();
				}else {
					serviceAssignedDateTime = "-";
				}
				
				String pid="";
				String fbsppbs="";
				String countfbsppbs="";
				String pageno="";
				Integer isAvailable1=0;
				
			    if(teststatus==6)
				{
					if(profileId==fbstestId){
						countfbsppbs = "select count(pm.test_status) as countstatus from pathology_sample_wise_master pm where pm.test_status=6 and pm.profile_Id='"+ppbstestId+"' and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid;
						isAvailable1 = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(countfbsppbs).uniqueResult()).intValue();
						if(isAvailable1.intValue()>0)
						{						 
							pid=profileId+","+ppbstestId;
							fbsppbs="Y";
							pageno="Y";
							SQLQuery fbsppbsquery = sessionfactory.getCurrentSession().createSQLQuery("select pm.bar_code,SUBSTR(pm.accepted_datetime, 1, 19) as collecteddate,SUBSTR(pm.post_date, 1, 19) as postdate from pathology_sample_wise_master pm where pm.test_status=6 and pm.profile_Id='"+ppbstestId+"' and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid);
						    fbsppbsquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> listlabformula = fbsppbsquery.list();
							for (Map<String, Object> rs7 : listlabformula) {								
									 barcodefbsppbs = (String) rs7.get("bar_code");
									 fbsppbsaccepteddate = (String) rs7.get("collecteddate");
									 fbsppbspostdate = (String) rs7.get("postdate");							    
							  }
						}else
						{
							pid=profileId.toString();
							fbsppbs="N";
							pageno="N";
						}				
						
				}else if(profileId==ppbstestId)
				{
						
						countfbsppbs = "select count(pm.test_status) as countstatus from pathology_sample_wise_master pm where pm.test_status=6 and pm.profile_Id='"+fbstestId+"' and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid;
						isAvailable1 = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(countfbsppbs).uniqueResult()).intValue();
						if(isAvailable1.intValue()>0)
						{						 
						  pid=profileId+","+fbstestId;
						  fbsppbs="Y";
						  pageno="Y";
					      SQLQuery fbsppbsquery = sessionfactory.getCurrentSession().createSQLQuery("select pm.bar_code,SUBSTR(pm.accepted_datetime, 1, 19) as collecteddate,SUBSTR(pm.post_date, 1, 19) as postdate from pathology_sample_wise_master pm where pm.test_status=6 and pm.profile_Id='"+fbstestId+"' and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid);
					      fbsppbsquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						  List<Map<String, Object>> listlabformula = fbsppbsquery.list();
						  for (Map<String, Object> rs7 : listlabformula) {								
								 barcodefbsppbs = (String) rs7.get("bar_code");
								 fbsppbsaccepteddate = (String) rs7.get("collecteddate");
								 fbsppbspostdate = (String) rs7.get("postdate");							    
						  }
							
						}else
						{
							pid=profileId.toString();
							fbsppbs="N";
							pageno="N";
						}	
						//pid=profileId+","+fbstestId;
						//fbsppbs="Y";
						
				 }else
					{
						pid=profileId.toString();
						pageno="N";
					}
				}else{
					    pid=profileId.toString();
					    pageno="N";
				}
								
				String pid1[] = pid.split(",");					
				for (int p = 0; p < pid1.length; p++) {	
					
					Integer pid2 = Integer.parseInt(pid1[p]);														
	        	  // adding list of Profile name this list
					
				 listofprofile = new ArrayList<PathologySampleWiseMaster>();															
				 Query queryprofile = sessionfactory.getCurrentSession().createSQLQuery("CALL processingRoutineResultprofileTestId(:id,0)");
				 queryprofile.setParameter("id",pid2);
				 @SuppressWarnings("unchecked")
				 List<Object> lstprofile = queryprofile.list();
				 for (int j = 0; j < lstprofile.size(); j++) 				 
                {
					    String profileName = (String) lstprofile.get(j);
						String[] profile = profileName.split("~");

						Integer profileId1 = Integer.parseInt(profile[0]);
						String profileName1 = profile[1];
						String comments = profile[2];
						
						// added for  interpretation data
						 String sqltemp= "select  CONVERT(interpretation USING utf8) as interpretation   from pathology_labprofile where id= "+profileId1+"  ";
						   SQLQuery q= sessionfactory.getCurrentSession().createSQLQuery(sqltemp);
						  String interpretationData= (String) q.uniqueResult();
						// end interpretation
						  
						// added for  profile comments data
							 String sqltempcomment= "select  CONVERT(comments USING utf8) as comments   from pathology_labprofile where id= "+profileId1+"  ";
							   SQLQuery qc= sessionfactory.getCurrentSession().createSQLQuery(sqltempcomment);
							  String profileComments= (String) qc.uniqueResult();
							// end profile comments
						  
						String interpretation = profile[3];
						String profilesample = profile[5];
						
						String disclaimer = profile[6];						
						String disclaimer_chk = profile[7];
						String comment_chk = profile[8];
						String interpretation_chk = profile[9];

						profileObj = new PathologySampleWiseMaster();
						
						profileObj.setProfileId(profileId1);
						profileObj.setProfileName(profileName1);
						profileObj.setTeststatus(teststatus);
						
						profileObj.setComments(profilecomments);
						//profileObj.setProfileMasterComment(comments);
						profileObj.setProfileMasterComment(profileComments);
						//profileObj.setInterpretation(interpretation);
						profileObj.setInterpretation(interpretationData);
						profileObj.setPathologistId(PathologistId);
						profileObj.setKitSpecId(kitspecId);
						profileObj.setAuthorizedBy(authoId);
						profileObj.setPostBy(postId);
						profileObj.setBarCode(barcode);
						profileObj.setCollecteddate(collecteddate);
						profileObj.setPostdate(postdate);
						profileObj.setPageno(pageno);
						profileObj.setBarcodefbsppbs(barcodefbsppbs);
						profileObj.setFbsppbsaccepteddate(fbsppbsaccepteddate);
						profileObj.setFbsppbspostdate(fbsppbspostdate);
						profileObj.setProfilesample(profilesample);
						profileObj.setServiceAssignedDateTime(serviceAssignedDateTime);
						profileObj.setTemplateWise(templateWise);
						profileObj.setDisclaimer(disclaimer);
						
						profileObj.setDisclaimerCheck(disclaimer_chk);
						profileObj.setCommentCheck(comment_chk);
						profileObj.setInterpretationCheck(interpretation_chk);
						
						profileObj.setMachineName(machineName);
						profileObj.setMachineId(machineId);
						listofprofile.add(profileObj);

						// adding list of test name this list
						listofTest = new ArrayList<PathologySampleWiseMaster>();
						SQLQuery querytestId;
						if(fbsppbs.endsWith("Y"))
						{
							 querytestId = sessionfactory.getCurrentSession().createSQLQuery("SELECT DISTINCT pss.test_id AS test_id, pss.bar_code,pss.test_result,pss.test_reason,pss.test_flag,pss.flag_mark,pss.master_id, ps.created_date_time ,t.trendanalysis_id,ifnull(pl.sample_name, '-') as sample_name,ifnull(pss.expression,'-') as expression FROM pathology_sample_wise_slave pss inner join pathology_lab_test t on t.idTest=pss.test_id  inner join pathology_sample_wise_master ps on ps.id=pss.master_id  JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id WHERE   pss.test_flag = 'N' AND pss.re_collection = 'N' and pss.profile_Id="+ pid2+" and pss.treatment_id="+treatmentid);
						}else{
							
							String sql11 = " SELECT DISTINCT ps.test_id AS test_id,ps.test_result,ps.test_reason,ps.test_flag,ps.flag_mark,ps.master_id,t.trendanalysis_id,IFNULL(pl.sample_name, '-') AS sample_name, "
								    +" IFNULL(ps.expression, '-') AS expression,IFNULL(pm.headName, '-') AS headName,pm.sequence FROM "
								    +" pathology_sample_wise_slave ps INNER JOIN pathology_lab_test t ON t.idTest = ps.test_id "
								    +" INNER JOIN pathology_sample_wise_master pss ON pss.id = ps.master_id "
								    +" INNER JOIN pathology_labprofiletestcomp pm ON pm.idTest = ps.test_id "
								    +" JOIN pathology_labsample pl ON pl.id = pss.sample_type_Id "
								    +" WHERE test_flag = 'N' AND re_collection = 'N' AND pm.test_status = 'Y' AND ps.master_id = "+id1+" AND ps.profile_Id = "+pid2+" AND pm.idprofile = "+pid2+" AND ps.treatment_id = "+treatmentid+" "
								    +" union all "
								    +" SELECT DISTINCT 0 AS test_id,'-' test_result,'-' test_reason,'-' test_flag,'-' flag_mark,0 master_id,0 trendanalysis_id,'-' AS sample_name,'-'  AS expression,IFNULL(pm.headName, '-') AS headName,pm.sequence "
								    +" FROM pathology_sample_wise_slave ps INNER JOIN pathology_labprofiletestcomp pm ON (pm.idprofile = ps.profile_id and pm.idTest is null) "
									+" WHERE test_flag = 'N' AND re_collection = 'N' AND pm.test_status = 'Y' AND ps.master_id = "+id1+" AND ps.profile_Id = "+pid2+" AND pm.idprofile = "+pid2+" AND ps.treatment_id = "+treatmentid+" "
									+" ORDER BY 11 ASC ";
							 //querytestId = sessionfactory.getCurrentSession().createSQLQuery("SELECT DISTINCT ps.test_id AS test_id, ps.test_result,ps.test_reason,ps.test_flag,ps.flag_mark,ps.master_id,t.trendanalysis_id,ifnull(pl.sample_name, '-') as sample_name ,ifnull(ps.expression,'-') as expression FROM pathology_sample_wise_slave ps inner join pathology_lab_test t on t.idTest=ps.test_id   inner join pathology_sample_wise_master pss on pss.id=ps.master_id INNER JOIN pathology_labprofiletestcomp pm ON pm.idTest = ps.test_id JOIN pathology_labsample pl ON pl.id = pss.sample_type_Id where test_flag='N' and re_collection='N' AND pm.test_status = 'Y' and ps.master_id="+ id1+ " and ps.profile_Id="+pid2+" AND pm.idprofile = "+pid2+" and ps.treatment_id="+treatmentid+" ORDER BY pm.sequence ASC");
							querytestId = sessionfactory.getCurrentSession().createSQLQuery(sql11);
						}
						
						querytestId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listtest = querytestId.list();
						for (Map<String, Object> rs1 : listtest) {		
							int sexType=0;
							Integer testId=((Number) rs1.get("test_id")).intValue();	
							if(testId == 0){
								
								PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
								testObj.setTestId(0);
								testObj.setHeadingname((String) rs1.get("headName"));
								listofTest.add(testObj);
							}else{
							String testResult=(String) rs1.get("test_result");
							String testreason = (String) rs1.get("test_reason");
							String testflag = (String) rs1.get("test_flag");
							String flagmark = (String) rs1.get("flag_mark");
							Integer masteridslave = ((Number) rs1.get("master_id")).intValue();
							String trendanalysis=(String) rs1.get("trendanalysis_id");
							String sampleType=(String) rs1.get("sample_name");
							String microReason=(String) rs1.get("expression");
							//System.out.println(trendanalysis+"trendanalysistrendanalysis");
							
							PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
							if(trendanalysis.equalsIgnoreCase("Y")){
								List<String> trendAnalysisResultList = new ArrayList<>();
								List<String> trendAnalysisDateList = new ArrayList<>();
								List<String> trendAnalysisFlagList = new ArrayList<>();
							
								SQLQuery trendquery = sessionfactory.getCurrentSession().createSQLQuery("SELECT SUBSTR(ps.created_date_time, 1, 20) AS datetime, ps.test_result,ps.flag_mark FROM pathology_sample_wise_slave ps where ps.test_id="+testId+" and ps.patient_id="+patientId+" and ps.treatment_id <="+treatmentid+" order by ps.id desc ");
								trendquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> trendquerylist = trendquery.list();
								for (Map<String, Object> rs8 : trendquerylist) {								
							
									if((String)rs8.get("test_result") != null) {
										
										trendAnalysisResultList.add((String)rs8.get("test_result"));
										trendAnalysisDateList.add((String)rs8.get("datetime"));
										trendAnalysisFlagList.add((String)rs8.get("flag_mark"));
									}									
								}
								
								
								testObj.setTreandAnalysisList(trendAnalysisResultList);
								testObj.setTreandAnalysisDateList(trendAnalysisDateList);
								testObj.setTreandAnalysisFlagList(trendAnalysisFlagList);
								// added for graph start
								List<String> trendAnalysisGraphResultList = new ArrayList<>();
								List<String> trendAnalysisGraphDateList = new ArrayList<>();
								List<String> trendAnalysisGraphFlagList = new ArrayList<>();
								SQLQuery trendquerygraph = sessionfactory.getCurrentSession().createSQLQuery("SELECT SUBSTR(ps.created_date_time, 1, 20) AS datetime, ps.test_result,ps.flag_mark FROM pathology_sample_wise_slave ps where ps.test_id="+testId+" and ps.patient_id="+patientId+" and ps.treatment_id <="+treatmentid+" order by ps.created_date_time asc ");
								trendquerygraph.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> trendquerylistgraph = trendquerygraph.list();
								for (Map<String, Object> rs8 : trendquerylistgraph) {								
							
									if((String)rs8.get("test_result") != null) {
										
										trendAnalysisGraphResultList.add((String)rs8.get("test_result"));
										trendAnalysisGraphDateList.add((String)rs8.get("datetime"));
										trendAnalysisGraphFlagList.add((String)rs8.get("flag_mark"));
									}									
								}
								
								// end for graph
								testObj.setTreandAnalysisGraphList(trendAnalysisGraphResultList);
								testObj.setTreandAnalysissGraphDateList(trendAnalysisGraphDateList);
								testObj.setTreandAnalysissGraphFlagList(trendAnalysisGraphFlagList);
							}
							
							// added for single and five record
							
								List<String> trendAnalysisResultFiveSingleList = new ArrayList<>();
								List<String> trendAnalysisFiveSingleDateList = new ArrayList<>();
								List<String> trendAnalysisFiveSingleFlagList = new ArrayList<>();
							
								SQLQuery trendquery = sessionfactory.getCurrentSession().createSQLQuery("SELECT SUBSTR(ps.created_date_time, 1, 20) AS datetime, ps.test_result,ps.flag_mark FROM pathology_sample_wise_slave ps where ps.test_id="+testId+" and ps.patient_id="+patientId+" and ps.treatment_id <="+treatmentid+" order by ps.id desc ");
								trendquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> trendquerylist = trendquery.list();
								for (Map<String, Object> rs8 : trendquerylist) {								
							
									if((String)rs8.get("test_result") != null) {
										
										trendAnalysisResultFiveSingleList.add((String)rs8.get("test_result"));
										trendAnalysisFiveSingleDateList.add((String)rs8.get("datetime"));
										trendAnalysisFiveSingleFlagList.add((String)rs8.get("flag_mark"));
									}									
								}
								
								
								testObj.setTrendAnalysisResultFiveSingleList(trendAnalysisResultFiveSingleList);
								testObj.setTrendAnalysisFiveSingleDateList(trendAnalysisFiveSingleDateList);
								testObj.setTrendAnalysisFiveSingleFlagList(trendAnalysisFiveSingleFlagList);
							
							// end single and five record
							
							SQLQuery labformulaquery = sessionfactory.getCurrentSession().createSQLQuery("select expTestId from labformula where formStatus='Y' and resultTestId="+testId);
							labformulaquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> listlabformula = labformulaquery.list();
							for (Map<String, Object> rs4 : listlabformula) {								
								    testObj.setObjFormula((String) rs4.get("expTestId"));								    
							}
								
							SQLQuery testresult = sessionfactory.getCurrentSession().createSQLQuery("select valueType from  pathology_lab_test where deleted_by='0' and idTest="+testId);     
							testresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> listtestresult = testresult.list();
							for (Map<String, Object> rs2 : listtestresult) {								    
							
							String valueType=(String) rs2.get("valueType");						 
							
							if(valueType.equals("general"))
							{
								    SQLQuery resultvalue = sessionfactory.getCurrentSession().createSQLQuery("select t.idTest,t.testName,t.test_general,ifnull(m.method_name,'-') as methodname,ifnull(t.microorganism,'-') as microorganism,ifnull(t.testComments,'-') as testComments,ifnull(t.testInterpretation,'-') as testInterpretation,ifnull(t.quantitative,' ') as quantitative,IFNULL(u.unitName, '-') as unitname, t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(t.biologicalreferencewith_general,' ') as biologicalreferencewith_general,ifnull(t.testNote,' ') as testNote from pathology_lab_test t left join pathology_labtestmethod m on m.id=t.idtestMethod left join pathology_labunittype u ON u.id = t.unitid_genaral   where t.deleted_by='0' and t.idTest="+testId);     
								    resultvalue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> resultvaluelist = resultvalue.list();
									for (Map<String, Object> rs3 : resultvaluelist) {		
										
										testObj.setTestId((Integer) rs3.get("idTest"));
										testObj.setTestName((String) rs3.get("testName"));
										testObj.setLowvalue((String) rs3.get("test_general"));										
										testObj.setMethodename((String) rs3.get("methodname"));
										testObj.setTestresult(testResult);
										testObj.setDefaultvalue((String) rs3.get("test_general"));
										testObj.setMicroorganism((String) rs3.get("microorganism"));
										
										testObj.setBiologicalReferenceChk((String) rs3.get("biological_reference_chk"));//added by kishor
										testObj.setSampleTypeChk((String) rs3.get("sample_type_chk"));//added by kishor
										testObj.setTestMethodChk((String) rs3.get("test_method_chk"));//added by kishor
										testObj.setBiologicalReferenceWithGeneral((String) rs3.get("biologicalreferencewith_general"));//added by kishor
										
										testObj.setUnitNameGenaral((String) rs3.get("unitname"));							
										//testObj.setTestComments((String) rs3.get("testComments"));
										testObj.setTestComments(testreason);
										testObj.setTestInterpretation((String) rs3.get("testInterpretation"));
										testObj.setQuantitative((String) rs3.get("quantitative"));
										testObj.setTestType(valueType);
										testObj.setSamplename(sampleType);
										testObj.setMicroreason(microReason);
										testObj.setRejecttestflag(testflag);
										testObj.setFlagmark(flagmark);
										testObj.setMasterid(masteridslave);
										testObj.setTrendanalysisFlag(trendanalysis);	
										testObj.setTestNote((String) rs3.get("testNote"));// added for test note 
										listofTest.add(testObj);
									}
									generalParameterCount++;
							 }else if(valueType.equals("individual"))
							 {
								   indivisualParameterCount++;
								     Integer ageInMonths= ((age * 12) + month);																	
									 int dobYear = age;	 int dobMonth = month; int dobDay = days;

									 LocalDate now = LocalDate.now();
									 LocalDate dob = now.minusYears(dobYear).minusMonths(dobMonth).minusDays(dobDay);

									 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
																								 
									 String patientbirthDate = dob.format(formatter).toString();
																		 
									 String[] patientBirthDatee = patientbirthDate.split("/");

									 Integer d = Integer.parseInt(patientBirthDatee[0]);
									 Integer m = Integer.parseInt(patientBirthDatee[1]);
									 Integer y = Integer.parseInt(patientBirthDatee[2]);
																	   	
									 LocalDate birthDate = LocalDate.of(y,m,d);
									 long ageInDays = ChronoUnit.DAYS.between(birthDate, now);
									
									 String ageTypeSplit="";
									 SQLQuery findAgeIn = sessionfactory.getCurrentSession().createSQLQuery("select distinct age_in from pathology_labtestnormalvalue where matser_id='"+testId+"' and machine_flag='Y' and deleted='N' order by age_in asc ");     
									 findAgeIn.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									 List<Map<String, Object>> findAgeInList = findAgeIn.list();
									 for (Map<String, Object> findAgeInList1 : findAgeInList) {	
										  
											ageTypeSplit=(String) findAgeInList1.get("age_in");
											
											if(ageTypeSplit.equals("1"))
											{
												bothtype = "select count(sexType) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+"' and sexType='4' and matser_id='"+testId+"' and age_in="+ageTypeSplit+" and machine_flag='Y' and deleted='N' ";									    
												sexType = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(bothtype).uniqueResult()).intValue();	
											
											}else if(sexType==0 && ageTypeSplit.equals("2")){
												
												bothtype = "select count(sexType) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+"' and sexType='4' and matser_id='"+testId+"' and age_in="+ageTypeSplit+" and machine_flag='Y' and deleted='N' ";									    
												sexType = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(bothtype).uniqueResult()).intValue();	
												
											}else if(sexType==0 && ageTypeSplit.equals("3")){
												
												bothtype = "select count(sexType) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+"' and sexType='4' and matser_id='"+testId+"' and age_in="+ageTypeSplit+" and machine_flag='Y' and deleted='N' ";									    
												sexType = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(bothtype).uniqueResult()).intValue();	
												
											}						 							
									 }	    	
									 if(sexType>0 && !sex.equalsIgnoreCase("Other")){
									 																		 										
											  sextyp = "4";																											     
										      if (age != 0) {									    	 
											      agetyp = "1"; 									   
										    	  sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N'  and  sexType='" + sextyp + "' ";									    
										    	  count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();									    
										    	  if(count > 0){									    	
										    		  countFrom=1;									    
										    	  }									  																	   
										      
										      } if(count == 0)								
										      {
												// if (month != 0) {									    	 										
										    	  if (ageInMonths != 0) {
													    agetyp = "2";
													    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "'  and machine_flag='Y' and deleted='N'  and  sexType='" + sextyp + "' ";
													    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
													    if(count > 0){
													    	countFrom=2;
													    }											 	

												} if(count == 0)
												 {
													 if (ageInDays != 0) {									    	 
														    agetyp = "3";
														    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"'  and machine_flag='Y' and deleted='N'  and  sexType='"+sextyp+"' ";
														    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
														    
														    if(count > 0){
														    	countFrom=3;
														    }
														    //System.err.println("Couunttt Days= "+ count +" countFrom= "+countFrom);
													 }
												 }											
											}	
										      if (count > 0) {
													
													if (count > 1) {

														if (countFrom == 1) {
															
															if (age != 0) {
																
																  agetyp = "1";																											
																  if (month != 0) {
																	  //changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																	  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+"  and n.machine_flag='Y' and n.deleted='N'  and n.matser_id="+testId;												    
									    				     
																	  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     
																	  if(countspecailcase > 0)
																	  {								    				 
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	  }else
																	  {
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	  }	 
															     
															    
																	  if (days != 0) {
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																		  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																		  if(countspecailcase > 0)
																		  {		
																			//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																			  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																		  }else
																		  {
																			//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																			  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																		  }													    }	
																  }else {								    				 
																	  if (days != 0) {															
																		  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																		  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																		  if(countspecailcase > 0)
																		  {								    				 
																			//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																			  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																		  }else
																		  {
																			//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																			  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																		  }														}
																  }if (month == 0 && days == 0) {								    			 
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal    FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );								    			 
																  }
															  }
														    
														} else if (countFrom == 2) {// Month wise data fetch
															
															if (ageInMonths != 0) {
																
																agetyp = "2";																										
																if (days != 0) {
																	//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																	sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y'  and n.deleted='N' and n.matser_id="+testId;												    
																	countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																	if(countspecailcase > 0)
																	{								    				 
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}else
																	{
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}		
									    				  
																}else
																{	
																	//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																	sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y'  and n.deleted='N' and n.matser_id="+testId;												    
																	countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																	if(countspecailcase > 0)
																	{		
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}else
																	{
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}		
																}
															}
														} else if(countFrom == 3){
																
																if (ageInDays != 0) {
														
																	agetyp = "3";
													
																	sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
								    				     
																	countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
								    				    
																	if(countspecailcase > 0)
																	{	
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}else
																	{
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}												
																}											  
															}											
														
														} else
															{
													    	  if(countFrom == 1){//Year wise data fetch
													    										    			
													    		if (age != 0) {									    	 
														   
																agetyp = "1";
														    
																sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
									    				     
																countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				    
																if(countspecailcase > 0)
																{		
																	//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																}else
																{
																	//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																								    		
													    		     }	 									    			
												    			 }								    		 
															
															}else if(countFrom == 2){//Month wise data fetch								    			 								    			
												    			 if (ageInMonths != 0) {									    	 
															
																	agetyp = "2";
															
																	sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
									    				    
																	countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				     
																	if(countspecailcase > 0)
																	{	
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}else
																	{
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																		sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>='"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																	}
												    			 }
												    			}else if(countFrom == 3){//days wise data fetch								    			 								    			 
												        			 if (ageInDays != 0) {									    	 
															        
																		agetyp = "3";
															        
																		sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
											    				   
																		countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
											    				    
																		if(countspecailcase > 0)
																		{	
																		 //changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																	     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																		}else
																		{
																		//changed n.lab_toage> to n.lab_toage>= by Rohit on 22-11-2021
																	     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal,ifnull(n.noteIdwith_normal,'') as noteIdwith_normal FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>='"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																		}												
																	}
																
															}
														}
														
										    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
													 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
													 for (Map<String, Object> rs3 : sqlindividuallist) {		
															
														    testObj.setTestId((Integer) rs3.get("idTest"));
															testObj.setTestName((String) rs3.get("testName"));																																									
															testObj.setLowvalue((String) rs3.get("lowerVal"));
															testObj.setHighvalue((String) rs3.get("upperVal"));
															testObj.setUnitname((String) rs3.get("unitname"));												
															testObj.setMethodename((String) rs3.get("methodName"));
															testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
															
															testObj.setLabcl((String) rs3.get("labcl"));
															testObj.setLabch((String) rs3.get("labch"));
															testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
															testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
															testObj.setProvision((String) rs3.get("provision"));
															testObj.setMicroorganism((String) rs3.get("microorganism"));
															testObj.setTestComments(testreason);
															testObj.setTestInterpretation((String) rs3.get("testInterpretation"));
															
															testObj.setBiologicalReferenceChk((String) rs3.get("biological_reference_chk"));//added by kishor
															testObj.setSampleTypeChk((String) rs3.get("sample_type_chk"));//added by kishor
															testObj.setTestMethodChk((String) rs3.get("test_method_chk"));//added by kishor
															testObj.setBiologicalReferenceWithNormal((String) rs3.get("biologicalReferenceWith_normal"));//added by kishor
															
															testObj.setExpression((String) rs3.get("expression"));
															testObj.setQuantitative((String) rs3.get("quantitative"));
															testObj.setTestType(valueType);
															testObj.setTestresult(testResult);
															testObj.setTestreason(testreason);
															testObj.setRejecttestflag(testflag);
															testObj.setSamplename(sampleType);
															testObj.setMicroreason(microReason);
															testObj.setFlagmark(flagmark);
															testObj.setMasterid(masteridslave);
															testObj.setTrendanalysisFlag(trendanalysis);	
															testObj.setTestNote((String) rs3.get("noteIdwith_normal"));// added for test note
															listofTest.add(testObj);
													}

												

											}

										}else if (sex.equalsIgnoreCase("Male")) {																		 
									
									  sextyp = "1";																											     
								      if (age != 0) {									    	 
									      agetyp = "1"; 									   
								    	  sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N'  and  sexType='" + sextyp + "' ";									    
								    	  count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();									    
								    	  if(count > 0){									    	
								    		  countFrom=1;									    
								    	  }									  																	   
								      
								      } if(count == 0)								
								      {
										// if (month != 0) {									    	 										
								    	  if (ageInMonths != 0) {
											    agetyp = "2";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "'  and machine_flag='Y' and deleted='N'  and  sexType='" + sextyp + "' ";
											    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
											    if(count > 0){
											    	countFrom=2;
											    }											 	

										} if(count == 0)
										 {
											 if (ageInDays != 0) {									    	 
												    agetyp = "3";
												    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"'  and machine_flag='Y' and deleted='N'  and  sexType='"+sextyp+"' ";
												    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
												    
												    if(count > 0){
												    	countFrom=3;
												    }
												    //System.err.println("Couunttt Days= "+ count +" countFrom= "+countFrom);
											 }
										 }											
									}	
								      if (count > 0) {
											
											if (count > 1) {

												if (countFrom == 1) {
													
													if (age != 0) {
														
														  agetyp = "1";																											
														  if (month != 0) {
															  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+"  and n.machine_flag='Y' and n.deleted='N'  and n.matser_id="+testId;												    
							    				     
															  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     
															  if(countspecailcase > 0)
															  {								    				 
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															  }else
															  {
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															  }	 
													     
													    
															  if (days != 0) {
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																  if(countspecailcase > 0)
																  {								    				 
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }else
																  {
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }													    }	
														  }else {								    				 
															  if (days != 0) {															
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																  if(countspecailcase > 0)
																  {								    				 
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }else
																  {
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }														}
														  }if (month == 0 && days == 0) {								    			 
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal    FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );								    			 
														  }
													  }
												    
												} else if (countFrom == 2) {// Month wise data fetch
													
													if (ageInMonths != 0) {
														
														agetyp = "2";																										
														if (days != 0) {
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y'  and n.deleted='N' and n.matser_id="+testId;												    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}		
							    				  
														}else
														{													
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y'  and n.deleted='N' and n.matser_id="+testId;												    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}		
														}
													}
												} else if(countFrom == 3){
														
														if (ageInDays != 0) {
												
															agetyp = "3";
											
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
						    				     
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				    
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}												
														}											  
													}											
												
												} else
													{
											    	  if(countFrom == 1){//Year wise data fetch
											    										    			
											    		if (age != 0) {									    	 
												   
														agetyp = "1";
												    
														sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
							    				     
														countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				    
														if(countspecailcase > 0)
														{								    				 
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
														}else
														{
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																						    		
											    		     }	 									    			
										    			 }								    		 
													
													}else if(countFrom == 2){//Month wise data fetch								    			 								    			
										    			 if (ageInMonths != 0) {									    	 
													
															agetyp = "2";
													
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
							    				    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}
										    			 }
										    			}else if(countFrom == 3){//days wise data fetch								    			 								    			 
										        			 if (ageInDays != 0) {									    	 
													        
																agetyp = "3";
													        
																sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
									    				   
																countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				    
																if(countspecailcase > 0)
																{								    				 
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																}else
																{
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																}												
															}
														
													}
												}
												
								    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
											 for (Map<String, Object> rs3 : sqlindividuallist) {		
													
												    testObj.setTestId((Integer) rs3.get("idTest"));
													testObj.setTestName((String) rs3.get("testName"));																																									
													testObj.setLowvalue((String) rs3.get("lowerVal"));
													testObj.setHighvalue((String) rs3.get("upperVal"));
													testObj.setUnitname((String) rs3.get("unitname"));												
													testObj.setMethodename((String) rs3.get("methodName"));
													testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
													
													testObj.setLabcl((String) rs3.get("labcl"));
													testObj.setLabch((String) rs3.get("labch"));
													testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
													testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
													testObj.setProvision((String) rs3.get("provision"));
													testObj.setMicroorganism((String) rs3.get("microorganism"));
													testObj.setTestComments(testreason);
													testObj.setTestInterpretation((String) rs3.get("testInterpretation"));
													testObj.setExpression((String) rs3.get("expression"));
													testObj.setQuantitative((String) rs3.get("quantitative"));
													
													testObj.setBiologicalReferenceChk((String) rs3.get("biological_reference_chk"));//added by kishor
													testObj.setSampleTypeChk((String) rs3.get("sample_type_chk"));//added by kishor
													testObj.setTestMethodChk((String) rs3.get("test_method_chk"));//added by kishor
													testObj.setBiologicalReferenceWithNormal((String) rs3.get("biologicalReferenceWith_normal"));//added by kishor
													
													testObj.setTestType(valueType);
													testObj.setTestresult(testResult);
													testObj.setTestreason(testreason);
													testObj.setRejecttestflag(testflag);
													testObj.setSamplename(sampleType);
													testObj.setMicroreason(microReason);
													testObj.setFlagmark(flagmark);
													testObj.setMasterid(masteridslave);
													testObj.setTrendanalysisFlag(trendanalysis);		
													listofTest.add(testObj);
											}

										

									}

								}if (sex.equalsIgnoreCase("Female")) {																		 
								     sextyp = "2";																											    																										     
								      if (age != 0) {									    	 
									      agetyp = "1"; 									   
								    	  sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and   sexType='" + sextyp + "' ";									    
								    	  count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();									    
								    	  if(count > 0){									    	
								    		  countFrom=1;									    
								    	  }									  																	   
								      
								      } if(count == 0)								
								      {
										// if (month != 0) {									    	 										
								    	  if (ageInMonths != 0) {
											    agetyp = "2";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and  sexType='" + sextyp + "' ";
											    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
											    if(count > 0){
											    	countFrom=2;
											    }											 	

										} if(count == 0)
										 {
											 if (ageInDays != 0) {									    	 
												    agetyp = "3";
												    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and machine_flag='Y' and deleted='N' and  sexType='"+sextyp+"' ";
												    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
												    
												    if(count > 0){
												    	countFrom=3;
												    }
												   
											 }
										 }											
									}	
								      if (count > 0) {
											
											if (count > 1) {

												if (countFrom == 1) {
													
													if (age != 0) {
														
														  agetyp = "1";																											
														  if (month != 0) {
															  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
							    				     
															  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     
															  if(countspecailcase > 0)
															  {								    				 
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															  }else
															  {
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															  }	 
													     
													    
															  if (days != 0) {
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																  if(countspecailcase > 0)
																  {								    				 
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }else
																  {
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }													    }	
														  }else {								    				 
															  if (days != 0) {															
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																  if(countspecailcase > 0)
																  {								    				 
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }else
																  {
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }														}
														  }if (month == 0 && days == 0) {								    			 
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal    FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );								    			 
														  }
													  }
												    
												} else if (countFrom == 2) {// Month wise data fetch
													
													if (ageInMonths != 0) {
														
														agetyp = "2";																										
														if (days != 0) {
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}		
							    				  
														}else
														{													
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}		
														}
													}
												} else if(countFrom == 3){
														
														if (ageInDays != 0) {
												
															agetyp = "3";
											
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
						    				     
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				    
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}												
														}											  
													}											
												
											} else {
													   
													   if(countFrom == 1){//Year wise data fetch
											    										    			
											    		if (age != 0) {									    	 
												   
														agetyp = "1";
												    
														sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
							    				     
														countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				    
														if(countspecailcase > 0)
														{								    				 
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
														}else
														{
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																						    		
											    		     }	 									    			
										    			 }								    		 
													
													}else if(countFrom == 2){//Month wise data fetch								    			 								    			
										    			 if (ageInMonths != 0) {									    	 
													
															agetyp = "2";
													
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
							    				    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}
										    			 }
										    			}else if(countFrom == 3){//days wise data fetch								    			 								    			 
										        			 
										    				if (ageInDays != 0) {									    	 
													        
																agetyp = "3";
													        
																sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
									    				   
																countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				    
																if(countspecailcase > 0)
																{								    				 
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																}else
																{
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																}												
															}
														 }
												 }	
											
								    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
											 for (Map<String, Object> rs3 : sqlindividuallist) {		
													
												    testObj.setTestId((Integer) rs3.get("idTest"));
													testObj.setTestName((String) rs3.get("testName"));																																									
													testObj.setLowvalue((String) rs3.get("lowerVal"));
													testObj.setHighvalue((String) rs3.get("upperVal"));
													testObj.setUnitname((String) rs3.get("unitname"));												
													testObj.setMethodename((String) rs3.get("methodName"));
													testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
													
													testObj.setLabcl((String) rs3.get("labcl"));
													testObj.setLabch((String) rs3.get("labch"));
													testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
													testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
													testObj.setProvision((String) rs3.get("provision"));
													testObj.setMicroorganism((String) rs3.get("microorganism"));
													testObj.setTestComments(testreason);
													testObj.setTestInterpretation((String) rs3.get("testInterpretation"));
													testObj.setExpression((String) rs3.get("expression"));
													testObj.setQuantitative((String) rs3.get("quantitative"));
													
													testObj.setBiologicalReferenceChk((String) rs3.get("biological_reference_chk"));//added by kishor
													testObj.setSampleTypeChk((String) rs3.get("sample_type_chk"));//added by kishor
													testObj.setTestMethodChk((String) rs3.get("test_method_chk"));//added by kishor
													testObj.setBiologicalReferenceWithNormal((String) rs3.get("biologicalReferenceWith_normal"));//added by kishor
													
													testObj.setTestType(valueType);
													testObj.setTestresult(testResult);
													testObj.setTestreason(testreason);
													testObj.setRejecttestflag(testflag);
													testObj.setSamplename(sampleType);
													testObj.setMicroreason(microReason);
													testObj.setFlagmark(flagmark);
													testObj.setMasterid(masteridslave);
													testObj.setTrendanalysisFlag(trendanalysis);		
													listofTest.add(testObj);
											}

										

									}

								}if (sex.equalsIgnoreCase("others")) {																		 
								     sextyp = "3";																											    																										     
								      if (age != 0) {									    	 
									      agetyp = "1"; 									   
								    	  sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and  sexType='" + sextyp + "' ";									    
								    	  count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();									    
								    	  if(count > 0){									    	
								    		  countFrom=1;									    
								    	  }									  																	   
								      
								      } if(count == 0)								
								      {
										// if (month != 0) {									    	 										
								    	  if (ageInMonths != 0) {
											    agetyp = "2";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInMonths+ "' and lab_toage>='"+ ageInMonths+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and machine_flag='Y' and deleted='N' and  sexType='" + sextyp + "' ";
											    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
											    if(count > 0){
											    	countFrom=2;
											    }											 	

										} if(count == 0)
										 {
											 if (ageInDays != 0) {									    	 
												    agetyp = "3";
												    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ ageInDays+ "' and lab_toage>='"+ ageInDays+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and machine_flag='Y' and deleted='N' and  sexType='"+sextyp+"' ";
												    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
												    
												    if(count > 0){
												    	countFrom=3;
												    }
												   
											 }
										 }											
									}	
								      if (count > 0) {
											
											if (count > 1) {

												if (countFrom == 1) {
													
													if (age != 0) {
														
														  agetyp = "1";																											
														  if (month != 0) {
															  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
							    				     
															  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     
															  if(countspecailcase > 0)
															  {								    				 
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															  }else
															  {
																  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															  }	 
													     
													    
															  if (days != 0) {
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																  if(countspecailcase > 0)
																  {								    				 
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }else
																  {
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }													    }	
														  }else {								    				 
															  if (days != 0) {															
																  sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
																  countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
																  if(countspecailcase > 0)
																  {								    				 
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }else
																  {
																	  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																  }														}
														  }if (month == 0 && days == 0) {								    			 
															  sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal    FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );								    			 
														  }
													  }
												    
												} else if (countFrom == 2) {// Month wise data fetch
													
													if (ageInMonths != 0) {
														
														agetyp = "2";																										
														if (days != 0) {
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}		
							    				  
														}else
														{													
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}		
														}
													
													}
													} else if(countFrom == 3){
														
														if (ageInDays != 0) {
												
															agetyp = "3";
											
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
						    				     
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
						    				    
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}												
														}											  
													}											
													
											} else {
													   
													   if(countFrom == 1){//Year wise data fetch
											    										    			
											    		if (age != 0) {									    	 
												   
														agetyp = "1";
												    
														sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
							    				     
														countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				    
														if(countspecailcase > 0)
														{								    				 
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
														}else
														{
															sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																						    		
											    		     }	 									    			
										    			 }								    		 
													
													}else if(countFrom == 2){//Month wise data fetch								    			 								    			
										    			 if (ageInMonths != 0) {									    	 
													
															agetyp = "2";
													
															sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' aand n.deleted='N' nd n.matser_id="+testId;												    
							    				    
															countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
							    				     
															if(countspecailcase > 0)
															{								    				 
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}else
															{
																sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInMonths+ "' and n.lab_toage>'"+ ageInMonths+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
															}
										    			 }
										    			}else if(countFrom == 3){//days wise data fetch								    			 								    			 
										        			 if (ageInDays != 0) {									    	 
													        
																agetyp = "3";
													        
																sqlindividualspecailcase = "SELECT count(n.id_specialcase) FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and n.matser_id="+testId;												    
									    				   
																countspecailcase = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualspecailcase).uniqueResult()).intValue();
									    				    
																if(countspecailcase > 0)
																{								    				 
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.id_specialcase="+specialCase+" and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																}else
																{
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision,ifnull(t.microorganism,'-') as microorganism,IFNULL(n.commentswith_normal, '-') AS testComments,IFNULL(n.interpretationwith_normal, '-') AS testInterpretation,ifnull(n.expression,' ') as expression,ifnull(t.quantitative,' ') as quantitative,t.biological_reference_chk as biological_reference_chk, t.sample_type_chk as sample_type_chk, t.test_method_chk as test_method_chk, ifnull(n.biologicalReferenceWith_normal,' ') as biologicalReferenceWith_normal  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = n.testMethodwith_normal where n.lab_fage<='"+ ageInDays+ "' and n.lab_toage>'"+ ageInDays+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and n.machine_flag='Y' and n.deleted='N' and  n.matser_id="+testId );												    
																}												
																
														 }
													 }
												 }	
											
								    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
											 for (Map<String, Object> rs3 : sqlindividuallist) {		
													
												    testObj.setTestId((Integer) rs3.get("idTest"));
													testObj.setTestName((String) rs3.get("testName"));																																									
													testObj.setLowvalue((String) rs3.get("lowerVal"));
													testObj.setHighvalue((String) rs3.get("upperVal"));
													testObj.setUnitname((String) rs3.get("unitname"));												
													testObj.setMethodename((String) rs3.get("methodName"));
													testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
													
													testObj.setLabcl((String) rs3.get("labcl"));
													testObj.setLabch((String) rs3.get("labch"));
													testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
													testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
													testObj.setProvision((String) rs3.get("provision"));
													testObj.setMicroorganism((String) rs3.get("microorganism"));
													testObj.setTestComments(testreason);
													testObj.setTestInterpretation((String) rs3.get("testInterpretation"));
													testObj.setExpression((String) rs3.get("expression"));
													testObj.setQuantitative((String) rs3.get("quantitative"));
													
													testObj.setBiologicalReferenceChk((String) rs3.get("biological_reference_chk"));//added by kishor
													testObj.setSampleTypeChk((String) rs3.get("sample_type_chk"));//added by kishor
													testObj.setTestMethodChk((String) rs3.get("test_method_chk"));//added by kishor
													testObj.setBiologicalReferenceWithNormal((String) rs3.get("biologicalReferenceWith_normal"));//added by kishor
													
													testObj.setTestType(valueType);
													testObj.setTestresult(testResult);
													testObj.setTestreason(testreason);
													testObj.setRejecttestflag(testflag);
													testObj.setSamplename(sampleType);
													testObj.setMicroreason(microReason);
													testObj.setFlagmark(flagmark);
													testObj.setMasterid(masteridslave);
													testObj.setTrendanalysisFlag(trendanalysis);		
													listofTest.add(testObj);
												}

											}

										}

									}

								}
							
								}

							}

						}
				    
				 PathologySampleWiseMaster obj=	  (PathologySampleWiseMaster) sessionfactory.getCurrentSession().get(PathologySampleWiseMaster.class, id1);
					List<PathologySampleWiseSlave> pslavelist=	 obj.getPathologySampleWiseSlave();
					System.err.println("obj temp.."+obj.getTemplateWise());
					if(!obj.getTemplateWise().equalsIgnoreCase("N") && !obj.getTemplateWise().equalsIgnoreCase(" ")) {
						for(PathologySampleWiseSlave sobj: pslavelist) {
							 String sqltemp= "select  ifnull(CONVERT(template_data USING utf8),'') as template_data   from pathology_sample_wise_slave where master_id= "+id1+"  group by master_id ";
						   SQLQuery q= sessionfactory.getCurrentSession().createSQLQuery(sqltemp);
						  String templateData= (String) q.uniqueResult();
						  sobj.setTemplateData(templateData);
						  
						}
					}
						
					profileObj.setSampleCollectedAt((String) row.get("sample_collected_at"));
					profileObj.setCustomerId(((Number)row.get("customer_id")).intValue());
					profileObj.setCustomerType(((Number)row.get("customer_type")).intValue());
					
					// get customer name
					String customerName="";
					  if(((Number)row.get("customer_id")).intValue() > 0) {
					       String sqlName=" select ifnull(lab_name,'') as lab_name from business_master_new    where id="+((Number)row.get("customer_id")).intValue()+" ";
					       customerName = (String) sessionfactory.getCurrentSession().createSQLQuery(sqlName).uniqueResult();
					  }
					  profileObj.setCustomerName(customerName);
					
					
						    if(indivisualParameterCount > 0 && generalParameterCount > 0) {
						    	testHeaderFlag="B";
						    }else if(indivisualParameterCount > 0 && generalParameterCount==0) {
						    	testHeaderFlag="I";
						    }else if(generalParameterCount > 0 && indivisualParameterCount==0) {
						    	testHeaderFlag="G";
						    }
						        profileObj.setTestHeaderFlag(testHeaderFlag);
								profileObj.setTestli(listofTest);
								profileObj.setPathologySampleWiseSlave(pslavelist);
								ltunit.add(profileObj);
								 
								//ltunit.add(obj);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ltunit;
		}

		return ltunit;
	}
	@Override
	public List<PathologySampleWiseMaster> getdepartmentname(HttpServletRequest request) {
		List<PathologySampleWiseMaster> departmentnameList = new ArrayList<PathologySampleWiseMaster>();
		try {			
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("select id,category_name from ehat_subservice where isCategory = 'Y' and service_id='11'");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql.list();
			for (Map<String, Object> rs : listsubservice2) {
				PathologySampleWiseMaster objDocList = new PathologySampleWiseMaster();
				objDocList.setHeadingId((Integer) rs.get("id"));
				objDocList.setHeadingname((String) rs.get("category_name"));				
				departmentnameList.add(objDocList);
			}
		} catch (Exception e) {
			e.printStackTrace();
			e.getMessage();
		}
		return departmentnameList;
	}

	@Override
	public List<PathologySampleWiseMaster> getdepartmentWiseWorkList(Integer Iddepartment,HttpServletRequest request)
	{		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql="";		
			
		if(Iddepartment==0)
		{
			sql="SELECT ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";			
	
		}else
		{
			sql="SELECT ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and es.idheadings="+Iddepartment+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";			

		}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setPatientage((Integer)row.get("age"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				obj.setDocname((String)row.get("docname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sample_type_id"));
				obj.setHeadingname((String)row.get("headingname"));
				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}		
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> getTreatmentIdList(
			Integer patientId, HttpServletRequest request) {
		List<PathologySampleWiseMaster> treatmentIdList = new ArrayList<PathologySampleWiseMaster>();
		try {			
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("SELECT DISTINCT p.treatment_id FROM pathology_sample_wise_master p INNER JOIN ehat_treatment t ON t.treatment_id = p.treatment_id WHERE  p.test_status ='6' AND t.t_flag ='N' AND p.patient_id ="+patientId);     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql.list();
			for (Map<String, Object> rs : listsubservice2) {
				PathologySampleWiseMaster objDocList = new PathologySampleWiseMaster();
				objDocList.setTreatmentId((Integer) rs.get("treatment_id"));
				treatmentIdList.add(objDocList);
			}
		} catch (Exception e) {
			e.printStackTrace();
			e.getMessage();
		}
		return treatmentIdList;
	}

	@Override
	public List<PathologySampleWiseMaster> getTreatmentIdwiseRoutineValueResult(
			Integer tId, HttpServletRequest request) {
		int count=0 ;
		String agetyp="";
		double age=0;
		double month=0;
		double days=0;
		String type=null;
		String sex=null;
		String male;
		String female;
		String others;
		String sextyp;
		SQLQuery sqlindividual = null;
		String sqlindividualcount=null;
		
		List<PathologySampleWiseMaster> ltunit = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> listofprofile = new ArrayList<PathologySampleWiseMaster>();;
		List<PathologySampleWiseMaster> listofTest = null;
		
		PathologySampleWiseMaster profileObj = null;				
		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");	   
			SQLQuery sql111 = null;
			
			SQLQuery patientage = sessionfactory.getCurrentSession().createSQLQuery("select p.age,p.age_months,p.age_days,p.gender from ehat_patient p,ehat_treatment t where p.Patient_ID=t.Patient_ID and t.Treatment_ID="+tId);     
			patientage.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> patientagelist = patientage.list();
			for (Map<String, Object> row : patientagelist) {		

				age=  (Integer)row.get("age");
	    		month= (Integer) row.get("age_months");
	    		days= (Integer) row.get("age_days");
	    		sex=  (String) row.get("gender");	  
			}
			
			
			
			sql111=sessionfactory.getCurrentSession().createSQLQuery("SELECT ep.gender AS gender,GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,ep.patient_id AS patient_id,et.treatment_id AS treatment_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.test_status=6 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.treatment_id="+tId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ");				
			sql111.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql111.list();			
			for (Map<String, Object> row1 : listsubservice2) {
				
				String patientType = (String)row1.get("gender");					
				
				String masterid = (String)row1.get("id");	
								
					String sql="";
					String id[] = masterid.split(",");			    
					for (int i = 0; i < id.length; i++) {
					Integer id1 = Integer.parseInt(id[i]);			
		 			sql="select distinct ps.profile_Id,pm.test_status from pathology_sample_wise_master pm JOIN  pathology_sample_wise_slave ps on ps.master_id=pm.id where ps.master_id="+id1+" and pm.unit_id="+unitId+" and ps.treatment_id="+tId;				
		 			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list)
					{
						Integer profileId = (Integer)row.get("profile_Id");	
						Integer teststatus = (Integer)row.get("test_status");	
						
			        	  // adding list of Profile name this list	
						 listofprofile = new ArrayList<PathologySampleWiseMaster>();															
						 Query queryprofile = sessionfactory.getCurrentSession().createSQLQuery("CALL processingRoutineResultprofileTestId(:id,0)");
						 queryprofile.setParameter("id",profileId);
						 @SuppressWarnings("unchecked")
						 List<Object> lstprofile = queryprofile.list();
						 for (int j = 0; j < lstprofile.size(); j++) 				 
		                {
								String profileName = (String) lstprofile.get(j);
								String[] profile = profileName.split(",");

								Integer profileId1 = Integer.parseInt(profile[0]);
								String profileName1 = profile[1];

								profileObj = new PathologySampleWiseMaster();
								profileObj.setProfileId(profileId1);
								profileObj.setProfileName(profileName1);
								profileObj.setTeststatus(teststatus);
								listofprofile.add(profileObj);

								// adding list of test name this list
								listofTest = new ArrayList<PathologySampleWiseMaster>();
								SQLQuery querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct test_id as test_id,test_result,test_reason,test_flag,flag_mark,master_id from  pathology_sample_wise_slave where  master_id="+ id1+ " and profile_Id="+ profileId+" and treatment_id="+tId);
								querytestId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> listtest = querytestId.list();
								for (Map<String, Object> rs1 : listtest) {		
								    
									Integer testId=(Integer) rs1.get("test_id");
									String testResult=(String) rs1.get("test_result");
									String testreason = (String) rs1.get("test_reason");
									String testflag = (String) rs1.get("test_flag");
									String flagmark = (String) rs1.get("flag_mark");
									Integer masteridslave = (Integer) rs1.get("master_id");
									PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
									 
									SQLQuery labformulaquery = sessionfactory.getCurrentSession().createSQLQuery("select expTestId from labformula where formStatus='Y' and  resultTestId="+testId);
										labformulaquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										List<Map<String, Object>> listlabformula = labformulaquery.list();
										for (Map<String, Object> rs4 : listlabformula) {								
										    testObj.setObjFormula((String) rs4.get("expTestId"));								    
									}
										
									SQLQuery testresult = sessionfactory.getCurrentSession().createSQLQuery("select valueType from  pathology_lab_test where deleted_by='0' and idTest="+testId);     
									testresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									List<Map<String, Object>> listtestresult = testresult.list();
									for (Map<String, Object> rs2 : listtestresult) {		
								    
									 String valueType=(String) rs2.get("valueType");
									 
									if(valueType.equals("general"))
									{
										    SQLQuery resultvalue = sessionfactory.getCurrentSession().createSQLQuery("select t.idTest,t.testName,t.test_general,ifnull(m.method_name,'-') as methodname from  pathology_lab_test t left join pathology_labtestmethod m on m.id=t.idtestMethod  where t.deleted_by='0' and t.idTest="+testId);     
										    resultvalue.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
											List<Map<String, Object>> resultvaluelist = resultvalue.list();
											for (Map<String, Object> rs3 : resultvaluelist) {		
												
												testObj.setTestId((Integer) rs3.get("idTest"));
												testObj.setTestName((String) rs3.get("testName"));
												testObj.setLowvalue((String) rs3.get("test_general"));										
												testObj.setMethodename((String) rs3.get("methodname"));
												testObj.setTestresult(testResult);
												testObj.setDefaultvalue((String) rs3.get("test_general"));
												testObj.setTestreason(testreason);
												testObj.setRejecttestflag(testflag);
												testObj.setFlagmark(flagmark);
												testObj.setMasterid(masteridslave);
												listofTest.add(testObj);
											}								 
									 }else if(valueType.equals("individual"))
									 {
										 
										 if (sex.equalsIgnoreCase("Male")) {																		 
										     sextyp = "1";																			
										    if (age != 0) {									    	 
											    agetyp = "1";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and  sexType='" + sextyp + "' ";
											}else
											{
												 if (month != 0) {									    	 
													    agetyp = "2";
													    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ month+ "' and lab_toage>='"+ month+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and  sexType='" + sextyp + "' ";
												 }else
												 {
													 if (days != 0) {									    	 
														    agetyp = "3";
														    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ days+ "' and lab_toage>='"+ days+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and  sexType='"+sextyp+"' ";
													 }
												 }											
											}
										    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
										    if (count > 0) {
										    	 
										    	 if (count > 1) {
										    		 
										    	      if (age != 0) {								    	    	  
										    			 agetyp = "1";	
										    			 if (month != 0) {								    				 
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );												    
															     if (days != 0) {
															    	 
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );											    	
															    }	
															     
										    			 }else {								    				 
																if (days != 0) {															
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
																}
										    		 }if (month == 0 && days == 0) {								    			 
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName, IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );								    			 
										    		 }
										    	}else {
													if (month != 0) {
														agetyp = "2";												
														if (days != 0) {
															
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,   IFNULL(n.lowerVal, '-') AS lowerVal,IFNULL(n.upperVal, '-') AS upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
														}else
														{													
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ month+ "' and n.lab_toage>='"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
														}
													}else {
														if (days != 0) {
														agetyp = "3";
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );

															}
														}
													}
												
										    	 }else
										    	 {
										    			if (age != 0) {									    	 
														    agetyp = "1";
														    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );										 
										    			}else										
										    			{											  
										    				if (month != 0) {									    	 
															agetyp = "2";
														    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>='"+ month+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.matser_id="+testId );											   
										    				}else												
										    				{												
										    					if (days != 0) {									    	 
															        agetyp = "3";
															        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.matser_id="+testId );
														
															}

														}

													}
												}
										    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
													 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
													 for (Map<String, Object> rs3 : sqlindividuallist) {		
															
														    testObj.setTestId((Integer) rs3.get("idTest"));
															testObj.setTestName((String) rs3.get("testName"));																																									
															testObj.setLowvalue((String) rs3.get("lowerVal"));
															testObj.setHighvalue((String) rs3.get("upperVal"));
															testObj.setUnitname((String) rs3.get("unitname"));												
															testObj.setMethodename((String) rs3.get("methodName"));
															testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
															
															testObj.setLabcl((String) rs3.get("labcl"));
															testObj.setLabch((String) rs3.get("labch"));
															testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
															testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
															testObj.setProvision((String) rs3.get("provision"));
															
															testObj.setTestresult(testResult);
															testObj.setTestreason(testreason);
															testObj.setRejecttestflag(testflag);
															testObj.setFlagmark(flagmark);
															testObj.setMasterid(masteridslave);
															
															listofTest.add(testObj);
													}

												

											}

										}if (sex.equalsIgnoreCase("Female")) {																		 
										     sextyp = "2";																			
										    if (age != 0) {									    	 
											    agetyp = "1";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and  sexType='" + sextyp + "' ";
											}else
											{
												 if (month != 0) {									    	 
													    agetyp = "2";
													    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ month+ "' and lab_toage>='"+ month+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and  sexType='" + sextyp + "' ";
												 }else
												 {
													 if (days != 0) {									    	 
														    agetyp = "3";
														    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ days+ "' and lab_toage>='"+ days+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and  sexType='"+sextyp+"' ";
													 }
												 }											
											}
										    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
										    if (count > 0) {
										    	 
										    	 if (count > 1) {
										    		 
										    	      if (age != 0) {								    	    	  
										    			 agetyp = "1";	
										    			 if (month != 0) {								    				 
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );												    
															     if (days != 0) {
															    	 
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );											    	
															    }	
															     
										    			 }else {								    				 
																if (days != 0) {															
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
																}
										    		 }if (month == 0 && days == 0) {								    			 
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );								    			 
										    		 }
										    	}else {
													if (month != 0) {
														agetyp = "2";												
														if (days != 0) {
															
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
														}else
														{													
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ month+ "' and n.lab_toage>='"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
														}
													}else {
														if (days != 0) {
														agetyp = "3";
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );

															}
														}
													}
												
										    	 }else
										    	 {
										    			if (age != 0) {									    	 
														    agetyp = "1";
														    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );										 
										    			}else										
										    			{											  
										    				if (month != 0) {									    	 
															agetyp = "2";
														    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>='"+ month+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.matser_id="+testId );											   
										    				}else												
										    				{												
										    					if (days != 0) {									    	 
															        agetyp = "3";
															        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.matser_id="+testId );
														
															}

														}

													}
												}
										    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
													 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
													 for (Map<String, Object> rs3 : sqlindividuallist) {		
															
														    testObj.setTestId((Integer) rs3.get("idTest"));
															testObj.setTestName((String) rs3.get("testName"));																																									
															testObj.setLowvalue((String) rs3.get("lowerVal"));
															testObj.setHighvalue((String) rs3.get("upperVal"));
															testObj.setUnitname((String) rs3.get("unitname"));												
															testObj.setMethodename((String) rs3.get("methodName"));
															testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
															
															testObj.setLabcl((String) rs3.get("labcl"));
															testObj.setLabch((String) rs3.get("labch"));
															testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
															testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
															testObj.setProvision((String) rs3.get("provision"));
															
															testObj.setTestresult(testResult);
															testObj.setTestreason(testreason);
															testObj.setRejecttestflag(testflag);
															testObj.setFlagmark(flagmark);
															testObj.setMasterid(masteridslave);
															
															listofTest.add(testObj);
													}

												

											}

										}if (sex.equalsIgnoreCase("others")) {	//other gender type																	 
										     sextyp = "3";																			
										    if (age != 0) {									    	 
											    agetyp = "1";
											    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ age+ "' and lab_toage>='"+ age+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and  sexType='" + sextyp + "' ";
											}else
											{
												 if (month != 0) {									    	 
													    agetyp = "2";
													    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ month+ "' and lab_toage>='"+ month+ "' and  matser_id='"+ testId+ "' and age_in='"+ agetyp	+ "' and  sexType='" + sextyp + "' ";
												 }else
												 {
													 if (days != 0) {									    	 
														    agetyp = "3";
														    sqlindividualcount = "select count(*) from pathology_labtestnormalvalue where lab_fage<='"+ days+ "' and lab_toage>='"+ days+ "' and  matser_id='"+ testId+ "' and age_in='"+agetyp+"' and  sexType='"+sextyp+"' ";
													 }
												 }											
											}
										    count = ((BigInteger) sessionfactory.getCurrentSession().createSQLQuery(sqlindividualcount).uniqueResult()).intValue();
										    if (count > 0) {
										    	 
										    	 if (count > 1) {
										    		 
										    	      if (age != 0) {								    	    	  
										    			 agetyp = "1";	
										    			 if (month != 0) {								    				 
															     sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );												    
															     if (days != 0) {
															    	 
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );											    	
															    }	
															     
										    			 }else {								    				 
																if (days != 0) {															
															    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>'"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
																}
										    		 }if (month == 0 && days == 0) {								    			 
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );								    			 
										    		 }
										    	}else {
													if (month != 0) {
														agetyp = "2";												
														if (days != 0) {
															
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>'"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
														}else
														{													
													    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ month+ "' and n.lab_toage>='"+ month+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );
														}
													}else {
														if (days != 0) {
														agetyp = "3";
												    	sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue , ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<'"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );

															}
														}
													}
												
										    	 }else
										    	 {
										    			if (age != 0) {									    	 
														    agetyp = "1";
														    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue ,  ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision  FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ age+ "' and n.lab_toage>='"+ age+ "' and  n.sexType='"+sextyp+"'  and n.age_in='"+ agetyp+ "' and  n.matser_id="+testId );										 
										    			}else										
										    			{											  
										    				if (month != 0) {									    	 
															agetyp = "2";
														    sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue  ,  ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch ,ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ month+ "' and n.lab_toage>='"+ month+ "' and n.sexType='"+sextyp+"' and n.age_in='"+ agetyp+ "' and n.matser_id="+testId );											   
										    				}else												
										    				{												
										    					if (days != 0) {									    	 
															        agetyp = "3";
															        sqlindividual = sessionfactory.getCurrentSession().createSQLQuery("SELECT  t.idTest, IFNULL(t.testName, '-') as testName,  IFNULL(n.lowerVal, '-') as lowerVal, IFNULL(n.upperVal, '-') as upperVal, IFNULL(u.unitName, '-') as unitname,  IFNULL(m.method_name, '-') as methodName,IFNULL(n.default_value, '-') as defaultvalue ,  ifnull(n.lab_cl, '-') as labcl, ifnull(n.lab_ch, '-') as labch , ifnull(n.non_exist_high, '-') as nonexisthigh ,ifnull(n.non_exist_low, '-')as nonexitlow , ifnull(t.provision, '-') as provision FROM  pathology_lab_test t INNER JOIN pathology_labtestnormalvalue n ON n.matser_id = t.idTest  INNER JOIN pathology_labunittype u ON u.id = n.idUnitType  LEFT JOIN pathology_labtestmethod m ON m.id = t.idtestMethod where n.lab_fage<='"+ days+ "' and n.lab_toage>='"+ days+ "' and  n.sexType='"+ sextyp+ "' and n.age_in='"+ agetyp+ "' and n.matser_id="+testId );
														
															}

														}

													}
												}
										    		 sqlindividual.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
													 List<Map<String, Object>> sqlindividuallist = sqlindividual.list();
													 for (Map<String, Object> rs3 : sqlindividuallist) {		
															
														    testObj.setTestId((Integer) rs3.get("idTest"));
															testObj.setTestName((String) rs3.get("testName"));																																									
															testObj.setLowvalue((String) rs3.get("lowerVal"));
															testObj.setHighvalue((String) rs3.get("upperVal"));
															testObj.setUnitname((String) rs3.get("unitname"));												
															testObj.setMethodename((String) rs3.get("methodName"));
															testObj.setDefaultvalue((String) rs3.get("defaultvalue"));
															
															testObj.setLabcl((String) rs3.get("labcl"));
															testObj.setLabch((String) rs3.get("labch"));
															testObj.setNonexisthigh((String) rs3.get("nonexisthigh"));
															testObj.setNonexistlow((String) rs3.get("nonexitlow"));												
															testObj.setProvision((String) rs3.get("provision"));
															
															testObj.setTestresult(testResult);
															testObj.setTestreason(testreason);
															testObj.setRejecttestflag(testflag);
															testObj.setFlagmark(flagmark);
															testObj.setMasterid(masteridslave);
															
															listofTest.add(testObj);
													}

												

											}

										}
									
									 }

									 
									 
									 
								}

							}

							}
								profileObj.setTestli(listofTest);
								ltunit.add(profileObj);
							}
						
					}
				
			}
		} catch (Exception e) {
			return ltunit;
		}
		return ltunit;
	}

	
	@Override
	public String getPageCountRecollection(String callFrom, String tabId, String emergencyFlag,
			HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		
		String sql="";
		Integer count = 0;
		if(callFrom.equalsIgnoreCase("allRecordBToB")) {
			if(userType.equalsIgnoreCase("admin")){
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
			}else{
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
			}
		}else if(callFrom.equalsIgnoreCase("rejectrecordBToB")) {
			if(userType.equalsIgnoreCase("admin")){
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
			}else{
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("pathologyrecollectionBToB")) {
			if(userType.equalsIgnoreCase("admin")){
				//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
			}else{
				//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
			}
		}else if(callFrom.equalsIgnoreCase("allRecordBToC")) {
			if(userType.equalsIgnoreCase("admin")){
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC";
			}else{
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC";
			}
		}else if(callFrom.equalsIgnoreCase("rejectrecordBToC")) {
			if(userType.equalsIgnoreCase("admin")){
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
			}else{
				//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
			}
		}else if(callFrom.equalsIgnoreCase("pathologyrecollectionBToC")) {
			if(userType.equalsIgnoreCase("admin")){
				//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
			}else{
				//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id="+userCustomerId+" and ps.customer_type="+userCustomerType+" and pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
				sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
			}
		}		
		try{
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			count = (Integer) query.list().size();
			return count.toString();
		}catch(Exception e){
			e.printStackTrace();
			log.error("getPageCountRecollection()...Error :"+e);
		}
		return count.toString();
	}

	@Override
	public List<PathologySampleWiseMaster> getAllRecollectionRequestBToBAndBToC(
			String callfrom, String emergencyFlag, HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql="";
			
			//calling BtoB Record ReCollection Request
			if(callfrom.equalsIgnoreCase("allBToB")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";				
			}else if(callfrom.equalsIgnoreCase("ARBToB")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";				
			}else if(callfrom.equalsIgnoreCase("PRBToB")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";				
			}
			//calling BtoC Record ReCollection Request
			else if(callfrom.equalsIgnoreCase("allBToC")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status = '9' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
			}else if(callfrom.equalsIgnoreCase("ARBToC")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status='4' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
			}else if(callfrom.equalsIgnoreCase("PRBToC")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
			}
						
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();	
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setTestReasonName((String)row.get("test_reason_name"));
				obj.setPatientmobile((String)row.get("mobile"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sample_type_id"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> gettestViewRecollectionRequest(
			String masterid, Integer treatmentid, String patientType,
			String reCollectionType, String tabType,HttpServletRequest request) {		
		
		List<PathologySampleWiseMaster> ltunit = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> listofprofile = new ArrayList<PathologySampleWiseMaster>();;
		List<PathologySampleWiseMaster> listofTest = null;
		PathologySampleWiseMaster profileObj = null;
		
		try {			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql="";
			String id[] = masterid.split(",");			    
			for (int i = 0; i < id.length; i++) {
			Integer id1 = Integer.parseInt(id[i]);			
 			sql="select distinct ps.profile_Id from pathology_sample_wise_master pm JOIN  pathology_sample_wise_slave ps on ps.master_id=pm.id where ps.master_id="+id1+" and pm.unit_id="+unitId+" and ps.treatment_id="+treatmentid;				
 			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list)
			{
				Integer profileId = (Integer)row.get("profile_Id");				
	        	  // adding list of Profile name this list	
				 listofprofile = new ArrayList<PathologySampleWiseMaster>();															
				 Query queryprofile = sessionfactory.getCurrentSession().createSQLQuery("CALL processingRoutineResultprofileTestId(:id,0)");
				 queryprofile.setParameter("id",profileId);
				 @SuppressWarnings("unchecked")
				 List<Object> lstprofile = queryprofile.list();
				 for (int j = 0; j < lstprofile.size(); j++) 				 
                {
						String profileName = (String) lstprofile.get(j);
						String[] profile = profileName.split("~");

						Integer profileId1 = Integer.parseInt(profile[0]);
						String profileName1 = profile[1];

						profileObj = new PathologySampleWiseMaster();
						profileObj.setProfileId(profileId1);
						profileObj.setProfileName(profileName1);				
						listofprofile.add(profileObj);

						// adding list of test name this list
						listofTest = new ArrayList<PathologySampleWiseMaster>();
						SQLQuery querytestId=null;
						if(reCollectionType.equals("BtoB") && tabType.equals("ALBToB")){
							 querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='1' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
						}else if(reCollectionType.equals("BtoB") && tabType.equals("rejectedSampleBToB")){
							 //querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='1' and ps.test_flag='N' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
							querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='1' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
						}else if(reCollectionType.equals("BtoB") && tabType.equals("pathoRecollectionBToB")){
							 //querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='1' and ps.re_collection='Y' and ps.test_flag='N'  and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
							querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='1' and ps.re_collection='Y' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
						}	else if(reCollectionType.equals("BtoC") && tabType.equals("ALBToC")){
							 querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='2' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
						}	else if(reCollectionType.equals("BtoC") && tabType.equals("rejectedSampleBToC")){
							 //querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='2' and ps.test_flag='N' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
							querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='2' and ps.master_id="+ id1+" and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
						}	else if(reCollectionType.equals("BtoC") && tabType.equals("pathoRecollectionBToC")){
							 //querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='2' and ps.re_collection='Y' and  ps.test_flag='N'  and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
							querytestId = sessionfactory.getCurrentSession().createSQLQuery("select distinct ps.test_id as test_id from  pathology_sample_wise_slave ps join pathology_sample_wise_master p on p.id=ps.master_id where p.business_type='2' and ps.re_collection='Y' and ps.master_id="+ id1+ " and ps.profile_Id="+ profileId+" and ps.treatment_id="+treatmentid);
						}	
						
						querytestId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listtest = querytestId.list();
						for (Map<String, Object> rs1 : listtest) {

							Integer testId = (Integer) rs1.get("test_id");
						
							Query querytest = sessionfactory.getCurrentSession().createSQLQuery("select t.idTest,t.testName from pathology_lab_test t where t.idTest="+testId);
							querytest.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							List<Map<String, Object>> listtestid=querytest.list();
							for(Map<String, Object> row1 : listtestid){
											
								PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();													
								testObj.setProfileId(profileId1);
								testObj.setMasterid(id1);
								testObj.setTestId((Integer)row1.get("idTest"));
								testObj.setTestName((String)row1.get("testName"));							
								listofTest.add(testObj);
								}
							}						
					}
						profileObj.setTestli(listofTest);
						ltunit.add(profileObj);
					}
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ltunit;
		}
		
		return ltunit;
	}

	@Override
	public List<PathologyTestReasonDto> getTestReasonName(String callfrom, String sampleTypeIds,
			HttpServletRequest request) {
		List<PathologyTestReasonDto> testReasonList = new ArrayList<PathologyTestReasonDto>();
		try {
			List<String> myList = new ArrayList<String>(Arrays.asList(sampleTypeIds.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			
			for(int i = 0; i < myList.size(); i++) {
				numbers.add(Integer.parseInt(myList.get(i)));   
			}
			
			Set<Integer> set = new HashSet<>(numbers);
			
			Query qry = sessionfactory.getCurrentSession().createQuery("FROM LabTestSampleDTO WHERE idTestSample IN (:idTestSample)");
				  qry.setParameterList("idTestSample", set);
				  
			List<LabTestSampleDTO> sampleTypesList = qry.list();
			
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(PathologyTestReasonDto.class);
					 criteria.add(Restrictions.eq("deleted", "N"));
					 criteria.add(Restrictions.in("labTestSampleType", sampleTypesList));
					 criteria.add(Restrictions.eq("reasonType", callfrom));         
					 criteria.addOrder(Order.asc("testReasonName"));
					
				testReasonList = criteria.list();
            
			return  testReasonList;
        } catch(Exception e) {
            e.printStackTrace();
            return testReasonList;
        }
	}

	@Override
	public boolean processingAreaRecollectionTest(String recollectionList,String recollectionReason,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
	
		try{
			PathologySampleWiseSlave sendtodto = (PathologySampleWiseSlave) ConfigUIJSONUtility.getObjectFromJSON(recollectionList,PathologySampleWiseSlave.class);
			List<PathologySampleWiseSlave> slaveList = sendtodto.getPathologySampleWiseSlaveList();
			
			String recollectionstaus="Y";
			for(PathologySampleWiseSlave obj : slaveList) {			
				String sql = "UPDATE pathology_sample_wise_slave set re_collection='"+recollectionstaus+"' ,re_collection_reason="+recollectionReason+" where profile_Id='"+obj.getProfileId()+"' and test_id='"+obj.getTestid()+"' and master_id='"+obj.getMasterIdd()+"' and unit_id="+unitId;
				//System.out.println(sql+"sql");
				Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.executeUpdate();	
			}
		
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@Override
	public boolean unjectsampleAccessionTab(String masterId, String callform,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
			
		    if(callform.equals("allrecord")){
				String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=2";
				Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
				Integer result = ((Number)query12.uniqueResult()).intValue();
				
				result++;
				
				List<String> myList = new ArrayList<String>(Arrays.asList(masterId.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));   
				}
			    
				String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, rejecteddatetime =:rejecteddatetime, rejectedBy =:rejectedBy where sampleWiseMasterId IN (:sampleWiseMasterId)";
				Query query = sessionfactory.getCurrentSession().createQuery(sql1);

				query.setParameter("rejecteddatetime", new Date(new java.util.Date().getTime()));
				query.setParameter("rejectedBy", userId);
				query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", 2);
				query.setParameter("sampleCount", result);
				query.executeUpdate();
			  }else{
				String sqlRef = "select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=2";
				Query query12 = sessionfactory.getCurrentSession().createSQLQuery(sqlRef);
				Integer result = ((Number) query12.uniqueResult()).intValue();

				result++;
				
				List<String> myList = new ArrayList<String>(Arrays.asList(masterId.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));   
				}
			
				String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, rejecteddatetime =:rejecteddatetime, rejectedBy =:rejectedBy where sampleWiseMasterId IN (:sampleWiseMasterId)";
				Query query = sessionfactory.getCurrentSession().createQuery(sql1);

				query.setParameter("rejecteddatetime", new Date(new java.util.Date().getTime()));
				query.setParameter("rejectedBy", userId);
				query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", 2);
				query.setParameter("sampleCount", result);
				query.executeUpdate();
			}
			
			
          
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public String getRecordCountForAuthorizeTabIndicator(Integer statusCode, String txtFdate, String txtTdate, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		
		Integer countCrilicallyAbnormal=0;
		Integer countAbnormal=0;
		Integer countNormal=0;
		Integer countAll=0;
		String result="";
		
		StringBuffer fd = new StringBuffer();
		StringBuffer td = new StringBuffer();
		String[] fDate = txtFdate.split("/");
			fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
			
		String[] tDate = txtTdate.split("/");
			td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
				
		LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();
		try {		
			
			Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_rcf_authorize_tab_indicator(:unitId, :statusCode, :fd, :td, :userType)");
			querySp.setParameter("unitId", unitId);
			querySp.setParameter("statusCode", statusCode);
			querySp.setParameter("fd", fd.toString());
			querySp.setParameter("td", td.toString());
			querySp.setParameter("userType", userType);
			querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
			@SuppressWarnings("unchecked")
			List<LisTabCountDto> resultCount = querySp.list();				
			result = resultCount.get(0).getResult();
			
			/*SQLQuery sql1 = null;
			String sql="";
			
			//sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ifnull(ts.master_id,0) as master_id,ifnull(ts.low_value,0) as low_value,ifnull(ts.critical_low_value,0) as critical_low_value,ifnull(ts.high_values,0)as high_values,ifnull(ts.critical_high_value,0) as critical_high_value,ifnull(ts.test_result,0) as test_result from pathology_lab_phlebotomymaster pm join pathology_lab_phlebotomy_test_salve ts on(pm.phlebotomy_master_id = ts.master_id) where ts.test_flag='Y' and pm.test_status='U' ");     

			if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
				sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.unit_Id="+unitId+" and sm.test_status="+statusCode+" and sm.deleted='N' ");
			}else{
				//sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.unit_Id="+unitId+" and sm.test_status="+statusCode+" and sm.deleted='N' and sm.customer_id IN ("+userCustomerId+") ");
				sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.unit_Id="+unitId+" and sm.test_status="+statusCode+" and sm.deleted='N' ");
			}

			sql1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice3 = sql1.list();
			for(Map<String, Object> rs2 : listsubservice3) {
				Integer masterId =0;
				String lowValuee="";
				String criticalLowValuee="";
				String highValuess="";
				String criticalHighValuee="";;
				String testResultt="";
				
				testResultt=(String) rs2.get("flag_mark");
				masterId=((Number) rs2.get("master_id")).intValue();
				 				 
				if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
					testResultt="-";
				}if(masterId == null){
					masterId=0;
				}
				
				if(testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
					cAbnormalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
					abnormalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
					normalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("H")) {// for High Value Check
					abnormalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
					cAbnormalSet.add(masterId);
				}
				if(!testResultt.equalsIgnoreCase("CL")
						&& !testResultt.equalsIgnoreCase("NE")
						&& !testResultt.equalsIgnoreCase("L")
						&& !testResultt.equalsIgnoreCase("N")
						&& !testResultt.equalsIgnoreCase("H")
						&& !testResultt.equalsIgnoreCase("CH")
						&& !testResultt.equalsIgnoreCase("Positive")
						&& !testResultt.equalsIgnoreCase("Detected")
						&& !testResultt.equalsIgnoreCase("Negative")
						&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text data Value Check
					
					normalSet.add(masterId);
				}
			}
			abnormalSet.removeAll(cAbnormalSet);							
			normalSet.removeAll(cAbnormalSet);
			normalSet.removeAll(abnormalSet);
					
			countCrilicallyAbnormal=cAbnormalSet.size();
			countAbnormal=abnormalSet.size();
			countNormal=normalSet.size();
			
			List<Integer> todaysList = getTodyasCount(statusCode,txtFdate, txtTdate, request);
			
			String normal = todaysList.get(0)+"/"+countNormal;
			String abnormal = todaysList.get(1)+"/"+countAbnormal;
			String cAbnormal = todaysList.get(2)+"/"+countCrilicallyAbnormal;
			String all = (todaysList.get(0)+todaysList.get(1)+todaysList.get(2))+"/"+(countNormal+countAbnormal+countCrilicallyAbnormal);
			String patientWise = todaysList.get(3)+"/"+getTreatmentWiseReportedRecordsCount(statusCode, txtFdate, txtTdate, "all", request);
			
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			String[] fDate = txtFdate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
			String[] tDate = txtTdate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			
			
			String sqltemp="select count(*) as tempcount from pathology_sample_wise_master sm  where sm.template_wise like 'H%' and sm.unit_Id="+unitId+" and sm.test_status="+statusCode+" and sm.deleted='N' and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"'";
			
			SQLQuery sqltempcount = sessionfactory.getCurrentSession().createSQLQuery(sqltemp);
			int templateCount=((Number) sqltempcount.uniqueResult()).intValue();
			
			result = cAbnormal+","+abnormal+","+normal+","+all+","+patientWise+","+templateCount; */
			
		}catch (Exception e) {
			e.printStackTrace();
			log.error("getRecordCountForAuthorizeTabIndicator()...Error :"+e);
		}	
		return result;
	}
	
	/**************************************************************************
     * @author Kranti godse
     * @date 15 april 2021
     * ***********************************************************************/

	private List<Integer> getTodyasCount(Integer statusCode,String txtFdate, String txtTdate, HttpServletRequest request) {
		SQLQuery sql = null;
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");

		StringBuffer fd = new StringBuffer();
		StringBuffer td = new StringBuffer();
		String[] fDate = txtFdate.split("/");
			fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
			
		String[] tDate = txtTdate.split("/");
			td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);

		Integer todaysCountCrilicallyAbnormal=0;
		Integer todaysCountAbnormal=0;
		Integer todaysCountNormal=0;
		LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();
		
		if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
			sql = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.unit_Id="+unitId+" and sm.test_status="+statusCode+" and sm.deleted='N' and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"'");
		}else{
			//sql = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.unit_Id="+unitId+" and sm.test_status="+statusCode+" and sm.deleted='N' and sm.customer_id IN ("+userCustomerId+") and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"'");
			sql = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.unit_Id="+unitId+" and sm.test_status="+statusCode+" and sm.deleted='N' and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"'");
		}
		sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listsubservice = sql.list();
		for(Map<String, Object> rs2 : listsubservice) {
			Integer masterId =0;
			String lowValuee="";
			String criticalLowValuee="";
			String highValuess="";
			String criticalHighValuee="";;
			String testResultt="";
			
			testResultt=(String) rs2.get("flag_mark");
			masterId=((Number) rs2.get("master_id")).intValue();
			 				 
			if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
				testResultt="-";
			}if(masterId == null){
				masterId=0;
			}
			
			if(testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
				cAbnormalSet.add(masterId);
			}
			if(testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
				abnormalSet.add(masterId);
			}
			if(testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
				normalSet.add(masterId);
			}
			if(testResultt.equalsIgnoreCase("H")) {// for High Value Check
				abnormalSet.add(masterId);
			}
			if(testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
				cAbnormalSet.add(masterId);
			}
			if(!testResultt.equalsIgnoreCase("CL")
					&& !testResultt.equalsIgnoreCase("NE")
					&& !testResultt.equalsIgnoreCase("L")
					&& !testResultt.equalsIgnoreCase("N")
					&& !testResultt.equalsIgnoreCase("H")
					&& !testResultt.equalsIgnoreCase("CH")
					&& !testResultt.equalsIgnoreCase("Positive")
					&& !testResultt.equalsIgnoreCase("Detected")
					&& !testResultt.equalsIgnoreCase("Negative")
					&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text data Value Check
				
				normalSet.add(masterId);
			}
		}
		abnormalSet.removeAll(cAbnormalSet);							
		normalSet.removeAll(cAbnormalSet);
		normalSet.removeAll(abnormalSet);
				
		todaysCountCrilicallyAbnormal=cAbnormalSet.size();
		todaysCountAbnormal=abnormalSet.size();
		todaysCountNormal=normalSet.size();
		
		List<Integer> todaysCountLst = new ArrayList<>();
		todaysCountLst.add(todaysCountNormal);
		todaysCountLst.add(todaysCountAbnormal);
		todaysCountLst.add(todaysCountCrilicallyAbnormal);
		todaysCountLst.add(getTreatmentWiseReportedRecordsCount(statusCode, txtFdate, txtTdate, "byDate", request));
		return todaysCountLst;
	}

	private int getTreatmentWiseReportedRecordsCount(Integer statusCode, String txtFdate, String txtTdate, String callFrom, HttpServletRequest request) {
		String sql = null;
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		List<Integer> patientList = new ArrayList<>();

		try {
			if(callFrom.equalsIgnoreCase("byDate")) {
				StringBuffer fd = new StringBuffer();
				StringBuffer td = new StringBuffer();
				String[] fDate = txtFdate.split("/");
					fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
					
				String[] tDate = txtTdate.split("/");
					td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
					
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status="+statusCode+" and ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' group by et.treatment_id ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status="+statusCode+" and ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' group by et.treatment_id ORDER BY et.treatment_id DESC";
				}
				
				Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				for(Map<String, Object> row : list) {
					patientList.add((Integer)row.get("patient_id"));
				}
				return patientList.size();
			}else {
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status="+statusCode+" and ps.in_out_house=0 and ps.unit_Id="+unitId+" group by et.treatment_id ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status="+statusCode+" and ps.in_out_house=0 and ps.unit_Id="+unitId+" group by et.treatment_id ORDER BY et.treatment_id DESC";
				}
				
				Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				for(Map<String, Object> row : list) {
					patientList.add((Integer)row.get("patient_id"));
				}
				
				return patientList.size();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return patientList.size();
	}
	
	@Override
	public List<PathologySampleWiseMaster> getRecordAgainstIndicator(String indicatorType, Integer startIndex,Integer statusCode, String fromDate,String toDate,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		
		
		Integer countCrilicallyAbnormal=0;
		Integer countAbnormal=0;
		Integer countNormal=0;
		
		//Map<String , String> routineValueMap=new HashMap<String,String>();
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();

		String newSetString="";
		//List<Integer> newSetList = new ArrayList<Integer>();
		try {			
			
			SQLQuery sql1 = null;
			
			String sql="";
			
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			String[] fDate = fromDate.split("/");
			fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
			String[] tDate = toDate.split("/");
			td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			
			if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
				//	sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status="+statusCode+" and sm.deleted='N' AND sm.unit_Id="+unitId+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' ");
				sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status="+statusCode+" and sm.deleted='N' AND sm.unit_Id="+unitId+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' order by sm.authorized_date desc ");
			}else{
				
				//sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status="+statusCode+" and sm.deleted='N' AND sm.unit_Id="+unitId+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' ");
				sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status="+statusCode+" and sm.deleted='N' AND sm.unit_Id="+unitId+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' order by sm.authorized_date desc ");
			}
			sql1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice3 = sql1.list();
			for (Map<String, Object> rs2 : listsubservice3) {
				
				Integer masterId =0;
				String testResultt="";
				
				
				 testResultt=(String) rs2.get("flag_mark");
				 masterId=((Number) rs2.get("master_id")).intValue();
				 				 
				 if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
					 testResultt="-";
				 } if(masterId == null){
					 masterId=0;
				 }				
				
				if (testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
																
					cAbnormalSet.add(masterId);
				}
				if (testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
					
					abnormalSet.add(masterId);
				}
				if (testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
														
					normalSet.add(masterId);
				}
				if (testResultt.equalsIgnoreCase("H")) {// for High Value Check
					abnormalSet.add(masterId);
				}
				if (testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
					
					cAbnormalSet.add(masterId);
				}
				if (!testResultt.equalsIgnoreCase("CL")
						&& !testResultt.equalsIgnoreCase("NE")
						&& !testResultt.equalsIgnoreCase("L")
						&& !testResultt.equalsIgnoreCase("N")
						&& !testResultt.equalsIgnoreCase("H")
						&& !testResultt.equalsIgnoreCase("CH")
						&& !testResultt.equalsIgnoreCase("Positive")
						&& !testResultt.equalsIgnoreCase("Detected")
						&& !testResultt.equalsIgnoreCase("Negative")
						&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text Value Check

					normalSet.add(masterId);
				}
				
			}
			
				abnormalSet.removeAll(cAbnormalSet);							
				normalSet.removeAll(cAbnormalSet);
				normalSet.removeAll(abnormalSet);
				
				countCrilicallyAbnormal=cAbnormalSet.size();
				countAbnormal=abnormalSet.size();
				countNormal=normalSet.size();
			
		
			/*routineValueMap.put("cAbnormal", countCrilicallyAbnormal.toString());
			routineValueMap.put("cAbnormalList", cAbnormalSet.toString());
			
			routineValueMap.put("abnormal", countAbnormal.toString());
			routineValueMap.put("abnormalList", abnormalSet.toString());
			
			routineValueMap.put("normal", countNormal.toString());
			routineValueMap.put("normalList", normalSet.toString());*/
			
		
		
		
		if(indicatorType.equalsIgnoreCase("normal")){
			newSetString = normalSet.toString().replaceAll("(^\\[|\\]$)", "");
		}else if(indicatorType.equalsIgnoreCase("abnormal")){
			newSetString = abnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
		}else if(indicatorType.equalsIgnoreCase("cAbnormal")){
			newSetString = cAbnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
		}else if(indicatorType.equalsIgnoreCase("templateList")){
			newSetString = normalSet.toString().replaceAll("(^\\[|\\]$)", "");
		}
		//System.err.println("newSetList -- "+newSetString);
			
		if(!newSetString.equals("")) {
			String sql11="";
			if(indicatorType.equalsIgnoreCase("templateList")){
				
				System.out.println("sql11 templateList"+sql11);
				//sql11="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.template_wise like('H%') AND ps.test_status="+statusCode+" and ps.in_out_house=0 AND ssm.id in("+newSetString+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY ps.authorized_date DESC ";
			//	sql11="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.template_wise like('H%') AND ps.test_status="+statusCode+" and ps.in_out_house=0  group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY ps.authorized_date DESC ";
				//sql11="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.template_wise like('H%') AND ps.test_status="+statusCode+" and ps.in_out_house=0 and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY ps.authorized_date DESC ";
				sql11="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id  where ps.template_wise like('H%') AND ps.test_status="+statusCode+" and ps.in_out_house=0 and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY ps.authorized_date DESC ";
			}else {
			//sql11="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.template_wise not like('H%') AND ps.test_status="+statusCode+" and ps.in_out_house=0 AND ssm.id in("+newSetString+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				sql11="SELECT ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.template_wise not like('H%') AND ps.test_status="+statusCode+" and ps.in_out_house=0 and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"'  group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql11);
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setProfileId((Integer)row.get("profile_Id"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPathologistId((Integer)row.get("pathologist_id"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setEmailStatus((String)row.get("email_status"));
				obj.setEmailId((String)row.get("email_id"));
				labPatRecordlist.add(obj);
			}
		}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}
	@Override
	public boolean sendToOutSourceTest(String idList, Integer labCenterId,
			String dispatchDate, String dispatchTime, String carrierName,
			String comment,Integer inouthouse, HttpServletRequest request) {	
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
		Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
		try {
			
		    String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=8";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer result = ((Number)query12.uniqueResult()).intValue();
			
			result++;
			
			List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			for(int i = 0; i < myList.size(); i++) {
				   
				numbers.add(Integer.parseInt(myList.get(i)));
				   
				/*String sqlAdvc = "SELECT ifnull(b.business_type,0) as businessType,ifnull(b.amount,0) as amount,ifnull(b.customer_id,0) as customer_id, ifnull(bm.payment_flag,'0') as paymentFlag FROM ehat_bill_details b join pathology_sample_wise_master ps on(b.bill_details_id = ps.bil_det_id) left join business_master_new bm on(b.customer_id = bm.id) where ps.id = "+ Integer.parseInt(myList.get(i));
				Query advcQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlAdvc);
				advcQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listAdvc = advcQuery.list();	
				for(Map<String, Object> row : listAdvc){
					
					int businessType = ((Number)row.get("businessType")).intValue();
					if(businessType == 1) {
						
						String customerType = (String)row.get("paymentFlag");
						if(customerType.equalsIgnoreCase("prepaid")) {
							
							double amount = (Double)row.get("amount");
							int customerId = ((Number)row.get("customer_id")).intValue();
							
							String sqlCy="select ifnull(max(cc.cycle_id),0) as id from cycle_count_master cc where cc.customer_id="+customerId+" and cc.deleted='N' ";
							Query cyQuery = sessionfactory.getCurrentSession().createSQLQuery(sqlCy);
							int cycleId = ((Number)cyQuery.uniqueResult()).intValue();
							
							if(cycleId > 0) {
							
								CycleCountDto objCount = (CycleCountDto) sessionfactory.getCurrentSession().get(CycleCountDto.class, cycleId);
								objCount.setConsumedAmount(objCount.getConsumedAmount() + amount);
								objCount.setRemainAmount(objCount.getRemainAmount() - amount);
							}							
						}
					}
				}*/
			}    
			String sql1 = "UPDATE PathologySampleWiseMaster set inOutHouse =:inOutHouse, collecteddatetime =:collecteddatetime,collectedBy =:collectedBy,sampleCount =:sampleCount, teststatus =:teststatus, labCenterId =:labCenterId, dispatchDate =:dispatchDate,dispatchTime =:dispatchTime ,carrierId =:carrierId ,commentId =:commentId  where sampleWiseMasterId IN (:sampleWiseMasterId)";
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
		    
			query.setParameter("collecteddatetime", new Date(new java.util.Date().getTime()));
			query.setParameter("collectedBy", userId);
		    query.setParameter("labCenterId", labCenterId);
		    query.setParameter("dispatchDate", dispatchDate);
		    query.setParameter("dispatchTime", dispatchTime);
		    query.setParameter("carrierId", carrierName);
		    query.setParameter("commentId", comment);
		    query.setParameterList("sampleWiseMasterId", numbers);
		    query.setParameter("inOutHouse", inouthouse);
			query.setParameter("teststatus", 8);
			query.setParameter("sampleCount", result);
			query.executeUpdate();
			
	} catch (Exception e) {
		e.printStackTrace();
		return false;
	}
	return true;
			
	}

	@Override
	public List<PathologySampleWiseMaster> getForcedOutSourcedRecord(String emergencyFlag,
			HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";
			
			if(userType.equalsIgnoreCase("admin"))
				sql="SELECT et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			else
				sql="SELECT et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status =8  and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setOutlabName((String)row.get("out_lab_name"));
				obj.setCarrierId((String)row.get("carrier_name"));
				obj.setCommentId((String)row.get("comment"));
				obj.setDispatchDate((String)row.get("dispatch_date"));
				obj.setDispatchTime((String)row.get("dispatch_time"));
				
				obj.setPatientage((Integer)row.get("age"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				obj.setDocname((String)row.get("docname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
			}
		
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> outSourcedPatientAutoSuggestion(
			String searchText, String tabId, HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";		

			if(userType.equalsIgnoreCase("admin")){
				
				if(tabId.equalsIgnoreCase("outsource")) {
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id  where ps.test_status!=1 and ps.in_out_house=1 and eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' group by ps.treatment_id ORDER BY et.treatment_id DESC";
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id  where ps.test_status =8  and eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' group by ps.treatment_id ORDER BY et.treatment_id DESC";
				}			
			}else{				
				if(tabId.equalsIgnoreCase("outsource")) {
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id  where ps.customer_id IN ("+userCustomerId+") and ps.test_status!=1 and ps.in_out_house=1 and eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' group by ps.treatment_id ORDER BY et.treatment_id DESC";
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=8  and eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' group by ps.treatment_id ORDER BY et.treatment_id DESC";
				}
			}
			
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();			
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
			}
		
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> getOutSourceTypeById(Integer outSourceType,
			Integer outSourceTypeId, String tabId, HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";		
			
	        if(userType.equalsIgnoreCase("admin")){
				
				if(tabId.equalsIgnoreCase("outsource")) {
					sql="SELECT ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status !=1 and  ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					sql="SELECT po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" and  ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";						
				}			
			}else{				
				if(tabId.equalsIgnoreCase("outsource")) {
					sql="SELECT ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=1 and  ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+"  group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					sql="SELECT po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+"  group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";						
				}
			}
			
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				
				obj.setOutlabName((String)row.get("out_lab_name"));
				obj.setCarrierId((String)row.get("carrier_name"));
				obj.setCommentId((String)row.get("comment"));
				obj.setDispatchDate((String)row.get("dispatch_date"));
				obj.setDispatchTime((String)row.get("dispatch_time"));				
				obj.setPatientage((Integer)row.get("age"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				obj.setDocname((String)row.get("docname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setTemplateWise((String)row.get("template_wise"));
				obj.setProfileId(((Number)row.get("profile_Id")).intValue());
				obj.setSubServiceId(((Number)row.get("sub_service_id")).intValue());
				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
			}
		
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> fetchLabNameByType(
			Integer outSourceType, HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";		

			if(userType.equalsIgnoreCase("admin")){			
				sql="SELECT po.out_lab_name,po.out_lab_id FROM pathology_sample_wise_master ps JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id WHERE ps.in_out_house="+outSourceType+" and  ps.test_status = 8 AND ps.unit_Id ="+unitId+" group by ps.lab_center_id ";							
			}else{							
				sql="SELECT po.out_lab_name,po.out_lab_id FROM pathology_sample_wise_master ps JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id WHERE ps.customer_id IN ("+userCustomerId+") ps.in_out_house="+outSourceType+" and ps.test_status = 8 AND ps.unit_Id ="+unitId+" group by ps.lab_center_id ";				
			}			
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();			
				obj.setOutlabName((String)row.get("out_lab_name"));
				obj.setLabCenterId((Integer)row.get("out_lab_id"));
				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
			}
		
		return labPatRecordlist;
	}


	@Override
	public boolean sendToPhlebotomyRecollection(String idList,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
			
		    	
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=1";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer result = ((Number)query12.uniqueResult()).intValue();
				
			result++;
				
				
			List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			for(int i = 0; i < myList.size(); i++) {
				numbers.add(Integer.parseInt(myList.get(i)));
			}
				
			String sql1 = "UPDATE PathologySampleWiseMaster set  recollectionFlag =:recollectionFlag,sampleCount =:sampleCount, teststatus =:teststatus, createDate =:createDate, createdBy =:createdBy where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    
			    query.setParameter("createDate", new Date(new java.util.Date().getTime()));
			    query.setParameter("createdBy", userId);
			    query.setParameter("recollectionFlag", "Y");
			    query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", 1);
				query.setParameter("sampleCount", result);
				query.executeUpdate();
				
				updateDeleteFlagForInvoiceOnRecollectAndUnreject(numbers, unitId, userId, "LIS");
				
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean rejectSampleFromRecollection(String idList,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
			
		    	
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=4";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer result = ((Number)query12.uniqueResult()).intValue();
				
			result++;
				
				
			List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			for(int i = 0; i < myList.size(); i++) {
					   numbers.add(Integer.parseInt(myList.get(i)));   
					}
				
			String sql1 = "UPDATE PathologySampleWiseMaster set  sampleCount =:sampleCount, teststatus =:teststatus, rejecteddatetime =:rejecteddatetime, rejectedBy =:rejectedBy where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    
			    query.setParameter("rejecteddatetime", new Date(new java.util.Date().getTime()));
			    query.setParameter("rejectedBy", userId);
			    query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", 4);
				query.setParameter("sampleCount", result);
				query.executeUpdate();
		    	
			 
			
          
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean dropSampleFromRecollection(String idList,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
			
		    	
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=0";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer result = ((Number)query12.uniqueResult()).intValue();
				
			result++;
				
				
			List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			for(int i = 0; i < myList.size(); i++) {
					   numbers.add(Integer.parseInt(myList.get(i)));   
					}
				
			String sql1 = "UPDATE PathologySampleWiseMaster set  sampleCount =:sampleCount, teststatus =:teststatus, dropDateTime =:dropDateTime, dropBy =:dropBy where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    
			    query.setParameter("dropDateTime", new Date(new java.util.Date().getTime()));
			    query.setParameter("dropBy", userId);
			    query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", 0);
				query.setParameter("sampleCount", result);
				query.executeUpdate();
		    	
			 
			
          
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean sendToProcessingTest(String phlebotomyListTestsalve,
			String callfrom, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer userId = (Integer) session.getAttribute("userId1");
			
			PathologySampleWiseSlave sendtodto = (PathologySampleWiseSlave) ConfigUIJSONUtility.getObjectFromJSON(phlebotomyListTestsalve,PathologySampleWiseSlave.class);
			List<PathologySampleWiseSlave> slaveList = sendtodto.getPathologySampleWiseSlaveList();							
			for (PathologySampleWiseSlave obj : slaveList) {

			String	sql = "UPDATE pathology_sample_wise_slave set re_collection='"+ obj.getRecollection() + "' where profile_id='"+ obj.getProfileId() + "' and test_id='"+ obj.getTestid() + "' and master_id="+obj.getMasterIdd();
			Query query5 = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query5.executeUpdate();

			}
				
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean rejectTestRequestInPathologistTab(
			String phlebotomyListTestsalve, String callfrom,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer userId = (Integer) session.getAttribute("userId1");
			
			PathologySampleWiseSlave sendtodto = (PathologySampleWiseSlave) ConfigUIJSONUtility.getObjectFromJSON(phlebotomyListTestsalve,PathologySampleWiseSlave.class);
			List<PathologySampleWiseSlave> slaveList = sendtodto.getPathologySampleWiseSlaveList();							
			for (PathologySampleWiseSlave obj : slaveList) {

			String	sql = "UPDATE pathology_sample_wise_slave set test_flag='"+ obj.getTestflag() + "' where profile_id='"+ obj.getProfileId() + "' and test_id='"+ obj.getTestid() + "' and master_id="+obj.getMasterIdd();
			System.out.println(sql);
			Query query5 = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query5.executeUpdate();

			}
				
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	private String getCenterName(Integer customerType, Integer customerId){
		Session session = null;
		String hql = null;
		try{
			session = sessionfactory.getCurrentSession();
			
			if(customerType.equals(0)){
				return "B2C";
			}else{
				if(customerType.equals(1) || customerType.equals(2)){
					hql = "SELECT name FROM BusinessCustMasterDto WHERE id=:id";
				}else if(customerType.equals(3)){
					hql = "SELECT hospitalName FROM AdminHospitalMasterDTO WHERE id=:id";
				}else if(customerType.equals(4)){
					hql = "SELECT clinicName FROM AdminClinicMasterDTO WHERE id=:id";
				}else if(customerType.equals(5)){
					hql = "SELECT collectionName FROM CollectionMasterDto WHERE id=:id";
				}
				
				Query qry = session.createQuery(hql);
					  qry.setParameter("id", customerId);
				String centerName = (String) qry.uniqueResult();
				
				return centerName;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "-";
	}
	
	@Override
	public List<PathologySampleWiseMaster> getTestwiseTrendanalysis(
			Integer patientId, Integer testId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		String sql="";
		List<PathologySampleWiseMaster> trendAnalysisList = new ArrayList<PathologySampleWiseMaster>();
		
		try{
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT SUBSTR(ps.created_date_time, 1, 20) AS datetime,ps.test_result,pt.testName,pt.idTest FROM pathology_sample_wise_slave ps inner join pathology_sample_wise_master pm on pm.id=ps.master_id inner join pathology_lab_test pt on pt.idTest=ps.test_id WHERE ps.patient_id = "+patientId+" AND ps.test_id = "+testId+" and pm.test_status='6' and pm.unit_Id="+unitId;
			}else{
				sql="SELECT SUBSTR(ps.created_date_time, 1, 20) AS datetime,ps.test_result,pt.testName,pt.idTest FROM pathology_sample_wise_slave ps inner join pathology_sample_wise_master pm on pm.id=ps.master_id inner join pathology_lab_test pt on pt.idTest=ps.test_id WHERE ps.patient_id = "+patientId+" AND ps.test_id = "+testId+" and pm.test_status='6' and pm.customer_id IN ("+userCustomerId+") and pm.unit_Id="+unitId ;
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);		
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for (Map<String, Object> row : list) {
				
			 PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
			 
				obj.setCollecteddate((String) row.get("datetime"));
				obj.setTestresult((String) row.get("test_result"));
				obj.setTestName((String) row.get("testName"));
				obj.setTestId((Integer) row.get("idTest"));

				trendAnalysisList.add(obj);
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("getTestwiseTrendanalysis()...Error :"+e);
		}
		return trendAnalysisList;
	}

	@Override
	public List<LabPhlebotomyMaster> getmachinename(HttpServletRequest request) {
		List<LabPhlebotomyMaster> machinelist = new ArrayList<LabPhlebotomyMaster>();
		try {		
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("select concat(ifnull(am.asset_item_id,'-'),' ', ifnull(am.serial_no,'0')) as machineId ,concat(ifnull(am.asset_item_name,'-'),' ', ifnull(am.serial_no,'0')) as machineName from inv_item_asset_maintenance_master as am where am.asset_type='LABEQUIPMENT'");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listmachine = sql.list();
			for (Map<String, Object> rs : listmachine) {
				LabPhlebotomyMaster objDocList = new LabPhlebotomyMaster();
				objDocList.setMachineName((String) rs.get("machineName"));
				objDocList.setmId((String) rs.get("machineId"));				
				machinelist.add(objDocList);
			}
		} catch (Exception e) {
			e.printStackTrace();
			e.getMessage();
		}
		return machinelist;
	}

	@Override
	public boolean bulkPostRecord(String idList, HttpServletRequest request,HttpServletResponse res) {
		
		try {
			    
			    HttpSession session = request.getSession();
			    Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			    Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
				 //HttpServletResponse res = null;

			    String[] masterId = idList.split("-");
				
				for(String ids : masterId) {
				
					List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
					ArrayList<Integer> numbers = new ArrayList<Integer>();			
					for(int i = 0; i < myList.size(); i++) {
						numbers.add(Integer.parseInt(myList.get(i)));   
					}
					
					Integer countVal = 0;
					String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status='6'";
					Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);        	 
					Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
					
					countVal = sampleCount + 1;
					
					Integer uId = (Integer) session.getAttribute("uId");	    
					String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, postdatetime =:postdatetime, postBy =:postBy where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
					Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
			    
					query4.setParameter("postdatetime", new Date(new java.util.Date().getTime()));
					query4.setParameter("postBy", userId);
					query4.setParameterList("sampleWiseMasterId", numbers);
					query4.setParameter("teststatus", 6);
					query4.setParameter("sampleCount", countVal);
				
					query4.executeUpdate();
					
				}
			} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean checkDuplicateFile(String documentName, String Id) {
		Session session = null;
		boolean isDulipcate = false;
		try{
			String documents[] = documentName.split(",");
			List<String> docList = Arrays.asList(documents);
			List<String> dbList = new ArrayList<>();
			
			session = sessionfactory.getCurrentSession();
			Query hql = session.createQuery("SELECT documentpath AS documentName FROM SendToOutSourceDocumentDto WHERE deleted =:deleted AND outmasterId =:outmasterId");
			hql.setParameter("outmasterId", Id);
			hql.setParameter("deleted", "N");
			
			hql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = hql.list();
			for (Map<String, Object> rs : list) {
				String docName = null;
				docName = ((String) rs.get("documentName"));
				
				String[] names = docName.split(",");
				for(String name : names){
					dbList.add(name);
				}
			}
			
			for(String docToBeUpload : docList){
				for(String docUploaded : dbList){
					if(docToBeUpload.equals(docUploaded)){
						isDulipcate = true;
						
						break;
					}
				}
			}
			return isDulipcate;
		}catch(Exception e){
			e.printStackTrace();
		}
		return isDulipcate;
	}

	@Override
	public int saveOutsourceDocument(List<SendToOutSourceDocumentDto> docList) {
		try {
			for(SendToOutSourceDocumentDto dto : docList)
				sessionfactory.getCurrentSession().merge(dto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 2;
	
	}

	@Override
	public List<SendToOutSourceDocumentDto> getOutsourceDocumentsById(
			Integer treatmentId, Integer id) {
		List<SendToOutSourceDocumentDto> ltoutsource = null;
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(SendToOutSourceDocumentDto.class);			
			criteria.add(Restrictions.in("outmasterId",new String[] {id.toString()}));
			//criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("id"));
			ltoutsource = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltoutsource;
	}

	@Override
	public boolean deleteOutSourceUploadedDocument(Integer outmasterId,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
			SendToOutSourceDocumentDto outSourceDto = (SendToOutSourceDocumentDto) sessionfactory.getCurrentSession().get(SendToOutSourceDocumentDto.class,outmasterId);
			outSourceDto.setDeleted("Y");
			//outSourceDto.setDocument("");
			outSourceDto.setDeleteDate(new Date(new java.util.Date().getTime()));
			outSourceDto.setDeleteBy(userId);

			String[] fileNames = outSourceDto.getDocumentpath().split(",");
			for(String fileName : fileNames){
				File uploadPath = new File(FilePathPathology.getOutsourceFilesPath() + outSourceDto.getOutmasterId());
				String filepath = Paths.get(uploadPath.toString(), fileName).toString();
				 File file = new File(filepath); 
			       	  file.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<LabMicroorganismsDto> getmicroorganismName(Integer testId,HttpServletRequest request) {
		List<LabMicroorganismsDto> ltmicro = new ArrayList<LabMicroorganismsDto>();
		try {
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("select microorganism_id,microorganism_name from pathology_labmicroorganisms where test_id = '"+testId+"'");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql.list();
			for (Map<String, Object> rs : listsubservice2) {
				LabMicroorganismsDto objmicroList = new LabMicroorganismsDto();		
				objmicroList.setMicroorganismId((Integer) rs.get("microorganism_id"));
				objmicroList.setMicroorganismName((String) rs.get("microorganism_name"));
				ltmicro.add(objmicroList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltmicro;
	}

	@Override
	public List<LabGradingsDto> getgradingName(Integer testId,
			HttpServletRequest request) {
		List<LabGradingsDto> ltgrading = new ArrayList<LabGradingsDto>();
		try {
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("select labgrading_id,labgrading_name from pathology_labgradings where test_id = '"+testId+"'");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql.list();
			for (Map<String, Object> rs : listsubservice2) {
				LabGradingsDto objmicroList = new LabGradingsDto();		
				objmicroList.setLabGradingId((Integer) rs.get("labgrading_id"));
				objmicroList.setLabGradingName((String) rs.get("labgrading_name"));
				ltgrading.add(objmicroList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltgrading;
	}

	@Override
	public boolean reRunTestResult(String reRunTestResultList,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
	
		try
		{
		PathologySampleWiseSlave sendtodto = (PathologySampleWiseSlave) ConfigUIJSONUtility.getObjectFromJSON(reRunTestResultList,PathologySampleWiseSlave.class);
		List<PathologySampleWiseSlave> slaveList = sendtodto.getPathologySampleWiseSlaveList();
		for (PathologySampleWiseSlave obj : slaveList) {			
	    			
		String sql = "UPDATE pathology_sample_wise_slave set re_run_flag='"+obj.getReRunFlag()+"',test_result='"+""+"',re_run_result='"+obj.getTestResult()+"' where profile_Id='"+obj.getProfileId()+"' and test_id='"+obj.getTestid()+"' and master_id='"+obj.getMasterIdd()+"' and unit_id="+unitId;
	    
	    Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
		
	    query.executeUpdate();	
		}
		
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public TreatmentDto showPatientPreviousHistory(Integer treatmentId, HttpServletRequest request) {
		Session session = null;
		TreatmentDto dto = null;
		try{
			session = sessionfactory.getCurrentSession();
			dto = (TreatmentDto) session.get(TreatmentDto.class, treatmentId);
			
			return dto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
	
	private Date getOldestCollectionDate(String masterIds) {
		List<Date> dateList = new ArrayList<>();
		Date dateToReturn = null;
		try {
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("SELECT id as id, IFNULL(trim(collection_date), '') as collection_date, IFNULL(trim(collection_time), '') as collection_time FROM pathology_sample_wise_master where id in("+masterIds+")");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = sql.list();
			for (Map<String, Object> rs : list) {
				Integer id = (Integer) rs.get("id");
				String collectionDate = (String) rs.get("collection_date");
				String collectionTime = (String) rs.get("collection_time");
				
				if(!collectionDate.equalsIgnoreCase("") || !collectionTime.equalsIgnoreCase("")) {
					StringBuffer fd = new StringBuffer();
					String[] fDate = collectionDate.split("/");
						fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
						SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

						Date d1 = sdformat.parse((fd.toString())+" "+collectionTime);
				
						dateList.add(d1);
				}
			}
			
			if(dateList.size() > 0) {
				Date d1 = dateList.get(0);
				
				for(int i = 0; i < dateList.size(); i++) {
					if(d1.compareTo(dateList.get(i)) > 0) {
						d1 = dateList.get(i);
					}
				}
				dateToReturn = d1;
			}
			return dateToReturn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getOldestCollectionDateInString(String masterIds) {
		List<String> dateList = new ArrayList<>();
		List<Integer> idList = new ArrayList<>();
		List<String> timeList = new ArrayList<>();
		
		String dateToReturn = "";
		
		try {
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("SELECT id as id, IFNULL(trim(collection_date), '') as collection_date, IFNULL(trim(collection_time), '') as collection_time FROM pathology_sample_wise_master where id in("+masterIds+")");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = sql.list();
			for (Map<String, Object> rs : list) {
				Integer id = (Integer) rs.get("id");
				String collectionDate = (String) rs.get("collection_date");
				String collectionTime = (String) rs.get("collection_time");
				
				if(!collectionDate.equalsIgnoreCase("")) {
					StringBuffer fd = new StringBuffer();
					String[] fDate = collectionDate.split("/");
						fd.append(fDate[0]+"-"+fDate[1]+"-"+fDate[2]);
						
						dateList.add(fd.toString());
						timeList.add(collectionTime);
						idList.add(id);
				}
			}
			
			if(dateList.size() > 0) {
				if(Collections.frequency(dateList, dateList.get(0)) == dateList.size()) {
					String collectionTime = "";
					SQLQuery qry = sessionfactory.getCurrentSession().createSQLQuery("SELECT min(trim(collection_time)) as collection_time FROM pathology_sample_wise_master where id in("+masterIds+")");     
					qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> collectionTimeList = qry.list();
					for(Map<String, Object> rs : collectionTimeList) {
						collectionTime = (String) rs.get("collection_time");
						
						dateToReturn = dateList.get(0)+" "+collectionTime+":00";
					}
				}else {
					String d1 = dateList.get(0);
					String t1 = timeList.get(0);
					for(int i = 0; i < dateList.size(); i++) {
						if(d1.compareTo(dateList.get(i)) > 0) {
							d1 = dateList.get(i);
							t1 = timeList.get(i);
						}
					}
					dateToReturn = d1+" "+t1+":00";
				}
			}
			
			return dateToReturn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dateToReturn;
	}

	@Override
	public List<LabTestGeneralValueDto> getGenralValueName(Integer testId,
			HttpServletRequest request) {
		List<LabTestGeneralValueDto> listgenral = new ArrayList<LabTestGeneralValueDto>();
		try {
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("select id,test_general from pathology_labtest_generalvalues where test_id = '"+testId+"'");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql.list();
			for (Map<String, Object> rs : listsubservice2) {
				LabTestGeneralValueDto objmicroList = new LabTestGeneralValueDto();		
				objmicroList.setGeneralValueId((Integer) rs.get("id"));
				objmicroList.setTestGeneral((String) rs.get("test_general"));
				listgenral.add(objmicroList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listgenral;
	}

	@Override
	public boolean bulkAuthoriseRecord(String idList, HttpServletRequest request) {
		try {
		    
		    HttpSession session = request.getSession();
		    Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
		    Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
		   
		    ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			
		    String SARSCoV2RTPCR =(resourceBundle.getObject("SARSCoV2RTPCR").toString());
			Integer SARSCoV2RTPCRID=Integer.parseInt(SARSCoV2RTPCR);
			
			String CTVALUEFORCONFIRMATORYGENE =(resourceBundle.getObject("CTVALUEFORCONFIRMATORYGENE").toString());
			Integer CTVALUEFORCONFIRMATORYGENEID=Integer.parseInt(CTVALUEFORCONFIRMATORYGENE);
			
			
			String SARSCOV2 =(resourceBundle.getObject("SARSCOV2").toString());
			Integer SARSCOV2ID=Integer.parseInt(SARSCOV2);
			
			
			
			String SARSCOV2ANTIGENTest =(resourceBundle.getObject("SARSCOV2ANTIGENTest").toString());
			Integer SARSCOV2ANTIGENTestId=Integer.parseInt(SARSCOV2ANTIGENTest);
			
			
		    String[] masterId = idList.split("-");
			
			for(String ids : masterId) {
			
				List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));
					
					String sql = "UPDATE pathology_sample_wise_slave set test_result='Not Detected',flag_mark='Negative' where test_id="+SARSCoV2RTPCRID+" and  master_id in(:ids) and unit_id="+unitId;
				    
				    Query query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					query.setParameterList("ids", numbers);
				    query.executeUpdate();
				    
					String sql1 = "UPDATE pathology_sample_wise_slave set test_result='NA',flag_mark='Negative' where test_id="+CTVALUEFORCONFIRMATORYGENEID+" and master_id in(:ids) and unit_id="+unitId;
				    
				    Query query1 = sessionfactory.getCurrentSession().createSQLQuery(sql1);
				    query1.setParameterList("ids", numbers);
				    query1.executeUpdate();
				    
				    
                    String sql2 = "UPDATE pathology_sample_wise_slave set test_result='Not Detected',flag_mark='Negative' where test_id="+SARSCOV2ID+" and master_id in(:ids) and unit_id="+unitId;
				    
				    Query query2 = sessionfactory.getCurrentSession().createSQLQuery(sql2);
				    query2.setParameterList("ids", numbers);
				    query2.executeUpdate();
				    
				    
                    String sql3 = "UPDATE pathology_sample_wise_slave set test_result='Negative',flag_mark='Negative' where test_id="+SARSCOV2ANTIGENTestId+" and master_id in(:ids) and unit_id="+unitId;
				    
				    Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);
				    query3.setParameterList("ids", numbers);
				    query3.executeUpdate();
					
				}
				
				Integer countVal = 0;
				String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status='5'";
				Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);        	 
				Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
				
				countVal = sampleCount + 1;
				
				Integer uId = (Integer) session.getAttribute("uId");	    
				String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, authorizeddatetime =:authorizeddatetime, authorizedBy =:authorizedBy,kitSpecId=:kitSpecId,resultFlag =:resultFlag  where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
				Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
		    
				query4.setParameter("authorizeddatetime", new Date(new java.util.Date().getTime()));
				query4.setParameter("authorizedBy", userId);
				query4.setParameterList("sampleWiseMasterId", numbers);
				query4.setParameter("teststatus", 5);
				query4.setParameter("kitSpecId", "Meril COVID-19 One Step RT-PCR kit");
				query4.setParameter("sampleCount", countVal);
				query4.setParameter("resultFlag", "N");
				query4.executeUpdate();
			}
	} catch (Exception e) {
		e.printStackTrace();
		return false;
	}
	return true;
}

	@Override
	public List<PathologySampleWiseMaster> getemailFileds(String idList,
			HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> listpatient = new ArrayList<PathologySampleWiseMaster>();
		
		try {	
			String[] masterId = idList.split("-");
			for(int i = 0; i < masterId.length; i++) {
				//Integer id1 = Integer.parseInt(masterId[i]);	
			    SQLQuery sql = null;								
				sql = sessionfactory.getCurrentSession().createSQLQuery("select p.mobile, ps.patient_id, ps.treatment_id,p.email_id,p.gender,concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientName FROM pathology_sample_wise_master ps INNER JOIN ehat_treatment t ON t.treatment_id = ps.treatment_id INNER JOIN ehat_patient p ON p.patient_id = t.patient_id WHERE ps.id in("+masterId[i]+") GROUP BY ps.treatment_id");     
				sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listsubservice2 = sql.list();
				for (Map<String, Object> rs : listsubservice2) {
					PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
					obj.setPatientId((Integer) rs.get("patient_id"));
					obj.setTreatmentId((Integer) rs.get("treatment_id"));
					obj.setEmailId((String) rs.get("email_id"));
					obj.setGender((String) rs.get("gender"));
					obj.setPatientname((String) rs.get("patientName"));
					obj.setMobile((String) rs.get("mobile"));
					obj.setMasterId(masterId[i]);
					
					listpatient.add(obj);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listpatient;
	}

	@Override
	public boolean checkTestAssignedToPatient(Integer patientId, Integer treatmentId, String masterId, HttpServletRequest request) {
		Session session = null;
		boolean status = true;
		try {
			
			session = sessionfactory.getCurrentSession();
			
			HttpSession httpSession = request.getSession();
			
			Integer unitId = (Integer) httpSession.getAttribute("uId");			
			
			/*Query sql = session.createSQLQuery("SELECT count(id) FROM pathology_sample_wise_master WHERE patient_id="+patientId+" AND treatment_id="+treatmentId+" AND test_status !=6 AND in_out_house=0 AND unit_Id ="+unitId+" AND id NOT IN("+masterId+")");
	
			Integer count = ((Number)sql.uniqueResult()).intValue();	*/

			try {
				session = sessionfactory.getCurrentSession();
				Query sql1 = session.createSQLQuery("SELECT GROUP_CONCAT(DISTINCT psm.id SEPARATOR ',') AS masterId FROM pathology_sample_wise_master psm JOIN ehat_patient ep ON psm.patient_id = ep.patient_id WHERE psm.patient_id =:patientId AND psm.treatment_id =:treatmentId AND psm.in_out_house =:inOutHouse AND psm.unit_Id =:unitId group by psm.sample_type_id");
				sql1.setParameter("patientId", patientId);
				sql1.setParameter("treatmentId", treatmentId);
				sql1.setParameter("inOutHouse", 0);
				sql1.setParameter("unitId", unitId);
					  
				sql1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = sql1.list();
				for(Map<String, Object> row : list){										 		
				
				String  masterIdPdf =((String)row.get("masterId"));						
				
				if(new File(FilePath.getLabReportPath() + File.separator + masterIdPdf).list()==null)
				{
					status = true;
					break;
				}else
				{
					status = false;

					/*int count2 = new File(FilePath.getLabReportPath() + File.separator + masterIdPdf).list().length;				
					
					if (count2 > 0) {
							if (count == 0) {
								status = false;
							}
						} else {
							if (count == 0) {
								status = true;
							}
						}		
					}*/
				}
			}					
		}catch (Exception e1) {
			e1.printStackTrace();
			e1.getMessage();
		}	
		}catch (Exception e) {
			e.printStackTrace();
		}		
		return status;
	}

	@Override
	public String getMergedReportPath(Integer patientId, Integer treatmentId, Integer unitId,
			HttpServletRequest request) {
		Session session = null;
		String mergedFilePath = "";
		List<PathologySampleWiseMaster> samplesList = new ArrayList<>();
		try {
			session = sessionfactory.getCurrentSession();
			Query sql = session.createSQLQuery("SELECT GROUP_CONCAT(DISTINCT psm.id SEPARATOR ',') AS masterId, psm.patient_id AS patientId, psm.treatment_id AS treatmentId, CONCAT(ep.f_name, ' ',ep.m_name, ' ',ep.l_name) AS patientName FROM pathology_sample_wise_master psm JOIN ehat_patient ep ON psm.patient_id = ep.patient_id WHERE psm.patient_id =:patientId AND psm.treatment_id =:treatmentId AND psm.in_out_house =:inOutHouse AND psm.unit_Id =:unitId group by psm.sample_type_id");
				  sql.setParameter("patientId", patientId);
				  sql.setParameter("treatmentId", treatmentId);
				  sql.setParameter("inOutHouse", 0);
				  sql.setParameter("unitId", unitId);
				  
				  sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = sql.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
				
					obj.setMasterId((String)row.get("masterId"));
					obj.setPatientId((Integer)row.get("patientId"));
					obj.setTreatmentId((Integer)row.get("treatmentId"));
					obj.setPatientname((String)row.get("patientName"));
					
					samplesList.add(obj);
			}
		
			mergedFilePath = mergeFiles(samplesList);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return mergedFilePath;
	}
	
	private String mergeFiles(List<PathologySampleWiseMaster> samplesList) {
		String DEST = "";
		String mergedFileath = "";
		try {
			
			String patientName = samplesList.get(0).getPatientname().replaceAll("  ", "");
			
			mergedFileath = FilePath.getMergedLabReportPath() + File.separator + samplesList.get(0).getPatientId() + File.separator + samplesList.get(0).getTreatmentId()+ File.separator + patientName + File.separator +patientName+".pdf";
			
			File mergedReportPath = new File(mergedFileath);
			
			mergedReportPath.getParentFile().mkdirs();
			
			PDFMergerUtility pdfMerger = new PDFMergerUtility();
						
			pdfMerger.setDestinationFileName(mergedFileath);
			
			for(PathologySampleWiseMaster master : samplesList) {
				
				String pName = master.getPatientname().replaceAll("  ", "");
				
				DEST = FilePath.getLabReportPath() + File.separator + master.getMasterId() + File.separator + pName + File.separator +pName+".pdf";
				
				File file = new File(DEST);
				
				pdfMerger.addSource(file);
			}
			
			pdfMerger.mergeDocuments();
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		return mergedFileath;
	}

	@Override
	public String updateEmailStatus(String masterid, Integer treatmentid,
			String patientType, Integer unitId, String mailStatus, Integer userId) {
		try {
		    String[] masterId = masterid.split("-");
			
			for(String ids : masterId) {
			
				List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));
				}
				
			    
				String sql4 = "UPDATE PathologySampleWiseMaster set emailSendDateTime =:emailSendDateTime, emailStatus =:emailStatus where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
				Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
		    
				query4.setParameter("emailSendDateTime", new Date(new java.util.Date().getTime()));
				query4.setParameter("emailStatus", mailStatus);
				query4.setParameterList("sampleWiseMasterId", numbers);			
			
				query4.executeUpdate();
			}
	} catch (Exception e) {
		e.printStackTrace();
		return "error";
	}
	return "updated";
}

	
	@Override
	public List<PathologySampleWiseMaster> getSampleTypeListFromTid(Integer patientId,Integer treatmentId, String callFrom, HttpServletRequest request) {
		String sql="";
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();

		try{
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			String userCustomerType = (String) httpSession.getAttribute("userCustomerType");
			String userCustomerId = (String) httpSession.getAttribute("userCustomerId");

		     
			//sql="SELECT ifnull(ep.email_id,'-') as email_id,GROUP_CONCAT(DISTINCT ps.profile_Id SEPARATOR ',') AS profile_Id, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id where ps.deleted = 'N' and ps.unit_Id="+unitId+" and et.treatment_id ="+treatmentId+" and  ps.in_out_house=0 AND ps.test_status = 2 AND fn_check_bill_service_exist(ps.unit_id,ps.dept_id,ps.bil_det_id) = 'Y' group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
			sql="SELECT ifnull(ep.email_id,'-') as email_id,GROUP_CONCAT(DISTINCT ps.profile_Id SEPARATOR ',') AS profile_Id, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id where ps.deleted = 'N' and ps.unit_Id="+unitId+" and et.treatment_id ="+treatmentId+" and  ps.in_out_house > 0 AND ps.test_status = 2 AND fn_check_bill_service_exist(ps.unit_id,ps.dept_id,ps.bil_det_id) = 'Y' group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";	
			
		SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
	
			//query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setEmailId((String)row.get("email_id"));
				obj.setProfileIdString((String)row.get("profile_Id"));
				obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
				obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPathologistId((Integer)row.get("pathologist_id"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				//obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));

				labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			
		}catch(Exception e){
			e.printStackTrace();
			log.error("getPatientById()...Error :"+e);
		}
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> getBarcodeWiseTestIds(Integer patientId, Integer treatmentId, Date currentDateTime, HttpServletRequest request) {
		Session session = null;
		List<PathologySampleWiseMaster> testList = new ArrayList<>();
		List<String> barcodeList = new ArrayList<>();
		
		try {
			session = sessionfactory.getCurrentSession();
			
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			//Date currentDateTime = new Date(new java.util.Date().getTime());
			
			Query query = session.createSQLQuery("Select bar_code FROM pathology_sample_wise_slave where patient_id=:patientId AND treatment_id=:treatmentId AND unit_id=:unitId AND created_date_time >=:currentDateTime group by bar_code");
				query.setParameter("patientId", patientId);
				query.setParameter("treatmentId", treatmentId);
				query.setParameter("unitId", unitId);
				query.setParameter("currentDateTime", currentDateTime);

				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				for(Map<String, Object> row : list){
					barcodeList.add((String)row.get("bar_code"));
				}
				testList = getTestsByBarcode(barcodeList, unitId, currentDateTime, patientId, treatmentId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return testList;
	}
	
	private List<PathologySampleWiseMaster> getTestsByBarcode(List<String> barcodeList, Integer unitId, Date currentDateTime, Integer patientId, Integer treatmentId){
		Session session = null;
		List<PathologySampleWiseMaster> testList = new ArrayList<>();
		
		try {
			session = sessionfactory.getCurrentSession();
			
			for(String barcode : barcodeList) {
				PathologySampleWiseMaster master = new PathologySampleWiseMaster();
				master.setBarCode(barcode);
				
				List<PathologySampleWiseMaster> testsInfo = new ArrayList<>();
				
				Query query = session.createSQLQuery("SELECT psws.bar_code, psws.profile_Id, psws.test_id, lt.testName FROM pathology_sample_wise_slave psws JOIN pathology_lab_test lt ON (psws.test_id = lt.idTest) WHERE psws.bar_code =:barcode");
					query.setParameter("barcode", barcode);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster test = new PathologySampleWiseMaster();
						test.setTestId((Integer)row.get("test_id"));
						test.setProfiId((Integer)row.get("profile_Id"));
						test.setTestName((String)row.get("testName"));
							
					testsInfo.add(test);
				}
				master.setTestli(testsInfo);
				testList.add(master);
			}
			return testList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return testList;
	}

	@Override
	public List<PathologySampleWiseMaster> getSampleWiseProfileFromPackage(Integer unitId, Integer businessType, Integer serviceId, Integer subServiceId, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		Session session = null;
		List<PathologySampleWiseMaster> samplesList = new ArrayList<>();
		Map<Integer, String> barcodes = new HashMap<Integer, String>();
		
		List<Integer> testStatus = new ArrayList<>();
			testStatus.add(0);
			testStatus.add(1);
			testStatus.add(2);
			testStatus.add(101);
			testStatus.add(102);
			testStatus.add(111);
			testStatus.add(112);

		try {
			session = sessionfactory.getCurrentSession();
			Query qry = session.createSQLQuery("SELECT IFNULL(ps.test_status, 0) AS test_status, es.sample_type_id, es.bar_code FROM ehat_bill_details es JOIN ehat_subservice eb ON (es.sub_service_id = eb.id) LEFT JOIN pathology_sample_wise_master ps ON (es.bill_details_id = ps.bil_det_id) WHERE es.treatment_id="+treatmentId+" AND es.deleted='N' AND es.cancle='N' And eb.iscombination='N'");
			qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> l = qry.list();
			for(Map<String, Object> row : l){
				if(testStatus.contains(((Number)row.get("test_status")).intValue()))
					barcodes.put((Integer)row.get("sample_type_id"), (String)row.get("bar_code"));
				
				/*String isCombination = (String)row.get("iscombination");
				
				if(isCombination.equalsIgnoreCase("Y")) {
					Query qry2 = session.createSQLQuery("SELECT sample_type_id, barcode FROM ehat_other_bill_detail_for_opd where patient_id="+patientId+" AND treatment_id="+treatmentId+" AND child_sub_service_id="+row.get("id")+" group by sample_type_id");
					qry2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> li = qry2.list();
					for(Map<String, Object> row1 : li){
						barcodes.put((Integer)row1.get("sample_type_id"), (String)row1.get("barcode"));
					}
				}else {
					barcodes.put((Integer)row.get("sample_type_id"), (String)row.get("bar_code"));
				}*/
			}
			
			Query qry2 = session.createSQLQuery("SELECT IFNULL(ps.test_status, 0) AS test_status, es.sample_type_id, es.barcode, ps.bil_det_id FROM ehat_other_bill_detail_for_opd es JOIN ehat_subservice eb ON (es.sub_service_id = eb.id) LEFT JOIN pathology_sample_wise_master ps ON (es.bill_details_id = ps.bil_det_id AND es.child_sub_service_id=ps.sub_service_id) WHERE es.treatment_id="+treatmentId+" AND es.deleted='N' AND es.cancle='N' And eb.iscombination='Y'");
			qry2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> li = qry2.list();
			for(Map<String, Object> row1 : li){
				if(testStatus.contains(((Number)row1.get("test_status")).intValue()))
					barcodes.put((Integer)row1.get("sample_type_id"), (String)row1.get("barcode"));
			}
			
			String sqlQuery = "";
			if(businessType == 1) {//B2B
				sqlQuery = "SELECT lp.idTestSample AS sampleTypeId, pl.sample_name AS sampleName, GROUP_CONCAT(DISTINCT lp.profileName SEPARATOR ',') AS testName, ecs.is_com_servlastId as packageId, ecs.is_com_servId as serviceId, GROUP_CONCAT(DISTINCT ecs.service_id SEPARATOR ',') AS subServiceId FROM lab_charges_configuration ecs JOIN pathology_labprofile lp ON (ecs.service_id = lp.subservice_id) JOIN pathology_labsample pl ON (pl.id = lp.idTestSample) where is_com_servlastId=:subServiceId AND is_com_servId=:serviceId AND lp.profileStatus=:profileStatus group by lp.idTestSample";
			}else {//B2C
				sqlQuery = "SELECT lp.idTestSample AS sampleTypeId, pl.sample_name AS sampleName, GROUP_CONCAT(DISTINCT lp.profileName SEPARATOR ',') AS testName, ecs.is_com_servlastId as packageId, ecs.is_com_servId as serviceId, GROUP_CONCAT(DISTINCT ecs.service_id SEPARATOR ',') AS subServiceId FROM ehat_configuration_services ecs JOIN pathology_labprofile lp ON (ecs.service_id = lp.subservice_id) JOIN pathology_labsample pl ON (pl.id = lp.idTestSample) where is_com_servlastId=:subServiceId AND is_com_servId=:serviceId AND lp.profileStatus=:profileStatus group by lp.idTestSample";
			}
			
			Query query = session.createSQLQuery(sqlQuery);
			query.setParameter("serviceId", serviceId);
			query.setParameter("subServiceId", subServiceId);
			query.setParameter("profileStatus", "Y");
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster sample = new PathologySampleWiseMaster();
				
				Integer sampleTypeId = (Integer)row.get("sampleTypeId");

				if(barcodes.containsKey(sampleTypeId)) {
					sample.setBarCode(barcodes.get(sampleTypeId));
				}else {
					sample.setBarCode("0");
				}
				
				sample.setSampleId((Integer)row.get("sampleTypeId"));
				sample.setSamplename((String)row.get("sampleName"));
				sample.setTestName((String)row.get("testName"));
				sample.setPackageId((Integer)row.get("packageId"));
				sample.setServiceId((Integer)row.get("serviceId"));
				sample.setMasterId((String)row.get("subServiceId"));
						
				samplesList.add(sample);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return samplesList;
	}

	@Override
	public String checkDuplicateServicesFromPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {

		Session session = null;
		List<PathologySampleWiseMaster> samplesList = new ArrayList<>();
		String response = "";
		try {
			session = sessionfactory.getCurrentSession();
			// added by dayanand for getting sponsor id
			Query qrySponsor = session.createSQLQuery("select distinct ifnull( charges_master_slave_id,0) as charges_master_slave_id from ehat_bill_master where  treatment_id="+treatmentId+" AND deleted='N' ");
			int sponsorId = ((Number)qrySponsor.uniqueResult()).intValue();
			// end sponsor id
			// check package configuration
			int configCount =0;
			int sponsorIdd=0;
			if(sponsorId > 0) {
			Query qryPackage = session.createSQLQuery("select count(*) from ehat_configuration_services where chargesSlave_id="+sponsorId+" and is_com_servlastId="+subServiceId+" AND deleted='N' ");
			 configCount = ((Number)qryPackage.uniqueResult()).intValue();
			}
			if(configCount > 0) {
				sponsorIdd=sponsorId;
			}else {
				sponsorIdd=0;
			}
			// end package configuration
			
			Query qry = session.createSQLQuery("SELECT count(*) as count FROM ehat_bill_details where sub_service_id="+subServiceId+" AND treatment_id="+treatmentId+" AND deleted='N' AND cancle='N'");
			int packageCount = ((Number)qry.uniqueResult()).intValue();
			
			if(packageCount<=0) {
				String chargeIdSql= "SELECT GROUP_CONCAT(DISTINCT service_id SEPARATOR ',') as serviceId FROM ehat_configuration_services where is_com_servlastId="+subServiceId+" and chargesSlave_id="+sponsorIdd+" group by is_com_servlastId";
              
				Query query = session.createSQLQuery(chargeIdSql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				String serviceIds = "";
				for(Map<String, Object> row : list){
					serviceIds = (String)row.get("serviceId");
				}
				
				Query qry1 = session.createSQLQuery("SELECT count(*) as count FROM ehat_other_bill_detail_for_opd where child_sub_service_id IN ("+serviceIds+") AND deleted='N' AND cancle='N' AND treatment_id="+treatmentId+"");
				packageCount = ((Number)qry1.uniqueResult()).intValue();
			
			}
			
			
			if(packageCount > 0) {
				response = "Package";
			}else {
				String sqlQuery = "";
				if(businessType == 1) {//B2B
					sqlQuery = "SELECT GROUP_CONCAT(DISTINCT service_id SEPARATOR ',') as serviceId FROM lab_charges_configuration where is_com_servlastId="+subServiceId+" group by is_com_servlastId";
				}else {//B2C
					  
					sqlQuery = "SELECT GROUP_CONCAT(DISTINCT service_id SEPARATOR ',') as serviceId FROM ehat_configuration_services where is_com_servlastId="+subServiceId+" and chargesSlave_id="+sponsorIdd+"  group by is_com_servlastId";
					  
					  
				  }
				Query query = session.createSQLQuery(sqlQuery);
				
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				String serviceIds = "";
				for(Map<String, Object> row : list){
					serviceIds = (String)row.get("serviceId");
				}
				
				Query qry1 = session.createSQLQuery("SELECT count(*) as count FROM ehat_bill_details where sub_service_id IN ("+serviceIds+") AND deleted='N' AND cancle='N' AND treatment_id="+treatmentId+"");
				int profileCount = ((Number)qry1.uniqueResult()).intValue();
				
				if(profileCount<=0) {
					 qry1 = session.createSQLQuery("SELECT count(*) as count FROM ehat_other_bill_detail_for_opd where child_sub_service_id IN ("+serviceIds+") AND deleted='N' AND cancle='N' AND treatment_id="+treatmentId+"");
					 profileCount = ((Number)qry1.uniqueResult()).intValue();
				}
				
				if(profileCount > 0) {
					response = "Profile";
				}else {
					response = "None";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public String getDefaultBarcodeForPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {

		Session session = null;
		String response = "";
		
		try {
			session = sessionfactory.getCurrentSession();
			Query query1 = session.createSQLQuery("");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public String checkDuplicateServicesInPackage(Integer serviceId, Integer subServiceId, Integer editSubServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		
		Session session = null;
		Integer count = 0;
		try {
			session = sessionfactory.getCurrentSession();
			
			Query query = session.createSQLQuery("SELECT count(*) as count FROM ehat_other_bill_detail_for_opd where treatment_id="+treatmentId+" AND deleted='N' AND child_sub_service_id="+subServiceId+"");// AND sub_service_id="+editSubServiceId+"

			count = ((Number)query.uniqueResult()).intValue();
			
			if(count <= 0) {
				Query qry = session.createSQLQuery("SELECT count(*) as count FROM ehat_bill_details where treatment_id="+treatmentId+"  AND deleted='N' AND sub_service_id="+subServiceId+"");

				count = ((Number)qry.uniqueResult()).intValue();			
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count.toString();
	}

	@Override
	public String getDefaultBarcodeForEditPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		Session session = null;
		String barcode = "";
		int count = 0;
		List<Integer> testStatus = new ArrayList<>();
			testStatus.add(0);
			testStatus.add(1);
			testStatus.add(2);
			testStatus.add(101);
			testStatus.add(102);
			testStatus.add(111);
			testStatus.add(112);
		try {
			session = sessionfactory.getCurrentSession();
			
			Integer sampleTypeId = getDefaultSampleTypeForEditPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
			
			Query qry = session.createSQLQuery("SELECT IFNULL(ps.test_status, 0) AS test_status, es.sample_type_id, es.bar_code FROM ehat_bill_details es JOIN ehat_subservice eb ON (es.sub_service_id = eb.id) LEFT JOIN pathology_sample_wise_master ps ON (es.bill_details_id = ps.bil_det_id) WHERE es.treatment_id="+treatmentId+" AND es.deleted='N' AND es.cancle='N' AND eb.iscombination='N' AND es.sample_type_id="+sampleTypeId+"");
			
			qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> l = qry.list();
			for(Map<String, Object> row : l){
				if(testStatus.contains(((Number)row.get("test_status")).intValue())) {
					barcode = (String)row.get("bar_code");
					count++;
				}
				
				/*String isCombination = (String)row.get("iscombination");
				
				if(isCombination.equalsIgnoreCase("Y")) {
					Query qry2 = session.createSQLQuery("SELECT barcode FROM ehat_other_bill_detail_for_opd where patient_id="+patientId+" AND treatment_id="+treatmentId+" AND sample_type_id="+sampleTypeId+" group by sample_type_id");
					qry2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> li = qry2.list();
					for(Map<String, Object> row1 : li){
						barcode = (String)row.get("barcode");
					}
				}else {
					barcode = (String)row.get("bar_code");
					
					break;
				}*/
			}
			
			if(count <= 0 || (barcode.trim()).equalsIgnoreCase("")) {
				Query qry2 = session.createSQLQuery("SELECT IFNULL(ps.test_status, 0) AS test_status, es.sample_type_id, es.barcode FROM ehat_other_bill_detail_for_opd es JOIN ehat_subservice eb ON (es.sub_service_id = eb.id) LEFT JOIN pathology_sample_wise_master ps ON (es.bill_details_id = ps.bil_det_id AND es.child_sub_service_id=ps.sub_service_id) WHERE es.treatment_id="+treatmentId+" AND es.deleted='N' AND es.cancle='N' AND eb.iscombination='Y' AND es.sample_type_id="+sampleTypeId+"");
				qry2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> li = qry2.list();
				for(Map<String, Object> row1 : li){
					if(testStatus.contains(((Number)row1.get("test_status")).intValue()))
						barcode = (String)row1.get("barcode");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return barcode;
	}

	@Override
	public Integer getDefaultSampleTypeForEditPackage(Integer serviceId, Integer subServiceId, Integer unitId,
			Integer businessType, Integer patientId, Integer treatmentId, Integer billDetailsId) {
		Session session = null;
		Integer sampleTypeId = 0;
		try {
			session = sessionfactory.getCurrentSession();
			
			Query query = session.createSQLQuery("SELECT idTestSample FROM pathology_labprofile where subservice_id="+subServiceId+" AND profileStatus='Y'");
			sampleTypeId = (Integer) query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sampleTypeId;
	}

	@Override
	public long checkDuplicateBarcodeForPackage(Integer unitId, Integer businessType, Integer patientId,
			Integer treatmentId, Integer billDetailsId, String sampleWiseBarcodes, String barcode, String callFrom) {
		Session session = null;
		long count = 0;
		try {
			session = sessionfactory.getCurrentSession();
			
			PathologySampleWiseMaster master = null;
			String[] barcodes = null;
			if(callFrom.equalsIgnoreCase("savePackage")) {
				 master = (PathologySampleWiseMaster) ConfigUIJSONUtility.getObjectFromJSON(sampleWiseBarcodes, PathologySampleWiseMaster.class);
			        List<PathologySampleWiseMaster> barcodeList = master.getLabSampleWiseMasterDtoList();
			        
			        barcodes = new String[barcodeList.size()];
			        for(int i = 0; i < barcodeList.size(); i++) {
						barcodes[i] = barcodeList.get(i).getBarCode();
					}
			}else {
				barcodes = new String[1];
				barcodes[0] = barcode;
			}
			
	        Criteria criteriaRec = session.createCriteria(BillDetailsDto.class);
			criteriaRec.add(Restrictions.ne("treatmentId", treatmentId));
			criteriaRec.add(Restrictions.in("barCode", barcodes));
			criteriaRec.add(Restrictions.eq("deleted", "N"));
			criteriaRec.setProjection(Projections.rowCount());
			count = (Long) criteriaRec.uniqueResult();
	        
			if(count <= 0){
				Criteria criteria = session.createCriteria(EhatOtherBillDetailForOpdDto.class);
				criteria.add(Restrictions.ne("treatmentId", treatmentId));
				criteria.add(Restrictions.in("barcode", barcodes));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.setProjection(Projections.rowCount());
				count = (Long) criteria.uniqueResult();
			}
		} catch (Exception e) {
			count = 0;
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public PathologySampleWiseMaster getPatientWiseSamples(Integer unitId, Integer testStatus, Integer patientId,
			Integer treatmentId, String callFrom) {
		Session session = null;
		List<PathologySampleWiseMaster> samplesList = new ArrayList<>();
		PathologySampleWiseMaster dto = new PathologySampleWiseMaster();
		
		try {
			session = sessionfactory.getCurrentSession();
			
			if(callFrom.equalsIgnoreCase("processing")) {
				Query qry = session.createSQLQuery("SELECT ps.profile_Id, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, ep.patient_id AS patient_id, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode, et.treatment_id AS treatment_id, ifnull(pl.sample_name, '-') as sample_name, ps.sample_type_id AS sampleTypeId FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted = 'N' AND ps.test_status="+testStatus+" AND ps.in_out_house=0 AND ps.unit_Id="+unitId+" AND ps.patient_Id="+patientId+" AND ps.treatment_id="+treatmentId+" AND fn_check_bill_service_exist(ps.unit_id,ps.dept_id,ps.bil_det_id) = 'Y' group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC");
			
				qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = qry.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
					obj.setProfileId((Integer)row.get("profile_Id"));
					obj.setMasterId((String)row.get("id"));
					obj.setPatientId((Integer)row.get("patient_id"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setSampleTypeId((Integer)row.get("sampleTypeId"));

					samplesList.add(obj);
				}
				dto.setLabSampleWiseMasterDtoList(samplesList);
			}else {
				List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
				LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();

				String normalSetString = "";
				String abnormalSetString = "";
				String cabnormalSetString = "";
				
				SQLQuery sql1 = sessionfactory.getCurrentSession().createSQLQuery("select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) where ss.test_flag='N' and sm.test_status="+testStatus+" and sm.deleted='N' AND sm.unit_Id="+unitId+" AND sm.treatment_id="+treatmentId+" AND fn_check_bill_service_exist(ps.unit_id,ps.dept_id,ps.bil_det_id) = 'Y' ");
				
				sql1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listsubservice3 = sql1.list();
				for(Map<String, Object> rs2 : listsubservice3) {
					Integer masterId =0;
					String testResultt="";
						
					testResultt=(String) rs2.get("flag_mark");
					masterId=((Number) rs2.get("master_id")).intValue();
						 				 
					if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
						testResultt="-";
					} if(masterId == null){
						masterId=0;
					}				
						
					if(testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
						cAbnormalSet.add(masterId);
					}
					if (testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
						abnormalSet.add(masterId);
					}
					if (testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
																
						normalSet.add(masterId);
					}
					if (testResultt.equalsIgnoreCase("H")) {// for High Value Check
						abnormalSet.add(masterId);
					}
					if (testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
						
						cAbnormalSet.add(masterId);
					}
					if (!testResultt.equalsIgnoreCase("CL")
							&& !testResultt.equalsIgnoreCase("NE")
							&& !testResultt.equalsIgnoreCase("L")
							&& !testResultt.equalsIgnoreCase("N")
							&& !testResultt.equalsIgnoreCase("H")
							&& !testResultt.equalsIgnoreCase("CH")
							&& !testResultt.equalsIgnoreCase("Positive")
							&& !testResultt.equalsIgnoreCase("Detected")
							&& !testResultt.equalsIgnoreCase("Negative")
							&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text Value Check

						normalSet.add(masterId);
					}
				}
					
				abnormalSet.removeAll(cAbnormalSet);							
				normalSet.removeAll(cAbnormalSet);
				normalSet.removeAll(abnormalSet);
						
				normalSetString = normalSet.toString().replaceAll("(^\\[|\\]$)", "");
				abnormalSetString = abnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
				cabnormalSetString = cAbnormalSet.toString().replaceAll("(^\\[|\\]$)", "");

				String newSetString = "";
				for(int i = 0; i < 3; i++) {
					if(i == 0) {
						newSetString = normalSetString;
						if((newSetString.trim()).isEmpty())
							continue;
					}else if(i == 1){
						newSetString = abnormalSetString;
						if((newSetString.trim()).isEmpty())
							continue;
					}else {
						newSetString = cabnormalSetString;
						if((newSetString.trim()).isEmpty())
							continue;
					}
					
					String sql11 = "SELECT ps.profile_Id, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, ep.patient_id AS patient_id, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode, et.treatment_id AS treatment_id, ifnull(pl.sample_name, '-') as sample_name, ps.sample_type_Id AS sampleTypeId FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.test_status="+testStatus+" and ps.in_out_house=0 AND ssm.id in("+newSetString+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql11);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list = query.list();
					for(Map<String, Object> row : list){
						Query qry = session.createSQLQuery("SELECT ps.profile_Id, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, ep.patient_id AS patient_id, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode, et.treatment_id AS treatment_id, ifnull(pl.sample_name, '-') as sample_name, ps.sample_type_id AS sampleTypeId FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted = 'N' AND ps.test_status="+testStatus+" AND ps.in_out_house=0 AND ps.unit_Id="+unitId+" AND ps.patient_Id="+patientId+" AND ps.treatment_id="+treatmentId+" AND fn_check_bill_service_exist(ps.unit_id,ps.dept_id,ps.bil_det_id) = 'Y' group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC");
							PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
							obj.setProfileId((Integer)row.get("profile_Id"));
							obj.setMasterId((String)row.get("id"));
							obj.setPatientId((Integer)row.get("patient_id"));
							obj.setBarCode((String)row.get("barCode"));
							obj.setTreatmentId((Integer)row.get("treatment_id"));
							//obj.setSamplename((String)row.get("sample_name"));
							
							if(i == 0) {
								obj.setSamplename((String)row.get("sample_name")+" ~ "+"Normal");
							}else if(i == 1){
								obj.setSamplename((String)row.get("sample_name")+" ~ "+"Abormal");
							}else {
								obj.setSamplename((String)row.get("sample_name")+" ~ "+"Critical Abnormal");
							}
							
							obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
							
							samplesList.add(obj);
					}
				}
				dto.setLabSampleWiseMasterDtoList(samplesList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public PathologyTemplateRotineValueDTO getTemplateInfoByMasterId(Integer masterid) {
		String sql="";
		Integer machineId=0;
		String machineName="";
		PathologyTemplateRotineValueDTO obj=new PathologyTemplateRotineValueDTO();
		List<PathologyTemplateRotineValueDTO> list=new ArrayList<PathologyTemplateRotineValueDTO>();
		try {
	         
	          
	          String msql="select pm.machine_Id as machine_Id,pm.machine_name as machine_name from  pathology_sample_wise_master pm  where pm.id="+masterid+" ";
	          SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(msql);
	          
	          query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	          List<Map<String, Object>> listm = query1.list();
	          for (Map<String, Object> row : listm) {
	        	  machineId =((Integer)row.get("machine_Id"));
	        	  machineName=((String)row.get("machine_name"));
	          }
	          sql=" Select ps.template_id as template_id,ps.template_name as template_name,CONVERT(template_data USING utf8) as template_data  from pathology_sample_wise_slave ps where ps.master_id="+masterid+" ";		
	          SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
	          
	          query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list1 = query.list();
				for (Map<String, Object> row : list1) {
					PathologyTemplateRotineValueDTO obj1=new PathologyTemplateRotineValueDTO();
					obj1.setTemplateId((Integer)row.get("template_id"));
					obj1.setTemplateName((String)row.get("template_name"));
					obj1.setTemplateData((String)row.get("template_data"));
					obj1.setMachineId(machineId);
					obj1.setMachineName(machineName);
				//Blob b=	(Blob)row.get("template_data");
					//Blob blob = rs.getBlob(cloumnName[i]);
					//byte[] bdata = b.getBytes(1, (int) b.length());
					//String s = new String(bdata);
					//obj1.setTemplateData(s);
					list.add(obj1);
				}
				obj.setListtemplateinfo(list);
				return obj;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	
	@Override
	public String getGeneralType(String generalValue) {
		try {
			String sql = "SELECT general_type FROM  pathology_labtest_generalvalues WHERE test_general='"+generalValue+"' ";
			System.out.println("sql::"+sql);
			SQLQuery query13 = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query13.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list1 = query13.list();
			for (Map<String, Object> rs : list1) {
				generalValue = (String) rs.get("general_type");
			}
		}catch (Exception e) {
			log.error("error for getGeneralType...."+ e.getMessage());
			return generalValue;
		}
		return generalValue;
	}
	
	void updateMachineData(String phlebotomysamplemastertable) {
		// added for update machine id,machine name and comments in pathology_sample_wise_master
					PathologySampleWiseMaster mObj = (PathologySampleWiseMaster) ConfigUIJSONUtility.getObjectFromJSON(phlebotomysamplemastertable,PathologySampleWiseMaster.class);
					List<PathologySampleWiseMaster> mlist =mObj.getLstSampleMasterlist();
				try {
					  for(PathologySampleWiseMaster mobj :mlist) {
						  
						      String sql=" select machine_name from pathology_machine_master where id="+mobj.getMachineId()+" ";
						      
						     SQLQuery q = sessionfactory.getCurrentSession().createSQLQuery(sql);
						       
						      String machineName  =(String) q.uniqueResult();
						  
						  String sql1 = "UPDATE PathologySampleWiseMaster set machineId =:machineId, profileComments =:profileComments, machineName =:machineName  where sampleWiseMasterId="+mobj.getSampleWiseMasterId()+"" ;
		   				    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
		   				    query.setParameter("machineId", mobj.getMachineId());
		   				    query.setParameter("profileComments", mobj.getProfileComments());
		   				    query.setParameter("machineName", machineName);
		   				    
		   				 query.executeUpdate();
		   					
					  }
					
				}catch (Exception e) {
					e.printStackTrace();
				}	
					// end
	}

	@Override
	public PathologySampleWiseMaster getRecordCountOnAuthorization(Integer statusCode, String fromDate, String toDate, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		
		
		Integer countCrilicallyAbnormal=0;
		Integer countAbnormal=0;
		Integer countNormal=0;
		Integer templateCount=0;
		
		PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
		//Map<String , String> routineValueMap=new HashMap<String,String>();
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
		LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();

		String newSetString="";
		//List<Integer> newSetList = new ArrayList<Integer>();
		try {			
			
			SQLQuery sql1 = null;
			
			String sql="";
			
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			String[] fDate = fromDate.split("/");
			fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
			String[] tDate = toDate.split("/");
			td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			
			// calculate normal count
			sql= "select count(*) from pathology_sample_wise_master where test_status="+statusCode+" and deleted='N' AND  SUBSTR(created_date_time, 1, 10) >='"+fd+"' and SUBSTR(created_date_time, 1, 10) <='"+td+"' and template_wise ='N' ";
			SQLQuery qn = sessionfactory.getCurrentSession().createSQLQuery(sql);
			countNormal= ((Number) qn.uniqueResult()).intValue();
			
			// calculate template count
			sql= "select count(*) from pathology_sample_wise_master where test_status="+statusCode+" and deleted='N' AND  SUBSTR(created_date_time, 1, 10) >='"+fd+"' and SUBSTR(created_date_time, 1, 10) <='"+td+"' and template_wise !='N' ";
			SQLQuery qt = sessionfactory.getCurrentSession().createSQLQuery(sql);
			templateCount= ((Number) qt.uniqueResult()).intValue();
		
			 obj.setNormalTestCount(countNormal);
			 obj.setTemplateTestCount(templateCount);
			
			
		
		} catch (Exception e) {
			e.printStackTrace();
			return obj;
		}
		return obj;
	}

	@Override
	public LabTestDTO getInvstigationPreDetails(PathologySampleWiseMaster master, String callFrom,HttpServletRequest request) {
		
		Session session = null;
		HttpSession sessionn = request.getSession();
		Integer unitId = (Integer) sessionn.getAttribute("uId");
		try {
			session = sessionfactory.getCurrentSession();
			LabTestDTO dto = new LabTestDTO();
			List<LabTestDTO> labTestList = new ArrayList<>();
			
				//START RIS Test
				
				Query qry = session.createSQLQuery("SELECT count(*) as count FROM ehat_bill_details where sub_service_id="+master.getSubServiceId()+" AND treatment_id="+master.getTreatmentId()+" AND deleted='N' AND cancle='N'");
				int count = ((Number)qry.uniqueResult()).intValue();
					 
				if(count <= 0) {
					Query query = session.createSQLQuery("SELECT count(*) as count FROM ehat_other_bill_detail_for_opd where treatment_id="+master.getTreatmentId()+" AND deleted='N'  AND cancle='N' AND child_sub_service_id="+master.getSubServiceId()+"");
					count = ((Number)query.uniqueResult()).intValue();
				}
				//Long count = (Long)query.uniqueResult();
				List<LabTestDTO> labTestList1 = new ArrayList<>();
				
				if(count > 0) {
					LabTestDTO test1 = new LabTestDTO();
					test1.setCallFrom("Profile Already Present");
					labTestList1.add(test1);
				    dto.setLabTestList(labTestList1);
					return dto;
				}else {
					
				
			}
			
		return dto;
	}catch (Exception e) {
			e.printStackTrace();
			log.error("getPathologyPreDetails()...Error :"+e);
		}
		return null;
	}
	
	
	
	
	//@Override
	public List<PathologySampleWiseMaster> getRoutinevalueResutlusingPrintOld(String masterid, Integer treatmentid,
			String patientType, Integer unitId, HttpServletRequest request) {
		String bothtype = "";
		// int sexType=0;
		int countFrom = 0;
		int count = 0;
		String agetyp = "";
		int age = 0;
		int month = 0;
		int days = 0;
		String type = null;
		String sex = null;
		String male;
		String female;
		String others;
		String sextyp;

		Integer patientId = 0;

		SQLQuery sqlindividual = null;
		String sqlindividualcount = null;
		String barcodefbsppbs = "";
		String fbsppbsaccepteddate = "";
		String fbsppbspostdate = "";
		String specialCase = "";
		String sqlindividualspecailcase = null;
		int countspecailcase = 0;
		int generalParameterCount = 0;// calculate general test count
		int indivisualParameterCount = 0;// calculate indivisual test count
		String testHeaderFlag = "G";
		
		
		String mobile="";
		

		List<PathologySampleWiseMaster> trendAnalysisList = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> ltunit = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> listofprofile = new ArrayList<PathologySampleWiseMaster>();
		;
		List<PathologySampleWiseMaster> listofTest = null;

		PathologySampleWiseMaster profileObj = null;

		try {
			HttpSession session = request.getSession();

			Integer unitId1 = (Integer) session.getAttribute("uId");
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String ftestId = (resourceBundle.getObject("FBSTEST").toString());
			Integer fbstestId = Integer.parseInt(ftestId);

			String ptestId = (resourceBundle.getObject("PPBSTEST").toString());
			Integer ppbstestId = Integer.parseInt(ptestId);

			SQLQuery patientage = sessionfactory.getCurrentSession().createSQLQuery(
					"select p.patient_id, p.age,p.age_months,p.age_days,p.gender,t.special_Case,ifnull(p.mobile,'' ) as mobile from ehat_patient p,ehat_treatment t where p.Patient_ID=t.Patient_ID and t.Treatment_ID="
							+ treatmentid);
			patientage.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> patientagelist = patientage.list();
			for (Map<String, Object> row : patientagelist) {
				patientId = (Integer) row.get("patient_id");
				age = (Integer) row.get("age");
				month = (Integer) row.get("age_months");
				days = (Integer) row.get("age_days");
				sex = (String) row.get("gender");
				patientId = (Integer) row.get("patient_id");
				specialCase = (String) row.get("special_Case");
				mobile= (String) row.get("mobile");
			}

			int ageP = 0;
			int monthP = 0;
			int daysP = 0;
			if (month > 0 || days > 0) {
				ageP = age + 1;
			} else {
				ageP = age;
			}

			if (ageP == 0) {
				if (month > 0) {
					monthP = month + 1;
				} else {
					monthP = month;
				}
			}

			if (ageP == 0 && monthP == 0) {
				if (days > 0) {
					daysP = days + 1;
				} else {
					daysP = days;
				}
			}

			Integer ageInMonths = ((age * 12) + month);
			int dobYear = age;
			int dobMonth = month;
			int dobDay = days;

			LocalDate now = LocalDate.now();
			LocalDate dob = now.minusYears(dobYear).minusMonths(dobMonth).minusDays(dobDay);

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

			String patientbirthDate = dob.format(formatter).toString();

			String[] patientBirthDatee = patientbirthDate.split("/");

			Integer d = Integer.parseInt(patientBirthDatee[0]);
			Integer m = Integer.parseInt(patientBirthDatee[1]);
			Integer y = Integer.parseInt(patientBirthDatee[2]);

			LocalDate birthDate = LocalDate.of(y, m, d);
			long ageInDays = ChronoUnit.DAYS.between(birthDate, now);

			String sql = "";
			String id[] = masterid.split(",");
			Set<Integer> masterIds = new HashSet<>();
			
			
			sql="select distinct IFNULL(trim(collection_date), '') as collection_date, IFNULL(trim(collection_time), '') as collection_time, pm.profile_Id,pm.test_status,pm.bar_code,SUBSTR(pm.accepted_datetime, 1, 19) as collecteddate,SUBSTR(pm.post_date, 1, 19) as postdate, pm.pathologist_id,pm.kitspec_id,ifnull(pm.profile_comments,'-') as profile_comments,pm.authorized_by,pm.post_by,ifnull(pm.template_wise,'') as template_wise,ifnull(pm.machine_name,'') as machine_name,ifnull(pm.machine_Id,0) as machine_Id,pm.id as id , pro.profileName AS profileName,"
					 + "    sample.sample_name AS SampleName,  pro.disclaimer AS disclaimer,  pro.disclaimer_chk AS disclaimer_chk,  pro.comment_chk AS comment_chk,  CONVERT(pro.interpretation USING utf8) as interpretation ," 
					 + 	"    CONVERT(pro.comments USING utf8) as comments, ifnull( (select count(*) from pathology_labprofiletestcomp pcom , pathology_lab_test pt where pcom.idTest =pt.idTest and  pcom.idprofile=pm.profile_Id and pt.valueType='individual'),0) as indivisualCount," 
					 + " ifnull( (select count(*) from pathology_labprofiletestcomp pcom , pathology_lab_test pt where pcom.idTest =pt.idTest and  pcom.idprofile=pm.profile_Id and pt.trendanalysis_id='Y'),0) as treadAnalysisFlag from pathology_sample_wise_master pm LEFT JOIN " 
					 + "    pathology_labprofile pro ON pm.profile_Id = pro.id  LEFT JOIN pathology_labsample sample ON pro.idTestSample = sample.id where pm.id in("+masterid+") and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid;
			
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list)
			{
				String profileNames="";
				profileObj = new PathologySampleWiseMaster();
				Integer id1= ((Number)row.get("id")).intValue();	
				Integer profileId = (Integer)row.get("profile_Id");	
				Integer teststatus = (Integer)row.get("test_status");	
				String barcode = (String)row.get("bar_code");				
				String collecteddate = (String)row.get("collecteddate");	
				String postdate = (String)row.get("postdate");	
				Integer PathologistId = (Integer)row.get("pathologist_id");	
				String kitspecId = (String)row.get("kitspec_id");	
				Integer authoId = (Integer)row.get("authorized_by");	
				Integer postId = (Integer)row.get("post_by");	
				String profilecomments = (String)row.get("profile_comments");
				String templateWise = (String)row.get("template_wise");
				String machineName = (String)row.get("machine_name");
				int machineId = ((Number)row.get("machine_Id")).intValue();
				String profileName = (String)row.get("profileName");
				String SampleName = (String)row.get("SampleName");
				String disclaimer = (String)row.get("disclaimer");
				String disclaimer_chk = (String)row.get("disclaimer_chk");
				String comment_chk = (String)row.get("comment_chk");
				String interpretation = (String)row.get("interpretation");
				String comments = (String)row.get("comments");
				Integer indivisualCount= ((Number)row.get("indivisualCount")).intValue();	
				Integer treadAnalysisFlagCount= ((Number)row.get("treadAnalysisFlag")).intValue();	
				

				String serviceAssignedDateTime = "";//(String)row.get("createdDateTime");
				
				String collectionDate = (String) row.get("collection_date");
				String collectionTime = (String) row.get("collection_time");
				String treadanalysisFlag="N";
				
				if(treadAnalysisFlagCount > 0)
					treadanalysisFlag="Y";
				

			//	LabProfileDTO lpObj = (LabProfileDTO) sessionfactory.getCurrentSession().get(LabProfileDTO.class,profileId);
				//profileNames=lpObj.getProfileName();
			

				//LabTestSampleDTO lsObj = lpObj.getLabTestSample();
				// added for interpretation data
			//String sqltemp1 = "select  CONVERT(interpretation USING utf8) as interpretation   from pathology_labprofile where id= "
				//		+ profileId + "  ";
				//SQLQuery q = sessionfactory.getCurrentSession().createSQLQuery(sqltemp1);
				//String interpretationData = (String) q.uniqueResult();
				// end interpretation

				// added for profile comments data
				//String sqltempcomment = "select  CONVERT(comments USING utf8) as comments   from pathology_labprofile where id= "
					//	+profileId + "  ";
				//SQLQuery qc = sessionfactory.getCurrentSession().createSQLQuery(sqltempcomment);
				//String profileComments = (String) qc.uniqueResult();
				// end profile comments

				//String serviceAssignedDateTime = "";// (String)row.get("createdDateTime");

			//	String collectionDate = pobj.getCollectionDate();
				//String collectionTime = pobj.getCollectionTime();

				if (!collectionDate.equalsIgnoreCase("") || !collectionTime.equalsIgnoreCase("")) {
					StringBuffer fd = new StringBuffer();
					String[] fDate = collectionDate.split("/");
					fd.append(fDate[2] + "-" + fDate[1] + "-" + fDate[0] + " " + collectionTime + ":00");

					serviceAssignedDateTime = fd.toString();
				} else {
					serviceAssignedDateTime = "-";
				}

				profileObj.setProfileId(profileId);
				// profileObj.setProfiId(pobj.getProfileId());
				profileObj.setProfileName(profileName);
				profileObj.setTeststatus(teststatus);

				profileObj.setComments(profilecomments);
				// profileObj.setProfileMasterComment(comments);
				profileObj.setProfileMasterComment(comments);
				// profileObj.setInterpretation(interpretation);
				profileObj.setInterpretation(interpretation);
				profileObj.setPathologistId(PathologistId);
				profileObj.setKitSpecId(kitspecId);
				profileObj.setAuthorizedBy(authoId);
				profileObj.setPostBy(postId);
				profileObj.setBarCode(barcode);
				profileObj.setCollecteddate(collecteddate);
				profileObj.setPostdate(postdate);
				profileObj.setPageno("N");
				profileObj.setBarcodefbsppbs(barcodefbsppbs);
				profileObj.setFbsppbsaccepteddate(fbsppbsaccepteddate);
				profileObj.setFbsppbspostdate(fbsppbspostdate);
				profileObj.setProfilesample(SampleName);
				profileObj.setServiceAssignedDateTime(serviceAssignedDateTime);
				profileObj.setTemplateWise(templateWise);
				profileObj.setDisclaimer(disclaimer);

				profileObj.setDisclaimerCheck(disclaimer_chk);
				profileObj.setCommentCheck(comment_chk);
				profileObj.setInterpretationCheck(interpretation);

				profileObj.setMachineName(machineName);
				profileObj.setMachineId(machineId);
				profileObj.setAgeInyear(ageP);
				profileObj.setAgeInMonth(monthP);
				profileObj.setAgeInDays(daysP);
				profileObj.setPatientId(patientId);
				profileObj.setTreadAnalysisFlagCount(treadAnalysisFlagCount);
				listofprofile.add(profileObj);

				listofTest = new ArrayList<PathologySampleWiseMaster>();
				if(!templateWise.equalsIgnoreCase("N")) {
				PathologySampleWiseMaster obj = (PathologySampleWiseMaster) sessionfactory.getCurrentSession()	.get(PathologySampleWiseMaster.class, id1);
				List<PathologySampleWiseSlave> pslavelist = obj.getPathologySampleWiseSlave();
				System.err.println("obj temp.." + obj.getTemplateWise());
				if (!obj.getTemplateWise().equalsIgnoreCase("N") && !obj.getTemplateWise().equalsIgnoreCase(" ")) {
					for (PathologySampleWiseSlave sobj : pslavelist) {
						String sqltemp = "select  ifnull(CONVERT(template_data USING utf8),'') as template_data   from pathology_sample_wise_slave where master_id= "
								+ id1 + "  group by master_id ";
						SQLQuery qq = sessionfactory.getCurrentSession().createSQLQuery(sqltemp);
						String templateData = (String) qq.uniqueResult();
						sobj.setTemplateData(templateData);

					}
				}
				profileObj.setPathologySampleWiseSlave(pslavelist);
				}
				if (  indivisualCount >   0) {
					testHeaderFlag = "I";
				}
				profileObj.setProfileName(profileName);
				profileObj.setMobile(mobile);
				profileObj.setTreadanalysisFlag(treadanalysisFlag);
				profileObj.setTestHeaderFlag(testHeaderFlag);
				profileObj.setTestli(listofTest);
				//profileObj.setPathologySampleWiseSlave(pslavelist);
				ltunit.add(profileObj);
				System.out.println("ltunit==========" + ltunit);

				System.out.println("ltunit size==========" + ltunit.size());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltunit;
	}

	@Override
	public PathologySampleWiseSlave getPathologySamplewiseSlaveDetailsForPrint(int testId, int profileId,int treatmentId) { /*	Criteria cslave = sessionfactory.getCurrentSession().createCriteria(PathologySampleWiseSlave.class);
		cslave.add(Restrictions.eq("testid", testId));
		cslave.add(Restrictions.eq("profileId", profileId));
		cslave.add(Restrictions.eq("treatmentId", treatmentId));
		cslave.add(Restrictions.eq("testflag", "N"));
		cslave.setMaxResults(1);
		PathologySampleWiseSlave pslaveObj = (PathologySampleWiseSlave) cslave.uniqueResult();
		return pslaveObj;
		*/
		
		Criteria cslave = sessionfactory.getCurrentSession().createCriteria(PathologySampleWiseSlave.class);
		cslave.add(Restrictions.eq("testid", testId));
		cslave.add(Restrictions.eq("profileId", profileId));
		cslave.add(Restrictions.eq("treatmentId", treatmentId));
		cslave.add(Restrictions.eq("testflag", "N"));
		PathologySampleWiseSlave pslaveObj=null;
      List<PathologySampleWiseSlave>	list	=cslave.list();
		    if(list.size() > 0) {
		    	pslaveObj =list.get(list.size()-1);
		    }
		//PathologySampleWiseSlave pslaveObj = (PathologySampleWiseSlave) cslave.uniqueResult();
		return pslaveObj;}

	@Override
	public PathologySampleWiseMaster getLabTestNormalValueDetialsForPrint(String sex, int agetType, int ageP,List<LabTestNormalValuesDTO>  labNormalvalueTest) {
		PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
		int bothCount=0;
		for (LabTestNormalValuesDTO labNObj : labNormalvalueTest) {

			LabTestMethodDTO lnMobj = new LabTestMethodDTO();
			LabUnitTypeDTO lnuObj = labNObj.getLabUnit();
			if (labNObj.getTestMethodIdWithNormal() > 0) {
				lnMobj = (LabTestMethodDTO) sessionfactory.getCurrentSession()
						.get(LabTestMethodDTO.class, labNObj.getTestMethodIdWithNormal());
			}

			// for male Data
			if (sex.equalsIgnoreCase("Male")) {
				// Fetch Year Wise Data
				if (agetType == 1) {
					
					if (labNObj.getSex().equalsIgnoreCase("1")
							&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
						double ageB = BigDecimal.valueOf(ageP).doubleValue();
						double ageFLab = (labNObj.getFromAge()).doubleValue();
						double ageTOLab = (labNObj.getToAge()).doubleValue();

						if (ageB >= ageFLab && ageB <= ageTOLab) {
							bothCount++;
							
							testObj.setMethodename(lnMobj.getMethodName());
							testObj.setDefaultvalue(labNObj.getDefaultValue());
							testObj.setLowvalue(labNObj.getLowerValue());
							testObj.setHighvalue(labNObj.getUpperValue());
							testObj.setExpression(labNObj.getExpression());
							testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
							testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
							

							

						}

					}
					// Fetch Data Month Wise
				} else if (agetType ==2) {

					if (labNObj.getSex().equalsIgnoreCase("1")
							&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
						double ageB = BigDecimal.valueOf(ageP).doubleValue();
						double ageFLab = (labNObj.getFromAge()).doubleValue();
						double ageTOLab = (labNObj.getToAge()).doubleValue();

						if (ageB >= ageFLab && ageB <= ageTOLab) {
							bothCount++;
							testObj.setMethodename(lnMobj.getMethodName());
						testObj.setDefaultvalue(labNObj.getDefaultValue());
						testObj.setLowvalue(labNObj.getLowerValue());
						testObj.setHighvalue(labNObj.getUpperValue());
						testObj.setExpression(labNObj.getExpression());
						testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
						testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());}

					}
					// fetch Data Day wise
				} else if ( agetType == 3) {

					if (labNObj.getSex().equalsIgnoreCase("1")
							&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
						double ageB = BigDecimal.valueOf(ageP).doubleValue();
						double ageFLab = (labNObj.getFromAge()).doubleValue();
						double ageTOLab = (labNObj.getToAge()).doubleValue();

						if (ageB >= ageFLab && ageB <= ageTOLab) {
							bothCount++;
							testObj.setMethodename(lnMobj.getMethodName());
						testObj.setDefaultvalue(labNObj.getDefaultValue());
						testObj.setLowvalue(labNObj.getLowerValue());
						testObj.setHighvalue(labNObj.getUpperValue());
						testObj.setExpression(labNObj.getExpression());
						testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
						testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());}

					}
					// fetch Data Day wise
				}

				// For Female Data
			} else if (sex.equalsIgnoreCase("Female")) {
				// Fetch Year Wise Data
				if (agetType == 1) {
					
					if (labNObj.getSex().equalsIgnoreCase("2")
							&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
						double ageB = BigDecimal.valueOf(ageP).doubleValue();
						double ageFLab = (labNObj.getFromAge()).doubleValue();
						double ageTOLab = (labNObj.getToAge()).doubleValue();

						if (ageB >= ageFLab && ageB <= ageTOLab) {
							bothCount++;
							
							testObj.setMethodename(lnMobj.getMethodName());
							testObj.setDefaultvalue(labNObj.getDefaultValue());
							testObj.setLowvalue(labNObj.getLowerValue());
							testObj.setHighvalue(labNObj.getUpperValue());
							testObj.setExpression(labNObj.getExpression());
							testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
							testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
							

							

						}

					}
					// Fetch Data Month Wise
				} else if (agetType ==2) {

					if (labNObj.getSex().equalsIgnoreCase("2")
							&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
						double ageB = BigDecimal.valueOf(ageP).doubleValue();
						double ageFLab = (labNObj.getFromAge()).doubleValue();
						double ageTOLab = (labNObj.getToAge()).doubleValue();

						if (ageB >= ageFLab && ageB <= ageTOLab) {
							bothCount++;
							testObj.setMethodename(lnMobj.getMethodName());
						testObj.setDefaultvalue(labNObj.getDefaultValue());
						testObj.setLowvalue(labNObj.getLowerValue());
						testObj.setHighvalue(labNObj.getUpperValue());
						testObj.setExpression(labNObj.getExpression());
						testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
						testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());}

					}
					// fetch Data Day wise
				} else if ( agetType == 3) {

					if (labNObj.getSex().equalsIgnoreCase("2")
							&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
						double ageB = BigDecimal.valueOf(ageP).doubleValue();
						double ageFLab = (labNObj.getFromAge()).doubleValue();
						double ageTOLab = (labNObj.getToAge()).doubleValue();

						if (ageB >= ageFLab && ageB <= ageTOLab) {
							bothCount++;
							testObj.setMethodename(lnMobj.getMethodName());
						testObj.setDefaultvalue(labNObj.getDefaultValue());
						testObj.setLowvalue(labNObj.getLowerValue());
						testObj.setHighvalue(labNObj.getUpperValue());
						testObj.setExpression(labNObj.getExpression());
						testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
						testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());}

					}
					// fetch Data Day wise
				}

				// For Female Data
			}
			
			
			// for Checking In Both Start 
			    if(bothCount == 0) {
					// Fetch Year Wise Data
					if (agetType == 1) {
						
						if (labNObj.getSex().equalsIgnoreCase("4")
								&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
							double ageB = BigDecimal.valueOf(ageP).doubleValue();
							double ageFLab = (labNObj.getFromAge()).doubleValue();
							double ageTOLab = (labNObj.getToAge()).doubleValue();

							if (ageB >= ageFLab && ageB <= ageTOLab) {
								bothCount++;
								
								testObj.setMethodename(lnMobj.getMethodName());
								testObj.setDefaultvalue(labNObj.getDefaultValue());
								testObj.setLowvalue(labNObj.getLowerValue());
								testObj.setHighvalue(labNObj.getUpperValue());
								testObj.setExpression(labNObj.getExpression());
								testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
								testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
								

								

							}

						}
						// Fetch Data Month Wise
					} else if (agetType ==2) {

						if (labNObj.getSex().equalsIgnoreCase("4")
								&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
							double ageB = BigDecimal.valueOf(ageP).doubleValue();
							double ageFLab = (labNObj.getFromAge()).doubleValue();
							double ageTOLab = (labNObj.getToAge()).doubleValue();

							if (ageB >= ageFLab && ageB <= ageTOLab) {
								bothCount++;
								testObj.setMethodename(lnMobj.getMethodName());
							testObj.setDefaultvalue(labNObj.getDefaultValue());
							testObj.setLowvalue(labNObj.getLowerValue());
							testObj.setHighvalue(labNObj.getUpperValue());
							testObj.setExpression(labNObj.getExpression());
							testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
							testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());}

						}
						// fetch Data Day wise
					} else if ( agetType == 3) {

						if (labNObj.getSex().equalsIgnoreCase("4")
								&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
							double ageB = BigDecimal.valueOf(ageP).doubleValue();
							double ageFLab = (labNObj.getFromAge()).doubleValue();
							double ageTOLab = (labNObj.getToAge()).doubleValue();

							if (ageB >= ageFLab && ageB <= ageTOLab) {
								bothCount++;
								testObj.setMethodename(lnMobj.getMethodName());
							testObj.setDefaultvalue(labNObj.getDefaultValue());
							testObj.setLowvalue(labNObj.getLowerValue());
							testObj.setHighvalue(labNObj.getUpperValue());
							testObj.setExpression(labNObj.getExpression());
							testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
							testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());}

						}
						// fetch Data Day wise
					}

					// For Female Data
				}
			// ENd For Both
			
			

		
		}
		
		
		
		
		
		
		
		
		return testObj;
	}

	@Override
	public List<PathologySampleWiseMaster> getTestComponentListByProfileId(int profileId) {
		    try {
		        String sql=" SELECT DISTINCT  IFNULL(ptcomp.idTest, 0) AS testIdd, pt.testName AS testName,pt.microorganism AS microorganism,"
		               + " pt.quantitative AS quantitative,  pt.valueType AS testType, pt.biological_reference_chk AS biologicalReferenceChk," 
		        	   + "  pt.sample_type_chk AS sampleTypeChk,  pt.test_method_chk AS testMethodChk, pt.testNote AS testNote,"
		               +"    psample.sample_name AS samplename, ifnull(ptcomp.headName,'-') AS headingname, ptcomp.sequence as sequence,pt.trendanalysis_id as treadanalysisFlag,pu.unitName as unitname "
		        	   + " FROM     pathology_lab_test pt   LEFT JOIN  pathology_labprofiletestcomp ptcomp ON pt.idTest = ptcomp.idTest" 
		               +" LEFT JOIN  pathology_labsample psample ON pt.idTestSample = psample.id    left join pathology_labunittype pu on pt.idLabUnit=pu.id   WHERE    ptcomp.idprofile ="+profileId+"  "
		        	   + "  union all"
		               +" select  DISTINCT    IFNULL(ptcomp.idTest, 0) AS testIdd,  ''  AS testName, ''  AS microorganism, '' AS quantitative," 
		        	   +"   '' AS testType, '' AS biologicalReferenceChk,''  AS sampleTypeChk, ''  AS testMethodChk, ''  AS testNote," 
		               +"  ''  AS samplename,ifnull(ptcomp.headName,'-') AS headingname, ptcomp.sequence as sequence,'' as treadanalysisFlag,'' as unitname from " 
		        	   +"    pathology_lab_test pt,pathology_labprofiletestcomp ptcomp   WHERE    ptcomp.idprofile = "+profileId+" and ptcomp.idTest is null" 
		               +"    order by sequence asc";
		        
		        Query querySp = sessionfactory.getCurrentSession().createSQLQuery(sql);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				@SuppressWarnings("unchecked")
				 List<PathologySampleWiseMaster>	lstTestComponent = querySp.list();	
		        return lstTestComponent;
		    }catch (Exception e) {
				e.printStackTrace();
			}
		    
		    return null;
	}

	@Override
	public PathologySampleWiseMaster getLabNormalValuesForPrint(String sex, int agetType, int ageP, int testId) {
		PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
		try {
		   String sql="select pnv.age_in as ageIn,pnv.sexType as sex,pnv.lab_fage as fromAge,pnv.lab_toage as toAge,pnv.lowerVal as lowerValue,pnv.upperVal as upperValue,pnv.expression as expression,pnv.interpretationwith_normal as interpretationWithNormal,\n" + 
		   		"pnv. biologicalReferenceWith_normal as biologicalReferenceWithNormal,pnv.testMethodwith_normal as testMethodIdWithNormal,pnv.default_value as defaultValue, pnv.idunitType as idUnitType  from pathology_labtestnormalvalue pnv where matser_id="+testId+" ";
		   
		   Query querySp = sessionfactory.getCurrentSession().createSQLQuery(sql);
						querySp.setResultTransformer(new AliasToBeanResultTransformer(LabTestNormalValuesDTO.class));
						@SuppressWarnings("unchecked")
						 List<LabTestNormalValuesDTO> lstTestComponent = querySp.list();	
		
                      
					
						int bothCount=0;
						for (LabTestNormalValuesDTO labNObj : lstTestComponent) {

							LabTestMethodDTO lnMobj = new LabTestMethodDTO();
						//	LabUnitTypeDTO lnuObj = labNObj.getLabUnit();
						String unitName="";
						
						String sqlUnitName ="select unitName from pathology_labunittype where id ="+ labNObj.getIdUnitType();
						
					//	System.out.println("....sqlUnitName.............."+sqlUnitName);
						Query q = sessionfactory.getCurrentSession().createSQLQuery(sqlUnitName);
						
						unitName = (String) q.uniqueResult();
						 
							
							if (labNObj.getTestMethodIdWithNormal() > 0) {
								lnMobj = (LabTestMethodDTO) sessionfactory.getCurrentSession()
										.get(LabTestMethodDTO.class, labNObj.getTestMethodIdWithNormal());
							}

							// for male Data
							if (sex.equalsIgnoreCase("Male")) {
								// Fetch Year Wise Data
								if (agetType == 1) {
									
									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//	testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
								} else if (agetType ==2) {

									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										
										
									}
									// fetch Data Day wise
								} else if ( agetType == 3) {

									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
									}
									// fetch Data Day wise
								}

								// For Female Data
							} else if (sex.equalsIgnoreCase("Female")) {
								// Fetch Year Wise Data
								if (agetType == 1) {
									
									if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
											//testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
								} else if (agetType ==2) {

									if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
										
									}
									// fetch Data Day wise
								} else if ( agetType == 3) {

									if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
										double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//testObj.setUnitname(lnuObj.getUnitName());
										testObj.setUnitname(unitName);
										}
										
									}
									// fetch Data Day wise
								}

								// For Female Data
							}
							
							
							// for Checking In Both Start 
							    if(bothCount == 0) {
									// Fetch Year Wise Data
									if (agetType == 1) {
										
										if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
											double ageB = BigDecimal.valueOf(ageP).doubleValue();
											double ageFLab = (labNObj.getFromAge()).doubleValue();
											double ageTOLab = (labNObj.getToAge()).doubleValue();

											if (ageB >= ageFLab && ageB <= ageTOLab) {
												bothCount++;
												
												testObj.setMethodename(lnMobj.getMethodName());
												testObj.setDefaultvalue(labNObj.getDefaultValue());
												testObj.setLowvalue(labNObj.getLowerValue());
												testObj.setHighvalue(labNObj.getUpperValue());
												testObj.setExpression(labNObj.getExpression());
												testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
												testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
												
												//testObj.setUnitname(lnuObj.getUnitName());
												testObj.setUnitname(unitName);

											}

										}
										// Fetch Data Month Wise
									} else if (agetType ==2) {

										if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("2")) {
											double ageB = BigDecimal.valueOf(ageP).doubleValue();
											double ageFLab = (labNObj.getFromAge()).doubleValue();
											double ageTOLab = (labNObj.getToAge()).doubleValue();

											if (ageB >= ageFLab && ageB <= ageTOLab) {
												bothCount++;
												testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
//											testObj.setUnitname(lnuObj.getUnitName());
											testObj.setUnitname(unitName);
											}
										
										}
										// fetch Data Day wise
									} else if ( agetType == 3) {

										if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("3")) {
											double ageB = BigDecimal.valueOf(ageP).doubleValue();
											double ageFLab = (labNObj.getFromAge()).doubleValue();
											double ageTOLab = (labNObj.getToAge()).doubleValue();

											if (ageB >= ageFLab && ageB <= ageTOLab) {
												bothCount++;
												testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
											//testObj.setUnitname(lnuObj.getUnitName());
											testObj.setUnitname(unitName);
											}
											
										}
										// fetch Data Day wise
									}

									// For Female Data
								}
							// ENd For Both
							
							

						
						}
						
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		   System.out.println("testObj========"+testObj);
						
						return testObj;
					
	}

	@Override
	public PathologySampleWiseMaster getTrendAnaylsisDetailsForPrint(int patientId, int treatmentid, int testId) {
		PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
		try {
		// added for graph start
		List<String> trendAnalysisGraphResultList = new ArrayList<>();
		List<String> trendAnalysisGraphDateList = new ArrayList<>();
		List<String> trendAnalysisGraphFlagList = new ArrayList<>();
		SQLQuery trendquerygraph = sessionfactory.getCurrentSession().createSQLQuery("SELECT SUBSTR(ps.created_date_time, 1, 20) AS datetime, ps.test_result,ps.flag_mark FROM pathology_sample_wise_slave ps where ps.test_id="+testId+" and ps.patient_id="+patientId+" and ps.treatment_id <="+treatmentid+" order by ps.created_date_time asc ");
		trendquerygraph.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> trendquerylistgraph = trendquerygraph.list();
		for (Map<String, Object> rs8 : trendquerylistgraph) {								
	
			if((String)rs8.get("test_result") != null) {
				
				trendAnalysisGraphResultList.add((String)rs8.get("test_result"));
				trendAnalysisGraphDateList.add((String)rs8.get("datetime"));
				trendAnalysisGraphFlagList.add((String)rs8.get("flag_mark"));
			}									
		}
		
		// end for graph
		obj.setTreandAnalysisGraphList(trendAnalysisGraphResultList);
		obj.setTreandAnalysissGraphDateList(trendAnalysisGraphDateList);
		obj.setTreandAnalysissGraphFlagList(trendAnalysisGraphFlagList);
		
		// added for single and five record
		
			List<String> trendAnalysisResultFiveSingleList = new ArrayList<>();
			List<String> trendAnalysisFiveSingleDateList = new ArrayList<>();
			List<String> trendAnalysisFiveSingleFlagList = new ArrayList<>();
		
			SQLQuery trendquery = sessionfactory.getCurrentSession().createSQLQuery("SELECT SUBSTR(ps.created_date_time, 1, 20) AS datetime, ps.test_result,ps.flag_mark FROM pathology_sample_wise_slave ps where ps.test_id="+testId+" and ps.patient_id="+patientId+" and ps.treatment_id <="+treatmentid+" order by ps.id desc ");
			trendquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> trendquerylist = trendquery.list();
			for (Map<String, Object> rs8 : trendquerylist) {								
		
				if((String)rs8.get("test_result") != null) {
					
					trendAnalysisResultFiveSingleList.add((String)rs8.get("test_result"));
					trendAnalysisFiveSingleDateList.add((String)rs8.get("datetime"));
					trendAnalysisFiveSingleFlagList.add((String)rs8.get("flag_mark"));
				}									
			}
			
			
			obj.setTrendAnalysisResultFiveSingleList(trendAnalysisResultFiveSingleList);
			obj.setTrendAnalysisFiveSingleDateList(trendAnalysisFiveSingleDateList);
			obj.setTrendAnalysisFiveSingleFlagList(trendAnalysisFiveSingleFlagList);
		
		// end single and five record
		}catch (Exception e) {
			e.printStackTrace();
		}
			return obj;
		
	}

	@Override
	public List<PathologySampleWiseMaster> getRoutinevalueResutlusingNewPrint(String masterid, Integer treatmentid,
			String patientType, Integer unitId, HttpServletRequest request) {
		String bothtype = "";
		// int sexType=0;
		int countFrom = 0;
		int count = 0;
		String agetyp = "";
		int age = 0;
		int month = 0;
		int days = 0;
		String type = null;
		String sex = null;
		String male;
		String female;
		String others;
		String sextyp;

		Integer patientId = 0;

		SQLQuery sqlindividual = null;
		String sqlindividualcount = null;
		String barcodefbsppbs = "";
		String fbsppbsaccepteddate = "";
		String fbsppbspostdate = "";
		String specialCase = "";
		String sqlindividualspecailcase = null;
		int countspecailcase = 0;
		int generalParameterCount = 0;// calculate general test count
		int indivisualParameterCount = 0;// calculate indivisual test count
		
		
		
		String mobile="";
		

	
		List<PathologySampleWiseMaster> ltunit = new ArrayList<PathologySampleWiseMaster>();
		List<PathologySampleWiseMaster> listofprofile = new ArrayList<PathologySampleWiseMaster>();
		;
		List<PathologySampleWiseMaster> listofTest = null;

		PathologySampleWiseMaster profileObj = null;

		try {
			HttpSession session = request.getSession();

			Integer unitId1 = (Integer) session.getAttribute("uId");
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String ftestId = (resourceBundle.getObject("FBSTEST").toString());
			Integer fbstestId = Integer.parseInt(ftestId);

			String ptestId = (resourceBundle.getObject("PPBSTEST").toString());
			Integer ppbstestId = Integer.parseInt(ptestId);

			SQLQuery patientage = sessionfactory.getCurrentSession().createSQLQuery(
					"select p.patient_id, p.age,p.age_months,p.age_days,p.gender,t.special_Case,ifnull(p.mobile,'' ) as mobile from ehat_patient p,ehat_treatment t where p.Patient_ID=t.Patient_ID and t.Treatment_ID="
							+ treatmentid);
			patientage.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> patientagelist = patientage.list();
			for (Map<String, Object> row : patientagelist) {
				patientId = (Integer) row.get("patient_id");
				age = (Integer) row.get("age");
				month = (Integer) row.get("age_months");
				days = (Integer) row.get("age_days");
				sex = (String) row.get("gender");
				patientId = (Integer) row.get("patient_id");
				specialCase = (String) row.get("special_Case");
				mobile= (String) row.get("mobile");
			}

			int ageP = 0;
			int monthP = 0;
			int daysP = 0;
			if(age > 0) {
				if (month > 0 || days > 0) {
					//ageP = age + 1;
					ageP = age;
				} else {
					ageP = age;
				}
			}

			if (ageP == 0) {
				if (month > 0) {
					//monthP = month + 1;
					monthP = month;
				} else {
					monthP = month;
				}
			}

			if (ageP == 0 && monthP == 0) {
				if (days > 0) {
					//daysP = days + 1;
					daysP = days;
				} else {
					daysP = days;
				}
			}

			Integer ageInMonths = ((age * 12) + month);
			int dobYear = age;
			int dobMonth = month;
			int dobDay = days;

			LocalDate now = LocalDate.now();
			LocalDate dob = now.minusYears(dobYear).minusMonths(dobMonth).minusDays(dobDay);

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

			String patientbirthDate = dob.format(formatter).toString();

			String[] patientBirthDatee = patientbirthDate.split("/");

			Integer d = Integer.parseInt(patientBirthDatee[0]);
			Integer m = Integer.parseInt(patientBirthDatee[1]);
			Integer y = Integer.parseInt(patientBirthDatee[2]);

			LocalDate birthDate = LocalDate.of(y, m, d);
			long ageInDays = ChronoUnit.DAYS.between(birthDate, now);

			String sql = "";
			String profileNames="";// added for name given to pdf
			int profileCount=0;
			
			
			sql="select distinct IFNULL(trim(collection_date), '') as collection_date, IFNULL(trim(collection_time), '') as collection_time, pm.profile_Id,pm.test_status,pm.bar_code,SUBSTR(pm.accepted_datetime, 1, 19) as collecteddate,SUBSTR(pm.post_date, 1, 19) as postdate, pm.pathologist_id,pm.kitspec_id,ifnull(pm.profile_comments,'-') as profile_comments,pm.authorized_by,pm.post_by,ifnull(pm.template_wise,'') as template_wise,ifnull(pm.machine_name,'') as machine_name,ifnull(pm.machine_Id,0) as machine_Id,pm.id as id , pro.profileName AS profileName,ifnull(pm.sample_collected_at,'') as sample_collected_at,ifnull(pm.customer_id,0) as customer_id,ifnull(pm.customer_type,0) as customer_type,"
					 + "    sample.sample_name AS SampleName,  pro.disclaimer AS disclaimer,  pro.disclaimer_chk AS disclaimer_chk,  pro.comment_chk AS comment_chk,  CONVERT(pro.interpretation USING utf8) as interpretation ," 
					 + 	"    CONVERT(pro.comments USING utf8) as comments, ifnull( (select count(*) from pathology_labprofiletestcomp pcom , pathology_lab_test pt where pcom.idTest =pt.idTest and  pcom.idprofile=pm.profile_Id and pt.valueType='individual'),0) as indivisualCount," 
					 + " ifnull( (select count(*) from pathology_labprofiletestcomp pcom , pathology_lab_test pt where pcom.idTest =pt.idTest and  pcom.idprofile=pm.profile_Id and pt.trendanalysis_id='Y'),0) as treadAnalysisFlag,pro.interpretation_chk as interpretation_chk from pathology_sample_wise_master pm LEFT JOIN " 
					 + "    pathology_labprofile pro ON pm.profile_Id = pro.id  LEFT JOIN pathology_labsample sample ON pro.idTestSample = sample.id where pm.id in("+masterid+") and pm.unit_id="+unitId+" and pm.treatment_id="+treatmentid;
			
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list)
			{
				String testHeaderFlag = "G";
				profileObj = new PathologySampleWiseMaster();
				Integer id1= ((Number)row.get("id")).intValue();	
				Integer profileId = (Integer)row.get("profile_Id");	
				Integer teststatus = (Integer)row.get("test_status");	
				String barcode = (String)row.get("bar_code");				
				String collecteddate = (String)row.get("collecteddate");	
				String postdate = (String)row.get("postdate");	
				Integer PathologistId = (Integer)row.get("pathologist_id");	
				String kitspecId = (String)row.get("kitspec_id");	
				Integer authoId = (Integer)row.get("authorized_by");	
				Integer postId = (Integer)row.get("post_by");	
				String profilecomments = (String)row.get("profile_comments");
				String templateWise = (String)row.get("template_wise");
				String machineName = (String)row.get("machine_name");
				int machineId = ((Number)row.get("machine_Id")).intValue();
				String profileName = (String)row.get("profileName");
				String SampleName = (String)row.get("SampleName");
				String disclaimer = (String)row.get("disclaimer");
				String disclaimer_chk = (String)row.get("disclaimer_chk");
				String comment_chk = (String)row.get("comment_chk");
				String interpretation = (String)row.get("interpretation");
				String comments = (String)row.get("comments");
				Integer indivisualCount= ((Number)row.get("indivisualCount")).intValue();	
				Integer treadAnalysisFlagCount= ((Number)row.get("treadAnalysisFlag")).intValue();	
				String interpretation_chk = (String)row.get("interpretation_chk");

				String serviceAssignedDateTime = "";//(String)row.get("createdDateTime");
				
				String collectionDate = (String) row.get("collection_date");
				String collectionTime = (String) row.get("collection_time");
				profileObj.setSampleCollectedAt((String) row.get("sample_collected_at"));
				profileObj.setCustomerId(((Number)row.get("customer_id")).intValue());
				profileObj.setCustomerType(((Number)row.get("customer_type")).intValue());
				
				// get customer name
				String customerName="";
				  if(((Number)row.get("customer_id")).intValue() > 0) {
				       String sqlName=" select ifnull(lab_name,'') as lab_name from business_master_new    where id="+((Number)row.get("customer_id")).intValue()+" ";
				       customerName = (String) sessionfactory.getCurrentSession().createSQLQuery(sqlName).uniqueResult();
				  }
				  profileObj.setCustomerName(customerName);
				
				String treadanalysisFlag="N";
				
				if(treadAnalysisFlagCount > 0)
					treadanalysisFlag="Y";
				
				  if(profileCount == 0 )
					  profileNames=profileName;
				  else 
					  profileNames=profileNames+"_"+profileName;
			   
				  profileCount++;

				if (!collectionDate.equalsIgnoreCase("") || !collectionTime.equalsIgnoreCase("")) {
					StringBuffer fd = new StringBuffer();
					String[] fDate = collectionDate.split("/");
					fd.append(fDate[2] + "-" + fDate[1] + "-" + fDate[0] + " " + collectionTime + ":00");

					serviceAssignedDateTime = fd.toString();
				} else {
					serviceAssignedDateTime = "-";
				}

				profileObj.setProfileId(profileId);
				
				profileObj.setProfileName(profileName);
				profileObj.setTeststatus(teststatus);

				profileObj.setComments(profilecomments);
				
				profileObj.setProfileMasterComment(comments);
				
				profileObj.setInterpretation(interpretation);
				profileObj.setPathologistId(PathologistId);
				profileObj.setKitSpecId(kitspecId);
				profileObj.setAuthorizedBy(authoId);
				profileObj.setPostBy(postId);
				profileObj.setBarCode(barcode);
				profileObj.setCollecteddate(collecteddate);
				profileObj.setPostdate(postdate);
				profileObj.setPageno("N");
				profileObj.setBarcodefbsppbs(barcodefbsppbs);
				profileObj.setFbsppbsaccepteddate(fbsppbsaccepteddate);
				profileObj.setFbsppbspostdate(fbsppbspostdate);
				profileObj.setProfilesample(SampleName);
				profileObj.setServiceAssignedDateTime(serviceAssignedDateTime);
				profileObj.setTemplateWise(templateWise);
				profileObj.setDisclaimer(disclaimer);

				profileObj.setDisclaimerCheck(disclaimer_chk);
				profileObj.setCommentCheck(comment_chk);
				profileObj.setInterpretationCheck(interpretation_chk);

				profileObj.setMachineName(machineName);
				profileObj.setMachineId(machineId);
				profileObj.setAgeInyear(ageP);
				profileObj.setAgeInMonth(monthP);
				profileObj.setAgeInDays(daysP);
				profileObj.setPatientId(patientId);
				profileObj.setTreadAnalysisFlagCount(treadAnalysisFlagCount);
				profileObj.setProfileNamesPdf(profileNames);
				listofprofile.add(profileObj);

				listofTest = new ArrayList<PathologySampleWiseMaster>();
				if(!templateWise.equalsIgnoreCase("N")) {
				PathologySampleWiseMaster obj = (PathologySampleWiseMaster) sessionfactory.getCurrentSession()	.get(PathologySampleWiseMaster.class, id1);
				List<PathologySampleWiseSlave> pslavelist = obj.getPathologySampleWiseSlave();
				System.err.println("obj temp.." + obj.getTemplateWise());
				if (!obj.getTemplateWise().equalsIgnoreCase("N") && !obj.getTemplateWise().equalsIgnoreCase(" ")) {
					for (PathologySampleWiseSlave sobj : pslavelist) {
						String sqltemp = "select  ifnull(CONVERT(template_data USING utf8),'') as template_data   from pathology_sample_wise_slave where master_id= "
								+ id1 + "  group by master_id ";
						SQLQuery qq = sessionfactory.getCurrentSession().createSQLQuery(sqltemp);
						String templateData = (String) qq.uniqueResult();
						sobj.setTemplateData(templateData);

					}
				}
				profileObj.setPathologySampleWiseSlave(pslavelist);
				}
				if (  indivisualCount >   0) {
					testHeaderFlag = "I";
				}
				profileObj.setProfileName(profileName);
				profileObj.setMobile(mobile);
				profileObj.setTreadanalysisFlag(treadanalysisFlag);
				profileObj.setTestHeaderFlag(testHeaderFlag);
				profileObj.setTestli(listofTest);
				profileObj.setSampleWiseMasterId(id1);
				//profileObj.setPathologySampleWiseSlave(pslavelist);
				ltunit.add(profileObj);
			
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltunit;
	}
	
	
		
	@Override
	public PathologySampleWiseMaster getLabNormalValuesForPrintInDays(String sex, int agetType, int patientId, int testId) {
		PathologySampleWiseMaster testObj = new PathologySampleWiseMaster();
		try {
		   String sql="select pnv.age_in as ageIn,pnv.sexType as sex,pnv.lab_fage as fromAge,pnv.lab_toage as toAge,pnv.lowerVal as lowerValue,pnv.upperVal as upperValue,pnv.expression as expression,pnv.interpretationwith_normal as interpretationWithNormal,\n" + 
		   		"pnv. biologicalReferenceWith_normal as biologicalReferenceWithNormal,pnv.testMethodwith_normal as testMethodIdWithNormal,pnv.default_value as defaultValue, pnv.idunitType as idUnitType  from pathology_labtestnormalvalue pnv where matser_id="+testId+" ";
		   
		   Query querySp = sessionfactory.getCurrentSession().createSQLQuery(sql);
						querySp.setResultTransformer(new AliasToBeanResultTransformer(LabTestNormalValuesDTO.class));
						@SuppressWarnings("unchecked")
						 List<LabTestNormalValuesDTO> lstTestComponent = querySp.list();	
		                 
						// get dob
						String sqlDob=" select dob from ehat_patient where patient_id="+patientId+" ";
						String dob=(String) sessionfactory.getCurrentSession().createSQLQuery(sqlDob).uniqueResult();
						int ageB=calculateDays(dob);
						 
					
						int bothCount=0;
						for (LabTestNormalValuesDTO labNObj : lstTestComponent) {

							LabTestMethodDTO lnMobj = new LabTestMethodDTO();
						//	LabUnitTypeDTO lnuObj = labNObj.getLabUnit();
						String unitName="";
						
						String sqlUnitName ="select unitName from pathology_labunittype where id ="+ labNObj.getIdUnitType();
						
					//	System.out.println("....sqlUnitName.............."+sqlUnitName);
						Query q = sessionfactory.getCurrentSession().createSQLQuery(sqlUnitName);
						
						unitName = (String) q.uniqueResult();
						 
							
							if (labNObj.getTestMethodIdWithNormal() > 0) {
								lnMobj = (LabTestMethodDTO) sessionfactory.getCurrentSession()
										.get(LabTestMethodDTO.class, labNObj.getTestMethodIdWithNormal());
							}

							// for male Data
							if (sex.equalsIgnoreCase("Male")) {
								// Fetch Year Wise Data
								
									
									if (labNObj.getSex().equalsIgnoreCase("1")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*365;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*365;

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//	testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
									else if (labNObj.getSex().equalsIgnoreCase("1")
												&& labNObj.getAgeIn().equalsIgnoreCase("2")) {

								
									//	double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*30;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*30;
										
										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										
										
									
									// fetch Data Day wise
								} else if (labNObj.getSex().equalsIgnoreCase("1")
										&& labNObj.getAgeIn().equalsIgnoreCase("3")) {

										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											bothCount++;
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
									
									// fetch Data Day wise
								}

								// For Female Data
							} else if (sex.equalsIgnoreCase("Female")) {
								// Fetch Year Wise Data
								
								
								if (labNObj.getSex().equalsIgnoreCase("2")
										&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
									//double ageB = BigDecimal.valueOf(ageP).doubleValue();
									double ageFLab = (labNObj.getFromAge()).doubleValue();
									ageFLab=ageFLab*365;
									double ageTOLab = (labNObj.getToAge()).doubleValue();
									ageTOLab=ageTOLab*365;

									if (ageB >= ageFLab && ageB <= ageTOLab) {
										bothCount++;
										
										testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
									//	testObj.setUnitname(lnuObj.getUnitName());

										testObj.setUnitname(unitName);

									}

								}
								// Fetch Data Month Wise
								else if (labNObj.getSex().equalsIgnoreCase("2")
											&& labNObj.getAgeIn().equalsIgnoreCase("2")) {

							
								//	double ageB = BigDecimal.valueOf(ageP).doubleValue();
									double ageFLab = (labNObj.getFromAge()).doubleValue();
									ageFLab=ageFLab*30;
									double ageTOLab = (labNObj.getToAge()).doubleValue();
									ageTOLab=ageTOLab*30;
									
									if (ageB >= ageFLab && ageB <= ageTOLab) {
										bothCount++;
										testObj.setMethodename(lnMobj.getMethodName());
									testObj.setDefaultvalue(labNObj.getDefaultValue());
									testObj.setLowvalue(labNObj.getLowerValue());
									testObj.setHighvalue(labNObj.getUpperValue());
									testObj.setExpression(labNObj.getExpression());
									testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
									testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
									testObj.setUnitname(unitName);
									}
									
									
								
								// fetch Data Day wise
							} else if (labNObj.getSex().equalsIgnoreCase("2")
									&& labNObj.getAgeIn().equalsIgnoreCase("3")) {

									//double ageB = BigDecimal.valueOf(ageP).doubleValue();
									double ageFLab = (labNObj.getFromAge()).doubleValue();
									double ageTOLab = (labNObj.getToAge()).doubleValue();

									if (ageB >= ageFLab && ageB <= ageTOLab) {
										bothCount++;
										testObj.setMethodename(lnMobj.getMethodName());
									testObj.setDefaultvalue(labNObj.getDefaultValue());
									testObj.setLowvalue(labNObj.getLowerValue());
									testObj.setHighvalue(labNObj.getUpperValue());
									testObj.setExpression(labNObj.getExpression());
									testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
									testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
									testObj.setUnitname(unitName);
									}
									//testObj.setUnitname(lnuObj.getUnitName());
									
								
								// fetch Data Day wise
							}

							// For Female Data
						}
							
							
							// for Checking In Both Start 
							    if(bothCount == 0) {
								// Fetch Year Wise Data
								
									
									if (labNObj.getSex().equalsIgnoreCase("4")
											&& labNObj.getAgeIn().equalsIgnoreCase("1")) {
										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*365;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*365;

										if (ageB >= ageFLab && ageB <= ageTOLab) {
										
											testObj.setMethodename(lnMobj.getMethodName());
											testObj.setDefaultvalue(labNObj.getDefaultValue());
											testObj.setLowvalue(labNObj.getLowerValue());
											testObj.setHighvalue(labNObj.getUpperValue());
											testObj.setExpression(labNObj.getExpression());
											testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
											testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										//	testObj.setUnitname(lnuObj.getUnitName());

											testObj.setUnitname(unitName);

										}

									}
									// Fetch Data Month Wise
									else if (labNObj.getSex().equalsIgnoreCase("4")
												&& labNObj.getAgeIn().equalsIgnoreCase("2")) {

								
									//	double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										ageFLab=ageFLab*30;
										double ageTOLab = (labNObj.getToAge()).doubleValue();
										ageTOLab=ageTOLab*30;
										
										if (ageB >= ageFLab && ageB <= ageTOLab) {
										
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										
										
									
									// fetch Data Day wise
								} else if (labNObj.getSex().equalsIgnoreCase("4")
										&& labNObj.getAgeIn().equalsIgnoreCase("3")) {

										//double ageB = BigDecimal.valueOf(ageP).doubleValue();
										double ageFLab = (labNObj.getFromAge()).doubleValue();
										double ageTOLab = (labNObj.getToAge()).doubleValue();

										if (ageB >= ageFLab && ageB <= ageTOLab) {
											
											testObj.setMethodename(lnMobj.getMethodName());
										testObj.setDefaultvalue(labNObj.getDefaultValue());
										testObj.setLowvalue(labNObj.getLowerValue());
										testObj.setHighvalue(labNObj.getUpperValue());
										testObj.setExpression(labNObj.getExpression());
										testObj.setTestInterpretation(labNObj.getInterpretationWithNormal());
										testObj.setBiologicalReferenceWithNormal(labNObj.getBiologicalReferenceWithNormal());
										testObj.setUnitname(unitName);
										}
										//testObj.setUnitname(lnuObj.getUnitName());
										
									
									// fetch Data Day wise
								}

								// For Female Data
							}
							// ENd For Both
							
							

						
						}
						// for general test
						       String sqlType= " select ifnull(valueType,'') as valueType from pathology_lab_test where idTest="+testId+"  ";
					    String testType=(String) sessionfactory.getCurrentSession().createSQLQuery(sqlType).uniqueResult();
					       if(testType.equalsIgnoreCase("general")) {
					    	 //  String biological_reference_chkSql= " select ifnull(biological_reference_chk,'N') as biological_reference_chk from pathology_lab_test where idTest="+testId+"  ";
					    	  // String biological_reference_chk=(String) sessionfactory.getCurrentSession().createSQLQuery(biological_reference_chkSql).uniqueResult();
					    	  
					    	   String biologicalreferencewith_generalSql= " select ifnull(biologicalreferencewith_general,'') as biologicalreferencewith_general from pathology_lab_test where idTest="+testId+"  ";
					    	   String biologicalreferencewith_general=(String) sessionfactory.getCurrentSession().createSQLQuery(biologicalreferencewith_generalSql).uniqueResult();
					      
					    	   testObj.setBiologicalReferenceWithGeneral(biologicalreferencewith_general);
					       }
						         
						       // end general test
						
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		   System.out.println("testObj========"+testObj);
						
						return testObj;
					
	}

  public int calculateDays(String dobP) {
	  int ageInDays=0;
	  try {
	  int year=0;
	  int month=0;
	  int days=0;
	  if(dobP.contains("-")) {
		  String pAge[]=dobP.split("-");
		  days = Integer.parseInt(pAge[0]);
		  month = Integer.parseInt(pAge[1]);
		  year = Integer.parseInt(pAge[2]);
	  }else if(dobP.contains("/")) {
		  String pAge[]=dobP.split("/");
		  days = Integer.parseInt(pAge[0]);
		  month = Integer.parseInt(pAge[1]);
		  year = Integer.parseInt(pAge[2]);
	  }
	  
	  LocalDate dob = LocalDate.of(year, month, days);  
	//obtains the current date from the system clock  
	LocalDate curDate = LocalDate.now();  
	//calculates the difference betwween two dates  
	Period period = Period.between(dob, curDate);  
	
	
	  ageInDays=period.getYears()*365+period.getMonths()*30+period.getDays();
	  }catch (Exception e) {
		e.printStackTrace();
	}
	  return ageInDays;
  
  }

@Override
public int convertReportingToAutorization(String idList, String statusFlag, HttpServletRequest request) {

	int res=0;
	try {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		Integer userId = (Integer) session.getAttribute("userId1");
		
				List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				for(int i = 0; i < myList.size(); i++) {
					   numbers.add(Integer.parseInt(myList.get(i)));   
					}					
			    String sql1 = "UPDATE PathologySampleWiseMaster set  teststatus =:teststatus where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
			    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", 5);
				query.executeUpdate();					
				res=1;  			
	
	} catch (Exception e) {
		e.printStackTrace();
		return res;
	}
	return res;
}

	
}