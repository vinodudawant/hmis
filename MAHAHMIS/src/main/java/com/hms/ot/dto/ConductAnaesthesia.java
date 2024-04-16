package com.hms.ot.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.dto.Doctor;

public class ConductAnaesthesia {
	private int idanaesthesia_conduct;
	private String chk_anesthesia;
	//private String chk_regional;
	private String induction;
	private String relaxant;
	private int Treatment_ID;
	private List<Doctor> doctorlist = null;
	private String Reversal;
	
	@JsonGetter("reversal")
	public String getReversal() {
		return Reversal;
	}
	@JsonSetter("reversal")
	public void setReversal(String reversal) {
		Reversal = reversal;
	}
	@JsonGetter("tretID")
	public int getTreatment_ID() {
		return Treatment_ID;
	}
	@JsonSetter("tretID")
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	//private String chk_maintainence;
	//private String chk_circuit;
	//private String chk_ventilation;
	private String postOPpulse;
	private String postOPbp;
	private String postOPrr;
	private String postOPcolor;
	private String chkpostoperative;
	@JsonGetter("chkpostop")
	public String getChkpostoperative() {
		return chkpostoperative;
	}
	@JsonSetter("chkpostop")
	public void setChkpostoperative(String chkpostoperative) {
		this.chkpostoperative = chkpostoperative;
	}
	//private String chk_Recovery;
	//private String chk_Conscious;
	//private String chk_PostOPprob;
	//private String chk_Consumeropinion;
	private String anaesthesia_conductcol;
	private List<ConductAnaesthesia> conductanaesthesialist = null;
	private List<VitalSing> vitalslavelist = null;
	private String date;
	private String remark ;
	private String preOfNotes;
	private String approvalStatus ;
	
	@JsonGetter("remark")
	public String getRemark() {
		return remark;
	}
	@JsonSetter("remark")
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@JsonGetter("preOfNotes")
	public String getPreOfNotes() {
		return preOfNotes;
	}
	@JsonSetter("preOfNotes")
	public void setPreOfNotes(String preOfNotes) {
		this.preOfNotes = preOfNotes;
	}
	@JsonGetter("approvalStatus")
	public String getApprovalStatus() {
		return approvalStatus;
	}
	@JsonSetter("approvalStatus")
	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}
	@JsonGetter("date")
	public String getDate() {
		return date;
	}
	@JsonSetter("date")
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("vitalslave")
	public List<VitalSing> getVitalslavelist() {
		return vitalslavelist;
	}
	@JsonSetter("vitalslave")
	public void setVitalslavelist(List<VitalSing> vitalslavelist) {
		this.vitalslavelist = vitalslavelist;
	}
	@JsonGetter("anaesid")
	public int getIdanaesthesia_conduct() {
		return idanaesthesia_conduct;
	}
	@JsonSetter("anaesid")
	public void setIdanaesthesia_conduct(int idanaesthesia_conduct) {
		this.idanaesthesia_conduct = idanaesthesia_conduct;
	}
	@JsonGetter("chkanaes")
	public String getChk_anesthesia() {
		return chk_anesthesia;
	}
	@JsonSetter("chkanaes")
	public void setChk_anesthesia(String chk_anesthesia) {
		this.chk_anesthesia = chk_anesthesia;
	}
	/*@JsonGetter("chkregional")
	public String getChk_regional() {
		return chk_regional;
	}
	@JsonSetter("chkregional")
	public void setChk_regional(String chk_regional) {
		this.chk_regional = chk_regional;
	}*/
	@JsonGetter("induct")
	public String getInduction() {
		return induction;
	}
	@JsonSetter("induct")
	public void setInduction(String induction) {
		this.induction = induction;
	}
	@JsonGetter("relax")
	public String getRelaxant() {
		return relaxant;
	}
	@JsonSetter("relax")
	public void setRelaxant(String relaxant) {
		this.relaxant = relaxant;
	}
	/*@JsonGetter("chkmaintain")
	public String getChk_maintainence() {
		return chk_maintainence;
	}
	@JsonSetter("chkmaintain")
	public void setChk_maintainence(String chk_maintainence) {
		this.chk_maintainence = chk_maintainence;
	}
	@JsonGetter("chkcircuit")
	public String getChk_circuit() {
		return chk_circuit;
	}
	@JsonSetter("chkcircuit")
	public void setChk_circuit(String chk_circuit) {
		this.chk_circuit = chk_circuit;
	}
	@JsonGetter("chkventil")
	public String getChk_ventilation() {
		return chk_ventilation;
	}
	@JsonSetter("chkventil")
	public void setChk_ventilation(String chk_ventilation) {
		this.chk_ventilation = chk_ventilation;
	}*/
	@JsonGetter("postpulse")
	public String getPostOPpulse() {
		return postOPpulse;
	}
	@JsonSetter("postpulse")
	public void setPostOPpulse(String postOPpulse) {
		this.postOPpulse = postOPpulse;
	}
	@JsonGetter("postbp")
	public String getPostOPbp() {
		return postOPbp;
	}
	@JsonSetter("postbp")
	public void setPostOPbp(String postOPbp) {
		this.postOPbp = postOPbp;
	}
	@JsonGetter("postrr")
	public String getPostOPrr() {
		return postOPrr;
	}
	@JsonSetter("postrr")
	public void setPostOPrr(String postOPrr) {
		this.postOPrr = postOPrr;
	}
	@JsonGetter("postcolor")
	public String getPostOPcolor() {
		return postOPcolor;
	}
	@JsonSetter("postcolor")
	public void setPostOPcolor(String postOPcolor) {
		this.postOPcolor = postOPcolor;
	}
	/*@JsonGetter("chkrecovry")
	public String getChk_Recovery() {
		return chk_Recovery;
	}
	@JsonSetter("chkrecovry")
	public void setChk_Recovery(String chk_Recovery) {
		this.chk_Recovery = chk_Recovery;
	}
	@JsonGetter("chkcons")
	public String getChk_Conscious() {
		return chk_Conscious;
	}
	@JsonSetter("chkcons")
	public void setChk_Conscious(String chk_Conscious) {
		this.chk_Conscious = chk_Conscious;
	}
	@JsonGetter("chkpostop")
	public String getChk_PostOPprob() {
		return chk_PostOPprob;
	}
	@JsonSetter("chkpostop")
	public void setChk_PostOPprob(String chk_PostOPprob) {
		this.chk_PostOPprob = chk_PostOPprob;
	}
	@JsonGetter("chkpostop")
	public String getChk_Consumeropinion() {
		return chk_Consumeropinion;
	}
	@JsonSetter("chkconsume")
	public void setChk_Consumeropinion(String chk_Consumeropinion) {
		this.chk_Consumeropinion = chk_Consumeropinion;
	}*/
	@JsonGetter("conductcol")
	public String getAnaesthesia_conductcol() {
		return anaesthesia_conductcol;
	}
	@JsonSetter("conductcol")
	public void setAnaesthesia_conductcol(String anaesthesia_conductcol) {
		this.anaesthesia_conductcol = anaesthesia_conductcol;
	}
	@JsonGetter("conductlist")
	public List<ConductAnaesthesia> getConductanaesthesialist() {
		return conductanaesthesialist;
	}
	@JsonSetter("conductlist")
	public void setConductanaesthesialist(List<ConductAnaesthesia> conductanaesthesialist) {
		this.conductanaesthesialist = conductanaesthesialist;
	}
	@JsonSetter("dlist")
	public List<Doctor> getDoctorlist() {
		return doctorlist;
	}
	@JsonGetter("dlist")
	public void setDoctorlist(List<Doctor> doctorlist) {
		this.doctorlist = doctorlist;
	}
}
