package com.hms.administrator.dto;

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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name="hospital")
public class HospitalDetails {
	
	@Id
	@GeneratedValue
	@Column(name = "idhospital")
	private int idhospital;
	
	@Column(name="hospitalName")
	private String hospitalName;
	
	@Column(name="initialsName")
	private String initialsName;
	
	@Column(name="hospitalCity")
	private String hospitalCity;
	
	@Column(name="hospitalState")
	private String hospitalState;
	
	@Transient
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
	
	@Column(name="lis_logo_Path")
	private String lisLogoPath;
	
	@Column(name="serviceTax")
	private float serviceTax;
	
	@Column(name="billDayFrmTime")
	private Time billDayFrmTime;
	
	@Column(name="billDayToTime")
	private Time billDayToTime;
		
	@Column(name="anesthetistCharges")
	private String anesthetistCharges;
	
	@Column(name="emergencyCharges")
	private float emergencyCharges;
	
	@Column(name="infectionCharges")
	private float infectionCharges;
	
	@Column(name="bedRiddenCharges")
	private float bedRiddenCharges;
	
	@Column(name="servoCharges")
	private float servoCharges=0;
	
	@Column(name="surInstruCharges")
	private float surInstruCharges=0;
	
	@Column(name="surgical_charges_uptotwohrs")
	private float surChrtwoHrs=0;
	
	@Column(name="surgical_charges_uptofourhrs")
	private float surChrFourHrs=0;
	
	@Column(name="surgical_charges_beyondfourhrs")
	private float surChrBeyondFourHrs=0;
	
	@Column(name="mlc_charges")
	private float mlcCharges;
	
	@Column(name="initials")
	private String initials="";
	
	@Column(name="corporateAccId")
	private Integer corporateAccId=0;

	@Column(name="doctor_followup_days")
	private Integer docFollowUpDays;
	
	@Column(name="registration_followup_days")
	private Integer regFollowUpDays;
	
	@Transient	
	@Column(name="digitalSignature")
	private String digitalSignature;
	
	@Column(name="txtTrmtClsTime")
	private String txtTrmtClsTime;
	
	@Column(name="imageAndAddressPlace")
	private String imageAndAddressPlace;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;
	
	@Column(name="sandbox_integration_flag")
	private char sandboxIntegrationFlag='N';
	
	@Transient
	private List<HospitalDetails> listHospitalDetails;
	
	@Transient
	private int taxID=0;
	
	@Transient
	private String taxName="";
	
	@Transient
	private float taxValue=0;
	
	@Transient
	private String flag;
	
	@Transient
	private String taxList="";
	
	@Transient
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
	private String panNo;
	
	@Column(name="uploadImagePath")
	private String uploadImagePath;
	
	@Column(name="nabhImagePath")
	private String nabhImagePath;
	
	@Column(name = "hospital_Created_Date")
	private Date hospitalCreatedDate;
	
	@Column(name = "logoPath")
	private String	logoPath;
	
	@Column(name = "hospital_initial")
	private String	hospital_initial;
	
	@Column(name = "nabh_logo_path")
	private String nabh_logo_path;
	
	@Transient
	private int idhospitalAccInfo =0;
	
	@Transient
	private float AneNormal=0;

	@Transient
	private float AneStandBy=0;
	
	@Transient
	private float AstSurgeonChrg=0;
	
	@Transient
	private String	ChrgType="";
	
	@Transient
	private float IPDFee=0;
	
	@Transient
	private float OTEmerchrg=0;
	
	@Transient
	private String	OTFrmTime;
	
	@Transient
	private String	OTToTime;
	
	@Transient
	private float	OTafterOTtime;
	
	@Transient
	private Time	OpEmerFrmTime;
	
	@Transient
	private float OTcharge=0;
	
	@Transient
	private Time	OpEmerToTime;
	
	@Transient
	private float	Preanechrg=0;

	@Transient
	private String	adminChargesFlag="";
	
	@Transient
	private String	adminServiceid="";
	
	@Transient
	private Integer	adminSubServiceid=0;
	
	@Transient
	private int	bedHours=0;	
	
	@Transient
	private float	doctorRoundChargesAfterRoundTime;
	
	@Transient
	private float emrAdmChrg = 0;
	
	@Transient
	private int	emrAdmChrgFlag;
	
	@Transient
	private double	emrChrPer;

	@Transient
	private String	emrEndTime;
	
	@Transient
	private String	emrStartTime;
	
	@Transient
	private float	operationEmergencyCharges;
		
	@Transient
	private double	ppnPer;
	
	@Transient
	private double	refDocPer;	
	
	@Transient
	private String	typeOfBilling="";

	@Transient
	private float adminChrg=0;
	
	@Transient
	private float	TDS=0;

	@Transient
	private float	TPAChr=0;
	
	
	private String appoDure;
	
	
	private Time appoStrtTime;

	
	private Time appoEndTime;

	@Column(name = "hospitalCreatedBy",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "currencyId")
	private Integer	currencyId=0 ;
	
	@Column(name = "hospital_unit_id")
	private Integer	hospitalUnitId=0 ;
	
	@Column(name = "surgicalInstruCharges")
	private float	surgicalInstruCharges;	
	
	//for medical Information 
	
	@Column(name="medicalName")
	private String medicalName;
	
	@Column(name="medicalAddress")
	private String medicalAddress;
	
	@Column(name="medicalCity")
	private String medicalCity;
	
	@Column(name="medicalState")
	private String medicalState;
	
	@Column(name="medicalCountry")
	private String medicalCountry;
	
	@Column(name="medicalZipCode")
	private String medicalZipCode;
	
	@Column(name="medicalEmail")
	private String medicalEmail;
	
	@Column(name="medicalContact")
	private String medicalContact;
	
	@Column(name="alternativeMedicalContact")
	private String alternativeMedicalContact;
	
	@Column(name="druglicense")
	private String druglicense;
	
	@Column(name="drugLicense1")
	private String drugLicense1;
	
	@Column(name="medicalGstNo")
	private String medicalGstNo;
	
	@Column(name = "medLogoPath")
	private String	medLogoPath;
	
	
	
	//for pathology Information 
	
		@Column(name="pathology_name")
		private String pathologyName;
		
		@Column(name="pathology_address")
		private String pathologyAddress;
		
		@Column(name="pathology_email")
		private String pathologyemail;
		
		@Column(name="pathology_contact")
		private String pathologyContact;
		
		@Column(name="pathology_mobile")
		private String pathologyMobile;
		
		@Column(name="pathologist_name")
		private String pathologistName;
		
		@Column(name="pathologist_qualification")
		private String pathologistQualification;
		
		@Column(name="designation")
		private String designation;
		
		@Column(name="pathology_logo")
		private String pathologyLogo;
	
	@Column(name="hospitalRegCharges_diag")
	private String hospitalRegChargesDiag;
	
	public String getHospitalRegChargesDiag() {
		return hospitalRegChargesDiag;
	}

	public void setHospitalRegChargesDiag(String hospitalRegChargesDiag) {
		this.hospitalRegChargesDiag = hospitalRegChargesDiag;
	}

	public String getMedLogoPath() {
		return medLogoPath;
	}

	public void setMedLogoPath(String medLogoPath) {
		this.medLogoPath = medLogoPath;
	}

	public String getMedicalName() {
		return medicalName;
	}

	public void setMedicalName(String medicalName) {
		this.medicalName = medicalName;
	}

	public String getMedicalAddress() {
		return medicalAddress;
	}

	public void setMedicalAddress(String medicalAddress) {
		this.medicalAddress = medicalAddress;
	}

	public String getMedicalCity() {
		return medicalCity;
	}

	public void setMedicalCity(String medicalCity) {
		this.medicalCity = medicalCity;
	}

	public String getMedicalState() {
		return medicalState;
	}

	public void setMedicalState(String medicalState) {
		this.medicalState = medicalState;
	}

	public String getMedicalCountry() {
		return medicalCountry;
	}

	public void setMedicalCountry(String medicalCountry) {
		this.medicalCountry = medicalCountry;
	}

	public String getMedicalZipCode() {
		return medicalZipCode;
	}

	public void setMedicalZipCode(String medicalZipCode) {
		this.medicalZipCode = medicalZipCode;
	}

	public String getMedicalEmail() {
		return medicalEmail;
	}

	public void setMedicalEmail(String medicalEmail) {
		this.medicalEmail = medicalEmail;
	}

	public String getMedicalContact() {
		return medicalContact;
	}

	public void setMedicalContact(String medicalContact) {
		this.medicalContact = medicalContact;
	}

	public String getAlternativeMedicalContact() {
		return alternativeMedicalContact;
	}

	public void setAlternativeMedicalContact(String alternativeMedicalContact) {
		this.alternativeMedicalContact = alternativeMedicalContact;
	}

	public String getDruglicense() {
		return druglicense;
	}

	public void setDruglicense(String druglicense) {
		this.druglicense = druglicense;
	}

	public String getDrugLicense1() {
		return drugLicense1;
	}

	public void setDrugLicense1(String drugLicense1) {
		this.drugLicense1 = drugLicense1;
	}

	public String getMedicalGstNo() {
		return medicalGstNo;
	}

	public void setMedicalGstNo(String medicalGstNo) {
		this.medicalGstNo = medicalGstNo;
	}

	@JsonProperty("listHosDetail")
	public List<HospitalDetails> getListHospitalDetails() {
		return listHospitalDetails;
	}

	@JsonProperty("listHosDetail")
	public void setListHospitalDetails(List<HospitalDetails> listHospitalDetails) {
		this.listHospitalDetails = listHospitalDetails;
	}
	
	public Integer getAdminSubServiceid() {
		return adminSubServiceid;
	}

	public void setAdminSubServiceid(Integer adminSubServiceid) {
		this.adminSubServiceid = adminSubServiceid;
	}
	@JsonProperty("appoDure")
	public String getAppoDure() {
		return appoDure;
	}
	
	@JsonProperty("appoDure")
	public void setAppoDure(String appoDure) {
		this.appoDure = appoDure;
	}
	
	public float getTDS() {
		return TDS;
	}

	public void setTDS(float tDS) {
		TDS = tDS;
	}

	public float getTPAChr() {
		return TPAChr;
	}

	public void setTPAChr(float tPAChr) {
		TPAChr = tPAChr;
	}

	public float getAdminChrg() {
		return adminChrg;
	}

	public void setAdminChrg(float adminChrg) {
		this.adminChrg = adminChrg;
	}

	
	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public String getHospital_initial() {
		return hospital_initial;
	}

	public void setHospital_initial(String hospital_initial) {
		this.hospital_initial = hospital_initial;
	}

	public String getNabh_logo_path() {
		return nabh_logo_path;
	}

	public void setNabh_logo_path(String nabh_logo_path) {
		this.nabh_logo_path = nabh_logo_path;
	}

	public int getIdhospitalAccInfo() {
		return idhospitalAccInfo;
	}

	public void setIdhospitalAccInfo(int idhospitalAccInfo) {
		this.idhospitalAccInfo = idhospitalAccInfo;
	}

	public float getAneNormal() {
		return AneNormal;
	}

	public void setAneNormal(float aneNormal) {
		AneNormal = aneNormal;
	}

	public float getAneStandBy() {
		return AneStandBy;
	}

	public void setAneStandBy(float aneStandBy) {
		AneStandBy = aneStandBy;
	}

	public float getAstSurgeonChrg() {
		return AstSurgeonChrg;
	}

	public void setAstSurgeonChrg(float astSurgeonChrg) {
		AstSurgeonChrg = astSurgeonChrg;
	}

	public String getChrgType() {
		return ChrgType;
	}

	public void setChrgType(String chrgType) {
		ChrgType = chrgType;
	}

	public float getIPDFee() {
		return IPDFee;
	}

	public void setIPDFee(float iPDFee) {
		IPDFee = iPDFee;
	}

	public float getOTEmerchrg() {
		return OTEmerchrg;
	}

	public void setOTEmerchrg(float oTEmerchrg) {
		OTEmerchrg = oTEmerchrg;
	}

	public String getOTFrmTime() {
		return OTFrmTime;
	}

	public void setOTFrmTime(String oTFrmTime) {
		OTFrmTime = oTFrmTime;
	}

	public String getOTToTime() {
		return OTToTime;
	}

	public void setOTToTime(String oTToTime) {
		OTToTime = oTToTime;
	}

	public float getOTafterOTtime() {
		return OTafterOTtime;
	}

	public void setOTafterOTtime(float oTafterOTtime) {
		OTafterOTtime = oTafterOTtime;
	}

	public Time getOpEmerFrmTime() {
		return OpEmerFrmTime;
	}

	public void setOpEmerFrmTime(Time opEmerFrmTime) {
		OpEmerFrmTime = opEmerFrmTime;
	}

	public Time getOpEmerToTime() {
		return OpEmerToTime;
	}

	public void setOpEmerToTime(Time opEmerToTime) {
		OpEmerToTime = opEmerToTime;
	}

	public float getOTcharge() {
		return OTcharge;
	}

	public void setOTcharge(float oTcharge) {
		OTcharge = oTcharge;
	}

	public float getPreanechrg() {
		return Preanechrg;
	}

	public void setPreanechrg(float preanechrg) {
		Preanechrg = preanechrg;
	}

	public String getAdminChargesFlag() {
		return adminChargesFlag;
	}

	public void setAdminChargesFlag(String adminChargesFlag) {
		this.adminChargesFlag = adminChargesFlag;
	}

	public String getAdminServiceid() {
		return adminServiceid;
	}

	public void setAdminServiceid(String adminServiceid) {
		this.adminServiceid = adminServiceid;
	}

	public int getBedHours() {
		return bedHours;
	}

	public void setBedHours(int bedHours) {
		this.bedHours = bedHours;
	}

	public Integer getCurrencyId() {
		return currencyId;
	}

	public void setCurrencyId(Integer currencyId) {
		this.currencyId = currencyId;
	}

	public float getDoctorRoundChargesAfterRoundTime() {
		return doctorRoundChargesAfterRoundTime;
	}

	public void setDoctorRoundChargesAfterRoundTime(
			float doctorRoundChargesAfterRoundTime) {
		this.doctorRoundChargesAfterRoundTime = doctorRoundChargesAfterRoundTime;
	}

	public float getEmrAdmChrg() {
		return emrAdmChrg;
	}

	public void setEmrAdmChrg(float emrAdmChrg) {
		this.emrAdmChrg = emrAdmChrg;
	}

	public int getEmrAdmChrgFlag() {
		return emrAdmChrgFlag;
	}

	public void setEmrAdmChrgFlag(int emrAdmChrgFlag) {
		this.emrAdmChrgFlag = emrAdmChrgFlag;
	}

	public double getEmrChrPer() {
		return emrChrPer;
	}

	public void setEmrChrPer(double emrChrPer) {
		this.emrChrPer = emrChrPer;
	}

	public String getEmrEndTime() {
		return emrEndTime;
	}

	public void setEmrEndTime(String emrEndTime) {
		this.emrEndTime = emrEndTime;
	}

	public String getEmrStartTime() {
		return emrStartTime;
	}

	public void setEmrStartTime(String emrStartTime) {
		this.emrStartTime = emrStartTime;
	}

	public float getOperationEmergencyCharges() {
		return operationEmergencyCharges;
	}

	public void setOperationEmergencyCharges(float operationEmergencyCharges) {
		this.operationEmergencyCharges = operationEmergencyCharges;
	}

	public double getPpnPer() {
		return ppnPer;
	}

	public void setPpnPer(double ppnPer) {
		this.ppnPer = ppnPer;
	}

	public double getRefDocPer() {
		return refDocPer;
	}

	public void setRefDocPer(double refDocPer) {
		this.refDocPer = refDocPer;
	}

	public float getSurgicalInstruCharges() {
		return surgicalInstruCharges;
	}

	public void setSurgicalInstruCharges(float surgicalInstruCharges) {
		this.surgicalInstruCharges = surgicalInstruCharges;
	}

	public String getTypeOfBilling() {
		return typeOfBilling;
	}

	public void setTypeOfBilling(String typeOfBilling) {
		this.typeOfBilling = typeOfBilling;
	}

	@JsonProperty("PanNo")
	public String getPanNo() {
		return panNo;
	}
	@JsonProperty("PanNo")
	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}
	//@JsonProperty("idhp")
	public int getIdhospital() {
		return idhospital;
	}
	//@JsonProperty("idhp")
	public void setIdhospital(int idhospital) {
		this.idhospital = idhospital;
	}
	@JsonProperty("hn")
	public String getHospitalName() {
		return hospitalName;
	}

	public String getInitialsName() {
		return initialsName;
	}

	public void setInitialsName(String initialsName) {
		this.initialsName = initialsName;
	}
	@JsonProperty("hn")
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	@JsonProperty("hcity")
	public String getHospitalCity() {
		return hospitalCity;
	}

	@JsonProperty("hcity")
	public void setHospitalCity(String hospitalCity) {
		this.hospitalCity = hospitalCity;
	}
	@JsonProperty("hs")
	public String getHospitalState() {
		return hospitalState;
	}

	@JsonProperty("hs")
	public void setHospitalState(String hospitalState) {
		this.hospitalState = hospitalState;
	}

	@JsonProperty("hc")
	public String getHospitalCountry() {
		return hospitalCountry;
	}
	
	@JsonProperty("hc")
	public void setHospitalCountry(String hospitalCountry) {
		this.hospitalCountry = hospitalCountry;
	}

	@JsonProperty("hz")
	public String getHospitalZip() {
		return hospitalZip;
	}

	@JsonProperty("hz")
	public void setHospitalZip(String hospitalZip) {
		this.hospitalZip = hospitalZip;
	}

	@JsonProperty("em")
	public String getHospitalEmail() {
		return hospitalEmail;
	}

	@JsonProperty("em")
	public void setHospitalEmail(String hospitalEmail) {
		this.hospitalEmail = hospitalEmail;
	}

	@JsonProperty("ha")
	public String getHospitalAddress() {
		return hospitalAddress;
	}

	@JsonProperty("ha")
	public void setHospitalAddress(String hospitalAddress) {
		this.hospitalAddress = hospitalAddress;
	}

	@JsonProperty("hcon")
	public String getHospitalContact() {
		return hospitalContact;
	}

	@JsonProperty("hcon")
	public void setHospitalContact(String hospitalContact) {
		this.hospitalContact = hospitalContact;
	}

	@JsonProperty("hx")
	public String getHospitalFax() {
		return hospitalFax;
	}
	@JsonProperty("hx")

	public void setHospitalFax(String hospitalFax) {
		this.hospitalFax = hospitalFax;
	}

	@JsonProperty("hrate")
	public String getHospitalRegCharges() {
		return hospitalRegCharges;
	}

	@JsonProperty("hrate")
	public void setHospitalRegCharges(String hospitalRegCharges) {
		this.hospitalRegCharges = hospitalRegCharges;
	}

	@JsonProperty("flpt")
	public String getFilePath() {
		return filePath;
	}

	@JsonProperty("flpt")
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getLisLogoPath() {
		return lisLogoPath;
	}

	public void setLisLogoPath(String lisLogoPath) {
		this.lisLogoPath = lisLogoPath;
	}

	@JsonProperty("serTax")
	public float getServiceTax() {
		return serviceTax;
	}

	@JsonProperty("serTax")
	public void setServiceTax(float serviceTax) {
		this.serviceTax = serviceTax;
	}

	@JsonProperty("bdFrmTim")
	public Time getBillDayFrmTime() {
		return billDayFrmTime;
	}

	@JsonProperty("bdFrmTim")
	public void setBillDayFrmTime(Time billDayFrmTime) {
		this.billDayFrmTime = billDayFrmTime;
	}

	@JsonProperty("bdToTim")
	public Time getBillDayToTime() {
		return billDayToTime;
	}

	@JsonProperty("bdToTim")
	public void setBillDayToTime(Time billDayToTime) {
		this.billDayToTime = billDayToTime;
	}

	/*@JsonProperty
	public Time getDocRdFrmTime() {
		return DocRdFrmTime;
	}

	@JsonProperty
	public void setDocRdFrmTime(Time docRdFrmTime) {
		DocRdFrmTime = docRdFrmTime;
	}
*/
	@JsonProperty("AnaChar")
	public String getAnesthetistCharges() {
		return anesthetistCharges;
	}

	@JsonProperty("AnaChar")
	public void setAnesthetistCharges(String anesthetistCharges) {
		this.anesthetistCharges = anesthetistCharges;
	}

	@JsonProperty("emrchr")
	public float getEmergencyCharges() {
		return emergencyCharges;
	}

	@JsonProperty("emrchr")
	public void setEmergencyCharges(float emergencyCharges) {
		this.emergencyCharges = emergencyCharges;
	}

	@JsonProperty("infchr")
	public float getInfectionCharges() {
		return infectionCharges;
	}

	@JsonProperty("infchr")
	public void setInfectionCharges(float infectionCharges) {
		this.infectionCharges = infectionCharges;
	}
	
	@JsonProperty("rdCharges")
	public float getBedRiddenCharges() {
		return bedRiddenCharges;
	}

	@JsonProperty("rdCharges")
	public void setBedRiddenCharges(float bedRiddenCharges) {
		this.bedRiddenCharges = bedRiddenCharges;
	}

	@JsonProperty("serCharges")
	public float getServoCharges() {
		return servoCharges;
	}

	@JsonProperty("serCharges")
	public void setServoCharges(float servoCharges) {
		this.servoCharges = servoCharges;
	}

	@JsonProperty("surinstr")
	public float getSurInstruCharges() {
		return surInstruCharges;
	}

	@JsonProperty("surinstr")
	public void setSurInstruCharges(float surInstruCharges) {
		this.surInstruCharges = surInstruCharges;
	}

	@JsonProperty("surchrtwhrs")
	public float getSurChrtwoHrs() {
		return surChrtwoHrs;
	}

	@JsonProperty("surchrtwhrs")
	public void setSurChrtwoHrs(float surChrtwoHrs) {
		this.surChrtwoHrs = surChrtwoHrs;
	}

	@JsonProperty("surchrfrhrs")
	public float getSurChrFourHrs() {
		return surChrFourHrs;
	}

	@JsonProperty("surchrfrhrs")
	public void setSurChrFourHrs(float surChrFourHrs) {
		this.surChrFourHrs = surChrFourHrs;
	}

	@JsonProperty("surchrbyfrhrs")
	public float getSurChrBeyondFourHrs() {
		return surChrBeyondFourHrs;
	}

	@JsonProperty("surchrbyfrhrs")
	public void setSurChrBeyondFourHrs(float surChrBeyondFourHrs) {
		this.surChrBeyondFourHrs = surChrBeyondFourHrs;
	}

	@JsonProperty("mlcChr")
	public float getMlcCharges() {
		return mlcCharges;
	}

	@JsonProperty("mlcChr")
	public void setMlcCharges(float mlcCharges) {
		this.mlcCharges = mlcCharges;
	}

	@JsonProperty("initials")
	public String getInitials() {
		return initials;
	}

	@JsonProperty("initials")
	public void setInitials(String initials) {
		this.initials = initials;
	}

	@JsonProperty("corporateAccId")
	public Integer getCorporateAccId() {
		return corporateAccId;
	}

	@JsonProperty("corporateAccId")
	public void setCorporateAccId(Integer corporateAccId) {
		this.corporateAccId = corporateAccId;
	}

	@JsonProperty("docfollowup")
	public Integer getDocFollowUpDays() {
		return docFollowUpDays;
	}

	@JsonProperty("docfollowup")
	public void setDocFollowUpDays(Integer docFollowUpDays) {
		this.docFollowUpDays = docFollowUpDays;
	}

	@JsonProperty("regfollowup")
	public Integer getRegFollowUpDays() {
		return regFollowUpDays;
	}

	@JsonProperty("regfollowup")
	public void setRegFollowUpDays(Integer regFollowUpDays) {
		this.regFollowUpDays = regFollowUpDays;
	}

	public String getDigitalSignature() {
		return digitalSignature;
	}

	public void setDigitalSignature(String digitalSignature) {
		this.digitalSignature = digitalSignature;
	}

	@JsonProperty("txtTrmtClsTime")
	public String getTxtTrmtClsTime() {
		return txtTrmtClsTime;
	}

	@JsonProperty("txtTrmtClsTime")
	public void setTxtTrmtClsTime(String txtTrmtClsTime) {
		this.txtTrmtClsTime = txtTrmtClsTime;
	}

	@JsonProperty("imageAndAddressPlace")
	public String getImageAndAddressPlace() {
		return imageAndAddressPlace;
	}

	@JsonProperty("imageAndAddressPlace")
	public void setImageAndAddressPlace(String imageAndAddressPlace) {
		this.imageAndAddressPlace = imageAndAddressPlace;
	}

	@JsonProperty("taxID")
	public int getTaxID() {
		return taxID;
	}

	@JsonProperty("taxID")
	public void setTaxID(int taxID) {
		this.taxID = taxID;
	}

	@JsonProperty("taxName")
	public String getTaxName() {
		return taxName;
	}

	@JsonProperty("taxName")
	public void setTaxName(String taxName) {
		this.taxName = taxName;
	}

	@JsonProperty("taxValue")
	public float getTaxValue() {
		return taxValue;
	}

	@JsonProperty("taxValue")
	public void setTaxValue(float taxValue) {
		this.taxValue = taxValue;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	@JsonProperty("taxList")
	public String getTaxList() {
		return taxList;
	}

	@JsonProperty("taxList")
	public void setTaxList(String taxList) {
		this.taxList = taxList;
	}

	@JsonProperty("prevSerTax")
	public float getPrevServiceTax() {
		return prevServiceTax;
	}

	@JsonProperty("prevSerTax")
	public void setPrevServiceTax(float prevServiceTax) {
		this.prevServiceTax = prevServiceTax;
	}

	@JsonProperty("hosRegNo")
	public String getHosRegNo() {
		return hosRegNo;
	}

	@JsonProperty("hosRegNo")
	public void setHosRegNo(String hosRegNo) {
		this.hosRegNo = hosRegNo;
	}

	@JsonProperty("txtSerTaxNo")
	public String getTxtSerTaxNo() {
		return txtSerTaxNo;
	}

	@JsonProperty("txtSerTaxNo")
	public void setTxtSerTaxNo(String txtSerTaxNo) {
		this.txtSerTaxNo = txtSerTaxNo;
	}

	@JsonProperty("txtGstNo")
	public String getTxtGstNo() {
		return txtGstNo;
	}

	@JsonProperty("txtGstNo")
	public void setTxtGstNo(String txtGstNo) {
		this.txtGstNo = txtGstNo;
	}

	@JsonProperty("txtCinNo")
	public String getTxtCinNo() {
		return txtCinNo;
	}

	@JsonProperty("txtCinNo")
	public void setTxtCinNo(String txtCinNo) {
		this.txtCinNo = txtCinNo;
	}

	@JsonProperty("website")
	public String getWebsite() {
		return website;
	}

	@JsonProperty("website")
	public void setWebsite(String website) {
		this.website = website;
	}

	@JsonProperty("secPNo")
	public String getSecPNo() {
		return secPNo;
	}

	@JsonProperty("secPNo")
	public void setSecPNo(String secPNo) {
		this.secPNo = secPNo;
	}
	
	@JsonProperty("imgpt")
	public String getUploadImagePath() {
		return uploadImagePath;
	}
	
	@JsonProperty("imgpt")
	public void setUploadImagePath(String uploadImagePath) {
		this.uploadImagePath = uploadImagePath;
	}

	public String getNabhImagePath() {
		return nabhImagePath;
	}

	public void setNabhImagePath(String nabhImagePath) {
		this.nabhImagePath = nabhImagePath;
	}
	@JsonProperty("appoStrtTime")
	public Time getAppoStrtTime() {
		return appoStrtTime;
	}
	@JsonProperty("appoStrtTime")
	public void setAppoStrtTime(Time appoStrtTime) {
		this.appoStrtTime = appoStrtTime;
	}
	
	@JsonProperty("appoEndTime")
	public Time getAppoEndTime() {
		return appoEndTime;
	}
	
	@JsonProperty("appoEndTime")
	public void setAppoEndTime(Time appoEndTime) {
		this.appoEndTime = appoEndTime;
	}

	public Date getHospitalCreatedDate() {
		return hospitalCreatedDate;
	}

	public void setHospitalCreatedDate(Date hospitalCreatedDate) {
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

	public Integer getHospitalUnitId() {
		return hospitalUnitId;
	}

	public void setHospitalUnitId(Integer hospitalUnitId) {
		this.hospitalUnitId = hospitalUnitId;
	}

	public char getSandboxIntegrationFlag() {
		return sandboxIntegrationFlag;
	}

	public void setSandboxIntegrationFlag(char sandboxIntegrationFlag) {
		this.sandboxIntegrationFlag = sandboxIntegrationFlag;
	}
	
	
	
	public String getPathologyName() {
		return pathologyName;
	}

	public void setPathologyName(String pathologyName) {
		this.pathologyName = pathologyName;
	}

	public String getPathologyAddress() {
		return pathologyAddress;
	}

	public void setPathologyAddress(String pathologyAddress) {
		this.pathologyAddress = pathologyAddress;
	}

	public String getPathologyemail() {
		return pathologyemail;
	}

	public void setPathologyemail(String pathologyemail) {
		this.pathologyemail = pathologyemail;
	}

	public String getPathologyContact() {
		return pathologyContact;
	}

	public void setPathologyContact(String pathologyContact) {
		this.pathologyContact = pathologyContact;
	}

	public String getPathologyMobile() {
		return pathologyMobile;
	}

	public void setPathologyMobile(String pathologyMobile) {
		this.pathologyMobile = pathologyMobile;
	}

	public String getPathologistName() {
		return pathologistName;
	}

	public void setPathologistName(String pathologistName) {
		this.pathologistName = pathologistName;
	}

	public String getPathologistQualification() {
		return pathologistQualification;
	}

	public void setPathologistQualification(String pathologistQualification) {
		this.pathologistQualification = pathologistQualification;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getPathologyLogo() {
		return pathologyLogo;
	}

	public void setPathologyLogo(String pathologyLogo) {
		this.pathologyLogo = pathologyLogo;
	}

	@Override
	public String toString() {
		return "HospitalDetails [idhospital=" + idhospital + ", hospitalName=" + hospitalName + ", initialsName="
				+ initialsName + ", hospitalCity=" + hospitalCity + ", hospitalState=" + hospitalState
				+ ", hospitalCountry=" + hospitalCountry + ", hospitalZip=" + hospitalZip + ", hospitalEmail="
				+ hospitalEmail + ", hospitalAddress=" + hospitalAddress + ", hospitalContact=" + hospitalContact
				+ ", hospitalFax=" + hospitalFax + ", hospitalRegCharges=" + hospitalRegCharges + ", filePath="
				+ filePath + ", lisLogoPath=" + lisLogoPath + ", serviceTax=" + serviceTax + ", billDayFrmTime="
				+ billDayFrmTime + ", billDayToTime=" + billDayToTime + ", anesthetistCharges=" + anesthetistCharges
				+ ", emergencyCharges=" + emergencyCharges + ", infectionCharges=" + infectionCharges
				+ ", bedRiddenCharges=" + bedRiddenCharges + ", servoCharges=" + servoCharges + ", surInstruCharges="
				+ surInstruCharges + ", surChrtwoHrs=" + surChrtwoHrs + ", surChrFourHrs=" + surChrFourHrs
				+ ", surChrBeyondFourHrs=" + surChrBeyondFourHrs + ", mlcCharges=" + mlcCharges + ", initials="
				+ initials + ", corporateAccId=" + corporateAccId + ", docFollowUpDays=" + docFollowUpDays
				+ ", regFollowUpDays=" + regFollowUpDays + ", digitalSignature=" + digitalSignature
				+ ", txtTrmtClsTime=" + txtTrmtClsTime + ", imageAndAddressPlace=" + imageAndAddressPlace
				+ ", createdDate=" + createdDate + ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate
				+ ", sandboxIntegrationFlag=" + sandboxIntegrationFlag + ", listHospitalDetails=" + listHospitalDetails
				+ ", taxID=" + taxID + ", taxName=" + taxName + ", taxValue=" + taxValue + ", flag=" + flag
				+ ", taxList=" + taxList + ", prevServiceTax=" + prevServiceTax + ", hosRegNo=" + hosRegNo
				+ ", txtSerTaxNo=" + txtSerTaxNo + ", txtGstNo=" + txtGstNo + ", txtCinNo=" + txtCinNo + ", website="
				+ website + ", secPNo=" + secPNo + ", panNo=" + panNo + ", uploadImagePath=" + uploadImagePath
				+ ", nabhImagePath=" + nabhImagePath + ", hospitalCreatedDate=" + hospitalCreatedDate + ", logoPath="
				+ logoPath + ", hospital_initial=" + hospital_initial + ", nabh_logo_path=" + nabh_logo_path
				+ ", idhospitalAccInfo=" + idhospitalAccInfo + ", AneNormal=" + AneNormal + ", AneStandBy=" + AneStandBy
				+ ", AstSurgeonChrg=" + AstSurgeonChrg + ", ChrgType=" + ChrgType + ", IPDFee=" + IPDFee
				+ ", OTEmerchrg=" + OTEmerchrg + ", OTFrmTime=" + OTFrmTime + ", OTToTime=" + OTToTime
				+ ", OTafterOTtime=" + OTafterOTtime + ", OpEmerFrmTime=" + OpEmerFrmTime + ", OTcharge=" + OTcharge
				+ ", OpEmerToTime=" + OpEmerToTime + ", Preanechrg=" + Preanechrg + ", adminChargesFlag="
				+ adminChargesFlag + ", adminServiceid=" + adminServiceid + ", adminSubServiceid=" + adminSubServiceid
				+ ", bedHours=" + bedHours + ", doctorRoundChargesAfterRoundTime=" + doctorRoundChargesAfterRoundTime
				+ ", emrAdmChrg=" + emrAdmChrg + ", emrAdmChrgFlag=" + emrAdmChrgFlag + ", emrChrPer=" + emrChrPer
				+ ", emrEndTime=" + emrEndTime + ", emrStartTime=" + emrStartTime + ", operationEmergencyCharges="
				+ operationEmergencyCharges + ", ppnPer=" + ppnPer + ", refDocPer=" + refDocPer + ", typeOfBilling="
				+ typeOfBilling + ", adminChrg=" + adminChrg + ", TDS=" + TDS + ", TPAChr=" + TPAChr + ", appoDure="
				+ appoDure + ", appoStrtTime=" + appoStrtTime + ", appoEndTime=" + appoEndTime + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy + ", deleted=" + deleted
				+ ", currencyId=" + currencyId + ", hospitalUnitId=" + hospitalUnitId + ", surgicalInstruCharges="
				+ surgicalInstruCharges + ", medicalName=" + medicalName + ", medicalAddress=" + medicalAddress
				+ ", medicalCity=" + medicalCity + ", medicalState=" + medicalState + ", medicalCountry="
				+ medicalCountry + ", medicalZipCode=" + medicalZipCode + ", medicalEmail=" + medicalEmail
				+ ", medicalContact=" + medicalContact + ", alternativeMedicalContact=" + alternativeMedicalContact
				+ ", druglicense=" + druglicense + ", drugLicense1=" + drugLicense1 + ", medicalGstNo=" + medicalGstNo
				+ ", medLogoPath=" + medLogoPath + ", pathologyName=" + pathologyName + ", pathologyAddress="
				+ pathologyAddress + ", pathologyemail=" + pathologyemail + ", pathologyContact=" + pathologyContact
				+ ", pathologyMobile=" + pathologyMobile + ", pathologistName=" + pathologistName
				+ ", pathologistQualification=" + pathologistQualification + ", designation=" + designation
				+ ", pathologyLogo=" + pathologyLogo + ", hospitalRegChargesDiag=" + hospitalRegChargesDiag + "]";
	}

	
	
	
	
}



