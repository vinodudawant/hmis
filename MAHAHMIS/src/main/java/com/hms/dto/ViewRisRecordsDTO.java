package com.hms.dto;

import java.io.Serializable;
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
import org.springframework.stereotype.Component;

/**
 * @author Aniket Kanse
 * @since 04/11/2020
 *
 */

@Entity
@Table(name = "ehat_view_ris_records")
public class ViewRisRecordsDTO implements Serializable{

	
	private static final long serialVersionUID = -3351200381561001360L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id = 0;
	
	@Column(name = "arrival_date")
	private String arrivalDate;
	
	@Column(name = "arrival_time")
	private String arrivalTime;
	
	@Column(name = "taken_date")
	private String takenDate;
	
	@Column(name = "taken_time")
	private String takenTime;
	
	@Column(name = "investigation")
	private String investigation;
	
	@Column(name = "instruction")
	private String instruction;
	
	@Column(name = "clinical_notes")
	private String clinicalNotes;
	
	@Column(name = "radiologist")
	private String radiologist;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "department_no")
	private String departmentNo;
	
	@Column(name = "test_report_id") // primary key of test report in table "ehat_radiology_test_report"
	private Integer testReportId;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	@CreationTimestamp
	private Date createdDateTime;

	@Column(name = "idradiology_test")
	private Integer idRadiologyTest;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	@UpdateTimestamp
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "is_deleted",columnDefinition="varchar(2) default 'N'")
	private Character isDeleted = 'N';
	
	@Column(name = "created_by_user_name")
	private String createdByUserName;
	
	@Transient
	private String createdDate;

	@Column(name = "verify_flag", columnDefinition="varchar(2) default 'N'")
	private Character verifyFlag = 'N';
	
	@Column(name = "post_flag", columnDefinition="varchar(2) default 'N'")
	private Character postFlag = 'N';
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "verified_date_time", columnDefinition="varchar(45)")
	private String verifiedOnDateTime;		//aniket / 16 DEC 2020
	
	@Column(name = "bill_det_id")
	private Integer billDetId=0;
	
	@Transient
	private List<ViewRisRecordsDTO> listViewRisRecordsDTO;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getTakenDate() {
		return takenDate;
	}

	public void setTakenDate(String takenDate) {
		this.takenDate = takenDate;
	}

	public String getTakenTime() {
		return takenTime;
	}

	public void setTakenTime(String takenTime) {
		this.takenTime = takenTime;
	}

	public String getInvestigation() {
		return investigation;
	}

	public void setInvestigation(String investigation) {
		this.investigation = investigation;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getClinicalNotes() {
		return clinicalNotes;
	}

	public void setClinicalNotes(String clinicalNotes) {
		this.clinicalNotes = clinicalNotes;
	}

	public String getRadiologist() {
		return radiologist;
	}

	public void setRadiologist(String radiologist) {
		this.radiologist = radiologist;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getDepartmentNo() {
		return departmentNo;
	}

	public void setDepartmentNo(String departmentNo) {
		this.departmentNo = departmentNo;
	}

	public Integer getTestReportId() {
		return testReportId;
	}

	public void setTestReportId(Integer testReportId) {
		this.testReportId = testReportId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public Character getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Character isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getCreatedByUserName() {
		return createdByUserName;
	}

	public void setCreatedByUserName(String createdByUserName) {
		this.createdByUserName = createdByUserName;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public Character getVerifyFlag() {
		return verifyFlag;
	}

	public void setVerifyFlag(Character verifyFlag) {
		this.verifyFlag = verifyFlag;
	}

	public List<ViewRisRecordsDTO> getListViewRisRecordsDTO() {
		return listViewRisRecordsDTO;
	}

	public void setListViewRisRecordsDTO(
			List<ViewRisRecordsDTO> listViewRisRecordsDTO) {
		this.listViewRisRecordsDTO = listViewRisRecordsDTO;
	}
	

	public Character getPostFlag() {
		return postFlag;
	}

	public void setPostFlag(Character postFlag) {
		this.postFlag = postFlag;
	}
	
	public Integer getIdRadiologyTest() {
		return idRadiologyTest;
	}

	public void setIdRadiologyTest(Integer idRadiologyTest) {
		this.idRadiologyTest = idRadiologyTest;
	}
	

	public String getVerifiedOnDateTime() {
		return verifiedOnDateTime;
	}

	public void setVerifiedOnDateTime(String verifiedOnDateTime) {
		this.verifiedOnDateTime = verifiedOnDateTime;
	}

	public Integer getBillDetId() {
		return billDetId;
	}

	public void setBillDetId(Integer billDetId) {
		this.billDetId = billDetId;
	}

	@Override
	public String toString() {
		return "ViewRisRecordsDTO [id=" + id + ", arrivalDate=" + arrivalDate
				+ ", arrivalTime=" + arrivalTime + ", takenDate=" + takenDate
				+ ", takenTime=" + takenTime + ", investigation="
				+ investigation + ", instruction=" + instruction
				+ ", clinicalNotes=" + clinicalNotes + ", radiologist="
				+ radiologist + ", patientId=" + patientId + ", patientName="
				+ patientName + ", treatmentId=" + treatmentId
				+ ", departmentNo=" + departmentNo + ", testReportId="
				+ testReportId + ", createdBy=" + createdBy
				+ ", createdDateTime=" + createdDateTime + ", idRadiologyTest="
				+ idRadiologyTest + ", updatedDateTime=" + updatedDateTime
				+ ", deletedBy=" + deletedBy + ", deletedDateTime="
				+ deletedDateTime + ", isDeleted=" + isDeleted
				+ ", createdByUserName=" + createdByUserName + ", createdDate="
				+ createdDate + ", verifyFlag=" + verifyFlag + ", postFlag="
				+ postFlag + ", updatedBy=" + updatedBy
				+ ", verifiedOnDateTime=" + verifiedOnDateTime
				+ ", listViewRisRecordsDTO=" + listViewRisRecordsDTO + "]";
	}

	

}
