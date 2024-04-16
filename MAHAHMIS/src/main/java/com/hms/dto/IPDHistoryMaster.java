package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
public class IPDHistoryMaster {

	/**
	 * @param args
	 */
	private int idipd_add_history_master;
	private int Treatment_ID;
	private String mrn;
	private String idProof;
	private String IDNo;
	private String admissionNote;
	private String past_surgical_his;
	private String Medications;
	private String Past_Reguler;
	private String Present_reguler;
	private String gynac;
	private String drugReactions;
	private String familyHistory;
	private String personalHistory;
	private String habbits;
	private String bowel;
	private String blader;
	private String temp;
	private String pallor;
	private String Lcterus;
	private String pulse;
	private String clubbing;
	private String oedema;
	private String bp;
	private String lymph;
	private String rs;
	private String cns;
	private String cvs;
	private String pa;
	private String local_Exma;
	private String investigation;
	private String provisional;
	private String treatment;
	private String name;
	private String dm;
	private String htn;
	private String ihd;
	private String bacopd;
	private String other;
	private int idipd_add_history_componanat;
	private String chief_com_durration;
	private String status;
	private String chiefComplaintsTxt;
	private String clinicalFinding;
	private String duration;
	private String days_month_year;
	
	private List<IPDHistoryMaster> listIPdHistory;
	private List<Doctor> listofDoctor;
	
	@JsonGetter("doclist")
	public List<Doctor> getListofDoctor() {
		return listofDoctor;
	}
	
	
	public void setListofDoctor(List<Doctor> listofDoctor) {
		this.listofDoctor = listofDoctor;
	}
	private List<IPDHistoryMaster> listIPdHistoryCompona;
	
	@JsonGetter("idHisMaster")
	public int getIdipd_add_history_master() {
		return idipd_add_history_master;
	}
	public void setIdipd_add_history_master(int idipd_add_history_master) {
		this.idipd_add_history_master = idipd_add_history_master;
	}
	@JsonGetter("tretID")
	public int getTreatment_ID() {
		return Treatment_ID;
	}
	public void setTreatment_ID(int treatment_ID) {
		Treatment_ID = treatment_ID;
	}
	@JsonGetter("mrn")
	public String getMrn() {
		return mrn;
	}
	public void setMrn(String mrn) {
		this.mrn = mrn;
	}
	@JsonGetter("idProof")
	public String getIdProof() {
		return idProof;
	}
	public void setIdProof(String idProof) {
		this.idProof = idProof;
	}
	@JsonGetter("idno")
	public String getIDNo() {
		return IDNo;
	}
	public void setIDNo(String iDNo) {
		IDNo = iDNo;
	}
	@JsonGetter("admissionNote")
	public String getAdmissionNote() {
		return admissionNote;
	}
	public void setAdmissionNote(String admissionNote) {
		this.admissionNote = admissionNote;
	}
	
	@JsonGetter("pastSur")
	public String getPast_surgical_his() {
		return past_surgical_his;
	}
	public void setPast_surgical_his(String past_surgical_his) {
		this.past_surgical_his = past_surgical_his;
	}
	@JsonGetter("medic")
	public String getMedications() {
		return Medications;
	}
	public void setMedications(String medications) {
		Medications = medications;
	}
	@JsonGetter("pastReg")
	public String getPast_Reguler() {
		return Past_Reguler;
	}
	public void setPast_Reguler(String past_Reguler) {
		Past_Reguler = past_Reguler;
	}
	@JsonGetter("preReg")
	public String getPresent_reguler() {
		return Present_reguler;
	}
	public void setPresent_reguler(String present_reguler) {
		Present_reguler = present_reguler;
	}
	@JsonGetter("gynac")
	public String getGynac() {
		return gynac;
	}
	public void setGynac(String gynac) {
		this.gynac = gynac;
	}
	@JsonGetter("DrgRea")
	public String getDrugReactions() {
		return drugReactions;
	}
	public void setDrugReactions(String drugReactions) {
		this.drugReactions = drugReactions;
	}
	@JsonGetter("famHis")
	public String getFamilyHistory() {
		return familyHistory;
	}
	public void setFamilyHistory(String familyHistory) {
		this.familyHistory = familyHistory;
	}
	@JsonGetter("perHis")
	public String getPersonalHistory() {
		return personalHistory;
	}
	public void setPersonalHistory(String personalHistory) {
		this.personalHistory = personalHistory;
	}
	@JsonGetter("hab")
	public String getHabbits() {
		return habbits;
	}
	public void setHabbits(String habbits) {
		this.habbits = habbits;
	}
	@JsonGetter("bowel")
	public String getBowel() {
		return bowel;
	}
	public void setBowel(String bowel) {
		this.bowel = bowel;
	}
	@JsonGetter("blader")
	public String getBlader() {
		return blader;
	}
	public void setBlader(String blader) {
		this.blader = blader;
	}
	@JsonGetter("temp")
	public String getTemp() {
		return temp;
	}
	public void setTemp(String temp) {
		this.temp = temp;
	}
	@JsonGetter("pallor")
	public String getPallor() {
		return pallor;
	}
	public void setPallor(String pallor) {
		this.pallor = pallor;
	}
	@JsonGetter("lcterus")
	public String getLcterus() {
		return Lcterus;
	}
	public void setLcterus(String lcterus) {
		Lcterus = lcterus;
	}
	@JsonGetter("pulse")
	public String getPulse() {
		return pulse;
	}
	public void setPulse(String pulse) {
		this.pulse = pulse;
	}
	@JsonGetter("clubbing")
	public String getClubbing() {
		return clubbing;
	}
	public void setClubbing(String clubbing) {
		this.clubbing = clubbing;
	}
	@JsonGetter("oedema")
	public String getOedema() {
		return oedema;
	}
	public void setOedema(String oedema) {
		this.oedema = oedema;
	}
	@JsonGetter("bp")
	public String getBp() {
		return bp;
	}
	public void setBp(String bp) {
		this.bp = bp;
	}
	@JsonGetter("lymph")
	public String getLymph() {
		return lymph;
	}
	public void setLymph(String lymph) {
		this.lymph = lymph;
	}
	@JsonGetter("rs")
	public String getRs() {
		return rs;
	}
	public void setRs(String rs) {
		this.rs = rs;
	}
	@JsonGetter("cns")
	public String getCns() {
		return cns;
	}
	public void setCns(String cns) {
		this.cns = cns;
	}
	@JsonGetter("cvs")
	public String getCvs() {
		return cvs;
	}
	public void setCvs(String cvs) {
		this.cvs = cvs;
	}
	@JsonGetter("pa")
	public String getPa() {
		return pa;
	}
	public void setPa(String pa) {
		this.pa = pa;
	}
	@JsonGetter("locE")
	public String getLocal_Exma() {
		return local_Exma;
	}
	public void setLocal_Exma(String local_Exma) {
		this.local_Exma = local_Exma;
	}
	@JsonGetter("invtg")
	public String getInvestigation() {
		return investigation;
	}
	public void setInvestigation(String investigation) {
		this.investigation = investigation;
	}
	@JsonGetter("prov")
	public String getProvisional() {
		return provisional;
	}
	public void setProvisional(String provisional) {
		this.provisional = provisional;
	}
	@JsonGetter("tt")
	public String getTreatment() {
		return treatment;
	}
	public void setTreatment(String treatment) {
		this.treatment = treatment;
	}
	@JsonGetter("name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@JsonGetter("dm")
	public String getDm() {
		return dm;
	}
	public void setDm(String dm) {
		this.dm = dm;
	}
	@JsonGetter("htn")
	public String getHtn() {
		return htn;
	}
	public void setHtn(String htn) {
		this.htn = htn;
	}
	@JsonGetter("ihd")
	public String getIhd() {
		return ihd;
	}
	public void setIhd(String ihd) {
		this.ihd = ihd;
	}
	
	@JsonGetter("chiefComplaintsTxt")
	public String getChiefComplaintsTxt() {
		return chiefComplaintsTxt;
	}

	public void setChiefComplaintsTxt(String chiefComplaintsTxt) {
		this.chiefComplaintsTxt = chiefComplaintsTxt;
	}


	@JsonGetter("clinicalFinding")
	public String getclinicalFinding() {
		return clinicalFinding;
	}
	public void setclinicalFinding(String clinicalFinding) {
		this.clinicalFinding = clinicalFinding;
	}
	
	
	@JsonGetter("bacopd")
	public String getBacopd() {
		return bacopd;
	}
	public void setBacopd(String bacopd) {
		this.bacopd = bacopd;
	}
	@JsonGetter("otr")
	public String getOther() {
		return other;
	}
	public void setOther(String other) {
		this.other = other;
	}
	@JsonGetter("idAdddHisComp")
	public int getIdipd_add_history_componanat() {
		return idipd_add_history_componanat;
	}
	@JsonSetter("idAdddHisComp")
	public void setIdipd_add_history_componanat(int idipd_add_history_componanat) {
		this.idipd_add_history_componanat = idipd_add_history_componanat;
	}
	@JsonGetter("chfdur")
	public String getChief_com_durration() {
		return chief_com_durration;
	}
	@JsonSetter("chfdur")
	public void setChief_com_durration(String chief_com_durration) {
		this.chief_com_durration = chief_com_durration;
	}
	
	@JsonGetter("duration")
	public String getChief_duration() {
		return duration;
	}
	@JsonSetter("duration")
	public void setChief_duration(String duration) {
		this.duration = duration;
	}
	
	
	@JsonGetter("days_month_year")
	public String getdays_month_year() {
		return days_month_year;
	}
	@JsonSetter("days_month_year")
	public void setdays_month_year(String days_month_year) {
		this.days_month_year = days_month_year;
	}
	
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("listIpdHisMaster")
	public List<IPDHistoryMaster> getListIPdHistory() {
		return listIPdHistory;
	}
	@JsonSetter("listIpdHisMaster")
	public void setListIPdHistory(List<IPDHistoryMaster> listIPdHistory) {
		this.listIPdHistory = listIPdHistory;
	}
	@JsonGetter("listIpdHisCompo")
	public List<IPDHistoryMaster> getListIPdHistoryCompona() {
		return listIPdHistoryCompona;
	}
	@JsonSetter("listIpdHisCompo")
	public void setListIPdHistoryCompona(List<IPDHistoryMaster> listIPdHistoryCompona) {
		this.listIPdHistoryCompona = listIPdHistoryCompona;
	}

	
}