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

import com.hms.ehat.dto.RegistrationDto;

//@Entity
//@Table(name="beds")
public class Beds {
	/*
	 * 
	 * @Id
	 * 
	 * @GeneratedValue(strategy=GenerationType.IDENTITY)
	 * 
	 * @Column(name="Bed_ID") private int bed_ID;
	 * 
	 * @Column(name="Hall_ID") private int hall_ID;
	 * 
	 * @Column(name="bed_name") private String bed_name;
	 * 
	 * @Column(name="Availability") private String availability;
	 * 
	 * @Column(name="status") private String status;
	 * 
	 * @Transient private List<Beds> bedList;
	 * 
	 * @Transient private int treatment_ID;
	 * 
	 * @Transient private List<RegistrationDto> patList1;
	 * 
	 * @Column(name="idbedstate") private String bedstate;
	 * 
	 * @Transient private String isolation;
	 * 
	 * @Transient private String patientName;
	 * 
	 * @Transient private String inDateTime;
	 * 
	 * @Transient private List<Patient> patList;
	 * 
	 * @Column(name = "created_by",updatable=false) private Integer createdBy;
	 * 
	 * @Column(name = "updated_by") private Integer updatedBy;
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "created_date_time",updatable=false) private Date createdDate;
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "updated_date_time") private Date updatedDate;
	 * 
	 * @Column(name = "deleted",columnDefinition="varchar(2) default 'N'") private
	 * String deleted="N";
	 * 
	 * 
	 * @Column(name = "deleted_by") private Integer deletedBy;
	 * 
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "delete_date_time") private Date deletedDate;
	 * 
	 * 
	 * 
	 * public Integer getCreatedBy() { return createdBy; }
	 * 
	 * public void setCreatedBy(Integer createdBy) { this.createdBy = createdBy; }
	 * 
	 * public Integer getUpdatedBy() { return updatedBy; }
	 * 
	 * public void setUpdatedBy(Integer updatedBy) { this.updatedBy = updatedBy; }
	 * 
	 * public Date getCreatedDate() { return createdDate; }
	 * 
	 * public void setCreatedDate(Date createdDate) { this.createdDate =
	 * createdDate; }
	 * 
	 * public Date getUpdatedDate() { return updatedDate; }
	 * 
	 * public void setUpdatedDate(Date updatedDate) { this.updatedDate =
	 * updatedDate; }
	 * 
	 * public String getDeleted() { return deleted; }
	 * 
	 * public void setDeleted(String deleted) { this.deleted = deleted; }
	 * 
	 * public Integer getDeletedBy() { return deletedBy; }
	 * 
	 * public void setDeletedBy(Integer deletedBy) { this.deletedBy = deletedBy; }
	 * 
	 * public Date getDeletedDate() { return deletedDate; }
	 * 
	 * public void setDeletedDate(Date deletedDate) { this.deletedDate =
	 * deletedDate; }
	 * 
	 * @JsonGetter("inDateTime") public String getInDateTime() { return inDateTime;
	 * }
	 * 
	 * @JsonSetter("inDateTime") public void setInDateTime(String inDateTime) {
	 * this.inDateTime = inDateTime; }
	 * 
	 * @JsonGetter("patientName") public String getPatientName() { return
	 * patientName; }
	 * 
	 * @JsonSetter("patientName") public void setPatientName(String patientName) {
	 * this.patientName = patientName; }
	 * 
	 * @JsonGetter("iso") public String getIsolation() { return isolation; }
	 * 
	 * @JsonSetter("iso") public void setIsolation(String isolation) {
	 * this.isolation = isolation; }
	 * 
	 * @JsonGetter("bs") public String getBedstate() { return bedstate; }
	 * 
	 * @JsonSetter("bs") public void setBedstate(String bedstate) { this.bedstate =
	 * bedstate; }
	 * 
	 * @JsonGetter("bdnm") public String getBed_name() { return bed_name; }
	 * 
	 * @JsonSetter("bdnm") public void setBed_name(String bed_name) { this.bed_name
	 * = bed_name; }
	 * 
	 * @JsonGetter("bdst") public String getStatus() { return status; }
	 * 
	 * @JsonSetter("bdst") public void setStatus(String status) { this.status =
	 * status; }
	 * 
	 *//**
		 * @return the patList
		 */
	/*
	 * @JsonGetter("pat") public List<RegistrationDto> getPatList1() { return
	 * patList1; }
	 * 
	 *//**
		 * @param patList the patList to set
		 */
	/*
	 * @JsonSetter("pat") public void setPatList1(List<RegistrationDto> patList1) {
	 * this.patList1 = patList1; }
	 * 
	 *//**
		 * @return the patList
		 */
	/*
	 * @JsonGetter("bpl") public List<Patient> getPatList() { return patList; }
	 * 
	 *//**
		 * @param patList the patList to set
		 */
	/*
	 * @JsonSetter("bpl") public void setPatList(List<Patient> patList) {
	 * this.patList = patList; }
	 * 
	 *//**
		 * @return the treatment_ID
		 */
	/*
	 * @JsonGetter("ti") public int getTreatment_ID() { return treatment_ID; }
	 * 
	 *//**
		 * @param treatment_ID the treatment_ID to set
		 */
	/*
	 * @JsonSetter("ti") public void setTreatment_ID(int treatment_ID) {
	 * this.treatment_ID = treatment_ID; }
	 * 
	 *//**
		 * @return the bedList
		 */
	/*
	 * @JsonGetter("bl") public List<Beds> getBedList() { return bedList; }
	 * 
	 *//**
		 * @param bedList the bedList to set
		 */
	/*
	 * @JsonSetter("bl") public void setBedList(List<Beds> bedList) { this.bedList =
	 * bedList; }
	 * 
	 *//**
		 * @return the bed_ID
		 */
	/*
	 * @JsonGetter("bi") public int getBed_ID() { return bed_ID; }
	 * 
	 *//**
		 * @param bed_ID the bed_ID to set
		 */
	/*
	 * @JsonSetter("bi") public void setBed_ID(int bed_ID) { this.bed_ID = bed_ID; }
	 * 
	 *//**
		 * @return the hall_ID
		 */
	/*
	 * @JsonGetter("hi") public int getHall_ID() { return hall_ID; }
	 * 
	 *//**
		 * @param hall_ID the hall_ID to set
		 */
	/*
	 * @JsonSetter("hi") public void setHall_ID(int hall_ID) { this.hall_ID =
	 * hall_ID; }
	 * 
	 *//**
		 * @return the availability
		 */
	/*
	 * @JsonGetter("ba") public String getAvailability() { return availability; }
	 * 
	 *//**
		 * @param availability the availability to set
		 */
	/*
	 * @JsonSetter("ba") public void setAvailability(String availability) {
	 * this.availability = availability; }
	 *//**
		 * @return the lease
		 */
	/*
	
	*/}
