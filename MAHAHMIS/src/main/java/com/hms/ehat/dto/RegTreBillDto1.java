package com.hms.ehat.dto;

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
@Table(name = "patient_records_details1")
public class RegTreBillDto1 {
	@Id
	@Column(name = "bill_id")
	private Integer billId;
	

	@Column(name = "patient_id")
	private Integer patientId;
	
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
	
	@Transient
	private Date recCreatedDateTime;
	
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
	private String categoryName;
	
	@Column(name = "isPpn")
	private String isPpn;
	
	@Column(name = "numbr")
	private Double numbr;
	
	@Column(name = "docNameChan")
	private String docNameChan;
	
	// Added by vinod
	
	@Column(name = "discharge_date")
	private String dischargeDate;
	
	@Column(name = "discharge_time")
	private String dischargeTime;
	
	@Transient
	private String bedName="-";
	
	@Transient
	private double totBill=0;
	
	@Transient
	private double totPaid=0;
	
	@Transient
	private double totBal=0;
	
	@Column(name = "doc_name")
	private String docName ;
	
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
	
	@Column(name = "department_name")
	private String departmentNameDoc;
	
	@Transient
	private double totDisc=0;
	
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
	private List<RegTreBillDto1> listRegTreBillDto;

	@Transient
	private List<DoctorDto> lstDoctorDto;
	
	@Transient
	private String  patientCount;
		
	
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

	public List<RegTreBillDto1> getListRegTreBillDto() {
		return listRegTreBillDto;
	}

	public void setListRegTreBillDto(List<RegTreBillDto1> listRegTreBillDto) {
		this.listRegTreBillDto = listRegTreBillDto;
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

	public String getPatientIdd() {
		return patientIdd;
	}

	public void setPatientIdd(String patientIdd) {
		this.patientIdd = patientIdd;
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
	

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	@Override
	public String toString() {
		return "RegTreBillDto [billId=" + billId + ", patientId=" + patientId
				+ ", patientIdd=" + patientIdd + ", invoiceCountt="
				+ invoiceCountt + ", unitId=" + unitId + ", treatmentId="
				+ treatmentId + ", departmentId=" + departmentId
				+ ", refDocId=" + refDocId + ", doctorId=" + doctorId
				+ ", address=" + address + ", token=" + token
				+ ", invoiceCount=" + invoiceCount + ", invoiceFlag="
				+ invoiceFlag + ", patientName=" + patientName + ", imageName="
				+ imageName + ", mobile=" + mobile + ", gender=" + gender
				+ ", age=" + age + ", sourceTypeId=" + sourceTypeId
				+ ", chargesMasterSlaveId=" + chargesMasterSlaveId + ", tFlag="
				+ tFlag + ", createdDateTime=" + createdDateTime
				+ ", recCreatedDateTime=" + recCreatedDateTime + ", dob=" + dob
				+ ", weight=" + weight + ", height=" + height + ", trcount="
				+ trcount + ", opdipdno=" + opdipdno + ", tokenno=" + tokenno
				+ ", mrnno=" + mrnno + ", stateId=" + stateId + ", townId="
				+ townId + ", districtId=" + districtId + ", talukaId="
				+ talukaId + ", refSrcId=" + refSrcId + ", refSrcDocId="
				+ refSrcDocId + ", emergency=" + emergency + ", categoryName="
				+ categoryName + ", isPpn=" + isPpn + ", numbr=" + numbr
				+ ", docNameChan=" + docNameChan + ", dischargeDate="
				+ dischargeDate + ", dischargeTime=" + dischargeTime
				+ ", bedName=" + bedName + ", totBill=" + totBill
				+ ", totPaid=" + totPaid + ", totBal=" + totBal + ", docName="
				+ docName + ", physicalDisFlag=" + physicalDisFlag
				+ ", perAddress=" + perAddress + ", pertalukaId=" + pertalukaId
				+ ", pertownId=" + pertownId + ", perdistrictId="
				+ perdistrictId + ", perstateId=" + perstateId
				+ ", percountryId=" + percountryId + ", perareaCode="
				+ perareaCode + ", relativeName=" + relativeName
				+ ", relationId=" + relationId + ", oldPatientId="
				+ oldPatientId + ", departmentNameDoc=" + departmentNameDoc
				+ ", totDisc=" + totDisc + ", listEhatBillPrefix="
				+ listEhatBillPrefix + ", listDistDates=" + listDistDates
				+ ", listRegTreBillDto=" + listRegTreBillDto
				+ ", lstDoctorDto=" + lstDoctorDto + ", age2=" + age2 + "]";
	}
	

}
