package com.hms.ehat.dto;

import java.sql.Time;
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
@Table(name=" ehat_view_admission_report2") //@Table(name=" ehat_view_admission_report")  // comment for 
@Immutable
public class admissionReportViewDto {
	
	@Id
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "ipd_no")
	private String ipdNo;
	
	@Column(name = "prn" )
	private String prn;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "admit_date")
	private Date admitDate;
	
	@Column(name = "admit_time")
	private Time admitTime;
	
	@Column(name = "patient_name" )
	private String patientName;
	
	
	@Column(name = "sponsor_type")
	private String sposorType;

	@Column(name = "ward_name")
	private String wardName;
	
	@Column(name = "doctor_name" )
	private String doctorName;
	
	@Column(name = "doctor_id_str")
	private String doctorIdStr;
	
	@Column(name = "ref_doc_id")
	private Integer refDocId;
	
	@Column(name = "ref_doc_name" )
	private String refDocName;

	@Column(name = " case_type")
	private Integer caseType;
	
	@Column(name = " patient_type")
	private String patientType;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "contact")
	private String contact;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "department_name")
	private String departmentName;
	
	@Column(name = "mediclaim")
	private String mediclaim;
	
	@Transient
    private List<admissionReportViewDto> listAdmsnReportViewDto;

    
    //-----------Start setter getter----------------------------------------------------------------------------------------
	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getIpdNo() {
		return ipdNo;
	}

	public void setIpdNo(String ipdNo) {
		this.ipdNo = ipdNo;
	}

	public String getPrn() {
		return prn;
	}

	public void setPrn(String prn) {
		this.prn = prn;
	}

	public Date getAdmitDate() {
		return admitDate;
	}

	public void setAdmitDate(Date admitDate) {
		this.admitDate = admitDate;
	}

	public Time getAdmitTime() {
		return admitTime;
	}

	public void setAdmitTime(Time admitTime) {
		this.admitTime = admitTime;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getSposorType() {
		return sposorType;
	}

	public void setSposorType(String sposorType) {
		this.sposorType = sposorType;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getDoctorIdStr() {
		return doctorIdStr;
	}

	public void setDoctorIdStr(String doctorIdStr) {
		this.doctorIdStr = doctorIdStr;
	}

	public Integer getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(Integer refDocId) {
		this.refDocId = refDocId;
	}

	public Integer getCaseType() {
		return caseType;
	}

	public void setCaseType(Integer caseType) {
		this.caseType = caseType;
	}

	public String getPatientType() {
		return patientType;
	}

	public void setPatientType(String patientType) {
		this.patientType = patientType;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public List<admissionReportViewDto> getListAdmsnReportViewDto() {
		return listAdmsnReportViewDto;
	}

	public void setListAdmsnReportViewDto(
			List<admissionReportViewDto> listAdmsnReportViewDto) {
		this.listAdmsnReportViewDto = listAdmsnReportViewDto;
	}

	public String getRefDocName() {
		return refDocName;
	}

	public void setRefDocName(String refDocName) {
		this.refDocName = refDocName;
	}

	public String getMediclaim() {
		return mediclaim;
	}

	public void setMediclaim(String mediclaim) {
		this.mediclaim = mediclaim;
	}
	
    //-----------End setter getter-----------------------------------------------------------------------------------------
    
    
}
