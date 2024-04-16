package com.hms.opdbill.dto;

import java.util.List;

public class TestAutoSuggestionDto {

	private int masterconfigid;

	private int unitid;

	private int dept_id;

	private int categoryid;

	private String categoryName;
			
	private String isCategory;

	private Double categorycharges;

	private String categorydeleted;

	private int serviceid;
		
	private String serviceName;
		
	private String servicdeleted;
		
	private String iscombination; 
	
	private String templateWise; 
	
	private String isModify;

	private String codeName;
	
	private double configCharges;

	private Double stockqty;

	private int batchid;

	private int stockid;
	
	private int userId;
	
	private List<TestAutoSuggestionDto> lstService;

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

	public String getIsModify() {
		return isModify;
	}

	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public double getConfigCharges() {
		return configCharges;
	}

	public void setConfigCharges(double configCharges) {
		this.configCharges = configCharges;
	}

	public Double getStockqty() {
		return stockqty;
	}

	public void setStockqty(Double stockqty) {
		this.stockqty = stockqty;
	}

	public int getBatchid() {
		return batchid;
	}

	public void setBatchid(int batchid) {
		this.batchid = batchid;
	}

	public int getStockid() {
		return stockid;
	}

	public void setStockid(int stockid) {
		this.stockid = stockid;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<TestAutoSuggestionDto> getLstService() {
		return lstService;
	}

	public void setLstService(List<TestAutoSuggestionDto> lstService) {
		this.lstService = lstService;
	}

	@Override
	public String toString() {
		return "TestAutoSuggestionDto [masterconfigid=" + masterconfigid + ", unitid=" + unitid + ", dept_id=" + dept_id
				+ ", categoryid=" + categoryid + ", categoryName=" + categoryName + ", isCategory=" + isCategory
				+ ", categorycharges=" + categorycharges + ", categorydeleted=" + categorydeleted + ", serviceid="
				+ serviceid + ", serviceName=" + serviceName + ", servicdeleted=" + servicdeleted + ", iscombination="
				+ iscombination + ", templateWise=" + templateWise + ", isModify=" + isModify + ", codeName=" + codeName
				+ ", configCharges=" + configCharges + ", stockqty=" + stockqty + ", batchid=" + batchid + ", stockid="
				+ stockid + ", userId=" + userId + ", lstService=" + lstService + "]";
	}	
	
	
	
}
