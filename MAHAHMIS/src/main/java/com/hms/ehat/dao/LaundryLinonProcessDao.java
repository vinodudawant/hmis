package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.LaundryLinonProcessDto;
import com.hms.ehat.dto.LaundryLinonSubDeptDto;
import com.hms.ehat.dto.ProcessCsdDto;

public interface LaundryLinonProcessDao {

	int saveOrUpdateProcessingMaster(LaundryLinonProcessDto procDto);

	List<LaundryLinonProcessDto> getProcessingMasterData();

	boolean deleteProcessyRecord(Integer processId, Integer userId);

	int saveOrUpdateSubDeptMaster(LaundryLinonSubDeptDto subDepDto);

	List<LaundryLinonSubDeptDto> getSubMasterMasterData();

	boolean deleteSubDeptRecord(Integer subDeptId, Integer userId);

	List<LaundryLinonProcessDto> autoSuggestionForProcess(String letter);

	List<LaundryLinonSubDeptDto> autoSuggestionForSubDept(String letter);

	int saveOrUpdateProcessingMasterCsd(ProcessCsdDto procDto);

	List<ProcessCsdDto> getProcessingMasterDataCsd();

	List<ProcessCsdDto> autoSuggestionForProcessCsd(String letter);

	boolean deleteProcessyRecordCsd(Integer processId, Integer userId);

}
