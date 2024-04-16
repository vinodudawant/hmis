package com.hms.administrator.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.HospitalSpecialisationDto;

@Entity
@Table(name= "hmis_symptom_details")
public class SymptomsDetailsDto {

	@Id
	@GeneratedValue
	@Column(name = "symptom_details_id")
	private int symptomDetailsId;
	@Column(name = "symptom_name")
	private String symptomName;
	@Column(name = "unit_id")
	private int unitId;
	@Column(name = "delete_status")
	private String isDeleted = "N";
	@Column(name = "created_by")
	private int createdBy;
	@Column(name = "updated_by")
	private int updatedBy;
	@Column(name = "deleted_by")
	private int deletedBy;
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date")
	private Date createDate;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date")
	private Date deletedDate;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name ="hospital_specialisation_id")
	private HospitalSpecialisationDto HospitalSpecialisationDto;
	
	@Transient
	private List<SymptomsDetailsDto> symptomDetailsList;

	
	public int getSymptomDetailsId() {
		return symptomDetailsId;
	}

	public void setSymptomDetailsId(int symptomDetailsId) {
		this.symptomDetailsId = symptomDetailsId;
	}

	public String getSymptomName() {
		return symptomName;
	}

	public void setSymptomName(String symptomName) {
		this.symptomName = symptomName;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(String isDeleted) {
		this.isDeleted = isDeleted;
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

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public HospitalSpecialisationDto getHospitalSpecialisationDto() {
		return HospitalSpecialisationDto;
	}

	public void setHospitalSpecialisationDto(HospitalSpecialisationDto hospitalSpecialisationDto) {
		HospitalSpecialisationDto = hospitalSpecialisationDto;
	}

	public List<SymptomsDetailsDto> getSymptomDetailsList() {
		return symptomDetailsList;
	}

	public void setSymptomDetailsList(List<SymptomsDetailsDto> symptomDetailsList) {
		this.symptomDetailsList = symptomDetailsList;
	}

	@Override
	public String toString() {
		return "SymptomsDetailsDto [symptomDetailsId=" + symptomDetailsId + ", symptomName=" + symptomName + ", unitId="
				+ unitId + ", isDeleted=" + isDeleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedBy=" + deletedBy + ", createDate=" + createDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", HospitalSpecialisationDto=" + HospitalSpecialisationDto
				+ ", symptomDetailsList=" + symptomDetailsList + "]";
	}
}