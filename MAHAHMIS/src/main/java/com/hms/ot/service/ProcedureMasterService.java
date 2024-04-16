package com.hms.ot.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ot.dto.ProcedureMasterDto;

public interface ProcedureMasterService {

	String saveProcedureMaster(ProcedureMasterDto procedureMasterDto,
			HttpServletRequest request);

	List<ProcedureMasterDto> getProcedureMasterList(String callfrom);

	List<ProcedureMasterDto> getProcedureMasterById(int id);

	String deleteProcedureMaster(int id, HttpServletRequest request);
}
