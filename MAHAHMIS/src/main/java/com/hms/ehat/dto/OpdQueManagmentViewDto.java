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
@Table(name = "patient_records_details_opd")
public class OpdQueManagmentViewDto implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "bill_id")
	private Integer billId;

	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "patient_id",insertable=false,updatable=false)
	private String patientIdd;
	
	@Column(name = "invoice_count",insertable=false,updatable=false)
	private String invoiceCountt;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
/*	@Column(name = "total_remain")
	private String totalRemain;*/
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "doctor_id")
	private String doctorId;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "token")
	private int token;
	
	@Column(name = "invoice_count")
	private int invoiceCount;
	
	@Column(name = "invoice_flag")
	private String invoiceFlag;
	
	@Column(name = "patient_name")
	private String patientName;
	
	@Column(name = "image_name")
	private String imageName;	
	
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "patient_age")
	private String age;
	
	@Column(name = "source_type_id")
	private int sourceTypeId;
	
	@Column(name = "charges_master_slave_id",columnDefinition="int default 0")
	private int chargesMasterSlaveId;
	
	@Column(name = "t_flag",columnDefinition="varchar(2) default 'N'")
	private String tFlag;
	
	@Column(name = "ivf_treat_flag",columnDefinition="varchar(2) default 'N'")
	private String ivfTreatFlag;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Column(name = "dob")
	private String dob;
	
	@Column(name = "weight",columnDefinition="varchar(255) default '0'")
	private String weight;
	
	@Column(name = "height",columnDefinition="varchar(255) default '0'")
	private String height;
 	
	@Column(name = "trcount")
	private String trcount;

	@Column(name = "opdipdno")
	private String opdipdno;
	
	@Column(name = "tokenno")
	private String tokenno;
	
	@Column(name = "mrnno")
	private String mrnno;
	
	@Column(name = "state_id")
	private int stateId;
	
	@Column(name = "town_id")
	private int townId;
	
	//Added by Laxman for Display LED(Queue_status) on 01-Jan-2018.
	/*@Column(name = "queue_status")
	private String queue_status;*/

	@Column(name = "district_id")
	private int districtId;
	
	@Column(name = "taluka_id")
	private int talukaId;
	
	@Transient
	@Column(name = "in_queue_docid")
	private String inQueueDocId;	
	
	@Column(name = "center_patient_id")
	private String centerPatientId;	
	
	@Column(name = "adharcardNo")
	private String adharcardNo;	
	
	@Transient
	private Number opdQueueCount;
	
	@Transient
	private int startIndex;
	
	@Transient
	private List<OpdQueManagmentViewDto> listOpdQueManagmentViewDto;

	@Transient
	private List<DoctorDto> lstDoctorDto;
		
	// Added by vinod
	@Transient
	private List<EhatBillPrefix> listEhatBillPrefix;
	// Added by vinod	
	
	@Transient
	private Integer ivfTreatmentId;

	public Integer getIvfTreatmentId() {
		return ivfTreatmentId;
	}

	public void setIvfTreatmentId(Integer ivfTreatmentId) {
		this.ivfTreatmentId = ivfTreatmentId;
	}

	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public String getPatientIdd() {
		return patientIdd;
	}

	public void setPatientIdd(String patientIdd) {
		this.patientIdd = patientIdd;
	}

	public String getInvoiceCountt() {
		return invoiceCountt;
	}

	public void setInvoiceCountt(String invoiceCountt) {
		this.invoiceCountt = invoiceCountt;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public int getInvoiceCount() {
		return invoiceCount;
	}

	public void setInvoiceCount(int invoiceCount) {
		this.invoiceCount = invoiceCount;
	}

	public String getInvoiceFlag() {
		return invoiceFlag;
	}

	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

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

	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public int getChargesMasterSlaveId() {
		return chargesMasterSlaveId;
	}

	public void setChargesMasterSlaveId(int chargesMasterSlaveId) {
		this.chargesMasterSlaveId = chargesMasterSlaveId;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getTrcount() {
		return trcount;
	}

	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public String getTokenno() {
		return tokenno;
	}

	public void setTokenno(String tokenno) {
		this.tokenno = tokenno;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	public int getTownId() {
		return townId;
	}

	public void setTownId(int townId) {
		this.townId = townId;
	}

	public int getDistrictId() {
		return districtId;
	}

	public void setDistrictId(int districtId) {
		this.districtId = districtId;
	}

	public int getTalukaId() {
		return talukaId;
	}

	public void setTalukaId(int talukaId) {
		this.talukaId = talukaId;
	}

	public String getInQueueDocId() {
		return inQueueDocId;
	}

	public void setInQueueDocId(String inQueueDocId) {
		this.inQueueDocId = inQueueDocId;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public String getAdharcardNo() {
		return adharcardNo;
	}

	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}

	public Number getOpdQueueCount() {
		return opdQueueCount;
	}

	public void setOpdQueueCount(Number opdQueueCount) {
		this.opdQueueCount = opdQueueCount;
	}

	public int getStartIndex() {
		return startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public List<OpdQueManagmentViewDto> getListOpdQueManagmentViewDto() {
		return listOpdQueManagmentViewDto;
	}

	public void setListOpdQueManagmentViewDto(List<OpdQueManagmentViewDto> listOpdQueManagmentViewDto) {
		this.listOpdQueManagmentViewDto = listOpdQueManagmentViewDto;
	}

	public List<DoctorDto> getLstDoctorDto() {
		return lstDoctorDto;
	}

	public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
		this.lstDoctorDto = lstDoctorDto;
	}

	public List<EhatBillPrefix> getListEhatBillPrefix() {
		return listEhatBillPrefix;
	}

	public void setListEhatBillPrefix(List<EhatBillPrefix> listEhatBillPrefix) {
		this.listEhatBillPrefix = listEhatBillPrefix;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}

	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}
}
