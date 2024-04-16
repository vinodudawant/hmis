package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.pojo.VendorAddress;

public interface VendorAddressService {

	VendorAddress saveOrUpdateVendorAddress(VendorAddress vendorAddress);

	Boolean deleteVendorAddress(Integer vendorAddressId);
	
	List<VendorAddress> getAllVendorAddress();

	List<VendorAddress> getAllAddressOfVendor(int vendorId);

	List<VendorAddress> getAllAddressOfVendorByState(int stateid);
}
