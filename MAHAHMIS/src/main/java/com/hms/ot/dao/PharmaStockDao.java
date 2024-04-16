package com.hms.ot.dao;

import java.util.List;

import com.hms.pharmacy.pojo.PharmaStockDTO;

public interface PharmaStockDao {
	List<PharmaStockDTO> getPharmaStockDetails(int productId,String subStoreName);
}
