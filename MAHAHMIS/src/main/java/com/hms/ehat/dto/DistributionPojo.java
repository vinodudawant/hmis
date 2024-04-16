package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Transient;


public class DistributionPojo implements Serializable {

	private static final long serialVersionUID = 1L;

	Integer patientId;
	Integer treatmentId;
	Integer departmentId;
	Integer billId;
	Double distRate;
	Double TotalAmt;
	Integer userId;
	int unitId;
	Integer chargesSlaveId;
	
	/*@Transient
	private List<DistributionPojo> DistributionPojoDto;*/
	

	private List <DistributionPojo>  listDistributionPojo;
	
	
	
	public Integer getPatientId() {
		return patientId;
	}
	public Integer getTreatmentId() {
		return treatmentId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public Integer getBillId() {
		return billId;
	}
	public Double getDistRate() {
		return distRate;
	}
	public Integer getUserId() {
		return userId;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public void setBillId(Integer billId) {
		this.billId = billId;
	}
	public void setDistRate(Double distRate) {
		this.distRate = distRate;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public List<DistributionPojo> getListDistributionPojo() {
		return listDistributionPojo;
	}
	public void setListDistributionPojo(List<DistributionPojo> listDistributionPojo) {
		this.listDistributionPojo = listDistributionPojo;
	}
	public Double getTotalAmt() {
		return TotalAmt;
	}
	public void setTotalAmt(Double totalAmt) {
		TotalAmt = totalAmt;
	}
	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}
	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

}
