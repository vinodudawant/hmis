package com.hms.ambulance.dto;

import java.util.Date;
import java.util.List;

public class AmbulancePatientInfo {
	
	private int id;
	
	private int patient_id;
	
	private int requisition_no; 
	
	private String requisition_date; 

	private String mobile_no;
	
	private String UHID_number;
	
	private String patient_name;
	
	private String consultant_name;
	
	private String pickup_location;
	
	private String drop_location;
	
	private String purpose;
	
	private String caller_number;
	
	private String status;
	
	private String caller_name;
	
	private String status_remark;
	
	private String time;
	
	private String department;
	
	private String vehicle_name;
	
	private String vehicle_number;
	
	private int vehicle_id;

	private int vehicleType_id;
	
	private String vehicle_type;
	
	private String vehicle_status;
	
	private String checklist;
	
	private String driver;
	
	private String remark;
	
	private String scheduleDate;
	
	private String arrivalDate;
	
	private String dropDate;
	
	private String departureDate;

	private List<AmbulancePatientInfo> listAmbulancePatientInfo;

	private Integer created_by;

	private Integer updated_by;
	
	private Date created_date_time;

	private Date updated_date_time;

	private String deleted="N";

	private Integer deleted_by;

	private Date delete_date_time;
	
	private Integer unit_id;
	
	private int dept_id;

	private int doctor_id;
	
	private int ward_id;
	
	private int nurse_id;
	
	private String doctor_name="";
	
	private String nurse_name="";
	
	private String ward_name="";
	
	private String emergency_patient;

	private String schedule_time="";
	
	private String arrival_time="";
	
	private String drop_time="";
	
	private String departure_time="";
	
	private String is_available;
	
	
	public String getEmergency_patient() {
		return emergency_patient;
	}

	public void setEmergency_patient(String emergency_patient) {
		this.emergency_patient = emergency_patient;
	}
	
	public String getWard_name() {
		return ward_name;
	}

	public void setWard_name(String ward_name) {
		this.ward_name = ward_name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}

	public int getRequisition_no() {
		return requisition_no;
	}

	public void setRequisition_no(int requisition_no) {
		this.requisition_no = requisition_no;
	}

	public String getMobile_no() {
		return mobile_no;
	}

	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}

	public String getUHID_number() {
		return UHID_number;
	}

	public void setUHID_number(String uHID_number) {
		UHID_number = uHID_number;
	}

	public String getPatient_name() {
		return patient_name;
	}

	public void setPatient_name(String patient_name) {
		this.patient_name = patient_name;
	}

	public String getConsultant_name() {
		return consultant_name;
	}

	public void setConsultant_name(String consultant_name) {
		this.consultant_name = consultant_name;
	}

	public String getPickup_location() {
		return pickup_location;
	}

	public void setPickup_location(String pickup_location) {
		this.pickup_location = pickup_location;
	}

	public String getDrop_location() {
		return drop_location;
	}

	public void setDrop_location(String drop_location) {
		this.drop_location = drop_location;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getCaller_number() {
		return caller_number;
	}

	public void setCaller_number(String caller_number) {
		this.caller_number = caller_number;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCaller_name() {
		return caller_name;
	}

	public void setCaller_name(String caller_name) {
		this.caller_name = caller_name;
	}

	public String getStatus_remark() {
		return status_remark;
	}

	public void setStatus_remark(String status_remark) {
		this.status_remark = status_remark;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getCreated_by() {
		return created_by;
	}

	public void setCreated_by(Integer created_by) {
		this.created_by = created_by;
	}

	public Integer getUpdated_by() {
		return updated_by;
	}

	public void setUpdated_by(Integer updated_by) {
		this.updated_by = updated_by;
	}

	public Date getCreated_date_time() {
		return created_date_time;
	}

	public void setCreated_date_time(Date created_date_time) {
		this.created_date_time = created_date_time;
	}

	public Date getUpdated_date_time() {
		return updated_date_time;
	}

	public void setUpdated_date_time(Date updated_date_time) {
		this.updated_date_time = updated_date_time;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Integer getDeleted_by() {
		return deleted_by;
	}

	public void setDeleted_by(Integer deleted_by) {
		this.deleted_by = deleted_by;
	}

	public Date getDelete_date_time() {
		return delete_date_time;
	}

	public void setDelete_date_time(Date delete_date_time) {
		this.delete_date_time = delete_date_time;
	}

	public Integer getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(Integer unit_id) {
		this.unit_id = unit_id;
	}

	public int getDept_id() {
		return dept_id;
	}

	public void setDept_id(int dept_id) {
		this.dept_id = dept_id;
	}

	public int getDoctor_id() {
		return doctor_id;
	}

	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}

	public int getWard_id() {
		return ward_id;
	}

	public void setWard_id(int ward_id) {
		this.ward_id = ward_id;
	}

	public int getNurse_id() {
		return nurse_id;
	}

	public void setNurse_id(int nurse_id) {
		this.nurse_id = nurse_id;
	}

	public String getDoctor_name() {
		return doctor_name;
	}

	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}

	public String getNurse_name() {
		return nurse_name;
	}

	public void setNurse_name(String nurse_name) {
		this.nurse_name = nurse_name;
	}
	
	public List<AmbulancePatientInfo> getListAmbulancePatientInfo() {
		return listAmbulancePatientInfo;
	}

	public void setListAmbulancePatientInfo(List<AmbulancePatientInfo> listAmbulancePatientInfo) {
		this.listAmbulancePatientInfo = listAmbulancePatientInfo;
	}
	
	public String getVehicle_name() {
		return vehicle_name;
	}

	public void setVehicle_name(String vehicle_name) {
		this.vehicle_name = vehicle_name;
	}

	public String getVehicle_number() {
		return vehicle_number;
	}

	public void setVehicle_number(String vehicle_number) {
		this.vehicle_number = vehicle_number;
	}

	public int getVehicle_id() {
		return vehicle_id;
	}

	public void setVehicle_id(int vehicle_id) {
		this.vehicle_id = vehicle_id;
	}

	public int getVehicleType_id() {
		return vehicleType_id;
	}

	public void setVehicleType_id(int vehicleType_id) {
		this.vehicleType_id = vehicleType_id;
	}

	public String getVehicle_type() {
		return vehicle_type;
	}

	public void setVehicle_type(String vehicle_type) {
		this.vehicle_type = vehicle_type;
	}

	public String getVehicle_status() {
		return vehicle_status;
	}

	public void setVehicle_status(String vehicle_status) {
		this.vehicle_status = vehicle_status;
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

	public String getSchedule_time() {
		return schedule_time;
	}

	public void setSchedule_time(String schedule_time) {
		this.schedule_time = schedule_time;
	}

	public String getArrival_time() {
		return arrival_time;
	}

	public void setArrival_time(String arrival_time) {
		this.arrival_time = arrival_time;
	}

	public String getDrop_time() {
		return drop_time;
	}

	public void setDrop_time(String drop_time) {
		this.drop_time = drop_time;
	}

	public String getDeparture_time() {
		return departure_time;
	}

	public void setDeparture_time(String departure_time) {
		this.departure_time = departure_time;
	}

	public String getRequisition_date() {
		return requisition_date;
	}

	public void setRequisition_date(String requisition_date) {
		this.requisition_date = requisition_date;
	}

	
	  public String getIs_available() { return is_available; }
	  
	  public void setIs_available(String is_available) { this.is_available =
	  is_available; }
	 
	
	
	
	
}
