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
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Pattern;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.RegistrationDto;

@Entity
//@JsonIgnoreProperties(ignoreUnknown=true)
@Table(name="ehat_ivf_gynaecological_history")
public class GynHistoryDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue   //(strategy=GenerationType.AUTO)
	@Column(name="gynaecological_id")
	private int gynid;
	
	@Column(name = "pid")
	private int pid;

	@Column(name = "tid")
	private int tid;
	
	@Column(name = "ivf_treatment_id")
	private int ivf_treatmentId;
	
	@Column(name = "created_by",updatable=false)
	private int createdBy;

	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date",updatable=false)
	private Date createdDate;


	@Column(name = "updated_by")
	private int updatedBy;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date",updatable=true)
	private Date updatedDate;
	
	/*@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;*/

	public int getPid() {
		return pid;
	}


	public void setPid(int pid) {
		this.pid = pid;
	}


	public int getTid() {
		return tid;
	}


	public void setTid(int tid) {
		this.tid = tid;
	}


	public int getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}


	public Date getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public int getUpdatedBy() {
		return updatedBy;
	}


	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}


	public Date getUpdatedDate() {
		return updatedDate;
	}


	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	
	/*public int getUnitId() {
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
	}*/

	@Column(name="menarche_age")
	private String menarcheAge;
	
	@Column(name="amenorria")
	private String amenorria;
	
	@Column(name="amenorria_month")
	private String amenorriaMonth;
	
	@Column(name="amenorria_day")
	private String amenorriaDay;
	
	@Column(name="amenorriaPS")
	private String amenorriaPS;
	
	//@JsonIgnore
	@Column(name="lmp")
	private String lmd;
	
	
	//@Pattern(regexp="^[a-zA-Z0-9!@#$%^&*()_+=,./?{}\\|]")
	@Column(name="duration_of_flow")
	private String durationOfFlow;
	
	@Column(name="intensity_of_flow")
	private String intensityOfFlow;
	
	@Column(name="cycle_periodicity")
	private String cyclePeriodicity;
	
	@Column(name="menstrual_cycle")
	private String menstrualCycle;
	
	@Column(name="menstrual_irrugularity_days")
	private String menstrualIrregularityDays;
	
	@Column(name="menstrual_irrugularity")
	private String menstrualIrregularity;
	
	@Column(name="treatement_any")
	private String treatementAny;

	@Column(name="no_of_marriage")
	private String noOfMarriage;
	
	@Column(name="consagunity")
	private String consagunity;
	
	@Column(name="married_since")
	private String marriedSince;
	
	@Column(name="trying_to_conceive")
	private String tryToConceive;
	
	@Column(name="sexually_active")
	private String sexuallyActive;
	
	@Column(name="periodicity_of_intercource")
	private String periodicityOfInterCource;
	
	@Column(name="previous_preganancy_gravid")
	private String prePregGravid;
	
	@Column(name="previous_preganancy_parity")
	private String prePregParity;
	
	@Column(name="previous_preganancy_abortion")
	private String prePregAbortion;
	
	@Column(name="previous_preganancy_live")
	private String prePregLive;
	
	@Column(name="contraception_pills")
	private String contraceptionPills;
	
	@Column(name="contraception_condom")
	private String contraceptionCondom;
	
	@Column(name="contraception_iud")
	private String contraceptionIud;
	
	@Column(name="contraception_diaphragm")
	private String contraceptionDiaphragm;
	
	@Column(name="contraception_implant")
	private String contraceptionImplant;
	
	@Column(name="contraception_injectable")
	private String contraceptionInjectable;
	
	
	@Transient
	private List<GynHistoryDto> listGyn;

	public int getGynid() {
		return gynid;
	}


	public void setGynid(int gynid) {
		this.gynid = gynid;
	}


	public String getMenarcheAge() {
		return menarcheAge;
	}


	public void setMenarcheAge(String menarcheAge) {
		this.menarcheAge = menarcheAge;
	}


	public String getAmenorria() {
		return amenorria;
	}


	public void setAmenorria(String amenorria) {
		this.amenorria = amenorria;
	}

	public String getAmenorriaMonth() {
		return amenorriaMonth;
	}


	public void setAmenorriaMonth(String amenorriaMonth) {
		this.amenorriaMonth = amenorriaMonth;
	}


	public String getAmenorriaDay() {
		return amenorriaDay;
	}


	public void setAmenorriaDay(String amenorriaDay) {
		this.amenorriaDay = amenorriaDay;
	}


	public String getAmenorriaPS() {
		return amenorriaPS;
	}


	public void setAmenorriaPS(String amenorriaPS) {
		this.amenorriaPS = amenorriaPS;
	}


	public String getLmd() {
		return lmd;
	}


	public void setLmd(String lmd) {
		this.lmd = lmd;
	}


	public String getDurationOfFlow() {
		return durationOfFlow;
	}


	public void setDurationOfFlow(String durationOfFlow) {
		this.durationOfFlow = durationOfFlow;
	}


	public String getIntensityOfFlow() {
		return intensityOfFlow;
	}


	public void setIntensityOfFlow(String intensityOfFlow) {
		this.intensityOfFlow = intensityOfFlow;
	}


	public String getCyclePeriodicity() {
		return cyclePeriodicity;
	}


	public void setCyclePeriodicity(String cyclePeriodicity) {
		this.cyclePeriodicity = cyclePeriodicity;
	}


	public String getMenstrualCycle() {
		return menstrualCycle;
	}


	public void setMenstrualCycle(String menstrualCycle) {
		this.menstrualCycle = menstrualCycle;
	}


	public String getMenstrualIrregularityDays() {
		return menstrualIrregularityDays;
	}


	public void setMenstrualIrregularityDays(String menstrualIrregularityDays) {
		this.menstrualIrregularityDays = menstrualIrregularityDays;
	}


	public String getMenstrualIrregularity() {
		return menstrualIrregularity;
	}


	public void setMenstrualIrregularity(String menstrualIrregularity) {
		this.menstrualIrregularity = menstrualIrregularity;
	}


	public String getTreatementAny() {
		return treatementAny;
	}


	public void setTreatementAny(String treatementAny) {
		this.treatementAny = treatementAny;
	}


	public String getNoOfMarriage() {
		return noOfMarriage;
	}


	public void setNoOfMarriage(String noOfMarriage) {
		this.noOfMarriage = noOfMarriage;
	}


	public String getConsagunity() {
		return consagunity;
	}


	public void setConsagunity(String consagunity) {
		this.consagunity = consagunity;
	}


	public String getMarriedSince() {
		return marriedSince;
	}


	public void setMarriedSince(String marriedSince) {
		this.marriedSince = marriedSince;
	}


	public String getTryToConceive() {
		return tryToConceive;
	}


	public void setTryToConceive(String tryToConceive) {
		this.tryToConceive = tryToConceive;
	}


	public String getSexuallyActive() {
		return sexuallyActive;
	}


	public void setSexuallyActive(String sexuallyActive) {
		this.sexuallyActive = sexuallyActive;
	}


	public String getPeriodicityOfInterCource() {
		return periodicityOfInterCource;
	}


	public void setPeriodicityOfInterCource(String periodicityOfInterCource) {
		this.periodicityOfInterCource = periodicityOfInterCource;
	}


	public String getPrePregGravid() {
		return prePregGravid;
	}


	public void setPrePregGravid(String prePregGravid) {
		this.prePregGravid = prePregGravid;
	}


	public String getPrePregParity() {
		return prePregParity;
	}


	public void setPrePregParity(String prePregParity) {
		this.prePregParity = prePregParity;
	}


	public String getPrePregAbortion() {
		return prePregAbortion;
	}


	public void setPrePregAbortion(String prePregAbortion) {
		this.prePregAbortion = prePregAbortion;
	}


	public String getPrePregLive() {
		return prePregLive;
	}


	public void setPrePregLive(String prePregLive) {
		this.prePregLive = prePregLive;
	}


	public String getContraceptionPills() {
		return contraceptionPills;
	}


	public void setContraceptionPills(String contraceptionPills) {
		this.contraceptionPills = contraceptionPills;
	}


	public String getContraceptionCondom() {
		return contraceptionCondom;
	}


	public void setContraceptionCondom(String contraceptionCondom) {
		this.contraceptionCondom = contraceptionCondom;
	}


	public String getContraceptionIud() {
		return contraceptionIud;
	}


	public void setContraceptionIud(String contraceptionIud) {
		this.contraceptionIud = contraceptionIud;
	}


	public String getContraceptionDiaphragm() {
		return contraceptionDiaphragm;
	}


	public void setContraceptionDiaphragm(String contraceptionDiaphragm) {
		this.contraceptionDiaphragm = contraceptionDiaphragm;
	}


	public String getContraceptionImplant() {
		return contraceptionImplant;
	}


	public void setContraceptionImplant(String contraceptionImplant) {
		this.contraceptionImplant = contraceptionImplant;
	}


	public String getContraceptionInjectable() {
		return contraceptionInjectable;
	}


	public void setContraceptionInjectable(String contraceptionInjectable) {
		this.contraceptionInjectable = contraceptionInjectable;
	}


	public List<GynHistoryDto> getListGyn() {
		return listGyn;
	}


	public void setListGyn(List<GynHistoryDto> listGyn) {
		this.listGyn = listGyn;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public int getIvf_treatmentId() {
		return ivf_treatmentId;
	}


	public void setIvf_treatmentId(int ivf_treatmentId) {
		this.ivf_treatmentId = ivf_treatmentId;
	}


	@Override
	public String toString() {
		return "GynHistoryDto [gynid=" + gynid + ", pid=" + pid + ", tid=" + tid + ", createdBy=" + createdBy
				+ ", createdDate=" + createdDate + ", updatedBy=" + updatedBy + ", updatedDate=" + updatedDate
				+ ", menarcheAge=" + menarcheAge + ", amenorria=" + amenorria + ", amenorriaMonth=" + amenorriaMonth
				+ ", amenorriaDay=" + amenorriaDay + ", amenorriaPS=" + amenorriaPS + ", lmd=" + lmd
				+ ", durationOfFlow=" + durationOfFlow + ", intensityOfFlow=" + intensityOfFlow + ", cyclePeriodicity="
				+ cyclePeriodicity + ", menstrualCycle=" + menstrualCycle + ", menstrualIrregularityDays="
				+ menstrualIrregularityDays + ", menstrualIrregularity=" + menstrualIrregularity + ", treatementAny="
				+ treatementAny + ", noOfMarriage=" + noOfMarriage + ", consagunity=" + consagunity + ", marriedSince="
				+ marriedSince + ", tryToConceive=" + tryToConceive + ", sexuallyActive=" + sexuallyActive
				+ ", periodicityOfInterCource=" + periodicityOfInterCource + ", prePregGravid=" + prePregGravid
				+ ", prePregParity=" + prePregParity + ", prePregAbortion=" + prePregAbortion + ", prePregLive="
				+ prePregLive + ", contraceptionPills=" + contraceptionPills + ", contraceptionCondom="
				+ contraceptionCondom + ", contraceptionIud=" + contraceptionIud + ", contraceptionDiaphragm="
				+ contraceptionDiaphragm + ", contraceptionImplant=" + contraceptionImplant
				+ ", contraceptionInjectable=" + contraceptionInjectable + ", listGyn=" + listGyn + "]";
	}

		

}
