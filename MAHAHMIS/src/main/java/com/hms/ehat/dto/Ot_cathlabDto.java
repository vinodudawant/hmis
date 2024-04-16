package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Transient;

public class Ot_cathlabDto {




	private String procedurename;
	private Integer count;
	private Long procedureamt;
	private Long discount;
	

	private Integer treatment_id;
	
	private Long credit;

	private Long debit;
	
	private Long netamt;
	
	private Long advance;
	private Long recdbill;
	private Long balbill;
	private Long dues;
	private Long duesamt;
	private Long amt;
	
    public Long getDuesamt() {
		return duesamt;
	}

	public void setDuesamt(Long duesamt) {
		this.duesamt = duesamt;
	}

	public String getProcedurename() {
		return procedurename;
	}

	public void setProcedurename(String procedurename) {
		this.procedurename = procedurename;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Long getProcedureamt() {
		return procedureamt;
	}

	public void setProcedureamt(Long procedureamt) {
		this.procedureamt = procedureamt;
	}

	public Long getDiscount() {
		return discount;
	}

	public void setDiscount(Long discount) {
		this.discount = discount;
	}

	public Integer getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(Integer treatment_id) {
		this.treatment_id = treatment_id;
	}

	public Long getCredit() {
		return credit;
	}

	public void setCredit(Long credit) {
		this.credit = credit;
	}

	public Long getDebit() {
		return debit;
	}

	public void setDebit(Long debit) {
		this.debit = debit;
	}

	public Long getNetamt() {
		return netamt;
	}

	public void setNetamt(Long netamt) {
		this.netamt = netamt;
	}

	public Long getAdvance() {
		return advance;
	}

	public void setAdvance(Long advance) {
		this.advance = advance;
	}

	public Long getRecdbill() {
		return recdbill;
	}

	public void setRecdbill(Long recdbill) {
		this.recdbill = recdbill;
	}

	public Long getBalbill() {
		return balbill;
	}

	public void setBalbill(Long balbill) {
		this.balbill = balbill;
	}

	public Long getDues() {
		return dues;
	}

	public void setDues(Long dues) {
		this.dues = dues;
	}

	public Long getAmt() {
		return amt;
	}

	public void setAmt(Long amt) {
		this.amt = amt;
	}

	public List<Ot_cathlabDto> getListdetails() {
		return listdetails;
	}

	private List<Ot_cathlabDto> listdetails;

	public void setListdetails(List<Ot_cathlabDto> listdetails) {
		this.listdetails = listdetails;
	}
    
    
    
}

