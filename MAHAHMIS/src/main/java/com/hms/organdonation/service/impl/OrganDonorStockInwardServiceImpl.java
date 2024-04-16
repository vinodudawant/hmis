package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.organdonation.dao.OrganDonorStockInwardDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganIssueDto;
import com.hms.organdonation.service.OrganDonorStockInwardService;

@Service
@Transactional
public class OrganDonorStockInwardServiceImpl implements OrganDonorStockInwardService {
	
	@Autowired
	OrganDonorStockInwardDao organDonorStockInwardDao;

	@Override
	public int saveOrganDonorStockInward(OrganDonorStockInwardDto obj,
			Integer organDonorId, Integer treatmentId, Integer organCollectionId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.saveOrganDonorStockInward(obj, organDonorId, treatmentId, organCollectionId, request);
	}

	@Override
	public OrganDonorStockInwardDto editOrganDonorStockInward(
			Integer stockInwardId) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.editOrganDonorStockInward(stockInwardId);
	}

	@Override
	public List<OrganDonorStockInwardDto> getAllOrganDonorStockInward(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getAllOrganDonorStockInward(request, fromDate, lastDate);
	}

	@Override
	public boolean deleteOrganDonorStockInward(Integer stockInwardId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.deleteOrganDonorStockInward(stockInwardId, request);
	}

	@Override
	public List<OrganDonorStockInwardDto> organDonorStockInwardAutoSuggestion(
			Integer stockInwardId, String callFrom) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.organDonorStockInwardAutoSuggestion(stockInwardId, callFrom);
	}

	@Override
	public OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getOrganDonorById(organDonorId, request);
	}

	@Override
	public OrganDonorCheckupListDto getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(
			Integer organDonorId, Integer checkupListId, Integer treatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(organDonorId, checkupListId, treatmentId, request);
	}

	@Override
	public List<OrganCollectionDto> getContainerList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getContainerList(request);
	}

	@Override
	public OrganCollectionDto getOrganCollectionById(Integer organCollectionId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getOrganCollectionById(organCollectionId, request);
	}
	
	@Override
	public OrganCollectionDto getOnSelectOrganCollectionById(Integer organCollectionId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getOnSelectOrganCollectionById(organCollectionId, request);
	}

	@Override
	public boolean updateOrganReactionDto(Integer treatmentId, Integer organCollectionId) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.updateOrganReactionDto(treatmentId, organCollectionId);
	}
	
	//Added By Annapurna
	@Override
	public List<OrganCollectionDto> getContainerListForOrgan_StockInward(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getContainerListForOrgan_StockInward(request);
	}

	@Override
	public OrganCrossMatchDto getOrganContainerNameById(Integer id,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organDonorStockInwardDao.getOrganContainerNameById(id, request);
	}

	

}
