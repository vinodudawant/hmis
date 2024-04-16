package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.hms.dto.Doctor;
import com.hms.dto.Treatment;

@Entity
@Table(name = "pre_anaesthetic")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PreAnaesthetic implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idpre_anaesthetic")
	private int preanaesthetic_ID;

	@Transient
	private String ipd_no;

	@Column(name = "bloodgroup")
	private String bloodgroup;

	
	@Column(name = "prevanaes_exp")
	private String prevanaes_exp;

	@Column(name = "pulse")
	private String pulse;

	@Column(name = "BP")
	private String bp;

	@Column(name = "Resp")
	private String resp;

	@Column(name = "Pallor")
	private String pallor;

	@Column(name = "Icterus")
	private String icterus;

	@Column(name = "Cyanosis")
	private String cyanosis;

	@Column(name = "Club")
	private String club;

	@Column(name = "Oedema")
	private String oedema;

	@Column(name = "Vein")
	private String vein;

	@Column(name = "Obesity")
	private String obesity;

	@Column(name = "Neck")
	private String neck;

	@Column(name = "Jaw")
	private String jaw;

	@Column(name = "Teeth")
	private String teeth;

	@Column(name = "Spine")
	private String spine;

	@Column(name = "BHT")
	private String bht;

	@Column(name = "CVS")
	private String cvs;

	@Column(name = "RS")
	private String rs;

	@Column(name = "CNS")
	private String cns;

	@Column(name = "HB")
	private String hb;

	@Column(name = "TC")
	private String tc;

	@Column(name = "P")
	private String pobj;

	@Column(name = "L")
	private String lobj;

	@Column(name = "E")
	private String eobj;

	@Column(name = "M")
	private String mobj;

	@Column(name = "Bone")
	private String boneobj;

	@Column(name = "Smear")
	private String smear;

	@Column(name = "platelets")
	private String platelet;

	@Column(name = "ESR")
	private String esr;

	@Column(name = "urine")
	private String urine;

	@Column(name = "BUN")
	private String bun;

	@Column(name = "HIV")
	private String hiv;
	@Column(name = "BSL")
	private String bsl;

	@Column(name = "F")
	private String fobj;

	@Column(name = "PP")
	private String ppobj;

	@Column(name = "NaElectolytes")
	private String naElectolytes;

	@Column(name = "KElectrolytes")
	private String kElectolytes;

	@Column(name = "ClElectrolytes")
	private String clElectolytes;

	@Column(name = "Btwo")
	private String btwoobj;

	@Column(name = "CT")
	private String ctobj;

	@Column(name = "PT")
	private String ptobj;

	@Column(name = "Screat")
	private String screat;

	@Column(name = "ECG")
	private String ecg;

	@Column(name = "Other")
	private String other;

	@Column(name = "xray")
	private String xray;

	@Column(name = "risk_assess")
	private String risk_assess;

	@Column(name = "proposed_plan")
	private String proposed_plan;

	@Column(name = "pre_operativeinstuct")
	private String pre_operativeinstuct;

	@Column(name = "pre_medication")
	private String pre_medication;

	@Column(name = "status", columnDefinition = "varchar(2) default 'Y'")
	private String status = "Y";

	@Column(name = "pre_anaesthetic")
	private String radio_anaesthetic_status;

	@Column(name = "chk_anaesthetic")
	private String chk_anaesthetic_status;

	@Column(name = "proposed_surgery")
	private String proposedSurgery;

	@Column(name = "otherpresentmed")
	private String otherpresentmed;

	@Column(name = "Date")
	private String created_Date;

	@Transient
	private List<PreAnaesthetic> preanaetheticlist;
	@Transient
	private List<Doctor> doctorlist;

	@Column(name = "present_medication_other")
	private String txtPresMedOther;

	@Column(name = "cough_qty")
	private int coughQty;

	@Column(name = "cough_time")
	private String coughTime;

	@Column(name = "dyspnoea_qty")
	private int dyspnoeaQty;

	@Column(name = "dyspnoea_time")
	private String dyspnoeaTime;

	@Column(name = "giddiness_qty")
	private int giddinessQty;

	@Column(name = "giddiness_time")
	private String giddinessTime;

	@Column(name = "chestpain_qty")
	private int chestPainQty;

	@Column(name = "chestpain_time")
	private String chestPainTime;

	@Transient
	private String action;
	@Transient
	private String queryType;
	@Transient
	private String presentMedicationsOther;

	@Column(name = "Treatment_ID")
	private String tretID;

	@Transient
	private String patID;

	@Transient
	private String blood;

	@Transient
	private String otherh;
	@Transient
	private String indoor;
	@Transient
	private String premed;
	@Transient
	private String opd;
	@Transient
	private String crtdate;
	@Transient
	private String prosurgery;
	@Transient
	private String strchk;
	@Transient
	private String strradio;

	public String getTretID() {
		return tretID;
	}

	public void setTretID(String tretID) {
		this.tretID = tretID;
	}

	public String getPatID() {
		return patID;
	}

	public void setPatID(String patID) {
		this.patID = patID;
	}

	public String getBlood() {
		return blood;
	}

	public void setBlood(String blood) {
		this.blood = blood;
	}

	public String getOtherh() {
		return otherh;
	}

	public void setOtherh(String otherh) {
		this.otherh = otherh;
	}

	public String getIndoor() {
		return indoor;
	}

	public void setIndoor(String indoor) {
		this.indoor = indoor;
	}

	public String getPremed() {
		return premed;
	}

	public void setPremed(String premed) {
		this.premed = premed;
	}

	public String getOpd() {
		return opd;
	}

	public void setOpd(String opd) {
		this.opd = opd;
	}

	public String getCrtdate() {
		return crtdate;
	}

	public void setCrtdate(String crtdate) {
		this.crtdate = crtdate;
	}

	public String getProsurgery() {
		return prosurgery;
	}

	public void setProsurgery(String prosurgery) {
		this.prosurgery = prosurgery;
	}

	public String getStrchk() {
		return strchk;
	}

	public void setStrchk(String strchk) {
		this.strchk = strchk;
	}

	public String getStrradio() {
		return strradio;
	}

	public void setStrradio(String strradio) {
		this.strradio = strradio;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public String getPresentMedicationsOther() {
		return presentMedicationsOther;
	}

	public void setPresentMedicationsOther(String presentMedicationsOther) {
		this.presentMedicationsOther = presentMedicationsOther;
	}

	public int getCoughQty() {
		return coughQty;
	}

	public void setCoughQty(int coughQty) {
		this.coughQty = coughQty;
	}

	public String getCoughTime() {
		return coughTime;
	}

	public void setCoughTime(String coughTime) {
		this.coughTime = coughTime;
	}

	public int getDyspnoeaQty() {
		return dyspnoeaQty;
	}

	public void setDyspnoeaQty(int dyspnoeaQty) {
		this.dyspnoeaQty = dyspnoeaQty;
	}

	public String getDyspnoeaTime() {
		return dyspnoeaTime;
	}

	public void setDyspnoeaTime(String dyspnoeaTime) {
		this.dyspnoeaTime = dyspnoeaTime;
	}

	public int getGiddinessQty() {
		return giddinessQty;
	}

	public void setGiddinessQty(int giddinessQty) {
		this.giddinessQty = giddinessQty;
	}

	public String getGiddinessTime() {
		return giddinessTime;
	}

	public void setGiddinessTime(String giddinessTime) {
		this.giddinessTime = giddinessTime;
	}

	public int getChestPainQty() {
		return chestPainQty;
	}

	public void setChestPainQty(int chestPainQty) {
		this.chestPainQty = chestPainQty;
	}

	public String getChestPainTime() {
		return chestPainTime;
	}

	public void setChestPainTime(String chestPainTime) {
		this.chestPainTime = chestPainTime;
	}

	public String getTxtPresMedOther() {
		return txtPresMedOther;
	}

	public void setTxtPresMedOther(String txtPresMedOther) {
		this.txtPresMedOther = txtPresMedOther;
	}

	public List<Doctor> getDoctorlist() {
		return doctorlist;
	}

	public void setDoctorlist(List<Doctor> doctorlist) {
		this.doctorlist = doctorlist;
	}

	@Transient
	private Treatment objtreat;

	public int getPreAnaesthetic_ID() {
		return preanaesthetic_ID;
	}

	public void setPreAnaesthetic_ID(int preanaesthetic_ID) {
		this.preanaesthetic_ID = preanaesthetic_ID;
	}

	public Treatment getObj_Treat() {
		return objtreat;
	}

	public void setObj_Treat(Treatment objtreat) {
		this.objtreat = objtreat;
	}

	public String getprevanaes_exp() {
		return prevanaes_exp;
	}

	public void setprevanaes_exp(String prevanaes_exp) {
		this.prevanaes_exp = prevanaes_exp;
	}

	public String getPulse() {
		return pulse;
	}

	public void setPulse(String pulse) {
		this.pulse = pulse;
	}

	public String getBP() {
		return bp;
	}

	public void setBP(String bp) {
		this.bp = bp;
	}

	public String getPallor() {
		return pallor;
	}

	public void setPallor(String pallor) {
		this.pallor = pallor;
	}

	public String getResp() {
		return resp;
	}

	public void setResp(String resp) {
		this.resp = resp;
	}

	public String getIcterus() {
		return icterus;
	}

	public void setIcterus(String icterus) {
		this.icterus = icterus;
	}

	public String getCyanosis() {
		return cyanosis;
	}

	public void setCyanosis(String cyanosis) {
		this.cyanosis = cyanosis;
	}

	public String getClub() {
		return club;
	}

	public void setClub(String club) {
		this.club = club;
	}

	public String getOedema() {
		return oedema;
	}

	public void setOedema(String oedema) {
		this.oedema = oedema;
	}

	public String getVein() {
		return vein;
	}

	public void setVein(String vein) {
		this.vein = vein;
	}

	public String getObesity() {
		return obesity;
	}

	public void setObesity(String obesity) {
		this.obesity = obesity;
	}

	public String getNeckobj() {
		return neck;
	}

	public void setNeckobj(String neck) {
		this.neck = neck;
	}

	public String getJawobj() {
		return jaw;
	}

	public void setJawobj(String jaw) {
		this.jaw = jaw;
	}

	public String getTeethobj() {
		return teeth;
	}

	public void setTeethobj(String teeth) {
		this.teeth = teeth;
	}

	public String getSpineobj() {
		return spine;
	}

	public void setSpineobj(String spine) {
		this.spine = spine;
	}

	public String getBHTobj() {
		return bht;
	}

	public void setBHTobj(String bht) {
		this.bht = bht;
	}

	public String getCVSobj() {
		return cvs;
	}

	public void setCVSobj(String cvs) {
		this.cvs = cvs;
	}

	public String getRSobj() {
		return rs;
	}

	public void setRSobj(String rs) {
		this.rs = rs;
	}

	public String getCNSobj() {
		return cns;
	}

	public void setCNSobj(String cns) {
		this.cns = cns;
	}

	public String getHBobj() {
		return hb;
	}

	public void setHBobj(String hb) {
		this.hb = hb;
	}

	public String getTCobj() {
		return tc;
	}

	public void setTCobj(String tc) {
		this.tc = tc;
	}

	public String getPobj() {
		return pobj;
	}

	public void setPobj(String pobj) {
		this.pobj = pobj;
	}

	public String getLobj() {
		return lobj;
	}

	public void setLobj(String lobj) {
		this.lobj = lobj;
	}

	public String getEobj() {
		return eobj;
	}

	public void setEobj(String eobj) {
		this.eobj = eobj;
	}

	public String getMobj() {
		return mobj;
	}

	public void setMobj(String mobj) {
		this.mobj = mobj;
	}

	public String getBoneobj() {
		return boneobj;
	}

	public void setBoneobj(String boneobj) {
		this.boneobj = boneobj;
	}

	public String getSmearobj() {
		return smear;
	}

	public void setSmearobj(String smear) {
		this.smear = smear;
	}

	public String getPlateletobj() {
		return platelet;
	}

	public void setPlateletobj(String platelet) {
		this.platelet = platelet;
	}

	public String getESRobj() {
		return esr;
	}

	public void setESRobj(String esr) {
		this.esr = esr;
	}

	public String getUrineobj() {
		return urine;
	}

	public void setUrineobj(String urine) {
		this.urine = urine;
	}

	public String getBUNobj() {
		return bun;
	}

	public void setBUNobj(String bun) {
		this.bun = bun;
	}

	public String getHIVobj() {
		return hiv;
	}

	public void setHIVobj(String hiv) {
		this.hiv = hiv;
	}

	public String getBSLobj() {
		return bsl;
	}

	public void setBSLobj(String bsl) {
		this.bsl = bsl;
	}

	public String getFobj() {
		return fobj;
	}

	public void setFobj(String fobj) {
		this.fobj = fobj;
	}

	public String getPPobj() {
		return ppobj;
	}

	public void setPPobj(String ppobj) {
		this.ppobj = ppobj;
	}

	public String getnaElectolytes() {
		return naElectolytes;
	}

	public void setnaElectolytes(String naElectolytes) {
		this.naElectolytes = naElectolytes;
	}

	public String getkElectolytes() {
		return kElectolytes;
	}

	public void setkElectolytes(String kElectolytes) {
		this.kElectolytes = kElectolytes;
	}

	public String getclElectolytes() {
		return clElectolytes;
	}

	public void setclElectolytes(String clElectolytes) {
		this.clElectolytes = clElectolytes;
	}

	public String getBonetwoobj() {
		return boneobj;
	}

	public void setBonetwoobj(String btwoobj) {
		this.btwoobj = btwoobj;
	}

	public void setXray_chest(String xray) {
		this.xray = xray;
	}

	public String getXray_chest() {
		return xray;
	}

	public void setPTobj(String ptobj) {
		this.ptobj = ptobj;
	}

	public String getPTobj() {
		return ptobj;
	}

	public void setCTobj(String ctobj) {
		this.ctobj = ctobj;
	}

	public String getCTobj() {
		return ctobj;
	}

	public String getScreatobj() {
		return screat;
	}

	public void setScreatobj(String screat) {
		this.screat = screat;
	}

	public String getECGobj() {
		return ecg;
	}

	public void setECGobj(String ecg) {
		this.ecg = ecg;
	}

	public String getOther() {
		return other;
	}

	public void setOther(String other) {
		this.other = other;
	}

	public String getRisk_assess() {
		return risk_assess;
	}

	public void setRisk_assess(String risk_assess) {
		this.risk_assess = risk_assess;
	}

	public String getProposed_plan() {
		return proposed_plan;
	}

	public void setProposed_plan(String proposed_plan) {
		this.proposed_plan = proposed_plan;
	}

	public String getPre_operativeinstuct() {
		return pre_operativeinstuct;
	}

	public void setPre_operativeinstuct(String pre_operativeinstuct) {
		this.pre_operativeinstuct = pre_operativeinstuct;
	}

	public String getPre_medication() {
		return pre_medication;
	}

	public void setPre_medication(String pre_medication) {
		this.pre_medication = pre_medication;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRadio_anaesthetic_status() {
		return radio_anaesthetic_status;
	}

	public void setRadio_anaesthetic_status(String radio_anaesthetic_status) {
		this.radio_anaesthetic_status = radio_anaesthetic_status;
	}

	public String getChk_anaesthetic_status() {
		return chk_anaesthetic_status;
	}

	public void setChk_anaesthetic_status(String chk_anaesthetic_status) {
		this.chk_anaesthetic_status = chk_anaesthetic_status;

	}

	public String getProposedSurgery() {
		return proposedSurgery;
	}

	public void setProposedSurgery(String proposedSurgery) {
		this.proposedSurgery = proposedSurgery;

	}

	public String getOtherpresentMedication() {
		return otherpresentmed;
	}

	public void setOtherpresentMedication(String otherpresentmed) {
		this.otherpresentmed = otherpresentmed;

	}

	public String getCreated_Date() {
		return created_Date;
	}

	public void setCreated_Date(String created_Date) {
		this.created_Date = created_Date;

	}

	public List<?> getPreAnaestheticList() {
		return preanaetheticlist;
	}

	public void setPreAnaestheticList(List<PreAnaesthetic> preanaetheticlist) {
		this.preanaetheticlist = preanaetheticlist;
	}

	public String getIpd_Number() {
		return ipd_no;
	}

	public void setIpd_Number(String ipd_no) {
		this.ipd_no = ipd_no;
	}

	public String getBloodgroup() {
		return bloodgroup;
	}

	public void setBloodgroup(String bloodgroup) {
		this.bloodgroup = bloodgroup;
	}

	public int getPreanaesthetic_ID() {
		return preanaesthetic_ID;
	}

	public void setPreanaesthetic_ID(int preanaesthetic_ID) {
		this.preanaesthetic_ID = preanaesthetic_ID;
	}

	public String getIpd_no() {
		return ipd_no;
	}

	public void setIpd_no(String ipd_no) {
		this.ipd_no = ipd_no;
	}

	/*
	 * public String getPrevanaes_exp() { return prevanaes_exp; }
	 * 
	 * public void setPrevanaes_exp(String prevanaes_exp) { this.prevanaes_exp =
	 * prevanaes_exp; }
	 

	public String getBp() {
		return bp;
	}

	public void setBp(String bp) {
		this.bp = bp;
	}

	public String getNeck() {
		return neck;
	}

	public void setNeck(String neck) {
		this.neck = neck;
	}

	public String getJaw() {
		return jaw;
	}

	public void setJaw(String jaw) {
		this.jaw = jaw;
	}

	public String getTeeth() {
		return teeth;
	}

	public void setTeeth(String teeth) {
		this.teeth = teeth;
	}

	public String getSpine() {
		return spine;
	}

	public void setSpine(String spine) {
		this.spine = spine;
	}*/

	public String getBht() {
		return bht;
	}

	public void setBht(String bht) {
		this.bht = bht;
	}

	public String getCvs() {
		return cvs;
	}

	public void setCvs(String cvs) {
		this.cvs = cvs;
	}

	public String getRs() {
		return rs;
	}

	public void setRs(String rs) {
		this.rs = rs;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public String getHb() {
		return hb;
	}

	public void setHb(String hb) {
		this.hb = hb;
	}

	public String getTc() {
		return tc;
	}

	public void setTc(String tc) {
		this.tc = tc;
	}

	public String getSmear() {
		return smear;
	}

	public void setSmear(String smear) {
		this.smear = smear;
	}

	public String getPlatelet() {
		return platelet;
	}

	public void setPlatelet(String platelet) {
		this.platelet = platelet;
	}

	public String getEsr() {
		return esr;
	}

	public void setEsr(String esr) {
		this.esr = esr;
	}

	public String getUrine() {
		return urine;
	}

	public void setUrine(String urine) {
		this.urine = urine;
	}

	public String getBun() {
		return bun;
	}

	public void setBun(String bun) {
		this.bun = bun;
	}

	public String getHiv() {
		return hiv;
	}

	public void setHiv(String hiv) {
		this.hiv = hiv;
	}

	public String getBsl() {
		return bsl;
	}

	public void setBsl(String bsl) {
		this.bsl = bsl;
	}

	/*
	 * public String getPpobj() { return ppobj; }
	 * 
	 * public void setPpobj(String ppobj) { this.ppobj = ppobj; }
	 * 
	 * public String getNaElectolytes() { return naElectolytes; }
	 

	public void setNaElectolytes(String naElectolytes) {
		this.naElectolytes = naElectolytes;
	}

	public String getClElectolytes() {
		return clElectolytes;
	}

	public void setClElectolytes(String clElectolytes) {
		this.clElectolytes = clElectolytes;
	}

	public String getBtwoobj() {
		return btwoobj;
	}

	public void setBtwoobj(String btwoobj) {
		this.btwoobj = btwoobj;
	}

	public String getCtobj() {
		return ctobj;
	}

	public void setCtobj(String ctobj) {
		this.ctobj = ctobj;
	}

	public String getPtobj() {
		return ptobj;
	}

	public void setPtobj(String ptobj) {
		this.ptobj = ptobj;
	}

	public String getScreat() {
		return screat;
	}

	public void setScreat(String screat) {
		this.screat = screat;
	}

	public String getEcg() {
		return ecg;
	}

	public void setEcg(String ecg) {
		this.ecg = ecg;
	}

	public String getXray() {
		return xray;
	}

	public void setXray(String xray) {
		this.xray = xray;
	}

	public String getOtherpresentmed() {
		return otherpresentmed;
	}

	public void setOtherpresentmed(String otherpresentmed) {
		this.otherpresentmed = otherpresentmed;
	}

	public List<PreAnaesthetic> getPreanaetheticlist() {
		return preanaetheticlist;
	}

	public void setPreanaetheticlist(List<PreAnaesthetic> preanaetheticlist) {
		this.preanaetheticlist = preanaetheticlist;
	}

	public Treatment getObjtreat() {
		return objtreat;
	}

	public void setObjtreat(Treatment objtreat) {
		this.objtreat = objtreat;
	}*/

}
