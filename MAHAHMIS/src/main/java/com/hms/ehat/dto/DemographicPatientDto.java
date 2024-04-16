package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity 
@Table(name = "ehat_demographic_patient")
public class DemographicPatientDto {

	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "reg_no",columnDefinition="varchar(20) default '-'")
	private String regNo="-";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Column(name = "prefix",columnDefinition="varchar(15) default '-'")
	private String prefix;
	
	
	@Column(name = "patient_name",columnDefinition="varchar(255) default '-'")
	private String patientName="-";
	
	@Column(name = "relation_prefix",columnDefinition="varchar(15) default '-'")
	private String relationPrefix="-";
	
	@Column(name = "relative_name",columnDefinition="varchar(255) default '-'")
	private String relativeName="-";
	
	@Column(name = "client_id",columnDefinition="int default 0")
	private int clientId=0;
	
	@Column(name = "age",columnDefinition="int default 0")
	private int age=0;
	
	@Column(name = "gender",columnDefinition="varchar(15) default '-'")
	private String gender="-";
	
	@Column(name = "sponsor_type",columnDefinition="varchar(255) default '-'")
	private String sponsorType="-";
	
	@Column(name = "occupation",columnDefinition="varchar(255) default '-'")
	private String occupation="-";
	
	@Column(name = "res_add1",columnDefinition="varchar(255) default '-'")
	private String resAdd1="-";
	
	@Column(name = "res_add2",columnDefinition="varchar(255) default '-'")
	private String resAdd2="-";
	
	@Column(name = "res_add3",columnDefinition="varchar(255) default '-'")
	private String resAdd3="-";
	
	@Column(name = "res_dist",columnDefinition="varchar(255) default '-'")
	private String resDist="-";
	
	@Column(name = "mobile",columnDefinition="varchar(100) default '-'")
	private String mobile;
	
	@Column(name = "per_add1",columnDefinition="varchar(255) default '-'")
	private String perAdd1="-";
	
	@Column(name = "per_add2",columnDefinition="varchar(255) default '-'")
	private String perAdd2="-";
	
	@Column(name = "per_add3",columnDefinition="varchar(255) default '-'")
	private String perAdd3="-";
	
	@Column(name = "ref_by",columnDefinition="varchar(255) default '-'")
	private String refBy="-";
	
	@Column(name = "remark",columnDefinition="varchar(500) default '-'")
	private String remark="-";
	
	@Column(name = "previous_diagnosis",columnDefinition="varchar(255) default '-'")
	private String previousDiagnosis="-";
	
	@Column(name = "final_diagnosis",columnDefinition="varchar(255) default '-'")
	private String finalDiagnosis="-";
	
	@Column(name = "letter_ref_no",columnDefinition="varchar(255) default '-'")
	private String letterRefNo="-";
	
	@Transient
	private List<DemographicPatientDto> listDemographicPatientDto;

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getRelationPrefix() {
		return relationPrefix;
	}

	public void setRelationPrefix(String relationPrefix) {
		this.relationPrefix = relationPrefix;
	}

	public String getRelativeName() {
		return relativeName;
	}

	public void setRelativeName(String relativeName) {
		this.relativeName = relativeName;
	}

	public int getClientId() {
		return clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getSponsorType() {
		return sponsorType;
	}

	public void setSponsorType(String sponsorType) {
		this.sponsorType = sponsorType;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getResAdd1() {
		return resAdd1;
	}

	public void setResAdd1(String resAdd1) {
		this.resAdd1 = resAdd1;
	}

	public String getResAdd2() {
		return resAdd2;
	}

	public void setResAdd2(String resAdd2) {
		this.resAdd2 = resAdd2;
	}

	public String getResAdd3() {
		return resAdd3;
	}

	public void setResAdd3(String resAdd3) {
		this.resAdd3 = resAdd3;
	}

	public String getResDist() {
		return resDist;
	}

	public void setResDist(String resDist) {
		this.resDist = resDist;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPerAdd1() {
		return perAdd1;
	}

	public void setPerAdd1(String perAdd1) {
		this.perAdd1 = perAdd1;
	}

	public String getPerAdd2() {
		return perAdd2;
	}

	public void setPerAdd2(String perAdd2) {
		this.perAdd2 = perAdd2;
	}

	public String getPerAdd3() {
		return perAdd3;
	}

	public void setPerAdd3(String perAdd3) {
		this.perAdd3 = perAdd3;
	}

	public String getRefBy() {
		return refBy;
	}

	public void setRefBy(String refBy) {
		this.refBy = refBy;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getPreviousDiagnosis() {
		return previousDiagnosis;
	}

	public void setPreviousDiagnosis(String previousDiagnosis) {
		this.previousDiagnosis = previousDiagnosis;
	}

	public String getFinalDiagnosis() {
		return finalDiagnosis;
	}

	public void setFinalDiagnosis(String finalDiagnosis) {
		this.finalDiagnosis = finalDiagnosis;
	}

	public String getLetterRefNo() {
		return letterRefNo;
	}

	public void setLetterRefNo(String letterRefNo) {
		this.letterRefNo = letterRefNo;
	}


	public List<DemographicPatientDto> getListDemographicPatientDto() {
		return listDemographicPatientDto;
	}

	public void setListDemographicPatientDto(
			List<DemographicPatientDto> listDemographicPatientDto) {
		this.listDemographicPatientDto = listDemographicPatientDto;
	}
}
