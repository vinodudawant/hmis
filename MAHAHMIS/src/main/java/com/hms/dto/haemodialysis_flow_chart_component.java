package com.hms.dto;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class haemodialysis_flow_chart_component {

	private int cid;
	private Integer treatmentId;
	private String time;
	private String BP;
	private String BFR;
	private String AP;
	private String VP;
	private String UFR;
	private String Heparen;

	private List<haemodialysis_flow_chart_component> haemodialysis_flow_chart_componentList = new ArrayList<haemodialysis_flow_chart_component>();

	@JsonGetter("cid")
	public int getCid() {
		return cid;
	}

	@JsonSetter("cid")
	public void setCid(int cid) {
		this.cid = cid;
	}

	@JsonGetter("tretId")
	public Integer getTreatmentId() {
		return treatmentId;
	}

	@JsonSetter("tretId")
	public void setTreatmentId(Integer integer) {
		this.treatmentId = integer;
	}

	@JsonGetter("time")
	public String getTime() {
		return time;
	}

	@JsonSetter("time")
	public void setTime(String time) {
		this.time = time;
	}

	@JsonGetter("bp")
	public String getBP() {
		return BP;
	}

	@JsonSetter("bp")
	public void setBP(String bP) {
		BP = bP;
	}

	@JsonGetter("bfr")
	public String getBFR() {
		return BFR;
	}

	@JsonSetter("bfr")
	public void setBFR(String bFR) {
		BFR = bFR;
	}

	@JsonGetter("ap")
	public String getAP() {
		return AP;
	}

	@JsonSetter("ap")
	public void setAP(String aP) {
		AP = aP;
	}

	@JsonGetter("vp")
	public String getVP() {
		return VP;
	}

	@JsonSetter("vp")
	public void setVP(String vP) {
		VP = vP;
	}

	@JsonGetter("ufr")
	public String getUFR() {
		return UFR;
	}

	@JsonSetter("ufr")
	public void setUFR(String uFR) {
		UFR = uFR;
	}

	@JsonGetter("hep")
	public String getHeparen() {
		return Heparen;
	}

	@JsonSetter("hep")
	public void setHeparen(String heparen) {
		Heparen = heparen;
	}

	@JsonGetter("objformli")
	public List<haemodialysis_flow_chart_component> gethaemodialysis_flow_chart_componentList() {
		return haemodialysis_flow_chart_componentList;
	}

	@JsonSetter("objformli")
	public void sethaemodialysis_flow_chart_componentList(
			List<haemodialysis_flow_chart_component> haemodialysis_flow_chart_componentList) {
		this.haemodialysis_flow_chart_componentList = haemodialysis_flow_chart_componentList;
	}

}
