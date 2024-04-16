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
@Table(name = "ehat_nursing_assessment_paediatric_page_three")
public class assessmentpediatric3DTO implements Serializable{
	
	
private static final long serialVersionUID = 1L;

@Id
@GeneratedValue
@Column(name ="idnursing_assessment_paediatric_page_three")
private int idnursing_assessment_paediatric_page_three;

@Column(name = "patient_id")
private int pId;

@Column(name = "treatment_id")
private int tId;

@Column(name = "chk_behaviour_restraint")
private String chkBehaviourRestraint;  

@Column(name = "chk_iv")
private String chkIv;  

@Column(name = "chk_voluntary")
private String chkVoluntary;  

@Column(name = "chk_unfollow_instructions")
private String chkUnfollowInstructions;  

@Column(name = "chk_initiation_others")
private String chkInitiationOthers;  

@Column(name = "chk_verbal_intervention")
private String chkVerbalIntervention;  

@Column(name = "chk_companionship")
private String chkCompanionship;  

@Column(name = "chk_frequent_monitoring")
private String chkFrequentMonitoring;  

@Column(name = "chkcomfort")
private String chkcomfort;  

@Column(name = "chk_reality")
private String chkReality;  

@Column(name = "chk_enviromental")
private String chkEnviromental;  

@Column(name = "chk_relaxation")
private String chkRelaxation;  

@Column(name = "txt_name_of_person_contacted")
private String txtNameOfPersonContacted;  

@Column(name = "txt_relation_with_patient")
private String txtRelationWithPatient;  

@Column(name = "time_education")
private String timeEducation;  

@Column(name = "chk_soft_wrist")
private String chkSoftWrist;  

@Column(name = "chk_soft_wrist_left")
private String chkSoftWristLeft;  

@Column(name = "chk_soft_wrist_right")
private String chkSoftWristRight;  

@Column(name = "chk_soft_wrist_both")
private String chkSoftWristBoth;  

@Column(name = "chk_soft_ankle")
private String chkSoftAnkle;  

@Column(name = "chk_soft_ankle_left")
private String chkSoftAnkleLeft;  

@Column(name = "chk_soft_ankle_right")
private String chkSoftAnkleRight;  

@Column(name = "chk_soft_ankle_both")
private String chkSoftAnkleBoth;  

@Column(name = "txt_chemical")
private String txtChemical;  

@Column(name = "txt_drugs")
private String txtDrugs;  

@Column(name = "txt_dose")
private String txtDose;  

@Column(name = "txt_restraints_name")
private String txtRestraintsName;  

@Column(name = "txt_consultant_doctor")
private String txtConsultant_Doctor;  

@Column(name = "date_pick_for_doc")
private String datePickForDoc;  

@Column(name = "doc_time")
private String docTme;  

@Column(name = "txt_primary_nurse")
private String txtPrimaryNurse;  

@Column(name = "date_pick_for_nurse")
private String datePickForNurse;  

@Column(name = "nurse_time")
private String nurseTme;  

@Column(name = "chk_none")
private String chkNone;  

@Column(name = "chk_redness")
private String chkRedness;  

@Column(name = "chk_sweling")
private String chkSwelling;  

@Column(name = "chk_injur")
private String chkInjur;  

@Column(name = "chk_comp_pres_scr")
private String chkCompliPresScr;  

@Column(name = "chk_complication_body_temprature")
private String chkComplicationBodyTemprature;  

@Column(name = "chk_complication_other")
private String chkComplicationOther;  

@Column(name = "date_pickfo")
private String datePickFo;  

@Column(name = "time01")
private String time010;  

@Column(name = "remark")
private String txtAreaRemaar;  

@Column(name = "treatmen_modify")
private String chkTreatmenModif;  

@Transient
private String vBFRData007;  

@Transient
private String staffInterventionData;  

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
private List<assessmentpediatric3DTO> listpediatric3;

@Transient
private List<VerbalDTO> verbalList; 

@Transient
private List<InterventionDTO> interventionList;

public int getIdnursing_assessment_paediatric_page_three() {
	return idnursing_assessment_paediatric_page_three;
}

public void setIdnursing_assessment_paediatric_page_three(
		int idnursing_assessment_paediatric_page_three) {
	this.idnursing_assessment_paediatric_page_three = idnursing_assessment_paediatric_page_three;
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

public String getChkBehaviourRestraint() {
	return chkBehaviourRestraint;
}

public void setChkBehaviourRestraint(String chkBehaviourRestraint) {
	this.chkBehaviourRestraint = chkBehaviourRestraint;
}

public String getChkIv() {
	return chkIv;
}

public void setChkIv(String chkIv) {
	this.chkIv = chkIv;
}

public String getChkVoluntary() {
	return chkVoluntary;
}

public void setChkVoluntary(String chkVoluntary) {
	this.chkVoluntary = chkVoluntary;
}

public String getChkUnfollowInstructions() {
	return chkUnfollowInstructions;
}

public void setChkUnfollowInstructions(String chkUnfollowInstructions) {
	this.chkUnfollowInstructions = chkUnfollowInstructions;
}

public String getChkInitiationOthers() {
	return chkInitiationOthers;
}

public void setChkInitiationOthers(String chkInitiationOthers) {
	this.chkInitiationOthers = chkInitiationOthers;
}

public String getChkVerbalIntervention() {
	return chkVerbalIntervention;
}

public void setChkVerbalIntervention(String chkVerbalIntervention) {
	this.chkVerbalIntervention = chkVerbalIntervention;
}

public String getChkCompanionship() {
	return chkCompanionship;
}

public void setChkCompanionship(String chkCompanionship) {
	this.chkCompanionship = chkCompanionship;
}

public String getChkFrequentMonitoring() {
	return chkFrequentMonitoring;
}

public void setChkFrequentMonitoring(String chkFrequentMonitoring) {
	this.chkFrequentMonitoring = chkFrequentMonitoring;
}

public String getChkcomfort() {
	return chkcomfort;
}

public void setChkcomfort(String chkcomfort) {
	this.chkcomfort = chkcomfort;
}

public String getChkReality() {
	return chkReality;
}

public void setChkReality(String chkReality) {
	this.chkReality = chkReality;
}

public String getChkEnviromental() {
	return chkEnviromental;
}

public void setChkEnviromental(String chkEnviromental) {
	this.chkEnviromental = chkEnviromental;
}

public String getChkRelaxation() {
	return chkRelaxation;
}

public void setChkRelaxation(String chkRelaxation) {
	this.chkRelaxation = chkRelaxation;
}

public String getTxtNameOfPersonContacted() {
	return txtNameOfPersonContacted;
}

public void setTxtNameOfPersonContacted(String txtNameOfPersonContacted) {
	this.txtNameOfPersonContacted = txtNameOfPersonContacted;
}

public String getTxtRelationWithPatient() {
	return txtRelationWithPatient;
}

public void setTxtRelationWithPatient(String txtRelationWithPatient) {
	this.txtRelationWithPatient = txtRelationWithPatient;
}

public String getTimeEducation() {
	return timeEducation;
}

public void setTimeEducation(String timeEducation) {
	this.timeEducation = timeEducation;
}

public String getChkSoftWrist() {
	return chkSoftWrist;
}

public void setChkSoftWrist(String chkSoftWrist) {
	this.chkSoftWrist = chkSoftWrist;
}

public String getChkSoftWristLeft() {
	return chkSoftWristLeft;
}

public void setChkSoftWristLeft(String chkSoftWristLeft) {
	this.chkSoftWristLeft = chkSoftWristLeft;
}

public String getChkSoftWristRight() {
	return chkSoftWristRight;
}

public void setChkSoftWristRight(String chkSoftWristRight) {
	this.chkSoftWristRight = chkSoftWristRight;
}

public String getChkSoftWristBoth() {
	return chkSoftWristBoth;
}

public void setChkSoftWristBoth(String chkSoftWristBoth) {
	this.chkSoftWristBoth = chkSoftWristBoth;
}

public String getChkSoftAnkle() {
	return chkSoftAnkle;
}

public void setChkSoftAnkle(String chkSoftAnkle) {
	this.chkSoftAnkle = chkSoftAnkle;
}

public String getChkSoftAnkleLeft() {
	return chkSoftAnkleLeft;
}

public void setChkSoftAnkleLeft(String chkSoftAnkleLeft) {
	this.chkSoftAnkleLeft = chkSoftAnkleLeft;
}

public String getChkSoftAnkleRight() {
	return chkSoftAnkleRight;
}

public void setChkSoftAnkleRight(String chkSoftAnkleRight) {
	this.chkSoftAnkleRight = chkSoftAnkleRight;
}

public String getChkSoftAnkleBoth() {
	return chkSoftAnkleBoth;
}

public void setChkSoftAnkleBoth(String chkSoftAnkleBoth) {
	this.chkSoftAnkleBoth = chkSoftAnkleBoth;
}

public String getTxtChemical() {
	return txtChemical;
}

public void setTxtChemical(String txtChemical) {
	this.txtChemical = txtChemical;
}

public String getTxtDrugs() {
	return txtDrugs;
}

public void setTxtDrugs(String txtDrugs) {
	this.txtDrugs = txtDrugs;
}

public String getTxtDose() {
	return txtDose;
}

public void setTxtDose(String txtDose) {
	this.txtDose = txtDose;
}

public String getTxtRestraintsName() {
	return txtRestraintsName;
}

public void setTxtRestraintsName(String txtRestraintsName) {
	this.txtRestraintsName = txtRestraintsName;
}

public String getTxtConsultant_Doctor() {
	return txtConsultant_Doctor;
}

public void setTxtConsultant_Doctor(String txtConsultant_Doctor) {
	this.txtConsultant_Doctor = txtConsultant_Doctor;
}

public String getDatePickForDoc() {
	return datePickForDoc;
}

public void setDatePickForDoc(String datePickForDoc) {
	this.datePickForDoc = datePickForDoc;
}

public String getDocTme() {
	return docTme;
}

public void setDocTme(String docTme) {
	this.docTme = docTme;
}

public String getTxtPrimaryNurse() {
	return txtPrimaryNurse;
}

public void setTxtPrimaryNurse(String txtPrimaryNurse) {
	this.txtPrimaryNurse = txtPrimaryNurse;
}

public String getDatePickForNurse() {
	return datePickForNurse;
}

public void setDatePickForNurse(String datePickForNurse) {
	this.datePickForNurse = datePickForNurse;
}

public String getNurseTme() {
	return nurseTme;
}

public void setNurseTme(String nurseTme) {
	this.nurseTme = nurseTme;
}

public String getChkNone() {
	return chkNone;
}

public void setChkNone(String chkNone) {
	this.chkNone = chkNone;
}

public String getChkRedness() {
	return chkRedness;
}

public void setChkRedness(String chkRedness) {
	this.chkRedness = chkRedness;
}

public String getChkSwelling() {
	return chkSwelling;
}

public void setChkSwelling(String chkSwelling) {
	this.chkSwelling = chkSwelling;
}

public String getChkInjur() {
	return chkInjur;
}

public void setChkInjur(String chkInjur) {
	this.chkInjur = chkInjur;
}

public String getChkCompliPresScr() {
	return chkCompliPresScr;
}

public void setChkCompliPresScr(String chkCompliPresScr) {
	this.chkCompliPresScr = chkCompliPresScr;
}

public String getChkComplicationBodyTemprature() {
	return chkComplicationBodyTemprature;
}

public void setChkComplicationBodyTemprature(
		String chkComplicationBodyTemprature) {
	this.chkComplicationBodyTemprature = chkComplicationBodyTemprature;
}

public String getChkComplicationOther() {
	return chkComplicationOther;
}

public void setChkComplicationOther(String chkComplicationOther) {
	this.chkComplicationOther = chkComplicationOther;
}

public String getDatePickFo() {
	return datePickFo;
}

public void setDatePickFo(String datePickFo) {
	this.datePickFo = datePickFo;
}

public String getTime010() {
	return time010;
}

public void setTime010(String time010) {
	this.time010 = time010;
}

public String getTxtAreaRemaar() {
	return txtAreaRemaar;
}

public void setTxtAreaRemaar(String txtAreaRemaar) {
	this.txtAreaRemaar = txtAreaRemaar;
}

public String getChkTreatmenModif() {
	return chkTreatmenModif;
}

public void setChkTreatmenModif(String chkTreatmenModif) {
	this.chkTreatmenModif = chkTreatmenModif;
}

public String getvBFRData007() {
	return vBFRData007;
}

public void setvBFRData007(String vBFRData007) {
	this.vBFRData007 = vBFRData007;
}

public String getStaffInterventionData() {
	return staffInterventionData;
}

public void setStaffInterventionData(String staffInterventionData) {
	this.staffInterventionData = staffInterventionData;
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

public List<assessmentpediatric3DTO> getListpediatric3() {
	return listpediatric3;
}

public void setListpediatric3(List<assessmentpediatric3DTO> listpediatric3) {
	this.listpediatric3 = listpediatric3;
}

public List<VerbalDTO> getVerbalList() {
	return verbalList;
}

public void setVerbalList(List<VerbalDTO> verbalList) {
	this.verbalList = verbalList;
}

public List<InterventionDTO> getInterventionList() {
	return interventionList;
}

public void setInterventionList(List<InterventionDTO> interventionList) {
	this.interventionList = interventionList;
}




}