package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.organdonation.dto.OrganCollectionDto;

public interface OrganCollectionDao {

	int saveOrganCollection(OrganCollectionDto obj, Integer organDonorId, Integer treatmentId, Integer checkupListId,
			MultipartFile[] organCollectionDocument, HttpServletRequest request);

	List<OrganCollectionDto> getAllCollectedOrgans(HttpServletRequest request,String fromDate,String lastDate);

	OrganCollectionDto getCollectedOrganById(Integer organCollectionId);

	boolean deleteCollectedOrganById(Integer organCollectionId, HttpServletRequest request);

	List<OrganCollectionDto> serachOrganContainerDetailsById(Integer searchParam);

	List<OrganCollectionDto> organCollectionAutoSuggestion(Integer organCollectionId, String callFrom);

	OrganCollectionDto editCollectedOrganById(Integer organCollectionId);
}
