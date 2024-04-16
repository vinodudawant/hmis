package com.hms.ehat.dto;

import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "ehat_lab_result_mst_view")
public class LabResultMstViewDto {

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

	@Column(name = "service_id")
	private int serviceId;

	@Column(name = "test")
	private String testName;

	@Column(name = "t_flag")
	private String tFlag;

	// @Temporal(TemporalType.DATE)
	@Column(name = "assign_date", updatable = false)
	private String assignDate;

	// @Temporal(TemporalType.TIME)
	@Column(name = "assign_time", updatable = false)
	private String assignTime;

	// @Temporal(TemporalType.TIME)
	@Column(name = "reportdue_date", updatable = false)
	private String reportdueDate;

	@Column(name = "refdoc_id")
	private String refDocId;

	@Column(name = "refdoc_name")
	private String refDocName;

	@Column(name = "test_status")
	private String testStatus;

	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<LabResultMstViewDto> listLabResultMstViewDto;
	@Transient
	private String noOfPages;
	

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

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<LabResultMstViewDto> getListLabResultMstViewDto() {
		return listLabResultMstViewDto;
	}

	public void setListLabResultMstViewDto(
			List<LabResultMstViewDto> listLabResultMstViewDto) {
		this.listLabResultMstViewDto = listLabResultMstViewDto;
	}

	public String getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(String refDocId) {
		this.refDocId = refDocId;
	}

	public String getRefDocName() {
		return refDocName;
	}

	public void setRefDocName(String refDocName) {
		this.refDocName = refDocName;
	}

	public String getReportdueDate() {
		return reportdueDate;
	}

	public void setReportdueDate(String reportdueDate) {
		this.reportdueDate = reportdueDate;
	}

	public String getTestStatus() {
		return testStatus;
	}

	public void setTestStatus(String testStatus) {
		this.testStatus = testStatus;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	@Transient
	private String[] testid;
	
	@Transient
	private String[] rate;

	public String[] getRate() {
		return rate;
	}

	public void setRate(String[] rate) {
		this.rate = rate;
	}

	public String[] getTestid() {
		return testid;
	}

	public void setTestid(String[] array) {
		this.testid = array;
	}

	public String getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(String noOfPages) {
		this.noOfPages = noOfPages;
	}


	@Override
	public String toString() {
		return "LabResultMstViewDto [patientId=" + patientId + ", treatmentId=" + treatmentId + ", departmentId="
				+ departmentId + ", gender=" + gender + ", age=" + age + ", patientName=" + patientName + ", address="
				+ address + ", labrequestId=" + labrequestId + ", serviceId=" + serviceId + ", testName=" + testName
				+ ", tFlag=" + tFlag + ", assignDate=" + assignDate + ", assignTime=" + assignTime + ", reportdueDate="
				+ reportdueDate + ", refDocId=" + refDocId + ", refDocName=" + refDocName + ", testStatus=" + testStatus
				+ ", unitId=" + unitId + ", listLabResultMstViewDto=" + listLabResultMstViewDto + ", noOfPages="
				+ noOfPages + ", testid=" + Arrays.toString(testid) + ", rate=" + Arrays.toString(rate) + "]";
	}
}