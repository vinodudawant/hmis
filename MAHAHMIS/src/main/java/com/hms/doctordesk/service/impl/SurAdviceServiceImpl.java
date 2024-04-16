package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.SurAdviceDao;
import com.hms.doctordesk.dto.SurgicalAdviceDto;
import com.hms.doctordesk.service.SurAdviceService;
import com.hms.ot.dto.ProcedureMasterDetails;
import com.hms.ot.dto.ProcedureMasterDto;

@Service
@Transactional
public class SurAdviceServiceImpl implements SurAdviceService{

	@Autowired
	SurAdviceDao surAdviceDao;
	
	@Override
	public List<ProcedureMasterDto> procedureNameAutoSuggestion(
			String searchText, String callfrom) {
		// TODO Auto-generated method stub
		return surAdviceDao.procedureNameAutoSuggestion(searchText, callfrom);
	}

	@Override
	public String saveSxAdvice(SurgicalAdviceDto surgicalAdviceDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return surAdviceDao.saveSxAdvice(surgicalAdviceDto, request);
	}

	@Override
	public List<SurgicalAdviceDto> getSxList(int patorTreatId,String callfrom) {
		// TODO Auto-generated method stub
		return surAdviceDao.getSxList(patorTreatId,callfrom);
	}

	@Override
	public List<SurgicalAdviceDto> getSxListById(int id) {
		// TODO Auto-generated method stub
		return surAdviceDao.getSxListById(id);
	}

	@Override
	public String deleteSxAdvice(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return surAdviceDao.deleteSxAdvice(id, request);
	}

	@Override
	public List<ProcedureMasterDetails> getProList(int id) {
		// TODO Auto-generated method stub
		return surAdviceDao.getProList(id);
	}

	

}
