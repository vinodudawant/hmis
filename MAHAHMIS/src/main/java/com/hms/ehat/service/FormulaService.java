package com.hms.ehat.service;

import java.util.List;

import com.hms.ehat.dto.FormulaDto;

public interface FormulaService {

	//Irfan khan 7-12-2018 function to save formula
	int saveFormula(String formulaMaster,
			Integer userId);
	
	//kishor Lokhande 11-12-2018 function to search formula
	List<FormulaDto> getAutoCompleteForFormulaMaster(String letter,
			String callfrom);

	// Irfan khan 11-12-2018 function to delete formula
	int deleteFormula(int formulaId, Integer userId);

	List<FormulaDto> calculateFormula(List<Integer> formulaId, String callfrom, String letter, Integer pid, Integer pid2);

}
