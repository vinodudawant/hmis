package com.hms.histopath.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.histopath.dao.HistoPathDao;
import com.hms.histopath.dto.HistopathMaster;

@Repository
public class HistoPathDaoImpl implements HistoPathDao {
	static Logger log=Logger.getLogger(HistoPathDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<HistopathMaster> searchHistopathTestPatient(String custTypeId, String custNameId, String fromDate, String toDate,  String searchBy, Integer startIndex, String emergencyFlag,Integer patientType, String searchTypeby, Integer statuscodea, Integer statuscodeb, String callFrom, HttpServletRequest request) {

		List<HistopathMaster> list = new ArrayList<HistopathMaster>();
	
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");

			SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
			SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
			String fDate = "";
			String tDate = "";
			Date date1 = inSDF.parse(fromDate);
			fDate = outSDF.format(date1);
			Date date2 = inSDF.parse(toDate);
			tDate = outSDF.format(date2);
			String sql = "";
			if(custTypeId.equals("0") && custNameId.equals("0")) 
			{
				
				sql = "SELECT concat(rd.prefix,' ',rd.f_name,' ',rd.m_name,' ',rd.l_name) as pname,lp.profileName as testName,"
					+ "ifnull(CONCAT(cd.prefix, ' ', cd.docName),'-') AS refdocname,"
					+ "rd.created_date_time as regdate,"
					+ "rd.patient_id as patientId,"
					+ "rd.mobile as mobile,"
					+ "hm.bar_code as barcode,"
					+ "et.treatment_id AS treatmentId,"
					+ " et.emergency_flag AS emergencyflag,"
					+ "hm.customer_type AS custType,"
					+ "hm.customer_id AS custName,"
					+ "concat(hm.collection_date,'  ',hm.collection_time) as collectionDateTime,"
					+ "fn_get_unit_name("+unitId+") as unit_name,hm.treatment_id AS treatment_id,"
					+ "hm.id AS master_id,hm.test_status as test_status "
					+ "FROM "
					+ "histopath_master hm "
					+ "join "
					+ "ehat_patient rd on (hm.patient_id = rd.patient_id) "
					+ "JOIN"
			        + " ehat_treatment et ON (et.treatment_id = hm.treatment_id)"
					+ "join pathology_labprofile lp on(lp.id = hm.profile_id) "
					+ "left join "
					+ "chanelling_doctor cd on cd.channDocId = hm.reg_ref_doc_id "
					+ "where hm.deleted='N'  AND hm.unit_Id="+unitId+" AND (hm.test_status="+statuscodea+" OR hm.test_status="+statuscodeb+") AND substr(hm.created_date_time,1,10)>='"
					+ fDate
					+ "'AND substr(hm.created_date_time,1,10) <='"
					+ tDate + "' AND et.emergency_flag IN (?,?) ORDER BY hm.id DESC ";
			
			}
			else
			{
				
				sql = "SELECT concat(rd.prefix,' ',rd.f_name,' ',rd.m_name,' ',rd.l_name) as pname,lp.profileName as testName,"
					+ "ifnull(CONCAT(cd.prefix, ' ', cd.docName),'-') AS refdocname,"
					+ "rd.created_date_time as regdate,"
					+ "rd.patient_id as patientId,"
					+ "rd.mobile as mobile,"
					+ "hm.bar_code as barcode,"
					+ "et.treatment_id AS treatmentId,"
					+ " et.emergency_flag AS emergencyflag,"
					+ "hm.customer_type AS custType,"
					+ "hm.customer_id AS custName,"
					+ "concat(hm.collection_date,'  ',hm.collection_time) as collectionDateTime,"
					+ "fn_get_unit_name("+unitId+") as unit_name,hm.treatment_id AS treatment_id,"
					+ "hm.id AS master_id,hm.test_status as test_status "
					+ "FROM "
					+ "histopath_master hm "
					+ "join "
					+ "ehat_patient rd on (hm.patient_id = rd.patient_id) "
					+ "JOIN"
			        + " ehat_treatment et ON (et.treatment_id = hm.treatment_id)"
					+ "join pathology_labprofile lp on(lp.id = hm.profile_id) "
					+ "left join "
					+ "chanelling_doctor cd on cd.channDocId = hm.reg_ref_doc_id "
					+ "where hm.deleted='N'  AND hm.unit_Id="+unitId+" AND (hm.test_status="+statuscodea+" OR hm.test_status="+statuscodeb+") AND hm.customer_type="+custNameId+" AND hm.customer_id="+custTypeId+" AND substr(hm.created_date_time,1,10)>='"
					+ fDate
					+ "'AND substr(hm.created_date_time,1,10) <='"
					+ tDate + "' AND et.emergency_flag IN (?,?) ORDER BY hm.id DESC ";
			
			}
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setFirstResult(startIndex);
				query.setMaxResults(10);
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> list1 = query.list();

				for (Map<String, Object> row : list1) {

					HistopathMaster obj = new HistopathMaster();
					obj.setPatientname((String) row.get("pname"));
					obj.setCreateDate((Date) row.get("regdate"));
					obj.setProfileName((String) row.get("testName"));
					obj.setCustomerId((Integer) row.get("custType"));
					obj.setCustomerType((Integer) row.get("custName"));
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setBarCode((String) row.get("barcode"));
					obj.setMobile((String)row.get("mobile"));
					obj.setCollectionDate((String) row.get("collectionDateTime"));
					obj.setRefdocname((String) row.get("refdocname"));
					obj.setPatientId((Integer) row.get("patientId"));
					obj.setTreatmentId((Integer) row.get("treatment_id"));
					obj.setHistopathMasterId((Integer) row.get("master_id"));
					obj.setTeststatus((Integer) row.get("test_status"));
					obj.setUnitName((String) row.get("unit_name"));
					list.add(obj);
					
				}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	
	
	@Override
	public List<HistopathMaster> histoPathoPatientAutosuggestion(String searchText, String searchBy, String callFrom,
			String tabId, String emergencyFlag,Integer statuscodeA,Integer statuscodeB, HttpServletRequest request) {
		
			List<HistopathMaster> labPatRecordlist = new ArrayList<HistopathMaster>();		
			try {
				
				String sql="";
				HttpSession httpSession = request.getSession();
				Integer unitId = (Integer) httpSession.getAttribute("uId");
				String userType = (String) httpSession.getAttribute("userType");
				String userCustomerType= (String) httpSession.getAttribute("userCustomerType");
				String userCustomerId = (String) httpSession.getAttribute("userCustomerId");
				

				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
								
								sql = "SELECT concat(rd.prefix,' ',rd.f_name,' ',rd.m_name,' ',rd.l_name) as pname,lp.profileName as testName,"
										+ "ifnull(CONCAT(cd.prefix, ' ', cd.docName),'-') AS refdocname,"
										+ "rd.created_date_time as regdate,"
										+ "rd.patient_id as patientId,"
										+ "rd.mobile as mobile,"
										+ "hm.bar_code as barcode,"
										+ "et.treatment_id AS treatmentId,"
										+ "et.emergency_flag AS emergencyflag,"
										+ "concat(hm.collection_date,'  ',hm.collection_time) as collectionDateTime,"
										+ "fn_get_unit_name("+unitId+") as unit_name,hm.treatment_id AS treatment_id,"
										+ "hm.id AS master_id,hm.test_status as test_status "
										+ "FROM "
										+ "histopath_master hm "
										+ "join "
										+ "ehat_patient rd on (hm.patient_id = rd.patient_id) "
										+ "JOIN"
								        + " ehat_treatment et ON (et.treatment_id = hm.treatment_id)"
										+ "join pathology_labprofile lp on(lp.id = hm.profile_id) "
										+ "left join "
										+ "chanelling_doctor cd on cd.channDocId = hm.reg_ref_doc_id "
										+ "where hm.deleted='N' AND hm.unit_Id="+unitId+" AND (hm.test_status="+statuscodeA+" OR hm.test_status="+statuscodeB+") AND et.emergency_flag IN (?,?) GROUP BY hm.patient_id ";
								
									if(searchBy.equalsIgnoreCase("byName")) {
										sql =sql+ "AND concat(rd.prefix,' ',rd.f_name,' ',rd.m_name,' ',rd.l_name) LIKE '%"+searchText+"%' ";
									}else if(searchBy.equalsIgnoreCase("byId")) {
										sql =sql+ "AND rd.patient_id LIKE '%"+searchText+"%' ";
									}else if(searchBy.equalsIgnoreCase("byBarcode")) {
										sql =sql+ "AND hm.bar_code LIKE '%"+searchText+"%' ";
									}else if(searchBy.equalsIgnoreCase("byMobile")) {
										sql =sql+ "AND rd.mobile LIKE '%"+searchText+"%' ";
									}
									
							}
						
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.setMaxResults(10);
						if(emergencyFlag.equalsIgnoreCase("Y")) {
							query.setString(0, "Y");
							query.setString(1, "Y");
						}else if(emergencyFlag.equalsIgnoreCase("All")) {
							query.setString(0, "Y");
							query.setString(1, "N");
						}else {
							query.setString(0, "N");
							query.setString(1, "N");
						}
					
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list){
						HistopathMaster obj = new HistopathMaster();
						obj.setPatientname((String) row.get("pname"));
						obj.setCreateDate((Date) row.get("regdate"));
						obj.setProfileName((String) row.get("testName"));
						obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setBarCode((String) row.get("barcode"));
						obj.setMobile((String)row.get("mobile"));
						obj.setCollectionDate((String) row.get("collectionDateTime"));
						obj.setRefdocname((String) row.get("refdocname"));
						obj.setPatientId((Integer) row.get("patientId"));
						obj.setTreatmentId((Integer) row.get("treatment_id"));
						obj.setHistopathMasterId((Integer) row.get("master_id"));
						obj.setTeststatus((Integer) row.get("test_status"));
						obj.setUnitName((String) row.get("unit_name"));
							
						labPatRecordlist.add(obj);		
						
					}
					return labPatRecordlist;
				}catch (Exception e) {
					e.printStackTrace();
					log.error("histoPathoPatientAutosuggestion()...Error :"+e);
				}
				return labPatRecordlist;
			}



	@Override
	public HistopathMaster getHistopathResultById(Integer patientId, String callFromTab,HttpServletRequest request) {
		HistopathMaster labResultPatRecord=new HistopathMaster();
		List<HistopathMaster> labPatRecordlist = new ArrayList<HistopathMaster>();		
		HttpSession httpSession = request.getSession();
		Integer unitId = (Integer) httpSession.getAttribute("uId");
		try {
			String sql = "";
			sql = "SELECT concat(rd.prefix,' ',rd.f_name,' ',rd.m_name,' ',rd.l_name) as pname,lp.profileName as testName,"
					+ "ifnull(CONCAT(cd.prefix, ' ', cd.docName),'-') AS refdocname,"
					+ "rd.created_date_time as regdate,"
					+ "rd.patient_id as patientId,"
					+ "rd.mobile as mobile,"
					+ "hm.bar_code as barcode,"
					+ "et.treatment_id AS treatmentId,"
					+ " et.emergency_flag AS emergencyflag,"
					+ "concat(hm.collection_date,'  ',hm.collection_time) as collectionDateTime,"
					+ "fn_get_unit_name("
					+ unitId
					+ ") as unit_name,hm.treatment_id AS treatment_id,"
					+ "hm.id AS master_id,hm.test_status as test_status "
					+ "FROM "
					+ "histopath_master hm "
					+ "join "
					+ "ehat_patient rd on (hm.patient_id = rd.patient_id) "
					+ "JOIN"
			        + " ehat_treatment et ON (et.treatment_id = hm.treatment_id)"
					+ "join pathology_labprofile lp on(lp.id = hm.profile_id) "
					+ "left join "
					+ "chanelling_doctor cd on cd.channDocId = hm.reg_ref_doc_id "
					+ "where hm.deleted='N' AND hm.unit_Id="
					+ unitId
					+ "  AND hm.patient_id = '" + patientId + "' ";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				HistopathMaster obj = new HistopathMaster();
				obj.setPatientname((String) row.get("pname"));
				obj.setCreateDate((Date) row.get("regdate"));
				obj.setProfileName((String) row.get("testName"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setBarCode((String) row.get("barcode"));
				obj.setMobile((String) row.get("mobile"));
				obj.setCollectionDate((String) row.get("collectionDateTime"));
				obj.setRefdocname((String) row.get("refdocname"));
				obj.setPatientId((Integer) row.get("patientId"));
				obj.setTreatmentId((Integer) row.get("treatment_id"));
				obj.setHistopathMasterId((Integer) row.get("master_id"));
				obj.setTeststatus((Integer) row.get("test_status"));
				obj.setUnitName((String) row.get("unit_name"));
				labPatRecordlist.add(obj);

			}
			labResultPatRecord.setLstHistoPathol(labPatRecordlist);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return labResultPatRecord;
	
	}

	@Override
	public String getUpdateHistoStatus(Integer histopathMasterId,Integer statusCode,HttpServletRequest request) {

	try {
		
		HttpSession httpSession = request.getSession();
		Integer userId = (Integer) httpSession.getAttribute("userId1");
		HistopathMaster histopathMaster = (HistopathMaster) sessionFactory
				.getCurrentSession().get(HistopathMaster.class, histopathMasterId);
		
		histopathMaster.setTeststatus(statusCode);
		histopathMaster.setAcceptedDateTime((new Date(new java.util.Date().getTime())));		
		histopathMaster.setAcceptedby((userId));

		return "Accession Completed.";
	} catch (Exception e) {
		e.printStackTrace();
		System.err.println("ehatException:- Class Name :"
				+ e.getStackTrace()[0].getClassName() + " Method Name : "
				+ e.getStackTrace()[0].getMethodName() + " Line No :"
				+ e.getStackTrace()[0].getLineNumber());
		return "Network Issue!";
	}
	
}



	@Override
	public String getSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate,
			String searchBy, Integer startIndex, String emergencyFlag, Integer patientType, String searchTypeby,
			Integer statuscodea, Integer statuscodeb, String callFrom, HttpServletRequest request) {
		Integer count = 0;
		Session session = null;
		try {
		
		session = sessionFactory.getCurrentSession();
		HttpSession httpsession = request.getSession();
		Integer unitId = (Integer) httpsession.getAttribute("uId");
		String userType = (String) httpsession.getAttribute("userType");
		String userCustomerType = (String) httpsession.getAttribute("userCustomerType");
		String userCustomerId = (String) httpsession.getAttribute("userCustomerId");

		SimpleDateFormat inSDF = new SimpleDateFormat("mm/dd/yyyy");
		SimpleDateFormat outSDF = new SimpleDateFormat("yyyy-dd-mm");
		String fDate = "";
		String tDate = "";
		Date date1 = inSDF.parse(fromDate);
		fDate = outSDF.format(date1);
		Date date2 = inSDF.parse(toDate);
		tDate = outSDF.format(date2);
		String sql = "";
		if(custTypeId.equals("0") && custNameId.equals("0")) 
		{
			
			sql = "SELECT concat(rd.prefix,' ',rd.f_name,' ',rd.m_name,' ',rd.l_name) as pname,lp.profileName as testName,"
				+ "ifnull(CONCAT(cd.prefix, ' ', cd.docName),'-') AS refdocname,"
				+ "rd.created_date_time as regdate,"
				+ "rd.patient_id as patientId,"
				+ "rd.mobile as mobile,"
				+ "hm.bar_code as barcode,"
				+ "et.treatment_id AS treatmentId,"
				+ " et.emergency_flag AS emergencyflag,"
				+ "hm.customer_type AS custType,"
				+ "hm.customer_id AS custName,"
				+ "concat(hm.collection_date,'  ',hm.collection_time) as collectionDateTime,"
				+ "fn_get_unit_name("+unitId+") as unit_name,hm.treatment_id AS treatment_id,"
				+ "hm.id AS master_id,hm.test_status as test_status "
				+ "FROM "
				+ "histopath_master hm "
				+ "join "
				+ "ehat_patient rd on (hm.patient_id = rd.patient_id) "
				+ "JOIN"
		        + " ehat_treatment et ON (et.treatment_id = hm.treatment_id)"
				+ "join pathology_labprofile lp on(lp.id = hm.profile_id) "
				+ "left join "
				+ "chanelling_doctor cd on cd.channDocId = hm.reg_ref_doc_id "
				+ "where hm.deleted='N'  AND hm.unit_Id="+unitId+" AND (hm.test_status="+statuscodea+" OR hm.test_status="+statuscodeb+") AND substr(hm.created_date_time,1,10)>='"
				+ fDate
				+ "'AND substr(hm.created_date_time,1,10) <='"
				+ tDate + "' AND et.emergency_flag IN (?,?) ORDER BY hm.id DESC ";
		
		}
		else
		{
			
			sql = "SELECT concat(rd.prefix,' ',rd.f_name,' ',rd.m_name,' ',rd.l_name) as pname,lp.profileName as testName,"
				+ "ifnull(CONCAT(cd.prefix, ' ', cd.docName),'-') AS refdocname,"
				+ "rd.created_date_time as regdate,"
				+ "rd.patient_id as patientId,"
				+ "rd.mobile as mobile,"
				+ "hm.bar_code as barcode,"
				+ "et.treatment_id AS treatmentId,"
				+ " et.emergency_flag AS emergencyflag,"
				+ "hm.customer_type AS custType,"
				+ "hm.customer_id AS custName,"
				+ "concat(hm.collection_date,'  ',hm.collection_time) as collectionDateTime,"
				+ "fn_get_unit_name("+unitId+") as unit_name,hm.treatment_id AS treatment_id,"
				+ "hm.id AS master_id,hm.test_status as test_status "
				+ "FROM "
				+ "histopath_master hm "
				+ "join "
				+ "ehat_patient rd on (hm.patient_id = rd.patient_id) "
				+ "JOIN"
		        + " ehat_treatment et ON (et.treatment_id = hm.treatment_id)"
				+ "join pathology_labprofile lp on(lp.id = hm.profile_id) "
				+ "left join "
				+ "chanelling_doctor cd on cd.channDocId = hm.reg_ref_doc_id "
				+ "where hm.deleted='N'  AND hm.unit_Id="+unitId+" AND (hm.test_status="+statuscodea+" OR hm.test_status="+statuscodeb+") AND hm.customer_type="+custNameId+" AND hm.customer_id="+custTypeId+" AND substr(hm.created_date_time,1,10)>='"
				+ fDate
				+ "'AND substr(hm.created_date_time,1,10) <='"
				+ tDate + "' AND et.emergency_flag IN (?,?) ORDER BY hm.id DESC ";
		}
		SQLQuery query = session.createSQLQuery(sql);
		Integer todaysCount = 0;
		//if(callFrom.equalsIgnoreCase("processingSearchBtn")) {
			//todaysCount = getTodaysCount(userType,unitId,emergencyFlag);
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			count = (Integer) query.list().size();
			//return todaysCount.toString()+"/"+count.toString();
		
	count = (Integer) query.list().size();
	return count.toString();
}catch (Exception e) {
	e.printStackTrace();
	log.error("searchLabTestPatient()...Error"+e);
	}
		
		return count.toString();
		
	}	


}