package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class EchoDetails {
		
	
	private int Treatment_ID;
	private int tID;
	private String pName;
	private String date;
	private String refBy;
	private String perBy;
	private int charges;
	private String test_results;
	private String opdIpd;
	private String status;
	private List<EchoDetails> echoDetailsList;
	
	
	@JsonGetter("pn")
	public String getpName() {
		return pName;
	}
	public void setpName(String pName) {
		this.pName = pName;
	}
	@JsonGetter("rb")
	public String getRefBy() {
		return refBy;
	}
	public void setRefBy(String refBy) {
		this.refBy = refBy;
	}
	@JsonGetter("pb")
	public String getPerBy() {
		return perBy;
	}
	public void setPerBy(String perBy) {
		this.perBy = perBy;
	}
	@JsonGetter("io")
	public String getOpdIpd() {
		return opdIpd;
	}
	public void setOpdIpd(String opdIpd) {
		this.opdIpd = opdIpd;
	}
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("echoDetailsList")
	public List<EchoDetails> getEchoDetailsList() {
		return echoDetailsList;
	}
	public void setEchoDetailsList(List<EchoDetails> echoDetailsList) {
		this.echoDetailsList = echoDetailsList;
	}
	@JsonGetter("dt")
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("ch")
	public int getCharges() {
		return charges;
	}
	public void setCharges(int charges) {
		this.charges = charges;
	}
	@JsonGetter("ts")
	public String getTest_results() {
		return test_results;
	}
	public void setTest_results(String test_results) {
		this.test_results = test_results;
	}
	@JsonGetter("tid")
	public int getTreatment_ID() {
		return Treatment_ID;
	}
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	@JsonGetter("testID")
	public int gettID() {
		return tID;
	}
	public void settID(int tID) {
		this.tID = tID;
	}
	
}
