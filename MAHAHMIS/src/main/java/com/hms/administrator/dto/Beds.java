package com.hms.administrator.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.ehat.dto.RegistrationDto;

@Entity
@Table(name="beds")
@Where(clause="deleted='N'")
//@JsonIgnoreProperties(ignoreUnknown = true)
public class Beds {

	@Id
	@GeneratedValue
    @Column(name="Bed_ID")
	private int bed_ID;
	
	//@Column(name="Hall_ID")	
	@Transient
	private int hall_ID;
	
	//@ManyToOne(fetch = FetchType.LAZY)
	//private ChargesMasterSlave hallId;
	
	@Column(name="bed_name")
	private String bed_name;
	
	@Column(name="Availability")
	private String availability;
	
	@Column(name="status",columnDefinition="varchar(2) default 'Y'")
	private String status="Y";
	
	@Transient
	private List<Beds> bedList;
	
	@Transient
	private int treatment_ID;
	
	@Transient
	private List<RegistrationDto> patList;
	
	@Column(name="idbedstate",columnDefinition="varchar(2) default '4'")
	private String bedstate="4";
	
	@Transient
	private String isolation;
	
	@Transient
	private String patientName;
	
	@Transient
	private String inDateTime;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;	
	
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

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	@JsonGetter("inDateTime")
	public String getInDateTime() {
		return inDateTime;
	}

	@JsonSetter("inDateTime")
	public void setInDateTime(String inDateTime) {
		this.inDateTime = inDateTime;
	}

	@JsonGetter("patientName")
	public String getPatientName() {
		return patientName;
	}

	@JsonSetter("patientName")
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	@JsonGetter("iso")
	public String getIsolation() {
		return isolation;
	}

	@JsonSetter("iso")
	public void setIsolation(String isolation) {
		this.isolation = isolation;
	}

	@JsonGetter("bs")
	public String getBedstate() {
		return bedstate;
	}

	@JsonSetter("bs")
	public void setBedstate(String bedstate) {
		this.bedstate = bedstate;
	}

	@JsonGetter("bdnm")
	public String getBed_name() {
		return bed_name;
	}

	@JsonSetter("bdnm")
	public void setBed_name(String bed_name) {
		this.bed_name = bed_name;
	}

	@JsonGetter("bdst")
	public String getStatus() {
		return status;
	}

	@JsonSetter("bdst")
	public void setStatus(String status) {
		this.status = status;
	}

	/*
	 * @JsonGetter("bpl") public List<Patient> getPatList() { return patList; }
	 * 
	 * @JsonSetter("bpl") public void setPatList(List<Patient> patList) {
	 * this.patList = patList; }
	 */

	@JsonGetter("ti")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	@JsonSetter("ti")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	@JsonGetter("bl")
	public List<Beds> getBedList() {
		return bedList;
	}

	@JsonSetter("bl")
	public void setBedList(List<Beds> bedList) {
		this.bedList = bedList;
	}

	@JsonGetter("bi")
	public int getBed_ID() {
		return bed_ID;
	}

	@JsonSetter("bi")
	public void setBed_ID(int bed_ID) {
		this.bed_ID = bed_ID;
	}

	@JsonGetter("hi")
	public int getHall_ID() {
		return hall_ID;
	}

	@JsonSetter("hi")
	public void setHall_ID(int hall_ID) {
		this.hall_ID = hall_ID;
	}

	@JsonGetter("ba")
	public String getAvailability() {
		return availability;
	}

	@JsonSetter("ba")
	public void setAvailability(String availability) {
		this.availability = availability;
	}

	public List<RegistrationDto> getPatList() {
		return patList;
	}

	public void setPatList(List<RegistrationDto> patList) {
		this.patList = patList;
	}

	/*
	 * public ChargesMasterSlave getHallId() { return hallId; }
	 * 
	 * public void setHallId(ChargesMasterSlave hallId) { this.hallId = hallId; }
	 */	
}
