package com.hms.ot.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.ot.dao.ProcedureDao;
import com.hms.ot.dto.ProcedureMasterDto;
import com.hms.ot.service.ProcedureMasterService;

@Service
@Transactional
public class ProcedureMasterServiceImpl implements ProcedureMasterService{

	@Autowired
	ProcedureDao procedureDao;
	
	@Override
	public String saveProcedureMaster(ProcedureMasterDto procedureMasterDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return procedureDao.saveProcedureMaster(procedureMasterDto, request);
	}

	@Override
	public List<ProcedureMasterDto> getProcedureMasterList(String callfrom) {
		// TODO Auto-generated method stub
		return procedureDao.getProcedureMasterList(callfrom);
	}

	@Override
	public List<ProcedureMasterDto> getProcedureMasterById(int id) {
		// TODO Auto-generated method stub
		return procedureDao.getProcedureMasterById(id);
	}

	@Override
	public String deleteProcedureMaster(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return procedureDao.deleteProcedureMaster(id, request);
	}

}
