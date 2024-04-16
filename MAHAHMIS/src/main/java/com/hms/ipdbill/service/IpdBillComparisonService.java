package com.hms.ipdbill.service;

import java.util.List;

import com.hms.ipdbill.dto.BillComparisonDto;

public interface IpdBillComparisonService {


	List<BillComparisonDto> ipdBillComparison(Integer unit_id, String callFrom, String findText, int wardType,
			int wardName);

}
