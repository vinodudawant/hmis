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
@Table(name = "ehat_nursing_assessment_paediatric_page_two")
public class assessmentpediatric2DTO implements Serializable{
	
	
private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name ="idnursing_assessment_paediatric_page_two")
	private int idnursing_assessment_paediatric_page_two;
	

	@Column(name = "patient_id")
	private int pId;
	
	@Column(name = "treatment_id")
	private int tId;
	
	@Column(name = "food")
	private String food;  
	
	@Column(name = "medicines")
	private String medicines;  
	
	@Column(name = "chk_allergies_other")
	private String chkAllergiesOther;  
	
	@Column(name = "txt_allergies_specify")
	private String txtAllergiesSpecify;  
	
	@Column(name = "chk_allergies_not_known")
	private String chkAllergiesNotKnown;  
	
	@Column(name = "chk_birth_history_fullterm")
	private String chkBirthHistoryfullterm;  
	
	@Column(name = "chk_birth_history_preterm")
	private String chkBirthHistoryPreterm;  
	
	@Column(name = "chk_birth_history_birth_cry")
	private String chkBirthHistoryBirthCry;  
	
	@Column(name = "chk_normal_delivery")
	private String chkNormalDelivery;  
	
	@Column(name = "chk_delivery_ceasarean")
	private String chkDeliveryCeasarean;  
	
	@Column(name = "chk_delivery_forceps")
	private String chkDeliveryForceps;  
	
	@Column(name = "chk_delivery_episiotomy")
	private String chkDeliveryEpisiotomy;  
	
	@Column(name = "chk_delivery_vaccum")
	private String chkDeliveryVaccum;  
	
	@Column(name = "chk_immunization_completed")
	private String chkImmunizationCompleted;  
	
	@Column(name = "txt_immunization_details_if_no")
	private String txtImmunizationDetailsIfNo;  
	
	@Column(name = "chk_development_history_weight")
	private String chkDevelopmentHistoryweight;  
	
	@Column(name = "chk_development_history_height")
	private String chkDevelopmentHistoryHeight;  
	
	@Column(name = "chk_development_history_chest_circumference")
	private String chkDevelopmentHistoryChestCircumference;  
	
	@Column(name = "txt_development_history_details_if_no")
	private String txtAreaDevelopmentHistoryDetailsifNo;  
	
	@Column(name = "chk_no_abnormality_detected_for_eye")
	private String chkNoAbnormalityDetectedForEye;  
	
	@Column(name = "chk_impaired_eye")
	private String chkImpairedEye;  
	
	@Column(name = "chk_eye_lenses")
	private String chkEyeLenses;  
	
	@Column(name = "chk_eye_spectacles")
	private String chkEyeSpectacles;  
	
	@Column(name = "chk_blind")
	private String chkBlind;  
	
	@Column(name = "chk_deaf")
	private String chkDeaf;  
	
	@Column(name = "chk_hearing_aid")
	private String chkHearingAid;  
	
	@Column(name = "chk_chemo_port")
	private String chkChemoPort;  
	
	@Column(name = "chk_orthopedic_impl")
	private String chkOrthopedicImpl;  
	
	@Column(name = "txt_implants")
	private String txtImplants;  
	
	@Column(name = "chk_other_eye")
	private String chkOthereye;  
	
	@Column(name = "txt_other_eye")
	private String txtOthereye;  
	
	@Column(name = "chk_abnormality_respiratory")
	private String chkAbnormalityRespiratory;  
	
	@Column(name = "chk_dyspnea")
	private String chkDyspnea;  
	
	@Column(name = "chk_wheezes")
	private String chkWheezes;  
	
	@Column(name = "chk_asymmetric")
	private String chkAsymmetric;  
	
	@Column(name = "chk_cough")
	private String chkCough;  
	
	@Column(name = "chk_sputum")
	private String chkSputum;  
	
	@Column(name = "txt_other_respiratory")
	private String txtOtherRespiratory;  
	
	@Column(name = "chk_other_respiratory")
	private String chkOtherRespiratory;  
	
	@Column(name = "chk_abnormality_cardio_vascular")
	private String chkAbnormalityCardioVascular;  
	
	@Column(name = "chk_tachycardia")
	private String chkTachycardia;  
	
	@Column(name = "chk_bradycardia")
	private String chkBradycardia;  
	
	@Column(name = "chk_edema")
	private String chkEdema;  
	
	@Column(name = "chk_facial_pedal")
	private String chkFacial_Pedal;  
	
	@Column(name = "chk_sacral")
	private String chkSacral;  
	
	@Column(name = "chk_generalized")
	private String chkGeneralized;  
	
	@Column(name = "chk_cardio_other")
	private String chkCardioOther;  
	
	@Column(name = "chk_abnormality_gastrointestinal")
	private String chkAbnormalityGastrointestinal;  
	
	@Column(name = "chk_distention")
	private String chkDistention;  
	
	@Column(name = "chk_rigidity")
	private String chkRigidity;  
	
	@Column(name = "chk_dysphagia")
	private String chkDysphagia;  
	
	@Column(name = "chk_diarrhoea")
	private String chkDiarrhoea;  
	
	@Column(name = "chk_constipation")
	private String chkConstipation;  
	
	@Column(name = "chk_last")
	private String chkLast;  
	
	@Column(name = "chk_gastrointestinal_other")
	private String chkGastrointestinalOther;  
	
	@Column(name = "chk_abnormality_genitourinary")
	private String chkAbnormalityGenitourinary;  
	
	@Column(name = "chk_dysuria")
	private String chkDysuria;  
	
	@Column(name = "chk_hematuria")
	private String chkHematuria;  
	
	@Column(name = "chk_hesitancy")
	private String chkHesitancy;
	
	@Column(name = "chk_frequent")
	private String chkFrequent;  
	
	@Column(name = "chk_catheter")
	private String chkCatheter;  
	
	@Column(name = "chk_genitourinary_other")
	private String chkGenitourinaryOther;  
	
	@Column(name = "chk_menstrual")
	private String chkMenstrual;  
	
	@Column(name = "chk_pregnancy")
	private String chkPregnancy;  
	
	@Column(name = "chk_lmp")
	private String chkLMP;  
	
	@Column(name = "chk_genitourinary_female_other")
	private String chkGenitourinaryFemaleOther;  
	
	@Column(name = "chk_abnormality_neurology")
	private String chkAbnormalityNeurology;  
	
	@Column(name = "chk_comatose")
	private String chkComatose;  
	
	@Column(name = "chk_semi_comatose")
	private String chkSemi_Comatose;  
	
	@Column(name = "chk_neurology_paralysed")
	private String chkNeurologyParalysed;  
	
	@Column(name = "chk_sedated")
	private String chkSedated;  
	
	@Column(name = "chk_lathargic")
	private String chkLathargic;  
	
	@Column(name = "chk_confused")
	private String chkConfused;  
	
	@Column(name = "chk_unsteady")
	private String chkUnsteady;  
	
	@Column(name = "chk_neurology_other")
	private String chkNeurologyOther;  
	
	@Column(name = "chk_abnormality_skin_extremities")
	private String chkAbnormalitySkin_Extremities;  
	
	@Column(name = "chk_prosthesis")
	private String chkProsthesis;  
	
	@Column(name = "chk_swelling")
	private String chkSwelling;  
	
	@Column(name = "chk_clubbing")
	private String chkClubbing;  
	
	@Column(name = "chk_cyanosis")
	private String chkCyanosis;  
	
	@Column(name = "chk_deformity")
	private String chkDeformity;  
	
	@Column(name = "chk_poor_turgor")
	private String chkPoor_Turgor;  
	
	@Column(name = "chk_skin_extremities_hot")
	private String chkSkin_ExtremitiesHot;  
	
	@Column(name = "chk_skin_extremities_cool")
	private String chkSkin_ExtremitiesCool;  
	
	@Column(name = "chkSkin_extremities_other")
	private String chkSkin_ExtremitiesOther;  
	
	@Column(name = "chk_referral_diet")
	private String chkReferralDiet;  
	
	@Column(name = "chk_physiotherapy")
	private String chkPhysiotherapy;  
	
	@Column(name = "chk_yoga")
	private String chkYoga;  
	
	@Column(name = "chk_counseler")
	private String chkCounseler;  
	
	@Column(name = "chk_referrals_pain_management")
	private String chkReferralsPain_Management;  
	
	@Column(name = "chk_referrals_others")
	private String chkReferralsOther;  
	
	@Column(name = "assessement_plan")
	private String txtAreaAssessemntPlan;  
	
	@Column(name = "nursing_diagnosis_plan")
	private String txtAreaNursing_DiagnosisPlan;  
	
	@Column(name = "planning_nursing")
	private String txtAreaPlanningNursing;  
	
	@Column(name = "intervention_nursing")
	private String txtAreaInterventionNursing;  
	
	@Column(name = "evaluation_plan")
	private String txtAreaEvaluationPlan;  
	
    public int getIdnursing_assessment_paediatric_page_two() {
		return idnursing_assessment_paediatric_page_two;
	}

	public void setIdnursing_assessment_paediatric_page_two(
			int idnursing_assessment_paediatric_page_two) {
		this.idnursing_assessment_paediatric_page_two = idnursing_assessment_paediatric_page_two;
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

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public String getMedicines() {
		return medicines;
	}

	public void setMedicines(String medicines) {
		this.medicines = medicines;
	}

	public String getChkAllergiesOther() {
		return chkAllergiesOther;
	}

	public void setChkAllergiesOther(String chkAllergiesOther) {
		this.chkAllergiesOther = chkAllergiesOther;
	}

	public String getTxtAllergiesSpecify() {
		return txtAllergiesSpecify;
	}

	public void setTxtAllergiesSpecify(String txtAllergiesSpecify) {
		this.txtAllergiesSpecify = txtAllergiesSpecify;
	}

	public String getChkAllergiesNotKnown() {
		return chkAllergiesNotKnown;
	}

	public void setChkAllergiesNotKnown(String chkAllergiesNotKnown) {
		this.chkAllergiesNotKnown = chkAllergiesNotKnown;
	}

	public String getChkBirthHistoryfullterm() {
		return chkBirthHistoryfullterm;
	}

	public void setChkBirthHistoryfullterm(String chkBirthHistoryfullterm) {
		this.chkBirthHistoryfullterm = chkBirthHistoryfullterm;
	}

	public String getChkBirthHistoryPreterm() {
		return chkBirthHistoryPreterm;
	}

	public void setChkBirthHistoryPreterm(String chkBirthHistoryPreterm) {
		this.chkBirthHistoryPreterm = chkBirthHistoryPreterm;
	}

	public String getChkBirthHistoryBirthCry() {
		return chkBirthHistoryBirthCry;
	}

	public void setChkBirthHistoryBirthCry(String chkBirthHistoryBirthCry) {
		this.chkBirthHistoryBirthCry = chkBirthHistoryBirthCry;
	}

	public String getChkNormalDelivery() {
		return chkNormalDelivery;
	}

	public void setChkNormalDelivery(String chkNormalDelivery) {
		this.chkNormalDelivery = chkNormalDelivery;
	}

	public String getChkDeliveryCeasarean() {
		return chkDeliveryCeasarean;
	}

	public void setChkDeliveryCeasarean(String chkDeliveryCeasarean) {
		this.chkDeliveryCeasarean = chkDeliveryCeasarean;
	}

	public String getChkDeliveryForceps() {
		return chkDeliveryForceps;
	}

	public void setChkDeliveryForceps(String chkDeliveryForceps) {
		this.chkDeliveryForceps = chkDeliveryForceps;
	}

	public String getChkDeliveryEpisiotomy() {
		return chkDeliveryEpisiotomy;
	}

	public void setChkDeliveryEpisiotomy(String chkDeliveryEpisiotomy) {
		this.chkDeliveryEpisiotomy = chkDeliveryEpisiotomy;
	}

	public String getChkDeliveryVaccum() {
		return chkDeliveryVaccum;
	}

	public void setChkDeliveryVaccum(String chkDeliveryVaccum) {
		this.chkDeliveryVaccum = chkDeliveryVaccum;
	}

	public String getChkImmunizationCompleted() {
		return chkImmunizationCompleted;
	}

	public void setChkImmunizationCompleted(String chkImmunizationCompleted) {
		this.chkImmunizationCompleted = chkImmunizationCompleted;
	}

	public String getTxtImmunizationDetailsIfNo() {
		return txtImmunizationDetailsIfNo;
	}

	public void setTxtImmunizationDetailsIfNo(String txtImmunizationDetailsIfNo) {
		this.txtImmunizationDetailsIfNo = txtImmunizationDetailsIfNo;
	}

	public String getChkDevelopmentHistoryweight() {
		return chkDevelopmentHistoryweight;
	}

	public void setChkDevelopmentHistoryweight(String chkDevelopmentHistoryweight) {
		this.chkDevelopmentHistoryweight = chkDevelopmentHistoryweight;
	}

	public String getChkDevelopmentHistoryHeight() {
		return chkDevelopmentHistoryHeight;
	}

	public void setChkDevelopmentHistoryHeight(String chkDevelopmentHistoryHeight) {
		this.chkDevelopmentHistoryHeight = chkDevelopmentHistoryHeight;
	}

	public String getChkDevelopmentHistoryChestCircumference() {
		return chkDevelopmentHistoryChestCircumference;
	}

	public void setChkDevelopmentHistoryChestCircumference(
			String chkDevelopmentHistoryChestCircumference) {
		this.chkDevelopmentHistoryChestCircumference = chkDevelopmentHistoryChestCircumference;
	}

	public String getTxtAreaDevelopmentHistoryDetailsifNo() {
		return txtAreaDevelopmentHistoryDetailsifNo;
	}

	public void setTxtAreaDevelopmentHistoryDetailsifNo(
			String txtAreaDevelopmentHistoryDetailsifNo) {
		this.txtAreaDevelopmentHistoryDetailsifNo = txtAreaDevelopmentHistoryDetailsifNo;
	}

	public String getChkNoAbnormalityDetectedForEye() {
		return chkNoAbnormalityDetectedForEye;
	}

	public void setChkNoAbnormalityDetectedForEye(
			String chkNoAbnormalityDetectedForEye) {
		this.chkNoAbnormalityDetectedForEye = chkNoAbnormalityDetectedForEye;
	}

	public String getChkImpairedEye() {
		return chkImpairedEye;
	}

	public void setChkImpairedEye(String chkImpairedEye) {
		this.chkImpairedEye = chkImpairedEye;
	}

	public String getChkEyeLenses() {
		return chkEyeLenses;
	}

	public void setChkEyeLenses(String chkEyeLenses) {
		this.chkEyeLenses = chkEyeLenses;
	}

	public String getChkEyeSpectacles() {
		return chkEyeSpectacles;
	}

	public void setChkEyeSpectacles(String chkEyeSpectacles) {
		this.chkEyeSpectacles = chkEyeSpectacles;
	}

	public String getChkBlind() {
		return chkBlind;
	}

	public void setChkBlind(String chkBlind) {
		this.chkBlind = chkBlind;
	}

	public String getChkDeaf() {
		return chkDeaf;
	}

	public void setChkDeaf(String chkDeaf) {
		this.chkDeaf = chkDeaf;
	}

	public String getChkHearingAid() {
		return chkHearingAid;
	}

	public void setChkHearingAid(String chkHearingAid) {
		this.chkHearingAid = chkHearingAid;
	}

	public String getChkChemoPort() {
		return chkChemoPort;
	}

	public void setChkChemoPort(String chkChemoPort) {
		this.chkChemoPort = chkChemoPort;
	}

	public String getChkOrthopedicImpl() {
		return chkOrthopedicImpl;
	}

	public void setChkOrthopedicImpl(String chkOrthopedicImpl) {
		this.chkOrthopedicImpl = chkOrthopedicImpl;
	}

	public String getTxtImplants() {
		return txtImplants;
	}

	public void setTxtImplants(String txtImplants) {
		this.txtImplants = txtImplants;
	}

	public String getChkOthereye() {
		return chkOthereye;
	}

	public void setChkOthereye(String chkOthereye) {
		this.chkOthereye = chkOthereye;
	}

	public String getTxtOthereye() {
		return txtOthereye;
	}

	public void setTxtOthereye(String txtOthereye) {
		this.txtOthereye = txtOthereye;
	}

	public String getChkAbnormalityRespiratory() {
		return chkAbnormalityRespiratory;
	}

	public void setChkAbnormalityRespiratory(String chkAbnormalityRespiratory) {
		this.chkAbnormalityRespiratory = chkAbnormalityRespiratory;
	}

	public String getChkDyspnea() {
		return chkDyspnea;
	}

	public void setChkDyspnea(String chkDyspnea) {
		this.chkDyspnea = chkDyspnea;
	}

	public String getChkWheezes() {
		return chkWheezes;
	}

	public void setChkWheezes(String chkWheezes) {
		this.chkWheezes = chkWheezes;
	}

	public String getChkAsymmetric() {
		return chkAsymmetric;
	}

	public void setChkAsymmetric(String chkAsymmetric) {
		this.chkAsymmetric = chkAsymmetric;
	}

	public String getChkCough() {
		return chkCough;
	}

	public void setChkCough(String chkCough) {
		this.chkCough = chkCough;
	}

	public String getChkSputum() {
		return chkSputum;
	}

	public void setChkSputum(String chkSputum) {
		this.chkSputum = chkSputum;
	}

	public String getTxtOtherRespiratory() {
		return txtOtherRespiratory;
	}

	public void setTxtOtherRespiratory(String txtOtherRespiratory) {
		this.txtOtherRespiratory = txtOtherRespiratory;
	}

	public String getChkOtherRespiratory() {
		return chkOtherRespiratory;
	}

	public void setChkOtherRespiratory(String chkOtherRespiratory) {
		this.chkOtherRespiratory = chkOtherRespiratory;
	}

	public String getChkAbnormalityCardioVascular() {
		return chkAbnormalityCardioVascular;
	}

	public void setChkAbnormalityCardioVascular(String chkAbnormalityCardioVascular) {
		this.chkAbnormalityCardioVascular = chkAbnormalityCardioVascular;
	}

	public String getChkTachycardia() {
		return chkTachycardia;
	}

	public void setChkTachycardia(String chkTachycardia) {
		this.chkTachycardia = chkTachycardia;
	}

	public String getChkBradycardia() {
		return chkBradycardia;
	}

	public void setChkBradycardia(String chkBradycardia) {
		this.chkBradycardia = chkBradycardia;
	}

	public String getChkEdema() {
		return chkEdema;
	}

	public void setChkEdema(String chkEdema) {
		this.chkEdema = chkEdema;
	}

	public String getChkFacial_Pedal() {
		return chkFacial_Pedal;
	}

	public void setChkFacial_Pedal(String chkFacial_Pedal) {
		this.chkFacial_Pedal = chkFacial_Pedal;
	}

	public String getChkSacral() {
		return chkSacral;
	}

	public void setChkSacral(String chkSacral) {
		this.chkSacral = chkSacral;
	}

	public String getChkGeneralized() {
		return chkGeneralized;
	}

	public void setChkGeneralized(String chkGeneralized) {
		this.chkGeneralized = chkGeneralized;
	}

	public String getChkCardioOther() {
		return chkCardioOther;
	}

	public void setChkCardioOther(String chkCardioOther) {
		this.chkCardioOther = chkCardioOther;
	}

	public String getChkAbnormalityGastrointestinal() {
		return chkAbnormalityGastrointestinal;
	}

	public void setChkAbnormalityGastrointestinal(
			String chkAbnormalityGastrointestinal) {
		this.chkAbnormalityGastrointestinal = chkAbnormalityGastrointestinal;
	}

	public String getChkDistention() {
		return chkDistention;
	}

	public void setChkDistention(String chkDistention) {
		this.chkDistention = chkDistention;
	}

	public String getChkRigidity() {
		return chkRigidity;
	}

	public void setChkRigidity(String chkRigidity) {
		this.chkRigidity = chkRigidity;
	}

	public String getChkDysphagia() {
		return chkDysphagia;
	}

	public void setChkDysphagia(String chkDysphagia) {
		this.chkDysphagia = chkDysphagia;
	}

	public String getChkDiarrhoea() {
		return chkDiarrhoea;
	}

	public void setChkDiarrhoea(String chkDiarrhoea) {
		this.chkDiarrhoea = chkDiarrhoea;
	}

	public String getChkConstipation() {
		return chkConstipation;
	}

	public void setChkConstipation(String chkConstipation) {
		this.chkConstipation = chkConstipation;
	}

	public String getChkLast() {
		return chkLast;
	}

	public void setChkLast(String chkLast) {
		this.chkLast = chkLast;
	}

	public String getChkGastrointestinalOther() {
		return chkGastrointestinalOther;
	}

	public void setChkGastrointestinalOther(String chkGastrointestinalOther) {
		this.chkGastrointestinalOther = chkGastrointestinalOther;
	}

	public String getChkAbnormalityGenitourinary() {
		return chkAbnormalityGenitourinary;
	}

	public void setChkAbnormalityGenitourinary(String chkAbnormalityGenitourinary) {
		this.chkAbnormalityGenitourinary = chkAbnormalityGenitourinary;
	}

	public String getChkDysuria() {
		return chkDysuria;
	}

	public void setChkDysuria(String chkDysuria) {
		this.chkDysuria = chkDysuria;
	}

	public String getChkHematuria() {
		return chkHematuria;
	}

	public void setChkHematuria(String chkHematuria) {
		this.chkHematuria = chkHematuria;
	}

	public String getChkHesitancy() {
		return chkHesitancy;
	}

	public void setChkHesitancy(String chkHesitancy) {
		this.chkHesitancy = chkHesitancy;
	}

	public String getChkFrequent() {
		return chkFrequent;
	}

	public void setChkFrequent(String chkFrequent) {
		this.chkFrequent = chkFrequent;
	}

	public String getChkCatheter() {
		return chkCatheter;
	}

	public void setChkCatheter(String chkCatheter) {
		this.chkCatheter = chkCatheter;
	}

	public String getChkGenitourinaryOther() {
		return chkGenitourinaryOther;
	}

	public void setChkGenitourinaryOther(String chkGenitourinaryOther) {
		this.chkGenitourinaryOther = chkGenitourinaryOther;
	}

	public String getChkMenstrual() {
		return chkMenstrual;
	}

	public void setChkMenstrual(String chkMenstrual) {
		this.chkMenstrual = chkMenstrual;
	}

	public String getChkPregnancy() {
		return chkPregnancy;
	}

	public void setChkPregnancy(String chkPregnancy) {
		this.chkPregnancy = chkPregnancy;
	}

	public String getChkLMP() {
		return chkLMP;
	}

	public void setChkLMP(String chkLMP) {
		this.chkLMP = chkLMP;
	}

	public String getChkGenitourinaryFemaleOther() {
		return chkGenitourinaryFemaleOther;
	}

	public void setChkGenitourinaryFemaleOther(String chkGenitourinaryFemaleOther) {
		this.chkGenitourinaryFemaleOther = chkGenitourinaryFemaleOther;
	}

	public String getChkAbnormalityNeurology() {
		return chkAbnormalityNeurology;
	}

	public void setChkAbnormalityNeurology(String chkAbnormalityNeurology) {
		this.chkAbnormalityNeurology = chkAbnormalityNeurology;
	}

	public String getChkComatose() {
		return chkComatose;
	}

	public void setChkComatose(String chkComatose) {
		this.chkComatose = chkComatose;
	}

	public String getChkSemi_Comatose() {
		return chkSemi_Comatose;
	}

	public void setChkSemi_Comatose(String chkSemi_Comatose) {
		this.chkSemi_Comatose = chkSemi_Comatose;
	}

	public String getChkNeurologyParalysed() {
		return chkNeurologyParalysed;
	}

	public void setChkNeurologyParalysed(String chkNeurologyParalysed) {
		this.chkNeurologyParalysed = chkNeurologyParalysed;
	}

	public String getChkSedated() {
		return chkSedated;
	}

	public void setChkSedated(String chkSedated) {
		this.chkSedated = chkSedated;
	}

	public String getChkLathargic() {
		return chkLathargic;
	}

	public void setChkLathargic(String chkLathargic) {
		this.chkLathargic = chkLathargic;
	}

	public String getChkConfused() {
		return chkConfused;
	}

	public void setChkConfused(String chkConfused) {
		this.chkConfused = chkConfused;
	}

	public String getChkUnsteady() {
		return chkUnsteady;
	}

	public void setChkUnsteady(String chkUnsteady) {
		this.chkUnsteady = chkUnsteady;
	}

	public String getChkNeurologyOther() {
		return chkNeurologyOther;
	}

	public void setChkNeurologyOther(String chkNeurologyOther) {
		this.chkNeurologyOther = chkNeurologyOther;
	}

	public String getChkAbnormalitySkin_Extremities() {
		return chkAbnormalitySkin_Extremities;
	}

	public void setChkAbnormalitySkin_Extremities(
			String chkAbnormalitySkin_Extremities) {
		this.chkAbnormalitySkin_Extremities = chkAbnormalitySkin_Extremities;
	}

	public String getChkProsthesis() {
		return chkProsthesis;
	}

	public void setChkProsthesis(String chkProsthesis) {
		this.chkProsthesis = chkProsthesis;
	}

	public String getChkSwelling() {
		return chkSwelling;
	}

	public void setChkSwelling(String chkSwelling) {
		this.chkSwelling = chkSwelling;
	}

	public String getChkClubbing() {
		return chkClubbing;
	}

	public void setChkClubbing(String chkClubbing) {
		this.chkClubbing = chkClubbing;
	}

	public String getChkCyanosis() {
		return chkCyanosis;
	}

	public void setChkCyanosis(String chkCyanosis) {
		this.chkCyanosis = chkCyanosis;
	}

	public String getChkDeformity() {
		return chkDeformity;
	}

	public void setChkDeformity(String chkDeformity) {
		this.chkDeformity = chkDeformity;
	}

	public String getChkPoor_Turgor() {
		return chkPoor_Turgor;
	}

	public void setChkPoor_Turgor(String chkPoor_Turgor) {
		this.chkPoor_Turgor = chkPoor_Turgor;
	}

	public String getChkSkin_ExtremitiesHot() {
		return chkSkin_ExtremitiesHot;
	}

	public void setChkSkin_ExtremitiesHot(String chkSkin_ExtremitiesHot) {
		this.chkSkin_ExtremitiesHot = chkSkin_ExtremitiesHot;
	}

	public String getChkSkin_ExtremitiesCool() {
		return chkSkin_ExtremitiesCool;
	}

	public void setChkSkin_ExtremitiesCool(String chkSkin_ExtremitiesCool) {
		this.chkSkin_ExtremitiesCool = chkSkin_ExtremitiesCool;
	}

	public String getChkSkin_ExtremitiesOther() {
		return chkSkin_ExtremitiesOther;
	}

	public void setChkSkin_ExtremitiesOther(String chkSkin_ExtremitiesOther) {
		this.chkSkin_ExtremitiesOther = chkSkin_ExtremitiesOther;
	}

	public String getChkReferralDiet() {
		return chkReferralDiet;
	}

	public void setChkReferralDiet(String chkReferralDiet) {
		this.chkReferralDiet = chkReferralDiet;
	}

	public String getChkPhysiotherapy() {
		return chkPhysiotherapy;
	}

	public void setChkPhysiotherapy(String chkPhysiotherapy) {
		this.chkPhysiotherapy = chkPhysiotherapy;
	}

	public String getChkYoga() {
		return chkYoga;
	}

	public void setChkYoga(String chkYoga) {
		this.chkYoga = chkYoga;
	}

	public String getChkCounseler() {
		return chkCounseler;
	}

	public void setChkCounseler(String chkCounseler) {
		this.chkCounseler = chkCounseler;
	}

	public String getChkReferralsPain_Management() {
		return chkReferralsPain_Management;
	}

	public void setChkReferralsPain_Management(String chkReferralsPain_Management) {
		this.chkReferralsPain_Management = chkReferralsPain_Management;
	}

	public String getChkReferralsOther() {
		return chkReferralsOther;
	}

	public void setChkReferralsOther(String chkReferralsOther) {
		this.chkReferralsOther = chkReferralsOther;
	}

	public String getTxtAreaAssessemntPlan() {
		return txtAreaAssessemntPlan;
	}

	public void setTxtAreaAssessemntPlan(String txtAreaAssessemntPlan) {
		this.txtAreaAssessemntPlan = txtAreaAssessemntPlan;
	}

	public String getTxtAreaNursing_DiagnosisPlan() {
		return txtAreaNursing_DiagnosisPlan;
	}

	public void setTxtAreaNursing_DiagnosisPlan(String txtAreaNursing_DiagnosisPlan) {
		this.txtAreaNursing_DiagnosisPlan = txtAreaNursing_DiagnosisPlan;
	}

	public String getTxtAreaPlanningNursing() {
		return txtAreaPlanningNursing;
	}

	public void setTxtAreaPlanningNursing(String txtAreaPlanningNursing) {
		this.txtAreaPlanningNursing = txtAreaPlanningNursing;
	}

	public String getTxtAreaInterventionNursing() {
		return txtAreaInterventionNursing;
	}

	public void setTxtAreaInterventionNursing(String txtAreaInterventionNursing) {
		this.txtAreaInterventionNursing = txtAreaInterventionNursing;
	}

	public String getTxtAreaEvaluationPlan() {
		return txtAreaEvaluationPlan;
	}

	public void setTxtAreaEvaluationPlan(String txtAreaEvaluationPlan) {
		this.txtAreaEvaluationPlan = txtAreaEvaluationPlan;
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

	public List<assessmentpediatric2DTO> getListpediatric2() {
		return listpediatric2;
	}

	public void setListpediatric2(List<assessmentpediatric2DTO> listpediatric2) {
		this.listpediatric2 = listpediatric2;
	}

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
	private List<assessmentpediatric2DTO> listpediatric2;

	
}