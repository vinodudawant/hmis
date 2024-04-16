package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

public class DischargeDeathPatientDto {

	private int ipdcount;

	private int riscount;

	private int labcount;

	private int proipdcount;

	private int proriscount;

	private int prolabcount;

	private int admcount;

	private int dischargecount;

	private int proadmcount;

	private int prodischargecount;

	private int deathcount;

	private int transferredcount;

	private int prodeathcount;

	private Date LabassignDate;

	private String serviceName;

	private int protransferredcount;

	private String patientName;

	private String phone;

	private String uhId;

	private String consDoctor;

	private Date admissionDate;

	private String address;
	
	private Date dischargeDate;
	
	private String dischargeTime;
	
	private String dischargeType;
	
	private String bedNo;
	
	private String hallName;
	
	private String hallTypeName;
	
	private Integer age;
	
	private String gender;
	
	private List<DischargeDeathPatientDto> dischargeList;

	
	
	public String getDischargeTime() {
		return dischargeTime;
	}

	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}

	public int getIpdcount() {
		return ipdcount;
	}

	public void setIpdcount(int ipdcount) {
		this.ipdcount = ipdcount;
	}

	public int getRiscount() {
		return riscount;
	}

	public void setRiscount(int riscount) {
		this.riscount = riscount;
	}

	public int getLabcount() {
		return labcount;
	}

	public void setLabcount(int labcount) {
		this.labcount = labcount;
	}

	public int getProipdcount() {
		return proipdcount;
	}

	public void setProipdcount(int proipdcount) {
		this.proipdcount = proipdcount;
	}

	public int getProriscount() {
		return proriscount;
	}

	public void setProriscount(int proriscount) {
		this.proriscount = proriscount;
	}

	public int getProlabcount() {
		return prolabcount;
	}

	public void setProlabcount(int prolabcount) {
		this.prolabcount = prolabcount;
	}

	public int getAdmcount() {
		return admcount;
	}

	public void setAdmcount(int admcount) {
		this.admcount = admcount;
	}

	public int getDischargecount() {
		return dischargecount;
	}

	public void setDischargecount(int dischargecount) {
		this.dischargecount = dischargecount;
	}

	public int getProadmcount() {
		return proadmcount;
	}

	public void setProadmcount(int proadmcount) {
		this.proadmcount = proadmcount;
	}

	public int getProdischargecount() {
		return prodischargecount;
	}

	public void setProdischargecount(int prodischargecount) {
		this.prodischargecount = prodischargecount;
	}

	public int getDeathcount() {
		return deathcount;
	}

	public void setDeathcount(int deathcount) {
		this.deathcount = deathcount;
	}

	public int getTransferredcount() {
		return transferredcount;
	}

	public void setTransferredcount(int transferredcount) {
		this.transferredcount = transferredcount;
	}

	public int getProdeathcount() {
		return prodeathcount;
	}

	public void setProdeathcount(int prodeathcount) {
		this.prodeathcount = prodeathcount;
	}

	public Date getLabassignDate() {
		return LabassignDate;
	}

	public void setLabassignDate(Date labassignDate) {
		LabassignDate = labassignDate;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public int getProtransferredcount() {
		return protransferredcount;
	}

	public void setProtransferredcount(int protransferredcount) {
		this.protransferredcount = protransferredcount;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUhId() {
		return uhId;
	}

	public void setUhId(String uhId) {
		this.uhId = uhId;
	}

	public String getConsDoctor() {
		return consDoctor;
	}

	public void setConsDoctor(String consDoctor) {
		this.consDoctor = consDoctor;
	}

	public Date getAdmissionDate() {
		return admissionDate;
	}

	public void setAdmissionDate(Date admissionDate) {
		this.admissionDate = admissionDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public Date getDischargeDate() {
		return dischargeDate;
	}

	public void setDischargeDate(Date dischargeDate) {
		this.dischargeDate = dischargeDate;
	}

	public String getDischargeType() {
		return dischargeType;
	}

	public void setDischargeType(String dischargeType) {
		this.dischargeType = dischargeType;
	}

	public String getBedNo() {
		return bedNo;
	}

	public void setBedNo(String bedNo) {
		this.bedNo = bedNo;
	}

	public String getHallName() {
		return hallName;
	}

	public void setHallName(String hallName) {
		this.hallName = hallName;
	}

	public String getHallTypeName() {
		return hallTypeName;
	}

	public void setHallTypeName(String hallTypeName) {
		this.hallTypeName = hallTypeName;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<DischargeDeathPatientDto> getDischargeList() {
		return dischargeList;
	}

	public void setDischargeList(List<DischargeDeathPatientDto> dischargeList) {
		this.dischargeList = dischargeList;
	}

}
