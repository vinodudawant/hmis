package com.hms.doctordesk.dto;
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

@Entity
@Table(name="dd_immunization_configuration")
public class ImmunizationConfigurationMaster {

	@Id
	@GeneratedValue
	@Column(name="immunizationconfiguration_id")
	private int immunizationconfiguration_id;
	@Column(name="vaccine")
	private String vaccine;
	@Column(name="day")
	private Integer day;
	@Column(name="max_day")
	private Integer max_day;
	@Column(name="weeks")
	private Integer weeks;
	@Column(name="max_weeks")
	private Integer max_weeks;
	@Column(name="months")
	private Integer months;
	@Column(name="max_months")
	private Integer max_months;
	@Column(name="year")
	private Integer year;
	@Column(name="max_year")
	private Integer max_year;
	@Column(name="mandatory_flag",columnDefinition="varchar(2)")
	private String mandatory_flag;
	@Column(name="gender")
	private String gender;
	@Column(name="notes")
	private String notes;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";


	@Column(name = "deleted_by")
	private Integer deletedBy;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	
	@Transient
	String vaccineFromDate;
	
	@Transient
	String vaccineToDate;
	
	@Transient
	private List<ImmunizationConfigurationMaster> list;

	public int getImmunizationconfiguration_id() {
		return immunizationconfiguration_id;
	}

	public void setImmunizationconfiguration_id(int immunizationconfiguration_id) {
		this.immunizationconfiguration_id = immunizationconfiguration_id;
	}

	public Integer getDay() {
		return day;
	}

	public void setDay(Integer day) {
		this.day = day;
	}

	public Integer getMax_day() {
		return max_day;
	}

	public void setMax_day(Integer max_day) {
		this.max_day = max_day;
	}

	public Integer getWeeks() {
		return weeks;
	}

	public void setWeeks(Integer weeks) {
		this.weeks = weeks;
	}

	public Integer getMax_weeks() {
		return max_weeks;
	}

	public void setMax_weeks(Integer max_weeks) {
		this.max_weeks = max_weeks;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getMax_year() {
		return max_year;
	}

	public void setMax_year(Integer max_year) {
		this.max_year = max_year;
	}

	public String getMandatory_flag() {
		return mandatory_flag;
	}

	public void setMandatory_flag(String mandatory_flag) {
		this.mandatory_flag = mandatory_flag;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
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

	public List<ImmunizationConfigurationMaster> getList() {
		return list;
	}

	public void setList(List<ImmunizationConfigurationMaster> list) {
		this.list = list;
	}

	public Integer getMonths() {
		return months;
	}

	public void setMonths(Integer months) {
		this.months = months;
	}

	public Integer getMax_months() {
		return max_months;
	}

	public void setMax_months(Integer max_months) {
		this.max_months = max_months;
	}

	public String getVaccine() {
		return vaccine;
	}

	public void setVaccine(String vaccine) {
		this.vaccine = vaccine;
	}

	public String getVaccineFromDate() {
		return vaccineFromDate;
	}

	public void setVaccineFromDate(String vaccineFromDate) {
		this.vaccineFromDate = vaccineFromDate;
	}

	public String getVaccineToDate() {
		return vaccineToDate;
	}

	public void setVaccineToDate(String vaccineToDate) {
		this.vaccineToDate = vaccineToDate;
	}

	@Override
	public String toString() {
		return "ImmunizationConfigurationMaster [immunizationconfiguration_id=" + immunizationconfiguration_id
				+ ", vaccine=" + vaccine + ", day=" + day + ", max_day=" + max_day + ", weeks=" + weeks + ", max_weeks="
				+ max_weeks + ", months=" + months + ", max_months=" + max_months + ", year=" + year + ", max_year="
				+ max_year + ", mandatory_flag=" + mandatory_flag + ", gender=" + gender + ", notes=" + notes
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deleted=" + deleted + ", deletedBy=" + deletedBy
				+ ", deletedDate=" + deletedDate + ", unitId=" + unitId + ", vaccineFromDate=" + vaccineFromDate
				+ ", vaccineToDate=" + vaccineToDate + ", list=" + list + "]";
	}

	
	
	
	
}
