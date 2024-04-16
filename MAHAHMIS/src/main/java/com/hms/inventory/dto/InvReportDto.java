package com.hms.inventory.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

@Component
public class InvReportDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//added by vishnu :- item stock below minimum level reports
	private Integer id;
	private String itemName;
	private Integer reOrderQty;
	private Integer maxQty;
	private Integer orderQty;
	private Integer availableStockQty;
	private Integer addedQuantity;
	private String stockSeries;//added by dayanand (11-3-2020) for getting series 
	private Date openingDate;//added by dayanand (11-3-2020) to get opening date
	private String categoryName;//added by dayanand (11-3-2020) for getting item category Name 
	private String naaration;//added by dayanand (11-3-2020) for getting narration
	private String manuFactureDate;//added by dayanand (11-3-2020) for getting item manufacture date 
	private Integer openingStockId;////added by dayanand (11-3-2020) for getting item stock id
	private BigInteger availableStockQty1;
	private Integer unitPrice1;
	
	private Double unitPrice;
	private Double discountInpercentage;
	private Double discountInRs;
	private Double discountAmt;
	private Double baseAmt;
	private Double gst;
	private Double igst;
	private Double totalTaxAmt;
	private Double totalAmt;
	private String userName;
	private Integer userId;
	private Date insertedDateAndTime;
	private String latestUOMFactor;//added by rohit for opening stock reports
	
	// this is added by Vishnu for grn reports
	private String partyMasterName;
	private String grnPurchaseInvoiceNo;
	private Integer itemId;
	private String grnDate;
	private String subInventoryName;
	private Integer totalQty;
	private BigDecimal itemQuantity;
	private BigDecimal currentSubInvStock;
	private BigInteger totalQty1;
	
	
	//added by dayanand 7-2-2020 :- expire reports variable
	private String batchNo;
	private Date expirayDate;
	private String batchExpiryDate;
	private Integer daysLeft;
	//added by rohit for stock return report
	private String stockReturnReason;
	private Integer stockReturnQty;
	private String narration;
	private Integer subInventoryStock;
	private Integer mainInventoryStock;
	private Integer generatedMrnId;	
	private String purchaseOrder;
	private String purchaseOrderNumber;
	// added by Vishnu
	private Integer requestedQty;
	private Integer canceledQty;
	private Integer pendingQty;
	private String subRemarks;
	
	private List<InvReportDto> lstInvReportDto;
	
	public Integer getTotalQty() {
		return totalQty;
	}

	public void setTotalQty(Integer totalQty) {
		this.totalQty = totalQty;
	}
	
	public BigInteger getTotalQty1() {
		return totalQty1;
	}

	public void setTotalQty1(BigInteger totalQty1) {
		this.totalQty1 = totalQty1;
	}

	public BigDecimal getCurrentSubInvStock() {
		return currentSubInvStock;
	}

	public void setCurrentSubInvStock(BigDecimal currentSubInvStock) {
		this.currentSubInvStock = currentSubInvStock;
	}

	public BigDecimal getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(BigDecimal itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public String getSubInventoryName() {
		return subInventoryName;
	}

	public void setSubInventoryName(String subInventoryName) {
		this.subInventoryName = subInventoryName;
	}

	public String getLatestUOMFactor() {
		return latestUOMFactor;
	}


	public void setLatestUOMFactor(String latestUOMFactor) {
		this.latestUOMFactor = latestUOMFactor;
	}


	public String getPartyMasterName() {
		return partyMasterName;
	}


	public String getGrnDate() {
		return grnDate;
	}


	public void setGrnDate(String grnDate) {
		this.grnDate = grnDate;
	}


	public String getGrnPurchaseInvoiceNo() {
		return grnPurchaseInvoiceNo;
	}


	public void setGrnPurchaseInvoiceNo(String grnPurchaseInvoiceNo) {
		this.grnPurchaseInvoiceNo = grnPurchaseInvoiceNo;
	}


	public Integer getItemId() {
		return itemId;
	}


	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}


	public void setPartyMasterName(String partyMasterName) {
		this.partyMasterName = partyMasterName;
	}


	public Double getUnitPrice() {
		return unitPrice;
	}


	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}


	public Double getDiscountInpercentage() {
		return discountInpercentage;
	}


	public void setDiscountInpercentage(Double discountInpercentage) {
		this.discountInpercentage = discountInpercentage;
	}


	public Double getDiscountInRs() {
		return discountInRs;
	}


	public void setDiscountInRs(Double discountInRs) {
		this.discountInRs = discountInRs;
	}


	public Double getDiscountAmt() {
		return discountAmt;
	}


	public void setDiscountAmt(Double discountAmt) {
		this.discountAmt = discountAmt;
	}


	public Double getBaseAmt() {
		return baseAmt;
	}


	public void setBaseAmt(Double baseAmt) {
		this.baseAmt = baseAmt;
	}


	public Double getGst() {
		return gst;
	}


	public void setGst(Double gst) {
		this.gst = gst;
	}


	public Double getIgst() {
		return igst;
	}


	public void setIgst(Double igst) {
		this.igst = igst;
	}


	public Double getTotalTaxAmt() {
		return totalTaxAmt;
	}


	public void setTotalTaxAmt(Double totalTaxAmt) {
		this.totalTaxAmt = totalTaxAmt;
	}


	public Double getTotalAmt() {
		return totalAmt;
	}


	public void setTotalAmt(Double totalAmt) {
		this.totalAmt = totalAmt;
	}

	public String getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(String purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public String getPurchaseOrderNumber() {
		return purchaseOrderNumber;
	}

	public void setPurchaseOrderNumber(String purchaseOrderNumber) {
		this.purchaseOrderNumber = purchaseOrderNumber;
	}
	

	public Integer getCanceledQty() {
		return canceledQty;
	}

	public void setCanceledQty(Integer canceledQty) {
		this.canceledQty = canceledQty;
	}

	public Integer getRequestedQty() {
		return requestedQty;
	}

	public void setRequestedQty(Integer requestedQty) {
		this.requestedQty = requestedQty;
	}

	public Integer getPendingQty() {
		return pendingQty;
	}

	public void setPendingQty(Integer pendingQty) {
		this.pendingQty = pendingQty;
	}

	public String getSubRemarks() {
		return subRemarks;
	}

	public void setSubRemarks(String subRemarks) {
		this.subRemarks = subRemarks;
	}

	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public Integer getUserId() {
		return userId;
	}


	public void setUserId(Integer userId) {
		this.userId = userId;
	}


	public Date getInsertedDateAndTime() {
		return insertedDateAndTime;
	}


	public void setInsertedDateAndTime(Date insertedDateAndTime) {
		this.insertedDateAndTime = insertedDateAndTime;
	}


	public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	public Date getOpeningDate() {
		return openingDate;
	}


	public void setOpeningDate(Date openingDate) {
		this.openingDate = openingDate;
	}


	public String getStockSeries() {
		return stockSeries;
	}


	public void setStockSeries(String stockSeries) {
		this.stockSeries = stockSeries;
	}

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


	public Integer getReOrderQty() {
		return reOrderQty;
	}


	public void setReOrderQty(Integer reOrderQty) {
		this.reOrderQty = reOrderQty;
	}


	public Integer getMaxQty() {
		return maxQty;
	}


	public void setMaxQty(Integer maxQty) {
		this.maxQty = maxQty;
	}


	public Integer getOrderQty() {
		return orderQty;
	}


	public void setOrderQty(Integer orderQty) {
		this.orderQty = orderQty;
	}


	public Integer getAvailableStockQty() {
		return availableStockQty;
	}


	public void setAvailableStockQty(Integer availableStockQty) {
		this.availableStockQty = availableStockQty;
	}


	public String getBatchNo() {
		return batchNo;
	}


	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}


	public Date getExpirayDate() {
		return expirayDate;
	}


	public void setExpirayDate(Date expirayDate) {
		this.expirayDate = expirayDate;
	}


	public Integer getDaysLeft() {
		return daysLeft;
	}


	public void setDaysLeft(Integer daysLeft) {
		this.daysLeft = daysLeft;
	}


	public List<InvReportDto> getLstInvReportDto() {
		return lstInvReportDto;
	}


	public void setLstInvReportDto(List<InvReportDto> lstInvReportDto) {
		this.lstInvReportDto = lstInvReportDto;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public Integer getAddedQuantity() {
		return addedQuantity;
	}


	public void setAddedQuantity(Integer addedQuantity) {
		this.addedQuantity = addedQuantity;
	}


	public String getNaaration() {
		return naaration;
	}


	public void setNaaration(String naaration) {
		this.naaration = naaration;
	}


	public String getManuFactureDate() {
		return manuFactureDate;
	}

	public void setManuFactureDate(String manuFactureDate) {
		this.manuFactureDate = manuFactureDate;
	}


	public Integer getOpeningStockId() {
		return openingStockId;
	}

	public void setOpeningStockId(Integer openingStockId) {
		this.openingStockId = openingStockId;
	}

	public String getStockReturnReason() {
		return stockReturnReason;
	}

	public void setStockReturnReason(String stockReturnReason) {
		this.stockReturnReason = stockReturnReason;
	}

	public Integer getStockReturnQty() {
		return stockReturnQty;
	}

	public void setStockReturnQty(Integer stockReturnQty) {
		this.stockReturnQty = stockReturnQty;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public String getBatchExpiryDate() {
		return batchExpiryDate;
	}

	public void setBatchExpiryDate(String batchExpiryDate) {
		this.batchExpiryDate = batchExpiryDate;
	}
	
	public Integer getSubInventoryStock() {
		return subInventoryStock;
	}

	public void setSubInventoryStock(Integer subInventoryStock) {
		this.subInventoryStock = subInventoryStock;
	}

	public Integer getMainInventoryStock() {
		return mainInventoryStock;
	}

	public void setMainInventoryStock(Integer mainInventoryStock) {
		this.mainInventoryStock = mainInventoryStock;
	}
	
	public Integer getGeneratedMrnId() {
		return generatedMrnId;
	}

	public void setGeneratedMrnId(Integer generatedMrnId) {
		this.generatedMrnId = generatedMrnId;
	}

	public BigInteger getAvailableStockQty1() {
		return availableStockQty1;
	}

	public void setAvailableStockQty1(BigInteger availableStockQty1) {
		this.availableStockQty1 = availableStockQty1;
	}

	public Integer getUnitPrice1() {
		return unitPrice1;
	}

	public void setUnitPrice1(Integer unitPrice1) {
		this.unitPrice1 = unitPrice1;
	}

	@Override
	public String toString() {
		return "InvReportDto [id=" + id + ", itemName=" + itemName + ", reOrderQty=" + reOrderQty + ", maxQty=" + maxQty
				+ ", orderQty=" + orderQty + ", availableStockQty=" + availableStockQty + ", addedQuantity="
				+ addedQuantity + ", stockSeries=" + stockSeries + ", openingDate=" + openingDate + ", categoryName="
				+ categoryName + ", naaration=" + naaration + ", manuFactureDate=" + manuFactureDate
				+ ", openingStockId=" + openingStockId + ", availableStockQty1=" + availableStockQty1 + ", unitPrice1="
				+ unitPrice1 + ", unitPrice=" + unitPrice + ", discountInpercentage=" + discountInpercentage
				+ ", discountInRs=" + discountInRs + ", discountAmt=" + discountAmt + ", baseAmt=" + baseAmt + ", gst="
				+ gst + ", igst=" + igst + ", totalTaxAmt=" + totalTaxAmt + ", totalAmt=" + totalAmt + ", userName="
				+ userName + ", userId=" + userId + ", insertedDateAndTime=" + insertedDateAndTime
				+ ", latestUOMFactor=" + latestUOMFactor + ", partyMasterName=" + partyMasterName
				+ ", grnPurchaseInvoiceNo=" + grnPurchaseInvoiceNo + ", itemId=" + itemId + ", grnDate=" + grnDate
				+ ", subInventoryName=" + subInventoryName + ", totalQty=" + totalQty + ", itemQuantity=" + itemQuantity
				+ ", currentSubInvStock=" + currentSubInvStock + ", totalQty1=" + totalQty1 + ", batchNo=" + batchNo
				+ ", expirayDate=" + expirayDate + ", batchExpiryDate=" + batchExpiryDate + ", daysLeft=" + daysLeft
				+ ", stockReturnReason=" + stockReturnReason + ", stockReturnQty=" + stockReturnQty + ", narration="
				+ narration + ", subInventoryStock=" + subInventoryStock + ", mainInventoryStock=" + mainInventoryStock
				+ ", generatedMrnId=" + generatedMrnId + ", purchaseOrder=" + purchaseOrder + ", purchaseOrderNumber="
				+ purchaseOrderNumber + ", requestedQty=" + requestedQty + ", canceledQty=" + canceledQty
				+ ", pendingQty=" + pendingQty + ", subRemarks=" + subRemarks + ", lstInvReportDto=" + lstInvReportDto
				+ "]";
	}
	
}
