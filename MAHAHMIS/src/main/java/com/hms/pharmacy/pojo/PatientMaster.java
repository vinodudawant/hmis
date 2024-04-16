package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_patient_master")
public class PatientMaster implements Serializable
{
	@Id
	@GeneratedValue
	@Column(name = "pat_id")
	private Integer patId;

	@Column(name = "pat_code")
	private String patCode;

	@Column(name = "pat_name")
	private String patName;

	@Column(name = "pat_address")
	private String patAddress;

	@Column(name = "pat_phone")
	private String patPhone;

	@Column(name = "pat_mobile")
	private String patMobile;

	@Column(name = "pat_email")
	private String patEmail;

	@Column(name = "pat_DOB")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date patDOB;

	@Column(name = "pat_opening_debit")
	private Float patOpeningDebit;

	public Float getPatOpeningDebit() {
		return patOpeningDebit;
	}

	public void setPatOpeningDebit(Float patOpeningDebit) {
		this.patOpeningDebit = patOpeningDebit;
	}

	public Float getPatOpeningCredit() {
		return patOpeningCredit;
	}

	public void setPatOpeningCredit(Float patOpeningCredit) {
		this.patOpeningCredit = patOpeningCredit;
	}

	@Column(name = "pat_opening_credit")
	private Float patOpeningCredit;

	@Column(name = "pat_delete_flag")
	private Integer patDeleteFlag;

	@Column(name = "pat_update_date")
	private Date patUpdateDate;

	@Column(name = "pat_add_date")
	private Date patAddDate;
	
	public Date getPatAddDate() {
		return patAddDate;
	}

	public void setPatAddDate(Date patAddDate) {
		this.patAddDate = patAddDate;
	}

	public Integer getPatId() {
		return patId;
	}

	public void setPatId(Integer patId) {
		this.patId = patId;
	}

	public String getPatCode() {
		return patCode;
	}

	public void setPatCode(String patCode) {
		this.patCode = patCode;
	}

	public String getPatName() {
		return patName;
	}

	public void setPatName(String patName) {
		this.patName = patName;
	}

	public String getPatAddress() {
		return patAddress;
	}

	public void setPatAddress(String patAddress) {
		this.patAddress = patAddress;
	}

	public String getPatPhone() {
		return patPhone;
	}

	public void setPatPhone(String patPhone) {
		this.patPhone = patPhone;
	}

	public String getPatMobile() {
		return patMobile;
	}

	public void setPatMobile(String patMobile) {
		this.patMobile = patMobile;
	}

	public String getPatEmail() {
		return patEmail;
	}

	public void setPatEmail(String patEmail) {
		this.patEmail = patEmail;
	}

	public Date getPatDOB() {
		return patDOB;
	}

	public void setPatDOB(Date patDOB) {
		this.patDOB = patDOB;
	}

	

	public Integer getPatDeleteFlag() {
		return patDeleteFlag;
	}

	public void setPatDeleteFlag(Integer patDeleteFlag) {
		this.patDeleteFlag = patDeleteFlag;
	}

	public Date getPatUpdateDate() {
		return patUpdateDate;
	}

	public void setPatUpdateDate(Date patUpdateDate) {
		this.patUpdateDate = patUpdateDate;
	}

	
}
