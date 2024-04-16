package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.OpeningStockDaoM;
import com.hms.inventory.dto.OpeningStockDto;
import com.hms.inventory.service.OpeningStockServiceM;

@Service
@Transactional
public class OpeningStockServiceImplM implements OpeningStockServiceM{
	
    @Autowired
	private OpeningStockDaoM openingStockDaoM;
	
	@Override
	public int saveOpeningStock(OpeningStockDto openingStockDto,
			String openingStockItemSlaveDetails,String batchStockSlaveDetails,String itemAssetMaintenanceOpeningInfoDtoDetails,String itemAssetMaintenanceInfoMasterDtoDetails,HttpServletRequest request) {
		return openingStockDaoM.saveOpeningStock(openingStockDto, openingStockItemSlaveDetails,batchStockSlaveDetails,itemAssetMaintenanceOpeningInfoDtoDetails,itemAssetMaintenanceInfoMasterDtoDetails,request);
	}

	@Override
	public List<OpeningStockDto> getAllOpeningStockRecords(
			HttpServletRequest request) {
		return openingStockDaoM.getAllOpeningStockRecords(request);
	}

	@Override
	public OpeningStockDto getOpeningStockPagination(Integer startIndex,HttpServletRequest request) {
		return openingStockDaoM.getOpeningStockPagination(startIndex,request);
	}

	@Override
	public Integer getPageCountAllOpeningStock(HttpServletRequest request) {
		return openingStockDaoM.getPageCountAllOpeningStock(request);
	}

}
