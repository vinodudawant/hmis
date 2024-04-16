package com.hms.mortuary.dto;

import java.util.List;

public class ColdRoomBedStatus {

	private int coldRoomMasterSlaveId;
	private int bedNumber;
	private String bedStatus;
	
	private int morId;
	private String address;
	private String age;
	private String dod;
	private String deceasedName;
	private String gender;
	
	private List<ColdRoomBedStatus> list;
	
	public ColdRoomBedStatus() {
		super();
	}
	
	
	public int getColdRoomMasterSlaveId() {
		return coldRoomMasterSlaveId;
	}
	
	public void setColdRoomMasterSlaveId(int coldRoomMasterSlaveId) {
		this.coldRoomMasterSlaveId = coldRoomMasterSlaveId;
	}
	
	public int getBedNumber() {
		return bedNumber;
	}
	
	public void setBedNumber(int bedNumber) {
		this.bedNumber = bedNumber;
	}
	
	public String getBedStatus() {
		return bedStatus;
	}
	
	public void setBedStatus(String bedStatus) {
		this.bedStatus = bedStatus;
	}
	
	public int getMorId() {
		return morId;
	}
	
	public void setMorId(int morId) {
		this.morId = morId;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getAge() {
		return age;
	}
	
	public void setAge(String age) {
		this.age = age;
	}
	
	public String getDod() {
		return dod;
	}
	
	public void setDod(String dod) {
		this.dod = dod;
	}
	
	public String getDeceasedName() {
		return deceasedName;
	}
	
	public void setDeceasedName(String deceasedName) {
		this.deceasedName = deceasedName;
	}
	
	public String getGender() {
		return gender;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<ColdRoomBedStatus> getList() {
		return list;
	}


	public void setList(List<ColdRoomBedStatus> list) {
		this.list = list;
	}


	@Override
	public String toString() {
		return "ColdRoomBedStatus [coldRoomMasterSlaveId="
				+ coldRoomMasterSlaveId + ", bedNumber=" + bedNumber
				+ ", bedStatus=" + bedStatus + ", morId=" + morId
				+ ", address=" + address + ", age=" + age + ", dod=" + dod
				+ ", deceasedName=" + deceasedName + ", gender=" + gender
				+ ", list=" + list + "]";
	}
}