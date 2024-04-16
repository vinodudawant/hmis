package com.hms.administrator.dto;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ehat.dto.SubServiceDto;

@Entity
@Table(name="hospitalaccinfo")
public class HospitalAccDetails {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idhospitalAccInfo")
	private int idhospitalAccInfo;
	@Column(name = "idHospital")
	private int idhospital;
	@Column(name = "ipdRegFee")
	private float IPDFee;
	@CreationTimestamp
	@Column(name="created_date_time",updatable = false)
	private Date createdDateTime;
	@UpdateTimestamp
	@Column(name="updated_date_time")
	private Date updatedDateTime;
	@Column(name="created_by")
	private Integer createdBy;
	@Column(name="updated_by")
	private Integer updatedBy;
	@Column(name="deleted_by")
	private Integer deleted_by;
	
	@Column(name="unit_id")
	private Integer unitId;
	
	@Column(name="user_id")
	private Integer userId;
	
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
	public Integer getDeleted_by() {
		return deleted_by;
	}
	public void setDeleted_by(Integer deleted_by) {
		this.deleted_by = deleted_by;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getDepPrefix() {
		return depPrefix;
	}
	public void setDepPrefix(String depPrefix) {
		this.depPrefix = depPrefix;
	}
	public String getBillPrefix() {
		return billPrefix;
	}
	public void setBillPrefix(String billPrefix) {
		this.billPrefix = billPrefix;
	}
	public String getBillMiddle() {
		return billMiddle;
	}
	public void setBillMiddle(String billMiddle) {
		this.billMiddle = billMiddle;
	}
	public String getBillSufix() {
		return billSufix;
	}
	public void setBillSufix(String billSufix) {
		this.billSufix = billSufix;
	}
	public Date getCreatedDateTime() {
		return createdDateTime;
	}
	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}
	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}
	@Column(name = "administrativeCharge")
	private float adminChrg;
	@Column(name = "administrativeChargeType")
	private String ChrgType;
	@Column(name = "doctorRoundFrom")
	private Time DocRdFrmTime;
	@Column(name = "doctorRoundTo")
	private Time DocRdToTime;
	@Column(name = "otTimeFrom")
	private Time OTFrmTime;
	@Column(name = "otTimeTo")
	private Time OTToTime;
	@Column(name = "otCharges")
	private Float OTcharge;
	@Column(name = "otChargesAfterOtTime")
	private Float OTafterOTtime;
	@Column(name = "otEmergencyCharge")
	private Float OTEmerchrg;
	@Column(name = "operationTmForEmergeancyFrom")
	private Time OpEmerFrmTime;
	@Column(name = "operationTmForEmergeancyTo")
	private Time OpEmerToTime;
	@Transient
	private Integer corporateAccId;
	@Column(name = "preanesthesiaCharge")
	private Float Preanechrg;
	@Column(name = "tpaProcessing")
	private Float TPAChr;
	@Column(name = "doctorRoundChargesAfterRoundTime")
	private Float doctorRoundChargesAfterRoundTime;
	@Column(name = "operationEmergencyCharges")
	private Float operationEmergencyCharges;
	@Column(name = "anesthesiaNormal")
	private Float AneNormal;
	@Column(name = "anesthesaiStandBy")
	private Float AneStandBy;
	@Column(name = "anesthesiaAsaIv")
	private Float AneAsaIv;
	@Column(name = "assistantSurgeonCharge")
	private Float AstSurgeonChrg;
	@Transient
	private Float infectionCharges;
	@Transient
	private Integer DocFollowUpDays;
	@Column(name = "ipdBillingType")
	private String typeOfBilling;
	@Column(name = "tds")
	private Float TDS;
	@Transient
	private Float surgicalInstruCharges;
	@Column(name = "bedHours")
	private Integer bedHours;
	@Column(name = "emergencyAdmissionFromTime")
	private Time emrStartTime;
	@Column(name = "emergencyAdmissionToTime")
	private Time emrEndTime;
	@Column(name = "emergencyAdmissionCharges")
	private Float emrAdmChrg;
	@Column(name = "emergencyAdmissionChargesFlag")
	private Integer emrAdmChrgFlag;
	@Column(name = "refDocPer")
	private double refDocPer;
	@Column(name = "ppnPer")
	private double ppnPer;
	//added by Vinod  @date 20/11/2017
	@Column(name = "adm_chrg_srv")
	private String  adminServiceid;
	@Column(name = "emrChrPer")
	private double emrChrPer;
	
	@Column(name = "adm_chrg_subser")
	private String  adminSubServiceid;
	@Column(name = "currency_id")
	private int currencyId;
	@Column(name = "admin_charges_flag")
	private String  adminChargesFlag;
	
	@Column(name = "dep_prefix")
	private String  depPrefix;
	
	@Column(name = "bill_prefix")
	private String  billPrefix;
	
	@Column(name = "bill_middle")
	private String  billMiddle;
	
	@Column(name = "bill_sufix")
	private String  billSufix;
	
	@Column(name = "hospital_unit_id")
	private Integer hospitalUnitId;
	
	@Transient
	private List<HospitalAccDetails> arrHospitalAccDetails;
	
	@Transient
	private List<SubServiceDto> listSubServiceDto;
	
	@Transient
	private Integer RegFollowUpDays;
	
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "hospital_acc_id")
	private List<EhatBillPrefix> listEhatBillPrefix;
	
	public String getAdminServiceid() {
		return adminServiceid;
	}
	public void setAdminServiceid(String adminServiceid) {
		this.adminServiceid = adminServiceid;
	}	
	
	public String getAdminSubServiceid() {
		return adminSubServiceid;
	}
	public void setAdminSubServiceid(String adminSubServiceid) {
		this.adminSubServiceid = adminSubServiceid;
	}
	
	public Integer getEmrAdmChrgFlag() {
		return emrAdmChrgFlag;
	}
	public void setEmrAdmChrgFlag(Integer emrAdmChrgFlag) {
		this.emrAdmChrgFlag = emrAdmChrgFlag;
	}
	public Time getEmrStartTime() {
		return emrStartTime;
	}
	public void setEmrStartTime(Time emrStartTime) {
		this.emrStartTime = emrStartTime;
	}
	public Time getEmrEndTime() {
		return emrEndTime;
	}
	public void setEmrEndTime(Time emrEndTime) {
		this.emrEndTime = emrEndTime;
	}
	public Float getEmrAdmChrg() {
		return emrAdmChrg;
	}
	public void setEmrAdmChrg(Float emrAdmChrg) {
		this.emrAdmChrg = emrAdmChrg;
	}
	
	public Integer getBedHours() {
		return bedHours;
	}
	public void setBedHours(Integer bedHours) {
		this.bedHours = bedHours;
	}
	@JsonGetter("TDS")
	public Float getTDS() {
		return TDS;
	}
	@JsonSetter("TDS")
	public void setTDS(Float tDS) {
		TDS = tDS;
	}

	@JsonGetter("surgicalInstruCharges")
	public Float getSurgicalInstruCharges() {
		return surgicalInstruCharges;
	}

	@JsonSetter("surgicalInstruCharges")
	public void setSurgicalInstruCharges(Float surgicalInstruCharges) {
		this.surgicalInstruCharges = surgicalInstruCharges;
	}

	@JsonGetter("dfd")
	public Integer getDocFollowUpDays() {
		return DocFollowUpDays;
	}

	@JsonSetter("dfd")
	public void setDocFollowUpDays(Integer docFollowUpDays) {
		DocFollowUpDays = docFollowUpDays;
	}


	@JsonGetter("rfd")
	public Integer getRegFollowUpDays() {
		return RegFollowUpDays;
	}

	@JsonSetter("rfd")
	public void setRegFollowUpDays(Integer regFollowUpDays) {
		RegFollowUpDays = regFollowUpDays;
	}

	

	@JsonGetter("infeChrg")
	public Float getInfectionCharges() {
		return infectionCharges;
	}

	@JsonSetter("infeChrg")
	public void setInfectionCharges(Float infectionCharges) {
		this.infectionCharges = infectionCharges;
	}

	@JsonGetter("anenor")
	public Float getAneNormal() {
		return AneNormal;
	}

	@JsonSetter("anenor")
	public void setAneNormal(Float aneNormal) {
		AneNormal = aneNormal;
	}

	@JsonGetter("anestand")
	public Float getAneStandBy() {
		return AneStandBy;
	}

	@JsonSetter("anestand")
	public void setAneStandBy(Float aneStandBy) {
		AneStandBy = aneStandBy;
	}

	@JsonGetter("aneasa")
	public Float getAneAsaIv() {
		return AneAsaIv;
	}

	@JsonSetter("aneasa")
	public void setAneAsaIv(Float aneAsaIv) {
		AneAsaIv = aneAsaIv;
	}

	@JsonGetter("opEmrChr")
	public Float getOperationEmergencyCharges() {
		return operationEmergencyCharges;
	}

	@JsonSetter("opEmrChr")
	public void setOperationEmergencyCharges(Float operationEmergencyCharges) {
		this.operationEmergencyCharges = operationEmergencyCharges;
	}

	@JsonGetter("drRoundChr")
	public Float getDoctorRoundChargesAfterRoundTime() {
		return doctorRoundChargesAfterRoundTime;
	}

	@JsonSetter("drRoundChr")
	public void setDoctorRoundChargesAfterRoundTime(
			Float doctorRoundChargesAfterRoundTime) {
		this.doctorRoundChargesAfterRoundTime = doctorRoundChargesAfterRoundTime;
	}

	@JsonGetter("listHosAccDetail")
	public List<HospitalAccDetails> getArrHospitalAccDetails() {
		return arrHospitalAccDetails;
	}

	@JsonSetter("listHosAccDetail")
	public void setArrHospitalAccDetails(
			List<HospitalAccDetails> arrHospitalAccDetails) {
		this.arrHospitalAccDetails = arrHospitalAccDetails;
	}
	
	
	public List<SubServiceDto> getListSubServiceDto() {
		return listSubServiceDto;
	}
	public void setListSubServiceDto(List<SubServiceDto> listSubServiceDto) {
		this.listSubServiceDto = listSubServiceDto;
	}
	@JsonGetter("idhosacc")
	public int getIdhospitalAccInfo() {
		return idhospitalAccInfo;
	}

	@JsonSetter("idhosacc")
	public void setIdhospitalAccInfo(int idhospitalAccInfo) {
		this.idhospitalAccInfo = idhospitalAccInfo;
	}

	@JsonGetter("idhos")
	public int getIdhospital() {
		return idhospital;
	}

	@JsonSetter("idhos")
	public void setIdhospital(int idhospital) {
		this.idhospital = idhospital;
	}

	@JsonGetter("IPD")
	public float getIPDFee() {
		return IPDFee;
	}

	@JsonSetter("IPD")
	public void setIPDFee(float iPDFee) {
		IPDFee = iPDFee;
	}

	@JsonGetter("adminchr")
	public float getAdminChrg() {
		return adminChrg;
	}

	@JsonSetter("adminchr")
	public void setAdminChrg(float adminChrg) {
		this.adminChrg = adminChrg;
	}

	@JsonGetter("drdfrm")
	public Time getDocRdFrmTime() {
		return DocRdFrmTime;
	}

	@JsonSetter("drdfrm")
	public void setDocRdFrmTime(Time docRdFrmTime) {
		DocRdFrmTime = docRdFrmTime;
	}

	@JsonGetter("drdto")
	public Time getDocRdToTime() {
		return DocRdToTime;
	}

	@JsonSetter("drdto")
	public void setDocRdToTime(Time docRdToTime) {
		DocRdToTime = docRdToTime;
	}

	@JsonGetter("otfrm")
	public Time getOTFrmTime() {
		return OTFrmTime;
	}

	@JsonSetter("otfrm")
	public void setOTFrmTime(Time oTFrmTime) {
		OTFrmTime = oTFrmTime;
	}

	@JsonGetter("otto")
	public Time getOTToTime() {
		return OTToTime;
	}

	@JsonSetter("otto")
	public void setOTToTime(Time oTToTime) {
		OTToTime = oTToTime;
	}

	@JsonGetter("otchr")
	public Float getOTcharge() {
		return OTcharge;
	}

	@JsonSetter("otchr")
	public void setOTcharge(Float oTcharge) {
		OTcharge = oTcharge;
	}

	@JsonGetter("otafter")
	public Float getOTafterOTtime() {
		return OTafterOTtime;
	}

	@JsonSetter("otafter")
	public void setOTafterOTtime(Float oTafterOTtime) {
		OTafterOTtime = oTafterOTtime;
	}

	@JsonGetter("otemr")
	public Float getOTEmerchrg() {
		return OTEmerchrg;
	}

	@JsonSetter("otemr")
	public void setOTEmerchrg(Float oTEmerchrg) {
		OTEmerchrg = oTEmerchrg;
	}

	@JsonGetter("opemrfrm")
	public Time getOpEmerFrmTime() {
		return OpEmerFrmTime;
	}

	@JsonSetter("opemrfrm")
	public void setOpEmerFrmTime(Time opEmerFrmTime) {
		OpEmerFrmTime = opEmerFrmTime;
	}

	@JsonGetter("opemrto")
	public Time getOpEmerToTime() {
		return OpEmerToTime;
	}

	@JsonSetter("opemrto")
	public void setOpEmerToTime(Time opEmerToTime) {
		OpEmerToTime = opEmerToTime;
	}

	@JsonGetter("cor")
	public Integer getCorporateAccId() {
		return corporateAccId;
	}

	@JsonSetter("cor")
	public void setCorporateAccId(Integer corporateAccId) {
		this.corporateAccId = corporateAccId;
	}

	@JsonGetter("preane")
	public Float getPreanechrg() {
		return Preanechrg;
	}

	@JsonSetter("preane")
	public void setPreanechrg(Float preanechrg) {
		Preanechrg = preanechrg;
	}

	@JsonGetter("TPAchr")
	public Float getTPAChr() {
		return TPAChr;
	}

	@JsonSetter("TPAchr")
	public void setTPAChr(Float tPAChr) {
		TPAChr = tPAChr;
	}
	@JsonGetter("typeOfBilling")
	public String getTypeOfBilling() {
		return typeOfBilling;
	}
	@JsonSetter("typeOfBilling")
	public void setTypeOfBilling(String typeOfBilling) {
		this.typeOfBilling = typeOfBilling;
	}
	@JsonGetter("asschrg")
	public Float getAstSurgeonChrg() {
		return AstSurgeonChrg;
	}
	@JsonSetter("asschrg")
	public void setAstSurgeonChrg(Float astSurgeonChrg) {
		AstSurgeonChrg = astSurgeonChrg;
	}
	@JsonGetter("ChrgType")
	public String getChrgType() {
		return ChrgType;
	}
	@JsonSetter("ChrgType")
	public void setChrgType(String chrgType) {
		ChrgType = chrgType;
	}
	
	@JsonGetter("refDocPer")
	public double getRefDocPer() {
		return refDocPer;
	}
	
	@JsonSetter("refDocPer")
	public void setRefDocPer(double refDocPer) {
		this.refDocPer = refDocPer;
	}
	
	@JsonGetter("ppnPer")
	public double getPpnPer() {
		return ppnPer;
	}
	
	@JsonSetter("ppnPer")
	public void setPpnPer(double ppnPer) {
		this.ppnPer = ppnPer;
	}
	
	@JsonGetter("listEhatBillPrefix")
	public List<EhatBillPrefix> getListEhatBillPrefix() {
		return listEhatBillPrefix;
	}
	
	@JsonSetter("listEhatBillPrefix")
	public void setListEhatBillPrefix(List<EhatBillPrefix> listEhatBillPrefix) {
		this.listEhatBillPrefix = listEhatBillPrefix;
	}
	
	@JsonGetter("currencyId")
	public int getCurrencyId() {
		return currencyId;
	}
	
	@JsonSetter("currencyId")
	public void setCurrencyId(int currencyId) {
		this.currencyId = currencyId;
	}	
	
	@JsonGetter("emrChrPer")
	public double getEmrChrPer() {
		return emrChrPer;
	}
	@JsonSetter("emrChrPer")
	public void setEmrChrPer(double emrChrPer) {
		this.emrChrPer = emrChrPer;
	}
	public String getAdminChargesFlag() {
		return adminChargesFlag;
	}
	public void setAdminChargesFlag(String adminChargesFlag) {
		this.adminChargesFlag = adminChargesFlag;
	}
	public Integer getHospitalUnitId() {
		return hospitalUnitId;
	}
	public void setHospitalUnitId(Integer hospitalUnitId) {
		this.hospitalUnitId = hospitalUnitId;
	}	
	
	
}