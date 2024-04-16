package com.hms.doctordesk.dto;

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

import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatBillPrefix;

public class OpdPatientDetailsDto {

	private Integer patient_id;
	
	private String center_patient_id;
	
	private String gender;
	
	private String patient_age;
	
	private Integer bill_id;
	
	private Integer treatment_id;
	
	private String opdipdno;
	
	private Date created_date_time;
	
	private String patient_name;
	
	private String doc_name;
	
	private Integer ref_doc_id;
	
	private String mrnno;
	
	private String dob;
	
	private String image_name;
	
	private Integer age_days;

	private Integer age_months;
	
	private String address;
	
	private Double weight;

	private Double height;
	
	private String trcount;
	
	private String tokenno;
	
	private String bill_category;
	
	private String consulting_doctor;
	
	private Integer refbill_no;
	
	private String doctor_id;
	
	//Added By Badrinath
	private Integer invoice_count;
	
	public Integer getInvoice_count() {
		return invoice_count;
	}

	public void setInvoice_count(Integer invoice_count) {
		this.invoice_count = invoice_count;
	}

	public double getTarget_height() {
		return target_height;
	}

	public void setTarget_height(double target_height) {
		this.target_height = target_height;
	}

	private String  speciality_id;
	
	private double target_height;
	
	private List<OpdPatientDetailsDto> listOpdPatientDetailsDto;

	public Integer getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(Integer patient_id) {
		this.patient_id = patient_id;
	}

	public String getCenter_patient_id() {
		return center_patient_id;
	}

	public void setCenter_patient_id(String center_patient_id) {
		this.center_patient_id = center_patient_id;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPatient_age() {
		return patient_age;
	}

	public void setPatient_age(String patient_age) {
		this.patient_age = patient_age;
	}

	public Integer getBill_id() {
		return bill_id;
	}

	public void setBill_id(Integer bill_id) {
		this.bill_id = bill_id;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public String getDoc_name() {
		return doc_name;
	}

	public void setDoc_name(String doc_name) {
		this.doc_name = doc_name;
	}

	public Integer getRef_doc_id() {
		return ref_doc_id;
	}

	public void setRef_doc_id(Integer ref_doc_id) {
		this.ref_doc_id = ref_doc_id;
	}

	public String getMrnno() {
		return mrnno;
	}

	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getImage_name() {
		return image_name;
	}

	public void setImage_name(String image_name) {
		this.image_name = image_name;
	}

	public Integer getAge_days() {
		return age_days;
	}

	public void setAge_days(Integer age_days) {
		this.age_days = age_days;
	}

	public Integer getAge_months() {
		return age_months;
	}

	public void setAge_months(Integer age_months) {
		this.age_months = age_months;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
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

	public String getBill_category() {
		return bill_category;
	}

	public void setBill_category(String bill_category) {
		this.bill_category = bill_category;
	}

	public String getConsulting_doctor() {
		return consulting_doctor;
	}

	public void setConsulting_doctor(String consulting_doctor) {
		this.consulting_doctor = consulting_doctor;
	}

	public Integer getRefbill_no() {
		return refbill_no;
	}

	public void setRefbill_no(Integer refbill_no) {
		this.refbill_no = refbill_no;
	}

	public List<OpdPatientDetailsDto> getListOpdPatientDetailsDto() {
		return listOpdPatientDetailsDto;
	}

	public void setListOpdPatientDetailsDto(List<OpdPatientDetailsDto> listOpdPatientDetailsDto) {
		this.listOpdPatientDetailsDto = listOpdPatientDetailsDto;
	}

	

	public String getSpeciality_id() {
		return speciality_id;
	}

	public void setSpeciality_id(String speciality_id) {
		this.speciality_id = speciality_id;
	}

	public String getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(String doctor_id) {
		this.doctor_id = doctor_id;
	}

	@Override
	public String toString() {
		return "OpdPatientDetailsDto [patient_id=" + patient_id + ", center_patient_id=" + center_patient_id
				+ ", gender=" + gender + ", patient_age=" + patient_age + ", bill_id=" + bill_id + ", treatment_id="
				+ treatment_id + ", opdipdno=" + opdipdno + ", created_date_time=" + created_date_time
				+ ", patient_name=" + patient_name + ", doc_name=" + doc_name + ", ref_doc_id=" + ref_doc_id
				+ ", mrnno=" + mrnno + ", dob=" + dob + ", image_name=" + image_name + ", age_days=" + age_days
				+ ", age_months=" + age_months + ", address=" + address + ", weight=" + weight + ", height=" + height
				+ ", trcount=" + trcount + ", tokenno=" + tokenno + ", bill_category=" + bill_category
				+ ", consulting_doctor=" + consulting_doctor + ", refbill_no=" + refbill_no + ", doctor_id=" + doctor_id
				+ ", invoice_count=" + invoice_count + ", speciality_id=" + speciality_id + ", target_height="
				+ target_height + ", listOpdPatientDetailsDto=" + listOpdPatientDetailsDto + "]";
	}


	
	
}
