package com.hms.ipd.nurshing.dto;

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

import org.hibernate.annotations.UpdateTimestamp;
@Entity
@Table(name = "treatment_nurses")
public class TreatmentNurshingDTO {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID")
	 int id;
	 
	@Column(name = "Treatment_ID")
	 int treatmentId;
	 
	@Column(name = "Nurse_ID")
	 int nurseId;
	 
	@Column(name = "Bed_ID")
	int  bedId;
	
	@Column(name = "CheckUP_Time")
	String checkUpdTime;
	
	@Column(name = "Precription")
	String Precription;
	
	@Column(name = "Comments")
	String Comments;
	
	@Column(name = "DrugName")
	String drugName;
	
	@Column(name = "Strength")
	String Strength;
	
	@Column(name = "Dose")
	String Dose;
	
	@Column(name = "FluildDrips")
	String FluildDrips;
	
	@Column(name = "quantity")
	float quantity;
	
	@Column(name = "Date")
	String Date;
	
	@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	String status;
	
	@Column(name = "invProdId")
	String invProdId;
	
	@Column(name = "note")
	String note;
	
	@Column(name = "headingNote")
	String headingNote;
	
	@Column(name = "assigned_by")
	int assigned_by;
	
	@Column(name = "assign_date_time")
	String assign_date_time;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Column(name = "date_vital",columnDefinition="varchar(20) default ''")
	private String dateVital;
	
	@Column(name = "heading_name",columnDefinition="varchar(200) default ''")
	private String headingName;
	
	@Column(name = "doctor_name",columnDefinition="varchar(200) default ''")
	private String doctorName;
	
	@Transient
	private List<TreatmentNurshingDTO> treNurseList;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getNurseId() {
		return nurseId;
	}

	public void setNurseId(int nurseId) {
		this.nurseId = nurseId;
	}

	public int getBedId() {
		return bedId;
	}

	public void setBedId(int bedId) {
		this.bedId = bedId;
	}

	public String getCheckUpdTime() {
		return checkUpdTime;
	}

	public void setCheckUpdTime(String checkUpdTime) {
		this.checkUpdTime = checkUpdTime;
	}

	public String getPrecription() {
		return Precription;
	}

	public void setPrecription(String precription) {
		Precription = precription;
	}

	public String getComments() {
		return Comments;
	}

	public void setComments(String comments) {
		Comments = comments;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getStrength() {
		return Strength;
	}

	public void setStrength(String strength) {
		Strength = strength;
	}

	public String getDose() {
		return Dose;
	}

	public void setDose(String dose) {
		Dose = dose;
	}

	public String getFluildDrips() {
		return FluildDrips;
	}

	public void setFluildDrips(String fluildDrips) {
		FluildDrips = fluildDrips;
	}

	public float getQuantity() {
		return quantity;
	}

	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}

	public String getDate() {
		return Date;
	}

	public void setDate(String date) {
		Date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getInvProdId() {
		return invProdId;
	}

	public void setInvProdId(String invProdId) {
		this.invProdId = invProdId;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getHeadingNote() {
		return headingNote;
	}

	public void setHeadingNote(String headingNote) {
		this.headingNote = headingNote;
	}

	public int getAssigned_by() {
		return assigned_by;
	}

	public void setAssigned_by(int assigned_by) {
		this.assigned_by = assigned_by;
	}

	public String getAssign_date_time() {
		return assign_date_time;
	}

	public void setAssign_date_time(String assign_date_time) {
		this.assign_date_time = assign_date_time;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<TreatmentNurshingDTO> getTreNurseList() {
		return treNurseList;
	}

	public void setTreNurseList(List<TreatmentNurshingDTO> treNurseList) {
		this.treNurseList = treNurseList;
	}

	public String getDateVital() {
		return dateVital;
	}

	public void setDateVital(String dateVital) {
		this.dateVital = dateVital;
	}

	public String getHeadingName() {
		return headingName;
	}

	public void setHeadingName(String headingName) {
		this.headingName = headingName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	@Override
	public String toString() {
		return "TreatmentNurshingDTO [id=" + id + ", treatmentId=" + treatmentId + ", nurseId=" + nurseId + ", bedId="
				+ bedId + ", checkUpdTime=" + checkUpdTime + ", Precription=" + Precription + ", Comments=" + Comments
				+ ", drugName=" + drugName + ", Strength=" + Strength + ", Dose=" + Dose + ", FluildDrips="
				+ FluildDrips + ", quantity=" + quantity + ", Date=" + Date + ", status=" + status + ", invProdId="
				+ invProdId + ", note=" + note + ", headingNote=" + headingNote + ", assigned_by=" + assigned_by
				+ ", assign_date_time=" + assign_date_time + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId + ", dateVital="
				+ dateVital + ", headingName=" + headingName + ", doctorName=" + doctorName + ", treNurseList="
				+ treNurseList + "]";
	}

	
	
	
	
	
	
	 
}
