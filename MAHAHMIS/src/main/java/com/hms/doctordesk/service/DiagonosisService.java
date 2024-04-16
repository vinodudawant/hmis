package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.ICD10_L;
import com.hms.doctordesk.dto.DiagonosisMasterDto;

public interface DiagonosisService {

	List<ICD10_L> diagonosisAutoSuggestion(String searchText,String callFrom,int diagoType,HttpServletRequest request);
	
	List<ICD10_L> getDiagonosisById(int id);
	
    String saveDiagonosisData(DiagonosisMasterDto diagonosisMasterDto,Integer patientId,Integer treatmentId,HttpServletRequest request);
	
	List<DiagonosisMasterDto> getListOfDiagoList(int treatmentId);
	
	List<DiagonosisMasterDto> getListOfDiagoListById(int id);
	
	 String deleteDiagonosis(String id,HttpServletRequest request);
	 
	 String updateDignosisStatus(String id,Integer userId,String callFrom,HttpServletRequest request);

}
