package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ChequeRegister {

	private int ch_id;
	private String date;
	private String bank_name;
	private String chk_no;
	private String to_whome;
	private String signature;

	private List<ChequeRegister> chequeList;

	@JsonGetter("cl")
	public List<ChequeRegister> getChequeList() {
		return chequeList;
	}

	@JsonSetter("cl")
	public void setChequeList(List<ChequeRegister> chequeList) {
		this.chequeList = chequeList;
	}

	@JsonGetter("cid")
	public int getCh_id() {
		return ch_id;
	}

	@JsonSetter("cid")
	public void setCh_id(int ch_id) {
		this.ch_id = ch_id;
	}

	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}

	@JsonGetter("bn")
	public String getBank_name() {
		return bank_name;
	}

	@JsonSetter("bn")
	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	@JsonGetter("cno")
	public String getChk_no() {
		return chk_no;
	}

	@JsonSetter("cno")
	public void setChk_no(String chk_no) {
		this.chk_no = chk_no;
	}

	@JsonGetter("tw")
	public String getTo_whome() {
		return to_whome;
	}

	@JsonSetter("tw")
	public void setTo_whome(String to_whome) {
		this.to_whome = to_whome;
	}

	@JsonGetter("sg")
	public String getSignature() {
		return signature;
	}

	@JsonSetter("sg")
	public void setSignature(String signature) {
		this.signature = signature;
	}

}
