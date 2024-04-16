package com.hms.hisab.Pojo;

import java.util.List;

public class HisabVouchersDTO {
	
	private int id,voucherMasterId,voucherId;
	private double amount;
	private String status,voucherType,voucherName,payTo,groupName,ledgerHead,authorisedBy,referedTo,narration,hisabClosedFlag,cancelFlag;
	private List<HisabVouchersDTO> lstHisabVouchers;
		
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getVoucherMasterId() {
		return voucherMasterId;
	}
	public void setVoucherMasterId(int voucherMasterId) {
		this.voucherMasterId = voucherMasterId;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getVoucherType() {
		return voucherType;
	}
	public void setVoucherType(String voucherType) {
		this.voucherType = voucherType;
	}
	public String getVoucherName() {
		return voucherName;
	}
	public void setVoucherName(String voucherName) {
		this.voucherName = voucherName;
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
	public String getAuthorisedBy() {
		return authorisedBy;
	}
	public void setAuthorisedBy(String authorisedBy) {
		this.authorisedBy = authorisedBy;
	}
	public String getReferedTo() {
		return referedTo;
	}
	public void setReferedTo(String referedTo) {
		this.referedTo = referedTo;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public String getHisabClosedFlag() {
		return hisabClosedFlag;
	}
	public void setHisabClosedFlag(String hisabClosedFlag) {
		this.hisabClosedFlag = hisabClosedFlag;
	}
	public String getCancelFlag() {
		return cancelFlag;
	}
	public void setCancelFlag(String cancelFlag) {
		this.cancelFlag = cancelFlag;
	}
	public List<HisabVouchersDTO> getLstHisabVouchers() {
		return lstHisabVouchers;
	}
	public void setLstHisabVouchers(List<HisabVouchersDTO> lstHisabVouchers) {
		this.lstHisabVouchers = lstHisabVouchers;
	}	
}
