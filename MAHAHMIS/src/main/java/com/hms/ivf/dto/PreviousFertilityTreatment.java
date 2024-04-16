package com.hms.ivf.dto;


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
import javax.persistence.Transient;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "ehat_ivf_previous_fertility_treatment")
public class PreviousFertilityTreatment implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="previousfertlitytreatid")
	private int previousfertlitytreatid;
	
	@Column(name="previousfertilitytreatment")
	private String previousfertilitytreatment;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "ivf_treatment_id")
	private int ivf_treatmentId;
	
	public int getIvf_treatmentId() {
		return ivf_treatmentId;
	}




	public void setIvf_treatmentId(int ivf_treatmentId) {
		this.ivf_treatmentId = ivf_treatmentId;
	}

	@Column(name="art")
	private String art;
	
	@Column(name="timeintercourse",columnDefinition="varchar(20) default ''")
	private String timeintercourse="";
	
	
	@Column(name="timeintercoursedate")
	
	private String timeintercoursedate;
	
	@Column(name="timeintercourseremark")
	private String timeintercourseremark;
	
	@Column(name="ovalutioninduction")
	private String ovalutioninduction;
	
	@Column(name="ovalutioninductiondate")
	
	private String ovalutioninductiondate;
	
	@Column(name="ovalutioninductionremark")
	private String ovalutioninductionremark;
	
	@Column(name="intrauterineinseminatin")
	private String intrauterineinseminatin;
	
	@Column(name="intrauterineinseminatindate")
	
	private String intrauterineinseminatindate;
	
	
	@Column(name="intrauterineinseminatinremark")
	private String intrauterineinseminatinremark;
	
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
	

	
	@Column(name="ivficsiself")
	private String ivficsiself;

	@Column(name="ivficsiselfremark")
	private String ivficsiselfremark;
	
	@Column(name="ivficsiselfdate")
	
	private String  ivficsiselfdate;
	
	@Column(name="donoreggs")
	private String  donoreggs;

	
	@Column(name="donoreggsremark")
	private String donoreggsremark;
	
	@Column(name="donoreggsdate")
	private String donoreggsdate;
	
	@Column(name="donorsemen")
	private String donorsemen;

	@Column(name="donorsemenremark")
	private String donorsemenremark;
	
	@Column(name="donorsemendate")
    private String donorsemendate;
	
	
	@Column(name=" edcycle")
	private String edcycle;

	@Column(name="edcycleremark")
	private String edcycleremark;
	
	@Column(name="edcycledate")
	
	private String edcycledate;
	
	@Column(name="anyothertreatmentalternatetreatment")
	private String anyothertreatmentalternatetreatment;



	

	
	
	

	@Override
	public String toString() {
		return "PreviousFertilityTreatment [previousfertlitytreatid=" + previousfertlitytreatid
				+ ", previousfertilitytreatment=" + previousfertilitytreatment + ", patientId=" + patientId
				+ ", treatmentId=" + treatmentId + ", art=" + art + ", timeintercourse=" + timeintercourse
				+ ", timeintercoursedate=" + timeintercoursedate + ", timeintercourseremark=" + timeintercourseremark
				+ ", ovalutioninduction=" + ovalutioninduction + ", ovalutioninductiondate=" + ovalutioninductiondate
				+ ", ovalutioninductionremark=" + ovalutioninductionremark + ", intrauterineinseminatin="
				+ intrauterineinseminatin + ", intrauterineinseminatindate=" + intrauterineinseminatindate
				+ ", intrauterineinseminatinremark=" + intrauterineinseminatinremark + ", createdDateTime="
				+ createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", deletedDateTime="
				+ deletedDateTime + ", unitId=" + unitId + ", userId=" + userId + ", ivficsiself=" + ivficsiself
				+ ", ivficsiselfremark=" + ivficsiselfremark + ", ivficsiselfdate=" + ivficsiselfdate + ", donoreggs="
				+ donoreggs + ", donoreggsremark=" + donoreggsremark + ", donoreggsdate=" + donoreggsdate
				+ ", donorsemen=" + donorsemen + ", donorsemenremark=" + donorsemenremark + ", donorsemendate="
				+ donorsemendate + ", edcycle=" + edcycle + ", edcycleremark=" + edcycleremark + ", edcycledate="
				+ edcycledate + ", anyothertreatmentalternatetreatment=" + anyothertreatmentalternatetreatment
				+ ", ltpft=" + ltpft + "]";
	}




	public int getPatientId() {
		return patientId;
	}




	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}




	public int getTreatmentId() {
		return treatmentId;
	}




	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}




	public int getPreviousfertlitytreatid() {
		return previousfertlitytreatid;
	}




	public void setPreviousfertlitytreatid(int previousfertlitytreatid) {
		this.previousfertlitytreatid = previousfertlitytreatid;
	}




	public String getTimeintercourse() {
		return timeintercourse;
	}


	public void setTimeintercourse(String timeintercourse) {
		this.timeintercourse = timeintercourse;
	}


	public String getTimeintercoursedate() {
		return timeintercoursedate;
	}


	public void setTimeintercoursedate(String timeintercoursedate) {
		this.timeintercoursedate = timeintercoursedate;
	}


	public String getTimeintercourseremark() {
		return timeintercourseremark;
	}


	public void setTimeintercourseremark(String timeintercourseremark) {
		this.timeintercourseremark = timeintercourseremark;
	}


	public String getOvalutioninduction() {
		return ovalutioninduction;
	}


	public void setOvalutioninduction(String ovalutioninduction) {
		this.ovalutioninduction = ovalutioninduction;
	}


	public String getOvalutioninductiondate() {
		return ovalutioninductiondate;
	}


	public void setOvalutioninductiondate(String ovalutioninductiondate) {
		this.ovalutioninductiondate = ovalutioninductiondate;
	}


	public String getOvalutioninductionremark() {
		return ovalutioninductionremark;
	}


	public void setOvalutioninductionremark(String ovalutioninductionremark) {
		this.ovalutioninductionremark = ovalutioninductionremark;
	}


	public String getIntrauterineinseminatin() {
		return intrauterineinseminatin;
	}


	public void setIntrauterineinseminatin(String intrauterineinseminatin) {
		this.intrauterineinseminatin = intrauterineinseminatin;
	}


	public String getIntrauterineinseminatindate() {
		return intrauterineinseminatindate;
	}


	public void setIntrauterineinseminatindate(String intrauterineinseminatindate) {
		this.intrauterineinseminatindate = intrauterineinseminatindate;
	}


	public String getIntrauterineinseminatinremark() {
		return intrauterineinseminatinremark;
	}


	public void setIntrauterineinseminatinremark(String intrauterineinseminatinremark) {
		this.intrauterineinseminatinremark = intrauterineinseminatinremark;
	}


	public String getIvficsiself() {
		return ivficsiself;
	}


	public void setIvficsiself(String ivficsiself) {
		this.ivficsiself = ivficsiself;
	}


	public String getIvficsiselfremark() {
		return ivficsiselfremark;
	}


	public void setIvficsiselfremark(String ivficsiselfremark) {
		this.ivficsiselfremark = ivficsiselfremark;
	}


	public String getIvficsiselfdate() {
		return ivficsiselfdate;
	}


	public void setIvficsiselfdate(String ivficsiselfdate) {
		this.ivficsiselfdate = ivficsiselfdate;
	}


	public String getDonoreggs() {
		return donoreggs;
	}


	public void setDonoreggs(String donoreggs) {
		this.donoreggs = donoreggs;
	}


	public String getDonoreggsremark() {
		return donoreggsremark;
	}


	public void setDonoreggsremark(String donoreggsremark) {
		this.donoreggsremark = donoreggsremark;
	}


	public String getDonoreggsdate() {
		return donoreggsdate;
	}


	public void setDonoreggsdate(String donoreggsdate) {
		this.donoreggsdate = donoreggsdate;
	}


	public String getDonorsemen() {
		return donorsemen;
	}


	public void setDonorsemen(String donorsemen) {
		this.donorsemen = donorsemen;
	}


	public String getDonorsemenremark() {
		return donorsemenremark;
	}


	public void setDonorsemenremark(String donorsemenremark) {
		this.donorsemenremark = donorsemenremark;
	}


	public String getDonorsemendate() {
		return donorsemendate;
	}


	public void setDonorsemendate(String donorsemendate) {
		this.donorsemendate = donorsemendate;
	}


	public String getEdcycle() {
		return edcycle;
	}


	public void setEdcycle(String edcycle) {
		this.edcycle = edcycle;
	}


	public String getEdcycleremark() {
		return edcycleremark;
	}


	public void setEdcycleremark(String edcycleremark) {
		this.edcycleremark = edcycleremark;
	}


	public String getEdcycledate() {
		return edcycledate;
	}


	public void setEdcycledate(String edcycledate) {
		this.edcycledate = edcycledate;
	}


	public String getAnyothertreatmentalternatetreatment() {
		return anyothertreatmentalternatetreatment;
	}


	public void setAnyothertreatmentalternatetreatment(String anyothertreatmentalternatetreatment) {
		this.anyothertreatmentalternatetreatment = anyothertreatmentalternatetreatment;
	}


	public void setPreviousfertilitytreatment(String previousfertilitytreatment) {
		this.previousfertilitytreatment = previousfertilitytreatment;
	}


	public void setArt(String art) {
		this.art = art;
	}


	public String getPreviousfertilitytreatment() {
		return previousfertilitytreatment;
	}

	public String getArt() {
		return art;
	}
	
	@Transient
	private List<PreviousFertilityTreatment> ltpft;


	public List<PreviousFertilityTreatment> getLtpft() {
		return ltpft;
	}

	public void setLtpft(List<PreviousFertilityTreatment> ltpft) {
		this.ltpft = ltpft;
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



	

	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}
