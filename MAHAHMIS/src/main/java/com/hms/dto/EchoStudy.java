package com.hms.dto;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;



public class EchoStudy {
	
	
	private int echo_id;
	private int Treatment_id;
	private String date;
	private String echo_shows;
	private String doppler_study;
	private String conclusion;
	private String lvidd;
	private String epss;
	private String lvids;
	private String ivsd;
	private String lvpw;
	private String ef;
	private String ao;
	private String la;
	private String pasp;
	private String type;
	private String MVVel;
	private String MVPeak;
	private String MVMean;
	private String MVRegurge;
	private String AVVel;
	private String AVPeak;
	private String AVMean;
	private String AVRegurge;
	private String TVVel;
	private String TVPeak;
	private String TVMean;
	private String TVRegurge;
	private String PVVel;
	private String PVPeak;
	private String PVMean;
	private String PVRegurge;
	
	private String fname;
	private String lname;
	private String mName;
	private String age;
	private String bloodGroup;
	private String sex;
	private String referedBy;
	private List<EchoStudy> echoStudyList;
	@JsonGetter("ei")
	public int getEcho_id() {
		return echo_id;
	}

	public void setEcho_id(int echo_id) {
		this.echo_id = echo_id;
	}
	@JsonGetter("eti")
	public int getTreatment_id() {
		return Treatment_id;
	}

	public void setTreatment_id(int treatment_id) {
		Treatment_id = treatment_id;
	}
	@JsonGetter("ed")
	public String getDate() {
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("es")
	public String getEcho_shows() {
		return echo_shows;
	}

	public void setEcho_shows(String echo_shows) {
		this.echo_shows = echo_shows;
	}
	@JsonGetter("ds")
	public String getDoppler_study() {
		return doppler_study;
	}

	public void setDoppler_study(String doppler_study) {
		this.doppler_study = doppler_study;
	}
	@JsonGetter("lv")
	public String getLvidd() {
		return lvidd;
	}
	
	public void setLvidd(String lvidd) {
		this.lvidd = lvidd;
	}
	@JsonGetter("cn")
	public String getConclusion() {
		return conclusion;
	}

	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
	}
	@JsonGetter("eps")
	public String getEpss() {
		return epss;
	}

	public void setEpss(String epss) {
		this.epss = epss;
	}
	@JsonGetter("lvpw")
	public String getLvpw() {
		return lvpw;
	}

	public void setLvpw(String lvpw) {
		this.lvpw = lvpw;
	}
	@JsonGetter("iv")
	public String getIvsd() {
		return ivsd;
	}

	public void setIvsd(String ivsd) {
		this.ivsd = ivsd;
	}
	@JsonGetter("lvids")
	public String getLvids() {
		return lvids;
	}

	public void setLvids(String lvids) {
		this.lvids = lvids;
	}
	@JsonGetter("ef")
	public String getEf() {
		return ef;
	}
	
	public void setEf(String ef) {
		this.ef = ef;
	}
	@JsonGetter("ao")
	public String getAo() {
		return ao;
	}

	public void setAo(String ao) {
		this.ao = ao;
	}
	@JsonGetter("la")
	public String getLa() {
		return la;
	}

	public void setLa(String la) {
		this.la = la;
	}

	@JsonGetter("ps")
	public String getPasp() {
		return pasp;
	}

	public void setPasp(String pasp) {
		this.pasp = pasp;
	}
	@JsonGetter("esl")
	public List<EchoStudy> getEchoStudyList() {
		return echoStudyList;
	}

	public void setEchoStudyList(List<EchoStudy> echoStudyList) {
		this.echoStudyList = echoStudyList;
	}
	@JsonGetter("ty")
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	@JsonGetter("vel")
	public String getMVVel() {
		return MVVel;
	}

	public void setMVVel(String mVVel) {
		MVVel = mVVel;
	}
	@JsonGetter("peak")
	public String getMVPeak() {
		return MVPeak;
	}

	public void setMVPeak(String mVPeak) {
		MVPeak = mVPeak;
	}
	@JsonGetter("mean")
	public String getMVMean() {
		return MVMean;
	}

	public void setMVMean(String mVMean) {
		MVMean = mVMean;
	}
	@JsonGetter("regu")
	public String getMVRegurge() {
		return MVRegurge;
	}

	public void setMVRegurge(String mVRegurge) {
		MVRegurge = mVRegurge;
	}

	public String getAVVel() {
		return AVVel;
	}

	public void setAVVel(String aVVel) {
		AVVel = aVVel;
	}

	public String getAVPeak() {
		return AVPeak;
	}

	public void setAVPeak(String aVPeak) {
		AVPeak = aVPeak;
	}

	public String getAVMean() {
		return AVMean;
	}

	public void setAVMean(String aVMean) {
		AVMean = aVMean;
	}



	public String getTVVel() {
		return TVVel;
	}

	public void setTVVel(String tVVel) {
		TVVel = tVVel;
	}

	public String getTVPeak() {
		return TVPeak;
	}

	public void setTVPeak(String tVPeak) {
		TVPeak = tVPeak;
	}

	public String getTVMean() {
		return TVMean;
	}

	public void setTVMean(String tVMean) {
		TVMean = tVMean;
	}

	public String getTVRegurge() {
		return TVRegurge;
	}

	public void setTVRegurge(String tVRegurge) {
		TVRegurge = tVRegurge;
	}

	public String getPVVel() {
		return PVVel;
	}

	public void setPVVel(String pVVel) {
		PVVel = pVVel;
	}

	public String getPVPeak() {
		return PVPeak;
	}

	public void setPVPeak(String pVPeak) {
		PVPeak = pVPeak;
	}

	public String getPVMean() {
		return PVMean;
	}

	public void setPVMean(String pVMean) {
		PVMean = pVMean;
	}

	public String getPVRegurge() {
		return PVRegurge;
	}

	public void setPVRegurge(String pVRegurge) {
		PVRegurge = pVRegurge;
	}

	public String getAVRegurge() {
		return AVRegurge;
	}

	public void setAVRegurge(String aVRegurge) {
		AVRegurge = aVRegurge;
	}
	@JsonGetter("fn")
	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}
	@JsonGetter("ln")
	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}
	@JsonGetter("mn")
	public String getmName() {
		return mName;
	}

	public void setmName(String mName) {
		this.mName = mName;
	}
	@JsonGetter("sx")
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
	@JsonGetter("rb")
	public String getReferedBy() {
		return referedBy;
	}

	public void setReferedBy(String referedBy) {
		this.referedBy = referedBy;
	}
	@JsonGetter("ag")
	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}
	@JsonGetter("bg")
	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	

}
