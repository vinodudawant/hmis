package com.hms.ivf.dto;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_ivf_batch_slave")
public class IVFBatchSlave

{
	@Id
	@GeneratedValue
	@Column(name = "ivf_batch_slave_id")
	private Integer ivfBatchSlaveId;
	
	@Column(name = "ivf_batch_master_id")
	private Integer ivfBatchMasterId;

	@Column(name = "ivf_couple_id")
	private Integer CoupleId;
	
	@Column(name = "ivf_batch_male_patient_id")
	private Integer malePatientID;
	
	
	@Column(name = "ivf_batch_female_patient_id")
	private Integer femalePatientID;
	
	@Column(name = "male_dept_Id")
	private Integer maleDeptId;
	
	@Column(name = "female_dept_Id")
	private Integer femaleDeptId;
	
	@Column(name = "male_doctor_Id")
	private Integer maleDoctorId;
	
	@Column(name = "female_doctor_Id")
	private Integer femaleDoctorId;
	
	@Column(name = "ivf_couple_status")
	private String ivfCoupleStatus = "N";
	
	@Transient
	private List<IVFBatchSlave> ltivfBatchSlave;
	
	public Integer getIvfBatchSlaveId() {
		return ivfBatchSlaveId;
	}

	public void setIvfBatchSlaveId(Integer ivfBatchSlaveId) {
		this.ivfBatchSlaveId = ivfBatchSlaveId;
	}
	
	public Integer getMalePatientID() {
		return malePatientID;
	}

	public void setMalePatientID(Integer malePatientID) {
		this.malePatientID = malePatientID;
	}
	
	public Integer getFemalePatientID() {
		return femalePatientID;
	}

	public void setFemalePatientID(Integer femalePatientID) {
		this.femalePatientID = femalePatientID;
	}
	
	public Integer getMaleDeptId() {
		return maleDeptId;
	}

	public void setMaleDeptId(Integer maleDeptId) {
		this.maleDeptId = maleDeptId;
	}

	public Integer getFemaleDeptId() {
		return femaleDeptId;
	}

	public void setFemaleDeptId(Integer femaleDeptId) {
		this.femaleDeptId = femaleDeptId;
	}

	public Integer getIvfBatchMasterId() {
		return ivfBatchMasterId;
	}

	public void setIvfBatchMasterId(Integer ivfBatchMasterId) {
		this.ivfBatchMasterId = ivfBatchMasterId;
	}
	
	public List<IVFBatchSlave> getLtivfBatchSlave() {
		return ltivfBatchSlave;
	}

	public void setLtivfBatchSlave(List<IVFBatchSlave> ltivfBatchSlave) {
		this.ltivfBatchSlave = ltivfBatchSlave;
	}
	
	public Integer getMaleDoctorId() {
		return maleDoctorId;
	}

	public void setMaleDoctorId(Integer maleDoctorId) {
		this.maleDoctorId = maleDoctorId;
	}

	public Integer getFemaleDoctorId() {
		return femaleDoctorId;
	}

	public void setFemaleDoctorId(Integer femaleDoctorId) {
		this.femaleDoctorId = femaleDoctorId;
	}
	
	public Integer getIvfCoupleId() {
		return CoupleId;
	}

	public void setIvfCoupleId(Integer ivfCoupleId) {
		this.CoupleId = ivfCoupleId;
	}
	
	public String getIvfCoupleStatus() {
		return ivfCoupleStatus;
	}

	public void setIvfCoupleStatus(String ivfCoupleStatus) {
		this.ivfCoupleStatus = ivfCoupleStatus;
	}
}
