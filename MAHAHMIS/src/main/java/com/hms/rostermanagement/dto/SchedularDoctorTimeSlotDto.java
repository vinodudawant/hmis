package com.hms.rostermanagement.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.rostermanagement.dto.SchedulerRoomMasterDto;

@Entity 
@Table(name = "schedular_doctor_timeslot")
public class SchedularDoctorTimeSlotDto {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idschedular_doctor_timeslot")
	private Integer idschedularDoctorTimeSlot;
	
	@Column(name = "Doctor_ID")
	private Integer Doctor_ID;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "slot_duration")
	private Integer duration;
	
	@Column(name = "color")
	private String color;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "sun_mor_start")
	private String sunMorningStart;
	
	@Column(name = "mon_mor_start")
	private String monMorningStart;
	
	@Column(name = "tue_mor_start")
	private String tueMorningStart;
	
	@Column(name = "wed_mor_start")
	private String wedMorningStart;
	
	@Column(name = "thi_mor_start")
	private String thiMorningStart;
	
	@Column(name = "fri_mor_start")
	private String friMorningStart;
	
	@Column(name = "sat_mor_start")
	private String satMorningStart;
	
	@Column(name = "sun_mor_end")
	private String sunMorningEnd;
	@Column(name = "mon_mor_end")
	private String monMorningEnd;
	@Column(name = "tue_mor_end")
	private String tueMorningEnd;
	@Column(name = "wed_mor_end")
	private String wedMorningEnd;
	@Column(name = "thi_mor_end")
	private String thiMorningEnd;
	@Column(name = "fri_mor_end")
	private String friMorningEnd;
	@Column(name = "sat_mor_end")
	private String satMorningEnd;
	
	@Column(name = "sun_mor_room")
	private String sunMorningRoom;
	@Column(name = "mon_mor_room")
	private String monMorningRoom;
	@Column(name = "tue_mor_room")
	private String tueMorningRoom;
	@Column(name = "wed_mor_room")
	private String wedMorningRoom;
	@Column(name = "thu_mor_room")
	private String thuMorningRoom;
	@Column(name = "fri_mor_room")
	private String friMorningRoom;
	@Column(name = "sat_mor_room")
	private String satMorningRoom;

	@Column(name = "sun_aft_start")
	private String sunAfternoonStart;
	@Column(name = "mon_aft_start")
	private String monAfternoonStart;
	@Column(name = "tue_aft_start")
	private String tueAfternoonStart;
	@Column(name = "wed_aft_start")
	private String wedAfternoonStart;
	@Column(name = "thi_aft_start")
	private String thiAfternoonStart;
	@Column(name = "fri_aft_start")
	private String friAfternoonStart;
	@Column(name = "sat_aft_start")
	private String satAfternoonStart;
	
	@Column(name = "sun_aft_end")
	private String sunAfternoonEnd;
	@Column(name = "mon_aft_end")
	private String monAfternoonEnd;
	@Column(name = "tue_aft_end")
	private String tueAfternoonEnd;
	@Column(name = "wed_aft_end")
	private String wedAfternoonEnd;
	@Column(name = "thi_aft_end")
	private String thiAfternoonEnd;
	@Column(name = "fri_aft_end")
	private String friAfternoonEnd;
	@Column(name = "sat_aft_end")
	private String satAfternoonEnd;
	
	@Column(name = "sun_aft_room")
	private String sunAfternoonRoom;
	@Column(name = "mon_aft_room")
	private String monAfternoonRoom;
	@Column(name = "tue_aft_room")
	private String tueAfternoonRoom;
	@Column(name = "wed_aft_room")
	private String wedAfternoonRoom;
	@Column(name = "thu_aft_room")
	private String thuAfternoonRoom;
	@Column(name = "fri_aft_room")
	private String friAfternoonRoom;
	@Column(name = "sat_aft_room")
	private String satAfternoonRoom;
	
	@Column(name = "sun_eve_start")
	private String sunEverningStart;
	@Column(name = "mon_eve_start")
	private String monEverningStart;
	@Column(name = "tue_eve_start")
	private String tueEverningStart;
	@Column(name = "wed_eve_start")
	private String wedEverningStart;
	@Column(name = "thi_eve_start")
	private String thiEverningStart;
	@Column(name = "fri_eve_start")
	private String friEverningStart;
	@Column(name = "sat_eve_start")
	private String satEverningStart;
	
	@Column(name = "sun_eve_end")
	private String sunEverningEnd;
	@Column(name = "mon_eve_end")
	private String monEverningEnd;
	@Column(name = "tue_eve_end")
	private String tueEverningEnd;
	@Column(name = "wed_eve_end")
	private String wedEverningEnd;
	@Column(name = "thi_eve_end")
	private String thiEverningEnd;
	@Column(name = "fri_eve_end")
	private String friEverningEnd;
	@Column(name = "sat_eve_end")
	private String satEverningEnd;
	
	@Column(name = "sun_eve_room")
	private String sunEverningRoom;
	@Column(name = "mon_eve_room")
	private String monEverningRoom;
	@Column(name = "tue_eve_room")
	private String tueEverningRoom;
	@Column(name = "wed_eve_room")
	private String wedEverningRoom;
	@Column(name = "thu_eve_room")
	private String thuEverningRoom;
	@Column(name = "fri_eve_room")
	private String friEverningRoom;
	@Column(name = "sat_eve_room")
	private String satEverningRoom;
	
	@Column(name="specializationId")
	private Integer specializationId=0;
	
	@Transient
	private List<NA> listDoctorNA;
	
	@Transient
	private List<NA> listForDoctorAvailable;
	
	@Transient
	private List<SchedularDoctorTimeSlotDto> listSchedularDoctorTimeSlotDto;
	
	@JsonGetter("sunMorningRoom")
	public String getSunMorningRoom() {
		return sunMorningRoom;
	}
	@JsonSetter("sunMorningRoom")
	public void setSunMorningRoom(String sunMorningRoom) {
		this.sunMorningRoom = sunMorningRoom;
	}
	@JsonGetter("monMorningRoom")
	public String getMonMorningRoom() {
		return monMorningRoom;
	}
	@JsonSetter("monMorningRoom")
	public void setMonMorningRoom(String monMorningRoom) {
		this.monMorningRoom = monMorningRoom;
	}
	@JsonGetter("tueMorningRoom")
	public String getTueMorningRoom() {
		return tueMorningRoom;
	}
	@JsonSetter("tueMorningRoom")
	public void setTueMorningRoom(String tueMorningRoom) {
		this.tueMorningRoom = tueMorningRoom;
	}
	@JsonGetter("wedMorningRoom")
	public String getWedMorningRoom() {
		return wedMorningRoom;
	}
	@JsonSetter("wedMorningRoom")
	public void setWedMorningRoom(String wedMorningRoom) {
		this.wedMorningRoom = wedMorningRoom;
	}
	@JsonGetter("thuMorningRoom")
	public String getThuMorningRoom() {
		return thuMorningRoom;
	}
	@JsonSetter("thuMorningRoom")
	public void setThuMorningRoom(String thuMorningRoom) {
		this.thuMorningRoom = thuMorningRoom;
	}
	@JsonGetter("friMorningRoom")
	public String getFriMorningRoom() {
		return friMorningRoom;
	}
	@JsonSetter("friMorningRoom")
	public void setFriMorningRoom(String friMorningRoom) {
		this.friMorningRoom = friMorningRoom;
	}
	@JsonGetter("satMorningRoom")
	public String getSatMorningRoom() {
		return satMorningRoom;
	}
	@JsonSetter("satMorningRoom")
	public void setSatMorningRoom(String satMorningRoom) {
		this.satMorningRoom = satMorningRoom;
	}
	@JsonGetter("sunAfternoonRoom")
	public String getSunAfternoonRoom() {
		return sunAfternoonRoom;
	}
	@JsonSetter("sunAfternoonRoom")
	public void setSunAfternoonRoom(String sunAfternoonRoom) {
		this.sunAfternoonRoom = sunAfternoonRoom;
	}
	@JsonGetter("monAfternoonRoom")
	public String getMonAfternoonRoom() {
		return monAfternoonRoom;
	}
	@JsonSetter("monAfternoonRoom")
	public void setMonAfternoonRoom(String monAfternoonRoom) {
		this.monAfternoonRoom = monAfternoonRoom;
	}
	@JsonGetter("tueAfternoonRoom")
	public String getTueAfternoonRoom() {
		return tueAfternoonRoom;
	}
	@JsonSetter("tueAfternoonRoom")
	public void setTueAfternoonRoom(String tueAfternoonRoom) {
		this.tueAfternoonRoom = tueAfternoonRoom;
	}
	@JsonGetter("wedAfternoonRoom")
	public String getWedAfternoonRoom() {
		return wedAfternoonRoom;
	}
	@JsonSetter("wedAfternoonRoom")
	public void setWedAfternoonRoom(String wedAfternoonRoom) {
		this.wedAfternoonRoom = wedAfternoonRoom;
	}
	@JsonGetter("thuAfternoonRoom")
	public String getThuAfternoonRoom() {
		return thuAfternoonRoom;
	}
	@JsonSetter("thuAfternoonRoom")
	public void setThuAfternoonRoom(String thuAfternoonRoom) {
		this.thuAfternoonRoom = thuAfternoonRoom;
	}
	@JsonGetter("friAfternoonRoom")
	public String getFriAfternoonRoom() {
		return friAfternoonRoom;
	}
	@JsonSetter("friAfternoonRoom")
	public void setFriAfternoonRoom(String friAfternoonRoom) {
		this.friAfternoonRoom = friAfternoonRoom;
	}
	@JsonGetter("satAfternoonRoom")
	public String getSatAfternoonRoom() {
		return satAfternoonRoom;
	}
	@JsonSetter("satAfternoonRoom")
	public void setSatAfternoonRoom(String satAfternoonRoom) {
		this.satAfternoonRoom = satAfternoonRoom;
	}
	@JsonGetter("sunEverningRoom")
	public String getSunEverningRoom() {
		return sunEverningRoom;
	}
	@JsonSetter("sunEverningRoom")
	public void setSunEverningRoom(String sunEverningRoom) {
		this.sunEverningRoom = sunEverningRoom;
	}
	@JsonGetter("monEverningRoom")
	public String getMonEverningRoom() {
		return monEverningRoom;
	}
	@JsonSetter("monEverningRoom")
	public void setMonEverningRoom(String monEverningRoom) {
		this.monEverningRoom = monEverningRoom;
	}
	@JsonGetter("tueEverningRoom")
	public String getTueEverningRoom() {
		return tueEverningRoom;
	}
	@JsonSetter("tueEverningRoom")
	public void setTueEverningRoom(String tueEverningRoom) {
		this.tueEverningRoom = tueEverningRoom;
	}
	@JsonGetter("wedEverningRoom")
	public String getWedEverningRoom() {
		return wedEverningRoom;
	}
	@JsonSetter("wedEverningRoom")
	public void setWedEverningRoom(String wedEverningRoom) {
		this.wedEverningRoom = wedEverningRoom;
	}
	@JsonGetter("thuEverningRoom")
	public String getThuEverningRoom() {
		return thuEverningRoom;
	}
	@JsonSetter("thuEverningRoom")
	public void setThuEverningRoom(String thuEverningRoom) {
		this.thuEverningRoom = thuEverningRoom;
	}
	@JsonGetter("friEverningRoom")
	public String getFriEverningRoom() {
		return friEverningRoom;
	}
	@JsonSetter("friEverningRoom")
	public void setFriEverningRoom(String friEverningRoom) {
		this.friEverningRoom = friEverningRoom;
	}
	@JsonGetter("satEverningRoom")
	public String getSatEverningRoom() {
		return satEverningRoom;
	}
	@JsonSetter("satEverningRoom")
	public void setSatEverningRoom(String satEverningRoom) {
		this.satEverningRoom = satEverningRoom;
	}
	
	@JsonGetter("di")
	public Integer getDoctor_ID() {
		return Doctor_ID;
	}
	@JsonSetter("di")
	public void setDoctor_ID(Integer doctor_ID) {
		Doctor_ID = doctor_ID;
	}
	
	@JsonGetter("duration")
	public Integer getDuration() {
		return duration;
	}
	@JsonSetter("duration")
	public void setDuration(Integer duration) {
		this.duration = duration;
	}
	
	@JsonGetter("color")
	public String getColor() {
		return color;
	}
	
	@JsonSetter("color")
	public void setColor(String color) {
		this.color = color;
	}
	
	@JsonGetter("sunMorningStart")
	public String getSunMorningStart() {
		return sunMorningStart;
	}
	@JsonSetter("sunMorningStart")
	public void setSunMorningStart(String sunMorningStart) {
		this.sunMorningStart = sunMorningStart;
	}
	
	@JsonGetter("monMorningStart")
	public String getMonMorningStart() {
		return monMorningStart;
	}
	@JsonSetter("monMorningStart")
	public void setMonMorningStart(String monMorningStart) {
		this.monMorningStart = monMorningStart;
	}
	
	@JsonGetter("tueMorningStart")
	public String getTueMorningStart() {
		return tueMorningStart;
	}
	@JsonSetter("tueMorningStart")
	public void setTueMorningStart(String tueMorningStart) {
		this.tueMorningStart = tueMorningStart;
	}
	
	@JsonGetter("wedMorningStart")
	public String getWedMorningStart() {
		return wedMorningStart;
	}
	@JsonSetter("wedMorningStart")
	public void setWedMorningStart(String wedMorningStart) {
		this.wedMorningStart = wedMorningStart;
	}
	
	@JsonGetter("thiMorningStart")
	public String getThiMorningStart() {
		return thiMorningStart;
	}
	@JsonSetter("thiMorningStart")
	public void setThiMorningStart(String thiMorningStart) {
		this.thiMorningStart = thiMorningStart;
	}
	
	@JsonGetter("friMorningStart")
	public String getFriMorningStart() {
		return friMorningStart;
	}
	@JsonSetter("friMorningStart")
	public void setFriMorningStart(String friMorningStart) {
		this.friMorningStart = friMorningStart;
	}
	
	@JsonGetter("satMorningStart")
	public String getSatMorningStart() {
		return satMorningStart;
	}
	@JsonSetter("satMorningStart")
	public void setSatMorningStart(String satMorningStart) {
		this.satMorningStart = satMorningStart;
	}
	
	@JsonGetter("sunMorningEnd")
	public String getSunMorningEnd() {
		return sunMorningEnd;
	}
	@JsonSetter("sunMorningEnd")
	public void setSunMorningEnd(String sunMorningEnd) {
		this.sunMorningEnd = sunMorningEnd;
	}
	
	@JsonGetter("monMorningEnd")
	public String getMonMorningEnd() {
		return monMorningEnd;
	}
	@JsonSetter("monMorningEnd")
	public void setMonMorningEnd(String monMorningEnd) {
		this.monMorningEnd = monMorningEnd;
	}
	
	@JsonGetter("tueMorningEnd")
	public String getTueMorningEnd() {
		return tueMorningEnd;
	}
	@JsonSetter("tueMorningEnd")
	public void setTueMorningEnd(String tueMorningEnd) {
		this.tueMorningEnd = tueMorningEnd;
	}
	
	@JsonGetter("wedMorningEnd")
	public String getWedMorningEnd() {
		return wedMorningEnd;
	}
	@JsonSetter("wedMorningEnd")
	public void setWedMorningEnd(String wedMorningEnd) {
		this.wedMorningEnd = wedMorningEnd;
	}
	
	@JsonGetter("thiMorningEnd")
	public String getThiMorningEnd() {
		return thiMorningEnd;
	}
	@JsonSetter("thiMorningEnd")
	public void setThiMorningEnd(String thiMorningEnd) {
		this.thiMorningEnd = thiMorningEnd;
	}
	
	@JsonGetter("friMorningEnd")
	public String getFriMorningEnd() {
		return friMorningEnd;
	}
	@JsonSetter("friMorningEnd")
	public void setFriMorningEnd(String friMorningEnd) {
		this.friMorningEnd = friMorningEnd;
	}
	
	@JsonGetter("satMorningEnd")
	public String getSatMorningEnd() {
		return satMorningEnd;
	}
	@JsonSetter("satMorningEnd")
	public void setSatMorningEnd(String satMorningEnd) {
		this.satMorningEnd = satMorningEnd;
	}
	
	@JsonGetter("sunAfternoonStart")
	public String getSunAfternoonStart() {
		return sunAfternoonStart;
	}
	@JsonSetter("sunAfternoonStart")
	public void setSunAfternoonStart(String sunAfternoonStart) {
		this.sunAfternoonStart = sunAfternoonStart;
	}
	
	@JsonGetter("monAfternoonStart")
	public String getMonAfternoonStart() {
		return monAfternoonStart;
	}
	@JsonSetter("monAfternoonStart")
	public void setMonAfternoonStart(String monAfternoonStart) {
		this.monAfternoonStart = monAfternoonStart;
	}
	
	@JsonGetter("tueAfternoonStart")
	public String getTueAfternoonStart() {
		return tueAfternoonStart;
	}
	@JsonSetter("tueAfternoonStart")
	public void setTueAfternoonStart(String tueAfternoonStart) {
		this.tueAfternoonStart = tueAfternoonStart;
	}
	
	@JsonGetter("wedAfternoonStart")
	public String getWedAfternoonStart() {
		return wedAfternoonStart;
	}
	@JsonSetter("wedAfternoonStart")
	public void setWedAfternoonStart(String wedAfternoonStart) {
		this.wedAfternoonStart = wedAfternoonStart;
	}
	
	@JsonGetter("thiAfternoonStart")
	public String getThiAfternoonStart() {
		return thiAfternoonStart;
	}
	@JsonSetter("thiAfternoonStart")
	public void setThiAfternoonStart(String thiAfternoonStart) {
		this.thiAfternoonStart = thiAfternoonStart;
	}
	
	@JsonGetter("friAfternoonStart")
	public String getFriAfternoonStart() {
		return friAfternoonStart;
	}
	@JsonSetter("friAfternoonStart")
	public void setFriAfternoonStart(String friAfternoonStart) {
		this.friAfternoonStart = friAfternoonStart;
	}
	
	@JsonGetter("satAfternoonStart")
	public String getSatAfternoonStart() {
		return satAfternoonStart;
	}
	@JsonSetter("satAfternoonStart")
	public void setSatAfternoonStart(String satAfternoonStart) {
		this.satAfternoonStart = satAfternoonStart;
	}
	
	@JsonGetter("sunAfternoonEnd")
	public String getSunAfternoonEnd() {
		return sunAfternoonEnd;
	}
	@JsonSetter("sunAfternoonEnd")
	public void setSunAfternoonEnd(String sunAfternoonEnd) {
		this.sunAfternoonEnd = sunAfternoonEnd;
	}
	
	@JsonGetter("monAfternoonEnd")
	public String getMonAfternoonEnd() {
		return monAfternoonEnd;
	}
	@JsonSetter("monAfternoonEnd")
	public void setMonAfternoonEnd(String monAfternoonEnd) {
		this.monAfternoonEnd = monAfternoonEnd;
	}
	
	@JsonGetter("tueAfternoonEnd")
	public String getTueAfternoonEnd() {
		return tueAfternoonEnd;
	}
	@JsonSetter("tueAfternoonEnd")
	public void setTueAfternoonEnd(String tueAfternoonEnd) {
		this.tueAfternoonEnd = tueAfternoonEnd;
	}
	
	@JsonGetter("wedAfternoonEnd")
	public String getWedAfternoonEnd() {
		return wedAfternoonEnd;
	}
	@JsonSetter("wedAfternoonEnd")
	public void setWedAfternoonEnd(String wedAfternoonEnd) {
		this.wedAfternoonEnd = wedAfternoonEnd;
	}
	
	@JsonGetter("thiAfternoonEnd")
	public String getThiAfternoonEnd() {
		return thiAfternoonEnd;
	}
	@JsonSetter("thiAfternoonEnd")
	public void setThiAfternoonEnd(String thiAfternoonEnd) {
		this.thiAfternoonEnd = thiAfternoonEnd;
	}
	
	@JsonGetter("friAfternoonEnd")
	public String getFriAfternoonEnd() {
		return friAfternoonEnd;
	}
	@JsonSetter("friAfternoonEnd")
	public void setFriAfternoonEnd(String friAfternoonEnd) {
		this.friAfternoonEnd = friAfternoonEnd;
	}
	
	@JsonGetter("satAfternoonEnd")
	public String getSatAfternoonEnd() {
		return satAfternoonEnd;
	}
	@JsonSetter("satAfternoonEnd")
	public void setSatAfternoonEnd(String satAfternoonEnd) {
		this.satAfternoonEnd = satAfternoonEnd;
	}
	
	@JsonGetter("sunEverningStart")
	public String getSunEverningStart() {
		return sunEverningStart;
	}
	@JsonSetter("sunEverningStart")
	public void setSunEverningStart(String sunEverningStart) {
		this.sunEverningStart = sunEverningStart;
	}
	
	@JsonGetter("monEverningStart")
	public String getMonEverningStart() {
		return monEverningStart;
	}
	@JsonSetter("monEverningStart")
	public void setMonEverningStart(String monEverningStart) {
		this.monEverningStart = monEverningStart;
	}
	
	@JsonGetter("tueEverningStart")
	public String getTueEverningStart() {
		return tueEverningStart;
	}
	@JsonSetter("tueEverningStart")
	public void setTueEverningStart(String tueEverningStart) {
		this.tueEverningStart = tueEverningStart;
	}
	
	@JsonGetter("wedEverningStart")
	public String getWedEverningStart() {
		return wedEverningStart;
	}
	@JsonSetter("wedEverningStart")
	public void setWedEverningStart(String wedEverningStart) {
		this.wedEverningStart = wedEverningStart;
	}
	
	@JsonGetter("thiEverningStart")
	public String getThiEverningStart() {
		return thiEverningStart;
	}
	@JsonSetter("thiEverningStart")
	public void setThiEverningStart(String thiEverningStart) {
		this.thiEverningStart = thiEverningStart;
	}
	
	@JsonGetter("friEverningStart")
	public String getFriEverningStart() {
		return friEverningStart;
	}
	@JsonSetter("friEverningStart")
	public void setFriEverningStart(String friEverningStart) {
		this.friEverningStart = friEverningStart;
	}
	
	@JsonGetter("satEverningStart")
	public String getSatEverningStart() {
		return satEverningStart;
	}
	@JsonSetter("satEverningStart")
	public void setSatEverningStart(String satEverningStart) {
		this.satEverningStart = satEverningStart;
	}
	
	@JsonGetter("sunEverningEnd")
	public String getSunEverningEnd() {
		return sunEverningEnd;
	}
	@JsonSetter("sunEverningEnd")
	public void setSunEverningEnd(String sunEverningEnd) {
		this.sunEverningEnd = sunEverningEnd;
	}
	
	@JsonGetter("monEverningEnd")
	public String getMonEverningEnd() {
		return monEverningEnd;
	}
	@JsonSetter("monEverningEnd")
	public void setMonEverningEnd(String monEverningEnd) {
		this.monEverningEnd = monEverningEnd;
	}
	
	@JsonGetter("tueEverningEnd")
	public String getTueEverningEnd() {
		return tueEverningEnd;
	}
	@JsonSetter("tueEverningEnd")
	public void setTueEverningEnd(String tueEverningEnd) {
		this.tueEverningEnd = tueEverningEnd;
	}
	
	@JsonGetter("wedEverningEnd")
	public String getWedEverningEnd() {
		return wedEverningEnd;
	}
	@JsonSetter("wedEverningEnd")
	public void setWedEverningEnd(String wedEverningEnd) {
		this.wedEverningEnd = wedEverningEnd;
	}
	
	@JsonGetter("thiEverningEnd")
	public String getThiEverningEnd() {
		return thiEverningEnd;
	}
	@JsonSetter("thiEverningEnd")
	public void setThiEverningEnd(String thiEverningEnd) {
		this.thiEverningEnd = thiEverningEnd;
	}
	
	@JsonGetter("friEverningEnd")
	public String getFriEverningEnd() {
		return friEverningEnd;
	}
	@JsonSetter("friEverningEnd")
	public void setFriEverningEnd(String friEverningEnd) {
		this.friEverningEnd = friEverningEnd;
	}
	
	@JsonGetter("satEverningEnd")
	public String getSatEverningEnd() {
		return satEverningEnd;
	}
	@JsonSetter("satEverningEnd")
	public void setSatEverningEnd(String satEverningEnd) {
		this.satEverningEnd = satEverningEnd;
	}
	@JsonGetter("liNA")
	public List<NA> getListDoctorNA() {
		return listDoctorNA;
	}
	@JsonSetter("liNA")
	public void setListDoctorNA(List<NA> listDoctorNA) {
		this.listDoctorNA = listDoctorNA;
	}
	@JsonGetter("listForDoctorAvailable")
	public List<NA> getListForDoctorAvailable() {
		return listForDoctorAvailable;
	}
	@JsonSetter("listForDoctorAvailable")
	public void setListForDoctorAvailable(List<NA> listForDoctorAvailable) {
		this.listForDoctorAvailable = listForDoctorAvailable;
	}
	@JsonGetter("idschedularDoctorTimeSlot")
	public Integer getIdschedularDoctorTimeSlot() {
		return idschedularDoctorTimeSlot;
	}
	@JsonSetter("idschedularDoctorTimeSlot")
	public void setIdschedularDoctorTimeSlot(Integer idschedularDoctorTimeSlot) {
		this.idschedularDoctorTimeSlot = idschedularDoctorTimeSlot;
	}
	@JsonGetter("status")
	public String getStatus() {
		return status;
	}
	@JsonSetter("status")
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public List<SchedularDoctorTimeSlotDto> getListSchedularDoctorTimeSlotDto() {
		return listSchedularDoctorTimeSlotDto;
	}
	public void setListSchedularDoctorTimeSlotDto(
			List<SchedularDoctorTimeSlotDto> listSchedularDoctorTimeSlotDto) {
		this.listSchedularDoctorTimeSlotDto = listSchedularDoctorTimeSlotDto;
	}
	public Integer getSpecializationId() {
		return specializationId;
	}
	public void setSpecializationId(Integer specializationId) {
		this.specializationId = specializationId;
	}
	
	
}
