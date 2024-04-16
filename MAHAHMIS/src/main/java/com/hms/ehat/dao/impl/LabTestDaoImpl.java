package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.LabTestDao;
import com.hms.ehat.dto.LabSpecialCasesDTO;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.dto.LabsTestsTemplatesDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pathology.dto.LabOutlabDTO;
import com.hms.pathology.dto.LabReagentDetailsDTO;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.LabTestGeneralValueDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;
import com.hms.pathology.dto.LabTestSampleDTO;
import com.hms.pathology.dto.LabUnitTypeDTO;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.dto.PathologyTemplateMasterDTO;
import com.hms.pathology.dto.SampleContainerDTO;
import com.hms.patient.util.ConfigUIJSONUtility;
@SuppressWarnings("unchecked")
@Repository
public class LabTestDaoImpl implements LabTestDao {
	
	@Autowired
	SessionFactory sessionFactory;

	
	@Override
	public SubServiceDto getAllHeadingList(int pathologyId,
			HttpServletRequest request) {
		
		List<SubServiceDto> list= new ArrayList<SubServiceDto>();
		SubServiceDto subServiceDto=new SubServiceDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SubServiceDto.class);
			criteria.add(Restrictions.eq("selfId", 0));
			criteria.add(Restrictions.eq("serviceId", pathologyId));
			criteria.add(Restrictions.eq("isCategory", "Y"));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("subId"));
			list = criteria.list();
			if(list.size() > 0){
				subServiceDto.setLstSubService(list);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return subServiceDto;
	}

	/*
	@Override
	public int saveLabTest(LabTestDTO labTest,String dynamicTable, HttpServletRequest request) {
		try {
			//,String staticTable
			SubServiceDto subserviceDto = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, labTest.getHeadingId());
			LabTestMethodDTO labTestMethodDTO =(LabTestMethodDTO) sessionFactory.getCurrentSession().get(LabTestMethodDTO.class, labTest.getLabTestMethodId());
			if(labTest.getCallFrom().equals("parameter") && labTest.getNormalValueType().equals("individual")){
				//LabTestNormalValuesDTO normalValues = (LabTestNormalValuesDTO) ConfigUIJSONUtility.getObjectFromJSON(staticTable, LabTestNormalValuesDTO.class);
				LabTestNormalValuesDTO normalValues2 = (LabTestNormalValuesDTO) ConfigUIJSONUtility.getObjectFromJSON(dynamicTable, LabTestNormalValuesDTO.class);		
				List<LabTestNormalValuesDTO> normalValuesList = new ArrayList<LabTestNormalValuesDTO>();
				
				//start
				//	for(LabTestNormalValuesDTO dto : normalValues.getLabTestNormalValueList()) {
					//LabUnitTypeDTO labUnitTypeDTO =(LabUnitTypeDTO) sessionFactory.getCurrentSession().get(LabUnitTypeDTO.class, dto.getIdUnit());
					//dto.setLabUnit(labUnitTypeDTO);
					//normalValuesList.add(dto);
				//}
				//end
				 * 
				for(LabTestNormalValuesDTO dto : normalValues2.getLabTestNormalValueList()) {
					LabUnitTypeDTO labUnitTypeDTO =(LabUnitTypeDTO) sessionFactory.getCurrentSession().get(LabUnitTypeDTO.class, dto.getIdUnit());
					LabSpecialCasesDTO labSpecialCasesDTO=(LabSpecialCasesDTO) sessionFactory.getCurrentSession().get(LabSpecialCasesDTO.class, dto.getIdSpecialCase());
					dto.setLabUnit(labUnitTypeDTO);
					dto.setLabSpecialCasesDTO(labSpecialCasesDTO);
					normalValuesList.add(dto);
				}
				
				labTest.setLabTestNormalValues(normalValuesList);
			}else if(labTest.getCallFrom().equals("parameter") && labTest.getNormalValueType().equals("general")){
			}
			labTest.setSubService(subserviceDto);
			labTest.setLabTestMethod(labTestMethodDTO);
		if(labTest.getIdTest()==0){
			sessionFactory.getCurrentSession().merge(labTest);
			return 1;
		}else{
			sessionFactory.getCurrentSession().merge(labTest);
			return 2;
		}
		
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
*/
	
	@Override
	public int saveLabTest(String labTestDetails, String reagentDetails, String normalRangeDetails,
			String outLabDetails, String generalValues, HttpServletRequest request) {
		Session session = null;

		try {
			session = sessionFactory.getCurrentSession();
			LabTestDTO objectToMerge = (LabTestDTO) ConfigUIJSONUtility.getObjectFromJSON(labTestDetails, LabTestDTO.class);
			LabReagentDetailsDTO labReagentDetailsDTO = (LabReagentDetailsDTO) ConfigUIJSONUtility.getObjectFromJSON(reagentDetails, LabReagentDetailsDTO.class);
			LabTestNormalValuesDTO labTestNormalValuesDTO = (LabTestNormalValuesDTO) ConfigUIJSONUtility.getObjectFromJSON(normalRangeDetails, LabTestNormalValuesDTO.class);
			LabOutlabDTO labOutlabDTO = (LabOutlabDTO) ConfigUIJSONUtility.getObjectFromJSON(outLabDetails, LabOutlabDTO.class);
			LabTestGeneralValueDto generalValueDto = (LabTestGeneralValueDto) ConfigUIJSONUtility.getObjectFromJSON(generalValues, LabTestGeneralValueDto.class);
			
			LabTestDTO labTestDTO = objectToMerge.getLabTestList().get(0);
			
			SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, objectToMerge.getLabTestList().get(0).getHeadingId());
			LabTestMethodDTO labTestMethodDTO = (LabTestMethodDTO) session.get(LabTestMethodDTO.class, objectToMerge.getLabTestList().get(0).getLabTestMethodId());
			LabTestSampleDTO labTestSampleDTO = (LabTestSampleDTO) session.get(LabTestSampleDTO.class, objectToMerge.getLabTestList().get(0).getSampleId());
			SampleContainerDTO sampleContainerDTO = (SampleContainerDTO) session.get(SampleContainerDTO.class, objectToMerge.getLabTestList().get(0).getContainerId());
			LabUnitTypeDTO labUnitTypeDTO = (LabUnitTypeDTO) session.get(LabUnitTypeDTO.class, objectToMerge.getLabTestList().get(0).getLabUnitId());
			
			labTestDTO.setSubService(subServiceDto);
			labTestDTO.setLabTestMethod(labTestMethodDTO);
			labTestDTO.setLabTestSample(labTestSampleDTO);
			labTestDTO.setSampleContainer(sampleContainerDTO);
			labTestDTO.setLabUnit(labUnitTypeDTO);
			
			List<LabReagentDetailsDTO> reagentList = new ArrayList<>();
			for(LabReagentDetailsDTO reagentDto : labReagentDetailsDTO.getLabReagentDetailsList()) {
				ItemMasterDto itemName = (ItemMasterDto) session.get(ItemMasterDto.class, reagentDto.getReagentId());
				//ItemMasterDto machineName = (ItemMasterDto) session.get(ItemMasterDto.class, reagentDto.getAssestId());
				LabTestMethodDTO testMethod = (LabTestMethodDTO) session.get(LabTestMethodDTO.class, reagentDto.getLabTestMethodId());
				
				//reagentDto.setItemMasterReagent(itemName);
				//reagentDto.setItemMasterAsset(machineName);
				reagentDto.setLabTestMethod(testMethod);
				
				reagentList.add(reagentDto);
			}
			labTestDTO.setLabReagentDetailsDTO(reagentList);
			
			List<LabTestNormalValuesDTO> normalValuesList = new ArrayList<LabTestNormalValuesDTO>();
			
			if(labTestNormalValuesDTO.getLabTestNormalValueList().size()>0)
			{
				for(LabTestNormalValuesDTO normalValuesDto : labTestNormalValuesDTO.getLabTestNormalValueList()) {
					LabUnitTypeDTO unitTypeDTO = (LabUnitTypeDTO) session.get(LabUnitTypeDTO.class, normalValuesDto.getIdUnit());
					LabSpecialCasesDTO specialCasesDTO = (LabSpecialCasesDTO) session.get(LabSpecialCasesDTO.class, normalValuesDto.getIdSpecialCase());
					
					normalValuesDto.setLabUnit(unitTypeDTO);
					normalValuesDto.setLabSpecialCasesDTO(specialCasesDTO);
					
					normalValuesList.add(normalValuesDto);
				}
				labTestDTO.setLabTestNormalValues(normalValuesList);
			}	
			
			
			
			
			List<LabOutlabDTO> outLabList = new ArrayList<LabOutlabDTO>();
			for(LabOutlabDTO outlabDTO : labOutlabDTO.getOutlabList()) {
				OutLabMasterDto dto = (OutLabMasterDto) sessionFactory.getCurrentSession().get(OutLabMasterDto.class, outlabDTO.getLabId());
				outlabDTO.setDto(dto);
				outLabList.add(outlabDTO);
			}
			labTestDTO.setLabOutlabDTO(outLabList);
			labTestDTO.setCreatedBy(labTestDTO.getUserId());
			
			List<LabTestGeneralValueDto> generalValuesList = new ArrayList<LabTestGeneralValueDto>();
			for(LabTestGeneralValueDto dto : generalValueDto.getGeneralValuesList()) {
				LabUnitTypeDTO unitTypeDTO = (LabUnitTypeDTO) session.get(LabUnitTypeDTO.class, labTestDTO.getUnitIdGenaral());

				dto.setCreatedBy(labTestDTO.getUserId());
				dto.setUnitId(labTestDTO.getUnitId());
				dto.setLabUnit(unitTypeDTO);
				
				generalValuesList.add(dto);
			}
			labTestDTO.setGeneralValuesList(generalValuesList);
			
			if(labTestDTO.getIdTest()==0) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabTestDTO.class);
				Criterion testCode = Restrictions.eq("testCode", labTestDTO.getTestCode());
		        Criterion testName = Restrictions.eq("testName", labTestDTO.getTestName());
		        LogicalExpression orExp = Restrictions.or(testCode, testName);
		        criteria.add(orExp);
	            //criteria.add(Restrictions.eq("testName", labTestDTO.getTestName()));
	            criteria.add(Restrictions.eq("status", "Y"));
	                     
	            if(criteria.uniqueResult() != null)
	                return 3;
				
				session.merge(labTestDTO);
				return 1;
			}else {
				String hqlQuery = "SELECT COUNT(*) FROM LabTestDTO WHERE idTest NOT IN (:idTest) AND status=:status AND (testName =:testName OR testCode=:testCode)";
				Query hql = session.createQuery(hqlQuery);
					  hql.setParameter("idTest", labTestDTO.getIdTest());	  
					  hql.setParameter("testName", labTestDTO.getTestName());
					  hql.setParameter("testCode", labTestDTO.getTestCode());
					  hql.setParameter("status", "Y");
				
				Long count = (Long) hql.uniqueResult();
			
				if(count >= 1) {
					 return 3;
				}else {
					labTestDTO.setUpdatedBy(labTestDTO.getUserId());
					session.merge(labTestDTO);
					return 2;
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	@Override
	public int saveLabTestTemplate(LabTestDTO labTest, String template,
			HttpServletRequest request) {
		try{
			LabsTestsTemplatesDTO labTestTemplateDTO = (LabsTestsTemplatesDTO) ConfigUIJSONUtility.getObjectFromJSON(template, LabsTestsTemplatesDTO.class);
			SubServiceDto subserviceDto = (SubServiceDto) sessionFactory.getCurrentSession().get(SubServiceDto.class, labTest.getHeadingId());
			LabTestMethodDTO labTestMethodDTO =(LabTestMethodDTO) sessionFactory.getCurrentSession().get(LabTestMethodDTO.class, labTest.getLabTestMethodId());
			labTest.setSubService(subserviceDto);
			labTest.setLabTestMethod(labTestMethodDTO);
			labTest.setLabTestTemplateList(labTestTemplateDTO.getLabTestTemplateList());
			if(labTest.getIdTest()==0){
				sessionFactory.getCurrentSession().merge(labTest);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(labTest);
				return 2;
			}
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public LabTestDTO getAllLabTest(Integer startIndex) {
		LabTestDTO dto = new LabTestDTO();
		try {
					Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabTestDTO.class);
					criteria.setFirstResult(startIndex);
					criteria.add(Restrictions.eq("status", "Y"));
					criteria.addOrder(Order.desc("idTest"));
					criteria.setMaxResults(10);
					dto.setLabTestList(criteria.list());					
					Integer labTestCount=getLabTestCount();
					dto.setLabTestCount(labTestCount);
			}catch(Exception e){
				e.printStackTrace();
				return null;
			}
		return dto;
	}

	/* =============
	  Code By  : Badrinath Wagh
	  Code For : For Previous Bill Patients count
	================*/
//	@Override
	public Integer getLabTestCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from pathology_lab_test where testStatus='Y'" + 
					"  "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}	
	
	@Override
	public LabTestDTO searchTestByName(String name, HttpServletRequest request) {
		LabTestDTO dto = new LabTestDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(LabTestDTO.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("testName", name, MatchMode.START));
			criteria.addOrder(Order.asc("testName"));
			dto.setLabTestList(criteria.list());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return dto;
	}

	@Override
	public boolean deleteTestById(int testId, HttpServletRequest request) {
		try {
			LabTestDTO labtest = (LabTestDTO) sessionFactory.getCurrentSession().get(LabTestDTO.class,testId);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			labtest.setStatus("N");
			labtest.setDeletedBy(userId);
			
			String sql = "UPDATE pathology_labprofiletestcomp SET test_status=:status WHERE idTest=:testId";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				  query.setParameter("status", "N");
				  query.setParameter("testId", labtest.getIdTest());
				  
			query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public LabTestDTO editLabTestById(Integer testId, HttpServletRequest request) {
		LabTestDTO lab=new LabTestDTO();
		List<LabTestDTO> labTestList = new ArrayList<LabTestDTO>();
		List<LabTestNormalValuesDTO> labTestNormalValuesList=new ArrayList<LabTestNormalValuesDTO>();
		List<LabReagentDetailsDTO> labReagentDetailsDTOList=new ArrayList<LabReagentDetailsDTO>();
		List<LabOutlabDTO> labOutlabDTOsList=new ArrayList<LabOutlabDTO>();
		List<LabTestGeneralValueDto> generalValuesList = new ArrayList<LabTestGeneralValueDto>();
		try {
			lab = (LabTestDTO) sessionFactory.getCurrentSession().get(LabTestDTO.class,testId);
			
			for (LabTestNormalValuesDTO dto : lab.getLabTestNormalValues()) {
				 if(dto.getStatus().equalsIgnoreCase("Y")){
					 labTestNormalValuesList.add(dto);
				 }
			}
			
			for(LabReagentDetailsDTO dto :lab.getLabReagentDetailsDTO()) {
				if(dto.getDeleted().equalsIgnoreCase("N")) {
					labReagentDetailsDTOList.add(dto);
				}
			}
			
			for(LabOutlabDTO dto : lab.getLabOutlabDTO()) {
				if(dto.getDeleted().equalsIgnoreCase("N")) {
					labOutlabDTOsList.add(dto);
				}
			}
			
			for(LabTestGeneralValueDto dto : lab.getGeneralValuesList()) {
				if(dto.getDeleted().equalsIgnoreCase("N")) {
					generalValuesList.add(dto);
				}
			}
			
			lab.setLabTestNormalValues(labTestNormalValuesList);
			lab.setLabReagentDetailsDTO(labReagentDetailsDTOList);
			lab.setLabOutlabDTO(labOutlabDTOsList);
			lab.setGeneralValuesList(generalValuesList);
			
			//lab.setLabTestList(labTestList);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return lab;
	}

	@Override
	public LabsTestsTemplatesDTO getTemplateForLabTest(Integer templateId) {
		LabsTestsTemplatesDTO dto = new LabsTestsTemplatesDTO();
		List<LabsTestsTemplatesDTO> list = new ArrayList<LabsTestsTemplatesDTO>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(LabsTestsTemplatesDTO.class);
			criteria.add(Restrictions.eq("idlabTestTemplate",templateId ));
			criteria.addOrder(Order.asc("idlabTestTemplate"));
			list=criteria.list();
			dto.setLabTestTemplateList(list);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return dto;
	}

	@Override
	public boolean deleteLabTestNormalValues(String idTables,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
            String id[] = idTables.split(",");
       
			for (int i = 0; i < id.length; i++) {
				  int id1 = Integer.parseInt(id[i]);	
				  LabTestNormalValuesDTO dto =(LabTestNormalValuesDTO) sessionFactory.getCurrentSession().get(LabTestNormalValuesDTO.class,id1);
				  dto.setDeleted("Y");
				  dto.setUpdatedDate(new Date(new java.util.Date().getTime()));
				  dto.setDeletedBy(userId);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteOutlabById(String idTables, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
            String id[] = idTables.split(",");
       
			for (int i = 0; i < id.length; i++) {
				  int id1 = Integer.parseInt(id[i]);	
				  LabOutlabDTO dto =(LabOutlabDTO) sessionFactory.getCurrentSession().get(LabOutlabDTO.class,id1);
				  dto.setDeleted("Y");
				  dto.setUpdatedDate(new Date(new java.util.Date().getTime()));
				  dto.setDeletedBy(userId);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public OutLabMasterDto getOutLabsByLabType(int labTypeId,
			HttpServletRequest request) {
		Session session = null;
		try {
			OutLabMasterDto dto = new OutLabMasterDto();
			
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");

			session = sessionFactory.getCurrentSession();
			Query qry = session.createQuery("FROM OutLabMasterDto WHERE labType =:labType AND deleted =:deleted AND unitId =:unitId");
				  qry.setParameter("labType", new Integer(labTypeId).toString());
				  qry.setParameter("deleted", "N");
				  qry.setParameter("unitId", unitId);
			
			List<OutLabMasterDto> list = qry.list();
			dto.setOutLabMasterDtoList(list);
			
			return dto;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public String validateLabTest(Integer testId, String testName, String testCode) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();

			if(testId == 0) {
				Query hql = session.createQuery("FROM LabTestDTO WHERE (testName=:testName OR testCode=:testCode) AND status=:status ");
					  hql.setParameter("testName", testName);
					  hql.setParameter("testCode", testCode);
					  hql.setParameter("status", "Y");
		 
		 		 if(hql.uniqueResult() != null)
		 			return "This test is already exist.";
			}else {
				String hqlQuery = "SELECT COUNT(*) FROM LabTestDTO WHERE idTest NOT IN (:idTest) AND status=:status AND (testName =:testName OR testCode=:testCode)";
				Query hql = session.createQuery(hqlQuery);
					  hql.setParameter("idTest", testId);	  
					  hql.setParameter("testName", testName);
					  hql.setParameter("testCode", testCode);
					  hql.setParameter("status", "Y");
					  
				Long rowCount = (Long) hql.uniqueResult();
				if(rowCount > 0)
					return "This test is already exist.";
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return "Done";
	}
	
	@Override
	public boolean deleteGeneralValueById(Integer id, HttpServletRequest request) {
		try {
			LabTestGeneralValueDto obj = (LabTestGeneralValueDto) sessionFactory.getCurrentSession().get(LabTestGeneralValueDto.class, id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@Override
	public int savePathologyTemplate(PathologyTemplateMasterDTO obj, HttpServletRequest request) {
		String sql="";
		int count=0;
		try {
			
					if(obj.getTemplateId()==0 ) {
						if(obj.getTemplateDefault().equalsIgnoreCase("Y")) {
							 sql="select count(*) from pathology_template_master where profile_id="+obj.getProfileId()+" and template_default='Y' and deleted='N' ";
							 Query q=sessionFactory.getCurrentSession().createSQLQuery(sql);
							 count=((Number) q.uniqueResult()).intValue();
						}
						
							
							if(count >=1) {
								return 3;
							}else {
								sessionFactory.getCurrentSession().merge(obj);
								return 1;
						}
						
					}else {
						if(obj.getTemplateDefault().equalsIgnoreCase("Y")) {
						 sql="select count(*) from pathology_template_master where profile_id="+obj.getProfileId()+" and template_default='Y' and deleted='N' and   template_id not in("+obj.getTemplateId()+")  ";
							Query q=sessionFactory.getCurrentSession().createSQLQuery(sql);
							 count=((Number) q.uniqueResult()).intValue();
						   }
							if(count >=1) {
								return 3;
							}else {
								sessionFactory.getCurrentSession().merge(obj);
								return 2;
							}
					
					}
			 
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return 0;
	}

	@Override
	public PathologyTemplateMasterDTO getPathologyTemplateById(Integer id) {
		PathologyTemplateMasterDTO obj=new PathologyTemplateMasterDTO();
		try {
			obj=(PathologyTemplateMasterDTO) sessionFactory.getCurrentSession().get(PathologyTemplateMasterDTO.class, id);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public List<PathologyTemplateMasterDTO> getPathologyTemplateList(Integer testId) {
		List<PathologyTemplateMasterDTO> list=new ArrayList<PathologyTemplateMasterDTO>();
		try {
		  Criteria c=sessionFactory.getCurrentSession().createCriteria(PathologyTemplateMasterDTO.class);
		  c.add(Restrictions.eq("profileId", testId));
		  c.add(Restrictions.eq("deleted","N"));
		  list= c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}