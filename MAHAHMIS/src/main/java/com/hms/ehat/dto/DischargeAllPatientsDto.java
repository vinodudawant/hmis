
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
@Table(name = "ehat_all_discharge_report_view")
public class DischargeAllPatientsDto {
	
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
	private String hName;
	
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
	
	@Column(name = "discharge_date")
	private String dischargeDate;
	
	@Column(name = "discharge_time")
	private String dischargeTime;
	
	@Column(name = "discharge_type")
	private String dischargeType;
	
	@Column(name = "ref_doc_id")
	private BigInteger refDocId;
	
	@Column(name = "ref_doc_name")
	private String refDocName;

	
	@Transient
	private List<DischargeAllPatientsDto> listDischargeAllPatientsDto;

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


	public String gethName() {
		return hName;
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


	public void sethName(String hName) {
		this.hName = hName;
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





	public List<DischargeAllPatientsDto> getListDischargeAllPatientsDto() {
		return listDischargeAllPatientsDto;
	}


	public void setListDischargeAllPatientsDto(
			List<DischargeAllPatientsDto> listDischargeAllPatientsDto) {
		this.listDischargeAllPatientsDto = listDischargeAllPatientsDto;
	}


	public String getDocNameStr() {
		return docNameStr;
	}


	public void setDocNameStr(String docNameStr) {
		this.docNameStr = docNameStr;
	}


	public String getDischargeDate() {
		return dischargeDate;
	}


	public String getDischargeTime() {
		return dischargeTime;
	}


	public String getDischargeType() {
		return dischargeType;
	}


	public void setDischargeDate(String dischargeDate) {
		this.dischargeDate = dischargeDate;
	}


	public void setDischargeTime(String dischargeTime) {
		this.dischargeTime = dischargeTime;
	}


	public void setDischargeType(String dischargeType) {
		this.dischargeType = dischargeType;
	}





	public String getRefDocName() {
		return refDocName;
	}


	


	public BigInteger getRefDocId() {
		return refDocId;
	}


	public void setRefDocId(BigInteger refDocId) {
		this.refDocId = refDocId;
	}


	public void setRefDocName(String refDocName) {
		this.refDocName = refDocName;
	}
	
}
