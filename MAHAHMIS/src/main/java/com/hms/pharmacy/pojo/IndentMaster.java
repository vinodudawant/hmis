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
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name="pharma_indent_master")
public class IndentMaster implements Serializable
{
	@Id
	@GeneratedValue
	@Column(name="indent_id")
	private Integer indentId;
	
	@Column(name="indent_treatement_id")
	private Integer  indentTreatmentId;
	
	@Column(name="indent_patient_id")
	private Integer  indentPatientId;
	
	@Column(name="indent_add_date")
	private java.util.Date indentDate;
	
	@Column(name="indent_delete_flag")
	private Integer  indentDeleteFlag;
	
	@Column(name="indent_status")
	private String  indentStatus;
	
	@Column(name="indent_received_from")
	private String  indentReceivedFrom;
	
	@Column(name="indent_store_id")
	private Integer  indentStoretId=0;
	
	@Column(name="indent_store_name")
	private String  indentStoreName=null;
	
	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "indent_slave_master_id", referencedColumnName = "indent_id")
	private List<IndentSlave> ltIndentSlave = new ArrayList<IndentSlave>();
	
	@Column(name="indent_generate_date")
	private java.util.Date indentGenerateDate;
	
	@Column(name="indent_time")
	private String indentTime;
	
	@Column(name="indent_comment")
	private String indentComment;
	
	@Column(name="indent_deleted_by")
	private Integer indentdeletedBy;
	
	@Column(name="indent_sale_ip")
	private String indentSaleIp;
	
	@Column(name="indent_sale_deleted_time")
	private String indentDeletedTime;
	
	@Column(name="indent_delete_date")
	private String indentDeleteDate;
	
	@Column(name="indent_created_by")
	private int indentcreatedby=0;
	
	@Column(name="indent_billing" ,columnDefinition = "varchar(2) default 'N'")
	private String indentBilling="N";
	

	@Transient
	private String patientName;
	
	@Transient
	private String categoryName;
	
	
	
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getIndentBilling() {
		return indentBilling;
	}

	public void setIndentBilling(String indentBilling) {
		this.indentBilling = indentBilling;
	}

	public Integer getIndentdeletedBy() {
		return indentdeletedBy;
	}

	public void setIndentdeletedBy(Integer indentdeletedBy) {
		this.indentdeletedBy = indentdeletedBy;
	}

	public String getIndentSaleIp() {
		return indentSaleIp;
	}

	public void setIndentSaleIp(String indentSaleIp) {
		this.indentSaleIp = indentSaleIp;
	}
	
	public Integer getIndentPatientId() {
		return indentPatientId;
	}

	public void setIndentPatientId(Integer indentPatientId) {
		this.indentPatientId = indentPatientId;
	}

	public String getIndentDeletedTime() {
		return indentDeletedTime;
	}

	public void setIndentDeletedTime(String indentDeletedTime) {
		this.indentDeletedTime = indentDeletedTime;
	}

	public String getIndentDeleteDate() {
		return indentDeleteDate;
	}

	public void setIndentDeleteDate(String indentDeleteDate) {
		this.indentDeleteDate = indentDeleteDate;
	}

	public String getIndentComment() {
		return indentComment;
	}

	public void setIndentComment(String indentComment) {
		this.indentComment = indentComment;
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

	public java.util.Date getIndentDate() {
		return indentDate;
	}

	public void setIndentDate(java.util.Date indentDate) {
		this.indentDate = indentDate;
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

	public Date getIndentGenerateDate() {
		return indentGenerateDate;
	}

	public void setIndentGenerateDate(Date indentGenerateDate) {
		this.indentGenerateDate = indentGenerateDate;
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

	public int getIndentcreatedby() {
		return indentcreatedby;
	}

	public void setIndentcreatedby(int indentcreatedby) {
		this.indentcreatedby = indentcreatedby;
	}
	
	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	@Override
	public String toString() {
		return "IndentMaster [indentId=" + indentId + ", indentTreatmentId=" + indentTreatmentId + ", indentPatientId="
				+ indentPatientId + ", indentDate=" + indentDate + ", indentDeleteFlag=" + indentDeleteFlag
				+ ", indentStatus=" + indentStatus + ", indentReceivedFrom=" + indentReceivedFrom + ", indentStoretId="
				+ indentStoretId + ", indentStoreName=" + indentStoreName + ", ltIndentSlave=" + ltIndentSlave
				+ ", indentGenerateDate=" + indentGenerateDate + ", indentTime=" + indentTime + ", indentComment="
				+ indentComment + ", indentdeletedBy=" + indentdeletedBy + ", indentSaleIp=" + indentSaleIp
				+ ", indentDeletedTime=" + indentDeletedTime + ", indentDeleteDate=" + indentDeleteDate
				+ ", indentcreatedby=" + indentcreatedby + ", patientName=" + patientName + "]";
	}
	
}