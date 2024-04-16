package com.hms.dto;

import java.sql.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class InventoryPartyMasterDTO {

	private Integer party_master_id;
	private String party_master_name;
	private String party_master_group;
	private String party_master_currency;
	private String party_master_type;
	private String party_master_parent_company;
	private String party_master_status;
	private String party_master_priority;
	private String party_master_mobile;
	private String party_master_landline;
	private String party_master_website;
	private String party_master_company_mail;
	private String party_master_industry_type;
	private Integer party_master_rating;
	private Integer party_master_employee_code;
	private Integer party_master_delete_flag;
	private Date party_master_update_date;
	private Date party_master_create_date;
	
	private String inv_party_master_vatno;
	private String inv_party_master_servicetaxno;
	private String inv_party_master_tinno;
	private String inv_party_master_filename;
	
	private String isPartyMSME;
	private String sanctionAmt;
	private String prtyTermsConditions;
	
	
	private List<InventoryPartyMasterDTO> ltpartyMaster;
	private InventoryPartyMasterContactInfoDTO inventoryPartyMasterContactInfoDTO;
	private InventoryPartyMasterAddressInfoDTO inventoryPartyMasteAddressInfoDTO;
	private InventoryPartyMasterPaymentInfoDTO inventoryPartyMastePaymentInfoDTO; 
	private InventoryPartyMasterOtherInfoDTO inventoryPartyMasteOtherInfoDTO;
	
	@JsonGetter("party_master_id")
	public Integer getParty_master_id() {
		return party_master_id;
	}

	@JsonSetter("party_master_id")
	public void setParty_master_id(Integer party_master_id) {
		this.party_master_id = party_master_id;
	}

	@JsonGetter("party_master_name")
	public String getParty_master_name() {
		return party_master_name;
	}

	@JsonSetter("party_master_name")
	public void setParty_master_name(String party_master_name) {
		this.party_master_name = party_master_name;
	}

	@JsonGetter("party_master_group")
	public String getParty_master_group() {
		return party_master_group;
	}

	@JsonSetter("party_master_group")
	public void setParty_master_group(String party_master_group) {
		this.party_master_group = party_master_group;
	}

	@JsonGetter("party_master_currency")
	public String getParty_master_currency() {
		return party_master_currency;
	}

	@JsonSetter("party_master_currency")
	public void setParty_master_currency(String party_master_currency) {
		this.party_master_currency = party_master_currency;
	}

	@JsonGetter("party_master_parent_company")
	public String getParty_master_parent_company() {
		return party_master_parent_company;
	}

	
	@JsonSetter("party_master_parent_company")
	public void setParty_master_parent_company(
			String party_master_parent_company) {
		this.party_master_parent_company = party_master_parent_company;
	}

	/**
	 * @return the party_master_type
	 */
	@JsonGetter("party_master_type")
	public String getParty_master_type() {
		return party_master_type;
	}

	/**
	 * @param party_master_type the party_master_type to set
	 */
	@JsonGetter("party_master_type")
	public void setParty_master_type(String party_master_type) {
		this.party_master_type = party_master_type;
	}

	@JsonGetter("party_master_status")
	public String getParty_master_status() {
		return party_master_status;
	}

	@JsonSetter("party_master_status")
	public void setParty_master_status(String party_master_status) {
		this.party_master_status = party_master_status;
	}

	@JsonGetter("party_master_priority")
	public String getParty_master_priority() {
		return party_master_priority;
	}

	@JsonSetter("party_master_priority")
	public void setParty_master_priority(String party_master_priority) {
		this.party_master_priority = party_master_priority;
	}

	@JsonGetter("party_master_mobile")
	public String getParty_master_mobile() {
		return party_master_mobile;
	}

	@JsonSetter("party_master_mobile")
	public void setParty_master_mobile(String party_master_mobile) {
		this.party_master_mobile = party_master_mobile;
	}

	@JsonGetter("party_master_landline")
	public String getParty_master_landline() {
		return party_master_landline;
	}

	@JsonSetter("party_master_landline")
	public void setParty_master_landline(String party_master_landline) {
		this.party_master_landline = party_master_landline;
	}

	@JsonGetter("party_master_website")
	public String getParty_master_website() {
		return party_master_website;
	}

	@JsonSetter("party_master_website")
	public void setParty_master_website(String party_master_website) {
		this.party_master_website = party_master_website;
	}

	@JsonGetter("party_master_company_mail")
	public String getParty_master_company_mail() {
		return party_master_company_mail;
	}

	@JsonSetter("party_master_company_mail")
	public void setParty_master_company_mail(String party_master_company_mail) {
		this.party_master_company_mail = party_master_company_mail;
	}

	@JsonGetter("party_master_industry_type")
	public String getParty_master_industry_type() {
		return party_master_industry_type;
	}

	@JsonSetter("party_master_industry_type")
	public void setParty_master_industry_type(String party_master_industry_type) {
		this.party_master_industry_type = party_master_industry_type;
	}

	@JsonGetter("party_master_rating")
	public Integer getParty_master_rating() {
		return party_master_rating;
	}

	@JsonSetter("party_master_rating")
	public void setParty_master_rating(Integer party_master_rating) {
		this.party_master_rating = party_master_rating;
	}

	@JsonGetter("party_master_employee_code")
	public Integer getParty_master_employee_code() {
		return party_master_employee_code;
	}

	@JsonSetter("party_master_employee_code")
	public void setParty_master_employee_code(Integer party_master_employee_code) {
		this.party_master_employee_code = party_master_employee_code;
	}

	@JsonGetter("party_master_delete_flag")
	public Integer getParty_master_delete_flag() {
		return party_master_delete_flag;
	}

	@JsonSetter("party_master_delete_flag")
	public void setParty_master_delete_flag(Integer party_master_delete_flag) {
		this.party_master_delete_flag = party_master_delete_flag;
	}

	@JsonGetter("party_master_update_date")
	public Date getParty_master_update_date() {
		return party_master_update_date;
	}

	@JsonSetter("party_master_update_date")
	public void setParty_master_update_date(Date party_master_update_date) {
		this.party_master_update_date = party_master_update_date;
	}

	@JsonGetter("party_master_create_date")
	public Date getParty_master_create_date() {
		return party_master_create_date;
	}

	@JsonSetter("party_master_create_date")
	public void setParty_master_create_date(Date party_master_create_date) {
		this.party_master_create_date = party_master_create_date;
	}
	
	@JsonGetter("inv_party_master_vatno")
	public String getInv_party_master_vatno() {
		return inv_party_master_vatno;
	}

	@JsonSetter("inv_party_master_vatno")
	public void setInv_party_master_vatno(String inv_party_master_vatno) {
		this.inv_party_master_vatno = inv_party_master_vatno;
	}

	@JsonGetter("inv_party_master_servicetaxno")
	public String getInv_party_master_servicetaxno() {
		return inv_party_master_servicetaxno;
	}

	@JsonSetter("inv_party_master_servicetaxno")
	public void setInv_party_master_servicetaxno(
			String inv_party_master_servicetaxno) {
		this.inv_party_master_servicetaxno = inv_party_master_servicetaxno;
	}

	@JsonGetter("inv_party_master_tinno")
	public String getInv_party_master_tinno() {
		return inv_party_master_tinno;
	}

	@JsonSetter("inv_party_master_tinno")
	public void setInv_party_master_tinno(String inv_party_master_tinno) {
		this.inv_party_master_tinno = inv_party_master_tinno;
	}

	/**
	 * @return the ltpartyMaster
	 */
	@JsonGetter("ltpartyMaster")
	public List<InventoryPartyMasterDTO> getLtpartyMaster() {
		return ltpartyMaster;
	}

	/**
	 * @param ltpartyMaster the ltpartyMaster to set
	 */
	@JsonSetter("ltpartyMaster")
	public void setLtpartyMaster(List<InventoryPartyMasterDTO> ltpartyMaster) {
		this.ltpartyMaster = ltpartyMaster;
	}

	/**
	 * @return the inventoryPartyMasterContactInfoDTO
	 */
	@JsonGetter("inventoryPartyMasterContactInfoDTO")
	public InventoryPartyMasterContactInfoDTO getInventoryPartyMasterContactInfoDTO() {
		return inventoryPartyMasterContactInfoDTO;
	}

	/**
	 * @param inventoryPartyMasterContactInfoDTO the inventoryPartyMasterContactInfoDTO to set
	 */
	@JsonSetter("inventoryPartyMasterContactInfoDTO")
	public void setInventoryPartyMasterContactInfoDTO(
			InventoryPartyMasterContactInfoDTO inventoryPartyMasterContactInfoDTO) {
		this.inventoryPartyMasterContactInfoDTO = inventoryPartyMasterContactInfoDTO;
	}

	/**
	 * @return the inventoryPartyMasteAddressInfoDTO
	 */
	@JsonGetter("inventoryPartyMasteAddressInfoDTO")
	public InventoryPartyMasterAddressInfoDTO getInventoryPartyMasteAddressInfoDTO() {
		return inventoryPartyMasteAddressInfoDTO;
	}

	/**
	 * @param inventoryPartyMasteAddressInfoDTO the inventoryPartyMasteAddressInfoDTO to set
	 */
	@JsonSetter("inventoryPartyMasteAddressInfoDTO")
	public void setInventoryPartyMasteAddressInfoDTO(
			InventoryPartyMasterAddressInfoDTO inventoryPartyMasteAddressInfoDTO) {
		this.inventoryPartyMasteAddressInfoDTO = inventoryPartyMasteAddressInfoDTO;
	}

	/**
	 * @return the inventoryPartyMastePaymentInfoDTO
	 */
	@JsonGetter("inventoryPartyMastePaymentInfoDTO")
	public InventoryPartyMasterPaymentInfoDTO getInventoryPartyMastePaymentInfoDTO() {
		return inventoryPartyMastePaymentInfoDTO;
	}

	/**
	 * @param inventoryPartyMastePaymentInfoDTO the inventoryPartyMastePaymentInfoDTO to set
	 */
	@JsonSetter("inventoryPartyMastePaymentInfoDTO")
	public void setInventoryPartyMastePaymentInfoDTO(
			InventoryPartyMasterPaymentInfoDTO inventoryPartyMastePaymentInfoDTO) {
		this.inventoryPartyMastePaymentInfoDTO = inventoryPartyMastePaymentInfoDTO;
	}

	/**
	 * @return the inventoryPartyMasteOtherInfoDTO
	 */
	@JsonGetter("inventoryPartyMasteOtherInfoDTO")
	public InventoryPartyMasterOtherInfoDTO getInventoryPartyMasteOtherInfoDTO() {
		return inventoryPartyMasteOtherInfoDTO;
	}

	/**
	 * @param inventoryPartyMasteOtherInfoDTO the inventoryPartyMasteOtherInfoDTO to set
	 */
	@JsonSetter("inventoryPartyMasteOtherInfoDTO")
	public void setInventoryPartyMasteOtherInfoDTO(
			InventoryPartyMasterOtherInfoDTO inventoryPartyMasteOtherInfoDTO) {
		this.inventoryPartyMasteOtherInfoDTO = inventoryPartyMasteOtherInfoDTO;
	}
	
	
	@JsonGetter("inv_party_master_msme")
	public String getIsPartyMSME() {
		return isPartyMSME;
	}

	@JsonSetter("inv_party_master_msme")
	public void setIsPartyMSME(String isPartyMSME) {
		this.isPartyMSME = isPartyMSME;
	}
	@JsonGetter("inv_party_master_sanction_amt")
	public String getSanctionAmt() {
		return sanctionAmt;
	}

	@JsonSetter("inv_party_master_sanction_amt")
	public void setSanctionAmt(String sanctionAmt) {
		this.sanctionAmt = sanctionAmt;
	}

	public String getPrtyTermsConditions() {
		return prtyTermsConditions;
	}

	public void setPrtyTermsConditions(String prtyTermsConditions) {
		this.prtyTermsConditions = prtyTermsConditions;
	}
	@JsonGetter("inv_party_master_filename")
	public String getInv_party_master_filename() {
		return inv_party_master_filename;
	}
	@JsonSetter("inv_party_master_filename")
	public void setInv_party_master_filename(String inv_party_master_filename) {
		this.inv_party_master_filename = inv_party_master_filename;
	}

	
}
