package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class MLCDetail {

	private int idmlc_details;
	private String fir_no;
	private String mlc_no;
	private String police_st_name;
	private String police_st_add;
	private String authority_name;
	private String buccle_no;
	private String incidentDetails;

	private String mlcDate;
	private String mlcInformerTitle;
	private String mlcInformerFirstName;
	private String mlcInformerLastName;
	private String mlcInformerSex;
	private String mlcInformerMobile;
	private String mlcInformerEmail;
	private String mlcInformerAge;
	private String mlcInformerRelation;
	private String mlcInformerAddress;
	private int mlcCmoDoctor;

	private List<MLCDetail> listMlcDetals;

	@JsonGetter("mlcDt")
	public String getMlcDate() {
		return mlcDate;
	}
	@JsonSetter("mlcDt")
	public void setMlcDate(String mlcDate) {
		this.mlcDate = mlcDate;
	}

	@JsonGetter("inftl")
	public String getMlcInformerTitle() {
		return mlcInformerTitle;
	}
	@JsonSetter("inftl")
	public void setMlcInformerTitle(String mlcInformerTitle) {
		this.mlcInformerTitle = mlcInformerTitle;
	}

	@JsonGetter("infnm")
	public String getMlcInformerFirstName() {
		return mlcInformerFirstName;
	}
	@JsonSetter("infnm")
	public void setMlcInformerFirstName(String mlcInformerFirstName) {
		this.mlcInformerFirstName = mlcInformerFirstName;
	}

	@JsonGetter("inlnm")
	public String getMlcInformerLastName() {
		return mlcInformerLastName;
	}
	@JsonSetter("inlnm")
	public void setMlcInformerLastName(String mlcInformerLastName) {
		this.mlcInformerLastName = mlcInformerLastName;
	}

	@JsonGetter("insx")
	public String getMlcInformerSex() {
		return mlcInformerSex;
	}
	@JsonSetter("insx")
	public void setMlcInformerSex(String mlcInformerSex) {
		this.mlcInformerSex = mlcInformerSex;
	}

	@JsonGetter("inMb")
	public String getMlcInformerMobile() {
		return mlcInformerMobile;
	}
	@JsonSetter("inMb")
	public void setMlcInformerMobile(String mlcInformerMobile) {
		this.mlcInformerMobile = mlcInformerMobile;
	}

	@JsonGetter("inEml")
	public String getMlcInformerEmail() {
		return mlcInformerEmail;
	}
	@JsonSetter("inEml")
	public void setMlcInformerEmail(String mlcInformerEmail) {
		this.mlcInformerEmail = mlcInformerEmail;
	}

	@JsonGetter("inage")
	public String getMlcInformerAge() {
		return mlcInformerAge;
	}
	@JsonSetter("inage")
	public void setMlcInformerAge(String mlcInformerAge) {
		this.mlcInformerAge = mlcInformerAge;
	}

	@JsonGetter("inrel")
	public String getMlcInformerRelation() {
		return mlcInformerRelation;
	}
	@JsonSetter("inrel")
	public void setMlcInformerRelation(String mlcInformerRelation) {
		this.mlcInformerRelation = mlcInformerRelation;
	}

	@JsonGetter("inadd")
	public String getMlcInformerAddress() {
		return mlcInformerAddress;
	}
	@JsonSetter("inadd")
	public void setMlcInformerAddress(String mlcInformerAddress) {
		this.mlcInformerAddress = mlcInformerAddress;
	}

	@JsonGetter("mlcdoc")
	public int getMlcCmoDoctor() {
		return mlcCmoDoctor;
	}
	@JsonSetter("mlcdoc")
	public void setMlcCmoDoctor(int mlcCmoDoctor) {
		this.mlcCmoDoctor = mlcCmoDoctor;
	}

	@JsonGetter("incd")
	public String getIncidentDetails() {
		return incidentDetails;
	}
	@JsonSetter("incd")
	public void setIncidentDetails(String incidentDetails) {
		this.incidentDetails = incidentDetails;
	}

	@JsonGetter("mlcid")
	public int getIdmlc_details() {
		return idmlc_details;
	}
	@JsonSetter("mlcid")
	public void setIdmlc_details(int idmlc_details) {
		this.idmlc_details = idmlc_details;
	}

	@JsonGetter("firNo")
	public String getFir_no() {
		return fir_no;
	}
	@JsonSetter("firNo")
	public void setFir_no(String fir_no) {
		this.fir_no = fir_no;
	}

	@JsonGetter("Pnm")
	public String getPolice_st_name() {
		return police_st_name;
	}
	@JsonSetter("Pnm")
	public void setPolice_st_name(String police_st_name) {
		this.police_st_name = police_st_name;
	}

	@JsonGetter("padd")
	public String getPolice_st_add() {
		return police_st_add;
	}
	@JsonSetter("padd")
	public void setPolice_st_add(String police_st_add) {
		this.police_st_add = police_st_add;
	}
	@JsonGetter("Anm")
	public String getAuthority_name() {
		return authority_name;
	}
	@JsonSetter("Anm")
	public void setAuthority_name(String authority_name) {
		this.authority_name = authority_name;
	}

	@JsonGetter("Bno")
	public String getBuccle_no() {
		return buccle_no;
	}
	@JsonSetter("Bno")
	public void setBuccle_no(String buccle_no) {
		this.buccle_no = buccle_no;
	}

	@JsonGetter("limlc")
	public List<MLCDetail> getListMlcDetals() {
		return listMlcDetals;
	}
	@JsonSetter("limlc")
	public void setListMlcDetals(List<MLCDetail> listMlcDetals) {
		this.listMlcDetals = listMlcDetals;
	}
	@JsonGetter("mlcno")
	public String getMlc_no() {
		return mlc_no;
	}
	@JsonSetter("mlcno")
	public void setMlc_no(String mlc_no) {
		this.mlc_no = mlc_no;
	}

}
