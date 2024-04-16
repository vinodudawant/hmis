package com.hms.ot.dao;

import java.util.List;

import com.hms.ot.dto.OperationTypeTbl;

public interface OperationMangeDao {

	List<OperationTypeTbl> fetchOperationType(String letter);

	String saveoperationType(OperationTypeTbl obj);

	String deletePT(int pTId);

}
