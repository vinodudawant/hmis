package com.hms.dto;

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
@Table(name = "ehat_ris_records_details")
public class RadiologyDTO implements Serializable{


	private static final long serialVersionUID = 1L;

	@Column(name = "patient_id")
	int patientId;
	
	@Column(name = "patient_name")
	String patientName="-";
	
	@Column(name = "treatment_id")
	int treatmentId;
	
	@Column(name = "center_patient_id")
	String uhid="-";
	
	@Column(name = "patient_age")
	int patientAge;
	
	@Column(name = "patient_gender")
	String patientGender="-";
	
	@Id
	@Column(name = "idradiology_test")
	int idradiologyTest;

	@Column(name = "trt_flag")
	String treatmentFlag="";
	
	@Column(name = "idtest_radiology")
	int  idtestRadiology;
	
	@Column(name = "radUrgentflag")
	String  radUrgentFlag="0";
	
	@Column(name = "idrad_test_name")
	int idradTestName=0;

	@Column(name = "radTestStatus")
	String radTestStatus="Y";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "assign_date")
	private Date  assignDate;
	
	@Column(name = "arrivalTime")
	String arrivalTime="-";

	@Column(name = "takenTime")
	String takenTime="-";
	
	@Column(name = "radRISFlag")
	String  radRISFlag="N";

	@Column(name = "test_name")
	String testName;

	@Column(name = "dept_id")
	int  deptId=0;
	

	@Column(name = "assign_dt")
	private java.sql.Date  assign_dt;
	
	@Column(name = "group_name")
	private String  groupName;
	
	@Column(name = "report_status")
	private String  reportStatus;
	
	@Column(name = "checkUpDoneFlag")
	private String checkUpDoneFlag;
	
	@Transient
	private String assignedDate;	//aniket kanse / 02 DEC 2020
	
	@Column(name = "doc_name")
	String doctorName="-";
	
	@Column(name = "doctor_id")
	Integer  doctorId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Transient
	private List<RadiologyDTO> listRadiologyDTO;
	
	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(int patientAge) {
		this.patientAge = patientAge;
	}

	public String getPatientGender() {
		return patientGender;
	}

	public void setPatientGender(String patientGender) {
		this.patientGender = patientGender;
	}

	public int getIdradiologyTest() {
		return idradiologyTest;
	}

	public void setIdradiologyTest(int idradiologyTest) {
		this.idradiologyTest = idradiologyTest;
	}

	public String getTreatmentFlag() {
		return treatmentFlag;
	}

	public void setTreatmentFlag(String treatmentFlag) {
		this.treatmentFlag = treatmentFlag;
	}

	public int getIdtestRadiology() {
		return idtestRadiology;
	}

	public void setIdtestRadiology(int idtestRadiology) {
		this.idtestRadiology = idtestRadiology;
	}

	public String getRadUrgentFlag() {
		return radUrgentFlag;
	}

	public void setRadUrgentFlag(String radUrgentFlag) {
		this.radUrgentFlag = radUrgentFlag;
	}

	public int getIdradTestName() {
		return idradTestName;
	}

	public void setIdradTestName(int idradTestName) {
		this.idradTestName = idradTestName;
	}

	public String getRadTestStatus() {
		return radTestStatus;
	}

	public void setRadTestStatus(String radTestStatus) {
		this.radTestStatus = radTestStatus;
	}

	public Date getAssignDate() {
		return assignDate;
	}

	public void setAssignDate(Date assignDate) {
		this.assignDate = assignDate;
	}

	public String getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getTakenTime() {
		return takenTime;
	}

	public void setTakenTime(String takenTime) {
		this.takenTime = takenTime;
	}

	public String getRadRISFlag() {
		return radRISFlag;
	}

	public void setRadRISFlag(String radRISFlag) {
		this.radRISFlag = radRISFlag;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}


	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public List<RadiologyDTO> getListRadiologyDTO() {
		return listRadiologyDTO;
	}

	public void setListRadiologyDTO(List<RadiologyDTO> listRadiologyDTO) {
		this.listRadiologyDTO = listRadiologyDTO;
	}

	public java.sql.Date getAssign_dt() {
		return assign_dt;
	}

	public void setAssign_dt(java.sql.Date assign_dt) {
		this.assign_dt = assign_dt;
	}

	public String getReportStatus() {
		return reportStatus;
	}

	public void setReportStatus(String reportStatus) {
		this.reportStatus = reportStatus;
	}

	public String getCheckUpDoneFlag() {
		return checkUpDoneFlag;
	}

	public void setCheckUpDoneFlag(String checkUpDoneFlag) {
		this.checkUpDoneFlag = checkUpDoneFlag;
	}

	public String getAssignedDate() {
		return assignedDate;
	}

	public void setAssignedDate(String assignedDate) {
		this.assignedDate = assignedDate;
	}

	public String getUhid() {
		return uhid;
	}

	public void setUhid(String uhid) {
		this.uhid = uhid;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}
	
	

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	@Override
	public String toString() {
		return "RadiologyDTO [patientId=" + patientId + ", patientName=" + patientName + ", treatmentId=" + treatmentId
				+ ", uhid=" + uhid + ", patientAge=" + patientAge + ", patientGender=" + patientGender
				+ ", idradiologyTest=" + idradiologyTest + ", treatmentFlag=" + treatmentFlag + ", idtestRadiology="
				+ idtestRadiology + ", radUrgentFlag=" + radUrgentFlag + ", idradTestName=" + idradTestName
				+ ", radTestStatus=" + radTestStatus + ", assignDate=" + assignDate + ", arrivalTime=" + arrivalTime
				+ ", takenTime=" + takenTime + ", radRISFlag=" + radRISFlag + ", testName=" + testName + ", deptId="
				+ deptId + ", assign_dt=" + assign_dt + ", groupName=" + groupName + ", reportStatus=" + reportStatus
				+ ", checkUpDoneFlag=" + checkUpDoneFlag + ", assignedDate=" + assignedDate + ", doctorName="
				+ doctorName + ", doctorId=" + doctorId + ", categoryName=" + categoryName + ", listRadiologyDTO="
				+ listRadiologyDTO + "]";
	}

	

	
	
	
	
}
