package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

public class IndentsaleMater 
{
	private String indentSalelId;
	private String 	indentSaleDocNo;
	private IndentMaster indentMaster;
	private Date indentSaleReceivedDate;
	private String indentSaleNarration;
	private Double indentSaleGrossAmt;
	private Double indentSaleAdd;
	private Double indentSaleLess;
	private Double indentSaleNetAmt;
	private Double indentSaleSpecialDisc;
	private String patientName;
	
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getIndentSalelId() {
		return indentSalelId;
	}
	public void setIndentSalelId(String indentSalelId) {
		this.indentSalelId = indentSalelId;
	}
	public String getIndentSaleDocNo() {
		return indentSaleDocNo;
	}
	public void setIndentSaleDocNo(String indentSaleDocNo) {
		this.indentSaleDocNo = indentSaleDocNo;
	}
	public IndentMaster getIndentMaster() {
		return indentMaster;
	}
	public void setIndentMaster(IndentMaster indentMaster) {
		this.indentMaster = indentMaster;
	}
	public Date getIndentSaleReceivedDate() {
		return indentSaleReceivedDate;
	}
	public void setIndentSaleReceivedDate(Date indentSaleReceivedDate) {
		this.indentSaleReceivedDate = indentSaleReceivedDate;
	}
	public String getIndentSaleNarration() {
		return indentSaleNarration;
	}
	public void setIndentSaleNarration(String indentSaleNarration) {
		this.indentSaleNarration = indentSaleNarration;
	}
	public Double getIndentSaleGrossAmt() {
		return indentSaleGrossAmt;
	}
	public void setIndentSaleGrossAmt(Double indentSaleGrossAmt) {
		this.indentSaleGrossAmt = indentSaleGrossAmt;
	}
	public Double getIndentSaleAdd() {
		return indentSaleAdd;
	}
	public void setIndentSaleAdd(Double indentSaleAdd) {
		this.indentSaleAdd = indentSaleAdd;
	}
	public Double getIndentSaleLess() {
		return indentSaleLess;
	}
	public void setIndentSaleLess(Double indentSaleLess) {
		this.indentSaleLess = indentSaleLess;
	}
	public Double getIndentSaleNetAmt() {
		return indentSaleNetAmt;
	}
	public void setIndentSaleNetAmt(Double indentSaleNetAmt) {
		this.indentSaleNetAmt = indentSaleNetAmt;
	}
	public Double getIndentSaleSpecialDisc() {
		return indentSaleSpecialDisc;
	}
	public void setIndentSaleSpecialDisc(Double indentSaleSpecialDisc) {
		this.indentSaleSpecialDisc = indentSaleSpecialDisc;
	}
	
}
