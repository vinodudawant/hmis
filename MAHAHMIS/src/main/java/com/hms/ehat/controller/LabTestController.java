package com.hms.ehat.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.LabsTestsTemplatesDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.LabTestService;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.dto.PathologyTemplateMasterDTO;

@RestController
@RequestMapping(value = "/labtest")
public class LabTestController {
	static Logger log=Logger.getLogger(LabTestController.class.getName());
	
	@Autowired
	LabTestService labTestSampleService;
	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment This method is to get all Heading List
 * @param request
 * @return Heading List
 ****************************************************************************************************/
	@RequestMapping(value = "/getAllHeadingList", method = RequestMethod.POST)
	public SubServiceDto getAllHeadingList(@RequestParam("pathologyId") int pathologyId, HttpServletRequest request){
		log.info("In LabTestController getAllHeadingList()..");
		return labTestSampleService.getAllHeadingList(pathologyId, request);
	}

	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment This method is to save lab test
 * @param request
 * @return 
 ****************************************************************************************************/
	@RequestMapping(value = "/saveLabTest", method = RequestMethod.POST)
	public int saveLabTest(@RequestParam("labTestDetails") String labTestDetails, @RequestParam("reagentDetails") String reagentDetails,
						   @RequestParam("normalRangeDetails") String normalRangeDetails, @RequestParam("outLabDetails") String outLabDetails,
						   @RequestParam("generalValues") String generalValues, HttpServletRequest request){
		log.info("In LabTestController saveLabTest()..");
			return labTestSampleService.saveLabTest(labTestDetails, reagentDetails, normalRangeDetails, outLabDetails, generalValues, request);
	}
	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment This method is to save lab test
 * @param request
 * @return  
 ****************************************************************************************************/
	@RequestMapping(value = "/saveLabTestTemplate", method = RequestMethod.POST)
		public int saveLabTestTemplate(LabTestDTO labTest,@RequestParam("temp") String template,HttpServletRequest request){
		log.info("In LabTestController saveLabTestTemplate()..");
				return labTestSampleService.saveLabTestTemplate(labTest,template, request);
			}
	
	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment This method is to save lab test
 * @param request
 * @return 
 ****************************************************************************************************/
	@RequestMapping(value = "/getAllLabTest", method = RequestMethod.POST)
	public LabTestDTO getAllLabTest(HttpServletRequest request,@RequestParam ("startIndex")Integer startIndex){
		log.info("In LabTestController getAllLabTest()..");
			return labTestSampleService.getAllLabTest(startIndex);
		}

	
/*************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment This method is to search Test By name
 * @param request  State_Id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/searchTestByName", method = RequestMethod.POST)
		public LabTestDTO searchTestByName(@RequestParam("searchName") String name,HttpServletRequest request) {
		log.info("In LabTestController searchTestByName()..");
		return labTestSampleService.searchTestByName(name,request);
		}
	

	
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment This method is to get Test By Id
 * @param request  testId
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/editLabTestById", method = RequestMethod.POST)
		public  LabTestDTO editLabTestById(@RequestParam("labTestId") Integer labTestId,HttpServletRequest request) {
		log.info("In LabTestController editLabTestById()..");
			return labTestSampleService.editLabTestById(labTestId,request);
		}
		

	
/*************************************************************************
 * @author Ganesh Patil
 * @since 07-02-2020
 * @comment This method is to get Test By Id
 * @param request  testId
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteTestById", method = RequestMethod.POST)
		public  boolean deleteTestById(@RequestParam("testId") Integer testId,HttpServletRequest request) {
		log.info("In LabTestController deleteTestById()..");
			boolean flag;
			flag = labTestSampleService.deleteTestById(testId,request);
			log.debug("deleteTestById()....." + flag);
			return  flag;
		}

	
/*************************************************************************
 * @author Ganesh Patil
 * @since 19-02-2020
 * @comment This method is to get Template For LabTest
 * @param request  
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/getTemplateForLabTest", method = RequestMethod.POST)
		public  LabsTestsTemplatesDTO getTemplateForLabTest(@RequestParam("templateValue") Integer templateId,@RequestParam("idLabTest") Integer idLabTest,HttpServletRequest request) {
		log.info("In LabTestController getTemplateForLabTest()..");
		LabsTestsTemplatesDTO labsTestsTemplatesDTO=new LabsTestsTemplatesDTO();
		labsTestsTemplatesDTO = labTestSampleService.getTemplateForLabTest(templateId);
		log.debug("getTemplateForLabTest()....." + labsTestsTemplatesDTO);
			return  labsTestsTemplatesDTO;
		}

/*************************************************************************
 * @author Ganesh Patil
 * @since 19-02-2020
 * @comment This method is to delete Lab Test Normal Values
 * @param request  
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteLabTestNormalValues", method=RequestMethod.POST)
	public boolean deleteLabTestNormalValues(@RequestParam("idTables")String idTables,HttpServletRequest request){
		log.info("In LabTestController deleteLabTestNormalValues()..");
		return labTestSampleService.deleteLabTestNormalValues(idTables,request);
	} 
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 19-02-2020
 * @comment This method is to delete Lab Test Normal Values
 * @param request  
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteOutlabById", method=RequestMethod.POST)
	public boolean deleteOutlabById(@RequestParam("id")String idTables,HttpServletRequest request){
		log.info("In LabTestController deleteOutlabById()..");
			return labTestSampleService.deleteOutlabById(idTables,request);
		} 

	@RequestMapping(value = "/getoutlabsbylabtype", method = RequestMethod.GET)
	public OutLabMasterDto getOutLabsByLabType(@RequestParam("labTypeId") int labTypeId, HttpServletRequest request) {
		log.info("In LabTestController getOutLabsByLabType()..");
		OutLabMasterDto dto = labTestSampleService.getOutLabsByLabType(labTypeId, request);
		return dto;
	}
	
	@RequestMapping(value = "/validateLabTest", method = RequestMethod.GET)
	public String validateLabTest(@RequestParam("testId") Integer testId, @RequestParam("testName") String testName, 
											@RequestParam("testCode") String testCode) {
		log.info("In LabTestController validateLabTest()..");
		String response = labTestSampleService.validateLabTest(testId, testName, testCode);
		return response;
	}
	
	/*************************************************************************
	 * @author Akshay Mache
	 * @since 12-12-2020
	 * @comment This method is to delete General Value details by id
	 ************************************************************************/	
		@RequestMapping(value = "/deleteGeneralValueById", method = RequestMethod.POST)
		public  boolean deleteGeneralValueById(@RequestParam("id") int id,HttpServletRequest request) {
			log.info("deleteGeneralValueById..");
			 boolean flag = labTestSampleService.deleteGeneralValueById(id, request);
			 log.debug("deleteGeneralValueById..flag.");
			return  flag;
		}
		
		@RequestMapping(value = "/savePathologyTemplate", method = RequestMethod.POST)
		public  int savePathologyTemplate(PathologyTemplateMasterDTO obj,HttpServletRequest request) {
			log.info("savePathologyTemplate..");
			 int res  = labTestSampleService.savePathologyTemplate(obj, request);
			 log.debug("savePathologyTemplate...");
			return  res;
		}
		
		@RequestMapping(value = "/getPathologyTemplateById", method = RequestMethod.POST)
		public  PathologyTemplateMasterDTO getPathologyTemplateById(@RequestParam("id") int id,HttpServletRequest request) {
			PathologyTemplateMasterDTO obj=new PathologyTemplateMasterDTO();
			log.info("getPathologyTemplateById..");
			 obj  = labTestSampleService.getPathologyTemplateById(id);
			 log.debug("getPathologyTemplateById...");
			return  obj;
		}
		
		@RequestMapping(value = "/getPathologyTemplateList", method = RequestMethod.POST)
		public  PathologyTemplateMasterDTO getPathologyTemplateList(@RequestParam("testId") int testId,HttpServletRequest request) {
			PathologyTemplateMasterDTO obj=new PathologyTemplateMasterDTO();
			log.info("getPathologyTemplateList..");
			 List<PathologyTemplateMasterDTO> list  = labTestSampleService.getPathologyTemplateList(testId);
			 obj.setPathologytemplateList(list);
			 log.debug("getPathologyTemplateList...");
			return  obj;
		}
		
		@RequestMapping(value = "/deletePathologyTemplate", method = RequestMethod.POST)
		public  int deletePathologyTemplate(@RequestParam("id") int id,HttpServletRequest request) {
			PathologyTemplateMasterDTO obj=new PathologyTemplateMasterDTO();
			log.info("deletePathologyTemplate..");
			 int res  = labTestSampleService.deletePathologyTemplate(id,request);
			 log.debug("deletePathologyTemplate...");
			return  res;
		}

}