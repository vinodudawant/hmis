package com.hms.registration.dto;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.Transient;

public class PatientConsultationChargesDto {
	        
	int patientId,treatmentId,billId,unitId,depId,userId,serviceId,chargesSlaveId;
	String doctorId;
	int n_doctor_id;
	int n_sub_service_id;
	double n_const_charges;
	int n_quantity;
	double n_amount;
	double n_other_amount;
	double n_other_rate;
    double n_rate;
    List<PatientConsultationChargesDto> lstConstCharges;
    
    @Transient
    private BigInteger hallTypeId;
    
	public BigInteger getHallTypeId() {
		return hallTypeId;
	}
	public void setHallTypeId(BigInteger hallTypeId) {
		this.hallTypeId = hallTypeId;
	}
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
	public int getDepId() {
		return depId;
	}
	public void setDepId(int depId) {
		this.depId = depId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getServiceId() {
		return serviceId;
	}
	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}
	public int getChargesSlaveId() {
		return chargesSlaveId;
	}
	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}
	public String getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}
	public int getN_doctor_id() {
		return n_doctor_id;
	}
	public void setN_doctor_id(int n_doctor_id) {
		this.n_doctor_id = n_doctor_id;
	}
	public int getN_sub_service_id() {
		return n_sub_service_id;
	}
	public void setN_sub_service_id(int n_sub_service_id) {
		this.n_sub_service_id = n_sub_service_id;
	}
	public double getN_const_charges() {
		return n_const_charges;
	}
	public void setN_const_charges(double n_const_charges) {
		this.n_const_charges = n_const_charges;
	}
	public int getN_quantity() {
		return n_quantity;
	}
	public void setN_quantity(int n_quantity) {
		this.n_quantity = n_quantity;
	}
	public double getN_amount() {
		return n_amount;
	}
	public void setN_amount(double n_amount) {
		this.n_amount = n_amount;
	}
	public double getN_other_amount() {
		return n_other_amount;
	}
	public void setN_other_amount(double n_other_amount) {
		this.n_other_amount = n_other_amount;
	}
	public double getN_other_rate() {
		return n_other_rate;
	}
	public void setN_other_rate(double n_other_rate) {
		this.n_other_rate = n_other_rate;
	}
	public double getN_rate() {
		return n_rate;
	}
	public void setN_rate(double n_rate) {
		this.n_rate = n_rate;
	}
	public List<PatientConsultationChargesDto> getLstConstCharges() {
		return lstConstCharges;
	}
	public void setLstConstCharges(List<PatientConsultationChargesDto> lstConstCharges) {
		this.lstConstCharges = lstConstCharges;
	}
}
