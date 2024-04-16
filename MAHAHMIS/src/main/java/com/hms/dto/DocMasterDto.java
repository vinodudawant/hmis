package com.hms.dto;

import java.util.Date;
import java.util.List;

import com.hms.ehat.dto.FolderDocDto;

public class DocMasterDto {
	
	private Integer patId;
	private Integer treatmentId;
	private Integer departmentId;
	private String opdipdno;
	private Date createddate;
	private Integer age;
	private Integer agedays;
	private Integer agemonths;
	private String patientAge;
	private String patientName;
	private String fileStatus;
	
	private List<DocMasterDto> lstDocmaster;
	private List<FolderDocDto> lstFoldermaster;	
	private List<Integer> lstCount;
	public Integer getPatId() {
		return patId;
	}
	public void setPatId(Integer patId) {
		this.patId = patId;
	}
	public Integer getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public String getOpdipdno() {
		return opdipdno;
	}
	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}
	public Date getCreateddate() {
		return createddate;
	}
	public void setCreateddate(Date createddate) {
		this.createddate = createddate;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public Integer getAgedays() {
		return agedays;
	}
	public void setAgedays(Integer agedays) {
		this.agedays = agedays;
	}
	public Integer getAgemonths() {
		return agemonths;
	}
	public void setAgemonths(Integer agemonths) {
		this.agemonths = agemonths;
	}
	public String getPatientAge() {
		return patientAge;
	}
	public void setPatientAge(String patientAge) {
		this.patientAge = patientAge;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getFileStatus() {
		return fileStatus;
	}
	public void setFileStatus(String fileStatus) {
		this.fileStatus = fileStatus;
	}
	public List<DocMasterDto> getLstDocmaster() {
		return lstDocmaster;
	}
	public void setLstDocmaster(List<DocMasterDto> lstDocmaster) {
		this.lstDocmaster = lstDocmaster;
	}
	public List<FolderDocDto> getLstFoldermaster() {
		return lstFoldermaster;
	}
	public void setLstFoldermaster(List<FolderDocDto> lstFoldermaster) {
		this.lstFoldermaster = lstFoldermaster;
	}
	public List<Integer> getLstCount() {
		return lstCount;
	}
	public void setLstCount(List<Integer> lstCount) {
		this.lstCount = lstCount;
	}
	
	
	
}
