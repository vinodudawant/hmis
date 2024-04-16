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

@Entity
@Table(name = "pathology_lab_phlebotomymaster_profile")
public class LabPhlebotomyMasterSalve {

	@Id
	@GeneratedValue	
	@Column(name = "phlebotomy_slave_id")
	private Integer phlebotomyprofileid;	
	
	@Column(name = "profile_id")
	private Integer profileid;	
	
	@Column(name = "package_Id")
	private Integer packageid;
	
	@Column(name = "sample_Id")
	private Integer sampleId;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "patient_Id")
	private Integer patientId;
	
	@Column(name = "labrequest_Id")
	private Integer labrequestId;
	
	@Column(name = "treatment_Id")
	private Integer treatmentId;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;	
	
	@Transient
	private List<LabPhlebotomyMasterSalve> phlebotomytableListsalve;

	public Integer getPhlebotomyprofileid() {
		return phlebotomyprofileid;
	}

	public void setPhlebotomyprofileid(Integer phlebotomyprofileid) {
		this.phlebotomyprofileid = phlebotomyprofileid;
	}

	public Integer getProfileid() {
		return profileid;
	}

	public void setProfileid(Integer profileid) {
		this.profileid = profileid;
	}

	public Integer getPackageid() {
		return packageid;
	}

	public void setPackageid(Integer packageid) {
		this.packageid = packageid;
	}

	public Integer getSampleId() {
		return sampleId;
	}

	public void setSampleId(Integer sampleId) {
		this.sampleId = sampleId;
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
	
	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getLabrequestId() {
		return labrequestId;
	}

	public void setLabrequestId(Integer labrequestId) {
		this.labrequestId = labrequestId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public List<LabPhlebotomyMasterSalve> getPhlebotomytableListsalve() {
		return phlebotomytableListsalve;
	}

	public void setPhlebotomytableListsalve(
			List<LabPhlebotomyMasterSalve> phlebotomytableListsalve) {
		this.phlebotomytableListsalve = phlebotomytableListsalve;
	}
	


}
