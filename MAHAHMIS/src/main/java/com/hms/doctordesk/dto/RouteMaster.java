package com.hms.doctordesk.dto;
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
@Table(name="dd_route_master")
public class RouteMaster {
	@Id
	@GeneratedValue
	@Column(name="route_id")
	private int route_id;
	
	@Column(name="routename")
	private String routename;
	
	@Column(name="routeUnicode",columnDefinition="varchar(500) default ''")
	private String routeUnicode="";
	
	@Column(name="preparation")
	private int preparation_id;
	
	@Column(name="preparation_name")
	private String preparation_name;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;

	@UpdateTimestamp
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
	private List<RouteMaster> listroutemasters;

	public int getRoute_id() {
		return route_id;
	}

	public void setRoute_id(int route_id) {
		this.route_id = route_id;
	}

	public String getRoutename() {
		return routename;
	}

	public void setRoutename(String routename) {
		this.routename = routename;
	}


	public int getPreparation_id() {
		return preparation_id;
	}

	public void setPreparation_id(int preparation_id) {
		this.preparation_id = preparation_id;
	}

	public String getPreparation_name() {
		return preparation_name;
	}

	public void setPreparation_name(String preparation_name) {
		this.preparation_name = preparation_name;
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

	public List<RouteMaster> getListroutemasters() {
		return listroutemasters;
	}

	public void setListroutemasters(List<RouteMaster> listroutemasters) {
		this.listroutemasters = listroutemasters;
	}

	public String getRouteUnicode() {
		return routeUnicode;
	}

	public void setRouteUnicode(String routeUnicode) {
		this.routeUnicode = routeUnicode;
	}

	@Override
	public String toString() {
		return "RouteMaster [route_id=" + route_id + ", routename=" + routename + ", routeUnicode=" + routeUnicode
				+ ", preparation_id=" + preparation_id + ", preparation_name=" + preparation_name + ", createdBy="
				+ createdBy + ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate="
				+ updatedDate + ", deleted=" + deleted + ", deletedBy=" + deletedBy + ", deletedDate=" + deletedDate
				+ ", unitId=" + unitId + ", listroutemasters=" + listroutemasters + "]";
	}

}
