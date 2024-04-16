package com.hms.ot.service;

import java.util.List;

import com.hms.pharmacy.pojo.PharmaStockDTO;

public interface PharmaStockService {
   List<PharmaStockDTO> getPharmaStockDetails(int productId,String subStoreName);
}
