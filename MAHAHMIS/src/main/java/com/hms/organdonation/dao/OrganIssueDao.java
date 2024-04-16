package com.hms.organdonation.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganIssueDto;

public interface OrganIssueDao {

	int saveOrganIssue(OrganIssueDto obj,  Integer crossMatchId,
			Integer requesterId, Integer organId,Integer stockInwardId, HttpServletRequest request);

	OrganIssueDto editOrganIssue(Integer organIssueId,
			HttpServletRequest request);

	boolean deleteOrganIssue(Integer organIssueId, HttpServletRequest request);

	List<OrganIssueDto> issueAutoSuggestion(Integer organIssueId,
			String callFrom);

	List<OrganIssueDto> getAllOrganIssueList(HttpServletRequest request,String fromDate,String lastDate);

	OrganCrossMatchDto getOrganCrossMatchById(Integer organCrossMatchId,
			HttpServletRequest request);

	List<OrganDonorStockInwardDto> getAllOrganContainerList(Integer organId, HttpServletRequest request);
}
