package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.AccessMgmtDao;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.UserModule;
import com.hms.pharmacy.service.AccessMgmtService;

@Service
public class AccessMgmtServiceImpl implements AccessMgmtService{
	
	@Autowired
	AccessMgmtDao accessMgmtDao;
	
	@Override
	@Transactional
	public List<UserModule> getUserModules(String type) {
		return accessMgmtDao.getUserModules(type);
	}

	@Override
	@Transactional
	public boolean saveOrUpdateUserModule(UserModule userModule) {
		if(userModule.getModuleId()==null)
		{	
			userModule.setModuleAddDate(new Date(new java.util.Date()
			.getTime()));
			userModule.setModuleUpdateDate(new Date(new java.util.Date()
			.getTime()));
			return accessMgmtDao.saveOrUpdateUserModule(userModule);
		}
		else
		{
			return accessMgmtDao.saveOrUpdateUserModule(userModule);
		}
	}

	@Override
	@Transactional
	public boolean saveModules(String userId, List<String> accessList) {
		JSONArray jsonArray=accessMgmtDao.getUserAccessByUserId(userId);
		
		List<String> deactiveList=new ArrayList<String>();
		
		for(int i=0;i<jsonArray.length();i++)
		{
			try
			{
				JSONObject jsonObject=(JSONObject) jsonArray.get(i);
				String moduleId=(String) jsonObject.get("moduleId");
				if(accessList.contains(moduleId))
				{
					
				}
				else
				{
					deactiveList.add(moduleId);
				}
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}
		
		
		
		if(jsonArray.length()==0)
		{
			accessMgmtDao.saveUserAccessDetails(userId,accessList,"");
		}
		else
		{
			for(String accessId:accessList)
			{
				String result=accessMgmtDao.getDataByUserAccessId(userId,accessId);
				if(result.equals("1"))
				{
					List<String> innerAccessList=new ArrayList<String>();
					innerAccessList.add(accessId);
					accessMgmtDao.updateUserAccessDetails(userId,innerAccessList,"active");
				}
				if(result.equals(""))
				{
					List<String> innerAccessList=new ArrayList<String>();
					innerAccessList.add(accessId);
					accessMgmtDao.saveUserAccessDetails(userId,innerAccessList,"single");
				}
				else
				{
					
				}
			}
			
			
				accessMgmtDao.updateUserAccessDetails(userId,deactiveList,"deactive");
			
			
		}
		return true;
	}

	@Override
	@Transactional
	public JSONArray getUserAccessModuleList() {
		return accessMgmtDao.getUserAccessModuleList();
	}

	@Override
	@Transactional
	public JSONArray getUserAccessDetailsById(String userId) {
		return accessMgmtDao.getUserAccessDetailsById(userId);
	}

	@Override
	@Transactional
	public List<UserModule> getAutoSuggestionModuleNames(String letter) {
		// TODO Auto-generated method stub
		return accessMgmtDao.getAutoSuggestionModuleNames(letter);
	}
	
	@Override
	@Transactional
	public List<UserModule> getModuleById(Integer moduleId) {
		// TODO Auto-generated method stub
		return accessMgmtDao.getModuleById(moduleId);
	}
	
	@Override
	@Transactional
	public Boolean deleteModule(Integer catId) {
		// TODO Auto-generated method stub
		
		return accessMgmtDao.deleteModule(catId);
	}

	@Override
	@Transactional
	public List<UserModule> getUserList(String string) {
		// TODO Auto-generated method stub
		return accessMgmtDao.getUserList(string);
	}
}
