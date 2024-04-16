package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.SurgicalAdviceDto;
import com.hms.ot.dto.ProcedureMasterDetails;
import com.hms.ot.dto.ProcedureMasterDto;

public interface SurAdviceService {
	
	List<ProcedureMasterDto> procedureNameAutoSuggestion(String searchText,String callfrom);
	
	String saveSxAdvice(SurgicalAdviceDto surgicalAdviceDto,HttpServletRequest request);
	
	List<SurgicalAdviceDto> getSxList(int patorTreatId,String callfrom);
	
	List<ProcedureMasterDetails> getProList(int id);
	
	
	List<SurgicalAdviceDto> getSxListById(int id);
	
	String deleteSxAdvice(int id,HttpServletRequest request);
}
