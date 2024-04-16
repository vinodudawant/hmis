package com.hms.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Labheadings implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * This attribute maps to the column idheadings in the labheadings table.
	 */
	private int idheadings;

	/**
	 * This attribute maps to the column branchId in the labheadings table.
	 */
	private int branchId;

	/**
	 * This attribute maps to the column createdBy in the labheadings table.
	 */
	private int createdBy;

	/**
	 * This attribute maps to the column heading in the labheadings table.
	 */
	private String heading;

	/**
	 * This attribute maps to the column hcode in the labheadings table.
	 */
	private String hcode;

	/**
	 * This attribute maps to the column headingStatus in the labheadings table.
	 */
	private String headingStatus;

	/**
	 * This attribute maps to the column specialNote in the labheadings table.
	 */
	private String specialNote;

	/**
	 * This attribute maps to the column dateofentry in the labheadings table.
	 */
	private Date dateofentry;

	private List<Labheadings> labheadingsList;
	private List<LabProfile> labProfileList;
	private List<LabTest> labTestList;

	private List<LabPkg> labPkgli;

	private String isCategory;
	
	@JsonGetter("lbpkgli")
	public List<LabPkg> getLabPkgli() {
		return labPkgli;
	}

	@JsonSetter("lbpkgli")
	public void setLabPkgli(List<LabPkg> labPkgli) {
		this.labPkgli = labPkgli;
	}

	@JsonGetter("lbProLi")
	public List<LabProfile> getLabProfileList() {
		return labProfileList;
	}

	@JsonSetter("lbProLi")
	public void setLabProfileList(List<LabProfile> labProfileList) {
		this.labProfileList = labProfileList;
	}

	@JsonGetter("lbTestLi")
	public List<LabTest> getLabTestList() {
		return labTestList;
	}

	@JsonSetter("lbTestLi")
	public void setLabTestList(List<LabTest> labTestList) {
		this.labTestList = labTestList;
	}

	@JsonGetter("lbHedLi")
	public List<Labheadings> getLabheadingsList() {
		return labheadingsList;
	}

	@JsonSetter("lbHedLi")
	public void setLabheadingsList(List<Labheadings> labheadingsList) {
		this.labheadingsList = labheadingsList;
	}

	@JsonGetter("idHed")
	public int getIdheadings() {
		return idheadings;
	}

	/**
	 * Method 'setIdheadings'
	 * 
	 * @param idheadings
	 */
	@JsonSetter("idHed")
	public void setIdheadings(int idheadings) {
		this.idheadings = idheadings;
	}

	@JsonGetter("brId")
	public int getBranchId() {
		return branchId;
	}

	/**
	 * Method 'setBranchId'
	 * 
	 * @param branchId
	 */
	@JsonSetter("brId")
	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	@JsonGetter("crtBy")
	public int getCreatedBy() {
		return createdBy;
	}

	/**
	 * Method 'setCreatedBy'
	 * 
	 * @param createdBy
	 */
	@JsonSetter("crtBy")
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	@JsonGetter("hedNm")
	public String getHeading() {
		return heading;
	}

	/**
	 * Method 'setHeading'
	 * 
	 * @param heading
	 */
	@JsonSetter("hedNm")
	public void setHeading(String heading) {
		this.heading = heading;
	}

	@JsonGetter("hcod")
	public String getHcode() {
		return hcode;
	}

	/**
	 * Method 'setHcode'
	 * 
	 * @param hcode
	 */
	@JsonSetter("hcod")
	public void setHcode(String hcode) {
		this.hcode = hcode;
	}

	@JsonGetter("hSt")
	public String getHeadingStatus() {
		return headingStatus;
	}

	/**
	 * Method 'setHeadingStatus'
	 * 
	 * @param headingStatus
	 */
	@JsonSetter("hSt")
	public void setHeadingStatus(String headingStatus) {
		this.headingStatus = headingStatus;
	}

	@JsonGetter("spclNt")
	public String getSpecialNote() {
		return specialNote;
	}

	/**
	 * Method 'setSpecialNote'
	 * 
	 * @param specialNote
	 */
	@JsonSetter("spclNt")
	public void setSpecialNote(String specialNote) {
		this.specialNote = specialNote;
	}

	@JsonGetter("dtOfEnt")
	public Date getDateofentry() {
		return dateofentry;
	}

	/**
	 * Method 'setDateofentry'
	 * 
	 * @param dateofentry
	 */
	@JsonSetter("dtOfEnt")
	public void setDateofentry(Date dateofentry) {
		this.dateofentry = dateofentry;
	}

	@JsonGetter("isCat")
	public String getIsCategory() {
		return isCategory;
	}
	
	@JsonSetter("isCat")
	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}

}
