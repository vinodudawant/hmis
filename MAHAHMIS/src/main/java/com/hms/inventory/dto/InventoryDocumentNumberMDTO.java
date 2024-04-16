package com.hms.inventory.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
@Entity
@Table(name="ehat_inventory_number_doc")
public class InventoryDocumentNumberMDTO {
	@Id
	@GeneratedValue
	@Column(name = "document_numbering_id")
	private Integer document_numbering_id;
	
	@Column(name = "document_id")
	private Integer docId;
	
	
	@Column(name = "document_series")
	private String document_series;
	
	@Column(name = "document_number")
	private String document_number;
	
	@Column(name = "document_prefix")
	private String document_prefix;
	
	@Column(name = "document_suffix")
	private String document_suffix;
	
	@Column(name = "doc_financial_year_id")
	private Integer doc_financial_year_id;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "financial_year")
	private String year;
	
	@Column(name = "document_name")
	private String documentName;
	
	@Transient
	private List<InventoryDocumentNumberMDTO> lstDocumentNumberDTO;

	public Integer getDocument_numbering_id() {
		return document_numbering_id;
	}

	public void setDocument_numbering_id(Integer document_numbering_id) {
		this.document_numbering_id = document_numbering_id;
	}

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public String getDocument_series() {
		return document_series;
	}

	public void setDocument_series(String document_series) {
		this.document_series = document_series;
	}

	public String getDocument_number() {
		return document_number;
	}

	public void setDocument_number(String document_number) {
		this.document_number = document_number;
	}

	public String getDocument_prefix() {
		return document_prefix;
	}

	public void setDocument_prefix(String document_prefix) {
		this.document_prefix = document_prefix;
	}

	public String getDocument_suffix() {
		return document_suffix;
	}

	public void setDocument_suffix(String document_suffix) {
		this.document_suffix = document_suffix;
	}

	public Integer getDoc_financial_year_id() {
		return doc_financial_year_id;
	}

	public void setDoc_financial_year_id(Integer doc_financial_year_id) {
		this.doc_financial_year_id = doc_financial_year_id;
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

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public List<InventoryDocumentNumberMDTO> getLstDocumentNumberDTO() {
		return lstDocumentNumberDTO;
	}

	public void setLstDocumentNumberDTO(
			List<InventoryDocumentNumberMDTO> lstDocumentNumberDTO) {
		this.lstDocumentNumberDTO = lstDocumentNumberDTO;
	}
	
	
	
	
	
	
	

}
