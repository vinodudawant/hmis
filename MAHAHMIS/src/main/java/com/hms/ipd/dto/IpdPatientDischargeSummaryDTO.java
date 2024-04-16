package com.hms.ipd.dto;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.dto.CustomizeTemplate;

@Entity
@Table(name = "ipd_patient_discharge_summary")
public class IpdPatientDischargeSummaryDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "idipd_patient_discharge_summary")
	private Integer idipdPatientDischargeSummary;
	
	@Column(name = "treatmentId")
	private Integer treatmentId;
	
	@Column(name="patientId")
	private Integer patientId; 
	
	@Column(name = "idCustomizeTemplate")
	private Integer idCustomizeTemplate;
	
	@Column(name = "temp_master_id")
	private Integer specializaiontempid;
	
	@Column(name = "temp_name",columnDefinition="varchar(245) default '' " )
	private String tempName;
	
	@Column(name="temp_data", columnDefinition="TEXT")
	private String tempData; 
	
	@Column(name = "temp_type" ,columnDefinition="varchar(45) default '' " )
	private String tempType;
	
	@Column(name = "date",columnDefinition="varchar(45) default ''")
	private String date;
	
	@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	private String status;
	
	@Column(name = "discharge_date",columnDefinition="varchar(20) default 'Y'")
	private String dischargeDate; 
	
	@Column(name = "discharge_time",columnDefinition="varchar(20) default 'Y'")
	private String dischargeTime; 
	
	@Column(name = "discharge_type",columnDefinition="varchar(45) default 'Y'")
	private String dischargeType; 
	
	@Column(name = "created_by")
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_datetime", updatable = false)
	private Date  createDateTime;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_datetime")
	private Date  updatedDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_datetime")
	private Calendar  deletedDateTime;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@PrePersist
	public void saveDate()
	{
		this.createDateTime = new Date();
	}
	
	@PrePersist
	public void update()
	{
		this.updatedDateTime = new Date();
	}
	
	@Transient
	private List<IpdPatientDischargeSummaryDTO> TemplateList;

	public Integer getIdipdPatientDischargeSummary() {
		return idipdPatientDischargeSummary;
	}

	public void setIdipdPatientDischargeSummary(Integer idipdPatientDischargeSummary) {
		this.idipdPatientDischargeSummary = idipdPatientDischargeSummary;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getIdCustomizeTemplate() {
		return idCustomizeTemplate;
	}

	public void setIdCustomizeTemplate(Integer idCustomizeTemplate) {
		this.idCustomizeTemplate = idCustomizeTemplate;
	}
	
	

	public Integer getSpecializaiontempid() {
		return specializaiontempid;
	}

	public void setSpecializaiontempid(Integer specializaiontempid) {
		this.specializaiontempid = specializaiontempid;
	}

	public String getTempName() {
		return tempName;
	}

	public void setTempName(String tempName) {
		this.tempName = tempName;
	}

	public String getTempData() {
		return tempData;
	}

	public void setTempData(String tempData) {
		this.tempData = tempData;
	}

	public String getTempType() {
		return tempType;
	}

	public void setTempType(String tempType) {
		this.tempType = tempType;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDischargeDate() {
		return dischargeDate;
	}

	public void setDischargeDate(String dischargeDate) {
		this.dischargeDate = dischargeDate;
	}

	public String getDischargeTime() {
		return dischargeTime;
	}

	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}

	public String getDischargeType() {
		return dischargeType;
	}

	public void setDischargeType(String dischargeType) {
		this.dischargeType = dischargeType;
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

	

	public Date getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(Date createDateTime) {
		this.createDateTime = createDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Calendar getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Calendar deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public void setSpecializaiontempid(int selTempWiseSummary) {
		// TODO Auto-generated method stub
		
	}

	public List<IpdPatientDischargeSummaryDTO> getTemplateList() {
		return TemplateList;
	}

	public void setTemplateList(List<IpdPatientDischargeSummaryDTO> templateList) {
		TemplateList = templateList;
	}	
	
	

}
