package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.hms.dto.Beds;

//@Entity
//@Table(name="hall")
public class HallManagementDto {
	/*
	 * 
	 * @Id
	 * 
	 * @GeneratedValue(strategy=GenerationType.IDENTITY)
	 * 
	 * @Column(name="Hall_ID") private int hall;
	 * 
	 * @Column(name="Hname") private String hallName;
	 * 
	 * @Column(name="Number_of_Beds") private String numberOfBed;
	 * 
	 * @Column(name="lease_per_bed") private String leasePreBed;
	 * 
	 * @Column(name="lease_per_bed_isolation") private Integer leasePreBedIsolation;
	 * 
	 * @Column(name="status") private String status;
	 * 
	 * @Column(name="unit_id") private Integer unitId;
	 * 
	 * 
	 * 
	 * @Column(name = "created_by",updatable=false) private Integer createdBy;
	 * 
	 * @Column(name = "updated_by") private Integer updatedBy;
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "created_date_time",updatable=false) private Date createdDate;
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "updated_date_time") private Date updatedDate;
	 * 
	 * @Column(name = "deleted",columnDefinition="varchar(2) default 'N'") private
	 * String deleted="N";
	 * 
	 * 
	 * @Column(name = "deleted_by") private Integer deletedBy;
	 * 
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "delete_date_time") private Date deletedDate;
	 * 
	 * @OneToOne
	 * 
	 * @JoinColumn(name="ehat_hallid") private ChargesMasterSlave
	 * chargesmasterslave;
	 * 
	 * @Column(name = "Htype") private String hall_type;
	 * 
	 * @Transient private String htypeName;
	 * 
	 * @Transient private Integer countTotalBeds;
	 * 
	 * @Transient private Integer countAvailableBeds;
	 * 
	 * @Transient private Integer countCleaningBeds;
	 * 
	 * @Transient private Integer countAllocateBeds;
	 * 
	 * 
	 * @Transient private List<HallManagementDto> hallList;
	 * 
	 * @Transient private List<Beds> bedsList;
	 * 
	 * @Transient private List<Beds> bedList;
	 * 
	 * 
	 * public int getHall() { return hall; }
	 * 
	 * 
	 * public void setHall(int hall) { this.hall = hall; }
	 * 
	 * 
	 * 
	 * public String getHall_type() { return hall_type; }
	 * 
	 * 
	 * public void setHall_type(String hall_type) { this.hall_type = hall_type; }
	 * 
	 * 
	 * public String getNumberOfBed() { return numberOfBed; }
	 * 
	 * 
	 * public void setNumberOfBed(String numberOfBed) { this.numberOfBed =
	 * numberOfBed; }
	 * 
	 * 
	 * public String getLeasePreBed() { return leasePreBed; }
	 * 
	 * 
	 * public void setLeasePreBed(String leasePreBed) { this.leasePreBed =
	 * leasePreBed; }
	 * 
	 * 
	 * public Integer getLeasePreBedIsolation() { return leasePreBedIsolation; }
	 * 
	 * 
	 * public void setLeasePreBedIsolation(Integer leasePreBedIsolation) {
	 * this.leasePreBedIsolation = leasePreBedIsolation; }
	 * 
	 * 
	 * public String getStatus() { return status; }
	 * 
	 * 
	 * public void setStatus(String status) { this.status = status; }
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * public Integer getUnitId() { return unitId; }
	 * 
	 * 
	 * public void setUnitId(Integer unitId) { this.unitId = unitId; }
	 * 
	 * 
	 * public Integer getCreatedBy() { return createdBy; }
	 * 
	 * 
	 * public void setCreatedBy(Integer createdBy) { this.createdBy = createdBy; }
	 * 
	 * 
	 * public Integer getUpdatedBy() { return updatedBy; }
	 * 
	 * 
	 * public void setUpdatedBy(Integer updatedBy) { this.updatedBy = updatedBy; }
	 * 
	 * 
	 * public Date getCreatedDate() { return createdDate; }
	 * 
	 * 
	 * public void setCreatedDate(Date createdDate) { this.createdDate =
	 * createdDate; }
	 * 
	 * 
	 * public Date getUpdatedDate() { return updatedDate; }
	 * 
	 * 
	 * public void setUpdatedDate(Date updatedDate) { this.updatedDate =
	 * updatedDate; }
	 * 
	 * 
	 * public String getDeleted() { return deleted; }
	 * 
	 * 
	 * public void setDeleted(String deleted) { this.deleted = deleted; }
	 * 
	 * 
	 * public Integer getDeletedBy() { return deletedBy; }
	 * 
	 * 
	 * public void setDeletedBy(Integer deletedBy) { this.deletedBy = deletedBy; }
	 * 
	 * 
	 * public Date getDeletedDate() { return deletedDate; }
	 * 
	 * 
	 * public void setDeletedDate(Date deletedDate) { this.deletedDate =
	 * deletedDate; }
	 * 
	 * 
	 * public ChargesMasterSlave getChargesmasterslave() { return
	 * chargesmasterslave; }
	 * 
	 * 
	 * public void setChargesmasterslave(ChargesMasterSlave chargesmasterslave) {
	 * this.chargesmasterslave = chargesmasterslave; }
	 * 
	 * 
	 * public List<HallManagementDto> getHallList() { return hallList; }
	 * 
	 * 
	 * public void setHallList(List<HallManagementDto> hallList) { this.hallList =
	 * hallList; }
	 * 
	 * 
	 * 
	 * 
	 * public String getHallName() { return hallName; }
	 * 
	 * 
	 * public void setHallName(String hallName) { this.hallName = hallName; }
	 * 
	 * 
	 * @Override public String toString() { return "Hall [hall=" + hall +
	 * ", numberOfBed=" + numberOfBed + ", leasePreBed=" + leasePreBed +
	 * ", leasePreBedIsolation=" + leasePreBedIsolation + ", status=" + status +
	 * ", unitId=" + unitId + ", createdBy=" + createdBy + ", updatedBy=" +
	 * updatedBy + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate +
	 * ", deleted=" + deleted + ", deletedBy=" + deletedBy + ", deletedDate=" +
	 * deletedDate + ", chargesmasterslave=" + chargesmasterslave + ", hallList=" +
	 * hallList + "]"; }
	 * 
	 * 
	 * 
	 * public List<Beds> getBedsList() { return bedsList; }
	 * 
	 * 
	 * public void setBedsList(List<Beds> bedsList) { this.bedsList = bedsList; }
	 * 
	 * 
	 * public String getHtypeName() { return htypeName; }
	 * 
	 * 
	 * public void setHtypeName(String htypeName) { this.htypeName = htypeName; }
	 * 
	 * 
	 * public List<Beds> getBedList() { return bedList; }
	 * 
	 * 
	 * public void setBedList(List<Beds> bedList) { this.bedList = bedList; }
	 * 
	 * 
	 * public Integer getCountAvailableBeds() { return countAvailableBeds; }
	 * 
	 * 
	 * public void setCountAvailableBeds(Integer countAvailableBeds) {
	 * this.countAvailableBeds = countAvailableBeds; }
	 * 
	 * 
	 * public Integer getCountCleaningBeds() { return countCleaningBeds; }
	 * 
	 * 
	 * public void setCountCleaningBeds(Integer countCleaningBeds) {
	 * this.countCleaningBeds = countCleaningBeds; }
	 * 
	 * 
	 * public Integer getCountAllocateBeds() { return countAllocateBeds; }
	 * 
	 * 
	 * public void setCountAllocateBeds(Integer countAllocateBeds) {
	 * this.countAllocateBeds = countAllocateBeds; }
	 * 
	 * public Integer getCountTotalBeds() { return countTotalBeds; }
	 * 
	 * 
	 * public void setCountTotalBeds(Integer countTotalBeds) { this.countTotalBeds =
	 * countTotalBeds; }
	 * 
	 */}
