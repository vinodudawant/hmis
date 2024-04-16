package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;



public class HaemodialysisFlowChartMaster {

	private int masterId;
	private String treatmentId;
	private String dialyzetype;
	private String dialyzeruse;
	private String tubingtype;
	private String tubinguse;
	private String noOfHD;
	private String frequency;
	private String shift;
	private String vitalstatus;
	private String preBP;
	private String prepulse;
	private String pretemp;
	private String preWt;
	private String postBP;
	private String postpulse;
	private String posttemp;
	private String postWt;
	private String dryWt;
	private String Wtgain;
	private String target;
	private String doctornotes;
	private String startedBy;
	private String stopedBy;
	private String status;
	private String duration;
	private String date;
	private String postdrug;
	
	@JsonGetter("postdrug")
	public String getPostdrug() {
		return postdrug;
	}
	@JsonSetter("postdrug")
	public void setPostdrug(String postdrug) {
		this.postdrug = postdrug;
	}
	private List<haemodialysis_flow_chart_component> listHaemodialysisFlowChartMasterCompona;
	
	private List<HaemodialysisFlowChartMaster> haemodialysisFlowChartMasterList;
	
	@JsonGetter("listcompo")
	public List<haemodialysis_flow_chart_component> getListHaemodialysisFlowChartMasterCompona() {
		return listHaemodialysisFlowChartMasterCompona;
	}
	@JsonSetter("listcompo")
	public void setListHaemodialysisFlowChartMasterCompona(
			List<haemodialysis_flow_chart_component> haemodialysis_flow_chart_componentli) {
		this.listHaemodialysisFlowChartMasterCompona = haemodialysis_flow_chart_componentli;
	}
	
	@JsonGetter("listmaster")
	public List<HaemodialysisFlowChartMaster> getHaemodialysisFlowChartMasterList() {
		return haemodialysisFlowChartMasterList;
	}
	@JsonSetter("listmaster")
	public void setHaemodialysisFlowChartMasterList(
			List<HaemodialysisFlowChartMaster> haemodialysisFlowChartMasterList) {
		this.haemodialysisFlowChartMasterList = haemodialysisFlowChartMasterList;
	}
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("mid")
	public int getMasterId() {
		return masterId;
	}

	@JsonSetter("mid")
	public void setMasterId(int masterId) {
		this.masterId = masterId;
	}

	@JsonGetter("tid")
	public String getTreatmentId() {
		return treatmentId;
	}
	@JsonSetter("tid")
	public void setTreatmentId(String tretID) {
		this.treatmentId = tretID;
	}

	@JsonGetter("dtype")
	public String getDialyzetype() {
		return dialyzetype;
	}
	@JsonSetter("dtype")
	public void setDialyzetype(String dialyzetype) {
		this.dialyzetype = dialyzetype;
	}

	@JsonGetter("duse")
	public String getDialyzeruse() {
		return dialyzeruse;
	}
	@JsonSetter("duse")
	public void setDialyzeruse(String dialyzeruse) {
		this.dialyzeruse = dialyzeruse;
	}

	@JsonGetter("ttype")
	public String getTubingtype() {
		return tubingtype;
	}
	@JsonSetter("ttype")
	public void setTubingtype(String tubingtype) {
		this.tubingtype = tubingtype;
	}

	@JsonGetter("tuse")
	public String getTubinguse() {
		return tubinguse;
	}
	@JsonSetter("tuse")
	public void setTubinguse(String tubinguse) {
		this.tubinguse = tubinguse;
	}

	@JsonGetter("hd")
	public String getNoOfHD() {
		return noOfHD;
	}
	@JsonSetter("hd")
	public void setNoOfHD(String noOfHD) {
		this.noOfHD = noOfHD;
	}

	@JsonGetter("fre")
	public String getFrequency() {
		return frequency;
	}
	@JsonSetter("fre")
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	@JsonGetter("sh")
	public String getShift() {
		return shift;
	}
	@JsonSetter("sh")
	public void setShift(String shift) {
		this.shift = shift;
	}

	@JsonGetter("vs")
	public String getVitalstatus() {
		return vitalstatus;
	}
	@JsonSetter("vs")
	public void setVitalstatus(String vitalstatus) {
		this.vitalstatus = vitalstatus;
	}

	@JsonGetter("pbp")
	public String getPreBP() {
		return preBP;
	}
	@JsonSetter("pbp")
	public void setPreBP(String preBP) {
		this.preBP = preBP;
	}

	@JsonGetter("ppl")
	public String getPrepulse() {
		return prepulse;
	}
	@JsonSetter("ppl")
	public void setPrepulse(String prepulse) {
		this.prepulse = prepulse;
	}

	@JsonGetter("ptemp")
	public String getPretemp() {
		return pretemp;
	}
	@JsonSetter("ptemp")
	public void setPretemp(String pretemp) {
		this.pretemp = pretemp;
	}

	@JsonGetter("pwt")
	public String getPreWt() {
		return preWt;
	}
	@JsonSetter("pwt")
	public void setPreWt(String preWt) {
		this.preWt = preWt;
	}

	@JsonGetter("postBp")
	public String getPostBP() {
		return postBP;
	}

	@JsonSetter("postBp")
	public void setPostBP(String postBP) {
		this.postBP = postBP;
	}

	@JsonGetter("postp")
	public String getPostpulse() {
		return postpulse;
	}
	@JsonSetter("postp")
	public void setPostpulse(String postpulse) {
		this.postpulse = postpulse;
	}

	@JsonGetter("posttemp")
	public String getPosttemp() {
		return posttemp;
	}

	@JsonGetter("posttemp")
	public void setPosttemp(String posttemp) {
		this.posttemp = posttemp;
	}

	@JsonGetter("postwt")
	public String getPostWt() {
		return postWt;
	}

	@JsonGetter("postwt")
	public void setPostWt(String postWt) {
		this.postWt = postWt;
	}

	@JsonGetter("dryWt")
	public String getDryWt() {
		return dryWt;
	}

	@JsonSetter("drywt")
	public void setDryWt(String dryWt) {
		this.dryWt = dryWt;
	}

	@JsonGetter("wtgain")
	public String getWtgain() {
		return Wtgain;
	}

	@JsonGetter("wtgain")
	public void setWtgain(String wtgain) {
		Wtgain = wtgain;
	}

	@JsonGetter("target")
	public String getTarget() {
		return target;
	}

	@JsonSetter("target")
	public void setTarget(String target) {
		this.target = target;
	}

	@JsonGetter("dnotes")
	public String getDoctornotes() {
		return doctornotes;
	}

	@JsonSetter("dnotes")
	public void setDoctornotes(String doctornotes) {
		this.doctornotes = doctornotes;
	}

	@JsonGetter("stby")
	public String getStartedBy() {
		return startedBy;
	}

	@JsonSetter("stby")
	public void setStartedBy(String startedBy) {
		this.startedBy = startedBy;
	}

	@JsonGetter("stopby")
	public String getStopedBy() {
		return stopedBy;
	}

	@JsonSetter("stopby")
	public void setStopedBy(String stopedBy) {
		this.stopedBy = stopedBy;
	}
	@JsonGetter("dur")
	public String getDuration() {
		return duration;
	}
	@JsonSetter("dur")
	public void setDuration(String duration) {
		this.duration = duration;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	

}
