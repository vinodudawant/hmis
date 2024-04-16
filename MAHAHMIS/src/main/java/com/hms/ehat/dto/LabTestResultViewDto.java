package com.hms.ehat.dto;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "ehat_labtest_result_view")
public class LabTestResultViewDto implements Serializable{

	@Id
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "patient_age")
	private String age;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "labrequest_id")
	private int labrequestId;
	
	@Column(name = "labrequestslave_id")
	private int labrequestslaveId;
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "subservice_id")
	private int subserviceId;
	
	@Column(name = "test")
	private String testName;

	@Column(name = "t_flag")
	private String tFlag;

	//@Temporal(TemporalType.DATE)
	@Column(name = "assign_date",updatable=false)
	private String assignDate;
	
	//@Temporal(TemporalType.TIME)
	@Column(name = "assign_time",updatable=false)
	private String assignTime;

	@Column(name = "refdoc_id")
	private int refDocId;
	
	@Column(name = "refdoc_name")
	private String refDocName;
	
	@Transient
	private List<LabTestResultViewDto> listLabTestResultViewDto;

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	
	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getAssignDate() {
		return assignDate;
	}

	public void setAssignDate(String assignDate) {
		this.assignDate = assignDate;
	}

	public String getAssignTime() {
		return assignTime;
	}

	public void setAssignTime(String assignTime) {
		this.assignTime = assignTime;
	}

	public int getLabrequestId() {
		return labrequestId;
	}

	public void setLabrequestId(int labrequestId) {
		this.labrequestId = labrequestId;
	}

	public int getLabrequestslaveId() {
		return labrequestslaveId;
	}

	public void setLabrequestslaveId(int labrequestslaveId) {
		this.labrequestslaveId = labrequestslaveId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getSubserviceId() {
		return subserviceId;
	}

	public void setSubserviceId(int subserviceId) {
		this.subserviceId = subserviceId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<LabTestResultViewDto> getListLabTestResultViewDto() {
		return listLabTestResultViewDto;
	}

	public void setListLabTestResultViewDto(List<LabTestResultViewDto> listLabTestResultViewDto) {
		this.listLabTestResultViewDto = listLabTestResultViewDto;
	}

	public int getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(int refDocId) {
		this.refDocId = refDocId;
	}

	public String getRefDocName() {
		return refDocName;
	}

	public void setRefDocName(String refDocName) {
		this.refDocName = refDocName;
	}
}
	
	