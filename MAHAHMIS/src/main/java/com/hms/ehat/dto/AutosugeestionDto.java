package com.hms.ehat.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;
@Entity 
@Immutable
@Table(name = "ehat_view_service_details")
public class AutosugeestionDto implements Serializable{
	

	@Column(name = "master_config_id")
	private int masterconfigid;


	@Column(name = "unit_id")
	private int unitid;

	@Column(name = "dept_id")
	private int dept_id;

	@Id
	@Column(name = "id")
	private int categoryid;


	@Column(name = "category_name")
	private String categoryName;
			
	@Column(name = "iscategory")
	private String isCategory;


	@Column(name = "category_charges")
	private Double categorycharges;


	@Column(name = "category_deleted")
	private String categorydeleted;

		
	@Column(name = "service_id")
	private int serviceid;
		
	@Column(name = "service_name")
	private String serviceName;
		
	@Column(name = "service_deleted")
	private String servicdeleted;
		
	@Column(name = "iscombination")
	private String iscombination; 
	
	// Added by kishor on 3-march-18
	@Column(name = "isModify")
	private String isModify;

	//Added by Laxman on 31-Jan-2018
	@Column(name = "code_name")
	private String codeName;
	
	@Transient
	private List<AutosugeestionDto> lstService;	
	@Transient
	private double configCharges;
	@Transient
	private Double stockqty;
	@Transient
	private int batchid;
	@Transient
	private int stockid;
	
	//Added By Badrinath
	@Transient
	private Double unitPrice;
	
	@Transient
	private BigDecimal currentSubInventoryStockUpdated;
	
	@Transient
	private BigDecimal availableQty;
	
	@Transient
	private String batchCode;
	
	@Transient
	private String batchExp;
	
	public BigDecimal getAvailableQty() {
		return availableQty;
	}
	public void setAvailableQty(BigDecimal availableQty) {
		this.availableQty = availableQty;
	}
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}
	public String getBatchExp() {
		return batchExp;
	}
	public void setBatchExp(String batchExp) {
		this.batchExp = batchExp;
	}
	public Double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public BigDecimal getCurrentSubInventoryStockUpdated() {
		return currentSubInventoryStockUpdated;
	}
	public void setCurrentSubInventoryStockUpdated(BigDecimal currentSubInventoryStockUpdated) {
		this.currentSubInventoryStockUpdated = currentSubInventoryStockUpdated;
	}
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
	public List<AutosugeestionDto> getLstService() {
		return lstService;
	}
	public void setLstService(List<AutosugeestionDto> lstService) {
		this.lstService = lstService;
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
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public String getIsModify() {
		return isModify;
	}
	public void setIsModify(String isModify) {
		this.isModify = isModify;
	}
	
	@Column(name = "template_wise")
	private String templateWise;

	public String getTemplateWise() {
		return templateWise;
	}

	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}
}
