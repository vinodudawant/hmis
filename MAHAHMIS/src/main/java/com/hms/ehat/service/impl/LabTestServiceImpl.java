package com.hms.ehat.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.LabTestDao;
import com.hms.ehat.dto.LabsTestsTemplatesDTO;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.LabTestService;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.dto.PathologyTemplateMasterDTO;

@Service
@Transactional
public class LabTestServiceImpl implements LabTestService {
	
	@Autowired
	LabTestDao labTestDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public SubServiceDto getAllHeadingList(int pathologyId,
			HttpServletRequest request) {
		return labTestDao.getAllHeadingList(pathologyId, request);
	}

	/*@Override
	public int saveLabTest(LabTestDTO labTest,String dynamicTable, HttpServletRequest request) {
		//,String staticTable   ,staticTable
		return labTestDao.saveLabTest(labTest,dynamicTable, request);
	}*/
	
	@Override
	public int saveLabTest(String labTestDetails, String reagentDetails, String normalRangeDetails,
			String outLabDetails, String generalValues, HttpServletRequest request) {
		return labTestDao.saveLabTest(labTestDetails, reagentDetails, normalRangeDetails, outLabDetails, generalValues, request);
	}

	@Override
	public int saveLabTestTemplate(LabTestDTO labTest, String template,
			HttpServletRequest request) {
		return labTestDao.saveLabTestTemplate(labTest, template, request);
	}

	@Override
	public LabTestDTO getAllLabTest(Integer startIndex) {
		return labTestDao.getAllLabTest(startIndex);
	}

	@Override
	public LabTestDTO searchTestByName(String name, HttpServletRequest request) {
		return labTestDao.searchTestByName(name, request);
	}

	@Override
	public boolean deleteTestById(int testId, HttpServletRequest request) {
		return labTestDao.deleteTestById(testId, request);
	}

	@Override
	public LabTestDTO editLabTestById(Integer testId, HttpServletRequest request) {
		return labTestDao.editLabTestById(testId, request);
	}

	@Override
	public LabsTestsTemplatesDTO getTemplateForLabTest(Integer templateId) {
		return labTestDao.getTemplateForLabTest(templateId);
	}

	@Override
	public boolean deleteLabTestNormalValues(String idTables,
			HttpServletRequest request) {
		return labTestDao.deleteLabTestNormalValues(idTables, request);
	}

	@Override
	public boolean deleteOutlabById(String idTables, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return labTestDao.deleteOutlabById(idTables, request);
	}

	@Override
	public OutLabMasterDto getOutLabsByLabType(int labTypeId,
			HttpServletRequest request) {
		return labTestDao.getOutLabsByLabType(labTypeId, request);
	}

	@Override
	public String validateLabTest(Integer testId, String testName, String testCode) {
		return labTestDao.validateLabTest(testId, testName, testCode);
	}

	@Override
	public boolean deleteGeneralValueById(Integer id, HttpServletRequest request) {
		return labTestDao.deleteGeneralValueById(id, request);
	}
	@Override
	public int savePathologyTemplate(PathologyTemplateMasterDTO obj, HttpServletRequest request) {
		
		return labTestDao.savePathologyTemplate(obj, request);
	}

	@Override
	public PathologyTemplateMasterDTO getPathologyTemplateById(Integer id) {
		
		return labTestDao.getPathologyTemplateById(id);
	}

	@Override
	public List<PathologyTemplateMasterDTO> getPathologyTemplateList(Integer testId) {
		
		return labTestDao.getPathologyTemplateList(testId);
	}

	@Override
	public int deletePathologyTemplate(Integer templateId,HttpServletRequest request) {
		PathologyTemplateMasterDTO obj=new PathologyTemplateMasterDTO();
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj=(PathologyTemplateMasterDTO) sessionFactory.getCurrentSession().get(PathologyTemplateMasterDTO.class, templateId);
			obj.setDeletedBy(userId);
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeleted("Y");
			sessionFactory.getCurrentSession().merge(obj);
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return 0;
	}
}