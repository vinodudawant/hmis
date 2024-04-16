package com.hms.opdbill.dto;

import java.util.List;

public class TestSponsorAutoSuggestionDto {

	private int masterconfigid;

	private int unitid;
	
	private int userid;

	private int dept_id;

	private int categoryid;

	private String categoryName;

	private String isCategory;

	private Double categorycharges;
	
	private String categorydeleted;

	private int serviceid;
	
	private String isModify;

	private String serviceName;

	private String servicdeleted;
	
	private String iscombination;
	
	private String templateWise; 
	
	private double configcharges;
	
	private List<TestSponsorAutoSuggestionDto> lstService;

	public int getMasterconfigid() {
		return masterconfigid;
	}

	public void setMasterconfigid(int masterconfigid) {
		this.masterconfigid = masterconfigid;
	}

	public int getUnitid() {
		return unitid;
	}

	public void setUnitid(int unitid) {
		this.unitid = unitid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public int getDept_id() {
		return dept_id;
	}

	public void setDept_id(int dept_id) {
		this.dept_id = dept_id;
	}

	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}

	public Double getCategorycharges() {
		return categorycharges;
	}

	public void setCategorycharges(Double categorycharges) {
		this.categorycharges = categorycharges;
	}

	public String getCategorydeleted() {
		return categorydeleted;
	}

	public void setCategorydeleted(String categorydeleted) {
		this.categorydeleted = categorydeleted;
	}

	public int getServiceid() {
		return serviceid;
	}

	public void setServiceid(int serviceid) {
		this.serviceid = serviceid;
	}

	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public String getServicdeleted() {
		return servicdeleted;
	}

	public void setServicdeleted(String servicdeleted) {
		this.servicdeleted = servicdeleted;
	}

	public String getIscombination() {
		return iscombination;
	}

	public void setIscombination(String iscombination) {
		this.iscombination = iscombination;
	}

	public String getTemplateWise() {
		return templateWise;
	}

	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}

	public double getConfigcharges() {
		return configcharges;
	}

	public void setConfigcharges(double configcharges) {
		this.configcharges = configcharges;
	}

	public List<TestSponsorAutoSuggestionDto> getLstService() {
		return lstService;
	}

	public void setLstService(List<TestSponsorAutoSuggestionDto> lstService) {
		this.lstService = lstService;
	}
}
