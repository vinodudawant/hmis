package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.TicketManagementDaoM;
import com.hms.inventory.dto.AssetComplaintMasterDto;
import com.hms.inventory.service.TicketManagementServiceM;


@Service
@Transactional
public class TicketManagementServiceImplM implements TicketManagementServiceM{

	@Autowired
	private TicketManagementDaoM ticketManagementDaoM;
	
	@Override
	public AssetComplaintMasterDto editAssetTicketManagement(Integer id) {
		return ticketManagementDaoM.editAssetTicketManagement(id);
	}

	@Override
	public Integer saveAssetTicketManagement(String assetTicketManagementSlaveDetails,
			AssetComplaintMasterDto assetComplaintMasterDto,
			HttpServletRequest request) {
		return ticketManagementDaoM.saveAssetTicketManagement(assetTicketManagementSlaveDetails, assetComplaintMasterDto, request);
	}

	@Override
	public List<AssetComplaintMasterDto> universalSearchAssetTicketManagement(
			String productCategoryTicket, String assetNameTicket,
			String fromDateTicket, String toDateTicket,Integer department, Integer hospitalDept,String searchBy,String callFrom,
			HttpServletRequest request) {
		return ticketManagementDaoM.universalSearchAssetTicketManagement(productCategoryTicket, assetNameTicket, fromDateTicket, toDateTicket, department, hospitalDept, searchBy,callFrom, request);
	}

	@Override
	public List<AssetComplaintMasterDto> getAllBreakdownRecords(
			HttpServletRequest request) {
		return ticketManagementDaoM.getAllBreakdownRecords(request);
	}

}
