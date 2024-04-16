package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.dto.Doctor;

@Entity
@Table(name = "operation_team_master")
public class OperationTeam implements Serializable {


	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idoperation_team_master")
	private Integer teamId;

	@Column(name = "name")
	private String teamName;

	@Column(name = "status")
	private String status;

	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "idoperation_team_master", referencedColumnName = "idoperation_team_master")
	@JsonIgnore
	private List<OperationTeamSlave> ltSlave;
	
	@Transient
	private List<OperationTeam> listTeam;
	
	@Transient
	private List<OperationTeamSlave> listTeamSlave;
	
	@Transient
	private List<Doctor> doclist;
	
	@JsonGetter("teamid")
	public Integer getTeamId() {
		return teamId;
	}

	@JsonSetter("teamid")
	public void setTeamId(Integer teamId) {
		this.teamId = teamId;
	}

	@JsonGetter("teamNm")
	public String getTeamName() {
		return teamName;
	}

	@JsonSetter("teamNm")
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	@JsonGetter("liTeam")
	public List<OperationTeam> getListTeam() {
		return listTeam;
	}

	@JsonSetter("liTeam")
	public void setListTeam(List<OperationTeam> listTeam) {
		this.listTeam = listTeam;
	}

	@JsonGetter("st")
	public String getStatus() {
		return status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("ul")
	public List<OperationTeamSlave> getLtSlave() {
		return ltSlave;
	}

	@JsonSetter("ul")
	public void setLtSlave(List<OperationTeamSlave> ltSlave) {
		this.ltSlave = ltSlave;
	}

	public List<Doctor> getDoclist() {
		return doclist;
	}

	public void setDoclist(List<Doctor> doclist) {
		this.doclist = doclist;
	}

	public List<OperationTeamSlave> getListTeamSlave() {
		return listTeamSlave;
	}

	public void setListTeamSlave(List<OperationTeamSlave> listTeamSlave) {
		this.listTeamSlave = listTeamSlave;
	}
	
	
	
	
}
