package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.ehat.dao.LabFormulaDao;
import com.hms.ehat.dto.LabFormulaDTO;
import com.hms.ehat.dto.LabFormulaHeadings;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabProfileTestCompDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dto.LabTestDTO;

@Repository
public class LabFormulaDaoImpl implements LabFormulaDao {

	static Logger log=Logger.getLogger(LabFormulaDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public String saveLabFormula(LabFormulaDTO labFormulaDTO) {

		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();
			
			String expTestIdForm = "";

			String[] arrExpTestId = labFormulaDTO.getExpTestId().split(
					Pattern.quote("$"));

			for (int i = 0; i < arrExpTestId.length; i++) {

				if (i % 2 == 0) {

				} else {

					arrExpTestId[i] = "{" + arrExpTestId[i] + "}";
				}

				expTestIdForm = expTestIdForm + arrExpTestId[i];
			}
			
			labFormulaDTO.setExpTestId(expTestIdForm);
			
			if(labFormulaDTO.getIdlabFormula() == 0){
				LabTestDTO labTestDTO = (LabTestDTO) session.get(LabTestDTO.class, labFormulaDTO.getResultTestId());
				Query hqlQuery = session.createQuery("select count(*) from LabFormulaDTO where labTestDTO=:labTestDTO and formStatus=:formStatus");
					  hqlQuery.setParameter("labTestDTO", labTestDTO);
					  hqlQuery.setParameter("formStatus", "Y");
				Long count = (Long) hqlQuery.uniqueResult();
				if(count != null && count > 0){
					return "Formula already exists";
				}else{
					labFormulaDTO.setLabTestDTO(labTestDTO);
					session.merge(labFormulaDTO);
					
					return "Formula added successfully.";
				}
			}else{
				LabTestDTO labTestDTO = (LabTestDTO) session.get(LabTestDTO.class, labFormulaDTO.getResultTestId());
				
				String hqlQuery = "SELECT COUNT(*) FROM LabFormulaDTO WHERE idlabFormula NOT IN (:idlabFormula) AND labTestDTO =:labTestDTO AND formStatus =:formStatus";
				Query qry = session.createQuery(hqlQuery);
					  qry.setParameter("idlabFormula", labFormulaDTO.getIdlabFormula());
					  qry.setParameter("labTestDTO", labTestDTO);
					  qry.setParameter("formStatus", "Y");
					  
				Long rowCount = (Long) qry.uniqueResult();
				if(rowCount > 0)
					return "Formula already exists.";
				
				LabFormulaDTO formulaDTO = (LabFormulaDTO) session.get(LabFormulaDTO.class, labFormulaDTO.getIdlabFormula());
							  formulaDTO.setExpTestId(labFormulaDTO.getExpTestId());
							  formulaDTO.setLabTestDTO(labTestDTO);
							  formulaDTO.setUpdatedBy(labFormulaDTO.getCreatedBy());
							  
				session.merge(formulaDTO);
				return "Formula updated successfully.";
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("saveLabFormula()...Error :"+e);
		}
		return "Error";
	}
	
	@Override
	public LabFormulaDTO getLabFormulaById(int labFormulaId) {
		Session session = null;
		LabFormulaDTO obj = new LabFormulaDTO();
		try{
			session = sessionFactory.getCurrentSession();
			Query hqlQuery = session.createQuery("FROM LabFormulaDTO WHERE idlabFormula =:idlabFormula");
				  hqlQuery.setParameter("idlabFormula", labFormulaId);

				  obj = (LabFormulaDTO) hqlQuery.uniqueResult();
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			log.error("getLabFormulaById()...Error :"+e);
		}
		return obj;
	}

	@Override
	public boolean deleteLabFormula(int labFormulaId, Integer userId) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			Query query = session
					.createQuery("update LabFormulaDTO set deletedBy = :deletedBy, formStatus = :formStatus, deletedDate = :deletedDate where idlabFormula = :idlabFormula");
			query.setParameter("deletedBy", userId);
			query.setParameter("formStatus", "N");
			query.setParameter("deletedDate", new Date());
			query.setParameter("idlabFormula", labFormulaId);
			query.executeUpdate();

			return true;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("deleteLabFormula()...Error :"+e);
		}
		return false;
	}

	@Override
	public LabFormulaHeadings getLabFormulaHeadings(String type, HttpServletRequest request) {
		List<LabFormulaHeadings> arrLabheadings = new ArrayList<LabFormulaHeadings>();
		LabFormulaHeadings objLabheadings = new LabFormulaHeadings();

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
				LabFormulaHeadings objLabheads = new LabFormulaHeadings();

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
			log.error("getLabFormulaHeadings()...Error :"+e);
		}
		return objLabheadings;
	}

	@Override
	public LabFormulaHeadings featchLabFormulaPro(String isCategory, String idHed, String type,
			HttpServletRequest request) {

		List<LabFormulaHeadings> arrLabheadings = new ArrayList<LabFormulaHeadings>();
		LabFormulaHeadings objLabheadings = new LabFormulaHeadings();
		LabFormulaHeadings MainObj = new LabFormulaHeadings();
		List<LabProfileDTO> arrLabProfile = new ArrayList<LabProfileDTO>();
		
		ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
		String sid = (String)resourceBundleEhat.getString("labHeadingID");
		String pkgID = (String)resourceBundleEhat.getString("packageID");
		
		int packageID = Integer.parseInt(pkgID);
		int serviceId = Integer.parseInt(sid);
//		Integer[] series = {packageID,serviceId};//11,13
		String sql="";
		try{
			if(isCategory.equalsIgnoreCase("Y")){
				//if only Profile
				sql = "SELECT lp.* FROM ehat_subservice es,pathology_labprofile lp where lp.subservice_id=es.id and es.deleted = 'N' and lp.profileStatus='Y' and block='0' and es.service_id in ('"+serviceId+"','"+packageID+"') and es.selfid = "+idHed+"";
			}else{
				//if Only pkg.
				sql = "SELECT lp.* FROM ehat_configuration_services ecs,pathology_labprofile lp where ecs.service_id=lp.subservice_id  and lp.profileStatus='Y' and ecs.deleted = 'N' and ecs.master_id='"+serviceId+"' and ecs.is_com_servId='"+packageID+"' and ecs.is_com_servlastId ='"+idHed+"'";
			}
			
			Query query=sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listProList = query.list();
			
			for (Map<String, Object> rs : listProList) {
				LabProfileDTO objLabProfile = new LabProfileDTO();

				int porId = (Integer) rs.get("id");
				//get test under profile.
				List<LabProfileTestCompDTO> labProTstCmpList=featchLabProTestCompDataNew(porId);
				if(labProTstCmpList.size()>1){
					
					objLabProfile.setLabProfileTestCompDTO(labProTstCmpList);
					
					objLabProfile.setIdprofile((Integer) rs.get("id"));
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
			log.error("featchLabFormulaPro()...Error :"+e);
		}
		MainObj.setLabheadingsList(arrLabheadings);
		return MainObj;
	}
	
	private List<LabProfileTestCompDTO> featchLabProTestCompDataNew(int porId) {

		List<LabProfileTestCompDTO> arrLabProfileTestComp = new ArrayList<LabProfileTestCompDTO>();

		try{
			String sql = "SELECT * FROM pathology_labprofiletestcomp where idprofile ='"+porId+"'";
			
			Query query=sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> hdt = query.list();
			
			//if only more than one test under profile.
			if(hdt.size()>1){
				for (Map<String, Object> rs1 : hdt) {
					LabProfileTestCompDTO objLabProfileTestComp = new LabProfileTestCompDTO();
				
					int id = (Integer) rs1.get("idTest");
				
					if(id !=0){
						objLabProfileTestComp.setIdlabProfileTestComp((Integer) rs1.get("idlabProfileTestComp"));
						objLabProfileTestComp.setIdprofile((Integer) rs1.get("idprofile"));
						objLabProfileTestComp.setIdTest((Integer) rs1.get("idTest"));
					
						Query hqlQry = sessionFactory.getCurrentSession().createQuery("Select testName AS testName, testCode AS testCode FROM LabTestDTO where idTest =:idTest");
							  hqlQry.setParameter("idTest", id);
							  hqlQry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					
						List<Map<String, Object>> labtest = hqlQry.list();	  
						String testName = "";
						String testCode ="";
						float testRate = 0f;

						for (Map<String, Object> rs : labtest) {
							testName = (String) rs.get("testName");
							testCode = (String) rs.get("testCode");
						}
						objLabProfileTestComp.setTestName(testName);
						objLabProfileTestComp.setTestCode(testCode);
						objLabProfileTestComp.setTestRate(testRate);
					
						arrLabProfileTestComp.add(objLabProfileTestComp);
					}
				}
			}
			return arrLabProfileTestComp;
		}catch(Exception e){
			e.printStackTrace();
			log.error("featchLabProTestCompDataNew()...Error :"+e);
		}
		return arrLabProfileTestComp;
	}
	
	@Override
	public LabFormulaDTO featchLabFormulas(String searchText, String searchType) {

		LabFormulaDTO mainObject = new LabFormulaDTO();
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			if(searchType.equalsIgnoreCase("onload")) {
				
				  Query hqlQry =
				  session.createQuery("FROM LabFormulaDTO where formStatus =:formStatus");
				  hqlQry.setParameter("formStatus", "Y"); 
				  hqlQry.setMaxResults(20);
				 
				  mainObject.setLabFormulaList(hqlQry.list());
				 
				  return mainObject;
			}
		}catch (Exception e) {
			e.printStackTrace();
			log.error("featchLabFormulas()...Error :"+e);
		}
		return mainObject;
	}

	@Override
	public LabFormulaDTO labFormulaAutoSugg(String searchText) {
		
		Session session = null;
		String sqlQuery = "";
		LabFormulaDTO mainObject = new LabFormulaDTO();
		try{
			List<LabFormulaDTO> labFormulaList = new ArrayList<LabFormulaDTO>();
			session = sessionFactory.getCurrentSession();
			sqlQuery = "SELECT lt.testName AS testName, lf.idlabFormula AS idlabFormula, lf.expTestId AS expTestId FROM pathology_lab_test lt INNER JOIN labformula lf ON lt.idTest = lf.resultTestId WHERE formStatus = 'Y' AND lt.testName LIKE '%"+searchText+"%'";
			Query query = session.createSQLQuery(sqlQuery);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for(Map<String, Object> row : list){
				LabFormulaDTO obj = new LabFormulaDTO();
				LabTestDTO testDto = new LabTestDTO();
				
				testDto.setTestName((String)row.get("testName"));
				obj.setIdlabFormula((Integer)row.get("idlabFormula"));
				obj.setExpTestId((String)row.get("expTestId"));
				obj.setLabTestDTO(testDto);
				labFormulaList.add(obj);
			}
			mainObject.setLabFormulaList(labFormulaList);
			return mainObject;

		}catch(Exception e){
			e.printStackTrace();
			log.error("labFormulaAutoSugg()...Error :"+e);
		}
		return mainObject;
	}
}