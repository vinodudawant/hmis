package com.hms.ot.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ot.dto.ProcedureTypeMasterDto;

public interface ProcedureTypeDao {

	String saveProcedureType(ProcedureTypeMasterDto procedureTypeMasterDto,HttpServletRequest request);
	
	List<ProcedureTypeMasterDto> getProcedureTypeList(String callfrom);
	
	List<ProcedureTypeMasterDto> getProcedureTypeById(int id);
	
	String deleteProcedureType(int id,HttpServletRequest request);
	
}
