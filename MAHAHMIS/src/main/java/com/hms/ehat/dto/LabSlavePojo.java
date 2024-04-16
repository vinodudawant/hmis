package com.hms.ehat.dto;

import java.util.List;

public class LabSlavePojo {
	
	int bilDetId=0;
	int serviceId=0;
	int subSrvid=0;
	String testName="-";
	int doctorId;
	
	List <LabSlavePojo> subSrvList =null;
	int refDocId=0;
	Double totalBillAmt=0.0;
	public int getBilDetId() {
		return bilDetId;
	}
	public void setBilDetId(int bilDetId) {
		this.bilDetId = bilDetId;
	}
	public int getServiceId() {
		return serviceId;
	}
	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}
	public int getSubSrvid() {
		return subSrvid;
	}
	public void setSubSrvid(int subSrvid) {
		this.subSrvid = subSrvid;
	}
	public List<LabSlavePojo> getSubSrvList() {
		return subSrvList;
	}
	public void setSubSrvList(List<LabSlavePojo> subSrvList) {
		this.subSrvList = subSrvList;
	}
	public int getRefDocId() {
		return refDocId;
	}
	public void setRefDocId(int refDocId) {
		this.refDocId = refDocId;
	}
	public Double getTotalBillAmt() {
		return totalBillAmt;
	}
	public void setTotalBillAmt(Double totalBillAmt) {
		this.totalBillAmt = totalBillAmt;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	@Override
	public String toString() {
		return "LabSlavePojo [bilDetId=" + bilDetId + ", serviceId=" + serviceId + ", subSrvid=" + subSrvid
				+ ", testName=" + testName + ", doctorId=" + doctorId + ", subSrvList=" + subSrvList + ", refDocId="
				+ refDocId + ", totalBillAmt=" + totalBillAmt + "]";
	}
	
	
}
