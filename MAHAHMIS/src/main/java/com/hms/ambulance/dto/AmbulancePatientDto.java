package com.hms.ambulance.dto;

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


@Entity
@Table(name = "ambulance_patient")
public class AmbulancePatientDto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name ="id")
	private int id;
	
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name ="patient_id")
	private int patientId;
	
	@Column(name ="requisition_no")
	private int requisitionNo; 
	
	@Column(name ="requisition_date",columnDefinition="varchar(50) default ''") 
	private String requisitionDate=""; 

	@Column(name ="mobile_no",columnDefinition="varchar(50) default ''")
	private String mobileNo="";
	
	@Column(name ="UHID_number",columnDefinition="varchar(100) default ''")
	private String uHIDNumber="";
	
	@Column(name = "patient_name",columnDefinition="varchar(200) default ''")
	private String patientName="";
	
	@Column(name = "consultant_name",columnDefinition="varchar(100) default ''")
	private String consultantName="";
	
	@Column(name = "pickup_location",columnDefinition="varchar(100) default ''")
	private String pickupLocation="";
	
	@Column(name = "drop_location",columnDefinition="varchar(100) default ''")
	private String dropLocation="";
	
	@Column(name = "purpose",columnDefinition="varchar(50) default ''")
	private String purpose="";
	
	@Column(name = "caller_number",columnDefinition="varchar(50) default ''")
	private String callerNumber="";
	
	@Column(name = "status",columnDefinition="varchar(100) default 'OPEN'")
	private String status="OPEN";
	
	@Column(name = "caller_name",columnDefinition="varchar(100) default ''")
	private String callerName="";
	
	@Column(name = "status_remark",columnDefinition="varchar(200) default ''")
	private String statusRemark="";
	
	@Column(name = "time",columnDefinition="varchar(10) default ''")
	private String time="";
	
	@Column(name = "department",columnDefinition="varchar(50) default ''")
	private String department="";
	
	@Column(name ="vehicle_name",columnDefinition="varchar(100) default ''")
	private String vehicleName="";
	
	@Column(name ="vehicle_number",columnDefinition="varchar(100) default ''")
	private String vehicleNumber="";
	
	@Column(name ="vehicle_id")
	private int vehicleId;

	@Column(name = "vehicleType_id" ,columnDefinition="int default 0")
	private Integer vehicleTypeId=0;
	
	@Column(name = "vehicle_type",columnDefinition="varchar(50) default ''")
	private String vehicleType="";
	
	@Column(name = "vehicle_status",columnDefinition="varchar(50) default ''")
	private String vehicleStatus="";
	
	@Column(name = "checklist",columnDefinition="varchar(50) default ''")
	private String checklist="";
	
	@Column(name = "driver",columnDefinition="varchar(100) default ''")
	private String driver="";
	
	@Column(name = "remark",columnDefinition="varchar(200) default ''")
	private String remark="";
	
	@Column(name = "scheduleDate",columnDefinition="varchar(25) default ''")
	private String scheduleDate="";
	
	@Column(name = "arrivalDate",columnDefinition="varchar(25) default ''")
	private String arrivalDate="";
	
	@Column(name = "dropDate",columnDefinition="varchar(25) default ''")
	private String dropDate="";
	
	@Column(name = "departureDate",columnDefinition="varchar(25) default ''")
	private String departureDate="";
	
	@Column(name = "schedule_time",columnDefinition="varchar(10) default ''")
	private String scheduleTime="";

	@Column(name = "arrival_time",columnDefinition="varchar(10) default ''")
	private String arrivalTime="";
	
	@Column(name = "drop_time",columnDefinition="varchar(10) default ''")
	private String dropTime="";
	
	@Column(name = "departure_time",columnDefinition="varchar(10) default ''")
	private String departureTime="";

	@Transient
	private List<AmbulancePatientDto> listAmbulancePatientDto;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";
	
	
	@Column(name = "is_available",columnDefinition="varchar(2) default 'Y'")
	private String isAvailable="Y";
	 

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name ="dept_id")
	private int deptId;

	@Column(name ="doctor_id")
	private int DoctorId;
	
	@Column(name ="ward_id")
	private int wardId;
	
	@Column(name ="nurse_id")
	private int NurseId;
	
	@Column(name = "doctor_name",columnDefinition="varchar(200) default ''")
	private String doctorName="";
	
	@Column(name = "nurse_name",columnDefinition="varchar(200) default ''")
	private String nurseName="";
	
	@Column(name = "ward_name",columnDefinition="varchar(200) default ''")
	private String wardName="-";
	
	@Column(name = "emergency_patient",columnDefinition="varchar(200) default 'N'")
	private String emergencyPatient="N";
	
	
	public String getEmergencyPatient() {
		return emergencyPatient;
	}

	public void setEmergencyPatient(String emergencyPatient) {
		this.emergencyPatient = emergencyPatient;
	}

	public String getIsAvailable() {
		return isAvailable; 
	}
	  
	public void setIsAvailable(String isAvailable) { 
		this.isAvailable = isAvailable; 
	}

	public String getScheduleDate() {
		return scheduleDate;
	}

	public void setScheduleDate(String scheduleDate) {
		this.scheduleDate = scheduleDate;
	}

	public String getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getDropDate() {
		return dropDate;
	}

	public void setDropDate(String dropDate) {
		this.dropDate = dropDate;
	}

	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public String getRequisitionDate() {
		return requisitionDate;
	}

	public void setRequisitionDate(String requisitionDate) {
		this.requisitionDate = requisitionDate;
	}

	public String getuHIDNumber() {
		return uHIDNumber;
	}

	public void setuHIDNumber(String uHIDNumber) {
		this.uHIDNumber = uHIDNumber;
	}

	public String getConsultantName() {
		return consultantName;
	}

	public void setConsultantName(String consultantName) {
		this.consultantName = consultantName;
	}

	public String getPickupLocation() {
		return pickupLocation;
	}

	public void setPickupLocation(String pickupLocation) {
		this.pickupLocation = pickupLocation;
	}

	public String getDropLocation() {
		return dropLocation;
	}

	public void setDropLocation(String dropLocation) {
		this.dropLocation = dropLocation;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
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

	public String getCallerName() {
		return callerName;
	}

	public void setCallerName(String callerName) {
		this.callerName = callerName;
	}

	public String getStatusRemark() {
		return statusRemark;
	}

	public void setStatusRemark(String statusRemark) {
		this.statusRemark = statusRemark;
	}

	public List<AmbulancePatientDto> getListAmbulancePatientDto() {
		return listAmbulancePatientDto;
	}

	public void setListAmbulancePatientDto(List<AmbulancePatientDto> listAmbulancePatientDto) {
		this.listAmbulancePatientDto = listAmbulancePatientDto;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	
	public int getRequisitionNo() {
		return requisitionNo;
	}

	public void setRequisitionNo(int requisitionNo) {
		this.requisitionNo = requisitionNo;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public int getDoctorId() {
		return DoctorId;
	}

	public void setDoctorId(int doctorId) {
		DoctorId = doctorId;
	}

	public int getWardId() {
		return wardId;
	}

	public void setWardId(int wardId) {
		this.wardId = wardId;
	}

	public int getNurseId() {
		return NurseId;
	}

	public void setNurseId(int nurseId) {
		NurseId = nurseId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getNurseName() {
		return nurseName;
	}

	public void setNurseName(String nurseName) {
		this.nurseName = nurseName;
	}

	public String getCallerNumber() {
		return callerNumber;
	}

	public void setCallerNumber(String callerNumber) {
		this.callerNumber = callerNumber;
	}

	public String getVehicleName() {
		return vehicleName;
	}

	public void setVehicleName(String vehicleName) {
		this.vehicleName = vehicleName;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}
	
	public int getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(int vehicleId) {
		this.vehicleId = vehicleId;
	}

	public Integer getVehicleTypeId() {
		return vehicleTypeId;
	}

	public void setVehicleTypeId(Integer vehicleTypeId) {
		this.vehicleTypeId = vehicleTypeId;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getVehicleStatus() {
		return vehicleStatus;
	}

	public void setVehicleStatus(String vehicleStatus) {
		this.vehicleStatus = vehicleStatus;
	}

	public String getChecklist() {
		return checklist;
	}

	public void setChecklist(String checklist) {
		this.checklist = checklist;
	}

	public String getDriver() {
		return driver;
	}

	public void setDriver(String driver) {
		this.driver = driver;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getScheduleTime() {
		return scheduleTime;
	}

	public void setScheduleTime(String scheduleTime) {
		this.scheduleTime = scheduleTime;
	}

	public String getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getDropTime() {
		return dropTime;
	}

	public void setDropTime(String dropTime) {
		this.dropTime = dropTime;
	}

	public String getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}
	

}
