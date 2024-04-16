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
@Table(name = "ehat_nursing_initial_assessmentpage_three")
public class nursingthreeDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;

	

	@Id
	@GeneratedValue
	@Column(name ="idnursing_initial_assessment_three")
	private int idNursingInitialAssessmentThree;
	
	
	@Column(name = "patient_id")
	private int pId;

	@Column(name = "treatment_id")
	private int tId;
	
	@Column(name = "gasappetite")
	private String gasAppetite;
	
	@Column(name = "gasnausea")
	private String gasNausea;
	
	@Column(name = "gasvomiting")
	private String gasVomiting;
	
	@Column(name = "gasdistension")
	private String gasDistension;
	
	@Column(name = "gasheart")
	private String gasHeart;
	
	@Column(name = "gasflatus")
	private String gasFlatus;
	
	@Column(name = "gaspain")
	private String gasPain;
	
	@Column(name = "gasrectal")
	private String gasRectal;
	
	@Column(name = "gascolostomy")
	private String gasColostomy;
	
	@Column(name = "gasilleostomy")
	private String gasIlleostomy;
	
	@Column(name = "urinecolour")
	private String urineColour;
	
	@Column(name = "urinefrequency")
	private String urineFrequency;
	
	@Column(name = "urinepain")
	private String urinePain;
	
	@Column(name = "urineburning")
	private String urineBurning;
	
	@Column(name = "urineitching")
	private String urineItching;
	
	@Column(name = "urineurgency")
	private String urineUrgency;
	
	@Column(name = "urineincontinence")
	private String urineIncontinence;
	
	@Column(name = "urinenocturia")
	private String urineNocturia;
	
	@Column(name = "urineurostomy")
	private String urineUrostomy;
	
	@Column(name = "urinehistory")
	private String urineHistory;
	
	@Column(name = "urinehistoryUTI")
	private String urineHistoryUTI;
	
	@Column(name = "urinefoley")
	private String urineFoley;
	
	@Column(name = "urineinsertion")
	private String urineInsertion;
	
	@Column(name = "musvalskin")
	private String musValSkin;
	
	@Column(name = "muscolour")
	private String musColour;
	
	@Column(name = "mustingling")
	private String musTingling;
	
	@Column(name = "musweakness")
	private String musWeakness;
	
	@Column(name = "musdeformity")
	private String musDeformity;
	
	@Column(name = "muspain")
	private String musPain;
	
	@Column(name = "musstiffness")
	private String musStiffness;
	
	@Column(name = "musvaluses")
	private String musValUses;
	
	@Column(name = "musother")
	private String musOther;
	
	@Column(name = "reprolmp")
	private String reproLMP;
	
	@Column(name = "repromeno")
	private String reproMeno;
	
	@Column(name = "repromenodura")
	private String reproMenoDura;
	
	@Column(name = "reprodysme")
	private String reproDysme;
	
	@Column(name = "reproameno")
	private String reproAmeno;
	
	@Column(name = "reproamenoDura")
	private String reproAmenoDura;
	
	@Column(name = "reprovaginal")
	private String reproVaginal;
	
	@Column(name = "reproitching")
	private String reproItching;
	
	@Column(name = "reproother")
	private String reproOther;
	
	@Column(name = "cvsdiscomfort")
	private String cVSDiscomfort;
	
	@Column(name = "cvsoedema")
	private String cVSOedema;
	
	@Column(name = "cvsoedemaLoca")
	private String cVSOedemaLoca;
	
	@Column(name = "cvsother")
	private String cVSOther;
	
	@Column(name = "breastfeeding")
	private String breastFeeding;
	
	@Column(name = "breastlumps")
	private String breastLumps;
	
	@Column(name = "breastother")
	private String breastOther;
	
	@Column(name = "neurologiocal")
	private String neurologiocal;
	
	@Column(name = "neupsych")
	private String neuPsych;
	
	@Column(name = "neurologiocalpsy")
	private String neurologiocalPsy;
	
	@Column(name = "neupupils")
	private String neuPupils;
	
	@Column(name = "neudeviation")
	private String neuDeviation;
	
	@Column(name = "neurologiocalpupils")
	private String neurologiocalPupils;
	
	@Column(name = "neualert")
	private String neuAlert;
	
	@Column(name = "neulocother")
	private String neuLOCOther;
	
	@Column(name = "neuspeech")
	private String neuSpeech;
	
	@Column(name = "neugrips")
	private String neuGrips;
	
	@Column(name = "neufoot")
	private String neuFoot;
	
	@Column(name = "neugag")
	private String neuGag;
	
	@Column(name = "neuother")
	private String neuOther;
	
	@Column(name = "painassess")
	private String painAssess;
	
	@Column(name = "painasslocation")
	private String painAssLocation;
	
	@Column(name = "painassduration")
	private String painAssDuration;
	
	@Column(name = "painassessment")
	private String painAssessment;
	
	@Column(name = "exafactor")
	private String exaFactor;
	
	@Column(name = "painrelivering")
	private String painRelivering;
	
	@Column(name = "dailyroutine")
	private String dailyRoutine;
	
	@Column(name = "sleep")
	private String sleep;
	
	@Column(name = "paincauses")
	private String painCauses;
	
	@Column(name = "plans")
	private String plans;
	
	@Column(name = "painscale")
	private String painScale;
	
	

	@Transient
	private List<nursingthreeDTO> nursingthreelist;
	
	
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

	public int getIdNursingInitialAssessmentThree() {
		return idNursingInitialAssessmentThree;
	}

	public void setIdNursingInitialAssessmentThree(
			int idNursingInitialAssessmentThree) {
		this.idNursingInitialAssessmentThree = idNursingInitialAssessmentThree;
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

	public String getGasAppetite() {
		return gasAppetite;
	}

	public void setGasAppetite(String gasAppetite) {
		this.gasAppetite = gasAppetite;
	}

	public String getGasNausea() {
		return gasNausea;
	}

	public void setGasNausea(String gasNausea) {
		this.gasNausea = gasNausea;
	}

	public String getGasVomiting() {
		return gasVomiting;
	}

	public void setGasVomiting(String gasVomiting) {
		this.gasVomiting = gasVomiting;
	}

	public String getGasDistension() {
		return gasDistension;
	}

	public void setGasDistension(String gasDistension) {
		this.gasDistension = gasDistension;
	}

	public String getGasHeart() {
		return gasHeart;
	}

	public void setGasHeart(String gasHeart) {
		this.gasHeart = gasHeart;
	}

	public String getGasFlatus() {
		return gasFlatus;
	}

	public void setGasFlatus(String gasFlatus) {
		this.gasFlatus = gasFlatus;
	}

	public String getGasPain() {
		return gasPain;
	}

	public void setGasPain(String gasPain) {
		this.gasPain = gasPain;
	}

	public String getGasRectal() {
		return gasRectal;
	}

	public void setGasRectal(String gasRectal) {
		this.gasRectal = gasRectal;
	}

	public String getGasColostomy() {
		return gasColostomy;
	}

	public void setGasColostomy(String gasColostomy) {
		this.gasColostomy = gasColostomy;
	}

	public String getGasIlleostomy() {
		return gasIlleostomy;
	}

	public void setGasIlleostomy(String gasIlleostomy) {
		this.gasIlleostomy = gasIlleostomy;
	}

	public String getUrineColour() {
		return urineColour;
	}

	public void setUrineColour(String urineColour) {
		this.urineColour = urineColour;
	}

	public String getUrineFrequency() {
		return urineFrequency;
	}

	public void setUrineFrequency(String urineFrequency) {
		this.urineFrequency = urineFrequency;
	}

	public String getUrinePain() {
		return urinePain;
	}

	public void setUrinePain(String urinePain) {
		this.urinePain = urinePain;
	}

	public String getUrineBurning() {
		return urineBurning;
	}

	public void setUrineBurning(String urineBurning) {
		this.urineBurning = urineBurning;
	}

	public String getUrineItching() {
		return urineItching;
	}

	public void setUrineItching(String urineItching) {
		this.urineItching = urineItching;
	}

	public String getUrineUrgency() {
		return urineUrgency;
	}

	public void setUrineUrgency(String urineUrgency) {
		this.urineUrgency = urineUrgency;
	}

	public String getUrineIncontinence() {
		return urineIncontinence;
	}

	public void setUrineIncontinence(String urineIncontinence) {
		this.urineIncontinence = urineIncontinence;
	}

	public String getUrineNocturia() {
		return urineNocturia;
	}

	public void setUrineNocturia(String urineNocturia) {
		this.urineNocturia = urineNocturia;
	}

	public String getUrineUrostomy() {
		return urineUrostomy;
	}

	public void setUrineUrostomy(String urineUrostomy) {
		this.urineUrostomy = urineUrostomy;
	}

	public String getUrineHistory() {
		return urineHistory;
	}

	public void setUrineHistory(String urineHistory) {
		this.urineHistory = urineHistory;
	}

	public String getUrineHistoryUTI() {
		return urineHistoryUTI;
	}

	public void setUrineHistoryUTI(String urineHistoryUTI) {
		this.urineHistoryUTI = urineHistoryUTI;
	}

	public String getUrineFoley() {
		return urineFoley;
	}

	public void setUrineFoley(String urineFoley) {
		this.urineFoley = urineFoley;
	}

	public String getUrineInsertion() {
		return urineInsertion;
	}

	public void setUrineInsertion(String urineInsertion) {
		this.urineInsertion = urineInsertion;
	}

	public String getMusValSkin() {
		return musValSkin;
	}

	public void setMusValSkin(String musValSkin) {
		this.musValSkin = musValSkin;
	}

	public String getMusColour() {
		return musColour;
	}

	public void setMusColour(String musColour) {
		this.musColour = musColour;
	}

	public String getMusTingling() {
		return musTingling;
	}

	public void setMusTingling(String musTingling) {
		this.musTingling = musTingling;
	}

	public String getMusWeakness() {
		return musWeakness;
	}

	public void setMusWeakness(String musWeakness) {
		this.musWeakness = musWeakness;
	}

	public String getMusDeformity() {
		return musDeformity;
	}

	public void setMusDeformity(String musDeformity) {
		this.musDeformity = musDeformity;
	}

	public String getMusPain() {
		return musPain;
	}

	public void setMusPain(String musPain) {
		this.musPain = musPain;
	}

	public String getMusStiffness() {
		return musStiffness;
	}

	public void setMusStiffness(String musStiffness) {
		this.musStiffness = musStiffness;
	}

	public String getMusValUses() {
		return musValUses;
	}

	public void setMusValUses(String musValUses) {
		this.musValUses = musValUses;
	}

	public String getMusOther() {
		return musOther;
	}

	public void setMusOther(String musOther) {
		this.musOther = musOther;
	}

	public String getReproLMP() {
		return reproLMP;
	}

	public void setReproLMP(String reproLMP) {
		this.reproLMP = reproLMP;
	}

	public String getReproMeno() {
		return reproMeno;
	}

	public void setReproMeno(String reproMeno) {
		this.reproMeno = reproMeno;
	}

	public String getReproMenoDura() {
		return reproMenoDura;
	}

	public void setReproMenoDura(String reproMenoDura) {
		this.reproMenoDura = reproMenoDura;
	}

	public String getReproDysme() {
		return reproDysme;
	}

	public void setReproDysme(String reproDysme) {
		this.reproDysme = reproDysme;
	}

	public String getReproAmeno() {
		return reproAmeno;
	}

	public void setReproAmeno(String reproAmeno) {
		this.reproAmeno = reproAmeno;
	}

	public String getReproAmenoDura() {
		return reproAmenoDura;
	}

	public void setReproAmenoDura(String reproAmenoDura) {
		this.reproAmenoDura = reproAmenoDura;
	}

	public String getReproVaginal() {
		return reproVaginal;
	}

	public void setReproVaginal(String reproVaginal) {
		this.reproVaginal = reproVaginal;
	}

	public String getReproItching() {
		return reproItching;
	}

	public void setReproItching(String reproItching) {
		this.reproItching = reproItching;
	}

	public String getReproOther() {
		return reproOther;
	}

	public void setReproOther(String reproOther) {
		this.reproOther = reproOther;
	}

	public String getcVSDiscomfort() {
		return cVSDiscomfort;
	}

	public void setcVSDiscomfort(String cVSDiscomfort) {
		this.cVSDiscomfort = cVSDiscomfort;
	}

	public String getcVSOedema() {
		return cVSOedema;
	}

	public void setcVSOedema(String cVSOedema) {
		this.cVSOedema = cVSOedema;
	}

	public String getcVSOedemaLoca() {
		return cVSOedemaLoca;
	}

	public void setcVSOedemaLoca(String cVSOedemaLoca) {
		this.cVSOedemaLoca = cVSOedemaLoca;
	}

	public String getcVSOther() {
		return cVSOther;
	}

	public void setcVSOther(String cVSOther) {
		this.cVSOther = cVSOther;
	}

	public String getBreastFeeding() {
		return breastFeeding;
	}

	public void setBreastFeeding(String breastFeeding) {
		this.breastFeeding = breastFeeding;
	}

	public String getBreastLumps() {
		return breastLumps;
	}

	public void setBreastLumps(String breastLumps) {
		this.breastLumps = breastLumps;
	}

	public String getBreastOther() {
		return breastOther;
	}

	public void setBreastOther(String breastOther) {
		this.breastOther = breastOther;
	}

	public String getNeurologiocal() {
		return neurologiocal;
	}

	public void setNeurologiocal(String neurologiocal) {
		this.neurologiocal = neurologiocal;
	}

	public String getNeuPsych() {
		return neuPsych;
	}

	public void setNeuPsych(String neuPsych) {
		this.neuPsych = neuPsych;
	}

	public String getNeurologiocalPsy() {
		return neurologiocalPsy;
	}

	public void setNeurologiocalPsy(String neurologiocalPsy) {
		this.neurologiocalPsy = neurologiocalPsy;
	}

	public String getNeuPupils() {
		return neuPupils;
	}

	public void setNeuPupils(String neuPupils) {
		this.neuPupils = neuPupils;
	}

	public String getNeuDeviation() {
		return neuDeviation;
	}

	public void setNeuDeviation(String neuDeviation) {
		this.neuDeviation = neuDeviation;
	}

	public String getNeurologiocalPupils() {
		return neurologiocalPupils;
	}

	public void setNeurologiocalPupils(String neurologiocalPupils) {
		this.neurologiocalPupils = neurologiocalPupils;
	}

	public String getNeuAlert() {
		return neuAlert;
	}

	public void setNeuAlert(String neuAlert) {
		this.neuAlert = neuAlert;
	}

	public String getNeuLOCOther() {
		return neuLOCOther;
	}

	public void setNeuLOCOther(String neuLOCOther) {
		this.neuLOCOther = neuLOCOther;
	}

	public String getNeuSpeech() {
		return neuSpeech;
	}

	public void setNeuSpeech(String neuSpeech) {
		this.neuSpeech = neuSpeech;
	}

	public String getNeuGrips() {
		return neuGrips;
	}

	public void setNeuGrips(String neuGrips) {
		this.neuGrips = neuGrips;
	}

	public String getNeuFoot() {
		return neuFoot;
	}

	public void setNeuFoot(String neuFoot) {
		this.neuFoot = neuFoot;
	}

	public String getNeuGag() {
		return neuGag;
	}

	public void setNeuGag(String neuGag) {
		this.neuGag = neuGag;
	}

	public String getNeuOther() {
		return neuOther;
	}

	public void setNeuOther(String neuOther) {
		this.neuOther = neuOther;
	}

	public String getPainAssess() {
		return painAssess;
	}

	public void setPainAssess(String painAssess) {
		this.painAssess = painAssess;
	}

	public String getPainAssLocation() {
		return painAssLocation;
	}

	public void setPainAssLocation(String painAssLocation) {
		this.painAssLocation = painAssLocation;
	}

	public String getPainAssDuration() {
		return painAssDuration;
	}

	public void setPainAssDuration(String painAssDuration) {
		this.painAssDuration = painAssDuration;
	}

	public String getPainAssessment() {
		return painAssessment;
	}

	public void setPainAssessment(String painAssessment) {
		this.painAssessment = painAssessment;
	}

	public String getExaFactor() {
		return exaFactor;
	}

	public void setExaFactor(String exaFactor) {
		this.exaFactor = exaFactor;
	}

	public String getPainRelivering() {
		return painRelivering;
	}

	public void setPainRelivering(String painRelivering) {
		this.painRelivering = painRelivering;
	}

	public String getDailyRoutine() {
		return dailyRoutine;
	}

	public void setDailyRoutine(String dailyRoutine) {
		this.dailyRoutine = dailyRoutine;
	}

	public String getSleep() {
		return sleep;
	}

	public void setSleep(String sleep) {
		this.sleep = sleep;
	}

	public String getPainCauses() {
		return painCauses;
	}

	public void setPainCauses(String painCauses) {
		this.painCauses = painCauses;
	}

	public String getPlans() {
		return plans;
	}

	public void setPlans(String plans) {
		this.plans = plans;
	}

	public String getPainScale() {
		return painScale;
	}

	public void setPainScale(String painScale) {
		this.painScale = painScale;
	}

	public List<nursingthreeDTO> getNursingthreelist() {
		return nursingthreelist;
	}

	public void setNursingthreelist(List<nursingthreeDTO> nursingthreelist) {
		this.nursingthreelist = nursingthreelist;
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

