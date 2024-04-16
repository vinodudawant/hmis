package com.hms.inventory.dto;

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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Component;


@Entity
@Component
@Table(name = "hospital_license_records")
public class HospitalLicenseDto implements Serializable{

	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;

	@Column(name = "document_name")
	private String documentName;
	
	@Column(name = "desc_clause_no_details")
	private String descClauseNoDetails;
	
	@Column(name = "reg_no_license_no")
	private String regNoLicenseNo;
	
	@Column(name = "issuing_auth_office_name")
	private String issuingAuthOfficeName;
	
	@Column(name = "issuing_auth_office_address")
	private String issuingAuthOfficeAddress;
	
	@Column(name = "issued_on_date")
	private String issuedOnDate;
	
	@Column(name = "is_applicable")
	private String isApplicable;
	
	@Column(name = "issuing_auth_contact_person")
	private String issuingAuthorityContactPerson;
	
	@Column(name = "issuing_auth_contact_no")
	private String issuingAuthorityContactNO;
	
	@Column(name = "issuing_auth_contact_email")
	private String issuingAuthorityContactEmail;
	
	@Column(name = "valid_from_date")
	private Date validFromDate;
	
	@Column(name = "valid_till_date")
	private Date validTillDate;
	
	@Column(name = "renewal_submission_date")
	private Date renewalSubmissionDate;
	
	@Column(name = "action_alert_date")
	private Date actionAlertDate;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "note")
	private String note;
	
	@Column(name = "is_send_valid_till",columnDefinition="varchar(2) default 'N'")
	private String isSendValidTill="N";
	
	@Column(name = "is_send_renewal_sub",columnDefinition="varchar(2) default 'N'")
	private String isSendRenewalSub="N";
	
	@Column(name = "is_send_action_alert",columnDefinition="varchar(2) default 'N'")
	private String isSendActionAlert="N";
	
	@Column(name = "is_send_action_alert_email",columnDefinition="varchar(2) default 'N'")
	private String isSendActionAlertEmail="N";
	
	/*@Column(name = "image_path")
	private String imagePath;

	@Column(name = "image_status")
	private String imageStatus="N";*/
	
	@Column(name = "user_name")
	String userName;
	
	@Column(name = "user_id")
	Integer userId;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "mail_status_30",columnDefinition="varchar(2) default 'N'")
	protected String mailStatus30="N";
	
	@Column(name = "mail_status_60",columnDefinition="varchar(2) default 'N'")
	protected String mailStatus60="N";
	
	@Transient
	private Integer noOfPages;
	
	@Transient
	private String lastLoggedInDateTime;
	
	@Transient
	private List<HospitalLicenseDto> lstHospitalLicenseDto;
	
	@Transient
	private List<HospitalLicenseDocUploadDto> lstHospitalLicenseDocUploadDto;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public String getDescClauseNoDetails() {
		return descClauseNoDetails;
	}

	public void setDescClauseNoDetails(String descClauseNoDetails) {
		this.descClauseNoDetails = descClauseNoDetails;
	}

	public String getRegNoLicenseNo() {
		return regNoLicenseNo;
	}

	public void setRegNoLicenseNo(String regNoLicenseNo) {
		this.regNoLicenseNo = regNoLicenseNo;
	}

	public String getIssuingAuthOfficeName() {
		return issuingAuthOfficeName;
	}

	public void setIssuingAuthOfficeName(String issuingAuthOfficeName) {
		this.issuingAuthOfficeName = issuingAuthOfficeName;
	}

	public String getIssuingAuthOfficeAddress() {
		return issuingAuthOfficeAddress;
	}

	public void setIssuingAuthOfficeAddress(String issuingAuthOfficeAddress) {
		this.issuingAuthOfficeAddress = issuingAuthOfficeAddress;
	}

	public String getIsApplicable() {
		return isApplicable;
	}

	public void setIsApplicable(String isApplicable) {
		this.isApplicable = isApplicable;
	}

	public String getIssuingAuthorityContactPerson() {
		return issuingAuthorityContactPerson;
	}

	public void setIssuingAuthorityContactPerson(
			String issuingAuthorityContactPerson) {
		this.issuingAuthorityContactPerson = issuingAuthorityContactPerson;
	}

	public String getIssuingAuthorityContactNO() {
		return issuingAuthorityContactNO;
	}

	public void setIssuingAuthorityContactNO(String issuingAuthorityContactNO) {
		this.issuingAuthorityContactNO = issuingAuthorityContactNO;
	}

	public String getIssuingAuthorityContactEmail() {
		return issuingAuthorityContactEmail;
	}

	public void setIssuingAuthorityContactEmail(String issuingAuthorityContactEmail) {
		this.issuingAuthorityContactEmail = issuingAuthorityContactEmail;
	}

	public Date getValidFromDate() {
		return validFromDate;
	}

	public void setValidFromDate(Date validFromDate) {
		this.validFromDate = validFromDate;
	}

	public Date getValidTillDate() {
		return validTillDate;
	}

	public void setValidTillDate(Date validTillDate) {
		this.validTillDate = validTillDate;
	}

	public Date getRenewalSubmissionDate() {
		return renewalSubmissionDate;
	}

	public void setRenewalSubmissionDate(Date renewalSubmissionDate) {
		this.renewalSubmissionDate = renewalSubmissionDate;
	}

	public Date getActionAlertDate() {
		return actionAlertDate;
	}

	public void setActionAlertDate(Date actionAlertDate) {
		this.actionAlertDate = actionAlertDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getIsSendValidTill() {
		return isSendValidTill;
	}

	public void setIsSendValidTill(String isSendValidTill) {
		this.isSendValidTill = isSendValidTill;
	}

	public String getIsSendRenewalSub() {
		return isSendRenewalSub;
	}

	public void setIsSendRenewalSub(String isSendRenewalSub) {
		this.isSendRenewalSub = isSendRenewalSub;
	}

	public String getIsSendActionAlert() {
		return isSendActionAlert;
	}

	public void setIsSendActionAlert(String isSendActionAlert) {
		this.isSendActionAlert = isSendActionAlert;
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

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	

	public String getMailStatus30() {
		return mailStatus30;
	}

	public void setMailStatus30(String mailStatus30) {
		this.mailStatus30 = mailStatus30;
	}

	public String getMailStatus60() {
		return mailStatus60;
	}

	public void setMailStatus60(String mailStatus60) {
		this.mailStatus60 = mailStatus60;
	}

	public String getIsSendActionAlertEmail() {
		return isSendActionAlertEmail;
	}

	public void setIsSendActionAlertEmail(String isSendActionAlertEmail) {
		this.isSendActionAlertEmail = isSendActionAlertEmail;
	}

	public String getIssuedOnDate() {
		return issuedOnDate;
	}

	public void setIssuedOnDate(String issuedOnDate) {
		this.issuedOnDate = issuedOnDate;
	}

	/*public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getImageStatus() {
		return imageStatus;
	}

	public void setImageStatus(String imageStatus) {
		this.imageStatus = imageStatus;
	}*/

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getNoOfPages() {
		return noOfPages;
	}

	public void setNoOfPages(Integer noOfPages) {
		this.noOfPages = noOfPages;
	}

	public String getLastLoggedInDateTime() {
		return lastLoggedInDateTime;
	}

	public void setLastLoggedInDateTime(String lastLoggedInDateTime) {
		this.lastLoggedInDateTime = lastLoggedInDateTime;
	}

	public List<HospitalLicenseDto> getLstHospitalLicenseDto() {
		return lstHospitalLicenseDto;
	}

	public void setLstHospitalLicenseDto(
			List<HospitalLicenseDto> lstHospitalLicenseDto) {
		this.lstHospitalLicenseDto = lstHospitalLicenseDto;
	}

	public List<HospitalLicenseDocUploadDto> getLstHospitalLicenseDocUploadDto() {
		return lstHospitalLicenseDocUploadDto;
	}

	public void setLstHospitalLicenseDocUploadDto(
			List<HospitalLicenseDocUploadDto> lstHospitalLicenseDocUploadDto) {
		this.lstHospitalLicenseDocUploadDto = lstHospitalLicenseDocUploadDto;
	}

	@Override
	public String toString() {
		return "HospitalLicenseDto [id=" + id + ", documentName="
				+ documentName + ", descClauseNoDetails=" + descClauseNoDetails
				+ ", regNoLicenseNo=" + regNoLicenseNo
				+ ", issuingAuthOfficeName=" + issuingAuthOfficeName
				+ ", issuingAuthOfficeAddress=" + issuingAuthOfficeAddress
				+ ", issuedOnDate=" + issuedOnDate + ", isApplicable="
				+ isApplicable + ", issuingAuthorityContactPerson="
				+ issuingAuthorityContactPerson
				+ ", issuingAuthorityContactNO=" + issuingAuthorityContactNO
				+ ", issuingAuthorityContactEmail="
				+ issuingAuthorityContactEmail + ", validFromDate="
				+ validFromDate + ", validTillDate=" + validTillDate
				+ ", renewalSubmissionDate=" + renewalSubmissionDate
				+ ", actionAlertDate=" + actionAlertDate + ", status=" + status
				+ ", note=" + note + ", isSendValidTill=" + isSendValidTill
				+ ", isSendRenewalSub=" + isSendRenewalSub
				+ ", isSendActionAlert=" + isSendActionAlert
				+ ", isSendActionAlertEmail=" + isSendActionAlertEmail
				+ ", userName=" + userName + ", userId=" + userId
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", mailStatus30=" + mailStatus30 + ", mailStatus60="
				+ mailStatus60 + ", noOfPages=" + noOfPages
				+ ", lastLoggedInDateTime=" + lastLoggedInDateTime
				+ ", lstHospitalLicenseDto=" + lstHospitalLicenseDto
				+ ", lstHospitalLicenseDocUploadDto="
				+ lstHospitalLicenseDocUploadDto + "]";
	}

}
