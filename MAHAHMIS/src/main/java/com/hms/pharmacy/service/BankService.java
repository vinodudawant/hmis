package com.hms.pharmacy.service;
import java.util.List;

import com.hms.pharmacy.pojo.BankMaster;

public interface BankService
{
Boolean saveOrUpdateBank(BankMaster bankMaster);

List<BankMaster> getBanks();

Boolean deleteBank(Integer bankId);

List<BankMaster> getAutoSuggestionBankNames(String letter);

List<BankMaster> getBankById(Integer bankId);

List<BankMaster> getAllBanks();

List<BankMaster> getAutoSuggestionBankNames1(String letter);
}
