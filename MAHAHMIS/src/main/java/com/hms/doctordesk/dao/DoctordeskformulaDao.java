package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.ehat.dto.FormulaDto;

public interface DoctordeskformulaDao {

	List<FormulaDto> calculateFormula(List<Integer> formulaId , String callfrom, String letter, Integer pid, Integer pid2);
}
