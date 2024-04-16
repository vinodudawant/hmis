package com.hms.opdbill.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.RegTreBillDto1;

public class PatientHeaderInfoDto {
	
	private Integer billId;	

	private Integer patientId;
	
	private String centerPatientId;
	
	private String patientIdd;
	
	private String invoiceCountt;
	
	private String invoiceCreatedBy;
	
	private Integer unitId;
	
	private Integer treatmentId;
	
	private Integer departmentId;
	
	private Integer refDocId;
	
	private String doctorId;
	
	private String address;
	
	private int token;
	
	private Number invoiceCount;
	
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
	
	private Date recCreatedDateTime;
	
	private Date invCreatedDateTime;
	
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

	private int refSrcId;
	   
	private int refSrcDocId;
	
	private String emergency;
	
	private String categoryName;
	
	private String isPpn;
	
	private Double numbr;
	
	private String docNameChan;
	
	private String dischargeDate;
	
	private String dischargeTime;
	
	private String dischargeType;
	
	private String bedName="-";
	
	private double totBill=0;
	
	private double totPaid=0;
	
	private double totBal=0;
	
	private String docName;
	
	private String physicalDisFlag;

	private String perAddress;
	
	private int pertalukaId;
	
	private int pertownId;
	
	private int perdistrictId;
	
	private int perstateId;
	
	private int percountryId;
	
	private int perareaCode;
	
	private String relativeName;
	
	private int relationId;
		
	private String oldPatientId;
	
	private String departmentNameDoc;
	
	private double totDisc;
	
	private int visitNo;
	
	private String referDoctorName;
	
	private List<String> listDistDates;
	
	private List<PatientHeaderInfoDto> listRegTreBillDto;
	
	private List<RegTreBillDto1> listRegTreBillDto1;

	private List<DoctorDto> lstDoctorDto;
	
	private String  patientCount;
		
	private String age2;
	
	private String consultingDocName;
	
	private String refDocName;
	
	private String urineVol;
	
	private String lmpDate;
 	
	private Integer businessType;
	
	private Integer customerType;
	
	private Integer customerId;
	
	private String prefix;
    
	private String f_name;
	
	private String m_name;
	
	private String l_name;
	
	private String emailId;
	
	private String emergencyflag;
	
	private String specialcasename;
	
	private String collectionDate="";	
	
	private String collectionTime="";	
	
	private String patientBarcode="";	
	
	private String registeredAt;	
	
	private String referredBy;
	
	private double target_height;
	
	//added by Rohit on 10-08-2021
	private String customerTypeName;
	
	private String refDoctorName="-";
    
	private String passport;
	
	private String identificationNo;
	
	private String customerName;
	
	private String  proofId;
	
	private String nationalityId;

	private String refDocPrefix;
	
	private int referSource;
	
	private String nationality;	

	private String employeeId;
	
	private String employeeName;
    
	private String ivfTreatFlag;
	
	private BigInteger hallTypeId;
	
	private BigInteger hallId;
	
	private BigInteger bedId;	
	
	private BigInteger treatBedsId;
	
	private String hallName;
	
	
	private double targetHeight;

	public String getDischargeType() {
		return dischargeType;
	}

	public void setDischargeType(String dischargeType) {
		this.dischargeType = dischargeType;
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

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
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

	public String getInvoiceCreatedBy() {
		return invoiceCreatedBy;
	}

	public void setInvoiceCreatedBy(String invoiceCreatedBy) {
		this.invoiceCreatedBy = invoiceCreatedBy;
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

	public Integer getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(Integer refDocId) {
		this.refDocId = refDocId;
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

	public Number getInvoiceCount() {
		return invoiceCount;
	}

	public void setInvoiceCount(Number invoiceCount) {
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

	public Date getRecCreatedDateTime() {
		return recCreatedDateTime;
	}

	public void setRecCreatedDateTime(Date recCreatedDateTime) {
		this.recCreatedDateTime = recCreatedDateTime;
	}

	public Date getInvCreatedDateTime() {
		return invCreatedDateTime;
	}

	public void setInvCreatedDateTime(Date invCreatedDateTime) {
		this.invCreatedDateTime = invCreatedDateTime;
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

	public int getRefSrcId() {
		return refSrcId;
	}

	public void setRefSrcId(int refSrcId) {
		this.refSrcId = refSrcId;
	}

	public int getRefSrcDocId() {
		return refSrcDocId;
	}

	public void setRefSrcDocId(int refSrcDocId) {
		this.refSrcDocId = refSrcDocId;
	}

	public String getEmergency() {
		return emergency;
	}

	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getIsPpn() {
		return isPpn;
	}

	public void setIsPpn(String isPpn) {
		this.isPpn = isPpn;
	}

	public Double getNumbr() {
		return numbr;
	}

	public void setNumbr(Double numbr) {
		this.numbr = numbr;
	}

	public String getDocNameChan() {
		return docNameChan;
	}

	public void setDocNameChan(String docNameChan) {
		this.docNameChan = docNameChan;
	}

	public String getDischargeDate() {
		return dischargeDate;
	}

	public void setDischargeDate(String dischargeDate) {
		this.dischargeDate = dischargeDate;
	}

	public String getDischargeTime() {
		return dischargeTime;
	}

	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}

	public String getBedName() {
		return bedName;
	}

	public void setBedName(String bedName) {
		this.bedName = bedName;
	}

	public double getTotBill() {
		return totBill;
	}

	public void setTotBill(double totBill) {
		this.totBill = totBill;
	}

	public double getTotPaid() {
		return totPaid;
	}

	public void setTotPaid(double totPaid) {
		this.totPaid = totPaid;
	}

	public double getTotBal() {
		return totBal;
	}

	public void setTotBal(double totBal) {
		this.totBal = totBal;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public String getPhysicalDisFlag() {
		return physicalDisFlag;
	}

	public void setPhysicalDisFlag(String physicalDisFlag) {
		this.physicalDisFlag = physicalDisFlag;
	}

	public String getPerAddress() {
		return perAddress;
	}

	public void setPerAddress(String perAddress) {
		this.perAddress = perAddress;
	}

	public int getPertalukaId() {
		return pertalukaId;
	}

	public void setPertalukaId(int pertalukaId) {
		this.pertalukaId = pertalukaId;
	}

	public int getPertownId() {
		return pertownId;
	}

	public void setPertownId(int pertownId) {
		this.pertownId = pertownId;
	}

	public int getPerdistrictId() {
		return perdistrictId;
	}

	public void setPerdistrictId(int perdistrictId) {
		this.perdistrictId = perdistrictId;
	}

	public int getPerstateId() {
		return perstateId;
	}

	public void setPerstateId(int perstateId) {
		this.perstateId = perstateId;
	}

	public int getPercountryId() {
		return percountryId;
	}

	public void setPercountryId(int percountryId) {
		this.percountryId = percountryId;
	}

	public int getPerareaCode() {
		return perareaCode;
	}

	public void setPerareaCode(int perareaCode) {
		this.perareaCode = perareaCode;
	}

	public String getRelativeName() {
		return relativeName;
	}

	public void setRelativeName(String relativeName) {
		this.relativeName = relativeName;
	}

	public int getRelationId() {
		return relationId;
	}

	public void setRelationId(int relationId) {
		this.relationId = relationId;
	}

	public String getOldPatientId() {
		return oldPatientId;
	}

	public void setOldPatientId(String oldPatientId) {
		this.oldPatientId = oldPatientId;
	}

	public String getDepartmentNameDoc() {
		return departmentNameDoc;
	}

	public void setDepartmentNameDoc(String departmentNameDoc) {
		this.departmentNameDoc = departmentNameDoc;
	}

	public double getTotDisc() {
		return totDisc;
	}

	public void setTotDisc(double totDisc) {
		this.totDisc = totDisc;
	}

	public int getVisitNo() {
		return visitNo;
	}

	public void setVisitNo(int visitNo) {
		this.visitNo = visitNo;
	}

	public List<String> getListDistDates() {
		return listDistDates;
	}

	public void setListDistDates(List<String> listDistDates) {
		this.listDistDates = listDistDates;
	}

	public List<PatientHeaderInfoDto> getListRegTreBillDto() {
		return listRegTreBillDto;
	}

	public void setListRegTreBillDto(List<PatientHeaderInfoDto> listRegTreBillDto) {
		this.listRegTreBillDto = listRegTreBillDto;
	}

	public List<RegTreBillDto1> getListRegTreBillDto1() {
		return listRegTreBillDto1;
	}

	public void setListRegTreBillDto1(List<RegTreBillDto1> listRegTreBillDto1) {
		this.listRegTreBillDto1 = listRegTreBillDto1;
	}

	public List<DoctorDto> getLstDoctorDto() {
		return lstDoctorDto;
	}

	public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
		this.lstDoctorDto = lstDoctorDto;
	}

	public String getPatientCount() {
		return patientCount;
	}

	public void setPatientCount(String patientCount) {
		this.patientCount = patientCount;
	}

	public String getAge2() {
		return age2;
	}

	public void setAge2(String age2) {
		this.age2 = age2;
	}

	public String getConsultingDocName() {
		return consultingDocName;
	}

	public void setConsultingDocName(String consultingDocName) {
		this.consultingDocName = consultingDocName;
	}

	public String getRefDocName() {
		return refDocName;
	}

	public void setRefDocName(String refDocName) {
		this.refDocName = refDocName;
	}

	public String getUrineVol() {
		return urineVol;
	}

	public void setUrineVol(String urineVol) {
		this.urineVol = urineVol;
	}

	public String getLmpDate() {
		return lmpDate;
	}

	public void setLmpDate(String lmpDate) {
		this.lmpDate = lmpDate;
	}

	public Integer getBusinessType() {
		return businessType;
	}

	public void setBusinessType(Integer businessType) {
		this.businessType = businessType;
	}

	public Integer getCustomerType() {
		return customerType;
	}

	public void setCustomerType(Integer customerType) {
		this.customerType = customerType;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public String getF_name() {
		return f_name;
	}

	public void setF_name(String f_name) {
		this.f_name = f_name;
	}

	public String getM_name() {
		return m_name;
	}

	public void setM_name(String m_name) {
		this.m_name = m_name;
	}

	public String getL_name() {
		return l_name;
	}

	public void setL_name(String l_name) {
		this.l_name = l_name;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getEmergencyflag() {
		return emergencyflag;
	}

	public void setEmergencyflag(String emergencyflag) {
		this.emergencyflag = emergencyflag;
	}

	public String getSpecialcasename() {
		return specialcasename;
	}

	public void setSpecialcasename(String specialcasename) {
		this.specialcasename = specialcasename;
	}

	public String getCollectionDate() {
		return collectionDate;
	}

	public void setCollectionDate(String collectionDate) {
		this.collectionDate = collectionDate;
	}

	public String getCollectionTime() {
		return collectionTime;
	}

	public void setCollectionTime(String collectionTime) {
		this.collectionTime = collectionTime;
	}

	public String getPatientBarcode() {
		return patientBarcode;
	}

	public void setPatientBarcode(String patientBarcode) {
		this.patientBarcode = patientBarcode;
	}

	public String getRegisteredAt() {
		return registeredAt;
	}

	public void setRegisteredAt(String registeredAt) {
		this.registeredAt = registeredAt;
	}

	public String getReferredBy() {
		return referredBy;
	}

	public void setReferredBy(String referredBy) {
		this.referredBy = referredBy;
	}
	
	

	

	public double getTarget_height() {
		return target_height;
	}

	public void setTarget_height(double target_height) {
		this.target_height = target_height;
	}

	public String getCustomerTypeName() {
		return customerTypeName;
	}

	public void setCustomerTypeName(String customerTypeName) {
		this.customerTypeName = customerTypeName;
	}

	public String getRefDoctorName() {
		return refDoctorName;
	}

	public void setRefDoctorName(String refDoctorName) {
		this.refDoctorName = refDoctorName;
	}

	public String getPassport() {
		return passport;
	}

	public void setPassport(String passport) {
		this.passport = passport;
	}

	public String getIdentificationNo() {
		return identificationNo;
	}

	public void setIdentificationNo(String identificationNo) {
		this.identificationNo = identificationNo;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	

	public String getNationalityId() {
		return nationalityId;
	}

	public void setNationalityId(String nationalityId) {
		this.nationalityId = nationalityId;
	}

	public String getRefDocPrefix() {
		return refDocPrefix;
	}

	public void setRefDocPrefix(String refDocPrefix) {
		this.refDocPrefix = refDocPrefix;
	}

	public int getReferSource() {
		return referSource;
	}

	public void setReferSource(int referSource) {
		this.referSource = referSource;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}

	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}

	public BigInteger getHallTypeId() {
		return hallTypeId;
	}

	public void setHallTypeId(BigInteger hallTypeId) {
		this.hallTypeId = hallTypeId;
	}

	public BigInteger getHallId() {
		return hallId;
	}

	public void setHallId(BigInteger hallId) {
		this.hallId = hallId;
	}

	public BigInteger getBedId() {
		return bedId;
	}

	public void setBedId(BigInteger bedId) {
		this.bedId = bedId;
	}

	public BigInteger getTreatBedsId() {
		return treatBedsId;
	}

	public void setTreatBedsId(BigInteger treatBedsId) {
		this.treatBedsId = treatBedsId;
	}

	public String getHallName() {
		return hallName;
	}

	public void setHallName(String hallName) {
		this.hallName = hallName;
	}

	public String getProofId() {
		return proofId;
	}

	public void setProofId(String proofId) {
		this.proofId = proofId;
	}

	public String getReferDoctorName() {
		return referDoctorName;
	}

	public void setReferDoctorName(String referDoctorName) {
		this.referDoctorName = referDoctorName;
	}

	public double getTargetHeight() {
		return targetHeight;
	}

	public void setTargetHeight(double targetHeight) {
		this.targetHeight = targetHeight;
	}

	@Override
	public String toString() {
		return "PatientHeaderInfoDto [billId=" + billId + ", patientId=" + patientId + ", centerPatientId="
				+ centerPatientId + ", patientIdd=" + patientIdd + ", invoiceCountt=" + invoiceCountt + ", unitId="
				+ unitId + ", treatmentId=" + treatmentId + ", departmentId=" + departmentId + ", refDocId=" + refDocId
				+ ", doctorId=" + doctorId + ", address=" + address + ", token=" + token + ", invoiceCount="
				+ invoiceCount + ", invoiceFlag=" + invoiceFlag + ", patientName=" + patientName + ", imageName="
				+ imageName + ", mobile=" + mobile + ", gender=" + gender + ", age=" + age + ", sourceTypeId="
				+ sourceTypeId + ", chargesMasterSlaveId=" + chargesMasterSlaveId + ", tFlag=" + tFlag
				+ ", createdDateTime=" + createdDateTime + ", recCreatedDateTime=" + recCreatedDateTime + ", dob=" + dob
				+ ", weight=" + weight + ", height=" + height + ", trcount=" + trcount + ", opdipdno=" + opdipdno
				+ ", tokenno=" + tokenno + ", mrnno=" + mrnno + ", stateId=" + stateId + ", townId=" + townId
				+ ", districtId=" + districtId + ", talukaId=" + talukaId + ", refSrcId=" + refSrcId + ", refSrcDocId="
				+ refSrcDocId + ", emergency=" + emergency + ", categoryName=" + categoryName + ", isPpn=" + isPpn
				+ ", numbr=" + numbr + ", docNameChan=" + docNameChan + ", dischargeDate=" + dischargeDate
				+ ", dischargeTime=" + dischargeTime + ", dischargeType=" + dischargeType + ", bedName=" + bedName
				+ ", totBill=" + totBill + ", totPaid=" + totPaid + ", totBal=" + totBal + ", docName=" + docName
				+ ", physicalDisFlag=" + physicalDisFlag + ", perAddress=" + perAddress + ", pertalukaId=" + pertalukaId
				+ ", pertownId=" + pertownId + ", perdistrictId=" + perdistrictId + ", perstateId=" + perstateId
				+ ", percountryId=" + percountryId + ", perareaCode=" + perareaCode + ", relativeName=" + relativeName
				+ ", relationId=" + relationId + ", oldPatientId=" + oldPatientId + ", departmentNameDoc="
				+ departmentNameDoc + ", totDisc=" + totDisc + ", visitNo=" + visitNo + ", referDoctorName="
				+ referDoctorName + ", listDistDates=" + listDistDates + ", listRegTreBillDto=" + listRegTreBillDto
				+ ", listRegTreBillDto1=" + listRegTreBillDto1 + ", lstDoctorDto=" + lstDoctorDto + ", patientCount="
				+ patientCount + ", age2=" + age2 + ", consultingDocName=" + consultingDocName + ", refDocName="
				+ refDocName + ", urineVol=" + urineVol + ", lmpDate=" + lmpDate + ", businessType=" + businessType
				+ ", customerType=" + customerType + ", customerId=" + customerId + ", prefix=" + prefix + ", f_name="
				+ f_name + ", m_name=" + m_name + ", l_name=" + l_name + ", emailId=" + emailId + ", emergencyflag="
				+ emergencyflag + ", specialcasename=" + specialcasename + ", collectionDate=" + collectionDate
				+ ", collectionTime=" + collectionTime + ", patientBarcode=" + patientBarcode + ", registeredAt="
				+ registeredAt + ", referredBy=" + referredBy + ", target_height=" + target_height
				+ ", customerTypeName=" + customerTypeName + ", refDoctorName=" + refDoctorName + ", passport="
				+ passport + ", identificationNo=" + identificationNo + ", customerName=" + customerName + ", proofId="
				+ proofId + ", nationalityId=" + nationalityId + ", refDocPrefix=" + refDocPrefix + ", referSource="
				+ referSource + ", nationality=" + nationality + ", employeeId=" + employeeId + ", employeeName="
				+ employeeName + ", ivfTreatFlag=" + ivfTreatFlag + ", hallTypeId=" + hallTypeId + ", hallId=" + hallId
				+ ", bedId=" + bedId + ", treatBedsId=" + treatBedsId + ", hallName=" + hallName + ", targetHeight="
				+ targetHeight + "]";
	}

	
	

	
	
	
	
	
}
