package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hms.administrator.dto.Beds;

@Entity
@Table(name = "ehat_charges_master_slave")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChargesMasterSlave implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
    @Column(name = "id")
	private Integer slaveId;

	@Column(name = "category_name")
	private String categoryName;

	@Column(name = "code_name")
	private String codeName;

	@Column(name = "charges_master_id")
	private Integer chargesMasterDto;

	@Column(name = "isCategory")
	private String isCategory;
	
	@Column(name = "isPpn")
	private String isPpn;
	
	@Column(name = "selfId")
	private Integer selfId;
	
	@Column(name = "numbr")
	private Double numbr=0.0;
	
	@Column(name = "unit_id", columnDefinition = "int default 0")
	private Integer unitId=0;

	@Column(name = "reh_pack_charges", columnDefinition = "double default 0")
	private Double rehPackCharges=0.0;
	
	@Column(name = "no_of_beds", columnDefinition = "int default 0")
	private Integer noOfBeds=0;
	
	@Column(name = "normal_nurse_charges", columnDefinition = "double default 0")
	private Double normalNurseCharges=0.0;
	
	@Column(name = "iso_nurse_charges", columnDefinition = "double default 0")
	private Double isoNurseCharges=0.0;
	
	@Column(name = "normal_bed_charges", columnDefinition = "double default 0")
	private Double normalBedCharges=0.0;
	
	@Column(name = "iso_bed_charges", columnDefinition = "double default 0")
	private Double isoBedCharges=0.0;
	
	/*@Transient
	private Set<ChargesMasterSlave> subordinates = new HashSet<ChargesMasterSlave>();*/

	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@OrderBy
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	//@OneToMany(cascade = CascadeType.ALL)
	@Where(clause="deleted='N'")
	@JoinColumn(name="Hall_ID",nullable = false)
	private List<Beds> listBeds;
	
	@Column(name = "followup_count", columnDefinition = "int default 0")
	private int followUpCount=0;
	
	@Transient
	private List<ChargesMasterSlave> lstChargesSlave;
	
	@Transient
	int allocateCount;
	
	@Transient
	int deallocateCount;
	
	@Transient
	int cleaningCount;
	

	@Transient
	private List<ChargesMasterDto> lstChargesMaster;
	
	@Column(name = "discount",nullable = false, columnDefinition = "int default 0")
	private double discount;
	
	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public List<ChargesMasterDto> getLstChargesMaster() {
		return lstChargesMaster;
	}

	public void setLstChargesMaster(List<ChargesMasterDto> lstChargesMaster) {
		this.lstChargesMaster = lstChargesMaster;
	}

	public Integer getSelfId() {
		return selfId;
	}

	public void setSelfId(Integer selfId) {
		this.selfId = selfId;
	}

	public Double getRehPackCharges() {
		return rehPackCharges;
	}

	public void setRehPackCharges(Double rehPackCharges) {
		this.rehPackCharges = rehPackCharges;
	}

	public Integer getNoOfBeds() {
		return noOfBeds;
	}

	public void setNoOfBeds(Integer noOfBeds) {
		this.noOfBeds = noOfBeds;
	}

	public Double getNormalNurseCharges() {
		return normalNurseCharges;
	}

	public void setNormalNurseCharges(Double normalNurseCharges) {
		this.normalNurseCharges = normalNurseCharges;
	}

	public Double getIsoNurseCharges() {
		return isoNurseCharges;
	}

	public void setIsoNurseCharges(Double isoNurseCharges) {
		this.isoNurseCharges = isoNurseCharges;
	}

	public Double getNormalBedCharges() {
		return normalBedCharges;
	}

	public void setNormalBedCharges(Double normalBedCharges) {
		this.normalBedCharges = normalBedCharges;
	}

	public Double getIsoBedCharges() {
		return isoBedCharges;
	}

	public void setIsoBedCharges(Double isoBedCharges) {
		this.isoBedCharges = isoBedCharges;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getSlaveId() {
		return slaveId;
	}

	public void setSlaveId(Integer slaveId) {
		this.slaveId = slaveId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public Integer getChargesMasterDto() {
		return chargesMasterDto;
	}

	public void setChargesMasterDto(Integer chargesMasterDto) {
		this.chargesMasterDto = chargesMasterDto;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
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

	public List<Beds> getListBeds() {
		return listBeds;
	}

	public void setListBeds(List<Beds> listBeds) {
		this.listBeds = listBeds;
	}

	public List<ChargesMasterSlave> getLstChargesSlave() {
		return lstChargesSlave;
	}

	public void setLstChargesSlave(List<ChargesMasterSlave> lstChargesSlave) {
		this.lstChargesSlave = lstChargesSlave;
	}

	public String getIsPpn() {
		return isPpn;
	}

	public void setIsPpn(String isPpn) {
		this.isPpn = isPpn;
	}

	public Double getNumbr() {
		return numbr;
	}

	public void setNumbr(Double numbr) {
		this.numbr = numbr;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public void setHallList(List<ChargesMasterSlave> list) {
		// TODO Auto-generated method stub
		
	}

	public int getAllocateCount() {
		return allocateCount;
	}

	public void setAllocateCount(int allocateCount) {
		this.allocateCount = allocateCount;
	}

	public int getDeallocateCount() {
		return deallocateCount;
	}

	public void setDeallocateCount(int deallocateCount) {
		this.deallocateCount = deallocateCount;
	}

	public int getCleaningCount() {
		return cleaningCount;
	}

	public void setCleaningCount(int cleaningCount) {
		this.cleaningCount = cleaningCount;
	}

	public int getFollowUpCount() {
		return followUpCount;
	}

	public void setFollowUpCount(int followUpCount) {
		this.followUpCount = followUpCount;
	}

	@Override
	public String toString() {
		return "ChargesMasterSlave [slaveId=" + slaveId + ", categoryName=" + categoryName + ", codeName=" + codeName
				+ ", chargesMasterDto=" + chargesMasterDto + ", isCategory=" + isCategory + ", isPpn=" + isPpn
				+ ", selfId=" + selfId + ", numbr=" + numbr + ", unitId=" + unitId + ", rehPackCharges="
				+ rehPackCharges + ", noOfBeds=" + noOfBeds + ", normalNurseCharges=" + normalNurseCharges
				+ ", isoNurseCharges=" + isoNurseCharges + ", normalBedCharges=" + normalBedCharges + ", isoBedCharges="
				+ isoBedCharges + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy
				+ ", deleted=" + deleted + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate
				+ ", deletedDate=" + deletedDate + ", listBeds=" + listBeds + ", followUpCount=" + followUpCount
				+ ", lstChargesSlave=" + lstChargesSlave + ", allocateCount=" + allocateCount + ", deallocateCount="
				+ deallocateCount + ", cleaningCount=" + cleaningCount + ", lstChargesMaster=" + lstChargesMaster
				+ ", discount=" + discount + "]";
	}

	
	
	/*public Set<ChargesMasterSlave> getSubordinates() {
		return subordinates;
	}

	public void setSubordinates(Set<ChargesMasterSlave> subordinates) {
		this.subordinates = subordinates;
	}
*/
	
	
	
}
