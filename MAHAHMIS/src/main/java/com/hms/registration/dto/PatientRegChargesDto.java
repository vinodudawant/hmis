package com.hms.registration.dto;

import java.util.List;

public class PatientRegChargesDto {
	
	int n_sub_serv_id_reg;
	double n_reg_charges;
	double n_confg_reg_charges;
	int n_quantity ;
	double n_amount;
	double n_other_amount;
	double n_other_rate;
	double n_rate;
	List<PatientRegChargesDto> lstRegCharges;
	
	
	public int getN_sub_serv_id_reg() {
		return n_sub_serv_id_reg;
	}
	public void setN_sub_serv_id_reg(int n_sub_serv_id_reg) {
		this.n_sub_serv_id_reg = n_sub_serv_id_reg;
	}
	public double getN_reg_charges() {
		return n_reg_charges;
	}
	public void setN_reg_charges(double n_reg_charges) {
		this.n_reg_charges = n_reg_charges;
	}
	public double getN_confg_reg_charges() {
		return n_confg_reg_charges;
	}
	public void setN_confg_reg_charges(double n_confg_reg_charges) {
		this.n_confg_reg_charges = n_confg_reg_charges;
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
	public List<PatientRegChargesDto> getLstRegCharges() {
		return lstRegCharges;
	}
	public void setLstRegCharges(List<PatientRegChargesDto> lstRegCharges) {
		this.lstRegCharges = lstRegCharges;
	}
}
