package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;
//added by vishant
public class AdmissionReportSiddhiDTO {

	private Date admitDate;
	private String MRNNO;
	private String bedName;
	private String patientName;
	private String patientMobile;
	private String hallName;
	private String departmentName;
	private String admitDays;
	private String scheme;
	private String consultantDoctor;
	private String refDoctorName;
	private Integer hallId;
	private String diagnosisName;
	private Integer schemeID;

	private String contactNo;

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getDiagnosisName() {
		return diagnosisName;
	}

	public void setDiagnosisName(String diagnosisName) {
		this.diagnosisName = diagnosisName;
	}
	
	public Integer getSchemeID() {
		return schemeID;
	}

	public void setSchemeID(Integer schemeID) {
		this.schemeID = schemeID;
	}



	List<AdmissionReportSiddhiDTO> admissionReportSiddhi;

	public List<AdmissionReportSiddhiDTO> getAdmissionReportSiddhi() {
		return admissionReportSiddhi;
	}

	public void setAdmissionReportSiddhi(List<AdmissionReportSiddhiDTO> admissionReportSiddhi) {
		this.admissionReportSiddhi = admissionReportSiddhi;
	}

	public Date getAdmitDate() {
		return admitDate;
	}

	public void setAdmitDate(Date admitDate) {
		this.admitDate = admitDate;
	}

	public String getMRNNO() {
		return MRNNO;
	}

	public void setMRNNO(String mRNNO) {
		MRNNO = mRNNO;
	}

	public String getBedName() {
		return bedName;
	}

	public void setBedName(String bedName) {
		this.bedName = bedName;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getPatientMobile() {
		return patientMobile;
	}

	public void setPatientMobile(String patientMobile) {
		this.patientMobile = patientMobile;
	}

	public String getHallName() {
		return hallName;
	}

	public void setHallName(String hallName) {
		this.hallName = hallName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getAdmitDays() {
		return admitDays;
	}

	public void setAdmitDays(String admitDays) {
		this.admitDays = admitDays;
	}

	public String getScheme() {
		return scheme;
	}

	public void setScheme(String scheme) {
		this.scheme = scheme;
	}

	public String getConsultantDoctor() {
		return consultantDoctor;
	}

	public void setConsultantDoctor(String consultantDoctor) {
		this.consultantDoctor = consultantDoctor;
	}

	public String getRefDoctorName() {
		return refDoctorName;
	}

	public void setRefDoctorName(String refDoctorName) {
		this.refDoctorName = refDoctorName;
	}

	public Integer getHallId() {
		return hallId;
	}

	public void setHallId(Integer hallId) {
		this.hallId = hallId;
	}

}
