package com.hms.ehat.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

import com.hms.dto.InventoryPurchaseInvoiceMasterDTO;

@Immutable
@Table(name = "ehat_wardwise_patients_report_view")
public class WardWiseDetaisDto {
	
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
	
	@Column(name = "case_type")
	private Integer caseType;
	
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
	
	@Column(name = "BedHall")
	private String bedHall;
	
	@Column(name = "hname")
	private String hallName;
	
	@Column(name = "hall_type_name")
	private String hallTypeName;
	
	@Column(name = "Hall_ID")
	private Integer HallID;
	
	

	@Column(name = "ehat_hallid")
	private BigInteger ehatHallId;
	
	@Column(name = "ehat_halltype_id")
	private BigInteger ehatHallTypeId	;
	
	
	@Column(name = "bed_name")
	private String bedName;
	
	@Column(name = "addmit_days")
	private Integer addmitDays;
	

	@Column(name = "source_type_id")
	private Integer sourceTypeId;
	
	@Column(name = "charges_master_slave_id")
	private Integer chargesMasterSlaveId;
	
	@Column(name = "category_name")
	private String category_name;

	
	@Transient
	private List<WardWiseDetaisDto> listWardWiseDetaisDto;

	/*-------------------------Getter And Setters--------------------------------*/
	
	public Integer getBillId() {
		return billId;
	}


	public String getDoctorId() {
		return doctorId;
	}


	public Integer getTreatmentId() {
		return treatmentId;
	}


	public Integer getDepartmentId() {
		return departmentId;
	}


	public Integer getUnitId() {
		return unitId;
	}


	public Integer getCaseType() {
		return caseType;
	}


	public Integer getPatientId() {
		return patientId;
	}


	public String getOpdipdno() {
		return opdipdno;
	}


	public Date getCreatedDateTime() {
		return createdDateTime;
	}


	public String getMrnno() {
		return mrnno;
	}


	public String getMobile() {
		return mobile;
	}


	public String getInvoiceFlag() {
		return invoiceFlag;
	}


	public String getPatientName() {
		return patientName;
	}


	public String getBedHall() {
		return bedHall;
	}





	public String getHallTypeName() {
		return hallTypeName;
	}


	public Integer getHallID() {
		return HallID;
	}


	public BigInteger getEhatHallId() {
		return ehatHallId;
	}


	public BigInteger getEhatHallTypeId() {
		return ehatHallTypeId;
	}


	public String getBedName() {
		return bedName;
	}


	public Integer getAddmitDays() {
		return addmitDays;
	}


	public Integer getSourceTypeId() {
		return sourceTypeId;
	}


	public Integer getChargesMasterSlaveId() {
		return chargesMasterSlaveId;
	}


	public String getCategory_name() {
		return category_name;
	}


	public List<WardWiseDetaisDto> getListWardWiseDetaisDto() {
		return listWardWiseDetaisDto;
	}


	public void setBillId(Integer billId) {
		this.billId = billId;
	}


	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}


	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}


	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}


	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}


	public void setCaseType(Integer caseType) {
		this.caseType = caseType;
	}


	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}


	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}


	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}


	public void setMrnno(String mrnno) {
		this.mrnno = mrnno;
	}


	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


	public void setInvoiceFlag(String invoiceFlag) {
		this.invoiceFlag = invoiceFlag;
	}


	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}


	public void setBedHall(String bedHall) {
		this.bedHall = bedHall;
	}


	

	public void setHallTypeName(String hallTypeName) {
		this.hallTypeName = hallTypeName;
	}


	public void setHallID(Integer hallID) {
		HallID = hallID;
	}


	public void setEhatHallId(BigInteger ehatHallId) {
		this.ehatHallId = ehatHallId;
	}


	public void setEhatHallTypeId(BigInteger ehatHallTypeId) {
		this.ehatHallTypeId = ehatHallTypeId;
	}


	public void setBedName(String bedName) {
		this.bedName = bedName;
	}


	public void setAddmitDays(Integer addmitDays) {
		this.addmitDays = addmitDays;
	}


	public void setSourceTypeId(Integer sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}


	public void setChargesMasterSlaveId(Integer chargesMasterSlaveId) {
		this.chargesMasterSlaveId = chargesMasterSlaveId;
	}


	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}


	public void setListWardWiseDetaisDto(
			List<WardWiseDetaisDto> listWardWiseDetaisDto) {
		this.listWardWiseDetaisDto = listWardWiseDetaisDto;
	}


	public String getDocNameStr() {
		return docNameStr;
	}


	public void setDocNameStr(String docNameStr) {
		this.docNameStr = docNameStr;
	}


	public String getHallName() {
		return hallName;
	}


	public void setHallName(String hallName) {
		this.hallName = hallName;
	}
	
}
