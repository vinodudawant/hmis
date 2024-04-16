package com.hms.administrator.dto;

import java.io.Serializable;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;

import com.hms.common.dto.TmCmLookupDet;

@Entity
@Component
@Table(name = "business_master_new")
public class BusinessCustMasterDto implements Serializable {
	
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "lab_name")
	private String name;
	
	@Column(name = "lab_code")
	private String code;
	
	@Column(name = "reg_no")
	private String regNo;
	
	@Column(name = "status")
	private String status;	
	
	@Column(name = "unit_name")
	private String unitName;
	
	@Column(name = "hospital_type")
	private String hospitalType;
	
	@Column(name = "no_of_beds")
	private String noOfBeds;
	
	@Column(name = "lab_available")
	private String labAvailable;
	
	@Column(name = "customer_type_name")
	private String customerTypeName;
	
	@Column(name = "type",columnDefinition="int(11) default 0")
	private Integer type=0;	
	
	@Column(name = "unit_name_id",columnDefinition="int(11) default 0")
	private Integer unit=0;		
	
	@Column(name="inhous_lab_id",columnDefinition="int(11) default 0")
	private Integer inhouseLabId=0;
	
	@Column(name = "unit_id",columnDefinition="int(11) default 0")
	private Integer unitId=0;
	
	//stats info	
	@Column(name = "Avg_Patient_Footfall_Per_Day")
	private String Avg_Patient_Footfall_Per_Day;
	
	@Column(name = "Avg_Outs_No_Per_Day")
	private String Avg_Outs_No_Per_Day;	
	
	@Column(name = "avg_Opd_Patient_PerDay")
	private String avgOpdPatientPerDay;
	
	@Column(name = "avg_Ipd_Patient_PerDay")
	private String avgIpdPatientPerDay;
	
	@Column(name = "avg_Diagnostics_Patient_PerDay")
	private String avgDiagnosticsPatientPerDay;
	
	@Column(name = "avg_test_OutsourceDay")
	private String avgtestOutsourceDay;
	
	//payment info
	@Column(name="payment_flag")
	private String paymentFlag;
	
	@Column(name = "parent_balance_utilization")
	private String parentBalanceUtilization;

	//prepaid details
	@Column(name="advance_amount")
	private Double advanceAmount;
	
	@Column(name="prepaid_day",columnDefinition="double default 0")
	private Double prePaidDay=0.0;
	
	@Column(name="reminder_on_percentage_prepaid",columnDefinition="double default 0")
	private Double reminderOnPercentagePrepaid=0.0;
	
	@Column(name="block_percentage_prepaid",columnDefinition="double default 0")
	private Double blockOnpercentagePrepaid=0.0;	
	
	@Column(name="reminder_on_prepaid_day",columnDefinition="double default 0")
	private Double reminderOnPrepaidDay=0.0;
	
	@Column(name="block_on_prepaid_day",columnDefinition="double default 0")
	private Double blockOnPrepaidDay=0.0;
	
	@Column(name = "pre_from_date",columnDefinition="varchar(100) default '' ")
	private String preFromDate="";
	
	@Column(name = "pre_to_date",columnDefinition="varchar(100) default '' ")
	private String preToDate="";
	
	@Column(name = "pre_remark",columnDefinition="varchar(100) default '' ")
	private String preRemark;
	
	@Column(name = "client_potential_prepaid")
	private String clientPotentialPrepaid;
	
	@Column(name = "client_potential_postpaid")
	private String clientPotentialPostpaid;
	
	@Column(name = "pre_reason")
	private String preReason;
	
	
	//postpaid details	
	@Column(name="credit_day")
	private Double creditDay;
	
	@Column(name="credit_amount")
	private Double credithAmount;
	
	@Column(name="reminder_on_percentage_postpaid",columnDefinition="double default 0")
	private Double reminderOnPercentagePostPaid=0.0;
	
	@Column(name="block_percentage_postpaid",columnDefinition="double default 0")
	private Double blockOnpercentagePostPaid=0.0;
	
	@Column(name="reminder_on_credit_day",columnDefinition="double default 0")
	private Double reminderOnCreditDay=0.0;
	
	@Column(name="block_on_credit_day",columnDefinition="double default 0")
	private Double blockOnCreditDay=0.0;
	
	@Column(name = "post_from_date",columnDefinition="varchar(100) default '' ")
	private String postFromDate="";
	
	@Column(name = "post_to_date",columnDefinition="varchar(100) default '' ")
	private String postToDate="";
	
	@Column(name = "post_remark",columnDefinition="varchar(255) default '' ")
	private String postRemark;
		
	@Column(name = "post_reason")
	private String postReason;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "prepaid_credit_amount")
	private Double prepaidCreditAmount=0.0;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	//added by Rohit on 16-02-2022
	@Column(name="collection_centre_id",columnDefinition="int default 0")
	private Integer collectionCentreId;
	
	//added by Rohit on 16-02-2022
	@Column(name="collection_centre_name")
	private String collectionCentreName;
	
	@Column(name = "lookup_det_id_lay")
	private Integer lookupDetIdLay;
	
	@Column(name="parent_id")
	private Integer parentId;
	
	@Column(name = "on_board_Date",columnDefinition="varchar(100) default '' ")
	private String onBoardDate="";
	
	@Column(name="reflinish_amount")
	private Double reflinishAmount=0.0;
	
	@Column(name="sms_percentage_postpaid")
	private Double smsPercentagePostpaid=0.0;
	
	@Column(name="sms_percentage_prepaid")
	private Double smsPercentagePrepaid=0.0;
	
	@Column(name="block_on_postpaid_day")
	private Double blockOnPostpaidDay=0.0;

	public Integer getLookupDetIdLay() {
		return lookupDetIdLay;
	}

	public void setLookupDetIdLay(Integer lookupDetIdLay) {
		this.lookupDetIdLay = lookupDetIdLay;
	}

	@Transient
	private List<BusinessCustMasterDto> businessMasterDto;

	@Transient
	private List<TmCmLookupDet> TmCmLookupDetLookupList;
	
	@Transient
    private List<LabChargesConfigurationViewDto> lstConfigurations;
	
	@Transient
	private String rowCount;
	
	@Transient
	private String parentLabName;
	

	public List<LabChargesConfigurationViewDto> getLstConfigurations() {
		return lstConfigurations;
	}

	public void setLstConfigurations(List<LabChargesConfigurationViewDto> lstConfigurations) {
		this.lstConfigurations = lstConfigurations;
	}

	public List<TmCmLookupDet> getTmCmLookupDetLookupList() {
		return TmCmLookupDetLookupList;
	}

	public void setTmCmLookupDetLookupList(List<TmCmLookupDet> tmCmLookupDetLookupList) {
		TmCmLookupDetLookupList = tmCmLookupDetLookupList;
	}
	
	public Integer getParentId() {
		return parentId;
	}


	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterGenralInfoDto> businessMasterGeneralInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterContactInfoDto> businessMasterContactInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterMarketingInfoDto> businessMasterMarketingInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterAddressInfoDto> businessMasterAddressInfoDto;

	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterPaymentInfoDto> businessMasterPaymentInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterTermsAndCondInfoDto> termsAndConditionInfoDto;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterContractInfoDto> businessMasterContractInfo;
	
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "business_master_id", nullable = false)
	private List<BusinessCustMasterUploadDocInfoDto> businessMasterUploadDocInfo;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getHospitalType() {
		return hospitalType;
	}

	public void setHospitalType(String hospitalType) {
		this.hospitalType = hospitalType;
	}

	public String getNoOfBeds() {
		return noOfBeds;
	}

	public void setNoOfBeds(String noOfBeds) {
		this.noOfBeds = noOfBeds;
	}

	public String getLabAvailable() {
		return labAvailable;
	}

	public void setLabAvailable(String labAvailable) {
		this.labAvailable = labAvailable;
	}
	
	public String getCustomerTypeName() {
		return customerTypeName;
	}

	public void setCustomerTypeName(String customerTypeName) {
		this.customerTypeName = customerTypeName;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getUnit() {
		return unit;
	}

	public void setUnit(Integer unit) {
		this.unit = unit;
	}

	public Integer getInhouseLabId() {
		return inhouseLabId;
	}

	public void setInhouseLabId(Integer inhouseLabId) {
		this.inhouseLabId = inhouseLabId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public String getAvg_Patient_Footfall_Per_Day() {
		return Avg_Patient_Footfall_Per_Day;
	}

	public void setAvg_Patient_Footfall_Per_Day(String avg_Patient_Footfall_Per_Day) {
		Avg_Patient_Footfall_Per_Day = avg_Patient_Footfall_Per_Day;
	}

	public String getAvg_Outs_No_Per_Day() {
		return Avg_Outs_No_Per_Day;
	}

	public void setAvg_Outs_No_Per_Day(String avg_Outs_No_Per_Day) {
		Avg_Outs_No_Per_Day = avg_Outs_No_Per_Day;
	}	

	public String getAvgOpdPatientPerDay() {
		return avgOpdPatientPerDay;
	}

	public void setAvgOpdPatientPerDay(String avgOpdPatientPerDay) {
		this.avgOpdPatientPerDay = avgOpdPatientPerDay;
	}

	public String getAvgIpdPatientPerDay() {
		return avgIpdPatientPerDay;
	}

	public void setAvgIpdPatientPerDay(String avgIpdPatientPerDay) {
		this.avgIpdPatientPerDay = avgIpdPatientPerDay;
	}

	public String getAvgDiagnosticsPatientPerDay() {
		return avgDiagnosticsPatientPerDay;
	}

	public void setAvgDiagnosticsPatientPerDay(String avgDiagnosticsPatientPerDay) {
		this.avgDiagnosticsPatientPerDay = avgDiagnosticsPatientPerDay;
	}

	public String getAvgtestOutsourceDay() {
		return avgtestOutsourceDay;
	}

	public void setAvgtestOutsourceDay(String avgtestOutsourceDay) {
		this.avgtestOutsourceDay = avgtestOutsourceDay;
	}

	public String getPaymentFlag() {
		return paymentFlag;
	}

	public void setPaymentFlag(String paymentFlag) {
		this.paymentFlag = paymentFlag;
	}

	public Double getAdvanceAmount() {
		return advanceAmount;
	}

	public void setAdvanceAmount(Double advanceAmount) {
		this.advanceAmount = advanceAmount;
	}

	public Double getPrePaidDay() {
		return prePaidDay;
	}

	public void setPrePaidDay(Double prePaidDay) {
		this.prePaidDay = prePaidDay;
	}

	public Double getReminderOnPercentagePrepaid() {
		return reminderOnPercentagePrepaid;
	}

	public void setReminderOnPercentagePrepaid(Double reminderOnPercentagePrepaid) {
		this.reminderOnPercentagePrepaid = reminderOnPercentagePrepaid;
	}

	public Double getBlockOnpercentagePrepaid() {
		return blockOnpercentagePrepaid;
	}

	public void setBlockOnpercentagePrepaid(Double blockOnpercentagePrepaid) {
		this.blockOnpercentagePrepaid = blockOnpercentagePrepaid;
	}

	public Double getReminderOnPrepaidDay() {
		return reminderOnPrepaidDay;
	}

	public void setReminderOnPrepaidDay(Double reminderOnPrepaidDay) {
		this.reminderOnPrepaidDay = reminderOnPrepaidDay;
	}

	public Double getBlockOnPrepaidDay() {
		return blockOnPrepaidDay;
	}

	public void setBlockOnPrepaidDay(Double blockOnPrepaidDay) {
		this.blockOnPrepaidDay = blockOnPrepaidDay;
	}

	public Double getCreditDay() {
		return creditDay;
	}

	public void setCreditDay(Double creditDay) {
		this.creditDay = creditDay;
	}

	public Double getCredithAmount() {
		return credithAmount;
	}

	public void setCredithAmount(Double credithAmount) {
		this.credithAmount = credithAmount;
	}

	public Double getReminderOnPercentagePostPaid() {
		return reminderOnPercentagePostPaid;
	}

	public void setReminderOnPercentagePostPaid(Double reminderOnPercentagePostPaid) {
		this.reminderOnPercentagePostPaid = reminderOnPercentagePostPaid;
	}

	public Double getBlockOnpercentagePostPaid() {
		return blockOnpercentagePostPaid;
	}

	public void setBlockOnpercentagePostPaid(Double blockOnpercentagePostPaid) {
		this.blockOnpercentagePostPaid = blockOnpercentagePostPaid;
	}

	public Double getReminderOnCreditDay() {
		return reminderOnCreditDay;
	}

	public void setReminderOnCreditDay(Double reminderOnCreditDay) {
		this.reminderOnCreditDay = reminderOnCreditDay;
	}

	public Double getBlockOnCreditDay() {
		return blockOnCreditDay;
	}

	public void setBlockOnCreditDay(Double blockOnCreditDay) {
		this.blockOnCreditDay = blockOnCreditDay;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public List<BusinessCustMasterDto> getBusinessMasterDto() {
		return businessMasterDto;
	}

	public void setBusinessMasterDto(List<BusinessCustMasterDto> businessMasterDto) {
		this.businessMasterDto = businessMasterDto;
	}

	public List<BusinessCustMasterGenralInfoDto> getBusinessMasterGeneralInfoDto() {
		return businessMasterGeneralInfoDto;
	}

	public void setBusinessMasterGeneralInfoDto(List<BusinessCustMasterGenralInfoDto> businessMasterGeneralInfoDto) {
		this.businessMasterGeneralInfoDto = businessMasterGeneralInfoDto;
	}

	public List<BusinessCustMasterContactInfoDto> getBusinessMasterContactInfoDto() {
		return businessMasterContactInfoDto;
	}

	public void setBusinessMasterContactInfoDto(List<BusinessCustMasterContactInfoDto> businessMasterContactInfoDto) {
		this.businessMasterContactInfoDto = businessMasterContactInfoDto;
	}

	public List<BusinessCustMasterMarketingInfoDto> getBusinessMasterMarketingInfoDto() {
		return businessMasterMarketingInfoDto;
	}

	public void setBusinessMasterMarketingInfoDto(
			List<BusinessCustMasterMarketingInfoDto> businessMasterMarketingInfoDto) {
		this.businessMasterMarketingInfoDto = businessMasterMarketingInfoDto;
	}

	public List<BusinessCustMasterAddressInfoDto> getBusinessMasterAddressInfoDto() {
		return businessMasterAddressInfoDto;
	}

	public void setBusinessMasterAddressInfoDto(List<BusinessCustMasterAddressInfoDto> businessMasterAddressInfoDto) {
		this.businessMasterAddressInfoDto = businessMasterAddressInfoDto;
	}

	public List<BusinessCustMasterPaymentInfoDto> getBusinessMasterPaymentInfoDto() {
		return businessMasterPaymentInfoDto;
	}

	public void setBusinessMasterPaymentInfoDto(List<BusinessCustMasterPaymentInfoDto> businessMasterPaymentInfoDto) {
		this.businessMasterPaymentInfoDto = businessMasterPaymentInfoDto;
	}

	public List<BusinessCustMasterTermsAndCondInfoDto> getTermsAndConditionInfoDto() {
		return termsAndConditionInfoDto;
	}

	public void setTermsAndConditionInfoDto(List<BusinessCustMasterTermsAndCondInfoDto> termsAndConditionInfoDto) {
		this.termsAndConditionInfoDto = termsAndConditionInfoDto;
	}	

	public List<BusinessCustMasterContractInfoDto> getBusinessMasterContractInfo() {
		return businessMasterContractInfo;
	}

	public void setBusinessMasterContractInfo(List<BusinessCustMasterContractInfoDto> businessMasterContractInfo) {
		this.businessMasterContractInfo = businessMasterContractInfo;
	}

	public List<BusinessCustMasterUploadDocInfoDto> getBusinessMasterUploadDocInfo() {
		return businessMasterUploadDocInfo;
	}

	public void setBusinessMasterUploadDocInfo(List<BusinessCustMasterUploadDocInfoDto> businessMasterUploadDocInfo) {
		this.businessMasterUploadDocInfo = businessMasterUploadDocInfo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getCollectionCentreId() {
		return collectionCentreId;
	}

	public void setCollectionCentreId(Integer collectionCentreId) {
		this.collectionCentreId = collectionCentreId;
	}

	public String getCollectionCentreName() {
		return collectionCentreName;
	}

	public void setCollectionCentreName(String collectionCentreName) {
		this.collectionCentreName = collectionCentreName;
	}

	public String getOnBoardDate() {
		return onBoardDate;
	}

	public void setOnBoardDate(String onBoardDate) {
		this.onBoardDate = onBoardDate;
	}
	
	public String getRowCount() {
		return rowCount;
	}

	public void setRowCount(String rowCount) {
		this.rowCount = rowCount;
	}

	public String getParentLabName() {
		return parentLabName;
	}

	public void setParentLabName(String parentLabName) {
		this.parentLabName = parentLabName;
	}

	public String getPreFromDate() {
		return preFromDate;
	}

	public void setPreFromDate(String preFromDate) {
		this.preFromDate = preFromDate;
	}

	public String getPreToDate() {
		return preToDate;
	}

	public void setPreToDate(String preToDate) {
		this.preToDate = preToDate;
	}

	public String getPreRemark() {
		return preRemark;
	}

	public void setPreRemark(String preRemark) {
		this.preRemark = preRemark;
	}

	public String getPostFromDate() {
		return postFromDate;
	}

	public void setPostFromDate(String postFromDate) {
		this.postFromDate = postFromDate;
	}

	public String getPostToDate() {
		return postToDate;
	}

	public void setPostToDate(String postToDate) {
		this.postToDate = postToDate;
	}

	public String getPostRemark() {
		return postRemark;
	}

	public void setPostRemark(String postRemark) {
		this.postRemark = postRemark;
	}

     public String getClientPotentialPrepaid() {
		return clientPotentialPrepaid;
	}

	public void setClientPotentialPrepaid(String clientPotentialPrepaid) {
		this.clientPotentialPrepaid = clientPotentialPrepaid;
	}

	public String getClientPotentialPostpaid() {
		return clientPotentialPostpaid;
	}

	public void setClientPotentialPostpaid(String clientPotentialPostpaid) {
		this.clientPotentialPostpaid = clientPotentialPostpaid;
	}
	
	public Double getPrepaidCreditAmount() {
		return prepaidCreditAmount;
	}

	public void setPrepaidCreditAmount(Double prepaidCreditAmount) {
		this.prepaidCreditAmount = prepaidCreditAmount;
	}

	
	public String getPreReason() {
		return preReason;
	}

	public void setPreReason(String preReason) {
		this.preReason = preReason;
	}

	public String getPostReason() {
		return postReason;
	}

	public void setPostReason(String postReason) {
		this.postReason = postReason;
	}

	
	public String getParentBalanceUtilization() {
		return parentBalanceUtilization;
	}

	public void setParentBalanceUtilization(String parentBalanceUtilization) {
		this.parentBalanceUtilization = parentBalanceUtilization;
	}

	public Double getReflinishAmount() {
		return reflinishAmount;
	}

	public void setReflinishAmount(Double reflinishAmount) {
		this.reflinishAmount = reflinishAmount;
	}

	public Double getSmsPercentagePostpaid() {
		return smsPercentagePostpaid;
	}

	public void setSmsPercentagePostpaid(Double smsPercentagePostpaid) {
		this.smsPercentagePostpaid = smsPercentagePostpaid;
	}

	public Double getSmsPercentagePrepaid() {
		return smsPercentagePrepaid;
	}

	public void setSmsPercentagePrepaid(Double smsPercentagePrepaid) {
		this.smsPercentagePrepaid = smsPercentagePrepaid;
	}

	public Double getBlockOnPostpaidDay() {
		return blockOnPostpaidDay;
	}

	public void setBlockOnPostpaidDay(Double blockOnPostpaidDay) {
		this.blockOnPostpaidDay = blockOnPostpaidDay;
	}

	@Override
	public String toString() {
		return "BusinessCustMasterDto [id=" + id + ", name=" + name + ", code="
				+ code + ", regNo=" + regNo + ", status=" + status
				+ ", unitName=" + unitName + ", hospitalType=" + hospitalType
				+ ", noOfBeds=" + noOfBeds + ", labAvailable=" + labAvailable
				+ ", customerTypeName=" + customerTypeName + ", type=" + type
				+ ", unit=" + unit + ", inhouseLabId=" + inhouseLabId
				+ ", unitId=" + unitId + ", Avg_Patient_Footfall_Per_Day="
				+ Avg_Patient_Footfall_Per_Day + ", Avg_Outs_No_Per_Day="
				+ Avg_Outs_No_Per_Day + ", avgOpdPatientPerDay="
				+ avgOpdPatientPerDay + ", avgIpdPatientPerDay="
				+ avgIpdPatientPerDay + ", avgDiagnosticsPatientPerDay="
				+ avgDiagnosticsPatientPerDay + ", avgtestOutsourceDay="
				+ avgtestOutsourceDay + ", paymentFlag=" + paymentFlag
				+ ", advanceAmount=" + advanceAmount + ", prePaidDay="
				+ prePaidDay + ", reminderOnPercentagePrepaid="
				+ reminderOnPercentagePrepaid + ", blockOnpercentagePrepaid="
				+ blockOnpercentagePrepaid + ", reminderOnPrepaidDay="
				+ reminderOnPrepaidDay + ", blockOnPrepaidDay="
				+ blockOnPrepaidDay + ", creditDay=" + creditDay
				+ ", credithAmount=" + credithAmount
				+ ", reminderOnPercentagePostPaid="
				+ reminderOnPercentagePostPaid + ", blockOnpercentagePostPaid="
				+ blockOnpercentagePostPaid + ", reminderOnCreditDay="
				+ reminderOnCreditDay + ", blockOnCreditDay="
				+ blockOnCreditDay + ", deleted=" + deleted + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", deletedBy="
				+ deletedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deletedDate=" + deletedDate
				+ ", collectionCentreId=" + collectionCentreId
				+ ", collectionCentreName=" + collectionCentreName
				+ ", businessMasterDto=" + businessMasterDto
				+ ", businessMasterGeneralInfoDto="
				+ businessMasterGeneralInfoDto
				+ ", businessMasterContactInfoDto="
				+ businessMasterContactInfoDto
				+ ", businessMasterMarketingInfoDto="
				+ businessMasterMarketingInfoDto
				+ ", businessMasterAddressInfoDto="
				+ businessMasterAddressInfoDto
				+ ", businessMasterPaymentInfoDto="
				+ businessMasterPaymentInfoDto + ", termsAndConditionInfoDto="
				+ termsAndConditionInfoDto + ", businessMasterContractInfo="
				+ businessMasterContractInfo + ", businessMasterUploadDocInfo="
				+ businessMasterUploadDocInfo + ",rowCount=" + rowCount + "]";
	}
	
	
}
