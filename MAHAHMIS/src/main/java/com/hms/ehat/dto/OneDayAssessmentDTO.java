package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


@Entity
@Table(name = "ehat_nursing_assessment_one_day")
public class OneDayAssessmentDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name ="idnursing_assessment_one_day")
	private int idnursing_assessment_one_day;
	
	@Column(name = "patient_id")
	private int pId;
	
	@Column(name = "treatment_id")
	private int tId;
	
	@Column(name = "date_1")
	private String date1; 

	@Column(name = "time_1")
	private String time1;

	@Column(name = "id_band")
	private String chkIdBandOneDay; 

	@Column(name = "call_bell")
	private String chkCallBell;

	@Column(name = "ht")
	private String txtHt;

	@Column(name = "wt")
	private String txtWt; 

	@Column(name = "mode")
	private String modeOneDay; 

	@Column(name = "admitted")
	private String admittedOneDay; 

	@Column(name = "information")
	private String infromationOneDay; 

	@Column(name = "emergency_call")
	private String txtAreaEmergencyCallOneDay; 

	@Column(name = "temprature")
	private String tempratureOneDay;

	@Column(name = "pulse")
	private String pulseOneDay; 

	@Column(name = "rr")
	private String rROneDay; 

	@Column(name = "spo2")
	private String spO2OneDay; 

	@Column(name = "blood_preassure")
	private String bloodpOneDay; 

	@Column(name = "admitting_one_day")
	private String txtAdmittingOneDay; 

	@Column(name = "chief_complain")
	private String txtCheifComplainOneDay; 

	@Column(name = "allergies")
	private String allergiesOneDay; 

	@Column(name = "cate1")
	private String cateOneDay1; 

	@Column(name = "care1")
	private String careOneDay1;

	@Column(name = "cate2")
	private String cateOneDay2; 

	@Column(name = "care2")
	private String careOneDay2; 

	@Column(name = "cate3")
	private String cateOneDay3; 

	@Column(name = "care3")
	private String careOneDay3; 

	@Column(name = "cate4")
	private String cateOneDay4; 

	@Column(name = "care4")
	private String careOneDay4; 

	@Column(name = "cate5")
	private String cateOneDay5; 

	@Column(name = "care5")
	private String careOneDay5; 

	@Column(name = "infilteration2")
	private String infiltration02OneDay; 

	@Column(name = "infilteration3")
	private String infiltration03OneDay; 

	@Column(name = "infilteration4")
	private String infiltration04OneDay; 

	@Column(name = "infilteration5")
	private String infiltration05OneDay; 

	@Column(name = "infilteration6")
	private String infiltration06OneDay; 

	@Column(name = "swelling1")
	private String swelling01OneDay; 

	@Column(name = "swelling2")
	private String swelling02OneDay; 

	@Column(name = "swelling3")
	private String swelling03OneDay; 

	@Column(name = "swelling4")
	private String swelling04OneDay; 

	@Column(name = "swelling5")
	private String swelling05OneDay; 

	@Column(name = "swelling6")
	private String swelling06OneDay; 

	@Column(name = "redness1")
	private String redness01OneDay; 

	@Column(name = "redness2")
	private String redness02OneDay; 

	@Column(name = "redness3")
	private String  redness03OneDay; 

	@Column(name = "redness4")
	private String redness04OneDay; 

	@Column(name = "redness5")
	private String redness05OneDay; 

	@Column(name = "redness6")
	private String redness06OneDay; 

	@Column(name = "pain1")
	private String pain01OneDay; 

	@Column(name = "pain2")
	private String pain02OneDay; 

	@Column(name = "pain3")
	private String pain03OneDay; 

	@Column(name = "pain4")
	private String pain04OneDay; 

	@Column(name = "pain5")
	private String pain05OneDay; 

	@Column(name = "pain6")
	private String pain06OneDay; 

	@Column(name = "thrombophlebitis1")
	private String thrombophlebitis1OneDay; 

	@Column(name = "thrombophlebitis2")
	private String thrombophlebitis2OneDay; 

	@Column(name = "thrombophlebitis3")
	private String thrombophlebitis3OneDay; 

	@Column(name = "vulnerability")
	private String vulnerabilityLevelOneDay; 

	@Column(name = "date_iv")
	private String datePickForIvAssessmentOneDay; 

	@Column(name = "guage")
	private String guageOneDay; 

	@Column(name = "venflon")
	private String venflonOneDay; 

	@Column(name = "change_on")
	private String changeOnOneDay; 

	@Column(name = "site")
	private String siteOneDay; 

	@Column(name = "time01")
	private String time01OneDay; 

	@Column(name = "time02")
	private String time02OneDay; 

	@Column(name = "time03")
	private String time03OneDay; 

	@Column(name = "infiltration1")
	private String infiltration01OneDay; 

	@Column(name = "thrombophlebitis4")
	private String thrombophlebitis4OneDay; 

	@Column(name = "thrombophlebitis5")
	private String thrombophlebitis5OneDay; 

	@Column(name = "thrombophlebitis6")
	private String thrombophlebitis6OneDay; 

	@Column(name = "pain_scale")
	private String idPainScaleOneDay; 

/*	@Column(name = "time001")
	private String time001OneDay; 

	@Column(name = "time002")
	private String time002OneDay;

	@Column(name = "time003")
	private String time003OneDay; 

	@Column(name = "time004")
	private String time004OneDay; */

	/*@Column(name = "temprature1")
	private String temp001OneDay; 

	@Column(name = "temprature2")
	private String temp002OneDay; 

	@Column(name = "temprature3")
	private String temp003OneDay; 

	@Column(name = "temprature4")
	private String temp004OneDay; */

	/*@Column(name = "pulse001")
	private String pulse001OneDay; 

	@Column(name = "pulse002")
	private String pulse002OneDay; 

	@Column(name = "pulse003")
	private String pulse003OneDay; 

	@Column(name = "pulse004")
	private String pulse004OneDay; */

	/*@Column(name = "rr001")
	private String rR001OneDay; 

	@Column(name = "rr002")
	private String rR002OneDay; 

	@Column(name = "rr003")
	private String rR003OneDay; 

	@Column(name = "rr004")
	private String rR004OneDay; */

	/*@Column(name = "bp001")
	private String bP001OneDay; 

	@Column(name = "bp002")
	private String bP002OneDay; 

	@Column(name = "bp003")
	private String bP003OneDay; 

	@Column(name = "bp004")
	private String bP004OneDay; */

	/*@Column(name = "pain001")
	private String pain001OneDay; 

	@Column(name = "pain002")
	private String pain002OneDay; 

	@Column(name = "pain003")
	private String pain003OneDay; 

	@Column(name = "pain004")
	private String pain004OneDay; */

	
	
	@Transient
	private String otData;  
	
	public String getOtData() {
		return otData;
	}

	public void setOtData(String otData) {
		this.otData = otData;
	}

	public List<OutputDTO> getoTList() {
		return oTList;
	}

	public void setoTList(List<OutputDTO> oTList) {
		this.oTList = oTList;
	}

	@Transient
	private List<OutputDTO> oTList; 
	


	public int getIdnursing_assessment_one_day() {
		return idnursing_assessment_one_day;
	}

	public void setIdnursing_assessment_one_day(int idnursing_assessment_one_day) {
		this.idnursing_assessment_one_day = idnursing_assessment_one_day;
	}

	public int getpId() {
		return pId;
	}

	public void setpId(int pId) {
		this.pId = pId;
	}

	public int gettId() {
		return tId;
	}

	public void settId(int tId) {
		this.tId = tId;
	}

	public String getDate1() {
		return date1;
	}

	public void setDate1(String date1) {
		this.date1 = date1;
	}

	public String getTime1() {
		return time1;
	}

	public void setTime1(String time1) {
		this.time1 = time1;
	}

	public String getChkIdBandOneDay() {
		return chkIdBandOneDay;
	}

	public void setChkIdBandOneDay(String chkIdBandOneDay) {
		this.chkIdBandOneDay = chkIdBandOneDay;
	}

	public String getChkCallBell() {
		return chkCallBell;
	}

	public void setChkCallBell(String chkCallBell) {
		this.chkCallBell = chkCallBell;
	}

	public String getTxtHt() {
		return txtHt;
	}

	public void setTxtHt(String txtHt) {
		this.txtHt = txtHt;
	}

	public String getTxtWt() {
		return txtWt;
	}

	public void setTxtWt(String txtWt) {
		this.txtWt = txtWt;
	}

	public String getModeOneDay() {
		return modeOneDay;
	}

	public void setModeOneDay(String modeOneDay) {
		this.modeOneDay = modeOneDay;
	}

	public String getAdmittedOneDay() {
		return admittedOneDay;
	}

	public void setAdmittedOneDay(String admittedOneDay) {
		this.admittedOneDay = admittedOneDay;
	}

	public String getInfromationOneDay() {
		return infromationOneDay;
	}

	public void setInfromationOneDay(String infromationOneDay) {
		this.infromationOneDay = infromationOneDay;
	}

	public String getTxtAreaEmergencyCallOneDay() {
		return txtAreaEmergencyCallOneDay;
	}

	public void setTxtAreaEmergencyCallOneDay(String txtAreaEmergencyCallOneDay) {
		this.txtAreaEmergencyCallOneDay = txtAreaEmergencyCallOneDay;
	}

	public String getTempratureOneDay() {
		return tempratureOneDay;
	}

	public void setTempratureOneDay(String tempratureOneDay) {
		this.tempratureOneDay = tempratureOneDay;
	}

	public String getPulseOneDay() {
		return pulseOneDay;
	}

	public void setPulseOneDay(String pulseOneDay) {
		this.pulseOneDay = pulseOneDay;
	}

	public String getrROneDay() {
		return rROneDay;
	}

	public void setrROneDay(String rROneDay) {
		this.rROneDay = rROneDay;
	}

	public String getSpO2OneDay() {
		return spO2OneDay;
	}

	public void setSpO2OneDay(String spO2OneDay) {
		this.spO2OneDay = spO2OneDay;
	}

	public String getBloodpOneDay() {
		return bloodpOneDay;
	}

	public void setBloodpOneDay(String bloodpOneDay) {
		this.bloodpOneDay = bloodpOneDay;
	}

	public String getTxtAdmittingOneDay() {
		return txtAdmittingOneDay;
	}

	public void setTxtAdmittingOneDay(String txtAdmittingOneDay) {
		this.txtAdmittingOneDay = txtAdmittingOneDay;
	}

	public String getTxtCheifComplainOneDay() {
		return txtCheifComplainOneDay;
	}

	public void setTxtCheifComplainOneDay(String txtCheifComplainOneDay) {
		this.txtCheifComplainOneDay = txtCheifComplainOneDay;
	}

	public String getAllergiesOneDay() {
		return allergiesOneDay;
	}

	public void setAllergiesOneDay(String allergiesOneDay) {
		this.allergiesOneDay = allergiesOneDay;
	}

	public String getCateOneDay1() {
		return cateOneDay1;
	}

	public void setCateOneDay1(String cateOneDay1) {
		this.cateOneDay1 = cateOneDay1;
	}

	public String getCareOneDay1() {
		return careOneDay1;
	}

	public void setCareOneDay1(String careOneDay1) {
		this.careOneDay1 = careOneDay1;
	}

	public String getCateOneDay2() {
		return cateOneDay2;
	}

	public void setCateOneDay2(String cateOneDay2) {
		this.cateOneDay2 = cateOneDay2;
	}

	public String getCareOneDay2() {
		return careOneDay2;
	}

	public void setCareOneDay2(String careOneDay2) {
		this.careOneDay2 = careOneDay2;
	}

	public String getCateOneDay3() {
		return cateOneDay3;
	}

	public void setCateOneDay3(String cateOneDay3) {
		this.cateOneDay3 = cateOneDay3;
	}

	public String getCareOneDay3() {
		return careOneDay3;
	}

	public void setCareOneDay3(String careOneDay3) {
		this.careOneDay3 = careOneDay3;
	}

	public String getCateOneDay4() {
		return cateOneDay4;
	}

	public void setCateOneDay4(String cateOneDay4) {
		this.cateOneDay4 = cateOneDay4;
	}

	public String getCareOneDay4() {
		return careOneDay4;
	}

	public void setCareOneDay4(String careOneDay4) {
		this.careOneDay4 = careOneDay4;
	}

	public String getCateOneDay5() {
		return cateOneDay5;
	}

	public void setCateOneDay5(String cateOneDay5) {
		this.cateOneDay5 = cateOneDay5;
	}

	public String getCareOneDay5() {
		return careOneDay5;
	}

	public void setCareOneDay5(String careOneDay5) {
		this.careOneDay5 = careOneDay5;
	}

	public String getInfiltration02OneDay() {
		return infiltration02OneDay;
	}

	public void setInfiltration02OneDay(String infiltration02OneDay) {
		this.infiltration02OneDay = infiltration02OneDay;
	}

	public String getInfiltration03OneDay() {
		return infiltration03OneDay;
	}

	public void setInfiltration03OneDay(String infiltration03OneDay) {
		this.infiltration03OneDay = infiltration03OneDay;
	}

	public String getInfiltration04OneDay() {
		return infiltration04OneDay;
	}

	public void setInfiltration04OneDay(String infiltration04OneDay) {
		this.infiltration04OneDay = infiltration04OneDay;
	}

	public String getInfiltration05OneDay() {
		return infiltration05OneDay;
	}

	public void setInfiltration05OneDay(String infiltration05OneDay) {
		this.infiltration05OneDay = infiltration05OneDay;
	}

	public String getInfiltration06OneDay() {
		return infiltration06OneDay;
	}

	public void setInfiltration06OneDay(String infiltration06OneDay) {
		this.infiltration06OneDay = infiltration06OneDay;
	}

	public String getSwelling01OneDay() {
		return swelling01OneDay;
	}

	public void setSwelling01OneDay(String swelling01OneDay) {
		this.swelling01OneDay = swelling01OneDay;
	}

	public String getSwelling02OneDay() {
		return swelling02OneDay;
	}

	public void setSwelling02OneDay(String swelling02OneDay) {
		this.swelling02OneDay = swelling02OneDay;
	}

	public String getSwelling03OneDay() {
		return swelling03OneDay;
	}

	public void setSwelling03OneDay(String swelling03OneDay) {
		this.swelling03OneDay = swelling03OneDay;
	}

	public String getSwelling04OneDay() {
		return swelling04OneDay;
	}

	public void setSwelling04OneDay(String swelling04OneDay) {
		this.swelling04OneDay = swelling04OneDay;
	}

	public String getSwelling05OneDay() {
		return swelling05OneDay;
	}

	public void setSwelling05OneDay(String swelling05OneDay) {
		this.swelling05OneDay = swelling05OneDay;
	}

	public String getSwelling06OneDay() {
		return swelling06OneDay;
	}

	public void setSwelling06OneDay(String swelling06OneDay) {
		this.swelling06OneDay = swelling06OneDay;
	}

	public String getRedness01OneDay() {
		return redness01OneDay;
	}

	public void setRedness01OneDay(String redness01OneDay) {
		this.redness01OneDay = redness01OneDay;
	}

	public String getRedness02OneDay() {
		return redness02OneDay;
	}

	public void setRedness02OneDay(String redness02OneDay) {
		this.redness02OneDay = redness02OneDay;
	}

	public String getRedness03OneDay() {
		return redness03OneDay;
	}

	public void setRedness03OneDay(String redness03OneDay) {
		this.redness03OneDay = redness03OneDay;
	}

	public String getRedness04OneDay() {
		return redness04OneDay;
	}

	public void setRedness04OneDay(String redness04OneDay) {
		this.redness04OneDay = redness04OneDay;
	}

	public String getRedness05OneDay() {
		return redness05OneDay;
	}

	public void setRedness05OneDay(String redness05OneDay) {
		this.redness05OneDay = redness05OneDay;
	}

	public String getRedness06OneDay() {
		return redness06OneDay;
	}

	public void setRedness06OneDay(String redness06OneDay) {
		this.redness06OneDay = redness06OneDay;
	}

	public String getPain01OneDay() {
		return pain01OneDay;
	}

	public void setPain01OneDay(String pain01OneDay) {
		this.pain01OneDay = pain01OneDay;
	}

	public String getPain02OneDay() {
		return pain02OneDay;
	}

	public void setPain02OneDay(String pain02OneDay) {
		this.pain02OneDay = pain02OneDay;
	}

	public String getPain03OneDay() {
		return pain03OneDay;
	}

	public void setPain03OneDay(String pain03OneDay) {
		this.pain03OneDay = pain03OneDay;
	}

	public String getPain04OneDay() {
		return pain04OneDay;
	}

	public void setPain04OneDay(String pain04OneDay) {
		this.pain04OneDay = pain04OneDay;
	}

	public String getPain05OneDay() {
		return pain05OneDay;
	}

	public void setPain05OneDay(String pain05OneDay) {
		this.pain05OneDay = pain05OneDay;
	}

	public String getPain06OneDay() {
		return pain06OneDay;
	}

	public void setPain06OneDay(String pain06OneDay) {
		this.pain06OneDay = pain06OneDay;
	}

	public String getThrombophlebitis1OneDay() {
		return thrombophlebitis1OneDay;
	}

	public void setThrombophlebitis1OneDay(String thrombophlebitis1OneDay) {
		this.thrombophlebitis1OneDay = thrombophlebitis1OneDay;
	}

	public String getThrombophlebitis2OneDay() {
		return thrombophlebitis2OneDay;
	}

	public void setThrombophlebitis2OneDay(String thrombophlebitis2OneDay) {
		this.thrombophlebitis2OneDay = thrombophlebitis2OneDay;
	}

	public String getThrombophlebitis3OneDay() {
		return thrombophlebitis3OneDay;
	}

	public void setThrombophlebitis3OneDay(String thrombophlebitis3OneDay) {
		this.thrombophlebitis3OneDay = thrombophlebitis3OneDay;
	}

	public String getVulnerabilityLevelOneDay() {
		return vulnerabilityLevelOneDay;
	}

	public void setVulnerabilityLevelOneDay(String vulnerabilityLevelOneDay) {
		this.vulnerabilityLevelOneDay = vulnerabilityLevelOneDay;
	}

	public String getDatePickForIvAssessmentOneDay() {
		return datePickForIvAssessmentOneDay;
	}

	public void setDatePickForIvAssessmentOneDay(
			String datePickForIvAssessmentOneDay) {
		this.datePickForIvAssessmentOneDay = datePickForIvAssessmentOneDay;
	}

	public String getGuageOneDay() {
		return guageOneDay;
	}

	public void setGuageOneDay(String guageOneDay) {
		this.guageOneDay = guageOneDay;
	}

	public String getVenflonOneDay() {
		return venflonOneDay;
	}

	public void setVenflonOneDay(String venflonOneDay) {
		this.venflonOneDay = venflonOneDay;
	}

	public String getChangeOnOneDay() {
		return changeOnOneDay;
	}

	public void setChangeOnOneDay(String changeOnOneDay) {
		this.changeOnOneDay = changeOnOneDay;
	}

	public String getSiteOneDay() {
		return siteOneDay;
	}

	public void setSiteOneDay(String siteOneDay) {
		this.siteOneDay = siteOneDay;
	}

	public String getTime01OneDay() {
		return time01OneDay;
	}

	public void setTime01OneDay(String time01OneDay) {
		this.time01OneDay = time01OneDay;
	}

	public String getTime02OneDay() {
		return time02OneDay;
	}

	public void setTime02OneDay(String time02OneDay) {
		this.time02OneDay = time02OneDay;
	}

	public String getTime03OneDay() {
		return time03OneDay;
	}

	public void setTime03OneDay(String time03OneDay) {
		this.time03OneDay = time03OneDay;
	}

	public String getInfiltration01OneDay() {
		return infiltration01OneDay;
	}

	public void setInfiltration01OneDay(String infiltration01OneDay) {
		this.infiltration01OneDay = infiltration01OneDay;
	}

	public String getThrombophlebitis4OneDay() {
		return thrombophlebitis4OneDay;
	}

	public void setThrombophlebitis4OneDay(String thrombophlebitis4OneDay) {
		this.thrombophlebitis4OneDay = thrombophlebitis4OneDay;
	}

	public String getThrombophlebitis5OneDay() {
		return thrombophlebitis5OneDay;
	}

	public void setThrombophlebitis5OneDay(String thrombophlebitis5OneDay) {
		this.thrombophlebitis5OneDay = thrombophlebitis5OneDay;
	}

	public String getThrombophlebitis6OneDay() {
		return thrombophlebitis6OneDay;
	}

	public void setThrombophlebitis6OneDay(String thrombophlebitis6OneDay) {
		this.thrombophlebitis6OneDay = thrombophlebitis6OneDay;
	}

	public String getIdPainScaleOneDay() {
		return idPainScaleOneDay;
	}

	public void setIdPainScaleOneDay(String idPainScaleOneDay) {
		this.idPainScaleOneDay = idPainScaleOneDay;
	}

	public String getAssessment01OneDay() {
		return assessment01OneDay;
	}

	public void setAssessment01OneDay(String assessment01OneDay) {
		this.assessment01OneDay = assessment01OneDay;
	}

	public String getAssessment02OneDay() {
		return assessment02OneDay;
	}

	public void setAssessment02OneDay(String assessment02OneDay) {
		this.assessment02OneDay = assessment02OneDay;
	}

	public String getAssessment03OneDay() {
		return assessment03OneDay;
	}

	public void setAssessment03OneDay(String assessment03OneDay) {
		this.assessment03OneDay = assessment03OneDay;
	}

	public String getAssessment04OneDay() {
		return assessment04OneDay;
	}

	public void setAssessment04OneDay(String assessment04OneDay) {
		this.assessment04OneDay = assessment04OneDay;
	}

	public String getDiagnosis01OneDay() {
		return diagnosis01OneDay;
	}

	public void setDiagnosis01OneDay(String diagnosis01OneDay) {
		this.diagnosis01OneDay = diagnosis01OneDay;
	}

	public String getDiagnosis02OneDay() {
		return diagnosis02OneDay;
	}

	public void setDiagnosis02OneDay(String diagnosis02OneDay) {
		this.diagnosis02OneDay = diagnosis02OneDay;
	}

	public String getDiagnosis03OneDay() {
		return diagnosis03OneDay;
	}

	public void setDiagnosis03OneDay(String diagnosis03OneDay) {
		this.diagnosis03OneDay = diagnosis03OneDay;
	}

	public String getDiagnosis04OneDay() {
		return diagnosis04OneDay;
	}

	public void setDiagnosis04OneDay(String diagnosis04OneDay) {
		this.diagnosis04OneDay = diagnosis04OneDay;
	}

	public String getPlanning01OneDay() {
		return planning01OneDay;
	}

	public void setPlanning01OneDay(String planning01OneDay) {
		this.planning01OneDay = planning01OneDay;
	}

	public String getPlanning02OneDay() {
		return planning02OneDay;
	}

	public void setPlanning02OneDay(String planning02OneDay) {
		this.planning02OneDay = planning02OneDay;
	}

	public String getPlanning03OneDay() {
		return planning03OneDay;
	}

	public void setPlanning03OneDay(String planning03OneDay) {
		this.planning03OneDay = planning03OneDay;
	}

	public String getPlanning04OneDay() {
		return planning04OneDay;
	}

	public void setPlanning04OneDay(String planning04OneDay) {
		this.planning04OneDay = planning04OneDay;
	}

	public String getIntervention01OneDay() {
		return intervention01OneDay;
	}

	public void setIntervention01OneDay(String intervention01OneDay) {
		this.intervention01OneDay = intervention01OneDay;
	}

	public String getIntervention02OneDay() {
		return intervention02OneDay;
	}

	public void setIntervention02OneDay(String intervention02OneDay) {
		this.intervention02OneDay = intervention02OneDay;
	}

	public String getIntervention03OneDay() {
		return intervention03OneDay;
	}

	public void setIntervention03OneDay(String intervention03OneDay) {
		this.intervention03OneDay = intervention03OneDay;
	}

	public String getIntervention04OneDay() {
		return intervention04OneDay;
	}

	public void setIntervention04OneDay(String intervention04OneDay) {
		this.intervention04OneDay = intervention04OneDay;
	}

	public String getEvaluation01OneDay() {
		return evaluation01OneDay;
	}

	public void setEvaluation01OneDay(String evaluation01OneDay) {
		this.evaluation01OneDay = evaluation01OneDay;
	}

	public String getEvaluation02OneDay() {
		return evaluation02OneDay;
	}

	public void setEvaluation02OneDay(String evaluation02OneDay) {
		this.evaluation02OneDay = evaluation02OneDay;
	}

	public String getEvaluation03OneDay() {
		return evaluation03OneDay;
	}

	public void setEvaluation03OneDay(String evaluation03OneDay) {
		this.evaluation03OneDay = evaluation03OneDay;
	}

	public String getEvaluation04OneDay() {
		return evaluation04OneDay;
	}

	public void setEvaluation04OneDay(String evaluation04OneDay) {
		this.evaluation04OneDay = evaluation04OneDay;
	}

	public int getAddedBy() {
		return addedBy;
	}

	public void setAddedBy(int addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public List<OneDayAssessmentDTO> getListOneDay() {
		return listOneDay;
	}

	public void setListOneDay(List<OneDayAssessmentDTO> listOneDay) {
		this.listOneDay = listOneDay;
	}
	
	@Column(name = "assessment01")
	private String assessment01OneDay; 

	@Column(name = "assessment02")
	private String assessment02OneDay; 

	@Column(name = "assessment03")
	private String assessment03OneDay; 

	@Column(name = "assessment04")
	private String assessment04OneDay; 

	@Column(name = "diagnosis01")
	private String diagnosis01OneDay; 

	@Column(name = "diagnosis02")
	private String diagnosis02OneDay; 

	@Column(name = "diagnosis03")
	private String diagnosis03OneDay; 

	@Column(name = "diagnosis04")
	private String diagnosis04OneDay; 

	@Column(name = "planning01")
	private String planning01OneDay; 

	@Column(name = "planning02")
	private String planning02OneDay; 

	@Column(name = "planning03")
	private String planning03OneDay; 

	@Column(name = "planning04")
	private String planning04OneDay; 

	@Column(name = "intervention01")
	private String intervention01OneDay; 

	@Column(name = "intervention02")
	private String intervention02OneDay; 

	@Column(name = "intervention03")
	private String intervention03OneDay; 

	@Column(name = "intervention04")
	private String intervention04OneDay; 

	@Column(name = "evaluation01")
	private String evaluation01OneDay; 

	@Column(name = "evaluation02")
	private String evaluation02OneDay; 

	@Column(name = "evaluation03")
	private String evaluation03OneDay; 

	@Column(name = "evaluation04")
	private String evaluation04OneDay; 

	@Column(name = "added_by",updatable=false)
	private int addedBy;
	

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date",updatable=false)
	private Date addedDate;
	

	@Column(name = "updated_by")
	private int updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;

	@Column(name = "ip_address")
	private String ipAddress;
	
	@Transient
	private List<NursingReAssessment1DayDTO> reAssessmentList; 
	
	public List<NursingReAssessment1DayDTO> getReAssessmentList() {
		return reAssessmentList;
	}

	public void setReAssessmentList(
			List<NursingReAssessment1DayDTO> reAssessmentList) {
		this.reAssessmentList = reAssessmentList;
	}

	@Transient
	private List<OneDayAssessmentDTO> listOneDay; 

	@Column(name = "shift004_oneday")
	private String shift004OneDay;

	public String getShift004OneDay() {
		return shift004OneDay;
	}

	public void setShift004OneDay(String shift004OneDay) {
		this.shift004OneDay = shift004OneDay;
	}
	
	
}