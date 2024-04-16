package com.hms.administrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.ICD10_L;

public interface ICD10CodeMgmtService {
	public int saveICDDiagnosisLevel1(ICD10_L iobj,HttpServletRequest request);

	public List<ICD10_L> fetchICD10Level1(Integer unitId,HttpServletRequest request);

	public ICD10_L editIcd10CodeMgmt(Integer icdId);

	public boolean deleteIcd10CodeMgmt(Integer icdId, HttpServletRequest request);
	
	public List<ICD10_L>   icd10CodeMgmtAutoSuggestion(String icdCode,String icdFlag);
	
	public  List<ICD10_L> getICD10ListByType(int type);
	
	public List<ICD10_L>  ic10AutoSuggByType(int type,String searchText);
	
	public int deleteICD10(String id,int userId);
	

}
