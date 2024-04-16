package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.PreMasterList;
import com.hms.doctordesk.dto.PrescrptionMasterDto;
import com.hms.doctordesk.dto.RouteMaster;

public interface PreMasterService {
	
	 List<PreMasterList> getAutoSuggestion(String searchText,String callfrom);
	 
	 List<PreMasterList> getStrengthAndUom(int id);
	 
	 List<RouteMaster> getRouteName(int id);
	 
	 String savePrescription(PrescrptionMasterDto prescrptionMasterDto,HttpServletRequest request);

     List<PrescrptionMasterDto> getPrescriptionById(int id);
	 
     List<PrescrptionMasterDto> getPresList(int patOrTreatId,String callfrom);
	 
	 String deletePrecription(int id,HttpServletRequest request);
}
