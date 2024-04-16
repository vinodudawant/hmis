package com.hms.doctordesk.service;

import java.util.List;

import com.hms.doctordesk.dto.PrescriptionGenericDTO;

public interface PrescriptionGenericService {
	public List<PrescriptionGenericDTO> getMedicinesWithGeneric(String letter, String GenericFlag);
	public List<PrescriptionGenericDTO> getPharmacyStockMedicine(String letter,String GenericFlag);
	
}
