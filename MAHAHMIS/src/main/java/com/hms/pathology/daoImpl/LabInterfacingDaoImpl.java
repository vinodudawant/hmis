package com.hms.pathology.daoImpl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;


import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import com.hms.ehat.dto.LabSampleMasterDto;
import com.hms.ehat.dto.Tests;
import com.hms.pathology.dao.LabInterfacingDao;

@Repository
public class LabInterfacingDaoImpl implements LabInterfacingDao {

	@Autowired
	SessionFactory sessionfactory;
	
	@Override
	public Object getTestDetailsFromSampleId(Integer sampleId) {
		String sql="";
		LabSampleMasterDto masterObj = new LabSampleMasterDto();
		List<Tests> lstTests = new ArrayList<Tests>();
		String testDetails = new String();
		try {
		    sql = "select count(*) from pathology_lab_phlebotomymaster where phlebotomy_master_id ="+sampleId;
			Query labCountQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);		
			int sampleCount = ((Number) labCountQuery.uniqueResult()).intValue();	
			if(sampleCount > 0){
			sql = " select concat(p.prefix,' ',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,t.created_date_time AS adminssion_date,t.opdipdno AS visit_no FROM pathology_lab_phlebotomymaster l  LEFT JOIN ehat_patient p ON (l.patient_id = p.patient_id)LEFT JOIN ehat_treatment t ON (l.treatment_id = t.treatment_id) WHERE l.phlebotomy_master_id="+sampleId;
			Query mastQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);
			mastQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> listMst = mastQuery.list();
			for(Map<String, Object> row : listMst){
					
				//masterObj.setSampleID(sampleId);
				masterObj.setPatientName((String)row.get("patient_name"));		
				//masterObj.setVisitNo((String)row.get("visit_no"));
				masterObj.setRegnDateTime(String.valueOf((Date)row.get("adminssion_date")));
			}
			
			sql="SELECT DISTINCT IF(es.package_id != 0,es.package_id,'0') AS package_id,IF(es.package_id != 0,'0',es.profile_Id) AS profile_Id from  pathology_lab_phlebotomy_test_salve es where es.master_id="+sampleId;
			Query mastQuery1 = sessionfactory.getCurrentSession().createSQLQuery(sql);
			mastQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			List<Map<String, Object>> listMst1 = mastQuery1.list();
			for(Map<String, Object> row1 : listMst1){
				 String pkgId=(String) row1.get("package_id");		 
				 Integer packageId=Integer.parseInt(pkgId);
				 
				 String pro_Id=(String) row1.get("profile_Id");
				 Integer profile_Id=Integer.parseInt(pro_Id);
					if (packageId > 0) {					
							Query query1 = sessionfactory.getCurrentSession().createSQLQuery("CALL routineResultprofileNameAndTestId(0,:package_id,:master_id,0,0)");
							query1.setParameter("package_id", packageId);
							query1.setParameter("master_id", sampleId);
							@SuppressWarnings("unchecked")
							List<Object> lstResult = query1.list();
							for (int i = 0; i < lstResult.size(); i++) {
								Integer proId = (Integer) lstResult.get(i);
						
								SQLQuery querytestId = sessionfactory.getCurrentSession().createSQLQuery("select test_id as test_id from  pathology_lab_phlebotomy_test_salve where test_flag='Y' and master_id='"+ sampleId+ "' and profile_Id='"+ proId+ "' and package_id="+ packageId);
								querytestId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
								List<Map<String, Object>> listtest = querytestId.list();
								for (Map<String, Object> rs1 : listtest) {

										Integer testId = (Integer) rs1.get("test_id");
										Query querytest = sessionfactory.getCurrentSession().createSQLQuery("CALL routineResultprofileNameAndTestId(0,0,0,0,:idTest)");
										querytest.setParameter("idTest", testId);
										@SuppressWarnings("unchecked")
										List<Object> lsttest = querytest.list();
										for (int k = 0; k < lsttest.size(); k++) {																					
											
											Tests obj = new Tests();
											String Test = (String) lsttest.get(k);
											String[] Testpro = Test.split(",");
											Integer TestId = Integer.parseInt(Testpro[0]);
											String Testname = Testpro[1];
											obj.setParameterID(TestId);
											obj.setTestName(Testname);
											lstTests.add(obj);

								}

							}

						}
					}else{
						
						SQLQuery querytestId = sessionfactory.getCurrentSession().createSQLQuery("select test_id as test_id,test_result from  pathology_lab_phlebotomy_test_salve where test_flag='Y' and master_id='"+sampleId+"' and profile_Id='"+profile_Id+"' and package_id="+packageId);     
						querytestId.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> listtest = querytestId.list();
						for (Map<String, Object> rs1 : listtest) {

								Integer testId = (Integer) rs1.get("test_id");
								Query querytest = sessionfactory.getCurrentSession().createSQLQuery("CALL routineResultprofileNameAndTestId(0,0,0,0,:idTest)");
								querytest.setParameter("idTest", testId);
								@SuppressWarnings("unchecked")
								List<Object> lsttest = querytest.list();
								for (int k = 0; k < lsttest.size(); k++) {																					
									
									Tests obj = new Tests();
									String Test = (String) lsttest.get(k);
									String[] Testpro = Test.split(",");
									Integer TestId = Integer.parseInt(Testpro[0]);
									String Testname = Testpro[1];
									obj.setParameterID(TestId);
									obj.setTestName(Testname);
									lstTests.add(obj);

							}

						}
					}
				}

				masterObj.setTests(lstTests);
				ObjectMapper mapper = new ObjectMapper();
				testDetails = mapper.writeValueAsString(masterObj);
			} else {

				testDetails = "Tests not found";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return testDetails;
	}

	@Override
	public boolean savemachinevalues(JSONArray jsonArray) {
		
		 Calendar calendar = Calendar.getInstance();
		 SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		 String todaysDate = formatter.format(calendar.getTime());
		 
		 String sql = "";
		 Boolean flag = false;
		 int updateStatus = 0;
		try {
			
			for(int j=0;j<jsonArray.size();j++){
				JSONObject jsonObject = (JSONObject) jsonArray.get(j);
				
				Long testId = (long) 0 ;
				String result = "0";
				String sampleId = (String) jsonObject.get("SampleId");
				JSONArray resultArray = (JSONArray) jsonObject.get("Results");

				for(int i = 0 ;i < resultArray.size() ; i++){
					 	JSONObject object=(JSONObject) resultArray.get(i);
						 testId= (Long)object.get("TestId");
						 result= (String)object.get("Result");
					 try{
						 
						 sql = "UPDATE pathology_lab_phlebotomy_test_salve SET test_result= '" + result + "'," +"updated_date_time='"+todaysDate+"'  WHERE test_id = " + testId +" and master_id = " +sampleId ;
						 SQLQuery sqlQuery1 = sessionfactory.getCurrentSession().createSQLQuery(sql);
						 updateStatus = sqlQuery1.executeUpdate();
						
					 }catch(Exception e){
							 flag = false ;
							 e.printStackTrace();
						 }
				 }	
				
				if(updateStatus>0){
					 flag = true ;
				 }else{
					 throw new Exception();
				 }
			}
			 		
		} catch (Exception e) {
			flag = false ;
			System.out.println("error");
			e.printStackTrace();
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
		}
		return flag;
	}

}
