package com.hms.pharmacy.dao;
import java.util.List;
import com.hms.pharmacy.pojo.BankMaster;

public interface BankDao
{
Boolean saveOrUpdateBank(BankMaster bankMaster);

List<BankMaster> getBanks();

Boolean deleteBank(Integer bankId);

List<BankMaster> getAutoSuggestionBankNames(String letter);

List<BankMaster> getBankById(Integer bankId);

BankMaster getBankByIdForDate(Integer bankId);

List<BankMaster> getAllBanks();

List<BankMaster> getAutoSuggestionBankNames1(String letter);

}
