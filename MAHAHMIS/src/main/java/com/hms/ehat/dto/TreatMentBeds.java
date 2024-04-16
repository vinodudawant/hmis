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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="treatment_beds")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TreatMentBeds {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID")
	private int id;
	
	@Column(name = "Treatment_ID")
	private int treatmentId;
	
	@Column(name = "Bed_ID")
	private int bedId;
	
	@Column(name = "unit_id",columnDefinition="int default 1") 
	private int unitId=1;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Column(name = "created_by",updatable=false)
	private int createdBy;
	
	@CreationTimestamp
	@Column(name = "In_Time",updatable=false)
	private Date In_Time;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Out_Time")
	private Date Out_Time;
	
	@Column(name = "charges",columnDefinition = "int default 0")
	private int charges;
	
	@Column(name = "isolation",columnDefinition="varchar(2) default '0'")
	private String isolation="0";
	
	@Column(name = "idBillableBedType",columnDefinition="varchar(2) default '0'")
	private String idBillableBedType="0";
	
	@Column(name = "bedAllocatedFor",columnDefinition="varchar(2) default 'P'")
	private String bedAllocatedFor="P";
	
	@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	private String status="Y";
	
	@Column(name = "shifted_By",columnDefinition="varchar(2) default '0'")
	private String shifted_By="0";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "shifted_date_time")
	private Date shifted_date_time;
	
	@Column(name = "closed_By",columnDefinition="varchar(2) default '0'")
	private String closed_By="0";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "closed_date_time")
	private Date closed_date_time;
	
	@Column(name = "phydis_flag",columnDefinition="varchar(2) default 'N'")
	private String phydis_flag="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "phydis_date_time")
	private Date phydis_date_time;
	
	@Column(name = "ivf_bed_flag",columnDefinition="varchar(2) default 'N'")
	private String ivf_bed_flag="N";
	
	//@OneToMany(cascade = CascadeType.ALL)
	//@JoinColumn(name = "tr_bed_id")
	//private List<Beds1> lstBeds;
	
	@Transient
	private Integer treatBedsId=0;
	
	@Transient
	private Integer deallocBedId=0;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "tr_bed_id")
	private List<BillDetailsIpdDto> lstBillDetailsIpd;
	
	@Transient
	List<TreatMentBeds>  getListOfTreatMentBeds;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getBedId() {
		return bedId;
	}

	public void setBedId(int bedId) {
		this.bedId = bedId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getIn_Time() {
		return In_Time;
	}

	public void setIn_Time(Date in_Time) {
		In_Time = in_Time;
	}

	public Date getOut_Time() {
		return Out_Time;
	}

	public void setOut_Time(Date out_Time) {
		Out_Time = out_Time;
	}

	public int getCharges() {
		return charges;
	}

	public void setCharges(int charges) {
		this.charges = charges;
	}

	public String getIsolation() {
		return isolation;
	}

	public void setIsolation(String isolation) {
		this.isolation = isolation;
	}

	public String getIdBillableBedType() {
		return idBillableBedType;
	}

	public void setIdBillableBedType(String idBillableBedType) {
		this.idBillableBedType = idBillableBedType;
	}

	public String getBedAllocatedFor() {
		return bedAllocatedFor;
	}

	public void setBedAllocatedFor(String bedAllocatedFor) {
		this.bedAllocatedFor = bedAllocatedFor;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getShifted_By() {
		return shifted_By;
	}

	public void setShifted_By(String shifted_By) {
		this.shifted_By = shifted_By;
	}

	public Date getShifted_date_time() {
		return shifted_date_time;
	}

	public void setShifted_date_time(Date shifted_date_time) {
		this.shifted_date_time = shifted_date_time;
	}

	public String getClosed_By() {
		return closed_By;
	}

	public void setClosed_By(String closed_By) {
		this.closed_By = closed_By;
	}

	public Date getClosed_date_time() {
		return closed_date_time;
	}

	public void setClosed_date_time(Date closed_date_time) {
		this.closed_date_time = closed_date_time;
	}

	public String getPhydis_flag() {
		return phydis_flag;
	}

	public void setPhydis_flag(String phydis_flag) {
		this.phydis_flag = phydis_flag;
	}

	public Date getPhydis_date_time() {
		return phydis_date_time;
	}

	public void setPhydis_date_time(Date phydis_date_time) {
		this.phydis_date_time = phydis_date_time;
	}

	public String getIvf_bed_flag() {
		return ivf_bed_flag;
	}

	public void setIvf_bed_flag(String ivf_bed_flag) {
		this.ivf_bed_flag = ivf_bed_flag;
	}

	/*public List<Beds1> getLstBeds() {
		return lstBeds;
	}

	public void setLstBeds(List<Beds1> lstBeds) {
		this.lstBeds = lstBeds;
	}*/
	
	public Integer getTreatBedsId() {
		return treatBedsId;
	}

	public void setTreatBedsId(Integer treatBedsId) {
		this.treatBedsId = treatBedsId;
	}

	public Integer getDeallocBedId() {
		return deallocBedId;
	}

	public void setDeallocBedId(Integer deallocBedId) {
		this.deallocBedId = deallocBedId;
	}

	public List<BillDetailsIpdDto> getLstBillDetailsIpd() {
		return lstBillDetailsIpd;
	}

	public void setLstBillDetailsIpd(List<BillDetailsIpdDto> lstBillDetailsIpd) {
		this.lstBillDetailsIpd = lstBillDetailsIpd;
	}

	public List<TreatMentBeds> getGetListOfTreatMentBeds() {
		return getListOfTreatMentBeds;
	}

	public void setGetListOfTreatMentBeds(List<TreatMentBeds> getListOfTreatMentBeds) {
		this.getListOfTreatMentBeds = getListOfTreatMentBeds;
	}
}
