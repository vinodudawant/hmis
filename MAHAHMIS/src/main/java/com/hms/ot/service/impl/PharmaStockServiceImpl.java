package com.hms.ot.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ot.dao.PharmaStockDao;
import com.hms.ot.service.PharmaStockService;
import com.hms.pharmacy.pojo.PharmaStockDTO;

@Service
@Transactional
public class PharmaStockServiceImpl implements PharmaStockService {
	@Autowired
	PharmaStockDao dao;

	@Override
	public List<PharmaStockDTO> getPharmaStockDetails(int productId, String subStoreName) {
		
		return dao.getPharmaStockDetails(productId, subStoreName);
	}

}
