package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="embryo_frozen_slave_info")
public class EmbryoFrozenSlaveDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "frozen_embryo_slave_id")
	private Integer frozenEmbryoSlaveId;
	
	@Column(name = "patient_id")
	private String patientId;
	
	@Column(name = "treatment_id")
	private String treatmentId;
	
	@Column(name = "cycle_no",columnDefinition="varchar(20) default ''")
	private String cycleNo="";
	
	@Column(name = "post_thaw_cell_stage",columnDefinition="varchar(20) default ''")
	private String postThawCellStage="";
	
	@Column(name = "grade_frozen",columnDefinition="varchar(20) default ''")
	private String gradeFrozen="";
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name = "couple_id",columnDefinition="varchar(5) default ''")
	private String coupleId="";
	
	@Column(name = "batch_creation_id",columnDefinition="varchar(5) default ''")
	private String batchCreationId="";
	
	
	
	@Transient
	List<EmbryoFrozenSlaveDTO>  getListOfEmbryoFrozenSlaveDTO;

	public Integer getFrozenEmbryoSlaveId() {
		return frozenEmbryoSlaveId;
	}

	public void setFrozenEmbryoSlaveId(Integer frozenEmbryoSlaveId) {
		this.frozenEmbryoSlaveId = frozenEmbryoSlaveId;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getCycleNo() {
		return cycleNo;
	}

	public void setCycleNo(String cycleNo) {
		this.cycleNo = cycleNo;
	}

	public String getPostThawCellStage() {
		return postThawCellStage;
	}

	public void setPostThawCellStage(String postThawCellStage) {
		this.postThawCellStage = postThawCellStage;
	}

	public String getGradeFrozen() {
		return gradeFrozen;
	}

	public void setGradeFrozen(String gradeFrozen) {
		this.gradeFrozen = gradeFrozen;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<EmbryoFrozenSlaveDTO> getGetListOfEmbryoFrozenSlaveDTO() {
		return getListOfEmbryoFrozenSlaveDTO;
	}

	public void setGetListOfEmbryoFrozenSlaveDTO(
			List<EmbryoFrozenSlaveDTO> getListOfEmbryoFrozenSlaveDTO) {
		this.getListOfEmbryoFrozenSlaveDTO = getListOfEmbryoFrozenSlaveDTO;
	}

	public String getCoupleId() {
		return coupleId;
	}

	public void setCoupleId(String coupleId) {
		this.coupleId = coupleId;
	}

	public String getBatchCreationId() {
		return batchCreationId;
	}

	public void setBatchCreationId(String batchCreationId) {
		this.batchCreationId = batchCreationId;
	}
	
	
	
}
