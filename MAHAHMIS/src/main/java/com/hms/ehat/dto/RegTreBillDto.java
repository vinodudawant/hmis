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
@Table(name = "patient_records_details")
public class RegTreBillDto implements Serializable{
	
	@Id
	@Column(name = "bill_id")
	private Integer billId;	
	
	@Column(name = "billNo")
	private Integer billNo;

	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "doc_name")
	private String doctorName;
	
	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}


	@Column(name = "center_patient_id")
	private String centerPatientId;
	
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
	
	@Column(name = "ref_doc_id")
	private Integer refDocId;
	
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
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_created_date_time",updatable=false)
	private Date invoiceDateTime;
	
	@Transient
	private Date recCreatedDateTime;
	
	@Column(name = "dob")
	private String dob;
	
	@Column(name = "weight",columnDefinition="varchar(255) default '0'")
	private String weight;
	
	@Column(name = "height",columnDefinition="varchar(255) default '0'")
	private String height;
	
	@Column(name = "urine_vol")
	private String urineVol;
	
	@Column(name = "lmp_date")
	private String lmpDate;
 	
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
	
	@Column(name = "district_id")
	private int districtId;
	
	@Column(name = "taluka_id")
	private int talukaId;
	
	// Added by Pooja
	@Column(name = "referred_source")
	 private int refSrcId;
	   
	 @Column(name = "referred_source_docId")
	 private int refSrcDocId;
	
	 //added by kishor
	@Column(name = "emergency")
	private String emergency;
	
	@Column(name = "category_name")
	//@Transient
	private String categoryName;
	
	//@Column(name = "isPpn")
	@Transient
	private String isPpn;
	
	//@Column(name = "numbr")
	@Transient
	private Double numbr;
	
	//@Column(name = "docNameChan")
	@Transient
	private String docNameChan;
	
	@Column(name = "business_type")
	private Integer businessType;
	
	@Column(name = "customer_type")
	private Integer customerType;
	
	@Column(name = "customer_id")
	private Integer customerId;
	
	// Added by vinod
	
	@Column(name = "dischargeDate")
	//@Transient
	private String dischargeDate;
	
	//@Column(name = "discharge_time")
	@Transient
	private String dischargeTime;
	
	//added by dayanand
	
	@Column(name = "prefix")
	private String prefix;
	
	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	
	//Added  By Badrinath
	
	@Column(name = "prviouspatient_age")
	private String age3;


	public String getAge3() {
		return age3;
	}

	public void setAge3(String age3) {
		this.age3 = age3;
	}


	@Column(name = "f_name")
	private String f_name;
	
	@Column(name = "m_name")
	private String m_name;
	
	@Column(name = "l_name")
	private String l_name;
	
	@Column(name = "email_id")
	private String emailId;
	
	@Column(name = "emergency_flag")
	private String emergencyflag;
	
	@Column(name = "special_case_name")
	private String specialcasename;
	
	@Column(name = "collection_date")
	private String collectionDate="";	
	
	@Column(name = "collection_time")
	private String collectionTime="";	
	
	@Column(name = "patient_barcode")
	private String patientBarcode="";	
	
	@Column(name = "registered_at", columnDefinition="varchar(15)")
	private String registeredAt;	
	
	@Column(name = "referred_by")
	private String referredBy;
	
	//added by Rohit on 10-08-2021
	@Column(name = "customer_type_name")
	private String customerTypeName;
	
	@Column(name = "ref_doctor_name",columnDefinition="varchar(255) default '-'")
	private String refDoctorName="-";
	
//	//added by Rohit on 11-08-2021
//	@Column(name = "receipt_created_datetime")
//	private Date receiptCreatedDatetime;
	
	public String getSpecialcasename() {
		return specialcasename;
	}

	public void setSpecialcasename(String specialcasename) {
		this.specialcasename = specialcasename;
	}

	public String getEmergencyflag() {
		return emergencyflag;
	}

	public void setEmergencyflag(String emergencyflag) {
		this.emergencyflag = emergencyflag;
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


	@Transient
	private String bedName="-";
	
	@Transient
	private double totBill=0;
	
	@Transient
	private double totPaid=0;
	
	@Transient
	private double totBal=0;
	
	//@Column(name = "doc_name")
	@Transient
	private String docName ;
	
	@Column(name="username")
	private String username;
	
	@Transient
	private String visittype;
	
	@Column(name = "phydis_flag")
	private String physicalDisFlag ;

	
	//Added on 07-May-2018 For Permanant Address.

	@Column(name = "per_address")
	private String perAddress;
	
	@Column(name = "per_taluka_id")
	private int pertalukaId;
	
	@Column(name = "per_town_id")
	private int pertownId;
	
	@Column(name = "per_district_id")
	private int perdistrictId;
	
	@Column(name = "per_state_id")
	private int perstateId;
	
	@Column(name = "per_country_id")
	private int percountryId;
	
	@Column(name = "per_area_code")
	private int perareaCode;
	
	@Column(name = "relative_name")
	private String relativeName;
	
	@Column(name = "relation_id")
	private int relationId;
		
	@Column(name = "old_patient_id",columnDefinition="int default 0")
	private String oldPatientId;
	
	//@Column(name = "department_name")
	@Transient
	private String departmentNameDoc;
	
	// Added By Akshay
	@Column(name = "passport")
	private String passport;
	
	@Column(name = "identification_number")
	private String identificationNo;
	
	@Column(name = "customer_name")
	private String customerName;
	
	@Column(name = "proof_id")
	private String proofId;
	
	@Column(name = "nationality_id")
	private String nationalityId;

	@Column(name = "ref_doc_prefix")
	private String refDocPrefix;
	
	@Column(name = "refer_source")
	private int referSource;
	
	@Column(name = "nationality")
	private String nationality;	

	@Transient
	private double totDisc=0;
	
	@Transient
	private double totalRefund=0; //added by sandip

	@Transient
	private int visitNo;
	
	public int getVisitNo() {
		return visitNo;
	}

	public void setVisitNo(int visitNo) {
		this.visitNo = visitNo;
	}

	@Transient
	private List<EhatBillPrefix> listEhatBillPrefix;
	
	@Transient
	private List<String> listDistDates;
	// Added by vinod	
	
	@Transient
	private List<RegTreBillDto> listRegTreBillDto;
	
	@Column(name = "employ_id")	// jitendra
	private String employeeId;
	
	@Column(name = "employee_name")	// jitendra
	private String employeeName;	

	@Transient
	private List<RegTreBillDto1> listRegTreBillDto1;

	public List<RegTreBillDto1> getListRegTreBillDto1() {
		return listRegTreBillDto1;
	}

	public void setListRegTreBillDto1(List<RegTreBillDto1> listRegTreBillDto1) {
		this.listRegTreBillDto1 = listRegTreBillDto1;
	}

	@Transient
	private List<DoctorDto> lstDoctorDto;
	
	@Transient
	private String  patientCount;
	
	@Transient
	private String  approveBy;
	
	@Transient
	private String  approveRemark;
	
	
	public Integer getBillNo() {
		return billNo;
	}

	public void setBillNo(Integer billNo) {
		this.billNo = billNo;
	}

	public double getTotalRefund() {
		return totalRefund;
	}

	public void setTotalRefund(double totalRefund) {
		this.totalRefund = totalRefund;
	}
	
	public String getPatientCount() {
		return patientCount;
	}

	public void setPatientCount(String patientCount) {
		this.patientCount = patientCount;
	}

	public String getPhysicalDisFlag() {
		return physicalDisFlag;
	}

	public void setPhysicalDisFlag(String physicalDisFlag) {
		this.physicalDisFlag = physicalDisFlag;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public String getTokenno() {
		return tokenno;
	}

	public void setTokenno(String tokenno) {
		this.tokenno = tokenno;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public String getTrcount() {
		return trcount;
	}

	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}

	public List<DoctorDto> getLstDoctorDto() {
		return lstDoctorDto;
	}

	public void setLstDoctorDto(List<DoctorDto> lstDoctorDto) {
		this.lstDoctorDto = lstDoctorDto;
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

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
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

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
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
	
	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
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

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
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

	public List<RegTreBillDto> getListRegTreBillDto() {
		return listRegTreBillDto;
	}

	public void setListRegTreBillDto(List<RegTreBillDto> listRegTreBillDto) {
		this.listRegTreBillDto = listRegTreBillDto;
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

	public int getInvoiceCount() {
		return invoiceCount;
	}

	public String getInvoiceFlag() {
		return invoiceFlag;
	}

	public void setInvoiceCount(int invoiceCount) {
		this.invoiceCount = invoiceCount;
	}

	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getInvoiceCountt() {
		return invoiceCountt;
	}

	public void setInvoiceCountt(String invoiceCountt) {
		this.invoiceCountt = invoiceCountt;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(Integer refDocId) {
		this.refDocId = refDocId;
	}	

	public String getBedName() {
		return bedName;
	}

	public void setBedName(String bedName) {
		this.bedName = bedName;
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

	public double getTotDisc() {
		return totDisc;
	}

	public void setTotDisc(double totDisc) {
		this.totDisc = totDisc;
	}

	public List<EhatBillPrefix> getListEhatBillPrefix() {
		return listEhatBillPrefix;
	}

	public void setListEhatBillPrefix(List<EhatBillPrefix> listEhatBillPrefix) {
		this.listEhatBillPrefix = listEhatBillPrefix;
	}	
	
	public List<String> getListDistDates() {
		return listDistDates;
	}

	public void setListDistDates(List<String> listDistDates) {
		this.listDistDates = listDistDates;
	}


	@Column(name = "patient_age2")
	private String age2;

	public String getAge2() {
		return age2;
	}

	public void setAge2(String age2) {
		this.age2 = age2;
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

	public String getIsPpn() {
		return isPpn;
	}

	public Double getNumbr() {
		return numbr;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public void setIsPpn(String isPpn) {
		this.isPpn = isPpn;
	}

	public void setNumbr(Double numbr) {
		this.numbr = numbr;
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
	
	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
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

	public String getDocNameChan() {
		return docNameChan;
	}

	public void setDocNameChan(String docNameChan) {
		this.docNameChan = docNameChan;
	}
	@Transient
	private String queue_status;

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

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
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

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
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

	public String getProofId() {
		return proofId;
	}

	public void setProofId(String proofId) {
		this.proofId = proofId;
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

	public String getQueue_status() {
		return queue_status;
	}

	public void setQueue_status(String queue_status) {
		this.queue_status = queue_status;
	}

	public String getApproveBy() {
		return approveBy;
	}

	public void setApproveBy(String approveBy) {
		this.approveBy = approveBy;
	}

	public String getApproveRemark() {
		return approveRemark;
	}

	public void setApproveRemark(String approveRemark) {
		this.approveRemark = approveRemark;
	}

	public Date getInvoiceDateTime() {
		return invoiceDateTime;
	}

	public void setInvoiceDateTime(Date invoiceDateTime) {
		this.invoiceDateTime = invoiceDateTime;
	}
	

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	

	public String getVisittype() {
		return visittype;
	}

	public void setVisittype(String visittype) {
		this.visittype = visittype;
	}

	@Override
	public String toString() {
		return "RegTreBillDto [billId=" + billId + ", billNo=" + billNo + ", patientId=" + patientId + ", doctorName="
				+ doctorName + ", centerPatientId=" + centerPatientId + ", patientIdd=" + patientIdd
				+ ", invoiceCountt=" + invoiceCountt + ", unitId=" + unitId + ", treatmentId=" + treatmentId
				+ ", departmentId=" + departmentId + ", refDocId=" + refDocId + ", doctorId=" + doctorId + ", address="
				+ address + ", token=" + token + ", invoiceCount=" + invoiceCount + ", invoiceFlag=" + invoiceFlag
				+ ", patientName=" + patientName + ", imageName=" + imageName + ", mobile=" + mobile + ", gender="
				+ gender + ", age=" + age + ", sourceTypeId=" + sourceTypeId + ", chargesMasterSlaveId="
				+ chargesMasterSlaveId + ", tFlag=" + tFlag + ", createdDateTime=" + createdDateTime
				+ ", invoiceDateTime=" + invoiceDateTime + ", recCreatedDateTime=" + recCreatedDateTime + ", dob=" + dob
				+ ", weight=" + weight + ", height=" + height + ", urineVol=" + urineVol + ", lmpDate=" + lmpDate
				+ ", trcount=" + trcount + ", opdipdno=" + opdipdno + ", tokenno=" + tokenno + ", mrnno=" + mrnno
				+ ", stateId=" + stateId + ", townId=" + townId + ", districtId=" + districtId + ", talukaId="
				+ talukaId + ", refSrcId=" + refSrcId + ", refSrcDocId=" + refSrcDocId + ", emergency=" + emergency
				+ ", categoryName=" + categoryName + ", isPpn=" + isPpn + ", numbr=" + numbr + ", docNameChan="
				+ docNameChan + ", businessType=" + businessType + ", customerType=" + customerType + ", customerId="
				+ customerId + ", dischargeDate=" + dischargeDate + ", dischargeTime=" + dischargeTime + ", prefix="
				+ prefix + ", age3=" + age3 + ", f_name=" + f_name + ", m_name=" + m_name + ", l_name=" + l_name
				+ ", emailId=" + emailId + ", emergencyflag=" + emergencyflag + ", specialcasename=" + specialcasename
				+ ", collectionDate=" + collectionDate + ", collectionTime=" + collectionTime + ", patientBarcode="
				+ patientBarcode + ", registeredAt=" + registeredAt + ", referredBy=" + referredBy
				+ ", customerTypeName=" + customerTypeName + ", refDoctorName=" + refDoctorName + ", bedName=" + bedName
				+ ", totBill=" + totBill + ", totPaid=" + totPaid + ", totBal=" + totBal + ", docName=" + docName
				+ ", username=" + username + ", visittype=" + visittype + ", physicalDisFlag=" + physicalDisFlag
				+ ", perAddress=" + perAddress + ", pertalukaId=" + pertalukaId + ", pertownId=" + pertownId
				+ ", perdistrictId=" + perdistrictId + ", perstateId=" + perstateId + ", percountryId=" + percountryId
				+ ", perareaCode=" + perareaCode + ", relativeName=" + relativeName + ", relationId=" + relationId
				+ ", oldPatientId=" + oldPatientId + ", departmentNameDoc=" + departmentNameDoc + ", passport="
				+ passport + ", identificationNo=" + identificationNo + ", customerName=" + customerName + ", proofId="
				+ proofId + ", nationalityId=" + nationalityId + ", refDocPrefix=" + refDocPrefix + ", referSource="
				+ referSource + ", nationality=" + nationality + ", totDisc=" + totDisc + ", totalRefund=" + totalRefund
				+ ", visitNo=" + visitNo + ", listEhatBillPrefix=" + listEhatBillPrefix + ", listDistDates="
				+ listDistDates + ", listRegTreBillDto=" + listRegTreBillDto + ", employeeId=" + employeeId
				+ ", employeeName=" + employeeName + ", listRegTreBillDto1=" + listRegTreBillDto1 + ", lstDoctorDto="
				+ lstDoctorDto + ", patientCount=" + patientCount + ", approveBy=" + approveBy + ", approveRemark="
				+ approveRemark + ", age2=" + age2 + ", queue_status=" + queue_status + ", getDoctorName()="
				+ getDoctorName() + ", getPrefix()=" + getPrefix() + ", getAge3()=" + getAge3()
				+ ", getSpecialcasename()=" + getSpecialcasename() + ", getEmergencyflag()=" + getEmergencyflag()
				+ ", getF_name()=" + getF_name() + ", getM_name()=" + getM_name() + ", getL_name()=" + getL_name()
				+ ", getVisitNo()=" + getVisitNo() + ", getListRegTreBillDto1()=" + getListRegTreBillDto1()
				+ ", getBillNo()=" + getBillNo() + ", getTotalRefund()=" + getTotalRefund() + ", getPatientCount()="
				+ getPatientCount() + ", getPhysicalDisFlag()=" + getPhysicalDisFlag() + ", getMrnno()=" + getMrnno()
				+ ", getTokenno()=" + getTokenno() + ", getOpdipdno()=" + getOpdipdno() + ", getTrcount()="
				+ getTrcount() + ", getLstDoctorDto()=" + getLstDoctorDto() + ", getWeight()=" + getWeight()
				+ ", getHeight()=" + getHeight() + ", getDob()=" + getDob() + ", getCreatedDateTime()="
				+ getCreatedDateTime() + ", getRecCreatedDateTime()=" + getRecCreatedDateTime() + ", gettFlag()="
				+ gettFlag() + ", getSourceTypeId()=" + getSourceTypeId() + ", getChargesMasterSlaveId()="
				+ getChargesMasterSlaveId() + ", getGender()=" + getGender() + ", getAge()=" + getAge()
				+ ", getBillId()=" + getBillId() + ", getDepartmentId()=" + getDepartmentId() + ", getTreatmentId()="
				+ getTreatmentId() + ", getDoctorId()=" + getDoctorId() + ", getToken()=" + getToken()
				+ ", getPatientName()=" + getPatientName() + ", getImageName()=" + getImageName() + ", getMobile()="
				+ getMobile() + ", getListRegTreBillDto()=" + getListRegTreBillDto() + ", getStateId()=" + getStateId()
				+ ", getTownId()=" + getTownId() + ", getDistrictId()=" + getDistrictId() + ", getTalukaId()="
				+ getTalukaId() + ", getInvoiceCount()=" + getInvoiceCount() + ", getInvoiceFlag()=" + getInvoiceFlag()
				+ ", getUnitId()=" + getUnitId() + ", getInvoiceCountt()=" + getInvoiceCountt() + ", getAddress()="
				+ getAddress() + ", getRefDocId()=" + getRefDocId() + ", getBedName()=" + getBedName()
				+ ", getDischargeDate()=" + getDischargeDate() + ", getDischargeTime()=" + getDischargeTime()
				+ ", getTotBill()=" + getTotBill() + ", getTotPaid()=" + getTotPaid() + ", getTotBal()=" + getTotBal()
				+ ", getTotDisc()=" + getTotDisc() + ", getListEhatBillPrefix()=" + getListEhatBillPrefix()
				+ ", getListDistDates()=" + getListDistDates() + ", getAge2()=" + getAge2() + ", getEmergency()="
				+ getEmergency() + ", getCategoryName()=" + getCategoryName() + ", getIsPpn()=" + getIsPpn()
				+ ", getNumbr()=" + getNumbr() + ", getRefSrcId()=" + getRefSrcId() + ", getRefSrcDocId()="
				+ getRefSrcDocId() + ", getDocName()=" + getDocName() + ", getPerAddress()=" + getPerAddress()
				+ ", getPertalukaId()=" + getPertalukaId() + ", getPertownId()=" + getPertownId()
				+ ", getPerdistrictId()=" + getPerdistrictId() + ", getPerstateId()=" + getPerstateId()
				+ ", getPercountryId()=" + getPercountryId() + ", getPerareaCode()=" + getPerareaCode()
				+ ", getRelativeName()=" + getRelativeName() + ", getRelationId()=" + getRelationId()
				+ ", getOldPatientId()=" + getOldPatientId() + ", getDepartmentNameDoc()=" + getDepartmentNameDoc()
				+ ", getDocNameChan()=" + getDocNameChan() + ", getPatientId()=" + getPatientId() + ", getPatientIdd()="
				+ getPatientIdd() + ", getCenterPatientId()=" + getCenterPatientId() + ", getUrineVol()="
				+ getUrineVol() + ", getLmpDate()=" + getLmpDate() + ", getBusinessType()=" + getBusinessType()
				+ ", getCustomerType()=" + getCustomerType() + ", getCustomerId()=" + getCustomerId()
				+ ", getEmailId()=" + getEmailId() + ", getCollectionDate()=" + getCollectionDate()
				+ ", getCollectionTime()=" + getCollectionTime() + ", getPatientBarcode()=" + getPatientBarcode()
				+ ", getRegisteredAt()=" + getRegisteredAt() + ", getReferredBy()=" + getReferredBy()
				+ ", getCustomerTypeName()=" + getCustomerTypeName() + ", getRefDoctorName()=" + getRefDoctorName()
				+ ", getPassport()=" + getPassport() + ", getIdentificationNo()=" + getIdentificationNo()
				+ ", getCustomerName()=" + getCustomerName() + ", getProofId()=" + getProofId()
				+ ", getNationalityId()=" + getNationalityId() + ", getRefDocPrefix()=" + getRefDocPrefix()
				+ ", getReferSource()=" + getReferSource() + ", getNationality()=" + getNationality()
				+ ", getEmployeeId()=" + getEmployeeId() + ", getEmployeeName()=" + getEmployeeName()
				+ ", getQueue_status()=" + getQueue_status() + ", getApproveBy()=" + getApproveBy()
				+ ", getApproveRemark()=" + getApproveRemark() + ", getInvoiceDateTime()=" + getInvoiceDateTime()
				+ ", getUsername()=" + getUsername() + ", getVisittype()=" + getVisittype() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	
	
	}

	

	

	
	

}
