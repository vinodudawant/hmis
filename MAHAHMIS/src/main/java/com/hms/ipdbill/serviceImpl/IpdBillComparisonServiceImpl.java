package com.hms.ipdbill.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ipdbill.dao.IpdBillComparisonDao;
import com.hms.ipdbill.dto.BillComparisonDto;
import com.hms.ipdbill.service.IpdBillComparisonService;
@Service
public class IpdBillComparisonServiceImpl implements IpdBillComparisonService{


	@Autowired
	IpdBillComparisonDao ipdBillComparisonDao;
	
	@Override
	@Transactional
	public List<BillComparisonDto> ipdBillComparison(Integer unit_id, String callFrom,
			String findText,int wardType,int wardName) {
		// TODO Auto-generated method stub
		return ipdBillComparisonDao.ipdBillComparison(unit_id,callFrom,findText,wardType,wardName);
}

}
