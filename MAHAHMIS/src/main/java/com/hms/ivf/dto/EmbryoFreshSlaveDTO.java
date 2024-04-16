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
@Table(name="embryo_fresh_slave_info")
public class EmbryoFreshSlaveDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "fresh_embryo_slave_id")
	private Integer freshEmbryoSlaveId;
	
	@Column(name = "patient_id")
	private String patientId;
	
	@Column(name = "treatment_id")
	private String treatmentId;
	
	@Column(name = "cycle_no",columnDefinition="varchar(20) default ''")
	private String cycleNo="";
	
	
	@Column(name = "egg_number",columnDefinition="varchar(20) default ''")
	private String eggNumber="";
	
	@Column(name = "number_of_cells",columnDefinition="varchar(20) default ''")
	private String numberOfCells="";
	
	@Column(name = "grade_fresh",columnDefinition="varchar(20) default ''")
	private String gradeFresh="";
	
	
	
	@Column(name = "couple_id",columnDefinition="varchar(5) default ''")
	private String coupleId="";
	
	@Column(name = "batch_creation_id",columnDefinition="varchar(5) default ''")
	private String batchCreationId="";
	
	
	
	
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
	
	@Transient
	List<EmbryoFreshSlaveDTO>  getListOfEmbryoFreshSlaveDTO;

	public Integer getFreshEmbryoSlaveId() {
		return freshEmbryoSlaveId;
	}

	public void setFreshEmbryoSlaveId(Integer freshEmbryoSlaveId) {
		this.freshEmbryoSlaveId = freshEmbryoSlaveId;
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

	public String getEggNumber() {
		return eggNumber;
	}

	public void setEggNumber(String eggNumber) {
		this.eggNumber = eggNumber;
	}

	public String getNumberOfCells() {
		return numberOfCells;
	}

	public void setNumberOfCells(String numberOfCells) {
		this.numberOfCells = numberOfCells;
	}

	public String getGradeFresh() {
		return gradeFresh;
	}

	public void setGradeFresh(String gradeFresh) {
		this.gradeFresh = gradeFresh;
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

	public List<EmbryoFreshSlaveDTO> getGetListOfEmbryoFreshSlaveDTO() {
		return getListOfEmbryoFreshSlaveDTO;
	}

	public void setGetListOfEmbryoFreshSlaveDTO(
			List<EmbryoFreshSlaveDTO> getListOfEmbryoFreshSlaveDTO) {
		this.getListOfEmbryoFreshSlaveDTO = getListOfEmbryoFreshSlaveDTO;
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
