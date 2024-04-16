package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabsTestsTemplatesDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.dto.PathologyTemplateMasterDTO;

public interface LabTestService {
	
	public SubServiceDto getAllHeadingList(int pathologyId,HttpServletRequest request);

	public int saveLabTest(String labTestDetails, String reagentDetails, String normalRangeDetails, String outLabDetails, String generalValues, HttpServletRequest request);
	
	public int saveLabTestTemplate(LabTestDTO labTest,String template,HttpServletRequest request);
	
	public LabTestDTO getAllLabTest(Integer startIndex);
	
	public LabTestDTO searchTestByName(String name,HttpServletRequest request);
	
	public LabTestDTO editLabTestById(Integer testId,HttpServletRequest request);
	
	public boolean deleteTestById(int testId,HttpServletRequest request);
	
	public LabsTestsTemplatesDTO getTemplateForLabTest(Integer templateId);
	
	public boolean deleteLabTestNormalValues(String idTables,HttpServletRequest request);
	
	public boolean deleteOutlabById(String idTables,HttpServletRequest request);
	
	public OutLabMasterDto getOutLabsByLabType(int labTypeId, HttpServletRequest request);
	
	public String validateLabTest(Integer testId, String testName, String testCode);
	
	public boolean deleteGeneralValueById(Integer id, HttpServletRequest request);
	
public int savePathologyTemplate(PathologyTemplateMasterDTO obj, HttpServletRequest request);
	
	public PathologyTemplateMasterDTO getPathologyTemplateById(Integer id);
	
	public List<PathologyTemplateMasterDTO>  getPathologyTemplateList(Integer testId);
	
	public int   deletePathologyTemplate(Integer templateId,HttpServletRequest request);
}