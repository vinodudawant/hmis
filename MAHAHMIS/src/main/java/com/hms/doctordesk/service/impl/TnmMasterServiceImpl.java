package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.TnmMasterDao;
import com.hms.doctordesk.dto.TnmGroupMaster;
import com.hms.doctordesk.dto.TnmMasterDto;
import com.hms.doctordesk.service.TnmMasterService;

@Service
@Transactional
public class TnmMasterServiceImpl implements TnmMasterService{

	@Autowired
	TnmMasterDao tnmMasterDao;
	
	@Override
	public String saveOnTnmMaster(String tnmMaster, HttpServletRequest request,String tabletnmNmData,String tabletnmMetaData) {
		// TODO Auto-generated method stub
		return tnmMasterDao.saveOnTnmMaster(tnmMaster, request,tabletnmNmData,tabletnmMetaData);
	}

	@Override
	public List<TnmMasterDto> getTnmDetails(int bodypartid,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return tnmMasterDao.getTnmDetails(bodypartid,request);
	}

	@Override
	public String saveTnmGroupMaster(TnmGroupMaster tnmGroupMaster,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return tnmMasterDao.saveTnmGroupMaster(tnmGroupMaster, request);
	}

	@Override
	public List<TnmGroupMaster> getTmnListById(int id) {
		// TODO Auto-generated method stub
		return tnmMasterDao.getTmnListById(id);
	}

	@Override
	public List<TnmGroupMaster> getTnmGroupList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return tnmMasterDao.getTnmGroupList(request);
	}

	@Override
	public String deleteTnmGroupMaster(int id) {
		// TODO Auto-generated method stub
		return tnmMasterDao.deleteTnmGroupMaster(id);
	}

	@Override
	public String getGroupNameByTnmStage(String groupStage) {
		
		return tnmMasterDao.getGroupNameByTnmStage(groupStage);
	}

}