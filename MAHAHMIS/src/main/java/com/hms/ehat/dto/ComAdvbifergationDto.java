package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ehat_common_advance_bifergation")
public class ComAdvbifergationDto {
	@Id
	@GeneratedValue
	@Column(name = "cadv_bifergation_id")
	private int cdbifergationid;

	@Column(name = "common_adv_id")
	private int cadvid;
	
	@Column(name = "receipt_id")
	private int receipt_id=0;

	@Column(name = "amount")
	private double amount;
	
	@Column(name = "bifergation_flag")
	String bifergation_flag="N";
	@Transient
	private List<ComAdvbifergationDto> lstComAdvbifergation;
	public int getCdbifergationid() {
		return cdbifergationid;
	}
	public void setCdbifergationid(int cdbifergationid) {
		this.cdbifergationid = cdbifergationid;
	}
	public int getCadvid() {
		return cadvid;
	}
	public void setCadvid(int cadvid) {
		this.cadvid = cadvid;
	}
	public int getReceipt_id() {
		return receipt_id;
	}
	public void setReceipt_id(int receipt_id) {
		this.receipt_id = receipt_id;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getBifergation_flag() {
		return bifergation_flag;
	}
	public void setBifergation_flag(String bifergation_flag) {
		this.bifergation_flag = bifergation_flag;
	}
	public List<ComAdvbifergationDto> getLstComAdvbifergation() {
		return lstComAdvbifergation;
	}
	public void setLstComAdvbifergation(
			List<ComAdvbifergationDto> lstComAdvbifergation) {
		this.lstComAdvbifergation = lstComAdvbifergation;
	}
	
	
	
}
