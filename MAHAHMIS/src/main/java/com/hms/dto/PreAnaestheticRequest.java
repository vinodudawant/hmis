package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class PreAnaestheticRequest {
	private int preanaesthetic_ID;
	private String ipd_no;
	private String bloodgroup;
	private String prevanaes_exp;
	private String pulse;
	private String bp;
	private String resp;
	private String pallor;
	private String icterus;
	private String cyanosis;
	private String club;
	private String oedema;
	private String vein;
	private String obesity;
	private String neck;
	private String jaw;
	private String teeth;
	private String spine;
	private String bht;
	private String cvs;
	private String rs;
	private String cns;
	private String hb;
	private String tc;
	private String pobj;
	private String lobj;
	private String eobj;
	private String mobj;
	private String boneobj;
	private String smear;
	private String platelet;
	private String esr;

	private String urine;
	private String bun;
	private String hiv;
	private String bsl;
	private String fobj;
	private String ppobj;

	private String naElectolytes;
	private String kElectolytes;
	private String clElectolytes;
	private String btwoobj;
	private String ctobj;
	private String ptobj;
	private String screat;
	private String ecg;
	private String other;
	private String xray;
	private String risk_assess;
	private String proposed_plan;
	private String pre_operativeinstuct;
	private String pre_medication;
	private String status;
	private String radio_anaesthetic_status;
	private String chk_anaesthetic_status;
	private String proposedSurgery;
	private String otherpresentmed;
	private String created_Date;
	private List<PreAnaestheticRequest> preanaetheticlist = null;
	private List<Doctor> doctorlist = null;
	
	private String txtPresMedOther;
	
	private int coughQty;
	private String coughTime;
	private int dyspnoeaQty;
	private String dyspnoeaTime;
	private int giddinessQty;
	private String giddinessTime;
	private int chestPainQty;
	private String chestPainTime;
	
	private String tretID;
	private String patID;
	private String blood;
	private String otherh;
	private String indoor;
	private String premed;
	private String opd;
	private String crtdate;
	private String prosurgery;
	private String strchk;
	private String strradio;
	
	private String action;
	private String queryType;
	private String presentMedicationsOther;
	
	
	
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
	public String getPrevanaes_exp() {
		return prevanaes_exp;
	}
	public void setPrevanaes_exp(String prevanaes_exp) {
		this.prevanaes_exp = prevanaes_exp;
	}
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
	}
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
	public String getPpobj() {
		return ppobj;
	}
	public void setPpobj(String ppobj) {
		this.ppobj = ppobj;
	}
	public String getNaElectolytes() {
		return naElectolytes;
	}
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
	public List<PreAnaestheticRequest> getPreanaetheticlist() {
		return preanaetheticlist;
	}
	public void setPreanaetheticlist(List<PreAnaestheticRequest> preanaetheticlist) {
		this.preanaetheticlist = preanaetheticlist;
	}
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
	public Treatment getObjtreat() {
		return objtreat;
	}
	public void setObjtreat(Treatment objtreat) {
		this.objtreat = objtreat;
	}
	@JsonGetter("coughQty")
	public int getCoughQty() {
		return coughQty;
	}
	@JsonSetter("coughQty")
	public void setCoughQty(int coughQty) {
		this.coughQty = coughQty;
	}
	@JsonGetter("coughTime")
	public String getCoughTime() {
		return coughTime;
	}
	@JsonSetter("coughTime")
	public void setCoughTime(String coughTime) {
		this.coughTime = coughTime;
	}
	@JsonGetter("dyspnoeaQty")
	public int getDyspnoeaQty() {
		return dyspnoeaQty;
	}
	@JsonSetter("dyspnoeaQty")
	public void setDyspnoeaQty(int dyspnoeaQty) {
		this.dyspnoeaQty = dyspnoeaQty;
	}
	@JsonGetter("dyspnoeaTime")
	public String getDyspnoeaTime() {
		return dyspnoeaTime;
	}
	@JsonSetter("dyspnoeaTime")
	public void setDyspnoeaTime(String dyspnoeaTime) {
		this.dyspnoeaTime = dyspnoeaTime;
	}
	@JsonGetter("giddinessQty")
	public int getGiddinessQty() {
		return giddinessQty;
	}
	@JsonSetter("giddinessQty")
	public void setGiddinessQty(int giddinessQty) {
		this.giddinessQty = giddinessQty;
	}
	@JsonGetter("giddinessTime")
	public String getGiddinessTime() {
		return giddinessTime;
	}
	@JsonSetter("giddinessTime")
	public void setGiddinessTime(String giddinessTime) {
		this.giddinessTime = giddinessTime;
	}
	@JsonGetter("chestPainQty")
	public int getChestPainQty() {
		return chestPainQty;
	}
	@JsonSetter("chestPainQty")
	public void setChestPainQty(int chestPainQty) {
		this.chestPainQty = chestPainQty;
	}
	@JsonGetter("chestPainTime")
	public String getChestPainTime() {
		return chestPainTime;
	}
	@JsonSetter("chestPainTime")
	public void setChestPainTime(String chestPainTime) {
		this.chestPainTime = chestPainTime;
	}
	
	@JsonGetter("txtPresMedOther")
	public String getTxtPresMedOther() {
		return txtPresMedOther;
	}
	@JsonSetter("txtPresMedOther")
	public void setTxtPresMedOther(String txtPresMedOther) {
		this.txtPresMedOther = txtPresMedOther;
	}
	
	@JsonSetter("dlist")
	public List<Doctor> getDoctorlist() {
		return doctorlist;
	}
	@JsonGetter("dlist")
	public void setDoctorlist(List<Doctor> doctorlist) {
		this.doctorlist = doctorlist;
	}
	private Treatment objtreat ;
	
	@JsonGetter("preanesid")
	public int getPreAnaesthetic_ID() {
		return preanaesthetic_ID;
	}

	@JsonSetter("preanesid")
	public void setPreAnaesthetic_ID(int preanaesthetic_ID) {
		this.preanaesthetic_ID = preanaesthetic_ID;
	}
	@JsonGetter("objtreat")
	public Treatment getObj_Treat() {
		return objtreat;
	}

	@JsonSetter("objtreat")
	public void setObj_Treat(Treatment objtreat) {
		this.objtreat = objtreat;
	}
	@JsonGetter("prevexp")
	public String getprevanaes_exp() {
		return prevanaes_exp;
	}

	@JsonSetter("prevexp")
	public void setprevanaes_exp(String prevanaes_exp) {
		this.prevanaes_exp = prevanaes_exp;
	}

	@JsonGetter("pulse")
	public String getPulse() {
		return pulse;
	}

	@JsonSetter("pulse")
	public void setPulse(String pulse) {
		this.pulse = pulse;
	}

	@JsonGetter("bp")
	public String getBP() {
		return bp;
	}

	@JsonSetter("bp")
	public void setBP(String bp) {
		this.bp = bp;
	}

	@JsonGetter("palr")
	public String getPallor() {
		return pallor;
	}

	@JsonSetter("palr")
	public void setPallor(String pallor) {
		this.pallor = pallor;
	}

	@JsonGetter("resp")
	public String getResp() {
		return resp;
	}

	@JsonSetter("resp")
	public void setResp(String resp) {
		this.resp = resp;
	}

	@JsonGetter("ict")
	public String getIcterus() {
		return icterus;
	}

	@JsonSetter("ict")
	public void setIcterus(String icterus) {
		this.icterus = icterus;
	}

	@JsonGetter("cyano")
	public String getCyanosis() {
		return cyanosis;
	}

	@JsonSetter("cyano")
	public void setCyanosis(String cyanosis) {
		this.cyanosis = cyanosis;
	}

	@JsonGetter("club")
	public String getClub() {
		return club;
	}

	@JsonSetter("club")
	public void setClub(String club) {
		this.club = club;
	}

	@JsonGetter("oed")
	public String getOedema() {
		return oedema;
	}

	@JsonSetter("oed")
	public void setOedema(String oedema) {
		this.oedema = oedema;
	}

	@JsonGetter("vein")
	public String getVein() {
		return vein;
	}

	@JsonSetter("vein")
	public void setVein(String vein) {
		this.vein = vein;
	}

	@JsonGetter("obes")
	public String getObesity() {
		return obesity;
	}

	@JsonSetter("obes")
	public void setObesity(String obesity) {
		this.obesity = obesity;
	}

	@JsonGetter("neck")
	public String getNeckobj() {
		return neck;
	}

	@JsonSetter("neck")
	public void setNeckobj(String neck) {
		this.neck = neck;
	}

	@JsonGetter("jaw")
	public String getJawobj() {
		return jaw;
	}

	@JsonSetter("jaw")
	public void setJawobj(String jaw) {
		this.jaw = jaw;
	}

	@JsonGetter("teeth")
	public String getTeethobj() {
		return teeth;
	}

	@JsonSetter("teeth")
	public void setTeethobj(String teeth) {
		this.teeth = teeth;
	}

	@JsonGetter("spine")
	public String getSpineobj() {
		return spine;
	}

	@JsonSetter("spine")
	public void setSpineobj(String spine) {
		this.spine = spine;
	}

	@JsonGetter("bht")
	public String getBHTobj() {
		return bht;
	}

	@JsonSetter("bht")
	public void setBHTobj(String bht) {
		this.bht = bht;
	}

	@JsonGetter("cvs")
	public String getCVSobj() {
		return cvs;
	}

	@JsonSetter("cvs")
	public void setCVSobj(String cvs) {
		this.cvs = cvs;
	}

	@JsonGetter("rs")
	public String getRSobj() {
		return rs;
	}

	@JsonSetter("rs")
	public void setRSobj(String rs) {
		this.rs = rs;
	}

	@JsonGetter("cns")
	public String getCNSobj() {
		return cns;
	}

	@JsonSetter("cns")
	public void setCNSobj(String cns) {
		this.cns = cns;
	}

	@JsonGetter("hb")
	public String getHBobj() {
		return hb;
	}

	@JsonSetter("hb")
	public void setHBobj(String hb) {
		this.hb = hb;
	}

	@JsonGetter("tc")
	public String getTCobj() {
		return tc;
	}

	@JsonSetter("tc")
	public void setTCobj(String tc) {
		this.tc = tc;
	}

	@JsonGetter("pobj")
	public String getPobj() {
		return pobj;
	}

	@JsonSetter("pobj")
	public void setPobj(String pobj) {
		this.pobj = pobj;
	}

	@JsonGetter("lobj")
	public String getLobj() {
		return lobj;
	}

	@JsonSetter("lobj")
	public void setLobj(String lobj) {
		this.lobj = lobj;
	}

	@JsonGetter("eobj")
	public String getEobj() {
		return eobj;
	}

	@JsonSetter("eobj")
	public void setEobj(String eobj) {
		this.eobj = eobj;
	}

	@JsonGetter("mobj")
	public String getMobj() {
		return mobj;
	}

	@JsonSetter("mobj")
	public void setMobj(String mobj) {
		this.mobj = mobj;
	}

	@JsonGetter("boneobj")
	public String getBoneobj() {
		return boneobj;
	}

	@JsonSetter("boneobj")
	public void setBoneobj(String boneobj) {
		this.boneobj = boneobj;
	}

	@JsonGetter("smear")
	public String getSmearobj() {
		return smear;
	}

	@JsonSetter("smear")
	public void setSmearobj(String smear) {
		this.smear = smear;
	}

	@JsonGetter("plate")
	public String getPlateletobj() {
		return platelet;
	}

	@JsonSetter("plate")
	public void setPlateletobj(String platelet) {
		this.platelet = platelet;
	}

	@JsonGetter("esr")
	public String getESRobj() {
		return esr;
	}

	@JsonSetter("esr")
	public void setESRobj(String esr) {
		this.esr = esr;
	}

	@JsonGetter("urine")
	public String getUrineobj() {
		return urine;
	}

	@JsonSetter("urine")
	public void setUrineobj(String urine) {
		this.urine = urine;
	}

	@JsonGetter("bun")
	public String getBUNobj() {
		return bun;
	}

	@JsonSetter("bun")
	public void setBUNobj(String bun) {
		this.bun = bun;
	}

	@JsonGetter("hiv")
	public String getHIVobj() {
		return hiv;
	}

	@JsonSetter("hiv")
	public void setHIVobj(String hiv) {
		this.hiv = hiv;
	}

	@JsonGetter("bsl")
	public String getBSLobj() {
		return bsl;
	}

	@JsonSetter("bsl")
	public void setBSLobj(String bsl) {
		this.bsl = bsl;
	}

	@JsonGetter("fobj")
	public String getFobj() {
		return fobj;
	}

	@JsonSetter("fobj")
	public void setFobj(String fobj) {
		this.fobj = fobj;
	}

	@JsonGetter("ppobj")
	public String getPPobj() {
		return ppobj;
	}

	@JsonSetter("ppobj")
	public void setPPobj(String ppobj) {
		this.ppobj = ppobj;
	}

	@JsonGetter("na")
	public String getnaElectolytes() {
		return naElectolytes;
	}

	@JsonSetter("na")
	public void setnaElectolytes(String naElectolytes) {
		this.naElectolytes = naElectolytes;
	}

	@JsonGetter("k")
	public String getkElectolytes() {
		return kElectolytes;
	}

	@JsonSetter("k")
	public void setkElectolytes(String kElectolytes) {
		this.kElectolytes = kElectolytes;
	}

	@JsonGetter("cl")
	public String getclElectolytes() {
		return clElectolytes;
	}

	@JsonSetter("cl")
	public void setclElectolytes(String clElectolytes) {
		this.clElectolytes = clElectolytes;
	}

	@JsonGetter("btwoobj")
	public String getBonetwoobj() {
		return boneobj;
	}

	@JsonSetter("btwoobj")
	public void setBonetwoobj(String btwoobj) {
		this.btwoobj = btwoobj;
	}
	
	@JsonSetter("xray")
	public void setXray_chest(String xray) {
		this.xray = xray;
	}
	@JsonGetter("xray")
	public String getXray_chest() {
		return xray;
	}

	@JsonSetter("ptobj")
	public void setPTobj(String ptobj) {
		this.ptobj = ptobj;
	}
	@JsonGetter("ptobj")
	public String getPTobj() {
		return ptobj;
	}

	@JsonSetter("ctobj")
	public void setCTobj(String ctobj) {
		this.ctobj = ctobj;
	}
	@JsonGetter("ctobj")
	public String getCTobj() {
		return ctobj;
	}
	@JsonGetter("screat")
	public String getScreatobj() {
		return screat;
	}

	@JsonSetter("screat")
	public void setScreatobj(String screat) {
		this.screat = screat;
	}

	@JsonGetter("ecg")
	public String getECGobj() {
		return ecg;
	}

	@JsonSetter("ecg")
	public void setECGobj(String ecg) {
		this.ecg = ecg;
	}

	@JsonGetter("other")
	public String getOther() {
		return other;
	}

	@JsonSetter("other")
	public void setOther(String other) {
		this.other = other;
	}

	@JsonGetter("risk")
	public String getRisk_assess() {
		return risk_assess;
	}

	@JsonSetter("risk")
	public void setRisk_assess(String risk_assess) {
		this.risk_assess = risk_assess;
	}

	@JsonGetter("proplan")
	public String getProposed_plan() {
		return proposed_plan;
	}

	@JsonSetter("proplan")
	public void setProposed_plan(String proposed_plan) {
		this.proposed_plan = proposed_plan;
	}

	@JsonGetter("preoper")
	public String getPre_operativeinstuct() {
		return pre_operativeinstuct;
	}

	@JsonSetter("preoper")
	public void setPre_operativeinstuct(String pre_operativeinstuct) {
		this.pre_operativeinstuct = pre_operativeinstuct;
	}

	@JsonGetter("premed")
	public String getPre_medication() {
		return pre_medication;
	}

	@JsonSetter("premed")
	public void setPre_medication(String pre_medication) {
		this.pre_medication = pre_medication;
	}

	@JsonGetter("status")
	public String getStatus() {
		return status;
	}

	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("rstatus")
	public String getRadio_anaesthetic_status() {
		return radio_anaesthetic_status;
	}

	@JsonSetter("rstatus")
	public void setRadio_anaesthetic_status(String radio_anaesthetic_status) {
		this.radio_anaesthetic_status = radio_anaesthetic_status;
	}

	@JsonGetter("cstatus")
	public String getChk_anaesthetic_status() {
		return chk_anaesthetic_status;
	}

	@JsonSetter("cstatus")
	public void setChk_anaesthetic_status(String chk_anaesthetic_status) {
		this.chk_anaesthetic_status = chk_anaesthetic_status;

	}
	
	@JsonGetter("prosurgery")
	public String getProposedSurgery() {
		return proposedSurgery;
	}

	@JsonSetter("prosurgery")
	public void setProposedSurgery(String proposedSurgery) {
		this.proposedSurgery = proposedSurgery;

	}
	
	@JsonGetter("othmed")
	public String getOtherpresentMedication() {
		return otherpresentmed;
	}

	@JsonSetter("othmed")
	public void setOtherpresentMedication(String otherpresentmed) {
		this.otherpresentmed = otherpresentmed;

	}
	
	@JsonGetter("crtdate")
	public String getCreated_Date() {
		return created_Date;
	}

	@JsonSetter("crtdate")
	public void setCreated_Date(String created_Date) {
		this.created_Date = created_Date;

	}
	@JsonGetter("preanalist")
	public List getPreAnaestheticList() {
		return preanaetheticlist;
	}

	@JsonSetter("preanalist")
	public void setPreAnaestheticList(List<PreAnaestheticRequest> preanaetheticlist) {
		this.preanaetheticlist = preanaetheticlist;
	}
	@JsonGetter("ipdno")
	public String getIpd_Number() {
		return ipd_no;
	}
	@JsonSetter("ipdno")
	public void setIpd_Number(String ipd_no) {
		this.ipd_no = ipd_no;
	}
	@JsonGetter("bg")
	public String getBloodgroup() {
		return bloodgroup;
	}
	@JsonSetter("bg")
	public void setBloodgroup(String bloodgroup) {
		this.bloodgroup = bloodgroup;
	}
	
}
