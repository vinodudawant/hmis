package com.hms.doctordesk.service.impl;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.PrescriptionGenericDao;
import com.hms.doctordesk.dto.PrescriptionGenericDTO;
import com.hms.doctordesk.service.PrescriptionGenericService;

@Service
@Transactional
public class PrescriptionGenericServiceImpl implements PrescriptionGenericService{
   
	 @Autowired
	 PrescriptionGenericDao pdao;
	
	@Override
	public List<PrescriptionGenericDTO> getMedicinesWithGeneric(String letter, String GenericFlag) {
		
		return pdao.getMedicinesWithGeneric(letter, GenericFlag);
	}

	@Override
	public List<PrescriptionGenericDTO> getPharmacyStockMedicine(String letter,String GenericFlag) {
		
		return pdao.getPharmacyStockMedicine(letter, GenericFlag);
	}

}
