package com.hms.administrator.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.ehat.dto.ChargesMasterSlave;

@Entity
@Table(name="hall")
public class HallManagementDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="Hall_ID")
	private int hall;
	
	@Column(name="Hname")
	private String hallName;
	
	@Column(name="Number_of_Beds")
	private String numberOfBed;
	
	@Column(name="lease_per_bed")
	private String leasePreBed;
	
	@Column(name="lease_per_bed_isolation")
	private Integer leasePreBedIsolation;
	
	@Column(name="status")
	private String status;

	@Column(name="unit_id")
	private Integer unitId;
	
	

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

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
	
	//@OneToOne
	//@JoinColumn(name="ehat_hallid")
	@Transient
	private ChargesMasterSlave chargesmasterslave;

	
	//@Transient
	@Column(name = "Htype")
	private  String hall_type;
	
	//@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@Transient
	private HallType hallType;
	
	
	@Transient
	private String htypeName;
	
	@Transient
	private Integer countAvailableBeds;
	
	@Transient
	private Integer countCleaningBeds;
	
	@Transient
	private Integer countAllocateBeds;
	
	@Transient private Integer countTotalBeds;
	
	
	@Transient
	private List<HallManagementDto> hallList;
	
	
	//@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	//@JoinColumn(name = "Hall_ID")
	@Transient
	private List<Beds> bedsList;
	
	@Transient
	private List<Beds> bedList;
	
	@JsonGetter("hi")
	public int getHall() {
		return hall;
	}

	@JsonSetter("hi")
	public void setHall(int hall) {
		this.hall = hall;
	}


	@JsonGetter("ht")
	public String getHall_type() {
		return hall_type;
	}

	@JsonSetter("ht")
	public void setHall_type(String hall_type) {
		this.hall_type = hall_type;
	}

	@JsonGetter("bn")
	public String getNumberOfBed() {
		return numberOfBed;
	}

	@JsonSetter("bn")
	public void setNumberOfBed(String numberOfBed) {
		this.numberOfBed = numberOfBed;
	}

	@JsonGetter("lpb")
	public String getLeasePreBed() {
		return leasePreBed;
	}

	@JsonSetter("lpb")
	public void setLeasePreBed(String leasePreBed) {
		this.leasePreBed = leasePreBed;
	}

	@JsonGetter("leaIsoPay")
	public Integer getLeasePreBedIsolation() {
		return leasePreBedIsolation;
	}

	@JsonSetter("leaIsoPay")
	public void setLeasePreBedIsolation(Integer leasePreBedIsolation) {
		this.leasePreBedIsolation = leasePreBedIsolation;
	}

	@JsonGetter("status")
	public String getStatus() {
		return status;
	}

	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}



	public Integer getCountTotalBeds() {
		return countTotalBeds;
	}


	public void setCountTotalBeds(Integer countTotalBeds) {
		this.countTotalBeds = countTotalBeds;
	}

	@JsonGetter("unitId")
	public Integer getUnitId() {
		return unitId;
	}

	@JsonSetter("unitId")
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
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


	public ChargesMasterSlave getChargesmasterslave() {
		return chargesmasterslave;
	}


	public void setChargesmasterslave(ChargesMasterSlave chargesmasterslave) {
		this.chargesmasterslave = chargesmasterslave;
	}


	@JsonGetter("hl")
	public List<HallManagementDto> getHallList() {
		return hallList;
	}

	@JsonSetter("hl")
	public void setHallList(List<HallManagementDto> hallList) {
		this.hallList = hallList;
	}

	

	@JsonGetter("hn")
	public String getHallName() {
		return hallName;
	}

	@JsonSetter("hn")
	public void setHallName(String hallName) {
		this.hallName = hallName;
	}


	@Override
	public String toString() {
		return "Hall [hall=" + hall + ", numberOfBed=" + numberOfBed + ", leasePreBed=" + leasePreBed
				+ ", leasePreBedIsolation=" + leasePreBedIsolation + ", status=" + status + ", unitId=" + unitId
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deleted=" + deleted + ", deletedBy=" + deletedBy
				+ ", deletedDate=" + deletedDate + ", chargesmasterslave=" + chargesmasterslave 
				+ ", hallList=" + hallList + "]";
	}

	@JsonGetter("bl")
	public List<Beds> getBedsList() {
		return bedsList;
	}

	@JsonSetter("bl")
	public void setBedsList(List<Beds> bedsList) {
		this.bedsList = bedsList;
	}

	@JsonGetter("htnm")
	public String getHtypeName() {
		return htypeName;
	}

	@JsonSetter("htnm")
	public void setHtypeName(String htypeName) {
		this.htypeName = htypeName;
	}

	public List<Beds> getBedList() {
		return bedList;
	}

	public void setBedList(List<Beds> bedList) {
		this.bedList = bedList;
	}


	public Integer getCountAvailableBeds() {
		return countAvailableBeds;
	}


	public void setCountAvailableBeds(Integer countAvailableBeds) {
		this.countAvailableBeds = countAvailableBeds;
	}


	public Integer getCountCleaningBeds() {
		return countCleaningBeds;
	}


	public void setCountCleaningBeds(Integer countCleaningBeds) {
		this.countCleaningBeds = countCleaningBeds;
	}


	public Integer getCountAllocateBeds() {
		return countAllocateBeds;
	}


	public void setCountAllocateBeds(Integer countAllocateBeds) {
		this.countAllocateBeds = countAllocateBeds;
	}

	public HallType getHallType() {
		return hallType;
	}

	public void setHallType(HallType hallType) {
		this.hallType = hallType;
	}

		
}
