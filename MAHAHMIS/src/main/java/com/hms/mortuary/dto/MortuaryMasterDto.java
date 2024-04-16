package com.hms.mortuary.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.hms.administrator.dto.CustomizeTemplate;

@Entity
@Table(name = "MortuaryMaster")
public class MortuaryMasterDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "mor_id")
	private Integer mor_id;

	@Column(name = "additional_nt")
	private String additional_nt;

	@Column(name = "patient_id")
	private int patient_id;
	
	@Column(name = "address1")
	private String address1;

	@Column(name = "admsn_no")
	private String admsn_no;

	@Column(name = "age1")
	private String age1;

	@Column(name = "clothing")
	private String clothing;


	@Column(name = "death_time")
	private String death_time;

	@Column(name = "death_ward")
	private String death_ward;

	@Column(name = "gender1")
	private String gender1;

	@Column(name = "mlc_pd")
	private String mlc_pd;

	@Column(name = "property")
	private String property;

	@Column(name = "relative_name")
	private String relative_name;

	@Column(name = "time_in")
	private String time_in;

	@Column(name = "deceased_name")
	private String deceased_name;
	
	@Column(name = "status")
	private String status;
	
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

	@Column(name = "relation")
	private String relation;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Column(name = "date_in")
	private String date_in;
	
	@Column(name = "date_of_death")
	private String date_of_death;

	@Column(name = "is_bed_alloted")
	private String isBedAlloted = "N";
	
	@Transient
	private List<MortuaryMasterDto> mordto;

	@Transient
	private int cold_room_no;
	
	@Transient
	private int bed_number;
	
	@Transient
	private String cold_room_name;
	
	/*
	 * @OneToOne(cascade=CascadeType.ALL)
	 * 
	 * @JoinColumn(name="idCustomizeTemplate",nullable=false) private
	 * CustomizeTemplate idCustomizeTemplate;
	 */

	
	

	public String getCold_room_name() {
		return cold_room_name;
	}
	public void setCold_room_name(String cold_room_name) {
		this.cold_room_name = cold_room_name;
	}
	public int getCold_room_no() {
		return cold_room_no;
	}
	public void setCold_room_no(int cold_room_no) {
		this.cold_room_no = cold_room_no;
	}
	public int getBed_number() {
		return bed_number;
	}
	public void setBed_number(int bed_number) {
		this.bed_number = bed_number;
	}
	public String getRelation() {
		return relation;
	}
	public void setRelation(String relation) {
		this.relation = relation;
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
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDate_in() {
		return date_in;
	}

	public void setDate_in(String date_in) {
		this.date_in = date_in;
	}

	public String getDate_of_death() {
		return date_of_death;
	}

	public void setDate_of_death(String date_of_death) {
		this.date_of_death = date_of_death;
	}

	public Integer getMor_id() {
		return mor_id;
	}

	public void setMor_id(Integer mor_id) {
		this.mor_id = mor_id;
	}

	public String getAdditional_nt() {
		return additional_nt;
	}

	public void setAdditional_nt(String additional_nt) {
		this.additional_nt = additional_nt;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAdmsn_no() {
		return admsn_no;
	}

	public void setAdmsn_no(String admsn_no) {
		this.admsn_no = admsn_no;
	}

	public String getAge1() {
		return age1;
	}

	public void setAge1(String age1) {
		this.age1 = age1;
	}

	public String getClothing() {
		return clothing;
	}

	public void setClothing(String clothing) {
		this.clothing = clothing;
	}

	public String getDeath_time() {
		return death_time;
	}

	public void setDeath_time(String death_time) {
		this.death_time = death_time;
	}

	public String getDeath_ward() {
		return death_ward;
	}

	public void setDeath_ward(String death_ward) {
		this.death_ward = death_ward;
	}


	public String getGender1() {
		return gender1;
	}

	public void setGender1(String gender1) {
		this.gender1 = gender1;
	}

	public String getMlc_pd() {
		return mlc_pd;
	}

	public void setMlc_pd(String mlc_pd) {
		this.mlc_pd = mlc_pd;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getRelative_name() {
		return relative_name;
	}

	public void setRelative_name(String relative_name) {
		this.relative_name = relative_name;
	}

	public String getTime_in() {
		return time_in;
	}

	public void setTime_in(String time_in) {
		this.time_in = time_in;
	}

	public String getDeceased_name() {
		return deceased_name;
	}

	public void setDeceased_name(String deceased_name) {
		this.deceased_name = deceased_name;
	}

	public List<MortuaryMasterDto> getMordto() {
		return mordto;
	}

	public void setMordto(List<MortuaryMasterDto> mordto) {
		this.mordto = mordto;
	}
	
	public String getIsBedAlloted() {
		return isBedAlloted;
	}

	public void setIsBedAlloted(String isBedAlloted) {
		this.isBedAlloted = isBedAlloted;
	}
	
	public int getPatient_id() {
		return patient_id;
	}
	
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}
	
	
	@Override
	public String toString() {
		return "MortuaryMasterDto [mor_id=" + mor_id + ", additional_nt=" + additional_nt + ", patient_id=" + patient_id
				+ ", address1=" + address1 + ", admsn_no=" + admsn_no + ", age1=" + age1 + ", clothing=" + clothing
				+ ", death_time=" + death_time + ", death_ward=" + death_ward + ", gender1=" + gender1 + ", mlc_pd="
				+ mlc_pd + ", property=" + property + ", relative_name=" + relative_name + ", time_in=" + time_in
				+ ", deceased_name=" + deceased_name + ", status=" + status + ", createdBy=" + createdBy
				+ ", updatedBy=" + updatedBy + ", createdDate=" + createdDate + ", updatedDate=" + updatedDate
				+ ", deleted=" + deleted + ", deletedBy=" + deletedBy + ", relation=" + relation + ", deletedDate="
				+ deletedDate + ", unitId=" + unitId + ", date_in=" + date_in + ", date_of_death=" + date_of_death
				+ ", isBedAlloted=" + isBedAlloted + ", mordto=" + mordto + ", cold_room_no=" + cold_room_no
				+ ", bed_number=" + bed_number + ", cold_room_name=" + cold_room_name + "]";
	}
	
}
