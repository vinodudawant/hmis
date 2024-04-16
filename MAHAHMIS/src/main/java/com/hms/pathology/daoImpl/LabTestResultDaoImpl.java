package com.hms.pathology.daoImpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.LabPhlebotomyMaster;
import com.hms.ehat.dto.LabResultMstViewDto;
import com.hms.pathology.dao.LabTestResultDao;

@Repository
public class LabTestResultDaoImpl implements LabTestResultDao {
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public LabResultMstViewDto getAllCurrentLabTestResult(String patienTtype,String callFrom,HttpServletRequest request) {
		
		String sql="";
		int departmentId=0;
		String currentStatus="";
		LabResultMstViewDto labResultPatRecord=new LabResultMstViewDto();
		List<LabResultMstViewDto> labPatRecordlist = new ArrayList<LabResultMstViewDto>();
		if(patienTtype.equalsIgnoreCase("onload")){
			currentStatus=callFrom;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id, elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date, elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N') GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC LIMIT 0,10";
		}else if(patienTtype.equalsIgnoreCase("opd")){
			currentStatus=callFrom;
			departmentId = 1;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC LIMIT 0,10";
		}else if(patienTtype.equalsIgnoreCase("ipd")){
			currentStatus=callFrom;
			departmentId = 2;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC LIMIT 0,10";
		}else if(patienTtype.equalsIgnoreCase("diagnosis")){
			currentStatus=callFrom;
			departmentId = 3;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC LIMIT 0,10";
		}
				
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list=query.list();
		for(Map<String, Object> row : list){
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
			String tid=(String) row.get("test_id");
			String array[] =  tid.split(",");
			obj.setTestid(array);
			
			String rate=(String) row.get("rate");
			String array1[] =  rate.split(",");
			obj.setRate(array1);	
			labPatRecordlist.add(obj);
		}
		labResultPatRecord.setListLabResultMstViewDto(labPatRecordlist);
		return labResultPatRecord;
	}

	@Override
	public String getPageCount(String patienTtype, String callFrom) {
		String sql="";
		int departmentId=0;
		String currentStatus="";
		/*
		if(patienTtype.equalsIgnoreCase("onload")){
			currentStatus=callFrom;
			 sql="SELECT  count(lab_request_id) as count FROM  ehat_lab_request where  test_status='"+currentStatus+"' AND out_flag='N' AND dept_id='"+departmentId+"'";

		}else if(patienTtype.equalsIgnoreCase("opd")){
			currentStatus=callFrom;
			departmentId = 1;
			sql="SELECT  count(lab_request_id) as count FROM  ehat_lab_request where  test_status='"+currentStatus+"' AND out_flag='N' AND dept_id='"+departmentId+"'";

			
		}else if(patienTtype.equalsIgnoreCase("ipd")){
			currentStatus=callFrom;
			departmentId = 2;
			sql="SELECT  count(lab_request_id) as count FROM  ehat_lab_request where  test_status='"+currentStatus+"' AND out_flag='N' AND dept_id='"+departmentId+"'";

			
		}else if(patienTtype.equalsIgnoreCase("diagnosis")){
			currentStatus=callFrom;
			departmentId = 3;
			sql="SELECT  count(lab_request_id) as count FROM  ehat_lab_request where  test_status='"+currentStatus+"' AND out_flag='N' AND dept_id='"+departmentId+"'";

		}
		*/
		
		if(patienTtype.equalsIgnoreCase("onload")){
			currentStatus=callFrom;
			 sql="SELECT count(elr.lab_request_id) as count FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N') GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id";
		}else if(patienTtype.equalsIgnoreCase("opd")){
			currentStatus=callFrom;
			departmentId = 1;
			 sql="SELECT count(elr.lab_request_id) as count FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id";
		}else if(patienTtype.equalsIgnoreCase("ipd")){
			currentStatus=callFrom;
			departmentId = 2;
			 sql="SELECT count(elr.lab_request_id) as count FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id";
		}else if(patienTtype.equalsIgnoreCase("diagnosis")){
			currentStatus=callFrom;
			departmentId = 3;
			 sql="SELECT  count(elr.lab_request_id) as count FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id";
		}
		
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		String count = (Integer.toString(query.list().size()));
		//BigInteger count = (BigInteger) query.uniqueResult();
		return count.toString();
	}

	@Override
	public LabResultMstViewDto getAllRecordsforPagination(Integer startIndex, String patientType, String callFrom) {
		String sql="";
		int departmentId=0;
		String currentStatus="";
		LabResultMstViewDto labResultPatRecord=new LabResultMstViewDto();
		List<LabResultMstViewDto> labPatRecordlist = new ArrayList<LabResultMstViewDto>();
		if(patientType.equalsIgnoreCase("onload")){
			currentStatus=callFrom;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id, elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date, elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N') GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC";
		}else if(patientType.equalsIgnoreCase("opd")){
			currentStatus=callFrom;
			departmentId = 1;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC";
		}else if(patientType.equalsIgnoreCase("ipd")){
			currentStatus=callFrom;
			departmentId = 2;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC";
		}else if(patientType.equalsIgnoreCase("diagnosis")){
			currentStatus=callFrom;
			departmentId = 3;
			 sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id DESC";
		}
		
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 query.setFirstResult(startIndex);
				 query.setMaxResults(10);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list=query.list();
		for(Map<String, Object> row : list){
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
			String tid=(String) row.get("test_id");
			String array[] =  tid.split(",");
			obj.setTestid(array);
			
			String rate=(String) row.get("rate");
			String array1[] =  rate.split(",");
			obj.setRate(array1);	
			labPatRecordlist.add(obj);
		}
		labResultPatRecord.setListLabResultMstViewDto(labPatRecordlist);
		return labResultPatRecord;
	}

	@Override
	public LabResultMstViewDto searchLabTestResult(String searchText, String patientType, String callFrom,
			String callFromTab, String searchBy, String fromDate, String toDate) {

		String sql = null;
		int departmentId=0;
		String currentStatus="";
		LabResultMstViewDto labResultPatRecord=new LabResultMstViewDto();
		List<LabResultMstViewDto> labPatRecordlist = new ArrayList<LabResultMstViewDto>();
		
		if(callFromTab.equalsIgnoreCase("C")) {
			if(callFrom.equalsIgnoreCase("autoSugg")) {
				if(patientType.equalsIgnoreCase("opd")){
					currentStatus=callFromTab;
					departmentId = 1;
					sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND CONCAT(ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id";
				}else if(patientType.equalsIgnoreCase("ipd")){
					currentStatus=callFromTab;
					departmentId = 2;
					sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND CONCAT(ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id";
				}else if(patientType.equalsIgnoreCase("diagnosis")){
					currentStatus=callFromTab;
					departmentId = 3;
					sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND CONCAT(ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id";
				}else {
					currentStatus=callFromTab;
					sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id, elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date, elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND CONCAT(ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%') GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id";
				}
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				if(searchBy.equalsIgnoreCase("id")) {
					if(patientType.equalsIgnoreCase("opd")){
						currentStatus=callFromTab;
						departmentId = 1;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND ep.patient_id = '"+searchText+"' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id";
					}else if(patientType.equalsIgnoreCase("ipd")){
						currentStatus=callFromTab;
						departmentId = 2;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND ep.patient_id = '"+searchText+"' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id";
					}else if(patientType.equalsIgnoreCase("diagnosis")){
						currentStatus=callFromTab;
						departmentId = 3;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND ep.patient_id = '"+searchText+"' AND department_id='"+departmentId+"' ) GROUP BY elr.lab_request_id";
					}else {
						currentStatus=callFromTab;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id, elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date, elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND ep.patient_id = '"+searchText+"') GROUP BY elr.lab_request_id ORDER BY elr.lab_request_id";
					}
				}else if(searchBy.equalsIgnoreCase("date")) {
					SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
					SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
					
					String fDate = "";
					String tDate = "";
					try {
						Date date1 = inSDF.parse(fromDate);
						fDate = outSDF.format(date1);
						Date date2 = inSDF.parse(toDate);
			            tDate = outSDF.format(date2);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					
					if(patientType.equalsIgnoreCase("opd")){
						currentStatus=callFromTab;
						departmentId = 1;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND SUBSTR(elr.inserted_datetime, 1, 10) >= '"+fDate+"' AND SUBSTR(elr.inserted_datetime, 1, 10) < '"+tDate+"' AND department_id='"+departmentId+"') GROUP BY elr.lab_request_id";
					}else if(patientType.equalsIgnoreCase("ipd")){
						currentStatus=callFromTab;
						departmentId = 2;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND SUBSTR(elr.inserted_datetime, 1, 10) >= '"+fDate+"' AND SUBSTR(elr.inserted_datetime, 1, 10) < '"+tDate+"' AND department_id='"+departmentId+"') GROUP BY elr.lab_request_id";
					}else if(patientType.equalsIgnoreCase("diagnosis")){
						currentStatus=callFromTab;
						departmentId = 3;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id,elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date,elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND SUBSTR(elr.inserted_datetime, 1, 10) >= '"+fDate+"' AND SUBSTR(elr.inserted_datetime, 1, 10) < '"+tDate+"' AND department_id='"+departmentId+"') GROUP BY elr.lab_request_id";
					}else {
						currentStatus=callFromTab;
						sql="SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id, elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date, elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+currentStatus+"' AND out_flag='N' AND SUBSTR(elr.inserted_datetime, 1, 10) >= '"+fDate+"' AND SUBSTR(elr.inserted_datetime, 1, 10) < '"+tDate+"') GROUP BY elr.lab_request_id";
					}
				}
			}
		}
		
		if(sql != null) {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 		 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 		 query.setMaxResults(20);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
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
				String tid=(String) row.get("test_id");
				String array[] =  tid.split(",");
				obj.setTestid(array);
				String rate=(String) row.get("rate");
				String array1[] =  rate.split(",");
				obj.setRate(array1);	
				labPatRecordlist.add(obj);
			}
		}
		labResultPatRecord.setListLabResultMstViewDto(labPatRecordlist);
		return labResultPatRecord;
	}

	@Override
	public LabResultMstViewDto getLabTestResultById(Integer patientId, String callFromTab) {
		LabResultMstViewDto labResultPatRecord=new LabResultMstViewDto();
		List<LabResultMstViewDto> labPatRecordlist = new ArrayList<LabResultMstViewDto>();
		
		String sql = "SELECT  ep.patient_id AS patient_id,SUBSTR(elr.inserted_datetime, 1, 10) AS assign_date,SUBSTR(elr.inserted_datetime, 12) AS assign_time, CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) AS patient_name,CONCAT(ep.age,'Y/',ep.age_months,'M/',ep.age_days,'D') AS patient_age,ep.gender AS gender,ep.address AS address, GROUP_CONCAT(DISTINCT es.category_name SEPARATOR ',') AS test, GROUP_CONCAT(DISTINCT es.id SEPARATOR ',') AS test_id,GROUP_CONCAT(es.charges SEPARATOR ',') AS rate,etr.treatment_id AS treatment_id,etr.department_id AS department_id,etr.t_flag AS t_flag,elrs.lab_request_id AS labrequest_id, elrs.service_id AS service_id,GROUP_CONCAT(DISTINCT elrs.ref_doc_id SEPARATOR ',') AS refdoc_id,GROUP_CONCAT(DISTINCT dct.doc_name SEPARATOR ',') AS refdoc_name,SUBSTR(elr.report_due_datetime,1,10) AS reportdue_date, elr.test_status AS test_status,elr.unit_id AS unit_id,elr.out_flag AS out_flag FROM(((((ehat_patient ep JOIN ehat_lab_request elr)JOIN ehat_lab_request_slave elrs) JOIN ehat_treatment etr) JOIN ehat_subservice es) LEFT JOIN doctor dct ON ((dct.Doctor_ID = elrs.ref_doc_id)))WHERE ((elr.lab_request_id = elrs.lab_request_id) AND IF((elrs.is_package_flag = 'N'),(elrs.sub_service_id = es.id),(elrs.package_id = es.id)) AND (etr.treatment_id = elr.treatment_id) AND (ep.patient_id = elr.patient_id) AND (elrs.deleted_flag = 'N') AND test_status='"+callFromTab+"' AND out_flag='N' AND ep.patient_id = '"+patientId+"') GROUP BY elr.lab_request_id";
		
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> list=query.list();
		for(Map<String, Object> row : list){
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
			String tid=(String) row.get("test_id");
			String array[] =  tid.split(",");
			obj.setTestid(array);
			
			String rate=(String) row.get("rate");
			String array1[] =  rate.split(",");
			obj.setRate(array1);	
			labPatRecordlist.add(obj);
		}
		labResultPatRecord.setListLabResultMstViewDto(labPatRecordlist);
		return labResultPatRecord;
	}


	@Override
	public LabPhlebotomyMaster searchProcessAreaResult(String searchText, String patientType, String callFrom,
			String callFromTab, String searchBy, String fromDate, String toDate) {

		String sql = null;
		int departmentId=0;
		String currentStatus="";
		LabPhlebotomyMaster masterObj=new LabPhlebotomyMaster();
		List<LabPhlebotomyMaster> ltsample = new ArrayList<LabPhlebotomyMaster>();
		
		if(callFromTab.equalsIgnoreCase("P")) {
			if(callFrom.equalsIgnoreCase("autoSugg")) {
				if(patientType.equalsIgnoreCase("opd")){
					departmentId = 1;
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
				}else if(patientType.equalsIgnoreCase("ipd")){
					departmentId = 2;
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
				}else if(patientType.equalsIgnoreCase("diagnosis")){
					departmentId = 3;
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
				}else {
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"'";
				}
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				if(searchBy.equalsIgnoreCase("id")) {
					if(patientType.equalsIgnoreCase("opd")){
						currentStatus=callFromTab;
						departmentId = 1;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("ipd")){
						currentStatus=callFromTab;
						departmentId = 2;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("diagnosis")){
						currentStatus=callFromTab;
						departmentId = 3;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where  p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
					}else {
						currentStatus=callFromTab;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"'";
					}
				}else if(searchBy.equalsIgnoreCase("date")) {
					SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
					SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
					
					String fDate = "";
					String tDate = "";
					try {
						Date date1 = inSDF.parse(fromDate);
						fDate = outSDF.format(date1);
						Date date2 = inSDF.parse(toDate);
			            tDate = outSDF.format(date2);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					
					if(patientType.equalsIgnoreCase("opd")){
						currentStatus=callFromTab;
						departmentId = 1;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("ipd")){
						currentStatus=callFromTab;
						departmentId = 2;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("diagnosis")){
						currentStatus=callFromTab;
						departmentId = 3;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"' AND et.department_id='"+departmentId+"'";
					}else {
						currentStatus=callFromTab;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"'";
					}
				}
			}
		}else if(callFromTab.equalsIgnoreCase("U")) {
			if(callFrom.equalsIgnoreCase("autoSugg")) {
				sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"'";
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				if(searchBy.equalsIgnoreCase("id")) {
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"'";
				}else if(searchBy.equalsIgnoreCase("date")) {
					SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
					SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
					
					String fDate = "";
					String tDate = "";
					try {
						Date date1 = inSDF.parse(fromDate);
						fDate = outSDF.format(date1);
						Date date2 = inSDF.parse(toDate);
			            tDate = outSDF.format(date2);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"'";
				}
			}
			
		}else if(callFromTab.equalsIgnoreCase("A")) {
			if(callFrom.equalsIgnoreCase("autoSugg")) {
				if(patientType.equalsIgnoreCase("opd")){
					departmentId = 1;
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
				}else if(patientType.equalsIgnoreCase("ipd")){
					departmentId = 2;
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
				}else if(patientType.equalsIgnoreCase("diagnosis")){
					departmentId = 3;
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
				}else {
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"'";
				}
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				if(searchBy.equalsIgnoreCase("id")) {
					if(patientType.equalsIgnoreCase("opd")){
						currentStatus=callFromTab;
						departmentId = 1;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("ipd")){
						currentStatus=callFromTab;
						departmentId = 2;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("diagnosis")){
						currentStatus=callFromTab;
						departmentId = 3;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
					}else {
						currentStatus=callFromTab;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"'";
					}
				}else if(searchBy.equalsIgnoreCase("date")) {
					SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
					SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
					
					String fDate = "";
					String tDate = "";
					try {
						Date date1 = inSDF.parse(fromDate);
						fDate = outSDF.format(date1);
						Date date2 = inSDF.parse(toDate);
			            tDate = outSDF.format(date2);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					
					if(patientType.equalsIgnoreCase("opd")){
						currentStatus=callFromTab;
						departmentId = 1;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("ipd")){
						currentStatus=callFromTab;
						departmentId = 2;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
					}else if(patientType.equalsIgnoreCase("diagnosis")){
						currentStatus=callFromTab;
						departmentId = 3;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"' AND department_id='"+departmentId+"'";
					}else {
						currentStatus=callFromTab;
						sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"'";
					}
				}
			}
		}else if(callFromTab.equalsIgnoreCase("H")) {
			if(callFrom.equalsIgnoreCase("autoSugg")) {
				sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"'";
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				if(searchBy.equalsIgnoreCase("id")) {
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"'";
				}else if(searchBy.equalsIgnoreCase("date")) {
					SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
					SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
					
					String fDate = "";
					String tDate = "";
					try {
						Date date1 = inSDF.parse(fromDate);
						fDate = outSDF.format(date1);
						Date date2 = inSDF.parse(toDate);
			            tDate = outSDF.format(date2);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"'AND pp.test_status='"+callFromTab+"'";
				}
			}
		}else if(callFromTab.equalsIgnoreCase("R")) {
			if(callFrom.equalsIgnoreCase("autoSugg")) {
				sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"'";
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				if(searchBy.equalsIgnoreCase("id")) {
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"'";
				}else if(searchBy.equalsIgnoreCase("date")) {
					SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
					SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
					
					String fDate = "";
					String tDate = "";
					try {
						Date date1 = inSDF.parse(fromDate);
						fDate = outSDF.format(date1);
						Date date2 = inSDF.parse(toDate);
			            tDate = outSDF.format(date2);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"'";
				}
			}
		}else if(callFromTab.equalsIgnoreCase("PR")) {
			if(callFrom.equalsIgnoreCase("autoSugg")) {
				sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) LIKE '%"+searchText+"%' AND pp.test_status='"+callFromTab+"'";
			}else if(callFrom.equalsIgnoreCase("searchBtn")) {
				if(searchBy.equalsIgnoreCase("id")) {
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+searchText+"' AND pp.test_status='"+callFromTab+"'";
				}else if(searchBy.equalsIgnoreCase("date")) {
					SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
					SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
					
					String fDate = "";
					String tDate = "";
					try {
						Date date1 = inSDF.parse(fromDate);
						fDate = outSDF.format(date1);
						Date date2 = inSDF.parse(toDate);
			            tDate = outSDF.format(date2);
					} catch (ParseException e) {
						e.printStackTrace();
					}
					sql="SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where SUBSTR(pp.created_date_time, 1, 10) >= '"+fDate+"' AND SUBSTR(pp.created_date_time, 1, 10) < '"+tDate+"' AND pp.test_status='"+callFromTab+"'";
				}
			}
		}
		
		if(sql != null) {
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = query.list();
			for (Map<String, Object> rs : listsubservice2) {
				LabPhlebotomyMaster objphlebotomy = new LabPhlebotomyMaster();
				objphlebotomy.setPatientname((String) rs.get("patientname"));
				objphlebotomy.setPatientId((Integer) rs.get("patient_id"));
				objphlebotomy.setId((Integer) rs.get("phlebotomy_master_id"));		
				objphlebotomy.setCollectionDate((String) rs.get("collection_date"));			
				objphlebotomy.setCollectionTime((String) rs.get("collection_time"));
				objphlebotomy.setCollectionname((String) rs.get("center_name"));
				objphlebotomy.setSamplename((String) rs.get("sample_name"));
				objphlebotomy.setContainername((String) rs.get("conatiner_name"));
				objphlebotomy.setTreatmentId((Integer) rs.get("treatment_id"));
				objphlebotomy.setLabrequestId((Integer) rs.get("labrequest_id"));	
				objphlebotomy.setSampleQuantity((String) rs.get("sample_quantity"));
				objphlebotomy.setTeststatus((String) rs.get("test_status"));
				objphlebotomy.setAccpetedflag((String) rs.get("accpeted_flag"));
				objphlebotomy.setDepartmentId((Integer) rs.get("department_id"));
				ltsample.add(objphlebotomy);
			}
			masterObj.setPhlebotomytableList(ltsample);
		}
		return masterObj;
	}

	@Override
	public LabPhlebotomyMaster getProcessAreaResultById(Integer patientId, String callFromTab) {
		LabPhlebotomyMaster masterObj = new LabPhlebotomyMaster();
		List<LabPhlebotomyMaster> labPatRecordlist = new ArrayList<LabPhlebotomyMaster>();
		String sql = "";
		
		if(callFromTab.equalsIgnoreCase("P")) {
			sql = "SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+patientId+"' AND pp.test_status='"+callFromTab+"'";
		}else if(callFromTab.equalsIgnoreCase("U")) {
			sql = "SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+patientId+"' AND pp.test_status='"+callFromTab+"'";
		}else if(callFromTab.equalsIgnoreCase("A")) {
			sql = "SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+patientId+"' AND pp.test_status='"+callFromTab+"'";
		}else if(callFromTab.equalsIgnoreCase("H")) {
			sql = "SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+patientId+"' AND pp.test_status='"+callFromTab+"'";
		}else if(callFromTab.equalsIgnoreCase("R")) {
			sql = "SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+patientId+"' AND pp.test_status='"+callFromTab+"'";
		}else if(callFromTab.equalsIgnoreCase("PR")) {
			sql = "SELECT concat(ifnull(p.f_name,''), ' ', ifnull(p.m_name,''), ' ', ifnull(p.l_name,'')) as patientname,et.department_id, p.patient_id, pp.phlebotomy_master_id,pp.collection_date, pp.collection_time,c.center_name,  ps.sample_name,pp.sample_quantity,pc.conatiner_name, pp.labrequest_id, pp.treatment_id,pp.accpeted_flag,pp.test_status from  pathology_lab_phlebotomymaster pp inner join pathology_collection_center_master c on c.id =pp.center_id inner join pathology_labsample ps on ps.id=pp.sample_id inner join pathology_labunittype pu on pu.id=pp.sample_UnitId inner join pathology_samplecontainer pc on pc.id=pp.container_id inner join ehat_patient p on p.patient_id=pp.patient_id  JOIN ehat_treatment et ON pp.treatment_id=et.treatment_id where p.patient_id = '"+patientId+"' AND pp.test_status='"+callFromTab+"'";
		}
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listsubservice2 = query.list();
		for (Map<String, Object> rs : listsubservice2) {
			LabPhlebotomyMaster objphlebotomy = new LabPhlebotomyMaster();
			objphlebotomy.setPatientname((String) rs.get("patientname"));
			objphlebotomy.setPatientId((Integer) rs.get("patient_id"));
			objphlebotomy.setId((Integer) rs.get("phlebotomy_master_id"));				
			objphlebotomy.setCollectionDate((String) rs.get("collection_date"));				
			objphlebotomy.setCollectionTime((String) rs.get("collection_time"));
			objphlebotomy.setCollectionname((String) rs.get("center_name"));
			objphlebotomy.setSamplename((String) rs.get("sample_name"));
			objphlebotomy.setContainername((String) rs.get("conatiner_name"));
			objphlebotomy.setTreatmentId((Integer) rs.get("treatment_id"));
			objphlebotomy.setLabrequestId((Integer) rs.get("labrequest_id"));	
			objphlebotomy.setSampleQuantity((String) rs.get("sample_quantity"));
			objphlebotomy.setTeststatus((String) rs.get("test_status"));
			objphlebotomy.setAccpetedflag((String) rs.get("accpeted_flag"));
			objphlebotomy.setDepartmentId((Integer) rs.get("department_id"));
			labPatRecordlist.add(objphlebotomy);
		}
		masterObj.setPhlebotomytableList(labPatRecordlist);
		return masterObj;
	}
}