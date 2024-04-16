package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

public class IndentMasterResult 
{
	
	private Integer indentId;
	private Integer  indentTreatmentId;
	private String indentDate;
	private Integer  indentDeleteFlag;
	private String  indentStatus;
	private String  indentReceivedFrom;
	private Integer  indentStoretId=0;
	private String  indentStoreName=null;
	private List<IndentSlave> ltIndentSlave = new ArrayList<IndentSlave>();
	private String indentGenerateDate;
	private String indentTime;
	private String qty;
	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getIndentDate() {
		return indentDate;
	}

	public void setIndentDate(String indentDate) {
		this.indentDate = indentDate;
	}

	public String getIndentGenerateDate() {
		return indentGenerateDate;
	}

	public void setIndentGenerateDate(String indentGenerateDate) {
		this.indentGenerateDate = indentGenerateDate;
	}

	public Integer getIndentId() {
		return indentId;
	}

	public void setIndentId(Integer indentId) {
		this.indentId = indentId;
	}

	public Integer getIndentTreatmentId() {
		return indentTreatmentId;
	}

	public void setIndentTreatmentId(Integer indentTreatmentId) {
		this.indentTreatmentId = indentTreatmentId;
	}
	

	public void setLtIndentSlave(List<IndentSlave> ltIndentSlave) {
		this.ltIndentSlave = ltIndentSlave;
	}
	
	public List<IndentSlave> getLtIndentSlave() {
		return ltIndentSlave;
	}

	public Integer getIndentDeleteFlag() {
		return indentDeleteFlag;
	}

	public void setIndentDeleteFlag(Integer indentDeleteFlag) {
		this.indentDeleteFlag = indentDeleteFlag;
	}

	public String getIndentStatus() {
		return indentStatus;
	}

	public void setIndentStatus(String indentStatus) {
		this.indentStatus = indentStatus;
	}

	public String getIndentReceivedFrom() {
		return indentReceivedFrom;
	}

	public void setIndentReceivedFrom(String indentReceivedFrom) {
		this.indentReceivedFrom = indentReceivedFrom;
	}

	public Integer getIndentStoretId() {
		return indentStoretId;
	}

	public void setIndentStoretId(Integer indentStoretId) {
		this.indentStoretId = indentStoretId;
	}

	public String getIndentStoreName() {
		return indentStoreName;
	}

	public void setIndentStoreName(String indentStoreName) {
		this.indentStoreName = indentStoreName;
	}

	public String getIndentTime() {
		return indentTime;
	}

	public void setIndentTime(String indentTime) {
		this.indentTime = indentTime;
	}
}