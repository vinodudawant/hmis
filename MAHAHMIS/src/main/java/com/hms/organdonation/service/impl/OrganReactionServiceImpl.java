package com.hms.organdonation.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.organdonation.dao.OrganReactionDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganReactionDto;
import com.hms.organdonation.service.OrganReactionService;


@Service
@Transactional
public class OrganReactionServiceImpl implements OrganReactionService {
	
	@Autowired
	OrganReactionDao organReactionDao;

	@Override
	public List<OrganDonorCheckupListDto> searchDonorFromCheckList(String findText, String callFrom) {
		return organReactionDao.searchDonorFromCheckList(findText, callFrom);
	}

	@Override
	public List<OrganCollectionDto> getContainerListByChckpId(Integer checkupListId, HttpServletRequest request) {
		return organReactionDao.getContainerListByChckpId(checkupListId, request);
	}

	@Override
	public int saveOrganReaction(OrganReactionDto obj, Integer organCollectionId, Integer organDonorId,
			Integer treatmentId, Integer checkupListId, HttpServletRequest request) {
		
		return organReactionDao.saveOrganReaction(obj, organCollectionId, organDonorId, treatmentId, checkupListId, request);
	}

	@Override
	public List<OrganReactionDto> getAllOrganReactions(HttpServletRequest request,String fromDate,String lastDate) {
		return organReactionDao.getAllOrganReactions(request, fromDate, lastDate);
	}

	@Override
	public OrganReactionDto editDonorReactions(Integer organReactionId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organReactionDao.editDonorReactions(organReactionId,request);
	}

	@Override
	public List<OrganCollectionDto> getContainerListNew(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organReactionDao.getContainerListNew(request);
	}
//Added By Annapurna

	@Override
	public List<OrganReactionDto> organReactionAutoSuggestion(HttpServletRequest request,Integer organReactionId, String callFrom) {
		// TODO Auto-generated method stub
		return organReactionDao.organReactionAutoSuggestion(request,organReactionId, callFrom);
	}
	
	@Override
	public OrganReactionDto getOrganReactionById(Integer organReactionId) {
		return organReactionDao.getOrganReactionById(organReactionId);
	}
	//Added By Annapurna
	@Override
	public List<OrganCollectionDto> getContainerListfororgan_reaction(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organReactionDao.getContainerListfororgan_reaction(request);
	}
	
}
