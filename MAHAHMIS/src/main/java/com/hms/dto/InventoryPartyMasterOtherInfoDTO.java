package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

/**
 * @author Abhijit
 * 
 */
public class InventoryPartyMasterOtherInfoDTO {

	private Integer party_master_other_info_id;
	private Integer party_master_id;
	private String party_master_other_info_topic;
	private String party_master_other_info_description;
	private String party_master_other_info_file;
	private Integer party_master_other_info_delete_flag;
	private Date party_master_other_info_update_date;
	private Date party_master_other_info_create_date;
	private List<InventoryPartyMasterOtherInfoDTO> ltinventorypartymasterotherinfodto;
	
	/**
	 * @return the party_master_other_info_id
	 */
	@JsonGetter("party_master_other_info_id")
	public Integer getParty_master_other_info_id() {
		return party_master_other_info_id;
	}

	/**
	 * @param party_master_other_info_id
	 *            the party_master_other_info_id to set
	 */
	@JsonSetter("party_master_other_info_id")
	public void setParty_master_other_info_id(Integer party_master_other_info_id) {
		this.party_master_other_info_id = party_master_other_info_id;
	}

	/**
	 * @return the party_master_id
	 */
	@JsonGetter("party_master_id")
	public Integer getParty_master_id() {
		return party_master_id;
	}

	/**
	 * @param party_master_id
	 *            the party_master_id to set
	 */
	@JsonSetter("party_master_id")
	public void setParty_master_id(Integer party_master_id) {
		this.party_master_id = party_master_id;
	}

	/**
	 * @return the party_master_other_info_topic
	 */
	@JsonGetter("party_master_other_info_topic")
	public String getParty_master_other_info_topic() {
		return party_master_other_info_topic;
	}

	/**
	 * @param party_master_other_info_topic
	 *            the party_master_other_info_topic to set
	 */
	@JsonSetter("party_master_other_info_topic")
	public void setParty_master_other_info_topic(
			String party_master_other_info_topic) {
		this.party_master_other_info_topic = party_master_other_info_topic;
	}

	/**
	 * @return the party_master_other_info_description
	 */
	@JsonGetter("party_master_other_info_description")
	public String getParty_master_other_info_description() {
		return party_master_other_info_description;
	}

	/**
	 * @param party_master_other_info_description
	 *            the party_master_other_info_description to set
	 */
	@JsonSetter("party_master_other_info_description")
	public void setParty_master_other_info_description(
			String party_master_other_info_description) {
		this.party_master_other_info_description = party_master_other_info_description;
	}

	/**
	 * @return the party_master_other_info_file
	 */
	@JsonGetter("party_master_other_info_file")
	public String getParty_master_other_info_file() {
		return party_master_other_info_file;
	}

	/**
	 * @param party_master_other_info_file
	 *            the party_master_other_info_file to set
	 */
	@JsonSetter("party_master_other_info_file")
	public void setParty_master_other_info_file(
			String party_master_other_info_file) {
		this.party_master_other_info_file = party_master_other_info_file;
	}

	/**
	 * @return the party_master_other_info_delete_flag
	 */
	@JsonGetter("party_master_other_info_delete_flag")
	public Integer getParty_master_other_info_delete_flag() {
		return party_master_other_info_delete_flag;
	}

	/**
	 * @param party_master_other_info_delete_flag
	 *            the party_master_other_info_delete_flag to set
	 */
	@JsonSetter("party_master_other_info_delete_flag")
	public void setParty_master_other_info_delete_flag(
			Integer party_master_other_info_delete_flag) {
		this.party_master_other_info_delete_flag = party_master_other_info_delete_flag;
	}

	/**
	 * @return the party_master_other_info_update_date
	 */
	@JsonGetter("party_master_other_info_update_date")
	public Date getParty_master_other_info_update_date() {
		return party_master_other_info_update_date;
	}

	/**
	 * @param party_master_other_info_update_date
	 *            the party_master_other_info_update_date to set
	 */
	@JsonSetter("party_master_other_info_update_date")
	public void setParty_master_other_info_update_date(
			Date party_master_other_info_update_date) {
		this.party_master_other_info_update_date = party_master_other_info_update_date;
	}

	/**
	 * @return the party_master_other_info_create_date
	 */
	@JsonGetter("party_master_other_info_create_date")
	public Date getParty_master_other_info_create_date() {
		return party_master_other_info_create_date;
	}

	/**
	 * @param party_master_other_info_create_date
	 *            the party_master_other_info_create_date to set
	 */
	@JsonSetter("party_master_other_info_create_date")
	public void setParty_master_other_info_create_date(
			Date party_master_other_info_create_date) {
		this.party_master_other_info_create_date = party_master_other_info_create_date;
	}

	/**
	 * @return the ltinventorypartymasterotherinfodto
	 */
	@JsonGetter("ltinventorypartymasterotherinfodto")
	public List<InventoryPartyMasterOtherInfoDTO> getLtinventorypartymasterotherinfodto() {
		return ltinventorypartymasterotherinfodto;
	}

	/**
	 * @param ltinventorypartymasterotherinfodto the ltinventorypartymasterotherinfodto to set
	 */
	@JsonSetter("ltinventorypartymasterotherinfodto")
	public void setLtinventorypartymasterotherinfodto(
			List<InventoryPartyMasterOtherInfoDTO> ltinventorypartymasterotherinfodto) {
		this.ltinventorypartymasterotherinfodto = ltinventorypartymasterotherinfodto;
	}

	
}
