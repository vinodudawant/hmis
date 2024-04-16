package com.hms.pharmacy.service;

import java.util.List;

import com.hms.administrator.dto.district_taluka_city;
import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.pharmacy.pojo.PharmaVendorView;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;

public interface VendorService 
{

	List<VendorMaster> getVendors();

	boolean saveVendor(VendorMaster vendorMaster);

	boolean deleteVendor(Integer vendorId);

	List<VendorMaster> getAutoSuggestionVendorNames(String letter, Integer vmi);

	List<VendorMaster> getVendorById(Integer vendorId);

	List<VendorMaster> getAllVendorDetails();

	List<VendorMaster> autoSuggestionVendorWithDelete(String letter);

	List<VendorMaster> getVendorList();

	List<PharmaVendorView> fetchVendorListwithmultipleAdd(String findingName);

	List<VendorMaster> getVendorListauto(String letter);

	List<VendorMaster> getlistVenAdd();

	List<VendorMaster> getlistVenAddById(int vendorId);

	List<StateMasterDto> fetchStateListForReg();

	List<DistrictMasterDto> fetchDistrictListForReg();

	List<district_taluka_city> fetchTalukaListForReg();

	List<VendorMaster> autoSuggestionvendorNew(String letter);

	List<VendorAddress> getlistVenAddressById(Integer vendorId);
}
