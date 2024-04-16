package com.hms.pharmacy.service.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.district_taluka_city;
import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.pharmacy.dao.VendorDao;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.PharmaVendorView;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;
import com.hms.pharmacy.service.VendorService;

@Service
public class VendorServiceImpl implements VendorService 
{
	@Autowired
	VendorDao vendorDao;
	
	@Override
	@Transactional
	public List<VendorMaster> getVendors() 
	{
		return vendorDao.getVendors();
	}
	
	@Override
	@Transactional
	public boolean saveVendor(VendorMaster vendorMaster) 
	{
		
		if(vendorMaster.getVendorId()==null || vendorMaster.getVendorId()==0)
		{
			vendorMaster.setVendorDeleteFlag(0);
			vendorMaster.setVendorAddDate(new Date(new java.util.Date()
					.getTime()));
			vendorMaster.setVendorUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
		else
		{
						
			VendorMaster vendorMaster2= vendorDao.getVendorByIdForDate(vendorMaster.getVendorId());
			/*CompanyMaster companyMaster3=companyMaster2;*/
			vendorMaster.setVendorAddDate(vendorMaster2.getVendorAddDate());
			vendorMaster.setVendorDeleteFlag(0);
			vendorMaster.setVendorUpdateDate(new Date(new java.util.Date()
					.getTime()));
		}
						
	
		if (vendorDao.saveVendor(vendorMaster)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deleteVendor(Integer vendorId) {
		return vendorDao.deleteVendor(vendorId);
	}

	@Override
	@Transactional
	public List<VendorMaster> getAutoSuggestionVendorNames(String letter,Integer vmi) {
		return vendorDao.getAutoSuggestionVendorNames(letter,vmi);
	}

	@Override
	@Transactional
	public List<VendorMaster> getVendorById(Integer vendorId) 
	{
		return vendorDao.getVendorById(vendorId);
	}

	@Override
	@Transactional
	public List<VendorMaster> getAllVendorDetails() {
		return vendorDao.getAllVendorDetails();
	}

	@Override
	@Transactional
	public List<VendorMaster> autoSuggestionVendorWithDelete(String letter) {
		return vendorDao.autoSuggestionVendorWithDelete(letter);
	}

	@Override
	@Transactional
	public List<VendorMaster> getVendorList() {
		
		return vendorDao.getVendorList();
	}

	@Override
	@Transactional
	public List<PharmaVendorView> fetchVendorListwithmultipleAdd(String findingName) {
		
		return vendorDao.fetchVendorListwithmultipleAdd(findingName);
	}

	@Override
	@Transactional
	public List<VendorMaster> getVendorListauto(String letter) {
		return vendorDao.getVendorListauto(letter);
	}

	@Override
	@Transactional
	public List<VendorMaster> getlistVenAdd() {
		
		return vendorDao.getlistVenAdd();
	}

	@Override
	@Transactional
	public List<VendorMaster> getlistVenAddById(int vendorId) {
		
		return vendorDao.getlistVenAddById(vendorId);
	}

	@Override
	@Transactional
	public List<StateMasterDto> fetchStateListForReg() {
		// TODO Auto-generated method stub
		return vendorDao.fetchStateListForReg();
	}

	@Override
	@Transactional
	public List<DistrictMasterDto> fetchDistrictListForReg() {
		// TODO Auto-generated method stub
		return vendorDao.fetchDistrictListForReg();
	}

	@Override
	@Transactional
	public List<district_taluka_city> fetchTalukaListForReg() {
		// TODO Auto-generated method stub
		return vendorDao.fetchTalukaListForReg();
	}

	@Override
	@Transactional
	public List<VendorMaster> autoSuggestionvendorNew(String letter) {
		// TODO Auto-generated method stub
		return vendorDao.autoSuggestionvendorNew(letter);
	}

	@Override
	@Transactional
	public List<VendorAddress> getlistVenAddressById(Integer vendorId) {
		
		return vendorDao.getlistVenAddressById(vendorId);
	}
	
}
