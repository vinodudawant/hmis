package com.hms.pathology.service;

import com.hms.pathology.dto.PathologySampleWiseSlave;

public interface PathoTestResultService {
	 public PathologySampleWiseSlave   getPathologySamplewiseSlaveDetailsForPrint(int testId,int profileId,int treatmentId,int masterId);
}
