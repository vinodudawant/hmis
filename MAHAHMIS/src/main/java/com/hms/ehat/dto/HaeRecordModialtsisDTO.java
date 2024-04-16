package com.hms.ehat.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity
@Table(name ="ehat_dialysis_predialysis")
public class HaeRecordModialtsisDTO {

	
	@Id
	@GeneratedValue
	@Column(name = "id_prehaeRecordModialtsis")
	private int idPreDialysis;
	
	@Column(name = "id_treatment")
	private Integer treatmentId;
	
	@Column(name = "patient_Id")
	private Integer patientId;
	

	@Column(name = "provisional_diagnosis")
	private String provisionalDiagnosis;
	
	@Column(name = "objective_wt")
	private String objectiveWt;
	
	@Column(name = "pre_dialysis")
	private String preDialysis;
	
	
	@Column(name = "inter_dialysis")
	private String interDialysis;
	
	@Column(name = "temp")
	private String temp;
	
	
	@Column(name = "bp")
	private String bp;
	
	@Column(name = "uf_goal")
	private String uf_goal;
	
	@Column(name = "duration")
	private String duration;
	
	@Column(name = "conductivity")
	private String conductivity;
	
	@Column(name = "dialyser")
	private String dialyser;
	
	@Column(name = "surface_area")
	private String surfaceArea;
	
	@Column(name = "dialyzer")
	private String dialyzer;
	
	@Column(name = "tubing")
	private String tubing;
	
	@Column(name = "uf")
	private String uf;
	
	@Column(name = "with_uf")
	private String withUf;
	
	@Column(name = "seq_with_uf")
	private String sequetialDialysiswithUf;
	
	@Column(name = "isolated_uf")
	private String isolatedUf;
	
	@Column(name = "bicarbonate")
	private String bicarbonate;
	
	@Column(name = "calcium")
	private String calcium;
	
	@Column(name = "potassium")
	private String potassium;
	
	@Column(name = "ns")
	private String ns;
	
	@Column(name = "blood")
	private String blood;
	
	@Column(name = "regular")
	private String regular;
	
	@Column(name = "low")
	private String low;
	
	@Column(name = "heparine")
	private String heparine;
	
	@Column(name = "bonus_dose")
	private String bonusDose;
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Column(name = "deleted")
	private String deleted="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	@Column(name = "unit_id")
	private int unitId;
	public int getUnitId() {
		return unitId;
	}
	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}


	@Transient
	private List<HaeRecordModialtsisDTO> preDialysisList;

	@JsonGetter("listpreDialysis")
	public List<HaeRecordModialtsisDTO> getPreDialysisList() {
		return preDialysisList;
	}
	@JsonSetter("listpreDialysis")
	public void setPreDialysisList(List<HaeRecordModialtsisDTO> preDialysisList) {
		this.preDialysisList = preDialysisList;
	}


	@Transient
	private List<PostDialysisTableDTO> PostDialysisTableList;
	
	@Transient
	private List<PostDialysisAssesmentDTO> PostDialysisAssesmentList;
	
	
	
	

	public Integer getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	public List<PostDialysisTableDTO> getPostDialysisTableList() {
		return PostDialysisTableList;
	}
	public void setPostDialysisTableList(
			List<PostDialysisTableDTO> postDialysisTableList) {
		PostDialysisTableList = postDialysisTableList;
	}
	public List<PostDialysisAssesmentDTO> getPostDialysisAssesmentList() {
		return PostDialysisAssesmentList;
	}
	public void setPostDialysisAssesmentList(
			List<PostDialysisAssesmentDTO> postDialysisAssesmentList) {
		PostDialysisAssesmentList = postDialysisAssesmentList;
	}
	public int getIdPreDialysis() {
		return idPreDialysis;
	}
	public void setIdPreDialysis(int idPreDialysis) {
		this.idPreDialysis = idPreDialysis;
	}


	public String getProvisionalDiagnosis() {
		return provisionalDiagnosis;
	}

	public void setProvisionalDiagnosis(String provisionalDiagnosis) {
		this.provisionalDiagnosis = provisionalDiagnosis;
	}

	public String getObjectiveWt() {
		return objectiveWt;
	}

	public void setObjectiveWt(String objectiveWt) {
		this.objectiveWt = objectiveWt;
	}

	public String getPreDialysis() {
		return preDialysis;
	}

	public void setPreDialysis(String preDialysis) {
		this.preDialysis = preDialysis;
	}

	public String getInterDialysis() {
		return interDialysis;
	}

	public void setInterDialysis(String interDialysis) {
		this.interDialysis = interDialysis;
	}

	public String getBp() {
		return bp;
	}

	public void setBp(String bp) {
		this.bp = bp;
	}

	public String getUf_goal() {
		return uf_goal;
	}

	public void setUf_goal(String uf_goal) {
		this.uf_goal = uf_goal;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}


	public String getConductivity() {
		return conductivity;
	}
	public void setConductivity(String conductivity) {
		this.conductivity = conductivity;
	}
	public String getDialyser() {
		return dialyser;
	}

	public void setDialyser(String dialyser) {
		this.dialyser = dialyser;
	}

	public String getSurfaceArea() {
		return surfaceArea;
	}

	public void setSurfaceArea(String surfaceArea) {
		this.surfaceArea = surfaceArea;
	}

	public String getDialyzer() {
		return dialyzer;
	}

	public void setDialyzer(String dialyzer) {
		this.dialyzer = dialyzer;
	}

	public String getTubing() {
		return tubing;
	}

	public void setTubing(String tubing) {
		this.tubing = tubing;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getWithUf() {
		return withUf;
	}

	public void setWithUf(String withUf) {
		this.withUf = withUf;
	}

	public String getSequetialDialysiswithUf() {
		return sequetialDialysiswithUf;
	}

	public void setSequetialDialysiswithUf(String sequetialDialysiswithUf) {
		this.sequetialDialysiswithUf = sequetialDialysiswithUf;
	}

	public String getIsolatedUf() {
		return isolatedUf;
	}

	public void setIsolatedUf(String isolatedUf) {
		this.isolatedUf = isolatedUf;
	}

	public String getBicarbonate() {
		return bicarbonate;
	}

	public void setBicarbonate(String bicarbonate) {
		this.bicarbonate = bicarbonate;
	}

	public String getCalcium() {
		return calcium;
	}

	public void setCalcium(String calcium) {
		this.calcium = calcium;
	}

	public String getPotassium() {
		return potassium;
	}

	public void setPotassium(String potassium) {
		this.potassium = potassium;
	}

	public String getNs() {
		return ns;
	}

	public void setNs(String ns) {
		this.ns = ns;
	}

	public String getBlood() {
		return blood;
	}

	public void setBlood(String blood) {
		this.blood = blood;
	}

	public String getRegular() {
		return regular;
	}

	public void setRegular(String regular) {
		this.regular = regular;
	}

	public String getLow() {
		return low;
	}

	public void setLow(String low) {
		this.low = low;
	}

	public String getHeparine() {
		return heparine;
	}

	public void setHeparine(String heparine) {
		this.heparine = heparine;
	}

	public String getBonusDose() {
		return bonusDose;
	}

	public void setBonusDose(String bonusDose) {
		this.bonusDose = bonusDose;
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
	
	

	public String getTemp() {
		return temp;
	}
	public void setTemp(String temp) {
		this.temp = temp;
	}
   
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	
	
}
