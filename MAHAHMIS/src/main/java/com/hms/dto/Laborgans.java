package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class Laborgans implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * This attribute maps to the column idlabOrgans in the laborgans table.
	 */
	protected int idlabOrgans;

	/**
	 * This attribute maps to the column organName in the laborgans table.
	 */
	protected String organName;

	/**
	 * This attribute maps to the column orgStatus in the laborgans table.
	 */
	protected String orgStatus;

	private List<Laborgans> laborgansList;

	@JsonGetter("lbOrgLi")
	public List<Laborgans> getLaborgansList() {
		return laborgansList;
	}

	public void setLaborgansList(List<Laborgans> laborgansList) {
		this.laborgansList = laborgansList;
	}

	/**
	 * Method 'getIdlabOrgans'
	 * 
	 * @return int
	 */
	@JsonGetter("idlbOrg")
	public int getIdlabOrgans() {
		return idlabOrgans;
	}

	/**
	 * Method 'setIdlabOrgans'
	 * 
	 * @param idlabOrgans
	 */
	public void setIdlabOrgans(int idlabOrgans) {
		this.idlabOrgans = idlabOrgans;
	}

	/**
	 * Method 'getOrganName'
	 * 
	 * @return String
	 */
	@JsonGetter("lbOrgNm")
	public String getOrganName() {
		return organName;
	}

	/**
	 * Method 'setOrganName'
	 * 
	 * @param organName
	 */
	public void setOrganName(String organName) {
		this.organName = organName;
	}

	/**
	 * Method 'getOrgStatus'
	 * 
	 * @return String
	 */
	@JsonGetter("lbOrgSt")
	public String getOrgStatus() {
		return orgStatus;
	}

	/**
	 * Method 'setOrgStatus'
	 * 
	 * @param orgStatus
	 */
	public void setOrgStatus(String orgStatus) {
		this.orgStatus = orgStatus;
	}
}
