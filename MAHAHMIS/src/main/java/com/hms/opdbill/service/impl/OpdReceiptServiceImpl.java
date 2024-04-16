package com.hms.opdbill.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.opdbill.dao.OpdReceiptDao;
import com.hms.opdbill.dto.OpdReceiptMasterDto;
import com.hms.opdbill.service.OpdReceiptService;

@Service
@Transactional
public class OpdReceiptServiceImpl implements OpdReceiptService {

	@Autowired
	OpdReceiptDao opdReceiptDao;
	
	@Override
	public OpdReceiptMasterDto saveOpdBillReceipt(OpdReceiptMasterDto objDto) {	
		
		return opdReceiptDao.saveOpdBillReceipt(objDto);
	}
}
