package com.hms.dto;

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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="discharge_summery")
public class DischargeSummery implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "iddischarge_summery")
	private int iddischarge_summery;
	
	@Column(name = "Treatment_ID",columnDefinition="int default 0")
	private int treatment_ID;
	
	@Column(name = "diagnosis",columnDefinition="varchar(200) default ''")
	private String diagnosis;

	@Column(name = "risk",columnDefinition="varchar(200) default ''")
	private String risk;
	
	@Column(name = "complications",columnDefinition="varchar(200) default ''")
	private String complications;
	
	@Column(name = "pre_symptoms",columnDefinition="varchar(200) default ''")
	private String pre_symptoms;
	
	@Column(name = "clinical_finding",columnDefinition="varchar(200) default ''")
	private String clinical_finding;
	
	@Column(name = "spl_investigation",columnDefinition="varchar(200) default ''")
	private String spl_investigation;
	
	@Column(name = "treatment_given",columnDefinition="varchar(200) default ''")
	private String treatment_given;
	
	@Column(name = "conditionAtDischarge",columnDefinition="varchar(200) default ''")
	private String conditionAtDischarge;
	
	@Column(name = "treatment_advised",columnDefinition="varchar(200) default ''")
	private String treatment_advised;
	
	/*
	 * @Column(name = "medicine_given",columnDefinition="varchar(200) default ''")
	 * private String medicine_given;
	 */
	
	
	
	@Column(name = "discharge_date",columnDefinition="varchar(200) default ''")
	private String discharge_date;
	
	
	@Column(name = "discharge_time",columnDefinition="varchar(200) default ''")
	private String discharge_time;
	
	@Column(name = "discharge_type",columnDefinition="varchar(200) default ''")
	private String discharge_type;
	
	@Column(name = "narration",columnDefinition="varchar(200) default ''")
	private String narrration;
	
	@Column(name = "primaryCauseOfDeath",columnDefinition="varchar(200) default ''")
	private String primaryCOD;
	
	@Column(name = "secondaryCauseOfDeath",columnDefinition="varchar(200) default ''")
    private String secondaryCOD;
	
	@Column(name = "significantConditionOfDeath",columnDefinition="varchar(200) default ''")
    private String significantCondition;
	
	@Column(name = "advisedOnDischarge",columnDefinition="varchar(200) default ''")
    private String advisedOnDischarge;
	
	@Column(name = "user_id",columnDefinition="int default 1")
	private int userId=1;
    

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by",updatable=true)
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time",updatable=true)
	private Date updatedDateTime;
	
	
	@Column(name = "medicine_given",columnDefinition="varchar(200) default ''")
	private String treatmentGiven;
	
	@Column(name = "investigation",columnDefinition="varchar(200) default ''")
	private String investigation;
	
	@Column(name = "inchargeDr",columnDefinition="varchar(200) default ''")
	private String inchargeDr;
	
	
	@Column(name = "paed_dept",columnDefinition="varchar(200) default ''")
	private String paed_dept;
	
;

	@Column(name = "investigation_item",columnDefinition="varchar(200) default ''")
	private String investigationItem;
	
	@Column(name = "causality_service_item",columnDefinition="varchar(200) default ''")
	private String causalityItem;
	
	@Column(name = "dental_item",columnDefinition="varchar(200) default ''")
	private String dentalItem;
	
	@Column(name = "pathology_item",columnDefinition="varchar(200) default ''")
	private String pathologyItem;
	
	@Column(name = "physiotherapy_item",columnDefinition="varchar(200) default ''")
	private String physiotherapyItem;

	@Column(name = "idCustomizeTemplate",columnDefinition="varchar(200) default ''")
	private String idCustomizeTemplate;
	
	@Column(name = "templateData",columnDefinition="varchar(200) default ''")
	private String templateData;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	@Transient
	private List<DischargeSummery> dsList;

	@Transient
	private List<Test> trTest;

	@Transient
	private List<TreatmentTests> objTrtList;

	@Transient
	private PaediatricDept paediatricDept;
	
	@Transient
	private PaediatricDeptNICU paediatricDeptNicu;
	

	public int getIddischarge_summery() {
		return iddischarge_summery;
	}

	public int getTreatment_ID() {
		return treatment_ID;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public String getRisk() {
		return risk;
	}

	public String getComplications() {
		return complications;
	}

	public String getPre_symptoms() {
		return pre_symptoms;
	}

	public String getClinical_finding() {
		return clinical_finding;
	}

	public String getSpl_investigation() {
		return spl_investigation;
	}


	public String getConditionAtDischarge() {
		return conditionAtDischarge;
	}
	
	

	public String getTreatment_given() {
		return treatment_given;
	}

	public void setTreatment_given(String treatment_given) {
		this.treatment_given = treatment_given;
	}

	public String getTreatment_advised() {
		return treatment_advised;
	}

	/*
	 * public String getMedicine_given() { return medicine_given; }
	 */

	public String getDischarge_date() {
		return discharge_date;
	}

	public String getDischarge_time() {
		return discharge_time;
	}

	public String getDischarge_type() {
		return discharge_type;
	}

	public String getNarrration() {
		return narrration;
	}

	public String getPrimaryCOD() {
		return primaryCOD;
	}

	public String getSecondaryCOD() {
		return secondaryCOD;
	}

	public String getSignificantCondition() {
		return significantCondition;
	}

	public String getAdvisedOnDischarge() {
		return advisedOnDischarge;
	}

	public int getUserId() {
		return userId;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	

	public String getInvestigation() {
		return investigation;
	}

	public String getInchargeDr() {
		return inchargeDr;
	}

	public String getPaed_dept() {
		return paed_dept;
	}

	public String getInvestigationItem() {
		return investigationItem;
	}

	public String getCausalityItem() {
		return causalityItem;
	}

	public String getDentalItem() {
		return dentalItem;
	}

	public String getPathologyItem() {
		return pathologyItem;
	}

	public String getPhysiotherapyItem() {
		return physiotherapyItem;
	}

	public String getIdCustomizeTemplate() {
		return idCustomizeTemplate;
	}

	public String getTemplateData() {
		return templateData;
	}

	public int getUnitId() {
		return unitId;
	}

	public List<DischargeSummery> getDsList() {
		return dsList;
	}

	public List<Test> getTrTest() {
		return trTest;
	}

	public List<TreatmentTests> getObjTrtList() {
		return objTrtList;
	}

	

	

	public void setIddischarge_summery(int iddischarge_summery) {
		this.iddischarge_summery = iddischarge_summery;
	}

	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public void setRisk(String risk) {
		this.risk = risk;
	}

	public void setComplications(String complications) {
		this.complications = complications;
	}

	public void setPre_symptoms(String pre_symptoms) {
		this.pre_symptoms = pre_symptoms;
	}

	public void setClinical_finding(String clinical_finding) {
		this.clinical_finding = clinical_finding;
	}

	public void setSpl_investigation(String spl_investigation) {
		this.spl_investigation = spl_investigation;
	}

	
	public void setConditionAtDischarge(String conditionAtDischarge) {
		this.conditionAtDischarge = conditionAtDischarge;
	}

	public void setTreatment_advised(String treatment_advised) {
		this.treatment_advised = treatment_advised;
	}

	/*
	 * public void setMedicine_given(String medicine_given) { this.medicine_given =
	 * medicine_given; }
	 */

	public void setDischarge_date(String discharge_date) {
		this.discharge_date = discharge_date;
	}

	public void setDischarge_time(String discharge_time) {
		this.discharge_time = discharge_time;
	}

	public void setDischarge_type(String discharge_type) {
		this.discharge_type = discharge_type;
	}

	public void setNarrration(String narrration) {
		this.narrration = narrration;
	}

	public void setPrimaryCOD(String primaryCOD) {
		this.primaryCOD = primaryCOD;
	}

	public void setSecondaryCOD(String secondaryCOD) {
		this.secondaryCOD = secondaryCOD;
	}

	public void setSignificantCondition(String significantCondition) {
		this.significantCondition = significantCondition;
	}

	public void setAdvisedOnDischarge(String advisedOnDischarge) {
		this.advisedOnDischarge = advisedOnDischarge;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	
	

	public String getTreatmentGiven() {
		return treatmentGiven;
	}

	public void setTreatmentGiven(String treatmentGiven) {
		this.treatmentGiven = treatmentGiven;
	}

	public void setInvestigation(String investigation) {
		this.investigation = investigation;
	}

	public void setInchargeDr(String inchargeDr) {
		this.inchargeDr = inchargeDr;
	}

	public void setPaed_dept(String paed_dept) {
		this.paed_dept = paed_dept;
	}

	public void setInvestigationItem(String investigationItem) {
		this.investigationItem = investigationItem;
	}

	public void setCausalityItem(String causalityItem) {
		this.causalityItem = causalityItem;
	}

	public void setDentalItem(String dentalItem) {
		this.dentalItem = dentalItem;
	}

	public void setPathologyItem(String pathologyItem) {
		this.pathologyItem = pathologyItem;
	}

	public void setPhysiotherapyItem(String physiotherapyItem) {
		this.physiotherapyItem = physiotherapyItem;
	}

	public void setIdCustomizeTemplate(String idCustomizeTemplate) {
		this.idCustomizeTemplate = idCustomizeTemplate;
	}

	public void setTemplateData(String templateData) {
		this.templateData = templateData;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public void setDsList(List<DischargeSummery> dsList) {
		this.dsList = dsList;
	}

	public void setTrTest(List<Test> trTest) {
		this.trTest = trTest;
	}

	public void setObjTrtList(List<TreatmentTests> objTrtList) {
		this.objTrtList = objTrtList;
	}

	

	public PaediatricDept getPaediatricDept() {
		return paediatricDept;
	}

	public void setPaediatricDept(PaediatricDept paediatricDept) {
		this.paediatricDept = paediatricDept;
	}

	public PaediatricDeptNICU getPaediatricDeptNicu() {
		return paediatricDeptNicu;
	}

	public void setPaediatricDeptNicu(PaediatricDeptNICU paediatricDeptNicu) {
		this.paediatricDeptNicu = paediatricDeptNicu;
	}

	
	
	

}
