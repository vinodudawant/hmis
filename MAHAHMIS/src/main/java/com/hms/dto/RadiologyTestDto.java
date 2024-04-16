package com.hms.dto;

import java.io.Serializable;
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
@Table(name="ehat_radiology_test_details")
public class RadiologyTestDto implements Serializable {
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name = "idehat_radiology_test_details")
	private Integer idRadiologyTestDetails;

	@Column(name = "co_relation")
	private String coRelation;
	
	@Column(name = "redo_scan")
	private String redoScan;
	
	@Column(name = "related_reaction")
	private String relatedReaction;
	
	@Column(name = "error")
	private String error;
	
	@Column(name = "history")
	private String history;
	
	@Column(name = "test_id")
	private int testId;
	
	@Column(name = "pat_id")
	private int patId;
	
	@Column(name = "treat_id")
	private int treatId;
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<RadiologyTestDto> lstRadiologyTestDto;

	public Integer getIdRadiologyTestDetails() {
		return idRadiologyTestDetails;
	}

	public void setIdRadiologyTestDetails(Integer idRadiologyTestDetails) {
		this.idRadiologyTestDetails = idRadiologyTestDetails;
	}

	public String getCoRelation() {
		return coRelation;
	}

	public void setCoRelation(String coRelation) {
		this.coRelation = coRelation;
	}

	public String getRedoScan() {
		return redoScan;
	}

	public void setRedoScan(String redoScan) {
		this.redoScan = redoScan;
	}

	public String getRelatedReaction() {
		return relatedReaction;
	}

	public void setRelatedReaction(String relatedReaction) {
		this.relatedReaction = relatedReaction;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public int getPatId() {
		return patId;
	}

	public void setPatId(int patId) {
		this.patId = patId;
	}

	public int getTreatId() {
		return treatId;
	}

	public void setTreatId(int treatId) {
		this.treatId = treatId;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<RadiologyTestDto> getLstRadiologyTestDto() {
		return lstRadiologyTestDto;
	}

	public void setLstRadiologyTestDto(List<RadiologyTestDto> lstRadiologyTestDto) {
		this.lstRadiologyTestDto = lstRadiologyTestDto;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
