package com.hms.organdonation.service;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganStockDiscardDto;

public interface OrganStockDiscardService {

	int saveOrganStockDiscard(OrganStockDiscardDto obj, Integer organDonorId,Integer organCollectionId,
			Integer organTreatmentId,Integer stockInwardId, HttpServletRequest request);

	boolean deleteOrganStockDiscard(Integer organStockDiscardId,
			HttpServletRequest request);

	OrganStockDiscardDto editOrganStockDiscard(Integer organStockDiscardId,
			HttpServletRequest request);

	List<OrganStockDiscardDto> stockDiscardAutoSuggestion(
			Integer organStockDiscardId, String callFrom);

	List<OrganStockDiscardDto> getAllOrganStockDiscardList(HttpServletRequest request,String fromDate,String lastDate);

	List<OrganDonorStockInwardDto> getContainerList(HttpServletRequest request);

	OrganDonorStockInwardDto getOrganDonorStockInwardById(Integer stockInwardId,HttpServletRequest request);

}
