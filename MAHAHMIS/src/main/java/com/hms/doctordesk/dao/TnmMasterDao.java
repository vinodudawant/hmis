package com.hms.doctordesk.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.TnmGroupMaster;
import com.hms.doctordesk.dto.TnmMasterDto;

import java.util.*;

public interface TnmMasterDao {

	String saveOnTnmMaster(String tnmMaster ,HttpServletRequest request,String tabletnmNmData,String tabletnmMetaData);

	List<TnmMasterDto> getTnmDetails(int bodypartid,HttpServletRequest request);
	
	String saveTnmGroupMaster(TnmGroupMaster tnmGroupMaster,HttpServletRequest request);
	
	List<TnmGroupMaster> getTmnListById(int id);
	
	List<TnmGroupMaster> getTnmGroupList(HttpServletRequest request);
	
	String deleteTnmGroupMaster(int id);
	
	String getGroupNameByTnmStage(String  groupStage);
	
}