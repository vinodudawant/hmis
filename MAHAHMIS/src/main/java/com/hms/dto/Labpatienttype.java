package com.hms.dto;

import java.io.Serializable;
import java.util.List;

public class Labpatienttype implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * This attribute maps to the column idlabPatientType in the labpatienttype
	 * table.
	 */
	protected int idlabPatientType;

	/**
	 * This attribute maps to the column patTypeName in the labpatienttype
	 * table.
	 */
	protected String patTypeName;

	/**
	 * This attribute maps to the column patientTypestatus in the labpatienttype
	 * table.
	 */
	protected String patientTypestatus;

	private List<Labpatienttype> labpatienttypeList;

	public List<Labpatienttype> getLabpatienttypeList() {
		return labpatienttypeList;
	}

	public void setLabpatienttypeList(List<Labpatienttype> labpatienttypeList) {
		this.labpatienttypeList = labpatienttypeList;
	}

	/**
	 * Method 'getIdlabPatientType'
	 * 
	 * @return int
	 */
	public int getIdlabPatientType() {
		return idlabPatientType;
	}

	/**
	 * Method 'setIdlabPatientType'
	 * 
	 * @param idlabPatientType
	 */
	public void setIdlabPatientType(int idlabPatientType) {
		this.idlabPatientType = idlabPatientType;
	}

	/**
	 * Method 'getPatTypeName'
	 * 
	 * @return String
	 */
	public String getPatTypeName() {
		return patTypeName;
	}

	/**
	 * Method 'setPatTypeName'
	 * 
	 * @param patTypeName
	 */
	public void setPatTypeName(String patTypeName) {
		this.patTypeName = patTypeName;
	}

	/**
	 * Method 'getPatientTypestatus'
	 * 
	 * @return String
	 */
	public String getPatientTypestatus() {
		return patientTypestatus;
	}

	/**
	 * Method 'setPatientTypestatus'
	 * 
	 * @param patientTypestatus
	 */
	public void setPatientTypestatus(String patientTypestatus) {
		this.patientTypestatus = patientTypestatus;
	}

}
