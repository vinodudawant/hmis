package com.hms.opdbill.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatBillPrefix;

public class OpdQueueDto {

	private Integer billId;

	private Integer patientId;
	
	private String patientIdd;
	
	private String invoiceCountt;
	
	private Integer unitId;
	
	private Integer treatmentId;
	
	private Integer departmentId;
	
	private Integer specialityId;
	
	private String specialityName;
	
	private String doctorId;
	
	private String doctorName;
	
	private String address;
	
	private int token;
	
	private String queueStatus;
	
	private int invoiceCount;
	
	private String invoiceFlag;
	
	private String patientName;
	
	private String imageName;	
	
	private String mobile;
	
	private String gender;
	
	private String age;
	
	private int sourceTypeId;
	
	private int chargesMasterSlaveId;
	
	private String tFlag;
	
	private Date createdDateTime;
	
	private String dob;
	
	private double weight;
	
	private double height;
 	
	private String trcount;

	private String opdipdno;
	
	private String tokenno;
	
	private String mrnno;
	
	private int stateId;
	
	private int townId;
	
	private int districtId;
	
	private int talukaId;
	
	private String inQueueDocId;	
	
	private String centerPatientId;	
	
	private Number opdQueueCount;
	
	private int startIndex;
	
	private String adharcardNo;	
	
	private Number sendBy;
	
	private Number checkupDoneBy;
	
	private Number cancelBy;
	
	@Transient
	private List<OpdQueueDto> listOpdQueManagmentViewDto;
	
	@Transient
	private List<DoctorDto> lstDoctorDto;
	
	@Transient
	private Integer count;
	
	@Transient
	private Integer diagCount;
		
	@Transient
	private List<EhatBillPrefix> listEhatBillPrefix;

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

	public Integer getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(Integer specialityId) {
		this.specialityId = specialityId;
	}

	public String getSpecialityName() {
		return specialityName;
	}

	public void setSpecialityName(String specialityName) {
		this.specialityName = specialityName;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
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

	public String getQueueStatus() {
		return queueStatus;
	}

	public void setQueueStatus(String queueStatus) {
		this.queueStatus = queueStatus;
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

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
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

	public String getAdharcardNo() {
		return adharcardNo;
	}

	public void setAdharcardNo(String adharcardNo) {
		this.adharcardNo = adharcardNo;
	}

	public Number getSendBy() {
		return sendBy;
	}

	public void setSendBy(Number sendBy) {
		this.sendBy = sendBy;
	}

	public Number getCheckupDoneBy() {
		return checkupDoneBy;
	}

	public void setCheckupDoneBy(Number checkupDoneBy) {
		this.checkupDoneBy = checkupDoneBy;
	}

	public Number getCancelBy() {
		return cancelBy;
	}

	public void setCancelBy(Number cancelBy) {
		this.cancelBy = cancelBy;
	}

	public List<OpdQueueDto> getListOpdQueManagmentViewDto() {
		return listOpdQueManagmentViewDto;
	}

	public void setListOpdQueManagmentViewDto(List<OpdQueueDto> listOpdQueManagmentViewDto) {
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
	
	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
	
	public Integer getDiagCount() {
		return diagCount;
	}

	public void setDiagCount(Integer diagCount) {
		this.diagCount = diagCount;
	}

	@Override
	public String toString() {
		return "OpdQueueDto [billId=" + billId + ", patientId=" + patientId + ", patientIdd=" + patientIdd
				+ ", invoiceCountt=" + invoiceCountt + ", unitId=" + unitId + ", treatmentId=" + treatmentId
				+ ", departmentId=" + departmentId + ", specialityId=" + specialityId + ", specialityName="
				+ specialityName + ", doctorId=" + doctorId + ", doctorName=" + doctorName + ", address=" + address
				+ ", token=" + token + ", queueStatus=" + queueStatus + ", invoiceCount=" + invoiceCount
				+ ", invoiceFlag=" + invoiceFlag + ", patientName=" + patientName + ", imageName=" + imageName
				+ ", mobile=" + mobile + ", gender=" + gender + ", age=" + age + ", sourceTypeId=" + sourceTypeId
				+ ", chargesMasterSlaveId=" + chargesMasterSlaveId + ", tFlag=" + tFlag + ", createdDateTime="
				+ createdDateTime + ", dob=" + dob + ", weight=" + weight + ", height=" + height + ", trcount="
				+ trcount + ", opdipdno=" + opdipdno + ", tokenno=" + tokenno + ", mrnno=" + mrnno + ", stateId="
				+ stateId + ", townId=" + townId + ", districtId=" + districtId + ", talukaId=" + talukaId
				+ ", inQueueDocId=" + inQueueDocId + ", centerPatientId=" + centerPatientId + ", opdQueueCount="
				+ opdQueueCount + ", startIndex=" + startIndex + ", adharcardNo=" + adharcardNo + ", sendBy=" + sendBy
				+ ", checkupDoneBy=" + checkupDoneBy + ", cancelBy=" + cancelBy + ", listOpdQueManagmentViewDto="
				+ listOpdQueManagmentViewDto + ", lstDoctorDto=" + lstDoctorDto + ", count=" + count + ", diagCount="
				+ diagCount + ", listEhatBillPrefix=" + listEhatBillPrefix + "]";
	}

	
	
}
