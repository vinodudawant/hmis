package com.hms.pharmacy.dao;

import java.util.List;

import com.hms.pharmacy.pojo.VendorAddress;

public interface VendorAddressDao {

	VendorAddress saveOrUpdateVendorAddress(VendorAddress vendorAddress);

	Boolean deleteVendorAddress(Integer vendorAddressId);
	
	List<VendorAddress> getAllVendorAddress();

	List<VendorAddress> getAllAddressOfVendor(int vendorId);

	List<VendorAddress> getAllAddressOfVendorByState(int stateid);
}
