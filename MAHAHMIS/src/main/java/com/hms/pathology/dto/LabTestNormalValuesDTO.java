package com.hms.pathology.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.ehat.dto.LabSpecialCasesDTO;

@Entity
@Table(name = "pathology_labtestnormalvalue")
public class LabTestNormalValuesDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "idtestNormalValue")
	private Integer idTestNormalValue;

	@Column(name = "lowerVal")
	private String lowerValue;

	@Column(name = "upperVal")
	private String upperValue;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "idUnitType")
	private LabUnitTypeDTO labUnit;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "id_specialcase")
	private LabSpecialCasesDTO labSpecialCasesDTO;

	@Column(name = "sexType")
	private String sex;

	@Column(name = "nvStatus")
	private String status = "Y";

	/*@Column(name = "lab_fage")
	private String fromAge;

	@Column(name = "lab_toage")
	private String toAge;*/
	
	@Column(name = "lab_fage", precision=10, scale=2)
	private BigDecimal fromAge;
	
	@Column(name = "lab_toage", precision=10, scale=2)
	private BigDecimal toAge;

	@Column(name = "lab_cl")
	private String cl;

	@Column(name = "lab_ch")
	private String ch;

	@Column(name = "age_in")
	private String ageIn;

	@Column(name = "non_exist_low")
	private String nonExistLow;
	
	@Column(name = "non_exist_high")
	private String nonExistHigh;
	
	@Column(name = "default_value")
	private String defaultValue;
	
	@Column(name = "flag")
	private String flag;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Column(name = "deleted")
	private String deleted="N";
	
	
	@CreationTimestamp
	@Column(name = "created_date", updatable = false)
	private Date createDate;

	@UpdateTimestamp
	@Column(name = "updated_date")
	private Date updatedDate;
	
	@Column(name = "expression")
	private String expression;
	
	@Column(name = "machine_Id")
	private Integer mahinevalueId;
	
	@Column(name = "machine_flag")
	private String machineFlag;
	
	@Column(name = "kitSpec_id", columnDefinition="LONGTEXT")
	private String kitSpecId;
	
	@Column(name = "testMethodwith_normal")
	private Integer testMethodIdWithNormal;
	
	@Column(name = "noteIdwith_normal", columnDefinition="LONGTEXT")
	private String noteIdwithNormal;
	
	@Column(name = "clinicalwith_normal", columnDefinition="LONGTEXT")
	private String clinicalIdWithNormal;
	
	@Column(name = "increasedidwith_normal", columnDefinition="LONGTEXT")
	private String increasedIdWithNormal;
	
	@Column(name = "interpretationwith_normal", columnDefinition="LONGTEXT")
	private String interpretationWithNormal;

	@Column(name = "biologicalReferenceWith_normal", columnDefinition="LONGTEXT")
	private String biologicalReferenceWithNormal;
	
	@Column(name = "commentswith_normal", columnDefinition="LONGTEXT")
	private String commentsWithNormal;
	@Transient
	private Integer idUnit;

	@Transient
	private Integer idSpecialCase;
	
	@Transient
	private Integer idUnitType;

	@Transient
	List<LabTestNormalValuesDTO> labTestNormalValueList;

	@Transient
	List<LabTestNormalValuesDTO> labTestNormalValueList2;
	
	@Transient
	private String male;
	@Transient
	private String female;
	@Transient
	private String others;
	@Transient
	private Integer unitId;
	@Transient
	private Integer TestId;
	@Transient
	private Integer idspecialcase;
	
	@Transient
	private String  methodName;
	
	
	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getMachineFlag() {
		return machineFlag;
	}

	public void setMachineFlag(String machineFlag) {
		this.machineFlag = machineFlag;
	}

	
	public Integer getMahinevalueId() {
		return mahinevalueId;
	}

	public void setMahinevalueId(Integer mahinevalueId) {
		this.mahinevalueId = mahinevalueId;
	}

	public Integer getIdTestNormalValue() {
		return idTestNormalValue;
	}

	public void setIdTestNormalValue(Integer idTestNormalValue) {
		this.idTestNormalValue = idTestNormalValue;
	}

	public String getLowerValue() {
		return lowerValue;
	}

	public void setLowerValue(String lowerValue) {
		this.lowerValue = lowerValue;
	}

	public String getUpperValue() {
		return upperValue;
	}

	public void setUpperValue(String upperValue) {
		this.upperValue = upperValue;
	}

	public LabUnitTypeDTO getLabUnit() {
		return labUnit;
	}

	public void setLabUnit(LabUnitTypeDTO labUnit) {
		this.labUnit = labUnit;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getFromAge() {
		return fromAge;
	}

	public void setFromAge(BigDecimal fromAge) {
		this.fromAge = fromAge;
	}

	public BigDecimal getToAge() {
		return toAge;
	}

	public void setToAge(BigDecimal toAge) {
		this.toAge = toAge;
	}

	public String getCl() {
		return cl;
	}

	public void setCl(String cl) {
		this.cl = cl;
	}

	public String getCh() {
		return ch;
	}

	public void setCh(String ch) {
		this.ch = ch;
	}

	public String getAgeIn() {
		return ageIn;
	}

	public void setAgeIn(String ageIn) {
		this.ageIn = ageIn;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	//@JsonGetter("labTestNormalValueList")
	public List<LabTestNormalValuesDTO> getLabTestNormalValueList() {
		return labTestNormalValueList;
	}

	//@JsonSetter("labTestNormalValueList")
	public void setLabTestNormalValueList(
			List<LabTestNormalValuesDTO> labTestNormalValueList) {
		this.labTestNormalValueList = labTestNormalValueList;
	}

	//@JsonGetter("labTestNormalValueList2")
	public List<LabTestNormalValuesDTO> getLabTestNormalValueList2() {
		return labTestNormalValueList2;
	}

	//@JsonSetter("labTestNormalValueList2")
	public void setLabTestNormalValueList2(
			List<LabTestNormalValuesDTO> labTestNormalValueList2) {
		this.labTestNormalValueList2 = labTestNormalValueList2;
	}

	public Integer getIdUnit() {
		return idUnit;
	}

	public void setIdUnit(Integer idUnit) {
		this.idUnit = idUnit;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public LabSpecialCasesDTO getLabSpecialCasesDTO() {
		return labSpecialCasesDTO;
	}

	public void setLabSpecialCasesDTO(LabSpecialCasesDTO labSpecialCasesDTO) {
		this.labSpecialCasesDTO = labSpecialCasesDTO;
	}

	public Integer getIdSpecialCase() {
		return idSpecialCase;
	}

	public void setIdSpecialCase(Integer idSpecialCase) {
		this.idSpecialCase = idSpecialCase;
	}

	public String getNonExistLow() {
		return nonExistLow;
	}

	public void setNonExistLow(String nonExistLow) {
		this.nonExistLow = nonExistLow;
	}

	public String getNonExistHigh() {
		return nonExistHigh;
	}

	public void setNonExistHigh(String nonExistHigh) {
		this.nonExistHigh = nonExistHigh;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}
	
	public Integer getIdspecialcase() {
		return idspecialcase;
	}

	public void setIdspecialcase(Integer idspecialcase) {
		this.idspecialcase = idspecialcase;
	}

	public String getMale() {
		return male;
	}

	public void setMale(String male) {
		this.male = male;
	}

	public String getFemale() {
		return female;
	}

	public void setFemale(String female) {
		this.female = female;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getTestId() {
		return TestId;
	}

	public void setTestId(Integer testId) {
		TestId = testId;
	}

	public String getKitSpecId() {
		return kitSpecId;
	}

	public void setKitSpecId(String kitSpecId) {
		this.kitSpecId = kitSpecId;
	}
	public Integer getTestMethodIdWithNormal() {
		return testMethodIdWithNormal;
	}

	public void setTestMethodIdWithNormal(Integer testMethodIdWithNormal) {
		this.testMethodIdWithNormal = testMethodIdWithNormal;
	}

	public String getNoteIdwithNormal() {
		return noteIdwithNormal;
	}

	public void setNoteIdwithNormal(String noteIdwithNormal) {
		this.noteIdwithNormal = noteIdwithNormal;
	}

	public String getClinicalIdWithNormal() {
		return clinicalIdWithNormal;
	}

	public void setClinicalIdWithNormal(String clinicalIdWithNormal) {
		this.clinicalIdWithNormal = clinicalIdWithNormal;
	}

	public String getIncreasedIdWithNormal() {
		return increasedIdWithNormal;
	}

	public void setIncreasedIdWithNormal(String increasedIdWithNormal) {
		this.increasedIdWithNormal = increasedIdWithNormal;
	}

	public String getInterpretationWithNormal() {
		return interpretationWithNormal;
	}

	public void setInterpretationWithNormal(String interpretationWithNormal) {
		this.interpretationWithNormal = interpretationWithNormal;
	}

	public String getCommentsWithNormal() {
		return commentsWithNormal;
	}

	public void setCommentsWithNormal(String commentsWithNormal) {
		this.commentsWithNormal = commentsWithNormal;
	}

	public String getBiologicalReferenceWithNormal() {
		return biologicalReferenceWithNormal;
	}

	public void setBiologicalReferenceWithNormal(
			String biologicalReferenceWithNormal) {
		this.biologicalReferenceWithNormal = biologicalReferenceWithNormal;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public Integer getIdUnitType() {
		return idUnitType;
	}

	public void setIdUnitType(Integer idUnitType) {
		this.idUnitType = idUnitType;
	}

	@Override
	public String toString() {
		return "LabTestNormalValuesDTO [idTestNormalValue=" + idTestNormalValue + ", lowerValue=" + lowerValue
				+ ", upperValue=" + upperValue + ", labUnit=" + labUnit + ", labSpecialCasesDTO=" + labSpecialCasesDTO
				+ ", sex=" + sex + ", status=" + status + ", fromAge=" + fromAge + ", toAge=" + toAge + ", cl=" + cl
				+ ", ch=" + ch + ", ageIn=" + ageIn + ", nonExistLow=" + nonExistLow + ", nonExistHigh=" + nonExistHigh
				+ ", defaultValue=" + defaultValue + ", flag=" + flag + ", deletedBy=" + deletedBy + ", deleted="
				+ deleted + ", createDate=" + createDate + ", updatedDate=" + updatedDate + ", expression=" + expression
				+ ", mahinevalueId=" + mahinevalueId + ", machineFlag=" + machineFlag + ", kitSpecId=" + kitSpecId
				+ ", testMethodIdWithNormal=" + testMethodIdWithNormal + ", noteIdwithNormal=" + noteIdwithNormal
				+ ", clinicalIdWithNormal=" + clinicalIdWithNormal + ", increasedIdWithNormal=" + increasedIdWithNormal
				+ ", interpretationWithNormal=" + interpretationWithNormal + ", biologicalReferenceWithNormal="
				+ biologicalReferenceWithNormal + ", commentsWithNormal=" + commentsWithNormal + ", idUnit=" + idUnit
				+ ", idSpecialCase=" + idSpecialCase + ", idUnitType=" + idUnitType + ", labTestNormalValueList="
				+ labTestNormalValueList + ", labTestNormalValueList2=" + labTestNormalValueList2 + ", male=" + male
				+ ", female=" + female + ", others=" + others + ", unitId=" + unitId + ", TestId=" + TestId
				+ ", idspecialcase=" + idspecialcase + ", methodName=" + methodName + "]";
	}

	


	
}