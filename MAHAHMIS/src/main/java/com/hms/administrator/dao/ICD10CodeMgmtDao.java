package com.hms.administrator.dao;

import java.util.List;


import com.hms.administrator.dto.ICD10_L;

public interface ICD10CodeMgmtDao {
	public int saveICDDiagnosisLevel1(ICD10_L iobj);

	public List<ICD10_L> fetchICD10Level1(Integer unitId);

	public ICD10_L editIcd10CodeMgmt(Integer icdId);

	public boolean deleteIcd10CodeMgmt(ICD10_L iobj);
	
	public List<ICD10_L>  icd10CodeMgmtAutoSuggestion(String icdCode,String icdFlag);
	
	public  List<ICD10_L> getICD10ListByType(int type);
	
	public List<ICD10_L>  ic10AutoSuggByType(int type,String searchText);
	
	public int deleteICD10(String id,int userId);

}
