package com.hms.doctordesk.dao;

import java.util.List;

import com.hms.doctordesk.dto.PrescriptionGenericDTO;

public interface PrescriptionGenericDao {
	List<PrescriptionGenericDTO> getMedicinesWithGeneric(String letter, String GenericFlag);
	public List<PrescriptionGenericDTO> getPharmacyStockMedicine(String letter,String GenericFlag);
}
