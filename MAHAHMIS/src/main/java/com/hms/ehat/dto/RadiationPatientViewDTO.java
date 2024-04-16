package com.hms.ehat.dto;
import java.io.Serializable;
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
@Table(name = "ehat_radiation_patient_view")
public class RadiationPatientViewDTO implements Serializable {

	private static final long serialVersionUID = -5535042662203824588L;

	@Id
	@GeneratedValue
	@Column(name = "bill_details_id")
	private Integer billDetailId;	
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "test_name")
	private String testName;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_id")
	private int billNo;
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "t_flag")
	private String tFlag;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "reg_date",updatable=false)
	private Date registrationDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "adm_date",updatable=false)
	private Date admissionDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "bill_date",updatable=false)
	private Date billDate;
	
	@Transient
	private List<RadiationPatientViewDTO> patientList;
	

	public Integer getBillDetailId() {
		return billDetailId;
	}

	public void setBillDetailId(Integer billDetailId) {
		this.billDetailId = billDetailId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getBillNo() {
		return billNo;
	}

	public void setBillNo(int billNo) {
		this.billNo = billNo;
	}

	public Date getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}

	public Date getAdmissionDate() {
		return admissionDate;
	}

	public void setAdmissionDate(Date admissionDate) {
		this.admissionDate = admissionDate;
	}

	public Date getBillDate() {
		return billDate;
	}

	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	
	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public List<RadiationPatientViewDTO> getPatientList() {
		return patientList;
	}

	public void setPatientList(List<RadiationPatientViewDTO> patientList) {
		this.patientList = patientList;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

}