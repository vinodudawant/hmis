package com.hms.ecogreenapi;

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

import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ProductMasterEcogreen;

@Entity
@Table(name = "ecogrren_item_master")

public class EcogreenItemMasterDto {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
	
	@Transient
	List<EcogreenItemMasterDto>  lstEcogreenItemDetails;
	
	/*@LazyCollection(value = LazyCollectionOption.FALSE)
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "item_master_id", nullable = false)
	List<ProductMasterEcogreen>  lstProd;
	*/
	
	//@LazyCollection(value = LazyCollectionOption.FALSE)
	//@OneToMany(cascade = CascadeType.ALL)
	//@JoinColumn(name = "item_master_id", nullable = false)
//	List<ProductMaster>  lstProd;
	
	
//	@LazyCollection(value = LazyCollectionOption.FALSE)
//	@OneToMany(cascade = CascadeType.ALL)
//	@JoinColumn(name = "item_master_id", nullable = false)
//	public List<EcogrrenItemDto> lstEcogrrenItem;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<EcogreenItemMasterDto> getLstEcogreenItemDetails() {
		return lstEcogreenItemDetails;
	}

	public void setLstEcogreenItemDetails(List<EcogreenItemMasterDto> lstEcogreenItemDetails) {
		this.lstEcogreenItemDetails = lstEcogreenItemDetails;
	}

	/*
	 * public List<EcogrrenItemDto> getLstEcogrrenItem() { return lstEcogrrenItem; }
	 * 
	 * public void setLstEcogrrenItem(List<EcogrrenItemDto> lstEcogrrenItem) {
	 * this.lstEcogrrenItem = lstEcogrrenItem; }
	 * 
	 * public List<ProductMaster> getLstProd() { return lstProd; }
	 * 
	 * public void setLstProd(List<ProductMaster> lstProd) { this.lstProd = lstProd;
	 * }
	 */

	/*
	 * @Override public String toString() { return "EcogreenItemMasterDto [id=" + id
	 * + ", createdDateTime=" + createdDateTime + ", updatedDateTime=" +
	 * updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted +
	 * ", createdBy=" + createdBy + ", updatedBy=" + updatedBy +
	 * ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" +
	 * userId + ", lstEcogreenItemDetails=" + lstEcogreenItemDetails + ", lstProd="
	 * + lstProd + ", lstEcogrrenItem=" + lstEcogrrenItem + "]"; }
	 */

	/*
	 * public List<ProductMasterEcogreen> getLstProd() { return lstProd; }
	 * 
	 * public void setLstProd(List<ProductMasterEcogreen> lstProd) { this.lstProd =
	 * lstProd; }
	 */

	/*
	@Override
	public String toString() {
		return "EcogreenItemMasterDto [id=" + id + ", createdDateTime=" + createdDateTime + ", updatedDateTime="
				+ updatedDateTime + ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId
				+ ", userId=" + userId + ", lstEcogreenItemDetails=" + lstEcogreenItemDetails + ", lstProd=" + lstProd
				+ ", lstEcogrrenItem=" + lstEcogrrenItem + "]";
	}

 */
	
	
	
	
	
	
	
}
