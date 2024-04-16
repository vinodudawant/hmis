package com.hms.doctordesk.service;

import java.util.List;

import com.hms.ehat.dto.FormulaDto;

public interface DoctordeskformulaService {

	List<FormulaDto> calculateFormula(List<Integer> formulaId, String callfrom, String letter, Integer pid, Integer pid2);
}
