package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.BranchMaster;
import com.hms.pharmacy.pojo.CompanyMaster;

public interface BranchDao {

	List<BranchMaster> getBranch();

	boolean saveOrUpdateBranch(BranchMaster branchMaster);

	boolean deleteBranch(Integer branchId);

	List<BranchMaster> getAutoSuggestionBranchNames(String letter);

	List<BranchMaster> getBranchById(Integer branchId);
	
	BranchMaster getBranchByIdForDate(Integer branchId);

}
