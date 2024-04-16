package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class ComplaintsDTO {

	private Integer idcomplaintMaser;
	private String subject;
	private String priority;
	private String rateOfInc;
	private String urgentFlag;
	private String DateOfRaise;
	private String ticketStatus;
	private Integer loginUserId;
	private String loginUserName;
	private String Status;
	private String comment;
	private String Date;
	private String Time;
	private String commentType;
	private String department;
	private List<ComplaintsDTO> ComplaintSlaveDTO;
	private List<ComplaintsDTO> complaintSlaveList;
	private List<ComplaintsDTO> complaintMasterList;
	private List<ComplaintsDTO> ComplaintsDTOList;
	
	private String maintenanceLoginUserName;


	@JsonGetter("idcomplaintMaser")
	public Integer getIdcomplaintMaser() {
		return idcomplaintMaser;
	}

	@JsonSetter("idcomplaintMaser")
	public void setIdcomplaintMaser(Integer idcomplaintMaser) {
		this.idcomplaintMaser = idcomplaintMaser;
	}

	@JsonGetter("subject")
	public String getSubject() {
		return subject;
	}

	@JsonSetter("subject")
	public void setSubject(String subject) {
		this.subject = subject;
	}

	@JsonGetter("priority")
	public String getPriority() {
		return priority;
	}

	@JsonSetter("priority")
	public void setPriority(String priority) {
		this.priority = priority;
	}

	@JsonGetter("DateOfRaise")
	public String getDateOfRaise() {
		return DateOfRaise;
	}

	@JsonSetter("DateOfRaise")
	public void setDateOfRaise(String dateOfRaise) {
		DateOfRaise = dateOfRaise;
	}

	@JsonGetter("ticketStatus")
	public String getTicketStatus() {
		return ticketStatus;
	}

	@JsonSetter("ticketStatus")
	public void setTicketStatus(String ticketStatus) {
		this.ticketStatus = ticketStatus;
	}

	@JsonGetter("loginUserId")
	public Integer getLoginUserId() {
		return loginUserId;
	}

	@JsonSetter("loginUserId")
	public void setLoginUserId(Integer loginUserId) {
		this.loginUserId = loginUserId;
	}

	@JsonGetter("loginUserName")
	public String getLoginUserName() {
		return loginUserName;
	}

	@JsonSetter("loginUserName")
	public void setLoginUserName(String loginUserName) {
		this.loginUserName = loginUserName;
	}

	@JsonGetter("Status")
	public String getStatus() {
		return Status;
	}

	@JsonSetter("Status")
	public void setStatus(String status) {
		this.Status = status;
	}

	@JsonGetter("comment")
	public String getComment() {
		return comment;
	}

	@JsonSetter("comment")
	public void setComment(String comment) {
		this.comment = comment;
	}

	@JsonGetter("Date")
	public String getDate() {
		return Date;
	}

	@JsonSetter("Date")
	public void setDate(String date) {
		Date = date;
	}

	@JsonGetter("commentType")
	public String getCommentType() {
		return commentType;
	}

	@JsonSetter("commentType")
	public void setCommentType(String commentType) {
		this.commentType = commentType;
	}

	@JsonGetter("Time")
	public String getTime() {
		return Time;
	}

	@JsonSetter("Time")
	public void setTime(String time) {
		Time = time;
	}

	@JsonGetter("rateOfInc")
	public String getRateOfInc() {
		return rateOfInc;
	}

	@JsonSetter("rateOfInc")
	public void setRateOfInc(String rateOfInc) {
		this.rateOfInc = rateOfInc;
	}

	@JsonGetter("urgentFlag")
	public String getUrgentFlag() {
		return urgentFlag;
	}

	@JsonSetter("urgentFlag")
	public void setUrgentFlag(String urgentFlag) {
		this.urgentFlag = urgentFlag;
	}

	@JsonGetter("department")
	public String getDepartment() {
		return department;
	}

	@JsonSetter("department")
	public void setDepartment(String department) {
		this.department = department;
	}
	
	@JsonGetter("ComplaintSlaveDTO")
	public List<ComplaintsDTO> getComplaintSlaveDTO() {
		return ComplaintSlaveDTO;
	}

	@JsonSetter("ComplaintSlaveDTO")
	public void setComplaintSlaveDTO(List<ComplaintsDTO> complaintSlaveDTO) {
		ComplaintSlaveDTO = complaintSlaveDTO;
	}

	@JsonGetter("complaintSlaveList")
	public List<ComplaintsDTO> getComplaintSlaveList() {
		return complaintSlaveList;
	}

	@JsonSetter("complaintSlaveList")
	public void setComplaintSlaveList(List<ComplaintsDTO> complaintSlaveList) {
		this.complaintSlaveList = complaintSlaveList;
	}

	@JsonGetter("complaintMasterList")
	public List<ComplaintsDTO> getComplaintMasterList() {
		return complaintMasterList;
	}

	@JsonSetter("complaintMasterList")
	public void setComplaintMasterList(List<ComplaintsDTO> complaintMasterList) {
		this.complaintMasterList = complaintMasterList;
	}

	@JsonGetter("ComplaintsDTOList")
	public List<ComplaintsDTO> getComplaintsDTOList() {
		return ComplaintsDTOList;
	}

	@JsonSetter("ComplaintsDTOList")
	public void setComplaintsDTOList(List<ComplaintsDTO> complaintsDTOList) {
		ComplaintsDTOList = complaintsDTOList;
	}
	
	@JsonGetter("maintenanceLoginUserName")
	public String getMaintenanceLoginUserName() {
		return maintenanceLoginUserName;
	}
	
	@JsonSetter("maintenanceLoginUserName")
	public void setMaintenanceLoginUserName(String maintenanceLoginUserName) {
		this.maintenanceLoginUserName = maintenanceLoginUserName;
	}
}