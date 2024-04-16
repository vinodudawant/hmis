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
@Table(name = "ehat_nursing_initial_assessment")
public class nursingAsmentDataDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idnursing_initial_assessment")
	private int idNursingInitialAssessment;

	@Column(name = "patient_id")
	private int pId;

	@Column(name = "treatment_id")
	private int tId;

	@Column(name = "band_on")
	private String bandOn;

	@Column(name = "call_nursing")
	private String call;

	@Column(name = "ht")
	private String ht;

	@Column(name = "wt")
	private String wt;

	@Column(name = "ambulatory")
	private String ambulatory;

	@Column(name = "strecher")
	private String strecher;

	@Column(name = "wheelchair")
	private String wheelchair;

	@Column(name = "admission_emergency")
	private String admissionEmergency;

	@Column(name = "admission_regular")
	private String admissionRegular;

	@Column(name = "info_pat")
	private String infoPat;

	@Column(name = "info_fam")
	private String infoFam;

	@Column(name = "info_old")
	private String infoOld;

	@Column(name = "infoother")
	private String infoOther;

	@Column(name = "infoconsent")
	private String infoConsent;

	@Column(name = "inforelative")
	private String infoRelative;

	@Column(name = "vitalt")
	private String vitalT;

	@Column(name = "vitalp")
	private String vitalP;

	@Column(name = "vitalr")
	private String vitalR;

	@Column(name = "vitalbp1")
	private String vitalBp1;

	@Column(name = "vitalbp2")
	private String vitalBp2;

	@Column(name = "vitalsp")
	private String vitalSp;

	@Column(name = "admittingdiagnosis")
	private String admittingDiagnosis;

	@Column(name = "allergydrug")
	private String allergyDrug;

	@Column(name = "allergyfood")
	private String allergyFood;

	@Column(name = "allergyother")
	private String allergyOther;

	@Column(name = "admittingcomplaint")
	private String admittingComplaint;

	@Column(name = "pathd")
	private String patHD;

	@Column(name = "pathyp")
	private String patHyp;

	@Column(name = "patast")
	private String patAst;

	@Column(name = "pattb")
	private String patTB;

	@Column(name = "patcan")
	private String patCan;

	@Column(name = "patai")
	private String patAI;

	@Column(name = "patdia")
	private String patDia;

	@Column(name = "patkid")
	private String patKid;

	@Column(name = "patstroke")
	private String patStroke;

	@Column(name = "patul")
	private String patUL;

	@Column(name = "patep")
	private String patEP;

	@Column(name = "patlung")
	private String patLung;

	@Column(name = "patseizures")
	private String patSeizures;

	@Column(name = "pathepa")
	private String patHepa;

	@Column(name = "pattu")
	private String patTU;

	@Column(name = "patother")
	private String patOther;

	@Column(name = "patsurgery")
	private String patSurgery;

	@Column(name = "famhd")
	private String famHD;

	@Column(name = "famhyp")
	private String famHyp;

	@Column(name = "famast")
	private String famAst;

	@Column(name = "famtb")
	private String famTB;

	@Column(name = "famcan")
	private String famCan;

	@Column(name = "famai")
	private String famAI;

	@Column(name = "famdia")
	private String famDia;

	@Column(name = "famkid")
	private String famKid;

	@Column(name = "famstroke")
	private String famStroke;

	@Column(name = "famul")
	private String famUL;

	@Column(name = "famep")
	private String famEP;

	@Column(name = "famlung")
	private String famLung;

	@Column(name = "famseizures")
	private String famSeizures;

	@Column(name = "famhepa")
	private String famHepa;

	@Column(name = "famtu")
	private String famTU;

	@Column(name = "famother")
	private String famOther;

	@Column(name = "famsurgery")
	private String famSurgery;

	@Column(name = "maritialstatus")
	private String maritialStatus;

	@Column(name = "liveswith")
	private String livesWith;

	@Column(name = "occupation")
	private String occupation;

	@Column(name = "activity")
	private String activity;

	@Column(name = "emostatus")
	private String emoStatus;

	@Column(name = "usualfeeding")
	private String usualFeeding;

	@Column(name = "usualbathing")
	private String usualBathing;

	@Column(name = "usualtoileting")
	private String usualToileting;

	@Column(name = "usualgeneral")
	private String usualGeneral;

	@Column(name = "usualdressing")
	private String usualDressing;

	@Column(name = "admsfeeding")
	private String admsFeeding;

	@Column(name = "admsbathing")
	private String admsBathing;

	@Column(name = "admstoileting")
	private String admsToileting;

	@Column(name = "admsgeneral")
	private String admsGeneral;

	@Column(name = "admsdressing")
	private String admsDressing;

	@Transient
	private List<nursingAsmentDataDTO> nursinglist;

	@Column(name = "added_by", updatable = false)
	private int addedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "added_date", updatable = false)
	private Date addedDate;

	@Column(name = "updated_by")
	private int updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date")
	private Date updatedDate;

	@Column(name = "ip_address")
	private String ipAddress;

	@Column(name = "idnursing_assessment_paediatric")
	private String idnursingAssessmentPaediatric="0";

	public String getIdnursingAssessmentPaediatric() {
		return idnursingAssessmentPaediatric;
	}

	public void setIdnursingAssessmentPaediatric(String idnursingAssessmentPaediatric) {
		this.idnursingAssessmentPaediatric = idnursingAssessmentPaediatric;
	}

	public int getIdNursingInitialAssessment() {
		return idNursingInitialAssessment;
	}

	public void setIdNursingInitialAssessment(int idNursingInitialAssessment) {
		this.idNursingInitialAssessment = idNursingInitialAssessment;
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

	public String getBandOn() {
		return bandOn;
	}

	public void setBandOn(String bandOn) {
		this.bandOn = bandOn;
	}

	public String getCall() {
		return call;
	}

	public void setCall(String call) {
		this.call = call;
	}

	public String getHt() {
		return ht;
	}

	public void setHt(String ht) {
		this.ht = ht;
	}

	public String getWt() {
		return wt;
	}

	public void setWt(String wt) {
		this.wt = wt;
	}

	public String getAmbulatory() {
		return ambulatory;
	}

	public void setAmbulatory(String ambulatory) {
		this.ambulatory = ambulatory;
	}

	public String getStrecher() {
		return strecher;
	}

	public void setStrecher(String strecher) {
		this.strecher = strecher;
	}

	public String getWheelchair() {
		return wheelchair;
	}

	public void setWheelchair(String wheelchair) {
		this.wheelchair = wheelchair;
	}

	public String getAdmissionEmergency() {
		return admissionEmergency;
	}

	public void setAdmissionEmergency(String admissionEmergency) {
		this.admissionEmergency = admissionEmergency;
	}

	public String getAdmissionRegular() {
		return admissionRegular;
	}

	public void setAdmissionRegular(String admissionRegular) {
		this.admissionRegular = admissionRegular;
	}

	public String getInfoPat() {
		return infoPat;
	}

	public void setInfoPat(String infoPat) {
		this.infoPat = infoPat;
	}

	public String getInfoFam() {
		return infoFam;
	}

	public void setInfoFam(String infoFam) {
		this.infoFam = infoFam;
	}

	public String getInfoOld() {
		return infoOld;
	}

	public void setInfoOld(String infoOld) {
		this.infoOld = infoOld;
	}

	public String getInfoOther() {
		return infoOther;
	}

	public void setInfoOther(String infoOther) {
		this.infoOther = infoOther;
	}

	public String getInfoConsent() {
		return infoConsent;
	}

	public void setInfoConsent(String infoConsent) {
		this.infoConsent = infoConsent;
	}

	public String getInfoRelative() {
		return infoRelative;
	}

	public void setInfoRelative(String infoRelative) {
		this.infoRelative = infoRelative;
	}

	public String getVitalT() {
		return vitalT;
	}

	public void setVitalT(String vitalT) {
		this.vitalT = vitalT;
	}

	public String getVitalP() {
		return vitalP;
	}

	public void setVitalP(String vitalP) {
		this.vitalP = vitalP;
	}

	public String getVitalR() {
		return vitalR;
	}

	public void setVitalR(String vitalR) {
		this.vitalR = vitalR;
	}

	public String getVitalBp1() {
		return vitalBp1;
	}

	public void setVitalBp1(String vitalBp1) {
		this.vitalBp1 = vitalBp1;
	}

	public String getVitalBp2() {
		return vitalBp2;
	}

	public void setVitalBp2(String vitalBp2) {
		this.vitalBp2 = vitalBp2;
	}

	public String getVitalSp() {
		return vitalSp;
	}

	public void setVitalSp(String vitalSp) {
		this.vitalSp = vitalSp;
	}

	public String getAdmittingDiagnosis() {
		return admittingDiagnosis;
	}

	public void setAdmittingDiagnosis(String admittingDiagnosis) {
		this.admittingDiagnosis = admittingDiagnosis;
	}

	public String getAllergyDrug() {
		return allergyDrug;
	}

	public void setAllergyDrug(String allergyDrug) {
		this.allergyDrug = allergyDrug;
	}

	public String getAllergyFood() {
		return allergyFood;
	}

	public void setAllergyFood(String allergyFood) {
		this.allergyFood = allergyFood;
	}

	public String getAllergyOther() {
		return allergyOther;
	}

	public void setAllergyOther(String allergyOther) {
		this.allergyOther = allergyOther;
	}

	public String getAdmittingComplaint() {
		return admittingComplaint;
	}

	public void setAdmittingComplaint(String admittingComplaint) {
		this.admittingComplaint = admittingComplaint;
	}

	public String getPatHD() {
		return patHD;
	}

	public void setPatHD(String patHD) {
		this.patHD = patHD;
	}

	public String getPatHyp() {
		return patHyp;
	}

	public void setPatHyp(String patHyp) {
		this.patHyp = patHyp;
	}

	public String getPatAst() {
		return patAst;
	}

	public void setPatAst(String patAst) {
		this.patAst = patAst;
	}

	public String getPatTB() {
		return patTB;
	}

	public void setPatTB(String patTB) {
		this.patTB = patTB;
	}

	public String getPatCan() {
		return patCan;
	}

	public void setPatCan(String patCan) {
		this.patCan = patCan;
	}

	public String getPatAI() {
		return patAI;
	}

	public void setPatAI(String patAI) {
		this.patAI = patAI;
	}

	public String getPatDia() {
		return patDia;
	}

	public void setPatDia(String patDia) {
		this.patDia = patDia;
	}

	public String getPatKid() {
		return patKid;
	}

	public void setPatKid(String patKid) {
		this.patKid = patKid;
	}

	public String getPatStroke() {
		return patStroke;
	}

	public void setPatStroke(String patStroke) {
		this.patStroke = patStroke;
	}

	public String getPatUL() {
		return patUL;
	}

	public void setPatUL(String patUL) {
		this.patUL = patUL;
	}

	public String getPatEP() {
		return patEP;
	}

	public void setPatEP(String patEP) {
		this.patEP = patEP;
	}

	public String getPatLung() {
		return patLung;
	}

	public void setPatLung(String patLung) {
		this.patLung = patLung;
	}

	public String getPatSeizures() {
		return patSeizures;
	}

	public void setPatSeizures(String patSeizures) {
		this.patSeizures = patSeizures;
	}

	public String getPatHepa() {
		return patHepa;
	}

	public void setPatHepa(String patHepa) {
		this.patHepa = patHepa;
	}

	public String getPatTU() {
		return patTU;
	}

	public void setPatTU(String patTU) {
		this.patTU = patTU;
	}

	public String getPatOther() {
		return patOther;
	}

	public void setPatOther(String patOther) {
		this.patOther = patOther;
	}

	public String getPatSurgery() {
		return patSurgery;
	}

	public void setPatSurgery(String patSurgery) {
		this.patSurgery = patSurgery;
	}

	public String getFamHD() {
		return famHD;
	}

	public void setFamHD(String famHD) {
		this.famHD = famHD;
	}

	public String getFamHyp() {
		return famHyp;
	}

	public void setFamHyp(String famHyp) {
		this.famHyp = famHyp;
	}

	public String getFamAst() {
		return famAst;
	}

	public void setFamAst(String famAst) {
		this.famAst = famAst;
	}

	public String getFamTB() {
		return famTB;
	}

	public void setFamTB(String famTB) {
		this.famTB = famTB;
	}

	public String getFamCan() {
		return famCan;
	}

	public void setFamCan(String famCan) {
		this.famCan = famCan;
	}

	public String getFamAI() {
		return famAI;
	}

	public void setFamAI(String famAI) {
		this.famAI = famAI;
	}

	public String getFamDia() {
		return famDia;
	}

	public void setFamDia(String famDia) {
		this.famDia = famDia;
	}

	public String getFamKid() {
		return famKid;
	}

	public void setFamKid(String famKid) {
		this.famKid = famKid;
	}

	public String getFamStroke() {
		return famStroke;
	}

	public void setFamStroke(String famStroke) {
		this.famStroke = famStroke;
	}

	public String getFamUL() {
		return famUL;
	}

	public void setFamUL(String famUL) {
		this.famUL = famUL;
	}

	public String getFamEP() {
		return famEP;
	}

	public void setFamEP(String famEP) {
		this.famEP = famEP;
	}

	public String getFamLung() {
		return famLung;
	}

	public void setFamLung(String famLung) {
		this.famLung = famLung;
	}

	public String getFamSeizures() {
		return famSeizures;
	}

	public void setFamSeizures(String famSeizures) {
		this.famSeizures = famSeizures;
	}

	public String getFamHepa() {
		return famHepa;
	}

	public void setFamHepa(String famHepa) {
		this.famHepa = famHepa;
	}

	public String getFamTU() {
		return famTU;
	}

	public void setFamTU(String famTU) {
		this.famTU = famTU;
	}

	public String getFamOther() {
		return famOther;
	}

	public void setFamOther(String famOther) {
		this.famOther = famOther;
	}

	public String getFamSurgery() {
		return famSurgery;
	}

	public void setFamSurgery(String famSurgery) {
		this.famSurgery = famSurgery;
	}

	public String getMaritialStatus() {
		return maritialStatus;
	}

	public void setMaritialStatus(String maritialStatus) {
		this.maritialStatus = maritialStatus;
	}

	public String getLivesWith() {
		return livesWith;
	}

	public void setLivesWith(String livesWith) {
		this.livesWith = livesWith;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	public String getEmoStatus() {
		return emoStatus;
	}

	public void setEmoStatus(String emoStatus) {
		this.emoStatus = emoStatus;
	}

	public String getUsualFeeding() {
		return usualFeeding;
	}

	public void setUsualFeeding(String usualFeeding) {
		this.usualFeeding = usualFeeding;
	}

	public String getUsualBathing() {
		return usualBathing;
	}

	public void setUsualBathing(String usualBathing) {
		this.usualBathing = usualBathing;
	}

	public String getUsualToileting() {
		return usualToileting;
	}

	public void setUsualToileting(String usualToileting) {
		this.usualToileting = usualToileting;
	}

	public String getUsualGeneral() {
		return usualGeneral;
	}

	public void setUsualGeneral(String usualGeneral) {
		this.usualGeneral = usualGeneral;
	}

	public String getUsualDressing() {
		return usualDressing;
	}

	public void setUsualDressing(String usualDressing) {
		this.usualDressing = usualDressing;
	}

	public String getAdmsFeeding() {
		return admsFeeding;
	}

	public void setAdmsFeeding(String admsFeeding) {
		this.admsFeeding = admsFeeding;
	}

	public String getAdmsBathing() {
		return admsBathing;
	}

	public void setAdmsBathing(String admsBathing) {
		this.admsBathing = admsBathing;
	}

	public String getAdmsToileting() {
		return admsToileting;
	}

	public void setAdmsToileting(String admsToileting) {
		this.admsToileting = admsToileting;
	}

	public String getAdmsGeneral() {
		return admsGeneral;
	}

	public void setAdmsGeneral(String admsGeneral) {
		this.admsGeneral = admsGeneral;
	}

	public String getAdmsDressing() {
		return admsDressing;
	}

	public void setAdmsDressing(String admsDressing) {
		this.admsDressing = admsDressing;
	}

	public List<nursingAsmentDataDTO> getNursinglist() {
		return nursinglist;
	}

	public void setNursinglist(List<nursingAsmentDataDTO> nursinglist) {
		this.nursinglist = nursinglist;
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

}