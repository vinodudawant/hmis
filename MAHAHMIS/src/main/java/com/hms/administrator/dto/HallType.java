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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.dto.HallTypeCharges;

/**
 * @author orcasys
 *
 */
@Entity
@Table(name="hall_type")
public class HallType implements Serializable {


	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="idhall_type")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idhall_type;
	@Column(name="hall_type_name")
	private String hall_type_name;
	@Column(name="rehap_package_charges")
	private float packageCharges;

	@Transient
	private List<HallType> hallTypeList;
	@Transient
	private List<HallTypeCharges> listHallTypeCharges;
	@Transient
	private List<Beds> bedList;
	@Transient
	private Integer corporateId;
	@Column(name="ehat_halltype_id")
	private int ehat_halltype_id;
	
	@Column(name="status")
	private String status;
	
	// added by vinod start
	@Column(name="hall_id")
	private Integer hallTypeId;
	
	// added by Kishor
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
	
	


	public int getEhat_halltype_id() {
		return ehat_halltype_id;
	}

	public void setEhat_halltype_id(int ehat_halltype_id) {
		this.ehat_halltype_id = ehat_halltype_id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public Integer getHallTypeId() {
		return hallTypeId;
	}

	public void setHallTypeId(Integer hallTypeId) {
		this.hallTypeId = hallTypeId;
	}
	// added by vinod end
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@JsonGetter("corpoarteId")
	public Integer getCorporateId() {
		return corporateId;
	}

	@JsonSetter("corpoarteId")
	public void setCorporateId(Integer corporateId) {
		this.corporateId = corporateId;
	}

	@JsonGetter("lihtchr")
	public List<HallTypeCharges> getListHallTypeCharges() {
		return listHallTypeCharges;
	}

	@JsonSetter("lihtchr")
	public void setListHallTypeCharges(List<HallTypeCharges> listHallTypeCharges) {
		this.listHallTypeCharges = listHallTypeCharges;
	}

	@JsonGetter("pkgchr")
	public float getPackageCharges() {
		return packageCharges;
	}

	@JsonSetter("pkgchr")
	public void setPackageCharges(float packageCharges) {
		this.packageCharges = packageCharges;
	}

	@JsonGetter("idht")
	public int getIdhall_type() {
		return idhall_type;
	}

	@JsonSetter("idht")
	public void setIdhall_type(int idhall_type) {
		this.idhall_type = idhall_type;
	}

	@JsonGetter("htnm")
	public String getHall_type_name() {
		return hall_type_name;
	}

	@JsonSetter("htnm")
	public void setHall_type_name(String hall_type_name) {
		this.hall_type_name = hall_type_name;
	}
	
	@JsonGetter("htli")
	public List<HallType> getHallTypeList() {
		return hallTypeList;
	}

	@JsonSetter("htli")
	public void setHallTypeList(List<HallType> hallTypeList) {
		this.hallTypeList = hallTypeList;
	}

	public List<Beds> getBedList() {
		return bedList;
	}

	public void setBedList(List<Beds> bedList) {
		this.bedList = bedList;
	}

	public HallType() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public HallType(int idhall_type) {
		this.idhall_type=idhall_type;
	}
}
