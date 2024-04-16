package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Transient;

public class MrnReportDetail {

	private String mrnStoreName="";
	private String mrnDate="";
	private Integer mrnNo=0;
	private String mrnProductName="";
	private String mrnProductUnit="";
	private Integer mrnRequiredQty=0;
	private String mrnProductBatch="";
	private String mrnProductBatchExp="";
	private Integer mrnIssueQty=0;
	private Integer mrnCanceledQty=0;
	private Integer mrnPendingQty=0;
	private Integer mrnReceivedQty=0;
	private String mrnDiscount="";
	private String mrnGST="";
	private String mrnMRP="";
	private String mrnRate="";
	private Double mrnAmount=0.0;
	private String mrnRemark="";
	
	@Transient
	private List<MrnReportDetail> lstMrnReportDetail=new ArrayList<MrnReportDetail>();
	
	public Integer getMrnRequiredQty() {
		return mrnRequiredQty;
	}
	public void setMrnRequiredQty(Integer mrnRequiredQty) {
		this.mrnRequiredQty = mrnRequiredQty;
	}
	public Integer getMrnIssueQty() {
		return mrnIssueQty;
	}
	public void setMrnIssueQty(Integer mrnIssueQty) {
		this.mrnIssueQty = mrnIssueQty;
	}
	public Integer getMrnReceivedQty() {
		return mrnReceivedQty;
	}
	public void setMrnReceivedQty(Integer mrnReceivedQty) {
		this.mrnReceivedQty = mrnReceivedQty;
	}
	public Integer getMrnCanceledQty() {
		return mrnCanceledQty;
	}
	public void setMrnCanceledQty(Integer mrnCanceledQty) {
		this.mrnCanceledQty = mrnCanceledQty;
	}
	public Integer getMrnPendingQty() {
		return mrnPendingQty;
	}
	public void setMrnPendingQty(Integer mrnPendingQty) {
		this.mrnPendingQty = mrnPendingQty;
	}
	public String getMrnProductName() {
		return mrnProductName;
	}
	public void setMrnProductName(String mrnProductName) {
		this.mrnProductName = mrnProductName;
	}
	public Integer getMrnNo() {
		return mrnNo;
	}
	public void setMrnNo(Integer mrnNo) {
		this.mrnNo = mrnNo;
	}
	public String getMrnDate() {
		return mrnDate;
	}
	public void setMrnDate(String mrnDate) {
		this.mrnDate = mrnDate;
	}
	public String getMrnStoreName() {
		return mrnStoreName;
	}
	public void setMrnStoreName(String mrnStoreName) {
		this.mrnStoreName = mrnStoreName;
	}
	
	public String getMrnProductUnit() {
		return mrnProductUnit;
	}
	public void setMrnProductUnit(String mrnProductUnit) {
		this.mrnProductUnit = mrnProductUnit;
	}
	public String getMrnProductBatch() {
		return mrnProductBatch;
	}
	public void setMrnProductBatch(String mrnProductBatch) {
		this.mrnProductBatch = mrnProductBatch;
	}
	public String getMrnProductBatchExp() {
		return mrnProductBatchExp;
	}
	public void setMrnProductBatchExp(String mrnProductBatchExp) {
		this.mrnProductBatchExp = mrnProductBatchExp;
	}
	public String getMrnDiscount() {
		return mrnDiscount;
	}
	public void setMrnDiscount(String mrnDiscount) {
		this.mrnDiscount = mrnDiscount;
	}
	public String getMrnGST() {
		return mrnGST;
	}
	public void setMrnGST(String mrnGST) {
		this.mrnGST = mrnGST;
	}
	public String getMrnMRP() {
		return mrnMRP;
	}
	public void setMrnMRP(String mrnMRP) {
		this.mrnMRP = mrnMRP;
	}
	public String getMrnRate() {
		return mrnRate;
	}
	public void setMrnRate(String mrnRate) {
		this.mrnRate = mrnRate;
	}
	public Double getMrnAmount() {
		return mrnAmount;
	}
	public void setMrnAmount(Double mrnAmount) {
		this.mrnAmount = mrnAmount;
	}
	
	public String getMrnRemark() {
		return mrnRemark;
	}
	public void setMrnRemark(String mrnRemark) {
		this.mrnRemark = mrnRemark;
	}
	public List<MrnReportDetail> getLstMrnReportDetail() {
		return lstMrnReportDetail;
	}
	public void setLstMrnReportDetail(List<MrnReportDetail> lstMrnReportDetail) {
		this.lstMrnReportDetail = lstMrnReportDetail;
	}
	
}
