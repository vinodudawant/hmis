package com.hms.ipdbill.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ipdbill.dao.IpdPreviousBillDao;
import com.hms.ipdbill.dto.IpdPreviousBillDTO;
import com.hms.ipdbill.service.IpdPreviousBillService;
@Service
public class IpdPreviousBillServiceImpl implements IpdPreviousBillService {
	
	@Autowired
	IpdPreviousBillDao pbDao;
	
	@Override
	@Transactional
	public List<IpdPreviousBillDTO> autoSuggestationPreviousBillPatients(Integer unit_id, String callFrom,
			String findText, Integer startIndex) {
		// TODO Auto-generated method stub
		return pbDao.autoSuggestationPreviousBillPatients(unit_id,callFrom,findText,startIndex);
}

	@Override
	@Transactional
	public Integer getPrevBillPatCount() {
		// TODO Auto-generated method stub
		return pbDao.getPrevBillPatCount();
	}
}