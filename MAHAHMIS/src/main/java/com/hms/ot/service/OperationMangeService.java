package com.hms.ot.service;

import java.util.List;

import com.hms.ot.dto.OperationTypeTbl;

public interface OperationMangeService {

	List<String> fetchOperationType(String letter);

	String saveoperationType(OperationTypeTbl obj);

	String deletePT(int pTId);

}
