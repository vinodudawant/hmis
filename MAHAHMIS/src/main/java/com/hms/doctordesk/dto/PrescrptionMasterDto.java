package com.hms.doctordesk.dto;

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
@Table(name="dd_pres_master")
public class PrescrptionMasterDto {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private int id;
	
	@Column(name="drug")
	private String drugName;
	 
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name="patient_id")
	private int patientId;
	
	
	@Column(name="dasge")
	private String dosage;
	
	@Column(name="inst_Name")
	private String instructionName="-";
	
	@Column(name="route_name")
	private String routeName="-";
	@Column(name="duration")
	private Double duration=0.0;
	@Column(name="qty")
	private String qty="-";
	@Column(name="inst_Id")
	private int instructionId;
	@Column(name="route_id")
	private int routeId;
	@Column(name="pre_date",updatable = false)
	private String currentdate;
	
	@Transient
	private List<PrescrptionMasterDto> listpresdto;
	
	@Column(name="sos_flag")
    private String sosFlag;
	
	// logs
	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDateTime;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;
	@Column(name = "user_id")
	private int userId;
	@Column(name = "created_by", updatable = false)
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deleted_by;
	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	@Column(name = "unit_id")
	private Integer unitId;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDrugName() {
		return drugName;
	}
	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	public String getDosage() {
		return dosage;
	}
	public void setDosage(String dosage) {
		this.dosage = dosage;
	}
	public String getInstructionName() {
		return instructionName;
	}
	public void setInstructionName(String instructionName) {
		this.instructionName = instructionName;
	}
	public String getRouteName() {
		return routeName;
	}
	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}
	
	public Double getDuration() {
		return duration;
	}
	public void setDuration(Double duration) {
		this.duration = duration;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public int getInstructionId() {
		return instructionId;
	}
	public void setInstructionId(int instructionId) {
		this.instructionId = instructionId;
	}
	public int getRouteId() {
		return routeId;
	}
	public void setRouteId(int routeId) {
		this.routeId = routeId;
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
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public int getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}
	public int getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(int deleted_by) {
		this.deleted_by = deleted_by;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
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
	public String getCurrentdate() {
		return currentdate;
	}
	public void setCurrentdate(String currentdate) {
		this.currentdate = currentdate;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public String getSosFlag() {
		return sosFlag;
	}
	public void setSosFlag(String sosFlag) {
		this.sosFlag = sosFlag;
	}
	public List<PrescrptionMasterDto> getListpresdto() {
		return listpresdto;
	}
	public void setListpresdto(List<PrescrptionMasterDto> listpresdto) {
		this.listpresdto = listpresdto;
	}
	
	
	
	
	
	
}
