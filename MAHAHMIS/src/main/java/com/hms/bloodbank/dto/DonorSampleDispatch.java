package com.hms.bloodbank.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.doctordesk.dto.DdHistoryDto;

@SuppressWarnings("deprecation")
@Entity
@Table(name="bb_blood_sample_dispatch")
public class DonorSampleDispatch implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 0;
	
	
	@Id
	@GeneratedValue
	@Column(name = "blood_sample_dispatch_id")
	private Integer bloodSampleDispatchId;
	
	@Column(name = "sample_donor_name")
	private String sampleDonorName;
	
	@Column(name = "sample_donor_id")
	private Integer sampleDonorId=0;
	
	@Column(name = "sample_treatment_id")
	private Integer sampleTreatmentId=0;
		
	@Column(name = "sample_item_name")
	private Integer sampleItemName=0;
	
	@Column(name = "sample_blood_bag_id")
	private Integer sampleBloodBagId=0;
	

	@Column(name = "sample_dispatch_remarks")
	private String sampleDispatchRemarks;
	
	@Column(name = "sample_status")
	private Integer sampleStatus=0;
	
	@Column(name = "sample_blood_bag_Number")
	private String sampleBloodBagNumber;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	
	@Column(name = "ackRemarks")
	private String ackRemarks="N";
	
	@Column(name = "testStatus")
	private String testStatus="N";
	
	

	@CreationTimestamp
	@Column(name = "created_datetime", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_datetime")
	private Date updatedDate;
	
	@UpdateTimestamp
	@Column(name = "deleted_datetime")
	private Date deletedDate;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "blood_sample_dispatch_ip")
	private String ipAddress = null;
	
	@Transient
	private List<DonorSampleDispatch> donorSampleDispatchList;

	@Transient
	private Integer componentSeperation=0;
	
	@Transient
	private Integer transfusion_trans_disease_lab=0;
	
	@Transient
	private Integer red_cell_serology=0;
	
	@Transient
	private String patient_title_name;
	
	
	public String getAckRemarks() {
		return ackRemarks;
	}

	public void setAckRemarks(String ackRemarks) {
		this.ackRemarks = ackRemarks;
	}

	public String getTestStatus() {
		return testStatus;
	}

	public void setTestStatus(String testStatus) {
		this.testStatus = testStatus;
	}

	public String getPatient_title_name() {
		return patient_title_name;
	}

	public void setPatient_title_name(String patient_title_name) {
		this.patient_title_name = patient_title_name;
	}

	public Integer getBloodSampleDispatchId() {
		return bloodSampleDispatchId;
	}

	public void setBloodSampleDispatchId(Integer bloodSampleDispatchId) {
		this.bloodSampleDispatchId = bloodSampleDispatchId;
	}

	public String getSampleDonorName() {
		return sampleDonorName;
	}

	public void setSampleDonorName(String sampleDonorName) {
		this.sampleDonorName = sampleDonorName;
	}

	public Integer getSampleDonorId() {
		return sampleDonorId;
	}

	public void setSampleDonorId(Integer sampleDonorId) {
		this.sampleDonorId = sampleDonorId;
	}

	public Integer getSampleTreatmentId() {
		return sampleTreatmentId;
	}

	public void setSampleTreatmentId(Integer sampleTreatmentId) {
		this.sampleTreatmentId = sampleTreatmentId;
	}

	public Integer getSampleItemName() {
		return sampleItemName;
	}

	public void setSampleItemName(Integer sampleItemName) {
		this.sampleItemName = sampleItemName;
	}

	public String getSampleDispatchRemarks() {
		return sampleDispatchRemarks;
	}

	public void setSampleDispatchRemarks(String sampleDispatchRemarks) {
		this.sampleDispatchRemarks = sampleDispatchRemarks;
	}

	public Integer getSampleStatus() {
		return sampleStatus;
	}

	public void setSampleStatus(Integer sampleStatus) {
		this.sampleStatus = sampleStatus;
	}

	public String getSampleBloodBagNumber() {
		return sampleBloodBagNumber;
	}

	public void setSampleBloodBagNumber(String sampleBloodBagNumber) {
		this.sampleBloodBagNumber = sampleBloodBagNumber;
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

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public List<DonorSampleDispatch> getDonorSampleDispatchList() {
		return donorSampleDispatchList;
	}

	public void setDonorSampleDispatchList(List<DonorSampleDispatch> donorSampleDispatchList) {
		this.donorSampleDispatchList = donorSampleDispatchList;
	}

	public Integer getComponentSeperation() {
		return componentSeperation;
	}

	public void setComponentSeperation(Integer componentSeperation) {
		this.componentSeperation = componentSeperation;
	}

	public Integer getTransfusion_trans_disease_lab() {
		return transfusion_trans_disease_lab;
	}

	public void setTransfusion_trans_disease_lab(Integer transfusion_trans_disease_lab) {
		this.transfusion_trans_disease_lab = transfusion_trans_disease_lab;
	}

	public Integer getRed_cell_serology() {
		return red_cell_serology;
	}

	public void setRed_cell_serology(Integer red_cell_serology) {
		this.red_cell_serology = red_cell_serology;
	}

	public Integer getSampleBloodBagId() {
		return sampleBloodBagId;
	}

	public void setSampleBloodBagId(Integer sampleBloodBagId) {
		this.sampleBloodBagId = sampleBloodBagId;
	}

	



}
