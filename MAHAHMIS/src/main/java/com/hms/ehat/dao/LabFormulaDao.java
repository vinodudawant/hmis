package com.hms.ehat.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabFormulaDTO;
import com.hms.ehat.dto.LabFormulaHeadings;

public interface LabFormulaDao {
	public String saveLabFormula(LabFormulaDTO labFormulaDTO);
	public LabFormulaDTO getLabFormulaById(int labFormulaId);
	public boolean deleteLabFormula(int labFormulaId, Integer userId);
	public LabFormulaHeadings getLabFormulaHeadings(String type, HttpServletRequest request);
	public LabFormulaHeadings featchLabFormulaPro(String isCategory, String idHed, String type, HttpServletRequest request);
	public LabFormulaDTO featchLabFormulas(String searchText, String searchType);
	public LabFormulaDTO labFormulaAutoSugg(String searchText);
}