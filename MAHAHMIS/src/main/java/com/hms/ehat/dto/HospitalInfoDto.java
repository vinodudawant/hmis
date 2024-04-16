package com.hms.ehat.dto;

import java.sql.Time;
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
@Table(name="hospital")
public class HospitalInfoDto {
	
	@Id
	@GeneratedValue
	
	@Column(name = "idhospital")
	private int idhospital;
	@Column(name="hospitalName")
	private String hospitalName;
	@Column(name="hospitalCity")
	private String hospitalCity;
	@Column(name="hospitalState")
	private String hospitalState;
	@Column(name="hospitalCountry")
	private String hospitalCountry;
	@Column(name="hospitalZip")
	private String hospitalZip;
	@Column(name="hospitalEmail")
	private String hospitalEmail;
	@Column(name="hospitalAddress")
	private String hospitalAddress;
	@Column(name="hospitalContact")
	private String hospitalContact;
	@Column(name="hospitalFax")
	private String hospitalFax;
	@Column(name="hospitalRegCharges")
	private String hospitalRegCharges;
	@Column(name="filePath")
	private String filePath;
	@Column(name="serviceTax")
	private float serviceTax;
	@Column(name="billDayFrmTime")
	private Time billDayFrmTime;
	@Column(name="billDayToTime")
	private Time billDayToTime;
	@Column(name="DocRdFrmTime")
	private Time DocRdFrmTime;
	@Column(name="DocRdToTime")
	private Time DocRdToTime;
	@Column(name="anesthetistCharges")
	private String anesthetistCharges;
	@Column(name="emergencyCharges")
	private float emergencyCharges;
	@Column(name="infectionCharges")
	private float infectionCharges;
	@Column(name="bedRiddenCharges")
	private float bedRiddenCharges;
	@Column(name="servoCharges")
	private float servoCharges;
	@Column(name="surInstruCharges")
	private float surInstruCharges;
	@Column(name="surChrtwoHrs")
	private float surChrtwoHrs;
	@Column(name="surChrFourHrs")
	private float surChrFourHrs;
	@Column(name="surChrBeyondFourHrs")
	private float surChrBeyondFourHrs;
	@Column(name="mlcCharges")
	private float mlcCharges;
	@Column(name="initials")
	private String initials;
	@Column(name="corporateAccId")
	private Integer corporateAccId;
	@Column(name="docFollowUpDays")
	private Integer docFollowUpDays;
	@Column(name="regFollowUpDays")
	private Integer regFollowUpDays;
	@Column(name="digitalSignature")
	private String digitalSignature;
	@Column(name="txtTrmtClsTime")
	private String txtTrmtClsTime;
	@Column(name="imageAndAddressPlace")
	private String imageAndAddressPlace;
	@Column(name="taxID")
	private Integer taxID;
	@Column(name="taxName")
	private String taxName;
	@Column(name="taxValue")
	private float taxValue;
	@Column(name="flag")
	private String flag;
	
	@Column(name="taxList")
	private String taxList;
	@Column(name="prevServiceTax")
	private float prevServiceTax;
	@Column(name="hosRegNo")
	private String hosRegNo;
	@Column(name="txtSerTaxNo")
	private String txtSerTaxNo;
	@Column(name="txtGstNo")
	private String txtGstNo;
	@Column(name="txtCinNo")
	private String txtCinNo;
	@Column(name="website")
	private String website;
	@Column(name="secPNo")
	private String secPNo;
	@Column(name="PanNo")
	private String PanNo;
	@Column(name="uploadImagePath")
	private String uploadImagePath;
	@Column(name="nabhImagePath")
	private String nabhImagePath;
	
	public int getIdhospital() {
		return idhospital;
	}


	public void setIdhospital(int idhospital) {
		this.idhospital = idhospital;
	}


	public String getHospitalName() {
		return hospitalName;
	}


	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}


	public String getHospitalCity() {
		return hospitalCity;
	}


	public void setHospitalCity(String hospitalCity) {
		this.hospitalCity = hospitalCity;
	}


	public String getHospitalState() {
		return hospitalState;
	}


	public void setHospitalState(String hospitalState) {
		this.hospitalState = hospitalState;
	}


	public String getHospitalCountry() {
		return hospitalCountry;
	}


	public void setHospitalCountry(String hospitalCountry) {
		this.hospitalCountry = hospitalCountry;
	}


	public String getHospitalZip() {
		return hospitalZip;
	}


	public void setHospitalZip(String hospitalZip) {
		this.hospitalZip = hospitalZip;
	}


	public String getHospitalEmail() {
		return hospitalEmail;
	}


	public void setHospitalEmail(String hospitalEmail) {
		this.hospitalEmail = hospitalEmail;
	}


	public String getHospitalAddress() {
		return hospitalAddress;
	}


	public void setHospitalAddress(String hospitalAddress) {
		this.hospitalAddress = hospitalAddress;
	}


	public String getHospitalContact() {
		return hospitalContact;
	}


	public void setHospitalContact(String hospitalContact) {
		this.hospitalContact = hospitalContact;
	}


	public String getHospitalFax() {
		return hospitalFax;
	}


	public void setHospitalFax(String hospitalFax) {
		this.hospitalFax = hospitalFax;
	}


	public String getHospitalRegCharges() {
		return hospitalRegCharges;
	}


	public void setHospitalRegCharges(String hospitalRegCharges) {
		this.hospitalRegCharges = hospitalRegCharges;
	}


	public String getFilePath() {
		return filePath;
	}


	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}


	public float getServiceTax() {
		return serviceTax;
	}


	public void setServiceTax(float serviceTax) {
		this.serviceTax = serviceTax;
	}


	public Time getBillDayFrmTime() {
		return billDayFrmTime;
	}


	public void setBillDayFrmTime(Time billDayFrmTime) {
		this.billDayFrmTime = billDayFrmTime;
	}


	public Time getBillDayToTime() {
		return billDayToTime;
	}


	public void setBillDayToTime(Time billDayToTime) {
		this.billDayToTime = billDayToTime;
	}


	public Time getDocRdFrmTime() {
		return DocRdFrmTime;
	}


	public void setDocRdFrmTime(Time docRdFrmTime) {
		DocRdFrmTime = docRdFrmTime;
	}


	public Time getDocRdToTime() {
		return DocRdToTime;
	}


	public void setDocRdToTime(Time docRdToTime) {
		DocRdToTime = docRdToTime;
	}


	public String getAnesthetistCharges() {
		return anesthetistCharges;
	}


	public void setAnesthetistCharges(String anesthetistCharges) {
		this.anesthetistCharges = anesthetistCharges;
	}


	public float getEmergencyCharges() {
		return emergencyCharges;
	}


	public void setEmergencyCharges(float emergencyCharges) {
		this.emergencyCharges = emergencyCharges;
	}


	public float getInfectionCharges() {
		return infectionCharges;
	}


	public void setInfectionCharges(float infectionCharges) {
		this.infectionCharges = infectionCharges;
	}


	public float getBedRiddenCharges() {
		return bedRiddenCharges;
	}


	public void setBedRiddenCharges(float bedRiddenCharges) {
		this.bedRiddenCharges = bedRiddenCharges;
	}


	public float getServoCharges() {
		return servoCharges;
	}


	public void setServoCharges(float servoCharges) {
		this.servoCharges = servoCharges;
	}


	public float getSurInstruCharges() {
		return surInstruCharges;
	}


	public void setSurInstruCharges(float surInstruCharges) {
		this.surInstruCharges = surInstruCharges;
	}


	public float getSurChrtwoHrs() {
		return surChrtwoHrs;
	}


	public void setSurChrtwoHrs(float surChrtwoHrs) {
		this.surChrtwoHrs = surChrtwoHrs;
	}


	public float getSurChrFourHrs() {
		return surChrFourHrs;
	}


	public void setSurChrFourHrs(float surChrFourHrs) {
		this.surChrFourHrs = surChrFourHrs;
	}


	public float getSurChrBeyondFourHrs() {
		return surChrBeyondFourHrs;
	}


	public void setSurChrBeyondFourHrs(float surChrBeyondFourHrs) {
		this.surChrBeyondFourHrs = surChrBeyondFourHrs;
	}


	public float getMlcCharges() {
		return mlcCharges;
	}


	public void setMlcCharges(float mlcCharges) {
		this.mlcCharges = mlcCharges;
	}


	public String getInitials() {
		return initials;
	}


	public void setInitials(String initials) {
		this.initials = initials;
	}


	public Integer getCorporateAccId() {
		return corporateAccId;
	}


	public void setCorporateAccId(Integer corporateAccId) {
		this.corporateAccId = corporateAccId;
	}


	public Integer getDocFollowUpDays() {
		return docFollowUpDays;
	}


	public void setDocFollowUpDays(Integer docFollowUpDays) {
		this.docFollowUpDays = docFollowUpDays;
	}


	public Integer getRegFollowUpDays() {
		return regFollowUpDays;
	}


	public void setRegFollowUpDays(Integer regFollowUpDays) {
		this.regFollowUpDays = regFollowUpDays;
	}


	public String getDigitalSignature() {
		return digitalSignature;
	}


	public void setDigitalSignature(String digitalSignature) {
		this.digitalSignature = digitalSignature;
	}


	public String getTxtTrmtClsTime() {
		return txtTrmtClsTime;
	}


	public void setTxtTrmtClsTime(String txtTrmtClsTime) {
		this.txtTrmtClsTime = txtTrmtClsTime;
	}


	public String getImageAndAddressPlace() {
		return imageAndAddressPlace;
	}


	public void setImageAndAddressPlace(String imageAndAddressPlace) {
		this.imageAndAddressPlace = imageAndAddressPlace;
	}


	public Integer getTaxID() {
		return taxID;
	}


	public void setTaxID(Integer taxID) {
		this.taxID = taxID;
	}


	public String getTaxName() {
		return taxName;
	}


	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}


	public float getTaxValue() {
		return taxValue;
	}


	public void setTaxValue(float taxValue) {
		this.taxValue = taxValue;
	}


	public String getFlag() {
		return flag;
	}


	public void setFlag(String flag) {
		this.flag = flag;
	}


	public String getTaxList() {
		return taxList;
	}


	public void setTaxList(String taxList) {
		this.taxList = taxList;
	}


	public float getPrevServiceTax() {
		return prevServiceTax;
	}


	public void setPrevServiceTax(float prevServiceTax) {
		this.prevServiceTax = prevServiceTax;
	}


	public String getHosRegNo() {
		return hosRegNo;
	}


	public void setHosRegNo(String hosRegNo) {
		this.hosRegNo = hosRegNo;
	}


	public String getTxtSerTaxNo() {
		return txtSerTaxNo;
	}


	public void setTxtSerTaxNo(String txtSerTaxNo) {
		this.txtSerTaxNo = txtSerTaxNo;
	}


	public String getTxtGstNo() {
		return txtGstNo;
	}


	public void setTxtGstNo(String txtGstNo) {
		this.txtGstNo = txtGstNo;
	}


	public String getTxtCinNo() {
		return txtCinNo;
	}


	public void setTxtCinNo(String txtCinNo) {
		this.txtCinNo = txtCinNo;
	}


	public String getWebsite() {
		return website;
	}


	public void setWebsite(String website) {
		this.website = website;
	}


	public String getSecPNo() {
		return secPNo;
	}


	public void setSecPNo(String secPNo) {
		this.secPNo = secPNo;
	}


	public String getPanNo() {
		return PanNo;
	}


	public void setPanNo(String panNo) {
		PanNo = panNo;
	}


	public String getUploadImagePath() {
		return uploadImagePath;
	}


	public void setUploadImagePath(String uploadImagePath) {
		this.uploadImagePath = uploadImagePath;
	}


	public String getNabhImagePath() {
		return nabhImagePath;
	}


	public void setNabhImagePath(String nabhImagePath) {
		this.nabhImagePath = nabhImagePath;
	}


	public String getHospitalCreatedDate() {
		return hospitalCreatedDate;
	}


	public void setHospitalCreatedDate(String hospitalCreatedDate) {
		this.hospitalCreatedDate = hospitalCreatedDate;
	}


	public Integer getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}


	public Integer getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}


	public Integer getDeletedBy() {
		return deletedBy;
	}


	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}


	public String getDeleted() {
		return deleted;
	}


	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}


	public Date getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public Date getUpdatedDate() {
		return updatedDate;
	}


	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}


	public Date getDeletedDate() {
		return deletedDate;
	}


	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}


	public List<HospitalInfoDto> getListhospitalInfo() {
		return listhospitalInfo;
	}


	public void setListhospitalInfo(List<HospitalInfoDto> listhospitalInfo) {
		this.listhospitalInfo = listhospitalInfo;
	}


	@Column(name = "hospital_Created_Date")
	private String hospitalCreatedDate;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	
	@Transient
	private List<HospitalInfoDto> listhospitalInfo;
	
	

}
