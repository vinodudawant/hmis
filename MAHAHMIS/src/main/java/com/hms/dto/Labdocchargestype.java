package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;

public class Labdocchargestype implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * This attribute maps to the column idlabDocChargesType in the
	 * labdocchargestype table.
	 */
	protected int idlabDocChargesType;

	/**
	 * This attribute maps to the column chargesName in the labdocchargestype
	 * table.
	 */
	protected String chargesName;

	/**
	 * This attribute maps to the column labDocCharges in the labdocchargestype
	 * table.
	 */
	protected float labDocCharges;

	/**
	 * This attribute maps to the column docChargesStatus in the
	 * labdocchargestype table.
	 */
	protected String docChargesStatus;

	private List<Labdocchargestype> labdocchargestypeList;

	@JsonGetter("lbDocChTypLi")
	public List<Labdocchargestype> getLabdocchargestypeList() {
		return labdocchargestypeList;
	}

	public void setLabdocchargestypeList(
			List<Labdocchargestype> labdocchargestypeList) {
		this.labdocchargestypeList = labdocchargestypeList;
	}

	/**
	 * Method 'getIdlabDocChargesType'
	 * 
	 * @return int
	 */
	@JsonGetter("idDocChTyp")
	public int getIdlabDocChargesType() {
		return idlabDocChargesType;
	}

	/**
	 * Method 'setIdlabDocChargesType'
	 * 
	 * @param idlabDocChargesType
	 */
	public void setIdlabDocChargesType(int idlabDocChargesType) {
		this.idlabDocChargesType = idlabDocChargesType;
	}

	/**
	 * Method 'getChargesName'
	 * 
	 * @return String
	 */
	@JsonGetter("DocChTypNm")
	public String getChargesName() {
		return chargesName;
	}

	/**
	 * Method 'setChargesName'
	 * 
	 * @param chargesName
	 */
	public void setChargesName(String chargesName) {
		this.chargesName = chargesName;
	}

	/**
	 * Method 'getLabDocCharges'
	 * 
	 * @return float
	 */
	@JsonGetter("DocChTypCh")
	public float getLabDocCharges() {
		return labDocCharges;
	}

	/**
	 * Method 'setLabDocCharges'
	 * 
	 * @param labDocCharges
	 */
	public void setLabDocCharges(float labDocCharges) {
		this.labDocCharges = labDocCharges;
	}

	/**
	 * Method 'getDocChargesStatus'
	 * 
	 * @return String
	 */
	@JsonGetter("DocChTypSt")
	public String getDocChargesStatus() {
		return docChargesStatus;
	}

	/**
	 * Method 'setDocChargesStatus'
	 * 
	 * @param docChargesStatus
	 */
	public void setDocChargesStatus(String docChargesStatus) {
		this.docChargesStatus = docChargesStatus;
	}

}
