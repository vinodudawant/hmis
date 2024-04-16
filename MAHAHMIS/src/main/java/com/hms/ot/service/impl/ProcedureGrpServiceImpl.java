package com.hms.ot.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.ot.dao.ProcedureGrpDao;
import com.hms.ot.dto.ProcedureGroupMasterDto;
import com.hms.ot.service.ProcedureGrpService;

@Service
@Transactional
public class ProcedureGrpServiceImpl implements ProcedureGrpService{

	@Autowired
	ProcedureGrpDao procedureGrpDao;
	
	@Override
	public String saveProcedureGrp(
			ProcedureGroupMasterDto ProcedureGrpMasterDto,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return procedureGrpDao.saveProcedureGrp(ProcedureGrpMasterDto, request);
	}

	@Override
	public List<ProcedureGroupMasterDto> getProcedureGrpList(String callfrom) {
		// TODO Auto-generated method stub
		return procedureGrpDao.getProcedureGrpList(callfrom);
	}

	@Override
	public List<ProcedureGroupMasterDto> getProcedureGrpById(int id) {
		// TODO Auto-generated method stub
		return procedureGrpDao.getProcedureGrpById(id);
	}

	@Override
	public String deleteProcedureGrp(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return procedureGrpDao.deleteProcedureGrp(id, request);
	}

}
