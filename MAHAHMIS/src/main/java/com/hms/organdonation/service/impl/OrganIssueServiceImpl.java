package com.hms.organdonation.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.organdonation.dao.OrganIssueDao;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganIssueDto;
import com.hms.organdonation.service.OrganIssueService;

@Service
@Transactional
public class OrganIssueServiceImpl implements OrganIssueService {
	
	@Autowired
	OrganIssueDao organIssueDao;

	@Override
	public int saveOrganIssue(OrganIssueDto obj, Integer crossMatchId,
			Integer requesterId, Integer organId,Integer stockInwardId,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organIssueDao.saveOrganIssue(obj,crossMatchId,requesterId,organId,stockInwardId,request);
	}

	@Override
	public OrganIssueDto editOrganIssue(Integer organIssueId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organIssueDao.editOrganIssue(organIssueId, request);
	}

	@Override
	public boolean deleteOrganIssue(Integer organIssueId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organIssueDao.deleteOrganIssue(organIssueId, request);
	}

	@Override
	public List<OrganIssueDto> issueAutoSuggestion(Integer organIssueId,
			String callFrom) {
		// TODO Auto-generated method stub
		return organIssueDao.issueAutoSuggestion(organIssueId, callFrom);
	}

	@Override
	public List<OrganIssueDto> getAllOrganIssueList(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		return organIssueDao.getAllOrganIssueList(request, fromDate, lastDate);
	}

	@Override
	public OrganCrossMatchDto getOrganCrossMatchById(Integer requesterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organIssueDao.getOrganCrossMatchById(requesterId, request);
	}

	@Override
	public List<OrganDonorStockInwardDto> getAllOrganContainerList(Integer organId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return organIssueDao.getAllOrganContainerList(organId, request);
	}


	

}
