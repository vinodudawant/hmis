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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Table(name = "ehat_mlc_details")
public class MlcDetailsDto {

	@Id
	@GeneratedValue
	@Column(name = "mlc_id")
	private int mlcId;
	
	@Column(name = "mlc_no")
	private String mlcNo;

	@Column(name = "fir_no")
	private String firNo;
	
	@Column(name = "authority_name")
	private String authorityName;
	
	@Column(name = "mlc_first_name")
	private String mlcFirstName;

	@Column(name = "mlcLast_name")
	private String mlcLastName;
	
	@Column(name = "buccle_no")
	private String buccleNo;
	
	@Column(name = "prefix3")
	private String prefix3;
	
	@Column(name = "pl_st_name")
	private String plStname;
	
	@Column(name = "mlc_gender")
	private String mlcGender;
	
	@Column(name = "mlc_mobile")
	private String mlcMobile;
	
	@Column(name = "mlc_email")
	private String mlcEmail;
	
	@Column(name = "mlc_pl_addess")
	private String mlcPlAddess;
	
	@Column(name = "mlc_age")
	private String mlcAge;
	
	@Column(name = "mlc_relation")
	private int mlcRelation;
	
	@Column(name = "mlc_address_text")
	private String mlcAddressText;
	
	@Column(name = "incident_details")
	private String incidentDetails;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "mlc_date")
	private Date mlcDate;
		
	@Column(name = "mlc_cmo_doctor")
	private int mlcCmoDoctor;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private int createdBy;
	
	@CreationTimestamp
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "updated_by")
	private int updatedBy;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private int deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	//@Column(name = "patient_id")
	@Transient
	private int patientId;
	
	//@Column(name = "bill_id")
	@Transient
	private int billId;
	
	//@Column(name = "treatmentId")
	@Transient
	private int treatmentId;
	
	@Column(name = "departmentId")
	private int departmentId;
	
	@Column(name = "unit_id", columnDefinition = "int default 0")
	private int unitId = 0;
	
	@Column(name = "mlc_flag")
	private String mlc_flag;
	
	
	public String getMlc_flag() {
		return mlc_flag;
	}

	public void setMlc_flag(String mlc_flag) {
		this.mlc_flag = mlc_flag;
	}

	@Transient
	private List<MlcDetailsDto> listMlcDetails;

	public int getMlcId() {
		return mlcId;
	}

	public String getMlcNo() {
		return mlcNo;
	}

	public String getFirNo() {
		return firNo;
	}

	public String getAuthorityName() {
		return authorityName;
	}

	public String getMlcFirstName() {
		return mlcFirstName;
	}

	public String getMlcLastName() {
		return mlcLastName;
	}

	public String getBuccleNo() {
		return buccleNo;
	}

	public String getPlStname() {
		return plStname;
	}

	public String getMlcGender() {
		return mlcGender;
	}

	public String getMlcMobile() {
		return mlcMobile;
	}

	public String getMlcEmail() {
		return mlcEmail;
	}

	public String getMlcPlAddess() {
		return mlcPlAddess;
	}

	public String getMlcAge() {
		return mlcAge;
	}

	public int getMlcRelation() {
		return mlcRelation;
	}

	public String getMlcAddressText() {
		return mlcAddressText;
	}

	public String getIncidentDetails() {
		return incidentDetails;
	}

	public Date getMlcDate() {
		return mlcDate;
	}

	public int getMlcCmoDoctor() {
		return mlcCmoDoctor;
	}

	public String getDeleted() {
		return deleted;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public int getPatientId() {
		return patientId;
	}

	public int getBillId() {
		return billId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public List<MlcDetailsDto> getListMlcDetails() {
		return listMlcDetails;
	}

	public void setMlcId(int mlcId) {
		this.mlcId = mlcId;
	}

	public void setMlcNo(String mlcNo) {
		this.mlcNo = mlcNo;
	}

	public void setFirNo(String firNo) {
		this.firNo = firNo;
	}

	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}

	public void setMlcFirstName(String mlcFirstName) {
		this.mlcFirstName = mlcFirstName;
	}

	public void setMlcLastName(String mlcLastName) {
		this.mlcLastName = mlcLastName;
	}

	public void setBuccleNo(String buccleNo) {
		this.buccleNo = buccleNo;
	}

	public void setPlStname(String plStname) {
		this.plStname = plStname;
	}

	public void setMlcGender(String mlcGender) {
		this.mlcGender = mlcGender;
	}

	public void setMlcMobile(String mlcMobile) {
		this.mlcMobile = mlcMobile;
	}

	public void setMlcEmail(String mlcEmail) {
		this.mlcEmail = mlcEmail;
	}

	public void setMlcPlAddess(String mlcPlAddess) {
		this.mlcPlAddess = mlcPlAddess;
	}

	public void setMlcAge(String mlcAge) {
		this.mlcAge = mlcAge;
	}

	public void setMlcRelation(int mlcRelation) {
		this.mlcRelation = mlcRelation;
	}

	public void setMlcAddressText(String mlcAddressText) {
		this.mlcAddressText = mlcAddressText;
	}

	public void setIncidentDetails(String incidentDetails) {
		this.incidentDetails = incidentDetails;
	}

	public void setMlcDate(Date mlcDate) {
		this.mlcDate = mlcDate;
	}

	public void setMlcCmoDoctor(int mlcCmoDoctor) {
		this.mlcCmoDoctor = mlcCmoDoctor;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public void setListMlcDetails(List<MlcDetailsDto> listMlcDetails) {
		this.listMlcDetails = listMlcDetails;
	}

	public String getPrefix3() {
		return prefix3;
	}

	public void setPrefix3(String prefix3) {
		this.prefix3 = prefix3;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
}
