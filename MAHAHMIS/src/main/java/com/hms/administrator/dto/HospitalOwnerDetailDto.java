package com.hms.administrator.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="hospitalownerinformation")
public class HospitalOwnerDetailDto {
	
	@Id
	@GeneratedValue
	@Column(name = "idHospitalOwnerInformation")
	private int idhospitalOwner;
	
	
	@Column(name="idhospital")
	private int idhospital;

	@Column(name="title")
	private String title;
	
	@Column(name="name")
	private String name;
	
	@Column(name="address")
	private String address;
	
	@Column(name="email")
	private String email;
	
	@Column(name="contact")
	private String contact;
	
	@Column(name="dob")
	private String dob;
	
	@Column(name="age")
	private String age;
	
	@Column(name="opdPerc")
	private Float opdPerc;
	
	@Column(name="ipdPerc")
	private Float ipdPerc;
	
	
	
	@Column(name = "status")
	private String status="Y";
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Transient
	List<HospitalOwnerDetailDto> listHospitalOwner;

	@JsonGetter("listHospitalOwner")
	public List<HospitalOwnerDetailDto> getListHospitalOwner() {
		return listHospitalOwner;
	}

	@JsonSetter("listHospitalOwner")
	public void setListHospitalOwner(List<HospitalOwnerDetailDto> listHospitalOwner) {
		this.listHospitalOwner = listHospitalOwner;
	}
	public int getIdhospital() {
		return idhospital;
	}

	public void setIdhospital(int idhospital) {
		this.idhospital = idhospital;
	}
	
	public int getIdhospitalOwner() {
		return idhospitalOwner;
	}

	public void setIdhospitalOwner(int idhospitalOwner) {
		this.idhospitalOwner = idhospitalOwner;
	}
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public Float getOpdPerc() {
		return opdPerc;
	}

	public void setOpdPerc(Float opdPerc) {
		this.opdPerc = opdPerc;
	}

	public Float getIpdPerc() {
		return ipdPerc;
	}

	public void setIpdPerc(Float ipdPerc) {
		this.ipdPerc = ipdPerc;
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

	
	
}
