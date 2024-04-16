package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class TreatmentServiceDetails {
	
	int treatId,servId;
	double rate,qty,amt,totAmt,conPer;
	String servName,SubServName,cancelFlag,drDeshFlag;
	Date createdDateTime;
	private List<ServiceMasterDto> listServ;
	private List<SubServiceDto> listSubServ;	
	private List<TreatmentServiceDetails> listTreatment;
	
	public int getTreatId() {
		return treatId;
	}
	public void setTreatId(int treatId) {
		this.treatId = treatId;
	}
	public int getServId() {
		return servId;
	}
	public void setServId(int servId) {
		this.servId = servId;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public double getQty() {
		return qty;
	}
	public void setQty(double qty) {
		this.qty = qty;
	}
	public double getAmt() {
		return amt;
	}
	public void setAmt(double amt) {
		this.amt = amt;
	}
	public double getTotAmt() {
		return totAmt;
	}
	public void setTotAmt(double totAmt) {
		this.totAmt = totAmt;
	}	
	public double getConPer() {
		return conPer;
	}
	public void setConPer(double conPer) {
		this.conPer = conPer;
	}
	public String getServName() {
		return servName;
	}
	public void setServName(String servName) {
		this.servName = servName;
	}
	public String getSubServName() {
		return SubServName;
	}
	public void setSubServName(String subServName) {
		SubServName = subServName;
	}
	public String getCancelFlag() {
		return cancelFlag;
	}
	public void setCancelFlag(String cancelFlag) {
		this.cancelFlag = cancelFlag;
	}
	
	public String getDrDeshFlag() {
		return drDeshFlag;
	}
	public void setDrDeshFlag(String drDeshFlag) {
		this.drDeshFlag = drDeshFlag;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public List<ServiceMasterDto> getListServ() {
		return listServ;
	}
	public void setListServ(List<ServiceMasterDto> listServ) {
		this.listServ = listServ;
	}
	public List<SubServiceDto> getListSubServ() {
		return listSubServ;
	}
	public void setListSubServ(List<SubServiceDto> listSubServ) {
		this.listSubServ = listSubServ;
	}
	public List<TreatmentServiceDetails> getListTreatment() {
		return listTreatment;
	}
	public void setListTreatment(List<TreatmentServiceDetails> listTreatment) {
		this.listTreatment = listTreatment;
	}	
}
