package com.hms.ehat.dto;

import java.io.Serializable;
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

@Entity
@Table(name = "ehat_multiple_sponsor")
public class MultipleSponsorDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "mul_sponsor_id")
	private Integer mulSponsorId;
		
	//@Column(name = "treatment_id")
	@Transient
	private Integer treatmentId=0;
	
	//@Column(name = "patient_id")
	@Transient
	private Integer patientId=0;
	
	@Column(name = "department_id")
	private Integer departmentId=0;
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id")
	private int unitId=0;	
	
	@Column(name = "sponsor_id")
	private Integer sponsorId;	
	
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId=0;
	
	@Column(name = "saction_ord_no",columnDefinition="varchar(100) default '0'")
	private String sactionOrdNo="0";
	
	@Column(name = "sanction_amt",columnDefinition="double default 0")
	private double sanctionAmt=0;
	
	@Column(name = "neis_no",columnDefinition="varchar(100) default '0'")
	private String neisNo="0";
	
	@Column(name = "visit_no",columnDefinition="varchar(100) default '0'")
	private String visitNo="0";
	
	@Column(name = "ipd_or_opd",columnDefinition="varchar(100) default '-'")
	private String ipdOrOpd="-";
	
	@Column(name = "treat_permited",columnDefinition="TEXT default NULL")
	private String treatPermited="-";
	
	@Column(name = "dise_to_be_treat",columnDefinition="TEXT default NULL")
	private String diseToBeTreat="-";
	
	@Column(name = "tpaid",columnDefinition="varchar(255) default '-'")
	private String tpaid="-";
	
	@Column(name = "empid",columnDefinition="varchar(255) default '-'")
	private String empid;
	
	@Column(name = "primary_flag",columnDefinition="varchar(15) default 'N'")
	private String primaryFlag="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ref_date")
	private Date refDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "valid_upto_date")
	private Date validUpToDate;
	
	@Column(name = "rem_sanction_amt",columnDefinition="double default 0")
	private double remSanctionAmt=0;
	
	@Column(name = "primary_set_by")
	private Integer primarySetBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "primary_date_time")
	private Date primaryDateTime;
	
	// Added by vinod start
	@Column(name = "total_bill")
	private double totalBill=0;
	
	@Column(name = "total_paid")
	private double totalPaid=0;
	
	@Column(name = "total_remain")
	private double totalRemain=0;
	
	@Column(name = "total_refund")
	private double totalRefund=0;
	
	@Column(name = "discount")
	private double discount=0;
	
	@Column(name = "total_concn")
	private double totalConcn=0;
	
	@Column(name = "total_tds")
	private double totalTds=0;	
	// Added by vinod end
	
	@Transient
	private List<MultipleSponsorDto> listMultipleSponsor;
	
	@Transient
	private List<ChargesMasterSlave> listChargesMasterSlave;

	public Integer getMulSponsorId() {
		return mulSponsorId;
	}

	public void setMulSponsorId(Integer mulSponsorId) {
		this.mulSponsorId = mulSponsorId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
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

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Integer getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public String getSactionOrdNo() {
		return sactionOrdNo;
	}

	public void setSactionOrdNo(String sactionOrdNo) {
		this.sactionOrdNo = sactionOrdNo;
	}

	public double getSanctionAmt() {
		return sanctionAmt;
	}

	public void setSanctionAmt(double sanctionAmt) {
		this.sanctionAmt = sanctionAmt;
	}

	public String getNeisNo() {
		return neisNo;
	}

	public void setNeisNo(String neisNo) {
		this.neisNo = neisNo;
	}

	public String getVisitNo() {
		return visitNo;
	}

	public void setVisitNo(String visitNo) {
		this.visitNo = visitNo;
	}

	public String getIpdOrOpd() {
		return ipdOrOpd;
	}

	public void setIpdOrOpd(String ipdOrOpd) {
		this.ipdOrOpd = ipdOrOpd;
	}

	public String getTreatPermited() {
		return treatPermited;
	}

	public void setTreatPermited(String treatPermited) {
		this.treatPermited = treatPermited;
	}

	public String getDiseToBeTreat() {
		return diseToBeTreat;
	}

	public void setDiseToBeTreat(String diseToBeTreat) {
		this.diseToBeTreat = diseToBeTreat;
	}

	public String getTpaid() {
		return tpaid;
	}

	public void setTpaid(String tpaid) {
		this.tpaid = tpaid;
	}

	public String getEmpid() {
		return empid;
	}

	public void setEmpid(String empid) {
		this.empid = empid;
	}

	public String getPrimaryFlag() {
		return primaryFlag;
	}

	public void setPrimaryFlag(String primaryFlag) {
		this.primaryFlag = primaryFlag;
	}

	public Date getRefDate() {
		return refDate;
	}

	public void setRefDate(Date refDate) {
		this.refDate = refDate;
	}

	public Date getValidUpToDate() {
		return validUpToDate;
	}

	public void setValidUpToDate(Date validUpToDate) {
		this.validUpToDate = validUpToDate;
	}

	public double getRemSanctionAmt() {
		return remSanctionAmt;
	}

	public void setRemSanctionAmt(double remSanctionAmt) {
		this.remSanctionAmt = remSanctionAmt;
	}

	public Integer getPrimarySetBy() {
		return primarySetBy;
	}

	public void setPrimarySetBy(Integer primarySetBy) {
		this.primarySetBy = primarySetBy;
	}

	public Date getPrimaryDateTime() {
		return primaryDateTime;
	}

	public void setPrimaryDateTime(Date primaryDateTime) {
		this.primaryDateTime = primaryDateTime;
	}

	public double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(double totalBill) {
		this.totalBill = totalBill;
	}

	public double getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(double totalPaid) {
		this.totalPaid = totalPaid;
	}

	public double getTotalRemain() {
		return totalRemain;
	}

	public void setTotalRemain(double totalRemain) {
		this.totalRemain = totalRemain;
	}

	public double getTotalRefund() {
		return totalRefund;
	}

	public void setTotalRefund(double totalRefund) {
		this.totalRefund = totalRefund;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}	

	public double getTotalConcn() {
		return totalConcn;
	}

	public void setTotalConcn(double totalConcn) {
		this.totalConcn = totalConcn;
	}	

	public double getTotalTds() {
		return totalTds;
	}

	public void setTotalTds(double totalTds) {
		this.totalTds = totalTds;
	}

	public List<MultipleSponsorDto> getListMultipleSponsor() {
		return listMultipleSponsor;
	}

	public void setListMultipleSponsor(List<MultipleSponsorDto> listMultipleSponsor) {
		this.listMultipleSponsor = listMultipleSponsor;
	}

	public List<ChargesMasterSlave> getListChargesMasterSlave() {
		return listChargesMasterSlave;
	}

	public void setListChargesMasterSlave(
			List<ChargesMasterSlave> listChargesMasterSlave) {
		this.listChargesMasterSlave = listChargesMasterSlave;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}	
}
