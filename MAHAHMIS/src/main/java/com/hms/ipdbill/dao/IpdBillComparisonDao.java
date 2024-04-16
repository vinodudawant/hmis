package com.hms.ipdbill.dao;

import java.util.List;

import com.hms.ipdbill.dto.BillComparisonDto;

public interface IpdBillComparisonDao {

	List<BillComparisonDto> ipdBillComparison(Integer unit_id, String callFrom, String findText,int wardType,int wardName);
}
