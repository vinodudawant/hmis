package com.hms.doctordesk.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.DoctordeskformulaDao;
import com.hms.doctordesk.service.DoctordeskformulaService;
import com.hms.ehat.dto.FormulaDto;

@Service
@Transactional
public class DoctordeskformulaServicesImpl implements DoctordeskformulaService {

	@Autowired
	DoctordeskformulaDao 	doctordeskformuladao;
	
	@Override
	public List<FormulaDto> calculateFormula(List<Integer> formulaId, String callfrom, String letter, Integer pid, Integer pid2) {
		// TODO Auto-generated method stub
		return doctordeskformuladao.calculateFormula(formulaId,callfrom,letter,pid,pid2);
	} 
}
