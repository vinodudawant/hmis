package com.hms.dto;

import java.sql.Time;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class HospitalDetails {

	private int idhospital;
	private String hospitalName;
	private String hospitalCity;
	private String hospitalState;
	private String hospitalCountry;
	private String hospitalZip;
	private String hospitalEmail;
	private String hospitalAddress;
	private String hospitalContact;
	private String hospitalFax;
	private String hospitalCreatedDate;
	private String hospitalCreatedBy;
	private String hospitalRegCharges;
	private String filePath;
	private float serviceTax;
	private Time billDayFrmTime;
	private Time billDayToTime;
	private Time DocRdFrmTime;
	private Time DocRdToTime;

	private String anesthetistCharges;
	private float emergencyCharges;
	private float infectionCharges;
	private float bedRiddenCharges;
	private float servoCharges;
	private float surInstruCharges;
	private float surChrtwoHrs;
	private float surChrFourHrs;
	private float surChrBeyondFourHrs;
	private float mlcCharges;
	private String initials;
	private Integer corporateAccId;
	private Integer docFollowUpDays;
	private Integer regFollowUpDays;
	private String digitalSignature;
	private String txtTrmtClsTime;
	private String imageAndAddressPlace;
	private Integer taxID;
	private String taxName;
	private float taxValue;
	private String flag;
	private String taxList;
	private float prevServiceTax;

	//Added By Bilal
	private String hosRegNo;
	private String txtSerTaxNo;
	private String txtGstNo;
	private String txtCinNo;
	private String website;
	private String secPNo;
	private String PanNo;
	private String uploadImagePath;
	private String nabhImagePath;
	
	@JsonGetter("hosRegNo")
	public String getHosRegNo() {
		return hosRegNo;
	}

	@JsonSetter("hosRegNo")
	public void setHosRegNo(String hosRegNo) {
		this.hosRegNo = hosRegNo;
	}

	@JsonGetter("txtSerTaxNo")
	public String getTxtSerTaxNo() {
		return txtSerTaxNo;
	}

	@JsonSetter("txtSerTaxNo")
	public void setTxtSerTaxNo(String txtSerTaxNo) {
		this.txtSerTaxNo = txtSerTaxNo;
	}

	@JsonGetter("txtGstNo")
	public String getTxtGstNo() {
		return txtGstNo;
	}

	@JsonSetter("txtGstNo")
	public void setTxtGstNo(String txtGstNo) {
		this.txtGstNo = txtGstNo;
	}

	@JsonGetter("txtCinNo")
	public String getTxtCinNo() {
		return txtCinNo;
	}

	@JsonSetter("txtCinNo")
	public void setTxtCinNo(String txtCinNo) {
		this.txtCinNo = txtCinNo;
	}

	@JsonGetter("website")
	public String getWebsite() {
		return website;
	}

	@JsonSetter("website")
	public void setWebsite(String website) {
		this.website = website;
	}

	@JsonGetter("secPNo")
	public String getSecPNo() {
		return secPNo;
	}

	@JsonSetter("secPNo")
	public void setSecPNo(String secPNo) {
		this.secPNo = secPNo;
	}

	@JsonGetter("PanNo")
	public String getPanNo() {
		return PanNo;
	}

	@JsonSetter("PanNo")
	public void setPanNo(String panNo) {
		PanNo = panNo;
	}

	@JsonGetter("imageAndAddressPlace")
	public String getImageAndAddressPlace() {
		return imageAndAddressPlace;
	}

	@JsonSetter("imageAndAddressPlace")
	public void setImageAndAddressPlace(String imageAndAddressPlace) {
		this.imageAndAddressPlace = imageAndAddressPlace;
	}

	@JsonGetter("txtTrmtClsTime")
	public String getTxtTrmtClsTime() {
		return txtTrmtClsTime;
	}

	@JsonSetter("txtTrmtClsTime")
	public void setTxtTrmtClsTime(String txtTrmtClsTime) {
		this.txtTrmtClsTime = txtTrmtClsTime;
	}

	@JsonGetter("docfollowup")
	public Integer getDocFollowUpDays() {
		return docFollowUpDays;
	}

	@JsonSetter("docfollowup")
	public void setDocFollowUpDays(Integer docFollowUpDays) {
		this.docFollowUpDays = docFollowUpDays;
	}

	@JsonGetter("regfollowup")
	public Integer getRegFollowUpDays() {
		return regFollowUpDays;
	}

	@JsonSetter("regfollowup")
	public void setRegFollowUpDays(Integer regFollowUpDays) {
		this.regFollowUpDays = regFollowUpDays;
	}

	@JsonGetter("corporateAccId")
	public Integer getCorporateAccId() {
		return corporateAccId;
	}

	@JsonGetter("corporateAccId")
	public void setCorporateAccId(Integer corporateAccId) {
		this.corporateAccId = corporateAccId;
	}

	@JsonGetter("initials")
	public String getInitials() {
		return initials;
	}

	@JsonSetter("initials")
	public void setInitials(String initials) {
		this.initials = initials;
	}

	@JsonGetter("mlcChr")
	public float getMlcCharges() {
		return mlcCharges;
	}

	@JsonSetter("mlcChr")
	public void setMlcCharges(float mlcCharges) {
		this.mlcCharges = mlcCharges;
	}

	@JsonGetter("surinstr")
	public float getSurInstruCharges() {
		return surInstruCharges;
	}

	@JsonSetter("surinstr")
	public void setSurInstruCharges(float surInstruCharges) {
		this.surInstruCharges = surInstruCharges;
	}

	@JsonGetter("surchrtwhrs")
	public float getSurChrtwoHrs() {
		return surChrtwoHrs;
	}

	@JsonSetter("surchrtwhrs")
	public void setSurChrtwoHrs(float surChrtwoHrs) {
		this.surChrtwoHrs = surChrtwoHrs;
	}

	@JsonGetter("surchrfrhrs")
	public float getSurChrFourHrs() {
		return surChrFourHrs;
	}

	@JsonSetter("surchrfrhrs")
	public void setSurChrFourHrs(float surChrFourHrs) {
		this.surChrFourHrs = surChrFourHrs;
	}

	@JsonGetter("surchrbyfrhrs")
	public float getSurChrBeyondFourHrs() {
		return surChrBeyondFourHrs;
	}

	@JsonSetter("surchrbyfrhrs")
	public void setSurChrBeyondFourHrs(float surChrBeyondFourHrs) {
		this.surChrBeyondFourHrs = surChrBeyondFourHrs;
	}

	@JsonGetter("rdCharges")
	public float getBedRiddenCharges() {
		return bedRiddenCharges;
	}

	@JsonSetter("rdCharges")
	public void setBedRiddenCharges(float bedRiddenCharges) {
		this.bedRiddenCharges = bedRiddenCharges;
	}

	@JsonGetter("serCharges")
	public float getServoCharges() {
		return servoCharges;
	}

	@JsonSetter("serCharges")
	public void setServoCharges(float servoCharges) {
		this.servoCharges = servoCharges;
	}

	@JsonGetter("emrchr")
	public float getEmergencyCharges() {
		return emergencyCharges;
	}

	@JsonSetter("emrchr")
	public void setEmergencyCharges(float emergencyCharges) {
		this.emergencyCharges = emergencyCharges;
	}

	@JsonGetter("infchr")
	public float getInfectionCharges() {
		return infectionCharges;
	}

	@JsonSetter("infchr")
	public void setInfectionCharges(float infectionCharges) {
		this.infectionCharges = infectionCharges;
	}

	@JsonGetter("AnaChar")
	public String getAnesthetistCharges() {
		return anesthetistCharges;
	}

	@JsonSetter("AnaChar")
	public void setAnesthetistCharges(String anesthetistCharges) {
		this.anesthetistCharges = anesthetistCharges;
	}

	@JsonGetter("bdFrmTim")
	public Time getBillDayFrmTime() {
		return billDayFrmTime;
	}

	@JsonSetter("bdFrmTim")
	public void setBillDayFrmTime(Time billDayFrmTime) {
		this.billDayFrmTime = billDayFrmTime;
	}

	@JsonGetter("bdToTim")
	public Time getBillDayToTime() {
		return billDayToTime;
	}

	@JsonSetter("bdToTim")
	public void setBillDayToTime(Time billDayToTime) {
		this.billDayToTime = billDayToTime;
	}

	@JsonGetter("DocRdToTime")
	public Time getDocRdToTime() {
		return DocRdToTime;
	}

	@JsonSetter("DocRdToTime")
	public void setDocRdToTime(Time docRdToTime) {
		DocRdToTime = docRdToTime;
	}

	@JsonGetter("DocRdFrmTime")
	public Time getDocRdFrmTime() {
		return DocRdFrmTime;
	}

	@JsonSetter("DocRdFrmTime")
	public void setDocRdFrmTime(Time docRdFrmTime) {
		DocRdFrmTime = docRdFrmTime;
	}

	private List<TimingSchedule> listTimingSchedule;

	@JsonGetter("serTax")
	public float getServiceTax() {
		return serviceTax;
	}

	@JsonSetter("serTax")
	public void setServiceTax(float serviceTax) {
		this.serviceTax = serviceTax;
	}

	@JsonGetter("litmgaschl")
	public List<TimingSchedule> getListTimingSchedule() {
		return listTimingSchedule;
	}

	@JsonSetter("litmgaschl")
	public void setListTimingSchedule(List<TimingSchedule> listTimingSchedule) {
		this.listTimingSchedule = listTimingSchedule;
	}

	private List<HospitalDetails> listHospitalDetails;

	@JsonGetter("flpt")
	@JsonSetter("flpt")
	public String getFilePath() {
		return filePath;
	}

	@JsonSetter("flpt")
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	@JsonGetter("idhp")
	public int getIdhospital() {
		return idhospital;
	}

	@JsonSetter("idhp")
	public void setIdhospital(int idhospital) {
		this.idhospital = idhospital;
	}

	@JsonGetter("hn")
	public String getHospitalName() {
		return hospitalName;
	}

	@JsonSetter("hn")
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	@JsonGetter("hcity")
	public String getHospitalCity() {
		return hospitalCity;
	}

	@JsonSetter("hcity")
	public void setHospitalCity(String hospitalCity) {
		this.hospitalCity = hospitalCity;
	}

	@JsonGetter("hs")
	public String getHospitalState() {
		return hospitalState;
	}

	@JsonSetter("hs")
	public void setHospitalState(String hospitalState) {
		this.hospitalState = hospitalState;
	}

	@JsonGetter("hc")
	public String getHospitalCountry() {
		return hospitalCountry;
	}

	@JsonSetter("hc")
	public void setHospitalCountry(String hospitalCountry) {
		this.hospitalCountry = hospitalCountry;
	}

	@JsonGetter("hz")
	public String getHospitalZip() {
		return hospitalZip;
	}

	@JsonSetter("hz")
	public void setHospitalZip(String hospitalZip) {
		this.hospitalZip = hospitalZip;
	}

	@JsonGetter("em")
	public String getHospitalEmail() {
		return hospitalEmail;
	}

	@JsonSetter("em")
	public void setHospitalEmail(String hospitalEmail) {
		this.hospitalEmail = hospitalEmail;
	}

	@JsonGetter("ha")
	public String getHospitalAddress() {
		return hospitalAddress;
	}

	@JsonSetter("ha")
	public void setHospitalAddress(String hospitalAddress) {
		this.hospitalAddress = hospitalAddress;
	}

	@JsonGetter("hcon")
	public String getHospitalContact() {
		return hospitalContact;
	}

	@JsonSetter("hcon")
	public void setHospitalContact(String hospitalContact) {
		this.hospitalContact = hospitalContact;
	}

	@JsonGetter("hx")
	public String getHospitalFax() {
		return hospitalFax;
	}

	@JsonSetter("hx")
	public void setHospitalFax(String hospitalFax) {
		this.hospitalFax = hospitalFax;
	}

	@JsonGetter("hd")
	public String getHospitalCreatedDate() {
		return hospitalCreatedDate;
	}

	@JsonSetter("hd")
	public void setHospitalCreatedDate(String hospitalCreatedDate) {
		this.hospitalCreatedDate = hospitalCreatedDate;
	}

	@JsonGetter("hb")
	public String getHospitalCreatedBy() {
		return hospitalCreatedBy;
	}

	@JsonSetter("hb")
	public void setHospitalCreatedBy(String hospitalCreatedBy) {
		this.hospitalCreatedBy = hospitalCreatedBy;
	}

	@JsonGetter("listHosDetail")
	public List<HospitalDetails> getListHospitalDetails() {
		return listHospitalDetails;
	}

	@JsonSetter("listHosDetail")
	public void setListHospitalDetails(List<HospitalDetails> listHospitalDetails) {
		this.listHospitalDetails = listHospitalDetails;
	}

	@JsonGetter("hrate")
	public String getHospitalRegCharges() {
		return hospitalRegCharges;
	}

	@JsonSetter("hrate")
	public void setHospitalRegCharges(String hospitalRegCharges) {
		this.hospitalRegCharges = hospitalRegCharges;
	}

	@JsonGetter("digitalSignature")
	public String getDigitalSignature() {
		return digitalSignature;
	}

	@JsonSetter("digitalSignature")
	public void setDigitalSignature(String digitalSignature) {
		this.digitalSignature = digitalSignature;
	}
	@JsonGetter("taxID")
	public Integer getTaxID() {
		return taxID;
	}
	
	@JsonSetter("taxID")
	public void setTaxID(Integer taxID2) {
		this.taxID = taxID2;
	}
	@JsonGetter("taxList")
	public String getTaxList() {
		return taxList;
	}

	@JsonSetter("taxList")
	public void setTaxList(String taxList) {
		this.taxList = taxList;
	}
	
	@JsonGetter("taxName")
	public String getTaxName() {
		return taxName;
	}
	
	@JsonSetter("taxName")
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}
	
	@JsonGetter("taxValue")
	public float getTaxValue() {
		return taxValue;
	}

	@JsonSetter("taxValue")
	public void setTaxValue(float taxValue) {
		this.taxValue = taxValue;
	}
	
	@JsonGetter("flag")
	public String getFlag() {
		return flag;
	}

	@JsonSetter("flag")
	public void setFlag(String flag) {
		this.flag = flag;
	}
	@JsonGetter("prevSerTax")
	public float getPrevServiceTax() {
		return prevServiceTax;
	}
	@JsonSetter("prevSerTax")
	public void setPrevServiceTax(float prevServiceTax) {
		this.prevServiceTax = prevServiceTax;
	}
	@JsonGetter("imgpt")
	public String getUploadImagePath() {
		return uploadImagePath;
	}
	@JsonSetter("imgpt")
	public void setUploadImagePath(String uploadImagePath) {
		this.uploadImagePath = uploadImagePath;
	}
	public String getNabhImagePath() {
		return nabhImagePath;
	}
	public void setNabhImagePath(String nabhImagePath) {
		this.nabhImagePath = nabhImagePath;
	}
	
}
