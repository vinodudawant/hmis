package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.BranchMaster;

public interface BranchService {

	List<BranchMaster> getBranch();

	boolean saveOrUpdateBranch(BranchMaster branchMaster);

	boolean deleteBranch(Integer branchId);

	List<BranchMaster> getAutoSuggestionBranchNames(String letter);

	List<BranchMaster> getBranchById(Integer branchId);

}
