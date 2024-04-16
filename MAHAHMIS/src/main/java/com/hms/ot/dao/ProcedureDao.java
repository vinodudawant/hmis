package com.hms.ot.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ot.dto.ProcedureMasterDto;

public interface ProcedureDao {


    String saveProcedureMaster(ProcedureMasterDto procedureMasterDto,HttpServletRequest request);
	
	List<ProcedureMasterDto> getProcedureMasterList(String callfrom);
	
	List<ProcedureMasterDto> getProcedureMasterById(int id);
	
	String deleteProcedureMaster(int id,HttpServletRequest request);
}
