package com.hms.pharmacy.service.impl;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.pharmacy.dao.VendorAddressDao;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.service.VendorAddressService;
@Service
public class VendorAddressServiceImpl implements VendorAddressService {

	@Autowired
	VendorAddressDao vendorAddressDao;
	
	@Override
	@Transactional
	public VendorAddress saveOrUpdateVendorAddress(VendorAddress vendorAddress) {
		
		return vendorAddressDao.saveOrUpdateVendorAddress(vendorAddress);
	}

	@Override
	@Transactional
	public Boolean deleteVendorAddress(Integer vendorAddressId) {
		
		return vendorAddressDao.deleteVendorAddress(vendorAddressId);
	}

	@Override
	@Transactional
	public List<VendorAddress> getAllVendorAddress() {
		
		return vendorAddressDao.getAllVendorAddress();
	}

	@Override
	@Transactional
	public List<VendorAddress> getAllAddressOfVendor(int vendorId) {
		return vendorAddressDao.getAllAddressOfVendor(vendorId);
	}

	@Override
	@Transactional
	public List<VendorAddress> getAllAddressOfVendorByState(int stateid) {
		
		return vendorAddressDao.getAllAddressOfVendorByState(stateid);
	}

}
