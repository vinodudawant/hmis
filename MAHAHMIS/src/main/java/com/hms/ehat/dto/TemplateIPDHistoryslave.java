package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.dto.Doctor;
import com.hms.dto.IPDHistoryMaster;

@Entity
@Table(name = "ehat_template_ipd_history_slave")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TemplateIPDHistoryslave {

	@Id
	@GeneratedValue
	@Column(name = "id_ipdhistoryslave")	
	private int id_ipdhistoryslave;
	@ManyToOne
	@JoinColumn(name = "id_ipdhistorymaster")
	private TemplateIPDHistory id_ipdhistorymaster;

	@Column(name = "mrn",length = 255)

	private String mrn="-";
	@Column(name = "idproof",length = 255)
	private String idProof="-";
	@Column(name = "idno",length = 255)
	private String IDNo="-";
	@Column(name = "admissionnote",length = 400)
	private String admissionNote="-";
	@Column(name = "past_surgical_his",length = 400)
	private String past_surgical_his="-";
	@Column(name = "medications",length = 400)
	private String Medications="-";
	@Column(name = "past_reguler",length = 400)
	private String Past_Reguler="-";
	@Column(name = "present_reguler",length = 400)
	private String Present_reguler="-";
	@Column(name = "gynac",length = 400)
	private String gynac="-";
	@Column(name = "drugreactions",length = 400)
	private String drugReactions="-";
	@Column(name = "familyhistory",length = 400)
	private String familyHistory="-";
	@Column(name = "personalhistory",length = 400)
	private String personalHistory="-";
	@Column(name = "habbits",length = 400)
	private String habbits="-";
	@Column(name = "bowel")
	private String bowel="-";
	@Column(name = "blader")
	private String blader="-";
	@Column(name = "temp")
	private String temp="-";
	@Column(name = "pallor")
	private String pallor="-";
	@Column(name = "lcterus")
	private String Lcterus="-";
	@Column(name = "pulse")
	private String pulse="-";
	@Column(name = "clubbing")
	private String clubbing="-";
	@Column(name = "oedema")
	private String oedema="-";
	@Column(name = "bp")
	private String bp="-";
	@Column(name = "lymph")
	private String lymph="-";
	@Column(name = "rs")
	private String rs="-";
	@Column(name = "cns")
	private String cns="-";
	@Column(name = "cvs")
	private String cvs="-";
	@Column(name = "pa")
	private String pa="-";
	@Column(name = "local_exma",length = 400)
	private String local_Exma="-";
	@Column(name = "investigation",length = 400)
	private String investigation="-";
	@Column(name = "provisional")
	private String provisional="-";
	@Column(name = "treatment")
	private String treatment="-";
	@Column(name = "name")
	private String name="-";
	@Column(name = "dm")
	private String dm="-";
	@Column(name = "htn")
	private String htn="-";
	@Column(name = "ihd")
	private String ihd="-";
	@Column(name = "bacopd")
	private String bacopd="-";
	@Column(name = "other")
	private String other="-";
	@Column(name = "idipd_add_history_componanat")
	private int idipd_add_history_componanat;
	@Column(name = "chief_com_durration")
	private String chief_com_durration="-";
	@Column(name = "status")
	private String status="N";
	@Column(name = "chief_complaints_temp",length = 400)
	private String chiefComplaintsTemp="-";
	@Column(name = "clinicalfinding",length = 400)
	private String clinicalFinding="-";
	@Column(name = "duration")
	private String duration="-";
	@Column(name = "days_month_year")
	private String days_month_year="-";

	@Column(name = "statuscf")
	private String statuscf;
	public String getStatuscf() {
		return statuscf;
	}


	public void setStatuscf(String statuscf) {
		this.statuscf = statuscf;
	}


	@Transient	
	private List<TemplateIPDHistoryslave> listTemplateIPDHistoryslave;
	@Transient	
	private List<Doctor> listofDoctor;
	
	
	
	
	public void setListofDoctor(List<Doctor> listofDoctor) {
		this.listofDoctor = listofDoctor;
	}
	
	
	public int getId_ipdhistoryslave() {
		return id_ipdhistoryslave;
	}
	public void setId_ipdhistoryslave(int id_ipdhistoryslave) {
		this.id_ipdhistoryslave = id_ipdhistoryslave;
	}
	@JsonGetter("chiefComplaintsTemp")

	public String getChiefComplaintsTemp() {
		return chiefComplaintsTemp;
	}


	public void setChiefComplaintsTemp(String chiefComplaintsTemp) {
		this.chiefComplaintsTemp = chiefComplaintsTemp;
	}


	public String getClinicalFinding() {
		return clinicalFinding;
	}
	public void setClinicalFinding(String clinicalFinding) {
		this.clinicalFinding = clinicalFinding;
	}

	public String getDays_month_year() {
		return days_month_year;
	}
	public void setDays_month_year(String days_month_year) {
		this.days_month_year = days_month_year;
	}
	public List<Doctor> getListofDoctor() {
		return listofDoctor;
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
	
	

	
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}


	public List<TemplateIPDHistoryslave> getListTemplateIPDHistoryslave() {
		return listTemplateIPDHistoryslave;
	}


	public void setListTemplateIPDHistoryslave(
			List<TemplateIPDHistoryslave> listTemplateIPDHistoryslave) {
		this.listTemplateIPDHistoryslave = listTemplateIPDHistoryslave;
	}

@JsonIgnore
	public TemplateIPDHistory getId_ipdhistorymaster() {
		return id_ipdhistorymaster;
	}
	public void setId_ipdhistorymaster(TemplateIPDHistory id_ipdhistorymaster) {
		this.id_ipdhistorymaster = id_ipdhistorymaster;
	}

}
