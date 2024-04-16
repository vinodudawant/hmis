package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.hms.pathology.dto.LabTestDTO;

@Entity
@Table(name = "pathology_labgradings")
public class LabGradingsDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "labgrading_id")
	private Integer labGradingId;

	@Column(name = "labgrading_name")
	private String labGradingName;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted = "N";

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "unit_id")
	private Integer unitId;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "test_id")
	private LabTestDTO labTestDTO;

	@Transient
	private Integer testId;

	@Transient
	private List<LabGradingsDto> gradingsList;

	
	public Integer getLabGradingId() {
		return labGradingId;
	}

	public void setLabGradingId(Integer labGradingId) {
		this.labGradingId = labGradingId;
	}

	public String getLabGradingName() {
		return labGradingName;
	}

	public void setLabGradingName(String labGradingName) {
		this.labGradingName = labGradingName;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public LabTestDTO getLabTestDTO() {
		return labTestDTO;
	}

	public void setLabTestDTO(LabTestDTO labTestDTO) {
		this.labTestDTO = labTestDTO;
	}

	public Integer getTestId() {
		return testId;
	}

	public void setTestId(Integer testId) {
		this.testId = testId;
	}

	public List<LabGradingsDto> getGradingsList() {
		return gradingsList;
	}

	public void setGradingsList(List<LabGradingsDto> gradingsList) {
		this.gradingsList = gradingsList;
	}


	@Override
	public String toString() {
		return "LabGradingsDto [labGradingId=" + labGradingId + ", labGradingName=" + labGradingName + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy + ", deleted=" + deleted
				+ ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", unitId=" + unitId
				+ ", labTestDTO=" + labTestDTO + ", testId=" + testId + ", gradingsList=" + gradingsList + "]";
	}
}