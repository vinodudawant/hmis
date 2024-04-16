package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity(name = "ehat_dialysis_Advice")
public class DialysisAdviceDto {

	@Id
	@GeneratedValue
	
	@Column(name = "dialysisAdvice_Id")
	private int dialysisAdviceId;
	
	@Column(name = "indication")
	private String indicationId;
	
	@Column(name = "dialysis_Type")
	private String dialysisType;
	
	@Column(name = "frequencyDialysis")
	private String frequencyDialysis;
	
	@Column(name = "note")
	private String Note;
	
	@Column(name = "treatmentId")
	private int treatmentId;
	
	@Column(name = "paitent_id")
	private int pid;

	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	@Column(name = "updated_by")
	private Integer updatedBy;
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	@Column(name = "deleted")
	private String deleted="N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Transient
	private List<DialysisAdviceDto> listDialysis;

	public int getDialysisAdviceId() {
		return dialysisAdviceId;
	}

	public void setDialysisAdviceId(int dialysisAdviceId) {
		this.dialysisAdviceId = dialysisAdviceId;
	}

	public String getIndicationId() {
		return indicationId;
	}

	public void setIndicationId(String indicationId) {
		this.indicationId = indicationId;
	}

	public String getDialysisType() {
		return dialysisType;
	}

	public void setDialysisType(String dialysisType) {
		this.dialysisType = dialysisType;
	}

	public String getFrequencyDialysis() {
		return frequencyDialysis;
	}

	public void setFrequencyDialysis(String frequencyDialysis) {
		this.frequencyDialysis = frequencyDialysis;
	}

	public String getNote() {
		return Note;
	}

	public void setNote(String note) {
		Note = note;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public List<DialysisAdviceDto> getListDialysis() {
		return listDialysis;
	}

	public void setListDialysis(List<DialysisAdviceDto> listDialysis) {
		this.listDialysis = listDialysis;
	}
	
	@Transient
	private int hallId;
	@Transient
	private String wardName;
	@Transient
	private String bedNo;
	

	public String getBedNo() {
		return bedNo;
	}

	public void setBedNo(String bedNo) {
		this.bedNo = bedNo;
	}

	public int getHallId() {
		return hallId;
	}

	public void setHallId(int hallId) {
		this.hallId = hallId;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}
	@Transient
	private int patientId;
	@Transient
	private String patientname;
	@Transient
	private String mobile;
	
	@JsonGetter("mobile")
	public String getMobile() {
		return mobile;
	}
	@JsonSetter("mobile")
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@JsonGetter("patientId")
	public int getPatientId() {
		return patientId;
	}

	@JsonSetter("patientId")
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	@JsonGetter("patientName")
	public String getPatientname() {
		return patientname;
	}
	@JsonSetter("patientName")
	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
	
	@Transient
	private int doctorId;
	@Transient
	private String doctorname;

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorname() {
		return doctorname;
	}

	public void setDoctorname(String doctorname) {
		this.doctorname = doctorname;
	}
	
	@Transient
	private int testid;
	@Transient
	private String testname;
	@Transient
	private double charges;
	
	public double getCharges() {
		return charges;
	}

	public void setCharges(double charges) {
		this.charges = charges;
	}

	public int getTestid() {
		return testid;
	}

	public void setTestid(int testid) {
		this.testid = testid;
	}

	public String getTestname() {
		return testname;
	}

	public void setTestname(String testname) {
		this.testname = testname;
	}
	
	@Transient
	private int pId;

	public int getpId() {
		return pId;
	}

	public void setpIdsetpId(int pId) {
		this.pId = pId;
	}
}
