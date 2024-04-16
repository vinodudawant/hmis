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
@Table(name = "ehat_nursing_assessment_pediatric")

public class assessmentpediatricDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	@Column(name ="idnursing_assessment_paediatric")
	private int idnursing_assessment_paediatric;
	
	@Column(name = "patient_id")
	private int pId;
	
	@Column(name = "treatment_id")
	private int tId;
	
	@Column(name = "date_of_admission")
	private String dateOfAdmission;  
	
	@Column(name = "recieved_time")
	private String recievedTime; 
	
	@Column(name = "assessement_time")
	private String assessementTime;  
	
	@Column(name = "chkbox_genral_consent_signed")
	private String chkboxGenralConsentSigned;  
	
	@Column(name = "chkbox_for_id_band_tied")
	private String chkboxForIdBandTied;  
	
	@Column(name = "reason_of_admission")
	private String reasonOfAdmission;  
	
	@Column(name = "temprature")
	private String temprature1;  
	
	@Column(name = "pulse")
	private String pulse; 
	
	@Column(name = "rr")
	private String rR; 
	
	@Column(name = "spo2")
	private String spO2;  
	
	@Column(name = "blood_pressure")
	private String bloodp1;  
	
	@Column(name = "weight")
	private String weight1;  
	
	@Column(name = "height")
	private String height1;  
	
	@Column(name = "circumference")
	private String circumference;  
	
	@Column(name = "red_coloration_location")
	private String redColorationLocation;  
	
	@Column(name = "skin_break_only_location")
	private String skinBreakOnlyLocation;   
	
	@Column(name = "fat_exposed_location")
	private String fatExposedLocation;  
	
	@Column(name = "muscle_bone_exposed_location")
	private String muscle_BoneExposedLocation;   
	
	@Column(name = "red_coloration_stage")
	private String redColorationStage;  
	
	@Column(name = "skin_break_only_stage")
	private String skinBreakOnlyStage;  
	
	@Column(name = "fat_exposed_stage")
	private String fatExposedStage;  
	
	@Column(name = "muscle_bone_exposed_stage")
	private String muscle_BoneExposedStage;  
	
	@Column(name = "pressure_ulcer_management")
	private String pressureUlcerManagement;  
	
	@Column(name = "mode_of_movement")
	private String modeofMovement;  
	
	@Column(name = "other_movement")
	private String othermovement; 
	
	@Column(name = "dependency")
	private String dependency; 
	
	@Column(name = "level_of_consciousness")
	private String levelofConsciousness;  
	
	@Column(name = "chief_complain")
	private String chiefComplain;  
	
	@Column(name = "present_medication")
	private String presentMedication;  
	
	@Column(name = "physically_challenged")
	private String physicallyChallenged;  
	
	@Column(name = "low_height_bed")
	private String lowHeightbed;  
	
	@Column(name = "mentally_challenged")
	private String mentallyChallenged;  
	
	@Column(name = "nearer_to_nursing_station")
	private String nearertoNursingStation;  
	
	@Column(name = "terminally_ill")
	private String terminallyill;  
	
	@Column(name = "continous_monitoring")
	private String continousMonitoring;  
	
	@Column(name = "epileptic_fits")
	private String epilepticFits;  
	
	@Column(name = "full_time_attedndent")
	private String fullTimeAttedndent;  
	
	@Column(name = "immuno_compromised")
	private String immunocompromised;  
	
	@Column(name = "infection_control_precaution")
	private String infectionControlPrecaution;  
	
	@Column(name = "location_of_pain")
	private String locationOfPain;  
	
	@Column(name = "pain_score")
	private String painScore;  
	
	@Column(name = "pressure_score_present")
	private String pressureScorePresent;
	
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

	public int getIdnursing_assessment_paediatric() {
		return idnursing_assessment_paediatric;
	}

	public void setIdnursing_assessment_paediatric(
			int idnursing_assessment_paediatric) {
		this.idnursing_assessment_paediatric = idnursing_assessment_paediatric;
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

	public String getDateOfAdmission() {
		return dateOfAdmission;
	}

	public void setDateOfAdmission(String dateOfAdmission) {
		this.dateOfAdmission = dateOfAdmission;
	}

	public String getRecievedTime() {
		return recievedTime;
	}

	public void setRecievedTime(String recievedTime) {
		this.recievedTime = recievedTime;
	}

	public String getAssessementTime() {
		return assessementTime;
	}

	public void setAssessementTime(String assessementTime) {
		this.assessementTime = assessementTime;
	}

	public String getChkboxGenralConsentSigned() {
		return chkboxGenralConsentSigned;
	}

	public void setChkboxGenralConsentSigned(String chkboxGenralConsentSigned) {
		this.chkboxGenralConsentSigned = chkboxGenralConsentSigned;
	}

	public String getChkboxForIdBandTied() {
		return chkboxForIdBandTied;
	}

	public void setChkboxForIdBandTied(String chkboxForIdBandTied) {
		this.chkboxForIdBandTied = chkboxForIdBandTied;
	}

	public String getReasonOfAdmission() {
		return reasonOfAdmission;
	}

	public void setReasonOfAdmission(String reasonOfAdmission) {
		this.reasonOfAdmission = reasonOfAdmission;
	}

	public String getTemprature1() {
		return temprature1;
	}

	public void setTemprature1(String temprature1) {
		this.temprature1 = temprature1;
	}

	public String getPulse() {
		return pulse;
	}

	public void setPulse(String pulse) {
		this.pulse = pulse;
	}

	public String getrR() {
		return rR;
	}

	public void setrR(String rR) {
		this.rR = rR;
	}

	public String getSpO2() {
		return spO2;
	}

	public void setSpO2(String spO2) {
		this.spO2 = spO2;
	}

	public String getBloodp1() {
		return bloodp1;
	}

	public void setBloodp1(String bloodp1) {
		this.bloodp1 = bloodp1;
	}

	public String getWeight1() {
		return weight1;
	}

	public void setWeight1(String weight1) {
		this.weight1 = weight1;
	}

	public String getHeight1() {
		return height1;
	}

	public void setHeight1(String height1) {
		this.height1 = height1;
	}

	public String getCircumference() {
		return circumference;
	}

	public void setCircumference(String circumference) {
		this.circumference = circumference;
	}

	public String getRedColorationLocation() {
		return redColorationLocation;
	}

	public void setRedColorationLocation(String redColorationLocation) {
		this.redColorationLocation = redColorationLocation;
	}

	public String getSkinBreakOnlyLocation() {
		return skinBreakOnlyLocation;
	}

	public void setSkinBreakOnlyLocation(String skinBreakOnlyLocation) {
		this.skinBreakOnlyLocation = skinBreakOnlyLocation;
	}

	public String getFatExposedLocation() {
		return fatExposedLocation;
	}

	public void setFatExposedLocation(String fatExposedLocation) {
		this.fatExposedLocation = fatExposedLocation;
	}

	public String getMuscle_BoneExposedLocation() {
		return muscle_BoneExposedLocation;
	}

	public void setMuscle_BoneExposedLocation(String muscle_BoneExposedLocation) {
		this.muscle_BoneExposedLocation = muscle_BoneExposedLocation;
	}

	public String getRedColorationStage() {
		return redColorationStage;
	}

	public void setRedColorationStage(String redColorationStage) {
		this.redColorationStage = redColorationStage;
	}

	public String getSkinBreakOnlyStage() {
		return skinBreakOnlyStage;
	}

	public void setSkinBreakOnlyStage(String skinBreakOnlyStage) {
		this.skinBreakOnlyStage = skinBreakOnlyStage;
	}

	public String getFatExposedStage() {
		return fatExposedStage;
	}

	public void setFatExposedStage(String fatExposedStage) {
		this.fatExposedStage = fatExposedStage;
	}

	public String getMuscle_BoneExposedStage() {
		return muscle_BoneExposedStage;
	}

	public void setMuscle_BoneExposedStage(String muscle_BoneExposedStage) {
		this.muscle_BoneExposedStage = muscle_BoneExposedStage;
	}

	public String getPressureUlcerManagement() {
		return pressureUlcerManagement;
	}

	public void setPressureUlcerManagement(String pressureUlcerManagement) {
		this.pressureUlcerManagement = pressureUlcerManagement;
	}

	public String getModeofMovement() {
		return modeofMovement;
	}

	public void setModeofMovement(String modeofMovement) {
		this.modeofMovement = modeofMovement;
	}

	public String getOthermovement() {
		return othermovement;
	}

	public void setOthermovement(String othermovement) {
		this.othermovement = othermovement;
	}

	public String getDependency() {
		return dependency;
	}

	public void setDependency(String dependency) {
		this.dependency = dependency;
	}

	public String getLevelofConsciousness() {
		return levelofConsciousness;
	}

	public void setLevelofConsciousness(String levelofConsciousness) {
		this.levelofConsciousness = levelofConsciousness;
	}

	public String getChiefComplain() {
		return chiefComplain;
	}

	public void setChiefComplain(String chiefComplain) {
		this.chiefComplain = chiefComplain;
	}

	public String getPresentMedication() {
		return presentMedication;
	}

	public void setPresentMedication(String presentMedication) {
		this.presentMedication = presentMedication;
	}

	public String getPhysicallyChallenged() {
		return physicallyChallenged;
	}

	public void setPhysicallyChallenged(String physicallyChallenged) {
		this.physicallyChallenged = physicallyChallenged;
	}

	public String getLowHeightbed() {
		return lowHeightbed;
	}

	public void setLowHeightbed(String lowHeightbed) {
		this.lowHeightbed = lowHeightbed;
	}

	public String getMentallyChallenged() {
		return mentallyChallenged;
	}

	public void setMentallyChallenged(String mentallyChallenged) {
		this.mentallyChallenged = mentallyChallenged;
	}

	public String getNearertoNursingStation() {
		return nearertoNursingStation;
	}

	public void setNearertoNursingStation(String nearertoNursingStation) {
		this.nearertoNursingStation = nearertoNursingStation;
	}

	public String getTerminallyill() {
		return terminallyill;
	}

	public void setTerminallyill(String terminallyill) {
		this.terminallyill = terminallyill;
	}

	public String getContinousMonitoring() {
		return continousMonitoring;
	}

	public void setContinousMonitoring(String continousMonitoring) {
		this.continousMonitoring = continousMonitoring;
	}

	public String getEpilepticFits() {
		return epilepticFits;
	}

	public void setEpilepticFits(String epilepticFits) {
		this.epilepticFits = epilepticFits;
	}

	public String getFullTimeAttedndent() {
		return fullTimeAttedndent;
	}

	public void setFullTimeAttedndent(String fullTimeAttedndent) {
		this.fullTimeAttedndent = fullTimeAttedndent;
	}

	public String getImmunocompromised() {
		return immunocompromised;
	}

	public void setImmunocompromised(String immunocompromised) {
		this.immunocompromised = immunocompromised;
	}

	public String getInfectionControlPrecaution() {
		return infectionControlPrecaution;
	}

	public void setInfectionControlPrecaution(String infectionControlPrecaution) {
		this.infectionControlPrecaution = infectionControlPrecaution;
	}

	public String getLocationOfPain() {
		return locationOfPain;
	}

	public void setLocationOfPain(String locationOfPain) {
		this.locationOfPain = locationOfPain;
	}

	public String getPainScore() {
		return painScore;
	}

	public void setPainScore(String painScore) {
		this.painScore = painScore;
	}

	public String getPressureScorePresent() {
		return pressureScorePresent;
	}

	public void setPressureScorePresent(String pressureScorePresent) {
		this.pressureScorePresent = pressureScorePresent;
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

	

	@Column(name = "ip_address")
	private String ipAddress;
	
	@Transient
	private List<assessmentpediatricDTO> listpediatric;

	public List<assessmentpediatricDTO> getListpediatric() {
		return listpediatric;
	}

	public void setListpediatric(List<assessmentpediatricDTO> listpediatric) {
		this.listpediatric = listpediatric;
	} 

	
}
