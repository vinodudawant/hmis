package com.hms.inventory.dto;

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

import org.hibernate.annotations.GeneratorType;

@Entity
@Table(name = "ehat_inv_hospital_details")
public class HospitalDetailsDto {

	@Id
	@GeneratedValue
	@Column(name = "hospital_id")
	private Integer hospitalId;

	@Column(name = "hospital_name")
	private String hospitalName;

	@Column(name = "hospital_country")
	private String hospitalCountry;

	@Column(name = "hospital_state")
	private String hospitalState;

	@Column(name = "hospital_district")
	private String hospitalDistrict;

	@Column(name = "hospital_taluka")
	private String hospitalTaluka;

	@Column(name = "hospital_pincode")
	private String hospitalPincode;

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;

	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<HospitalDetailsDto> hospitalDetailsDto;

	public Integer getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(Integer hospitalId) {
		this.hospitalId = hospitalId;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public String getHospitalCountry() {
		return hospitalCountry;
	}

	public void setHospitalCountry(String hospitalCountry) {
		this.hospitalCountry = hospitalCountry;
	}

	public String getHospitalState() {
		return hospitalState;
	}

	public void setHospitalState(String hospitalState) {
		this.hospitalState = hospitalState;
	}

	public String getHospitalDistrict() {
		return hospitalDistrict;
	}

	public void setHospitalDistrict(String hospitalDistrict) {
		this.hospitalDistrict = hospitalDistrict;
	}

	public String getHospitalTaluka() {
		return hospitalTaluka;
	}

	public void setHospitalTaluka(String hospitalTaluka) {
		this.hospitalTaluka = hospitalTaluka;
	}

	public String getHospitalPincode() {
		return hospitalPincode;
	}

	public void setHospitalPincode(String hospitalPincode) {
		this.hospitalPincode = hospitalPincode;
	}

	public List<HospitalDetailsDto> getHospitalDetailsDto() {
		return hospitalDetailsDto;
	}

	public void setHospitalDetailsDto(
			List<HospitalDetailsDto> hospitalDetailsDto) {
		this.hospitalDetailsDto = hospitalDetailsDto;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
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

}
