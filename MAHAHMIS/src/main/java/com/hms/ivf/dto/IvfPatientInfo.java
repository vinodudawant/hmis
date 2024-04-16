package com.hms.ivf.dto;

import java.util.List;

public class IvfPatientInfo {
	
	private String Firstname;
	private String Middlename;
	private String Lastname;
	private String MrnNo;
	private String DOB;
	private String WAG;
	private String Email;
	private String Address;
	private String State;
	private String District;
	private String Taluka;
	private String City;
	private String Mobile;
	
	private int AreaCode;
	
	private String imageName;
	private int DepartmentId;
	
	List<IvfPatientInfo> lstIvfPatientInfo;

	public String getFirstname() {
		return Firstname;
	}

	public void setFirstname(String firstname) {
		Firstname = firstname;
	}

	public String getMiddlename() {
		return Middlename;
	}

	public void setMiddlename(String middlename) {
		Middlename = middlename;
	}

	public String getLastname() {
		return Lastname;
	}

	public void setLastname(String lastname) {
		Lastname = lastname;
	}

	public String getMrnNo() {
		return MrnNo;
	}

	public void setMrnNo(String mrnNo) {
		MrnNo = mrnNo;
	}

	public String getDOB() {
		return DOB;
	}

	public void setDOB(String dOB) {
		DOB = dOB;
	}

	public String getWAG() {
		return WAG;
	}

	public void setWAG(String wAG) {
		WAG = wAG;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public String getState() {
		return State;
	}

	public void setState(String state) {
		State = state;
	}

	public String getDistrict() {
		return District;
	}

	public void setDistrict(String district) {
		District = district;
	}

	public String getTaluka() {
		return Taluka;
	}

	public void setTaluka(String taluka) {
		Taluka = taluka;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	

	public int getAreaCode() {
		return AreaCode;
	}

	public void setAreaCode(int areaCode) {
		AreaCode = areaCode;
	}

	public List<IvfPatientInfo> getLstIvfPatientInfo() {
		return lstIvfPatientInfo;
	}

	public void setLstIvfPatientInfo(List<IvfPatientInfo> lstIvfPatientInfo) {
		this.lstIvfPatientInfo = lstIvfPatientInfo;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	
	
	public String getMobile() {
		return Mobile;
	}

	public void setMobile(String mobile) {
		Mobile = mobile;
	}
	
	

	public int getDepartmentId() {
		return DepartmentId;
	}

	public void setDepartmentId(int departmentId) {
		DepartmentId = departmentId;
	}

	@Override
	public String toString() {
		return "IvfPatientInfo [Firstname=" + Firstname + ", Middlename=" + Middlename + ", Lastname=" + Lastname
				+ ", MrnNo=" + MrnNo + ", DOB=" + DOB + ", WAG=" + WAG + ", Email=" + Email + ", Address=" + Address
				+ ", State=" + State + ", District=" + District + ", Taluka=" + Taluka + ", City=" + City + ", Mobile="
				+ Mobile + ", AreaCode=" + AreaCode + ", imageName=" + imageName + ", DepartmentId=" + DepartmentId
				+ ", lstIvfPatientInfo=" + lstIvfPatientInfo + "]";
	}

	
	
	
	

}
