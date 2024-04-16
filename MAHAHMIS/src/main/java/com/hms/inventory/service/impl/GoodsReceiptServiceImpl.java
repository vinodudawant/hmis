package com.hms.inventory.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.inventory.dao.GoodsReceiptDao;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;
import com.hms.inventory.service.GoodsReceiptService;

@Service
@Transactional
public class GoodsReceiptServiceImpl implements GoodsReceiptService{

	@Autowired
	GoodsReceiptDao goodsReceiptDao;

	@Override
	public List<MrnMasterDTO> getMrnData() {
		// TODO Auto-generated method stub
		return goodsReceiptDao.getMrnData();
	}

	@Override
	public List<MrnMasterDTO> getMrnDataById(int id) {
		// TODO Auto-generated method stub
		return goodsReceiptDao.getMrnDataById(id);
	}

	@Override
	public List<MrnMasterItemInfoDTO> getMrnDataForReport(Integer id) {
		// TODO Auto-generated method stub
		return goodsReceiptDao.getMrnDataForReport(id);
	}

	
	

	
}
