package com.hms.organdonation.service;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganIssueDto;

public interface OrganDonorStockInwardService {

	int saveOrganDonorStockInward(OrganDonorStockInwardDto obj,
			Integer organDonorId, Integer treatmentId, Integer checkupListId,
			HttpServletRequest request);
	OrganDonorStockInwardDto editOrganDonorStockInward(Integer stockInwardId);
	
	List<OrganDonorStockInwardDto> getAllOrganDonorStockInward(	HttpServletRequest request,String fromDate,String lastDate);
	
	boolean deleteOrganDonorStockInward(Integer stockInwardId,	HttpServletRequest request);

	

	List<OrganDonorStockInwardDto> organDonorStockInwardAutoSuggestion(
			Integer stockInwardId,String callFrom);

	OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId, HttpServletRequest request);

	OrganDonorCheckupListDto getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(
			Integer organDonorId, Integer checkupListId, Integer treatmentId,
			HttpServletRequest request);
	List<OrganCollectionDto> getContainerList(HttpServletRequest request);
	OrganCollectionDto getOrganCollectionById(Integer organCollectionId,
			HttpServletRequest request);
	
	boolean updateOrganReactionDto(Integer treatmentId, Integer organCollectionId);
	OrganCollectionDto getOnSelectOrganCollectionById(Integer organCollectionId, HttpServletRequest request);
	
	List<OrganCollectionDto> getContainerListForOrgan_StockInward(HttpServletRequest request);
	
 public	OrganCrossMatchDto getOrganContainerNameById(Integer id, HttpServletRequest request);


	

}
