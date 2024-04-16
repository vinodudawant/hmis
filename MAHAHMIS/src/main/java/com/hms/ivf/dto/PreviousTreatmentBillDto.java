package com.hms.ivf.dto;

import java.util.Date;
import java.util.List;

public class PreviousTreatmentBillDto {
	
	private Integer ptId;
	private String pIdd;
	private String patientName;
	private String adharcardNo;
	private String mobile;
	private Integer unitId;
	private int department_id;
	private String opdipdno;
	private String mrnno;
	private String centerPatientId;
	private String tFlag;
	private Integer ttId;
	private Date createdDateTime;
	private Integer sponsorchargesSlaveId;
	private List<PreviousTreatmentBillDto> lstRegviewDto;
	
	public Integer getPtId() {
		return ptId;
	}
	public void setPtId(Integer ptId) {
		this.ptId = ptId;
	}
	public String getpIdd() {
		return pIdd;
	}
	public void setpIdd(String pIdd) {
		this.pIdd = pIdd;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getAdharcardNo() {
		return adharcardNo;
	}
	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public int getDepartment_id() {
		return department_id;
	}
	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}
	public String getOpdipdno() {
		return opdipdno;
	}
	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}
	public String getMrnno() {
		return mrnno;
	}
	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	public String gettFlag() {
		return tFlag;
	}
	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}
	public Integer getTtId() {
		return ttId;
	}
	public void setTtId(Integer ttId) {
		this.ttId = ttId;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Integer getSponsorchargesSlaveId() {
		return sponsorchargesSlaveId;
	}
	public void setSponsorchargesSlaveId(Integer sponsorchargesSlaveId) {
		this.sponsorchargesSlaveId = sponsorchargesSlaveId;
	}
	public List<PreviousTreatmentBillDto> getLstRegviewDto() {
		return lstRegviewDto;
	}
	public void setLstRegviewDto(List<PreviousTreatmentBillDto> lstRegviewDto) {
		this.lstRegviewDto = lstRegviewDto;
	}
}
