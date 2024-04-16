package com.hms.ipd.nurshing.dto;

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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.dto.OTVitalMasterDto;
import com.hms.dto.OTVitalSlave;
import com.hms.ot.dto.Operation;

@Entity
@Table(name = "chart_report")
public class ChartReportDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name = "treatment_id")
	int treatmentId;

	@Column(name = "am8",columnDefinition="varchar(40) default ''")
	private String am8;
	
	@Column(name = "am9",columnDefinition="varchar(40) default ''")
	private String am9;
	
	@Column(name = "am10",columnDefinition="varchar(40) default ''")
	private String am10;
	
	@Column(name = "am11",columnDefinition="varchar(40) default ''")
	private String am11;
	
	@Column(name = "am12",columnDefinition="varchar(40) default ''")
	private String am12;
	
	@Column(name = "am1",columnDefinition="varchar(40) default ''")
	private String am1;
	
	@Column(name = "am2",columnDefinition="varchar(40) default ''")
	private String am2;
	
	@Column(name = "am3",columnDefinition="varchar(40) default ''")
	private String am3;
	
	@Column(name = "am4",columnDefinition="varchar(40) default ''")
	private String am4;
	
	@Column(name = "am5",columnDefinition="varchar(40) default ''")
	private String am5;
	
	@Column(name = "am6",columnDefinition="varchar(40) default ''")
	private String am6;
	
	@Column(name = "am7",columnDefinition="varchar(40) default ''")
	private String am7;
	
	@Column(name = "pm8",columnDefinition="varchar(40) default ''")
	private String pm8;
	
	@Column(name = "pm9",columnDefinition="varchar(40) default ''")
	private String pm9;
	
	@Column(name = "pm10",columnDefinition="varchar(40) default ''")
	private String pm10;
	
	@Column(name = "pm11",columnDefinition="varchar(40) default ''")
	private String pm11;
	
	@Column(name = "pm12",columnDefinition="varchar(40) default ''")
	private String pm12;
	
	@Column(name = "pm1",columnDefinition="varchar(40) default ''")
	private String pm1;
	
	@Column(name = "pm2",columnDefinition="varchar(40) default ''")
	private String pm2;
	
	@Column(name = "pm3",columnDefinition="varchar(40) default ''")
	private String pm3;
	
	@Column(name = "pm4",columnDefinition="varchar(40) default ''")
	private String pm4;
	
	@Column(name = "pm5",columnDefinition="varchar(40) default ''")
	private String pm5;
	
	@Column(name = "pm6",columnDefinition="varchar(40) default ''")
	private String pm6;
	
	@Column(name = "pm7",columnDefinition="varchar(40) default ''")
	private String pm7;
	
	@Column(name = "status",columnDefinition="varchar(2) default 'Y'")
	private String status;
	
	
	@Column(name = "time",columnDefinition="varchar(20) default ''")
	private String time;
	
	@Column(name = "input",columnDefinition="varchar(20) default ''")
	private String input;
	
	@Column(name = "output",columnDefinition="varchar(20) default ''")
	private String output;
	
	@Column(name = "sign",columnDefinition="int default 0")
	private int sign=0;
	
	@Column(name = "chart_charge",columnDefinition="varchar(20) default ''")
	private String chartCharge;
	
	@Column(name = "post_meal",columnDefinition="varchar(20) default ''")
	private String postMeal;
	
	
	
	@Column(name = "chart_id",columnDefinition="int default 0")
	private int chartId=0;
	
	@Column(name = "idchart_slave",columnDefinition="int default 0")
	private int idchartSlave=0;
	
	@Column(name = "vital_id",columnDefinition="int default 0")
	private int vitalId=0;
	
	@Column(name = "date",columnDefinition="varchar(20) default ''")
	private String dateVital;
	
	@Column(name = "cname",columnDefinition="varchar(100) default ''")
	private String cname;
	
	@Column(name = "user_name",columnDefinition="varchar(100) default ''")
	private String userName;

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
	
	@Transient
	List<ChartReportDTO>  lstChartReport;
	
	@Transient
	OTVitalMasterDto  lstOTvitalmasterdto;
	
	@Transient
	OTVitalSlave  lstOTvitalslavedto;
	
	@Transient
	List<Operation> OtSlaveList;

	
	public List<Operation> getOtSlaveList() {
		return OtSlaveList;
	}

	public void setOtSlaveList(List<Operation> otSlaveList) {
		OtSlaveList = otSlaveList;
	}

	public OTVitalMasterDto getLstOTvitalmasterdto() {
		return lstOTvitalmasterdto;
	}

	public void setLstOTvitalmasterdto(OTVitalMasterDto lstOTvitalmasterdto) {
		this.lstOTvitalmasterdto = lstOTvitalmasterdto;
	}

	public OTVitalSlave getLstOTvitalslavedto() {
		return lstOTvitalslavedto;
	}

	public void setLstOTvitalslavedto(OTVitalSlave lstOTvitalslavedto) {
		this.lstOTvitalslavedto = lstOTvitalslavedto;
	}

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

	public String getAm8() {
		return am8;
	}

	public void setAm8(String am8) {
		this.am8 = am8;
	}

	public String getAm9() {
		return am9;
	}

	public void setAm9(String am9) {
		this.am9 = am9;
	}

	public String getAm10() {
		return am10;
	}

	public void setAm10(String am10) {
		this.am10 = am10;
	}

	public String getAm11() {
		return am11;
	}

	public void setAm11(String am11) {
		this.am11 = am11;
	}

	public String getAm12() {
		return am12;
	}

	public void setAm12(String am12) {
		this.am12 = am12;
	}

	public String getAm1() {
		return am1;
	}

	public void setAm1(String am1) {
		this.am1 = am1;
	}

	public String getAm2() {
		return am2;
	}

	public void setAm2(String am2) {
		this.am2 = am2;
	}

	public String getAm3() {
		return am3;
	}

	public void setAm3(String am3) {
		this.am3 = am3;
	}

	public String getAm4() {
		return am4;
	}

	public void setAm4(String am4) {
		this.am4 = am4;
	}

	public String getAm5() {
		return am5;
	}

	public void setAm5(String am5) {
		this.am5 = am5;
	}

	public String getAm6() {
		return am6;
	}

	public void setAm6(String am6) {
		this.am6 = am6;
	}

	public String getAm7() {
		return am7;
	}

	public void setAm7(String am7) {
		this.am7 = am7;
	}

	public String getPm8() {
		return pm8;
	}

	public void setPm8(String pm8) {
		this.pm8 = pm8;
	}

	public String getPm9() {
		return pm9;
	}

	public void setPm9(String pm9) {
		this.pm9 = pm9;
	}

	public String getPm10() {
		return pm10;
	}

	public void setPm10(String pm10) {
		this.pm10 = pm10;
	}

	public String getPm11() {
		return pm11;
	}

	public void setPm11(String pm11) {
		this.pm11 = pm11;
	}

	public String getPm12() {
		return pm12;
	}

	public void setPm12(String pm12) {
		this.pm12 = pm12;
	}

	public String getPm1() {
		return pm1;
	}

	public void setPm1(String pm1) {
		this.pm1 = pm1;
	}

	public String getPm2() {
		return pm2;
	}

	public void setPm2(String pm2) {
		this.pm2 = pm2;
	}

	public String getPm3() {
		return pm3;
	}

	public void setPm3(String pm3) {
		this.pm3 = pm3;
	}

	public String getPm4() {
		return pm4;
	}

	public void setPm4(String pm4) {
		this.pm4 = pm4;
	}

	public String getPm5() {
		return pm5;
	}

	public void setPm5(String pm5) {
		this.pm5 = pm5;
	}

	public String getPm6() {
		return pm6;
	}

	public void setPm6(String pm6) {
		this.pm6 = pm6;
	}

	public String getPm7() {
		return pm7;
	}

	public void setPm7(String pm7) {
		this.pm7 = pm7;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	public int getSign() {
		return sign;
	}

	public void setSign(int sign) {
		this.sign = sign;
	}

	public String getChartCharge() {
		return chartCharge;
	}

	public void setChartCharge(String chartCharge) {
		this.chartCharge = chartCharge;
	}

	public String getPostMeal() {
		return postMeal;
	}

	public void setPostMeal(String postMeal) {
		this.postMeal = postMeal;
	}

	public int getChartId() {
		return chartId;
	}

	public void setChartId(int chartId) {
		this.chartId = chartId;
	}

	public int getIdchartSlave() {
		return idchartSlave;
	}

	public void setIdchartSlave(int idchartSlave) {
		this.idchartSlave = idchartSlave;
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

	public List<ChartReportDTO> getLstChartReport() {
		return lstChartReport;
	}

	public void setLstChartReport(List<ChartReportDTO> lstChartReport) {
		this.lstChartReport = lstChartReport;
	}

	public int getVitalId() {
		return vitalId;
	}

	public void setVitalId(int vitalId) {
		this.vitalId = vitalId;
	}

	public String getDateVital() {
		return dateVital;
	}

	public void setDateVital(String dateVital) {
		this.dateVital = dateVital;
	}

	/**
	 * @return the cname
	 */
	public String getCname() {
		return cname;
	}

	/**
	 * @param cname the cname to set
	 */
	public void setCname(String cname) {
		this.cname = cname;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "ChartReportDTO [id=" + id + ", treatmentId=" + treatmentId + ", am8=" + am8 + ", am9=" + am9 + ", am10="
				+ am10 + ", am11=" + am11 + ", am12=" + am12 + ", am1=" + am1 + ", am2=" + am2 + ", am3=" + am3
				+ ", am4=" + am4 + ", am5=" + am5 + ", am6=" + am6 + ", am7=" + am7 + ", pm8=" + pm8 + ", pm9=" + pm9
				+ ", pm10=" + pm10 + ", pm11=" + pm11 + ", pm12=" + pm12 + ", pm1=" + pm1 + ", pm2=" + pm2 + ", pm3="
				+ pm3 + ", pm4=" + pm4 + ", pm5=" + pm5 + ", pm6=" + pm6 + ", pm7=" + pm7 + ", status=" + status
				+ ", time=" + time + ", input=" + input + ", output=" + output + ", sign=" + sign + ", chartCharge="
				+ chartCharge + ", postMeal=" + postMeal + ", chartId=" + chartId + ", idchartSlave=" + idchartSlave
				+ ", vitalId=" + vitalId + ", dateVital=" + dateVital + ", cname=" + cname + ", userName=" + userName
				+ ", createdDateTime=" + createdDateTime + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deleted=" + deleted + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy
				+ ", deletedDateTime=" + deletedDateTime + ", unitId=" + unitId + ", userId=" + userId
				+ ", lstChartReport=" + lstChartReport + "]";
	}

	
	
	
	
	
	
	
	
}
