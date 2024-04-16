package com.hms.dto;

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
import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hms.administrator.dto.UserAccessModuleDto;

/*@Entity
@Table(name = "ehat_reasonofvisit_details")*/
public class district_taluka_city implements Serializable {
	/*
	 * 
	 * private static final long serialVersionUID = 1L;
	 * 
	 * 
	 * @Id
	 * 
	 * @GeneratedValue
	 * 
	 * @Column(name = "idehat_reasonofvisit_details") private Integer
	 * ReasonOfVisit_ID;
	 * 
	 * @Column(name = "reasonofvisit_name") private String ReasonOfVisit_Name;
	 * 
	 * @Transient private Integer moduleId;
	 * 
	 * @Column(name = "unit_id") private Integer unitId;
	 * 
	 * @Column(name = "status", length = 2) private String deleteStatus = "Y";
	 * 
	 * @Column(name = "created_By") private Integer createdBy;
	 * 
	 * @Column(name = "updated_By") private Integer updatedBy;
	 * 
	 * @Column(name = "deleted_By") private Integer deletedBy;
	 * 
	 * @CreationTimestamp
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "created_Date_Time", updatable = false) private Date
	 * createDate;
	 * 
	 * @UpdateTimestamp
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "updated_Date_Time") private Date updatedDate;
	 * 
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "deleted_Date_Time") private Date deletedDate;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name ="module_id") private UserAccessModuleDto
	 * userAccessModuleDto;
	 * 
	 * public Integer getUnitId() { return unitId; }
	 * 
	 * public void setUnitId(Integer unitId) { this.unitId = unitId; }
	 * 
	 * public String getDeleteStatus() { return deleteStatus; }
	 * 
	 * public void setDeleteStatus(String deleteStatus) { this.deleteStatus =
	 * deleteStatus; }
	 * 
	 * public Integer getCreatedBy() { return createdBy; }
	 * 
	 * public void setCreatedBy(Integer createdBy) { this.createdBy = createdBy; }
	 * 
	 * public Integer getUpdatedBy() { return updatedBy; }
	 * 
	 * public void setUpdatedBy(Integer updatedBy) { this.updatedBy = updatedBy; }
	 * 
	 * public Integer getDeletedBy() { return deletedBy; }
	 * 
	 * public void setDeletedBy(Integer deletedBy) { this.deletedBy = deletedBy; }
	 * 
	 * public Date getCreateDate() { return createDate; }
	 * 
	 * public void setCreateDate(Date createDate) { this.createDate = createDate; }
	 * 
	 * public Date getUpdatedDate() { return updatedDate; }
	 * 
	 * public void setUpdatedDate(Date updatedDate) { this.updatedDate =
	 * updatedDate; }
	 * 
	 * public Date getDeletedDate() { return deletedDate; }
	 * 
	 * public void setDeletedDate(Date deletedDate) { this.deletedDate =
	 * deletedDate; }
	 * 
	 * 
	 * @Transient private List<district_taluka_city> ReasonOfVisitDetails;
	 * 
	 * 
	 * @Transient private Integer district_ID;
	 * 
	 * @Transient private String districtName;
	 * 
	 * @Transient private List<district_taluka_city> districtList;
	 * 
	 * @Transient private Integer taluka_ID;
	 * 
	 * @Transient private String talukaName;
	 * 
	 * @Transient private List<district_taluka_city> talukaList;
	 * 
	 * @Transient private Integer city_ID;
	 * 
	 * @Transient private String cityName;
	 * 
	 * @Transient private List<district_taluka_city> cityList;
	 * 
	 * @Transient private Integer state_ID;
	 * 
	 * @Transient private String stateName;
	 * 
	 * @Transient private List<district_taluka_city> stateList;
	 * 
	 * @Transient private String moduleName;
	 * 
	 * 
	 * public district_taluka_city() {
	 * 
	 * }
	 * 
	 * public Integer getModuleId() { return moduleId; }
	 * 
	 * public void setModuleId(Integer moduleId) { this.moduleId = moduleId; }
	 * 
	 * public String getModuleName() { return moduleName; }
	 * 
	 * public void setModuleName(String moduleName) { this.moduleName = moduleName;
	 * }
	 * 
	 * @JsonGetter("district_id") public Integer getdistrict_ID() { return
	 * district_ID; }
	 * 
	 * public UserAccessModuleDto getUserAccessModuleDto() { return
	 * userAccessModuleDto; }
	 * 
	 * public void setUserAccessModuleDto(UserAccessModuleDto userAccessModuleDto) {
	 * this.userAccessModuleDto = userAccessModuleDto; }
	 * 
	 * @JsonSetter("district_id") public void setdistrict_ID(Integer district_ID) {
	 * this.district_ID = district_ID; }
	 * 
	 * @JsonGetter("district_name") public String getdistrictName() { return
	 * districtName; }
	 * 
	 * @JsonSetter("district_name") public void setdistrictName(String districtName)
	 * { this.districtName = districtName; }
	 * 
	 * @JsonSetter("districtList") public void
	 * setdistrictList(List<district_taluka_city> districtList) { this.districtList
	 * = districtList; }
	 * 
	 * @JsonGetter("districtList") public List<district_taluka_city>
	 * getdistrictList() { return districtList; }
	 * 
	 * @JsonGetter("taluka_id") public Integer gettaluka_ID() { return taluka_ID; }
	 * 
	 * @JsonSetter("taluka_id") public void settaluka_ID(Integer taluka_ID) {
	 * this.taluka_ID = taluka_ID; }
	 * 
	 * @JsonGetter("taluka_name") public String gettalukaName() { return talukaName;
	 * }
	 * 
	 * @JsonSetter("taluka_name") public void settalukaName(String talukaName) {
	 * this.talukaName = talukaName; }
	 * 
	 * @JsonSetter("talukaList") public void
	 * settalukaList(List<district_taluka_city> talukaList) { this.talukaList =
	 * talukaList; }
	 * 
	 * @JsonGetter("talukaList") public List<district_taluka_city> gettalukaList() {
	 * return talukaList; }
	 * 
	 * @JsonGetter("city_id") public Integer getcity_ID() { return city_ID; }
	 * 
	 * @JsonSetter("city_id") public void setcity_ID(Integer city_id) { this.city_ID
	 * = city_id; }
	 * 
	 * @JsonGetter("city_name") public String getcityName() { return cityName; }
	 * 
	 * @JsonSetter("city_name") public void setcityName(String cityName) {
	 * this.cityName = cityName; }
	 * 
	 * @JsonSetter("cityList") public void setcityList(List<district_taluka_city>
	 * cityList) { this.cityList = cityList; }
	 * 
	 * @JsonGetter("cityList") public List<district_taluka_city> getcityList() {
	 * return cityList; }
	 * 
	 * @JsonGetter("state_id") public Integer getstate_ID() { return state_ID; }
	 * 
	 * @JsonSetter("state_id") public void setstate_ID(Integer state_ID) {
	 * this.state_ID = state_ID; }
	 * 
	 * @JsonGetter("state_name") public String getstateName() { return stateName; }
	 * 
	 * @JsonSetter("state_name") public void setstateName(String stateName) {
	 * this.stateName = stateName; }
	 * 
	 * @JsonSetter("stateList") public void setstateList(List<district_taluka_city>
	 * stateList) { this.stateList = stateList; }
	 * 
	 * @JsonGetter("stateList") public List<district_taluka_city> getstateList() {
	 * return stateList; }
	 * 
	 * 
	 * @JsonGetter("ReasonOfVisit_id") public Integer getreasonOfVisit_ID() { return
	 * ReasonOfVisit_ID; }
	 * 
	 * @JsonSetter("ReasonOfVisit_id") public void setreasonOfVisit_ID(Integer
	 * reasonOfVisit_ID) { this.ReasonOfVisit_ID = reasonOfVisit_ID; }
	 * 
	 * @JsonGetter("ReasonOfVisit") public String getreasonOfVisit() { return
	 * ReasonOfVisit_Name; }
	 * 
	 * @JsonSetter("ReasonOfVisit") public void setreasonOfVisit(String
	 * reasonOfVisit_Name) { this.ReasonOfVisit_Name = reasonOfVisit_Name; }
	 * 
	 * 
	 * @JsonSetter("ReasonOfVisitDetails") public void
	 * setReasonOfVisitDetails(List<district_taluka_city> ReasonOfVisitDetails) {
	 * this.ReasonOfVisitDetails = ReasonOfVisitDetails; }
	 * 
	 * @JsonGetter("ReasonOfVisitDetails") public List<district_taluka_city>
	 * getReasonOfVisitDetails() { return ReasonOfVisitDetails; }
	 * 
	 * 
	 * @Override public String toString() { return
	 * "district_taluka_city [ReasonOfVisit_ID=" + ReasonOfVisit_ID +
	 * ", ReasonOfVisit_Name=" + ReasonOfVisit_Name + ", moduleId=" + moduleId +
	 * ", unitId=" + unitId + ", deleteStatus=" + deleteStatus + ", createdBy=" +
	 * createdBy + ", updatedBy=" + updatedBy + ", deletedBy=" + deletedBy +
	 * ", createDate=" + createDate + ", updatedDate=" + updatedDate +
	 * ", deletedDate=" + deletedDate + ", userAccessModuleDto=" +
	 * userAccessModuleDto + ", ReasonOfVisitDetails=" + ReasonOfVisitDetails +
	 * ", district_ID=" + district_ID + ", districtName=" + districtName +
	 * ", districtList=" + districtList + ", taluka_ID=" + taluka_ID +
	 * ", talukaName=" + talukaName + ", talukaList=" + talukaList + ", city_ID=" +
	 * city_ID + ", cityName=" + cityName + ", cityList=" + cityList + ", state_ID="
	 * + state_ID + ", stateName=" + stateName + ", stateList=" + stateList +
	 * ", moduleName=" + moduleName + "]"; }
	 */}