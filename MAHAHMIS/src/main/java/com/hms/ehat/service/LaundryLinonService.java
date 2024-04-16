package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.LaundryLinonProcessDto;
import com.hms.ehat.dto.LaundryLinonSubDeptDto;
import com.hms.ehat.dto.ProcessCsdDto;

public interface LaundryLinonService {

	int saveOrUpdateProcessingMaster(LaundryLinonProcessDto procDto,
			HttpServletRequest request);

	List<LaundryLinonProcessDto> getProcessingMasterData();

	boolean deleteProcessyRecord(Integer processId, HttpServletRequest request);

	int saveOrUpdateSubDeptMaster(LaundryLinonSubDeptDto subDepDto,
			HttpServletRequest request);

	List<LaundryLinonSubDeptDto> getSubMasterMasterData();

	boolean deleteSubDeptRecord(Integer subDeptId, HttpServletRequest request);

	List<LaundryLinonProcessDto> autoSuggestionForProcess(String letter);

	List<LaundryLinonSubDeptDto> autoSuggestionForSubDept(String letter);

	int saveOrUpdateProcessingMasterCsd(ProcessCsdDto procDto,
			HttpServletRequest request);

	List<ProcessCsdDto> getProcessingMasterDataCsd();

	List<ProcessCsdDto> autoSuggestionForProcessCsd(String letter);

	boolean deleteProcessyRecordCsd(Integer processId,
			HttpServletRequest request);

}
