package com.hms.organdonation.service;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganRequestDto;

public interface OrganCrossMatchService {

	int saveOrganCrossMatch(OrganCrossMatchDto obj, Integer patientId,
			Integer treatmentId,Integer organId,Integer stockDiscardId,Integer rquestId, MultipartFile[] testResultDocument, HttpServletRequest request);

	OrganCrossMatchDto editOrganCrossMatch(Integer organCrossMatchId, HttpServletRequest request);

	boolean deleteOrganCrossMatch(Integer organCrossMatchId,
			HttpServletRequest request);

	List<OrganCrossMatchDto> crossMatchAutoSuggestion(Integer organCrossMatchId,
			String callFrom);

	List<OrganCrossMatchDto> getAllOrganCrossMatchList(HttpServletRequest request,String fromDate,String lastDate);
	
}
