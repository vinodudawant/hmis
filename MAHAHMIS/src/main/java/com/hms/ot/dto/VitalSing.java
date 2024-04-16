package com.hms.ot.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

public class VitalSing {


	private int idvital_sing;
	private String ttime;
	private String tpulse;
	private String bps;
	private String bpd;
	private String bpm;
	private String trr;
	private String etco2;
	private String uo;
	private String fluidone;
	private String fluidtwo;
	private String infusion;
	private String bolus;
	private String event;
	private String empty;
	private String sao2;
	
	private int vitalHeadingId;
	private String vitalHeadingName;
	private List<VitalSing> listVitalHeading;
	
	@JsonGetter("listVitalHeading")
	public List<VitalSing> getListVitalHeading() {
		return listVitalHeading;
	}

	@JsonSetter("listVitalHeading")
	public void setListVitalHeading(List<VitalSing> listVitalHeading) {
		this.listVitalHeading = listVitalHeading;
	}
	
	
	@JsonGetter("vitalHeadingId")
	public int getVitalHeadingId() {
		return vitalHeadingId;
	}
	
	@JsonSetter("vitalHeadingId")
	public void setVitalHeadingId(int vitalHeadingId) {
		this.vitalHeadingId = vitalHeadingId;
	}
	
	@JsonGetter("vitalHeadingName")
	public String getVitalHeadingName() {
		return vitalHeadingName;
	}
	
	@JsonSetter("vitalHeadingName")
	public void setVitalHeadingName(String vitalHeadingName) {
		this.vitalHeadingName = vitalHeadingName;
	}

	
	@JsonGetter("empty")
	public String getEmpty() {
		return empty;
	}
	@JsonSetter("empty")
	public void setEmpty(String empty) {
		this.empty = empty;
	}
	@JsonGetter("sao2")
	public String getSao2() {
		return sao2;
	}
	@JsonSetter("sao2")
	public void setSao2(String sao2) {
		this.sao2 = sao2;
	}
	private List<VitalSing> vitalsinglist = null;
	@JsonGetter("vitallist")
	public List<VitalSing> getVitalsinglist() {
		return vitalsinglist;
	}
	@JsonSetter("vitallist")
	public void setVitalsinglist(List<VitalSing> vitalsinglist) {
		this.vitalsinglist = vitalsinglist;
	}
	@JsonGetter("idvital")
	public int getIdvital_sing() {
		return idvital_sing;
	}
	@JsonSetter("idvital")
	public void setIdvital_sing(int idvital_sing) {
		this.idvital_sing = idvital_sing;
	}
	@JsonGetter("ttime")
	public String getTtime() {
		return ttime;
	}
	@JsonSetter("ttime")
	public void setTtime(String ttime) {
		this.ttime = ttime;
	}
	@JsonGetter("tpulse")
	public String getTpulse() {
		return tpulse;
	}
	@JsonSetter("tpulse")
	public void setTpulse(String tpulse) {
		this.tpulse = tpulse;
	}
	@JsonGetter("bps")
	public String getBps() {
		return bps;
	}
	@JsonSetter("bps")
	public void setBps(String bps) {
		this.bps = bps;
	}
	@JsonGetter("bpd")
	public String getBpd() {
		return bpd;
	}
	@JsonSetter("bpd")
	public void setBpd(String bpd) {
		this.bpd = bpd;
	}
	@JsonGetter("bpm")
	public String getBpm() {
		return bpm;
	}
	@JsonSetter("bpm")
	public void setBpm(String bpm) {
		this.bpm = bpm;
	}
	@JsonGetter("trr")
	public String getTrr() {
		return trr;
	}
	@JsonSetter("trr")
	public void setTrr(String trr) {
		this.trr = trr;
	}
	@JsonGetter("etco2")
	public String getEtco2() {
		return etco2;
	}
	@JsonSetter("etco2")
	public void setEtco2(String etco2) {
		this.etco2 = etco2;
	}
	@JsonGetter("uo")
	public String getUo() {
		return uo;
	}
	@JsonSetter("uo")
	public void setUo(String uo) {
		this.uo = uo;
	}
	@JsonGetter("fluone")
	public String getFluidone() {
		return fluidone;
	}
	@JsonSetter("fluone")
	public void setFluidone(String fluidone) {
		this.fluidone = fluidone;
	}
	@JsonGetter("flutwo")
	public String getFluidtwo() {
		return fluidtwo;
	}
	@JsonSetter("flutwo")
	public void setFluidtwo(String fluidtwo) {
		this.fluidtwo = fluidtwo;
	}
	@JsonGetter("infuse")
	public String getInfusion() {
		return infusion;
	}
	@JsonSetter("infuse")
	public void setInfusion(String infusion) {
		this.infusion = infusion;
	}
	@JsonGetter("bolus")
	public String getBolus() {
		return bolus;
	}
	@JsonSetter("bolus")
	public void setBolus(String bolus) {
		this.bolus = bolus;
	}
	@JsonGetter("event")
	public String getEvent() {
		return event;
	}
	@JsonSetter("event")
	public void setEvent(String event) {
		this.event = event;
	}

}
