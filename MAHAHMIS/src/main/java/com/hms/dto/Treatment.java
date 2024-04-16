package com.hms.dto;

import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Treatment {
	private String claim_time;
	private int treatment_ID;
	private String manage_flag;
	private int patient_ID;
	private Date tDate;
	private String tFlag;
	private String weight;
	private String referedBy;
	private String referedTo;
	private String symptoms;
	private String tstartDate;
	private String tendDate;
	private List<Treatment> litreatment;
	//private List<BillMaster> libillmaster;
	//private List<Patient> lipatient;
	private String intime;
	private String outtime;
	private String opd;
	private String echo;
	private String note;
	private String tmt;
	private String opd_date;
	private String oprDate;
	private String sdiscount;
	private int noOfVisit;
	private int specialDiscount;
	private String empId;
	private String bedridden;
	private String seropositive;
	private String department;
	private String selReferredBy;
	private String txtReferredBy;
	private String otherRefDoc;
	private String txtReferredByNM;
	private String treatmentCount;
	private int idreadiology;
	private String createdDate;

	// relative details for billing
	

	private String typeOfPayment;
	private String paymentPerName;
	private String relAge;
	private String relSex;
	private String relRelation;
	private String relAddress;
	private String relMobile;
	private String selCompany;
	private String insuranceCmpny;
	private String memoNo;
	private String popup_container4;
	private String cashlessPolicyNo;
	private String cnnnNo;
	private String convertToIpd;

	private String ipdAdmissionDate;
	private String billCategory;
	private String billCategory_Name;
	private double billCategory_Discount;
	private String erFlag;
	private int docter_id;
	private int hospital_id;
	private String companyname;
	private int companyid;
	//private List<OPDReceiptMaster> opdReceiptMasterList;
	//private List<OPDReceiptMaster> diagnosisReceiptMasterList;
	private List refundReceiptList;
	
	private int reasonOfVisit_id;
	private boolean chkRefDoc;
	
	
	@JsonGetter("ctd")
	public String getCreatedDate() {
		return createdDate;
	}
	@JsonSetter("ctd")
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	
	@JsonGetter("companyid")
	public int getCompanyid() {
		return companyid;
	}
	@JsonSetter("companyid")
	public void setCompanyid(int companyid) {
		this.companyid = companyid;
	}

	public boolean isChkRefDoc() {
		return chkRefDoc;
	}

	public void setChkRefDoc(boolean chkRefDoc) {
		this.chkRefDoc = chkRefDoc;
	}

	@JsonGetter("reasonOfVisit_id")
	public int getReasonOfVisit_id() {
		return reasonOfVisit_id;
	}

	@JsonSetter("reasonOfVisit_id")
	public void setReasonOfVisit_id(int reasonOfVisit_id) {
		this.reasonOfVisit_id = reasonOfVisit_id;
	}

	@JsonGetter("refundReceiptList")
	public List getRefundReceiptList() {
		return refundReceiptList;
	}

	@JsonSetter("refundReceiptList")
	public void setRefundReceiptList(List refundReceiptList) {
		this.refundReceiptList = refundReceiptList;
	}

	/*
	 * @JsonGetter("diagnosisReceiptMasterList") public List<OPDReceiptMaster>
	 * getDiagnosisReceiptMasterList() { return diagnosisReceiptMasterList; }
	 * 
	 * @JsonSetter("diagnosisReceiptMasterList") public void
	 * setDiagnosisReceiptMasterList( List<OPDReceiptMaster>
	 * diagnosisReceiptMasterList) { this.diagnosisReceiptMasterList =
	 * diagnosisReceiptMasterList; }
	 * 
	 * @JsonGetter("opdReceiptMasterList") public List<OPDReceiptMaster>
	 * getOpdReceiptMasterList() { return opdReceiptMasterList; }
	 * 
	 * @JsonSetter("opdReceiptMasterList") public void setOpdReceiptMasterList(
	 * List<OPDReceiptMaster> opdReceiptMasterList) { this.opdReceiptMasterList =
	 * opdReceiptMasterList; }
	 */

	@JsonGetter("IdRadiology")
	public int getIdreadiology() {
		return idreadiology;
	}

	@JsonSetter("IdRadiology")
	public void setIdreadiology(int idreadiology) {
		this.idreadiology = idreadiology;
	}

	@JsonGetter("mcflag")
	public String getManage_flag() {
		return manage_flag;
	}

	@JsonSetter("mcflag")
	public void setManage_flag(String manage_flag) {
		this.manage_flag = manage_flag;
	}

	@JsonGetter
	public String getClaim_time() {
		return claim_time;
	}

	@JsonSetter("claim_time")
	public void setClaim_time(String claim_time) {
		this.claim_time = claim_time;
	}

	@JsonGetter("docter_id")
	public int getDocter_id() {
		return docter_id;
	}

	@JsonSetter("docter_id")
	public void setDocter_id(int docter_id) {
		this.docter_id = docter_id;
	}

	@JsonGetter("hospital_id")
	public int getHospital_id() {
		return hospital_id;
	}

	@JsonSetter("hospital_id")
	public void setHospital_id(int hospital_id) {
		this.hospital_id = hospital_id;
	}

	@JsonGetter("ipdAdDt")
	public String getIpdAdmissionDate() {
		return ipdAdmissionDate;
	}

	@JsonSetter("ipdAdDt")
	public void setIpdAdmissionDate(String ipdAdmissionDate) {
		this.ipdAdmissionDate = ipdAdmissionDate;
	}

	@JsonGetter("ipdBillCat")
	public String getBillCategory() {
		return billCategory;
	}

	@JsonSetter("ipdBillCat")
	public void setBillCategory(String billCategory) {
		this.billCategory = billCategory;
	}

	@JsonGetter("convertToIpd")
	public String getConvertToIpd() {
		return convertToIpd;
	}

	@JsonSetter("convertToIpd")
	public void setConvertToIpd(String convertToIpd) {
		this.convertToIpd = convertToIpd;
	}

	@JsonGetter("txtRefByNM")
	public String getTxtReferredByNM() {
		return txtReferredByNM;
	}

	@JsonSetter("txtRefByNM")
	public void setTxtReferredByNM(String txtReferredByNM) {
		this.txtReferredByNM = txtReferredByNM;
	}

	@JsonGetter("otrfdoc")
	public String getOtherRefDoc() {
		return otherRefDoc;
	}

	@JsonSetter("otrfdoc")
	public void setOtherRefDoc(String otherRefDoc) {
		this.otherRefDoc = otherRefDoc;
	}

	@JsonGetter("selRefBy")
	public String getSelReferredBy() {
		return selReferredBy;
	}

	@JsonSetter("selRefBy")
	public void setSelReferredBy(String selReferredBy) {
		this.selReferredBy = selReferredBy;
	}

	@JsonGetter("txtRefBy")
	public String getTxtReferredBy() {
		return txtReferredBy;
	}

	@JsonSetter("txtRefBy")
	public void setTxtReferredBy(String txtReferredBy) {
		this.txtReferredBy = txtReferredBy;
	}

	@JsonGetter("tppay")
	public String getTypeOfPayment() {
		return typeOfPayment;
	}

	@JsonSetter("tppay")
	public void setTypeOfPayment(String typeOfPayment) {
		this.typeOfPayment = typeOfPayment;
	}

	@JsonGetter("paynm")
	public String getPaymentPerName() {
		return paymentPerName;
	}

	@JsonSetter("paynm")
	public void setPaymentPerName(String paymentPerName) {
		this.paymentPerName = paymentPerName;
	}

	@JsonGetter("relage")
	public String getRelAge() {
		return relAge;
	}

	@JsonSetter("relage")
	public void setRelAge(String relAge) {
		this.relAge = relAge;
	}

	@JsonGetter("relsex")
	public String getRelSex() {
		return relSex;
	}

	@JsonSetter("relsex")
	public void setRelSex(String relSex) {
		this.relSex = relSex;
	}

	@JsonGetter("relrelation")
	public String getRelRelation() {
		return relRelation;
	}

	@JsonSetter("relrelation")
	public void setRelRelation(String relRelation) {
		this.relRelation = relRelation;
	}

	@JsonGetter("relAdd")
	public String getRelAddress() {
		return relAddress;
	}

	@JsonSetter("relAdd")
	public void setRelAddress(String relAddress) {
		this.relAddress = relAddress;
	}

	@JsonGetter("relmob")
	public String getRelMobile() {
		return relMobile;
	}

	@JsonSetter("relmob")
	public void setRelMobile(String relMobile) {
		this.relMobile = relMobile;
	}

	@JsonGetter("cmpny")
	public String getSelCompany() {
		return selCompany;
	}

	@JsonSetter("cmpny")
	public void setSelCompany(String selCompany) {
		this.selCompany = selCompany;
	}

	@JsonGetter("insuCmpny")
	public String getInsuranceCmpny() {
		return insuranceCmpny;
	}

	@JsonSetter("insuCmpny")
	public void setInsuranceCmpny(String insuranceCmpny) {
		this.insuranceCmpny = insuranceCmpny;
	}

	@JsonGetter("memoNo")
	public String getMemoNo() {
		return memoNo;
	}

	@JsonSetter("memoNo")
	public void setMemoNo(String memoNo) {
		this.memoNo = memoNo;
	}

	@JsonGetter("rmenoDt")
	public String getPopup_container4() {
		return popup_container4;
	}

	@JsonSetter("rmenoDt")
	public void setPopup_container4(String popup_container4) {
		this.popup_container4 = popup_container4;
	}

	@JsonGetter("cashPolNo")
	public String getCashlessPolicyNo() {
		return cashlessPolicyNo;
	}

	@JsonSetter("cashPolNo")
	public void setCashlessPolicyNo(String cashlessPolicyNo) {
		this.cashlessPolicyNo = cashlessPolicyNo;
	}

	@JsonGetter("cnnNo")
	public String getCnnnNo() {
		return cnnnNo;
	}

	@JsonSetter("cnnNo")
	public void setCnnnNo(String cnnnNo) {
		this.cnnnNo = cnnnNo;
	}

	// end details
	@JsonGetter("trCount")
	public String getTreatmentCount() {
		return treatmentCount;
	}

	@JsonSetter("trCount")
	public void setTreatmentCount(String treatmentCount) {
		this.treatmentCount = treatmentCount;
	}

	//private List<DischargeSummery> objdslist;

	/*
	 * @JsonGetter("ods") public List<DischargeSummery> getObjdslist() { return
	 * objdslist; }
	 * 
	 * @JsonSetter("ods") public void setObjdslist(List<DischargeSummery> objdslist)
	 * { this.objdslist = objdslist; }
	 */

	@JsonGetter("bedridden")
	public String getBedridden() {
		return bedridden;
	}

	@JsonSetter("bedridden")
	public void setBedridden(String bedridden) {
		this.bedridden = bedridden;
	}

	@JsonGetter("sero")
	public String getSeropositive() {
		return seropositive;
	}

	@JsonSetter("sero")
	public void setSeropositive(String seropositive) {
		this.seropositive = seropositive;
	}

	@JsonGetter("sdic")
	public int getSpecialDiscount() {
		return specialDiscount;
	}

	@JsonSetter("sdic")
	public void setSpecialDiscount(int specialDiscount) {
		this.specialDiscount = specialDiscount;
	}

	@JsonGetter("empId")
	public String getEmpId() {
		return empId;
	}

	@JsonSetter("empId")
	public void setEmpId(String empId) {
		this.empId = empId;
	}

	@JsonGetter("sn")
	public String sdiscount() {
		return sdiscount;
	}

	@JsonSetter("sn")
	public void sdiscount(String sdiscount) {
		this.sdiscount = sdiscount;
	}

	@JsonGetter("opddt")
	public String getOpd_date() {
		return opd_date;
	}

	@JsonSetter("opddt")
	public void setOpd_date(String opd_date) {
		this.opd_date = opd_date;
	}

	@JsonGetter("echo")
	public String getEcho() {
		return echo;
	}

	@JsonSetter("echo")
	public void setEcho(String echo) {
		this.echo = echo;
	}

	@JsonGetter("tmt")
	public String getTmt() {
		return tmt;
	}

	@JsonSetter("tmt")
	public void setTmt(String tmt) {
		this.tmt = tmt;
	}

	@JsonGetter("opd")
	public String getOpd() {
		return opd;
	}

	@JsonSetter("opd")
	public void setOpd(String opd) {
		this.opd = opd;
	}

	@JsonGetter("int")
	public String getIntime() {
		return intime;
	}

	@JsonSetter("int")
	public void setIntime(String intime) {
		this.intime = intime;
	}

	@JsonGetter("out")
	public String getOuttime() {
		return outtime;
	}

	@JsonSetter("out")
	public void setOuttime(String outtime) {
		this.outtime = outtime;
	}

	@JsonGetter("lit")
	public List<Treatment> getLitreatment() {
		return litreatment;
	}

	@JsonSetter("lit")
	public void setLitreatment(List<Treatment> litreatment) {
		this.litreatment = litreatment;
	}

	/*
	 * @JsonGetter("lib") public List<BillMaster> getLibillmaster() { return
	 * libillmaster; }
	 * 
	 * @JsonSetter("lib") public void setLibillmaster(List<BillMaster> libillmaster)
	 * { this.libillmaster = libillmaster; }
	 * 
	 * @JsonGetter("lip") public List<Patient> getLipatient() { return lipatient; }
	 * 
	 * @JsonSetter("lip") public void setLipatient(List<Patient> lipatient) {
	 * this.lipatient = lipatient; }
	 */

	@JsonGetter("treStart")
	public String getTstartDate() {
		return tstartDate;
	}

	@JsonSetter("treStart")
	public void setTstartDate(String tstartDate) {
		this.tstartDate = tstartDate;
	}

	@JsonGetter("treEnd")
	public String getTendDate() {
		return tendDate;
	}

	@JsonSetter("treEnd")
	public void setTendDate(String tendDate) {
		this.tendDate = tendDate;
	}

	public Treatment(int patient_ID, Date date, String flag, int treatment_ID,
			String claim_time) {
		super();
		this.patient_ID = patient_ID;
		this.tDate = date;
		this.tFlag = flag;
		this.treatment_ID = treatment_ID;
		this.claim_time = claim_time;
	}

	public Treatment() {

	}

	public Treatment(int patient_ID, String referedBy, String referedTo,
			String symptoms, Date date, String flag, int treatment_ID,
			String weight) {
		super();
		this.patient_ID = patient_ID;
		this.referedBy = referedBy;
		this.referedTo = referedTo;
		this.symptoms = symptoms;
		this.tDate = date;
		this.tFlag = flag;
		this.treatment_ID = treatment_ID;
		this.weight = weight;
	}

	/**
	 * @return the weight
	 */
	@JsonGetter("wt")
	public String getWeight() {
		return weight;
	}

	/**
	 * @param weight
	 *            the weight to set
	 */
	@JsonSetter("wt")
	public void setWeight(String weight) {
		this.weight = weight;
	}

	/**
	 * @return the referedBy
	 */
	@JsonGetter("rb")
	public String getReferedBy() {
		return referedBy;
	}

	/**
	 * @param referedBy
	 *            the referedBy to set
	 */
	@JsonSetter("rb")
	public void setReferedBy(String referedBy) {
		this.referedBy = referedBy;
	}

	/**
	 * @return the referedTo
	 */
	@JsonGetter("rt")
	public String getReferedTo() {
		return referedTo;
	}

	/**
	 * @param referedTo
	 *            the referedTo to set
	 */
	@JsonSetter("rt")
	public void setReferedTo(String referedTo) {
		this.referedTo = referedTo;
	}

	/**
	 * @return the symptoms
	 */
	@JsonGetter("sy")
	public String getSymptoms() {
		return symptoms;
	}

	/**
	 * @param symptoms
	 *            the symptoms to set
	 */
	@JsonSetter("sy")
	public void setSymptoms(String symptoms) {
		this.symptoms = symptoms;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("ti")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	/**
	 * @param treatment_ID
	 *            the treatment_ID to set
	 */
	@JsonSetter("ti")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	/**
	 * @return the patient_ID
	 */
	@JsonGetter("pi")
	public int getPatient_ID() {
		return patient_ID;
	}

	/**
	 * @param patient_ID
	 *            the patient_ID to set
	 */
	@JsonSetter("pi")
	public void setPatient_ID(int patient_ID) {
		this.patient_ID = patient_ID;
	}

	/**
	 * @return the tDate
	 */
	@JsonGetter("dt")
	public Date gettDate() {
		return tDate;
	}

	/**
	 * @param date
	 *            the tDate to set
	 */
	@JsonSetter("dt")
	public void settDate(Date date) {
		this.tDate = date;
	}

	/**
	 * @return the tFlag
	 */
	@JsonGetter("tf")
	public String gettFlag() {
		return tFlag;
	}

	/**
	 * @param flag
	 *            the tFlag to set
	 */
	@JsonSetter("tf")
	public void settFlag(String flag) {
		this.tFlag = flag;
	}

	@JsonGetter("nv")
	public int getNoOfVisit() {
		return noOfVisit;
	}

	@JsonSetter("nv")
	public void setNoOfVisit(int noOfVisit) {
		this.noOfVisit = noOfVisit;
	}

	@JsonGetter("opDate")
	public String getOprDate() {
		return oprDate;
	}

	@JsonSetter("opDate")
	public void setOprDate(String oprDate) {
		this.oprDate = oprDate;
	}

	@JsonGetter("erFlag")
	public String getErFlag() {
		return erFlag;
	}

	@JsonSetter("erFlag")
	public void setErFlag(String erFlag) {
		this.erFlag = erFlag;
	}

	@JsonGetter("note")
	public String getNote() {
		return note;
	}

	@JsonSetter("note")
	public void setNote(String note) {
		this.note = note;
	}
	@JsonGetter("billCategory_Name")
	public String getBillCategory_Name() {
		return billCategory_Name;
	}
	@JsonSetter("billCategory_Name")
	public void setBillCategory_Name(String billCategory_Name) {
		this.billCategory_Name = billCategory_Name;
	}
	
	@JsonGetter("billCategory_Discount")
	public double getBillCategory_Discount() {
		return billCategory_Discount;
	}
	@JsonSetter("billCategory_Discount")
	public void setBillCategory_Discount(double billCategory_Discount) {
		this.billCategory_Discount = billCategory_Discount;
	}
	@JsonGetter("companyname")
	public String getCompanyname() {
		return companyname;
	}
	@JsonSetter("companyname")
	public void setCompanyname(String companyname) {
		this.companyname = companyname;
	}
	
	@JsonGetter("department")
	public String getDepartment() {
		return department;
	}
	
	@JsonSetter("department")
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getSdiscount() {
		return sdiscount;
	}
	public void setSdiscount(String sdiscount) {
		this.sdiscount = sdiscount;
	}
	
}
