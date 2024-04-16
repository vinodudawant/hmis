package com.hms.ehat.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "out_source_lab_slave1")
public class LabOutSourceSlaveDTOsalve {
	@Id
	@GeneratedValue
	@Column(name = "outsource_labslave_id")
	private Integer outlabIdslave;
	@Column(name = "outsource_master_id")
	private Integer outsourcemasterid;
	@Column(name = "test_id")
	private String testid;
	

	@Column(name = "labrequest_id")
	private String labrequestid;
	
	@Column(name = "test_rate")
	private String testRate;
	
	public String getTestRate() {
		return testRate;
	}

	public void setTestRate(String testRate) {
		this.testRate = testRate;
	}

	public String getLabrequestid() {
		return labrequestid;
	}

	public void setLabrequestid(String labrequestid) {
		this.labrequestid = labrequestid;
	}

	
	@Column(name = "outsource_lab_master_id")
	private Integer outlabId;
	
	public Integer getOutlabId() {
		return outlabId;
	}
	public void setOutlabId(Integer outlabId) {
		this.outlabId = outlabId;
	}
	public Integer getOutlabIdslave() {
		return outlabIdslave;
	}
	public void setOutlabIdslave(Integer outlabIdslave) {
		this.outlabIdslave = outlabIdslave;
	}
	public Integer getOutsourcemasterid() {
		return outsourcemasterid;
	}
	public void setOutsourcemasterid(Integer outsourcemasterid) {
		this.outsourcemasterid = outsourcemasterid;
	}
	public String getTestid() {
		return testid;
	}
	public void setTestid(String testid) {
		this.testid = testid;
	}

	
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	@Column(name = "patient_id")
	private String patientId;
	@Column(name = "treatment_id")
	private String treatmentId;
	@Column(name = "dispatch_Date")
	private String  dispatchDate;
	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}


	@Column(name = "dispatch_Time")
	private String  dispatchTime;


	public String getDispatchDate() {
		return dispatchDate;
	}

	public void setDispatchDate(String dispatchDate) {
		this.dispatchDate = dispatchDate;
	}

	public String getDispatchTime() {
		return dispatchTime;
	}

	public void setDispatchTime(String dispatchTime) {
		this.dispatchTime = dispatchTime;
	}
	@Column(name = "out_flag")
	private String outflag="N";

	public String getOutflag() {
		return outflag;
	}

	public void setOutflag(String outflag) {
		this.outflag = outflag;
	}
	
	
	@Column(name = "out_test_amount")
	private Double outTestAmount;
  
	@Column(name = "outsource_mrp")
	private String outsourcemrp;
	
	

	public String getOutsourcemrp() {
		return outsourcemrp;
	}

	public void setOutsourcemrp(String outsourcemrp) {
		this.outsourcemrp = outsourcemrp;
	}

	public Double getOutTestAmount() {
		return outTestAmount;
	}

	public void setOutTestAmount(Double outTestAmount) {
		this.outTestAmount = outTestAmount;
	}
}
