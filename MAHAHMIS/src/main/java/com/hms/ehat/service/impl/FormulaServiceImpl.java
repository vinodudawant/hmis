package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.FormulaDao;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.FormulaDto;
import com.hms.ehat.service.FormulaService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class FormulaServiceImpl implements FormulaService{
	
	@Autowired
	FormulaDao formulaDao;

	//Irfan khan 7-12-2018 function to save formula
	@Override
	@Transactional
	public int saveFormula(String formulaMaster,
			Integer userId) {
		
		//Split the list into object(Typecast)
		FormulaDto formulaDto2 = (FormulaDto)ConfigUIJSONUtility
				.getObjectFromJSON(formulaMaster, FormulaDto.class);
		
		FormulaDto formulaDto = formulaDto2.getListFormula().get(0);
		
		//function call 
		return formulaDao.saveFormula(formulaDto,userId);
	}

	// Irfan khan 11-12-2018 function to delete formula
	@Override
	@Transactional
	public int deleteFormula(int formulaId, Integer userId) {
		//function call 
		return formulaDao.deleteFormula(formulaId,userId);
	}

	//kishor Lokhande 11-12-2018 function to search formula
	@Override
	@Transactional
	public List<FormulaDto> getAutoCompleteForFormulaMaster(String letter,
			String callfrom) {
		return formulaDao.getAutoCompleteForFormulaMaster(letter,callfrom);
	}

	@Override
	@Transactional
	public List<FormulaDto> calculateFormula(List<Integer> formulaId, String callfrom, String letter, Integer pid, Integer pid2) {
		// TODO Auto-generated method stub
		return formulaDao.calculateFormula(formulaId,callfrom,letter,pid,pid2);
	} 

}
