package com.hms.ehat.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class RegTreBillDto2 {


	private Integer bill_id;
	
	private Integer patient_id;
	
	private Integer department_id;
	
	private Integer treatment_id;
	
	private BigInteger invoice_count;
	
	private String invoice_flag;
	
	private String doctor_id;
	
	private int token;
	
	private String t_flag;
	
	private String trcount;
	
	private String tokenno;
	
	private Integer ref_doc_id;
	
	private String gender;
	
	private String center_patient_id;
	
	private Date createdDateTime;
	
	private String patientName;
	
	private String mobile;
	
	private int source_type_id;
	
	private int charges_master_slave_id;
	
	private String dob;
	
	private String patient_age;
	
	private double height;
	
	private double weight;
	
	private String opdipdno;
	
	private Integer unit_id;
	
	private String mrnno;
	
	private int state_id;
	
	private int town_id;
	
	private int district_id;
	
	private int taluka_id;
	
	private String image_name;
	
	private String address;
	
	private String patient_age2;
	
	private int referred_source;
	
	private int referred_source_docId;
	
	private String emergency;
	
	private String phydis_flag ;
	
	private String per_address;
	
	private int per_country_id;
	
	private int per_town_id;
	
	private int per_taluka_id;
	
	private int per_district_id;
	
	private int per_state_id;
	
	private int per_area_code;
	
	private String relative_name;
	
	private int relation_id;
	
	private String old_patient_id;
	
	private BigInteger employ_id;
	
	private String employee_name;
	
	private String urine_vol;
	
	private BigInteger business_type;
	
	private BigInteger customer_type;
	
	private BigInteger customer_id;
	
	private String lmp_date;
	
	private String discharge_date;
	
	private String discharge_time;
	
	private String dep_prefix;
	
	private String bill_prefix;
	
	private String bill_middle;
	
	private String bill_sufix;
	
	private String doc_name;
	
	private String category_name;
	
	private String isPpn;
	
	private BigInteger numbr;
	
	private String patient_barcode="";
	
	private String department_name;
	
	private String docNameChan;
	
	private String ref_doc_prefix;
	
	private String prefix;
	
	private String f_name;
	
	private String m_name;
	
	private String l_name;
	
	private String emergency_flag;
	
	private String special_case_name;
	
	private String customer_name;
	
	private String customer_type_name;
	
	private String passport;
	
	private String identification_number;
	
	private Integer proof_id;
	
	private Integer nationality_id;
	
	private BigInteger refer_source;
	
	private String nationality;
	
	private String collection_date="";
	
	private String collection_time="";
	
	private String registered_at;
	
	private String email_id;
	
	private String referred_by;
	
	private Date receipt_created_datetime;
	
	private String ref_doctor_name="-";
	
	private double TotBill=0;
	
	private double TotPaid=0;
	
	private double TotBal=0;
	
	private double TotDisc=0;
	
	private double TotConc=0;
	
	private String docName ;
	
	private String sponsor_name;
	
	private String BedName="-";

	@Transient
	private List<RegTreBillDto2> listRegTreBillDto;

	public Integer getBill_id() {
		return bill_id;
	}

	public void setBill_id(Integer bill_id) {
		this.bill_id = bill_id;
	}

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public Integer getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Integer department_id) {
		this.department_id = department_id;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public BigInteger getInvoice_count() {
		return invoice_count;
	}

	public void setInvoice_count(BigInteger invoice_count) {
		this.invoice_count = invoice_count;
	}

	public String getInvoice_flag() {
		return invoice_flag;
	}

	public void setInvoice_flag(String invoice_flag) {
		this.invoice_flag = invoice_flag;
	}

	public String getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(String doctor_id) {
		this.doctor_id = doctor_id;
	}

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public String getT_flag() {
		return t_flag;
	}

	public void setT_flag(String t_flag) {
		this.t_flag = t_flag;
	}

	public String getTrcount() {
		return trcount;
	}

	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}

	public String getTokenno() {
		return tokenno;
	}

	public void setTokenno(String tokenno) {
		this.tokenno = tokenno;
	}

	public Integer getRef_doc_id() {
		return ref_doc_id;
	}

	public void setRef_doc_id(Integer ref_doc_id) {
		this.ref_doc_id = ref_doc_id;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getCenter_patient_id() {
		return center_patient_id;
	}

	public void setCenter_patient_id(String center_patient_id) {
		this.center_patient_id = center_patient_id;
	}

	

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public int getSource_type_id() {
		return source_type_id;
	}

	public void setSource_type_id(int source_type_id) {
		this.source_type_id = source_type_id;
	}

	public int getCharges_master_slave_id() {
		return charges_master_slave_id;
	}

	public void setCharges_master_slave_id(int charges_master_slave_id) {
		this.charges_master_slave_id = charges_master_slave_id;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getPatient_age() {
		return patient_age;
	}

	public void setPatient_age(String patient_age) {
		this.patient_age = patient_age;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public int getState_id() {
		return state_id;
	}

	public void setState_id(int state_id) {
		this.state_id = state_id;
	}

	public int getTown_id() {
		return town_id;
	}

	public void setTown_id(int town_id) {
		this.town_id = town_id;
	}

	public int getDistrict_id() {
		return district_id;
	}

	public void setDistrict_id(int district_id) {
		this.district_id = district_id;
	}

	public int getTaluka_id() {
		return taluka_id;
	}

	public void setTaluka_id(int taluka_id) {
		this.taluka_id = taluka_id;
	}

	public String getImage_name() {
		return image_name;
	}

	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPatient_age2() {
		return patient_age2;
	}

	public void setPatient_age2(String patient_age2) {
		this.patient_age2 = patient_age2;
	}

	public int getReferred_source() {
		return referred_source;
	}

	public void setReferred_source(int referred_source) {
		this.referred_source = referred_source;
	}

	public int getReferred_source_docId() {
		return referred_source_docId;
	}

	public void setReferred_source_docId(int referred_source_docId) {
		this.referred_source_docId = referred_source_docId;
	}

	public String getEmergency() {
		return emergency;
	}

	public void setEmergency(String emergency) {
		this.emergency = emergency;
	}

	public String getPhydis_flag() {
		return phydis_flag;
	}

	public void setPhydis_flag(String phydis_flag) {
		this.phydis_flag = phydis_flag;
	}

	public String getPer_address() {
		return per_address;
	}

	public void setPer_address(String per_address) {
		this.per_address = per_address;
	}

	public int getPer_country_id() {
		return per_country_id;
	}

	public void setPer_country_id(int per_country_id) {
		this.per_country_id = per_country_id;
	}

	public int getPer_town_id() {
		return per_town_id;
	}

	public void setPer_town_id(int per_town_id) {
		this.per_town_id = per_town_id;
	}

	public int getPer_taluka_id() {
		return per_taluka_id;
	}

	public void setPer_taluka_id(int per_taluka_id) {
		this.per_taluka_id = per_taluka_id;
	}

	public int getPer_district_id() {
		return per_district_id;
	}

	public void setPer_district_id(int per_district_id) {
		this.per_district_id = per_district_id;
	}

	public int getPer_state_id() {
		return per_state_id;
	}

	public void setPer_state_id(int per_state_id) {
		this.per_state_id = per_state_id;
	}

	public int getPer_area_code() {
		return per_area_code;
	}

	public void setPer_area_code(int per_area_code) {
		this.per_area_code = per_area_code;
	}

	public String getRelative_name() {
		return relative_name;
	}

	public void setRelative_name(String relative_name) {
		this.relative_name = relative_name;
	}

	public int getRelation_id() {
		return relation_id;
	}

	public void setRelation_id(int relation_id) {
		this.relation_id = relation_id;
	}

	public String getOld_patient_id() {
		return old_patient_id;
	}

	public void setOld_patient_id(String old_patient_id) {
		this.old_patient_id = old_patient_id;
	}

	public BigInteger getEmploy_id() {
		return employ_id;
	}

	public void setEmploy_id(BigInteger employ_id) {
		this.employ_id = employ_id;
	}

	public String getEmployee_name() {
		return employee_name;
	}

	public void setEmployee_name(String employee_name) {
		this.employee_name = employee_name;
	}

	public String getUrine_vol() {
		return urine_vol;
	}

	public void setUrine_vol(String urine_vol) {
		this.urine_vol = urine_vol;
	}

	public BigInteger getBusiness_type() {
		return business_type;
	}

	public void setBusiness_type(BigInteger business_type) {
		this.business_type = business_type;
	}

	public BigInteger getCustomer_type() {
		return customer_type;
	}

	public void setCustomer_type(BigInteger customer_type) {
		this.customer_type = customer_type;
	}

	public BigInteger getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(BigInteger customer_id) {
		this.customer_id = customer_id;
	}

	public String getLmp_date() {
		return lmp_date;
	}

	public void setLmp_date(String lmp_date) {
		this.lmp_date = lmp_date;
	}

	public String getDischarge_date() {
		return discharge_date;
	}

	public void setDischarge_date(String discharge_date) {
		this.discharge_date = discharge_date;
	}

	public String getDischarge_time() {
		return discharge_time;
	}

	public void setDischarge_time(String discharge_time) {
		this.discharge_time = discharge_time;
	}

	public String getDep_prefix() {
		return dep_prefix;
	}

	public void setDep_prefix(String dep_prefix) {
		this.dep_prefix = dep_prefix;
	}

	public String getBill_prefix() {
		return bill_prefix;
	}

	public void setBill_prefix(String bill_prefix) {
		this.bill_prefix = bill_prefix;
	}

	public String getBill_middle() {
		return bill_middle;
	}

	public void setBill_middle(String bill_middle) {
		this.bill_middle = bill_middle;
	}

	public String getBill_sufix() {
		return bill_sufix;
	}

	public void setBill_sufix(String bill_sufix) {
		this.bill_sufix = bill_sufix;
	}

	public String getDoc_name() {
		return doc_name;
	}

	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public String getIsPpn() {
		return isPpn;
	}

	public void setIsPpn(String isPpn) {
		this.isPpn = isPpn;
	}

	public BigInteger getNumbr() {
		return numbr;
	}

	public void setNumbr(BigInteger numbr) {
		this.numbr = numbr;
	}

	public String getPatient_barcode() {
		return patient_barcode;
	}

	public void setPatient_barcode(String patient_barcode) {
		this.patient_barcode = patient_barcode;
	}

	public String getDepartment_name() {
		return department_name;
	}

	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}

	public String getDocNameChan() {
		return docNameChan;
	}

	public void setDocNameChan(String docNameChan) {
		this.docNameChan = docNameChan;
	}

	public String getRef_doc_prefix() {
		return ref_doc_prefix;
	}

	public void setRef_doc_prefix(String ref_doc_prefix) {
		this.ref_doc_prefix = ref_doc_prefix;
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

	public String getEmergency_flag() {
		return emergency_flag;
	}

	public void setEmergency_flag(String emergency_flag) {
		this.emergency_flag = emergency_flag;
	}

	public String getSpecial_case_name() {
		return special_case_name;
	}

	public void setSpecial_case_name(String special_case_name) {
		this.special_case_name = special_case_name;
	}

	public String getCustomer_name() {
		return customer_name;
	}

	public void setCustomer_name(String customer_name) {
		this.customer_name = customer_name;
	}

	public String getCustomer_type_name() {
		return customer_type_name;
	}

	public void setCustomer_type_name(String customer_type_name) {
		this.customer_type_name = customer_type_name;
	}

	public String getPassport() {
		return passport;
	}

	public void setPassport(String passport) {
		this.passport = passport;
	}

	public String getIdentification_number() {
		return identification_number;
	}

	public void setIdentification_number(String identification_number) {
		this.identification_number = identification_number;
	}

	public Integer getProof_id() {
		return proof_id;
	}

	public void setProof_id(Integer proof_id) {
		this.proof_id = proof_id;
	}

	public Integer getNationality_id() {
		return nationality_id;
	}

	public void setNationality_id(Integer nationality_id) {
		this.nationality_id = nationality_id;
	}

	public BigInteger getRefer_source() {
		return refer_source;
	}

	public void setRefer_source(BigInteger refer_source) {
		this.refer_source = refer_source;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getCollection_date() {
		return collection_date;
	}

	public void setCollection_date(String collection_date) {
		this.collection_date = collection_date;
	}

	public String getCollection_time() {
		return collection_time;
	}

	public void setCollection_time(String collection_time) {
		this.collection_time = collection_time;
	}

	public String getRegistered_at() {
		return registered_at;
	}

	public void setRegistered_at(String registered_at) {
		this.registered_at = registered_at;
	}

	public String getEmail_id() {
		return email_id;
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	public String getReferred_by() {
		return referred_by;
	}

	public void setReferred_by(String referred_by) {
		this.referred_by = referred_by;
	}

	public Date getReceipt_created_datetime() {
		return receipt_created_datetime;
	}

	public void setReceipt_created_datetime(Date receipt_created_datetime) {
		this.receipt_created_datetime = receipt_created_datetime;
	}

	public String getRef_doctor_name() {
		return ref_doctor_name;
	}

	public void setRef_doctor_name(String ref_doctor_name) {
		this.ref_doctor_name = ref_doctor_name;
	}

	public double getTotBill() {
		return TotBill;
	}

	public void setTotBill(double totBill) {
		TotBill = totBill;
	}

	public double getTotPaid() {
		return TotPaid;
	}

	public void setTotPaid(double totPaid) {
		TotPaid = totPaid;
	}

	public double getTotBal() {
		return TotBal;
	}

	public void setTotBal(double totBal) {
		TotBal = totBal;
	}

	public double getTotDisc() {
		return TotDisc;
	}

	public void setTotDisc(double totDisc) {
		TotDisc = totDisc;
	}
	
	

	public double getTotConc() {
		return TotConc;
	}

	public void setTotConc(double totConc) {
		TotConc = totConc;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public String getSponsor_name() {
		return sponsor_name;
	}

	public void setSponsor_name(String sponsor_name) {
		this.sponsor_name = sponsor_name;
	}

	public String getBedName() {
		return BedName;
	}

	public void setBedName(String bedName) {
		BedName = bedName;
	}

	public List<RegTreBillDto2> getListRegTreBillDto() {
		return listRegTreBillDto;
	}

	public void setListRegTreBillDto(List<RegTreBillDto2> listRegTreBillDto) {
		this.listRegTreBillDto = listRegTreBillDto;
	}
}
