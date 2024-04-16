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

import org.codehaus.jackson.annotate.JsonIgnoreProperties;


@Entity
@Table(name = "ehat_nursing_pagetwo_assessment")
//@JsonIgnoreProperties(ignoreUnknown=false)
public class nursingAsmentTwoDataDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;


	@Id
	@GeneratedValue
	@Column(name ="idNursing_Second_Assessment")
	private int idNursingSecondAssessment;
	
	@Column(name = "patient_id")
	private int pId;

	@Column(name = "treatment_id")
	private int tId;

	@Column(name = "Burns",columnDefinition="varchar(255)")
	private String Burns;
	
	@Column(name = "Scar",columnDefinition="varchar(255)")
	private String Scar;
	
	@Column(name = "Ulcer",columnDefinition="varchar(255)")
	private String Ulcer;
	
	@Column(name = "Laceration",columnDefinition="varchar(255)")
	private String Laceration;
	
	@Column(name = "Rash",columnDefinition="varchar(255)")
	private String Rash;
	
	@Column(name = "Vulnerability1",columnDefinition="varchar(255)")
	private String Vulnerability1;
	
	@Column(name = "Vulnerability2",columnDefinition="varchar(255)")
	private String Vulnerability2;
	
	@Column(name = "Vulnerability3",columnDefinition="varchar(255)")
	private String Vulnerability3;
	
	@Column(name = "Vulnerability4",columnDefinition="varchar(255)")
	private String Vulnerability4;
	
	@Column(name = "Vulnerability5",columnDefinition="varchar(255)")
	private String Vulnerability5;
	
	@Column(name = "Vulnerability6",columnDefinition="varchar(255)")
	private String Vulnerability6;
	
	@Column(name = "Vulnerability7",columnDefinition="varchar(255)")
	private String Vulnerability7;
	
	@Column(name = "Vulnerability8",columnDefinition="varchar(255)")
	private String Vulnerability8;
	
	@Column(name = "Vulnerability9",columnDefinition="varchar(255)")
	private String Vulnerability9;
	
	@Column(name = "Vulnerability10",columnDefinition="varchar(255)")
	private String Vulnerability10;
	
	@Column(name = "care1",columnDefinition="varchar(255)")
	private String care1;
	
	@Column(name = "care2",columnDefinition="varchar(255)")
	private String care2;
	
	@Column(name = "care3",columnDefinition="varchar(255)")
	private String care3;
	
	@Column(name = "care4",columnDefinition="varchar(255)")
	private String care4;
	
	@Column(name = "care5",columnDefinition="varchar(255)")
	private String care5;
	
	@Column(name = "care6",columnDefinition="varchar(255)")
	private String care6;
	
	@Column(name = "care7",columnDefinition="varchar(255)")
	private String care7;
	
	@Column(name = "care8",columnDefinition="varchar(255)")
	private String care8;
	
	@Column(name = "care9",columnDefinition="varchar(255)")
	private String care9;
	
	@Column(name = "care10",columnDefinition="varchar(255)")
	private String care10;
	
	@Column(name = "H_Vulnerability")
	private String HighVulnerability;
	
	@Column(name = "L_Vulnerability")
	private String LowVulnerability;
	
	@Column(name = "Lesion")
	private String Lesion;
	
	@Column(name = "Dental")
	private String Dental;
	
	@Column(name = "Bleeding")
	private String Bleeding;
	
	@Column(name = "Taking")
	private String Taking;
	
	@Column(name = "MouthSense")
	private String MouthSense;
	
	@Column(name = "Dentures")
	private String Dentures;
	
	@Column(name = "Blurred")
	private String Blurred;
	
	@Column(name = "Double1")
	private String Double1;
	
	@Column(name = "Inflammation")
	private String Inflammation;
	
	@Column(name = "EyeColour")
	private String EyeColour;
	
	@Column(name = "Itching")
	private String Itching;
	
	@Column(name = "Redness")
	private String Redness;
	
	@Column(name = "EyePain")
	private String EyePain;
	
	@Column(name = "Pupils")
	private String Pupils;
	
	@Column(name = "Deaf")
	private String Deaf;
	
	@Column(name = "Tinnitus")
	private String Tinnitus;
	
	@Column(name = "Dizziness")
	private String Dizziness;
	
	@Column(name = "EarPain")
	private String EarPain;
	
	@Column(name = "EarSense")
	private String EarSense;
	
	@Column(name = "Drainage")
	private String Drainage;
	
	@Column(name = "NoseBleed")
	private String NoseBleed;
	
	@Column(name = "NoseCongestion")
	private String NoseCongestion;
	
	@Column(name = "NosePain")
	private String NosePain;
	
	@Column(name = "NoseSinus")
	private String NoseSinus;
	
	@Column(name = "NoseDrainage")
	private String NoseDrainage;
	
	@Column(name = "ThroatSore")
	private String ThroatSore;
	
	@Column(name = "ThroatHoarseness")
	private String ThroatHoarseness;
	
	@Column(name = "ThroatLumps")
	private String ThroatLumps;
	
	@Column(name = "ThroatSwollen")
	private String ThroatSwollen;
	
	@Column(name = "ThroatStiffness")
	private String ThroatStiffness;
	
	@Column(name = "ThroatPain")
	private String ThroatPain;
	
	@Column(name = "ThroatDysphagia")
	private String ThroatDysphagia;
	
	@Column(name = "B_Diarrhoea")
	private String BowelDiarrhoea;
	
	@Column(name = "B_Constipation")
	private String BowelConstipation;
	
	@Column(name = "B_Incontinence")
	private String BowelIncontinence;
	
	@Column(name = "BowelBlood")
	private String BowelBlood;
	
	@Column(name = "BowelNone")
	private String BowelNone;
	
	@Column(name = "BowelPain")
	private String BowelPain;
	
	@Column(name = "B_Hemorrhoids")
	private String BowelHemorrhoids;
	
	@Column(name = "B_InterNone")
	private String BowelInterNone;
	
	@Column(name = "B_Laxatives")
	private String BowelLaxatives;
	
	@Column(name = "tCat")
	private String tCat;
	
	@Column(name = "tCare")
	private String tCare;
	
	@Column(name = "tYes")
	private String tYes;
	
	@Column(name = "Injuries")
	private String Injuries;
	
	@Column(name = "MouthOther")
	private String MouthOther;
	
	@Column(name = "EyeOther")
	private String EyeOther;
	
	@Column(name = "EarColour")
	private String EarColour;
	
	@Column(name = "EarOther")
	private String EarOther;
	
	@Column(name = "NoseColour")
	private String NoseColour;
	
	@Column(name = "NoseOther")
	private String NoseOther;
	
	@Column(name = "ThroatOther")
	private String ThroatOther;
	
	@Column(name = "B_Frequency")
	private String BowelFrequency;
	
	@Column(name = "B_InterType")
	private String BowelInterType;
	
	@Column(name = "B_InterFrequency")
	private String BowelInterFrequency;
	
		
	
	@Transient
	private List<nursingAsmentTwoDataDTO> nursinglist02;
	
	
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

	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;

	

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

	
	
	

	public int getIdNursingSecondAssessment() {
		return idNursingSecondAssessment;
	}

	public void setIdNursingSecondAssessment(int idNursingSecondAssessment) {
		this.idNursingSecondAssessment = idNursingSecondAssessment;
	}

	public String getBurns() {
		return Burns;
	}

	public void setBurns(String burns) {
		Burns = burns;
	}

	public String getScar() {
		return Scar;
	}

	public void setScar(String scar) {
		Scar = scar;
	}

	public String getUlcer() {
		return Ulcer;
	}

	public void setUlcer(String ulcer) {
		Ulcer = ulcer;
	}

	public String getLaceration() {
		return Laceration;
	}

	public void setLaceration(String laceration) {
		Laceration = laceration;
	}

	public String getRash() {
		return Rash;
	}

	public void setRash(String rash) {
		Rash = rash;
	}

	public String getVulnerability1() {
		return Vulnerability1;
	}

	public void setVulnerability1(String vulnerability1) {
		Vulnerability1 = vulnerability1;
	}

	public String getVulnerability2() {
		return Vulnerability2;
	}

	public void setVulnerability2(String vulnerability2) {
		Vulnerability2 = vulnerability2;
	}

	public String getVulnerability3() {
		return Vulnerability3;
	}

	public void setVulnerability3(String vulnerability3) {
		Vulnerability3 = vulnerability3;
	}

	public String getVulnerability4() {
		return Vulnerability4;
	}

	public void setVulnerability4(String vulnerability4) {
		Vulnerability4 = vulnerability4;
	}

	public String getVulnerability5() {
		return Vulnerability5;
	}

	public void setVulnerability5(String vulnerability5) {
		Vulnerability5 = vulnerability5;
	}

	public String getVulnerability6() {
		return Vulnerability6;
	}

	public void setVulnerability6(String vulnerability6) {
		Vulnerability6 = vulnerability6;
	}

	public String getVulnerability7() {
		return Vulnerability7;
	}

	public void setVulnerability7(String vulnerability7) {
		Vulnerability7 = vulnerability7;
	}

	public String getVulnerability8() {
		return Vulnerability8;
	}

	public void setVulnerability8(String vulnerability8) {
		Vulnerability8 = vulnerability8;
	}

	public String getVulnerability9() {
		return Vulnerability9;
	}

	public void setVulnerability9(String vulnerability9) {
		Vulnerability9 = vulnerability9;
	}

	public String getVulnerability10() {
		return Vulnerability10;
	}

	public void setVulnerability10(String vulnerability10) {
		Vulnerability10 = vulnerability10;
	}

	public String getCare1() {
		return care1;
	}

	public void setCare1(String care1) {
		this.care1 = care1;
	}

	public String getCare2() {
		return care2;
	}

	public void setCare2(String care2) {
		this.care2 = care2;
	}

	public String getCare3() {
		return care3;
	}

	public void setCare3(String care3) {
		this.care3 = care3;
	}

	public String getCare4() {
		return care4;
	}

	public void setCare4(String care4) {
		this.care4 = care4;
	}

	public String getCare5() {
		return care5;
	}

	public void setCare5(String care5) {
		this.care5 = care5;
	}

	public String getCare6() {
		return care6;
	}

	public void setCare6(String care6) {
		this.care6 = care6;
	}

	public String getCare7() {
		return care7;
	}

	public void setCare7(String care7) {
		this.care7 = care7;
	}

	public String getCare8() {
		return care8;
	}

	public void setCare8(String care8) {
		this.care8 = care8;
	}

	public String getCare9() {
		return care9;
	}

	public void setCare9(String care9) {
		this.care9 = care9;
	}

	public String getCare10() {
		return care10;
	}

	public void setCare10(String care10) {
		this.care10 = care10;
	}

	public String getHighVulnerability() {
		return HighVulnerability;
	}

	public void setHighVulnerability(String highVulnerability) {
		HighVulnerability = highVulnerability;
	}

	public String getLowVulnerability() {
		return LowVulnerability;
	}

	public void setLowVulnerability(String lowVulnerability) {
		LowVulnerability = lowVulnerability;
	}

	public String getLesion() {
		return Lesion;
	}

	public void setLesion(String lesion) {
		Lesion = lesion;
	}

	public String getDental() {
		return Dental;
	}

	public void setDental(String dental) {
		Dental = dental;
	}

	public String getBleeding() {
		return Bleeding;
	}

	public void setBleeding(String bleeding) {
		Bleeding = bleeding;
	}

	public String getTaking() {
		return Taking;
	}

	public void setTaking(String taking) {
		Taking = taking;
	}

	public String getMouthSense() {
		return MouthSense;
	}

	public void setMouthSense(String mouthSense) {
		MouthSense = mouthSense;
	}

	public String getDentures() {
		return Dentures;
	}

	public void setDentures(String dentures) {
		Dentures = dentures;
	}

	public String getBlurred() {
		return Blurred;
	}

	public void setBlurred(String blurred) {
		Blurred = blurred;
	}

	

	public String getDouble1() {
		return Double1;
	}

	public void setDouble1(String double1) {
		Double1 = double1;
	}

	public String getInflammation() {
		return Inflammation;
	}

	public void setInflammation(String inflammation) {
		Inflammation = inflammation;
	}

	public String getEyeColour() {
		return EyeColour;
	}

	public void setEyeColour(String eyeColour) {
		EyeColour = eyeColour;
	}

	public String getItching() {
		return Itching;
	}

	public void setItching(String itching) {
		Itching = itching;
	}

	public String getRedness() {
		return Redness;
	}

	public void setRedness(String redness) {
		Redness = redness;
	}

	public String getEyePain() {
		return EyePain;
	}

	public void setEyePain(String eyePain) {
		EyePain = eyePain;
	}

	public String getPupils() {
		return Pupils;
	}

	public void setPupils(String pupils) {
		Pupils = pupils;
	}

	public String getDeaf() {
		return Deaf;
	}

	public void setDeaf(String deaf) {
		Deaf = deaf;
	}

	public String getTinnitus() {
		return Tinnitus;
	}

	public void setTinnitus(String tinnitus) {
		Tinnitus = tinnitus;
	}

	public String getDizziness() {
		return Dizziness;
	}

	public void setDizziness(String dizziness) {
		Dizziness = dizziness;
	}

	public String getEarPain() {
		return EarPain;
	}

	public void setEarPain(String earPain) {
		EarPain = earPain;
	}

	public String getEarSense() {
		return EarSense;
	}

	public void setEarSense(String earSense) {
		EarSense = earSense;
	}

	public String getDrainage() {
		return Drainage;
	}

	public void setDrainage(String drainage) {
		Drainage = drainage;
	}

	public String getNoseBleed() {
		return NoseBleed;
	}

	public void setNoseBleed(String noseBleed) {
		NoseBleed = noseBleed;
	}

	public String getNoseCongestion() {
		return NoseCongestion;
	}

	public void setNoseCongestion(String noseCongestion) {
		NoseCongestion = noseCongestion;
	}

	public String getNosePain() {
		return NosePain;
	}

	public void setNosePain(String nosePain) {
		NosePain = nosePain;
	}

	public String getNoseSinus() {
		return NoseSinus;
	}

	public void setNoseSinus(String noseSinus) {
		NoseSinus = noseSinus;
	}

	public String getNoseDrainage() {
		return NoseDrainage;
	}

	public void setNoseDrainage(String noseDrainage) {
		NoseDrainage = noseDrainage;
	}

	public String getThroatSore() {
		return ThroatSore;
	}

	public void setThroatSore(String throatSore) {
		ThroatSore = throatSore;
	}

	public String getThroatHoarseness() {
		return ThroatHoarseness;
	}

	public void setThroatHoarseness(String throatHoarseness) {
		ThroatHoarseness = throatHoarseness;
	}

	public String getThroatLumps() {
		return ThroatLumps;
	}

	public void setThroatLumps(String throatLumps) {
		ThroatLumps = throatLumps;
	}

	public String getThroatSwollen() {
		return ThroatSwollen;
	}

	public void setThroatSwollen(String throatSwollen) {
		ThroatSwollen = throatSwollen;
	}

	public String getThroatStiffness() {
		return ThroatStiffness;
	}

	public void setThroatStiffness(String throatStiffness) {
		ThroatStiffness = throatStiffness;
	}

	public String getThroatPain() {
		return ThroatPain;
	}

	public void setThroatPain(String throatPain) {
		ThroatPain = throatPain;
	}

	public String getThroatDysphagia() {
		return ThroatDysphagia;
	}

	public void setThroatDysphagia(String throatDysphagia) {
		ThroatDysphagia = throatDysphagia;
	}

	public String getBowelDiarrhoea() {
		return BowelDiarrhoea;
	}

	public void setBowelDiarrhoea(String bowelDiarrhoea) {
		BowelDiarrhoea = bowelDiarrhoea;
	}

	public String getBowelConstipation() {
		return BowelConstipation;
	}

	public void setBowelConstipation(String bowelConstipation) {
		BowelConstipation = bowelConstipation;
	}

	public String getBowelIncontinence() {
		return BowelIncontinence;
	}

	public void setBowelIncontinence(String bowelIncontinence) {
		BowelIncontinence = bowelIncontinence;
	}

	public String getBowelBlood() {
		return BowelBlood;
	}

	public void setBowelBlood(String bowelBlood) {
		BowelBlood = bowelBlood;
	}

	public String getBowelNone() {
		return BowelNone;
	}

	public void setBowelNone(String bowelNone) {
		BowelNone = bowelNone;
	}

	public String getBowelPain() {
		return BowelPain;
	}

	public void setBowelPain(String bowelPain) {
		BowelPain = bowelPain;
	}

	public String getBowelHemorrhoids() {
		return BowelHemorrhoids;
	}

	public void setBowelHemorrhoids(String bowelHemorrhoids) {
		BowelHemorrhoids = bowelHemorrhoids;
	}

	public String getBowelInterNone() {
		return BowelInterNone;
	}

	public void setBowelInterNone(String bowelInterNone) {
		BowelInterNone = bowelInterNone;
	}

	public String getBowelLaxatives() {
		return BowelLaxatives;
	}

	public void setBowelLaxatives(String bowelLaxatives) {
		BowelLaxatives = bowelLaxatives;
	}

	public String gettCat() {
		return tCat;
	}

	public void settCat(String tCat) {
		this.tCat = tCat;
	}

	public String gettCare() {
		return tCare;
	}

	public void settCare(String tCare) {
		this.tCare = tCare;
	}

	public String gettYes() {
		return tYes;
	}

	public void settYes(String tYes) {
		this.tYes = tYes;
	}

	public String getInjuries() {
		return Injuries;
	}

	public void setInjuries(String injuries) {
		Injuries = injuries;
	}

	public String getMouthOther() {
		return MouthOther;
	}

	public void setMouthOther(String mouthOther) {
		MouthOther = mouthOther;
	}

	public String getEyeOther() {
		return EyeOther;
	}

	public void setEyeOther(String eyeOther) {
		EyeOther = eyeOther;
	}

	public String getEarColour() {
		return EarColour;
	}

	public void setEarColour(String earColour) {
		EarColour = earColour;
	}

	public String getEarOther() {
		return EarOther;
	}

	public void setEarOther(String earOther) {
		EarOther = earOther;
	}

	public String getNoseColour() {
		return NoseColour;
	}

	public void setNoseColour(String noseColour) {
		NoseColour = noseColour;
	}

	public String getNoseOther() {
		return NoseOther;
	}

	public void setNoseOther(String noseOther) {
		NoseOther = noseOther;
	}

	public String getThroatOther() {
		return ThroatOther;
	}

	public void setThroatOther(String throatOther) {
		ThroatOther = throatOther;
	}

	public String getBowelFrequency() {
		return BowelFrequency;
	}

	public void setBowelFrequency(String bowelFrequency) {
		BowelFrequency = bowelFrequency;
	}

	public String getBowelInterType() {
		return BowelInterType;
	}

	public void setBowelInterType(String bowelInterType) {
		BowelInterType = bowelInterType;
	}

	public String getBowelInterFrequency() {
		return BowelInterFrequency;
	}

	public void setBowelInterFrequency(String bowelInterFrequency) {
		BowelInterFrequency = bowelInterFrequency;
	}

	public List<nursingAsmentTwoDataDTO> getNursinglist02() {
		return nursinglist02;
	}

	public void setNursinglist02(List<nursingAsmentTwoDataDTO> nursinglist02) {
		this.nursinglist02 = nursinglist02;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
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
}