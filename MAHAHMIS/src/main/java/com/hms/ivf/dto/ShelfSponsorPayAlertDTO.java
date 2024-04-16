package com.hms.ivf.dto;


import java.util.List;

import javax.persistence.Transient;

public class ShelfSponsorPayAlertDTO {
	private Double total_bill=0.0;
	private Double total_paid=0.0;
	private Double total_remain=0.0;
	private Double total_pharmacy_bill=0.0;
	
	@Transient
	List<ShelfSponsorPayAlertDTO>  listShelfSponsorPayAlertDTO;

	public Double getTotal_bill() {
		return total_bill;
	}

	public void setTotal_bill(Double total_bill) {
		this.total_bill = total_bill;
	}

	public Double getTotal_paid() {
		return total_paid;
	}

	public void setTotal_paid(Double total_paid) {
		this.total_paid = total_paid;
	}

	public Double getTotal_remain() {
		return total_remain;
	}

	public void setTotal_remain(Double total_remain) {
		this.total_remain = total_remain;
	}

	public Double getTotal_pharmacy_bill() {
		return total_pharmacy_bill;
	}

	public void setTotal_pharmacy_bill(Double total_pharmacy_bill) {
		this.total_pharmacy_bill = total_pharmacy_bill;
	}

	@Override
	public String toString() {
		return "ShelfSponsorPayAlertDTO [total_bill=" + total_bill
				+ ", total_paid=" + total_paid + ", total_remain="
				+ total_remain + ", total_pharmacy_bill=" + total_pharmacy_bill
				+ "]";
	}

	public List<ShelfSponsorPayAlertDTO> getListShelfSponsorPayAlertDTO() {
		return listShelfSponsorPayAlertDTO;
	}

	public void setListShelfSponsorPayAlertDTO(
			List<ShelfSponsorPayAlertDTO> listShelfSponsorPayAlertDTO) {
		this.listShelfSponsorPayAlertDTO = listShelfSponsorPayAlertDTO;
	}
	
	

}
