package com.hms.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
@Entity
@Table(name="hall_type_charges")
public class HallTypeCharges {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idhall_type_charges")
	private int idhall_type_charges;
	@Column(name="idhall_type")
	private int idhall_type;
	@Column(name="speciality")
	private float specialityNormalCharges;
	@Transient
	private float specialityIsolationCharges;
	@Column(name="super_speciality")
	private float superSpecialityNormalCharges;
	@Transient
	private float superSpecialityIsolationCharges;
	@Column(name="intencivist")
	private float intencivistNormalCharges;
	@Transient
	private float intencivistIsolationCharges;
	@Column(name="medical_team")
	private float medicalTeamNormalCharges;
	@Transient
	private float medicalTeamIsolationCharges;
	@Column(name="isolation_flag")
	private String isolationFlag;
	@Transient
	private List<HallTypeCharges> hallTypeChargesList;
	@Transient
	private int normalRowId;
	@Transient
	private int isolationRowId;
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name="hall_type_charges_id")
	private Integer hall_type_charges_id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;

	
	
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

	@JsonGetter("nrid")
	public int getNormalRowId() {
		return normalRowId;
	}

	public void setNormalRowId(int normalRowId) {
		this.normalRowId = normalRowId;
	}

	@JsonGetter("isorid")
	public int getIsolationRowId() {
		return isolationRowId;
	}

	public void setIsolationRowId(int isolationRowId) {
		this.isolationRowId = isolationRowId;
	}

	@JsonGetter("isoflg")
	public String getIsolationFlag() {
		return isolationFlag;
	}

	@JsonSetter("isoflg")
	public void setIsolationFlag(String isolationFlag) {
		this.isolationFlag = isolationFlag;
	}

	@JsonGetter("idhtchr")
	public int getIdhall_type_charges() {
		return idhall_type_charges;
	}

	@JsonSetter("idhtchr")
	public void setIdhall_type_charges(int idhall_type_charges) {
		this.idhall_type_charges = idhall_type_charges;
	}

	@JsonGetter("splnc")
	public float getSpecialityNormalCharges() {
		return specialityNormalCharges;
	}

	@JsonSetter("splnc")
	public void setSpecialityNormalCharges(float specialityNormalCharges) {
		this.specialityNormalCharges = specialityNormalCharges;
	}

	@JsonGetter("spliso")
	public float getSpecialityIsolationCharges() {
		return specialityIsolationCharges;
	}

	@JsonSetter("spliso")
	public void setSpecialityIsolationCharges(float specialityIsolationCharges) {
		this.specialityIsolationCharges = specialityIsolationCharges;
	}

	@JsonGetter("supnc")
	public float getSuperSpecialityNormalCharges() {
		return superSpecialityNormalCharges;
	}

	@JsonSetter("supnc")
	public void setSuperSpecialityNormalCharges(
			float superSpecialityNormalCharges) {
		this.superSpecialityNormalCharges = superSpecialityNormalCharges;
	}

	@JsonGetter("supiso")
	public float getSuperSpecialityIsolationCharges() {
		return superSpecialityIsolationCharges;
	}

	@JsonSetter("supiso")
	public void setSuperSpecialityIsolationCharges(
			float superSpecialityIsolationCharges) {
		this.superSpecialityIsolationCharges = superSpecialityIsolationCharges;
	}

	@JsonGetter("intnc")
	public float getIntencivistNormalCharges() {
		return intencivistNormalCharges;
	}

	@JsonSetter("intnc")
	public void setIntencivistNormalCharges(float intencivistNormalCharges) {
		this.intencivistNormalCharges = intencivistNormalCharges;
	}

	@JsonGetter("intiso")
	public float getIntencivistIsolationCharges() {
		return intencivistIsolationCharges;
	}

	@JsonSetter("intiso")
	public void setIntencivistIsolationCharges(float intencivistIsolationCharges) {
		this.intencivistIsolationCharges = intencivistIsolationCharges;
	}

	@JsonGetter("mednc")
	public float getMedicalTeamNormalCharges() {
		return medicalTeamNormalCharges;
	}

	@JsonSetter("mednc")
	public void setMedicalTeamNormalCharges(float medicalTeamNormalCharges) {
		this.medicalTeamNormalCharges = medicalTeamNormalCharges;
	}

	@JsonGetter("mediso")
	public float getMedicalTeamIsolationCharges() {
		return medicalTeamIsolationCharges;
	}

	@JsonSetter("mediso")
	public void setMedicalTeamIsolationCharges(float medicalTeamIsolationCharges) {
		this.medicalTeamIsolationCharges = medicalTeamIsolationCharges;
	}

	@JsonGetter("idht")
	public int getIdhall_type() {
		return idhall_type;
	}

	@JsonSetter("idht")
	public void setIdhall_type(int idhall_type) {
		this.idhall_type = idhall_type;
	}

	@JsonGetter("lihtchr")
	public List<HallTypeCharges> getHallTypeChargesList() {
		return hallTypeChargesList;
	}

	@JsonSetter("lihtchr")
	public void setHallTypeChargesList(List<HallTypeCharges> hallTypeChargesList) {
		this.hallTypeChargesList = hallTypeChargesList;
	}

	public Integer getHall_type_charges_id() {
		return hall_type_charges_id;
	}

	public void setHall_type_charges_id(Integer hall_type_charges_id) {
		this.hall_type_charges_id = hall_type_charges_id;
	}

}
