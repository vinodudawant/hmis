package com.hms.organdonation.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.organdonation.dao.OrganStockDiscardDao;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganStockDiscardDto;
import com.hms.organdonation.service.OrganStockDiscardService;

@Service
@Transactional
public class OrganStockDiscardServiceImpl implements OrganStockDiscardService {
	
	@Autowired
	OrganStockDiscardDao organStockDiscardDao;

	@Override
	public int saveOrganStockDiscard(OrganStockDiscardDto obj, Integer organDonorId,Integer organCollectionId,
			Integer organTreatmentId,Integer stockInwardId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organStockDiscardDao.saveOrganStockDiscard(obj,organDonorId,organCollectionId,organTreatmentId,stockInwardId,request);
	}

	@Override
	public OrganStockDiscardDto editOrganStockDiscard(Integer organStockDiscardId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organStockDiscardDao.editOrganStockDiscard(organStockDiscardId, request);
	}

	@Override
	public boolean deleteOrganStockDiscard(Integer organStockDiscardId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organStockDiscardDao.deleteOrganStockDiscard(organStockDiscardId, request);
	}

	@Override
	public List<OrganStockDiscardDto> stockDiscardAutoSuggestion(Integer organStockDiscardId,
			String callFrom) {
		// TODO Auto-generated method stub
		return organStockDiscardDao.stockDiscardAutoSuggestion(organStockDiscardId, callFrom);
	}

	@Override
	public List<OrganStockDiscardDto> getAllOrganStockDiscardList(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		return organStockDiscardDao.getAllOrganStockDiscardList(request, fromDate, lastDate);
	}

	@Override
	public List<OrganDonorStockInwardDto> getContainerList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organStockDiscardDao.getContainerList(request);
	}

	@Override
	public OrganDonorStockInwardDto getOrganDonorStockInwardById(Integer stockInwardId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organStockDiscardDao.getOrganDonorStockInwardById(stockInwardId,request);
	}


	

}
