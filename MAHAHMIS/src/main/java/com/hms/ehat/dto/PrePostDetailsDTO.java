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
@Table(name = "ehat_pre_post_checklist")
public class PrePostDetailsDTO implements Serializable{
	
private static final long serialVersionUID = 1L;

@Id
@GeneratedValue
@Column(name ="idpre_post_checklist")
private int idpre_post_checklist;

public int getIdpre_post_checklist() {
	return idpre_post_checklist;
}

public void setIdpre_post_checklist(int idpre_post_checklist) {
	this.idpre_post_checklist = idpre_post_checklist;
}

@Column(name = "patient_id")
private int pId;

@Column(name = "treatment_id")
private int tId;

@Column(name = "diagnosis")
private String diagnosis;

@Column(name = "planed_surgery")
private String planedSurgery;

@Column(name = "preot2")
private String preOT2;

@Column(name = "preot3")
private String preOT3;

@Column(name = "preot4")
private String preOT4;

@Column(name = "preot5")
private String preOT5;

@Column(name = "preot6")
private String preOT6;

@Column(name = "preot7")
private String preOT7;

@Column(name = "preot8")
private String preOT8;

@Column(name = "preot9")
private String preOT9;

@Column(name = "preot10")
private String preOT10;

@Column(name = "preot11")
private String preOT11;

@Column(name = "preot12")
private String preOT12;

@Column(name = "preot13")
private String preOT13;

@Column(name = "preot14")
private String preOT14;

@Column(name = "preot15")
private String preOT15;

@Column(name = "preot16")
private String preOT16;

@Column(name = "preot17")
private String preOT17;

@Column(name = "preot18")
private String preOT18;

@Column(name = "preot19")
private String preOT19;

@Column(name = "preot20")
private String preOT20;

@Column(name = "preot21")
private String preOT21;

@Column(name = "preot22")
private String preOT22;

@Column(name = "preot23")
private String preOT23;

@Column(name = "preot24")
private String preOT24;

@Column(name = "preot25")
private String preOT25;

@Column(name = "preot26")
private String preOT26;

@Column(name = "preot27")
private String preOT27;

@Column(name = "preot28")
private String preOT28;


@Column(name = "afterot2")
private String afterOT2;

@Column(name = "afterot3")
private String afterOT3;

@Column(name = "afterot4")
private String afterOT4;

@Column(name = "afterot5")
private String afterOT5;

@Column(name = "afterot6")
private String afterOT6;

@Column(name = "afterot7")
private String afterOT7;

@Column(name = "afterot8")
private String afterOT8;

@Column(name = "afterot9")
private String afterOT9;

@Column(name = "afterot10")
private String afterOT10;

@Column(name = "afterot11")
private String afterOT11;

@Column(name = "afterot12")
private String afterOT12;

@Column(name = "afterot13")
private String afterOT13;

@Column(name = "afterot14")
private String afterOT14;

@Column(name = "afterot15")
private String afterOT15;

@Column(name = "afterot16")
private String afterOT16;

@Column(name = "afterot17")
private String afterOT17;

@Column(name = "afterot18")
private String afterOT18;

@Column(name = "afterot19")
private String afterOT19;

@Column(name = "afterot20")
private String afterOT20;

@Column(name = "afterot21")
private String afterOT21;

@Column(name = "afterot22")
private String afterOT22;

@Column(name = "afterot23")
private String afterOT23;

@Column(name = "afterot24")
private String afterOT24;

@Column(name = "afterot25")
private String afterOT25;

@Column(name = "afterot26")
private String afterOT26;

@Column(name = "afterot27")
private String afterOT27;

@Column(name = "afterot28")
private String afterOT28;

@Column(name = "height")
private String height;

@Column(name = "weight")
private String weight;

@Column(name = "preophr")
private String preOpHr;

@Column(name = "preoprr")
private String preOpRr;

@Column(name = "preopspo2")
private String preOpSpo2;

@Column(name = "preoptemp")
private String preOpTemp;

@Column(name = "preopbp")
private String preOpBp;

@Column(name = "preopbpprefix")
private String preOpBpprefix;

@Column(name = "postophr")
private String postOpHr;

@Column(name = "postoprr")
private String postOpRr;

@Column(name = "postopspo2")
private String postOpSpo2;

@Column(name = "postoptemp")
private String postOpTemp;

@Column(name = "postopbp")
private String postOpBp;

@Column(name = "postopbpprefix")
private String postOpBpPrefix;

@Column(name = "preoxygen")
private String preOxygen;

@Column(name = "postoxygen")
private String postOxygen;

@Column(name = "hivtest")
private String hivTest;

@Column(name = "hbsagtest")
private String hBsAgTest;

@Column(name = "hcvtest")
private String hCVTest;

@Column(name = "vdrltest")
private String vDRLTest;

@Column(name = "mrsatest")
private String mRSATest;

@Column(name = "prerbsl")
private String preRBSL;

@Column(name = "prerbslat")
private String preRBSLAt;

@Column(name = "postrbsls")
private String postRBSLs;

@Column(name = "postrbslAt")
private String postRBSLAt;

@Column(name = "nosolidafter")
private String noSolidAfter;

@Column(name = "noclearliquidafter")
private String noClearLiquidAfter;

@Column(name = "nbm")
private String nBM;

@Column(name = "ab_time")
private String aB_Time;

@Column(name = "enema_time")
private String enema_time;

@Column(name = "componenttype")
private String componentType;

@Column(name = "componentunit")
private String componentUnit;

@Column(name = "transfusedunit")
private String transfusedUnit;

@Column(name = "preyes")
private String preYes;

@Column(name = "postyes")
private String postyes;

@Column(name = "xray")
private String xray;

@Column(name = "usg")
private String uSG;

@Column(name = "ct")
private String ct;

@Column(name = "pet_ct")
private String pet_ct;

@Column(name = "mri")
private String mri;

@Column(name = "mammo")
private String mammo;

@Column(name = "ecg")
private String ecg;

@Column(name = "echo")
private String echo;

@Column(name = "drugallergies")
private String drugAllergies;

@Column(name = "allergies")
private String allergies;

@Column(name = "dentures")
private String dentures;

@Column(name = "bridge")
private String bridge;

@Column(name = "spectacle")
private String spectacle;

@Column(name = "contactlense")
private String contactLense;

@Column(name = "hearingaid")
private String hearingAid;

@Column(name = "jewelry")
private String jewelry;

@Column(name = "hairpins")
private String hairpins;

@Column(name = "wig")
private String wig;

@Column(name = "prosthesis")
private String prosthesis;

@Column(name = "implants")
private String implants;

@Transient
private List<PrePostDetailsDTO> nursinAssesmentList;

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

public String getDiagnosis() {
	return diagnosis;
}

public void setDiagnosis(String diagnosis) {
	this.diagnosis = diagnosis;
}

public String getPlanedSurgery() {
	return planedSurgery;
}

public void setPlanedSurgery(String planedSurgery) {
	this.planedSurgery = planedSurgery;
}


public String getPreOT2() {
	return preOT2;
}

public void setPreOT2(String preOT2) {
	this.preOT2 = preOT2;
}

public String getPreOT3() {
	return preOT3;
}

public void setPreOT3(String preOT3) {
	this.preOT3 = preOT3;
}

public String getPreOT4() {
	return preOT4;
}

public void setPreOT4(String preOT4) {
	this.preOT4 = preOT4;
}

public String getPreOT5() {
	return preOT5;
}

public void setPreOT5(String preOT5) {
	this.preOT5 = preOT5;
}

public String getPreOT6() {
	return preOT6;
}

public void setPreOT6(String preOT6) {
	this.preOT6 = preOT6;
}

public String getPreOT7() {
	return preOT7;
}

public void setPreOT7(String preOT7) {
	this.preOT7 = preOT7;
}

public String getPreOT8() {
	return preOT8;
}

public void setPreOT8(String preOT8) {
	this.preOT8 = preOT8;
}

public String getPreOT9() {
	return preOT9;
}

public void setPreOT9(String preOT9) {
	this.preOT9 = preOT9;
}

public String getPreOT10() {
	return preOT10;
}

public void setPreOT10(String preOT10) {
	this.preOT10 = preOT10;
}

public String getPreOT11() {
	return preOT11;
}

public void setPreOT11(String preOT11) {
	this.preOT11 = preOT11;
}

public String getPreOT12() {
	return preOT12;
}

public void setPreOT12(String preOT12) {
	this.preOT12 = preOT12;
}

public String getPreOT13() {
	return preOT13;
}

public void setPreOT13(String preOT13) {
	this.preOT13 = preOT13;
}

public String getPreOT14() {
	return preOT14;
}

public void setPreOT14(String preOT14) {
	this.preOT14 = preOT14;
}

public String getPreOT15() {
	return preOT15;
}

public void setPreOT15(String preOT15) {
	this.preOT15 = preOT15;
}

public String getPreOT16() {
	return preOT16;
}

public void setPreOT16(String preOT16) {
	this.preOT16 = preOT16;
}

public String getPreOT17() {
	return preOT17;
}

public void setPreOT17(String preOT17) {
	this.preOT17 = preOT17;
}

public String getPreOT18() {
	return preOT18;
}

public void setPreOT18(String preOT18) {
	this.preOT18 = preOT18;
}

public String getPreOT19() {
	return preOT19;
}

public void setPreOT19(String preOT19) {
	this.preOT19 = preOT19;
}

public String getPreOT20() {
	return preOT20;
}

public void setPreOT20(String preOT20) {
	this.preOT20 = preOT20;
}

public String getPreOT21() {
	return preOT21;
}

public void setPreOT21(String preOT21) {
	this.preOT21 = preOT21;
}

public String getPreOT22() {
	return preOT22;
}

public void setPreOT22(String preOT22) {
	this.preOT22 = preOT22;
}

public String getPreOT23() {
	return preOT23;
}

public void setPreOT23(String preOT23) {
	this.preOT23 = preOT23;
}

public String getPreOT24() {
	return preOT24;
}

public void setPreOT24(String preOT24) {
	this.preOT24 = preOT24;
}

public String getPreOT25() {
	return preOT25;
}

public void setPreOT25(String preOT25) {
	this.preOT25 = preOT25;
}

public String getPreOT26() {
	return preOT26;
}

public void setPreOT26(String preOT26) {
	this.preOT26 = preOT26;
}

public String getPreOT27() {
	return preOT27;
}

public void setPreOT27(String preOT27) {
	this.preOT27 = preOT27;
}

public String getPreOT28() {
	return preOT28;
}

public void setPreOT28(String preOT28) {
	this.preOT28 = preOT28;
}


public String getAfterOT2() {
	return afterOT2;
}

public void setAfterOT2(String afterOT2) {
	this.afterOT2 = afterOT2;
}

public String getAfterOT3() {
	return afterOT3;
}

public void setAfterOT3(String afterOT3) {
	this.afterOT3 = afterOT3;
}

public String getAfterOT4() {
	return afterOT4;
}

public void setAfterOT4(String afterOT4) {
	this.afterOT4 = afterOT4;
}

public String getAfterOT5() {
	return afterOT5;
}

public void setAfterOT5(String afterOT5) {
	this.afterOT5 = afterOT5;
}

public String getAfterOT6() {
	return afterOT6;
}

public void setAfterOT6(String afterOT6) {
	this.afterOT6 = afterOT6;
}

public String getAfterOT7() {
	return afterOT7;
}

public void setAfterOT7(String afterOT7) {
	this.afterOT7 = afterOT7;
}

public String getAfterOT8() {
	return afterOT8;
}

public void setAfterOT8(String afterOT8) {
	this.afterOT8 = afterOT8;
}

public String getAfterOT9() {
	return afterOT9;
}

public void setAfterOT9(String afterOT9) {
	this.afterOT9 = afterOT9;
}

public String getAfterOT10() {
	return afterOT10;
}

public void setAfterOT10(String afterOT10) {
	this.afterOT10 = afterOT10;
}

public String getAfterOT11() {
	return afterOT11;
}

public void setAfterOT11(String afterOT11) {
	this.afterOT11 = afterOT11;
}

public String getAfterOT12() {
	return afterOT12;
}

public void setAfterOT12(String afterOT12) {
	this.afterOT12 = afterOT12;
}

public String getAfterOT13() {
	return afterOT13;
}

public void setAfterOT13(String afterOT13) {
	this.afterOT13 = afterOT13;
}

public String getAfterOT14() {
	return afterOT14;
}

public void setAfterOT14(String afterOT14) {
	this.afterOT14 = afterOT14;
}

public String getAfterOT15() {
	return afterOT15;
}

public void setAfterOT15(String afterOT15) {
	this.afterOT15 = afterOT15;
}

public String getAfterOT16() {
	return afterOT16;
}

public void setAfterOT16(String afterOT16) {
	this.afterOT16 = afterOT16;
}

public String getAfterOT17() {
	return afterOT17;
}

public void setAfterOT17(String afterOT17) {
	this.afterOT17 = afterOT17;
}

public String getAfterOT18() {
	return afterOT18;
}

public void setAfterOT18(String afterOT18) {
	this.afterOT18 = afterOT18;
}

public String getAfterOT19() {
	return afterOT19;
}

public void setAfterOT19(String afterOT19) {
	this.afterOT19 = afterOT19;
}

public String getAfterOT20() {
	return afterOT20;
}

public void setAfterOT20(String afterOT20) {
	this.afterOT20 = afterOT20;
}

public String getAfterOT21() {
	return afterOT21;
}

public void setAfterOT21(String afterOT21) {
	this.afterOT21 = afterOT21;
}

public String getAfterOT22() {
	return afterOT22;
}

public void setAfterOT22(String afterOT22) {
	this.afterOT22 = afterOT22;
}

public String getAfterOT23() {
	return afterOT23;
}

public void setAfterOT23(String afterOT23) {
	this.afterOT23 = afterOT23;
}

public String getAfterOT24() {
	return afterOT24;
}

public void setAfterOT24(String afterOT24) {
	this.afterOT24 = afterOT24;
}

public String getAfterOT25() {
	return afterOT25;
}

public void setAfterOT25(String afterOT25) {
	this.afterOT25 = afterOT25;
}

public String getAfterOT26() {
	return afterOT26;
}

public void setAfterOT26(String afterOT26) {
	this.afterOT26 = afterOT26;
}

public String getAfterOT27() {
	return afterOT27;
}

public void setAfterOT27(String afterOT27) {
	this.afterOT27 = afterOT27;
}

public String getAfterOT28() {
	return afterOT28;
}

public void setAfterOT28(String afterOT28) {
	this.afterOT28 = afterOT28;
}

public String getHeight() {
	return height;
}

public void setHeight(String height) {
	this.height = height;
}

public String getWeight() {
	return weight;
}

public void setWeight(String weight) {
	this.weight = weight;
}

public String getPreOpHr() {
	return preOpHr;
}

public void setPreOpHr(String preOpHr) {
	this.preOpHr = preOpHr;
}

public String getPreOpRr() {
	return preOpRr;
}

public void setPreOpRr(String preOpRr) {
	this.preOpRr = preOpRr;
}

public String getPreOpSpo2() {
	return preOpSpo2;
}

public void setPreOpSpo2(String preOpSpo2) {
	this.preOpSpo2 = preOpSpo2;
}

public String getPreOpTemp() {
	return preOpTemp;
}

public void setPreOpTemp(String preOpTemp) {
	this.preOpTemp = preOpTemp;
}

public String getPreOpBp() {
	return preOpBp;
}

public void setPreOpBp(String preOpBp) {
	this.preOpBp = preOpBp;
}

public String getPreOpBpprefix() {
	return preOpBpprefix;
}

public void setPreOpBpprefix(String preOpBpprefix) {
	this.preOpBpprefix = preOpBpprefix;
}

public String getPostOpHr() {
	return postOpHr;
}

public void setPostOpHr(String postOpHr) {
	this.postOpHr = postOpHr;
}

public String getPostOpRr() {
	return postOpRr;
}

public void setPostOpRr(String postOpRr) {
	this.postOpRr = postOpRr;
}

public String getPostOpSpo2() {
	return postOpSpo2;
}

public void setPostOpSpo2(String postOpSpo2) {
	this.postOpSpo2 = postOpSpo2;
}

public String getPostOpTemp() {
	return postOpTemp;
}

public void setPostOpTemp(String postOpTemp) {
	this.postOpTemp = postOpTemp;
}

public String getPostOpBp() {
	return postOpBp;
}

public void setPostOpBp(String postOpBp) {
	this.postOpBp = postOpBp;
}

public String getPostOpBpPrefix() {
	return postOpBpPrefix;
}

public void setPostOpBpPrefix(String postOpBpPrefix) {
	this.postOpBpPrefix = postOpBpPrefix;
}

public String getPreOxygen() {
	return preOxygen;
}

public void setPreOxygen(String preOxygen) {
	this.preOxygen = preOxygen;
}

public String getPostOxygen() {
	return postOxygen;
}

public void setPostOxygen(String postOxygen) {
	this.postOxygen = postOxygen;
}

public String getHivTest() {
	return hivTest;
}

public void setHivTest(String hivTest) {
	this.hivTest = hivTest;
}

public String gethBsAgTest() {
	return hBsAgTest;
}

public void sethBsAgTest(String hBsAgTest) {
	this.hBsAgTest = hBsAgTest;
}

public String gethCVTest() {
	return hCVTest;
}

public void sethCVTest(String hCVTest) {
	this.hCVTest = hCVTest;
}

public String getvDRLTest() {
	return vDRLTest;
}

public void setvDRLTest(String vDRLTest) {
	this.vDRLTest = vDRLTest;
}

public String getmRSATest() {
	return mRSATest;
}

public void setmRSATest(String mRSATest) {
	this.mRSATest = mRSATest;
}

public String getPreRBSL() {
	return preRBSL;
}

public void setPreRBSL(String preRBSL) {
	this.preRBSL = preRBSL;
}

public String getPreRBSLAt() {
	return preRBSLAt;
}

public void setPreRBSLAt(String preRBSLAt) {
	this.preRBSLAt = preRBSLAt;
}

public String getPostRBSLs() {
	return postRBSLs;
}

public void setPostRBSLs(String postRBSLs) {
	this.postRBSLs = postRBSLs;
}

public String getPostRBSLAt() {
	return postRBSLAt;
}

public void setPostRBSLAt(String postRBSLAt) {
	this.postRBSLAt = postRBSLAt;
}

public String getNoSolidAfter() {
	return noSolidAfter;
}

public void setNoSolidAfter(String noSolidAfter) {
	this.noSolidAfter = noSolidAfter;
}

public String getNoClearLiquidAfter() {
	return noClearLiquidAfter;
}

public void setNoClearLiquidAfter(String noClearLiquidAfter) {
	this.noClearLiquidAfter = noClearLiquidAfter;
}

public String getnBM() {
	return nBM;
}

public void setnBM(String nBM) {
	this.nBM = nBM;
}

public String getaB_Time() {
	return aB_Time;
}

public void setaB_Time(String aB_Time) {
	this.aB_Time = aB_Time;
}

public String getEnema_time() {
	return enema_time;
}

public void setEnema_time(String enema_time) {
	this.enema_time = enema_time;
}

public String getComponentType() {
	return componentType;
}

public void setComponentType(String componentType) {
	this.componentType = componentType;
}

public String getComponentUnit() {
	return componentUnit;
}

public void setComponentUnit(String componentUnit) {
	this.componentUnit = componentUnit;
}

public String getTransfusedUnit() {
	return transfusedUnit;
}

public void setTransfusedUnit(String transfusedUnit) {
	this.transfusedUnit = transfusedUnit;
}

public String getPreYes() {
	return preYes;
}

public void setPreYes(String preYes) {
	this.preYes = preYes;
}

public String getPostyes() {
	return postyes;
}

public void setPostyes(String postyes) {
	this.postyes = postyes;
}

public String getXray() {
	return xray;
}

public void setXray(String xray) {
	this.xray = xray;
}

public String getuSG() {
	return uSG;
}

public void setuSG(String uSG) {
	this.uSG = uSG;
}

public String getCt() {
	return ct;
}

public void setCt(String ct) {
	this.ct = ct;
}

public String getPet_ct() {
	return pet_ct;
}

public void setPet_ct(String pet_ct) {
	this.pet_ct = pet_ct;
}

public String getMri() {
	return mri;
}

public void setMri(String mri) {
	this.mri = mri;
}

public String getMammo() {
	return mammo;
}

public void setMammo(String mammo) {
	this.mammo = mammo;
}

public String getEcg() {
	return ecg;
}

public void setEcg(String ecg) {
	this.ecg = ecg;
}

public String getEcho() {
	return echo;
}

public void setEcho(String echo) {
	this.echo = echo;
}

public String getDrugAllergies() {
	return drugAllergies;
}

public void setDrugAllergies(String drugAllergies) {
	this.drugAllergies = drugAllergies;
}

public String getAllergies() {
	return allergies;
}

public void setAllergies(String allergies) {
	this.allergies = allergies;
}

public String getDentures() {
	return dentures;
}

public void setDentures(String dentures) {
	this.dentures = dentures;
}

public String getBridge() {
	return bridge;
}

public void setBridge(String bridge) {
	this.bridge = bridge;
}

public String getSpectacle() {
	return spectacle;
}

public void setSpectacle(String spectacle) {
	this.spectacle = spectacle;
}

public String getContactLense() {
	return contactLense;
}

public void setContactLense(String contactLense) {
	this.contactLense = contactLense;
}

public String getHearingAid() {
	return hearingAid;
}

public void setHearingAid(String hearingAid) {
	this.hearingAid = hearingAid;
}

public String getJewelry() {
	return jewelry;
}

public void setJewelry(String jewelry) {
	this.jewelry = jewelry;
}

public String getHairpins() {
	return hairpins;
}

public void setHairpins(String hairpins) {
	this.hairpins = hairpins;
}

public String getWig() {
	return wig;
}

public void setWig(String wig) {
	this.wig = wig;
}

public String getProsthesis() {
	return prosthesis;
}

public void setProsthesis(String prosthesis) {
	this.prosthesis = prosthesis;
}

public String getImplants() {
	return implants;
}

public void setImplants(String implants) {
	this.implants = implants;
}

public List<PrePostDetailsDTO> getNursinAssesmentList() {
	return nursinAssesmentList;
}

public void setNursinAssesmentList(List<PrePostDetailsDTO> nursinAssesmentList) {
	this.nursinAssesmentList = nursinAssesmentList;
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


@Column(name = "pre_time")
private String preTime;


@Column(name = "post_time")
private String postTime;

public String getPreTime() {
	return preTime;
}

public void setPreTime(String preTime) {
	this.preTime = preTime;
}

public String getPostTime() {
	return postTime;
}

public void setPostTime(String postTime) {
	this.postTime = postTime;
}



}