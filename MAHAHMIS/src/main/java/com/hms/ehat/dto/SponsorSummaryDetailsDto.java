package com.hms.ehat.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Immutable
@Table(name = "ehat_sponsor_summary_view")
public class SponsorSummaryDetailsDto {
	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "doctor_id")
	private String doctorId;
	
	@Transient
	private String docNameStr;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;	
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "opdipdno")
	private String opdipdno;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;
	
	@Column(name = "mrnno")
	private String mrnno;
	
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "invoice_flag")
	private String invoiceFlag;
	
	@Column(name = "patient_name")
	private String patientName;

	@Column(name = "source_type_id")
	private Integer sourceTypeId;
	
	@Column(name = "charges_master_slave_id")
	private Integer chargesMasterSlaveId;
	
	@Column(name = "category_name")
	private String category_name;
	
	@Transient
	private String dischargeDate;
	
	@Transient
	private String dischargeTime;
	
	@Column(name = "opd_amount")
	private Double opdAmount;
	
	@Column(name = "opd_tot_amount")
	private Double opdTotAmount;
	
	@Column(name = "ipd_amount")
	private Double ipdAmount;
	
	@Column(name = "ipd_tot_amount")
	private Double ipd_totAmount;
	
	@Transient
	private Double amount;
	
	@Transient
	private Double totAmount;

	@Column(name = "digno_id")
	private BigDecimal dignoId;
	
	@Transient
	private String dignoName;
	
	@Column(name = "neis_no")
	private String neisNO;
	
	@Transient
	private List<SponsorSummaryDetailsDto> listSponsorSummaryDetailsDto;

	/*-------------------------Getter And Setters--------------------------------*/
	
	
	public Integer getBillId() {
		return billId;
	}


	public void setBillId(Integer billId) {
		this.billId = billId;
	}


	public String getDoctorId() {
		return doctorId;
	}


	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}


	public String getDocNameStr() {
		return docNameStr;
	}


	public void setDocNameStr(String docNameStr) {
		this.docNameStr = docNameStr;
	}


	public Integer getTreatmentId() {
		return treatmentId;
	}


	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	public Integer getDepartmentId() {
		return departmentId;
	}


	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}


	public Integer getUnitId() {
		return unitId;
	}


	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}


	public Integer getPatientId() {
		return patientId;
	}


	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}


	public String getOpdipdno() {
		return opdipdno;
	}


	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}


	public Date getCreatedDateTime() {
		return createdDateTime;
	}


	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}


	public String getMrnno() {
		return mrnno;
	}


	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}


	public String getMobile() {
		return mobile;
	}


	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


	public String getInvoiceFlag() {
		return invoiceFlag;
	}


	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
	}


	public String getPatientName() {
		return patientName;
	}


	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}


	public Integer getSourceTypeId() {
		return sourceTypeId;
	}


	public void setSourceTypeId(Integer sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}


	public Integer getChargesMasterSlaveId() {
		return chargesMasterSlaveId;
	}


	public void setChargesMasterSlaveId(Integer chargesMasterSlaveId) {
		this.chargesMasterSlaveId = chargesMasterSlaveId;
	}


	public String getCategory_name() {
		return category_name;
	}


	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}


	public String getDischargeDate() {
		return dischargeDate;
	}


	public void setDischargeDate(String dischargeDate) {
		this.dischargeDate = dischargeDate;
	}


	public String getDischargeTime() {
		return dischargeTime;
	}


	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}


	public Double getOpdAmount() {
		return opdAmount;
	}


	public void setOpdAmount(Double opdAmount) {
		this.opdAmount = opdAmount;
	}


	public Double getOpdTotAmount() {
		return opdTotAmount;
	}


	public void setOpdTotAmount(Double opdTotAmount) {
		this.opdTotAmount = opdTotAmount;
	}


	public Double getIpdAmount() {
		return ipdAmount;
	}


	public void setIpdAmount(Double ipdAmount) {
		this.ipdAmount = ipdAmount;
	}


	public Double getIpd_totAmount() {
		return ipd_totAmount;
	}


	public void setIpd_totAmount(Double ipd_totAmount) {
		this.ipd_totAmount = ipd_totAmount;
	}


	public List<SponsorSummaryDetailsDto> getListSponsorSummaryDetailsDto() {
		return listSponsorSummaryDetailsDto;
	}


	public void setListSponsorSummaryDetailsDto(
			List<SponsorSummaryDetailsDto> listSponsorSummaryDetailsDto) {
		this.listSponsorSummaryDetailsDto = listSponsorSummaryDetailsDto;
	}


	public Double getAmount() {
		return amount;
	}


	public void setAmount(Double amount) {
		this.amount = amount;
	}


	public Double getTotAmount() {
		return totAmount;
	}


	public void setTotAmount(Double totAmount) {
		this.totAmount = totAmount;
	}


	


	public BigDecimal getDignoId() {
		return dignoId;
	}


	public void setDignoId(BigDecimal dignoId) {
		this.dignoId = dignoId;
	}


	public String getDignoName() {
		return dignoName;
	}


	public void setDignoName(String dignoName) {
		this.dignoName = dignoName;
	}


	public String getNeisNO() {
		return neisNO;
	}


	public void setNeisNO(String neisNO) {
		this.neisNO = neisNO;
	}

	
	
	
}
