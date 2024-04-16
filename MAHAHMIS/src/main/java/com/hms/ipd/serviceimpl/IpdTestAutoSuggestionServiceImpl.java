package com.hms.ipd.serviceimpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ipd.dao.IpdTestAutoSuggestionDao;
import com.hms.ipd.service.IpdTestAutoSuggestionService;
import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;

@Service
@Transactional
public class IpdTestAutoSuggestionServiceImpl implements IpdTestAutoSuggestionService {

	@Autowired
	IpdTestAutoSuggestionDao testAutoSuggestDao;
	
	@Override
	public TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto) {	
		
		return testAutoSuggestDao.getTestAutoSuggestion(objDto);
	}

	@Override
	public TestSponsorAutoSuggestionDto getSponsorTestAutosuggestion(TestSponsorAutoSuggestionDto objDto) {
		
		return testAutoSuggestDao.getSponsorTestAutosuggestion(objDto);
	}

	@Override
	public SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto) {

		//return testAutoSuggestDao.getSponsorTestCharges(objDto);
		return testAutoSuggestDao.getSponsorTestChargesNew(objDto);
	}

	@Override
	public SponsorTestChargesDto getHallWiseTestCharges(SponsorTestChargesDto objDto) {
		
		return testAutoSuggestDao.getHallWiseTestCharges(objDto);
	}
}
