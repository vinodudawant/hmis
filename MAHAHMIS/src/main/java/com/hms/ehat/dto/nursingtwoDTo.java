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
@Table(name = "ehat_nursing_initial_assessmentpage_two")
//@JsonIgnoreProperties(ignoreUnknown=true)
public class nursingtwoDTo implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name ="idnursing_initial_assessment_two")
	private int idNursingInitialAssessmentTwo;
	
	
	@Column(name = "patient_id")
	private int pId;

	@Column(name = "treatment_id")
	private int tId;

	@Column(name = "cat1val")
	private String cat1Val;
	
	@Column(name = "care1val")
	private String care1Val;

	@Column(name = "cat2val")
	private String cat2Val;
	
	@Column(name = "care2val")
	private String care2Val;
	
	@Column(name = "cat3val")
	private String cat3Val;
	
	@Column(name = "care3val")
	private String care3Val;
	
	@Column(name = "cat4val")
	private String cat4Val;
	
	@Column(name = "care4val")
	private String care4Val;
	
	@Column(name = "cat5val")
	private String cat5Val;
	
	@Column(name = "care5val")
	private String care5Val;
	
	@Column(name = "cat6val")
	private String cat6Val;
	
	@Column(name = "care6val")
	private String care6Val;
	
	@Column(name = "cat7val")
	private String cat7Val;
	
	@Column(name = "care7val")
	private String care7Val;
	
	@Column(name = "cat8val")
	private String cat8Val;
	
	@Column(name = "care8val")
	private String care8Val;
	
	@Column(name = "cat9val")
	private String cat9Val;
	
	@Column(name = "care9val")
	private String care9Val;
	
	@Column(name = "cat10val")
	private String cat10Val;
	
	@Column(name = "care10val")
	private String care10Val;
	
	@Column(name = "headinjuries")
	private String headInjuries;
	
	@Column(name = "mouthlesion")
	private String mouthLesion;
	
	@Column(name = "mouthdental")
	private String mouthDental;
	
	@Column(name = "mouthbleeding")
	private String mouthBleeding;
	
	@Column(name = "mouthtaking")
	private String mouthTaking;
	
	@Column(name = "mouthsense")
	private String mouthSense;
	
	@Column(name = "mouthdentures")
	private String mouthDentures;
	
	@Column(name = "mouthother")
	private String mouthOther;
	
	@Column(name = "eyeblurred")
	private String eyeBlurred;
	
	@Column(name = "eyedouble")
	private String eyeDouble;
	
	@Column(name = "eyeinflammation")
	private String eyeInflammation;
	
	@Column(name = "eyecolour")
	private String eyeColour;
	
	@Column(name = "eyeitching")
	private String eyeItching;
	
	@Column(name = "eyeredness")
	private String eyeRedness;
	
	@Column(name = "eyepain")
	private String eyePain;
	
	@Column(name = "eyepupils")
	private String eyePupils;
	
	@Column(name = "eyeother")
	private String eyeOther;
	
	@Column(name = "eardeaf")
	private String earDeaf;
	
	@Column(name = "eartinnitus")
	private String earTinnitus;
	
	@Column(name = "eardizziness")
	private String earDizziness;
	
	@Column(name = "earpain")
	private String earPain;
	
	@Column(name = "earsense")
	private String earSense;
	
	@Column(name = "eardrainage")
	private String earDrainage;
	
	@Column(name = "earcolour")
	private String earColour;
	
	@Column(name = "earother")
	private String earOther;
	
	@Column(name = "nosebleed")
	private String noseBleed;
	
	@Column(name = "nosecongestion")
	private String noseCongestion;
	
	@Column(name = "nosepain")
	private String nosePain;
	
	@Column(name = "nosesinus")
	private String noseSinus;
	
	@Column(name = "nosedrainage")
	private String noseDrainage;
	
	@Column(name = "nosecolour")
	private String noseColour;
	
	@Column(name = "noseother")
	private String noseOther;
	
	@Column(name = "throatsore")
	private String throatSore;
	
	@Column(name = "throathoarseness")
	private String throatHoarseness;
	
	@Column(name = "throatlumps")
	private String throatLumps;
	
	@Column(name = "throatswollen")
	private String throatSwollen;
	
	@Column(name = "throatstiffness")
	private String throatStiffness;
	
	@Column(name = "throatpain")
	private String throatPain;
	
	@Column(name = "throatdysphagia")
	private String throatDysphagia;
	
	@Column(name = "throatother")
	private String throatOther;
	
	@Column(name = "boweldiarrhoea")
	private String bowelDiarrhoea;
	
	@Column(name = "bowelconstipation")
	private String bowelConstipation;
	
	@Column(name = "bowelincontinence")
	private String bowelIncontinence;
	
	@Column(name = "bowelblood")
	private String bowelBlood;
	
	@Column(name = "bowelnone")
	private String bowelNone;
	
	@Column(name = "bowelpain")
	private String bowelPain;
	
	@Column(name = "bowelhemorrhoids")
	private String bowelHemorrhoids;
	
	@Column(name = "bowelfrequency")
	private String bowelFrequency;
	
	@Column(name = "bowelinterNone")
	private String bowelInterNone;
	
	@Column(name = "bowellaxatives")
	private String bowelLaxatives;
	
	@Column(name = "bowelintertype")
	private String bowelInterType;
	
	@Column(name = "bowelinterfrequency")
	private String bowelInterFrequency;
	
	@Column(name = "skin_assessments")
	private String skinAssessments;
	
	
	public String getSkinAssessments() {
		return skinAssessments;
	}

	public void setSkinAssessments(String skinAssessments) {
		this.skinAssessments = skinAssessments;
	}

	@Transient
	private List<nursingtwoDTo> nursingtwolist;
	
	
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

	public String getCat1Val() {
		return cat1Val;
	}

	public void setCat1Val(String cat1Val) {
		this.cat1Val = cat1Val;
	}

	public String getCare1Val() {
		return care1Val;
	}

	public void setCare1Val(String care1Val) {
		this.care1Val = care1Val;
	}

	public String getCat2Val() {
		return cat2Val;
	}

	public void setCat2Val(String cat2Val) {
		this.cat2Val = cat2Val;
	}

	public String getCare2Val() {
		return care2Val;
	}

	public void setCare2Val(String care2Val) {
		this.care2Val = care2Val;
	}

	public String getCat3Val() {
		return cat3Val;
	}

	public void setCat3Val(String cat3Val) {
		this.cat3Val = cat3Val;
	}

	public String getCare3Val() {
		return care3Val;
	}

	public void setCare3Val(String care3Val) {
		this.care3Val = care3Val;
	}

	public String getCat4Val() {
		return cat4Val;
	}

	public void setCat4Val(String cat4Val) {
		this.cat4Val = cat4Val;
	}

	public String getCare4Val() {
		return care4Val;
	}

	public void setCare4Val(String care4Val) {
		this.care4Val = care4Val;
	}

	public String getCat5Val() {
		return cat5Val;
	}

	public void setCat5Val(String cat5Val) {
		this.cat5Val = cat5Val;
	}

	public String getCare5Val() {
		return care5Val;
	}

	public void setCare5Val(String care5Val) {
		this.care5Val = care5Val;
	}

	public String getCat6Val() {
		return cat6Val;
	}

	public void setCat6Val(String cat6Val) {
		this.cat6Val = cat6Val;
	}

	public String getCare6Val() {
		return care6Val;
	}

	public void setCare6Val(String care6Val) {
		this.care6Val = care6Val;
	}

	public String getCat7Val() {
		return cat7Val;
	}

	public void setCat7Val(String cat7Val) {
		this.cat7Val = cat7Val;
	}

	public String getCare7Val() {
		return care7Val;
	}

	public void setCare7Val(String care7Val) {
		this.care7Val = care7Val;
	}

	public String getCat8Val() {
		return cat8Val;
	}

	public void setCat8Val(String cat8Val) {
		this.cat8Val = cat8Val;
	}

	public String getCare8Val() {
		return care8Val;
	}

	public void setCare8Val(String care8Val) {
		this.care8Val = care8Val;
	}

	public String getCat9Val() {
		return cat9Val;
	}

	public void setCat9Val(String cat9Val) {
		this.cat9Val = cat9Val;
	}

	public String getCare9Val() {
		return care9Val;
	}

	public void setCare9Val(String care9Val) {
		this.care9Val = care9Val;
	}

	public String getCat10Val() {
		return cat10Val;
	}

	public void setCat10Val(String cat10Val) {
		this.cat10Val = cat10Val;
	}

	public String getCare10Val() {
		return care10Val;
	}

	public void setCare10Val(String care10Val) {
		this.care10Val = care10Val;
	}

	public String getHeadInjuries() {
		return headInjuries;
	}

	public void setHeadInjuries(String headInjuries) {
		this.headInjuries = headInjuries;
	}

	public String getMouthLesion() {
		return mouthLesion;
	}

	public void setMouthLesion(String mouthLesion) {
		this.mouthLesion = mouthLesion;
	}

	public String getMouthDental() {
		return mouthDental;
	}

	public void setMouthDental(String mouthDental) {
		this.mouthDental = mouthDental;
	}

	public String getMouthBleeding() {
		return mouthBleeding;
	}

	public void setMouthBleeding(String mouthBleeding) {
		this.mouthBleeding = mouthBleeding;
	}

	public String getMouthTaking() {
		return mouthTaking;
	}

	public void setMouthTaking(String mouthTaking) {
		this.mouthTaking = mouthTaking;
	}

	public String getMouthSense() {
		return mouthSense;
	}

	public void setMouthSense(String mouthSense) {
		this.mouthSense = mouthSense;
	}

	public String getMouthDentures() {
		return mouthDentures;
	}

	public void setMouthDentures(String mouthDentures) {
		this.mouthDentures = mouthDentures;
	}

	public String getMouthOther() {
		return mouthOther;
	}

	public void setMouthOther(String mouthOther) {
		this.mouthOther = mouthOther;
	}

	public String getEyeBlurred() {
		return eyeBlurred;
	}

	public void setEyeBlurred(String eyeBlurred) {
		this.eyeBlurred = eyeBlurred;
	}

	public String getEyeDouble() {
		return eyeDouble;
	}

	public void setEyeDouble(String eyeDouble) {
		this.eyeDouble = eyeDouble;
	}

	public String getEyeInflammation() {
		return eyeInflammation;
	}

	public void setEyeInflammation(String eyeInflammation) {
		this.eyeInflammation = eyeInflammation;
	}

	public String getEyeColour() {
		return eyeColour;
	}

	public void setEyeColour(String eyeColour) {
		this.eyeColour = eyeColour;
	}

	public String getEyeItching() {
		return eyeItching;
	}

	public void setEyeItching(String eyeItching) {
		this.eyeItching = eyeItching;
	}

	public String getEyeRedness() {
		return eyeRedness;
	}

	public void setEyeRedness(String eyeRedness) {
		this.eyeRedness = eyeRedness;
	}

	public String getEyePain() {
		return eyePain;
	}

	public void setEyePain(String eyePain) {
		this.eyePain = eyePain;
	}

	public String getEyePupils() {
		return eyePupils;
	}

	public void setEyePupils(String eyePupils) {
		this.eyePupils = eyePupils;
	}

	public String getEyeOther() {
		return eyeOther;
	}

	public void setEyeOther(String eyeOther) {
		this.eyeOther = eyeOther;
	}

	public String getEarDeaf() {
		return earDeaf;
	}

	public void setEarDeaf(String earDeaf) {
		this.earDeaf = earDeaf;
	}

	public String getEarTinnitus() {
		return earTinnitus;
	}

	public void setEarTinnitus(String earTinnitus) {
		this.earTinnitus = earTinnitus;
	}

	public String getEarDizziness() {
		return earDizziness;
	}

	public void setEarDizziness(String earDizziness) {
		this.earDizziness = earDizziness;
	}

	public String getEarPain() {
		return earPain;
	}

	public void setEarPain(String earPain) {
		this.earPain = earPain;
	}

	public String getEarSense() {
		return earSense;
	}

	public void setEarSense(String earSense) {
		this.earSense = earSense;
	}

	public String getEarDrainage() {
		return earDrainage;
	}

	public void setEarDrainage(String earDrainage) {
		this.earDrainage = earDrainage;
	}

	public String getEarColour() {
		return earColour;
	}

	public void setEarColour(String earColour) {
		this.earColour = earColour;
	}

	public String getEarOther() {
		return earOther;
	}

	public void setEarOther(String earOther) {
		this.earOther = earOther;
	}

	public String getNoseBleed() {
		return noseBleed;
	}

	public void setNoseBleed(String noseBleed) {
		this.noseBleed = noseBleed;
	}

	public String getNoseCongestion() {
		return noseCongestion;
	}

	public void setNoseCongestion(String noseCongestion) {
		this.noseCongestion = noseCongestion;
	}

	public String getNosePain() {
		return nosePain;
	}

	public void setNosePain(String nosePain) {
		this.nosePain = nosePain;
	}

	public String getNoseSinus() {
		return noseSinus;
	}

	public void setNoseSinus(String noseSinus) {
		this.noseSinus = noseSinus;
	}

	public String getNoseDrainage() {
		return noseDrainage;
	}

	public void setNoseDrainage(String noseDrainage) {
		this.noseDrainage = noseDrainage;
	}

	public String getNoseColour() {
		return noseColour;
	}

	public void setNoseColour(String noseColour) {
		this.noseColour = noseColour;
	}

	public String getNoseOther() {
		return noseOther;
	}

	public void setNoseOther(String noseOther) {
		this.noseOther = noseOther;
	}

	public String getThroatSore() {
		return throatSore;
	}

	public void setThroatSore(String throatSore) {
		this.throatSore = throatSore;
	}

	public String getThroatHoarseness() {
		return throatHoarseness;
	}

	public void setThroatHoarseness(String throatHoarseness) {
		this.throatHoarseness = throatHoarseness;
	}

	public String getThroatLumps() {
		return throatLumps;
	}

	public void setThroatLumps(String throatLumps) {
		this.throatLumps = throatLumps;
	}

	public String getThroatSwollen() {
		return throatSwollen;
	}

	public void setThroatSwollen(String throatSwollen) {
		this.throatSwollen = throatSwollen;
	}

	public String getThroatStiffness() {
		return throatStiffness;
	}

	public void setThroatStiffness(String throatStiffness) {
		this.throatStiffness = throatStiffness;
	}

	public String getThroatPain() {
		return throatPain;
	}

	public void setThroatPain(String throatPain) {
		this.throatPain = throatPain;
	}

	public String getThroatDysphagia() {
		return throatDysphagia;
	}

	public void setThroatDysphagia(String throatDysphagia) {
		this.throatDysphagia = throatDysphagia;
	}

	public String getThroatOther() {
		return throatOther;
	}

	public void setThroatOther(String throatOther) {
		this.throatOther = throatOther;
	}

	public String getBowelDiarrhoea() {
		return bowelDiarrhoea;
	}

	public void setBowelDiarrhoea(String bowelDiarrhoea) {
		this.bowelDiarrhoea = bowelDiarrhoea;
	}

	public String getBowelConstipation() {
		return bowelConstipation;
	}

	public void setBowelConstipation(String bowelConstipation) {
		this.bowelConstipation = bowelConstipation;
	}

	public String getBowelIncontinence() {
		return bowelIncontinence;
	}

	public void setBowelIncontinence(String bowelIncontinence) {
		this.bowelIncontinence = bowelIncontinence;
	}

	public String getBowelBlood() {
		return bowelBlood;
	}

	public void setBowelBlood(String bowelBlood) {
		this.bowelBlood = bowelBlood;
	}

	public String getBowelNone() {
		return bowelNone;
	}

	public void setBowelNone(String bowelNone) {
		this.bowelNone = bowelNone;
	}

	public String getBowelPain() {
		return bowelPain;
	}

	public void setBowelPain(String bowelPain) {
		this.bowelPain = bowelPain;
	}

	public String getBowelHemorrhoids() {
		return bowelHemorrhoids;
	}

	public void setBowelHemorrhoids(String bowelHemorrhoids) {
		this.bowelHemorrhoids = bowelHemorrhoids;
	}

	public String getBowelFrequency() {
		return bowelFrequency;
	}

	public void setBowelFrequency(String bowelFrequency) {
		this.bowelFrequency = bowelFrequency;
	}

	public String getBowelInterNone() {
		return bowelInterNone;
	}

	public void setBowelInterNone(String bowelInterNone) {
		this.bowelInterNone = bowelInterNone;
	}

	public String getBowelLaxatives() {
		return bowelLaxatives;
	}

	public void setBowelLaxatives(String bowelLaxatives) {
		this.bowelLaxatives = bowelLaxatives;
	}

	public String getBowelInterType() {
		return bowelInterType;
	}

	public void setBowelInterType(String bowelInterType) {
		this.bowelInterType = bowelInterType;
	}

	public String getBowelInterFrequency() {
		return bowelInterFrequency;
	}

	public void setBowelInterFrequency(String bowelInterFrequency) {
		this.bowelInterFrequency = bowelInterFrequency;
	}

	public List<nursingtwoDTo> getNursingtwolist() {
		return nursingtwolist;
	}

	public void setNursingtwolist(List<nursingtwoDTo> nursingtwolist) {
		this.nursingtwolist = nursingtwolist;
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

	public int getIdNursingInitialAssessmentTwo() {
		return idNursingInitialAssessmentTwo;
	}

	public void setIdNursingInitialAssessmentTwo(int idNursingInitialAssessmentTwo) {
		this.idNursingInitialAssessmentTwo = idNursingInitialAssessmentTwo;
	}


}