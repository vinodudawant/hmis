package com.hms.rostermanagement.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

@Entity(name = "ehat_roster_scheduler")
public class RosterSchedulerDto {

	@Id
	@GeneratedValue
	@Column(name = "scheduler_Id")
	private int schedulerId;

	@Column(name = "schedule_stardate")
	private String scheduleStardate;
	
	@Transient
	private String SelectedDates;

	public String getSelectedDates() {
		return SelectedDates;
	}

	public void setSelectedDates(String selectedDates) {
		SelectedDates = selectedDates;
	}

	public int getSchedulerId() {
		return schedulerId;
	}

	public void setSchedulerId(int schedulerId) {
		this.schedulerId = schedulerId;
	}

	public String getScheduleStardate() {
		return scheduleStardate;
	}

	public void setScheduleStardate(String scheduleStardate) {
		this.scheduleStardate = scheduleStardate;
	}

	public String getDatechecked() {
		return datechecked;
	}

	public void setDatechecked(String datechecked) {
		this.datechecked = datechecked;
	}

	public String getResDay() {
		return resDay;
	}

	public void setResDay(String resDay) {
		this.resDay = resDay;
	}

	public String getResDate() {
		return resDate;
	}

	public void setResDate(String resDate) {
		this.resDate = resDate;
	}

	public String getMaxDuration() {
		return maxDuration;
	}

	public void setMaxDuration(String maxDuration) {
		this.maxDuration = maxDuration;
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

	@JsonGetter("scheduleDetailsList")
	public List<RosterSchedulerDto> getSchedulerList() {
		return schedulerList;
	}
     @JsonSetter("scheduleDetailsList")
	public void setSchedulerList(List<RosterSchedulerDto> schedulerList) {
		this.schedulerList = schedulerList;
	}
     

	@Column(name = "date_checked")
	private String datechecked;

	@Column(name = "days_scheduler")
	private String resDay;

	@Column(name = "date_scheduler")
	private String resDate;

	@Column(name = "max_duration")
	private String maxDuration;

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
	
	@Column(name = "name")
	private String nameSchedule;
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nameSchedule == null) ? 0 : nameSchedule.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RosterSchedulerDto other = (RosterSchedulerDto) obj;
		if (nameSchedule == null) {
			if (other.nameSchedule != null)
				return false;
		} else if (!nameSchedule.equals(other.nameSchedule))
			return false;
		return true;
	}

	public String getNameSchedule() {
		return nameSchedule;
	}

	public void setNameSchedule(String nameSchedule) {
		this.nameSchedule = nameSchedule;
	}
	@Column(name = "count_id")
	private int countid;

	public int getCountid() {
		return countid;
	}

	public void setCountid(int countid) {
		this.countid = countid;
	}
	
	


	@Transient
	private List<RosterSchedulerDto> schedulerList;

	@Override
	public String toString() {
		return "RosterSchedulerDto [schedulerId=" + schedulerId + ", scheduleStardate=" + scheduleStardate
				+ ", SelectedDates=" + SelectedDates + ", datechecked=" + datechecked + ", resDay=" + resDay
				+ ", resDate=" + resDate + ", maxDuration=" + maxDuration + ", createdBy=" + createdBy + ", updatedBy="
				+ updatedBy + ", deletedBy=" + deletedBy + ", deleted=" + deleted + ", createdDate=" + createdDate
				+ ", updatedDate=" + updatedDate + ", deletedDate=" + deletedDate + ", nameSchedule=" + nameSchedule
				+ ", countid=" + countid + ", schedulerList=" + schedulerList + "]";
	}
	
	
	
	
	
	

}
