package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class GeneralVouchersDTO implements Serializable {
	
	private int id,voucherId;
	private double amount;
	private String voucherType,payTo,groupName,ledgerHead,referedTo,authorisedBy,narration,status,createdDate;
	private List<GeneralVouchersDTO> vouchersList;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getVoucherId() {
		return voucherId;
	}
	public void setVoucherId(int voucherId) {
		this.voucherId = voucherId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getVoucherType() {
		return voucherType;
	}
	public void setVoucherType(String voucherType) {
		this.voucherType = voucherType;
	}
	public String getPayTo() {
		return payTo;
	}
	public void setPayTo(String payTo) {
		this.payTo = payTo;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getLedgerHead() {
		return ledgerHead;
	}
	public void setLedgerHead(String ledgerHead) {
		this.ledgerHead = ledgerHead;
	}
	public String getReferedTo() {
		return referedTo;
	}
	public void setReferedTo(String referedTo) {
		this.referedTo = referedTo;
	}
	public String getAuthorisedBy() {
		return authorisedBy;
	}
	public void setAuthorisedBy(String authorisedBy) {
		this.authorisedBy = authorisedBy;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public List<GeneralVouchersDTO> getVouchersList() {
		return vouchersList;
	}
	public void setVouchersList(List<GeneralVouchersDTO> vouchersList) {
		this.vouchersList = vouchersList;
	}
}
