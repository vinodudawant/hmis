package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AutoSuggestionBranch {
	
	private Integer branchId;
	
	
	private String branchName;
	
	
	private String branchAddress;
	
	private Integer  branchDeleteFlag;
	
	private Date branchUpdateDate;
	
	private String branchPhone;
	
	private String branchMobileNum;
	
	private String branchEmailId;
	
	private List<BankMaster> bankMasters = new ArrayList<BankMaster>();

	
	private Date branchAddDate;
	
	public Date getBranchAddDate() {
		return branchAddDate;
	}


	public void setBranchAddDate(Date branchAddDate) {
		this.branchAddDate = branchAddDate;
	}
	
	public String getBranchPhone() {
		return branchPhone;
	}


	public void setBranchPhone(String branchPhone) {
		this.branchPhone = branchPhone;
	}


	public String getBranchMobileNum() {
		return branchMobileNum;
	}


	public void setBranchMobileNum(String branchMobileNum) {
		this.branchMobileNum = branchMobileNum;
	}


	public String getBranchEmailId() {
		return branchEmailId;
	}


	public void setBranchEmailId(String branchEmailId) {
		this.branchEmailId = branchEmailId;
	}

	public List<BankMaster> getBankMasters() {
		return bankMasters;
	}

	
	public void setBankMasters(List<BankMaster> bankMasters) {
		this.bankMasters = bankMasters;
	}

	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getBranchAddress() {
		return branchAddress;
	}

	public void setBranchAddress(String branchAddress) {
		this.branchAddress = branchAddress;
	}

	public Integer getBranchDeleteFlag() {
		return branchDeleteFlag;
	}

	public void setBranchDeleteFlag(Integer branchDeleteFlag) {
		this.branchDeleteFlag = branchDeleteFlag;
	}

	public Date getBranchUpdateDate() {
		return branchUpdateDate;
	}

	public void setBranchUpdateDate(Date branchUpdateDate) {
		this.branchUpdateDate = branchUpdateDate;
	}
	
	public Integer getBranchId() {
		return branchId;
	}
}
