package com.hms.ot.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ot.dto.ProcedureGroupMasterDto;

public interface ProcedureGrpDao {

    String saveProcedureGrp(ProcedureGroupMasterDto ProcedureGrpMasterDto,HttpServletRequest request);
	
	List<ProcedureGroupMasterDto> getProcedureGrpList(String callfrom);
	
	List<ProcedureGroupMasterDto> getProcedureGrpById(int id);
	
	String deleteProcedureGrp(int id,HttpServletRequest request);
}
