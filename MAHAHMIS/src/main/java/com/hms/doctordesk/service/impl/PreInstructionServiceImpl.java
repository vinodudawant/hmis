package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.PresInstructionDao;
import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.service.PrescriptionInstructionService;

@Service
@Transactional
public class PreInstructionServiceImpl implements PrescriptionInstructionService{

	@Autowired
 PresInstructionDao presInstructionDao;

	@Override
	public String savePreInstrutionDetals(
			PrescriptionInstructionDto prescriptionInstructionDto,
			HttpServletRequest request) {
		
		return presInstructionDao.savePreInstrutionDetals(prescriptionInstructionDto,request);
	}

	@Override
	public List<PrescriptionInstructionDto> getAllPreDetails(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return presInstructionDao.getAllPreDetails(request);
	}

	@Override
	public List<PrescriptionInstructionDto> getAllPreDetailsById(int id) {
		// TODO Auto-generated method stub
		return presInstructionDao.getAllPreDetailsById(id);
	}

	@Override
	public List<PrescriptionInstructionDto> getAllPreDetailByName(
			String searchText,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return presInstructionDao.getAllPreDetailByName(searchText,request);
	}

	@Override
	public String saveTemplate(PresTemplateMaster presTemplateMaster,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return presInstructionDao.saveTemplate(presTemplateMaster,request);
	}

	@Override
	public List<PresTemplateMaster> getTemplateList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return presInstructionDao.getTemplateList(request);
	}
    

	@Override
	public  List<PresTemplateMaster> getInstListByTempId(int templateId) {
		// TODO Auto-generated method stub
		return presInstructionDao.getInstListByTempId(templateId);
	}

	@Override
	public String deletePrescript(int id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return presInstructionDao.deletePrescript(id,request);
	}

	@Override
	public String deleteTemplate(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return presInstructionDao.deleteTemplate(id, request);
	}

	
	
	
}