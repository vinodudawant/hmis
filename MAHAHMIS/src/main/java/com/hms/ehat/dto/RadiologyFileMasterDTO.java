package com.hms.ehat.dto;

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
@Table(name = "radiology_file_master")
public class RadiologyFileMasterDTO {
	
	@Id
	@GeneratedValue
	@Column(name = "idradiology_file_master")
	int IdradiologyFileMaster = 0;
	
	@Column(name = "patient_id")
	int patientId=0;
	
	@Column(name = "treatment_id")
	int treatmentId=0;
	
	@Column(name = "unit_id")
	int unitId=0;
	
	@Column(name = "radio_total")
	float radioTotal = 0;
	
	@Column(name = "idbill")
	int idbill = 0;

	@Column(name = "inserted_by")
	int insertedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inserted_date_time")
	Date insertedDatetime;

	@Column(name = "updated_by")
	int updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_datetime")
	Date updatedDatetime;
	
	@Column(name = "status")
	String  status="N";
		
	@Column(name = "sub_service_id")
	int subSerId=0;

	@Transient
	private List<RadiologyFileMasterDTO> listRadiologyFileMasterDTO;

	public int getIdradiologyFileMaster() {
		return IdradiologyFileMaster;
	}

	public void setIdradiologyFileMaster(int idradiologyFileMaster) {
		IdradiologyFileMaster = idradiologyFileMaster;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public float getRadioTotal() {
		return radioTotal;
	}

	public void setRadioTotal(float radioTotal) {
		this.radioTotal = radioTotal;
	}

	public int getIdbill() {
		return idbill;
	}

	public void setIdbill(int idbill) {
		this.idbill = idbill;
	}

	public int getInsertedBy() {
		return insertedBy;
	}

	public void setInsertedBy(int insertedBy) {
		this.insertedBy = insertedBy;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getSubSerId() {
		return subSerId;
	}

	public void setSubSerId(int subSerId) {
		this.subSerId = subSerId;
	}

	public List<RadiologyFileMasterDTO> getListRadiologyFileMasterDTO() {
		return listRadiologyFileMasterDTO;
	}

	public void setListRadiologyFileMasterDTO(
			List<RadiologyFileMasterDTO> listRadiologyFileMasterDTO) {
		this.listRadiologyFileMasterDTO = listRadiologyFileMasterDTO;
	}

	public Date getInsertedDatetime() {
		return insertedDatetime;
	}

	public void setInsertedDatetime(Date insertedDatetime) {
		this.insertedDatetime = insertedDatetime;
	}

	public Date getUpdatedDatetime() {
		return updatedDatetime;
	}

	public void setUpdatedDatetime(Date updatedDatetime) {
		this.updatedDatetime = updatedDatetime;
	}
	
	
}
