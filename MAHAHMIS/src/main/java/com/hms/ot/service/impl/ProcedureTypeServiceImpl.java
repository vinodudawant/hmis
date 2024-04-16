package com.hms.ot.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ot.dao.ProcedureTypeDao;
import com.hms.ot.dto.ProcedureTypeMasterDto;
import com.hms.ot.service.ProcedureTypeService;

@Service
@Transactional
public class ProcedureTypeServiceImpl implements ProcedureTypeService{

	@Autowired
	ProcedureTypeDao procedureTypeDao;
	
	@Override
	public String saveProcedureType(
			ProcedureTypeMasterDto procedureTypeMasterDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return procedureTypeDao.saveProcedureType(procedureTypeMasterDto, request);
	}

	@Override
	public List<ProcedureTypeMasterDto> getProcedureTypeList(String callfrom) {
		// TODO Auto-generated method stub
		return procedureTypeDao.getProcedureTypeList(callfrom);
	}

	@Override
	public List<ProcedureTypeMasterDto> getProcedureTypeById(int id) {
		// TODO Auto-generated method stub
		return procedureTypeDao.getProcedureTypeById(id);
	}

	@Override
	public String deleteProcedureType(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return procedureTypeDao.deleteProcedureType(id, request);
	}
	
}
