package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import com.hms.dto.LabProfile;

@Entity 
@Immutable
@Table(name = "ehat_lab_worksheet_view")
public class LabWorksheetViewDto {

	//This is Bill No.
	@Id
	@Column(name = "bill_receipt_id")
	private Integer billReceiptId;
	
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

	//@Temporal(TemporalType.DATE)
	@Column(name = "assign_date",updatable=false)
	private String assignDate;
	
	//@Temporal(TemporalType.TIME)
	@Column(name = "assign_time",updatable=false)
	private String assignTime;

	//@Temporal(TemporalType.TIME)
	@Column(name = "reportdue_date",updatable=false)
	private String reportdueDate;
		
	@Column(name = "refdoc_id")
	private String refDocId;
	
	@Column(name = "refdoc_name")
	private String refDocName;
	
	@Column(name = "test_status")
	private String testStatus;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "lab_slave_id")
	private String labslaveId;

	@Column(name = "receipt_date",updatable=false)
	private String receiptDate;

	@Transient
	private List<LabWorksheetViewDto> listLabSlaveWorksheetView;
	
	@Transient
	private List<LabProfile> listLabProfile; 
	
	@Transient
	private List<LabWorksheetViewDto> listLabWorksheetView;

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

	public List<LabWorksheetViewDto> getListLabWorksheetView() {
		return listLabWorksheetView;
	}

	public void setListLabWorksheetView(
			List<LabWorksheetViewDto> listLabWorksheetView) {
		this.listLabWorksheetView = listLabWorksheetView;
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

	public Integer getBillReceiptId() {
		return billReceiptId;
	}

	public void setBillReceiptId(Integer billReceiptId) {
		this.billReceiptId = billReceiptId;
	}

	public String getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(String receiptDate) {
		this.receiptDate = receiptDate;
	}

	public List<LabWorksheetViewDto> getListLabSlaveWorksheetView() {
		return listLabSlaveWorksheetView;
	}

	public void setListLabSlaveWorksheetView(
			List<LabWorksheetViewDto> listLabSlaveWorksheetView) {
		this.listLabSlaveWorksheetView = listLabSlaveWorksheetView;
	}

	public List<LabProfile> getListLabProfile() {
		return listLabProfile;
	}

	public void setListLabProfile(List<LabProfile> listLabProfile) {
		this.listLabProfile = listLabProfile;
	}
	
	public String getLabslaveId() {
		return labslaveId;
	}

	public void setLabslaveId(String labslaveId) {
		this.labslaveId = labslaveId;
	}
	
	
}
