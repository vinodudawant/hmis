package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.pharmacy.dao.BranchDao;
import com.hms.pharmacy.pojo.BranchMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.service.BranchService;

@Service
public class BranchServiceImpl implements BranchService {

	@Autowired
	BranchDao branchDao;

	@Override
	@Transactional
	public List<BranchMaster> getBranch() {
		return branchDao.getBranch();
	}

	@Override
	@Transactional
	public boolean saveOrUpdateBranch(BranchMaster branchMaster) {
		
		if(branchMaster.getBranchId()==null)
		{
			branchMaster.setBranchDeleteFlag(0);
			branchMaster.setBranchAddDate(new Date(new java.util.Date()
					.getTime()));
			branchMaster.setBranchUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
			
			
			BranchMaster branchMaster2= branchDao.getBranchByIdForDate(branchMaster.getBranchId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			
			branchMaster.setBranchAddDate(branchMaster2.getBranchAddDate());
			branchMaster.setBranchDeleteFlag(0);
			branchMaster.setBranchUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
			
				
		if (branchDao.saveOrUpdateBranch(branchMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteBranch(Integer branchId) {
		return branchDao.deleteBranch(branchId);
	}

	@Override
	@Transactional
	public List<BranchMaster> getAutoSuggestionBranchNames(String letter) {
		return branchDao.getAutoSuggestionBranchNames(letter);
	}

	@Override
	@Transactional
	public List<BranchMaster> getBranchById(Integer branchId) {
		return branchDao.getBranchById(branchId);
	}
}
