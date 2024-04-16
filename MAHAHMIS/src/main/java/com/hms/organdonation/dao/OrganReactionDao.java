package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganReactionDto;

public interface OrganReactionDao {

	List<OrganDonorCheckupListDto> searchDonorFromCheckList(String findText, String callFrom);

	List<OrganCollectionDto> getContainerListByChckpId(Integer checkupListId, HttpServletRequest request);

	int saveOrganReaction(OrganReactionDto obj, Integer organCollectionId, Integer organDonorId, Integer treatmentId,
			Integer checkupListId, HttpServletRequest request);

	List<OrganReactionDto> getAllOrganReactions(HttpServletRequest request,String fromDate,String lastDate);

	OrganReactionDto editDonorReactions(Integer organReactionId, HttpServletRequest request);

	List<OrganCollectionDto> getContainerListNew(HttpServletRequest request);
	List<OrganCollectionDto> getContainerListfororgan_reaction(HttpServletRequest request);

	List<OrganReactionDto> organReactionAutoSuggestion(HttpServletRequest request,Integer organReactionId, String callFrom);

	OrganReactionDto getOrganReactionById(Integer organReactionId);
}
