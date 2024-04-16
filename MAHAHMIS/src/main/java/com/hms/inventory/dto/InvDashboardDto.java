package com.hms.inventory.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class InvDashboardDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//added by vishnu :- item stock below minimum level reports
	private Integer id;
	private String itemName;
	private Integer minQty;
	private Integer itemQty;
	private String categoryName;//added by dayanand (11-3-2020) for getting item category Name 
	private Integer userId;
	private String subInventoryName;
	private String batchNo;
	private String batchExpiryDate;
	private Integer daysLeft;
	private String itemUOMName;
	private BigDecimal itemQuantity;
	private BigInteger daysLeftBig;
	
	private Integer currentSubInvStock;
	
	private List<InvDashboardDto> lstDashboardDto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getMinQty() {
		return minQty;
	}

	public void setMinQty(Integer minQty) {
		this.minQty = minQty;
	}

	public Integer getItemQty() {
		return itemQty;
	}

	public void setItemQty(Integer itemQty) {
		this.itemQty = itemQty;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getSubInventoryName() {
		return subInventoryName;
	}

	public void setSubInventoryName(String subInventoryName) {
		this.subInventoryName = subInventoryName;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getBatchExpiryDate() {
		return batchExpiryDate;
	}

	public void setBatchExpiryDate(String batchExpiryDate) {
		this.batchExpiryDate = batchExpiryDate;
	}

	public Integer getDaysLeft() {
		return daysLeft;
	}

	public void setDaysLeft(Integer daysLeft) {
		this.daysLeft = daysLeft;
	}

	public List<InvDashboardDto> getLstDashboardDto() {
		return lstDashboardDto;
	}

	public void setLstDashboardDto(List<InvDashboardDto> lstDashboardDto) {
		this.lstDashboardDto = lstDashboardDto;
	}

	public String getItemUOMName() {
		return itemUOMName;
	}

	public void setItemUOMName(String itemUOMName) {
		this.itemUOMName = itemUOMName;
	}

	public BigDecimal getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(BigDecimal itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public Integer getCurrentSubInvStock() {
		return currentSubInvStock;
	}

	public void setCurrentSubInvStock(Integer currentSubInvStock) {
		this.currentSubInvStock = currentSubInvStock;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public BigInteger getDaysLeftBig() {
		return daysLeftBig;
	}

	public void setDaysLeftBig(BigInteger daysLeftBig) {
		this.daysLeftBig = daysLeftBig;
	}

	@Override
	public String toString() {
		return "InvDashboardDto [id=" + id + ", itemName=" + itemName
				+ ", minQty=" + minQty + ", itemQty=" + itemQty
				+ ", categoryName=" + categoryName + ", userId=" + userId
				+ ", subInventoryName=" + subInventoryName + ", batchNo="
				+ batchNo + ", batchExpiryDate=" + batchExpiryDate
				+ ", daysLeft=" + daysLeft + ", itemUOMName=" + itemUOMName
				+ ", itemQuantity=" + itemQuantity + ", currentSubInvStock="
				+ currentSubInvStock + ", lstDashboardDto=" + lstDashboardDto
				+ "]";
	}

	
}
