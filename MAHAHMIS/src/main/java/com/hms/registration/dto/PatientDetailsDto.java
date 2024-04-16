package com.hms.registration.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class PatientDetailsDto {
	
	int ptId,unitId,blockUserId1,blockUserId2,blockUserId3;
	Number ttId,department_id,sponsorchargesSlaveId;
    String pIdd,centerPatientId,patientName,mobile,adharcardNo,deleted,blockFlag,tdeleted,tFlag;
    String blockUserName1,blockUserName2,blockUserName3,blockNarration1,blockNarration2,blockNarration3;
    Date createdDateTime;
  
    @Transient
	private Integer getPatientCount;
    
	List<PatientDetailsDto> lstRegviewDto;

	public Integer getGetPatientCount() {
		return getPatientCount;
	}

	public void setGetPatientCount(Integer getPatientCount) {
		this.getPatientCount = getPatientCount;
	}

	public int getPtId() {
		return ptId;
	}

	public void setPtId(int ptId) {
		this.ptId = ptId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Number getTtId() {
		return ttId;
	}

	public void setTtId(Number ttId) {
		this.ttId = ttId;
	}

	public Number getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Number department_id) {
		this.department_id = department_id;
	}

	public Number getSponsorchargesSlaveId() {
		return sponsorchargesSlaveId;
	}

	public void setSponsorchargesSlaveId(Number sponsorchargesSlaveId) {
		this.sponsorchargesSlaveId = sponsorchargesSlaveId;
	}

	public int getBlockUserId1() {
		return blockUserId1;
	}

	public void setBlockUserId1(int blockUserId1) {
		this.blockUserId1 = blockUserId1;
	}

	public int getBlockUserId2() {
		return blockUserId2;
	}

	public void setBlockUserId2(int blockUserId2) {
		this.blockUserId2 = blockUserId2;
	}

	public int getBlockUserId3() {
		return blockUserId3;
	}

	public void setBlockUserId3(int blockUserId3) {
		this.blockUserId3 = blockUserId3;
	}

	public String getpIdd() {
		return pIdd;
	}

	public void setpIdd(String pIdd) {
		this.pIdd = pIdd;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAdharcardNo() {
		return adharcardNo;
	}

	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getBlockFlag() {
		return blockFlag;
	}

	public void setBlockFlag(String blockFlag) {
		this.blockFlag = blockFlag;
	}

	public String getTdeleted() {
		return tdeleted;
	}

	public void setTdeleted(String tdeleted) {
		this.tdeleted = tdeleted;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public String getBlockUserName1() {
		return blockUserName1;
	}

	public void setBlockUserName1(String blockUserName1) {
		this.blockUserName1 = blockUserName1;
	}

	public String getBlockUserName2() {
		return blockUserName2;
	}

	public void setBlockUserName2(String blockUserName2) {
		this.blockUserName2 = blockUserName2;
	}

	public String getBlockUserName3() {
		return blockUserName3;
	}

	public void setBlockUserName3(String blockUserName3) {
		this.blockUserName3 = blockUserName3;
	}

	public String getBlockNarration1() {
		return blockNarration1;
	}

	public void setBlockNarration1(String blockNarration1) {
		this.blockNarration1 = blockNarration1;
	}

	public String getBlockNarration2() {
		return blockNarration2;
	}

	public void setBlockNarration2(String blockNarration2) {
		this.blockNarration2 = blockNarration2;
	}

	public String getBlockNarration3() {
		return blockNarration3;
	}

	public void setBlockNarration3(String blockNarration3) {
		this.blockNarration3 = blockNarration3;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public List<PatientDetailsDto> getLstRegviewDto() {
		return lstRegviewDto;
	}

	public void setLstRegviewDto(List<PatientDetailsDto> lstRegviewDto) {
		this.lstRegviewDto = lstRegviewDto;
	}
}
