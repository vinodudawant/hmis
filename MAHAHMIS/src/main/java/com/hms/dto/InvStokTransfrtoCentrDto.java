package com.hms.dto;

import java.util.List;

public class InvStokTransfrtoCentrDto {
	
	private Integer stkId;
	private String itemName;
	private Integer itemId;
	
	private String userName;
	private Integer userId;
	
	private Double itemCurrtStock;
	private Double itemIssueStock;
	
	private String stkTransfrFrom;
	private String stkTransfrTo;
	
	private String stkTransfrFromIp;
	private String stkTransfrToIp;
	
	private String stkNarrtion;
	
	private Integer trstoMain;
	
	private String stckDate;
	
	private Double totlstockQty;
	
	private Double totlIssuestockQty;
	
	private List<InvStokTransfrtoCentrDto> ltTransfrtoCentrDtos;

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
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

	public Double getItemCurrtStock() {
		return itemCurrtStock;
	}

	public void setItemCurrtStock(Double itemCurrtStock) {
		this.itemCurrtStock = itemCurrtStock;
	}

	public Double getItemIssueStock() {
		return itemIssueStock;
	}

	public void setItemIssueStock(Double itemIssueStock) {
		this.itemIssueStock = itemIssueStock;
	}

	public String getStkTransfrFrom() {
		return stkTransfrFrom;
	}

	public void setStkTransfrFrom(String stkTransfrFrom) {
		this.stkTransfrFrom = stkTransfrFrom;
	}

	public String getStkTransfrTo() {
		return stkTransfrTo;
	}

	public void setStkTransfrTo(String stkTransfrTo) {
		this.stkTransfrTo = stkTransfrTo;
	}

	public String getStkTransfrFromIp() {
		return stkTransfrFromIp;
	}

	public void setStkTransfrFromIp(String stkTransfrFromIp) {
		this.stkTransfrFromIp = stkTransfrFromIp;
	}

	public String getStkTransfrToIp() {
		return stkTransfrToIp;
	}

	public void setStkTransfrToIp(String stkTransfrToIp) {
		this.stkTransfrToIp = stkTransfrToIp;
	}

	public String getStkNarrtion() {
		return stkNarrtion;
	}

	public void setStkNarrtion(String stkNarrtion) {
		this.stkNarrtion = stkNarrtion;
	}

	public Integer getTrstoMain() {
		return trstoMain;
	}

	public void setTrstoMain(Integer trstoMain) {
		this.trstoMain = trstoMain;
	}

	public String getStckDate() {
		return stckDate;
	}

	public void setStckDate(String stckDate) {
		this.stckDate = stckDate;
	}

	public Double getTotlstockQty() {
		return totlstockQty;
	}

	public void setTotlstockQty(Double totlstockQty) {
		this.totlstockQty = totlstockQty;
	}

	public Double getTotlIssuestockQty() {
		return totlIssuestockQty;
	}

	public void setTotlIssuestockQty(Double totlIssuestockQty) {
		this.totlIssuestockQty = totlIssuestockQty;
	}

	public List<InvStokTransfrtoCentrDto> getLtTransfrtoCentrDtos() {
		return ltTransfrtoCentrDtos;
	}

	public void setLtTransfrtoCentrDtos(List<InvStokTransfrtoCentrDto> ltTransfrtoCentrDtos) {
		this.ltTransfrtoCentrDtos = ltTransfrtoCentrDtos;
	}

	public Integer getStkId() {
		return stkId;
	}

	public void setStkId(Integer stkId) {
		this.stkId = stkId;
	}
	
	

}
