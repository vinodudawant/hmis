package com.hms.pathology.dto;

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
@Table(name = "pathology_outsource_document")
public class SendToOutSourceDocumentDto {
	@Id
	@GeneratedValue
	@Column(name = "doc_id")
	private Integer id;
		
	@Column(name = "document_path")
	private String documentpath;
	
	@Column(name = "outmasterId")
	private String outmasterId;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	
	@Column(name = "delete_by",updatable=false)
	private Integer DeleteBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time",updatable=false)
	private Date deleteDate;
		
	@Column(name = "treatmentId")
	private Integer treatmentId;
	
	
	@Transient
	private List<SendToOutSourceDocumentDto> sendToOutSourceDocumentDtoList;


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getDocumentpath() {
		return documentpath;
	}


	public void setDocumentpath(String documentpath) {
		this.documentpath = documentpath;
	}

	public String getOutmasterId() {
		return outmasterId;
	}


	public void setOutmasterId(String outmasterId) {
		this.outmasterId = outmasterId;
	}


	public Integer getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}


	public Date getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public String getDeleted() {
		return deleted;
	}


	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}


	public Integer getDeleteBy() {
		return DeleteBy;
	}


	public void setDeleteBy(Integer deleteBy) {
		DeleteBy = deleteBy;
	}


	public Date getDeleteDate() {
		return deleteDate;
	}


	public void setDeleteDate(Date deleteDate) {
		this.deleteDate = deleteDate;
	}


	public Integer getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	public List<SendToOutSourceDocumentDto> getSendToOutSourceDocumentDtoList() {
		return sendToOutSourceDocumentDtoList;
	}


	public void setSendToOutSourceDocumentDtoList(
			List<SendToOutSourceDocumentDto> sendToOutSourceDocumentDtoList) {
		this.sendToOutSourceDocumentDtoList = sendToOutSourceDocumentDtoList;
	}
	
	
}
