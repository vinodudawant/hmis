package com.hms.doctordesk.dto;

import java.util.List;

public class OPDAddConstlutantDto {

	int bill_id;
	
	int charges_master_slave_id;
	
	int source_type_id;
	
	int department_id;
	
	int unit_id;
	
	List<OPDAddConstlutantDto> lstOPDAddConstlutantDtolist;

	public int getBill_id() {
		return bill_id;
	}

	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
	}

	public int getCharges_master_slave_id() {
		return charges_master_slave_id;
	}

	public void setCharges_master_slave_id(int charges_master_slave_id) {
		this.charges_master_slave_id = charges_master_slave_id;
	}

	public int getSource_type_id() {
		return source_type_id;
	}

	public void setSource_type_id(int source_type_id) {
		this.source_type_id = source_type_id;
	}

	public int getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}

	public int getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(int unit_id) {
		this.unit_id = unit_id;
	}

	public List<OPDAddConstlutantDto> getLstOPDAddConstlutantDtolist() {
		return lstOPDAddConstlutantDtolist;
	}

	public void setLstOPDAddConstlutantDtolist(List<OPDAddConstlutantDto> lstOPDAddConstlutantDtolist) {
		this.lstOPDAddConstlutantDtolist = lstOPDAddConstlutantDtolist;
	}
	
	
	
	 
}
