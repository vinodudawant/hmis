package com.hms.histopath.dto;

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

import com.hms.pathology.dto.SendToOutSourceDocumentDto;

@Entity
@Table(name = "histopath_report_document")
public class HistoPathReportDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "doc_id")
	private Integer id;
	
	@Column(name = "document_path")
	private String documentpath;
	
	@Column(name = "email_status")
	private String emailStatus;
	
	@Column(name = "label")
	private String label;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "delete_by",updatable=false)
	private Integer DeleteBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time",updatable=false)
	private Date deleteDate;
		
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "email_send_date_time",updatable=false)
	private Date emailSendDate;
	
	@Column(name = "histopath_master_id")
	private Integer histopathMasterId;
	
	@Transient
	private List<HistoPathReportDTO> histoPathReportDTO;
	
	public Integer getHistopathMasterId() {
		return histopathMasterId;
	}

	public void setHistopathMasterId(Integer histopathMasterId) {
		this.histopathMasterId = histopathMasterId;
	}

	public Date getEmailSendDate() {
		return emailSendDate;
	}

	public void setEmailSendDate(Date emailSendDate) {
		this.emailSendDate = emailSendDate;
	}

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

	public String getEmailStatus() {
		return emailStatus;
	}

	public void setEmailStatus(String emailStatus) {
		this.emailStatus = emailStatus;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public List<HistoPathReportDTO> getHistoPathReportDTO() {
		return histoPathReportDTO;
	}

	public void setHistoPathReportDTO(List<HistoPathReportDTO> histoPathReportDTO) {
		this.histoPathReportDTO = histoPathReportDTO;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
}
