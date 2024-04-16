package com.hms.inventory.dto;

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

@Entity
@Table(name="ehat_categoary_doc")
public class CategoryDTOM {
	@Id
	@GeneratedValue
	@Column(name = "categoary_id")
	private Integer categoryId;
	@Column(name = "categoary_name")
	private String categoryName;	
	@Column(name = "categoary_prefix")
	private String categoryPerifix;
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
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
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<CategoryDTOM> lstcategoaryDoc;

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryPerifix() {
		return categoryPerifix;
	}

	public void setCategoryPerifix(String categoryPerifix) {
		this.categoryPerifix = categoryPerifix;
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

	public List<CategoryDTOM> getLstcategoaryDoc() {
		return lstcategoaryDoc;
	}

	public void setLstcategoaryDoc(List<CategoryDTOM> lstcategoaryDoc) {
		this.lstcategoaryDoc = lstcategoaryDoc;
	}

	@Override
	public String toString() {
		return "CategoryDTOM [categoryId=" + categoryId + ", categoryName="
				+ categoryName + ", categoryPerifix=" + categoryPerifix
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy="
				+ deletedBy + ", deletedDate=" + deletedDate + ", unitId="
				+ unitId + ", lstcategoaryDoc=" + lstcategoaryDoc
				+ ", getCategoryId()=" + getCategoryId()
				+ ", getCategoryName()=" + getCategoryName()
				+ ", getCategoryPerifix()=" + getCategoryPerifix()
				+ ", getCreatedBy()=" + getCreatedBy() + ", getUpdatedBy()="
				+ getUpdatedBy() + ", getCreatedDate()=" + getCreatedDate()
				+ ", getUpdatedDate()=" + getUpdatedDate() + ", getDeleted()="
				+ getDeleted() + ", getDeletedBy()=" + getDeletedBy()
				+ ", getDeletedDate()=" + getDeletedDate() + ", getUnitId()="
				+ getUnitId() + ", getLstcategoaryDoc()="
				+ getLstcategoaryDoc() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	
}
