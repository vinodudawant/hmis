package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pharma_document_numbering_master")
public class DocumentNumberingMaster implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "doc_num_id")
	private Integer docNumId;

	@Column(name = "doc_series")
	private String docSeries;

	@Column(name = "doc_no")
	private Integer docNo;

	@OneToOne
	@JoinColumn(name = "doc_id")
	private DocumentMaster documentMaster;

	@Column(name = "doc_prefix")
	private String docPrefix;

	@Column(name = "doc_suffix")
	private String docSuffix;

	@ManyToOne
	@JoinColumn(name = "doc_fin_year_id")
	private FinancialYearMaster yearMaster;

	@Column(name = "doc_delete_flag")
	private Integer docDeleteFlag;

	public Date getDocumentAddDate() {
		return documentAddDate;
	}

	public void setDocumentAddDate(Date documentAddDate) {
		this.documentAddDate = documentAddDate;
	}

	/*
	 * public Date getDeletedDate() { return deletedDate; }
	 * 
	 * public void setDeletedDate(Date deletedDate) { this.deletedDate =
	 * deletedDate; }
	 */

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	@CreationTimestamp
	@Column(name="doc_add_date")
	private Date documentAddDate;
	@UpdateTimestamp
	@Column(name="doc_update_date")
	private Date docUpdateDate;
	
	/*
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "delete_date_time") private Date deletedDate;
	 */
	
	
	@Column(name="user_id")
	private Integer userId;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	public Integer getDocNumId() {
		return docNumId;
	}

	public void setDocNumId(Integer docNumId) {
		this.docNumId = docNumId;
	}

	public String getDocSeries() {
		return docSeries;
	}

	public void setDocSeries(String docSeries) {
		this.docSeries = docSeries;
	}

	public Integer getDocNo() {
		return docNo;
	}

	public void setDocNo(Integer docNo) {
		this.docNo = docNo;
	}

	public DocumentMaster getDocumentMaster() {
		return documentMaster;
	}

	public void setDocumentMaster(DocumentMaster documentMaster) {
		this.documentMaster = documentMaster;
	}

	public String getDocPrefix() {
		return docPrefix;
	}

	public void setDocPrefix(String docPrefix) {
		this.docPrefix = docPrefix;
	}

	public String getDocSuffix() {
		return docSuffix;
	}

	public void setDocSuffix(String docSuffix) {
		this.docSuffix = docSuffix;
	}

	public FinancialYearMaster getYearMaster() {
		return yearMaster;
	}

	public void setYearMaster(FinancialYearMaster yearMaster) {
		this.yearMaster = yearMaster;
	}

	public Integer getDocDeleteFlag() {
		return docDeleteFlag;
	}

	public void setDocDeleteFlag(Integer docDeleteFlag) {
		this.docDeleteFlag = docDeleteFlag;
	}

	public Date getDocUpdateDate() {
		return docUpdateDate;
	}

	public void setDocUpdateDate(Date docUpdateDate) {
		this.docUpdateDate = docUpdateDate;
	}

}
