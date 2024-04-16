package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hms.ehat.dao.DeptDao;
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.service.DeptService;
@Service
public class DeptServiceImpl implements DeptService {
	@Autowired
	DeptDao deptDao;
	
	//@author-Sagar Kadam -@reson-to load properties file for user access flow @date-11/July-2017//
	ResourceBundle resourceBundleEhat = ResourceBundle
			.getBundle("EhatEnterpriseConfigurationFile");
	String userAccessFlow = resourceBundleEhat.getObject(
			"userAccessFlow").toString();

	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public int  saveOrUpdateDept(DeptMasterDto deptMaster,HttpServletRequest request){
			
		String s1=request.getParameter("isclinical");
		
		if (deptMaster.getDeptId() == null)
			{
			
			if(s1.equalsIgnoreCase("N")){
				deptMaster.setIsclinical(s1);
			}
			
		 
				deptMaster.setDeptName(deptMaster.getDeptName());
				deptMaster.setDeptCode( deptMaster.getDeptCode());
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				deptMaster.setCreatedBy(userId);
				deptMaster.setCreatedBy(deptMaster.getCreatedBy());
				deptMaster.setDeleted("N");
				deptMaster.setCreatedDate(new Date(new java.util.Date()
					.getTime()));
			
				int response = deptDao.saveOrUpdateDept(deptMaster);

				return response;
			} 
		else 
			{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				deptMaster.setUpdatedBy(userId);
				deptMaster.setUpdatedBy(deptMaster.getUpdatedBy());
				deptMaster.setDeleted("N");
				deptMaster.setUpdatedDate(new Date(new java.util.Date()
				.getTime()));
				int response = deptDao.saveOrUpdateDept(deptMaster);
				if (response == 1) {
				response = 2;
			}
				return response;
	}

	}
	
	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public boolean deleteDept(Integer deptId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		return deptDao.deleteDept(deptId,userId);
	}
	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getDeptById(Integer deptId) {
		 
		return deptDao.getDeptById(deptId);
	}
	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public DeptMasterDto getAutoSuggestionDeptNames(String letter) {
		 
		return deptDao.getAutoSuggestionDeptNames(letter);
	}
	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getAllDeptLst(HttpServletRequest request) {
		
		//@author-Sagar Kadam -@reson-to load properties file for user access flow @date-11/July-2017//
		if(userAccessFlow.equalsIgnoreCase("on")){
		 
			HttpSession session = request.getSession();
			int userId = (Integer) session.getAttribute("userId1");
		 
			return deptDao.getAllDeptLstByUser(userId);
		}else{
			 
			return deptDao.getAllDeptLst();
		}
		 
		
	}
	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getDept() {
		 
		return deptDao.getDept();
	}
	/**
	 * @author: Sagar @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<DeptMasterDto> getAllDeptwithDeleted() {
		 
		return deptDao.getAllDeptwithDeleted();
	}

	/**
	 * @author: Kishor Lokhabde
	 *  @date 16_May_2017 this Methods is used to call dao methods
	 * ***/
	@Override
	@Transactional
	public Long getDeptCount() {
		// TODO Auto-generated method stub
		return deptDao.getDeptCount();
	}

	@Override
	@Transactional
	public List<DeptMasterDto> getDeptMasterListAll(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return deptDao.getAllDeptLst();
	}
	
	/** End of Departments method **/

	
	
	
}
