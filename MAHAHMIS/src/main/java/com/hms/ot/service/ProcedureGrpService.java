package com.hms.ot.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ot.dto.ProcedureGroupMasterDto;

public interface ProcedureGrpService {

	    String saveProcedureGrp(ProcedureGroupMasterDto ProcedureGrpMasterDto,HttpServletRequest request);
		
		List<ProcedureGroupMasterDto> getProcedureGrpList(String callfrom);
		
		List<ProcedureGroupMasterDto> getProcedureGrpById(int id);
		
		String deleteProcedureGrp(int id,HttpServletRequest request);
}
