package com.hms.ehat.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LabFormulaDTO;
import com.hms.ehat.dto.LabFormulaHeadings;

public interface LabFormulaService {
	public String saveLabFormula(LabFormulaDTO labFormulaDTO, HttpServletRequest request);
	public LabFormulaDTO getLabFormulaById(int labFormulaId);
	public boolean deleteLabFormula(int labFormulaId, HttpServletRequest request);
	public LabFormulaHeadings getLabFormulaHeadings(String type, HttpServletRequest request);
	public LabFormulaHeadings featchLabFormulaPro(String isCategory, String idHed, String type, HttpServletRequest request);
	public LabFormulaDTO featchLabFormulas(String searchText, String searchType);
	public LabFormulaDTO labFormulaAutoSugg(String searchText);
}