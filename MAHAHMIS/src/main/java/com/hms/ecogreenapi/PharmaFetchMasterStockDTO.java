package com.hms.ecogreenapi;

import java.util.List;

public class PharmaFetchMasterStockDTO {
   List<PharmaFetchSlaveStockDTO> itemDetails;

public List<PharmaFetchSlaveStockDTO> getItemDetails() {
	return itemDetails;
}

public void setItemDetails(List<PharmaFetchSlaveStockDTO> itemDetails) {
	this.itemDetails = itemDetails;
}

@Override
public String toString() {
	return "PharmaFetchMasterStockDTO [itemDetails=" + itemDetails + "]";
}
   
   
}
